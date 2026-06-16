'use client'
import { usePathname } from 'next/navigation'

export default function FooterOlivia({dark=true}:{dark?:boolean}) {
  const bg = dark ? '#050505' : '#0a0a0a'
  const text = dark ? '#f1f5f9' : '#f1f5f9'
  const sub = '#64748b'
  const border = 'rgba(255,255,255,0.06)'
  const accent = '#22c55e'

  return (
    <footer style={{background:bg,borderTop:`1px solid ${border}`,padding:'40px 24px 24px',marginTop:'auto'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>

        {/* Logo + nombre */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:32,gap:8}}>
          <a href="/" style={{textDecoration:'none',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
            <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:48,height:48,objectFit:'contain',borderRadius:8}} />
            <div style={{fontSize:11,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.1em',textAlign:'center'}}>OLIVIA Circulab</div>
          </a>
          <div style={{fontSize:9,color:sub,textAlign:'center',maxWidth:400,lineHeight:1.6,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.05em'}}>
            Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental
          </div>
        </div>

        {/* 3 columnas */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,marginBottom:32}}>
          
          {/* Columna 1 - Plataforma */}
          <div>
            <div style={{fontSize:9,fontWeight:700,color:accent,textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:12,fontFamily:'monospace'}}>Plataforma</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {label:'🌿 Inicio',href:'/'},
                {label:'👤 Ciudadano',href:'/ciudadano'},
                {label:'🏛️ Inversionistas',href:'/institucional'},
                {label:'🧮 Simulador',href:'/simulador'},
              ].map(l=>(
                <a key={l.href} href={l.href} style={{fontSize:11,color:sub,textDecoration:'none',transition:'color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.color=accent}
                  onMouseLeave={e=>e.currentTarget.style.color=sub}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2 - Documentos */}
          <div>
            <div style={{fontSize:9,fontWeight:700,color:'#3b82f6',textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:12,fontFamily:'monospace'}}>Documentos</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {label:'📄 Whitepaper',href:'/whitepaper'},
                {label:'📋 One Pager',href:'/onepager'},
                {label:'📊 Pitch Deck',href:'/pitch'},
              ].map(l=>(
                <a key={l.href} href={l.href} style={{fontSize:11,color:sub,textDecoration:'none',transition:'color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.color='#3b82f6'}
                  onMouseLeave={e=>e.currentTarget.style.color=sub}>
                  {l.label}
                </a>
              ))}
              <div style={{marginTop:4,padding:'6px 10px',background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:8,fontSize:9,color:'#3b82f6',lineHeight:1.5}}>
                Whitepaper y Pitch requieren NDA
              </div>
            </div>
          </div>

          {/* Columna 3 - Legal */}
          <div>
            <div style={{fontSize:9,fontWeight:700,color:sub,textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:12,fontFamily:'monospace'}}>Legal y contacto</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {label:'📜 Términos',href:'/terminos'},
                {label:'🔒 Privacidad',href:'/privacidad'},
                {label:'✉️ hola@oliviacirculab.com.ar',href:'mailto:hola@oliviacirculab.com.ar'},
              ].map(l=>(
                <a key={l.href} href={l.href} style={{fontSize:11,color:sub,textDecoration:'none',transition:'color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.color=text}
                  onMouseLeave={e=>e.currentTarget.style.color=sub}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{borderTop:`1px solid ${border}`,paddingTop:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <div style={{fontSize:9,color:sub,fontFamily:'monospace'}}>
            © 2026 Circulab Tech · Ley 27.506 · Distrito IA Buenos Aires
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <span style={{fontSize:9,color:sub,fontFamily:'monospace'}}>🌱 Semilla 2026</span>
            <span style={{fontSize:9,color:'rgba(255,255,255,0.1)'}}>·</span>
            <span style={{fontSize:9,color:accent,fontFamily:'monospace'}}>✅ Verra validó dMRV · Feb 2026</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
