-- Einmalig im Supabase SQL Editor ausführen (Tabelle für die gemeinsame Sicht)
create table public.items (
  collection text not null,
  id text not null,
  data jsonb,
  deleted boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);
alter table public.items enable row level security;
create policy "nur angemeldet" on public.items
  for all to authenticated using (true) with check (true);
create function public.touch() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
create trigger items_touch before insert or update on public.items
  for each row execute function public.touch();
