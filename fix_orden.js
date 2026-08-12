const fs=require('fs');
const read=p=>fs.readFileSync(p,'utf8'), write=(p,c)=>fs.writeFileSync(p,c), has=p=>fs.existsSync(p);
const log=console.log;

log('=== 1. LINKS METAMORFOSIS ===');
[['app/ciudadano/page.tsx',619],['app/institucional/page.tsx',411]].forEach(([f])=>{
  if(!has(f)) return log('!!  '+f+' no existe');
  let c=read(f);
  const before=c;
  c=c.replace(/(\{img:'\/ciudadano\/metamorfosis\.jpg'[^}]*?)href:'\/registro'/g, "$1href:'/metamorfosis'");
  if(c!==before){ write(f,c); log('OK  '+f+' → /metamorfosis'); }
  else log('--  '+f+': sin cambios (ya corregido o patron distinto)');
});

log('\n=== 2. FOOTERS UNIFICADOS ===');
const FOOTER_STD = "<footer style={{borderTop:'1px solid '+border,padding:'32px 24px',textAlign:'center'}}>";
const variantes = [
  "<footer style={{padding:'20px 16px',borderTop:`1px solid ${border}`,textAlign:'center',marginTop:8}}>",
  "<footer style={{borderTop:'1px solid '+border,padding:'24px',textAlign:'center'}}>",
  "<footer style={{borderTop:'1px solid ' + border,padding:'24px',textAlign:'center'}}>",
  "<footer style={{borderTop:'1px solid '+border,padding:24,textAlign:'center'}}>",
  "<footer style={{ borderTop: `1px solid ${border}`, padding: '32px 24px', textAlign: 'center' }}>",
];
['ciudadano','consorcios','equipo','grandes-emisores','grandes-generadores','kits','mapa','metamorfosis','raee'].forEach(p=>{
  const f='app/'+p+'/page.tsx';
  if(!has(f)) return;
  let c=read(f); const before=c;
  variantes.forEach(v=>{ c=c.split(v).join(FOOTER_STD); });
  if(c!==before){ write(f,c); log('OK  /'+p); } else log('--  /'+p+': ya estandar');
});

log('\n=== 3. INSTITUCIONAL (footer flex) ===');
if(has('app/institucional/page.tsx')){
  let c=read('app/institucional/page.tsx');
  const v="<footer style={{padding:'24px',borderTop:`1px solid ${border}`,display:'flex',flexDirection:'column',alignItems:'center',gap:12,textAlign:'center'}}>";
  if(c.includes(v)){
    write('app/institucional/page.tsx', c.split(v).join("<footer style={{borderTop:'1px solid '+border,padding:'32px 24px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>"));
    log('OK  /institucional');
  } else log('--  /institucional: patron distinto');
}

log('\n=== 4. LANDING · SECCION 10 (para revisar) ===');
if(has('app/page.tsx')){
  const lines=read('app/page.tsx').split('\n');
  log(lines.slice(665,715).map((l,i)=>(666+i)+': '+l).join('\n'));
}

log('\n=== 5. PAGINAS SIN FOOTER ===');
['onepager','pitch','whitepaper','simulador','comunidad','alianzas','aom','quincena','distribucion','nda','encuesta','privacidad','terminos'].forEach(p=>{
  const f='app/'+p+'/page.tsx';
  if(has(f) && !read(f).includes('<footer')) log('    /'+p);
});
