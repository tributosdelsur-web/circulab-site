'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { comprimirImagen, crearImagenHistoria } from '../../lib/fotos'
import { asegurarPerfil } from '../../lib/perfil'
import { OLV_POR_KG, co2De, colorDe } from '../../lib/impacto'

const STORAGE_KEY = 'olivia_registro_data'

const PUNTOS = ['Punto verde de la Ciudad','Cooperativa o recuperador de mi barrio','Otro lugar']
const PUNTOS_ORGANICO = ['Punto verde que reciba orgánicos','Compostera comunitaria','Otra planta o lugar']
const PESAJE_VIVO = 'Pesaje en vivo OLIVIA'

const TIPOS = [
 {
   v:'organico', l:'Orgánico', icon:'🌿',
   olv:180,
   descripcion:'Restos de comida, cáscaras, yerba, posos de café',
   cooperativas:PUNTOS_ORGANICO,
   bolsa:'Estimación · aún sin certificar',
   consejo:'Si tenés balanza, pesalo. Para la foto, sumá una moneda al lado.',
   disposiciones:[
     {v:'punto_verde',l:'Llevar a punto verde / planta'},
     {v:'compost',l:'Compostar en casa (21 días)'},
     {v:'lombricompost',l:'Lombricompostaje en casa (45 días)'},
   ]
 },
 {
   v:'plastico', l:'Plástico', icon:'♻️',
   olv:150,
   descripcion:'Botellas PET, envases, bolsas limpias',
   cooperativas:PUNTOS,
   bolsa:'Estimación · aún sin certificar',
   consejo:'Aplastá las botellas y enjuagalas antes.',
   disposiciones:[{v:'punto_verde',l:'Llevar a punto verde / cooperativa'}]
 },
 {
   v:'papel', l:'Papel y cartón', icon:'📄',
   olv:90,
   descripcion:'Diarios, revistas, cajas, cartones',
   cooperativas:PUNTOS,
   bolsa:'Estimación · aún sin certificar',
   consejo:'Atá el cartón en paquetes. Los diarios mojados valen menos.',
   disposiciones:[{v:'punto_verde',l:'Llevar a punto verde / cartonero'}]
 },
 {
   v:'vidrio', l:'Vidrio', icon:'🍾',
   olv:30,
   descripcion:'Botellas, frascos, envases de vidrio',
   cooperativas:PUNTOS,
   bolsa:'Estimación · aún sin certificar',
   consejo:'El vidrio roto también vale. Envolvelo en papel.',
   disposiciones:[{v:'punto_verde',l:'Llevar a punto verde'}]
 },
 {
   v:'metal', l:'Metal', icon:'🔩',
   olv:800,
   descripcion:'Latas de aluminio, chatarra, metales',
   cooperativas:PUNTOS,
   bolsa:'Estimación · aún sin certificar',
   consejo:'Las latas suman 800 OLV amarillos por kg verificado: registro ambiental, sin valor monetario.',
   disposiciones:[{v:'punto_verde',l:'Llevar a chatarrería / cooperativa'}]
 },
 {
   v:'aceite', l:'Aceite usado', icon:'🛢️',
   olv:250,
   descripcion:'Aceite vegetal de cocina usado',
   cooperativas:PUNTOS,
   bolsa:'Estimación · aún sin certificar',
   consejo:'Guardalo en la botella de origen. 1 litro = aprox 0.9kg.',
   disposiciones:[{v:'punto_verde',l:'Llevar a punto EcoAceite'}]
 },
 {
   v:'textil', l:'Textil', icon:'👕',
   olv:550,
   descripcion:'Ropa, telas, calzado en buen estado',
   cooperativas:PUNTOS,
   bolsa:'Estimación · aún sin certificar',
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
 const [kg, setKg] = useState(500)
  const [unidad, setUnidad] = useState<'kg'|'g'>('g')
 const [fotoOrigen, setFotoOrigen] = useState<File|null>(null)
 const [fotoOrigenPreview, setFotoOrigenPreview] = useState<string|null>(null)
 const [fotoEntrega, setFotoEntrega] = useState<File|null>(null)
 const [fotoEntregaPreview, setFotoEntregaPreview] = useState<string|null>(null)
 const [latOrigen, setLatOrigen] = useState<number|null>(null)
 const [lngOrigen, setLngOrigen] = useState<number|null>(null)
 const [latEntrega, setLatEntrega] = useState<number|null>(null)
 const [lngEntrega, setLngEntrega] = useState<number|null>(null)
 const [enviando, setEnviando] = useState(false)
 const [errorEnvio, setErrorEnvio] = useState('')
 const [sesionLista, setSesionLista] = useState(false)
 const [metodoPeso, setMetodoPeso] = useState<'balanza'|'estimado'>('estimado')
 const [enVivo, setEnVivo] = useState(false)
 const [resultado, setResultado] = useState<any>(null)
 const [publicandoOlivia, setPublicandoOlivia] = useState(false)
 const [publicadoOlivia, setPublicadoOlivia] = useState(false)
 const [mostrarFeedback, setMostrarFeedback] = useState(false)
 const [feedback, setFeedback] = useState('')
 const [autorizaRedes, setAutorizaRedes] = useState(true)
 const [imagenHistoria, setImagenHistoria] = useState<File|null>(null)
 const [historiaUrl, setHistoriaUrl] = useState<string|null>(null)
 const [avisoCompartir, setAvisoCompartir] = useState('')
 const fotoOrigenRef = useRef<HTMLInputElement>(null)
 const fotoEntregaRef = useRef<HTMLInputElement>(null)

 useEffect(()=>{
   supabase.auth.getSession().then(({data})=>{
     if(data.session?.user?.id) setUid(data.session.user.id)
     setSesionLista(true)
   })
   if(new URLSearchParams(window.location.search).get('origen')==='pesaje') {
     setEnVivo(true)
     setMetodoPeso('balanza')
   }
   const guardado = localStorage.getItem(STORAGE_KEY)
   if(guardado) {
     try {
       const p = JSON.parse(guardado)
       if(p.paso) setPaso(p.paso)
       if(p.tipo) setTipo(p.tipo)
       if(p.puntoEntrega) setPuntoEntrega(p.puntoEntrega)
       if(p.disposicion) setDisposicion(p.disposicion)
       if(p.kg) setKg(p.kg)
       if(p.unidad) setUnidad(p.unidad)
       else if(p.kg) setKg(500)
     } catch(e){}
   }
   // Pesaje en vivo: la persona solo elige el tipo, pone el peso y saca la foto.
   // La entrega a la planta la registra el equipo OLIVIA desde el admin.
   if(new URLSearchParams(window.location.search).get('origen')==='pesaje') {
     setDisposicion('punto_verde')
     setPuntoEntrega(PESAJE_VIVO)
   }
   navigator.geolocation?.getCurrentPosition(pos=>{
     setLatOrigen(pos.coords.latitude)
     setLngOrigen(pos.coords.longitude)
   })
 },[])

 useEffect(()=>{
   if(resultado) return
   localStorage.setItem(STORAGE_KEY, JSON.stringify({paso,tipo,puntoEntrega,disposicion,kg,unidad}))
 },[paso,tipo,puntoEntrega,disposicion,kg,unidad])

 function atras() {
   if(paso>1) {
     setPaso(p=>enVivo&&p===5?3:p-1)
     window.scrollTo(0,0)
   }
 }

 function siguiente() {
   setPaso(p=>enVivo&&p===3?5:p+1)
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
 const kgFinal = unidad==='g'?kg/1000:kg
 const pesoValido = kgFinal>0&&kgFinal<=50

 async function subirFoto(file: File, etapa: string) {
   const extension = (file.name.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi,'').toLowerCase()
   const liviana = await comprimirImagen(file)
   const ext = liviana.type==='image/jpeg' ? 'jpg' : extension
   const nombre = `${uid}-${etapa}-${Date.now()}.${ext}`
   const { error } = await supabase.storage.from('residuos-fotos').upload(nombre, liviana, { contentType: liviana.type || undefined })
   if(error) throw new Error('foto')
   return supabase.storage.from('residuos-fotos').getPublicUrl(nombre).data.publicUrl
 }

 async function enviar() {
   if(!uid){window.location.href='/login?next=/registrar';return}
   if(!pesoValido){setErrorEnvio('Revisá el peso: tiene que ser mayor a 0 y de hasta 50 kg.');return}
   setEnviando(true)
   setErrorEnvio('')
   try {
     await asegurarPerfil()
     const foto_url = fotoOrigen ? await subirFoto(fotoOrigen,'origen') : null
     const foto_entrega_url = fotoEntrega ? await subirFoto(fotoEntrega,'entrega') : null

     const olv = Math.round((OLV_POR_KG[tipo.v]||0) * kgFinal)
     const co2 = co2De({kg:kgFinal,tipo:tipo.v}).toFixed(2)

     // Determinar status según disposición
     const esCompost = disposicion==='compost'||disposicion==='lombricompost'
     // Siempre entra pendiente: la entrega y la validación las registra el equipo OLIVIA (la base también lo fuerza).
     const status = 'pendiente'
     const fecha_compost = esCompost ? new Date(Date.now() + diasCompost*24*60*60*1000).toISOString() : null
     const notas = (metodoPeso==='balanza'?'Peso: balanza digital, cargado a mano':'Peso: estimado por el usuario')+(enVivo?' · Pesaje en vivo':'')+(autorizaRedes?' · [autoriza_redes]':'')

     const {data: residuo, error} = await supabase.from('residuos').insert({
       usuario_id: uid,
       tipo: tipo.v,
       kg: kgFinal,
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
       notas,
       status
     }).select().single()
     if(error) throw new Error('registro')
     supabase.rpc('sumar_puntos',{p_tipo:'registro'}).then(()=>{},()=>{})

     localStorage.removeItem(STORAGE_KEY)
     setResultado({olv, co2, residuoId: residuo?.id, foto_url, status, esCompost})
     if(fotoOrigenPreview) {
       crearImagenHistoria(fotoOrigenPreview, kgFinal, tipo.l, enVivo?'Pesaje en vivo · Climate Week Argentina':'Mi registro en OLIVIA').then(f=>{
         if(!f) return
         setImagenHistoria(f)
         setHistoriaUrl(URL.createObjectURL(f))
       })
     }
   } catch(e) {
     setErrorEnvio('No pudimos guardar tu registro. Revisá tu conexión y volvé a tocar el botón: tus datos siguen acá.')
   } finally {
     setEnviando(false)
   }
 }

 async function publicarEnOlivia() {
   if(!uid) return
   setPublicandoOlivia(true)
   const {error} = await supabase.from('posts').insert({
     usuario_id: uid,
     contenido: `Acabo de registrar ${kgFinal} kg de ${tipo?.l} 🌿 con OLIVIA, pendientes de validación`,
     foto_url: resultado?.foto_url||null,
     tipo: 'accion',
     olv_ganados: 20
   })
   if(!error) {
     await supabase.rpc('sumar_puntos',{p_tipo:'post_registro'})
     setPublicadoOlivia(true)
   }
   setPublicandoOlivia(false)
 }

 function textoCompartir() {
   const kgTxt = kgFinal<1 ? `${Math.round(kgFinal*1000)} g` : `${kgFinal} kg`
   return `Hoy pesé ${kgTxt} de ${tipo?.l?.toLowerCase()} con OLIVIA Circulab 🌿 Medido, con foto y a mi nombre: no va al relleno.${enVivo?' #ClimateWeekArgentina':''}\n\n¿Te sumás? → oliviacirculab.com.ar/pesaje`
 }

 // Comparte la imagen vertical (historia/reel de Instagram, estado o chat de WhatsApp) con el menú del celular.
 async function compartirImagen() {
   setAvisoCompartir('')
   const texto = textoCompartir()
   try {
     if(imagenHistoria && (navigator as any).canShare?.({files:[imagenHistoria]})) {
       await navigator.share({files:[imagenHistoria], text: texto} as any)
       return
     }
     if(navigator.share) {
       await navigator.share({title:'Mi pesaje en OLIVIA Circulab', text: texto, url:'https://oliviacirculab.com.ar/pesaje'})
       return
     }
   } catch(e) { return }
   await navigator.clipboard?.writeText(texto).catch(()=>{})
   setAvisoCompartir('Copiamos el texto. Descargá la imagen y subila a tu historia o a WhatsApp.')
 }

 const linkWhatsApp = () => 'https://wa.me/?text=' + encodeURIComponent(textoCompartir())

 async function enviarFeedback() {
   if(!feedback) return
   await supabase.from('feedback').insert({usuario_id:uid||null,mensaje:feedback,pagina:'registrar'})
   setFeedback('')
   setMostrarFeedback(false)
 }

 if(sesionLista&&!uid) {
   const next = encodeURIComponent('/registrar'+window.location.search)
   return (
     <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:24,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
       <div style={{maxWidth:360,width:'100%'}}>
         <div style={{fontSize:48,marginBottom:12}}>⚖️</div>
         <h1 style={{fontSize:22,fontWeight:900,margin:'0 0 8px'}}>Primero creá tu cuenta</h1>
         <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.6,margin:'0 0 20px'}}>Así tu registro queda a tu nombre. Es menos de un minuto.</p>
         <a href={'/registro?next='+next} style={{display:'block',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:14,borderRadius:12,fontSize:15,fontWeight:700,textDecoration:'none',marginBottom:10}}>Crear mi cuenta →</a>
         <a href={'/login?next='+next} style={{display:'block',color:'#22c55e',padding:10,fontSize:13,fontWeight:600,textDecoration:'none'}}>Ya tengo cuenta</a>
       </div>
     </div>
   )
 }

 const pasos = enVivo ? ['Tipo','Peso','Foto','Confirmar'] : ['Tipo','Punto','Foto origen','Foto entrega','Confirmar']
 const pasoVisible = enVivo && paso===5 ? 4 : paso
 const progreso = ((pasoVisible-1)/pasos.length)*100

 // PANTALLA ÉXITO
 if(resultado) return (
   <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px 20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
     <div style={{maxWidth:400,width:'100%'}}>
       <div style={{fontSize:64,marginBottom:16}}>🌿</div>
       <div style={{fontSize:24,fontWeight:900,marginBottom:8}}>¡Registrado!</div>
       <div style={{fontSize:14,color:'#64748b',marginBottom:24,lineHeight:1.6}}>
         {resultado.esCompost
           ? `Tu residuo fue registrado. Revisamos el compostaje a partir de los ${diasCompost} días.`
           : enVivo
             ? 'Tu pesaje quedó registrado a tu nombre. Llevamos el material a la planta y te avisamos por mail, con foto, cuando lo entreguemos. Después, cuando la planta certifique el compost, lo vas a ver en tu panel.'
             : 'Tu residuo fue registrado. Los OLV se acreditarán cuando verifiquemos la disposición final.'}
       </div>

       {/* KPIs */}
       <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.3)',borderRadius:16,padding:20,marginBottom:20}}>
         <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
           <div style={{background:'rgba(34,197,94,0.08)',borderRadius:10,padding:'12px',textAlign:'center'}}>
             <div style={{fontSize:28,fontWeight:900,color:colorDe({tipo:tipo?.v||''})}}>{resultado.olv}</div>
             <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{tipo?.v==='organico'?'🟢 OLV Verdes en validación':'🟡 OLV Amarillos en validación'}</div>
           </div>
           <div style={{background:'rgba(59,130,246,0.08)',borderRadius:10,padding:'12px',textAlign:'center'}}>
             <div style={{fontSize:28,fontWeight:900,color:'#3b82f6'}}>{tipo?.v==='organico'?resultado.co2:(kgFinal<1?`${Math.round(kgFinal*1000)} g`:`${kgFinal} kg`)}</div>
             <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{tipo?.v==='organico'?'kg CO2eq estimados':'registrados a tu nombre'}</div>
           </div>
         </div>

         {/* Preview foto */}
         {resultado.foto_url&&(
           <img src={resultado.foto_url} alt="" style={{width:'100%',borderRadius:10,maxHeight:200,objectFit:'cover',marginBottom:12}} />
         )}

         <div style={{fontSize:11,color:'#64748b',lineHeight:1.5,padding:'10px',background:'rgba(245,158,11,0.06)',borderRadius:8,border:'1px solid rgba(245,158,11,0.2)'}}>
           {resultado.esCompost
             ? `⏳ OLV en validación. Hoy no tienen valor monetario.`
             : tipo?.v==='organico'
               ? '⏳ OLV Verdes en validación. Son los únicos que podrían tener valor si el proyecto se certifica bajo Verra; hoy no tienen valor monetario.'
               : '⏳ OLV Amarillos en validación. Registro ambiental: no entran en el proyecto de carbono y no tienen valor monetario.'}
         </div>
       </div>

       {/* Botones de publicación */}
       <div style={{display:'flex',flexDirection:'column',gap:10}}>
         {!publicadoOlivia?(
           <button onClick={publicarEnOlivia} disabled={publicandoOlivia}
             style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
             {publicandoOlivia?'Publicando...':'🌿 Publicar en OLIVIA · +20 puntos de actividad'}
           </button>
         ):(
           <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:12,padding:'14px',fontSize:13,color:'#22c55e',fontWeight:700}}>
             ✅ Publicado en la comunidad OLIVIA
           </div>
         )}

         {historiaUrl&&(
           <img src={historiaUrl} alt="Tu imagen para compartir" style={{width:'60%',margin:'4px auto 0',borderRadius:12,border:'1px solid rgba(255,255,255,0.1)',display:'block'}} />
         )}
         <button onClick={compartirImagen}
           style={{background:'linear-gradient(135deg,#d62976,#962fbf,#4f5bd5)',border:'none',color:'white',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
           📲 Compartir en historia, reel o WhatsApp
         </button>
         <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer"
           style={{background:'#25D366',color:'#04110a',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',display:'block'}}>
           💬 Mandarlo por WhatsApp
         </a>
         {historiaUrl&&(
           <a href={historiaUrl} download="olivia-pesaje.jpg"
             style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',padding:'12px',borderRadius:12,fontSize:13,fontWeight:700,textDecoration:'none',display:'block'}}>
             ⬇️ Descargar la imagen
           </a>
         )}
         {avisoCompartir&&<div style={{fontSize:12,color:'#facc15',lineHeight:1.5}}>{avisoCompartir}</div>}

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
             <img src="/logoOC.png" alt="OLIVIA" style={{width:36,height:36,objectFit:'contain',borderRadius:8}} />
             <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>OLIVIA Circulab</span>
           </a>
         </div>
         <div style={{fontSize:11,color:'#64748b'}}>Paso {pasoVisible} de {pasos.length}</div>
       </div>

       {/* Progreso */}
       <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:99,marginBottom:8}}>
         <div style={{height:'100%',width:progreso+'%',background:'linear-gradient(90deg,#22c55e,#16a34a)',borderRadius:99,transition:'width 0.3s'}} />
       </div>
       <div style={{display:'flex',justifyContent:'space-between',marginBottom:20}}>
         {pasos.map((p,i)=>(
           <div key={p} style={{fontSize:9,color:i+1<=pasoVisible?'#22c55e':'#64748b',fontWeight:i+1===pasoVisible?700:400}}>{p}</div>
         ))}
       </div>

       {/* PASO 1 — Tipo */}
       {paso===1&&(
         <div>
           <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>¿Qué vas a registrar? ♻️</div>
           <div style={{fontSize:12,color:'#64748b',marginBottom:20}}>Elegí el tipo de residuo</div>
           <div style={{display:'flex',flexDirection:'column',gap:10}}>
             {TIPOS.map(t=>(
               <button key={t.v} onClick={()=>{setTipo(t);setDisposicion(enVivo?'punto_verde':'');siguiente()}}
                 style={{background:tipo?.v===t.v?'rgba(34,197,94,0.1)':'#111827',border:`1px solid ${tipo?.v===t.v?'rgba(34,197,94,0.5)':'rgba(255,255,255,0.06)'}`,borderRadius:14,padding:'16px',cursor:'pointer',textAlign:'left',transition:'all 0.15s'}}>
                 <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
                   <span style={{fontSize:24}}>{t.icon}</span>
                   <div>
                     <div style={{fontSize:14,fontWeight:700,color:'#f1f5f9'}}>{t.l}</div>
                     <div style={{fontSize:11,color:'#64748b'}}>{t.descripcion}</div>
                   </div>
                   <div style={{marginLeft:'auto',textAlign:'right',flexShrink:0}}>
                     <div style={{fontSize:13,fontWeight:800,color:colorDe({tipo:t.v})}}>{t.olv} OLV/kg</div>
                     <div style={{fontSize:9,fontWeight:700,color:colorDe({tipo:t.v})}}>{t.v==='organico'?'🟢 Verdes · podrían valer si se certifica (Verra)':'🟡 Amarillos · sin valor monetario'}</div>
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
             <div style={{fontSize:10,color:'#64748b'}}>{tipo.olv} OLV {tipo.v==='organico'?'verdes':'amarillos'} por kg verificado · {tipo.bolsa}</div>
           </div>

           {enVivo&&(
             <div style={{background:'rgba(250,204,21,0.08)',border:'1px solid rgba(250,204,21,0.3)',borderRadius:12,padding:'12px',marginBottom:16}}>
               <div style={{fontSize:12,fontWeight:800,color:'#facc15',marginBottom:4}}>⚖️ Pesaje en vivo OLIVIA</div>
               <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.6}}>Poné el peso que marca la balanza y sacá la foto. Nosotros llevamos el material a la planta y te avisamos por mail cuando lo entreguemos.</div>
             </div>
           )}
           {!enVivo&&<>
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
               {(enVivo?[PESAJE_VIVO,...tipo.cooperativas]:tipo.cooperativas).map((c:string,i:number)=>(
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

           </>}
           {/* Info compostaje */}
           {(disposicion==='compost'||disposicion==='lombricompost')&&(
             <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'12px',marginBottom:16}}>
               <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:4}}>
                 {disposicion==='compost'?'🌱 Compostaje — 21 días':'🪱 Lombricompostaje — 45 días'}
               </div>
               <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.6}}>
                 El equipo revisa tu registro a partir de los {disposicion==='lombricompost'?45:21} días del proceso.
               </div>
             </div>
           )}

           {/* Peso */}
           <div style={{marginBottom:20}}>
             <div style={{fontSize:12,color:'#94a3b8',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.05em'}}>
               Peso
             </div>
             <div style={{display:'flex',gap:8,marginBottom:12}}>
               {([['balanza','⚖️ Lo pesé en balanza'],['estimado','👀 Lo estimé']] as const).map(([v,l])=>(
                 <button key={v} onClick={()=>setMetodoPeso(v)}
                   style={{flex:1,padding:'10px 8px',borderRadius:10,cursor:'pointer',fontSize:12,fontWeight:700,border:`1px solid ${metodoPeso===v?'rgba(34,197,94,0.5)':'rgba(255,255,255,0.08)'}`,background:metodoPeso===v?'rgba(34,197,94,0.1)':'transparent',color:metodoPeso===v?'#22c55e':'#94a3b8'}}>
                   {l}
                 </button>
               ))}
             </div>
             <div style={{display:'flex',gap:8,marginBottom:14}}>
               <button onClick={()=>{if(unidad==='kg'){setKg(Math.min(Math.round(kg*1000),9999));setUnidad('g')}}} 
                 style={{padding:'8px 20px',borderRadius:10,border:'none',cursor:'pointer',fontSize:13,fontWeight:700,
                 background:unidad==='g'?'#22c55e':'rgba(255,255,255,0.06)',color:unidad==='g'?'white':'#64748b'}}>
                 Gramos
               </button>
               <button onClick={()=>{if(unidad==='g'){setKg(Math.max(Number((kg/1000).toFixed(1)),0.1));setUnidad('kg')}}}
                 style={{padding:'8px 20px',borderRadius:10,border:'none',cursor:'pointer',fontSize:13,fontWeight:700,
                 background:unidad==='kg'?'#22c55e':'rgba(255,255,255,0.06)',color:unidad==='kg'?'white':'#64748b'}}>
                 Kilos
               </button>
               <span style={{fontSize:11,color:'#64748b',display:'flex',alignItems:'center',marginLeft:4}}>
                 {unidad==='g'?'para residuos chicos':'para bolsas y cajas'}
               </span>
             </div>
             <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
               <input type="number"
                 min={unidad==='g'?10:0.1}
                 max={unidad==='g'?9999:50}
                 step={unidad==='g'?10:0.1}
                 value={kg}
                 onChange={e=>setKg(Number(e.target.value))}
                 style={{flex:1,padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:18,fontWeight:700,textAlign:'center',outline:'none'}}
               />
               <span style={{fontSize:16,fontWeight:700,color:'#94a3b8',minWidth:32}}>{unidad}</span>
             </div>
             <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'10px 14px',textAlign:'center'}}>
               <span style={{fontSize:13,fontWeight:700,color:'#22c55e'}}>
                 🌿 {Math.round((OLV_POR_KG[tipo.v]||0)*kgFinal)} OLV estimados, pendientes de validación
               </span>
               <div style={{fontSize:10,color:'#64748b',marginTop:4}}>
                 {unidad==='g'?kg+'g = '+(kg/1000).toFixed(3)+' kg':kg+' kg'}
               </div>
             </div>
             <div style={{fontSize:10,color:'#64748b',marginTop:10,padding:'8px',background:'rgba(255,255,255,0.02)',borderRadius:8,lineHeight:1.7}}>
               🥛 1 botella plástica = 30g · 🗞️ 1 diario = 200g · 🛍️ 1 bolsa llena = 500g<br/>
               🌿 1 bolsa orgánico = 300g · 🔩 3 latas aluminio = 100g · 📦 1 caja cartón = 150g
             </div>
           </div>

           <button onClick={siguiente}
             disabled={!disposicion||(disposicion==='punto_verde'&&!puntoEntrega)||!pesoValido}
             style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:!disposicion||(disposicion==='punto_verde'&&!puntoEntrega)||!pesoValido?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!disposicion||(disposicion==='punto_verde'&&!puntoEntrega)?'#64748b':'white',fontSize:15,fontWeight:700,cursor:'pointer'}}>
             Siguiente →
           </button>
         </div>
       )}

       {/* PASO 3 — Foto origen */}
       {paso===3&&(
         <div>
           <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>Foto del residuo en origen 📷</div>
           <div style={{fontSize:12,color:'#64748b',marginBottom:8}}>Con el residuo a la vista, y la balanza si tenés</div>
           <div style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:10,padding:'10px',marginBottom:16,textAlign:'center'}}>
             <span style={{fontSize:12,fontWeight:700,color:'#22c55e'}}>
               📍 Si das permiso, guardamos la ubicación
             </span>
             <div style={{fontSize:10,color:'#94a3b8',marginTop:3}}>
               La ubicación ayuda a validar tu registro
             </div>
           </div>

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
               ?'📍 Esta foto ayuda a confirmar la entrega'
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
                   ✅ Esta foto <strong style={{color:'#f1f5f9'}}>ayuda a validar</strong> tu entrega
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
               <div style={{fontSize:10,color:'#f59e0b',textAlign:'center',padding:'8px',lineHeight:1.6,background:'rgba(245,158,11,0.06)',borderRadius:8,border:'1px solid rgba(245,158,11,0.2)'}}>
                 Esta foto nos ayuda a validar tu entrega. Sin ella, tu registro puede quedar pendiente.
               </div>
               <button onClick={siguiente}
                 style={{width:'100%',marginTop:10,padding:'11px',borderRadius:10,border:'1px solid rgba(255,255,255,0.08)',background:'transparent',color:'#64748b',fontSize:12,cursor:'pointer'}}>
                 Continuar sin foto
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
                 {l:'Peso',v:unidad==='g'?`${kg}g (${(kg/1000).toFixed(3)}kg)`:`${kg}kg`},
                 {l:'OLV estimados',v:`${Math.round((OLV_POR_KG[tipo.v]||0)*kgFinal)} OLV`},
                 ...(tipo.v==='organico'?[{l:'CO2eq estimado',v:`${co2De({kg:kgFinal,tipo:tipo.v}).toFixed(2)}kg`}]:[]),
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

           <label style={{display:'flex',gap:10,alignItems:'flex-start',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'12px',marginBottom:12,cursor:'pointer'}}>
             <input type="checkbox" checked={autorizaRedes} onChange={e=>setAutorizaRedes(e.target.checked)} style={{marginTop:2,width:18,height:18,accentColor:'#22c55e'}} />
             <span style={{fontSize:12,color:'#94a3b8',lineHeight:1.5}}>Autorizo a OLIVIA a compartir la foto de mi pesaje en sus redes (sin mi email ni datos de contacto).</span>
           </label>
           {errorEnvio&&(
             <div role="alert" style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:10,padding:'10px 14px',fontSize:12,color:'#ef4444',marginBottom:12,lineHeight:1.5}}>{errorEnvio}</div>
           )}
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
