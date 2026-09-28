import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Orgánicos',
  description: 'Medición y trazabilidad del residuo orgánico, desde que se separa hasta que se composta.',
  alternates: { canonical: '/organicos' },
  openGraph: { title: 'Orgánicos · OLIVIA Circulab', description: 'Medición y trazabilidad del residuo orgánico, desde que se separa hasta que se composta.', url: '/organicos', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
