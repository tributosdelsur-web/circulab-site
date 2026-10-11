'use client'
import { useState } from 'react'

export const FUENTE = 'Inter,system-ui'

export type Tema = ReturnType<typeof useTema>

export function useTema() {
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const [dark, setDark] = useState(true)
  const es = lang === 'es'
  return {
    es, lang, setLang, dark, setDark,
    bg: dark ? '#0a0e1a' : '#f0f4f8',
    text: dark ? '#f1f5f9' : '#0a0e1a',
    card: dark ? '#111827' : '#ffffff',
    border: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    sub: dark ? '#94a3b8' : '#475569',
    accent: '#22c55e',
  }
}

// Cuadrícula de fondo del hero — solo para páginas institucionales
export function gridFondo(dark: boolean) {
  const l = dark ? 'rgba(34,197,94,0.12)' : 'rgba(26,71,49,0.22)'
  return {
    backgroundImage: `linear-gradient(${l} 1px,transparent 1px),linear-gradient(90deg,${l} 1px,transparent 1px)`,
    backgroundSize: '56px 56px',
  }
}

// [ Etiqueta ] en monospace
export function Rubro({ t, children }: { t: Tema; children: any }) {
  return (
    <p style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: t.sub, marginBottom: 10 }}>
      [ {children} ]
    </p>
  )
}

// Título de sección en Georgia itálica
export function Titulo({ children, size = 28 }: { children: any; size?: number }) {
  return (
    <h2 style={{ fontSize: size, fontWeight: 900, fontFamily: 'Georgia,serif', fontStyle: 'italic', lineHeight: 1.2, margin: 0 }}>
      {children}
    </h2>
  )
}

// Fila de píldoras
export function Pildoras({ t, items, centrado = false }: { t: Tema; items: string[]; centrado?: boolean }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, justifyContent: centrado ? 'center' : 'flex-start' }}>
      {items.map((x, i) => (
        <span key={i} style={{ border: `1px solid ${t.border}`, borderRadius: 20, padding: '5px 12px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, background: t.dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}>
          {x}
        </span>
      ))}
    </div>
  )
}

export function Tarjeta({ t, children, pad = '20px' }: { t: Tema; children: any; pad?: string }) {
  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: pad }}>
      {children}
    </div>
  )
}

// Nav compartido
export function Nav({ t, etiqueta, cta }: { t: Tema; etiqueta: string; cta?: { l: string; h: string } }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: t.dark ? 'rgba(10,14,26,0.9)' : 'rgba(240,244,248,0.9)', borderBottom: `1px solid ${t.border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8 }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', minWidth: 0, flexShrink: 1 }}>
        <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Circulab Tech</div>
          <div style={{ fontSize: 9, color: t.sub, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'monospace' }}>{etiqueta}</div>
        </div>
      </a>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
        {cta && (
          <a href={cta.h} style={{ background: t.accent, color: t.dark ? '#050505' : 'white', padding: '6px 14px', borderRadius: 20, fontSize: 10, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {cta.l}
          </a>
        )}
        <button onClick={() => t.setLang(t.es ? 'en' : 'es')} style={{ border: `1px solid ${t.border}`, borderRadius: 20, padding: '5px 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: t.text, fontFamily: 'monospace' }}>
          {t.es ? 'EN' : 'ES'}
        </button>
        <button onClick={() => t.setDark(!t.dark)} style={{ border: `1px solid ${t.border}`, borderRadius: 20, padding: '5px 9px', fontSize: 12, cursor: 'pointer', background: 'transparent', color: t.text }}>
          {t.dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}
