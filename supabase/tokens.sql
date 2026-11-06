-- OLIVIA · Tokens y puntos (pegar entero en Supabase → SQL Editor → Run). Se puede correr más de una vez.
--
-- Qué hace:
--  1. Un registro nuevo de un usuario siempre entra como "pendiente" (solo el admin valida).
--  2. Nadie puede cambiarse a mano su nivel ni su puntaje PULSO.
--  3. Los puntos de actividad los asigna la base con montos fijos y topes diarios (función sumar_puntos).
--     El navegador ya no puede escribir en la billetera.
--  4. Los posts no pueden declarar más de 20 puntos.
--  5. Recalcula el puntaje y el nivel de cada persona con lo que ya tenía en la billetera.

begin;

-- 1. Residuos: el usuario solo carga pendientes ---------------------------------
create or replace function public.residuo_nuevo_pendiente() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not coalesce(public.es_admin(), false) then
    new.status := 'pendiente';
  end if;
  return new;
end $$;

drop trigger if exists residuo_nuevo_pendiente on public.residuos;
create trigger residuo_nuevo_pendiente before insert on public.residuos
  for each row execute function public.residuo_nuevo_pendiente();

-- 2. Usuarios: nivel y puntaje protegidos ----------------------------------------
create or replace function public.usuario_protegido() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if coalesce(public.es_admin(), false) or current_setting('olivia.sistema', true) = '1' then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.nivel := 'Semilla';
    new.score_pulso := 0;
  else
    new.nivel := old.nivel;
    new.score_pulso := old.score_pulso;
  end if;
  return new;
end $$;

drop trigger if exists usuario_protegido on public.usuarios;
create trigger usuario_protegido before insert or update on public.usuarios
  for each row execute function public.usuario_protegido();

-- 3. Billetera de puntos: solo la base escribe ------------------------------------
alter table public.wallet_transacciones add column if not exists ref text;

drop policy if exists "wallet: registrar la propia" on public.wallet_transacciones;
drop policy if exists "wallet: registra solo admin" on public.wallet_transacciones;
create policy "wallet: registra solo admin" on public.wallet_transacciones
  for insert to authenticated with check (public.es_admin());

create or replace function public.nivel_de(p integer) returns text
language sql immutable as $$
  select case when p >= 1500 then 'Árbol' when p >= 500 then 'Raíz' when p >= 100 then 'Brote' else 'Semilla' end
$$;

create or replace function public.sumar_puntos(p_tipo text, p_ref text default null)
returns integer language plpgsql security definer set search_path = public as $$
declare
  v_uid   uuid := auth.uid();
  v_dest  uuid;
  v_monto integer;
  v_tope  integer;
  v_desc  text;
  v_hoy   integer;
  v_hechos integer;
  v_total integer;
begin
  if v_uid is null then return 0; end if;
  v_dest := v_uid;

  case p_tipo
    when 'bienvenida'    then v_monto := 100; v_tope := 1;  v_desc := 'Bienvenida a OLIVIA';
    when 'registro'      then v_monto := 10;  v_tope := 5;  v_desc := 'Registro de residuo';
    when 'post'          then v_monto := 10;  v_tope := 5;  v_desc := 'Post en la comunidad';
    when 'post_registro' then v_monto := 20;  v_tope := 3;  v_desc := 'Registro compartido en la comunidad';
    when 'story'         then v_monto := 10;  v_tope := 3;  v_desc := 'Story publicada';
    when 'comentario'    then v_monto := 5;   v_tope := 10; v_desc := 'Comentario';
    when 'like_recibido' then v_monto := 2;   v_tope := 0;  v_desc := 'Like recibido en tu post';
    else return 0;
  end case;

  if p_tipo = 'bienvenida' then
    if exists (select 1 from wallet_transacciones
               where usuario_id = v_uid and tipo in ('bienvenida', 'bonus_bienvenida')) then
      return 0;
    end if;

  elsif p_tipo = 'like_recibido' then
    -- p_ref = id del post. Solo si quien llama le dio like, no es su propio post, y una sola vez por persona y post.
    select usuario_id into v_dest from posts where id::text = p_ref;
    if v_dest is null or v_dest = v_uid then return 0; end if;
    if not exists (select 1 from likes where post_id::text = p_ref and usuario_id = v_uid) then return 0; end if;
    p_ref := p_ref || ':' || v_uid::text;
    if exists (select 1 from wallet_transacciones where tipo = 'like_recibido' and ref = p_ref) then return 0; end if;

  else
    -- Tope diario, y nunca más puntos que acciones reales hechas en las últimas 24 horas.
    select count(*) into v_hoy from wallet_transacciones
      where usuario_id = v_uid and tipo = p_tipo and created_at > now() - interval '1 day';
    v_hechos := case p_tipo
      when 'registro'   then (select count(*) from residuos   where usuario_id = v_uid and created_at > now() - interval '1 day')
      when 'comentario' then (select count(*) from comentarios where usuario_id = v_uid and created_at > now() - interval '1 day')
      when 'story'      then (select count(*) from stories    where usuario_id = v_uid and created_at > now() - interval '1 day')
      else                   (select count(*) from posts      where usuario_id = v_uid and created_at > now() - interval '1 day')
    end;
    if v_hoy >= least(v_tope, v_hechos) then return 0; end if;
  end if;

  insert into wallet_transacciones (usuario_id, tipo, monto_olv, tipo_olv, descripcion, ref)
    values (v_dest, p_tipo, v_monto, 'puntos', '⭐ Puntos de actividad · ' || v_desc, p_ref);

  perform set_config('olivia.sistema', '1', true);
  update usuarios set score_pulso = coalesce(score_pulso, 0) + v_monto where id = v_dest
    returning score_pulso into v_total;
  update usuarios set nivel = public.nivel_de(coalesce(v_total, 0)) where id = v_dest;
  perform set_config('olivia.sistema', '0', true);

  return v_monto;
end $$;

revoke all on function public.sumar_puntos(text, text) from public;
grant execute on function public.sumar_puntos(text, text) to authenticated;

-- 4. Posts: tope de puntos declarados -------------------------------------------
create or replace function public.post_puntos_tope() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not coalesce(public.es_admin(), false) then
    new.olv_ganados := least(greatest(coalesce(new.olv_ganados, 0), 0), 20);
  end if;
  return new;
end $$;

drop trigger if exists post_puntos_tope on public.posts;
create trigger post_puntos_tope before insert on public.posts
  for each row execute function public.post_puntos_tope();

-- 5. Recalcular puntaje y nivel con lo que ya estaba en la billetera --------------
select set_config('olivia.sistema', '1', true);
update public.usuarios u set
  score_pulso = coalesce(w.total, 0),
  nivel = public.nivel_de(coalesce(w.total, 0))
from (select usuario_id, sum(monto_olv)::integer as total from public.wallet_transacciones group by usuario_id) w
where w.usuario_id = u.id;
select set_config('olivia.sistema', '0', true);

commit;

-- Verificación: debería mostrar los triggers y la función.
select tgname from pg_trigger where tgname in ('residuo_nuevo_pendiente', 'usuario_protegido', 'post_puntos_tope');
