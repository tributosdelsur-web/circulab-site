// SCRIPT 02 — Defaults de color + logo en docs
const fs = require('fs');

// ═══ CIUDADANO → light por defecto ═══
let ciudadano = fs.readFileSync('app/ciudadano/page.tsx', 'utf8');
// Cambiar solo el primer useState(true) que es el dark mode
ciudadano = ciudadano.replace(
  "const [dark, setDark] = useState(true)",
  "const [dark, setDark] = useState(false)"
);
fs.writeFileSync('app/ciudadano/page.tsx', ciudadano);
console.log('✅ Ciudadano → light por defecto');

// ═══ INSTITUCIONAL → light por defecto ═══
let institucional = fs.readFileSync('app/institucional/page.tsx', 'utf8');
institucional = institucional.replace(
  "const [dark, setDark] = useState(true)",
  "const [dark, setDark] = useState(false)"
);
fs.writeFileSync('app/institucional/page.tsx', institucional);
console.log('✅ Institucional → light por defecto');

// ═══ LOGO EN WHITEPAPER ═══
let whitepaper = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');
if (!whitepaper.includes('logoOC.png')) {
  // Buscar el primer div del return y agregar nav con logo
  whitepaper = whitepaper.replace(
    "return (\n    <div",
    `return (
    <div`
  );
  // Agregar nav con logo si no existe
  if (!whitepaper.includes('<nav') || !whitepaper.includes('logoOC')) {
    whitepaper = whitepaper.replace(
      "return (\n    <div style={",
      `return (
    <div style={`
    );
    // Insertar nav antes del primer contenido
    whitepaper = whitepaper.replace(
      "if(seccion===0) return (",
      `// NAV con logo agregado
const NavWhitepaper = () => (
  <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:'rgba(10,14,26,0.95)',borderBottom:'1px solid rgba(255,255,255,0.07)',padding:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
      <img src="/logoOC.png" alt="OLIVIA" style={{width:28,height:28,objectFit:'contain',borderRadius:6}} />
      <span style={{fontSize:11,fontWeight:700,color:'#f1f5f9',textTransform:'uppercase',letterSpacing:'0.05em'}}>OLIVIA Circulab</span>
    </a>
    <a href="/" style={{fontSize:10,color:'#64748b',textDecoration:'none'}}>← Volver al inicio</a>
  </nav>
)

if(seccion===0) return (`
    );
  }
  fs.writeFileSync('app/whitepaper/page.tsx', whitepaper);
  console.log('✅ Logo agregado en whitepaper');
} else {
  console.log('ℹ️  Whitepaper ya tiene logo');
}

// ═══ LOGO EN ONEPAGER ═══
let onepager = fs.readFileSync('app/onepager/page.tsx', 'utf8');
if (!onepager.includes('logoOC.png')) {
  console.log('⚠️  One pager necesita logo - revisar manualmente');
} else {
  console.log('ℹ️  One pager ya tiene logo');
}

// ═══ LOGO EN PITCH ═══
let pitch = fs.readFileSync('app/pitch/page.tsx', 'utf8');
if (!pitch.includes('logoOC.png')) {
  console.log('⚠️  Pitch necesita logo - revisar manualmente');
} else {
  console.log('ℹ️  Pitch ya tiene logo');
}

console.log('✅ Script 02 completado');
