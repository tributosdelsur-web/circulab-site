'use client'
import { useState } from 'react'

export default function Consorcios() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#64748b' : '#6b7280'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const accent = '#22c55e'
  const blue = '#3b82f6'

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
      <section style={{padding:'56px 24px',textAlign:'center',background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.02)',borderBottom:'1px solid rgba(34,197,94,0.15)'}}>
        <div style={{maxWidth:680,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>
            [ {es?'Para administradores y encargados':'For building managers and administrators'} ]
          </div>
          <h1 style={{fontSize:34,fontWeight:900,lineHeight:1.15,marginBottom:16}}>
            {es?'Tu edificio puede ser uno de los primeros certificados de Buenos Aires.':'Your building can be one of the first certified in Buenos Aires.'}
            <br/><span style={{color:accent}}>{es?'Sin inversión. Sin complicaciones.':'No investment. No complications.'}</span>
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:28,maxWidth:520,margin:'0 auto 28px'}}>
            {es
              ? 'OLIVIA ayuda a tu edificio a cumplir la Ley de Basura Cero de CABA, certificar la gestión de residuos con inteligencia artificial y generar créditos de carbono verificados — todo desde el celular del encargado.'
              : 'OLIVIA helps your building comply with the CABA Zero Waste Law, certify waste management with artificial intelligence and generate verified carbon credits — all from the superintendent phone.'}
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="/nda" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'14px 32px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
              {es?'Quiero certificar mi edificio →':'I want to certify my building →'}
            </a>
            <a href="/simulador" style={{background:'transparent',border:'1px solid '+border,borderRadius:40,padding:'14px 32px',color:text,fontSize:13,fontWeight:700,textDecoration:'none'}}>
              {es?'Calcular el impacto de mi edificio':'Calculate my building impact'}
            </a>
          </div>
        </div>
      </section>

      {/* LOS 3 ARGUMENTOS PRINCIPALES */}
      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12,textAlign:'center'}}>
            [ {es?'Por qué OLIVIA para tu edificio':'Why OLIVIA for your building'} ]
          </div>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:40}}>
            {es?'Tres razones. Todas concretas.':'Three reasons. All concrete.'}
          </h2>

          {/* RAZÓN 1 · LEY BASURA CERO */}
          <div style={{background:card,border:'2px solid rgba(239,68,68,0.3)',borderRadius:20,padding:'32px',marginBottom:20,display:'flex',gap:24,alignItems:'flex-start'}}>
            <div style={{width:56,height:56,borderRadius:16,background:'rgba(239,68,68,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,flexShrink:0}}>⚖️</div>
            <div style={{flex:1}}>
              <div style={{fontSize:9,fontWeight:700,color:'#ef4444',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>
                {es?'01 · Cumplimiento legal':'01 · Legal compliance'}
              </div>
              <h3 style={{fontSize:18,fontWeight:900,color:text,marginBottom:10}}>
                {es?'La Ley de Basura Cero ya obliga a tu edificio.':'The Zero Waste Law already requires your building to comply.'}
              </h3>
              <p style={{fontSize:12,color:sub,lineHeight:1.8,marginBottom:14}}>
                {es
                  ? 'Los edificios de más de 19 pisos tienen obligación legal bajo la Ley 1854 de CABA de separar y certificar la gestión de sus residuos. Las inspecciones del GCBA aumentaron fuertemente en 2026. OLIVIA te da el sistema verificado con IA y el certificado para presentar en cualquier inspección.'
                  : 'Buildings over 19 floors have a legal obligation under CABA Law 1854 to separate and certify waste management. GCBA inspections increased significantly in 2026. OLIVIA gives you the AI-verified system and the certificate to present in any inspection.'}
              </p>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {(es?['Ley 1854 CABA','Separación verificada','Certificado digital','Inspecciones GCBA']:['Law 1854 CABA','Verified separation','Digital certificate','GCBA inspections']).map((t,i)=>(
                  <span key={i} style={{fontSize:9,color:'#ef4444',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:20,padding:'3px 10px',fontWeight:700}}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RAZÓN 2 · BADGE EDIFICIO VERDE */}
          <div style={{background:card,border:'2px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'32px',marginBottom:20,display:'flex',gap:24,alignItems:'flex-start'}}>
            <div style={{width:56,height:56,borderRadius:16,background:'rgba(34,197,94,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,flexShrink:0}}>🏅</div>
            <div style={{flex:1}}>
              <div style={{fontSize:9,fontWeight:700,color:accent,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>
                {es?'02 · Diferenciación en el mercado':'02 · Market differentiation'}
              </div>
              <h3 style={{fontSize:18,fontWeight:900,color:text,marginBottom:10}}>
                {es?'El badge Edificio Verde OLIVIA para la próxima asamblea.':'The OLIVIA Green Building badge for the next assembly.'}
              </h3>
              <p style={{fontSize:12,color:sub,lineHeight:1.8,marginBottom:14}}>
                {es
                  ? 'El certificado OLIVIA con los datos verificados de tu edificio es el argumento más concreto que podés presentar en la asamblea de copropietarios. No es una intención de reciclar — son kilos reales verificados con IA y GPS. Y en el mercado inmobiliario, un edificio con certificación ambiental verificada vale más.'
                  : 'The OLIVIA certificate with your building verified data is the most concrete argument you can present at the owners assembly. Not an intention to recycle — real kilograms verified with AI and GPS. And in the real estate market, a building with verified environmental certification is worth more.'}
              </p>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {(es?['Badge Edificio Verde','Datos para la asamblea','Mayor valor inmobiliario','Vecinos activos']:['Green Building badge','Assembly data','Higher property value','Active residents']).map((t,i)=>(
                  <span key={i} style={{fontSize:9,color:accent,background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:20,padding:'3px 10px',fontWeight:700}}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RAZÓN 3 · CRÉDITOS DE CARBONO */}
          <div style={{background:card,border:'2px solid rgba(245,158,11,0.3)',borderRadius:20,padding:'32px',marginBottom:20,display:'flex',gap:24,alignItems:'flex-start'}}>
            <div style={{width:56,height:56,borderRadius:16,background:'rgba(245,158,11,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,flexShrink:0}}>💰</div>
            <div style={{flex:1}}>
              <div style={{fontSize:9,fontWeight:700,color:'#f59e0b',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>
                {es?'03 · Créditos de carbono 2027':'03 · Carbon credits 2027'}
              </div>
              <h3 style={{fontSize:18,fontWeight:900,color:text,marginBottom:10}}>
                {es?'Los residuos que separan hoy valen dinero real en 2027.':'The waste you separate today is worth real money in 2027.'}
              </h3>
              <p style={{fontSize:12,color:sub,lineHeight:1.8,marginBottom:14}}>
                {es
                  ? 'En febrero 2026 Verra aprobó su primer piloto de verificación digital dMRV de alta frecuencia — el mismo modelo que implementa OLIVIA. Cada kilo de residuo orgánico verificado en tu edificio hoy se convierte en un registro certificable. Cuando Verra certifique en 2027, esos registros tienen valor real en el mercado voluntario de carbono.'
                  : 'In February 2026 Verra approved its first high-frequency digital dMRV verification pilot — the same model OLIVIA implements. Every kilo of verified organic waste in your building today becomes a certifiable record. When Verra certifies in 2027, those records have real value in the voluntary carbon market.'}
              </p>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {(es?['Verra VCS 2027','Carbono verificado','Valor real en USD','Primer movedor']:['Verra VCS 2027','Verified carbon','Real USD value','First mover']).map((t,i)=>(
                  <span key={i} style={{fontSize:9,color:'#f59e0b',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:20,padding:'3px 10px',fontWeight:700}}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{padding:'0 24px 64px',background:dark?'rgba(34,197,94,0.02)':'rgba(34,197,94,0.01)',borderTop:'1px solid rgba(34,197,94,0.1)'}}>
        <div style={{maxWidth:700,margin:'0 auto',paddingTop:64}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12,textAlign:'center'}}>
            [ {es?'Cómo funciona':'How it works'} ]
          </div>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:40}}>
            {es?'Activo en 48 horas. El encargado lo maneja solo.':'Active in 48 hours. The superintendent handles it alone.'}
          </h2>
          {(es?[
            {n:'1',t:'Instalamos el kit en tu edificio',d:'Tachos brandeados OLIVIA para áreas comunes, cartel con QR en el hall y stickers para ascensores. Sin obra. Sin instalación compleja. El encargado recibe una capacitación de 20 minutos.',c:accent},
            {n:'2',t:'El encargado registra desde el celular',d:'Con la app OLIVIA, el encargado fotografía los residuos orgánicos del día. GPS automático. La IA verifica en segundos. Sin papeles ni planillas.',c:blue},
            {n:'3',t:'Los vecinos se suman con el QR del hall',d:'Cada vecino puede registrar sus propios residuos desde su departamento. Acumulan OLV Verdes que en 2027 se convierten en valor real. El edificio acumula más volumen verificado.',c:'#a855f7'},
            {n:'4',t:'El administrador recibe el reporte mensual',d:'Dashboard en tiempo real con los kg verificados, el CO2 evitado y el progreso hacia la certificación Verra. Listo para presentar en la próxima asamblea.',c:'#f59e0b'},
            {n:'5',t:'Certificado de gestión para el GCBA',d:'El certificado OLIVIA muestra datos reales verificados con IA. Válido ante inspectores de la Ley de Basura Cero. No es autodeclaración — es verificación digital.',c:'#ef4444'},
          ]:[
            {n:'1',t:'We install the kit in your building',d:'OLIVIA-branded bins for common areas, QR poster in the hall and elevator stickers. No construction. No complex installation. The superintendent receives a 20-minute training.',c:accent},
            {n:'2',t:'The superintendent registers from the phone',d:'With the OLIVIA app, the superintendent photographs the daily organic waste. Automatic GPS. AI verifies in seconds. No paperwork or spreadsheets.',c:blue},
            {n:'3',t:'Residents join with the hall QR',d:'Each resident can register their own waste from their apartment. They accumulate Green OLV that in 2027 become real value. The building accumulates more verified volume.',c:'#a855f7'},
            {n:'4',t:'The administrator receives the monthly report',d:'Real-time dashboard with verified kg, avoided CO2 and progress toward Verra certification. Ready to present at the next assembly.',c:'#f59e0b'},
            {n:'5',t:'Management certificate for GCBA',d:'The OLIVIA certificate shows real AI-verified data. Valid before Zero Waste Law inspectors. Not self-declaration — digital verification.',c:'#ef4444'},
          ]).map((p,i,arr)=>(
            <div key={i} style={{display:'flex',gap:20,paddingBottom:i<arr.length-1?28:0}}>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'linear-gradient(135deg,'+p.c+','+p.c+'aa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:900,color:'white',flexShrink:0}}>{p.n}</div>
                {i<arr.length-1&&<div style={{width:2,flex:1,background:'rgba(34,197,94,0.15)',marginTop:8}}></div>}
              </div>
              <div style={{paddingTop:8,paddingBottom:24}}>
                <div style={{fontSize:15,fontWeight:700,color:p.c,marginBottom:6}}>{p.t}</div>
                <div style={{fontSize:12,color:sub,lineHeight:1.8}}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KIT DEL EDIFICIO */}
      <section style={{padding:'64px 24px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12,textAlign:'center'}}>
            [ {es?'El kit de tu edificio':'Your building kit'} ]
          </div>
          <h2 style={{fontSize:26,fontWeight:900,textAlign:'center',marginBottom:32}}>
            {es?'Todo lo que necesita el edificio para empezar.':'Everything the building needs to get started.'}
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14}}>
            {[
              {img:'/kits/kit-consorcio-basico.png',nombre:es?'Kit Consorcio Básico':'Basic Building Kit',desc:es?'Para edificios hasta 50 unidades. Tacho orgánicos 120L + cartel hall + QR vecinos + bolsas industriales.':'For buildings up to 50 units. 120L organic bin + hall poster + resident QR + industrial bags.',c:accent},
              {img:'/kits/kit-consorcio-premium.png',nombre:es?'Kit Consorcio Premium':'Premium Building Kit',desc:es?'Para edificios hasta 150 unidades. Todo el kit básico + tacho secos 120L + stickers ascensores + dashboard por piso.':'For buildings up to 150 units. Everything in basic kit + 120L dry bin + elevator stickers + per-floor dashboard.',c:blue,destacado:true},
            ].map((k,i)=>(
              <div key={i} style={{background:card,border:'2px solid '+(k.destacado?blue:border),borderRadius:16,overflow:'hidden',position:'relative'}}>
                {k.destacado&&<div style={{position:'absolute',top:10,right:10,background:blue,color:'white',fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20,zIndex:2}}>⭐ {es?'Más popular':'Most popular'}</div>}
                <img src={k.img} alt={k.nombre} style={{width:'100%',height:180,objectFit:'cover'}} />
                <div style={{padding:'16px'}}>
                  <div style={{fontSize:13,fontWeight:700,color:k.c,marginBottom:6}}>{k.nombre}</div>
                  <div style={{fontSize:11,color:sub,lineHeight:1.6,marginBottom:14}}>{k.desc}</div>
                  <a href="/nda" style={{display:'block',background:'linear-gradient(135deg,'+k.c+','+k.c+'bb)',borderRadius:10,padding:'10px',color:'white',fontSize:11,fontWeight:700,textDecoration:'none',textAlign:'center'}}>
                    {es?'Solicitar propuesta →':'Request proposal →'}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:16}}>
            <a href="/kits" style={{fontSize:12,color:accent,fontWeight:700,textDecoration:'none'}}>
              {es?'Ver todos los kits disponibles →':'See all available kits →'}
            </a>
          </div>
        </div>
      </section>

      {/* PARA EL ENCARGADO */}
      <section style={{padding:'0 24px 64px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{background:dark?'rgba(59,130,246,0.06)':'rgba(59,130,246,0.04)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:20,padding:'32px'}}>
            <div style={{fontSize:9,fontWeight:700,color:blue,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:12}}>
              [ {es?'Para el encargado del edificio':'For the building superintendent'} ]
            </div>
            <h3 style={{fontSize:20,fontWeight:900,color:text,marginBottom:12}}>
              {es?'Registrar residuos tarda 2 minutos por día.':'Registering waste takes 2 minutes per day.'}
            </h3>
            <p style={{fontSize:12,color:sub,lineHeight:1.8,marginBottom:20}}>
              {es
                ? 'El encargado abre la app OLIVIA, fotografía el tacho de orgánicos, confirma el GPS y listo. La IA hace el análisis automáticamente. No hay planillas, no hay papeles, no hay capacitación compleja. Y cada registro que hace el encargado contribuye al certificado del edificio y a los créditos de carbono de 2027.'
                : 'The superintendent opens the OLIVIA app, photographs the organic bin, confirms GPS and done. AI does the analysis automatically. No spreadsheets, no paperwork, no complex training. And every record the superintendent makes contributes to the building certificate and 2027 carbon credits.'}
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
              {[
                {n:'2 min',l:es?'por registro diario':'per daily record',c:blue},
                {n:'48hs',l:es?'para activar el edificio':'to activate the building',c:accent},
                {n:'0',l:es?'inversión inicial':'initial investment',c:'#f59e0b'},
              ].map((s,i)=>(
                <div key={i} style={{textAlign:'center',padding:'12px',background:'rgba(255,255,255,0.03)',borderRadius:10,border:'1px solid '+s.c+'22'}}>
                  <div style={{fontSize:22,fontWeight:900,color:s.c,marginBottom:4}}>{s.n}</div>
                  <div style={{fontSize:10,color:sub}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* LINK MAPA */}
      <section style={{padding:'0 24px 40px',maxWidth:800,margin:'0 auto'}}>
        <a href="/mapa" style={{display:'block',textDecoration:'none',background:dark?'rgba(2,132,199,0.06)':'rgba(2,132,199,0.035)',border:'1px solid rgba(2,132,199,0.2)',borderRadius:14,padding:'20px'}}>
          <div style={{fontSize:13,fontWeight:800,color:'#0284c7',marginBottom:6}}>
            {es?'Mirá cuántos puntos verdes hay cerca de tus edificios':'See how many green points are near your buildings'}
          </div>
          <p style={{fontSize:11,color:sub,lineHeight:1.7,marginBottom:8}}>
            {es
              ? 'Solo 15 de los 21 puntos verdes de CABA reciben orgánicos, y ninguno registra quién los dejó. Con OLIVIA el retiro va al edificio y cada kilo queda verificado.'
              : 'Only 15 of the 21 green points accept organics, and none records who left them. With OLIVIA collection comes to the building and every kilo is verified.'}
          </p>
          <span style={{fontSize:11,color:'#0284c7',fontWeight:700}}>{es?'Ver el mapa de CABA →':'View the city map →'}</span>
        </a>
      </section>
      {/* CTA FINAL */}
      <section style={{padding:'56px 24px',textAlign:'center',background:'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(59,130,246,0.04))',borderTop:'1px solid rgba(34,197,94,0.15)'}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <div style={{fontSize:28,marginBottom:16}}>🏢</div>
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:8}}>
            {es?'El 18 de octubre es el Día Mundial de la Protección de la Naturaleza.':'October 18 is World Nature Protection Day.'}
          </h2>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:8}}>
            {es
              ? 'En 1972 una carta escrita en Buenos Aires llegó a la ONU y creó esa fecha. Este año queremos que tu edificio sea uno de los primeros certificados de la ciudad ese día.'
              : 'In 1972 a letter written in Buenos Aires reached the UN and created that date. This year we want your building to be one of the first certified in the city on that day.'}
          </p>
          <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:28}}>
            {es
              ? 'Firmá el NDA y te contactamos en menos de 24 horas con la propuesta personalizada para tu edificio.'
              : 'Sign the NDA and we will contact you in less than 24 hours with the personalized proposal for your building.'}
          </p>
          <a href="/nda" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'16px 40px',color:'white',fontSize:14,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:16}}>
            {es?'Certificar mi edificio →':'Certify my building →'}
          </a>
          <div style={{fontSize:11,color:sub}}>
            {es?'O escribinos directo:':'Or write to us directly:'}{' '}
            <a href="mailto:hola@oliviacirculab.com.ar?subject=Propuesta consorcio OLIVIA" style={{color:accent}}>hola@oliviacirculab.com.ar</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid '+border,padding:'32px 24px',textAlign:'center'}}>
        <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:36,height:36,objectFit:'contain',borderRadius:6,marginBottom:8}} /></a>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.1em'}}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
        <div style={{marginTop:8,display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/ciudadano" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Ciudadano':'Citizen'}</a>
          <a href="/institucional" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Inversores':'Investors'}</a>
          <a href="/grandes-generadores" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Grandes Generadores':'Large Generators'}</a>
          <a href="/kits" style={{fontSize:11,color:sub,textDecoration:'none'}}>Kits</a>
          <a href="/nda" style={{fontSize:11,color:sub,textDecoration:'none'}}>NDA</a>
        </div>
      </footer>

    </div>
  )
}
