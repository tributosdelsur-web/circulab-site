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
                text: `Sos el sistema dMRV de OLIVIA Circulab Argentina.
Analizá esta foto de residuos domiciliarios.

REFERENCIAS DE TAMAÑO Y PESO:
Moneda argentina $10 = 23mm de diámetro
Moneda argentina $50 = 25mm de diámetro  
Billete de $1000 = 155mm de largo
Cubeta de 30 litros llena = 15 a 20kg
Cubeta de 30 litros a la mitad = 7 a 10kg
Cáscara de naranja = 100g
Yerba mate usada 1 día = 100g
Restos vegetales 1 día = 300 a 500g
Bolsa chica llena = 500g a 1kg
Bolsa mediana llena = 1 a 2kg
Lata de gaseosa vacía = 15g
Botella PET 500ml vacía = 20g

TIPOS DE RESIDUO:
organico = restos de comida, cáscaras, yerba, posos de café
plastico = botellas PET, envases, bolsas
papel = diarios, cartón, cajas
vidrio = botellas, frascos
metal = latas, chatarra, aluminio
aceite = aceite vegetal usado
textil = ropa, telas
mezclado = varios tipos juntos sin separar

Respondé SOLO con JSON válido sin markdown:
{"tipo_detectado":"organico","separacion_correcta":true,"peso_estimado_kg":1.5,"moneda_referencia":true,"contaminantes":false,"calidad_foto":"buena","recomendacion":"VALIDAR","observaciones":"descripcion breve en español","confianza":"alta"}`
              }
            ]
          }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 300 }
        })
      }
    )

    const data = await response.json()
    const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
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
        observaciones: 'No se pudo analizar la imagen correctamente',
        confianza: 'baja'
      })
    }

    const parsed = JSON.parse(match[0])
    return NextResponse.json({
      tipo_detectado: parsed.tipo_detectado || parsed.tipo || 'organico',
      separacion_correcta: parsed.separacion_correcta ?? parsed.separado ?? false,
      peso_estimado_kg: parsed.peso_estimado_kg || parsed.kg || parsed.peso || 0,
      moneda_referencia: parsed.moneda_referencia ?? parsed.moneda ?? false,
      contaminantes: parsed.contaminantes ?? parsed.mezcla ?? false,
      calidad_foto: parsed.calidad_foto || parsed.calidad || 'regular',
      recomendacion: parsed.recomendacion || parsed.accion || 'REVISAR',
      observaciones: parsed.observaciones || parsed.nota || '',
      confianza: parsed.confianza || parsed.certeza || 'media'
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
      observaciones: 'Error al procesar: ' + e.message,
      confianza: 'baja'
    })
  }
}
