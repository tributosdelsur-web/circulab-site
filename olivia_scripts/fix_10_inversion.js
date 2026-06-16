// SCRIPT 10 — Estructura de inversión: SAFE + milestone flexible y pro-equipo
const fs = require('fs');

// TONO GENERAL: pro-equipo, flexible, no comprometido
// Los hitos son REFERENCIA, se negocian en conjunto
// Los tramos son INDEPENDIENTES, extension de 30 dias disponible

// === INSTITUCIONAL ===
let inst = fs.readFileSync('app/institucional/page.tsx', 'utf8');

if (!inst.includes('SAFE')) {
  const bloque = `
              <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'20px',marginTop:12}}>
                <div style={{fontSize:11,fontWeight:700,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}}>
                  {es?'Estructuras de inversion disponibles':'Available investment structures'}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:12}}>
                  {[
                    {titulo:es?'Inversion directa':'Direct investment',desc:es?'USD 500K 10% equity Ley 27.506 USD 1 = USD 1.4 efectivos Board seat':'USD 500K 10% equity Law 27.506 USD 1 = USD 1.4 effective Board seat',color:'#22c55e'},
                    {titulo:'SAFE + Cap',desc:es?'Nota convertible YC Cap USD 3-5M 20% descuento proxima ronda Sin vencimiento':'YC convertible note USD 3-5M cap 20% next round discount No expiration',color:'#3b82f6'},
                    {titulo:es?'Por hitos (opcional)':'Milestone-based (optional)',desc:es?'Tramos de capital por traccion real. Hitos y plazos disenados en conjunto. Flexibles y pro-equipo.':'Capital tranches by real traction. Milestones and timelines designed together. Flexible and pro-team.',color:'#a855f7'},
                  ].map((item,i)=>(
                    <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'12px'}}>
                      <div style={{fontSize:11,fontWeight:700,color:item.color,marginBottom:6}}>{item.titulo}</div>
                      <div style={{fontSize:10,color:'#64748b',lineHeight:1.6}}>{item.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.7,fontStyle:'italic',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:10}}>
                  {es
                    ? 'Todas las garantias listadas aplican independientemente de la estructura elegida. Los terminos especificos se negocian en conjunto con el inversor.'
                    : 'All guarantees listed apply regardless of the chosen structure. Specific terms are negotiated together with the investor.'}
                </div>
              </div>
`;

  inst = inst.replace('{/* FIN GARANTIAS */}', bloque + '{/* FIN GARANTIAS */}');
  if (!inst.includes('SAFE')) {
    inst = inst.replace('{/* DOCUMENTOS */}', bloque + '{/* DOCUMENTOS */}');
  }
  fs.writeFileSync('app/institucional/page.tsx', inst);
  console.log('OK Institucional: estructura de inversion agregada');
} else {
  console.log('OK Institucional: ya tenia SAFE');
}

// === INVESTOR CRM en admin ===
let admin = fs.readFileSync('app/admin/page.tsx', 'utf8');

if (!admin.includes('estructura_preferida')) {
  admin = admin.replace(
    "estado:'frio',origen:'linkedin',monto_potencial:'',notas:'',next_step:''})",
    "estado:'frio',origen:'linkedin',monto_potencial:'',estructura_preferida:'por_definir',notas:'',next_step:''})"
  );
  fs.writeFileSync('app/admin/page.tsx', admin);
  console.log('OK Admin CRM: campo estructura_preferida agregado');
} else {
  console.log('OK Admin CRM: ya tenia el campo');
}

console.log('');
console.log('Script 10 completado');
console.log('Tono: pro-equipo, flexible, hitos como referencia negociable');
