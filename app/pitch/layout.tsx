import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pitch',
  description: 'Presentación de OLIVIA Circulab para inversores.',
  alternates: { canonical: '/pitch' },
  openGraph: { title: 'Pitch · OLIVIA Circulab', description: 'Presentación de OLIVIA Circulab para inversores.', url: '/pitch', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
