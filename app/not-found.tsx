import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:24,padding:24,fontFamily:'system-ui'}}>
      <img src="/logoOC.png" alt="OLIVIA" style={{width:64,height:64,objectFit:'contain',borderRadius:12}} />
      <div style={{fontSize:80,fontWeight:900,color:'rgba(34,197,94,0.2)',lineHeight:1}}>404</div>
      <div style={{fontSize:22,fontWeight:800,color:'#f1f5f9',textAlign:'center'}}>
        Esta página no existe
      </div>
      <div style={{fontSize:14,color:'#64748b',textAlign:'center',maxWidth:400,lineHeight:1.7}}>
        Quizás el link está roto o la página fue movida.
        No pasa nada — el planeta sigue esperando.
      </div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
        <Link href="/" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:30,padding:'12px 24px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
          Volver al inicio
        </Link>
        <Link href="/ciudadano" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:30,padding:'12px 24px',color:'#f1f5f9',fontSize:13,fontWeight:700,textDecoration:'none'}}>
          Ir a Ciudadano
        </Link>
      </div>
      <div style={{fontSize:10,color:'#334155',fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.1em'}}>
        © 2026 Circulab Tech · oliviacirculab.com.ar
      </div>
    </div>
  )
}
