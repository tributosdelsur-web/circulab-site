'use client'
import { useEffect, useState } from 'react'

// Los QR del equipo en el celular: tocás uno, se abre en grande y la otra persona lo escanea.
// Mantiene la pantalla encendida mientras se muestra un QR (si el teléfono lo permite).

const QRS = [
  { id: 'cw', icon: '🤝', t: 'Contacto', d: 'Conocer OLIVIA y dejar sus datos', url: 'oliviacirculab.com.ar/cw', color: '#22c55e' },
  { id: 'video', icon: '▶️', t: 'Video', d: 'Cómo funciona OLIVIA en 1:35', url: 'oliviacirculab.com.ar/videos/el-sistema', color: '#a855f7' },
  { id: 'consorcios', icon: '🏢', t: 'Consorcios', d: 'Diagnóstico de dos semanas, sin costo', url: 'oliviacirculab.com.ar/cw', color: '#3b82f6' },
  { id: 'vecinos', icon: '🌱', t: 'Vecinos', d: 'Registrarse y medir su orgánico', url: 'oliviacirculab.com.ar/registro', color: '#22c55e' },
  { id: 'inversion', icon: '💼', t: 'Inversión', d: 'Recibir el material para inversores', url: 'oliviacirculab.com.ar/cw', color: '#eab308' },
]

export default function QR() {
  const [abierto, setAbierto] = useState<number | null>(null)

  useEffect(() => {
    if (abierto === null) return
    let lock: any = null
    ;(navigator as any).wakeLock?.request?.('screen').then((l: any) => { lock = l }).catch(() => {})
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(null)
      if (e.key === 'ArrowRight') setAbierto(i => (i === null ? 0 : (i + 1) % QRS.length))
      if (e.key === 'ArrowLeft') setAbierto(i => (i === null ? 0 : (i + QRS.length - 1) % QRS.length))
    }
    window.addEventListener('keydown', tecla)
    return () => { window.removeEventListener('keydown', tecla); lock?.release?.().catch(() => {}) }
  }, [abierto])

  if (abierto !== null) {
    const q = QRS[abierto]
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#fff', color: '#0f172a', fontFamily: 'Inter,system-ui', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', color: q.color, textTransform: 'uppercase' }}>OLIVIA Circulab</div>
        <div style={{ fontSize: 28, fontWeight: 900, marginTop: 4 }}>{q.icon} {q.t}</div>
        <div style={{ fontSize: 14, color: '#475569', marginTop: 4, textAlign: 'center' }}>{q.d}</div>
        <img src={`/qr/equipo/${q.id}.svg`} alt={`QR ${q.t}`} style={{ width: 'min(86vw, 62vh)', height: 'min(86vw, 62vh)', marginTop: 18, border: `6px solid ${q.color}`, borderRadius: 22, padding: 14, background: '#fff' }} />
        <div style={{ fontSize: 15, fontWeight: 800, marginTop: 14 }}>{q.url}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <button onClick={() => setAbierto((abierto + QRS.length - 1) % QRS.length)} style={btn}>←</button>
          <button onClick={() => setAbierto(null)} style={{ ...btn, padding: '12px 22px' }}>Todos los QR</button>
          <button onClick={() => setAbierto((abierto + 1) % QRS.length)} style={btn}>→</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a', color: '#f1f5f9', fontFamily: 'Inter,system-ui', padding: '22px 16px 40px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 38, height: 38, borderRadius: 10, objectFit: 'contain' }} />
          <div style={{ fontSize: 18, fontWeight: 900 }}>QR de OLIVIA</div>
        </div>
        <div style={{ fontSize: 12.5, color: '#64748b', marginBottom: 16 }}>Tocá uno y mostrale la pantalla a la otra persona.</div>
        {QRS.map((q, i) => (
          <button key={q.id} onClick={() => setAbierto(i)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', background: '#111827', border: `1px solid ${q.color}55`, borderLeft: `5px solid ${q.color}`, borderRadius: 14, padding: '16px 14px', marginBottom: 10, color: '#f1f5f9', cursor: 'pointer', fontFamily: 'inherit' }}>
            <span style={{ fontSize: 28 }}>{q.icon}</span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontSize: 17, fontWeight: 800 }}>{q.t}</span>
              <span style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{q.d}</span>
            </span>
            <span style={{ fontSize: 20, color: q.color }}>›</span>
          </button>
        ))}
        <div style={{ fontSize: 11, color: '#475569', marginTop: 14, lineHeight: 1.6 }}>Consejo: agregá esta página a la pantalla de inicio del celular para abrirla con un toque.</div>
      </div>
    </div>
  )
}

const btn: React.CSSProperties = { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 18px', fontSize: 16, fontWeight: 800, color: '#0f172a', cursor: 'pointer', fontFamily: 'inherit' }
