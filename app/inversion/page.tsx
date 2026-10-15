'use client'
import { useTema, gridFondo, Rubro, Titulo, Pildoras, FUENTE } from '../../lib/ui'

const FACTOR_PENDIENTE = true

export default function Inversion() {
  const t = useTema()
  const { es, dark, bg, text, card, border, sub, accent } = t

  const H = ({ n, tt }: { n: string; tt: string }) => (
    <div style={{ margin: '56px 0 18px' }}>
      <Rubro t={t}>{n}</Rubro>
      <Titulo>{tt}</Titulo>
    </div>
  )
  const P = ({ children }: any) => (
    <p style={{ fontSize: 15, lineHeight: 1.7, color: sub, margin: '0 0 14px' }}>{children}</p>
  )
  const Card = ({ children }: any) => (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '22px 22px 20px' }}>{children}</div>
  )
  const Punto = ({ c, children }: any) => (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, flexShrink: 0, marginTop: 7 }} />
      <span style={{ fontSize: 14, lineHeight: 1.55 }}>{children}</span>
    </div>
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
    { p: 'Módulo de firma del peso', e: 'Diseño cerrado, sin fabricar', c: '#f59e0b' },
    { p: 'Balanzas con modelo aprobado (Ley 19.511)', e: 'A comprar con el tramo 1; confirmación del INTI pendiente', c: '#f59e0b' },
    { p: 'Operador con planta habilitada que firme', e: 'En conversaciones, sin acuerdo', c: '#ef4444' },
    { p: 'Inscripción en Economía del Conocimiento', e: 'Pendiente, ventana abierta', c: '#f59e0b' },
    { p: 'Metodología de certificación de carbono', e: 'Identificada, no iniciada', c: '#94a3b8' },
  ]

  const tramos = [
    { t: 'Tramo 1 · USD 65.000', h: 'Sociedad constituida, planta habilitada firmada, balanza transmitiendo datos continuos', u: 'Sociedad, acuerdo con operador, diez balanzas con modelo aprobado, seis meses de equipo' },
    { t: 'Tramo 2 · USD 70.000', h: 'Documento de diseño del proyecto presentado', u: 'Desarrollador de carbono, línea de base, documento de diseño, más nodos' },
    { t: 'Tramo 3 · USD 80.000', h: 'Proyecto registrado', u: 'Auditoría de tercera parte, registro, operación' },
  ]

  const secuencia = [
    { h: 'Hito 1', t: 'Sitios verificados en CABA con confirmado de procesamiento', d: 'Hasta que esto no exista, nada de lo de abajo se activa. Es el prerequisito, no una etapa.' },
    { h: 'Hito 2', t: 'Chile — Ley REP', d: 'El cumplimiento se prueba cuando el material entra a la planta de valorización. Es el mismo dato que ya producimos.' },
    { h: 'Hito 3', t: 'Colombia — impuesto al carbono', d: 'Existe no causación: el impuesto se compensa con créditos locales. Hay demanda de dato verificado que alguien ya está pagando.' },
    { h: 'Hito 4', t: 'Brasil y México — escala industrial', d: 'PNRS y exigencias de casas matrices bajo TMEC. Volumen grande, ciclo de venta largo.' },
  ]

  const noAfirmamos = [
    'No afirmamos tener créditos de carbono emitidos ni una fecha de certificación.',
    'No afirmamos que nuestro dato tenga hoy grado de aseguramiento de auditoría externa: es trazabilidad primaria verificable, y el camino hacia aseguramiento limitado está identificado pero no recorrido.',
    'No publicamos nombres de operadores ni organismos con los que conversamos hasta tener acuerdos firmados.',
    'No prometemos retornos a usuarios particulares por entregar material.',
  ]

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: FUENTE, transition: 'all 0.3s', overflowX: 'hidden' }}>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: dark ? 'rgba(10,14,26,0.9)' : 'rgba(240,244,248,0.9)', borderBottom: `1px solid ${border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', minWidth: 0, flexShrink: 1 }}>
          <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Circulab Tech</div>
            <div style={{ fontSize: 9, color: sub, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'monospace' }}>
              {es ? 'Caso de negocio' : 'Business case'}
            </div>
          </div>
        </a>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <a href="/institucional" style={{ background: accent, color: dark ? '#050505' : 'white', padding: '6px 14px', borderRadius: 20, fontSize: 10, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {es ? 'Quiénes somos' : 'About us'}
          </a>
          <button onClick={() => t.setLang(es ? 'en' : 'es')} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: text, fontFamily: 'monospace' }}>
            {es ? 'EN' : 'ES'}
          </button>
          <button onClick={() => t.setDark(!dark)} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 9px', fontSize: 12, cursor: 'pointer', background: 'transparent', color: text }}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <section style={{ padding: '56px 24px 48px', position: 'relative', ...gridFondo(dark) }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Pildoras t={t} items={[
            'Buenos Aires · Ley 1854',
            es ? 'Ronda pre-semilla 2026' : 'Pre-seed round 2026',
            es ? 'Producto en producción' : 'Product live',
            es ? 'Sin inversión externa' : 'No external investment',
            es ? 'Economía del Conocimiento · inscripción pendiente' : 'Knowledge Economy · registration pending',
          ]} />

          <h1 style={{ fontSize: 'clamp(30px,5.4vw,44px)', fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', marginBottom: 20, maxWidth: 720 }}>
            {es ? (
              <>Hoy no hay bonos de carbono. Hay una <span style={{ color: accent, fontStyle: 'italic' }}>factura que puede ser más baja.</span></>
            ) : (
              <>There are no carbon credits yet. There is an <span style={{ color: accent, fontStyle: 'italic' }}>invoice that can be lower.</span></>
            )}
          </h1>

          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: sub, maxWidth: 620, marginBottom: 26 }}>
            {es
              ? 'En la Ciudad de Buenos Aires hay empresas obligadas por ley a pagar la recolección de su basura húmeda, mientras el Estado retira gratis la fracción orgánica separada. Esa diferencia es dinero, se cobra todos los meses y no depende de ningún mercado de carbono. Para poder cobrarla hay que demostrarla. Eso es lo que hacemos.'
              : 'In Buenos Aires some companies are legally required to pay for their wet waste collection, while the State collects the separated organic fraction for free. That difference is money, it recurs every month and it does not depend on any carbon market. To claim it, you have to prove it. That is what we do.'}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/contacto" style={{ background: accent, color: dark ? '#050505' : 'white', padding: '13px 28px', borderRadius: 40, fontSize: 11, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {es ? 'Agendar reunión · 20 min' : 'Schedule meeting · 20 min'}
            </a>
            <a href="/observatorio" style={{ border: `1px solid ${border}`, color: text, padding: '13px 28px', borderRadius: 40, fontSize: 11, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {es ? 'Ver los datos' : 'See the data'}
            </a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px' }}>

        <H n={es ? 'La asimetría' : 'The asymmetry'} tt={es ? 'Una fracción se paga, la otra la retira el Estado.' : 'One fraction is paid for, the other the State collects.'} />
        <P>
          {es
            ? 'Un generador especial —hotel de cuatro estrellas, banco, supermercado de más de cuatro cajas, cualquier comercio de más de 500 litros diarios— no puede usar el servicio público para su fracción húmeda. Debe contratar transporte privado habilitado, darse de alta en el programa de generadores privados de CEAMSE y acreditar la disposición final con constancias. Todo eso lo paga.'
            : 'A special generator cannot use the public service for its wet fraction. It must hire licensed private transport, register with the CEAMSE private generators programme and document final disposal. All of that it pays for.'}
        </P>
        <P>
          {es
            ? 'La fracción orgánica separada, en cambio, la retira el SERFO sin cargo para el generador, a pedido, por Ley 4.120.'
            : 'The separated organic fraction, by contrast, is collected by SERFO at no cost to the generator, on request, under Law 4.120.'}
        </P>
        <Card>
          <Rubro t={t}>{es ? 'El ahorro, como fórmula' : 'The saving, as a formula'}</Rubro>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14.5, lineHeight: 1.9, marginBottom: 12 }}>
            {es ? 'ahorro mensual = kg desviados × tarifa de fracción húmeda' : 'monthly saving = kg diverted × wet fraction tariff'}
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.65 }}>
            {es
              ? 'Publicamos la fórmula y no un número porque la tarifa vigente la define CEAMSE y la estamos solicitando por escrito. Preferimos una fórmula verificable a una cifra que no podamos sostener. Nuestro precio se fija siempre por debajo de ese ahorro: si no hay ahorro, no hay propuesta.'
              : 'We publish the formula rather than a figure because the tariff is set by CEAMSE and we are requesting it in writing. Our price is always set below that saving: if there is no saving, there is no proposal.'}
          </div>
        </Card>

        <H n={es ? 'El producto' : 'The product'} tt={es ? 'El expediente que ya está obligado a producir.' : 'The record it is already required to produce.'} />
        <P>
          {es
            ? 'No compra conciencia ambiental. Compra el expediente que ya debe producir, producido solo y en forma continua: alta y mantenimiento en el ReGE-FH, constancias de transporte y disposición, y el reporte de la fracción desviada con los cuatro datos que lo hacen defendible: origen, peso, traslado y confirmación de procesamiento.'
            : 'It does not buy environmental conscience. It buys the record it already must produce, produced continuously and on its own: ReGE-FH registration, transport and disposal certificates, and the diverted fraction report with the four data points that make it defensible.'}
        </P>
        <P>
          {es
            ? 'El cuarto dato es el que nadie más produce hoy, y es el que convierte un registro en algo certificable más adelante. También es el que nos obliga a tener un operador con planta habilitada: sin destino verificado no hay dato completo. Lo decimos acá porque es nuestro principal riesgo y preferimos que se lea de nosotros.'
            : 'The fourth data point is the one nobody else produces today. It is also what forces us to have an operator with a licensed plant: without a verified destination the record is incomplete. We say so here because it is our main risk and we would rather it be read from us.'}
        </P>

        <H n={es ? 'El circuito mínimo' : 'The minimum circuit'} tt={es ? 'Tres actores, no siete.' : 'Three actors, not seven.'} />
        <P>
          {es
            ? 'La objeción más común a este proyecto es que depende de coordinar demasiada gente: vecinos, puntos verdes, cooperativas, plantas, logística y auditoría. Es una objeción correcta sobre el sistema completo, y por eso el sistema completo no es la primera etapa.'
            : 'The most common objection is that this depends on coordinating too many actors. It is a fair objection about the complete system, which is why the complete system is not the first stage.'}
        </P>
        <P>
          {es
            ? 'Para demostrar que la verificación funciona alcanza con tres piezas. Todo lo demás viene después y solo si estas tres funcionan.'
            : 'Proving that verification works takes three pieces. Everything else comes later, and only if these three work.'}
        </P>
        <div style={{ display: 'grid', gap: 9 }}>
          {(es ? [
            ['01', 'Un generador obligado', 'Un solo sitio: un hotel, un supermercado, un edificio corporativo. Paga hoy por su fracción húmeda y tiene un expediente que sostener. Es quien recibe el ahorro y quien firma el contrato.'],
            ['02', 'Una balanza', 'Un equipo instalado en ese sitio. Pesa, firma el dato en el origen y transmite. No hay estimación visual en el camino crítico.'],
            ['03', 'Una planta habilitada', 'Recibe el material y confirma el procesamiento. Es el cuarto dato, el que cierra el registro y el que ninguna otra plataforma produce hoy.'],
          ] : [
            ['01', 'One obligated generator', 'A single site that already pays for its wet fraction and has a compliance record to maintain.'],
            ['02', 'One scale', 'Installed at that site. It weighs, signs the data at source and transmits.'],
            ['03', 'One licensed plant', 'Receives the material and confirms processing. The fourth data point.'],
          ]).map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 7 }}>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: accent, letterSpacing: '0.2em', fontWeight: 700 }}>{x[0]}</span>
                <span style={{ fontSize: 15.5, fontWeight: 800 }}>{x[1]}</span>
              </div>
              <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[2]}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <Card>
            <Rubro t={t}>{es ? 'Lo que no está en la primera etapa' : 'Not in the first stage'}</Rubro>
            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7 }}>
              {es
                ? 'Ni vecinos, ni puntos verdes, ni logística propia, ni cooperativas, ni app masiva, ni créditos de carbono. Todo eso está en el proyecto y nada de eso hace falta para probar que el dato se produce, se firma y se confirma. La adopción ciudadana es la etapa que escala el volumen, no la que demuestra el método.'
                : 'No neighbours, no drop-off points, no own logistics, no cooperatives, no mass app, no carbon credits. None of it is needed to prove that the data is produced, signed and confirmed.'}
            </div>
            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7, marginTop: 12 }}>
              {es
                ? 'Por eso el tramo 1 del pedido financia exactamente esas tres piezas y nada más. Un inversor no está apostando a que cambiemos el comportamiento de una ciudad: está apostando a que un sitio, un equipo y una planta produzcan un registro que resista una auditoría.'
                : 'That is why tranche 1 funds exactly those three pieces. An investor is not betting that we change a city\u2019s behaviour: they are betting that one site, one device and one plant produce a record that survives an audit.'}
            </div>
          </Card>
        </div>

        <H n={es ? 'Mercado' : 'Market'} tt={es ? 'Las categorías ya están definidas por ley.' : 'The categories are already defined by law.'} />
        <P>{es ? 'Art. 14 inc. c) de la Ley 1854 y Resolución 454-MEPUGC/21:' : 'Art. 14 (c) of Law 1854 and Resolution 454-MEPUGC/21:'}</P>
        <Card>
          <div style={{ display: 'grid', gap: 9 }}>
            {mercado.map((x, i) => <Punto key={i} c="#8b5cf6">{x}</Punto>)}
          </div>
          <div style={{ fontSize: 12.5, color: sub, lineHeight: 1.65, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            {es
              ? 'El padrón del ReGE-FH no es público. Solicitamos la cantidad de inscriptos a la Dirección de Limpieza. Hasta tenerla por escrito, no publicamos un número de mercado: dimensionar con una estimación propia y presentarla como dato sería exactamente lo que este proyecto existe para corregir.'
              : 'The ReGE-FH register is not public. We have requested the number of registrants. Until we have it in writing we publish no market figure.'}
          </div>
        </Card>

        <H n={es ? 'Estado real' : 'Real status'} tt={es ? 'Qué funciona, qué falta y qué todavía no existe.' : 'What works, what is missing, what does not exist yet.'} />
        <div style={{ display: 'grid', gap: 8 }}>
          {estado.map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, flex: 1, minWidth: 180 }}>{x.p}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: x.c, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{x.e}</span>
            </div>
          ))}
        </div>

        <H n={es ? 'Secuencia regional' : 'Regional sequence'} tt={es ? 'Hitos, no fechas.' : 'Milestones, not dates.'} />
        <P>
          {es
            ? 'La regulación que hace falta ya existe en varios países de la región. Lo que no existe todavía es nuestro primer circuito cerrado. Una fecha es una promesa; un hito es una condición.'
            : 'The regulation we need already exists in several countries. What does not exist yet is our first closed circuit. A date is a promise; a milestone is a condition.'}
        </P>
        <div style={{ display: 'grid', gap: 9 }}>
          {secuencia.map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px' }}>
              <div style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: accent, marginBottom: 7 }}>[ {x.h} ]</div>
              <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 6 }}>{x.t}</div>
              <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x.d}</div>
            </div>
          ))}
        </div>

        <H n={es ? 'Marco fiscal' : 'Tax framework'} tt={es ? 'Una ventana que se cierra.' : 'A closing window.'} />
        <P>
          {es
            ? 'Circulab Tech califica hoy para el Régimen de Promoción de la Economía del Conocimiento (Ley 27.506) por una ventana con plazo: las micro empresas con menos de tres años de actividad solo deben acreditar que la actividad promovida es su actividad principal, sin exigencia todavía de inversión en I+D, exportaciones ni certificación de calidad, que se requieren a los cuatro años de la inscripción.'
            : 'Circulab Tech currently qualifies for Argentina\u2019s Knowledge Economy regime (Law 27,506) through a time-limited window for micro companies under three years old.'}
        </P>
        <P>
          {es
            ? 'Los beneficios son un bono de crédito fiscal de hasta el 70 % de las contribuciones patronales —aplicable contra IVA y otros impuestos nacionales, no contra Ganancias— y una reducción del 60 % del Impuesto a las Ganancias para micro y pequeñas empresas. No es un subsidio prometido: es una inscripción pendiente con requisitos que hoy cumplimos.'
            : 'Benefits are a tax credit bond of up to 70 % of employer contributions — applicable against VAT and other national taxes, not income tax — and a 60 % income tax reduction for micro and small companies.'}
        </P>

        <H n={es ? 'Cómo cobramos' : 'How we charge'} tt={es ? 'Un porcentaje del ahorro, nunca más que el ahorro.' : 'A share of the saving, never more than the saving.'} />
        <P>
          {es
            ? 'La tarifa no es un número fijo que el cliente tenga que justificar: es una fracción de lo que deja de pagar. Eso hace la propuesta autolimitante —si no hay ahorro, no hay factura— y convierte el precio en algo que se calcula, no que se negocia.'
            : 'The fee is not a fixed number the client has to justify: it is a share of what it stops paying. That makes the offer self-limiting — no saving, no invoice.'}
        </P>
        <Card>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14, lineHeight: 1.9, marginBottom: 14 }}>
            {es ? 'tarifa mensual por sitio = 30 a 40 % del ahorro verificado' : 'monthly fee per site = 30 to 40 % of the verified saving'}
          </div>
          <div style={{ display: 'grid', gap: 11 }}>
            {(es ? [
              ['Piso mínimo por sitio', 'Cubre el costo de operar el nodo con independencia del volumen. Por debajo de cierto tonelaje el servicio no se instala: lo decimos antes y no después.'],
              ['Instalación', 'Se cobra una vez, contra entrega de la balanza funcionando y transmitiendo. No hay cargo por un equipo que no mide.'],
              ['El cliente conserva la mayor parte', 'Entre el 60 y el 70 % del ahorro queda en el generador. Un modelo que se queda con casi todo el beneficio no se renueva al segundo año.'],
            ] : [
              ['Minimum per site', 'Covers the cost of running the node regardless of volume. Below a certain tonnage the service is not installed, and we say so upfront.'],
              ['Installation', 'Charged once, on delivery of a scale that is working and transmitting.'],
              ['The client keeps most of it', 'Between 60 and 70 % of the saving stays with the generator.'],
            ]).map((x, i) => (
              <div key={i}>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{x[0]}</div>
                <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.65, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            {es
              ? 'El monto absoluto queda determinado en cuanto CEAMSE nos confirme por escrito la tarifa vigente de fracción húmeda, que es el único insumo que falta. Preferimos publicar la estructura antes que un número que todavía no podemos sostener.'
              : 'The absolute figure is determined as soon as CEAMSE confirms the current wet fraction tariff in writing, the only missing input.'}
          </div>
        </Card>

        <H n={es ? 'El riesgo de certificación' : 'Certification risk'} tt={es ? 'Si Verra no llega, o llega tarde, qué queda.' : 'If Verra does not arrive, or arrives late, what remains.'} />
        <P>
          {es
            ? 'Es la primera pregunta que hace cualquiera que conozca el proceso, y conviene que esté contestada antes de que la haga. La certificación de carbono no es el producto: es el último escalón de un producto que tiene valor en cada escalón anterior.'
            : 'It is the first question anyone familiar with the process asks. Carbon certification is not the product: it is the last step of a product that has value at every earlier step.'}
        </P>
        <Card>
          <div style={{ display: 'grid', gap: 12 }}>
            {(es ? [
              ['El ahorro de fracción húmeda', 'No depende de ninguna certificación. Es la diferencia entre lo que el generador paga hoy y lo que pagaría separando. Se cobra todos los meses, desde el primero.'],
              ['El cumplimiento de la Ley 1854', 'El generador especial debe inscribirse en el ReGE-FH, acreditar transporte y disposición y sostener el expediente. Hoy eso es trabajo administrativo que alguien hace a mano.'],
              ['El reporte para casa matriz', 'Las multinacionales que operan en Argentina reportan métricas de residuos a sus sedes. Hoy las estiman. Un dato trazable vale más que una estimación, con o sin crédito emitido.'],
              ['La capacidad ociosa de las plantas', 'Un operador con planta habilitada y capacidad sin usar necesita materia prima. Conectarlo con quien genera el material es valor por sí mismo.'],
            ] : [
              ['The wet fraction saving', 'Does not depend on any certification. It recurs every month, from the first one.'],
              ['Law 1854 compliance', 'Special generators must register in ReGE-FH and document transport and disposal. Today that is manual administrative work.'],
              ['Parent company reporting', 'Multinationals operating in Argentina report waste metrics to headquarters. Today they estimate them.'],
              ['Idle plant capacity', 'An operator with a licensed plant and unused capacity needs feedstock.'],
            ]).map((x, i) => (
              <div key={i}>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{x[0]}</div>
                <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[1]}</div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ marginTop: 14 }}>
          <Card>
            <Rubro t={t}>{es ? 'Y no hay una sola puerta' : 'And there is more than one door'}</Rubro>
            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7 }}>
              {es
                ? 'Verra es la vía más madura para residuos orgánicos y es la que estamos trabajando. El mecanismo del Artículo 6.4 del Acuerdo de París es una segunda vía, todavía en construcción de metodologías, que hoy no está disponible para un proyecto nuevo de este tipo. Y hay una tercera: los acuerdos bilaterales del Artículo 6.2, donde Chile es el país más avanzado de la región, con un acuerdo vigente con Suiza y una ley marco que ordena reglamento y registro público. Argentina, en cambio, no tiene acuerdos bilaterales firmados y su marco de autorización sigue en desarrollo. Esa es una restricción real de nuestra base y no la escondemos: es una de las razones por las que Chile está en el hito 2 y no en el último.'
                : 'Verra is the most mature route for organic waste and the one we are working on. The Paris Agreement Article 6.4 mechanism is a second route, still building methodologies, not available today for a new project of this type. A third exists: Article 6.2 bilateral agreements, where Chile is the most advanced country in the region. Argentina has no signed bilateral agreements and its authorisation framework is still in development. That is a real constraint of our base and we do not hide it.'}
            </div>
            <div style={{ fontSize: 12, color: sub, lineHeight: 1.6, marginTop: 12, opacity: 0.8 }}>
              {es ? 'Estado del Artículo 6 en la región según el relevamiento regional de octubre de 2024. Verificamos antes de cada actualización.' : 'Article 6 regional status per the October 2024 regional survey.'}
            </div>
          </Card>
        </div>

        <H n={es ? 'Dos líneas' : 'Two lines'} tt={es ? 'Dos líneas, dos proyectos separados.' : 'Two lines, two separate projects.'} />
        <P>
          {es
            ? 'Orgánicos y residuos electrónicos son dos proyectos de certificación independientes y no se pueden agrupar: tienen metodologías distintas, límites de proyecto distintos y auditorías distintas. Conviene decirlo de entrada, porque un desarrollador de carbono lo pregunta en la primera reunión.'
            : 'Organics and e-waste are two independent certification projects and cannot be grouped: different methodologies, different project boundaries, different audits.'}
        </P>
        <div style={{ display: 'grid', gap: 9 }}>
          {(es ? [
            ['Orgánicos', 'AMS-III.F', 'El ingreso inmediato está acá: la asimetría entre la fracción húmeda que el generador paga y la orgánica que el Estado retira gratis. Pero en CABA no hay hoy un procesador privado o cooperativo a escala que pueda firmar, y sin destino verificado el registro queda incompleto.', '#22c55e'],
            ['Electrónicos · RAEE', 'AMS-III.BA + VMR0008', 'No hay ahorro de tarifa que vender, pero sí existe una planta habilitada identificada en la Ciudad. Es la línea donde el circuito puede cerrarse antes, y por eso es probable que el primer confirmado de procesamiento real venga de acá y no del compost.', '#9333ea'],
          ] : [
            ['Organics', 'AMS-III.F', 'Immediate revenue sits here: the asymmetry between the wet fraction the generator pays for and the organic fraction the State collects free. But there is no private or cooperative processor at scale in the city able to sign today.', '#22c55e'],
            ['E-waste', 'AMS-III.BA + VMR0008', 'No tariff saving to sell, but a licensed plant has been identified in the city. This is the line where the circuit can close first.', '#9333ea'],
          ]).map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ fontSize: 15.5, fontWeight: 800, color: x[3] }}>{x[0]}</span>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: sub, letterSpacing: '0.05em' }}>{x[1]}</span>
              </div>
              <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[2]}</div>
            </div>
          ))}
        </div>
        <P>
          {es
            ? 'Para un inversor eso significa dos apuestas y no una, con riesgos distintos: en orgánicos el ingreso está claro y falta la planta; en electrónicos la planta está identificada y el ingreso depende del crédito. Si una de las dos cierra, el sistema queda probado.'
            : 'For an investor that means two bets rather than one, with different risks: in organics the revenue is clear and the plant is missing; in e-waste the plant is identified and the revenue depends on the credit.'}
        </P>

        <H n={es ? 'Integridad del dato' : 'Data integrity'} tt={es ? 'Cómo evitamos que el dato se falsifique.' : 'How we keep the data from being faked.'} />
        <P>
          {es
            ? 'Es la objeción técnica que más importa, porque si el dato se puede inventar no hay nada que vender. Un auditor no acepta un peso estimado visualmente, y nosotros tampoco.'
            : 'This is the technical objection that matters most: if the data can be invented there is nothing to sell. An auditor does not accept a visually estimated weight, and neither do we.'}
        </P>
        <Card>
          <div style={{ display: 'grid', gap: 12 }}>
            {(es ? [
              ['La foto clasifica, no pesa', 'La imagen con GPS sirve para identificar el tipo de material y el origen. No es el peso de registro y no la presentamos como tal. El peso surge de la balanza.'],
              ['El peso se firma en el origen', 'Una balanza comercial con modelo aprobado por la Ley de Metrología pesa; nuestro módulo lee el indicador y firma cada lectura dentro del equipo, antes de salir al teléfono. Un dato alterado después de la pesada no valida.'],
              ['Tara por recipiente', 'Cada tacho lleva un QR con su tara registrada. El peso neto se calcula contra esa tara y no contra un valor declarado por el usuario.'],
              ['Antiduplicado', 'Un lote no puede registrarse dos veces: el identificador del recipiente y la marca de tiempo de la pesada cierran el registro.'],
              ['El operador cierra el circuito', 'El registro queda pendiente hasta que la instalación habilitada confirma la recepción y el procesamiento. Sin esa confirmación no computa, aunque todo lo anterior esté bien.'],
            ] : [
              ['The photo classifies, it does not weigh', 'The GPS image identifies material type and origin. It is not the weight of record and we do not present it as one.'],
              ['Weight is signed at source', 'A commercial scale with an approved model under the Metrology Law weighs; our module reads the indicator and signs each reading inside the device, before reaching the phone.'],
              ['Tare per container', 'Each bin carries a QR with its registered tare. Net weight is computed against that tare, not a user-declared value.'],
              ['Anti-duplication', 'A batch cannot be registered twice: the container identifier and the weighing timestamp close the record.'],
              ['The operator closes the circuit', 'The record stays pending until the licensed facility confirms reception and processing.'],
            ]).map((x, i) => (
              <div key={i}>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{x[0]}</div>
                <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.65, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            {es
              ? 'Hoy el módulo de firma está diseñado y sin fabricar, y las balanzas se compran con el tramo 1 del pedido. Como cobramos según los kilos, la balanza tiene que tener modelo aprobado y verificación según la Ley 19.511; falta confirmar con el INTI que conectarle nuestro módulo no afecta esa aprobación. Mientras tanto los registros se validan a mano, uno por uno, y por eso el volumen es chico y la tasa de rechazo es alta: descartamos todo lo que no cumple. Esa validación manual sirve para probar el circuito, no para sostener una certificación. El salto de escala no es más gente registrando: es el peso firmado en origen y el confirmado de la planta.'
              : 'The signing module is designed and not yet built, and the scales are bought with tranche 1. Because we charge by the kilo, the scale must have an approved model and verification under Law 19.511; we still need INTI to confirm that connecting our module does not affect that approval. Meanwhile records are validated by hand, one by one, which is why volume is small and the rejection rate is high: we discard everything that does not comply. Manual validation proves the circuit; it cannot sustain a certification.'}
          </div>
        </Card>

        <H n={es ? 'La oferta' : 'The offer'} tt={es ? 'Qué recibe el cliente, y cuándo.' : 'What the client gets, and when.'} />
        <P>
          {es
            ? 'Una propuesta de valor no es una oferta. Esto es la oferta: cuatro entregables con plazo, y qué pasa si no cumplimos.'
            : 'A value proposition is not an offer. This is the offer: four deliverables with deadlines, and what happens if we miss them.'}
        </P>
        <div style={{ display: 'grid', gap: 9 }}>
          {(es ? [
            ['Semanas 1 y 2', 'Diagnóstico', 'Medimos la generación real del sitio durante dos semanas, separada por fracción. Sale un informe con los kilos que hoy se van como húmedo y cuántos son desviables. Si el ahorro no justifica el servicio, lo decimos y no seguimos. El diagnóstico se cobra y se descuenta del primer mes si el cliente avanza.'],
            ['Semana 3', 'Instalación', 'Balanza instalada, calibrada y transmitiendo. Tachos identificados con QR y tara registrada. Capacitación al personal que la va a usar, que son veinte minutos. Se cobra una vez y contra equipo funcionando.'],
            ['Mensual', 'Reporte verificado', 'Kilos por fracción, con origen, peso, traslado y confirmación de procesamiento. Formato presentable ante la autoridad y ante casa matriz. Antes del día 10 de cada mes.'],
            ['Permanente', 'Expediente al día', 'Alta y mantenimiento en el ReGE-FH, constancias de transporte y disposición archivadas y accesibles. Si llega una inspección, el expediente está.'],
          ] : [
            ['Weeks 1-2', 'Assessment', 'We measure the site\u2019s actual generation for two weeks, by fraction. If the saving does not justify the service, we say so and stop.'],
            ['Week 3', 'Installation', 'Scale installed, calibrated and transmitting. Bins tagged with QR and registered tare. Charged once, against a working device.'],
            ['Monthly', 'Verified report', 'Kilos by fraction with origin, weight, transfer and processing confirmation. Before the 10th of each month.'],
            ['Ongoing', 'Compliance file', 'ReGE-FH registration and maintenance, transport and disposal certificates filed and accessible.'],
          ]).map((x, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '18px 20px' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 7 }}>
                <span style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em', color: accent, fontWeight: 700 }}>{x[0]}</span>
                <span style={{ fontSize: 15.5, fontWeight: 800 }}>{x[1]}</span>
              </div>
              <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[2]}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <Card>
            <Rubro t={t}>{es ? 'Si no cumplimos' : 'If we fall short'}</Rubro>
            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7 }}>
              {es
                ? 'Un mes sin reporte es un mes sin factura. Si la balanza deja de transmitir más de setenta y dos horas y no la reponemos, el mes no se cobra. El contrato es mensual y se corta avisando con treinta días: no atamos a nadie a un servicio que no le sirve. Los datos del cliente son del cliente y se entregan exportados si decide irse.'
                : 'A month without a report is a month without an invoice. If the scale stops transmitting for more than seventy-two hours and we do not replace it, that month is not charged. The contract is monthly with thirty days notice, and the client\u2019s data is theirs on exit.'}
            </div>
          </Card>
        </div>

        <H n={es ? 'Unit economics' : 'Unit economics'} tt={es ? 'La cuenta por sitio.' : 'The per-site arithmetic.'} />
        <P>
          {es
            ? 'Separamos lo que sabemos de lo que estimamos, porque en esta etapa casi todo es lo segundo y conviene que se vea cuál es cuál.'
            : 'We separate what we know from what we estimate, because at this stage most of it is the latter.'}
        </P>
        <Card>
          <div style={{ display: 'grid', gap: 13 }}>
            {(es ? [
              ['Equipo por nodo', 'Estimación propia', 'Balanza de plataforma con modelo aprobado, más nuestro módulo de firma y conectividad. La cifra exacta sale de las cotizaciones del tramo 1.'],
              ['Instalación', 'A medir', 'Visita, montaje, identificación de tachos y capacitación. Se cobra al cliente contra entrega, así que no consume caja: es neutro.'],
              ['Operación mensual por sitio', 'Estimación propia', 'Conectividad del equipo, infraestructura de datos y tiempo de validación. Hoy la validación es manual y es el costo que más baja cuando la balanza entra en operación.'],
              ['Ingreso mensual por sitio', 'Fórmula', 'Un 30 a 40 % del ahorro verificado del cliente. Depende de dos variables que el cliente conoce: sus kilos y su tarifa. Por eso publicamos una calculadora en vez de una lista de precios.'],
              ['Punto de equilibrio', 'Fórmula', 'Cantidad de sitios = costo fijo mensual dividido por el margen promedio por sitio. Las dos variables se determinan con el primer cliente real y la primera serie de equipos.'],
            ] : [
              ['Device per node', 'Own estimate', 'Platform scale with an approved model, plus our signing and connectivity module. The exact figure comes from tranche 1 quotes.'],
              ['Installation', 'To be measured', 'Charged to the client on delivery, so it does not consume cash.'],
              ['Monthly cost per site', 'Own estimate', 'Connectivity, data infrastructure and validation time.'],
              ['Monthly revenue per site', 'Formula', '30 to 40 % of the client\u2019s verified saving.'],
              ['Break-even', 'Formula', 'Sites = fixed monthly cost divided by average margin per site.'],
            ]).map((x, i) => (
              <div key={i}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 700 }}>{x[0]}</span>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: sub, border: `1px solid ${border}`, borderRadius: 20, padding: '2px 8px' }}>{x[1]}</span>
                </div>
                <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[2]}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.65, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            {es
              ? 'No publicamos cifras de costo todavía porque no tenemos ni un equipo instalado ni un cliente en operación, y un número inventado en esta tabla invalidaría todo lo demás que decimos sobre medir antes de afirmar. Las dos cuentas que faltan se cierran con el tramo 1: la primera serie de equipos y el primer sitio en operación.'
              : 'We do not publish cost figures yet because we have neither a manufactured unit nor an installed client, and an invented number here would invalidate everything else we say about measuring before claiming.'}
          </div>
        </Card>

        <H n={es ? 'Por qué ahora' : 'Why now'} tt={es ? 'Separar bien ya tiene premio, y medir dejó de ser caro.' : 'Sorting well now pays off, and measuring got cheap.'} />
        <Card>
          <div style={{ display: 'grid', gap: 12 }}>
            {(es ? [
              ['Las reglas son nuevas', 'La Resolución 1177/2023 armó el régimen actual: generadores especiales que pagan su fracción húmeda, el SERFO para la orgánica separada y la figura del acopiador. Las reglas que premian separar bien existen recién desde hace dos años.'],
              ['Medir dejó de ser caro', 'Una balanza con modelo aprobado, conexión 4G y la firma digital del peso alcanzan para un registro que resiste una auditoría. Hace unos años eso era un proyecto industrial.'],
              ['El carbono pide datos, no estimaciones', 'Quien llegue con 12 a 24 meses de registros completos va a estar primero cuando el proyecto se presente a certificación.'],
              ['Una ventana fiscal con plazo', 'El Régimen de Economía del Conocimiento tiene hoy una vía más simple para empresas de menos de tres años (ver Marco fiscal).'],
            ] : [
              ['The rules are new', 'Resolution 1177/2023 built the current regime: special generators paying for their wet fraction, SERFO for separated organics and the collector figure.'],
              ['Measuring got cheap', 'An approved-model scale, 4G and a digitally signed weight are enough for an auditable record.'],
              ['Carbon wants data, not estimates', 'Whoever arrives with 12 to 24 months of complete records will be first in line for certification.'],
              ['A time-limited tax window', 'The Knowledge Economy regime currently has a simpler path for companies under three years old.'],
            ]).map((x, i) => (
              <div key={i}>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{x[0]}</div>
                <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[1]}</div>
              </div>
            ))}
          </div>
        </Card>

        <H n={es ? 'Por qué nosotros' : 'Why us'} tt={es ? 'La regla, el producto y la calle.' : 'The rule, the product and the street.'} />
        <Card>
          <div style={{ display: 'grid', gap: 12 }}>
            {(es ? [
              ['Entendemos la regla', 'El fundador es abogado (Chile) con práctica en derecho ambiental y tributario, y dirige una consultora binacional Chile–Argentina. En este negocio, el producto es leer bien la Ley 1.854, el SERFO, CEAMSE y la metrología; un equipo solo técnico tarda meses en llegar ahí.'],
              ['Ya lo construimos', 'Plataforma en producción, piloto en curso y validación uno por uno, sin inversión externa.'],
              ['Trabajamos con quienes hacen el trabajo', 'La cofundadora viene del trabajo comunitario y territorial, y una cooperativa con planta en la Ciudad ya está abierta a probar el sistema.'],
              ['Decimos lo que no sabemos', 'Publicamos los límites, los riesgos y la tasa de rechazo. Para un auditor o un fondo, un dato verificable vale más que una promesa.'],
              ['El segundo mercado está a mano', 'Chile tiene metas obligatorias con su Ley REP, y la firma del fundador ya opera en los dos países.'],
            ] : [
              ['We understand the rule', 'The founder is a lawyer (Chile) practicing environmental and tax law, running a Chile–Argentina consultancy. Here the product is reading Law 1,854, SERFO, CEAMSE and metrology correctly.'],
              ['We already built it', 'Platform in production, pilot under way, one-by-one validation, no external investment.'],
              ['We work with those who do the work', 'The co-founder comes from community and field work, and a cooperative with a plant in the City is open to testing the system.'],
              ['We say what we do not know', 'We publish our limits, risks and rejection rate.'],
              ['The second market is at hand', 'Chile has mandatory targets under its EPR law, and the founder\u2019s firm already operates in both countries.'],
            ]).map((x, i) => (
              <div key={i}>
                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{x[0]}</div>
                <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.65, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            {es
              ? 'Lo que todavía falta, y lo decimos: no hay planta firmada ni CTO incorporado. Las dos cosas son el primer uso de este pedido.'
              : 'What is still missing, and we say so: no signed plant and no CTO yet. Both are the first use of this ask.'}
          </div>
        </Card>

        <H n={es ? 'El pedido' : 'The ask'} tt={es ? 'USD 65.000 por SAFE. El resto es plan, no pedido.' : 'USD 65,000 via SAFE. The rest is plan, not ask.'} />
        <P>
          {es
            ? 'Esta es una etapa pre-semilla y el pedido está dimensionado para eso. No pedimos una ronda completa sobre evidencia que todavía no existe: pedimos lo que hace falta para producirla. El instrumento es un SAFE con tope de valuación, porque hoy ninguna valuación fija sería defendible para ninguna de las dos partes.'
            : 'This is a pre-seed stage and the ask is sized for it. We are not asking for a full round on evidence that does not exist yet: we are asking for what it takes to produce it. The instrument is a SAFE with a valuation cap.'}
        </P>
        <Card>
          <Rubro t={t}>{es ? 'Qué compra' : 'What it buys'}</Rubro>
          <div style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
            {es ? 'Diez balanzas con modelo aprobado y nuestro módulo de firma, en operación, con este destino:' : 'Ten scales with an approved model and our signing module, in operation:'}
          </div>
          <div style={{ display: 'grid', gap: 11 }}>
            {(es ? [
              ['1', 'Banco de pruebas fijo', 'Calibración, pruebas de firma y de antiduplicado. No sale nunca: es donde se reproduce cualquier falla que reporte un sitio.'],
              ['1', 'Unidad móvil de diagnóstico', 'Rota entre generadores, dos semanas por sitio. Permite unos veinticuatro diagnósticos al año y convierte cada visita en una propuesta con el ahorro medido, no estimado. Es el motor comercial.'],
              ['2', 'En operadores', 'Una en la planta de orgánicos y una en la de electrónicos. Es donde se produce el cuarto dato: sin balanza en destino no hay confirmación de procesamiento.'],
              ['4', 'En generadores obligados', 'Los sitios que pagan. Cuatro casos distintos alcanzan para medir conversión, retención y margen real.'],
              ['2', 'De repuesto', 'La garantía de servicio dice que si el equipo no transmite más de setenta y dos horas, ese mes no se cobra. Sin repuestos esa promesa no se puede sostener.'],
            ] : [
              ['1', 'Fixed test bench', 'Calibration, signature and anti-duplication testing.'],
              ['1', 'Mobile diagnostic unit', 'Rotates between generators, two weeks per site. Turns every visit into a proposal with a measured saving.'],
              ['2', 'At operators', 'One at the organics plant, one at the e-waste plant. Where the fourth data point is produced.'],
              ['4', 'At obligated generators', 'The paying sites.'],
              ['2', 'Spares', 'The service guarantee cannot be sustained without them.'],
            ]).map((x, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: accent, minWidth: 26, lineHeight: 1.1 }}>{x[0]}</span>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 3 }}>{x[1]}</div>
                  <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.6 }}>{x[2]}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            {es
              ? 'Además: constitución de la sociedad, el acuerdo con el operador y seis meses de pista para el equipo: los dos fundadores y un CTO a tiempo parcial.'
              : 'Plus: company incorporation, the operator agreement and six months of runway for the team: both founders and a part-time CTO.'}
          </div>
        </Card>

        <div style={{ marginTop: 14 }}>
          <Card>
            <Rubro t={t}>{es ? 'El hito que cierra esta etapa' : 'The milestone that closes this stage'}</Rubro>
            <div style={{ fontSize: 14.5, lineHeight: 1.7, marginBottom: 12 }}>
              {es
                ? 'Un operador con planta habilitada firmado, cuatro sitios transmitiendo en continuo durante sesenta a noventa días, y al menos un piloto pago o una carta de intención comercial.'
                : 'One signed licensed operator, four sites transmitting continuously for sixty to ninety days, and at least one paid pilot or commercial letter of intent.'}
            </div>
            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7 }}>
              {es
                ? 'Con eso cumplido, la empresa deja de ser una tesis y pasa a tener evidencia de mercado. Ese es exactamente el punto en el que una ronda semilla se vuelve discutible, y no antes.'
                : 'Once that is met, the company stops being a thesis and has market evidence. That is precisely when a seed round becomes discussable.'}
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 14 }}>
          <Card>
            <Rubro t={t}>{es ? 'Lo que viene después, sin comprometer a nadie' : 'What comes next, binding no one'}</Rubro>
            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7, marginBottom: 12 }}>
              {es
                ? 'El plan completo son USD 215.000 en tres tramos: este primero, uno de USD 70.000 para desarrollador de carbono, línea de base y documento de diseño del proyecto, y uno de USD 80.000 para auditoría de tercera parte, registro y operación. Lo decimos como plan y no como pedido: no es una obligación de ninguna de las partes y no lleva precio acordado de antemano.'
                : 'The full plan is USD 215,000 in three tranches. We state it as a plan, not an ask: it binds neither party and carries no pre-agreed price.'}
            </div>
            <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7 }}>
              {es
                ? 'A quien entre ahora le ofrecemos derecho de participación proporcional en las rondas siguientes, al precio de esas rondas. Es la posibilidad de acompañar todo el recorrido sin fijar hoy un número que ninguna de las dos partes puede sostener todavía.'
                : 'Whoever comes in now is offered pro-rata rights in subsequent rounds, at the price of those rounds.'}
            </div>
          </Card>
        </div>

        <P>
          {es
            ? 'La participación societaria y los términos finales se definen en conversación. Estamos abiertos a un socio activo con rol operativo, no solo a capital.'
            : 'Equity and final terms are defined in conversation. We are open to an active partner with an operating role.'}
        </P>

        <H n={es ? 'Lo que no afirmamos' : 'What we do not claim'} tt={es ? 'Los límites, escritos por nosotros.' : 'The limits, written by us.'} />
        <Card>
          <div style={{ display: 'grid', gap: 11 }}>
            {noAfirmamos.map((x, i) => <Punto key={i} c="#ef4444">{x}</Punto>)}
          </div>
          <div style={{ fontSize: 13, color: sub, lineHeight: 1.65, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}` }}>
            {es
              ? 'Esta sección está acá a propósito. Un sistema de verificación que exagera sobre sí mismo no tiene nada que vender.'
              : 'This section is here on purpose. A verification system that overstates itself has nothing to sell.'}
          </div>
        </Card>

        <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
          <a href="/institucional" style={{ background: accent, color: dark ? '#050505' : 'white', textDecoration: 'none', padding: '14px 28px', borderRadius: 40, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {es ? 'Quiénes somos' : 'About us'}
          </a>
          <a href="/operadores" style={{ color: text, textDecoration: 'none', padding: '14px 28px', borderRadius: 40, fontSize: 11, fontWeight: 700, border: `1px solid ${border}`, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {es ? 'Cómo funciona con operadores' : 'How it works with operators'}
          </a>
        </div>

      </div>

      {/* ═══ CALCULADORA ═══ */}
      <section style={{maxWidth:580,margin:'0 auto',padding:'8px 20px 40px'}}>
        <a href="/ahorro" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,padding:'20px',borderRadius:16,border:'1px solid rgba(34,197,94,0.35)',background:'rgba(34,197,94,0.06)',textDecoration:'none',color:'inherit'}}>
          <div>
            <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',opacity:.6,marginBottom:7}}>[ Calculadora ]</div>
            <div style={{fontSize:16,fontWeight:800,marginBottom:4}}>Calculá tu ahorro</div>
            <div style={{fontSize:12.5,opacity:.7,lineHeight:1.5}}>Poné tus kilos y tu tarifa de fracción húmeda. La cuenta la hacés vos.</div>
          </div>
          <span style={{color:'#22c55e',fontSize:20,fontWeight:700,flexShrink:0}}>→</span>
        </a>
      </section>

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
