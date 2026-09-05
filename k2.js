const fs=require('fs');
const f='app/mapa/page.tsx';
let c=fs.readFileSync(f,'utf8'); let n=0;

const pares=[
["'Con QR instalado, cada depósito genera un dato certificable para Verra VCS 2027.'",
 "'Con QR instalado, cada depósito genera un registro verificable: origen, peso y destino.'"],
["'With a QR installed, each deposit generates a certifiable data point for Verra VCS 2027.'",
 "'With a QR installed, each deposit generates a verifiable record: origin, weight and destination.'"],
["['Verra certifica 2027:','crédito 1 por reciclaje (AMS-III.F) + crédito 2 por restauración ecológica (VM0047, mayor precio).']",
 "['Certificación futura:','con doce a veinticuatro meses de registros se puede iniciar la validación bajo metodologías de compostaje y de restauración ecológica. Proceso de dos a tres años.']"],
["['Verra certifies in 2027:','credit 1 for recycling (AMS-III.F) + credit 2 for ecological restoration (VM0047, higher price).']",
 "['Future certification:','with twelve to twenty-four months of records, validation can begin under composting and ecological restoration methodologies. A two to three year process.']"],
["['Verra certifica 2027:','crédito por materiales recuperados vs. extracción minera nueva. USD 10–30/tCO₂.']",
 "['Certificación futura:','la metodología AMS-III.BA certifica materiales recuperados frente a extracción minera nueva. Requiere validación por auditor acreditado.']"],
["['Verra certifies in 2027:','credit for recovered materials versus new mining extraction. USD 10–30/tCO₂.']",
 "['Future certification:','AMS-III.BA certifies recovered materials versus new mining extraction. Requires accredited auditor validation.']"],
["{es?'Los datos que se registran hoy son los créditos de 2027.':'The data recorded today are the credits of 2027.'}",
 "{es?'El reloj de la certificación arranca el día que se registra el primer dato.':'The certification clock starts the day the first record is made.'}"],
];
pares.forEach(([a,b])=>{ if(c.includes(a)){ c=c.split(a).join(b); n++; } });
if(n) fs.writeFileSync(f,c);
console.log(n+'/7 reemplazos');
c.split('\n').forEach((l,i)=>{ if(l.includes('2027')) console.log('PENDIENTE '+(i+1)+': '+l.trim().slice(0,150)); });
