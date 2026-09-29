'use client'

// SEO metadata

import { useState, useEffect } from 'react'

export default function Ciudadano() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [tema, setTema] = useState<'light'|'dark'|'color'>('dark')
  const [popup, setPopup] = useState(false)
  const [videoModal, setVideoModal] = useState(true)

  const bg = tema==='dark'?'#0a0e1a':tema==='color'?'#f4ece1':'#faf7f2'
  const text = tema==='dark'?'#f1f5f9':tema==='color'?'#2c3e50':'#0d0d0d'
  const accent = tema==='dark'?'#22c55e':tema==='color'?'#d35400':'#1e5c3a'
  const card = tema==='dark'?'#111827':tema==='color'?'#fdfaf6':'#ffffff'
  const border = tema==='dark'?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.07)'
  const sub = tema==='dark'?'#94a3b8':'#64748b'
  const es = lang==='es'

  useEffect(()=>{ }, [])

  function cerrarModal() {
    setVideoModal(false)
    setTimeout(()=>setPopup(true), 30000)
  }

  function compartirWA() {
    const url = 'https://oliviacirculab.com.ar/ciudadano'
    const txt = es
      ?`Separás, pero nadie puede demostrar adónde fue. OLIVIA lo mide 🌿 ${url}`
      :`You sort your waste, but no one can prove where it went. OLIVIA measures it 🌿 ${url}`
    window.open('https://wa.me/?text='+encodeURIComponent(txt))
  }

  async function generarStoryEnterramiento() {
    const canvas = document.createElement('canvas')
    canvas.width = 1080; canvas.height = 1920
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createLinearGradient(0,0,0,1920)
    grad.addColorStop(0,'#0a1a0a'); grad.addColorStop(1,'#0a0e1a')
    ctx.fillStyle = grad; ctx.fillRect(0,0,1080,1920)
    ctx.textAlign = 'center'
    ctx.fillStyle = '#ef4444'; ctx.font = 'bold 80px system-ui'
    ctx.fillText(es?'Los orgánicos':'Organic waste', 540, 380)
    ctx.fillStyle = '#f1f5f9'; ctx.font = 'bold 58px system-ui'
    ctx.fillText(es?'terminan en el relleno.':'ends up in landfill.', 540, 480)
    ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 54px system-ui'
    ctx.fillText(es?'¿Y si eso cambiara?':'What if that changed?', 540, 600)
    ctx.fillStyle = '#94a3b8'; ctx.font = '44px system-ui'
    ctx.fillText(es?'En las ciudades que funcionan,':'In cities that work,', 540, 900)
    ctx.fillText(es?'separar tiene recompensa.':'sorting is rewarded.', 540, 960)
    ctx.fillStyle = '#22c55e'; ctx.font = 'bold 52px system-ui'
    ctx.fillText(es?'OLIVIA construye el dato.':'OLIVIA builds the data.', 540, 1060)
    ctx.fillStyle = '#22c55e'; ctx.font = 'bold 48px system-ui'
    ctx.fillText('🌿 OLIVIA Circulab', 540, 1280)
    ctx.fillStyle = '#f1f5f9'; ctx.font = '40px system-ui'
    ctx.fillText(es?'Ver el video completo →':'Watch the full video →', 540, 1380)
    ctx.fillStyle = '#22c55e'; ctx.beginPath()
    ctx.roundRect(140,1500,800,120,30); ctx.fill()
    ctx.fillStyle = '#0a1a0a'; ctx.font = 'bold 40px system-ui'
    ctx.fillText('oliviacirculab.com.ar/ciudadano', 540, 1575)
    canvas.toBlob(async(blob)=>{
      if(!blob) return
      const file = new File([blob],'olivia-enterramiento-story.png',{type:'image/png'})
      const txt = es?'El negocio del enterramiento. OLIVIA lo cambia 🌿 https://oliviacirculab.com.ar/ciudadano':'The landfill business. OLIVIA changes it 🌿 https://oliviacirculab.com.ar/ciudadano'
      if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
        try{await navigator.share({files:[file],title:'OLIVIA Circulab',text:txt});return}catch(e){}
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href=url; a.download='olivia-enterramiento-story.png'; a.click()
      alert(es?'📸 Imagen descargada\nAbrí Instagram → Nueva Story → Galería':'📸 Image downloaded\nOpen Instagram → New Story → Gallery')
    },'image/png')
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
    ctx.fillText(es?'Tu residuo vuelve al ciclo':'Your waste returns to the cycle', 540, 1720)
    canvas.toBlob(async(blob)=>{
      if(!blob) return
      const file = new File([blob],'olivia-story.png',{type:'image/png'})
      const txt = es?'Sumate a OLIVIA Circulab 🌿 https://oliviacirculab.com.ar/ciudadano':'Join OLIVIA Circulab 🌿 https://oliviacirculab.com.ar/ciudadano'
      if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
        try{await navigator.share({files:[file],title:'OLIVIA Circulab',text:txt});return}catch(e){}
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href=url; a.download='olivia-story.png'; a.click()
      alert(es?'📸 Imagen descargada\nAbrí Instagram → Nueva Story → Galería':'📸 Image downloaded\nOpen Instagram → New Story → Gallery')
    },'image/png')
  }

  const GANANCIAS = [
    {icon:'🌱',titulo:es?'Reciclás en casa':'You recycle at home',color:'#22c55e',
     detalle:es?'Separás tus orgánicos y los registrás con foto':'You sort your organics and register them with a photo'},
    {icon:'🏘️',titulo:es?'Organizás tu edificio':'You organize your building',color:'#3b82f6',
     detalle:es?'Vos + coordinás a tus vecinos':'You + coordinate your neighbors'},
    {icon:'🍃',titulo:es?'Limpiás tu barrio':'You clean your neighborhood',color:'#22c55e',
     detalle:es?'Hojas · ramas · residuos verdes del espacio público':'Leaves · branches · green urban waste'},
    {icon:'🌍',titulo:es?'Coordinás tu zona':'You coordinate your zone',color:'#a855f7',
     detalle:es?'Varios edificios · cientos de familias':'Several buildings · hundreds of families'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.3s',overflowX:'hidden'}}>

      {/* MODAL VIDEO ENTERRAMIENTO — CIRCULAB1.mp4 — horizontal — genera imagen para Story */}
      {videoModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.96)',zIndex:9999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{width:'100%',maxWidth:580,position:'relative'}}>
            <button onClick={cerrarModal} style={{position:'absolute',top:-44,right:0,background:'transparent',border:'none',color:'white',fontSize:32,cursor:'pointer',lineHeight:1,zIndex:10}}>×</button>
            <div style={{textAlign:'center',marginBottom:12}}>
              <span style={{fontSize:11,color:'#ef4444',fontWeight:700,background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:20,padding:'4px 12px'}}>
                ⚠️ {es?'El negocio del enterramiento':'The landfill business'}
              </span>
            </div>
            <div style={{borderRadius:14,overflow:'hidden',background:'#000',border:'2px solid rgba(239,68,68,0.3)'}}>
              <video autoPlay muted controls playsInline style={{width:'100%',display:'block',maxHeight:'50vh',objectFit:'contain'}}>
                <source src="/ciudadano/CIRCULAB1.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{display:'flex',gap:8,marginTop:12,justifyContent:'center',flexWrap:'wrap'}}>
              <button onClick={compartirWA}
                style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',borderRadius:10,background:'rgba(37,211,102,0.15)',border:'1px solid rgba(37,211,102,0.4)',cursor:'pointer',color:'#25d366',fontSize:12,fontWeight:700}}>
                💬 WhatsApp
              </button>
              <button onClick={generarStoryEnterramiento}
                style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',borderRadius:10,background:'rgba(131,58,180,0.15)',border:'1px solid rgba(131,58,180,0.4)',cursor:'pointer',color:'#a855f7',fontSize:12,fontWeight:700}}>
                📸 {es?'Story (imagen vertical)':'Story (vertical image)'}
              </button>
              <button onClick={cerrarModal}
                style={{display:'flex',alignItems:'center',gap:6,padding:'10px 16px',borderRadius:10,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',cursor:'pointer',color:'#94a3b8',fontSize:12}}>
                {es?'Seguir leyendo →':'Continue →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{padding:'10px 16px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:bg,position:'sticky',top:0,zIndex:100,backdropFilter:'blur(10px)'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:36,height:36,objectFit:'contain',borderRadius:8}} />
          <div>
            <div style={{fontSize:12,fontWeight:800,color:text,lineHeight:1.2}}>OLIVIA Circulab</div>
            <div style={{fontSize:9,color:accent,textTransform:'uppercase',letterSpacing:'0.06em'}}>Circulab Tech</div>
          </div>
        </a>
        <div style={{display:'flex',gap:5,alignItems:'center'}}>
          <a href="/registro" style={{background:'#22c55e',color:'white',padding:'6px 12px',borderRadius:8,fontSize:11,fontWeight:700,textDecoration:'none'}}>
            {es?'Empezar →':'Start →'}
          </a>
          <div style={{display:'flex',gap:3}}>
            {(['dark','light','color'] as const).map(t=>(
              <button key={t} onClick={()=>setTema(t)}
                style={{width:26,height:26,borderRadius:'50%',border:`1px solid ${border}`,background:tema===t?accent:'transparent',color:tema===t?'white':sub,fontSize:10,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {t==='light'?'☀':t==='dark'?'🌙':'🎨'}
              </button>
            ))}
          </div>
          <button onClick={()=>setLang(es?'en':'es')}
            style={{border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:10,fontWeight:700,cursor:'pointer',background:'transparent',color:text}}>
            {es?'EN':'ES'}
          </button>
        </div>
      </nav>

      {/* BANNER MAPA TOP */}
      <a href="/mapa" style={{display:'block',textDecoration:'none',background:'linear-gradient(90deg,rgba(2,132,199,0.14),rgba(34,197,94,0.10))',borderBottom:'1px solid rgba(2,132,199,0.2)',padding:'14px 20px'}}>
        <div style={{maxWidth:800,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <span style={{fontSize:26}}>🗺️</span>
            <div>
              <div style={{fontSize:14,fontWeight:900,color:text,lineHeight:1.3}}>
                {es?'¿Dónde podés dejar tus orgánicos hoy?':'Where can you drop your organics today?'}
              </div>
              <div style={{fontSize:11.5,color:sub,marginTop:2}}>
                {es?'Los 21 puntos verdes de CABA · cuáles tienen compostera · cuáles reciben RAEE.':'The 21 green points of the City · which have composting · which accept e-waste.'}
              </div>
            </div>
          </div>
          <span style={{fontSize:12,fontWeight:800,color:'#0284c7',whiteSpace:'nowrap',border:'1px solid rgba(2,132,199,0.35)',borderRadius:20,padding:'8px 18px'}}>
            {es?'Ver el mapa →':'View the map →'}
          </span>
        </div>
      </a>

      <div style={{maxWidth:640,margin:'0 auto',padding:'0 16px'}}>

        {/* HERO */}
        <section style={{padding:'24px 0 16px'}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
            <span style={{fontSize:10,fontWeight:700,border:'1px solid #22c55e',color:'#22c55e',padding:'3px 10px',borderRadius:20}}>🌱 {es?'Piloto 2026':'Pilot 2026'}</span>
            <span style={{fontSize:10,fontWeight:700,border:'1px solid #3b82f6',color:'#3b82f6',padding:'3px 10px',borderRadius:20}}>Buenos Aires</span>
          </div>
          <h1 style={{fontSize:36,fontWeight:900,lineHeight:1.15,marginBottom:12,letterSpacing:'-0.02em',textAlign:'center'}}>
            <span style={{color:text}}>{es?'Tu residuo vale.':'Your waste matters.'}</span><br/>
            <span style={{color:'#22c55e',fontStyle:'italic'}}>{es?'Tu árbol crece.':'Your tree grows.'}</span><br/>
            <span style={{color:text}}>{es?'Tu impacto queda medido.':'Your impact is measured.'}</span>
          </h1>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:16}}>
            {es?'Cada kilo de residuo verificado con IA genera OLV Verdes: un registro de cuánto desviaste del relleno y cuánto metano se evitó con eso. Ese registro es la base de un futuro proceso de certificación.':'Each AI-verified kilo generates Green OLV: a record of how much you diverted from landfill and how much methane was avoided. That record is the basis for a future certification process.'}
          </p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <a href="/registro" style={{flex:1,background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'13px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',textAlign:'center'}}>
              {es?'📷 Registrar Mi Residuo →':'📷 Register My Waste →'}
            </a>
            <a href="/simulador" style={{background:card,border:`1px solid ${border}`,color:text,padding:'13px 16px',borderRadius:10,fontSize:12,fontWeight:600,textDecoration:'none',textAlign:'center'}}>
              {es?'Simulador':'Simulator'}
            </a>
          </div>
        </section>

        {/* OLV VERDE VS BONUS */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:16,color:text}}>{es?'Dos tipos de OLV':'Two types of OLV'}</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:20,marginBottom:8}}>🌿</div>
              <div style={{fontSize:13,fontWeight:700,color:'#22c55e',marginBottom:6}}>{es?'OLV Verdes':'Green OLV'}</div>
              <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{es?'Solo de residuos verificados con IA. Respaldados por kilos reales y metano evitado. Son los únicos que pueden entrar a un proceso de certificación.':'Only from AI-verified waste. Backed by real kilos and avoided methane. The only ones that can enter a certification process.'}</div>
            </div>
            <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:20,marginBottom:8}}>⭐</div>
              <div style={{fontSize:13,fontWeight:700,color:'#f59e0b',marginBottom:6}}>{es?'OLV Bonus':'Bonus OLV'}</div>
              <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{es?'Por registrarte, referir amigos, publicar y dar likes. Sin valor ambiental. No se presentan a certificación.':'For registering, referring friends, posting and liking. No environmental value. Not submitted for certification.'}</div>
            </div>
          </div>
        </section>

        {/* ¿CUÁNTO GANÁS Y CUÁNDO? */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'¿Cómo participás?':'How do you take part?'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16,lineHeight:1.6}}>
            {es?'Hay varias formas de sumar kilos verificados. La capa ciudadana se abre cuando la primera planta aliada esté operando.':'There are several ways to add verified kilos. The citizen layer opens when the first partner plant is operating.'}
          </p>

          {/* 4 versiones */}
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
              </div>
            ))}
          </div>

          {/* Hoja de ruta */}
          <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:12,padding:'14px',marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:8}}>{es?'📅 Hoja de ruta':'📅 Roadmap'}</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {[
                {periodo:es?'Hoy · Semilla':'Today · Seed',desc:es?'Piloto: acumulás OLV Verdes sin valor monetario · construís historial':'Pilot: accumulate Green OLV with no monetary value · build history',c:'#22c55e'},
                {periodo:es?'Próxima · Brote':'Next · Sprout',desc:es?'Planta aliada con datos continuos de balanza':'Partner plant with continuous scale data',c:'#3b82f6'},
                {periodo:es?'Etapa Árbol':'Tree stage',desc:es?'Si se completa la certificación bajo estándar Verra':'If Verra certification is completed',c:'#f59e0b'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:item.c,flexShrink:0,marginTop:4}}/>
                  <div>
                    <div style={{fontSize:11,fontWeight:700,color:item.c}}>{item.periodo}</div>
                    <div style={{fontSize:10,color:sub}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Argumento primer movedor */}
          <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:6}}>💡 {es?'El argumento del primer movedor':'The first mover argument'}</div>
            <div style={{fontSize:11,color:sub,lineHeight:1.7}}>
              {es?'Los que registran desde hoy construyen el historial de datos que hace posible cualquier certificación futura. Sin ese historial acumulado no hay nada que auditar. Cada OLV tiene un residuo real verificado con IA detrás.':'Those who register from today build the data record that makes any future certification possible. Without that accumulated record there is nothing to audit. Every OLV has a real AI-verified waste behind it.'}
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{background:'rgba(245,158,11,0.04)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:'12px',marginBottom:16}}>
            <div style={{fontSize:10,color:sub,lineHeight:1.6,fontStyle:'italic'}}>
              {es?'⚠️ OLIVIA no paga, el mercado paga. Hoy los OLV no tienen valor monetario y OLIVIA no promete ingresos. Si el proyecto se certifica, el valor dependerá de la certificación obtenida y del precio de los créditos en el mercado al momento de la venta.':'⚠️ OLIVIA does not pay, the market does. Today OLV have no monetary value and OLIVIA promises no income. If the project is certified, value will depend on the certification obtained and the credit price in the market at the time of sale.'}
            </div>
          </div>

          <div style={{textAlign:'center'}}>
            <a href="/simulador" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 28px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
              {es?'¿Cuál sos vos? Calculá →':'Which are you? Calculate →'}
            </a>
          </div>
        </section>

        {/* EL PROBLEMA */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:14,padding:'20px'}}>
            <div style={{fontSize:11,color:'#ef4444',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>{es?'El problema':'The problem'}</div>
            <h2 style={{fontSize:22,fontWeight:900,marginBottom:12,lineHeight:1.2,color:text}}>
              {es?'Separás, pero nadie puede demostrar adónde fue.':'You sort your waste, but no one can prove where it went.'}
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
              {[
                {stat:'🗑️',desc:es?'los orgánicos terminan en el relleno':'organics end up in landfill',c:'#ef4444'},
                {stat:'🏭',desc:es?'plantas con capacidad ociosa':'plants with idle capacity',c:'#ef4444'},
                {stat:'📍',desc:es?'sin trazabilidad de origen a destino':'no traceability from source to destination',c:'#f59e0b'},
              ].map((k,i)=>(
                <div key={i} style={{background:tema==='dark'?'rgba(255,255,255,0.03)':card,borderRadius:10,padding:'12px',textAlign:'center',border:`1px solid ${k.c}22`}}>
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

        {/* EN LA NATURALEZA NO HAY BASURA */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{background:'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(59,130,246,0.06))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'20px'}}>
            <div style={{fontSize:20,fontWeight:900,color:'#22c55e',marginBottom:8,lineHeight:1.3,textAlign:'center'}}>
              {es?'"En la naturaleza no hay basura."':'"In nature there is no waste."'}
            </div>
            <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16,lineHeight:1.6,fontStyle:'italic'}}>
              {es?'"Solo hay recursos sin infraestructura. OLIVIA es esa infraestructura."':'"Only resources without infrastructure. OLIVIA is that infrastructure."'}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:14}}>
              {[
                {icon:'🏠',l:es?'Vos separás':'You sort',s:es?'Foto + GPS':'Photo + GPS'},
                {icon:'🤖',l:es?'IA verifica':'AI verifies',s:es?'OLV acreditados':'OLV credited'},
                {icon:'🌳',l:es?'Se reforesta':'Reforested',s:es?'Compost + árbol':'Compost + tree'},
                {icon:'📊',l:es?'Tu registro':'Your record',s:es?'Verificado':'Verified'},
              ].map((p,i)=>(
                <div key={i} style={{background:card,borderRadius:10,padding:'10px 6px',textAlign:'center',border:`1px solid ${border}`}}>
                  <div style={{fontSize:22,marginBottom:5}}>{p.icon}</div>
                  <div style={{fontSize:10,fontWeight:700,color:'#22c55e'}}>{p.l}</div>
                  <div style={{fontSize:9,color:sub,marginTop:2}}>{p.s}</div>
                </div>
              ))}
            </div>
            <div style={{padding:'10px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,textAlign:'center'}}>
              <span style={{fontSize:11,color:'#f59e0b',fontWeight:700}}>
                {es?'📊 Los que registran desde hoy construyen el historial que hace posible auditar mañana':'📊 Those recording today build the history that makes tomorrow auditable'}
              </span>
            </div>
          </div>
        </section>

        {/* LOGÍSTICA */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#3b82f6',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'Logística':'Logistics'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'App de recolección con IA':'AI-powered collection app'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16}}>{es?'Rutas optimizadas · Transportes verdes':'Optimized routes · Green transport'}</p>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:14}}>
            {[
              {icon:'🏠',t:es?'Vos separás y fotografiás':'You sort and photograph',d:es?'Foto + GPS activa tus OLV Verdes. La IA analiza tipo y peso.':'Photo + GPS activates your Green OLV. AI analyzes type and weight.',c:'#22c55e'},
              {icon:'🤖',t:es?'IA optimiza la ruta':'AI optimizes the route',d:es?'Asigna el recolector más cercano con el vehículo más verde disponible.':'Assigns nearest collector with greenest available vehicle.',c:'#3b82f6'},
              {icon:'🚲',t:es?'Recolector verde prioritario':'Priority green collector',d:es?'🚲 Bicicleta · 🛵 Moto eléctrica · ⚡ Auto eléctrico — bonus OLV por transporte verde':'🚲 Bicycle · 🛵 Electric scooter · ⚡ Electric car — OLV bonus for green transport',c:'#22c55e'},
              {icon:'🏭',t:es?'Planta verificada':'Verified plant',d:es?'El residuo llega con GPS y foto verificados. Listo para certificar con Verra.':'Waste arrives GPS and photo verified. Ready to certify with Verra.',c:'#a855f7'},
            ].map((paso,i)=>(
              <div key={i} style={{display:'flex',gap:12,padding:'12px 14px',background:card,borderRadius:12,border:`1px solid ${paso.c}22`,alignItems:'center'}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:`${paso.c}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{paso.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:paso.c}}>{paso.t}</div>
                  <div style={{fontSize:11,color:sub,marginTop:2}}>{paso.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* QUE PASA DESPUES */}
          <div style={{marginTop:16,background:card,border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}}>
              {es?'¿Qué pasa después de que registrás?':'What happens after you register?'}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {icon:'📸',step:es?'Registrás con foto + GPS':'You register with photo + GPS',detail:es?'Tus OLV quedan como pendientes hasta verificación.':'Your OLV stay pending until verification.',color:'#22c55e'},
                {icon:'✅',step:es?'El equipo OLIVIA valida la entrega':'OLIVIA team validates the delivery',detail:es?'Confirmamos foto de entrega en punto verde o recolector. OLV se acreditan en tu wallet.':'We confirm delivery photo at green point or collector. OLV are credited to your wallet.',color:'#3b82f6'},
                {icon:'🌿',step:es?'Acumulás OLV Verdes certificables':'You accumulate certifiable Green OLV',detail:es?'En Semilla 2026 no tienen valor monetario. Son tu historial verificado para Verra.':'In Semilla 2026 they have no monetary value. They are your verified history for Verra.',color:'#f59e0b'},
                {icon:'🌳',step:es?'Etapa Árbol · certificación':'Tree stage · certification',detail:es?'Si el proyecto completa el proceso de certificación, los registros acumulados pasan a tener valor en el mercado voluntario. Es una etapa futura que depende de una auditoría externa, no de OLIVIA.':'If the project completes certification, accumulated records gain value in the voluntary market. A future stage that depends on external audit, not on OLIVIA.',color:'#22c55e'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                  <div style={{width:32,height:32,borderRadius:'50%',background:'rgba(34,197,94,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>{item.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700,color:item.color}}>{item.step}</div>
                    <div style={{fontSize:11,color:sub,marginTop:2,lineHeight:1.5}}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,padding:'10px 14px',background:'rgba(239,68,68,0.05)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:10}}>
              <div style={{fontSize:11,color:sub,lineHeight:1.6}}>
                {es?'⚠️ Importante: los OLV no tienen hoy valor monetario y OLIVIA no promete ingresos. Son un registro verificado de cuánto residuo se desvió del relleno y cuánto metano se evitó. La certificación bajo estándar Verra es un proceso que lleva entre dos y tres años, incluye validación por auditor acreditado y su resultado no depende de OLIVIA.':'⚠️ Important: OLV have no monetary value today and OLIVIA promises no income. They are a verified record of diverted waste and avoided methane. Verra certification takes two to three years and its outcome does not depend on OLIVIA.'}
              </div>
            </div>
          </div>
        </section>

        {/* PARA QUIÉN MÁS */}
        <section style={{padding:'20px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:12,color:sub,marginBottom:10}}>{es?'¿Qué residuos podés registrar? ¿Sos consorcio o comercio?':'Which waste can you register? Are you a building or a business?'}</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {[
              {h:'/metamorfosis',t:es?'Tipos de residuo →':'Waste types →'},
              {h:'/consorcios',t:es?'Consorcios →':'Buildings →'},
              {h:'/operadores',t:es?'Comercios y plantas →':'Businesses and plants →'},
            ].map(l=>(
              <a key={l.h} href={l.h} style={{fontSize:12,fontWeight:700,color:'#22c55e',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'8px 12px',textDecoration:'none'}}>{l.t}</a>
            ))}
          </div>
        </section>

        {/* TRES VERTICALES: una activa, dos en espera */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#a855f7',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'Verticales':'Verticals'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:10,color:text}}>{es?'Una vertical activa · dos en espera':'One active vertical · two on hold'}</h2>
          <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.25)',borderRadius:12,padding:'12px 14px',marginBottom:14}}>
            <div style={{fontSize:12,color:text,fontWeight:700,lineHeight:1.5}}>
              {es?'Hoy empujamos solo Metamorfosis.':'Today we push only Metamorfosis.'}
            </div>
            <div style={{fontSize:11,color:sub,lineHeight:1.6,marginTop:4}}>
              {es?'Quincena · PULSO y Art of Money existen como diseño, pero no se escribirá ni una línea de código hasta que Metamorfosis crezca.':'Quincena · PULSO and Art of Money exist as designs, but not a single line of code will be written until Metamorfosis grows.'}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {img:'/ciudadano/metamorfosis.jpg',nombre:'Metamorfosis · OLIVIA',desc:es?'Residuos → compost → dato verificado → certificación':'Waste → compost → verified data → certification',color:'#22c55e',href:'/metamorfosis',activa:true},
              {img:'/ciudadano/pulso.jpg',nombre:'Quincena · PULSO',desc:es?'Roscas digitales → historial de ahorro → acceso al crédito formal':'Digital savings circles → savings record → access to formal credit',color:'#3b82f6',href:'/quincena',activa:false},
              {img:'/ciudadano/aom.jpg',nombre:'Art of Money',desc:es?'Regalías musicales y deportivas → capital para creadores':'Music and sports royalties → capital for creators',color:'#a855f7',href:'/aom',activa:false},
            ].map(v=>(
              <div key={v.nombre} style={{background:card,border:`1px solid ${v.activa?v.color+'55':border}`,borderRadius:14,overflow:'hidden',display:'flex',gap:0,opacity:v.activa?1:0.75}}>
                <img src={v.img} alt={v.nombre} style={{width:90,objectFit:'cover',filter:v.activa?'none':'grayscale(100%)',flexShrink:0}} />
                <div style={{padding:'14px',flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                    <span style={{fontSize:12,fontWeight:700,color:v.color}}>{v.nombre}</span>
                    <span style={{fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:10,color:v.activa?'#22c55e':sub,background:v.activa?'rgba(34,197,94,0.12)':`${border}`}}>
                      {v.activa?(es?'ACTIVA':'ACTIVE'):(es?'EN ESPERA':'ON HOLD')}
                    </span>
                  </div>
                  <div style={{fontSize:11,color:sub,lineHeight:1.5,marginBottom:8}}>{v.desc}</div>
                  <a href={v.href} style={{fontSize:11,color:v.color,fontWeight:700,textDecoration:'none'}}>{v.activa?(es?'Explorar →':'Explore →'):(es?'Conocer la idea →':'See the idea →')}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FUNDADORES */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#22c55e',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'El equipo':'The team'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:16,color:text}}>{es?'Construido en nuestra cocina':'Built in our kitchen'}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {foto:'/founders/founder-jp.jpg',nombre:'Juan Pablo Sanguinetti de Zapata',rol:'CEO & Founder',desc:es?'Director de teatro chileno y abogado. Product builder con IA. Arquitecto del ecosistema Circulab.':'Chilean theater director and lawyer. AI product builder. Architect of the Circulab ecosystem.',color:'#22c55e'},
              {foto:'/founders/founder-mileidy.jpg',nombre:'Mileidy Zapata de Sanguinetti',rol:'COO & Co-founder',desc:es?'Madre, bailarina y coreógrafa dominicana. Economía del cuidado y branding estratégico.':'Mother, dancer and Dominican choreographer. Care economy and strategic branding.',color:'#3b82f6'},
            ].map(f=>(
              <div key={f.nombre} style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'16px'}}>
                <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:10}}>
                  <img src={f.foto} alt={f.nombre} style={{width:56,height:56,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:`2px solid ${f.color}`}} />
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:text,marginBottom:2,lineHeight:1.3}}>{f.nombre}</div>
                    <div style={{fontSize:10,color:f.color,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em'}}>{f.rol}</div>
                  </div>
                </div>
                <div style={{fontSize:11,color:sub,lineHeight:1.7}}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12,padding:'10px 14px',background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10,textAlign:'center'}}>
            <div style={{fontSize:11,color:'#22c55e',fontWeight:700,fontStyle:'italic'}}>
              {es?'"Una app creada en una cocina. Para todos nuestros hijos. 🌿"':'"An app created in a kitchen. For all our children. 🌿"'}
            </div>
          </div>
        </section>

        {/* DOCUMENTOS */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:16,color:text}}>{es?'Documentos':'Documents'}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
            {[
              {icon:'📄',label:'Whitepaper',href:'/whitepaper',color:'#3b82f6'},
              {icon:'📋',label:'One Pager',href:'/onepager',color:'#f59e0b'},
              {icon:'📊',label:'Pitch',href:'/pitch',color:'#a855f7'},
            ].map(d=>(
              <a key={d.label} href={d.href} style={{background:card,border:`1px solid ${d.color}33`,borderRadius:12,padding:'14px',textAlign:'center',textDecoration:'none',display:'block'}}>
                <div style={{fontSize:24,marginBottom:6}}>{d.icon}</div>
                <div style={{fontSize:11,fontWeight:700,color:d.color}}>{d.label}</div>
              </a>
            ))}
          </div>
        </section>

        {/* DIAGNOSTICO ORGANICOS */}
        <div style={{marginBottom:24}}>
          <a href="/organicos" style={{display:'block',textDecoration:'none',background:tema==='dark'?'rgba(146,64,14,0.10)':'rgba(146,64,14,0.05)',border:'1px solid rgba(146,64,14,0.25)',borderRadius:16,padding:'22px'}}>
            <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#92400e',marginBottom:10}}>
              [ {es?'Diagnóstico':'Diagnosis'} ]
            </div>
            <h3 style={{fontSize:18,fontWeight:900,marginBottom:8,color:text}}>
              {es?'¿Qué pasa realmente con los orgánicos en Buenos Aires?':'What really happens to organics in Buenos Aires?'}
            </h3>
            <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:10}}>
              {es?'Vegetal, poda y animal tienen circuitos distintos. Dónde va cada uno, qué opciones reales tenés y por qué el orgánico animal no tiene salida.':'Vegetable, pruning and animal have different circuits.'}
            </p>
            <span style={{fontSize:12,color:'#92400e',fontWeight:700}}>{es?'Leer el diagnóstico →':'Read the diagnosis →'}</span>
          </a>
        </div>

        {/* COMPARTIR */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'Compartí OLIVIA':'Share OLIVIA'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16}}>{es?'⭐ +50 OLV Bonus por cada amigo que se registre':'⭐ +50 Bonus OLV for each friend who registers'}</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <a href={`https://wa.me/?text=${encodeURIComponent(es?'Mirá esto — tu residuo vuelve al ciclo 🌿 https://oliviacirculab.com.ar/ciudadano':'Check this out — your waste returns to the cycle 🌿 https://oliviacirculab.com.ar/ciudadano')}`}
              target="_blank" style={{display:'flex',alignItems:'center',gap:12,padding:'14px',borderRadius:12,background:'rgba(37,211,102,0.08)',border:'1px solid rgba(37,211,102,0.3)',textDecoration:'none'}}>
              <span style={{fontSize:22}}>💬</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#25d366'}}>WhatsApp</div>
                <div style={{fontSize:10,color:sub}}>{es?'Compartir con mensaje pregrabado':'Share with pre-written message'}</div>
              </div>
            </a>
            <button onClick={generarStoryInvitar} style={{display:'flex',alignItems:'center',gap:12,padding:'14px',borderRadius:12,background:'rgba(131,58,180,0.08)',border:'1px solid rgba(131,58,180,0.3)',cursor:'pointer',textAlign:'left',width:'100%'}}>
              <span style={{fontSize:22}}>📸</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#833ab4'}}>{es?'Story Instagram':'Instagram Story'}</div>
                <div style={{fontSize:10,color:sub}}>{es?'Imagen vertical lista para subir':'Vertical image ready to post'}</div>
              </div>
            </button>
            <button onClick={()=>{
              const txt = es?'Estoy reciclando con OLIVIA Circulab y ganando OLV reales 🌿 Uníte: https://oliviacirculab.com.ar/ciudadano':'I am recycling with OLIVIA Circulab and earning real OLV 🌿 Join: https://oliviacirculab.com.ar/ciudadano'
              if(navigator.share){navigator.share({title:'OLIVIA Circulab',text:txt,url:'https://oliviacirculab.com.ar/ciudadano'})}
              else{navigator.clipboard.writeText(txt);alert(es?'Copiado ✓':'Copied ✓')}
            }} style={{display:'flex',alignItems:'center',gap:12,padding:'14px',borderRadius:12,background:card,border:`1px solid ${border}`,cursor:'pointer',textAlign:'left'}}>
              <span style={{fontSize:22}}>📤</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:text}}>{es?'Más opciones':'More options'}</div>
                <div style={{fontSize:10,color:sub}}>{es?'Copiar o compartir en otras redes':'Copy or share on other networks'}</div>
              </div>
            </button>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid '+border,padding:'40px 24px 32px',textAlign:'center'}}>
        <a href="/" style={{display:'block',marginBottom:10}}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:52,height:52,objectFit:'contain',display:'block',margin:'0 auto'}} />
        </a>
        <div style={{fontSize:13,fontWeight:800,color:text,marginBottom:6}}>OLIVIA Circulab</div>
        <div style={{fontSize:10,color:sub,lineHeight:1.6,maxWidth:400,margin:'0 auto 18px'}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',maxWidth:600,margin:'0 auto 14px'}}>
          {[
            {l:es?'Ciudadano':'Citizen',h:'/ciudadano'},
            {l:'Metamorfosis',h:'/metamorfosis'},
            {l:'Consorcios',h:'/consorcios'},
            {l:es?'Grandes Generadores':'Large Generators',h:'/grandes-generadores'},
            {l:es?'Plantas y acopiadores':'Plants & collectors',h:'/operadores'},
            {l:'RAEE',h:'/raee'},
            {l:es?'Mapa':'Map',h:'/mapa'},
            {l:'Kits',h:'/kits'},
            {l:es?'Inversores':'Investors',h:'/institucional'},
          ].map(n=>(
            <a key={n.h} href={n.h} style={{fontSize:11,color:sub,textDecoration:'none',fontWeight:600}}>{n.l}</a>
          ))}
        </div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',maxWidth:600,margin:'0 auto 16px'}}>
          {[
            {l:'Whitepaper',h:'/whitepaper'},
            {l:'One Pager',h:'/onepager'},
            {l:'Pitch',h:'/pitch'},
            {l:es?'Equipo':'Team',h:'/equipo'},
            {l:es?'Alianzas':'Partners',h:'/alianzas'},
            {l:'NDA',h:'/nda'},
          ].map(n=>(
            <a key={n.h} href={n.h} style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.75}}>{n.l}</a>
          ))}
        </div>
        <div style={{fontSize:11,color:sub,marginBottom:10}}>hola@oliviacirculab.com.ar</div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:10}}>
          <a href="/terminos" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>{es?'Términos':'Terms'}</a>
          <a href="/privacidad" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>{es?'Privacidad':'Privacy'}</a>
          <a href="https://www.linkedin.com/company/113160128/" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>LinkedIn</a>
        </div>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',letterSpacing:'0.05em',opacity:0.7}}>© 2026 Circulab Tech · Buenos Aires, Argentina</div>
      </footer>

      {/* POPUP ENCUESTA — 30 segundos después de cerrar el modal */}
      {popup&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:20,backdropFilter:'blur(8px)'}}>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'28px 24px',maxWidth:380,width:'100%',textAlign:'center',position:'relative'}}>
            <button onClick={()=>setPopup(false)} style={{position:'absolute',top:12,right:16,background:'transparent',border:'none',color:'#64748b',fontSize:22,cursor:'pointer',lineHeight:1}}>×</button>
            <div style={{fontSize:36,marginBottom:10}}>🌿</div>
            <div style={{fontSize:17,fontWeight:900,color:'#f1f5f9',marginBottom:6}}>{es?'¿Reciclás?':'Do you recycle?'}</div>
            <div style={{fontSize:12,color:'#64748b',marginBottom:16,lineHeight:1.6}}>
              {es?'Contanos cómo manejás tus residuos. Tu respuesta construye OLIVIA para toda la comunidad.':'Tell us how you manage your waste. Your answer builds OLIVIA for the whole community.'}
            </div>
            <div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:16,flexWrap:'wrap'}}>
              {[es?'🌿 Sin juicio':'🌿 No judgment',es?'⏱️ 2 minutos':'⏱️ 2 minutes',es?'🔒 Anónima':'🔒 Anonymous'].map(tag=>(
                <span key={tag} style={{fontSize:10,color:'#64748b',background:'rgba(255,255,255,0.04)',padding:'3px 10px',borderRadius:20}}>{tag}</span>
              ))}
            </div>
            <a href="/encuesta" style={{display:'block',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'13px 24px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',marginBottom:10}}>
              {es?'Responder encuesta →':'Take the survey →'}
            </a>
            <button onClick={()=>setPopup(false)} style={{background:'transparent',border:'none',color:'#64748b',fontSize:12,cursor:'pointer',textDecoration:'underline'}}>
              {es?'Ahora no':'Not now'}
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
