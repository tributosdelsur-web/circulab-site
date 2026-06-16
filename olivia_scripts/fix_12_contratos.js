// SCRIPT 12 — T&C con mandato implícito + modelo de contratos en whitepaper y pitch
const fs = require('fs');

// === TÉRMINOS Y CONDICIONES ===
// Verificar si existe la pagina de terminos
if (fs.existsSync('app/terminos/page.tsx')) {
  let terminos = fs.readFileSync('app/terminos/page.tsx', 'utf8');

  if (!terminos.includes('mandato') && !terminos.includes('Verra') && !terminos.includes('creditos')) {

    // Agregar cláusula de mandato a los T&C existentes
    const clausulaMandato = `
              {/* CLAUSULA DE MANDATO - CRITICA */}
              <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'20px',marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:900,color:'#22c55e',marginBottom:12}}>
                  Clausula 8 — Mandato de certificacion y distribucion
                </div>
                <div style={{fontSize:12,color:'#94a3b8',lineHeight:1.8,marginBottom:12}}>
                  Al registrarte en la plataforma OLIVIA y verificar tus residuos, autorizas expresamente a Circulab Tech S.A.S. a:
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
                  {[
                    'Actuar como tu mandatario para certificar el impacto ambiental de tus residuos verificados bajo protocolos internacionales incluyendo Verra VCS y Gold Standard.',
                    'Recibir en nombre del ecosistema OLIVIA los pagos de compradores de creditos de carbono (empresas, fondos, organismos internacionales) correspondientes a los creditos generados por tu actividad verificada.',
                    'Distribuirte el porcentaje correspondiente de los creditos generados segun la tabla de distribucion vigente en el momento de la certificacion, acreditado en tu wallet OLIVIA.',
                    'Retener el porcentaje correspondiente a Circulab Tech segun la misma tabla, como contraprestacion por la infraestructura tecnologica, el proceso de certificacion y la gestion comercial.',
                    'Ejecutar la distribucion de forma automatica mediante contratos inteligentes (smart contracts) una vez que los creditos sean certificados y los pagos sean recibidos.',
                  ].map((item, i) => (
                    <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                      <span style={{color:'#22c55e',flexShrink:0,marginTop:2}}>{i+1}.</span>
                      <span style={{fontSize:11,color:'#94a3b8',lineHeight:1.6}}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:'12px',fontSize:11,color:'#94a3b8',lineHeight:1.7}}>
                  <strong style={{color:'#f59e0b'}}>Importante:</strong> Los OLV acumulados durante el periodo Semilla (2026) y Brote (Q4 2026) no tienen valor monetario garantizado. El valor de los OLV Verdes se materializa unicamente cuando OLIVIA obtenga la certificacion formal de Verra VCS, lo cual se estima para el tramo Arbol 2027. Este plazo esta sujeto a la escala minima requerida (~500t/anio), al proceso de auditoria de Verra, y a los precios del mercado voluntario de carbono al momento de la certificacion. Registrarse en OLIVIA hoy es ser primer movedor: los OLV acumulados mantienen su valor proporcional en fases posteriores.
                </div>
              </div>
`;

    // Insertar antes del cierre de los terminos
    terminos = terminos.replace(
      '{/* FIN TERMINOS */}',
      clausulaMandato + '{/* FIN TERMINOS */}'
    );

    // Si no encuentra el marcador buscar otro punto
    if (!terminos.includes(clausulaMandato)) {
      terminos = terminos.replace(
        '</div>\n  )\n}',
        clausulaMandato + '</div>\n  )\n}'
      );
    }

    fs.writeFileSync('app/terminos/page.tsx', terminos);
    console.log('OK Terminos: clausula de mandato agregada');
  } else {
    console.log('-- Terminos: ya tiene clausulas de mandato o Verra');
  }
} else {
  console.log('WARN app/terminos/page.tsx no existe · crear manualmente');
}

// === WHITEPAPER — nueva sección modelo de contratos ===
let wp = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');

if (!wp.includes('mandato') && !wp.includes('smart contract') && !wp.includes('distribucion automatica')) {
  const seccionContratos = `
if(seccion===17) return (
  <div>
    <div style={s.titulo}>{lang==='es'?'Modelo de contratos y distribucion':'Contract model and distribution'}</div>

    <div style={{...s.highlight,border:'1px solid rgba(245,158,11,0.2)',background:'rgba(245,158,11,0.04)',marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,color:'#f59e0b',marginBottom:6}}>
        {lang==='es'?'La pregunta central':'The central question'}
      </div>
      <div style={s.p}>
        {lang==='es'
          ? 'Cuando Verra certifique los creditos en 2027 y una naviera pague USD 500.000 a Circulab Tech, como llega ese dinero al vecino de Palermo que separo sus organicos en 2026? Esa es la pregunta que este modelo responde.'
          : 'When Verra certifies credits in 2027 and a shipping company pays USD 500,000 to Circulab Tech, how does that money reach the Palermo neighbor who separated their organics in 2026? That is the question this model answers.'}
      </div>
    </div>

    {(lang==='es'?[
      {
        t:'Fase 1 · Hoy (Semilla 2026) · Mandato digital via T&C',
        c:'#22c55e',
        items:[
          'Al registrarse el ciudadano acepta los Terminos y Condiciones de OLIVIA.',
          'Los T&C incluyen la Clausula 8 de Mandato de Certificacion y Distribucion.',
          'Esta clausula autoriza expresamente a Circulab Tech a actuar como mandatario para certificar los residuos y distribuir los creditos correspondientes.',
          'El mandato digital es legalmente valido en Argentina bajo la Ley 25.506 de firma digital y los arts. 1319-1334 del Codigo Civil y Comercial.',
          'Los OLV acumulados quedan registrados en Supabase como activos pendientes de certificacion.',
          'Sin friccion adicional para el usuario. Sin firma extra. Sin billetera cripto requerida hoy.',
        ]
      },
      {
        t:'Fase 2 · Post-inversion (2026-2027) · Smart contracts',
        c:'#3b82f6',
        items:[
          'Con el capital Seed, el CTO disenara y auditara el smart contract de distribucion.',
          'Los OLV Verdes migran progresivamente a una wallet on-chain por usuario.',
          'El smart contract codifica la tabla de distribucion: X% ciudadano, Y% recolector, Z% Circulab Tech, W% reserva ecosistema.',
          'La auditoria del smart contract es obligatoria antes del deploy: empresa especializada externa verifica que el codigo hace exactamente lo que dice.',
          'El ciudadano obtiene una wallet OLIVIA propia, visible desde su dashboard.',
          'Compatible con Toucan Protocol y Moss.earth para tokenizacion de creditos Verra VCS.',
        ]
      },
      {
        t:'Fase 3 · Arbol 2027 · Distribucion automatica',
        c:'#f59e0b',
        items:[
          'Verra certifica los creditos y los registra en el Verra Registry.',
          'El comprador (naviera, minera, aerolinea, empresa RSE) paga a Circulab Tech.',
          'El smart contract de distribucion se ejecuta automaticamente.',
          'Cada wallet ciudadana recibe el porcentaje correspondiente en tiempo real.',
          'El ciudadano ve en su app: Recibiste USD X por tus OLV Verdes certificados.',
          'Puede retirar a Mercado Pago, transferencia bancaria local, o mantener en wallet para fases posteriores.',
          'Circulab Tech retiene su porcentaje como contraprestacion por infraestructura, certificacion y gestion comercial.',
        ]
      },
      {
        t:'Por que no esperar al smart contract para registrarse',
        c:'#a855f7',
        items:[
          'El mandato digital de los T&C ya es suficiente hoy para que Circulab Tech actue legalmente en nombre del ciudadano.',
          'Los OLV acumulados en Semilla 2026 mantienen su valor proporcional cuando llegue la distribucion en 2027.',
          'Registrarse hoy es ser primer movedor: el historial verificado de 18 meses tiene mas valor que empezar en Arbol 2027.',
          'El smart contract de 2027 distribuira retroactivamente los creditos generados desde el inicio del sistema, no solo los futuros.',
        ]
      },
    ]:[
      {
        t:'Phase 1 · Today (Semilla 2026) · Digital mandate via T&C',
        c:'#22c55e',
        items:[
          'When registering, citizens accept OLIVIA Terms and Conditions.',
          'T&C include Clause 8: Certification and Distribution Mandate.',
          'This clause expressly authorizes Circulab Tech to act as agent to certify waste and distribute corresponding credits.',
          'Digital mandate is legally valid in Argentina under Law 25.506 on digital signatures and Civil and Commercial Code arts. 1319-1334.',
          'Accumulated OLV are registered in Supabase as assets pending certification.',
          'No additional friction for the user. No extra signature. No crypto wallet required today.',
        ]
      },
      {
        t:'Phase 2 · Post-investment (2026-2027) · Smart contracts',
        c:'#3b82f6',
        items:[
          'With Seed capital, the CTO will design and audit the distribution smart contract.',
          'Green OLV progressively migrate to an on-chain wallet per user.',
          'Smart contract codifies the distribution table: X% citizen, Y% collector, Z% Circulab Tech, W% ecosystem reserve.',
          'Smart contract audit is mandatory before deploy: external specialized firm verifies code does exactly what it says.',
          'Citizen gets their own OLIVIA wallet, visible from their dashboard.',
          'Compatible with Toucan Protocol and Moss.earth for Verra VCS credit tokenization.',
        ]
      },
      {
        t:'Phase 3 · Arbol 2027 · Automatic distribution',
        c:'#f59e0b',
        items:[
          'Verra certifies credits and registers them in the Verra Registry.',
          'Buyer (shipping company, miner, airline, RSE company) pays Circulab Tech.',
          'Distribution smart contract executes automatically.',
          'Each citizen wallet receives the corresponding percentage in real time.',
          'Citizen sees in their app: You received USD X for your certified Green OLV.',
          'Can withdraw to Mercado Pago, local bank transfer, or keep in wallet for later phases.',
          'Circulab Tech retains its percentage as consideration for infrastructure, certification and commercial management.',
        ]
      },
      {
        t:'Why not wait for the smart contract to register',
        c:'#a855f7',
        items:[
          'The digital mandate in T&C is already sufficient today for Circulab Tech to legally act on behalf of citizens.',
          'OLV accumulated in Semilla 2026 maintain their proportional value when distribution arrives in 2027.',
          'Registering today means being a first mover: 18 months of verified history is more valuable than starting in Arbol 2027.',
          'The 2027 smart contract will retroactively distribute credits generated from the beginning, not just future ones.',
        ]
      },
    ]).map(item=>(
      <div key={item.t} style={{...s.card,borderLeft:'3px solid ' + item.c,marginBottom:12}}>
        <div style={{fontSize:12,fontWeight:700,color:item.c,marginBottom:8}}>{item.t}</div>
        {item.items.map((it,i)=>(
          <div key={i} style={{display:'flex',gap:8,marginBottom:6,alignItems:'flex-start'}}>
            <span style={{color:item.c,flexShrink:0}}>·</span>
            <span style={s.p}>{it}</span>
          </div>
        ))}
      </div>
    ))}

    <div style={{...s.highlight,border:'1px solid rgba(34,197,94,0.2)',background:'rgba(34,197,94,0.04)',marginTop:8}}>
      <div style={s.verde}>{lang==='es'?'En resumen':'In summary'}</div>
      <div style={s.p}>
        {lang==='es'
          ? 'Hoy: T&C con mandato digital. 2027: smart contract ejecuta la distribucion automaticamente. El ciudadano no necesita hacer nada adicional. Circulab Tech opera como coordinador neutral que construye el sistema, lo certifica, y distribuye el valor a quienes lo generaron.'
          : 'Today: T&C with digital mandate. 2027: smart contract executes distribution automatically. The citizen needs to do nothing additional. Circulab Tech operates as a neutral coordinator that builds the system, certifies it, and distributes value to those who generated it.'}
      </div>
    </div>
  </div>
)

`;

  wp = wp.replace(
    'if(seccion===16) return (',
    seccionContratos + 'if(seccion===16) return ('
  );

  // Actualizar navegacion
  wp = wp.replace(/seccion<16/g, 'seccion<17');
  wp = wp.replace(/seccion>0&&seccion<16/g, 'seccion>0&&seccion<17');

  fs.writeFileSync('app/whitepaper/page.tsx', wp);
  console.log('OK Whitepaper: seccion contratos y distribucion agregada');
} else {
  console.log('-- Whitepaper: ya tiene modelo de contratos');
}

// === PITCH — slide del modelo de contratos ===
let pitch = fs.readFileSync('app/pitch/page.tsx', 'utf8');

if (!pitch.includes('mandato') && !pitch.includes('smart contract')) {
  const slideContratos = `
{tab==='contratos'&&(
  <div style={{display:'flex',flexDirection:'column',gap:20}}>
    <div style={{textAlign:'center',marginBottom:8}}>
      <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#64748b',marginBottom:8}}>[ {es?'Modelo de contratos':'Contract model'} ]</div>
      <h2 style={{fontSize:22,fontWeight:900,marginBottom:8}}>
        {es?'Como le llega el dinero al vecino':'How the money reaches the neighbor'}
      </h2>
      <p style={{fontSize:12,color:'#64748b',maxWidth:500,margin:'0 auto'}}>
        {es
          ? 'Verra paga a Circulab Tech. El smart contract distribuye automaticamente. El vecino retira en Mercado Pago.'
          : 'Verra pays Circulab Tech. Smart contract distributes automatically. Neighbor withdraws via Mercado Pago.'}
      </p>
    </div>

    {/* Diagrama de flujo */}
    <div style={{display:'flex',flexDirection:'column',gap:8,maxWidth:600,margin:'0 auto',width:'100%'}}>
      {[
        {icon:'🚢',label:es?'Naviera / Minera / Aerolinea':'Shipping / Mining / Airline',desc:es?'Compra creditos de carbono certificados por Verra':'Buys Verra-certified carbon credits',color:'#06b6d4'},
        {icon:'⬇️',label:'',desc:'',color:'transparent'},
        {icon:'🏢',label:'Circulab Tech',desc:es?'Recibe el pago · ejecuta el smart contract de distribucion':'Receives payment · executes distribution smart contract',color:'#22c55e'},
        {icon:'⬇️',label:'',desc:'',color:'transparent'},
        {icon:'⚡',label:'Smart Contract',desc:es?'Distribuye automaticamente segun tabla de OLV verificados':'Automatically distributes per verified OLV table',color:'#a855f7'},
        {icon:'⬇️',label:'',desc:'',color:'transparent'},
        {icon:'👤',label:es?'Wallet del vecino':'Neighbor wallet',desc:es?'Recibe su porcentaje · retira a Mercado Pago o banco':'Receives their percentage · withdraws to Mercado Pago or bank',color:'#f59e0b'},
      ].map((item,i)=>(
        item.color==='transparent'
          ? <div key={i} style={{textAlign:'center',fontSize:20,color:'#64748b'}}>↓</div>
          : <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'2px solid ' + item.color + '33',borderRadius:12,padding:'14px',display:'flex',gap:14,alignItems:'center'}}>
              <span style={{fontSize:28,flexShrink:0}}>{item.icon}</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:item.color}}>{item.label}</div>
                <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{item.desc}</div>
              </div>
            </div>
      ))}
    </div>

    {/* Las 3 fases */}
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
      {[
        {fase:'HOY · 2026',titulo:es?'Mandato digital':'Digital mandate',desc:es?'Al registrarse el ciudadano acepta T&C con Clausula 8 de Mandato. Legalmente valido bajo Ley 25.506 Argentina.':'When registering citizen accepts T&C with Mandate Clause 8. Legally valid under Argentina Law 25.506.',color:'#22c55e'},
        {fase:'2026-2027',titulo:'Smart Contract',desc:es?'El CTO audita y deploya el contrato de distribucion. Los OLV Verdes migran a wallet on-chain. Auditoria externa obligatoria.':'CTO audits and deploys distribution contract. Green OLV migrate to on-chain wallet. External audit mandatory.',color:'#3b82f6'},
        {fase:'ARBOL 2027',titulo:es?'Distribucion automatica':'Automatic distribution',desc:es?'Verra certifica. El comprador paga. El smart contract ejecuta. El vecino recibe en segundos. Sin intervencion manual.':'Verra certifies. Buyer pays. Smart contract executes. Neighbor receives in seconds. No manual intervention.',color:'#f59e0b'},
      ].map((item,i)=>(
        <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid ' + item.color + '33',borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:9,fontWeight:700,color:item.color,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>{item.fase}</div>
          <div style={{fontSize:12,fontWeight:700,color:item.color,marginBottom:6}}>{item.titulo}</div>
          <div style={{fontSize:10,color:'#64748b',lineHeight:1.6}}>{item.desc}</div>
        </div>
      ))}
    </div>

    <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',textAlign:'center'}}>
      <div style={{fontSize:12,color:'#22c55e',fontWeight:700,marginBottom:4}}>
        {es?'Circulab Tech como coordinador neutral':'Circulab Tech as neutral coordinator'}
      </div>
      <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.7,fontStyle:'italic'}}>
        {es
          ? '"No somos el empleador del vecino. No somos el banco. Somos la infraestructura que construye el sistema, lo certifica, y distribuye el valor a quienes lo generaron. El mercado de carbono paga. Nosotros coordinamos."'
          : '"We are not the neighbor employer. We are not the bank. We are the infrastructure that builds the system, certifies it, and distributes value to those who generated it. The carbon market pays. We coordinate."'}
      </div>
    </div>
  </div>
)}
`;

  pitch = pitch.replace(
    '{/* FIN PITCH */}',
    slideContratos + '{/* FIN PITCH */}'
  );

  fs.writeFileSync('app/pitch/page.tsx', pitch);
  console.log('OK Pitch: slide modelo de contratos agregada');
} else {
  console.log('-- Pitch: ya tiene slide de contratos');
}

console.log('');
console.log('Script 12 completado');
console.log('Modelo de contratos en 3 fases:');
console.log('  Hoy: mandato digital via T&C (Ley 25.506)');
console.log('  2027: smart contract de distribucion automatica');
console.log('  Arbol 2027: Verra paga → contrato ejecuta → vecino recibe');
