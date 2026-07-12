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
      ?`El negocio del enterramiento factura millones. Vos no ves un peso. OLIVIA lo cambia 🌿 ${url}`
      :`The landfill business earns millions. You see nothing. OLIVIA changes that 🌿 ${url}`
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
    ctx.fillText(es?'6.000 toneladas':'6,000 tons', 540, 380)
    ctx.fillStyle = '#f1f5f9'; ctx.font = 'bold 58px system-ui'
    ctx.fillText(es?'por día van al relleno.':'per day go to landfill.', 540, 480)
    ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 54px system-ui'
    ctx.fillText(es?'¿Y si eso cambiara?':'What if that changed?', 540, 600)
    ctx.fillStyle = '#94a3b8'; ctx.font = '44px system-ui'
    ctx.fillText(es?'En las ciudades que funcionan,':'In cities that work,', 540, 900)
    ctx.fillText(es?'el vecino cobra por reciclar.':'citizens get paid to recycle.', 540, 960)
    ctx.fillStyle = '#22c55e'; ctx.font = 'bold 52px system-ui'
    ctx.fillText('OLIVIA lo hace en LATAM.', 540, 1060)
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
    ctx.fillText(es?'Tu residuo vale dinero real':'Your waste is worth real money', 540, 1720)
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

  const TRAMOS = [
    {icon:'🌱',t:es?'SEMILLA · 2026':'SEED · 2026',d:es?'ACTIVA · OLV sin valor monetario · Construís historial · Los que empiezan hoy cobran primero en Árbol':'ACTIVE · OLV no monetary value · Build history · Early starters earn first in Árbol',c:'#22c55e',activo:true},
    {icon:'🌿',t:es?'BROTE · Q4 2026':'SPROUT · Q4 2026',d:es?'OLV canjeables · Salud, transporte, apps y créditos de IA · Convenios con partners':'OLV redeemable · Health, transport, apps and AI credits · Partner deals',c:'#3b82f6',activo:false},
    {icon:'🌳',t:es?'ÁRBOL · 2027 💰':'TREE · 2027 💰',d:es?'Si Verra VCS certifica · Valor neto por kg al ciudadano · OLIVIA no paga — el mercado sí · 6.329 OLV = USD 1 · ✅ Verra validó el método dMRV en Feb 2026 — el camino técnico está abierto':'If Verra VCS certifies · Net value per kg to citizen · 6.329 OLV = USD 1 · ✅ Verra validated the dMRV method in Feb 2026',c:'#f59e0b',activo:false},
    {icon:'🌲',t:es?'BOSQUE · 2028':'FOREST · 2028',d:es?'Art. 6.4 París · 2.198 OLV = USD 1 · Corredor AR MX CO BR CH DO':'Art. 6.4 Paris · 2.198 OLV = USD 1 · AR MX CO BR CH DO corridor',c:'#a855f7',activo:false},
    {icon:'🏔️',t:es?'SELVA · 2029':'JUNGLE · 2029',d:es?'OLIVIA Ocean + Waters + Space · 1.429 OLV = USD 1':'OLIVIA Ocean + Waters + Space · 1.429 OLV = USD 1',c:'#ec4899',activo:false},
    {icon:'🌊',t:es?'SUMIDERO · 2030+':'SINK · 2030+',d:es?'Net positive verificado · 952 OLV = USD 1 · Infraestructura climática global':'Verified net positive · 952 OLV = USD 1 · Global climate infrastructure',c:'#06b6d4',activo:false},
  ]

  const OLV_TRAMOS = [
    {tramo:'🌱 Semilla',año:'2026',olv:es?'Sin valor · acumulás':'No value · accumulate',c:'#22c55e'},
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

      <div style={{maxWidth:640,margin:'0 auto',padding:'0 16px'}}>

        {/* HERO */}
        <section style={{padding:'24px 0 16px'}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
            <span style={{fontSize:10,fontWeight:700,border:'1px solid #22c55e',color:'#22c55e',padding:'3px 10px',borderRadius:20}}>🌱 {es?'Tramo Semilla · 2026':'Seed Stage · 2026'}</span>
            <span style={{fontSize:10,fontWeight:700,border:'1px solid #3b82f6',color:'#3b82f6',padding:'3px 10px',borderRadius:20}}>{es?'Distrito Tecnológico · Buenos Aires':'Distrito Tecnológico · Buenos Aires'}</span>
          </div>
          <h1 style={{fontSize:36,fontWeight:900,lineHeight:1.15,marginBottom:12,letterSpacing:'-0.02em',textAlign:'center'}}>
            <span style={{color:text}}>{es?'Tu residuo vale.':'Your waste matters.'}</span><br/>
            <span style={{color:'#22c55e',fontStyle:'italic'}}>{es?'Tu árbol crece.':'Your tree grows.'}</span><br/>
            <span style={{color:text}}>{es?'Tu dinero llega.':'Your money arrives.'}</span>
          </h1>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:16}}>
            {es?'Cada kilo de residuo verificado con IA genera OLV Verdes que en 2027 se convierten en créditos de carbono certificados y dinero real en tu cuenta.':'Each AI-verified kilo of waste generates Green OLV that in 2027 become certified carbon credits and real money in your account.'}
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
              <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{es?'Solo de residuos verificados con IA. Estos certifica Verra. Estos paga el mercado de carbono en 2027.':'Only from AI-verified waste. Verra certifies these. The carbon market pays these in 2027.'}</div>
            </div>
            <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:20,marginBottom:8}}>⭐</div>
              <div style={{fontSize:13,fontWeight:700,color:'#f59e0b',marginBottom:6}}>{es?'OLV Bonus':'Bonus OLV'}</div>
              <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{es?'Por registrarte, referir amigos, publicar y dar likes. Canjeables por servicios en Brote. No se certifican con Verra.':'For registering, referring friends, posting and liking. Redeemable for services in Brote. Not Verra certifiable.'}</div>
            </div>
          </div>
        </section>

        {/* ¿CUÁNTO GANÁS Y CUÁNDO? */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'¿Cuánto ganás y cuándo cobrás?':'How much do you earn and when?'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16,lineHeight:1.6}}>
            {es?'Depende de cómo participás. Todos empiezan en Semilla.':'Depends on how you participate. Everyone starts in Semilla.'}
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
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                  <div style={{textAlign:'center',background:'rgba(255,255,255,0.03)',borderRadius:8,padding:'8px 4px'}}>
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

          {/* Tabla OLV por tramo */}
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

          {/* Tu calendario */}
          <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:12,padding:'14px',marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:8}}>{es?'📅 Tu calendario de cobro':'📅 Your payment calendar'}</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {[
                {periodo:'HOY · Semilla 2026',desc:es?'Acumulás OLV Verdes gratis · construís historial':'Accumulate Green OLV free · build history',c:'#22c55e'},
                {periodo:'Q4 2026 · Brote',desc:es?'Canjeás OLV por servicios de partners':'Redeem OLV for partner services',c:'#3b82f6'},
                {periodo:'2027 · Árbol 💰',desc:es?'Primer pago en USD si Verra certifica':'First USD payment if Verra certifies',c:'#f59e0b'},
                {periodo:'2028 · Bosque 💰💰',desc:es?'El salto — Art. 6.4 París · hasta 3x más':'The leap — Art. 6.4 Paris · up to 3x more',c:'#a855f7'},
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
              {es?'Los que entran HOY en Semilla acumulan OLV cuando valen cero. Cuando llegue Árbol 2027 ya tienen 2 años de ventaja. No es especulación — cada OLV tiene un residuo real verificado con IA detrás.':'Those who enter NOW in Semilla accumulate OLV when worth zero. When Árbol 2027 arrives they have 2 years of advantage. Not speculation — each OLV has a real AI-verified waste behind it.'}
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{background:'rgba(245,158,11,0.04)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:'12px',marginBottom:16}}>
            <div style={{fontSize:10,color:sub,lineHeight:1.6,fontStyle:'italic'}}>
              {es?'⚠️ Los valores son estimados y dependen de: (1) la conducta responsable del ciudadano al registrar y entregar sus residuos, (2) las certificaciones que se obtengan con Verra VCS, Gold Standard, Climate Action Reserve, GS Textile Exchange y demás certificadoras por tipo de material, y (3) el precio real de venta de los créditos en el mercado voluntario (Verra VCS, Gold Standard), en el mercado regulado (Art. 6.4 del Acuerdo de París) y en los mercados corporativos ESG al momento de la liquidación. OLIVIA crea el sistema, lo valida, lo certifica y permite que todos lo utilicemos. El sistema es de todos. OLIVIA no paga — el mercado paga.':'⚠️ Values are estimates and depend on: (1) responsible citizen behavior when registering and delivering waste, (2) certifications obtained with Verra VCS, Gold Standard, Climate Action Reserve, GS Textile Exchange and other certifiers per material type, and (3) the real sale price of credits in the voluntary market (Verra VCS, Gold Standard), regulated market (Paris Agreement Art. 6.4) and ESG corporate markets at liquidation. OLIVIA creates, validates and certifies the system so everyone can use it. The system belongs to everyone. OLIVIA does not pay — the market pays.'}
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
              {es?'El negocio de enterrar tu basura factura millones. Vos no ves un peso.':'The business of burying your trash earns millions. You don\'t see a cent.'}
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
              {[
                {stat:'6.000t',desc:es?'residuos/día solo en CABA':'waste/day in CABA alone',c:'#ef4444'},
                {stat:'85%',desc:es?'va al relleno sin separar':'goes to landfill unsorted',c:'#ef4444'},
                {stat:'USD 0',desc:es?'capturado por el vecino':'captured by the citizen',c:'#f59e0b'},
                {stat:'USD 4.5B',desc:es?'de mercado sin tocar en LATAM':'untapped market in LATAM',c:'#22c55e'},
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
                {icon:'💰',l:es?'Vos cobrás':'You earn',s:'USD 2027'},
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
                {es?'💰 Los que entran hoy en Semilla cobran primero en Árbol — 2027':'💰 Those who enter today in Semilla earn first in Árbol — 2027'}
              </span>
            </div>
          </div>
        </section>

        {/* LOS 6 TRAMOS */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#22c55e',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Roadmap</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:16,color:text}}>{es?'Los 6 tramos del ecosistema':'The 6 ecosystem stages'}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {TRAMOS.map((tr,i)=>(
              <div key={i} style={{borderLeft:`4px solid ${tr.c}`,padding:'10px 14px',background:tr.activo?`${tr.c}0f`:card,borderRadius:'0 10px 10px 0',display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,fontWeight:700,color:tr.c,marginBottom:2}}>{tr.icon} {tr.t}</div>
                  <div style={{fontSize:10,color:sub,lineHeight:1.4}}>{tr.d}</div>
                </div>
                {tr.activo&&<span style={{fontSize:9,color:tr.c,background:`${tr.c}18`,padding:'3px 8px',borderRadius:10,fontWeight:700,flexShrink:0}}>{es?'Entrás acá':'Enter here'}</span>}
              </div>
            ))}
          </div>
        </section>


        {/* TODOS LOS RESIDUOS */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#3b82f6',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'Residuos':'Waste types'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'Todos los residuos generan valor':'All waste types generate value'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16}}>
            {es?'Valor neto por kg · Lo que vos recibís · Sin ecuaciones':'Net value per kg · What you receive · No equations'}
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
            {[
              {icon:'🌿',tipo:es?'Orgánico':'Organic',olv:'180 OLV/kg',arbol:'USD 0.028/kg',bosque:'USD 0.082/kg',bolsa:'Verra AMS-III.AJ + VMR0007',color:'#22c55e'},
              {icon:'♻️',tipo:es?'Plástico':'Plastic',olv:'150 OLV/kg',arbol:'USD 0.024/kg',bosque:'USD 0.068/kg',bolsa:'GS Solid Waste v1.0',color:'#3b82f6'},
              {icon:'🔩',tipo:es?'Metal':'Metal',olv:'800 OLV/kg',arbol:'USD 0.102/kg',bosque:'USD 0.296/kg',bolsa:'Verra AMS-III.AJ',color:'#ef4444'},
              {icon:'👕',tipo:es?'Textil':'Textile',olv:'550 OLV/kg',arbol:'USD 0.071/kg',bosque:'USD 0.205/kg',bolsa:'Sin metodología madura',color:'#ec4899'},
              {icon:'🛢️',tipo:es?'Aceite':'Oil',olv:'250 OLV/kg',arbol:'USD 0.035/kg',bosque:'USD 0.100/kg',bolsa:'Verra AMS-III.AK',color:'#f97316'},
              {icon:'📄',tipo:es?'Papel':'Paper',olv:'90 OLV/kg',arbol:'USD 0.013/kg',bosque:'USD 0.036/kg',bolsa:'Gold Standard',color:'#f59e0b'},
              {icon:'🍾',tipo:es?'Vidrio':'Glass',olv:'30 OLV/kg',arbol:'USD 0.005/kg',bosque:'USD 0.014/kg',bolsa:'Verra',color:'#a855f7'},
              {icon:'🍃',tipo:es?'Hojas/Ramas':'Leaves/Branches',olv:'210 OLV/kg',arbol:'USD 0.037/kg',bosque:'USD 0.107/kg',bolsa:'GS Solid Waste v1.0',color:'#22c55e'},
            ].map((r,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 14px',background:card,borderRadius:12,border:`1px solid ${r.color}22`}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:22}}>{r.icon}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:r.color}}>{r.tipo}</div>
                    <div style={{fontSize:9,color:sub}}>{r.bolsa} · {r.olv}</div>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:11,fontWeight:700,color:'#f59e0b'}}>🌳 {r.arbol}</div>
                  <div style={{fontSize:10,color:'#a855f7'}}>🌲 {r.bosque}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:10,padding:'10px 14px',textAlign:'center'}}>
            <span style={{fontSize:12,color:'#ef4444',fontWeight:700}}>
              🔩 {es?'El metal genera 44× más valor que el vidrio. Cuanto más separás — más OLV acumulás.':'Metal generates 44× more value than glass. The more you sort — the more OLV you accumulate.'}
            </span>
          </div>
        </section>

        {/* LOGÍSTICA */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#3b82f6',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'Logística':'Logistics'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'App de recolección con IA':'AI-powered collection app'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16}}>{es?'Rutas optimizadas · Transportes verdes · Doble crédito de carbono':'Optimized routes · Green transport · Double carbon credit'}</p>
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
                {icon:'💰',step:es?'Árbol 2027 · Primer pago real en USD':'Árbol 2027 · First real USD payment',detail:es?'Cuando Verra certifique, tus OLV Verdes acumulados se convierten en dinero real. Los que empezaron en Semilla cobran primero.':'When Verra certifies, your accumulated Green OLV convert to real money. Those who started in Semilla collect first.',color:'#22c55e'},
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
                {es?'⚠️ OLIVIA no paga — facilita la infraestructura para que el mercado de carbono pague. En Semilla 2026 los OLV no tienen valor monetario. El valor llega con la certificación Verra en 2027.':'⚠️ OLIVIA does not pay — it provides the infrastructure for the carbon market to pay. In Semilla 2026 OLV have no monetary value. Value arrives with Verra certification in 2027.'}
              </div>
            </div>
          </div>
          <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',textAlign:'center'}}>
            <div style={{fontSize:12,color:'#22c55e',fontWeight:700,marginBottom:4}}>🌿 {es?'Doble crédito de carbono':'Double carbon credit'}</div>
            <div style={{fontSize:11,color:sub,lineHeight:1.6}}>
              {es?'Un recolector en bicicleta genera créditos por el residuo Y por el CO2 evitado en el transporte. Metodología Verra AMS-III.C.':'A bicycle collector generates credits for the waste AND for CO2 avoided in transport. Verra AMS-III.C methodology.'}
            </div>
          </div>
        </section>

        {/* 9 TIPOS DE CLIENTE */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#a855f7',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'Clientes':'Clients'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'9 tipos de cliente':'9 customer types'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16}}>{es?'Desde el vecino hasta el municipio':'From individual citizen to municipality'}</p>

          {/* Consorcios destacados */}
          <div style={{background:'rgba(59,130,246,0.06)',border:'2px solid rgba(59,130,246,0.3)',borderRadius:14,padding:'16px',marginBottom:12}}>
            <div style={{fontSize:12,color:'#3b82f6',fontWeight:700,marginBottom:4}}>🏢 {es?'Consorcios — el cliente ancla':'Buildings — the anchor client'}</div>
            <div style={{fontSize:10,color:'#f59e0b',marginBottom:10,lineHeight:1.5}}>
              {es?'📊 Simulación de cuánto podría recibir tu consorcio desde Árbol 2027. OLIVIA no paga — el mercado de carbono sí.':'📊 Simulation of what your building could receive from Árbol 2027. OLIVIA does not pay — the carbon market does.'}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:10}}>
              {[
                {l:es?'Créditos de carbono':'Carbon credits',v:'USD 85/mes'},
                {l:es?'Ahorro recolección':'Collection savings',v:'USD 800/mes'},
                {l:es?'Venta materiales':'Materials sale',v:'USD 120/mes'},
                {l:es?'Abono orgánico':'Compost',v:'USD 45/mes'},
                {l:es?'Certificación RSE':'CSR badge',v:'USD 75/mes'},
              ].map((f,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:11}}>
                  <span style={{color:sub}}>{f.l}</span>
                  <span style={{color:'#3b82f6',fontWeight:700}}>{f.v}</span>
                </div>
              ))}
            </div>
            <div style={{borderTop:`1px solid ${border}`,paddingTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:12,color:sub}}>{es?'Total estimado (100 deptos)':'Estimated total (100 units)'}</span>
              <span style={{fontSize:20,fontWeight:900,color:'#3b82f6'}}>USD 1.125/mes</span>
            </div>
            <div style={{display:'flex',gap:10,marginTop:12}}>
              <a href="/simulador" style={{flex:1,background:'linear-gradient(135deg,#3b82f6,#2563eb)',color:'white',padding:'10px',borderRadius:10,fontSize:12,fontWeight:700,textDecoration:'none',textAlign:'center'}}>
                {es?'Calcular mi consorcio →':'Calculate my building →'}
              </a>
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {[
              {num:'01',tipo:es?'Ciudadano libre':'Individual citizen',desc:es?'Reciclás desde tu casa y acumulás OLV Verdes verificados con IA':'You recycle from home and accumulate AI-verified Green OLV',color:'#22c55e'},
              {num:'02',tipo:es?'Ciudadano Comunitario':'Community Citizen',desc:es?'Recolectás hojas, ramas y residuos verdes del espacio público de tu barrio':'You collect leaves, branches and green waste from your neighborhood public space',color:'#22c55e'},
              {num:'03',tipo:es?'Verdulería / Feria':'Market / Store',desc:es?'Alto volumen orgánico diario — registrás vos mismo desde la app':'High daily organic volume — you register yourself from the app',color:'#22c55e'},
              {num:'04',tipo:es?'Colegio / Institución':'School / Institution',desc:es?'Reciclaje educativo con impacto verificable para toda la comunidad escolar':'Educational recycling with verifiable impact for the entire school community',color:'#3b82f6'},
              {num:'05',tipo:es?'Consorcio / Edificio':'Building / Condo',desc:es?'El consorcio coordina a los vecinos y recibe ingresos adicionales desde Árbol 2027':'The building coordinates neighbors and receives additional income from Árbol 2027',color:'#3b82f6'},
              {num:'06',tipo:es?'Restaurante / Hotel':'Restaurant / Hotel',desc:es?'Alto volumen de orgánico y aceite — SaaS mensual + créditos de carbono verificados':'High volume of organic and oil — monthly SaaS + verified carbon credits',color:'#f59e0b'},
              {num:'07',tipo:es?'Casino / Comedor':'Casino / Canteen',desc:es?'Mayor volumen aún — contrato específico con reporting mensual de impacto':'Even higher volume — specific contract with monthly impact reporting',color:'#f59e0b'},
              {num:'08',tipo:es?'Empresa RSE':'CSR Company',desc:es?'Compra créditos para compensar su huella y activa a sus empleados como recicladores':'Buys credits to offset footprint and activates employees as recyclers',color:'#a855f7'},
              {num:'09',tipo:es?'Municipio':'Municipality',desc:es?'OLIVIA como infraestructura pública — vecinos reciclan y el municipio certifica su impacto':'OLIVIA as public infrastructure — citizens recycle and the municipality certifies its impact',color:'#a855f7'},
            ].map(c=>(
              <div key={c.num} style={{padding:'10px 14px',background:card,borderRadius:10,border:`1px solid ${c.color}22`,display:'flex',gap:10,alignItems:'flex-start'}}>
                <div style={{width:24,height:24,borderRadius:6,background:c.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white',flexShrink:0,marginTop:2}}>{c.num}</div>
                <div>
                  <div style={{fontSize:12,color:text,fontWeight:700,marginBottom:3}}>{c.tipo}</div>
                  <div style={{fontSize:11,color:sub,lineHeight:1.5}}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INCENTIVOS CRUZADOS */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#3b82f6',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'Ecosistema':'Ecosystem'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'Un sistema que se produce a sí mismo':'A system that produces itself'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16}}>{es?'Tus OLV conectan todas las verticales':'Your OLV connect all verticals'}</p>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              es?'🌿 Reciclás → OLV Verdes → pagás el transporte con los mismos OLV que ganaste':'🌿 Recycle → Green OLV → pay for transport with the same OLV you earned',
              es?'🌳 OLV para plantar árboles → el árbol genera REDD+ → parte vuelve a vos':'🌳 OLV to plant trees → tree generates REDD+ → part returns to you',
              es?'👥 OLV sube tu PULSO → mejor PULSO → mejor tasa en AOM → más capital hoy':'👥 OLV raises your PULSO → better PULSO → better AOM rate → more capital today',
              es?'🏥 Canjeás OLV por salud → clínica acumula OLV → los convierte en USD 2027':'🏥 Redeem OLV for health → clinic accumulates OLV → converts to USD 2027',
              es?'🤖 Reciclás más → canjeás OLV por créditos de IA (Claude, Gemini, etc)':'🤖 Recycle more → redeem OLV for AI credits (Claude, Gemini, etc)',
            ].map((inc,i)=>(
              <div key={i} style={{background:card,border:`1px solid ${border}`,borderRadius:10,padding:'10px 14px',fontSize:11,color:sub,lineHeight:1.6}}>{inc}</div>
            ))}
          </div>
        </section>

        {/* TRES VERTICALES */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#a855f7',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'Verticales':'Verticals'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:16,color:text}}>{es?'Tres verticales · Un ecosistema':'Three verticals · One ecosystem'}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {img:'/ciudadano/metamorfosis.jpg',nombre:'OLIVIA Circulab',desc:es?'Residuos → compost → reforestación → créditos de carbono → dinero real':'Waste → compost → reforestation → carbon credits → real money',color:'#22c55e',href:'/registro'},
              {img:'/ciudadano/pulso.jpg',nombre:'Quincena · PULSO',desc:es?'Roscas digitales → score crediticio → acceso al crédito formal · AR MX CO BR CH DO · Más OLV = mejor PULSO':'Digital savings circles → credit score → formal credit · AR MX CO BR CH DO · More OLV = better PULSO',color:'#3b82f6',href:'/quincena'},
              {img:'/ciudadano/aom.jpg',nombre:'Art of Money',desc:es?'Regalías musicales y deportivas → capital hoy · Más OLV → más puertas si sos creador':'Music and sports royalties → capital today · More OLV → more doors if you\'re a creator',color:'#a855f7',href:'/aom'},
            ].map(v=>(
              <div key={v.nombre} style={{background:card,border:`1px solid ${border}`,borderRadius:14,overflow:'hidden',display:'flex',gap:0}}>
                <img src={v.img} alt={v.nombre} style={{width:90,objectFit:'cover',filter:'grayscale(100%)',flexShrink:0}}
                  onMouseEnter={e=>(e.currentTarget.style.filter='grayscale(0%)')}
                  onMouseLeave={e=>(e.currentTarget.style.filter='grayscale(100%)')} />
                <div style={{padding:'14px',flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:v.color,marginBottom:4}}>{v.nombre}</div>
                  <div style={{fontSize:11,color:sub,lineHeight:1.5,marginBottom:8}}>{v.desc}</div>
                  <a href={v.href} style={{fontSize:11,color:v.color,fontWeight:700,textDecoration:'none'}}>{es?'Explorar →':'Explore →'}</a>
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

        {/* COMPARTIR */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'Compartí OLIVIA':'Share OLIVIA'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16}}>{es?'⭐ +50 OLV Bonus por cada amigo que se registre':'⭐ +50 Bonus OLV for each friend who registers'}</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <a href={`https://wa.me/?text=${encodeURIComponent(es?'Mirá esto — tu basura vale dinero real 🌿 https://oliviacirculab.com.ar/ciudadano':'Check this out — your trash is worth real money 🌿 https://oliviacirculab.com.ar/ciudadano')}`}
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
      <footer style={{padding:'20px 16px',borderTop:`1px solid ${border}`,textAlign:'center',marginTop:8}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:8}}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:48,height:48,objectFit:'contain',opacity:0.7}} />
        </div>
        <div style={{fontSize:10,color:sub,marginBottom:4}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{fontSize:10,color:sub,marginBottom:10}}>© 2026 Circulab Tech · Distrito Tecnológico · Buenos Aires</div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          {[
            {l:'Whitepaper',h:'/whitepaper',c:'#3b82f6'},
            {l:'One Pager',h:'/onepager',c:'#f59e0b'},
            {l:'Pitch',h:'/pitch',c:'#a855f7'},
            {l:'Alianzas',h:'/alianzas',c:'#22c55e'},
            {l:'Privacidad',h:'/privacidad',c:sub},
            {l:'Términos',h:'/terminos',c:sub},
            {l:'Contacto',h:'mailto:hola@oliviacirculab.com.ar',c:'#22c55e'},
          ].map(n=>(
            <a key={n.l} href={n.h} style={{fontSize:11,color:n.c,textDecoration:'none',fontWeight:600}}>{n.l}</a>
          ))}
        </div>
        <div style={{fontSize:10,color:sub,marginTop:8}}>hola@oliviacirculab.com.ar</div>
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
