import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporal hasta después de la Climatech (9/11/2026): /grandes-emisores tiene afirmaciones
  // sobre EU ETS que no se sostienen. La página queda en el repo; se redirige a /operadores.
  async redirects() {
    return [{ source: '/grandes-emisores', destination: '/operadores', permanent: false }]
  },
};

export default nextConfig;
