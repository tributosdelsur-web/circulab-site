'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const ADMIN_PASSWORD = 'circulab2026'

function BarChart({datos, color='#22c55e'}: {datos:{label:string,value:number}[], color?:string}) {
 const max = Math.max(...datos.map(d=>d.value), 1)
 return (
   <div style={{display:'flex',gap:6,alignItems:'flex-end',height:80}}>
     {datos.map((d,i)=>(
       <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
         <div style={{fontSize:9,color:'#64748b',fontWeight:600}}>{d.value}</div>
         <div style={{width:'100%',background:color,borderRadius:'4px 4px 0 0',height:Math.max((d.value/max)*60,2)+'px',opacity:0.8}} />
         <div style={{fontSize:8,color:'#64748b',textAlign:'center',maxWidth:40,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.label}</div>
       </div>
     ))}
   </div>
 )
}

function exportarCSV(data: any[], nombre: string) {
 if(!data.length) return
 const keys = Object.keys(data[0])
 const csv = [
   keys.join(','),
   ...data.map(row=>keys.map(k=>JSON.stringify(row[k]??'')).join(','))
 ].join('\n')
 const blob = new Blob([csv], {type:'text/csv'})
 const url = URL.createObjectURL(blob)
 const a = document.createElement('a')
 a.href = url
 a.download = `${nombre}-${new Date().toISOString().split('T')[0]}.csv`
 a.click()
}


function NewsletterEngine({usuarios,residuos}:any) {
  const [newsletter, setNewsletter] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [copiado, setCopiado] = React.useState(false)
  const kg = residuos.reduce((a:number,r:any)=>a+Number(r.peso_kg||0),0)
  const co2 = residuos.reduce((a:number,r:any)=>a+Number(r.co2_evitado_kg||0),0)
  const generar = async () => {
    setLoading(true); setNewsletter('')
    const prompt = 'Escribe el newsletter quincenal de OLIVIA Circulab. Datos: ' + usuarios.length + ' usuarios, ' + kg.toFixed(1) + ' kg verificados, ' + co2.toFixed(1) + ' kg CO2eq. Tono cercano. Max 300 palabras.'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:800,messages:[{role:'user',content:prompt}]})})
      const data = await res.json()
      setNewsletter(data.content?.[0]?.text||'Error')
    } catch(e){setNewsletter('Error')}
    setLoading(false)
  }
  return (
    <div>
      <button onClick={generar} disabled={loading} style={{width:'100%',background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#a855f7,#7c3aed)',border:'none',borderRadius:10,padding:'12px',color:'white',fontSize:13,fontWeight:700,cursor:'pointer',marginBottom:12}}>
        {loading?'Generando...':'Generar newsletter'}
      </button>
      {newsletter&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'14px',fontSize:12,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8,maxHeight:300,overflowY:'auto'}}>{newsletter}</div>
          <button onClick={()=>{navigator.clipboard.writeText(newsletter);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'8px',color:copiado?'#22c55e':'#94a3b8',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            {copiado?'Copiado':'Copiar texto'}
          </button>
        </div>
      )}
    </div>
  )
}

function CommunityEngine({usuarios}:any) {
  const [msgs, setMsgs] = React.useState<any>({})
  const [loading, setLoading] = React.useState<any>({})
  const generar = async (u:any) => {
    setLoading((p:any)=>({...p,[u.id]:true}))
    const prompt = 'Escribe un mensaje de bienvenida personalizado para ' + (u.nombre||'el usuario') + ' de OLIVIA Circulab en ' + (u.barrio||'Buenos Aires') + '. Tramo Semilla 2026. OLV acumulandose. Arbol 2027 con Verra. Maximo 80 palabras.'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:300,messages:[{role:'user',content:prompt}]})})
      const data = await res.json()
      setMsgs((p:any)=>({...p,[u.id]:data.content?.[0]?.text||'Error'}))
    } catch(e){setMsgs((p:any)=>({...p,[u.id]:'Error'}))}
    setLoading((p:any)=>({...p,[u.id]:false}))
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {usuarios.slice(0,8).map((u:any)=>(
        <div key={u.id} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:msgs[u.id]?8:0}}>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:'#f1f5f9'}}>{u.nombre} {u.apellido||''}</div>
              <div style={{fontSize:10,color:'#64748b'}}>{u.email}</div>
            </div>
            <button onClick={()=>generar(u)} disabled={loading[u.id]} style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:8,padding:'5px 10px',color:'#22c55e',fontSize:10,fontWeight:700,cursor:'pointer'}}>
              {loading[u.id]?'...':'Generar'}
            </button>
          </div>
          {msgs[u.id]&&<div style={{fontSize:11,color:'#94a3b8',lineHeight:1.6}}>{msgs[u.id]}</div>}
        </div>
      ))}
      {usuarios.length===0&&<div style={{fontSize:11,color:'#64748b',textAlign:'center',padding:'20px 0'}}>Sin usuarios aun</div>}
    </div>
  )
}

function EmailSecuencia({usuarios}:any) {
  const [tipo, setTipo] = React.useState('dia3')
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [copiado, setCopiado] = React.useState(false)
  const TIPOS = [
    {id:'dia3',label:'Dia 3 - Primer residuo',prompt:'Escribe email de seguimiento para usuario de OLIVIA que se registro hace 3 dias y no registro residuos. Tono cercano. Recordar 100 OLV Bonus. 2 minutos para registrar. CTA oliviacirculab.com.ar/registrar. Max 120 palabras. Incluir ASUNTO: al inicio.'},
    {id:'dia7',label:'Dia 7 - Invitar vecinos',prompt:'Escribe email para usuario activo de OLIVIA hace 7 dias. Felicitarlo. Recordar +50 OLV por vecino invitado. Max 120 palabras. Incluir ASUNTO: al inicio.'},
    {id:'dia30',label:'Mes 1 - Reporte',prompt:'Escribe email de reporte mensual para usuario de OLIVIA. Celebratorio. Un mes activo. OLV acumulandose para Verra 2027. CTA dashboard. Max 150 palabras. Incluir ASUNTO: al inicio.'},
    {id:'verra',label:'Hito Verra Feb 2026',prompt:'Escribe email anunciando que Verra aprobo metodologia dMRV en febrero 2026. Celebracion. OLV se van a certificar. Arbol 2027 real. Max 150 palabras. Incluir ASUNTO: al inicio.'},
  ]
  const generar = async () => {
    setLoading(true); setEmail('')
    const t = TIPOS.find(x=>x.id===tipo)
    if (!t) return
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:400,messages:[{role:'user',content:t.prompt}]})})
      const data = await res.json()
      setEmail(data.content?.[0]?.text||'Error')
    } catch(e){setEmail('Error')}
    setLoading(false)
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
        {TIPOS.map(t=>(
          <button key={t.id} onClick={()=>setTipo(t.id)} style={{padding:'8px',borderRadius:8,border:'1px solid ' + (tipo===t.id?'#a855f7':'rgba(255,255,255,0.06)'),background:tipo===t.id?'rgba(168,85,247,0.1)':'rgba(255,255,255,0.02)',color:tipo===t.id?'#a855f7':'#64748b',fontSize:10,fontWeight:700,cursor:'pointer',textAlign:'left' as const}}>
            {t.label}
          </button>
        ))}
      </div>
      <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#a855f7,#7c3aed)',border:'none',borderRadius:10,padding:'10px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
        {loading?'Generando...':'Generar email'}
      </button>
      {email&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'12px',fontSize:11,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8,maxHeight:200,overflowY:'auto'}}>{email}</div>
          <button onClick={()=>{navigator.clipboard.writeText(email);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px',color:copiado?'#22c55e':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {copiado?'Copiado':'Copiar email'}
          </button>
        </div>
      )}
    </div>
  )
}

function CampaniaCiudadana({usuarios}:any) {
  const [msg, setMsg] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [copiado, setCopiado] = React.useState(false)
  const [seg, setSeg] = React.useState('inactivos')
  const prompts:any = {
    inactivos:'Escribe un mensaje de reactivacion para usuario de OLIVIA sin actividad en 7 dias. Tono cercano. OLV esperando. 2 minutos para registrar. Max 80 palabras.',
    upgrade:'Escribe mensaje para invitar a usuario activo a plan premium USD 1/mes de OLIVIA. Beneficios: dashboard certificado, prioridad retiro, badge. Max 80 palabras.',
    referidos:'Escribe mensaje para motivar a usuario de OLIVIA a referir amigos. +50 OLV por amigo. Mayor volumen = mayor valor en 2027. Max 80 palabras.',
    whatsapp:'Escribe mensaje para grupos de WhatsApp de vecinos invitando a OLIVIA Circulab. Gratis. OLV acumulando. Valor real en 2027. Max 100 palabras.',
  }
  const generar = async () => {
    setLoading(true); setMsg('')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:300,messages:[{role:'user',content:prompts[seg]}]})})
      const data = await res.json()
      setMsg(data.content?.[0]?.text||'Error')
    } catch(e){setMsg('Error')}
    setLoading(false)
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
        {[{id:'inactivos',l:'Sin actividad 7 dias'},{id:'upgrade',l:'Upgrade premium'},{id:'referidos',l:'Invitar vecinos'},{id:'whatsapp',l:'Template WhatsApp'}].map(s=>(
          <button key={s.id} onClick={()=>setSeg(s.id)} style={{padding:'8px',borderRadius:8,border:'1px solid ' + (seg===s.id?'#22c55e':'rgba(255,255,255,0.06)'),background:seg===s.id?'rgba(34,197,94,0.1)':'transparent',color:seg===s.id?'#22c55e':'#64748b',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {s.l}
          </button>
        ))}
      </div>
      <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'10px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
        {loading?'Generando...':'Generar mensaje'}
      </button>
      {msg&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'12px',fontSize:11,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8}}>{msg}</div>
          <button onClick={()=>{navigator.clipboard.writeText(msg);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px',color:copiado?'#22c55e':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {copiado?'Copiado':'Copiar'}
          </button>
        </div>
      )}
    </div>
  )
}

function CampaniaConsorcios({usuarios}:any) {
  const [datos, setDatos] = React.useState({nombre:'',unidades:'100',barrio:'Palermo'})
  const [propuesta, setPropuesta] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [copiado, setCopiado] = React.useState(false)
  const generar = async () => {
    setLoading(true); setPropuesta('')
    const prompt = 'Escribe una propuesta comercial para el consorcio ' + datos.nombre + ' en ' + datos.barrio + ' con ' + datos.unidades + ' unidades. OLIVIA Circulab: cumplir Ley Basura Cero CABA, certificacion gestion residuos, creditos carbono Verra 2027, badge Edificio Verde. Sin precios especificos. CTA reunion 20 minutos. Max 200 palabras.'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:500,messages:[{role:'user',content:prompt}]})})
      const data = await res.json()
      setPropuesta(data.content?.[0]?.text||'Error')
    } catch(e){setPropuesta('Error')}
    setLoading(false)
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <input placeholder="Nombre del edificio" value={datos.nombre} onChange={e=>setDatos(p=>({...p,nombre:e.target.value}))} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
        <input placeholder="Unidades" value={datos.unidades} onChange={e=>setDatos(p=>({...p,unidades:e.target.value}))} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
        <input placeholder="Barrio" value={datos.barrio} onChange={e=>setDatos(p=>({...p,barrio:e.target.value}))} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none',gridColumn:'span 2'}} />
      </div>
      <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'10px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
        {loading?'Generando propuesta...':'Generar propuesta'}
      </button>
      {propuesta&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'14px',fontSize:11,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8,maxHeight:200,overflowY:'auto'}}>{propuesta}</div>
          <button onClick={()=>{navigator.clipboard.writeText(propuesta);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px',color:copiado?'#22c55e':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {copiado?'Copiado':'Copiar propuesta'}
          </button>
        </div>
      )}
    </div>
  )
}

function CampaniaGastro() {
  const [tipo, setTipo] = React.useState('restoran')
  const [nombre, setNombre] = React.useState('')
  const [propuesta, setPropuesta] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [copiado, setCopiado] = React.useState(false)
  const generar = async () => {
    setLoading(true); setPropuesta('')
    const prompt = tipo==='hotel'
      ? 'Escribe propuesta para hotel ' + nombre + '. OLIVIA Circulab: dashboard residuos, reporte ESG GRI/SASB, certificacion Verra 2027, badge Hotel Verde. Sin precios. CTA demo. Max 180 palabras.'
      : 'Escribe propuesta para restaurante ' + nombre + '. OLIVIA Circulab: badge Verde Tripadvisor, verificacion IA residuos, reporte impacto mensual, creditos carbono Verra 2027. Sin precios. CTA visita. Max 150 palabras.'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:400,messages:[{role:'user',content:prompt}]})})
      const data = await res.json()
      setPropuesta(data.content?.[0]?.text||'Error')
    } catch(e){setPropuesta('Error')}
    setLoading(false)
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <div style={{display:'flex',gap:8}}>
        {['restoran','hotel','cafe'].map(t=>(
          <button key={t} onClick={()=>setTipo(t)} style={{padding:'6px 12px',borderRadius:20,border:'1px solid ' + (tipo===t?'#f59e0b':'rgba(255,255,255,0.08)'),background:tipo===t?'rgba(245,158,11,0.1)':'transparent',color:tipo===t?'#f59e0b':'#64748b',fontSize:10,fontWeight:700,cursor:'pointer',textTransform:'capitalize' as const}}>
            {t}
          </button>
        ))}
      </div>
      <input placeholder="Nombre del local" value={nombre} onChange={e=>setNombre(e.target.value)} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
      <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#f59e0b,#d97706)',border:'none',borderRadius:10,padding:'10px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
        {loading?'Generando...':'Generar propuesta'}
      </button>
      {propuesta&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,padding:'12px',fontSize:11,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8}}>{propuesta}</div>
          <button onClick={()=>{navigator.clipboard.writeText(propuesta);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px',color:copiado?'#f59e0b':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {copiado?'Copiado':'Copiar propuesta'}
          </button>
        </div>
      )}
    </div>
  )
}

function CampaniaRSE() {
  const [empresa, setEmpresa] = React.useState('')
  const [sector, setSector] = React.useState('')
  const [modalidad, setModalidad] = React.useState('compensacion')
  const [propuesta, setPropuesta] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [copiado, setCopiado] = React.useState(false)
  const generar = async () => {
    setLoading(true); setPropuesta('')
    const prompt = 'Escribe propuesta RSE/ESG para ' + empresa + ' sector ' + sector + '. Modalidad: ' + modalidad + '. OLIVIA Circulab: compensacion huella verificada con IA, datos GRI/SASB/TCFD, certificacion Verra 2027. Sin precios. CTA reunion. Max 180 palabras.'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:500,messages:[{role:'user',content:prompt}]})})
      const data = await res.json()
      setPropuesta(data.content?.[0]?.text||'Error')
    } catch(e){setPropuesta('Error')}
    setLoading(false)
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <input placeholder="Empresa" value={empresa} onChange={e=>setEmpresa(e.target.value)} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
        <input placeholder="Sector" value={sector} onChange={e=>setSector(e.target.value)} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
      </div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap' as const}}>
        {[{id:'compensacion',l:'Compensacion huella'},{id:'reporting',l:'SaaS ESG Reporting'},{id:'empleados',l:'Programa empleados'}].map(m=>(
          <button key={m.id} onClick={()=>setModalidad(m.id)} style={{padding:'5px 10px',borderRadius:20,border:'1px solid ' + (modalidad===m.id?'#a855f7':'rgba(255,255,255,0.08)'),background:modalidad===m.id?'rgba(168,85,247,0.1)':'transparent',color:modalidad===m.id?'#a855f7':'#64748b',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {m.l}
          </button>
        ))}
      </div>
      <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#a855f7,#7c3aed)',border:'none',borderRadius:10,padding:'10px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
        {loading?'Generando...':'Generar propuesta RSE'}
      </button>
      {propuesta&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(168,85,247,0.2)',borderRadius:10,padding:'12px',fontSize:11,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8}}>{propuesta}</div>
          <button onClick={()=>{navigator.clipboard.writeText(propuesta);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px',color:copiado?'#a855f7':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {copiado?'Copiado':'Copiar'}
          </button>
        </div>
      )}
    </div>
  )
}

function CampaniaEmisores() {
  const [sector, setSector] = React.useState('naviera')
  const [empresa, setEmpresa] = React.useState('')
  const [propuesta, setPropuesta] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [copiado, setCopiado] = React.useState(false)
  const SECTORES = [{id:'naviera',l:'Naviera',reg:'IMO 2050'},{id:'aerolinea',l:'Aerolinea',reg:'CORSIA 2027'},{id:'mineria',l:'Mineria',reg:'Scope 1-2-3'},{id:'forestal',l:'Forestal',reg:'FSC + carbono'},{id:'cemento',l:'Cemento/Acero',reg:'Paris sectorial'}]
  const generar = async () => {
    setLoading(true); setPropuesta('')
    const s = SECTORES.find(x=>x.id===sector)
    const prompt = 'Escribe propuesta B2B para ' + empresa + ' sector ' + sector + '. Regulacion: ' + (s?.reg||'ESG') + '. OLIVIA Circulab: creditos carbono verificados IA+GPS, Verra VCS 2027, dashboard ESG. Offsets genericos rechazados por auditores. Sin precios. CTA reunion tecnica. Max 200 palabras.'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:500,messages:[{role:'user',content:prompt}]})})
      const data = await res.json()
      setPropuesta(data.content?.[0]?.text||'Error')
    } catch(e){setPropuesta('Error')}
    setLoading(false)
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
        {SECTORES.map(s=>(
          <button key={s.id} onClick={()=>setSector(s.id)} style={{padding:'8px',borderRadius:8,border:'1px solid ' + (sector===s.id?'#06b6d4':'rgba(255,255,255,0.06)'),background:sector===s.id?'rgba(6,182,212,0.1)':'rgba(255,255,255,0.02)',cursor:'pointer',textAlign:'left' as const}}>
            <div style={{fontSize:10,fontWeight:700,color:sector===s.id?'#06b6d4':'#64748b'}}>{s.l}</div>
            <div style={{fontSize:9,color:'#64748b'}}>{s.reg}</div>
          </button>
        ))}
      </div>
      <input placeholder="Nombre de la empresa" value={empresa} onChange={e=>setEmpresa(e.target.value)} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
      <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#06b6d4,#0284c7)',border:'none',borderRadius:10,padding:'10px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
        {loading?'Generando...':'Generar propuesta'}
      </button>
      {propuesta&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(6,182,212,0.2)',borderRadius:10,padding:'12px',fontSize:11,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8}}>{propuesta}</div>
          <button onClick={()=>{navigator.clipboard.writeText(propuesta);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px',color:copiado?'#06b6d4':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {copiado?'Copiado':'Copiar propuesta'}
          </button>
        </div>
      )}
    </div>
  )
}

function CampaniaMunicipios() {
  const [municipio, setMunicipio] = React.useState('')
  const [fondos, setFondos] = React.useState('BID Lab')
  const [propuesta, setPropuesta] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [copiado, setCopiado] = React.useState(false)
  const generar = async () => {
    setLoading(true); setPropuesta('')
    const prompt = 'Escribe propuesta institucional para Secretaria de Ambiente de ' + municipio + '. OLIVIA Circulab: datos dMRV para ' + fondos + ', medir impacto separacion ciudadana, activar capacidad ociosa plantas existentes. Sin precios. CTA presentacion. Max 220 palabras.'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:500,messages:[{role:'user',content:prompt}]})})
      const data = await res.json()
      setPropuesta(data.content?.[0]?.text||'Error')
    } catch(e){setPropuesta('Error')}
    setLoading(false)
  }
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <input placeholder="Municipio / Ciudad" value={municipio} onChange={e=>setMunicipio(e.target.value)} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
        <select value={fondos} onChange={e=>setFondos(e.target.value)} style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}}>
          <option>BID Lab</option><option>Green Climate Fund</option><option>Banco Mundial</option>
        </select>
      </div>
      <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'10px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
        {loading?'Generando...':'Generar propuesta institucional'}
      </button>
      {propuesta&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'12px',fontSize:11,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8}}>{propuesta}</div>
          <button onClick={()=>{navigator.clipboard.writeText(propuesta);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px',color:copiado?'#22c55e':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
            {copiado?'Copiado':'Copiar propuesta'}
          </button>
        </div>
      )}
    </div>
  )
}

function PipelineComercial() {
  const [leads, setLeads] = React.useState<any[]>([])
  const [nuevo, setNuevo] = React.useState({nombre:'',tipo:'consorcio',estado:'identificado',contacto:'',next_step:''})
  const ETAPAS = [{id:'identificado',l:'Identificado',c:'#64748b'},{id:'contactado',l:'Contactado',c:'#3b82f6'},{id:'reunion',l:'Reunion',c:'#f59e0b'},{id:'propuesta',l:'Propuesta',c:'#a855f7'},{id:'piloto',l:'Piloto',c:'#22c55e'},{id:'contrato',l:'Contrato',c:'#06b6d4'}]
  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:6}}>
        {ETAPAS.map(e=>(
          <div key={e.id} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + e.c + '33',borderRadius:8,padding:'8px',textAlign:'center' as const}}>
            <div style={{fontSize:9,fontWeight:700,color:e.c,marginBottom:2}}>{e.l}</div>
            <div style={{fontSize:18,fontWeight:900,color:e.c}}>{leads.filter(l=>l.estado===e.id).length}</div>
          </div>
        ))}
      </div>
      <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'12px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
          <input placeholder="Nombre del lead" value={nuevo.nombre} onChange={e=>setNuevo(p=>({...p,nombre:e.target.value}))} style={{padding:'8px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:11,outline:'none'}} />
          <select value={nuevo.tipo} onChange={e=>setNuevo(p=>({...p,tipo:e.target.value}))} style={{padding:'8px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:11,outline:'none'}}>
            <option value="consorcio">Consorcio</option><option value="restoran">Restaurante</option><option value="hotel">Hotel</option><option value="rse">RSE/ESG</option><option value="emisor">Gran Emisor</option><option value="municipio">Municipio</option>
          </select>
          <input placeholder="Contacto" value={nuevo.contacto} onChange={e=>setNuevo(p=>({...p,contacto:e.target.value}))} style={{padding:'8px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:11,outline:'none'}} />
          <input placeholder="Next step" value={nuevo.next_step} onChange={e=>setNuevo(p=>({...p,next_step:e.target.value}))} style={{padding:'8px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:11,outline:'none'}} />
        </div>
        <button onClick={()=>{if(!nuevo.nombre)return;setLeads(p=>[...p,{...nuevo,id:Date.now()}]);setNuevo({nombre:'',tipo:'consorcio',estado:'identificado',contacto:'',next_step:''})}} style={{width:'100%',background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:8,padding:'8px',color:'white',fontSize:11,fontWeight:700,cursor:'pointer'}}>
          + Agregar al pipeline
        </button>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        {leads.map((l:any)=>(
          <div key={l.id} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'10px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,flexWrap:'wrap' as const}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:'#f1f5f9'}}>{l.nombre}</div>
              <div style={{fontSize:9,color:'#64748b'}}>{l.tipo} · {l.contacto}</div>
              {l.next_step&&<div style={{fontSize:9,color:'#f59e0b'}}>→ {l.next_step}</div>}
            </div>
            <select value={l.estado} onChange={e=>setLeads(p=>p.map((x:any)=>x.id===l.id?{...x,estado:e.target.value}:x))} style={{padding:'4px 6px',borderRadius:6,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:9,cursor:'pointer'}}>
              {ETAPAS.map(e=><option key={e.id} value={e.id}>{e.l}</option>)}
            </select>
          </div>
        ))}
        {leads.length===0&&<div style={{fontSize:11,color:'#64748b',textAlign:'center' as const,padding:'16px 0'}}>Pipeline vacio - Agrega tu primer lead</div>}
      </div>
    </div>
  )
}

function VentasDirectas({usuarios}:any) {
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
      {[
        {titulo:'SaaS Ciudadano USD 1/mes',valor:0,label:'Suscriptores premium',color:'#22c55e',desc:'Integracion Mercado Pago pendiente post-inversion.'},
        {titulo:'Material Clasificado',valor:0,label:'kg disponibles',color:'#f59e0b',desc:'PET, Carton, Aluminio, Aceite. Contactar recicladores industriales.'},
        {titulo:'Creditos Pre-venta',valor:0,label:'contratos forward',color:'#a855f7',desc:'Empresas interesadas en comprar creditos Verra antes de 2027.'},
      ].map((item,i)=>(
        <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + item.color + '22',borderRadius:14,padding:'16px'}}>
          <div style={{fontSize:10,fontWeight:700,color:item.color,marginBottom:4}}>{item.titulo}</div>
          <div style={{fontSize:24,fontWeight:900,color:item.color,marginBottom:4}}>{item.valor}</div>
          <div style={{fontSize:9,color:'#64748b',marginBottom:6}}>{item.label}</div>
          <div style={{fontSize:9,color:'#64748b',lineHeight:1.5}}>{item.desc}</div>
        </div>
      ))}
    </div>
  )
}

function ManualOperativo() {
  const PASOS = [
    {titulo:'Publicar en LinkedIn (5 min)',color:'#3b82f6',items:['Admin → LinkedIn Studio','Selecciona el dia (L/M/V)','Apreta Generar','Copia el post y el prompt de imagen','leonardo.ai → genera imagen → descarga','LinkedIn → pega texto + sube imagen → publica']},
    {titulo:'Enviar Newsletter (10 min)',color:'#a855f7',items:['Admin → Newsletter Engine','Apreta Generar newsletter','Copia el texto','Abre Gmail o cliente de email','Envia a la lista de usuarios (CSV desde tab Usuarios)']},
    {titulo:'Seguimiento de leads (2 min/lead)',color:'#22c55e',items:['Admin → Pipeline Comercial','Identifica leads sin contacto','Ve a la campana correspondiente','Genera propuesta con los datos del lead','Copia y envia por email o LinkedIn']},
    {titulo:'Postulacion a fondo (2-4 horas)',color:'#f59e0b',items:['Admin → Postulaciones','Filtra por deadline proximo','Abre la URL del fondo','Completa con One Pager + Pitch + Metricas del Dashboard','Actualiza el estado en el admin']},
  ]
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'12px',marginBottom:4}}>
        <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:4}}>Flujo semanal recomendado - 1 hora/dia</div>
        <div style={{fontSize:10,color:'#94a3b8',lineHeight:1.7}}>Lunes: LinkedIn Studio 3 posts (30min) · Martes: Pipeline + seguimientos (30min) · Miercoles: Campana activa (30min) · Jueves: Postulaciones (30min) · Viernes: Analytics + Newsletter quincena (30min)</div>
      </div>
      {PASOS.map((paso,i)=>(
        <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + paso.color + '22',borderRadius:12,padding:'12px'}}>
          <div style={{fontSize:11,fontWeight:700,color:paso.color,marginBottom:8}}>{paso.titulo}</div>
          {paso.items.map((item,j)=>(
            <div key={j} style={{display:'flex',gap:8,marginBottom:4}}>
              <div style={{width:16,height:16,borderRadius:'50%',background:paso.color+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:700,color:paso.color,flexShrink:0}}>{j+1}</div>
              <div style={{fontSize:10,color:'#94a3b8'}}>{item}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Admin() {
 const [auth, setAuth] = useState(false)
 const [pwd, setPwd] = useState('')
 const [error, setError] = useState(false)
 const [tab, setTab] = useState('dashboard')
 const [loading, setLoading] = useState(true)

 const [residuos, setResiduos] = useState<any[]>([])
 const [usuarios, setUsuarios] = useState<any[]>([])
 const [encuestas, setEncuestas] = useState<any[]>([])
 const [leads, setLeads] = useState<any[]>([])
 const [ndas, setNdas] = useState<any[]>([])
 const [feedback, setFeedback] = useState<any[]>([])
  const [postulaciones, setPostulaciones] = useState<any[]>([])
  const [inversoresCRM, setInversoresCRM] = useState<any[]>([])
  const [nuevaPostulacion, setNuevaPostulacion] = useState({fondo_nombre:'',tipo:'vc',estado:'pendiente',deadline:'',monto_potencial:'',contacto:'',notas:'',next_step:'',url:''})
  const [nuevoInversor, setNuevoInversor] = useState({nombre:'',empresa:'',email:'',cargo:'',estado:'frio',origen:'linkedin',monto_potencial:'',estructura_preferida:'por_definir',notas:'',next_step:''})
 const [whitepapers, setWhitepapers] = useState<any[]>([])
 const [onepagers, setOnepagers] = useState<any[]>([])
  const [leadsAOM, setLeadsAOM] = useState<any[]>([])
  const [leadsQuincena, setLeadsQuincena] = useState<any[]>([])
  const [leadsAlianzas, setLeadsAlianzas] = useState<any[]>([])

 const [analizando, setAnalizando] = useState<string|null>(null)
 const [analisis, setAnalisis] = useState<any>({})
 const [pesoReal, setPesoReal] = useState<any>({})
 const [fotoGrande, setFotoGrande] = useState<string|null>(null)
 const [leadEstados, setLeadEstados] = useState<any>({})
 const [publicandoTexto, setPublicandoTexto] = useState('')
 const [publicando, setPublicando] = useState(false)
 const [publicado, setPublicado] = useState(false)

 async function cargar() {
   setLoading(true)
   const [r,u,e,l,n,f,post,crm,w,o,laom,lq,al] = await Promise.all([
     supabase.from('residuos').select('*, usuarios(nombre,apellido,consorcio,barrio)').order('created_at',{ascending:false}),
     supabase.from('usuarios').select('*').order('created_at',{ascending:false}),
     supabase.from('encuestas').select('*').order('created_at',{ascending:false}),
     supabase.from('leads_inversores').select('*').order('created_at',{ascending:false}),
     supabase.from('nda_firmas').select('*').order('created_at',{ascending:false}),
     supabase.from('feedback').select('*').order('created_at',{ascending:false}),
     supabase.from('postulaciones').select('*').order('created_at',{ascending:false}),
     supabase.from('inversores_crm').select('*').order('created_at',{ascending:false}),
     supabase.from('whitepaper_descargas').select('*').order('created_at',{ascending:false}),
     supabase.from('onepager_descargas').select('*').order('created_at',{ascending:false}),
     supabase.from('leads_aom').select('*').order('created_at',{ascending:false}),
     supabase.from('leads_quincena').select('*').order('created_at',{ascending:false}),
     supabase.from('alianzas_leads').select('*').order('created_at',{ascending:false}),
   ])
   setResiduos(r.data||[])
   setUsuarios(u.data||[])
   setEncuestas(e.data||[])
   setLeads(l.data||[])
   setNdas(n.data||[])
   setFeedback(f.data||[])
   setPostulaciones(post.data||[])
   setInversoresCRM(crm.data||[])
   setWhitepapers(w.data||[])
   setOnepagers(o.data||[])
   setLoading(false)
 }

 useEffect(()=>{if(auth) cargar()},[auth])

 async function validar(id: string) {
   const update: any = {status:'validado'}
   if(pesoReal[id]) update.kg = parseFloat(pesoReal[id])
   await supabase.from('residuos').update(update).eq('id',id)
   cargar()
 }

 async function rechazar(id: string) {
   await supabase.from('residuos').update({status:'rechazado'}).eq('id',id)
   cargar()
 }

 async function validarTodos() {
   const pendientes = residuos.filter(r=>r.status==='pendiente').map(r=>r.id)
   await Promise.all(pendientes.map(id=>supabase.from('residuos').update({status:'validado'}).eq('id',id)))
   cargar()
 }

 async function analizarFoto(residuo: any) {
   if(!residuo.foto_url) return
   setAnalizando(residuo.id)
   try {
     const res = await fetch('/api/analizar-foto',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({foto_url:residuo.foto_url})})
     const resultado = await res.json()
     setAnalisis((p:any)=>({...p,[residuo.id]:resultado}))
   } catch(e) {
     setAnalisis((p:any)=>({...p,[residuo.id]:{error:'No se pudo analizar'}}))
   }
   setAnalizando(null)
 }

 async function actualizarLeadEstado(id: string, estado: string) {
   setLeadEstados((p:any)=>({...p,[id]:estado}))
   await supabase.from('leads_inversores').update({status:estado}).eq('id',id)
 }

 async function publicarEnOlivia() {
   if(!publicandoTexto) return
   setPublicando(true)
   await supabase.from('posts').insert({usuario_id:null,contenido:publicandoTexto,tipo:'oficial',olv_ganados:0})
   setPublicandoTexto('')
   setPublicado(true)
   setPublicando(false)
   setTimeout(()=>setPublicado(false),3000)
 }

 async function compartirEnRedes(texto: string) {
   if(navigator.share) {
     try { await navigator.share({title:'OLIVIA Circulab',text:texto,url:'https://circulab-site.vercel.app'}) } catch(e) {}
   } else {
     await navigator.clipboard.writeText(texto)
     alert('Texto copiado para compartir en redes')
   }
 }

 function contarPorValor(campo: string) {
   const counts: any = {}
   encuestas.forEach(e=>{
     const v = e[campo]||'sin respuesta'
     counts[v] = (counts[v]||0)+1
   })
   return Object.entries(counts).sort((a:any,b:any)=>b[1]-a[1])
 }

 // Cálculos
 const pendientes = residuos.filter(r=>r.status==='pendiente')
 const validados = residuos.filter(r=>r.status==='validado')
 const kg_total = validados.reduce((a,r)=>a+Number(r.kg),0)
 const co2_total = validados.reduce((a,r)=>a+(Number(r.kg)*1.8),0)
 const quierePiloto = encuestas.filter(e=>e.quiere_piloto==='si').length

 // Gráficos
 const TIPOS = ['organico','plastico','papel','vidrio','metal','aceite','textil']
 const ICONS: any = {organico:'🌿',plastico:'♻️',papel:'📄',vidrio:'🍾',metal:'🔩',aceite:'🛢️',textil:'👕'}
 const residuos_por_tipo = TIPOS.map(t=>({
   label: ICONS[t],
   value: residuos.filter(r=>r.tipo===t).reduce((a,r)=>a+Number(r.kg),0)
 })).filter(d=>d.value>0)

 const usuarios_por_semana = (() => {
   const semanas: any = {}
   usuarios.forEach(u=>{
     const fecha = new Date(u.created_at)
     const semana = `S${Math.ceil(fecha.getDate()/7)}-${fecha.getMonth()+1}`
     semanas[semana] = (semanas[semana]||0)+1
   })
   return Object.entries(semanas).slice(-6).map(([k,v])=>({label:k,value:v as number}))
 })()

 const textoRedes = `🌿 OLIVIA Circulab esta semana:\n\n✅ ${validados.length} residuos verificados\n♻️ ${kg_total.toFixed(1)}kg reciclados\n💨 ${co2_total.toFixed(1)}kg CO2eq evitados\n👥 ${usuarios.length} usuarios activos\n\nSumate → oliviacirculab.com.ar\n\n#OliviaCirculab #ReFi #Reciclaje #CABA`

 // Funnel comercial
 const funnel = [
   {l:'Encuestas completadas',v:encuestas.length,c:'#22c55e'},
   {l:'One Pager descargado',v:onepagers.length,c:'#3b82f6'},
   {l:'Whitepaper + NDA',v:Math.max(whitepapers.length,ndas.length),c:'#f59e0b'},
   {l:'Leads inversores',v:leads.length,c:'#a855f7'},
   {l:'Reunión / Interesados',v:leads.filter(l=>leadEstados[l.id]==='reunion_agendada'||leadEstados[l.id]==='interesado'||l.status==='reunion_agendada'||l.status==='interesado').length,c:'#ec4899'},
 ]

 const tabs = [
   {id:'dashboard',l:'Dashboard',icon:'⊞'},
   {id:'pendientes',l:`Pendientes (${pendientes.length})`,icon:'⏳'},
   {id:'todos',l:`Residuos (${residuos.length})`,icon:'♻️'},
   {id:'usuarios',l:`Usuarios (${usuarios.length})`,icon:'👥'},
   {id:'encuestas',l:`Encuestas (${encuestas.length})`,icon:'📊'},
   {id:'comercial',l:'Comercial',icon:'💼'},
   {id:'feedback',l:`Feedback (${feedback.length})`,icon:'💬'},
   {id:'publicar',l:'Publicar',icon:'📢'},
  {id:'postulaciones',l:`Postulaciones (${postulaciones.length})`,icon:'🎯'},
  {id:'inversores_crm',l:`Investor CRM (${inversoresCRM.length})`,icon:'💰'},
  {id:'linkedin',l:'LinkedIn Studio',icon:'💼'},
  {id:'newsletter',l:'Newsletter',icon:'📧'},
  {id:'community',l:'Community Engine',icon:'🤝'},
  {id:'email_secuencia',l:'Email Secuencia',icon:'✉️'},
  {id:'camp_ciudadana',l:'Campaña Ciudadana',icon:'👤'},
  {id:'camp_consorcios',l:'Consorcios',icon:'🏢'},
  {id:'camp_gastro',l:'Gastronómico',icon:'🍽️'},
  {id:'camp_rse',l:'RSE/ESG',icon:'🏛️'},
  {id:'camp_emisores',l:'Grandes Emisores',icon:'🚢'},
  {id:'camp_municipios',l:'Municipios',icon:'🏙️'},
  {id:'pipeline',l:'Pipeline Comercial',icon:'📊'},
  {id:'ventas',l:'Ventas Directas',icon:'💵'},
  {id:'manual',l:'Manual Operativo',icon:'📖'},
 ]

 if(!auth) return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
     <div style={{width:'100%',maxWidth:360}}>
       <div style={{textAlign:'center',marginBottom:32}}>
         <div style={{width:56,height:56,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:'white',margin:'0 auto 16px'}}>C</div>
         <div style={{fontSize:20,fontWeight:900,color:'#f1f5f9'}}>Panel Admin</div>
         <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Circulab Tech · Acceso restringido</div>
       </div>
       <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'28px'}}>
         <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)}
           onKeyDown={e=>e.key==='Enter'&&(pwd===ADMIN_PASSWORD?(setAuth(true),setError(false)):setError(true))}
           placeholder="Contraseña de admin"
           style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:`1px solid ${error?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.08)'}`,color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:error?8:16}} />
         {error&&<div style={{fontSize:12,color:'#ef4444',marginBottom:12}}>Contraseña incorrecta</div>}
         <button onClick={()=>pwd===ADMIN_PASSWORD?(setAuth(true),setError(false)):setError(true)}
           style={{width:'100%',padding:'12px',borderRadius:10,border:'none',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',fontSize:14,fontWeight:700,cursor:'pointer'}}>
           Entrar →
         </button>
       </div>
     </div>
   </div>
 )

 if(loading) return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui'}}>
     Cargando admin...
   </div>
 )

 return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui'}}>

     {fotoGrande&&(
       <div onClick={()=>setFotoGrande(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.95)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
         <img src={fotoGrande} alt="" style={{maxWidth:'100%',maxHeight:'90vh',objectFit:'contain',borderRadius:12}} />
         <div style={{position:'absolute',top:16,right:16,color:'white',fontSize:28,cursor:'pointer'}}>×</div>
       </div>
     )}

     <div style={{padding:'14px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#080c16',position:'sticky',top:0,zIndex:100}}>
       <div style={{display:'flex',alignItems:'center',gap:10}}>
         <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>C</div>
         <div>
           <div style={{fontSize:13,fontWeight:800}}>Admin OLIVIA Circulab</div>
           <div style={{fontSize:9,color:'#64748b'}}>Panel de control</div>
         </div>
       </div>
       <div style={{display:'flex',gap:8,alignItems:'center'}}>
         {tab==='pendientes'&&pendientes.length>0&&(
           <button onClick={validarTodos} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:8,padding:'6px 14px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
             ✅ Validar todos ({pendientes.length})
           </button>
         )}
         <button onClick={cargar} style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:8,padding:'6px 12px',color:'#64748b',fontSize:12,cursor:'pointer'}}>↻</button>
         <a href="/" style={{fontSize:11,color:'#64748b',textDecoration:'none'}}>← Sitio</a>
       </div>
     </div>

     <div style={{display:'flex',gap:2,padding:'8px 16px',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto',background:'#080c16'}}>
       {tabs.map(t=>(
         <button key={t.id} onClick={()=>setTab(t.id)}
           style={{padding:'6px 12px',borderRadius:8,border:'none',cursor:'pointer',fontSize:11,fontWeight:tab===t.id?700:500,background:tab===t.id?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.04)',color:tab===t.id?'#22c55e':'#64748b',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:4}}>
           <span>{t.icon}</span><span>{t.l}</span>
         </button>
       ))}
     </div>

     <div style={{padding:'16px 20px',maxWidth:900,margin:'0 auto'}}>

       {/* ═══ DASHBOARD ═══ */}
       {tab==='dashboard'&&(
         <div style={{display:'flex',flexDirection:'column',gap:16}}>
           <div style={{fontSize:16,fontWeight:900}}>Dashboard OLIVIA Circulab</div>

           {/* KPIs */}
           <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:10}}>
             {[
               {v:pendientes.length,l:'Pendientes',c:'#f59e0b'},
               {v:usuarios.length,l:'Usuarios',c:'#3b82f6'},
               {v:`${kg_total.toFixed(0)}kg`,l:'Kg verificados',c:'#22c55e'},
               {v:`${co2_total.toFixed(1)}`,l:'kg CO2eq',c:'#a855f7'},
               {v:encuestas.length,l:'Encuestas',c:'#22c55e'},
               {v:leads.length,l:'Leads',c:'#a855f7'},
               {v:ndas.length,l:'NDA',c:'#f59e0b'},
               {v:whitepapers.length,l:'Whitepaper',c:'#3b82f6'},
               {v:onepagers.length,l:'One Pager',c:'#22c55e'},
             ].map(k=>(
               <div key={k.l} style={{background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'12px',textAlign:'center',border:`1px solid ${k.c}22`}}>
                 <div style={{fontSize:20,fontWeight:800,color:k.c}}>{k.v}</div>
                 <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{k.l}</div>
               </div>
             ))}
           </div>

           {/* Impacto ambiental */}
           <div style={{background:'linear-gradient(135deg,#0f1f10,#050d1f)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:14,padding:'16px'}}>
             <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#22c55e'}}>🌍 Impacto ambiental del ecosistema</div>
             <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:10}}>
               {[
                 {icon:'♻️',v:`${kg_total.toFixed(1)}kg`,l:'Desviados del relleno'},
                 {icon:'💨',v:`${(kg_total*0.065).toFixed(2)}kg`,l:'Metano evitado'},
                 {icon:'🌡️',v:`${co2_total.toFixed(1)}kg`,l:'CO2eq evitados'},
                 {icon:'🚗',v:`${(co2_total/0.21).toFixed(0)}km`,l:'Equiv. en auto'},
                 {icon:'🌳',v:`${((co2_total/21)*365).toFixed(0)}d`,l:'Trabajo árbol'},
               ].map(m=>(
                 <div key={m.l} style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:'10px',textAlign:'center'}}>
                   <div style={{fontSize:20,marginBottom:4}}>{m.icon}</div>
                   <div style={{fontSize:14,fontWeight:800,color:'#22c55e'}}>{m.v}</div>
                   <div style={{fontSize:9,color:'#64748b',marginTop:2}}>{m.l}</div>
                 </div>
               ))}
             </div>
           </div>

           {/* Gráficos */}
           <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
             <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
               <div style={{fontSize:12,fontWeight:700,marginBottom:12,color:'#22c55e'}}>Kg por tipo de residuo</div>
               {residuos_por_tipo.length>0?(
                 <BarChart datos={residuos_por_tipo} color='#22c55e' />
               ):(
                 <div style={{fontSize:11,color:'#64748b',textAlign:'center',padding:'20px 0'}}>Sin datos aún</div>
               )}
             </div>
             <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
               <div style={{fontSize:12,fontWeight:700,marginBottom:12,color:'#3b82f6'}}>Usuarios por semana</div>
               {usuarios_por_semana.length>0?(
                 <BarChart datos={usuarios_por_semana} color='#3b82f6' />
               ):(
                 <div style={{fontSize:11,color:'#64748b',textAlign:'center',padding:'20px 0'}}>Sin datos aún</div>
               )}
             </div>
           </div>

           {/* Progreso hacia Fase 3 */}
           <div style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
             <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
               <div style={{fontSize:13,fontWeight:700}}>Progreso hacia certificación VCS</div>
               <div style={{fontSize:11,color:'#f59e0b',fontWeight:700}}>{co2_total.toFixed(1)} / 100.000 kg CO2eq</div>
             </div>
             <div style={{height:10,background:'rgba(255,255,255,0.06)',borderRadius:99,marginBottom:8}}>
               <div style={{height:'100%',width:`${Math.min((co2_total/100000)*100,100)}%`,background:'linear-gradient(90deg,#f59e0b,#ef4444)',borderRadius:99}} />
             </div>
             <div style={{fontSize:10,color:'#64748b'}}>
               Necesitamos 100 tCO2eq para la primera certificación Verra · Faltan {(100000-co2_total).toFixed(1)} kg CO2eq
             </div>
           </div>

           {/* Funnel comercial */}
           <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
             <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Funnel comercial inversores</div>
             {funnel.map((f,i)=>(
               <div key={f.l} style={{marginBottom:10}}>
                 <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:4}}>
                   <span style={{color:'#94a3b8'}}>{f.l}</span>
                   <span style={{fontWeight:700,color:f.c}}>{f.v}</span>
                 </div>
                 <div style={{height:6,background:'rgba(255,255,255,0.04)',borderRadius:99}}>
                   <div style={{height:'100%',width:`${funnel[0].v>0?(f.v/funnel[0].v)*100:0}%`,background:f.c,borderRadius:99}} />
                 </div>
               </div>
             ))}
           </div>

           {/* Exportar */}
           <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
             <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>📥 Exportar datos</div>
             <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
               {[
                 {l:'CSV Usuarios',fn:()=>exportarCSV(usuarios,'usuarios-olivia')},
                 {l:'CSV Residuos',fn:()=>exportarCSV(residuos,'residuos-olivia')},
                 {l:'CSV Encuestas',fn:()=>exportarCSV(encuestas,'encuestas-olivia')},
                 {l:'CSV Leads',fn:()=>exportarCSV(leads,'leads-olivia')},
                 {l:'CSV NDA',fn:()=>exportarCSV(ndas,'nda-olivia')},
                 {l:'CSV Whitepaper',fn:()=>exportarCSV(whitepapers,'whitepaper-descargas')},
                 {l:'CSV One Pager',fn:()=>exportarCSV(onepagers,'onepager-descargas')},
               ].map(b=>(
                 <button key={b.l} onClick={b.fn}
                   style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'7px 14px',color:'#f1f5f9',fontSize:12,cursor:'pointer',fontWeight:600}}>
                   ↓ {b.l}
                 </button>
               ))}
             </div>
           </div>

           {/* Compartir en redes */}
           <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
             <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>📤 Compartir impacto en redes</div>
             <div style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:'12px',marginBottom:10,fontSize:11,color:'#94a3b8',lineHeight:1.6,whiteSpace:'pre-line'}}>{textoRedes}</div>
             <button onClick={()=>compartirEnRedes(textoRedes)}
               style={{width:'100%',background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'10px',color:'white',fontSize:13,fontWeight:700,cursor:'pointer'}}>
               📤 Compartir en Instagram · Facebook · X
             </button>
           </div>
         </div>
       )}

       {/* ═══ RESIDUOS PENDIENTES / TODOS ═══ */}
       {(tab==='pendientes'||tab==='todos')&&(
         <div>
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
             <div style={{fontSize:14,fontWeight:700}}>
               {tab==='pendientes'?`⏳ Pendientes (${pendientes.length})`:`♻️ Todos los residuos (${residuos.length})`}
             </div>
             <button onClick={()=>exportarCSV(tab==='pendientes'?pendientes:residuos,'residuos')}
               style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:8,padding:'6px 12px',color:'#64748b',fontSize:11,cursor:'pointer'}}>
               ↓ CSV
             </button>
           </div>
           {(tab==='pendientes'?pendientes:residuos).length===0?(
             <div style={{textAlign:'center',padding:'40px',color:'#64748b',fontSize:14}}>
               {tab==='pendientes'?'✅ Sin pendientes':'Sin registros aún'}
             </div>
           ):(tab==='pendientes'?pendientes:residuos).map((r:any)=>(
             <div key={r.id} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'16px',marginBottom:12}}>
               <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12,flexWrap:'wrap',gap:8}}>
                 <div>
                   <div style={{fontSize:14,fontWeight:700,textTransform:'capitalize'}}>{r.tipo} · {r.kg}kg</div>
                   <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{r.usuarios?.nombre} {r.usuarios?.apellido}</div>
                   {r.usuarios?.barrio&&<div style={{fontSize:10,color:'#64748b',marginTop:1}}>📍 {r.usuarios.barrio}</div>}
                   {r.punto_entrega&&<div style={{fontSize:10,color:'#3b82f6',marginTop:2}}>🏭 {r.punto_entrega}</div>}
                   {r.metodo_disposicion&&<div style={{fontSize:10,color:'#22c55e',marginTop:2}}>♻️ {r.metodo_disposicion}</div>}
                   <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{new Date(r.created_at).toLocaleDateString()}</div>
                   {r.lat_origen&&(
                     <div style={{fontSize:9,color:'#64748b',marginTop:2}}>
                       GPS: {Number(r.lat_origen).toFixed(4)},{Number(r.lng_origen).toFixed(4)}
                       {r.lat_entrega&&` → ${Number(r.lat_entrega).toFixed(4)},${Number(r.lng_entrega).toFixed(4)}`}
                     </div>
                   )}
                 </div>
                 <span style={{fontSize:11,color:r.status==='validado'?'#22c55e':r.status==='rechazado'?'#ef4444':'#f59e0b',background:r.status==='validado'?'rgba(34,197,94,0.1)':r.status==='rechazado'?'rgba(239,68,68,0.1)':'rgba(245,158,11,0.1)',padding:'3px 10px',borderRadius:20}}>
                   {r.status==='validado'?'✓ Validado':r.status==='rechazado'?'✗ Rechazado':'⏳ Pendiente'}
                 </span>
               </div>

               <div style={{display:'flex',gap:10,marginBottom:12,flexWrap:'wrap'}}>
                 {r.foto_url&&(
                   <div>
                     <img src={r.foto_url} alt="" onClick={()=>setFotoGrande(r.foto_url)}
                       style={{width:110,height:80,objectFit:'cover',borderRadius:8,cursor:'pointer',border:'2px solid rgba(34,197,94,0.3)'}} />
                     <div style={{fontSize:8,color:'#22c55e',textAlign:'center',marginTop:2}}>Foto origen · referencial</div>
                   </div>
                 )}
                 {r.foto_entrega_url&&(
                   <div>
                     <img src={r.foto_entrega_url} alt="" onClick={()=>setFotoGrande(r.foto_entrega_url)}
                       style={{width:110,height:80,objectFit:'cover',borderRadius:8,cursor:'pointer',border:'2px solid rgba(59,130,246,0.5)'}} />
                     <div style={{fontSize:8,color:'#3b82f6',textAlign:'center',marginTop:2}}>📍 Foto entrega · activa OLV</div>
                   </div>
                 )}
                 {!r.foto_entrega_url&&(
                   <div style={{width:110,height:80,borderRadius:8,border:'2px dashed rgba(245,158,11,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:4}}>
                     <div style={{fontSize:16}}>⏳</div>
                     <div style={{fontSize:8,color:'#f59e0b',textAlign:'center'}}>Sin foto entrega</div>
                   </div>
                 )}
               </div>

               {analisis[r.id]&&!analisis[r.id].error&&(
                 <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'12px',marginBottom:12}}>
                   <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8}}>🤖 Análisis OLIVIA IA</div>
                   <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:6}}>
                     {[
                       {l:'Tipo',v:analisis[r.id].tipo_detectado},
                       {l:'Separación',v:analisis[r.id].separacion_correcta?'✅':'❌'},
                       {l:'Peso IA',v:analisis[r.id].peso_estimado_kg+'kg'},
                       {l:'Moneda ref.',v:analisis[r.id].moneda_referencia?'✅':'❌'},
                       {l:'Contaminantes',v:analisis[r.id].contaminantes?'⚠️':'✅'},
                       {l:'Calidad',v:analisis[r.id].calidad_foto},
                     ].map(item=>(
                       <div key={item.l} style={{background:'rgba(255,255,255,0.02)',borderRadius:6,padding:'5px 7px'}}>
                         <div style={{fontSize:9,color:'#64748b'}}>{item.l}</div>
                         <div style={{fontSize:10,fontWeight:600,color:'#f1f5f9',marginTop:1}}>{item.v}</div>
                       </div>
                     ))}
                   </div>
                   <div style={{fontSize:10,color:'#94a3b8',marginBottom:4}}>{analisis[r.id].observaciones}</div>
                   <div style={{fontSize:12,fontWeight:700,color:analisis[r.id].recomendacion==='VALIDAR'?'#22c55e':analisis[r.id].recomendacion==='RECHAZAR'?'#ef4444':'#f59e0b'}}>
                     {analisis[r.id].recomendacion} · Confianza: {analisis[r.id].confianza}
                   </div>
                 </div>
               )}

               <div style={{display:'flex',gap:8,marginBottom:10,alignItems:'center',flexWrap:'wrap'}}>
                 <span style={{fontSize:11,color:'#64748b'}}>Peso confirmado:</span>
                 <input type="number" step="0.1" placeholder={r.kg+'kg'}
                   value={pesoReal[r.id]||''}
                   onChange={e=>setPesoReal((p:any)=>({...p,[r.id]:e.target.value}))}
                   style={{width:100,padding:'5px 8px',borderRadius:6,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
               </div>

               <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                 {r.foto_url&&(
                   <button onClick={()=>analizarFoto(r)} disabled={analizando===r.id}
                     style={{background:'rgba(168,85,247,0.15)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:8,padding:'7px 12px',color:'#a855f7',fontSize:11,fontWeight:600,cursor:'pointer'}}>
                     {analizando===r.id?'🤖 Analizando...':'🤖 Analizar IA'}
                   </button>
                 )}
                 {r.status==='pendiente'&&(
                   <>
                     <button onClick={()=>validar(r.id)} style={{background:'rgba(34,197,94,0.15)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:8,padding:'7px 12px',color:'#22c55e',fontSize:11,fontWeight:600,cursor:'pointer'}}>
                       ✅ Validar
                     </button>
                     <button onClick={()=>rechazar(r.id)} style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:8,padding:'7px 12px',color:'#ef4444',fontSize:11,fontWeight:600,cursor:'pointer'}}>
                       ✗ Rechazar
                     </button>
                   </>
                 )}
               </div>
             </div>
           ))}
         </div>
       )}

       {/* ═══ USUARIOS ═══ */}
       {tab==='usuarios'&&(
         <div>
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
             <div style={{fontSize:14,fontWeight:700}}>👥 Usuarios ({usuarios.length})</div>
             <button onClick={()=>exportarCSV(usuarios,'usuarios-olivia')}
               style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:8,padding:'6px 12px',color:'#64748b',fontSize:11,cursor:'pointer'}}>
               ↓ CSV
             </button>
           </div>
           {usuarios.map((u:any)=>(
             <div key={u.id} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'14px',marginBottom:8}}>
               <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                 <div>
                   <div style={{fontSize:13,fontWeight:700}}>{u.nombre} {u.apellido}</div>
                   <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{u.email}</div>
                   {u.barrio&&<div style={{fontSize:10,color:'#64748b',marginTop:1}}>📍 {u.barrio}</div>}
                   <div style={{fontSize:10,color:'#22c55e',marginTop:2}}>Nivel {u.nivel} · {u.score_pulso} pts PULSO</div>
                   <div style={{fontSize:9,color:'#64748b',marginTop:1}}>{new Date(u.created_at).toLocaleDateString()}</div>
                 </div>
                 <div style={{textAlign:'right'}}>
                   <div style={{fontSize:14,fontWeight:700,color:'#22c55e'}}>{residuos.filter(r=>r.usuario_id===u.id).length} registros</div>
                   <div style={{fontSize:10,color:'#64748b'}}>{residuos.filter(r=>r.usuario_id===u.id&&r.status==='validado').length} validados</div>
                   <a href={`/usuario/${u.id}`} target="_blank" style={{fontSize:10,color:'#3b82f6',textDecoration:'none'}}>Ver perfil →</a>
                 </div>
               </div>
             </div>
           ))}
         </div>
       )}

       {/* ═══ ENCUESTAS ═══ */}
       {tab==='encuestas'&&(
         <div style={{display:'flex',flexDirection:'column',gap:16}}>
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
             <div style={{fontSize:14,fontWeight:700}}>📊 Encuestas ({encuestas.length})</div>
             <button onClick={()=>exportarCSV(encuestas,'encuestas-olivia')}
               style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:8,padding:'6px 12px',color:'#64748b',fontSize:11,cursor:'pointer'}}>
               ↓ CSV
             </button>
           </div>
           <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:10}}>
             {[
               {v:encuestas.length,l:'Total',c:'#22c55e'},
               {v:quierePiloto,l:'Quieren piloto',c:'#22c55e'},
               {v:encuestas.filter(e=>e.separa==='si').length,l:'Separan siempre',c:'#3b82f6'},
               {v:encuestas.filter(e=>e.separaria_con_beneficio==='si').length,l:'Con beneficio sí',c:'#f59e0b'},
             ].map(k=>(
               <div key={k.l} style={{background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'12px',textAlign:'center'}}>
                 <div style={{fontSize:24,fontWeight:800,color:k.c}}>{k.v}</div>
                 <div style={{fontSize:10,color:'#64748b',marginTop:4}}>{k.l}</div>
               </div>
             ))}
           </div>
           {[
             {campo:'separa',titulo:'¿Separás residuos?'},
             {campo:'motivacion',titulo:'¿Qué te motivaría?'},
             {campo:'como_conocio',titulo:'¿Cómo llegaste?'},
             {campo:'opinion_olivia',titulo:'¿Qué te parece OLIVIA?'},
             {campo:'tipo_vivienda',titulo:'Tipo de vivienda'},
             {campo:'quiere_piloto',titulo:'¿Querés sumarte?'},
           ].map(({campo,titulo})=>{
             const datos = contarPorValor(campo).filter(([k])=>k&&k!=='sin respuesta')
             if(!datos.length) return null
             const total = datos.reduce((a,[,v])=>a+(v as number),0)
             return (
               <div key={campo} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
                 <div style={{fontSize:12,fontWeight:700,marginBottom:10,color:'#22c55e'}}>{titulo}</div>
                 {datos.map(([label,count]:any)=>(
                   <div key={label} style={{marginBottom:8}}>
                     <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}}>
                       <span style={{color:'#f1f5f9',textTransform:'capitalize'}}>{String(label).replace(/_/g,' ')}</span>
                       <span style={{color:'#22c55e',fontWeight:700}}>{count} ({Math.round(count/total*100)}%)</span>
                     </div>
                     <div style={{height:6,background:'rgba(255,255,255,0.06)',borderRadius:99}}>
                       <div style={{height:'100%',width:(count/total*100)+'%',background:'linear-gradient(90deg,#22c55e,#16a34a)',borderRadius:99}} />
                     </div>
                   </div>
                 ))}
               </div>
             )
           })}
           {encuestas.filter(e=>e.quiere_piloto==='si'&&e.contacto).length>0&&(
             <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
               <div style={{fontSize:12,fontWeight:700,marginBottom:10,color:'#22c55e'}}>🙋 Contactos para el piloto</div>
               {encuestas.filter(e=>e.quiere_piloto==='si'&&e.contacto).map((e:any,i:number)=>(
                 <div key={i} style={{padding:'8px',borderRadius:8,background:'rgba(255,255,255,0.02)',marginBottom:6}}>
                   <div style={{fontSize:12,fontWeight:600}}>{e.nombre||'Sin nombre'}</div>
                   <div style={{fontSize:11,color:'#22c55e'}}>{e.contacto}</div>
                   <div style={{fontSize:10,color:'#64748b'}}>{e.barrio} · {e.tipo_vivienda}</div>
                 </div>
               ))}
             </div>
           )}
         </div>
       )}

       {/* ═══ COMERCIAL — Leads + NDA + Whitepaper + One Pager ═══ */}
       {tab==='comercial'&&(
         <div style={{display:'flex',flexDirection:'column',gap:16}}>
           <div style={{fontSize:14,fontWeight:700}}>💼 Panel comercial — inversores</div>

           {/* Funnel */}
           <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
             <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#a855f7'}}>Funnel completo</div>
             {funnel.map((f,i)=>(
               <div key={f.l} style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                 <div style={{width:20,height:20,borderRadius:'50%',background:f.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'white',flexShrink:0}}>{i+1}</div>
                 <div style={{flex:1}}>
                   <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:3}}>
                     <span style={{color:'#94a3b8'}}>{f.l}</span>
                     <span style={{fontWeight:700,color:f.c}}>{f.v}</span>
                   </div>
                   <div style={{height:5,background:'rgba(255,255,255,0.04)',borderRadius:99}}>
                     <div style={{height:'100%',width:`${funnel[0].v>0?(f.v/funnel[0].v)*100:0}%`,background:f.c,borderRadius:99}} />
                   </div>
                 </div>
               </div>
             ))}
           </div>

           {/* Leads One Pager */}
           <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
             <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
               <div style={{fontSize:13,fontWeight:700,color:'#a855f7'}}>💼 Leads One Pager ({leads.length})</div>
               <button onClick={()=>exportarCSV(leads,'leads-olivia')}
                 style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:6,padding:'4px 10px',color:'#64748b',fontSize:10,cursor:'pointer'}}>↓ CSV</button>
             </div>
             {leads.length===0?(
               <div style={{fontSize:11,color:'#64748b',textAlign:'center',padding:'16px 0'}}>Sin leads aún</div>
             ):leads.map((l:any)=>(
               <div key={l.id} style={{padding:'10px',borderRadius:10,background:'rgba(255,255,255,0.02)',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                 <div>
                   <div style={{fontSize:12,fontWeight:700}}>{l.nombre}</div>
                   <div style={{fontSize:10,color:'#a855f7'}}>{l.email}</div>
                   {l.empresa&&<div style={{fontSize:10,color:'#64748b'}}>🏢 {l.empresa}</div>}
                   <div style={{fontSize:9,color:'#64748b'}}>{new Date(l.created_at).toLocaleDateString()}</div>
                 </div>
                 <div style={{display:'flex',flexDirection:'column',gap:4,alignItems:'flex-end'}}>
                   <select value={leadEstados[l.id]||l.status||'nuevo'}
                     onChange={e=>actualizarLeadEstado(l.id,e.target.value)}
                     style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:6,padding:'3px 6px',color:'#f1f5f9',fontSize:10,cursor:'pointer'}}>
                     {['nuevo','contactado','reunion_agendada','interesado','no_interesado','invertido'].map(s=>(
                       <option key={s} value={s}>{s.replace(/_/g,' ')}</option>
                     ))}
                   </select>
                   <a href={`mailto:${l.email}`} style={{fontSize:10,color:'#22c55e',textDecoration:'none'}}>✉️ Escribir</a>
                 </div>
               </div>
             ))}
           </div>

           {/* NDA Whitepaper */}
           <div style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
             <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
               <div style={{fontSize:13,fontWeight:700,color:'#f59e0b'}}>📋 NDA Whitepaper ({ndas.length})</div>
               <button onClick={()=>exportarCSV(ndas,'nda-olivia')}
                 style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:6,padding:'4px 10px',color:'#64748b',fontSize:10,cursor:'pointer'}}>↓ CSV</button>
             </div>
             {ndas.length===0?(
               <div style={{fontSize:11,color:'#64748b',textAlign:'center',padding:'16px 0'}}>Sin firmas NDA aún</div>
             ):ndas.map((n:any)=>(
               <div key={n.id} style={{padding:'10px',borderRadius:10,background:'rgba(255,255,255,0.02)',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                 <div>
                   <div style={{fontSize:12,fontWeight:700}}>{n.nombre}</div>
                   <div style={{fontSize:10,color:'#f59e0b'}}>{n.email}</div>
                   {n.empresa&&<div style={{fontSize:10,color:'#64748b'}}>🏢 {n.empresa}</div>}
                   <div style={{fontSize:9,color:'#22c55e',marginTop:2}}>✅ NDA firmado</div>
                 </div>
                 <div style={{textAlign:'right'}}>
                   <div style={{fontSize:9,color:'#64748b'}}>{new Date(n.created_at).toLocaleDateString()}</div>
                   <a href={`mailto:${n.email}`} style={{fontSize:10,color:'#22c55e',textDecoration:'none',display:'block',marginTop:4}}>✉️ Escribir</a>
                 </div>
               </div>
             ))}
           </div>

           {/* Descargas Whitepaper */}
           <div style={{background:'#111827',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'16px'}}>
             <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
               <div style={{fontSize:13,fontWeight:700,color:'#3b82f6'}}>📄 Descargas Whitepaper ({whitepapers.length})</div>
               <button onClick={()=>exportarCSV(whitepapers,'whitepaper-descargas')}
                 style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:6,padding:'4px 10px',color:'#64748b',fontSize:10,cursor:'pointer'}}>↓ CSV</button>
             </div>
             {whitepapers.length===0?(
               <div style={{fontSize:11,color:'#64748b',textAlign:'center',padding:'16px 0'}}>Sin descargas aún</div>
             ):whitepapers.map((w:any)=>(
               <div key={w.id} style={{padding:'10px',borderRadius:10,background:'rgba(255,255,255,0.02)',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                 <div>
                   <div style={{fontSize:12,fontWeight:700}}>{w.nombre}</div>
                   <div style={{fontSize:10,color:'#3b82f6'}}>{w.email}</div>
                   {w.empresa&&<div style={{fontSize:10,color:'#64748b'}}>🏢 {w.empresa}</div>}
                 </div>
                 <div style={{textAlign:'right'}}>
                   <div style={{fontSize:9,color:'#64748b'}}>{new Date(w.created_at).toLocaleDateString()}</div>
                   <a href={`mailto:${w.email}`} style={{fontSize:10,color:'#22c55e',textDecoration:'none',display:'block',marginTop:4}}>✉️ Escribir</a>
                 </div>
               </div>
             ))}
           </div>

           {/* Descargas One Pager */}
           <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
             <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
               <div style={{fontSize:13,fontWeight:700,color:'#22c55e'}}>📄 Descargas One Pager ({onepagers.length})</div>
               <button onClick={()=>exportarCSV(onepagers,'onepager-descargas')}
                 style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:6,padding:'4px 10px',color:'#64748b',fontSize:10,cursor:'pointer'}}>↓ CSV</button>
             </div>
             {onepagers.length===0?(
               <div style={{fontSize:11,color:'#64748b',textAlign:'center',padding:'16px 0'}}>Sin descargas aún</div>
             ):onepagers.map((o:any)=>(
               <div key={o.id} style={{padding:'10px',borderRadius:10,background:'rgba(255,255,255,0.02)',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                 <div>
                   <div style={{fontSize:12,fontWeight:700}}>{o.nombre}</div>
                   <div style={{fontSize:10,color:'#22c55e'}}>{o.email}</div>
                   {o.empresa&&<div style={{fontSize:10,color:'#64748b'}}>🏢 {o.empresa}</div>}
                 </div>
                 <div style={{textAlign:'right'}}>
                   <div style={{fontSize:9,color:'#64748b'}}>{new Date(o.created_at).toLocaleDateString()}</div>
                   <a href={`mailto:${o.email}`} style={{fontSize:10,color:'#22c55e',textDecoration:'none',display:'block',marginTop:4}}>✉️ Escribir</a>
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}

      {/* ═══ LEADS AOM ═══ */}
      {tab==="comercial"&&leadsAOM.length>0&&(
        <div style={{marginTop:16}}>
          <div style={{fontSize:13,fontWeight:700,color:"#a855f7",marginBottom:10}}>🎵 Leads Art of Money ({leadsAOM.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {leadsAOM.map((l:any)=>(
              <div key={l.id} style={{background:"#111827",border:"1px solid rgba(168,85,247,0.2)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#f1f5f9"}}>{l.nombre}</div>
                  <div style={{fontSize:10,color:"#a855f7"}}>{l.tipo}</div>
                </div>
                <div style={{fontSize:11,color:"#64748b"}}>{l.email} · {new Date(l.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ LEADS QUINCENA ═══ */}
      {tab==="comercial"&&leadsQuincena.length>0&&(
        <div style={{marginTop:16}}>
          <div style={{fontSize:13,fontWeight:700,color:"#3b82f6",marginBottom:10}}>👥 Leads Quincena ({leadsQuincena.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {leadsQuincena.map((l:any)=>(
              <div key={l.id} style={{background:"#111827",border:"1px solid rgba(59,130,246,0.2)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#f1f5f9"}}>{l.nombre}</div>
                <div style={{fontSize:11,color:"#64748b"}}>{l.email} · {l.ciudad} · {new Date(l.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ LEADS ALIANZAS ═══ */}
      {tab==="comercial"&&leadsAlianzas.length>0&&(
        <div style={{marginTop:16}}>
          <div style={{fontSize:13,fontWeight:700,color:"#22c55e",marginBottom:10}}>🤝 Leads Alianzas ({leadsAlianzas.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {leadsAlianzas.map((l:any)=>(
              <div key={l.id} style={{background:"#111827",border:"1px solid rgba(34,197,94,0.2)",borderRadius:10,padding:"10px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#f1f5f9"}}>{l.nombre}</div>
                  <div style={{fontSize:10,color:"#22c55e"}}>{l.tipo}</div>
                </div>
                <div style={{fontSize:11,color:"#64748b"}}>{l.email} · {l.organizacion} · {new Date(l.created_at).toLocaleDateString()}</div>
                {l.mensaje&&<div style={{fontSize:10,color:"#94a3b8",marginTop:4}}>{l.mensaje}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

       {/* ═══ FEEDBACK ═══ */}
       {tab==='feedback'&&(
         <div>
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
             <div style={{fontSize:14,fontWeight:700}}>💬 Feedback de usuarios ({feedback.length})</div>
             <button onClick={()=>exportarCSV(feedback,'feedback-olivia')}
               style={{background:'rgba(255,255,255,0.06)',border:'none',borderRadius:8,padding:'6px 12px',color:'#64748b',fontSize:11,cursor:'pointer'}}>
               ↓ CSV
             </button>
           </div>
           {feedback.length===0?(
             <div style={{textAlign:'center',padding:'40px',color:'#64748b'}}>Sin feedback aún</div>
           ):feedback.map((f:any)=>(
             <div key={f.id} style={{background:'#111827',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'14px',marginBottom:8}}>
               <div style={{fontSize:13,color:'#f1f5f9',lineHeight:1.5,marginBottom:6}}>{f.mensaje}</div>
               <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                 <div style={{fontSize:10,color:'#64748b'}}>Página: {f.pagina} · {new Date(f.created_at).toLocaleDateString()}</div>
                 <span style={{fontSize:10,color:'#3b82f6',background:'rgba(59,130,246,0.1)',padding:'2px 8px',borderRadius:10}}>{f.pagina}</span>
               </div>
             </div>
           ))}
         </div>
       )}

       {/* ═══ PUBLICAR ═══ */}
       {tab==='publicar'&&(
         <div style={{display:'flex',flexDirection:'column',gap:16}}>
           <div style={{fontSize:14,fontWeight:700}}>📢 Publicar en el ecosistema</div>

           <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
             <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#22c55e'}}>🌿 Publicar en red OLIVIA</div>
             <div style={{fontSize:11,color:'#64748b',marginBottom:12}}>Aparece en el feed de la comunidad como publicación oficial</div>
             <textarea value={publicandoTexto} onChange={e=>setPublicandoTexto(e.target.value)}
               placeholder="Mensaje oficial para la comunidad OLIVIA..."
               rows={4}
               style={{width:'100%',padding:'12px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',resize:'none',boxSizing:'border-box',marginBottom:10}} />
             <button onClick={publicarEnOlivia} disabled={publicando||!publicandoTexto}
               style={{width:'100%',background:publicandoTexto?'linear-gradient(135deg,#22c55e,#16a34a)':'rgba(255,255,255,0.04)',border:'none',borderRadius:10,padding:'12px',color:publicandoTexto?'white':'#64748b',fontSize:13,fontWeight:700,cursor:'pointer'}}>
               {publicado?'✅ Publicado en OLIVIA':publicando?'Publicando...':'Publicar en OLIVIA →'}
             </button>
           </div>

           <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
             <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>📤 Compartir en redes externas</div>
             <div style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:'12px',marginBottom:10,fontSize:11,color:'#94a3b8',lineHeight:1.6,whiteSpace:'pre-line'}}>{textoRedes}</div>
             <button onClick={()=>compartirEnRedes(textoRedes)}
               style={{width:'100%',background:'linear-gradient(135deg,#3b82f6,#2563eb)',border:'none',borderRadius:10,padding:'12px',color:'white',fontSize:13,fontWeight:700,cursor:'pointer'}}>
               📤 Compartir en Instagram · Facebook · X
             </button>
           </div>

           <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
             <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Templates rápidos</div>
             {[
               {titulo:'🏆 Logro semanal',texto:`Esta semana la comunidad OLIVIA verificó ${kg_total.toFixed(0)}kg de residuos en Buenos Aires 🌿\n\n${co2_total.toFixed(1)}kg CO2eq evitados\n${usuarios.length} vecinos activos\n\n#OliviaCirculab`},
               {titulo:'📊 Dato de la encuesta',texto:`El ${encuestas.length>0?Math.round(encuestas.filter(e=>e.separaria_con_beneficio==='si').length/encuestas.length*100):78}% separaría si recibiera un beneficio económico real.\n\nEso es exactamente lo que hace OLIVIA 🌿\n\noliviacirculab.com.ar`},
               {titulo:'🌿 Invitación al piloto',texto:`¿Vivís en un edificio en Buenos Aires?\n\nTu consorcio puede empezar a recuperar el valor de sus residuos hoy.\n\nGratis. Sin complicaciones. Con impacto real.\n\n→ oliviacirculab.com.ar`},
             ].map(t=>(
               <div key={t.titulo} style={{marginBottom:10,padding:'12px',background:'rgba(255,255,255,0.02)',borderRadius:10}}>
                 <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>{t.titulo}</div>
                 <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.5,marginBottom:8,whiteSpace:'pre-line'}}>{t.texto}</div>
                 <div style={{display:'flex',gap:8}}>
                   <button onClick={()=>setPublicandoTexto(t.texto)}
                     style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:6,padding:'5px 10px',color:'#22c55e',fontSize:11,cursor:'pointer'}}>
                     Usar en OLIVIA
                   </button>
                   <button onClick={()=>compartirEnRedes(t.texto)}
                     style={{background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:6,padding:'5px 10px',color:'#3b82f6',fontSize:11,cursor:'pointer'}}>
                     Compartir en redes
                   </button>
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}



      {tab==='postulaciones'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>🎯 Fundraising Tracker</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#22c55e'}}>+ Nueva postulacion</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
              <input placeholder="Nombre del fondo" id="pf_nombre" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
              <select id="pf_tipo" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}}>
                <option value="vc">VC</option>
                <option value="incubadora">Incubadora</option>
                <option value="concurso">Concurso</option>
                <option value="grant">Grant</option>
                <option value="aceleradora">Aceleradora</option>
              </select>
              <input placeholder="Deadline (YYYY-MM-DD)" id="pf_deadline" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
              <input placeholder="Monto potencial" id="pf_monto" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
              <input placeholder="Contacto" id="pf_contacto" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
              <input placeholder="URL" id="pf_url" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
            </div>
            <textarea placeholder="Notas" id="pf_notas" style={{width:'100%',padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none',marginBottom:8,boxSizing:'border-box' as const,minHeight:60,resize:'vertical' as const}} />
            <textarea placeholder="Next step" id="pf_nextstep" style={{width:'100%',padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none',marginBottom:8,boxSizing:'border-box' as const,minHeight:40,resize:'vertical' as const}} />
            <button onClick={async()=>{
              const nombre = (document.getElementById('pf_nombre') as HTMLInputElement)?.value
              if(!nombre) return
              const tipo = (document.getElementById('pf_tipo') as HTMLSelectElement)?.value
              const deadline = (document.getElementById('pf_deadline') as HTMLInputElement)?.value
              const monto_potencial = (document.getElementById('pf_monto') as HTMLInputElement)?.value
              const contacto = (document.getElementById('pf_contacto') as HTMLInputElement)?.value
              const url = (document.getElementById('pf_url') as HTMLInputElement)?.value
              const notas = (document.getElementById('pf_notas') as HTMLTextAreaElement)?.value
              const next_step = (document.getElementById('pf_nextstep') as HTMLTextAreaElement)?.value
              await supabase.from('postulaciones').insert({fondo_nombre:nombre,tipo,deadline,monto_potencial,contacto,url,notas,next_step,estado:'pendiente'})
              const {data} = await supabase.from('postulaciones').select('*').order('created_at',{ascending:false})
              setPostulaciones(data||[])
            }} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:8,padding:'8px 16px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
              + Agregar
            </button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {postulaciones.length===0&&<div style={{fontSize:11,color:'#64748b',textAlign:'center' as const,padding:'20px 0'}}>Sin postulaciones aun</div>}
            {postulaciones.map((p:any)=>(
              <div key={p.id} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'14px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>{p.fondo_nombre}</div>
                    <div style={{fontSize:10,color:'#64748b'}}>{p.tipo} · {p.deadline||'Sin deadline'} · {p.monto_potencial||'Monto TBD'}</div>
                  </div>
                  <select value={p.estado} onChange={async e=>{
                    await supabase.from('postulaciones').update({estado:e.target.value}).eq('id',p.id)
                    const {data} = await supabase.from('postulaciones').select('*').order('created_at',{ascending:false})
                    setPostulaciones(data||[])
                  }} style={{padding:'4px 8px',borderRadius:6,background:p.estado==='aprobada'?'rgba(34,197,94,0.2)':p.estado==='rechazada'?'rgba(239,68,68,0.2)':p.estado==='en_proceso'?'rgba(59,130,246,0.2)':'rgba(255,255,255,0.04)',border:'none',color:p.estado==='aprobada'?'#22c55e':p.estado==='rechazada'?'#ef4444':p.estado==='en_proceso'?'#3b82f6':'#64748b',fontSize:11,fontWeight:700,cursor:'pointer'}}>
                    <option value="pendiente">Pendiente</option>
                    <option value="enviada">Enviada</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="rechazada">Rechazada</option>
                    <option value="aprobada">Aprobada</option>
                  </select>
                </div>
                {p.contacto&&<div style={{fontSize:10,color:'#94a3b8',marginBottom:4}}>👤 {p.contacto}</div>}
                {p.notas&&<div style={{fontSize:10,color:'#64748b',marginBottom:4}}>📝 {p.notas}</div>}
                {p.next_step&&<div style={{fontSize:10,color:'#f59e0b'}}>→ {p.next_step}</div>}
                {p.url&&<a href={p.url} target="_blank" style={{fontSize:10,color:'#3b82f6',textDecoration:'none'}}>🔗 {p.url}</a>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='inversores_crm'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>💰 Investor CRM</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginBottom:8}}>
            {[
              {estado:'frio',label:'❄️ Frio',color:'#64748b'},
              {estado:'contactado',label:'📧 Contactado',color:'#3b82f6'},
              {estado:'reunion',label:'🤝 Reunion',color:'#f59e0b'},
              {estado:'due_diligence',label:'🔍 Due Dil.',color:'#a855f7'},
              {estado:'cerrado',label:'✅ Cerrado',color:'#22c55e'},
            ].map(e=>(
              <div key={e.estado} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + e.color + '33',borderRadius:10,padding:'10px',textAlign:'center' as const}}>
                <div style={{fontSize:10,fontWeight:700,color:e.color,marginBottom:4}}>{e.label}</div>
                <div style={{fontSize:20,fontWeight:900,color:e.color}}>{inversoresCRM.filter((i:any)=>i.estado===e.estado).length}</div>
              </div>
            ))}
          </div>
          <div style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#f59e0b'}}>+ Nuevo inversor</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
              <input placeholder="Nombre completo" id="inv_nombre" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
              <input placeholder="Empresa" id="inv_empresa" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
              <input placeholder="Email" id="inv_email" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
              <input placeholder="Monto potencial" id="inv_monto" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
              <select id="inv_estructura" style={{padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none',gridColumn:'span 2'}}>
                <option value="por_definir">Estructura: Por definir</option>
                <option value="directa">Inversion directa</option>
                <option value="safe">SAFE + Cap</option>
                <option value="milestone">Milestone-based</option>
              </select>
            </div>
            <textarea placeholder="Notas y next step" id="inv_notas" style={{width:'100%',padding:'8px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none',marginBottom:8,boxSizing:'border-box' as const,minHeight:60,resize:'vertical' as const}} />
            <button onClick={async()=>{
              const nombre = (document.getElementById('inv_nombre') as HTMLInputElement)?.value
              if(!nombre) return
              const empresa = (document.getElementById('inv_empresa') as HTMLInputElement)?.value
              const email = (document.getElementById('inv_email') as HTMLInputElement)?.value
              const monto_potencial = (document.getElementById('inv_monto') as HTMLInputElement)?.value
              const estructura_preferida = (document.getElementById('inv_estructura') as HTMLSelectElement)?.value
              const notas = (document.getElementById('inv_notas') as HTMLTextAreaElement)?.value
              await supabase.from('inversores_crm').insert({nombre,empresa,email,monto_potencial,estructura_preferida,notas,estado:'frio',origen:'linkedin'})
              const {data} = await supabase.from('inversores_crm').select('*').order('created_at',{ascending:false})
              setInversoresCRM(data||[])
            }} style={{background:'linear-gradient(135deg,#f59e0b,#d97706)',border:'none',borderRadius:8,padding:'8px 16px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
              + Agregar inversor
            </button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {inversoresCRM.length===0&&<div style={{fontSize:11,color:'#64748b',textAlign:'center' as const,padding:'20px 0'}}>Sin inversores aun · Agrega el primero</div>}
            {inversoresCRM.map((inv:any)=>(
              <div key={inv.id} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'14px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>{inv.nombre}</div>
                    <div style={{fontSize:10,color:'#64748b'}}>{inv.empresa||'Sin empresa'} · {inv.email||''}</div>
                    {inv.monto_potencial&&<div style={{fontSize:10,color:'#f59e0b'}}>💰 {inv.monto_potencial}</div>}
                    {inv.estructura_preferida&&inv.estructura_preferida!=='por_definir'&&<div style={{fontSize:10,color:'#a855f7'}}>📋 {inv.estructura_preferida}</div>}
                  </div>
                  <select value={inv.estado} onChange={async e=>{
                    await supabase.from('inversores_crm').update({estado:e.target.value}).eq('id',inv.id)
                    const {data} = await supabase.from('inversores_crm').select('*').order('created_at',{ascending:false})
                    setInversoresCRM(data||[])
                  }} style={{padding:'4px 8px',borderRadius:6,background:'rgba(255,255,255,0.04)',border:'none',color:'#f1f5f9',fontSize:10,cursor:'pointer'}}>
                    <option value="frio">Frio</option>
                    <option value="contactado">Contactado</option>
                    <option value="reunion">Reunion</option>
                    <option value="due_diligence">Due Diligence</option>
                    <option value="cerrado">Cerrado</option>
                  </select>
                </div>
                {inv.notas&&<div style={{fontSize:10,color:'#64748b'}}>{inv.notas}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==='linkedin'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>LinkedIn Studio</div>
          <div style={{background:'#111827',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#3b82f6'}}>Generador de posts con IA</div>
            <div style={{fontSize:11,color:'#64748b',marginBottom:16}}>3 posts por semana · Lunes · Miercoles · Viernes · Extra inversor</div>
            {[
              {dia:'Lunes',tipo:'Cientifico / Educativo',color:'#3b82f6',key:'lunes',prompt:'Escribe un post LinkedIn para OLIVIA Circulab. Tono cientifico accesible. Tema: fundamento del reciclaje urbano y creditos de carbono. Hito Verra Feb 2026. CTA oliviacirculab.com.ar. Max 250 palabras. 5 hashtags. Al final PROMPT IMAGEN para Leonardo AI estilo cinematic editorial verde oscuro.'},
              {dia:'Miercoles',tipo:'Producto / Datos',color:'#22c55e',key:'miercoles',prompt:'Escribe un post LinkedIn para OLIVIA Circulab. Tono datos concretos. Mencionar producto activo con USD 0 inversion externa, modelo SaaS USD 600/mes para consorcios. CTA. Max 250 palabras. 5 hashtags. Al final PROMPT IMAGEN Leonardo AI.'},
              {dia:'Viernes',tipo:'Historia / Emotivo',color:'#a855f7',key:'viernes',prompt:'Escribe un post LinkedIn para OLIVIA Circulab. Tono emotivo. Historia de JP y Mileidy construyendo en su cocina para Santino Eloy. USD 0 inversion externa. El planeta no espera. Max 250 palabras. 5 hashtags. Al final PROMPT IMAGEN Leonardo AI.'},
              {dia:'Extra Inversor',tipo:'Fundraising',color:'#f59e0b',key:'extra',prompt:'Escribe un post LinkedIn para OLIVIA Circulab dirigido a inversores. Ronda Seed USD 500K 10% equity, Ley 27.506 USD 1=1.4, hito Verra Feb 2026, producto activo USD 0 inversion externa. Tono confianza. Max 250 palabras. 5 hashtags. Al final PROMPT IMAGEN Leonardo AI.'},
            ].map((item)=>{
              const [post, setPost] = React.useState('')
              const [loading, setLoading] = React.useState(false)
              const [copiado, setCopiado] = React.useState(false)
              const generar = async () => {
                setLoading(true); setPost('')
                try {
                  const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,messages:[{role:'user',content:item.prompt}]})})
                  const data = await res.json()
                  setPost(data.content?.[0]?.text||'Error')
                } catch(e){setPost('Error')}
                setLoading(false)
              }
              return (
                <div key={item.key} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'14px',marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:item.color}}>{item.dia}</div>
                      <div style={{fontSize:10,color:'#64748b'}}>{item.tipo}</div>
                    </div>
                    <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,padding:'6px 12px',color:loading?'#64748b':'#3b82f6',fontSize:11,fontWeight:700,cursor:'pointer'}}>
                      {loading?'Generando...':'Generar'}
                    </button>
                  </div>
                  {post&&(
                    <div>
                      <div style={{fontSize:11,color:'#94a3b8',background:'rgba(255,255,255,0.02)',borderRadius:8,padding:'10px',marginBottom:8,lineHeight:1.6,maxHeight:160,overflowY:'auto',whiteSpace:'pre-wrap'}}>{post}</div>
                      <button onClick={()=>{navigator.clipboard.writeText(post);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:'6px',color:copiado?'#22c55e':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
                        {copiado?'Copiado':'Copiar post + prompt imagen'}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
            <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:'10px',fontSize:10,color:'#94a3b8',lineHeight:1.6}}>
              Flujo: Genera el post y copia. El prompt de imagen va en leonardo.ai. Programa con Buffer.
            </div>
          </div>
        </div>
      )}

      {tab==='newsletter'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Newsletter Engine</div>
          <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#a855f7'}}>Generador quincenal con metricas reales</div>
            <NewsletterEngine usuarios={usuarios} residuos={residuos} />
          </div>
        </div>
      )}

      {tab==='community'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Community Engine</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#22c55e'}}>Mensajes personalizados con IA</div>
            <CommunityEngine usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='email_secuencia'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Email Secuencia</div>
          <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
            <EmailSecuencia usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='camp_ciudadana'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Ciudadana</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaCiudadana usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='camp_consorcios'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Consorcios</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaConsorcios usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='camp_gastro'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Gastro</div>
          <div style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaGastro />
          </div>
        </div>
      )}

      {tab==='camp_rse'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana RSE / ESG</div>
          <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaRSE />
          </div>
        </div>
      )}

      {tab==='camp_emisores'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Grandes Emisores</div>
          <div style={{background:'#111827',border:'1px solid rgba(6,182,212,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaEmisores />
          </div>
        </div>
      )}

      {tab==='camp_municipios'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Municipios</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaMunicipios />
          </div>
        </div>
      )}

      {tab==='pipeline'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Pipeline Comercial</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <PipelineComercial />
          </div>
        </div>
      )}

      {tab==='ventas'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Ventas Directas</div>
          <div style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
            <VentasDirectas usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='manual'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Manual Operativo</div>
          <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
            <ManualOperativo />
          </div>
        </div>
      )}
     </div>
   </div>
 )
}
