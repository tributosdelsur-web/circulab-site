const fs=require('fs');
let T=0;
const ed=(f,pares,tag)=>{
  if(!fs.existsSync(f)) return console.log('-- '+f);
  let c=fs.readFileSync(f,'utf8'),n=0;
  pares.forEach(([a,b])=>{ if(c.includes(a)){ c=c.split(a).join(b); n++; } });
  if(n){ fs.writeFileSync(f,c); T+=n; }
  console.log((n?'OK  ':'--  ')+tag+' · '+n+'/'+pares.length);
};

ed('app/metamorfosis/page.tsx',[
["tramo: 'ÁRBOL 2027 💰'","tramo: es ? 'ÁRBOL · certificación' : 'TREE · certification'"],
["'Certificación Verra VCS · USD 22-45/t · Primer pago real · 6.329 OLV = USD 1 · ✅ Verra aprobó piloto dMRV","'Etapa futura de certificación bajo estándar Verra. Requiere validación por auditor acreditado y entre doce y veinticuatro meses de registros. ✅ Verra aprobó un piloto dMRV"],
["'Registrate gratis hoy. Acumulá OLV Verdes. Cuando Verra certifique en 2027, los primeros en empezar cobran primero.'","'Registrate gratis hoy. Cada kilo que registres es un dato verificado de residuo desviado del relleno y metano evitado, que hoy no existe en ningún lado.'"],
["'Register for free today. Accumulate Green OLV. When Verra certifies in 2027, those who started first collect first.'","'Register for free today. Every kilo you record is verified data on waste diverted from landfill and methane avoided.'"],
],'/metamorfosis');

ed('app/kits/page.tsx',[
["'Prioridad en certificación Verra 2027'","'Prioridad en el proceso de certificación'"],
["'Priority in Verra 2027 certification'","'Priority in the certification process'"],
["'Prioridad certificación Verra 2027'","'Prioridad en el proceso de certificación'"],
["'Priority Verra 2027 certification'","'Priority in the certification process'"],
["'Acceso anticipado a Quincena PULSO 2027'","'Acceso anticipado a Quincena PULSO'"],
["'Early access to Quincena PULSO 2027'","'Early access to Quincena PULSO'"],
["'Certificado Verra a nombre de la empresa 2027'","'Certificado a nombre de la empresa cuando se complete el proceso'"],
["'Verra certificate in company name 2027'","'Certificate in company name once the process is complete'"],
],'/kits');

ed('app/ciudadano/page.tsx',[
["{tramo:'🌳 Árbol',año:'2027',olv:'6.329 OLV = USD 1',c:'#f59e0b'}","{tramo:'🌳 Árbol',año:es?'Certificación':'Certification',olv:es?'Valor a definir por auditoría':'Value set by audit',c:'#f59e0b'}"],
["🌳 Árbol 2027","🌳 Árbol"],
["{es?'Los que entran HOY en Semilla acumulan OLV cuando valen cero. Cuando llegue Árbol 2027 ya tienen 2 años de ventaja. No es especulación — ","{es?'Los que registran desde hoy construyen el historial de datos que hace posible cualquier certificación futura. Sin ese historial acumulado no hay nada que auditar. "],
["{icon:'💰',l:es?'Vos cobrás':'You earn',s:'USD 2027'}","{icon:'📊',l:es?'Tu registro':'Your record',s:es?'Verificado':'Verified'}"],
["{es?'💰 Los que entran hoy en Semilla cobran primero en Árbol — 2027':'💰 Those who enter today in Semilla earn first in Árbol — 2027'}","{es?'📊 Los que registran desde hoy construyen el historial que hace posible auditar mañana':'📊 Those recording today build the history that makes tomorrow auditable'}"],
["{es?'📊 Simulación de cuánto podría recibir tu consorcio desde Árbol 2027. OLIVIA no paga — el mercado de carbono sí.'","{es?'📊 Estimación referencial. Los valores dependen de una certificación futura que aún no se completó. OLIVIA no emite créditos ni promete ingresos.'"],
["es?'🏥 Canjeás OLV por salud → clínica acumula OLV → los convierte en USD 2027'","es?'🏥 Canjeás OLV por salud → la clínica acumula OLV como registro de impacto verificado'"],
],'/ciudadano');

console.log('\n'+T+' reemplazos');
