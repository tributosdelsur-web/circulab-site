'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

const TIPOS = ['Orgánico', 'Plástico', 'Papel', 'Vidrio', 'Metal']
const TOKENS: any = {'Orgánico':10,'Plástico':8,'Papel':6,'Vidrio':5,'Metal':7}

const PUNTOS = [
  {id:'ruo',nombre:'RUO Recicladores Urbanos del Oeste',direccion:'Yerbal 1473, Caballito',icon:'🏭',lat:-34.6198,lng:-58.4386},
  {id:'ceibo',nombre:'Cooperativa El Ceibo',direccion:'Paraguay 4742, Palermo',icon:'♻️',lat:-34.5875,lng:-58.4298},
  {id:'soldati',nombre:'Centro de Reciclaje Ciudad',direccion:'Ana María Janer 2750, Villa Soldati',icon:'🏗',lat:-34.6647,lng:-58.4389},
  {id:'puntoverde',nombre:'Otro Punto Verde CABA',direccion:'Red de puntos verdes del GCBA',icon:'📍',lat:null,lng:null},
  {id:'casa',nombre:'Lo proceso en casa',direccion:'Compost o reciclaje independiente',icon:'🏠',lat:null,lng:null},
  {id:'otro',nombre:'Otro punto de entrega',direccion:'Especificar en notas',icon:'📌',lat:null,lng:null},
]

export default function Registrar() {
  const [uid, setUid] = useState<string>('')
  const [usuario, setUsuario] = useState<any>(null)
  const [tipo, setTipo] = useState('Orgánico')
  const [puntoId, setPuntoId] = useState('')
  const [kg, setKg] = useState('')
  const [foto1, setFoto1] = useState<File|null>(null)
  const [foto2, setFoto2] = useState<File|null>(null)
  const [notas, setNotas] = useState('')
  const [paso, setPaso] = useState(1)
  const [estado, setEstado] = useState<'idle'|'cargando'|'ok'|'error'>('idle')
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [latOrigen, setLatOrigen] = useState<number|null>(null)
  const [lngOrigen, setLngOrigen] = useState<number|null>(null)
  const [latEntrega, setLatEntrega] = useState<number|null>(null)
  const [lngEntrega, setLngEntrega] = useState<number|null>(null)
  const [gpsStatus, setGpsStatus] = useState<'idle'|'obteniendo'|'ok'|'error'>('idle')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user?.id) {
        setUid(data.session.user.id)
        const { data: u } = await supabase.from('usuarios').select('*').eq('id', data.session.user.id).single()
        setUsuario(u)
      } else {
        router.push('/login?redirect=/registrar')
      }
      setCheckingAuth(false)
    })
  }, [])

  function capturarUbicacion(tipo: 'origen'|'entrega') {
    if (!navigator.geolocation) return
    setGpsStatus('obteniendo')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (tipo==='origen') {
          setLatOrigen(pos.coords.latitude)
          setLngOrigen(pos.coords.longitude)
        } else {
          setLatEntrega(pos.coords.latitude)
          setLngEntrega(pos.coords.longitude)
        }
        setGpsStatus('ok')
      },
      () => setGpsStatus('error'),
      {enableHighAccuracy: true, timeout: 10000}
    )
  }

  async function subirFoto(file: File, prefix: string) {
    const nombre = `${uid}-${Date.now()}-${prefix}-${file.name}`
    const { error } = await supabase.storage.from('residuos-fotos').upload(nombre, file)
    if (error) return null
    const { data } = supabase.storage.from('residuos-fotos').getPublicUrl(nombre)
    return data.publicUrl
  }

  async function handleSubmit() {
    if (!kg || parseFloat(kg) <= 0 || !uid || !puntoId) return
    setEstado('cargando')

    const foto1_url = foto1 ? await subirFoto(foto1, 'origen') : null
    const foto2_url = foto2 ? await subirFoto(foto2, 'entrega') : null
    const tokens = Math.round(parseFloat(kg) * (TOKENS[tipo] || 8))
    const punto = PUNTOS.find(p=>p.id===puntoId)

    const { error } = await supabase.from('residuos').insert({
      usuario_id: uid,
      tipo: tipo.toLowerCase(),
      kg: parseFloat(kg),
      tokens_olv: tokens,
      foto_url: foto1_url,
      foto_entrega_url: foto2_url,
      punto_entrega: punto?.nombre || puntoId,
      lat_origen: latOrigen,
      lng_origen: lngOrigen,
      lat_entrega: latEntrega || punto?.lat,
      lng_entrega: lngEntrega || punto?.lng,
      status_entrega: foto2_url ? 'entregado' : 'pendiente_entrega',
      notas,
      status: 'pendiente',
    })
    setEstado(error ? 'error' : 'ok')
  }

  if (checkingAuth) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui'}}>
      Verificando sesion...
    </div>
  )

  if (estado==='ok') return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:24,fontFamily:'system-ui'}}>
      <div style={{fontSize:56}}>✅</div>
      <div style={{fontSize:22,fontWeight:800,color:'#f1f5f9'}}>Registro enviado</div>
      <div style={{fontSize:13,color:'#64748b',textAlign:'center',maxWidth:320,lineHeight:1.6}}>
        {foto2 ?
          'Tus dos fotos fueron subidas con ubicacion GPS. El equipo Circulab validara en 24hs.' :
          'Foto de origen subida. Cuando entregues el material podes subir la foto de entrega desde tu panel.'
        }
        {(latOrigen||latEntrega) && (
          <span style={{display:'block',marginTop:8,color:'#22c55e',fontSize:11}}>
            📍 Ubicacion GPS registrada correctamente
          </span>
        )}
      </div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginTop:8}}>
        <button onClick={()=>{setEstado('idle');setKg('');setFoto1(null);setFoto2(null);setNotas('');setPuntoId('');setPaso(1);setLatOrigen(null);setLngOrigen(null);setLatEntrega(null);setLngEntrega(null);setGpsStatus('idle')}}
          style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',padding:'10px 24px',borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer'}}>
          Registrar otro →
        </button>
        <a href="/dashboard" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',padding:'10px 24px',borderRadius:10,fontSize:14,fontWeight:600,textDecoration:'none'}}>
          Ver mi panel →
        </a>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',padding:'24px 20px 60px',fontFamily:'system-ui'}}>
      <div style={{maxWidth:500,margin:'0 auto'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>C</div>
            <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>CIRCULAB</span>
          </a>
          {usuario && (
            <div style={{fontSize:11,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'4px 12px',borderRadius:20}}>
              👤 {usuario.nombre}
            </div>
          )}
        </div>

        {/* Progress */}
        <div style={{marginBottom:24}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
            {['Tipo','Destino','Foto origen','Foto entrega','Peso'].map((s,i)=>(
              <div key={s} style={{fontSize:9,color:paso>i+1?'#22c55e':paso===i+1?'#f1f5f9':'#64748b',textAlign:'center',fontWeight:paso===i+1?700:400}}>
                <div style={{width:24,height:24,borderRadius:'50%',background:paso>i+1?'#22c55e':paso===i+1?'rgba(34,197,94,0.2)':'rgba(255,255,255,0.04)',border:paso===i+1?'2px solid #22c55e':'2px solid transparent',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 4px',fontSize:10,fontWeight:700,color:paso>i+1?'white':paso===i+1?'#22c55e':'#64748b'}}>
                  {paso>i+1?'✓':i+1}
                </div>
                {s}
              </div>
            ))}
          </div>
          <div style={{height:3,background:'rgba(255,255,255,0.06)',borderRadius:99}}>
            <div style={{height:'100%',width:((paso-1)/4*100)+'%',background:'linear-gradient(90deg,#22c55e,#16a34a)',borderRadius:99,transition:'width 0.3s'}} />
          </div>
        </div>

        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'24px'}}>

          {/* PASO 1 — Tipo */}
          {paso===1 && (
            <div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:6}}>¿Que tipo de residuo?</div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:20}}>Selecciona el material que separaste</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {TIPOS.map(t=>(
                  <button key={t} onClick={()=>setTipo(t)} style={{padding:'10px 18px',borderRadius:20,border:'none',cursor:'pointer',fontSize:13,fontWeight:600,background:tipo===t?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.04)',color:tipo===t?'#22c55e':'#64748b',outline:tipo===t?'2px solid rgba(34,197,94,0.4)':'2px solid transparent',transition:'all 0.15s'}}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASO 2 — Destino */}
          {paso===2 && (
            <div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:6}}>¿Donde lo llevas?</div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:20}}>Selecciona el punto de entrega</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {PUNTOS.map(p=>(
                  <button key={p.id} onClick={()=>setPuntoId(p.id)} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderRadius:12,border:'none',cursor:'pointer',background:puntoId===p.id?'rgba(34,197,94,0.1)':'rgba(255,255,255,0.02)',outline:puntoId===p.id?'2px solid rgba(34,197,94,0.4)':'2px solid rgba(255,255,255,0.04)',transition:'all 0.15s',textAlign:'left',width:'100%'}}>
                    <span style={{fontSize:20,flexShrink:0}}>{p.icon}</span>
                    <div>
                      <div style={{fontSize:12,fontWeight:600,color:puntoId===p.id?'#22c55e':'#f1f5f9'}}>{p.nombre}</div>
                      <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{p.direccion}</div>
                    </div>
                    {puntoId===p.id && <span style={{marginLeft:'auto',color:'#22c55e',fontSize:16}}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASO 3 — Foto origen */}
          {paso===3 && (
            <div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:6}}>📷 Foto en tu casa</div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:12}}>Foto de los residuos separados antes de llevarlos</div>
              <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,padding:'10px 14px',marginBottom:16}}>
                <div style={{fontSize:11,color:'#f59e0b',fontWeight:600,marginBottom:4}}>📌 Incluí una moneda como referencia</div>
                <div style={{fontSize:10,color:'#94a3b8'}}>Pone un peso o dólar junto al material para que podamos estimar el volumen</div>
              </div>

              <label style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'28px 20px',borderRadius:12,cursor:'pointer',border:foto1?'2px solid rgba(34,197,94,0.4)':'2px dashed rgba(255,255,255,0.1)',background:foto1?'rgba(34,197,94,0.06)':'rgba(255,255,255,0.02)',marginBottom:16}}>
                <input type="file" accept="image/*" capture="environment" onChange={e=>setFoto1(e.target.files?.[0]||null)} style={{display:'none'}} />
                {foto1 ? (
                  <>
                    <div style={{fontSize:28,marginBottom:6}}>📸</div>
                    <div style={{fontSize:13,color:'#22c55e',fontWeight:600}}>{foto1.name}</div>
                    <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{(foto1.size/1024).toFixed(0)} KB · Toca para cambiar</div>
                  </>
                ) : (
                  <>
                    <div style={{fontSize:28,marginBottom:6}}>📷</div>
                    <div style={{fontSize:13,color:'#94a3b8'}}>Sacar foto o subir imagen</div>
                    <div style={{fontSize:10,color:'#64748b',marginTop:2}}>JPG, PNG · Max 5MB</div>
                  </>
                )}
              </label>

              <button onClick={()=>capturarUbicacion('origen')} style={{width:'100%',padding:'10px',borderRadius:10,border:'1px solid rgba(34,197,94,0.3)',background:latOrigen?'rgba(34,197,94,0.1)':'rgba(255,255,255,0.02)',color:latOrigen?'#22c55e':'#64748b',fontSize:12,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                {gpsStatus==='obteniendo'?'⏳ Obteniendo ubicacion...':latOrigen?'📍 Ubicacion registrada ✓':'📍 Registrar mi ubicacion actual (GPS)'}
              </button>
              {latOrigen && (
                <div style={{fontSize:10,color:'#64748b',marginTop:6,textAlign:'center'}}>
                  {latOrigen.toFixed(5)}, {lngOrigen?.toFixed(5)}
                </div>
              )}
            </div>
          )}

          {/* PASO 4 — Foto entrega */}
          {paso===4 && (
            <div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:6}}>📷 Foto en el punto de entrega</div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Foto cuando entregas el material en {PUNTOS.find(p=>p.id===puntoId)?.nombre}</div>
              <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:10,padding:'10px 14px',marginBottom:16}}>
                <div style={{fontSize:11,color:'#93c5fd',fontWeight:600,marginBottom:2}}>💡 Esta foto es opcional pero suma puntos</div>
                <div style={{fontSize:10,color:'#94a3b8'}}>Podes subir esta foto ahora o despues desde tu panel. Cierra el ciclo de trazabilidad y aumenta tus tokens OLV.</div>
              </div>

              <label style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'28px 20px',borderRadius:12,cursor:'pointer',border:foto2?'2px solid rgba(59,130,246,0.4)':'2px dashed rgba(255,255,255,0.1)',background:foto2?'rgba(59,130,246,0.06)':'rgba(255,255,255,0.02)',marginBottom:16}}>
                <input type="file" accept="image/*" capture="environment" onChange={e=>setFoto2(e.target.files?.[0]||null)} style={{display:'none'}} />
                {foto2 ? (
                  <>
                    <div style={{fontSize:28,marginBottom:6}}>📸</div>
                    <div style={{fontSize:13,color:'#3b82f6',fontWeight:600}}>{foto2.name}</div>
                    <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{(foto2.size/1024).toFixed(0)} KB · Toca para cambiar</div>
                  </>
                ) : (
                  <>
                    <div style={{fontSize:28,marginBottom:6}}>📷</div>
                    <div style={{fontSize:13,color:'#94a3b8'}}>Foto en el punto de entrega</div>
                    <div style={{fontSize:10,color:'#64748b',marginTop:2}}>Opcional — podes subir despues</div>
                  </>
                )}
              </label>

              {foto2 && (
                <button onClick={()=>capturarUbicacion('entrega')} style={{width:'100%',padding:'10px',borderRadius:10,border:'1px solid rgba(59,130,246,0.3)',background:latEntrega?'rgba(59,130,246,0.1)':'rgba(255,255,255,0.02)',color:latEntrega?'#3b82f6':'#64748b',fontSize:12,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                  {latEntrega?'📍 Ubicacion de entrega registrada ✓':'📍 Registrar ubicacion de entrega (GPS)'}
                </button>
              )}

              {!foto2 && (
                <button onClick={()=>setPaso(5)} style={{width:'100%',padding:'10px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'#64748b',fontSize:12,cursor:'pointer'}}>
                  Omitir por ahora — subir despues →
                </button>
              )}
            </div>
          )}

          {/* PASO 5 — Peso y notas */}
          {paso===5 && (
            <div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:6}}>Peso y notas</div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:20}}>Ultimo paso — estima el peso total</div>

              <div style={{marginBottom:16}}>
                <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Cantidad estimada (kg)</label>
                <input type="number" step="0.1" min="0" value={kg} onChange={e=>setKg(e.target.value)} placeholder="ej: 2.5"
                  style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:16,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
                {kg && parseFloat(kg) > 0 && (
                  <div style={{marginTop:8,fontSize:12,color:'#22c55e'}}>
                    ≈ {Math.round(parseFloat(kg) * (TOKENS[tipo]||8))} tokens OLV a acreditar
                  </div>
                )}
              </div>

              <div style={{marginBottom:20}}>
                <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Notas (opcional)</label>
                <textarea value={notas} onChange={e=>setNotas(e.target.value)} placeholder="ej: bien separado, sin mezcla, bolsa verde..." rows={3}
                  style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',resize:'none',boxSizing:'border-box'}} />
              </div>

              <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10,padding:'12px',marginBottom:20}}>
                <div style={{fontSize:11,color:'#22c55e',fontWeight:600,marginBottom:6}}>Resumen de tu registro</div>
                <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.8}}>
                  Tipo: <span style={{color:'#f1f5f9'}}>{tipo}</span><br/>
                  Destino: <span style={{color:'#f1f5f9'}}>{PUNTOS.find(p=>p.id===puntoId)?.nombre}</span><br/>
                  Foto origen: <span style={{color:foto1?'#22c55e':'#f59e0b'}}>{foto1?'✓ Subida':'Sin foto'}</span><br/>
                  Foto entrega: <span style={{color:foto2?'#22c55e':'#64748b'}}>{foto2?'✓ Subida':'Se puede subir despues'}</span><br/>
                  GPS origen: <span style={{color:latOrigen?'#22c55e':'#64748b'}}>{latOrigen?'✓ Registrado':'No capturado'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botones de navegacion */}
        <div style={{display:'flex',gap:12,marginTop:16}}>
          {paso > 1 && (
            <button onClick={()=>setPaso(paso-1)} style={{flex:1,padding:'14px',borderRadius:12,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'#64748b',fontSize:14,fontWeight:600,cursor:'pointer'}}>
              ← Atras
            </button>
          )}
          {paso < 5 ? (
            <button onClick={()=>setPaso(paso+1)}
              disabled={paso===1?!tipo:paso===2?!puntoId:paso===3?!foto1:false}
              style={{flex:2,padding:'14px',borderRadius:12,border:'none',background:(paso===1&&tipo)||(paso===2&&puntoId)||(paso===3&&foto1)||paso===4?'linear-gradient(135deg,#22c55e,#16a34a)':'rgba(255,255,255,0.04)',color:(paso===1&&tipo)||(paso===2&&puntoId)||(paso===3&&foto1)||paso===4?'white':'#64748b',fontSize:15,fontWeight:700,cursor:'pointer'}}>
              Siguiente →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={estado==='cargando'||!kg}
              style={{flex:2,padding:'14px',borderRadius:12,border:'none',background:!kg?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!kg?'#64748b':'white',fontSize:15,fontWeight:700,cursor:!kg?'not-allowed':'pointer',boxShadow:kg?'0 0 30px rgba(34,197,94,0.25)':'none'}}>
              {estado==='cargando'?'⏳ Enviando...':'✅ Registrar residuo'}
            </button>
          )}
        </div>

        <a href="/dashboard" style={{display:'block',textAlign:'center',marginTop:16,fontSize:12,color:'#64748b',textDecoration:'none'}}>← Volver al panel</a>
      </div>
    </div>
  )
}
