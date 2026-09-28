import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kits',
  description: 'Kits de separación para hogares, edificios y empresas.',
  alternates: { canonical: '/kits' },
  openGraph: { title: 'Kits · OLIVIA Circulab', description: 'Kits de separación para hogares, edificios y empresas.', url: '/kits', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
