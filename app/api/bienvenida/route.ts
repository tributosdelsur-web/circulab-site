import { NextRequest, NextResponse } from 'next/server'
import { sesionDe } from '../../../lib/servidor'

const escapar = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

export async function POST(request: NextRequest) {
  try {
    // Solo a la propia cuenta y solo recién creada: nadie puede usar esto para escribir a terceros.
    const sesion = await sesionDe(request)
    const email = sesion?.user.email
    if (!sesion || !email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    if (Date.now() - new Date(sesion.user.created_at).getTime() > 15 * 60 * 1000) {
      return NextResponse.json({ error: 'Solo para cuentas nuevas' }, { status: 403 })
    }
    const cuerpo = await request.json()
    const nombre = escapar(String(cuerpo.nombre || 'vecino/a').slice(0, 60))
    const nombreAsunto = String(cuerpo.nombre || 'Hola').replace(/[\r\n]/g, ' ').slice(0, 60)

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY no configurada')
      return NextResponse.json({ error: 'Email no configurado' }, { status: 500 })
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bienvenido a OLIVIA Circulab</title>
</head>
<body style="margin:0;padding:0;background:#0a0e1a;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <img src="https://oliviacirculab.com.ar/logoOC.png" alt="OLIVIA Circulab" width="64" height="64" style="border-radius:12px;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto;">
      <div style="font-size:11px;font-weight:700;color:#f1f5f9;text-transform:uppercase;letter-spacing:0.1em;">OLIVIA Circulab</div>
      <div style="font-size:9px;color:#334155;text-transform:uppercase;letter-spacing:0.15em;font-family:monospace;">by Circulab Tech</div>
    </div>

    <!-- Saludo -->
    <div style="background:#111827;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;margin-bottom:20px;">
      <div style="font-size:22px;font-weight:900;color:#f1f5f9;margin-bottom:8px;">
        Hola, <span style="color:#22c55e;">${nombre}</span> 🌿
      </div>
      <div style="font-size:14px;color:#64748b;line-height:1.7;margin-bottom:16px;">
        Tu cuenta en OLIVIA Circulab ya está activa. Gracias por sumar tu kilo al dato ambiental de la ciudad.
      </div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.7;">
        Cada registro queda a tu nombre y el equipo lo revisa. Los OLV son un registro ambiental: hoy no tienen valor monetario, no se canjean ni se cobran.
      </div>
    </div>

    <!-- 3 pasos para empezar -->
    <div style="background:#111827;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">3 pasos para empezar hoy</div>
      ${[
        { num: '01', titulo: 'Registrá tu primer residuo', desc: 'Pesalo si tenés balanza, sacale una foto y cargalo desde el celular. El equipo lo revisa.', color: '#22c55e' },
        { num: '02', titulo: 'Llevalo al punto verde', desc: 'Llevalo a un punto verde o a un lugar que lo reciba y sacá la segunda foto. Con eso podemos validar tu entrega y acreditar tus OLV Verdes.', color: '#3b82f6' },
        { num: '03', titulo: 'Invitá a un vecino', desc: 'Cuantas más personas midan, mejor conocemos lo que la ciudad genera y lo que puede volver al suelo.', color: '#f59e0b' },
      ].map(p => `
        <div style="display:flex;gap:14px;margin-bottom:14px;">
          <div style="width:24px;height:24px;border-radius:50%;background:${p.color}22;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:${p.color};flex-shrink:0;border:1px solid ${p.color}44;margin-top:2px;">${p.num}</div>
          <div>
            <div style="font-size:12px;font-weight:700;color:${p.color};margin-bottom:4px;">${p.titulo}</div>
            <div style="font-size:11px;color:#64748b;line-height:1.6;">${p.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="https://oliviacirculab.com.ar/dashboard" style="display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:30px;padding:14px 32px;color:white;font-size:13px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:0.08em;">
        Ir a mi panel →
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">
      <div style="font-size:10px;color:#334155;line-height:1.7;">
        OLIVIA Circulab · Buenos Aires, Argentina<br>
        <a href="https://oliviacirculab.com.ar" style="color:#22c55e;text-decoration:none;">oliviacirculab.com.ar</a>
        ·
        <a href="https://oliviacirculab.com.ar/terminos" style="color:#334155;text-decoration:none;">Términos</a>
        ·
        <a href="https://oliviacirculab.com.ar/privacidad" style="color:#334155;text-decoration:none;">Privacidad</a>
      </div>
    </div>

  </div>
</body>
</html>
`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OLIVIA Circulab <hola@oliviacirculab.com.ar>',
        to: [email],
        subject: `${nombreAsunto}, ya estás en OLIVIA Circulab 🌿`,
        html,
        reply_to: 'hola@oliviacirculab.com.ar',
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Resend error:', data)
      return NextResponse.json({ error: data }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data.id })

  } catch (error) {
    console.error('Error en bienvenida:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
