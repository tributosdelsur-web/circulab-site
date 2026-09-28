import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Balanza conectada',
  description: 'Cómo funciona la balanza de OLIVIA: firma cada peso en el equipo y lo envía al celular del operario. Un dato que un auditor puede verificar.',
  alternates: { canonical: '/balanza' },
  openGraph: { title: 'Balanza conectada · OLIVIA Circulab', description: 'Cómo funciona la balanza de OLIVIA: firma cada peso en el equipo y lo envía al celular del operario. Un dato que un auditor puede verificar.', url: '/balanza', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
