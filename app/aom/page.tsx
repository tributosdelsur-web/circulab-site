'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const T = {
  es: {
    badge:'Art of Money · Circulab Tech',
    titulo:'Tu arte genera dinero hoy.',
    titulo2:'No en 18 meses.',
    subtitulo:'AOM convierte tus regalías futuras — musicales, deportivas, literarias o audiovisuales — en capital real hoy. Sin ceder tu obra. Sin perder tus derechos.',
    tipos_titulo:'¿Qué tipo de creador sos?',
    como_titulo:'¿Cómo funciona?',
    fases_titulo:'Las 4 fases de AOM',
    sim_titulo:'Simulador AOM',
    sim_sub:'Estimación orientativa de tu adelanto',
    sim_tipo:'Tipo de regalía',
    sim_monto:'Ingresos mensuales estimados (USD)',
    sim_meses:'Meses de historial',
    sim_resultado:'Adelanto estimado',
    sim_nota:'Estimación orientativa · Sujeto a verificación de historial · Sin ceder derechos',
    conexion_titulo:'Más OLV + mejor PULSO = mejor tasa en AOM',
    conexion_sub:'Los tres verticales de Circulab Tech se potencian entre sí',
    cta_titulo:'¿Querés acceder a AOM?',
    cta_sub:'Dejá tus datos y te contactamos para evaluar tu caso',
    nombre:'Tu nombre',
    email:'Tu email',
    tipo_regalias:'Tipo de regalías',
    enviar:'Solicitar evaluación →',
    enviando:'Enviando...',
    enviado:'¡Gracias! Te contactamos en 48 horas.',
    volver:'← Inicio',
  },
  en: {
    badge:'Art of Money · Circulab Tech',
    titulo:'Your art generates money today.',
    titulo2:'Not in 18 months.',
    subtitulo:'AOM converts your future royalties — music, sports, literary or audiovisual — into real capital today. Without giving up your work. Without losing your rights.',
    tipos_titulo:'What type of creator are you?',
    como_titulo:'How does it work?',
    fases_titulo:'4 AOM Phases',
    sim_titulo:'AOM Simulator',
    sim_sub:'Indicative estimate of your advance',
    sim_tipo:'Royalty type',
    sim_monto:'Estimated monthly income (USD)',
    sim_meses:'Months of history',
    sim_resultado:'Estimated advance',
    sim_nota:'Indicative estimate · Subject to history verification · No rights transfer',
    conexion_titulo:'More OLV + better PULSO = better rate in AOM',
    conexion_sub:'All three Circulab Tech verticals power each other',
    cta_titulo:'Want to access AOM?',
    cta_sub:'Leave your details and we\'ll contact you to evaluate your case',
    nombre:'Your name',
    email:'Your email',
    tipo_regalias:'Royalty type',
    enviar:'Request evaluation →',
    enviando:'Sending...',
    enviado:'Thank you! We\'ll contact you within 48 hours.',
    volver:'← Home',
  }
}

const TIPOS = [
  {
    icon:'🎵',
    titulo_es:'Músico / Compositor',
    titulo_en:'Musician / Composer',
    desc_es:'Regalías de Spotify, Apple Music, YouTube Music, SADAIC, CAPIF. Si generás más de USD 500/mes en streaming — AOM puede adelantarte hasta 24 meses.',
    desc_en:'Royalties from Spotify, Apple Music, YouTube Music, SADAIC, CAPIF. If you generate more than USD 500/mo in streaming — AOM can advance up to 24 months.',
    ejemplos_es:['Streaming (Spotify, Apple, Deezer)','Derechos de autor (SADAIC, CAPIF)','Sincronización (películas, series, publicidad)','YouTube Content ID','Merchandising y licencias'],
    ejemplos_en:['Streaming (Spotify, Apple, Deezer)','Copyright (SADAIC, CAPIF)','Sync (films, series, advertising)','YouTube Content ID','Merchandise and licenses'],
    color:'#a855f7',
    tasa:'6-12% anual',
  },
  {
    icon:'⚽',
    titulo_es:'Deportista profesional',
    titulo_en:'Professional athlete',
    desc_es:'Derechos de imagen, bonos de rendimiento, contratos de sponsorship, regalías de camisetas y productos licenciados. Si tenés contratos verificables — AOM puede adelantarte.',
    desc_en:'Image rights, performance bonuses, sponsorship contracts, jersey royalties and licensed products. If you have verifiable contracts — AOM can advance you.',
    ejemplos_es:['Derechos de imagen verificados','Bonos de rendimiento contractuales','Sponsorships y endorsements','Regalías de camisetas y merchandising','Contratos de transferencia diferida'],
    ejemplos_en:['Verified image rights','Contractual performance bonuses','Sponsorships and endorsements','Jersey and merchandise royalties','Deferred transfer contracts'],
    color:'#22c55e',
    tasa:'8-15% anual',
  },
  {
    icon:'🎬',
    titulo_es:'Creador audiovisual',
    titulo_en:'Audiovisual creator',
    desc_es:'Regalías de Netflix, HBO, Amazon Prime, Disney+. Derechos de distribución, ventas de formato, licencias internacionales. Historial verificable = adelanto real.',
    desc_en:'Royalties from Netflix, HBO, Amazon Prime, Disney+. Distribution rights, format sales, international licenses. Verifiable history = real advance.',
    ejemplos_es:['Regalías de plataformas streaming','Derechos de distribución internacional','Venta de formatos y adaptaciones','Licencias de contenido','Publicidad en YouTube / TikTok'],
    ejemplos_en:['Streaming platform royalties','International distribution rights','Format and adaptation sales','Content licenses','YouTube / TikTok advertising'],
    color:'#3b82f6',
    tasa:'7-13% anual',
  },
  {
    icon:'📚',
    titulo_es:'Escritor / Autor',
    titulo_en:'Writer / Author',
    desc_es:'Regalías editoriales, derechos de traducción, adaptaciones cinematográficas, audiolibros. Si tenés un historial de ventas verificable — AOM puede adelantarte.',
    desc_en:'Publishing royalties, translation rights, film adaptations, audiobooks. If you have a verifiable sales history — AOM can advance you.',
    ejemplos_es:['Regalías editoriales (8-15% del precio)','Derechos de traducción','Adaptaciones cinematográficas o series','Audiolibros (Audible, Spotify)','Licencias internacionales'],
    ejemplos_en:['Publishing royalties (8-15% of price)','Translation rights','Film or series adaptations','Audiobooks (Audible, Spotify)','International licenses'],
    color:'#f59e0b',
    tasa:'6-11% anual',
  },
  {
    icon:'🎮',
    titulo_es:'Desarrollador de videojuegos',
    titulo_en:'Game developer',
    desc_es:'Regalías de Steam, App Store, Google Play, Epic Games Store. Licencias de IP, DLCs, skins y contenido adicional. Ingresos recurrentes = elegible para AOM.',
    desc_en:'Royalties from Steam, App Store, Google Play, Epic Games Store. IP licenses, DLCs, skins and additional content. Recurring revenue = eligible for AOM.',
    ejemplos_es:['Revenue share Steam / Epic / App Store','Licencias de IP y personajes','DLCs y contenido descargable','Suscripciones y pases de temporada','Torneos y esports'],
    ejemplos_en:['Revenue share Steam / Epic / App Store','IP and character licenses','DLCs and downloadable content','Subscriptions and season passes','Tournaments and esports'],
    color:'#ef4444',
    tasa:'7-12% anual',
  },
  {
    icon:'🎨',
    titulo_es:'Artista visual / NFT',
    titulo_en:'Visual artist / NFT',
    desc_es:'Regalías de reventa en plataformas NFT, licencias de obra, prints y reproducciones, comisiones corporativas. Flujo de ingresos verificable = elegible.',
    desc_en:'Resale royalties on NFT platforms, artwork licenses, prints and reproductions, corporate commissions. Verifiable income flow = eligible.',
    ejemplos_es:['Regalías de reventa NFT (2.5-10%)','Licencias de obra para uso comercial','Prints y reproducciones físicas','Comisiones corporativas','Galerías y subastas'],
    ejemplos_en:['NFT resale royalties (2.5-10%)','Artwork licenses for commercial use','Prints and physical reproductions','Corporate commissions','Galleries and auctions'],
    color:'#ec4899',
    tasa:'8-14% anual',
  },
]

const PASOS = [
  {num:'01',icon:'📋',es:{t:'Verificás tu historial',d:'Subís tus estados de cuenta de regalías de los últimos 6-24 meses. OLIVIA verifica con las fuentes: SADAIC, Spotify for Artists, tu editorial, tu club.'},en:{t:'Verify your history',d:'Upload your royalty account statements from the last 6-24 months. OLIVIA verifies with sources: SADAIC, Spotify for Artists, your publisher, your club.'},c:'#22c55e'},
  {num:'02',icon:'🤖',es:{t:'IA evalúa tu perfil',d:'Nuestro modelo evalúa la estabilidad, tendencia y proyección de tus ingresos. Genera una tasa personalizada y un monto máximo de adelanto.'},en:{t:'AI evaluates your profile',d:'Our model evaluates the stability, trend and projection of your income. Generates a personalized rate and maximum advance amount.'},c:'#3b82f6'},
  {num:'03',icon:'💰',es:{t:'Recibís el adelanto',d:'Recibís el capital en tu cuenta en 48-72 horas. Sin ceder tu obra. Sin perder tus derechos. Sin socios no deseados. Solo un acuerdo financiero.'},en:{t:'You receive the advance',d:'You receive the capital in your account within 48-72 hours. Without giving up your work. Without losing your rights. Without unwanted partners. Just a financial agreement.'},c:'#f59e0b'},
  {num:'04',icon:'🔄',es:{t:'Devolvés con tus regalías',d:'El repago se descuenta automáticamente de tus regalías futuras. Si un mes ingresa menos — pagás menos. Nunca de tu bolsillo directo.'},en:{t:'You repay with your royalties',d:'Repayment is automatically deducted from your future royalties. If a month brings less — you pay less. Never directly from your pocket.'},c:'#a855f7'},
]

const FASES = [
  {fase:'Fase 1',año:'2026 · Piloto',es:'Evaluación manual de casos seleccionados. Músicos y deportistas con historial verificable en Argentina.',en:'Manual evaluation of selected cases. Musicians and athletes with verifiable history in Argentina.',c:'#22c55e',activo:true},
  {fase:'Fase 2',año:'Q1 2027',es:'Plataforma automatizada. Integración directa con SADAIC, Spotify for Artists, Spotify API. Evaluación en 24 horas.',en:'Automated platform. Direct integration with SADAIC, Spotify for Artists, Spotify API. Evaluation in 24 hours.',c:'#3b82f6',activo:false},
  {fase:'Fase 3',año:'Q3 2027',es:'Expansión LATAM. México (SACM), Colombia (SAYCO), Brasil (ECAD). Deportistas de fútbol, tenis y básquet.',en:'LATAM expansion. Mexico (SACM), Colombia (SAYCO), Brazil (ECAD). Football, tennis and basketball athletes.',c:'#f59e0b',activo:false},
  {fase:'Fase 4',año:'2028',es:'Tokenización de regalías en blockchain. OLV como colateral para AOM. Mercado secundario de regalías tokenizadas.',en:'Royalty tokenization on blockchain. OLV as collateral for AOM. Secondary market for tokenized royalties.',c:'#a855f7',activo:false},
]

export default function AOM() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(true)
  const [tipoSel, setTipoSel] = useState(0)
  const [simTipo, setSimTipo] = useState('Música')
  const [simMonto, setSimMonto] = useState(1000)
  const [simMeses, setSimMeses] = useState(12)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [tipoRegalias, setTipoRegalias] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const t = T[lang]
  const bg = dark?'#0a0e1a':'#f0f4f8'
  const text = dark?'#f1f5f9':'#0a0e1a'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
  const sub = dark?'#94a3b8':'#475569'

  const FACTORES: Record<string,number> = {
    'Música':18, 'Music':18,
    'Deportes':16, 'Sports':16,
    'Audiovisual':15, 'Audiovisual_en':15,
    'Literatura':14, 'Literature':14,
    'Videojuegos':14, 'Video Games':14,
    'Arte Visual':13, 'Visual Art':13,
  }

  const factor = FACTORES[simTipo] || FACTORES[simTipo+'_en'] || 15
  const adelanto = Math.round(simMonto * (simMeses/12) * (factor/10))

  async function enviar() {
    if(!nombre||!email) return
    setEnviando(true)
    await supabase.from('leads_aom').insert({nombre, email, tipo: tipoRegalias, status:'nuevo'})
    setEnviado(true)
    setEnviando(false)
  }

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.2s'}}>

      {/* Nav */}
      <nav style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#a855f7,#ec4899)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>A</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,color:text}}>Art of Money</div>
            <div style={{fontSize:9,color:'#a855f7',textTransform:'uppercase'}}>Circulab Tech</div>
          </div>
        </div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <button onClick={()=>setLang(lang==='es'?'en':'es')}
            style={{background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:6,padding:'4px 10px',color:'#a855f7',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            {lang==='es'?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)}
            style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
            {dark?'☀️':'🌙'}
          </button>
          <a href="/" style={{fontSize:11,color:sub,textDecoration:'none'}}>{t.volver}</a>
        </div>
      </nav>

      <div style={{maxWidth:580,margin:'0 auto',padding:'32px 20px 60px'}}>

        {/* Hero */}
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:20,padding:'5px 14px',fontSize:10,color:'#a855f7',fontWeight:700,marginBottom:16}}>
            {t.badge}
          </div>
          <h1 style={{fontSize:32,fontWeight:900,lineHeight:1.15,marginBottom:12}}>
            <span style={{color:text}}>{t.titulo}</span>
            <br/>
            <span style={{color:'#a855f7'}}>{t.titulo2}</span>
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.7}}>{t.subtitulo}</p>
        </div>

        {/* Tipos de creador */}
        <div style={{fontSize:14,fontWeight:700,color:text,marginBottom:12}}>{t.tipos_titulo}</div>
        <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:8,marginBottom:16}}>
          {TIPOS.map((tipo,i)=>(
            <button key={i} onClick={()=>setTipoSel(i)}
              style={{background:tipoSel===i?`${tipo.color}20`:card,border:`1px solid ${tipoSel===i?tipo.color:border}`,borderRadius:10,padding:'10px 14px',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}>
              <div style={{fontSize:18,marginBottom:4}}>{tipo.icon}</div>
              <div style={{fontSize:11,fontWeight:700,color:tipoSel===i?tipo.color:sub}}>
                {lang==='es'?tipo.titulo_es:tipo.titulo_en}
              </div>
            </button>
          ))}
        </div>

        {/* Detalle del tipo seleccionado */}
        <div style={{background:card,border:`1px solid ${TIPOS[tipoSel].color}33`,borderRadius:14,padding:'16px',marginBottom:24}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
            <span style={{fontSize:28}}>{TIPOS[tipoSel].icon}</span>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:TIPOS[tipoSel].color}}>
                {lang==='es'?TIPOS[tipoSel].titulo_es:TIPOS[tipoSel].titulo_en}
              </div>
              <div style={{fontSize:10,color:sub}}>{lang==='es'?'Tasa estimada:':'Estimated rate:'} <span style={{color:TIPOS[tipoSel].color,fontWeight:700}}>{TIPOS[tipoSel].tasa}</span></div>
            </div>
          </div>
          <div style={{fontSize:12,color:sub,lineHeight:1.6,marginBottom:10}}>
            {lang==='es'?TIPOS[tipoSel].desc_es:TIPOS[tipoSel].desc_en}
          </div>
          <div style={{fontSize:11,fontWeight:700,color:TIPOS[tipoSel].color,marginBottom:6}}>
            {lang==='es'?'Tipos de regalías elegibles:':'Eligible royalty types:'}
          </div>
          {(lang==='es'?TIPOS[tipoSel].ejemplos_es:TIPOS[tipoSel].ejemplos_en).map((e,i)=>(
            <div key={i} style={{display:'flex',gap:6,padding:'3px 0',fontSize:11,color:sub}}>
              <span style={{color:TIPOS[tipoSel].color}}>→</span>{e}
            </div>
          ))}
        </div>

        {/* Cómo funciona */}
        <div style={{fontSize:14,fontWeight:700,color:text,marginBottom:12}}>{t.como_titulo}</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
          {PASOS.map(p=>(
            <div key={p.num} style={{display:'flex',gap:12,padding:'14px',background:card,borderRadius:12,border:`1px solid ${p.c}22`,alignItems:'flex-start'}}>
              <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${p.c},${p.c}99)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white',flexShrink:0}}>{p.num}</div>
              <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0,marginTop:4}}>
                <span style={{fontSize:18}}>{p.icon}</span>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:p.c,marginBottom:4}}>{lang==='es'?p.es.t:p.en.t}</div>
                <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{lang==='es'?p.es.d:p.en.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Simulador */}
        <div style={{background:card,border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px',marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:700,color:'#a855f7',marginBottom:4}}>{t.sim_titulo}</div>
          <div style={{fontSize:11,color:sub,marginBottom:16}}>{t.sim_sub}</div>

          <div style={{marginBottom:12}}>
            <div style={{fontSize:11,color:sub,marginBottom:6}}>{t.sim_tipo}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {(lang==='es'?['Música','Deportes','Audiovisual','Literatura','Videojuegos','Arte Visual']:['Music','Sports','Audiovisual','Literature','Video Games','Visual Art']).map(tipo=>(
                <button key={tipo} onClick={()=>setSimTipo(tipo)}
                  style={{padding:'6px 12px',borderRadius:8,border:`1px solid ${simTipo===tipo?'#a855f7':border}`,background:simTipo===tipo?'rgba(168,85,247,0.1)':dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)',color:simTipo===tipo?'#a855f7':sub,fontSize:11,fontWeight:simTipo===tipo?700:400,cursor:'pointer'}}>
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:sub,marginBottom:6}}>
              <span>{t.sim_monto}</span>
              <span style={{color:'#a855f7',fontWeight:700}}>USD {simMonto.toLocaleString()}</span>
            </div>
            <input type="range" min={100} max={20000} step={100} value={simMonto} onChange={e=>setSimMonto(Number(e.target.value))}
              style={{width:'100%',accentColor:'#a855f7'}} />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:sub,marginTop:2}}>
              <span>USD 100</span><span>USD 20.000</span>
            </div>
          </div>

          <div style={{marginBottom:16}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:sub,marginBottom:6}}>
              <span>{t.sim_meses}</span>
              <span style={{color:'#a855f7',fontWeight:700}}>{simMeses} {lang==='es'?'meses':'months'}</span>
            </div>
            <input type="range" min={3} max={24} step={1} value={simMeses} onChange={e=>setSimMeses(Number(e.target.value))}
              style={{width:'100%',accentColor:'#a855f7'}} />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:sub,marginTop:2}}>
              <span>3 {lang==='es'?'meses':'months'}</span><span>24 {lang==='es'?'meses':'months'}</span>
            </div>
          </div>

          <div style={{background:'rgba(168,85,247,0.08)',border:'1px solid rgba(168,85,247,0.2)',borderRadius:12,padding:'16px',textAlign:'center',marginBottom:8}}>
            <div style={{fontSize:11,color:sub,marginBottom:4}}>{t.sim_resultado}</div>
            <div style={{fontSize:32,fontWeight:900,color:'#a855f7'}}>USD {adelanto.toLocaleString()}</div>
            <div style={{fontSize:10,color:sub,marginTop:4}}>
              {lang==='es'?`Tasa estimada ${TIPOS.find((_,i)=>i===tipoSel)?.tasa || '10-15% anual'}`:
              `Estimated rate ${TIPOS.find((_,i)=>i===tipoSel)?.tasa || '10-15% annual'}`}
            </div>
          </div>
          <div style={{fontSize:10,color:sub,textAlign:'center'}}>{t.sim_nota}</div>
        </div>

        {/* Las 4 fases */}
        <div style={{fontSize:14,fontWeight:700,color:text,marginBottom:12}}>{t.fases_titulo}</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
          {FASES.map((f,i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:'12px 14px',background:f.activo?'rgba(34,197,94,0.06)':card,borderRadius:12,border:`1px solid ${f.c}${f.activo?'44':'22'}`,alignItems:'center'}}>
              <div style={{width:30,height:30,borderRadius:'50%',background:f.activo?f.c:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:f.activo?'white':sub,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
                  <div style={{fontSize:10,color:f.c,fontWeight:700}}>{f.fase} · {f.año}</div>
                  {f.activo&&<span style={{fontSize:9,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'2px 6px',borderRadius:10,fontWeight:700}}>{lang==='es'?'ACTIVA':'ACTIVE'}</span>}
                </div>
                <div style={{fontSize:11,color:sub}}>{lang==='es'?f.es:f.en}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Conexión con el ecosistema */}
        <div style={{background:'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(168,85,247,0.06))',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px',marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:700,color:'#a855f7',marginBottom:4}}>{t.conexion_titulo}</div>
          <div style={{fontSize:11,color:sub,marginBottom:12}}>{t.conexion_sub}</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              {icon:'🌿',nombre:'OLIVIA Circulab',desc:lang==='es'?'Más OLV acumulados → colateral para AOM':'More OLV accumulated → collateral for AOM',color:'#22c55e'},
              {icon:'👥',nombre:'Protocolo PULSO',desc:lang==='es'?'Mejor score PULSO → mejor tasa en AOM':'Better PULSO score → better rate in AOM',color:'#3b82f6'},
              {icon:'🎵',nombre:'Art of Money',desc:lang==='es'?'Capital hoy con tus regalías futuras':'Capital today with your future royalties',color:'#a855f7'},
            ].map(v=>(
              <div key={v.nombre} style={{display:'flex',gap:10,alignItems:'center'}}>
                <span style={{fontSize:20}}>{v.icon}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:v.color}}>{v.nombre}</div>
                  <div style={{fontSize:10,color:sub}}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{background:card,border:'1px solid rgba(168,85,247,0.2)',borderRadius:16,padding:'20px'}}>
          <div style={{fontSize:14,fontWeight:700,color:'#a855f7',marginBottom:4}}>{t.cta_titulo}</div>
          <div style={{fontSize:11,color:sub,marginBottom:16}}>{t.cta_sub}</div>
          {!enviado?(
            <div>
              {[
                {v:nombre,fn:setNombre,ph:t.nombre,type:'text'},
                {v:email,fn:setEmail,ph:t.email,type:'email'},
              ].map((f,i)=>(
                <input key={i} type={f.type} value={f.v} onChange={e=>f.fn(e.target.value)} placeholder={f.ph}
                  style={{width:'100%',padding:'10px 14px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
              ))}
              <div style={{marginBottom:12}}>
                <select value={tipoRegalias} onChange={e=>setTipoRegalias(e.target.value)}
                  style={{width:'100%',padding:'10px 14px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:tipoRegalias?text:sub,fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}}>
                  <option value="">{t.tipo_regalias}</option>
                  {(lang==='es'?['Música','Deportes','Audiovisual','Literatura','Videojuegos','Arte Visual']:['Music','Sports','Audiovisual','Literature','Video Games','Visual Art']).map(tipo=>(
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              <button onClick={enviar} disabled={enviando||!nombre||!email}
                style={{width:'100%',background:nombre&&email?'linear-gradient(135deg,#a855f7,#7c3aed)':'rgba(255,255,255,0.04)',border:'none',borderRadius:10,padding:'13px',color:nombre&&email?'white':sub,fontSize:14,fontWeight:700,cursor:'pointer'}}>
                {enviando?t.enviando:t.enviar}
              </button>
            </div>
          ):(
            <div style={{textAlign:'center',padding:'20px 0'}}>
              <div style={{fontSize:36,marginBottom:12}}>✅</div>
              <div style={{fontSize:14,fontWeight:700,color:'#a855f7',marginBottom:8}}>{t.enviado}</div>
              <a href="/" style={{background:'linear-gradient(135deg,#a855f7,#7c3aed)',color:'white',padding:'10px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
                {t.volver}
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
