'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const CO2_FACTORS: any = {organico:0.7,plastico:1.5,papel:0.9,vidrio:0.3,metal:8.0}
const KM_RELLENO = 35
const DIST = {circulab:0.50,vecino:0.25,recolector:0.15,planta:0.10}

function calcDist(tipo: string, kg: number, validado: boolean) {
  const factor = CO2_FACTORS[tipo]||0.5
  const co2eq = kg*factor*(validado?1.0:0.7)*(1+KM_RELLENO/100)
  const vcs = (co2eq/1000)*22
  const art64 = (co2eq/1000)*90
  return {
    co2eq:parseFloat(co2eq.toFixed(4)),
    vcs:parseFloat(vcs.toFixed(6)),
    art64:parseFloat(art64.toFixed(6)),
    circulabVCS:parseFloat((vcs*DIST.circulab).toFixed(6)),
    vecinoVCS:parseFloat((vcs*DIST.vecino).toFixed(6)),
    recolectorVCS:parseFloat((vcs*DIST.recolector).toFixed(6)),
    plantaVCS:parseFloat((vcs*DIST.planta).toFixed(6)),
    circulabArt64:parseFloat((art64*DIST.circulab).toFixed(6)),
    vecinoArt64:parseFloat((art64*DIST.vecino).toFixed(6)),
    recolectorArt64:parseFloat((art64*DIST.recolector).toFixed(6)),
    plantaArt64:parseFloat((art64*DIST.planta).toFixed(6)),
  }
}

export default function Distribucion() {
  const [uid, setUid] = useState('')
  const [residuos, setResiduos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(data.session?.user?.id) setUid(data.session.user.id)
      else window.location.href='/login'
    })
  },[])

  useEffect(()=>{
    if(!uid) return
    supabase.from('residuos').select('*').eq('usuario_id',uid).order('fecha',{ascending:false})
      .then(({data})=>{setResiduos(data||[]);setLoading(false)})
  },[uid])

  const totales = residuos.reduce((acc,r)=>{
    const d = calcDist(r.tipo,Number(r.kg),r.status==='validado')
    return {
      vcs:acc.vcs+d.vcs,
      art64:acc.art64+d.art64,
      circulabVCS:acc.circulabVCS+d.circulabVCS,
      vecinoVCS:acc.vecinoVCS+d.vecinoVCS,
      recolectorVCS:acc.recolectorVCS+d.recolectorVCS,
      plantaVCS:acc.plantaVCS+d.plantaVCS,
      vecinoArt64:acc.vecinoArt64+d.vecinoArt64,
    }
  },{vcs:0,art64:0,circulabVCS:0,vecinoVCS:0,recolectorVCS:0,plantaVCS:0,vecinoArt64:0})

  if(loading) return <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui'}}>Cargando...</div>

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px',maxWidth:800,margin:'0 auto'}}>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
        <a href="/dashboard" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>C</div>
          <span style={{fontSize:13,color:'#64748b'}}>← Volver al panel</span>
        </a>
      </div>

      <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>💰 Distribucion de tu credito</div>
      <div style={{fontSize:12,color:'#64748b',marginBottom:24}}>Como se distribuye el valor generado por tus residuos entre todos los actores del ecosistema</div>

      {/* Resumen total */}
      <div style={{background:'linear-gradient(135deg,#0a1628,#0f1f10)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'20px',marginBottom:20}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:16,color:'#22c55e'}}>Resumen total</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
          <div style={{background:'rgba(34,197,94,0.08)',borderRadius:12,padding:'14px',textAlign:'center'}}>
            <div style={{fontSize:11,color:'#64748b',marginBottom:4}}>Tu parte con VCS (25%)</div>
            <div style={{fontSize:22,fontWeight:800,color:'#22c55e'}}>USD {totales.vecinoVCS.toFixed(4)}</div>
          </div>
          <div style={{background:'rgba(168,85,247,0.08)',borderRadius:12,padding:'14px',textAlign:'center'}}>
            <div style={{fontSize:11,color:'#64748b',marginBottom:4}}>Tu parte con Art. 6.4 (25%)</div>
            <div style={{fontSize:22,fontWeight:800,color:'#a855f7'}}>USD {totales.vecinoArt64.toFixed(4)}</div>
          </div>
        </div>

        {/* Barra 50/25/15/10 */}
        <div style={{marginBottom:8}}>
          <div style={{fontSize:11,color:'#64748b',marginBottom:8}}>Distribucion del credito generado</div>
          <div style={{display:'flex',height:28,borderRadius:8,overflow:'hidden',gap:1}}>
            <div style={{width:'50%',background:'#3b82f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'white'}}>Circulab 50%</div>
            <div style={{width:'25%',background:'#22c55e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'white'}}>Vos 25%</div>
            <div style={{width:'15%',background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white'}}>Rec 15%</div>
            <div style={{width:'10%',background:'#a855f7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white'}}>10%</div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:12}}>
          {[
            {actor:'Circulab',desc:'Infraestructura y certificacion',pct:'50%',val:totales.circulabVCS,color:'#3b82f6',icon:'🏗️'},
            {actor:'Vos',desc:'Separacion en origen',pct:'25%',val:totales.vecinoVCS,color:'#22c55e',icon:'🌿'},
            {actor:'Recolector',desc:'Transporte y logistica',pct:'15%',val:totales.recolectorVCS,color:'#f59e0b',icon:'🚲'},
            {actor:'Planta',desc:'Procesamiento y abono',pct:'10%',val:totales.plantaVCS,color:'#a855f7',icon:'🏭'},
          ].map(a=>(
            <div key={a.actor} style={{background:'rgba(255,255,255,0.02)',borderRadius:10,padding:'12px',border:`1px solid ${a.color}22`}}>
              <div style={{fontSize:12,fontWeight:700,color:a.color,marginBottom:2}}>{a.icon} {a.actor} {a.pct}</div>
              <div style={{fontSize:10,color:'#64748b',marginBottom:6}}>{a.desc}</div>
              <div style={{fontSize:13,fontWeight:700,color:a.color}}>USD {a.val.toFixed(5)}</div>
              <div style={{fontSize:9,color:'#64748b'}}>referencia VCS</div>
            </div>
          ))}
        </div>
      </div>

      {/* Por residuo */}
      <div style={{fontSize:14,fontWeight:700,marginBottom:12}}>Detalle por registro</div>
      {residuos.length===0?(
        <div style={{background:'#111827',borderRadius:16,padding:'32px',textAlign:'center',color:'#64748b'}}>
          No hay residuos aun. <a href="/registrar" style={{color:'#22c55e',textDecoration:'none',fontWeight:600}}>Registrar →</a>
        </div>
      ):residuos.map((r,i)=>{
        const d = calcDist(r.tipo,Number(r.kg),r.status==='validado')
        return (
          <div key={i} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'18px',marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,textTransform:'capitalize'}}>{r.tipo} — {r.kg}kg</div>
                <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{r.fecha} · {d.co2eq} tCO2eq</div>
                {r.punto_entrega && <div style={{fontSize:10,color:'#3b82f6',marginTop:2}}>📍 {r.punto_entrega}</div>}
              </div>
              <span style={{fontSize:10,color:r.status==='validado'?'#22c55e':'#f59e0b',background:r.status==='validado'?'rgba(34,197,94,0.1)':'rgba(245,158,11,0.1)',padding:'3px 10px',borderRadius:20,height:'fit-content'}}>
                {r.status==='validado'?'✓ Validado':'⏳ Pendiente'}
              </span>
            </div>
            <div style={{display:'flex',gap:8,marginBottom:12}}>
              <div style={{flex:1,background:'rgba(34,197,94,0.06)',borderRadius:8,padding:'8px',textAlign:'center'}}>
                <div style={{fontSize:9,color:'#64748b'}}>Credito bruto VCS</div>
                <div style={{fontSize:12,fontWeight:700,color:'#22c55e'}}>USD {d.vcs.toFixed(5)}</div>
              </div>
              <div style={{flex:1,background:'rgba(168,85,247,0.06)',borderRadius:8,padding:'8px',textAlign:'center'}}>
                <div style={{fontSize:9,color:'#64748b'}}>Credito bruto Art. 6.4</div>
                <div style={{fontSize:12,fontWeight:700,color:'#a855f7'}}>USD {d.art64.toFixed(5)}</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:6}}>
              {[
                {l:'Vos 25%',v:d.vecinoVCS,c:'#22c55e'},
                {l:'Circ. 50%',v:d.circulabVCS,c:'#3b82f6'},
                {l:'Rec. 15%',v:d.recolectorVCS,c:'#f59e0b'},
                {l:'Planta 10%',v:d.plantaVCS,c:'#a855f7'},
              ].map(item=>(
                <div key={item.l} style={{background:'rgba(255,255,255,0.02)',borderRadius:8,padding:'8px',textAlign:'center'}}>
                  <div style={{fontSize:9,color:'#64748b'}}>{item.l}</div>
                  <div style={{fontSize:10,fontWeight:700,color:item.c,marginTop:2}}>USD {item.v.toFixed(5)}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'14px',marginTop:8}}>
        <div style={{fontSize:11,fontWeight:600,color:'#93c5fd',marginBottom:6}}>¿Por que Circulab retiene el 50%?</div>
        <div style={{fontSize:10,color:'#94a3b8',lineHeight:1.7}}>
          A diferencia de plataformas que solo intermedian creditos ya existentes (12-15%), Circulab crea el credito desde cero: coordina la separacion, el transporte, el procesamiento, la certificacion dMRV y la comercializacion internacional. Sin Circulab, ese credito vale USD 0. El 50% restante se distribuye entre todos los actores que hacen posible el ciclo.
        </div>
      </div>
    </div>
  )
}
