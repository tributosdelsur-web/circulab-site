'use client'
import { useState } from 'react'

export default function Operadores() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const [perfil, setPerfil] = useState<'coop'|'obligado'|'muni'>('coop')
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#94a3b8' : '#64748b'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const accent = '#22c55e'
  const azul = '#0284c7'
  const marron = '#92400e'
  const morado = '#7e22ce'
  const box = (c: string, bgc: string) => ({background:bgc,border:'1px solid '+c,borderRadius:12,padding:18})

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'Inter,system-ui',transition:'all .3s'}}>

      <nav style={{position:'sticky',top:0,zIndex:60,backdropFilter:'blur(16px)',background:dark?'rgba(10,14,26,.95)':'rgba(247,245,241,.95)',borderBottom:'1px solid '+border,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <span style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'.05em'}}>OLIVIA Circulab</span>
        </a>
        <div style={{display:'flex',gap:6}}>
          <button onClick={()=>setLang(es?'en':'es')} style={{border:'1px solid '+border,borderRadius:20,padding:'5px 12px',fontSize:10,fontWeight:700,cursor:'pointer',background:'transparent',color:text}}>{es?'EN':'ES'}</button>
          <button onClick={()=>setDark(!dark)} style={{border:'1px solid '+border,borderRadius:20,padding:'5px 9px',fontSize:12,cursor:'pointer',background:'transparent',color:text}}>{dark?'☀️':'🌙'}</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:'48px 20px 32px',textAlign:'center',background:'linear-gradient(135deg,rgba(34,197,94,.07),rgba(2,132,199,.04))',borderBottom:'1px solid '+border}}>
        <div style={{maxWidth:660,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'.3em',color:accent,marginBottom:14}}>
            [ {es?'Para operadores, plantas y generadores':'For operators, plants and generators'} ]
          </div>
          <h1 style={{fontSize:31,fontWeight:900,lineHeight:1.2,marginBottom:16}}>
            {es?'Ya hacés el trabajo. Falta el dato que lo demuestre.':'You already do the work. The data that proves it is missing.'}
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.75,maxWidth:560,margin:'0 auto'}}>
            {es
              ? 'Cada día procesás material que no termina en el relleno. Pero si nadie registra de dónde vino, cuánto pesó y en qué se transformó, ese trabajo no se puede demostrar, no se puede certificar y no se puede valorizar.'
              : 'Every day you process material that does not end up in landfill. But if nobody records where it came from, how much it weighed and what it became, that work cannot be proven or certified.'}
          </p>
        </div>
      </section>

      {/* EL PROBLEMA */}
      <section style={{padding:'40px 20px',maxWidth:900,margin:'0 auto'}}>
        <h2 style={{fontSize:23,fontWeight:900,marginBottom:8}}>
          {es?'Lo que hoy no queda registrado':'What is not recorded today'}
        </h2>
        <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:20,maxWidth:620}}>
          {es?'Estas preguntas no tienen respuesta en casi ninguna planta de la Ciudad:':'These questions have no answer in almost any facility in the city:'}
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10,marginBottom:22}}>
          {(es?[
            'Cuánto material entró exactamente este mes',
            'De dónde vino cada carga',
            'Cuántos kilos de cada tipo se recuperaron',
            'Cuánto metano se evitó con todo eso',
            'Cuánta capacidad ociosa queda disponible',
            'Qué se puede demostrar ante un auditor',
          ]:[
            'How much material came in this month',
            'Where each load came from',
            'How many kilos of each type were recovered',
            'How much methane was avoided',
            'How much idle capacity remains',
            'What can be proven to an auditor',
          ]).map((q,i)=>(
            <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',background:card,border:'1px solid '+border,borderRadius:10,padding:'13px 15px'}}>
              <span style={{width:5,height:5,borderRadius:'50%',background:marron,flexShrink:0,marginTop:6}} />
              <span style={{fontSize:12,color:sub,lineHeight:1.6}}>{q}</span>
            </div>
          ))}
        </div>
        <div style={box(marron+'35',dark?'rgba(146,64,14,.10)':'#fef3c7')}>
          <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
            {es
              ? <>Sin ese registro, el trabajo existe pero no se puede probar. Y lo que no se puede probar <b style={{color:text}}>no entra a ningún mercado de carbono, no sirve como evidencia de cumplimiento y no permite negociar mejor el material recuperado.</b></>
              : <>Without that record, the work exists but cannot be proven. And what cannot be proven does not enter any carbon market.</>}
          </p>
        </div>
      </section>

      {/* QUÉ INSTALAMOS */}
      <section style={{padding:'32px 20px',maxWidth:900,margin:'0 auto',borderTop:'1px solid '+border}}>
        <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.12em',color:accent,marginBottom:8}}>
          {es?'Qué instalamos':'What we install'}
        </div>
        <h2 style={{fontSize:23,fontWeight:900,marginBottom:18}}>
          {es?'Los cuatro datos que cierran un registro':'The four data points that close a record'}
        </h2>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>
          {(es?[
            {i:'📸',t:'Origen',d:'Quien entrega fotografía el residuo con una moneda de referencia. La inteligencia artificial estima el volumen y valida la imagen. Ubicación y hora quedan capturadas automáticamente.',c:accent},
            {i:'🚶',t:'Transferencia',d:'Al llegar al punto de recepción se escanea el código y se registra la entrega. Queda vinculado quién lo trajo y a dónde.',c:azul},
            {i:'⚖️',t:'Peso',d:'Balanza conectada que firma cada lectura desde el propio hardware. El peso real, no el declarado, y sin posibilidad de edición posterior.',c:marron},
            {i:'🌱',t:'Procesamiento',d:'El registro sólo se cierra cuando se confirma que el material se transformó. Sin esa confirmación, los otros tres datos no alcanzan.',c:morado},
          ]:[
            {i:'📸',t:'Origin',d:'Photo with a reference coin. AI estimates volume. Location and time captured automatically.',c:accent},
            {i:'🚶',t:'Transfer',d:'QR scan at the reception point links who brought it and where.',c:azul},
            {i:'⚖️',t:'Weight',d:'Connected scale signing each reading in hardware. Real weight, not declared.',c:marron},
            {i:'🌱',t:'Processing',d:'The record only closes when transformation is confirmed.',c:morado},
          ]).map((p,i)=>(
            <div key={i} style={{display:'flex',gap:14,alignItems:'flex-start',background:card,border:'1px solid '+p.c+'25',borderRadius:12,padding:'16px 18px'}}>
              <span style={{fontSize:25,lineHeight:1,flexShrink:0}}>{p.i}</span>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:p.c,marginBottom:4}}>{p.t}</div>
                <div style={{fontSize:12.5,color:sub,lineHeight:1.7}}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={box(border,card)}>
          <div style={{fontSize:11,fontWeight:800,color:sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
            {es?'Lo que cambia en tu operación':'What changes in your operation'}
          </div>
          <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
            {es
              ? <>Casi nada. Se apoya el contenedor en la balanza, se escanea el código y listo: <b style={{color:text}}>unos cinco segundos por carga</b>. No hay planillas que llenar ni cálculos que hacer. El sistema resta la tara solo y guarda el peso neto.</>
              : <>Almost nothing. Place the container on the scale, scan the code, done: about five seconds per load.</>}
          </p>
        </div>
      </section>

      {/* EL MODELO */}
      <section style={{padding:'32px 20px',maxWidth:900,margin:'0 auto',borderTop:'1px solid '+border}}>
        <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.12em',color:azul,marginBottom:8}}>
          {es?'El modelo':'The model'}
        </div>
        <h2 style={{fontSize:23,fontWeight:900,marginBottom:8}}>
          {es?'No todos son clientes. Algunos son socios.':'Not everyone is a client. Some are partners.'}
        </h2>
        <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:20,maxWidth:620}}>
          {es?'Elegí tu caso para ver cómo funciona.':'Choose your case to see how it works.'}
        </p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
          {[
            {k:'coop',l:es?'♻️ Cooperativa o planta':'♻️ Cooperative or plant'},
            {k:'obligado',l:es?'🏨 Generador obligado':'🏨 Obligated generator'},
            {k:'muni',l:es?'🏛️ Municipio o gobierno':'🏛️ Government'},
          ].map(o=>(
            <button key={o.k} onClick={()=>setPerfil(o.k as any)} style={{padding:'10px 18px',borderRadius:24,fontSize:13,fontWeight:700,cursor:'pointer',border:'1px solid '+(perfil===o.k?accent:border),background:perfil===o.k?(dark?'rgba(34,197,94,.15)':'#dcfce7'):'transparent',color:perfil===o.k?'#16a34a':sub}}>{o.l}</button>
          ))}
        </div>

        {perfil==='coop' && (
          <div>
            <div style={{...box(accent+'40',dark?'rgba(34,197,94,.1)':'#dcfce7'),marginBottom:14}}>
              <div style={{fontSize:20,fontWeight:900,color:'#16a34a',marginBottom:8}}>{es?'Sin costo':'No cost'}</div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>La balanza, el sistema, la instalación y el soporte los pone OLIVIA. <b style={{color:text}}>Ustedes no pagan nada y no asumen ningún riesgo.</b></>
                  : <>The scale, system, installation and support are provided by OLIVIA at no cost.</>}
              </p>
            </div>
            <div style={{...box(border,card),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}}>{es?'Por qué sin costo':'Why free'}</div>
              <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
                {es
                  ? <>Porque ustedes aportan lo único que nosotros no podemos conseguir solos: <b style={{color:text}}>una instalación real donde el material se transforma</b>. Un proyecto de certificación de carbono necesita un lugar físico que un auditor pueda visitar y verificar. Sin eso no hay proyecto. Cobrarles por el sistema sería cobrarles por aportar el activo más importante del circuito.</>
                  : <>Because you provide what we cannot get alone: a real facility where material is transformed, which an auditor can visit and verify.</>}
              </p>
            </div>
            <div style={{...box(azul+'35',dark?'rgba(2,132,199,.10)':'#e0f2fe'),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:azul,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}}>{es?'Qué reciben':'What you get'}</div>
              <div style={{fontSize:12.5,color:sub,lineHeight:2}}>
                {es?'· El dato de su propia operación, que hoy no tienen':'· Data on your own operation'}<br/>
                {es?'· Evidencia verificable para mostrar a convenios y clientes':'· Verifiable evidence for your agreements'}<br/>
                {es?'· Volumen adicional de vecinos y comercios de la zona':'· Additional volume from the neighbourhood'}<br/>
                {es?'· Participación en los créditos que eventualmente se emitan':'· Share in any credits eventually issued'}
              </div>
            </div>
            <div style={box(marron+'35',dark?'rgba(146,64,14,.10)':'#fef3c7')}>
              <div style={{fontSize:11,fontWeight:800,color:marron,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{es?'Con honestidad sobre los tiempos':'Honest about timelines'}</div>
              <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
                {es
                  ? <>La certificación de carbono es un proceso de <b style={{color:text}}>dos a tres años</b> que incluye validación por un auditor acreditado, y su resultado no depende de nosotros. No prometemos montos ni fechas. Lo que sí empieza desde el primer día es el registro, y sin ese historial acumulado no hay nada que certificar después.</>
                  : <>Carbon certification takes two to three years and its outcome does not depend on us. We promise no amounts or dates.</>}
              </p>
            </div>
          </div>
        )}

        {perfil==='obligado' && (
          <div>
            <div style={{...box(accent+'40',dark?'rgba(34,197,94,.1)':'#dcfce7'),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:'#16a34a',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
                {es?'La asimetría que te conviene conocer':'The asymmetry worth knowing'}
              </div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>Tu fracción húmeda <b style={{color:text}}>la pagás vos</b>: contratás un transportista habilitado y costeás traslado y disposición final. Pero la fracción orgánica, si estás en la ruta del SERFO, <b style={{color:text}}>la retira el Gobierno de la Ciudad sin costo</b>. Como los orgánicos pueden ser cerca del 45% del residuo de un gastronómico, cada kilo que pasa de una fracción a la otra es un kilo que dejás de pagar.</>
                  : <>You pay for your wet fraction. The organic fraction, on the SERFO route, is collected free by the City.</>}
              </p>
            </div>
            <div style={{...box(border,card),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}}>{es?'Qué incluye el servicio':'What the service includes'}</div>
              <div style={{fontSize:12.5,color:sub,lineHeight:2}}>
                {es?'· Diagnóstico de tu circuito actual de residuos':'· Diagnosis of your current waste circuit'}<br/>
                {es?'· Gestión de la solicitud del SERFO ante la Ciudad':'· Management of your SERFO request'}<br/>
                {es?'· Sistema de registro y verificación de lo que separás':'· Recording and verification system'}<br/>
                {es?'· Evidencia de cumplimiento para inspecciones':'· Compliance evidence for inspections'}<br/>
                {es?'· Reporte de impacto con datos medidos, no estimados':'· Impact report with measured data'}
              </div>
            </div>
            <div style={box(azul+'35',dark?'rgba(2,132,199,.10)':'#e0f2fe')}>
              <div style={{fontSize:11,fontWeight:800,color:azul,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{es?'Cómo se define el precio':'How pricing works'}</div>
              <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
                {es
                  ? <>Suscripción mensual según volumen, con una regla que no negociamos: <b style={{color:text}}>siempre por debajo del ahorro que genera separar la fracción orgánica.</b> Antes de proponer un número hacemos el cálculo con tus datos reales de generación y lo que pagás hoy de transporte. Si no hay ahorro, no hay propuesta.</>
                  : <>Monthly subscription by volume, always below the savings generated. We calculate it with your real data first.</>}
              </p>
            </div>
          </div>
        )}

        {perfil==='muni' && (
          <div>
            <div style={{...box(morado+'40',dark?'rgba(126,34,206,.10)':'#f3e8ff'),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:morado,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
                {es?'El dato que falta en la gestión pública':'The missing data in public management'}
              </div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>Hoy no existe forma de saber cuánto residuo se desvía realmente del relleno, cuánto llega por cada punto de recepción, ni si lo que un generador declara separar llegó efectivamente a tratamiento. <b style={{color:text}}>Sin ese dato no se puede dimensionar el cumplimiento de la normativa ni acceder a financiamiento climático que lo exija.</b></>
                  : <>There is no way today to know how much waste is actually diverted, or whether declared separation actually reached treatment.</>}
              </p>
            </div>
            <div style={{...box(border,card),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}}>{es?'Qué ofrecemos':'What we offer'}</div>
              <div style={{fontSize:12.5,color:sub,lineHeight:2}}>
                {es?'· Dashboard territorial con datos verificados en tiempo real':'· Territorial dashboard with verified real-time data'}<br/>
                {es?'· Medición en puntos de recepción que hoy no se miden':'· Measurement at reception points not measured today'}<br/>
                {es?'· Trazabilidad de origen a destino por cada carga':'· Origin-to-destination traceability'}<br/>
                {es?'· Datos de cumplimiento normativo con respaldo auditable':'· Auditable compliance data'}
              </div>
            </div>
            <div style={box(accent+'35',dark?'rgba(34,197,94,.08)':'#f0fdf4')}>
              <div style={{fontSize:11,fontWeight:800,color:'#16a34a',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{es?'Para empezar':'To start'}</div>
              <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
                {es
                  ? <>Proponemos instalaciones piloto <b style={{color:text}}>donando el equipamiento, sin costo para la administración</b>, con los registros a disposición del organismo. La idea es demostrar el valor del dato antes de hablar de cualquier contrato.</>
                  : <>We propose pilot installations donating the equipment at no cost, with records available to the authority.</>}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{padding:'40px 20px',textAlign:'center',borderTop:'1px solid '+border,background:'linear-gradient(135deg,rgba(34,197,94,.05),rgba(2,132,199,.03))'}}>
        <h2 style={{fontSize:21,fontWeight:900,marginBottom:10}}>{es?'Hablemos sin compromiso':'Let us talk, no commitment'}</h2>
        <p style={{fontSize:13,color:sub,lineHeight:1.7,maxWidth:520,margin:'0 auto 22px'}}>
          {es?'La primera conversación es para entender cómo trabajás, no para venderte nada. Si lo que hacemos no te sirve, te lo decimos.':'The first conversation is to understand how you work, not to sell you anything.'}
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="mailto:hola@oliviacirculab.com.ar?subject=Consulta%20operadores" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'14px 32px',color:'#fff',fontSize:13,fontWeight:700,textDecoration:'none'}}>
            {es?'Escribinos →':'Write to us →'}
          </a>
          <a href="/observatorio" style={{background:'transparent',border:'1px solid '+border,borderRadius:40,padding:'14px 32px',color:text,fontSize:13,fontWeight:700,textDecoration:'none'}}>
            {es?'Ver los datos verificados':'See verified data'}
          </a>
        </div>
      </section>

      {/* ═══ DONDE ESTAMOS HOY ═══ */}
      <section style={{maxWidth:580,margin:'0 auto',padding:'8px 20px 44px'}}>
        <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'20px 20px 18px'}}>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',fontWeight:800,color:sub,marginBottom:10}}>
            {es?'Dónde estamos hoy':'Where we stand today'}
          </div>
          <p style={{fontSize:14,lineHeight:1.6,margin:'0 0 14px'}}>
            {es?'El circuito ya está identificado. Estamos en conversaciones con una cooperativa de RAEE habilitada en CABA, con un operador privado de residuos orgánicos y con una dirección del Gobierno de la Ciudad. No publicamos nombres hasta tener acuerdos firmados: nos parece lo correcto con quienes todavía están decidiendo.':'The circuit is already mapped. We are in conversation with a licensed e-waste cooperative in Buenos Aires, a private organic waste operator and a City Government agency. We do not publish names before agreements are signed.'}
          </p>
          <p style={{fontSize:13,lineHeight:1.6,color:sub,margin:0}}>
            {es?'Si operás material y querés ser el primero en tener el dato que lo demuestre, es el momento de hablar.':'If you move material and want to be the first with the data to prove it, now is the time to talk.'}
          </p>
        </div>
      </section>

      <footer style={{borderTop:'1px solid '+border,padding:'32px 24px',textAlign:'center'}}>
        <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:44,height:44,objectFit:'contain',display:'block',margin:'0 auto 10px'}} /></a>
        <div style={{fontSize:13,fontWeight:800,color:text,marginBottom:6}}>OLIVIA Circulab</div>
        <div style={{fontSize:10,color:sub,lineHeight:1.6,maxWidth:400,margin:'0 auto 16px'}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:12}}>
          <a href="/organicos" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Orgánicos':'Organics'}</a>
          <a href="/raee" style={{fontSize:11,color:sub,textDecoration:'none'}}>RAEE</a>
          <a href="/observatorio" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Observatorio':'Observatory'}</a>
          <a href="/mapa" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Mapa':'Map'}</a>
          <a href="/nda" style={{fontSize:11,color:sub,textDecoration:'none'}}>NDA</a>
        </div>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',letterSpacing:'.05em',opacity:.7}}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
      </footer>
    </div>
  )
}
