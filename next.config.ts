import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporal hasta después de la Climatech (9/11/2026): /grandes-emisores tiene afirmaciones
  // sobre EU ETS que no se sostienen. La página queda en el repo; se redirige a /operadores.
  async redirects() {
    return [{ source: '/grandes-emisores', destination: '/operadores', permanent: false }]
  },
  // Headers de seguridad. La CSP va en modo solo reporte hasta después de la Climatech:
  // avisa en la consola del navegador si algo quedaría bloqueado, sin romper nada.
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com",
      "media-src 'self' blob: https:",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "frame-ancestors 'self'",
    ].join('; ')
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(self), geolocation=(self), microphone=(), payment=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        { key: 'Content-Security-Policy-Report-Only', value: csp },
      ],
    }]
  },
};

export default nextConfig;
