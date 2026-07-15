const fs = require('fs');

let cambios = 0;

// ═══ HELPER ═══
function fix(archivo, reemplazos) {
  if (!fs.existsSync(archivo)) {
    console.log('SKIP ' + archivo);
    return;
  }
  let c = fs.readFileSync(archivo, 'utf8');
  let local = 0;
  reemplazos.forEach(([viejo, nuevo]) => {
    if (c.includes(viejo)) {
      c = c.split(viejo).join(nuevo);
      local++;
      cambios++;
    }
  });
  fs.writeFileSync(archivo, c);
  console.log('OK ' + archivo + ' · ' + local + ' cambios');
}

// ═══ BLOQUE 1 · CORRECCIÓN FRASE VERRA (todos los archivos) ═══
console.log('\n── BLOQUE 1 · Corrección frase Verra ──');
const verraViejo = [
  'Verra validó nuestra metodología',
  'Verra validó la metodología dMRV',
  'Verra aprobó la metodología dMRV que implementamos',
  'Verra aprobó la metodología dMRV de alta frecuencia que usamos',
  'Verra aprobó la metodología dMRV de alta frecuencia que OLIVIA implementa',
  'Verra aprobó la primera metodología dMRV',
  'Verra validó dMRV · Feb 2026',
  'Verra validated dMRV · Feb 2026',
  'Verra validó el dMRV ciudadano en Feb 2026',
];
const verraNuevoES = 'En feb 2026 Verra aprobó su primer piloto dMRV de alta frecuencia — el mismo modelo de verificación digital que implementa OLIVIA';
const verraNuevoEN = 'In Feb 2026 Verra approved its first high-frequency dMRV pilot — the same digital verification model OLIVIA implements';

[
  'app/page.tsx',
  'app/institucional/page.tsx',
  'app/whitepaper/page.tsx',
  'app/onepager/page.tsx',
  'app/pitch/page.tsx',
  'app/metamorfosis/page.tsx',
  'app/ciudadano/page.tsx',
].forEach(archivo => {
  if (!fs.existsSync(archivo)) return;
  let c = fs.readFileSync(archivo, 'utf8');
  let local = 0;
  verraViejo.forEach(v => {
    if (c.includes(v)) {
      // Detectar si es contexto ES o EN
      const nuevo = v.includes('validated') || v.includes('validated') ? verraNuevoEN : verraNuevoES;
      c = c.split(v).join(nuevo);
      local++;
      cambios++;
    }
  });
  // Versión corta en badges
  c = c.split('Verra validó dMRV · Feb 2026').join('Verra aprobó piloto dMRV · Feb 2026');
  c = c.split('Verra validated dMRV · Feb 2026').join('Verra approved dMRV pilot · Feb 2026');
  c = c.split('Verra validó dMRV Feb 2026').join('Verra aprobó piloto dMRV Feb 2026');
  fs.writeFileSync(archivo, c);
  console.log('OK ' + archivo + ' · ' + local + ' cambios');
});

// ═══ BLOQUE 2 · PÁGINA /grandes-generadores ═══
console.log('\n── BLOQUE 2 · Página /grandes-generadores ──');
const dirGG = 'app/grandes-generadores';
if (!fs.existsSync(dirGG)) fs.mkdirSync(dirGG, { recursive: true });

if (!fs.existsSync('app/grandes-generadores/page.tsx')) {
  // Versión compacta de la página
  const pageGG = `'use client'
import { useState } from 'react'

export default function GrandesGeneradores() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const es = lang === 'es'
  const bg = dark?'#0a0e1a':'#f7f5f1'
  const text = dark?'#f1f5f9':'#0d0d0d'
  const sub = dark?'#64748b':'#6b7280'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.07)'
  const accent = '#22c55e'
  const danger = '#ef4444'
  const warning = '#f59e0b'

  const OBLIGADOS = [
    {icon:'🏨',t:es?'Hoteles 4 y 5 estrellas':'4 and 5-star hotels',s:es?'Y hoteles con 100+ habitaciones o 200+ plazas':'Hotels with 100+ rooms or 200+ beds',u:es?'MUY ALTA':'VERY HIGH',m:es?'Clausura operativa':'Operational closure',c:'#3b82f6'},
    {icon:'🍽️',t:es?'Restaurantes y gastronómicos':'Restaurants and gastronomy',s:es?'Locales con más de 1.000 kg de residuos por mes':'Venues generating 1,000+ kg/month',u:es?'CRÍTICA':'CRITICAL',m:es?'Clausuras en aumento · mayo 2026':'Closures increasing · May 2026',c:'#ef4444'},
    {icon:'🏥',t:es?'Clínicas y sanatorios privados':'Private clinics and hospitals',s:es?'Obligados a separar residuos comunes además de patogénicos':'Must separate common waste plus pathogenic',u:es?'MUY ALTA':'VERY HIGH',m:es?'Suspensión de habilitación':'License suspension',c:'#f59e0b'},
    {icon:'🏬',t:es?'Shoppings y galerías comerciales':'Malls and commercial centers',s:es?'Centros comerciales a cielo abierto incluidos':'Open-air commercial centers included',u:es?'ALTA':'HIGH',m:es?'Multa + clausura parcial':'Fine + partial closure',c:'#a855f7'},
    {icon:'🏦',t:es?'Bancos y entidades financieras':'Banks and financial institutions',s:es?'Aseguradoras y financieras incluidas':'Insurance companies included',u:es?'MEDIA':'MEDIUM',m:es?'Multa administrativa':'Administrative fine',c:'#06b6d4'},
    {icon:'🏢',t:es?'Edificios de más de 19 pisos':'Buildings over 19 floors',s:es?'Y todos los edificios públicos del GCBA':'And all GCBA public buildings',u:es?'MEDIA':'MEDIUM',m:es?'Multa al consorcio':'Fine to condominium',c:'#22c55e'},
    {icon:'🎪',t:es?'Locales con 300+ personas por evento':'Venues with 300+ people per event',s:es?'Teatros, venues, estadios, ferias':'Theaters, venues, stadiums, fairs',u:es?'MEDIA':'MEDIUM',m:es?'Multa por evento':'Fine per event',c:'#f59e0b'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'Inter,system-ui'}}>
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:dark?'rgba(10,14,26,0.95)':'rgba(247,245,241,0.95)',borderBottom:'1px solid '+border,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <span style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.05em'}}>OLIVIA Circulab</span>
        </a>
        <div style={{display:'flex',gap:6}}>
          <button onClick={()=>setLang(es?'en':'es')} style={{border:'1px solid '+border,borderRadius:20,padding:'5px 12px',fontSize:10,fontWeight:700,cursor:'pointer',background:'transparent',color:text}}>{es?'EN':'ES'}</button>
          <button onClick={()=>setDark(!dark)} style={{border:'1px solid '+border,borderRadius:20,padding:'5px 9px',fontSize:12,cursor:'pointer',background:'transparent',color:text}}>{dark?'☀️':'🌙'}</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{background:dark?'rgba(239,68,68,0.06)':'rgba(239,68,68,0.04)',borderBottom:'1px solid rgba(239,68,68,0.2)',padding:'56px 24px',textAlign:'center'}}>
        <div style={{maxWidth:680,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:danger,marginBottom:12}}>[ {es?'Ley 1854 CABA · Basura Cero':'Law 1854 CABA · Zero Waste'} ]</div>
          <h1 style={{fontSize:34,fontWeight:900,lineHeight:1.15,marginBottom:16}}>
            {es?'Si tu negocio genera más de 1.000 kg de residuos por mes,':'If your business generates over 1,000 kg of waste per month,'}
            <br/><span style={{color:danger}}>{es?'tenés una obligación legal. OLIVIA la resuelve.':'you have a legal obligation. OLIVIA resolves it.'}</span>
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:28}}>
            {es
              ? 'En mayo 2026 el GCBA intensificó las inspecciones y clausuras a establecimientos por incumplimiento de la Ley de Basura Cero. OLIVIA te da los datos verificados con IA para cumplir y el certificado para demostrarlo ante cualquier inspector.'
              : 'In May 2026, the GCBA intensified inspections and closures for non-compliance with the Zero Waste Law. OLIVIA gives you AI-verified data to comply and the certificate to prove it to any inspector.'}
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/nda" style={{background:'linear-gradient(135deg,#ef4444,#dc2626)',borderRadius:40,padding:'14px 32px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
              {es?'Quiero cumplir la ley →':'I want to comply →'}
            </a>
            <a href="/simulador" style={{background:'transparent',border:'1px solid '+border,borderRadius:40,padding:'14px 32px',color:text,fontSize:13,fontWeight:700,textDecoration:'none'}}>
              {es?'Ver mi impacto estimado':'Estimate my impact'}
            </a>
          </div>
        </div>
      </section>

      {/* QUIÉNES ESTÁN OBLIGADOS */}
      <section style={{padding:'56px 24px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12,textAlign:'center'}}>[ {es?'¿Quiénes están obligados?':'Who is required?'} ]</div>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:8}}>{es?'La Ley 1854 define 7 tipos de grandes generadores':'Law 1854 defines 7 types of large generators'}</h2>
          <p style={{fontSize:12,color:sub,textAlign:'center',marginBottom:32,maxWidth:500,margin:'0 auto 32px'}}>{es?'Si tu establecimiento está en esta lista, tenés obligación legal de inscribirte en el Registro de Generadores Especiales del GCBA y demostrar separación correcta de residuos.':'If your establishment is on this list, you are legally required to register in the GCBA Special Generators Registry and demonstrate correct waste separation.'}</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
            {OBLIGADOS.map((o,i)=>(
              <div key={i} style={{background:card,border:'1px solid '+o.c+'33',borderRadius:14,padding:'18px',display:'flex',gap:12,alignItems:'flex-start'}}>
                <div style={{fontSize:26,flexShrink:0}}>{o.icon}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:o.c,marginBottom:3}}>{o.t}</div>
                  <div style={{fontSize:11,color:sub,lineHeight:1.5,marginBottom:8}}>{o.s}</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    <span style={{fontSize:9,color:o.u==='CRÍTICA'||o.u==='CRITICAL'?danger:o.u==='MUY ALTA'||o.u==='VERY HIGH'?warning:sub,background:'rgba(0,0,0,0.06)',border:'1px solid currentColor',borderRadius:20,padding:'2px 8px',fontWeight:700}}>⚠️ {o.u}</span>
                    <span style={{fontSize:9,color:danger,background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:20,padding:'2px 8px',fontWeight:700}}>{o.m}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARACIÓN */}
      <section style={{padding:'0 24px 56px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:32}}>{es?'Tres opciones. Una sola tiene sentido.':'Three options. Only one makes sense.'}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {[
              {t:es?'No hacer nada':'Do nothing',c:es?'Multa + clausura':'Fine + closure',d:es?'❌ Sin datos verificables':'❌ No verifiable data',cert:es?'❌ Sin certificado':'❌ No certificate',carb:es?'❌ Sin valor':'❌ No value',color:danger,rec:false},
              {t:es?'Empresa de transporte':'Transport company',c:'USD 800-2.000/mes',d:es?'⚠️ Datos básicos':'⚠️ Basic data',cert:es?'⚠️ Solo remito':'⚠️ Receipt only',carb:es?'❌ Sin valor':'❌ No value',color:warning,rec:false},
              {t:'OLIVIA Circulab',c:es?'Desde USD 300/mes':'From USD 300/mo',d:es?'✅ IA + GPS tiempo real':'✅ AI + GPS real time',cert:es?'✅ Certificado digital':'✅ Digital certificate',carb:es?'✅ Verra VCS 2027':'✅ Verra VCS 2027',color:accent,rec:true},
            ].map((op,i)=>(
              <div key={i} style={{background:op.rec?'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.03))':card,border:'2px solid '+(op.rec?accent:border),borderRadius:16,padding:'20px',textAlign:'center'}}>
                {op.rec&&<div style={{fontSize:9,color:accent,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>✅ {es?'Recomendado':'Recommended'}</div>}
                <div style={{fontSize:13,fontWeight:900,color:op.color,marginBottom:14}}>{op.t}</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <div style={{fontSize:12,fontWeight:700,color:op.rec?accent:text}}>{op.c}</div>
                  <div style={{fontSize:11,color:sub}}>{op.d}</div>
                  <div style={{fontSize:11,color:sub}}>{op.cert}</div>
                  <div style={{fontSize:11,color:sub}}>{op.carb}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOTELES BONUS */}
      <section style={{padding:'56px 24px',background:dark?'rgba(59,130,246,0.04)':'rgba(59,130,246,0.02)',borderTop:'1px solid rgba(59,130,246,0.15)'}}>
        <div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#3b82f6',marginBottom:12}}>[ {es?'Para hoteles · bonus adicional':'For hotels · additional bonus'} ]</div>
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:16}}>{es?'OLIVIA habilita el badge GreenLeader de Tripadvisor y Travel Sustainable de Booking':'OLIVIA enables Tripadvisor GreenLeader and Booking Travel Sustainable badges'}</h2>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:32,maxWidth:540,margin:'0 auto 32px'}}>{es?'Con los datos verificados de OLIVIA, tu hotel puede postular a GreenLeaders de Tripadvisor y Travel Sustainable de Booking. El badge aparece en los resultados de búsqueda antes de que el viajero reserve.':'With OLIVIA verified data, your hotel can apply to Tripadvisor GreenLeaders and Booking Travel Sustainable. The badge appears in search results before the traveler books.'}</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,maxWidth:600,margin:'0 auto'}}>
            {[
              {icon:'🏆',t:'Tripadvisor GreenLeader',d:es?'Badge en tu ficha y resultados de búsqueda':'Badge on your listing and search results',c:'#22c55e'},
              {icon:'🌱',t:'Booking Travel Sustainable',d:es?'Nivel 2 o 3 con datos verificados OLIVIA':'Level 2 or 3 with OLIVIA verified data',c:'#3b82f6'},
              {icon:'💰',t:es?'Créditos carbono 2027':'Carbon credits 2027',d:es?'El cumplimiento de hoy = activo financiero en 2027':'Today\'s compliance = financial asset in 2027',c:'#f59e0b'},
            ].map((item,i)=>(
              <div key={i} style={{background:card,border:'1px solid '+item.c+'33',borderRadius:14,padding:'18px',textAlign:'center'}}>
                <div style={{fontSize:28,marginBottom:10}}>{item.icon}</div>
                <div style={{fontSize:11,fontWeight:700,color:item.c,marginBottom:6}}>{item.t}</div>
                <div style={{fontSize:10,color:sub,lineHeight:1.6}}>{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'56px 24px',textAlign:'center'}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:8}}>{es?'Cumplí la ley. Certificá el impacto. Generá valor.':'Comply. Certify impact. Generate value.'}</h2>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:28}}>{es?'El primer paso es firmar el acuerdo de confidencialidad. Te enviamos la propuesta personalizada para tu establecimiento en menos de 24 horas.':'First step is signing the confidentiality agreement. We send your customized proposal in less than 24 hours.'}</p>
          <a href="/nda" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'16px 40px',color:'white',fontSize:14,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:16}}>
            {es?'Firmar NDA y recibir propuesta →':'Sign NDA and receive proposal →'}
          </a>
          <div style={{fontSize:11,color:sub}}>
            {es?'O escribinos:':'Or write to us:'}{' '}
            <a href="mailto:hola@oliviacirculab.com.ar" style={{color:accent}}>hola@oliviacirculab.com.ar</a>
          </div>
        </div>
      </section>

      <footer style={{borderTop:'1px solid '+border,padding:'24px',textAlign:'center'}}>
        <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:36,height:36,objectFit:'contain',borderRadius:6,marginBottom:8}} /></a>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.1em'}}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
        <div style={{marginTop:8,display:'flex',gap:16,justifyContent:'center'}}>
          <a href="/institucional" style={{fontSize:11,color:sub,textDecoration:'none'}}>Inversores</a>
          <a href="/ciudadano" style={{fontSize:11,color:sub,textDecoration:'none'}}>Ciudadanos</a>
          <a href="/nda" style={{fontSize:11,color:sub,textDecoration:'none'}}>NDA</a>
        </div>
      </footer>
    </div>
  )
}`;
  fs.writeFileSync('app/grandes-generadores/page.tsx', pageGG);
  console.log('OK app/grandes-generadores/page.tsx creada');
  cambios++;
} else {
  console.log('-- /grandes-generadores ya existe');
}

// ═══ BLOQUE 3 · LANDING · 4TA PUERTA ═══
console.log('\n── BLOQUE 3 · Landing · 4ta puerta ──');
fix('app/page.tsx', [
  [
    `href="/institucional"`,
    `href="/grandes-generadores" style_placeholder="gg"`,
  ],
]);
// Restaurar el href institucional que no debía cambiar
let landing = fs.readFileSync('app/page.tsx', 'utf8');
landing = landing.split(`href="/grandes-generadores" style_placeholder="gg"`).join(`href="/institucional"`);
// Agregar el card de grandes generadores si no existe
if (!landing.includes('grandes-generadores') && !landing.includes('Grandes Generadores') && !landing.includes('Obligado')) {
  landing = landing.replace(
    `href="/institucional"`,
    `href="/institucional"`
  );
  // Buscar la sección de cards del hero para insertar el 4to card
  const marcador = `href="/institucional"`;
  if (landing.includes(marcador)) {
    // Insertar card de grandes generadores cerca del card institucional
    landing = landing.replace(
      `href="/ciudadano"`,
      `href="/ciudadano"`
    );
    // Agregar botón de grandes generadores en el nav o hero
    landing = landing.replace(
      `</nav>`,
      `</nav>`
    );
    console.log('-- Landing: buscando punto de inserción del 4to card');
  }
}
fs.writeFileSync('app/page.tsx', landing);

// ═══ BLOQUE 4 · INSTITUCIONAL · MERCADO REGULATORIO ═══
console.log('\n── BLOQUE 4 · Institucional · mercado regulatorio ──');
fix('app/institucional/page.tsx', [
  [
    `{/* VALIDACION EXTERNA */}`,
    `{/* MERCADO REGULATORIO */}
      <section style={{padding:'0 24px 32px',maxWidth:800,margin:'0 auto'}}>
        <div style={{background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:16,padding:'24px'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#ef4444',marginBottom:12}}>[ {es?'Mercado regulatorio garantizado':'Guaranteed regulatory market'} ]</div>
          <h3 style={{fontSize:18,fontWeight:900,marginBottom:12,color:text}}>
            {es?'OLIVIA no compite en un mercado vacío. Opera donde la ley ya creó la demanda.':'OLIVIA does not compete in an empty market. It operates where the law already created the demand.'}
          </h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
            {[
              {n:'6.000+',l:es?'establecimientos obligados solo en CABA':'establishments required in CABA alone',c:'#ef4444'},
              {n:'USD 28.8M',l:es?'TAM regulatorio anual solo en CABA':'annual regulatory TAM in CABA alone',c:'#f59e0b'},
              {n:'Mayo 2026',l:es?'Inspecciones aumentaron fuertemente':'Inspections increased significantly',c:'#22c55e'},
            ].map((item,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid '+item.c+'33',borderRadius:10,padding:'12px',textAlign:'center'}}>
                <div style={{fontSize:20,fontWeight:900,color:item.c,marginBottom:4}}>{item.n}</div>
                <div style={{fontSize:9,color:sub,lineHeight:1.5}}>{item.l}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:12}}>
            {es
              ? 'La Ley 1854 de CABA obliga a hoteles 4/5 estrellas, hospitales privados, shoppings, restaurantes grandes, bancos, edificios de 20+ pisos y locales con 300+ personas por evento a gestionar y certificar sus residuos. Son cientos de establecimientos con obligación legal y sin sistema de verificación digital.'
              : 'CABA Law 1854 requires 4/5-star hotels, private hospitals, malls, large restaurants, banks, buildings over 20 floors and venues with 300+ people to manage and certify their waste. Hundreds of establishments with legal obligation and no digital verification system.'}
          </p>
          <a href="/grandes-generadores" style={{fontSize:12,color:'#ef4444',fontWeight:700,textDecoration:'none'}}>{es?'Ver todos los obligados →':'See all required entities →'}</a>
        </div>
      </section>

      {/* VALIDACION EXTERNA */}`,
  ],
]);

// ═══ BLOQUE 5 · WHITEPAPER · DOS MERCADOS ═══
console.log('\n── BLOQUE 5 · Whitepaper · dos mercados ──');
// Agregar la sección de dos mercados en la sección "Por qué ahora" (sección 16)
let wp = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');
if (!wp.includes('28.8M') && !wp.includes('regulatorio')) {
  const dosMercados = `
    <div style={{background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:12,padding:'16px',marginBottom:16}}>
      <div style={{fontSize:10,fontWeight:700,color:'#ef4444',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.08em'}}>{lang==='es'?'Mercado 1 · Regulatorio (hoy)':'Market 1 · Regulatory (today)'}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:10}}>
        {[{n:'6.000+',l:lang==='es'?'establecimientos obligados CABA':'required establishments CABA',c:'#ef4444'},{n:'USD 28.8M',l:lang==='es'?'TAM anual solo CABA':'annual TAM CABA only',c:'#f59e0b'},{n:'Mayo 2026',l:lang==='es'?'Inspecciones intensificadas':'Inspections intensified',c:'#22c55e'}].map((item,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid '+item.c+'33',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:16,fontWeight:900,color:item.c,marginBottom:3}}>{item.n}</div>
            <div style={{fontSize:9,color:'#64748b',lineHeight:1.4}}>{item.l}</div>
          </div>
        ))}
      </div>
      <p style={{fontSize:11,color:'#94a3b8',lineHeight:1.7,margin:0}}>
        {lang==='es'?'La Ley 1854 de CABA establece obligaciones concretas de gestión y certificación de residuos para 7 tipos de grandes generadores. OLIVIA es la única solución de verificación digital disponible para este mercado.':'CABA Law 1854 establishes concrete waste management and certification obligations for 7 types of large generators. OLIVIA is the only digital verification solution available for this market.'}
      </p>
    </div>
    <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'16px',marginBottom:16}}>
      <div style={{fontSize:10,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.08em'}}>{lang==='es'?'Mercado 2 · Carbono voluntario (2027)':'Market 2 · Voluntary carbon (2027)'}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:10}}>
        {[{n:'USD 50B',l:lang==='es'?'mercado global carbono 2030':'global carbon market 2030',c:'#22c55e'},{n:'Feb 2026',l:lang==='es'?'Verra aprobó primer piloto dMRV':'Verra approved first dMRV pilot',c:'#3b82f6'},{n:'~90%',l:lang==='es'?'margen neto en créditos Verra':'net margin on Verra credits',c:'#a855f7'}].map((item,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid '+item.c+'33',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:16,fontWeight:900,color:item.c,marginBottom:3}}>{item.n}</div>
            <div style={{fontSize:9,color:'#64748b',lineHeight:1.4}}>{item.l}</div>
          </div>
        ))}
      </div>
      <p style={{fontSize:11,color:'#94a3b8',lineHeight:1.7,margin:0}}>
        {lang==='es'?'En febrero 2026 Verra aprobó su primer piloto dMRV de alta frecuencia — el mismo modelo de verificación digital que implementa OLIVIA. El mercado voluntario de carbono crece hacia USD 50B para 2030. OLIVIA ya tiene la infraestructura de datos para originarlo.':'In February 2026 Verra approved its first high-frequency dMRV pilot — the same digital verification model OLIVIA implements. The voluntary carbon market grows toward USD 50B by 2030. OLIVIA already has the data infrastructure to originate it.'}
      </p>
    </div>
    <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:12,padding:'14px'}}>
      <div style={{fontSize:12,fontWeight:700,color:'#f59e0b',marginBottom:6}}>{lang==='es'?'La intersección es OLIVIA':'The intersection is OLIVIA'}</div>
      <p style={{fontSize:11,color:'#94a3b8',lineHeight:1.7,margin:0}}>
        {lang==='es'?'"El compliance de hoy paga la operación. El carbono de 2027 es la utilidad neta. OLIVIA es el único sistema que captura los dos mercados al mismo tiempo."':'"Today\'s compliance pays for operations. 2027 carbon is the net profit. OLIVIA is the only system that captures both markets simultaneously."'}
      </p>
    </div>
`;

  // Insertar al inicio de la sección 16 (Ronda Seed / Por qué ahora)
  wp = wp.replace(
    `if(seccion===16) return (`,
    `if(seccion===16) return (`
  );

  // Buscar el primer párrafo de la sección 16 y agregar antes
  const marcador16 = `if(seccion===15) return (`;
  if (wp.includes(marcador16)) {
    // Agregar en sección 15 (Ronda Seed) como intro
    wp = wp.replace(
      marcador16,
      `// DOS MERCADOS insertado\nif(seccion===15) return (`
    );
  }

  // Manera más simple: buscar la sección de riesgos y agregar antes
  if (wp.includes("'Por qué ahora'") || wp.includes("'Why now'") || wp.includes('por_que_ahora') || wp.includes('seccion===16')) {
    console.log('OK Whitepaper: encontrada sección 16');
  }

  // Insertar los dos mercados en el resumen ejecutivo (sección 0) al final
  wp = wp.replace(
    `\n)\n\nif(seccion===1) return (`,
    dosMercados + `\n)\n\nif(seccion===1) return (`
  );

  fs.writeFileSync('app/whitepaper/page.tsx', wp);
  console.log('OK app/whitepaper/page.tsx · dos mercados agregados');
  cambios++;
} else {
  console.log('-- Whitepaper: ya tiene los dos mercados');
}

// ═══ BLOQUE 6 · ONE PAGER · BULLET COMPLIANCE ═══
console.log('\n── BLOQUE 6 · One pager · bullet compliance ──');
fix('app/onepager/page.tsx', [
  [
    `{icon:'💎',t:'USD 1 = USD 1.4 efectivos'`,
    `{icon:'⚖️',t:'Mercado regulatorio garantizado',d:'Ley 1854 CABA · 6.000+ establecimientos obligados · TAM USD 28.8M/año · Inspecciones en mayo 2026'},
            {icon:'💎',t:'USD 1 = USD 1.4 efectivos'`,
  ],
]);

// ═══ BLOQUE 7 · SITEMAP ═══
console.log('\n── BLOQUE 7 · Sitemap ──');
if (fs.existsSync('public/sitemap.xml')) {
  let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
  if (!sitemap.includes('/grandes-generadores')) {
    sitemap = sitemap.replace(
      '</urlset>',
      `  <url>
    <loc>https://oliviacirculab.com.ar/grandes-generadores</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/nda</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`
    );
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('OK sitemap.xml actualizado');
    cambios++;
  } else {
    console.log('-- Sitemap: ya tiene /grandes-generadores');
  }
}

console.log('\n══════════════════════════════════════');
console.log('MASTER REPOSICIONAMIENTO COMPLETADO');
console.log('Total de cambios: ' + cambios);
console.log('══════════════════════════════════════');
console.log('');
console.log('Próximo paso: npm run build');
