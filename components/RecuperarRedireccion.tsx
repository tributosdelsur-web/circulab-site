'use client'
import { useEffect } from 'react'

// Si Supabase manda el link de recuperación a la portada (cuando la URL de destino no está permitida),
// llevamos a la persona a /nueva-contrasena conservando el token.
export default function RecuperarRedireccion() {
  useEffect(() => {
    const { pathname, hash, search } = window.location
    if (pathname === '/nueva-contrasena') return
    const esRecuperacion = hash.includes('type=recovery') || new URLSearchParams(search).get('type') === 'recovery'
    if (esRecuperacion) window.location.replace('/nueva-contrasena' + search + hash)
  }, [])
  return null
}
