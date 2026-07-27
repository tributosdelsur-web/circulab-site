'use client'
import { useState } from 'react'

export default function GrandesEmisores() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const [tipo, setTipo] = useState('todos')
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#64748b' : '#6b7280'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const accent = '#22c55e'
  const blue = '#3b82f6'
  const purple = '#a855f7'
  const orange = '#f59e0b'
  const red = '#ef4444'

  const TIPOS = [
    {id:'todos', l:es?'Todos':'All', c:accent},
    {id:'naviera', l:es?'Navieras':'Shipping', c:blue},
    {id:'aerolinea', l:es?'Aerolíneas':'Airlines', c:purple},
    {id:'cbam', l:es?'Exportadores CBAM':'CBAM Exporters', c:orange},
    {id:'energia', l:es?'Energía / Minería':'Energy / Mining', c:'#06b6d4'},
  ]

  const REGULACIONES = [
    {
      icon:'🚢',
      tipo:'naviera',
      titulo: es?'EU ETS Marítimo · IMO CII':'EU ETS Maritime · IMO CII',
      subtitulo: es?'Navieras con buques >5.000 GT · Rutas hacia/desde puertos UE':'Shipping companies with vessels >5,000 GT · Routes to/from EU ports',
      color: blue,
      urgencia: es?'ACTIVO DESDE 2026':'ACTIVE SINCE 2026',
      costo: 'USD 500K-2M/buque/año',
      descripcion: es
        ? 'Desde 2026 las navieras deben comprar certificados EU ETS por el 70% de sus emisiones de 2025. En 2027 el 100%. Costo estimado total del sector: USD 2.900M en 2026. El IMO CII endurece sus umbrales ~2% anual: un buque calificación C hoy puede caer a D simplemente por el ajuste del estándar.'
        : 'Since 2026, shipping companies must purchase EU ETS certificates for 70% of their 2025 emissions. In 2027, 100%. Estimated total sector cost: USD 2.9B in 2026. IMO CII tightens its thresholds ~2% annually.',
      necesitan: es
        ? 'Créditos de carbono verificados · alta trazabilidad · elegibles EU ETS · entrega antes de septiembre 2026'
        : 'Verified carbon credits · high traceability · EU ETS eligible · delivery before September 2026',
    },
    {
      icon:'✈️',
      tipo:'aerolinea',
      titulo: es?'CORSIA · OACI':'CORSIA · ICAO',
      subtitulo: es?'+130 países participantes · Desde 2027: mayoría de vuelos internacionales':'130+ participating countries · From 2027: most international flights',
      color: purple,
      urgencia: es?'OBLIGATORIO DESDE 2027':'MANDATORY FROM 2027',
      costo: es?'USD 25-100/tCO2 · millones por aerolínea':'USD 25-100/tCO2 · millions per airline',
      descripcion: es
        ? 'Desde 2027 las aerolíneas internacionales deben compensar el crecimiento de sus emisiones comprando créditos de carbono elegibles CORSIA. Las aerolíneas se convertirán en los mayores compradores de créditos de carbono del mundo. CORSIA exige calidad, trazabilidad e integridad ambiental — no cualquier crédito sirve.'
        : 'From 2027, international airlines must offset their emission growth by purchasing CORSIA-eligible carbon credits. Airlines will become the world largest carbon credit buyers. CORSIA demands quality, traceability and environmental integrity.',
      necesitan: es
        ? 'Créditos elegibles CORSIA · trazabilidad completa del origen · datos dMRV verificados · Verra VCS o Gold Standard'
        : 'CORSIA-eligible credits · complete origin traceability · verified dMRV data · Verra VCS or Gold Standard',
    },
    {
      icon:'🏭',
      tipo:'cbam',
      titulo: es?'CBAM · Mecanismo de Ajuste en Frontera por Carbono (UE)':'CBAM · Carbon Border Adjustment Mechanism (EU)',
      subtitulo: es?'Exportadores de acero · aluminio · cemento · fertilizantes · electricidad · hidrógeno hacia la UE':'Exporters of steel · aluminium · cement · fertilisers · electricity · hydrogen to EU',
      color: orange,
      urgencia: es?'FASE DEFINITIVA DESDE ENERO 2026':'DEFINITIVE PHASE SINCE JANUARY 2026',
      costo: es?'EUR 60-80/tCO2 · puede ser millones EUR/año':'EUR 60-80/tCO2 · can be millions EUR/year',
      descripcion: es
        ? 'Desde enero 2026 los importadores europeos deben comprar certificados CBAM por las emisiones de los productos que importan. Los exportadores argentinos de acero (Tenaris · Ternium), aluminio (Aluar), cemento (Loma Negra) y fertilizantes (Profertil) deben certificar su huella para que sus compradores europeos paguen menos CBAM. Menor huella = ventaja competitiva.'
        : 'Since January 2026, European importers must purchase CBAM certificates for the emissions of products they import. Argentine exporters must certify their carbon footprint so their European buyers pay less CBAM. Lower footprint = competitive advantage.',
      necesitan: es
        ? 'Certificación de huella Scope 1+2+3 · datos verificables para declaración CBAM · reducción de emisiones documentada'
        : 'Scope 1+2+3 footprint certification · verifiable data for CBAM declaration · documented emission reductions',
    },
    {
      icon:'⚡',
      tipo:'energia',
      titulo: es?'SEC Climate Disclosure · EU Taxonomy · Ley 27.595 AR':'SEC Climate Disclosure · EU Taxonomy · AR Law 27.595',
      subtitulo: es?'Empresas cotizantes · generadoras de energía · mineras · petroleras':'Listed companies · energy generators · mining · oil companies',
      color:'#06b6d4',
      urgencia: es?'IMPLEMENTACIÓN GRADUAL 2024-2027':'GRADUAL IMPLEMENTATION 2024-2027',
      costo: es?'Variable · presión inversores institucionales':'Variable · institutional investor pressure',
      descripcion: es
        ? 'Las empresas cotizantes en NYSE/NASDAQ deben reportar emisiones Scope 1+2 con verificación independiente. Las más grandes también Scope 3. En Argentina la Ley 27.595 avanza hacia un mercado de carbono regulado local alineado con el Artículo 6.4 del Acuerdo de París y habilitado para CORSIA.'
        : 'Companies listed on NYSE/NASDAQ must report Scope 1+2 emissions with independent verification. The largest also Scope 3. In Argentina, Law 27.595 advances toward a regulated local carbon market aligned with Paris Agreement Article 6.4.',
      necesitan: es
        ? 'Datos verificados Scope 1+2+3 · reporte GRI/SASB/TCFD · créditos elegibles para compensación regulatoria'
        : 'Verified Scope 1+2+3 data · GRI/SASB/TCFD report · credits eligible for regulatory offset',
    },
  ]

  const regsFiltered = tipo === 'todos' ? REGULACIONES : REGULACIONES.filter(r => r.tipo === tipo)

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'Inter,system-ui',transition:'all 0.3s'}}>

      {/* NAV */}
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
      <section style={{padding:'56px 24px',textAlign:'center',background:'linear-gradient(135deg,rgba(59,130,246,0.06),rgba(168,85,247,0.04))',borderBottom:'1px solid rgba(59,130,246,0.15)'}}>
        <div style={{maxWidth:720,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:blue,marginBottom:12}}>
            [ {es?'Para grandes emisores globales':'For global large emitters'} ]
          </div>
          <h1 style={{fontSize:34,fontWeight:900,lineHeight:1.15,marginBottom:16}}>
            {es?'El ciudadano que recicla en Buenos Aires':'The citizen who recycles in Buenos Aires'}
            <br/>
            <span style={{color:blue}}>
              {es?'genera el crédito que tu empresa necesita para cumplir el EU ETS.':'generates the credit your company needs to comply with EU ETS.'}
            </span>
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:28,maxWidth:580,margin:'0 auto 28px'}}>
            {es
              ? 'CBAM · CORSIA · EU ETS · IMO CII. Tres regulaciones globales activas en 2026-2027 que obligan a navieras, aerolíneas y exportadores a certificar emisiones con créditos de alta calidad y trazabilidad. OLIVIA los origina desde Buenos Aires con verificación IA y Verra VCS.'
              : 'CBAM · CORSIA · EU ETS · IMO CII. Three global regulations active in 2026-2027 requiring shipping companies, airlines and exporters to certify emissions with high-quality, traceable credits. OLIVIA originates them from Buenos Aires with AI verification and Verra VCS.'}
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:24}}>
            <a href="/nda" style={{background:'linear-gradient(135deg,#3b82f6,#1d4ed8)',borderRadius:40,padding:'14px 32px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
              {es?'Necesito créditos verificados →':'I need verified credits →'}
            </a>
            <a href="/whitepaper" style={{background:'transparent',border:'1px solid '+border,borderRadius:40,padding:'14px 32px',color:text,fontSize:13,fontWeight:700,textDecoration:'none'}}>
              {es?'Ver whitepaper técnico':'See technical whitepaper'}
            </a>
          </div>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            {[
              {n:'USD 2.9B',l:es?'costo EU ETS navieras 2026':'EU ETS shipping cost 2026',c:blue},
              {n:'CORSIA 2027',l:es?'aerolíneas = mayores compradores':'airlines = largest buyers',c:purple},
              {n:'EUR 60-80',l:es?'por tCO2 precio CBAM':'per tCO2 CBAM price',c:orange},
              {n:'Feb 2026',l:es?'Verra aprobó piloto dMRV':'Verra approved dMRV pilot',c:accent},
            ].map((s,i)=>(
              <div key={i} style={{background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.03)',border:'1px solid '+s.c+'33',borderRadius:12,padding:'10px 16px',textAlign:'center'}}>
                <div style={{fontSize:18,fontWeight:900,color:s.c,marginBottom:2}}>{s.n}</div>
                <div style={{fontSize:9,color:sub}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section style={{padding:'32px 24px 0'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
          {TIPOS.map(t=>(
            <button key={t.id} onClick={()=>setTipo(t.id)} style={{padding:'8px 18px',borderRadius:20,border:'1px solid '+(tipo===t.id?t.c:border),background:tipo===t.id?t.c+'15':'transparent',color:tipo===t.id?t.c:sub,fontSize:11,fontWeight:700,cursor:'pointer',transition:'all 0.2s'}}>
              {t.l}
            </button>
          ))}
        </div>
      </section>

      {/* REGULACIONES */}
      <section style={{padding:'32px 24px 64px'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'flex',flexDirection:'column',gap:20}}>
          {regsFiltered.map((r,i)=>(
            <div key={i} style={{background:card,border:'2px solid '+r.color+'33',borderRadius:20,padding:'32px'}}>
              <div style={{display:'flex',gap:16,alignItems:'flex-start',marginBottom:20}}>
                <div style={{fontSize:40,flexShrink:0}}>{r.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',marginBottom:6}}>
                    <div style={{fontSize:9,fontWeight:700,color:r.color,background:r.color+'15',border:'1px solid '+r.color+'33',borderRadius:20,padding:'3px 10px',textTransform:'uppercase',letterSpacing:'0.08em'}}>
                      ⚠️ {r.urgencia}
                    </div>
                    <div style={{fontSize:9,fontWeight:700,color:'#ef4444',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:20,padding:'3px 10px'}}>
                      💰 {r.costo}
                    </div>
                  </div>
                  <h3 style={{fontSize:18,fontWeight:900,color:r.color,marginBottom:4}}>{r.titulo}</h3>
                  <div style={{fontSize:11,color:sub,marginBottom:12}}>{r.subtitulo}</div>
                  <p style={{fontSize:12,color:sub,lineHeight:1.8,marginBottom:16}}>{r.descripcion}</p>
                  <div style={{background:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.02)',border:'1px solid '+r.color+'22',borderRadius:10,padding:'12px 16px'}}>
                    <div style={{fontSize:10,fontWeight:700,color:r.color,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>
                      {es?'Lo que necesitan para cumplir:':'What they need to comply:'}
                    </div>
                    <div style={{fontSize:11,color:sub,lineHeight:1.7}}>{r.necesitan}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LA CADENA DE VALOR */}
      <section style={{padding:'64px 24px',background:dark?'rgba(34,197,94,0.03)':'rgba(34,197,94,0.02)',borderTop:'1px solid rgba(34,197,94,0.1)'}}>
        <div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>
            [ {es?'La cadena de valor OLIVIA':'The OLIVIA value chain'} ]
          </div>
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:40}}>
            {es?'Del tacho de cocina al mercado global de carbono.':'From the kitchen bin to the global carbon market.'}
          </h2>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:0,flexWrap:'wrap'}}>
            {[
              {icon:'🏘️',t:es?'Vecino de Buenos Aires':'Buenos Aires resident',d:es?'Separa residuos orgánicos · foto + GPS · acumula OLV':'Separates organic waste · photo + GPS · accumulates OLV',c:accent},
              {icon:'→',t:'',d:'',c:sub,arrow:true},
              {icon:'♻️',t:es?'Cooperativa (RUO · El Ceibo)':'Cooperative (RUO · El Ceibo)',d:es?'Retira · pesa · registra en OLIVIA · recibe OLV':'Picks up · weighs · records in OLIVIA · receives OLV',c:blue},
              {icon:'→',t:'',d:'',c:sub,arrow:true},
              {icon:'🤖',t:es?'OLIVIA verifica con IA':'OLIVIA verifies with AI',d:es?'Foto + GPS + peso real = registro dMRV certificable':'Photo + GPS + real weight = certifiable dMRV record',c:purple},
              {icon:'→',t:'',d:'',c:sub,arrow:true},
              {icon:'🌍',t:'Verra VCS 2027',d:es?'Crédito de carbono certificado · elegible CORSIA · EU ETS · CBAM':'Certified carbon credit · CORSIA · EU ETS · CBAM eligible',c:orange},
              {icon:'→',t:'',d:'',c:sub,arrow:true},
              {icon:'🚢✈️',t:es?'Naviera · Aerolínea · Exportador':'Shipping · Airline · Exporter',d:es?'Compra el crédito · cumple la regulación · evita la multa':'Buys the credit · complies · avoids the fine',c:red},
            ].map((step,i)=>(
              step.arrow
                ? <div key={i} style={{fontSize:24,color:sub,margin:'0 8px'}}>→</div>
                : <div key={i} style={{background:card,border:'1px solid '+step.c+'33',borderRadius:14,padding:'16px',width:140,textAlign:'center',margin:'4px'}}>
                    <div style={{fontSize:28,marginBottom:6}}>{step.icon}</div>
                    <div style={{fontSize:10,fontWeight:700,color:step.c,marginBottom:4,lineHeight:1.3}}>{step.t}</div>
                    <div style={{fontSize:9,color:sub,lineHeight:1.5}}>{step.d}</div>
                  </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ OLIVIA */}
  
            {/* CALIDAD DE CRÉDITOS */}
            <div style={{background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.02)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:14,padding:'20px',marginBottom:20}}>
              <div style={{fontSize:9,fontWeight:700,color:accent,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>
                {es?'Verra ya opera en Argentina · el nicho urbano está vacío':'Verra already operates in Argentina · urban niche is empty'}
              </div>
              <p style={{fontSize:11,color:sub,lineHeight:1.7,marginBottom:12}}>
                {es
                  ? 'Los créditos OLIVIA seguirán el mismo estándar VCS que ya certificó 138.000 créditos en Misiones (Nideport, oct. 2025) y 13,1 millones de tCO2 en el primer programa jurisdiccional gubernamental del mundo (Provincia de Misiones, jun. 2026). La diferencia: todos los proyectos argentinos son forestales y rurales. OLIVIA será el primero urbano — el de mayor trazabilidad ciudadana y el más relevante para CORSIA y EU ETS.'
                  : 'OLIVIA credits will follow the same VCS standard that already certified 138,000 credits in Misiones (Nideport, Oct. 2025) and 13.1 million tCO2 in the world first government-led jurisdictional program (Province of Misiones, Jun. 2026). The difference: all Argentine projects are forest and rural. OLIVIA will be the first urban one — with the highest citizen traceability and most relevant for CORSIA and EU ETS.'}
              </p>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {[
                  {n:'VCS + CCB Gold',l:es?'estándar Nideport Misiones':'Nideport Misiones standard',c:accent},
                  {n:'13,1M tCO2',l:es?'Provincia Misiones jun. 2026':'Misiones Province Jun. 2026',c:'#3b82f6'},
                  {n:es?'Primer proyecto urbano':'First urban project',l:es?'OLIVIA · CABA · 2027':'OLIVIA · CABA · 2027',c:'#f59e0b'},
                ].map((s,i)=>(
                  <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid '+s.c+'33',borderRadius:8,padding:'8px 12px'}}>
                    <div style={{fontSize:11,fontWeight:700,color:s.c}}>{s.n}</div>
                    <div style={{fontSize:9,color:sub}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12,textAlign:'center'}}>
            [ {es?'Por qué los créditos OLIVIA':'Why OLIVIA credits'} ]
          </div>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:40}}>
            {es?'No todos los créditos son iguales. CORSIA y EU ETS exigen los mejores.':'Not all credits are equal. CORSIA and EU ETS demand the best.'}
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
            {(es?[
              {icon:'🔍',t:'Trazabilidad completa dMRV',d:'Cada crédito OLIVIA tiene: foto del origen, coordenadas GPS, peso verificado por IA y registro en blockchain. El comprador puede auditar cada gramo de CO2 evitado.',c:accent},
              {icon:'✅',t:'Verra VCS · metodología validada',d:'En febrero 2026 Verra aprobó su primer piloto dMRV de alta frecuencia — el mismo modelo que implementa OLIVIA. El camino a la certificación está validado.',c:blue},
              {icon:'🌿',t:'Origen urbano ciudadano',d:'Los créditos OLIVIA vienen del reciclaje de residuos orgánicos urbanos por ciudadanos reales. Impacto medible, verificable y con co-beneficios sociales (cooperativistas que cobran por su trabajo).',c:purple},
              {icon:'📊',t:'Datos en tiempo real',d:'Dashboard con datos verificados actualizables en tiempo real. Compatible con reportes GRI · SASB · TCFD · CORSIA · EU ETS. No es una estimación — son datos reales de pesaje.',c:orange},
            ]:[
              {icon:'🔍',t:'Complete dMRV traceability',d:'Each OLIVIA credit has: origin photo, GPS coordinates, AI-verified weight and blockchain record. The buyer can audit every gram of CO2 avoided.',c:accent},
              {icon:'✅',t:'Verra VCS · validated methodology',d:'In February 2026 Verra approved its first high-frequency dMRV pilot — the same model OLIVIA implements. The path to certification is validated.',c:blue},
              {icon:'🌿',t:'Urban citizen origin',d:'OLIVIA credits come from urban organic waste recycling by real citizens. Measurable, verifiable impact with social co-benefits (cooperatives paid for their work).',c:purple},
              {icon:'📊',t:'Real-time data',d:'Dashboard with real-time verifiable data. Compatible with GRI · SASB · TCFD · CORSIA · EU ETS reports. Not an estimate — real weighing data.',c:orange},
            ]).map((item,i)=>(
              <div key={i} style={{background:card,border:'1px solid '+item.c+'33',borderRadius:14,padding:'20px'}}>
                <div style={{fontSize:28,marginBottom:10}}>{item.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:item.c,marginBottom:8}}>{item.t}</div>
                <div style={{fontSize:11,color:sub,lineHeight:1.7}}>{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'56px 24px',textAlign:'center',background:'linear-gradient(135deg,rgba(59,130,246,0.06),rgba(168,85,247,0.04))',borderTop:'1px solid rgba(59,130,246,0.15)'}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:8}}>
            {es?'Las fechas límite ya están activas.':'The deadlines are already active.'}
          </h2>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:8}}>
            {es
              ? 'EU ETS marítimo: septiembre 2026. CORSIA: 2027. CBAM: ya activo. Los créditos de alta calidad se agotan primero.'
              : 'Maritime EU ETS: September 2026. CORSIA: 2027. CBAM: already active. High-quality credits run out first.'}
          </p>
          <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:28}}>
            {es
              ? 'Firmá el NDA y coordinamos una reunión técnica con tu área de Compliance o Sustentabilidad en menos de 48 horas.'
              : 'Sign the NDA and we coordinate a technical meeting with your Compliance or Sustainability team in less than 48 hours.'}
          </p>
          <a href="/nda" style={{display:'inline-block',background:'linear-gradient(135deg,#3b82f6,#1d4ed8)',borderRadius:40,padding:'16px 40px',color:'white',fontSize:14,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:16}}>
            {es?'Firmar NDA y coordinar reunión →':'Sign NDA and schedule meeting →'}
          </a>
          <div style={{fontSize:11,color:sub}}>
            {es?'O escribinos directamente:':'Or write to us directly:'}{' '}
            <a href="mailto:hola@oliviacirculab.com.ar?subject=Grandes Emisores OLIVIA" style={{color:blue}}>hola@oliviacirculab.com.ar</a>
          </div>
        </div>
      </section>

      <footer style={{borderTop:'1px solid '+border,padding:'24px',textAlign:'center'}}>
        <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:36,height:36,objectFit:'contain',borderRadius:6,marginBottom:8}} /></a>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.1em'}}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
        <div style={{marginTop:8,display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/institucional" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Inversores':'Investors'}</a>
          <a href="/grandes-generadores" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Ley 1854 CABA':'Law 1854 CABA'}</a>
          <a href="/whitepaper" style={{fontSize:11,color:sub,textDecoration:'none'}}>Whitepaper</a>
          <a href="/nda" style={{fontSize:11,color:sub,textDecoration:'none'}}>NDA</a>
        </div>
      </footer>
    </div>
  )
}
