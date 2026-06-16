// SCRIPT 07 — One Pager: gate al entrar antes de ver contenido
const fs = require('fs');
let c = fs.readFileSync('app/onepager/page.tsx', 'utf8');

// ═══ Mover el gate al inicio — antes de ver cualquier contenido ═══
// El one pager ya tiene gate pero solo al descargar
// Hay que hacer que el gate aparezca AL ENTRAR

// Verificar si ya tiene gate al inicio
if (c.includes('gateOk') && !c.includes('if(!gateOk) return (')) {
  // Agregar el return del gate al inicio del componente
  // Buscar donde está la lógica del gate actual
  c = c.replace(
    'if(!gateOk) { setShowGate(true); return }',
    '// gate moved to render'
  );

  // Agregar el gate como primer render
  const gateRender = `
  // Gate al entrar — antes de ver contenido
  if(!gateOk) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
      <div style={{maxWidth:400,width:'100%',background:'#111827',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:32}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <a href="/">
            <img src="/logoOC.png" alt="OLIVIA" style={{width:48,height:48,objectFit:'contain',borderRadius:8,marginBottom:12}} />
          </a>
          <div style={{fontSize:16,fontWeight:900,color:'#f1f5f9',marginBottom:4}}>One Pager · OLIVIA Circulab</div>
          <div style={{fontSize:12,color:'#64748b'}}>Dejá tus datos para acceder</div>
        </div>
        <input value={gateNombre} onChange={e=>setGateNombre(e.target.value)}
          placeholder="Tu nombre completo"
          style={{width:'100%',padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:10}} />
        <input value={gateEmail} onChange={e=>setGateEmail(e.target.value)}
          placeholder="Tu email"
          type="email"
          style={{width:'100%',padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:16}} />
        <button onClick={async()=>{
          if(!gateEmail) return
          await supabase.from('onepager_descargas').insert({nombre:gateNombre,email:gateEmail,tipo:'acceso'})
          setGateOk(true)
        }} style={{width:'100%',background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'12px',color:'white',fontSize:13,fontWeight:700,cursor:'pointer'}}>
          Ver One Pager →
        </button>
        <div style={{marginTop:12,fontSize:10,color:'#64748b',textAlign:'center',lineHeight:1.6}}>
          Al continuar aceptás no compartir este documento sin autorización de Circulab Tech.
        </div>
      </div>
    </div>
  )

`;

  // Insertar el gate render antes del return principal
  c = c.replace(
    'return (\n    <div',
    gateRender + 'return (\n    <div'
  );
  console.log('✅ Gate al entrar agregado en One Pager');
} else if (c.includes('if(!gateOk) return (')) {
  console.log('ℹ️  Gate al entrar ya existe en One Pager');
} else {
  console.log('⚠️  Estructura del gate no encontrada - revisar manualmente');
}

// ═══ Agregar botón PDF después del gate ═══
if (!c.includes('html2pdf') && !c.includes('window.print')) {
  // Agregar botón de descarga PDF al final del contenido visible
  c = c.replace(
    '</div>\n  )\n}',
    `        {/* BOTON DESCARGA PDF */}
        <div style={{textAlign:'center',padding:'24px 0',marginTop:16}}>
          <button onClick={()=>window.print()} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:30,padding:'12px 28px',color:'white',fontSize:13,fontWeight:700,cursor:'pointer'}}>
            📥 Descargar PDF
          </button>
          <div style={{fontSize:10,color:'#64748b',marginTop:8}}>Usá Ctrl+P o Cmd+P → Guardar como PDF</div>
        </div>
</div>
  )
}`
  );
  console.log('✅ Botón PDF agregado en One Pager');
}

fs.writeFileSync('app/onepager/page.tsx', c);
console.log('✅ Script 07 onepager completado');
