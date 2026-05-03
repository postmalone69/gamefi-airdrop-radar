create extension if not exists pgcrypto;

create table if not exists public.airdrop_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  chain text not null,
  category text not null,
  status text not null,
  score integer not null check (score >= 0 and score <= 100),
  risk text not null check (risk in ('Low', 'Medium', 'High')),
  funding text not null,
  users_label text not null,
  action text not null,
  tags text[] not null default '{}',
  website text,
  quest_url text,
  x_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.airdrop_projects enable row level security;

drop policy if exists "Public read airdrop projects" on public.airdrop_projects;
create policy "Public read airdrop projects"
  on public.airdrop_projects
  for select
  to anon, authenticated
  using (true);

create index if not exists airdrop_projects_score_idx on public.airdrop_projects (score desc);
create index if not exists airdrop_projects_chain_idx on public.airdrop_projects (chain);
