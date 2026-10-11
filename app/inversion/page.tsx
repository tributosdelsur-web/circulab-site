'use client'
import { useState } from 'react'

export default function Inversion() {
  const [dark, setDark] = useState(true)
  const [lang, setLang] = useState('es')
  const es = lang === 'es'

  const bg = dark ? '#080c16' : '#f0f4f8'
  const text = dark ? '#f5f5f5' : '#0f172a'
  const card = dark ? 'rgba(255,255,255,0.04)' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const sub = dark ? '#8a94a6' : '#5a6474'

  const H = ({ n, t, c }: { n: string; t: string; c: string }) => (
    <h2 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: c, fontWeight: 800, margin: '52px 0 16px' }}>
      {n} · {t}
    </h2>
  )
  const P = ({ children }: any) => (
    <p style={{ fontSize: 15, lineHeight: 1.65, color: sub, margin: '0 0 14px' }}>{children}</p>
  )
  const Box = ({ children }: any) => (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '20px 20px 18px' }}>{children}</div>
  )

  const mercado = [
    'Hoteles de 4 y 5 estrellas, o de más de 100 habitaciones.',
    'Bancos, entidades financieras y aseguradoras.',
    'Súper e hipermercados de más de 4 cajas registradoras.',
    'Shoppings, galerías y centros comerciales.',
    'Cadenas con 6 o más sucursales en la Ciudad.',
    'Industrias y comercios que generan más de 500 litros diarios.',
    'Hospitales, clínicas y sanatorios privados con internación.',
    'Edificios corporativos de régimen horizontal.',
  ]

  const estado = [
    { p: 'Plataforma de registro y trazabilidad', e: 'Funcionando', c: '#22c55e' },
    { p: 'Balanza con firma en hardware', e: 'Diseño cerrado, sin fabricar', c: '#d97706' },
    { p: 'Operador con planta habilitada que firme', e: 'En conversaciones, sin acuerdo', c: '#ef4444' },
    { p: 'Inscripción en Economía del Conocimiento', e: 'Pendiente, ventana abierta', c: '#d97706' },
    { p: 'Metodología de certificación de carbono', e: 'Identificada, no iniciada', c: '#8a94a6' },
  ]

  const secuencia = [
    { h: 'Hito 1', t: 'Sitios verificados en CABA con confirmado de procesamiento', d: 'Hasta que esto no exista, nada de lo de abajo se activa. Es el prerequisito, no una etapa.' },
    { h: 'Hito 2', t: 'Chile — Ley REP', d: 'El cumplimiento se prueba cuando el material entra a la planta de valorización. Es el mismo dato que ya producimos. Se licencia a los Sistemas de Gestión.' },
    { h: 'Hito 3', t: 'Colombia — impuesto al carbono', d: 'Existe no causación: el impuesto se compensa con créditos locales. Hay demanda de dato verificado que ya está pagando alguien.' },
    { h: 'Hito 4', t: 'Brasil y México — escala industrial', d: 'PNRS y exigencias de casas matrices bajo TMEC. Volumen grande, ciclo de venta largo. No antes de tener los tres anteriores.' },
  ]

  const noAfirmamos = [
    'No afirmamos tener créditos de carbono emitidos ni una fecha de certificación.',
    'No afirmamos que nuestro dato tenga hoy grado de aseguramiento de auditoría externa: es trazabilidad primaria verificable, y el camino hacia aseguramiento limitado está identificado pero no recorrido.',
    'No publicamos nombres de operadores ni organismos con los que conversamos hasta tener acuerdos firmados.',
    'No prometemos retornos a usuarios particulares por entregar material.',
  ]

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'system-ui', transition: 'all 0.2s' }}>

      <nav style={{ padding: '12px 20px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8, background: dark ? 'rgba(8,12,22,0.98)' : 'rgba(240,244,248,0.98)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flexShrink: 1, textDecoration: 'none' }}>
          <img src="/logoOC.png" alt="OLIVIA" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 8 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: text }}>OLIVIA Circulab</div>
            <div style={{ fontSize: 9, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{es ? 'Inversión' : 'Investment'}</div>
          </div>
        </a>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <button onClick={() => setLang(es ? 'en' : 'es')} style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 6, padding: '4px 10px', color: '#22c55e', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
            {es ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setDark(!dark)} style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: `1px solid ${border}`, borderRadius: 6, padding: '4px 8px', fontSize: 14, cursor: 'pointer' }}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px 80px' }}>

        <section style={{ textAlign: 'center', padding: '12px 0 6px' }}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: '100%', maxWidth: 230, height: 'auto', display: 'block', margin: '0 auto 14px' }} />
          <div style={{ fontSize: 11, color: sub, lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
            {es ? 'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental' : 'Latin American Office for Environmental Valuation and Intelligence Information'}
          </div>
        </section>

        <h1 style={{ fontSize: 'clamp(28px,5.6vw,44px)', lineHeight: 1.12, fontWeight: 900, margin: '34px 0 16px', letterSpacing: '-0.02em' }}>
          Hoy no hay bonos de carbono.<br />Hay una factura que puede ser más baja.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: sub, margin: 0 }}>
          En la Ciudad de Buenos Aires hay empresas que están obligadas por ley a pagar la recolección de su basura húmeda,
          mientras el Estado retira gratis la fracción orgánica separada. Esa diferencia es dinero, se cobra todos los meses
          y no depende de ningún mercado de carbono. Para poder cobrarla hay que demostrarla. Eso es lo que hacemos.
        </p>

        <H n="1" t="La asimetría" c="#22c55e" />
        <P>
          Un generador especial —hotel de cuatro estrellas, banco, supermercado de más de cuatro cajas, cualquier comercio
          de más de 500 litros diarios— no puede usar el servicio público para su fracción húmeda. Debe contratar transporte
          privado habilitado, darse de alta en el programa de generadores privados de CEAMSE y acreditar la disposición final
          con constancias. Todo eso lo paga.
        </P>
        <P>
          La fracción orgánica separada, en cambio, la retira el SERFO sin cargo para el generador, a pedido, por Ley 4.120.
        </P>
        <Box>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, color: sub, marginBottom: 12 }}>
            El ahorro, como fórmula
          </div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14, lineHeight: 1.9, marginBottom: 12 }}>
            ahorro mensual = kg desviados × tarifa de fracción húmeda
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.6 }}>
            Publicamos la fórmula y no un número porque la tarifa vigente la define CEAMSE y la estamos solicitando por
            escrito. Preferimos una fórmula verificable a una cifra que no podamos sostener. Nuestro precio se fija siempre
            por debajo de ese ahorro: si no hay ahorro, no hay propuesta.
          </div>
        </Box>

        <H n="2" t="Qué compra el cliente" c="#0891b2" />
        <P>
          No compra conciencia ambiental. Compra el expediente que ya está obligado a producir, producido solo y en forma
          continua: alta y mantenimiento en el ReGE-FH, constancias de transporte y disposición, y el reporte de la fracción
          desviada con los cuatro datos que lo hacen defendible —origen, peso, traslado y confirmación de procesamiento—.
        </P>
        <P>
          El cuarto dato es el que nadie más produce hoy, y es el que convierte un registro en algo certificable más adelante.
          También es el que nos obliga a tener un operador con planta habilitada: sin destino verificado no hay dato completo.
          Lo decimos acá porque es nuestro principal riesgo y preferimos que se lea de nosotros.
        </P>

        <H n="3" t="Mercado direccionable" c="#8b5cf6" />
        <P>
          Las categorías obligadas están definidas por el Art. 14 inc. c) de la Ley 1854 y la Resolución 454-MEPUGC/21:
        </P>
        <Box>
          <div style={{ display: 'grid', gap: 9 }}>
            {mercado.map((x, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{x}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: sub, lineHeight: 1.6, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            El padrón del ReGE-FH no es público. Solicitamos la cantidad de inscriptos a la Dirección de Limpieza del
            Ministerio de Espacio Público e Higiene Urbana. Hasta tenerla por escrito, no publicamos un número de mercado:
            dimensionar con una estimación propia y presentarla como dato sería exactamente lo que este proyecto existe para
            corregir.
          </div>
        </Box>

        <H n="4" t="Estado real de cada pieza" c="#d97706" />
        <div style={{ display: 'grid', gap: 8 }}>
          {estado.map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, flex: 1, minWidth: 180 }}>{x.p}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: x.c, whiteSpace: 'nowrap' }}>{x.e}</span>
            </div>
          ))}
        </div>

        <H n="5" t="Secuencia regional, por hitos" c="#0891b2" />
        <P>
          La regulación que hace falta ya existe en varios países de la región. Lo que no existe todavía es nuestro primer
          circuito cerrado. Por eso la expansión está atada a hitos y no a fechas: una fecha es una promesa, un hito es una
          condición.
        </P>
        <div style={{ display: 'grid', gap: 9 }}>
          {secuencia.map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, color: '#22c55e', marginBottom: 6 }}>{x.h}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{x.t}</div>
              <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.55 }}>{x.d}</div>
            </div>
          ))}
        </div>

        <H n="6" t="Marco fiscal" c="#22c55e" />
        <P>
          Circulab Tech califica hoy para el Régimen de Promoción de la Economía del Conocimiento (Ley 27.506) por una
          ventana que se cierra: las micro empresas con menos de tres años de actividad solo deben acreditar que la actividad
          promovida es su actividad principal, sin exigencia todavía de inversión en I+D, exportaciones ni certificación de
          calidad, que se requieren a los cuatro años de la inscripción.
        </P>
        <P>
          Los beneficios son un bono de crédito fiscal de hasta el 70% de las contribuciones patronales —aplicable contra IVA
          y otros impuestos nacionales, no contra Ganancias— y una reducción del 60% del Impuesto a las Ganancias para micro
          y pequeñas empresas. No es un subsidio prometido: es una inscripción pendiente con requisitos que hoy cumplimos.
        </P>

        <H n="8" t="El pedido" c="#f59e0b" />
        <P>
          USD 200.000 en tres tramos, cada uno liberado contra un hito verificable y no contra una fecha. El producto ya
          está en producción y la empresa llegó hasta acá sin inversión externa.
        </P>
        <div style={{ display: "grid", gap: 9 }}>
          {[
            { t: "Tramo 1 · USD 50.000", h: "Sociedad constituida, operador firmado, balanza transmitiendo datos continuos", u: "Sociedad, acuerdo con operador, primeras balanzas, cuatro meses de equipo" },
            { t: "Tramo 2 · USD 70.000", h: "Documento de diseño del proyecto presentado", u: "Desarrollador de carbono, línea de base, documento de diseño, más nodos" },
            { t: "Tramo 3 · USD 80.000", h: "Proyecto registrado", u: "Auditoría de tercera parte, registro, operación" },
          ].map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#f59e0b", marginBottom: 7 }}>{x.t}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, marginBottom: 6 }}><strong>Hito:</strong> {x.h}</div>
              <div style={{ fontSize: 13, color: sub, lineHeight: 1.55 }}>{x.u}</div>
            </div>
          ))}
        </div>
        <P>
          La participación societaria y el instrumento se definen en conversación, no en una página web. Estamos abiertos a
          un socio activo con rol operativo, no solo a capital.
        </P>

        <H n="7" t="Lo que no afirmamos" c="#ef4444" />
        <Box>
          <div style={{ display: 'grid', gap: 11 }}>
            {noAfirmamos.map((x, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: 14, lineHeight: 1.55 }}>{x}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.6, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            Esta sección está acá a propósito. Un sistema de verificación que exagera sobre sí mismo no tiene nada que vender.
          </div>
        </Box>

        <div style={{ display: 'flex', gap: 10, marginTop: 38, flexWrap: 'wrap' }}>
          <a href="/operadores" style={{ background: '#22c55e', color: '#07140c', textDecoration: 'none', padding: '14px 24px', borderRadius: 11, fontSize: 14, fontWeight: 800 }}>
            Cómo funciona con operadores
          </a>
          <a href="/observatorio" style={{ color: text, textDecoration: 'none', padding: '14px 24px', borderRadius: 11, fontSize: 14, fontWeight: 700, border: `1px solid ${border}` }}>
            Los datos
          </a>
        </div>

      </div>

      <footer style={{borderTop:'1px solid '+border,padding:'32px 24px',textAlign:'center'}}>
        <a href="/"><img src="/logoOC.png" alt="OLIVIA" style={{width:44,height:44,objectFit:'contain',display:'block',margin:'0 auto 10px'}} /></a>
        <div style={{fontSize:13,fontWeight:800,color:text,marginBottom:6}}>OLIVIA Circulab</div>
        <div style={{fontSize:10,color:sub,lineHeight:1.6,maxWidth:400,margin:'0 auto 16px'}}>
          {es?'Oficina Latinoamericana de Información para la Valorización e Inteligencia Ambiental':'Latin American Office for Environmental Valuation and Intelligence Information'}
        </div>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:12}}>
          <a href="/metamorfosis" style={{fontSize:11,color:sub,textDecoration:'none'}}>Metamorfosis</a>
          <a href="/mapa" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Mapa':'Map'}</a>
          <a href="/ciudadano" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Ciudadano':'Citizen'}</a>
          <a href="/grandes-generadores" style={{fontSize:11,color:sub,textDecoration:'none'}}>{es?'Grandes Generadores':'Large Generators'}</a>
          <a href="/nda" style={{fontSize:11,color:sub,textDecoration:'none'}}>NDA</a>
        </div>
        <div style={{fontSize:9,color:sub,fontFamily:'monospace',letterSpacing:'.05em',opacity:.7}}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
      </footer>
    </div>
  )
}
