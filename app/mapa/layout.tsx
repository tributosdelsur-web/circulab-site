import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mapa',
  description: 'Dónde entregar tus residuos en Buenos Aires: puntos verdes, plantas y cooperativas.',
  alternates: { canonical: '/mapa' },
  openGraph: { title: 'Mapa · OLIVIA Circulab', description: 'Dónde entregar tus residuos en Buenos Aires: puntos verdes, plantas y cooperativas.', url: '/mapa', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
