'use client'
import { useState } from 'react'

export type VideoOlivia = {
  id: string
  titulo: string
  bajada: string
  src: string
  poster: string
  vertical?: boolean
  pagina?: string
  paginaLabel?: string
}

export const VIDEOS: VideoOlivia[] = [
  { id: 'el-sistema', titulo: 'OLIVIA · El sistema', bajada: 'Constatar, reconocer, medir, invitar y regenerar: cómo funciona OLIVIA en 1:35.', src: '/videos/olivia-el-sistema.mp4', poster: '/videos/olivia-el-sistema-poster.jpg', pagina: '/', paginaLabel: 'Ir al inicio' },
  { id: 'inversores', titulo: 'Para inversores', bajada: 'La capa de datos del orgánico que hoy se entierra. Camino a la certificación, dicho de frente.', src: '/videos/olivia-inversores.mp4', poster: '/videos/olivia-inversores-poster.jpg', pagina: '/inversion', paginaLabel: 'Ver la página para inversores' },
  { id: 'cooperativas', titulo: 'Recuperadores urbanos y cooperativas', bajada: 'El corazón del reciclaje, ahora con dato: cada kilo que mueven, registrado.', src: '/videos/olivia-cooperativas.mp4', poster: '/videos/olivia-cooperativas-poster.jpg', pagina: '/operadores', paginaLabel: 'Ver la página para operadores' },
  { id: 'plantas', titulo: 'Plantas y acopiadores', bajada: 'Capacidad ociosa + orgánico trazado: cada kilo que compostás, verificado.', src: '/videos/olivia-plantas.mp4', poster: '/videos/olivia-plantas-poster.jpg', pagina: '/operadores', paginaLabel: 'Ver la página para plantas' },
  { id: 'grandes-generadores', titulo: 'Consorcios, hoteles y grandes generadores', bajada: 'Separar es el primer paso. Medirlo lo vuelve demostrable.', src: '/videos/olivia-grandes-generadores.mp4', poster: '/videos/olivia-grandes-generadores-poster.jpg', pagina: '/grandes-generadores', paginaLabel: 'Ver la página para grandes generadores' },
  { id: 'vecinos', titulo: 'Para vecinos', bajada: '¿Sabés a dónde va tu bolsa? Separá tu orgánico y que cada kilo cuente.', src: '/videos/olivia-vecinos.mp4', poster: '/videos/olivia-vecinos-poster.jpg', vertical: true, pagina: '/ciudadano', paginaLabel: 'Ver la página para vecinos' },
]

export const videoPorId = (id: string) => VIDEOS.find(v => v.id === id)!

const SITIO = 'https://oliviacirculab.com.ar'

function linkDe(v: VideoOlivia) { return `${SITIO}/videos#${v.id}` }

export default function VideoBloque({ video, sub = '#6b7280', accent = '#22c55e', mostrarPagina = false, compacto = false }:
  { video: VideoOlivia; sub?: string; accent?: string; mostrarPagina?: boolean; compacto?: boolean }) {
  const [play, setPlay] = useState(false)
  const [aviso, setAviso] = useState('')
  const link = linkDe(video)
  const textoWa = `${video.titulo} · OLIVIA Circulab — ${video.bajada} ${link}`

  const avisar = (s: string) => { setAviso(s); setTimeout(() => setAviso(''), 2600) }

  async function compartir() {
    const nav: any = typeof navigator !== 'undefined' ? navigator : null
    try {
      if (nav?.share && nav?.canShare) {
        const r = await fetch(video.src)
        const blob = await r.blob()
        const file = new File([blob], `${video.id}-olivia.mp4`, { type: 'video/mp4' })
        if (nav.canShare({ files: [file] })) {
          await nav.share({ files: [file], title: video.titulo, text: `${video.titulo} · OLIVIA Circulab ${link}` })
          return
        }
      }
      if (nav?.share) { await nav.share({ title: video.titulo, text: video.bajada, url: link }); return }
      await nav?.clipboard?.writeText(link)
      avisar('Link copiado. Para subirlo a Instagram, abrí esta página desde el celular.')
    } catch (e: any) {
      if (e?.name !== 'AbortError') {
        try { await nav?.clipboard?.writeText(link); avisar('Link copiado') } catch { /* nada */ }
      }
    }
  }

  const boton: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid rgba(34,197,94,.45)', borderRadius: 20, padding: '7px 13px', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: accent, textDecoration: 'none', whiteSpace: 'nowrap' }

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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
          <a href={`https://wa.me/?text=${encodeURIComponent(textoWa)}`} target="_blank" rel="noopener noreferrer" style={boton}>WhatsApp</a>
          <button onClick={compartir} style={boton}>Instagram (historia o post)</button>
          {mostrarPagina && video.pagina && <a href={video.pagina} style={{ ...boton, border: 'none', padding: '7px 4px' }}>{video.paginaLabel} →</a>}
        </div>
        {aviso && <div style={{ fontSize: 11.5, color: accent, marginTop: 8 }}>{aviso}</div>}
      </div>
    </div>
  )
}
