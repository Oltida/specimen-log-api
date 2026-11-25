-- specimens table for the Specimen Log API

-- enums so only valid values can go in
create type specimen_category as enum ('plant', 'insect', 'bird', 'fungi');
create type specimen_rarity as enum ('common', 'uncommon', 'rare');

create table public.specimens (
  id bigint generated always as identity primary key,
  species_name text not null,
  category specimen_category not null,
  habitat text,
  rarity specimen_rarity not null default 'common',
  date_found date,
  notes text,
  created_at timestamptz not null default now()
);

-- rls on so the public key can't touch it, my server uses the secret key
alter table public.specimens enable row level security;

-- new tables aren't exposed automatically anymore, so give the server's role access
grant select, insert, update, delete on public.specimens to service_role;