'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

function ComunidadFeed({dark, card, border, sub, text}: any) {
  const [posts, setPosts] = useState<any[]>([])
  useEffect(()=>{
    supabase.from('posts').select('*, usuarios(nombre,apellido)').order('created_at',{ascending:false}).limit(4).then(({data})=>setPosts(data||[]))
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
      <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>Comunidad en vivo</div>
      <div style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>Esto pasa en OLIVIA ahora</div>
      <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>Vecinos reales reciclando en tiempo real</div>
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
        Ver toda la comunidad →
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
  const [videoModal, setVideoModal] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const es = lang==='es'
  const bg = dark?'#0a0e1a':'#f0f4f8'
  const text = dark?'#f1f5f9':'#0a0e1a'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
  const sub = dark?'#94a3b8':'#475569'

  useEffect(()=>{ cargarStats() },[])

  async function cargarStats() {
    const [u,r] = await Promise.all([
      supabase.from('usuarios').select('id',{count:'exact'}),
      supabase.from('residuos').select('kg').eq('status','validado'),
    ])
    const kg = (r.data||[]).reduce((a:number,r:any)=>a+Number(r.kg),0)
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

  function compartirVideo(tipo: 'whatsapp'|'story', esLanding=true) {
    const url = 'https://oliviacirculab.com.ar'
    const txt = es
      ?`Mirá esto — OLIVIA Circulab convierte tu basura en dinero real 🌿 ${url}`
      :`Watch this — OLIVIA Circulab turns your waste into real money 🌿 ${url}`
    if(tipo==='whatsapp'){
      window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`)
    } else {
      if(esLanding){
        // Video vertical — descargar directo
        const a = document.createElement('a')
        a.href = '/Final1.mp4'
        a.download = 'olivia-circulab.mp4'
        a.click()
        setTimeout(()=>alert(es?'Video descargado 📱\nAbrí Instagram → Nueva Story → Galería':'Video downloaded 📱\nOpen Instagram → New Story → Gallery'),500)
      }
    }
  }

  async function generarStoryInvitar() {
    const canvas = document.createElement('canvas')
    canvas.width = 1080; canvas.height = 1920
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createLinearGradient(0,0,0,1920)
    grad.addColorStop(0,'#0a1a0a'); grad.addColorStop(1,'#0a0e1a')
    ctx.fillStyle = grad; ctx.fillRect(0,0,1080,1920)
    ctx.textAlign = 'center'
    ctx.fillStyle = '#22c55e'; ctx.font = 'bold 64px system-ui'
    ctx.fillText('🌿 OLIVIA Circulab', 540, 300)
    ctx.fillStyle = '#f1f5f9'; ctx.font = 'bold 80px system-ui'
    ctx.fillText(es?'Me sumé al':'I joined', 540, 620)
    ctx.fillText(es?'reciclaje que paga 💰':'recycling that pays 💰', 540, 720)
    ctx.font = '52px system-ui'
    ctx.fillText(es?'Uníte gratis →':'Join for free →', 540, 1100)
    ctx.fillStyle = '#22c55e'; ctx.beginPath()
    ctx.roundRect(140,1350,800,140,35); ctx.fill()
    ctx.fillStyle = '#0a1a0a'; ctx.font = 'bold 48px system-ui'
    ctx.fillText('oliviacirculab.com.ar', 540, 1438)
    ctx.fillStyle = '#64748b'; ctx.font = '38px system-ui'
    ctx.fillText(es?'Tu residuo vale dinero real':'Your waste is worth real money', 540, 1720)
    canvas.toBlob(async(blob)=>{
      if(!blob) return
      const file = new File([blob],'olivia-story.png',{type:'image/png'})
      const txt = es?'Sumate a OLIVIA Circulab 🌿 https://oliviacirculab.com.ar':'Join OLIVIA Circulab 🌿 https://oliviacirculab.com.ar'
      if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
        try{await navigator.share({files:[file],title:'OLIVIA Circulab',text:txt});return}catch(e){}
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href=url; a.download='olivia-story.png'; a.click()
      alert(es?'📸 Imagen descargada\nAbrí Instagram → Nueva Story → Galería':'📸 Image downloaded\nOpen Instagram → New Story → Gallery')
    },'image/png')
  }

  const RESIDUOS = [
    {icon:'🌿',tipo:es?'Orgánico':'Organic',olv:'180 OLV/kg',usd_arbol:'USD 0.028/kg',usd_bosque:'USD 0.082/kg',bolsa:'Verra VM0036',color:'#22c55e'},
    {icon:'♻️',tipo:es?'Plástico':'Plastic',olv:'150 OLV/kg',usd_arbol:'USD 0.024/kg',usd_bosque:'USD 0.068/kg',bolsa:'Gold Standard',color:'#3b82f6'},
    {icon:'🔩',tipo:es?'Metal':'Metal',olv:'800 OLV/kg',usd_arbol:'USD 0.102/kg',usd_bosque:'USD 0.296/kg',bolsa:'CAR',color:'#ef4444'},
    {icon:'👕',tipo:es?'Textil':'Textile',olv:'550 OLV/kg',usd_arbol:'USD 0.071/kg',usd_bosque:'USD 0.205/kg',bolsa:'GS Textile',color:'#ec4899'},
    {icon:'🛢️',tipo:es?'Aceite':'Oil',olv:'250 OLV/kg',usd_arbol:'USD 0.035/kg',usd_bosque:'USD 0.100/kg',bolsa:'Verra AMS',color:'#f97316'},
    {icon:'📄',tipo:es?'Papel':'Paper',olv:'90 OLV/kg',usd_arbol:'USD 0.013/kg',usd_bosque:'USD 0.036/kg',bolsa:'Gold Standard',color:'#f59e0b'},
    {icon:'🍾',tipo:es?'Vidrio':'Glass',olv:'30 OLV/kg',usd_arbol:'USD 0.005/kg',usd_bosque:'USD 0.014/kg',bolsa:'Verra',color:'#a855f7'},
  ]

  const OLV_TRAMOS = [
    {tramo:'🌱 Semilla',año:'2026',olv:es?'Sin valor · acumulás':'No value · you accumulate',c:'#22c55e'},
    {tramo:'🌿 Brote',año:'2026',olv:es?'Solo canje interno':'Internal exchange only',c:'#3b82f6'},
    {tramo:'🌳 Árbol',año:'2027',olv:'6.329 OLV = USD 1',c:'#f59e0b'},
    {tramo:'🌲 Bosque',año:'2028',olv:'2.198 OLV = USD 1',c:'#a855f7'},
    {tramo:'🏔️ Selva',año:'2029',olv:'1.429 OLV = USD 1',c:'#ec4899'},
    {tramo:'🌊 Sumidero',año:'2030+',olv:'952 OLV = USD 1',c:'#06b6d4'},
  ]

  const GANANCIAS = [
    {icon:'🌱',titulo:es?'Solo reciclás en casa':'You recycle at home',arbol:'USD 47/año',bosque:'USD 136/año',semana:'USD 0.90/sem',color:'#22c55e',
     detalle:es?'Residuos + agua ahorrada + transporte verde':'Waste + saved water + green transport'},
    {icon:'🏘️',titulo:es?'Organizás tu edificio':'You organize your building',arbol:'USD 117/año',bosque:'USD 339/año',semana:'USD 2.25/sem',color:'#3b82f6',
     detalle:es?'Vos + coordinás 20 familias':'You + coordinate 20 families'},
    {icon:'🍃',titulo:es?'Limpiás tu barrio':'You clean your neighborhood',arbol:'USD 115-289/año',bosque:'USD 333-836/año',semana:'USD 2.21-5.55/sem',color:'#22c55e',
     detalle:es?'Hojas · ramas · residuos verdes del espacio público':'Leaves · branches · green urban waste'},
    {icon:'🌍',titulo:es?'Coordinás tu zona':'You coordinate your zone',arbol:'USD 257/año',bosque:'USD 745/año',semana:'USD 4.94/sem',color:'#a855f7',
     detalle:es?'5-8 edificios · 150-200 familias · 5% bonus zonal':'5-8 buildings · 150-200 families · 5% zone bonus'},
  ]

  const CLIENTES = [
    {num:'01',tipo:es?'Ciudadano libre':'Individual citizen',fee:'OLV',canal:'📱 App',color:'#22c55e'},
    {num:'02',tipo:es?'Verdulería / Feria':'Market / Store',fee:'OLV',canal:'📱 App + WhatsApp',color:'#22c55e'},
    {num:'03',tipo:es?'Colegio / Institución':'School',fee:'OLV',canal:'📱 App',color:'#3b82f6'},
    {num:'04',tipo:es?'Consorcio (100 deptos)':'Building (100 units)',fee:'SaaS mensual',canal:'🏢 Admin web',color:'#3b82f6'},
    {num:'05',tipo:es?'Restaurante / Hotel':'Restaurant / Hotel',fee:'SaaS mensual',canal:'🏢 Admin web',color:'#f59e0b'},
    {num:'06',tipo:es?'Casino / Comedor':'Casino / Canteen',fee:'SaaS mensual',canal:'🏢 Admin web',color:'#f59e0b'},
    {num:'07',tipo:es?'Empresa RSE':'CSR Company',fee:es?'Por proyecto':'Per project',canal:'🤝 B2B',color:'#a855f7'},
    {num:'08',tipo:es?'Municipio':'Municipality',fee:es?'Por contrato':'Per contract',canal:'🏛️ B2G',color:'#a855f7'},
    {num:'09',tipo:es?'Ciudadano Comunitario':'Community Citizen',fee:'OLV',canal:'📱 App + GPS',color:'#22c55e'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.2s'}}>

      {/* NAV */}
      <nav style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:40,height:40,objectFit:'contain',borderRadius:8}} />
          <div>
            <div style={{fontSize:14,fontWeight:900,color:text}}>OLIVIA Circulab</div>
            <div style={{fontSize:9,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.05em'}}>Circulab Tech</div>
          </div>
        </div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <button onClick={()=>setLang(es?'en':'es')} style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            {es?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)} style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
            {dark?'☀️':'🌙'}
          </button>
          <a href="/login" style={{fontSize:12,color:sub,textDecoration:'none',padding:'6px 12px',borderRadius:8,border:`1px solid ${border}`}}>{es?'Entrar':'Sign in'}</a>
          <a href="/registro" style={{fontSize:12,color:'white',textDecoration:'none',padding:'6px 12px',borderRadius:8,background:'linear-gradient(135deg,#22c55e,#16a34a)',fontWeight:700}}>{es?'Unirse':'Join'}</a>
        </div>
      </nav>

      {/* MODAL VIDEO FAMILIAR — Final1.mp4 — vertical — se comparte directo */}
      {videoModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.96)',zIndex:9999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{width:'100%',maxWidth:420,position:'relative'}}>
            <button onClick={()=>setVideoModal(false)} style={{position:'absolute',top:-44,right:0,background:'transparent',border:'none',color:'white',fontSize:32,cursor:'pointer',lineHeight:1,zIndex:10}}>×</button>
            <div style={{textAlign:'center',marginBottom:12}}>
              <span style={{fontSize:11,color:'#22c55e',fontWeight:700,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'4px 12px'}}>
                🌿 OLIVIA Circulab
              </span>
            </div>
            <div style={{borderRadius:14,overflow:'hidden',background:'#000',border:'2px solid rgba(34,197,94,0.3)'}}>
              <video autoPlay muted controls playsInline style={{width:'100%',display:'block',maxHeight:'65vh',objectFit:'cover'}}>
                <source src="/Final1.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{display:'flex',gap:8,marginTop:12,justifyContent:'center',flexWrap:'wrap'}}>
              <button onClick={()=>compartirVideo('whatsapp',true)}
                style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',borderRadius:10,background:'rgba(37,211,102,0.15)',border:'1px solid rgba(37,211,102,0.4)',cursor:'pointer',color:'#25d366',fontSize:12,fontWeight:700}}>
                💬 WhatsApp
              </button>
              <button onClick={()=>compartirVideo('story',true)}
                style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',borderRadius:10,background:'rgba(131,58,180,0.15)',border:'1px solid rgba(131,58,180,0.4)',cursor:'pointer',color:'#a855f7',fontSize:12,fontWeight:700}}>
                📸 {es?'Story (video vertical)':'Story (vertical video)'}
              </button>
              <button onClick={()=>setVideoModal(false)}
                style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',borderRadius:10,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',cursor:'pointer',color:'#94a3b8',fontSize:12}}>
                {es?'Seguir leyendo →':'Continue →'}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ═══ SECCIÓN LOGO OLIVIA ═══ */}
      <section style={{padding:'40px 20px 0',maxWidth:580,margin:'0 auto',textAlign:'center'}}>
        <img 
          src="/logoOC.png" 
          alt="OLIVIA Circulab" 
          style={{
            width:'100%',
            maxWidth:320,
            height:'auto',
            display:'block',
            margin:'0 auto 16px'
          }} 
        />
        <div style={{fontSize:11,color:sub,lineHeight:1.6,maxWidth:400,margin:'0 auto'}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
      </section>

      {/* ═══ SECCIÓN 1 — HERO ═══ */}
      <section style={{padding:'48px 20px 32px',maxWidth:580,margin:'0 auto',textAlign:'center'}}>
        {/* BADGES */}
        <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:20}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'5px 14px',fontSize:11,color:'#22c55e',fontWeight:700}}>
            🌱 {es?'Tramo Semilla · 2026 · Distrito IA Buenos Aires':'Seed Stage · 2026 · AI District Buenos Aires'}
          </div>

          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.25)',borderRadius:20,padding:'5px 14px',fontSize:11,color:'#f59e0b',fontWeight:700}}>
            🚀 {es?'USD 0 de inversión externa':'USD 0 external investment'}
          </div>
        </div>

        <h1 style={{fontSize:34,fontWeight:900,lineHeight:1.15,marginBottom:16,letterSpacing:'-0.02em'}}>
          <span style={{color:'#22c55e'}}>{es?'La batalla más importante':'The most important battle'}</span><br/>
          <span style={{color:text}}>{es?'de nuestro tiempo':'of our time'}</span><br/>
          <span style={{color:'#f59e0b'}}>{es?'es el calentamiento global.':'is global warming.'}</span><br/><span style={{color:'#3b82f6'}}>{es?'El planeta no espera.':'The planet won\'t wait.'}</span><br/><span style={{color:'#a855f7'}}>{es?'Tu barrio tampoco.':'Neither will your neighborhood.'}</span>
        </h1>

        <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:20}}>
          {es?'El metano de los rellenos sanitarios es el segundo gas de efecto invernadero más dañino del planeta. Cada kilo de residuo orgánico enterrado genera 1.8 kg de CO2eq que calientan la atmósfera durante décadas.':'Methane from landfills is the second most damaging greenhouse gas on the planet. Each kilo of buried organic waste generates 1.8 kg CO2eq that heat the atmosphere for decades.'}
        </p>

        {/* CITAS */}
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
          {[
            {cita:es?'"Las comunidades gestionan mejor los bienes comunes cuando tienen monitoreo verificable y consecuencias reales."':'"Communities manage commons better when they have verifiable monitoring and real consequences."',autor:'Elinor Ostrom · Premio Nobel Economía 2009',color:'#22c55e'},
            {cita:es?'"La contaminación no es otra cosa que recursos que no estamos cosechando."':'"Pollution is nothing but resources we\'re not harvesting."',autor:'Buckminster Fuller · Científico y futurista',color:'#3b82f6'},
            {cita:es?'"Los sistemas vivos se auto-organizan hacia estados de menor entropía."':'"Living systems self-organize toward states of lower entropy."',autor:'Ilya Prigogine · Premio Nobel Química 1977',color:'#a855f7'},
          ].map((c,i)=>(
            <div key={i} style={{background:card,border:`1px solid ${c.color}22`,borderRadius:12,padding:'14px',textAlign:'left'}}>
              <div style={{fontSize:12,fontStyle:'italic',color:text,lineHeight:1.6,marginBottom:6}}>{c.cita}</div>
              <div style={{fontSize:10,color:c.color,fontWeight:700}}>— {c.autor}</div>
            </div>
          ))}
        </div>

        {/* FRASE CENTRAL */}
        <div style={{background:'linear-gradient(135deg,rgba(34,197,94,0.1),rgba(59,130,246,0.06))',border:'1px solid rgba(34,197,94,0.3)',borderRadius:16,padding:'20px',marginBottom:24}}>
          <div style={{fontSize:20,fontWeight:900,color:'#22c55e',marginBottom:8,lineHeight:1.3}}>
            {es?'"En la naturaleza no hay basura."':'"In nature there is no waste."'}
          </div>
          <div style={{fontSize:13,color:sub,fontStyle:'italic',marginBottom:8}}>
            {es?'"Solo hay recursos sin infraestructura."':'"Only resources without infrastructure."'}
          </div>
          <div style={{fontSize:12,color:text,fontWeight:700}}>
            {es?'OLIVIA es esa infraestructura — un sistema que se alimenta a sí mismo haciendo el bien.':'OLIVIA is that infrastructure — a system that feeds itself by doing good.'}
          </div>
        </div>

        {/* KPIs */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:16}}>
          {[
            {v:stats.usuarios||'0',l:es?'Vecinos activos':'Active neighbors',c:'#22c55e'},
            {v:stats.kg?stats.kg+'kg':'0kg',l:es?'Kg verificados':'Verified kg',c:'#3b82f6'},
            {v:stats.co2?stats.co2+'kg':'0kg',l:es?'CO2eq evitados':'CO2eq avoided',c:'#a855f7'},
          ].map(k=>(
            <div key={k.l} style={{background:card,borderRadius:12,padding:'14px 8px',textAlign:'center',border:`1px solid ${k.c}22`}}>
              <div style={{fontSize:22,fontWeight:900,color:k.c}}>{k.v}</div>
              <div style={{fontSize:9,color:sub,marginTop:3}}>{k.l}</div>
            </div>
          ))}
        </div>

        {/* PROGRESO VERRA */}
        <div style={{background:card,border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginBottom:28}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:8}}>
            <span style={{color:sub}}>{es?'Progreso hacia certificación Verra VCS':'Progress toward Verra VCS certification'}</span>
            <span style={{color:'#22c55e',fontWeight:700}}>{Math.min((stats.co2/100000)*100,100).toFixed(1)}%</span>
          </div>
          <div style={{height:8,background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)',borderRadius:99,marginBottom:8}}>
            <div style={{height:'100%',width:`${Math.min((stats.co2/100000)*100,100)}%`,background:'linear-gradient(90deg,#22c55e,#3b82f6)',borderRadius:99,transition:'width 1s'}} />
          </div>
          <div style={{fontSize:10,color:sub}}>{es?'Meta: 100 tCO2eq · Los que empiezan hoy cobran primero en Árbol':'Goal: 100 tCO2eq · Early starters earn first in Árbol'}</div>
        </div>

        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/registro" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 28px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)'}}>
            {es?'Empezar gratis →':'Start for free →'}
          </a>
          <a href="/simulador" style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,color:text,padding:'14px 28px',borderRadius:12,fontSize:14,fontWeight:600,textDecoration:'none'}}>
            {es?'Calculá cuánto ganás':'Calculate your earnings'}
          </a>
        </div>
      </section>

      {/* ═══ SECCIÓN 2 — DOS VIDEOS ═══ */}
      <section style={{padding:'0 20px 32px',maxWidth:580,margin:'0 auto'}}>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {/* Video 1 — familiar */}
          <div>
            <div style={{fontSize:11,color:'#22c55e',fontWeight:700,marginBottom:8,textAlign:'center'}}>{es?'🌿 Nuestra historia':'🌿 Our story'}</div>
            <div style={{borderRadius:16,overflow:'hidden',border:`1px solid ${border}`,background:'#000'}}>
              <video controls playsInline style={{width:'100%',display:'block',maxHeight:500,objectFit:'cover'}} preload="metadata">
                <source src="/Final1.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{display:'flex',gap:10,marginTop:10,justifyContent:'center'}}>
              <button onClick={()=>compartirVideo('whatsapp',true)} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:10,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.3)',cursor:'pointer',color:'#25d366',fontSize:11,fontWeight:700}}>
                💬 WhatsApp
              </button>
              <button onClick={()=>compartirVideo('story',true)} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:10,background:'rgba(131,58,180,0.1)',border:'1px solid rgba(131,58,180,0.3)',cursor:'pointer',color:'#a855f7',fontSize:11,fontWeight:700}}>
                📸 Story
              </button>
            </div>
          </div>
          {/* Video 2 — enterramiento */}
          <div>
            <div style={{fontSize:11,color:'#ef4444',fontWeight:700,marginBottom:8,textAlign:'center'}}>{es?'⚠️ El negocio del enterramiento':'⚠️ The landfill business'}</div>
            <div style={{borderRadius:16,overflow:'hidden',border:'1px solid rgba(239,68,68,0.3)',background:'#000'}}>
              <video controls playsInline style={{width:'100%',display:'block',maxHeight:320,objectFit:'cover'}} preload="metadata">
                <source src="/CIRCULAB1.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{fontSize:11,color:sub,textAlign:'center',marginTop:8,fontStyle:'italic'}}>
              {es?'En las ciudades que funcionan, el vecino cobra por reciclar. OLIVIA lo hace en LATAM.':'In cities that work, citizens get paid to recycle. OLIVIA brings that to LATAM.'}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECCIÓN 3 — EL PROBLEMA ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:14,padding:'20px'}}>
          <div style={{fontSize:11,color:'#ef4444',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>{es?'El problema ciudadano':'The citizen problem'}</div>
          <h2 style={{fontSize:22,fontWeight:900,marginBottom:12,lineHeight:1.2,color:text}}>
            {es?'El negocio del enterramiento factura millones. Vos no ves un peso.':'The landfill business earns millions. You don\'t see a cent.'}
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
            {[
              {stat:'6.000t',desc:es?'residuos/día solo en CABA':'waste/day in CABA alone',c:'#ef4444'},
              {stat:'85%',desc:es?'va al relleno sin separar':'goes to landfill unsorted',c:'#ef4444'},
              {stat:'USD 0',desc:es?'capturado por el vecino':'captured by the citizen',c:'#f59e0b'},
              {stat:'USD 4.5B',desc:es?'mercado carbono LATAM sin tocar':'untapped LATAM carbon market',c:'#22c55e'},
            ].map((k,i)=>(
              <div key={i} style={{background:dark?'rgba(255,255,255,0.03)':card,borderRadius:10,padding:'12px',textAlign:'center',border:`1px solid ${k.c}22`}}>
                <div style={{fontSize:22,fontWeight:900,color:k.c}}>{k.stat}</div>
                <div style={{fontSize:10,color:sub,marginTop:3,lineHeight:1.4}}>{k.desc}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:12,color:'#22c55e',fontWeight:700,textAlign:'center'}}>
            {es?'OLIVIA no paga — facilita la infraestructura para que el mercado pague.':'OLIVIA doesn\'t pay — it facilitates the infrastructure for the market to pay.'}
          </div>
        </div>
      </section>

      {/* ═══ SECCIÓN 4 — CÓMO FUNCIONA ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Cómo funciona':'How it works'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:20,color:text}}>{es?'De la foto a los créditos de carbono en 4 pasos':'From photo to carbon credits in 4 steps'}</h2>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[
            {num:'01',icon:'📸',t:es?'Fotografiás el residuo':'You photograph the waste',d:es?'La IA analiza el tipo y el peso con Cloudflare AI Vision. Con una moneda de $10 al lado, la estimación es precisa.':'AI analyzes type and weight with Cloudflare AI Vision.',c:'#22c55e'},
            {num:'02',icon:'📍',t:es?'Confirmás la disposición':'You confirm disposal',d:es?'La segunda foto con GPS activa tus OLV Verdes — los únicos certificables por Verra.':'The second photo with GPS activates your Green OLV — the only ones certifiable by Verra.',c:'#3b82f6'},
            {num:'03',icon:'🪙',t:es?'Acumulás OLV Verdes':'You accumulate Green OLV',d:es?'🌿 OLV Verdes: de residuos verificados · estos certifica Verra · estos paga el mercado. ⭐ OLV Bonus: por registrarte y compartir · canjeables en Brote.':'🌿 Green OLV: from verified waste · Verra certifies these. ⭐ Bonus OLV: for registering and sharing.',c:'#f59e0b'},
            {num:'04',icon:'💰',t:es?'El mercado paga — 2027':'The market pays — 2027',d:es?'OLIVIA certifica con Verra. El mercado de carbono paga. OLIVIA distribuye. Los que empezaron en Semilla cobran primero.':'OLIVIA certifies with Verra. Carbon market pays. OLIVIA distributes. Semilla starters earn first.',c:'#a855f7'},
          ].map(p=>(
            <div key={p.num} style={{display:'flex',gap:12,padding:'14px',background:card,borderRadius:14,border:`1px solid ${p.c}22`,alignItems:'flex-start'}}>
              <div style={{width:36,height:36,background:`linear-gradient(135deg,${p.c},${p.c}99)`,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white',flexShrink:0}}>{p.num}</div>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                  <span style={{fontSize:18}}>{p.icon}</span>
                  <span style={{fontSize:13,fontWeight:700,color:p.c}}>{p.t}</span>
                </div>
                <div style={{fontSize:12,color:sub,lineHeight:1.6}}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:16,textAlign:'center'}}>
          <a href="/registro" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 32px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
            {es?'Empezar gratis →':'Start for free →'}
          </a>
        </div>
      </section>

      {/* ═══ SECCIÓN 5 — UN ECOSISTEMA DE TRES ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Ecosistema':'Ecosystem'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'Un ecosistema de tres':'An ecosystem of three'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>{es?'No son tres apps. Es un solo sistema que se retroalimenta.':'Not three apps. One system that feeds itself.'}</p>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
          {[
            {icon:'🌿',nombre:'OLIVIA Circular',desc:es?'Reciclás y ganás OLV Verdes certificables por Verra':'You recycle and earn Green OLV certifiable by Verra',color:'#22c55e',href:'/registro'},
            {icon:'💜',nombre:'Quincena PULSO',desc:es?'Más OLV → mejor turno en tu círculo de ahorro → cobrás antes':'More OLV → better turn in your savings circle → you collect sooner',color:'#3b82f6',href:'/quincena'},
            {icon:'🎨',nombre:'Art of Money',desc:es?'Más OLV → más puertas si sos creador → financiamiento real':'More OLV → more doors if you\'re a creator → real financing',color:'#a855f7',href:'/aom'},
          ].map(v=>(
            <div key={v.nombre} style={{padding:'16px',background:card,borderRadius:14,border:`1px solid ${v.color}22`}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                <span style={{fontSize:24}}>{v.icon}</span>
                <div style={{fontSize:13,fontWeight:700,color:v.color}}>{v.nombre}</div>
              </div>
              <div style={{fontSize:12,color:sub,marginBottom:8,lineHeight:1.5}}>{v.desc}</div>
              <a href={v.href} style={{fontSize:11,color:v.color,textDecoration:'none',fontWeight:600}}>{es?'Ver más →':'See more →'}</a>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'12px',textAlign:'center'}}>
          <div style={{fontSize:12,color:'#22c55e',fontWeight:700}}>
            {es?'Más OLV → mejor PULSO → mejor tasa en AOM':'More OLV → better PULSO → better AOM rate'}
          </div>
          <div style={{fontSize:11,color:sub,marginTop:4}}>
            {es?'Un solo ecosistema · tres formas de ganar':'One ecosystem · three ways to earn'}
          </div>
        </div>
      </section>

      {/* ═══ SECCIÓN 6 — LOS 6 TRAMOS ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Roadmap':'Roadmap'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'Los 6 tramos del ecosistema':'The 6 ecosystem stages'}</h2>
        <div style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.25)',borderRadius:10,padding:'10px',textAlign:'center',marginBottom:12}}>
          <span style={{fontSize:12,color:'#22c55e',fontWeight:700}}>✅ {es?'Verra validó dMRV en febrero 2026 — certeza técnica confirmada':'Verra validated dMRV in February 2026 — technical certainty confirmed'}</span>
        </div>
        <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,padding:'10px',textAlign:'center',marginBottom:16}}>
          <span style={{fontSize:11,color:'#f59e0b',fontWeight:700}}>
            {es?'⚠️ En Semilla los OLV no tienen valor monetario. En Brote se canjean. En Árbol, si Verra certifica, el mercado los compra. OLIVIA no paga — facilita.':'⚠️ In Semilla OLV have no monetary value. In Brote they redeem. In Árbol, if Verra certifies, the market buys them. OLIVIA doesn\'t pay — it facilitates.'}
          </span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[
            {icon:'🌱',t:'SEMILLA · 2026',d:es?'ACTIVA · OLV sin valor monetario · Construís historial · Los que empiezan hoy cobran primero en Árbol':'ACTIVE · OLV no monetary value · Build history · Early starters earn first in Árbol',c:'#22c55e',activo:true},
            {icon:'🌿',t:'BROTE · Q4 2026',d:es?'OLV canjeables por salud, transporte, apps · Convenios con partners':'OLV redeemable for health, transport, apps · Partner deals',c:'#3b82f6',activo:false},
            {icon:'🌳',t:'ÁRBOL · 2027 💰',d:es?'Si Verra VCS certifica · Valor neto por kg al ciudadano · OLIVIA no paga — el mercado sí · 6.329 OLV = USD 1':'If Verra VCS certifies · Net value per kg to citizen · 6.329 OLV = USD 1',c:'#f59e0b',activo:false},
            {icon:'🌲',t:'BOSQUE · 2028',d:es?'Artículo 6.4 Acuerdo de París · 2.198 OLV = USD 1 · Corredor AR MX CO BR CH DO':'Paris Agreement Article 6.4 · 2.198 OLV = USD 1 · AR MX CO BR CH DO corridor',c:'#a855f7',activo:false},
            {icon:'🏔️',t:'SELVA · 2029',d:es?'OLIVIA Ocean + Waters + Space · 1.429 OLV = USD 1':'OLIVIA Ocean + Waters + Space · 1.429 OLV = USD 1',c:'#ec4899',activo:false},
            {icon:'🌊',t:'SUMIDERO · 2030+',d:es?'Net positive verificado · 952 OLV = USD 1 · Infraestructura climática global':'Verified net positive · 952 OLV = USD 1 · Global climate infrastructure',c:'#06b6d4',activo:false},
          ].map((f,i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:'12px 14px',background:f.activo?'rgba(34,197,94,0.06)':card,borderRadius:12,border:`1px solid ${f.c}${f.activo?'44':'22'}`,alignItems:'center'}}>
              <span style={{fontSize:22,flexShrink:0}}>{f.icon}</span>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
                  <div style={{fontSize:11,color:f.c,fontWeight:700}}>{f.t}</div>
                  {f.activo&&<span style={{fontSize:9,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'2px 6px',borderRadius:10,fontWeight:700}}>{es?'ACTIVA':'ACTIVE'}</span>}
                </div>
                <div style={{fontSize:11,color:sub}}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECCIÓN 7 — ¿CUÁNTO PODÉS GANAR? ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Tu ganancia':'Your earnings'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'¿Cuánto podés ganar?':'How much can you earn?'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16,lineHeight:1.6}}>
          {es?'Depende de cómo participás. Todos empiezan en Semilla — los que más organizan, más ganan.':'Depends on how you participate. Everyone starts in Semilla — those who organize more, earn more.'}
        </p>

        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
          {GANANCIAS.map((g,i)=>(
            <div key={i} style={{padding:'16px',background:card,borderRadius:14,border:`1px solid ${g.color}22`}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <span style={{fontSize:28}}>{g.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:g.color}}>{g.titulo}</div>
                  <div style={{fontSize:11,color:sub,marginTop:2}}>{g.detalle}</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                <div style={{textAlign:'center',background:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)',borderRadius:8,padding:'8px 4px'}}>
                  <div style={{fontSize:9,color:sub,marginBottom:3}}>{es?'Por semana':'Per week'}</div>
                  <div style={{fontSize:11,fontWeight:700,color:g.color}}>{g.semana}</div>
                </div>
                <div style={{textAlign:'center',background:'rgba(245,158,11,0.06)',borderRadius:8,padding:'8px 4px',border:'1px solid rgba(245,158,11,0.15)'}}>
                  <div style={{fontSize:9,color:sub,marginBottom:3}}>🌳 Árbol 2027</div>
                  <div style={{fontSize:11,fontWeight:700,color:'#f59e0b'}}>{g.arbol}</div>
                </div>
                <div style={{textAlign:'center',background:'rgba(168,85,247,0.06)',borderRadius:8,padding:'8px 4px',border:'1px solid rgba(168,85,247,0.15)'}}>
                  <div style={{fontSize:9,color:sub,marginBottom:3}}>🌲 Bosque 2028</div>
                  <div style={{fontSize:11,fontWeight:700,color:'#a855f7'}}>{g.bosque}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TABLA OLV POR TRAMO */}
        <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'16px',marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:text,marginBottom:10}}>{es?'¿Cuántos OLV = USD 1?':'How many OLV = USD 1?'}</div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {OLV_TRAMOS.map((t,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:i<OLV_TRAMOS.length-1?`1px solid ${border}`:'none'}}>
                <div>
                  <span style={{fontSize:11,fontWeight:700,color:t.c}}>{t.tramo}</span>
                  <span style={{fontSize:10,color:sub,marginLeft:6}}>{t.año}</span>
                </div>
                <span style={{fontSize:11,fontWeight:700,color:t.c}}>{t.olv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ARGUMENTO DEL PRIMER MOVEDOR */}
        <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:6}}>
            {es?'💡 El argumento del primer movedor':'💡 The first mover argument'}
          </div>
          <div style={{fontSize:11,color:sub,lineHeight:1.7}}>
            {es?'Los que entran HOY en Semilla acumulan OLV cuando valen cero. Cuando llegue Árbol 2027, ya tienen 2 años de ventaja acumulada. No es especulación — cada OLV tiene un residuo real verificado con IA detrás.':'Those who enter NOW in Semilla accumulate OLV when they\'re worth zero. When Árbol 2027 arrives, they already have 2 years of accumulated advantage. Not speculation — each OLV has a real AI-verified waste behind it.'}
          </div>
        </div>

        {/* DISCLAIMER */}
        <div style={{background:'rgba(245,158,11,0.04)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:'12px',marginBottom:16}}>
          <div style={{fontSize:10,color:sub,lineHeight:1.6,fontStyle:'italic'}}>
            {es?'⚠️ Los valores son estimados y dependen de: (1) la conducta responsable del ciudadano al registrar y entregar sus residuos, (2) las certificaciones que se obtengan con Verra VCS, Gold Standard, Climate Action Reserve, GS Textile Exchange y demás certificadoras por tipo de material, y (3) el precio real de venta de los créditos en el mercado voluntario (Verra VCS, Gold Standard), en el mercado regulado (Art. 6.4 del Acuerdo de París) y en los mercados corporativos ESG al momento de la liquidación. OLIVIA crea el sistema, lo valida, lo certifica y permite que todos lo utilicemos. El sistema es de todos: todos recibimos algo cuando se distribuye. OLIVIA no paga — el mercado paga.':'⚠️ Values are estimates and depend on: (1) the citizen responsible behavior when registering and delivering waste, (2) certifications obtained with Verra VCS, Gold Standard, Climate Action Reserve, GS Textile Exchange and other certifiers per material type, and (3) the real sale price of carbon credits in the voluntary market (Verra VCS, Gold Standard), the regulated market (Paris Agreement Art. 6.4) and ESG corporate markets at the time of liquidation. OLIVIA creates, validates and certifies the system so everyone can use it. The system belongs to everyone. OLIVIA does not pay — the market pays.'}
          </div>
        </div>

        <div style={{textAlign:'center'}}>
          <a href="/simulador" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 28px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
            {es?'¿Cuál sos vos? Calculá →':'Which are you? Calculate →'}
          </a>
        </div>
      </section>

      {/* ═══ SECCIÓN 8 — DOS BOTONES GRANDES ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'¿Por dónde entrás?':'Where do you start?'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>{es?'Elegí tu camino en OLIVIA':'Choose your path in OLIVIA'}</p>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <a href="/ciudadano" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderRadius:16,background:'linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.06))',border:'2px solid rgba(34,197,94,0.4)',textDecoration:'none'}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontSize:36}}>🌿</span>
              <div>
                <div style={{fontSize:16,fontWeight:900,color:'#22c55e'}}>{es?'Soy ciudadano':'I\'m a citizen'}</div>
                <div style={{fontSize:12,color:sub,marginTop:2}}>{es?'Quiero reciclar y ganar OLV':'I want to recycle and earn OLV'}</div>
              </div>
            </div>
            <span style={{color:'#22c55e',fontSize:20,fontWeight:700}}>→</span>
          </a>
          <a href="/institucional" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderRadius:16,background:'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.06))',border:'2px solid rgba(245,158,11,0.4)',textDecoration:'none'}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontSize:36}}>🏛️</span>
              <div>
                <div style={{fontSize:16,fontWeight:900,color:'#f59e0b'}}>{es?'Soy inversor':'I\'m an investor'}</div>
                <div style={{fontSize:12,color:sub,marginTop:2}}>{es?'Ver el ecosistema completo':'See the full ecosystem'}</div>
              </div>
            </div>
            <span style={{color:'#f59e0b',fontSize:20,fontWeight:700}}>→</span>
          </a>
        </div>
      </section>

      {/* ═══ SECCIÓN 9 — COMUNIDAD EN VIVO ═══ */}
      <ComunidadFeed dark={dark} card={card} border={border} sub={sub} text={text} />

      {/* ═══ SECCIÓN 10 — INVITAR AMIGOS ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Comunidad':'Community'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'Invitá a tus amigos':'Invite your friends'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>{es?'⭐ +50 OLV Bonus por cada amigo que se registre':'⭐ +50 OLV Bonus for every friend who registers'}</p>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <a href={`https://wa.me/?text=${encodeURIComponent(es?'Estoy reciclando con OLIVIA Circulab y ganando OLV reales 🌿 Uníte acá: https://oliviacirculab.com.ar':'I\'m recycling with OLIVIA Circulab and earning real OLV 🌿 Join here: https://oliviacirculab.com.ar')}`}
            target="_blank" style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.3)',textDecoration:'none'}}>
            <span style={{fontSize:20}}>💬</span>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#25d366'}}>WhatsApp</div>
              <div style={{fontSize:10,color:sub}}>{es?'Invitar por WhatsApp':'Invite via WhatsApp'}</div>
            </div>
          </a>
          <button onClick={generarStoryInvitar} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,background:'rgba(131,58,180,0.08)',border:'1px solid rgba(131,58,180,0.3)',cursor:'pointer',textAlign:'left',width:'100%'}}>
            <span style={{fontSize:20}}>📸</span>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#a855f7'}}>{es?'Story Instagram':'Instagram Story'}</div>
              <div style={{fontSize:10,color:sub}}>{es?'Imagen lista para subir a Stories':'Image ready to post to Stories'}</div>
            </div>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'32px 20px',borderTop:`1px solid ${border}`,textAlign:'center',maxWidth:580,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:8}}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:56,height:56,objectFit:'contain',margin:'0 auto 6px',display:'block'}} />
          <span style={{fontSize:13,fontWeight:800,color:text}}>OLIVIA Circulab</span>
        </div>
        <div style={{fontSize:10,color:sub,marginBottom:12,lineHeight:1.5}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:14}}>
          {[
            {l:es?'Ciudadano':'Citizen',h:'/ciudadano',c:'#22c55e'},
            {l:es?'Institucional':'Institutional',h:'/institucional',c:'#f59e0b'},
            {l:'Simulador',h:'/simulador',c:'#3b82f6'},
            {l:'Comunidad',h:'/comunidad',c:'#3b82f6'},
            {l:'Whitepaper',h:'/whitepaper',c:'#a855f7'},
            {l:'Pitch',h:'/pitch',c:'#a855f7'},
            {l:es?'Privacidad':'Privacy',h:'/privacidad',c:sub},
          ].map(n=>(
            <a key={n.l} href={n.h} style={{fontSize:11,color:n.c,textDecoration:'none',fontWeight:600}}>{n.l}</a>
          ))}
        </div>
        <div style={{fontSize:11,color:sub,marginBottom:6}}>hola@oliviacirculab.com.ar</div>
        <div style={{fontSize:10,color:dark?'#475569':'#94a3b8'}}>©️ 2026 Circulab Tech · Distrito IA · Buenos Aires, Argentina · Ley 27.506</div>
      </footer>

    </div>
  )
}
