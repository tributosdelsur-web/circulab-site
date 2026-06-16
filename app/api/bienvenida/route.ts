import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, barrio, nivel } = await request.json()

    if (!email || !nombre) {
      return NextResponse.json({ error: 'nombre y email requeridos' }, { status: 400 })
    }

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
        Tu cuenta en OLIVIA Circulab ya está activa. Bienvenido al primer sistema dMRV ciudadano de América Latina.
      </div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.7;">
        Estás en el tramo <strong style="color:#22c55e;">🌱 Semilla 2026</strong>. Tus OLV se van a ir acumulando cada vez que verificás un residuo. Hoy no tienen valor monetario — pero en <strong style="color:#f59e0b;">Árbol 2027</strong>, cuando Verra certifique, los que empezaron primero cobran primero.
      </div>
    </div>

    <!-- 3 pasos para empezar -->
    <div style="background:#111827;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">3 pasos para empezar hoy</div>
      ${[
        { num: '01', titulo: 'Registrá tu primer residuo', desc: 'Sacá una foto del residuo en casa (orgánico, plástico, papel). La IA lo verifica automáticamente.', color: '#22c55e' },
        { num: '02', titulo: 'Llevalo al punto verde', desc: 'Cuando tengas varios acumulados, llevelos al punto verde más cercano y sacá la segunda foto con GPS activo. Ahí se acreditan tus OLV Verdes.', color: '#3b82f6' },
        { num: '03', titulo: 'Invitá a un vecino', desc: 'Cada amigo que se registra con tu link te da +50 OLV Bonus. Cuantos más vecinos participen, mayor es el volumen de carbono que certificamos juntos en 2027.', color: '#f59e0b' },
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

    <!-- Tu primer OLV -->
    <div style="background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2);border-radius:16px;padding:20px;margin-bottom:20px;text-align:center;">
      <div style="font-size:32px;margin-bottom:8px;">🎁</div>
      <div style="font-size:14px;font-weight:700;color:#22c55e;margin-bottom:6px;">+100 OLV Bonus de bienvenida</div>
      <div style="font-size:11px;color:#64748b;line-height:1.6;">Ya están en tu wallet. Son OLV Bonus — no son Verdes, pero te sirven para canjear servicios en el tramo Brote y para entender cómo funciona el sistema.</div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="https://oliviacirculab.com.ar/dashboard" style="display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:30px;padding:14px 32px;color:white;font-size:13px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:0.08em;">
        Ir a mi panel →
      </a>
    </div>

    <!-- Tabla OLV por tramo -->
    <div style="background:#111827;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px;">El valor de tus OLV crece con el tiempo</div>
      ${[
        { tramo: '🌱 Semilla 2026', valor: 'Sin valor monetario · Acumulás', color: '#22c55e' },
        { tramo: '🌿 Brote Q4 2026', valor: 'Solo canje interno', color: '#3b82f6' },
        { tramo: '🌳 Árbol 2027 💰', valor: '6.329 OLV = USD 1', color: '#f59e0b' },
        { tramo: '🌲 Bosque 2028', valor: '2.198 OLV = USD 1', color: '#a855f7' },
        { tramo: '🏔️ Selva 2029', valor: '1.429 OLV = USD 1', color: '#ec4899' },
        { tramo: '🌊 Sumidero 2030+', valor: '952 OLV = USD 1', color: '#06b6d4' },
      ].map(t => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="font-size:11px;color:${t.color};font-weight:600;">${t.tramo}</span>
          <span style="font-size:11px;color:${t.color};">${t.valor}</span>
        </div>
      `).join('')}
      <div style="font-size:9px;color:#334155;margin-top:10px;line-height:1.6;">Los valores son aproximados. Dependen de las certificaciones obtenidas, el comportamiento del usuario y los precios del mercado de carbono. OLIVIA construye el sistema, lo certifica y lo comparte.</div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">
      <div style="font-size:10px;color:#334155;line-height:1.7;">
        OLIVIA Circulab · by Circulab Tech · Buenos Aires AI District · Ley 27.506<br>
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
        subject: `${nombre}, bienvenido a OLIVIA Circulab 🌿 Tus OLV empezaron a acumularse`,
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
