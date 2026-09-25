'use client'
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
    {icon:'🍽️',t:es?'Restaurantes y gastronómicos':'Restaurants and gastronomy',s:es?'Locales con más de 1.000 kg de residuos por mes':'Venues generating 1,000+ kg/month',u:es?'CRÍTICA':'CRITICAL',m:es?'Riesgo de multa y clausura':'Risk of fines and closure',c:'#ef4444'},
    {icon:'🏥',t:es?'Clínicas y sanatorios privados':'Private clinics and hospitals',s:es?'Obligados a separar residuos comunes además de patogénicos':'Must separate common waste plus pathogenic',u:es?'MUY ALTA':'VERY HIGH',m:es?'Suspensión de habilitación':'License suspension',c:'#f59e0b'},
    {icon:'🏬',t:es?'Shoppings y galerías comerciales':'Malls and commercial centers',s:es?'Centros comerciales a cielo abierto incluidos':'Open-air commercial centers included',u:es?'ALTA':'HIGH',m:es?'Multa + clausura parcial':'Fine + partial closure',c:'#a855f7'},
    {icon:'🏦',t:es?'Bancos y entidades financieras':'Banks and financial institutions',s:es?'Aseguradoras y financieras incluidas':'Insurance companies included',u:es?'MEDIA':'MEDIUM',m:es?'Multa administrativa':'Administrative fine',c:'#06b6d4'},
    {icon:'🏢',t:es?'Grandes edificios':'Large buildings',s:es?'Según la reglamentación vigente · y edificios públicos del GCBA':'Per current regulations · and GCBA public buildings',u:es?'MEDIA':'MEDIUM',m:es?'Multa al consorcio':'Fine to condominium',c:'#22c55e'},
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
              ? 'La Ley de Basura Cero obliga a los grandes generadores a separar sus residuos. OLIVIA te da los datos verificados con IA para cumplir y un registro digital verificable para respaldar tu cumplimiento.'
              : 'The Zero Waste Law requires large generators to separate their waste. OLIVIA gives you AI-verified data to comply and a verifiable digital record to back your compliance.'}
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
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:8}}>{es?'Quiénes son grandes generadores según la Ley 1854':'Who counts as a large generator under Law 1854'}</h2>
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
              {t:es?'No hacer nada':'Do nothing',c:es?'Multa + clausura':'Fine + closure',d:es?'❌ Sin datos verificables':'❌ No verifiable data',cert:es?'❌ Sin respaldo':'❌ No backing',carb:es?'❌ Sin trazabilidad':'❌ No traceability',color:danger,rec:false},
              {t:es?'Empresa de transporte':'Transport company',c:es?'Abono mensual del transportista':'Monthly hauler fee',d:es?'⚠️ Datos básicos':'⚠️ Basic data',cert:es?'⚠️ Solo remito':'⚠️ Receipt only',carb:es?'❌ Sin trazabilidad':'❌ No traceability',color:warning,rec:false},
              {t:'OLIVIA Circulab',c:es?'Precio según diagnóstico':'Priced after assessment',d:es?'✅ Balanza + IA + GPS':'✅ Scale + AI + GPS',cert:es?'✅ Registro digital verificable':'✅ Verifiable digital record',carb:es?'✅ Trazabilidad hasta la planta':'✅ Traceability to the plant',color:accent,rec:true},
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

      {/* CIRCUITO COMPLETO + CONSULTORÍA */}
      <section style={{padding:'0 24px 56px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12,textAlign:'center'}}>[ {es?'El circuito completo':'The full circuit'} ]</div>
          <h2 style={{fontSize:24,fontWeight:900,textAlign:'center',marginBottom:24}}>{es?'Del tacho a la planta, con cada kilo registrado':'From the bin to the plant, with every kilo recorded'}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:24}}>
            {[
              {n:'01',t:es?'Entregás':'You deliver',d:es?'Tu fracción húmeda sale separada':'Your wet fraction leaves separated'},
              {n:'02',t:es?'La balanza pesa':'The scale weighs',d:es?'Peso registrado al ingresar':'Weight recorded on arrival'},
              {n:'03',t:es?'El acopiador firma':'The collector signs',d:es?'Remito digital firmado':'Signed digital receipt'},
              {n:'04',t:es?'La planta confirma':'The plant confirms',d:es?'Tratamiento confirmado':'Treatment confirmed'},
            ].map(p=>(
              <div key={p.n} style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px',textAlign:'center'}}>
                <div style={{fontSize:10,fontFamily:'monospace',color:accent,marginBottom:6}}>{p.n}</div>
                <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>{p.t}</div>
                <div style={{fontSize:10,color:sub,lineHeight:1.5}}>{p.d}</div>
              </div>
            ))}
          </div>
          <div style={{background:dark?'rgba(34,197,94,0.05)':'rgba(34,197,94,0.03)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'20px'}}>
            <div style={{fontSize:13,fontWeight:700,color:accent,marginBottom:10}}>{es?'Consultoría para bajar el costo de la fracción húmeda':'Consulting to cut the cost of your wet fraction'}</div>
            <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:14}}>
              {(es?['Diagnóstico de descartes','Separación en origen','Ahorro en el transportista','Orden del cumplimiento']:['Discard assessment','Source separation','Hauler cost savings','Compliance organization']).map(t=>(
                <div key={t} style={{fontSize:12,color:sub,paddingLeft:10,borderLeft:'2px solid rgba(34,197,94,0.3)'}}>{t}</div>
              ))}
            </div>
            <a href="/operadores" style={{fontSize:12,color:accent,fontWeight:700,textDecoration:'none'}}>{es?'Ver cómo trabajamos con plantas y acopiadores →':'See how we work with plants and collectors →'}</a>
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
              {icon:'📊',t:es?'Reporte ESG':'ESG report',d:es?'Kilos verificados listos para tu reporte de sostenibilidad':'Verified kilos ready for your sustainability report',c:'#f59e0b'},
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
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:8}}>{es?'Cumplí la ley. Medí el impacto. Bajá costos.':'Comply. Measure impact. Cut costs.'}</h2>
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