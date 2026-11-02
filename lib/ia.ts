import { supabase } from './supabase'

// Llamadas del panel admin a la IA: pasan por /api/ia, que guarda la clave en el servidor.
export async function fetchIA(url: string, opciones: RequestInit) {
  const { data } = await supabase.auth.getSession()
  return fetch(url, {
    ...opciones,
    headers: { ...(opciones.headers || {}), Authorization: `Bearer ${data.session?.access_token || ''}` },
  })
}
