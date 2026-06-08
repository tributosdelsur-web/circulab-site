'use client'
export default function Privacidad() {
  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px 20px 60px'}}>
      <div style={{maxWidth:600,margin:'0 auto'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none',marginBottom:32}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
          <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>OLIVIA Circulab</span>
        </a>
        <div style={{fontSize:24,fontWeight:900,marginBottom:8}}>Política de Privacidad</div>
        <div style={{fontSize:12,color:'#64748b',marginBottom:32}}>Última actualización: Junio 2026</div>
        {[
          {titulo:'1. Quiénes somos',texto:'OLIVIA Circulab es un producto de Circulab Tech, con sede en Buenos Aires, Argentina. Operamos una plataforma de verificación de residuos y créditos de carbono ciudadanos.'},
          {titulo:'2. Qué datos recolectamos',texto:'Recolectamos: nombre y apellido, email, barrio o localidad, fotos de residuos sin rostros, coordenadas GPS del punto de origen y entrega, tipo y peso de residuos registrados, y comportamiento dentro de la app.'},
          {titulo:'3. Para qué usamos tus datos',texto:'Usamos tus datos para verificar el reciclaje con inteligencia artificial, calcular tus tokens OLV y créditos de carbono, mostrarte tu impacto ambiental, mejorar el producto, y cumplir con los estándares de certificación Verra y Art. 6.4 del Acuerdo de París.'},
          {titulo:'4. Qué NO mostramos públicamente',texto:'Tu dirección exacta nunca es visible públicamente. Las coordenadas GPS exactas solo son accesibles por el equipo admin de OLIVIA para verificación de trazabilidad. Solo mostramos tu barrio o localidad general en tu perfil público.'},
          {titulo:'5. Fotos',texto:'Las fotos que subís son utilizadas exclusivamente para el análisis de IA y la verificación de residuos. No son compartidas con terceros sin tu consentimiento.'},
          {titulo:'6. Tokens OLV',texto:'Tus registros verificados generan tokens OLV que representan activos ambientales. Esta información puede ser compartida de forma agregada y anónima con certificadoras como Verra para obtener créditos de carbono.'},
          {titulo:'7. Tus derechos',texto:'Tenés derecho a acceder, corregir o eliminar tus datos. Para ejercer estos derechos escribinos a hola@oliviacirculab.com.ar con el asunto Derechos de privacidad.'},
          {titulo:'8. Contacto',texto:'Para cualquier consulta sobre privacidad: hola@oliviacirculab.com.ar'},
        ].map(s=>(
          <div key={s.titulo} style={{marginBottom:24}}>
            <div style={{fontSize:14,fontWeight:700,color:'#22c55e',marginBottom:8}}>{s.titulo}</div>
            <div style={{fontSize:13,color:'#94a3b8',lineHeight:1.7}}>{s.texto}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
