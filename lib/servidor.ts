import { createClient } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'

// Valida la sesión de quien llama a una ruta del servidor, con su propio token.
export async function sesionDe(req: NextRequest) {
  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  if (!token) return null
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } }
  )
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return null
  return { user: data.user, supabase }
}

export async function esAdmin(req: NextRequest) {
  const s = await sesionDe(req)
  if (!s) return false
  const { data } = await s.supabase.rpc('es_admin')
  return data === true
}
