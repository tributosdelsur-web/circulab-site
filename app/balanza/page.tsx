'use client'
import { useState, type CSSProperties } from 'react'

// Número de WhatsApp Business (formato internacional, sin +). Vacío = no se muestra el botón.
// Se configura con la variable NEXT_PUBLIC_WHATSAPP en Vercel cuando haya número argentino.
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || ''

export default function Balanza() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const es = lang === 'es'
  const bg = dark?'#0a0e1a':'#f7f5f1'
  const text = dark?'#f1f5f9':'#0d0d0d'
  const sub = dark?'#64748b':'#6b7280'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.07)'
  const accent = '#22c55e'

  const mensaje = es?'Hola OLIVIA, quiero saber más sobre la balanza conectada y el diagnóstico.':'Hi OLIVIA, I would like to know more about the connected scale and the diagnosis.'
  const waLink = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje)
  const mailLink = 'mailto:hola@oliviacirculab.com.ar?subject=' + encodeURIComponent(es?'Balanza conectada · OLIVIA':'Connected scale · OLIVIA') + '&body=' + encodeURIComponent(mensaje)

  const sec: CSSProperties = {padding:'48px 24px',borderTop:'1px solid '+border}
  const secAlt: CSSProperties = {...sec,background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.03)'}
  const wrap: CSSProperties = {maxWidth:800,margin:'0 auto'}
  const h2: CSSProperties = {fontSize:24,fontWeight:900,margin:'0 0 14px'}
  const pp: CSSProperties = {fontSize:14,color:sub,lineHeight:1.7,margin:0}
  const box: CSSProperties = {background:card,border:'1px solid '+border,borderRadius:12,padding:'16px'}
  const num: CSSProperties = {fontSize:11,fontFamily:'monospace',color:accent,marginBottom:6}
  const bt: CSSProperties = {fontSize:13,fontWeight:700,marginBottom:4}
  const bd: CSSProperties = {fontSize:12,color:sub,lineHeight:1.6}
  const grid2: CSSProperties = {display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}
  const grid3: CSSProperties = {display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10,marginTop:16}
  const grid5: CSSProperties = {display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:10}
  const btnPrimary: CSSProperties = {background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',borderRadius:12,padding:'13px 20px',fontSize:13,fontWeight:700,textDecoration:'none'}
  const btnGhost: CSSProperties = {border:'1px solid '+border,color:text,borderRadius:12,padding:'13px 20px',fontSize:13,fontWeight:700,textDecoration:'none'}

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
      <header style={{padding:'56px 24px 40px',maxWidth:720,margin:'0 auto',textAlign:'center'}}>
        <div style={{fontSize:11,color:accent,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:12}}>{es?'Balanza conectada · cómo se usa':'Connected scale · how it is used'}</div>
        <h1 style={{fontSize:32,fontWeight:900,lineHeight:1.15,margin:'0 0 16px'}}>{es?'Un peso que no se puede editar después.':'A weight that cannot be edited afterwards.'}</h1>
        <p style={{fontSize:15,color:sub,lineHeight:1.7,margin:0}}>{es?'Cualquiera puede pesar algo y anotarlo en una planilla. Lo que necesita un auditor de carbono es saber que ese número no cambió entre la balanza y el registro. La balanza de OLIVIA firma cada lectura en el propio equipo y la manda sola, por Bluetooth, al celular del operario.':'Anyone can weigh something and write it in a spreadsheet. What a carbon auditor needs is proof that the number did not change between the scale and the record. The OLIVIA scale signs every reading on the device itself and sends it on its own, over Bluetooth, to the operator’s phone.'}</p>
      </header>

      {/* PRINCIPIO */}
      <section style={sec}>
        <div style={wrap}>
          <h2 style={h2}>{es?'El peso que cuenta se toma en un solo lugar':'The weight that counts is taken in one place'}</h2>
          <p style={pp}>{es?'Se pesa cuando el material entra a la planta o al acopio. Lo que pasa antes, la foto en la casa o el QR del tacho, dice de dónde vino el material; no es la medición. La foto no reemplaza a la balanza: donde hay balanza es opcional, y donde todavía no hay, la foto da una estimación que queda marcada como tal.':'Weighing happens when material enters the plant or collection point. What happens before, the photo at home or the bin QR, says where the material came from; it is not the measurement. A photo never replaces the scale: where there is a scale it is optional, and where there is none yet, the photo gives an estimate that is flagged as such.'}</p>
          <div style={grid3}>
            {[
              {n:'1',t:es?'Peso en destino':'Weight at destination',d:es?'Balanza firmada en planta o acopio. Es el dato que se certifica.':'Signed scale at plant or collection point. This is the certified figure.'},
              {n:'2',t:es?'Peso en origen':'Weight at source',d:es?'Balanza portátil en el generador. Diagnóstico y control cruzado.':'Portable scale at the generator. Diagnosis and cross-check.'},
              {n:'3',t:es?'Estimación':'Estimate',d:es?'Foto con moneda de referencia. Solo trazabilidad del origen.':'Photo with a reference coin. Origin traceability only.'},
            ].map(x=>(
              <div key={x.n} style={box}><div style={{...num}}>{es?'Nivel':'Level'} {x.n}</div><div style={bt}>{x.t}</div><div style={bd}>{x.d}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* FLUJO */}
      <section style={sec}>
        <div style={wrap}>
          <h2 style={h2}>{es?'Cinco segundos por tacho':'Five seconds per bin'}</h2>
          <div style={grid5}>
            {[
              {n:'01',t:es?'Escanear':'Scan',d:es?'El QR del tacho, con el celular.':'The bin QR, with the phone.'},
              {n:'02',t:es?'Apoyar':'Place',d:es?'El tacho en la plataforma.':'The bin on the platform.'},
              {n:'03',t:es?'Registrar':'Record',d:es?'La balanza firma y envía; la app resta la tara.':'The scale signs and sends; the app subtracts the tare.'},
              {n:'04',t:es?'Vaciar':'Empty',d:es?'El contenido va a tratamiento.':'Contents go to treatment.'},
              {n:'05',t:es?'Repesar':'Re-weigh',d:es?'El tacho vacío, para mantener la tara al día.':'The empty bin, to keep the tare current.'},
            ].map(p=>(
              <div key={p.n} style={{...box,textAlign:'center'}}><div style={num}>{p.n}</div><div style={bt}>{p.t}</div><div style={bd}>{p.d}</div></div>
            ))}
          </div>
          <p style={{...pp,marginTop:14}}>{es?'El operario no escribe ni calcula nada. Si en el galpón no hay señal, la app guarda el dato y lo sube después: como viene firmado, la demora no le quita validez. Repesar el tacho vacío importa: 300 g de error por tacho, repetidos mil veces, son 300 kg de diferencia en el año, siempre sobreestimando.':'The operator types and calculates nothing. With no signal in the yard, the app stores the reading and uploads it later: since it is signed, the delay does not affect its validity. Re-weighing the empty bin matters: a 300 g error per bin, repeated a thousand times, is 300 kg off in a year, always overestimating.'}</p>
        </div>
      </section>

      {/* SEGÚN EL CLIENTE */}
      <section style={secAlt}>
        <div style={wrap}>
          <h2 style={h2}>{es?'Dónde se pesa, según quién genera':'Where weighing happens, by generator'}</h2>
          <div style={{display:'grid',gap:8}}>
            {[
              {t:es?'Vecino':'Household',d:es?'No hay balanza en la casa. Separa en el tacho del kit con QR; se pesa al llegar al punto de control y los kilos se le asignan por el QR.':'No scale at home. Sorts into the kit bin with a QR; it is weighed at the control point and the kilos are credited through the QR.'},
              {t:es?'Consorcio':'Building',d:es?'Tachos comunes con el QR del edificio. Se pesan en la planta.':'Shared bins with the building QR. Weighed at the plant.'},
              {t:es?'Gran generador':'Large generator',d:es?'Contenedores con ruedas en una balanza de piso para cargas grandes. Antes, un diagnóstico con balanza portátil.':'Wheeled containers on a floor scale for large loads. Before that, a diagnosis with a portable scale.'},
              {t:es?'Transportista':'Hauler',d:es?'Carga a granel: el peso sale del ticket de la báscula de la planta, que OLIVIA digitaliza y cruza con el remito.':'Bulk loads: the weight comes from the plant weighbridge ticket, which OLIVIA digitises and matches to the delivery note.'},
              {t:es?'Planta o cooperativa':'Plant or cooperative',d:es?'Balanza en la recepción. Si ya tienen una con salida de datos, la instrumentamos.':'Scale at reception. If they already have one with data output, we instrument it.'},
              {t:es?'Punto verde':'Green point',d:es?'Lugar de entrega. El peso se toma en la planta cuando se retira el material.':'Drop-off point. Weight is taken at the plant when the material is collected.'},
            ].map(c=>(
              <div key={c.t} style={{...box,display:'grid',gridTemplateColumns:'140px 1fr',gap:12,alignItems:'start'}}><div style={bt}>{c.t}</div><div style={bd}>{c.d}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* TAMAÑOS */}
      <section style={sec}>
        <div style={wrap}>
          <h2 style={h2}>{es?'Tres tamaños, la misma electrónica':'Three sizes, the same electronics'}</h2>
          <div style={grid3}>
            {[
              {t:es?'Tacho · hasta 50 kg':'Bin · up to 50 kg',d:es?'Plataforma de 40 × 40 cm, precisión de 20 g, batería recargable, caja IP54. Para tachos de 20 litros.':'40 × 40 cm platform, 20 g precision, rechargeable battery, IP54 case. For 20-litre bins.'},
              {t:es?'Contenedor · cargas grandes':'Container · large loads',d:es?'Balanza de piso con rampa para contenedores con ruedas. También es la portátil del diagnóstico.':'Floor scale with a ramp for wheeled containers. Also the portable unit for diagnosis.'},
              {t:es?'Camión · báscula existente':'Truck · existing weighbridge',d:es?'No se fabrica: se digitaliza el ticket de pesada de la planta.':'Nothing is built: the plant’s weighing ticket is digitised.'},
            ].map(x=>(
              <div key={x.t} style={box}><div style={bt}>{x.t}</div><div style={bd}>{x.d}</div></div>
            ))}
          </div>
          <p style={{...pp,marginTop:14}}>{es?'Primero preguntamos si la planta ya tiene balanza. Las cooperativas que venden material por kilo suelen tenerla: si existe, no fabricamos una nueva, instrumentamos la que ya está.':'First we ask whether the plant already has a scale. Cooperatives that sell by the kilo usually do: if so, we do not build a new one, we instrument the existing scale.'}</p>
        </div>
      </section>

      {/* AUDITOR */}
      <section style={secAlt}>
        <div style={wrap}>
          <h2 style={h2}>{es?'Lo que la vuelve defendible ante un auditor':'What makes it defensible to an auditor'}</h2>
          <div style={grid2}>
            {[
              {t:es?'Firma en el equipo':'Signed on the device',d:es?'Cada lectura se firma con una clave que no sale del chip.':'Each reading is signed with a key that never leaves the chip.'},
              {t:es?'Hora del equipo':'Device time',d:es?'Cambiar la hora del celular no altera el registro.':'Changing the phone clock does not alter the record.'},
              {t:es?'Número de serie único':'Unique serial number',d:es?'Cada registro se traza hasta la balanza que lo produjo.':'Every record traces back to its scale.'},
              {t:es?'Calibración documentada':'Documented calibration',d:es?'Pesas patrón y registro de cada calibración desde el primer día.':'Reference weights and a log of every calibration from day one.'},
              {t:es?'Detección de manipulación':'Tamper detection',d:es?'Quedan registradas las aperturas de la caja y los reinicios.':'Case openings and restarts are logged.'},
              {t:es?'Dos modos, nunca mezclados':'Two modes, never mixed',d:es?'Tacho identificado o entrega abierta: cada registro queda marcado con su modo.':'Identified bin or open delivery: each record is tagged with its mode.'},
            ].map(x=>(
              <div key={x.t} style={box}><div style={bt}>{x.t}</div><div style={bd}>{x.d}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNÓSTICO */}
      <section style={sec}>
        <div style={wrap}>
          <h2 style={h2}>{es?'Diagnóstico con balanza portátil':'Diagnosis with a portable scale'}</h2>
          <p style={pp}>{es?'Para grandes generadores: vamos una semana con una balanza portátil y pesamos cada bolsa o contenedor, separado por fracción. Recibís cuántos kilos generás por día, cuánto se podría desviar y adónde va hoy, con una línea base medida con equipo firmado.':'For large generators: we spend a week on site with a portable scale and weigh every bag or container by fraction. You get kilos generated per day, how much could be diverted and where it goes today, with a baseline measured on signed equipment.'}</p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:18}}>
            {WHATSAPP&&<a href={waLink} target="_blank" rel="noopener noreferrer" style={btnPrimary}>WhatsApp</a>}
            <a href={mailLink} style={WHATSAPP?btnGhost:btnPrimary}>{es?'Pedir diagnóstico o visita':'Request a diagnosis or visit'}</a>
            <a href="/operadores" style={btnGhost}>{es?'Plantas y acopiadores →':'Plants and collectors →'}</a>
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
            {l:es?'Plantas y acopiadores':'Plants & collectors',h:'/operadores'},
            {l:es?'Balanza':'Scale',h:'/balanza'},
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
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',letterSpacing:'0.05em',opacity:0.7}}>© 2026 Circulab Tech · Buenos Aires, Argentina</div>
      </footer>
    </div>
  )
}
