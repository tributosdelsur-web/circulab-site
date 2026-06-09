'use client'
import { useState, useEffect } from 'react'

export default function Ciudadano() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [tema, setTema] = useState<'light'|'dark'|'color'>('dark')
  const [popup, setPopup] = useState(false)

  const bg = tema==='dark'?'#0a0e1a':tema==='color'?'#f4ece1':'#faf7f2'
  const text = tema==='dark'?'#f1f5f9':tema==='color'?'#2c3e50':'#0d0d0d'
  const accent = tema==='dark'?'#22c55e':tema==='color'?'#d35400':'#1e5c3a'
  const card = tema==='dark'?'#111827':tema==='color'?'#fdfaf6':'#ffffff'
  const border = tema==='dark'?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.07)'
  const sub = tema==='dark'?'#94a3b8':'#64748b'

  const es = lang==='es'

  useEffect(()=>{
    const timer = setTimeout(()=>setPopup(true), 8000)
    return ()=>clearTimeout(timer)
  },[])

  function generarStory() {
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1920
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#0a1a0a'
    ctx.fillRect(0,0,1080,1920)
    ctx.fillStyle = '#22c55e'
    ctx.font = 'bold 80px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('OLIVIA Circulab', 540, 400)
    ctx.fillStyle = '#f1f5f9'
    ctx.font = '60px system-ui'
    ctx.fillText(es?'Tu residuo vale':'Your waste matters', 540, 560)
    ctx.fillText(es?'dinero real 💰':'real money 💰', 540, 640)
    ctx.fillStyle = '#22c55e'
    ctx.font = 'bold 120px system-ui'
    ctx.fillText('🌿', 540, 900)
    ctx.fillStyle = '#94a3b8'
    ctx.font = '50px system-ui'
    ctx.fillText('circulab-site.vercel.app', 540, 1600)
    canvas.toBlob(blob=>{
      const url = URL.createObjectURL(blob!)
      const a = document.createElement('a')
      a.href = url
      a.download = 'olivia-story.png'
      a.click()
    })
  }

  const TRAMOS = [
    {icon:'🌱',t:es?'SEMILLA · 2026':'SEED · 2026',d:es?'Registrás residuos · Acumulás OLV · Construís historial · Los que empiezan hoy cobran más':'Register waste · Accumulate OLV · Build history · Early starters earn more',c:'#22c55e',activo:true},
    {icon:'🌿',t:es?'BROTE · Q4 2026':'SPROUT · Q4 2026',d:es?'OLV canjeables · Salud, transporte, apps y créditos de IA':'OLV redeemable · Health, transport, apps and AI credits',c:'#3b82f6',activo:false},
    {icon:'🌳',t:es?'ÁRBOL · 2027 💰':'TREE · 2027 💰',d:es?'Primer pago real USD · Verra VCS · Reforestación REDD+ con biomasa OLIVIA':'First real USD payment · Verra VCS · REDD+ reforestation with OLIVIA biomass',c:'#f59e0b',activo:false},
    {icon:'🌲',t:es?'BOSQUE · 2028':'FOREST · 2028',d:es?'Art. 6.4 París · USD 90/t · Corredor AR MX CO BR CH DO':'Art. 6.4 Paris · USD 90/t · AR MX CO BR CH DO corridor',c:'#a855f7',activo:false},
    {icon:'🏔️',t:es?'SELVA · 2029':'JUNGLE · 2029',d:es?'OLIVIA Ocean + Waters + Space · PULSO estándar LATAM':'OLIVIA Ocean + Waters + Space · PULSO LATAM standard',c:'#ec4899',activo:false},
    {icon:'🌊',t:es?'SUMIDERO · 2030+':'SINK · 2030+',d:es?'Net positive verificado · El sistema absorbe más CO2 del que genera':'Verified net positive · System absorbs more CO2 than it generates',c:'#06b6d4',activo:false},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.3s',overflowX:'hidden'}}>

      {/* NAV */}
      <nav style={{padding:'10px 16px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:bg,position:'sticky',top:0,zIndex:100,backdropFilter:'blur(10px)'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white',flexShrink:0}}>O</div>
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

        {/* HERO — VIDEO PROMINENTE */}
        <section style={{padding:'24px 0 16px'}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
            <span style={{fontSize:10,fontWeight:700,border:'1px solid #22c55e',color:'#22c55e',padding:'3px 10px',borderRadius:20}}>🌱 {es?'Tramo Semilla · 2026':'Seed Stage · 2026'}</span>
            <span style={{fontSize:10,fontWeight:700,border:'1px solid #3b82f6',color:'#3b82f6',padding:'3px 10px',borderRadius:20}}>{es?'Distrito IA · Buenos Aires':'AI District · Buenos Aires'}</span>
          </div>

          <h1 style={{fontSize:28,fontWeight:900,lineHeight:1.15,marginBottom:12,letterSpacing:'-0.02em'}}>
            <span style={{color:text}}>{es?'Tu residuo vale.':'Your waste matters.'}</span><br/>
            <span style={{color:'#22c55e',fontStyle:'italic'}}>{es?'Tu árbol crece.':'Your tree grows.'}</span><br/>
            <span style={{color:text}}>{es?'Tu dinero llega.':'Your money arrives.'}</span>
          </h1>

          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:16}}>
            {es?'Cada kilo de residuo verificado con IA genera tokens OLV que en 2027 se convierten en créditos de carbono certificados y dinero real en tu cuenta.':'Each AI-verified kilo of waste generates OLV tokens that in 2027 become certified carbon credits and real money in your account.'}
          </p>

          {/* VIDEO */}
          <div style={{borderRadius:14,overflow:'hidden',border:`1px solid ${border}`,marginBottom:16,background:'#000'}}>
            <video controls style={{width:'100%',display:'block'}} preload="metadata" poster="">
              <source src="/ciudadano/CIRCULAB1.mp4" type="video/mp4" />
            </video>
          </div>

          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <a href="/registro" style={{flex:1,background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'13px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',textAlign:'center',boxShadow:'0 0 20px rgba(34,197,94,0.3)'}}>
              {es?'📷 Registrar Mi Residuo →':'📷 Register My Waste →'}
            </a>
            <a href="/simulador" style={{background:card,border:`1px solid ${border}`,color:text,padding:'13px 16px',borderRadius:10,fontSize:12,fontWeight:600,textDecoration:'none',textAlign:'center'}}>
              {es?'Simulador':'Simulator'}
            </a>
          </div>
        </section>

        {/* EL PROBLEMA — EL ENTERRAMIENTO */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:14,padding:'20px'}}>
            <div style={{fontSize:11,color:'#ef4444',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>
              {es?'El problema':'The problem'}
            </div>
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
            <p style={{fontSize:12,color:sub,lineHeight:1.7,fontStyle:'italic'}}>
              {es?'"Te enseñaron a mezclar todo para que el sistema facture por peso enterrado. OLIVIA rompe ese ciclo — y te da tu parte."':'"They taught you to mix everything so the system earns by buried weight. OLIVIA breaks that cycle — and gives you your share."'}
            </p>
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
            <div style={{fontSize:12,color:sub,textAlign:'center',marginBottom:16}}>
              {es?'Un sistema que se alimenta a sí mismo haciendo el bien — como en la naturaleza, nada se pierde.':'A system that feeds itself by doing good — like in nature, nothing is lost.'}
            </div>

            {/* CICLO */}
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
                {es?'💰 Los que entran hoy en Semilla cobran primero en Árbol — 2027':'💰 Those who enter today in Seed earn first in Tree — 2027'}
              </span>
            </div>
          </div>
        </section>

        {/* LOS 6 TRAMOS */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#22c55e',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Roadmap</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'Los 6 tramos del ecosistema':'The 6 ecosystem stages'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16,lineHeight:1.6}}>
            {es?'Como un árbol — de semilla a selva. Los que entran hoy cobran primero.':'Like a tree — from seed to jungle. Those who enter today earn first.'}
          </p>
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

        {/* INCENTIVOS CRUZADOS */}
        <section style={{padding:'24px 0',borderTop:`1px solid ${border}`}}>
          <div style={{fontSize:11,color:'#3b82f6',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>{es?'Ecosistema':'Ecosystem'}</div>
          <h2 style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>{es?'Un sistema que se produce a sí mismo':'A system that produces itself'}</h2>
          <p style={{fontSize:12,color:sub,marginBottom:16}}>{es?'Tus OLV conectan todas las verticales':'Your OLV tokens connect all verticals'}</p>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              es?'🌿 Reciclás → OLV → pagás el transporte con los mismos OLV que ganaste':'🌿 Recycle → OLV → pay for transport with the same OLV you earned',
              es?'🌳 OLV para plantar árboles → el árbol genera REDD+ → parte vuelve a vos':'🌳 OLV to plant trees → tree generates REDD+ → part returns to you',
              es?'👥 OLV sube tu PULSO → mejor PULSO → mejor tasa en AOM → más capital hoy':'👥 OLV raises your PULSO → better PULSO → better AOM rate → more capital today',
              es?'🏥 Canjeás OLV por salud → clínica acumula OLV → los convierte en USD 2027':'🏥 Redeem OLV for health → clinic accumulates OLV → converts to USD 2027',
              es?'🤖 Reciclás más → canjeás OLV por créditos de IA (Claude, Gemini, etc)':'🤖 Recycle more → redeem OLV for AI credits (Claude, Gemini, etc)',
            ].map((inc,i)=>(
              <div key={i} style={{background:card,border:`1px solid ${border}`,borderRadius:10,padding:'10px 14px',fontSize:11,color:sub,lineHeight:1.6}}>
                {inc}
              </div>
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
              {img:'/ciudadano/pulso.jpg',nombre:'Quincena · PULSO',desc:es?'Roscas digitales → score crediticio → acceso al crédito formal · AR MX CO BR CH DO':'Digital savings circles → credit score → formal credit · AR MX CO BR CH DO',color:'#3b82f6',href:'/quincena'},
              {img:'/ciudadano/aom.jpg',nombre:'Art of Money',desc:es?'Regalías musicales y deportivas → adelanto de capital hoy · Más OLV = mejor tasa':'Music and sports royalties → capital advance today · More OLV = better rate',color:'#a855f7',href:'/aom'},
            ].map(v=>(
              <div key={v.nombre} style={{background:card,border:`1px solid ${border}`,borderRadius:14,overflow:'hidden',display:'flex',gap:0}}>
                <img src={v.img} alt={v.nombre} style={{width:90,objectFit:'cover',filter:'grayscale(100%)',flexShrink:0}}
                  onMouseEnter={e=>(e.currentTarget.style.filter='grayscale(0%)')}
                  onMouseLeave={e=>(e.currentTarget.style.filter='grayscale(100%)')} />
                <div style={{padding:'14px',flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:v.color,marginBottom:4}}>{v.nombre}</div>
                  <div style={{fontSize:11,color:sub,lineHeight:1.5,marginBottom:8}}>{v.desc}</div>
                  <a href={v.href} style={{fontSize:11,color:v.color,fontWeight:700,textDecoration:'none'}}>
                    {es?'Explorar →':'Explore →'}
                  </a>
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
              {foto:'/founders/founder-jp.jpg',nombre:'Juan Pablo Sanguinetti de Zapata',rol:es?'CEO & Founder':'CEO & Founder',desc:es?'Director de teatro chileno y abogado. Product builder con IA. Arquitecto del ecosistema Circulab. Diseñó OLIVIA viviendo la fricción del reciclaje en su propia cocina.':'Chilean theater director and lawyer. AI product builder. Architect of the Circulab ecosystem. Designed OLIVIA living the friction of recycling in his own kitchen.',color:'#22c55e'},
              {foto:'/founders/founder-mileidy.jpg',nombre:'Mileidy Zapata de Sanguinetti',rol:es?'COO & Co-founder':'COO & Co-founder',desc:es?'Madre, bailarina y coreógrafa dominicana. Representante de la sabiduría ancestral y la economía del cuidado. Junto a OLIVIA y Santino Eloy, el piloto comenzó en casa.':'Mother, dancer and Dominican choreographer. Representative of ancestral wisdom and the care economy. Together with OLIVIA and Santino Eloy, the pilot started at home.',color:'#3b82f6'},
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
          <p style={{fontSize:12,color:sub,marginBottom:16}}>{es?'+200 OLV por cada amigo que se registre con tu código':'+200 OLV for each friend who registers with your code'}</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <a href={`https://wa.me/?text=${encodeURIComponent(es?'Mirá este video — tu basura vale dinero real 🌿 circulab-site.vercel.app/ciudadano':'Check this out — your trash is worth real money 🌿 circulab-site.vercel.app/ciudadano')}`}
              target="_blank"
              style={{display:'flex',alignItems:'center',gap:12,padding:'14px',borderRadius:12,background:'rgba(37,211,102,0.08)',border:'1px solid rgba(37,211,102,0.3)',textDecoration:'none'}}>
              <span style={{fontSize:22}}>💬</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#25d366'}}>WhatsApp</div>
                <div style={{fontSize:10,color:sub}}>{es?'Compartir con mensaje pregrabado':'Share with pre-written message'}</div>
              </div>
            </a>

            <button onClick={generarStory}
              style={{display:'flex',alignItems:'center',gap:12,padding:'14px',borderRadius:12,background:'rgba(131,58,180,0.08)',border:'1px solid rgba(131,58,180,0.3)',cursor:'pointer',textAlign:'left'}}>
              <span style={{fontSize:22}}>📸</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#833ab4'}}>{es?'Story Instagram':'Instagram Story'}</div>
                <div style={{fontSize:10,color:sub}}>{es?'Descargar imagen 1080×1920 lista para subir':'Download 1080×1920 image ready to post'}</div>
              </div>
            </button>

            <button onClick={()=>{
              const txt = es
                ?'Estoy reciclando con OLIVIA Circulab y ganando OLV reales 🌿 Uníte: circulab-site.vercel.app/ciudadano'
                :'I am recycling with OLIVIA Circulab and earning real OLV 🌿 Join: circulab-site.vercel.app/ciudadano'
              if(navigator.share){navigator.share({title:'OLIVIA Circulab',text:txt,url:'https://circulab-site.vercel.app/ciudadano'})}
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
        <div style={{fontSize:10,color:sub,marginBottom:10}}>© 2026 Circulab Tech · Distrito IA · Buenos Aires</div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          {[
            {l:'Whitepaper',h:'/whitepaper',c:'#3b82f6'},
            {l:'One Pager',h:'/onepager',c:'#f59e0b'},
            {l:'Pitch',h:'/pitch',c:'#a855f7'},
            {l:'Alianzas',h:'/alianzas',c:'#22c55e'},
            {l:'Privacidad',h:'/privacidad',c:sub},
          ].map(n=>(
            <a key={n.l} href={n.h} style={{fontSize:11,color:n.c,textDecoration:'none',fontWeight:600}}>{n.l}</a>
          ))}
        </div>
      </footer>

      {/* POPUP ENCUESTA */}
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
            <a href="/encuesta" style={{display:'block',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'13px 24px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',marginBottom:10,boxShadow:'0 0 20px rgba(34,197,94,0.25)'}}>
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
