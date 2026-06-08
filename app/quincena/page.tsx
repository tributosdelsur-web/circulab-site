'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const T = {
  es: {
    badge:'Quincena · Protocolo PULSO · Circulab Tech',
    titulo:'La rosca digital',
    titulo2:'que te da acceso al crédito formal.',
    subtitulo:'Quincena digitaliza las roscas — los grupos de ahorro informales que mueven millones en LATAM. Cada pago genera historial crediticio real. Ese historial es tu score PULSO.',
    rosca_titulo:'¿Qué es una rosca?',
    rosca_desc:'Una rosca (también llamada tanda, vaca, pandero o junta según el país) es un grupo de personas que se comprometen a aportar una suma fija cada período. Por turno, cada miembro recibe el total acumulado. Es la forma de ahorro más antigua y extendida de América Latina — y nadie la había digitalizado bien hasta ahora.',
    rosca_paises:'🇦🇷 Rosca · 🇲🇽 Tanda · 🇨🇴 Cadena · 🇧🇷 Consórcio · 🇨🇱 Junta · 🇩🇴 San',
    como_titulo:'¿Cómo funciona Quincena?',
    pulso_titulo:'¿Qué es el score PULSO?',
    pulso_desc:'PULSO (Protocolo Único de Legitimación de Score Operativo) es el score de reputación crediticia que OLIVIA genera a partir de tu comportamiento en las roscas. Cada vez que cumplís un aporte — tu score sube. Ese score es lo que te abre las puertas al crédito formal.',
    corredor_titulo:'Corredor LATAM',
    corredor_desc:'Quincena opera en el corredor AR MX CO BR CH DO. Una rosca puede tener miembros en distintos países. El score PULSO es portable — si te mudás de Argentina a México, tu historial viaja con vos.',
    fases_titulo:'Las 4 fases de Quincena',
    sim_titulo:'Simulador de rosca',
    sim_miembros:'Miembros en la rosca',
    sim_aporte:'Aporte por período (USD)',
    sim_resultado:'Cuándo cobrás',
    sim_total:'Total que recibís',
    sim_nota:'Estimación orientativa · El turno se asigna por consenso o sorteo',
    conexion_titulo:'Más PULSO → mejor tasa en AOM → más OLV',
    cta_titulo:'¿Querés armar tu rosca?',
    cta_sub:'Dejá tus datos y te avisamos cuando Quincena abra el piloto en tu ciudad',
    nombre:'Tu nombre',
    email:'Tu email',
    ciudad:'Tu ciudad',
    enviar:'Anotarme en la lista →',
    enviando:'Enviando...',
    enviado:'¡Anotado! Te avisamos cuando abramos en tu ciudad.',
    volver:'← Inicio',
  },
  en: {
    badge:'Quincena · PULSO Protocol · Circulab Tech',
    titulo:'The digital savings circle',
    titulo2:'that gives you access to formal credit.',
    subtitulo:'Quincena digitalizes savings circles — the informal savings groups that move millions across LATAM. Every payment generates real credit history. That history is your PULSO score.',
    rosca_titulo:'What is a savings circle?',
    rosca_desc:'A savings circle (called rosca, tanda, vaca, pandero or junta depending on the country) is a group of people who commit to contributing a fixed amount each period. In turn, each member receives the total accumulated. It is the oldest and most widespread form of savings in Latin America — and nobody had digitalized it well until now.',
    rosca_paises:'🇦🇷 Rosca · 🇲🇽 Tanda · 🇨🇴 Cadena · 🇧🇷 Consórcio · 🇨🇱 Junta · 🇩🇴 San',
    como_titulo:'How does Quincena work?',
    pulso_titulo:'What is the PULSO score?',
    pulso_desc:'PULSO (Unique Protocol for Operative Score Legitimation) is the credit reputation score that OLIVIA generates from your behavior in savings circles. Every time you make a contribution — your score goes up. That score is what opens doors to formal credit.',
    corredor_titulo:'LATAM Corridor',
    corredor_desc:'Quincena operates in the AR MX CO BR CH DO corridor. A savings circle can have members in different countries. The PULSO score is portable — if you move from Argentina to Mexico, your history travels with you.',
    fases_titulo:'4 Quincena Phases',
    sim_titulo:'Savings circle simulator',
    sim_miembros:'Members in the circle',
    sim_aporte:'Contribution per period (USD)',
    sim_resultado:'When you get paid',
    sim_total:'Total you receive',
    sim_nota:'Indicative estimate · Turn is assigned by consensus or draw',
    conexion_titulo:'More PULSO → better rate in AOM → more OLV',
    cta_titulo:'Want to start your savings circle?',
    cta_sub:'Leave your details and we\'ll notify you when Quincena opens the pilot in your city',
    nombre:'Your name',
    email:'Your email',
    ciudad:'Your city',
    enviar:'Sign me up →',
    enviando:'Sending...',
    enviado:'Signed up! We\'ll notify you when we open in your city.',
    volver:'← Home',
  }
}

const PASOS = [
  {num:'01',icon:'👥',es:{t:'Armás tu grupo',d:'Invitás a personas de confianza — familia, amigos, colegas. Mínimo 4, máximo 20. Cada uno elige cuánto aporta y cada cuánto.'},en:{t:'You form your group',d:'You invite trusted people — family, friends, colleagues. Minimum 4, maximum 20. Each one chooses how much to contribute and how often.'},c:'#3b82f6'},
  {num:'02',icon:'📱',es:{t:'Digitalizás los aportes',d:'Cada pago queda registrado en la app con fecha y hora. Sin confusiones, sin cuadernos, sin discusiones. Todo transparente para todos los miembros.'},en:{t:'You digitalize contributions',d:'Each payment is recorded in the app with date and time. No confusion, no notebooks, no arguments. Everything transparent for all members.'},c:'#22c55e'},
  {num:'03',icon:'🪙',es:{t:'Generás score PULSO',d:'Cada aporte a tiempo suma puntos a tu score PULSO. Cuanto más consistente seas — mayor tu score. El sistema aprende tu comportamiento financiero real.'},en:{t:'You generate PULSO score',d:'Each on-time contribution adds points to your PULSO score. The more consistent you are — the higher your score. The system learns your real financial behavior.'},c:'#f59e0b'},
  {num:'04',icon:'🏦',es:{t:'Accedés al crédito formal',d:'Con tu score PULSO verificado, podés acceder a créditos formales, mejores tasas en AOM y otros productos financieros. Tu historial informal se convierte en activo formal.'},en:{t:'You access formal credit',d:'With your verified PULSO score, you can access formal credit, better rates in AOM and other financial products. Your informal history becomes a formal asset.'},c:'#a855f7'},
]

const TIERS = [
  {nivel:'PULSO Bronce',puntos:'0-299',desc_es:'Acceso a roscas verificadas · Dashboard básico · OLV por aportes',desc_en:'Access to verified circles · Basic dashboard · OLV per contribution',c:'#f97316'},
  {nivel:'PULSO Plata',puntos:'300-699',desc_es:'Roscas prioritarias · Mejor posición en el turno · Historial exportable',desc_en:'Priority circles · Better turn position · Exportable history',c:'#94a3b8'},
  {nivel:'PULSO Oro',puntos:'700-999',desc_es:'Acceso a AOM con tasa preferencial · Badge verificado · Referral premium',desc_en:'AOM access with preferential rate · Verified badge · Premium referral',c:'#f59e0b'},
  {nivel:'PULSO Diamante',puntos:'1000+',desc_es:'Crédito formal verificado · AOM tasa mínima · Embajador Quincena',desc_en:'Verified formal credit · AOM minimum rate · Quincena ambassador',c:'#3b82f6'},
]

const FASES = [
  {fase:'Fase 1',año:'2026 · Piloto',es:'Roscas digitales en CABA. Grupos de 4-20 personas. Score PULSO básico. WhatsApp como canal de alertas.',en:'Digital circles in Buenos Aires. Groups of 4-20 people. Basic PULSO score. WhatsApp as alert channel.',c:'#22c55e',activo:true},
  {fase:'Fase 2',año:'Q2 2027',es:'Expansión a Buenos Aires completa. Integración con billeteras digitales (Mercado Pago, Naranja X). Score PULSO avanzado.',en:'Expansion to full Buenos Aires. Integration with digital wallets (Mercado Pago, Naranja X). Advanced PULSO score.',c:'#3b82f6',activo:false},
  {fase:'Fase 3',año:'Q4 2027',es:'Corredor AR MX CO. Roscas transfronterizas. PULSO portable entre países. Primer crédito formal verificado.',en:'AR MX CO corridor. Cross-border circles. Portable PULSO across countries. First verified formal credit.',c:'#f59e0b',activo:false},
  {fase:'Fase 4',año:'2028',es:'Corredor completo AR MX CO BR CH DO. PULSO en blockchain. Smart contracts para roscas. Tokenización del historial crediticio.',en:'Full AR MX CO BR CH DO corridor. PULSO on blockchain. Smart contracts for circles. Credit history tokenization.',c:'#a855f7',activo:false},
]

export default function Quincena() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [dark, setDark] = useState(true)
  const [simMiembros, setSimMiembros] = useState(10)
  const [simAporte, setSimAporte] = useState(100)
  const [simTurno, setSimTurno] = useState(5)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const t = T[lang]
  const bg = dark?'#0a0e1a':'#f0f4f8'
  const text = dark?'#f1f5f9':'#0a0e1a'
  const card = dark?'#111827':'#ffffff'
  const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
  const sub = dark?'#94a3b8':'#475569'

  const totalRecibe = simMiembros * simAporte
  const mesRecibe = simTurno

  async function enviar() {
    if(!nombre||!email) return
    setEnviando(true)
    await supabase.from('leads_quincena').insert({nombre, email, ciudad, status:'nuevo'})
    setEnviado(true)
    setEnviando(false)
  }

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.2s'}}>

      {/* Nav */}
      <nav style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#3b82f6,#06b6d4)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>Q</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,color:text}}>Quincena</div>
            <div style={{fontSize:9,color:'#3b82f6',textTransform:'uppercase'}}>Protocolo PULSO · Circulab Tech</div>
          </div>
        </div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <button onClick={()=>setLang(lang==='es'?'en':'es')}
            style={{background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:6,padding:'4px 10px',color:'#3b82f6',fontSize:11,fontWeight:700,cursor:'pointer'}}>
            {lang==='es'?'EN':'ES'}
          </button>
          <button onClick={()=>setDark(!dark)}
            style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
            {dark?'☀️':'🌙'}
          </button>
          <a href="/" style={{fontSize:11,color:sub,textDecoration:'none'}}>{t.volver}</a>
        </div>
      </nav>

      <div style={{maxWidth:580,margin:'0 auto',padding:'32px 20px 60px'}}>

        {/* Hero */}
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:20,padding:'5px 14px',fontSize:10,color:'#3b82f6',fontWeight:700,marginBottom:16}}>
            {t.badge}
          </div>
          <h1 style={{fontSize:30,fontWeight:900,lineHeight:1.15,marginBottom:12}}>
            <span style={{color:text}}>{t.titulo}</span>
            <br/>
            <span style={{color:'#3b82f6'}}>{t.titulo2}</span>
          </h1>
          <p style={{fontSize:13,color:sub,lineHeight:1.7}}>{t.subtitulo}</p>
        </div>

        {/* ¿Qué es una rosca? */}
        <div style={{background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'16px',marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:700,color:'#3b82f6',marginBottom:8}}>{t.rosca_titulo}</div>
          <div style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:12}}>{t.rosca_desc}</div>
          <div style={{fontSize:11,color:'#3b82f6',fontWeight:600,textAlign:'center',background:'rgba(59,130,246,0.08)',borderRadius:8,padding:'8px'}}>
            {t.rosca_paises}
          </div>
        </div>

        {/* Cómo funciona */}
        <div style={{fontSize:14,fontWeight:700,color:text,marginBottom:12}}>{t.como_titulo}</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
          {PASOS.map(p=>(
            <div key={p.num} style={{display:'flex',gap:12,padding:'14px',background:card,borderRadius:12,border:`1px solid ${p.c}22`,alignItems:'flex-start'}}>
              <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${p.c},${p.c}99)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white',flexShrink:0}}>{p.num}</div>
              <div style={{fontSize:20,flexShrink:0,marginTop:4}}>{p.icon}</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:p.c,marginBottom:4}}>{lang==='es'?p.es.t:p.en.t}</div>
                <div style={{fontSize:11,color:sub,lineHeight:1.6}}>{lang==='es'?p.es.d:p.en.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Score PULSO */}
        <div style={{background:card,border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px',marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:700,color:'#f59e0b',marginBottom:8}}>{t.pulso_titulo}</div>
          <div style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:14}}>{t.pulso_desc}</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {TIERS.map(tier=>(
              <div key={tier.nivel} style={{display:'flex',gap:10,padding:'10px 12px',borderRadius:10,background:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.02)',border:`1px solid ${tier.c}33`,alignItems:'center'}}>
                <div style={{width:28,height:28,borderRadius:8,background:tier.c,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'white',flexShrink:0}}>P</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:tier.c}}>{tier.nivel}</div>
                  <div style={{fontSize:10,color:sub}}>{lang==='es'?tier.desc_es:tier.desc_en}</div>
                </div>
                <div style={{fontSize:10,color:tier.c,fontWeight:700,flexShrink:0}}>{tier.puntos}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Simulador */}
        <div style={{background:card,border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'16px',marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:700,color:'#3b82f6',marginBottom:4}}>{t.sim_titulo}</div>
          <div style={{fontSize:11,color:sub,marginBottom:16}}>{t.sim_nota}</div>

          <div style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:sub,marginBottom:6}}>
              <span>{t.sim_miembros}</span>
              <span style={{color:'#3b82f6',fontWeight:700}}>{simMiembros} {lang==='es'?'personas':'people'}</span>
            </div>
            <input type="range" min={4} max={20} step={1} value={simMiembros} onChange={e=>{setSimMiembros(Number(e.target.value));setSimTurno(Math.min(simTurno,Number(e.target.value)))}}
              style={{width:'100%',accentColor:'#3b82f6'}} />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:sub,marginTop:2}}>
              <span>4</span><span>20</span>
            </div>
          </div>

          <div style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:sub,marginBottom:6}}>
              <span>{t.sim_aporte}</span>
              <span style={{color:'#3b82f6',fontWeight:700}}>USD {simAporte}</span>
            </div>
            <input type="range" min={10} max={1000} step={10} value={simAporte} onChange={e=>setSimAporte(Number(e.target.value))}
              style={{width:'100%',accentColor:'#3b82f6'}} />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:sub,marginTop:2}}>
              <span>USD 10</span><span>USD 1.000</span>
            </div>
          </div>

          <div style={{marginBottom:16}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:sub,marginBottom:6}}>
              <span>{lang==='es'?'Tu turno en el grupo':'Your turn in the group'}</span>
              <span style={{color:'#3b82f6',fontWeight:700}}>{lang==='es'?`Turno ${simTurno}`:`Turn ${simTurno}`}</span>
            </div>
            <input type="range" min={1} max={simMiembros} step={1} value={simTurno} onChange={e=>setSimTurno(Number(e.target.value))}
              style={{width:'100%',accentColor:'#3b82f6'}} />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:sub,marginTop:2}}>
              <span>{lang==='es'?'Turno 1 (primero)':'Turn 1 (first)'}</span>
              <span>{lang==='es'?`Turno ${simMiembros} (último)`:`Turn ${simMiembros} (last)`}</span>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div style={{background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:12,padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:10,color:sub,marginBottom:4}}>{t.sim_resultado}</div>
              <div style={{fontSize:20,fontWeight:900,color:'#3b82f6'}}>{lang==='es'?`Mes ${mesRecibe}`:`Month ${mesRecibe}`}</div>
              <div style={{fontSize:9,color:sub,marginTop:2}}>{lang==='es'?`${mesRecibe} aportes antes`:`${mesRecibe} contributions before`}</div>
            </div>
            <div style={{background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:10,color:sub,marginBottom:4}}>{t.sim_total}</div>
              <div style={{fontSize:20,fontWeight:900,color:'#22c55e'}}>USD {totalRecibe.toLocaleString()}</div>
              <div style={{fontSize:9,color:sub,marginTop:2}}>{simMiembros} × USD {simAporte}</div>
            </div>
          </div>
        </div>

        {/* Corredor LATAM */}
        <div style={{background:card,border:'1px solid rgba(59,130,246,0.15)',borderRadius:14,padding:'16px',marginBottom:24}}>
          <div style={{fontSize:14,fontWeight:700,color:'#3b82f6',marginBottom:8}}>{t.corredor_titulo}</div>
          <div style={{fontSize:12,color:sub,lineHeight:1.7,marginBottom:12}}>{t.corredor_desc}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
            {[
              {flag:'🇦🇷',pais:'Argentina',nombre:lang==='es'?'Rosca':'Rosca'},
              {flag:'🇲🇽',pais:'México',nombre:lang==='es'?'Tanda':'Tanda'},
              {flag:'🇨🇴',pais:'Colombia',nombre:lang==='es'?'Cadena':'Cadena'},
              {flag:'🇧🇷',pais:'Brasil',nombre:lang==='es'?'Consórcio':'Consórcio'},
              {flag:'🇨🇱',pais:'Chile',nombre:lang==='es'?'Junta':'Junta'},
              {flag:'🇩🇴',pais:'Rep. Dominicana',nombre:'San'},
            ].map(p=>(
              <div key={p.pais} style={{textAlign:'center',padding:'10px 6px',background:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.02)',borderRadius:10,border:`1px solid ${border}`}}>
                <div style={{fontSize:22,marginBottom:4}}>{p.flag}</div>
                <div style={{fontSize:10,fontWeight:700,color:text}}>{p.pais}</div>
                <div style={{fontSize:9,color:'#3b82f6'}}>{p.nombre}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Las 4 fases */}
        <div style={{fontSize:14,fontWeight:700,color:text,marginBottom:12}}>{t.fases_titulo}</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
          {FASES.map((f,i)=>(
            <div key={i} style={{display:'flex',gap:12,padding:'12px 14px',background:f.activo?'rgba(34,197,94,0.06)':card,borderRadius:12,border:`1px solid ${f.c}${f.activo?'44':'22'}`,alignItems:'center'}}>
              <div style={{width:30,height:30,borderRadius:'50%',background:f.activo?f.c:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:f.activo?'white':sub,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
                  <div style={{fontSize:10,color:f.c,fontWeight:700}}>{f.fase} · {f.año}</div>
                  {f.activo&&<span style={{fontSize:9,color:'#22c55e',background:'rgba(34,197,94,0.1)',padding:'2px 6px',borderRadius:10,fontWeight:700}}>{lang==='es'?'ACTIVA':'ACTIVE'}</span>}
                </div>
                <div style={{fontSize:11,color:sub}}>{lang==='es'?f.es:f.en}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Conexión con el ecosistema */}
        <div style={{background:'linear-gradient(135deg,rgba(59,130,246,0.06),rgba(34,197,94,0.06))',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'16px',marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:700,color:'#3b82f6',marginBottom:4}}>{t.conexion_titulo}</div>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:10}}>
            {[
              {icon:'🌿',nombre:'OLIVIA Circulab',desc:lang==='es'?'OLV acumulados → mejor perfil crediticio en PULSO':'Accumulated OLV → better credit profile in PULSO',color:'#22c55e'},
              {icon:'👥',nombre:'Protocolo PULSO',desc:lang==='es'?'Aportes en roscas → score crediticio → crédito formal':'Circle contributions → credit score → formal credit',color:'#3b82f6'},
              {icon:'🎵',nombre:'Art of Money',desc:lang==='es'?'Mejor PULSO → mejor tasa en AOM → más capital hoy':'Better PULSO → better rate in AOM → more capital today',color:'#a855f7'},
            ].map(v=>(
              <div key={v.nombre} style={{display:'flex',gap:10,alignItems:'center'}}>
                <span style={{fontSize:20}}>{v.icon}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:v.color}}>{v.nombre}</div>
                  <div style={{fontSize:10,color:sub}}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{background:card,border:'1px solid rgba(59,130,246,0.2)',borderRadius:16,padding:'20px'}}>
          <div style={{fontSize:14,fontWeight:700,color:'#3b82f6',marginBottom:4}}>{t.cta_titulo}</div>
          <div style={{fontSize:11,color:sub,marginBottom:16}}>{t.cta_sub}</div>
          {!enviado?(
            <div>
              {[
                {v:nombre,fn:setNombre,ph:t.nombre,type:'text'},
                {v:email,fn:setEmail,ph:t.email,type:'email'},
                {v:ciudad,fn:setCiudad,ph:t.ciudad,type:'text'},
              ].map((f,i)=>(
                <input key={i} type={f.type} value={f.v} onChange={e=>f.fn(e.target.value)} placeholder={f.ph}
                  style={{width:'100%',padding:'10px 14px',borderRadius:8,background:dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)',border:`1px solid ${border}`,color:text,fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:8}} />
              ))}
              <button onClick={enviar} disabled={enviando||!nombre||!email}
                style={{width:'100%',background:nombre&&email?'linear-gradient(135deg,#3b82f6,#2563eb)':'rgba(255,255,255,0.04)',border:'none',borderRadius:10,padding:'13px',color:nombre&&email?'white':sub,fontSize:14,fontWeight:700,cursor:'pointer'}}>
                {enviando?t.enviando:t.enviar}
              </button>
            </div>
          ):(
            <div style={{textAlign:'center',padding:'20px 0'}}>
              <div style={{fontSize:36,marginBottom:12}}>✅</div>
              <div style={{fontSize:14,fontWeight:700,color:'#3b82f6',marginBottom:8}}>{t.enviado}</div>
              <a href="/" style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)',color:'white',padding:'10px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',display:'inline-block'}}>
                {t.volver}
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
