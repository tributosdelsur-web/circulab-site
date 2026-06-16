// SCRIPT 18 — Verificar /terminos con cláusula 8 + página /equipo
const fs = require('fs');

// ═══ 1. Verificar y completar /terminos ═══
const terminosDir = 'app/terminos';
if (!fs.existsSync(terminosDir)) {
  fs.mkdirSync(terminosDir, { recursive: true });
}

const terminosPath = 'app/terminos/page.tsx';

// Si no existe, crear completo. Si existe, verificar que tiene cláusula 8
if (!fs.existsSync(terminosPath)) {
  const terminos = `'use client'
import { useState } from 'react'

export default function Terminos() {
  const [dark] = useState(true)
  const bg = '#0a0e1a'
  const text = '#f1f5f9'
  const sub = '#64748b'
  const card = '#111827'
  const border = 'rgba(255,255,255,0.06)'
  const accent = '#22c55e'

  const CLAUSULAS = [
    {
      num: '1',
      titulo: 'Aceptación de los términos',
      contenido: 'Al registrarte en la plataforma OLIVIA (oliviacirculab.com.ar), operada por Circulab Tech S.A.S. ("Circulab Tech"), aceptás en forma expresa y sin reservas estos Términos y Condiciones ("T&C"), incluyendo todas las cláusulas aquí contenidas, en particular la Cláusula 8 de Mandato de Certificación y Distribución. Si no estás de acuerdo con alguno de estos términos, no debés usar la plataforma.',
    },
    {
      num: '2',
      titulo: 'La plataforma OLIVIA y Metamorfosis',
      contenido: 'OLIVIA es la plataforma madre desarrollada por Circulab Tech. Metamorfosis es la primera vertical de Circulab Tech, dedicada a la verificación de residuos orgánicos con inteligencia artificial y la originación de créditos de carbono bajo protocolos internacionales. Al registrarte, accedés a la plataforma OLIVIA y al sistema Metamorfosis de verificación dMRV (Digital Monitoring, Reporting and Verification).',
    },
    {
      num: '3',
      titulo: 'Los tokens OLV',
      contenido: 'Los tokens OLV (Olivia Coins) son la unidad de valor interna de la plataforma OLIVIA. Existen dos tipos: (a) OLV Verdes: generados únicamente por residuos verificados con IA y GPS. Son los únicos certificables por Verra VCS y otros organismos internacionales. (b) OLV Bonus: generados por participación en la comunidad (registro, referidos, publicaciones, etc.). No son certificables por organismos externos. Los OLV no son criptomonedas ni valores mobiliarios. No tienen valor monetario garantizado en los tramos Semilla (2026) y Brote (Q4 2026). El valor monetario de los OLV Verdes se materializa únicamente cuando Circulab Tech obtenga la certificación formal de Verra VCS u otros organismos, lo cual se estima para el tramo Árbol 2027.',
    },
    {
      num: '4',
      titulo: 'Tramos del ecosistema y valor de los OLV',
      contenido: 'El ecosistema OLIVIA opera en 6 tramos: Semilla 2026 (sin valor monetario), Brote Q4 2026 (canje interno), Árbol 2027 (primer valor monetario estimado: 6.329 OLV = USD 1, sujeto a certificación Verra), Bosque 2028, Selva 2029, Sumidero 2030+. Los valores indicados son estimaciones basadas en el precio de mercado voluntario de carbono y el factor de conversión CO2eq por tipo de residuo. Dependen de las certificaciones obtenidas, el comportamiento del usuario y los precios del mercado de carbono al momento de la certificación. Circulab Tech no garantiza estos valores.',
    },
    {
      num: '5',
      titulo: 'Obligaciones del usuario',
      contenido: 'El usuario se compromete a: (a) Proporcionar información verídica al registrarse. (b) No manipular las fotografías de residuos ni el GPS. (c) No crear cuentas múltiples para multiplicar OLV artificialmente. (d) No transferir su cuenta a terceros. (e) No usar la plataforma para fines contrarios a la ley argentina. El incumplimiento de estas obligaciones puede resultar en la cancelación de la cuenta y la pérdida de los OLV acumulados.',
    },
    {
      num: '6',
      titulo: 'Verificación con IA y GPS',
      contenido: 'El sistema de verificación dMRV de OLIVIA usa inteligencia artificial (LLaVA via Cloudflare Workers AI) para analizar las fotografías de residuos. El resultado de la verificación es automático y puede contener errores. Circulab Tech se reserva el derecho de revisar manualmente cualquier registro y de anular OLV acreditados incorrectamente. La segunda fotografía con GPS activo en el punto de entrega es condición necesaria para que los OLV queden en estado "verificado" y sean considerados para la certificación Verra.',
    },
    {
      num: '7',
      titulo: 'Propiedad intelectual',
      contenido: 'Todos los contenidos de la plataforma OLIVIA, incluyendo el nombre OLIVIA, el nombre Metamorfosis, el logo, el diseño, el sistema dMRV, el código fuente y la metodología de verificación, son propiedad de Circulab Tech S.A.S. y están protegidos por la Ley 25.036 de Propiedad Intelectual de Argentina y los tratados internacionales aplicables. Los datos ambientales generados por el usuario pertenecen al usuario, pero el usuario otorga a Circulab Tech una licencia irrevocable para usar esos datos con fines de certificación de carbono, reportes ante organismos internacionales y mejora del sistema.',
    },
    {
      num: '8',
      titulo: 'MANDATO DE CERTIFICACIÓN Y DISTRIBUCIÓN — CLÁUSULA PRINCIPAL',
      contenido: 'ESTA CLÁUSULA ES FUNDAMENTAL. AL ACEPTAR ESTOS T&C, EL USUARIO OTORGA EXPRESAMENTE A CIRCULAB TECH S.A.S. EL SIGUIENTE MANDATO: (a) CERTIFICACIÓN: Circulab Tech actuará como mandatario del usuario para certificar el impacto ambiental de sus residuos verificados ante Verra VCS, Gold Standard y otros organismos internacionales de certificación de carbono. (b) REPRESENTACIÓN COMERCIAL: Circulab Tech negociará y cerrará contratos de venta de créditos de carbono con compradores internacionales (empresas, fondos, organismos) en nombre del ecosistema OLIVIA. (c) RECEPCIÓN DE PAGOS: Circulab Tech recibirá los pagos de los compradores de créditos de carbono en nombre del ecosistema. (d) DISTRIBUCIÓN: Una vez recibidos los pagos, Circulab Tech distribuirá al usuario el porcentaje correspondiente según la tabla de distribución vigente al momento de la certificación, acreditado en la wallet OLIVIA del usuario. (e) RETENCIÓN: Circulab Tech retendrá su porcentaje como contraprestación por la infraestructura tecnológica, el proceso de certificación, la gestión comercial y los costos operativos. (f) SMART CONTRACT: La distribución se ejecutará mediante contratos inteligentes (smart contracts) auditados por terceros independientes, garantizando transparencia y automatismo. Este mandato es válido bajo la Ley 25.506 de Firma Digital y los artículos 1319-1334 del Código Civil y Comercial de Argentina. BASE LEGAL: La aceptación digital de estos T&C mediante checkbox constituye firma electrónica con plena validez legal bajo la legislación argentina.',
    },
    {
      num: '9',
      titulo: 'Limitación de responsabilidad',
      contenido: 'Circulab Tech no garantiza: (a) Que la certificación Verra se obtenga en el plazo estimado. (b) Que el precio de los créditos de carbono sea el indicado en las proyecciones. (c) La continuidad ininterrumpida del servicio. (d) Que los OLV acumulados tengan el valor monetario proyectado. En ningún caso Circulab Tech será responsable por daños indirectos, pérdida de ganancias esperadas o pérdida de OLV por causas ajenas a su control, incluyendo cambios regulatorios, fallas de terceros (Verra, Cloudflare, Supabase) o condiciones de mercado.',
    },
    {
      num: '10',
      titulo: 'Modificaciones',
      contenido: 'Circulab Tech puede modificar estos T&C en cualquier momento. Los cambios sustanciales serán notificados por email con 30 días de anticipación. El uso continuado de la plataforma después de la notificación implica aceptación de los nuevos términos. La Cláusula 8 de Mandato solo puede modificarse con consentimiento expreso del usuario.',
    },
    {
      num: '11',
      titulo: 'Ley aplicable y jurisdicción',
      contenido: 'Estos T&C se rigen por la ley de la República Argentina. Para cualquier controversia, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires, renunciando a cualquier otro fuero. Para controversias de hasta USD 5.000 se aplicará el procedimiento de mediación previa obligatoria.',
    },
    {
      num: '12',
      titulo: 'Contacto',
      contenido: 'Para consultas sobre estos términos: hola@oliviacirculab.com.ar · Circulab Tech S.A.S. · Ciudad Autónoma de Buenos Aires · Argentina. Última actualización: junio 2026.',
    },
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui'}}>
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:'rgba(10,14,26,0.95)',borderBottom:'1px solid ' + border,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <span style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.05em'}}>Circulab Tech</span>
        </a>
        <a href="/" style={{fontSize:11,color:sub,textDecoration:'none'}}>← Volver</a>
      </nav>

      <div style={{maxWidth:720,margin:'0 auto',padding:'48px 24px'}}>
        <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>[ Términos y Condiciones ]</div>
        <h1 style={{fontSize:32,fontWeight:900,marginBottom:8,color:text}}>Términos y Condiciones</h1>
        <div style={{fontSize:12,color:sub,marginBottom:12}}>Circulab Tech S.A.S. · Vigentes desde junio 2026</div>

        <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:12,padding:'16px',marginBottom:32,fontSize:12,color:'#ef4444',lineHeight:1.7,fontWeight:600}}>
          ⚠️ La Cláusula 8 es la más importante. Explica cómo funciona el mandato de certificación de carbono y la distribución de pagos al usuario. Leéla antes de registrarte.
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {CLAUSULAS.map((c,i)=>(
            <div key={i} style={{background:c.num==='8'?'rgba(34,197,94,0.04)':card,border:c.num==='8'?'2px solid rgba(34,197,94,0.3)':'1px solid ' + border,borderRadius:12,padding:'20px'}}>
              <h2 style={{fontSize:14,fontWeight:700,color:c.num==='8'?accent:'#f1f5f9',marginBottom:10}}>
                Cláusula {c.num} — {c.titulo}
              </h2>
              <p style={{fontSize:12,color:c.num==='8'?'#94a3b8':sub,lineHeight:1.8,margin:0}}>{c.contenido}</p>
            </div>
          ))}
        </div>

        <div style={{marginTop:32,padding:'16px',background:'rgba(255,255,255,0.02)',border:'1px solid ' + border,borderRadius:12,fontSize:11,color:sub,textAlign:'center',lineHeight:1.7}}>
          ¿Preguntas? <a href="mailto:hola@oliviacirculab.com.ar" style={{color:accent}}>hola@oliviacirculab.com.ar</a>
          <br/>
          <a href="/privacidad" style={{color:sub}}>Ver Política de Privacidad →</a>
        </div>
      </div>
    </div>
  )
}
`;
  fs.writeFileSync(terminosPath, terminos);
  console.log('OK app/terminos/page.tsx creada con Cláusula 8 de mandato');
} else {
  // Ya existe - verificar que tiene la cláusula 8
  let t = fs.readFileSync(terminosPath, 'utf8');
  if (!t.includes('mandato') && !t.includes('Mandato') && !t.includes('MANDATO')) {
    console.log('WARN: /terminos existe pero NO tiene la cláusula 8 de mandato');
    console.log('      Revisar y agregar manualmente la cláusula 8');
  } else {
    console.log('OK /terminos: ya tiene cláusula de mandato');
  }
}

// ═══ 2. Página /equipo ═══
const equipoDir = 'app/equipo';
if (!fs.existsSync(equipoDir)) {
  fs.mkdirSync(equipoDir, { recursive: true });
}

const equipoPath = 'app/equipo/page.tsx';
if (!fs.existsSync(equipoPath)) {
  const equipo = `'use client'
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
        : 'Chilean-Argentine theater director and filmmaker. Lawyer specializing in environmental, tax and intellectual property law. CEPAL consultant on environmental matters. AI product builder. Trained at the International School of Gesture and Image La Mancha (Jacques Lecoq) and at Teatro La Memoria with Alfredo Castro. Researcher of Humberto Maturana\'s cultural biology. Architect of the Circulab ecosystem.',
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
                <a href="mailto:hola@oliviacirculab.com.ar?subject=Postulación " + a.nombre style={{fontSize:11,color:a.color,fontWeight:700,textDecoration:'none'}}>
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
      <footer style={{borderTop:'1px solid ' + border,padding:'24px',textAlign:'center'}}>
        <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:36,height:36,objectFit:'contain',borderRadius:6,marginBottom:8}} /></a>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.1em'}}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
      </footer>

    </div>
  )
}
`;
  fs.writeFileSync(equipoPath, equipo);
  console.log('OK app/equipo/page.tsx creada');
} else {
  console.log('-- /equipo: ya existe');
}

// Actualizar sitemap con nuevas páginas
if (fs.existsSync('public/sitemap.xml')) {
  let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
  if (!sitemap.includes('/equipo')) {
    sitemap = sitemap.replace(
      '</urlset>',
      `  <url>
    <loc>https://oliviacirculab.com.ar/equipo</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/terminos</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>`
    );
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('OK sitemap.xml actualizado con /equipo y /terminos');
  }
}

console.log('');
console.log('Script 18 completado');
console.log('Páginas creadas/verificadas:');
console.log('  /terminos - con Cláusula 8 de mandato (CRÍTICA)');
console.log('  /equipo - founders + posiciones abiertas');
