-- ============================================================
-- Owais Alam Khan Portfolio — Supabase schema
-- Run once in the Supabase SQL editor.
-- ============================================================

create extension if not exists "pgcrypto";

create type request_status as enum ('pending', 'approved', 'rejected');
create type booking_status  as enum ('pending', 'confirmed', 'declined', 'completed', 'cancelled');
create type session_mode    as enum ('online', 'home_visit', 'centre');

-- ── Feedback ──────────────────────────────────────────────
create table feedback (
  id                uuid primary key default gen_random_uuid(),
  name              text not null check (char_length(name) between 2 and 60),
  relationship      text not null
    check (relationship in ('parent','teacher','therapist','institution','other')),
  rating            smallint not null check (rating between 1 and 5),
  message           text not null check (char_length(message) between 20 and 500),
  city              text,
  contact           text,                       -- private, never exposed publicly
  consent_to_display boolean not null default false,
  status            request_status not null default 'pending',
  created_at        timestamptz not null default now()
);

-- ── Consultation requests ─────────────────────────────────
create table consultations (
  id                uuid primary key default gen_random_uuid(),
  parent_name       text not null,
  phone             text not null,
  email             text,
  child_age         smallint check (child_age between 1 and 25),
  concern           text,
  message           text check (char_length(message) <= 1000),
  preferred_language text default 'en',
  status            text not null default 'new',
  created_at        timestamptz not null default now()
);

-- ── Session bookings ──────────────────────────────────────
create table session_bookings (
  id                uuid primary key default gen_random_uuid(),
  parent_name       text not null,
  phone             text not null,
  email             text,
  child_age         smallint,
  mode              session_mode not null,
  area              text,
  session_date      date not null,
  slot_start        time not null,
  notes             text,
  status            booking_status not null default 'pending',
  created_at        timestamptz not null default now()
);

-- one live booking per slot
create unique index one_booking_per_slot
  on session_bookings (session_date, slot_start)
  where status in ('pending', 'confirmed');

-- ── Anonymous page-view analytics ────────────────────────
create table page_views (
  id           bigint generated always as identity primary key,
  path         text not null,
  referrer     text,
  device       text,
  locale       text,
  visitor_hash text,
  created_at   timestamptz not null default now()
);

-- ── Row-level security ────────────────────────────────────
alter table feedback         enable row level security;
alter table consultations    enable row level security;
alter table session_bookings enable row level security;
alter table page_views       enable row level security;

-- Public carousel: approved + consented feedback only, safe columns
create view public_feedback as
  select id, name, relationship, rating, message, city, created_at
  from feedback
  where status = 'approved' and consent_to_display;
grant select on public_feedback to anon;

-- Booking form: show only which slots are taken, nothing about the booker
create view taken_slots as
  select session_date, slot_start
  from session_bookings
  where status in ('pending', 'confirmed');
grant select on taken_slots to anon;

-- Owner full access (replace <OWAIS_USER_ID> with the real auth.uid() after setup)
create policy "owner full access" on feedback
  for all to authenticated
  using     (auth.uid() = '<OWAIS_USER_ID>')
  with check (auth.uid() = '<OWAIS_USER_ID>');

create policy "owner full access" on consultations
  for all to authenticated
  using     (auth.uid() = '<OWAIS_USER_ID>')
  with check (auth.uid() = '<OWAIS_USER_ID>');

create policy "owner full access" on session_bookings
  for all to authenticated
  using     (auth.uid() = '<OWAIS_USER_ID>')
  with check (auth.uid() = '<OWAIS_USER_ID>');

create policy "owner full access" on page_views
  for all to authenticated
  using     (auth.uid() = '<OWAIS_USER_ID>')
  with check (auth.uid() = '<OWAIS_USER_ID>');
