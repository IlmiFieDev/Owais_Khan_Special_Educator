-- ============================================================
-- Non-destructive extension: enquiries table + feedback fields
-- Safe to run on existing projects. Does not drop data.
-- ============================================================

-- Enquiry statuses for admin workflow
do $$
begin
  if not exists (select 1 from pg_type where typname = 'enquiry_status') then
    create type enquiry_status as enum ('new', 'contacted', 'resolved');
  end if;
end$$;

-- Public enquiries (private; inserts only via service role / server)
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text,
  phone text,
  enquiry_type text not null,
  preferred_contact_method text not null
    check (preferred_contact_method in ('Email', 'Phone', 'Either')),
  message text not null check (char_length(message) between 20 and 1500),
  contact_consent boolean not null default false,
  status enquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint enquiries_contact_present check (
    (email is not null and length(trim(email)) > 0)
    or (phone is not null and length(trim(phone)) > 0)
  )
);

create index if not exists enquiries_status_idx on enquiries (status);
create index if not exists enquiries_created_at_idx on enquiries (created_at desc);

-- Extend feedback with optional publication / moderation aliases
alter table feedback
  add column if not exists publication_consent boolean not null default false;

alter table feedback
  add column if not exists moderation_status text;

alter table feedback
  add column if not exists updated_at timestamptz not null default now();

-- Allow optional ratings on new submissions (keeps existing rows intact)
alter table feedback alter column rating drop not null;

-- Backfill moderation_status from existing status enum where possible
update feedback
set moderation_status = status::text
where moderation_status is null;

update feedback
set publication_consent = consent_to_display
where publication_consent = false and consent_to_display = true;

-- updated_at trigger helper
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists enquiries_set_updated_at on enquiries;
create trigger enquiries_set_updated_at
  before update on enquiries
  for each row execute function set_updated_at();

drop trigger if exists feedback_set_updated_at on feedback;
create trigger feedback_set_updated_at
  before update on feedback
  for each row execute function set_updated_at();

-- RLS
alter table enquiries enable row level security;

-- No public select/insert/update/delete policies on enquiries.
-- Server uses service-role key for inserts and admin operations.

-- Keep existing feedback RLS. Ensure anon cannot read private rows.
-- Public carousel continues to use public_feedback view only.

-- Optional: allow authenticated owner via OWNER_USER_ID claim in app layer.
-- Policy placeholder uses JWT claim; replace OWNER_USER_ID after setup.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'enquiries' and policyname = 'owner manage enquiries'
  ) then
    create policy "owner manage enquiries" on enquiries
      for all to authenticated
      using (auth.uid()::text = coalesce(current_setting('app.owner_user_id', true), ''))
      with check (auth.uid()::text = coalesce(current_setting('app.owner_user_id', true), ''));
  end if;
exception when others then
  -- Ignore if policy already exists under another definition
  null;
end$$;
