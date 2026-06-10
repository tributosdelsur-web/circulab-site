'use client'
import { useState } from 'react'

export default function OnePager() {
const [lang, setLang] = useState<'es'|'en'>('es')
const [dark, setDark] = useState(true)

const bg = dark?'#0a0e1a':'#f0f4f8'
const text = dark?'#f1f5f9':'#0a0e1a'
const card = dark?'#111827':'#ffffff'
const border = dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.08)'
const sub = dark?'#94a3b8':'#475569'

const T = {
  es: {
    badge:'Ronda Seed 2026 · Distrito IA Buenos Aires · Ley 27.506',
    tagline:'La primera infraestructura de datos ambientales ciudadanos de América Latina',
    problema_titulo:'El problema',
    solucion_titulo:'La solución',
    producto_titulo:'El producto hoy',
    fases_titulo:'Las 4 fases',
    segmentos_titulo:'8 segmentos de clientes',
    fuentes_titulo:'5 fuentes de valor',
    ronda_titulo:'La ronda',
    equipo_titulo:'El equipo',
    mercado_titulo:'El mercado',
    ventajas_titulo:'Ventajas para invertir',
    cta:'hola@oliviacirculab.com.ar · oliviacirculab.com.ar',
    descargar:'Descargar PDF →',
    ver_pitch:'Ver pitch deck →',
    ver_wp:'Ver whitepaper →',
  },
  en: {
    badge:'Seed Round 2026 · AI District Buenos Aires · Law 27.506',
    tagline:'The first citizen environmental data infrastructure in Latin America',
    problema_titulo:'The Problem',
    solucion_titulo:'The Solution',
    producto_titulo:'The Product Today',
    fases_titulo:'4 Phases',
    segmentos_titulo:'8 Customer Segments',
    fuentes_titulo:'5 Value Sources',
    ronda_titulo:'The Round',
    equipo_titulo:'The Team',
    mercado_titulo:'The Market',
    ventajas_titulo:'Investment Advantages',
    cta:'hola@oliviacirculab.com.ar · oliviacirculab.com.ar',
    descargar:'Download PDF →',
    ver_pitch:'View pitch deck →',
    ver_wp:'View whitepaper →',
  }
}

const t = T[lang]

function imprimir() {
  window.print()
}

return (
  <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',transition:'all 0.2s'}}>

    <div style={{padding:'12px 20px',borderBottom:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'space-between',background:dark?'rgba(8,12,22,0.98)':'rgba(240,244,248,0.98)',backdropFilter:'blur(10px)',position:'sticky',top:0,zIndex:100}} className="no-print">
      <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
        <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
        <div>
          <div style={{fontSize:13,fontWeight:800,color:text}}>OLIVIA Circulab</div>
          <div style={{fontSize:9,color:'#22c55e'}}>One Pager · {lang==='es'?'Junio':'June'} 2026</div>
        </div>
      </a>
      <div style={{display:'flex',gap:6,alignItems:'center'}}>
        <button onClick={()=>setLang(lang==='es'?'en':'es')}
          style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'4px 10px',color:'#22c55e',fontSize:11,fontWeight:700,cursor:'pointer'}}>
          {lang==='es'?'EN':'ES'}
        </button>
        <button onClick={()=>setDark(!dark)}
          style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,borderRadius:6,padding:'4px 8px',fontSize:14,cursor:'pointer'}}>
          {dark?'☀️':'🌙'}
        </button>
        <button onClick={imprimir}
          style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:6,padding:'6px 12px',color:'white',fontSize:11,fontWeight:700,cursor:'pointer'}}>
          {t.descargar}
        </button>
      </div>
    </div>

    <div style={{maxWidth:680,margin:'0 auto',padding:'24px 20px 60px'}}>

      <div style={{textAlign:'center',padding:'32px 0 24px',borderBottom:`1px solid ${border}`,marginBottom:24}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'5px 14px',fontSize:10,color:'#22c55e',fontWeight:700,marginBottom:16}}>
          {t.badge}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:12}}>
          <div style={{width:52,height:52,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:24,color:'white'}}>O</div>
          <div style={{textAlign:'left'}}>
            <div style={{fontSize:24,fontWeight:900,color:text}}>OLIVIA Circulab</div>
            <div style={{fontSize:11,color:'#22c55e'}}>Circulab Tech · Buenos Aires, Argentina</div>
          </div>
        </div>
        <div style={{fontSize:15,color:sub,lineHeight:1.6,maxWidth:500,margin:'0 auto'}}>{t.tagline}</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>

        <div style={{background:card,border:'1px solid rgba(239,68,68,0.2)',borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#ef4444',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.problema_titulo}</div>
          {(lang==='es'?[
            '6.000t de residuos/día solo en CABA',
            '85% va al relleno sin separar',
            'USD 0 capturado en carbono ciudadano',
            'USD 4.5B de mercado LATAM sin tocar',
          ]:[
            '6,000t of waste/day in Buenos Aires alone',
            '85% goes to landfill unsorted',
            'USD 0 captured in citizen carbon',
            'USD 4.5B LATAM market untouched',
          ]).map((i,idx)=>(
            <div key={idx} style={{display:'flex',gap:6,padding:'3px 0',fontSize:11,color:sub}}>
              <span style={{color:'#ef4444',flexShrink:0}}>→</span>{i}
            </div>
          ))}
        </div>

        <div style={{background:card,border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.solucion_titulo}</div>
          {(lang==='es'?[
            'dMRV ciudadano con IA (Cloudflare Workers AI)',
            'Foto + GPS + verificación en tiempo real',
            'Tokens OLV por cada kilo verificado',
            'Certificación multi-metodología por material',
          ]:[
            'Citizen dMRV with AI (Cloudflare Workers AI)',
            'Photo + GPS + real-time verification',
            'OLV tokens per verified kilo',
            'Multi-methodology certification per material',
          ]).map((i,idx)=>(
            <div key={idx} style={{display:'flex',gap:6,padding:'3px 0',fontSize:11,color:sub}}>
              <span style={{color:'#22c55e',flexShrink:0}}>✓</span>{i}
            </div>
          ))}
        </div>
      </div>

      <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#3b82f6',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.producto_titulo}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          {(lang==='es'?[
            '✅ App web en producción · oliviacirculab.com.ar',
            '✅ Verificación IA con Cloudflare Workers AI',
            '✅ Dashboard OLV + CO2eq + ruta de pagos',
            '✅ Red social OLIVIA con comunidad activa',
            '✅ Sistema de amigos y seguimiento',
            '✅ Admin con dMRV y validación manual',
            '✅ Simulador de ahorro para consorcios',
            '✅ Construido con USD 0 de inversión',
          ]:[
            '✅ Web app in production · oliviacirculab.com.ar',
            '✅ AI verification with Cloudflare Workers AI',
            '✅ OLV + CO2eq + payment path dashboard',
            '✅ OLIVIA social network with active community',
            '✅ Friends and following system',
            '✅ Admin with dMRV and manual validation',
            '✅ Building savings calculator',
            '✅ Built with USD 0 investment',
          ]).map((i,idx)=>(
            <div key={idx} style={{fontSize:11,color:sub}}>{i}</div>
          ))}
        </div>
      </div>

      <div style={{background:card,border:'1px solid rgba(34,197,94,0.15)',borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>
          {lang==='es'?'Arquitectura multi-metodología':'Multi-methodology Architecture'}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          {[
            {icon:'🌿',tipo:lang==='es'?'Orgánico':'Organic',cert:'Verra VM0036',olv:'180 OLV/kg',c:'#22c55e'},
            {icon:'♻️',tipo:lang==='es'?'Plástico':'Plastic',cert:'Gold Standard',olv:'150 OLV/kg',c:'#3b82f6'},
            {icon:'🔩',tipo:lang==='es'?'Metal':'Metal',cert:'CAR',olv:'800 OLV/kg',c:'#ef4444'},
            {icon:'👕',tipo:lang==='es'?'Textil':'Textile',cert:'GS Textile',olv:'550 OLV/kg',c:'#ec4899'},
            {icon:'🛢️',tipo:lang==='es'?'Aceite':'Oil',cert:'Verra AMS',olv:'250 OLV/kg',c:'#f97316'},
            {icon:'📄',tipo:lang==='es'?'Papel':'Paper',cert:'Gold Standard',olv:'90 OLV/kg',c:'#f59e0b'},
          ].map(r=>(
            <div key={r.tipo} style={{display:'flex',gap:6,alignItems:'center',padding:'4px 6px',borderRadius:6,background:dark?'rgba(255,255,255,0.02)':'rgba(0,0,0,0.02)'}}>
              <span style={{fontSize:14}}>{r.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:10,fontWeight:700,color:r.c}}>{r.tipo}</div>
                <div style={{fontSize:9,color:sub}}>{r.cert}</div>
              </div>
              <div style={{fontSize:10,fontWeight:700,color:r.c}}>{r.olv}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.fases_titulo}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {(lang==='es'?[
            {fase:'Fase 1 · 2026 · ACTIVA',desc:'Piloto dMRV · OLV · Comunidad',c:'#22c55e'},
            {fase:'Fase 2 · Q4 2026',desc:'OLV canjeables · Convenios partner',c:'#3b82f6'},
            {fase:'Fase 3 · 2027 💰',desc:'Certificación Verra · USD 22/t · Primer pago',c:'#f59e0b'},
            {fase:'Fase 4 · 2028',desc:'Art. 6.4 París · USD 90/t · LATAM',c:'#a855f7'},
          ]:[
            {fase:'Phase 1 · 2026 · ACTIVE',desc:'dMRV pilot · OLV · Community',c:'#22c55e'},
            {fase:'Phase 2 · Q4 2026',desc:'OLV redeemable · Partner deals',c:'#3b82f6'},
            {fase:'Phase 3 · 2027 💰',desc:'Verra certification · USD 22/t · First payment',c:'#f59e0b'},
            {fase:'Phase 4 · 2028',desc:'Art. 6.4 Paris · USD 90/t · LATAM',c:'#a855f7'},
          ]).map(f=>(
            <div key={f.fase} style={{borderLeft:`3px solid ${f.c}`,paddingLeft:8}}>
              <div style={{fontSize:10,fontWeight:700,color:f.c}}>{f.fase}</div>
              <div style={{fontSize:10,color:sub}}>{f.desc}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:10,fontSize:10,color:'#22c55e',fontWeight:600}}>
          {lang==='es'?'→ Los que empiezan hoy cobran desde el día 1 de Fase 3':'→ Those who start today earn from Phase 3 day 1'}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
        <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#a855f7',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.segmentos_titulo}</div>
          {(lang==='es'?[
            {n:'01',t:'Ciudadano',f:'OLV'},
            {n:'02',t:'Verdulería',f:'OLV'},
            {n:'03',t:'Colegio',f:'OLV'},
            {n:'04',t:'Consorcio',f:'SaaS'},
            {n:'05',t:'Restaurant',f:'SaaS'},
            {n:'06',t:'Comedor',f:'SaaS'},
            {n:'07',t:'Empresa RSE',f:'Proyecto'},
            {n:'08',t:'Municipio',f:'Contrato'},
          ]:[
            {n:'01',t:'Citizen',f:'OLV'},
            {n:'02',t:'Market',f:'OLV'},
            {n:'03',t:'School',f:'OLV'},
            {n:'04',t:'Building',f:'SaaS'},
            {n:'05',t:'Restaurant',f:'SaaS'},
            {n:'06',t:'Canteen',f:'SaaS'},
            {n:'07',t:'CSR Company',f:'Project'},
            {n:'08',t:'Municipality',f:'Contract'},
          ]).map(c=>(
            <div key={c.n} style={{display:'flex',justifyContent:'space-between',padding:'2px 0',fontSize:10,borderBottom:`1px solid ${border}`}}>
              <span style={{color:sub}}>{c.n} {c.t}</span>
              <span style={{color:'#a855f7',fontWeight:600}}>{c.f}</span>
            </div>
          ))}
        </div>

        <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.fuentes_titulo}</div>
          <div style={{fontSize:9,color:sub,marginBottom:8}}>{lang==='es'?'~100 deptos · Aprox.':'~100 units · Approx.'}</div>
          {(lang==='es'?[
            {l:'Créditos carbono',v:'USD 85/mes'},
            {l:'Ahorro recolección',v:'USD 800/mes'},
            {l:'Venta materiales',v:'USD 120/mes'},
            {l:'Abono orgánico',v:'USD 45/mes'},
            {l:'Cert. RSE/ESG',v:'USD 75/mes'},
          ]:[
            {l:'Carbon credits',v:'USD 85/mo'},
            {l:'Collection savings',v:'USD 800/mo'},
            {l:'Material sales',v:'USD 120/mo'},
            {l:'Organic compost',v:'USD 45/mo'},
            {l:'CSR/ESG cert.',v:'USD 75/mo'},
          ]).map(f=>(
            <div key={f.l} style={{display:'flex',justifyContent:'space-between',padding:'3px 0',fontSize:10,borderBottom:`1px solid ${border}`}}>
              <span style={{color:sub}}>{f.l}</span>
              <span style={{color:'#22c55e',fontWeight:700}}>{f.v}</span>
            </div>
          ))}
          <div style={{marginTop:8,display:'flex',justifyContent:'space-between',fontSize:12,fontWeight:900}}>
            <span style={{color:text}}>Total</span>
            <span style={{color:'#22c55e'}}>USD 1.125/{lang==='es'?'mes':'mo'}</span>
          </div>
          <div style={{fontSize:9,color:sub,marginTop:2}}>{lang==='es'?'Estimación orientativa':'Indicative estimate'}</div>
        </div>
      </div>

      <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#3b82f6',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.mercado_titulo}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
          {[
            {sigla:'TAM',v:'USD 4.5B',desc:lang==='es'?'Carbono LATAM total':'Total LATAM carbon',c:'#22c55e'},
            {sigla:'SAM',v:'USD 380M',desc:lang==='es'?'Residuos certificables AR+MX+CO':'Certifiable waste AR+MX+CO',c:'#3b82f6'},
            {sigla:'SOM',v:'USD 1.2M',desc:lang==='es'?'CABA · año 1 · 300 consorcios':'Buenos Aires · year 1 · 300 buildings',c:'#f59e0b'},
          ].map(m=>(
            <div key={m.sigla} style={{textAlign:'center',padding:'10px',background:dark?'rgba(255,255,255,0.03)':'rgba(0,0,0,0.03)',borderRadius:8}}>
              <div style={{fontSize:14,fontWeight:900,color:m.c}}>{m.sigla}</div>
              <div style={{fontSize:13,fontWeight:800,color:m.c}}>{m.v}</div>
              <div style={{fontSize:9,color:sub,marginTop:2}}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.equipo_titulo}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[
            {foto:'/founders/founder-jp.jpg',n:'Juan Pablo Sanguinetti de Zapata',rol:lang==='es'?'CEO & Founder':'CEO & Founder',d:lang==='es'?'Abogado y director de teatro chileno. Product builder con IA. Medio ambiente, tributación y gestión de proyectos.':'Chilean lawyer and theater director. AI product builder. Environmental law, taxation and project management.',c:'#22c55e'},
            {foto:'/founders/founder-mileidy.jpg',n:'Mileidy Zapata de Sanguinetti',rol:lang==='es'?'COO & Co-founder':'COO & Co-founder',d:lang==='es'?'Bailarina y coreógrafa dominicana. Comunidad y economía del cuidado. 3 países, 1 misión.':'Dominican dancer and choreographer. Community and care economy. 3 countries, 1 mission.',c:'#3b82f6'},
          ].map(f=>(
            <div key={f.n} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
              <img src={f.foto} alt={f.n} style={{width:40,height:40,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:`2px solid ${f.c}`}} />
              <div>
                <div style={{fontSize:11,fontWeight:700,color:text}}>{f.n}</div>
                <div style={{fontSize:9,color:f.c,fontWeight:600}}>{f.rol}</div>
                <div style={{fontSize:9,color:sub,lineHeight:1.4,marginTop:2}}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:10,fontSize:10,color:'#22c55e',fontWeight:600,textAlign:'center'}}>
          🚀 {lang==='es'?'Construido con USD 0 · Distrito IA Buenos Aires · Ley Economía del Conocimiento 27.506':'Built with USD 0 · AI District Buenos Aires · Knowledge Economy Law 27.506'}
        </div>
      </div>

      <div style={{background:'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(59,130,246,0.06))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'14px',marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:'#f59e0b',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.ronda_titulo}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
          <div style={{textAlign:'center',padding:'12px',background:'rgba(34,197,94,0.08)',borderRadius:8}}>
            <div style={{fontSize:10,color:sub,marginBottom:2}}>{lang==='es'?'Opción A':'Option A'}</div>
            <div style={{fontSize:22,fontWeight:900,color:'#22c55e'}}>USD 500K</div>
            <div style={{fontSize:10,color:sub}}>10% equity · USD 4.5M pre</div>
          </div>
          <div style={{textAlign:'center',padding:'12px',background:'rgba(59,130,246,0.08)',borderRadius:8}}>
            <div style={{fontSize:10,color:sub,marginBottom:2}}>{lang==='es'?'Opción B':'Option B'}</div>
            <div style={{fontSize:22,fontWeight:900,color:'#3b82f6'}}>USD 2M</div>
            <div style={{fontSize:10,color:sub}}>15% equity · USD 11.3M pre</div>
          </div>
        </div>
        <div style={{fontSize:10,color:sub,lineHeight:1.6,textAlign:'center'}}>
          {lang==='es'
            ?'Sin costos fijos hasta inversión comprometida · Equity directo · Sin ratchets · Sin intereses · Liquidation preference 1× estándar'
            :'No fixed costs until investment committed · Direct equity · No ratchets · No interest · Standard 1× liquidation preference'
          }
        </div>
      </div>

      <div style={{background:card,border:'1px solid rgba(34,197,94,0.15)',borderRadius:12,padding:'14px',marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:700,color:'#22c55e',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t.ventajas_titulo}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
          {(lang==='es'?[
            {icon:'🤖',t:'Distrito IA Buenos Aires',d:'El primer ecosistema de IA de LATAM'},
            {icon:'📋',t:'Ley 27.506',d:'Ganancias al 15% · FONDCE · Estabilidad 10 años'},
            {icon:'🚀',t:'Primer movedor',d:'Sin competencia directa en dMRV ciudadano LATAM'},
            {icon:'✅',t:'Producto activo',d:'En producción con USD 0 de inversión externa'},
          ]:[
            {icon:'🤖',t:'AI District Buenos Aires',d:'First AI ecosystem in LATAM'},
            {icon:'📋',t:'Law 27.506',d:'15% income tax · FONDCE · 10-year stability'},
            {icon:'🚀',t:'First mover',d:'No direct competition in citizen dMRV LATAM'},
            {icon:'✅',t:'Active product',d:'In production with USD 0 external investment'},
          ]).map(v=>(
            <div key={v.t} style={{display:'flex',gap:6,alignItems:'flex-start'}}>
              <span style={{fontSize:16,flexShrink:0}}>{v.icon}</span>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:'#22c55e'}}>{v.t}</div>
                <div style={{fontSize:9,color:sub}}>{v.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:'center',padding:'20px',background:'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(59,130,246,0.06))',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14}}>
        <div style={{width:48,height:48,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:22,color:'white',margin:'0 auto 12px'}}>O</div>
        <div style={{fontSize:16,fontWeight:900,color:text,marginBottom:4}}>OLIVIA Circulab</div>
        <div style={{fontSize:11,color:sub,marginBottom:16}}>{t.tagline}</div>
        <div style={{fontSize:13,fontWeight:700,color:'#22c55e',marginBottom:16}}>{t.cta}</div>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/pitch" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'10px 20px',borderRadius:10,fontSize:12,fontWeight:700,textDecoration:'none'}}>
            {t.ver_pitch}
          </a>
          <a href="/whitepaper" style={{background:dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',border:`1px solid ${border}`,color:text,padding:'10px 20px',borderRadius:10,fontSize:12,fontWeight:600,textDecoration:'none'}}>
            {t.ver_wp}
          </a>
        </div>
      </div>

    </div>

    <style>{`
      @media print {
        .no-print { display: none !important; }
        body { background: white !important; color: black !important; }
      }
    `}</style>

  </div>
)
}
