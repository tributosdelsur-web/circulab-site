'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const SLIDES = [
  {
    id: 1,
    titulo: 'OLIVIA Circulab',
    subtitulo: 'La primera infraestructura de datos ambientales ciudadanos de América Latina',
    contenido: null,
    tipo: 'portada',
    bg: 'linear-gradient(135deg,#0a1a0a,#0a0e1a,#0a0a1a)',
  },
  {
    id: 2,
    titulo: 'Nació en nuestra cocina',
    subtitulo: 'La historia',
    tipo: 'historia',
    contenido: [
      {icon:'👨‍👩‍👦',texto:'JP, Mileidy y Santino Eloy — 3 países, 1 misión'},
      {icon:'🗑️',texto:'Cada semana tirábamos bolsas de orgánicos al relleno sanitario'},
      {icon:'💡',texto:'¿Por qué no hay forma de convertir esto en algo valioso?'},
      {icon:'🌿',texto:'Así nació OLIVIA Circulab — desde adentro del problema'},
    ],
    bg: 'linear-gradient(135deg,#0a1a0a,#0a0e1a)',
  },
  {
    id: 3,
    titulo: 'El problema',
    subtitulo: 'USD 0 capturado de millones disponibles',
    tipo: 'problema',
    contenido: [
      {stat:'6.000t',desc:'de residuos por día solo en CABA'},
      {stat:'85%',desc:'va al relleno sanitario sin separar'},
      {stat:'USD 0',desc:'capturado en créditos de carbono'},
      {stat:'USD 4.5B',desc:'de mercado de carbono LATAM sin tocar'},
    ],
    bg: 'linear-gradient(135deg,#1a0a0a,#0a0e1a)',
  },
  {
    id: 4,
    titulo: 'En la naturaleza no hay basura',
    subtitulo: 'Solo recursos sin infraestructura — OLIVIA es esa infraestructura',
    tipo: 'porquefunciona',
    contenido: [
      {icon:'🌱',titulo:'Sistema autopoiético',desc:'"Un sistema que se alimenta a sí mismo haciendo el bien. Cada vez que reciclás, el sistema crece. Cada vez que crece, reciclar vale más."',color:'#22c55e'},
      {icon:'🏛️',titulo:'Elinor Ostrom · Nobel Economía 2009',desc:'Las comunidades gestionan mejor los bienes comunes cuando tienen monitoreo verificable. OLIVIA es ese monitoreo — el dMRV ciudadano.',color:'#3b82f6'},
      {icon:'♻️',titulo:'Buckminster Fuller',desc:'"Pollution is nothing but resources we\'re not harvesting." OLIVIA convierte esa contaminación en activo financiero real.',color:'#f59e0b'},
      {icon:'🌿',titulo:'Flywheel imparable',desc:'Más usuarios → más OLV → más usos → más incentivo → más datos para Verra → precio OLV más alto → más usuarios',color:'#a855f7'},
    ],
    bg: 'linear-gradient(135deg,#0a1a0a,#0a0e1a)',
  },
  {
    id: 5,
    titulo: 'La solución',
    subtitulo: 'dMRV + IA + tokens OLV · Arquitectura multi-metodológica',
    tipo: 'solucion',
    contenido: [
      {icon:'📸',titulo:'Verificación con IA',desc:'Cloudflare AI LLaMA Vision · GPS origen y entrega · Trazabilidad completa · 10.000 análisis/día gratuitos'},
      {icon:'📍',titulo:'GPS verificado',desc:'Cadena de custodia completa origen → planta de reciclaje · Certificable con Verra'},
      {icon:'🪙',titulo:'Tokens OLV',desc:'Activos ambientales verificados taggeados por tipo de residuo y metodología de certificación'},
      {icon:'🌍',titulo:'Arquitectura multi-metodológica',desc:'Una certificadora por material: Verra AMS-III.AJ + VMR0007 orgánico · Gold Standard plástico · Verra AMS-III.AJ metal · Textil: sin metodología madura'},
    ],
    bg: 'linear-gradient(135deg,#0a1a0a,#0a0e1a)',
  },
  {
    id: 6,
    titulo: 'El producto existe hoy',
    subtitulo: 'Funcionando en producción — USD 0 de inversión',
    tipo: 'producto',
    contenido: [
      {icon:'✅',texto:'App web con registro de residuos + IA (Cloudflare AI)'},
      {icon:'✅',texto:'Dashboard con OLV, CO2eq y ruta de pagos'},
      {icon:'✅',texto:'Red social OLIVIA con feed, likes y ranking'},
      {icon:'✅',texto:'Simulador de ahorro para consorcios'},
      {icon:'✅',texto:'Admin con gráficos, CRM y publicación multicanal'},
      {icon:'✅',texto:'Whitepaper + One Pager + Pitch con NDA gate'},
    ],
    bg: 'linear-gradient(135deg,#0a1a0a,#050d1f)',
  },
  {
    id: 7,
    titulo: 'Los 6 tramos del ecosistema',
    subtitulo: 'Los que entran hoy en Semilla cobran primero en Árbol',
    tipo: 'tramos',
    contenido: [
      {icon:'🌱',tramo:'SEMILLA',año:'2026 · Ahora',desc:'Piloto dMRV activo · OLV acumulándose · Historial para Verra',color:'#22c55e',activo:true},
      {icon:'🌿',tramo:'BROTE',año:'Q4 2026',desc:'OLV canjeables · Convenios partner · Cooperativas integradas',color:'#3b82f6',activo:false},
      {icon:'🌳',tramo:'ÁRBOL',año:'2027 💰',desc:'Certificación Verra VCS · USD 22-45/t · Primer pago real · ✅ Verra aprobó piloto dMRV Feb 2026 · 6.329 OLV = USD 1',color:'#f59e0b',activo:false},
      {icon:'🌲',tramo:'BOSQUE',año:'2028',desc:'Art. 6.4 París · USD 50-130/t · Corredor AR MX CO BR CH DO · 2.198 OLV = USD 1',color:'#a855f7',activo:false},
      {icon:'🏔️',tramo:'SELVA',año:'2029',desc:'OLIVIA Ocean + Waters + Space · PULSO estándar LATAM',color:'#ec4899',activo:false},
      {icon:'🌊',tramo:'SUMIDERO',año:'2030+',desc:'Net positive verificado · Infraestructura climática global',color:'#06b6d4',activo:false},
    ],
    bg: 'linear-gradient(135deg,#0a1a0a,#0a0e1a)',
  },
  {
    id: 8,
    titulo: '8 segmentos de clientes',
    subtitulo: 'Desde el vecino hasta el municipio',
    tipo: 'segmentos',
    contenido: [
      {tipo:'Ciudadano libre',fee:'OLV',canal:'App'},
      {tipo:'Verdulería / Feria',fee:'OLV',canal:'App + WhatsApp'},
      {tipo:'Colegio',fee:'OLV',canal:'App'},
      {tipo:'Consorcio',fee:'SaaS mensual',canal:'Admin'},
      {tipo:'Restaurante / Hotel',fee:'SaaS mensual',canal:'Admin'},
      {tipo:'Casino / Comedor',fee:'SaaS mensual',canal:'Admin'},
      {tipo:'Empresa RSE',fee:'Por proyecto',canal:'B2B'},
      {tipo:'Municipio',fee:'Por contrato',canal:'B2G'},
    ],
    bg: 'linear-gradient(135deg,#0a0a1a,#0a0e1a)',
  },
  {
    id: 9,
    titulo: '5 fuentes de valor',
    subtitulo: 'Valores aproximados · Consorcio de 100 departamentos',
    tipo: 'fuentes',
    contenido: [
      {num:'01',titulo:'Créditos de carbono',valor:'USD 85/mes',desc:'VCS Verra · 25% para vecinos',color:'#22c55e'},
      {num:'02',titulo:'Ahorro recolección',valor:'USD 800/mes',desc:'Estimado USD 8 por depto por mes',color:'#3b82f6'},
      {num:'03',titulo:'Venta de materiales',valor:'USD 120/mes',desc:'Plástico, metal, textil, papel',color:'#f59e0b'},
      {num:'04',titulo:'Abono orgánico',valor:'USD 45/mes',desc:'Compost · 25% al consorcio',color:'#f97316'},
      {num:'05',titulo:'Certificación RSE',valor:'USD 75/mes',desc:'Badge Edificio Verde OLIVIA',color:'#ec4899'},
    ],
    bg: 'linear-gradient(135deg,#0a1a0a,#050d1f)',
  },
  {
    id: 10,
    titulo: 'El mercado',
    subtitulo: 'TAM / SAM / SOM',
    tipo: 'mercado',
    contenido: [
      {sigla:'TAM',valor:'USD 4.5B',desc:'Mercado carbono LATAM total',color:'#22c55e'},
      {sigla:'SAM',valor:'USD 380M',desc:'Residuos urbanos certificables AR + MX + CO',color:'#3b82f6'},
      {sigla:'SOM',valor:'USD 1.2M',desc:'CABA · año 1 · 300 consorcios',color:'#f59e0b'},
    ],
    bg: 'linear-gradient(135deg,#0a0a1a,#0a0e1a)',
  },
  {
    id: 11,
    titulo: 'El equipo',
    subtitulo: 'Construido con USD 0 de inversión externa',
    tipo: 'equipo',
    contenido: [
      {nombre:'Juan Pablo Sanguinetti de Zapata',rol:'CEO & Founder',desc:'Director de teatro chileno y abogado. Product builder con IA. Especialidad en medio ambiente, tributación y gestión de proyectos. Arquitecto del ecosistema Circulab desde Buenos Aires.',foto:'/founders/founder-jp.jpg',color:'#22c55e'},
      {nombre:'Mileidy Zapata de Sanguinetti',rol:'COO & Co-founder',desc:'Madre, bailarina y coreógrafa dominicana. Un corazón, tres países, una misión: desarrollar la comunidad y mejorar la calidad de vida. Junto a OLIVIA y Santino Eloy, dieron comienzo al piloto en casa.',foto:'/founders/founder-mileidy.jpg',color:'#3b82f6'},
    ],
    bg: 'linear-gradient(135deg,#0a1a0a,#0a0e1a)',
  },
  {
    id: 12,
    titulo: 'La ronda Seed 2026',
    subtitulo: 'Producto activo · USD 0 gastado · Ronda abierta',
    tipo: 'ronda',
    contenido: [
      {
        opcion:'Opción A',
        monto:'USD 500.000',
        equity:'10%',
        pre:'USD 4.5M pre-money',
        uso:'CTO + auditoría código (mes 1-2) · 2 devs smart contracts (mes 1-3) · Certificación Verra AMS-III.AJ + VMR0007 (mes 3-6) · Piloto 3 consorcios · Reserva operativa 6 meses',
        color:'#22c55e'
      },
      {
        opcion:'Opción B',
        monto:'USD 2.000.000',
        equity:'15%',
        pre:'USD 11.3M pre-money',
        uso:'Todo lo anterior + Expansión LATAM + Serie A 2027',
        color:'#3b82f6'
      },
    ],
    bg: 'linear-gradient(135deg,#0a0a1a,#050d1f)',
  },
  {
    id: 13,
    titulo: 'Próximos pasos',
    subtitulo: '¿Querés ser parte?',
    tipo: 'cierre',
    contenido: [
      {icon:'🏢',texto:'Piloto con 3 consorcios en CABA — Q3 2026'},
      {icon:'✅',texto:'Certificación VCS Verra iniciada — Q4 2026'},
      {icon:'🌎',texto:'Expansión México y Colombia — 2027'},
      {icon:'📈',texto:'Serie A USD 5M — 2027'},
    ],
    bg: 'linear-gradient(135deg,#0a1a0a,#0a0e1a)',
  },
]

export default function Pitch() {
  const [acceso, setAcceso] = useState(false)
  const [slide, setSlide] = useState(0)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  async function solicitarAcceso() {
    if(!nombre||!email){setError('Nombre y email requeridos');return}
    setGuardando(true)
    await supabase.from('leads_inversores').insert({nombre,email,empresa,status:'nuevo'})
    setAcceso(true)
    setGuardando(false)
  }

  function siguiente() { if(slide<SLIDES.length-1) setSlide(s=>s+1) }
  function anterior() { if(slide>0) setSlide(s=>s-1) }

  const s = SLIDES[slide]

  if(!acceso) return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0a1a0a,#0a0e1a,#0a0a1a)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
      <div style={{width:'100%',maxWidth:420}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:64,height:64,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:20,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:28,color:'white',margin:'0 auto 16px'}}>O</div>
          <div style={{fontSize:24,fontWeight:900,color:'#f1f5f9',marginBottom:8}}>OLIVIA Circulab</div>
          <div style={{fontSize:13,color:'#64748b',lineHeight:1.6}}>Pitch deck confidencial · Ronda Seed 2026</div>
        </div>
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:'28px'}}>
          <div style={{fontSize:15,fontWeight:700,color:'#f1f5f9',marginBottom:4}}>Solicitá acceso al pitch</div>
          <div style={{fontSize:12,color:'#64748b',marginBottom:20}}>Dejá tus datos para ver el deck completo</div>
          {[
            {v:nombre,fn:setNombre,ph:'Tu nombre completo',type:'text'},
            {v:email,fn:setEmail,ph:'Tu email',type:'email'},
            {v:empresa,fn:setEmpresa,ph:'Empresa u organización (opcional)',type:'text'},
          ].map((f,i)=>(
            <input key={i} type={f.type} value={f.v} onChange={e=>f.fn(e.target.value)}
              placeholder={f.ph}
              style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:10}} />
          ))}
          {error&&<div style={{fontSize:12,color:'#ef4444',marginBottom:10}}>{error}</div>}
          <button onClick={solicitarAcceso} disabled={guardando}
            style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 0 30px rgba(34,197,94,0.3)'}}>
            {guardando?'Guardando...':'Ver pitch deck →'}
          </button>
          <div style={{fontSize:10,color:'#64748b',textAlign:'center',marginTop:12}}>
            Información confidencial · No compartir sin autorización
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:s.bg,color:'#f1f5f9',fontFamily:'system-ui',display:'flex',flexDirection:'column'}}>

      {/* Header */}
      <div style={{padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:28,height:28,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:12,color:'white'}}>O</div>
          <span style={{fontSize:12,fontWeight:700,color:'#f1f5f9'}}>OLIVIA Circulab</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <a href="/" style={{fontSize:11,color:'#64748b',textDecoration:'none'}}>← Inicio</a>
          <div style={{fontSize:11,color:'#64748b'}}>Slide {slide+1} / {SLIDES.length}</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{height:3,background:'rgba(255,255,255,0.06)'}}>
        <div style={{height:'100%',width:`${((slide+1)/SLIDES.length)*100}%`,background:'linear-gradient(90deg,#22c55e,#3b82f6)',transition:'width 0.3s'}} />
      </div>

      {/* Slide content */}
      <div style={{flex:1,padding:'24px 20px',display:'flex',flexDirection:'column',justifyContent:'center',maxWidth:600,margin:'0 auto',width:'100%'}}>

        {/* Portada */}
        {s.tipo==='portada'&&(
          <div style={{textAlign:'center'}}>
            <div style={{width:80,height:80,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:36,color:'white',margin:'0 auto 24px'}}>O</div>
            <div style={{fontSize:32,fontWeight:900,marginBottom:12,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{fontSize:14,color:'#22c55e',marginBottom:24,lineHeight:1.6}}>{s.subtitulo}</div>
            <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
              <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:10,padding:'8px 16px',fontSize:12,color:'#22c55e'}}>🌱 Tramo Semilla · 2026</div>
              <div style={{background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:10,padding:'8px 16px',fontSize:12,color:'#3b82f6'}}>Distrito Tecnológico · Buenos Aires</div>
              <div style={{background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:10,padding:'8px 16px',fontSize:12,color:'#a855f7'}}>Ley 27.506 · 1.4x</div>
            </div>
          </div>
        )}

        {/* Historia */}
        {s.tipo==='historia'&&(
          <div>
            <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:20,lineHeight:1.2}}>{s.titulo}</div>
            {s.contenido?.map((c:any,i:number)=>(
              <div key={i} style={{display:'flex',gap:12,padding:'12px',borderRadius:12,background:'rgba(255,255,255,0.03)',marginBottom:8,alignItems:'center'}}>
                <span style={{fontSize:24,flexShrink:0}}>{c.icon}</span>
                <span style={{fontSize:13,color:'#f1f5f9',lineHeight:1.5}}>{c.texto}</span>
              </div>
            ))}
          </div>
        )}

        {/* Problema */}
        {s.tipo==='problema'&&(
          <div>
            <div style={{fontSize:11,color:'#ef4444',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:20,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:14,padding:'16px',textAlign:'center'}}>
                  <div style={{fontSize:28,fontWeight:900,color:'#ef4444',marginBottom:6}}>{c.stat}</div>
                  <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.4}}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Por qué funciona — NUEVO */}
        {s.tipo==='porquefunciona'&&(
          <div>
            <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:24,fontWeight:900,marginBottom:20,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{display:'flex',gap:12,padding:'14px',borderRadius:12,background:`rgba(255,255,255,0.03)`,border:`1px solid ${c.color}33`,alignItems:'flex-start'}}>
                  <span style={{fontSize:22,flexShrink:0}}>{c.icon}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:c.color,marginBottom:4}}>{c.titulo}</div>
                    <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.5,fontStyle:'italic'}}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solución */}
        {s.tipo==='solucion'&&(
          <div>
            <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:20,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{display:'flex',gap:12,padding:'14px',borderRadius:12,background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',alignItems:'flex-start'}}>
                  <span style={{fontSize:24,flexShrink:0}}>{c.icon}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:'#22c55e',marginBottom:2}}>{c.titulo}</div>
                    <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.4}}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Producto */}
        {s.tipo==='producto'&&(
          <div>
            <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:20,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{display:'flex',gap:10,padding:'10px 14px',borderRadius:10,background:'rgba(34,197,94,0.06)',alignItems:'center'}}>
                  <span style={{fontSize:16}}>{c.icon}</span>
                  <span style={{fontSize:13,color:'#f1f5f9'}}>{c.texto}</span>
                </div>
              ))}
            </div>
            <div style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:12,color:'#22c55e',fontWeight:700}}>🚀 Construido con USD 0 · Cloudflare AI + Supabase + Vercel</div>
              <div style={{fontSize:11,color:'#64748b',marginTop:4}}>Stack 100% gratuito · Sin equipo técnico externo</div>
            </div>
          </div>
        )}

        {/* Los 6 tramos — NUEVO */}
        {s.tipo==='tramos'&&(
          <div>
            <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:24,fontWeight:900,marginBottom:16,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{display:'flex',gap:10,padding:'10px 12px',borderRadius:12,background:c.activo?`rgba(34,197,94,0.08)`:'rgba(255,255,255,0.02)',border:`1px solid ${c.color}${c.activo?'44':'22'}`,alignItems:'center'}}>
                  <span style={{fontSize:18,flexShrink:0}}>{c.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                      <span style={{fontSize:11,fontWeight:800,color:c.color}}>{c.tramo}</span>
                      <span style={{fontSize:9,color:'#64748b'}}>· {c.año}</span>
                      {c.activo&&<span style={{fontSize:9,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'1px 6px',borderRadius:10,fontWeight:700}}>ACTIVA</span>}
                    </div>
                    <div style={{fontSize:10,color:'#64748b'}}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:10,padding:'10px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,textAlign:'center'}}>
              <span style={{fontSize:11,color:'#f59e0b',fontWeight:700}}>💰 Los que entran hoy en Semilla cobran primero en Árbol — 2027</span>
            </div>
          </div>
        )}

        {/* Segmentos */}
        {s.tipo==='segmentos'&&(
          <div>
            <div style={{fontSize:11,color:'#3b82f6',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:16,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 12px',borderRadius:10,background:'rgba(255,255,255,0.03)'}}>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <div style={{width:22,height:22,borderRadius:'50%',background:'rgba(59,130,246,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#3b82f6',flexShrink:0}}>{i+1}</div>
                    <span style={{fontSize:12,color:'#f1f5f9'}}>{c.tipo}</span>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:11,fontWeight:700,color:'#22c55e'}}>{c.fee}</div>
                    <div style={{fontSize:9,color:'#64748b'}}>{c.canal}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fuentes */}
        {s.tipo==='fuentes'&&(
          <div>
            <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:16,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {s.contenido?.map((c:any)=>(
                <div key={c.num} style={{display:'flex',gap:10,padding:'12px',borderRadius:12,background:'rgba(255,255,255,0.03)',alignItems:'center'}}>
                  <div style={{width:28,height:28,borderRadius:8,background:c.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'white',flexShrink:0}}>{c.num}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700}}>{c.titulo}</div>
                    <div style={{fontSize:10,color:'#64748b'}}>{c.desc}</div>
                  </div>
                  <div style={{fontSize:13,fontWeight:800,color:c.color,flexShrink:0}}>{c.valor}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:12,padding:'12px',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,textAlign:'center'}}>
              <div style={{fontSize:11,color:'#64748b',marginBottom:4}}>Total estimado · Estimación orientativa</div>
              <div style={{fontSize:22,fontWeight:900,color:'#22c55e'}}>USD 1.125/mes</div>
            </div>
          </div>
        )}

        {/* Mercado */}
        {s.tipo==='mercado'&&(
          <div>
            <div style={{fontSize:11,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:20,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{display:'flex',gap:14,padding:'16px',borderRadius:14,background:`rgba(255,255,255,0.03)`,border:`1px solid ${c.color}33`,alignItems:'center'}}>
                  <div style={{fontSize:20,fontWeight:900,color:c.color,minWidth:48}}>{c.sigla}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:22,fontWeight:900,color:c.color}}>{c.valor}</div>
                    <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Equipo */}
        {s.tipo==='equipo'&&(
          <div>
            <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:20,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{display:'flex',gap:14,padding:'16px',borderRadius:14,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(34,197,94,0.15)',alignItems:'flex-start'}}>
                  <img src={c.foto} alt={c.nombre} style={{width:48,height:48,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:`2px solid ${c.color}`}} />
                  <div>
                    <div style={{fontSize:14,fontWeight:700,marginBottom:2}}>{c.nombre}</div>
                    <div style={{fontSize:11,color:'#22c55e',marginBottom:4}}>{c.rol}</div>
                    <div style={{fontSize:11,color:'#64748b',lineHeight:1.5}}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:12,padding:'12px',background:'rgba(34,197,94,0.06)',borderRadius:12,textAlign:'center'}}>
              <div style={{fontSize:12,color:'#22c55e',fontWeight:700}}>🚀 Todo el producto construido por los fundadores con IA</div>
              <div style={{fontSize:10,color:'#64748b',marginTop:2}}>Sin equipo técnico externo · USD 0 gastado · Distrito Tecnológico · Buenos Aires · Ley 27.506</div>
            </div>
          </div>
        )}

        {/* Ronda — ACTUALIZADO */}
        {s.tipo==='ronda'&&(
          <div>
            <div style={{fontSize:11,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:16,lineHeight:1.2}}>{s.titulo}</div>

            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:14}}>
              {s.contenido?.map((c:any)=>(
                <div key={c.opcion} style={{padding:'16px',borderRadius:14,background:'rgba(255,255,255,0.03)',border:`2px solid ${c.color}44`}}>
                  <div style={{fontSize:11,color:c.color,fontWeight:700,marginBottom:8}}>{c.opcion}</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}}>
                    {[
                      {l:'Monto',v:c.monto},
                      {l:'Equity',v:c.equity},
                      {l:'Pre-money',v:c.pre},
                    ].map(item=>(
                      <div key={item.l} style={{background:'rgba(255,255,255,0.03)',borderRadius:8,padding:'8px'}}>
                        <div style={{fontSize:9,color:'#64748b'}}>{item.l}</div>
                        <div style={{fontSize:11,fontWeight:700,color:'#f1f5f9',marginTop:1}}>{item.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:10,color:'#64748b',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:8}}>{c.uso}</div>
                </div>
              ))}
            </div>

            {/* Garantías para el inversor */}
            <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'12px',marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8}}>🏛️ Garantías para el inversor</div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {[
                  {icon:'📊',t:'Reporting mensual verificado'},
                  {icon:'🔐',t:'Milestone-based disbursement'},
                  {icon:'🛡️',t:'Anti-dilution · Tag-along rights'},
                  {icon:'✅',t:'Sin costos fijos hasta inversión comprometida'},
                  {icon:'💎',t:'USD 1 invertido = USD 1.4 efectivos · Ley 27.506'},
                ].map((g,i)=>(
                  <div key={i} style={{display:'flex',gap:8,alignItems:'center'}}>
                    <span style={{fontSize:14}}>{g.icon}</span>
                    <span style={{fontSize:11,color:'#94a3b8'}}>{g.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{padding:'8px',background:'rgba(255,255,255,0.03)',borderRadius:10,fontSize:10,color:'#64748b',textAlign:'center'}}>
              Equity directo · Sin ratchets · Sin intereses · Liquidation preference 1× · Distrito Tecnológico · Buenos Aires · Estabilidad fiscal 10 años
            </div>
          </div>
        )}

        {/* Cierre */}
        {s.tipo==='cierre'&&(
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>{s.subtitulo}</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:20,lineHeight:1.2}}>{s.titulo}</div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
              {s.contenido?.map((c:any,i:number)=>(
                <div key={i} style={{display:'flex',gap:12,padding:'12px',borderRadius:12,background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',alignItems:'center'}}>
                  <span style={{fontSize:20,flexShrink:0}}>{c.icon}</span>
                  <span style={{fontSize:13,color:'#f1f5f9',textAlign:'left'}}>{c.texto}</span>
                </div>
              ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <a href="mailto:hola@oliviacirculab.com.ar?subject=Interesado en invertir en OLIVIA Circulab"
                style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px',borderRadius:14,fontSize:14,fontWeight:700,textDecoration:'none',display:'block',boxShadow:'0 0 30px rgba(34,197,94,0.3)'}}>
                📩 hola@oliviacirculab.com.ar
              </a>
              <a href="/simulador"
                style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',padding:'12px',borderRadius:14,fontSize:13,fontWeight:600,textDecoration:'none',display:'block'}}>
                Ver simulador de ahorro →
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Navegación */}
      <div style={{padding:'16px 20px',borderTop:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <button onClick={anterior} disabled={slide===0}
          style={{background:slide===0?'rgba(255,255,255,0.02)':'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,padding:'10px 20px',color:slide===0?'#64748b':'#f1f5f9',fontSize:13,fontWeight:600,cursor:slide===0?'not-allowed':'pointer'}}>
          ← Anterior
        </button>

        <div style={{display:'flex',gap:4}}>
          {SLIDES.map((_,i)=>(
            <button key={i} onClick={()=>setSlide(i)}
              style={{width:i===slide?20:6,height:6,borderRadius:99,background:i===slide?'#22c55e':'rgba(255,255,255,0.2)',border:'none',cursor:'pointer',transition:'all 0.2s',padding:0}} />
          ))}
        </div>

        <button onClick={siguiente} disabled={slide===SLIDES.length-1}
          style={{background:slide===SLIDES.length-1?'rgba(255,255,255,0.02)':'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'10px 20px',color:slide===SLIDES.length-1?'#64748b':'white',fontSize:13,fontWeight:600,cursor:slide===SLIDES.length-1?'not-allowed':'pointer'}}>
          Siguiente →
        </button>
      </div>
    </div>
  )
}
