'use client'
import { useState, useEffect, useRef } from 'react'

const PV = [
  {n:'Puerto Madero',d:'Av. A.M. de Justo y Azucena Villaflor',b:'Puerto Madero',c:1,lat:-34.6127,lng:-58.3637,org:1,raee:1},
  {n:'Plaza Rosario Vera Peñaloza',d:'Av. San Juan y Chacabuco',b:'San Telmo',c:1,lat:-34.6197,lng:-58.3762,org:1,raee:1},
  {n:'Plaza Emilio Mitre',d:'Av. Gral. Las Heras y Cantilo',b:'Recoleta',c:2,lat:-34.5858,lng:-58.4013,org:1,raee:0},
  {n:'Plaza Monseñor de Andrea',d:'Anchorena y Córdoba',b:'Recoleta',c:2,lat:-34.5970,lng:-58.4076,org:1,raee:1},
  {n:'Plaza Cabrera',d:'Cabrera y Anchorena',b:'Palermo',c:2,lat:-34.5893,lng:-58.4074,org:1,raee:1},
  {n:'Plaza 1° de Mayo',d:'H. Yrigoyen y Pasco',b:'Balvanera',c:3,lat:-34.6162,lng:-58.3994,org:1,raee:0},
  {n:'Plaza Manzana 66',d:'Moreno y Jujuy',b:'Balvanera',c:3,lat:-34.6188,lng:-58.3950,org:0,raee:1},
  {n:'Plaza Colombia',d:'Av. Montes de Oca y Brandsen',b:'Barracas',c:4,lat:-34.6433,lng:-58.3700,org:1,raee:0},
  {n:'Parque Patricios',d:'Av. Caseros y Monteagudo',b:'Parque Patricios',c:4,lat:-34.6384,lng:-58.4008,org:0,raee:1},
  {n:'Plaza Almagro',d:'Sarmiento y Bulnes',b:'Almagro',c:5,lat:-34.6104,lng:-58.4200,org:1,raee:1},
  {n:'Plaza Mariano Boedo',d:'Estados Unidos y S. de Loria',b:'Boedo',c:5,lat:-34.6299,lng:-58.4193,org:1,raee:0},
  {n:'Plaza Irlanda',d:'Donato Álvarez y Av. Gaona',b:'Caballito',c:6,lat:-34.6139,lng:-58.4594,org:1,raee:1},
  {n:'Parque Rivadavia',d:'Av. Rivadavia y F. Balcarce',b:'Caballito',c:6,lat:-34.6175,lng:-58.4347,org:1,raee:1},
  {n:'Parque Centenario',d:'Av. Patricias Argentinas y Campichuelo',b:'Caballito',c:6,lat:-34.6094,lng:-58.4361,org:1,raee:0},
  {n:'Parque de las y los Recicladores',d:'Yerbal 1415',b:'Caballito',c:6,lat:-34.6155,lng:-58.4405,org:1,raee:1},
  {n:'Plaza de la Misericordia',d:'Lautaro y Francisco Bilbao',b:'Flores',c:7,lat:-34.6329,lng:-58.4741,org:1,raee:1},
  {n:'Parque Chacabuco',d:'Av. Asamblea y Puán',b:'Parque Chacabuco',c:7,lat:-34.6378,lng:-58.4502,org:0,raee:1},
  {n:'Barrio Olímpico',d:'Camet y 23 de Junio',b:'Villa Soldati',c:8,lat:-34.6733,lng:-58.4614,org:0,raee:1},
  {n:'Estación Lugano',d:'Delfín Gallo y M. Leguizamón',b:'Villa Lugano',c:8,lat:-34.6819,lng:-58.4811,org:0,raee:1},
  {n:'Plaza Echeverría',d:'Dr. P.I. Rivera y Bauness',b:'Villa Urquiza',c:12,lat:-34.5727,lng:-58.4896,org:1,raee:1},
  {n:'Plaza Balcarce',d:'Manzanares y Vuelta de Obligado',b:'Núñez',c:13,lat:-34.5489,lng:-58.4603,org:1,raee:0},
]

export default function Mapa() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const [tab, setTab] = useState<'todos'|'organicos'|'raee'|'c360'>('todos')
  const [ready, setReady] = useState(false)
  const mapRef = useRef<any>(null)
  const tilesRef = useRef<any>(null)
  const groupsRef = useRef<any>({})
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#94a3b8' : '#64748b'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const accent = '#22c55e'
  const morado = '#9333ea'
  const azul = '#0284c7'

  const tileUrl = () => dark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

  useEffect(() => {
    if ((window as any).L) { setReady(true); return }
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(css)
    const js = document.createElement('script')
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    js.async = true
    js.onload = () => setReady(true)
    document.body.appendChild(js)
  }, [])

  useEffect(() => {
    if (!ready) return
    const L = (window as any).L
    const el = document.getElementById('olivia-map')
    if (!el || mapRef.current) return
    const map = L.map(el, { center:[-34.6150,-58.4300], zoom:12, scrollWheelZoom:false })
    tilesRef.current = L.tileLayer(tileUrl(), { attribution:'© OpenStreetMap · © CARTO', maxZoom:20, subdomains:'abcd' }).addTo(map)
    groupsRef.current = { org:L.layerGroup(), raee:L.layerGroup(), solo:L.layerGroup() }
    mapRef.current = map
    map.on('click', () => map.scrollWheelZoom.enable())
    map.on('mouseout', () => map.scrollWheelZoom.disable())
    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)
    setTimeout(() => map.invalidateSize(), 300)
    return () => { window.removeEventListener('resize', onResize) }
  }, [ready])

  useEffect(() => { if (tilesRef.current) tilesRef.current.setUrl(tileUrl()) }, [dark])

  useEffect(() => {
    if (!ready || !mapRef.current) return
    const L = (window as any).L
    const map = mapRef.current
    const G = groupsRef.current
    Object.values(G).forEach((g:any) => g.clearLayers())

    const col = (p:any) => p.org&&p.raee ? '#f59e0b' : p.org ? accent : p.raee ? morado : '#94a3b8'
    const lab = (p:any) => p.org&&p.raee ? (es?'Orgánicos + RAEE':'Organics + e-waste')
      : p.org ? (es?'Solo orgánicos':'Organics only')
      : p.raee ? (es?'Solo RAEE':'E-waste only') : (es?'Secos general':'Dry waste')
    const ico = (c:string,s:number) => L.divIcon({html:'<div style="width:'+s+'px;height:'+s+'px;border-radius:50%;background:'+c+';border:2.5px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.4)"></div>',iconSize:[s,s],iconAnchor:[s/2,s/2],className:''})

    PV.forEach(p => {
      const c = col(p)
      const ol = (p.org||p.raee)
        ? '<div style="margin-top:9px;padding:9px;border-radius:8px;font-size:10px;line-height:1.6;background:'+c+'1a;border:1px solid '+c+'55;color:'+c+'">✅ <b>'+(es?'Puede integrar verificación OLIVIA dMRV':'Can integrate OLIVIA dMRV verification')+'</b><br><span style="color:#64748b">'+(es?'Con QR instalado, cada depósito genera un dato certificable para Verra VCS 2027.':'With a QR installed, each deposit generates a certifiable data point for Verra VCS 2027.')+'</span></div>'
        : '<div style="margin-top:9px;padding:9px;border-radius:8px;font-size:10px;background:#f1f5f9;border:1px solid #e2e8f0;color:#94a3b8">'+(es?'Sin materiales certificables OLIVIA en este punto.':'No OLIVIA-certifiable materials here.')+'</div>'
      const html = '<div style="font-family:Inter,system-ui;min-width:215px">'
        + '<div style="font-size:13px;font-weight:800;color:#0f172a;margin-bottom:3px">'+p.n+'</div>'
        + '<div style="font-size:11px;color:#94a3b8;margin-bottom:8px">📍 '+p.d+' · '+p.b+' · '+(es?'Comuna':'District')+' '+p.c+'</div>'
        + '<span style="display:inline-block;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;padding:3px 8px;border-radius:6px;margin:2px 3px 2px 0;background:'+c+'22;color:'+c+'">'+lab(p)+'</span>'
        + (p.org?'<span style="display:inline-block;font-size:8px;font-weight:800;text-transform:uppercase;padding:3px 8px;border-radius:6px;margin:2px 3px;background:#dcfce7;color:#16a34a">🌿 '+(es?'Compostera':'Composting')+'</span>':'')
        + (p.raee?'<span style="display:inline-block;font-size:8px;font-weight:800;text-transform:uppercase;padding:3px 8px;border-radius:6px;margin:2px 3px;background:#f3e8ff;color:#9333ea">♻️ '+(es?'RAEE':'E-waste')+'</span>':'')
        + ol + '</div>'
      const m = L.marker([p.lat,p.lng],{icon:ico(c,(p.org&&p.raee)?15:12)}).bindPopup(html,{maxWidth:285})
      if(!p.org&&!p.raee) G.solo.addLayer(m); else if(p.org) G.org.addLayer(m); else G.raee.addLayer(m)
    })

    Object.values(G).forEach((g:any) => { if(map.hasLayer(g)) map.removeLayer(g) })
    if (tab==='organicos') { G.org.addTo(map) }
    else if (tab==='raee') { G.raee.addTo(map); G.org.addTo(map) }
    else { Object.values(G).forEach((g:any) => g.addTo(map)) }
    setTimeout(() => map.invalidateSize(), 200)
  }, [ready, lang, tab, dark])

  const TABS: [string,string][] = es
    ? [['todos','Todos'],['organicos','🌿 Orgánicos'],['raee','♻️ RAEE'],['c360','🔄 Circuito 360°']]
    : [['todos','All'],['organicos','🌿 Organics'],['raee','♻️ E-waste'],['c360','🔄 360° Circuit']]

  const KPIS: [string,string,string][] = es
    ? [['21','Puntos verdes en CABA','#16a34a'],['15','Con compostera de orgánicos',accent],['18','Que aceptan RAEE',morado],['0','Con dMRV verificado','#ea580c'],['2027','Primera cert. Verra VCS','#16a34a']]
    : [['21','Green points in the city','#16a34a'],['15','With organic composting',accent],['18','Accepting e-waste',morado],['0','With verified dMRV','#ea580c'],['2027','First Verra VCS certification','#16a34a']]

  const box = (bc:string, bgc:string) => ({background:bgc,border:'1px solid '+bc,borderRadius:12,padding:16})
  const paso = (i:number,a:string,b:string,bgN:string,fgN:string) => (
    <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:9}}>
      <div style={{width:20,height:20,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:900,flexShrink:0,marginTop:1,background:bgN,color:fgN}}>{i+1}</div>
      <div style={{fontSize:11,lineHeight:1.6,color:sub}}><b style={{color:text}}>{a}</b> {b}</div>
    </div>
  )

  const verraSteps: [string,string][] = es ? [
    ['Elegir metodología.','Para orgánicos urbanos: AMS-III.F (compostaje que evita metano de relleno). Define cómo se calcula el CO₂ evitado.'],
    ['Definir la línea base.','Cuánto metano se habría emitido si esos orgánicos iban al relleno. Es el punto de comparación que Verra audita.'],
    ['Diseñar el sistema dMRV.','Verificación digital de alta frecuencia: foto con IA + GPS + peso real + QR por contenedor. Verra aprobó este modelo en febrero 2026.'],
    ['Validación por auditor acreditado (VVB).','DNV o Bureau Veritas revisan el diseño. Verra lo aprueba para empezar a acumular datos.'],
    ['Acumular datos 12–24 meses.','Cada registro se guarda con trazabilidad completa. No se puede acelerar: es tiempo real.'],
    ['Verificación y emisión de VCUs.','El auditor verifica los datos reales. Verra emite los créditos (1 VCU = 1 tCO₂e).'],
  ] : [
    ['Choose the methodology.','For urban organics: AMS-III.F (composting that avoids landfill methane). Defines how avoided CO₂ is calculated.'],
    ['Define the baseline.','How much methane would have been emitted had those organics gone to landfill. The benchmark Verra audits.'],
    ['Design the dMRV system.','High-frequency digital verification: AI photo + GPS + real weight + QR per container. Verra approved this model in February 2026.'],
    ['Validation by accredited auditor (VVB).','DNV or Bureau Veritas review the design. Verra approves it so data accumulation can begin.'],
    ['Accumulate data for 12–24 months.','Every record is stored with full traceability. It cannot be accelerated: it is real time.'],
    ['Verification and VCU issuance.','The auditor verifies the actual data. Verra issues the credits (1 VCU = 1 tCO₂e).'],
  ]

  const cOrg: [string,string][] = es ? [
    ['Vecino separa','y lleva orgánicos al punto verde. El QR de OLIVIA registra el depósito.'],
    ['OLIVIA verifica:','foto con IA + GPS + peso. Registro dMRV certificable.'],
    ['Se composita.','El compost con trazabilidad vale USD 0,70–1/kg frente a USD 0,50 sin trazabilidad.'],
    ['Compost al vivero de flora nativa.','Las plantas restauran zonas degradadas del AMBA.'],
    ['Verra certifica 2027:','crédito 1 por reciclaje (AMS-III.F) + crédito 2 por restauración ecológica (VM0047, mayor precio).'],
  ] : [
    ['Resident separates','and brings organics to the green point. The OLIVIA QR records the deposit.'],
    ['OLIVIA verifies:','AI photo + GPS + weight. Certifiable dMRV record.'],
    ['It is composted.','Compost with traceability is worth USD 0.70–1/kg versus USD 0.50 without.'],
    ['Compost to the native plant nursery.','The plants restore degraded areas of the metropolitan region.'],
    ['Verra certifies in 2027:','credit 1 for recycling (AMS-III.F) + credit 2 for ecological restoration (VM0047, higher price).'],
  ]

  const cRaee: [string,string][] = es ? [
    ['Vecino o empresa','entrega RAEE en el punto verde. El QR registra tipo y peso estimado.'],
    ['OLIVIA verifica:','foto + clasificación con IA + peso + GPS. Certificable bajo AMS-III.BA.'],
    ['Operador habilitado por APRA','recupera cobre, aluminio, oro y litio de los dispositivos.'],
    ['Verra certifica 2027:','crédito por materiales recuperados vs. extracción minera nueva. USD 10–30/tCO₂.'],
  ] : [
    ['Resident or company','delivers e-waste at the green point. The QR records type and estimated weight.'],
    ['OLIVIA verifies:','photo + AI classification + weight + GPS. Certifiable under AMS-III.BA.'],
    ['APRA-licensed operator','recovers copper, aluminium, gold and lithium from the devices.'],
    ['Verra certifies in 2027:','credit for recovered materials versus new mining extraction. USD 10–30/tCO₂.'],
  ]

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

      <section style={{padding:'40px 20px 24px',textAlign:'center',background:'linear-gradient(135deg,rgba(34,197,94,.06),rgba(2,132,199,.03))',borderBottom:'1px solid '+border}}>
        <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'.3em',color:accent,marginBottom:12}}>
          [ {es?'Inteligencia territorial':'Territorial intelligence'} ]
        </div>
        <h1 style={{fontSize:30,fontWeight:900,lineHeight:1.15,marginBottom:12,maxWidth:640,margin:'0 auto 12px'}}>
          {es?'¿Dónde podés dejar tus orgánicos en Buenos Aires?':'Where can you drop your organics in Buenos Aires?'}
        </h1>
        <p style={{fontSize:13,color:sub,lineHeight:1.7,maxWidth:560,margin:'0 auto'}}>
          {es
            ? 'Los 21 puntos verdes de la Ciudad con datos abiertos del GCBA: cuáles tienen compostera, cuáles reciben electrónicos, y por qué hoy ese esfuerzo todavía no genera valor.'
            : 'The 21 green points of the City from open government data: which have composting units, which accept e-waste, and why that effort does not yet generate value.'}
        </p>
      </section>

      <div style={{display:'flex',overflowX:'auto',background:card,borderBottom:'1px solid '+border}}>
        {TABS.map(([k,l])=>(
          <div key={k} onClick={()=>setTab(k as any)} style={{padding:'13px 20px',fontSize:12,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap',color:tab===k?'#16a34a':sub,borderBottom:'3px solid '+(tab===k?accent:'transparent'),background:tab===k?(dark?'rgba(34,197,94,.08)':'#f0fdf4'):'transparent'}}>{l}</div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(118px,1fr))',gap:1,background:border,borderBottom:'1px solid '+border}}>
        {KPIS.map(([n,l,c],i)=>(
          <div key={i} style={{background:card,padding:'12px 14px',textAlign:'center'}}>
            <div style={{fontSize:20,fontWeight:900,color:c,marginBottom:3}}>{n}</div>
            <div style={{fontSize:8,color:sub,textTransform:'uppercase',letterSpacing:'.05em',lineHeight:1.4}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{padding:20,maxWidth:1200,margin:'0 auto'}}>
        {tab==='todos' && (
          <>
            <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:14}}>
              {([[accent,es?'Recibe orgánicos':'Accepts organics'],[morado,es?'Recibe RAEE':'Accepts e-waste'],['#f59e0b',es?'Orgánicos + RAEE':'Organics + e-waste'],['#94a3b8',es?'Solo secos':'Dry only']] as [string,string][]).map(([c,l],i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:7,fontSize:11,color:sub}}>
                  <div style={{width:11,height:11,borderRadius:'50%',background:c,border:'2px solid #fff',boxShadow:'0 0 0 1px rgba(0,0,0,.12)'}} />{l}
                </div>
              ))}
            </div>
            <div style={box(border,card)}>
              <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.09em',marginBottom:10,color:sub}}>{es?'Sobre estos datos':'About this data'}</div>
              <p style={{fontSize:11,lineHeight:1.7,color:sub}}>
                {es
                  ? <>Los 21 puntos verdes provienen de los datos abiertos del Gobierno de la Ciudad (<b style={{color:text}}>data.buenosaires.gob.ar</b>, actualización mayo 2026). Los materiales aceptados son referenciales: conviene confirmar en cada punto antes de ir.</>
                  : <>The 21 green points come from the City Government open data portal (<b style={{color:text}}>data.buenosaires.gob.ar</b>, updated May 2026). Accepted materials are indicative: confirm at each location before going.</>}
              </p>
            </div>
          </>
        )}

        {tab==='organicos' && (
          <>
            <p style={{fontSize:13,lineHeight:1.7,color:sub,marginBottom:14,maxWidth:780}}>
              {es
                ? <>15 de los 21 puntos verdes de CABA tienen compostera y reciben orgánicos: cáscaras de fruta y verdura, yerba, café, hojas. <b style={{color:text}}>No aceptan carnes, lácteos ni restos con grasa.</b></>
                : <>15 of the 21 green points have composting units and accept organics: fruit and vegetable peels, yerba mate, coffee grounds, leaves. <b style={{color:text}}>They do not accept meat, dairy or greasy waste.</b></>}
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:14}}>
              <div style={box('#bbf7d0',dark?'rgba(34,197,94,.07)':'#f0fdf4')}>
                <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.09em',marginBottom:10,color:'#16a34a'}}>{es?'El hueco que OLIVIA llena':'The gap OLIVIA fills'}</div>
                <p style={{fontSize:11,lineHeight:1.7,color:sub}}>
                  {es
                    ? <>Cuando un vecino deja orgánicos en la compostera, <b style={{color:text}}>ese depósito no queda registrado en ningún sistema</b>. Sin peso, sin origen, sin fecha.<br/><br/>El compost resultante no tiene trazabilidad y por lo tanto no puede convertirse en un activo de carbono. Un compost con origen verificado vale USD 0,70–1,00/kg frente a USD 0,50/kg sin trazabilidad.</>
                    : <>When a resident drops organics into a composting unit, <b style={{color:text}}>that deposit is not recorded in any system</b>. No weight, no origin, no date.<br/><br/>The resulting compost has no traceability and cannot become a carbon asset. Compost with verified origin is worth USD 0.70–1.00/kg versus USD 0.50/kg without traceability.</>}
                </p>
              </div>
              <div style={box('#bae6fd',dark?'rgba(2,132,199,.08)':'#f0f9ff')}>
                <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.09em',marginBottom:10,color:azul}}>{es?'Protocolo de certificación Verra · paso a paso':'Verra certification protocol · step by step'}</div>
                {verraSteps.map(([a,b],i)=>paso(i,a,b,'#e0f2fe',azul))}
                <div style={{fontSize:10,lineHeight:1.7,color:sub,marginTop:12,paddingTop:12,borderTop:'1px solid '+border}}>
                  {es?'Plazo realista: 2 a 3 años desde el inicio. Costo del proceso: USD 50.000 a 150.000.':'Realistic timeline: 2 to 3 years from start. Process cost: USD 50,000 to 150,000.'}<br/>
                  <b style={{color:text}}>{es?'Los datos que se registran hoy son los créditos de 2027.':'The data recorded today are the credits of 2027.'}</b>
                </div>
              </div>
            </div>
          </>
        )}

        {tab==='raee' && (
          <>
            <p style={{fontSize:13,lineHeight:1.7,color:sub,marginBottom:14,maxWidth:780}}>
              {es?'18 puntos verdes reciben RAEE: computadoras, monitores, celulares, tablets, TVs, electrodomésticos y pilas. Se entregan en horario de atención.':'18 green points accept e-waste: computers, monitors, phones, tablets, TVs, appliances and batteries. Delivered during attended hours.'}
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:14}}>
              <div style={box('#e9d5ff',dark?'rgba(147,51,234,.08)':'#faf5ff')}>
                <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.09em',marginBottom:10,color:morado}}>{es?'El valor del RAEE':'The value of e-waste'}</div>
                <p style={{fontSize:11,lineHeight:1.7,color:sub}}>
                  {es
                    ? <>Cada tonelada de RAEE tratada correctamente evita <b style={{color:text}}>3 a 5 tCO₂</b>, porque desplaza la extracción minera de cobre, oro y litio nuevos. Es minería urbana: una tonelada de celulares contiene más oro que una tonelada de mineral de mina.</>
                    : <>Each ton of properly treated e-waste avoids <b style={{color:text}}>3 to 5 tCO₂</b>, because it displaces the mining of new copper, gold and lithium. This is urban mining: one ton of mobile phones contains more gold than one ton of mine ore.</>}
                </p>
                <a href="/raee" style={{display:'inline-block',marginTop:12,fontSize:12,color:morado,fontWeight:700,textDecoration:'none'}}>{es?'Ver la vertical RAEE completa →':'See the full e-waste vertical →'}</a>
              </div>
              <div style={box('#e9d5ff',dark?'rgba(147,51,234,.08)':'#faf5ff')}>
                <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.09em',marginBottom:10,color:morado}}>{es?'El nicho está vacío':'The niche is empty'}</div>
                <p style={{fontSize:11,lineHeight:1.7,color:sub}}>
                  {es
                    ? <>Metodología Verra <b style={{color:text}}>AMS-III.BA + VMR0008</b>, activa desde septiembre 2023.<br/><br/>Hoy existe <b style={{color:text}}>1 solo proyecto verificado en el mundo</b> (India). En América Latina: ninguno.<br/><br/>Compradores naturales: empresas tecnológicas con compromisos públicos de dispositivos circulares.</>
                    : <>Verra methodology <b style={{color:text}}>AMS-III.BA + VMR0008</b>, active since September 2023.<br/><br/>Today there is <b style={{color:text}}>only 1 verified project in the world</b> (India). In Latin America: none.<br/><br/>Natural buyers: technology companies with public circular device commitments.</>}
                </p>
              </div>
            </div>
          </>
        )}

        {tab==='c360' && (
          <>
            <p style={{fontSize:13,lineHeight:1.7,color:sub,marginBottom:14,maxWidth:780}}>
              {es?'El sistema se financia a sí mismo: la venta de compost y de créditos de carbono paga la operación del circuito completo.':'The system funds itself: the sale of compost and carbon credits pays for the operation of the entire circuit.'}
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:14}}>
              <div style={box('#bbf7d0',dark?'rgba(34,197,94,.07)':'#f0fdf4')}>
                <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.09em',marginBottom:10,color:'#16a34a'}}>{es?'Rama orgánicos':'Organics branch'}</div>
                {cOrg.map(([a,b],i)=>paso(i,a,b,'#dcfce7','#16a34a'))}
              </div>
              <div style={box('#e9d5ff',dark?'rgba(147,51,234,.08)':'#faf5ff')}>
                <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.09em',marginBottom:10,color:morado}}>{es?'Rama RAEE':'E-waste branch'}</div>
                {cRaee.map(([a,b],i)=>paso(i,a,b,'#f3e8ff',morado))}
              </div>
            </div>
          </>
        )}
      </div>

      <div style={{padding:'0 20px 28px',maxWidth:1200,margin:'0 auto'}}>
        <div id="olivia-map" style={{width:'100%',height:560,borderRadius:14,border:'1px solid '+border,background:dark?'#0f172a':'#e8e6e1'}} />
        {!ready && <div style={{textAlign:'center',fontSize:11,color:sub,marginTop:10}}>{es?'Cargando mapa…':'Loading map…'}</div>}
      </div>

      <section style={{padding:'40px 20px',textAlign:'center',borderTop:'1px solid '+border,background:'linear-gradient(135deg,rgba(34,197,94,.05),rgba(2,132,199,.02))'}}>
        <h2 style={{fontSize:22,fontWeight:900,marginBottom:10}}>{es?'¿Y si tu edificio no dependiera del punto verde?':'What if your building did not depend on the green point?'}</h2>
        <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:22,maxWidth:500,margin:'0 auto 22px'}}>
          {es?'Con OLIVIA, el retiro va a tu edificio y cada kilo queda verificado con IA y GPS. Sin que nadie tenga que caminar hasta la plaza.':'With OLIVIA, collection comes to your building and every kilo is verified with AI and GPS. Nobody has to walk to the square.'}
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/consorcios" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'14px 32px',color:'#fff',fontSize:13,fontWeight:700,textDecoration:'none'}}>
            {es?'Sumar mi edificio →':'Add my building →'}
          </a>
          <a href="/ciudadano" style={{display:'inline-block',background:'transparent',border:'1px solid '+border,borderRadius:40,padding:'14px 32px',color:text,fontSize:13,fontWeight:700,textDecoration:'none'}}>
            {es?'Soy vecino':'I am a resident'}
          </a>
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
