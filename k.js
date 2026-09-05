const fs=require('fs');
const f='app/mapa/page.tsx';
let c=fs.readFileSync(f,'utf8'); let n=0;

const pares=[
["['2027','Primera cert. Verra VCS','#16a34a']","[es?'En curso':'Ongoing','Proceso de certificación','#16a34a']"],
["['2027','First Verra VCS certification','#16a34a']","['Ongoing','Certification process','#16a34a']"],
["'Primera cert.<br>Verra VCS'","es?'Proceso de<br>certificación':'Certification<br>process'"],
["'First Verra VCS<br>certification'","'Certification<br>process'"],
];
pares.forEach(([a,b])=>{ if(c.includes(a)){ c=c.split(a).join(b); n++; } });

// fallback: cualquier '2027' suelto en los KPIs
if(n===0){
  c.split('\n').forEach((l,i)=>{ if(l.includes('2027')) console.log('LINEA '+(i+1)+': '+l.trim().slice(0,160)); });
} else { fs.writeFileSync(f,c); }
console.log(n+' cambios en /mapa');
