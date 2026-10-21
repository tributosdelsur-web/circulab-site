'use client'
import Link from 'next/link'
// Footer tipo del sitio (misma estructura que el del landing).
export default function SitioFooter({ es = true, text = '#eef5f0', sub = '#9fb3a6', border = 'rgba(134,239,172,.15)' }: { es?: boolean; text?: string; sub?: string; border?: string }) {
  return (
      <footer style={{borderTop:'1px solid '+border,padding:'40px 24px 32px',textAlign:'center'}}>
        <Link href="/" style={{display:'block',marginBottom:10}}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:52,height:52,objectFit:'contain',display:'block',margin:'0 auto'}} />
        </Link>
        <div style={{fontSize:13,fontWeight:800,color:text,marginBottom:6}}>OLIVIA Circulab</div>
        <div style={{fontSize:10,color:sub,lineHeight:1.6,maxWidth:400,margin:'0 auto 18px'}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',maxWidth:600,margin:'0 auto 14px'}}>
          {[
            {l:es?'Ciudadano':'Citizen',h:'/ciudadano',c:'#22c55e'},
            {l:'Metamorfosis',h:'/metamorfosis',c:'#22c55e'},
            {l:'Consorcios',h:'/consorcios',c:'#3b82f6'},
            {l:es?'Grandes Generadores':'Large Generators',h:'/grandes-generadores',c:'#ef4444'},
            {l:es?'Plantas y acopiadores':'Plants & collectors',h:'/operadores',c:'#3b82f6'},
            {l:'RAEE',h:'/raee',c:'#9333ea'},
            {l:es?'Mapa':'Map',h:'/mapa',c:'#0284c7'},
            {l:es?'Orgánicos':'Organics',h:'/organicos',c:'#92400e'},
            {l:'Kits',h:'/kits',c:'#f59e0b'},
            {l:es?'Inversores':'Investors',h:'/inversion',c:'#f59e0b'},
          ].map(n=>(
            <Link key={n.h} href={n.h} style={{fontSize:11,color:n.c,textDecoration:'none',fontWeight:700}}>{n.l}</Link>
          ))}
        </div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',maxWidth:600,margin:'0 auto 16px'}}>
          {[
            {l:'Whitepaper',h:'/whitepaper'},
            {l:es?'Calculadora':'Calculator',h:'/ahorro'},
            {l:'One Pager',h:'/onepager'},
            {l:es?'Institucional':'About us',h:'/institucional'},
            {l:'Pitch',h:'/pitch'},
            {l:es?'Equipo':'Team',h:'/equipo'},
            {l:es?'Alianzas':'Partners',h:'/alianzas'},
            {l:'NDA',h:'/nda'},
          ].map(n=>(
            <Link key={n.h} href={n.h} style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.75}}>{n.l}</Link>
          ))}
        </div>
        <div style={{fontSize:11,color:sub,marginBottom:10}}>hola@oliviacirculab.com.ar</div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:10}}>
          <Link href="/terminos" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>{es?'Términos':'Terms'}</Link>
          <Link href="/privacidad" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>{es?'Privacidad':'Privacy'}</Link>
          <a href="https://www.linkedin.com/company/113160128/" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>LinkedIn</a>
        </div>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',letterSpacing:'0.05em',opacity:0.7}}>© 2026 Circulab Tech · Buenos Aires, Argentina</div>
      </footer>
  )
}
