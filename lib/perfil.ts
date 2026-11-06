import { supabase } from './supabase'

// Garantiza que exista la fila en `usuarios` para la sesión actual.
// Hace falta porque, si Supabase pide confirmar el email, la cuenta se crea sin sesión
// y el perfil no se alcanza a guardar en /registro. Los datos van en user_metadata.
export async function asegurarPerfil(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data: existe } = await supabase.from('usuarios').select('id').eq('id', user.id).maybeSingle()
  if (existe) return true
  const m: any = user.user_metadata || {}
  const { error } = await supabase.from('usuarios').insert({
    id: user.id,
    nombre: m.nombre || (user.email || '').split('@')[0],
    apellido: m.apellido || '',
    email: user.email,
    consorcio: m.consorcio || 'Consorcio Piloto CABA',
    barrio: m.barrio || 'CABA, Argentina',
    nivel: 'Semilla',
    score_pulso: 0,
  })
  return !error
}
