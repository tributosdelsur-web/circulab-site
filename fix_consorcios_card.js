const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Agregar card consorcios ANTES del card grandes generadores
const cardGG = `          <a href="/grandes-generadores" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderRadius:16,background:'linear-gradient(135deg,rgba(239,68,68,0.12),rgba(239,68,68,0.06))',border:'2px solid rgba(239,68,68,0.4)',textDecoration:'none'}}>`;

const cardConsorcio = `          <a href="/institucional" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderRadius:16,background:'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(59,130,246,0.06))',border:'2px solid rgba(34,197,94,0.3)',textDecoration:'none'}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontSize:36}}>🏢</span>
              <div>
                <div style={{fontSize:16,fontWeight:900,color:'#22c55e'}}>{es?'Administro un consorcio':'I manage a building'}</div>
                <div style={{fontSize:12,color:sub,marginTop:2}}>{es?'Certificar residuos · Ley Basura Cero · Sin inversión':'Certify waste · Zero Waste Law · No investment'}</div>
              </div>
            </div>
            <span style={{color:'#22c55e',fontSize:20,fontWeight:700}}>→</span>
          </a>
`;

if (c.includes(cardGG) && !c.includes('Administro un consorcio')) {
  c = c.replace(cardGG, cardConsorcio + cardGG);
  console.log('OK card consorcio agregado');
} else {
  console.log('-- ya existe o no encontró el punto de inserción');
}

// 2. Eliminar el bloque suelto de consorcios del fondo
const bloqueViejo = `        <div style={{marginTop:24,padding:'16px',background:`;
// Buscar el bloque exacto de "¿Administrás un consorcio?"
const idxConsorcio = c.indexOf('Administr');
if (idxConsorcio > 0) {
  console.log('Bloque consorcio encontrado en índice: ' + idxConsorcio);
}

// Reemplazar el bloque suelto
c = c.replace(
  /\{\/\* consorcio[\s\S]*?Ver propuesta para consorcios[\s\S]*?<\/div>\s*<\/div>/,
  ''
);

// Intentar con el texto exacto que vemos en el landing
const textoConsorcio = `{es?'¿Administrás un consorcio?':'Managing a building?'}`;
if (c.includes(textoConsorcio)) {
  // Buscar el div contenedor y eliminarlo
  const idx = c.indexOf(textoConsorcio);
  // Encontrar el div de apertura antes
  let inicio = c.lastIndexOf('<div', idx);
  // Encontrar el cierre correspondiente
  let profundidad = 0;
  let fin = inicio;
  for (let i = inicio; i < c.length; i++) {
    if (c.slice(i, i+4) === '<div') profundidad++;
    if (c.slice(i, i+6) === '</div>') {
      profundidad--;
      if (profundidad === 0) { fin = i + 6; break; }
    }
  }
  c = c.slice(0, inicio) + c.slice(fin);
  console.log('OK bloque consorcio suelto eliminado');
}

fs.writeFileSync('app/page.tsx', c);
console.log('Listo');
