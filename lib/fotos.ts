// Utilidades de imagen del lado del navegador.

// Achica la foto antes de subirla: con datos móviles en un evento, 3–8 MB por foto fallan o tardan.
// Devuelve un JPEG de hasta `max` px de lado. Si algo falla, devuelve el archivo original.
export async function comprimirImagen(file: File, max = 1600, calidad = 0.8): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  try {
    const url = URL.createObjectURL(file)
    const img = await new Promise<HTMLImageElement>((ok, mal) => {
      const i = new Image()
      i.onload = () => ok(i)
      i.onerror = mal
      i.src = url
    })
    const escala = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight))
    const w = Math.round(img.naturalWidth * escala)
    const h = Math.round(img.naturalHeight * escala)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
    URL.revokeObjectURL(url)
    const blob = await new Promise<Blob | null>(ok => canvas.toBlob(ok, 'image/jpeg', calidad))
    if (!blob || blob.size >= file.size) return file
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' })
  } catch {
    return file
  }
}

function cargar(src: string) {
  return new Promise<HTMLImageElement>((ok, mal) => {
    const i = new Image()
    i.crossOrigin = 'anonymous'
    i.onload = () => ok(i)
    i.onerror = mal
    i.src = src
  })
}

// Imagen vertical 1080x1920 para historia o reel de Instagram y estado de WhatsApp:
// la foto del pesaje + el dato + la marca de OLIVIA.
export async function crearImagenHistoria(fotoDataUrl: string, kg: number, tipo: string, evento?: string): Promise<File | null> {
  try {
    const W = 1080, H = 1920
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const c = canvas.getContext('2d')!
    // Fondo
    const g = c.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0, '#06110b')
    g.addColorStop(1, '#0b1d13')
    c.fillStyle = g
    c.fillRect(0, 0, W, H)

    // Foto recortada al centro, con bordes redondeados
    const foto = await cargar(fotoDataUrl)
    const fx = 70, fy = 330, fw = W - 140, fh = 1060
    const esc = Math.max(fw / foto.naturalWidth, fh / foto.naturalHeight)
    const sw = fw / esc, sh = fh / esc
    const sx = (foto.naturalWidth - sw) / 2, sy = (foto.naturalHeight - sh) / 2
    c.save()
    c.beginPath()
    const r = 48
    c.moveTo(fx + r, fy); c.arcTo(fx + fw, fy, fx + fw, fy + fh, r); c.arcTo(fx + fw, fy + fh, fx, fy + fh, r)
    c.arcTo(fx, fy + fh, fx, fy, r); c.arcTo(fx, fy, fx + fw, fy, r); c.closePath()
    c.clip()
    c.drawImage(foto, sx, sy, sw, sh, fx, fy, fw, fh)
    c.restore()

    // Logo y marca arriba
    try {
      const logo = await cargar('/logoOC.png')
      c.drawImage(logo, 70, 110, 140, 140)
    } catch {}
    c.fillStyle = '#eef5f0'
    c.font = '800 58px Inter, system-ui, sans-serif'
    c.fillText('OLIVIA Circulab', 240, 175)
    c.fillStyle = '#a9bcb0'
    c.font = '500 38px Inter, system-ui, sans-serif'
    c.fillText(evento || 'Pesaje en vivo', 240, 230)

    // Dato
    const kgTxt = kg < 1 ? `${Math.round(kg * 1000)} g` : `${kg.toLocaleString('es-AR', { maximumFractionDigits: 1 })} kg`
    c.fillStyle = '#22c55e'
    c.font = '900 120px Inter, system-ui, sans-serif'
    c.fillText(kgTxt, 70, 1560)
    c.fillStyle = '#eef5f0'
    c.font = '700 52px Inter, system-ui, sans-serif'
    c.fillText(`de ${tipo.toLowerCase()} que no van al relleno`, 70, 1640)
    c.fillStyle = '#a9bcb0'
    c.font = '500 40px Inter, system-ui, sans-serif'
    c.fillText('Medido y registrado a mi nombre.', 70, 1710)

    // Pie
    c.fillStyle = '#22c55e'
    c.font = '800 46px Inter, system-ui, sans-serif'
    c.fillText('oliviacirculab.com.ar', 70, 1830)

    const blob = await new Promise<Blob | null>(ok => canvas.toBlob(ok, 'image/jpeg', 0.9))
    if (!blob) return null
    return new File([blob], 'olivia-pesaje.jpg', { type: 'image/jpeg' })
  } catch {
    return null
  }
}
