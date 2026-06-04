'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function tiempoRelativo(fecha: string) {
  const diff = Date.now()-new Date(fecha).getTime()
  const min = Math.floor(diff/60000)
  if(min<60) return min+'m'
  const hs = Math.floor(min/60)
  if(hs<24) return hs+'h'
  return Math.floor(hs/24)+'d'
}

export default function Home() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(true)
  const [posts, setPosts] = useState<any[]>([])

  const bg = dark ? '#0a0e1a' : '#f8fafc'
  const text = dark ? '#f1f5f9' : '#0a0e1a'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'
  const muted = dark ? '#64748b' : '#64748b'
  const navBg = dark ? 'rgba(10,14,26,0.95)' : 'rgba(248,250,252,0.95)'

  useEffect(()=>{
    supabase.from('posts').select('*, usuarios(nombre,apellido)').order('created_at',{ascending:false}).limit(6).then(({data})=>setPosts(data||[]))
  },[])

  const T: any = {
    es: {
      tagline: 'Distrito IA · Ley Economía del Conocimiento',
      h1a: 'Tu basura vale', h1b: 'USD',
      h1c: 'Tu palabra,', h1d: 'historial crediticio',
      h1e: 'Tu arte,', h1f: 'capital hoy',
      desc: 'Circulab es un motor de confianza ciudadana. Validamos actos de responsabilidad con IA para convertirlos en activos reales.',
      verPanel: 'Ver el Panel →',
      calcular: '🏢 Calculá el ahorro de tu consorcio',
      registrar: 'Registrar residuo',
      consorcioCTA: '¿Administrás un consorcio?',
      consorcioDesc: 'Tu consorcio ya paga por la basura. Calculá cuánto podría recibir por separar sus orgánicos con Circulab.',
      calcularBtn: 'Calcular ahorro →',
      inversorCTA: '¿Sos inversor?',
      inversorDesc: 'Accedé al One Pager confidencial de la Ronda Seed 2026. USD 500K Opción A · USD 2M Opción B.',
      onePagerBtn: 'Ver One Pager →',
      productoTag: 'El producto existe',
      productoH2: 'Así se ve tu identidad financiera digital',
      accederPanel: 'Acceder al Panel completo →',
      simulador: '🏢 Simulador de ahorro',
      ecosistemaH2: 'Ecosistema Ciudadano',
      ecosistemaDesc: 'Tres verticales que se retroalimentan y generan un efecto de red único',
      equipoH2: 'El equipo',
      comunidadH2: 'La comunidad actúa',
      comunidadDesc: 'Acciones climáticas reales de vecinos que ya usan Circulab',
      comunidadCTA: 'Ver toda la comunidad →',
      comunidadUnirse: 'Uníte para interactuar →',
      nav: {ecosistema:'Ecosistema',producto:'Producto',equipo:'Equipo',simulador:'Simulador',onepager:'One Pager',panel:'Acceder al Panel →'},
      verticales: [
        {icon:'🌿',title:'Olivia Circular',desc:'Registrás tus residuos, la IA los valida, recibís tokens OLV y créditos de carbono.',color:'#22c55e'},
        {icon:'👥',title:'Quincena · PULSO',desc:'Tu rosca informal se convierte en historial crediticio blockchain verificable.',color:'#3b82f6'},
        {icon:'🎵',title:'Art of Money',desc:'Tus regalías de Spotify, YouTube y SADAIC como garantía para adelantos de capital.',color:'#a855f7'},
      ],
      tesis: [
        {label:'Tesis',v:'Motor de confianza ciudadana del Sur Global'},
        {label:'Tecnología',v:'Computer Vision · Blockchain · ReFi · RWA'},
        {label:'Mercado',v:'Argentina · México · Corredor LATAM'},
        {label:'Marco legal',v:'Ley 27.506 · Distrito IA CABA'},
      ],
      founders: [
        {nombre:'Juan Pablo Sanguinetti',rol:'Founder & Vision Lead',desc:'Abogado experto en tributario, medio ambiente y propiedad intelectual. Arquitecto del motor de confianza ciudadana.',img:'/founders/founder-jp.jpg'},
        {nombre:'Mileidy Zapata',rol:'Co-Founder & Ops Lead',desc:'Experta en branding y gestión operativa. Su enfoque en la economía del cuidado garantiza impacto humano real.',img:'/founders/founder-mileidy.jpg'},
      ],
      footer: {panel:'Panel',simulador:'Simulador de ahorro',registrar:'Registrar residuo',onepager:'One Pager Inversores',whitepaper:'Whitepaper',contacto:'Contacto'},
      copyright: 'Circulab Tech ©️ 2026 · Distrito IA CABA',
    },
    en: {
      tagline: 'AI District · Knowledge Economy Law',
      h1a: 'Your waste is worth', h1b: 'USD',
      h1c: 'Your word,', h1d: 'credit history',
      h1e: 'Your art,', h1f: 'capital today',
      desc: 'Circulab is a citizen trust engine. We validate acts of responsibility with AI to turn them into real assets.',
      verPanel: 'View Dashboard →',
      calcular: '🏢 Calculate your building\'s savings',
      registrar: 'Register waste',
      consorcioCTA: 'Do you manage a building?',
      consorcioDesc: 'Your building already pays for waste. Calculate how much it could earn by separating organics with Circulab.',
      calcularBtn: 'Calculate savings →',
      inversorCTA: 'Are you an investor?',
      inversorDesc: 'Access the confidential One Pager for Seed Round 2026. USD 500K Option A · USD 2M Option B.',
      onePagerBtn: 'View One Pager →',
      productoTag: 'The product exists',
      productoH2: 'This is your digital financial identity',
      accederPanel: 'Access full Dashboard →',
      simulador: '🏢 Savings calculator',
      ecosistemaH2: 'Citizen Ecosystem',
      ecosistemaDesc: 'Three verticals that feed each other and generate a unique network effect',
      equipoH2: 'The team',
      comunidadH2: 'The community acts',
      comunidadDesc: 'Real climate actions from neighbors already using Circulab',
      comunidadCTA: 'See full community →',
      comunidadUnirse: 'Join to interact →',
      nav: {ecosistema:'Ecosystem',producto:'Product',equipo:'Team',simulador:'Calculator',onepager:'One Pager',panel:'Access Dashboard →'},
      verticales: [
        {icon:'🌿',title:'Olivia Circular',desc:'Register your waste, AI validates it, receive OLV tokens and carbon credits.',color:'#22c55e'},
        {icon:'👥',title:'Quincena · PULSO',desc:'Your informal savings circle becomes verifiable blockchain credit history.',color:'#3b82f6'},
        {icon:'🎵',title:'Art of Money',desc:'Your Spotify, YouTube and SADAIC royalties as collateral for capital advances.',color:'#a855f7'},
      ],
      tesis: [
        {label:'Thesis',v:'Citizen trust engine for the Global South'},
        {label:'Technology',v:'Computer Vision · Blockchain · ReFi · RWA'},
        {label:'Market',v:'Argentina · Mexico · LATAM Corridor'},
        {label:'Legal framework',v:'Law 27.506 · AI District CABA'},
      ],
      founders: [
        {nombre:'Juan Pablo Sanguinetti',rol:'Founder & Vision Lead',desc:'Attorney specializing in tax, environmental and intellectual property law. Architect of the Circulab trust engine.',img:'/founders/founder-jp.jpg'},
        {nombre:'Mileidy Zapata',rol:'Co-Founder & Ops Lead',desc:'Expert in branding and operations. Her focus on the care economy translates blockchain complexity into real neighborhood adoption.',img:'/founders/founder-mileidy.jpg'},
      ],
      footer: {panel:'Dashboard',simulador:'Savings calculator',registrar:'Register waste',onepager:'Investor One Pager',whitepaper:'Whitepaper',contacto:'Contact'},
      copyright: 'Circulab Tech ©️ 2026 · AI District CABA',
    }
  }

  const t = T[lang]

  return (
    <main style={{background:bg,minHeight:'100vh',fontFamily:'system-ui,sans-serif',color:text,transition:'all 0.3s'}}>

      {/* Nav */}
      <nav style={{padding:'16px 32px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,background:navBg,backdropFilter:'blur(10px)',zIndex:100,flexWrap:'wrap',gap:12}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>C</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,letterSpacing:'0.04em',color:text}}>CIRCULAB</div>
            <div style={{fontSize:9,color:muted,textTransform:'uppercase',letterSpacing:'0.1em'}}>TECH</div>
          </div>
        </a>
        <div style={{display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
          <a href="#ecosistema" style={{fontSize:13,color:muted,textDecoration:'none'}}>{t.nav.ecosistema}</a>
          <a href="#producto" style={{fontSize:13,color:muted,textDecoration:'none'}}>{t.nav.producto}</a>
          <a href="#equipo" style={{fontSize:13,color:muted,textDecoration:'none'}}>{t.nav.equipo}</a>
          <a href="#comunidad" style={{fontSize:13,color:'#22c55e',textDecoration:'none',fontWeight:600}}>🌿 {lang==='es'?'Comunidad':'Community'}</a>
          <a href="/simulador" style={{fontSize:13,color:'#22c55e',textDecoration:'none',fontWeight:600}}>{t.nav.simulador}</a>
          <a href="/onepager" style={{fontSize:13,color:'#f59e0b',textDecoration:'none',fontWeight:600}}>{t.nav.onepager}</a>
          <button onClick={()=>setLang(lang==='es'?'en':'es')} style={{fontSize:11,color:'#22c55e',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',cursor:'pointer',fontWeight:700}}>
            {lang==='es'?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)} style={{fontSize:16,background:'transparent',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',cursor:'pointer'}}>
            {dark?'☀️':'🌙'}
          </button>
          <a href="/dashboard" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'8px 18px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',boxShadow:'0 0 20px rgba(34,197,94,0.3)'}}>{t.nav.panel}</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{padding:'100px 32px',textAlign:'center',maxWidth:800,margin:'0 auto'}}>
        <div style={{display:'inline-block',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'6px 16px',fontSize:12,color:'#22c55e',fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:24}}>
          {t.tagline}
        </div>
        <h1 style={{fontSize:52,fontWeight:900,lineHeight:1.1,letterSpacing:'-0.03em',margin:'0 0 24px',color:text}}>
          {t.h1a} <span style={{color:'#22c55e'}}>{t.h1b}</span>.<br/>
          {t.h1c} <span style={{color:'#3b82f6'}}>{t.h1d}</span>.<br/>
          {t.h1e} <span style={{color:'#a855f7'}}>{t.h1f}</span>.
        </h1>
        <p style={{fontSize:18,color:muted,lineHeight:1.6,marginBottom:40,maxWidth:600,margin:'0 auto 40px'}}>
          {t.desc}
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/dashboard" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 32px',borderRadius:12,fontSize:16,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)'}}>
            {t.verPanel}
          </a>
          <a href="/simulador" style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',padding:'14px 32px',borderRadius:12,fontSize:16,fontWeight:700,textDecoration:'none'}}>
            {t.calcular}
          </a>
          <a href="/registrar" style={{background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,padding:'14px 32px',borderRadius:12,fontSize:16,fontWeight:700,textDecoration:'none'}}>
            {t.registrar}
          </a>
        </div>
      </section>

      {/* Simulador CTA */}
      <section style={{padding:'60px 32px',background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.06)',borderTop:`1px solid rgba(34,197,94,0.1)`,borderBottom:`1px solid rgba(34,197,94,0.1)`}}>
        <div style={{maxWidth:800,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
          <div>
            <div style={{fontSize:24,fontWeight:900,marginBottom:8,color:text}}>{t.consorcioCTA}</div>
            <div style={{fontSize:15,color:muted,maxWidth:500}}>{t.consorcioDesc}</div>
          </div>
          <a href="/simulador" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'16px 32px',borderRadius:14,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.25)',whiteSpace:'nowrap',flexShrink:0}}>
            {t.calcularBtn}
          </a>
        </div>
      </section>

      {/* One Pager CTA */}
      <section style={{padding:'60px 32px',background:dark?'rgba(245,158,11,0.04)':'rgba(245,158,11,0.06)',borderBottom:`1px solid rgba(245,158,11,0.1)`}}>
        <div style={{maxWidth:800,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
          <div>
            <div style={{fontSize:24,fontWeight:900,marginBottom:8,color:text}}>{t.inversorCTA}</div>
            <div style={{fontSize:15,color:muted,maxWidth:500}}>{t.inversorDesc}</div>
          </div>
          <a href="/onepager" style={{background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'white',padding:'16px 32px',borderRadius:14,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(245,158,11,0.25)',whiteSpace:'nowrap',flexShrink:0}}>
            {t.onePagerBtn}
          </a>
        </div>
      </section>

      {/* Producto */}
      <section id="producto" style={{padding:'80px 32px',maxWidth:1000,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <div style={{fontSize:12,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:12}}>{t.productoTag}</div>
          <h2 style={{fontSize:36,fontWeight:900,letterSpacing:'-0.02em',margin:0,color:text}}>{t.productoH2}</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16,marginBottom:40}}>
          {t.verticales.map((c: any) => (
            <div key={c.title} style={{background:card,border:`1px solid ${c.color}22`,borderRadius:16,padding:'24px',borderTop:`3px solid ${c.color}`}}>
              <div style={{fontSize:32,marginBottom:12}}>{c.icon}</div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:8,color:text}}>{c.title}</div>
              <div style={{fontSize:13,color:muted,lineHeight:1.6}}>{c.desc}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/dashboard" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 32px',borderRadius:12,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)',display:'inline-block'}}>
            {t.accederPanel}
          </a>
          <a href="/simulador" style={{background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,padding:'14px 32px',borderRadius:12,fontSize:15,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
            {t.simulador}
          </a>
        </div>
      </section>

      {/* Ecosistema */}
      <section id="ecosistema" style={{padding:'80px 32px',background:dark?'rgba(255,255,255,0.01)':'rgba(0,0,0,0.02)',borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`}}>
        <div style={{maxWidth:1000,margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:36,fontWeight:900,letterSpacing:'-0.02em',marginBottom:16,color:text}}>{t.ecosistemaH2}</h2>
          <p style={{fontSize:15,color:muted,marginBottom:48}}>{t.ecosistemaDesc}</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16}}>
            {t.tesis.map((s: any) => (
              <div key={s.label} style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'20px'}}>
                <div style={{fontSize:10,color:muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>{s.label}</div>
                <div style={{fontSize:13,fontWeight:600,lineHeight:1.5,color:text}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section id="equipo" style={{padding:'80px 32px',maxWidth:700,margin:'0 auto',textAlign:'center'}}>
        <h2 style={{fontSize:36,fontWeight:900,letterSpacing:'-0.02em',marginBottom:48,color:text}}>{t.equipoH2}</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:24}}>
          {t.founders.map((p: any) => (
            <div key={p.nombre} style={{background:card,border:`1px solid ${border}`,borderRadius:16,padding:'24px'}}>
              <img src={p.img} alt={p.nombre} style={{width:80,height:80,borderRadius:'50%',objectFit:'cover',margin:'0 auto 16px',display:'block',filter:'grayscale(20%)',border:'2px solid rgba(34,197,94,0.3)'}} />
              <div style={{fontSize:15,fontWeight:800,marginBottom:4,color:text}}>{p.nombre}</div>
              <div style={{fontSize:11,color:'#22c55e',marginBottom:12,textTransform:'uppercase',letterSpacing:'0.05em'}}>{p.rol}</div>
              <div style={{fontSize:12,color:muted,lineHeight:1.6}}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMUNIDAD */}
      <section id="comunidad" style={{padding:'80px 32px',background:dark?'rgba(34,197,94,0.02)':'rgba(34,197,94,0.04)',borderTop:`1px solid rgba(34,197,94,0.1)`,borderBottom:`1px solid rgba(34,197,94,0.1)`}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{fontSize:12,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:12}}>🌿 Olivia</div>
            <h2 style={{fontSize:36,fontWeight:900,letterSpacing:'-0.02em',margin:'0 0 12px',color:text}}>{t.comunidadH2}</h2>
            <p style={{fontSize:15,color:muted,margin:0}}>{t.comunidadDesc}</p>
          </div>

          {posts.length===0?(
            <div style={{textAlign:'center',padding:'40px 0',color:muted}}>
              <div style={{fontSize:32,marginBottom:12}}>🌿</div>
              <div style={{fontSize:14}}>Cargando acciones de la comunidad...</div>
            </div>
          ):(
            <div style={{display:'grid',gap:16}}>
              {posts.map((post:any)=>(
                <div key={post.id} style={{background:card,border:`1px solid ${border}`,borderRadius:16,padding:20,position:'relative'}}>
                  <div style={{display:'flex',gap:10,marginBottom:12,alignItems:'center'}}>
                    <div style={{width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#22c55e,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,color:'white',flexShrink:0}}>
                      {post.usuarios?.nombre?.[0]}{post.usuarios?.apellido?.[0]}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:text}}>{post.usuarios?.nombre} {post.usuarios?.apellido}</div>
                      <div style={{fontSize:10,color:muted}}>{tiempoRelativo(post.created_at)} · +{post.olv_ganados} OLV</div>
                    </div>
                    <span style={{fontSize:16}}>🌿</span>
                  </div>
                  {post.contenido&&<div style={{fontSize:13,lineHeight:1.6,color:text,marginBottom:post.foto_url?12:0}}>{post.contenido}</div>}
                  {post.foto_url&&<img src={post.foto_url} alt="" style={{width:'100%',borderRadius:10,maxHeight:300,objectFit:'cover'}} />}
                  {/* CTA overlay para interactuar */}
                  <div style={{display:'flex',gap:12,marginTop:12}}>
                    <a href="/login" style={{background:'transparent',border:'none',color:muted,fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:4,textDecoration:'none'}}>
                      ❤️ <span>Me importa</span>
                    </a>
                    <a href="/login" style={{background:'transparent',border:'none',color:muted,fontSize:12,cursor:'pointer',display:'flex',alignItems:'center',gap:4,textDecoration:'none'}}>
                      💬 <span>Comentar</span>
                    </a>
                    <a href="/registro" style={{marginLeft:'auto',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:16,padding:'4px 12px',color:'#22c55e',fontSize:11,fontWeight:700,textDecoration:'none'}}>
                      + Unirse
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{textAlign:'center',marginTop:40,display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/comunidad" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 32px',borderRadius:12,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)'}}>
              {t.comunidadCTA}
            </a>
            <a href="/registro" style={{background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,padding:'14px 32px',borderRadius:12,fontSize:15,fontWeight:700,textDecoration:'none'}}>
              {t.comunidadUnirse}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{padding:'32px',borderTop:`1px solid ${border}`,textAlign:'center'}}>
        <div style={{fontSize:12,color:muted,marginBottom:16}}>{t.copyright}</div>
        <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginBottom:12}}>
          <a href="/dashboard" style={{fontSize:12,color:muted,textDecoration:'none'}}>{t.footer.panel}</a>
          <a href="/simulador" style={{fontSize:12,color:'#22c55e',textDecoration:'none',fontWeight:600}}>{t.footer.simulador}</a>
          <a href="/registrar" style={{fontSize:12,color:muted,textDecoration:'none'}}>{t.footer.registrar}</a>
          <a href="/onepager" style={{fontSize:12,color:'#f59e0b',textDecoration:'none',fontWeight:600}}>{t.footer.onepager}</a>
          <a href="https://circulab-ciudadano.vercel.app/circulab-whitepaper.html" target="_blank" style={{fontSize:12,color:muted,textDecoration:'none'}}>{t.footer.whitepaper}</a>
          <a href="mailto:contacto@circulab.com.ar" style={{fontSize:12,color:muted,textDecoration:'none'}}>{t.footer.contacto}</a>
        </div>
        <div style={{fontSize:11,color:muted}}>contacto@circulab.com.ar</div>
      </footer>

    </main>
  )
}
