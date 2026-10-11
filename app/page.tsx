import { createClient } from '@supabase/supabase-js'
import Landing from './Landing'

export const revalidate = 300

export default async function Page() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await sb.rpc('metricas_publicas')
  const d = (data || {}) as { kg_validados?: number | string; kg_registrados?: number | string; usuarios?: number | string }
  const kg = Number(d.kg_validados || 0)
  const ini = {
    usuarios: Number(d.usuarios || 0),
    kg: Math.round(kg * 10) / 10,
    co2: Math.round(kg * 0.8),
    registrados: Math.round(Number(d.kg_registrados || 0) * 10) / 10,
  }
  return <Landing ini={ini} />
}
