'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const T = {
  es: {
    nav_entrar:'Entrar', nav_unirse:'Unirse',
    hero_badge:'🌱 Tramo Semilla · 2026 · Distrito IA Buenos Aires',
    hero_h1a:'Tu basura vale ', hero_h1b:'dinero real.',
    hero_h1c:'Hoy nadie ', hero_h1d:'lo captura.',
    hero_p1a:'OLIVIA convierte cada kilo de residuos en ',
    hero_p1b:'tokens OLV verificados con IA',
    hero_p1c:' que en 2027 se convierten en ',
    hero_p1d:'créditos de carbono certificados',
    hero_p1e:' y en ',
    hero_p1f:'dinero real en tu cuenta.',
    hero_p2:'Los que empiezan hoy acumulan el historial más valioso.',
    hero_p2b:' Los primeros siempre cobran más.',
    hero_cta1:'Empezar gratis →', hero_cta2:'¿Cuánto vale mi edificio?',
    kpi1:'Vecinos activos', kpi2:'Kg verificados', kpi3:'CO2eq evitados',
    progress_label:'Progreso hacia certificación VCS Verra',
    progress_sub:'Meta: 100 tCO2eq · Los que empiezan hoy cobran desde el día 1 de Fase 3',
    como_titulo:'Cómo funciona', como_sub:'De la foto a los créditos de carbono en 4 pasos',
    paso1_t:'Fotografiás el residuo', paso1_d:'La IA analiza el tipo y el peso. Con una moneda de $10 al lado, la estimación es precisa.',
    paso2_t:'Confirmás la disposición', paso2_d:'Llevás el residuo al punto verde o compostás en casa. La segunda foto con GPS activa tus OLV.',
    paso3_t:'Acumulás tokens OLV', paso3_d:'Cada kilo verificado genera tokens ambientales. La primera foto es referencial — los OLV se acreditan con la foto de entrega.',
    paso4_t:'Cobrás en Fase 3 — 2027', paso4_d:'OLIVIA certifica con Verra. Tus OLV se convierten en dinero real. Los que empezaron antes cobran más.',
    residuos_titulo:'Todos los residuos generan valor',
    residuos_sub:'No solo el orgánico — 7 tipos de residuos, 7 mercados de carbono',
    residuos_nota:'🔩 El metal genera 44× más valor que el vidrio. Cuantos más tipos separás — más OLV acumulás.',
    fases_titulo:'Los 6 tramos del ecosistema', fases_sub:'Los que entran hoy en Semilla cobran primero en Árbol',
    f1t:'Piloto dMRV activo', f1d:'Verificación con IA, tokens OLV, comunidad activa',
    f2t:'OLV canjeables', f2d:'Salud, transporte, apps, créditos de IA',
    f3t:'💰 Primer pago real', f3d:'Verra VCS · USD 22/t · 25% para el vecino',
    f4t:'Art. 6.4 París × 4', f4d:'Mercado regulado · USD 90/t · LATAM',
    activa:'ACTIVA',
    clientes_titulo:'8 tipos de cliente', clientes_sub:'Desde el vecino hasta el municipio',
    fuentes_titulo:'5 fuentes de valor',
    fuentes_sub:'Valores aproximados para un consorcio de 100 departamentos',
    fuentes_total:'Total estimado por consorcio',
    fuentes_nota:'Estimación orientativa · Consultanos por tu caso',
    fuentes_cta1:'Calcular mi consorcio →', fuentes_cta2:'Sumar mi edificio →',
    logistica_titulo:'Del tacho a la planta — conectado',
    logistica_sub:'OLIVIA conecta generadores con puntos verdes, cooperativas y plantas de reciclaje en tiempo real',
    logistica_nota_t:'Como Uber — pero para el reciclaje',
    logistica_nota:'Cada residuo tiene trazabilidad completa: quién lo generó, quién lo transportó, dónde llegó y cuándo. Eso es lo que hace el crédito de carbono verificable y certificable.',
    eco_titulo:'Tres verticales · Un ecosistema',
    eco_sub:'Más OLV → mejor PULSO → mejor tasa en AOM',
    fundadores_titulo:'El equipo', fundadores_sub:'Construido con USD 0 de inversión externa',
    jp_rol:'CEO & Founder',
    jp_desc:'Director de teatro chileno y abogado. Product builder con IA. Arquitecto del ecosistema Circulab desde Buenos Aires. Especialidad en medio ambiente, tributación y gestión de proyectos.',
    mileidy_rol:'COO & Co-founder',
    mileidy_desc:'Madre, bailarina y coreógrafa dominicana. Un corazón, tres países, una misión: desarrollar la comunidad y mejorar la calidad de vida. Representante de la sabiduría ancestral y la economía del cuidado. Junto a OLIVIA y Santino Eloy, dieron comienzo al piloto en casa.',
    equipo_nota:'Todo el producto construido por los fundadores con IA · Sin equipo técnico externo · USD 0 gastado',
    docs_titulo:'Documentos técnicos',
    docs_sub:'Accedé al whitepaper y al one pager de OLIVIA Circulab',
    wp_titulo:'Whitepaper Técnico',
    wp_desc:'Tokenómica completa, modelo dMRV, mercados de carbono, roadmap y arquitectura del sistema.',
    wp_cta:'Descargar Whitepaper →',
    op_titulo:'One Pager',
    op_desc:'Resumen ejecutivo para inversores. El modelo, los números y la oportunidad en una página.',
    op_cta:'Descargar One Pager →',
    alianzas_titulo:'¿Querés ser partner de OLIVIA?',
    alianzas_sub:'Los OLV que recibís hoy son una cuenta por cobrar. No un descuento.',
    alianzas_nota_t:'¿Por qué aceptar OLV?',
    alianzas_nota:'Cuando OLIVIA certifique con Verra en 2027, los OLV que acumulaste se convierten en dinero real. Las empresas que entran antes acumulan más OLV cuando valen poco — y cobran más cuando valen más.',
    alianzas_cta:'Quiero ser partner →',
    inv_titulo:'Ronda Seed 2026',
    inv_sub:'Producto activo · USD 0 gastado · Ronda abierta',
    inv_nota:'Sin costos fijos hasta inversión comprometida · Equity directo · Sin ratchets · Sin intereses · Ley Economía del Conocimiento 27.506 · Estabilidad fiscal 10 años',
    inv_form_t:'Acceder al pitch deck',
    inv_form_sub:'Dejá tus datos para ver el deck completo',
    inv_nombre:'Tu nombre', inv_email:'Tu email',
    inv_empresa:'Empresa u organización (opcional)',
    inv_btn:'Ver pitch deck →',
    inv_gracias:'¡Gracias! Te redirigimos al pitch.',
    encuesta_titulo:'¿Qué pensás de OLIVIA?',
    encuesta_sub:'Completá la encuesta de 2 minutos y ayudanos a mejorar el producto. Tu opinión construye OLIVIA.',
    encuesta_cta:'Completar encuesta →',
    invitar_titulo:'Invitá a tus amigos',
    invitar_sub:'Ganás +200 OLV por cada amigo que se registre',
    invitar_nota:'+200 OLV por cada amigo que se registre y verifique su primer residuo',
    comunidad_titulo:'Esto pasa en OLIVIA ahora',
    comunidad_sub:'Vecinos reales reciclando en tiempo real',
    comunidad_cta:'Ver toda la comunidad →',
    footer_copy:'© 2026 Circulab Tech · Distrito IA · Buenos Aires, Argentina · Ley 27.506',
  },
  en: {
    nav_entrar:'Sign in', nav_unirse:'Join',
    hero_badge:'🌱 Seed Stage · 2026 · AI District Buenos Aires',
    hero_h1a:'Your trash is worth ', hero_h1b:'real money.',
    hero_h1c:'Right now nobody ', hero_h1d:'captures it.',
    hero_p1a:'OLIVIA turns every kilo of waste into ',
    hero_p1b:'AI-verified OLV tokens',
    hero_p1c:' that in 2027 become ',
    hero_p1d:'certified carbon credits',
    hero_p1e:' and ',
    hero_p1f:'real money in your account.',
    hero_p2:'Those who start today build the most valuable track record.',
    hero_p2b:' Early adopters always earn more.',
    hero_cta1:'Start for free →', hero_cta2:"What's my building worth?",
    kpi1:'Active neighbors', kpi2:'Verified kg', kpi3:'CO2eq avoided',
    progress_label:'Progress toward Verra VCS certification',
    progress_sub:'Goal: 100 tCO2eq · Early starters earn from Phase 3 day 1',
    como_titulo:'How it works', como_sub:'From photo to carbon credits in 4 steps',
    paso1_t:'Photograph the waste', paso1_d:"AI analyzes type and weight. With a coin for reference, estimates are precise.",
    paso2_t:'Confirm disposal', paso2_d:'Take waste to a green point or compost at home. Second photo with GPS activates your OLV.',
    paso3_t:'Accumulate OLV tokens', paso3_d:'Every verified kilo generates environmental tokens. First photo is reference only — OLV are credited with the delivery photo.',
    paso4_t:'Get paid in Phase 3 — 2027', paso4_d:'OLIVIA certifies with Verra. Your OLV become real money. Early starters earn more.',
    residuos_titulo:'All waste types generate value',
    residuos_sub:'Not just organic — 7 waste types, 7 carbon markets',
    residuos_nota:'🔩 Metal generates 44× more value than glass. The more types you separate — the more OLV you earn.',
    fases_titulo:'The 6 ecosystem stages', fases_sub:'Those who enter today in Seed earn first in Tree',
    f1t:'Active dMRV pilot', f1d:'AI verification, OLV tokens, active community',
    f2t:'OLV redeemable', f2d:'Health, transport, apps, AI credits',
    f3t:'💰 First real payment', f3d:'Verra VCS · USD 22/t · 25% to the citizen',
    f4t:'Art. 6.4 Paris × 4', f4d:'Regulated market · USD 90/t · LATAM',
    activa:'ACTIVE',
    clientes_titulo:'8 customer segments', clientes_sub:'From individual citizen to municipality',
    fuentes_titulo:'5 value sources',
    fuentes_sub:'Approximate values for a 100-unit building',
    fuentes_total:'Estimated total per building',
    fuentes_nota:'Indicative estimate · Contact us for your case',
    fuentes_cta1:'Calculate my building →', fuentes_cta2:'Join with my building →',
    logistica_titulo:'From bin to plant — connected',
    logistica_sub:'OLIVIA connects generators with green points, cooperatives and recycling plants in real time',
    logistica_nota_t:'Like Uber — but for recycling',
    logistica_nota:'Every waste item has full traceability: who generated it, who transported it, where it arrived and when. That is what makes the carbon credit verifiable and certifiable.',
    eco_titulo:'Three verticals · One ecosystem',
    eco_sub:'More OLV → better PULSO → better rate in AOM',
    fundadores_titulo:'The team', fundadores_sub:'Built with USD 0 external investment',
    jp_rol:'CEO & Founder',
    jp_desc:'Chilean theater director and lawyer. AI product builder. Architect of the Circulab ecosystem from Buenos Aires. Expertise in environmental law, taxation and project management.',
    mileidy_rol:'COO & Co-founder',
    mileidy_desc:'Mother, dancer and Dominican choreographer. One heart, three countries, one mission: building community and improving quality of life. Representative of ancestral wisdom and the care economy. Together with OLIVIA and Santino Eloy, they started the pilot at home.',
    equipo_nota:'Entire product built by founders with AI · No external tech team · USD 0 spent',
    docs_titulo:'Technical documents',
    docs_sub:'Access the OLIVIA Circulab whitepaper and one pager',
    wp_titulo:'Technical Whitepaper',
    wp_desc:'Full tokenomics, dMRV model, carbon markets, roadmap and system architecture.',
    wp_cta:'Download Whitepaper →',
    op_titulo:'One Pager',
    op_desc:'Executive summary for investors. The model, the numbers and the opportunity on one page.',
    op_cta:'Download One Pager →',
    alianzas_titulo:'Want to be an OLIVIA partner?',
    alianzas_sub:'OLV you receive today are a receivable account. Not a discount.',
    alianzas_nota_t:'Why accept OLV?',
    alianzas_nota:"When OLIVIA certifies with Verra in 2027, accumulated OLV become real money. Companies that join early accumulate more OLV when they're cheap — and earn more when they're worth more.",
    alianzas_cta:'Become a partner →',
    inv_titulo:'Seed Round 2026',
    inv_sub:'Active product · USD 0 spent · Round open',
    inv_nota:'No fixed costs until investment committed · Direct equity · No ratchets · No interest · Knowledge Economy Law 27.506 · 10-year fiscal stability',
    inv_form_t:'Access the pitch deck',
    inv_form_sub:'Leave your details to see the full deck',
    inv_nombre:'Your name', inv_email:'Your email',
    inv_empresa:'Company or organization (optional)',
    inv_btn:'View pitch deck →',
    inv_gracias:'Thanks! Redirecting to the pitch.',
    encuesta_titulo:'What do you think of OLIVIA?',
    encuesta_sub:'Complete the 2-minute survey and help us improve the product.',
    encuesta_cta:'Take the survey →',
    invitar_titulo:'Invite your friends',
    invitar_sub:'Earn +200 OLV for every friend who signs up',
    invitar_nota:'+200 OLV for each friend who registers and verifies their first waste',
    comunidad_titulo:'This is happening in OLIVIA now',
    comunidad_sub:'Real neighbors recycling in real time',
    comunidad_cta:'See the full community →',
    footer_copy:'© 2026 Circulab Tech · Buenos Aires, Argentina · AI District',
  }
}

function ComunidadFeed({lang,dark,card,border,sub,text}: any) {
  const [posts, setPosts] = useState<any[]>([])
  useEffect(()=>{
    supabase.from('posts').select('*, usuarios(nombre,apellido)').order('created_at',{ascending:false}).limit(6).then(({data})=>setPosts(data||[]))
  },[])
  function tiempoRelativo(fecha: string) {
    const diff = Date.now()-new Date(fecha).getTime()
    const min = Math.floor(diff/60000)
    if(min<60) return min+'m'
    const hs = Math.floor(min/60)
    if(hs<24) return hs+'h'
    return Math.floor(hs/24)+'d'
  }
  if(posts.length===0) return null
  return (
    <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
      <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{lang==='es'?'Comunidad en vivo':'Live community'}</div>
      <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{lang==='es'?'Esto pasa en OLIVIA ahora':'This is happening in OLIVIA now'}</div>
      <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{lang==='es'?'Vecinos reales reciclando en tiempo real':'Real neighbors recycling in real time'}</div>
      <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
        {posts.map((post:any)=>(
          <div key={post.id} style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'14px'}}>
            <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:8}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#22c55e,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white',flexShrink:0}}>
                {post.usuarios?.nombre?.[0]}{post.usuarios?.apellido?.[0]}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:text}}>{post.usuarios?.nombre} {post.usuarios?.apellido}</div>
                <div style={{fontSize:10,color:sub}}>{tiempoRelativo(post.created_at)} · +{post.olv_ganados} OLV</div>
              </div>
              <span style={{fontSize:16}}>🌿</span>
            </div>
            {post.contenido&&<div style={{fontSize:12,color:sub,lineHeight:1.5,marginBottom:post.foto_url?8:0}}>{post.contenido}</div>}
            {post.foto_url&&<img src={post.foto_url} alt="" style={{width:'100%',borderRadius:8,maxHeight:200,objectFit:'cover'}} />}
          </div>
        ))}
      </div>
      <a href="/comunidad" style={{display:'block',textAlign:'center',background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,color:text,padding:'12px',borderRadius:12,fontSize:13,fontWeight:700,textDecoration:'none'}}>
        {lang==='es'?'Ver toda la comunidad →':'See the full community →'}
      </a>
    </section>
  )
}

export default function Landing() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(true)
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [stats, setStats] = useState({usuarios:0,kg:0,co2:0})
  const [wpEmail, setWpEmail] = useState('')
  const [wpNombre, setWpNombre] = useState('')
  const [wpEnviado, setWpEnviado] = useState(false)
  const [opEmail, setOpEmail] = useState('')
  const [opNombre, setOpNombre] = useState('')
  const [opEnviado, setOpEnviado] = useState(false)

  const t = T[lang]
  const bg = dark?'#0a0e1a':'#f0f4f8'
  const text = dark?'#f1f5f9':'#0a0e1a'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
  const sub = dark?'#94a3b8':'#475569'

  useEffect(()=>{cargarStats()},[])

  async function cargarStats() {
    const [u,r] = await Promise.all([
      supabase.from('usuarios').select('id',{count:'exact'}),
      supabase.from('residuos').select('kg').eq('status','validado'),
    ])
    const kg = (r.data||[]).reduce((a,r)=>a+Number(r.kg),0)
    setStats({usuarios:u.count||0,kg:Math.round(kg),co2:Math.round(kg*1.8)})
  }

  async function enviarLead() {
    if(!email) return
    setEnviando(true)
    await supabase.from('leads_inversores').insert({nombre,email,empresa,status:'nuevo'})
    setEnviado(true)
    setEnviando(false)
    setTimeout(()=>window.location.href='/pitch',1200)
  }

  async function descargarWP() {
    if(!wpEmail) return
    await supabase.from('whitepaper_descargas').insert({nombre:wpNombre,email:wpEmail})
    setWpEnviado(true)
    window.location.href='/whitepaper'
  }

  async function descargarOP() {
    if(!opEmail) return
    await supabase.from('onepager_descargas').insert({nombre:opNombre,email:opEmail})
    setOpEnviado(true)
    window.location.href='/onepager'
  }

  const progreso = Math.min((stats.co2/100000)*100,100)

  const RESIDUOS = [
    {icon:'🌿',tipo:'Orgánico',olv:'180 OLV/kg',factor:'×1.8',bolsa:'Verra VCS',color:'#22c55e'},
    {icon:'♻️',tipo:'Plástico',olv:'150 OLV/kg',factor:'×1.5',bolsa:'Gold Standard',color:'#3b82f6'},
    {icon:'🔩',tipo:'Metal',olv:'800 OLV/kg',factor:'×8.0',bolsa:'CAR',color:'#ef4444'},
    {icon:'👕',tipo:'Textil',olv:'550 OLV/kg',factor:'×5.5',bolsa:'GS Textile',color:'#ec4899'},
    {icon:'🛢️',tipo:'Aceite',olv:'250 OLV/kg',factor:'×2.5',bolsa:'Verra AMS',color:'#f97316'},
    {icon:'📄',tipo:'Papel',olv:'90 OLV/kg',factor:'×0.9',bolsa:'Gold Standard',color:'#f59e0b'},
    {icon:'🍾',tipo:'Vidrio',olv:'30 OLV/kg',factor:'×0.3',bolsa:'Verra',color:'#a855f7'},
  ]

  const CLIENTES = [
    {num:'01',tipo:'Ciudadano libre',fee:'OLV',canal:'📱 App',color:'#22c55e'},
    {num:'02',tipo:'Verdulería / Feria',fee:'OLV',canal:'📱 App + WhatsApp',color:'#22c55e'},
    {num:'03',tipo:'Colegio / Institución',fee:'OLV',canal:'📱 App',color:'#3b82f6'},
    {num:'04',tipo:'Consorcio',fee:'SaaS mensual',canal:'🏢 Admin web',color:'#3b82f6'},
    {num:'05',tipo:'Restaurante / Hotel',fee:'SaaS mensual',canal:'🏢 Admin web',color:'#f59e0b'},
    {num:'06',tipo:'Casino / Comedor',fee:'SaaS mensual',canal:'🏢 Admin web',color:'#f59e0b'},
    {num:'07',tipo:'Empresa RSE',fee:'Por proyecto',canal:'🤝 B2B',color:'#a855f7'},
    {num:'08',tipo:'Municipio',fee:'Por contrato',canal:'🏛️ B2G',color:'#a855f7'},
  ]

  const FUENTES = [
    {num:'01',l:'Créditos de carbono',v:'USD 85/mes',desc:'VCS + Gold Standard · 25% vecinos',c:'#22c55e'},
    {num:'02',l:'Ahorro en recolección',v:'USD 800/mes',desc:'Estimado por depto por mes',c:'#3b82f6'},
    {num:'03',l:'Venta de materiales',v:'USD 120/mes',desc:'Plástico, metal, textil, papel',c:'#f59e0b'},
    {num:'04',l:'Abono orgánico',v:'USD 45/mes',desc:'Compost · 25% al consorcio',c:'#f97316'},
    {num:'05',l:'Certificación RSE',v:'USD 75/mes',desc:'Badge Edificio Verde OLIVIA',c:'#ec4899'},
  ]

  const ALIANZAS = [
    {icon:'🏢',tipo:'Consorcios',desc:'SaaS mensual + créditos carbono'},
    {icon:'🌿',tipo:'Cooperativas',desc:'15% de los créditos que verifican'},
    {icon:'🏥',tipo:'Salud y bienestar',desc:'OLV como cuenta por cobrar'},
    {icon:'📱',tipo:'Apps y plataformas',desc:'Créditos de IA a cambio de OLV'},
    {icon:'✈️',tipo:'Aerolíneas / Navieras',desc:'Compran OLV para compensar emisiones'},
    {icon:'🏬',tipo:'Empresas RSE',desc:'Por proyecto · badge verde'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.2s'}}>

      {/* NAV */}
      <nav style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:36,height:36,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:16,color:'white'}}>O</div>
          <div>
            <div style={{fontSize:14,fontWeight:900,color:text}}>OLIVIA Circulab</div>
            <div style={{fontSize:9,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.05em'}}>Circulab Tech</div>
          </div>
        </div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <button onClick={()=>setLang(lang==='es'?'en':'es')}
            style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            {lang==='es'?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)}
            style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
            {dark?'☀️':'🌙'}
          </button>
          <a href="/login" style={{fontSize:12,color:sub,textDecoration:'none',padding:'6px 12px',borderRadius:8,border:`1px solid ${border}`}}>{t.nav_entrar}</a>
          <a href="/registro" style={{fontSize:12,color:'white',textDecoration:'none',padding:'6px 12px',borderRadius:8,background:'linear-gradient(135deg,#22c55e,#16a34a)',fontWeight:700}}>{t.nav_unirse}</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:'56px 20px 40px',textAlign:'center',maxWidth:580,margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'5px 14px',fontSize:11,color:'#22c55e',fontWeight:700,marginBottom:20}}>
          {t.hero_badge}
        </div>
        <h1 style={{fontSize:36,fontWeight:900,lineHeight:1.15,marginBottom:16}}>
          <span style={{color:text}}>{t.hero_h1a}</span>
          <span style={{color:'#f59e0b'}}>{t.hero_h1b}</span>
          <br/>
          <span style={{color:text}}>{t.hero_h1c}</span>
          <span style={{color:'#a855f7'}}>{t.hero_h1d}</span>
        </h1>
        <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:12}}>
          {t.hero_p1a}
          <span style={{color:'#22c55e',fontWeight:700}}>{t.hero_p1b}</span>
          {t.hero_p1c}
          <span style={{color:'#f59e0b',fontWeight:700}}>{t.hero_p1d}</span>
          {t.hero_p1e}
          <span style={{color:'#a855f7',fontWeight:700}}>{t.hero_p1f}</span>
        </p>
        <p style={{fontSize:12,color:sub,marginBottom:28,lineHeight:1.6}}>
          {t.hero_p2}
          <span style={{color:'#22c55e'}}>{t.hero_p2b}</span>
        </p>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginBottom:32}}>
          <a href="/registro" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 28px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)'}}>
            {t.hero_cta1}
          </a>
          <a href="/simulador" style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,color:text,padding:'14px 28px',borderRadius:12,fontSize:14,fontWeight:600,textDecoration:'none'}}>
            {t.hero_cta2}
          </a>
        </div>

        {/* KPIs */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16}}>
          {[
            {v:stats.usuarios||'0',l:t.kpi1,c:'#22c55e'},
            {v:stats.kg?stats.kg+'kg':'0kg',l:t.kpi2,c:'#3b82f6'},
            {v:stats.co2?stats.co2+'kg':'0kg',l:t.kpi3,c:'#a855f7'},
          ].map(k=>(
            <div key={k.l} style={{background:card,borderRadius:12,padding:'14px 8px',textAlign:'center',border:`1px solid ${k.c}22`}}>
              <div style={{fontSize:22,fontWeight:900,color:k.c}}>{k.v}</div>
              <div style={{fontSize:9,color:sub,marginTop:3}}>{k.l}</div>
            </div>
          ))}
        </div>

        {/* Progreso */}
        <div style={{background:card,border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:8}}>
            <span style={{color:sub}}>{t.progress_label}</span>
            <span style={{color:'#22c55e',fontWeight:700}}>{progreso.toFixed(1)}%</span>
          </div>
          <div style={{height:8,background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)',borderRadius:99,marginBottom:8}}>
            <div style={{height:'100%',width:`${progreso}%`,background:'linear-gradient(90deg,#22c55e,#3b82f6)',borderRadius:99,transition:'width 1s'}} />
          </div>
          <div style={{fontSize:10,color:sub}}>{t.progress_sub}</div>
        </div>
      </section>

      {/* EN LA NATURALEZA NO HAY BASURA */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{background:'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(59,130,246,0.06))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'24px'}}>
          <div style={{fontSize:20,fontWeight:900,color:'#22c55e',marginBottom:8,textAlign:'center',lineHeight:1.3}}>
            {lang==='es'?'"En la naturaleza no hay basura."':'"In nature there is no waste."'}
          </div>
          <div style={{fontSize:12,color:dark?'#94a3b8':'#475569',textAlign:'center',marginBottom:20,lineHeight:1.6,fontStyle:'italic'}}>
            {lang==='es'?'"Solo hay recursos sin infraestructura. OLIVIA es esa infraestructura."':'"Only resources without infrastructure. OLIVIA is that infrastructure."'}
          </div>
          <div style={{fontSize:11,color:dark?'#64748b':'#475569',textAlign:'center',marginBottom:20}}>
            {lang==='es'?'Un sistema que se alimenta a sí mismo haciendo el bien':'A system that feeds itself by doing good'}
          </div>

          {/* CICLO COMPLETO */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:20}}>
            {[
              {icon:'🏠',l:lang==='es'?'Vos separás':'You sort',s:lang==='es'?'Foto + GPS':'Photo + GPS'},
              {icon:'🤖',l:lang==='es'?'IA verifica':'AI verifies',s:lang==='es'?'OLV acreditados':'OLV credited'},
              {icon:'🌳',l:lang==='es'?'Se reforesta':'Reforested',s:lang==='es'?'Compost + árbol':'Compost + tree'},
              {icon:'💰',l:lang==='es'?'Vos cobrás':'You earn',s:'USD 2027'},
            ].map((p,i)=>(
              <div key={i} style={{background:dark?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.8)',borderRadius:10,padding:'10px 6px',textAlign:'center',border:`1px solid ${border}`}}>
                <div style={{fontSize:22,marginBottom:4}}>{p.icon}</div>
                <div style={{fontSize:10,fontWeight:700,color:'#22c55e'}}>{p.l}</div>
                <div style={{fontSize:9,color:dark?'#64748b':'#94a3b8',marginTop:2}}>{p.s}</div>
              </div>
            ))}
          </div>

          {/* 6 TRAMOS */}
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {[
              {icon:'🌱',t:'SEMILLA',a:'2026',d:lang==='es'?'Acumulás OLV · Construís historial':'Accumulate OLV · Build history',c:'#22c55e',activo:true},
              {icon:'🌿',t:'BROTE',a:'Q4 2026',d:lang==='es'?'OLV canjeables · Convenios partner':'OLV redeemable · Partner deals',c:'#3b82f6',activo:false},
              {icon:'🌳',t:'ÁRBOL',a:'2027 💰',d:lang==='es'?'Primer pago USD · Verra VCS · Reforestación REDD+':'First USD payment · Verra VCS · REDD+ reforestation',c:'#f59e0b',activo:false},
              {icon:'🌲',t:'BOSQUE',a:'2028',d:lang==='es'?'Art. 6.4 París · USD 90/t · LATAM':'Art. 6.4 Paris · USD 90/t · LATAM',c:'#a855f7',activo:false},
              {icon:'🏔️',t:'SELVA',a:'2029',d:lang==='es'?'OLIVIA Ocean + Waters + Space':'OLIVIA Ocean + Waters + Space',c:'#ec4899',activo:false},
              {icon:'🌊',t:'SUMIDERO',a:'2030+',d:lang==='es'?'Net positive verificado · Infraestructura climática global':'Verified net positive · Global climate infrastructure',c:'#06b6d4',activo:false},
            ].map((tr,i)=>(
              <div key={i} style={{display:'flex',gap:10,padding:'8px 12px',borderRadius:10,background:tr.activo?'rgba(34,197,94,0.1)':'rgba(255,255,255,0.02)',border:`1px solid ${tr.c}${tr.activo?'44':'22'}`,alignItems:'center'}}>
                <span style={{fontSize:16,flexShrink:0}}>{tr.icon}</span>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span style={{fontSize:10,fontWeight:800,color:tr.c}}>{tr.t}</span>
                    <span style={{fontSize:9,color:dark?'#64748b':'#94a3b8'}}>· {tr.a}</span>
                    {tr.activo&&<span style={{fontSize:8,color:'#22c55e',background:'rgba(34,197,94,0.15)',padding:'1px 6px',borderRadius:8,fontWeight:700}}>{lang==='es'?'ACTIVA':'ACTIVE'}</span>}
                  </div>
                  <div style={{fontSize:10,color:dark?'#64748b':'#94a3b8'}}>{tr.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:14,padding:'10px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,textAlign:'center'}}>
            <span style={{fontSize:11,color:'#f59e0b',fontWeight:700}}>
              {lang==='es'?'💰 Los que entran hoy en Semilla cobran primero en Árbol — 2027':'💰 Those who enter today in Seed earn first in Tree — 2027'}
            </span>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>
          {t.como_titulo}
        </div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.como_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:24}}>{t.como_sub}</div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[
            {num:'01',icon:'📸',ti:t.paso1_t,d:t.paso1_d,c:'#22c55e'},
            {num:'02',icon:'📍',ti:t.paso2_t,d:t.paso2_d,c:'#3b82f6'},
            {num:'03',icon:'🪙',ti:t.paso3_t,d:t.paso3_d,c:'#f59e0b'},
            {num:'04',icon:'💰',ti:t.paso4_t,d:t.paso4_d,c:'#a855f7'},
          ].map(p=>(
            <div key={p.num} style={{display:'flex',gap:12,padding:'14px',background:card,borderRadius:14,border:`1px solid ${p.c}22`,alignItems:'flex-start'}}>
              <div style={{width:36,height:36,background:`linear-gradient(135deg,${p.c},${p.c}99)`,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white',flexShrink:0}}>{p.num}</div>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                  <span style={{fontSize:18}}>{p.icon}</span>
                  <span style={{fontSize:13,fontWeight:700,color:p.c}}>{p.ti}</span>
                </div>
                <div style={{fontSize:12,color:sub,lineHeight:1.6}}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:16,textAlign:'center'}}>
          <a href="/registro" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 32px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',display:'inline-block',boxShadow:'0 0 20px rgba(34,197,94,0.2)'}}>
            {t.hero_cta1}
          </a>
        </div>
      </section>

      {/* TODOS LOS RESIDUOS */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#3b82f6',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Residuos</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.residuos_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.residuos_sub}</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {RESIDUOS.map(r=>(
            <div key={r.tipo} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 14px',background:card,borderRadius:12,border:`1px solid ${r.color}22`}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:22}}>{r.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:r.color}}>{r.tipo}</div>
                  <div style={{fontSize:9,color:sub}}>{r.bolsa}</div>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:13,fontWeight:800,color:r.color}}>{r.olv}</div>
                <div style={{fontSize:10,color:sub}}>factor CO2 {r.factor}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,padding:'12px',background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:10,textAlign:'center'}}>
          <span style={{fontSize:12,color:'#ef4444',fontWeight:700}}>{t.residuos_nota}</span>
        </div>
      </section>

      {/* LAS 4 FASES */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Roadmap</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.fases_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.fases_sub}</div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[
            {fase:'Fase 1',año:'2026 · Ahora',ti:t.f1t,d:t.f1d,c:'#22c55e',activo:true},
            {fase:'Fase 2',año:'Q4 2026',ti:t.f2t,d:t.f2d,c:'#3b82f6',activo:false},
            {fase:'Fase 3',año:'2027',ti:t.f3t,d:t.f3d,c:'#f59e0b',activo:false},
            {fase:'Fase 4',año:'2028',ti:t.f4t,d:t.f4d,c:'#a855f7',activo:false},
          ].map((f,i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:'14px',background:f.activo?`rgba(34,197,94,0.06)`:card,borderRadius:12,border:`1px solid ${f.c}${f.activo?'44':'22'}`,alignItems:'center'}}>
              <div style={{width:32,height:32,borderRadius:'50%',background:f.activo?f.c:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:f.activo?'white':sub,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
                  <div style={{fontSize:10,color:f.c,fontWeight:700}}>{f.fase} · {f.año}</div>
                  {f.activo&&<span style={{fontSize:9,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'2px 6px',borderRadius:10,fontWeight:700}}>{t.activa}</span>}
                </div>
                <div style={{fontSize:13,fontWeight:700,color:text,marginBottom:2}}>{f.ti}</div>
                <div style={{fontSize:11,color:sub}}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOGÍSTICA */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#3b82f6',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Logística</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.logistica_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.logistica_sub}</div>
        <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:16}}>
          {[
            {icon:'🏠',ti:lang==='es'?'Vos — el generador':'You — the generator',d:lang==='es'?'Separás, fotografiás y registrás desde tu casa':'You separate, photograph and register from home',c:'#22c55e'},
            {icon:'📍',ti:lang==='es'?'Puntos verdes y cooperativas':'Green points and cooperatives',d:lang==='es'?'La app te muestra el más cercano según tu tipo de residuo':'The app shows you the nearest one based on your waste type',c:'#3b82f6'},
            {icon:'🚛',ti:lang==='es'?'Red de recolectores':'Collector network',d:lang==='es'?'Cooperativas verificadas reciben alertas y confirman la entrega':'Verified cooperatives get alerts and confirm delivery',c:'#f59e0b'},
            {icon:'🏭',ti:lang==='es'?'Planta de procesamiento':'Processing plant',d:lang==='es'?'El residuo llega verificado con GPS y foto — listo para certificar con Verra':'Waste arrives GPS and photo verified — ready to certify with Verra',c:'#a855f7'},
          ].map((paso,i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:'12px 14px',background:card,borderRadius:12,border:`1px solid ${paso.c}22`,alignItems:'center'}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:`${paso.c}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{paso.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:paso.c}}>{paso.ti}</div>
                <div style={{fontSize:11,color:sub,marginTop:2}}>{paso.d}</div>
              </div>
              {i<3&&<div style={{fontSize:16,color:sub}}>↓</div>}
            </div>
          ))}
        </div>
        <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'14px',textAlign:'center',marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:700,color:'#3b82f6',marginBottom:4}}>{t.logistica_nota_t}</div>
          <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{t.logistica_nota}</div>
        </div>
        <a href="/registro" style={{display:'block',textAlign:'center',background:'linear-gradient(135deg,#3b82f6,#2563eb)',color:'white',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none'}}>
          {lang==='es'?'Registrar mi primer residuo →':'Register my first waste →'}
        </a>
      </section>

      {/* 8 SEGMENTOS */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Clientes</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.clientes_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.clientes_sub}</div>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {CLIENTES.map(c=>(
            <div key={c.num} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 14px',background:card,borderRadius:10,border:`1px solid ${c.color}22`}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:24,height:24,borderRadius:6,background:c.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white',flexShrink:0}}>{c.num}</div>
                <span style={{fontSize:12,color:text,fontWeight:600}}>{c.tipo}</span>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:11,fontWeight:700,color:c.color}}>{c.fee}</div>
                <div style={{fontSize:9,color:sub}}>{c.canal}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 FUENTES */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Consorcios</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.fuentes_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.fuentes_sub}</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
          {FUENTES.map(f=>(
            <div key={f.num} style={{display:'flex',gap:10,padding:'12px',background:card,borderRadius:12,border:`1px solid ${f.c}22`,alignItems:'center'}}>
              <div style={{width:28,height:28,borderRadius:8,background:f.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'white',flexShrink:0}}>{f.num}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:text}}>{f.l}</div>
                <div style={{fontSize:10,color:sub}}>{f.desc}</div>
              </div>
              <div style={{fontSize:14,fontWeight:800,color:f.c,flexShrink:0}}>{f.v}</div>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'16px',textAlign:'center',marginBottom:14}}>
          <div style={{fontSize:11,color:sub,marginBottom:4}}>{t.fuentes_total}</div>
          <div style={{fontSize:32,fontWeight:900,color:'#22c55e'}}>USD 1.125/mes</div>
          <div style={{fontSize:10,color:sub,marginTop:4}}>{t.fuentes_nota}</div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <a href="/simulador" style={{flex:1,background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'12px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'block',textAlign:'center'}}>{t.fuentes_cta1}</a>
          <a href="mailto:hola@oliviacirculab.com.ar?subject=Quiero sumar mi consorcio" style={{flex:1,background:card,border:`1px solid ${border}`,color:text,padding:'12px',borderRadius:10,fontSize:13,fontWeight:600,textDecoration:'none',display:'block',textAlign:'center'}}>{t.fuentes_cta2}</a>
        </div>
      </section>

      {/* ECOSISTEMA */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Ecosistema</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.eco_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.eco_sub}</div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[
            {icon:'🌿',nombre:'OLIVIA Circulab',desc:lang==='es'?'Residuos → créditos de carbono → dinero real':'Waste → carbon credits → real money',color:'#22c55e',href:'/registrar',cta:lang==='es'?'Empezar a reciclar →':'Start recycling →'},
            {icon:'👥',nombre:'Quincena · Protocolo PULSO',desc:lang==='es'?'Roscas digitales → score crediticio → acceso al crédito formal':'Digital savings groups → credit score → formal credit access',color:'#3b82f6',href:'/quincena',cta:lang==='es'?'Ver PULSO →':'See PULSO →'},
            {icon:'🎵',nombre:'Art of Money',desc:lang==='es'?'Regalías musicales y deportivas → adelanto de capital hoy':'Music and sports royalties → capital advance today',color:'#a855f7',href:'/aom',cta:lang==='es'?'Ver AOM →':'See AOM →'},
          ].map(v=>(
            <div key={v.nombre} style={{padding:'16px',background:card,borderRadius:14,border:`1px solid ${v.color}22`}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <span style={{fontSize:24}}>{v.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:v.color}}>{v.nombre}</div>
                  <div style={{fontSize:11,color:sub,marginTop:2}}>{v.desc}</div>
                </div>
              </div>
              <a href={v.href} style={{fontSize:11,color:v.color,textDecoration:'none',fontWeight:600}}>{v.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* FUNDADORES */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Founders</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.fundadores_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.fundadores_sub}</div>
        <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:14}}>
          {[
            {foto:'/founders/founder-jp.jpg',nombre:'Juan Pablo Sanguinetti',rol:t.jp_rol,desc:t.jp_desc,color:'#22c55e'},
            {foto:'/founders/founder-mileidy.jpg',nombre:'Mileidy Zapata',rol:t.mileidy_rol,desc:t.mileidy_desc,color:'#3b82f6'},
          ].map(f=>(
            <div key={f.nombre} style={{display:'flex',gap:14,padding:'16px',background:card,borderRadius:14,border:`1px solid ${f.color}22`,alignItems:'flex-start'}}>
              <img src={f.foto} alt={f.nombre} style={{width:56,height:56,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:`2px solid ${f.color}`}} />
              <div>
                <div style={{fontSize:14,fontWeight:700,color:text,marginBottom:2}}>{f.nombre}</div>
                <div style={{fontSize:11,color:f.color,marginBottom:6,fontWeight:600}}>{f.rol}</div>
                <div style={{fontSize:12,color:sub,lineHeight:1.6}}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:'12px',background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.1)',borderRadius:12,textAlign:'center'}}>
          <div style={{fontSize:11,color:'#22c55e',fontWeight:700}}>🚀 {t.equipo_nota}</div>
        </div>
      </section>

      {/* DOCUMENTOS */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Documentos</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.docs_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.docs_sub}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div style={{background:card,border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:24,marginBottom:8}}>📄</div>
            <div style={{fontSize:13,fontWeight:700,color:'#3b82f6',marginBottom:4}}>{t.wp_titulo}</div>
            <div style={{fontSize:11,color:sub,lineHeight:1.5,marginBottom:12}}>{t.wp_desc}</div>
            {!wpEnviado?(
              <div>
                <input value={wpNombre} onChange={e=>setWpNombre(e.target.value)} placeholder={t.inv_nombre}
                  style={{width:'100%',padding:'8px 10px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:11,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:6}} />
                <input value={wpEmail} onChange={e=>setWpEmail(e.target.value)} placeholder={t.inv_email}
                  style={{width:'100%',padding:'8px 10px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:11,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
                <button onClick={descargarWP} disabled={!wpEmail}
                  style={{width:'100%',background:wpEmail?'linear-gradient(135deg,#3b82f6,#2563eb)':'rgba(255,255,255,0.04)',border:'none',borderRadius:8,padding:'9px',color:wpEmail?'white':sub,fontSize:11,fontWeight:700,cursor:'pointer'}}>
                  {t.wp_cta}
                </button>
              </div>
            ):(
              <div style={{textAlign:'center',padding:'12px',background:'rgba(59,130,246,0.1)',borderRadius:8}}>
                <div style={{fontSize:16,marginBottom:4}}>✅</div>
                <div style={{fontSize:11,color:'#3b82f6',fontWeight:700}}>Accediendo →</div>
              </div>
            )}
          </div>
          <div style={{background:card,border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:24,marginBottom:8}}>📋</div>
            <div style={{fontSize:13,fontWeight:700,color:'#f59e0b',marginBottom:4}}>{t.op_titulo}</div>
            <div style={{fontSize:11,color:sub,lineHeight:1.5,marginBottom:12}}>{t.op_desc}</div>
            {!opEnviado?(
              <div>
                <input value={opNombre} onChange={e=>setOpNombre(e.target.value)} placeholder={t.inv_nombre}
                  style={{width:'100%',padding:'8px 10px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:11,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:6}} />
                <input value={opEmail} onChange={e=>setOpEmail(e.target.value)} placeholder={t.inv_email}
                  style={{width:'100%',padding:'8px 10px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:11,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
                <button onClick={descargarOP} disabled={!opEmail}
                  style={{width:'100%',background:opEmail?'linear-gradient(135deg,#f59e0b,#d97706)':'rgba(255,255,255,0.04)',border:'none',borderRadius:8,padding:'9px',color:opEmail?'white':sub,fontSize:11,fontWeight:700,cursor:'pointer'}}>
                  {t.op_cta}
                </button>
              </div>
            ):(
              <div style={{textAlign:'center',padding:'12px',background:'rgba(245,158,11,0.1)',borderRadius:8}}>
                <div style={{fontSize:16,marginBottom:4}}>✅</div>
                <div style={{fontSize:11,color:'#f59e0b',fontWeight:700}}>Accediendo →</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ALIANZAS */}
      <section id="alianzas" style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Alianzas</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.alianzas_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.alianzas_sub}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
          {ALIANZAS.map(a=>(
            <div key={a.tipo} style={{padding:'14px',background:card,borderRadius:12,border:'1px solid rgba(168,85,247,0.15)'}}>
              <div style={{fontSize:22,marginBottom:6}}>{a.icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:text,marginBottom:4}}>{a.tipo}</div>
              <div style={{fontSize:10,color:sub,lineHeight:1.5}}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(168,85,247,0.06)',border:'1px solid rgba(168,85,247,0.2)',borderRadius:12,padding:'14px',marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:'#a855f7',marginBottom:6}}>{t.alianzas_nota_t}</div>
          <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{t.alianzas_nota}</div>
        </div>
        <a href="/alianzas"
          style={{display:'block',textAlign:'center',background:'linear-gradient(135deg,#a855f7,#7c3aed)',color:'white',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none'}}>
          {t.alianzas_cta}
        </a>
      </section>

      {/* INVERSORES */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Inversores</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.inv_titulo}</div>
       <div style={{background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:12,padding:"14px",marginBottom:16}}>
         <div style={{fontSize:12,fontWeight:700,color:"#22c55e",marginBottom:10}}>{lang==="es"?"🏛️ Ventajas de invertir en Argentina":"🏛️ Advantages of investing in Argentina"}</div>
         <div style={{display:"flex",flexDirection:"column",gap:6}}>
           {[
             {icon:"🤖",t:lang==="es"?"Distrito IA Buenos Aires":"AI District Buenos Aires",d:lang==="es"?"El primer ecosistema de IA de LATAM · Hub de talento tech":"The first AI ecosystem in LATAM · Tech talent hub"},
             {icon:"📋",t:lang==="es"?"Ley Economía del Conocimiento 27.506":"Knowledge Economy Law 27.506",d:lang==="es"?"Ganancias al 15% · Reducción 70-80% cargas patronales · FONDCE":"15% income tax · 70-80% reduction in payroll taxes · FONDCE"},
             {icon:"🔒",t:lang==="es"?"Estabilidad fiscal 10 años":"10-year fiscal stability",d:lang==="es"?"Sin cambios impositivos por 10 años para empresas adheridas":"No tax changes for 10 years for registered companies"},
           ].map((v,i)=>(
             <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
               <span style={{fontSize:16,flexShrink:0}}>{v.icon}</span>
               <div><div style={{fontSize:11,fontWeight:700,color:"#f1f5f9"}}>{v.t}</div><div style={{fontSize:10,color:"#64748b",marginTop:1}}>{v.d}</div></div>
             </div>
           ))}
         </div>
       </div>        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.inv_sub}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
          <div style={{padding:'16px',background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,textAlign:'center'}}>
            <div style={{fontSize:11,color:sub,marginBottom:4}}>Opción A</div>
            <div style={{fontSize:24,fontWeight:900,color:'#22c55e'}}>USD 500K</div>
            <div style={{fontSize:11,color:sub,marginTop:2}}>10% equity · USD 4.5M pre</div>
          </div>
          <div style={{padding:'16px',background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,textAlign:'center'}}>
            <div style={{fontSize:11,color:sub,marginBottom:4}}>Opción B</div>
            <div style={{fontSize:24,fontWeight:900,color:'#3b82f6'}}>USD 2M</div>
            <div style={{fontSize:11,color:sub,marginTop:2}}>15% equity · USD 11.3M pre</div>
          </div>
        </div>
        <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'12px',marginBottom:14,textAlign:'center'}}>
          <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{t.inv_nota}</div>
        </div>
        {!enviado?(
          <div style={{background:card,border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,color:'#f59e0b',marginBottom:4}}>{t.inv_form_t}</div>
            <div style={{fontSize:11,color:sub,marginBottom:14}}>{t.inv_form_sub}</div>
            {[
              {v:nombre,fn:setNombre,ph:t.inv_nombre,type:'text'},
              {v:email,fn:setEmail,ph:t.inv_email,type:'email'},
              {v:empresa,fn:setEmpresa,ph:t.inv_empresa,type:'text'},
            ].map((f,i)=>(
              <input key={i} type={f.type} value={f.v} onChange={e=>f.fn(e.target.value)} placeholder={f.ph}
                style={{width:'100%',padding:'10px 14px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
            ))}
            <button onClick={enviarLead} disabled={enviando||!email}
              style={{width:'100%',background:email?'linear-gradient(135deg,#f59e0b,#d97706)':'rgba(255,255,255,0.04)',border:'none',borderRadius:10,padding:'12px',color:email?'white':sub,fontSize:13,fontWeight:700,cursor:'pointer'}}>
              {enviando?'Guardando...':t.inv_btn}
            </button>
          </div>
        ):(
          <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:14,padding:'20px',textAlign:'center'}}>
            <div style={{fontSize:20,marginBottom:8}}>✅</div>
            <div style={{fontSize:14,fontWeight:700,color:'#22c55e',marginBottom:8}}>{t.inv_gracias}</div>
            <a href="/pitch" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'10px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
              {t.inv_btn}
            </a>
          </div>
        )}
      </section>

      {/* FEED COMUNIDAD */}
      <ComunidadFeed lang={lang} dark={dark} card={card} border={border} sub={sub} text={text} />

      {/* ENCUESTA */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{background:'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(59,130,246,0.08))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'24px',textAlign:'center'}}>
          <div style={{fontSize:24,marginBottom:8}}>📋</div>
          <div style={{fontSize:16,fontWeight:900,color:text,marginBottom:8}}>{t.encuesta_titulo}</div>
          <div style={{fontSize:12,color:sub,marginBottom:16,lineHeight:1.6}}>{t.encuesta_sub}</div>
          <a href="/encuesta" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'12px 28px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
            {t.encuesta_cta}
          </a>
        </div>
      </section>

      {/* INVITAR AMIGOS */}
      <section style={{padding:'40px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Comunidad</div>
        <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{t.invitar_titulo}</div>
        <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{t.invitar_sub}</div>
        <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'16px',marginBottom:12}}>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <a href="https://wa.me/?text=Estoy%20reciclando%20con%20OLIVIA%20Circulab%20y%20ganando%20tokens%20OLV%20reales%20%F0%9F%8C%BF%20Un%C3%ADte%20ac%C3%A1%3A%20https%3A%2F%2Fcirculab-site.vercel.app" target="_blank"
              style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.3)',textDecoration:'none'}}>
              <span style={{fontSize:20}}>💬</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#25d366'}}>WhatsApp</div>
                <div style={{fontSize:10,color:sub}}>{lang==='es'?'Invitar por WhatsApp':'Invite via WhatsApp'}</div>
              </div>
            </a>
            <a href="https://www.instagram.com/" target="_blank"
              style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,background:'rgba(131,58,180,0.1)',border:'1px solid rgba(131,58,180,0.3)',textDecoration:'none'}}>
              <span style={{fontSize:20}}>📸</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#833ab4'}}>Instagram</div>
                <div style={{fontSize:10,color:sub}}>{lang==='es'?'Compartir en Instagram':'Share on Instagram'}</div>
              </div>
            </a>
            <button onClick={()=>{
              const txt = lang==='es'
                ?'Estoy reciclando con OLIVIA Circulab y ganando tokens OLV reales 🌿 Uníte acá: https://circulab-site.vercel.app'
                :'I am recycling with OLIVIA Circulab and earning real OLV tokens 🌿 Join here: https://circulab-site.vercel.app'
              if(navigator.share){navigator.share({title:'OLIVIA Circulab',text:txt,url:'https://circulab-site.vercel.app'})}
              else{navigator.clipboard.writeText(txt);alert(lang==='es'?'Texto copiado — pegalo donde quieras':'Text copied — paste it anywhere')}
            }} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,cursor:'pointer',textAlign:'left'}}>
              <span style={{fontSize:20}}>📤</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:text}}>{lang==='es'?'Más opciones':'More options'}</div>
                <div style={{fontSize:10,color:sub}}>{lang==='es'?'Copiar link o compartir en otras redes':'Copy link or share on other networks'}</div>
              </div>
            </button>
          </div>
        </div>
        <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10,padding:'10px 14px',textAlign:'center'}}>
          <span style={{fontSize:12,color:'#22c55e',fontWeight:700}}>+200 OLV</span>
          <span style={{fontSize:11,color:sub}}> {t.invitar_nota}</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'32px 20px',borderTop:`1px solid ${border}`,textAlign:'center',maxWidth:580,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:16}}>
          <div style={{width:28,height:28,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:12,color:'white'}}>O</div>
          <span style={{fontSize:13,fontWeight:800,color:text}}>OLIVIA Circulab</span>
        </div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:14}}>
          {[
            {l:'Simulador',h:'/simulador'},
            {l:'Comunidad',h:'/comunidad'},
            {l:'Pitch',h:'/pitch'},
            {l:'Admin',h:'/admin'},
            {l:'Privacidad',h:'/privacidad'},
            {l:'Términos',h:'/terminos'},
          ].map(n=>(
            <a key={n.l} href={n.h} style={{fontSize:11,color:sub,textDecoration:'none'}}>{n.l}</a>
          ))}
        </div>
        <div style={{fontSize:11,color:sub,marginBottom:6}}>hola@oliviacirculab.com.ar</div>
        <div style={{fontSize:10,color:dark?'#475569':'#94a3b8'}}>{t.footer_copy}</div>
      </footer>

    </div>
  )
}
