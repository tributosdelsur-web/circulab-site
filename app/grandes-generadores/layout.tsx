import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grandes generadores',
  description: 'Registro verificable y diagnóstico con balanza portátil para grandes generadores de residuos de Buenos Aires.',
  alternates: { canonical: '/grandes-generadores' },
  openGraph: { title: 'Grandes generadores · OLIVIA Circulab', description: 'Registro verificable y diagnóstico con balanza portátil para grandes generadores de residuos de Buenos Aires.', url: '/grandes-generadores', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
