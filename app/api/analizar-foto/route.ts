import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { foto_url } = await req.json()

    const imgResponse = await fetch(foto_url)
    const imgBuffer = await imgResponse.arrayBuffer()
    const base64 = Buffer.from(imgBuffer).toString('base64')

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: 'image/jpeg', data: base64 } },
              {
                text: `Mirá esta foto de residuos y respondé con un JSON. Solo JSON, nada más.
Formato: {"tipo":"organico","separado":true,"kg":1.5,"moneda":true,"mezcla":false,"foto":"buena","accion":"VALIDAR","nota":"descripcion","certeza":"alta"}`
              }
            ]
          }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 200 }
        })
      }
    )

    const data = await response.json()
    const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    
    // Extraer JSON de cualquier formato
    const match = texto.match(/\{[\s\S]*\}/)
    if (!match) {
      return NextResponse.json({
        tipo_detectado: 'no detectado',
        separacion_correcta: false,
        peso_estimado_kg: 0,
        moneda_referencia: false,
        contaminantes: false,
        calidad_foto: 'regular',
        recomendacion: 'REVISAR',
        observaciones: texto || 'Sin respuesta de IA',
        confianza: 'baja'
      })
    }

    const parsed = JSON.parse(match[0])
    return NextResponse.json({
      tipo_detectado: parsed.tipo || parsed.tipo_detectado || 'organico',
      separacion_correcta: parsed.separado ?? parsed.separacion_correcta ?? false,
      peso_estimado_kg: parsed.kg || parsed.peso_estimado_kg || 0,
      moneda_referencia: parsed.moneda ?? parsed.moneda_referencia ?? false,
      contaminantes: parsed.mezcla ?? parsed.contaminantes ?? false,
      calidad_foto: parsed.foto || parsed.calidad_foto || 'regular',
      recomendacion: parsed.accion || parsed.recomendacion || 'REVISAR',
      observaciones: parsed.nota || parsed.observaciones || '',
      confianza: parsed.certeza || parsed.confianza || 'media'
    })

  } catch(e: any) {
    return NextResponse.json({
      tipo_detectado: 'error',
      separacion_correcta: false,
      peso_estimado_kg: 0,
      moneda_referencia: false,
      contaminantes: false,
      calidad_foto: 'mala',
      recomendacion: 'REVISAR',
      observaciones: 'Error: ' + e.message,
      confianza: 'baja'
    })
  }
}
