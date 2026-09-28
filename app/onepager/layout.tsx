import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'One pager',
  description: 'OLIVIA en una página: problema, solución, modelo y ronda.',
  alternates: { canonical: '/onepager' },
  openGraph: { title: 'One pager · OLIVIA Circulab', description: 'OLIVIA en una página: problema, solución, modelo y ronda.', url: '/onepager', images: ['/og-olivia.png'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
