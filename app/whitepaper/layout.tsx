import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Whitepaper',
  description: 'Documento técnico de OLIVIA Circulab: arquitectura dMRV, metodologías y proyecciones.',
  alternates: { canonical: '/whitepaper' },
  openGraph: { title: 'Whitepaper · OLIVIA Circulab', description: 'Documento técnico de OLIVIA Circulab: arquitectura dMRV, metodologías y proyecciones.', url: '/whitepaper', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
