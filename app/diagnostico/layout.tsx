import type { Metadata } from 'next'

const DESC = 'Pesamos el residuo orgánico en su edificio durante 30 días y le entregamos un informe listo para su reporte de sustentabilidad. Precio fijo.'

export const metadata: Metadata = {
  title: 'Diagnóstico de residuos orgánicos en 30 días',
  description: DESC,
  alternates: { canonical: '/diagnostico' },
  openGraph: { title: 'Diagnóstico de residuos orgánicos en 30 días · OLIVIA Circulab', description: DESC, url: '/diagnostico', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
