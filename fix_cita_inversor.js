const fs = require('fs');
let c = fs.readFileSync('app/institucional/page.tsx', 'utf8');

// Reemplazar la cita anonima por argumento tecnico
c = c.replace(
  `'Si OLIVIA se apalanca en infraestructura inteligente y digitaliza el impacto para el mercado financiero, el techo no existe. La clave esta en la velocidad de ejecucion y en cerrar contratos corporativos clave antes de que sature la competencia.'`,
  `'OLIVIA opera donde la ley ya creó la demanda. EU ETS, CORSIA y CBAM son regulaciones activas hoy que obligan a navieras, aerolíneas y exportadores a comprar créditos de carbono verificados. El mercado voluntario de Verra es el upside. El mercado regulatorio es la base que financia la operación.'`
);

c = c.replace(
  `'If OLIVIA leverages intelligent infrastructure and digitalizes impact for the financial market, there is no ceiling. The key is execution speed and closing key corporate contracts before the market saturates.'`,
  `'OLIVIA operates where the law already created the demand. EU ETS, CORSIA and CBAM are active regulations today that force shipping companies, airlines and exporters to buy verified carbon credits. The Verra voluntary market is the upside. The regulatory market is the base that funds operations.'`
);

// Cambiar la atribucion
c = c.replace(
  `— Analisis independiente de inversor · Junio 2026`,
  `— OLIVIA Circulab · Análisis de mercado · Julio 2026`
);
c = c.replace(
  `— Análisis independiente de inversor · Junio 2026`,
  `— OLIVIA Circulab · Análisis de mercado · Julio 2026`
);

fs.writeFileSync('app/institucional/page.tsx', c);
console.log('OK cita reemplazada por argumento tecnico');
