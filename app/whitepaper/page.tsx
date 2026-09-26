'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const SECCIONES_ES = [
'📋 Resumen ejecutivo','🔴 El problema','🌿 La solución OLIVIA','🔬 Arquitectura dMRV',
'📜 Metodologías y certificación','🪙 Tokenómica OLV','👥 Los 8 segmentos',
'💰 Las 5 fuentes de valor','🌍 Los 7 mercados','🤝 Modelo de convenios',
'🔄 Incentivos cruzados','🚛 Recolección coordinada con IA','🌱 Hoja de ruta',
'🌱 Familia OLIVIA','👨‍💻 Equipo y tecnología','📈 El pedido',
'⚠️ Riesgos y mitigación','🏛️ Marco legal','📊 Proyecciones financieras',
]

const SECCIONES_EN = [
'📋 Executive Summary','🔴 The Problem','🌿 OLIVIA Solution','🔬 dMRV Architecture',
'📜 Methodologies & Certification','🪙 OLV Tokenomics','👥 8 Customer Segments',
'💰 5 Value Sources','🌍 7 Token Markets','🤝 Partnership Model',
'🔄 Cross Incentives','🚛 AI-Coordinated Collection','🌱 Roadmap',
'🌱 OLIVIA Family','👨‍💻 Team & Technology','📈 The Ask',
'⚠️ Risks & Mitigation','🏛️ Legal Framework','📊 Financial Projections',
]

export default function Whitepaper() {
const [lang, setLang] = useState<'es'|'en'>('es')
const [dark, setDark] = useState(true)
const [seccion, setSeccion] = useState(0)
const [escenario, setEscenario] = useState<'base'|'cons'>('base')
const [ndaFirmado, setNdaFirmado] = useState(false)
const [ndaNombre, setNdaNombre] = useState('')
const [ndaEmail, setNdaEmail] = useState('')
const [ndaEmpresa, setNdaEmpresa] = useState('')
const [ndaAcepto, setNdaAcepto] = useState(false)
const [ndaEnviando, setNdaEnviando] = useState(false)
const [ndaError, setNdaError] = useState('')

const bg = dark?'#0a0e1a':'#f0f4f8'
const text = dark?'#f1f5f9':'#0a0e1a'
const card = dark?'#111827':'#ffffff'
const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
const sub = dark?'#94a3b8':'#475569'

const s = {
p: {fontSize:13,color:sub,lineHeight:1.7} as any,
titulo: {fontSize:18,fontWeight:900,color:text,marginBottom:12} as any,
card: {background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px',marginBottom:12} as any,
highlight: {background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'12px',marginBottom:12} as any,
verde: {fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:4} as any,
rojo: {fontSize:12,fontWeight:700,color:'#ef4444',marginBottom:4} as any,
azul: {fontSize:12,fontWeight:700,color:'#3b82f6',marginBottom:4} as any,
}

async function firmarNDA() {
if(!ndaNombre||!ndaEmail){setNdaError(lang==='es'?'Nombre y email requeridos':'Name and email required');return}
if(!ndaAcepto){setNdaError(lang==='es'?'Debés aceptar el NDA':'You must accept the NDA');return}
setNdaEnviando(true)
await supabase.from('nda_firmas').insert({nombre:ndaNombre,email:ndaEmail,empresa:ndaEmpresa})
setNdaFirmado(true)
setNdaEnviando(false)
}

const SECCIONES = lang==='es'?SECCIONES_ES:SECCIONES_EN
// Versión corta y técnica para Climatech: solo estas secciones se muestran
const VISIBLES = [0,1,2,3,4,12,14,15,18,16]
const pos = Math.max(0,VISIBLES.indexOf(seccion))

if(!ndaFirmado) return (
<div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
<div style={{width:'100%',maxWidth:420}}>
<div style={{textAlign:'center',marginBottom:24}}>
<div style={{width:56,height:56,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:'white',margin:'0 auto 12px'}}>O</div>
<div style={{fontSize:20,fontWeight:900,color:text,marginBottom:4}}>{lang==='es'?'Whitepaper Técnico':'Technical Whitepaper'}</div>
<div style={{fontSize:12,color:sub,marginBottom:4}}>OLIVIA Circulab · {lang==='es'?'Septiembre':'September'} 2026</div>
<div style={{fontSize:11,color:sub}}>{lang==='es'?'Documento confidencial · Firmá el NDA para acceder':'Confidential document · Sign NDA to access'}</div>
</div>
<div style={{background:card,border:`1px solid ${border}`,borderRadius:16,padding:24}}>
<div style={{display:'flex',gap:8,justifyContent:'flex-end',marginBottom:16}}>
<button onClick={()=>setLang(lang==='es'?'en':'es')} style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>{lang==='es'?'EN':'ES'}</button>
<button onClick={()=>setDark(!dark)} style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>{dark?'☀️':'🌙'}</button>
</div>
{[
{v:ndaNombre,fn:setNdaNombre,ph:lang==='es'?'Tu nombre completo':'Your full name',type:'text'},
{v:ndaEmail,fn:setNdaEmail,ph:'Email',type:'email'},
{v:ndaEmpresa,fn:setNdaEmpresa,ph:lang==='es'?'Empresa u organización (opcional)':'Company or organization (optional)',type:'text'},
].map((f,i)=>(
<input key={i} type={f.type} value={f.v} onChange={e=>f.fn(e.target.value)} placeholder={f.ph}
style={{width:'100%',padding:'10px 14px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
))}
<div style={{display:'flex',gap:8,alignItems:'flex-start',marginBottom:12,padding:'10px',background:'rgba(34,197,94,0.04)',borderRadius:8,border:'1px solid rgba(34,197,94,0.15)'}}>
<input type="checkbox" checked={ndaAcepto} onChange={e=>setNdaAcepto(e.target.checked)} style={{marginTop:2,flexShrink:0,accentColor:'#22c55e'}} />
<div style={{fontSize:11,color:sub,lineHeight:1.5}}>{lang==='es'?'Acepto no compartir este documento sin autorización expresa de Circulab Tech. Entiendo que contiene información confidencial de la ronda Seed 2026.':'I agree not to share this document without express authorization from Circulab Tech. I understand it contains confidential Seed Round 2026 information.'}</div>
</div>
{ndaError&&<div style={{fontSize:12,color:'#ef4444',marginBottom:8}}>{ndaError}</div>}
<button onClick={firmarNDA} disabled={ndaEnviando}
style={{width:'100%',background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'12px',color:'white',fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:12}}>
{ndaEnviando?(lang==='es'?'Firmando...':'Signing...'):(lang==='es'?'Firmar NDA y acceder →':'Sign NDA and access →')}
</button>
<div style={{textAlign:'center'}}><a href="/" style={{fontSize:11,color:sub,textDecoration:'none'}}>{lang==='es'?'← Volver al inicio':'← Back to home'}</a></div>
</div>
</div>
</div>
)

const contenido = () => {

// NAV con logo agregado
const NavWhitepaper = () => (
  <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:'rgba(10,14,26,0.95)',borderBottom:'1px solid rgba(255,255,255,0.07)',padding:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
      <img src="/logoOC.png" alt="OLIVIA" style={{width:28,height:28,objectFit:'contain',borderRadius:6}} />
      <span style={{fontSize:11,fontWeight:700,color:'#f1f5f9',textTransform:'uppercase',letterSpacing:'0.05em'}}>OLIVIA Circulab</span>
    </a>
    <a href="/" style={{fontSize:10,color:'#64748b',textDecoration:'none'}}>← Volver al inicio</a>
  </nav>
)

if(seccion===0) return (
<div>
<div style={s.titulo}>{lang==='es'?'Resumen ejecutivo':'Executive Summary'}</div>
<div style={s.highlight}>
<div style={s.verde}>{lang==='es'?'OLIVIA Circulab en una oración':'OLIVIA Circulab in one sentence'}</div>
<div style={s.p}>{lang==='es'?'OLIVIA es la infraestructura de medición y verificación (dMRV) para las plantas y acopiadores de residuos que ya existen: balanza conectada, registro digital, firma del acopiador y confirmación del tratamiento. El vecino es una capa posterior que agrega trazabilidad de origen.':'OLIVIA is the measurement and verification (dMRV) infrastructure for the waste plants and collectors that already exist: connected scale, digital record, collector sign-off and treatment confirmation. The neighbor is a later layer that adds origin traceability.'}</div>
</div>
{(lang==='es'?[
{t:'El problema',d:'Las plantas y cooperativas de Buenos Aires tienen capacidad ociosa y, al mismo tiempo, los orgánicos siguen terminando en el relleno, donde generan metano. Falta el dato verificable que demuestre, kilo a kilo, qué se desvió y qué se trató.',c:'#ef4444'},
{t:'La solución',d:'Balanza conectada en la planta, remito digital firmado por un acopiador habilitado y confirmación del tratamiento. La foto con GPS del generador o del vecino funciona como capa de origen.',c:'#22c55e'},
{t:'El producto hoy',d:'App web en producción en oliviacirculab.com.ar. Registro con foto + GPS + IA (Cloudflare Workers AI). Panel dMRV con validación manual. Kilos verificados del piloto en vivo. Construido sin inversión externa.',c:'#3b82f6'},
{t:'Metodologías',d:'Orgánicos: Verra AMS-III.F. RAEE: AMS-III.BA + VMR0008. OLIVIA se diseña para cumplir los requisitos de Verra; hoy no emite créditos de carbono ni promete ingresos.',c:'#a855f7'},
{t:'El pedido',d:'USD 200.000 por el 10% (USD 1,8M pre-money), en tres tramos contra hitos (50K / 70K / 80K, a confirmar con cotizaciones), destinados íntegramente a llegar a la certificación. Para un socio activo.',c:'#f59e0b'},
{t:'Economía del Conocimiento',d:'La sociedad se inscribirá en el régimen de Economía del Conocimiento: reducción de Ganancias de hasta 60% para micro y pequeñas empresas y bono de hasta 70% de contribuciones patronales, con el requisito de facturar al menos 70% en actividades promovidas.',c:'#22c55e'},
]:[
{t:'The Problem',d:'Buenos Aires plants and cooperatives have idle capacity while organics still end up in landfill, where they generate methane. The missing piece is verifiable data proving, kilo by kilo, what was diverted and treated.',c:'#ef4444'},
{t:'The Solution',d:'Connected scale at the plant, digital receipt signed by a licensed collector and treatment confirmation. The GPS photo from the generator or neighbor works as an origin layer.',c:'#22c55e'},
{t:'The Product Today',d:'Web app in production at oliviacirculab.com.ar. Registration with photo + GPS + AI (Cloudflare Workers AI). dMRV dashboard with manual validation. Live verified kilos from the pilot. Built without external investment.',c:'#3b82f6'},
{t:'Methodologies',d:'Organics: Verra AMS-III.F. E-waste: AMS-III.BA + VMR0008. OLIVIA is designed to meet Verra requirements; today it issues no carbon credits and promises no income.',c:'#a855f7'},
{t:'The Ask',d:'USD 200,000 for 10% (USD 1.8M pre-money), in three milestone-based tranches (50K / 70K / 80K, to be confirmed with quotes), fully allocated to reaching certification. For an active partner.',c:'#f59e0b'},
{t:'Knowledge Economy',d:'The company will register under the Knowledge Economy regime: up to 60% income tax reduction for micro and small companies and a bonus of up to 70% of employer contributions, provided at least 70% of revenue comes from promoted activities.',c:'#22c55e'},
]).map(i=>(
<div key={i.t} style={{...s.card,borderLeft:`3px solid ${i.c}`}}>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

// Cita validacion externa inyectada en seccion 0
if(seccion===0) {
  // se maneja abajo
}


                if(seccion===1) return (
<div>
<div style={s.titulo}>{lang==='es'?'El problema':'The Problem'}</div>
{(lang==='es'?[
{t:'Capacidad ociosa',d:'Buenos Aires ya tiene plantas, cooperativas y acopiadores que tratan residuos. Muchas trabajan por debajo de su capacidad.',c:'#ef4444'},
{t:'Orgánicos al relleno',d:'Al mismo tiempo, los orgánicos siguen terminando en el relleno. Ahí se degradan sin oxígeno y generan metano, un gas de efecto invernadero mucho más potente que el CO2.',c:'#f59e0b'},
{t:'Falta el dato verificable',d:'Nadie puede demostrar, kilo a kilo, qué se desvió del relleno y qué se trató de verdad. Sin ese dato, el generador no puede respaldar su cumplimiento y la planta no puede demostrar su trabajo.',c:'#a855f7'},
{t:'Sin dato no hay certificación',d:'Las certificadoras como Verra necesitan datos trazables y auditables, con un límite de proyecto claro. Ningún proyecto se puede certificar sobre registros incompletos o autodeclarados.',c:'#3b82f6'},
]:[
{t:'Idle capacity',d:'Buenos Aires already has plants, cooperatives and collectors that treat waste. Many operate below capacity.',c:'#ef4444'},
{t:'Organics to landfill',d:'At the same time, organics still end up in landfill, where they decompose without oxygen and generate methane, a greenhouse gas far more potent than CO2.',c:'#f59e0b'},
{t:'The missing verifiable data',d:'Nobody can prove, kilo by kilo, what was diverted from landfill and actually treated. Without that data, generators cannot back their compliance and plants cannot prove their work.',c:'#a855f7'},
{t:'No data, no certification',d:'Certifiers like Verra need traceable, auditable data with a clear project boundary. No project can be certified on incomplete or self-declared records.',c:'#3b82f6'},
]).map(i=>(
<div key={i.t} style={{...s.card,borderLeft:`3px solid ${i.c}`}}>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

if(seccion===2) return (
<div>
<div style={s.titulo}>{lang==='es'?'La solución OLIVIA':'The OLIVIA Solution'}</div>
<div style={s.highlight}>
<div style={s.p}>{lang==='es'?'OLIVIA no compite con las plantas ni las compra: trabaja con quien ya procesa el material y le agrega la capa de datos que falta. Cada entrega queda registrada con origen, peso, firma y tratamiento.':'OLIVIA does not compete with plants or buy them: it works with those who already process the material and adds the missing data layer. Every delivery is recorded with origin, weight, sign-off and treatment.'}</div>
</div>
{(lang==='es'?[
{icon:'🚛',t:'1 · El generador entrega',d:'Gran generador, consorcio o punto verde entrega su fracción separada. La foto con GPS registra el origen.',c:'#22c55e'},
{icon:'⚖️',t:'2 · La balanza pesa y registra',d:'Balanza conectada en la planta: el peso de cada entrada se registra automáticamente, sin planillas.',c:'#3b82f6'},
{icon:'📝',t:'3 · El acopiador firma',d:'Un acopiador habilitado firma el remito digital. Si hace falta, OLIVIA tramita su propia inscripción como acopiador.',c:'#f59e0b'},
{icon:'🏭',t:'4 · La planta confirma el tratamiento',d:'Compost, biogás o recuperación de material. Sin esa confirmación no hay registro verificado.',c:'#a855f7'},
{icon:'🤖',t:'Verificación con IA',d:'Cloudflare Workers AI analiza las fotos (tipo de residuo, estimación de peso con moneda de referencia, calidad de separación) y recomienda VALIDAR / REVISAR / RECHAZAR. El admin valida manualmente.',c:'#22c55e'},
]:[
{icon:'🚛',t:'1 · The generator delivers',d:'Large generator, building or green point delivers its separated fraction. The GPS photo records the origin.',c:'#22c55e'},
{icon:'⚖️',t:'2 · The scale weighs and records',d:'Connected scale at the plant: the weight of every delivery is recorded automatically, with no spreadsheets.',c:'#3b82f6'},
{icon:'📝',t:'3 · The collector signs',d:'A licensed collector signs the digital receipt. If needed, OLIVIA applies for its own collector registration.',c:'#f59e0b'},
{icon:'🏭',t:'4 · The plant confirms treatment',d:'Compost, biogas or material recovery. Without that confirmation there is no verified record.',c:'#a855f7'},
{icon:'🤖',t:'AI verification',d:'Cloudflare Workers AI analyzes photos (waste type, weight estimate using a coin reference, separation quality) and recommends VALIDATE / REVIEW / REJECT. The admin validates manually.',c:'#22c55e'},
]).map(i=>(
<div key={i.t} style={{...s.card,display:'flex',gap:10,alignItems:'flex-start'}}>
<span style={{fontSize:22,flexShrink:0}}>{i.icon}</span>
<div>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
</div>
))}
</div>
)

if(seccion===3) return (
<div>
<div style={s.titulo}>{lang==='es'?'Arquitectura dMRV':'dMRV Architecture'}</div>
<div style={s.highlight}>
<div style={s.verde}>dMRV = digital Monitoring, Reporting and Verification</div>
<div style={s.p}>{lang==='es'?'El estándar que las certificadoras como Verra exigen para proyectos de carbono basados en comportamiento ciudadano. OLIVIA implementa un dMRV completo desde el día 1.':'The standard that certifiers like Verra require for carbon projects based on citizen behavior. OLIVIA implements a complete dMRV from day 1.'}</div>
</div>
{(lang==='es'?[
{t:'M — Monitoreo',d:'Cada registro incluye: tipo de material, peso estimado por IA, foto de origen, GPS de origen, fecha y hora, identidad verificada. Cloudflare Workers AI analiza en tiempo real con nivel de confianza alto/medio/bajo.',c:'#22c55e'},
{t:'R — Reporte',d:'Cada batch se agrupa por tipo de material y período. Los datos se consolidan en reportes exportables (CSV, PDF) que cumplen el formato requerido por Verra y Gold Standard.',c:'#3b82f6'},
{t:'V — Verificación',d:'La segunda foto con GPS confirma la disposición final. El admin valida manualmente. La IA recomienda VALIDAR/REVISAR/RECHAZAR. Solo los validados generan OLV acreditados.',c:'#f59e0b'},
{t:'Nodos de validación distribuidos — Fase 3',d:'En Fase 3 se incorporan validadores ciudadanos certificados — vecinos verificadores que confirman entregas en su zona a cambio de OLV adicionales. Esto descentraliza la validación, reduce la carga del admin central y genera una red de confianza territorial. Cada nodo valida máximo 50 registros/día para evitar colusión.',c:'#a855f7'},
{t:'Estructura de datos por registro',d:'tipo | metodologia | batch_id | olv_generados | verificado | gps_origen [lat,lng] | gps_entrega [lat,lng] | foto_origen url | foto_entrega url | peso_ia_kg | confianza_ia | validado_por admin_id | nodo_validador_id',c:'#22c55e'},
{t:'Por qué el dMRV urbano es poco común',d:'Los proyectos dMRV existentes son mayormente forestales o industriales. Hay muy pocas iniciativas de dMRV urbano en la región. OLIVIA lo hace posible con balanzas conectadas, teléfonos celulares e IA.',c:'#3b82f6'},
]:[
{t:'M — Monitoring',d:'Each registration includes: material type, AI-estimated weight, origin photo, origin GPS, date and time, verified identity. Cloudflare Workers AI analyzes in real time with high/medium/low confidence level.',c:'#22c55e'},
{t:'R — Reporting',d:'Each batch is grouped by material type and period. Data is consolidated into exportable reports (CSV, PDF) that meet the format required by Verra and Gold Standard.',c:'#3b82f6'},
{t:'V — Verification',d:'The second GPS photo confirms final disposal. Admin validates manually. AI recommends VALIDATE/REVIEW/REJECT. Only validated ones generate credited OLV.',c:'#f59e0b'},
{t:'Distributed validation nodes — Phase 3',d:'In Phase 3, certified citizen validators are incorporated — neighborhood verifiers who confirm deliveries in their area in exchange for additional OLV. This decentralizes validation, reduces central admin load and generates a territorial trust network. Each node validates maximum 50 records/day to prevent collusion.',c:'#a855f7'},
{t:'Data structure per registration',d:'type | methodology | batch_id | olv_generated | verified | gps_origin [lat,lng] | gps_delivery [lat,lng] | photo_origin url | photo_delivery url | ai_weight_kg | ai_confidence | validated_by admin_id | validator_node_id',c:'#22c55e'},
{t:'Why urban dMRV is uncommon',d:'Existing dMRV projects are mostly forestry or industrial. There are very few urban dMRV initiatives in the region. OLIVIA makes it possible with connected scales, mobile phones and AI.',c:'#3b82f6'},
]).map(i=>(
<div key={i.t} style={{...s.card,borderLeft:`3px solid ${i.c}`}}>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

if(seccion===4) return (
<div>
<div style={s.titulo}>{lang==='es'?'Metodologías y plan de certificación':'Methodologies and certification plan'}</div>
<div style={{...s.highlight,border:'1px solid rgba(245,158,11,0.2)',background:'rgba(245,158,11,0.06)'}}>
<div style={{fontSize:12,fontWeight:700,color:'#f59e0b',marginBottom:4}}>{lang==='es'?'Contexto':'Context'}</div>
<div style={s.p}>{lang==='es'?'En febrero de 2026 Verra aprobó su primer piloto de dMRV de alta frecuencia: el estándar se está moviendo hacia la medición digital. No es una validación de OLIVIA; OLIVIA se diseña para cumplir esos requisitos.':'In February 2026 Verra approved its first high-frequency dMRV pilot: the standard is moving toward digital measurement. This is not a validation of OLIVIA; OLIVIA is designed to meet those requirements.'}</div>
</div>
{[
{icon:'🌿',tipo:lang==='es'?'Orgánicos':'Organics',cert:'Verra AMS-III.F',mide:lang==='es'?'Peso de cada entrega y tratamiento (compost o biogás)':'Weight of each delivery and treatment (compost or biogas)',color:'#22c55e'},
{icon:'💻',tipo:'RAEE',cert:'AMS-III.BA + VMR0008',mide:lang==='es'?'Peso por material y destino final':'Weight per material and final destination',color:'#9333ea'},
].map(r=>(
<div key={r.tipo} style={{...s.card,borderLeft:`3px solid ${r.color}`}}>
<div style={{display:'flex',gap:8,alignItems:'center',marginBottom:6}}>
<span style={{fontSize:20}}>{r.icon}</span>
<div>
<div style={{fontSize:13,fontWeight:700,color:r.color}}>{r.tipo}</div>
<div style={{fontSize:10,color:sub}}>{r.cert}</div>
</div>
</div>
<div style={s.p}>{r.mide}</div>
</div>
))}
<div style={s.card}>
<div style={s.verde}>{lang==='es'?'Plan de certificación':'Certification plan'}</div>
{(lang==='es'?[
'Acuerdo con acopiador habilitado y primera balanza transmitiendo datos continuos',
'Contratación de un desarrollador de carbono, línea de base y documento de diseño del proyecto',
'Presentación del documento de diseño ante Verra',
'Validación por auditor acreditado de tercera parte y registro del proyecto',
]:[
'Agreement with a licensed collector and first scale transmitting continuous data',
'Hiring a carbon developer, baseline and project design document',
'Submission of the project design document to Verra',
'Validation by an accredited third-party auditor and project registration',
]).map((p,i)=>(
<div key={i} style={{display:'flex',gap:8,padding:'5px 0',borderBottom:`1px solid ${border}`}}>
<span style={{fontSize:11,color:'#22c55e',fontWeight:700}}>{i+1}</span>
<span style={{fontSize:12,color:sub}}>{p}</span>
</div>
))}
</div>
<div style={{...s.highlight,border:'1px solid rgba(239,68,68,0.2)',background:'rgba(239,68,68,0.04)'}}>
<div style={s.rojo}>{lang==='es'?'Pendiente de confirmar: adicionalidad':'To be confirmed: additionality'}</div>
<div style={s.p}>{lang==='es'?'Si la Ley 1.854 obliga a los grandes generadores a separar, su desvío podría no ser adicional. Lo estamos consultando con desarrolladores de carbono antes de definir el límite del proyecto.':'If Law 1854 requires large generators to separate, their diversion may not be additional. We are consulting carbon developers before defining the project boundary.'}</div>
</div>
</div>
)

if(seccion===5) return (
<div>
<div style={s.titulo}>{lang==='es'?'Tokenómica OLV':'OLV Tokenomics'}</div>
<div style={{...s.highlight,border:'1px solid rgba(34,197,94,0.2)',background:'rgba(34,197,94,0.06)',marginBottom:12}}>
<div style={s.verde}>{lang==='es'?'OLV Verde vs OLV Bonus':'Green OLV vs Bonus OLV'}</div>
<div style={s.p}>{lang==='es'?'🌿 OLV Verdes: generados únicamente por residuos verificados con IA + GPS. Estos certifica Verra. Estos paga el mercado de carbono en 2027. Valor: según kg × factor CO2eq × precio de mercado × % ciudadano. ⭐ OLV Bonus: por registrarse (100), referir amigos (50), publicar (10), like recibido (2), completar perfil (25). Canjeables por servicios en Brote. No se certifican con Verra.':'🌿 Green OLV: generated only by AI + GPS verified waste. Verra certifies these. The carbon market pays these in 2027. Value: based on kg × CO2eq factor × market price × citizen %. ⭐ Bonus OLV: for registering (100), referring friends (50), posting (10), receiving likes (2), completing profile (25). Redeemable for services in Brote. Not Verra certifiable.'}</div>
</div>
<div style={{...s.highlight,border:'1px solid rgba(168,85,247,0.2)',background:'rgba(168,85,247,0.06)',marginBottom:12}}>
<div style={{fontSize:11,fontWeight:700,color:'#a855f7',marginBottom:6}}>{lang==='es'?'¿Cuántos OLV = USD 1?':'How many OLV = USD 1?'}</div>
<div style={{display:'flex',flexDirection:'column',gap:4}}>
{[
{tramo:'🌱 Semilla 2026',olv:lang==='es'?'Sin valor · acumulás':'No value · accumulate',c:'#22c55e'},
{tramo:'🌿 Brote 2026',olv:lang==='es'?'Solo canje interno':'Internal exchange only',c:'#3b82f6'},
{tramo:'🌳 Árbol 2027',olv:'6.329 OLV = USD 1',c:'#f59e0b'},
{tramo:'🌲 Bosque 2028',olv:'2.198 OLV = USD 1',c:'#a855f7'},
{tramo:'🏔️ Selva 2029',olv:'1.429 OLV = USD 1',c:'#ec4899'},
{tramo:'🌊 Sumidero 2030+',olv:'952 OLV = USD 1',c:'#06b6d4'},
].map((t,i)=>(
<div key={i} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
<span style={{fontSize:11,color:t.c,fontWeight:700}}>{t.tramo}</span>
<span style={{fontSize:11,color:t.c}}>{t.olv}</span>
</div>
))}
</div>
</div>
<div style={s.highlight}>
<div style={s.verde}>OLV ≠ PULSO</div>
<div style={s.p}>{lang==='es'?'OLV (Olivia Coins) es el token económico — representa activos ambientales verificados. PULSO es el score de reputación crediticia — se construye con comportamiento. Son distintos y complementarios.':'OLV (Olivia Coins) is the economic token — represents verified environmental assets. PULSO is the credit reputation score — built with behavior. They are distinct and complementary.'}</div>
</div>
{(lang==='es'?[
{t:'Generación de OLV',d:'Fórmula: kg × factor CO2eq del material × 100 = OLV. Ejemplo: 1 kg de metal × 8.0 × 100 = 800 OLV. Se acreditan cuando el admin valida la foto de entrega — nunca la de origen.',c:'#22c55e'},
{t:'Las 3 capas de valor OLV',d:'Capa 1 — Utilidad (Semilla/Brote): historial ambiental verificado, canjeables por servicios de empresas partner. Capa 2 — Carbono (Árbol 2027): conversión a créditos Verra VCS voluntario, USD reales, sin requerir autorización estatal. Capa 3 — Financiero (Bosque 2028+): acceso al mercado regulado Art. 6.4 de la ONU, sujeto a adhesión de Argentina o expansión al corredor LATAM (Chile · Colombia · Perú). Tokenización Verra VCS posible desde Argentina con Toucan/Moss sin autorización estatal.',c:'#3b82f6'},
{t:'Distribución del crédito',d:'Distribución prevista si el proyecto se certifica: 50% OLIVIA Circulab · 25% vecino · 15% recolector · 10% planta.',c:'#f59e0b'},
{t:'Los que empiezan hoy',d:'Los OLV acumulados en Fase 1 mantienen su valor en Fase 3. Un usuario que acumula 50.000 OLV en 18 meses tiene un historial más valioso que quien empieza en Fase 3. El tiempo de participación es el activo más valioso.',c:'#a855f7'},
]:[
{t:'OLV generation',d:'Formula: kg × material CO2eq factor × 100 = OLV. Example: 1 kg metal × 8.0 × 100 = 800 OLV. Credited when admin validates delivery photo — never origin photo.',c:'#22c55e'},
{t:'3 OLV value layers',d:'Layer 1 — Utility (Semilla/Brote): verified environmental history, redeemable for partner services. Layer 2 — Carbon (Árbol 2027): conversion to Verra VCS voluntary credits, real USD, no state authorization required. Layer 3 — Financial (Bosque 2028+): access to UN regulated market Art. 6.4, subject to Argentina joining or LATAM corridor expansion (Chile · Colombia · Peru). Verra VCS tokenization possible from Argentina with Toucan/Moss without state authorization.',c:'#3b82f6'},
{t:'Credit distribution',d:'Planned distribution if the project is certified: 50% OLIVIA Circulab · 25% neighbor · 15% collector · 10% plant.',c:'#f59e0b'},
{t:'Those who start today',d:'OLV accumulated in Phase 1 maintain their value in Phase 3. A user who accumulates 50,000 OLV in 18 months has a more valuable history than someone starting in Phase 3.',c:'#a855f7'},
]).map(i=>(
<div key={i.t} style={{...s.card,borderLeft:`3px solid ${i.c}`}}>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

if(seccion===6) return (
<div>
<div style={s.titulo}>{lang==='es'?'Los 8 segmentos de clientes':'8 Customer Segments'}</div>
<div style={{display:'flex',flexDirection:'column',gap:8}}>
{(lang==='es'?[
{num:'01',tipo:'Ciudadano libre',fee:'20% de sus OLV',desc:'El vecino individual que separa desde su casa.',c:'#22c55e'},
{num:'02',tipo:'Verdulería / Feria',fee:'50% de sus OLV',desc:'Alto volumen de orgánico diariamente.',c:'#22c55e'},
{num:'03',tipo:'Colegio / Institución',fee:'30% de sus OLV',desc:'Programas educativos. Impacto en 200-500 familias.',c:'#3b82f6'},
{num:'04',tipo:'Consorcio',fee:'SaaS mensual',desc:'50-300 departamentos. Mayor impacto inmediato.',c:'#3b82f6'},
{num:'05',tipo:'Restaurante / Hotel',fee:'SaaS mensual',desc:'Alto volumen de orgánico y aceite. RSE creciente.',c:'#f59e0b'},
{num:'06',tipo:'Casino / Comedor',fee:'SaaS mensual',desc:'Mayor volumen por punto. Toneladas por día.',c:'#f59e0b'},
{num:'07',tipo:'Empresa RSE',fee:'Por proyecto',desc:'Compensación de huella. Reportes ESG y CSRD.',c:'#a855f7'},
{num:'08',tipo:'Municipio',fee:'Por contrato',desc:'Infraestructura de datos para políticas públicas.',c:'#a855f7'},
]:[
{num:'01',tipo:'Free citizen',fee:'20% of their OLV',desc:'The individual neighbor sorting at home.',c:'#22c55e'},
{num:'02',tipo:'Greengrocer / Market',fee:'50% of their OLV',desc:'High daily organic volume.',c:'#22c55e'},
{num:'03',tipo:'School / Institution',fee:'30% of their OLV',desc:'Educational programs. Impact on 200-500 families.',c:'#3b82f6'},
{num:'04',tipo:'Building / Condo',fee:'Monthly SaaS',desc:'50-300 apartments. Highest immediate impact.',c:'#3b82f6'},
{num:'05',tipo:'Restaurant / Hotel',fee:'Monthly SaaS',desc:'High organic and oil volume. Growing ESG.',c:'#f59e0b'},
{num:'06',tipo:'Casino / Canteen',fee:'Monthly SaaS',desc:'Highest volume per point. Tons per day.',c:'#f59e0b'},
{num:'07',tipo:'CSR Company',fee:'Per project',desc:'Footprint offsetting. ESG and CSRD reporting.',c:'#a855f7'},
{num:'08',tipo:'Municipality',fee:'Per contract',desc:'Data infrastructure for public policy.',c:'#a855f7'},
]).map(c=>(
<div key={c.num} style={{...s.card,borderLeft:`3px solid ${c.c}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
<div style={{display:'flex',gap:8,alignItems:'center'}}>
<div style={{width:24,height:24,borderRadius:6,background:c.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white'}}>{c.num}</div>
<div>
<div style={{fontSize:12,fontWeight:700,color:c.c}}>{c.tipo}</div>
<div style={{fontSize:10,color:sub}}>{c.desc}</div>
</div>
</div>
<div style={{fontSize:11,fontWeight:700,color:c.c}}>{c.fee}</div>
</div>
))}
</div>
</div>
)

if(seccion===7) return (
<div>
<div style={s.titulo}>{lang==='es'?'Las 5 fuentes de valor':'5 Value Sources'}</div>
<div style={{fontSize:11,color:sub,marginBottom:16}}>{lang==='es'?'Valores aproximados para un consorcio de 100 departamentos con 60% de participación':'Approximate values for a 100-unit building with 60% participation'}</div>
{(lang==='es'?[
{num:'01',l:'Créditos de carbono',v:'USD 85/mes',desc:'Verra VCS + Gold Standard según material. 25% para vecinos. Se activa en Fase 3.',c:'#22c55e'},
{num:'02',l:'Ahorro en recolección',v:'USD 800/mes',desc:'Reducción del volumen de residuos indiferenciados. Estimado USD 8/depto/mes.',c:'#3b82f6'},
{num:'03',l:'Venta de materiales',v:'USD 120/mes',desc:'Plástico, metal, textil y papel tienen valor de mercado inmediato.',c:'#f59e0b'},
{num:'04',l:'Abono comercializable',v:'USD 45/mes',desc:'El orgánico compostado genera fertilizante. Precio referencia: USD 1.200/ton.',c:'#f97316'},
{num:'05',l:'Certificación RSE / ESG',v:'USD 75/mes',desc:'Badge Edificio Verde OLIVIA verificado. Diferencial inmobiliario 3-8%.',c:'#ec4899'},
]:[
{num:'01',l:'Carbon credits',v:'USD 85/mo',desc:'Verra VCS + Gold Standard by material. 25% to neighbors. Activated in Phase 3.',c:'#22c55e'},
{num:'02',l:'Collection savings',v:'USD 800/mo',desc:'Reduction in mixed waste volume. Estimated USD 8/unit/month.',c:'#3b82f6'},
{num:'03',l:'Material sales',v:'USD 120/mo',desc:'Plastic, metal, textile and paper have immediate market value.',c:'#f59e0b'},
{num:'04',l:'Marketable compost',v:'USD 45/mo',desc:'Composted organic generates fertilizer. Reference price: USD 1,200/ton.',c:'#f97316'},
{num:'05',l:'CSR / ESG certification',v:'USD 75/mo',desc:'Verified OLIVIA Green Building badge. 3-8% real estate premium.',c:'#ec4899'},
]).map(f=>(
<div key={f.num} style={{...s.card,borderLeft:`3px solid ${f.c}`,display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10}}>
<div style={{display:'flex',gap:8,alignItems:'center',flex:1}}>
<div style={{width:26,height:26,borderRadius:8,background:f.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'white',flexShrink:0}}>{f.num}</div>
<div>
<div style={{fontSize:12,fontWeight:700,color:f.c}}>{f.l}</div>
<div style={{fontSize:10,color:sub}}>{f.desc}</div>
</div>
</div>
<div style={{fontSize:13,fontWeight:800,color:f.c,flexShrink:0}}>{f.v}</div>
</div>
))}
<div style={{...s.highlight,textAlign:'center',marginTop:8}}>
<div style={{fontSize:11,color:sub,marginBottom:4}}>{lang==='es'?'Total estimado · Estimación orientativa':'Estimated total · Indicative estimate'}</div>
<div style={{fontSize:28,fontWeight:900,color:'#22c55e'}}>USD 1.125/{lang==='es'?'mes':'mo'}</div>
</div>
</div>
)

if(seccion===8) return (
<div>
<div style={s.titulo}>{lang==='es'?'Los 7 mercados de tokens OLV':'7 OLV Token Markets'}</div>
<div style={s.highlight}>
<div style={s.p}>{lang==='es'?'OLIVIA diversifica en 7 mercados distintos para mitigar el riesgo del precio del carbono. Si un mercado baja, los otros pueden compensar.':'OLIVIA diversifies across 7 different markets to mitigate carbon price risk. If one market falls, others can compensate.'}</div>
</div>
{(lang==='es'?[
{num:'01',t:'Verra Registry',d:'El registro más grande del mundo. USD 10-30/t. Alta liquidez. Primera certificación OLIVIA.',c:'#22c55e'},
{num:'02',t:'Gold Standard',d:'Segundo estándar más importante. USD 15-40/t. Premium por co-beneficios sociales.',c:'#3b82f6'},
{num:'03',t:'Art. 6.4 UNFCCC',d:'Mercado regulado del Acuerdo de París. USD 50-120/t. Demanda garantizada por ley. El más resistente a la baja.',c:'#f59e0b'},
{num:'04',t:'Toucan Protocol',d:'Tokeniza créditos en blockchain. Intercambiables por ETH/USDC. Liquidez 24/7. Fase 4.',c:'#a855f7'},
{num:'05',t:'Moss.earth',d:'Plataforma LATAM de carbono. Ya operativa en Brasil y Colombia. Socio comercializador natural.',c:'#22c55e'},
{num:'06',t:'KlimaDAO',d:'DAO que retira créditos para subir el precio. Paga premium. Alineado con la misión.',c:'#ef4444'},
{num:'07',t:'C3.app',d:'Marketplace on-chain con foco en trazabilidad. USD 5-15 extra vs genéricos por origen verificado.',c:'#f97316'},
]:[
{num:'01',t:'Verra Registry',d:'The world\'s largest registry. USD 10-30/t. High liquidity. OLIVIA\'s first certification.',c:'#22c55e'},
{num:'02',t:'Gold Standard',d:'Second most important standard. USD 15-40/t. Premium for social co-benefits.',c:'#3b82f6'},
{num:'03',t:'Art. 6.4 UNFCCC',d:'Paris Agreement regulated market. USD 50-120/t. Legally guaranteed demand. Most resilient to price drops.',c:'#f59e0b'},
{num:'04',t:'Toucan Protocol',d:'Tokenizes credits on blockchain. Tradeable for ETH/USDC. 24/7 liquidity. Phase 4.',c:'#a855f7'},
{num:'05',t:'Moss.earth',d:'LATAM carbon platform. Already active in Brazil and Colombia. Natural commercial partner.',c:'#22c55e'},
{num:'06',t:'KlimaDAO',d:'DAO that retires credits to raise prices. Pays premium. Mission-aligned.',c:'#ef4444'},
{num:'07',t:'C3.app',d:'On-chain marketplace focused on traceability. USD 5-15 extra vs generics for verified origin.',c:'#f97316'},
]).map(m=>(
<div key={m.num} style={{...s.card,borderLeft:`3px solid ${m.c}`}}>
<div style={{display:'flex',gap:8,alignItems:'center',marginBottom:4}}>
<div style={{width:22,height:22,borderRadius:6,background:m.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white'}}>{m.num}</div>
<span style={{fontSize:12,fontWeight:700,color:m.c}}>{m.t}</span>
</div>
<div style={s.p}>{m.d}</div>
</div>
))}
</div>
)

if(seccion===9) return (
<div>
<div style={s.titulo}>{lang==='es'?'Modelo de convenios como inversión diferida':'Partnership Model as Deferred Investment'}</div>
<div style={s.highlight}>
<div style={s.verde}>{lang==='es'?'Los OLV que recibís hoy son una cuenta por cobrar — no un descuento':'OLV you receive today are a receivable — not a discount'}</div>
<div style={s.p}>{lang==='es'?'Cuando una empresa da un servicio a cambio de OLV, recibe esos tokens en su wallet empresarial. En Fase 3, los convierte en dinero real. Las empresas que entran antes acumulan más OLV cuando valen poco.':'When a company provides a service in exchange for OLV, it receives those tokens in its corporate wallet. In Phase 3, it converts them to real money. Companies that join early accumulate more OLV when they\'re cheap.'}</div>
</div>
{(lang==='es'?[
{t:'El flujo completo',d:'1. Vecino acumula OLV reciclando. 2. Canjea OLV por servicio de empresa partner. 3. Empresa recibe OLV en su wallet. 4. OLIVIA certifica con Verra 2027. 5. Empresa convierte OLV en USD.',c:'#22c55e'},
{t:'El modelo contable',d:'DÉBITO: Cuentas por cobrar OLV (activo). CRÉDITO: Ingresos por servicios. En Fase 3: DÉBITO: Caja USD. CRÉDITO: Cuentas por cobrar OLV. Si OLV subió → ganó más de lo que costó el servicio.',c:'#3b82f6'},
{t:'Categorías de convenios',d:'Fase 2: salud, transporte, gastronomía, apps digitales, suscripciones, créditos de IA (Claude, Gemini, Runway). Fase 3: aerolíneas, navieras, bancos, municipios.',c:'#f59e0b'},
{t:'Honestidad sobre el estado actual',d:'Hoy no hay convenios activos. Los primeros convenios se buscarán en Q3 2026 con gimnasios y clínicas dentales de CABA. Los convenios con apps de IA y aerolíneas en Fase 3.',c:'#a855f7'},
]:[
{t:'Complete flow',d:'1. Neighbor accumulates OLV recycling. 2. Redeems OLV for partner service. 3. Company receives OLV in wallet. 4. OLIVIA certifies with Verra 2027. 5. Company converts OLV to USD.',c:'#22c55e'},
{t:'Accounting model',d:'DEBIT: OLV receivables (asset). CREDIT: Service revenue. In Phase 3: DEBIT: Cash USD. CREDIT: OLV receivables. If OLV rose → earned more than the service cost.',c:'#3b82f6'},
{t:'Partnership categories',d:'Phase 2: health, transport, food, digital apps, subscriptions, AI credits (Claude, Gemini, Runway). Phase 3: airlines, shipping, banks, municipalities.',c:'#f59e0b'},
{t:'Honesty about current state',d:'Today there are no active partnerships. First partnerships will be sought in Q3 2026 with gyms and dental clinics in Buenos Aires. AI app and airline partnerships in Phase 3.',c:'#a855f7'},
]).map(i=>(
<div key={i.t} style={{...s.card,borderLeft:`3px solid ${i.c}`}}>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

if(seccion===10) return (
<div>
<div style={s.titulo}>{lang==='es'?'Incentivos cruzados — Economía interna Circulab':'Cross Incentives — Circulab Internal Economy'}</div>
<div style={s.highlight}>
<div style={s.verde}>{lang==='es'?'Las tres verticales se financian entre sí antes de monetizar hacia afuera':'The three verticals finance each other before monetizing externally'}</div>
<div style={s.p}>{lang==='es'?'OLV no es solo un token de reciclaje. Es la moneda interna de todo el ecosistema Circulab Tech. Antes de que el mercado de carbono pague, las tres verticales generan liquidez real entre sí y con terceros, creando un mercado interno que no depende de inversión externa ni del precio del carbono.':'OLV is not just a recycling token. It is the internal currency of the entire Circulab Tech ecosystem. Before the carbon market pays, the three verticals generate real liquidity among themselves and with third parties, creating an internal market that does not depend on external investment or carbon prices.'}</div>
</div>

<div style={{...s.card,borderTop:'3px solid #22c55e',marginBottom:8}}>
<div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:8}}>{lang==='es'?'🔄 Circulación interna entre verticales':'🔄 Internal circulation between verticals'}</div>
{(lang==='es'?[
{de:'OLIVIA',a:'PULSO/Quincena',flujo:'El historial OLV de un ciudadano construye su score PULSO — accede a créditos rotativos informales con mejor tasa porque su comportamiento ambiental es prueba de responsabilidad.'},
{de:'PULSO/Quincena',a:'Art of Money',flujo:'Un artista o creador con score PULSO alto puede usar su reputación crediticia para acceder a adelantos de regalías en 48hs en Art of Money, pagando la comisión en OLV.'},
{de:'Art of Money',a:'OLIVIA',flujo:'Un artista que recibe liquidez de AOM puede usar parte de sus OLV para pagar el servicio de recolección de residuos de su estudio o evento con OLIVIA — cerrando el ciclo.'},
{de:'Cualquier vertical',a:'Servicios de terceros',flujo:'Transporte, salud, gastronomía, suscripciones digitales — cualquier empresa que acepte OLV hoy acumula activos ambientales que se convierten en USD cuando Verra certifique en 2027.'},
]:[
{de:'OLIVIA',a:'PULSO/Quincena',flujo:'A citizen\'s OLV history builds their PULSO score — they access informal rotating credits at better rates because their environmental behavior proves responsibility.'},
{de:'PULSO/Quincena',a:'Art of Money',flujo:'An artist or creator with a high PULSO score can use their credit reputation to access 48-hour royalty advances in Art of Money, paying the commission in OLV.'},
{de:'Art of Money',a:'OLIVIA',flujo:'An artist who receives liquidity from AOM can use some of their OLV to pay for waste collection services for their studio or event with OLIVIA — closing the cycle.'},
{de:'Any vertical',a:'Third-party services',flujo:'Transport, health, food, digital subscriptions — any company that accepts OLV today accumulates environmental assets that convert to USD when Verra certifies in 2027.'},
]).map((f,i)=>(
<div key={i} style={{padding:'8px 0',borderBottom:`1px solid ${border}`}}>
<div style={{display:'flex',gap:6,alignItems:'center',marginBottom:4}}>
<span style={{fontSize:10,fontWeight:700,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'2px 8px',borderRadius:10}}>{f.de}</span>
<span style={{fontSize:10,color:sub}}>→</span>
<span style={{fontSize:10,fontWeight:700,color:'#3b82f6',background:'rgba(59,130,246,0.1)',padding:'2px 8px',borderRadius:10}}>{f.a}</span>
</div>
<div style={{fontSize:11,color:sub,lineHeight:1.5}}>{f.flujo}</div>
</div>
))}
</div>

{(lang==='es'?[
{t:'Convenios externos como inversión diferida',d:'Una empresa de transporte, un gym, una clínica dental, una app de streaming — cualquier empresa que acepte OLV como pago parcial o total de sus servicios recibe tokens que en Fase 3 valen USD reales. Entrar hoy cuando el OLV vale poco es comprar a precio semilla.',c:'#f59e0b'},
{t:'El modelo de liquidez sin caja',d:'Circulab Tech puede operar sin inversión externa porque las tres verticales se pagan entre sí. El reciclador paga el transporte con OLV. El transportista paga su suscripción de software con OLV. El software paga a sus proveedores con OLV. La caja sale del mercado de carbono — todo lo demás es interno.',c:'#a855f7'},
{t:'Por qué esto es único',d:'No existe otro ecosistema en LATAM que combine datos ambientales verificados, reputación crediticia informal y liquidez para creadores en una sola moneda interna. La red de incentivos cruzados hace que cada vertical fortalezca a las otras dos.',c:'#22c55e'},
]:[
{t:'External partnerships as deferred investment',d:'A transport company, a gym, a dental clinic, a streaming app — any company that accepts OLV as partial or full payment for their services receives tokens that in Phase 3 are worth real USD. Joining today when OLV is cheap means buying at seed price.',c:'#f59e0b'},
{t:'The cash-free liquidity model',d:'Circulab Tech can operate without external investment because the three verticals pay each other. The recycler pays transport with OLV. The transporter pays their software subscription with OLV. The software pays its suppliers with OLV. Cash comes from the carbon market — everything else is internal.',c:'#a855f7'},
{t:'Why this is unique',d:'No other ecosystem in LATAM combines verified environmental data, informal credit reputation and creator liquidity in a single internal currency. The cross-incentive network makes each vertical strengthen the other two.',c:'#22c55e'},
]).map(i=>(
<div key={i.t} style={{...s.card,borderLeft:`3px solid ${i.c}`}}>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

if(seccion===11) return (
<div>
<div style={s.titulo}>{lang==='es'?'Transporte inteligente optimizado por IA':'AI-Optimized Smart Transport'}</div>
<div style={s.highlight}>
<div style={s.verde}>{lang==='es'?'El transporte no es un costo — es una fuente de datos y una fuente de OLV':'Transport is not a cost — it is a data source and an OLV source'}</div>
<div style={s.p}>{lang==='es'?'OLIVIA convierte el transporte de residuos en un nodo de la red de valor. El transportista no solo mueve kilos — genera trazabilidad, confirma entregas y acumula OLV que puede canjear en el ecosistema Circulab o convertir en USD en Fase 3.':'OLIVIA converts waste transport into a value network node. The transporter not only moves kilos — they generate traceability, confirm deliveries and accumulate OLV that can be redeemed in the Circulab ecosystem or converted to USD in Phase 3.'}</div>
</div>
{(lang==='es'?[
{icon:'🗺️',t:'Rutas optimizadas por IA',d:'El algoritmo agrupa registros por zona, tipo de material y punto de entrega. La ruta óptima minimiza kilómetros recorridos y maximiza kilos recolectados por viaje. Integración con APIs de mapas (Google Maps, Waze) para tráfico en tiempo real. Ahorro estimado: 30-40% en combustible vs rutas manuales.',c:'#22c55e'},
{icon:'📦',t:'Rutas por tipo de material',d:'Orgánico → composteras urbanas o biodigestores. Plástico → cooperativas de reciclaje. Metal → chatarrerías certificadas. Aceite → plantas de biodiesel. Cada material tiene su ruta óptima y su punto de entrega específico — la IA los separa automáticamente.',c:'#3b82f6'},
{icon:'🪙',t:'El transportista como nodo OLV',d:'Por cada entrega confirmada con GPS, el transportista recibe OLV proporcionales al peso entregado y la distancia recorrida. Puede usar esos OLV para: pagar combustible a partners OLIVIA, acceder a créditos PULSO para comprar su vehículo, o esperar Fase 3 y convertirlos en USD.',c:'#f59e0b'},
{icon:'🤝',t:'Convenios con transportistas',d:'El transportista que acepta OLV como parte de su pago hoy está apostando al ecosistema. Los primeros transportistas OLIVIA serán los más rentables cuando el mercado de carbono active en 2027. Estrategia de entrada: cooperativas de cartoneros y recolectores informales como primer canal.',c:'#a855f7'},
{icon:'📊',t:'Datos de transporte como activo',d:'Cada viaje genera datos: origen, destino, tipo de material, peso, tiempo. Esos datos son parte del dMRV que Verra necesita para certificar. El transportista no solo mueve residuos — construye el historial de custodia que hace el crédito certificable.',c:'#22c55e'},
{icon:'🌍',t:'Expansión LATAM',d:'El módulo de transporte es replicable en cualquier ciudad del corredor LATAM. Ciudad de México, Bogotá, Santiago: misma lógica, misma IA, distintas rutas. La red de transportistas crece con el ecosistema.',c:'#ef4444'},
]:[
{icon:'🗺️',t:'AI-optimized routes',d:'The algorithm groups registrations by zone, material type and delivery point. The optimal route minimizes kilometers and maximizes kilos collected per trip. Integration with map APIs (Google Maps, Waze) for real-time traffic. Estimated savings: 30-40% in fuel vs manual routes.',c:'#22c55e'},
{icon:'📦',t:'Routes by material type',d:'Organic → urban composters or biodigesters. Plastic → recycling cooperatives. Metal → certified scrap dealers. Oil → biodiesel plants. Each material has its optimal route and specific delivery point — AI separates them automatically.',c:'#3b82f6'},
{icon:'🪙',t:'Transporter as OLV node',d:'For each GPS-confirmed delivery, the transporter receives OLV proportional to weight delivered and distance covered. They can use OLV to: pay fuel at OLIVIA partners, access PULSO credits to buy their vehicle, or wait for Phase 3 and convert to USD.',c:'#f59e0b'},
{icon:'🤝',t:'Transporter partnerships',d:'The transporter who accepts OLV as part of their payment today is betting on the ecosystem. The first OLIVIA transporters will be the most profitable when the carbon market activates in 2027. Entry strategy: cartonero cooperatives and informal collectors as first channel.',c:'#a855f7'},
{icon:'📊',t:'Transport data as asset',d:'Every trip generates data: origin, destination, material type, weight, time. That data is part of the dMRV that Verra needs to certify. The transporter not only moves waste — they build the custody history that makes the credit certifiable.',c:'#22c55e'},
{icon:'🌍',t:'LATAM expansion',d:'The transport module is replicable in any city in the LATAM corridor. Mexico City, Bogotá, Santiago: same logic, same AI, different routes. The transporter network grows with the ecosystem.',c:'#ef4444'},
]).map(i=>(
<div key={i.t} style={{...s.card,display:'flex',gap:10,alignItems:'flex-start'}}>
<span style={{fontSize:22,flexShrink:0}}>{i.icon}</span>
<div>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
</div>
))}
</div>
)

if(seccion===12) return (
<div>
<div style={s.titulo}>{lang==='es'?'Hoja de ruta':'Roadmap'}</div>
<div style={{...s.highlight,marginBottom:16}}>
<div style={s.p}>{lang==='es'?'Tres etapas reales. Hoy los OLV no tienen valor monetario y OLIVIA no emite créditos de carbono ni promete ingresos.':'Three real stages. Today OLV have no monetary value and OLIVIA issues no carbon credits and promises no income.'}</div>
</div>
{(lang==='es'?[
{fase:'🌱 Semilla',año:'Hoy',color:'#22c55e',items:['Piloto dMRV en CABA','App web con verificación IA (Cloudflare Workers AI)','Panel dMRV con validación manual','Primeros kilos verificados']},
{fase:'🌿 Brote',año:'Próxima',color:'#3b82f6',items:['Sociedad constituida','Acuerdo con acopiador habilitado','Planta aliada con balanza conectada','Datos continuos de balanza y firma del acopiador']},
{fase:'🌳 Árbol',año:'Certificación',color:'#f59e0b',items:['Desarrollador de carbono y línea de base','Documento de diseño presentado ante Verra','Auditoría de tercera parte','Proyecto registrado']},
]:[
{fase:'🌱 Seed',año:'Today',color:'#22c55e',items:['dMRV pilot in Buenos Aires','Web app with AI verification (Cloudflare Workers AI)','dMRV dashboard with manual validation','First verified kilos']},
{fase:'🌿 Sprout',año:'Next',color:'#3b82f6',items:['Company incorporated','Agreement with a licensed collector','Partner plant with connected scale','Continuous scale data and collector sign-off']},
{fase:'🌳 Tree',año:'Certification',color:'#f59e0b',items:['Carbon developer and baseline','Project design document submitted to Verra','Third-party audit','Project registered']},
]).map(f=>(
<div key={f.fase} style={{...s.card,borderTop:`3px solid ${f.color}`,marginBottom:14}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
<div style={{fontSize:14,fontWeight:700,color:f.color}}>{f.fase}</div>
<div style={{fontSize:10,color:sub}}>{f.año}</div>
</div>
{f.items.map((item,i)=>(
<div key={i} style={{display:'flex',gap:6,padding:'4px 0',borderBottom:`1px solid ${border}`}}>
<span style={{color:f.color,fontSize:10,flexShrink:0}}>→</span>
<span style={{fontSize:11,color:sub}}>{item}</span>
</div>
))}
</div>
))}
<div style={{...s.card,fontSize:11,color:sub}}>{lang==='es'?'Visión futura: módulo de transporte y otras ciudades de la región, una vez certificado el primer proyecto.':'Future vision: transport module and other cities in the region, once the first project is certified.'}</div>
</div>
)

if(seccion===13) return (
<div>
<div style={s.titulo}>{lang==='es'?'Familia OLIVIA':'OLIVIA Family'}</div>
<div style={s.highlight}>
<div style={s.p}>{lang==='es'?'OLIVIA Circulab es la primera vertical de Circulab Tech. A medida que el sistema madure, se expande a nuevos ecosistemas usando la misma infraestructura de dMRV, tokenización y certificación.':'OLIVIA Circulab is the first vertical of Circulab Tech. As the system matures, it expands to new ecosystems using the same dMRV, tokenization and certification infrastructure.'}</div>
</div>
{[
{icon:'🌿',n:'OLIVIA Circulab',d:lang==='es'?'Residuos domiciliarios urbanos → créditos de carbono. La vertical activa hoy.':'Urban household waste → carbon credits. The active vertical today.',c:'#22c55e',e:'2026'},
{icon:'🏭',n:'Metamorfosis',d:lang==='es'?'Biodigestores industriales y compostaje a gran escala.':'Industrial biodigesters and large-scale composting.',c:'#3b82f6',e:'2027'},
{icon:'🌊',n:'OLIVIA Ocean',d:lang==='es'?'Residuos marinos y costeros. Plásticos oceánicos. Blue Carbon.':'Marine and coastal waste. Ocean plastics. Blue Carbon.',c:'#06b6d4',e:'2028'},
{icon:'💧',n:'OLIVIA Waters',d:lang==='es'?'Tratamiento y reciclaje de agua. Cuencas hídricas certificables.':'Water treatment and recycling. Certifiable watersheds.',c:'#3b82f6',e:'2029'},
{icon:'🚀',n:'OLIVIA Space',d:lang==='es'?'Infraestructura de datos ambientales satelital.':'Satellite environmental data infrastructure.',c:'#a855f7',e:'2030+'},
].map(v=>(
<div key={v.n} style={{...s.card,borderLeft:`3px solid ${v.c}`,display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10}}>
<div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
<span style={{fontSize:20}}>{v.icon}</span>
<div>
<div style={{fontSize:12,fontWeight:700,color:v.c}}>{v.n}</div>
<div style={s.p}>{v.d}</div>
</div>
</div>
<span style={{fontSize:9,color:sub,flexShrink:0}}>{v.e}</span>
</div>
))}
</div>
)

if(seccion===14) return (
<div>
<div style={s.titulo}>{lang==='es'?'Equipo y tecnología':'Team & Technology'}</div>
<div style={s.highlight}>
<div style={s.verde}>{lang==='es'?'Construido sin inversión externa · Buenos Aires':'Built without external investment · Buenos Aires'}</div>
<div style={s.p}>{lang==='es'?'Todo el producto fue construido por los fundadores usando IA como equipo técnico. Sin inversión externa. El primer uso de fondos es contratar un CTO y auditar el código.':'The entire product was built by the founders using AI as their technical team. No external investment. First use of funds is hiring a CTO and auditing the code.'}</div>
</div>
{[
{foto:'/founders/founder-jp.jpg',n:'Juan Pablo Sanguinetti de Zapata',rol:'CEO & Founder',d:lang==='es'?'Director de teatro chileno y abogado. Product builder con IA. Arquitecto del ecosistema Circulab. Especialidad en medio ambiente, tributación y gestión de proyectos.':'Chilean theater director and lawyer. AI product builder. Circulab ecosystem architect. Expertise in environmental law, taxation and project management.',c:'#22c55e'},
{foto:'/founders/founder-mileidy.jpg',n:'Mileidy Zapata de Sanguinetti',rol:'COO & Co-founder',d:lang==='es'?'Madre, bailarina y coreógrafa dominicana. Un corazón, tres países, una misión: desarrollar la comunidad y mejorar la calidad de vida. Junto a OLIVIA y Santino Eloy, dieron comienzo al piloto en casa.':'Mother, dancer and Dominican choreographer. One heart, three countries, one mission: build community and improve quality of life. Together with OLIVIA and Santino Eloy, they started the pilot at home.',c:'#3b82f6'},
].map(f=>(
<div key={f.n} style={{...s.card,display:'flex',gap:12,alignItems:'flex-start',marginBottom:12}}>
<img src={f.foto} alt={f.n} style={{width:52,height:52,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:`2px solid ${f.c}`}} />
<div>
<div style={{fontSize:13,fontWeight:700,color:text,marginBottom:2}}>{f.n}</div>
<div style={{fontSize:11,color:f.c,marginBottom:6,fontWeight:600}}>{f.rol}</div>
<div style={s.p}>{f.d}</div>
</div>
</div>
))}
<div style={s.card}>
<div style={s.verde}>{lang==='es'?'Stack tecnológico actual':'Current tech stack'}</div>
{[
{l:'Frontend',v:'Next.js 16 + React + TypeScript'},
{l:'Backend',v:'Supabase (PostgreSQL + Auth + Storage)'},
{l:'AI Vision',v:'Cloudflare Workers AI (LLaVA 1.5 13B) — 10.000 req/día gratis'},
{l:'Deploy',v:'Vercel (CI/CD) · oliviacirculab.com.ar'},
{l:lang==='es'?'Costo mensual':'Monthly cost',v:'USD 0 (free tiers)'},
].map(i=>(
<div key={i.l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${border}`}}>
<span style={{fontSize:11,color:sub}}>{i.l}</span>
<span style={{fontSize:11,color:text,fontWeight:600}}>{i.v}</span>
</div>
))}
</div>
</div>
)

if(seccion===15) return (
<div>
<div style={s.titulo}>{lang==='es'?'El pedido':'The Ask'}</div>
<div style={{...s.card,textAlign:'center',borderTop:'3px solid #22c55e'}}>
<div style={{fontSize:28,fontWeight:900,color:'#22c55e'}}>USD 200K</div>
<div style={{fontSize:11,color:sub,marginTop:4}}>{lang==='es'?'3 tramos contra hitos · 10% para un socio activo':'3 milestone-based tranches · 10% for an active partner'}</div>
<div style={{fontSize:10,color:sub}}>{lang==='es'?'USD 1,8M pre-money · USD 2M post-money':'USD 1.8M pre-money · USD 2M post-money'}</div>
</div>
{(lang==='es'?[
{t:'Tramo 1 · USD 50.000',d:'Sociedad, acuerdo con acopiador, primeras balanzas, 4 meses de equipo. Libera el siguiente: sociedad constituida, acopiador firmado, balanza transmitiendo datos continuos.'},
{t:'Tramo 2 · USD 70.000',d:'Desarrollador de carbono, línea de base, documento de diseño del proyecto, más nodos. Libera el siguiente: documento de diseño presentado ante Verra.'},
{t:'Tramo 3 · USD 80.000',d:'Auditoría de tercera parte, registro, operación. Hito: proyecto registrado.'},
{t:'Condiciones',d:'Valuación de referencia: USD 1,8M pre-money (USD 2M post-money) por el 10%. Montos por tramo a confirmar con cotizaciones de balanzas y del desarrollador de carbono. Sin costos fijos hasta inversión comprometida. Reporting mensual.'},
]:[
{t:'Tranche 1 · USD 50,000',d:'Company, collector agreement, first scales, 4 months of team. Releases the next: company incorporated, collector signed, scale transmitting continuous data.'},
{t:'Tranche 2 · USD 70,000',d:'Carbon developer, baseline, project design document, more nodes. Releases the next: project design document submitted to Verra.'},
{t:'Tranche 3 · USD 80,000',d:'Third-party audit, registration, operations. Milestone: project registered.'},
{t:'Terms',d:'Reference valuation: USD 1.8M pre-money (USD 2M post-money) for 10%. Tranche amounts to be confirmed with scale and carbon developer quotes. No fixed costs until investment is committed. Monthly reporting.'},
]).map(i=>(
<div key={i.t} style={s.card}>
<div style={s.verde}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)



if(seccion===18) return (
  <div>
    <div style={s.titulo}>{lang==='es'?'Proyecciones financieras':'Financial projections'}</div>

    {/* Nota de transparencia - CRITICA */}
    <div style={{...s.highlight,border:'1px solid rgba(239,68,68,0.2)',background:'rgba(239,68,68,0.04)',marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,color:'#ef4444',marginBottom:6}}>
        {lang==='es'?'Nota de transparencia · Lectura obligatoria':'Transparency note · Required reading'}
      </div>
      <div style={s.p}>
        {lang==='es'
          ? 'Las proyecciones presentadas en esta seccion son estimaciones basadas en el modelo de negocio actual, la traccion inicial y las condiciones del mercado de carbono a junio 2026. Los valores reales dependen de: (a) la escala de usuarios y consorcios alcanzada, (b) las certificaciones obtenidas de Verra VCS y otros organismos, (c) los precios del mercado voluntario de carbono al momento de la certificacion, y (d) las condiciones macroeconomicas de LATAM. Circulab Tech no garantiza estos retornos. Las proyecciones se presentan como escenario base conservador para ilustrar el potencial del modelo, no como promesa de retorno.'
          : 'The projections in this section are estimates based on the current business model, initial traction, and carbon market conditions as of June 2026. Actual values depend on: (a) the scale of users and buildings reached, (b) certifications obtained from Verra VCS and other bodies, (c) voluntary carbon market prices at time of certification, and (d) LATAM macroeconomic conditions. Circulab Tech does not guarantee these returns. Projections are presented as a conservative base scenario to illustrate model potential, not as a return promise.'}
      </div>
    </div>

    {/* Break-even operativo */}
    <div style={{...s.card,borderLeft:'3px solid #22c55e',marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:10}}>
        {lang==='es'?'Break-even operativo · Mayo 2027':'Operational break-even · May 2027'}
      </div>
      <div style={s.p}>
        {lang==='es'
          ? 'Con los costos fijos post-inversion estimados en USD 10.500/mes, el MRR de OLIVIA supera ese umbral en mayo 2027 (11 meses despues de cerrar la ronda Seed). A partir de ese momento la operacion es autosustentable sin necesidad de nueva inyeccion de capital. Todo lo que genere Verra desde julio 2027 es utilidad neta sobre costos ya cubiertos por el SaaS.'
          : 'With post-investment fixed costs estimated at USD 10,500/month, OLIVIA MRR surpasses that threshold in May 2027 (11 months after closing the Seed round). From that point operations are self-sustaining without new capital injection. Everything Verra generates from July 2027 is net profit on costs already covered by SaaS.'}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:12}}>
        {[
          {mes:lang==='es'?'Cierre ronda':'Round close',mrr:'USD 0',c:'#64748b'},
          {mes:lang==='es'?'Mes 3':'Month 3',mrr:'USD 2.000',c:'#3b82f6'},
          {mes:lang==='es'?'Mes 6':'Month 6',mrr:'USD 6.000',c:'#f59e0b'},
          {mes:lang==='es'?'Mes 11 ✅':'Month 11 ✅',mrr:'USD 11.000',c:'#22c55e'},
        ].map((item,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + item.c + '33',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:item.c,fontWeight:700,marginBottom:4}}>{item.mes}</div>
            <div style={{fontSize:13,fontWeight:900,color:item.c}}>{item.mrr}</div>
            <div style={{fontSize:8,color:'#64748b',marginTop:2}}>MRR</div>
          </div>
        ))}
      </div>
    </div>

    {/* Escenarios · Seed USD 200K y Serie A USD 2M */}
    {(()=>{
      const es = lang==='es'
      const base = escenario==='base'
      const d = (a:string,b:string) => es?a:b
      const seed = base ? [
        {a:'2026',h:d('Entrada Seed','Seed entry'),arr:'USD 24K',val:'USD 2M',pct:'10%',part:'USD 200K',x:'1x',c:'#64748b'},
        {a:'2027',h:d('Serie A','Series A'),arr:'USD 177K',val:'USD 12M',pct:d('8,3%','8.3%'),part:d('USD 1,0M','USD 1.0M'),x:'5x',c:'#3b82f6'},
        {a:'2028',h:d('Vale la Serie A','Series A holds'),arr:d('USD 1,23M','USD 1.23M'),val:'USD 12M',pct:d('8,3%','8.3%'),part:d('USD 1,0M','USD 1.0M'),x:'5x',c:'#3b82f6'},
        {a:'2029',h:d('6x facturación','6x revenue'),arr:d('USD 4,0M','USD 4.0M'),val:'USD 24M',pct:d('8,3%','8.3%'),part:d('USD 2,0M','USD 2.0M'),x:'10x',c:'#f59e0b'},
        {a:'2030',h:d('6x facturación','6x revenue'),arr:d('USD 10,0M','USD 10.0M'),val:'USD 60M',pct:d('8,3%','8.3%'),part:d('USD 5,0M','USD 5.0M'),x:'25x',c:'#22c55e'},
      ] : [
        {a:'2026',h:d('Entrada Seed','Seed entry'),arr:'USD 12K',val:'USD 2M',pct:'10%',part:'USD 200K',x:'1x',c:'#64748b'},
        {a:'2027',h:d('Serie A','Series A'),arr:'USD 88K',val:'USD 12M',pct:d('8,3%','8.3%'),part:d('USD 1,0M','USD 1.0M'),x:'5x',c:'#3b82f6'},
        {a:'2028',h:d('Vale la Serie A','Series A holds'),arr:'USD 615K',val:'USD 12M',pct:d('8,3%','8.3%'),part:d('USD 1,0M','USD 1.0M'),x:'5x',c:'#3b82f6'},
        {a:'2029',h:d('Vale la Serie A','Series A holds'),arr:d('USD 2,0M','USD 2.0M'),val:'USD 12M',pct:d('8,3%','8.3%'),part:d('USD 1,0M','USD 1.0M'),x:'5x',c:'#f59e0b'},
        {a:'2030',h:d('6x facturación','6x revenue'),arr:d('USD 5,0M','USD 5.0M'),val:'USD 30M',pct:d('8,3%','8.3%'),part:d('USD 2,5M','USD 2.5M'),x:d('12,5x','12.5x'),c:'#22c55e'},
      ]
      const serieA = base ? [
        {a:d('2028 (año 1)','2028 (year 1)'),val:'USD 12M',part:d('USD 2,0M','USD 2.0M'),x:'1x',c:'#3b82f6'},
        {a:d('2029 (año 2)','2029 (year 2)'),val:'USD 24M',part:d('USD 4,0M','USD 4.0M'),x:'2x',c:'#f59e0b'},
        {a:d('2030 (año 3)','2030 (year 3)'),val:'USD 60M',part:d('USD 10,0M','USD 10.0M'),x:'5x',c:'#22c55e'},
      ] : [
        {a:d('2028 (año 1)','2028 (year 1)'),val:'USD 12M',part:d('USD 2,0M','USD 2.0M'),x:'1x',c:'#3b82f6'},
        {a:d('2029 (año 2)','2029 (year 2)'),val:'USD 12M',part:d('USD 2,0M','USD 2.0M'),x:'1x',c:'#f59e0b'},
        {a:d('2030 (año 3)','2030 (year 3)'),val:'USD 30M',part:d('USD 5,0M','USD 5.0M'),x:d('2,5x','2.5x'),c:'#22c55e'},
      ]
      const cards = (items:{label:string,valor:string,sub:string,c:string}[]) => (
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
          {items.map((item,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + item.c + '22',borderRadius:8,padding:'10px',textAlign:'center'}}>
              <div style={{fontSize:9,color:'#64748b',marginBottom:4}}>{item.label}</div>
              <div style={{fontSize:12,fontWeight:900,color:item.c,marginBottom:2}}>{item.valor}</div>
              <div style={{fontSize:9,color:'#64748b'}}>{item.sub}</div>
            </div>
          ))}
        </div>
      )
      const fila = (cols:string[], c:string, head:boolean, key:number) => (
        <div key={key} style={{display:'grid',gridTemplateColumns:cols.length===5?'0.7fr 1.1fr 1fr 1fr 0.7fr':'1.4fr 1fr 1fr 0.7fr',gap:6,padding:head?'0 10px':'8px 10px',background:head?'transparent':'rgba(255,255,255,0.02)',borderRadius:8,border:head?'none':'1px solid ' + c + '22'}}>
          {cols.map((t,j)=>(
            <div key={j} style={head?{fontSize:8,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.05em'}:{fontSize:10,whiteSpace:'nowrap',color:j===0||j===cols.length-1?c:'#94a3b8',fontWeight:j===0||j===cols.length-1?800:400}}>{t}</div>
          ))}
        </div>
      )
      const comp = es ? [
        ['','Seed USD 200K','Serie A USD 2M'],
        ['Momento','Hoy · 2026','Q4 2027 · post-Verra'],
        ['Riesgo','Alto','Medio-bajo'],
        ['Valuación de entrada','USD 2M post-money','USD 12M post-money'],
        ['Participación','10% → 8,3% tras la Serie A','~17%'],
        ['Múltiplo al año 3',base?'10x':'5x',base?'5x':'2,5x'],
        ['TIR al año 3',base?'~115%':'~71%',base?'~71%':'~36%'],
      ] : [
        ['','Seed USD 200K','Series A USD 2M'],
        ['Timing','Today · 2026','Q4 2027 · post-Verra'],
        ['Risk','High','Medium-low'],
        ['Entry valuation','USD 2M post-money','USD 12M post-money'],
        ['Stake','10% → 8.3% after Series A','~17%'],
        ['Year-3 multiple',base?'10x':'5x',base?'5x':'2.5x'],
        ['Year-3 IRR',base?'~115%':'~71%',base?'~71%':'~36%'],
      ]
      return (
        <>
          <div style={{display:'flex',gap:6,marginBottom:10}}>
            {(['base','cons'] as const).map(k=>(
              <button key={k} onClick={()=>setEscenario(k)} style={{padding:'6px 12px',borderRadius:8,border:'1px solid rgba(34,197,94,0.3)',cursor:'pointer',fontSize:11,fontWeight:escenario===k?800:500,background:escenario===k?'rgba(34,197,94,0.15)':'transparent',color:escenario===k?'#22c55e':'#94a3b8'}}>
                {k==='base'?d('Escenario base','Base scenario'):d('Escenario conservador','Conservative scenario')}
              </button>
            ))}
          </div>
          <div style={{...s.p,marginBottom:16}}>
            {d('Método: cada año la empresa vale lo más alto entre el precio de la última ronda y 6 veces su facturación anual. La participación Seed se diluye con la Serie A. El escenario conservador proyecta la mitad de la facturación del base. Los dos suponen la Serie A de 2027.',
               'Method: each year the company is valued at the higher of the last round price and 6x annual revenue. The Seed stake is diluted by the Series A. The conservative scenario projects half the base revenue. Both assume the 2027 Series A.')}
          </div>

          <div style={{...s.card,borderLeft:'3px solid #22c55e',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:900,color:'#22c55e',marginBottom:12}}>
              {d('Ronda Seed · USD 200K · 10% · USD 1,8M pre-money','Seed Round · USD 200K · 10% · USD 1.8M pre-money')}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
              {fila(es?['Año','Facturación','Valuación','Valor Seed','Múltiplo']:['Year','Revenue','Valuation','Seed value','Multiple'],'#64748b',true,-1)}
              {seed.map((r,i)=>fila([r.a,r.arr,r.val,r.part,r.x],r.c,false,i))}
            </div>
            {cards([
              {label:d('Múltiplo al año 3 (2029)','Year-3 multiple (2029)'),valor:base?'10x':'5x',sub:d('Sobre USD 200K','On USD 200K'),c:'#22c55e'},
              {label:d('TIR al año 3','Year-3 IRR'),valor:base?d('~115% anual','~115% per year'):d('~71% anual','~71% per year'),sub:d('Sin beneficios fiscales','No tax benefits'),c:'#a855f7'},
              {label:d('Participación tras la Serie A','Stake after Series A'),valor:d('8,3%','8.3%'),sub:d('10% diluido','10% diluted'),c:'#f59e0b'},
            ])}
          </div>

          <div style={{...s.card,borderLeft:'3px solid #3b82f6',marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:900,color:'#3b82f6',marginBottom:4}}>
              {d('Ronda Serie A · USD 2M · ~17% · USD 10M pre-money','Series A Round · USD 2M · ~17% · USD 10M pre-money')}
            </div>
            <div style={{fontSize:10,color:'#64748b',marginBottom:12}}>
              {d('Estimada para Q4 2027, después de la certificación Verra.','Estimated for Q4 2027, after Verra certification.')}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
              {fila(es?['Año','Valuación','Valor Serie A','Múltiplo']:['Year','Valuation','Series A value','Multiple'],'#64748b',true,-1)}
              {serieA.map((r,i)=>fila([r.a,r.val,r.part,r.x],r.c,false,i))}
            </div>
            {cards([
              {label:d('Múltiplo al año 3 (2030)','Year-3 multiple (2030)'),valor:base?'5x':d('2,5x','2.5x'),sub:d('Sobre USD 2M','On USD 2M'),c:'#22c55e'},
              {label:d('TIR al año 3','Year-3 IRR'),valor:base?d('~71% anual','~71% per year'):d('~36% anual','~36% per year'),sub:d('Escenario seleccionado','Selected scenario'),c:'#a855f7'},
              {label:d('Break-even operativo','Operational break-even'),valor:d('Ya alcanzado','Already reached'),sub:d('Antes de la Serie A','Before Series A'),c:'#3b82f6'},
            ])}
          </div>

          <div style={{...s.card,borderLeft:'3px solid #a855f7'}}>
            <div style={{fontSize:12,fontWeight:700,color:'#a855f7',marginBottom:12}}>
              {d('Comparativa Seed vs Serie A','Seed vs Series A comparison')}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'2fr 1.4fr 1.4fr',gap:8}}>
              {comp.map((row,i)=>(
                row[0]===''
                  ? [<div key={i+'-0'} />, ...row.slice(1).map((h,j)=>(
                      <div key={i+'-'+(j+1)} style={{fontSize:9,fontWeight:700,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.05em',padding:'4px 0'}}>{h}</div>
                    ))]
                  : [
                      <div key={i+'-0'} style={{fontSize:10,color:'#64748b',padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[0]}</div>,
                      <div key={i+'-1'} style={{fontSize:10,color:'#22c55e',fontWeight:600,padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[1]}</div>,
                      <div key={i+'-2'} style={{fontSize:10,color:'#3b82f6',fontWeight:600,padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[2]}</div>,
                    ]
              ))}
            </div>
            <div style={{marginTop:16,padding:'12px',background:'rgba(168,85,247,0.06)',border:'1px solid rgba(168,85,247,0.15)',borderRadius:10,fontSize:11,color:'#94a3b8',lineHeight:1.7,fontStyle:'italic'}}>
              {d('El inversor Seed entra antes de la certificación, con más riesgo y a menor valuación. El inversor Serie A entra después de la certificación, con menos riesgo y a mayor valuación.',
                 'The Seed investor enters before certification, with more risk and at a lower valuation. The Series A investor enters after certification, with less risk and at a higher valuation.')}
            </div>
          </div>
        </>
      )
    })()}
  </div>
)

if(seccion===17) return (
  <div>
    <div style={s.titulo}>{lang==='es'?'Modelo de contratos y distribucion':'Contract model and distribution'}</div>

    <div style={{...s.highlight,border:'1px solid rgba(245,158,11,0.2)',background:'rgba(245,158,11,0.04)',marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,color:'#f59e0b',marginBottom:6}}>
        {lang==='es'?'La pregunta central':'The central question'}
      </div>
      <div style={s.p}>
        {lang==='es'
          ? 'Cuando Verra certifique los creditos en 2027 y una naviera pague USD 500.000 a Circulab Tech, como llega ese dinero al vecino de Palermo que separo sus organicos en 2026? Esa es la pregunta que este modelo responde.'
          : 'When Verra certifies credits in 2027 and a shipping company pays USD 500,000 to Circulab Tech, how does that money reach the Palermo neighbor who separated their organics in 2026? That is the question this model answers.'}
      </div>
    </div>

    {(lang==='es'?[
      {
        t:'Fase 1 · Hoy (Semilla 2026) · Mandato digital via T&C',
        c:'#22c55e',
        items:[
          'Al registrarse el ciudadano acepta los Terminos y Condiciones de OLIVIA.',
          'Los T&C incluyen la Clausula 8 de Mandato de Certificacion y Distribucion.',
          'Esta clausula autoriza expresamente a Circulab Tech a actuar como mandatario para certificar los residuos y distribuir los creditos correspondientes.',
          'El mandato digital es legalmente valido en Argentina bajo la Ley 25.506 de firma digital y los arts. 1319-1334 del Codigo Civil y Comercial.',
          'Los OLV acumulados quedan registrados en Supabase como activos pendientes de certificacion.',
          'Sin friccion adicional para el usuario. Sin firma extra. Sin billetera cripto requerida hoy.',
        ]
      },
      {
        t:'Fase 2 · Post-inversion (2026-2027) · Smart contracts',
        c:'#3b82f6',
        items:[
          'Con el capital Seed, el CTO disenara y auditara el smart contract de distribucion.',
          'Los OLV Verdes migran progresivamente a una wallet on-chain por usuario.',
          'El smart contract codifica la tabla de distribucion: X% ciudadano, Y% recolector, Z% Circulab Tech, W% reserva ecosistema.',
          'La auditoria del smart contract es obligatoria antes del deploy: empresa especializada externa verifica que el codigo hace exactamente lo que dice.',
          'El ciudadano obtiene una wallet OLIVIA propia, visible desde su dashboard.',
          'Compatible con Toucan Protocol y Moss.earth para tokenizacion de creditos Verra VCS.',
        ]
      },
      {
        t:'Fase 3 · Arbol 2027 · Distribucion automatica',
        c:'#f59e0b',
        items:[
          'Verra certifica los creditos y los registra en el Verra Registry.',
          'El comprador (naviera, minera, aerolinea, empresa RSE) paga a Circulab Tech.',
          'El smart contract de distribucion se ejecuta automaticamente.',
          'Cada wallet ciudadana recibe el porcentaje correspondiente en tiempo real.',
          'El ciudadano ve en su app: Recibiste USD X por tus OLV Verdes certificados.',
          'Puede retirar a Mercado Pago, transferencia bancaria local, o mantener en wallet para fases posteriores.',
          'Circulab Tech retiene su porcentaje como contraprestacion por infraestructura, certificacion y gestion comercial.',
        ]
      },
      {
        t:'Por que no esperar al smart contract para registrarse',
        c:'#a855f7',
        items:[
          'El mandato digital de los T&C ya es suficiente hoy para que Circulab Tech actue legalmente en nombre del ciudadano.',
          'Los OLV acumulados en Semilla 2026 mantienen su valor proporcional cuando llegue la distribucion en 2027.',
          'Registrarse hoy es ser primer movedor: el historial verificado de 18 meses tiene mas valor que empezar en Arbol 2027.',
          'El smart contract de 2027 distribuira retroactivamente los creditos generados desde el inicio del sistema, no solo los futuros.',
        ]
      },
    ]:[
      {
        t:'Phase 1 · Today (Semilla 2026) · Digital mandate via T&C',
        c:'#22c55e',
        items:[
          'When registering, citizens accept OLIVIA Terms and Conditions.',
          'T&C include Clause 8: Certification and Distribution Mandate.',
          'This clause expressly authorizes Circulab Tech to act as agent to certify waste and distribute corresponding credits.',
          'Digital mandate is legally valid in Argentina under Law 25.506 on digital signatures and Civil and Commercial Code arts. 1319-1334.',
          'Accumulated OLV are registered in Supabase as assets pending certification.',
          'No additional friction for the user. No extra signature. No crypto wallet required today.',
        ]
      },
      {
        t:'Phase 2 · Post-investment (2026-2027) · Smart contracts',
        c:'#3b82f6',
        items:[
          'With Seed capital, the CTO will design and audit the distribution smart contract.',
          'Green OLV progressively migrate to an on-chain wallet per user.',
          'Smart contract codifies the distribution table: X% citizen, Y% collector, Z% Circulab Tech, W% ecosystem reserve.',
          'Smart contract audit is mandatory before deploy: external specialized firm verifies code does exactly what it says.',
          'Citizen gets their own OLIVIA wallet, visible from their dashboard.',
          'Compatible with Toucan Protocol and Moss.earth for Verra VCS credit tokenization.',
        ]
      },
      {
        t:'Phase 3 · Arbol 2027 · Automatic distribution',
        c:'#f59e0b',
        items:[
          'Verra certifies credits and registers them in the Verra Registry.',
          'Buyer (shipping company, miner, airline, RSE company) pays Circulab Tech.',
          'Distribution smart contract executes automatically.',
          'Each citizen wallet receives the corresponding percentage in real time.',
          'Citizen sees in their app: You received USD X for your certified Green OLV.',
          'Can withdraw to Mercado Pago, local bank transfer, or keep in wallet for later phases.',
          'Circulab Tech retains its percentage as consideration for infrastructure, certification and commercial management.',
        ]
      },
      {
        t:'Why not wait for the smart contract to register',
        c:'#a855f7',
        items:[
          'The digital mandate in T&C is already sufficient today for Circulab Tech to legally act on behalf of citizens.',
          'OLV accumulated in Semilla 2026 maintain their proportional value when distribution arrives in 2027.',
          'Registering today means being a first mover: 18 months of verified history is more valuable than starting in Arbol 2027.',
          'The 2027 smart contract will retroactively distribute credits generated from the beginning, not just future ones.',
        ]
      },
    ]).map(item=>(
      <div key={item.t} style={{...s.card,borderLeft:'3px solid ' + item.c,marginBottom:12}}>
        <div style={{fontSize:12,fontWeight:700,color:item.c,marginBottom:8}}>{item.t}</div>
        {item.items.map((it,i)=>(
          <div key={i} style={{display:'flex',gap:8,marginBottom:6,alignItems:'flex-start'}}>
            <span style={{color:item.c,flexShrink:0}}>·</span>
            <span style={s.p}>{it}</span>
          </div>
        ))}
      </div>
    ))}

    <div style={{...s.highlight,border:'1px solid rgba(34,197,94,0.2)',background:'rgba(34,197,94,0.04)',marginTop:8}}>
      <div style={s.verde}>{lang==='es'?'En resumen':'In summary'}</div>
      <div style={s.p}>
        {lang==='es'
          ? 'Hoy: T&C con mandato digital. 2027: smart contract ejecuta la distribucion automaticamente. El ciudadano no necesita hacer nada adicional. Circulab Tech opera como coordinador neutral que construye el sistema, lo certifica, y distribuye el valor a quienes lo generaron.'
          : 'Today: T&C with digital mandate. 2027: smart contract executes distribution automatically. The citizen needs to do nothing additional. Circulab Tech operates as a neutral coordinator that builds the system, certifies it, and distributes value to those who generated it.'}
      </div>
    </div>
  </div>
)

if(seccion===16) return (
<div>
<div style={s.titulo}>{lang==='es'?'Riesgos y mitigación':'Risks & Mitigation'}</div>
{(lang==='es'?[
{r:'Adicionalidad para generadores obligados',n:'ALTO',c:'#ef4444',m:'Consulta con desarrolladores de carbono antes de definir el límite del proyecto. El modelo de ingresos no depende del carbono en las primeras etapas.'},
{r:'Metodología no aprobada para el proyecto',n:'MEDIO',c:'#f59e0b',m:'Se empieza con una sola metodología (orgánicos, AMS-III.F) y un desarrollador de carbono con experiencia en Verra.'},
{r:'Dependencia de una planta aliada',n:'MEDIO',c:'#f59e0b',m:'Dos formas de trabajar: acuerdo con un acopiador habilitado o inscripción propia de OLIVIA como acopiador.'},
{r:'Caída del precio del carbono voluntario',n:'MEDIO',c:'#f59e0b',m:'Los primeros ingresos vienen de consultoría y software para generadores y del servicio de datos para plantas.'},
]:[
{r:'Additionality for obligated generators',n:'HIGH',c:'#ef4444',m:'Consulting carbon developers before defining the project boundary. The revenue model does not depend on carbon in the early stages.'},
{r:'Methodology not approved for the project',n:'MEDIUM',c:'#f59e0b',m:'Start with a single methodology (organics, AMS-III.F) and a carbon developer experienced with Verra.'},
{r:'Dependence on a partner plant',n:'MEDIUM',c:'#f59e0b',m:'Two ways to work: agreement with a licensed collector or OLIVIA registering as a collector.'},
{r:'Voluntary carbon price drop',n:'MEDIUM',c:'#f59e0b',m:'First revenues come from consulting and software for generators and the data service for plants.'},
]).map(r=>(
<div key={r.r} style={{...s.card,borderLeft:`3px solid ${r.c}`}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:6,flexWrap:'wrap',gap:6}}>
<div style={{fontSize:12,fontWeight:700,color:r.c}}>{r.r}</div>
<span style={{fontSize:9,color:r.c,background:`${r.c}22`,padding:'2px 6px',borderRadius:10,fontWeight:700}}>{r.n}</span>
</div>
<div style={s.p}><strong style={{color:text}}>{lang==='es'?'Mitigación:':'Mitigation:'}</strong> {r.m}</div>
</div>
))}
</div>
)

if(seccion===17) return (
<div>
<div style={s.titulo}>{lang==='es'?'Marco legal y regulatorio':'Legal & Regulatory Framework'}</div>
{(lang==='es'?[
{t:'Ley de Economía del Conocimiento 27.506',d:'Ganancias al 15% (vs 35% estándar). Reducción del 70-80% en cargas patronales. FONDCE — fondo de crédito fiscal. Estabilidad fiscal por 10 años. Software y servicios de IA califican.',c:'#22c55e'},
{t:'Distrito Tecnológico — Buenos Aires',d:'Circulab Tech opera desde el Distrito Tecnológico de Buenos Aires — operativo desde 2008 bajo Ley CABA 2.972 · vigente hasta 2035. Acceso a financiamiento, mentorías y red del ecosistema tech de Buenos Aires.',c:'#3b82f6'},
{t:'Tokens OLV — naturaleza jurídica',d:'Activos ambientales digitales respaldados por comportamiento verificado. No son valores mobiliarios ni moneda de curso legal. No regulados por CNV. Su valor depende del mercado de carbono voluntario.',c:'#f59e0b'},
{t:'Privacidad y datos',d:'Cumplimiento con Ley 25.326 de Protección de Datos. GPS exacto visible solo para el admin. Solo el barrio general visible en perfiles públicos. Política completa en oliviacirculab.com.ar/privacidad.',c:'#a855f7'},
{t:'Estructura societaria recomendada',d:'SAS bajo Ley 27.349. Dual class shares A (fundadores, 10 votos) y B (inversores, 1 voto). Liquidation preference 1× no participante. Sin costos fijos hasta inversión comprometida.',c:'#22c55e'},
{t:'Acuerdo de París — Art. 6.4',d:'Mecanismo para transferencia de créditos entre países. Argentina como firmante puede vender créditos generados en su territorio. OLIVIA en Fase 4 opera en este mercado regulado — el más estable.',c:'#3b82f6'},
]:[
{t:'Knowledge Economy Law 27.506',d:'15% income tax (vs 35% standard). 70-80% payroll reduction. FONDCE — fiscal credit fund. 10-year fiscal stability. Software and AI services qualify.',c:'#22c55e'},
{t:'Distrito Tecnológico · Buenos Aires',d:'Circulab Tech opera en el Distrito Tecnológico de Parque Patricios (Ley CABA 2.972 · operativo desde 2008 · vigente hasta 2035). Exención 100% IIBB · Sellos · ABL. Complementa y se acumula sobre los beneficios de la Ley 27.506 nacional. El Distrito Tecnológico del Microcentro está actualmente en tramitación en la Legislatura porteña y aún no está operativo.',c:'#3b82f6'},
{t:'OLV Tokens — legal nature',d:'Digital environmental assets backed by verified behavior. Not securities or legal tender. Not regulated by CNV. Value depends on the voluntary carbon market.',c:'#f59e0b'},
{t:'Privacy and data',d:'Compliance with Law 25.326 on Data Protection. Exact GPS visible only to admin. Only general neighborhood visible in public profiles. Full policy at oliviacirculab.com.ar/privacidad.',c:'#a855f7'},
{t:'Recommended corporate structure',d:'SAS under Law 27.349. Dual class shares A (founders, 10 votes) and B (investors, 1 vote). 1× non-participating liquidation preference. No fixed costs until investment committed.',c:'#22c55e'},
{t:'Paris Agreement — Art. 6.4',d:'Mechanism for credit transfer between countries. Argentina as signatory can sell credits generated in its territory. OLIVIA in Phase 4 operates in this regulated market — the most stable.',c:'#3b82f6'},
]).map(i=>(
<div key={i.t} style={{...s.card,borderLeft:`3px solid ${i.c}`}}>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

return null
}

return (
<div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.2s'}}>
<div style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}}>
<a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
<div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
<div>
<div style={{fontSize:13,fontWeight:800,color:text}}>OLIVIA Circulab</div>
<div style={{fontSize:9,color:'#22c55e'}}>Whitepaper v3.0 · {lang==='es'?'Septiembre':'September'} 2026</div>
</div>
</a>
<div style={{display:'flex',gap:6,alignItems:'center'}}>
<button onClick={()=>setLang(lang==='es'?'en':'es')} style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>{lang==='es'?'EN':'ES'}</button>
<button onClick={()=>setDark(!dark)} style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>{dark?'☀️':'🌙'}</button>
<a href="/pitch" style={{fontSize:11,color:'#64748b',textDecoration:'none'}}>{lang==='es'?'Ver pitch →':'See pitch →'}</a>
<button onClick={()=>window.print()} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:6,padding:'5px 12px',color:'white',fontSize:11,fontWeight:700,cursor:'pointer'}}>📥 {lang==='es'?'Descargar PDF':'Download PDF'}</button>
</div>
</div>

<div style={{display:'flex',gap:4,padding:'8px 16px',borderBottom:`1px solid ${border}`,overflowX:'auto',background:dark?'#080c16':'#e8ecf0'}}>
{VISIBLES.map(i=>{const sec=SECCIONES[i];return (
<button key={i} onClick={()=>setSeccion(i)}
style={{padding:'5px 10px',borderRadius:8,border:'none',cursor:'pointer',fontSize:10,fontWeight:seccion===i?700:400,background:seccion===i?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.04)',color:seccion===i?'#22c55e':'#64748b',whiteSpace:'nowrap'}}>
{sec}
</button>
)})}
</div>

<div style={{padding:'20px',maxWidth:640,margin:'0 auto'}}>
{contenido()}
<div style={{display:'flex',justifyContent:'space-between',marginTop:24,paddingTop:16,borderTop:`1px solid ${border}`}}>
<button onClick={()=>{setSeccion(VISIBLES[Math.max(0,pos-1)]);window.scrollTo(0,0)}} disabled={seccion===0}
style={{background:seccion===0?'rgba(255,255,255,0.02)':'rgba(255,255,255,0.08)',border:`1px solid ${border}`,borderRadius:10,padding:'10px 20px',color:seccion===0?sub:text,fontSize:13,cursor:seccion===0?'not-allowed':'pointer'}}>
← {lang==='es'?'Anterior':'Previous'}
</button>
<div style={{fontSize:11,color:sub,alignSelf:'center'}}>{pos+1} / {VISIBLES.length}</div>
<button onClick={()=>{setSeccion(VISIBLES[Math.min(VISIBLES.length-1,pos+1)]);window.scrollTo(0,0)}} disabled={pos===VISIBLES.length-1}
style={{background:pos===VISIBLES.length-1?'rgba(255,255,255,0.02)':'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'10px 20px',color:pos===VISIBLES.length-1?sub:'white',fontSize:13,cursor:pos===VISIBLES.length-1?'not-allowed':'pointer'}}>
{lang==='es'?'Siguiente':'Next'} →
</button>
</div>
<div style={{marginTop:20,textAlign:'center'}}>
<a href="/pitch" style={{fontSize:12,color:'#22c55e',textDecoration:'none',fontWeight:600}}>{lang==='es'?'Ver pitch deck →':'View pitch deck →'}</a>
<span style={{color:sub,margin:'0 8px'}}>·</span>
<a href="mailto:hola@oliviacirculab.com.ar" style={{fontSize:12,color:sub,textDecoration:'none'}}>hola@oliviacirculab.com.ar</a>
</div>
</div>
</div>
)
}
