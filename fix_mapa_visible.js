const fs=require('fs');
const has=p=>fs.existsSync(p), read=p=>fs.readFileSync(p,'utf8'), write=(p,c)=>fs.writeFileSync(p,c);
const log=console.log;

/* ================= 1. LANDING: link en el nav ================= */
if(has('app/page.tsx')){
  let c=read('app/page.tsx');
  let ch=false;

  const loginAnchor = `<a href="/login" style={{fontSize:12,color:sub,textDecoration:'none',padding:'6px 12px',borderRadius:8,border:\`1px solid \${border}\`}}>{es?'Entrar':'Sign in'}</a>`;
  if(!c.includes(`href="/mapa" style={{fontSize:12`)){
    if(c.includes(loginAnchor)){
      const mapaLink = `<a href="/mapa" style={{fontSize:12,color:'#0284c7',textDecoration:'none',padding:'6px 12px',borderRadius:8,border:'1px solid rgba(2,132,199,0.35)',fontWeight:700,display:'flex',alignItems:'center',gap:5}}>🗺️ {es?'Mapa':'Map'}</a>
          `;
      c=c.replace(loginAnchor, mapaLink+loginAnchor); ch=true;
      log('OK  landing · link Mapa en el nav');
    } else log('!!  landing: no encontre el link /login en el nav');
  } else log('--  landing: nav ya tiene /mapa');

  /* ---- banda horizontal debajo del nav ---- */
  if(!c.includes('BANDA MAPA')){
    const idx=c.indexOf('</nav>');
    if(idx>-1){
      const banda = `</nav>

      {/* BANDA MAPA */}
      <a href="/mapa" style={{display:'block',textDecoration:'none',background:'linear-gradient(90deg,rgba(2,132,199,0.14),rgba(34,197,94,0.10))',borderBottom:\`1px solid \${border}\`,padding:'14px 20px'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <span style={{fontSize:26}}>🗺️</span>
            <div>
              <div style={{fontSize:14,fontWeight:900,color:text,lineHeight:1.3}}>
                {es?'¿No sabés por dónde empezar?':'Not sure where to start?'}
              </div>
              <div style={{fontSize:11.5,color:sub,marginTop:2}}>
                {es?'Mirá qué puntos verdes de tu barrio reciben orgánicos y electrónicos.':'See which green points in your neighbourhood accept organics and e-waste.'}
              </div>
            </div>
          </div>
          <span style={{fontSize:12,fontWeight:800,color:'#0284c7',whiteSpace:'nowrap',border:'1px solid rgba(2,132,199,0.35)',borderRadius:20,padding:'8px 18px'}}>
            {es?'Ver el mapa de CABA →':'View the city map →'}
          </span>
        </div>
      </a>`;
      c=c.slice(0,idx)+banda+c.slice(idx+6); ch=true;
      log('OK  landing · banda del mapa debajo del nav');
    } else log('!!  landing: no encontre </nav>');
  } else log('--  landing: banda ya presente');

  if(ch) write('app/page.tsx',c);
}

/* ================= 2. /ciudadano: banner arriba ================= */
if(has('app/ciudadano/page.tsx')){
  let c=read('app/ciudadano/page.tsx');
  let ch=false;

  if(!c.includes('BANNER MAPA TOP')){
    const idx=c.indexOf('</nav>');
    if(idx>-1){
      const banner=`</nav>

      {/* BANNER MAPA TOP */}
      <a href="/mapa" style={{display:'block',textDecoration:'none',background:'linear-gradient(90deg,rgba(2,132,199,0.14),rgba(34,197,94,0.10))',borderBottom:'1px solid rgba(2,132,199,0.2)',padding:'14px 20px'}}>
        <div style={{maxWidth:800,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <span style={{fontSize:26}}>🗺️</span>
            <div>
              <div style={{fontSize:14,fontWeight:900,color:text,lineHeight:1.3}}>
                {es?'¿Dónde podés dejar tus orgánicos hoy?':'Where can you drop your organics today?'}
              </div>
              <div style={{fontSize:11.5,color:sub,marginTop:2}}>
                {es?'Los 21 puntos verdes de CABA · cuáles tienen compostera · cuáles reciben RAEE.':'The 21 green points of the City · which have composting · which accept e-waste.'}
              </div>
            </div>
          </div>
          <span style={{fontSize:12,fontWeight:800,color:'#0284c7',whiteSpace:'nowrap',border:'1px solid rgba(2,132,199,0.35)',borderRadius:20,padding:'8px 18px'}}>
            {es?'Ver el mapa →':'View the map →'}
          </span>
        </div>
      </a>`;
      c=c.slice(0,idx)+banner+c.slice(idx+6); ch=true;
      log('OK  /ciudadano · banner del mapa arriba');
    } else log('!!  /ciudadano: no encontre </nav>');
  } else log('--  /ciudadano: banner ya presente');

  /* quitar el bloque duplicado del fondo */
  const ini=c.indexOf('        {/* MAPA CABA */}');
  if(ini>-1){
    const fin=c.indexOf('        {/* COMPARTIR */}', ini);
    if(fin>-1){ c=c.slice(0,ini)+c.slice(fin); ch=true; log('OK  /ciudadano · bloque duplicado del fondo removido'); }
  }

  if(ch) write('app/ciudadano/page.tsx',c);
}

log('\nListo.');
