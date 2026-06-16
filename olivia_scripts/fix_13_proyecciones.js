// SCRIPT 13 — Proyecciones financieras ROI en whitepaper
// Sección completa con break-even, ROI, IRR y nota de transparencia
const fs = require('fs');

let wp = fs.readFileSync('app/whitepaper/page.tsx', 'utf8');

if (!wp.includes('Break-even') && !wp.includes('break_even') && !wp.includes('IRR')) {

  const seccionProyecciones = `
if(seccion===18) return (
  <div>
    <div style={s.titulo}>{lang==='es'?'Proyecciones financieras':'Financial projections'}</div>

    {/* Nota de transparencia - CRITICA */}
    <div style={{...s.highlight,border:'1px solid rgba(239,68,68,0.2)',background:'rgba(239,68,68,0.04)',marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,color:'#ef4444',marginBottom:6}}>
        {lang==='es'?'Nota de transparencia · Lectura obligatoria':'Transparency note · Required reading'}
      </div>
      <div style={s.p}>
        {lang==='es'
          ? 'Las proyecciones presentadas en esta seccion son estimaciones basadas en el modelo de negocio actual, la traccion inicial y las condiciones del mercado de carbono a junio 2026. Los valores reales dependen de: (a) la escala de usuarios y consorcios alcanzada, (b) las certificaciones obtenidas de Verra VCS y otros organismos, (c) los precios del mercado voluntario de carbono al momento de la certificacion, y (d) las condiciones macroeconomicas de LATAM. Circulab Tech no garantiza estos retornos. Las proyecciones se presentan como escenario base conservador para ilustrar el potencial del modelo, no como promesa de retorno.'
          : 'The projections in this section are estimates based on the current business model, initial traction, and carbon market conditions as of June 2026. Actual values depend on: (a) the scale of users and buildings reached, (b) certifications obtained from Verra VCS and other bodies, (c) voluntary carbon market prices at time of certification, and (d) LATAM macroeconomic conditions. Circulab Tech does not guarantee these returns. Projections are presented as a conservative base scenario to illustrate model potential, not as a return promise.'}
      </div>
    </div>

    {/* Break-even operativo */}
    <div style={{...s.card,borderLeft:'3px solid #22c55e',marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:'#22c55e',marginBottom:10}}>
        {lang==='es'?'Break-even operativo · Mayo 2027':'Operational break-even · May 2027'}
      </div>
      <div style={s.p}>
        {lang==='es'
          ? 'Con los costos fijos post-inversion estimados en USD 10.500/mes, el MRR de OLIVIA supera ese umbral en mayo 2027 (11 meses despues de cerrar la ronda Seed). A partir de ese momento la operacion es autosustentable sin necesidad de nueva inyeccion de capital. Todo lo que genere Verra desde julio 2027 es utilidad neta sobre costos ya cubiertos por el SaaS.'
          : 'With post-investment fixed costs estimated at USD 10,500/month, OLIVIA MRR surpasses that threshold in May 2027 (11 months after closing the Seed round). From that point operations are self-sustaining without new capital injection. Everything Verra generates from July 2027 is net profit on costs already covered by SaaS.'}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:12}}>
        {[
          {mes:lang==='es'?'Cierre ronda':'Round close',mrr:'USD 0',c:'#64748b'},
          {mes:lang==='es'?'Mes 3':'Month 3',mrr:'USD 2.000',c:'#3b82f6'},
          {mes:lang==='es'?'Mes 6':'Month 6',mrr:'USD 6.000',c:'#f59e0b'},
          {mes:lang==='es'?'Mes 11 ✅':'Month 11 ✅',mrr:'USD 11.000',c:'#22c55e'},
        ].map((item,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + item.c + '33',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:item.c,fontWeight:700,marginBottom:4}}>{item.mes}</div>
            <div style={{fontSize:13,fontWeight:900,color:item.c}}>{item.mrr}</div>
            <div style={{fontSize:8,color:'#64748b',marginTop:2}}>MRR</div>
          </div>
        ))}
      </div>
    </div>

    {/* Ronda Seed USD 500K */}
    <div style={{...s.card,borderLeft:'3px solid #22c55e',marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:900,color:'#22c55e',marginBottom:12}}>
        {lang==='es'?'Ronda Seed · USD 500K · 10% equity':'Seed Round · USD 500K · 10% equity'}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
        {(lang==='es'?[
          {anio:'2026 (inicio)',arr:'USD 24.000',val:'USD 144.000',part:'USD 14.400',roi:'Pre-revenue',c:'#64748b'},
          {anio:'2027 (Verra)',arr:'USD 176.750',val:'USD 1.060.000',part:'USD 106.000',roi:'0.2x',c:'#3b82f6'},
          {anio:'2028 (escala)',arr:'USD 1.230.000',val:'USD 7.380.000',part:'USD 738.000',roi:'1.5x ✅',c:'#f59e0b'},
          {anio:'2029 (LATAM)',arr:'USD 4.000.000',val:'USD 24.000.000',part:'USD 2.400.000',roi:'4.8x ✅✅',c:'#22c55e'},
          {anio:'2030 (emisores)',arr:'USD 10.000.000',val:'USD 60.000.000',part:'USD 6.000.000',roi:'12x ✅✅✅',c:'#22c55e'},
        ]:[
          {anio:'2026 (start)',arr:'USD 24,000',val:'USD 144,000',part:'USD 14,400',roi:'Pre-revenue',c:'#64748b'},
          {anio:'2027 (Verra)',arr:'USD 176,750',val:'USD 1,060,000',part:'USD 106,000',roi:'0.2x',c:'#3b82f6'},
          {anio:'2028 (scale)',arr:'USD 1,230,000',val:'USD 7,380,000',part:'USD 738,000',roi:'1.5x',c:'#f59e0b'},
          {anio:'2029 (LATAM)',arr:'USD 4,000,000',val:'USD 24,000,000',part:'USD 2,400,000',roi:'4.8x',c:'#22c55e'},
          {anio:'2030 (emitters)',arr:'USD 10,000,000',val:'USD 60,000,000',part:'USD 6,000,000',roi:'12x',c:'#22c55e'},
        ]).map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'1.5fr 1.5fr 1.5fr 1fr 1fr',gap:6,padding:'8px 10px',background:'rgba(255,255,255,0.02)',borderRadius:8,border:'1px solid rgba(255,255,255,0.04)'}}>
            <div style={{fontSize:10,fontWeight:700,color:row.c}}>{row.anio}</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>{row.arr}</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>{row.val}</div>
            <div style={{fontSize:10,color:row.c,fontWeight:700}}>{row.part}</div>
            <div style={{fontSize:10,color:row.c,fontWeight:900}}>{row.roi}</div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1.5fr 1.5fr 1fr 1fr',gap:6,padding:'0 10px'}}>
          {(lang==='es'?['Año','ARR','Valoracion 6x','10% inversor','ROI']:['Year','ARR','6x Valuation','10% investor','ROI']).map((h,i)=>(
            <div key={i} style={{fontSize:8,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
        {[
          {label:lang==='es'?'Break-even operativo':'Operational break-even',valor:'Mayo 2027',sub:lang==='es'?'11 meses post-cierre':'11 months post-close',c:'#22c55e'},
          {label:lang==='es'?'ROI equilibrio inversor':'Investor breakeven ROI',valor:'Fin 2028',sub:lang==='es'?'USD 738K sobre USD 500K':'USD 738K on USD 500K',c:'#f59e0b'},
          {label:'IRR ' + (lang==='es'?'ano 3':'year 3'),valor:'~70% anual',sub:lang==='es'?'Con Ley 27.506: ~95%':'With Law 27.506: ~95%',c:'#a855f7'},
        ].map((item,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + item.c + '22',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:'#64748b',marginBottom:4}}>{item.label}</div>
            <div style={{fontSize:12,fontWeight:900,color:item.c,marginBottom:2}}>{item.valor}</div>
            <div style={{fontSize:9,color:'#64748b'}}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Ronda Serie A USD 2M */}
    <div style={{...s.card,borderLeft:'3px solid #3b82f6',marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:900,color:'#3b82f6',marginBottom:4}}>
        {lang==='es'?'Ronda Serie A · USD 2M · ~17% equity':'Series A Round · USD 2M · ~17% equity'}
      </div>
      <div style={{fontSize:10,color:'#64748b',marginBottom:12}}>
        {lang==='es'
          ? 'Estimada para Q4 2027 post-certificacion Verra. Valoracion pre-money: USD 10M.'
          : 'Estimated for Q4 2027 post-Verra certification. Pre-money valuation: USD 10M.'}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
        {(lang==='es'?[
          {anio:'2028 (ano 1)',arr:'USD 1.230.000',val:'USD 7.380.000',part:'USD 1.254.600',roi:'0.6x',c:'#3b82f6'},
          {anio:'2029 (ano 2)',arr:'USD 3.800.000',val:'USD 22.800.000',part:'USD 3.876.000',roi:'1.9x ✅',c:'#f59e0b'},
          {anio:'2030 (ano 3)',arr:'USD 10.200.000',val:'USD 61.200.000',part:'USD 10.404.000',roi:'5.2x ✅✅',c:'#22c55e'},
          {anio:'2032 (ano 5)',arr:'USD 50.000.000',val:'USD 300.000.000',part:'USD 51.000.000',roi:'25.5x ✅✅✅',c:'#22c55e'},
        ]:[
          {anio:'2028 (year 1)',arr:'USD 1,230,000',val:'USD 7,380,000',part:'USD 1,254,600',roi:'0.6x',c:'#3b82f6'},
          {anio:'2029 (year 2)',arr:'USD 3,800,000',val:'USD 22,800,000',part:'USD 3,876,000',roi:'1.9x',c:'#f59e0b'},
          {anio:'2030 (year 3)',arr:'USD 10,200,000',val:'USD 61,200,000',part:'USD 10,404,000',roi:'5.2x',c:'#22c55e'},
          {anio:'2032 (year 5)',arr:'USD 50,000,000',val:'USD 300,000,000',part:'USD 51,000,000',roi:'25.5x',c:'#22c55e'},
        ]).map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'1.5fr 1.5fr 1.5fr 1fr 1fr',gap:6,padding:'8px 10px',background:'rgba(255,255,255,0.02)',borderRadius:8,border:'1px solid rgba(255,255,255,0.04)'}}>
            <div style={{fontSize:10,fontWeight:700,color:row.c}}>{row.anio}</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>{row.arr}</div>
            <div style={{fontSize:10,color:'#94a3b8'}}>{row.val}</div>
            <div style={{fontSize:10,color:row.c,fontWeight:700}}>{row.part}</div>
            <div style={{fontSize:10,color:row.c,fontWeight:900}}>{row.roi}</div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1.5fr 1.5fr 1fr 1fr',gap:6,padding:'0 10px'}}>
          {(lang==='es'?['Año','ARR','Valoracion 6x','17% inversor','ROI']:['Year','ARR','6x Valuation','17% investor','ROI']).map((h,i)=>(
            <div key={i} style={{fontSize:8,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginTop:8}}>
        {[
          {label:lang==='es'?'Break-even operativo':'Operational break-even',valor:lang==='es'?'Ya alcanzado':'Already reached',sub:lang==='es'?'Antes de la Serie A':'Before Series A',c:'#22c55e'},
          {label:lang==='es'?'ROI equilibrio inversor':'Investor breakeven ROI',valor:lang==='es'?'Fin 2029':'End 2029',sub:lang==='es'?'USD 3.9M sobre USD 2M':'USD 3.9M on USD 2M',c:'#f59e0b'},
          {label:'IRR ' + (lang==='es'?'ano 3':'year 3'),valor:'~80% anual',sub:lang==='es'?'Escenario base conservador':'Conservative base scenario',c:'#a855f7'},
        ].map((item,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + item.c + '22',borderRadius:8,padding:'10px',textAlign:'center'}}>
            <div style={{fontSize:9,color:'#64748b',marginBottom:4}}>{item.label}</div>
            <div style={{fontSize:12,fontWeight:900,color:item.c,marginBottom:2}}>{item.valor}</div>
            <div style={{fontSize:9,color:'#64748b'}}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Tabla comparativa */}
    <div style={{...s.card,borderLeft:'3px solid #a855f7'}}>
      <div style={{fontSize:12,fontWeight:700,color:'#a855f7',marginBottom:12}}>
        {lang==='es'?'Comparativa Seed vs Serie A':'Seed vs Series A comparison'}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:8}}>
        {(lang==='es'?[
          ['','Seed USD 500K','Serie A USD 2M'],
          ['Momento','Hoy 2026','Post-Verra 2027'],
          ['Riesgo','Alto','Medio-bajo'],
          ['Break-even op.','Mayo 2027','Ya alcanzado'],
          ['Equity','10%','~17%'],
          ['Valor empresa ano 3','USD 24M','USD 61M'],
          ['Participacion ano 3','USD 2.4M','USD 10.4M'],
          ['ROI ano 3','4.8x','5.2x'],
          ['IRR ano 3','~70%','~80%'],
          ['Con Ley 27.506','~95% IRR','N/A si externo'],
        ]:[
          ['','Seed USD 500K','Series A USD 2M'],
          ['Timing','Today 2026','Post-Verra 2027'],
          ['Risk','High','Medium-low'],
          ['Op. break-even','May 2027','Already reached'],
          ['Equity','10%','~17%'],
          ['Company value yr 3','USD 24M','USD 61M'],
          ['Investor stake yr 3','USD 2.4M','USD 10.4M'],
          ['ROI year 3','4.8x','5.2x'],
          ['IRR year 3','~70%','~80%'],
          ['With Law 27.506','~95% IRR','N/A if external'],
        ]).map((row,i)=>(
          row[0]===''
            ? row.slice(1).map((h,j)=>(
                <div key={j} style={{fontSize:9,fontWeight:700,color:'#a855f7',textTransform:'uppercase',letterSpacing:'0.05em',padding:'4px 0'}}>{h}</div>
              ))
            : [
                <div key={0} style={{fontSize:10,color:'#64748b',padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[0]}</div>,
                <div key={1} style={{fontSize:10,color:'#22c55e',fontWeight:600,padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[1]}</div>,
                <div key={2} style={{fontSize:10,color:'#3b82f6',fontWeight:600,padding:'4px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>{row[2]}</div>,
              ]
        ))}
      </div>
      <div style={{marginTop:16,padding:'12px',background:'rgba(168,85,247,0.06)',border:'1px solid rgba(168,85,247,0.15)',borderRadius:10,fontSize:11,color:'#94a3b8',lineHeight:1.7,fontStyle:'italic'}}>
        {lang==='es'
          ? '"El inversor Seed toma mas riesgo y recibe el beneficio de la Ley 27.506 (USD 1 = USD 1.4 efectivos). El inversor Serie A entra con riesgo mucho menor pero sin el multiplicador fiscal. Ambos tienen ROI de 5x en el ano 3 con proyecciones conservadoras."'
          : '"The Seed investor takes more risk and receives the benefit of Law 27.506 (USD 1 = USD 1.4 effective). The Series A investor enters with much lower risk but without the fiscal multiplier. Both have 5x ROI in year 3 with conservative projections."'}
      </div>
    </div>
  </div>
)

`;

  // Insertar antes de la seccion 17 de contratos
  wp = wp.replace(
    'if(seccion===17) return (',
    seccionProyecciones + 'if(seccion===17) return ('
  );

  // Actualizar navegacion
  wp = wp.replace(/seccion<17/g, 'seccion<18');
  wp = wp.replace(/seccion>0&&seccion<17/g, 'seccion>0&&seccion<18');

  fs.writeFileSync('app/whitepaper/page.tsx', wp);
  console.log('OK Whitepaper: proyecciones financieras agregadas como seccion 18');
  console.log('');
  console.log('RESUMEN:');
  console.log('  Break-even operativo: Mayo 2027 (11 meses post-Seed)');
  console.log('  ROI Seed ano 3: 4.8x (6.7x con Ley 27.506)');
  console.log('  ROI Serie A ano 3: 5.2x');
  console.log('  Capital empresa ano 3: USD 24M (Seed) / USD 61M (Serie A)');
  console.log('  Nota de transparencia incluida como primera seccion');
} else {
  console.log('-- Whitepaper: ya tiene proyecciones financieras');
}

console.log('');
console.log('Script 13 completado');
