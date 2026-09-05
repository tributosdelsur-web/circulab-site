'use client'
import { useState } from 'react'

export default function RAEE() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#94a3b8' : '#6b7280'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const accent = '#22c55e'
  const morado = '#9333ea'
  const naranja = '#f59e0b'
  const azul = '#0284c7'
  const rojo = '#ef4444'

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'Inter,system-ui',transition:'all .3s'}}>
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:dark?'rgba(10,14,26,.95)':'rgba(247,245,241,.95)',borderBottom:'1px solid '+border,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <span style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'.05em'}}>OLIVIA Circulab</span>
        </a>
        <div style={{display:'flex',gap:6}}>
          <button onClick={()=>setLang(es?'en':'es')} style={{border:'1px solid '+border,borderRadius:20,padding:'5px 12px',fontSize:10,fontWeight:700,cursor:'pointer',background:'transparent',color:text}}>{es?'EN':'ES'}</button>
          <button onClick={()=>setDark(!dark)} style={{border:'1px solid '+border,borderRadius:20,padding:'5px 9px',fontSize:12,cursor:'pointer',background:'transparent',color:text}}>{dark?'☀️':'🌙'}</button>
        </div>
      </nav>

      <section style={{padding:'56px 24px',textAlign:'center',background:'linear-gradient(135deg,rgba(147,51,234,.06),rgba(239,68,68,.03))',borderBottom:'1px solid rgba(147,51,234,.15)'}}>
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'.3em',color:morado,marginBottom:12}}>
            [ {es?'Residuos de Aparatos Eléctricos y Electrónicos':'Waste Electrical and Electronic Equipment'} ]
          </div>
          <h1 style={{fontSize:34,fontWeight:900,lineHeight:1.15,marginBottom:16}}>
            {es?'La minería urbana que nadie estaba certificando.':'The urban mining nobody was certifying.'}
            <br/><span style={{color:morado}}>{es?'Hasta ahora.':'Until now.'}</span>
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.7,maxWidth:560,margin:'0 auto 28px'}}>
            {es
              ? 'Cada tonelada de electrónico que va al relleno contamina el suelo con plomo, mercurio y cadmio, y obliga a extraer nuevos minerales vírgenes. Cada tonelada que se recupera evita entre 3 y 5 tCO₂. OLIVIA certifica ese impacto con datos verificables para el mercado global de carbono.'
              : 'Every ton of electronics going to landfill contaminates soil with lead, mercury and cadmium, and forces new virgin mineral extraction. Every ton recovered avoids 3-5 tCO₂. OLIVIA certifies that impact with verifiable data for the global carbon market.'}
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:24}}>
            <a href="/nda" style={{background:'linear-gradient(135deg,#9333ea,#7e22ce)',borderRadius:40,padding:'14px 32px',color:'#fff',fontSize:13,fontWeight:700,textDecoration:'none'}}>
              {es?'Quiero certificar mi RAEE →':'I want to certify my e-waste →'}
            </a>
            <a href="/mapa" style={{background:'transparent',border:'1px solid '+border,borderRadius:40,padding:'14px 32px',color:text,fontSize:13,fontWeight:700,textDecoration:'none'}}>
              {es?'Ver dónde entregar RAEE':'Where to drop e-waste'}
            </a>
          </div>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            {([
              ['1',es?'único proyecto RAEE verificado en el mundo hoy':'only verified e-waste project in the world today',morado],
              ['3-5 tCO₂',es?'evitadas por tonelada recuperada':'avoided per recovered ton',naranja],
              ['0',es?'proyectos RAEE en América Latina':'e-waste projects in Latin America',rojo],
              ['AMS-III.BA',es?'metodología Verra activa':'active Verra methodology',azul],
            ] as [string,string,string][]).map(([n,l,c],i)=>(
              <div key={i} style={{background:dark?'rgba(255,255,255,.04)':'rgba(0,0,0,.03)',border:'1px solid '+c+'33',borderRadius:12,padding:'10px 16px',textAlign:'center'}}>
                <div style={{fontSize:18,fontWeight:900,color:c,marginBottom:2}}>{n}</div>
                <div style={{fontSize:9,color:sub,maxWidth:120}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:40}}>
            {es?'El residuo más valioso y más tóxico al mismo tiempo.':'The most valuable and most toxic waste at the same time.'}
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:14}}>
            {(es?[
              {icon:'💻',t:'Qué es RAEE',d:'Computadoras · monitores · celulares · tablets · televisores · electrodomésticos · impresoras · baterías. Todo dispositivo que usa electricidad y llegó al final de su vida útil.',c:morado},
              {icon:'⚠️',t:'Por qué es tóxico sin tratamiento',d:'Plomo (baterías, soldaduras) · mercurio (pantallas) · cadmio · cromo hexavalente. En el relleno, esos materiales contaminan suelo y napas durante décadas.',c:rojo},
              {icon:'💰',t:'Por qué es valioso con tratamiento',d:'Cobre · aluminio · oro · plata · platino · litio · cobalto. Una tonelada de celulares tiene más oro que una tonelada de mineral de mina.',c:naranja},
              {icon:'🌍',t:'El mercado de carbono para RAEE',d:'Recuperar 1 tonelada de cobre de RAEE evita entre 3 y 5 tCO₂ versus extraerlo de la mina. Ese ahorro es certificable bajo Verra AMS-III.BA.',c:accent},
            ]:[
              {icon:'💻',t:'What is e-waste',d:'Computers · monitors · phones · tablets · TVs · appliances · printers · batteries. Any device that uses electricity and reached end of life.',c:morado},
              {icon:'⚠️',t:'Why it is toxic untreated',d:'Lead (batteries, solder) · mercury (screens) · cadmium · hexavalent chromium. In landfill they contaminate soil and groundwater for decades.',c:rojo},
              {icon:'💰',t:'Why it is valuable treated',d:'Copper · aluminium · gold · silver · platinum · lithium · cobalt. One ton of phones contains more gold than one ton of mine ore.',c:naranja},
              {icon:'🌍',t:'The carbon market for e-waste',d:'Recovering 1 ton of copper from e-waste avoids 3-5 tCO₂ versus mining it. That saving is certifiable under Verra AMS-III.BA.',c:accent},
            ]).map((item,i)=>(
              <div key={i} style={{background:card,border:'1px solid '+item.c+'33',borderRadius:14,padding:20}}>
                <div style={{fontSize:28,marginBottom:10}}>{item.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:item.c,marginBottom:8}}>{item.t}</div>
                <div style={{fontSize:11,color:sub,lineHeight:1.7}}>{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSTICO RAEE CABA */}
      <section style={{padding:'0 24px 56px',maxWidth:900,margin:'0 auto'}}>
        <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'.3em',color:morado,marginBottom:12,textAlign:'center',paddingTop:56}}>
          [ {es?'Diagnóstico · Ciudad de Buenos Aires':'Diagnosis · Buenos Aires City'} ]
        </div>
        <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:12}}>
          {es?'¿Qué pasa hoy con los electrónicos en Buenos Aires?':'What happens to electronics in Buenos Aires today?'}
        </h2>
        <p style={{fontSize:13,color:sub,textAlign:'center',lineHeight:1.7,maxWidth:560,margin:'0 auto 32px'}}>
          {es
            ? 'Cada habitante de la Ciudad genera cerca de 11 kilos de residuos electrónicos por año. Casi todo ese circuito es voluntario y prácticamente nada queda registrado.'
            : 'Each resident generates about 11 kilos of electronic waste per year. Almost the entire circuit is voluntary and nearly nothing is recorded.'}
        </p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12,marginBottom:24}}>
          {([
            ['11 kg',es?'por habitante al año en CABA':'per resident per year',morado],
            ['2008',es?'única ley de RAEE de la Ciudad · Ley 2.807':'the City only RAEE law · Law 2.807',rojo],
            ['0',es?'obligación para el vecino o la empresa privada':'obligation for residents or private firms',naranja],
            ['0',es?'registro de trazabilidad de lo entregado':'traceability records of what is delivered',azul],
          ]).map(([n,l,col],i)=>(
            <div key={i} style={{background:card,border:'1px solid '+col+'30',borderRadius:12,padding:'16px',textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:900,color:col,marginBottom:4}}>{n}</div>
              <div style={{fontSize:10,color:sub,lineHeight:1.5}}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{background:dark?'rgba(239,68,68,.08)':'#fef2f2',border:'1px solid rgba(239,68,68,.28)',borderRadius:14,padding:'20px',marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:800,color:rojo,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
            {es?'El vacío legal':'The regulatory gap'}
          </div>
          <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
            {es
              ? <>La Ciudad de Buenos Aires sancionó en 2008 la <b style={{color:text}}>Ley 2.807</b>, reglamentada por el Decreto 705/2011. Pero esa ley cubre únicamente los aparatos electrónicos <b style={{color:text}}>del Poder Ejecutivo del propio Gobierno de la Ciudad</b> que hayan sido dados de baja patrimonial. No alcanza al vecino ni a la empresa privada.<br/><br/>A diferencia de la Provincia de Buenos Aires, que tiene la Ley 14.321 de gestión sustentable de RAEE, <b style={{color:text}}>CABA no tiene una ley general de residuos electrónicos</b>. Para el hogar y para el comercio, entregar un electrónico correctamente es hoy un acto puramente voluntario.</>
              : <>Buenos Aires City passed Law 2.807 in 2008, but it only covers City Government equipment written off from public assets. Unlike Buenos Aires Province with its Law 14.321, the City has no general e-waste law. For households and private businesses, proper disposal is entirely voluntary.</>}
          </p>
        </div>

        <h3 style={{fontSize:17,fontWeight:900,marginBottom:14}}>{es?'Dónde se puede entregar hoy':'Where you can deliver today'}</h3>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:22}}>
          {(es?[
            {ic:'🚚',t:'Puntos Verdes Móviles',d:'Camiones que rotan por distintos barrios con cronograma semanal. Reciben RAEE de vecinos.',c:accent},
            {ic:'♻️',t:'Puntos Verdes con Atención Personalizada',d:'Los puntos fijos de la Ciudad que tienen personal. No todos reciben electrónicos: conviene confirmar antes de ir.',c:accent},
            {ic:'📱',t:'Puntos de recepción privados',d:'Algunas cadenas de electrónica tienen puntos de recepción propios en sus locales.',c:azul},
            {ic:'🔋',t:'Pilas y baterías',d:'Tienen su propia norma, la Ley 5.991 de gestión ambiental de pilas en desuso, y su propio circuito de recepción.',c:naranja},
            {ic:'🏭',t:'Tratadores habilitados',d:'Para instituciones públicas o privadas que generan volumen, existe un registro de tratadores habilitados que pueden gestionar el material.',c:morado},
          ]:[
            {ic:'🚚',t:'Mobile Green Points',d:'Trucks rotating through neighbourhoods on a weekly schedule.',c:accent},
            {ic:'♻️',t:'Staffed Green Points',d:'Fixed City points with personnel. Not all accept electronics.',c:accent},
            {ic:'📱',t:'Private drop-off points',d:'Some electronics retailers have their own collection points.',c:azul},
            {ic:'🔋',t:'Batteries',d:'Covered by Law 5.991 with its own collection circuit.',c:naranja},
            {ic:'🏭',t:'Licensed treaters',d:'For institutions generating volume, a registry of licensed treaters exists.',c:morado},
          ]).map((o,i)=>(
            <div key={i} style={{display:'flex',gap:14,alignItems:'flex-start',background:card,border:'1px solid '+o.c+'25',borderRadius:12,padding:'15px 17px'}}>
              <span style={{fontSize:24,lineHeight:1,flexShrink:0}}>{o.ic}</span>
              <div>
                <div style={{fontSize:13,fontWeight:800,color:o.c,marginBottom:4}}>{o.t}</div>
                <div style={{fontSize:11.5,color:sub,lineHeight:1.7}}>{o.d}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{fontSize:17,fontWeight:900,marginBottom:12}}>{es?'¿Y qué pasa después?':'And what happens next?'}</h3>
        <div style={{background:card,border:'1px solid '+border,borderRadius:12,padding:'18px',marginBottom:18}}>
          <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
            {es
              ? <>Los aparatos que todavía funcionan pueden ser <b style={{color:text}}>reparados y donados</b> para su reutilización. Los que no, se desarman para <b style={{color:text}}>valorizar los materiales</b> que los componen: plástico, vidrio, aluminio, cobre y otros metales.<br/><br/>Ese desarme lo hacen operadores con habilitación específica. En la Ciudad de Buenos Aires ese universo es muy chico: <b style={{color:text}}>hay una sola cooperativa con habilitación de APRA para gestionar y manipular RAEE</b>, Reciclando Trabajo y Dignidad, en Villa Soldati, con 54 trabajadores.</>
              : <>Working devices can be repaired and donated for reuse. Others are dismantled to recover plastic, glass, aluminium, copper and other metals. In Buenos Aires City there is a single cooperative with APRA authorisation to handle e-waste: Reciclando Trabajo y Dignidad, in Villa Soldati, with 54 workers.</>}
          </p>
        </div>

        <div style={{background:dark?'rgba(2,132,199,.10)':'#e0f2fe',border:'1px solid rgba(2,132,199,.28)',borderRadius:14,padding:'20px'}}>
          <div style={{fontSize:11,fontWeight:800,color:azul,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
            {es?'Lo que falta':'What is missing'}
          </div>
          <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
            {es
              ? <>El circuito existe, pero <b style={{color:text}}>nadie registra qué se entregó, de dónde vino, ni qué materiales se recuperaron de cada aparato</b>. Sin ese dato no se puede dimensionar cuánto RAEE genera realmente la Ciudad, ni cuánta capacidad de tratamiento hay disponible, ni demostrar el impacto ambiental de recuperar cobre y aluminio en vez de extraerlos de una mina.<br/><br/>Y sin ese registro tampoco puede certificarse. La metodología de carbono para RAEE calcula el beneficio por el desplazamiento de producción de materiales vírgenes, lo que exige saber con precisión cuántos kilos de cada material se recuperaron. No alcanza con contar aparatos.</>
              : <>The circuit exists, but nobody records what was delivered, where it came from, or what materials were recovered. Without that data, the impact cannot be measured or certified.</>}
          </p>
        </div>
      </section>

      <section style={{padding:'0 24px 64px',background:dark?'rgba(147,51,234,.03)':'rgba(147,51,234,.02)',borderTop:'1px solid rgba(147,51,234,.1)'}}>
        <div style={{maxWidth:800,margin:'0 auto',paddingTop:64}}>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:12}}>
            {es?'La metodología existe. El mercado está vacío.':'The methodology exists. The market is empty.'}
          </h2>
          <p style={{fontSize:13,color:sub,textAlign:'center',lineHeight:1.7,maxWidth:560,margin:'0 auto 40px'}}>
            {es
              ? 'Verra tiene la metodología AMS-III.BA (con la revisión VMR0008) para certificar la recuperación y reciclaje de materiales de residuos electrónicos. Hoy existe solo 1 proyecto verificado en el mundo, en India. En América Latina no hay ninguno.'
              : 'Verra has the AMS-III.BA methodology (with VMR0008 review) to certify recovery and recycling of materials from electronic waste. Today only 1 verified project exists worldwide, in India. In Latin America there are none.'}
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {(es?[
              {n:'1',t:'Elegir la metodología correcta',d:'AMS-III.BA + VMR0008 (revisión obligatoria desde septiembre 2023). Certifica la recuperación de materiales de RAEE que desplazan la producción de materiales vírgenes.',c:morado},
              {n:'2',t:'Registrar el volumen con dMRV',d:'OLIVIA implementa el sistema de verificación digital: foto del RAEE al ingresar · clasificación con IA · pesaje por material · GPS de la planta · registro del generador de origen.',c:azul},
              {n:'3',t:'Auditoría por VVB acreditado',d:'Un auditor acreditado por Verra (DNV, Bureau Veritas) valida la metodología y los datos. Con 12 meses de historial dMRV se puede iniciar la emisión de VCUs.',c:naranja},
              {n:'4',t:'Venta de créditos a compradores globales',d:'Las empresas tecnológicas con compromisos públicos de dispositivos circulares son los compradores naturales de este tipo de crédito. Los precios del mercado voluntario varían según la metodología y el año, y sólo se conocen al momento de la emisión.',c:accent},
            ]:[
              {n:'1',t:'Choose the correct methodology',d:'AMS-III.BA + VMR0008 (mandatory review since Sept. 2023). Certifies recovery of e-waste materials that displace virgin material production.',c:morado},
              {n:'2',t:'Record volume with dMRV',d:'OLIVIA implements digital verification: e-waste photo on arrival · AI classification · material weight · plant GPS · origin generator record.',c:azul},
              {n:'3',t:'Audit by accredited VVB',d:'A Verra-accredited auditor (DNV, Bureau Veritas) validates methodology and data. With 12 months of dMRV history, VCU issuance can begin.',c:naranja},
              {n:'4',t:'Sell credits to global buyers',d:'Technology companies with public circular device commitments are the natural buyers of this credit type. Voluntary market prices vary and are only known at issuance.',c:accent},
            ]).map((s,i)=>(
              <div key={i} style={{background:card,border:'1px solid '+s.c+'22',borderRadius:14,padding:20,display:'flex',gap:16,alignItems:'flex-start'}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,'+s.c+','+s.c+'aa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:900,color:'#fff',flexShrink:0}}>{s.n}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:s.c,marginBottom:6}}>{s.t}</div>
                  <div style={{fontSize:11,color:sub,lineHeight:1.7}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'56px 24px',textAlign:'center',background:'linear-gradient(135deg,rgba(147,51,234,.06),rgba(239,68,68,.03))',borderTop:'1px solid rgba(147,51,234,.15)'}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:8}}>
            {es?'El primer proyecto RAEE de América Latina.':'The first e-waste project in Latin America.'}
          </h2>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:28}}>
            {es
              ? 'Firmá el NDA y coordinamos una visita a tu planta para evaluar el volumen de RAEE y el potencial de certificación Verra.'
              : 'Sign the NDA and we coordinate a visit to your plant to evaluate your e-waste volume and Verra certification potential.'}
          </p>
          <a href="/nda" style={{display:'inline-block',background:'linear-gradient(135deg,#9333ea,#7e22ce)',borderRadius:40,padding:'16px 40px',color:'#fff',fontSize:14,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:16}}>
            {es?'Firmar NDA y coordinar visita →':'Sign NDA and coordinate visit →'}
          </a>
          <div style={{fontSize:11,color:sub}}>
            {es?'O escribinos:':'Or write to us:'}{' '}
            <a href="mailto:hola@oliviacirculab.com.ar?subject=RAEE OLIVIA" style={{color:morado}}>hola@oliviacirculab.com.ar</a>
          </div>
        </div>
      </section>

      <footer style={{borderTop:'1px solid '+border,padding:'40px 24px 32px',textAlign:'center'}}>
        <a href="/" style={{display:'block',marginBottom:10}}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{width:52,height:52,objectFit:'contain',display:'block',margin:'0 auto'}} />
        </a>
        <div style={{fontSize:13,fontWeight:800,color:text,marginBottom:6}}>OLIVIA Circulab</div>
        <div style={{fontSize:10,color:sub,lineHeight:1.6,maxWidth:400,margin:'0 auto 18px'}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',maxWidth:600,margin:'0 auto 14px'}}>
          {[
            {l:es?'Ciudadano':'Citizen',h:'/ciudadano'},
            {l:'Metamorfosis',h:'/metamorfosis'},
            {l:'Consorcios',h:'/consorcios'},
            {l:es?'Grandes Generadores':'Large Generators',h:'/grandes-generadores'},
            {l:es?'Grandes Emisores':'Large Emitters',h:'/grandes-emisores'},
            {l:'RAEE',h:'/raee'},
            {l:es?'Mapa':'Map',h:'/mapa'},
            {l:'Kits',h:'/kits'},
            {l:es?'Inversores':'Investors',h:'/institucional'},
          ].map(n=>(
            <a key={n.h} href={n.h} style={{fontSize:11,color:sub,textDecoration:'none',fontWeight:600}}>{n.l}</a>
          ))}
        </div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',maxWidth:600,margin:'0 auto 16px'}}>
          {[
            {l:'Whitepaper',h:'/whitepaper'},
            {l:'One Pager',h:'/onepager'},
            {l:'Pitch',h:'/pitch'},
            {l:es?'Equipo':'Team',h:'/equipo'},
            {l:es?'Alianzas':'Partners',h:'/alianzas'},
            {l:'NDA',h:'/nda'},
          ].map(n=>(
            <a key={n.h} href={n.h} style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.75}}>{n.l}</a>
          ))}
        </div>
        <div style={{fontSize:11,color:sub,marginBottom:10}}>hola@oliviacirculab.com.ar</div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:10}}>
          <a href="/terminos" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>{es?'Términos':'Terms'}</a>
          <a href="/privacidad" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>{es?'Privacidad':'Privacy'}</a>
          <a href="https://www.linkedin.com/company/113160128/" style={{fontSize:10,color:sub,textDecoration:'none',opacity:0.7}}>LinkedIn</a>
        </div>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',letterSpacing:'0.05em',opacity:0.7}}>© 2026 Circulab Tech · Distrito Tecnológico · Buenos Aires · Ley 27.506</div>
      </footer>
    </div>
  )
}
