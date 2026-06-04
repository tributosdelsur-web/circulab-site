'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

function getInstagramId(url: string) {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/)
  return match ? match[1] : null
}

function VideoEmbed({url}: {url: string}) {
  const ytId = getYouTubeId(url)
  const igId = getInstagramId(url)
  if(ytId) return (
    <div style={{position:'relative',paddingBottom:'56.25%',height:0,borderRadius:12,overflow:'hidden',marginBottom:12}}>
      <iframe src={`https://www.youtube.com/embed/${ytId}`} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} allowFullScreen />
    </div>
  )
  if(igId) return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderRadius:12,background:'linear-gradient(135deg,rgba(131,58,180,0.15),rgba(253,29,29,0.1))',border:'1px solid rgba(131,58,180,0.3)',textDecoration:'none',marginBottom:12}}>
      <div style={{width:44,height:44,borderRadius:12,background:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>📸</div>
      <div>
        <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>Ver en Instagram</div>
        <div style={{fontSize:11,color:'#94a3b8',marginTop:2}}>Reel / Post · Toca para abrir</div>
      </div>
      <span style={{marginLeft:'auto',color:'#94a3b8',fontSize:18}}>→</span>
    </a>
  )
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{display:'block',padding:'10px 14px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#3b82f6',fontSize:12,textDecoration:'none',marginBottom:12,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
      🔗 {url}
    </a>
  )
}

export default function Comunidad() {
  const [uid, setUid] = useState('')
  const [usuario, setUsuario] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [stories, setStories] = useState<any[]>([])
  const [wallet, setWallet] = useState(0)
  const [vista, setVista] = useState<'feed'|'wallet'|'buscar'>('feed')
  const [transacciones, setTransacciones] = useState<any[]>([])
  const [nuevoPost, setNuevoPost] = useState('')
  const [nuevaFoto, setNuevaFoto] = useState<File|null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [mostrarVideo, setMostrarVideo] = useState(false)
  const [publicando, setPublicando] = useState(false)
  const [comentarioActivo, setComentarioActivo] = useState<string|null>(null)
  const [comentarioTexto, setComentarioTexto] = useState('')
  const [comentarios, setComentarios] = useState<any>({})
  const [storyViendo, setStoryViendo] = useState<any|null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [resultados, setResultados] = useState<any[]>([])
  const [siguiendo, setSiguiendo] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)
  const storyRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    supabase.auth.getSession().then(async ({data})=>{
      if(data.session?.user?.id) {
        const uid = data.session.user.id
        setUid(uid)
        const {data:u} = await supabase.from('usuarios').select('*').eq('id',uid).single()
        setUsuario(u)
        const {data:t} = await supabase.from('wallet_transacciones').select('*').eq('usuario_id',uid).order('created_at',{ascending:false}).limit(20)
        setTransacciones(t||[])
        setWallet((t||[]).reduce((a:number,tr:any)=>a+Number(tr.monto_olv),0))
        // Cargar a quiénes sigo
        const {data:seg} = await supabase.from('seguidores').select('seguido_id').eq('seguidor_id',uid)
        setSiguiendo(new Set((seg||[]).map((s:any)=>s.seguido_id)))
      }
      cargarFeed()
    })
  },[])

  async function cargarFeed() {
    const [p,s] = await Promise.all([
      supabase.from('posts').select('*, usuarios(id,nombre,apellido)').order('created_at',{ascending:false}).limit(50),
      supabase.from('stories').select('*, usuarios(nombre,apellido)').gte('expires_at',new Date().toISOString()).order('created_at',{ascending:false}),
    ])
    setPosts(p.data||[]); setStories(s.data||[]); setLoading(false)
  }

  async function buscarUsuarios(q: string) {
    if(!q||q.length<2){setResultados([]);return}
    const {data} = await supabase.from('usuarios').select('id,nombre,apellido,score_pulso,nivel').or(`nombre.ilike.%${q}%,apellido.ilike.%${q}%`).limit(10)
    setResultados(data||[])
  }

  async function toggleSeguir(targetId: string) {
    if(!uid){window.location.href='/login';return}
    if(targetId===uid) return
    if(siguiendo.has(targetId)) {
      await supabase.from('seguidores').delete().eq('seguidor_id',uid).eq('seguido_id',targetId)
      setSiguiendo(prev=>{const n=new Set(prev);n.delete(targetId);return n})
    } else {
      await supabase.from('seguidores').insert({seguidor_id:uid,seguido_id:targetId})
      await supabase.from('wallet_transacciones').insert({usuario_id:uid,tipo:'seguir',monto_olv:5,descripcion:'Seguiste a alguien'})
      setSiguiendo(prev=>new Set(prev).add(targetId))
      setWallet(w=>w+5)
    }
  }

  async function publicarPost() {
    if(!uid){window.location.href='/login';return}
    if(!nuevoPost&&!nuevaFoto&&!videoUrl) return
    setPublicando(true)
    let foto_url = null
    if(nuevaFoto) {
      const ext = nuevaFoto.name.split('.').pop()
      const nombre = `${uid}-post-${Date.now()}.${ext}`
      await supabase.storage.from('residuos-fotos').upload(nombre,nuevaFoto)
      const {data} = supabase.storage.from('residuos-fotos').getPublicUrl(nombre)
      foto_url = data.publicUrl
    }
    await supabase.from('posts').insert({usuario_id:uid,contenido:nuevoPost,foto_url,video_url:videoUrl||null,tipo:'accion',olv_ganados:20})
    await supabase.from('wallet_transacciones').insert({usuario_id:uid,tipo:'post',monto_olv:20,descripcion:'Post publicado en la comunidad'})
    setNuevoPost(''); setNuevaFoto(null); setVideoUrl(''); setMostrarVideo(false); setPublicando(false)
    cargarFeed()
  }

  async function publicarStory(file: File) {
    if(!uid){window.location.href='/login';return}
    const ext = file.name.split('.').pop()
    const nombre = `${uid}-story-${Date.now()}.${ext}`
    await supabase.storage.from('residuos-fotos').upload(nombre,file)
    const {data} = supabase.storage.from('residuos-fotos').getPublicUrl(nombre)
    await supabase.from('stories').insert({usuario_id:uid,foto_url:data.publicUrl,texto:''})
    await supabase.from('wallet_transacciones').insert({usuario_id:uid,tipo:'story',monto_olv:10,descripcion:'Story publicada'})
    cargarFeed()
  }

  async function toggleLike(postId: string) {
    if(!uid){window.location.href='/login';return}
    const {data:existing} = await supabase.from('likes').select('*').eq('post_id',postId).eq('usuario_id',uid).single()
    if(existing) {
      await supabase.from('likes').delete().eq('post_id',postId).eq('usuario_id',uid)
    } else {
      await supabase.from('likes').insert({post_id:postId,usuario_id:uid})
      await supabase.from('wallet_transacciones').insert({usuario_id:uid,tipo:'like',monto_olv:2,descripcion:'Like dado'})
    }
    cargarFeed()
  }

  async function cargarComentarios(postId: string) {
    const {data} = await supabase.from('comentarios').select('*, usuarios(nombre)').eq('post_id',postId).order('created_at',{ascending:true})
    setComentarios((prev:any)=>({...prev,[postId]:data||[]}))
  }

  async function publicarComentario(postId: string) {
    if(!uid){window.location.href='/login';return}
    if(!comentarioTexto) return
    await supabase.from('comentarios').insert({post_id:postId,usuario_id:uid,texto:comentarioTexto})
    await supabase.from('wallet_transacciones').insert({usuario_id:uid,tipo:'comentario',monto_olv:5,descripcion:'Comentario publicado'})
    setComentarioTexto('')
    cargarComentarios(postId)
  }

  function tiempoRelativo(fecha: string) {
    const diff = Date.now()-new Date(fecha).getTime()
    const min = Math.floor(diff/60000)
    if(min<60) return min+'m'
    const hs = Math.floor(min/60)
    if(hs<24) return hs+'h'
    return Math.floor(hs/24)+'d'
  }

  function BtnSeguir({targetId}: {targetId: string}) {
    if(!uid||targetId===uid) return null
    const sigo = siguiendo.has(targetId)
    return (
      <button onClick={()=>toggleSeguir(targetId)}
        style={{background:sigo?'rgba(255,255,255,0.06)':'linear-gradient(135deg,#22c55e,#16a34a)',border:sigo?'1px solid rgba(255,255,255,0.1)':'none',borderRadius:20,padding:'4px 14px',color:sigo?'#64748b':'white',fontSize:11,fontWeight:700,cursor:'pointer',flexShrink:0}}>
        {sigo?'Siguiendo':'+ Seguir'}
      </button>
    )
  }

  if(loading) return <div style={{minHeight:'100vh',background:'#0a0e1a',display:'flex',alignItems:'center',justifyContent:'center',color:'#22c55e',fontFamily:'system-ui'}}>Cargando comunidad...</div>

  return (
    <div style={{minHeight:'100vh',background:'#0a0e1a',color:'#f1f5f9',fontFamily:'system-ui',maxWidth:600,margin:'0 auto'}}>

      {/* Header */}
      <div style={{padding:'12px 16px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,background:'rgba(10,14,26,0.97)',backdropFilter:'blur(10px)',zIndex:100}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#22c55e,#3b82f6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'white'}}>O</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,color:'#f1f5f9'}}>OLIVIA</div>
            <div style={{fontSize:9,color:'#22c55e',textTransform:'uppercase'}}>Comunidad</div>
          </div>
        </a>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {uid?(
            <button onClick={()=>setVista('wallet')} style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:20,padding:'5px 12px',color:'#22c55e',fontSize:12,fontWeight:700,cursor:'pointer'}}>
              🪙 {wallet} OLV
            </button>
          ):(
            <a href="/login" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'6px 14px',borderRadius:8,fontSize:12,fontWeight:700,textDecoration:'none'}}>Entrar →</a>
          )}
          <a href="/dashboard" style={{fontSize:11,color:'#64748b',textDecoration:'none'}}>Panel</a>
        </div>
      </div>

      {/* BUSCAR */}
      {vista==='buscar' && (
        <div style={{padding:16}}>
          <button onClick={()=>setVista('feed')} style={{background:'transparent',border:'none',color:'#64748b',fontSize:13,cursor:'pointer',marginBottom:16}}>← Volver</button>
          <input value={busqueda} onChange={e=>{setBusqueda(e.target.value);buscarUsuarios(e.target.value)}}
            placeholder="Buscá por nombre..."
            style={{width:'100%',padding:'12px 16px',borderRadius:12,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:14,outline:'none',fontFamily:'inherit',boxSizing:'border-box',marginBottom:16}} />
          {busqueda.length<=1&&(
            <div style={{textAlign:'center',padding:'40px 0'}}>
              <div style={{fontSize:32,marginBottom:12}}>🔍</div>
              <div style={{fontSize:14,color:'#64748b'}}>Buscá a tus amigos por nombre</div>
            </div>
          )}
          {busqueda.length>1&&resultados.length===0&&(
            <div style={{textAlign:'center',color:'#64748b',fontSize:13,padding:'32px 0'}}>No encontramos a nadie con ese nombre</div>
          )}
          {resultados.map((u:any)=>(
            <div key={u.id} style={{display:'flex',alignItems:'center',gap:12,padding:'14px',borderRadius:14,background:'#111827',border:'1px solid rgba(255,255,255,0.06)',marginBottom:10}}>
              <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#22c55e,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:16,color:'white',flexShrink:0}}>
                {u.nombre?.[0]}{u.apellido?.[0]}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700}}>{u.nombre} {u.apellido}</div>
                <div style={{fontSize:11,color:'#22c55e',marginTop:2}}>Nivel {u.nivel} · {u.score_pulso} pts PULSO</div>
              </div>
              <BtnSeguir targetId={u.id} />
            </div>
          ))}
        </div>
      )}

      {/* WALLET */}
      {vista==='wallet'&&uid&&(
        <div style={{padding:16}}>
          <button onClick={()=>setVista('feed')} style={{background:'transparent',border:'none',color:'#64748b',fontSize:13,cursor:'pointer',marginBottom:16}}>← Volver al feed</button>
          <div style={{background:'linear-gradient(135deg,#0f1f10,#0a1628)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:16,padding:24,marginBottom:16,textAlign:'center'}}>
            <div style={{fontSize:12,color:'#64748b',marginBottom:4}}>Tu billetera OLIVIA</div>
            <div style={{fontSize:52,fontWeight:900,color:'#22c55e'}}>{wallet}</div>
            <div style={{fontSize:14,color:'#64748b',marginBottom:12}}>Olivia Coins (OLV)</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <div style={{background:'rgba(34,197,94,0.08)',borderRadius:10,padding:'10px'}}>
                <div style={{fontSize:10,color:'#64748b'}}>Fase 3 (VCS)</div>
                <div style={{fontSize:14,fontWeight:700,color:'#22c55e'}}>USD {(wallet*0.022*0.25).toFixed(2)}</div>
              </div>
              <div style={{background:'rgba(168,85,247,0.08)',borderRadius:10,padding:'10px'}}>
                <div style={{fontSize:10,color:'#64748b'}}>Fase 4 (Art. 6.4)</div>
                <div style={{fontSize:14,fontWeight:700,color:'#a855f7'}}>USD {(wallet*0.09*0.25).toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:16,marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12,color:'#22c55e'}}>Cómo ganar OLV</div>
            {[
              {a:'Registrar residuo verificado',v:'+50'},
              {a:'Subir foto de entrega',v:'+30'},
              {a:'Publicar en la comunidad',v:'+20'},
              {a:'Publicar una story',v:'+10'},
              {a:'Comentar un post',v:'+5'},
              {a:'Seguir a alguien',v:'+5'},
              {a:'Dar un like',v:'+2'},
              {a:'Traer un amigo',v:'+200'},
            ].map(i=>(
              <div key={i.a} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <span style={{fontSize:12,color:'#94a3b8'}}>{i.a}</span>
                <span style={{fontSize:12,fontWeight:700,color:'#22c55e'}}>{i.v} OLV</span>
              </div>
            ))}
          </div>
          <div style={{background:'#111827',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:16}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Historial</div>
            {transacciones.length===0?(
              <div style={{fontSize:12,color:'#64748b',textAlign:'center',padding:'20px 0'}}>Sin transacciones aún</div>
            ):transacciones.map((t:any,i:number)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <div>
                  <div style={{fontSize:11,color:'#f1f5f9'}}>{t.descripcion}</div>
                  <div style={{fontSize:9,color:'#64748b'}}>{new Date(t.created_at).toLocaleDateString()}</div>
                </div>
                <span style={{fontSize:13,fontWeight:700,color:'#22c55e'}}>+{t.monto_olv} OLV</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEED */}
      {vista==='feed'&&(
        <div>
          {/* Stories */}
          <div style={{padding:'12px 16px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{display:'flex',gap:12,overflowX:'auto',paddingBottom:4}}>
              {uid&&(
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,flexShrink:0}}>
                  <button onClick={()=>storyRef.current?.click()} style={{width:56,height:56,borderRadius:'50%',background:'rgba(34,197,94,0.1)',border:'2px dashed rgba(34,197,94,0.5)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:22,color:'#22c55e'}}>+</button>
                  <span style={{fontSize:9,color:'#64748b'}}>Tu story</span>
                  <input ref={storyRef} type="file" accept="image/*" onChange={e=>{if(e.target.files?.[0]) publicarStory(e.target.files[0])}} style={{display:'none'}} />
                </div>
              )}
              {stories.map((s:any,i:number)=>(
                <div key={i} onClick={()=>setStoryViendo(s)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,flexShrink:0,cursor:'pointer'}}>
                  <div style={{width:56,height:56,borderRadius:'50%',border:'2px solid #22c55e',overflow:'hidden'}}>
                    <img src={s.foto_url} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  </div>
                  <span style={{fontSize:9,color:'#94a3b8',maxWidth:60,textAlign:'center',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{s.usuarios?.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Story viewer */}
          {storyViendo&&(
            <div onClick={()=>setStoryViendo(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.96)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding:16}}>
              <img src={storyViendo.foto_url} alt="" style={{maxWidth:'100%',maxHeight:'75vh',objectFit:'contain',borderRadius:12}} />
              {storyViendo.texto&&<div style={{color:'white',fontSize:16,marginTop:16,textAlign:'center'}}>{storyViendo.texto}</div>}
              <div style={{color:'#64748b',fontSize:12,marginTop:12}}>{storyViendo.usuarios?.nombre} · Toca para cerrar</div>
            </div>
          )}

          {/* Nuevo post */}
          {uid?(
            <div style={{padding:16,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{display:'flex',gap:10,marginBottom:10}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#22c55e,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:'white',flexShrink:0}}>
                  {usuario?.nombre?.[0]}{usuario?.apellido?.[0]}
                </div>
                <textarea value={nuevoPost} onChange={e=>setNuevoPost(e.target.value)}
                  placeholder="¿Qué acción climática hiciste hoy? 🌿"
                  rows={2}
                  style={{flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:12,padding:'10px 14px',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',resize:'none'}} />
              </div>
              {mostrarVideo&&(
                <div style={{marginBottom:10}}>
                  <input value={videoUrl} onChange={e=>setVideoUrl(e.target.value)}
                    placeholder="Pegá el link de YouTube o Instagram..."
                    style={{width:'100%',padding:'10px 14px',borderRadius:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',color:'#f1f5f9',fontSize:13,outline:'none',fontFamily:'inherit',boxSizing:'border-box'}} />
                  {videoUrl&&(getYouTubeId(videoUrl)||getInstagramId(videoUrl))&&(
                    <div style={{marginTop:8}}><VideoEmbed url={videoUrl} /></div>
                  )}
                </div>
              )}
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <button onClick={()=>fileRef.current?.click()} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px 12px',color:nuevaFoto?'#22c55e':'#64748b',fontSize:12,cursor:'pointer'}}>
                  📷 {nuevaFoto?'✓ Foto':'Foto'}
                </button>
                <button onClick={()=>setMostrarVideo(!mostrarVideo)} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'6px 12px',color:mostrarVideo?'#22c55e':'#64748b',fontSize:12,cursor:'pointer'}}>
                  🎥 Video YT/IG
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={e=>setNuevaFoto(e.target.files?.[0]||null)} style={{display:'none'}} />
                <button onClick={publicarPost} disabled={publicando||(!nuevoPost&&!nuevaFoto&&!videoUrl)}
                  style={{marginLeft:'auto',background:nuevoPost||nuevaFoto||videoUrl?'linear-gradient(135deg,#22c55e,#16a34a)':'rgba(255,255,255,0.04)',border:'none',borderRadius:10,padding:'8px 20px',color:nuevoPost||nuevaFoto||videoUrl?'white':'#64748b',fontSize:13,fontWeight:700,cursor:'pointer'}}>
                  {publicando?'Publicando...':'Publicar +20 OLV'}
                </button>
              </div>
            </div>
          ):(
            <div style={{padding:'16px',borderBottom:'1px solid rgba(255,255,255,0.06)',textAlign:'center'}}>
              <div style={{fontSize:13,color:'#64748b',marginBottom:10}}>Iniciá sesión para publicar y ganar OLV</div>
              <a href="/login" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',color:'white',padding:'10px 24px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none'}}>Entrar →</a>
            </div>
          )}

          {/* Posts */}
          {posts.length===0?(
            <div style={{padding:40,textAlign:'center',color:'#64748b'}}>
              <div style={{fontSize:32,marginBottom:12}}>🌿</div>
              <div style={{fontSize:14}}>Sé el primero en publicar una acción climática</div>
            </div>
          ):posts.map((post:any)=>(
            <div key={post.id} style={{borderBottom:'1px solid rgba(255,255,255,0.06)',padding:16}}>
              <div style={{display:'flex',gap:10,marginBottom:10,alignItems:'center'}}>
                <div style={{width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#22c55e,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,color:'white',flexShrink:0}}>
                  {post.usuarios?.nombre?.[0]}{post.usuarios?.apellido?.[0]}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700}}>{post.usuarios?.nombre} {post.usuarios?.apellido}</div>
                  <div style={{fontSize:10,color:'#64748b'}}>{tiempoRelativo(post.created_at)} · +{post.olv_ganados} OLV</div>
                </div>
                <BtnSeguir targetId={post.usuarios?.id} />
                <span style={{fontSize:18}}>🌿</span>
              </div>
              {post.contenido&&<div style={{fontSize:13,lineHeight:1.6,marginBottom:10,color:'#f1f5f9'}}>{post.contenido}</div>}
              {post.foto_url&&<img src={post.foto_url} alt="" style={{width:'100%',borderRadius:12,marginBottom:12,maxHeight:400,objectFit:'cover'}} />}
              {post.video_url&&<VideoEmbed url={post.video_url} />}
              <div style={{display:'flex',gap:16}}>
                <button onClick={()=>toggleLike(post.id)} style={{background:'transparent',border:'none',color:'#64748b',fontSize:13,cursor:'pointer',display:'flex',alignItems:'center',gap:4,padding:0}}>
                  ❤️ <span style={{fontSize:12}}>Me importa</span>
                </button>
                <button onClick={()=>{
                  setComentarioActivo(comentarioActivo===post.id?null:post.id)
                  if(comentarioActivo!==post.id) cargarComentarios(post.id)
                }} style={{background:'transparent',border:'none',color:'#64748b',fontSize:13,cursor:'pointer',display:'flex',alignItems:'center',gap:4,padding:0}}>
                  💬 <span style={{fontSize:12}}>Comentar</span>
                </button>
              </div>
              {comentarioActivo===post.id&&(
                <div style={{marginTop:12}}>
                  {(comentarios[post.id]||[]).map((c:any,i:number)=>(
                    <div key={i} style={{padding:'8px 12px',borderRadius:10,background:'rgba(255,255,255,0.03)',marginBottom:6}}>
                      <div style={{fontSize:11,fontWeight:600,color:'#22c55e',marginBottom:2}}>{c.usuarios?.nombre}</div>
                      <div style={{fontSize:12,color:'#f1f5f9'}}>{c.texto}</div>
                    </div>
                  ))}
                  {uid?(
                    <div style={{display:'flex',gap:8,marginTop:8}}>
                      <input value={comentarioTexto} onChange={e=>setComentarioTexto(e.target.value)}
                        placeholder="Escribí un comentario..."
                        onKeyDown={e=>e.key==='Enter'&&publicarComentario(post.id)}
                        style={{flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,padding:'8px 12px',color:'#f1f5f9',fontSize:12,outline:'none',fontFamily:'inherit'}} />
                      <button onClick={()=>publicarComentario(post.id)} style={{background:'linear-gradient(135deg,#22c55e,#16a34a)',border:'none',borderRadius:8,padding:'8px 14px',color:'white',fontSize:12,fontWeight:700,cursor:'pointer'}}>
                        +5 OLV
                      </button>
                    </div>
                  ):(
                    <a href="/login" style={{display:'block',textAlign:'center',fontSize:12,color:'#22c55e',marginTop:8}}>Iniciá sesión para comentar →</a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom nav */}
      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:600,background:'rgba(8,12,22,0.98)',borderTop:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-around',padding:'8px 0',zIndex:100}}>
        <button onClick={()=>setVista('feed')} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,border:'none',background:'transparent',color:vista==='feed'?'#22c55e':'#64748b',cursor:'pointer'}}>
          <span style={{fontSize:20}}>🌿</span>
          <span style={{fontSize:9,fontWeight:vista==='feed'?700:400}}>Feed</span>
        </button>
        <button onClick={()=>setVista('buscar')} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,border:'none',background:'transparent',color:vista==='buscar'?'#22c55e':'#64748b',cursor:'pointer'}}>
          <span style={{fontSize:20}}>🔍</span>
          <span style={{fontSize:9,fontWeight:vista==='buscar'?700:400}}>Buscar</span>
        </button>
        <a href="/registrar" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,textDecoration:'none',color:'#22c55e'}}>
          <div style={{width:44,height:44,background:'linear-gradient(135deg,#22c55e,#16a34a)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginTop:-16,boxShadow:'0 0 20px rgba(34,197,94,0.4)'}}>📷</div>
          <span style={{fontSize:9,fontWeight:700}}>Registrar</span>
        </a>
        {uid&&(
          <button onClick={()=>setVista('wallet')} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,border:'none',background:'transparent',color:vista==='wallet'?'#22c55e':'#64748b',cursor:'pointer'}}>
            <span style={{fontSize:20}}>🪙</span>
            <span style={{fontSize:9,fontWeight:vista==='wallet'?700:400}}>Wallet</span>
          </button>
        )}
        <a href="/dashboard" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,textDecoration:'none',color:'#64748b'}}>
          <span style={{fontSize:20}}>⊞</span>
          <span style={{fontSize:9}}>Panel</span>
        </a>
      </div>

      <div style={{height:70}} />
    </div>
  )
}
