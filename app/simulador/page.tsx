'use client'
import { useState } from 'react'

const ORGANICO_POR_DEPTO_KG = 15
const CO2_FACTOR = 1.8
const KM_RELLENO = 35
const PRECIO_VCS = 22
const PRECIO_ART64 = 90
const DIST_VECINO = 0.25
const TARIFA_CEAMSE = 850
const FEE_CIRCULAB_USD = 10
const PRECIO_ABONO_ARS = 600
const AHORRO_RECOLECCION_ARS_DEPTO = 800

function calcular(deptos: number) {
  const kgMes = deptos * ORGANICO_POR_DEPTO_KG
  const co2eq = kgMes * CO2_FACTOR * (1 + KM_RELLENO / 100)
  const creditoVCS = (co2eq / 1000) * PRECIO_VCS
  const creditoArt64 = (co2eq / 1000) * PRECIO_ART64
  const vecinoVCS = creditoVCS * DIST_VECINO
  const vecinoArt64 = creditoArt64 * DIST_VECINO
  const costoEvitado = kgMes * TARIFA_CEAMSE
  const feeTotal = deptos * FEE_CIRCULAB_USD
  const abonoKg = kgMes * 0.3
  const abonoValorARS = abonoKg * PRECIO_ABONO_ARS * DIST_VECINO
  const ahorroRecoleccionARS = deptos * AHORRO_RECOLECCION_ARS_DEPTO
  const arboles = Math.round(co2eq / 0.021)
  const tokens = Math.round(co2eq * 100)
  return {
    kgMes:parseFloat(kgMes.toFixed(1)),
    co2eq:parseFloat(co2eq.toFixed(2)),
    creditoVCS:parseFloat(creditoVCS.toFixed(2)),
    creditoArt64:parseFloat(creditoArt64.toFixed(2)),
    vecinoVCS:parseFloat(vecinoVCS.toFixed(2)),
    vecinoArt64:parseFloat(vecinoArt64.toFixed(2)),
    costoEvitado,
    feeTotal,
    abonoKg:parseFloat(abonoKg.toFixed(1)),
    abonoValorARS:parseFloat(abonoValorARS.toFixed(0)),
    ahorroRecoleccionARS,
    arboles,
    tokens,
    vecinoPorDeptoVCS:parseFloat((vecinoVCS/deptos).toFixed(2)),
    vecinoPorDeptoArt64:parseFloat((vecinoArt64/deptos).toFixed(2)),
    totalMensualARS: (vecinoVCS*1200) + abonoValorARS + ahorroRecoleccionARS,
    totalAnualARS: ((vecinoVCS*1200) + abonoValorARS + ahorroRecoleccionARS) * 12,
    totalAnualPorDeptoARS: (((vecinoVCS*1200) + abonoValorARS + ahorroRecoleccionARS) * 12) / deptos,
  }
}

export default function Simulador() {
  const [deptos, setDeptos] = useState(20)
  const [fase, setFase] = useState<'vcs'|'art64'>('vcs')
  const r = calcular(deptos)

  const totalMensual = fase==='vcs'
    ? (r.vecinoVCS*1200) + r.abonoValorARS + r.ahorroRecoleccionARS
    : (r.vecinoArt64*1200) + r.abonoValorARS + r.ahorroRecoleccionARS
  const totalAnual = totalMensual * 12
  const totalAnualPorDepto = totalAnual / deptos

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui,sans-serif',padding:'24px 20px'}}>
      <div style={{maxWidth:620,margin:'0 auto'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:32}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>C</div>
            <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>CIRCULAB</span>
          </a>
          <a href="/dashboard" style={{fontSize:12,color:'#64748b',textDecoration:'none'}}>Mi panel →</a>
        </div>

        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:26,fontWeight:900,marginBottom:8,lineHeight:1.2}}>
            ¿Cuanto puede ahorrar<br/>tu consorcio? 🏢
          </div>
          <div style={{fontSize:14,color:'#64748b',maxWidth:420,margin:'0 auto'}}>
            Tu consorcio ya paga por la basura. Con Circulab esa basura genera 5 fuentes de valor distintas.
          </div>
        </div>

        {/* Slider */}
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'24px',marginBottom:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:700}}>Departamentos en el edificio</div>
            <div style={{fontSize:36,fontWeight:900,color:'#22c55e'}}>{deptos}</div>
          </div>
          <input type="range" min={5} max={200} step={5} value={deptos}
            onChange={e=>setDeptos(Number(e.target.value))}
            style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:6}}>
            <span>5</span><span>50</span><span>100</span><span>150</span><span>200</span>
          </div>
        </div>

        {/* Toggle fase */}
        <div style={{display:'flex',gap:8,marginBottom:16}}>
          <button onClick={()=>setFase('vcs')} style={{flex:1,padding:'10px',borderRadius:10,border:'none',cursor:'pointer',background:fase==='vcs'?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.04)',color:fase==='vcs'?'#22c55e':'#64748b',fontSize:12,fontWeight:700,outline:fase==='vcs'?'2px solid rgba(34,197,94,0.4)':'none'}}>
            Fase 3 · VCS Verra · USD 22/t
          </button>
          <button onClick={()=>setFase('art64')} style={{flex:1,padding:'10px',borderRadius:10,border:'none',cursor:'pointer',background:fase==='art64'?'rgba(168,85,247,0.15)':'rgba(255,255,255,0.04)',color:fase==='art64'?'#a855f7':'#64748b',fontSize:12,fontWeight:700,outline:fase==='art64'?'2px solid rgba(168,85,247,0.4)':'none'}}>
            Fase 4 · Art. 6.4 · USD 90/t
          </button>
        </div>

        {/* KPI principal */}
        <div style={{background:'linear-gradient(135deg,#0f1f10,#0a1628)',border:'2px solid rgba(34,197,94,0.4)',borderRadius:20,padding:'24px',marginBottom:16,textAlign:'center'}}>
          <div style={{fontSize:12,color:'#64748b',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'}}>Reduccion total estimada por departamento</div>
          <div style={{fontSize:44,fontWeight:900,color:'#22c55e',marginBottom:4}}>
            ${Math.round(totalAnualPorDepto).toLocaleString()}
          </div>
          <div style={{fontSize:14,color:'#64748b',marginBottom:16}}>ARS por departamento por año</div>
          <div style={{display:'flex',gap:12,justifyContent:'center'}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:18,fontWeight:800,color:'#22c55e'}}>${Math.round(totalMensual).toLocaleString()}</div>
              <div style={{fontSize:10,color:'#64748b'}}>ARS/mes consorcio</div>
            </div>
            <div style={{width:1,background:'rgba(255,255,255,0.1)'}} />
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:18,fontWeight:800,color:'#22c55e'}}>${Math.round(totalAnual).toLocaleString()}</div>
              <div style={{fontSize:10,color:'#64748b'}}>ARS/año consorcio</div>
            </div>
            <div style={{width:1,background:'rgba(255,255,255,0.1)'}} />
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:18,fontWeight:800,color:'#f59e0b'}}>${r.costoEvitado.toLocaleString()}</div>
              <div style={{fontSize:10,color:'#64748b'}}>evitado al Estado/mes</div>
            </div>
          </div>
        </div>

        {/* 5 fuentes de valor */}
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px',marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#22c55e'}}>Las 5 fuentes de valor</div>
          <div style={{fontSize:11,color:'#64748b',marginBottom:16}}>Combinadas generan el ahorro total estimado</div>

          {[
            {
              num:'01',
              titulo:'Credito de carbono',
              desc:`${r.co2eq}kg CO2eq evitado · ${fase==='vcs'?'VCS Verra':'Art. 6.4 Paris'}`,
              valor:'USD '+(fase==='vcs'?r.vecinoVCS:r.vecinoArt64)+'/mes',
              valorARS:'$'+(Math.round(fase==='vcs'?r.vecinoVCS*1200:r.vecinoArt64*1200)).toLocaleString()+'/mes',
              color:'#22c55e',
              icon:'🌿',
              nota:'Tu parte 25% del credito generado',
            },
            {
              num:'02',
              titulo:'Abono comercializable',
              desc:`${r.abonoKg}kg de compost producido · $${PRECIO_ABONO_ARS}/kg mercado`,
              valor:'$'+r.abonoValorARS.toLocaleString()+'/mes',
              valorARS:'$'+(r.abonoValorARS*12).toLocaleString()+'/año',
              color:'#f59e0b',
              icon:'🪴',
              nota:'Tu parte 25% del abono producido',
            },
            {
              num:'03',
              titulo:'Ahorro en recoleccion',
              desc:`Menos residuo mezclado = menor tarifa de recoleccion`,
              valor:'$'+r.ahorroRecoleccionARS.toLocaleString()+'/mes',
              valorARS:'$'+(r.ahorroRecoleccionARS*12).toLocaleString()+'/año',
              color:'#3b82f6',
              icon:'🚛',
              nota:'Estimado $'+AHORRO_RECOLECCION_ARS_DEPTO+' ARS por depto/mes',
            },
            {
              num:'04',
              titulo:'Tokens OLV acumulados',
              desc:`${r.tokens} tokens OLV por mes · Canjeable por beneficios`,
              valor:r.tokens+' OLV/mes',
              valorARS:(r.tokens*12)+' OLV/año',
              color:'#a855f7',
              icon:'🪙',
              nota:'Valor actual: reputacion digital · Fase 3: USD '+(r.tokens*0.022*12).toFixed(0)+'/año',
            },
            {
              num:'05',
              titulo:'Certificacion RSE corporativa',
              desc:`Empresas pagan por asociarse a consorcios certificados`,
              valor:'USD 50-200/mes',
              valorARS:'Segun acuerdo',
              color:'#f1f5f9',
              icon:'🏆',
              nota:'Disponible con 3+ meses de participacion activa',
            },
          ].map((f,i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:'14px',borderRadius:12,background:'rgba(255,255,255,0.02)',marginBottom:8,border:`1px solid ${f.color}18`}}>
              <div style={{width:32,height:32,borderRadius:8,background:f.color+'18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{f.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
                  <div style={{fontSize:12,fontWeight:700,color:f.color}}>{f.titulo}</div>
                  <div style={{textAlign:'right',flexShrink:0,marginLeft:8}}>
                    <div style={{fontSize:12,fontWeight:700,color:f.color}}>{f.valor}</div>
                    <div style={{fontSize:9,color:'#64748b'}}>{f.valorARS}</div>
                  </div>
                </div>
                <div style={{fontSize:10,color:'#64748b',marginBottom:4}}>{f.desc}</div>
                <div style={{fontSize:9,color:'#94a3b8',fontStyle:'italic'}}>{f.nota}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Distribucion */}
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px',marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Como se distribuye el credito de carbono</div>
          <div style={{display:'flex',height:28,borderRadius:8,overflow:'hidden',gap:1,marginBottom:12}}>
            <div style={{width:'50%',background:'#3b82f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'white'}}>Circulab 50%</div>
            <div style={{width:'25%',background:'#22c55e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'white'}}>Vos 25%</div>
            <div style={{width:'15%',background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white'}}>15%</div>
            <div style={{width:'10%',background:'#a855f7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:700,color:'white'}}>10%</div>
          </div>
          {[
            {actor:'Circulab',desc:'Infraestructura y certificacion',pct:'50%',usd:(fase==='vcs'?r.creditoVCS:r.creditoArt64)*0.50,color:'#3b82f6'},
            {actor:'Tu consorcio',desc:'Separacion en origen',pct:'25%',usd:fase==='vcs'?r.vecinoVCS:r.vecinoArt64,color:'#22c55e'},
            {actor:'Recolector',desc:'Logistica y transporte',pct:'15%',usd:(fase==='vcs'?r.creditoVCS:r.creditoArt64)*0.15,color:'#f59e0b'},
            {actor:'Planta',desc:'Procesamiento y compostaje',pct:'10%',usd:(fase==='vcs'?r.creditoVCS:r.creditoArt64)*0.10,color:'#a855f7'},
          ].map(a=>(
            <div key={a.actor} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 10px',borderRadius:8,background:'rgba(255,255,255,0.02)',marginBottom:4}}>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:a.color}}>{a.actor} {a.pct}</div>
                <div style={{fontSize:9,color:'#64748b'}}>{a.desc}</div>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:a.color}}>USD {a.usd.toFixed(2)}/mes</div>
            </div>
          ))}
        </div>

        {/* Metodologia */}
        <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'14px',marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:600,color:'#93c5fd',marginBottom:6}}>Metodologia y supuestos</div>
          <div style={{fontSize:10,color:'#94a3b8',lineHeight:1.7}}>
            · 15kg organico por depto/mes (promedio CABA verificado)<br/>
            · Factor CO2eq 1.8t/t (metano evitado + CO2 compostaje + transporte evitado)<br/>
            · KM al relleno Norte III: 35km<br/>
            · Tarifa CEAMSE 2025: $850 ARS/kg<br/>
            · Precio abono: $600 ARS/kg mercado local<br/>
            · Ahorro recoleccion: $800 ARS/depto/mes estimado<br/>
            · USD/ARS referencia: $1.200 ARS
          </div>
        </div>

        {/* CTA */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <a href="/registro" style={{display:'block',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'16px',borderRadius:14,textAlign:'center',fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 0 30px rgba(34,197,94,0.25)'}}>
            Quiero que mi consorcio participe →
          </a>
          <a href="/dashboard" style={{display:'block',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8',padding:'12px',borderRadius:12,textAlign:'center',fontSize:13,textDecoration:'none'}}>
            Ver mi panel →
          </a>
        </div>

      </div>
    </div>
  )
}
