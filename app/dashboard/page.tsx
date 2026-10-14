'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'

const TIPOS_RESIDUO = [
  {v:'organico',l:'Orgánico',icon:'🌿',factor:1.8,color:'#22c55e'},
  {v:'plastico',l:'Plástico',icon:'♻️',factor:1.5,color:'#3b82f6'},
  {v:'papel',l:'Papel',icon:'📄',factor:0.9,color:'#f59e0b'},
  {v:'vidrio',l:'Vidrio',icon:'🍾',factor:0.3,color:'#a855f7'},
  {v:'metal',l:'Metal',icon:'🔩',factor:8.0,color:'#ef4444'},
  {v:'aceite',l:'Aceite',icon:'🛢️',factor:2.5,color:'#f97316'},
  {v:'textil',l:'Textil',icon:'👕',factor:5.5,color:'#ec4899'},
]

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab')||'panel')
  const [uid, setUid] = useState('')
  const [usuario, setUsuario] = useState<any>(null)
  const [residuos, setResiduos] = useState<any[]>([])
  const [transacciones, setTransacciones] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mostrarFeedback, setMostrarFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(true)

  function cambiarTab(t: string) {
    setTab(t)
    router.push(`/dashboard?tab=${t}`, {scroll:false})
  }

  useEffect(()=>{
    supabase.auth.getSession().then(async ({data})=>{
      if(!data.session?.user?.id){
        window.location.href='/login'
        return
      }
      const uid = data.session.user.id
      setUid(uid)
      const [u, r, t] = await Promise.all([
        supabase.from('usuarios').select('*').eq('id',uid).single(),
        supabase.from('residuos').select('*').eq('usuario_id',uid).order('created_at',{ascending:false}),
        supabase.from('wallet_transacciones').select('*').eq('usuario_id',uid).order('created_at',{ascending:false}).limit(50),
      ])
      setUsuario(u.data)
      setResiduos(r.data||[])
      setTransacciones(t.data||[])
      setLoading(false)
    })
  },[])

  async function enviarFeedback() {
    if(!feedback) return
    await supabase.from('feedback').insert({usuario_id:uid||null,mensaje:feedback,pagina:'dashboard'})
    setFeedback('')
    setMostrarFeedback(false)
  }

  // OLV calculados desde residuos — reflejan validación del admin en tiempo real
  const olv_verificados = residuos
    .filter(r=>r.status==='validado')
    .reduce((a,r)=>{
      const factor = TIPOS_RESIDUO.find(t=>t.v===r.tipo)?.factor||1.8
      return a + Math.round(Number(r.kg)*factor*100)
    },0)
  const olv_pendientes = residuos
    .filter(r=>r.status==='pendiente')
    .reduce((a,r)=>{
      const factor = TIPOS_RESIDUO.find(t=>t.v===r.tipo)?.factor||1.8
      return a + Math.round(Number(r.kg)*factor*100)
    },0)
  const olv_total = olv_verificados + olv_pendientes
  const kg_total = residuos.reduce((a,r)=>a+Number(r.kg),0)
  const co2_total = residuos.reduce((a,r)=>{
    const factor = TIPOS_RESIDUO.find(t=>t.v===r.tipo)?.factor||1.8
    return a + (Number(r.kg)*factor)
  },0)
  const residuos_validados = residuos.filter(r=>r.status==='validado').length

  const olv_por_tipo = TIPOS_RESIDUO.map(t=>{
    const mis_residuos = residuos.filter(r=>r.tipo===t.v)
    const kg = mis_residuos.reduce((a,r)=>a+Number(r.kg),0)
    const olv = Math.round(kg*t.factor*100)
    return {...t, kg, olv}
  }).filter(t=>t.kg>0)

  const META_FASE2 = 200
  const progreso_fase2 = Math.min((olv_total/META_FASE2)*100, 100)

  const bg = dark?'#0a0e1a':'#f8fafc'
  const text = dark?'#f1f5f9':'#0a0e1a'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'

  if(loading) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui',fontSize:14}}>
      Cargando tu panel OLIVIA...
    </div>
  )

  const tabs = [
    {id:'panel',l:'Panel',le:'Panel',icon:'⊞'},
    {id:'olivia',l:'OLIVIA',le:'OLIVIA',icon:'🌿'},
    {id:'ruta',l:'Ruta OLV',le:'OLV Path',icon:'🪙'},
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.3s'}}>

      {/* HEADER */}
      <div style={{padding:'14px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(248,250,252,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:36,height:36,objectFit:'contain',borderRadius:8}} />
          <div>
            <div style={{fontSize:13,fontWeight:800,color:text}}>OLIVIA Circulab</div>
            <div style={{fontSize:9,color:'#64748b',textTransform:'uppercase'}}>Panel ciudadano</div>
          </div>
        </a>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button onClick={()=>setLang(lang==='es'?'en':'es')} style={{fontSize:10,color:'#22c55e',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'3px 8px',cursor:'pointer'}}>
            {lang==='es'?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)} style={{fontSize:14,background:'transparent',border:`1px solid ${border}`,borderRadius:6,padding:'3px 7px',cursor:'pointer'}}>
            {dark?'☀️':'🌙'}
          </button>
          <button onClick={async()=>{await supabase.auth.signOut();window.location.href='/'}}
            style={{fontSize:11,color:'#64748b',background:'transparent',border:'none',cursor:'pointer'}}>
            Salir
          </button>
          <a href="/comunidad" style={{fontSize:11,color:'#22c55e',textDecoration:'none',fontWeight:700}}>🌿 Comunidad</a>
        </div>
      </div>

      {/* PERFIL */}
      <div style={{padding:'16px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#22c55e,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:16,color:'white',flexShrink:0}}>
          {usuario?.nombre?.[0]}{usuario?.apellido?.[0]}
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:700}}>{usuario?.nombre} {usuario?.apellido}</div>
          <div style={{fontSize:11,color:'#64748b',marginTop:1}}>{usuario?.consorcio||usuario?.barrio||'OLIVIA Circulab'}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:18,fontWeight:900,color:'#22c55e'}}>{olv_verificados}</div>
          <div style={{fontSize:9,color:'#64748b'}}>OLV verificados</div>
          {olv_pendientes>0&&<div style={{fontSize:9,color:'#f59e0b'}}>{olv_pendientes} pendientes</div>}
        </div>
      </div>

      {/* TABS */}
      <div style={{display:'flex',borderBottom:`1px solid ${border}`,overflowX:'auto',background:dark?'rgba(8,12,22,0.5)':'rgba(248,250,252,0.5)'}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>cambiarTab(t.id)}
            style={{padding:'12px 16px',border:'none',background:'transparent',color:tab===t.id?'#22c55e':'#64748b',fontSize:12,fontWeight:tab===t.id?700:500,cursor:'pointer',borderBottom:tab===t.id?'2px solid #22c55e':'2px solid transparent',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:4}}>
            <span>{t.icon}</span>
            <span>{lang==='es'?t.l:t.le}</span>
          </button>
        ))}
      </div>

      <div style={{padding:'16px 20px',maxWidth:700,margin:'0 auto'}}>

        {/* ═══ TAB PANEL ═══ */}
        {tab==='panel'&&(
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{fontSize:16,fontWeight:900}}>{lang==='es'?'Tu resumen':'Your summary'}</div>

            {/* KPIs */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[
                {v:olv_verificados,l:lang==='es'?'OLV verificados':'Verified OLV',c:'#22c55e',sub:olv_pendientes>0?`+${olv_pendientes} pendientes`:null},
                {v:`${kg_total.toFixed(1)}kg`,l:lang==='es'?'Total reciclado':'Total recycled',c:'#3b82f6'},
                {v:`${co2_total.toFixed(2)}`,l:lang==='es'?'kg CO2eq evitados':'kg CO2eq avoided',c:'#a855f7'},
                {v:residuos.length,l:lang==='es'?'Registros':'Registrations',c:'#f59e0b',sub:`${residuos_validados} validados`},
              ].map((k:any)=>(
                <div key={k.l} style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'14px',borderTop:`3px solid ${k.c}`}}>
                  <div style={{fontSize:24,fontWeight:900,color:k.c}}>{k.v}</div>
                  <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{k.l}</div>
                  {k.sub&&<div style={{fontSize:9,color:'#f59e0b',marginTop:2}}>{k.sub}</div>}
                </div>
              ))}
            </div>

            {/* PROGRESO */}
            <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <div style={{fontSize:13,fontWeight:700}}>{lang==='es'?'Tu primera meta de historial':'Your first record goal'}</div>
                <div style={{fontSize:11,color:'#22c55e',fontWeight:700}}>{olv_total}/{META_FASE2} OLV</div>
              </div>
              <div style={{height:8,background:'rgba(255,255,255,0.06)',borderRadius:99,marginBottom:8}}>
                <div style={{height:'100%',width:`${progreso_fase2}%`,background:'linear-gradient(90deg,#22c55e,#16a34a)',borderRadius:99,transition:'width 0.5s'}} />
              </div>
              <div style={{fontSize:11,color:'#64748b'}}>
                {progreso_fase2>=100
                  ?(lang==='es'?'✅ Meta cumplida':'✅ Goal reached')
                  :`${lang==='es'?'Te faltan':'You need'} ${META_FASE2-olv_total} OLV`}
              </div>
            </div>

            {/* ÚLTIMOS REGISTROS */}
            {residuos.length>0?(
              <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'16px'}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{lang==='es'?'Últimos registros':'Recent registrations'}</div>
                {residuos.slice(0,5).map((r:any)=>{
                  const tipo = TIPOS_RESIDUO.find(t=>t.v===r.tipo)
                  return (
                    <div key={r.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:`1px solid ${border}`}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{fontSize:18}}>{tipo?.icon||'♻️'}</span>
                        <div>
                          <div style={{fontSize:12,fontWeight:600,textTransform:'capitalize'}}>{r.tipo} · {r.kg}kg</div>
                          <div style={{fontSize:10,color:'#64748b'}}>{new Date(r.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <span style={{fontSize:11,color:r.status==='validado'?'#22c55e':r.status==='rechazado'?'#ef4444':'#f59e0b',background:r.status==='validado'?'rgba(34,197,94,0.1)':r.status==='rechazado'?'rgba(239,68,68,0.1)':'rgba(245,158,11,0.1)',padding:'3px 8px',borderRadius:20}}>
                        {r.status==='validado'?'✓ Validado':r.status==='rechazado'?'✗ Rechazado':'⏳ Pendiente'}
                      </span>
                    </div>
                  )
                })}
                <a href="/registrar" style={{display:'block',textAlign:'center',marginTop:12,color:'#22c55e',fontSize:12,fontWeight:700,textDecoration:'none'}}>
                  + {lang==='es'?'Registrar nuevo residuo':'Register new waste'}
                </a>
              </div>
            ):(
              <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'32px',textAlign:'center'}}>
                <div style={{fontSize:40,marginBottom:12}}>🌿</div>
                <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>{lang==='es'?'Tu primer registro te espera':'Your first registration awaits'}</div>
                <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>{lang==='es'?'Cada kilo que reciclás genera tokens OLV reales':'Every kilo you recycle generates real OLV tokens'}</div>
                <a href="/registrar" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'12px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
                  {lang==='es'?'Registrar mi primer residuo →':'Register my first waste →'}
                </a>
              </div>
            )}

            {/* INVITACIONES */}
            <div style={{background:card,border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:13,fontWeight:700,color:text,marginBottom:4}}>🎁 {lang==='es'?'Invitá a tus amigos':'Invite your friends'}</div>
              <div style={{fontSize:11,color:'#64748b',marginBottom:12}}>{lang==='es'?'+200 OLV por cada amigo que se registre y verifique su primer residuo':'+200 OLV for each friend who registers and verifies their first waste'}</div>

              <div style={{padding:'12px',borderRadius:10,background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.3)',marginBottom:12,textAlign:'center'}}>
                <div style={{fontSize:10,color:'#64748b',marginBottom:4}}>{lang==='es'?'Tu código único':'Your unique code'}</div>
                <div style={{fontSize:26,fontWeight:900,color:'#22c55e',letterSpacing:'0.2em'}}>{usuario?.codigo_referido||'...'}</div>
                <button onClick={()=>navigator.clipboard.writeText(usuario?.codigo_referido||'').then(()=>alert('Código copiado ✓'))}
                  style={{marginTop:8,padding:'6px 16px',borderRadius:8,background:'rgba(34,197,94,0.2)',border:'1px solid rgba(34,197,94,0.4)',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>
                  {lang==='es'?'Copiar código':'Copy code'}
                </button>
              </div>

              <a href={`https://wa.me/?text=Me%20sum%C3%A9%20a%20OLIVIA%20Circulab%20%F0%9F%8C%BF%20Us%C3%A1%20mi%20c%C3%B3digo%20${usuario?.codigo_referido}%20al%20registrarte%3A%20https%3A%2F%2Fcirculab-site.vercel.app%2Fregistro`}
                target="_blank" style={{display:'flex',alignItems:'center',gap:10,padding:'12px',borderRadius:10,background:'rgba(37,211,102,0.08)',border:'1px solid rgba(37,211,102,0.2)',textDecoration:'none',marginBottom:8}}>
                <span style={{fontSize:20}}>💬</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:'#25d366'}}>WhatsApp</div>
                  <div style={{fontSize:10,color:'#64748b'}}>{lang==='es'?'Incluye tu código automáticamente':'Includes your code automatically'}</div>
                </div>
              </a>

              <button onClick={()=>{
                const txt=`Sumate a OLIVIA Circulab 🌿 Usá mi código ${usuario?.codigo_referido} al registrarte: https://circulab-site.vercel.app/registro`
                if(navigator.share)navigator.share({text:txt,url:'https://circulab-site.vercel.app'})
                else{navigator.clipboard.writeText(txt);alert('Copiado ✓')}
              }} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'12px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:`1px solid ${border}`,cursor:'pointer'}}>
                <span style={{fontSize:20}}>📤</span>
                <div style={{textAlign:'left'}}>
                  <div style={{fontSize:12,fontWeight:700,color:text}}>{lang==='es'?'Más opciones':'More options'}</div>
                  <div style={{fontSize:10,color:'#64748b'}}>{lang==='es'?'Copiar o compartir en otras redes':'Copy or share on other networks'}</div>
                </div>
              </button>

             <button onClick={async()=>{
               const canvas = document.createElement('canvas')
               canvas.width = 1080
               canvas.height = 1920
               const ctx = canvas.getContext('2d')!
               const grad = ctx.createLinearGradient(0,0,0,1920)
               grad.addColorStop(0,'#0a1a0a')
               grad.addColorStop(1,'#0a0e1a')
               ctx.fillStyle = grad
               ctx.fillRect(0,0,1080,1920)
               ctx.textAlign = 'center'
               ctx.fillStyle = '#22c55e'
               ctx.font = 'bold 60px system-ui'
               ctx.fillText('🌿 OLIVIA Circulab', 540, 280)
               ctx.fillStyle = '#f1f5f9'
               ctx.font = 'bold 80px system-ui'
               ctx.fillText(lang==='es'?'¡Me sumé al':'I joined', 540, 600)
               ctx.fillText(lang==='es'?'reciclaje que paga 💰':'recycling that pays 💰', 540, 700)
               ctx.fillStyle = '#f1f5f9'
               ctx.font = '50px system-ui'
               ctx.fillText(lang==='es'?'Usá mi código:':'Use my code:', 540, 1000)
               ctx.fillStyle = '#22c55e'
               ctx.font = 'bold 120px system-ui'
               ctx.fillText(usuario?.codigo_referido||'OLIVIA', 540, 1150)
               ctx.fillStyle = '#f1f5f9'
               ctx.font = '50px system-ui'
               ctx.fillText(lang==='es'?'y registrate gratis →':'register free →', 540, 1350)
               ctx.fillStyle = '#22c55e'
               ctx.beginPath()
               ctx.roundRect(140,1450,800,130,30)
               ctx.fill()
               ctx.fillStyle = '#0a1a0a'
               ctx.font = 'bold 44px system-ui'
               ctx.fillText('circulab-site.vercel.app', 540, 1530)
               ctx.fillStyle = '#64748b'
               ctx.font = '36px system-ui'
               ctx.fillText(lang==='es'?'Tu residuo vale dinero real':'Your waste is worth real money', 540, 1720)
               canvas.toBlob(async(blob)=>{
                 if(!blob) return
                 const file = new File([blob],'olivia-invitacion.png',{type:'image/png'})
                 const txt = `Sumate a OLIVIA Circulab 🌿 Usá mi código ${usuario?.codigo_referido}: https://circulab-site.vercel.app/registro`
                 if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
                   try{await navigator.share({files:[file],title:'OLIVIA Circulab',text:txt});return}catch(e){}
                 }
                 const url = URL.createObjectURL(blob)
                 const a = document.createElement('a')
                 a.href=url;a.download='olivia-invitacion.png';a.click()
                 alert(lang==='es'?'📸 Imagen descargada\nAbrí Instagram → Nueva Story → Galería':'📸 Image downloaded\nOpen Instagram → New Story → Gallery')
               },'image/png')
             }} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'12px',borderRadius:10,background:'rgba(131,58,180,0.08)',border:'1px solid rgba(131,58,180,0.3)',cursor:'pointer',marginBottom:8}}>
               <span style={{fontSize:20}}>📸</span>
               <div style={{textAlign:'left'}}>
                 <div style={{fontSize:12,fontWeight:700,color:'#a855f7'}}>{lang==='es'?'Story Instagram con tu código':'Instagram Story with your code'}</div>
                 <div style={{fontSize:10,color:'#64748b'}}>{lang==='es'?'Imagen lista para Stories':'Image ready for Stories'}</div>
               </div>
             </button>

             <div style={{marginTop:10,padding:'8px 12px',background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:8,textAlign:'center'}}>
                <span style={{fontSize:11,color:'#22c55e',fontWeight:700}}>{lang==='es'?'Amigos invitados:':'Friends invited:'} {usuario?.referidos_count||0}</span>
                <span style={{fontSize:10,color:'#64748b'}}> · {(usuario?.referidos_count||0)*200} OLV {lang==='es'?'ganados':'earned'}</span>
              </div>
            </div>

          </div>
        )}

        {/* ═══ TAB OLIVIA ═══ */}
        {tab==='olivia'&&(
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{fontSize:16,fontWeight:900}}>🌿 OLIVIA Circulab</div>

            <div style={{background:card,border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#22c55e'}}>{lang==='es'?'Tus OLV':'Your OLV'}</div>
              <div style={{fontSize:10,color:'#64748b',marginBottom:12}}>{lang==='es'?'Registro ambiental sin valor monetario · se acreditan cuando verificamos la entrega':'Environmental record with no monetary value · credited once delivery is verified'}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
                {[
                  {v:olv_verificados,l:'Verificados',c:'#22c55e'},
                  {v:olv_pendientes,l:'Pendientes',c:'#f59e0b'},
                  {v:olv_total,l:'Total',c:'#64748b'},
                ].map(k=>(
                  <div key={k.l} style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:'10px',textAlign:'center'}}>
                    <div style={{fontSize:20,fontWeight:800,color:k.c}}>{k.v}</div>
                    <div style={{fontSize:9,color:'#64748b',marginTop:2}}>{k.l}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:10,color:'#64748b',lineHeight:1.6,padding:'8px',background:'rgba(245,158,11,0.06)',borderRadius:8,border:'1px solid rgba(245,158,11,0.15)'}}>
                ⏳ Los OLV pendientes se acreditan cuando verificamos que el residuo llegó a la planta.
              </div>
            </div>

            {olv_por_tipo.length>0&&(
              <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'16px'}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>OLV por tipo de residuo</div>
                {olv_por_tipo.map(t=>(
                  <div key={t.v} style={{marginBottom:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                        <span style={{fontSize:16}}>{t.icon}</span>
                        <span style={{fontSize:12,fontWeight:600}}>{t.l}</span>
                        <span style={{fontSize:10,color:'#64748b'}}>{t.kg}kg</span>
                      </div>
                      <span style={{fontSize:12,fontWeight:700,color:t.color}}>{t.olv} OLV</span>
                    </div>
                    <div style={{height:6,background:'rgba(255,255,255,0.06)',borderRadius:99}}>
                      <div style={{height:'100%',width:`${Math.min((t.olv/(olv_total||1))*100,100)}%`,background:t.color,borderRadius:99,opacity:0.8}} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{background:card,border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#3b82f6'}}>{lang==='es'?'Tus puntos de actividad':'Your activity points'}</div>
              <div style={{fontSize:10,color:'#64748b',marginBottom:12}}>{lang==='es'?'Distintos de los OLV · sin valor monetario':'Separate from OLV · no monetary value'}</div>
              <div style={{display:'flex',alignItems:'center',gap:16}}>
                <div style={{fontSize:40,fontWeight:900,color:'#3b82f6'}}>{usuario?.score_pulso||0}</div>
                <div>
                  <div style={{fontSize:12,fontWeight:700}}>Nivel {usuario?.nivel||1}</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{lang==='es'?'Suman por registrar y participar en la comunidad':'Earned by registering and taking part in the community'}</div>
                </div>
              </div>
            </div>

            <a href="/registrar" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'14px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none',display:'block',textAlign:'center'}}>
              + Registrar nuevo residuo
            </a>
          </div>
        )}

        {/* ═══ TAB RUTA OLV ═══ */}
        {tab==='ruta'&&(
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{fontSize:16,fontWeight:900}}>🪙 {lang==='es'?'Tu Ruta OLV':'Your OLV Path'}</div>

            <div style={{background:card,border:'1px solid rgba(245,158,11,0.3)',borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:6,color:'#f59e0b'}}>{lang==='es'?'Qué son tus OLV':'What your OLV are'}</div>
              <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.6}}>
                {lang==='es'
                  ?'Cada residuo validado suma OLV Verdes. Hoy no tienen valor monetario: no se canjean ni se cobran. Son tu historial verificado: cuántos kilos separaste y a dónde fueron.'
                  :'Each validated waste adds Green OLV. Today they have no monetary value: they cannot be redeemed or paid out. They are your verified record: how many kilos you sorted and where they went.'}
              </div>
            </div>

            <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:16}}>{lang==='es'?'Las etapas de OLIVIA':'OLIVIA stages'}</div>
              {[
                {num:1,fase:lang==='es'?'Semilla · hoy':'Seed · today',titulo:lang==='es'?'Registrás y validamos':'You register, we validate',desc:lang==='es'?'Cada registro se revisa a mano, uno por uno. Construís historial verificado.':'Each record is reviewed by hand, one by one. You build a verified record.',color:'#22c55e',activo:true,progreso:Math.min((olv_total/200)*100,100),meta:`${olv_total}/200 OLV`},
                {num:2,fase:lang==='es'?'Brote · próxima':'Sprout · next',titulo:lang==='es'?'Planta aliada y balanza':'Partner plant and scale',desc:lang==='es'?'El peso sale de una balanza con modelo aprobado y la planta confirma que procesó el material.':'Weight comes from an approved-model scale and the plant confirms it processed the material.',color:'#3b82f6',activo:false,progreso:0,meta:''},
                {num:3,fase:lang==='es'?'Árbol · si llega':'Tree · if it comes',titulo:lang==='es'?'Certificación':'Certification',desc:lang==='es'?'Con 12 a 24 meses de registros completos, OLIVIA puede presentar un proyecto ante Verra. Si se certifica, cómo se reconoce a quienes aportaron el origen se definirá y comunicará en ese momento. Hoy no prometemos pagos.':'With 12 to 24 months of complete records, OLIVIA can submit a project to Verra. If certified, how those who contributed the origin are recognized will be defined and announced then. We promise no payments today.',color:'#f59e0b',activo:false,progreso:0,meta:''},
              ].map((f,i)=>(
                <div key={f.num} style={{display:'flex',gap:12,marginBottom:i<2?16:0}}>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{width:32,height:32,borderRadius:'50%',background:f.activo?f.color:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:f.activo?'white':'#64748b',flexShrink:0}}>
                      {f.activo?f.num:'○'}
                    </div>
                    {i<2&&<div style={{width:2,flex:1,minHeight:20,background:'rgba(255,255,255,0.06)',marginTop:4}} />}
                  </div>
                  <div style={{flex:1,paddingBottom:8}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
                      <div style={{fontSize:10,color:f.color,fontWeight:700,textTransform:'uppercase'}}>{f.fase}</div>
                      {f.activo&&<span style={{fontSize:9,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'2px 6px',borderRadius:20,fontWeight:700}}>{lang==='es'?'ACTIVA':'ACTIVE'}</span>}
                    </div>
                    <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{f.titulo}</div>
                    <div style={{fontSize:10,color:'#64748b',lineHeight:1.5,marginBottom:f.progreso>0?6:0}}>{f.desc}</div>
                    {f.progreso>0&&(
                      <div>
                        <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:99,marginBottom:3}}>
                          <div style={{height:'100%',width:`${f.progreso}%`,background:f.color,borderRadius:99}} />
                        </div>
                        <div style={{fontSize:9,color:'#64748b'}}>{f.meta}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:card,border:`1px solid ${border}`,borderRadius:14,padding:'16px'}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{lang==='es'?'¿Cómo ayudás más?':'How can you help more?'}</div>
              {[
                {icon:'📸',t:lang==='es'?'Mejorá tus fotos':'Improve your photos',d:lang==='es'?'Con una moneda de $10 en el encuadre la validación es más rápida':'A $10 coin in the frame makes validation faster'},
                {icon:'🏢',t:lang==='es'?'Hablá con tu consorcio':'Talk to your building',d:lang==='es'?'Un edificio separa mucho más que una persona sola':'A building sorts far more than one person alone'},
                {icon:'👥',t:lang==='es'?'Invitá vecinos':'Invite neighbors',d:lang==='es'?'Más vecinos, más origen verificado':'More neighbors, more verified origin'},
              ].map(a=>(
                <div key={a.t} style={{display:'flex',gap:10,padding:'8px 0',borderBottom:`1px solid ${border}`}}>
                  <span style={{fontSize:20,flexShrink:0}}>{a.icon}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:600}}>{a.t}</div>
                    <div style={{fontSize:10,color:'#64748b'}}>{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEEDBACK */}
        <div style={{marginTop:24,textAlign:'center'}}>
          <button onClick={()=>setMostrarFeedback(!mostrarFeedback)}
            style={{background:'transparent',border:'none',color:'#64748b',fontSize:11,cursor:'pointer',textDecoration:'underline'}}>
            {lang==='es'?'¿Algo no funciona o tenés una sugerencia?':'Something not working or have a suggestion?'}
          </button>
        </div>

        {mostrarFeedback&&(
          <div style={{marginTop:12,background:card,border:`1px solid ${border}`,borderRadius:12,padding:'16px'}}>
            <div style={{fontSize:12,color:'#94a3b8',marginBottom:8}}>{lang==='es'?'Contanos qué pasó o qué mejorarías:':'Tell us what happened or what you would improve:'}</div>
            <textarea value={feedback} onChange={e=>setFeedback(e.target.value)}
              placeholder={lang==='es'?'Tu sugerencia o el error que encontraste...':'Your suggestion or the error you found...'}
              rows={3}
              style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:`1px solid ${border}`,color:text,fontSize:12,outline:'none',fontFamily:'inherit',resize:'none',boxSizing:'border-box',marginBottom:8}} />
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <button onClick={enviarFeedback}
                style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:8,padding:'8px 16px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
                {lang==='es'?'Enviar':'Send'}
              </button>
              <span style={{fontSize:10,color:'#64748b'}}>hola@oliviacirculab.com.ar</span>
            </div>
          </div>
        )}

        <div style={{height:20}} />
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui',fontSize:14}}>
        Cargando...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
