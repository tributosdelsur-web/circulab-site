'use client'
import { useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { fetchIA } from '../../lib/ia'
import { comprimirImagen } from '../../lib/fotos'

// Panel del pesaje en vivo: 1) entrega en planta con una foto para todo el lote, 2) certificado de compost.
// En cada paso se avisa por mail a las personas, con la foto.
const PLANTA_DEFECTO = 'RUO · Recuperadores Urbanos del Oeste'

const kgTxt = (kg: number) => (kg < 1 ? `${Math.round(kg * 1000)} g` : `${kg.toFixed(2)} kg`)
const esVivo = (r: any) => /Pesaje en vivo/i.test(r.notas || '') || /Pesaje en vivo/i.test(r.punto_entrega || '')

async function subir(file: File, prefijo: string) {
  const liviano = file.type.startsWith('image/') ? await comprimirImagen(file) : file
  const ext = liviano.type === 'image/jpeg' ? 'jpg' : (file.name.split('.').pop() || 'bin').replace(/[^a-z0-9]/gi, '').toLowerCase()
  const nombre = `${prefijo}-${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('residuos-fotos').upload(nombre, liviano, { contentType: liviano.type || undefined })
  if (error) throw new Error('No se pudo subir el archivo: ' + error.message)
  return supabase.storage.from('residuos-fotos').getPublicUrl(nombre).data.publicUrl
}

export default function PilotoPlanta({ residuos, recargar }: { residuos: any[]; recargar: () => void }) {
  const [soloVivo, setSoloVivo] = useState(true)
  const [planta, setPlanta] = useState(PLANTA_DEFECTO)
  const [selEntrega, setSelEntrega] = useState<Record<string, boolean>>({})
  const [selCompost, setSelCompost] = useState<Record<string, boolean>>({})
  const [fotoEntrega, setFotoEntrega] = useState<File | null>(null)
  const [certificado, setCertificado] = useState<File | null>(null)
  const [avisar, setAvisar] = useState(true)
  const [trabajando, setTrabajando] = useState('')
  const [mensaje, setMensaje] = useState('')

  const filtro = (r: any) => (soloVivo ? esVivo(r) : true)
  const paraEntregar = useMemo(() => residuos.filter(r => r.status === 'pendiente' && filtro(r)), [residuos, soloVivo])
  const enPlanta = useMemo(() => residuos.filter(r => r.status === 'en_camino' && filtro(r)), [residuos, soloVivo])
  const conPermiso = useMemo(() => residuos.filter(r => /\[autoriza_redes\]/.test(r.notas || '') && r.foto_url), [residuos])

  const marcado = (sel: Record<string, boolean>, id: string) => sel[id] !== false // por defecto, todos marcados
  const idsEntrega = paraEntregar.filter(r => marcado(selEntrega, r.id)).map(r => r.id)
  const idsCompost = enPlanta.filter(r => marcado(selCompost, r.id)).map(r => r.id)
  const suma = (lista: any[], ids: string[]) => lista.filter(r => ids.includes(r.id)).reduce((a, r) => a + Number(r.kg || 0), 0)

  function ubicacion(): Promise<{ lat: number; lng: number } | null> {
    return new Promise(ok => {
      if (!navigator.geolocation) return ok(null)
      navigator.geolocation.getCurrentPosition(p => ok({ lat: p.coords.latitude, lng: p.coords.longitude }), () => ok(null), { timeout: 8000 })
    })
  }

  async function avisarPorMail(tipo: 'entrega' | 'compost', ids: string[], foto_url: string) {
    if (!avisar) return ''
    try {
      const res = await fetchIA('/api/avisar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tipo, ids, planta, foto_url }) })
      const j = await res.json()
      if (!res.ok && !j.personas) return ` No se pudieron mandar los mails: ${j.error ? JSON.stringify(j.error).slice(0, 200) : res.status}.`
      return ` Se avisó por mail a ${j.enviados} de ${j.personas} personas.${j.error ? ' Error de Resend: ' + j.error : ''}`
    } catch {
      return ' No se pudieron mandar los mails.'
    }
  }

  async function registrarEntrega() {
    if (!fotoEntrega || !idsEntrega.length) return
    setTrabajando('entrega'); setMensaje('')
    try {
      const url = await subir(fotoEntrega, 'entrega-planta')
      const pos = await ubicacion()
      const fecha = new Date().toLocaleDateString('es-AR')
      const lista = paraEntregar.filter(r => idsEntrega.includes(r.id))
      const errores = (await Promise.all(lista.map(r => supabase.from('residuos').update({
        foto_entrega_url: url,
        status: 'en_camino',
        lat_entrega: pos?.lat ?? null,
        lng_entrega: pos?.lng ?? null,
        notas: `${r.notas || ''} · Entregado en ${planta} el ${fecha}`.trim(),
      }).eq('id', r.id)))).filter(x => x.error).length
      const aviso = await avisarPorMail('entrega', idsEntrega, url)
      setMensaje(`✅ Entrega registrada: ${lista.length - errores} registros, ${kgTxt(suma(paraEntregar, idsEntrega))}.${errores ? ` ${errores} no se pudieron actualizar.` : ''}${aviso}`)
      setFotoEntrega(null); setSelEntrega({})
      recargar()
    } catch (e: any) {
      setMensaje('❌ ' + (e?.message || 'Error al registrar la entrega'))
    }
    setTrabajando('')
  }

  async function reenviarEntrega() {
    if (!idsCompost.length) return
    setTrabajando('reenvio'); setMensaje('')
    const foto = enPlanta.find(r => idsCompost.includes(r.id) && r.foto_entrega_url)?.foto_entrega_url || ''
    const prev = avisar
    const aviso = await (async () => {
      try {
        const res = await fetchIA('/api/avisar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tipo: 'entrega', ids: idsCompost, planta, foto_url: foto }) })
        const j = await res.json()
        return `Se avisó por mail a ${j.enviados ?? 0} de ${j.personas ?? 0} personas.${j.error ? ' Error de Resend: ' + (typeof j.error === 'string' ? j.error : JSON.stringify(j.error)) : ''}`
      } catch { return 'No se pudo llamar al envío de mails.' }
    })()
    void prev
    setMensaje((/Error|No se pudo/.test(aviso) ? '❌ ' : '✅ ') + aviso)
    setTrabajando('')
  }

  async function registrarCompost() {
    if (!certificado || !idsCompost.length) return
    setTrabajando('compost'); setMensaje('')
    try {
      const url = await subir(certificado, 'certificado-compost')
      const fecha = new Date().toLocaleDateString('es-AR')
      const lista = enPlanta.filter(r => idsCompost.includes(r.id))
      const errores = (await Promise.all(lista.map(r => supabase.from('residuos').update({
        status: 'validado',
        notas: `${r.notas || ''} · Compost certificado por ${planta} el ${fecha}: ${url}`.trim(),
      }).eq('id', r.id)))).filter(x => x.error).length
      const esImagen = certificado.type.startsWith('image/')
      const aviso = await avisarPorMail('compost', idsCompost, esImagen ? url : '')
      setMensaje(`✅ Compost certificado: ${lista.length - errores} registros validados, ${kgTxt(suma(enPlanta, idsCompost))}.${errores ? ` ${errores} no se pudieron actualizar.` : ''}${aviso}`)
      setCertificado(null); setSelCompost({})
      recargar()
    } catch (e: any) {
      setMensaje('❌ ' + (e?.message || 'Error al registrar el certificado'))
    }
    setTrabajando('')
  }

  const caja = { background: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 18, marginBottom: 18 }
  const boton = (activo: boolean) => ({ width: '100%', padding: 14, borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 800, cursor: activo ? 'pointer' : 'not-allowed', background: activo ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'rgba(255,255,255,0.05)', color: activo ? 'white' : '#64748b' })

  const Lista = ({ items, sel, setSel }: { items: any[]; sel: Record<string, boolean>; setSel: (s: Record<string, boolean>) => void }) => (
    <div style={{ maxHeight: 320, overflowY: 'auto', margin: '10px 0', display: 'grid', gap: 6 }}>
      {items.map(r => (
        <label key={r.id} style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '8px 10px', cursor: 'pointer' }}>
          <input type="checkbox" checked={marcado(sel, r.id)} onChange={e => setSel({ ...sel, [r.id]: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#22c55e' }} />
          {r.foto_url ? <img src={r.foto_url} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} /> : <div style={{ width: 40, height: 40 }} />}
          <div style={{ flex: 1, fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{kgTxt(Number(r.kg))} · {r.tipo}</div>
            <div style={{ color: '#64748b' }}>{r.usuarios?.nombre || 'Sin nombre'} · {new Date(r.created_at).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </label>
      ))}
    </div>
  )

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>⚖️ Pesaje en vivo · entrega y compost</div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 14, lineHeight: 1.6 }}>
        1) Cuando lleves el material a la planta, sacá una foto y registrá la entrega de todo el lote. 2) Cuando la planta emita el certificado de compost, subilo y validá. En cada paso le llega un mail a cada persona con la foto.
      </div>

      <div style={{ ...caja, display: 'grid', gap: 10 }}>
        <label style={{ fontSize: 12, color: '#94a3b8' }}>Planta
          <input value={planta} onChange={e => setPlanta(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', fontSize: 14, boxSizing: 'border-box' }} />
        </label>
        <label style={{ fontSize: 12, color: '#94a3b8', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={soloVivo} onChange={e => setSoloVivo(e.target.checked)} style={{ accentColor: '#22c55e' }} /> Mostrar solo pesajes en vivo
        </label>
        <label style={{ fontSize: 12, color: '#94a3b8', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={avisar} onChange={e => setAvisar(e.target.checked)} style={{ accentColor: '#22c55e' }} /> Avisar por mail a cada persona
        </label>
      </div>

      {mensaje && <div style={{ ...caja, fontSize: 13, color: mensaje.startsWith('❌') ? '#ef4444' : '#22c55e', lineHeight: 1.6 }}>{mensaje}</div>}

      <div style={caja}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#3b82f6' }}>🚚 1 · Entrega en planta</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{paraEntregar.length} registros pendientes · seleccionados {idsEntrega.length} ({kgTxt(suma(paraEntregar, idsEntrega))})</div>
        {paraEntregar.length > 0 && <Lista items={paraEntregar} sel={selEntrega} setSel={setSelEntrega} />}
        <Archivo texto="📷 Elegir o sacar la foto de la entrega" accept="image/*" archivo={fotoEntrega} setArchivo={setFotoEntrega} color="#3b82f6" />
        <button onClick={registrarEntrega} disabled={!fotoEntrega || !idsEntrega.length || !!trabajando} style={boton(!!fotoEntrega && idsEntrega.length > 0 && !trabajando)}>
          {trabajando === 'entrega' ? 'Registrando…' : `Registrar entrega de ${idsEntrega.length} registros`}
        </button>
      </div>

      <div style={caja}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#22c55e' }}>🌱 2 · Certificado de compost</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{enPlanta.length} registros entregados en planta, esperando certificado · seleccionados {idsCompost.length} ({kgTxt(suma(enPlanta, idsCompost))})</div>
        {enPlanta.length > 0 && <Lista items={enPlanta} sel={selCompost} setSel={setSelCompost} />}
        {enPlanta.length > 0 && (
          <button onClick={reenviarEntrega} disabled={!idsCompost.length || !!trabajando}
            style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(59,130,246,0.4)', background: 'rgba(59,130,246,0.08)', color: '#3b82f6', fontSize: 12, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}>
            {trabajando === 'reenvio' ? 'Enviando…' : `📧 Reenviar el aviso de entrega a los ${idsCompost.length} seleccionados`}
          </button>
        )}
        <Archivo texto="📎 Subir el certificado de la planta (foto o PDF)" accept="image/*,application/pdf" archivo={certificado} setArchivo={setCertificado} color="#22c55e" />
        <button onClick={registrarCompost} disabled={!certificado || !idsCompost.length || !!trabajando} style={boton(!!certificado && idsCompost.length > 0 && !trabajando)}>
          {trabajando === 'compost' ? 'Validando…' : `Validar ${idsCompost.length} registros con el certificado`}
        </button>
      </div>

      <div style={caja}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#d946ef' }}>📸 Fotos con permiso para las redes de OLIVIA</div>
        <div style={{ fontSize: 12, color: '#64748b', margin: '4px 0 10px' }}>{conPermiso.length} personas autorizaron compartir su foto. Tocá una para abrirla y descargarla.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))', gap: 8 }}>
          {conPermiso.slice(0, 60).map(r => (
            <a key={r.id} href={r.foto_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <img src={r.foto_url} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 10 }} />
              <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{kgTxt(Number(r.kg))} · {r.tipo}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// Selector de archivo grande y visible: muestra qué archivo quedó elegido.
function Archivo({ texto, accept, archivo, setArchivo, color }: { texto: string; accept: string; archivo: File | null; setArchivo: (f: File | null) => void; color: string }) {
  return (
    <label style={{ display: 'block', margin: '10px 0', padding: 14, borderRadius: 12, border: `2px dashed ${archivo ? color : 'rgba(255,255,255,0.18)'}`, background: archivo ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.02)', textAlign: 'center', cursor: 'pointer' }}>
      <span style={{ display: 'block', fontSize: 13, fontWeight: 800, color }}>{archivo ? '✓ Archivo listo' : texto}</span>
      <span style={{ display: 'block', fontSize: 11, color: '#94a3b8', marginTop: 4, wordBreak: 'break-all' }}>{archivo ? `${archivo.name} · tocá para cambiarlo` : 'Tocá acá para elegir el archivo'}</span>
      <input type="file" accept={accept} onChange={e => setArchivo(e.target.files?.[0] || null)} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden' }} />
    </label>
  )
}
