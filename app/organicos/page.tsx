'use client'
import { useState } from 'react'

export default function Organicos() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(false)
  const [perfil, setPerfil] = useState<'vecino'|'gastro'|'coop'>('vecino')
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#94a3b8' : '#64748b'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const accent = '#22c55e'
  const marron = '#92400e'
  const rojo = '#dc2626'
  const azul = '#0284c7'
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
      <section style={{padding:'48px 20px 32px',textAlign:'center',background:'linear-gradient(135deg,rgba(146,64,14,.06),rgba(34,197,94,.04))',borderBottom:'1px solid '+border}}>
        <div style={{maxWidth:660,margin:'0 auto'}}>
          <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'.3em',color:marron,marginBottom:14}}>
            [ {es?'Diagnóstico abierto · Ciudad de Buenos Aires':'Open diagnosis · Buenos Aires City'} ]
          </div>
          <h1 style={{fontSize:31,fontWeight:900,lineHeight:1.2,marginBottom:16}}>
            {es?'¿Qué pasa realmente con los orgánicos en Buenos Aires?':'What really happens to organic waste in Buenos Aires?'}
          </h1>
          <p style={{fontSize:14,color:sub,lineHeight:1.75,maxWidth:560,margin:'0 auto'}}>
            {es
              ? 'La Ciudad tiene plantas con capacidad para tratar orgánicos que no está usando. Y al mismo tiempo hay orgánico yéndose al relleno todos los días. Falta el dato que conecte las dos cosas.'
              : 'The City has plants with idle capacity to treat organics. At the same time, organics go to landfill every day. The data connecting both is missing.'}
          </p>
        </div>
      </section>

      {/* LAS TRES FRACCIONES */}
      <section style={{padding:'40px 20px',maxWidth:900,margin:'0 auto'}}>
        <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.12em',color:sub,marginBottom:10}}>
          {es?'Primero, cómo se clasifica':'First, how it is classified'}
        </div>
        <h2 style={{fontSize:23,fontWeight:900,marginBottom:18}}>
          {es?'No son dos fracciones. Son tres.':'There are not two fractions. There are three.'}
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:12,marginBottom:18}}>
          {[
            {c:'#1f2937',bgc:dark?'rgba(31,41,55,.35)':'#f1f5f9',n:es?'HÚMEDOS':'WET',s:'FH',d:es?'Lo que queda después de separar todo lo demás. Lo que llamamos "la basura".':'What remains after separating everything else.',dest:es?'Relleno sanitario':'Landfill'},
            {c:'#92400e',bgc:dark?'rgba(146,64,14,.15)':'#fef3c7',n:es?'ORGÁNICOS':'ORGANIC',s:'FO',d:es?'Restos de comida. Legalmente incluye también huesos y restos animales.':'Food scraps. Legally includes bones and animal remains.',dest:es?'Planta de orgánicos del CRC':'City organics plant'},
            {c:'#16a34a',bgc:dark?'rgba(34,197,94,.12)':'#dcfce7',n:es?'SECOS':'DRY',s:'FS',d:es?'Papel, cartón, plástico, vidrio, metal. Limpios y secos.':'Paper, cardboard, plastic, glass, metal.',dest:es?'Centros verdes y cooperativas':'Sorting centres'},
          ].map((f,i)=>(
            <div key={i} style={box(f.c+'40',f.bgc)}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                <span style={{fontSize:15,fontWeight:900,color:f.c}}>{f.n}</span>
                <span style={{fontSize:10,fontFamily:'monospace',color:sub,border:'1px solid '+f.c+'40',borderRadius:4,padding:'1px 6px'}}>{f.s}</span>
              </div>
              <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:10}}>{f.d}</p>
              <div style={{fontSize:11,color:f.c,fontWeight:700}}>→ {f.dest}</div>
            </div>
          ))}
        </div>
        <div style={box(rojo+'40',dark?'rgba(220,38,38,.1)':'#fee2e2')}>
          <div style={{fontSize:11,fontWeight:800,color:rojo,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
            {es?'La trampa que define todo':'The catch that defines everything'}
          </div>
          <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
            {es
              ? <>La normativa dice textualmente que <b style={{color:text}}>la fracción húmeda contiene la fracción orgánica en aquellos casos donde no hubiere una recolección diferenciada</b>. Si no hay un circuito que retire los orgánicos por separado, legalmente viajan dentro de la basura y terminan enterrados. Eso es lo que ocurre por defecto en casi toda la Ciudad.</>
              : <>Regulation states that the wet fraction contains the organic fraction wherever there is no differentiated collection.</>}
          </p>
        </div>
      </section>

      {/* LOS TRES TIPOS DE ORGANICO */}
      <section style={{padding:'32px 20px',maxWidth:900,margin:'0 auto',borderTop:'1px solid '+border}}>
        <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.12em',color:marron,marginBottom:10}}>
          {es?'Lo que casi nadie explica':'What almost nobody explains'}
        </div>
        <h2 style={{fontSize:23,fontWeight:900,marginBottom:8}}>
          {es?'No todos los orgánicos van al mismo lugar':'Not all organics go to the same place'}
        </h2>
        <p style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:18,maxWidth:620}}>
          {es?'Vegetal, poda y animal tienen circuitos distintos, y sólo uno de los tres tiene salida completa hoy.':'Vegetable, pruning and animal have different circuits.'}
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:12,marginBottom:18}}>
          {(es?[
            {ic:'🥬',n:'ORGÁNICO VEGETAL',d:'Cáscaras, frutas, verduras, yerba, café, saquitos de té, cáscara de huevo, carozos.',ok:'Composteras comunitarias · puntos verdes los jueves · ferias los sábados · Centro de Compostaje de Palermo · SERFO · CRC',c:accent},
            {ic:'🍂',n:'PODA Y JARDINERÍA',d:'Hojas, césped recién cortado, flores, ramas.',ok:'Los tres Centros de Compostaje: Palermo, Chacarita e Indoamericano. También composteras y puntos verdes.',c:'#65a30d'},
            {ic:'🦴',n:'ORGÁNICO ANIMAL',d:'Huesos, restos de carne y de pescado, restos de elaboración de comidas.',ok:'Sólo el biorreactor cerrado del CRC, por vía del SERFO. Ninguna boca abierta al vecino lo acepta.',c:rojo},
          ]:[
            {ic:'🥬',n:'VEGETABLE',d:'Peels, fruit, vegetables, yerba mate, coffee, tea bags, eggshells.',ok:'Community composters, green points, markets, Palermo Centre, SERFO, CRC',c:accent},
            {ic:'🍂',n:'PRUNING',d:'Leaves, grass, flowers, branches.',ok:'The three Composting Centres. Also composters and green points.',c:'#65a30d'},
            {ic:'🦴',n:'ANIMAL',d:'Bones, meat and fish remains, cooking residues.',ok:'Only the closed bioreactor at the CRC, via SERFO.',c:rojo},
          ]).map((o,i)=>(
            <div key={i} style={box(o.c+'35',card)}>
              <div style={{fontSize:24,marginBottom:8}}>{o.ic}</div>
              <div style={{fontSize:12,fontWeight:900,color:o.c,marginBottom:6,letterSpacing:'.03em'}}>{o.n}</div>
              <p style={{fontSize:11.5,color:sub,lineHeight:1.65,marginBottom:10}}>{o.d}</p>
              <div style={{fontSize:10.5,color:sub,lineHeight:1.6,paddingTop:8,borderTop:'1px solid '+border}}>
                <b style={{color:o.c}}>{es?'Dónde va':'Where it goes'}: </b>{o.ok}
              </div>
            </div>
          ))}
        </div>
        <div style={box(marron+'40',dark?'rgba(146,64,14,.12)':'#fef3c7')}>
          <div style={{fontSize:11,fontWeight:800,color:marron,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
            {es?'El hueco del orgánico animal':'The animal organics gap'}
          </div>
          <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
            {es
              ? <>La ley incluye <b style={{color:text}}>huesos y restos animales</b> dentro de la fracción orgánica y sólo excluye líquidos y heces de mascotas. Pero las composteras al aire libre no alcanzan la temperatura necesaria y atraen plagas, así que ninguna boca abierta al vecino los acepta. El único lugar que los procesa es el biorreactor cerrado del Centro de Reciclaje. Hoy, para el orgánico animal de un hogar, no existe alternativa.</>
              : <>The law includes bones and animal remains, but no facility open to residents accepts them.</>}
          </p>
        </div>
      </section>

      {/* SELECTOR */}
      <section style={{padding:'32px 20px',maxWidth:900,margin:'0 auto',borderTop:'1px solid '+border}}>
        <h2 style={{fontSize:23,fontWeight:900,marginBottom:6}}>{es?'¿Qué opciones tenés vos?':'What are your options?'}</h2>
        <p style={{fontSize:13,color:sub,marginBottom:18}}>{es?'Elegí tu situación para ver el circuito que te corresponde.':'Choose your situation.'}</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
          {[
            {k:'vecino',l:es?'🏠 Soy vecino':'🏠 Resident'},
            {k:'gastro',l:es?'🍽️ Gastronómico u obligado':'🍽️ Food business'},
            {k:'coop',l:es?'♻️ Cooperativa u operador':'♻️ Cooperative'},
          ].map(o=>(
            <button key={o.k} onClick={()=>setPerfil(o.k as any)} style={{padding:'10px 18px',borderRadius:24,fontSize:13,fontWeight:700,cursor:'pointer',border:'1px solid '+(perfil===o.k?accent:border),background:perfil===o.k?(dark?'rgba(34,197,94,.15)':'#dcfce7'):'transparent',color:perfil===o.k?'#16a34a':sub}}>{o.l}</button>
          ))}
        </div>

        {perfil==='vecino' && (
          <div>
            <div style={{...box(rojo+'40',dark?'rgba(220,38,38,.08)':'#fef2f2'),marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:800,color:rojo,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{es?'Tu paradoja':'Your paradox'}</div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>La reglamentación te <b style={{color:text}}>obliga a separar en origen</b>, pero sólo prevé contenedores de calle para húmedos y secos. <b style={{color:text}}>No existe contenedor de orgánicos en la vía pública para vos.</b> Estás obligado a separar algo que no tenés dónde dejar todos los días.</>
                  : <>You are required to separate at source, but there is no organic street container for residents.</>}
              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
              {(es?[
                {n:'Compostera en tu casa',c:'Siempre',a:'Vegetal',f:'Necesitás espacio y saber hacerlo. En departamento chico no es viable.'},
                {n:'Compostera comunitaria en punto verde',c:'Martes a viernes 14 a 19 · sábados 10 a 18',a:'Vegetal',f:'El compostaje ocurre ahí mismo. Hay 48 composteras en 15 puntos verdes y el Velódromo.'},
                {n:'Punto verde · día de orgánicos',c:'Jueves de 14 a 19',a:'Vegetal',f:'Diecinueve puntos. Una ventana de cinco horas por semana.'},
                {n:'Feria de la Ciudad',c:'Sábados de 8 a 14',a:'Vegetal',f:'Catorce emplazamientos. Una vez por semana.'},
                {n:'Centro de Compostaje de Palermo',c:'Lunes a viernes de 9 a 13',a:'Vegetal y poda',f:'Sin límite de recepción, a granel o en bolsa transparente. Pero en horario laboral y sólo en Palermo.'},
                {n:'No hacer nada',c:'Todos los días',a:'Todo',f:'Va con la basura al relleno. Es lo que ocurre en la enorme mayoría de los hogares.'},
              ]:[
                {n:'Home composter',c:'Always',a:'Vegetable',f:'Requires space and knowledge.'},
                {n:'Community composter',c:'Tue-Fri 2-7pm · Sat 10-6',a:'Vegetable',f:'Composting happens on site. 48 units across 15 green points and the Velodrome.'},
                {n:'Green point organics day',c:'Thursdays 2-7pm',a:'Vegetable',f:'Nineteen points. A five-hour weekly window.'},
                {n:'City market',c:'Saturdays 8am-2pm',a:'Vegetable',f:'Fourteen locations, once a week.'},
                {n:'Palermo Composting Centre',c:'Mon-Fri 9am-1pm',a:'Vegetable and pruning',f:'No quantity limit, but working hours and Palermo only.'},
                {n:'Do nothing',c:'Every day',a:'Everything',f:'Goes to landfill. What happens in most households.'},
              ]).map((o,i)=>(
                <div key={i} style={{background:card,border:'1px solid '+border,borderRadius:10,padding:'14px 16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:800,color:text}}>{o.n}</span>
                    <span style={{fontSize:11,color:accent,fontWeight:700}}>{o.c}</span>
                  </div>
                  <div style={{fontSize:11,color:sub,marginBottom:4}}>{es?'Acepta':'Accepts'}: {o.a}</div>
                  <div style={{fontSize:11.5,color:sub,lineHeight:1.6,fontStyle:'italic'}}>{o.f}</div>
                </div>
              ))}
            </div>
            {/* QUE PASA DESPUES */}
            <h3 style={{fontSize:15,fontWeight:800,marginBottom:6,marginTop:22}}>{es?'¿Y qué pasa después de que lo dejás?':'And what happens after you drop it off?'}</h3>
            <p style={{fontSize:12.5,color:sub,lineHeight:1.7,marginBottom:14}}>
              {es?'Esta es la parte que casi nunca se cuenta, y es la que le da sentido al esfuerzo.':'This is the part almost never explained, and it is what gives the effort meaning.'}
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
              {(es?[
                {ic:'🪱',t:'Si lo dejaste en una compostera comunitaria',d:'El compostaje ocurre ahí mismo, dentro de la compostera. No se transporta a ningún lado. Hay 48 composteras distribuidas en 15 puntos verdes y en el Velódromo de Palermo. El compost que sale queda en el barrio.',c:accent},
                {ic:'🚛',t:'Si lo dejaste un jueves en un punto verde',d:'Se recolecta de forma diferenciada y va a la planta de orgánicos del Centro de Reciclaje de la Ciudad, en Villa Soldati. Ahí se mezcla con restos de poda para lograr la relación carbono-nitrógeno, pasa doce días en un biorreactor cerrado y después a maduración.',c:azul},
                {ic:'🌳',t:'Y el compost vuelve',d:'El compost que produce el Centro de Reciclaje se destina a los parques y plazas de la Ciudad. No se vende. La materia orgánica que sacaste de tu cocina termina alimentando el suelo de un espacio verde.',c:'#65a30d'},
                {ic:'🍂',t:'Si es poda o restos de jardín',d:'Van a los tres Centros de Compostaje: Palermo en el Velódromo, Chacarita y Parque Indoamericano. Procesan restos verdes de espacios públicos y también reciben de vecinos. El compost vuelve al mantenimiento de los espacios verdes.',c:'#65a30d'},
              ]:[
                {ic:'🪱',t:'If you left it in a community composter',d:'Composting happens right there, inside the composter. Nothing is transported. There are 48 composters across 15 green points and the Palermo Velodrome.',c:accent},
                {ic:'🚛',t:'If you left it at a green point on Thursday',d:'It is collected separately and taken to the City Recycling Centre organics plant in Villa Soldati, where it spends twelve days in a closed bioreactor.',c:azul},
                {ic:'🌳',t:'And the compost returns',d:'The compost produced goes to the City parks and squares. It is not sold.',c:'#65a30d'},
                {ic:'🍂',t:'If it is pruning or garden waste',d:'It goes to the three Composting Centres: Palermo, Chacarita and Parque Indoamericano.',c:'#65a30d'},
              ]).map((p,i)=>(
                <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',background:card,border:'1px solid '+p.c+'25',borderRadius:11,padding:'14px 16px'}}>
                  <span style={{fontSize:22,lineHeight:1,flexShrink:0}}>{p.ic}</span>
                  <div>
                    <div style={{fontSize:12.5,fontWeight:800,color:p.c,marginBottom:4}}>{p.t}</div>
                    <div style={{fontSize:11.5,color:sub,lineHeight:1.7}}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* LINK AL MAPA */}
            <a href="/mapa" style={{display:'block',textDecoration:'none',background:dark?'rgba(2,132,199,.10)':'rgba(2,132,199,.05)',border:'1px solid rgba(2,132,199,.28)',borderRadius:12,padding:'18px',marginBottom:16}}>
              <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                <span style={{fontSize:26,lineHeight:1,flexShrink:0}}>🗺️</span>
                <div>
                  <div style={{fontSize:14,fontWeight:800,color:azul,marginBottom:5}}>
                    {es?'¿Cuál te queda más cerca?':'Which one is closest to you?'}
                  </div>
                  <p style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:8}}>
                    {es?'El mapa muestra los 21 puntos verdes de la Ciudad con lo que recibe cada uno: cuáles tienen compostera de orgánicos, cuáles aceptan electrónicos y cuáles sólo material seco.':'The map shows the 21 green points and what each one accepts.'}
                  </p>
                  <span style={{fontSize:12,color:azul,fontWeight:700}}>{es?'Ver el mapa de puntos verdes →':'View the green points map →'}</span>
                </div>
              </div>
            </a>

            <div style={box(accent+'40',dark?'rgba(34,197,94,.1)':'#dcfce7')}>
              <div style={{fontSize:11,fontWeight:800,color:'#16a34a',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
                {es?'Si ya llevás tus orgánicos, medilo':'If you already take your organics, measure it'}
              </div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>Miles de vecinos ya llevan sus orgánicos al punto verde o a la feria. Ese esfuerzo <b style={{color:text}}>no queda registrado en ningún lado</b>: no hay dato de cuánto se lleva, ni de dónde vino, ni de cuánto metano se evitó. OLIVIA no te pide que cambies lo que hacés. Te pide que lo registres, para que por primera vez exista el dato.</>
                  : <>Thousands already take their organics. That effort is recorded nowhere. OLIVIA does not ask you to change what you do, only to record it.</>}
              </p>
            </div>
          </div>
        )}

        {perfil==='gastro' && (
          <div>
            <div style={{...box(accent+'40',dark?'rgba(34,197,94,.1)':'#dcfce7'),marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:800,color:'#16a34a',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
                {es?'La asimetría que conviene conocer':'The asymmetry worth knowing'}
              </div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>Tu fracción húmeda <b style={{color:text}}>la pagás vos</b>: contratás un transportista habilitado por CEAMSE y costeás traslado y disposición final. Pero la fracción orgánica, si estás en la ruta del SERFO, <b style={{color:text}}>la retira el Gobierno de la Ciudad sin costo</b>. Cada kilo que pasa de una fracción a la otra es un kilo que dejás de pagar.</>
                  : <>You pay for your wet fraction. The organic fraction, on the SERFO route, is collected free by the City.</>}
              </p>
            </div>
            <h3 style={{fontSize:15,fontWeight:800,marginBottom:12}}>{es?'Qué es el SERFO':'What SERFO is'}</h3>
            <div style={{...box(border,card),marginBottom:14}}>
              <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
                {es
                  ? <>Servicio Especial de Recolección de la Fracción Orgánica. Lo presta el propio Gobierno de la Ciudad por la Ley 4.120. <b style={{color:text}}>Es a pedido, no automático</b>: el generador lo solicita y la Dirección General de Reciclado y Economía Circular evalúa por localización, cantidad y composición del material. Si te lo otorgan, separás en origen, acopiás en recipientes identificados a granel o en bolsa transparente, y el operador retira dejando constancia con día, hora y cantidad.</>
                  : <>Special Organic Fraction Collection Service, provided by the City under Law 4.120. On request, not automatic.</>}
              </p>
            </div>
            <div style={{...box(rojo+'40',dark?'rgba(220,38,38,.08)':'#fef2f2'),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:rojo,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
                {es?'Si no te otorgan el SERFO':'If SERFO is not granted'}
              </div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es?'La norma es explícita: el orgánico se acopia y se dispone junto con la fracción húmeda. Va al relleno, y lo pagás vos.':'Regulation is explicit: organics are disposed of with the wet fraction. To landfill, at your cost.'}
              </p>
            </div>
            <div style={box(marron+'40',dark?'rgba(146,64,14,.1)':'#fef3c7')}>
              <div style={{fontSize:11,fontWeight:800,color:marron,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
                {es?'Una obligación de 2011 que nadie verifica':'A 2011 obligation nobody verifies'}
              </div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>La Resolución 234 de la Agencia de Protección Ambiental, del año 2011, ya obligaba a los gastronómicos a separar la fracción orgánica. Pero <b style={{color:text}}>nadie verifica si se separó ni si llegó a destino</b>: alcanza con exhibir el contrato del transportista y los certificados de CEAMSE. No existe hoy ningún dato que permita demostrar que la fracción orgánica de un local inscripto fue efectivamente separada y tratada.</>
                  : <>APRA Resolution 234 of 2011 already required separation. But nobody verifies whether it happened.</>}
              </p>
            </div>
          </div>
        )}

        {perfil==='coop' && (
          <div>
            <div style={{...box(azul+'40',dark?'rgba(2,132,199,.1)':'#e0f2fe'),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:azul,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
                {es?'La figura del Acopiador':'The Acopiador figure'}
              </div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>El artículo 10.3 de la Resolución 1177/2023 crea una figura poco conocida: un Generador Especial que esté en la ruta del SERFO puede solicitar el carácter de <b style={{color:text}}>Acopiador para recibir residuos orgánicos de terceros</b>, tanto de vecinos como de otros generadores. Puede además pedir la colocación de un recipiente en el espacio público, y no es responsable por errores de separación de terceros.</>
                  : <>Article 10.3 lets a Special Generator on the SERFO route request Acopiador status to receive organics from third parties.</>}
              </p>
            </div>
            <div style={{...box(accent+'40',dark?'rgba(34,197,94,.1)':'#dcfce7'),marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:800,color:'#16a34a',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
                {es?'Y el criterio de habilitación es la trazabilidad':'And the criterion is traceability'}
              </div>
              <p style={{fontSize:13,color:sub,lineHeight:1.75}}>
                {es
                  ? <>La norma establece que la Dirección General de Reciclado y Economía Circular evalúa la habilitación <b style={{color:text}}>«en base a los criterios de trazabilidad del material, protocolos de operación y requerimientos técnicos»</b>. El requisito legal para ser Acopiador es exactamente lo que provee un sistema de verificación digital.</>
                  : <>Habilitation is evaluated on material traceability criteria, operating protocols and technical requirements.</>}
              </p>
            </div>
            <div style={box(border,card)}>
              <div style={{fontSize:11,fontWeight:800,color:sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}}>{es?'El camino':'The path'}</div>
              <div style={{fontSize:13,color:sub,lineHeight:2}}>
                {es?'1 · Estar inscripto como Generador Especial en el ReGE':'1 · Register as Special Generator'}<br/>
                {es?'2 · Solicitar ser atendido por el SERFO':'2 · Request SERFO'}<br/>
                {es?'3 · Solicitar el carácter de Acopiador acreditando trazabilidad':'3 · Request Acopiador status evidencing traceability'}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* MEDIR Y TRAZAR */}
      <section style={{padding:'40px 20px',maxWidth:900,margin:'0 auto',borderTop:'1px solid '+border}}>
        <div style={{fontSize:10,fontWeight:800,textTransform:'uppercase',letterSpacing:'.12em',color:accent,marginBottom:10}}>
          {es?'Qué hace OLIVIA':'What OLIVIA does'}
        </div>
        <h2 style={{fontSize:23,fontWeight:900,marginBottom:8}}>
          {es?'El sistema existe. Falta el dato.':'The system exists. The data is missing.'}
        </h2>
        <p style={{fontSize:13.5,color:sub,lineHeight:1.75,marginBottom:20,maxWidth:640}}>
          {es
            ? 'Hay plantas, hay rutas de recolección, hay una figura legal para acopiar y hay miles de vecinos que ya separan. Lo que no existe es el registro: nadie sabe cuánto entra por cada boca, de dónde vino, ni si terminó efectivamente convertido en abono. Sin ese dato no se puede dimensionar la capacidad ociosa ni demostrar el metano evitado.'
            : 'Plants, collection routes, a legal figure for accumulation and thousands of residents already separating. What is missing is the record.'}
        </p>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>
          {(es?[
            {i:'📸',t:'Origen verificado',d:'Foto del residuo con una moneda de referencia. La inteligencia artificial estima el volumen y valida la imagen. Ubicación y hora automáticas.'},
            {i:'🚶',t:'Transferencia verificada',d:'Al entregar se escanea el QR y se toma una segunda foto. Queda registrado quién lo llevó y a qué boca de recepción.'},
            {i:'⚖️',t:'Peso verificado',d:'Balanza conectada en el punto de acopio o en la planta. El peso real, no el declarado.'},
            {i:'🌱',t:'Procesamiento verificado',d:'El registro sólo se cierra cuando se confirma que el material se transformó en abono. El peso solo no prueba nada.'},
          ]:[
            {i:'📸',t:'Verified origin',d:'Photo with a reference coin. AI estimates volume. Location and time automatic.'},
            {i:'🚶',t:'Verified transfer',d:'QR scan and second photo at drop-off.'},
            {i:'⚖️',t:'Verified weight',d:'Connected scale. Real weight, not declared.'},
            {i:'🌱',t:'Verified processing',d:'The record only closes when the material is confirmed as compost.'},
          ]).map((p,i)=>(
            <div key={i} style={{display:'flex',gap:14,alignItems:'flex-start',background:card,border:'1px solid '+border,borderRadius:12,padding:'16px 18px'}}>
              <span style={{fontSize:25,lineHeight:1,flexShrink:0}}>{p.i}</span>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:accent,marginBottom:4}}>{p.t}</div>
                <div style={{fontSize:12.5,color:sub,lineHeight:1.7}}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12,marginBottom:18}}>
          {(es?[
            {t:'Cuánto se genera',d:'Por boca de recepción, por barrio, por tipo de orgánico.'},
            {t:'Cuánto se desvía',d:'Kilos que efectivamente no llegaron al relleno.'},
            {t:'Cuánto metano se evita',d:'Calculado sobre kilos verificados, no estimados.'},
            {t:'Cuánta capacidad ociosa hay',d:'El dato que permite dimensionar cuánto más se puede tratar.'},
          ]:[
            {t:'How much is generated',d:'Per collection point, per neighbourhood, per type.'},
            {t:'How much is diverted',d:'Kilos that did not reach landfill.'},
            {t:'Methane avoided',d:'Calculated on verified kilos.'},
            {t:'Idle capacity',d:'How much more could be treated.'},
          ]).map((k,i)=>(
            <div key={i} style={{background:dark?'rgba(34,197,94,.06)':'#f0fdf4',border:'1px solid '+accent+'25',borderRadius:10,padding:14}}>
              <div style={{fontSize:12.5,fontWeight:800,color:'#16a34a',marginBottom:5}}>{k.t}</div>
              <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{k.d}</div>
            </div>
          ))}
        </div>
        <div style={box(border,card)}>
          <div style={{fontSize:11,fontWeight:800,color:sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>
            {es?'Sobre la certificación de carbono':'On carbon certification'}
          </div>
          <p style={{fontSize:12.5,color:sub,lineHeight:1.75}}>
            {es
              ? <>Los datos verificados son la base de un futuro proyecto de certificación bajo estándar Verra. Ese proceso <b style={{color:text}}>lleva entre dos y tres años</b> e incluye validación por auditor acreditado y entre doce y veinticuatro meses acumulando registros. Preferimos decirlo con claridad: hoy OLIVIA no emite créditos ni promete ingresos. Lo que sí hace, desde el primer día, es generar el dato que hoy no existe.</>
              : <>Verified data is the basis for a future Verra certification project. That process takes two to three years. Today OLIVIA does not issue credits or promise income.</>}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'40px 20px',textAlign:'center',borderTop:'1px solid '+border,background:'linear-gradient(135deg,rgba(34,197,94,.05),rgba(146,64,14,.03))'}}>
        <h2 style={{fontSize:21,fontWeight:900,marginBottom:10}}>{es?'Sumate a medir lo que ya se hace':'Help measure what already happens'}</h2>
        <p style={{fontSize:13,color:sub,lineHeight:1.7,maxWidth:520,margin:'0 auto 22px'}}>
          {es?'Si ya llevás tus orgánicos, registralo. Si sos cooperativa, operador o local obligado, hablemos de cómo medir y trazar lo que ya movés.':'If you already take your organics, record it. If you are an operator, let us talk.'}
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/registro" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:40,padding:'14px 32px',color:'#fff',fontSize:13,fontWeight:700,textDecoration:'none'}}>
            {es?'Soy vecino · registrar gratis →':'Resident · record for free →'}
          </a>
          <a href="/nda" style={{background:'transparent',border:'1px solid '+border,borderRadius:40,padding:'14px 32px',color:text,fontSize:13,fontWeight:700,textDecoration:'none'}}>
            {es?'Soy operador u obligado':'Operator or obligated generator'}
          </a>
        </div>
        <div style={{marginTop:22,fontSize:10.5,color:sub,maxWidth:620,margin:'22px auto 0',lineHeight:1.7}}>
          {es
            ? 'Fuentes: Ley 1.854 · Ley 4.120 · Resolución 1177/MEPHUGC/23 y anexos · Resolución 234/APRA/2011 · datos abiertos y comunicaciones oficiales del Gobierno de la Ciudad de Buenos Aires.'
            : 'Sources: Law 1.854 · Law 4.120 · Resolution 1177/MEPHUGC/23 · Resolution 234/APRA/2011 · Buenos Aires City open data.'}
        </div>
      </section>

      <footer style={{borderTop:'1px solid '+border,padding:'32px 24px',textAlign:'center'}}>
        <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:44,height:44,objectFit:'contain',display:'block',margin:'0 auto 10px'}} /></a>
        <div style={{fontSize:13,fontWeight:800,color:text,marginBottom:6}}>OLIVIA Circulab</div>
        <div style={{fontSize:10,color:sub,lineHeight:1.6,maxWidth:400,margin:'0 auto 16px'}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:12}}>
          <a href="/metamorfosis" style={{fontSize:11,color:sub,textDecoration:'none'}}>Metamorfosis</a>
          <a href="/mapa" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Mapa':'Map'}</a>
          <a href="/ciudadano" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Ciudadano':'Citizen'}</a>
          <a href="/grandes-generadores" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Grandes Generadores':'Large Generators'}</a>
          <a href="/nda" style={{fontSize:11,color:sub,textDecoration:'none'}}>NDA</a>
        </div>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',letterSpacing:'.05em',opacity:.7}}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
      </footer>
    </div>
  )
}
