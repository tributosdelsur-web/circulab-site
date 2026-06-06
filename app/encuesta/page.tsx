'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Encuesta() {
  const [paso, setPaso] = useState(1)
  const [estado, setEstado] = useState<'idle'|'cargando'|'ok'>('idle')
  const [data, setData] = useState({
    barrio:'', tipo_vivienda:'', personas_hogar:'', rol:'',
    frecuencia_basura:'', separa:'', por_que_no_separa:'',
    kg_semana:5, punto_verde:'', bolsas_reutilizables:'',
    espacio_compostar:'', separaria_con_beneficio:'',
    consorcio_participaria:'', como_conocio:'',
    opinion_olivia:'', motivacion:'', quiere_piloto:'',
    nombre:'', contacto:''
  })

  function set(k: string, v: any) { setData(d=>({...d,[k]:v})) }

  async function enviar() {
    setEstado('cargando')
    await supabase.from('encuestas').insert(data)
    setEstado('ok')
  }

  const TOTAL = 5
  const progreso = ((paso-1)/TOTAL)*100

  const Opcion = ({k,v,label,color='#22c55e'}: any) => (
    <button onClick={()=>set(k,v)} style={{padding:'10px 16px',borderRadius:10,border:'none',cursor:'pointer',fontSize:13,fontWeight:600,background:(data as any)[k]===v?`rgba(${color==='#22c55e'?'34,197,94':color==='#3b82f6'?'59,130,246':'168,85,247'},0.15)`:'rgba(255,255,255,0.04)',color:(data as any)[k]===v?color:'#64748b',outline:(data as any)[k]===v?`2px solid ${color}`:'2px solid transparent',transition:'all 0.15s'}}>
      {label}
    </button>
  )

  if(estado==='ok') return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui',textAlign:'center'}}>
      <div style={{fontSize:56,marginBottom:16}}>🌿</div>
      <div style={{fontSize:22,fontWeight:900,color:'#f1f5f9',marginBottom:8}}>¡Gracias!</div>
      <div style={{fontSize:14,color:'#64748b',maxWidth:320,lineHeight:1.6,marginBottom:24}}>
        Tu respuesta nos ayuda a construir OLIVIA para toda la comunidad.
        {data.quiere_piloto==='si'&&' Te vamos a contactar para sumarte al piloto.'}
      </div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
        <a href="/registrar" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'12px 24px',borderRadius:12,fontSize:14,fontWeight:700,textDecoration:'none'}}>
          Registrar mi primer residuo →
        </a>
        <a href="/" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8',padding:'12px 24px',borderRadius:12,fontSize:14,textDecoration:'none'}}>
          Volver al inicio
        </a>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px 20px 60px'}}>
      <div style={{maxWidth:500,margin:'0 auto'}}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
            <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>OLIVIA</span>
          </a>
          <div style={{fontSize:11,color:'#64748b'}}>Paso {paso} de {TOTAL}</div>
        </div>

        <div style={{height:4,background:'rgba(255,255,255,0.06)',borderRadius:99,marginBottom:24}}>
          <div style={{height:'100%',width:progreso+'%',background:'linear-gradient(90deg,#22c55e,#16a34a)',borderRadius:99,transition:'width 0.3s'}} />
        </div>

        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'24px'}}>

          {paso===1&&(
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <div>
                <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>¿Quién sos? 👋</div>
                <div style={{fontSize:12,color:'#64748b'}}>Contanos un poco sobre vos · 1 min</div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Dónde vivís?</div>
                <input value={data.barrio} onChange={e=>set('barrio',e.target.value)}
                  placeholder="Barrio o localidad"
                  style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Tipo de vivienda</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {['Departamento','Casa','PH','Otro'].map(v=><Opcion key={v} k="tipo_vivienda" v={v.toLowerCase()} label={v} />)}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>Personas en el hogar</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {['1-2','3-4','5+'].map(v=><Opcion key={v} k="personas_hogar" v={v} label={v+' personas'} />)}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Cómo te describís?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'vecino',l:'Vecino/a'},{v:'administrador',l:'Administrador'},{v:'ambos',l:'Ambos'}].map(o=><Opcion key={o.v} k="rol" v={o.v} label={o.l} />)}
                </div>
              </div>
            </div>
          )}

          {paso===2&&(
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <div>
                <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>Tus residuos hoy ♻️</div>
                <div style={{fontSize:12,color:'#64748b'}}>Sin juicio — solo queremos entender cómo estás</div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Cuántas veces por semana sacás basura?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'1',l:'1 vez'},{v:'2-3',l:'2-3 veces'},{v:'todos',l:'Todos los días'}].map(o=><Opcion key={o.v} k="frecuencia_basura" v={o.v} label={o.l} />)}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Separás residuos actualmente?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'si',l:'Sí siempre'},{v:'aveces',l:'A veces'},{v:'no',l:'No'}].map(o=><Opcion key={o.v} k="separa" v={o.v} label={o.l} />)}
                </div>
              </div>
              {(data.separa==='no'||data.separa==='aveces')&&(
                <div>
                  <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Por qué no separás?</div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    {[
                      {v:'no_se',l:'No sé cómo'},
                      {v:'sin_punto',l:'Sin punto cerca'},
                      {v:'sin_tiempo',l:'Sin tiempo'},
                      {v:'sin_beneficio',l:'No veo beneficio'},
                      {v:'edificio',l:'Mi edificio no lo organiza'},
                    ].map(o=><Opcion key={o.v} k="por_que_no_separa" v={o.v} label={o.l} />)}
                  </div>
                </div>
              )}
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Cuánto generás por semana? {data.kg_semana}kg</div>
                <input type="range" min={1} max={30} value={data.kg_semana}
                  onChange={e=>set('kg_semana',Number(e.target.value))}
                  style={{width:'100%',accentColor:'#22c55e',cursor:'pointer'}} />
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#64748b',marginTop:4}}>
                  <span>1kg</span><span>15kg</span><span>30kg</span>
                </div>
              </div>
            </div>
          )}

          {paso===3&&(
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <div>
                <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>Tus hábitos 🌱</div>
                <div style={{fontSize:12,color:'#64748b'}}>Consumo y territorio</div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Conocés algún punto verde cerca?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'si',l:'Sí'},{v:'no',l:'No'},{v:'nose',l:'No sé'}].map(o=><Opcion key={o.v} k="punto_verde" v={o.v} label={o.l} />)}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Usás bolsas reutilizables?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'si',l:'Sí siempre'},{v:'aveces',l:'A veces'},{v:'no',l:'No'}].map(o=><Opcion key={o.v} k="bolsas_reutilizables" v={o.v} label={o.l} />)}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Tenés espacio para compostar?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'si',l:'Sí (patio/balcón)'},{v:'no',l:'No'}].map(o=><Opcion key={o.v} k="espacio_compostar" v={o.v} label={o.l} />)}
                </div>
              </div>
            </div>
          )}

          {paso===4&&(
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <div>
                <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>¿Cambiarías? 💚</div>
                <div style={{fontSize:12,color:'#64748b'}}>Queremos saber qué te motivaría</div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Separarías si recibieras un beneficio económico?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'si',l:'Sí definitivamente'},{v:'talvez',l:'Tal vez'},{v:'no',l:'No'}].map(o=><Opcion key={o.v} k="separaria_con_beneficio" v={o.v} label={o.l} />)}
                </div>
              </div>
              {(data.tipo_vivienda==='departamento'||data.tipo_vivienda==='ph')&&(
                <div>
                  <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Tu consorcio participaría?</div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    {[{v:'si',l:'Creo que sí'},{v:'nose',l:'No sé'},{v:'no',l:'No creo'}].map(o=><Opcion key={o.v} k="consorcio_participaria" v={o.v} label={o.l} />)}
                  </div>
                </div>
              )}
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Qué te motivaría más?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[
                    {v:'descuento',l:'💰 Descuento en expensas'},
                    {v:'tokens',l:'🪙 Tokens OLV'},
                    {v:'ambiente',l:'🌿 Impacto ambiental'},
                    {v:'todo',l:'✅ Todo junto'},
                  ].map(o=><Opcion key={o.v} k="motivacion" v={o.v} label={o.l} color="#3b82f6" />)}
                </div>
              </div>
            </div>
          )}

          {paso===5&&(
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <div>
                <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>¿Qué te parece OLIVIA? 🌿</div>
                <div style={{fontSize:12,color:'#64748b'}}>Último paso · 30 segundos</div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Cómo llegaste a Circulab?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'redes',l:'Redes'},{v:'amigo',l:'Un amigo'},{v:'google',l:'Google'},{v:'whatsapp',l:'WhatsApp'},{v:'otro',l:'Otro'}].map(o=><Opcion key={o.v} k="como_conocio" v={o.v} label={o.l} color="#a855f7" />)}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Qué te parece OLIVIA Circular?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'encanta',l:'🔥 Me encanta'},{v:'interesante',l:'👍 Interesante'},{v:'no_entendi',l:'🤔 No la entendí'},{v:'no_interesa',l:'👎 No me interesa'}].map(o=><Opcion key={o.v} k="opinion_olivia" v={o.v} label={o.l} />)}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:'#94a3b8',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>¿Querés sumarte al piloto?</div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[{v:'si',l:'🙋 Sí me anoto'},{v:'talvez',l:'🤷 Quizás'},{v:'no',l:'No por ahora'}].map(o=><Opcion key={o.v} k="quiere_piloto" v={o.v} label={o.l} />)}
                </div>
              </div>
              {data.quiere_piloto==='si'&&(
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <div>
                    <div style={{fontSize:12,color:'#94a3b8',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Nombre (opcional)</div>
                    <input value={data.nombre} onChange={e=>set('nombre',e.target.value)}
                      placeholder="Tu nombre"
                      style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
                  </div>
                  <div>
                    <div style={{fontSize:12,color:'#94a3b8',marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>Email o WhatsApp</div>
                    <input value={data.contacto} onChange={e=>set('contacto',e.target.value)}
                      placeholder="Para contactarte"
                      style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{display:'flex',gap:12,marginTop:16}}>
          {paso>1&&(
            <button onClick={()=>setPaso(paso-1)} style={{flex:1,padding:'14px',borderRadius:12,border:'1px solid rgba(255,255,255,0.1)',background:'transparent',color:'#64748b',fontSize:14,fontWeight:600,cursor:'pointer'}}>
              ← Atrás
            </button>
          )}
          {paso<TOTAL?(
            <button onClick={()=>setPaso(paso+1)} style={{flex:2,padding:'14px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',fontSize:15,fontWeight:700,cursor:'pointer'}}>
              Siguiente →
            </button>
          ):(
            <button onClick={enviar} disabled={estado==='cargando'} style={{flex:2,padding:'14px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 0 30px rgba(34,197,94,0.25)'}}>
              {estado==='cargando'?'Enviando...':'✅ Enviar respuesta'}
            </button>
          )}
        </div>

        <div style={{textAlign:'center',marginTop:16,fontSize:11,color:'#64748b'}}>
          Tus respuestas son anónimas · No compartimos tus datos
        </div>
      </div>
    </div>
  )
}
