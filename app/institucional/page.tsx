'use client'
import { useState } from 'react'

export default function Institucional() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(true)

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
    {icon:'🌳',l:es?'ÁRBOL · 2027 💰':'TREE · 2027 💰',d:es?'Certificación Verra VCS · Primer pago USD · Reforestación REDD+ · Gold Standard plástico':'Verra VCS certification · First USD payment · REDD+ reforestation · Gold Standard plastic',c:'#f59e0b',activo:false},
    {icon:'🌲',l:es?'BOSQUE · 2028':'FOREST · 2028',d:es?'Art. 6.4 París · USD 90/t · AR MX CO BR CH DO · OLIVIA Exchange blockchain':'Art. 6.4 Paris · USD 90/t · AR MX CO BR CH DO · OLIVIA Exchange blockchain',c:'#a855f7',activo:false},
    {icon:'🏔️',l:es?'SELVA · 2029':'JUNGLE · 2029',d:es?'OLIVIA Ocean + Waters + Space · PULSO estándar LATAM · AOM en todos los mercados de regalías':'OLIVIA Ocean + Waters + Space · PULSO LATAM standard · AOM in all royalty markets',c:'#ec4899',activo:false},
    {icon:'🌊',l:es?'SUMIDERO · 2030+':'SINK · 2030+',d:es?'Net positive verificado · El sistema absorbe más CO2 del que genera · Infraestructura climática global':'Verified net positive · System absorbs more CO2 than it generates · Global climate infrastructure',c:'#06b6d4',activo:false},
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
    {icon:'💎',t:es?'Cada USD 1 = USD 1.4 efectivos':'Every USD 1 = USD 1.4 effective'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'Inter,system-ui',transition:'all 0.3s',overflowX:'hidden'}}>

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:dark?'rgba(5,5,5,0.9)':'rgba(247,245,241,0.9)',borderBottom:`1px solid ${border}`,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:30,height:30,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:13,color:'white',flexShrink:0}}>O</div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.05em'}}>Circulab Tech</div>
            <div style={{fontSize:9,color:sub,textTransform:'uppercase',letterSpacing:'0.15em',fontFamily:'monospace'}}>
              {es?'Infraestructura IA Urbana':'Urban AI Infrastructure'}
            </div>
          </div>
        </div>
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

      {/* HERO con grid */}
      <section style={{
        padding:'80px 24px 60px',
        backgroundImage:`linear-gradient(${border} 1px,transparent 1px),linear-gradient(90deg,${border} 1px,transparent 1px)`,
        backgroundSize:'50px 50px',
        position:'relative'
      }}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:20}}>
            {[
              'AI-Native Ecosystems',
              'Buenos Aires Sandbox',
              'LATAM Infrastructure',
              es?'Ley 27.506 · 1.4x':'Law 27.506 · 1.4x',
            ].map((tag,i)=>(
              <span key={i} style={{border:`1px solid ${border}`,borderRadius:20,padding:'5px 12px',fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:500,background:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)'}}>
                {tag}
              </span>
            ))}
          </div>

          <h1 style={{fontSize:40,fontWeight:900,lineHeight:1,letterSpacing:'-0.03em',marginBottom:20,maxWidth:700}}>
            {es?(
              <>Infraestructura de coordinación para ecosistemas urbanos <span style={{color:'#22c55e',fontStyle:'italic'}}>AI-native.</span></>
            ):(
              <>Coordination infrastructure for <span style={{color:'#22c55e',fontStyle:'italic'}}>AI-native</span> urban ecosystems.</>
            )}
          </h1>

          <p style={{fontSize:15,lineHeight:1.7,color:sub,marginBottom:28,maxWidth:600}}>
            {es?'Desarrollamos la capa operacional que conecta ciudadanos, inteligencia artificial y cooperativas territoriales para monetizar los bienes meritorios de las nuevas economías urbanas emergentes.':'We develop the operational layer connecting citizens, artificial intelligence, and territorial cooperatives to monetize the merit goods of emerging urban economies.'}
          </p>

          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:40}}>
            <a href="/registro" style={{background:accent,color:dark?'#050505':'white',padding:'13px 28px',borderRadius:40,fontSize:11,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.08em'}}>
              {es?'Registrar Mi Residuo':'Register My Waste'}
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

      {/* BANNER */}
      <section style={{background:dark?'#0f1f15':'#14532d',color:'#22c55e',padding:'32px 24px',textAlign:'center'}}>
        <p style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',opacity:0.5,marginBottom:12}}>[ {es?'Posicionamiento Estratégico':'Strategic Positioning'} ]</p>
        <h2 style={{fontSize:18,fontWeight:700,maxWidth:700,margin:'0 auto',lineHeight:1.5}}>
          {es?'"Estamos usando Buenos Aires como sandbox urbano AI-native para construir infraestructura de coordinación exportable globalmente."':'"We are using Buenos Aires as an AI-native urban sandbox to build globally exportable coordination infrastructure."'}
        </h2>
      </section>

      <div style={{maxWidth:900,margin:'0 auto',padding:'0 20px'}}>

        {/* EN LA NATURALEZA */}
        <section style={{padding:'48px 0 32px'}}>
          <div style={{background:dark?'rgba(34,197,94,0.06)':'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'24px'}}>
            <div style={{fontSize:22,fontWeight:900,color:'#22c55e',marginBottom:8,textAlign:'center',lineHeight:1.3}}>
              {es?'"En la naturaleza no hay basura."':'"In nature there is no waste."'}
            </div>
            <div style={{fontSize:13,color:sub,textAlign:'center',marginBottom:20,lineHeight:1.6,fontStyle:'italic'}}>
              {es?'"Solo hay recursos sin infraestructura. OLIVIA es esa infraestructura. Un sistema que se produce a sí mismo haciendo el bien."':'"Only resources without infrastructure. OLIVIA is that infrastructure. A system that produces itself by doing good."'}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {[
                {icon:'🏛️',t:es?'Elinor Ostrom · Nobel 2009':'Elinor Ostrom · Nobel 2009',d:es?'Las comunidades gestionan mejor los bienes comunes con monitoreo verificable. OLIVIA es ese monitoreo.':'Communities manage commons better with verifiable monitoring. OLIVIA is that monitoring.'},
                {icon:'♻️',t:'Buckminster Fuller',d:es?'"Pollution is nothing but resources we\'re not harvesting." OLIVIA convierte esa contaminación en activo financiero.':'"Pollution is nothing but resources we\'re not harvesting." OLIVIA converts that pollution into financial assets.'},
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
              {es?'Tres verticales. ':'Three verticals. '}
              <span style={{background:`linear-gradient(90deg,${accent},#22c55e)`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'Inter,system-ui',fontStyle:'normal'}}>
                {es?'Un sistema.':'One system.'}
              </span>
            </h2>
            <p style={{fontSize:12,color:sub,marginTop:8,maxWidth:500,margin:'8px auto 0'}}>
              {es?'Cada componente opera autónomamente pero converge en el Protocolo PULSO — la capa transversal de incentivos y reputación digital.':'Each component operates autonomously but converges in the PULSO Protocol — the transversal layer of digital incentives and reputation.'}
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {[
              {img:'/ciudadano/metamorfosis.jpg',nombre:'OLIVIA Circulab',desc:es?'Validación física y dMRV. Convierte residuos domésticos en activos ambientales verificables bajo protocolos Verra, Gold Standard y CAR.':'Physical validation and dMRV. Converts household waste into verifiable environmental assets under Verra, Gold Standard and CAR protocols.',href:'/registro',color:'#22c55e'},
              {img:'/ciudadano/pulso.jpg',nombre:es?'Quincena · PULSO':'Quincena · PULSO',desc:es?'Finanzas inclusivas. Digitaliza ROSCAs y expande capacidades crediticias del sector informal en corredor AR MX CO BR CH DO.':'Inclusive finance. Digitalizes ROSCAs and expands credit capabilities across AR MX CO BR CH DO.',href:'/quincena',color:'#3b82f6'},
              {img:'/ciudadano/aom.jpg',nombre:'Art of Money',desc:es?'Tokenización RWA. Transforma regalías musicales, deportivas y literarias en colateral líquido. Más OLV = mejor tasa.':'RWA tokenization. Transforms music, sports and literary royalties into liquid collateral. More OLV = better rate.',href:'/aom',color:'#a855f7'},
            ].map(v=>(
              <div key={v.nombre} style={{background:card,border:`1px solid ${border}`,borderRadius:14,overflow:'hidden'}}>
                <img src={v.img} alt={v.nombre} style={{width:'100%',height:160,objectFit:'cover',filter:'grayscale(100%)',transition:'0.5s',display:'block'}}
                  onMouseEnter={e=>(e.currentTarget.style.filter='grayscale(0%)')}
                  onMouseLeave={e=>(e.currentTarget.style.filter='grayscale(100%)')} />
                <div style={{padding:'16px'}}>
                  <h3 style={{fontSize:13,fontWeight:700,textTransform:'uppercase',marginBottom:6,color:v.color}}>{v.nombre}</h3>
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
            <h2 style={{fontSize:28,fontWeight:900,fontFamily:'Georgia,serif',fontStyle:'italic'}}>
              {es?'Los 6 tramos del ecosistema':'The 6 ecosystem stages'}
            </h2>
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
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {[
              {foto:'/founders/founder-jp.jpg',nombre:'Juan Pablo Sanguinetti de Zapata',rol:es?'Founder & Vision Lead':'Founder & Vision Lead',desc:es?'Abogado y director de teatro chileno. Product builder con IA. Diseñó el motor de confianza de Circulab viviendo la fricción del reciclaje en su propia cocina. Especialidad en medio ambiente, tributación, propiedad intelectual y dMRV.':'Lawyer and Chilean theater director. AI product builder. Designed the Circulab trust engine by living the friction of recycling in his own kitchen. Expertise in environmental law, taxation, IP and dMRV.',color:'#22c55e'},
              {foto:'/founders/founder-mileidy.jpg',nombre:'Mileidy Zapata de Sanguinetti',rol:es?'Co-Founder & Operations':'Co-Founder & Operations',desc:es?'Bailarina y coreógrafa dominicana. Experta en economía del cuidado y branding estratégico. Traduce complejidad tecnológica en adopción ciudadana. Junto a OLIVIA y Santino Eloy, el piloto comenzó en casa.':'Dominican dancer and choreographer. Expert in care economy and strategic branding. Translates technological complexity into citizen adoption. Together with OLIVIA and Santino Eloy, the pilot started at home.',color:'#3b82f6'},
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
      <footer style={{padding:'24px',borderTop:`1px solid ${border}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <div style={{fontSize:10,color:sub,fontFamily:'monospace',fontWeight:700}}>Circulab Tech © 2026 · Distrito IA · Buenos Aires, Argentina</div>
        <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
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
