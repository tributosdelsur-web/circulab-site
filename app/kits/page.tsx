'use client'
import { useState } from 'react'

export default function Kits() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const [segmento, setSegmento] = useState('todos')
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#64748b' : '#6b7280'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const accent = '#22c55e'

  const SEGMENTOS = [
    {id:'todos', l:es?'Todos':'All', c:'#22c55e'},
    {id:'vecino', l:es?'Vecino':'Neighbor', c:'#22c55e'},
    {id:'consorcio', l:es?'Consorcio':'Building', c:'#3b82f6'},
    {id:'comercio', l:es?'Gastronomía y hotelería':'Food & hospitality', c:'#f59e0b'},
    {id:'empresa', l:es?'Empresas':'Companies', c:'#06b6d4'},
  ]

  type Kit = {
    id:string, seg:string, img:string, nombre:string, para:string, modo:string, precio:string,
    color:string, icono:string, trae:string[], olivia:string[], nota?:string, cta:string, href:string, destacado?:boolean,
  }

  const PROPUESTA = 'mailto:hola@oliviacirculab.com.ar?subject='

  const KITS: Kit[] = [
    {
      id:'semilla', seg:'vecino', img:'/kits/ref/semilla.jpg', icono:'🌱', color:'#22c55e',
      nombre: es?'Kit Semilla':'Seed Kit',
      para: es?'Vecino que ya separa en casa':'Neighbor who already sorts at home',
      modo: es?'Solo la app':'App only',
      precio: es?'Gratis':'Free',
      trae: es?['Nada físico: usás tus propios tachos']:['Nothing physical: you use your own bins'],
      olivia: es?['App OLIVIA: registro con foto','Historial de kilos separados','Mapa de puntos verdes para entregar']:['OLIVIA app: photo record','History of sorted kilos','Map of drop-off points'],
      cta: es?'Registrarme':'Sign up', href:'/registro',
    },
    {
      id:'compost-casa', seg:'vecino', img:'/kits/ref/compost-casa.jpg', icono:'🪱', color:'#16a34a',
      nombre: es?'Kit Compost Casa':'Home Compost Kit',
      para: es?'Casa o departamento con balcón':'House or flat with a balcony',
      modo: es?'Compostás en tu casa':'You compost at home',
      precio: es?'Precio según modelo de compostera':'Price depends on composter model',
      trae: es?[
        '1 compostera de balcón o vermicompostera',
        '1 tacho de cocina de 10 L con tapa',
        '30 bolsas compostables',
        '5 kg de material secante (aserrín o viruta)',
        'Guía impresa con QR',
      ]:[
        '1 balcony composter or worm bin',
        '1 kitchen bin, 10 L, with lid',
        '30 compostable bags',
        '5 kg of dry material (sawdust or shavings)',
        'Printed guide with QR',
      ],
      olivia: es?['Registro de los kilos que compostás','Acompañamiento el primer mes']:['Record of the kilos you compost','Support during the first month'],
      nota: es?'No incluye retiro: el compost queda en tu casa':'No pickup: the compost stays at home',
      cta: es?'Pedir precio':'Ask for price', href:PROPUESTA+'Kit Compost Casa',
    },
    {
      id:'compost-edificio', seg:'consorcio', img:'/kits/ref/compost-edificio.jpg', icono:'🏢', color:'#3b82f6', destacado:true,
      nombre: es?'Kit Compost Edificio':'Building Compost Kit',
      para: es?'Consorcio con patio o terraza':'Building with a yard or rooftop',
      modo: es?'El edificio composta en el lugar':'The building composts on site',
      precio: es?'A medida · según cantidad de unidades':'Tailored · by number of units',
      trae: es?[
        '2 a 4 composteras comunitarias, según unidades',
        'Tachos de 20 L con QR, uno por piso',
        'Cartelería para palieres y punto de compost',
        'Material secante para el primer mes',
        'Capacitación presencial para encargado y vecinos',
      ]:[
        '2 to 4 community composters, by number of units',
        '20 L bins with QR, one per floor',
        'Signage for landings and compost point',
        'Dry material for the first month',
        'On-site training for caretaker and neighbors',
      ],
      olivia: es?['Registro de kilos por edificio','Reporte mensual para el consorcio','Seguimiento del compost']:['Record of kilos per building','Monthly report for the building','Compost follow-up'],
      nota: es?'No requiere retiro ni planta':'No pickup or plant needed',
      cta: es?'Pedir propuesta':'Request proposal', href:PROPUESTA+'Kit Compost Edificio',
    },
    {
      id:'retiro-edificio', seg:'consorcio', img:'/kits/ref/retiro-edificio.jpg', icono:'🚲', color:'#2563eb',
      nombre: es?'Kit Retiro Edificio':'Building Pickup Kit',
      para: es?'Consorcio sin espacio para compostar':'Building with no room to compost',
      modo: es?'Retiramos nosotros':'We pick it up',
      precio: es?'A medida · según volumen y frecuencia de retiro':'Tailored · by volume and pickup frequency',
      trae: es?[
        '1 o 2 tachos de 120 L con QR para el punto ecológico',
        'Tachos de 20 L por piso (opcional)',
        'Cartelería para hall y palieres',
        'Bolsas compostables',
      ]:[
        '1 or 2 120 L bins with QR for the collection point',
        '20 L bins per floor (optional)',
        'Signage for lobby and landings',
        'Compostable bags',
      ],
      olivia: es?['Retiro con frecuencia fija (1 a 3 veces por semana)','Pesaje con balanza en cada retiro','Reporte mensual de kilos, útil para Basura Cero']:['Pickup on a fixed schedule (1 to 3 times a week)','Weighing on every pickup','Monthly kilo report, useful for Zero Waste'],
      nota: es?'Disponible donde haya una cooperativa o planta aliada que reciba el orgánico':'Available where a partner cooperative or plant takes the organics',
      cta: es?'Pedir propuesta':'Request proposal', href:PROPUESTA+'Kit Retiro Edificio',
    },
    {
      id:'gastronomia', seg:'comercio', img:'/kits/ref/gastronomia.jpg', icono:'🍽️', color:'#f59e0b',
      nombre: es?'Kit Gastronomía y Hotelería':'Food & Hospitality Kit',
      para: es?'Café, restorán, hotel o comedor':'Café, restaurant, hotel or canteen',
      modo: es?'Retiro o compost en el lugar':'Pickup or on-site compost',
      precio: es?'A medida · según volumen diario':'Tailored · by daily volume',
      trae: es?[
        'Tachos de 30 a 120 L con QR para cocina',
        'Cartelería para el personal',
        'Bolsas compostables',
        'Balanza, si el volumen lo justifica',
      ]:[
        '30 to 120 L bins with QR for the kitchen',
        'Staff signage',
        'Compostable bags',
        'Scale, if the volume justifies it',
      ],
      olivia: es?['Diagnóstico inicial con balanza portátil','Capacitación del personal','Retiro o compost, y reporte mensual de kilos']:['Initial assessment with portable scale','Staff training','Pickup or compost, plus monthly kilo report'],
      cta: es?'Pedir propuesta':'Request proposal', href:PROPUESTA+'Kit Gastronomía y Hotelería',
    },
    {
      id:'empresas', seg:'empresa', img:'/kits/ref/empresas.jpg', icono:'🏙️', color:'#06b6d4',
      nombre: es?'Kit Oficinas y Empresas':'Office & Company Kit',
      para: es?'Oficinas, fábricas y equipos con comedor':'Offices, factories and teams with a canteen',
      modo: es?'Retiro y reporte':'Pickup and report',
      precio: es?'A medida · según sedes y volumen':'Tailored · by sites and volume',
      trae: es?[
        'Tachos para comedor y office',
        'Cartelería para empleados',
        'Bolsas compostables',
      ]:[
        'Bins for canteen and kitchenette',
        'Employee signage',
        'Compostable bags',
      ],
      olivia: es?['Retiro y pesaje','Reporte de kilos para informes ESG','Actividad de separación para empleados']:['Pickup and weighing','Kilo report for ESG reporting','Sorting activity for employees'],
      cta: es?'Pedir propuesta':'Request proposal', href:PROPUESTA+'Kit Oficinas y Empresas',
    },
  ]

  const kitsFiltrados = segmento === 'todos'
    ? KITS
    : KITS.filter(k => k.seg === segmento)

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
      <section style={{padding:'clamp(32px,6vw,56px) 24px',textAlign:'center',background:dark?'rgba(34,197,94,0.04)':'rgba(34,197,94,0.02)',borderBottom:'1px solid rgba(34,197,94,0.1)'}}>
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>[ {es?'Kits OLIVIA Circulab':'OLIVIA Circulab Kits'} ]</div>
          <h1 style={{fontSize:'clamp(24px,5vw,36px)',fontWeight:900,lineHeight:1.2,marginBottom:16}}>
            {es?'Limpiá tu tacho.':'Clean your bin.'}
            <br/><span style={{color:accent}}>{es?'Limpiá el planeta.':'Clean the planet.'}</span>
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.7,marginBottom:8,maxWidth:520,margin:'0 auto 8px'}}>
            {es
              ? 'Tres formas de empezar: compostás en tu casa, el edificio composta en el lugar o retiramos nosotros. Cada kit dice qué trae y qué hace OLIVIA.'
              : 'Three ways to start: compost at home, compost on site in your building, or we pick it up. Each kit shows what it includes and what OLIVIA does.'}
          </p>
          <div style={{marginTop:24,display:'inline-block',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'10px 20px',fontSize:11,color:accent,fontWeight:700}}>
            {es?'✅ Vendemos el kit o el servicio, y el dato: cuántos kilos no fueron al relleno':'✅ We sell the kit or the service, plus the data: how many kilos stayed out of landfill'}
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section style={{padding:'0',maxWidth:800,margin:'0 auto'}}>
        <img
          src="/kits/kit-hero-landing.png"
          alt={es?'Limpiá tu tacho. Limpiá el planeta.':'Clean your bin. Clean the planet.'}
          style={{width:'100%',height:'auto',objectFit:'contain',display:'block'}}
        />
      </section>

      {/* FILTROS */}
      <section style={{padding:'32px 24px 0'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
          {SEGMENTOS.map(s=>(
            <button key={s.id} onClick={()=>setSegmento(s.id)} style={{padding:'8px 18px',borderRadius:20,border:'1px solid '+(segmento===s.id?s.c:border),background:segmento===s.id?s.c+'15':'transparent',color:segmento===s.id?s.c:sub,fontSize:11,fontWeight:700,cursor:'pointer',transition:'all 0.2s'}}>
              {s.l}
            </button>
          ))}
        </div>
      </section>

      {/* NOTA PRECIOS DESDE */}
      <div style={{maxWidth:1100,margin:'0 auto 20px',padding:'0 20px'}}>
        <div style={{background:'rgba(245,158,11,0.07)',border:'1px solid rgba(245,158,11,0.25)',borderRadius:12,padding:'14px 16px',display:'flex',gap:10,alignItems:'flex-start'}}>
          <span style={{fontSize:16,lineHeight:1}}>💡</span>
          <div style={{fontSize:12,lineHeight:1.65,color:'#b45309'}}>
            <strong>{es?'Contenido de referencia.':'Reference contents.'}</strong>{' '}
            {es
              ? 'Cantidades y precio se arman a medida de cada cliente, según volumen y espacio. Las fotos son ilustrativas.'
              : 'Quantities and price are tailored to each client, by volume and space. Photos are illustrative.'}
          </div>
        </div>
      </div>

      {/* KITS GRID */}
      <section style={{padding:'32px 24px 64px'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
          {kitsFiltrados.map((kit)=>(
            <div key={kit.id} style={{background:card,border:'2px solid '+(kit.destacado?kit.color:border),borderRadius:20,overflow:'hidden',position:'relative'}}>
              {kit.destacado&&(
                <div style={{position:'absolute',top:12,right:12,background:kit.color,color:'white',fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',padding:'4px 10px',borderRadius:20,zIndex:2}}>
                  {es?'⭐ Recomendado':'⭐ Recommended'}
                </div>
              )}
              <div style={{height:200,overflow:'hidden',position:'relative'}}>
                <img
                  src={kit.img}
                  alt={kit.nombre}
                  style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s'}}
                  onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.05)')}
                  onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}
                />
                <div style={{position:'absolute',bottom:0,left:0,right:0,height:80,background:'linear-gradient(to top,rgba(0,0,0,0.7),transparent)'}}></div>
                <div style={{position:'absolute',bottom:12,left:16,display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:24}}>{kit.icono}</span>
                  <div>
                    <div style={{fontSize:14,fontWeight:900,color:'white'}}>{kit.nombre}</div>
                    <div style={{fontSize:10,color:'rgba(255,255,255,0.8)'}}>{kit.modo}</div>
                  </div>
                </div>
              </div>
              <div style={{padding:'20px'}}>
                <div style={{fontSize:11,color:sub,marginBottom:4}}>{es?'Para: ':'For: '}<strong style={{color:text}}>{kit.para}</strong></div>
                <div style={{fontSize:14,fontWeight:700,color:kit.color,marginBottom:14,lineHeight:1.4}}>{kit.precio}</div>
                {[
                  {t:es?'Qué trae':'What it includes',items:kit.trae},
                  {t:es?'Qué hace OLIVIA':'What OLIVIA does',items:kit.olivia},
                ].map(g=>(
                  <div key={g.t} style={{marginBottom:12}}>
                    <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:text,marginBottom:6}}>{g.t}</div>
                    <div style={{display:'flex',flexDirection:'column',gap:5}}>
                      {g.items.map((item,i)=>(
                        <div key={i} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                          <span style={{color:kit.color,fontSize:12,flexShrink:0,marginTop:1}}>✓</span>
                          <span style={{fontSize:12,color:sub,lineHeight:1.5}}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {kit.nota&&(
                  <div style={{fontSize:11,color:sub,fontStyle:'italic',lineHeight:1.5,marginBottom:14,paddingTop:8,borderTop:'1px solid '+border}}>{kit.nota}</div>
                )}
                <a href={kit.href} style={{display:'block',background:'linear-gradient(135deg,'+kit.color+','+kit.color+'cc)',borderRadius:12,padding:'12px',color:'white',fontSize:12,fontWeight:700,textDecoration:'none',textAlign:'center',textTransform:'uppercase',letterSpacing:'0.06em'}}>
                  {kit.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAMILIA COMPLETA */}
      <section style={{padding:'0 24px 64px'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <img
            src="/kits/kit-familia-completa.png"
            alt={es?'Familia completa de kits OLIVIA':'Complete OLIVIA kit family'}
            style={{width:'100%',borderRadius:20,objectFit:'cover',height:300}}
          />
          <div style={{textAlign:'center',marginTop:20}}>
            <div style={{fontSize:12,color:sub,marginBottom:8}}>
              {es?'¿No encontrás tu kit? Contanos tu caso y te armamos una propuesta a medida.':'Cannot find your kit? Tell us your case and we will create a custom proposal.'}
            </div>
            <a href="mailto:hola@oliviacirculab.com.ar?subject=Kit a medida OLIVIA" style={{fontSize:12,color:accent,fontWeight:700,textDecoration:'none'}}>
              hola@oliviacirculab.com.ar →
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{padding:'56px 24px',textAlign:'center',background:'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(59,130,246,0.04))',borderTop:'1px solid rgba(34,197,94,0.15)'}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <h2 style={{fontSize:26,fontWeight:900,marginBottom:8}}>
            {es?'¿Listo para empezar?':'Ready to start?'}
          </h2>
          <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:28}}>
            {es
              ? 'Contanos si sos vecino, consorcio, comercio o empresa, y te armamos la propuesta a medida.'
              : 'Tell us if you are a neighbor, building, business or company, and we will put together a tailored proposal.'}
          </p>
          <a href="mailto:hola@oliviacirculab.com.ar?subject=Propuesta de kit OLIVIA" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'16px 40px',color:'white',fontSize:14,fontWeight:700,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:16}}>
            {es?'Pedir propuesta →':'Request proposal →'}
          </a>
          <div style={{fontSize:11,color:sub}}>
            {es?'O escribinos:':'Or write to us:'}{' '}
            <a href="mailto:hola@oliviacirculab.com.ar" style={{color:accent}}>hola@oliviacirculab.com.ar</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
