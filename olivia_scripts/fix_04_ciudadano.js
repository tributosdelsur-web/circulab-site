// SCRIPT 04 — Ciudadano: sacar porcentajes, agregar última milla
const fs = require('fs');
let c = fs.readFileSync('app/ciudadano/page.tsx', 'utf8');

// ═══ 1. Sacar porcentajes de distribución visibles ═══
// 35% ciudadano visible sin gate
c = c.replace(
  /35% ciudadano generador/g,
  'Una parte proporcional al impacto generado'
);
c = c.replace(
  /35% al ciudadano/g,
  'Participación proporcional al impacto'
);
c = c.replace(
  /50% OLIVIA Circulab · 35% ciudadano · 10% recolector · 5% reserva/g,
  'Distribuido entre ciudadano · recolector · OLIVIA y reserva ecosistema'
);
console.log('✅ Porcentajes de distribución removidos');

// ═══ 2. Agregar sección última milla ═══
if (!c.includes('ltima milla') && !c.includes('Retiro coordinado')) {
  const seccionUltimaMilla = `
          {/* ULTIMA MILLA */}
          <div style={{marginTop:16,background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#3b82f6',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>
              {es?'Próximamente · Retiro coordinado con IA':'Coming soon · AI-coordinated pickup'}
            </div>
            <div style={{fontSize:10,color:'#64748b',marginBottom:12}}>
              {es?'El flujo completo de verificación origen → retiro → destino → pesaje':'Full verification flow origin → pickup → destination → weighing'}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {icon:'📱',step:es?'Solicitás retiro desde la app':'Request pickup from app',color:'#3b82f6'},
                {icon:'🚲',step:es?'Recolector verde más cercano acepta y va':'Nearest green collector accepts and goes',color:'#22c55e'},
                {icon:'📍',step:es?'QR de confirmación en tu puerta':'Confirmation QR at your door',color:'#f59e0b'},
                {icon:'⚖️',step:es?'Pesaje en destino → OLV acreditados automáticamente':'Weighing at destination → OLV auto-credited',color:'#a855f7'},
              ].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:10,alignItems:'center'}}>
                  <span style={{fontSize:18}}>{item.icon}</span>
                  <span style={{fontSize:11,color:item.color,fontWeight:600}}>{item.step}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:10,fontSize:10,color:'#64748b',lineHeight:1.6}}>
              {es?'Trazabilidad completa con 3 puntos GPS. Datos certificables para Verra desde el día 1.':'Full traceability with 3 GPS points. Verra-certifiable data from day 1.'}
            </div>
          </div>
`;
  // Insertar después de la sección de doble crédito de carbono
  c = c.replace(
    `{/* TIPOS DE CLIENTE */}`,
    seccionUltimaMilla + `{/* TIPOS DE CLIENTE */}`
  );
  console.log('✅ Sección última milla agregada');
} else {
  console.log('ℹ️  Última milla ya existe');
}

// ═══ 3. Agregar card RSE/ESG ═══
if (!c.includes('RSE') && !c.includes('ESG')) {
  c = c.replace(
    `{icon:'🌐',t:es?'Municipios':'Municipalities'`,
    `{icon:'🏛️',t:es?'Empresas RSE / ESG':'RSE / ESG Companies',d:es?'Compensación de huella con datos verificables para reportes GRI y SASB. Certificación Verra VCS 2027.':'Carbon footprint compensation with verifiable data for GRI and SASB reports. Verra VCS 2027 certification.',c:'#f59e0b'},
              {icon:'🌐',t:es?'Municipios':'Municipalities'`
  );
  console.log('✅ Card RSE/ESG agregada');
} else {
  console.log('ℹ️  RSE/ESG ya existe');
}

fs.writeFileSync('app/ciudadano/page.tsx', c);
console.log('✅ Script 04 ciudadano completado');
