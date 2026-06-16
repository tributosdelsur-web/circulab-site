const fs = require('fs');
let c = fs.readFileSync('app/admin/page.tsx', 'utf8');

if (!c.includes("id:'linkedin'")) {
  c = c.replace(
    `  {id:'inversores_crm',l:\`Investor CRM (\${inversoresCRM.length})\`,icon:'💰'}`,
    `  {id:'inversores_crm',l:\`Investor CRM (\${inversoresCRM.length})\`,icon:'💰'},
  {id:'linkedin',l:'LinkedIn Studio',icon:'💼'},
  {id:'newsletter',l:'Newsletter',icon:'📧'},
  {id:'community',l:'Community Engine',icon:'🤝'},
  {id:'camp_ciudadana',l:'Campaña Ciudadana',icon:'👤'},
  {id:'camp_consorcios',l:'Consorcios',icon:'🏢'},
  {id:'camp_gastro',l:'Gastronómico',icon:'🍽️'},
  {id:'camp_rse',l:'RSE/ESG',icon:'🏛️'},
  {id:'camp_emisores',l:'Grandes Emisores',icon:'🚢'},
  {id:'camp_municipios',l:'Municipios',icon:'🏙️'},
  {id:'pipeline',l:'Pipeline Comercial',icon:'📊'},
  {id:'ventas',l:'Ventas Directas',icon:'💵'},
  {id:'manual',l:'Manual Operativo',icon:'📖'}`
  );
  console.log('OK Tabs agregados');
} else {
  console.log('-- Tabs ya existen');
}

if (!c.includes("import React")) {
  c = c.replace("'use client'", "'use client'\nimport React from 'react'");
  console.log('OK React import agregado');
}

fs.writeFileSync('app/admin/page.tsx', c);
console.log('Script 09 OK');
