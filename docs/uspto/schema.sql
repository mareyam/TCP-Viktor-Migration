-- Proposed Postgres schema for the USPTO watch.
-- NOT APPLIED. This repository has no database, and this build does not connect.
-- Apply only after a database is approved. Then point the server store at it.
-- Shared trademark rows are separate from tenant-owned watches, reminders, and alerts.

create table if not exists uspto_records (
  serial_number text primary key,
  registration_number text,
  mark_text text,
  status_text text,
  status_date date,
  filing_date date,
  registration_date date,
  legal_basis text,
  owners jsonb not null default '[]'::jsonb,
  goods_services jsonb not null default '[]'::jsonb,
  classes jsonb not null default '[]'::jsonb,
  source_hash text,
  fetched_at timestamptz,
  raw_snapshot text
);

create index if not exists uspto_records_registration_idx
  on uspto_records (registration_number);

create table if not exists uspto_watches (
  id text primary key,
  tenant_id text not null,
  identifier_type text not null check (identifier_type in ('application', 'registration')),
  normalized_identifier text not null,
  serial_number text not null references uspto_records (serial_number),
  paused boolean not null default false,
  created_at timestamptz not null,
  removed_at timestamptz
);

create unique index if not exists uspto_watches_active_serial_idx
  on uspto_watches (tenant_id, serial_number)
  where removed_at is null;

create index if not exists uspto_watches_tenant_idx
  on uspto_watches (tenant_id);

create table if not exists uspto_reminders (
  idempotency_key text primary key,
  tenant_id text not null,
  watch_id text not null references uspto_watches (id),
  obligation_id text not null,
  deadline date not null,
  channel text not null check (channel in ('in_app', 'email')),
  kind text not null,
  state text not null check (state in ('pending', 'dry_run', 'failed', 'cancelled')),
  attempts integer not null default 0,
  provider_id text,
  receipt_claimed boolean not null default false,
  events jsonb not null default '[]'::jsonb,
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create index if not exists uspto_reminders_tenant_idx
  on uspto_reminders (tenant_id, watch_id);

create table if not exists uspto_feed_checkpoints (
  id text primary key,
  last_success_date date,
  baseline_date date,
  failed_date date,
  processed_hashes jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null
);

create table if not exists uspto_feed_cases (
  source_file text not null,
  source_hash text not null,
  serial_number text not null,
  mark_text text not null,
  owner_name text,
  filing_date date,
  status_code text,
  action_key text,
  classes jsonb not null default '[]'::jsonb,
  goods text,
  fixture_label text,
  ingested_at timestamptz not null,
  primary key (source_hash, serial_number)
);

create table if not exists uspto_alerts (
  id text primary key,
  tenant_id text not null,
  watch_id text not null references uspto_watches (id),
  candidate_serial text not null,
  classification text not null,
  visibility text not null,
  status_code text,
  filing_date date,
  comparison jsonb not null,
  events jsonb not null default '[]'::jsonb,
  disposition text not null default 'open' check (disposition in ('open', 'relevant', 'dismissed')),
  unique (tenant_id, watch_id, candidate_serial)
);

create index if not exists uspto_alerts_tenant_idx
  on uspto_alerts (tenant_id);

create table if not exists uspto_job_runs (
  id text primary key,
  started_at timestamptz not null,
  finished_at timestamptz,
  status text not null,
  scanned_count integer not null default 0,
  matched_count integer not null default 0,
  delivery_failures integer not null default 0,
  detail text
);

-- Rollback, after approval, in this order:
-- drop table if exists uspto_job_runs;
-- drop table if exists uspto_alerts;
-- drop table if exists uspto_feed_cases;
-- drop table if exists uspto_feed_checkpoints;
-- drop table if exists uspto_reminders;
-- drop table if exists uspto_watches;
-- drop table if exists uspto_records;
