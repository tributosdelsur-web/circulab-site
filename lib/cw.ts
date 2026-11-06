// Perfiles y eventos de la Climate Week, compartidos por /cw y el admin (pestaña Contactos).
export const PERFILES = [
  { id: 'inversor', icon: '💼', l: 'Inversión o fondo', d: 'Querés conocer la ronda y el plan.', link: '/pitch', linkL: 'Ver el pitch (con registro)', video: '/videos/inversores' },
  { id: 'planta', icon: '🌱', l: 'Planta, compostera o cooperativa', d: 'Recibís o tratás orgánico.', link: '/operadores', linkL: 'Cómo trabajamos con plantas', video: '/videos/plantas' },
  { id: 'generador', icon: '🏨', l: 'Hotel, empresa o gran generador', d: 'Generás orgánico y querés mostrar a dónde va.', link: '/grandes-generadores', linkL: 'Cómo medimos tu orgánico', video: '/videos/grandes-generadores' },
  { id: 'consorcio', icon: '🏢', l: 'Consorcio o administración', d: 'Diagnóstico de dos semanas, sin costo.', link: '/consorcios', linkL: 'Ver el diagnóstico', video: '/videos/grandes-generadores' },
  { id: 'institucion', icon: '🏛️', l: 'Gobierno, institución u ONG', d: 'Programas, datos o alianzas.', link: '/institucional', linkL: 'OLIVIA para instituciones', video: '/videos/el-sistema' },
  { id: 'otro', icon: '✨', l: 'Prensa, academia u otro', d: 'Contanos qué te interesa.', link: '/', linkL: 'Conocer OLIVIA', video: '/videos/el-sistema' },
]

export const EVENTOS = [
  { id: 'carbono', l: 'Mercados de carbono · Women in Carbon (11/11)' },
  { id: 'apertura', l: 'Apertura Climate Week (11/11)' },
  { id: 'picadero', l: '4ta Conferencia Climatech · Picadero (12/11)' },
  { id: 'tonelada', l: 'Tonelada Justa (12/11)' },
  { id: 'demoday', l: 'Demo Day Alimentos · Ciudad y COPAL (13/11)' },
  { id: 'meetup', l: 'Meet Up Sostenibilidad Digital (13/11)' },
  { id: 'otro', l: 'Otro lugar' },
]

export const etiquetaPerfil = (id?: string | null) => PERFILES.find(x => x.id === id)?.l || id || 'Otro'
export const etiquetaEvento = (id?: string | null) => EVENTOS.find(x => x.id === id)?.l || id || '—'
