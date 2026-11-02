'use client'
import { useEffect, useState } from 'react'
import SitioNav from '../../components/SitioNav'
import SitioFooter from '../../components/SitioFooter'
import { metricasPublicas } from '../../lib/publico'

const WA_ORG = 'https://wa.me/5491138859820?text=' + encodeURIComponent('Hola OLIVIA, tengo una planta, hotel, consorcio u organización y quiero saber más.')
const WA_AMIGO = 'https://wa.me/?text=' + encodeURIComponent('Vamos a pesar lo orgánico en el Carnaval Ambiental de OLIVIA 🌿 https://oliviacirculab.com.ar/pesaje')

const PASOS = [
  { n: '1', t: 'Traé tu orgánico vegetal', d: 'Yerba, cáscaras, restos de verdura. Lo que ibas a tirar, en una bolsita.' },
  { n: '2', t: 'Lo pesamos en vivo', d: 'En balanza, a la vista de todos y con samba de fondo.' },
  { n: '3', t: 'Queda registrado a tu nombre', d: 'Cargás el peso y la foto desde el celular. Es menos de un minuto.' },
]

export default function Pesaje() {
  const bg = '#06110b', card = '#0b1d13', text = '#eef5f0', sub = '#a9bcb0', accent = '#22c55e', gold = '#facc15', border = 'rgba(134,239,172,.15)'
  const [m, setM] = useState<{ kg: number; usuarios: number } | null>(null)
  useEffect(() => { metricasPublicas().then(setM).catch(() => {}) }, [])
  const boton = { display: 'block', textAlign: 'center' as const, fontWeight: 800, fontSize: 16, padding: '16px 20px', borderRadius: 14, textDecoration: 'none' }

  return (
    <main style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SitioNav text={text} accent={accent} border={border} />

      <section style={{ padding: '44px 20px 28px', maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.22em', color: gold, marginBottom: 14 }}>Pesaje en vivo · Climate Week Argentina</div>
        <h1 style={{ fontSize: 'clamp(36px,9vw,58px)', fontWeight: 900, lineHeight: 1.03, margin: '0 0 16px' }}>Lo que tirás <span style={{ color: accent }}>también cuenta.</span></h1>
        <p style={{ fontSize: 17, color: sub, lineHeight: 1.6, margin: '0 0 26px' }}>Vení con tu orgánico, lo pesamos con samba y tu kilo se suma al dato de lo que Buenos Aires puede devolverle al suelo.</p>
        <a href="/registrar?origen=pesaje" style={{ ...boton, background: accent, color: '#04110a' }}>Registrarme y cargar mi pesaje →</a>
        <a href="/carnaval" style={{ display: 'block', color: accent, fontSize: 14, fontWeight: 700, textDecoration: 'none', padding: 14 }}>Escuchar las sambas</a>
      </section>

      <section style={{ padding: '0 20px 32px', maxWidth: 620, margin: '0 auto' }}>
        <div style={{ background: card, border: '1px solid ' + gold + '55', borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.15em', color: gold, marginBottom: 8 }}>Te esperamos</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px' }}>Carnaval Ambiental de OLIVIA</h2>
          <p style={{ fontSize: 15, margin: '0 0 4px' }}>Viernes 13 de noviembre · 17 a 19 h</p>
          <p style={{ fontSize: 14, color: sub, margin: '0 0 14px' }}>Sede a confirmar. Anotate y te avisamos dónde es.</p>
          <a href="https://luma.com/z4i5rtwf" target="_blank" rel="noopener noreferrer" style={{ ...boton, border: '1px solid ' + gold, color: gold, fontSize: 14, padding: 12 }}>Anotarme en Luma</a>
        </div>
      </section>

      <section style={{ padding: '0 20px 32px', maxWidth: 620, margin: '0 auto', display: 'grid', gap: 10 }}>
        {PASOS.map(p => (
          <div key={p.n} style={{ display: 'flex', gap: 14, background: card, border: '1px solid ' + border, borderRadius: 14, padding: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: accent, color: '#04110a', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.n}</div>
            <div>
              <div style={{ fontWeight: 800, marginBottom: 3 }}>{p.t}</div>
              <div style={{ fontSize: 14, color: sub, lineHeight: 1.5 }}>{p.d}</div>
            </div>
          </div>
        ))}
        <p style={{ fontSize: 14, color: sub, textAlign: 'center', margin: '8px 0 0', lineHeight: 1.6 }}>¿No podés venir? <a href="/registrar" style={{ color: accent, fontWeight: 700 }}>Pesá en casa y registralo igual</a>.</p>
      </section>

      {m && m.kg > 0 && (
        <section style={{ padding: '0 20px 32px', maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 44, fontWeight: 900, color: accent, lineHeight: 1 }}>{m.kg.toLocaleString('es-AR', { maximumFractionDigits: 1 })} kg</div>
          <div style={{ fontSize: 14, color: sub, marginTop: 6 }}>validados hasta hoy, entre {m.usuarios} personas. Es el comienzo: faltás vos.</div>
        </section>
      )}

      <section id="organizaciones" style={{ padding: '0 20px 32px', maxWidth: 620, margin: '0 auto' }}>
        <div style={{ background: accent, color: '#04110a', borderRadius: 16, padding: 22 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px' }}>¿Tenés una planta, un hotel, un restaurante o un consorcio?</h2>
          <p style={{ fontSize: 15, lineHeight: 1.55, margin: '0 0 16px' }}>Hagamos una prueba de un mes: pesamos lo que ya mueven y les queda el dato a su nombre.</p>
          <a href={WA_ORG} target="_blank" rel="noopener noreferrer" style={{ ...boton, background: '#04110a', color: '#eef5f0', fontSize: 15 }}>Hablemos por WhatsApp</a>
        </div>
      </section>

      <section style={{ padding: '0 20px 44px', maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
        <a href={WA_AMIGO} target="_blank" rel="noopener noreferrer" style={{ color: accent, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Invitar a alguien por WhatsApp</a>
        <p style={{ fontSize: 12, color: sub, lineHeight: 1.6, margin: '18px 0 0' }}>Lo que hacemos hoy: pesamos con una balanza digital, cargamos el dato a mano y el equipo lo revisa. Los OLV son un registro ambiental: no tienen valor monetario, no se canjean ni se cobran.</p>
      </section>

      <SitioFooter text={text} sub={sub} border={border} />
    </main>
  )
}
