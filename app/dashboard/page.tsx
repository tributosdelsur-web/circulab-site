'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const TRADUCCIONES: any = {
  es: {
    cargando:'Cargando...', hola:'Hola', panel:'Panel', olivia:'Olivia Circular',
    quincena:'Quincena', aom:'AOM', ruta:'Ruta OLV', registrar:'Registrar residuo',
    comunidad:'Comunidad', salir:'Cerrar sesión', tokens:'tokens OLV', ahorrado:'ahorrado',
    porCobrar:'por cobrar', alEstado:'al Estado', scoreGlobal:'Score global',
    nivel:'Nivel', impacto:'Impacto Ambiental', reciclados:'reciclados',
    arboles:'arboles', abono:'abono', mercado:'Valor de mercado',
    sinCert:'Sin cert.', faseActual:'Fase actual', tuParte:'tu parte (25%)',
    costoEstado:'Costo evitado al Estado', verDist:'Ver distribución detallada →',
    misRegistros:'Mis registros', plantas:'Plantas cercanas', activa:'Activa',
    validado:'Validado', pendiente:'Pendiente',
    quincenaExplica:'¿Qué es una Quincena?',
    quincenaDesc:'Una quincena es un sistema de ahorro grupal donde cada miembro aporta una suma fija y en cada ronda uno recibe el total acumulado. Circulab la digitaliza y convierte en historial crediticio en blockchain.',
    totalAhorrado:'Total ahorrado', gruposActivos:'grupos activos',
    adelanto:'Adelanto de Regalías', fuentesIngreso:'Fuentes de ingreso',
    rutaTitulo:'Tu Hoja de Ruta OLV', rutaDesc:'Del piloto al mercado de carbono internacional',
    tokensAcum:'tokens OLV acumulados', empiezanHoy:'Los que empiezan hoy acumulan más',
    empiezanDesc:'Tus tokens OLV quedan registrados permanentemente. Cuando se active la certificación VCS, se convierten automáticamente.',
    porQueCirculab:'¿Por qué Circulab retiene el 50%?',
    porQueDesc:'Circulab crea el crédito desde cero: separa, coordina, procesa, certifica y comercializa. Sin Circulab ese crédito vale USD 0.',
    dist50:'Circulab 50% · Infraestructura', dist25:'Vos 25% · Separación',
    dist15:'Recolector 15% · Logística', dist10:'Planta 10% · Procesamiento',
    f1t:'Piloto Activo', f1d:'Tus tokens OLV se acumulan como historial verificado. No son dinero todavía — son tu reputación digital.', f1c:'Ya estás aquí ✅',
    f2t:'Ecosistema de Beneficios', f2d:'Acceso a crédito preferencial en Quincena y descuentos con partners.', f2c:'100 usuarios activos con 3+ registros',
    f3t:'Certificación VCS Verra', f3d:'Tus tokens se convierten en créditos de carbono verificados internacionalmente.', f3c:'100 tCO2eq acumuladas + auditoría VCS',
    f4t:'Mercado Regulado Art. 6.4', f4d:'El token OLV alcanza su máximo valor como activo ambiental soberano.', f4c:'1.000 tCO2eq + registro UNFCCC',
  },
  en: {
    cargando:'Loading...', hola:'Hello', panel:'Dashboard', olivia:'Olivia Circular',
    quincena:'Quincena', aom:'AOM', ruta:'OLV Roadmap', registrar:'Register waste',
    comunidad:'Community', salir:'Sign out', tokens:'OLV tokens', ahorrado:'saved',
    porCobrar:'receivable', alEstado:'to State', scoreGlobal:'Global score',
    nivel:'Level', impacto:'Environmental Impact', reciclados:'recycled',
    arboles:'trees', abono:'compost', mercado:'Market value',
    sinCert:'No cert.', faseActual:'Current phase', tuParte:'your share (25%)',
    costoEstado:'Cost avoided by State', verDist:'View detailed distribution →',
    misRegistros:'My records', plantas:'Nearby plants', activa:'Active',
    validado:'Validated', pendiente:'Pending',
    quincenaExplica:'What is a Quincena?',
    quincenaDesc:'A quincena is a group savings system where each member contributes a fixed amount and in each round one person receives the total. Circulab digitizes it into blockchain credit history.',
    totalAhorrado:'Total saved', gruposActivos:'active groups',
    adelanto:'Royalty Advance', fuentesIngreso:'Income sources',
    rutaTitulo:'Your OLV Roadmap', rutaDesc:'From pilot to international carbon market',
    tokensAcum:'OLV tokens accumulated', empiezanHoy:'Early adopters accumulate more',
    empiezanDesc:'Your OLV tokens are permanently registered. When VCS certification activates, they convert automatically.',
    porQueCirculab:'Why does Circulab retain 50%?',
    porQueDesc:'Circulab creates the credit from scratch: separates, coordinates, processes, certifies and commercializes. Without Circulab that credit is worth USD 0.',
    dist50:'Circulab 50% · Infrastructure', dist25:'You 25% · Separation',
    dist15:'Collector 15% · Logistics', dist10:'Plant 10% · Processing',
    f1t:'Active Pilot', f1d:'Your OLV tokens accumulate as verified impact history. Not money yet — your digital reputation.', f1c:'You are here ✅',
    f2t:'Benefits Ecosystem', f2d:'Access to preferential credit in Quincena and partner discounts.', f2c:'100 active users with 3+ records',
    f3t:'VCS Verra Certification', f3d:'Your tokens become internationally verified carbon credits.', f3c:'100 tCO2eq accumulated + VCS audit',
    f4t:'Regulated Market Art. 6.4', f4d:'The OLV token reaches its maximum value as a sovereign environmental asset.', f4c:'1,000 tCO2eq + UNFCCC registration',
  }
}

export default function Dashboard() {
  const [uid, setUid] = useState<string>('')
  const [usuario, setUsuario] = useState<any>(null)
  const [residuos, setResiduos] = useState<any[]>([])
  const [roscas, setRoscas] = useState<any[]>([])
  const [fuentes, setFuentes] = useState<any[]>([])
  const [plantas, setPlantas] = useState<any[]>([])
  const [vista, setVista] = useState('panel')
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(true)
  const t = TRADUCCIONES[lang]
  const bg = dark?'#0a0e1a':'#f8fafc'
  const text = dark?'#f1f5f9':'#0f172a'
  const card = dark?'#111827':'#ffffff'
  const cardBorder = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
  const muted = '#64748b'
  const sidebarBg = dark?'#080c16':'#f1f5f9'
  const sidebarBorder = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
  const inputBg = dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)'

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(data.session?.user?.id) setUid(data.session.user.id)
      else window.location.href='/login'
    })
  },[])

  useEffect(()=>{
    if(!uid) return
    async function cargar() {
      const [u,r,ro,f,p] = await Promise.all([
        supabase.from('usuarios').select('*').eq('id',uid).single(),
        supabase.from('residuos').select('*').eq('usuario_id',uid).order('fecha',{ascending:false}),
        supabase.from('roscas').select('*').eq('organizador_id',uid),
        supabase.from('fuentes_aom').select('*').eq('usuario_id',uid),
        supabase.from('plantas_reciclaje').select('*').eq('activa',true),
      ])
      setUsuario(u.data); setResiduos(r.data||[]); setRoscas(ro.data||[])
      setFuentes(f.data||[]); setPlantas(p.data||[]); setLoading(false)
    }
    cargar()
  },[uid])

  const CO2_FACTORS: any = {organico:0.7,plastico:1.5,papel:0.9,vidrio:0.3,metal:8.0}
  const KM_RELLENO = 35
  const DIST = {circulab:0.50,vecino:0.25,recolector:0.15,planta:0.10}

  function calc(tipo:string,kg:number,validado:boolean) {
    const factor = CO2_FACTORS[tipo]||0.5
    const co2eq = kg*factor*(validado?1.0:0.7)*(1+KM_RELLENO/100)
    const vcs = co2eq/1000*22; const art64 = co2eq/1000*90
    return {tokens:Math.round(co2eq*100),co2eq:parseFloat(co2eq.toFixed(3)),valorVCS:parseFloat(vcs.toFixed(4)),valorArt64:parseFloat(art64.toFixed(4)),vecinoVCS:parseFloat((vcs*DIST.vecino).toFixed(4)),vecinoArt64:parseFloat((art64*DIST.vecino).toFixed(4))}
  }

  const totalKg = residuos.reduce((a,r)=>a+Number(r.kg),0)
  const totalCo2eq = residuos.reduce((a,r)=>a+calc(r.tipo,Number(r.kg),r.status==='validado').co2eq,0)
  const totalTokens = residuos.reduce((a,r)=>a+calc(r.tipo,Number(r.kg),r.status==='validado').tokens,0)
  const valorTotalVCS = residuos.reduce((a,r)=>a+calc(r.tipo,Number(r.kg),r.status==='validado').valorVCS,0)
  const valorTotalArt64 = residuos.reduce((a,r)=>a+calc(r.tipo,Number(r.kg),r.status==='validado').valorArt64,0)
  const vecinoTotalVCS = residuos.reduce((a,r)=>a+calc(r.tipo,Number(r.kg),r.status==='validado').vecinoVCS,0)
  const vecinoTotalArt64 = residuos.reduce((a,r)=>a+calc(r.tipo,Number(r.kg),r.status==='validado').vecinoArt64,0)
  const abonoEstimado = residuos.filter(r=>r.tipo==='organico').reduce((a,r)=>a+Number(r.kg)*0.3,0)
  const arbolesEquivalentes = Math.round(totalCo2eq/0.021)
  const costoEvitadoARS = Math.round(totalKg*850)
  const totalAhorrado = roscas.reduce((a,ro)=>a+Number(ro.monto_por_ronda)*Number(ro.ronda_actual),0)
  const porCobrar = fuentes.filter(f=>f.status==='pendiente').reduce((a,f)=>a+Number(f.monto),0)
  const cobrado = fuentes.filter(f=>f.status==='cobrado').reduce((a,f)=>a+Number(f.monto),0)

  async function handleLogout() { await supabase.auth.signOut(); window.location.href='/login' }

  if(!uid||loading) return <div style={{minHeight:'100vh',background:bg,display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui',fontSize:16}}>{t.cargando}</div>

  const navItems = [
    {id:'panel',label:t.panel,icon:'⊞'},
    {id:'olivia',label:'Olivia',icon:'🌿'},
    {id:'quincena',label:t.quincena,icon:'👥'},
    {id:'aom',label:t.aom,icon:'🎵'},
    {id:'ruta',label:t.ruta,icon:'🗺️'},
  ]
  const ac = (id:string) => id==='olivia'?'#22c55e':id==='quincena'?'#3b82f6':id==='aom'?'#a855f7':id==='ruta'?'#f59e0b':'#f1f5f9'
  const props = {vista,t,lang,usuario,residuos,roscas,fuentes,plantas,totalKg,totalCo2eq,totalTokens,valorTotalVCS,valorTotalArt64,vecinoTotalVCS,vecinoTotalArt64,abonoEstimado,arbolesEquivalentes,costoEvitadoARS,totalAhorrado,porCobrar,cobrado,uid,DIST,dark,bg,text,card,cardBorder,muted,inputBg}

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui,sans-serif',transition:'all 0.3s'}}>
      <style>{`
        @media(max-width:768px){.sidebar{display:none!important}.main-pad{padding:16px!important;padding-bottom:80px!important}.kpi-grid{grid-template-columns:1fr 1fr!important}.vert-grid{grid-template-columns:1fr!important}.bottom-nav{display:flex!important}.top-nav{display:flex!important}.desktop-layout{display:none!important}}
        @media(min-width:769px){.bottom-nav{display:none!important}.top-nav{display:none!important}.desktop-layout{display:flex!important}}
      `}</style>

      {/* Mobile top */}
      <div className="top-nav" style={{display:'none',padding:'12px 16px',background:sidebarBg,borderBottom:`1px solid ${sidebarBorder}`,alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <div style={{width:28,height:28,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:12,color:'white'}}>C</div>
          <div style={{fontSize:12,fontWeight:800,color:text}}>CIRCULAB</div>
        </a>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <button onClick={()=>setLang(lang==='es'?'en':'es')} style={{fontSize:10,color:'#22c55e',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'3px 7px',cursor:'pointer',fontWeight:700}}>{lang==='es'?'EN':'ES'}</button>
          <button onClick={()=>setDark(!dark)} style={{fontSize:14,background:'transparent',border:`1px solid ${cardBorder}`,borderRadius:6,padding:'3px 6px',cursor:'pointer'}}>{dark?'☀️':'🌙'}</button>
          <a href="/comunidad" style={{fontSize:10,color:'#3b82f6',background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',padding:'5px 10px',borderRadius:8,textDecoration:'none',fontWeight:700}}>🌿</a>
          <a href="/registrar" style={{fontSize:10,color:'white',background:'linear-gradient(135deg,#22c55e,#16a34a)',padding:'5px 10px',borderRadius:8,textDecoration:'none',fontWeight:700}}>+</a>
          <button onClick={handleLogout} style={{fontSize:10,color:muted,background:'transparent',border:`1px solid ${cardBorder}`,borderRadius:6,padding:'3px 7px',cursor:'pointer'}}>{lang==='es'?'Salir':'Out'}</button>
        </div>
      </div>

      {/* Desktop */}
      <div className="desktop-layout" style={{display:'none'}}>
        <aside className="sidebar" style={{width:220,background:sidebarBg,borderRight:`1px solid ${sidebarBorder}`,display:'flex',flexDirection:'column',flexShrink:0,minHeight:'100vh',position:'sticky',top:0,height:'100vh'}}>
          <a href="/" style={{padding:'20px',borderBottom:`1px solid ${sidebarBorder}`,display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
            <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>C</div>
            <div><div style={{fontSize:13,fontWeight:800,color:text}}>CIRCULAB</div><div style={{fontSize:9,color:muted,textTransform:'uppercase'}}>TECH</div></div>
          </a>
          <nav style={{flex:1,padding:'12px 8px',display:'flex',flexDirection:'column',gap:4}}>
            {navItems.map(item=>{
              const active = vista===item.id
              const c = ac(item.id)
              return (
                <button key={item.id} onClick={()=>setVista(item.id)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:10,border:'none',cursor:'pointer',background:active?(dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)'):'transparent',borderLeft:active?'2px solid '+c:'2px solid transparent',color:active?c:muted,fontSize:13,fontWeight:active?700:500,textAlign:'left',width:'100%'}}>
                  <span>{item.icon}</span>
                  {item.id==='olivia'?t.olivia:item.id==='aom'?'Art of Money':item.id==='ruta'?t.ruta:item.label}
                </button>
              )
            })}
            <a href="/comunidad" style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:10,textDecoration:'none',background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',color:'#3b82f6',fontSize:13,fontWeight:700,marginTop:4}}>
              <span>🌿</span> {t.comunidad}
            </a>
            <a href="/registrar" style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',borderRadius:10,textDecoration:'none',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',fontSize:13,fontWeight:700,marginTop:4}}>
              <span>📷</span> {t.registrar}
            </a>
          </nav>
          <div style={{padding:'12px 16px',borderTop:`1px solid ${sidebarBorder}`}}>
            <div style={{fontSize:12,fontWeight:700,color:text}}>{usuario?.nombre} {usuario?.apellido}</div>
            <div style={{fontSize:10,color:'#22c55e',marginTop:2}}>{t.nivel} {usuario?.nivel} · {usuario?.score_pulso} pts</div>
            <div style={{display:'flex',gap:6,marginTop:8}}>
              <button onClick={()=>setLang(lang==='es'?'en':'es')} style={{flex:1,fontSize:10,color:'#22c55e',background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:6,padding:'4px',cursor:'pointer',fontWeight:700}}>{lang==='es'?'EN':'ES'}</button>
              <button onClick={()=>setDark(!dark)} style={{fontSize:14,background:'transparent',border:`1px solid ${cardBorder}`,borderRadius:6,padding:'4px 8px',cursor:'pointer'}}>{dark?'☀':'🌙'}</button>
              <button onClick={handleLogout} style={{flex:2,fontSize:10,color:muted,background:'transparent',border:`1px solid ${cardBorder}`,borderRadius:6,padding:'4px 10px',cursor:'pointer'}}>{t.salir}</button>
            </div>
          </div>
        </aside>

        <main className="main-pad" style={{flex:1,padding:'28px',overflowY:'auto',minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <div style={{fontSize:12,color:muted}}>{t.hola}, {usuario?.nombre}</div>
            <div style={{display:'flex',gap:8}}>
              <a href="/comunidad" style={{background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',color:'#3b82f6',padding:'8px 16px',borderRadius:10,fontSize:12,fontWeight:700,textDecoration:'none'}}>
                🌿 {t.comunidad}
              </a>
              <a href="/registrar" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'8px 18px',borderRadius:10,fontSize:12,fontWeight:700,textDecoration:'none',boxShadow:'0 0 20px rgba(34,197,94,0.3)'}}>
                📷 {t.registrar}
              </a>
            </div>
          </div>
          <PanelContent {...props} />
        </main>
      </div>

      {/* Mobile main */}
      <main className="main-pad" style={{padding:'16px',paddingBottom:80}}>
        <PanelContent {...props} />
      </main>

      {/* Mobile bottom nav */}
      <div className="bottom-nav" style={{display:'none',position:'fixed',bottom:0,left:0,right:0,background:sidebarBg,borderTop:`1px solid ${sidebarBorder}`,padding:'8px 0',zIndex:100,justifyContent:'space-around'}}>
        {navItems.map(item=>{
          const active = vista===item.id
          const c = ac(item.id)
          return (
            <button key={item.id} onClick={()=>setVista(item.id)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'6px 8px',border:'none',background:'transparent',cursor:'pointer',color:active?c:muted,minWidth:44}}>
              <span style={{fontSize:18}}>{item.icon}</span>
              <span style={{fontSize:8,fontWeight:active?700:500}}>{item.label}</span>
            </button>
          )
        })}
        <a href="/comunidad" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'6px 8px',textDecoration:'none',color:'#3b82f6',minWidth:44}}>
          <span style={{fontSize:18}}>🌿</span>
          <span style={{fontSize:8,fontWeight:700}}>{t.comunidad}</span>
        </a>
        <a href="/registrar" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'6px 8px',textDecoration:'none',color:'#22c55e',minWidth:44}}>
          <span style={{fontSize:18}}>📷</span>
          <span style={{fontSize:8,fontWeight:700}}>{lang==='es'?'Registrar':'Register'}</span>
        </a>
      </div>
    </div>
  )
}

function PanelContent({vista,t,lang,usuario,residuos,roscas,fuentes,plantas,totalKg,totalCo2eq,totalTokens,valorTotalVCS,valorTotalArt64,vecinoTotalVCS,vecinoTotalArt64,abonoEstimado,arbolesEquivalentes,costoEvitadoARS,totalAhorrado,porCobrar,cobrado,uid,DIST,dark,bg,text,card,cardBorder,muted,inputBg}: any) {
  const CO2_FACTORS: any = {organico:0.7,plastico:1.5,papel:0.9,vidrio:0.3,metal:8.0}
  const KM_RELLENO = 35
  function calc(tipo:string,kg:number,validado:boolean) {
    const factor = CO2_FACTORS[tipo]||0.5
    const co2eq = kg*factor*(validado?1.0:0.7)*(1+KM_RELLENO/100)
    return {tokens:Math.round(co2eq*100),co2eq:parseFloat(co2eq.toFixed(3))}
  }
  const heroBg = dark?'#0f1f10':'#f0fdf4'

  if(vista==='panel') return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <div style={{background:heroBg,border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'20px'}}>
        <div style={{fontSize:12,color:muted,marginBottom:4}}>Identidad Financiera Digital</div>
        <div style={{fontSize:20,fontWeight:900,marginBottom:14,color:text}}>{t.hola}, {usuario?.nombre}! 👋</div>
        <div className="kpi-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
          {[
            {v:String(totalTokens),l:t.tokens,c:'#22c55e',bg:'rgba(34,197,94,0.1)'},
            {v:'$'+Math.round(totalAhorrado/1000)+'k',l:t.ahorrado,c:'#3b82f6',bg:'rgba(59,130,246,0.1)'},
            {v:'USD '+porCobrar,l:t.porCobrar,c:'#a855f7',bg:'rgba(168,85,247,0.1)'},
            {v:'$'+costoEvitadoARS.toLocaleString(),l:t.alEstado,c:'#f59e0b',bg:'rgba(245,158,11,0.1)'},
          ].map(k=>(
            <div key={k.l} style={{background:k.bg,borderRadius:12,padding:'12px',textAlign:'center'}}>
              <div style={{fontSize:18,fontWeight:800,color:k.c}}>{k.v}</div>
              <div style={{fontSize:10,color:muted,marginTop:3}}>{k.l}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,color:muted,marginBottom:6,display:'flex',justifyContent:'space-between'}}>
          <span>{t.scoreGlobal}</span><span style={{color:'#22c55e'}}>{usuario?.score_pulso}/1000</span>
        </div>
        <div style={{height:6,background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)',borderRadius:99}}>
          <div style={{height:'100%',width:((usuario?.score_pulso/1000)*100)+'%',background:'#22c55e',borderRadius:99}} />
        </div>
      </div>

      {/* Acceso rápido comunidad */}
      <a href="/comunidad" style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(59,130,246,0.08)':'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'14px 18px',textDecoration:'none'}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:'#3b82f6'}}>🌿 {t.comunidad} OLIVIA</div>
          <div style={{fontSize:11,color:muted,marginTop:2}}>Feed · Stories · Wallet OLV</div>
        </div>
        <span style={{color:'#3b82f6',fontSize:18}}>→</span>
      </a>

      <div className="vert-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:14}}>
        <div style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:10,color:'#22c55e'}}>🌿 {t.impacto}</div>
          <div style={{display:'flex',gap:8,marginBottom:10}}>
            {[{v:totalKg.toFixed(1)+'kg',l:t.reciclados},{v:totalCo2eq.toFixed(2)+'t',l:'CO2eq'},{v:String(totalTokens),l:'OLV'}].map(s=>(
              <div key={s.l} style={{textAlign:'center',flex:1}}>
                <div style={{fontSize:15,fontWeight:800,color:'#22c55e'}}>{s.v}</div>
                <div style={{fontSize:9,color:muted}}>{s.l}</div>
              </div>
            ))}
          </div>
          {residuos.slice(0,3).map((r:any,i:number)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 10px',borderRadius:8,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',marginBottom:4}}>
              <span style={{fontSize:11,textTransform:'capitalize',color:text}}>{r.tipo} {r.kg}kg</span>
              <span style={{fontSize:11,color:r.status==='validado'?'#22c55e':'#f59e0b',fontWeight:600}}>{calc(r.tipo,Number(r.kg),r.status==='validado').tokens} OLV</span>
            </div>
          ))}
        </div>
        <div style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:6,color:'#3b82f6'}}>👥 {t.quincena}</div>
          <div style={{fontSize:22,fontWeight:800,color:'#3b82f6',marginBottom:4}}>${totalAhorrado.toLocaleString()}</div>
          <div style={{fontSize:11,color:muted,marginBottom:10}}>{roscas.length} {t.gruposActivos}</div>
          {roscas.slice(0,2).map((g:any,i:number)=>(
            <div key={i} style={{padding:'8px 10px',borderRadius:8,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',marginBottom:6}}>
              <div style={{fontSize:11,fontWeight:600,marginBottom:4,color:text}}>{g.nombre}</div>
              <div style={{height:4,background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)',borderRadius:99}}>
                <div style={{height:'100%',width:(g.ronda_actual/g.total_rondas*100)+'%',background:'#3b82f6',borderRadius:99}} />
              </div>
            </div>
          ))}
        </div>
        <div style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:10,color:'#a855f7'}}>🎵 {t.adelanto}</div>
          <div style={{display:'flex',gap:10,marginBottom:10}}>
            <div style={{flex:1,textAlign:'center'}}><div style={{fontSize:16,fontWeight:800,color:'#a855f7'}}>USD {porCobrar}</div><div style={{fontSize:9,color:muted}}>{t.porCobrar}</div></div>
            <div style={{flex:1,textAlign:'center'}}><div style={{fontSize:16,fontWeight:800,color:'#22c55e'}}>USD {cobrado}</div><div style={{fontSize:9,color:muted}}>{t.ahorrado}</div></div>
          </div>
          {fuentes.slice(0,3).map((f:any,i:number)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 10px',borderRadius:8,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',marginBottom:4}}>
              <span style={{fontSize:11,color:text}}>{f.plataforma}</span>
              <span style={{fontSize:11,fontWeight:700,color:f.status==='cobrado'?'#22c55e':'#a855f7'}}>USD {f.monto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if(vista==='olivia') return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div style={{background:heroBg,border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'20px'}}>
        <div style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>🌿 {t.olivia}</div>
        <div style={{fontSize:11,color:muted,marginBottom:14}}>dMRV · Tokens OLV · Art. 6.4 Paris · ReFi</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(70px,1fr))',gap:10}}>
          {[{v:totalKg.toFixed(1)+'kg',l:t.reciclados},{v:totalCo2eq.toFixed(3)+'t',l:'CO2eq'},{v:String(totalTokens),l:'tokens OLV'},{v:abonoEstimado.toFixed(1)+'kg',l:t.abono},{v:String(arbolesEquivalentes),l:t.arboles}].map(s=>(
            <div key={s.l} style={{textAlign:'center'}}>
              <div style={{fontSize:16,fontWeight:800,color:'#22c55e'}}>{s.v}</div>
              <div style={{fontSize:9,color:muted,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:text}}>{t.mercado}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
          <div style={{background:inputBg,borderRadius:10,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:muted,marginBottom:4}}>{t.sinCert}</div>
            <div style={{fontSize:14,fontWeight:800,color:muted}}>USD 0</div>
          </div>
          <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:muted,marginBottom:2}}>VCS Verra</div>
            <div style={{fontSize:12,fontWeight:800,color:'#22c55e'}}>USD {valorTotalVCS.toFixed(4)}</div>
            <div style={{fontSize:8,color:'#22c55e',marginTop:2}}>{t.tuParte}: {vecinoTotalVCS.toFixed(4)}</div>
          </div>
          <div style={{background:'rgba(168,85,247,0.06)',border:'1px solid rgba(168,85,247,0.2)',borderRadius:10,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:muted,marginBottom:2}}>Art. 6.4</div>
            <div style={{fontSize:12,fontWeight:800,color:'#a855f7'}}>USD {valorTotalArt64.toFixed(4)}</div>
          </div>
        </div>
        <div style={{padding:'10px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,marginBottom:12}}>
          <div style={{fontSize:11,color:'#f59e0b',fontWeight:600}}>{t.costoEstado}: ${costoEvitadoARS.toLocaleString()} ARS</div>
        </div>
        <a href="/distribucion" style={{display:'block',background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'12px 16px',borderRadius:12,textAlign:'center',fontSize:13,fontWeight:700,textDecoration:'none'}}>
          💰 {t.verDist}
        </a>
      </div>
      <div style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:700,color:text}}>{t.misRegistros}</div>
          <a href="/registrar" style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',borderRadius:8,padding:'5px 12px',fontSize:11,fontWeight:600,textDecoration:'none'}}>+</a>
        </div>
        {residuos.map((r:any,i:number)=>{
          const c = calc(r.tipo,Number(r.kg),r.status==='validado')
          return (
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',borderRadius:10,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',marginBottom:6}}>
              <div>
                <div style={{fontSize:12,fontWeight:600,textTransform:'capitalize',color:text}}>{r.tipo} - {r.kg}kg</div>
                <div style={{fontSize:9,color:muted,marginTop:1}}>{r.fecha} · {c.co2eq}kg CO2eq</div>
                {r.punto_entrega&&<div style={{fontSize:9,color:'#3b82f6',marginTop:1}}>📍 {r.punto_entrega}</div>}
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:13,fontWeight:800,color:'#22c55e'}}>{c.tokens} OLV</div>
                <div style={{fontSize:9,color:r.status==='validado'?'#22c55e':'#f59e0b',marginTop:1}}>{r.status==='validado'?t.validado:t.pendiente}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:text}}>{t.plantas}</div>
        {plantas.map((p:any,i:number)=>(
          <div key={i} style={{padding:'12px',borderRadius:10,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',marginBottom:8}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
              <div style={{fontSize:12,fontWeight:700,color:text}}>{p.nombre}</div>
              <span style={{fontSize:9,color:'#22c55e',background:'rgba(34,197,94,0.12)',padding:'2px 8px',borderRadius:20}}>{t.activa}</span>
            </div>
            <div style={{fontSize:10,color:muted}}>📍 {p.direccion} · {p.barrio}</div>
            <div style={{fontSize:10,color:muted}}>🕐 {p.horario}</div>
          </div>
        ))}
      </div>
    </div>
  )

  if(vista==='quincena') return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div style={{background:dark?'#050d1f':'#eff6ff',border:'1px solid rgba(59,130,246,0.2)',borderRadius:16,padding:'20px'}}>
        <div style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>👥 {t.quincena}</div>
        <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.15)',borderRadius:10,padding:'12px',marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:600,color:'#93c5fd',marginBottom:4}}>{t.quincenaExplica}</div>
          <div style={{fontSize:11,color:muted,lineHeight:1.6}}>{t.quincenaDesc}</div>
        </div>
        <div style={{display:'flex',gap:20}}>
          <div><div style={{fontSize:24,fontWeight:800,color:'#3b82f6'}}>${totalAhorrado.toLocaleString()}</div><div style={{fontSize:10,color:muted}}>{t.totalAhorrado}</div></div>
          <div><div style={{fontSize:24,fontWeight:800,color:'#3b82f6'}}>{roscas.length}</div><div style={{fontSize:10,color:muted}}>{t.gruposActivos}</div></div>
        </div>
      </div>
      {roscas.map((g:any,i:number)=>(
        <div key={i} style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <div style={{fontSize:14,fontWeight:800,color:text}}>{g.nombre}</div>
            <span style={{fontSize:9,color:'#3b82f6',background:'rgba(59,130,246,0.12)',padding:'3px 10px',borderRadius:20}}>Activo</span>
          </div>
          <div style={{fontSize:11,color:muted,marginBottom:10}}>${Number(g.monto_por_ronda).toLocaleString()}/ronda</div>
          <div style={{height:6,background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)',borderRadius:99,marginBottom:6}}>
            <div style={{height:'100%',width:(g.ronda_actual/g.total_rondas*100)+'%',background:'#3b82f6',borderRadius:99}} />
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:muted}}>
            <span>Ronda {g.ronda_actual}/{g.total_rondas}</span>
            <span style={{color:'#3b82f6'}}>{Math.round(g.ronda_actual/g.total_rondas*100)}%</span>
          </div>
        </div>
      ))}
    </div>
  )

  if(vista==='aom') return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div style={{background:dark?'#100520':'#faf5ff',border:'1px solid rgba(168,85,247,0.2)',borderRadius:16,padding:'20px'}}>
        <div style={{fontSize:20,fontWeight:900,marginBottom:6,color:text}}>🎵 Art of Money</div>
        <div style={{fontSize:11,color:muted,marginBottom:14}}>{t.adelanto} · RWA · Capital Creativo</div>
        <div style={{display:'flex',gap:20}}>
          <div><div style={{fontSize:24,fontWeight:800,color:'#a855f7'}}>USD {porCobrar}</div><div style={{fontSize:10,color:muted}}>{t.porCobrar}</div></div>
          <div><div style={{fontSize:24,fontWeight:800,color:'#22c55e'}}>USD {cobrado}</div><div style={{fontSize:10,color:muted}}>{t.ahorrado}</div></div>
        </div>
      </div>
      <div style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:14,color:text}}>{t.fuentesIngreso}</div>
        {fuentes.map((f:any,i:number)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px',borderRadius:10,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',marginBottom:6}}>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:text}}>{f.plataforma}</div>
              <div style={{fontSize:10,color:muted,marginTop:1}}>{f.descripcion}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:14,fontWeight:800,color:f.status==='cobrado'?'#22c55e':'#a855f7'}}>USD {f.monto}</div>
              <div style={{fontSize:9,color:f.status==='cobrado'?'#22c55e':'#f59e0b',marginTop:1}}>{f.status==='cobrado'?t.ahorrado:t.pendiente}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if(vista==='ruta') return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div style={{background:dark?'linear-gradient(135deg,#0a1628,#0f1f10)':heroBg,border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'20px'}}>
        <div style={{fontSize:20,fontWeight:900,marginBottom:4,color:text}}>🗺️ {t.rutaTitulo}</div>
        <div style={{fontSize:11,color:muted,marginBottom:12}}>{t.rutaDesc}</div>
        <div style={{fontSize:13,color:text}}>{lang==='es'?'Tenés':'You have'} <span style={{color:'#22c55e',fontWeight:800}}>{totalTokens} {t.tokensAcum}</span></div>
      </div>
      <div style={{background:card,border:`1px solid ${cardBorder}`,borderRadius:16,padding:'18px'}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#22c55e'}}>💰 Distribución del crédito</div>
        <div style={{display:'flex',height:28,borderRadius:8,overflow:'hidden',gap:1,marginBottom:12}}>
          <div style={{width:'50%',background:'#3b82f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'white'}}>Circulab 50%</div>
          <div style={{width:'25%',background:'#22c55e',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'white'}}>{lang==='es'?'Vos':'You'} 25%</div>
          <div style={{width:'15%',background:'#f59e0b',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white'}}>15%</div>
          <div style={{width:'10%',background:'#a855f7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'white'}}>10%</div>
        </div>
        {[
          {label:t.dist50,color:'#3b82f6',usd:'USD 50'},
          {label:t.dist25,color:'#22c55e',usd:'USD 25'},
          {label:t.dist15,color:'#f59e0b',usd:'USD 15'},
          {label:t.dist10,color:'#a855f7',usd:'USD 10'},
        ].map(d=>(
          <div key={d.label} style={{display:'flex',justifyContent:'space-between',padding:'6px 10px',borderRadius:8,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',marginBottom:4}}>
            <div style={{fontSize:11,color:muted}}>{d.label}</div>
            <div style={{fontSize:12,fontWeight:700,color:d.color}}>{d.usd}</div>
          </div>
        ))}
      </div>
      {[
        {fase:'Fase 1',titulo:t.f1t,estado:'activo',periodo:'2026',desc:t.f1d,condicion:t.f1c,color:'#22c55e',valor:'USD 0',valorDesc:t.sinCert},
        {fase:'Fase 2',titulo:t.f2t,estado:'proximo',periodo:'3-6 meses',desc:t.f2d,condicion:t.f2c,color:'#3b82f6',valor:lang==='es'?'Acceso a crédito':'Credit access',valorDesc:''},
        {fase:'Fase 3',titulo:t.f3t,estado:'futuro',periodo:'12-18 meses',desc:t.f3d,condicion:t.f3c,color:'#f59e0b',valor:'USD '+(totalTokens*0.022*0.25).toFixed(2),valorDesc:t.tuParte},
        {fase:'Fase 4',titulo:t.f4t,estado:'futuro',periodo:'24-36 meses',desc:t.f4d,condicion:t.f4c,color:'#a855f7',valor:'USD '+(totalTokens*0.09*0.25).toFixed(2),valorDesc:t.tuParte+' · Art. 6.4'},
      ].map((f,i)=>(
        <div key={i} style={{background:card,border:`1px solid ${f.estado==='activo'?f.color+'44':cardBorder}`,borderLeft:`4px solid ${f.estado==='activo'?f.color:f.estado==='proximo'?f.color+'66':'rgba(255,255,255,0.1)'}`,borderRadius:16,padding:'18px',opacity:f.estado==='futuro'?0.75:1}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                <span style={{fontSize:10,fontWeight:700,color:f.color,background:f.color+'18',padding:'2px 8px',borderRadius:20}}>{f.fase}</span>
                <span style={{fontSize:10,color:muted}}>{f.periodo}</span>
              </div>
              <div style={{fontSize:15,fontWeight:800,color:text}}>{f.titulo}</div>
            </div>
            <div style={{textAlign:'right',flexShrink:0,marginLeft:12}}>
              <div style={{fontSize:18,fontWeight:800,color:f.color}}>{f.valor}</div>
              {f.valorDesc&&<div style={{fontSize:9,color:muted,marginTop:2}}>{f.valorDesc}</div>}
            </div>
          </div>
          <div style={{fontSize:11,color:muted,lineHeight:1.6,marginBottom:10}}>{f.desc}</div>
          <div style={{fontSize:10,color:muted,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.03)',borderRadius:8,padding:'6px 10px'}}>
            {f.estado==='activo'?'✅':'🎯'} {f.condicion}
          </div>
        </div>
      ))}
      <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:16,padding:'18px',textAlign:'center'}}>
        <div style={{fontSize:13,fontWeight:700,color:'#22c55e',marginBottom:8}}>{t.empiezanHoy}</div>
        <div style={{fontSize:11,color:muted,lineHeight:1.8}}>{t.empiezanDesc}</div>
      </div>
    </div>
  )

  return null
}
