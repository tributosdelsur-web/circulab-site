import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulador',
  description: 'Calculá cuántos kilos podés separar y registrar con OLIVIA.',
  alternates: { canonical: '/simulador' },
  openGraph: { title: 'Simulador · OLIVIA Circulab', description: 'Calculá cuántos kilos podés separar y registrar con OLIVIA.', url: '/simulador', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
