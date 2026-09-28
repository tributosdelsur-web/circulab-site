import { supabase } from './supabase'

// Datos públicos sin información personal. Ver supabase/privacidad.sql.

export type Autor = { nombre: string | null; apellido: string | null }

// Agrega a cada fila el autor público (nombre e inicial del apellido) en `usuarios`,
// igual que antes hacía el embed usuarios(nombre,apellido), sin leer la tabla privada.
export async function conAutores<T extends { usuario_id?: string | null }>(
  filas: T[] | null
): Promise<(T & { usuarios: Autor | null })[]> {
  const lista = filas || []
  const ids = [...new Set(lista.map(f => f.usuario_id).filter((id): id is string => !!id))]
  if (ids.length === 0) return lista.map(f => ({ ...f, usuarios: null }))
  const { data } = await supabase.from('usuarios_publicos').select('id,nombre,apellido').in('id', ids)
  const porId = new Map((data || []).map((u: { id: string; nombre: string | null; apellido: string | null }) => [u.id, { nombre: u.nombre, apellido: u.apellido }]))
  return lista.map(f => ({ ...f, usuarios: (f.usuario_id && porId.get(f.usuario_id)) || null }))
}

// Totales para la home, /metamorfosis y el onepager.
export async function metricasPublicas(): Promise<{ kg: number; usuarios: number }> {
  const { data } = await supabase.rpc('metricas_publicas')
  const m = (data || {}) as { kg_validados?: number | string; usuarios?: number | string }
  return { kg: Number(m.kg_validados || 0), usuarios: Number(m.usuarios || 0) }
}
