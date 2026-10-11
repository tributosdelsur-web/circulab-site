const fs=require('fs'), f='app/Landing.tsx';
let c=fs.readFileSync(f,'utf8');
if(c.includes('PUERTAS SECUNDARIAS')){ console.log('.. ya estaba'); process.exit(0); }

const sacar=h=>{
  const i=c.indexOf('          <a href="'+h+'" style={{display:\'flex\'');
  if(i<0) return null;
  const j=c.indexOf('\n          </a>', i);
  if(j<0) return null;
  const txt=c.slice(i, j+15);
  c=c.slice(0,i)+c.slice(j+16);
  return txt;
};

const grandes=['/operadores','/grandes-generadores','/consorcios'];
const chicas=['/inversion','/ciudadano','/raee','/institucional'];
const bl={}; const falta=[];
grandes.concat(chicas).forEach(h=>{ const t=sacar(h); if(t) bl[h]=t; else falta.push(h); });
if(falta.length){ console.log('!! faltaron: '+falta.join(', ')); process.exit(1); }

const fila=[
"          {/* PUERTAS SECUNDARIAS */}",
"          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginTop:4}}>",
"            {[",
"              {l:es?'Soy inversor':'Investor',s:es?'El caso de negocio':'Business case',h:'/inversion',c:'#f59e0b',i:'🏛️'},",
"              {l:es?'Soy vecino':'Neighbour',s:es?'Separar y registrar':'Sort and register',h:'/ciudadano',c:'#22c55e',i:'🌿'},",
"              {l:es?'Electrónicos':'E-waste',s:'RAEE',h:'/raee',c:'#9333ea',i:'♻️'},",
"              {l:es?'El proyecto':'The project',s:es?'Quiénes somos':'About us',h:'/institucional',c:'#94a3b8',i:'🌎'},",
"            ].map((x,i)=>(",
"              <a key={i} href={x.h} style={{display:'flex',alignItems:'center',gap:10,padding:'13px 14px',borderRadius:12,background:card,border:`1px solid ${border}`,textDecoration:'none'}}>",
"                <span style={{fontSize:20,flexShrink:0}}>{x.i}</span>",
"                <div style={{minWidth:0}}>",
"                  <div style={{fontSize:12.5,fontWeight:800,color:x.c,lineHeight:1.2}}>{x.l}</div>",
"                  <div style={{fontSize:10.5,color:sub,marginTop:2}}>{x.s}</div>",
"                </div>",
"              </a>",
"            ))}",
"          </div>",
""].join('\n');

const ancla=c.indexOf('¿Por dónde entrás?');
if(ancla<0){ console.log('!! no ubique el titulo de las puertas'); process.exit(1); }
let pos=c.indexOf('\n', c.indexOf('</', ancla));
if(pos<0){ console.log('!! no ubique el cierre del titulo'); process.exit(1); }

const bloque='\n'+grandes.map(h=>bl[h]).join('\n')+'\n'+fila;
c=c.slice(0,pos)+bloque+c.slice(pos);
fs.writeFileSync(f,c);
console.log('OK · 3 puertas grandes + 4 chicas en dos columnas');
