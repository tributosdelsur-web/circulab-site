'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { metricasPublicas } from '../../lib/publico'

export default function OnePager() {
const [lang, setLang] = useState<'es'|'en'>('es')
const [dark, setDark] = useState(true)
const [showGate, setShowGate] = useState(false)
const [gateNombre, setGateNombre] = useState('')
const [gateEmail, setGateEmail] = useState('')
const [gateOk, setGateOk] = useState(false)
const [kg, setKg] = useState(0)
const es = lang==='es'

useEffect(()=>{
  metricasPublicas().then(m=>setKg(m.kg))
},[])

const bg = dark?'#0a0e1a':'#f0f4f8'
const text = dark?'#f1f5f9':'#0a0e1a'
const card = dark?'#111827':'#ffffff'
const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
const sub = dark?'#94a3b8':'#475569'

const T = {
  es: {
    badge:'🌱 Piloto 2026 · Buenos Aires',
    tagline:'Infraestructura de medición y verificación (dMRV) para plantas y acopiadores de residuos.',
    problema_titulo:'El problema',
    solucion_titulo:'La solución',
    traccion_titulo:'Tracción real',
    metodo_titulo:'Metodologías de referencia',
    modelo_titulo:'Modelo de ingresos',
    fases_titulo:'Hoja de ruta',
    ronda_titulo:'El pedido',
    equipo_titulo:'El equipo',
    cta:'hola@oliviacirculab.com.ar · oliviacirculab.com.ar',
    descargar:'Descargar PDF →',
    ver_pitch:'Ver pitch deck →',
    ver_wp:'Ver whitepaper →',
  },
  en: {
    badge:'🌱 Pilot 2026 · Buenos Aires',
    tagline:'Measurement and verification infrastructure (dMRV) for waste plants and collectors.',
    problema_titulo:'The Problem',
    solucion_titulo:'The Solution',
    traccion_titulo:'Real Traction',
    metodo_titulo:'Reference Methodologies',
    modelo_titulo:'Revenue Model',
    fases_titulo:'Roadmap',
    ronda_titulo:'The Ask',
    equipo_titulo:'The Team',
    cta:'hola@oliviacirculab.com.ar · oliviacirculab.com.ar',
    descargar:'Download PDF →',
    ver_pitch:'View pitch deck →',
    ver_wp:'View whitepaper →',
  }
}

const t = T[lang]

async function imprimir() {
  // gate moved to render
  window.print()
}

async function confirmarGate() {
  if(!gateEmail) return
  await supabase.from('onepager_descargas').insert({nombre:gateNombre,email:gateEmail})
  setGateOk(true)
  setShowGate(false)
  setTimeout(()=>window.print(),500)
}

return (
 <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.2s'}}>

   {showGate&&(
     <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:24,backdropFilter:'blur(8px)'}}>
       <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:32,maxWidth:400,width:'100%',position:'relative'}}>
         <button onClick={()=>setShowGate(false)} style={{position:'absolute',top:12,right:16,background:'transparent',border:'none',color:'#64748b',fontSize:22,cursor:'pointer'}}>×</button>
         <div style={{fontSize:24,marginBottom:12,textAlign:'center'}}>📋</div>
         <div style={{fontSize:16,fontWeight:900,color:'#f1f5f9',marginBottom:4,textAlign:'center'}}>{lang==='es'?'Descargar One Pager':'Download One Pager'}</div>
         <div style={{fontSize:12,color:'#64748b',marginBottom:20,textAlign:'center'}}>{lang==='es'?'Dejá tus datos para acceder':'Leave your details to access'}</div>
         <input value={gateNombre} onChange={e=>setGateNombre(e.target.value)} placeholder={lang==='es'?'Tu nombre completo':'Your full name'} style={{width:'100%',padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
         <input value={gateEmail} onChange={e=>setGateEmail(e.target.value)} placeholder={lang==='es'?'Tu email':'Your email'} type="email" style={{width:'100%',padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:16}} />
         <button onClick={confirmarGate} disabled={!gateEmail} style={{width:'100%',padding:'13px',borderRadius:12,border:'none',background:gateEmail?'linear-gradient(135deg,#22c55e,#16a34a)':'rgba(255,255,255,0.06)',color:gateEmail?'white':'#64748b',fontSize:14,fontWeight:700,cursor:gateEmail?'pointer':'not-allowed'}}>
           {lang==='es'?'Descargar PDF →':'Download PDF →'}
         </button>
         <div style={{fontSize:10,color:'#64748b',textAlign:'center',marginTop:10}}>{lang==='es'?'Documento confidencial':'Confidential document'}</div>
       </div>
     </div>
   )}

   <div style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}} className="no-print">
      <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
        <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,borderRadius:8,objectFit:'contain',flexShrink:0}} />
        <div>
          <div style={{fontSize:13,fontWeight:800,color:text}}>OLIVIA Circulab</div>
          <div style={{fontSize:9,color:'#22c55e'}}>One Pager · {lang==='es'?'Septiembre':'September'} 2026</div>
        </div>
      </a>
      <div style={{display:'flex',gap:6,alignItems:'center'}}>
        <button onClick={()=>setLang(lang==='es'?'en':'es')}
          style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>
          {lang==='es'?'EN':'ES'}
        </button>
        <button onClick={()=>setDark(!dark)}
          style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
          {dark?'☀️':'🌙'}
        </button>
        <button onClick={imprimir}
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:6,padding:'6px 12px',color:'white',fontSize:11,fontWeight:700,cursor:'pointer'}}>
          {t.descargar}
        </button>
      </div>
    </div>

    <div style={{maxWidth:680,margin:'0 auto',padding:'24px 20px 60px'}}>

      <div style={{textAlign:'center',padding:'32px 0 24px',borderBottom:`1px solid ${border}`,marginBottom:24}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'5px 14px',fontSize:10,color:'#22c55e',fontWeight:700,marginBottom:16}}>
          {t.badge}
        </div>
        <div style={{fontSize:14,fontWeight:700,color:'#22c55e',marginBottom:8,fontStyle:'italic'}}>
          {es?'"En la naturaleza no existe la basura. Existe materia que vuelve al ciclo. Nosotros la medimos."':'"In nature there is no waste. There is matter that returns to the cycle. We measure it."'}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:12}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:52,height:52,borderRadius:14,objectFit:'contain',flexShrink:0}} />
          <div style={{textAlign:'left'}}>
            <div style={{fontSize:24,fontWeight:900,color:text}}>OLIVIA Circulab</div>
            <div style={{fontSize:11,color:'#22c55e'}}>Circulab Tech · Buenos Aires, Argentina</div>
          </div>
        </div>
        <div style={{fontSize:15,color:sub,lineHeight:1.6,maxWidth:500,margin:'0 auto'}}>{t.tagline}</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
        <div style={{background:card,border:'1px solid rgba(239,68,68,0.2)',borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#ef4444',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.problema_titulo}</div>
          {(es?[
            'Las plantas y cooperativas de Buenos Aires tienen capacidad ociosa',
            'Los orgánicos igual terminan en el relleno, donde generan metano',
            'Nadie puede demostrar, kilo a kilo, qué se desvió y qué se trató',
            'Sin ese dato no hay cumplimiento verificable ni certificación posible',
          ]:[
            'Buenos Aires plants and cooperatives have idle capacity',
            'Organics still end up in landfill, where they generate methane',
            'Nobody can prove, kilo by kilo, what was diverted and treated',
            'Without that data there is no verifiable compliance or certification',
          ]).map((i,idx)=>(
            <div key={idx} style={{display:'flex',gap:6,padding:'3px 0',fontSize:11,color:sub}}>
              <span style={{color:'#ef4444',flexShrink:0}}>→</span>{i}
            </div>
          ))}
        </div>

        <div style={{background:card,border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.solucion_titulo}</div>
          {(es?[
            'Balanza conectada en la planta',
            'Registro digital de cada entrega',
            'Firma del acopiador habilitado',
            'Confirmación del tratamiento por la planta',
            'Foto ciudadana como capa de origen',
          ]:[
            'Connected scale at the plant',
            'Digital record of every delivery',
            'Licensed collector sign-off',
            'Treatment confirmed by the plant',
            'Citizen photo as an origin layer',
          ]).map((i,idx)=>(
            <div key={idx} style={{display:'flex',gap:6,padding:'3px 0',fontSize:11,color:sub}}>
              <span style={{color:'#22c55e',flexShrink:0}}>✓</span>{i}
            </div>
          ))}
        </div>
      </div>

      <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#3b82f6',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.traccion_titulo}</div>
        <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:10}}>
          <div style={{fontSize:26,fontWeight:900,color:'#3b82f6'}}>{kg.toLocaleString(es?'es-AR':'en-US',{minimumFractionDigits:1,maximumFractionDigits:1})} kg</div>
          <div style={{fontSize:11,color:sub}}>{es?'verificados en el piloto · dato en vivo':'verified in the pilot · live data'}</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          {(es?[
            '✅ App web en producción · oliviacirculab.com.ar',
            '✅ Verificación con IA (Cloudflare Workers AI)',
            '✅ Panel dMRV y validación manual',
            '✅ Conversaciones con cooperativas y plantas',
            '✅ Construido sin inversión externa',
          ]:[
            '✅ Web app in production · oliviacirculab.com.ar',
            '✅ AI verification (Cloudflare Workers AI)',
            '✅ dMRV dashboard and manual validation',
            '✅ Conversations with cooperatives and plants',
            '✅ Built without external investment',
          ]).map((i,idx)=>(
            <div key={idx} style={{fontSize:11,color:sub}}>{i}</div>
          ))}
        </div>
      </div>

      <div style={{background:card,border:'1px solid rgba(34,197,94,0.15)',borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.metodo_titulo}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          {[
            {icon:'🌿',tipo:es?'Orgánicos':'Organics',cert:'Verra AMS-III.F',d:es?'Peso y tratamiento (compost o biogás)':'Weight and treatment (compost or biogas)',c:'#22c55e'},
            {icon:'💻',tipo:'RAEE',cert:'AMS-III.BA + VMR0008',d:es?'Peso por material y destino final':'Weight per material and final destination',c:'#9333ea'},
          ].map(r=>(
            <div key={r.tipo} style={{display:'flex',gap:8,alignItems:'flex-start',padding:'6px 8px',borderRadius:6,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)'}}>
              <span style={{fontSize:16}}>{r.icon}</span>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:r.c}}>{r.tipo} · {r.cert}</div>
                <div style={{fontSize:9,color:sub}}>{r.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
        <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#a855f7',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.modelo_titulo}</div>
          <div style={{fontSize:9,color:sub,marginBottom:8}}>{es?'En orden de cercanía':'In order of proximity'}</div>
          {(es?[
            {n:'1',t:'Consultoría y software para grandes generadores',d:'Bajar el costo de la fracción húmeda y ordenar el cumplimiento'},
            {n:'2',t:'Servicio de datos para plantas',d:'Balanza, remito digital y trazabilidad de cada entrada'},
            {n:'3',t:'Créditos de carbono',d:'Solo después de la certificación'},
          ]:[
            {n:'1',t:'Consulting and software for large generators',d:'Lower wet-fraction costs and organize compliance'},
            {n:'2',t:'Data service for plants',d:'Scale, digital receipt and traceability of every delivery'},
            {n:'3',t:'Carbon credits',d:'Only after certification'},
          ]).map(m=>(
            <div key={m.n} style={{padding:'4px 0',borderBottom:`1px solid ${border}`}}>
              <div style={{fontSize:10,fontWeight:700,color:text}}>{m.n}. {m.t}</div>
              <div style={{fontSize:9,color:sub}}>{m.d}</div>
            </div>
          ))}
        </div>

        <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.fases_titulo}</div>
          {(es?[
            {fase:'🌱 SEMILLA · hoy',desc:'Piloto dMRV · software en producción · primeros kilos verificados',c:'#22c55e'},
            {fase:'🌿 BROTE',desc:'Planta aliada instalada · datos continuos de balanza · firma del acopiador',c:'#3b82f6'},
            {fase:'🌳 ÁRBOL',desc:'Certificación bajo estándar Verra · validación por auditor acreditado',c:'#f59e0b'},
          ]:[
            {fase:'🌱 SEED · today',desc:'dMRV pilot · software in production · first verified kilos',c:'#22c55e'},
            {fase:'🌿 SPROUT',desc:'Partner plant installed · continuous scale data · collector sign-off',c:'#3b82f6'},
            {fase:'🌳 TREE',desc:'Certification under the Verra standard · accredited auditor validation',c:'#f59e0b'},
          ]).map(f=>(
            <div key={f.fase} style={{borderLeft:`3px solid ${f.c}`,paddingLeft:8,marginBottom:8}}>
              <div style={{fontSize:10,fontWeight:700,color:f.c}}>{f.fase}</div>
              <div style={{fontSize:9,color:sub}}>{f.desc}</div>
            </div>
          ))}
          <div style={{fontSize:9,color:sub,fontStyle:'italic'}}>{es?'Hoy OLIVIA no emite créditos de carbono ni promete ingresos.':'Today OLIVIA issues no carbon credits and promises no income.'}</div>
        </div>
      </div>

      <div style={{background:'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(59,130,246,0.06))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#f59e0b',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.ronda_titulo}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:8,marginBottom:10}}>
          <div style={{fontSize:22,fontWeight:900,color:'#22c55e'}}>USD 200K</div>
          <div style={{fontSize:10,color:sub}}>{es?'3 tramos contra hitos · para un socio activo · instrumento y valuación a conversar':'3 milestone-based tranches · for an active partner · instrument and valuation to be discussed'}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:8}}>
          {(es?[
            {n:'1',m:'USD 50K',d:'Sociedad, acuerdo con acopiador, primeras balanzas, 4 meses de equipo',h:'Sociedad constituida, acopiador firmado, balanza transmitiendo datos continuos'},
            {n:'2',m:'USD 70K',d:'Desarrollador de carbono, línea de base, documento de diseño del proyecto, más nodos',h:'Documento de diseño presentado ante Verra'},
            {n:'3',m:'USD 80K',d:'Auditoría de tercera parte, registro, operación',h:'Proyecto registrado'},
          ]:[
            {n:'1',m:'USD 50K',d:'Company, collector agreement, first scales, 4 months of team',h:'Company incorporated, collector signed, scale transmitting continuous data'},
            {n:'2',m:'USD 70K',d:'Carbon developer, baseline, project design document, more nodes',h:'Project design document submitted to Verra'},
            {n:'3',m:'USD 80K',d:'Third-party audit, registration, operations',h:'Project registered'},
          ]).map(r=>(
            <div key={r.n} style={{display:'grid',gridTemplateColumns:'70px 1fr',gap:8,padding:'8px 10px',background:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)',borderRadius:8}}>
              <div>
                <div style={{fontSize:9,color:sub}}>{es?'Tramo':'Tranche'} {r.n}</div>
                <div style={{fontSize:13,fontWeight:900,color:'#22c55e'}}>{r.m}</div>
              </div>
              <div>
                <div style={{fontSize:10,color:text}}>{r.d}</div>
                <div style={{fontSize:9,color:sub,marginTop:2}}>{es?'Libera el siguiente: ':'Releases the next: '}{r.h}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{fontSize:9,color:sub,lineHeight:1.6,textAlign:'center'}}>
          {es
            ?'Instrumento y valuación a conversar · Montos por tramo a confirmar con cotizaciones de balanzas y del desarrollador de carbono · Reporting mensual · La sociedad se inscribirá en el régimen de Economía del Conocimiento'
            :'Instrument and valuation to be discussed · Tranche amounts to be confirmed with scale and carbon developer quotes · Monthly reporting · The company will register under the Knowledge Economy regime'}
        </div>
      </div>

      <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px',marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.equipo_titulo}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[
            {foto:'/founders/founder-jp.jpg',n:'Juan Pablo Sanguinetti de Zapata',rol:'CEO & Founder',d:es?'Abogado y director de teatro chileno. Product builder con IA. Medio ambiente, tributación y gestión de proyectos.':'Chilean lawyer and theater director. AI product builder. Environmental law, taxation and project management.',c:'#22c55e'},
            {foto:'/founders/founder-mileidy.jpg',n:'Mileidy Zapata de Sanguinetti',rol:'COO & Co-founder',d:es?'Bailarina y coreógrafa dominicana. Comunidad y economía del cuidado. 3 países, 1 misión.':'Dominican dancer and choreographer. Community and care economy. 3 countries, 1 mission.',c:'#3b82f6'},
          ].map(f=>(
            <div key={f.n} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
              <img src={f.foto} alt={f.n} style={{width:40,height:40,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:`2px solid ${f.c}`}} />
              <div>
                <div style={{fontSize:11,fontWeight:700,color:text}}>{f.n}</div>
                <div style={{fontSize:9,color:f.c,fontWeight:600}}>{f.rol}</div>
                <div style={{fontSize:9,color:sub,lineHeight:1.4,marginTop:2}}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:10,fontSize:10,color:'#22c55e',fontWeight:600,textAlign:'center'}}>
          🚀 {es?'Construido sin inversión externa · Buenos Aires':'Built without external investment · Buenos Aires'}
        </div>
      </div>

      <div style={{textAlign:'center',padding:'20px',background:'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(59,130,246,0.06))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14}}>
        <img src="/logoOC.png" alt="OLIVIA" style={{width:48,height:48,borderRadius:14,margin:'0 auto 12px',objectFit:'contain',flexShrink:0,display:'block'}} />
        <div style={{fontSize:16,fontWeight:900,color:text,marginBottom:4}}>OLIVIA Circulab</div>
        <div style={{fontSize:11,color:sub,marginBottom:16}}>{t.tagline}</div>
        <div style={{fontSize:13,fontWeight:700,color:'#22c55e',marginBottom:16}}>{t.cta}</div>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/pitch" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'10px 20px',borderRadius:10,fontSize:12,fontWeight:700,textDecoration:'none'}}>
            {t.ver_pitch}
          </a>
          <a href="/whitepaper" style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,color:text,padding:'10px 20px',borderRadius:10,fontSize:12,fontWeight:600,textDecoration:'none'}}>
            {t.ver_wp}
          </a>
        </div>
      </div>

    </div>

    <style>{`
      @media print {
        .no-print { display: none !important; }
        body { background: white !important; color: black !important; }
      }
    `}</style>

  </div>
)
}
