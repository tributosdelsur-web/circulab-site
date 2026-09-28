import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipo',
  description: 'Quiénes construyen OLIVIA Circulab.',
  alternates: { canonical: '/equipo' },
  openGraph: { title: 'Equipo · OLIVIA Circulab', description: 'Quiénes construyen OLIVIA Circulab.', url: '/equipo', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
