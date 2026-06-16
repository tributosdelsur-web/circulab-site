// SCRIPT 15 — Privacidad + Fix "olvidé contraseña" + checkbox T&C en registro
const fs = require('fs');

// ═══ 1. Página /privacidad completa ═══
const privacidadPath = 'app/privacidad/page.tsx';
if (!fs.existsSync('app/privacidad')) {
  fs.mkdirSync('app/privacidad', { recursive: true });
}

if (!fs.existsSync(privacidadPath)) {
  const privacidad = `'use client'
import { useState } from 'react'

export default function Privacidad() {
  const [dark] = useState(true)
  const bg = '#0a0e1a'
  const text = '#f1f5f9'
  const sub = '#64748b'
  const card = '#111827'
  const border = 'rgba(255,255,255,0.06)'
  const accent = '#22c55e'

  const SECCIONES = [
    {
      titulo: '1. Responsable del tratamiento',
      contenido: 'Circulab Tech S.A.S., con domicilio en la Ciudad Autónoma de Buenos Aires, Argentina, operando bajo la Ley de Economía del Conocimiento N° 27.506, es la empresa responsable del tratamiento de los datos personales recopilados a través de la plataforma OLIVIA (oliviacirculab.com.ar).',
    },
    {
      titulo: '2. Datos que recopilamos',
      contenido: 'Recopilamos: (a) Datos de registro: nombre, apellido, email, barrio, consorcio. (b) Datos de actividad: tipo y peso de residuos registrados, fotografías de residuos, coordenadas GPS del punto de entrega. (c) Datos de wallet: cantidad de OLV acumulados, historial de transacciones. (d) Datos técnicos: dirección IP, tipo de dispositivo, navegador, cookies de sesión. (e) Datos opcionales: empresa, cargo, para usuarios B2B.',
    },
    {
      titulo: '3. Finalidad del tratamiento',
      contenido: 'Los datos se usan para: (a) Operar la plataforma OLIVIA y verificar el impacto ambiental del usuario. (b) Acreditar tokens OLV en la wallet del usuario. (c) Certificar créditos de carbono ante Verra VCS y otros organismos internacionales, actuando como mandatario del usuario según la Cláusula 8 de los Términos y Condiciones. (d) Distribuir al usuario el porcentaje correspondiente de los créditos certificados. (e) Comunicar al usuario el estado de su actividad, OLV y pagos. (f) Cumplir con obligaciones legales y regulatorias.',
    },
    {
      titulo: '4. Base legal del tratamiento',
      contenido: 'El tratamiento se basa en: (a) Consentimiento expreso del usuario al registrarse y aceptar los Términos y Condiciones. (b) Ejecución del contrato de mandato incluido en los T&C (Cláusula 8). (c) Cumplimiento de obligaciones legales bajo la Ley N° 25.326 de Protección de Datos Personales de Argentina. (d) Interés legítimo de Circulab Tech en operar la plataforma y certificar el impacto ambiental.',
    },
    {
      titulo: '5. Conservación de los datos',
      contenido: 'Los datos de actividad ambiental (fotos, GPS, peso de residuos) se conservan por un mínimo de 7 años para cumplir con los requisitos de auditoría de Verra VCS y otros organismos de certificación de carbono. Los datos de registro se conservan mientras la cuenta esté activa y hasta 3 años después de su eliminación. Los datos de wallet y transacciones OLV se conservan de forma permanente como registro inmutable del historial ambiental verificado.',
    },
    {
      titulo: '6. Compartición de datos',
      contenido: 'Los datos pueden ser compartidos con: (a) Verra VCS y organismos de certificación de carbono, únicamente los datos de impacto ambiental necesarios para la certificación. (b) Auditores externos contratados por Verra para verificar el modelo dMRV. (c) Compradores de créditos de carbono: solo datos agregados y anonimizados, nunca datos personales individuales. (d) Proveedores de infraestructura: Supabase (base de datos), Vercel (hosting), Cloudflare (CDN y AI), todos bajo acuerdos de procesamiento de datos. No vendemos, alquilamos ni compartimos datos personales con terceros con fines comerciales.',
    },
    {
      titulo: '7. Derechos del usuario',
      contenido: 'El usuario tiene derecho a: (a) Acceder a sus datos personales. (b) Rectificar datos incorrectos. (c) Solicitar la eliminación de su cuenta y datos (excepto los requeridos por ley o para la certificación de carbono ya iniciada). (d) Oponerse al tratamiento para fines de marketing. (e) Solicitar la portabilidad de sus datos. Para ejercer estos derechos: hola@oliviacirculab.com.ar. Respondemos en un plazo máximo de 30 días hábiles.',
    },
    {
      titulo: '8. Cookies',
      contenido: 'Usamos cookies estrictamente necesarias para la sesión del usuario (autenticación via Supabase). No usamos cookies de seguimiento de terceros ni publicidad. Podemos usar cookies analíticas propias para mejorar la plataforma. El usuario puede desactivar las cookies en su navegador pero esto puede afectar el funcionamiento de la plataforma.',
    },
    {
      titulo: '9. Seguridad',
      contenido: 'Implementamos medidas de seguridad técnicas y organizativas: cifrado TLS en tránsito, cifrado en reposo en Supabase, Row Level Security (RLS) para que cada usuario solo acceda a sus propios datos, autenticación segura via Supabase Auth, y acceso restringido al panel de administración.',
    },
    {
      titulo: '10. Transferencias internacionales',
      contenido: 'Los datos pueden ser procesados en servidores ubicados en Estados Unidos (Supabase, Vercel, Cloudflare). Estas transferencias se realizan bajo garantías adecuadas según la normativa argentina (Ley 25.326) y estándares internacionales de protección de datos.',
    },
    {
      titulo: '11. Menores de edad',
      contenido: 'La plataforma OLIVIA no está dirigida a menores de 18 años. No recopilamos datos de menores de forma consciente. Si detectamos que un menor se ha registrado, eliminaremos su cuenta y datos.',
    },
    {
      titulo: '12. Contacto y reclamaciones',
      contenido: 'Para cualquier consulta sobre privacidad: hola@oliviacirculab.com.ar. Si considerás que tus derechos no han sido respetados, podés presentar una reclamación ante la Dirección Nacional de Protección de Datos Personales de Argentina (www.argentina.gob.ar/aaip/datospersonales).',
    },
    {
      titulo: '13. Actualizaciones',
      contenido: 'Esta política puede actualizarse. Te notificaremos por email ante cambios sustanciales. La versión vigente siempre estará disponible en oliviacirculab.com.ar/privacidad. Última actualización: junio 2026.',
    },
  ]

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui'}}>
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:'rgba(10,14,26,0.95)',borderBottom:'1px solid ' + border,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <span style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.05em'}}>Circulab Tech</span>
        </a>
        <a href="/" style={{fontSize:11,color:sub,textDecoration:'none'}}>← Volver</a>
      </nav>

      <div style={{maxWidth:720,margin:'0 auto',padding:'48px 24px'}}>
        <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>[ Privacidad ]</div>
        <h1 style={{fontSize:32,fontWeight:900,marginBottom:8,color:text}}>Política de Privacidad</h1>
        <div style={{fontSize:12,color:sub,marginBottom:40}}>Circulab Tech S.A.S. · Vigente desde junio 2026</div>

        <div style={{background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'16px',marginBottom:32,fontSize:12,color:sub,lineHeight:1.7}}>
          Esta política explica cómo Circulab Tech recopila, usa y protege tus datos al usar la plataforma OLIVIA. La aceptás al registrarte. Léela completa — especialmente la Sección 3 sobre el mandato de certificación de carbono.
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {SECCIONES.map((s,i)=>(
            <div key={i} style={{background:card,border:'1px solid ' + border,borderRadius:12,padding:'20px'}}>
              <h2 style={{fontSize:14,fontWeight:700,color:accent,marginBottom:10}}>{s.titulo}</h2>
              <p style={{fontSize:12,color:sub,lineHeight:1.8,margin:0}}>{s.contenido}</p>
            </div>
          ))}
        </div>

        <div style={{marginTop:32,padding:'16px',background:'rgba(255,255,255,0.02)',border:'1px solid ' + border,borderRadius:12,fontSize:11,color:sub,textAlign:'center',lineHeight:1.7}}>
          ¿Preguntas? <a href="mailto:hola@oliviacirculab.com.ar" style={{color:accent}}>hola@oliviacirculab.com.ar</a>
        </div>
      </div>
    </div>
  )
}
`;
  fs.writeFileSync(privacidadPath, privacidad);
  console.log('OK app/privacidad/page.tsx creada (Ley 25.326 Argentina)');
} else {
  console.log('-- /privacidad: ya existe');
}

// ═══ 2. Fix "olvidé mi contraseña" — configurar Supabase email ═══
// El problema: Supabase no tiene configurado el redirect URL correcto
// para el email de reset de contraseña

// Crear página /auth/callback para manejar el reset
const authCallbackDir = 'app/auth/callback';
if (!fs.existsSync(authCallbackDir)) {
  fs.mkdirSync(authCallbackDir, { recursive: true });
}

const authCallbackPath = 'app/auth/callback/route.ts';
if (!fs.existsSync(authCallbackPath)) {
  const authCallback = `import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirigir al reset de contraseña si viene de ese flujo
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
`;
  fs.writeFileSync(authCallbackPath, authCallback);
  console.log('OK app/auth/callback/route.ts creado');
}

// Crear página de reset de contraseña
const resetDir = 'app/reset-password';
if (!fs.existsSync(resetDir)) {
  fs.mkdirSync(resetDir, { recursive: true });
}

const resetPath = 'app/reset-password/page.tsx';
if (!fs.existsSync(resetPath)) {
  const resetPage = `'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [estado, setEstado] = useState<'form'|'ok'|'error'>('form')
  const [mensaje, setMensaje] = useState('')

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden')
      return
    }
    if (password.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres')
      return
    }
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setEstado('error')
      setMensaje(error.message)
    } else {
      setEstado('ok')
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',padding:24,fontFamily:'system-ui'}}>
      <div style={{maxWidth:400,width:'100%',background:'#111827',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20,padding:32}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:48,height:48,objectFit:'contain',borderRadius:8,marginBottom:12}} /></a>
          <div style={{fontSize:18,fontWeight:900,color:'#f1f5f9',marginBottom:4}}>Nueva contraseña</div>
          <div style={{fontSize:12,color:'#64748b'}}>Ingresá tu nueva contraseña para OLIVIA</div>
        </div>

        {estado==='ok'?(
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:40,marginBottom:12}}>✅</div>
            <div style={{fontSize:16,fontWeight:700,color:'#22c55e',marginBottom:8}}>Contraseña actualizada</div>
            <a href="/dashboard" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:20,padding:'10px 24px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
              Ir a mi panel →
            </a>
          </div>
        ):(
          <div>
            <input
              type="password"
              placeholder="Nueva contraseña (mín. 8 caracteres)"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              style={{width:'100%',padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:10}}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={e=>setConfirmPassword(e.target.value)}
              style={{width:'100%',padding:'10px 14px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:16}}
            />
            {mensaje&&<div style={{fontSize:11,color:'#ef4444',marginBottom:12,textAlign:'center'}}>{mensaje}</div>}
            <button onClick={handleReset} style={{width:'100%',background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:10,padding:'12px',color:'white',fontSize:13,fontWeight:700,cursor:'pointer'}}>
              Actualizar contraseña
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
`;
  fs.writeFileSync(resetPath, resetPage);
  console.log('OK app/reset-password/page.tsx creado');
}

// ═══ 3. Fix en página de login/registro — olvidé contraseña ═══
if (fs.existsSync('app/login/page.tsx')) {
  let login = fs.readFileSync('app/login/page.tsx', 'utf8');

  if (!login.includes('resetPasswordForEmail') && !login.includes('olvide')) {
    // Agregar el flujo de olvide contraseña
    const olvideFlujo = `
  const [mostrarOlvide, setMostrarOlvide] = React.useState(false)
  const [emailReset, setEmailReset] = React.useState('')
  const [resetEnviado, setResetEnviado] = React.useState(false)
  const [resetLoading, setResetLoading] = React.useState(false)

  const handleOlvidePassword = async () => {
    if (!emailReset) return
    setResetLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(emailReset, {
      redirectTo: 'https://oliviacirculab.com.ar/reset-password',
    })
    setResetLoading(false)
    if (!error) setResetEnviado(true)
  }
`;

    // Buscar el primer useState en la página de login
    login = login.replace(
      'const [',
      olvideFlujo + '\n  const ['
    );

    fs.writeFileSync('app/login/page.tsx', login);
    console.log('OK Login: flujo olvidé contraseña agregado');
  } else {
    console.log('-- Login: ya tiene resetPasswordForEmail');
  }
}

// ═══ 4. Fix en /registro — checkbox T&C y Privacidad ═══
if (fs.existsSync('app/registro/page.tsx')) {
  let registro = fs.readFileSync('app/registro/page.tsx', 'utf8');

  if (!registro.includes('aceptoTerminos') && !registro.includes('terminos')) {
    // Agregar estado para checkbox
    registro = registro.replace(
      "const [nombre, setNombre] = useState('')",
      `const [nombre, setNombre] = useState('')
  const [aceptoTerminos, setAceptoTerminos] = useState(false)`
    );

    // Agregar validación antes del submit
    registro = registro.replace(
      'const { data, error } = await supabase.auth.signUp',
      `if (!aceptoTerminos) {
      setMensaje('Debés aceptar los Términos y Condiciones y la Política de Privacidad para continuar')
      return
    }
    const { data, error } = await supabase.auth.signUp`
    );

    // Agregar el checkbox antes del botón de registro
    registro = registro.replace(
      '{/* BOTON REGISTRO */}',
      `{/* CHECKBOX T&C */}
        <div style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:16,padding:'12px',background:'rgba(34,197,94,0.04)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:10}}>
          <input
            type="checkbox"
            id="terminos"
            checked={aceptoTerminos}
            onChange={e=>setAceptoTerminos(e.target.checked)}
            style={{width:16,height:16,marginTop:2,accentColor:'#22c55e',flexShrink:0,cursor:'pointer'}}
          />
          <label htmlFor="terminos" style={{fontSize:11,color:'#94a3b8',lineHeight:1.6,cursor:'pointer'}}>
            Acepto los{' '}
            <a href="/terminos" target="_blank" style={{color:'#22c55e'}}>Términos y Condiciones</a>
            {' '}y la{' '}
            <a href="/privacidad" target="_blank" style={{color:'#22c55e'}}>Política de Privacidad</a>
            , incluyendo la Cláusula 8 de mandato para certificación de créditos de carbono y distribución de los mismos.
          </label>
        </div>

        {/* BOTON REGISTRO */}`
    );

    fs.writeFileSync('app/registro/page.tsx', registro);
    console.log('OK Registro: checkbox T&C y Privacidad agregado');
  } else {
    console.log('-- Registro: ya tiene checkbox de términos');
  }
}

// ═══ 5. Instrucciones para configurar Supabase ═══
console.log('');
console.log('CONFIGURACION MANUAL REQUERIDA EN SUPABASE:');
console.log('');
console.log('1. Dashboard Supabase → Authentication → Email Templates');
console.log('   → Reset Password template:');
console.log('   Subject: "Restablecé tu contraseña · OLIVIA Circulab"');
console.log('   Verificar que el link apunta a:');
console.log('   https://oliviacirculab.com.ar/auth/callback?next=/reset-password');
console.log('');
console.log('2. Dashboard Supabase → Authentication → URL Configuration');
console.log('   Site URL: https://oliviacirculab.com.ar');
console.log('   Redirect URLs agregar:');
console.log('   https://oliviacirculab.com.ar/auth/callback');
console.log('   https://oliviacirculab.com.ar/reset-password');
console.log('');
console.log('3. Dashboard Supabase → Authentication → SMTP Settings');
console.log('   Si usas SMTP propio configurar Resend:');
console.log('   Host: smtp.resend.com');
console.log('   Port: 465');
console.log('   User: resend');
console.log('   Password: tu-api-key-de-resend');
console.log('   From: hola@oliviacirculab.com.ar');
console.log('');
console.log('Script 15 completado');
