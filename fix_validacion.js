const fs = require('fs');

const CITA = {
  es: '"Si OLIVIA se apalanca en infraestructura inteligente y digitaliza el impacto para el mercado financiero, el techo no existe. La clave está en la velocidad de ejecución y en cerrar contratos corporativos clave antes de que sature la competencia."',
  en: '"If OLIVIA leverages intelligent infrastructure and digitalizes impact for the financial market, there is no ceiling. The key is execution speed and closing key corporate contracts before the market saturates."',
  autor: '— Análisis independiente de inversor · Junio 2026',
}

// === INSTITUCIONAL — agregar en sección Por qué ahora ===
let inst = fs.readFileSync('app/institucional/page.tsx', 'utf8');

if (!inst.includes('techo no existe') && !inst.includes('ceiling')) {
  const cardValidacion = `
              {/* VALIDACION EXTERNA */}
              <div key="validacion" style={{background:card,border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
                <div style={{fontSize:20,marginBottom:8}}>💬</div>
                <div style={{fontSize:12,fontWeight:700,color:'#f59e0b',marginBottom:6}}>
                  {es?'Validación estratégica · Junio 2026':'Strategic validation · June 2026'}
                </div>
                <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:8,fontStyle:'italic'}}>
                  {es?'${CITA.es}':'${CITA.en}'}
                </p>
                <div style={{fontSize:10,color:'#64748b',fontWeight:600}}>${CITA.autor}</div>
              </div>
`;

  // Insertar después del último card de "Por qué ahora"
  inst = inst.replace(
    `{/* POSICIONAMIENTO COMPETITIVO */}`,
    `{/* VALIDACION EXTERNA INVERSOR */}
      <section style={{padding:'0 24px 32px',maxWidth:800,margin:'0 auto'}}>
        <div style={{background:'rgba(245,158,11,0.04)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:16,padding:'24px'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#f59e0b',marginBottom:12}}>[ {es?'Lo que dicen quienes lo analizan':'What analysts say'} ]</div>
          <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
            <div style={{fontSize:40,flexShrink:0,lineHeight:1}}>"</div>
            <div>
              <p style={{fontSize:14,color:sub,lineHeight:1.8,marginBottom:12,fontStyle:'italic'}}>
                {es?'Si OLIVIA se apalanca en infraestructura inteligente y digitaliza el impacto para el mercado financiero, el techo no existe. La clave está en la velocidad de ejecución y en cerrar contratos corporativos clave antes de que sature la competencia.':'If OLIVIA leverages intelligent infrastructure and digitalizes impact for the financial market, there is no ceiling. The key is execution speed and closing key corporate contracts before the market saturates.'}
              </p>
              <div style={{fontSize:11,color:'#f59e0b',fontWeight:700}}>— ${CITA.autor}</div>
              <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
                {[
                  es?'✅ Verra validó dMRV · Feb 2026':'✅ Verra validated dMRV · Feb 2026',
                  es?'✅ USD 0 inversión externa':'✅ USD 0 external investment',
                  es?'✅ Producto activo hoy':'✅ Product active today',
                ].map((b,i)=>(
                  <span key={i} style={{fontSize:10,color:'#22c55e',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:20,padding:'4px 10px',fontWeight:700}}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSICIONAMIENTO COMPETITIVO */}`
  );

  fs.writeFileSync('app/institucional/page.tsx', inst);
  console.log('OK Institucional: validación externa agregada');
} else {
  console.log('-- Institucional: ya tiene la cita');
}

// === WHITEPAPER — agregar en resumen ejecutivo ===
let wp = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');

if (!wp.includes('techo no existe') && !wp.includes('ceiling')) {
  wp = wp.replace(
    "if(seccion===0) return (",
    `if(seccion===0) return (`
  );

  // Buscar el highlight del resumen ejecutivo y agregar la cita al final
  wp = wp.replace(
    `if(seccion===1) return (`,
    `// Cita validacion externa inyectada en seccion 0
if(seccion===0) {
  // se maneja abajo
}

if(seccion===1) return (`
  );

  // Agregar la cita dentro de la sección 0 antes del cierre
  wp = wp.replace(
    `if(seccion===1) return (
// Cita validacion externa inyectada en seccion 0`,
    `if(seccion===1) return (`
  );

  // Forma más simple: buscar el return de seccion 0 y agregar antes del cierre
  const citaWP = `
    <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:12,padding:'16px',marginTop:16}}>
      <div style={{fontSize:10,fontWeight:700,color:'#f59e0b',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.08em'}}>
        {lang==='es'?'Validación estratégica externa · Junio 2026':'External strategic validation · June 2026'}
      </div>
      <p style={{fontSize:12,color:'#94a3b8',lineHeight:1.8,fontStyle:'italic',marginBottom:8}}>
        {lang==='es'
          ? '"Si OLIVIA se apalanca en infraestructura inteligente y digitaliza el impacto para el mercado financiero, el techo no existe. La clave está en la velocidad de ejecución y en cerrar contratos corporativos clave antes de que sature la competencia."'
          : '"If OLIVIA leverages intelligent infrastructure and digitalizes impact for the financial market, there is no ceiling. The key is execution speed and closing key corporate contracts before the market saturates."'}
      </p>
      <div style={{fontSize:10,color:'#f59e0b',fontWeight:600}}>— Análisis independiente de inversor · Junio 2026</div>
      <div style={{marginTop:10,fontSize:11,color:'#64748b',lineHeight:1.6}}>
        {lang==='es'
          ? 'Esta ronda Seed financia exactamente eso: velocidad de desarrollo tecnológico (CTO) y capacidad comercial para cerrar contratos corporativos antes de que la competencia llegue.'
          : 'This Seed round funds exactly that: technological development speed (CTO) and commercial capacity to close corporate contracts before competition arrives.'}
      </div>
    </div>
`;

  // Insertar antes del cierre de la seccion 0
  wp = wp.replace(
    `)\n\nif(seccion===1) return (`,
    citaWP + `)\n\nif(seccion===1) return (`
  );

  fs.writeFileSync('app/whitepaper/page.tsx', wp);
  console.log('OK Whitepaper: cita de validacion agregada en resumen ejecutivo');
} else {
  console.log('-- Whitepaper: ya tiene la cita');
}

console.log('');
console.log('Validacion externa implementada en:');
console.log('  · /institucional: seccion destacada entre Por que ahora y Posicionamiento');
console.log('  · /whitepaper: resumen ejecutivo seccion 0');
