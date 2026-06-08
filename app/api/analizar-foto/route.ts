import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { foto_url } = await req.json()

    const imgResponse = await fetch(foto_url)
    const imgBuffer = await imgResponse.arrayBuffer()
    const base64 = Buffer.from(imgBuffer).toString('base64')
    const contentType = imgResponse.headers.get('content-type') || 'image/jpeg'

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: contentType, data: base64 } },
              { text: `Analizá esta imagen de residuos domiciliarios argentinos. Respondé SOLO con este JSON sin markdown ni texto extra:
{"tipo_detectado":"organico","separacion_correcta":true,"peso_estimado_kg":0.5,"moneda_referencia":true,"contaminantes":false,"calidad_foto":"buena","recomendacion":"VALIDAR","observaciones":"residuos organicos detectados","confianza":"alta"}` }
            ]
          }],
          generationConfig: { temperature: 0, maxOutputTokens: 200 }
        })
      }
    )

    const data = await response.json()
    if(data.error) {
      return NextResponse.json({
        tipo_detectado: 'error',
        separacion_correcta: false,
        peso_estimado_kg: 0,
        moneda_referencia: false,
        contaminantes: false,
        calidad_foto: 'mala',
        recomendacion: 'REVISAR',
        observaciones: 'Gemini error: ' + data.error.message.slice(0,150),
        confianza: 'baja'
      })
    }

    const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const clean = texto.replace(/```json|```/g, '').trim()
    const match = clean.match(/\{[\s\S]*\}/)

    if (!match) {
      return NextResponse.json({
        tipo_detectado: 'no detectado',
        separacion_correcta: false,
        peso_estimado_kg: 0,
        moneda_referencia: false,
        contaminantes: false,
        calidad_foto: 'regular',
        recomendacion: 'REVISAR',
        observaciones: 'Sin respuesta: ' + texto.slice(0,100),
        confianza: 'baja'
      })
    }

    const parsed = JSON.parse(match[0])
    return NextResponse.json({
      tipo_detectado: parsed.tipo_detectado || 'organico',
      separacion_correcta: parsed.separacion_correcta ?? false,
      peso_estimado_kg: parsed.peso_estimado_kg || 0,
      moneda_referencia: parsed.moneda_referencia ?? false,
      contaminantes: parsed.contaminantes ?? false,
      calidad_foto: parsed.calidad_foto || 'regular',
      recomendacion: parsed.recomendacion || 'VALIDAR',
      observaciones: parsed.observaciones || '',
      confianza: parsed.confianza || 'media'
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
