'use client'
import SitioNav from '../../components/SitioNav'
import SitioFooter from '../../components/SitioFooter'
import Link from 'next/link'

const TEMAS = [
  { id: 'la-tierra-canta', titulo: 'La Tierra Canta', genero: 'Samba-enredo', duracion: '2:41', archivo: '/audio/olivia-la-tierra-canta.mp3', texto: 'El himno de OLIVIA: lo que la ciudad descarta vuelve al suelo, y el dato lo demuestra.' },
  { id: 'la-naranja-vuelve-a-nacer', titulo: 'La Naranja Vuelve a Nacer', genero: 'Samba-enredo', duracion: '2:36', archivo: '/audio/olivia-la-naranja-vuelve-a-nacer.mp3', texto: 'De la cáscara de tu cocina al abono de la plaza: el ciclo completo, en ritmo de escola.' },
  { id: 'rio-de-batucada', titulo: 'Río de Batucada', genero: 'Batucada instrumental', duracion: '1:51', archivo: '/audio/olivia-rio-de-batucada.mp3', texto: 'Solo tambores, para el pesaje en vivo y para cerrar el desfile.' },
]

const PASOS = [
  { n: '01', titulo: 'Material que cuenta', texto: 'Las cooperativas de recuperadores urbanos separan el material reciclado para el vestuario. Cada lote se pesa y queda registrado en OLIVIA.' },
  { n: '02', titulo: 'Vestuario reciclado', texto: 'Junto a las cooperativas, talleres de murga y de utilería transforman ese material en el vestuario de la comparsa.' },
  { n: '03', titulo: 'A la calle', texto: 'La comparsa del Carnaval Ambiental de OLIVIA sale con la samba, los recuperadores al frente y el dato de cuántos kilos volvieron al circuito.' },
]

export default function Carnaval() {
  const bg = '#06110b', card = '#0b1d13', text = '#eef5f0', sub = '#9fb3a6', accent = '#22c55e', gold = '#facc15', border = 'rgba(134,239,172,.15)'
  return (
    <main style={{ minHeight: '100vh', background: bg, color: text, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <SitioNav text={text} accent={accent} border={border} />

      <section style={{ padding: '48px 20px 16px', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.3em', color: gold, marginBottom: 12 }}>[ Carnaval Ambiental ]</div>
        <h1 style={{ fontSize: 'clamp(30px,6vw,48px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 14 }}>Lo que la ciudad descarta, <span style={{ color: accent }}>vuelve a bailar</span></h1>
        <p style={{ fontSize: 15, color: sub, lineHeight: 1.7 }}>El dato ambiental no tiene por qué ser frío. Le pusimos samba al circuito del orgánico: de la cocina de cada vecino, al dato verificado y al abono. Escuchá los temas y compartilos.</p>
      </section>

      <section style={{ padding: '24px 20px 40px', maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 20 }}>
        {TEMAS.map(t => (
          <article key={t.id} id={t.id} style={{ background: card, border: '1px solid ' + border, borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.2em', color: accent }}>{t.genero} · {t.duracion}</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{t.titulo}</h2>
            <p style={{ fontSize: 13, color: sub, lineHeight: 1.6, margin: 0, flexGrow: 1 }}>{t.texto}</p>
            <audio controls preload="none" controlsList="nodownload" src={t.archivo} style={{ width: '100%' }} />
            <a href={'https://wa.me/?text=' + encodeURIComponent('Escuchá "' + t.titulo + '", la samba de OLIVIA Circulab: https://oliviacirculab.com.ar/carnaval#' + t.id)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, color: accent, textDecoration: 'none' }}>Compartir por WhatsApp →</a>
          </article>
        ))}
      </section>

      <section style={{ padding: '32px 20px 40px', maxWidth: 1080, margin: '0 auto', borderTop: '1px solid ' + border }}>
        <div style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '.3em', color: gold, marginBottom: 10, textAlign: 'center' }}>[ Carnaval Ambiental de OLIVIA ]</div>
        <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontWeight: 900, textAlign: 'center', marginBottom: 10 }}>Una comparsa vestida con material reciclado</h2>
        <p style={{ fontSize: 14, color: sub, lineHeight: 1.7, textAlign: 'center', maxWidth: 680, margin: '0 auto 28px' }}>Estamos armando una comparsa de carnaval con vestuario hecho de materiales reciclados, junto a las cooperativas de recuperadores urbanos. Cada kilo se pesa y queda registrado.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 16 }}>
          {PASOS.map(p => (
            <div key={p.n} style={{ background: card, border: '1px solid ' + border, borderRadius: 14, padding: 18 }}>
              <div style={{ fontFamily: 'monospace', color: gold, fontWeight: 700, marginBottom: 6 }}>{p.n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 6px' }}>{p.titulo}</h3>
              <p style={{ fontSize: 13, color: sub, lineHeight: 1.6, margin: 0 }}>{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px 20px 56px', textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Sumate al carnaval</h2>
        <p style={{ fontSize: 14, color: sub, lineHeight: 1.7, marginBottom: 18 }}>¿Sos de una murga, una cooperativa, un taller o simplemente te gusta el tambor? Escribinos.</p>
        <a href="mailto:hola@oliviacirculab.com.ar?subject=Quiero%20sumarme%20a%20la%20comparsa%20de%20OLIVIA" style={{ display: 'inline-block', background: accent, color: '#04110a', fontWeight: 800, padding: '12px 22px', borderRadius: 999, textDecoration: 'none' }}>Quiero sumarme</a>
        <div style={{ marginTop: 16 }}><Link href="/videos" style={{ color: accent, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Ver los videos de OLIVIA →</Link></div>
      </section>

      <SitioFooter text={text} sub={sub} border={border} />
    </main>
  )
}
