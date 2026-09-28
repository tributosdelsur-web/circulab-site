import type { Metadata } from 'next'
import './globals.css'

const descripcion = 'La capa de datos para las plantas que tratan el orgánico: balanza conectada, remito digital y tratamiento verificado. Medición verificable del residuo que hoy se entierra.'

export const metadata: Metadata = {
  metadataBase: new URL('https://oliviacirculab.com.ar'),
  title: { default: 'OLIVIA Circulab · Medición verificable de residuos', template: '%s · OLIVIA Circulab' },
  description: descripcion,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'OLIVIA Circulab',
    title: 'OLIVIA Circulab · Medición verificable de residuos',
    description: descripcion,
    url: '/',
    images: [{ url: '/og-olivia.png', width: 1200, height: 630, alt: 'OLIVIA Circulab · La capa de datos para las plantas que tratan el orgánico' }],
  },
  twitter: { card: 'summary_large_image', title: 'OLIVIA Circulab', description: descripcion, images: ['/og-olivia.png'] },
}

const organizacion = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OLIVIA Circulab',
  alternateName: 'Circulab Tech',
  url: 'https://oliviacirculab.com.ar',
  logo: 'https://oliviacirculab.com.ar/logoOC.png',
  email: 'hola@oliviacirculab.com.ar',
  description: descripcion,
  areaServed: 'Buenos Aires, Argentina',
  sameAs: ['https://www.linkedin.com/company/113160128/'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacion) }} />
        {children}
      </body>
    </html>
  )
}
