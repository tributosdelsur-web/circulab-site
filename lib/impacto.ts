// Única fuente de verdad para OLV, CO₂ y puntos de actividad.
//
// · OLV: registro ambiental de peso. Solo cuentan los kilos VALIDADOS por el admin
//   (entregados en planta y con certificado). Sin valor monetario. Nunca salen de actividad en redes.
// · CO₂eq: solo orgánico, con el factor declarado del whitepaper (0,8 kg CO₂eq por kilo que no va a relleno;
//   el bruto teórico con los valores por defecto del IPCC ronda 1,4). Para otros materiales no publicamos cifra
//   hasta tener fuente.
// · Puntos de actividad (PULSO): participación (registrarse, registrar, publicar, comentar, likes). Los asigna
//   la base de datos con montos fijos y topes (función sumar_puntos), no el navegador.

export const OLV_POR_KG: Record<string, number> = {
  organico: 180, plastico: 150, papel: 90, vidrio: 30, metal: 800, aceite: 250, textil: 550,
}

export const FACTOR_CO2_ORGANICO = 0.8

export const NOTA_CO2 =
  'Estimación declarada: 0,8 kg CO₂eq por kilo de orgánico validado que no va a relleno (factor conservador, ver whitepaper). No es un crédito de carbono.'

type Residuo = { kg: number | string; tipo: string; status?: string; notas?: string | null }

export const olvDe = (r: Residuo) => Math.round(Number(r.kg || 0) * (OLV_POR_KG[r.tipo] ?? 0))
export const co2De = (r: Residuo) => (r.tipo === 'organico' ? Number(r.kg || 0) * FACTOR_CO2_ORGANICO : 0)

export const validados = <T extends Residuo>(rs: T[]) => rs.filter(r => r.status === 'validado')
export const enProceso = <T extends Residuo>(rs: T[]) => rs.filter(r => r.status === 'pendiente' || r.status === 'en_camino')

// El admin guarda el link del certificado en las notas del registro.
export function certificadoDe(r: Residuo): string | null {
  return String(r.notas || '').match(/Compost certificado[^:]*:\s*(https:\/\/\S+)/)?.[1] || null
}

export const esPesajeEnVivo = (r: Residuo & { punto_entrega?: string | null }) =>
  r.punto_entrega === 'Pesaje en vivo OLIVIA' || String(r.notas || '').includes('Pesaje en vivo')

export const NIVELES = [
  { min: 0, n: 'Semilla' }, { min: 100, n: 'Brote' }, { min: 500, n: 'Raíz' }, { min: 1500, n: 'Árbol' },
]

// Puntos de actividad. Montos y topes viven en la base (supabase/tokens.sql); esto es solo para mostrarlos.
export const PUNTOS: Record<string, number> = {
  bienvenida: 100, registro: 10, post: 10, post_registro: 20, story: 10, comentario: 5, like_recibido: 2,
}

// Colores de los OLV.
// · Verdes: solo orgánico. Es el único material que entra en el proyecto de carbono (metano evitado en relleno);
//   si ese proyecto se certifica bajo Verra, podrían llegar a tener valor. Hoy no lo tienen.
// · Amarillos: el resto de los materiales y los puntos de actividad. No entran en el proyecto de carbono.
export const VERDE = '#22c55e'
export const AMARILLO = '#eab308'
export const esVerde = (r: { tipo: string }) => r.tipo === 'organico'
export const colorDe = (r: { tipo: string }) => (esVerde(r) ? VERDE : AMARILLO)

export const TEXTO_VERDES =
  'Salen solo de orgánico validado: pesado, entregado en la planta y con certificado de compost. Es el único material que entra en un proyecto de carbono (metano que no se genera en el relleno). Si OLIVIA certifica ese proyecto bajo Verra, estos registros podrían llegar a tener valor. No es una promesa ni tiene fecha: hoy no tienen valor monetario.'
export const TEXTO_AMARILLOS =
  'Plástico, papel, vidrio, metal, aceite y textil validados. Muestran lo que separaste, pero no entran en el proyecto de carbono: no van a tener valor monetario. Los puntos de actividad también son amarillos.'
