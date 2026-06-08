'use client'
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
   const [r,u,e,l,n,f,w,o] = await Promise.all([
     supabase.from('residuos').select('*, usuarios(nombre,apellido,consorcio,barrio)').order('created_at',{ascending:false}),
     supabase.from('usuarios').select('*').order('created_at',{ascending:false}),
     supabase.from('encuestas').select('*').order('created_at',{ascending:false}),
     supabase.from('leads_inversores').select('*').order('created_at',{ascending:false}),
     supabase.from('nda_firmas').select('*').order('created_at',{ascending:false}),
     supabase.from('feedback').select('*').order('created_at',{ascending:false}),
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

     </div>
   </div>
 )
}
