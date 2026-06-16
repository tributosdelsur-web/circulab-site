// SCRIPT 03 — Landing: badge Verra Feb 2026 + card B2B + capacidad ociosa
const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

// ═══ 1. Badge Verra Feb 2026 en hero ═══
// Buscar los badges existentes y agregar el nuevo
if (!c.includes('Verra validó dMRV')) {
  c = c.replace(
    "'🚀 USD 0 inversión externa'",
    "'✅ Verra validó dMRV · Feb 2026',\n            '🚀 USD 0 inversión externa'"
  );
  console.log('✅ Badge Verra Feb 2026 agregado');
} else {
  console.log('ℹ️  Badge Verra ya existe');
}

// ═══ 2. Argumento capacidad ociosa ═══
// Agregar después de la sección del problema
if (!c.includes('capacidad ociosa') && !c.includes('35% de su capacidad')) {
  c = c.replace(
    "{es?'Un ecosistema de tres':'An ecosystem of three'}",
    `{es?'Un ecosistema de tres':'An ecosystem of three'}`
  );
  // Insertar sección capacidad ociosa antes del ecosistema
  const seccionOciosa = `
        {/* CAPACIDAD OCIOSA */}
        <section style={{padding:'24px 20px',maxWidth:580,margin:'0 auto',borderTop:'1px solid rgba(34,197,94,0.1)'}}>
          <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:14,padding:'16px 20px',textAlign:'center'}}>
            <div style={{fontSize:11,color:'#22c55e',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>
              {es?'El problema real':'The real problem'}
            </div>
            <p style={{fontSize:13,color:sub,lineHeight:1.7,margin:0}}>
              {es
                ? 'Las plantas de reciclaje de Buenos Aires trabajan al 35% de su capacidad. No porque no haya residuos. Porque el ciudadano no tiene razón económica para separarlos. OLIVIA es esa razón.'
                : 'Buenos Aires recycling plants operate at 35% capacity. Not because there is no waste. Because citizens have no economic reason to separate it. OLIVIA is that reason.'}
            </p>
          </div>
        </section>
`;
  c = c.replace(
    `{/* ECOSISTEMA */}`,
    seccionOciosa + `{/* ECOSISTEMA */}`
  );
  console.log('✅ Sección capacidad ociosa agregada');
} else {
  console.log('ℹ️  Capacidad ociosa ya existe');
}

// ═══ 3. Card B2B administradoras ═══
if (!c.includes('administrador') && !c.includes('Administrás')) {
  const cardB2B = `
        {/* CARD B2B ADMINISTRADORAS */}
        <section style={{padding:'24px 20px',maxWidth:580,margin:'0 auto'}}>
          <div style={{background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'20px'}}>
            <div style={{fontSize:11,color:'#3b82f6',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>
              {es?'¿Administrás un consorcio?':'Do you manage a building?'}
            </div>
            <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:12}}>
              {es
                ? 'OLIVIA ayuda a tu cartera a cumplir con la Ley de Basura Cero, certificar la separación de residuos y generar créditos de carbono verificados. Sin inversión inicial.'
                : 'OLIVIA helps your portfolio comply with waste regulations, certify waste separation and generate verified carbon credits. No upfront investment.'}
            </p>
            <a href="/institucional" style={{display:'inline-block',background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:20,padding:'8px 16px',fontSize:11,fontWeight:700,color:'#3b82f6',textDecoration:'none'}}>
              {es?'Ver propuesta para consorcios →':'View building proposal →'}
            </a>
          </div>
        </section>
`;
  // Insertar antes del footer
  c = c.replace(
    `{/* FOOTER */}`,
    cardB2B + `{/* FOOTER */}`
  );
  console.log('✅ Card B2B administradoras agregada');
} else {
  console.log('ℹ️  Card B2B ya existe');
}

fs.writeFileSync('app/page.tsx', c);
console.log('✅ Script 03 landing completado');
