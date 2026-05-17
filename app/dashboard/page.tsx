'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const UID = 'e034e87d-51cc-4aa8-927f-7fb06f62dcc2'

export default function Dashboard() {
  const [usuario, setUsuario] = useState<any>(null)
  const [residuos, setResiduos] = useState<any[]>([])
  const [roscas, setRoscas] = useState<any[]>([])
  const [fuentes, setFuentes] = useState<any[]>([])
  const [vista, setVista] = useState('panel')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function cargar() {
      const [u, r, ro, f] = await Promise.all([
        supabase.from('usuarios').select('*').eq('id', UID).single(),
        supabase.from('residuos').select('*').eq('usuario_id', UID).order('fecha', {ascending: false}),
        supabase.from('roscas').select('*').eq('organizador_id', UID),
        supabase.from('fuentes_aom').select('*').eq('usuario_id', UID),
      ])
      setUsuario(u.data)
      setResiduos(r.data || [])
      setRoscas(ro.data || [])
      setFuentes(f.data || [])
      setLoading(false)
    }
    cargar()
  }, [])

  const totalKg = residuos.reduce((a, r) => a + Number(r.kg), 0)
  const totalTokens = residuos.reduce((a, r) => a + Number(r.tokens_olv), 0)
  const totalCo2 = (totalKg * 1.2).toFixed(1)
  const totalAhorrado = roscas.reduce((a, ro) => a + (Number(ro.monto_por_ronda) * Number(ro.ronda_actual)), 0)
  const porCobrar = fuentes.filter(f => f.status === 'pendiente').reduce((a, f) => a + Number(f.monto), 0)
  const cobrado = fuentes.filter(f => f.status === 'cobrado').reduce((a, f) => a + Number(f.monto), 0)

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui',fontSize:16}}>
      Cargando tu panel...
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui,sans-serif',display:'flex'}}>
      <aside style={{width:220,background:'#080c16',borderRight:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'20px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>C</div>
          <div>
            <div style={{fontSize:13,fontWeight:800}}>CIRCULAB</div>
            <div style={{fontSize:9,color:'#64748b'}}>TECH</div>
          </div>
        </div>
        <nav style={{flex:1,padding:'12px 8px',display:'flex',flexDirection:'column',gap:4}}>
          {[{id:'panel',label:'Panel',icon:'⊞'},{id:'olivia',label:'Olivia Circular',icon:'🌿'},{id:'quincena',label:'Quincena',icon:'👥'},{id:'aom',label:'Art of Money',icon:'🎵'}].map(item => {
            const active = vista === item.id
            const c = item.id==='olivia'?'#22c55e':item.id==='quincena'?'#3b82f6':item.id==='aom'?'#a855f7':'#f1f5f9'
            return (
              <button key={item.id} onClick={() => setVista(item.id)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:10,border:'none',cursor:'pointer',background:active?'rgba(255,255,255,0.06)':'transparent',borderLeft:active?'2px solid '+c:'2px solid transparent',color:active?c:'#64748b',fontSize:13,fontWeight:active?700:500,textAlign:'left',width:'100%'}}>
                <span>{item.icon}</span>{item.label}
              </button>
            )
          })}
        </nav>
        <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{fontSize:12,fontWeight:700}}>{usuario?.nombre} {usuario?.apellido}</div>
          <div style={{fontSize:10,color:'#22c55e',marginTop:2}}>Nivel {usuario?.nivel} - {usuario?.score_pulso} pts</div>
        </div>
      </aside>

      <main style={{flex:1,padding:'28px',overflowY:'auto'}}>
        <a href="/" style={{fontSize:12,color:'#64748b',textDecoration:'none',display:'inline-block',marginBottom:20}}>Volver a Circulab.tech</a>

        {vista === 'panel' && (
          <div style={{display:'flex',flexDirection:'column',gap:20}}>
            <div style={{background:'#0f1f10',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'24px'}}>
              <div style={{fontSize:13,color:'#64748b',marginBottom:4}}>Identidad Financiera Digital</div>
              <div style={{fontSize:22,fontWeight:900,marginBottom:16}}>Hola, {usuario?.nombre}! 👋</div>
              <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:20}}>
                <div style={{background:'rgba(34,197,94,0.1)',borderRadius:12,padding:'12px 20px',textAlign:'center',minWidth:110}}>
                  <div style={{fontSize:22,fontWeight:800,color:'#22c55e'}}>{totalTokens}</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:3}}>tokens OLV</div>
                </div>
                <div style={{background:'rgba(59,130,246,0.1)',borderRadius:12,padding:'12px 20px',textAlign:'center',minWidth:110}}>
                  <div style={{fontSize:22,fontWeight:800,color:'#3b82f6'}}>${Math.round(totalAhorrado/1000)}k</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:3}}>ahorrado</div>
                </div>
                <div style={{background:'rgba(168,85,247,0.1)',borderRadius:12,padding:'12px 20px',textAlign:'center',minWidth:110}}>
                  <div style={{fontSize:22,fontWeight:800,color:'#a855f7'}}>USD {porCobrar}</div>
                  <div style={{fontSize:10,color:'#64748b',marginTop:3}}>por cobrar</div>
                </div>
              </div>
              <div style={{fontSize:11,color:'#64748b',marginBottom:6,display:'flex',justifyContent:'space-between'}}>
                <span>Score de confianza global</span>
                <span style={{color:'#22c55e'}}>{usuario?.score_pulso} / 1000</span>
              </div>
              <div style={{height:6,background:'rgba(255,255,255,0.06)',borderRadius:99}}>
                <div style={{height:'100%',width:((usuario?.score_pulso/1000)*100)+'%',background:'#22c55e',borderRadius:99}} />
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16}}>
              <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px'}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#22c55e'}}>🌿 Impacto Ambiental</div>
                <div style={{display:'flex',gap:8,marginBottom:12}}>
                  <div style={{textAlign:'center',flex:1}}><div style={{fontSize:16,fontWeight:800,color:'#22c55e'}}>{totalKg.toFixed(1)}kg</div><div style={{fontSize:9,color:'#64748b'}}>reciclados</div></div>
                  <div style={{textAlign:'center',flex:1}}><div style={{fontSize:16,fontWeight:800,color:'#22c55e'}}>{totalCo2}kg</div><div style={{fontSize:9,color:'#64748b'}}>CO2 evitado</div></div>
                  <div style={{textAlign:'center',flex:1}}><div style={{fontSize:16,fontWeight:800,color:'#22c55e'}}>{totalTokens}</div><div style={{fontSize:9,color:'#64748b'}}>tokens OLV</div></div>
                </div>
                {residuos.slice(0,3).map((r,i) => (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 10px',borderRadius:8,background:'rgba(255,255,255,0.02)',marginBottom:5}}>
                    <span style={{fontSize:12,textTransform:'capitalize'}}>{r.tipo} {r.kg}kg</span>
                    <span style={{fontSize:11,color:r.status==='validado'?'#22c55e':'#f59e0b',fontWeight:600}}>{r.tokens_olv} OLV</span>
                  </div>
                ))}
              </div>

              <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px'}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#3b82f6'}}>👥 Ahorro Grupal</div>
                <div style={{fontSize:24,fontWeight:800,color:'#3b82f6',marginBottom:4}}>${totalAhorrado.toLocaleString()}</div>
                <div style={{fontSize:11,color:'#64748b',marginBottom:12}}>{roscas.length} grupos activos</div>
                {roscas.map((g,i) => (
                  <div key={i} style={{padding:'10px 12px',borderRadius:10,background:'rgba(255,255,255,0.02)',marginBottom:8}}>
                    <div style={{fontSize:12,fontWeight:600,marginBottom:6}}>{g.nombre}</div>
                    <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:99,marginBottom:4}}>
                      <div style={{height:'100%',width:(g.ronda_actual/g.total_rondas*100)+'%',background:'#3b82f6',borderRadius:99}} />
                    </div>
                    <div style={{fontSize:10,color:'#64748b'}}>Ronda {g.ronda_actual}/{g.total_rondas}</div>
                  </div>
                ))}
              </div>

              <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px'}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#a855f7'}}>🎵 Capital Creativo</div>
                <div style={{display:'flex',gap:12,marginBottom:12}}>
                  <div style={{textAlign:'center',flex:1}}><div style={{fontSize:18,fontWeight:800,color:'#a855f7'}}>USD {porCobrar}</div><div style={{fontSize:9,color:'#64748b'}}>por cobrar</div></div>
                  <div style={{textAlign:'center',flex:1}}><div style={{fontSize:18,fontWeight:800,color:'#22c55e'}}>USD {cobrado}</div><div style={{fontSize:9,color:'#64748b'}}>cobrado</div></div>
                </div>
                {fuentes.map((f,i) => (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 10px',borderRadius:8,background:'rgba(255,255,255,0.02)',marginBottom:5}}>
                    <span style={{fontSize:12}}>{f.plataforma}</span>
                    <span style={{fontSize:12,fontWeight:700,color:f.status==='cobrado'?'#22c55e':'#a855f7'}}>USD {f.monto}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {vista === 'olivia' && (
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{background:'#0f1f10',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'24px'}}>
              <div style={{fontSize:22,fontWeight:900,marginBottom:8}}>🌿 Olivia Circular</div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>dMRV - Tokens OLV - Articulo 6.4 de Paris</div>
              <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
                {[{v:totalKg.toFixed(1)+'kg',l:'reciclado total'},{v:totalCo2+'kg',l:'CO2 evitado'},{v:String(totalTokens),l:'tokens OLV'},{v:String(residuos.filter(r=>r.status==='validado').length),l:'validados'}].map(s=>(
                  <div key={s.l} style={{textAlign:'center'}}>
                    <div style={{fontSize:26,fontWeight:800,color:'#22c55e'}}>{s.v}</div>
                    <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <div style={{fontSize:14,fontWeight:700}}>Mis registros</div>
                <a href="/registrar" style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',borderRadius:8,padding:'6px 14px',fontSize:12,fontWeight:600,textDecoration:'none'}}>+ Registrar</a>
              </div>
              {residuos.map((r,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 14px',borderRadius:12,background:'rgba(255,255,255,0.02)',marginBottom:8}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,textTransform:'capitalize'}}>{r.tipo} - {r.kg}kg</div>
                    <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{r.fecha}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:15,fontWeight:800,color:'#22c55e'}}>{r.tokens_olv} OLV</div>
                    <div style={{fontSize:10,color:r.status==='validado'?'#22c55e':'#f59e0b',marginTop:2}}>{r.status==='validado'?'Validado':'Pendiente'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {vista === 'quincena' && (
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{background:'#050d1f',border:'1px solid rgba(59,130,246,0.2)',borderRadius:16,padding:'24px'}}>
              <div style={{fontSize:22,fontWeight:900,marginBottom:8}}>👥 Protocolo Quincena</div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>SSI - Token PULSO - Blockchain</div>
              <div style={{display:'flex',gap:20}}>
                <div><div style={{fontSize:26,fontWeight:800,color:'#3b82f6'}}>${totalAhorrado.toLocaleString()}</div><div style={{fontSize:10,color:'#64748b'}}>Total ahorrado</div></div>
                <div><div style={{fontSize:26,fontWeight:800,color:'#3b82f6'}}>{roscas.length}</div><div style={{fontSize:10,color:'#64748b'}}>Grupos activos</div></div>
              </div>
            </div>
            {roscas.map((g,i) => (
              <div key={i} style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                  <div style={{fontSize:15,fontWeight:800}}>{g.nombre}</div>
                  <span style={{fontSize:10,color:'#3b82f6',background:'rgba(59,130,246,0.12)',padding:'3px 10px',borderRadius:20}}>Activo</span>
                </div>
                <div style={{fontSize:12,color:'#64748b',marginBottom:14}}>${Number(g.monto_por_ronda).toLocaleString()}/ronda - Proximo: {g.proximo_pago}</div>
                <div style={{height:6,background:'rgba(255,255,255,0.06)',borderRadius:99,marginBottom:8}}>
                  <div style={{height:'100%',width:(g.ronda_actual/g.total_rondas*100)+'%',background:'#3b82f6',borderRadius:99}} />
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'#64748b'}}>
                  <span>Ronda {g.ronda_actual}/{g.total_rondas}</span>
                  <span style={{color:'#3b82f6'}}>{Math.round(g.ronda_actual/g.total_rondas*100)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {vista === 'aom' && (
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{background:'#100520',border:'1px solid rgba(168,85,247,0.2)',borderRadius:16,padding:'24px'}}>
              <div style={{fontSize:22,fontWeight:900,marginBottom:8}}>🎵 Art of Money</div>
              <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>Regalias - Tokenizacion RWA - Adelantos</div>
              <div style={{display:'flex',gap:20}}>
                <div><div style={{fontSize:26,fontWeight:800,color:'#a855f7'}}>USD {porCobrar}</div><div style={{fontSize:10,color:'#64748b'}}>Por cobrar</div></div>
                <div><div style={{fontSize:26,fontWeight:800,color:'#22c55e'}}>USD {cobrado}</div><div style={{fontSize:10,color:'#64748b'}}>Cobrado</div></div>
              </div>
            </div>
            <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px'}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:16}}>Fuentes de ingreso</div>
              {fuentes.map((f,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',borderRadius:12,background:'rgba(255,255,255,0.02)',marginBottom:8}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700}}>{f.plataforma}</div>
                    <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{f.descripcion}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:16,fontWeight:800,color:f.status==='cobrado'?'#22c55e':'#a855f7'}}>USD {f.monto}</div>
                    <div style={{fontSize:10,color:f.status==='cobrado'?'#22c55e':'#f59e0b',marginTop:2}}>{f.status==='cobrado'?'Cobrado':'Pendiente'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}