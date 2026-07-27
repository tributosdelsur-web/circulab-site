const fs = require('fs');

const SECCION_VERRA = `
      {/* VERRA EN ARGENTINA */}
      <section style={{padding:'0 24px 48px',maxWidth:800,margin:'0 auto'}}>
        <div style={{background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.02)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:16,padding:'28px'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>
            [ {es?'Verra ya opera en Argentina':'Verra already operates in Argentina'} ]
          </div>
          <h3 style={{fontSize:17,fontWeight:900,marginBottom:12,color:text}}>
            {es
              ? 'Argentina tiene proyectos Verra. Todos son forestales y rurales. El nicho urbano está vacío.'
              : 'Argentina has Verra projects. All are forest and rural. The urban niche is empty.'}
          </h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
            {[
              {n:'138.000',l:es?'créditos certificados':'certified credits',d:es?'Nideport · Selva Paranaense · Misiones · oct. 2025':'Nideport · Atlantic Forest · Misiones · Oct. 2025',c:'#22c55e'},
              {n:'13,1M tCO2',l:es?'programa jurisdiccional':'jurisdictional program',d:es?'Provincia de Misiones · primer programa REDD+ liderado por un gobierno provincial · jun. 2026':'Province of Misiones · first government-led REDD+ program · Jun. 2026',c:'#3b82f6'},
              {n:'0',l:es?'proyectos urbanos':'urban projects',d:es?'Ningún proyecto Verra de residuos orgánicos urbanos en Argentina ni en LATAM. El nicho está vacío.':'No urban organic waste Verra project in Argentina or LATAM. The niche is empty.',c:'#f59e0b'},
            ].map((item,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid '+item.c+'33',borderRadius:10,padding:'14px'}}>
                <div style={{fontSize:18,fontWeight:900,color:item.c,marginBottom:4}}>{item.n}</div>
                <div style={{fontSize:9,color:sub,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6}}>{item.l}</div>
                <div style={{fontSize:9,color:sub,lineHeight:1.6}}>{item.d}</div>
              </div>
            ))}
          </div>
          <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'14px'}}>
            <div style={{fontSize:11,fontWeight:700,color:accent,marginBottom:6}}>
              {es?'La oportunidad de OLIVIA:':'OLIVIA\'s opportunity:'}
            </div>
            <p style={{fontSize:11,color:sub,lineHeight:1.7,margin:0}}>
              {es
                ? 'Argentina ya tiene el ecosistema Verra activo: la Mesa Argentina de Carbono, auditores acreditados, proyectos registrados. Pero todos son forestales y rurales. OLIVIA puede ser el primer proyecto de residuos orgánicos urbanos certificado bajo VCS en Argentina y en América Latina. Los datos que se acumulan desde hoy son exactamente lo que Verra necesita para certificar en 2027.'
                : 'Argentina already has an active Verra ecosystem: the Argentine Carbon Board, accredited auditors, registered projects. But all are forest and rural. OLIVIA can be the first urban organic waste project certified under VCS in Argentina and Latin America. The data accumulated from today is exactly what Verra needs to certify in 2027.'}
            </p>
          </div>
        </div>
      </section>`;

// ═══ 1. /institucional ═══
let inst = fs.readFileSync('app/institucional/page.tsx', 'utf8');
if (!inst.includes('138.000') && !inst.includes('Nideport')) {
  inst = inst.replace(
    `      {/* GRANDES EMISORES GLOBALES */}`,
    SECCION_VERRA + `\n      {/* GRANDES EMISORES GLOBALES */}`
  );
  fs.writeFileSync('app/institucional/page.tsx', inst);
  console.log('OK /institucional: sección Verra Argentina agregada');
} else {
  console.log('-- /institucional: ya tiene datos Verra Argentina');
}

// ═══ 2. /whitepaper ═══
let wp = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');
if (!wp.includes('Nideport') && !wp.includes('138.000')) {
  // Buscar sección "por qué ahora" o similar
  const verraWP = `
                <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10,padding:'14px',marginBottom:12}}>
                  <div style={{fontSize:9,fontWeight:700,color:accent,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>
                    {lang==='es'?'Verra ya opera en Argentina · el nicho urbano está vacío':'Verra already operates in Argentina · urban niche is empty'}
                  </div>
                  <p style={{fontSize:11,color:'#94a3b8',lineHeight:1.7,marginBottom:8}}>
                    {lang==='es'
                      ? 'Argentina ya tiene proyectos certificados bajo Verra VCS: Nideport en Misiones certificó 138.000 créditos en octubre 2025 (primer proyecto de bosque nativo del país), y en junio 2026 la Provincia de Misiones registró el primer programa jurisdiccional REDD+ gubernamental del mundo bajo Verra (13,1M tCO2). Todos los proyectos argentinos son forestales y rurales. Ninguno es urbano. OLIVIA puede ser el primer proyecto de residuos orgánicos urbanos certificado bajo VCS en Argentina y en América Latina.'
                      : 'Argentina already has projects certified under Verra VCS: Nideport in Misiones certified 138,000 credits in October 2025 (first native forest project in the country), and in June 2026 the Province of Misiones registered the world\'s first government-led jurisdictional REDD+ program under Verra (13.1M tCO2). All Argentine projects are forest and rural. None are urban. OLIVIA can be the first urban organic waste project certified under VCS in Argentina and Latin America.'}
                  </p>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    {[
                      {n:'138.000 VCUs',l:'Nideport · Misiones · oct. 2025',c:accent},
                      {n:'13,1M tCO2',l:lang==='es'?'Misiones · jun. 2026':'Misiones · Jun. 2026',c:'#3b82f6'},
                      {n:lang==='es'?'0 proyectos urbanos':'0 urban projects',l:lang==='es'?'Nicho vacío en LATAM':'Empty niche in LATAM',c:'#f59e0b'},
                    ].map((s,i)=>(
                      <div key={i} style={{background:'rgba(255,255,255,0.04)',border:'1px solid '+s.c+'33',borderRadius:8,padding:'6px 12px'}}>
                        <div style={{fontSize:11,fontWeight:700,color:s.c}}>{s.n}</div>
                        <div style={{fontSize:9,color:'#64748b'}}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>`;

  // Insertar antes del cierre de la primera sección del whitepaper
  wp = wp.replace(
    `if(seccion===1) return (`,
    verraWP + `\nif(seccion===1) return (`
  );
  fs.writeFileSync('app/whitepaper/page.tsx', wp);
  console.log('OK /whitepaper: datos Verra Argentina agregados');
} else {
  console.log('-- /whitepaper: ya tiene datos Verra Argentina');
}

// ═══ 3. /grandes-emisores ═══
let ge = fs.readFileSync('app/grandes-emisores/page.tsx', 'utf8');
if (!ge.includes('Nideport') && !ge.includes('138.000')) {
  const verraGE = `
          {/* CALIDAD DE CRÉDITOS */}
          <div style={{background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.02)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:14,padding:'20px',marginBottom:20}}>
            <div style={{fontSize:9,fontWeight:700,color:accent,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>
              {es?'Verra ya opera en Argentina · el nicho urbano está vacío':'Verra already operates in Argentina · urban niche is empty'}
            </div>
            <p style={{fontSize:11,color:sub,lineHeight:1.7,marginBottom:12}}>
              {es
                ? 'Los créditos OLIVIA seguirán el mismo estándar VCS que ya certificó 138.000 créditos en Misiones (Nideport, oct. 2025) y 13,1 millones de tCO2 en el primer programa jurisdiccional gubernamental del mundo (Provincia de Misiones, jun. 2026). La diferencia: todos los proyectos argentinos son forestales y rurales. OLIVIA será el primero urbano — el de mayor trazabilidad ciudadana y el más relevante para CORSIA y EU ETS.'
                : 'OLIVIA credits will follow the same VCS standard that already certified 138,000 credits in Misiones (Nideport, Oct. 2025) and 13.1 million tCO2 in the world\'s first government-led jurisdictional program (Province of Misiones, Jun. 2026). The difference: all Argentine projects are forest and rural. OLIVIA will be the first urban one — with the highest citizen traceability and most relevant for CORSIA and EU ETS.'}
            </p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {[
                {n:'VCS + CCB Gold',l:es?'estándar Nideport Misiones':'Nideport Misiones standard',c:accent},
                {n:'13,1M tCO2',l:es?'Provincia Misiones jun. 2026':'Misiones Province Jun. 2026',c:'#3b82f6'},
                {n:es?'Primer proyecto urbano':'First urban project',l:es?'OLIVIA · CABA · 2027':'OLIVIA · CABA · 2027',c:'#f59e0b'},
              ].map((s,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid '+s.c+'33',borderRadius:8,padding:'8px 12px'}}>
                  <div style={{fontSize:11,fontWeight:700,color:s.c}}>{s.n}</div>
                  <div style={{fontSize:9,color:sub}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>`;

  ge = ge.replace(
    `      {/* POR QUÉ OLIVIA */}`,
    `      {/* POR QUÉ OLIVIA */}\n` + verraGE.split('\n').map(l => '  ' + l).join('\n')
  );
  fs.writeFileSync('app/grandes-emisores/page.tsx', ge);
  console.log('OK /grandes-emisores: calidad de créditos Verra Argentina agregada');
} else {
  console.log('-- /grandes-emisores: ya tiene datos Verra Argentina');
}

// ═══ 4. /consorcios ═══
let con = fs.readFileSync('app/consorcios/page.tsx', 'utf8');
if (!con.includes('Nideport') && !con.includes('138.000')) {
  con = con.replace(
    `{es?'En febrero 2026 Verra aprobó su primer piloto de verificación digital dMRV de alta frecuencia — el mismo modelo que implementa OLIVIA.`,
    `{es?'Argentina ya tiene proyectos certificados por Verra: Nideport en Misiones certificó 138.000 créditos en octubre 2025 y la Provincia de Misiones registró 13,1M tCO2 en junio 2026. Todos son forestales. OLIVIA puede ser el primero urbano. En febrero 2026 Verra aprobó su primer piloto de verificación digital dMRV de alta frecuencia — el mismo modelo que implementa OLIVIA.`
  );
  con = con.replace(
    `'Argentina already has projects certified by Verra`,
    `'Argentina already has Verra-certified projects: Nideport in Misiones certified 138,000 credits in October 2025 and the Province of Misiones registered 13.1M tCO2 in June 2026. All are forest projects. OLIVIA can be the first urban one. In February 2026 Verra approved its first high-frequency digital dMRV verification pilot`
  );
  // Si no encontró el texto anterior, buscar otro ancla
  if (!con.includes('Nideport')) {
    con = con.replace(
      `{n:'Verra VCS 2027',`,
      `{n:'Verra AR 2025',l:es?'138.000 créditos certificados en Misiones':'138,000 credits certified in Misiones',c:'#f59e0b'},\n              {n:'Verra VCS 2027',`
    );
  }
  fs.writeFileSync('app/consorcios/page.tsx', con);
  console.log('OK /consorcios: referencia Verra Argentina agregada');
} else {
  console.log('-- /consorcios: ya tiene datos Verra Argentina');
}

console.log('\nScript fix_verra_argentina completado');
console.log('Próximo paso: npm run build');
