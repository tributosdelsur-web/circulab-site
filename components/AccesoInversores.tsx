'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// Pide nombre y correo antes de mostrar material con datos de la ronda (no se muestran montos en páginas abiertas).
const CLAVE = 'olivia_acceso_inversores'

export default function AccesoInversores({ children, titulo = 'Material para inversores' }: { children: React.ReactNode; titulo?: string }) {
  const [ok, setOk] = useState<boolean | null>(null)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try { setOk(localStorage.getItem(CLAVE) === '1') } catch { setOk(false) }
  }, [])

  async function entrar() {
    if (!nombre.trim() || !/\S+@\S+\.\S+/.test(email)) { setError('Nombre y un correo válido, por favor.'); return }
    setGuardando(true); setError('')
    await supabase.from('leads_inversores').insert({ nombre: nombre.trim(), email: email.trim(), empresa: empresa.trim(), status: 'nuevo' })
    try { localStorage.setItem(CLAVE, '1') } catch {}
    setGuardando(false); setOk(true)
  }

  if (ok === null) return <div style={{ minHeight: '100vh', background: '#0a0e1a' }} />
  if (ok) return <>{children}</>

  const input: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#f1f5f9', fontSize: 14, marginBottom: 10, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }
  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Inter,system-ui' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 56, height: 56, borderRadius: 14, display: 'block', margin: '0 auto 12px', objectFit: 'contain' }} />
          <div style={{ fontSize: 20, fontWeight: 900, color: '#f1f5f9' }}>{titulo}</div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 6, lineHeight: 1.6 }}>Dejanos tus datos para ver el material completo. Te escribimos solo por OLIVIA.</div>
        </div>
        <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 22 }}>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre y apellido" style={input} />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" type="email" style={input} />
          <input value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Fondo u organización (opcional)" style={input}
            onKeyDown={e => e.key === 'Enter' && entrar()} />
          {error && <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 10 }}>{error}</div>}
          <button onClick={entrar} disabled={guardando} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
            {guardando ? 'Un momento…' : 'Ver el material →'}
          </button>
        </div>
        <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: 14, fontSize: 12, color: '#64748b', textDecoration: 'none' }}>← Volver al sitio</a>
      </div>
    </div>
  )
}
