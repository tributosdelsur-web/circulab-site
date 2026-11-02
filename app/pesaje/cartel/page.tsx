import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cartel de pesaje · OLIVIA Circulab', robots: { index: false } }

// Cartel A4 para imprimir y poner sobre la mesa de la balanza.
export default function Cartel() {
  const verde = '#15803d'
  return (
    <main style={{ width: '210mm', height: '285mm', overflow: 'hidden', margin: '0 auto', background: '#fff', color: '#06110b', fontFamily: 'Inter, system-ui, sans-serif', padding: '12mm 15mm', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <style>{`@page{size:A4;margin:0} html,body{background:#fff!important;margin:0;height:auto!important;min-height:0!important} .wa-flotante{display:none!important}`}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '9mm' }}>
        <img src="/logoOC.png" alt="" style={{ width: 44, height: 44, objectFit: 'contain' }} />
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '.04em' }}>OLIVIA Circulab</span>
      </div>
      <h1 style={{ fontSize: '25mm', lineHeight: .98, fontWeight: 900, margin: '0 0 7mm', letterSpacing: '-.02em' }}>Lo que tirás <span style={{ color: verde }}>también cuenta.</span></h1>
      <p style={{ fontSize: '7mm', lineHeight: 1.3, margin: '0 0 12mm' }}>Pesá tu orgánico acá y dejalo registrado a tu nombre. Menos de un minuto.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '8mm', flexGrow: 1, alignItems: 'start' }}>
        <div style={{ border: '1mm solid ' + verde, borderRadius: '5mm', padding: '6mm', textAlign: 'center' }}>
          <img src="/qr/pesaje.svg" alt="Código QR para registrarte" style={{ width: '100%', display: 'block' }} />
          <div style={{ fontSize: '7.5mm', fontWeight: 900, marginTop: '3mm', color: verde }}>Vecinos y vecinas</div>
          <div style={{ fontSize: '4.6mm', marginTop: '1mm' }}>Registrate y cargá tu pesaje</div>
        </div>
        <div style={{ border: '.5mm solid #06110b', borderRadius: '5mm', padding: '5mm', textAlign: 'center' }}>
          <img src="/qr/organizaciones.svg" alt="Código QR para escribir por WhatsApp" style={{ width: '100%', display: 'block' }} />
          <div style={{ fontSize: '5.6mm', fontWeight: 900, marginTop: '3mm' }}>Plantas, hoteles, consorcios</div>
          <div style={{ fontSize: '4.2mm', marginTop: '1mm' }}>Hablemos de una prueba de un mes</div>
        </div>
      </div>
      <p style={{ fontSize: '3.5mm', lineHeight: 1.45, marginTop: '8mm' }}>Pesamos con una balanza digital, cargamos el dato a mano y el equipo lo revisa. Los OLV son un registro ambiental: no tienen valor monetario, no se canjean ni se cobran. oliviacirculab.com.ar/pesaje</p>
    </main>
  )
}
