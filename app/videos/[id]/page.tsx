import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { VIDEOS } from '../../../lib/videos'
import Vista from './Vista'

export function generateStaticParams() {
  return VIDEOS.map(v => ({ id: v.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const v = VIDEOS.find(x => x.id === id)
  if (!v) return {}
  const titulo = `${v.titulo} · OLIVIA Circulab`
  return {
    title: v.titulo,
    description: v.bajada,
    alternates: { canonical: `/videos/${v.id}` },
    openGraph: {
      title: titulo, description: v.bajada, url: `/videos/${v.id}`, type: 'video.other',
      images: [{ url: v.poster, width: v.vertical ? 720 : 1280, height: v.vertical ? 1280 : 720, alt: v.titulo }],
      videos: [{ url: v.src, type: 'video/mp4', width: v.vertical ? 720 : 1280, height: v.vertical ? 1280 : 720 }],
    },
    twitter: { card: 'summary_large_image', title: titulo, description: v.bajada, images: [v.poster] },
  }
}

export default async function VideoPagina({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!VIDEOS.some(v => v.id === id)) notFound()
  return <Vista id={id} />
}
