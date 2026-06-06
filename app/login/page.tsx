'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [estado, setEstado] = useState<'idle'|'cargando'|'error'|'reset'>('idle')
  const [mensaje, setMensaje] = useState('')
  const [modoReset, setModoReset] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    if (!email || !password) return
    setEstado('cargando')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setEstado('error')
      setMensaje('Email o contraseña incorrectos')
    } else {
      router.push('/dashboard')
    }
  }

  async function handleReset() {
    if (!email) return
    setEstado('cargando')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://circulab-site.vercel.app/nueva-contrasena',
    })
    if (error) {
      setEstado('error')
      setMensaje('Error al enviar el email. Verificá la dirección.')
    } else {
      setEstado('reset')
    }
  }

  if (estado==='reset') return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:24,fontFamily:'system-ui'}}>
      <div style={{fontSize:48}}>📧</div>
      <div style={{fontSize:20,fontWeight:800,color:'#f1f5f9'}}>Email enviado</div>
      <div style={{fontSize:13,color:'#64748b',textAlign:'center'}}>Revisá tu bandeja de entrada.<br/>Tenés 1 hora para cambiar tu contraseña.</div>
      <button onClick={()=>{setEstado('idle');setModoReset(false)}}
        style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',padding:'10px 24px',borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer'}}>
        Volver al login
      </button>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:'system-ui'}}>
      <div style={{width:'100%',maxWidth:400}}>

        <div style={{textAlign:'center',marginBottom:32}}>
          <a href="/" style={{textDecoration:'none'}}>
            <div style={{width:48,height:48,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:20,color:'white',margin:'0 auto 16px',cursor:'pointer'}}>C</div>
          </a>
          <h1 style={{fontSize:22,fontWeight:900,color:'#f1f5f9',margin:0}}>Circulab Tech</h1>
          <p style={{fontSize:13,color:'#64748b',marginTop:8}}>{modoReset?'Recuperar contraseña':'Ingresá a tu panel'}</p>
        </div>

        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'28px'}}>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com"
              style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>

          {!modoReset && (
            <div style={{marginBottom:8}}>
              <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Contraseña</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"
                onKeyDown={e=>e.key==='Enter'&&handleLogin()}
                style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
            </div>
          )}

          {!modoReset && (
            <div style={{textAlign:'right',marginBottom:20}}>
              <button onClick={()=>setModoReset(true)} style={{fontSize:11,color:'#64748b',background:'transparent',border:'none',cursor:'pointer',textDecoration:'underline'}}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {estado==='error' && (
            <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'10px 14px',fontSize:12,color:'#ef4444',marginBottom:16}}>
              {mensaje}
            </div>
          )}

          <button onClick={modoReset?handleReset:handleLogin}
            disabled={estado==='cargando'||!email||(!modoReset&&!password)}
            style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:!email?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!email?'#64748b':'white',fontSize:15,fontWeight:700,cursor:!email?'not-allowed':'pointer',boxShadow:email?'0 0 30px rgba(34,197,94,0.25)':'none'}}>
            {estado==='cargando'?'Procesando...':(modoReset?'Enviar email de recuperación →':'Ingresar →')}
          </button>

          {modoReset && (
            <button onClick={()=>setModoReset(false)} style={{width:'100%',marginTop:12,padding:'10px',borderRadius:10,border:'none',background:'transparent',color:'#64748b',fontSize:13,cursor:'pointer'}}>
              ← Volver al login
            </button>
          )}

          {!modoReset && (
            <div style={{textAlign:'center',marginTop:20}}>
              <span style={{fontSize:13,color:'#64748b'}}>¿No tenés cuenta? </span>
              <a href="/registro" style={{fontSize:13,color:'#22c55e',textDecoration:'none',fontWeight:600}}>Registrate →</a>
            </div>
          )}
        </div>

        <a href="/" style={{display:'block',textAlign:'center',marginTop:20,fontSize:12,color:'#64748b',textDecoration:'none'}}>← Volver a Circulab.tech</a>
      </div>
    </div>
  )
}
