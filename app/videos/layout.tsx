import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Los videos de OLIVIA Circulab: el sistema, para inversores, cooperativas, plantas, grandes generadores y vecinos. Miralos y compartilos.',
  alternates: { canonical: '/videos' },
  openGraph: { title: 'Videos · OLIVIA Circulab', description: 'Los videos de OLIVIA Circulab para cada actor del circuito del orgánico. Miralos y compartilos.', url: '/videos', images: ['/videos/olivia-el-sistema-poster.jpg'] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
