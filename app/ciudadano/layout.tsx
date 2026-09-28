import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vecinos',
  description: 'Separá, registrá y seguí tus residuos hasta la planta con OLIVIA.',
  alternates: { canonical: '/ciudadano' },
  openGraph: { title: 'Vecinos · OLIVIA Circulab', description: 'Separá, registrá y seguí tus residuos hasta la planta con OLIVIA.', url: '/ciudadano', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
