'use client'
import { useState, useEffect } from 'react'
import { metricasPublicas } from '../../lib/publico'

const FACTOR = 0.8

export default function Observatorio() {
  const [dark, setDark] = useState(true)
  const [lang, setLang] = useState('es')
  const es = lang === 'es'
  const [m, setM] = useState<{ kg: number; usuarios: number } | null>(null)

  useEffect(() => { metricasPublicas().then(setM) }, [])

  const bg = dark ? '#080c16' : '#f0f4f8'
  const text = dark ? '#f5f5f5' : '#0f172a'
  const card = dark ? 'rgba(255,255,255,0.04)' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const sub = dark ? '#8a94a6' : '#5a6474'

  const n = (v: number, d = 0) => v.toLocaleString(es ? 'es-AR' : 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d })

  const metricas = [
    { l: es ? 'Kilos verificados' : 'Verified kilos', v: m ? n(m.kg, 1) : '—', u: 'kg', c: '#22c55e' },
    { l: es ? 'Metano evitado' : 'Methane avoided', v: m ? n(m.kg * FACTOR, 1) : '—', u: 'kg CO₂eq', c: '#0891b2' },
    { l: es ? 'Personas midiendo' : 'People measuring', v: m ? n(m.usuarios) : '—', u: '', c: '#d97706' },
  ]

  const contexto = es ? [
    { d: '~6.000 t/día', l: 'Residuos sólidos urbanos que CABA envía a relleno sanitario', f: 'CEAMSE — estadísticas de disposición final' },
    { d: '~45%', l: 'Fracción orgánica dentro de esos residuos', f: 'APRA — caracterización de RSU de CABA' },
    { d: '10 t/día', l: 'Capacidad instalada del Centro de Reciclaje de la Ciudad para orgánicos, con diseño modular hasta 40', f: 'Ciudad de Buenos Aires — Centro de Reciclaje' },
    { d: 'A pedido', l: 'El SERFO retira la fracción orgánica sin costo para el generador (Ley 4.120)', f: 'Ley 4.120 / Res. 1177/2023' },
  ] : [
    { d: '~6,000 t/day', l: 'Municipal solid waste Buenos Aires sends to landfill', f: 'CEAMSE — final disposal statistics' },
    { d: '~45%', l: 'Organic fraction within that waste', f: 'APRA — Buenos Aires MSW characterization' },
    { d: '10 t/day', l: 'Installed organic capacity at the City Recycling Centre, modular up to 40', f: 'City of Buenos Aires — Recycling Centre' },
    { d: 'On request', l: 'SERFO collects the organic fraction at no cost to the generator (Law 4.120)', f: 'Law 4.120 / Res. 1177/2023' },
  ]

  const faltante = es ? [
    'Cuántos kilos de orgánico salen efectivamente de cada edificio, por separado del resto.',
    'Qué proporción de lo que se separa en origen llega realmente a una planta de tratamiento.',
    'Cuánto material orgánico se procesa en instalaciones privadas o cooperativas, fuera del circuito estatal.',
    'Qué capacidad ociosa real tienen hoy las plantas habilitadas.',
  ] : [
    'How many kilos of organics actually leave each building, separated from the rest.',
    'What share of what is separated at source actually reaches a treatment plant.',
    'How much organic material is processed in private or cooperative facilities, outside the state circuit.',
    'How much idle capacity licensed plants really have today.',
  ]

  const H = ({ n: num, t, c }: { n: string; t: string; c: string }) => (
    <h2 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: c, fontWeight: 800, margin: '46px 0 14px' }}>
      {num} · {t}
    </h2>
  )

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui', transition: 'all 0.2s' }}>

      <nav style={{ padding: '12px 20px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8, background: dark ? 'rgba(8,12,22,0.98)' : 'rgba(240,244,248,0.98)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flexShrink: 1, textDecoration: 'none' }}>
          <img src="/logoOC.png" alt="OLIVIA" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 8 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: text }}>OLIVIA Circulab</div>
            <div style={{ fontSize: 9, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{es ? 'Observatorio' : 'Observatory'}</div>
          </div>
        </a>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <button onClick={() => setLang(es ? 'en' : 'es')} style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 6, padding: '4px 10px', color: '#22c55e', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
            {es ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setDark(!dark)} style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: `1px solid ${border}`, borderRadius: 6, padding: '4px 8px', fontSize: 14, cursor: 'pointer' }}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 20px 80px' }}>

        <section style={{ textAlign: 'center', padding: '12px 0 6px' }}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: '100%', maxWidth: 240, height: 'auto', display: 'block', margin: '0 auto 14px' }} />
          <div style={{ fontSize: 11, color: sub, lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
            {es ? 'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental' : 'Latin American Office for Environmental Valuation and Intelligence Information'}
          </div>
        </section>

        <h1 style={{ fontSize: 'clamp(28px,6vw,44px)', lineHeight: 1.1, fontWeight: 900, margin: '30px 0 14px', letterSpacing: '-0.02em', textAlign: 'center' }}>
          {es ? 'Observatorio' : 'Observatory'}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: sub, maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          {es ? 'Lo que medimos, lo que la ciudad publica y lo que todavía nadie mide. Sin estimaciones propias disfrazadas de datos.' : 'What we measure, what the city publishes, and what nobody measures yet. No estimates of ours dressed up as data.'}
        </p>

        <H n="1" t={es ? 'Datos propios, en vivo' : 'Our own data, live'} c="#22c55e" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 10 }}>
          {metricas.map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '18px 16px' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: x.c, letterSpacing: '-0.02em' }}>
                {x.v}
                {x.u && <span style={{ fontSize: 12, fontWeight: 600, color: sub, marginLeft: 4 }}>{x.u}</span>}
              </div>
              <div style={{ fontSize: 12, color: sub, marginTop: 5, lineHeight: 1.35 }}>{x.l}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: sub, lineHeight: 1.55, marginTop: 12 }}>
          {es
            ? `Solo contamos registros verificados: los que tienen origen, peso, traslado y confirmación de procesamiento. Lo registrado sin verificar no aparece acá. El metano evitado se calcula con un factor de ${FACTOR} kg CO₂eq por kilo desviado de relleno sanitario: es un valor conservador que elegimos nosotros y no equivale a un crédito de carbono emitido.`
            : `We count verified records only: those with origin, weight, transfer and processing confirmation. Unverified entries do not appear here. Methane avoided uses a factor of ${FACTOR} kg CO₂eq per kilo diverted from landfill — a conservative value we chose ourselves, not an issued carbon credit.`}
        </p>

        <H n="2" t={es ? 'Contexto de la ciudad' : 'City context'} c="#0891b2" />
        <div style={{ display: 'grid', gap: 9 }}>
          {contexto.map((c, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em' }}>{c.d}</span>
                <span style={{ fontSize: 14, color: sub, lineHeight: 1.45, flex: 1, minWidth: 180 }}>{c.l}</span>
              </div>
              <div style={{ fontSize: 11, color: sub, marginTop: 8, opacity: 0.8 }}>{es ? 'Fuente' : 'Source'}: {c.f}</div>
            </div>
          ))}
        </div>

        <H n="3" t={es ? 'Lo que nadie mide' : 'What nobody measures'} c="#d97706" />
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '20px 20px 18px' }}>
          <p style={{ fontSize: 14, color: sub, lineHeight: 1.6, margin: '0 0 14px' }}>
            {es ? 'Estos datos no existen públicamente en ninguna fuente de la ciudad. No es una crítica: nadie los pidió hasta ahora porque no había para qué. Un sistema de verificación los necesita.' : 'None of this exists publicly in any city source. That is not a criticism: nobody needed it until now. A verification system does.'}
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            {faltante.map((x, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{x}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 34, flexWrap: 'wrap' }}>
          <a href="/organicos" style={{ background: '#d97706', color: '#fff', textDecoration: 'none', padding: '13px 22px', borderRadius: 11, fontSize: 14, fontWeight: 700 }}>
            {es ? 'El diagnóstico de orgánicos' : 'The organics diagnosis'}
          </a>
          <a href="/operadores" style={{ color: text, textDecoration: 'none', padding: '13px 22px', borderRadius: 11, fontSize: 14, fontWeight: 700, border: `1px solid ${border}` }}>
            {es ? 'Si operás material' : 'If you move material'}
          </a>
        </div>

      </div>
    </div>
  )
}
