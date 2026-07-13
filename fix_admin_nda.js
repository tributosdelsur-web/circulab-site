const fs = require('fs');
let c = fs.readFileSync('app/admin/page.tsx', 'utf8');

if (!c.includes('ndaFirmas')) {
  c = c.replace(
    "const [inversoresCRM, setInversoresCRM] = useState<any[]>([])",
    "const [inversoresCRM, setInversoresCRM] = useState<any[]>([])\n  const [ndaFirmas, setNdaFirmas] = useState<any[]>([])"
  );
  c = c.replace(
    "const { data: inv } = await supabase.from('inversores_crm').select('*').order('created_at',{ascending:false})\n      setInversoresCRM(inv||[])",
    "const { data: inv } = await supabase.from('inversores_crm').select('*').order('created_at',{ascending:false})\n      setInversoresCRM(inv||[])\n      const { data: nda } = await supabase.from('nda_firmas').select('*').order('created_at',{ascending:false})\n      setNdaFirmas(nda||[])"
  );
  console.log('OK estado y fetch agregados');
} else {
  console.log('-- ndaFirmas ya existe');
}

c = c.replace(
  "{id:'manual',l:'Manual Operativo',icon:'📖'}",
  "{id:'manual',l:'Manual Operativo',icon:'📖'},\n  {id:'nda',l:`NDA (${ndaFirmas.length})`,icon:'🔒'}"
);

const tabNDA = `
      {tab==='nda'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>🔒 NDA · Firmas registradas</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:8}}>
            <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:10,padding:'12px',textAlign:'center'}}>
              <div style={{fontSize:24,fontWeight:900,color:'#22c55e'}}>{ndaFirmas.length}</div>
              <div style={{fontSize:10,color:'#64748b'}}>Total firmantes</div>
            </div>
            <div style={{background:'#111827',border:'1px solid rgba(59,130,246,0.2)',borderRadius:10,padding:'12px',textAlign:'center'}}>
              <div style={{fontSize:24,fontWeight:900,color:'#3b82f6'}}>{ndaFirmas.filter((n)=>n.lang==='es').length}</div>
              <div style={{fontSize:10,color:'#64748b'}}>En español</div>
            </div>
            <div style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10,padding:'12px',textAlign:'center'}}>
              <div style={{fontSize:24,fontWeight:900,color:'#f59e0b'}}>{ndaFirmas.filter((n)=>n.lang==='en').length}</div>
              <div style={{fontSize:10,color:'#64748b'}}>In English</div>
            </div>
          </div>
          <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:700,color:'#22c55e'}}>Firmantes registrados</div>
              <a href="/nda" target="_blank" style={{fontSize:11,color:'#3b82f6',textDecoration:'none',fontWeight:700}}>Ver página NDA →</a>
            </div>
            {ndaFirmas.length===0&&(
              <div style={{fontSize:11,color:'#64748b',textAlign:'center',padding:'20px 0'}}>
                Sin firmas aún · Compartí el link: oliviacirculab.com.ar/nda
              </div>
            )}
            {ndaFirmas.map((n)=>(
              <div key={n.id} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'12px',marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>{n.nombre}</div>
                    <div style={{fontSize:10,color:'#64748b'}}>{n.empresa}{n.cargo?' · '+n.cargo:''}</div>
                  </div>
                  <div style={{fontSize:9,color:'#64748b',textAlign:'right'}}>
                    <div>{new Date(n.created_at).toLocaleDateString('es-AR')}</div>
                    <div style={{color:'#22c55e',fontWeight:700}}>✓ Firmado</div>
                  </div>
                </div>
                <a href={'mailto:'+n.email+'?subject=Material confidencial OLIVIA Circulab - NDA firmado'} style={{fontSize:10,color:'#3b82f6',textDecoration:'none'}}>{n.email}</a>
              </div>
            ))}
          </div>
        </div>
      )}
`;

if (!c.includes("tab==='nda'")) {
  c = c.replace(
    `      {tab==='manual'&&(`,
    tabNDA + `      {tab==='manual'&&(`
  );
  console.log('OK tab NDA agregado');
} else {
  console.log('-- tab NDA ya existe');
}

fs.writeFileSync('app/admin/page.tsx', c);
console.log('Listo');
