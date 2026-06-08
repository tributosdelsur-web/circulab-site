import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { foto_url } = await req.json()

    if(!foto_url) {
      return NextResponse.json({error:'No se recibió URL de foto'},{status:400})
    }

    const imgResponse = await fetch(foto_url, {
      headers: { 'Cache-Control': 'no-cache' }
    })

    if(!imgResponse.ok) {
      throw new Error(`No se pudo descargar la imagen: ${imgResponse.status}`)
    }

    const imgBuffer = await imgResponse.arrayBuffer()
    const uint8Array = new Uint8Array(imgBuffer)

    const accountId = process.env.CF_ACCOUNT_ID
    const apiToken = process.env.CF_API_TOKEN

    if(!accountId || !apiToken) {
      throw new Error('Faltan credenciales de Cloudflare AI')
    }

    const headers = {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    }

    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.2-11b-vision-instruct`

    // Primero aceptar los términos
    await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        prompt: 'agree',
        image: Array.from(uint8Array),
        max_tokens: 10,
      })
    })

    // Ahora el análisis real
    const prompt = `You are analyzing an image of household waste for a recycling program. Look at the image carefully.

Return ONLY this JSON object filled with your analysis, no other text before or after:
{
  "tipo_detectado": "organico",
  "separacion_correcta": true,
  "peso_estimado_kg": 0.5,
  "moneda_referencia": false,
  "contaminantes": false,
  "calidad_foto": "buena",
  "recomendacion": "VALIDAR",
  "observaciones": "what you actually see in the image",
  "confianza": "alta"
}

Rules:
- tipo_detectado must be one of: organico, plastico, papel, vidrio, metal, aceite, textil, mixto, no_identificado
- separacion_correcta: true if waste is properly separated
- peso_estimado_kg: estimate weight from visual size
- moneda_referencia: true if you see a coin or bill for size reference
- contaminantes: true if you see mixed waste or contamination
- calidad_foto: buena, regular, or mala
- recomendacion: VALIDAR if clear waste, REVISAR if unsure, RECHAZAR if not waste or unreadable
- observaciones: describe what you actually see in the image in Spanish
- confianza: alta, media, or baja`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        prompt,
        image: Array.from(uint8Array),
        max_tokens: 500,
      })
    })

    if(!response.ok) {
      const errorText = await response.text()
      throw new Error(`Cloudflare AI error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log('CF_RAW:', JSON.stringify(data).slice(0,500))

    // Cloudflare puede devolver la respuesta en distintos formatos
    let texto = ''
    if(typeof data.result?.response === 'string') {
      texto = data.result.response
    } else if(typeof data.result === 'string') {
      texto = data.result
    } else if(data.result?.choices?.[0]?.message?.content) {
      texto = data.result.choices[0].message.content
    } else if(data.result?.text) {
      texto = data.result.text
    } else {
      texto = JSON.stringify(data.result || {})
    }
    console.log('CF_RESULT_TYPE:', typeof data.result, 'KEYS:', Object.keys(data.result||{}))
    console.log('CF_TEXT:', texto)

    if(!texto) {
      throw new Error('Cloudflare AI no devolvió respuesta')
    }

    const clean = String(texto).replace(/```json/g,'').replace(/```/g,'').trim()
    const match = clean.match(/\{[\s\S]*\}/)

    if(!match) {
      return NextResponse.json({
        tipo_detectado: 'no_identificado',
        separacion_correcta: false,
        peso_estimado_kg: 0,
        moneda_referencia: false,
        contaminantes: false,
        calidad_foto: 'regular',
        recomendacion: 'REVISAR',
        observaciones: 'IA respondio: ' + texto.slice(0,200),
        confianza: "baja"
      })
    }

    let parsed: any = {}
    try { parsed = JSON.parse(match[0]) } catch(e) { console.log('PARSE_ERROR') }

    const tiposValidos = ['organico','plastico','papel','vidrio','metal','aceite','textil','mixto','no_identificado']
    const tipo = tiposValidos.includes(parsed.tipo_detectado) ? parsed.tipo_detectado : 'no_identificado'
    const recomendacion = ['VALIDAR','REVISAR','RECHAZAR'].includes(parsed.recomendacion) ? parsed.recomendacion : 'REVISAR'
    const confianza = ['alta','media','baja'].includes(parsed.confianza) ? parsed.confianza : 'media'

    return NextResponse.json({
      tipo_detectado: tipo,
      separacion_correcta: parsed.separacion_correcta === true,
      peso_estimado_kg: Math.max(0, Number(parsed.peso_estimado_kg) || 0),
      moneda_referencia: parsed.moneda_referencia === true,
      contaminantes: parsed.contaminantes === true,
      calidad_foto: ['buena','regular','mala'].includes(parsed.calidad_foto) ? parsed.calidad_foto : 'regular',
      recomendacion,
      observaciones: String(parsed.observaciones || 'Análisis completado'),
      confianza
    })

  } catch(e: any) {
    console.log('ERROR_ANALIZAR_FOTO:', e.message)
    return NextResponse.json({
      tipo_detectado: 'error',
      separacion_correcta: false,
      peso_estimado_kg: 0,
      moneda_referencia: false,
      contaminantes: false,
      calidad_foto: 'mala',
      recomendacion: 'REVISAR',
      observaciones: `Error: ${e.message}`,
      confianza: "baja"
    })
  }
}
