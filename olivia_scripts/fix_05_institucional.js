// SCRIPT 05 — Institucional: sacar precios, agregar grandes emisores y RSE
const fs = require('fs');
let c = fs.readFileSync('app/institucional/page.tsx', 'utf8');

// ═══ 1. Sacar "90% margen neto" del hero ═══
c = c.replace(
  /margen neto al 90%\./g,
  'modelo de ingresos recurrentes.'
);
c = c.replace(
  /90% net margin\./g,
  'recurring revenue model.'
);
c = c.replace(
  /carbon credits are 90% net margin\./g,
  'carbon credits are the main financial upside.'
);
console.log('✅ 90% margen neto removido del hero');

// ═══ 2. Sacar precios SaaS específicos ═══
c = c.replace(/USD 300\/mes/g, 'abono mensual');
c = c.replace(/USD 600\/mes/g, 'abono mensual premium');
c = c.replace(/USD 300\/month/g, 'monthly subscription');
c = c.replace(/USD 600\/month/g, 'premium monthly subscription');
console.log('✅ Precios SaaS específicos removidos');

// ═══ 3. Agregar card Grandes Emisores en sección clientes ═══
if (!c.includes('Grandes Emisores') && !c.includes('navieras') && !c.includes('CORSIA')) {
  const cardGrandesEmisores = `
              {/* GRANDES EMISORES */}
              <div style={{background:card,border:'1px solid rgba(6,182,212,0.2)',borderRadius:14,padding:'20px'}}>
                <div style={{fontSize:24,marginBottom:8}}>🚢</div>
                <div style={{fontSize:13,fontWeight:700,color:'#06b6d4',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>
                  {es?'Grandes Emisores':'Large Emitters'}
                </div>
                <div style={{fontSize:9,fontWeight:700,color:'#06b6d4',background:'rgba(6,182,212,0.1)',padding:'3px 8px',borderRadius:20,display:'inline-block',marginBottom:10,letterSpacing:'0.05em'}}>
                  CORSIA · IMO 2050 · SEC Climate
                </div>
                <p style={{fontSize:11,color:sub,lineHeight:1.7,margin:0}}>
                  {es
                    ? 'Navieras · Aerolíneas · Mineras · Industria forestal. Regulaciones internacionales los obligan a compensar. OLIVIA provee la verificación que los mercados de carbono exigen: IA + GPS + cadena de custodia completa + Verra VCS.'
                    : 'Shipping companies · Airlines · Mining · Forestry. International regulations require compensation. OLIVIA provides the verification carbon markets demand: AI + GPS + full chain of custody + Verra VCS.'}
                </p>
              </div>
`;

  // ═══ 4. Agregar card RSE/ESG ═══
  const cardRSE = `
              {/* RSE ESG */}
              <div style={{background:card,border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'20px'}}>
                <div style={{fontSize:24,marginBottom:8}}>🏛️</div>
                <div style={{fontSize:13,fontWeight:700,color:'#f59e0b',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>
                  {es?'Empresas RSE / ESG':'RSE / ESG Companies'}
                </div>
                <div style={{fontSize:9,fontWeight:700,color:'#f59e0b',background:'rgba(245,158,11,0.1)',padding:'3px 8px',borderRadius:20,display:'inline-block',marginBottom:10,letterSpacing:'0.05em'}}>
                  GRI · SASB · TCFD · CDP
                </div>
                <p style={{fontSize:11,color:sub,lineHeight:1.7,margin:0}}>
                  {es
                    ? 'Sus inversores exigen datos verificables de terceros para el reporte ESG. OLIVIA provee compensación de huella con datos ciudadanos verificados por IA, certificables por Verra VCS en 2027.'
                    : 'Your investors demand third-party verifiable data for ESG reporting. OLIVIA provides footprint compensation with AI-verified citizen data, Verra VCS certifiable in 2027.'}
                </p>
              </div>
`;

  // Insertar antes del cierre de la grilla de clientes
  c = c.replace(
    `{/* FIN CLIENTES */}`,
    cardGrandesEmisores + cardRSE + `{/* FIN CLIENTES */}`
  );
  console.log('✅ Cards Grandes Emisores y RSE/ESG agregadas');
} else {
  console.log('ℹ️  Grandes Emisores ya existe');
}

// ═══ 5. Agregar argumento capacidad ociosa ═══
if (!c.includes('capacidad ociosa') && !c.includes('35% de su capacidad')) {
  c = c.replace(
    `{/* POSICIONAMIENTO COMPETITIVO */}`,
    `{/* CAPACIDAD OCIOSA */}
      <section style={{padding:'24px',background:dark?'rgba(34,197,94,0.02)':'rgba(34,197,94,0.02)',borderTop:'1px solid rgba(34,197,94,0.1)'}}>
        <div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:13,color:sub,lineHeight:1.8,maxWidth:600,margin:'0 auto'}}>
            {es
              ? 'No construimos infraestructura nueva. Activamos la que ya existe y está ociosa. Las plantas de clasificación · los camiones · las cooperativas · el marco legal. Todo ya está. Lo que faltaba era la capa de datos que conecta al ciudadano con el sistema. Eso es OLIVIA. Costo marginal de escala: mínimo.'
              : 'We do not build new infrastructure. We activate what already exists and is idle. Classification plants · trucks · cooperatives · legal framework. It is all there. What was missing was the data layer connecting citizens to the system. That is OLIVIA. Marginal cost of scale: minimal.'}
          </p>
        </div>
      </section>

      {/* POSICIONAMIENTO COMPETITIVO */}`
  );
  console.log('✅ Argumento capacidad ociosa agregado');
} else {
  console.log('ℹ️  Capacidad ociosa ya existe');
}

fs.writeFileSync('app/institucional/page.tsx', c);
console.log('✅ Script 05 institucional completado');
