'use client'
import Link from 'next/link'
// Barra superior tipo: logo y nombre OLIVIA Circulab arriba a la izquierda.
export default function SitioNav({ es = true, text = '#eef5f0', accent = '#22c55e', border = 'rgba(134,239,172,.15)', bg = 'rgba(6,17,11,.95)' }: { es?: boolean; text?: string; accent?: string; border?: string; bg?: string }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: bg, borderBottom: '1px solid ' + border, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: text, textTransform: 'uppercase', letterSpacing: '.05em' }}>OLIVIA Circulab</span>
      </Link>
      <Link href="/" style={{ color: accent, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>{es ? '← Volver al inicio' : '← Back to home'}</Link>
    </nav>
  )
}
