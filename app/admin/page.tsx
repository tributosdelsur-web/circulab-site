'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const ADMIN_PASSWORD = 'circulab2026'

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const [residuos, setResiduos] = useState<any[]>([])
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [encuestas, setEncuestas] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [ndas, setNdas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('pendientes')
  const [analizando, setAnalizando] = useState<string|null>(null)
  const [analisis, setAnalisis] = useState<any>({})
  const [pesoReal, setPesoReal] = useState<any>({})
  const [fotoGrande, setFotoGrande] = useState<string|null>(null)

  async function cargar() {
    const [r, u, e, l, n] = await Promise.all([
      supabase.from('residuos').select('*, usuarios(nombre,apellido,consorcio)').order('created_at',{ascending:false}),
      supabase.from('usuarios').select('*').order('created_at',{ascending:false}),
      supabase.from('encuestas').select('*').order('created_at',{ascending:false}),
      supabase.from('leads_inversores').select('*').order('created_at',{ascending:false}),
      supabase.from('nda_firmas').select('*').order('created_at',{ascending:false}),
    ])
    setResiduos(r.data||[])
    setUsuarios(u.data||[])
    setEncuestas(e.data||[])
    setLeads(l.data||[])
    setNdas(n.data||[])
    setLoading(false)
  }

  useEffect(()=>{if(auth) cargar()},[auth])

  async function validar(id: string) {
    const peso = pesoReal[id]
    const update: any = {status:'validado'}
    if(peso) update.kg = parseFloat(peso)
    await supabase.from('residuos').update(update).eq('id',id)
    cargar()
  }

  async function rechazar(id: string) {
    await supabase.from('residuos').update({status:'rechazado'}).eq('id',id)
    cargar()
  }

  async function validarTodos() {
    const pendientes = residuos.filter(r=>r.status==='pendiente').map(r=>r.id)
    await Promise.all(pendientes.map(id=>supabase.from('residuos').update({status:'validado'}).eq('id',id)))
    cargar()
  }

  async function analizarFoto(residuo: any) {
    if(!residuo.foto_url) return
    setAnalizando(residuo.id)
    try {
      const response = await fetch('/api/analizar-foto', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({foto_url:residuo.foto_url})
      })
      const resultado = await response.json()
      setAnalisis((prev:any)=>({...prev,[residuo.id]:resultado}))
    } catch(e) {
      setAnalisis((prev:any)=>({...prev,[residuo.id]:{error:'No se pudo analizar la foto'}}))
    }
    setAnalizando(null)
  }

  function contarPorValor(campo: string) {
    const counts: any = {}
    encuestas.forEach(e=>{
      const v = e[campo]||'sin respuesta'
      counts[v] = (counts[v]||0)+1
    })
    return Object.entries(counts).sort((a:any,b:any)=>b[1]-a[1])
  }

  const totalEncuestas = encuestas.length
  const quierePiloto = encuestas.filter(e=>e.quiere_piloto==='si').length
  const noSeparan = encuestas.filter(e=>e.separa==='no').length
  const separanSiempre = encuestas.filter(e=>e.separa==='si').length

  function handleLogin() {
    if(pwd===ADMIN_PASSWORD){setAuth(true);setError(false)}
    else setError(true)
  }

  if(!auth) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
      <div style={{width:'100%',maxWidth:360}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:56,height:56,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:'white',margin:'0 auto 16px'}}>C</div>
          <div style={{fontSize:20,fontWeight:900,color:'#f1f5f9'}}>Panel Admin</div>
          <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Circulab Tech · Acceso restringido</div>
        </div>
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'28px'}}>
          <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&handleLogin()}
            placeholder="Contraseña de admin"
            style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:`1px solid ${error?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.08)'}`,color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:error?8:16}} />
          {error&&<div style={{fontSize:12,color:'#ef4444',marginBottom:12}}>Contraseña incorrecta</div>}
          <button onClick={handleLogin} style={{width:'100%',padding:'12px',borderRadius:10,border:'none',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',fontSize:14,fontWeight:700,cursor:'pointer'}}>
            Entrar →
          </button>
        </div>
      </div>
    </div>
  )

  const pendientes = residuos.filter(r=>r.status==='pendiente')
  const tabs = [
    {id:'pendientes',label:`Pendientes (${pendientes.length})`,color:'#f59e0b'},
    {id:'todos',label:`Todos (${residuos.length})`,color:'#64748b'},
    {id:'usuarios',label:`Usuarios (${usuarios.length})`,color:'#3b82f6'},
    {id:'encuestas',label:`Encuestas (${totalEncuestas})`,color:'#22c55e'},
    {id:'leads',label:`Leads One Pager (${leads.length})`,color:'#a855f7'},
    {id:'nda',label:`NDA Whitepaper (${ndas.length})`,color:'#f59e0b'},
  ]

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui'}}>

      {fotoGrande&&(
        <div onClick={()=>setFotoGrande(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.95)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <img src={fotoGrande} alt="" style={{maxWidth:'100%',maxHeight:'90vh',objectFit:'contain',borderRadius:12}} />
          <div style={{position:'absolute',top:16,right:16,color:'white',fontSize:28,cursor:'pointer'}}>×</div>
        </div>
      )}

      {/* Header */}
      <div style={{padding:'16px 24px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#080c16',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>C</div>
          <div>
            <div style={{fontSize:13,fontWeight:800}}>Admin Panel</div>
            <div style={{fontSize:9,color:'#64748b'}}>CIRCULAB TECH</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {tab==='pendientes'&&pendientes.length>0&&(
            <button onClick={validarTodos} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:8,padding:'6px 14px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
              ✅ Validar todos ({pendientes.length})
            </button>
          )}
          <a href="/" style={{fontSize:11,color:'#64748b',textDecoration:'none'}}>← Sitio</a>
        </div>
      </div>

      {/* KPIs */}
      <div style={{padding:'16px 24px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:10,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        {[
          {v:pendientes.length,l:'Pendientes',c:'#f59e0b'},
          {v:usuarios.length,l:'Usuarios',c:'#3b82f6'},
          {v:totalEncuestas,l:'Encuestas',c:'#22c55e'},
          {v:quierePiloto,l:'Quieren piloto',c:'#22c55e'},
          {v:leads.length,l:'Leads One Pager',c:'#a855f7'},
          {v:ndas.length,l:'NDA Whitepaper',c:'#f59e0b'},
        ].map(k=>(
          <div key={k.l} style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:800,color:k.c}}>{k.v}</div>
            <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{k.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,padding:'12px 24px',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'6px 14px',borderRadius:8,border:'none',cursor:'pointer',fontSize:12,fontWeight:tab===t.id?700:500,background:tab===t.id?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.04)',color:tab===t.id?t.color:'#64748b',whiteSpace:'nowrap'}}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{padding:'16px 24px',maxWidth:900,margin:'0 auto'}}>

        {/* RESIDUOS */}
        {(tab==='pendientes'||tab==='todos')&&(
          <div>
            {(tab==='pendientes'?pendientes:residuos).length===0?(
              <div style={{textAlign:'center',padding:'40px',color:'#64748b',fontSize:14}}>
                {tab==='pendientes'?'✅ Sin pendientes':'Sin registros aún'}
              </div>
            ):(tab==='pendientes'?pendientes:residuos).map((r:any)=>(
              <div key={r.id} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'18px',marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12,flexWrap:'wrap',gap:8}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,textTransform:'capitalize'}}>{r.tipo} · {r.kg}kg</div>
                    <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{r.usuarios?.nombre} {r.usuarios?.apellido}</div>
                    {r.punto_entrega&&<div style={{fontSize:10,color:'#3b82f6',marginTop:2}}>📍 {r.punto_entrega}</div>}
                    <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{new Date(r.created_at).toLocaleDateString()}</div>
                    {(r.lat_origen||r.lat_entrega)&&(
                      <div style={{fontSize:10,color:'#22c55e',marginTop:2}}>
                        📍 GPS {r.lat_origen?`Origen: ${Number(r.lat_origen).toFixed(4)},${Number(r.lng_origen).toFixed(4)}`:''}
                        {r.lat_entrega?` · Entrega: ${Number(r.lat_entrega).toFixed(4)},${Number(r.lng_entrega).toFixed(4)}`:''}
                      </div>
                    )}
                  </div>
                  <span style={{fontSize:11,color:r.status==='validado'?'#22c55e':r.status==='rechazado'?'#ef4444':'#f59e0b',background:r.status==='validado'?'rgba(34,197,94,0.1)':r.status==='rechazado'?'rgba(239,68,68,0.1)':'rgba(245,158,11,0.1)',padding:'3px 10px',borderRadius:20}}>
                    {r.status==='validado'?'✓ Validado':r.status==='rechazado'?'✗ Rechazado':'⏳ Pendiente'}
                  </span>
                </div>

                <div style={{display:'flex',gap:10,marginBottom:12,flexWrap:'wrap'}}>
                  {r.foto_url&&(
                    <div>
                      <img src={r.foto_url} alt="Origen" onClick={()=>setFotoGrande(r.foto_url)}
                        style={{width:120,height:90,objectFit:'cover',borderRadius:8,cursor:'pointer',border:'2px solid rgba(34,197,94,0.3)'}} />
                      <div style={{fontSize:8,color:'#22c55e',textAlign:'center',marginTop:2}}>Foto origen</div>
                    </div>
                  )}
                  {r.foto_entrega_url&&(
                    <div>
                      <img src={r.foto_entrega_url} alt="Entrega" onClick={()=>setFotoGrande(r.foto_entrega_url)}
                        style={{width:120,height:90,objectFit:'cover',borderRadius:8,cursor:'pointer',border:'2px solid rgba(59,130,246,0.3)'}} />
                      <div style={{fontSize:8,color:'#3b82f6',textAlign:'center',marginTop:2}}>Foto entrega</div>
                    </div>
                  )}
                </div>

                {analisis[r.id]&&!analisis[r.id].error&&(
                  <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'12px',marginBottom:12}}>
                    <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8}}>🤖 Análisis OLIVIA IA</div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:8,marginBottom:8}}>
                      {[
                        {l:'Tipo detectado',v:analisis[r.id].tipo_detectado},
                        {l:'Separación',v:analisis[r.id].separacion_correcta?'✅ Correcta':'❌ Incorrecta'},
                        {l:'Peso estimado',v:analisis[r.id].peso_estimado_kg+'kg'},
                        {l:'Moneda ref.',v:analisis[r.id].moneda_referencia?'✅ Sí':'❌ No'},
                        {l:'Contaminantes',v:analisis[r.id].contaminantes?'⚠️ Sí':'✅ No'},
                        {l:'Calidad foto',v:analisis[r.id].calidad_foto},
                      ].map(item=>(
                        <div key={item.l} style={{background:'rgba(255,255,255,0.02)',borderRadius:6,padding:'6px 8px'}}>
                          <div style={{fontSize:9,color:'#64748b'}}>{item.l}</div>
                          <div style={{fontSize:11,fontWeight:600,color:'#f1f5f9',marginTop:1}}>{item.v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{fontSize:11,color:'#94a3b8',marginBottom:6}}>{analisis[r.id].observaciones}</div>
                    <div style={{fontSize:12,fontWeight:700,color:analisis[r.id].recomendacion==='VALIDAR'?'#22c55e':analisis[r.id].recomendacion==='RECHAZAR'?'#ef4444':'#f59e0b'}}>
                      Recomendación: {analisis[r.id].recomendacion} · Confianza: {analisis[r.id].confianza}
                    </div>
                  </div>
                )}

                {analisis[r.id]?.error&&(
                  <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:10,padding:'10px',marginBottom:12,fontSize:11,color:'#ef4444'}}>
                    {analisis[r.id].error}
                  </div>
                )}

                <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'center',flexWrap:'wrap'}}>
                  <div style={{fontSize:11,color:'#64748b'}}>Peso real:</div>
                  <input type="number" step="0.1" placeholder={String(r.kg)+'kg declarado'}
                    value={pesoReal[r.id]||''}
                    onChange={e=>setPesoReal((prev:any)=>({...prev,[r.id]:e.target.value}))}
                    style={{width:120,padding:'6px 10px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:12,outline:'none'}} />
                  <div style={{fontSize:10,color:'#64748b'}}>kg (opcional)</div>
                </div>

                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {r.foto_url&&(
                    <button onClick={()=>analizarFoto(r)} disabled={analizando===r.id}
                      style={{background:'rgba(168,85,247,0.15)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:8,padding:'7px 14px',color:'#a855f7',fontSize:12,fontWeight:600,cursor:'pointer'}}>
                      {analizando===r.id?'🤖 Analizando...':'🤖 Analizar con IA'}
                    </button>
                  )}
                  {r.status==='pendiente'&&(
                    <>
                      <button onClick={()=>validar(r.id)} style={{background:'rgba(34,197,94,0.15)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:8,padding:'7px 14px',color:'#22c55e',fontSize:12,fontWeight:600,cursor:'pointer'}}>
                        ✅ Validar
                      </button>
                      <button onClick={()=>rechazar(r.id)} style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:8,padding:'7px 14px',color:'#ef4444',fontSize:12,fontWeight:600,cursor:'pointer'}}>
                        ✗ Rechazar
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* USUARIOS */}
        {tab==='usuarios'&&(
          <div>
            {usuarios.map((u:any)=>(
              <div key={u.id} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'14px',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700}}>{u.nombre} {u.apellido}</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{u.email} · {u.consorcio}</div>
                  <div style={{fontSize:10,color:'#22c55e',marginTop:2}}>Nivel {u.nivel} · {u.score_pulso} pts PULSO</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:12,fontWeight:700,color:'#22c55e'}}>{residuos.filter(r=>r.usuario_id===u.id).length} registros</div>
                  <div style={{fontSize:10,color:'#64748b'}}>{new Date(u.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ENCUESTAS */}
        {tab==='encuestas'&&(
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:10}}>
              {[
                {v:totalEncuestas,l:'Total respuestas',c:'#22c55e'},
                {v:quierePiloto,l:'Quieren piloto',c:'#22c55e'},
                {v:separanSiempre,l:'Separan siempre',c:'#3b82f6'},
                {v:noSeparan,l:'No separan',c:'#f59e0b'},
                {v:encuestas.filter(e=>e.consorcio_participaria==='si').length,l:'Consorcio participaría',c:'#a855f7'},
              ].map(k=>(
                <div key={k.l} style={{background:'rgba(255,255,255,0.04)',borderRadius:12,padding:'14px',textAlign:'center'}}>
                  <div style={{fontSize:28,fontWeight:800,color:k.c}}>{k.v}</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:4}}>{k.l}</div>
                </div>
              ))}
            </div>

            {[
              {campo:'separa',titulo:'¿Separás residuos?'},
              {campo:'por_que_no_separa',titulo:'¿Por qué no separás?'},
              {campo:'motivacion',titulo:'¿Qué te motivaría?'},
              {campo:'como_conocio',titulo:'¿Cómo llegaste a Circulab?'},
              {campo:'opinion_olivia',titulo:'¿Qué te parece OLIVIA?'},
              {campo:'tipo_vivienda',titulo:'Tipo de vivienda'},
              {campo:'quiere_piloto',titulo:'¿Querés sumarte al piloto?'},
            ].map(({campo,titulo})=>{
              const datos = contarPorValor(campo).filter(([k])=>k&&k!=='sin respuesta')
              if(datos.length===0) return null
              const total = datos.reduce((a,[,v])=>a+(v as number),0)
              return (
                <div key={campo} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#22c55e'}}>{titulo}</div>
                  {datos.map(([label,count]:any)=>(
                    <div key={label} style={{marginBottom:8}}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:4}}>
                        <span style={{color:'#f1f5f9',textTransform:'capitalize'}}>{String(label).replace(/_/g,' ')}</span>
                        <span style={{color:'#22c55e',fontWeight:700}}>{count} ({Math.round(count/total*100)}%)</span>
                      </div>
                      <div style={{height:8,background:'rgba(255,255,255,0.06)',borderRadius:99}}>
                        <div style={{height:'100%',width:(count/total*100)+'%',background:'linear-gradient(90deg,#22c55e,#16a34a)',borderRadius:99}} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}

            {encuestas.filter(e=>e.quiere_piloto==='si'&&e.contacto).length>0&&(
              <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#22c55e'}}>🙋 Quieren unirse al piloto</div>
                {encuestas.filter(e=>e.quiere_piloto==='si'&&e.contacto).map((e:any,i:number)=>(
                  <div key={i} style={{padding:'8px 10px',borderRadius:8,background:'rgba(255,255,255,0.02)',marginBottom:6}}>
                    <div style={{fontSize:12,fontWeight:600}}>{e.nombre||'Sin nombre'}</div>
                    <div style={{fontSize:11,color:'#22c55e'}}>{e.contacto}</div>
                    <div style={{fontSize:10,color:'#64748b'}}>{e.barrio} · {e.tipo_vivienda}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LEADS ONE PAGER */}
        {tab==='leads'&&(
          <div>
            <div style={{background:'rgba(168,85,247,0.06)',border:'1px solid rgba(168,85,247,0.2)',borderRadius:12,padding:'14px',marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:700,color:'#a855f7',marginBottom:4}}>Leads del One Pager v2</div>
              <div style={{fontSize:11,color:'#64748b'}}>Personas que ingresaron su email para ver el One Pager de inversores</div>
            </div>
            {leads.length===0?(
              <div style={{textAlign:'center',padding:'40px',color:'#64748b',fontSize:14}}>Sin leads aún</div>
            ):leads.map((l:any)=>(
              <div key={l.id} style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:12,padding:'14px',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700}}>{l.nombre}</div>
                  <div style={{fontSize:11,color:'#a855f7',marginTop:2}}>{l.email}</div>
                  {l.empresa&&<div style={{fontSize:10,color:'#64748b',marginTop:2}}>🏢 {l.empresa}</div>}
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:10,color:'#64748b'}}>{new Date(l.created_at).toLocaleDateString()}</div>
                  <div style={{fontSize:10,color:'#a855f7',marginTop:2}}>{l.documento||'one-pager'}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NDA WHITEPAPER */}
        {tab==='nda'&&(
          <div>
            <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:12,padding:'14px',marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:700,color:'#f59e0b',marginBottom:4}}>Firmas NDA — Whitepaper v1.1</div>
              <div style={{fontSize:11,color:'#64748b'}}>Personas que firmaron el NDA para acceder al Whitepaper técnico completo</div>
            </div>
            {ndas.length===0?(
              <div style={{textAlign:'center',padding:'40px',color:'#64748b',fontSize:14}}>Sin firmas NDA aún</div>
            ):ndas.map((n:any)=>(
              <div key={n.id} style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:12,padding:'14px',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700}}>{n.nombre}</div>
                  <div style={{fontSize:11,color:'#f59e0b',marginTop:2}}>{n.email}</div>
                  {n.empresa&&<div style={{fontSize:10,color:'#64748b',marginTop:2}}>🏢 {n.empresa}</div>}
                  <div style={{fontSize:10,color:'#22c55e',marginTop:2}}>✅ NDA firmado digitalmente</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:10,color:'#64748b'}}>{new Date(n.created_at).toLocaleDateString()}</div>
                  <div style={{fontSize:10,color:'#f59e0b',marginTop:2}}>Whitepaper v1.1</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
