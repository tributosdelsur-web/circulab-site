const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://cyelsbppghefpkvvovpw.supabase.co',
  'sb_publishable_XSIqGV1HXijRpaExmjJf2A_2quy5Xo0'
);

const fondos = [
  { fondo_nombre:'BID Lab · Banco Interamericano', tipo:'grant', estado:'pendiente', deadline:'2026-06-30', monto_potencial:'USD 150K-1M', contacto:'bidlab.org', notas:'VC impacto ambiental · permanente', next_step:'Postular en bidlab.org', url:'https://bidlab.org' },
  { fondo_nombre:'IncuBAte · Gobierno CABA', tipo:'incubadora', estado:'pendiente', deadline:'2026-06-30', monto_potencial:'Gratis + mentoría', contacto:'buenosaires.gob.ar/incubate', notas:'Incubadora pública CABA', next_step:'Inscribirse en buenosaires.gob.ar/incubate', url:'https://buenosaires.gob.ar/incubate' },
  { fondo_nombre:'UdeSA · Incubadora · Claudio Darín', tipo:'incubadora', estado:'pendiente', deadline:'2026-06-30', monto_potencial:'Mentoría + red', contacto:'Claudio Darín', notas:'Incubadora universitaria · contacto Endeavor BA', next_step:'Solicitar reunión con Claudio Darín vía LinkedIn', url:'https://udesa.edu.ar' },
  { fondo_nombre:'NXTP Labs', tipo:'vc', estado:'pendiente', deadline:'2026-07-15', monto_potencial:'Seed ticket', contacto:'nxtplabs.com', notas:'VC etapa temprana LATAM', next_step:'Contactar vía LinkedIn + nxtplabs.com', url:'https://nxtplabs.com' },
  { fondo_nombre:'Diego Noriega · Squads Ventures', tipo:'vc', estado:'pendiente', deadline:'2026-07-01', monto_potencial:'Seed ticket', contacto:'Diego Noriega', notas:'VC fundraising LATAM · mensaje LinkedIn redactado', next_step:'Enviar mensaje LinkedIn redactado', url:'https://linkedin.com/in/diegonoriega' },
  { fondo_nombre:'Impacta VC + Impact Ventures PSM', tipo:'vc', estado:'pendiente', deadline:'2026-06-30', monto_potencial:'USD 100K-300K', contacto:'impacta.vc', notas:'VC climatetech LATAM', next_step:'Postular en impacta.vc', url:'https://impacta.vc' },
  { fondo_nombre:'NESsT', tipo:'grant', estado:'pendiente', deadline:'2026-06-30', monto_potencial:'Capital + aceleración', contacto:'nesst.org', notas:'Fondo ambiental LATAM', next_step:'Postular en nesst.org', url:'https://nesst.org' },
  { fondo_nombre:'Endeavor ScaleUp', tipo:'aceleradora', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'Mentoría + red + inversores', contacto:'endeavor.org.ar', notas:'Aceleradora flagship Argentina', next_step:'Postular cuando abra convocatoria julio', url:'https://endeavor.org.ar' },
  { fondo_nombre:'Globant Ventures', tipo:'vc', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'USD 50K-250K', contacto:'ventures@globant.com', notas:'Corporate VC · enviar propuesta + video + logo', next_step:'Enviar propuesta + video + logo', url:'https://globant.com' },
  { fondo_nombre:'Vox Capital', tipo:'vc', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'Seed/Serie A', contacto:'voxcapital.com.br', notas:'VC economía circular Brasil', next_step:'Contactar voxcapital.com.br', url:'https://voxcapital.com.br' },
  { fondo_nombre:'Adobe Capital', tipo:'vc', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'Seed/Serie A', contacto:'adobecapital.org', notas:'VC impacto ambiental México', next_step:'Postular en adobecapital.org', url:'https://adobecapital.org' },
  { fondo_nombre:'eAwards Argentina', tipo:'concurso', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'USD 10K hasta USD 100K', contacto:'eawards.es', notas:'Competencia con premio', next_step:'Postular en eawards.es', url:'https://eawards.es' },
  { fondo_nombre:'Seedstars', tipo:'aceleradora', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'Mentoría + inversión', contacto:'seedstars.com', notas:'Aceleradora LATAM', next_step:'Postular en seedstars.com', url:'https://seedstars.com' },
  { fondo_nombre:'LUCHA · Lima', tipo:'aceleradora', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'Mentoría + capital semilla', contacto:'luchala.org', notas:'Aceleradora impacto ambiental Lima', next_step:'Postular en luchala.org', url:'https://luchala.org' },
  { fondo_nombre:'100+ Accelerator', tipo:'aceleradora', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'Mentorías + alianzas', contacto:'100accelerator.com', notas:'Coca-Cola · Colgate · AB InBev', next_step:'Postular: Coca-Cola, Colgate, AB InBev', url:'https://100accelerator.com' },
  { fondo_nombre:'SOSV', tipo:'vc', estado:'pendiente', deadline:'2026-07-31', monto_potencial:'Pre-seed / seed', contacto:'sosv.com', notas:'VC global top tier', next_step:'Postular en sosv.com', url:'https://sosv.com' },
  { fondo_nombre:'UdeSA Startup Competition', tipo:'concurso', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'USD + pasajes USA + oficina', contacto:'udesa.edu.ar', notas:'Preparar para Demo Day diciembre', next_step:'Preparar para Demo Day diciembre', url:'https://udesa.edu.ar' },
  { fondo_nombre:'UTEC Ventures · Perú', tipo:'vc', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'Seed ticket', contacto:'utec.edu.pe/ventures', notas:'Fondo universitario Perú', next_step:'Postular en utec.edu.pe/ventures', url:'https://utec.edu.pe' },
  { fondo_nombre:'Impact Hub Argentina', tipo:'incubadora', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'Incubación + red global', contacto:'impacthub.net/ar', notas:'Red global de impacto', next_step:'Visitar y postular', url:'https://impacthub.net' },
  { fondo_nombre:'Bamboo Capital', tipo:'vc', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'Fondo economía circular', contacto:'bamboofinance.com', notas:'Especializado en economía circular', next_step:'Contactar bamboofinance.com', url:'https://bamboofinance.com' },
  { fondo_nombre:'ANPCyT Argentina', tipo:'grant', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'Financiamiento no reembolsable', contacto:'agencia.mincyt.gob.ar', notas:'Agencia Nacional de I+D Argentina', next_step:'Revisar convocatorias 2026', url:'https://agencia.mincyt.gob.ar' },
  { fondo_nombre:'CORFO Chile', tipo:'grant', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'Subsidio hasta 80%', contacto:'corfo.cl', notas:'Para expansión Chile', next_step:'Preparar para expansión Chile', url:'https://corfo.cl' },
  { fondo_nombre:'EcoEnterprises Fund', tipo:'vc', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'Green Climate Fund LATAM', contacto:'ecoenterprisesfund.com', notas:'Fondo LATAM economía verde', next_step:'Contactar ecoenterprisesfund.com', url:'https://ecoenterprisesfund.com' },
  { fondo_nombre:'Rockstart Impact', tipo:'aceleradora', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'VC impacto ambiental LATAM', contacto:'rockstart.com', notas:'Aceleradora holandesa con presencia LATAM', next_step:'Postular en rockstart.com', url:'https://rockstart.com' },
  { fondo_nombre:'Grow-NY', tipo:'concurso', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'USD 1M ganador', contacto:'grow-ny.com', notas:'Postular cuando abra convocatoria', next_step:'Postular cuando abra convocatoria', url:'https://grow-ny.com' },
  { fondo_nombre:'Savia Lotus Award', tipo:'concurso', estado:'pendiente', deadline:'2026-08-31', monto_potencial:'Premio emprendedoras latinas', contacto:'savialotus.org', notas:'Mileidy como fundadora postula', next_step:'Mileidy postula como fundadora', url:'https://savialotus.org' },
  { fondo_nombre:'Y Combinator · Batch enero 2027', tipo:'aceleradora', estado:'pendiente', deadline:'2026-10-31', monto_potencial:'USD 500K', contacto:'ycombinator.com', notas:'La aceleradora más importante del mundo', next_step:'Preparar aplicación para octubre 2026', url:'https://ycombinator.com' },
  { fondo_nombre:'Lowercarbon Capital', tipo:'vc', estado:'pendiente', deadline:'2027-01-01', monto_potencial:'Post Árbol 2027', contacto:'lowercarboncapital.com', notas:'Fondo global carbono y economía circular', next_step:'Postular post certificación Verra', url:'https://lowercarboncapital.com' },
  { fondo_nombre:'Planet A Ventures', tipo:'vc', estado:'pendiente', deadline:'2027-01-01', monto_potencial:'Post Árbol 2027', contacto:'planet-a.com', notas:'Europa · muy técnico · necesita datos dMRV sólidos', next_step:'Postular post certificación Verra con datos dMRV', url:'https://planet-a.com' },
  { fondo_nombre:'Congruent Ventures', tipo:'vc', estado:'pendiente', deadline:'2027-01-01', monto_potencial:'Post Árbol 2027', contacto:'congruentvc.com', notas:'Líder en descarbonización LATAM', next_step:'Postular post Fase 3', url:'https://congruentvc.com' },
  { fondo_nombre:'Toucan Protocol + Moss.earth', tipo:'vc', estado:'pendiente', deadline:'2027-06-01', monto_potencial:'Post Verra', contacto:'toucan.earth', notas:'Tokenización on-chain de créditos certificados', next_step:'Contactar post certificación Verra', url:'https://toucan.earth' },
  { fondo_nombre:'EIT Climate-KIC', tipo:'aceleradora', estado:'pendiente', deadline:'2027-01-01', monto_potencial:'Post Árbol 2027', contacto:'climate-kic.org', notas:'Aceleradora europea · abre mercado UE', next_step:'Postular post Fase 3', url:'https://climate-kic.org' },
  { fondo_nombre:'Gigascale Capital', tipo:'vc', estado:'pendiente', deadline:'2027-01-01', monto_potencial:'Post Árbol 2027', contacto:'gigascale.vc', notas:'Ex CTO Meta · climate tech + IA física · USD 250M', next_step:'Postular post Fase 3 con métricas sólidas', url:'https://gigascale.vc' },
  { fondo_nombre:'Green Climate Fund (ONU)', tipo:'grant', estado:'pendiente', deadline:'2027-06-01', monto_potencial:'Post Árbol 2027', contacto:'greenclimate.fund', notas:'Vía entidades acreditadas en Argentina', next_step:'Identificar entidad acreditada en Argentina', url:'https://greenclimate.fund' },
];

async function cargar() {
  console.log(`Cargando ${fondos.length} fondos...`);
  const { error } = await supabase.from('postulaciones').insert(fondos);
  if(error) {
    console.error('Error:', error.message);
  } else {
    console.log(`✅ ${fondos.length} fondos cargados exitosamente`);
  }
  process.exit(0);
}

cargar();
