import { NextRequest, NextResponse } from 'next/server'
import { sesionDe } from '../../../lib/servidor'

// Aviso por mail a las personas cuyos pesajes se entregaron en la planta o ya tienen el compost certificado.
// Solo admin. Usa la sesión del admin, así que respeta las políticas de la base (RLS).
const esc = (t: string) => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

const TIPOS: Record<string, string> = {
  organico: 'orgánico', plastico: 'plástico', papel: 'papel y cartón', vidrio: 'vidrio', metal: 'metal', aceite: 'aceite usado', textil: 'textil',
}

function kgTexto(kg: number) {
  return kg < 1 ? `${Math.round(kg * 1000)} g` : `${kg.toLocaleString('es-AR', { maximumFractionDigits: 2 })} kg`
}

function plantilla(tipo: 'entrega' | 'compost', nombre: string, items: { kg: number; tipo: string }[], planta: string, fotoUrl: string) {
  const total = items.reduce((a, b) => a + Number(b.kg || 0), 0)
  const detalle = items.map(i => `${kgTexto(Number(i.kg))} de ${TIPOS[i.tipo] || i.tipo}`).join(', ')
  const titulo = tipo === 'entrega'
    ? `Tu pesaje ya está en ${esc(planta)} 🚚`
    : `Tu orgánico ya es compost 🌱`
  const cuerpo = tipo === 'entrega'
    ? `Entregamos en <strong>${esc(planta)}</strong> lo que pesaste con OLIVIA: <strong>${esc(detalle)}</strong>. Te dejamos la foto de la entrega. El próximo paso es el compostaje: cuando la planta lo certifique, te avisamos de nuevo y tu registro queda validado.`
    : `<strong>${esc(planta)}</strong> certificó el compostaje del material que pesaste con OLIVIA: <strong>${esc(detalle)}</strong>. Tu registro quedó validado y ya lo ves en tu panel.`
  const imagen = fotoUrl
    ? `<img src="${esc(fotoUrl)}" alt="Foto ${tipo === 'entrega' ? 'de la entrega' : 'del certificado'}" width="512" style="width:100%;max-width:512px;border-radius:12px;display:block;margin:0 0 16px;">`
    : ''
  return {
    asunto: tipo === 'entrega' ? `${nombre}, tu pesaje ya llegó a la planta` : `${nombre}, tu orgánico ya es compost`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0e1a;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:32px 20px;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="https://oliviacirculab.com.ar/logoOC.png" alt="OLIVIA Circulab" width="56" height="56" style="border-radius:12px;display:block;margin:0 auto 8px;">
    <div style="font-size:11px;font-weight:700;color:#f1f5f9;text-transform:uppercase;letter-spacing:.1em;">OLIVIA Circulab</div>
  </div>
  <div style="background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:24px;">
    <div style="font-size:20px;font-weight:900;color:#f1f5f9;margin-bottom:10px;">Hola, ${esc(nombre)} · ${titulo}</div>
    <div style="font-size:14px;color:#94a3b8;line-height:1.7;margin-bottom:16px;">${cuerpo}</div>
    ${imagen}
    <div style="font-size:28px;font-weight:900;color:#22c55e;margin-bottom:4px;">${kgTexto(total)}</div>
    <div style="font-size:12px;color:#64748b;margin-bottom:18px;">medidos a tu nombre</div>
    <a href="https://oliviacirculab.com.ar/dashboard" style="display:inline-block;background:#22c55e;border-radius:30px;padding:12px 26px;color:#04110a;font-size:13px;font-weight:800;text-decoration:none;">Ver mi panel →</a>
  </div>
  <div style="font-size:11px;color:#475569;line-height:1.7;text-align:center;margin-top:20px;">
    Los OLV son un registro ambiental: no tienen valor monetario, no se canjean ni se cobran.<br>
    <a href="https://oliviacirculab.com.ar" style="color:#22c55e;text-decoration:none;">oliviacirculab.com.ar</a> · WhatsApp +54 9 11 3885-9820
  </div>
</div></body></html>`,
  }
}

export async function POST(request: NextRequest) {
  try {
    const s = await sesionDe(request)
    if (!s) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    const { data: admin } = await s.supabase.rpc('es_admin')
    if (admin !== true) return NextResponse.json({ error: 'Solo admin' }, { status: 403 })

    const body = await request.json()
    const tipo: 'entrega' | 'compost' = body.tipo === 'compost' ? 'compost' : 'entrega'
    const ids: string[] = Array.isArray(body.ids) ? body.ids.slice(0, 500).map(String) : []
    const planta = String(body.planta || 'la planta').slice(0, 120)
    const fotoUrl = typeof body.foto_url === 'string' && body.foto_url.startsWith('https://') ? body.foto_url : ''
    if (!ids.length) return NextResponse.json({ error: 'Sin registros' }, { status: 400 })

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) return NextResponse.json({ error: 'Email no configurado' }, { status: 500 })

    const { data: residuos, error: e1 } = await s.supabase.from('residuos').select('id,usuario_id,kg,tipo').in('id', ids)
    if (e1 || !residuos) return NextResponse.json({ error: 'No se pudieron leer los registros' }, { status: 500 })
    const uids = [...new Set(residuos.map((r: any) => r.usuario_id).filter(Boolean))]
    const { data: usuarios } = await s.supabase.from('usuarios').select('id,nombre,email').in('id', uids)

    const porUsuario = new Map<string, { kg: number; tipo: string }[]>()
    for (const r of residuos as any[]) {
      const l = porUsuario.get(r.usuario_id) || []
      l.push({ kg: Number(r.kg), tipo: r.tipo })
      porUsuario.set(r.usuario_id, l)
    }

    const mails: any[] = []
    for (const u of (usuarios || []) as any[]) {
      if (!u.email) continue
      const t = plantilla(tipo, String(u.nombre || 'vecino/a').slice(0, 60), porUsuario.get(u.id) || [], planta, fotoUrl)
      mails.push({
        from: 'OLIVIA Circulab <hola@oliviacirculab.com.ar>',
        to: [u.email],
        subject: t.asunto.replace(/[\r\n]/g, ' '),
        html: t.html,
        reply_to: 'hola@oliviacirculab.com.ar',
      })
    }

    let enviados = 0
    for (let i = 0; i < mails.length; i += 100) {
      const lote = mails.slice(i, i + 100)
      const res = await fetch('https://api.resend.com/emails/batch', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(lote),
      })
      if (res.ok) enviados += lote.length
      else console.error('Resend batch error', await res.text())
    }
    return NextResponse.json({ ok: true, enviados, personas: mails.length })
  } catch (error) {
    console.error('Error en avisar:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
