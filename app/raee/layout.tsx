import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Residuos electrónicos (RAEE)',
  description: 'Trazabilidad de residuos electrónicos: peso por material recuperado y destino final.',
  alternates: { canonical: '/raee' },
  openGraph: { title: 'Residuos electrónicos (RAEE) · OLIVIA Circulab', description: 'Trazabilidad de residuos electrónicos: peso por material recuperado y destino final.', url: '/raee', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
