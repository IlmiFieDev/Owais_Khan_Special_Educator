-- Special Educator Portfolio — fresh Supabase production setup
-- Run once in Supabase SQL Editor on a new project.
-- Public forms write through the Next.js server using SUPABASE_SERVICE_ROLE_KEY.
-- No anonymous table policies are created intentionally.

create extension if not exists "pgcrypto";

do $$ begin
  create type request_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type enquiry_status as enum ('new', 'contacted', 'resolved');
exception when duplicate_object then null;
end $$;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  enquiry_type text not null,
  preferred_contact_method text not null,
  message text not null,
  contact_consent boolean not null default false,
  status enquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint enquiries_name_length check (char_length(trim(name)) between 2 and 80),
  constraint enquiries_contact_method check (preferred_contact_method in ('Email', 'Phone', 'Either')),
  constraint enquiries_message_length check (char_length(trim(message)) between 20 and 1500),
  constraint enquiries_contact_present check (
    (email is not null and length(trim(email)) > 0)
    or (phone is not null and length(trim(phone)) > 0)
  )
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  relationship text not null,
  rating smallint not null,
  message text not null,
  city text,
  contact text,
  consent_to_display boolean not null default false,
  publication_consent boolean not null default false,
  status request_status not null default 'pending',
  moderation_status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint feedback_name_length check (char_length(trim(name)) between 2 and 60),
  constraint feedback_relationship check (relationship in ('parent', 'teacher', 'therapist', 'institution', 'other')),
  constraint feedback_rating check (rating between 1 and 5),
  constraint feedback_message_length check (char_length(trim(message)) between 20 and 500)
);

create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists feedback_status_created_at_idx on public.feedback (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists enquiries_set_updated_at on public.enquiries;
create trigger enquiries_set_updated_at
before update on public.enquiries
for each row execute function public.set_updated_at();

drop trigger if exists feedback_set_updated_at on public.feedback;
create trigger feedback_set_updated_at
before update on public.feedback
for each row execute function public.set_updated_at();

alter table public.enquiries enable row level security;
alter table public.feedback enable row level security;

-- Deliberately no anon/authenticated policies: all application access goes through
-- server-side routes. The service-role key bypasses RLS and never reaches the browser.

create or replace view public.public_feedback as
select
  id,
  upper(left(trim(name), 1)) || '.' as author,
  relationship,
  rating,
  message,
  created_at
from public.feedback
where status = 'approved'
  and consent_to_display = true
  and publication_consent = true;

revoke all on public.enquiries from anon, authenticated;
revoke all on public.feedback from anon, authenticated;
revoke all on public.public_feedback from anon, authenticated;

grant usage on schema public to anon, authenticated;
revoke all on function public.set_updated_at() from public;
grant execute on function public.set_updated_at() to postgres, service_role;
