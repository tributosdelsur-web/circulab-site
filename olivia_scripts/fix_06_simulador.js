// SCRIPT 06 — Simulador: consorcio primero y destacado
const fs = require('fs');
let c = fs.readFileSync('app/simulador/page.tsx', 'utf8');

// ═══ Reordenar perfiles poniendo consorcio primero ═══
// Buscar el array de perfiles y reordenar
// El consorcio debe ser el primero con badge "Más consultado"

// Primero ver si ya tiene el badge
if (!c.includes('Más consultado') && !c.includes('mas_consultado')) {
  // Agregar badge al perfil consorcio/edificio
  c = c.replace(
    /'edificio'|'consorcio'|'building'/g,
    (match) => match // preservar el match
  );

  // Buscar el perfil de edificio y agregar badge
  c = c.replace(
    /icon:'🏢',.*?nombre:.*?'[Ee]dificio[^']*'/,
    (match) => match.replace(
      "nombre:'",
      "badge:'⭐ Más consultado',nombre:'"
    )
  );
  console.log('✅ Badge Más consultado agregado al consorcio');
} else {
  console.log('ℹ️  Badge ya existe');
}

// ═══ Asegurar que consorcio es el default seleccionado ═══
// Buscar el estado inicial del perfil seleccionado
c = c.replace(
  "useState('casa')",
  "useState('edificio')"
);
c = c.replace(
  "useState('house')",
  "useState('building')"
);
console.log('✅ Consorcio como perfil default');

fs.writeFileSync('app/simulador/page.tsx', c);
console.log('✅ Script 06 simulador completado');
