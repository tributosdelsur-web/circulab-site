import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consorcios',
  description: 'Diagnóstico sin costo de dos semanas: medimos el orgánico de tu edificio, lo llevamos a compostaje y te dejamos el informe para la asamblea.',
  alternates: { canonical: '/consorcios' },
  openGraph: { title: 'Consorcios · OLIVIA Circulab', description: 'Diagnóstico sin costo de dos semanas: medimos el orgánico de tu edificio, lo llevamos a compostaje y te dejamos el informe para la asamblea.', url: '/consorcios', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
