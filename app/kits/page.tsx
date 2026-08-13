'use client'
import { useState } from 'react'

export default function Kits() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const [segmento, setSegmento] = useState('todos')
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#64748b' : '#6b7280'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const accent = '#22c55e'

  const SEGMENTOS = [
    {id:'todos', l:es?'Todos':'All', c:'#22c55e'},
    {id:'ciudadano', l:es?'Ciudadano':'Citizen', c:'#22c55e'},
    {id:'consorcio', l:es?'Consorcio':'Building', c:'#3b82f6'},
    {id:'gastro', l:es?'Gastronómico':'Gastronomy', c:'#f59e0b'},
    {id:'hotel', l:es?'Hotel':'Hotel', c:'#a855f7'},
    {id:'rse', l:es?'RSE / ESG':'RSE / ESG', c:'#06b6d4'},
  ]

  const KITS = [
    {
      id: 'kit-semilla',
      seg: 'ciudadano',
      img: '/kits/kit-semilla.png',
      nombre: es ? 'Kit Semilla' : 'Seedling Kit',
      plan: es ? 'Plan Gratuito' : 'Free Plan',
      precio: es ? 'Gratis · siempre' : 'Free · always',
      color: '#22c55e',
      icono: '🌱',
      incluye: es ? [
        'App OLIVIA completa',
        'OLV Verdes por residuos verificados',
        'OLV Bonus por referidos',
        'Dashboard personal',
      ] : [
        'Full OLIVIA app',
        'Green OLV for verified waste',
        'Bonus OLV for referrals',
        'Personal dashboard',
      ],
      noIncluye: es ? 'Sin kit físico · usás tus propios tachos' : 'No physical kit · use your own bins',
      cta: es ? 'Registrarse gratis' : 'Register for free',
      href: '/registro',
    },
    {
      id: 'kit-brote',
      seg: 'ciudadano',
      img: '/kits/kit-brote.png',
      nombre: es ? 'Kit Brote' : 'Sprout Kit',
      plan: es ? 'Plan Brote' : 'Sprout Plan',
      precio: 'USD 2/mes',
      color: '#22c55e',
      icono: '🌿',
      incluye: es ? [
        'Todo el Plan Semilla',
        'Kit digital: cartel A4 + QR + instructivo',
        'Bolsas baño biodegradables x10/mes',
        'Badge Reciclador Activo',
        'OLV Bonus +20% en todos los registros',
      ] : [
        'Everything in Seedling Plan',
        'Digital kit: A4 poster + QR + guide',
        'Biodegradable bathroom bags x10/month',
        'Active Recycler badge',
        'OLV Bonus +20% on all records',
      ],
      noIncluye: es ? 'Sin tacho físico' : 'No physical bin',
      cta: es ? 'Activar Plan Brote' : 'Activate Sprout Plan',
      href: '/nda',
    },
    {
      id: 'kit-arbol',
      seg: 'ciudadano',
      img: '/kits/kit-arbol.png',
      nombre: es ? 'Kit Árbol' : 'Tree Kit',
      plan: es ? 'Plan Árbol' : 'Tree Plan',
      precio: 'USD 5/mes',
      color: '#22c55e',
      icono: '🌳',
      destacado: true,
      incluye: es ? [
        'Todo el Plan Brote',
        '1 tacho orgánicos 20L brandeado OLIVIA',
        'Bolsas orgánicos biodegradables x30/mes',
        'Bolsas baño biodegradables x20/mes',
        'Badge Árbol OLIVIA',
        'OLV Bonus +50% en todos los registros',
        'Prioridad en certificación Verra 2027',
      ] : [
        'Everything in Sprout Plan',
        '1 OLIVIA branded 20L organic bin',
        'Biodegradable organic bags x30/month',
        'Biodegradable bathroom bags x20/month',
        'OLIVIA Tree badge',
        'OLV Bonus +50% on all records',
        'Priority in Verra 2027 certification',
      ],
      cta: es ? 'Activar Plan Árbol' : 'Activate Tree Plan',
      href: '/nda',
    },
    {
      id: 'kit-bosque',
      seg: 'ciudadano',
      img: '/kits/kit-bosque.png',
      nombre: es ? 'Kit Bosque' : 'Forest Kit',
      plan: es ? 'Plan Bosque' : 'Forest Plan',
      precio: 'USD 9/mes',
      color: '#16a34a',
      icono: '🌲',
      incluye: es ? [
        'Todo el Plan Árbol',
        '1 tacho orgánicos 20L + 1 tacho general 30L',
        'Bolsas orgánicos x30 + secos x20 + baño x20/mes',
        '1 producto limpieza OLIVIA biodegradable/mes',
        'Badge Bosque OLIVIA destacado',
        'OLV Bonus +100% en todos los registros',
        'Acceso anticipado a Quincena PULSO 2027',
      ] : [
        'Everything in Tree Plan',
        '1 x 20L organic bin + 1 x 30L general bin',
        'Organic x30 + dry x20 + bathroom x20 bags/month',
        '1 OLIVIA biodegradable cleaning product/month',
        'OLIVIA Forest featured badge',
        'OLV Bonus +100% on all records',
        'Early access to Quincena PULSO 2027',
      ],
      cta: es ? 'Activar Plan Bosque' : 'Activate Forest Plan',
      href: '/nda',
    },
    {
      id: 'kit-consorcio-basico',
      seg: 'consorcio',
      img: '/kits/kit-consorcio-basico.png',
      nombre: es ? 'Kit Consorcio Básico' : 'Basic Building Kit',
      plan: es ? 'Plan Consorcio Básico' : 'Basic Building Plan',
      precio: 'USD 300/mes',
      color: '#3b82f6',
      icono: '🏢',
      incluye: es ? [
        'Dashboard del edificio en tiempo real',
        'Hasta 50 unidades funcionales',
        '1 tacho orgánicos 120L áreas comunes',
        'Bolsas industriales x30/mes',
        'Cartel hall A3 + QR vecinos',
        'Badge Edificio Verde OLIVIA',
        'Reporte mensual para asamblea',
        'Certificado gestión Ley Basura Cero CABA',
      ] : [
        'Real-time building dashboard',
        'Up to 50 functional units',
        '1 x 120L organic bin for common areas',
        'Industrial bags x30/month',
        'A3 hall poster + QR for residents',
        'OLIVIA Green Building badge',
        'Monthly assembly report',
        'CABA Zero Waste Law compliance certificate',
      ],
      cta: es ? 'Solicitar propuesta' : 'Request proposal',
      href: '/nda',
    },
    {
      id: 'kit-consorcio-premium',
      seg: 'consorcio',
      img: '/kits/kit-consorcio-premium.png',
      nombre: es ? 'Kit Consorcio Premium' : 'Premium Building Kit',
      plan: es ? 'Plan Consorcio Premium' : 'Premium Building Plan',
      precio: 'USD 500/mes',
      color: '#3b82f6',
      icono: '🏙️',
      destacado: true,
      incluye: es ? [
        'Todo el Plan Consorcio Básico',
        'Hasta 150 unidades funcionales',
        '1 tacho orgánicos 120L + 1 tacho secos 120L',
        'Bolsas industriales x50/mes',
        'Stickers para ascensores y pasillos',
        'Dashboard por piso',
        'Reporte trimestral certificado',
        'Prioridad certificación Verra 2027',
      ] : [
        'Everything in Basic Building Plan',
        'Up to 150 functional units',
        '1 x 120L organic + 1 x 120L dry bin',
        'Industrial bags x50/month',
        'Elevator and hallway stickers',
        'Per-floor dashboard',
        'Certified quarterly report',
        'Priority Verra 2027 certification',
      ],
      cta: es ? 'Solicitar propuesta' : 'Request proposal',
      href: '/nda',
    },
    {
      id: 'kit-cafe-verde',
      seg: 'gastro',
      img: '/kits/kit-cafe-verde.png',
      nombre: es ? 'Kit Café Verde' : 'Green Café Kit',
      plan: es ? 'Plan Verde Café' : 'Green Café Plan',
      precio: 'USD 200/mes',
      color: '#f59e0b',
      icono: '☕',
      incluye: es ? [
        '1 tacho orgánicos 30L cocina',
        'Bolsas industriales compostables x20/mes',
        'Badge Café Verde OLIVIA (puerta + redes)',
        'Dashboard impacto mensual',
        'Sticker verificado para la entrada',
        'Reporte para Tripadvisor GreenLeaders',
      ] : [
        '1 x 30L organic kitchen bin',
        'Compostable industrial bags x20/month',
        'OLIVIA Green Café badge (door + social)',
        'Monthly impact dashboard',
        'Verified sticker for entrance',
        'Tripadvisor GreenLeaders report',
      ],
      cta: es ? 'Solicitar propuesta' : 'Request proposal',
      href: '/nda',
    },
    {
      id: 'kit-restoran-verde',
      seg: 'gastro',
      img: '/kits/kit-restoran-verde.png',
      nombre: es ? 'Kit Restorán Verde' : 'Green Restaurant Kit',
      plan: es ? 'Plan Verde Restorán' : 'Green Restaurant Plan',
      precio: 'USD 350/mes',
      color: '#f59e0b',
      icono: '🍽️',
      destacado: true,
      incluye: es ? [
        '1 tacho orgánicos 50L cocina brandeado',
        'Bolsas industriales compostables x30/mes',
        'Badge Restorán Verde OLIVIA verificado',
        'Datos para Tripadvisor GreenLeaders Silver',
        'Reporte ESG mensual exportable',
        'Sticker puerta + cartel cocina',
        'Cumplimiento Ley 1854 CABA',
      ] : [
        '1 x 50L branded organic kitchen bin',
        'Compostable industrial bags x30/month',
        'Verified OLIVIA Green Restaurant badge',
        'Tripadvisor GreenLeaders Silver data',
        'Exportable monthly ESG report',
        'Door sticker + kitchen sign',
        'CABA Law 1854 compliance',
      ],
      cta: es ? 'Solicitar propuesta' : 'Request proposal',
      href: '/nda',
    },
    {
      id: 'kit-hotel-verde',
      seg: 'hotel',
      img: '/kits/kit-hotel-verde.png',
      nombre: es ? 'Kit Hotel Verde' : 'Green Hotel Kit',
      plan: es ? 'Plan Hotel Verde' : 'Green Hotel Plan',
      precio: 'USD 600/mes',
      color: '#a855f7',
      icono: '🏨',
      incluye: es ? [
        '1 tacho orgánicos 120L cocina',
        'Tachos 20L x5 pisos brandeados',
        'Bolsas biodegradables por piso x20/mes',
        'Badge Tripadvisor GreenLeader Silver',
        'Badge Booking Travel Sustainable Nivel 2',
        'Dashboard por área en tiempo real',
        'Reporte ESG mensual',
        'Cumplimiento Ley 1854 hoteles 4/5★',
      ] : [
        '1 x 120L organic kitchen bin',
        'Branded 20L bins x5 floors',
        'Biodegradable bags per floor x20/month',
        'Tripadvisor GreenLeader Silver badge',
        'Booking Travel Sustainable Level 2 badge',
        'Real-time per-area dashboard',
        'Monthly ESG report',
        'CABA Law 1854 4/5★ hotel compliance',
      ],
      cta: es ? 'Solicitar propuesta' : 'Request proposal',
      href: '/nda',
    },
    {
      id: 'kit-rse-corporativo',
      seg: 'rse',
      img: '/kits/kit-rse-corporativo.png',
      nombre: es ? 'Kit RSE Corporativo' : 'Corporate RSE Kit',
      plan: es ? 'Plan RSE Corporativo' : 'Corporate RSE Plan',
      precio: 'USD 1.500/mes',
      color: '#06b6d4',
      icono: '🏛️',
      incluye: es ? [
        'Kit oficina: tachos por piso + bolsas',
        'Dashboard multi-sede en tiempo real',
        'Reporte GRI/SASB/TCFD completo exportable',
        'Badge Empresa Verde OLIVIA verificado',
        'Compensación huella carbono verificada con IA',
        'Certificado Verra a nombre de la empresa 2027',
        'Integración con sistemas ESG existentes',
      ] : [
        'Office kit: per-floor bins + bags',
        'Multi-location real-time dashboard',
        'Full exportable GRI/SASB/TCFD report',
        'Verified OLIVIA Green Company badge',
        'AI-verified carbon footprint compensation',
        'Verra certificate in company name 2027',
        'Integration with existing ESG systems',
      ],
      cta: es ? 'Solicitar propuesta' : 'Request proposal',
      href: '/nda',
    },
  ]

  const kitsFiltrados = segmento === 'todos'
    ? KITS
    : KITS.filter(k => k.seg === segmento)

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'Inter,system-ui',transition:'all 0.3s'}}>

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:dark?'rgba(10,14,26,0.95)':'rgba(247,245,241,0.95)',borderBottom:'1px solid '+border,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <span style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.05em'}}>OLIVIA Circulab</span>
        </a>
        <div style={{display:'flex',gap:6}}>
          <button onClick={()=>setLang(es?'en':'es')} style={{border:'1px solid '+border,borderRadius:20,padding:'5px 12px',fontSize:10,fontWeight:700,cursor:'pointer',background:'transparent',color:text}}>{es?'EN':'ES'}</button>
          <button onClick={()=>setDark(!dark)} style={{border:'1px solid '+border,borderRadius:20,padding:'5px 9px',fontSize:12,cursor:'pointer',background:'transparent',color:text}}>{dark?'☀️':'🌙'}</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:'clamp(32px,6vw,56px) 24px',textAlign:'center',background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.02)',borderBottom:'1px solid rgba(34,197,94,0.1)'}}>
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>[ {es?'Kits OLIVIA Circulab':'OLIVIA Circulab Kits'} ]</div>
          <h1 style={{fontSize:'clamp(24px,5vw,36px)',fontWeight:900,lineHeight:1.2,marginBottom:16}}>
            {es?'Limpiá tu tacho.':'Clean your bin.'}
            <br/><span style={{color:accent}}>{es?'Limpiá el planeta.':'Clean the planet.'}</span>
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:8,maxWidth:520,margin:'0 auto 8px'}}>
            {es
              ? 'El mal olor no es excusa para no reciclar. OLIVIA te da el kit correcto para tu tipo de hogar, negocio o edificio — con tachos brandeados, bolsas biodegradables y productos de limpieza ecológicos.'
              : 'Bad smell is no excuse not to recycle. OLIVIA gives you the right kit for your home, business or building — with branded bins, biodegradable bags and eco cleaning products.'}
          </p>
          <div style={{marginTop:24,display:'inline-block',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'10px 20px',fontSize:11,color:accent,fontWeight:700}}>
            {es?'✅ Kit incluido en cada membresía · Sin inversión adicional':'✅ Kit included in every membership · No additional investment'}
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section style={{padding:'0',maxWidth:800,margin:'0 auto'}}>
        <img
          src="/kits/kit-hero-landing.png"
          alt={es?'Limpiá tu tacho. Limpiá el planeta.':'Clean your bin. Clean the planet.'}
          style={{width:'100%',height:'auto',objectFit:'contain',display:'block'}}
        />
      </section>

      {/* FILTROS */}
      <section style={{padding:'32px 24px 0'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
          {SEGMENTOS.map(s=>(
            <button key={s.id} onClick={()=>setSegmento(s.id)} style={{padding:'8px 18px',borderRadius:20,border:'1px solid '+(segmento===s.id?s.c:border),background:segmento===s.id?s.c+'15':'transparent',color:segmento===s.id?s.c:sub,fontSize:11,fontWeight:700,cursor:'pointer',transition:'all 0.2s'}}>
              {s.l}
            </button>
          ))}
        </div>
      </section>

      {/* NOTA PRECIOS DESDE */}
      <div style={{maxWidth:1100,margin:'0 auto 20px',padding:'0 20px'}}>
        <div style={{background:'rgba(245,158,11,0.07)',border:'1px solid rgba(245,158,11,0.25)',borderRadius:12,padding:'14px 16px',display:'flex',gap:10,alignItems:'flex-start'}}>
          <span style={{fontSize:16,lineHeight:1}}>💡</span>
          <div style={{fontSize:12,lineHeight:1.65,color:'#b45309'}}>
            <strong>{es?'Los valores indicados son precios desde.':'Prices shown are starting prices.'}</strong>{' '}
            {es
              ? 'Representan el piso de cada tramo. Cada propuesta se ajusta según volumen, cantidad de unidades y necesidades de cada cliente.'
              : 'They represent the entry point for each tier. Every proposal is tailored to volume, number of units and each client\'s needs.'}
          </div>
        </div>
      </div>

      {/* KITS GRID */}
      <section style={{padding:'32px 24px 64px'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
          {kitsFiltrados.map((kit)=>(
            <div key={kit.id} style={{background:card,border:'2px solid '+(kit.destacado?kit.color:border),borderRadius:20,overflow:'hidden',position:'relative'}}>
              {kit.destacado&&(
                <div style={{position:'absolute',top:12,right:12,background:kit.color,color:'white',fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',padding:'4px 10px',borderRadius:20,zIndex:2}}>
                  {es?'⭐ Más popular':'⭐ Most popular'}
                </div>
              )}
              <div style={{height:200,overflow:'hidden',position:'relative'}}>
                <img
                  src={kit.img}
                  alt={kit.nombre}
                  style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s'}}
                  onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.05)')}
                  onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}
                />
                <div style={{position:'absolute',bottom:0,left:0,right:0,height:80,background:'linear-gradient(to top,rgba(0,0,0,0.7),transparent)'}}></div>
                <div style={{position:'absolute',bottom:12,left:16,display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:24}}>{kit.icono}</span>
                  <div>
                    <div style={{fontSize:14,fontWeight:900,color:'white'}}>{kit.nombre}</div>
                    <div style={{fontSize:10,color:'rgba(255,255,255,0.7)'}}>{kit.plan}</div>
                  </div>
                </div>
              </div>
              <div style={{padding:'20px'}}>
                <div style={{fontSize:22,fontWeight:900,color:kit.color,marginBottom:16}}>{kit.precio}</div>
                <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:16}}>
                  {kit.incluye.map((item,i)=>(
                    <div key={i} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                      <span style={{color:kit.color,fontSize:12,flexShrink:0,marginTop:2}}>✓</span>
                      <span style={{fontSize:11,color:sub,lineHeight:1.5}}>{item}</span>
                    </div>
                  ))}
                  {kit.noIncluye&&(
                    <div style={{display:'flex',gap:8,alignItems:'flex-start',opacity:0.5}}>
                      <span style={{color:sub,fontSize:12,flexShrink:0,marginTop:2}}>·</span>
                      <span style={{fontSize:10,color:sub,lineHeight:1.5,fontStyle:'italic'}}>{kit.noIncluye}</span>
                    </div>
                  )}
                </div>
                <a href={kit.href} style={{display:'block',background:'linear-gradient(135deg,'+kit.color+','+kit.color+'cc)',borderRadius:12,padding:'12px',color:'white',fontSize:12,fontWeight:700,textDecoration:'none',textAlign:'center',textTransform:'uppercase',letterSpacing:'0.06em'}}>
                  {kit.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAMILIA COMPLETA */}
      <section style={{padding:'0 24px 64px'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <img
            src="/kits/kit-familia-completa.png"
            alt={es?'Familia completa de kits OLIVIA':'Complete OLIVIA kit family'}
            style={{width:'100%',borderRadius:20,objectFit:'cover',height:300}}
          />
          <div style={{textAlign:'center',marginTop:20}}>
            <div style={{fontSize:12,color:sub,marginBottom:8}}>
              {es?'¿No encontrás tu kit? Contanos tu caso y te armamos una propuesta a medida.':'Cannot find your kit? Tell us your case and we will create a custom proposal.'}
            </div>
            <a href="mailto:hola@oliviacirculab.com.ar?subject=Kit a medida OLIVIA" style={{fontSize:12,color:accent,fontWeight:700,textDecoration:'none'}}>
              hola@oliviacirculab.com.ar →
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{padding:'56px 24px',textAlign:'center',background:'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(59,130,246,0.04))',borderTop:'1px solid rgba(34,197,94,0.15)'}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:8}}>
            {es?'¿Listo para empezar?':'Ready to start?'}
          </h2>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:28}}>
            {es
              ? 'Firmá el NDA y te enviamos la propuesta con el kit correspondiente a tu tipo de establecimiento en menos de 24 horas.'
              : 'Sign the NDA and we send you the proposal with the kit for your type of establishment in less than 24 hours.'}
          </p>
          <a href="/nda" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'16px 40px',color:'white',fontSize:14,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:16}}>
            {es?'Firmar NDA y recibir propuesta →':'Sign NDA and receive proposal →'}
          </a>
          <div style={{fontSize:11,color:sub}}>
            {es?'O escribinos:':'Or write to us:'}{' '}
            <a href="mailto:hola@oliviacirculab.com.ar" style={{color:accent}}>hola@oliviacirculab.com.ar</a>
          </div>
        </div>
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
