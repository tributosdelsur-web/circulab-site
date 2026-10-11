'use client'
import { useState } from 'react'
import { useTema, Rubro, Titulo, FUENTE } from '../../lib/ui'

const FACTOR_CO2 = 0.8
const COMISION = 0.35

export default function Ahorro() {
  const t = useTema()
  const { es, dark, bg, text, card, border, sub, accent } = t

  const [kgDia, setKgDia] = useState(120)
  const [dias, setDias] = useState(26)
  const [tarifa, setTarifa] = useState(45000)

  const kgMes = kgDia * dias
  const ahorro = (kgMes / 1000) * tarifa
  const fee = ahorro * COMISION
  const neto = ahorro - fee
  const co2 = kgMes * FACTOR_CO2

  const n = (v: number, d = 0) => v.toLocaleString('es-AR', { minimumFractionDigits: d, maximumFractionDigits: d })
  const pesos = (v: number) => '$ ' + n(v, 0)

  const Campo = ({ l, nota, v, set, min, max, step, suf }: any) => (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
        <label style={{ fontSize: 13.5, fontWeight: 600 }}>{l}</label>
        <span style={{ fontSize: 16, fontWeight: 800, color: accent, fontFamily: 'ui-monospace, monospace', whiteSpace: 'nowrap' }}>
          {n(v, 0)}<span style={{ fontSize: 11, color: sub, marginLeft: 4, fontWeight: 600 }}>{suf}</span>
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={v}
        onChange={e => set(Number(e.target.value))}
        style={{ width: '100%', accentColor: accent, cursor: 'pointer' }} />
      {nota && <div style={{ fontSize: 11, color: sub, marginTop: 7, lineHeight: 1.5 }}>{nota}</div>}
    </div>
  )

  const Dato = ({ l, v, c, grande }: any) => (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: grande ? '22px 20px' : '16px 18px' }}>
      <div style={{ fontSize: 10.5, color: sub, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{l}</div>
      <div style={{ fontSize: grande ? 'clamp(26px,5vw,34px)' : 20, fontWeight: 900, color: c, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{v}</div>
    </div>
  )

  const H = ({ r, tt }: { r: string; tt: string }) => (
    <div style={{ margin: '54px 0 18px' }}>
      <Rubro t={t}>{r}</Rubro>
      <Titulo size={25}>{tt}</Titulo>
    </div>
  )

  const supuestos = es ? [
    ['La tarifa la ponés vos', 'Es el único dato que no publicamos, porque lo define CEAMSE y lo estamos pidiendo por escrito. Vos lo conocés: figura en tu factura de recolección de húmedos.'],
    ['El ahorro no es automático', 'Aparece sobre el material que efectivamente se separa y se deriva a la fracción orgánica, que el SERFO retira sin cargo por Ley 4.120. Lo que se mezcla, se sigue pagando.'],
    ['Nuestra tarifa es un porcentaje', 'Un 35 % del ahorro verificado, dentro del rango de 30 a 40 que publicamos. Nunca puede superar el ahorro: si no hay ahorro, no hay factura.'],
    ['El CO₂ es una estimación declarada', 'Calculado con un factor conservador de 0,8 kg CO₂eq por kilo desviado. No es un crédito de carbono emitido y no lo presentamos como tal.'],
  ] : [
    ['You set the tariff', 'It is the one figure we do not publish, because CEAMSE defines it. You know it: it is on your wet waste collection invoice.'],
    ['The saving is not automatic', 'It applies to material actually separated into the organic fraction, which SERFO collects at no charge under Law 4.120.'],
    ['Our fee is a share', '35 % of the verified saving, within the 30 to 40 range we publish. It can never exceed the saving.'],
    ['The CO₂ figure is a declared estimate', 'Using a conservative factor of 0.8 kg CO₂eq per kilo diverted. It is not an issued carbon credit.'],
  ]

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: FUENTE, transition: 'all 0.3s' }}>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: dark ? 'rgba(10,14,26,0.9)' : 'rgba(240,244,248,0.9)', borderBottom: `1px solid ${border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', minWidth: 0, flexShrink: 1 }}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Circulab Tech</div>
            <div style={{ fontSize: 9, color: sub, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'monospace' }}>{es ? 'Calculadora de ahorro' : 'Savings calculator'}</div>
          </div>
        </a>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <button onClick={() => t.setLang(es ? 'en' : 'es')} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: text, fontFamily: 'monospace' }}>{es ? 'EN' : 'ES'}</button>
          <button onClick={() => t.setDark(!dark)} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 9px', fontSize: 12, cursor: 'pointer', background: 'transparent', color: text }}>{dark ? '☀️' : '🌙'}</button>
        </div>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>

        <Rubro t={t}>{es ? 'Generadores especiales · Ley 1854' : 'Special generators · Law 1854'}</Rubro>
        <h1 style={{ fontSize: 'clamp(28px,5.4vw,42px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 18px' }}>
          {es
            ? <>No te decimos cuánto ahorrás. <span style={{ color: accent, fontStyle: 'italic' }}>Lo calculás vos.</span></>
            : <>We do not tell you what you save. <span style={{ color: accent, fontStyle: 'italic' }}>You work it out.</span></>}
        </h1>
        <p style={{ fontSize: 15.5, lineHeight: 1.7, color: sub, maxWidth: 600, margin: 0 }}>
          {es
            ? 'Si sos generador especial, pagás la recolección de tu fracción húmeda y el Estado retira gratis la orgánica separada. Poné tus números: los kilos son tuyos y la tarifa está en tu factura.'
            : 'If you are a special generator you pay for wet fraction collection while the State collects the separated organic fraction for free. Enter your numbers.'}
        </p>

        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 18, padding: '26px 24px 20px', marginTop: 30 }}>
          <Campo
            l={es ? 'Orgánico separable por día' : 'Separable organics per day'}
            suf="kg" v={kgDia} set={setKgDia} min={20} max={1500} step={10}
            nota={es ? 'Restos de cocina, yerba, café, poda. No incluye lo que no es compostable.' : 'Kitchen scraps, yerba, coffee, garden trimmings.'}
          />
          <Campo
            l={es ? 'Días de operación al mes' : 'Operating days per month'}
            suf={es ? 'días' : 'days'} v={dias} set={setDias} min={4} max={31} step={1}
          />
          <Campo
            l={es ? 'Tu tarifa de fracción húmeda' : 'Your wet fraction tariff'}
            suf={es ? '$/tonelada' : '$/tonne'} v={tarifa} set={setTarifa} min={0} max={200000} step={1000}
            nota={es ? 'Está en tu factura del servicio privado de recolección de húmedos. Si la ponés en cero, el ahorro es cero y nuestra tarifa también.' : 'It is on your private wet waste collection invoice.'}
          />
        </div>

        <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
          <Dato grande l={es ? 'Ahorro mensual estimado' : 'Estimated monthly saving'} v={pesos(ahorro)} c={accent} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 10 }}>
            <Dato l={es ? 'Kilos desviados por mes' : 'Kilos diverted monthly'} v={n(kgMes) + ' kg'} c={text} />
            <Dato l={es ? 'Tarifa OLIVIA (35 %)' : 'OLIVIA fee (35 %)'} v={pesos(fee)} c="#f59e0b" />
            <Dato l={es ? 'Queda en tu bolsillo' : 'Stays with you'} v={pesos(neto)} c={accent} />
            <Dato l={es ? 'Metano evitado' : 'Methane avoided'} v={n(co2, 0) + ' kg CO₂eq'} c="#0891b2" />
          </div>
        </div>

        <H r={es ? 'Lo que esta cuenta supone' : 'What this assumes'} tt={es ? 'Cuatro supuestos, declarados.' : 'Four assumptions, declared.'} />
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '22px 22px 20px' }}>
          <div style={{ display: 'grid', gap: 13 }}>
            {supuestos.map((x, i) => (
              <div key={i}>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{x[0]}</div>
                <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.65, marginTop: 18, paddingTop: 15, borderTop: `1px solid ${border}` }}>
            {es
              ? 'Esta calculadora da un orden de magnitud, no una cotización. El número real sale del diagnóstico inicial, donde medimos tu generación durante dos semanas antes de proponerte nada.'
              : 'This calculator gives an order of magnitude, not a quote. The real figure comes from the initial assessment.'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <a href="/contacto" style={{ background: accent, color: dark ? '#050505' : 'white', textDecoration: 'none', padding: '14px 28px', borderRadius: 40, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {es ? 'Pedir el diagnóstico' : 'Request the assessment'}
          </a>
          <a href="/organicos" style={{ color: text, textDecoration: 'none', padding: '14px 28px', borderRadius: 40, fontSize: 11, fontWeight: 700, border: `1px solid ${border}`, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {es ? 'Cómo funciona el sistema' : 'How the system works'}
          </a>
        </div>

      </div>
    </div>
  )
}
