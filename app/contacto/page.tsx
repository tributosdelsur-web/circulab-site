'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useTema, Rubro, Titulo, FUENTE } from '../../lib/ui'

const MAIL = 'hola@oliviacirculab.com.ar'

export default function Contacto() {
  const t = useTema()
  const { es, dark, bg, text, card, border, sub, accent } = t

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [tipo, setTipo] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [listo, setListo] = useState(false)
  const [error, setError] = useState('')
  const [copiado, setCopiado] = useState(false)

  const tipos = es
    ? ['Opero o trato material', 'Soy generador obligado', 'Administro un consorcio', 'Inversión', 'Prensa o institucional', 'Otro']
    : ['I move or treat material', 'Obligated generator', 'Building manager', 'Investment', 'Press or institutional', 'Other']

  async function enviar() {
    if (!email) { setError(es ? 'Hace falta un correo para poder responderte.' : 'An email is required.'); return }
    setEnviando(true); setError('')
    const { error: e } = await supabase.from('contactos').insert({
      nombre, email, organizacion: org, tipo, mensaje,
      origen: typeof document !== 'undefined' ? document.referrer : null,
    })
    setEnviando(false)
    if (e) setError(es ? 'No pudimos guardarlo. Escribinos directo a ' + MAIL : 'Could not save. Write to ' + MAIL)
    else setListo(true)
  }

  async function copiar() {
    try { await navigator.clipboard.writeText(MAIL); setCopiado(true); setTimeout(() => setCopiado(false), 2000) } catch {}
  }

  const input: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${border}`,
    background: dark ? 'rgba(255,255,255,0.03)' : '#fff', color: text, fontSize: 14,
    fontFamily: FUENTE, marginBottom: 12, boxSizing: 'border-box',
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: FUENTE, transition: 'all 0.3s' }}>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: dark ? 'rgba(10,14,26,0.9)' : 'rgba(240,244,248,0.9)', borderBottom: `1px solid ${border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', minWidth: 0 }}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Circulab Tech</div>
            <div style={{ fontSize: 9, color: sub, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'monospace' }}>{es ? 'Contacto' : 'Contact'}</div>
          </div>
        </a>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <button onClick={() => t.setLang(es ? 'en' : 'es')} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: text, fontFamily: 'monospace' }}>{es ? 'EN' : 'ES'}</button>
          <button onClick={() => t.setDark(!dark)} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 9px', fontSize: 12, cursor: 'pointer', background: 'transparent', color: text }}>{dark ? '☀️' : '🌙'}</button>
        </div>
      </nav>

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '48px 24px 80px' }}>

        <Rubro t={t}>{es ? 'Contacto' : 'Contact'}</Rubro>
        <h1 style={{ fontSize: 'clamp(26px,5vw,38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
          {es ? 'Escribinos.' : 'Write to us.'}
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: sub, margin: '0 0 24px' }}>
          {es
            ? 'Contestamos todo, aunque sea para decir que no corresponde. Si preferís el correo directo, es este:'
            : 'We answer everything, even to say it does not apply. If you prefer direct email:'}
        </p>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '16px 18px', marginBottom: 28 }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 15, fontWeight: 700, flex: 1, minWidth: 220, wordBreak: 'break-all' }}>{MAIL}</span>
          <button onClick={copiar} style={{ border: `1px solid ${border}`, background: 'transparent', color: copiado ? accent : text, borderRadius: 20, padding: '7px 16px', fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {copiado ? (es ? 'Copiado' : 'Copied') : (es ? 'Copiar' : 'Copy')}
          </button>
        </div>

        {listo ? (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 16, padding: '26px 22px' }}>
            <Titulo size={22}>{es ? 'Recibido.' : 'Received.'}</Titulo>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: sub, marginTop: 10, marginBottom: 0 }}>
              {es ? 'Te vamos a escribir a ' : 'We will write to '}<strong style={{ color: text }}>{email}</strong>{es ? '. Si es urgente, mandá un correo directo a la dirección de arriba.' : '.'}
            </p>
          </div>
        ) : (
          <>
            <Titulo size={21}>{es ? 'O dejanos tus datos' : 'Or leave your details'}</Titulo>
            <p style={{ fontSize: 13, color: sub, lineHeight: 1.6, margin: '8px 0 18px' }}>
              {es ? 'Solo el correo es obligatorio. El resto nos ayuda a contestarte mejor.' : 'Only the email is required.'}
            </p>
            <input style={input} placeholder={es ? 'Nombre' : 'Name'} value={nombre} onChange={e => setNombre(e.target.value)} />
            <input style={input} type="email" placeholder={es ? 'Correo (obligatorio)' : 'Email (required)'} value={email} onChange={e => setEmail(e.target.value)} />
            <input style={input} placeholder={es ? 'Organización' : 'Organisation'} value={org} onChange={e => setOrg(e.target.value)} />
            <select style={input} value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="">{es ? 'Motivo del contacto' : 'Reason'}</option>
              {tipos.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
            <textarea style={{ ...input, minHeight: 110, resize: 'vertical' }} placeholder={es ? 'Contanos en una o dos líneas' : 'Tell us in a line or two'} value={mensaje} onChange={e => setMensaje(e.target.value)} />
            {error && <div style={{ fontSize: 13, color: '#ef4444', marginBottom: 12, lineHeight: 1.5 }}>{error}</div>}
            <button onClick={enviar} disabled={enviando} style={{ background: accent, color: dark ? '#050505' : 'white', border: 'none', padding: '14px 28px', borderRadius: 40, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: enviando ? 'default' : 'pointer', opacity: enviando ? 0.6 : 1 }}>
              {enviando ? (es ? 'Enviando…' : 'Sending…') : (es ? 'Enviar' : 'Send')}
            </button>
          </>
        )}

      </div>
    </div>
  )
}
