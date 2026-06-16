// SCRIPT 11 — Nomenclatura correcta en todos los sitios
// Circulab Tech = empresa
// OLIVIA = plataforma
// Metamorfosis = vertical residuos (hoy)
// Quincena = vertical financiera (2027)
// Art of Money = vertical regalias (2028)

const fs = require('fs');

const archivos = [
  'app/page.tsx',
  'app/ciudadano/page.tsx',
  'app/institucional/page.tsx',
  'app/whitepaper/page.tsx',
  'app/onepager/page.tsx',
  'app/pitch/page.tsx',
  'components/FooterOlivia.tsx',
];

archivos.forEach(ruta => {
  if (!fs.existsSync(ruta)) {
    console.log('SKIP ' + ruta + ' (no existe aun)');
    return;
  }

  let c = fs.readFileSync(ruta, 'utf8');
  let cambios = 0;

  // 1. "OLIVIA Circular" como nombre de vertical → "Metamorfosis"
  // Solo cuando se refiere a la vertical, no a la plataforma completa
  const reemplazos = [
    // Vertical residuos
    ["OLIVIA Circular es el único producto", "Metamorfosis es el único producto"],
    ["OLIVIA Circular es el negocio hoy", "Metamorfosis es el negocio hoy"],
    ["OLIVIA Circular activa", "Metamorfosis activa"],
    ["OLIVIA Circular is the only product", "Metamorfosis is the only product"],
    ["OLIVIA Circular is the business today", "Metamorfosis is the business today"],

    // Footer: nombre completo correcto
    ["© 2026 Circulab Tech", "© 2026 Circulab Tech"],

    // Vertical nombres en cards del ecosistema
    ["nombre:'OLIVIA Circular'", "nombre:'Metamorfosis'"],
    ["nombre:\"OLIVIA Circular\"", "nombre:\"Metamorfosis\""],

    // Descripciones de la vertical
    ["OLIVIA Circular · Quincena", "Metamorfosis · Quincena"],
    ["OLIVIA Circular, Quincena", "Metamorfosis, Quincena"],

    // Card en landing/institucional - nombre de la vertical
    ["'OLIVIA Circular',desc:", "'Metamorfosis',desc:"],
    ["\"OLIVIA Circular\",desc:", "\"Metamorfosis\",desc:"],
  ];

  reemplazos.forEach(([viejo, nuevo]) => {
    if (c.includes(viejo) && viejo !== nuevo) {
      c = c.split(viejo).join(nuevo);
      cambios++;
    }
  });

  if (cambios > 0) {
    fs.writeFileSync(ruta, c);
    console.log('OK ' + ruta + ' · ' + cambios + ' reemplazos');
  } else {
    console.log('-- ' + ruta + ' · sin cambios necesarios');
  }
});

// === Agregar glosario al inicio del whitepaper ===
let wp = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');

if (!wp.includes('Glosario') && !wp.includes('glosario') && !wp.includes('Metamorfosis')) {
  const glosario = `
if(seccion===-1) return (
  <div>
    <div style={s.titulo}>{lang==='es'?'Glosario de terminos':'Glossary of terms'}</div>
    <div style={{...s.highlight,marginBottom:12}}>
      <div style={s.p}>{lang==='es'?'Para evitar confusion, este documento usa los siguientes terminos de forma consistente:':'To avoid confusion, this document uses the following terms consistently:'}</div>
    </div>
    {(lang==='es'?[
      {t:'Circulab Tech',d:'La empresa. Razon social registrada en Argentina bajo Ley 27.506. Es quien firma los contratos, recibe las inversiones, contrata al equipo y opera bajo el Distrito IA de Buenos Aires.',c:'#22c55e'},
      {t:'OLIVIA',d:'La plataforma madre. Oficina Latinoamericana de Informacion para la Valorizacion e Inteligencia Ambiental. Es la marca, el sistema de datos, la infraestructura dMRV, y lo que el ciudadano ve y usa. Desarrollada por Circulab Tech.',c:'#3b82f6'},
      {t:'Metamorfosis',d:'Primera vertical de Circulab. La que existe hoy. Maneja la verificacion de residuos organicos con IA, la acumulacion de OLV Verdes y la originacion de creditos de carbono bajo protocolo Verra VCS. Opera dentro de la plataforma OLIVIA.',c:'#22c55e'},
      {t:'Quincena',d:'Segunda vertical de Circulab. Activos financieros e inclusion. Digitaliza ROSCAs y expande capacidades crediticias del sector informal. Activa post-certificacion Verra 2027. Opera dentro de OLIVIA. Cero codigo hasta ese hito.',c:'#3b82f6'},
      {t:'Art of Money',d:'Tercera vertical de Circulab. Tokenizacion de regalias musicales, deportivas y literarias. Activa post-escala LATAM 2028. Opera dentro de OLIVIA. Cero codigo hasta ese hito.',c:'#a855f7'},
      {t:'OLV / Olivia Coins',d:'El token interno de la plataforma OLIVIA. OLV Verdes son los generados por residuos verificados con IA. OLV Bonus son los generados por participacion en la comunidad. Solo los OLV Verdes se certifican con Verra.',c:'#f59e0b'},
      {t:'dMRV',d:'Digital Monitoring Reporting and Verification. El sistema de verificacion digital que OLIVIA usa para certificar el impacto ambiental del ciudadano. En febrero 2026 Verra aprobo la primera metodologia dMRV de alta frecuencia, validando exactamente el modelo de OLIVIA.',c:'#22c55e'},
    ]:[
      {t:'Circulab Tech',d:'The company. Legal entity registered in Argentina under Law 27.506. Signs contracts, receives investments, hires the team, and operates within the Buenos Aires AI District.',c:'#22c55e'},
      {t:'OLIVIA',d:'The mother platform. Latin American Office for Information for Environmental Valorization and Intelligence. The brand, the data system, the dMRV infrastructure, and what citizens see and use. Developed by Circulab Tech.',c:'#3b82f6'},
      {t:'Metamorfosis',d:'First Circulab vertical. The one that exists today. Handles AI verification of organic waste, OLV Green accumulation, and carbon credit origination under Verra VCS protocol. Operates within the OLIVIA platform.',c:'#22c55e'},
      {t:'Quincena',d:'Second Circulab vertical. Financial assets and inclusion. Digitalizes ROSCAs and expands credit capabilities for the informal sector. Active post-Verra certification 2027. Operates within OLIVIA. Zero code until that milestone.',c:'#3b82f6'},
      {t:'Art of Money',d:'Third Circulab vertical. Tokenization of music, sports, and literary royalties. Active post-LATAM scale 2028. Operates within OLIVIA. Zero code until that milestone.',c:'#a855f7'},
      {t:'OLV / Olivia Coins',d:'The internal token of the OLIVIA platform. Green OLV are generated by AI-verified waste. Bonus OLV are generated by community participation. Only Green OLV are Verra-certifiable.',c:'#f59e0b'},
      {t:'dMRV',d:'Digital Monitoring Reporting and Verification. The digital verification system OLIVIA uses to certify citizen environmental impact. In February 2026 Verra approved the first high-frequency dMRV methodology, validating exactly the OLIVIA model.',c:'#22c55e'},
    ]).map(item=>(
      <div key={item.t} style={{...s.card,borderLeft:'3px solid ' + item.c,marginBottom:10}}>
        <div style={{fontSize:13,fontWeight:900,color:item.c,marginBottom:4}}>{item.t}</div>
        <div style={s.p}>{item.d}</div>
      </div>
    ))}
  </div>
)

`;

  wp = wp.replace(
    'if(seccion===0) return (',
    glosario + 'if(seccion===0) return ('
  );

  fs.writeFileSync('app/whitepaper/page.tsx', wp);
  console.log('OK Whitepaper: glosario de terminos agregado como seccion 0');
}

console.log('');
console.log('Script 11 completado');
console.log('Jerarquia correcta:');
console.log('  Circulab Tech (empresa)');
console.log('    OLIVIA (plataforma)');
console.log('      Metamorfosis (vertical residuos - hoy)');
console.log('      Quincena (vertical financiera - 2027)');
console.log('      Art of Money (vertical regalias - 2028)');
