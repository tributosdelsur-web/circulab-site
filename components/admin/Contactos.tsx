'use client'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { PERFILES, EVENTOS, etiquetaPerfil, etiquetaEvento } from '../../lib/cw'

// CRM liviano: contactos que llegan por /cw (Climate Week), /contacto y los que carga el equipo.
const ESTADOS = [
  { id: 'nuevo', l: '🆕 Nuevo', c: '#3b82f6' },
  { id: 'contactado', l: '✉️ Contactado', c: '#a855f7' },
  { id: 'reunion', l: '📅 Reunión', c: '#f59e0b' },
  { id: 'propuesta', l: '📄 Propuesta', c: '#eab308' },
  { id: 'aliado', l: '🤝 Aliado / cliente', c: '#22c55e' },
  { id: 'descartado', l: '⏸️ En pausa', c: '#64748b' },
]

const csv = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`

export default function Contactos() {
  const [lista, setLista] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [fEvento, setFEvento] = useState('')
  const [fPerfil, setFPerfil] = useState('')
  const [fEstado, setFEstado] = useState('')
  const [busca, setBusca] = useState('')
  const [editando, setEditando] = useState<Record<string, any>>({})
  const [guardado, setGuardado] = useState('')

  async function cargar() {
    setCargando(true); setError('')
    const { data, error } = await supabase.from('contactos').select('*').order('created_at', { ascending: false }).limit(1000)
    if (error) setError('No se pudieron leer los contactos. ¿Corriste supabase/contactos.sql? ' + error.message)
    setLista(data || []); setCargando(false)
  }
  useEffect(() => { cargar() }, [])

  const filtrados = useMemo(() => lista.filter(c =>
    (!fEvento || c.evento === fEvento) && (!fPerfil || c.perfil === fPerfil) && (!fEstado || (c.estado || 'nuevo') === fEstado) &&
    (!busca || `${c.nombre} ${c.organizacion} ${c.email} ${c.interes} ${c.mensaje}`.toLowerCase().includes(busca.toLowerCase()))
  ), [lista, fEvento, fPerfil, fEstado, busca])

  const cambios = (id: string) => editando[id] || {}
  const set = (id: string, k: string, v: any) => setEditando(e => ({ ...e, [id]: { ...e[id], [k]: v } }))

  async function guardar(c: any) {
    const ch = cambios(c.id)
    if (!Object.keys(ch).length) return
    const { error } = await supabase.from('contactos').update(ch).eq('id', c.id)
    if (error) { setError('No se pudo guardar: ' + error.message); return }
    setLista(l => l.map(x => x.id === c.id ? { ...x, ...ch } : x))
    setEditando(e => { const n = { ...e }; delete n[c.id]; return n })
    setGuardado(c.id); setTimeout(() => setGuardado(''), 1800)
  }

  function exportar() {
    const cols = ['created_at', 'nombre', 'organizacion', 'cargo', 'email', 'whatsapp', 'perfil', 'evento', 'interes', 'estado', 'proximo_paso', 'fecha_proximo', 'notas', 'cargado_por', 'origen']
    const filas = [cols.join(','), ...filtrados.map(c => cols.map(k => csv(k === 'perfil' ? etiquetaPerfil(c.perfil) : k === 'evento' ? etiquetaEvento(c.evento) : c[k])).join(','))]
    const blob = new Blob(['﻿' + filas.join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `contactos-olivia-${new Date().toISOString().slice(0, 10)}.csv`; a.click()
  }

  const conteo = (k: string, v: string) => lista.filter(c => (c[k] || (k === 'estado' ? 'nuevo' : '')) === v).length
  const sel: React.CSSProperties = { background: '#111827', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 8px', fontSize: 12, fontFamily: 'inherit' }
  const inp: React.CSSProperties = { ...sel, width: '100%', boxSizing: 'border-box' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 900 }}>🤝 Contactos</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>{lista.length} en total · {conteo('estado', 'nuevo')} sin contactar · llegan por /cw, /contacto o carga del equipo</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <a href="/cw?carga=jp" target="_blank" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', borderRadius: 8, padding: '7px 12px', fontSize: 12, fontWeight: 800, textDecoration: 'none' }}>+ Cargar contacto</a>
          <button onClick={exportar} style={{ ...sel, cursor: 'pointer' }}>⬇️ CSV</button>
          <button onClick={cargar} style={{ ...sel, cursor: 'pointer' }}>↻</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar nombre, organización…" style={{ ...sel, flex: '1 1 180px' }} />
        <select value={fEvento} onChange={e => setFEvento(e.target.value)} style={sel}><option value="">Todos los eventos</option>{EVENTOS.map(x => <option key={x.id} value={x.id}>{x.l} ({conteo('evento', x.id)})</option>)}</select>
        <select value={fPerfil} onChange={e => setFPerfil(e.target.value)} style={sel}><option value="">Todos los perfiles</option>{PERFILES.map(x => <option key={x.id} value={x.id}>{x.icon} {x.l} ({conteo('perfil', x.id)})</option>)}</select>
        <select value={fEstado} onChange={e => setFEstado(e.target.value)} style={sel}><option value="">Todos los estados</option>{ESTADOS.map(x => <option key={x.id} value={x.id}>{x.l} ({conteo('estado', x.id)})</option>)}</select>
      </div>

      {error && <div style={{ fontSize: 12, color: '#ef4444', background: 'rgba(239,68,68,0.08)', borderRadius: 8, padding: 10 }}>{error}</div>}
      {cargando ? <div style={{ fontSize: 12, color: '#64748b' }}>Cargando…</div> : filtrados.length === 0 ? (
        <div style={{ fontSize: 12, color: '#64748b', textAlign: 'center', padding: 24 }}>Todavía no hay contactos con estos filtros.</div>
      ) : filtrados.map(c => {
        const ch = cambios(c.id)
        const estado = ch.estado ?? c.estado ?? 'nuevo'
        const est = ESTADOS.find(x => x.id === estado)
        const wa = String(c.whatsapp || '').replace(/\D/g, '')
        return (
          <div key={c.id} style={{ background: '#111827', border: `1px solid ${est?.c || '#334155'}44`, borderLeft: `4px solid ${est?.c || '#334155'}`, borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800 }}>{c.nombre || 'Sin nombre'} {c.organizacion && <span style={{ color: '#94a3b8', fontWeight: 600 }}>· {c.organizacion}</span>}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{[c.cargo, etiquetaPerfil(c.perfil || c.tipo), c.evento && etiquetaEvento(c.evento), new Date(c.created_at).toLocaleDateString('es-AR'), c.cargado_por === 'equipo' && 'cargado por el equipo'].filter(Boolean).join(' · ')}</div>
              </div>
              <div style={{ display: 'flex', gap: 6, fontSize: 12, fontWeight: 700 }}>
                {c.email && <a href={`mailto:${c.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>✉️ {c.email}</a>}
                {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', textDecoration: 'none' }}>💬 WhatsApp</a>}
              </div>
            </div>
            {(c.interes || c.mensaje) && <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 6, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>“{c.interes || c.mensaje}”</div>}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(130px,170px) 1fr minmax(120px,140px)', gap: 6, marginTop: 8 }}>
              <select value={estado} onChange={e => set(c.id, 'estado', e.target.value)} style={inp}>{ESTADOS.map(x => <option key={x.id} value={x.id}>{x.l}</option>)}</select>
              <input value={ch.proximo_paso ?? c.proximo_paso ?? ''} onChange={e => set(c.id, 'proximo_paso', e.target.value)} placeholder="Próximo paso (ej: mandar propuesta)" style={inp} />
              <input type="date" value={ch.fecha_proximo ?? c.fecha_proximo ?? ''} onChange={e => set(c.id, 'fecha_proximo', e.target.value || null)} style={inp} />
            </div>
            <textarea value={ch.notas ?? c.notas ?? ''} onChange={e => set(c.id, 'notas', e.target.value)} placeholder="Notas internas" rows={2} style={{ ...inp, marginTop: 6, resize: 'vertical' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
              <button onClick={() => guardar(c)} disabled={!Object.keys(ch).length} style={{ ...sel, cursor: Object.keys(ch).length ? 'pointer' : 'default', color: Object.keys(ch).length ? '#22c55e' : '#475569', fontWeight: 800 }}>
                {guardado === c.id ? '✓ Guardado' : 'Guardar'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
