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
              {n:'4',t:'Venta de créditos a compradores globales',d:'Las empresas tecnológicas con compromisos de dispositivos circulares son los compradores naturales de créditos de carbono por RAEE. Precio estimado: USD 10-30/tCO₂.',c:accent},
            ]:[
              {n:'1',t:'Choose the correct methodology',d:'AMS-III.BA + VMR0008 (mandatory review since Sept. 2023). Certifies recovery of e-waste materials that displace virgin material production.',c:morado},
              {n:'2',t:'Record volume with dMRV',d:'OLIVIA implements digital verification: e-waste photo on arrival · AI classification · material weight · plant GPS · origin generator record.',c:azul},
              {n:'3',t:'Audit by accredited VVB',d:'A Verra-accredited auditor (DNV, Bureau Veritas) validates methodology and data. With 12 months of dMRV history, VCU issuance can begin.',c:naranja},
              {n:'4',t:'Sell credits to global buyers',d:'Technology companies with circular device commitments are the natural buyers of e-waste carbon credits. Estimated price: USD 10-30/tCO₂.',c:accent},
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

      <footer style={{borderTop:'1px solid '+border,padding:24,textAlign:'center'}}>
        <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:36,height:36,objectFit:'contain',borderRadius:6,marginBottom:8}} /></a>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'.1em'}}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
        <div style={{marginTop:8,display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/mapa" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Mapa':'Map'}</a>
          <a href="/grandes-generadores" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Grandes Generadores':'Large Generators'}</a>
          <a href="/consorcios" style={{fontSize:11,color:sub,textDecoration:'none'}}>Consorcios</a>
          <a href="/nda" style={{fontSize:11,color:sub,textDecoration:'none'}}>NDA</a>
        </div>
      </footer>
    </div>
  )
}
