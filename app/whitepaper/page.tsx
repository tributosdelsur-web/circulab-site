'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const SECCIONES_ES = [
'📋 Resumen ejecutivo','🔴 El problema','🌿 La solución OLIVIA','🔬 Arquitectura dMRV',
'📜 Certificación multi-metodológica','🪙 Tokenómica OLV','👥 Los 8 segmentos',
'💰 Las 5 fuentes de valor','🌍 Los 7 mercados','🤝 Modelo de convenios',
'🗺️ Roadmap 4 fases','🌱 Familia OLIVIA','👨‍💻 Equipo y tecnología',
'📈 Ronda Seed 2026','⚠️ Riesgos y mitigación','🏛️ Marco legal',
]

const SECCIONES_EN = [
'📋 Executive Summary','🔴 The Problem','🌿 OLIVIA Solution','🔬 dMRV Architecture',
'📜 Multi-methodology Certification','🪙 OLV Tokenomics','👥 8 Customer Segments',
'💰 5 Value Sources','🌍 7 Token Markets','🤝 Partnership Model',
'🗺️ 4-Phase Roadmap','🌱 OLIVIA Family','👨‍💻 Team & Technology',
'📈 Seed Round 2026','⚠️ Risks & Mitigation','🏛️ Legal Framework',
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

// ═══ NDA GATE ═══
if(!ndaFirmado) return (
<div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
<div style={{width:'100%',maxWidth:420}}>
<div style={{textAlign:'center',marginBottom:24}}>
<div style={{width:56,height:56,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:'white',margin:'0 auto 12px'}}>O</div>
<div style={{fontSize:20,fontWeight:900,color:text,marginBottom:4}}>
{lang==='es'?'Whitepaper Técnico':'Technical Whitepaper'}
</div>
<div style={{fontSize:12,color:sub,marginBottom:4}}>OLIVIA Circulab · {lang==='es'?'Junio':'June'} 2026</div>
<div style={{fontSize:11,color:sub}}>{lang==='es'?'Documento confidencial · Firmá el NDA para acceder':'Confidential document · Sign NDA to access'}</div>
</div>

<div style={{background:card,border:`1px solid ${border}`,borderRadius:16,padding:24}}>
<div style={{display:'flex',gap:8,justifyContent:'flex-end',marginBottom:16}}>
<button onClick={()=>setLang(lang==='es'?'en':'es')}
style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>
{lang==='es'?'EN':'ES'}
</button>
<button onClick={()=>setDark(!dark)}
style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
{dark?'☀️':'🌙'}
</button>
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
<input type="checkbox" checked={ndaAcepto} onChange={e=>setNdaAcepto(e.target.checked)}
style={{marginTop:2,flexShrink:0,accentColor:'#22c55e'}} />
<div style={{fontSize:11,color:sub,lineHeight:1.5}}>
{lang==='es'
?'Acepto no compartir este documento sin autorización expresa de Circulab Tech. Entiendo que contiene información confidencial de la ronda Seed 2026.'
:'I agree not to share this document without express authorization from Circulab Tech. I understand it contains confidential Seed Round 2026 information.'
}
</div>
</div>

{ndaError&&<div style={{fontSize:12,color:'#ef4444',marginBottom:8}}>{ndaError}</div>}

<button onClick={firmarNDA} disabled={ndaEnviando}
style={{width:'100%',background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'12px',color:'white',fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:12}}>
{ndaEnviando
?(lang==='es'?'Firmando...':'Signing...')
:(lang==='es'?'Firmar NDA y acceder →':'Sign NDA and access →')
}
</button>

<div style={{textAlign:'center'}}>
<a href="/" style={{fontSize:11,color:sub,textDecoration:'none'}}>{lang==='es'?'← Volver al inicio':'← Back to home'}</a>
</div>
</div>
</div>
</div>
)

// ═══ CONTENIDO WHITEPAPER ═══
const contenido = () => {

if(seccion===0) return (
<div>
<div style={s.titulo}>{lang==='es'?'Resumen ejecutivo':'Executive Summary'}</div>
<div style={s.highlight}>
<div style={s.verde}>{lang==='es'?'OLIVIA Circulab en una oración':'OLIVIA Circulab in one sentence'}</div>
<div style={s.p}>{lang==='es'
?'La primera infraestructura de datos ambientales ciudadanos de América Latina — que convierte residuos domiciliarios en créditos de carbono verificados con IA, utilizando una arquitectura multi-metodológica con una certificadora específica por tipo de material.'
:'The first citizen environmental data infrastructure in Latin America — converting household waste into AI-verified carbon credits, using a multi-methodology architecture with a specific certifier per material type.'
}</div>
</div>
{(lang==='es'?[
{t:'El problema',d:'6.000t de residuos/día solo en CABA. El 85% va al relleno sin separar. USD 0 capturado en carbono ciudadano. Un mercado de USD 4.5B en LATAM completamente sin tocar.',c:'#ef4444'},
{t:'La solución',d:'OLIVIA digitaliza, verifica con IA y certifica el reciclaje ciudadano. Cada kilo genera tokens OLV que se convierten en créditos de carbono certificables bajo distintos estándares internacionales según el tipo de material.',c:'#22c55e'},
{t:'El producto hoy',d:'App web en producción. Registro con foto + GPS + IA (Gemini Flash). Dashboard con OLV y CO2eq. Red social. Simulador para consorcios. Admin con CRM. Construido con USD 0 de inversión externa.',c:'#3b82f6'},
{t:'La ronda',d:'Seed 2026. Opción A: USD 500K por 10% · USD 4.5M pre. Opción B: USD 2M por 15% · USD 11.3M pre. Primer uso: CTO + auditoría + certificación Verra VM0036.',c:'#a855f7'},
{t:'Distrito IA y Ley 27.506',d:'Circulab Tech opera desde el Distrito de Inteligencia Artificial de Buenos Aires. Bajo la Ley de Economía del Conocimiento 27.506: ganancias al 15%, reducción 70-80% cargas patronales, FONDCE, estabilidad fiscal 10 años.',c:'#f59e0b'},
]:[
{t:'The Problem',d:'6,000t of waste/day in Buenos Aires alone. 85% goes to landfill unsorted. USD 0 captured in citizen carbon. A USD 4.5B LATAM market completely untouched.',c:'#ef4444'},
{t:'The Solution',d:'OLIVIA digitalizes, AI-verifies and certifies citizen recycling. Each kilo generates OLV tokens that become certifiable carbon credits under different international standards per material type.',c:'#22c55e'},
{t:'The Product Today',d:'Web app in production. Registration with photo + GPS + AI (Gemini Flash). OLV and CO2eq dashboard. Social network. Building simulator. Admin with CRM. Built with USD 0 external investment.',c:'#3b82f6'},
{t:'The Round',d:'Seed 2026. Option A: USD 500K for 10% · USD 4.5M pre. Option B: USD 2M for 15% · USD 11.3M pre. First use: CTO + audit + Verra VM0036 certification.',c:'#a855f7'},
{t:'AI District & Law 27.506',d:'Circulab Tech operates from the Buenos Aires AI District. Under Knowledge Economy Law 27.506: 15% income tax, 70-80% payroll reduction, FONDCE, 10-year fiscal stability.',c:'#f59e0b'},
]).map(i=>(
<div key={i.t} style={{...s.card,borderLeft:`3px solid ${i.c}`}}>
<div style={{fontSize:12,fontWeight:700,color:i.c,marginBottom:4}}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

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
<div style={s.p}>{lang==='es'
?'OLIVIA no es una app de reciclaje con puntos. Es la primera infraestructura de datos ambientales ciudadanos de América Latina. Cada residuo verificado produce un crédito certificable, un dato verificado, un activo financiero real y un comportamiento registrado.'
:'OLIVIA is not a recycling app with points. It is the first citizen environmental data infrastructure in Latin America. Every verified waste item produces a certifiable credit, a verified data point, a real financial asset and a recorded behavior.'
}</div>
</div>
{(lang==='es'?[
{icon:'📸',t:'Registro ciudadano',d:'El ciudadano registra su residuo desde su celular. Foto de origen + foto de entrega con GPS. La primera foto es referencial — los tokens OLV se acreditan solo con la segunda foto que confirma la disposición final.',c:'#22c55e'},
{icon:'🤖',t:'Verificación con IA',d:'Gemini Flash analiza la foto: tipo de residuo, peso estimado con moneda de referencia, calidad de separación, posibles contaminantes. Resultado: VALIDAR / REVISAR / RECHAZAR con nivel de confianza.',c:'#3b82f6'},
{icon:'📍',t:'Trazabilidad GPS completa',d:'GPS de origen y GPS de entrega. La cadena de custodia es verificable: quién generó qué, cuándo, dónde y adónde fue. Eso hace el crédito certificable.',c:'#f59e0b'},
{icon:'🪙',t:'Generación de tokens OLV',d:'Cada kilo verificado genera tokens OLV taggeados por tipo de material y metodología de certificación. Los tokens se acreditan cuando se confirma la disposición final.',c:'#a855f7'},
{icon:'🌍',t:'Certificación multi-metodológica',d:'Una certificadora específica por tipo de material. Orgánico → Verra VM0036. Plástico → Gold Standard. Metal → CAR. Nunca se mezclan en un mismo batch.',c:'#22c55e'},
]:[
{icon:'📸',t:'Citizen registration',d:'The citizen registers their waste from their phone. Origin photo + delivery photo with GPS. The first photo is reference only — OLV tokens are credited only with the second photo confirming final disposal.',c:'#22c55e'},
{icon:'🤖',t:'AI verification',d:'Gemini Flash analyzes the photo: waste type, estimated weight using coin reference, separation quality, possible contaminants. Result: VALIDATE / REVIEW / REJECT with confidence level.',c:'#3b82f6'},
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
<div style={s.p}>{lang==='es'
?'El estándar que las certificadoras como Verra exigen para proyectos de carbono basados en comportamiento ciudadano. OLIVIA implementa un dMRV completo desde el día 1.'
:'The standard that certifiers like Verra require for carbon projects based on citizen behavior. OLIVIA implements a complete dMRV from day 1.'
}</div>
</div>
{(lang==='es'?[
{t:'M — Monitoreo',d:'Cada registro incluye: tipo de material, peso estimado por IA, foto de origen, GPS de origen, fecha y hora, identidad verificada. Gemini Flash analiza en tiempo real con nivel de confianza alto/medio/bajo.',c:'#22c55e'},
{t:'R — Reporte',d:'Cada batch se agrupa por tipo de material y período. Los datos se consolidan en reportes exportables (CSV, PDF) que cumplen el formato requerido por Verra y Gold Standard.',c:'#3b82f6'},
{t:'V — Verificación',d:'La segunda foto con GPS confirma la disposición final. El admin valida manualmente. La IA recomienda VALIDAR/REVISAR/RECHAZAR. Solo los validados generan OLV acreditados.',c:'#f59e0b'},
{t:'Estructura de datos por registro',d:'tipo | metodologia | batch_id | olv_generados | verificado | gps_origen [lat,lng] | gps_entrega [lat,lng] | foto_origen url | foto_entrega url | peso_ia_kg | confianza_ia | validado_por admin_id',c:'#a855f7'},
{t:'Por qué el dMRV ciudadano es nuevo',d:'Los proyectos dMRV existentes son forestales o industriales. El dMRV ciudadano a escala residencial es prácticamente inexistente en LATAM. OLIVIA es la primera infraestructura que lo hace posible con teléfonos celulares.',c:'#22c55e'},
]:[
{t:'M — Monitoring',d:'Each registration includes: material type, AI-estimated weight, origin photo, origin GPS, date and time, verified identity. Gemini Flash analyzes in real time with high/medium/low confidence level.',c:'#22c55e'},
{t:'R — Reporting',d:'Each batch is grouped by material type and period. Data is consolidated into exportable reports (CSV, PDF) that meet the format required by Verra and Gold Standard.',c:'#3b82f6'},
{t:'V — Verification',d:'The second GPS photo confirms final disposal. Admin validates manually. AI recommends VALIDATE/REVIEW/REJECT. Only validated ones generate credited OLV.',c:'#f59e0b'},
{t:'Data structure per registration',d:'type | methodology | batch_id | olv_generated | verified | gps_origin [lat,lng] | gps_delivery [lat,lng] | photo_origin url | photo_delivery url | ai_weight_kg | ai_confidence | validated_by admin_id',c:'#a855f7'},
{t:'Why citizen dMRV is new',d:'Existing dMRV projects are forestry or industrial. Citizen dMRV at residential scale is virtually nonexistent in LATAM. OLIVIA is the first infrastructure that makes it possible with mobile phones.',c:'#22c55e'},
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
<div style={s.p}>{lang==='es'
?'El mercado internacional requiere estándares específicos por material. OLIVIA usa una metodología distinta para cada tipo de residuo. Los tokens OLV están taggeados por metodología para que el comprador B2B elija exactamente qué tipo de crédito compra.'
:'The international market requires specific standards per material. OLIVIA uses a different methodology for each waste type. OLV tokens are tagged by methodology so the B2B buyer chooses exactly which type of credit they buy.'
}</div>
</div>
<div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
{[
{icon:'🌿',tipo:lang==='es'?'Orgánico':'Organic',cert:'Verra VCS VM0036',factor:'1.8 kg CO2eq/kg',precio:'USD 22/t',color:'#22c55e',fase:lang==='es'?'Fase 3a · 2027':'Phase 3a · 2027'},
{icon:'♻️',tipo:lang==='es'?'Plástico':'Plastic',cert:'Gold Standard AMS-III.BA',factor:'1.5 kg CO2eq/kg',precio:'USD 20/t',color:'#3b82f6',fase:lang==='es'?'Fase 3b · 2027':'Phase 3b · 2027'},
{icon:'📄',tipo:lang==='es'?'Papel':'Paper',cert:'Gold Standard AMS-III.AJ',factor:'0.9 kg CO2eq/kg',precio:'USD 18/t',color:'#f59e0b',fase:lang==='es'?'Fase 3b · 2027':'Phase 3b · 2027'},
{icon:'🔩',tipo:lang==='es'?'Metal':'Metal',cert:'Climate Action Reserve',factor:'8.0 kg CO2eq/kg',precio:'USD 35/t',color:'#ef4444',fase:lang==='es'?'Fase 3c · 2028':'Phase 3c · 2028'},
{icon:'🛢️',tipo:lang==='es'?'Aceite':'Oil',cert:'Verra AMS-III.AK',factor:'2.5 kg CO2eq/kg',precio:'USD 25/t',color:'#f97316',fase:lang==='es'?'Fase 3c · 2028':'Phase 3c · 2028'},
{icon:'👕',tipo:lang==='es'?'Textil':'Textile',cert:'GS Textile Exchange',factor:'5.5 kg CO2eq/kg',precio:'USD 28/t',color:'#ec4899',fase:lang==='es'?'Fase 3c · 2028':'Phase 3c · 2028'},
{icon:'🍾',tipo:lang==='es'?'Vidrio':'Glass',cert:'Verra Registry',factor:'0.3 kg CO2eq/kg',precio:'USD 15/t',color:'#a855f7',fase:lang==='es'?'Fase 4 · 2028':'Phase 4 · 2028'},
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
{(lang==='es'?[
{t:'Roadmap de certificación',d:'Fase 3a (2027): Verra VM0036 para orgánico — la más establecida. Fase 3b (2027): Gold Standard para plástico y papel. Fase 3c (2028): CAR para metal, Verra AMS-III.AK para aceite, GS Textile para textil. Fase 4 (2028): todos activos + Art. 6.4.'},
{t:'Separación de batches',d:'Nunca se mezclan materiales de distintas metodologías en un mismo batch. Cada batch tiene material único, metodología única, período definido, trazabilidad GPS completa.'},
{t:'Ventaja vs tokens genéricos',d:'Los tokens genéricos no tienen trazabilidad del origen. OLV sí: sabés quién recicló qué, cuándo, dónde y qué certificadora lo respalda. Los compradores B2B pagan premium por esa trazabilidad.'},
{t:'Aclaración ISCC PLUS y FSC',d:'ISCC PLUS y FSC son certificaciones de cadena de custodia para proveedores industriales — no son metodologías de créditos de carbono. OLIVIA opera como proyecto dMRV ciudadano bajo Verra, Gold Standard y CAR. Son marcos distintos para mercados distintos.'},
]:[
{t:'Certification roadmap',d:'Phase 3a (2027): Verra VM0036 for organic — most established. Phase 3b (2027): Gold Standard for plastic and paper. Phase 3c (2028): CAR for metal, Verra AMS-III.AK for oil, GS Textile for textile. Phase 4 (2028): all active + Art. 6.4.'},
{t:'Batch separation',d:'Materials from different methodologies are never mixed in the same batch. Each batch has a unique material, unique methodology, defined period, complete GPS traceability.'},
{t:'Advantage vs generic tokens',d:'Generic tokens have no origin traceability. OLV does: you know who recycled what, when, where and which certifier backs it. B2B buyers pay a premium for that traceability.'},
{t:'ISCC PLUS and FSC clarification',d:'ISCC PLUS and FSC are chain of custody certifications for industrial suppliers — they are not carbon credit methodologies. OLIVIA operates as a citizen dMRV project under Verra, Gold Standard and CAR. Different frameworks for different markets.'},
]).map(i=>(
<div key={i.t} style={s.card}>
<div style={s.verde}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

if(seccion===5) return (
<div>
<div style={s.titulo}>{lang==='es'?'Tokenómica OLV':'OLV Tokenomics'}</div>
<div style={s.highlight}>
<div style={s.verde}>OLV ≠ PULSO</div>
<div style={s.p}>{lang==='es'
?'OLV (Olivia Coins) es el token económico — representa activos ambientales verificados. PULSO es el score de reputación crediticia — se construye con comportamiento. Son distintos y complementarios.'
:'OLV (Olivia Coins) is the economic token — represents verified environmental assets. PULSO is the credit reputation score — built with behavior. They are distinct and complementary.'
}</div>
</div>
{(lang==='es'?[
{t:'Generación de OLV',d:'Fórmula: kg × factor CO2eq del material × 100 = OLV. Ejemplo: 1 kg de metal × 8.0 × 100 = 800 OLV. Se acreditan cuando el admin valida la foto de entrega — nunca la de origen.',c:'#22c55e'},
{t:'Las 3 capas de valor OLV',d:'Capa 1 — Utilidad (Fase 1-2): historial ambiental verificado, canjeables por servicios de empresas partner. Capa 2 — Carbono (Fase 3): conversión a créditos Verra/GS, USD reales. Capa 3 — Financiero (Fase 4): intercambiables en mercados Art. 6.4, USD 90/t.',c:'#3b82f6'},
{t:'Distribución del crédito',d:'50% OLIVIA Circulab · 25% ciudadano generador · 15% recolector/cooperativa · 10% fondo de reserva ecosistema.',c:'#f59e0b'},
{t:'Los que empiezan hoy',d:'Los OLV acumulados en Fase 1 mantienen su valor en Fase 3. Un usuario que acumula 50.000 OLV en 18 meses tiene un historial más valioso que quien empieza en Fase 3. El tiempo de participación es el activo más valioso.',c:'#a855f7'},
{t:'Convenios como inversión diferida',d:'Las empresas partner que aceptan OLV reciben una cuenta por cobrar en activos ambientales. Cuando OLIVIA certifique en 2027, convierten sus OLV en dinero real. No es descuento — es inversión.',c:'#22c55e'},
]:[
{t:'OLV generation',d:'Formula: kg × material CO2eq factor × 100 = OLV. Example: 1 kg metal × 8.0 × 100 = 800 OLV. Credited when admin validates delivery photo — never origin photo.',c:'#22c55e'},
{t:'3 OLV value layers',d:'Layer 1 — Utility (Phase 1-2): verified environmental history, redeemable for partner services. Layer 2 — Carbon (Phase 3): conversion to Verra/GS credits, real USD. Layer 3 — Financial (Phase 4): tradeable in Art. 6.4 markets, USD 90/t.',c:'#3b82f6'},
{t:'Credit distribution',d:'50% OLIVIA Circulab · 25% generating citizen · 15% collector/cooperative · 10% ecosystem reserve fund.',c:'#f59e0b'},
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
<div style={s.p}>{lang==='es'
?'OLIVIA diversifica en 7 mercados distintos para mitigar el riesgo del precio del carbono. Si un mercado baja, los otros pueden compensar.'
:'OLIVIA diversifies across 7 different markets to mitigate carbon price risk. If one market falls, others can compensate.'
}</div>
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
<div style={s.p}>{lang==='es'
?'Cuando una empresa da un servicio a cambio de OLV, recibe esos tokens en su wallet empresarial. En Fase 3, los convierte en dinero real. Las empresas que entran antes acumulan más OLV cuando valen poco.'
:'When a company provides a service in exchange for OLV, it receives those tokens in its corporate wallet. In Phase 3, it converts them to real money. Companies that join early accumulate more OLV when they\'re cheap.'
}</div>
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
<div style={s.titulo}>{lang==='es'?'Roadmap — Las 4 fases':'4-Phase Roadmap'}</div>
{(lang==='es'?[
{fase:'Fase 1',año:'2026 · Activa ahora',color:'#22c55e',items:['Piloto dMRV en CABA con usuarios reales','App web con verificación IA (Gemini Flash)','Tokens OLV acumulándose desde el día 1','Red social OLIVIA activa','Admin con CRM y publicación multicanal','Encuesta de mercado con datos reales']},
{fase:'Fase 2',año:'Q4 2026',color:'#3b82f6',items:['Primeros convenios con empresas partner','OLV canjeables por servicios reales','Portal web para recolectores','3 consorcios piloto activos en CABA','Wallet empresarial para partners']},
{fase:'Fase 3',año:'2027',color:'#f59e0b',items:['CTO + auditoría de código (mes 1-2 post-inversión)','Certificación Verra VM0036 — orgánico','Primer batch de créditos certificados','Primer pago en USD a usuarios pioneros','Gold Standard — plástico y papel','Expansión México y Colombia','Serie A USD 5M']},
{fase:'Fase 4',año:'2028',color:'#a855f7',items:['Art. 6.4 del Acuerdo de París · USD 90/t','CAR metal · GS Textile textil','OLIVIA Exchange — intercambio de OLV','API para compradores B2B directos','Corredor LATAM completo: AR MX CO BR CH DO']},
]:[
{fase:'Phase 1',año:'2026 · Active now',color:'#22c55e',items:['dMRV pilot in Buenos Aires with real users','Web app with AI verification (Gemini Flash)','OLV tokens accumulating from day 1','OLIVIA social network active','Admin with CRM and multichannel publishing','Market survey with real data']},
{fase:'Phase 2',año:'Q4 2026',color:'#3b82f6',items:['First partnerships with companies','OLV redeemable for real services','Web portal for collectors','3 pilot buildings active','Corporate wallet for partners']},
{fase:'Phase 3',año:'2027',color:'#f59e0b',items:['CTO + code audit (months 1-2 post-investment)','Verra VM0036 certification — organic','First certified credit batch','First USD payment to pioneer users','Gold Standard — plastic and paper','Expansion Mexico and Colombia','Series A USD 5M']},
{fase:'Phase 4',año:'2028',color:'#a855f7',items:['Paris Agreement Art. 6.4 · USD 90/t','CAR metal · GS Textile textile','OLIVIA Exchange — OLV trading','API for direct B2B buyers','LATAM corridor: AR MX CO BR CH DO']},
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

if(seccion===11) return (
<div>
<div style={s.titulo}>{lang==='es'?'Familia OLIVIA':'OLIVIA Family'}</div>
<div style={s.highlight}>
<div style={s.p}>{lang==='es'
?'OLIVIA Circulab es la primera vertical de Circulab Tech. A medida que el sistema madure, se expande a nuevos ecosistemas usando la misma infraestructura de dMRV, tokenización y certificación.'
:'OLIVIA Circulab is the first vertical of Circulab Tech. As the system matures, it expands to new ecosystems using the same dMRV, tokenization and certification infrastructure.'
}</div>
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

if(seccion===12) return (
<div>
<div style={s.titulo}>{lang==='es'?'Equipo y tecnología':'Team & Technology'}</div>
<div style={s.highlight}>
<div style={s.verde}>{lang==='es'?'Construido con USD 0 · Distrito IA Buenos Aires · Ley 27.506':'Built with USD 0 · AI District Buenos Aires · Law 27.506'}</div>
<div style={s.p}>{lang==='es'
?'Todo el producto fue construido por los fundadores usando IA como equipo técnico. Sin inversión externa. El primer uso de fondos es contratar un CTO y auditar el código.'
:'The entire product was built by the founders using AI as their technical team. No external investment. First use of funds is hiring a CTO and auditing the code.'
}</div>
</div>
{[
{foto:'/founders/founder-jp.jpg',n:'Juan Pablo Sanguinetti',rol:'CEO & Founder',d:lang==='es'?'Director de teatro chileno y abogado. Product builder con IA. Arquitecto del ecosistema Circulab. Especialidad en medio ambiente, tributación y gestión de proyectos.':'Chilean theater director and lawyer. AI product builder. Circulab ecosystem architect. Expertise in environmental law, taxation and project management.',c:'#22c55e'},
{foto:'/founders/founder-mileidy.jpg',n:'Mileidy Zapata',rol:'COO & Co-founder',d:lang==='es'?'Madre, bailarina y coreógrafa dominicana. Un corazón, tres países, una misión: desarrollar la comunidad y mejorar la calidad de vida. Junto a OLIVIA y Santino Eloy, dieron comienzo al piloto en casa.':'Mother, dancer and Dominican choreographer. One heart, three countries, one mission: build community and improve quality of life. Together with OLIVIA and Santino Eloy, they started the pilot at home.',c:'#3b82f6'},
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
{l:'AI',v:'Google Gemini Flash'},
{l:'Deploy',v:'Vercel (CI/CD)'},
{l:lang==='es'?'Costo mensual':'Monthly cost',v:'USD 0 (free tiers)'},
].map(i=>(
<div key={i.l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${border}`}}>
<span style={{fontSize:11,color:sub}}>{i.l}</span>
<span style={{fontSize:11,color:text,fontWeight:600}}>{i.v}</span>
</div>
))}
</div>
<div style={s.card}>
<div style={s.verde}>{lang==='es'?'Plan de equipo post-inversión':'Post-investment team plan'}</div>
{(lang==='es'?[
{rol:'CTO Senior',cuando:'Mes 1-2',skills:'Blockchain, tokenización, certificadoras de carbono, dMRV'},
{rol:'2 Devs Full-Stack',cuando:'Mes 1-3',skills:'Smart contracts, backend, API para compradores B2B'},
{rol:'Especialista carbono',cuando:'Mes 3-6',skills:'Metodologías Verra/GS, auditoría dMRV'},
{rol:'Dev Mobile',cuando:'Mes 6+',skills:'React Native, iOS/Android'},
]:[
{rol:'Senior CTO',cuando:'Month 1-2',skills:'Blockchain, tokenization, carbon certifiers, dMRV'},
{rol:'2 Full-Stack Devs',cuando:'Month 1-3',skills:'Smart contracts, backend, B2B buyer API'},
{rol:'Carbon specialist',cuando:'Month 3-6',skills:'Verra/GS methodologies, dMRV audit'},
{rol:'Mobile Dev',cuando:'Month 6+',skills:'React Native, iOS/Android'},
]).map(r=>(
<div key={r.rol} style={{padding:'8px 0',borderBottom:`1px solid ${border}`}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}>
<span style={{fontSize:11,fontWeight:700,color:'#22c55e'}}>{r.rol}</span>
<span style={{fontSize:9,color:sub}}>{r.cuando}</span>
</div>
<div style={{fontSize:10,color:sub}}>{r.skills}</div>
</div>
))}
</div>
</div>
)

if(seccion===13) return (
<div>
<div style={s.titulo}>{lang==='es'?'Ronda Seed 2026':'Seed Round 2026'}</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
<div style={{...s.card,textAlign:'center',borderTop:'3px solid #22c55e'}}>
<div style={{fontSize:11,color:sub,marginBottom:4}}>{lang==='es'?'Opción A':'Option A'}</div>
<div style={{fontSize:24,fontWeight:900,color:'#22c55e'}}>USD 500K</div>
<div style={{fontSize:11,color:sub,marginTop:4}}>10% equity</div>
<div style={{fontSize:10,color:sub}}>USD 4.5M pre-money</div>
<div style={{fontSize:10,color:'#22c55e',marginTop:6}}>USD 3.500/{lang==='es'?'mes':'mo'} {lang==='es'?'c/u fundador':'per founder'}</div>
</div>
<div style={{...s.card,textAlign:'center',borderTop:'3px solid #3b82f6'}}>
<div style={{fontSize:11,color:sub,marginBottom:4}}>{lang==='es'?'Opción B':'Option B'}</div>
<div style={{fontSize:24,fontWeight:900,color:'#3b82f6'}}>USD 2M</div>
<div style={{fontSize:11,color:sub,marginTop:4}}>15% equity</div>
<div style={{fontSize:10,color:sub}}>USD 11.3M pre-money</div>
<div style={{fontSize:10,color:'#3b82f6',marginTop:6}}>USD 9.000/{lang==='es'?'mes':'mo'} {lang==='es'?'c/u fundador':'per founder'}</div>
</div>
</div>
<div style={s.card}>
<div style={s.verde}>{lang==='es'?'Uso de fondos — Opción A':'Use of funds — Option A'}</div>
{(lang==='es'?[
{item:'CTO + auditoría código',monto:'USD 80K',cuando:'Mes 1-2'},
{item:'2 devs full-stack',monto:'USD 60K',cuando:'Mes 1-3'},
{item:'Certificación Verra VM0036',monto:'USD 100K',cuando:'Mes 3-6'},
{item:'Piloto 3 consorcios',monto:'USD 40K',cuando:'Mes 3-6'},
{item:'Gold Standard plástico',monto:'USD 60K',cuando:'Mes 6-12'},
{item:'Dev mobile + expansión',monto:'USD 20K',cuando:'Mes 6-12'},
{item:'Reserva operativa 6 meses',monto:'USD 140K',cuando:'Continuo'},
]:[
{item:'CTO + code audit',monto:'USD 80K',cuando:'Month 1-2'},
{item:'2 full-stack devs',monto:'USD 60K',cuando:'Month 1-3'},
{item:'Verra VM0036 certification',monto:'USD 100K',cuando:'Month 3-6'},
{item:'3 building pilot',monto:'USD 40K',cuando:'Month 3-6'},
{item:'Gold Standard plastic',monto:'USD 60K',cuando:'Month 6-12'},
{item:'Mobile dev + expansion',monto:'USD 20K',cuando:'Month 6-12'},
{item:'6-month operational reserve',monto:'USD 140K',cuando:'Ongoing'},
]).map(u=>(
<div key={u.item} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${border}`}}>
<div>
<div style={{fontSize:11,color:text}}>{u.item}</div>
<div style={{fontSize:9,color:sub}}>{u.cuando}</div>
</div>
<span style={{fontSize:11,fontWeight:700,color:'#f59e0b'}}>{u.monto}</span>
</div>
))}
</div>
{(lang==='es'?[
{t:'Estructura del deal',d:'Equity directo. Sin convertible note. Sin intereses. Sin ratchets. Dual class shares: Clase A fundadores (10 votos/acción) · Clase B inversores (1 voto/acción). Liquidation preference 1× no participante estándar.'},
{t:'Sin costos fijos hasta inversión comprometida',d:'Circulab Tech no incurrirá en gastos fijos hasta que la inversión esté formalmente comprometida y los fondos disponibles. Hasta ese momento el costo operativo es USD 0.'},
{t:'Ventajas fiscales — Ley 27.506',d:'Ganancias al 15% · Reducción 70-80% cargas patronales · FONDCE · Estabilidad fiscal 10 años. Circulab Tech opera desde el Distrito de Inteligencia Artificial de Buenos Aires.'},
]:[
{t:'Deal structure',d:'Direct equity. No convertible note. No interest. No ratchets. Dual class shares: Class A founders (10 votes/share) · Class B investors (1 vote/share). Standard 1× non-participating liquidation preference.'},
{t:'No fixed costs until investment committed',d:'Circulab Tech will not incur fixed expenses until the investment is formally committed and funds are available. Until then, operating cost is USD 0.'},
{t:'Tax advantages — Law 27.506',d:'15% income tax · 70-80% payroll reduction · FONDCE · 10-year fiscal stability. Circulab Tech operates from the Buenos Aires AI District.'},
]).map(i=>(
<div key={i.t} style={s.card}>
<div style={s.verde}>{i.t}</div>
<div style={s.p}>{i.d}</div>
</div>
))}
</div>
)

if(seccion===14) return (
<div>
<div style={s.titulo}>{lang==='es'?'Riesgos y mitigación':'Risks & Mitigation'}</div>
{(lang==='es'?[
{r:'Complejidad operativa multi-metodológica',n:'MEDIO',c:'#f59e0b',m:'Fase 3 empieza con UNA sola certificación — Verra VM0036 orgánico. El CTO contratado en mes 1-2 audita y refactoriza el sistema para múltiples metodologías en paralelo.'},
{r:'Caída del precio del carbono voluntario',n:'MEDIO',c:'#f59e0b',m:'4 de 5 fuentes de valor no dependen del carbono. Diversificación en 7 mercados. Art. 6.4 es regulado. Reserva estratégica de OLV.'},
{r:'dMRV ciudadano no aprobado por certificadoras',n:'ALTO',c:'#ef4444',m:'Es genuinamente nuevo. La estrategia es construir el historial de datos durante Fase 1-2 para presentar a Verra con evidencia sólida. Hay precedentes en África y Asia.'},
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

if(seccion===15) return (
<div>
<div style={s.titulo}>{lang==='es'?'Marco legal y regulatorio':'Legal & Regulatory Framework'}</div>
{(lang==='es'?[
{t:'Ley de Economía del Conocimiento 27.506',d:'Ganancias al 15% (vs 35% estándar). Reducción del 70-80% en cargas patronales. FONDCE — fondo de crédito fiscal. Estabilidad fiscal por 10 años. Software y servicios de IA califican.',c:'#22c55e'},
{t:'Distrito de Inteligencia Artificial — Buenos Aires',d:'Circulab Tech opera desde el Distrito IA de CABA — el primer ecosistema de IA de América Latina. Acceso a financiamiento, mentorías y red del ecosistema tech de Buenos Aires.',c:'#3b82f6'},
{t:'Tokens OLV — naturaleza jurídica',d:'Activos ambientales digitales respaldados por comportamiento verificado. No son valores mobiliarios ni moneda de curso legal. No regulados por CNV. Su valor depende del mercado de carbono voluntario.',c:'#f59e0b'},
{t:'Privacidad y datos',d:'Cumplimiento con Ley 25.326 de Protección de Datos. GPS exacto visible solo para el admin. Solo el barrio general visible en perfiles públicos. Política completa en oliviacirculab.com.ar/privacidad.',c:'#a855f7'},
{t:'Estructura societaria recomendada',d:'SAS bajo Ley 27.349. Dual class shares A (fundadores, 10 votos) y B (inversores, 1 voto). Liquidation preference 1× no participante. Sin costos fijos hasta inversión comprometida.',c:'#22c55e'},
{t:'Acuerdo de París — Art. 6.4',d:'Mecanismo para transferencia de créditos entre países. Argentina como firmante puede vender créditos generados en su territorio. OLIVIA en Fase 4 opera en este mercado regulado — el más estable.',c:'#3b82f6'},
]:[
{t:'Knowledge Economy Law 27.506',d:'15% income tax (vs 35% standard). 70-80% payroll reduction. FONDCE — fiscal credit fund. 10-year fiscal stability. Software and AI services qualify.',c:'#22c55e'},
{t:'AI District — Buenos Aires',d:'Circulab Tech operates from the Buenos Aires AI District — the first AI ecosystem in Latin America. Access to financing, mentoring and the Buenos Aires tech ecosystem network.',c:'#3b82f6'},
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

{/* Header */}
<div style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}}>
<a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
<div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
<div>
<div style={{fontSize:13,fontWeight:800,color:text}}>OLIVIA Circulab</div>
<div style={{fontSize:9,color:'#22c55e'}}>Whitepaper v1.2 · {lang==='es'?'Junio':'June'} 2026</div>
</div>
</a>
<div style={{display:'flex',gap:6,alignItems:'center'}}>
<button onClick={()=>setLang(lang==='es'?'en':'es')}
style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>
{lang==='es'?'EN':'ES'}
</button>
<button onClick={()=>setDark(!dark)}
style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
{dark?'☀️':'🌙'}
</button>
<a href="/pitch" style={{fontSize:11,color:'#64748b',textDecoration:'none'}}>{lang==='es'?'Ver pitch →':'See pitch →'}</a>
</div>
</div>

{/* Nav secciones */}
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

{/* Navegación */}
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
