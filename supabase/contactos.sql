-- OLIVIA · Contactos (formulario público + CRM del admin). Se puede correr más de una vez.
-- Cualquiera puede dejar sus datos; solo el admin los ve y los edita.

create table if not exists public.contactos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text,
  email text,
  organizacion text,
  tipo text,
  mensaje text,
  origen text
);

alter table public.contactos add column if not exists cargo text;
alter table public.contactos add column if not exists whatsapp text;
alter table public.contactos add column if not exists perfil text;
alter table public.contactos add column if not exists evento text;
alter table public.contactos add column if not exists interes text;
alter table public.contactos add column if not exists estado text not null default 'nuevo';
alter table public.contactos add column if not exists proximo_paso text;
alter table public.contactos add column if not exists fecha_proximo date;
alter table public.contactos add column if not exists notas text;
alter table public.contactos add column if not exists cargado_por text;

alter table public.contactos enable row level security;

do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'contactos' loop
    execute format('drop policy %I on public.contactos', p.policyname);
  end loop;
end $$;

create policy "contactos: enviar" on public.contactos
  for insert to anon, authenticated with check (coalesce(estado, 'nuevo') = 'nuevo');
create policy "contactos: admin carga" on public.contactos
  for insert to authenticated with check (public.es_admin());
create policy "contactos: admin lee" on public.contactos
  for select to authenticated using (public.es_admin());
create policy "contactos: admin edita" on public.contactos
  for update to authenticated using (public.es_admin()) with check (public.es_admin());
create policy "contactos: admin borra" on public.contactos
  for delete to authenticated using (public.es_admin());

grant insert on public.contactos to anon, authenticated;
grant select, update, delete on public.contactos to authenticated;

-- Verificación
select count(*) as contactos_existentes from public.contactos;
