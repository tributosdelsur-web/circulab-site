import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metamorfosis',
  description: 'La vertical de OLIVIA para el orgánico de ferias, verdulerías y vecinos.',
  alternates: { canonical: '/metamorfosis' },
  openGraph: { title: 'Metamorfosis · OLIVIA Circulab', description: 'La vertical de OLIVIA para el orgánico de ferias, verdulerías y vecinos.', url: '/metamorfosis', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
