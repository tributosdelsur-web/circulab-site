const fs=require('fs');
const read=p=>fs.readFileSync(p,'utf8'), write=(p,c)=>fs.writeFileSync(p,c), has=p=>fs.existsSync(p);
const log=console.log;

log('=== 1. LANDING · quitar card B2B duplicada ===');
if(has('app/page.tsx')){
  let c=read('app/page.tsx');
  const ini=c.indexOf('{/* CARD B2B ADMINISTRADORAS */}');
  const fin=c.indexOf('{/* FOOTER */}');
  if(ini>-1 && fin>-1 && ini<fin){
    // retroceder hasta el inicio de la linea en blanco previa
    let start=c.lastIndexOf('\n', c.lastIndexOf('\n', ini-1)-1);
    c = c.slice(0, start+1) + '\n      ' + c.slice(fin);
    write('app/page.tsx', c);
    log('OK  card B2B administradoras eliminada');
  } else log('!!  no encontre los marcadores · revisar a mano');
}

log('\n=== 2. LANDING · footer al estandar ===');
if(has('app/page.tsx')){
  let c=read('app/page.tsx');
  const v="<footer style={{padding:'32px 20px',borderTop:`1px solid ${border}`,textAlign:'center',maxWidth:580,margin:'0 auto'}}>";
  if(c.includes(v)){
    write('app/page.tsx', c.split(v).join("<footer style={{borderTop:'1px solid '+border,padding:'32px 24px',textAlign:'center',maxWidth:580,margin:'0 auto'}}>"));
    log('OK  footer landing unificado');
  } else log('--  footer landing: patron distinto o ya unificado');
}

log('\n=== 3. VARIABLES DE PAGINAS SIN FOOTER ===');
['comunidad','alianzas','aom','quincena','distribucion','simulador','privacidad','terminos'].forEach(p=>{
  const f='app/'+p+'/page.tsx';
  if(!has(f)) return;
  const c=read(f);
  const vars=['dark','tema','border','text','sub','es','card'].filter(v=>
    new RegExp('const \\[?'+v+'\\b').test(c) || new RegExp('const '+v+' *=').test(c)
  );
  log('    /'+p+' → '+(vars.length?vars.join(', '):'ninguna detectada'));
});
