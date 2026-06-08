'use client'
export default function Terminos() {
  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',padding:'24px 20px 60px'}}>
      <div style={{maxWidth:600,margin:'0 auto'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none',marginBottom:32}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
          <span style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>OLIVIA Circulab</span>
        </a>
        <div style={{fontSize:24,fontWeight:900,marginBottom:8}}>Términos y Condiciones</div>
        <div style={{fontSize:12,color:'#64748b',marginBottom:32}}>Última actualización: Junio 2026</div>
        {[
          {titulo:'1. Aceptación',texto:'Al usar OLIVIA Circulab aceptás estos términos. Si no estás de acuerdo no uses la plataforma.'},
          {titulo:'2. El servicio',texto:'OLIVIA Circulab es una plataforma de verificación de residuos y generación de tokens OLV. Permitimos a los usuarios registrar residuos reciclados, verificarlos con inteligencia artificial y acumular tokens ambientales.'},
          {titulo:'3. Tokens OLV',texto:'Los tokens OLV son activos ambientales digitales generados por comportamiento de reciclaje verificado. No son moneda de curso legal ni instrumentos financieros regulados en Argentina. Su valor futuro depende de la certificación de créditos de carbono bajo estándares Verra VCS y Art. 6.4 del Acuerdo de París, lo cual no está garantizado. Los tokens se acreditan solo cuando el equipo OLIVIA verifica la disposición final del residuo.'},
          {titulo:'4. Obligaciones del usuario',texto:'El usuario se compromete a registrar solo residuos reales que efectivamente recicla, subir fotos verídicas sin manipulación, proporcionar información geográfica correcta, y no intentar engañar al sistema de verificación con IA.'},
          {titulo:'5. Verificación y validación',texto:'OLIVIA se reserva el derecho de rechazar registros que no cumplan los criterios de verificación. Los tokens pendientes pueden ser revocados si se detecta fraude o información incorrecta.'},
          {titulo:'6. Privacidad',texto:'El uso de tus datos está regido por nuestra Política de Privacidad disponible en oliviacirculab.com.ar/privacidad.'},
          {titulo:'7. Modificaciones',texto:'OLIVIA puede modificar estos términos con 30 días de anticipación. El uso continuado de la plataforma implica aceptación de los nuevos términos.'},
          {titulo:'8. Limitación de responsabilidad',texto:'OLIVIA no garantiza un valor económico específico para los tokens OLV. Los pagos futuros dependen de la certificación con Verra y del precio del mercado de carbono, que puede variar.'},
          {titulo:'9. Contacto',texto:'Para consultas sobre estos términos: hola@oliviacirculab.com.ar'},
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
