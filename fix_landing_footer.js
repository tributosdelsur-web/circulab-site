const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

// 1. AGREGAR 3ER CARD en sección "¿Por dónde entrás?"
c = c.replace(
  `href={lang==='es'?'/institucional':'/institucional'}`,
  `href={lang==='es'?'/institucional':'/institucional'}`
);

// Buscar los dos cards actuales y agregar el tercero
c = c.replace(
  `🏛️`,
  `🏛️`
);

// Reemplazar el bloque de los dos cards
const cardViejo = `[🌿Soy ciudadanoQuiero reciclar y ganar OLV →](https://oliviacirculab.com.ar/ciudadano)[🏛️Soy inversorVer el ecosistema completo →](https://oliviacirculab.com.ar/institucional)`;

// Buscar en el código fuente real
const buscar1 = `{es?'🌿':'🌿'}`;
const buscar2 = `{es?'Soy ciudadano':'I am a citizen'}`;

// Método directo: buscar el contenedor de los cards
if (c.includes("'/ciudadano'") && c.includes("'/institucional'")) {
  // Agregar el card de grandes generadores después del card institucional
  c = c.replace(
    `<a href={lang==='es'?'/institucional':'/institucional'}`,
    `<a href={lang==='es'?'/institucional':'/institucional'}`
  );

  // Buscar el patrón real de los cards en el código
  const patronCards = c.match(/href.*\/ciudadano.*\n.*href.*\/institucional/);
  if (patronCards) {
    console.log('Patrón encontrado:', patronCards[0].substring(0, 50));
  }
}

// Buscar y reemplazar la sección "Por dónde entrás" completa
const seccionVieja = c.match(/<div[^>]*>[\s\S]*?Elegí tu camino[\s\S]*?\/institucional[\s\S]*?<\/div>/);

// Método más simple: buscar el texto literal en el código
const markerCiudadano = `href={lang==='es'?'/ciudadano':'/ciudadano'}`;
const markerInstitucional = `href={lang==='es'?'/institucional':'/institucional'}`;

if (c.includes(markerCiudadano)) {
  console.log('OK Encontrado marker ciudadano');
}
if (c.includes(markerInstitucional)) {
  console.log('OK Encontrado marker institucional');
}

// Intentar con el texto tal cual está en el código
// Primero veamos qué hay alrededor de /institucional en el código de los cards
const idx = c.indexOf("'Soy inversor'") || c.indexOf('"Soy inversor"');
console.log('Índice Soy inversor:', c.indexOf("'Soy inversor'"));
console.log('Índice Soy ciudadano:', c.indexOf("'Soy ciudadano'"));

fs.writeFileSync('app/page.tsx', c);
console.log('Necesito ver el código exacto de los cards');
