-- ============================================================================
-- OLIVIA · Privacidad de datos (28/09/2026)
--
-- Antes: con la clave pública del sitio cualquiera podía leer usuarios
-- (nombre, apellido, email, barrio), residuos (GPS de origen, fotos), leads de
-- inversores, firmas de NDA y el CRM. El panel admin usaba una contraseña
-- escrita en el código del sitio.
--
-- Después:
--   · Cada usuario ve y carga solo lo suyo.
--   · Solo las cuentas de la tabla `admins`, con sesión iniciada, ven todo.
--   · Los formularios públicos (leads, NDA, encuestas) solo pueden INSERTAR.
--   · Lo público sale de vistas sin datos sensibles y de una función de totales.
--
-- Cómo correrlo: Supabase → SQL Editor → New query → pegar todo → Run.
-- Antes de correrlo, cambiar el email de la última línea por el tuyo.
-- Se puede correr más de una vez.
-- ============================================================================

-- 1. Administradores ----------------------------------------------------------
create table if not exists public.admins (
  email text primary key check (email = lower(email))
);
alter table public.admins enable row level security;
-- sin políticas: nadie la lee ni la escribe desde el sitio

create or replace function public.es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins
                 where email = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
revoke all on function public.es_admin() from public;
grant execute on function public.es_admin() to anon, authenticated;

-- 2. Borrar TODAS las políticas actuales de estas tablas y activar RLS ----------
do $$
declare t text; p record;
begin
  foreach t in array array[
    'usuarios','residuos','wallet_transacciones','posts','comentarios','likes',
    'stories','feedback','encuestas','leads_inversores','leads_aom',
    'leads_quincena','alianzas_leads','nda_firmas','onepager_descargas',
    'whitepaper_descargas','inversores_crm','postulaciones','plantas_reciclaje']
  loop
    if to_regclass('public.' || t) is not null then
      for p in select policyname from pg_policies
               where schemaname = 'public' and tablename = t loop
        execute format('drop policy %I on public.%I', p.policyname, t);
      end loop;
      execute format('alter table public.%I enable row level security', t);
    end if;
  end loop;
end $$;

-- 3. Usuarios: cada uno lo suyo; el admin todo ---------------------------------
create policy "usuarios: ver el propio o admin" on public.usuarios
  for select to authenticated using (id = auth.uid() or public.es_admin());
create policy "usuarios: crear el propio" on public.usuarios
  for insert to authenticated with check (id = auth.uid());
create policy "usuarios: editar el propio o admin" on public.usuarios
  for update to authenticated using (id = auth.uid() or public.es_admin())
  with check (id = auth.uid() or public.es_admin());

-- Perfil público: solo nombre, inicial del apellido, nivel y puntaje
create or replace view public.usuarios_publicos as
  select id, nombre, left(coalesce(apellido, ''), 1) as apellido, nivel, score_pulso
  from public.usuarios;
grant select on public.usuarios_publicos to anon, authenticated;

-- 4. Residuos: GPS, fotos y notas solo para el dueño y el admin ----------------
create policy "residuos: ver los propios o admin" on public.residuos
  for select to authenticated using (usuario_id = auth.uid() or public.es_admin());
create policy "residuos: cargar los propios" on public.residuos
  for insert to authenticated with check (usuario_id = auth.uid());
create policy "residuos: validar solo admin" on public.residuos
  for update to authenticated using (public.es_admin()) with check (public.es_admin());

-- Historial público de un perfil: sin coordenadas, fotos ni notas
create or replace view public.residuos_publicos as
  select id, usuario_id, tipo, kg, status, created_at
  from public.residuos;
grant select on public.residuos_publicos to anon, authenticated;

-- Totales para la home, /metamorfosis y el onepager
create or replace function public.metricas_publicas() returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'kg_validados', coalesce((select sum(kg) from public.residuos where status = 'validado'), 0),
    'usuarios',     (select count(*) from public.usuarios)
  );
$$;
revoke all on function public.metricas_publicas() from public;
grant execute on function public.metricas_publicas() to anon, authenticated;

-- 5. Billetera OLV: cada uno ve y registra lo suyo ------------------------------
create policy "wallet: ver la propia o admin" on public.wallet_transacciones
  for select to authenticated using (usuario_id = auth.uid() or public.es_admin());
create policy "wallet: registrar la propia" on public.wallet_transacciones
  for insert to authenticated with check (usuario_id = auth.uid() or public.es_admin());

-- 6. Comunidad: se lee en público; cada uno publica y borra lo suyo ------------
do $$
declare t text;
begin
  foreach t in array array['posts','comentarios','likes','stories'] loop
    if to_regclass('public.' || t) is not null then
      execute format('create policy "%s: lectura publica" on public.%I for select to anon, authenticated using (true)', t, t);
      execute format('create policy "%s: publicar lo propio" on public.%I for insert to authenticated with check (usuario_id = auth.uid() or public.es_admin())', t, t);
      execute format('create policy "%s: borrar lo propio" on public.%I for delete to authenticated using (usuario_id = auth.uid() or public.es_admin())', t, t);
    end if;
  end loop;
end $$;

-- 7. Formularios públicos: solo insertar; leer y editar, solo admin ------------
do $$
declare t text;
begin
  foreach t in array array['feedback','encuestas','leads_inversores','leads_aom',
    'leads_quincena','alianzas_leads','nda_firmas','onepager_descargas','whitepaper_descargas'] loop
    if to_regclass('public.' || t) is not null then
      execute format('create policy "%s: enviar" on public.%I for insert to anon, authenticated with check (true)', t, t);
      execute format('create policy "%s: admin lee" on public.%I for select to authenticated using (public.es_admin())', t, t);
      execute format('create policy "%s: admin edita" on public.%I for update to authenticated using (public.es_admin()) with check (public.es_admin())', t, t);
      execute format('create policy "%s: admin borra" on public.%I for delete to authenticated using (public.es_admin())', t, t);
    end if;
  end loop;
end $$;

-- 8. Tablas internas: solo admin ----------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['inversores_crm','postulaciones'] loop
    if to_regclass('public.' || t) is not null then
      execute format('create policy "%s: solo admin" on public.%I for all to authenticated using (public.es_admin()) with check (public.es_admin())', t, t);
    end if;
  end loop;
end $$;

-- 9. Plantas de reciclaje: lectura pública (las usa /api/ping) ------------------
do $$ begin
  if to_regclass('public.plantas_reciclaje') is not null then
    create policy "plantas: lectura publica" on public.plantas_reciclaje
      for select to anon, authenticated using (true);
    create policy "plantas: admin edita" on public.plantas_reciclaje
      for all to authenticated using (public.es_admin()) with check (public.es_admin());
  end if;
end $$;

-- 10. Tu cuenta de admin ---------------------------------------------------------
-- Cambiá el email (en minúsculas). Esa cuenta tiene que existir en
-- Authentication → Users (email + contraseña). Si no existe: Add user →
-- Create new user → marcar "Auto Confirm".
insert into public.admins (email) values ('CAMBIAR@tu-email.com') on conflict do nothing;
