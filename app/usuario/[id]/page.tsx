'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

const TIPOS_RESIDUO = [
  {v:'organico',l:'Orgánico',icon:'🌿',factor:1.8,color:'#22c55e'},
  {v:'plastico',l:'Plástico',icon:'♻️',factor:1.5,color:'#3b82f6'},
  {v:'papel',l:'Papel',icon:'📄',factor:0.9,color:'#f59e0b'},
  {v:'vidrio',l:'Vidrio',icon:'🍾',factor:0.3,color:'#a855f7'},
  {v:'metal',l:'Metal',icon:'🔩',factor:8.0,color:'#ef4444'},
  {v:'aceite',l:'Aceite',icon:'🛢️',factor:2.5,color:'#f97316'},
  {v:'textil',l:'Textil',icon:'👕',factor:5.5,color:'#ec4899'},
]

export default function PerfilUsuario() {
  const params = useParams()
  const id = params.id as string
  const [usuario, setUsuario] = useState<any>(null)
  const [residuos, setResiduos] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!id) return
    Promise.all([
      supabase.from('usuarios').select('*').eq('id',id).single(),
      supabase.from('residuos').select('id,tipo,kg,status,created_at').eq('usuario_id',id).order('created_at',{ascending:false}),
      supabase.from('posts').select('*').eq('usuario_id',id).order('created_at',{ascending:false}).limit(20),
    ]).then(([u,r,p])=>{
      setUsuario(u.data)
      setResiduos(r.data||[])
      setPosts(p.data||[])
      setLoading(false)
    })
  },[id])

  if(loading) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui'}}>
      Cargando perfil...
    </div>
  )

  if(!usuario) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#64748b',fontFamily:'system-ui'}}>
      Usuario no encontrado
    </div>
  )

  // Cálculos ambientales
  const kg_total = residuos.reduce((a,r)=>a+Number(r.kg),0)
  const co2_total = residuos.reduce((a,r)=>{
    const factor = TIPOS_RESIDUO.find(t=>t.v===r.tipo)?.factor||1.8
    return a + (Number(r.kg)*factor)
  },0)

  // Métricas ambientales reales
  const kg_organico = residuos.filter(r=>r.tipo==='organico').reduce((a,r)=>a+Number(r.kg),0)
  const metano_evitado = kg_organico * 0.065 // kg CH4
  const co2eq_metano = metano_evitado * 84 // CH4 es 84x más potente que CO2
  const km_auto = co2_total / 0.21 // kg CO2 / 0.21 kg CO2 por km
  const arboles_dias = (co2_total / 21) * 365 // días equivalentes de árbol
  const kwh_ahorrados = co2_total / 0.233

  // OLV
  const residuos_validados = residuos.filter(r=>r.status==='validado')
  const olv_total = residuos_validados.reduce((a,r)=>{
    const factor = TIPOS_RESIDUO.find(t=>t.v===r.tipo)?.factor||1.8
    return a + Math.round(Number(r.kg)*factor*100)
  },0)

  // Por tipo
  const por_tipo = TIPOS_RESIDUO.map(t=>{
    const mis = residuos.filter(r=>r.tipo===t.v)
    const kg = mis.reduce((a,r)=>a+Number(r.kg),0)
    return {...t, kg, count:mis.length}
  }).filter(t=>t.kg>0)

  async function compartirPerfil() {
    const texto = `${usuario.nombre} ${usuario.apellido} recicló ${kg_total.toFixed(1)}kg y evitó ${co2_total.toFixed(1)}kg de CO2eq 🌿\n\nUní tu impacto a OLIVIA Circulab → oliviacirculab.com.ar\n\n#OliviaCirculab #ReFi`
    if(navigator.share) {
      try { await navigator.share({title:'Perfil OLIVIA',text:texto,url:window.location.href}) } catch(e) {}
    } else {
      await navigator.clipboard.writeText(texto)
      alert('Texto copiado para compartir')
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'0 0 40px'}}>

      {/* Header */}
      <div style={{padding:'14px 20px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(8,12,22,0.98)',position:'sticky',top:0,zIndex:100}}>
        <a href="/comunidad" style={{color:'#64748b',fontSize:13,textDecoration:'none'}}>← Comunidad</a>
        <button onClick={compartirPerfil}
          style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:8,padding:'6px 14px',color:'#22c55e',fontSize:12,fontWeight:700,cursor:'pointer'}}>
          📤 Compartir perfil
        </button>
      </div>

      {/* Perfil hero */}
      <div style={{padding:'32px 20px 24px',textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'linear-gradient(180deg,rgba(34,197,94,0.04) 0%,transparent 100%)'}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:'linear-gradient(135deg,#22c55e,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:28,color:'white',margin:'0 auto 16px'}}>
          {usuario.nombre?.[0]}{usuario.apellido?.[0]}
        </div>
        <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>{usuario.nombre} {usuario.apellido}</div>
        <div style={{fontSize:12,color:'#22c55e',marginBottom:4}}>Nivel {usuario.nivel||1} · {usuario.score_pulso||0} pts PULSO</div>
        
        {usuario.barrio&&<div style={{fontSize:11,color:'#64748b'}}>📍 {usuario.barrio}</div>}
      </div>

      <div style={{padding:'20px',maxWidth:500,margin:'0 auto'}}>

        {/* Impacto ambiental — lo más importante */}
        <div style={{background:'linear-gradient(135deg,#0f1f10,#050d1f)',border:'2px solid rgba(34,197,94,0.3)',borderRadius:16,padding:'20px',marginBottom:16}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:16,color:'#22c55e'}}>🌍 Su impacto ambiental real</div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
            <div style={{background:'rgba(34,197,94,0.08)',borderRadius:12,padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:28,fontWeight:900,color:'#22c55e'}}>{kg_total.toFixed(1)}</div>
              <div style={{fontSize:10,color:'#64748b',marginTop:2}}>kg desviados del relleno</div>
            </div>
            <div style={{background:'rgba(59,130,246,0.08)',borderRadius:12,padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:28,fontWeight:900,color:'#3b82f6'}}>{co2_total.toFixed(1)}</div>
              <div style={{fontSize:10,color:'#64748b',marginTop:2}}>kg CO2eq evitados</div>
            </div>
          </div>

          {/* Métricas emotivas */}
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {metano_evitado>0&&(
              <div style={{display:'flex',gap:10,padding:'10px',background:'rgba(255,255,255,0.03)',borderRadius:10,alignItems:'center'}}>
                <span style={{fontSize:24,flexShrink:0}}>💨</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>{metano_evitado.toFixed(2)} kg de metano evitados</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:1}}>El metano es 84× más dañino que el CO2 · Sin su separación este gas estaría en la atmósfera hoy</div>
                </div>
              </div>
            )}
            {km_auto>0&&(
              <div style={{display:'flex',gap:10,padding:'10px',background:'rgba(255,255,255,0.03)',borderRadius:10,alignItems:'center'}}>
                <span style={{fontSize:24,flexShrink:0}}>🚗</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>{km_auto.toFixed(0)} km en auto sin emitir</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:1}}>Equivalente ambiental de su reciclaje total</div>
                </div>
              </div>
            )}
            {arboles_dias>0&&(
              <div style={{display:'flex',gap:10,padding:'10px',background:'rgba(255,255,255,0.03)',borderRadius:10,alignItems:'center'}}>
                <span style={{fontSize:24,flexShrink:0}}>🌳</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>{arboles_dias.toFixed(0)} días de trabajo de un árbol</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:1}}>Un árbol adulto absorbe 21 kg CO2 por año</div>
                </div>
              </div>
            )}
            {kwh_ahorrados>0&&(
              <div style={{display:'flex',gap:10,padding:'10px',background:'rgba(255,255,255,0.03)',borderRadius:10,alignItems:'center'}}>
                <span style={{fontSize:24,flexShrink:0}}>💡</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>{kwh_ahorrados.toFixed(0)} horas de luz evitadas</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:1}}>Equivalente en energía eléctrica</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* OLV y registros */}
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px',marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Actividad en OLIVIA</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
            {[
              {v:residuos.length,l:'Registros',c:'#22c55e'},
              {v:residuos_validados.length,l:'Validados',c:'#3b82f6'},
              {v:olv_total,l:'OLV ganados',c:'#a855f7'},
            ].map(k=>(
              <div key={k.l} style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:'10px',textAlign:'center'}}>
                <div style={{fontSize:20,fontWeight:800,color:k.c}}>{k.v}</div>
                <div style={{fontSize:9,color:'#64748b',marginTop:2}}>{k.l}</div>
              </div>
            ))}
          </div>

          {/* Por tipo */}
          {por_tipo.length>0&&(
            <div>
              <div style={{fontSize:11,color:'#64748b',marginBottom:8}}>Residuos por tipo</div>
              {por_tipo.map(t=>(
                <div key={t.v} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{fontSize:16}}>{t.icon}</span>
                    <span style={{fontSize:12}}>{t.l}</span>
                    <span style={{fontSize:10,color:'#64748b'}}>({t.count} registros)</span>
                  </div>
                  <span style={{fontSize:12,fontWeight:700,color:t.color}}>{t.kg.toFixed(1)}kg</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Posts recientes */}
        {posts.length>0&&(
          <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Posts en la comunidad</div>
            {posts.slice(0,5).map((p:any)=>(
              <div key={p.id} style={{padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                {p.contenido&&<div style={{fontSize:12,color:'#f1f5f9',marginBottom:4}}>{p.contenido}</div>}
                {p.foto_url&&<img src={p.foto_url} alt="" style={{width:'100%',borderRadius:8,maxHeight:150,objectFit:'cover',marginBottom:4}} />}
                <div style={{fontSize:10,color:'#64748b'}}>+{p.olv_ganados} OLV · {new Date(p.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}

        {residuos.length===0&&posts.length===0&&(
          <div style={{textAlign:'center',padding:'40px 0',color:'#64748b'}}>
            <div style={{fontSize:32,marginBottom:12}}>🌿</div>
            <div style={{fontSize:14}}>Aún no tiene registros</div>
          </div>
        )}

      </div>
    </div>
  )
}
