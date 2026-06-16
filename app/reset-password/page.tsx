'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [estado, setEstado] = useState<'form'|'ok'|'error'>('form')
  const [mensaje, setMensaje] = useState('')

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden')
      return
    }
    if (password.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres')
      return
    }
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setEstado('error')
      setMensaje(error.message)
    } else {
      setEstado('ok')
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
      <div style={{maxWidth:400,width:'100%',background:'#111827',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:32}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:48,height:48,objectFit:'contain',borderRadius:8,marginBottom:12}} /></a>
          <div style={{fontSize:18,fontWeight:900,color:'#f1f5f9',marginBottom:4}}>Nueva contraseña</div>
          <div style={{fontSize:12,color:'#64748b'}}>Ingresá tu nueva contraseña para OLIVIA</div>
        </div>

        {estado==='ok'?(
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:40,marginBottom:12}}>✅</div>
            <div style={{fontSize:16,fontWeight:700,color:'#22c55e',marginBottom:8}}>Contraseña actualizada</div>
            <a href="/dashboard" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:20,padding:'10px 24px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
              Ir a mi panel →
            </a>
          </div>
        ):(
          <div>
            <input
              type="password"
              placeholder="Nueva contraseña (mín. 8 caracteres)"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              style={{width:'100%',padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:10}}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={e=>setConfirmPassword(e.target.value)}
              style={{width:'100%',padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:16}}
            />
            {mensaje&&<div style={{fontSize:11,color:'#ef4444',marginBottom:12,textAlign:'center'}}>{mensaje}</div>}
            <button onClick={handleReset} style={{width:'100%',background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'12px',color:'white',fontSize:13,fontWeight:700,cursor:'pointer'}}>
              Actualizar contraseña
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
