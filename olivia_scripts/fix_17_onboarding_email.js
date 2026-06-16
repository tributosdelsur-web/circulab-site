// SCRIPT 17 — Onboarding mejorado + email de bienvenida automático con Resend
// 1. Flujo de onboarding paso a paso en /registro
// 2. Email de bienvenida automático via Resend API
// 3. API route para enviar el email

const fs = require('fs');

// ═══ 1. API route para email de bienvenida ═══
const apiDir = 'app/api/bienvenida';
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

const apiPath = 'app/api/bienvenida/route.ts';
if (!fs.existsSync(apiPath)) {
  const apiRoute = `import { NextRequest, NextResponse } from 'next/server'

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

    const html = \`
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
        Hola, <span style="color:#22c55e;">\${nombre}</span> 🌿
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
      \${[
        { num: '01', titulo: 'Registrá tu primer residuo', desc: 'Sacá una foto del residuo en casa (orgánico, plástico, papel). La IA lo verifica automáticamente.', color: '#22c55e' },
        { num: '02', titulo: 'Llevalo al punto verde', desc: 'Cuando tengas varios acumulados, llevelos al punto verde más cercano y sacá la segunda foto con GPS activo. Ahí se acreditan tus OLV Verdes.', color: '#3b82f6' },
        { num: '03', titulo: 'Invitá a un vecino', desc: 'Cada amigo que se registra con tu link te da +50 OLV Bonus. Cuantos más vecinos participen, mayor es el volumen de carbono que certificamos juntos en 2027.', color: '#f59e0b' },
      ].map(p => \`
        <div style="display:flex;gap:14px;margin-bottom:14px;">
          <div style="width:24px;height:24px;border-radius:50%;background:\${p.color}22;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:\${p.color};flex-shrink:0;border:1px solid \${p.color}44;margin-top:2px;">\${p.num}</div>
          <div>
            <div style="font-size:12px;font-weight:700;color:\${p.color};margin-bottom:4px;">\${p.titulo}</div>
            <div style="font-size:11px;color:#64748b;line-height:1.6;">\${p.desc}</div>
          </div>
        </div>
      \`).join('')}
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
      \${[
        { tramo: '🌱 Semilla 2026', valor: 'Sin valor monetario · Acumulás', color: '#22c55e' },
        { tramo: '🌿 Brote Q4 2026', valor: 'Solo canje interno', color: '#3b82f6' },
        { tramo: '🌳 Árbol 2027 💰', valor: '6.329 OLV = USD 1', color: '#f59e0b' },
        { tramo: '🌲 Bosque 2028', valor: '2.198 OLV = USD 1', color: '#a855f7' },
        { tramo: '🏔️ Selva 2029', valor: '1.429 OLV = USD 1', color: '#ec4899' },
        { tramo: '🌊 Sumidero 2030+', valor: '952 OLV = USD 1', color: '#06b6d4' },
      ].map(t => \`
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="font-size:11px;color:\${t.color};font-weight:600;">\${t.tramo}</span>
          <span style="font-size:11px;color:\${t.color};">\${t.valor}</span>
        </div>
      \`).join('')}
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
\`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${RESEND_API_KEY}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OLIVIA Circulab <hola@oliviacirculab.com.ar>',
        to: [email],
        subject: \`\${nombre}, bienvenido a OLIVIA Circulab 🌿 Tus OLV empezaron a acumularse\`,
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
`;
  fs.writeFileSync(apiPath, apiRoute);
  console.log('OK app/api/bienvenida/route.ts creada');
} else {
  console.log('-- API bienvenida: ya existe');
}

// ═══ 2. Llamar al email de bienvenida desde /registro ═══
if (fs.existsSync('app/registro/page.tsx')) {
  let registro = fs.readFileSync('app/registro/page.tsx', 'utf8');

  if (!registro.includes('/api/bienvenida')) {
    // Agregar la llamada al API de bienvenida después de insertar el usuario
    registro = registro.replace(
      "setEstado('ok')",
      `// Enviar email de bienvenida automático
    try {
      await fetch('/api/bienvenida', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          barrio: barrio || 'Buenos Aires',
          nivel: 'Semilla',
        }),
      })
    } catch(e) {
      console.error('Email bienvenida error:', e)
      // No bloquear el registro si falla el email
    }

    setEstado('ok')`
    );
    fs.writeFileSync('app/registro/page.tsx', registro);
    console.log('OK Registro: email de bienvenida automático integrado');
  } else {
    console.log('-- Registro: ya tiene el email de bienvenida');
  }
}

// ═══ 3. Mejorar el flujo de onboarding en /registro ═══
if (fs.existsSync('app/registro/page.tsx')) {
  let registro = fs.readFileSync('app/registro/page.tsx', 'utf8');

  // Mejorar la pantalla de éxito del registro
  if (!registro.includes('onboarding') && !registro.includes('Tu primer paso')) {
    registro = registro.replace(
      `<div style={{fontSize:22,fontWeight:800,color:'#f1f5f9'}}>¡Bienvenido a Circulab!</div>
     <div style={{fontSize:14,color:'#64748b',textAlign:'center'}}>Tu cuenta fue creada.<br/>Redirigiendo a tu panel...</div>`,
      `<div style={{fontSize:22,fontWeight:800,color:'#f1f5f9',textAlign:'center'}}>¡Bienvenido, {nombre}! 🌿</div>
     <div style={{fontSize:14,color:'#22c55e',fontWeight:700,textAlign:'center'}}>+100 OLV Bonus de bienvenida acreditados</div>
     <div style={{fontSize:12,color:'#64748b',textAlign:'center',maxWidth:300,lineHeight:1.7}}>
       Tu cuenta está activa. Te enviamos un email con todo lo que necesitás saber.<br/>
       Redirigiendo a tu panel...
     </div>
     <div style={{display:'flex',flexDirection:'column',gap:8,width:'100%',maxWidth:300}}>
       {[
         {paso:'01',texto:'Registrá tu primer residuo',color:'#22c55e'},
         {paso:'02',texto:'Llevalo al punto verde · segunda foto GPS',color:'#3b82f6'},
         {paso:'03',texto:'Invitá a un vecino · +50 OLV Bonus',color:'#f59e0b'},
       ].map((p,i)=>(
         <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'10px 14px',background:'rgba(255,255,255,0.03)',borderRadius:10,border:'1px solid rgba(255,255,255,0.06)'}}>
           <div style={{fontSize:9,fontWeight:900,color:p.color,fontFamily:'monospace',opacity:0.6}}>{p.paso}</div>
           <div style={{fontSize:11,color:'#94a3b8'}}>{p.texto}</div>
         </div>
       ))}
     </div>`
    );
    fs.writeFileSync('app/registro/page.tsx', registro);
    console.log('OK Registro: pantalla de éxito con onboarding mejorada');
  } else {
    console.log('-- Registro: pantalla de éxito ya mejorada');
  }
}

// ═══ 4. Email de secuencia — día 3 y día 7 (manual via admin) ═══
// Agregar templates en el admin Community Engine
let admin = fs.readFileSync('app/admin/page.tsx', 'utf8');

if (!admin.includes('EmailSecuencia') && !admin.includes('dia_3')) {
  const emailSecuencia = `
function EmailSecuencia({usuarios}:any) {
  const [tipo, setTipo] = React.useState('dia3')
  const [usuarioSel, setUsuarioSel] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [enviado, setEnviado] = React.useState(false)

  const TIPOS = [
    {
      id:'dia3',
      label:'Día 3 · Primer residuo',
      color:'#22c55e',
      prompt:'Escribe un email corto de seguimiento para un usuario de OLIVIA Circulab que se registro hace 3 dias y todavia no ha registrado su primer residuo. Tono cercano, sin presion. Recordarle que tiene +100 OLV Bonus esperando ser usados. Que el primer registro tarda menos de 2 minutos. CTA: oliviacirculab.com.ar/registrar. Maximo 120 palabras. Asunto del email incluirlo al inicio como ASUNTO: ...'
    },
    {
      id:'dia7',
      label:'Día 7 · Invitar vecinos',
      color:'#3b82f6',
      prompt:'Escribe un email de seguimiento para un usuario activo de OLIVIA Circulab que lleva 7 dias registrando residuos. Felicitarlo por su impacto. Recordarle que puede ganar +50 OLV Bonus por cada vecino que invite. Explicar que cuantos mas vecinos participen en su barrio, mayor es el volumen de carbono que se certifica en 2027. CTA: compartir su link de referidos. Maximo 120 palabras. Incluir ASUNTO: al inicio.'
    },
    {
      id:'dia30',
      label:'Mes 1 · Reporte de impacto',
      color:'#f59e0b',
      prompt:'Escribe un email de reporte mensual personalizado para un usuario de OLIVIA Circulab. Tono celebratorio. Mencionar que lleva un mes activo en el sistema Semilla 2026. Recordar que sus OLV Verdes son su historial verificado para Verra. En Arbol 2027 los que mas acumularon cobran primero. Invitar a seguir sumando residuos. CTA: ver su dashboard en oliviacirculab.com.ar/dashboard. Maximo 150 palabras. Incluir ASUNTO: al inicio.'
    },
    {
      id:'verra',
      label:'Hito Verra · Feb 2026',
      color:'#a855f7',
      prompt:'Escribe un email para todos los usuarios de OLIVIA Circulab anunciando que Verra aprobo la metodologia dMRV de alta frecuencia en febrero 2026. Esto valida exactamente el modelo de OLIVIA. Sus OLV Verdes van a poder certificarse. Tono de celebracion y confianza. Recordar que el camino al Arbol 2027 es real. CTA: seguir registrando residuos. Maximo 150 palabras. Incluir ASUNTO: al inicio.'
    },
  ]

  const generar = async () => {
    setLoading(true)
    setEmail('')
    const t = TIPOS.find(x=>x.id===tipo)
    if (!t) return
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:500,messages:[{role:'user',content:t.prompt}]})})
      const data = await res.json()
      setEmail(data.content?.[0]?.text||'Error')
    } catch(e){setEmail('Error de conexion')}
    setLoading(false)
  }

  const enviarViaResend = async () => {
    if (!email || !usuarioSel) return
    setLoading(true)
    const u = usuarios.find((x:any)=>x.id===usuarioSel)
    if (!u) return
    try {
      await fetch('/api/bienvenida', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nombre:u.nombre,email:u.email,tipo:'secuencia'})
      })
      setEnviado(true)
      setTimeout(()=>setEnviado(false),3000)
    } catch(e){console.error(e)}
    setLoading(false)
  }

  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
        {TIPOS.map(t=>(
          <button key={t.id} onClick={()=>setTipo(t.id)} style={{padding:'10px',borderRadius:10,border:'2px solid ' + (tipo===t.id?t.color:'rgba(255,255,255,0.06)'),background:tipo===t.id?t.color+'11':'rgba(255,255,255,0.02)',color:tipo===t.id?t.color:'#64748b',fontSize:11,fontWeight:700,cursor:'pointer',textAlign:'left'}}>
            {t.label}
          </button>
        ))}
      </div>
      <button onClick={generar} disabled={loading} style={{background:loading?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#a855f7,#7c3aed)',border:'none',borderRadius:10,padding:'12px',color:'white',fontSize:13,fontWeight:700,cursor:'pointer'}}>
        {loading?'Generando...':'Generar email con IA'}
      </button>
      {email&&(
        <div>
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:'14px',fontSize:11,color:'#f1f5f9',lineHeight:1.8,whiteSpace:'pre-wrap',marginBottom:8,maxHeight:200,overflowY:'auto'}}>{email}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <button onClick={()=>{navigator.clipboard.writeText(email)}} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'8px',color:'#94a3b8',fontSize:11,fontWeight:700,cursor:'pointer'}}>
              Copiar texto
            </button>
            <a href={'mailto:?subject=OLIVIA Circulab&body=' + encodeURIComponent(email)} style={{background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.2)',borderRadius:8,padding:'8px',color:'#a855f7',fontSize:11,fontWeight:700,cursor:'pointer',textDecoration:'none',textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>
              Abrir en email
            </a>
          </div>
        </div>
      )}
      <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:10,padding:'10px',fontSize:10,color:'#94a3b8',lineHeight:1.6}}>
        Flujo manual: Genera el email → Copia el asunto y el cuerpo → Envialo desde hola@oliviacirculab.com.ar via Gmail o Resend.
        Automatizacion completa disponible cuando integres Resend API en produccion.
      </div>
    </div>
  )
}

`;

  admin = admin.replace(
    'function CampaniaCiudadana(',
    emailSecuencia + 'function CampaniaCiudadana('
  );

  // Agregar tab de secuencia de emails en la lista de tabs
  admin = admin.replace(
    `{id:'community',l:'Community Engine',icon:'🤝'}`,
    `{id:'community',l:'Community Engine',icon:'🤝'},
  {id:'email_secuencia',l:'Email Secuencia',icon:'✉️'}`
  );

  // Agregar contenido del tab
  admin = admin.replace(
    `{tab==='camp_ciudadana'&&(`,
    `{tab==='email_secuencia'&&(
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{fontSize:16,fontWeight:900}}>✉️ Secuencia de emails</div>
          <div style={{background:'#111827',border:'1px solid rgba(168,85,247,0.2)',borderRadius:14,padding:'16px'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4,color:'#a855f7'}}>Emails de onboarding y seguimiento</div>
            <div style={{fontSize:11,color:'#64748b',marginBottom:12}}>Dia 3 · Dia 7 · Mes 1 · Hito Verra · Generados con IA</div>
            <EmailSecuencia usuarios={usuarios} />
          </div>
        </div>
      )}

      {tab==='camp_ciudadana'&&(`
  );

  fs.writeFileSync('app/admin/page.tsx', admin);
  console.log('OK Admin: tab Email Secuencia + componente EmailSecuencia agregados');
} else {
  console.log('-- Admin: ya tiene EmailSecuencia');
}

// ═══ 5. Variable de entorno para Resend ═══
// Verificar si existe .env.local y agregar RESEND_API_KEY si no está
if (fs.existsSync('.env.local')) {
  let env = fs.readFileSync('.env.local', 'utf8');
  if (!env.includes('RESEND_API_KEY')) {
    env += '\n# Resend API para emails transaccionales\nRESEND_API_KEY=re_XXXXXXXX_reemplazar_con_tu_key\n';
    fs.writeFileSync('.env.local', env);
    console.log('OK .env.local: RESEND_API_KEY agregada (reemplazar con la key real)');
  } else {
    console.log('-- .env.local: ya tiene RESEND_API_KEY');
  }
}

console.log('');
console.log('Script 17 completado');
console.log('');
console.log('EMAILS AUTOMATICOS IMPLEMENTADOS:');
console.log('  · Bienvenida: se envia automaticamente al registrarse');
console.log('  · Secuencia dia 3/7/30: generada con IA en el admin');
console.log('  · Hito Verra: template especial para anunciar la certificacion');
console.log('');
console.log('CONFIGURACION REQUERIDA:');
console.log('  1. Crear cuenta en resend.com');
console.log('  2. Verificar dominio oliviacirculab.com.ar en Resend');
console.log('  3. Obtener API key y reemplazar en .env.local');
console.log('     RESEND_API_KEY=re_tu_key_real');
console.log('  4. En Vercel → Settings → Environment Variables');
console.log('     Agregar RESEND_API_KEY con el mismo valor');
console.log('');
console.log('ONBOARDING MEJORADO:');
console.log('  · Pantalla de exito con 3 pasos claros');
console.log('  · +100 OLV Bonus visible al registrarse');
console.log('  · Email HTML con tabla OLV por tramo');
console.log('  · CTA directo al dashboard');
