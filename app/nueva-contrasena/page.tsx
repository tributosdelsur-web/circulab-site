'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function NuevaContrasena() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [estado, setEstado] = useState<'idle'|'cargando'|'ok'|'error'>('idle')
  const [mensaje, setMensaje] = useState('')
  const router = useRouter()
  const [sesion, setSesion] = useState<'buscando'|'si'|'no'>('buscando')

  // El link del mail trae el token (en #access_token o en ?code=). Esperamos a que se convierta en sesión.
  useEffect(() => {
    let listo = false
    const marcar = (ok: boolean) => { if (!listo) { listo = ok; setSesion(ok ? 'si' : 'no') } }
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (s) marcar(true) })
    ;(async () => {
      const code = new URLSearchParams(window.location.search).get('code')
      if (code) await supabase.auth.exchangeCodeForSession(code).catch(() => null)
      const { data } = await supabase.auth.getSession()
      if (data.session) marcar(true)
      else setTimeout(async () => { const { data: d } = await supabase.auth.getSession(); if (!listo) setSesion(d.session ? 'si' : 'no') }, 2500)
    })()
    return () => sub.subscription.unsubscribe()
  }, [])

  async function handleUpdate() {
    if (password !== confirm) { setEstado('error'); setMensaje('Las contraseñas no coinciden'); return }
    if (password.length < 6) { setEstado('error'); setMensaje('Mínimo 6 caracteres'); return }
    setEstado('cargando')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setEstado('error'); setMensaje('Error al actualizar. Intentá de nuevo.') }
    else { setEstado('ok'); setTimeout(() => router.push('/dashboard'), 2000) }
  }

  if (sesion==='no' && estado!=='ok') return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,padding:24,fontFamily:'system-ui',textAlign:'center'}}>
      <div style={{fontSize:44}}>⏳</div>
      <div style={{fontSize:20,fontWeight:800,color:'#f1f5f9'}}>El link venció o ya se usó</div>
      <div style={{fontSize:13,color:'#94a3b8',maxWidth:340,lineHeight:1.6}}>Pedí uno nuevo desde el login con “¿Olvidaste tu contraseña?” y abrilo en este mismo navegador.</div>
      <a href="/login" style={{marginTop:8,background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'12px 24px',borderRadius:12,fontWeight:700,textDecoration:'none',fontSize:14}}>Ir al login →</a>
    </div>
  )

  if (estado==='ok') return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:24,fontFamily:'system-ui'}}>
      <div style={{fontSize:48}}>✅</div>
      <div style={{fontSize:20,fontWeight:800,color:'#f1f5f9'}}>Contraseña actualizada</div>
      <div style={{fontSize:13,color:'#64748b'}}>Redirigiendo a tu panel...</div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'system-ui'}}>
      <div style={{width:'100%',maxWidth:400}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:48,height:48,borderRadius:14,margin:'0 auto 16px',objectFit:'contain',flexShrink:0,display:'block'}} /></a>
          <h1 style={{fontSize:22,fontWeight:900,color:'#f1f5f9',margin:0}}>Nueva contraseña</h1>
          <p style={{fontSize:13,color:'#64748b',marginTop:8}}>Elegí una contraseña segura</p>
        </div>
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:28}}>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Nueva contraseña</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mínimo 6 caracteres"
              style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Confirmar contraseña</label>
            <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repetí la contraseña"
              onKeyDown={e=>e.key==='Enter'&&handleUpdate()}
              style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>
          {estado==='error' && (
            <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'10px 14px',fontSize:12,color:'#ef4444',marginBottom:16}}>{mensaje}</div>
          )}
          <button onClick={handleUpdate} disabled={estado==='cargando'||!password||!confirm}
            style={{width:'100%',padding:14,borderRadius:12,border:'none',background:!password||!confirm?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!password||!confirm?'#64748b':'white',fontSize:15,fontWeight:700,cursor:!password||!confirm?'not-allowed':'pointer'}}>
            {estado==='cargando'?'Actualizando...':'Guardar nueva contraseña →'}
          </button>
        </div>
        <a href="/login" style={{display:'block',textAlign:'center',marginTop:16,fontSize:12,color:'#64748b',textDecoration:'none'}}>← Volver al login</a>
      </div>
    </div>
  )
}
