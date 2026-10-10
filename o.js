const fs=require('fs');
const f='app/page.tsx';
let c=fs.readFileSync(f,'utf8');

const get=(name)=>{
  const ini=c.indexOf(`{/* ═══ ${name} ═══ */}`);
  if(ini<0) return null;
  const sig=c.indexOf('{/* ═══ ', ini+10);
  return {ini, fin:sig, txt:c.slice(ini,sig)};
};

const raee=get('BANDA RAEE'), ope=get('BANDA OPERADORES'), org=get('BANDA ORGANICOS');
if(!raee||!ope||!org){ console.log('!! falta alguna banda'); process.exit(1); }

// quitar las tres (de atras hacia adelante)
[org,ope,raee].sort((a,b)=>b.ini-a.ini).forEach(b=>{ c=c.slice(0,b.ini)+c.slice(b.fin); });

const fila=`{/* ═══ ACCESOS ═══ */}
      <section style={{padding:'0 20px 28px',maxWidth:580,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
          {[
            {l:es?'Orgánicos':'Organics',s:es?'El diagnóstico':'Diagnosis',h:'/organicos',c:'#92400e',i:'🥬'},
            {l:'RAEE',s:es?'Electrónicos':'E-waste',h:'/raee',c:'#9333ea',i:'🔌'},
            {l:es?'Datos':'Data',s:es?'En vivo':'Live',h:'/observatorio',c:'#16a34a',i:'📊'},
          ].map((a,i)=>(
            <a key={i} href={a.h} style={{display:'block',textDecoration:'none',textAlign:'center',background:card,border:\`1px solid \${border}\`,borderRadius:12,padding:'14px 8px'}}>
              <div style={{fontSize:20,marginBottom:5}}>{a.i}</div>
              <div style={{fontSize:12,fontWeight:800,color:a.c,marginBottom:2}}>{a.l}</div>
              <div style={{fontSize:9.5,color:sub}}>{a.s}</div>
            </a>
          ))}
        </div>
      </section>

      `;

const ancla='{/* ═══ SECCIÓN 2 — DOS VIDEOS ═══ */}';
c=c.replace(ancla, ope.txt + fila + ancla);
fs.writeFileSync(f,c);
console.log('OK · operadores destacada + fila de tres accesos');
