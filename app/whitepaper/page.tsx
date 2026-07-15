'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const SECCIONES_ES = [
'📋 Resumen ejecutivo','🔴 El problema','🌿 La solución OLIVIA','🔬 Arquitectura dMRV',
'📜 Certificación multi-metodológica','🪙 Tokenómica OLV','👥 Los 8 segmentos',
'💰 Las 5 fuentes de valor','🌍 Los 7 mercados','🤝 Modelo de convenios',
'🔄 Incentivos cruzados','🚛 Recolección coordinada con IA','🌱 Los 6 tramos del ecosistema',
'🌱 Familia OLIVIA','👨‍💻 Equipo y tecnología','📈 Ronda Seed 2026',
'⚠️ Riesgos y mitigación','🏛️ Marco legal',
]

const SECCIONES_EN = [
'📋 Executive Summary','🔴 The Problem','🌿 OLIVIA Solution','🔬 dMRV Architecture',
'📜 Multi-methodology Certification','🪙 OLV Tokenomics','👥 8 Customer Segments',
'💰 5 Value Sources','🌍 7 Token Markets','🤝 Partnership Model',
'🔄 Cross Incentives','🚛 AI-Coordinated Collection','🌱 The 6 Ecosystem Stages',
'🌱 OLIVIA Family','👨‍💻 Team & Technology','📈 Seed Round 2026',
'⚠️ Risks & Mitigation','🏛️ Legal Framework',
]

export default function Whitepaper() {
const [lang, setLang] = useState<'es'|'en'>('es')
const [dark, setDark] = useState(true)
const [seccion, setSeccion] = useState(0)
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

if(!ndaFirmado) return (
<div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
<div style={{width:'100%',maxWidth:420}}>
<div style={{textAlign:'center',marginBottom:24}}>
<div style={{width:56,height:56,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:'white',margin:'0 auto 12px'}}>O</div>
<div style={{fontSize:20,fontWeight:900,color:text,marginBottom:4}}>{lang==='es'?'Whitepaper Técnico':'Technical Whitepaper'}</div>
<div style={{fontSize:12,color:sub,marginBottom:4}}>OLIVIA Circulab · {lang==='es'?'Junio':'June'} 2026</div>
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
<div style={s.p}>{lang==='es'?'La primera infraestructura de datos ambientales ciudadanos de América Latina — que convierte residuos domiciliarios en créditos de carbono verificados con IA, utilizando una arquitectura multi-metodológica con una certificadora específica por tipo de material.':'The first citizen environmental data infrastructure in Latin America — converting household waste into AI-verified carbon credits, using a multi-methodology architecture with a specific certifier per material type.'}</div>
</div>
{(lang==='es'?[
{t:'El problema',d:'6.000t de residuos/día solo en CABA. El 85% va al relleno sin separar. USD 0 capturado en carbono ciudadano. Un mercado de USD 4.5B en LATAM completamente sin tocar.',c:'#ef4444'},
{t:'La solución',d:'OLIVIA digitaliza, verifica con IA y certifica el reciclaje ciudadano. Cada kilo genera tokens OLV que se convierten en créditos de carbono certificables bajo distintos estándares internacionales según el tipo de material.',c:'#22c55e'},
{t:'El producto hoy',d:'App web en producción en oliviacirculab.com.ar. Registro con foto + GPS + IA (Cloudflare Workers AI). Dashboard con OLV y CO2eq. Red social activa con comunidad. Sistema de amigos y seguimiento. Admin con dMRV. Construido con USD 0 de inversión externa.',c:'#3b82f6'},
{t:'Ecosistema de incentivos cruzados',d:'Las tres verticales de Circulab Tech (OLIVIA, PULSO/Quincena y Art of Money) se financian entre sí usando OLV como moneda interna antes de monetizar hacia afuera. Convenios con terceros que aceptan OLV acumulan activos ambientales que se convierten en USD cuando Verra certifique en 2027.',c:'#a855f7'},
{t:'La ronda',d:'Seed 2026. Opción A: USD 500K por 10% · USD 4.5M pre. Opción B: USD 2M por 15% · USD 11.3M pre. Primer uso: CTO + auditoría + certificación Verra VM0036.',c:'#f59e0b'},
{t:'Distrito Tecnológico y Ley 27.506',d:'Circulab Tech opera desde el Distrito Tecnológico de Buenos Aires. Bajo la Ley de Economía del Conocimiento 27.506: ganancias al 15%, reducción 70-80% cargas patronales, FONDCE, estabilidad fiscal 10 años. Cada USD 1 invertido vale USD 1.4 efectivos.',c:'#22c55e'},
{t:lang==='es'?'Fundamentos científicos':'Scientific foundations',d:lang==='es'?'Ostrom (Nobel 2009): comunidades con monitoreo verificable gestionan mejor los bienes comunes. Fuller: la contaminación son recursos sin cosechar. Prigogine (Nobel 1977): sistemas vivos hacia menor entropía. Maturana y Varela: autopoiesis — sistemas que se producen a sí mismos. OLIVIA aplica estos principios a la economía circular urbana.':'Ostrom (Nobel 2009): communities with verifiable monitoring manage commons better. Fuller: pollution is resources not harvested. Prigogine (Nobel 1977): living systems toward lower entropy. Maturana & Varela: autopoiesis — systems that produce themselves. OLIVIA applies these principles to urban circular economy.',c:'#3b82f6'},
]:[
{t:'The Problem',d:'6,000t of waste/day in Buenos Aires alone. 85% goes to landfill unsorted. USD 0 captured in citizen carbon. A USD 4.5B LATAM market completely untouched.',c:'#ef4444'},
{t:'The Solution',d:'OLIVIA digitalizes, AI-verifies and certifies citizen recycling. Each kilo generates OLV tokens that become certifiable carbon credits under different international standards per material type.',c:'#22c55e'},
{t:'The Product Today',d:'Web app in production at oliviacirculab.com.ar. Registration with photo + GPS + AI (Cloudflare Workers AI). OLV and CO2eq dashboard. Active social network with community. Friends and following system. Admin with dMRV. Built with USD 0 external investment.',c:'#3b82f6'},
{t:'Cross-incentive ecosystem',d:'The three Circulab Tech verticals (OLIVIA, PULSO/Quincena and Art of Money) finance each other using OLV as internal currency before monetizing externally. Third-party partners who accept OLV accumulate environmental assets that convert to USD when Verra certifies in 2027.',c:'#a855f7'},
{t:'The Round',d:'Seed 2026. Option A: USD 500K for 10% · USD 4.5M pre. Option B: USD 2M for 15% · USD 11.3M pre. First use: CTO + audit + Verra VM0036 certification.',c:'#f59e0b'},
{t:'Distrito Tecnológico & Ley 27.506',d:'Circulab Tech opera en el Distrito Tecnológico de Buenos Aires (Ley 2.972 · operativo desde 2008 · vigente hasta 2035). Bajo la Ley de Economía del Conocimiento 27.506: ganancias al 15%, reducción 70-80% cargas patronales, FONDCE, estabilidad fiscal 10 años. Nota: el Distrito Tecnológico del Microcentro está actualmente en tramitación legislativa y aún no está operativo.',c:'#22c55e'},
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
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
{[
{stat:'6.000t',desc:lang==='es'?'residuos/día en CABA':'waste/day in Buenos Aires',c:'#ef4444'},
{stat:'85%',desc:lang==='es'?'va al relleno sin separar':'goes to landfill unsorted',c:'#ef4444'},
{stat:'USD 0',desc:lang==='es'?'capturado en carbono ciudadano':'captured in citizen carbon',c:'#f59e0b'},
{stat:'USD 4.5B',desc:lang==='es'?'mercado carbono LATAM sin tocar':'untouched LATAM carbon market',c:'#22c55e'},
].map(k=>(
<div key={k.stat} style={{...s.card,textAlign:'center',borderTop:`3px solid ${k.c}`}}>
<div style={{fontSize:24,fontWeight:900,color:k.c}}>{k.stat}</div>
<div style={{fontSize:10,color:sub,marginTop:4}}>{k.desc}</div>
</div>
))}
</div>
{(lang==='es'?[
{t:'El relleno como sumidero de valor',d:'Cada kilo de orgánico en el relleno genera 0.065 kg de metano — 84 veces más potente que el CO2. Argentina genera 16 millones de toneladas de RSU por año. El 85% termina en rellenos. Nadie captura ese valor.',c:'#ef4444'},
{t:'La paradoja del reciclador',d:'Los ciudadanos que separan hacen trabajo de alto impacto ambiental pero no reciben beneficio económico. Las cooperativas capturan el valor de los materiales pero no del carbono. Los municipios pagan millones sin capturar el valor generado.',c:'#f59e0b'},
{t:'El mercado de carbono sin tocar',d:'El mercado voluntario en LATAM vale USD 4.5B y crece al 30% anual. Los proyectos de reciclaje urbano ciudadano son prácticamente inexistentes porque no hay infraestructura de verificación a escala. OLIVIA es esa infraestructura.',c:'#22c55e'},
{t:'La asimetría de información',d:'Las certificadoras como Verra necesitan datos verificados y trazables. Los ciudadanos los generan todos los días pero no tienen forma de registrarlos. OLIVIA cierra esa brecha.',c:'#3b82f6'},
]:[
{t:'Landfill as a value sink',d:'Every kilo of organic waste in landfill generates 0.065 kg of methane — 84 times more potent than CO2. Argentina generates 16 million tons of MSW per year. 85% ends in landfills. Nobody captures that value.',c:'#ef4444'},
{t:'The recycler paradox',d:'Citizens who sort waste do high-impact environmental work but receive no economic benefit. Cooperatives capture material value but not carbon value. Municipalities pay millions without capturing the generated value.',c:'#f59e0b'},
{t:'The untouched carbon market',d:'The voluntary market in LATAM is worth USD 4.5B and grows 30% annually. Urban citizen recycling projects are virtually nonexistent because there is no verification infrastructure at scale. OLIVIA is that infrastructure.',c:'#22c55e'},
{t:'The information asymmetry',d:'Certifiers like Verra need verified, traceable data. Citizens generate that data every day but have no way to record it. OLIVIA closes that gap.',c:'#3b82f6'},
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
<div style={s.p}>{lang==='es'?'OLIVIA no es una app de reciclaje con puntos. Es la primera infraestructura de datos ambientales ciudadanos de América Latina. Cada residuo verificado produce un crédito certificable, un dato verificado, un activo financiero real y un comportamiento registrado.':'OLIVIA is not a recycling app with points. It is the first citizen environmental data infrastructure in Latin America. Every verified waste item produces a certifiable credit, a verified data point, a real financial asset and a recorded behavior.'}</div>
</div>
{(lang==='es'?[
{icon:'📸',t:'Registro ciudadano',d:'El ciudadano registra su residuo desde su celular. Foto de origen + foto de entrega con GPS. La primera foto es referencial — los tokens OLV se acreditan solo con la segunda foto que confirma la disposición final.',c:'#22c55e'},
{icon:'🤖',t:'Verificación con IA',d:'Cloudflare Workers AI (LLaVA 1.5 13B) analiza la foto: tipo de residuo, peso estimado con moneda de referencia, calidad de separación, posibles contaminantes. Resultado: VALIDAR / REVISAR / RECHAZAR con nivel de confianza. 10.000 análisis/día gratuitos.',c:'#3b82f6'},
{icon:'📍',t:'Trazabilidad GPS completa',d:'GPS de origen y GPS de entrega. La cadena de custodia es verificable: quién generó qué, cuándo, dónde y adónde fue. Eso hace el crédito certificable.',c:'#f59e0b'},
{icon:'🪙',t:'Generación de tokens OLV',d:'Cada kilo verificado genera tokens OLV taggeados por tipo de material y metodología de certificación. Los tokens se acreditan cuando se confirma la disposición final.',c:'#a855f7'},
{icon:'🌍',t:'Certificación multi-metodológica',d:'Una certificadora específica por tipo de material. Orgánico → Verra VM0036. Plástico → Gold Standard. Metal → CAR. Nunca se mezclan en un mismo batch.',c:'#22c55e'},
]:[
{icon:'📸',t:'Citizen registration',d:'The citizen registers their waste from their phone. Origin photo + delivery photo with GPS. The first photo is reference only — OLV tokens are credited only with the second photo confirming final disposal.',c:'#22c55e'},
{icon:'🤖',t:'AI verification',d:'Cloudflare Workers AI (LLaVA 1.5 13B) analyzes the photo: waste type, estimated weight using coin reference, separation quality, possible contaminants. Result: VALIDATE / REVIEW / REJECT with confidence level. 10,000 analyses/day free.',c:'#3b82f6'},
{icon:'📍',t:'Full GPS traceability',d:'Origin GPS and delivery GPS. The chain of custody is verifiable: who generated what, when, where and where it went. That makes the credit certifiable.',c:'#f59e0b'},
{icon:'🪙',t:'OLV token generation',d:'Each verified kilo generates OLV tokens tagged by material type and certification methodology. Tokens are credited when final disposal is confirmed.',c:'#a855f7'},
{icon:'🌍',t:'Multi-methodology certification',d:'One specific certifier per material type. Organic → Verra VM0036. Plastic → Gold Standard. Metal → CAR. Never mixed in the same batch.',c:'#22c55e'},
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
{t:'Por qué el dMRV ciudadano es nuevo',d:'Los proyectos dMRV existentes son forestales o industriales. El dMRV ciudadano a escala residencial es prácticamente inexistente en LATAM. OLIVIA es la primera infraestructura que lo hace posible con teléfonos celulares y IA gratuita.',c:'#3b82f6'},
]:[
{t:'M — Monitoring',d:'Each registration includes: material type, AI-estimated weight, origin photo, origin GPS, date and time, verified identity. Cloudflare Workers AI analyzes in real time with high/medium/low confidence level.',c:'#22c55e'},
{t:'R — Reporting',d:'Each batch is grouped by material type and period. Data is consolidated into exportable reports (CSV, PDF) that meet the format required by Verra and Gold Standard.',c:'#3b82f6'},
{t:'V — Verification',d:'The second GPS photo confirms final disposal. Admin validates manually. AI recommends VALIDATE/REVIEW/REJECT. Only validated ones generate credited OLV.',c:'#f59e0b'},
{t:'Distributed validation nodes — Phase 3',d:'In Phase 3, certified citizen validators are incorporated — neighborhood verifiers who confirm deliveries in their area in exchange for additional OLV. This decentralizes validation, reduces central admin load and generates a territorial trust network. Each node validates maximum 50 records/day to prevent collusion.',c:'#a855f7'},
{t:'Data structure per registration',d:'type | methodology | batch_id | olv_generated | verified | gps_origin [lat,lng] | gps_delivery [lat,lng] | photo_origin url | photo_delivery url | ai_weight_kg | ai_confidence | validated_by admin_id | validator_node_id',c:'#22c55e'},
{t:'Why citizen dMRV is new',d:'Existing dMRV projects are forestry or industrial. Citizen dMRV at residential scale is virtually nonexistent in LATAM. OLIVIA is the first infrastructure that makes it possible with mobile phones and free AI.',c:'#3b82f6'},
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
<div style={s.titulo}>{lang==='es'?'Arquitectura de certificación':'Multi-methodology Certification'}</div>
<div style={{...s.highlight,border:'1px solid rgba(239,68,68,0.2)',background:'rgba(239,68,68,0.06)'}}>
<div style={s.rojo}>{lang==='es'?'⚠️ Una certificadora por tipo de material — nunca mixto':'⚠️ One certifier per material type — never mixed'}</div>
<div style={s.p}>{lang==='es'?'El mercado internacional requiere estándares específicos por material. OLIVIA usa una metodología distinta para cada tipo de residuo. Los tokens OLV están taggeados por metodología para que el comprador B2B elija exactamente qué tipo de crédito compra.':'The international market requires specific standards per material. OLIVIA uses a different methodology for each waste type. OLV tokens are tagged by methodology so the B2B buyer chooses exactly which type of credit they buy.'}</div>
</div>
<div style={{...s.highlight,border:'1px solid rgba(34,197,94,0.2)',background:'rgba(34,197,94,0.06)',marginBottom:12}}>
<div style={s.verde}>{lang==='es'?'Programme of Activities (PoA) — la figura clave':'Programme of Activities (PoA) — the key structure'}</div>
<div style={s.p}>{lang==='es'?'OLIVIA opera como PoA (Programme of Activities) bajo Verra y Gold Standard. Esto permite agregar múltiples proyectos ciudadanos bajo una sola certificación, reduciendo el costo de auditoría y haciendo viable la escala mínima de ~500t/año requerida por las certificadoras. El hito Verra dMRV de febrero 2026 valida exactamente este modelo para datos ciudadanos de alta frecuencia.':'OLIVIA operates as a PoA (Programme of Activities) under Verra and Gold Standard. This allows aggregating multiple citizen projects under a single certification, reducing audit costs and making viable the minimum scale of ~500t/year required by certifiers. The Verra dMRV milestone of February 2026 validates exactly this model for high-frequency citizen data.'}</div>
</div>
<div style={{...s.highlight,border:'1px solid rgba(245,158,11,0.2)',background:'rgba(245,158,11,0.06)',marginBottom:12}}>
<div style={{fontSize:11,fontWeight:700,color:'#f59e0b',marginBottom:6}}>{lang==='es'?'Artículo 6.4 del Acuerdo de París — Bosque 2028+':'Paris Agreement Article 6.4 — Bosque 2028+'}</div>
<div style={s.p}>{lang==='es'?'El tramo Bosque 2028 contempla el acceso al mercado regulado de la ONU (PACM · Art. 6.4). Para que esto ocurra se requiere que se den una o más de las siguientes condiciones: (a) que Argentina presente su NDC 3.0 y adhiera al mecanismo PACM, (b) que OLIVIA expanda al corredor LATAM (Chile · Colombia · Perú · Costa Rica) que ya participan en Art. 6 y registre proyectos en esos países, o (c) que se apruebe una metodología PACM específica para reciclaje doméstico urbano (actualmente en desarrollo). El mercado voluntario Verra VCS (Árbol 2027) no requiere ninguna de estas condiciones y es el camino principal de certificación. La tokenización de créditos Verra VCS se puede realizar desde Argentina con Toucan Protocol o Moss.earth sin autorización estatal.':'The Bosque 2028 stage contemplates access to the UN regulated market (PACM · Art. 6.4). For this to occur, one or more of the following conditions must be met: (a) Argentina presents its NDC 3.0 and joins the PACM mechanism, (b) OLIVIA expands to the LATAM corridor (Chile · Colombia · Peru · Costa Rica) that already participate in Art. 6 and registers projects there, or (c) a specific PACM methodology for urban household recycling is approved (currently in development). The Verra VCS voluntary market (Árbol 2027) does not require any of these conditions and is the main certification path. Tokenization of Verra VCS credits can be done from Argentina with Toucan Protocol or Moss.earth without state authorization.'}</div>
</div>
<div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
{[
{icon:'🌿',tipo:lang==='es'?'Orgánico':'Organic',cert:'Verra AMS-III.AJ + VMR0007',factor:'1.8 kg CO2eq/kg',precio:'USD 22/t',color:'#22c55e',fase:lang==='es'?'Árbol 2027':'Árbol 2027'},
{icon:'♻️',tipo:lang==='es'?'Plástico':'Plastic',cert:'GS Solid Waste v1.0',factor:'1.5 kg CO2eq/kg',precio:'USD 20/t',color:'#3b82f6',fase:lang==='es'?'Árbol 2027':'Árbol 2027'},
{icon:'📄',tipo:lang==='es'?'Papel':'Paper',cert:'Gold Standard AMS-III.AJ',factor:'0.9 kg CO2eq/kg',precio:'USD 18/t',color:'#f59e0b',fase:lang==='es'?'Árbol 2027':'Árbol 2027'},
{icon:'🔩',tipo:lang==='es'?'Metal':'Metal',cert:'Verra AMS-III.AJ',factor:'8.0 kg CO2eq/kg',precio:'USD 35/t',color:'#ef4444',fase:lang==='es'?'Árbol 2027':'Árbol 2027'},
{icon:'🛢️',tipo:lang==='es'?'Aceite':'Oil',cert:'Verra AMS-III.AK (solo si va a planta biodiesel)',factor:'2.5 kg CO2eq/kg',precio:'USD 25/t',color:'#f97316',fase:lang==='es'?'Bosque 2028':'Bosque 2028'},
{icon:'👕',tipo:lang==='es'?'Textil':'Textile',cert:lang==='es'?'Sin metodología madura · En desarrollo':'No mature methodology · In development',factor:'5.5 kg CO2eq/kg',precio:lang==='es'?'TBD':'TBD',color:'#ec4899',fase:lang==='es'?'Pendiente':'Pending'},
{icon:'🍾',tipo:lang==='es'?'Vidrio':'Glass',cert:'Verra AMS-III.AJ',factor:'0.3 kg CO2eq/kg',precio:'USD 15/t',color:'#a855f7',fase:lang==='es'?'Árbol 2027':'Árbol 2027'},
{icon:'🍃',tipo:lang==='es'?'Hojas/Ramas':'Leaves/Branches',cert:'GS Solid Waste v1.0',factor:'2.1 kg CO2eq/kg',precio:'USD 20/t',color:'#22c55e',fase:lang==='es'?'Árbol 2027':'Árbol 2027'},
].map(r=>(
<div key={r.tipo} style={{...s.card,borderLeft:`3px solid ${r.color}`}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
<div style={{display:'flex',gap:8,alignItems:'center'}}>
<span style={{fontSize:20}}>{r.icon}</span>
<div>
<div style={{fontSize:13,fontWeight:700,color:r.color}}>{r.tipo}</div>
<div style={{fontSize:10,color:sub}}>{r.cert}</div>
</div>
</div>
<div style={{textAlign:'right'}}>
<div style={{fontSize:11,fontWeight:700,color:r.color}}>{r.precio}</div>
<div style={{fontSize:9,color:sub}}>{r.factor}</div>
<div style={{fontSize:9,color:'#22c55e',marginTop:2}}>{r.fase}</div>
</div>
</div>
</div>
))}
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
{t:'Distribución del crédito',d:'50% OLIVIA Circulab · 35% ciudadano generador · 10% recolector/cooperativa · 5% fondo de reserva ecosistema. En consorcios: consorcio 20% + vecino 15% + recolector 10% + reserva 5% + OLIVIA 50%.',c:'#f59e0b'},
{t:'Los que empiezan hoy',d:'Los OLV acumulados en Fase 1 mantienen su valor en Fase 3. Un usuario que acumula 50.000 OLV en 18 meses tiene un historial más valioso que quien empieza en Fase 3. El tiempo de participación es el activo más valioso.',c:'#a855f7'},
{t:'Convenios como inversión diferida',d:'Las empresas partner que aceptan OLV reciben una cuenta por cobrar en activos ambientales. Cuando OLIVIA certifique en 2027, convierten sus OLV en dinero real. No es descuento — es inversión.',c:'#22c55e'},
]:[
{t:'OLV generation',d:'Formula: kg × material CO2eq factor × 100 = OLV. Example: 1 kg metal × 8.0 × 100 = 800 OLV. Credited when admin validates delivery photo — never origin photo.',c:'#22c55e'},
{t:'3 OLV value layers',d:'Layer 1 — Utility (Semilla/Brote): verified environmental history, redeemable for partner services. Layer 2 — Carbon (Árbol 2027): conversion to Verra VCS voluntary credits, real USD, no state authorization required. Layer 3 — Financial (Bosque 2028+): access to UN regulated market Art. 6.4, subject to Argentina joining or LATAM corridor expansion (Chile · Colombia · Peru). Verra VCS tokenization possible from Argentina with Toucan/Moss without state authorization.',c:'#3b82f6'},
{t:'Credit distribution',d:'50% OLIVIA Circulab · 35% generating citizen · 10% collector/cooperative · 5% ecosystem reserve fund. In buildings: building 20% + neighbor 15% + collector 10% + reserve 5% + OLIVIA 50%.',c:'#f59e0b'},
{t:'Those who start today',d:'OLV accumulated in Phase 1 maintain their value in Phase 3. A user who accumulates 50,000 OLV in 18 months has a more valuable history than someone starting in Phase 3.',c:'#a855f7'},
{t:'Partnerships as deferred investment',d:'Partner companies that accept OLV receive a receivable in environmental assets. When OLIVIA certifies in 2027, they convert OLV to real money. Not a discount — an investment.',c:'#22c55e'},
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
<div style={s.titulo}>{lang==='es'?'Los 6 tramos del ecosistema':'The 6 Ecosystem Stages'}</div>
<div style={{...s.highlight,marginBottom:16}}>
<div style={s.verde}>{lang==='es'?'Como un árbol — de semilla a selva':'Like a tree — from seed to jungle'}</div>
<div style={s.p}>{lang==='es'?'Los que entran hoy en Semilla cobran primero en Árbol. En Fase 1 los OLV no tienen valor monetario. El mercado los compra en Fase 3 si se logra la certificación Verra. OLIVIA no paga — facilita.':'Those who enter today in Seed earn first in Tree. In Phase 1 OLV have no monetary value. The market buys them in Phase 3 if Verra certification is achieved. OLIVIA doesn\'t pay — it facilitates.'}</div>
</div>
{(lang==='es'?[
{fase:'Fase 1',año:'2026 · Activa ahora',color:'#22c55e',items:['Piloto dMRV en CABA con usuarios reales','App web con verificación IA (Cloudflare Workers AI)','Tokens OLV acumulándose desde el día 1','Red social OLIVIA activa con comunidad','Sistema de amigos y seguimiento','Admin con CRM y validación dMRV','Encuesta de mercado con datos reales']},
{fase:'Fase 2',año:'Q4 2026',color:'#3b82f6',items:['Primeros convenios con empresas partner','OLV canjeables por servicios reales','Módulo de transporte con rutas IA','3 consorcios piloto activos en CABA','Wallet empresarial para partners','Primeros nodos de validación ciudadana']},
{fase:'Fase 3',año:'2027',color:'#f59e0b',items:['CTO + auditoría de código (mes 1-2 post-inversión)','Certificación Verra VM0036 — orgánico','Primer batch de créditos certificados','Primer pago en USD a usuarios pioneros','Gold Standard — plástico y papel','Nodos de validación distribuidos activos','Expansión México y Colombia','Serie A USD 5M']},
{fase:'Fase 4',año:'2028',color:'#a855f7',items:['Art. 6.4 del Acuerdo de París · USD 90/t','CAR metal · GS Textile textil','OLIVIA Exchange — intercambio de OLV','API para compradores B2B directos','Integración Art of Money + PULSO completa','Corredor LATAM completo: AR MX CO BR CH DO']},
]:[
{fase:'Phase 1',año:'2026 · Active now',color:'#22c55e',items:['dMRV pilot in Buenos Aires with real users','Web app with AI verification (Cloudflare Workers AI)','OLV tokens accumulating from day 1','Active OLIVIA social network with community','Friends and following system','Admin with CRM and dMRV validation','Market survey with real data']},
{fase:'Phase 2',año:'Q4 2026',color:'#3b82f6',items:['First partnerships with companies','OLV redeemable for real services','Transport module with AI routes','3 pilot buildings active','Corporate wallet for partners','First citizen validation nodes']},
{fase:'Phase 3',año:'2027',color:'#f59e0b',items:['CTO + code audit (months 1-2 post-investment)','Verra VM0036 certification — organic','First certified credit batch','First USD payment to pioneer users','Gold Standard — plastic and paper','Distributed validation nodes active','Expansion Mexico and Colombia','Series A USD 5M']},
{fase:'Phase 4',año:'2028',color:'#a855f7',items:['Paris Agreement Art. 6.4 · USD 90/t','CAR metal · GS Textile textile','OLIVIA Exchange — OLV trading','API for direct B2B buyers','Full Art of Money + PULSO integration','LATAM corridor: AR MX CO BR CH DO']},
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
<div style={s.verde}>{lang==='es'?'Construido con USD 0 · Distrito Tecnológico · Buenos Aires · Ley 27.506':'Built with USD 0 · Distrito Tecnológico · Buenos Aires · Law 27.506'}</div>
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
<div style={s.titulo}>{lang==='es'?'Ronda Seed 2026':'Seed Round 2026'}</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
<div style={{...s.card,textAlign:'center',borderTop:'3px solid #22c55e'}}>
<div style={{fontSize:11,color:sub,marginBottom:4}}>{lang==='es'?'Opción A':'Option A'}</div>
<div style={{fontSize:24,fontWeight:900,color:'#22c55e'}}>USD 500K</div>
<div style={{fontSize:11,color:sub,marginTop:4}}>10% equity</div>
<div style={{fontSize:10,color:sub}}>USD 4.5M pre-money</div>
</div>
<div style={{...s.card,textAlign:'center',borderTop:'3px solid #3b82f6'}}>
<div style={{fontSize:11,color:sub,marginBottom:4}}>{lang==='es'?'Opción B':'Option B'}</div>
<div style={{fontSize:24,fontWeight:900,color:'#3b82f6'}}>USD 2M</div>
<div style={{fontSize:11,color:sub,marginTop:4}}>15% equity</div>
<div style={{fontSize:10,color:sub}}>USD 11.3M pre-money</div>
</div>
</div>
{(lang==='es'?[
{t:'Estructura del deal',d:'Equity directo. Sin convertible note. Sin intereses. Sin ratchets. Dual class shares: Clase A fundadores (10 votos/acción) · Clase B inversores (1 voto/acción). Liquidation preference 1× no participante estándar.'},
{t:'Sin costos fijos hasta inversión comprometida',d:'Circulab Tech no incurrirá en gastos fijos hasta que la inversión esté formalmente comprometida y los fondos disponibles. Hasta ese momento el costo operativo es USD 0.'},
{t:lang==='es'?'Garantías para el inversor':'Investor guarantees',d:lang==='es'?'Seat en el board · Reporting mensual verificado · Milestone-based disbursement · Anti-dilution protection · Tag-along rights · Auditoría de código mes 1-2 post-inversión · Sin costos fijos hasta inversión comprometida.':'Board seat · Verified monthly reporting · Milestone-based disbursement · Anti-dilution protection · Tag-along rights · Code audit months 1-2 post-investment · No fixed costs until committed.'},
{t:'Ventajas fiscales — Ley 27.506',d:'Ganancias al 15% · Reducción 70-80% cargas patronales · FONDCE · Estabilidad fiscal 10 años. Circulab Tech opera desde el Distrito Tecnológico de Buenos Aires.'},
]:[
{t:'Deal structure',d:'Direct equity. No convertible note. No interest. No ratchets. Dual class shares: Class A founders (10 votes/share) · Class B investors (1 vote/share). Standard 1× non-participating liquidation preference.'},
{t:'No fixed costs until investment committed',d:'Circulab Tech will not incur fixed expenses until the investment is formally committed and funds are available. Until then, operating cost is USD 0.'},
{t:'Tax advantages — Law 27.506',d:'15% income tax · 70-80% payroll reduction · FONDCE · 10-year fiscal stability. Circulab Tech opera en el Distrito Tecnológico de Buenos Aires (Ley 2.972 · vigente hasta 2035).'},
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

    {/* Ronda Seed USD 500K */}
    <div style={{...s.card,borderLeft:'3px solid #22c55e',marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:900,color:'#22c55e',marginBottom:12}}>
        {lang==='es'?'Ronda Seed · USD 500K · 10% equity':'Seed Round · USD 500K · 10% equity'}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
        {(lang==='es'?[
          {anio:'2026 (inicio)',arr:'USD 24.000',val:'USD 144.000',part:'USD 14.400',roi:'Pre-revenue',c:'#64748b'},
          {anio:'2027 (Verra)',arr:'USD 176.750',val:'USD 1.060.000',part:'USD 106.000',roi:'0.2x',c:'#3b82f6'},
          {anio:'2028 (escala)',arr:'USD 1.230.000',val:'USD 7.380.000',part:'USD 738.000',roi:'1.5x ✅',c:'#f59e0b'},
          {anio:'2029 (LATAM)',arr:'USD 4.000.000',val:'USD 24.000.000',part:'USD 2.400.000',roi:'4.8x ✅✅',c:'#22c55e'},
          {anio:'2030 (emisores)',arr:'USD 10.000.000',val:'USD 60.000.000',part:'USD 6.000.000',roi:'12x ✅✅✅',c:'#22c55e'},
        ]:[
          {anio:'2026 (start)',arr:'USD 24,000',val:'USD 144,000',part:'USD 14,400',roi:'Pre-revenue',c:'#64748b'},
          {anio:'2027 (Verra)',arr:'USD 176,750',val:'USD 1,060,000',part:'USD 106,000',roi:'0.2x',c:'#3b82f6'},
          {anio:'2028 (scale)',arr:'USD 1,230,000',val:'USD 7,380,000',part:'USD 738,000',roi:'1.5x',c:'#f59e0b'},
          {anio:'2029 (LATAM)',arr:'USD 4,000,000',val:'USD 24,000,000',part:'USD 2,400,000',roi:'4.8x',c:'#22c55e'},
          {anio:'2030 (emitters)',arr:'USD 10,000,000',val:'USD 60,000,000',part:'USD 6,000,000',roi:'12x',c:'#22c55e'},
        ]).map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'1.5fr 1.5fr 1.5fr 1fr 1fr',gap:6,padding:'8px 10px',background:'rgba(255,255,255,0.02)',borderRadius:8,border:'1px solid rgba(255,255,255,0.04)'}}>
            <div style={{fontSize:10,fontWeight:700,color:row.c}}>{row.anio}</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>{row.arr}</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>{row.val}</div>
            <div style={{fontSize:10,color:row.c,fontWeight:700}}>{row.part}</div>
            <div style={{fontSize:10,color:row.c,fontWeight:900}}>{row.roi}</div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1.5fr 1.5fr 1fr 1fr',gap:6,padding:'0 10px'}}>
          {(lang==='es'?['Año','ARR','Valoracion 6x','10% inversor','ROI']:['Year','ARR','6x Valuation','10% investor','ROI']).map((h,i)=>(
            <div key={i} style={{fontSize:8,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
        {[
          {label:lang==='es'?'Break-even operativo':'Operational break-even',valor:'Mayo 2027',sub:lang==='es'?'11 meses post-cierre':'11 months post-close',c:'#22c55e'},
          {label:lang==='es'?'ROI equilibrio inversor':'Investor breakeven ROI',valor:'Fin 2028',sub:lang==='es'?'USD 738K sobre USD 500K':'USD 738K on USD 500K',c:'#f59e0b'},
          {label:'IRR ' + (lang==='es'?'ano 3':'year 3'),valor:'~70% anual',sub:lang==='es'?'Con Ley 27.506: ~95%':'With Law 27.506: ~95%',c:'#a855f7'},
        ].map((item,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + item.c + '22',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:'#64748b',marginBottom:4}}>{item.label}</div>
            <div style={{fontSize:12,fontWeight:900,color:item.c,marginBottom:2}}>{item.valor}</div>
            <div style={{fontSize:9,color:'#64748b'}}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Ronda Serie A USD 2M */}
    <div style={{...s.card,borderLeft:'3px solid #3b82f6',marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:900,color:'#3b82f6',marginBottom:4}}>
        {lang==='es'?'Ronda Serie A · USD 2M · ~17% equity':'Series A Round · USD 2M · ~17% equity'}
      </div>
      <div style={{fontSize:10,color:'#64748b',marginBottom:12}}>
        {lang==='es'
          ? 'Estimada para Q4 2027 post-certificacion Verra. Valoracion pre-money: USD 10M.'
          : 'Estimated for Q4 2027 post-Verra certification. Pre-money valuation: USD 10M.'}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
        {(lang==='es'?[
          {anio:'2028 (ano 1)',arr:'USD 1.230.000',val:'USD 7.380.000',part:'USD 1.254.600',roi:'0.6x',c:'#3b82f6'},
          {anio:'2029 (ano 2)',arr:'USD 3.800.000',val:'USD 22.800.000',part:'USD 3.876.000',roi:'1.9x ✅',c:'#f59e0b'},
          {anio:'2030 (ano 3)',arr:'USD 10.200.000',val:'USD 61.200.000',part:'USD 10.404.000',roi:'5.2x ✅✅',c:'#22c55e'},
          {anio:'2032 (ano 5)',arr:'USD 50.000.000',val:'USD 300.000.000',part:'USD 51.000.000',roi:'25.5x ✅✅✅',c:'#22c55e'},
        ]:[
          {anio:'2028 (year 1)',arr:'USD 1,230,000',val:'USD 7,380,000',part:'USD 1,254,600',roi:'0.6x',c:'#3b82f6'},
          {anio:'2029 (year 2)',arr:'USD 3,800,000',val:'USD 22,800,000',part:'USD 3,876,000',roi:'1.9x',c:'#f59e0b'},
          {anio:'2030 (year 3)',arr:'USD 10,200,000',val:'USD 61,200,000',part:'USD 10,404,000',roi:'5.2x',c:'#22c55e'},
          {anio:'2032 (year 5)',arr:'USD 50,000,000',val:'USD 300,000,000',part:'USD 51,000,000',roi:'25.5x',c:'#22c55e'},
        ]).map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'1.5fr 1.5fr 1.5fr 1fr 1fr',gap:6,padding:'8px 10px',background:'rgba(255,255,255,0.02)',borderRadius:8,border:'1px solid rgba(255,255,255,0.04)'}}>
            <div style={{fontSize:10,fontWeight:700,color:row.c}}>{row.anio}</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>{row.arr}</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>{row.val}</div>
            <div style={{fontSize:10,color:row.c,fontWeight:700}}>{row.part}</div>
            <div style={{fontSize:10,color:row.c,fontWeight:900}}>{row.roi}</div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1.5fr 1.5fr 1fr 1fr',gap:6,padding:'0 10px'}}>
          {(lang==='es'?['Año','ARR','Valoracion 6x','17% inversor','ROI']:['Year','ARR','6x Valuation','17% investor','ROI']).map((h,i)=>(
            <div key={i} style={{fontSize:8,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
        {[
          {label:lang==='es'?'Break-even operativo':'Operational break-even',valor:lang==='es'?'Ya alcanzado':'Already reached',sub:lang==='es'?'Antes de la Serie A':'Before Series A',c:'#22c55e'},
          {label:lang==='es'?'ROI equilibrio inversor':'Investor breakeven ROI',valor:lang==='es'?'Fin 2029':'End 2029',sub:lang==='es'?'USD 3.9M sobre USD 2M':'USD 3.9M on USD 2M',c:'#f59e0b'},
          {label:'IRR ' + (lang==='es'?'ano 3':'year 3'),valor:'~80% anual',sub:lang==='es'?'Escenario base conservador':'Conservative base scenario',c:'#a855f7'},
        ].map((item,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + item.c + '22',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:'#64748b',marginBottom:4}}>{item.label}</div>
            <div style={{fontSize:12,fontWeight:900,color:item.c,marginBottom:2}}>{item.valor}</div>
            <div style={{fontSize:9,color:'#64748b'}}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Tabla comparativa */}
    <div style={{...s.card,borderLeft:'3px solid #a855f7'}}>
      <div style={{fontSize:12,fontWeight:700,color:'#a855f7',marginBottom:12}}>
        {lang==='es'?'Comparativa Seed vs Serie A':'Seed vs Series A comparison'}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:8}}>
        {(lang==='es'?[
          ['','Seed USD 500K','Serie A USD 2M'],
          ['Momento','Hoy 2026','Post-Verra 2027'],
          ['Riesgo','Alto','Medio-bajo'],
          ['Break-even op.','Mayo 2027','Ya alcanzado'],
          ['Equity','10%','~17%'],
          ['Valor empresa ano 3','USD 24M','USD 61M'],
          ['Participacion ano 3','USD 2.4M','USD 10.4M'],
          ['ROI ano 3','4.8x','5.2x'],
          ['IRR ano 3','~70%','~80%'],
          ['Con Ley 27.506','~95% IRR','N/A si externo'],
        ]:[
          ['','Seed USD 500K','Series A USD 2M'],
          ['Timing','Today 2026','Post-Verra 2027'],
          ['Risk','High','Medium-low'],
          ['Op. break-even','May 2027','Already reached'],
          ['Equity','10%','~17%'],
          ['Company value yr 3','USD 24M','USD 61M'],
          ['Investor stake yr 3','USD 2.4M','USD 10.4M'],
          ['ROI year 3','4.8x','5.2x'],
          ['IRR year 3','~70%','~80%'],
          ['With Law 27.506','~95% IRR','N/A if external'],
        ]).map((row,i)=>(
          row[0]===''
            ? row.slice(1).map((h,j)=>(
                <div key={j} style={{fontSize:9,fontWeight:700,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.05em',padding:'4px 0'}}>{h}</div>
              ))
            : [
                <div key={0} style={{fontSize:10,color:'#64748b',padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[0]}</div>,
                <div key={1} style={{fontSize:10,color:'#22c55e',fontWeight:600,padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[1]}</div>,
                <div key={2} style={{fontSize:10,color:'#3b82f6',fontWeight:600,padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[2]}</div>,
              ]
        ))}
      </div>
      <div style={{marginTop:16,padding:'12px',background:'rgba(168,85,247,0.06)',border:'1px solid rgba(168,85,247,0.15)',borderRadius:10,fontSize:11,color:'#94a3b8',lineHeight:1.7,fontStyle:'italic'}}>
        {lang==='es'
          ? '"El inversor Seed toma mas riesgo y recibe el beneficio de la Ley 27.506 (USD 1 = USD 1.4 efectivos). El inversor Serie A entra con riesgo mucho menor pero sin el multiplicador fiscal. Ambos tienen ROI de 5x en el ano 3 con proyecciones conservadoras."'
          : '"The Seed investor takes more risk and receives the benefit of Law 27.506 (USD 1 = USD 1.4 effective). The Series A investor enters with much lower risk but without the fiscal multiplier. Both have 5x ROI in year 3 with conservative projections."'}
      </div>
    </div>
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
{r:'Complejidad operativa multi-metodológica',n:'MEDIO',c:'#f59e0b',m:'Fase 3 empieza con UNA sola certificación — Verra VM0036 orgánico. El CTO contratado en mes 1-2 audita y refactoriza el sistema para múltiples metodologías en paralelo.'},
{r:'Caída del precio del carbono voluntario',n:'MEDIO',c:'#f59e0b',m:'4 de 5 fuentes de valor no dependen del carbono. Diversificación en 7 mercados. Art. 6.4 es regulado. Reserva estratégica de OLV.'},
{r:'dMRV ciudadano no aprobado por certificadoras',n:'MEDIO',c:'#f59e0b',m:'En febrero de 2026 En feb 2026 Verra aprobó su primer piloto dMRV de alta frecuencia — el mismo modelo de verificación digital que implementa OLIVIA de alta frecuencia, validando exactamente el modelo que OLIVIA implementa. El riesgo bajó de ALTO a MEDIO: ya no es validez del método, sino de ejecución y escala. La estrategia sigue siendo construir historial de datos durante Fase 1-2 para presentar evidencia sólida bajo esa metodología ya aprobada.'},
{r:'Adopción ciudadana insuficiente',n:'MEDIO',c:'#f59e0b',m:'El incentivo económico es el diferencial. Consorcios como canal de adquisición masiva. Red social OLIVIA como mecanismo de retención.'},
{r:'Competencia de plataformas establecidas',n:'BAJO',c:'#22c55e',m:'No existe competencia directa en dMRV ciudadano en LATAM. La ventaja del primero en construir el historial de datos es insuperable.'},
]:[
{r:'Multi-methodology operational complexity',n:'MEDIUM',c:'#f59e0b',m:'Phase 3 starts with ONE certification — Verra VM0036 organic. CTO hired in months 1-2 audits and refactors the system for multiple parallel methodologies.'},
{r:'Voluntary carbon price drop',n:'MEDIUM',c:'#f59e0b',m:'4 of 5 value sources do not depend on carbon. Diversification across 7 markets. Art. 6.4 is regulated. Strategic OLV reserve.'},
{r:'Citizen dMRV not approved by certifiers',n:'HIGH',c:'#ef4444',m:'This is genuinely new. Strategy is to build data history during Phase 1-2 to present to Verra with solid evidence. Precedents exist in Africa and Asia.'},
{r:'Insufficient citizen adoption',n:'MEDIUM',c:'#f59e0b',m:'Economic incentive is the key differentiator. Buildings as mass acquisition channel. OLIVIA social network as retention mechanism.'},
{r:'Competition from established platforms',n:'LOW',c:'#22c55e',m:'No direct competition in citizen dMRV in LATAM. First mover advantage in building data history is insurmountable.'},
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
<div style={{fontSize:9,color:'#22c55e'}}>Whitepaper v2.0 · {lang==='es'?'Junio':'June'} 2026</div>
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
{SECCIONES.map((sec,i)=>(
<button key={i} onClick={()=>setSeccion(i)}
style={{padding:'5px 10px',borderRadius:8,border:'none',cursor:'pointer',fontSize:10,fontWeight:seccion===i?700:400,background:seccion===i?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.04)',color:seccion===i?'#22c55e':'#64748b',whiteSpace:'nowrap'}}>
{sec}
</button>
))}
</div>

<div style={{padding:'20px',maxWidth:640,margin:'0 auto'}}>
{contenido()}
<div style={{display:'flex',justifyContent:'space-between',marginTop:24,paddingTop:16,borderTop:`1px solid ${border}`}}>
<button onClick={()=>{setSeccion(s=>Math.max(0,s-1));window.scrollTo(0,0)}} disabled={seccion===0}
style={{background:seccion===0?'rgba(255,255,255,0.02)':'rgba(255,255,255,0.08)',border:`1px solid ${border}`,borderRadius:10,padding:'10px 20px',color:seccion===0?sub:text,fontSize:13,cursor:seccion===0?'not-allowed':'pointer'}}>
← {lang==='es'?'Anterior':'Previous'}
</button>
<div style={{fontSize:11,color:sub,alignSelf:'center'}}>{seccion+1} / {SECCIONES.length}</div>
<button onClick={()=>{setSeccion(s=>Math.min(SECCIONES.length-1,s+1));window.scrollTo(0,0)}} disabled={seccion===SECCIONES.length-1}
style={{background:seccion===SECCIONES.length-1?'rgba(255,255,255,0.02)':'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'10px 20px',color:seccion===SECCIONES.length-1?sub:'white',fontSize:13,cursor:seccion===SECCIONES.length-1?'not-allowed':'pointer'}}>
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
