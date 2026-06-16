// SCRIPT 08 — Whitepaper: sección 16 riesgos Verra Feb 2026 + botón PDF
const fs = require('fs');
let c = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');

// ═══ 1. Sección 16 — Riesgos: bajar de ALTO a MEDIO ═══
// Buscar la sección de riesgos
const riesgoViejo_es = "riesgo.*certificaci.*ALTO";
const riesgoViejo_en = "risk.*certif.*HIGH";

// Reemplazar el nivel del riesgo de certificación
c = c.replace(
  /Riesgo.*?certificaci[oó]n.*?Verra.*?ALTO/gi,
  'Riesgo certificación Verra: 🟡 MEDIO (actualizado Feb 2026)'
);
c = c.replace(
  /Certification.*?risk.*?HIGH/gi,
  'Certification risk: 🟡 MEDIUM (updated Feb 2026)'
);

// Agregar la explicación del hito Verra Feb 2026 en la sección de riesgos
if (!c.includes('dMRV de alta frecuencia') || !c.includes('MEDIO')) {
  // Buscar la sección de riesgos por el número de sección
  c = c.replace(
    /if\(seccion===15\) return \(/,
    `if(seccion===15) return (`
  );

  // Agregar mitigación Verra en la sección correcta
  // Buscamos el texto del riesgo de certificación y agregamos la mitigación
  c = c.replace(
    "riesgo: 'Certificación Verra no aprobada'",
    "riesgo: 'Certificación Verra · 🟡 MEDIO (actualizado Feb 2026)'"
  );
  c = c.replace(
    "riesgo: 'Verra certification not approved'",
    "riesgo: 'Verra Certification · 🟡 MEDIUM (updated Feb 2026)'"
  );

  console.log('✅ Riesgo certificación actualizado ALTO → MEDIO');
} else {
  console.log('ℹ️  Sección de riesgos ya actualizada');
}

// ═══ 2. Agregar sección nueva de mitigación Verra ═══
// Buscar donde están los riesgos y agregar la explicación
const mitigacionVerra = `
{lang==='es'?(
  <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginTop:12}}>
    <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8}}>
      ✅ Mitigación clave · Hito Verra Feb 2026
    </div>
    <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.7}}>
      En febrero de 2026 Verra aprobó los primeros créditos bajo metodología dMRV de alta frecuencia — exactamente el modelo que OLIVIA implementa desde el día 1. Este precedente técnico cambia fundamentalmente el perfil de riesgo: el método ya fue validado por Verra, existe un caso aprobado documentado, y el riesgo pasó de ser de validez del método a ser de ejecución y escala. OLIVIA opera como PoA (Programme of Activities) lo que reduce el costo de auditoría y hace viable la escala mínima de ~500t/año requerida para certificación formal.
    </div>
  </div>
):(
  <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginTop:12}}>
    <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8}}>
      ✅ Key Mitigation · Verra Feb 2026 Milestone
    </div>
    <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.7}}>
      In February 2026 Verra approved the first credits under high-frequency dMRV methodology — exactly the model OLIVIA implements from day one. This technical precedent fundamentally changes the risk profile: the method has been validated by Verra, a documented approved case exists, and risk moved from method validity to execution and scale. OLIVIA operates as a PoA (Programme of Activities) reducing audit costs and making viable the minimum scale of ~500t/year required for formal certification.
    </div>
  </div>
)}
`;

// Insertar después de la descripción del riesgo de certificación
c = c.replace(
  /{t:'Dependencia regulatoria'/,
  mitigacionVerra + `{t:'Dependencia regulatoria'`
);

// ═══ 3. Botón PDF visible en whitepaper ═══
if (!c.includes('window.print') && !c.includes('Descargar PDF')) {
  c = c.replace(
    "return (\n    <div",
    `return (
    <div`
  );
  // Agregar botón flotante de PDF
  const botonPDF = `
      {/* BOTON PDF FLOTANTE */}
      <div style={{position:'fixed',bottom:20,right:20,zIndex:100}}>
        <button onClick={()=>window.print()} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:30,padding:'10px 20px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 20px rgba(34,197,94,0.3)'}}>
          📥 {lang==='es'?'Descargar PDF':'Download PDF'}
        </button>
      </div>
`;
  // Insertar al inicio del return
  c = c.replace(
    '<div style={s.wrap}>',
    botonPDF + '<div style={s.wrap}>'
  );
  console.log('✅ Botón PDF agregado en whitepaper');
}

fs.writeFileSync('app/whitepaper/page.tsx', c);
console.log('✅ Script 08 whitepaper completado');
