'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Registro() {
 const [nombre, setNombre] = useState('')
 const [apellido, setApellido] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [consorcio, setConsorcio] = useState('')
 const [barrio, setBarrio] = useState('')
 const [estado, setEstado] = useState<'idle'|'cargando'|'ok'|'error'>('idle')
 const [mensaje, setMensaje] = useState('')
 const router = useRouter()

 async function handleRegistro() {
   if (!nombre || !email || !password) return
   setEstado('cargando')

   const { data, error } = await supabase.auth.signUp({ email, password })

   if (error) {
     setEstado('error')
     setMensaje(error.message)
     return
   }

   if (data.user) {
     await supabase.from('usuarios').insert({
       id: data.user.id,
       nombre,
       apellido,
       email,
       consorcio: consorcio || 'Consorcio Piloto CABA',
       barrio: barrio || 'CABA, Argentina',
       nivel: 'Semilla',
       score_pulso: 0,
     })
   }

   setEstado('ok')
   setTimeout(() => router.push('/dashboard'), 2000)
 }

 if (estado==='ok') return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:24,fontFamily:'system-ui'}}>
     <div style={{fontSize:48}}>🌿</div>
     <div style={{fontSize:22,fontWeight:800,color:'#f1f5f9'}}>¡Bienvenido a Circulab!</div>
     <div style={{fontSize:14,color:'#64748b',textAlign:'center'}}>Tu cuenta fue creada.<br/>Redirigiendo a tu panel...</div>
   </div>
 )

 return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:'system-ui'}}>
     <div style={{width:'100%',maxWidth:440}}>

       <div style={{textAlign:'center',marginBottom:32}}>
         <div style={{width:48,height:48,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:20,color:'white',margin:'0 auto 16px'}}>C</div>
         <h1 style={{fontSize:22,fontWeight:900,color:'#f1f5f9',margin:0}}>Crear tu cuenta</h1>
         <p style={{fontSize:13,color:'#64748b',marginTop:8}}>Empezá a acumular tokens OLV hoy</p>
       </div>

       <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'28px'}}>

         <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
           <div>
             <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Nombre *</label>
             <input value={nombre} onChange={e=>setNombre(e.target.value)}
               placeholder="Juan"
               style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
           </div>
           <div>
             <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Apellido</label>
             <input value={apellido} onChange={e=>setApellido(e.target.value)}
               placeholder="García"
               style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
           </div>
         </div>

         <div style={{marginBottom:16}}>
           <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Email *</label>
           <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
             placeholder="tu@email.com"
             style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
         </div>

         <div style={{marginBottom:16}}>
           <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Contraseña *</label>
           <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
             placeholder="Mínimo 6 caracteres"
             style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
         </div>

         <div style={{marginBottom:16}}>
           <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Dirección del consorcio</label>
           <input value={consorcio} onChange={e=>setConsorcio(e.target.value)}
             placeholder="Ej: Av. Corrientes 1234"
             style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
         </div>

         <div style={{marginBottom:24}}>
           <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Barrio</label>
           <input value={barrio} onChange={e=>setBarrio(e.target.value)}
             placeholder="Ej: Palermo, CABA"
             style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
         </div>

         {estado==='error' && (
           <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:8,padding:'10px 14px',fontSize:12,color:'#ef4444',marginBottom:16}}>
             {mensaje}
           </div>
         )}

         <button onClick={handleRegistro} disabled={estado==='cargando'||!nombre||!email||!password}
           style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:!nombre||!email||!password?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!nombre||!email||!password?'#64748b':'white',fontSize:15,fontWeight:700,cursor:!nombre||!email||!password?'not-allowed':'pointer',boxShadow:nombre&&email&&password?'0 0 30px rgba(34,197,94,0.25)':'none'}}>
           {estado==='cargando'?'Creando cuenta...':'Crear mi cuenta →'}
         </button>

         <div style={{textAlign:'center',marginTop:20}}>
           <span style={{fontSize:13,color:'#64748b'}}>¿Ya tenés cuenta? </span>
           <a href="/login" style={{fontSize:13,color:'#22c55e',textDecoration:'none',fontWeight:600}}>Ingresá →</a>
         </div>
       </div>

       <a href="/" style={{display:'block',textAlign:'center',marginTop:20,fontSize:12,color:'#64748b',textDecoration:'none'}}>← Volver a Circulab.tech</a>
     </div>
   </div>
 )
}
