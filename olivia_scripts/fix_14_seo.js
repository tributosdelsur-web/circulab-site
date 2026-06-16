// SCRIPT 14 — SEO completo: meta tags, OG, favicon, sitemap, robots.txt
const fs = require('fs');
const path = require('path');

// ═══ 1. Layout raíz con meta tags globales ═══
const layoutPath = 'app/layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf8');

if (!layout.includes('openGraph')) {
  // Reemplazar el metadata existente con uno completo
  const metadataCompleta = `export const metadata: Metadata = {
  title: {
    default: 'OLIVIA Circulab · Infraestructura dMRV para residuos urbanos',
    template: '%s | OLIVIA Circulab',
  },
  description: 'Convertimos residuos urbanos en créditos de carbono verificados con IA. SaaS para consorcios, hoteles, empresas RSE y grandes emisores. Verra VCS 2027. Buenos Aires AI District.',
  keywords: [
    'creditos de carbono', 'reciclaje Buenos Aires', 'dMRV', 'carbon credits LATAM',
    'economia circular Argentina', 'Verra VCS', 'ESG reporting', 'CleanTech LATAM',
    'OLIVIA Circulab', 'Circulab Tech', 'Metamorfosis', 'residuos organicos',
    'bonos de carbono', 'smart carbon', 'AI environment', 'Ley 27506'
  ],
  authors: [{ name: 'Circulab Tech', url: 'https://oliviacirculab.com.ar' }],
  creator: 'Circulab Tech',
  publisher: 'Circulab Tech',
  metadataBase: new URL('https://oliviacirculab.com.ar'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    alternateLocale: 'en_US',
    url: 'https://oliviacirculab.com.ar',
    siteName: 'OLIVIA Circulab',
    title: 'OLIVIA Circulab · Residuos en créditos de carbono verificados con IA',
    description: 'La primera infraestructura dMRV ciudadana de América Latina. SaaS para consorcios + créditos de carbono Verra VCS. Ronda Seed abierta.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OLIVIA Circulab · Infraestructura dMRV LATAM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OLIVIA Circulab · Residuos en créditos de carbono con IA',
    description: 'La primera infraestructura dMRV ciudadana de América Latina.',
    images: ['/og-image.png'],
    creator: '@oliviacirculab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logoOC.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logoOC.png' },
    ],
    shortcut: '/logoOC.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: '',
  },
}`;

  // Reemplazar metadata existente
  layout = layout.replace(
    /export const metadata[^;]+;/s,
    metadataCompleta
  );

  // Asegurar que Metadata está importado
  if (!layout.includes("import type { Metadata }")) {
    layout = layout.replace(
      "import type { Metadata } from 'next'",
      "import type { Metadata } from 'next'"
    );
    if (!layout.includes("import type { Metadata }")) {
      layout = layout.replace(
        "'use client'",
        "import type { Metadata } from 'next'\n'use client'"
      );
    }
  }

  fs.writeFileSync(layoutPath, layout);
  console.log('OK layout.tsx: metadata completa con OG y Twitter cards');
} else {
  console.log('-- layout.tsx: ya tiene openGraph');
}

// ═══ 2. robots.txt ═══
const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /api/

Sitemap: https://oliviacirculab.com.ar/sitemap.xml
`;
fs.writeFileSync('public/robots.txt', robotsTxt);
console.log('OK robots.txt creado');

// ═══ 3. sitemap.xml ═══
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://oliviacirculab.com.ar</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/ciudadano</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/institucional</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/metamorfosis</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/simulador</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/comunidad</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/terminos</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://oliviacirculab.com.ar/privacidad</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`;
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('OK sitemap.xml creado');

// ═══ 4. manifest.json para PWA ═══
const manifest = {
  name: 'OLIVIA Circulab',
  short_name: 'OLIVIA',
  description: 'Infraestructura dMRV para residuos urbanos · Créditos de carbono verificados con IA',
  start_url: '/',
  display: 'standalone',
  background_color: '#0a0e1a',
  theme_color: '#22c55e',
  icons: [
    { src: '/logoOC.png', sizes: '192x192', type: 'image/png' },
    { src: '/logoOC.png', sizes: '512x512', type: 'image/png' },
  ],
};
fs.writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2));
console.log('OK manifest.json creado (PWA)');

// ═══ 5. Meta tags por página individual ═══
// Agregar generateMetadata en páginas clave
const metasPorPagina = [
  {
    archivo: 'app/ciudadano/page.tsx',
    titulo: 'Ciudadano OLIVIA · Ganá OLV reciclando · Créditos de carbono 2027',
    descripcion: 'Registrá tus residuos, acumulá OLV Verdes verificados con IA y convertílos en dinero real cuando Verra certifique en 2027. Gratis. Sin inversión.',
  },
  {
    archivo: 'app/institucional/page.tsx',
    titulo: 'Inversores · OLIVIA Circulab · Ronda Seed USD 500K abierta',
    descripcion: 'Primera infraestructura dMRV ciudadana de LATAM. SaaS B2B para consorcios + créditos de carbono Verra VCS. USD 0 inversión externa. Ley 27.506.',
  },
  {
    archivo: 'app/simulador/page.tsx',
    titulo: 'Simulador · Calculá tu impacto en OLIVIA Circulab',
    descripcion: 'Calculá cuántos OLV generás y cuánto valen en Árbol 2027 según tu perfil: casa, edificio, barrio o zona.',
  },
];

metasPorPagina.forEach(({ archivo, titulo, descripcion }) => {
  if (!fs.existsSync(archivo)) return;
  let contenido = fs.readFileSync(archivo, 'utf8');

  // Solo agregar si no tiene metadata propia
  if (!contenido.includes('generateMetadata') && !contenido.includes("export const metadata")) {
    const metaExport = `
// SEO metadata
export const metadata = {
  title: '${titulo}',
  description: '${descripcion}',
  openGraph: {
    title: '${titulo}',
    description: '${descripcion}',
    url: 'https://oliviacirculab.com.ar${archivo.replace('app', '').replace('/page.tsx', '')}',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

`;
    // Insertar antes del 'use client' o del export default
    if (contenido.startsWith("'use client'")) {
      contenido = contenido.replace("'use client'\n", "'use client'\n" + metaExport);
    } else {
      contenido = metaExport + contenido;
    }
    fs.writeFileSync(archivo, contenido);
    console.log('OK Meta tags agregados en ' + archivo);
  } else {
    console.log('-- ' + archivo + ': ya tiene metadata');
  }
});

// ═══ 6. Crear OG image placeholder ═══
// Nota: la imagen OG real hay que crearla manualmente con Figma o Canva
// Aquí creamos un SVG básico que funciona como fallback
const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0e1a"/>
  <rect x="80" y="80" width="4" height="470" fill="#22c55e"/>
  <text x="120" y="200" font-family="system-ui" font-size="72" font-weight="900" fill="#f1f5f9">OLIVIA</text>
  <text x="120" y="280" font-family="system-ui" font-size="72" font-weight="900" fill="#22c55e">Circulab</text>
  <text x="120" y="370" font-family="system-ui" font-size="28" fill="#64748b">Infraestructura dMRV · Residuos en créditos de carbono</text>
  <text x="120" y="420" font-family="system-ui" font-size="24" fill="#64748b">verificados con IA · Verra VCS 2027 · Buenos Aires</text>
  <text x="120" y="530" font-family="system-ui" font-size="20" fill="#22c55e">oliviacirculab.com.ar</text>
  <text x="120" y="560" font-family="system-ui" font-size="16" fill="#334155">✅ Verra validó dMRV · Feb 2026 · Ronda Seed abierta · Ley 27.506</text>
</svg>`;
fs.writeFileSync('public/og-image.svg', ogSvg);
console.log('OK og-image.svg creado (reemplazar por PNG 1200x630 real)');

// ═══ 7. Página 404 personalizada ═══
const notFoundPath = 'app/not-found.tsx';
if (!fs.existsSync(notFoundPath)) {
  const notFound = `import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:24,padding:24,fontFamily:'system-ui'}}>
      <img src="/logoOC.png" alt="OLIVIA" style={{width:64,height:64,objectFit:'contain',borderRadius:12}} />
      <div style={{fontSize:80,fontWeight:900,color:'rgba(34,197,94,0.2)',lineHeight:1}}>404</div>
      <div style={{fontSize:22,fontWeight:800,color:'#f1f5f9',textAlign:'center'}}>
        Esta página no existe
      </div>
      <div style={{fontSize:14,color:'#64748b',textAlign:'center',maxWidth:400,lineHeight:1.7}}>
        Quizás el link está roto o la página fue movida.
        No pasa nada — el planeta sigue esperando.
      </div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
        <Link href="/" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:30,padding:'12px 24px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
          Volver al inicio
        </Link>
        <Link href="/ciudadano" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:30,padding:'12px 24px',color:'#f1f5f9',fontSize:13,fontWeight:700,textDecoration:'none'}}>
          Ir a Ciudadano
        </Link>
      </div>
      <div style={{fontSize:10,color:'#334155',fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.1em'}}>
        © 2026 Circulab Tech · oliviacirculab.com.ar
      </div>
    </div>
  )
}
`;
  fs.writeFileSync(notFoundPath, notFound);
  console.log('OK app/not-found.tsx creado');
} else {
  console.log('-- 404: ya existe');
}

console.log('');
console.log('Script 14 completado · SEO completo');
console.log('PENDIENTE MANUAL:');
console.log('  · Crear og-image.png real (1200x630) en Canva o Figma');
console.log('    con logo OLIVIA + texto + fondo oscuro verde');
console.log('    y subir a public/og-image.png');
console.log('  · Agregar Google Search Console ID en layout.tsx');
console.log('    verification.google: "tu-id-aqui"');
