const fs=require('fs'), f='app/inversion/page.tsx';
let c=fs.readFileSync(f,'utf8');
if(c.includes('El circuito mínimo')){ console.log('.. ya estaba'); process.exit(0); }

const b=[
"        <H n={es ? 'El circuito mínimo' : 'The minimum circuit'} tt={es ? 'Tres actores, no siete.' : 'Three actors, not seven.'} />",
"        <P>",
"          {es",
"            ? 'La objeción más común a este proyecto es que depende de coordinar demasiada gente: vecinos, puntos verdes, cooperativas, plantas, logística y auditoría. Es una objeción correcta sobre el sistema completo, y por eso el sistema completo no es la primera etapa.'",
"            : 'The most common objection is that this depends on coordinating too many actors. It is a fair objection about the complete system, which is why the complete system is not the first stage.'}",
"        </P>",
"        <P>",
"          {es",
"            ? 'Para demostrar que la verificación funciona alcanza con tres piezas. Todo lo demás viene después y solo si estas tres funcionan.'",
"            : 'Proving that verification works takes three pieces. Everything else comes later, and only if these three work.'}",
"        </P>",
"        <div style={{ display: 'grid', gap: 9 }}>",
"          {(es ? [",
"            ['01', 'Un generador obligado', 'Un solo sitio: un hotel, un supermercado, un edificio corporativo. Paga hoy por su fracción húmeda y tiene un expediente que sostener. Es quien recibe el ahorro y quien firma el contrato.'],",
"            ['02', 'Una balanza', 'Un equipo instalado en ese sitio. Pesa, firma el dato en el origen y transmite. No hay estimación visual en el camino crítico.'],",
"            ['03', 'Una planta habilitada', 'Recibe el material y confirma el procesamiento. Es el cuarto dato, el que cierra el registro y el que ninguna otra plataforma produce hoy.'],",
"          ] : [",
"            ['01', 'One obligated generator', 'A single site that already pays for its wet fraction and has a compliance record to maintain.'],",
"            ['02', 'One scale', 'Installed at that site. It weighs, signs the data at source and transmits.'],",
"            ['03', 'One licensed plant', 'Receives the material and confirms processing. The fourth data point.'],",
"          ]).map((x, i) => (",
"            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px' }}>",
"              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 7 }}>",
"                <span style={{ fontSize: 11, fontFamily: 'monospace', color: accent, letterSpacing: '0.2em', fontWeight: 700 }}>{x[0]}</span>",
"                <span style={{ fontSize: 15.5, fontWeight: 800 }}>{x[1]}</span>",
"              </div>",
"              <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[2]}</div>",
"            </div>",
"          ))}",
"        </div>",
"        <div style={{ marginTop: 14 }}>",
"          <Card>",
"            <Rubro t={t}>{es ? 'Lo que no está en la primera etapa' : 'Not in the first stage'}</Rubro>",
"            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7 }}>",
"              {es",
"                ? 'Ni vecinos, ni puntos verdes, ni logística propia, ni cooperativas, ni app masiva, ni créditos de carbono. Todo eso está en el proyecto y nada de eso hace falta para probar que el dato se produce, se firma y se confirma. La adopción ciudadana es la etapa que escala el volumen, no la que demuestra el método.'",
"                : 'No neighbours, no drop-off points, no own logistics, no cooperatives, no mass app, no carbon credits. None of it is needed to prove that the data is produced, signed and confirmed.'}",
"            </div>",
"            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7, marginTop: 12 }}>",
"              {es",
"                ? 'Por eso el tramo 1 del pedido financia exactamente esas tres piezas y nada más. Un inversor no está apostando a que cambiemos el comportamiento de una ciudad: está apostando a que un sitio, un equipo y una planta produzcan un registro que resista una auditoría.'",
"                : 'That is why tranche 1 funds exactly those three pieces. An investor is not betting that we change a city\\u2019s behaviour: they are betting that one site, one device and one plant produce a record that survives an audit.'}",
"            </div>",
"          </Card>",
"        </div>",
"",
""].join('\n');

const anc="        <H n={es ? 'Mercado' : 'Market'}";
if(!c.includes(anc)){ console.log('!! ancla no encontrada'); process.exit(1); }
c=c.replace(anc, b+anc);
fs.writeFileSync(f,c);
console.log('OK · circuito minimo insertado antes de Mercado');
