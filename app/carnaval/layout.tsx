import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carnaval Ambiental',
  description: 'La música de OLIVIA Circulab: sambas y batucada para celebrar que el orgánico vuelve al suelo. Escuchalas, compartilas y sumate al Bloco OLIVIA.',
  alternates: { canonical: '/carnaval' },
  openGraph: { title: 'Carnaval Ambiental · OLIVIA Circulab', description: 'Sambas y batucada para celebrar que el orgánico vuelve al suelo. Sumate al Bloco OLIVIA.', url: '/carnaval', images: ['/videos/olivia-el-sistema-poster.jpg'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
