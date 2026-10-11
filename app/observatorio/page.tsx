import { createClient } from '@supabase/supabase-js'
import ObservatorioVista from './Vista'

export const revalidate = 300

export default async function Observatorio() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await sb.rpc('metricas_publicas')
  const d = (data || {}) as { kg_validados?: number | string; kg_registrados?: number | string; usuarios?: number | string }
  const m = {
    kg: Number(d.kg_validados || 0),
    kgRegistrados: Number(d.kg_registrados || 0),
    usuarios: Number(d.usuarios || 0),
  }
  return <ObservatorioVista m={m} />
}
