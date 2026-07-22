const fs = require('fs');
let c = fs.readFileSync('app/institucional/page.tsx', 'utf8');

const seccionGlobal = `      {/* GRANDES EMISORES GLOBALES */}
      <section style={{padding:'0 24px 32px',maxWidth:800,margin:'0 auto'}}>
        <div style={{background:'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:16,padding:'24px'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#3b82f6',marginBottom:12}}>[ {es?'Mercado regulatorio global':'Global regulatory market'} ]</div>
          <h3 style={{fontSize:18,fontWeight:900,marginBottom:12,color:text}}>
            {es?'El ciudadano que recicla en Buenos Aires genera el crédito que la naviera necesita para el EU ETS.':'The citizen who recycles in Buenos Aires generates the credit the shipping company needs for EU ETS.'}
          </h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
            {[
              {n:'USD 2.9B',l:es?'costo EU ETS navieras 2026':'EU ETS shipping cost 2026',c:'#3b82f6'},
              {n:'CORSIA 2027',l:es?'aerolíneas = mayores compradores':'airlines = largest buyers',c:'#a855f7'},
              {n:'EUR 60-80',l:es?'por tCO2 precio CBAM':'per tCO2 CBAM price',c:'#f59e0b'},
              {n:'6.000+',l:es?'obligados Ley 1854 CABA':'required by Law 1854 CABA',c:'#ef4444'},
            ].map((item,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid '+item.c+'33',borderRadius:10,padding:'12px',textAlign:'center' as const}}>
                <div style={{fontSize:16,fontWeight:900,color:item.c,marginBottom:4}}>{item.n}</div>
                <div style={{fontSize:9,color:sub,lineHeight:1.5}}>{item.l}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:12}}>
            {es
              ? 'OLIVIA opera en la intersección de tres mercados regulados que convergen en 2026-2027: el EU ETS marítimo obliga a navieras a comprar créditos (costo sector: USD 2.900M en 2026), CORSIA convierte a las aerolíneas en los mayores compradores de créditos del mundo desde 2027, y el CBAM de la UE exige a los exportadores argentinos certificar su huella desde enero 2026.'
              : 'OLIVIA operates at the intersection of three regulated markets converging in 2026-2027: maritime EU ETS forces shipping companies to buy credits (sector cost: USD 2.9B in 2026), CORSIA converts airlines into the world largest carbon credit buyers from 2027, and EU CBAM requires Argentine exporters to certify their footprint since January 2026.'}
          </p>
          <a href="/grandes-emisores" style={{fontSize:12,color:'#3b82f6',fontWeight:700,textDecoration:'none'}}>{es?'Ver mercado de grandes emisores globales →':'See global large emitters market →'}</a>
        </div>
      </section>

      {/* VALIDACION EXTERNA INVERSOR */}`;

c = c.replace(
  `      {/* VALIDACION EXTERNA INVERSOR */}`,
  seccionGlobal
);

fs.writeFileSync('app/institucional/page.tsx', c);
console.log('OK institucional actualizado');
