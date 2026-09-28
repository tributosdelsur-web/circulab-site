'use client'

// SEO metadata

import { useState } from 'react'


const TIPOS = [
  { v:'organico', l:'Orgánico', icon:'🌿', color:'#22c55e', co2_kg:0.0018, kg_depto:15, kg_sem_ciudadano:3 },
  { v:'plastico', l:'Plástico', icon:'♻️', color:'#3b82f6', co2_kg:0.0015, kg_depto:3, kg_sem_ciudadano:1 },
  { v:'papel', l:'Papel', icon:'📄', color:'#f59e0b', co2_kg:0.0008, kg_depto:4, kg_sem_ciudadano:0.8 },
  { v:'metal', l:'Metal', icon:'🔩', color:'#ef4444', co2_kg:0.0065, kg_depto:0.5, kg_sem_ciudadano:0.2 },
  { v:'textil', l:'Textil', icon:'👕', color:'#ec4899', co2_kg:0.0045, kg_depto:0.5, kg_sem_ciudadano:0.3 },
  { v:'aceite', l:'Aceite', icon:'🛢️', color:'#f97316', co2_kg:0.0022, kg_depto:0.3, kg_sem_ciudadano:0.1 },
  { v:'vidrio', l:'Vidrio', icon:'🍾', color:'#a855f7', co2_kg:0.0003, kg_depto:2, kg_sem_ciudadano:0.5 },
  { v:'hojas', l:'Hojas/Ramas', icon:'🍃', color:'#22c55e', co2_kg:0.0021, kg_depto:0, kg_sem_ciudadano:5 },
]

const PERFILES = [
  { id:'casa', icon:'🌱', label:'Solo reciclás en casa', desc:'Tus propios residuos' },
  { id:'edificio', icon:'🏘️', label:'Organizás tu edificio', desc:'Vos + tus vecinos' },
  { id:'barrio', icon:'🍃', label:'Limpiás tu barrio', desc:'Hojas, ramas y residuos verdes' },
  { id:'zona', icon:'🌍', label:'Coordinás tu zona', desc:'5-8 edificios o manzanas' },
]

export default function Simulador() {
  const [perfil, setPerfil] = useState('edificio')
  const [deptos, setDeptos] = useState(50)
  const [participacion, setParticipacion] = useState(60)
  const [cuadras, setCuadras] = useState(4)
  const [edificios, setEdificios] = useState(5)
  const [kg_sem, setKgSem] = useState(8)
  const [tipos_activos, setTiposActivos] = useState(['organico','plastico','papel','metal'])

  function toggleTipo(v: string) {
    setTiposActivos(prev=>prev.includes(v)?prev.filter(t=>t!==v):[...prev,v])
  }

  const deptos_activos = Math.round(deptos * participacion / 100)


  let resultado_kg_mes = 0

  if(perfil === 'casa') {
    const tipos_sel = TIPOS.filter(t=>tipos_activos.includes(t.v))
    resultado_kg_mes = kg_sem * 4.33
  } else if(perfil === 'edificio') {
    const tipos_sel = TIPOS.filter(t=>tipos_activos.includes(t.v) && t.v !== 'hojas')
    resultado_kg_mes = tipos_sel.reduce((a,t)=>a + deptos_activos*t.kg_depto, 0)
  } else if(perfil === 'barrio') {
    const kg_cuadra_dia = 5
    resultado_kg_mes = cuadras * kg_cuadra_dia * 22
  } else if(perfil === 'zona') {
    const tipos_sel = TIPOS.filter(t=>tipos_activos.includes(t.v) && t.v !== 'hojas')
    const kg_por_edificio = tipos_sel.reduce((a,t)=>a + 30*t.kg_depto, 0)
    resultado_kg_mes = edificios * kg_por_edificio
  }

  const resultado_kg_sem = resultado_kg_mes / 4.33
  const resultado_kg_anual = resultado_kg_mes * 12
  const resultado_t_5anios = resultado_kg_anual * 5 / 1000

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px 20px 60px'}}>
      <div style={{maxWidth:580,margin:'0 auto'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <img src="/logoOC.png" alt="OLIVIA" style={{width:36,height:36,objectFit:'contain',borderRadius:8}} />
            <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>OLIVIA Circulab</span>
          </a>
          <a href="/dashboard" style={{fontSize:11,color:'#64748b',textDecoration:'none'}}>Mi panel →</a>
        </div>

        <div style={{fontSize:22,fontWeight:900,marginBottom:4}}>
          🌿 ¿Cuánto podés medir con OLIVIA?
        </div>
        <div style={{fontSize:13,color:'#64748b',marginBottom:24,lineHeight:1.5}}>
          Calculá cuántos kilos podés separar y registrar según cómo participás.
        </div>

        {/* SELECTOR DE PERFIL */}
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'16px',marginBottom:12}}>
          <div style={{fontSize:12,color:'#94a3b8',marginBottom:10,fontWeight:700}}>¿Cómo participás?</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {PERFILES.map(p=>(
              <button key={p.id} onClick={()=>setPerfil(p.id)}
                style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderRadius:10,border:`1px solid ${perfil===p.id?'rgba(34,197,94,0.5)':'rgba(255,255,255,0.06)'}`,background:perfil===p.id?'rgba(34,197,94,0.08)':'transparent',cursor:'pointer',textAlign:'left'}}>
                <span style={{fontSize:22}}>{p.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:perfil===p.id?'#22c55e':'#f1f5f9'}}>{p.label}</div>
                  <div style={{fontSize:11,color:'#64748b'}}>{p.desc}</div>
                </div>
                {perfil===p.id&&<div style={{marginLeft:'auto',color:'#22c55e',fontWeight:700}}>✓</div>}
              </button>
            ))}
          </div>
        </div>

        {/* PARÁMETROS SEGÚN PERFIL */}
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px',marginBottom:12}}>

          {perfil === 'casa' && (
            <>
              <div style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:13,color:'#94a3b8'}}>Kg de residuos por semana</span>
                  <span style={{fontSize:15,fontWeight:800,color:'#f1f5f9'}}>{kg_sem} kg</span>
                </div>
                <input type="range" min={1} max={30} value={kg_sem}
                  onChange={e=>setKgSem(Number(e.target.value))}
                  style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
                  <span>1 kg</span><span>15 kg</span><span>30 kg</span>
                </div>
              </div>
              <div>
                <div style={{fontSize:13,color:'#94a3b8',marginBottom:10}}>¿Qué residuos separás?</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {TIPOS.map(t=>(
                    <button key={t.v} onClick={()=>toggleTipo(t.v)}
                      style={{padding:'6px 10px',borderRadius:8,border:'none',cursor:'pointer',fontSize:11,fontWeight:600,
                        background:tipos_activos.includes(t.v)?`${t.color}22`:'rgba(255,255,255,0.04)',
                        color:tipos_activos.includes(t.v)?t.color:'#64748b',
                        outline:tipos_activos.includes(t.v)?`2px solid ${t.color}44`:'none'}}>
                      {t.icon} {t.l}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {perfil === 'edificio' && (
            <>
              <div style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:13,color:'#94a3b8'}}>Departamentos en el edificio</span>
                  <span style={{fontSize:15,fontWeight:800,color:'#f1f5f9'}}>{deptos}</span>
                </div>
                <input type="range" min={10} max={300} value={deptos}
                  onChange={e=>setDeptos(Number(e.target.value))}
                  style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
                  <span>10</span><span>150</span><span>300</span>
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:13,color:'#94a3b8'}}>% de vecinos que participan</span>
                  <span style={{fontSize:15,fontWeight:800,color:'#f1f5f9'}}>{participacion}% · {deptos_activos} vecinos</span>
                </div>
                <input type="range" min={10} max={100} value={participacion}
                  onChange={e=>setParticipacion(Number(e.target.value))}
                  style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
                  <span>10%</span><span>50%</span><span>100%</span>
                </div>
              </div>
              <div>
                <div style={{fontSize:13,color:'#94a3b8',marginBottom:10}}>Tipos de residuo a separar</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {TIPOS.filter(t=>t.v!=='hojas').map(t=>(
                    <button key={t.v} onClick={()=>toggleTipo(t.v)}
                      style={{padding:'6px 10px',borderRadius:8,border:'none',cursor:'pointer',fontSize:11,fontWeight:600,
                        background:tipos_activos.includes(t.v)?`${t.color}22`:'rgba(255,255,255,0.04)',
                        color:tipos_activos.includes(t.v)?t.color:'#64748b',
                        outline:tipos_activos.includes(t.v)?`2px solid ${t.color}44`:'none'}}>
                      {t.icon} {t.l}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {perfil === 'barrio' && (
            <div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{fontSize:13,color:'#94a3b8'}}>Cuadras que limpiás por semana</span>
                <span style={{fontSize:15,fontWeight:800,color:'#f1f5f9'}}>{cuadras} cuadras</span>
              </div>
              <input type="range" min={1} max={20} value={cuadras}
                onChange={e=>setCuadras(Number(e.target.value))}
                style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
              <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
                <span>1 cuadra</span><span>10</span><span>20 cuadras</span>
              </div>
              <div style={{marginTop:12,fontSize:11,color:'#64748b',lineHeight:1.6}}>
                🍃 Hojas · ramas · pasto cortado del espacio público<br/>
                Estimado: ~5 kg por cuadra por día · 22 días hábiles/mes
              </div>
            </div>
          )}

          {perfil === 'zona' && (
            <>
              <div style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:13,color:'#94a3b8'}}>Edificios o manzanas que coordinás</span>
                  <span style={{fontSize:15,fontWeight:800,color:'#f1f5f9'}}>{edificios} edificios</span>
                </div>
                <input type="range" min={2} max={20} value={edificios}
                  onChange={e=>setEdificios(Number(e.target.value))}
                  style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
                  <span>2</span><span>10</span><span>20</span>
                </div>
              </div>
              <div style={{fontSize:11,color:'#64748b'}}>
                Estimado: 30 deptos por edificio · 60% participación<br/>
              </div>
            </>
          )}
        </div>

        {/* RESULTADO PRINCIPAL */}
        <div style={{background:'linear-gradient(135deg,#0f1f10,#050d1f)',border:'2px solid rgba(34,197,94,0.4)',borderRadius:16,padding:'24px',marginBottom:12,textAlign:'center'}}>
          <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Residuos separados y registrados</div>
          <div style={{fontSize:52,fontWeight:900,color:'#22c55e',lineHeight:1}}>
            {resultado_kg_mes.toFixed(0)} kg
          </div>
          <div style={{fontSize:14,color:'#64748b',marginBottom:20}}>por mes</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
            <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'10px'}}>
              <div style={{fontSize:15,fontWeight:800,color:'#22c55e'}}>{resultado_kg_sem.toFixed(1)} kg</div>
              <div style={{fontSize:9,color:'#64748b',marginTop:2}}>por semana</div>
            </div>
            <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'10px'}}>
              <div style={{fontSize:15,fontWeight:800,color:'#22c55e'}}>{resultado_kg_anual.toFixed(0)} kg</div>
              <div style={{fontSize:9,color:'#64748b',marginTop:2}}>por año</div>
            </div>
            <div style={{background:'rgba(255,255,255,0.04)',borderRadius:10,padding:'10px'}}>
              <div style={{fontSize:15,fontWeight:800,color:'#22c55e'}}>{resultado_t_5anios.toFixed(1)} t</div>
              <div style={{fontSize:9,color:'#64748b',marginTop:2}}>en 5 años</div>
            </div>
          </div>
        </div>

        {/* POR QUÉ MEDIR */}
        <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:6}}>💡 Por qué medir</div>
          <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.7}}>
            Cada kilo que registrás y se verifica en planta suma al dato de tu barrio: cuánto se separa y cuánto deja de ir al relleno.
            Ese dato es lo que permite que las plantas trabajen con más volumen y que la Ciudad sepa qué pasa con sus residuos.
          </div>
        </div>

        {/* ACLARACIÓN */}
        <div style={{background:'rgba(245,158,11,0.04)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:'12px',marginBottom:20}}>
          <div style={{fontSize:10,color:'#64748b',lineHeight:1.6,fontStyle:'italic'}}>
            Estimación de kilos según promedios de referencia por hogar y por edificio. Los OLV son puntos de participación sin valor monetario: OLIVIA no paga ni promete ingresos.
          </div>
        </div>

        {/* CTAs */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <a href="/registro" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'16px',borderRadius:14,fontSize:15,fontWeight:700,textDecoration:'none',display:'block',textAlign:'center'}}>
            Empezar a registrar gratis →
          </a>
          <a href="mailto:hola@oliviacirculab.com.ar?subject=Quiero sumar mi consorcio a OLIVIA"
            style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',padding:'14px',borderRadius:14,fontSize:14,fontWeight:700,textDecoration:'none',display:'block',textAlign:'center'}}>
            🏢 Sumar mi consorcio →
          </a>
          <a href="/ciudadano" style={{color:'#64748b',padding:'10px',fontSize:12,textDecoration:'none',display:'block',textAlign:'center'}}>
            ← Volver a ciudadano
          </a>
        </div>

      </div>
    </div>
  )
}
