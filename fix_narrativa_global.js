const fs = require('fs');

// ═══ WHITEPAPER · ACTUALIZAR RESUMEN EJECUTIVO ═══
let wp = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');

// Agregar bullet de grandes emisores globales si no existe
if (!wp.includes('CORSIA') && !wp.includes('EU ETS') && !wp.includes('grandes-emisores')) {

  const nuevoBullet = `
    <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'16px',marginBottom:16}}>
      <div style={{fontSize:10,fontWeight:700,color:'#3b82f6',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.08em'}}>
        {lang==='es'?'Mercado regulatorio global · CBAM · CORSIA · EU ETS · IMO':'Global regulatory market · CBAM · CORSIA · EU ETS · IMO'}
      </div>
      <p style={{fontSize:12,color:'#94a3b8',lineHeight:1.8,marginBottom:8}}>
        {lang==='es'
          ? 'Tres regulaciones globales convergen en 2026-2027: el EU ETS marítimo obliga a navieras a comprar créditos (costo sector: USD 2.900M en 2026), CORSIA convierte a las aerolíneas en los mayores compradores de créditos de carbono del mundo desde 2027, y el CBAM de la UE exige a los exportadores argentinos certificar su huella desde enero 2026. El ciudadano que recicla en Buenos Aires genera el crédito que la naviera necesita para el EU ETS. Eso no es una metáfora — es el modelo de negocio.'
          : 'Three global regulations converge in 2026-2027: maritime EU ETS forces shipping companies to buy credits (sector cost: USD 2.9B in 2026), CORSIA converts airlines into the world\'s largest carbon credit buyers from 2027, and EU CBAM requires Argentine exporters to certify their footprint since January 2026. The citizen who recycles in Buenos Aires generates the credit the shipping company needs for EU ETS. That is not a metaphor — it is the business model.'}
      </p>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        {[{n:'USD 2.9B',l:lang==='es'?'EU ETS navieras 2026':'EU ETS shipping 2026',c:'#3b82f6'},{n:'CORSIA 2027',l:lang==='es'?'aerolíneas obligadas':'airlines required',c:'#a855f7'},{n:'EUR 60-80/tCO2',l:'CBAM price',c:'#f59e0b'}].map((s,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.04)',border:'1px solid '+s.c+'33',borderRadius:8,padding:'6px 12px'}}>
            <div style={{fontSize:12,fontWeight:700,color:s.c}}>{s.n}</div>
            <div style={{fontSize:9,color:'#64748b'}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
`;

  // Insertar antes del cierre de la sección 0
  wp = wp.replace(
    `\n)\n\nif(seccion===1) return (`,
    nuevoBullet + `\n)\n\nif(seccion===1) return (`
  );

  fs.writeFileSync('app/whitepaper/page.tsx', wp);
  console.log('OK whitepaper: bullet grandes emisores globales agregado');
} else {
  console.log('-- whitepaper: ya tiene CORSIA/EU ETS');
}

// ═══ ONEPAGER · AGREGAR BULLET CBAM/CORSIA ═══
let op = fs.readFileSync('app/onepager/page.tsx', 'utf8');
if (!op.includes('CORSIA') && !op.includes('EU ETS')) {
  op = op.replace(
    `{icon:'⚖️',t:'Mercado regulatorio garantizado',d:'Ley 1854 CABA · 6.000+ establecimientos obligados · TAM USD 28.8M/año · Inspecciones en mayo 2026'},`,
    `{icon:'🚢',t:'Mercado regulatorio GLOBAL',d:'EU ETS navieras USD 2.9B/año · CORSIA aerolíneas desde 2027 · CBAM exportadores Argentina→UE desde 2026 · TAM USD 50B+ mercado carbono 2030'},
            {icon:'⚖️',t:'Mercado regulatorio local',d:'Ley 1854 CABA · 6.000+ establecimientos obligados · TAM USD 28.8M/año CABA'},`
  );
  fs.writeFileSync('app/onepager/page.tsx', op);
  console.log('OK onepager: bullet CBAM/CORSIA/EU ETS agregado');
} else {
  console.log('-- onepager: ya tiene CORSIA/EU ETS');
}

// ═══ PITCH · ACTUALIZAR SLIDE DE MERCADO ═══
let pitch = fs.readFileSync('app/pitch/page.tsx', 'utf8');
if (!pitch.includes('CORSIA') && !pitch.includes('EU ETS') && !pitch.includes('2.900')) {
  // Buscar la sección de TAM o mercado en el pitch
  pitch = pitch.replace(
    `'USD 28.8M'`,
    `'USD 50B+'`
  );
  pitch = pitch.replace(
    `"USD 28.8M"`,
    `"USD 50B+"`
  );
  fs.writeFileSync('app/pitch/page.tsx', pitch);
  console.log('OK pitch: TAM actualizado a USD 50B+');
} else {
  console.log('-- pitch: ya actualizado');
}

// ═══ NDA · AGREGAR CAMPO SECTOR ═══
let nda = fs.readFileSync('app/nda/page.tsx', 'utf8');
if (!nda.includes('sector') && !nda.includes('Sector')) {
  // Agregar campo sector después del campo cargo
  nda = nda.replace(
    `const [cargo, setCargo] = useState('')`,
    `const [cargo, setCargo] = useState('')
  const [sector, setSector] = useState('')`
  );

  // Agregar el select de sector en el formulario
  nda = nda.replace(
    `<input
                value={cargo}
                onChange={e=>setCargo(e.target.value)}
                placeholder={es ? 'CEO, Presidente, Director...' : 'CEO, President, Director...'}`,
    `<select
                value={sector}
                onChange={e=>setSector(e.target.value)}
                style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid ' + border,color:text,fontSize:12,outline:'none',boxSizing:'border-box' as const}}>
                <option value="">{es?'Sector / Tipo de organización':'Sector / Organization type'}</option>
                <option value="naviera">{es?'Naviera / Transporte marítimo':'Shipping / Maritime transport'}</option>
                <option value="aerolinea">{es?'Aerolínea / Aviación':'Airline / Aviation'}</option>
                <option value="cbam">{es?'Exportador hacia UE (CBAM)':'Exporter to EU (CBAM)'}</option>
                <option value="energia">{es?'Energía / Minería / Petróleo':'Energy / Mining / Oil'}</option>
                <option value="consorcio">{es?'Consorcio / Administradora':'Condominium / Property manager'}</option>
                <option value="hotel">{es?'Hotel / Turismo':'Hotel / Tourism'}</option>
                <option value="gastro">{es?'Restaurante / Gastronomía':'Restaurant / Gastronomy'}</option>
                <option value="hospital">{es?'Clínica / Hospital':'Clinic / Hospital'}</option>
                <option value="rse">{es?'Empresa RSE / ESG':'RSE / ESG Company'}</option>
                <option value="fondo">{es?'Fondo de inversión / VC':'Investment fund / VC'}</option>
                <option value="municipio">{es?'Municipio / Gobierno':'Municipality / Government'}</option>
                <option value="otro">{es?'Otro':'Other'}</option>
              </select>
              <input
                value={cargo}
                onChange={e=>setCargo(e.target.value)}
                placeholder={es ? 'CEO, Presidente, Director...' : 'CEO, President, Director...'}`
  );

  // Agregar sector al insert de Supabase
  nda = nda.replace(
    `await supabase.from('nda_firmas').insert({
        nombre,
        email,
        empresa,
        cargo,
        fecha: new Date().toISOString(),
        ip_hash: 'browser',
        lang,
      })`,
    `await supabase.from('nda_firmas').insert({
        nombre,
        email,
        empresa,
        cargo,
        sector,
        fecha: new Date().toISOString(),
        ip_hash: 'browser',
        lang,
      })`
  );

  fs.writeFileSync('app/nda/page.tsx', nda);
  console.log('OK nda: campo sector agregado');
} else {
  console.log('-- nda: ya tiene campo sector');
}

// ═══ AGREGAR COLUMNA SECTOR EN SUPABASE (instrucción) ═══
console.log('\nACCION MANUAL REQUERIDA EN SUPABASE:');
console.log('SQL Editor → ejecutar:');
console.log('ALTER TABLE nda_firmas ADD COLUMN IF NOT EXISTS sector text;');

console.log('\nScript narrativa global completado');
