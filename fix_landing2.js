const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

// FOOTER: agregar One Pager y Grandes Generadores
c = c.replace(
  "{l:'Whitepaper',h:'/whitepaper',c:'#a855f7'},",
  "{l:'One Pager',h:'/onepager',c:'#22c55e'},\n            {l:es?'Grandes Gen.':'Large Gen.',h:'/grandes-generadores',c:'#ef4444'},\n            {l:'Whitepaper',h:'/whitepaper',c:'#a855f7'},"
);
console.log('OK footer');

// CARDS: agregar 3er card grandes generadores antes del institucional
const cardInst = `          <a href="/institucional" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderRadius:16,background:'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.06))',border:'2px solid rgba(245,158,11,0.4)',textDecoration:'none'}}>`;

const cardGG = `          <a href="/grandes-generadores" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px',borderRadius:16,background:'linear-gradient(135deg,rgba(239,68,68,0.12),rgba(239,68,68,0.06))',border:'2px solid rgba(239,68,68,0.4)',textDecoration:'none'}}>
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <span style={{fontSize:36}}>⚖️</span>
              <div>
                <div style={{fontSize:16,fontWeight:900,color:'#ef4444'}}>{es?'Estoy obligado por la ley':'I have a legal obligation'}</div>
                <div style={{fontSize:12,color:sub,marginTop:2}}>{es?'Ley 1854 · Grandes Generadores':'Law 1854 · Large Generators'}</div>
              </div>
            </div>
            <span style={{color:'#ef4444',fontSize:20,fontWeight:700}}>→</span>
          </a>
`;

if (c.includes(cardInst) && !c.includes('/grandes-generadores')) {
  c = c.replace(cardInst, cardGG + cardInst);
  console.log('OK card grandes generadores agregado');
} else if (c.includes('/grandes-generadores')) {
  console.log('-- card ya existe');
} else {
  console.log('WARN: no encontré el card institucional exacto');
}

fs.writeFileSync('app/page.tsx', c);
console.log('Listo');
