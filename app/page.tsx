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
  const videoSectionRef = useRef<HTMLDivElement>(null)

  const es = lang==='es'
  const bg = dark?'#0a0e1a':'#f0f4f8'
  const text = dark?'#f1f5f9':'#0a0e1a'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
  const sub = dark?'#94a3b8':'#475569'

  useEffect(()=>{
    cargarStats()
  },[])

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

  function compartirVideo(tipo: 'whatsapp'|'story') {
    const url = 'https://oliviacirculab.com.ar'
    const txt = es
      ?`Mirá este video — OLIVIA Circulab convierte tu basura en dinero real 🌿 ${url}`
      :`Watch this video — OLIVIA Circulab turns your waste into real money 🌿 ${url}`
    if(tipo==='whatsapp'){
      window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`)
    } else {
      // Story Instagram — descargar el video
      const a = document.createElement('a')
      a.href = '/Final1.mp4'
      a.download = 'olivia-circulab.mp4'
      a.click()
      setTimeout(()=>alert(es?'Video descargado 📱\nAbrí Instagram → Nueva Story → Galería':'Video downloaded 📱\nOpen Instagram → New Story → Gallery'),500)
    }
  }

  const RESIDUOS = [
    {icon:'🌿',tipo:es?'Orgánico':'Organic',olv:'180 OLV/kg',usd_f1:'USD 0',usd_f2:'Canje',usd_f3:'USD 0.022/OLV',bolsa:'Verra VM0036',color:'#22c55e'},
    {icon:'♻️',tipo:es?'Plástico':'Plastic',olv:'150 OLV/kg',usd_f1:'USD 0',usd_f2:'Canje',usd_f3:'USD 0.022/OLV',bolsa:'Gold Standard',color:'#3b82f6'},
    {icon:'🔩',tipo:es?'Metal':'Metal',olv:'800 OLV/kg',usd_f1:'USD 0',usd_f2:'Canje',usd_f3:'USD 0.022/OLV',bolsa:'CAR',color:'#ef4444'},
    {icon:'👕',tipo:es?'Textil':'Textile',olv:'550 OLV/kg',usd_f1:'USD 0',usd_f2:'Canje',usd_f3:'USD 0.022/OLV',bolsa:'GS Textile',color:'#ec4899'},
    {icon:'🛢️',tipo:es?'Aceite':'Oil',olv:'250 OLV/kg',usd_f1:'USD 0',usd_f2:'Canje',usd_f3:'USD 0.022/OLV',bolsa:'Verra AMS',color:'#f97316'},
    {icon:'📄',tipo:es?'Papel':'Paper',olv:'90 OLV/kg',usd_f1:'USD 0',usd_f2:'Canje',usd_f3:'USD 0.022/OLV',bolsa:'Gold Standard',color:'#f59e0b'},
    {icon:'🍾',tipo:es?'Vidrio':'Glass',olv:'30 OLV/kg',usd_f1:'USD 0',usd_f2:'Canje',usd_f3:'USD 0.022/OLV',bolsa:'Verra',color:'#a855f7'},
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
  ]

  const FUENTES = [
    {num:'01',l:es?'Créditos de carbono':'Carbon credits',v:'USD 85/mes',desc:es?'VCS + Gold Standard · 25% vecinos':'VCS + Gold Standard · 25% citizens',c:'#22c55e'},
    {num:'02',l:es?'Ahorro recolección':'Collection savings',v:'USD 800/mes',desc:es?'Estimado por consorcio':'Estimated per building',c:'#3b82f6'},
    {num:'03',l:es?'Venta materiales':'Materials sale',v:'USD 120/mes',desc:es?'Plástico, metal, textil, papel':'Plastic, metal, textile, paper',c:'#f59e0b'},
    {num:'04',l:es?'Abono orgánico':'Organic compost',v:'USD 45/mes',desc:es?'Compost · 25% consorcio':'Compost · 25% building',c:'#f97316'},
    {num:'05',l:es?'Certificación RSE':'CSR certification',v:'USD 75/mes',desc:es?'Badge Edificio Verde OLIVIA':'OLIVIA Green Building Badge',c:'#ec4899'},
  ]

  const ALIANZAS = [
    {icon:'🏢',tipo:es?'Consorcios':'Buildings',desc:es?'SaaS mensual + créditos carbono':'Monthly SaaS + carbon credits'},
    {icon:'🌿',tipo:es?'Cooperativas':'Cooperatives',desc:es?'15% de los créditos verificados':'15% of verified credits'},
    {icon:'🏥',tipo:es?'Salud y bienestar':'Health & wellness',desc:es?'OLV como cuenta por cobrar':'OLV as receivable account'},
    {icon:'📱',tipo:es?'Apps y plataformas':'Apps & platforms',desc:es?'Créditos de IA a cambio de OLV':'AI credits in exchange for OLV'},
    {icon:'✈️',tipo:es?'Aerolíneas / Navieras':'Airlines / Shipping',desc:es?'Compran OLV para compensar emisiones':'Buy OLV to offset emissions'},
    {icon:'🏬',tipo:es?'Empresas RSE':'CSR companies',desc:es?'Por proyecto · badge verde':'Per project · green badge'},
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
          <button onClick={()=>setLang(es?'en':'es')}
            style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            {es?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)}
            style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
            {dark?'☀️':'🌙'}
          </button>
          <a href="/login" style={{fontSize:12,color:sub,textDecoration:'none',padding:'6px 12px',borderRadius:8,border:`1px solid ${border}`}}>
            {es?'Entrar':'Sign in'}
          </a>
          <a href="/registro" style={{fontSize:12,color:'white',textDecoration:'none',padding:'6px 12px',borderRadius:8,background:'linear-gradient(135deg,#22c55e,#16a34a)',fontWeight:700}}>
            {es?'Unirse':'Join'}
          </a>
        </div>
      </nav>

      {/* ═══ SECCIÓN 1 — LA TIERRA PRIMERO ═══ */}
      <section style={{padding:'48px 20px 32px',maxWidth:580,margin:'0 auto',textAlign:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'5px 14px',fontSize:11,color:'#22c55e',fontWeight:700,marginBottom:20}}>
          🌱 {es?'Tramo Semilla · 2026 · Distrito IA Buenos Aires':'Seed Stage · 2026 · AI District Buenos Aires'}
        </div>

        <h1 style={{fontSize:34,fontWeight:900,lineHeight:1.15,marginBottom:16,letterSpacing:'-0.02em'}}>
          <span style={{color:'#22c55e'}}>{es?'La batalla más importante':'The most important battle'}</span>
          <br/>
          <span style={{color:text}}>{es?'de nuestro tiempo':'of our time'}</span>
          <br/>
          <span style={{color:'#f59e0b',fontStyle:'italic'}}>{es?'es el calentamiento global.':'is global warming.'}</span>
        </h1>

        <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:20}}>
          {es?'El metano de los rellenos sanitarios es el segundo gas de efecto invernadero más dañino del planeta. Cada kilo de residuo orgánico enterrado genera 1.8 kg de CO2eq que calientan la atmósfera durante décadas.':'Methane from landfills is the second most damaging greenhouse gas on the planet. Each kilo of buried organic waste generates 1.8 kg CO2eq that heat the atmosphere for decades.'}
        </p>

        {/* CITAS CIENTÍFICAS */}
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
          <div style={{fontSize:10,color:sub}}>{es?'Meta: 100 tCO2eq · Los que empiezan hoy cobran desde el día 1 de Fase 3':'Goal: 100 tCO2eq · Early starters earn from Phase 3 day 1'}</div>
        </div>

        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/registro" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 28px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)'}}>
            {es?'Empezar gratis →':'Start for free →'}
          </a>
          <a href="/simulador" style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,color:text,padding:'14px 28px',borderRadius:12,fontSize:14,fontWeight:600,textDecoration:'none'}}>
            {es?'¿Cuánto vale mi edificio?':"What's my building worth?"}
          </a>
        </div>
      </section>

      {/* ═══ SECCIÓN 2 — VIDEO ═══ */}
      <section ref={videoSectionRef} style={{padding:'0 20px 32px',maxWidth:580,margin:'0 auto'}}>
        <div style={{position:'relative',borderRadius:16,overflow:'hidden',border:`1px solid ${border}`,background:'#000'}}>
          <video
            ref={videoRef}
            controls
            playsInline
            style={{width:'100%',display:'block',maxHeight:500,objectFit:'cover'}}
            preload="auto"
          >
            <source src="/Final1.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Botones compartir video */}
        <div style={{display:'flex',gap:10,marginTop:12,justifyContent:'center'}}>
          <button onClick={()=>compartirVideo('whatsapp')}
            style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',borderRadius:10,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.3)',cursor:'pointer',color:'#25d366',fontSize:12,fontWeight:700}}>
            💬 {es?'Compartir por WhatsApp':'Share on WhatsApp'}
          </button>
          <button onClick={()=>compartirVideo('story')}
            style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px',borderRadius:10,background:'rgba(131,58,180,0.1)',border:'1px solid rgba(131,58,180,0.3)',cursor:'pointer',color:'#a855f7',fontSize:12,fontWeight:700}}>
            📸 {es?'Story Instagram':'Instagram Story'}
          </button>
        </div>
      </section>

      {/* MODAL DE VIDEO — se abre al entrar, no vuelve a abrir si se cierra */}
      {videoModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.95)',zIndex:9999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{width:'100%',maxWidth:580,position:'relative'}}>
            {/* Cerrar */}
            <button onClick={()=>setVideoModal(false)}
              style={{position:'absolute',top:-40,right:0,background:'transparent',border:'none',color:'white',fontSize:28,cursor:'pointer',lineHeight:1,zIndex:10}}>
              ×
            </button>
            {/* Badge */}
            <div style={{textAlign:'center',marginBottom:12}}>
              <span style={{fontSize:11,color:'#22c55e',fontWeight:700,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'4px 12px'}}>
                🌿 OLIVIA Circulab
              </span>
            </div>
            {/* Video */}
            <div style={{borderRadius:14,overflow:'hidden',background:'#000',border:'2px solid rgba(34,197,94,0.3)'}}>
              <video
                autoPlay
                muted
                controls
                playsInline
                style={{width:'100%',display:'block',maxHeight:'60vh',objectFit:'cover'}}
                preload="auto"
              >
                <source src="/Final1.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Botones compartir */}
            <div style={{display:'flex',gap:10,marginTop:12,justifyContent:'center'}}>
              <button onClick={()=>compartirVideo('whatsapp')}
                style={{display:'flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:10,background:'rgba(37,211,102,0.15)',border:'1px solid rgba(37,211,102,0.4)',cursor:'pointer',color:'#25d366',fontSize:12,fontWeight:700}}>
                💬 WhatsApp
              </button>
              <button onClick={()=>compartirVideo('story')}
                style={{display:'flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:10,background:'rgba(131,58,180,0.15)',border:'1px solid rgba(131,58,180,0.4)',cursor:'pointer',color:'#a855f7',fontSize:12,fontWeight:700}}>
                📸 Story
              </button>
              <button onClick={()=>setVideoModal(false)}
                style={{display:'flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:10,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',cursor:'pointer',color:'#94a3b8',fontSize:12}}>
                {es?'Seguir leyendo →':'Continue reading →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ SECCIÓN 3 — EL PROBLEMA ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:14,padding:'20px'}}>
          <div style={{fontSize:11,color:'#ef4444',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>
            {es?'El problema ciudadano':'The citizen problem'}
          </div>
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
          <p style={{fontSize:12,color:sub,lineHeight:1.7,fontStyle:'italic',marginBottom:14}}>
            {es?'"Te enseñaron a mezclar todo para que el sistema facture por peso enterrado. OLIVIA rompe ese ciclo — y pone la infraestructura para que todos cobren."':'"They taught you to mix everything so the system earns by buried weight. OLIVIA breaks that cycle — and builds the infrastructure for everyone to earn."'}
          </p>
          <div style={{fontSize:12,color:'#22c55e',fontWeight:700,textAlign:'center'}}>
            {es?'OLIVIA no paga — facilita la infraestructura para que el mercado pague.':'OLIVIA doesn\'t pay — it facilitates the infrastructure for the market to pay.'}
          </div>
        </div>
      </section>

      {/* ═══ SECCIÓN 4 — CÓMO FUNCIONA ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>
          {es?'Cómo funciona':'How it works'}
        </div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>
          {es?'De la foto a los créditos de carbono en 4 pasos':'From photo to carbon credits in 4 steps'}
        </h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>
          {es?'La app OLIVIA + Metamorfosis — verificación ciudadana con IA':'The OLIVIA app + Metamorfosis — citizen verification with AI'}
        </p>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[
            {num:'01',icon:'📸',t:es?'Fotografiás el residuo':'You photograph the waste',d:es?'La IA analiza el tipo y el peso con Cloudflare AI Vision. Con una moneda de $10 al lado, la estimación es precisa.':'AI analyzes type and weight with Cloudflare AI Vision. With a $10 coin for reference, estimates are precise.',c:'#22c55e'},
            {num:'02',icon:'📍',t:es?'Confirmás la disposición':'You confirm disposal',d:es?'Llevás el residuo al punto verde o compostás en casa. La segunda foto con GPS activa tus OLV.':'Take waste to a green point or compost at home. The second photo with GPS activates your OLV.',c:'#3b82f6'},
            {num:'03',icon:'🪙',t:es?'Acumulás tokens OLV':'You accumulate OLV tokens',d:es?'Cada kilo verificado genera tokens OLV — activos ambientales certificados. En Fase 1 no tienen valor monetario. En Fase 2 se canjean. En Fase 3 se convierten en dinero real.':'Each verified kilo generates OLV tokens — certified environmental assets. In Phase 1 no monetary value. Phase 2: redemptions. Phase 3: real money.',c:'#f59e0b'},
            {num:'04',icon:'💰',t:es?'El mercado paga — 2027':'The market pays — 2027',d:es?'OLIVIA certifica con Verra. El mercado de carbono compra los créditos. OLIVIA facilita y distribuye. Los que empezaron antes cobran más.':'OLIVIA certifies with Verra. The carbon market buys the credits. OLIVIA facilitates and distributes. Early starters earn more.',c:'#a855f7'},
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
          <a href="/registro" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 32px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',display:'inline-block',boxShadow:'0 0 20px rgba(34,197,94,0.2)'}}>
            {es?'Empezar gratis →':'Start for free →'}
          </a>
        </div>
      </section>

      {/* ═══ SECCIÓN 5 — TODOS LOS RESIDUOS ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#3b82f6',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Residuos':'Waste types'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'Todos los residuos generan valor':'All waste types generate value'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:20}}>
          {es?'7 tipos · 7 certificadoras · Valor en OLV y en USD según la fase':'7 types · 7 certifiers · Value in OLV and USD per stage'}
        </p>

        {/* Tabla de valor por fase */}
        <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'14px',marginBottom:16}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:8,marginBottom:10}}>
            {[
              {l:es?'Fase':'Phase',v:'',c:sub},
              {l:'🌱 Semilla',v:es?'Sin valor':'No value',c:'#22c55e'},
              {l:'🌿 Brote',v:es?'Canjes':'Redemptions',c:'#3b82f6'},
              {l:'🌳 Árbol',v:'USD 0.022',c:'#f59e0b'},
            ].map((f,i)=>(
              <div key={i} style={{textAlign:'center',padding:'6px 4px',borderRadius:8,background:i>0?`rgba(${i===1?'34,197,94':i===2?'59,130,246':'245,158,11'},0.08)`:'transparent'}}>
                <div style={{fontSize:9,fontWeight:700,color:f.c,lineHeight:1.3}}>{f.l}</div>
                {f.v&&<div style={{fontSize:9,color:sub,marginTop:2}}>{f.v}</div>}
              </div>
            ))}
          </div>
          <div style={{fontSize:10,color:sub,textAlign:'center',fontStyle:'italic'}}>
            {es?'USD 0.022 = valor estimado por OLV en Fase 3 · Verra VCS USD 22/t · 25% para el ciudadano':'USD 0.022 = estimated OLV value in Phase 3 · Verra VCS USD 22/t · 25% for the citizen'}
          </div>
        </div>

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
                <div style={{fontSize:10,color:'#f59e0b',fontWeight:700}}>≈ {r.usd_f3} · Fase 3</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,padding:'12px',background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:10,textAlign:'center'}}>
          <span style={{fontSize:12,color:'#ef4444',fontWeight:700}}>
            🔩 {es?'El metal genera 44× más valor que el vidrio. Cuantos más tipos separás — más OLV acumulás.':'Metal generates 44× more value than glass. The more types you separate — the more OLV you earn.'}
          </span>
        </div>
      </section>

      {/* ═══ SECCIÓN 6 — LOS 6 TRAMOS ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Roadmap':'Roadmap'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'Los 6 tramos del ecosistema':'The 6 ecosystem stages'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:8}}>
          {es?'Como un árbol — de semilla a selva':'Like a tree — from seed to jungle'}
        </p>
        <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,padding:'10px',textAlign:'center',marginBottom:16}}>
          <span style={{fontSize:12,color:'#f59e0b',fontWeight:700}}>
            {es?'⚠️ En Fase 1 los OLV no tienen valor monetario. En Fase 2 se canjean por servicios. En Fase 3, si se logra la certificación Verra, el mercado los compra. OLIVIA no paga — facilita.':'⚠️ In Phase 1 OLV have no monetary value. In Phase 2 they redeem for services. In Phase 3, if Verra certification is achieved, the market buys them. OLIVIA doesn\'t pay — it facilitates.'}
          </span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {[
            {icon:'🌱',t:'SEMILLA · 2026',d:es?'Fase 1 ACTIVA · OLV sin valor monetario · Construís historial · Los que empiezan hoy cobran primero en Fase 3':'Phase 1 ACTIVE · OLV no monetary value · Build history · Early starters earn first in Phase 3',c:'#22c55e',activo:true},
            {icon:'🌿',t:'BROTE · Q4 2026',d:es?'Fase 2 · OLV canjeables por salud, transporte, apps · Convenios con empresas partner':'Phase 2 · OLV redeemable for health, transport, apps · Partner company deals',c:'#3b82f6',activo:false},
            {icon:'🌳',t:'ÁRBOL · 2027 💰',d:es?'Fase 3 · Si se logra certificación Verra VCS · USD 22/t · 25% para el vecino · OLIVIA no paga — el mercado sí':'Phase 3 · If Verra VCS certification achieved · USD 22/t · 25% for the citizen · OLIVIA doesn\'t pay — the market does',c:'#f59e0b',activo:false},
            {icon:'🌲',t:'BOSQUE · 2028',d:es?'Artículo 6.4 del Acuerdo de París · USD 90/t · Corredor AR MX CO BR CH DO':'Paris Agreement Article 6.4 · USD 90/t · AR MX CO BR CH DO corridor',c:'#a855f7',activo:false},
            {icon:'🏔️',t:'SELVA · 2029',d:es?'OLIVIA Ocean + Waters + Space · PULSO estándar LATAM':'OLIVIA Ocean + Waters + Space · PULSO LATAM standard',c:'#ec4899',activo:false},
            {icon:'🌊',t:'SUMIDERO · 2030+',d:es?'Net positive verificado · El sistema absorbe más CO2 del que genera · Infraestructura climática global':'Verified net positive · System absorbs more CO2 than it generates · Global climate infrastructure',c:'#06b6d4',activo:false},
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

      {/* ═══ SECCIÓN 7 — LOGÍSTICA ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#3b82f6',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Logística':'Logistics'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'App de recolección con optimización de rutas IA':'AI-powered collection app with route optimization'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>
          {es?'Priorizando transportes verdes para generar créditos adicionales de metano evitado':'Prioritizing green transport to generate additional methane-avoided credits'}
        </p>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
          {[
            {icon:'🏠',t:es?'Vos — el generador':'You — the generator',d:es?'Separás, fotografiás y solicitás recolección desde tu app':'You separate, photograph and request collection from your app',c:'#22c55e'},
            {icon:'🤖',t:es?'IA optimiza la ruta':'AI optimizes the route',d:es?'El sistema asigna el recolector más cercano con el vehículo más verde disponible':'The system assigns the nearest collector with the greenest available vehicle',c:'#3b82f6'},
            {icon:'🚲',t:es?'Recolector verde prioritario':'Priority green collector',d:es?'🚲 Bicicleta (0 kg CO2/km) · 🛵 Moto eléctrica · ⚡ Auto eléctrico — bonus OLV por transporte verde':'🚲 Bicycle (0 kg CO2/km) · 🛵 Electric scooter · ⚡ Electric car — OLV bonus for green transport',c:'#22c55e'},
            {icon:'🏭',t:es?'Planta de procesamiento':'Processing plant',d:es?'El residuo llega verificado con GPS y foto. Listo para certificar con Verra. CO2 evitado en transporte también certificable.':'Waste arrives GPS and photo verified. Ready to certify with Verra. Transport CO2 avoided also certifiable.',c:'#a855f7'},
          ].map((paso,i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:'12px 14px',background:card,borderRadius:12,border:`1px solid ${paso.c}22`,alignItems:'center'}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:`${paso.c}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{paso.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:paso.c}}>{paso.t}</div>
                <div style={{fontSize:11,color:sub,marginTop:2}}>{paso.d}</div>
              </div>
              {i<3&&<div style={{fontSize:16,color:sub}}>↓</div>}
            </div>
          ))}
        </div>
        <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',textAlign:'center',marginBottom:14}}>
          <div style={{fontSize:12,color:'#22c55e',fontWeight:700,marginBottom:4}}>
            {es?'🌿 Doble crédito de carbono':'🌿 Double carbon credit'}
          </div>
          <div style={{fontSize:11,color:sub,lineHeight:1.6}}>
            {es?'Un recolector en bicicleta genera créditos por el residuo Y por el CO2 evitado en el transporte. Metodología Verra AMS-III.C.':'A bicycle collector generates credits for the waste AND for CO2 avoided in transport. Verra AMS-III.C methodology.'}
          </div>
        </div>
        <a href="/registro" style={{display:'block',textAlign:'center',background:'linear-gradient(135deg,#3b82f6,#2563eb)',color:'white',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none'}}>
          {es?'Registrar mi primer residuo →':'Register my first waste →'}
        </a>
      </section>

      {/* ═══ SECCIÓN 8 — 8 TIPOS DE CLIENTE ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Clientes':'Clients'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'8 tipos de cliente':'8 customer types'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>{es?'Desde el vecino hasta el municipio':'From individual citizen to municipality'}</p>

        {/* Consorcios destacados */}
        <div style={{background:'rgba(59,130,246,0.06)',border:'2px solid rgba(59,130,246,0.3)',borderRadius:14,padding:'16px',marginBottom:14}}>
          <div style={{fontSize:12,color:'#3b82f6',fontWeight:700,marginBottom:4}}>🏢 {es?'Consorcios — el cliente ancla':'Buildings — the anchor client'}</div>
          <div style={{fontSize:10,color:'#f59e0b',marginBottom:8,lineHeight:1.5}}>
            {es?'⚠️ Estos valores son el ingreso estimado que podría recibir tu consorcio desde Fase 3 (2027) — no lo que OLIVIA cobra. En Fase 1 no hay costo ni cobro.':'⚠️ These values are the estimated income your building could receive from Phase 3 (2027) — not what OLIVIA charges. In Phase 1 there is no cost or payment.'}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:10}}>
            {[
              {num:'01',l:es?'Créditos de carbono':'Carbon credits',v:'USD 85/mes'},
              {num:'02',l:es?'Ahorro recolección':'Collection savings',v:'USD 800/mes'},
              {num:'03',l:es?'Venta materiales':'Materials sale',v:'USD 120/mes'},
              {num:'04',l:es?'Abono orgánico':'Compost',v:'USD 45/mes'},
              {num:'05',l:es?'Certificación RSE':'CSR badge',v:'USD 75/mes'},
            ].map(f=>(
              <div key={f.num} style={{display:'flex',justifyContent:'space-between',fontSize:11}}>
                <span style={{color:sub}}>{f.l}</span>
                <span style={{color:'#3b82f6',fontWeight:700}}>{f.v}</span>
              </div>
            ))}
          </div>
          <div style={{borderTop:`1px solid ${border}`,paddingTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:12,color:sub}}>{es?'Total estimado (100 deptos)':'Estimated total (100 units)'}</span>
            <span style={{fontSize:20,fontWeight:900,color:'#3b82f6'}}>USD 1.125/mes</span>
          </div>
          <div style={{fontSize:10,color:sub,marginTop:4,fontStyle:'italic'}}>{es?'Estimación orientativa · Consultanos por tu caso':'Indicative estimate · Contact us for your case'}</div>
          <div style={{display:'flex',gap:10,marginTop:12}}>
            <a href="/simulador" style={{flex:1,background:'linear-gradient(135deg,#3b82f6,#2563eb)',color:'white',padding:'10px',borderRadius:10,fontSize:12,fontWeight:700,textDecoration:'none',display:'block',textAlign:'center'}}>
              {es?'Calcular mi consorcio →':'Calculate my building →'}
            </a>
            <a href="mailto:hola@oliviacirculab.com.ar?subject=Quiero sumar mi consorcio" style={{flex:1,background:card,border:`1px solid ${border}`,color:text,padding:'10px',borderRadius:10,fontSize:12,fontWeight:600,textDecoration:'none',display:'block',textAlign:'center'}}>
              {es?'Sumar mi edificio →':'Add my building →'}
            </a>
          </div>
        </div>

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

      {/* ═══ SECCIÓN 9 — TRES VERTICALES ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Ecosistema':'Ecosystem'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'Tres verticales · Un ecosistema':'Three verticals · One ecosystem'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>{es?'Más OLV → mejor PULSO → mejor tasa en AOM — incentivos cruzados que se refuerzan':'More OLV → better PULSO → better AOM rate — cross incentives that reinforce each other'}</p>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[
            {icon:'🌿',nombre:'OLIVIA Circulab',desc:es?'Residuos → compost → reforestación → créditos de carbono → dinero real. La vertical central del ecosistema.':'Waste → compost → reforestation → carbon credits → real money. The central vertical of the ecosystem.',color:'#22c55e',href:'/registro',cta:es?'Empezar a reciclar →':'Start recycling →'},
            {icon:'👥',nombre:'Quincena · Protocolo PULSO',desc:es?'Roscas digitales → score crediticio → acceso al crédito formal. Corredor AR MX CO BR CH DO. Más OLV = mejor PULSO.':'Digital savings groups → credit score → formal credit access. AR MX CO BR CH DO corridor. More OLV = better PULSO.',color:'#3b82f6',href:'/quincena',cta:es?'Ver PULSO →':'See PULSO →'},
            {icon:'🎵',nombre:'Art of Money',desc:es?'Regalías musicales y deportivas → adelanto de capital hoy. Más OLV como colateral = mejor tasa de adelanto.':'Music and sports royalties → capital advance today. More OLV as collateral = better advance rate.',color:'#a855f7',href:'/aom',cta:es?'Ver AOM →':'See AOM →'},
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

      {/* ═══ SECCIÓN 10 — EQUIPO ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Founders':'Founders'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'El equipo':'The team'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>{es?'Construido con USD 0 de inversión externa':'Built with USD 0 external investment'}</p>
        <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:14}}>
          {[
            {foto:'/founders/founder-jp.jpg',nombre:'Juan Pablo Sanguinetti de Zapata',rol:es?'CEO & Founder':'CEO & Founder',desc:es?'Director de teatro chileno y abogado. Product builder con IA. Especialidad en medio ambiente, tributación y gestión de proyectos. Arquitecto del ecosistema Circulab desde Buenos Aires.':'Chilean theater director and lawyer. AI product builder. Expertise in environmental law, taxation and project management. Architect of the Circulab ecosystem from Buenos Aires.',color:'#22c55e'},
            {foto:'/founders/founder-mileidy.jpg',nombre:'Mileidy Zapata de Sanguinetti',rol:es?'COO & Co-founder':'COO & Co-founder',desc:es?'Madre, bailarina y coreógrafa dominicana. Representante de la sabiduría ancestral y la economía del cuidado. Junto a OLIVIA y Santino Eloy, el piloto comenzó en casa.':'Mother, dancer and Dominican choreographer. Representative of ancestral wisdom and the care economy. Together with OLIVIA and Santino Eloy, the pilot started at home.',color:'#3b82f6'},
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
          <div style={{fontSize:11,color:'#22c55e',fontWeight:700,fontStyle:'italic'}}>
            {es?'"Una app creada en una cocina. Para todos nuestros hijos. 🌿"':'"An app created in a kitchen. For all our children. 🌿"'}
          </div>
        </div>
      </section>

      {/* ═══ SECCIÓN 11 — DOCUMENTOS ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Documentos técnicos':'Technical documents'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:16,color:text}}>{es?'Accedé al whitepaper y al pitch':'Access the whitepaper and pitch'}</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
          {[
            {icon:'📄',label:'Whitepaper',sub:es?'Con NDA':'With NDA',href:'/whitepaper',color:'#3b82f6'},
            {icon:'📋',label:'One Pager',sub:es?'Resumen ejecutivo':'Executive summary',href:'/onepager',color:'#f59e0b'},
            {icon:'📊',label:'Pitch Deck',sub:es?'Acceso con datos':'Data-gated access',href:'/pitch',color:'#a855f7'},
          ].map(d=>(
            <a key={d.label} href={d.href} style={{background:card,border:`1px solid ${d.color}33`,borderRadius:12,padding:'14px',textAlign:'center',textDecoration:'none',display:'block'}}>
              <div style={{fontSize:24,marginBottom:6}}>{d.icon}</div>
              <div style={{fontSize:11,fontWeight:700,color:d.color}}>{d.label}</div>
              <div style={{fontSize:9,color:sub,marginTop:3}}>{d.sub}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ SECCIÓN 12 — ALIANZAS ═══ */}
      <section id="alianzas" style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Alianzas':'Alliances'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'¿Querés ser partner de OLIVIA?':'Want to be an OLIVIA partner?'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>{es?'Los OLV que recibís hoy son una cuenta por cobrar — no un descuento.':'OLV you receive today are a receivable account — not a discount.'}</p>
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
          <div style={{fontSize:12,fontWeight:700,color:'#a855f7',marginBottom:6}}>{es?'¿Por qué aceptar OLV?':'Why accept OLV?'}</div>
          <div style={{fontSize:11,color:sub,lineHeight:1.6}}>
            {es?'Cuando OLIVIA certifique con Verra en 2027, los OLV que acumulaste se convierten en dinero real. Las empresas que entran antes acumulan más OLV cuando valen poco — y cobran más cuando valen más.':'When OLIVIA certifies with Verra in 2027, accumulated OLV become real money. Companies that join early accumulate more OLV when they\'re cheap — and earn more when they\'re worth more.'}
          </div>
        </div>
        <a href="/alianzas" style={{display:'block',textAlign:'center',background:'linear-gradient(135deg,#a855f7,#7c3aed)',color:'white',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none'}}>
          {es?'Quiero ser partner →':'Become a partner →'}
        </a>
      </section>

      {/* ═══ SECCIÓN 13 — INVERSORES ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Inversores':'Investors'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'Ronda Seed 2026':'Seed Round 2026'}</h2>
        <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:10}}>
            {es?'🏛️ Ventajas de invertir en Argentina':'🏛️ Advantages of investing in Argentina'}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              {icon:'🤖',t:es?'Distrito IA Buenos Aires':'AI District Buenos Aires',d:es?'El primer ecosistema de IA de LATAM · Hub de talento tech':'The first AI ecosystem in LATAM · Tech talent hub'},
              {icon:'📋',t:es?'Ley 27.506 · Cada USD 1 = USD 1.4':'Law 27.506 · Every USD 1 = USD 1.4',d:es?'Ganancias al 15% · 70-80% reducción cargas · FONDCE · Estabilidad fiscal 10 años':'15% income tax · 70-80% payroll reduction · FONDCE · 10-year fiscal stability'},
            ].map((v,i)=>(
              <div key={i} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                <span style={{fontSize:16,flexShrink:0}}>{v.icon}</span>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:text}}>{v.t}</div>
                  <div style={{fontSize:10,color:sub,marginTop:1}}>{v.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
          <div style={{padding:'16px',background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,textAlign:'center'}}>
            <div style={{fontSize:11,color:sub,marginBottom:4}}>{es?'Opción A':'Option A'}</div>
            <div style={{fontSize:24,fontWeight:900,color:'#22c55e'}}>USD 500K</div>
            <div style={{fontSize:11,color:sub,marginTop:2}}>10% equity · USD 4.5M pre</div>
          </div>
          <div style={{padding:'16px',background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,textAlign:'center'}}>
            <div style={{fontSize:11,color:sub,marginBottom:4}}>{es?'Opción B':'Option B'}</div>
            <div style={{fontSize:24,fontWeight:900,color:'#3b82f6'}}>USD 2M</div>
            <div style={{fontSize:11,color:sub,marginTop:2}}>15% equity · USD 11.3M pre</div>
          </div>
        </div>

        <a href="/institucional" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',borderRadius:12,background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',textDecoration:'none',marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:20}}>🏛️</span>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#22c55e'}}>{es?'Ver sitio institucional':'View institutional site'}</div>
              <div style={{fontSize:10,color:sub}}>{es?'Tesis, garantías, 6 tramos y equipo fundador':'Thesis, guarantees, 6 stages and founding team'}</div>
            </div>
          </div>
          <span style={{color:'#22c55e',fontSize:16}}>→</span>
        </a>

        {!enviado?(
          <div style={{background:card,border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,color:'#f59e0b',marginBottom:4}}>{es?'Acceder al pitch deck':'Access the pitch deck'}</div>
            <div style={{fontSize:11,color:sub,marginBottom:14}}>{es?'Dejá tus datos para ver el deck completo':'Leave your details to see the full deck'}</div>
            {[
              {v:nombre,fn:setNombre,ph:es?'Tu nombre completo':'Your full name',type:'text'},
              {v:email,fn:setEmail,ph:es?'Tu email':'Your email',type:'email'},
              {v:empresa,fn:setEmpresa,ph:es?'Empresa u organización (opcional)':'Company or organization (optional)',type:'text'},
            ].map((f,i)=>(
              <input key={i} type={f.type} value={f.v} onChange={e=>f.fn(e.target.value)} placeholder={f.ph}
                style={{width:'100%',padding:'10px 14px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
            ))}
            <button onClick={enviarLead} disabled={enviando||!email}
              style={{width:'100%',background:email?'linear-gradient(135deg,#f59e0b,#d97706)':'rgba(255,255,255,0.04)',border:'none',borderRadius:10,padding:'12px',color:email?'white':sub,fontSize:13,fontWeight:700,cursor:'pointer'}}>
              {enviando?'Guardando...':(es?'Ver pitch deck →':'View pitch deck →')}
            </button>
          </div>
        ):(
          <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:14,padding:'20px',textAlign:'center'}}>
            <div style={{fontSize:20,marginBottom:8}}>✅</div>
            <div style={{fontSize:14,fontWeight:700,color:'#22c55e',marginBottom:8}}>{es?'¡Gracias! Te redirigimos al pitch.':'Thanks! Redirecting to the pitch.'}</div>
            <a href="/pitch" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'10px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
              {es?'Ver pitch deck →':'View pitch deck →'}
            </a>
          </div>
        )}
      </section>

      {/* ═══ SECCIÓN 14 — COMUNIDAD EN VIVO ═══ */}
      <ComunidadFeed dark={dark} card={card} border={border} sub={sub} text={text} />

      {/* ═══ SECCIÓN 15 — ENCUESTA ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{background:'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(59,130,246,0.08))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'24px',textAlign:'center'}}>
          <div style={{fontSize:24,marginBottom:8}}>📋</div>
          <div style={{fontSize:16,fontWeight:900,color:text,marginBottom:8}}>{es?'¿Qué pensás de OLIVIA?':'What do you think of OLIVIA?'}</div>
          <div style={{fontSize:12,color:sub,marginBottom:16,lineHeight:1.6}}>{es?'Completá la encuesta de 2 minutos y ayudanos a mejorar el producto.':'Complete the 2-minute survey and help us improve the product.'}</div>
          <a href="/encuesta" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'12px 28px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
            {es?'Completar encuesta →':'Take the survey →'}
          </a>
        </div>
      </section>

      {/* ═══ SECCIÓN 16 — INVITAR AMIGOS ═══ */}
      <section style={{padding:'32px 20px',maxWidth:580,margin:'0 auto',borderTop:`1px solid ${border}`}}>
        <div style={{fontSize:11,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center',marginBottom:6}}>{es?'Comunidad':'Community'}</div>
        <h2 style={{fontSize:22,fontWeight:900,textAlign:'center',marginBottom:6,color:text}}>{es?'Invitá a tus amigos':'Invite your friends'}</h2>
        <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>{es?'+200 OLV por cada amigo que se registre':'+200 OLV for every friend who registers'}</p>
        <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'16px',marginBottom:12}}>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <a href={`https://wa.me/?text=${encodeURIComponent(es?'Estoy reciclando con OLIVIA Circulab y ganando tokens OLV reales 🌿 Uníte acá: https://oliviacirculab.com.ar':'I\'m recycling with OLIVIA Circulab and earning real OLV tokens 🌿 Join here: https://oliviacirculab.com.ar')}`}
              target="_blank"
              style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.3)',textDecoration:'none'}}>
              <span style={{fontSize:20}}>💬</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#25d366'}}>WhatsApp</div>
                <div style={{fontSize:10,color:sub}}>{es?'Invitar por WhatsApp':'Invite via WhatsApp'}</div>
              </div>
            </a>
            <button onClick={()=>{
              const txt = es
                ?'Estoy reciclando con OLIVIA Circulab y ganando tokens OLV reales 🌿 Uníte acá: https://oliviacirculab.com.ar'
                :'I\'m recycling with OLIVIA Circulab and earning real OLV tokens 🌿 Join here: https://oliviacirculab.com.ar'
              if(navigator.share){navigator.share({title:'OLIVIA Circulab',text:txt,url:'https://oliviacirculab.com.ar'})}
              else{navigator.clipboard.writeText(txt);alert(es?'Texto copiado — pegalo donde quieras':'Text copied — paste it anywhere')}
            }} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,cursor:'pointer',textAlign:'left'}}>
              <span style={{fontSize:20}}>📤</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:text}}>{es?'Más opciones':'More options'}</div>
                <div style={{fontSize:10,color:sub}}>{es?'Copiar link o compartir en otras redes':'Copy link or share on other networks'}</div>
              </div>
            </button>

           <button onClick={async()=>{
             const canvas = document.createElement('canvas')
             canvas.width = 1080
             canvas.height = 1920
             const ctx = canvas.getContext('2d')!
             const grad = ctx.createLinearGradient(0,0,0,1920)
             grad.addColorStop(0,'#0a1a0a')
             grad.addColorStop(1,'#0a0e1a')
             ctx.fillStyle = grad
             ctx.fillRect(0,0,1080,1920)
             ctx.textAlign = 'center'
             ctx.fillStyle = '#22c55e'
             ctx.font = 'bold 64px system-ui'
             ctx.fillText('🌿 OLIVIA Circulab', 540, 300)
             ctx.fillStyle = '#f1f5f9'
             ctx.font = 'bold 80px system-ui'
             ctx.fillText(es?'Me sumé al':'I joined', 540, 620)
             ctx.fillText(es?'reciclaje que paga 💰':'recycling that pays 💰', 540, 720)
             ctx.fillStyle = '#f1f5f9'
             ctx.font = '52px system-ui'
             ctx.fillText(es?'Uníte gratis →':'Join for free →', 540, 1100)
             ctx.fillStyle = '#22c55e'
             ctx.beginPath()
             ctx.roundRect(140,1350,800,140,35)
             ctx.fill()
             ctx.fillStyle = '#0a1a0a'
             ctx.font = 'bold 48px system-ui'
             ctx.fillText('oliviacirculab.com.ar', 540, 1438)
             ctx.fillStyle = '#64748b'
             ctx.font = '38px system-ui'
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
               a.href=url;a.download='olivia-story.png';a.click()
               alert(es?'📸 Imagen descargada\nAbrí Instagram → Nueva Story → Galería':'📸 Image downloaded\nOpen Instagram → New Story → Gallery')
             },'image/png')
           }} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,background:'rgba(131,58,180,0.08)',border:'1px solid rgba(131,58,180,0.3)',cursor:'pointer',textAlign:'left',width:'100%'}}>
             <span style={{fontSize:20}}>📸</span>
             <div>
               <div style={{fontSize:13,fontWeight:700,color:'#a855f7'}}>{es?'Story Instagram':'Instagram Story'}</div>
               <div style={{fontSize:10,color:sub}}>{es?'Imagen lista para subir a Stories':'Image ready to post to Stories'}</div>
             </div>
           </button>

         </div>
       </div>
       <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10,padding:'10px 14px',textAlign:'center'}}>
         <span style={{fontSize:12,color:'#22c55e',fontWeight:700}}>+200 OLV</span>
         <span style={{fontSize:11,color:sub}}> {es?'por cada amigo que se registre y verifique su primer residuo':'for each friend who registers and verifies their first waste'}</span>
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
            {l:'Simulador',h:'/simulador',c:'#22c55e'},
            {l:'Comunidad',h:'/comunidad',c:'#3b82f6'},
            {l:'Pitch',h:'/pitch',c:'#a855f7'},
            {l:'Alianzas',h:'/alianzas',c:'#f59e0b'},
            {l:'Privacidad',h:'/privacidad',c:sub},
            {l:'Términos',h:'/terminos',c:sub},
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
