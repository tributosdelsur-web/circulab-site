const fs = require('fs');
let c = fs.readFileSync('app/admin/page.tsx', 'utf8');

const nuevosTabs = `
      {tab==='linkedin'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>LinkedIn Studio</div>
          <div style={{background:'#111827',border:'1px solid rgba(59,130,246,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#3b82f6'}}>Generador de posts con IA</div>
            <div style={{fontSize:11,color:'#64748b',marginBottom:16}}>3 posts por semana · Lunes · Miercoles · Viernes · Extra inversor</div>
            {[
              {dia:'Lunes',tipo:'Cientifico / Educativo',color:'#3b82f6',key:'lunes',prompt:'Escribe un post LinkedIn para OLIVIA Circulab. Tono cientifico accesible. Tema: fundamento del reciclaje urbano y creditos de carbono. Hito Verra Feb 2026. CTA oliviacirculab.com.ar. Max 250 palabras. 5 hashtags. Al final PROMPT IMAGEN para Leonardo AI estilo cinematic editorial verde oscuro.'},
              {dia:'Miercoles',tipo:'Producto / Datos',color:'#22c55e',key:'miercoles',prompt:'Escribe un post LinkedIn para OLIVIA Circulab. Tono datos concretos. Mencionar producto activo con USD 0 inversion externa, modelo SaaS USD 600/mes para consorcios. CTA. Max 250 palabras. 5 hashtags. Al final PROMPT IMAGEN Leonardo AI.'},
              {dia:'Viernes',tipo:'Historia / Emotivo',color:'#a855f7',key:'viernes',prompt:'Escribe un post LinkedIn para OLIVIA Circulab. Tono emotivo. Historia de JP y Mileidy construyendo en su cocina para Santino Eloy. USD 0 inversion externa. El planeta no espera. Max 250 palabras. 5 hashtags. Al final PROMPT IMAGEN Leonardo AI.'},
              {dia:'Extra Inversor',tipo:'Fundraising',color:'#f59e0b',key:'extra',prompt:'Escribe un post LinkedIn para OLIVIA Circulab dirigido a inversores. Ronda Seed USD 500K 10% equity, Ley 27.506 USD 1=1.4, hito Verra Feb 2026, producto activo USD 0 inversion externa. Tono confianza. Max 250 palabras. 5 hashtags. Al final PROMPT IMAGEN Leonardo AI.'},
            ].map((item)=>{
              const [post, setPost] = React.useState('')
              const [loading, setLoading] = React.useState(false)
              const [copiado, setCopiado] = React.useState(false)
              const generar = async () => {
                setLoading(true); setPost('')
                try {
                  const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,messages:[{role:'user',content:item.prompt}]})})
                  const data = await res.json()
                  setPost(data.content?.[0]?.text||'Error')
                } catch(e){setPost('Error')}
                setLoading(false)
              }
              return (
                <div key={item.key} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'14px',marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:item.color}}>{item.dia}</div>
                      <div style={{fontSize:10,color:'#64748b'}}>{item.tipo}</div>
                    </div>
                    <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'rgba(59,130,246,0.1)',border:'1px solid rgba(59,130,246,0.2)',borderRadius:8,padding:'6px 12px',color:loading?'#64748b':'#3b82f6',fontSize:11,fontWeight:700,cursor:'pointer'}}>
                      {loading?'Generando...':'Generar'}
                    </button>
                  </div>
                  {post&&(
                    <div>
                      <div style={{fontSize:11,color:'#94a3b8',background:'rgba(255,255,255,0.02)',borderRadius:8,padding:'10px',marginBottom:8,lineHeight:1.6,maxHeight:160,overflowY:'auto',whiteSpace:'pre-wrap'}}>{post}</div>
                      <button onClick={()=>{navigator.clipboard.writeText(post);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{width:'100%',background:copiado?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:'6px',color:copiado?'#22c55e':'#94a3b8',fontSize:10,fontWeight:700,cursor:'pointer'}}>
                        {copiado?'Copiado':'Copiar post + prompt imagen'}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
            <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:'10px',fontSize:10,color:'#94a3b8',lineHeight:1.6}}>
              Flujo: Genera el post y copia. El prompt de imagen va en leonardo.ai. Programa con Buffer.
            </div>
          </div>
        </div>
      )}

      {tab==='newsletter'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Newsletter Engine</div>
          <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#a855f7'}}>Generador quincenal con metricas reales</div>
            <NewsletterEngine usuarios={usuarios} residuos={residuos} />
          </div>
        </div>
      )}

      {tab==='community'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Community Engine</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#22c55e'}}>Mensajes personalizados con IA</div>
            <CommunityEngine usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='email_secuencia'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Email Secuencia</div>
          <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
            <EmailSecuencia usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='camp_ciudadana'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Ciudadana</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaCiudadana usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='camp_consorcios'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Consorcios</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaConsorcios usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='camp_gastro'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Gastro</div>
          <div style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaGastro />
          </div>
        </div>
      )}

      {tab==='camp_rse'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana RSE / ESG</div>
          <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaRSE />
          </div>
        </div>
      )}

      {tab==='camp_emisores'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Grandes Emisores</div>
          <div style={{background:'#111827',border:'1px solid rgba(6,182,212,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaEmisores />
          </div>
        </div>
      )}

      {tab==='camp_municipios'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Campana Municipios</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <CampaniaMunicipios />
          </div>
        </div>
      )}

      {tab==='pipeline'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Pipeline Comercial</div>
          <div style={{background:'#111827',border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'16px'}}>
            <PipelineComercial />
          </div>
        </div>
      )}

      {tab==='ventas'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Ventas Directas</div>
          <div style={{background:'#111827',border:'1px solid rgba(245,158,11,0.2)',borderRadius:14,padding:'16px'}}>
            <VentasDirectas usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='manual'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>Manual Operativo</div>
          <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:'16px'}}>
            <ManualOperativo />
          </div>
        </div>
      )}
`;

c = c.replace(
  `     </div>
   </div>
 )
}`,
  nuevosTabs + `     </div>
   </div>
 )
}`
);

fs.writeFileSync('app/admin/page.tsx', c);
console.log('OK - tabs agregados al admin');
