'use client'
import { useState } from 'react'

// Número de WhatsApp Business (formato internacional, sin +). Vacío = no se muestra el botón.
// Se configura con la variable NEXT_PUBLIC_WHATSAPP en Vercel cuando haya número argentino.
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || ''

export default function Operadores() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const [form, setForm] = useState({planta:'',material:'',capacidad:'',contacto:''})
  const es = lang === 'es'
  const bg = dark?'#0a0e1a':'#f7f5f1'
  const text = dark?'#f1f5f9':'#0d0d0d'
  const sub = dark?'#64748b':'#6b7280'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.07)'
  const accent = '#22c55e'
  const blue = '#3b82f6'

  const mensaje = (es?'Hola OLIVIA, quiero coordinar una visita.':'Hi OLIVIA, I would like to schedule a visit.')
    + '\n' + (es?'Planta: ':'Plant: ') + form.planta
    + '\n' + (es?'Material: ':'Material: ') + form.material
    + '\n' + (es?'Capacidad: ':'Capacity: ') + form.capacidad
    + '\n' + (es?'Contacto: ':'Contact: ') + form.contacto
  const waLink = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje)
  const mailLink = 'mailto:hola@oliviacirculab.com.ar?subject=' + encodeURIComponent(es?'Visita a planta · OLIVIA':'Plant visit · OLIVIA') + '&body=' + encodeURIComponent(mensaje)

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
      <section style={{padding:'56px 24px',textAlign:'center',borderBottom:'1px solid '+border,background:dark?'rgba(59,130,246,0.05)':'rgba(59,130,246,0.03)'}}>
        <div style={{maxWidth:680,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:blue,marginBottom:12}}>[ {es?'Plantas · Cooperativas · Acopiadores':'Plants · Cooperatives · Collectors'} ]</div>
          <h1 style={{fontSize:34,fontWeight:900,lineHeight:1.15,marginBottom:16}}>
            {es?'Tu planta ya hace el trabajo.':'Your plant already does the work.'}
            <br/><span style={{color:accent}}>{es?'Nosotros hacemos que se pueda demostrar.':'We make it provable.'}</span>
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:28}}>
            {es?'OLIVIA es la capa de medición y verificación para quienes ya procesan el material: balanza conectada, registro digital de cada entrada y firma del acopiador. Vos seguís operando como siempre; el dato queda.':'OLIVIA is the measurement and verification layer for those who already process the material: connected scale, digital record of every delivery and collector sign-off. You keep operating as always; the data stays.'}
          </p>
          <a href="#contacto" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'14px 32px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
            {es?'Coordinemos una visita →':'Let\'s schedule a visit →'}
          </a>
        </div>
      </section>

      {/* QUÉ GANA LA PLANTA */}
      <section style={{padding:'56px 24px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <h2 style={{fontSize:24,fontWeight:900,textAlign:'center',marginBottom:24}}>{es?'Qué gana la planta':'What the plant gains'}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:12}}>
            {[
              {icon:'⚖️',t:es?'Balanza conectada':'Connected scale',d:es?'Sin costo durante el piloto.':'At no cost during the pilot.',c:accent},
              {icon:'📝',t:es?'Remito digital':'Digital receipt',d:es?'Cada entrada queda registrada con origen, peso y firma.':'Every delivery recorded with origin, weight and sign-off.',c:blue},
              {icon:'🚛',t:es?'Más volumen':'More volume',d:es?'Generadores que buscan cumplir la ley, para llenar tu capacidad ociosa.':'Generators seeking compliance, to fill your idle capacity.',c:'#f59e0b'},
              {icon:'🌱',t:es?'Valor del carbono':'Carbon value',d:es?'Si el proyecto se certifica, la planta participa en ese valor.':'If the project is certified, the plant shares in that value.',c:'#a855f7'},
            ].map(b=>(
              <div key={b.t} style={{background:card,border:'1px solid '+b.c+'33',borderRadius:14,padding:'18px'}}>
                <div style={{fontSize:26,marginBottom:8}}>{b.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:b.c,marginBottom:6}}>{b.t}</div>
                <div style={{fontSize:12,color:sub,lineHeight:1.6}}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{padding:'0 24px 56px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <h2 style={{fontSize:24,fontWeight:900,textAlign:'center',marginBottom:24}}>{es?'Cómo funciona':'How it works'}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:10}}>
            {[
              {n:'01',t:es?'El generador entrega':'The generator delivers',d:es?'Gran generador, consorcio o punto verde.':'Large generator, building or green point.'},
              {n:'02',t:es?'La balanza pesa y registra':'The scale weighs and records',d:es?'Peso automático, sin planillas.':'Automatic weight, no spreadsheets.'},
              {n:'03',t:es?'El acopiador firma':'The collector signs',d:es?'Remito digital firmado.':'Signed digital receipt.'},
              {n:'04',t:es?'La planta confirma':'The plant confirms',d:es?'Compost, biogás o recuperación de material.':'Compost, biogas or material recovery.'},
            ].map(p=>(
              <div key={p.n} style={{background:card,border:'1px solid '+border,borderRadius:12,padding:'16px',textAlign:'center'}}>
                <div style={{fontSize:11,fontFamily:'monospace',color:accent,marginBottom:6}}>{p.n}</div>
                <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{p.t}</div>
                <div style={{fontSize:11,color:sub,lineHeight:1.5}}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ NO CAMBIA + DOS FORMAS */}
      <section style={{padding:'56px 24px',background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.03)',borderTop:'1px solid '+border,borderBottom:'1px solid '+border}}>
        <div style={{maxWidth:800,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16}}>
          <div style={{background:card,border:'1px solid '+border,borderRadius:14,padding:'20px'}}>
            <div style={{fontSize:14,fontWeight:800,color:accent,marginBottom:8}}>{es?'Qué no cambia':'What does not change'}</div>
            <p style={{fontSize:12,color:sub,lineHeight:1.7,margin:0}}>{es?'La planta sigue siendo dueña de su operación y de su habilitación. OLIVIA no compite ni compra plantas.':'The plant remains owner of its operation and its license. OLIVIA does not compete with or buy plants.'}</p>
          </div>
          <div style={{background:card,border:'1px solid '+border,borderRadius:14,padding:'20px'}}>
            <div style={{fontSize:14,fontWeight:800,color:blue,marginBottom:8}}>{es?'Dos formas de trabajar juntos':'Two ways to work together'}</div>
            <p style={{fontSize:12,color:sub,lineHeight:1.7,margin:'0 0 6px'}}><strong style={{color:text}}>A.</strong> {es?'Acuerdo con un acopiador habilitado, que firma los remitos.':'Agreement with a licensed collector, who signs the receipts.'}</p>
            <p style={{fontSize:12,color:sub,lineHeight:1.7,margin:0}}><strong style={{color:text}}>B.</strong> {es?'Si hace falta, OLIVIA tramita su propia inscripción como acopiador.':'If needed, OLIVIA applies for its own collector registration.'}</p>
          </div>
        </div>
      </section>

      {/* ORGÁNICOS Y RAEE */}
      <section style={{padding:'56px 24px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <h2 style={{fontSize:24,fontWeight:900,textAlign:'center',marginBottom:24}}>{es?'Qué se mide':'What is measured'}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12}}>
            <div style={{background:card,border:'1px solid rgba(34,197,94,0.3)',borderRadius:14,padding:'20px'}}>
              <div style={{fontSize:26,marginBottom:6}}>🌿</div>
              <div style={{fontSize:14,fontWeight:800,color:accent,marginBottom:6}}>{es?'Orgánicos':'Organics'}</div>
              <div style={{fontSize:12,color:sub,lineHeight:1.6}}>{es?'Peso de cada entrega y tratamiento (compost o biogás). Metodología de referencia: Verra AMS-III.F.':'Weight of every delivery and treatment (compost or biogas). Reference methodology: Verra AMS-III.F.'}</div>
            </div>
            <div style={{background:card,border:'1px solid rgba(147,51,234,0.3)',borderRadius:14,padding:'20px'}}>
              <div style={{fontSize:26,marginBottom:6}}>💻</div>
              <div style={{fontSize:14,fontWeight:800,color:'#9333ea',marginBottom:6}}>RAEE</div>
              <div style={{fontSize:12,color:sub,lineHeight:1.6,marginBottom:8}}>{es?'Peso por material y destino final. Metodología de referencia: AMS-III.BA + VMR0008.':'Weight per material and final destination. Reference methodology: AMS-III.BA + VMR0008.'}</div>
              <a href="/raee" style={{fontSize:12,color:'#9333ea',fontWeight:700,textDecoration:'none'}}>{es?'Ver RAEE →':'See e-waste →'}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ALIADOS */}
      <section style={{padding:'0 24px 56px'}}>
        <div style={{maxWidth:800,margin:'0 auto',textAlign:'center',background:card,border:'1px dashed '+border,borderRadius:14,padding:'24px'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:sub,marginBottom:8}}>[ {es?'Aliados':'Partners'} ]</div>
          <div style={{fontSize:15,fontWeight:700}}>{es?'Primeras plantas aliadas: en conversaciones':'First partner plants: in conversations'}</div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" style={{padding:'56px 24px',borderTop:'1px solid '+border}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:8}}>{es?'Coordinemos una visita':'Let\'s schedule a visit'}</h2>
          <p style={{fontSize:13,color:sub,textAlign:'center',marginBottom:24}}>{es?'Contanos un poco de tu planta y te escribimos.':'Tell us a bit about your plant and we will reach out.'}</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              {k:'planta',ph:es?'Nombre de la planta o cooperativa':'Plant or cooperative name'},
              {k:'material',ph:es?'Tipo de material (orgánicos, RAEE, otro)':'Material type (organics, e-waste, other)'},
              {k:'capacidad',ph:es?'Capacidad aproximada (t/mes)':'Approximate capacity (t/month)'},
              {k:'contacto',ph:es?'Tu nombre y teléfono o email':'Your name and phone or email'},
            ].map(f=>(
              <input key={f.k} value={form[f.k as keyof typeof form]} onChange={e=>setForm({...form,[f.k]:e.target.value})} placeholder={f.ph}
                style={{width:'100%',padding:'12px 14px',borderRadius:10,background:card,border:'1px solid '+border,color:text,fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
            ))}
            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:6}}>
              {WHATSAPP&&<a href={waLink} target="_blank" rel="noopener noreferrer" style={{flex:1,minWidth:180,textAlign:'center',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:12,padding:'13px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
                {es?'Enviar por WhatsApp':'Send via WhatsApp'}
              </a>}
              <a href={mailLink} style={{flex:1,minWidth:180,textAlign:'center',background:WHATSAPP?'transparent':'linear-gradient(135deg,#22c55e,#16a34a)',border:WHATSAPP?'1px solid '+border:'none',borderRadius:12,padding:'13px',color:WHATSAPP?text:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
                {es?'Enviar por email':'Send via email'}
              </a>
            </div>
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
