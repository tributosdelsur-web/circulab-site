export default function Home() {
  return (
    <main style={{background:'#0a0e1a',minHeight:'100vh',fontFamily:'system-ui,sans-serif',color:'#f1f5f9'}}>
      
      {/* Nav */}
      <nav style={{padding:'16px 32px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,background:'rgba(10,14,26,0.95)',backdropFilter:'blur(10px)',zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14}}>C</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,letterSpacing:'0.04em'}}>CIRCULAB</div>
            <div style={{fontSize:9,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.1em'}}>TECH</div>
          </div>
        </div>
        <div style={{display:'flex',gap:24,alignItems:'center'}}>
          <a href="#ecosistema" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>Ecosistema</a>
          <a href="#producto" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>Producto</a>
          <a href="#equipo" style={{fontSize:13,color:'#64748b',textDecoration:'none'}}>Equipo</a>
          <a href="/dashboard" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'8px 18px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',boxShadow:'0 0 20px rgba(34,197,94,0.3)'}}>Acceder al Panel →</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{padding:'100px 32px',textAlign:'center',maxWidth:800,margin:'0 auto'}}>
        <div style={{display:'inline-block',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'6px 16px',fontSize:12,color:'#22c55e',fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:24}}>
          Distrito IA · CABA · Ley Economía del Conocimiento
        </div>
        <h1 style={{fontSize:52,fontWeight:900,lineHeight:1.1,letterSpacing:'-0.03em',margin:'0 0 24px'}}>
          Tu basura vale <span style={{color:'#22c55e'}}>USD</span>.<br/>
          Tu palabra, <span style={{color:'#3b82f6'}}>historial crediticio</span>.<br/>
          Tu música, <span style={{color:'#a855f7'}}>capital hoy</span>.
        </h1>
        <p style={{fontSize:18,color:'#64748b',lineHeight:1.6,marginBottom:40,maxWidth:600,margin:'0 auto 40px'}}>
          Circulab es un motor de confianza ciudadana. Validamos actos de responsabilidad con IA para convertirlos en activos reales.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/dashboard" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 32px',borderRadius:12,fontSize:16,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)'}}>
            Ver el Panel →
          </a>
          <a href="/registrar" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',padding:'14px 32px',borderRadius:12,fontSize:16,fontWeight:700,textDecoration:'none'}}>
            Registrar residuo
          </a>
        </div>
      </section>

      {/* Producto */}
      <section id="producto" style={{padding:'80px 32px',maxWidth:1000,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <div style={{fontSize:12,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:12}}>El producto existe</div>
          <h2 style={{fontSize:36,fontWeight:900,letterSpacing:'-0.02em',margin:0}}>Así se ve tu identidad<br/>financiera digital</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16,marginBottom:40}}>
          {[
            {icon:'🌿',title:'Olivia Circular',desc:'Registrás tus residuos, la IA los valida, recibís tokens OLV y créditos de carbono.',color:'#22c55e'},
            {icon:'👥',title:'Quincena · PULSO',desc:'Tu rosca informal se convierte en historial crediticio blockchain verificable.',color:'#3b82f6'},
            {icon:'🎵',title:'Art of Money',desc:'Tus regalías de Spotify, YouTube y SADAIC como garantía para adelantos de capital.',color:'#a855f7'},
          ].map(c => (
            <div key={c.title} style={{background:'#111827',border:`1px solid ${c.color}22`,borderRadius:16,padding:'24px',borderTop:`3px solid ${c.color}`}}>
              <div style={{fontSize:32,marginBottom:12}}>{c.icon}</div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:8}}>{c.title}</div>
              <div style={{fontSize:13,color:'#64748b',lineHeight:1.6}}>{c.desc}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center'}}>
          <a href="/dashboard" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px 32px',borderRadius:12,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.3)',display:'inline-block'}}>
            Acceder al Panel completo →
          </a>
        </div>
      </section>

      {/* Ecosistema */}
      <section id="ecosistema" style={{padding:'80px 32px',background:'rgba(255,255,255,0.01)',borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{maxWidth:1000,margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:36,fontWeight:900,letterSpacing:'-0.02em',marginBottom:16}}>Ecosistema Ciudadano</h2>
          <p style={{fontSize:15,color:'#64748b',marginBottom:48}}>Tres verticales que se retroalimentan y generan un efecto de red único.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16}}>
            {[
              {label:'Tesis',v:'Motor de confianza ciudadana del Sur Global'},
              {label:'Tecnología',v:'Computer Vision · Blockchain · ReFi · RWA'},
              {label:'Mercado',v:'Argentina · México · Corredor LATAM'},
              {label:'Marco legal',v:'Ley 27.506 · Distrito IA CABA'},
            ].map(s => (
              <div key={s.label} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'20px'}}>
                <div style={{fontSize:10,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>{s.label}</div>
                <div style={{fontSize:13,fontWeight:600,lineHeight:1.5}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section id="equipo" style={{padding:'80px 32px',maxWidth:700,margin:'0 auto',textAlign:'center'}}>
        <h2 style={{fontSize:36,fontWeight:900,letterSpacing:'-0.02em',marginBottom:48}}>El equipo</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:24}}>
          {[
            {nombre:'Juan Pablo Sanguinetti',rol:'Founder & Vision Lead',desc:'Abogado experto en tributario, medio ambiente y propiedad intelectual. Arquitecto del motor de confianza ciudadana.'},
            {nombre:'Mileidy Zapata',rol:'Co-Founder & Ops Lead',desc:'Experta en branding y gestión operativa. Su enfoque en la economía del cuidado garantiza impacto humano real.'},
          ].map(p => (
            <div key={p.nombre} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'24px'}}>
              <div style={{width:60,height:60,borderRadius:'50%',background:'linear-gradient(135deg,rgba(34,197,94,0.2),rgba(59,130,246,0.2))',border:'1px solid rgba(34,197,94,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,margin:'0 auto 16px',color:'#22c55e'}}>
                {p.nombre.split(' ').map(n=>n[0]).slice(0,2).join('')}
              </div>
              <div style={{fontSize:15,fontWeight:800,marginBottom:4}}>{p.nombre}</div>
              <div style={{fontSize:11,color:'#22c55e',marginBottom:12,textTransform:'uppercase',letterSpacing:'0.05em'}}>{p.rol}</div>
              <div style={{fontSize:12,color:'#64748b',lineHeight:1.6}}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{padding:'32px',borderTop:'1px solid rgba(255,255,255,0.06)',textAlign:'center'}}>
        <div style={{fontSize:12,color:'#64748b',marginBottom:12}}>Circulab Tech © 2026 · Distrito IA CABA</div>
        <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/dashboard" style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>Panel</a>
          <a href="/registrar" style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>Registrar residuo</a>
          <a href="https://circulab-ciudadano.vercel.app/circulab-whitepaper.html" target="_blank" style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>Whitepaper</a>
          <a href="mailto:contacto@circulab.tech" style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>Contacto</a>
        </div>
      </footer>

    </main>
  )
}
