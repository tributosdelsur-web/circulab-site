'use client'
import { useState } from 'react'

export default function Equipo() {
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState<'es'|'en'>('es')
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#64748b' : '#6b7280'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const accent = '#22c55e'

  const FOUNDERS = [
    {
      foto: '/founders/founder-jp.jpg',
      nombre: 'Juan Pablo Sanguinetti de Zapata',
      rol: 'CEO & Founder · Circulab Tech',
      color: '#22c55e',
      linkedin: 'https://linkedin.com/in/juanpablosanguinetti',
      bio: es
        ? 'Director de teatro y cineasta chileno-argentino. Abogado con especialización en derecho ambiental, tributario y propiedad intelectual. Consultor CEPAL en materias ambientales. Product builder con IA. Formado en la Escuela Internacional del Gesto y la Imagen La Mancha (Jacques Lecoq) y en Teatro La Memoria con Alfredo Castro. Investigador de la biología cultural de Humberto Maturana. Arquitecto del ecosistema Circulab.'
        : 'Chilean-Argentine theater director and filmmaker. Lawyer specializing in environmental, tax and intellectual property law. CEPAL consultant on environmental matters. AI product builder. Trained at the International School of Gesture and Image La Mancha (Jacques Lecoq) and at Teatro La Memoria with Alfredo Castro. Researcher of Humberto Maturana cultural biology. Architect of the Circulab ecosystem.',
      skills: es
        ? ['Derecho ambiental', 'Estrategia de producto', 'IA aplicada', 'Economía circular', 'Mercados de carbono']
        : ['Environmental law', 'Product strategy', 'Applied AI', 'Circular economy', 'Carbon markets'],
    },
    {
      foto: '/founders/founder-mileidy.jpg',
      nombre: 'Mileidy Zapata de Sanguinetti',
      rol: 'COO & Co-founder · Circulab Tech',
      color: '#3b82f6',
      linkedin: 'https://linkedin.com/in/mileidyzapata',
      bio: es
        ? 'Emprendedora dominicana con profundo arraigo en la economía del cuidado y la comunidad. Madre, bailarina y coreógrafa. Especialista en branding estratégico y construcción de comunidades. Su visión de las redes de confianza entre vecinos y el valor de los activos informales es el corazón humano de OLIVIA. Coordinadora de operaciones y alianzas estratégicas de Circulab Tech.'
        : 'Dominican entrepreneur with deep roots in the care economy and community. Mother, dancer and choreographer. Specialist in strategic branding and community building. Her vision of neighbor trust networks and the value of informal assets is the human heart of OLIVIA. Operations and strategic alliances coordinator at Circulab Tech.',
      skills: es
        ? ['Economía del cuidado', 'Branding estratégico', 'Comunidad', 'Operaciones', 'Alianzas']
        : ['Care economy', 'Strategic branding', 'Community', 'Operations', 'Alliances'],
    },
  ]

  const ADVISORS = [
    {
      nombre: es ? 'CTO · Primer contratado' : 'CTO · First hire',
      desc: es
        ? 'Buscamos un CTO con experiencia en blockchain, smart contracts y mercados de carbono. Es el primer uso del capital Seed. Si querés postular: hola@oliviacirculab.com.ar'
        : 'We are looking for a CTO with experience in blockchain, smart contracts and carbon markets. This is the first use of Seed capital. To apply: hola@oliviacirculab.com.ar',
      color: '#f59e0b',
      open: true,
    },
    {
      nombre: es ? 'Asesor Verra / Carbon Markets' : 'Verra / Carbon Markets Advisor',
      desc: es
        ? 'Buscamos un asesor con trayectoria en certificación Verra VCS y mercados voluntarios de carbono en LATAM. Equity o fee por proyecto.'
        : 'Looking for an advisor with Verra VCS certification and voluntary carbon markets experience in LATAM. Equity or project fee.',
      color: '#a855f7',
      open: true,
    },
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'Inter,system-ui',transition:'all 0.3s'}}>

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:dark?'rgba(10,14,26,0.95)':'rgba(247,245,241,0.95)',borderBottom:'1px solid ' + border,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <span style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.05em'}}>Circulab Tech</span>
        </a>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <button onClick={()=>setLang(es?'en':'es')} style={{border:'1px solid ' + border,borderRadius:20,padding:'5px 12px',fontSize:10,fontWeight:700,cursor:'pointer',background:'transparent',color:text,fontFamily:'monospace'}}>
            {es?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)} style={{border:'1px solid ' + border,borderRadius:20,padding:'5px 9px',fontSize:12,cursor:'pointer',background:'transparent',color:text}}>
            {dark?'☀️':'🌙'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:'60px 24px',maxWidth:800,margin:'0 auto',textAlign:'center'}}>
        <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>[ {es?'El equipo':'The team'} ]</div>
        <h1 style={{fontSize:40,fontWeight:900,lineHeight:1.1,marginBottom:16}}>
          {es?'Construido en una cocina.':'Built in a kitchen.'}
          <br/>
          <span style={{color:accent}}>{es?'USD 0 de inversión externa.':'USD 0 external investment.'}</span>
        </h1>
        <p style={{fontSize:15,color:sub,lineHeight:1.7,maxWidth:560,margin:'0 auto'}}>
          {es
            ? 'OLIVIA Circulab fue construida por dos personas con IA como equipo de desarrollo. Sin CTO externo. Sin capital externo. Lo que ves funciona porque dos fundadores decidieron que el planeta no podía esperar.'
            : 'OLIVIA Circulab was built by two people with AI as the development team. No external CTO. No external capital. What you see works because two founders decided the planet could not wait.'}
        </p>
      </section>

      {/* FOUNDERS */}
      <section style={{padding:'0 24px 64px',maxWidth:800,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
          {FOUNDERS.map((f,i)=>(
            <div key={i} style={{background:card,border:'2px solid ' + f.color + '33',borderRadius:20,overflow:'hidden'}}>
              <div style={{height:180,background:'linear-gradient(135deg,' + f.color + '15,' + f.color + '05)',display:'flex',alignItems:'center',justifyContent:'center',borderBottom:'1px solid ' + border}}>
                <img
                  src={f.foto}
                  alt={f.nombre}
                  style={{width:100,height:100,borderRadius:'50%',objectFit:'cover',border:'3px solid ' + f.color}}
                  onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}}
                />
              </div>
              <div style={{padding:'20px'}}>
                <div style={{fontSize:14,fontWeight:900,color:f.color,marginBottom:4}}>{f.nombre}</div>
                <div style={{fontSize:10,color:sub,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}}>{f.rol}</div>
                <p style={{fontSize:11,color:sub,lineHeight:1.7,marginBottom:14}}>{f.bio}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
                  {f.skills.map((s,j)=>(
                    <span key={j} style={{fontSize:9,color:f.color,background:f.color+'11',border:'1px solid ' + f.color + '33',borderRadius:20,padding:'3px 8px',fontWeight:700,letterSpacing:'0.04em'}}>{s}</span>
                  ))}
                </div>
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:f.color,textDecoration:'none',fontWeight:700}}>
                  LinkedIn →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POSICIONES ABIERTAS */}
      <section style={{padding:'48px 24px',background:dark?'rgba(245,158,11,0.04)':'rgba(245,158,11,0.02)',borderTop:'1px solid rgba(245,158,11,0.1)'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#f59e0b',marginBottom:12,textAlign:'center'}}>[ {es?'Posiciones abiertas':'Open positions'} ]</div>
          <h2 style={{fontSize:24,fontWeight:900,textAlign:'center',marginBottom:8}}>
            {es?'Únete al equipo':'Join the team'}
          </h2>
          <p style={{fontSize:13,color:sub,textAlign:'center',marginBottom:32,maxWidth:500,margin:'0 auto 32px'}}>
            {es
              ? 'El capital Seed va principalmente a contratar el primer CTO y el asesor Verra. Si tenés la experiencia y te apasiona la economía circular, escribinos.'
              : 'Seed capital goes primarily to hiring the first CTO and Verra advisor. If you have the experience and are passionate about circular economy, write to us.'}
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
            {ADVISORS.map((a,i)=>(
              <div key={i} style={{background:card,border:'2px dashed ' + a.color + '44',borderRadius:16,padding:'20px'}}>
                <div style={{fontSize:9,fontWeight:700,color:a.color,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>
                  {es?'🔍 Buscamos':'🔍 Looking for'}
                </div>
                <div style={{fontSize:14,fontWeight:700,color:a.color,marginBottom:10}}>{a.nombre}</div>
                <p style={{fontSize:11,color:sub,lineHeight:1.7,marginBottom:16}}>{a.desc}</p>
                <a href={"mailto:hola@oliviacirculab.com.ar?subject=Postulacion " + a.nombre} style={{fontSize:11,color:a.color,fontWeight:700,textDecoration:'none'}}>
                  Contactar → hola@oliviacirculab.com.ar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ NOSOTROS */}
      <section style={{padding:'48px 24px'}}>
        <div style={{maxWidth:700,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>[ {es?'Por qué este equipo':'Why this team'} ]</div>
          <h2 style={{fontSize:24,fontWeight:900,marginBottom:24}}>
            {es?'Lo que no se ve en el CV':'What the CV does not show'}
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,textAlign:'left'}}>
            {(es?[
              {icon:'🎭',titulo:'Narrativa que convierte',desc:'Un director de teatro y una coreógrafa saben que la gente no cambia de comportamiento por datos — cambia por historias. OLIVIA está diseñada desde esa convicción.'},
              {icon:'⚖️',titulo:'Derecho ambiental real',desc:'No es un pitch con jerga legal. JP tiene especialización en derecho ambiental, tributario y propiedad intelectual. Los contratos de mandato y los T&C los escribimos nosotros.'},
              {icon:'🤖',titulo:'IA como equipo de desarrollo',desc:'OLIVIA fue construida usando Claude, Gemini y Perplexity como co-desarrolladores. Lo que normalmente cuesta USD 500K en salarios, lo hicimos con USD 0.'},
              {icon:'🌱',titulo:'Piel en el juego',desc:'Ninguno de los dos cobró un peso mientras construíamos esto. Los primeros salarios llegan con la inversión Seed. Eso es lo que significa creer en el proyecto.'},
            ]:[
              {icon:'🎭',titulo:'Narrative that converts',desc:'A theater director and a choreographer know that people do not change behavior through data — they change through stories. OLIVIA is designed from that conviction.'},
              {icon:'⚖️',titulo:'Real environmental law',desc:'Not a pitch with legal jargon. JP has specializations in environmental, tax and intellectual property law. We wrote the mandate contracts and T&C ourselves.'},
              {icon:'🤖',titulo:'AI as development team',desc:'OLIVIA was built using Claude, Gemini and Perplexity as co-developers. What normally costs USD 500K in salaries, we did with USD 0.'},
              {icon:'🌱',titulo:'Skin in the game',desc:'Neither of us received a peso while building this. First salaries come with Seed investment. That is what believing in the project means.'},
            ]).map((item,i)=>(
              <div key={i} style={{background:card,border:'1px solid ' + border,borderRadius:14,padding:'16px'}}>
                <div style={{fontSize:24,marginBottom:8}}>{item.icon}</div>
                <div style={{fontSize:12,fontWeight:700,color:accent,marginBottom:6}}>{item.titulo}</div>
                <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'48px 24px',textAlign:'center',borderTop:'1px solid ' + border}}>
        <a href="mailto:hola@oliviacirculab.com.ar?subject=Reunión OLIVIA Circulab" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'14px 32px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>
          {es?'Agendar una llamada':'Schedule a call'}
        </a>
        <div style={{fontSize:11,color:sub}}>hola@oliviacirculab.com.ar</div>
      </section>

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
            {l:es?'Grandes Emisores':'Large Emitters',h:'/grandes-emisores'},
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
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',letterSpacing:'0.05em',opacity:0.7}}>© 2026 Circulab Tech · Distrito Tecnológico · Buenos Aires · Ley 27.506</div>
      </footer>

    </div>
  )
}
