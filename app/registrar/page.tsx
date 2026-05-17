'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const TIPOS = ['Orgánico', 'Plástico', 'Papel', 'Vidrio', 'Metal']
const TOKENS:any = { 'Orgánico':10, 'Plástico':8, 'Papel':6, 'Vidrio':5, 'Metal':7 }
const USUARIO_ID = 'e034e87d-51cc-4aa8-927f-7fb06f62dcc2'

export default function Registrar() {
  const [tipo, setTipo] = useState('Orgánico')
  const [kg, setKg] = useState('')
  const [foto, setFoto] = useState<File|null>(null)
  const [notas, setNotas] = useState('')
  const [estado, setEstado] = useState<'idle'|'cargando'|'ok'|'error'>('idle')

  async function handleSubmit() {
    if (!kg || parseFloat(kg) <= 0) return
    setEstado('cargando')
    let foto_url = null
    if (foto) {
      const nombre = `${Date.now()}-${foto.name}`
      const { error: upErr } = await supabase.storage.from('residuos-fotos').upload(nombre, foto)
      if (!upErr) {
        const { data: urlData } = supabase.storage.from('residuos-fotos').getPublicUrl(nombre)
        foto_url = urlData.publicUrl
      }
    }
    const tokens = Math.round(parseFloat(kg) * (TOKENS[tipo] || 8))
    const { error } = await supabase.from('residuos').insert({
      usuario_id: USUARIO_ID,
      tipo: tipo.toLowerCase(),
      kg: parseFloat(kg),
      tokens_olv: tokens,
      foto_url,
      notas,
      status: 'pendiente',
    })
    setEstado(error ? 'error' : 'ok')
  }

  if (estado === 'ok') return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:24,fontFamily:'system-ui'}}>
      <div style={{fontSize:56}}>✅</div>
      <div style={{fontSize:22,fontWeight:800,color:'#f1f5f9'}}>¡Registro enviado!</div>
      <div style={{fontSize:14,color:'#64748b',textAlign:'center'}}>Tu residuo está pendiente de validación.<br/>Los tokens OLV se acreditarán en 24hs.</div>
      <button onClick={()=>{setEstado('idle');setKg('');setFoto(null);setNotas('')}} style={{background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.3)',color:'#22c55e',padding:'10px 24px',borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer',marginTop:8}}>
        Registrar otro →
      </button>
      <a href="/dashboard" style={{fontSize:13,color:'#64748b'}}>Ver mi panel →</a>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',padding:'40px 20px',fontFamily:'system-ui'}}>
      <div style={{maxWidth:480,margin:'0 auto'}}>
        <div style={{marginBottom:32,textAlign:'center'}}>
          <div style={{fontSize:40,marginBottom:8}}>🌿</div>
          <h1 style={{fontSize:24,fontWeight:900,color:'#f1f5f9',margin:0}}>Registrar residuo</h1>
          <p style={{fontSize:13,color:'#64748b',marginTop:8}}>Olivia Circular · Balcarce 379 · San Telmo</p>
        </div>

        <div style={{marginBottom:20}}>
          <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Tipo de residuo</label>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {TIPOS.map(t => (
              <button key={t} onClick={()=>setTipo(t)} style={{padding:'8px 16px',borderRadius:20,border:'none',cursor:'pointer',fontSize:13,fontWeight:600,background:tipo===t?'rgba(34,197,94,0.15)':'rgba(255,255,255,0.04)',color:tipo===t?'#22c55e':'#64748b',outline:tipo===t?'1px solid rgba(34,197,94,0.4)':'1px solid rgba(255,255,255,0.06)'}}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:20}}>
          <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Cantidad (kg)</label>
          <input type="number" step="0.1" min="0" value={kg} onChange={e=>setKg(e.target.value)} placeholder="ej: 2.5"
            style={{width:'100%',padding:'12px 16px',borderRadius:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:16,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
          {kg && parseFloat(kg) > 0 && (
            <div style={{marginTop:8,fontSize:12,color:'#22c55e'}}>
              ≈ {Math.round(parseFloat(kg) * (TOKENS[tipo]||8))} tokens OLV a acreditar
            </div>
          )}
        </div>

        <div style={{marginBottom:20}}>
          <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Foto del residuo</label>
          <label style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'28px 20px',borderRadius:12,cursor:'pointer',border:foto?'2px solid rgba(34,197,94,0.4)':'2px dashed rgba(255,255,255,0.1)',background:foto?'rgba(34,197,94,0.06)':'rgba(255,255,255,0.02)'}}>
            <input type="file" accept="image/*" capture="environment" onChange={e=>setFoto(e.target.files?.[0]||null)} style={{display:'none'}} />
            {foto ? (
              <>
                <div style={{fontSize:28,marginBottom:6}}>📸</div>
                <div style={{fontSize:13,color:'#22c55e',fontWeight:600}}>{foto.name}</div>
                <div style={{fontSize:11,color:'#64748b',marginTop:2}}>{(foto.size/1024).toFixed(0)} KB · Toca para cambiar</div>
              </>
            ) : (
              <>
                <div style={{fontSize:28,marginBottom:6}}>📷</div>
                <div style={{fontSize:13,color:'#94a3b8'}}>Sacar foto o subir imagen</div>
                <div style={{fontSize:11,color:'#64748b',marginTop:2}}>JPG, PNG · Max 5MB</div>
              </>
            )}
          </label>
        </div>

        <div style={{marginBottom:28}}>
          <label style={{fontSize:12,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Notas (opcional)</label>
          <textarea value={notas} onChange={e=>setNotas(e.target.value)} placeholder="ej: bolsas bien separadas, sin mezcla..." rows={3}
            style={{width:'100%',padding:'12px 16px',borderRadius:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',resize:'none',boxSizing:'border-box'}} />
        </div>

        <button onClick={handleSubmit} disabled={estado==='cargando'||!kg}
          style={{width:'100%',padding:'16px',borderRadius:14,border:'none',background:!kg?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',color:!kg?'#64748b':'white',fontSize:16,fontWeight:700,cursor:!kg?'not-allowed':'pointer',boxShadow:kg?'0 0 30px rgba(34,197,94,0.25)':'none'}}>
          {estado==='cargando'?'⏳ Enviando...':'✅ Registrar residuo'}
        </button>

        <a href="/dashboard" style={{display:'block',textAlign:'center',marginTop:20,fontSize:13,color:'#64748b',textDecoration:'none'}}>← Volver al panel</a>
      </div>
    </div>
  )
}
