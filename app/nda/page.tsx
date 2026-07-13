'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function NDA() {
  const [lang, setLang] = useState<'es'|'en'>('es')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [cargo, setCargo] = useState('')
  const [acepta, setAcepta] = useState(false)
  const [loading, setLoading] = useState(false)
  const [firmado, setFirmado] = useState(false)
  const [error, setError] = useState('')

  const bg = '#0a0e1a'
  const text = '#f1f5f9'
  const sub = '#64748b'
  const card = '#111827'
  const border = 'rgba(255,255,255,0.07)'
  const accent = '#22c55e'

  const es = lang === 'es'
  const fecha = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })

  const firmar = async () => {
    if (!nombre || !email || !empresa || !acepta) {
      setError(es ? 'Por favor completá todos los campos y aceptá los términos.' : 'Please fill all fields and accept the terms.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.from('nda_firmas').insert({
        nombre,
        email,
        empresa,
        cargo,
        fecha: new Date().toISOString(),
        ip_hash: 'browser',
        lang,
      })
      if (err) throw err
      setFirmado(true)
    } catch (e) {
      setError(es ? 'Error al registrar la firma. Escribinos a hola@oliviacirculab.com.ar' : 'Error registering signature. Contact hola@oliviacirculab.com.ar')
    }
    setLoading(false)
  }

  if (firmado) return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{maxWidth:520,width:'100%',background:card,border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'40px',textAlign:'center'}}>
        <div style={{fontSize:48,marginBottom:16}}>✅</div>
        <div style={{fontSize:22,fontWeight:900,color:accent,marginBottom:8}}>
          {es ? 'NDA firmado correctamente' : 'NDA signed successfully'}
        </div>
        <div style={{fontSize:13,color:sub,lineHeight:1.7,marginBottom:24}}>
          {es
            ? `Gracias ${nombre}. Tu firma digital ha sido registrada bajo la Ley 25.506 de Firma Digital de Argentina. En las próximas horas recibirás en ${email} el material confidencial de OLIVIA Circulab.`
            : `Thank you ${nombre}. Your digital signature has been registered under Argentine Digital Signature Law 25.506. You will receive the confidential OLIVIA Circulab materials at ${email} within a few hours.`
          }
        </div>
        <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:12,padding:'16px',marginBottom:24,fontSize:11,color:sub,textAlign:'left',lineHeight:1.7}}>
          <div style={{fontWeight:700,color:accent,marginBottom:6}}>{es ? 'Resumen del acuerdo firmado:' : 'Summary of signed agreement:'}</div>
          <div>· {es ? 'Firmante' : 'Signatory'}: {nombre} · {empresa}</div>
          <div>· {es ? 'Fecha' : 'Date'}: {fecha}</div>
          <div>· {es ? 'Vigencia' : 'Term'}: {es ? '3 años' : '3 years'}</div>
          <div>· {es ? 'Marco legal' : 'Legal framework'}: {es ? 'Ley 25.506 · CABA Argentina' : 'Law 25.506 · Buenos Aires Argentina'}</div>
        </div>
        <a href="mailto:hola@oliviacirculab.com.ar?subject=NDA firmado - ${empresa}" style={{display:'inline-block',background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:12,padding:'12px 28px',color:'white',fontSize:13,fontWeight:700,textDecoration:'none'}}>
          {es ? 'Contactar al equipo →' : 'Contact the team →'}
        </a>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:bg,color:text,fontFamily:'system-ui'}}>
      <nav style={{position:'sticky',top:0,zIndex:50,backdropFilter:'blur(16px)',background:'rgba(10,14,26,0.95)',borderBottom:'1px solid ' + border,padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <img src="/logoOC.png" alt="OLIVIA" style={{width:32,height:32,objectFit:'contain',borderRadius:6}} />
          <span style={{fontSize:12,fontWeight:700,color:text,textTransform:'uppercase',letterSpacing:'0.05em'}}>OLIVIA Circulab</span>
        </a>
        <button onClick={()=>setLang(es?'en':'es')} style={{border:'1px solid ' + border,borderRadius:20,padding:'5px 12px',fontSize:10,fontWeight:700,cursor:'pointer',background:'transparent',color:text,fontFamily:'monospace'}}>
          {es?'EN':'ES'}
        </button>
      </nav>

      <div style={{maxWidth:640,margin:'0 auto',padding:'48px 24px'}}>
        <div style={{fontSize:9,fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.3em',color:accent,marginBottom:12}}>
          [ {es ? 'Acuerdo de Confidencialidad' : 'Non-Disclosure Agreement'} ]
        </div>
        <h1 style={{fontSize:28,fontWeight:900,marginBottom:8}}>
          {es ? 'NDA · Acuerdo de Confidencialidad' : 'NDA · Non-Disclosure Agreement'}
        </h1>
        <div style={{fontSize:12,color:sub,marginBottom:32}}>
          {es ? 'Circulab Tech · OLIVIA Circulab · ' + fecha : 'Circulab Tech · OLIVIA Circulab · ' + fecha}
        </div>

        {/* TEXTO DEL NDA */}
        <div style={{background:card,border:'1px solid ' + border,borderRadius:14,padding:'24px',marginBottom:32,fontSize:11,color:sub,lineHeight:1.8}}>
          <div style={{fontWeight:700,color:text,fontSize:13,marginBottom:16}}>
            {es ? 'Términos del Acuerdo de Confidencialidad' : 'Non-Disclosure Agreement Terms'}
          </div>

          {es ? (
            <>
              <p style={{marginBottom:12}}><strong style={{color:text}}>1. Partes.</strong> Este acuerdo se celebra entre Circulab Tech S.A.S. (en adelante "OLIVIA" o "la Empresa") y el firmante identificado en el formulario (en adelante "el Receptor").</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>2. Información Confidencial.</strong> Se considera confidencial toda información relacionada con el sistema OLIVIA dMRV, incluyendo: metodología de verificación con IA, código fuente, arquitectura tecnológica, tokenómica OLV, estrategia comercial, precios, proyecciones financieras, datos de usuarios, cooperativas aliadas, consorcios y clientes.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>3. Obligaciones del Receptor.</strong> El Receptor se compromete a: (a) No divulgar la información confidencial a terceros sin autorización escrita previa. (b) No usar la información para desarrollar sistemas propios o similares al sistema OLIVIA. (c) No contactar directamente a clientes, aliados o cooperativas de OLIVIA usando información obtenida en la relación. (d) Usar la información únicamente para evaluar una posible alianza o inversión con Circulab Tech.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>4. Exclusión de competidores.</strong> El Receptor no podrá compartir información confidencial con empresas, personas o proyectos que desarrollen sistemas de verificación de residuos, créditos de carbono, tokenización de impacto ambiental o tecnologías dMRV similares a OLIVIA.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>5. Propiedad Intelectual.</strong> El sistema OLIVIA, incluyendo el nombre, la marca, la metodología dMRV, el código fuente, la tokenómica OLV y todos los documentos compartidos, son propiedad exclusiva de Circulab Tech S.A.S. La firma de este acuerdo no otorga ningún derecho de uso, licencia ni propiedad sobre dicha información.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>6. Excepciones.</strong> Las obligaciones no aplican a información que: (a) Sea de dominio público por causas ajenas al Receptor. (b) El Receptor ya conociera antes de este acuerdo con documentación que lo pruebe. (c) Deba divulgarse por orden judicial o regulatoria, notificando previamente a Circulab Tech.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>7. Vigencia.</strong> Este acuerdo tiene una vigencia de 3 (tres) años desde la fecha de firma.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>8. Marco Legal y Firma Digital.</strong> Este acuerdo está regido por las leyes de la República Argentina. La aceptación digital mediante checkbox constituye firma electrónica con plena validez legal bajo la Ley 25.506 de Firma Digital de Argentina y los artículos 288 y 1106 del Código Civil y Comercial. Para cualquier controversia, las partes se someten a los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires.</p>
              <p><strong style={{color:text}}>9. Contacto.</strong> hola@oliviacirculab.com.ar · Circulab Tech S.A.S. · Ciudad Autónoma de Buenos Aires · Argentina</p>
            </>
          ) : (
            <>
              <p style={{marginBottom:12}}><strong style={{color:text}}>1. Parties.</strong> This agreement is entered into between Circulab Tech S.A.S. (hereinafter "OLIVIA" or "the Company") and the signatory identified in the form (hereinafter "the Recipient").</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>2. Confidential Information.</strong> All information related to the OLIVIA dMRV system is considered confidential, including: AI verification methodology, source code, technological architecture, OLV tokenomics, commercial strategy, pricing, financial projections, user data, partner cooperatives, condominiums and clients.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>3. Recipient Obligations.</strong> The Recipient agrees to: (a) Not disclose confidential information to third parties without prior written authorization. (b) Not use the information to develop systems similar to OLIVIA. (c) Not directly contact OLIVIA clients, partners or cooperatives using information obtained in the relationship. (d) Use the information solely to evaluate a potential partnership or investment with Circulab Tech.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>4. Competitor Exclusion.</strong> The Recipient may not share confidential information with companies, individuals or projects developing waste verification systems, carbon credits, environmental impact tokenization or dMRV technologies similar to OLIVIA.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>5. Intellectual Property.</strong> The OLIVIA system, including the name, brand, dMRV methodology, source code, OLV tokenomics and all shared documents, are the exclusive property of Circulab Tech S.A.S. Signing this agreement does not grant any right of use, license or ownership over such information.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>6. Exceptions.</strong> Obligations do not apply to information that: (a) Enters the public domain through no fault of the Recipient. (b) The Recipient already knew before this agreement with documentation to prove it. (c) Must be disclosed by judicial or regulatory order, with prior notice to Circulab Tech.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>7. Term.</strong> This agreement has a term of 3 (three) years from the date of signature.</p>
              <p style={{marginBottom:12}}><strong style={{color:text}}>8. Legal Framework and Digital Signature.</strong> This agreement is governed by the laws of the Argentine Republic. Digital acceptance via checkbox constitutes an electronic signature with full legal validity under Argentine Digital Signature Law 25.506 and articles 288 and 1106 of the Civil and Commercial Code. For any dispute, the parties submit to the Ordinary Courts of the City of Buenos Aires.</p>
              <p><strong style={{color:text}}>9. Contact.</strong> hola@oliviacirculab.com.ar · Circulab Tech S.A.S. · Buenos Aires · Argentina</p>
            </>
          )}
        </div>

        {/* FORMULARIO */}
        <div style={{background:card,border:'1px solid rgba(34,197,94,0.2)',borderRadius:14,padding:'24px',marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:700,color:accent,marginBottom:20}}>
            {es ? 'Datos del firmante' : 'Signatory information'}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
            <div>
              <div style={{fontSize:10,color:sub,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>{es ? 'Nombre completo *' : 'Full name *'}</div>
              <input
                value={nombre}
                onChange={e=>setNombre(e.target.value)}
                placeholder={es ? 'Juan García' : 'John Smith'}
                style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid ' + border,color:text,fontSize:12,outline:'none',boxSizing:'border-box' as const}}
              />
            </div>
            <div>
              <div style={{fontSize:10,color:sub,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>{es ? 'Email *' : 'Email *'}</div>
              <input
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder="juan@empresa.com"
                type="email"
                style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid ' + border,color:text,fontSize:12,outline:'none',boxSizing:'border-box' as const}}
              />
            </div>
            <div>
              <div style={{fontSize:10,color:sub,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>{es ? 'Empresa / Organización *' : 'Company / Organization *'}</div>
              <input
                value={empresa}
                onChange={e=>setEmpresa(e.target.value)}
                placeholder={es ? 'Nombre de la empresa' : 'Company name'}
                style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid ' + border,color:text,fontSize:12,outline:'none',boxSizing:'border-box' as const}}
              />
            </div>
            <div>
              <div style={{fontSize:10,color:sub,marginBottom:6,textTransform:'uppercase',letterSpacing:'0.05em'}}>{es ? 'Cargo / Rol' : 'Position / Role'}</div>
              <input
                value={cargo}
                onChange={e=>setCargo(e.target.value)}
                placeholder={es ? 'CEO, Presidente, Director...' : 'CEO, President, Director...'}
                style={{width:'100%',padding:'10px 12px',borderRadius:8,background:'rgba(255,255,255,0.04)',border:'1px solid ' + border,color:text,fontSize:12,outline:'none',boxSizing:'border-box' as const}}
              />
            </div>
          </div>

          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid ' + border,borderRadius:10,padding:'14px',marginBottom:16,display:'flex',gap:10,alignItems:'flex-start'}}>
            <input
              type="checkbox"
              checked={acepta}
              onChange={e=>setAcepta(e.target.checked)}
              style={{marginTop:2,flexShrink:0,width:16,height:16,cursor:'pointer',accentColor:accent}}
            />
            <div style={{fontSize:11,color:sub,lineHeight:1.7}}>
              {es
                ? 'He leído y acepto en su totalidad el Acuerdo de Confidencialidad de OLIVIA Circulab / Circulab Tech. Comprendo que esta aceptación digital tiene plena validez legal bajo la Ley 25.506 de Firma Digital de Argentina y que estoy asumiendo las obligaciones descritas en este documento.'
                : 'I have read and fully accept the OLIVIA Circulab / Circulab Tech Non-Disclosure Agreement. I understand that this digital acceptance has full legal validity under Argentine Digital Signature Law 25.506 and that I am assuming the obligations described in this document.'
              }
            </div>
          </div>

          {error && (
            <div style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:8,padding:'10px 14px',fontSize:11,color:'#ef4444',marginBottom:12}}>
              {error}
            </div>
          )}

          <button
            onClick={firmar}
            disabled={loading || !acepta}
            style={{width:'100%',background:loading||!acepta?'rgba(255,255,255,0.04)':'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:12,padding:'14px',color:loading||!acepta?sub:'white',fontSize:14,fontWeight:700,cursor:loading||!acepta?'not-allowed':'pointer',transition:'all 0.2s'}}
          >
            {loading
              ? (es ? 'Registrando firma...' : 'Registering signature...')
              : (es ? 'Firmar el NDA digitalmente →' : 'Sign NDA digitally →')
            }
          </button>

          <div style={{fontSize:10,color:sub,textAlign:'center',marginTop:12,lineHeight:1.6}}>
            {es
              ? 'Tu firma queda registrada con fecha, hora y datos de sesión. Válida bajo Ley 25.506.'
              : 'Your signature is registered with date, time and session data. Valid under Law 25.506.'
            }
          </div>
        </div>

        <div style={{textAlign:'center',fontSize:10,color:sub}}>
          <a href="/terminos" style={{color:sub,textDecoration:'none'}}>Términos y Condiciones</a>
          {' · '}
          <a href="/privacidad" style={{color:sub,textDecoration:'none'}}>Política de Privacidad</a>
          {' · '}
          <a href="mailto:hola@oliviacirculab.com.ar" style={{color:sub,textDecoration:'none'}}>hola@oliviacirculab.com.ar</a>
        </div>
      </div>
    </div>
  )
}
