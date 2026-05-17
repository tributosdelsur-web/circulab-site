import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Circulab Tech | Motor de Confianza Ciudadana',
  description: 'Validamos actos de responsabilidad con IA para convertirlos en activos reales.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
