'use client'
import SitioNav from '../../components/SitioNav'
import SitioFooter from '../../components/SitioFooter'
import VideoBloque, { VIDEOS } from '../../lib/VideoBloque'

export default function Videos() {
  const bg = '#06110b', text = '#eef5f0', sub = '#9fb3a6', accent = '#22c55e', border = 'rgba(134,239,172,.15)'
  return (
    <main style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SitioNav text={text} accent={accent} border={border} />
      <section style={{ padding: '44px 20px 12px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.3em', color: accent, marginBottom: 12 }}>[ Videos ]</div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>Un video para cada parte del circuito</h1>
        <p style={{ fontSize: 14, color: sub, lineHeight: 1.7 }}>Miralos y compartilos por WhatsApp, Instagram o LinkedIn. Cada uno te lleva a la página pensada para ese público.</p>
      </section>
      <section style={{ padding: '24px 20px 56px', maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 40, alignItems: 'start' }}>
        {VIDEOS.map(v => <VideoBloque key={v.id} video={v} sub={sub} accent={accent} mostrarPagina compacto />)}
      </section>
      <SitioFooter text={text} sub={sub} border={border} />
    </main>
  )
}
