'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { PERFILES, EVENTOS } from '../../lib/cw'

// Página de contacto de la Climate Week (a la que lleva el QR del celular).
// Cada persona elige cómo se quiere sumar y deja sus datos; el equipo los ve en el admin (pestaña Contactos).
// ?e=<evento> preselecciona el evento · ?carga=jp marca que el contacto lo cargó el equipo después de una charla.

const WA = '5491138859820'

function CW() {
  const q = useSearchParams()
  const [perfil, setPerfil] = useState('')
  const [nombre, setNombre] = useState('')
  const [org, setOrg] = useState('')
  const [cargo, setCargo] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [evento, setEvento] = useState('')
  const [interes, setInteres] = useState('')
  const [acepta, setAcepta] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [listo, setListo] = useState(false)
  const equipo = q.get('carga') === 'jp'

  useEffect(() => {
    const e = q.get('e')
    if (e && EVENTOS.some(x => x.id === e)) setEvento(e)
    const p = q.get('p')
    if (p && PERFILES.some(x => x.id === p)) setPerfil(p)
  }, [q])

  const p = PERFILES.find(x => x.id === perfil)

  async function enviar() {
    if (!nombre.trim()) { setError('Tu nombre, por favor.'); return }
    if (!email.trim() && !whatsapp.trim()) { setError('Dejanos un correo o un WhatsApp para poder escribirte.'); return }
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) { setError('Revisá el correo.'); return }
    if (!equipo && !acepta) { setError('Necesitamos tu autorización para escribirte.'); return }
    setEnviando(true); setError('')
    const { error: e } = await supabase.from('contactos').insert({
      nombre: nombre.trim().slice(0, 120), organizacion: org.trim().slice(0, 160), cargo: cargo.trim().slice(0, 120),
      email: email.trim().slice(0, 160) || null, whatsapp: whatsapp.trim().slice(0, 40) || null,
      perfil: perfil || 'otro', tipo: p?.l || 'Otro', evento: evento || null, interes: interes.trim().slice(0, 1500) || null,
      mensaje: interes.trim().slice(0, 1500) || null, origen: 'climate_week', cargado_por: equipo ? 'equipo' : 'persona',
    })
    setEnviando(false)
    if (e) setError('No pudimos guardarlo. Escribinos por WhatsApp y lo anotamos.')
    else setListo(true)
  }

  function otro() {
    setListo(false); setNombre(''); setOrg(''); setCargo(''); setEmail(''); setWhatsapp(''); setInteres(''); setAcepta(false)
    if (!equipo) setPerfil('')
  }

  const input: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#f1f5f9', fontSize: 15, marginBottom: 10, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }
  const card: React.CSSProperties = { background: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 18, marginBottom: 14 }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a', color: '#f1f5f9', fontFamily: 'Inter,system-ui', padding: '20px 16px 40px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'contain' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>OLIVIA Circulab</div>
            <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>{equipo ? 'Carga rápida del equipo' : 'Climate Week Argentina 2026'}</div>
          </div>
        </div>

        {listo ? (
          <div style={{ ...card, textAlign: 'center', padding: 26 }}>
            <div style={{ fontSize: 44 }}>🤝</div>
            <div style={{ fontSize: 20, fontWeight: 900, margin: '6px 0' }}>{equipo ? 'Contacto guardado' : `¡Gracias, ${nombre.split(' ')[0]}!`}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: 16 }}>
              {equipo ? 'Ya está en el admin, pestaña Contactos.' : 'Te escribimos en los próximos días. Mientras tanto:'}
            </div>
            {!equipo && p && (
              <a href={p.link} style={{ display: 'block', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', padding: 13, borderRadius: 12, fontWeight: 800, textDecoration: 'none', marginBottom: 10 }}>{p.linkL} →</a>
            )}
            {!equipo && (
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Hola Juan Pablo, soy ${nombre.trim()}${org ? ` (${org.trim()})` : ''}. Nos conocimos en la Climate Week.`)}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', border: '1px solid rgba(34,197,94,0.4)', color: '#22c55e', padding: 12, borderRadius: 12, fontWeight: 700, textDecoration: 'none', marginBottom: 10 }}>💬 Escribirle a Juan Pablo por WhatsApp</a>
            )}
            <button onClick={otro} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 13, cursor: 'pointer', marginTop: 4 }}>{equipo ? '+ Cargar otro contacto' : 'Volver'}</button>
          </div>
        ) : (
          <>
            {!equipo && (
              <div style={card}>
                <div style={{ fontSize: 21, fontWeight: 900, lineHeight: 1.25, marginBottom: 8 }}>Medimos el orgánico que Buenos Aires entierra, kilo por kilo.</div>
                <div style={{ fontSize: 13.5, color: '#94a3b8', lineHeight: 1.65 }}>
                  Pesamos en origen, con foto. Lo llevamos a una planta de compostaje aliada. Cada kilo queda registrado con su constancia de entrega y su certificado de compost, a nombre de quien lo generó.
                </div>
                <a href="/videos/el-sistema" style={{ display: 'inline-block', marginTop: 12, color: '#22c55e', fontWeight: 800, fontSize: 13, textDecoration: 'none' }}>▶ Ver cómo funciona (1:35)</a>
              </div>
            )}

            <div style={{ fontSize: 14, fontWeight: 800, margin: '4px 2px 10px' }}>{equipo ? '¿Qué perfil tiene?' : '¿Cómo te querés sumar?'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {PERFILES.map(x => (
                <button key={x.id} onClick={() => setPerfil(x.id)} style={{ textAlign: 'left', padding: 12, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', border: perfil === x.id ? '2px solid #22c55e' : '1px solid rgba(255,255,255,0.08)', background: perfil === x.id ? 'rgba(34,197,94,0.08)' : '#111827', color: '#f1f5f9' }}>
                  <div style={{ fontSize: 20 }}>{x.icon}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, marginTop: 4, lineHeight: 1.3 }}>{x.l}</div>
                  <div style={{ fontSize: 10.5, color: '#64748b', marginTop: 3, lineHeight: 1.35 }}>{x.d}</div>
                </button>
              ))}
            </div>

            {perfil && (
              <div style={card}>
                <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre y apellido *" style={input} autoComplete="name" />
                <input value={org} onChange={e => setOrg(e.target.value)} placeholder="Organización" style={input} autoComplete="organization" />
                <input value={cargo} onChange={e => setCargo(e.target.value)} placeholder="Cargo o rol" style={input} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" type="email" style={input} autoComplete="email" />
                <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp" type="tel" style={input} autoComplete="tel" />
                <select value={evento} onChange={e => setEvento(e.target.value)} style={{ ...input, appearance: 'none' }}>
                  <option value="">¿Dónde nos conocimos?</option>
                  {EVENTOS.map(x => <option key={x.id} value={x.id}>{x.l}</option>)}
                </select>
                <textarea value={interes} onChange={e => setInteres(e.target.value)} rows={3}
                  placeholder={equipo ? 'Qué hablamos y próximo paso acordado' : '¿Qué te interesó o qué te gustaría charlar?'} style={{ ...input, resize: 'vertical' }} />
                {!equipo && (
                  <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: '#94a3b8', lineHeight: 1.5, marginBottom: 12, cursor: 'pointer' }}>
                    <input type="checkbox" checked={acepta} onChange={e => setAcepta(e.target.checked)} style={{ marginTop: 3, accentColor: '#22c55e' }} />
                    <span>Autorizo a OLIVIA Circulab a escribirme por este tema. Ver la <a href="/privacidad" style={{ color: '#22c55e' }}>política de privacidad</a>.</span>
                  </label>
                )}
                {error && <div style={{ fontSize: 12.5, color: '#ef4444', marginBottom: 10 }}>{error}</div>}
                <button onClick={enviar} disabled={enviando} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                  {enviando ? 'Guardando…' : equipo ? 'Guardar contacto' : 'Enviar'}
                </button>
              </div>
            )}

            {!equipo && (
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hola Juan Pablo, te escribo desde la Climate Week.')}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', color: '#22c55e', fontSize: 13, fontWeight: 700, textDecoration: 'none', marginTop: 6 }}>
                ¿Preferís WhatsApp? +54 9 11 3885-9820
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function Pagina() {
  return <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a0e1a' }} />}><CW /></Suspense>
}
