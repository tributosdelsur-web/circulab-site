import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alianzas',
  description: 'Sumate a la red que mide y verifica el residuo de Buenos Aires.',
  alternates: { canonical: '/alianzas' },
  openGraph: { title: 'Alianzas · OLIVIA Circulab', description: 'Sumate a la red que mide y verifica el residuo de Buenos Aires.', url: '/alianzas', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
