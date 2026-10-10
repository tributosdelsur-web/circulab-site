'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const BG='#0a0a0a', CARD='#141414', BORDER='#262626', SUB='#8a8a8a'
const FACTOR = 0.8 // kg CO2eq evitado por kg de orgánico desviado de relleno

type Fila = { kg: number | null; tipo: string | null; status: string | null; usuario_id: string | null }

export default function Observatorio() {
  const [filas, setFilas] = useState<Fila[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    supabase.from('residuos').select('kg,tipo,status,usuario_id').then(({ data }) => {
      setFilas((data as Fila[]) || [])
      setCargando(false)
    })
  }, [])

  const validados = filas.filter(f => f.status === 'validado')
  const kgVal = validados.reduce((a, f) => a + (f.kg || 0), 0)
  const kgTot = filas.reduce((a, f) => a + (f.kg || 0), 0)
  const personas = new Set(filas.map(f => f.usuario_id).filter(Boolean)).size
  const co2 = kgVal * FACTOR

  const n = (v: number, d = 0) => v.toLocaleString('es-AR', { minimumFractionDigits: d, maximumFractionDigits: d })

  const metricas = [
    { l: 'Kilos verificados', v: n(kgVal, 1), u: 'kg', c: '#16a34a' },
    { l: 'Kilos registrados', v: n(kgTot, 1), u: 'kg', c: '#65a30d' },
    { l: 'Metano evitado', v: n(co2, 1), u: 'kg CO₂eq', c: '#0891b2' },
    { l: 'Personas midiendo', v: n(personas), u: '', c: '#92400e' },
  ]

  const contexto = [
    { d: '~6.000 t/día', l: 'Residuos sólidos urbanos que CABA envía a relleno sanitario', f: 'CEAMSE — estadísticas de disposición final' },
    { d: '~45%', l: 'Fracción orgánica dentro de esos residuos', f: 'APRA — caracterización de RSU de CABA' },
    { d: '10 t/día', l: 'Capacidad instalada del Centro de Reciclaje de la Ciudad para orgánicos, con diseño modular hasta 40', f: 'Ciudad de Buenos Aires — Centro de Reciclaje' },
    { d: 'A pedido', l: 'El SERFO retira la fracción orgánica sin costo para el generador (Ley 4.120)', f: 'Ley 4.120 / Res. 1177/2023' },
  ]

  const faltante = [
    'Cuántos kilos de orgánico sale efectivamente de cada edificio, por separado del resto.',
    'Qué proporción de lo que se separa en origen llega realmente a una planta de tratamiento.',
    'Cuánto material orgánico se procesa en instalaciones privadas o cooperativas, fuera del circuito estatal.',
    'Qué capacidad ociosa real tienen hoy las plantas habilitadas.',
  ]

  return (
    <main style={{ background: BG, color: '#fff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 20px 80px' }}>

        <a href="/" style={{ color: SUB, textDecoration: 'none', fontSize: 13 }}>← Inicio</a>

        <h1 style={{ fontSize: 'clamp(30px,6vw,46px)', lineHeight: 1.1, fontWeight: 900, margin: '22px 0 14px', letterSpacing: '-0.02em' }}>
          Observatorio
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#d4d4d4', maxWidth: 620, margin: '0 0 10px' }}>
          Lo que medimos, lo que la ciudad publica y lo que todavía nadie mide. Sin estimaciones propias disfrazadas de datos.
        </p>

        {/* CAPA 1 — EN VIVO */}
        <h2 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#16a34a', fontWeight: 800, margin: '46px 0 14px' }}>
          1 · Datos propios, en vivo
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 10 }}>
          {metricas.map((m, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '18px 16px' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: m.c, letterSpacing: '-0.02em' }}>
                {cargando ? '—' : m.v}
                {m.u && <span style={{ fontSize: 12, fontWeight: 600, color: SUB, marginLeft: 4 }}>{m.u}</span>}
              </div>
              <div style={{ fontSize: 12, color: SUB, marginTop: 5, lineHeight: 1.35 }}>{m.l}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: SUB, lineHeight: 1.55, marginTop: 12 }}>
          «Verificado» significa que el registro tiene origen, peso, traslado y confirmación de procesamiento. El resto queda
          registrado pero no computa. El metano evitado se calcula con un factor de {FACTOR} kg CO₂eq por kilo desviado de
          relleno sanitario: es un valor conservador que elegimos nosotros y no equivale a un crédito de carbono emitido.
        </p>

        {/* CAPA 2 — CONTEXTO */}
        <h2 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0891b2', fontWeight: 800, margin: '46px 0 14px' }}>
          2 · Contexto de la ciudad
        </h2>
        <div style={{ display: 'grid', gap: 9 }}>
          {contexto.map((c, i) => (
            <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>{c.d}</span>
                <span style={{ fontSize: 14, color: '#d4d4d4', lineHeight: 1.45, flex: 1, minWidth: 180 }}>{c.l}</span>
              </div>
              <div style={{ fontSize: 11, color: SUB, marginTop: 8 }}>Fuente: {c.f}</div>
            </div>
          ))}
        </div>

        {/* CAPA 3 — LO QUE NADIE MIDE */}
        <h2 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#92400e', fontWeight: 800, margin: '46px 0 14px' }}>
          3 · Lo que nadie mide
        </h2>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '20px 20px 18px' }}>
          <p style={{ fontSize: 14, color: '#d4d4d4', lineHeight: 1.6, margin: '0 0 14px' }}>
            Estos datos no existen públicamente en ninguna fuente de la ciudad. No es una crítica: nadie los pidió hasta ahora
            porque no había para qué. Un sistema de verificación los necesita.
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            {faltante.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#92400e', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: 14, color: '#d4d4d4', lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 34, flexWrap: 'wrap' }}>
          <a href="/organicos" style={{ background: '#92400e', color: '#fff', textDecoration: 'none', padding: '13px 22px', borderRadius: 11, fontSize: 14, fontWeight: 700 }}>
            El diagnóstico de orgánicos
          </a>
          <a href="/operadores" style={{ background: 'transparent', color: '#fff', textDecoration: 'none', padding: '13px 22px', borderRadius: 11, fontSize: 14, fontWeight: 700, border: `1px solid ${BORDER}` }}>
            Si operás material
          </a>
        </div>

      </div>
    </main>
  )
}
