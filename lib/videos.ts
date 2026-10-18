export type VideoOlivia = {
  id: string
  titulo: string
  bajada: string
  src: string
  poster: string
  vertical?: boolean
  pagina?: string
  paginaLabel?: string
}

export const VIDEOS: VideoOlivia[] = [
  { id: 'el-sistema', titulo: 'OLIVIA · El sistema', bajada: 'Constatar, reconocer, medir, invitar y regenerar: cómo funciona OLIVIA en 1:35.', src: '/videos/olivia-el-sistema.mp4', poster: '/videos/olivia-el-sistema-poster.jpg', pagina: '/', paginaLabel: 'Ir al inicio' },
  { id: 'inversores', titulo: 'Para inversores', bajada: 'La capa de datos del orgánico que hoy se entierra. Camino a la certificación, dicho de frente.', src: '/videos/olivia-inversores.mp4', poster: '/videos/olivia-inversores-poster.jpg', pagina: '/inversion', paginaLabel: 'Ver la página para inversores' },
  { id: 'cooperativas', titulo: 'Recuperadores urbanos y cooperativas', bajada: 'El corazón del reciclaje, ahora con dato: cada kilo que mueven, registrado.', src: '/videos/olivia-cooperativas.mp4', poster: '/videos/olivia-cooperativas-poster.jpg', pagina: '/operadores', paginaLabel: 'Ver la página para operadores' },
  { id: 'plantas', titulo: 'Plantas y acopiadores', bajada: 'Capacidad ociosa + orgánico trazado: cada kilo que compostás, verificado.', src: '/videos/olivia-plantas.mp4', poster: '/videos/olivia-plantas-poster.jpg', pagina: '/operadores', paginaLabel: 'Ver la página para plantas' },
  { id: 'grandes-generadores', titulo: 'Consorcios, hoteles y grandes generadores', bajada: 'Separar es el primer paso. Medirlo lo vuelve demostrable.', src: '/videos/olivia-grandes-generadores.mp4', poster: '/videos/olivia-grandes-generadores-poster.jpg', pagina: '/grandes-generadores', paginaLabel: 'Ver la página para grandes generadores' },
  { id: 'vecinos', titulo: 'Para vecinos', bajada: '¿Sabés a dónde va tu bolsa? Separá tu orgánico y que cada kilo cuente.', src: '/videos/olivia-vecinos.mp4', poster: '/videos/olivia-vecinos-poster.jpg', vertical: true, pagina: '/ciudadano', paginaLabel: 'Ver la página para vecinos' },
]

export const videoPorId = (id: string) => VIDEOS.find(v => v.id === id)!

export const SITIO = 'https://oliviacirculab.com.ar'

export const linkDeVideo = (id: string) => `${SITIO}/videos/${id}`

