const fs=require('fs');
const has=p=>fs.existsSync(p), read=p=>fs.readFileSync(p,'utf8'), write=(p,c)=>fs.writeFileSync(p,c);
const log=console.log;

/* ---- /ciudadano : antes de {/* COMPARTIR *​/} ---- */
if(has('app/ciudadano/page.tsx')){
  let c=read('app/ciudadano/page.tsx');
  if(c.includes('/mapa')){log('--  /ciudadano: ya linkea /mapa');}
  else{
    const marker='        {/* COMPARTIR */}';
    if(c.includes(marker)){
      const block=`        {/* MAPA CABA */}
        <div style={{marginBottom:24}}>
          <a href="/mapa" style={{display:'block',textDecoration:'none',background:dark?'rgba(2,132,199,0.07)':'rgba(2,132,199,0.04)',border:'1px solid rgba(2,132,199,0.25)',borderRadius:16,padding:'24px'}}>
            <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#0284c7',marginBottom:10}}>
              [ {es?'Mapa de la Ciudad':'City map'} ]
            </div>
            <h3 style={{fontSize:19,fontWeight:900,marginBottom:8,color:text}}>
              {es?'¿Dónde podés dejar tus orgánicos hoy?':'Where can you drop your organics today?'}
            </h3>
            <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:12}}>
              {es
                ? 'Los 21 puntos verdes de CABA con datos abiertos del GCBA: cuáles tienen compostera, cuáles reciben electrónicos, y por qué ese esfuerzo todavía no genera valor.'
                : 'The 21 green points of the City from open data: which have composting units, which accept e-waste, and why that effort does not yet generate value.'}
            </p>
            <span style={{fontSize:12,color:'#0284c7',fontWeight:700}}>{es?'Ver el mapa →':'View the map →'}</span>
          </a>
        </div>

`;
      write('app/ciudadano/page.tsx', c.replace(marker, block+marker));
      log('OK  /ciudadano · bloque mapa');
    } else log('!!  /ciudadano: no encontre {/* COMPARTIR */}');
  }
}

/* ---- /institucional : antes de {/* CTA FINAL *​/} ---- */
if(has('app/institucional/page.tsx')){
  let c=read('app/institucional/page.tsx');
  if(c.includes('/mapa')){log('--  /institucional: ya linkea /mapa');}
  else{
    const marker='      {/* CTA FINAL */}';
    if(c.includes(marker)){
      const block=`      {/* INTELIGENCIA TERRITORIAL */}
      <section style={{padding:'0 24px 48px',maxWidth:800,margin:'0 auto'}}>
        <div style={{background:dark?'rgba(2,132,199,0.05)':'rgba(2,132,199,0.03)',border:'1px solid rgba(2,132,199,0.2)',borderRadius:16,padding:'28px'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#0284c7',marginBottom:12}}>
            [ {es?'Inteligencia territorial':'Territorial intelligence'} ]
          </div>
          <h3 style={{fontSize:17,fontWeight:900,marginBottom:12,color:text}}>
            {es?'OLIVIA no es una app de reciclaje. Es la capa de datos territorial de la economía circular urbana.':'OLIVIA is not a recycling app. It is the territorial data layer of the urban circular economy.'}
          </h3>
          <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:14}}>
            {es
              ? 'Hoy nadie sabe cuánto residuo orgánico genera cada barrio de Buenos Aires, qué capacidad de procesamiento existe ni cuánto carbono se evita por zona. OLIVIA construye ese mapa: 21 puntos verdes con datos abiertos del GCBA como capa base, y trazabilidad dMRV verificada como capa propia.'
              : 'Today nobody knows how much organic waste each Buenos Aires neighbourhood generates, what processing capacity exists, or how much carbon is avoided per zone. OLIVIA builds that map: 21 green points from open data as the base layer, and verified dMRV traceability as its own layer.'}
          </p>
          <a href="/mapa" style={{fontSize:12,color:'#0284c7',fontWeight:700,textDecoration:'none'}}>{es?'Ver el mapa territorial →':'View the territorial map →'}</a>
        </div>
      </section>

`;
      write('app/institucional/page.tsx', c.replace(marker, block+marker));
      log('OK  /institucional · bloque inteligencia territorial');
    } else log('!!  /institucional: no encontre {/* CTA FINAL */}');
  }
}

/* ---- landing footer ---- */
if(has('app/page.tsx')){
  let c=read('app/page.tsx');
  if(c.includes("h:'/mapa'")){log('--  landing: ya tiene link /mapa');}
  else{
    const a="{l:'RAEE',h:'/raee',c:'#9333ea'},";
    if(c.includes(a)){
      write('app/page.tsx', c.replace(a, a+"\n            {l:es?'Mapa':'Map',h:'/mapa',c:'#0284c7'},"));
      log('OK  landing · link Mapa en footer');
    } else log('!!  landing: no encontre la linea de RAEE en el footer');
  }
}

log('\nListo.');
