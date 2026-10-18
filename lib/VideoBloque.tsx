'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { type VideoOlivia, linkDeVideo } from './videos'
export { VIDEOS, videoPorId } from './videos'
export type { VideoOlivia } from './videos'

export function BotonesCompartir({ src, titulo, texto, link, accent = '#22c55e', centrado = false }:
  { src: string; titulo: string; texto: string; link: string; accent?: string; centrado?: boolean }) {
  const [abierto, setAbierto] = useState(false)
  const [aviso, setAviso] = useState('')
  const [estado, setEstado] = useState<'idle' | 'cargando' | 'listo'>('idle')
  const archivo = useRef<File | null>(null)
  const caja = useRef<HTMLDivElement>(null)
  const avisar = (s: string) => { setAviso(s); setTimeout(() => setAviso(''), 3500) }
  const mensaje = `${titulo} · OLIVIA Circulab — ${texto}`

  const puedeArchivos = () => {
    const nav = typeof navigator !== 'undefined' ? (navigator as Navigator & { canShare?: (d: ShareData) => boolean }) : null
    return !!(nav && typeof nav.share === 'function' && typeof nav.canShare === 'function')
  }

  const precargar = useCallback(async () => {
    if (archivo.current || !puedeArchivos()) return
    setEstado('cargando')
    try {
      const blob = await fetch(src).then(r => r.blob())
      archivo.current = new File([blob], 'olivia-circulab.mp4', { type: 'video/mp4' })
      setEstado('listo')
    } catch { setEstado('idle') }
  }, [src])

  // precarga en segundo plano cuando el botón aparece (solo en celulares que comparten archivos)
  useEffect(() => {
    if (!puedeArchivos() || !caja.current) return
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { precargar(); io.disconnect() } }, { rootMargin: '200px' })
    io.observe(caja.current)
    return () => io.disconnect()
  }, [precargar])

  // cerrar el menú al tocar afuera
  useEffect(() => {
    if (!abierto) return
    const f = (e: MouseEvent | TouchEvent) => { if (caja.current && !caja.current.contains(e.target as Node)) setAbierto(false) }
    document.addEventListener('mousedown', f); document.addEventListener('touchstart', f)
    return () => { document.removeEventListener('mousedown', f); document.removeEventListener('touchstart', f) }
  }, [abierto])

  function instagram() {
    // navigator.share se llama sin await previo, dentro del mismo toque (requisito de iPhone/Android)
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean }
    const f = archivo.current
    if (f && nav.canShare && nav.canShare({ files: [f] })) {
      nav.share({ files: [f], title: titulo, text: `${titulo} · OLIVIA Circulab ${link}` })
        .then(() => setAbierto(false))
        .catch((e: Error) => { if (e?.name !== 'AbortError') avisar('No se pudo abrir el menú. Probá de nuevo.') })
      return
    }
    if (puedeArchivos()) { precargar(); avisar('Preparando el video… tocá Instagram de nuevo en un segundo.'); return }
    avisar('Instagram se comparte desde el celular: abrí esta página en tu teléfono y tocá Compartir → Instagram.')
  }
  function copiar() {
    navigator.clipboard?.writeText(link).then(() => { avisar('Link copiado'); setAbierto(false) }).catch(() => avisar(link))
  }

  const pill: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 20, padding: '8px 16px', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.45)', color: accent }
  const item: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 14px', fontSize: 13.5, fontWeight: 700, color: '#eef5f0', background: 'transparent', border: 'none', borderRadius: 10, cursor: 'pointer', textDecoration: 'none', textAlign: 'left', fontFamily: 'inherit' }
  const ico = (bg: string, t: string) => <span style={{ width: 28, height: 28, borderRadius: 8, background: bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: 'white', flexShrink: 0 }}>{t}</span>

  return (
    <div ref={caja} style={{ position: 'relative', textAlign: centrado ? 'center' : 'left' }}>
      <button onClick={() => setAbierto(!abierto)} aria-expanded={abierto} style={pill}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
        Compartir
      </button>
      {abierto && (
        <div role="menu" style={{ position: 'absolute', zIndex: 50, top: 'calc(100% + 8px)', left: centrado ? '50%' : 0, transform: centrado ? 'translateX(-50%)' : 'none', width: 250, background: '#0b1a12', border: '1px solid rgba(134,239,172,0.25)', borderRadius: 14, padding: 6, boxShadow: '0 14px 40px rgba(0,0,0,.45)' }}>
          <a role="menuitem" href={`https://wa.me/?text=${encodeURIComponent(`${mensaje} ${link}`)}`} target="_blank" rel="noopener noreferrer" style={item} onClick={() => setAbierto(false)}>{ico('#25d366', 'W')}WhatsApp</a>
          <button role="menuitem" onClick={instagram} style={item}>{ico('linear-gradient(45deg,#f58529,#dd2a7b,#8134af)', 'IG')}{estado === 'cargando' ? 'Instagram · preparando…' : 'Instagram (historia o post)'}</button>
          <a role="menuitem" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer" style={item} onClick={() => setAbierto(false)}>{ico('#0a66c2', 'in')}LinkedIn</a>
          <button role="menuitem" onClick={copiar} style={item}>{ico('#334155', '🔗')}Copiar link</button>
        </div>
      )}
      {aviso && <div style={{ fontSize: 11.5, color: accent, marginTop: 8 }}>{aviso}</div>}
    </div>
  )
}

export default function VideoBloque({ video, sub = '#6b7280', accent = '#22c55e', mostrarPagina = false, compacto = false }:
  { video: VideoOlivia; sub?: string; accent?: string; mostrarPagina?: boolean; compacto?: boolean }) {
  const [play, setPlay] = useState(false)
  const link = linkDeVideo(video.id)

  return (
    <div id={video.id} style={{ maxWidth: video.vertical ? 380 : (compacto ? 640 : 820), margin: '0 auto', width: '100%', scrollMarginTop: 80 }}>
      <div style={{ position: 'relative', aspectRatio: video.vertical ? '9 / 16' : '16 / 9', borderRadius: 18, overflow: 'hidden', background: '#06110b', boxShadow: '0 12px 40px rgba(0,0,0,.25)' }}>
        {play ? (
          <video src={video.src} poster={video.poster} controls controlsList="nodownload" onContextMenu={e => e.preventDefault()} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <button onClick={() => setPlay(true)} aria-label={`Reproducir ${video.titulo}`} style={{ all: 'unset', cursor: 'pointer', position: 'absolute', inset: 0 }}>
            <img src={video.poster} alt={video.titulo} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 72, height: 72, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(0,0,0,.4)' }}>
              <span style={{ width: 0, height: 0, borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderLeft: '21px solid #04110a', marginLeft: 5 }} />
            </span>
          </button>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 800 }}>{video.titulo}</div>
        <div style={{ fontSize: 12.5, color: sub, lineHeight: 1.6, marginTop: 3 }}>{video.bajada}</div>
        <div style={{ marginTop: 10 }}>
          <BotonesCompartir src={video.src} titulo={video.titulo} texto={video.bajada} link={link} accent={accent} />
          {mostrarPagina && video.pagina && <a href={video.pagina} style={{ display: 'inline-block', marginTop: 10, fontSize: 12, fontWeight: 700, color: accent, textDecoration: 'none' }}>{video.paginaLabel} →</a>}
        </div>
      </div>
    </div>
  )
}
