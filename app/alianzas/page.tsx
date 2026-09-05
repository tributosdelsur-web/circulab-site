'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const T = {
 es: {
   badge:'Alianzas · OLIVIA Circulab',
   titulo:'¿Querés ser parte del ecosistema?',
   subtitulo:'Los OLV que recibís hoy son una cuenta por cobrar — no un descuento. Las empresas que entran antes acumulan más cuando valen poco y cobran más cuando valen más.',
   segmentos_titulo:'¿Qué tipo de organización sos?',
   form_titulo:'Contactanos',
   form_sub:'Completá el formulario y te contactamos en 48 horas',
   nombre:'Tu nombre completo',
   email:'Tu email',
   organizacion:'Nombre de tu organización',
   mensaje:'¿Qué te interesa? ¿Cómo podemos colaborar?',
   enviar:'Enviar →',
   enviando:'Enviando...',
   enviado_titulo:'¡Gracias! Te contactamos pronto.',
   enviado_sub:'Revisamos tu consulta y te escribimos en menos de 48 horas a tu email.',
   por_que_titulo:'¿Por qué ser partner de OLIVIA?',
   estado:'Convenios en desarrollo · Q3 2026',
 },
 en: {
   badge:'Partnerships · OLIVIA Circulab',
   titulo:'Want to be part of the ecosystem?',
   subtitulo:'OLV you receive today are a receivable — not a discount. Companies that join early accumulate more when they\'re cheap and earn more when they\'re worth more.',
   segmentos_titulo:'What type of organization are you?',
   form_titulo:'Contact us',
   form_sub:'Fill out the form and we\'ll contact you within 48 hours',
   nombre:'Your full name',
   email:'Your email',
   organizacion:'Organization name',
   mensaje:'What interests you? How can we collaborate?',
   enviar:'Send →',
   enviando:'Sending...',
   enviado_titulo:'Thank you! We\'ll be in touch soon.',
   enviado_sub:'We\'ll review your inquiry and write back within 48 hours.',
   por_que_titulo:'Why partner with OLIVIA?',
   estado:'Partnerships in development · Q3 2026',
 }
}

const SEGMENTOS = [
 {
   icon:'🏢',
   titulo_es:'Consorcio / Edificio',
   titulo_en:'Building / Condo',
   desc_es:'Reducís costos de recolección, generás créditos de carbono y ofrecés un beneficio real a tus vecinos.',
   desc_en:'Reduce collection costs, generate carbon credits and offer a real benefit to your residents.',
   beneficio_es:'SaaS mensual + créditos carbono',
   beneficio_en:'Monthly SaaS + carbon credits',
   color:'#22c55e',
 },
 {
   icon:'🌿',
   titulo_es:'Cooperativa de reciclaje',
   titulo_en:'Recycling cooperative',
   desc_es:'Recibís alertas de residuos disponibles en tu zona por tipo de material. Confirmás la entrega y ganás el 15% de los créditos verificados.',
   desc_en:'Receive waste alerts in your area by material type. Confirm delivery and earn 15% of verified credits.',
   beneficio_es:'15% de los créditos verificados',
   beneficio_en:'15% of verified credits',
   color:'#22c55e',
 },
 {
   icon:'🏥',
   titulo_es:'Salud y bienestar',
   titulo_en:'Health & wellness',
   desc_es:'Aceptás OLV como pago por tus servicios. Los OLV que acumulás son una cuenta por cobrar que se convierte en dinero real en Fase 3.',
   desc_en:'Accept OLV as payment for your services. Accumulated OLV are a receivable that becomes real money in Phase 3.',
   beneficio_es:'OLV como inversión diferida',
   beneficio_en:'OLV as deferred investment',
   color:'#3b82f6',
 },
 {
   icon:'🚗',
   titulo_es:'Transporte y movilidad',
   titulo_en:'Transport & mobility',
   desc_es:'Cabify, SUBE, millas aéreas — tus clientes pagan con OLV. Vos acumulás los tokens y los convertís en dinero cuando OLIVIA certifique.',
   desc_en:'Your customers pay with OLV. You accumulate the tokens and convert them to money when OLIVIA certifies.',
   beneficio_es:'OLV como inversión diferida',
   beneficio_en:'OLV as deferred investment',
   color:'#3b82f6',
 },
 {
   icon:'📱',
   titulo_es:'Apps y plataformas digitales',
   titulo_en:'Apps & digital platforms',
   desc_es:'Spotify, Canva, Platzi — créditos de suscripción a cambio de OLV. Los usuarios de OLIVIA son early adopters exactamente en tu perfil.',
   desc_en:'Subscription credits in exchange for OLV. OLIVIA users are early adopters exactly in your profile.',
   beneficio_es:'Nuevos usuarios + OLV como inversión',
   beneficio_en:'New users + OLV as investment',
   color:'#a855f7',
 },
 {
   icon:'🤖',
   titulo_es:'Aplicaciones de IA',
   titulo_en:'AI applications',
   desc_es:'Claude, Gemini, Runway, Leonardo — créditos de IA a cambio de OLV. Alineás tu misión de sostenibilidad y atraés nuevos usuarios.',
   desc_en:'AI credits in exchange for OLV. Align your sustainability mission and attract new users.',
   beneficio_es:'Misión + nuevos usuarios + OLV',
   beneficio_en:'Mission + new users + OLV',
   color:'#a855f7',
 },
 {
   icon:'✈️',
   titulo_es:'Aerolíneas y navieras',
   titulo_en:'Airlines & shipping',
   desc_es:'Comprás OLV para compensar tus emisiones. Son los activos más trazables del mercado — sabés exactamente quién recicló qué, cuándo y dónde.',
   desc_en:'Buy OLV to offset your emissions. They are the most traceable assets in the market — you know exactly who recycled what, when and where.',
   beneficio_es:'Compensación ESG verificada',
   beneficio_en:'Verified ESG offsetting',
   color:'#f59e0b',
 },
 {
   icon:'🏬',
   titulo_es:'Empresa con compromisos ESG',
   titulo_en:'ESG-committed company',
   desc_es:'Compensás tu huella operativa, generás reportes CSRD verificables y obtenés el badge OLIVIA para tu comunicación corporativa.',
   desc_en:'Offset your operational footprint, generate verifiable CSRD reports and get the OLIVIA badge for your corporate communication.',
   beneficio_es:'Reporte ESG verificado + badge',
   beneficio_en:'Verified ESG report + badge',
   color:'#f59e0b',
 },
 {
   icon:'🏛️',
   titulo_es:'Municipio e institución pública',
   titulo_en:'Municipality & public institution',
   desc_es:'Infraestructura de datos ambientales para políticas públicas. Datos verificados de reciclaje ciudadano por barrio, material y período.',
   desc_en:'Environmental data infrastructure for public policy. Verified citizen recycling data by neighborhood, material and period.',
   beneficio_es:'Datos ambientales verificados',
   beneficio_en:'Verified environmental data',
   color:'#ec4899',
 },
]

const POR_QUE = [
 {icon:'📊',es:'Los OLV que recibís hoy son un registro verificado de impacto: kilos desviados del relleno y metano evitado. No tienen valor monetario hoy. Si el proyecto completa la certificación bajo estándar Verra, un proceso de entre dos y tres años, esos registros pasan a tener valor en el mercado voluntario.',en:'The OLV you receive today are a verified impact record: kilos diverted and methane avoided. They have no monetary value today. If the project completes Verra certification, a two to three year process, those records gain value in the voluntary market.'},
 {icon:'📈',es:'Las empresas que entran antes acumulan más OLV cuando valen poco. Cuando valen más — cobran más que lo que les costó el servicio.',en:'Companies that join early accumulate more OLV when they\'re cheap. When they\'re worth more — they earn more than the service cost them.'},
 {icon:'🌿',es:'Badge "Partner OLIVIA Circulab" verificado. Diferenciación de marca con impacto ambiental real y medible.',en:'Verified "OLIVIA Circulab Partner" badge. Brand differentiation with real and measurable environmental impact.'},
 {icon:'👥',es:'Acceso a la comunidad OLIVIA — usuarios comprometidos con el medio ambiente, early adopters de tecnología.',en:'Access to the OLIVIA community — environmentally committed users, technology early adopters.'},
]

export default function Alianzas() {
 const [lang, setLang] = useState<'es'|'en'>('es')
 const [dark, setDark] = useState(true)
 const [segmento, setSegmento] = useState('')
 const [nombre, setNombre] = useState('')
 const [email, setEmail] = useState('')
 const [organizacion, setOrganizacion] = useState('')
 const [mensaje, setMensaje] = useState('')
 const [enviando, setEnviando] = useState(false)
 const [enviado, setEnviado] = useState(false)

 const t = T[lang]
 const bg = dark?'#0a0e1a':'#f0f4f8'
 const text = dark?'#f1f5f9':'#0a0e1a'
 const card = dark?'#111827':'#ffffff'
 const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
 const sub = dark?'#94a3b8':'#475569'

 async function enviar() {
   if(!nombre||!email) return
   setEnviando(true)
   await supabase.from('alianzas_leads').insert({
     nombre, email, organizacion,
     tipo: segmento,
     mensaje,
     status: 'nuevo'
   })
   setEnviado(true)
   setEnviando(false)
 }

 return (
   <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.2s'}}>

     {/* Nav */}
     <nav style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}}>
       <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
         <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
         <div>
           <div style={{fontSize:13,fontWeight:800,color:text}}>OLIVIA Circulab</div>
           <div style={{fontSize:9,color:'#a855f7',textTransform:'uppercase'}}>Alianzas</div>
         </div>
       </a>
       <div style={{display:'flex',gap:6,alignItems:'center'}}>
         <button onClick={()=>setLang(lang==='es'?'en':'es')}
           style={{background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:6,padding:'4px 10px',color:'#a855f7',fontSize:11,fontWeight:700,cursor:'pointer'}}>
           {lang==='es'?'EN':'ES'}
         </button>
         <button onClick={()=>setDark(!dark)}
           style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
           {dark?'☀️':'🌙'}
         </button>
         <a href="/" style={{fontSize:11,color:sub,textDecoration:'none'}}>← {lang==='es'?'Inicio':'Home'}</a>
       </div>
     </nav>

     <div style={{maxWidth:580,margin:'0 auto',padding:'32px 20px 60px'}}>

       {/* Hero */}
       <div style={{textAlign:'center',marginBottom:32}}>
         <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:20,padding:'5px 14px',fontSize:10,color:'#a855f7',fontWeight:700,marginBottom:16}}>
           {t.badge}
         </div>
         <div style={{fontSize:26,fontWeight:900,color:text,marginBottom:12,lineHeight:1.2}}>{t.titulo}</div>
         <div style={{fontSize:13,color:sub,lineHeight:1.7}}>{t.subtitulo}</div>
       </div>

       {/* Nota honesta */}
       <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:12,padding:'12px',marginBottom:24,textAlign:'center'}}>
         <div style={{fontSize:11,color:'#f59e0b',fontWeight:600}}>{t.estado}</div>
       </div>

       {/* Por qué */}
       <div style={{background:card,border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px',marginBottom:24}}>
         <div style={{fontSize:13,fontWeight:700,color:'#a855f7',marginBottom:12}}>{t.por_que_titulo}</div>
         <div style={{display:'flex',flexDirection:'column',gap:10}}>
           {POR_QUE.map((p,i)=>(
             <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
               <span style={{fontSize:20,flexShrink:0}}>{p.icon}</span>
               <div style={{fontSize:12,color:sub,lineHeight:1.6}}>{lang==='es'?p.es:p.en}</div>
             </div>
           ))}
         </div>
       </div>

       {/* Segmentos */}
       <div style={{fontSize:14,fontWeight:700,color:text,marginBottom:12}}>{t.segmentos_titulo}</div>
       <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
         {SEGMENTOS.map((s,i)=>(
           <button key={i} onClick={()=>setSegmento(lang==='es'?s.titulo_es:s.titulo_en)}
             style={{background:segmento===(lang==='es'?s.titulo_es:s.titulo_en)?`${s.color}15`:card,border:`1px solid ${segmento===(lang==='es'?s.titulo_es:s.titulo_en)?s.color:border}`,borderRadius:12,padding:'14px',cursor:'pointer',textAlign:'left',transition:'all 0.15s'}}>
             <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
               <span style={{fontSize:22,flexShrink:0}}>{s.icon}</span>
               <div style={{flex:1}}>
                 <div style={{fontSize:13,fontWeight:700,color:segmento===(lang==='es'?s.titulo_es:s.titulo_en)?s.color:text,marginBottom:2}}>
                   {lang==='es'?s.titulo_es:s.titulo_en}
                 </div>
                 <div style={{fontSize:11,color:sub,lineHeight:1.5,marginBottom:4}}>
                   {lang==='es'?s.desc_es:s.desc_en}
                 </div>
                 <div style={{fontSize:10,color:s.color,fontWeight:600}}>
                   {lang==='es'?s.beneficio_es:s.beneficio_en}
                 </div>
               </div>
               {segmento===(lang==='es'?s.titulo_es:s.titulo_en)&&(
                 <span style={{color:s.color,fontSize:16,flexShrink:0}}>✓</span>
               )}
             </div>
           </button>
         ))}
       </div>

       {/* Formulario */}
       <div style={{background:card,border:'1px solid rgba(168,85,247,0.2)',borderRadius:16,padding:'20px'}}>
         <div style={{fontSize:14,fontWeight:700,color:'#a855f7',marginBottom:4}}>{t.form_titulo}</div>
         <div style={{fontSize:11,color:sub,marginBottom:16}}>{t.form_sub}</div>

         {!enviado?(
           <div>
             {[
               {v:nombre,fn:setNombre,ph:t.nombre,type:'text'},
               {v:email,fn:setEmail,ph:t.email,type:'email'},
               {v:organizacion,fn:setOrganizacion,ph:t.organizacion,type:'text'},
             ].map((f,i)=>(
               <input key={i} type={f.type} value={f.v} onChange={e=>f.fn(e.target.value)} placeholder={f.ph}
                 style={{width:'100%',padding:'10px 14px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
             ))}
             <textarea value={mensaje} onChange={e=>setMensaje(e.target.value)} placeholder={t.mensaje} rows={4}
               style={{width:'100%',padding:'10px 14px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:13,outline:'none',fontFamily:'inherit',resize:'none',boxSizing:'border-box',marginBottom:12}} />
             {segmento&&(
               <div style={{padding:'8px 12px',borderRadius:8,background:'rgba(168,85,247,0.08)',border:'1px solid rgba(168,85,247,0.2)',marginBottom:12}}>
                 <div style={{fontSize:11,color:'#a855f7'}}>{lang==='es'?'Categoría seleccionada:':'Selected category:'} <strong>{segmento}</strong></div>
               </div>
             )}
             <button onClick={enviar} disabled={enviando||!nombre||!email}
               style={{width:'100%',background:nombre&&email?'linear-gradient(135deg,#a855f7,#7c3aed)':'rgba(255,255,255,0.04)',border:'none',borderRadius:10,padding:'13px',color:nombre&&email?'white':sub,fontSize:14,fontWeight:700,cursor:'pointer'}}>
               {enviando?t.enviando:t.enviar}
             </button>
           </div>
         ):(
           <div style={{textAlign:'center',padding:'24px 0'}}>
             <div style={{fontSize:40,marginBottom:12}}>✅</div>
             <div style={{fontSize:16,fontWeight:700,color:'#a855f7',marginBottom:8}}>{t.enviado_titulo}</div>
             <div style={{fontSize:12,color:sub,lineHeight:1.6,marginBottom:20}}>{t.enviado_sub}</div>
             <a href="/" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'10px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
               {lang==='es'?'Volver al inicio →':'Back to home →'}
             </a>
           </div>
         )}
       </div>

       {/* CTA directo */}
       <div style={{marginTop:16,textAlign:'center'}}>
         <div style={{fontSize:12,color:sub,marginBottom:6}}>{lang==='es'?'O escribinos directo:':'Or write to us directly:'}</div>
         <a href="mailto:hola@oliviacirculab.com.ar?subject=Quiero ser partner de OLIVIA Circulab"
           style={{fontSize:13,color:'#a855f7',fontWeight:700,textDecoration:'none'}}>
           hola@oliviacirculab.com.ar
         </a>
       </div>

     </div>
   </div>
 )
}
