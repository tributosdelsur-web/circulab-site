import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plantas y acopiadores',
  description: 'Balanza conectada y registro digital para plantas, cooperativas y acopiadores que ya procesan residuos. Medimos lo que ya hacen.',
  alternates: { canonical: '/operadores' },
  openGraph: { title: 'Plantas y acopiadores · OLIVIA Circulab', description: 'Balanza conectada y registro digital para plantas, cooperativas y acopiadores que ya procesan residuos. Medimos lo que ya hacen.', url: '/operadores', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
