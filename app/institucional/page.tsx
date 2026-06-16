'use client'

// SEO metadata

import { useState } from 'react'

export default function Institucional() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)

  const bg = dark?'#050505':'#f7f5f1'
  const text = dark?'#f5f5f5':'#0d0d0d'
  const accent = dark?'#22c55e':'#14532d'
  const card = dark?'#0f0f0f':'#ffffff'
  const border = dark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.07)'
  const sub = dark?'#9ca3af':'#6b7280'
  const es = lang==='es'

  const TRAMOS = [
    {icon:'🌱',l:es?'SEMILLA · 2026':'SEED · 2026',d:es?'Piloto dMRV activo · OLV acumulándose · Historial para Verra · Product-market fit':'Active dMRV pilot · OLV accumulating · Verra history building · Product-market fit',c:'#22c55e',activo:true},
    {icon:'🌿',l:es?'BROTE · Q4 2026':'SPROUT · Q4 2026',d:es?'OLV canjeables · Convenios partner · 3 consorcios piloto · Serie A Q1 2027':'OLV redeemable · Partner deals · 3 pilot buildings · Series A Q1 2027',c:'#3b82f6',activo:false},
    {icon:'🌳',l:es?'ÁRBOL · 2027 💰':'TREE · 2027 💰',d:es?'Certificación Verra VCS · Primer pago USD · ✅ Verra validó el método dMRV en Feb 2026 — certeza técnica confirmada · 6.329 OLV = USD 1':'Verra VCS certification · First USD payment · ✅ Verra validated dMRV method Feb 2026 — technical certainty confirmed · 6.329 OLV = USD 1',c:'#f59e0b',activo:false},
    {icon:'🌲',l:es?'BOSQUE · 2028':'FOREST · 2028',d:es?'Art. 6.4 París · 2.198 OLV = USD 1 · Corredor AR MX CO BR CH DO · OLIVIA Exchange blockchain':'Art. 6.4 Paris · 2.198 OLV = USD 1 · AR MX CO BR CH DO · OLIVIA Exchange blockchain',c:'#a855f7',activo:false},
    {icon:'🏔️',l:es?'SELVA · 2029':'JUNGLE · 2029',d:es?'OLIVIA Ocean + Waters + Space · 1.429 OLV = USD 1 · PULSO estándar LATAM':'OLIVIA Ocean + Waters + Space · 1.429 OLV = USD 1 · PULSO LATAM standard',c:'#ec4899',activo:false},
    {icon:'🌊',l:es?'SUMIDERO · 2030+':'SINK · 2030+',d:es?'Net positive verificado · 952 OLV = USD 1 · Infraestructura climática global':'Verified net positive · 952 OLV = USD 1 · Global climate infrastructure',c:'#06b6d4',activo:false},
  ]

  const GARANTIAS = [
    {icon:'🏛️',t:es?'Seat en el board con voto informado':'Board seat with informed vote'},
    {icon:'📊',t:es?'Reporting mensual verificado':'Verified monthly reporting'},
    {icon:'🔐',t:es?'Milestone-based disbursement':'Milestone-based disbursement'},
    {icon:'🛡️',t:es?'Anti-dilution protection':'Anti-dilution protection'},
    {icon:'🤝',t:es?'Tag-along rights':'Tag-along rights'},
    {icon:'✅',t:es?'Sin costos fijos hasta inversión comprometida':'No fixed costs until investment committed'},
    {icon:'🔍',t:es?'Auditoría de código mes 1-2':'Code audit months 1-2'},
    {icon:'📋',t:es?'Estabilidad fiscal 10 años · Ley 27.506':'10-year fiscal stability · Law 27.506'},
    {icon:'💎',t:es?'Cada USD 1 = USD 1.4 efectivos · Riesgo técnico reducido: Verra validó dMRV Feb 2026':'Every USD 1 = USD 1.4 effective · Technical risk reduced: Verra validated dMRV Feb 2026'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'Inter,system-ui',transition:'all 0.3s',overflowX:'hidden'}}>

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:dark?'rgba(5,5,5,0.9)':'rgba(247,245,241,0.9)',borderBottom:`1px solid ${border}`,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <div>
            <div style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.05em'}}>Circulab Tech</div>
            <div style={{fontSize:9,color:sub,textTransform:'uppercase',letterSpacing:'0.15em',fontFamily:'monospace'}}>
              {es?'Infraestructura IA Urbana':'Urban AI Infrastructure'}
            </div>
          </div>
        </a>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <a href="/pitch" style={{background:accent,color:dark?'#050505':'white',padding:'6px 14px',borderRadius:20,fontSize:10,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.06em'}}>
            {es?'Ver pitch':'View pitch'}
          </a>
          <button onClick={()=>setLang(es?'en':'es')}
            style={{border:`1px solid ${border}`,borderRadius:20,padding:'5px 12px',fontSize:10,fontWeight:700,cursor:'pointer',background:'transparent',color:text,fontFamily:'monospace'}}>
            {es?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)}
            style={{border:`1px solid ${border}`,borderRadius:20,padding:'5px 9px',fontSize:12,cursor:'pointer',background:'transparent',color:text}}>
            {dark?'☀️':'🌙'}
          </button>
        </div>
      </nav>

      {/* HERO con logo + grid */}
      <section style={{
        padding:'60px 24px 60px',
        backgroundImage:`linear-gradient(${border} 1px,transparent 1px),linear-gradient(90deg,${border} 1px,transparent 1px)`,
        backgroundSize:'50px 50px',
        position:'relative'
      }}>
        <div style={{maxWidth:800,margin:'0 auto'}}>

<div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:20,justifyContent:'center'}}>
            {[
              'AI-Native Ecosystems',
              'Buenos Aires Sandbox',
              'LATAM Infrastructure',
              es?'Ley 27.506 · 1.4x':'Law 27.506 · 1.4x',
              es?'🚀 USD 0 inversión externa':'🚀 USD 0 external investment',
              es?'✅ Verra validó dMRV · Feb 2026':'✅ Verra validated dMRV · Feb 2026',
            ].map((tag,i)=>(
              <span key={i} style={{border:`1px solid ${border}`,borderRadius:20,padding:'5px 12px',fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:500,background:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)'}}>
                {tag}
              </span>
            ))}
          </div>

          <h1 style={{fontSize:40,fontWeight:900,lineHeight:1,letterSpacing:'-0.03em',marginBottom:20,maxWidth:700}}>
            {es?(
              <>Infraestructura dMRV para convertir residuos urbanos en <span style={{color:'#22c55e',fontStyle:'italic'}}>activos de carbono certificados.</span></>
            ):(
              <>dMRV infrastructure to convert urban waste into <span style={{color:'#22c55e',fontStyle:'italic'}}>certified carbon assets.</span></>
            )}
          </h1>

          <p style={{fontSize:15,lineHeight:1.7,color:sub,marginBottom:28,maxWidth:600}}>
            {es?'SaaS B2B para consorcios residenciales + verificación IA de residuos + originación de créditos de carbono Verra VCS. El consorcio paga el SaaS. Los créditos de carbono son modelo de ingresos recurrentes.':'B2B SaaS for residential buildings + AI waste verification + Verra VCS carbon credit origination. The building pays the SaaS. Carbon credits are recurring revenue model.'}
          </p>

          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.25)',borderRadius:30,padding:'8px 16px',marginBottom:20,flexWrap:'wrap'}}>
            <span style={{fontSize:11,fontWeight:700,color:'#22c55e'}}>{es?'Ronda Seed abierta':'Seed Round open'}</span>
            <span style={{fontSize:10,color:sub}}>·</span>
            <span style={{fontSize:11,color:sub}}>USD 500K · 10% equity</span>
            <span style={{fontSize:10,color:sub}}>·</span>
            <span style={{fontSize:11,color:sub}}>{es?'USD 1 = USD 1.4 efectivos · Ley 27.506':'USD 1 = USD 1.4 effective · Law 27.506'}</span>
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:40}}>
            <a href="mailto:hola@oliviacirculab.com.ar?subject=Reunion%20OLIVIA%20Seed" style={{background:accent,color:dark?'#050505':'white',padding:'13px 28px',borderRadius:40,fontSize:11,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.08em'}}>
              {es?'Agendar reunión · 20 min':'Schedule meeting · 20 min'}
            </a>
            <a href="/pitch" style={{border:`1px solid ${border}`,color:text,padding:'13px 28px',borderRadius:40,fontSize:11,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.08em'}}>
              {es?'Ver Pitch Deck':'View Pitch Deck'}
            </a>
          </div>

          {/* TESIS */}
          <div style={{background:card,border:`1px solid ${border}`,borderRadius:20,padding:'24px'}}>
            <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:10}}>
              [ {es?'Tesis del Sistema':'System Thesis'} ]
            </p>
            <h2 style={{fontSize:20,fontStyle:'italic',lineHeight:1.3,marginBottom:20,fontFamily:'Georgia,serif'}}>
              {es?'Sistema operativo para distritos de innovación de IA.':'Operating system for AI innovation districts.'}
            </h2>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {[
                {label:es?'01 / Autopoiesis Urbana':'01 / Urban Autopoiesis',desc:es?'En la naturaleza no hay basura — solo recursos sin infraestructura. OLIVIA es esa infraestructura. Un sistema que se produce a sí mismo convirtiendo el desorden urbano en activos verificables.':'In nature there is no waste — only resources without infrastructure. OLIVIA is that infrastructure. A system that produces itself by converting urban disorder into verifiable assets.'},
                {label:es?'02 / Bienes Meritorios Monetizados':'02 / Monetized Merit Goods',desc:es?'Reciclar, reforestar, participar en roscas, crear arte — bienes meritorios sub-consumidos porque el mercado no los precia. OLIVIA les asigna precio a través del token OLV.':'Recycling, reforesting, joining savings circles, creating art — under-consumed merit goods because the market fails to price them. OLIVIA assigns price through the OLV token.'},
                {label:es?'03 / Multiplicador 1.4x · Ley 27.506':'03 / 1.4x Multiplier · Law 27.506',desc:es?'Cada USD 1 invertido en Circulab Tech vale USD 1.4 efectivos: ganancias al 15%, reducción 70-80% cargas patronales, FONDCE, estabilidad fiscal 10 años. Distrito IA Buenos Aires.':'Every USD 1 invested in Circulab Tech is worth USD 1.4 effective: 15% income tax, 70-80% payroll reduction, FONDCE, 10-year fiscal stability. Buenos Aires AI District.'},
                {label:es?'04 / Riesgo técnico reducido':'04 / Reduced technical risk',desc:es?'En febrero 2026 Verra aprobó los primeros créditos bajo dMRV de alta frecuencia. Esto valida exactamente el modelo de OLIVIA. El riesgo técnico pasó de ALTO a MEDIO.':'In February 2026 Verra approved the first credits under high-frequency dMRV. This validates exactly the OLIVIA model. Technical risk moved from HIGH to MEDIUM.'},
              ].map((item,i)=>(
                <div key={i} style={{borderLeft:`3px solid ${accent}`,paddingLeft:14}}>
                  <div style={{fontSize:10,fontWeight:700,color:accent,textTransform:'uppercase',letterSpacing:'0.1em',fontFamily:'monospace',marginBottom:4}}>{item.label}</div>
                  <p style={{fontSize:12,color:sub,lineHeight:1.6,margin:0}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* POR QUE AHORA */}
      <section style={{padding:'32px 24px',borderTop:'1px solid rgba(34,197,94,0.15)',background:dark?'rgba(34,197,94,0.02)':'rgba(34,197,94,0.02)'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:16,textAlign:'center'}}>[ {es?'Por qué ahora':'Why now'} ]</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
            {[
              {icon:'✅',title:es?'Verra validó dMRV · Feb 2026':'Verra validated dMRV · Feb 2026',desc:es?'El mercado internacional de carbono aprobó la verificación digital de alta frecuencia. Nuestro modelo pasó de hipótesis a certeza técnica. El riesgo bajó de ALTO a MEDIO.':'The international carbon market approved high-frequency digital verification. Our model moved from hypothesis to technical certainty. Risk dropped from HIGH to MEDIUM.'},
              {icon:'🏗️',title:es?'USD 0 inversión externa · Producto activo':'USD 0 external investment · Active product',desc:es?'App en producción, IA verificando residuos, comunidad activa, admin con CRM. Todo funcionando hoy sin capital externo. Lo que otros tardan 2 años y USD 500K en construir.':'App in production, AI verifying waste, active community, admin with CRM. All running today without external capital. What others take 2 years and USD 500K to build.'},
              {icon:'⚖️',title:es?'Ley 27.506 · 10 años de estabilidad fiscal':'Law 27.506 · 10-year fiscal stability',desc:es?'USD 1 invertido = USD 1.4 efectivos. Ganancias al 15%, reducción 70-80% cargas patronales. Ventaja fiscal única en LATAM que no existe en ningún otro país de la región.':'USD 1 invested = USD 1.4 effective. 15% income tax, 70-80% payroll reduction. Unique fiscal advantage in LATAM that exists nowhere else in the region.'},
              {icon:'🏢',title:es?'Modelo SaaS · abono mensual premium por consorcio':'SaaS Model · premium monthly subscription per building',desc:es?'El consorcio paga el SaaS como gasto ordinario de expensas. Cubre el 100% del costo operativo. Los créditos de carbono generados arriba de eso son modelo de ingresos recurrentes.':'The building pays the SaaS as ordinary maintenance expense. Covers 100% of operating costs. Carbon credits generated above that are recurring revenue model.'},
            ].map((item,i)=>(
              <div key={i} style={{background:card,border:'1px solid rgba(34,197,94,0.15)',borderRadius:14,padding:'16px'}}>
                <div style={{fontSize:20,marginBottom:8}}>{item.icon}</div>
                <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:6,lineHeight:1.3}}>{item.title}</div>
                <p style={{fontSize:11,color:sub,lineHeight:1.6,margin:0}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPACIDAD OCIOSA */}
      <section style={{padding:'24px',background:dark?'rgba(34,197,94,0.02)':'rgba(34,197,94,0.02)',borderTop:'1px solid rgba(34,197,94,0.1)'}}>
        <div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:13,color:sub,lineHeight:1.8,maxWidth:600,margin:'0 auto'}}>
            {es
              ? 'No construimos infraestructura nueva. Activamos la que ya existe y está ociosa. Las plantas de clasificación · los camiones · las cooperativas · el marco legal. Todo ya está. Lo que faltaba era la capa de datos que conecta al ciudadano con el sistema. Eso es OLIVIA. Costo marginal de escala: mínimo.'
              : 'We do not build new infrastructure. We activate what already exists and is idle. Classification plants · trucks · cooperatives · legal framework. It is all there. What was missing was the data layer connecting citizens to the system. That is OLIVIA. Marginal cost of scale: minimal.'}
          </p>
        </div>
      </section>

      {/* VALIDACION EXTERNA INVERSOR */}
      <section style={{padding:'0 24px 32px',maxWidth:800,margin:'0 auto'}}>
        <div style={{background:'rgba(245,158,11,0.04)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:16,padding:'24px'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:'#f59e0b',marginBottom:12}}>[ {es?'Lo que dicen quienes lo analizan':'What analysts say'} ]</div>
          <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
            <div style={{fontSize:40,flexShrink:0,lineHeight:1}}>"</div>
            <div>
              <p style={{fontSize:14,color:sub,lineHeight:1.8,marginBottom:12,fontStyle:'italic'}}>
                {es?'Si OLIVIA se apalanca en infraestructura inteligente y digitaliza el impacto para el mercado financiero, el techo no existe. La clave está en la velocidad de ejecución y en cerrar contratos corporativos clave antes de que sature la competencia.':'If OLIVIA leverages intelligent infrastructure and digitalizes impact for the financial market, there is no ceiling. The key is execution speed and closing key corporate contracts before the market saturates.'}
              </p>
              <div style={{fontSize:11,color:'#f59e0b',fontWeight:700}}>— — Análisis independiente de inversor · Junio 2026</div>
              <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
                {[
                  es?'✅ Verra validó dMRV · Feb 2026':'✅ Verra validated dMRV · Feb 2026',
                  es?'✅ USD 0 inversión externa':'✅ USD 0 external investment',
                  es?'✅ Producto activo hoy':'✅ Product active today',
                ].map((b,i)=>(
                  <span key={i} style={{fontSize:10,color:'#22c55e',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:20,padding:'4px 10px',fontWeight:700}}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSICIONAMIENTO COMPETITIVO */}
      <section style={{background:dark?'#0a1a0a':'#f0fdf4',padding:'32px 24px'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:12,textAlign:'center'}}>[ {es?'Posicionamiento':'Positioning'} ]</p>
          <h2 style={{fontSize:20,fontWeight:700,textAlign:'center',marginBottom:20,color:text}}>
            {es?'OLIVIA en el ecosistema':'OLIVIA in the ecosystem'}
          </h2>
          <div style={{background:card,border:`1px solid ${border}`,borderRadius:16,padding:'20px',marginBottom:16}}>
            <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:16,textAlign:'center',fontStyle:'italic'}}>
              {es?'"OLIVIA activa al ciudadano. MUTA digitalizó la industria. Glacier automatizó las plantas. Somos la capa que faltaba: el ciudadano conectado al mercado de carbono internacional."':'"OLIVIA activates the citizen. MUTA digitalized industry. Glacier automated plants. We are the missing layer: the citizen connected to the international carbon market."'}
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
              {[
                {feat:es?'Ciudadano directo':'Direct citizen',olivia:'✅',otros:es?'❌ MUTA/Glacier':'❌ MUTA/Glacier'},
                {feat:es?'Créditos carbono reales':'Real carbon credits',olivia:'✅',otros:es?'❌ MUTA (solo trazabilidad)':'❌ MUTA (traceability only)'},
                {feat:'dMRV ciudadano',olivia:'✅',otros:es?'❌ Nadie en LATAM':'❌ Nobody in LATAM'},
                {feat:es?'3 verticales integradas':'3 integrated verticals',olivia:'✅',otros:es?'❌ Ninguno':'❌ None'},
              ].map((row,i)=>(
                <div key={i} style={{background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)',borderRadius:10,padding:'10px 12px',border:`1px solid ${border}`}}>
                  <div style={{fontSize:10,color:sub,marginBottom:4}}>{row.feat}</div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:12,fontWeight:700,color:'#22c55e'}}>OLIVIA {row.olivia}</span>
                    <span style={{fontSize:10,color:sub}}>{row.otros}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section style={{background:dark?'#0f1f15':'#14532d',color:'#22c55e',padding:'32px 24px',textAlign:'center'}}>
        <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',opacity:0.5,marginBottom:12}}>[ {es?'Posicionamiento Estratégico':'Strategic Positioning'} ]</p>
        <h2 style={{fontSize:18,fontWeight:700,maxWidth:700,margin:'0 auto',lineHeight:1.5}}>
          {es?'"Estamos usando Buenos Aires como sandbox urbano AI-native para construir infraestructura de coordinación exportable globalmente."':'"We are using Buenos Aires as an AI-native urban sandbox to build globally exportable coordination infrastructure."'}
        </h2>
      </section>

      <div style={{maxWidth:900,margin:'0 auto',padding:'0 20px'}}>

        {/* EL MODELO OLV */}
        <section style={{padding:'48px 0 32px'}}>
          <div style={{textAlign:'center',marginBottom:20}}>
            <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:8}}>[ {es?'El Modelo OLV':'The OLV Model'} ]</p>
            <h2 style={{fontSize:26,fontWeight:900}}>{es?'El modelo de retención más poderoso':'The most powerful retention model'}</h2>
          </div>
          <div style={{background:card,border:`1px solid ${border}`,borderRadius:16,padding:'24px',marginBottom:16}}>
            <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:16,fontStyle:'italic'}}>
              {es?'"Los usuarios acumulan OLV cuando valen cero. El mercado los compra en 2027. Eso crea el modelo de retención más poderoso: el usuario ya invirtió su tiempo y sus residuos. Espera el retorno. No se va."':'"Users accumulate OLV when worth zero. The market buys them in 2027. That creates the most powerful retention model: the user already invested their time and waste. They wait for the return. They don\'t leave."'}
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
              {[
                {tramo:'🌳 Árbol 2027',olv:'6.329 OLV = USD 1',c:'#f59e0b'},
                {tramo:'🌲 Bosque 2028',olv:'2.198 OLV = USD 1',c:'#a855f7'},
                {tramo:'🌊 Sumidero 2030+',olv:'952 OLV = USD 1',c:'#06b6d4'},
              ].map((t,i)=>(
                <div key={i} style={{textAlign:'center',background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)',borderRadius:10,padding:'12px',border:`1px solid ${t.c}22`}}>
                  <div style={{fontSize:11,fontWeight:700,color:t.c,marginBottom:4}}>{t.tramo}</div>
                  <div style={{fontSize:11,color:sub}}>{t.olv}</div>
                </div>
              ))}
            </div>
            <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px'}}>
              <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:8}}>{es?'Proyección de escala LATAM':'LATAM scale projection'}</div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {[
                  es?'1.000 familias activas → USD 47.000/año en Árbol':'1,000 active families → USD 47,000/year in Árbol',
                  es?'100.000 familias → USD 4.7M/año en Árbol':'100,000 families → USD 4.7M/year in Árbol',
                  es?'1.000.000 familias → USD 47M/año en Árbol · USD 136M/año en Bosque':'1,000,000 families → USD 47M/year in Árbol · USD 136M/year in Bosque',
                ].map((item,i)=>(
                  <div key={i} style={{fontSize:11,color:sub,paddingLeft:12,borderLeft:'2px solid rgba(34,197,94,0.3)'}}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EN LA NATURALEZA */}
        <section style={{padding:'32px 0',borderTop:`1px solid ${border}`}}>
          <div style={{background:dark?'rgba(34,197,94,0.06)':'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'24px'}}>
            <div style={{fontSize:22,fontWeight:900,color:'#22c55e',marginBottom:8,textAlign:'center',lineHeight:1.3}}>
              {es?'"En la naturaleza no hay basura."':'"In nature there is no waste."'}
            </div>
            <div style={{fontSize:13,color:sub,textAlign:'center',marginBottom:20,lineHeight:1.6,fontStyle:'italic'}}>
              {es?'"Solo hay recursos sin infraestructura. OLIVIA es esa infraestructura."':'"Only resources without infrastructure. OLIVIA is that infrastructure."'}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {[
                {icon:'🏛️',t:es?'Elinor Ostrom · Nobel 2009':'Elinor Ostrom · Nobel 2009',d:es?'Las comunidades gestionan mejor los bienes comunes con monitoreo verificable. OLIVIA es ese monitoreo.':'Communities manage commons better with verifiable monitoring. OLIVIA is that monitoring.'},
                {icon:'♻️',t:'Buckminster Fuller',d:es?'"La contaminación son recursos que no estamos cosechando." OLIVIA convierte esa contaminación en activo financiero.':'"Pollution is nothing but resources we\'re not harvesting." OLIVIA converts that pollution into financial assets.'},
                {icon:'🔄',t:es?'Flywheel imparable':'Unstoppable flywheel',d:es?'Más usuarios → más OLV → más usos → más datos para Verra → precio más alto → más usuarios':'More users → more OLV → more uses → more Verra data → higher price → more users'},
              ].map((item,i)=>(
                <div key={i} style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px'}}>
                  <div style={{fontSize:22,marginBottom:8}}>{item.icon}</div>
                  <div style={{fontSize:11,fontWeight:700,color:accent,marginBottom:4}}>{item.t}</div>
                  <div style={{fontSize:10,color:sub,lineHeight:1.5}}>{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ECOSISTEMA */}
        <section style={{padding:'32px 0',borderTop:`1px solid ${border}`}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:8}}>{es?'Arquitectura del Ecosistema':'Ecosystem Architecture'}</p>
            <h2 style={{fontSize:30,fontWeight:900,fontFamily:'Georgia,serif',fontStyle:'italic'}}>
              {es?'Una tesis. ':'One thesis. '}
              <span style={{background:`linear-gradient(90deg,${accent},#22c55e)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'Inter,system-ui',fontStyle:'normal'}}>
                {es?'Tres momentos.':'Three moments.'}
              </span>
            </h2>
          </div>
          <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:12,padding:'16px 20px',marginBottom:24,textAlign:'center'}}>
            <p style={{fontSize:12,color:'#94a3b8',lineHeight:1.7,margin:0}}>
              {es
                ? 'Metamorfosis es el único producto con código activo en 2026. No se escribe una sola línea de código en Quincena PULSO ni en Art of Money hasta que OLIVIA Circular emita su primer crédito certificado por Verra. Esa disciplina de ejecución es deliberada: garantiza foco total en el hito que desbloquea todo lo demás.'
                : 'Metamorfosis is the only product with active code in 2026. Not a single line of code is written in Quincena PULSO or Art of Money until OLIVIA Circular issues its first Verra-certified credit. This execution discipline is deliberate: it guarantees total focus on the milestone that unlocks everything else.'}
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {[
              {img:'/ciudadano/metamorfosis.jpg',nombre:'Metamorfosis',badge:es?'✅ Activo · Semilla 2026':'✅ Active · Semilla 2026',desc:es?'El único producto con código activo hoy. SaaS dMRV para consorcios + verificación IA de residuos + originación de créditos de carbono bajo protocolo Verra VCS. El 100% del foco y el capital de la ronda Seed va aquí.':'The only product with active code today. dMRV SaaS for buildings + AI waste verification + carbon credit origination under Verra VCS protocol. 100% of Seed round focus and capital goes here.',href:'/registro',color:'#22c55e',locked:false},
              {img:'/ciudadano/pulso.jpg',nombre:es?'Quincena · PULSO':'Quincena · PULSO',badge:es?'🔒 Post-certificación Verra · 2027':'🔒 Post-Verra certification · 2027',desc:es?'Infraestructura de pago para que el ciudadano cobre sus créditos de carbono sin cuenta bancaria formal. Nace cuando OLIVIA Circular emita su primer crédito Verra y el vecino necesite cobrar en USD. Cero líneas de código hasta ese hito.':'Payment infrastructure so citizens can collect their carbon credits without a formal bank account. Born when OLIVIA Circular issues its first Verra credit. Zero lines of code until that milestone.',href:'#',color:'#3b82f6',locked:true},
              {img:'/ciudadano/aom.jpg',nombre:'Art of Money',badge:es?'🔒 Post-escala LATAM · 2028':'🔒 Post-LATAM scale · 2028',desc:es?'La misma infraestructura financiera de Quincena aplicada a creadores, artistas y deportistas. Activa cuando la plomería de Quincena ya esté funcionando. Misma tesis — nueva industria. Cero líneas de código hasta 2028.':'The same Quincena financial infrastructure applied to creators, artists and athletes. Activates when Quincena infrastructure is running. Same thesis — new industry. Zero lines of code until 2028.',href:'#',color:'#a855f7',locked:true},
            ].map((v:any)=>(
              <div key={v.nombre} style={{background:card,border:`1px solid ${v.locked?border:v.color+'44'}`,borderRadius:14,overflow:'hidden',opacity:v.locked?0.7:1}}>
                <img src={v.img} alt={v.nombre} style={{width:'100%',height:160,objectFit:'cover',filter:'grayscale(100%)',transition:'0.5s',display:'block'}}
                  onMouseEnter={e=>(e.currentTarget.style.filter='grayscale(0%)')}
                  onMouseLeave={e=>(e.currentTarget.style.filter='grayscale(100%)')} />
                <div style={{padding:'16px'}}>
                  <h3 style={{fontSize:13,fontWeight:700,textTransform:'uppercase',marginBottom:6,color:v.color}}>{v.nombre}</h3>
                  <div style={{fontSize:9,fontWeight:700,color:v.locked?'#64748b':v.color,background:v.locked?'rgba(255,255,255,0.04)':`${v.color}15`,padding:'3px 8px',borderRadius:20,display:'inline-block',marginBottom:8,letterSpacing:'0.05em'}}>{v.badge}</div>
                  <p style={{fontSize:11,color:sub,lineHeight:1.5,marginBottom:10}}>{v.desc}</p>
                  <a href={v.href} style={{fontSize:10,fontWeight:700,color:v.color,textDecoration:'none',fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.08em'}}>
                    {es?'Explorar →':'Explore →'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LOS 6 TRAMOS */}
        <section style={{padding:'32px 0',borderTop:`1px solid ${border}`}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:8}}>[ {es?'Cronograma':'Timeline'} ]</p>
            <h2 style={{fontSize:28,fontWeight:900,fontFamily:'Georgia,serif',fontStyle:'italic'}}>{es?'Los 6 tramos del ecosistema':'The 6 ecosystem stages'}</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {TRAMOS.map((tramo,i)=>(
              <div key={i} style={{background:card,border:`1px solid ${tramo.activo?tramo.c:border}`,borderRadius:12,padding:'14px',borderTop:`3px solid ${tramo.c}`}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6,gap:4}}>
                  <span style={{fontSize:10,fontWeight:700,color:tramo.c,fontFamily:'monospace',lineHeight:1.3}}>{tramo.icon} {tramo.l}</span>
                  {tramo.activo&&<span style={{fontSize:8,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'2px 6px',borderRadius:8,fontWeight:700,flexShrink:0}}>ACTIVA</span>}
                </div>
                <p style={{fontSize:10,color:sub,lineHeight:1.5,margin:0}}>{tramo.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GARANTÍAS */}
        <section style={{padding:'32px 0',borderTop:`1px solid ${border}`}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:8}}>[ {es?'Ronda Seed 2026':'Seed Round 2026'} ]</p>
            <h2 style={{fontSize:28,fontWeight:900,fontFamily:'Georgia,serif',fontStyle:'italic'}}>{es?'Garantías para el inversor':'Investor guarantees'}</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:20}}>
            {GARANTIAS.map((g,i)=>(
              <div key={i} style={{background:card,border:`1px solid ${border}`,borderRadius:10,padding:'12px',display:'flex',gap:8,alignItems:'flex-start'}}>
                <span style={{fontSize:16,flexShrink:0}}>{g.icon}</span>
                <div style={{fontSize:11,color:sub,lineHeight:1.4}}>{g.t}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
            <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'18px',textAlign:'center'}}>
              <div style={{fontSize:10,color:sub,marginBottom:4}}>{es?'Opción A':'Option A'}</div>
              <div style={{fontSize:28,fontWeight:900,color:'#22c55e'}}>USD 500K</div>
              <div style={{fontSize:11,color:sub,marginTop:4}}>10% equity · USD 4.5M pre-money</div>
            </div>
            <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'18px',textAlign:'center'}}>
              <div style={{fontSize:10,color:sub,marginBottom:4}}>{es?'Opción B':'Option B'}</div>
              <div style={{fontSize:28,fontWeight:900,color:'#3b82f6'}}>USD 2M</div>
              <div style={{fontSize:11,color:sub,marginTop:4}}>15% equity · USD 11.3M pre-money</div>
            </div>
          </div>
          <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10,padding:'12px',marginBottom:16,textAlign:'center'}}>
            <div style={{fontSize:11,color:sub,lineHeight:1.6}}>
              {es?'Sin costos fijos hasta inversión comprometida · Equity directo · Sin ratchets · Sin intereses · Ley 27.506 · Estabilidad fiscal 10 años':'No fixed costs until committed · Direct equity · No ratchets · No interest · Law 27.506 · 10-year fiscal stability'}
            </div>
          </div>

          
              <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'20px',marginTop:12}}>
                <div style={{fontSize:11,fontWeight:700,color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}}>
                  {es?'Estructuras de inversion disponibles':'Available investment structures'}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:12}}>
                  {[
                    {titulo:es?'Inversion directa':'Direct investment',desc:es?'USD 500K 10% equity Ley 27.506 USD 1 = USD 1.4 efectivos Board seat':'USD 500K 10% equity Law 27.506 USD 1 = USD 1.4 effective Board seat',color:'#22c55e'},
                    {titulo:'SAFE + Cap',desc:es?'Nota convertible YC Cap USD 3-5M 20% descuento proxima ronda Sin vencimiento':'YC convertible note USD 3-5M cap 20% next round discount No expiration',color:'#3b82f6'},
                    {titulo:es?'Por hitos (opcional)':'Milestone-based (optional)',desc:es?'Tramos de capital por traccion real. Hitos y plazos disenados en conjunto. Flexibles y pro-equipo.':'Capital tranches by real traction. Milestones and timelines designed together. Flexible and pro-team.',color:'#a855f7'},
                  ].map((item,i)=>(
                    <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'12px'}}>
                      <div style={{fontSize:11,fontWeight:700,color:item.color,marginBottom:6}}>{item.titulo}</div>
                      <div style={{fontSize:10,color:'#64748b',lineHeight:1.6}}>{item.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.7,fontStyle:'italic',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:10}}>
                  {es
                    ? 'Todas las garantias listadas aplican independientemente de la estructura elegida. Los terminos especificos se negocian en conjunto con el inversor.'
                    : 'All guarantees listed apply regardless of the chosen structure. Specific terms are negotiated together with the investor.'}
                </div>
              </div>
{/* DOCUMENTOS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
            {[
              {icon:'📄',label:'Whitepaper',sub:es?'Con NDA':'With NDA',href:'/whitepaper',color:'#3b82f6'},
              {icon:'📋',label:'One Pager',sub:es?'Resumen ejecutivo':'Executive summary',href:'/onepager',color:'#f59e0b'},
              {icon:'📊',label:'Pitch Deck',sub:es?'Acceso con datos':'Data-gated access',href:'/pitch',color:'#a855f7'},
            ].map(d=>(
              <a key={d.label} href={d.href} style={{background:card,border:`1px solid ${d.color}33`,borderRadius:12,padding:'14px',textAlign:'center',textDecoration:'none',display:'block'}}>
                <div style={{fontSize:24,marginBottom:6}}>{d.icon}</div>
                <div style={{fontSize:11,fontWeight:700,color:d.color}}>{d.label}</div>
                <div style={{fontSize:9,color:sub,marginTop:3}}>{d.sub}</div>
              </a>
            ))}
          </div>

          <div style={{textAlign:'center'}}>
            <a href="/pitch" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'13px 32px',borderRadius:40,fontSize:12,fontWeight:700,textDecoration:'none',display:'inline-block',marginRight:10}}>
              {es?'Ver pitch deck completo →':'View full pitch deck →'}
            </a>
            <a href="mailto:hola@oliviacirculab.com.ar" style={{border:`1px solid ${border}`,color:text,padding:'13px 24px',borderRadius:40,fontSize:12,fontWeight:600,textDecoration:'none',display:'inline-block'}}>
              hola@oliviacirculab.com.ar
            </a>
          </div>
        </section>

        {/* FUNDADORES */}
        <section style={{padding:'32px 0',borderTop:`1px solid ${border}`}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:8}}>{es?'Equipo Fundador':'Founding Team'}</p>
            <h2 style={{fontSize:28,fontWeight:900,fontFamily:'Georgia,serif',fontStyle:'italic'}}>
              {es?'Construido desde el Sur Global.':'Built from the Global South.'}
            </h2>
            <div style={{marginTop:8,fontSize:12,color:sub,fontStyle:'italic'}}>
              {es?'"Una app creada en una cocina. Para todos nuestros hijos. 🌿"':'"An app created in a kitchen. For all our children. 🌿"'}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {[
              {foto:'/founders/founder-jp.jpg',nombre:'Juan Pablo Sanguinetti de Zapata',rol:es?'Founder & Vision Lead':'Founder & Vision Lead',desc:es?'Abogado y director de teatro chileno. Product builder con IA. Diseñó el motor de confianza de Circulab viviendo la fricción del reciclaje en su propia cocina. Especialidad en medio ambiente, tributación, propiedad intelectual y dMRV.':'Lawyer and Chilean theater director. AI product builder. Designed the Circulab trust engine by living the friction of recycling in his own kitchen. Expertise in environmental law, taxation, IP and dMRV.',color:'#22c55e'},
              {foto:'/founders/founder-mileidy.jpg',nombre:'Mileidy Zapata de Sanguinetti',rol:es?'Co-Founder & Operations':'Co-Founder & Operations',desc:es?'Bailarina y coreógrafa dominicana. Experta en economía del cuidado y branding estratégico. Traduce complejidad tecnológica en adopción ciudadana.':'Dominican dancer and choreographer. Expert in care economy and strategic branding. Translates technological complexity into citizen adoption.',color:'#3b82f6'},
            ].map(f=>(
              <div key={f.nombre} style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'20px'}}>
                <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:12}}>
                  <img src={f.foto} alt={f.nombre} style={{width:72,height:72,borderRadius:10,objectFit:'cover',flexShrink:0,filter:'grayscale(100%)',border:`1px solid ${border}`}} />
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:text,marginBottom:4,lineHeight:1.2}}>{f.nombre}</div>
                    <div style={{fontSize:9,color:f.color,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.12em',fontFamily:'monospace'}}>{f.rol}</div>
                  </div>
                </div>
                <div style={{fontSize:12,color:sub,lineHeight:1.7}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* CTA FINAL */}
      <section style={{padding:'48px 24px',background:'#050505',color:'white',textAlign:'center'}}>
        <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.4em',opacity:0.5,marginBottom:14}}>[ {es?'Llamado Institucional':'Institutional Call'} ]</p>
        <h2 style={{fontSize:26,fontWeight:700,maxWidth:600,margin:'0 auto 24px',lineHeight:1.3}}>
          {es?'La próxima capa de infraestructura urbana será coordinada por Inteligencia Artificial.':'The next urban infrastructure layer will be AI-coordinated.'}
        </h2>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/registro" style={{background:'#22c55e',color:'#050505',padding:'13px 28px',borderRadius:40,fontSize:11,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.08em'}}>
            {es?'Registrar Mi Impacto':'Register My Impact'}
          </a>
          <a href="/whitepaper" style={{border:'1px solid rgba(255,255,255,0.2)',color:'white',padding:'13px 28px',borderRadius:40,fontSize:11,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.08em'}}>
            {es?'Ver Whitepaper':'View Whitepaper'}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'24px',borderTop:`1px solid ${border}`,display:'flex',flexDirection:'column',alignItems:'center',gap:12,textAlign:'center'}}>
        <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:48,height:48,objectFit:'contain',opacity:0.7}} />
        <div style={{fontSize:10,color:sub,textAlign:'center',lineHeight:1.5}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{fontSize:10,color:sub,fontFamily:'monospace',fontWeight:700}}>Circulab Tech © 2026 · Distrito IA · Buenos Aires, Argentina</div>
        <div style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center'}}>
          {[
            {l:'Whitepaper',h:'/whitepaper',c:'#3b82f6'},
            {l:'One Pager',h:'/onepager',c:'#f59e0b'},
            {l:'Pitch',h:'/pitch',c:'#a855f7'},
            {l:'Alianzas',h:'/alianzas',c:'#22c55e'},
            {l:'LinkedIn',h:'https://www.linkedin.com/company/113160128/',c:sub},
          ].map(n=>(
            <a key={n.l} href={n.h} style={{fontSize:10,color:n.c,textDecoration:'none',fontFamily:'monospace',fontWeight:700,textTransform:'uppercase'}}>{n.l}</a>
          ))}
        </div>
      </footer>

    </div>
  )
}
