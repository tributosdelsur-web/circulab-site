'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'

const STORAGE_KEY = 'olivia_registro_data'

const TIPOS = [
 {
   v:'organico', l:'Orgánico', icon:'🌿',
   factor:1.8, olv:180,
   descripcion:'Restos de comida, cáscaras, yerba, posos de café',
   cooperativas:['RUO Caballito — Yerbal 1473','El Ceibo Palermo — Paraguay 4742','CRC Villa Soldati — Ana María Janer 2750'],
   bolsa:'Verra VCS VM0036',
   consejo:'Usá una cubeta de 30L. Poné una moneda de $10 al lado para la foto.',
   disposiciones:[
     {v:'punto_verde',l:'Llevar a punto verde / planta'},
     {v:'compost',l:'Compostar en casa (21 días)'},
     {v:'lombricompost',l:'Lombricompostaje en casa (45 días)'},
   ]
 },
 {
   v:'plastico', l:'Plástico', icon:'♻️',
   factor:1.5, olv:150,
   descripcion:'Botellas PET, envases, bolsas limpias',
   cooperativas:['El Ceibo Palermo — Paraguay 4742','Cooperativa AVE CABA','Cooperativa CURA CABA'],
   bolsa:'Gold Standard AMS-III.BA',
   consejo:'Aplastá las botellas y enjuagalas antes.',
   disposiciones:[{v:'punto_verde',l:'Llevar a punto verde / cooperativa'}]
 },
 {
   v:'papel', l:'Papel y cartón', icon:'📄',
   factor:0.9, olv:90,
   descripcion:'Diarios, revistas, cajas, cartones',
   cooperativas:['MTE Recuperadores Urbanos','Cooperativa 2 de Abril CABA','Cartoneros organizados'],
   bolsa:'Gold Standard AMS-III.AJ',
   consejo:'Atá el cartón en paquetes. Los diarios mojados valen menos.',
   disposiciones:[{v:'punto_verde',l:'Llevar a punto verde / cartonero'}]
 },
 {
   v:'vidrio', l:'Vidrio', icon:'🍾',
   factor:0.3, olv:30,
   descripcion:'Botellas, frascos, envases de vidrio',
   cooperativas:['Puntos verdes GCBA','Ecovidrio Argentina','Cooperativa Los Piletones'],
   bolsa:'Verra Registry',
   consejo:'El vidrio roto también vale. Envolvelo en papel.',
   disposiciones:[{v:'punto_verde',l:'Llevar a punto verde'}]
 },
 {
   v:'metal', l:'Metal', icon:'🔩',
   factor:8.0, olv:800,
   descripcion:'Latas de aluminio, chatarra, metales',
   cooperativas:['Chatarreros independientes','Cooperativa Reciclando Sueños','Plantas fundición zona sur'],
   bolsa:'Climate Action Reserve',
   consejo:'El metal tiene el factor más alto — 800 OLV por kg.',
   disposiciones:[{v:'punto_verde',l:'Llevar a chatarrería / cooperativa'}]
 },
 {
   v:'aceite', l:'Aceite usado', icon:'🛢️',
   factor:2.5, olv:250,
   descripcion:'Aceite vegetal de cocina usado',
   cooperativas:['Puntos EcoAceite GCBA','Puntos verdes CABA','Cooperativa Biofuel BA'],
   bolsa:'Verra + AMS-III.AK',
   consejo:'Guardalo en la botella de origen. 1 litro = aprox 0.9kg.',
   disposiciones:[{v:'punto_verde',l:'Llevar a punto EcoAceite'}]
 },
 {
   v:'textil', l:'Textil', icon:'👕',
   factor:5.5, olv:550,
   descripcion:'Ropa, telas, calzado en buen estado',
   cooperativas:['Cáritas Buenos Aires','Cruz Roja Argentina','Cooperativa La Juanita'],
   bolsa:'Gold Standard Textile Exchange',
   consejo:'Solo ropa limpia y usable.',
   disposiciones:[{v:'punto_verde',l:'Llevar a ropero comunitario'}]
 },
]

export default function Registrar() {
 const [uid, setUid] = useState('')
 const [paso, setPaso] = useState(1)
 const [tipo, setTipo] = useState<any>(null)
 const [puntoEntrega, setPuntoEntrega] = useState('')
 const [disposicion, setDisposicion] = useState('')
 const [kg, setKg] = useState(1)
 const [fotoOrigen, setFotoOrigen] = useState<File|null>(null)
 const [fotoOrigenPreview, setFotoOrigenPreview] = useState<string|null>(null)
 const [fotoEntrega, setFotoEntrega] = useState<File|null>(null)
 const [fotoEntregaPreview, setFotoEntregaPreview] = useState<string|null>(null)
 const [latOrigen, setLatOrigen] = useState<number|null>(null)
 const [lngOrigen, setLngOrigen] = useState<number|null>(null)
 const [latEntrega, setLatEntrega] = useState<number|null>(null)
 const [lngEntrega, setLngEntrega] = useState<number|null>(null)
 const [enviando, setEnviando] = useState(false)
 const [resultado, setResultado] = useState<any>(null)
 const [publicandoOlivia, setPublicandoOlivia] = useState(false)
 const [publicadoOlivia, setPublicadoOlivia] = useState(false)
 const [mostrarFeedback, setMostrarFeedback] = useState(false)
 const [feedback, setFeedback] = useState('')
 const fotoOrigenRef = useRef<HTMLInputElement>(null)
 const fotoEntregaRef = useRef<HTMLInputElement>(null)

 useEffect(()=>{
   supabase.auth.getSession().then(({data})=>{
     if(data.session?.user?.id) setUid(data.session.user.id)
   })
   const guardado = localStorage.getItem(STORAGE_KEY)
   if(guardado) {
     try {
       const p = JSON.parse(guardado)
       if(p.paso) setPaso(p.paso)
       if(p.tipo) setTipo(p.tipo)
       if(p.puntoEntrega) setPuntoEntrega(p.puntoEntrega)
       if(p.disposicion) setDisposicion(p.disposicion)
       if(p.kg) setKg(p.kg)
     } catch(e){}
   }
   navigator.geolocation?.getCurrentPosition(pos=>{
     setLatOrigen(pos.coords.latitude)
     setLngOrigen(pos.coords.longitude)
   })
 },[])

 useEffect(()=>{
   if(resultado) return
   localStorage.setItem(STORAGE_KEY, JSON.stringify({paso,tipo,puntoEntrega,disposicion,kg}))
 },[paso,tipo,puntoEntrega,disposicion,kg])

 function atras() {
   if(paso>1) {
     setPaso(p=>p-1)
     window.scrollTo(0,0)
   }
 }

 function siguiente() {
   setPaso(p=>p+1)
   window.scrollTo(0,0)
 }

 function handleFotoOrigen(file: File) {
   setFotoOrigen(file)
   const reader = new FileReader()
   reader.onload = e => setFotoOrigenPreview(e.target?.result as string)
   reader.readAsDataURL(file)
 }

 function handleFotoEntrega(file: File) {
   setFotoEntrega(file)
   const reader = new FileReader()
   reader.onload = e => setFotoEntregaPreview(e.target?.result as string)
   reader.readAsDataURL(file)
   navigator.geolocation?.getCurrentPosition(pos=>{
     setLatEntrega(pos.coords.latitude)
     setLngEntrega(pos.coords.longitude)
   })
 }

 const diasCompost = disposicion==='lombricompost'?45:21

 async function enviar() {
   if(!uid){window.location.href='/login';return}
   setEnviando(true)
   let foto_url = null
   let foto_entrega_url = null

   if(fotoOrigen) {
     const nombre = `${uid}-origen-${Date.now()}`
     await supabase.storage.from('residuos-fotos').upload(nombre, fotoOrigen)
     const {data} = supabase.storage.from('residuos-fotos').getPublicUrl(nombre)
     foto_url = data.publicUrl
   }
   if(fotoEntrega) {
     const nombre = `${uid}-entrega-${Date.now()}`
     await supabase.storage.from('residuos-fotos').upload(nombre, fotoEntrega)
     const {data} = supabase.storage.from('residuos-fotos').getPublicUrl(nombre)
     foto_entrega_url = data.publicUrl
   }

   const olv = Math.round(tipo.factor * kg * 100)
   const co2 = (tipo.factor * kg).toFixed(2)

   // Determinar status según disposición
   const esCompost = disposicion==='compost'||disposicion==='lombricompost'
   const status = fotoEntrega&&!esCompost ? 'en_camino' : 'pendiente'
   const fecha_compost = esCompost ? new Date(Date.now() + diasCompost*24*60*60*1000).toISOString() : null

   const {data: residuo} = await supabase.from('residuos').insert({
     usuario_id: uid,
     tipo: tipo.v,
     kg,
     foto_url,
     foto_entrega_url,
     lat_origen: latOrigen,
     lng_origen: lngOrigen,
     lat_entrega: latEntrega,
     lng_entrega: lngEntrega,
     punto_entrega: puntoEntrega,
     metodo_disposicion: disposicion,
     fecha_compost,
     dias_compost: esCompost ? diasCompost : null,
     status
   }).select().single()

   await supabase.from('wallet_transacciones').insert({
     usuario_id: uid,
     tipo: 'registro',
     monto_olv: olv,
     descripcion: `Registro ${tipo.l} ${kg}kg — OLV pendientes hasta verificación`
   })

   localStorage.removeItem(STORAGE_KEY)
   setEnviando(false)
   setResultado({olv, co2, residuoId: residuo?.id, foto_url, status, esCompost})
 }

 async function publicarEnOlivia() {
   if(!uid) return
   setPublicandoOlivia(true)
   const olv_ganados = 20
   await supabase.from('posts').insert({
     usuario_id: uid,
     contenido: `Acabo de registrar ${kg}kg de ${tipo?.l} 🌿 Gané ${resultado?.olv} OLV pendientes · ${resultado?.co2}kg CO2eq evitados`,
     foto_url: resultado?.foto_url||null,
     tipo: 'accion',
     olv_ganados
   })
   await supabase.from('wallet_transacciones').insert({
     usuario_id: uid,
     tipo: 'post',
     monto_olv: olv_ganados,
     descripcion: 'Post publicado en la comunidad OLIVIA'
   })
   setPublicadoOlivia(true)
   setPublicandoOlivia(false)
 }

 async function compartirEnRedes() {
   const texto = `Acabo de registrar ${kg}kg de ${tipo?.l} en OLIVIA Circulab 🌿\n\nGané ${resultado?.olv} OLV · ${resultado?.co2}kg CO2eq evitados\n\n¿Vos también reciclás? → oliviacirculab.com.ar\n\n#OliviaCirculab #ReFi #Reciclaje #CABA`
   if(navigator.share) {
     try {
       await navigator.share({
         title: 'Registré mi residuo en OLIVIA Circulab',
         text: texto,
         url: 'https://circulab-site.vercel.app'
       })
     } catch(e) {}
   } else {
     await navigator.clipboard.writeText(texto)
     alert('Texto copiado — pegalo en Instagram, Facebook o X')
   }
 }

 async function enviarFeedback() {
   if(!feedback) return
   await supabase.from('feedback').insert({usuario_id:uid||null,mensaje:feedback,pagina:'registrar'})
   setFeedback('')
   setMostrarFeedback(false)
 }

 const pasos = ['Tipo','Punto','Foto origen','Foto entrega','Confirmar']
 const progreso = ((paso-1)/5)*100

 // PANTALLA ÉXITO
 if(resultado) return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px 20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
     <div style={{maxWidth:400,width:'100%'}}>
       <div style={{fontSize:64,marginBottom:16}}>🌿</div>
       <div style={{fontSize:24,fontWeight:900,marginBottom:8}}>¡Registrado!</div>
       <div style={{fontSize:14,color:'#64748b',marginBottom:24,lineHeight:1.6}}>
         {resultado.esCompost
           ? `Tu residuo fue registrado. Los OLV se acreditarán en ${diasCompost} días cuando el compostaje esté completo.`
           : 'Tu residuo fue registrado. Los OLV se acreditarán cuando verifiquemos la disposición final.'}
       </div>

       {/* KPIs */}
       <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.3)',borderRadius:16,padding:20,marginBottom:20}}>
         <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
           <div style={{background:'rgba(34,197,94,0.08)',borderRadius:10,padding:'12px',textAlign:'center'}}>
             <div style={{fontSize:28,fontWeight:900,color:'#22c55e'}}>{resultado.olv}</div>
             <div style={{fontSize:10,color:'#64748b',marginTop:2}}>OLV pendientes</div>
           </div>
           <div style={{background:'rgba(59,130,246,0.08)',borderRadius:10,padding:'12px',textAlign:'center'}}>
             <div style={{fontSize:28,fontWeight:900,color:'#3b82f6'}}>{resultado.co2}</div>
             <div style={{fontSize:10,color:'#64748b',marginTop:2}}>kg CO2eq evitados</div>
           </div>
         </div>

         {/* Preview foto */}
         {resultado.foto_url&&(
           <img src={resultado.foto_url} alt="" style={{width:'100%',borderRadius:10,maxHeight:200,objectFit:'cover',marginBottom:12}} />
         )}

         <div style={{fontSize:11,color:'#64748b',lineHeight:1.5,padding:'10px',background:'rgba(245,158,11,0.06)',borderRadius:8,border:'1px solid rgba(245,158,11,0.2)'}}>
           {resultado.esCompost
             ? `⏳ OLV pendientes · Se acreditan en ${diasCompost} días cuando el compostaje esté completo`
             : '⏳ OLV pendientes · Se acreditan cuando verificamos que el residuo llegó a la planta'}
         </div>
       </div>

       {/* Botones de publicación */}
       <div style={{display:'flex',flexDirection:'column',gap:10}}>
         {!publicadoOlivia?(
           <button onClick={publicarEnOlivia} disabled={publicandoOlivia}
             style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
             {publicandoOlivia?'Publicando...':'🌿 Publicar en OLIVIA +20 OLV'}
           </button>
         ):(
           <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:12,padding:'14px',fontSize:13,color:'#22c55e',fontWeight:700}}>
             ✅ Publicado en la comunidad OLIVIA
           </div>
         )}

         <button onClick={compartirEnRedes}
           style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
           📱 Compartir en Instagram · Facebook · X
         </button>

         <a href="/dashboard" style={{color:'#64748b',padding:'10px',borderRadius:12,fontSize:13,textDecoration:'none',display:'block'}}>
           Ver mi panel →
         </a>
       </div>
     </div>
   </div>
 )

 return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px 20px 80px'}}>
     <div style={{maxWidth:500,margin:'0 auto'}}>

       {/* Header */}
       <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
         <div style={{display:'flex',alignItems:'center',gap:8}}>
           {paso>1&&(
             <button onClick={atras}
               style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px 10px',color:'#94a3b8',fontSize:13,cursor:'pointer'}}>
               ←
             </button>
           )}
           <a href="/dashboard" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
             <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
             <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>OLIVIA Circulab</span>
           </a>
         </div>
         <div style={{fontSize:11,color:'#64748b'}}>Paso {paso} de 5</div>
       </div>

       {/* Progreso */}
       <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:99,marginBottom:8}}>
         <div style={{height:'100%',width:progreso+'%',background:'linear-gradient(90deg,#22c55e,#16a34a)',borderRadius:99,transition:'width 0.3s'}} />
       </div>
       <div style={{display:'flex',justifyContent:'space-between',marginBottom:20}}>
         {pasos.map((p,i)=>(
           <div key={p} style={{fontSize:9,color:i+1<=paso?'#22c55e':'#64748b',fontWeight:i+1===paso?700:400}}>{p}</div>
         ))}
       </div>

       {/* PASO 1 — Tipo */}
       {paso===1&&(
         <div>
           <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>¿Qué vas a registrar? ♻️</div>
           <div style={{fontSize:12,color:'#64748b',marginBottom:20}}>Elegí el tipo de residuo</div>
           <div style={{display:'flex',flexDirection:'column',gap:10}}>
             {TIPOS.map(t=>(
               <button key={t.v} onClick={()=>{setTipo(t);setDisposicion('');siguiente()}}
                 style={{background:tipo?.v===t.v?'rgba(34,197,94,0.1)':'#111827',border:`1px solid ${tipo?.v===t.v?'rgba(34,197,94,0.5)':'rgba(255,255,255,0.06)'}`,borderRadius:14,padding:'16px',cursor:'pointer',textAlign:'left',transition:'all 0.15s'}}>
                 <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
                   <span style={{fontSize:24}}>{t.icon}</span>
                   <div>
                     <div style={{fontSize:14,fontWeight:700,color:'#f1f5f9'}}>{t.l}</div>
                     <div style={{fontSize:11,color:'#64748b'}}>{t.descripcion}</div>
                   </div>
                   <div style={{marginLeft:'auto',textAlign:'right',flexShrink:0}}>
                     <div style={{fontSize:13,fontWeight:800,color:'#22c55e'}}>{t.olv} OLV/kg</div>
                     <div style={{fontSize:9,color:'#64748b'}}>factor {t.factor}</div>
                   </div>
                 </div>
                 <div style={{fontSize:10,color:'#3b82f6'}}>📋 {t.bolsa}</div>
               </button>
             ))}
           </div>
         </div>
       )}

       {/* PASO 2 — Punto y disposición */}
       {paso===2&&tipo&&(
         <div>
           <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
             <span style={{fontSize:24}}>{tipo.icon}</span>
             <div style={{fontSize:18,fontWeight:900}}>{tipo.l}</div>
           </div>
           <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>¿Cómo vas a disponer el residuo?</div>

           <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'12px',marginBottom:16}}>
             <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:4}}>💡 {tipo.consejo}</div>
             <div style={{fontSize:10,color:'#64748b'}}>{tipo.olv} OLV por kg verificado · {tipo.bolsa}</div>
           </div>

           {/* Método de disposición */}
           <div style={{marginBottom:16}}>
             <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Cómo vas a reciclar este residuo?</div>
             {tipo.disposiciones.map((d:any)=>(
               <button key={d.v} onClick={()=>setDisposicion(d.v)}
                 style={{width:'100%',background:disposicion===d.v?'rgba(34,197,94,0.1)':'rgba(255,255,255,0.03)',border:`1px solid ${disposicion===d.v?'rgba(34,197,94,0.4)':'rgba(255,255,255,0.06)'}`,borderRadius:10,padding:'12px',marginBottom:8,cursor:'pointer',textAlign:'left',color:'#f1f5f9',fontSize:13,fontWeight:disposicion===d.v?700:400}}>
                 {disposicion===d.v?'✅':'○'} {d.l}
               </button>
             ))}
           </div>

           {/* Punto de entrega — solo si va a punto verde */}
           {disposicion==='punto_verde'&&(
             <div style={{marginBottom:16}}>
               <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Punto de entrega</div>
               {tipo.cooperativas.map((c:string,i:number)=>(
                 <button key={i} onClick={()=>setPuntoEntrega(c)}
                   style={{width:'100%',background:puntoEntrega===c?'rgba(34,197,94,0.1)':'rgba(255,255,255,0.03)',border:`1px solid ${puntoEntrega===c?'rgba(34,197,94,0.4)':'rgba(255,255,255,0.06)'}`,borderRadius:10,padding:'12px',marginBottom:8,cursor:'pointer',textAlign:'left',color:'#f1f5f9',fontSize:12}}>
                   📍 {c}
                 </button>
               ))}
               <input value={puntoEntrega} onChange={e=>setPuntoEntrega(e.target.value)}
                 placeholder="O escribí el punto manualmente"
                 style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
             </div>
           )}

           {/* Info compostaje */}
           {(disposicion==='compost'||disposicion==='lombricompost')&&(
             <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'12px',marginBottom:16}}>
               <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:4}}>
                 {disposicion==='compost'?'🌱 Compostaje — 21 días':'🪱 Lombricompostaje — 45 días'}
               </div>
               <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.6}}>
                 Tus OLV se acreditarán automáticamente cuando se cumplan los {disposicion==='lombricompost'?45:21} días del proceso.
                 Necesitarás subir una foto del resultado para confirmar.
               </div>
             </div>
           )}

           {/* Peso */}
           <div style={{marginBottom:20}}>
             <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>
               Peso estimado: {kg}kg · {Math.round(tipo.factor*kg*100)} OLV estimados
             </div>
             <input type="range" min={0.5} max={50} step={0.5} value={kg}
               onChange={e=>setKg(Number(e.target.value))}
               style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
             <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
               <span>0.5kg</span>
               <span style={{color:'#22c55e',fontWeight:700}}>{kg}kg = {Math.round(tipo.factor*kg*100)} OLV</span>
               <span>50kg</span>
             </div>
             <div style={{fontSize:10,color:'#64748b',marginTop:8,padding:'8px',background:'rgba(255,255,255,0.02)',borderRadius:8}}>
               Referencias: Cubeta 30L llena = 15-20kg · Bolsa mediana = 1-2kg · Bolsa chica = 0.5-1kg
             </div>
           </div>

           <button onClick={siguiente}
             disabled={!disposicion||(disposicion==='punto_verde'&&!puntoEntrega)}
             style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:!disposicion||(disposicion==='punto_verde'&&!puntoEntrega)?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!disposicion||(disposicion==='punto_verde'&&!puntoEntrega)?'#64748b':'white',fontSize:15,fontWeight:700,cursor:'pointer'}}>
             Siguiente →
           </button>
         </div>
       )}

       {/* PASO 3 — Foto origen */}
       {paso===3&&(
         <div>
           <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>Foto del residuo en origen 📷</div>
           <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>Sacá la foto antes de salir de tu casa</div>

           <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'12px',marginBottom:16}}>
             <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:6}}>📸 Cómo sacar una buena foto:</div>
             <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.7}}>
               ✅ Poné una <strong style={{color:'#f1f5f9'}}>moneda de $10</strong> al lado del residuo<br/>
               ✅ Foto <strong style={{color:'#f1f5f9'}}>desde arriba</strong> — no de costado<br/>
               ✅ <strong style={{color:'#f1f5f9'}}>Luz natural</strong> — sin flash<br/>
               ✅ Todo el residuo <strong style={{color:'#f1f5f9'}}>visible</strong> en la foto
             </div>
           </div>

           {fotoOrigenPreview?(
             <div style={{marginBottom:16}}>
               <img src={fotoOrigenPreview} alt="Preview" style={{width:'100%',borderRadius:12,maxHeight:300,objectFit:'cover'}} />
               <button onClick={()=>{setFotoOrigen(null);setFotoOrigenPreview(null)}}
                 style={{width:'100%',marginTop:8,padding:'10px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'#64748b',fontSize:12,cursor:'pointer'}}>
                 📷 Sacar otra foto
               </button>
             </div>
           ):(
             <button onClick={()=>fotoOrigenRef.current?.click()}
               style={{width:'100%',padding:'32px',borderRadius:14,border:'2px dashed rgba(34,197,94,0.4)',background:'rgba(34,197,94,0.04)',color:'#22c55e',fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:16}}>
               📷 Tocar para sacar foto
             </button>
           )}
           <input ref={fotoOrigenRef} type="file" accept="image/*" capture="environment"
             onChange={e=>{if(e.target.files?.[0]) handleFotoOrigen(e.target.files[0])}}
             style={{display:'none'}} />

           {latOrigen&&(
             <div style={{fontSize:10,color:'#22c55e',marginBottom:12}}>
               📍 GPS registrado: {latOrigen.toFixed(4)}, {lngOrigen?.toFixed(4)}
             </div>
           )}

           <button onClick={siguiente} disabled={!fotoOrigenPreview}
             style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:!fotoOrigenPreview?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!fotoOrigenPreview?'#64748b':'white',fontSize:15,fontWeight:700,cursor:!fotoOrigenPreview?'not-allowed':'pointer'}}>
             Siguiente →
           </button>
         </div>
       )}

       {/* PASO 4 — Foto entrega / disposición final */}
       {paso===4&&(
         <div>
           <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>
             {disposicion==='punto_verde'?'Foto en la planta de entrega 📷':'Foto del proceso 📷'}
           </div>
           <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>
             {disposicion==='punto_verde'
               ?'Esta foto confirma la disposición final y activa tus OLV'
               :`Foto de tu ${disposicion==='compost'?'compostaje':'lombricompostaje'} iniciado`}
           </div>

           <div style={{background:disposicion==='punto_verde'?'rgba(59,130,246,0.06)':'rgba(34,197,94,0.06)',border:`1px solid ${disposicion==='punto_verde'?'rgba(59,130,246,0.2)':'rgba(34,197,94,0.2)'}`,borderRadius:12,padding:'12px',marginBottom:16}}>
             <div style={{fontSize:11,fontWeight:700,color:disposicion==='punto_verde'?'#3b82f6':'#22c55e',marginBottom:6}}>
               {disposicion==='punto_verde'
                 ?'📸 Foto de entrega:'
                 :`📸 Foto del ${disposicion==='compost'?'compostaje':'lombricompostaje'}:`}
             </div>
             <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.7}}>
               {disposicion==='punto_verde'?(
                 <>
                   ✅ Con el <strong style={{color:'#f1f5f9'}}>cartel de la planta</strong> visible si podés<br/>
                   ✅ O con el <strong style={{color:'#f1f5f9'}}>comprobante</strong> de entrega<br/>
                   ✅ Esta foto <strong style={{color:'#f1f5f9'}}>activa la verificación</strong> de tus OLV
                 </>
               ):(
                 <>
                   ✅ Tu recipiente de compost iniciado<br/>
                   ✅ Los OLV se acreditan en <strong style={{color:'#f1f5f9'}}>{diasCompost} días</strong><br/>
                   ✅ Te vamos a recordar subir la foto del resultado
                 </>
               )}
             </div>
           </div>

           {fotoEntregaPreview?(
             <div style={{marginBottom:16}}>
               <img src={fotoEntregaPreview} alt="Preview entrega" style={{width:'100%',borderRadius:12,maxHeight:300,objectFit:'cover'}} />
               <button onClick={()=>{setFotoEntrega(null);setFotoEntregaPreview(null)}}
                 style={{width:'100%',marginTop:8,padding:'10px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'#64748b',fontSize:12,cursor:'pointer'}}>
                 📷 Sacar otra foto
               </button>
             </div>
           ):(
             <div>
               <button onClick={()=>fotoEntregaRef.current?.click()}
                 style={{width:'100%',padding:'32px',borderRadius:14,border:`2px dashed ${disposicion==='punto_verde'?'rgba(59,130,246,0.4)':'rgba(34,197,94,0.4)'}`,background:disposicion==='punto_verde'?'rgba(59,130,246,0.04)':'rgba(34,197,94,0.04)',color:disposicion==='punto_verde'?'#3b82f6':'#22c55e',fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:12}}>
                 📷 Tocar para sacar foto
               </button>
               <button onClick={siguiente}
                 style={{width:'100%',padding:'12px',borderRadius:10,border:'1px solid rgba(255,255,255,0.08)',background:'transparent',color:'#64748b',fontSize:12,cursor:'pointer'}}>
                 Saltar por ahora — subiré la foto después
               </button>
             </div>
           )}
           <input ref={fotoEntregaRef} type="file" accept="image/*" capture="environment"
             onChange={e=>{if(e.target.files?.[0]) handleFotoEntrega(e.target.files[0])}}
             style={{display:'none'}} />

           {latEntrega&&(
             <div style={{fontSize:10,color:'#3b82f6',marginTop:8,marginBottom:12}}>
               📍 GPS entrega: {latEntrega.toFixed(4)}, {lngEntrega?.toFixed(4)}
             </div>
           )}

           {fotoEntregaPreview&&(
             <button onClick={siguiente}
               style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',fontSize:15,fontWeight:700,cursor:'pointer',marginTop:8}}>
               Confirmar →
             </button>
           )}
         </div>
       )}

       {/* PASO 5 — Confirmar */}
       {paso===5&&tipo&&(
         <div>
           <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>Confirmá tu registro ✅</div>
           <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>Revisá los datos antes de enviar</div>

           <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'16px',marginBottom:16}}>
             <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
               {[
                 {l:'Tipo',v:`${tipo.icon} ${tipo.l}`},
                 {l:'Peso',v:`${kg}kg`},
                 {l:'OLV estimados',v:`${Math.round(tipo.factor*kg*100)} OLV`},
                 {l:'CO2eq',v:`${(tipo.factor*kg).toFixed(2)}kg`},
               ].map(i=>(
                 <div key={i.l} style={{background:'rgba(255,255,255,0.03)',borderRadius:8,padding:'8px'}}>
                   <div style={{fontSize:9,color:'#64748b'}}>{i.l}</div>
                   <div style={{fontSize:12,fontWeight:700,color:'#f1f5f9',marginTop:2}}>{i.v}</div>
                 </div>
               ))}
             </div>

             {disposicion&&(
               <div style={{fontSize:11,color:'#22c55e',marginBottom:8}}>
                 ♻️ Disposición: {tipo.disposiciones.find((d:any)=>d.v===disposicion)?.l}
               </div>
             )}
             {puntoEntrega&&(
               <div style={{fontSize:11,color:'#3b82f6',marginBottom:8}}>📍 {puntoEntrega}</div>
             )}

             <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
               {fotoOrigenPreview&&<img src={fotoOrigenPreview} alt="" style={{width:80,height:60,objectFit:'cover',borderRadius:8,border:'2px solid rgba(34,197,94,0.3)'}} />}
               {fotoEntregaPreview&&<img src={fotoEntregaPreview} alt="" style={{width:80,height:60,objectFit:'cover',borderRadius:8,border:'2px solid rgba(59,130,246,0.3)'}} />}
             </div>

             <div style={{fontSize:10,color:'#64748b',lineHeight:1.5,padding:'8px',background:'rgba(245,158,11,0.06)',borderRadius:8,border:'1px solid rgba(245,158,11,0.15)'}}>
               ⏳ Tus OLV quedan <strong style={{color:'#f1f5f9'}}>pendientes</strong> hasta verificar la disposición final.
               {(disposicion==='compost'||disposicion==='lombricompost')&&` Se acreditan en ${diasCompost} días.`}
             </div>
           </div>

           <button onClick={enviar} disabled={enviando}
             style={{width:'100%',padding:'16px',borderRadius:14,border:'none',background:enviando?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:enviando?'#64748b':'white',fontSize:16,fontWeight:700,cursor:enviando?'not-allowed':'pointer',boxShadow:enviando?'none':'0 0 30px rgba(34,197,94,0.25)',marginBottom:12}}>
             {enviando?'Enviando...':'🌿 Registrar residuo'}
           </button>
         </div>
       )}

       {/* Botón feedback */}
       <div style={{marginTop:24,textAlign:'center'}}>
         <button onClick={()=>setMostrarFeedback(!mostrarFeedback)}
           style={{background:'transparent',border:'none',color:'#64748b',fontSize:11,cursor:'pointer',textDecoration:'underline'}}>
           ¿Algo no funciona o tenés una sugerencia?
         </button>
       </div>

       {mostrarFeedback&&(
         <div style={{marginTop:12,background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'16px'}}>
           <div style={{fontSize:12,color:'#94a3b8',marginBottom:8}}>Contanos qué pasó:</div>
           <textarea value={feedback} onChange={e=>setFeedback(e.target.value)}
             placeholder="Tu sugerencia o el error que encontraste..."
             rows={3}
             style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:12,outline:'none',fontFamily:'inherit',resize:'none',boxSizing:'border-box',marginBottom:8}} />
           <div style={{display:'flex',gap:8,alignItems:'center'}}>
             <button onClick={enviarFeedback}
               style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:8,padding:'8px 16px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
               Enviar
             </button>
             <span style={{fontSize:10,color:'#64748b'}}>o escribinos a hola@oliviacirculab.com.ar</span>
           </div>
         </div>
       )}

     </div>
   </div>
 )
}
