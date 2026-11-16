import SitioNav from '../../components/SitioNav'
import SitioFooter from '../../components/SitioFooter'

// Oferta única para grandes generadores: diagnóstico de 30 días con precio fijo.
// Sin tokens, sin Verra, sin créditos: solo lo que el cliente compra hoy.

const WA = 'https://wa.me/5491138859820?text=' + encodeURIComponent('Hola OLIVIA, quiero coordinar la visita sin cargo para el diagnóstico de residuos orgánicos.')
const MAIL = 'mailto:hola@oliviacirculab.com.ar?subject=' + encodeURIComponent('Diagnóstico de residuos orgánicos · visita sin cargo')

const PASOS = [
  { cuando: 'Días 1–3', t: 'Relevamiento', d: 'Recorremos cocina, comedor y acopio. Vemos cómo separan hoy y cómo se retira el residuo.' },
  { cuando: 'Días 4–21', t: 'Pesaje', d: 'Balanza en su punto de acopio. Cada bolsa se registra con QR: peso, foto y hora. Controles en sitio dos veces por semana.' },
  { cuando: 'En paralelo', t: 'Capacitación', d: 'Entrenamos a los equipos de cocina y limpieza en la separación, con material 100% digital.' },
  { cuando: 'Días 22–30', t: 'Informe', d: 'Le entregamos el informe y lo revisamos juntos en una reunión con su equipo.' },
]

const RECIBE = [
  'Kilos de orgánico por día, semana y mes, por sector',
  'Qué parte es orgánico vegetal recuperable y qué tan bien está separada',
  'Metano y CO₂e que evitaría al desviarlo del relleno (estimación con factores IPCC, no es una certificación)',
  'Plan de separación con responsables y metas',
  'Datos ordenados para su reporte de sustentabilidad (GRI 306 · Residuos)',
  'Opciones de destino para el orgánico, para que usted elija',
]

const PLANES = [
  { n: 'Esencial', d: 'Restaurante, escuela, oficina o comedor. Un punto de generación.', p: '$ 450.000', destacado: false },
  { n: 'Hotel o institución', d: 'Hotel, universidad o edificio corporativo. Hasta tres puntos.', p: '$ 850.000', destacado: true },
  { n: 'Gran operación', d: 'Hotel grande, shopping o complejo. Más de tres puntos.', p: 'desde $ 1.400.000', destacado: false },
]

export default function Diagnostico() {
  const bg = '#06110b', card = '#0b1d13', text = '#eef5f0', sub = '#a9bcb0', accent = '#22c55e', border = 'rgba(134,239,172,.15)'
  const ancho = { maxWidth: 960, margin: '0 auto', padding: '0 20px' }
  const h2 = { fontSize: 24, fontWeight: 900, margin: '0 0 16px' }
  const boton = { display: 'inline-block', textAlign: 'center' as const, fontWeight: 800, fontSize: 16, padding: '15px 22px', borderRadius: 14, textDecoration: 'none' }

  return (
    <main style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SitioNav text={text} accent={accent} border={border} />

      <section style={{ ...ancho, paddingTop: 48, paddingBottom: 36 }}>
        <div style={{ fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.22em', color: accent, marginBottom: 14 }}>Para grandes generadores · CABA</div>
        <h1 style={{ fontSize: 'clamp(34px,6vw,56px)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 16px', maxWidth: 760 }}>Diagnóstico de residuos orgánicos en 30 días</h1>
        <p style={{ fontSize: 18, color: sub, lineHeight: 1.6, margin: '0 0 26px', maxWidth: 680 }}>Sepa cuánto orgánico genera su establecimiento, cuánto puede desviar del relleno sanitario y cuánto metano evitaría. Con datos pesados en su edificio, no estimados. Precio fijo y un informe listo para usar.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ ...boton, background: accent, color: '#04110a' }}>Coordinar visita sin cargo</a>
          <a href="#precios" style={{ ...boton, border: '1px solid ' + border, color: text }}>Ver precios</a>
        </div>
      </section>

      <section style={{ ...ancho, paddingBottom: 36 }}>
        <h2 style={h2}>Cómo funciona</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {PASOS.map(p => (
            <div key={p.t} style={{ background: card, border: '1px solid ' + border, borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.12em', color: accent, marginBottom: 6 }}>{p.cuando}</div>
              <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{p.t}</div>
              <div style={{ fontSize: 14, color: sub, lineHeight: 1.55 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...ancho, paddingBottom: 36 }}>
        <h2 style={h2}>Qué recibe</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px 28px' }}>
          {RECIBE.map(r => (
            <li key={r} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.5 }}>
              <span aria-hidden="true" style={{ color: accent, fontWeight: 900 }}>✓</span><span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="precios" style={{ ...ancho, paddingBottom: 36 }}>
        <h2 style={h2}>Precio fijo</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {PLANES.map(p => (
            <div key={p.n} style={{ background: card, border: (p.destacado ? '2px solid ' + accent : '1px solid ' + border), borderRadius: 14, padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{p.n}</div>
              <div style={{ fontSize: 14, color: sub, lineHeight: 1.5, marginBottom: 14 }}>{p.d}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: accent }}>{p.p}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: sub, lineHeight: 1.65, margin: '16px 0 0' }}>
          Precio final en pesos, en dos pagos: 50% al inicio y 50% con el informe. <strong style={{ color: text }}>Si contrata el servicio mensual de medición y reporte dentro de los 60 días, le descontamos el 50% del diagnóstico.</strong> No incluye retiro, transporte ni tratamiento del residuo: eso lo cotiza aparte la planta que usted elija. Valores vigentes hasta el 31/12/2026.
        </p>
      </section>

      <section style={{ ...ancho, paddingBottom: 48 }}>
        <div style={{ background: accent, color: '#04110a', borderRadius: 18, padding: 26, display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ maxWidth: 520 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px' }}>Empecemos con una visita sin cargo de 30 minutos</h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0 }}>Vemos su operación y le confirmamos el plan y el precio en 48 horas.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{ ...boton, background: '#04110a', color: text }}>WhatsApp +54 9 11 3885-9820</a>
            <a href={MAIL} style={{ color: '#04110a', fontWeight: 800, textAlign: 'center', fontSize: 14 }}>hola@oliviacirculab.com.ar</a>
          </div>
        </div>
      </section>

      <SitioFooter text={text} sub={sub} border={border} />
    </main>
  )
}
