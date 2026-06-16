'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'


export default function Metamorfosis() {
  const [dark, setDark] = useState(true)
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [totalKg, setTotalKg] = useState(0)
  const [totalUsuarios, setTotalUsuarios] = useState(0)
  const es = lang === 'es'

  const bg = dark ? '#0a0e1a' : '#f7f5f1'
  const text = dark ? '#f1f5f9' : '#0d0d0d'
  const sub = dark ? '#64748b' : '#6b7280'
  const card = dark ? '#111827' : '#ffffff'
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const accent = '#22c55e'

  useEffect(() => {
    async function cargar() {
      const [{ data: residuos }, { data: usuarios }] = await Promise.all([
        supabase.from('residuos').select('peso_kg'),
        supabase.from('usuarios').select('id', { count: 'exact' }),
      ])
      const kg = (residuos || []).reduce((a: number, r: any) => a + Number(r.peso_kg || 0), 0)
      setTotalKg(kg)
      setTotalUsuarios(usuarios?.length || 0)
    }
    cargar()
  }, [])

  const RESIDUOS = [
    { icon: '🌿', tipo: es ? 'Orgánico' : 'Organic', cert: 'Verra AMS-III.AJ + VMR0007', olv: '180 OLV/kg', co2: '1.8 kg CO2eq/kg', color: '#22c55e' },
    { icon: '♻️', tipo: es ? 'Plástico' : 'Plastic', cert: 'GS Solid Waste v1.0', olv: '150 OLV/kg', co2: '1.5 kg CO2eq/kg', color: '#3b82f6' },
    { icon: '📄', tipo: es ? 'Papel' : 'Paper', cert: 'Gold Standard AMS-III.AJ', olv: '90 OLV/kg', co2: '0.9 kg CO2eq/kg', color: '#f59e0b' },
    { icon: '🔩', tipo: es ? 'Metal' : 'Metal', cert: 'Verra AMS-III.AJ', olv: '800 OLV/kg', co2: '8.0 kg CO2eq/kg', color: '#ef4444' },
    { icon: '🛢️', tipo: es ? 'Aceite' : 'Oil', cert: 'Verra AMS-III.AK', olv: '250 OLV/kg', co2: '2.5 kg CO2eq/kg', color: '#f97316' },
    { icon: '🍾', tipo: es ? 'Vidrio' : 'Glass', cert: 'Verra AMS-III.AJ', olv: '30 OLV/kg', co2: '0.3 kg CO2eq/kg', color: '#a855f7' },
    { icon: '👕', tipo: es ? 'Textil' : 'Textile', cert: es ? 'En desarrollo' : 'In development', olv: 'TBD', co2: 'TBD', color: '#ec4899' },
    { icon: '🍃', tipo: es ? 'Hojas/Ramas' : 'Leaves/Branches', cert: 'GS Solid Waste v1.0', olv: '210 OLV/kg', co2: '2.1 kg CO2eq/kg', color: '#22c55e' },
  ]

  const CLIENTES = [
    { icon: '🏠', titulo: es ? 'Vecino / Ciudadano' : 'Neighbor / Citizen', desc: es ? 'Separa desde casa. Foto + GPS activa sus OLV Verdes. Sin inversión, sin experiencia previa.' : 'Separates from home. Photo + GPS activates Green OLV. No investment, no prior experience.', color: '#22c55e' },
    { icon: '🏢', titulo: es ? 'Consorcio / Edificio' : 'Building / HOA', desc: es ? 'Cumplimiento Ley Basura Cero CABA. Badge Edificio Verde certificado. Créditos de carbono en 2027.' : 'Compliance with Buenos Aires Zero Waste Law. Certified Green Building badge. Carbon credits in 2027.', color: '#3b82f6' },
    { icon: '🍽️', titulo: es ? 'Restorán / Hotel' : 'Restaurant / Hotel', desc: es ? 'Badge Verde para Tripadvisor. Reporte ESG mensual. Certificación Verra VCS 2027.' : 'Green badge for Tripadvisor. Monthly ESG report. Verra VCS 2027 certification.', color: '#f59e0b' },
    { icon: '🏛️', titulo: es ? 'Empresa RSE / ESG' : 'RSE / ESG Company', desc: es ? 'Compensación de huella verificada con IA. Datos GRI-compatibles. Sin offsets genéricos.' : 'AI-verified footprint compensation. GRI-compatible data. No generic offsets.', color: '#a855f7' },
    { icon: '🚢', titulo: es ? 'Grandes Emisores' : 'Large Emitters', desc: es ? 'Navieras · Mineras · Aerolíneas. CORSIA · IMO 2050 · SEC Climate Disclosure.' : 'Shipping · Mining · Airlines. CORSIA · IMO 2050 · SEC Climate Disclosure.', color: '#06b6d4' },
    { icon: '🏙️', titulo: es ? 'Municipio' : 'Municipality', desc: es ? 'Datos dMRV para fondos BID y GCF. Mapa de calor por barrio. Reportes automáticos.' : 'dMRV data for BID and GCF funds. Heat map by neighborhood. Automatic reports.', color: '#ec4899' },
  ]

  const TRAMOS = [
    { icon: '🌱', tramo: 'SEMILLA 2026', desc: es ? 'Activo hoy · OLV acumulándose · Sin valor monetario · Construís historial para Verra' : 'Active today · OLV accumulating · No monetary value · Building Verra history', color: '#22c55e', activo: true },
    { icon: '🌿', tramo: 'BROTE Q4 2026', desc: es ? 'OLV canjeables por servicios · Convenios partner · 3 consorcios piloto' : 'OLV redeemable for services · Partner deals · 3 pilot buildings', color: '#3b82f6', activo: false },
    { icon: '🌳', tramo: 'ÁRBOL 2027 💰', desc: es ? 'Certificación Verra VCS · USD 22-45/t · Primer pago real · 6.329 OLV = USD 1 · ✅ Verra validó dMRV Feb 2026' : 'Verra VCS certification · USD 22-45/t · First real payment · 6,329 OLV = USD 1', color: '#f59e0b', activo: false },
    { icon: '🌲', tramo: 'BOSQUE 2028', desc: es ? 'Art. 6.4 París · USD 50-130/t · Corredor LATAM · 2.198 OLV = USD 1' : 'Art. 6.4 Paris · USD 50-130/t · LATAM corridor · 2,198 OLV = USD 1', color: '#a855f7', activo: false },
    { icon: '🏔️', tramo: 'SELVA 2029', desc: es ? 'OLIVIA Ocean + Waters + Space · 1.429 OLV = USD 1' : 'OLIVIA Ocean + Waters + Space · 1,429 OLV = USD 1', color: '#ec4899', activo: false },
    { icon: '🌊', tramo: 'SUMIDERO 2030+', desc: es ? 'Net positive verificado · 952 OLV = USD 1 · Infraestructura climática global' : 'Verified net positive · 952 OLV = USD 1 · Global climate infrastructure', color: '#06b6d4', activo: false },
  ]

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter,system-ui', transition: 'all 0.3s' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: dark ? 'rgba(10,14,26,0.95)' : 'rgba(247,245,241,0.95)', borderBottom: `1px solid ${border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logoOC.png" alt="OLIVIA" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metamorfosis</div>
            <div style={{ fontSize: 9, color: sub, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>by Circulab Tech</div>
          </div>
        </a>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <a href="/ciudadano" style={{ background: accent, color: '#050505', padding: '6px 14px', borderRadius: 20, fontSize: 10, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {es ? 'Registrarme' : 'Register'}
          </a>
          <button onClick={() => setLang(es ? 'en' : 'es')} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer', background: 'transparent', color: text, fontFamily: 'monospace' }}>
            {es ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setDark(!dark)} style={{ border: `1px solid ${border}`, borderRadius: 20, padding: '5px 9px', fontSize: 12, cursor: 'pointer', background: 'transparent', color: text }}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '60px 24px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: accent, marginBottom: 12 }}>
          [ {es ? 'Primera vertical de Circulab Tech' : 'First Circulab Tech vertical'} ]
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 16 }}>
          <span style={{ color: accent }}>Meta</span>morfosis
        </h1>
        <p style={{ fontSize: 18, color: sub, lineHeight: 1.7, maxWidth: 600, margin: '0 auto 32px' }}>
          {es
            ? 'Convertimos residuos urbanos en créditos de carbono verificados con IA. La primera infraestructura dMRV ciudadana de América Latina.'
            : 'We convert urban waste into AI-verified carbon credits. The first citizen dMRV infrastructure in Latin America.'}
        </p>

        {/* KPIs en tiempo real */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 500, margin: '0 auto 40px' }}>
          {[
            { valor: totalUsuarios.toString(), label: es ? 'Ciudadanos activos' : 'Active citizens', color: accent },
            { valor: totalKg.toFixed(1) + ' kg', label: es ? 'Verificados con IA' : 'AI-verified', color: '#3b82f6' },
            { valor: '✅', label: es ? 'Verra validó · Feb 2026' : 'Verra validated · Feb 2026', color: '#f59e0b' },
          ].map((kpi, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '16px 12px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: kpi.color, marginBottom: 4 }}>{kpi.valor}</div>
              <div style={{ fontSize: 9, color: sub, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.4 }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/ciudadano" style={{ background: accent, color: '#050505', padding: '14px 28px', borderRadius: 40, fontSize: 12, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {es ? 'Quiero participar' : 'I want to participate'}
          </a>
          <a href="/institucional" style={{ border: `1px solid ${border}`, color: text, padding: '14px 28px', borderRadius: 40, fontSize: 12, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {es ? 'Soy inversor' : "I'm an investor"}
          </a>
        </div>
      </section>

      {/* EL PROBLEMA */}
      <section style={{ padding: '48px 24px', background: dark ? 'rgba(239,68,68,0.04)' : 'rgba(239,68,68,0.02)', borderTop: '1px solid rgba(239,68,68,0.1)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#ef4444', marginBottom: 12 }}>[ {es ? 'El problema' : 'The problem'} ]</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20 }}>
            {es ? 'Las plantas de reciclaje de CABA trabajan al 35% de su capacidad.' : 'Buenos Aires recycling plants operate at 35% capacity.'}
          </h2>
          <p style={{ fontSize: 14, color: sub, lineHeight: 1.8, marginBottom: 16 }}>
            {es
              ? 'No porque no haya residuos. Porque el ciudadano no tiene razón económica para separarlos. La infraestructura ya existe — los camiones, las plantas, las cooperativas, el marco legal. Lo que faltaba era la capa de datos que conecta al ciudadano con el mercado de carbono.'
              : 'Not because there is no waste. Because citizens have no economic reason to separate it. The infrastructure already exists — trucks, plants, cooperatives, legal framework. What was missing was the data layer connecting citizens to the carbon market.'}
          </p>
          <div style={{ fontSize: 14, color: accent, fontWeight: 700, fontStyle: 'italic' }}>
            {es ? '"Metamorfosis es esa capa."' : '"Metamorfosis is that layer."'}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: accent, marginBottom: 12, textAlign: 'center' }}>[ {es ? 'Cómo funciona' : 'How it works'} ]</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, textAlign: 'center', marginBottom: 32 }}>
            {es ? 'dMRV ciudadano · 4 pasos' : 'Citizen dMRV · 4 steps'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            {[
              { num: '01', icon: '📸', titulo: es ? 'Registrás con foto + GPS' : 'Register with photo + GPS', desc: es ? 'Desde la app OLIVIA. Foto del residuo en origen. GPS del domicilio activo. La IA analiza el tipo y estima el peso.' : 'From the OLIVIA app. Photo of waste at origin. Active GPS of home. AI analyzes type and estimates weight.', color: accent },
              { num: '02', icon: '🤖', titulo: es ? 'IA verifica en tiempo real' : 'AI verifies in real time', desc: es ? 'LLaVA via Cloudflare Workers AI analiza la imagen. Detecta el tipo de residuo, confirma que no es repetida, y estima el CO2eq evitado.' : 'LLaVA via Cloudflare Workers AI analyzes the image. Detects waste type, confirms it is not repeated, estimates CO2eq avoided.', color: '#3b82f6' },
              { num: '03', icon: '📍', titulo: es ? 'Segunda foto en el punto verde' : 'Second photo at green point', desc: es ? 'Al llevar el residuo al punto de entrega verificado. GPS confirma la ubicación. Solo entonces se acreditan los OLV Verdes.' : 'When taking waste to verified drop-off point. GPS confirms location. Only then are Green OLV credited.', color: '#f59e0b' },
              { num: '04', icon: '🌿', titulo: es ? 'OLV Verdes acreditados' : 'Green OLV credited', desc: es ? 'Los OLV quedan en tu wallet como activos pendientes de certificación. En Árbol 2027 cuando Verra certifique, se convierten en USD reales.' : 'OLV remain in your wallet as assets pending certification. In Árbol 2027 when Verra certifies, they convert to real USD.', color: accent },
            ].map((paso, i) => (
              <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '20px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ fontSize: 9, fontWeight: 900, color: paso.color, fontFamily: 'monospace', opacity: 0.5, paddingTop: 2 }}>{paso.num}</div>
                  <span style={{ fontSize: 28 }}>{paso.icon}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: paso.color, marginBottom: 8 }}>{paso.titulo}</div>
                <div style={{ fontSize: 11, color: sub, lineHeight: 1.7 }}>{paso.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 TIPOS DE RESIDUO */}
      <section style={{ padding: '48px 24px', background: dark ? 'rgba(34,197,94,0.02)' : 'rgba(34,197,94,0.02)', borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: accent, marginBottom: 12, textAlign: 'center' }}>[ {es ? 'Residuos verificables' : 'Verifiable waste'} ]</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', marginBottom: 24 }}>
            {es ? '8 tipos · Una certificadora por material' : '8 types · One certifier per material'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {RESIDUOS.map((r, i) => (
              <div key={i} style={{ background: card, border: `1px solid ${r.color}22`, borderRadius: 12, padding: '14px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: r.color, marginBottom: 2 }}>{r.tipo}</div>
                  <div style={{ fontSize: 9, color: sub, marginBottom: 2 }}>{r.cert}</div>
                  <div style={{ fontSize: 10, color: text, fontWeight: 600 }}>{r.olv} · {r.co2}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, fontSize: 11, color: sub, lineHeight: 1.6, textAlign: 'center' }}>
            {es
              ? '⚠️ Los valores en OLV y CO2eq son estimaciones. El valor monetario de los OLV Verdes se materializa únicamente con la certificación formal de Verra VCS, estimada para el tramo Árbol 2027.'
              : '⚠️ OLV and CO2eq values are estimates. The monetary value of Green OLV materializes only with formal Verra VCS certification, estimated for the Árbol 2027 stage.'}
          </div>
        </div>
      </section>

      {/* 6 CLIENTES */}
      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: accent, marginBottom: 12, textAlign: 'center' }}>[ {es ? 'Para quién es' : 'Who it is for'} ]</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', marginBottom: 24 }}>
            {es ? '6 tipos de cliente · Un solo sistema' : '6 client types · One system'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {CLIENTES.map((c, i) => (
              <div key={i} style={{ background: card, border: `1px solid ${c.color}22`, borderRadius: 14, padding: '16px' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.color, marginBottom: 6 }}>{c.titulo}</div>
                <div style={{ fontSize: 11, color: sub, lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 TRAMOS */}
      <section style={{ padding: '48px 24px', background: dark ? 'rgba(34,197,94,0.02)' : 'rgba(34,197,94,0.02)', borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', color: accent, marginBottom: 12, textAlign: 'center' }}>[ {es ? 'Hoja de ruta' : 'Roadmap'} ]</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', marginBottom: 24 }}>
            {es ? 'Los 6 tramos del ecosistema' : 'The 6 ecosystem stages'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TRAMOS.map((t, i) => (
              <div key={i} style={{ background: card, border: `2px solid ${t.activo ? t.color : border}`, borderRadius: 14, padding: '16px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 900, color: t.color }}>{t.tramo}</div>
                    {t.activo && <div style={{ fontSize: 9, fontWeight: 700, color: t.color, background: `${t.color}15`, padding: '2px 8px', borderRadius: 20 }}>ACTIVO HOY</div>}
                  </div>
                  <div style={{ fontSize: 11, color: sub, lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>
            {es ? 'El planeta no espera. Tu barrio tampoco.' : "The planet cannot wait. Neither can your neighborhood."}
          </h2>
          <p style={{ fontSize: 14, color: sub, lineHeight: 1.7, marginBottom: 32 }}>
            {es
              ? 'Registrate gratis hoy. Acumulá OLV Verdes. Cuando Verra certifique en 2027, los primeros en empezar cobran primero.'
              : 'Register for free today. Accumulate Green OLV. When Verra certifies in 2027, those who started first collect first.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/registro" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', border: 'none', borderRadius: 40, padding: '14px 32px', color: 'white', fontSize: 13, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {es ? 'Registrarme gratis' : 'Register for free'}
            </a>
            <a href="/simulador" style={{ border: `1px solid ${border}`, color: text, padding: '14px 28px', borderRadius: 40, fontSize: 13, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {es ? 'Simular mi impacto' : 'Simulate my impact'}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: '32px 24px', textAlign: 'center' }}>
        <a href="/">
          <img src="/logoOC.png" alt="OLIVIA" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 8, marginBottom: 8 }} />
        </a>
        <div style={{ fontSize: 11, fontWeight: 700, color: text, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>OLIVIA Circulab</div>
        <div style={{ fontSize: 9, color: sub, marginBottom: 16, fontFamily: 'monospace' }}>
          Metamorfosis · by Circulab Tech · Ley 27.506 · Buenos Aires AI District
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          {[
            { label: es ? 'Inicio' : 'Home', href: '/' },
            { label: es ? 'Ciudadano' : 'Citizen', href: '/ciudadano' },
            { label: es ? 'Inversores' : 'Investors', href: '/institucional' },
            { label: 'Whitepaper', href: '/whitepaper' },
            { label: es ? 'Términos' : 'Terms', href: '/terminos' },
            { label: es ? 'Privacidad' : 'Privacy', href: '/privacidad' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: 11, color: sub, textDecoration: 'none' }}>{l.label}</a>
          ))}
        </div>
        <div style={{ fontSize: 9, color: '#334155', fontFamily: 'monospace' }}>© 2026 Circulab Tech · oliviacirculab.com.ar</div>
      </footer>

    </div>
  )
}
