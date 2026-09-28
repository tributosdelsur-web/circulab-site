import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inversores',
  description: 'OLIVIA Circulab: medición y verificación de residuos para plantas y grandes generadores. La ronda, el equipo y la hoja de ruta.',
  alternates: { canonical: '/institucional' },
  openGraph: { title: 'Inversores · OLIVIA Circulab', description: 'OLIVIA Circulab: medición y verificación de residuos para plantas y grandes generadores. La ronda, el equipo y la hoja de ruta.', url: '/institucional', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
