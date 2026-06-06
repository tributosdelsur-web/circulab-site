'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Whitepaper() {
  const [acceso, setAcceso] = useState(false)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [acepta, setAcepta] = useState(false)
  const [estado, setEstado] = useState<'idle'|'cargando'|'ok'>('idle')

  async function handleAcceso() {
    if(!nombre||!email||!acepta) return
    setEstado('cargando')
    await supabase.from('nda_firmas').insert({nombre,email,empresa,acepta_nda:true})
    setEstado('ok')
    setAcceso(true)
  }

  if(!acceso) return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
      <div style={{width:'100%',maxWidth:440}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:56,height:56,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:'white',margin:'0 auto 16px'}}>O</div>
          <div style={{fontSize:22,fontWeight:900,color:'#f1f5f9',marginBottom:4}}>OLIVIA Circulab</div>
          <div style={{fontSize:13,color:'#64748b'}}>Whitepaper v1.1 · Documento confidencial</div>
        </div>

        <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'28px'}}>
          <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,padding:'12px',marginBottom:20}}>
            <div style={{fontSize:12,fontWeight:600,color:'#f59e0b',marginBottom:4}}>⚠️ Acuerdo de Confidencialidad (NDA)</div>
            <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.6}}>
              Este documento contiene información confidencial y propietaria de Circulab Tech. Al acceder aceptás no compartir, reproducir ni distribuir su contenido sin autorización expresa de Circulab Tech.
            </div>
          </div>

          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:6}}>Nombre completo *</label>
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre"
              style={{width:'100%',padding:'11px 14px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>

          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:6}}>Email *</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com"
              style={{width:'100%',padding:'11px 14px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>

          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:6}}>Empresa / Fondo (opcional)</label>
            <input value={empresa} onChange={e=>setEmpresa(e.target.value)} placeholder="Nombre del fondo o empresa"
              style={{width:'100%',padding:'11px 14px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          </div>

          <div onClick={()=>setAcepta(!acepta)} style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:24,cursor:'pointer'}}>
            <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${acepta?'#22c55e':'rgba(255,255,255,0.2)'}`,background:acepta?'#22c55e':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
              {acepta&&<span style={{color:'white',fontSize:12,fontWeight:800}}>✓</span>}
            </div>
            <div style={{fontSize:12,color:'#94a3b8',lineHeight:1.6}}>
              Acepto el Acuerdo de Confidencialidad y entiendo que este documento es de uso exclusivo para evaluación de inversión en Circulab Tech.
            </div>
          </div>

          <button onClick={handleAcceso} disabled={!nombre||!email||!acepta||estado==='cargando'}
            style={{width:'100%',padding:'13px',borderRadius:12,border:'none',background:nombre&&email&&acepta?'linear-gradient(135deg,#22c55e,#16a34a)':'rgba(255,255,255,0.04)',color:nombre&&email&&acepta?'white':'#64748b',fontSize:14,fontWeight:700,cursor:nombre&&email&&acepta?'pointer':'not-allowed',boxShadow:nombre&&email&&acepta?'0 0 20px rgba(34,197,94,0.25)':'none'}}>
            {estado==='cargando'?'Verificando...':'Acceder al Whitepaper →'}
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
          .no-print { display: none !important; }
          body { margin: 0; background: white; }
          .page { box-shadow: none !important; margin: 0 !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f0f0; }
        .wp-section { margin-bottom: 24px; }
        .wp-h2 { font-size: 14pt; font-weight: 800; color: #0a0e1a; margin-bottom: 10px; border-left: 4px solid #22c55e; padding-left: 10px; }
        .wp-h3 { font-size: 11pt; font-weight: 700; color: #22c55e; margin-bottom: 8px; margin-top: 12px; }
        .wp-p { font-size: 9pt; color: #333; line-height: 1.65; margin-bottom: 8px; }
        .wp-table { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-bottom: 12px; }
        .wp-table th { background: #0a0e1a; color: white; padding: 6px 10px; text-align: left; font-size: 8pt; }
        .wp-table td { padding: 6px 10px; border-bottom: 1px solid #e5e7eb; color: #333; }
        .wp-table tr:nth-child(even) td { background: #f9fafb; }
        .wp-badge { display: inline-block; background: rgba(34,197,94,0.1); color: #16a34a; border: 1px solid rgba(34,197,94,0.3); border-radius: 20px; padding: 2px 10px; font-size: 7.5pt; font-weight: 600; margin-right: 6px; }
        .wp-box { background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
        .wp-box-green { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); border-radius: 8px; padding: 12px; margin-bottom: 10px; }
        .wp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .wp-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 12px; }
        .wp-kpi { background: #f8f9fa; border-radius: 8px; padding: 10px; text-align: center; }
        .wp-kpi-v { font-size: 16pt; font-weight: 900; color: #22c55e; }
        .wp-kpi-l { font-size: 7.5pt; color: #64748b; margin-top: 2px; }
        .wp-fase { border-left: 3px solid #22c55e; padding-left: 12px; margin-bottom: 14px; }
        .wp-fase-num { font-size: 8pt; font-weight: 700; color: #22c55e; text-transform: uppercase; margin-bottom: 3px; }
        .wp-fase-titulo { font-size: 11pt; font-weight: 800; color: #0a0e1a; margin-bottom: 4px; }
        .wp-fase-desc { font-size: 8.5pt; color: #555; line-height: 1.5; }
        .wp-bar { height: 6px; background: #e5e7eb; border-radius: 99px; margin-top: 4px; }
        .wp-bar-fill { height: 100%; background: linear-gradient(90deg,#22c55e,#16a34a); border-radius: 99px; }
      `}</style>

      <div className="no-print" style={{background:'#0a0e1a',padding:'14px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'system-ui',position:'sticky',top:0,zIndex:100}}>
        <span style={{color:'#64748b',fontSize:13}}>Whitepaper v1.1 · OLIVIA Circulab · Confidencial · {nombre}</span>
        <button onClick={()=>window.print()} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',border:'none',padding:'9px 22px',borderRadius:8,fontSize:13,fontWeight:700,cursor:'pointer'}}>
          🖨️ Guardar PDF
        </button>
      </div>

      <div className="page" style={{width:'210mm',minHeight:'297mm',margin:'20px auto',background:'white',fontFamily:'system-ui,sans-serif',padding:'28px 32px',boxShadow:'0 4px 40px rgba(0,0,0,0.15)'}}>

        {/* PORTADA */}
        <div style={{borderBottom:'3px solid #22c55e',paddingBottom:20,marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <img src="/logos/logo.png" alt="OLIVIA" style={{height:36,width:'auto'}} />
              <div>
                <div style={{fontSize:'20pt',fontWeight:900,color:'#0a0e1a',letterSpacing:'-0.02em'}}>OLIVIA Circulab</div>
                <div style={{fontSize:'8pt',color:'#22c55e',textTransform:'uppercase',letterSpacing:'0.1em'}}>Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental</div>
              </div>
            </div>
            <div style={{fontSize:'13pt',fontWeight:700,color:'#333',marginBottom:6}}>Whitepaper Técnico v1.1</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <span className="wp-badge">Junio 2026</span>
              <span className="wp-badge">Ronda Seed</span>
              <span className="wp-badge">Distrito IA CABA</span>
              <span className="wp-badge">Ley 27.506</span>
            </div>
          </div>
          <div style={{textAlign:'right',flexShrink:0}}>
            <div style={{fontSize:'8pt',color:'#64748b',marginBottom:4}}>Ronda Seed 2026</div>
            <div style={{fontSize:'16pt',fontWeight:900,color:'#22c55e'}}>USD 500K</div>
            <div style={{fontSize:'7.5pt',color:'#64748b'}}>Opción A · 10% equity</div>
            <div style={{fontSize:'14pt',fontWeight:800,color:'#3b82f6',marginTop:6}}>USD 2M</div>
            <div style={{fontSize:'7.5pt',color:'#64748b'}}>Opción B · 15% equity</div>
          </div>
        </div>

        {/* RESUMEN EJECUTIVO */}
        <div className="wp-section">
          <div className="wp-h2">Resumen Ejecutivo</div>
          <p className="wp-p">
            OLIVIA Circulab es la primera infraestructura de inteligencia ambiental ciudadana para el Sur Global. Convierte residuos orgánicos en créditos de carbono verificados mediante dMRV (Monitoreo, Reporte y Verificación digital), tokeniza esos créditos como Olivia Coins (OLV) y los distribuye entre todos los actores del ecosistema a través de una red social de acción climática con billetera integrada.
          </p>
          <p className="wp-p">
            El proyecto nació de una experiencia personal: la familia Sanguinetti-Zapata — chileno, dominicana y su hijo Santino Eloy, el primero argentino — se mudó varias veces y siempre mantuvo el mismo tacho de basura mezclado. Cuando llegó Santino, algo cambió. Esa incomodidad se convirtió en OLIVIA.
          </p>
          <div className="wp-grid-3">
            <div className="wp-kpi"><div className="wp-kpi-v">USD 4.5B</div><div className="wp-kpi-l">TAM Carbono 2030</div></div>
            <div className="wp-kpi"><div className="wp-kpi-v">6.000t</div><div className="wp-kpi-l">Residuos/día CABA</div></div>
            <div className="wp-kpi"><div className="wp-kpi-v">0</div><div className="wp-kpi-l">Sistemas que lo monetizan</div></div>
          </div>
        </div>

        {/* EL PROBLEMA */}
        <div className="wp-section">
          <div className="wp-h2">El Problema</div>
          <div className="wp-grid">
            <div>
              <p className="wp-p">Buenos Aires genera <strong>6.000 toneladas de residuos por día</strong>. El 50% es material orgánico que termina enterrado en el relleno sanitario Norte III generando metano — un gas 84 veces más potente que el CO₂ en su impacto climático de corto plazo.</p>
              <p className="wp-p">Los consorcios pagan <strong>$850 ARS por kilogramo</strong> al CEAMSE para enterrar ese residuo. Nadie mide, digitaliza ni monetiza ese flujo. El crédito de carbono que podría generarse vale <strong>USD 0</strong> porque no existe el sistema para crearlo.</p>
            </div>
            <div>
              <div className="wp-box">
                <div style={{fontSize:'8pt',fontWeight:700,color:'#0a0e1a',marginBottom:8}}>Costo del problema en CABA</div>
                {[
                  {l:'Residuo orgánico diario',v:'3.000 t/día'},
                  {l:'Costo CEAMSE anual',v:'~USD 180M/año'},
                  {l:'Emisiones CH₄ evitables',v:'~450.000 tCO2eq/año'},
                  {l:'Valor VCS no capturado',v:'~USD 9.9M/año'},
                  {l:'Valor Art. 6.4 no capturado',v:'~USD 40.5M/año'},
                ].map(r=>(
                  <div key={r.l} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:'1px solid #f0f0f0',fontSize:'8pt'}}>
                    <span style={{color:'#555'}}>{r.l}</span>
                    <span style={{fontWeight:600,color:'#0a0e1a'}}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LA SOLUCIÓN */}
        <div className="wp-section">
          <div className="wp-h2">La Solución — Proyecto Metamorfosis</div>
          <p className="wp-p">OLIVIA Circulab crea el crédito de carbono desde cero. No intermedia créditos existentes — los genera mediante un proceso verificable de separación, recolección, procesamiento y certificación digital.</p>
          <div className="wp-grid-3">
            {[
              {icon:'📷',t:'Registro dMRV',d:'El vecino registra sus residuos con doble foto y GPS. La IA de OLIVIA analiza la foto y verifica la separación correcta.'},
              {icon:'🤖',t:'Verificación IA',d:'Gemini Vision analiza tipo de residuo, peso estimado, presencia de moneda de referencia y calidad de separación.'},
              {icon:'🌿',t:'Tokens OLV',d:'Los residuos verificados generan Olivia Coins proporcionales al CO2eq evitado. Distribuidos 50/25/15/10 entre actores.'},
            ].map(s=>(
              <div key={s.t} className="wp-box">
                <div style={{fontSize:'16pt',marginBottom:6}}>{s.icon}</div>
                <div style={{fontSize:'9pt',fontWeight:700,marginBottom:4}}>{s.t}</div>
                <div style={{fontSize:'8pt',color:'#555',lineHeight:1.5}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FASES DE DESARROLLO */}
        <div className="wp-section">
          <div className="wp-h2">Fases de Desarrollo del Producto</div>

          <div className="wp-fase">
            <div className="wp-fase-num">Fase 1 · 2026 · ACTIVA AHORA</div>
            <div className="wp-fase-titulo">Piloto dMRV con IA</div>
            <div className="wp-fase-desc">
              Plataforma funcionando en producción. Registro de residuos con doble foto + GPS. Análisis automático con Gemini Vision. Validación manual por el equipo Circulab. Tokens OLV acumulándose como historial de impacto verificado. 3 plantas aliadas activas en CABA. Comunidad OLIVIA con feed social y billetera OLV. Sin certificación todavía — valor de mercado USD 0, pero el historial se construye ahora.
            </div>
            <div style={{marginTop:8,display:'flex',gap:6,flexWrap:'wrap'}}>
              {['App funcionando','IA análisis fotos','GPS verificado','3 plantas CABA','Red social activa','Wallet OLV'].map(t=><span key={t} className="wp-badge">{t}</span>)}
            </div>
          </div>

          <div className="wp-fase" style={{borderLeftColor:'#3b82f6'}}>
            <div className="wp-fase-num" style={{color:'#3b82f6'}}>Fase 2 · Q3-Q4 2026</div>
            <div className="wp-fase-titulo">Ecosistema de Beneficios</div>
            <div className="wp-fase-desc">
              100 usuarios activos con 3+ registros. Tokens OLV canjeables por descuentos en expensas, acceso preferencial a Quincena y adelantos en AOM. Consorcios incorporados formalmente con SaaS mensual. Red social con funcionalidades completas. Validación automática con IA sin intervención manual.
            </div>
            <div style={{marginTop:8}}>
              <div style={{fontSize:'7.5pt',color:'#64748b',marginBottom:3}}>Condición de activación: 100 usuarios activos · 3+ registros cada uno</div>
              <div className="wp-bar"><div className="wp-bar-fill" style={{width:'15%',background:'linear-gradient(90deg,#3b82f6,#2563eb)'}} /></div>
            </div>
          </div>

          <div className="wp-fase" style={{borderLeftColor:'#f59e0b'}}>
            <div className="wp-fase-num" style={{color:'#f59e0b'}}>Fase 3 · 2027</div>
            <div className="wp-fase-titulo">Certificación VCS Verra</div>
            <div className="wp-fase-desc">
              100 tCO2eq acumuladas habilitan la auditoría Verra. Los tokens OLV se convierten en créditos de carbono verificados internacionalmente bajo el estándar VCS. Precio de referencia: USD 22 por tonelada. El vecino recibe el 25% del crédito generado por sus residuos. Primer ingreso real para el ecosistema.
            </div>
            <div style={{marginTop:8}}>
              <div style={{fontSize:'7.5pt',color:'#64748b',marginBottom:3}}>Condición: 100 tCO2eq + auditoría VCS + 200 usuarios activos</div>
              <div className="wp-bar"><div className="wp-bar-fill" style={{width:'5%',background:'linear-gradient(90deg,#f59e0b,#d97706)'}} /></div>
            </div>
          </div>

          <div className="wp-fase" style={{borderLeftColor:'#a855f7'}}>
            <div className="wp-fase-num" style={{color:'#a855f7'}}>Fase 4 · 2028+</div>
            <div className="wp-fase-titulo">Mercado Regulado Artículo 6.4 París</div>
            <div className="wp-fase-desc">
              1.000 tCO2eq + registro UNFCCC. El token OLV alcanza su máximo valor como activo ambiental soberano bajo el Artículo 6.4 del Acuerdo de París. Precio de referencia: USD 90 por tonelada. Exportable a México y al corredor LATAM. El vecino recibe USD 22.50 por tonelada generada (25% del crédito Art. 6.4).
            </div>
            <div style={{marginTop:8}}>
              <div style={{fontSize:'7.5pt',color:'#64748b',marginBottom:3}}>Condición: 1.000 tCO2eq + registro UNFCCC + operación en 2 países</div>
              <div className="wp-bar"><div className="wp-bar-fill" style={{width:'2%',background:'linear-gradient(90deg,#a855f7,#9333ea)'}} /></div>
            </div>
          </div>
        </div>

        {/* TECNOLOGÍA dMRV */}
        <div className="wp-section">
          <div className="wp-h2">Tecnología dMRV — Verificación Digital</div>
          <p className="wp-p">El dMRV (Digital Monitoring, Reporting and Verification) es el corazón técnico de OLIVIA. Cada registro genera una cadena de evidencia verificable:</p>
          <table className="wp-table">
            <thead>
              <tr><th>Capa</th><th>Tecnología</th><th>Qué verifica</th><th>Estándar</th></tr>
            </thead>
            <tbody>
              {[
                ['Foto origen','Gemini Vision AI','Tipo, separación, peso estimado, moneda referencia','VCS VM0036'],
                ['GPS origen','Navigator.geolocation','Ubicación del domicilio del vecino','ISO 14064'],
                ['Foto entrega','Gemini Vision AI','Recepción en planta, estado del material','VCS VM0036'],
                ['GPS entrega','Navigator.geolocation','Coordenadas de la planta receptora','ISO 14064'],
                ['Peso real','Validación admin','Confirmación del peso real vs declarado','VCS VM0036'],
                ['Timestamp','Supabase PostgreSQL','Fecha y hora inmutable del registro','IPCC 2006'],
              ].map(r=>(
                <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td style={{color:'#22c55e',fontWeight:600}}>{r[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FÓRMULAS */}
        <div className="wp-section">
          <div className="wp-h2">Metodología de Cálculo</div>
          <div className="wp-grid">
            <div>
              <div className="wp-h3">Fórmula CO2eq</div>
              <div className="wp-box" style={{fontFamily:'monospace',fontSize:'8pt',background:'#f8f9fa',lineHeight:1.8}}>
                CO2eq = kg × factor_tipo × validacion × (1 + km/100)<br/>
                tokens_OLV = round(CO2eq × 100)<br/><br/>
                Factores por tipo:<br/>
                orgánico = 1.8 tCO2eq/t<br/>
                plástico = 1.5 tCO2eq/t<br/>
                papel = 0.9 tCO2eq/t<br/>
                vidrio = 0.3 tCO2eq/t<br/>
                metal = 8.0 tCO2eq/t
              </div>
              <p className="wp-p" style={{fontSize:'7.5pt'}}>Factor orgánico 1.8 incluye: metano evitado en relleno + CO2 evitado por compostaje vs enterramiento + transporte evitado. Fuente: IPCC 2006 Guidelines, VM0036 Verra.</p>
            </div>
            <div>
              <div className="wp-h3">Distribución del crédito</div>
              <div className="wp-box">
                {[
                  {actor:'Circulab',pct:'50%',desc:'Infraestructura, IA, certificación, comercialización'},
                  {actor:'Vecino',pct:'25%',desc:'Separación en origen, doble foto'},
                  {actor:'Recolector',pct:'15%',desc:'Logística y transporte'},
                  {actor:'Planta',pct:'10%',desc:'Procesamiento y compostaje'},
                ].map(d=>(
                  <div key={d.actor} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:'1px solid #f0f0f0'}}>
                    <div>
                      <div style={{fontSize:'8.5pt',fontWeight:700}}>{d.actor} {d.pct}</div>
                      <div style={{fontSize:'7.5pt',color:'#64748b'}}>{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="wp-p" style={{fontSize:'7.5pt'}}>Circulab retiene el 50% porque crea el crédito desde cero. Sin OLIVIA ese crédito vale USD 0. No intermediamos créditos existentes.</p>
            </div>
          </div>
        </div>

        {/* MODELO DE NEGOCIO */}
        <div className="wp-section">
          <div className="wp-h2">Modelo de Negocio</div>
          <table className="wp-table">
            <thead>
              <tr><th>Fuente</th><th>Descripción</th><th>Precio</th><th>Fase</th></tr>
            </thead>
            <tbody>
              {[
                ['SaaS Consorcio','Suscripción mensual por consorcio vía expensas','USD 80-200/mes','Fase 1'],
                ['Take-rate carbono','50% del crédito VCS generado por el consorcio','50% del crédito','Fase 3'],
                ['Take-rate Art. 6.4','50% del crédito regulado París','50% del crédito','Fase 4'],
                ['Kit Olivia prepago','Hardware de separación financiado en expensa','USD 50-150 único','Fase 1'],
                ['Fee AOM','Adelanto de regalías para artistas','8-15% del adelanto','Fase 1'],
                ['Fee Quincena','Digitalización de roscas informales','2-5% del flujo','Fase 2'],
                ['RSE Corporativa','Certificado de impacto para empresas','USD 50-200/mes','Fase 2'],
              ].map(r=>(
                <tr key={r[0]}><td style={{fontWeight:600}}>{r[0]}</td><td>{r[1]}</td><td style={{color:'#22c55e',fontWeight:600}}>{r[2]}</td><td style={{color:'#3b82f6'}}>{r[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MERCADO */}
        <div className="wp-section">
          <div className="wp-h2">Tamaño de Mercado</div>
          <div className="wp-grid-3">
            {[
              {v:'USD 4.5B',l:'TAM Carbono 2030',s:'52.6% CAGR (BloombergNEF)'},
              {v:'USD 380M',l:'SAM LATAM 2028',s:'Corredor AR-MX primario'},
              {v:'USD 1.2M',l:'SOM CABA 2027',s:'300 consorcios objetivo'},
            ].map(k=>(
              <div key={k.l} className="wp-box" style={{textAlign:'center'}}>
                <div style={{fontSize:'16pt',fontWeight:900,color:'#22c55e'}}>{k.v}</div>
                <div style={{fontSize:'8.5pt',fontWeight:700,marginTop:4}}>{k.l}</div>
                <div style={{fontSize:'7.5pt',color:'#64748b',marginTop:2}}>{k.s}</div>
              </div>
            ))}
          </div>
          <p className="wp-p">TAM combinado de los tres verticales (Olivia + Quincena + AOM): USD 730B. El mercado de carbono voluntario creció 300% entre 2020 y 2023. El Artículo 6.4 del Acuerdo de París, activo desde 2025, genera demanda institucional sin precedentes para créditos certificados del Sur Global.</p>
        </div>

        {/* HOLDING */}
        <div className="wp-section">
          <div className="wp-h2">Ecosistema Circulab Tech</div>
          <p className="wp-p">OLIVIA Circulab es la vertical principal de Circulab Tech, un holding de tecnología ReFi (Regenerative Finance) con tres verticales que se retroalimentan:</p>
          <table className="wp-table">
            <thead>
              <tr><th>Vertical</th><th>Producto</th><th>Mercado</th><th>Modelo</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {[
                ['🌿 OLIVIA Circulab','Residuos → tokens OLV → créditos carbono','Consorcios CABA + LATAM','SaaS + take-rate 50%','Activo'],
                ['👥 Quincena PULSO','Roscas informales → historial crediticio blockchain','Diáspora LATAM','Fee 2-5% del flujo','MVP listo'],
                ['🎵 Art of Money','Regalías Spotify/YT → adelanto de capital','Artistas independientes','Fee 8-15%','MVP listo'],
              ].map(r=>(
                <tr key={r[0]}><td style={{fontWeight:600}}>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td style={{color:'#22c55e',fontWeight:600}}>{r[4]}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="wp-box-green">
            <div style={{fontSize:'8.5pt',fontWeight:700,marginBottom:6}}>Mecanismo de compensación cruzada</div>
            <div style={{fontSize:'8pt',color:'#333',lineHeight:1.6}}>
              Un artista puede pagar su adelanto de regalías (AOM) usando tokens OLV acumulados por separar residuos. Un miembro de rosca (Quincena) puede acceder a mejores condiciones si tiene historial de reciclaje verificado. Los tres verticales se retroalimentan creando un efecto de red único.
            </div>
          </div>
        </div>

        {/* LA RONDA */}
        <div className="wp-section">
          <div className="wp-h2">La Ronda Seed 2026</div>
          <div className="wp-grid">
            <div className="wp-box" style={{borderTop:'3px solid #22c55e'}}>
              <div style={{fontSize:'8pt',color:'#64748b',marginBottom:4}}>Opción A · Solo OLIVIA</div>
              <div style={{fontSize:'20pt',fontWeight:900,color:'#22c55e'}}>USD 500K</div>
              <div style={{fontSize:'8pt',color:'#333',marginTop:4}}>10% equity · USD 4.5M pre-money</div>
              <div style={{marginTop:10}}>
                <div style={{fontSize:'8pt',fontWeight:600,marginBottom:6}}>Uso de fondos:</div>
                {[
                  {l:'Tecnología e infraestructura',v:'44%',w:'44%'},
                  {l:'Operaciones y piloto',v:'32%',w:'32%'},
                  {l:'Equipo',v:'14%',w:'14%'},
                  {l:'Legal y compliance',v:'10%',w:'10%'},
                ].map(u=>(
                  <div key={u.l} style={{marginBottom:6}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:'7.5pt',marginBottom:2}}>
                      <span>{u.l}</span><span style={{fontWeight:600}}>{u.v}</span>
                    </div>
                    <div className="wp-bar"><div className="wp-bar-fill" style={{width:u.w}} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="wp-box" style={{borderTop:'3px solid #3b82f6'}}>
              <div style={{fontSize:'8pt',color:'#64748b',marginBottom:4}}>Opción B · Holding completo</div>
              <div style={{fontSize:'20pt',fontWeight:900,color:'#3b82f6'}}>USD 2M</div>
              <div style={{fontSize:'8pt',color:'#333',marginTop:4}}>15% equity · USD 11.3M pre-money</div>
              <div style={{marginTop:10}}>
                <div style={{fontSize:'8pt',fontWeight:600,marginBottom:6}}>Hitos a 18 meses:</div>
                {[
                  '300 consorcios activos en CABA',
                  '10.000 usuarios en la red OLIVIA',
                  '500 tCO2eq acumuladas',
                  'Certificación VCS iniciada',
                  'Expansión a México (piloto)',
                  'Serie A ready · USD 8-15M',
                ].map(h=>(
                  <div key={h} style={{display:'flex',gap:6,alignItems:'flex-start',marginBottom:5,fontSize:'8pt'}}>
                    <span style={{color:'#22c55e',flexShrink:0}}>→</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* EQUIPO */}
        <div className="wp-section">
          <div className="wp-h2">Equipo Fundador</div>
          <div className="wp-grid">
            {[
              {img:'/founders/founder-jp.jpg',nombre:'Juan Pablo Sanguinetti',rol:'Founder & Vision Lead',desc:'Abogado experto en tributario, medio ambiente y propiedad intelectual. Diseñó el motor jurídico y técnico de OLIVIA desde su propia experiencia como familia que no reciclaba. Arquitecto del protocolo de distribución 50/25/15/10 y del modelo de holding ReFi.'},
              {img:'/founders/founder-mileidy.jpg',nombre:'Mileidy Zapata',rol:'Co-Founder & Ops Lead',desc:'Experta en branding y gestión operativa. Su enfoque en la economía del cuidado garantiza que la tecnología se traduzca en adopción barrial real. Diseñó la experiencia de usuario de OLIVIA pensando en familias que nunca reciclaron.'},
            ].map(p=>(
              <div key={p.nombre} style={{display:'flex',gap:10}}>
                <img src={p.img} alt={p.nombre} style={{width:52,height:52,borderRadius:8,objectFit:'cover',flexShrink:0,filter:'grayscale(20%)'}} />
                <div>
                  <div style={{fontSize:'9pt',fontWeight:800}}>{p.nombre}</div>
                  <div style={{fontSize:'7.5pt',color:'#22c55e',fontWeight:600,marginBottom:4}}>{p.rol}</div>
                  <div style={{fontSize:'7.5pt',color:'#555',lineHeight:1.5}}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROADMAP */}
        <div className="wp-section">
          <div className="wp-h2">Hoja de Ruta</div>
          <table className="wp-table">
            <thead>
              <tr><th>Período</th><th>Hitos clave</th><th>Métrica objetivo</th></tr>
            </thead>
            <tbody>
              {[
                ['2026 Q2-Q3','Ronda Seed · 3 consorcios piloto · dMRV Fase 1 · Comunidad OLIVIA 100 usuarios','100 usuarios · 3 consorcios'],
                ['2026 Q4','200 consorcios · Token OLV en testnet · Validación automática IA','200 consorcios · 50 tCO2eq'],
                ['2027 Q1-Q2','Certificación VCS iniciada · Primer crédito vendido · Expansión México piloto','100 tCO2eq · 1 país extra'],
                ['2027 Q3-Q4','Serie A · 1.000 consorcios · AOM y Quincena integrados · 500 tCO2eq','500 tCO2eq · Serie A'],
                ['2028+','Art. 6.4 París activo · 1.000 tCO2eq · Protocolo OLIVIA exportable LATAM','1.000 tCO2eq · UNFCCC'],
              ].map(r=>(
                <tr key={r[0]}><td style={{fontWeight:600,color:'#22c55e'}}>{r[0]}</td><td>{r[1]}</td><td style={{fontWeight:600}}>{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MARCO LEGAL */}
        <div className="wp-section">
          <div className="wp-h2">Marco Legal y Regulatorio</div>
          <div className="wp-grid">
            <div>
              <div className="wp-h3">Argentina</div>
              <div className="wp-box">
                {[
                  {l:'Ley 27.506',d:'Economía del Conocimiento · Beneficios fiscales 30-40%'},
                  {l:'Distrito IA CABA',d:'Sede en polo tecnológico regulado'},
                  {l:'Ley 1.854 CABA',d:'Basura Cero · Marco para separación y reciclaje'},
                  {l:'CNV',d:'Tokenización de activos reales bajo análisis'},
                  {l:'UIF',d:'Compliance AML para transacciones OLV'},
                ].map(i=>(
                  <div key={i.l} style={{padding:'4px 0',borderBottom:'1px solid #f0f0f0',fontSize:'8pt'}}>
                    <span style={{fontWeight:700,color:'#0a0e1a'}}>{i.l}: </span>
                    <span style={{color:'#555'}}>{i.d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="wp-h3">Internacional</div>
              <div className="wp-box">
                {[
                  {l:'VCS Verra',d:'Estándar VM0036 para residuos orgánicos'},
                  {l:'Art. 6.4 París',d:'Mecanismo de créditos soberanos activo 2025'},
                  {l:'IPCC 2006',d:'Guidelines para factores de emisión'},
                  {l:'ISO 14064',d:'Verificación y validación de GEI'},
                  {l:'Gold Standard',d:'Certificación complementaria en análisis'},
                ].map(i=>(
                  <div key={i.l} style={{padding:'4px 0',borderBottom:'1px solid #f0f0f0',fontSize:'8pt'}}>
                    <span style={{fontWeight:700,color:'#0a0e1a'}}>{i.l}: </span>
                    <span style={{color:'#555'}}>{i.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{borderTop:'2px solid #22c55e',paddingTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:'7pt',color:'#64748b'}}>OLIVIA Circulab · Circulab Tech © 2026 · Distrito IA CABA · Ley 27.506</div>
          <div style={{fontSize:'7pt',color:'#64748b'}}>contacto@oliviacirculab.com.ar</div>
          <div style={{fontSize:'7pt',color:'#22c55e',fontWeight:600}}>CONFIDENCIAL · NDA FIRMADO · USO EXCLUSIVO INVERSORES</div>
        </div>

      </div>
    </>
  )
}
