import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consorcios',
  description: 'Registro verificable de la gestión de residuos de tu edificio, desde el celular del encargado.',
  alternates: { canonical: '/consorcios' },
  openGraph: { title: 'Consorcios · OLIVIA Circulab', description: 'Registro verificable de la gestión de residuos de tu edificio, desde el celular del encargado.', url: '/consorcios', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
