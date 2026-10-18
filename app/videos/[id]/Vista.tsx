'use client'
import VideoBloque, { videoPorId } from '../../../lib/VideoBloque'

export default function Vista({ id }: { id: string }) {
  const v = videoPorId(id)
  const bg = '#06110b', text = '#eef5f0', sub = '#9fb3a6', accent = '#22c55e', border = 'rgba(134,239,172,.15)'
  return (
    <main style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid ' + border }}>
        <a href="/" style={{ color: text, textDecoration: 'none', fontWeight: 900, letterSpacing: '-0.02em' }}>OLIVIA <span style={{ color: accent, fontWeight: 600 }}>Circulab</span></a>
        <a href="/videos" style={{ color: accent, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>Ver todos los videos →</a>
      </nav>
      <section style={{ padding: '36px 20px 56px' }}>
        <VideoBloque video={v} sub={sub} accent={accent} mostrarPagina />
      </section>
    </main>
  )
}
