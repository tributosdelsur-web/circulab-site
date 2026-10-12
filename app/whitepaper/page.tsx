'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useTema, Rubro, Titulo, FUENTE } from '../../lib/ui'

export default function Whitepaper() {
  const t = useTema()
  const { es, dark, bg, text, card, border, sub, accent } = t

  const [firmado, setFirmado] = useState(false)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [acepto, setAcepto] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  async function firmarNDA() {
    if (!nombre || !email) { setError('Nombre y correo son obligatorios.'); return }
    if (!acepto) { setError('Hace falta aceptar el acuerdo de confidencialidad.'); return }
    setEnviando(true); setError('')
    await supabase.from('nda_firmas').insert({ nombre, email, empresa })
    setEnviando(false); setFirmado(true)
  }

  const input: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${border}`,
    background: dark ? 'rgba(255,255,255,0.03)' : '#fff', color: text, fontSize: 14,
    fontFamily: FUENTE, marginBottom: 10, boxSizing: 'border-box',
  }

  const Nav = () => (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: dark ? 'rgba(10,14,26,0.9)' : 'rgba(240,244,248,0.9)', borderBottom: `1px solid ${border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8 }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', minWidth: 0 }}>
        <img src="/logoOC.png" alt="OLIVIA Circulab" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Circulab Tech</div>
          <div style={{ fontSize: 9, color: sub, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'monospace' }}>Documento técnico</div>
        </div>
      </a>
      <button onClick={() => t.setDark(!dark)} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 9px', fontSize: 12, cursor: 'pointer', background: 'transparent', color: text }}>{dark ? '☀️' : '🌙'}</button>
    </nav>
  )

  if (!firmado) return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: FUENTE }}>
      <Nav />
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '56px 24px 80px' }}>
        <Rubro t={t}>Confidencial</Rubro>
        <h1 style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
          Documento técnico
        </h1>
        <p style={{ fontSize: 14.5, lineHeight: 1.7, color: sub, marginBottom: 24 }}>
          Metodología, línea de base, diseño del instrumento de medición y protocolo de integridad del dato.
          No contiene proyecciones financieras: el caso de negocio está publicado y abierto en <a href="/inversion" style={{ color: accent }}>la página de inversión</a>.
        </p>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '22px 20px' }}>
          <input style={input} placeholder="Nombre y apellido" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input style={input} type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
          <input style={input} placeholder="Empresa u organización (opcional)" value={empresa} onChange={e => setEmpresa(e.target.value)} />
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '6px 0 14px', cursor: 'pointer' }}>
            <input type="checkbox" checked={acepto} onChange={e => setAcepto(e.target.checked)} style={{ marginTop: 3, accentColor: accent }} />
            <span style={{ fontSize: 12, color: sub, lineHeight: 1.55 }}>
              Acepto no compartir ni reproducir este documento sin autorización escrita de Circulab Tech.
            </span>
          </label>
          {error && <div style={{ fontSize: 12.5, color: '#ef4444', marginBottom: 10 }}>{error}</div>}
          <button onClick={firmarNDA} disabled={enviando} style={{ background: accent, color: dark ? '#050505' : 'white', border: 'none', padding: '13px 26px', borderRadius: 40, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', opacity: enviando ? 0.6 : 1 }}>
            {enviando ? 'Enviando…' : 'Acceder al documento'}
          </button>
        </div>
      </div>
    </div>
  )

  const H = ({ n, tt }: { n: string; tt: string }) => (
    <div style={{ margin: '54px 0 18px' }}>
      <Rubro t={t}>{n}</Rubro>
      <Titulo size={24}>{tt}</Titulo>
    </div>
  )
  const P = ({ children }: any) => <p style={{ fontSize: 15, lineHeight: 1.75, color: sub, margin: '0 0 14px' }}>{children}</p>
  const Card = ({ children }: any) => <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '22px 22px 20px' }}>{children}</div>
  const Fila = ({ k, v }: { k: string; v: string }) => (
    <div style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: `1px solid ${border}`, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 13, fontWeight: 700, minWidth: 190, flexShrink: 0 }}>{k}</span>
      <span style={{ fontSize: 13.5, color: sub, lineHeight: 1.6, flex: 1, minWidth: 200 }}>{v}</span>
    </div>
  )
  const Pend = ({ children }: any) => (
    <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: '14px 16px', margin: '14px 0' }}>
      <div style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#f59e0b', fontWeight: 700, marginBottom: 7 }}>Pendiente de verificación documental</div>
      <div style={{ fontSize: 13, color: sub, lineHeight: 1.65 }}>{children}</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: FUENTE }}>
      <Nav />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '44px 24px 90px' }}>

        <Rubro t={t}>Circulab Tech · Documento técnico · Confidencial</Rubro>
        <h1 style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
          Cómo se produce un registro que resiste una auditoría
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: sub, margin: 0 }}>
          Este documento describe el método, no el negocio. Está dirigido a tres lectores: el desarrollador de carbono
          que evalúa si el proyecto es registrable, el auditor que tendría que validarlo, y el inversor técnico que
          quiere saber si el dato aguanta. Cada afirmación que depende de una fuente externa está marcada como tal, y
          lo que todavía no verificamos contra el documento original está señalado en lugar de estimado.
        </p>

        <H n="1" tt="Alcance y límite del proyecto" />
        <P>
          Un proyecto de certificación de carbono se define por un límite físicamente auditable. Esa es la restricción
          que ordena todo lo demás: un auditor acreditado tiene que poder visitar un lugar, ver el material entrar,
          revisar registros y contrastar. Un límite que no se puede visitar no es un límite.
        </P>
        <P>
          La consecuencia práctica es que el proyecto no puede definirse por el conjunto de consumidores que separan en
          su casa. Se define por la instalación donde el material se transforma. El hogar es origen del material y
          origen del dato; no es el límite del proyecto.
        </P>
        <P>
          Eso ordena también la titularidad. Intervienen tres partes: quien genera el residuo, quien lo procesa y quien
          produce el registro. Nuestra posición es que el titular del crédito es quien sostiene el límite del proyecto y
          asume sus obligaciones de monitoreo, y que la capa de verificación se remunera contractualmente, no mediante
          titularidad. Es una posición, no una regla: debe instrumentarse por contrato antes de iniciar cualquier
          registro, y hacerlo después es una de las formas más comunes de perder un proyecto ya validado.
        </P>

        <Card>
          <Rubro t={t}>El transporte está dentro del límite</Rubro>
          <div style={{ fontSize: 14, lineHeight: 1.75, color: sub, marginBottom: 12 }}>
            El párrafo 21 define el límite del proyecto como el sitio físico y geográfico donde el residuo habría sido
            dispuesto, donde ocurre el compostaje, donde se maneja o aplica el compost, <strong style={{ color: text }}>y
            los itinerarios entre ellos donde ocurre el transporte</strong>.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.75, color: sub, marginBottom: 12 }}>
            Eso tiene dos consecuencias simétricas. La trazabilidad del traslado no es un agregado del sistema de
            medición: es parte del proyecto, y por eso el tercero de nuestros cuatro datos existe. Y a la vez, las
            emisiones de ese transporte son emisiones del proyecto, y se computan con la herramienta de CO₂ por
            combustión de combustibles fósiles que la metodología referencia.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.75, color: sub }}>
            De ahí que una logística de baja emisión dentro del límite —vehículos eléctricos o a pedal para los tramos
            cortos— no sea una decisión estética: reduce las emisiones del proyecto y por lo tanto aumenta la reducción
            neta de la ecuación. No forma parte de la primera etapa, donde el transporte lo realiza quien ya lo realiza
            y nosotros solo lo medimos; es una palanca de optimización que tiene sentido cuando exista volumen.
          </div>
        </Card>

        <H n="2" tt="Las dos metodologías son dos proyectos" />
        <P>
          Residuos orgánicos y residuos electrónicos no pueden agruparse en un mismo proyecto: metodologías,
          límites, líneas de base y auditorías distintas. Lo que sigue está citado de los documentos originales,
          con número de párrafo.
        </P>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Orgánicos · AMS-III.F v12.0</div>
          <Fila k="Identificación" v="Small-scale methodology: Avoidance of methane emissions through composting. Alcance sectorial 13. Vigente desde el 4 de noviembre de 2016 (EB 92, Anexo 11)." />
          <Fila k="Alcance (¶2)" v="Medidas para evitar emisiones de metano de biomasa u otra materia orgánica que de otro modo habría quedado a descomponerse anaeróbicamente en un sitio de disposición de residuos sólidos. El proyecto introduce tratamiento aeróbico controlado por compostaje." />
          <Fila k="Exclusiones (¶3)" v="El proyecto no recupera ni quema gas de relleno —eso es AMS-III.G— ni realiza combustión controlada —AMS-III.E—. La digestión anaeróbica va por AMS-III.AO." />
          <Fila k="Límite de escala (¶4)" v="Reducciones menores o iguales a 60 kt CO₂eq anuales." />
          <Fila k="Aplicabilidad (¶5)" v="Compostaje de la fracción orgánica de residuos sólidos urbanos y de biomasa de actividades agrícolas o agroindustriales." />
          <Fila k="Capacidad ociosa (¶6)" v="La metodología contempla expresamente las actividades que aumentan la utilización de capacidad de una instalación existente. Exige demostrar que se hicieron esfuerzos especiales, que la instalación cumple toda la normativa aplicable y que no está incluida en otro proyecto MDL." />
          <Fila k="Verificación ex ante (¶11)" v="Para residuos desviados de un sitio de disposición hay que establecer, al inicio de cada período de acreditación, que el relleno identificado podría haber recibido ese material, o bien que disponer en relleno es práctica común en la región." />
          <Fila k="Alcance territorial (¶12)" v="Hay que definir y documentar el límite geográfico de la región. Si el residuo se transporta hasta 50 km, la región puede cubrir un radio de 50 km; en ningún caso más de 200 km. Una vez definido no se cambia durante el período de acreditación." />
          <Fila k="Destino del compost (¶13, ¶15)" v="Si el compost se maneja aeróbicamente y se aplica al suelo, hay que asegurar las condiciones que eviten emisiones de metano. Si se almacena en condiciones anaeróbicas o va a relleno, las emisiones del contenido orgánico residual se computan con la herramienta de emisiones de sitios de disposición." />
        </Card>
        <div style={{ height: 10 }} />
        <Card>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#9333ea", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Electrónicos · AMS-III.BA + VMR0008</div>
          <Fila k="Regla central" v="AMS-III.BA no se acepta como metodología independiente en el programa VCS: debe aplicarse junto con VMR0008." />
          <Fila k="VMR0008 v1.0" v="Activa desde el 4 de septiembre de 2023, obligatoria para proyectos nuevos desde esa fecha." />
          <Fila k="Qué agrega" v="Un factor de descuento por la incertidumbre sobre el desplazamiento real de producción de material virgen atribuible al proyecto." />
          <Fila k="Alcance sectorial" v="13 · Manejo y disposición de residuos. Tipo de elegibilidad: reducciones." />
        </Card>
        <Pend>
          Las condiciones de aplicabilidad de AMS-III.BA y el texto de VMR0008 todavía no fueron incorporados desde
          sus documentos originales. La sección de orgánicos sí está citada del documento; la de electrónicos está
          tomada del registro público de Verra.
        </Pend>

        <H n="3" tt="Línea de base, emisiones del proyecto y el descuento por capacidad previa" />
        <P>
          El escenario de línea de base (¶22) es la situación en que, sin el proyecto, la materia orgánica queda a
          descomponerse dentro del límite del proyecto y el metano se emite a la atmósfera. Las emisiones de línea de
          base se calculan con el modelo de decaimiento de primer orden de la herramienta de emisiones de sitios de
          disposición (¶23), y excluyen el metano que por normativa debería ser capturado o quemado (¶24).
        </P>
        <Card>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 13.5, lineHeight: 2, marginBottom: 14 }}>
            BE<sub>y</sub> = BE<sub>CH4,SWDS,y</sub> + BE<sub>ww,y</sub> + BE<sub>CH4,manure,y</sub> − MD<sub>y,reg</sub> × GWP<sub>CH4</sub><br />
            ER<sub>y</sub> = BE<sub>y</sub> − (PE<sub>y</sub> + LE<sub>y</sub>)<br />
            ER<sub>y</sub> = (BE<sub>y</sub> − PE<sub>y</sub> − LE<sub>y</sub>) × (1 − r)   ← instalación existente<br />
            r = WCOM<sub>BAU</sub> / TWCOM<sub>y</sub>
          </div>
          <div style={{ fontSize: 13.5, color: sub, lineHeight: 1.7 }}>
            Las ecuaciones 2 y 3 de la metodología distinguen dos casos. Para una instalación nueva o ampliada, la
            reducción es la línea de base menos emisiones del proyecto y fugas. Para una instalación existente cuya
            utilización de capacidad aumenta, ese resultado se multiplica por (1 − r), donde r es el cociente entre el
            volumen que la planta ya compostaba como práctica habitual —el mayor de los últimos cinco años— y el total
            compostado en el año.
          </div>
        </Card>
        <P>
          Ese descuento tiene una consecuencia operativa que conviene decir en voz alta: <strong style={{ color: text }}>cuanto
          más composta hoy una planta, menos crédito genera el material que le llevemos</strong>. Una instalación
          habilitada con poca actividad actual produce más reducción atribuible que una que ya opera a buen ritmo. Y la
          validación exige los registros históricos de los últimos cinco años con verificación cruzada, por ejemplo
          facturas de venta de compost (¶32).
        </P>
        <P>
          El factor de 0,05 kg CH₄ por kilo que usamos como referencia proviene de los valores por defecto del IPCC
          para residuo alimentario, y el bruto teórico resultante ronda 1,4 kg CO₂eq por kilo. La metodología admite
          aplicar la herramienta con un factor f = 0,1 para considerar la oxidación del metano en la capa superior del
          relleno. Publicamos 0,8 kg CO₂eq por kilo como valor declarado y conservador; el valor que corresponda saldrá
          del estudio de línea de base con la tasa de captura real del relleno de destino.
        </P>
        <P>
          El MCF de 0,8 que la metodología permite bajo demanda suprimida (¶25) <strong style={{ color: text }}>no
          nos aplica</strong>: exige demostrar vertido incontrolado por falta de un sistema organizado de recolección y
          disposición. La Ciudad de Buenos Aires tiene recolección organizada, de modo que corresponden los valores
          estándar de la herramienta.
        </P>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Qué exige monitorear</div>
          <Fila k="Cantidad compostada (tabla 1)" v="Total anual compostado en la instalación, en toneladas, medido con báscula puente u otro dispositivo de pesaje calibrado y aplicable, por ejemplo balanzas de cinta. Frecuencia mensual. Calibración periódica según estipulación del proveedor." />
          <Fila k="Condiciones del proceso (¶33)" v="La operación debe documentarse en un programa de control de calidad que monitoree las condiciones y procedimientos que aseguran el estado aeróbico del residuo: temperatura y humedad en las distintas etapas." />
          <Fila k="Aplicación al suelo (¶34)" v="Hay que documentar la venta o entrega del compost y verificar en terreno su aplicación correcta, sobre una muestra representativa de sitios de usuarios. La cadena no termina en la planta." />
          <Fila k="Emisiones del proceso y fugas (¶26, ¶28)" v="Las emisiones del compostaje se determinan con la herramienta de emisiones de proyecto y fugas por compostaje. Si el compost queda en almacenamiento anaeróbico o va a relleno, se computa como fuga." />
          <Fila k="Electricidad y combustibles" v="Según las herramientas correspondientes, o alternativamente asumiendo que todo el equipamiento eléctrico opera a plena capacidad más un 10 % por pérdidas de distribución, 8.760 horas al año." />
        </Card>
        <P>
          Leído en conjunto, el monitoreo que exige la metodología es casi exactamente el sistema que estamos
          construyendo: pesaje calibrado con frecuencia mensual, registro documentado de condiciones del proceso, y
          trazabilidad del material hasta su destino final. La diferencia es que la metodología lo pide en papel y
          nosotros lo producimos como dato continuo y firmado en origen.
        </P>

        <H n="4" tt="Arquitectura del dato" />
        <P>
          Un registro es certificable cuando tiene cuatro datos y cada uno tiene un responsable identificable. Si falta
          uno, el registro existe pero no computa.
        </P>
        <Card>
          <Fila k="Origen" v="Quién generó el material, dónde y cuándo. Fotografía con coordenadas e identificación del sitio. La imagen clasifica el material; no es el peso de registro." />
          <Fila k="Peso" v="Medido por balanza, firmado criptográficamente en el propio equipo antes de salir hacia el teléfono o la red." />
          <Fila k="Traslado" v="Transportista identificado, remito digital, trazabilidad del lote entre origen y destino." />
          <Fila k="Confirmación de procesamiento" v="La instalación habilitada confirma recepción y tratamiento. Es el dato que cierra el registro y el que casi ningún sistema produce hoy." />
        </Card>
        <P>
          El cuarto dato es también nuestra dependencia principal: sin una instalación que confirme, los tres primeros
          describen un traslado, no una transformación.
        </P>

        <H n="5" tt="Diseño del instrumento de medición" />
        <Card>
          <Fila k="Sensado" v="Celdas de carga con conversor analógico-digital dedicado de alta resolución." />
          <Fila k="Cómputo y enlace" v="Microcontrolador con conectividad, que firma la lectura antes de transmitirla." />
          <Fila k="Firma en origen" v="La firma criptográfica se genera dentro del equipo. Un valor alterado después de la pesada no valida contra la clave del dispositivo." />
          <Fila k="Tara por recipiente" v="Cada recipiente lleva identificación con su tara registrada. El peso neto se calcula contra esa tara y nunca contra un valor declarado por el usuario." />
          <Fila k="Ante desconexión" v="El equipo almacena localmente las lecturas firmadas y las transmite al recuperar enlace. Una interrupción de red no produce un hueco en el registro." />
          <Fila k="Calibración" v="Contra pesos patrón, con registro de cada calibración asociado al número de serie del equipo." />
        </Card>
        <Pend>
          El instrumento está diseñado y no fabricado. Los valores de precisión, deriva y consumo se completan con los
          ensayos de la primera serie. Hasta entonces este documento describe el diseño, no mide su desempeño.
        </Pend>

        <H n="6" tt="Protocolo de integridad" />
        <P>
          Un sistema de verificación se juzga por lo que rechaza, no por lo que acepta.
        </P>
        <Card>
          <Fila k="Antiduplicado" v="Un lote no puede registrarse dos veces: el identificador del recipiente y la marca temporal de la pesada cierran el registro." />
          <Fila k="Cadena de custodia" v="Cada traspaso deja constancia con responsable identificado. Un lote sin continuidad entre origen y destino no computa." />
          <Fila k="Qué invalida un registro" v="Ausencia de confirmación de procesamiento, discrepancia entre peso de origen y de destino por encima del umbral, identificador de recipiente inconsistente, o calibración vencida del equipo." />
          <Fila k="Tasa de rechazo" v="Se publica. Un proyecto con tasa de rechazo cero no es un proyecto riguroso: es uno que no controla. Nuestra tasa actual, con validación manual, está en el orden de un tercio del material registrado." />
          <Fila k="Validación manual" v="Mientras no haya balanza en operación, los registros se validan a mano uno por uno. Sirve para probar el circuito; no sostiene una certificación y no lo presentamos como si lo hiciera." />
        </Card>

        <H n="7" tt="Lo que no sabemos" />
        <Card>
          <Fila k="Condiciones de aplicabilidad" v="Pendientes de incorporar textualmente desde los PDF de ambas metodologías." />
          <Fila k="Tasa de captura del relleno" v="Determina cuánto del bruto teórico es efectivamente evitable. Sin ese dato, cualquier factor es una elección declarada." />
          <Fila k="Desempeño del instrumento" v="Precisión y deriva reales, pendientes de la primera serie fabricada." />
          <Fila k="Correlación entre estimación visual y peso" v="Pendiente de medir contra balanza durante varias semanas antes de afirmar nada sobre ella." />
          <Fila k="Instalación habilitada" v="En conversaciones, sin acuerdo firmado. Es la dependencia que condiciona todo lo anterior." />
          <Fila k="Titularidad de los créditos" v="Posición definida, instrumentación contractual pendiente." />
        </Card>
        <P>
          Esta sección existe porque un documento técnico que no declara sus huecos no es un documento técnico. Si algo
          de lo anterior cambia, cambia acá primero.
        </P>

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${border}`, fontSize: 12, color: sub, lineHeight: 1.7 }}>
          Circulab Tech · Documento confidencial, entregado bajo acuerdo de no divulgación.
          Fuentes: base de datos de metodologías del CDM (UNFCCC) y registro de metodologías de Verra.
          El caso de negocio, el pedido y las condiciones comerciales están publicados y abiertos en <a href="/inversion" style={{ color: accent }}>oliviacirculab.com.ar/inversion</a>.
        </div>

      </div>
    </div>
  )
}
