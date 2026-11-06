import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Climate Week Argentina',
  description: 'Medimos el orgánico que Buenos Aires entierra, kilo por kilo. Dejanos tus datos y te escribimos.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
