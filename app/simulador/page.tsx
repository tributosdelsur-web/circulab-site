'use client'
import { useState } from 'react'

const TIPOS = [
 {
   v:'organico', l:'Orgánico', icon:'🌿', color:'#22c55e',
   factor:1.8, kg_depto:15,
   fuentes:[
     {l:'Crédito carbono VCS (25%)', calc:(kg:number,d:number)=>kg*1.8/1000*22*0.25},
     {l:'Abono comercializable (25%)', calc:(kg:number,d:number)=>kg*0.5/1200*0.25},
     {l:'Ahorro recolección', calc:(kg:number,d:number)=>d*6},
   ]
 },
 {
   v:'plastico', l:'Plástico', icon:'♻️', color:'#3b82f6',
   factor:1.5, kg_depto:3,
   fuentes:[
     {l:'Crédito carbono Gold Standard (25%)', calc:(kg:number,d:number)=>kg*1.5/1000*20*0.25},
     {l:'Venta material reciclado', calc:(kg:number,d:number)=>kg*0.08*0.25},
   ]
 },
 {
   v:'papel', l:'Papel y cartón', icon:'📄', color:'#f59e0b',
   factor:0.9, kg_depto:4,
   fuentes:[
     {l:'Crédito carbono Gold Standard (25%)', calc:(kg:number,d:number)=>kg*0.9/1000*18*0.25},
     {l:'Venta material reciclado', calc:(kg:number,d:number)=>kg*0.04*0.25},
   ]
 },
 {
   v:'vidrio', l:'Vidrio', icon:'🍾', color:'#a855f7',
   factor:0.3, kg_depto:2,
   fuentes:[
     {l:'Crédito carbono Verra (25%)', calc:(kg:number,d:number)=>kg*0.3/1000*15*0.25},
     {l:'Ahorro recolección', calc:(kg:number,d:number)=>d*1},
   ]
 },
 {
   v:'metal', l:'Metal', icon:'🔩', color:'#ef4444',
   factor:8.0, kg_depto:0.5,
   fuentes:[
     {l:'Crédito carbono CAR (25%)', calc:(kg:number,d:number)=>kg*8.0/1000*35*0.25},
     {l:'Venta chatarra (25%)', calc:(kg:number,d:number)=>kg*0.40*0.25},
   ]
 },
 {
   v:'aceite', l:'Aceite usado', icon:'🛢️', color:'#f97316',
   factor:2.5, kg_depto:0.3,
   fuentes:[
     {l:'Crédito carbono Verra (25%)', calc:(kg:number,d:number)=>kg*2.5/1000*25*0.25},
     {l:'Biodiesel (25%)', calc:(kg:number,d:number)=>kg*0.30*0.25},
   ]
 },
 {
   v:'textil', l:'Textil', icon:'👕', color:'#ec4899',
   factor:5.5, kg_depto:0.5,
   fuentes:[
     {l:'Crédito carbono Gold Standard (25%)', calc:(kg:number,d:number)=>kg*5.5/1000*28*0.25},
     {l:'Ropa reutilizable (25%)', calc:(kg:number,d:number)=>kg*0.50*0.25},
   ]
 },
]

export default function Simulador() {
 const [deptos, setDeptos] = useState(50)
 const [participacion, setParticipacion] = useState(60)
 const [tipos_activos, setTiposActivos] = useState(['organico','plastico','papel','metal'])

 function toggleTipo(v: string) {
   setTiposActivos(prev=>prev.includes(v)?prev.filter(t=>t!==v):[...prev,v])
 }

 const deptos_activos = Math.round(deptos * participacion / 100)

 const resultados = TIPOS.filter(t=>tipos_activos.includes(t.v)).map(t=>{
   const kg_mes = deptos_activos * t.kg_depto
   const total_fuentes = t.fuentes.reduce((a,f)=>a+f.calc(kg_mes,deptos),0)
   const detalle = t.fuentes.map(f=>({l:f.l, v:f.calc(kg_mes,deptos)}))
   const co2 = kg_mes * t.factor / 1000
   return {...t, kg_mes, total:total_fuentes, detalle, co2}
 })

 const total_mensual = resultados.reduce((a,r)=>a+r.total,0)
 const total_anual = total_mensual * 12
 const total_co2 = resultados.reduce((a,r)=>a+r.co2,0)
 const total_kg = resultados.reduce((a,r)=>a+r.kg_mes,0)
 const por_depto = total_mensual / deptos

 return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px 20px 60px'}}>
     <div style={{maxWidth:560,margin:'0 auto'}}>

       {/* Header */}
       <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
         <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
           <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
           <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>OLIVIA Circulab</span>
         </a>
         <a href="/dashboard" style={{fontSize:11,color:'#64748b',textDecoration:'none'}}>Mi panel →</a>
       </div>

       <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>
         🏢 ¿Cuánto puede recuperar tu consorcio?
       </div>
       <div style={{fontSize:13,color:'#64748b',marginBottom:24,lineHeight:1.5}}>
         Calculá el valor real de separar los residuos de tu edificio — en dinero.
       </div>

       {/* Configuración */}
       <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px',marginBottom:16}}>

         <div style={{marginBottom:20}}>
           <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
             <span style={{fontSize:13,color:'#94a3b8'}}>¿Cuántos departamentos tiene tu edificio?</span>
             <span style={{fontSize:15,fontWeight:800,color:'#f1f5f9'}}>{deptos}</span>
           </div>
           <input type="range" min={10} max={300} value={deptos}
             onChange={e=>setDeptos(Number(e.target.value))}
             style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
           <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
             <span>10 deptos</span>
             <span>150</span>
             <span>300 deptos</span>
           </div>
         </div>

         <div style={{marginBottom:20}}>
           <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
             <span style={{fontSize:13,color:'#94a3b8'}}>¿Qué % de vecinos participaría?</span>
             <span style={{fontSize:15,fontWeight:800,color:'#f1f5f9'}}>{participacion}% · {deptos_activos} vecinos</span>
           </div>
           <input type="range" min={10} max={100} value={participacion}
             onChange={e=>setParticipacion(Number(e.target.value))}
             style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
           <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
             <span>10%</span>
             <span>50%</span>
             <span>100%</span>
           </div>
         </div>

         <div>
           <div style={{fontSize:13,color:'#94a3b8',marginBottom:10}}>¿Qué residuos van a separar?</div>
           <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
             {TIPOS.map(t=>(
               <button key={t.v} onClick={()=>toggleTipo(t.v)}
                 style={{padding:'7px 12px',borderRadius:8,border:'none',cursor:'pointer',fontSize:12,fontWeight:600,
                   background:tipos_activos.includes(t.v)?`rgba(${t.color==='#22c55e'?'34,197,94':t.color==='#3b82f6'?'59,130,246':t.color==='#f59e0b'?'245,158,11':t.color==='#a855f7'?'168,85,247':t.color==='#ef4444'?'239,68,68':t.color==='#f97316'?'249,115,22':'236,72,153'},0.15)`:'rgba(255,255,255,0.04)',
                   color:tipos_activos.includes(t.v)?t.color:'#64748b',
                   outline:tipos_activos.includes(t.v)?`2px solid ${t.color}44`:'none'}}>
                 {t.icon} {t.l}
               </button>
             ))}
           </div>
         </div>
       </div>

       {/* Resultado grande */}
       <div style={{background:'linear-gradient(135deg,#0f1f10,#050d1f)',border:'2px solid rgba(34,197,94,0.4)',borderRadius:16,padding:'24px',marginBottom:16,textAlign:'center'}}>
         <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Tu consorcio recupera</div>
         <div style={{fontSize:48,fontWeight:900,color:'#22c55e',lineHeight:1}}>
           USD {total_mensual.toFixed(0)}
         </div>
         <div style={{fontSize:14,color:'#64748b',marginBottom:16}}>por mes</div>

         <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16}}>
           <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'10px'}}>
             <div style={{fontSize:16,fontWeight:800,color:'#22c55e'}}>USD {total_anual.toFixed(0)}</div>
             <div style={{fontSize:9,color:'#64748b',marginTop:2}}>por año</div>
           </div>
           <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'10px'}}>
             <div style={{fontSize:16,fontWeight:800,color:'#3b82f6'}}>USD {por_depto.toFixed(2)}</div>
             <div style={{fontSize:9,color:'#64748b',marginTop:2}}>por depto/mes</div>
           </div>
           <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'10px'}}>
             <div style={{fontSize:16,fontWeight:800,color:'#a855f7'}}>{(total_co2*1000).toFixed(0)}kg</div>
             <div style={{fontSize:9,color:'#64748b',marginTop:2}}>CO2eq evitado/mes</div>
           </div>
         </div>

         <div style={{fontSize:10,color:'#64748b',lineHeight:1.5}}>
           Basado en {total_kg.toFixed(0)}kg de residuos separados por mes · {deptos_activos} vecinos activos
         </div>
       </div>

       {/* Desglose por tipo */}
       {resultados.length>0&&(
         <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px',marginBottom:16}}>
           <div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Desglose por tipo de residuo</div>
           {resultados.map(r=>(
             <div key={r.v} style={{marginBottom:16,paddingBottom:16,borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
               <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                 <div style={{display:'flex',alignItems:'center',gap:8}}>
                   <span style={{fontSize:20}}>{r.icon}</span>
                   <div>
                     <div style={{fontSize:13,fontWeight:700}}>{r.l}</div>
                     <div style={{fontSize:10,color:'#64748b'}}>{r.kg_mes.toFixed(1)}kg/mes · {deptos_activos} vecinos</div>
                   </div>
                 </div>
                 <div style={{textAlign:'right'}}>
                   <div style={{fontSize:16,fontWeight:800,color:r.color}}>USD {r.total.toFixed(2)}</div>
                   <div style={{fontSize:9,color:'#64748b'}}>por mes</div>
                 </div>
               </div>
               {r.detalle.map((d:any,i:number)=>(
                 <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'4px 8px',background:'rgba(255,255,255,0.02)',borderRadius:6,marginBottom:3}}>
                   <span style={{fontSize:10,color:'#64748b'}}>{d.l}</span>
                   <span style={{fontSize:10,fontWeight:600,color:r.color}}>USD {d.v.toFixed(2)}</span>
                 </div>
               ))}
             </div>
           ))}
         </div>
       )}

       {/* Nota importante */}
       <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:12,padding:'14px',marginBottom:20}}>
         <div style={{fontSize:11,fontWeight:700,color:'#f59e0b',marginBottom:6}}>⚠️ Importante</div>
         <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.6}}>
           Los ingresos por créditos de carbono se activan cuando OLIVIA certifique con Verra en 2027 (Fase 3).
           Los consorcios que empiezan hoy acumulan el historial verificado que habilita ese cobro.
           El ahorro en recolección y venta de materiales aplica desde el día 1.
         </div>
       </div>

       {/* CTAs */}
       <div style={{display:'flex',flexDirection:'column',gap:10}}>
         <a href="/registrar" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'16px',borderRadius:14,fontSize:15,fontWeight:700,textDecoration:'none',display:'block',textAlign:'center',boxShadow:'0 0 20px rgba(34,197,94,0.2)'}}>
           Registrar mi primer residuo →
         </a>
         <a href="mailto:hola@oliviacirculab.com.ar?subject=Quiero sumar mi consorcio a OLIVIA"
           style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',padding:'14px',borderRadius:14,fontSize:14,fontWeight:700,textDecoration:'none',display:'block',textAlign:'center'}}>
           🏢 Sumar mi consorcio a OLIVIA →
         </a>
       </div>

     </div>
   </div>
 )
}
