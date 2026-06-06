'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function OnePager() {
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [acceso, setAcceso] = useState(false)
  const [estado, setEstado] = useState<'idle'|'cargando'|'ok'|'error'>('idle')

  async function handleAcceso() {
    if(!email||!nombre) return
    setEstado('cargando')
    await supabase.from('leads_inversores').insert({
      nombre,email,empresa,documento:'one-pager-v2',fecha:new Date().toISOString(),
    })
    setEstado('ok')
    setAcceso(true)
  }

  if(!acceso) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
      <div style={{width:'100%',maxWidth:420}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:56,height:56,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:'white',margin:'0 auto 16px'}}>O</div>
          <div style={{fontSize:20,fontWeight:900,color:'#f1f5f9',marginBottom:4}}>OLIVIA Circulab</div>
          <div style={{fontSize:13,color:'#64748b'}}>One Pager v2 · Junio 2026 · Confidencial</div>
        </div>
        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'28px'}}>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Nombre completo *</label>
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre"
              style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Email *</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com"
              style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>
          <div style={{marginBottom:24}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Empresa / Fondo (opcional)</label>
            <input value={empresa} onChange={e=>setEmpresa(e.target.value)} placeholder="Nombre del fondo o empresa"
              style={{width:'100%',padding:'12px 16px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>
          <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10,padding:'10px 14px',marginBottom:20}}>
            <div style={{fontSize:10,color:'#64748b',lineHeight:1.6}}>
              Al acceder aceptás que este documento es confidencial y de uso exclusivo para evaluación de inversión. No puede ser compartido sin autorización de Circulab Tech.
            </div>
          </div>
          <button onClick={handleAcceso} disabled={estado==='cargando'||!email||!nombre}
            style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:!email||!nombre?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!email||!nombre?'#64748b':'white',fontSize:15,fontWeight:700,cursor:!email||!nombre?'not-allowed':'pointer',boxShadow:email&&nombre?'0 0 30px rgba(34,197,94,0.25)':'none'}}>
            {estado==='cargando'?'Verificando...':'Ver One Pager →'}
          </button>
        </div>
        <a href="/" style={{display:'block',textAlign:'center',marginTop:16,fontSize:12,color:'#64748b',textDecoration:'none'}}>← Volver al sitio</a>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @media print {
          body{margin:0}
          .no-print{display:none!important}
          .page{box-shadow:none!important;margin:0!important}
        }
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#f0f0f0}
      `}</style>

      <div className="no-print" style={{background:'#0a0e1a',padding:'14px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'system-ui',position:'sticky',top:0,zIndex:100}}>
        <span style={{color:'#64748b',fontSize:13}}>One Pager v2 · OLIVIA Circulab · Junio 2026 · Confidencial · {nombre}</span>
        <div style={{display:'flex',gap:10}}>
          <a href="/whitepaper" style={{color:'#a855f7',fontSize:13,textDecoration:'none',fontWeight:600}}>Ver Whitepaper →</a>
          <button onClick={()=>window.print()} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',border:'none',padding:'9px 22px',borderRadius:8,fontSize:13,fontWeight:700,cursor:'pointer'}}>
            🖨️ Guardar PDF
          </button>
        </div>
      </div>

      <div className="page" style={{width:'210mm',minHeight:'297mm',margin:'20px auto',background:'white',fontFamily:'system-ui,sans-serif',fontSize:'10pt',lineHeight:1.4,boxShadow:'0 4px 40px rgba(0,0,0,0.15)',display:'flex',flexDirection:'column'}}>

        {/* HEADER */}
        <div style={{background:'linear-gradient(135deg,#0a0e1a,#0f1f10)',padding:'20px 28px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <img src="/logos/logo.png" alt="OLIVIA" style={{height:40,width:'auto'}} />
            <div>
              <div style={{fontSize:'18pt',fontWeight:900,color:'white',letterSpacing:'-0.02em'}}>OLIVIA Circulab</div>
              <div style={{fontSize:'7pt',color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.12em'}}>Oficina Latinoamericana · Valorización e Inteligencia Ambiental</div>
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'7pt',color:'#64748b'}}>Ronda Seed · Junio 2026</div>
            <div style={{fontSize:'14pt',fontWeight:800,color:'#22c55e'}}>USD 500K / USD 2M</div>
            <div style={{fontSize:'7pt',color:'#64748b'}}>Opción A 10% / Opción B 15%</div>
            <div style={{fontSize:'7pt',color:'#22c55e',marginTop:4,fontWeight:600}}>v2 · Producto IA activo</div>
          </div>
        </div>

        <div style={{padding:'16px 28px',flex:1}}>

          {/* TAGLINE */}
          <div style={{borderLeft:'4px solid #22c55e',paddingLeft:12,marginBottom:16}}>
            <div style={{fontSize:'13pt',fontWeight:800,color:'#0a0e1a',lineHeight:1.2}}>
              Tu residuo es tu nueva moneda. Tu palabra, historial crediticio. Tu arte, capital hoy.
            </div>
            <div style={{fontSize:'9pt',color:'#64748b',marginTop:4}}>
              La primera red social de acción climática con economía real integrada para el Sur Global. Tres verticales. Una billetera. Un estándar exportable.
            </div>
          </div>

          {/* DOS COLUMNAS */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>

            {/* IZQ */}
            <div style={{display:'flex',flexDirection:'column',gap:12}}>

              <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px'}}>
                <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:6}}>El Problema</div>
                <div style={{fontSize:'8.5pt',color:'#333',lineHeight:1.5}}>
                  Buenos Aires genera <strong>6.000 toneladas de residuos por día</strong>. El 50% es orgánico y termina generando metano en rellenos. Los consorcios pagan $850 ARS/kg al Estado por enterrarlo. El crédito de carbono que podría generarse vale <strong>USD 0</strong> porque no existe el sistema para crearlo.
                </div>
                <div style={{marginTop:8,display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                  {[{v:'50%',l:'basura es orgánico'},{v:'$850',l:'ARS/kg al CEAMSE'},{v:'84x',l:'más potente que CO₂'},{v:'0',l:'sistemas que lo monetizan'}].map(s=>(
                    <div key={s.l} style={{textAlign:'center',background:'white',borderRadius:6,padding:'6px'}}>
                      <div style={{fontSize:'11pt',fontWeight:800,color:'#0a0e1a'}}>{s.v}</div>
                      <div style={{fontSize:'7pt',color:'#64748b'}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px'}}>
                <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:6}}>La Solución — Proyecto Metamorfosis</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {[
                    {icon:'🌿',title:'OLIVIA Circular',desc:'Residuos → IA verifica fotos → tokens OLV → créditos de carbono Art. 6.4'},
                    {icon:'👥',title:'Quincena · PULSO',desc:'Roscas informales → historial crediticio blockchain verificable'},
                    {icon:'🎵',title:'Art of Money',desc:'Regalías Spotify/YouTube → adelanto de capital inmediato'},
                    {icon:'📱',title:'Red Social OLIVIA',desc:'Feed + stories + wallet OLV · La primera red donde el impacto real es la moneda'},
                  ].map(v=>(
                    <div key={v.title} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                      <span style={{fontSize:'11pt'}}>{v.icon}</span>
                      <div>
                        <div style={{fontSize:'8.5pt',fontWeight:700,color:'#0a0e1a'}}>{v.title}</div>
                        <div style={{fontSize:'7.5pt',color:'#64748b'}}>{v.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px'}}>
                <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:6}}>Tecnología dMRV con IA</div>
                <div style={{display:'flex',flexDirection:'column',gap:4}}>
                  {[
                    '📷 Doble foto + GPS verificado en cada registro',
                    '🤖 Gemini Vision analiza tipo, peso y separación',
                    '📍 Coordenadas origen y entrega registradas',
                    '✅ Validación manual → automática en Fase 2',
                    '🔗 Historial inmutable en blockchain',
                  ].map(p=>(
                    <div key={p} style={{display:'flex',gap:6,alignItems:'flex-start'}}>
                      <span style={{fontSize:'8pt',flexShrink:0}}>{p.split(' ')[0]}</span>
                      <span style={{fontSize:'7.5pt',color:'#333'}}>{p.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* DER */}
            <div style={{display:'flex',flexDirection:'column',gap:12}}>

              <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px'}}>
                <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:8}}>Tamaño de Mercado</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:8}}>
                  {[{v:'USD 4.5B',l:'TAM 2030'},{v:'USD 380M',l:'SAM LATAM'},{v:'USD 1.2M',l:'SOM CABA'}].map(s=>(
                    <div key={s.l} style={{textAlign:'center',background:'white',borderRadius:6,padding:'8px'}}>
                      <div style={{fontSize:'9pt',fontWeight:800,color:'#22c55e'}}>{s.v}</div>
                      <div style={{fontSize:'6.5pt',color:'#64748b',marginTop:2}}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:'7.5pt',color:'#64748b',fontStyle:'italic'}}>TAM combinado 3 verticales: USD 730B · 52.6% CAGR mercado carbono 2025-2030</div>
              </div>

              <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px'}}>
                <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:8}}>Modelo de Negocio</div>
                <div style={{display:'flex',flexDirection:'column',gap:5}}>
                  {[
                    {n:'01',t:'SaaS por expensas',d:'USD 80-200/mes por consorcio · churn <5%'},
                    {n:'02',t:'Take-rate carbono 50%',d:'Creamos el crédito desde cero · sin OLIVIA vale USD 0'},
                    {n:'03',t:'Adelanto de regalías',d:'Fee 8-15% · Art of Money · RWA verificables'},
                    {n:'04',t:'Kit OLIVIA prepago',d:'Hardware separación financiado en expensa'},
                    {n:'05',t:'Wallet OLV premium',d:'Suscripción comunidad · RSE corporativa USD 50-200/mes'},
                  ].map(m=>(
                    <div key={m.n} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                      <div style={{width:16,height:16,borderRadius:4,background:'#22c55e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'6pt',fontWeight:800,color:'white',flexShrink:0}}>{m.n}</div>
                      <div>
                        <div style={{fontSize:'8pt',fontWeight:700,color:'#0a0e1a'}}>{m.t}</div>
                        <div style={{fontSize:'7pt',color:'#64748b'}}>{m.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background:'#0f1f10',borderRadius:8,padding:'12px'}}>
                <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:8}}>Piloto Activo · CABA 2026</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                  {[
                    {v:'✅',l:'App con IA funcionando'},
                    {v:'✅',l:'dMRV Fase 1 activo'},
                    {v:'✅',l:'3 plantas aliadas CABA'},
                    {v:'✅',l:'Red social + wallet OLV'},
                    {v:'✅',l:'Encuesta ambiental activa'},
                    {v:'✅',l:'NDA + whitepaper online'},
                  ].map(s=>(
                    <div key={s.l} style={{display:'flex',gap:4,alignItems:'center'}}>
                      <span style={{fontSize:'8pt'}}>{s.v}</span>
                      <span style={{fontSize:'7.5pt',color:'#94a3b8'}}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background:'linear-gradient(135deg,#0f1f10,#050d1f)',borderRadius:8,padding:'12px',border:'1px solid rgba(34,197,94,0.3)'}}>
                <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:8}}>La Ronda</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
                  <div style={{background:'rgba(34,197,94,0.08)',borderRadius:6,padding:'10px',textAlign:'center'}}>
                    <div style={{fontSize:'7pt',color:'#64748b',marginBottom:2}}>Opción A · OLIVIA</div>
                    <div style={{fontSize:'13pt',fontWeight:900,color:'#22c55e'}}>USD 500K</div>
                    <div style={{fontSize:'7pt',color:'#64748b',marginTop:2}}>10% equity</div>
                    <div style={{fontSize:'6.5pt',color:'#22c55e',marginTop:2}}>USD 4.5M pre-money</div>
                  </div>
                  <div style={{background:'rgba(59,130,246,0.08)',borderRadius:6,padding:'10px',textAlign:'center'}}>
                    <div style={{fontSize:'7pt',color:'#64748b',marginBottom:2}}>Opción B · Holding</div>
                    <div style={{fontSize:'13pt',fontWeight:900,color:'#3b82f6'}}>USD 2M</div>
                    <div style={{fontSize:'7pt',color:'#64748b',marginTop:2}}>15% equity</div>
                    <div style={{fontSize:'6.5pt',color:'#3b82f6',marginTop:2}}>USD 11.3M pre-money</div>
                  </div>
                </div>
                <div style={{fontSize:'7pt',color:'#64748b',marginBottom:4}}>Uso de fondos (Opción A):</div>
                <div style={{display:'flex',height:8,borderRadius:4,overflow:'hidden',gap:1}}>
                  <div style={{width:'44%',background:'#3b82f6'}} />
                  <div style={{width:'32%',background:'#22c55e'}} />
                  <div style={{width:'14%',background:'#f59e0b'}} />
                  <div style={{width:'10%',background:'#a855f7'}} />
                </div>
                <div style={{display:'flex',gap:8,marginTop:4,flexWrap:'wrap'}}>
                  {[{c:'#3b82f6',l:'44% Tech'},{c:'#22c55e',l:'32% Ops'},{c:'#f59e0b',l:'14% Equipo'},{c:'#a855f7',l:'10% Legal'}].map(u=>(
                    <div key={u.l} style={{display:'flex',gap:3,alignItems:'center'}}>
                      <div style={{width:6,height:6,borderRadius:2,background:u.c}} />
                      <span style={{fontSize:'6.5pt',color:'#64748b'}}>{u.l}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* FASES */}
          <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px',marginBottom:12}}>
            <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:10}}>Fases de Desarrollo</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
              {[
                {fase:'Fase 1',año:'2026',titulo:'Piloto dMRV + IA',estado:'ACTIVA',color:'#22c55e',items:['App + IA fotos','GPS verificado','Red social OLV','3 plantas CABA']},
                {fase:'Fase 2',año:'Q3 2026',titulo:'Ecosistema Beneficios',estado:'próxima',color:'#3b82f6',items:['100 usuarios','OLV canjeables','Validación auto','SaaS consorcios']},
                {fase:'Fase 3',año:'2027',titulo:'Certificación VCS',estado:'planificada',color:'#f59e0b',items:['100 tCO2eq','Auditoría Verra','USD 22/t','Primer crédito']},
                {fase:'Fase 4',año:'2028+',titulo:'Mercado Art. 6.4',estado:'roadmap',color:'#a855f7',items:['1.000 tCO2eq','UNFCCC registro','USD 90/t','LATAM exportable']},
              ].map(f=>(
                <div key={f.fase} style={{borderLeft:`3px solid ${f.color}`,paddingLeft:8}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:3}}>
                    <div style={{fontSize:'7pt',fontWeight:700,color:f.color}}>{f.fase} · {f.año}</div>
                    {f.estado==='ACTIVA'&&<span style={{fontSize:'6pt',color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'1px 5px',borderRadius:10,fontWeight:700}}>ACTIVA</span>}
                  </div>
                  <div style={{fontSize:'8pt',fontWeight:700,color:'#0a0e1a',marginBottom:4}}>{f.titulo}</div>
                  {f.items.map(i=>(
                    <div key={i} style={{fontSize:'7pt',color:'#555',marginBottom:2}}>→ {i}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* EQUIPO */}
          <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px',marginBottom:12}}>
            <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:10}}>Equipo Fundador</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              {[
                {img:'/founders/founder-jp.jpg',nombre:'Juan Pablo Sanguinetti',rol:'Founder & Vision Lead',desc:'Abogado experto en tributario, medio ambiente y propiedad intelectual. Diseñó OLIVIA desde su propia experiencia familiar. La familia Sanguinetti-Zapata — chileno, dominicana, hijo argentino — era la familia que no reciclaba.'},
                {img:'/founders/founder-mileidy.jpg',nombre:'Mileidy Zapata',rol:'Co-Founder & Ops Lead',desc:'Experta en branding y gestión operativa. Su enfoque en la economía del cuidado traduce la complejidad blockchain en adopción barrial real. Co-creadora de la experiencia OLIVIA desde adentro.'},
              ].map(p=>(
                <div key={p.nombre} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <img src={p.img} alt={p.nombre} style={{width:48,height:48,borderRadius:8,objectFit:'cover',flexShrink:0}} />
                  <div>
                    <div style={{fontSize:'8.5pt',fontWeight:800,color:'#0a0e1a'}}>{p.nombre}</div>
                    <div style={{fontSize:'7pt',color:'#22c55e',fontWeight:600,marginBottom:3}}>{p.rol}</div>
                    <div style={{fontSize:'7pt',color:'#64748b',lineHeight:1.4}}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOJA DE RUTA */}
          <div style={{background:'#f8f9fa',borderRadius:8,padding:'12px'}}>
            <div style={{fontSize:'8pt',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.08em',color:'#22c55e',marginBottom:8}}>Hoja de Ruta</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
              {[
                {año:'2026',hito:'Piloto CABA · 3 consorcios · dMRV + IA · Red social OLIVIA · Ronda Seed'},
                {año:'2027',hito:'200 consorcios · VCS certificado · Serie A · Expansión México'},
                {año:'2028',hito:'1.000 consorcios · Art. 6.4 activo · AR+MX+CO'},
                {año:'2029+',hito:'LATAM · Protocolo OLIVIA estándar global'},
              ].map(r=>(
                <div key={r.año} style={{borderLeft:'2px solid #22c55e',paddingLeft:8}}>
                  <div style={{fontSize:'9pt',fontWeight:800,color:'#22c55e'}}>{r.año}</div>
                  <div style={{fontSize:'7pt',color:'#64748b',lineHeight:1.4,marginTop:2}}>{r.hito}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div style={{background:'#0a0e1a',padding:'10px 28px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:'7pt',color:'#64748b'}}>Circulab Tech © 2026 · Distrito IA CABA · Ley 27.506</div>
          <div style={{fontSize:'7pt',color:'#64748b'}}>contacto@oliviacirculab.com.ar</div>
          <div style={{fontSize:'7pt',color:'#22c55e',fontWeight:600}}>CONFIDENCIAL v2 · USO EXCLUSIVO INVERSORES</div>
        </div>

      </div>
    </>
  )
}
