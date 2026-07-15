const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

const viejo = `          <a href="/institucional" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderRadius:16,background:'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.06))',border:'2px solid rgba(245,158,11,0.4)',textDecoration:'none'}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontSize:36}}>🏛️</span>
              <div>
                <div style={{fontSize:16,fontWeight:900,color:'#f59e0b'}}>{es?'Soy inversor':'I\\'m an investor'}</div>
                <div style={{fontSize:12,color:sub,marginTop:2}}>{es?'Ver el ecosistema completo':'See the full ecosystem'}</div>
              </div>
            </div>
            <span style={{color:'#f59e0b',fontSize:20,fontWeight:700}}>→</span>
          </a>`;

const nuevo = viejo + `
          <a href="/grandes-generadores" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderRadius:16,background:'linear-gradient(135deg,rgba(239,68,68,0.12),rgba(239,68,68,0.06))',border:'2px solid rgba(239,68,68,0.4)',textDecoration:'none'}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontSize:36}}>⚖️</span>
              <div>
                <div style={{fontSize:16,fontWeight:900,color:'#ef4444'}}>{es?'Estoy obligado por la ley':'I have a legal obligation'}</div>
                <div style={{fontSize:12,color:sub,marginTop:2}}>{es?'Ley 1854 · Grandes Generadores':'Law 1854 · Large Generators'}</div>
              </div>
            </div>
            <span style={{color:'#ef4444',fontSize:20,fontWeight:700}}>→</span>
          </a>`;

if (c.includes(viejo)) {
  c = c.replace(viejo, nuevo);
  console.log('OK card grandes generadores agregado');
} else {
  console.log('WARN no encontrado · revisando...');
  console.log(c.includes('Soy inversor') ? 'Soy inversor existe' : 'no existe');
}

fs.writeFileSync('app/page.tsx', c);
