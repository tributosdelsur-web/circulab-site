'use client'
import SitioNav from '../../components/SitioNav'
import SitioFooter from '../../components/SitioFooter'
import VideoBloque, { videoPorId } from '../../lib/VideoBloque'

const WA_ADMIN = 'https://wa.me/5491138859820?text=' + encodeURIComponent('Hola OLIVIA, administro un edificio y me interesa el diagnóstico sin costo.')

const PASOS = [
  { n: '1', t: 'Charlamos 15 minutos', d: 'Con el administrador o el encargado. Vemos cómo se separa hoy en el edificio y dónde se juntan los residuos.' },
  { n: '2', t: 'Dos semanas de medición', d: 'Pesamos el orgánico que separa el edificio (yerba, cáscaras, restos de cocina) y registramos cada pesada en la app, con fecha y foto.' },
  { n: '3', t: 'Va a compostaje, no al relleno', d: 'Coordinamos el destino del orgánico con una planta de compostaje y queda la constancia de recepción.' },
  { n: '4', t: 'Informe para la asamblea', d: 'Al cierre, el consorcio recibe un informe con los kilos medidos, el destino y las constancias. Listo para presentar.' },
]

const PARA = [
  { t: 'Para el administrador', d: 'Una gestión ambiental concreta para mostrar, sin trabajo extra: el registro lo hacemos nosotros.' },
  { t: 'Para el encargado', d: 'Nada de planillas. Si quiere, carga él mismo el peso desde el celular en menos de un minuto.' },
  { t: 'Para los vecinos', d: 'Un dato propio del edificio: cuánto orgánico se separó y a dónde fue. Sin promesas, con kilos.' },
]

export default function Consorcios() {
  const bg = '#06110b', card = '#0b1d13', text = '#eef5f0', sub = '#a9bcb0', accent = '#22c55e', gold = '#facc15', border = 'rgba(134,239,172,.15)'
  const boton = { display: 'block', textAlign: 'center' as const, fontWeight: 800, fontSize: 16, padding: '16px 20px', borderRadius: 14, textDecoration: 'none' }

  return (
    <main style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SitioNav text={text} accent={accent} border={border} />

      <section style={{ padding: '44px 20px 28px', maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.22em', color: gold, marginBottom: 14 }}>Para administradores de consorcios</div>
        <h1 style={{ fontSize: 'clamp(32px,8vw,52px)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 16px' }}>El orgánico de tu edificio, <span style={{ color: accent }}>medido y con destino.</span></h1>
        <p style={{ fontSize: 17, color: sub, lineHeight: 1.6, margin: '0 0 26px' }}>Buscamos los primeros edificios para un <strong style={{ color: text }}>diagnóstico sin costo de dos semanas</strong>. Medimos lo que separan, lo llevamos a compostaje y les dejamos el informe para la asamblea.</p>
        <a href={WA_ADMIN} target="_blank" rel="noopener noreferrer" style={{ ...boton, background: accent, color: '#04110a' }}>Quiero el diagnóstico para mi edificio →</a>
        <a href="mailto:hola@oliviacirculab.com.ar?subject=Diagn%C3%B3stico%20para%20mi%20edificio" style={{ display: 'block', color: accent, fontSize: 14, fontWeight: 700, textDecoration: 'none', padding: 14 }}>O escribinos a hola@oliviacirculab.com.ar</a>
      </section>

      <section style={{ padding: '0 20px 32px', maxWidth: 820, margin: '0 auto' }}>
        <VideoBloque video={videoPorId('grandes-generadores')} sub={sub} accent={accent} />
      </section>

      <section style={{ padding: '0 20px 32px', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 14px', textAlign: 'center' }}>Cómo es el diagnóstico</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {PASOS.map(p => (
            <div key={p.n} style={{ display: 'flex', gap: 14, background: card, border: '1px solid ' + border, borderRadius: 14, padding: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: accent, color: '#04110a', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.n}</div>
              <div>
                <div style={{ fontWeight: 800, marginBottom: 3 }}>{p.t}</div>
                <div style={{ fontSize: 14, color: sub, lineHeight: 1.5 }}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 20px 32px', maxWidth: 640, margin: '0 auto', display: 'grid', gap: 10 }}>
        {PARA.map(p => (
          <div key={p.t} style={{ background: card, border: '1px solid ' + border, borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 800, color: accent, marginBottom: 4 }}>{p.t}</div>
            <div style={{ fontSize: 14, color: sub, lineHeight: 1.5 }}>{p.d}</div>
          </div>
        ))}
      </section>

      <section style={{ padding: '0 20px 32px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ background: card, border: '1px solid ' + border, borderRadius: 16, padding: 22 }}>
          <div style={{ fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.2em', color: gold, marginBottom: 10 }}>El cuarto de residuos</div>
          <h3 style={{ fontSize: 21, fontWeight: 900, fontFamily: 'Georgia,serif', fontStyle: 'italic', lineHeight: 1.25, margin: '0 0 12px' }}>El olor de la escalera no es el metano. Es su aviso.</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: sub, margin: '0 0 10px' }}>El metano no tiene olor. Lo que se huele son compuestos que aparecen cuando la materia orgánica se descompone sin aire, las mismas condiciones en las que se produce metano.</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: sub, margin: 0 }}>Separar la fracción orgánica y sacarla seguido corta las dos cosas a la vez. Es una mejora que los vecinos notan rápido.</p>
        </div>
      </section>

      <section style={{ padding: '0 20px 32px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ background: accent, color: '#04110a', borderRadius: 16, padding: 22 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px' }}>¿Administrás un edificio?</h2>
          <p style={{ fontSize: 15, lineHeight: 1.55, margin: '0 0 16px' }}>Estamos empezando con pocos edificios para hacerlo bien. Si te interesa ser uno de los primeros, escribinos.</p>
          <a href={WA_ADMIN} target="_blank" rel="noopener noreferrer" style={{ ...boton, background: '#04110a', color: '#eef5f0', fontSize: 15 }}>Hablemos por WhatsApp</a>
        </div>
      </section>

      <section style={{ padding: '0 20px 44px', maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: sub, lineHeight: 1.6, margin: 0 }}>Lo que hacemos hoy: pesamos con balanza, cargamos el dato en la app y el equipo lo revisa. El diagnóstico no tiene costo para el consorcio. El informe es un registro de gestión: no es una certificación ni tiene valor monetario.</p>
      </section>

      <SitioFooter text={text} sub={sub} border={border} />
    </main>
  )
}
