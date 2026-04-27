/* ═══════════════════════════════════════════════════
   ESTRELLAS DE FONDO
═══════════════════════════════════════════════════ */
(function () {
  const bg = document.getElementById('stars-bg');
  for (let i = 0; i < 150; i++) {
    const s = document.createElement('div');
    s.className = 'star-bg';
    const sz = Math.random() * 2.8 + 0.4;
    s.style.cssText = `width:${sz}px;height:${sz}px;
      left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;
      animation-duration:${Math.random() * 4 + 2}s;
      animation-delay:${Math.random() * 5}s`;
    bg.appendChild(s);
  }
})();

/* ═══════════════════════════════════════════════════
   CORAZONES FLOTANTES
═══════════════════════════════════════════════════ */
function crearC() {
  const c = document.createElement('div');
  c.className = 'corazon';
  c.textContent = '❤️';
  c.style.cssText = `
    left:${Math.random() * 100}vw;
    top:${Math.random() * 55 + 30}vh;
    font-size:${Math.random() * 10 + 7}px;
    animation-duration:${Math.random() * 14 + 16}s;
    opacity:${Math.random() * 0.12 + 0.05}`;
  document.body.appendChild(c);
  setTimeout(() => c.remove(), (parseFloat(c.style.animationDuration) + 0.5) * 1000);
}
setInterval(crearC, 1100);
for (let i = 0; i < 4; i++) setTimeout(crearC, i * 400);

/* ═══════════════════════════════════════════════════
   PANTALLA DE CARGA — CONTRASEÑA
═══════════════════════════════════════════════════ */
function avanzarCarga(el, nextId, maxLen) {
  if (el.value.length >= maxLen && nextId) {
    document.getElementById(nextId).focus();
  }
}

function verificarClave() {
  const d  = document.getElementById('ci1').value.trim();
  const m  = document.getElementById('ci2').value.trim();
  const aa = document.getElementById('ci3').value.trim();
  const clave = `${d}-${m}-${aa}`;
  // Contraseña: 27-4-25 (27 de abril de 2025)
  if (clave === '27-4-25') {
    const pc = document.getElementById('pantalla-carga');
    pc.classList.add('saliendo');
    setTimeout(() => {
      pc.style.display = 'none';
      const menu = document.getElementById('sec-menu');
      menu.classList.remove('hidden');
      menu.style.opacity = '0';
      setTimeout(() => {
        menu.style.opacity = '1';
        menu.classList.add('entrando');
        iniciarContador();
      }, 60);
    }, 700);
    // Arrancar música automáticamente al entrar (el clic cuenta como interacción)
    setTimeout(() => {
      audio.play().then(() => {
        musicPlaying = true;
        const btn = document.getElementById('music-btn');
        btn.textContent = '🎶';
        btn.classList.add('playing');
      }).catch(() => {});
    }, 800);
  } else {
    const err = document.getElementById('carga-err');
    err.classList.remove('hidden');
    setTimeout(() => err.classList.add('hidden'), 2500);
  }
}

/* ═══════════════════════════════════════════════════
   CONTADOR DE TIEMPO JUNTOS
═══════════════════════════════════════════════════ */
function iniciarContador() {
  const inicio = new Date('2025-04-27T00:00:00');

  function actualizar() {
    const ahora = new Date();
    const diff  = ahora - inicio;
    if (diff < 0) return;

    const dias   = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min    = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seg    = Math.floor((diff % (1000 * 60)) / 1000);

    const el = document.getElementById('contador-juntos');
    if (el) {
      el.textContent = `💜 ${dias}d ${horas}h ${min}m ${seg}s juntos 💜`;
    }
  }

  actualizar();
  setInterval(actualizar, 1000);
}

/* ═══════════════════════════════════════════════════
   MÚSICA — TAYLOR SWIFT LOVER
═══════════════════════════════════════════════════ */
let musicPlaying = false;
const audio = document.getElementById('bg-music');
audio.volume = 0.22;

function toggleMusic() {
  const btn = document.getElementById('music-btn');
  if (musicPlaying) {
    audio.pause();
    btn.textContent = '🎵';
    btn.classList.remove('playing');
  } else {
    audio.play().catch(() => {});
    btn.textContent = '🎶';
    btn.classList.add('playing');
  }
  musicPlaying = !musicPlaying;
}

/* ═══════════════════════════════════════════════════
   SONIDOS DE UI
═══════════════════════════════════════════════════ */
function playSound(id) {
  try {
    const snd = document.getElementById(id);
    if (snd) {
      snd.currentTime = 0;
      snd.volume = 0.45;
      snd.play().catch(() => {});
    }
  } catch(e) {}
}

/* ═══════════════════════════════════════════════════
   NAVEGACIÓN CON TRANSICIÓN
═══════════════════════════════════════════════════ */
function ir(id) {
  document.querySelectorAll('.sec').forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(-18px) scale(.98)';
    s.style.transition = 'opacity .38s ease, transform .38s ease';
    setTimeout(() => {
      s.classList.add('hidden');
      s.style.transform = '';
      s.style.transition = '';
    }, 380);
  });
  setTimeout(() => {
    const d = document.getElementById(id);
    d.classList.remove('hidden');
    d.style.opacity = '0';
    d.style.transform = 'translateY(28px) scale(.97)';
    d.style.transition = 'opacity .5s cubic-bezier(.4,0,.2,1), transform .5s cubic-bezier(.34,1.2,.64,1)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        d.style.opacity = '1';
        d.style.transform = 'translateY(0) scale(1)';
      });
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'sec-impacto')      setTimeout(animarImpacto, 450);
    if (id === 'sec-constelacion') setTimeout(dibujarConst, 220);
    if (id === 'sec-universo')     buildUniverso();
    if (id === 'sec-escape')       iniciarEscape();
    if (id === 'sec-decisiones')   cargarDec(0);
    if (id === 'sec-final')        iniciarCuentaRegresiva();
  }, 400);
}

/* ═══════════════════════════════════════════════════
   CONSTELACIÓN
═══════════════════════════════════════════════════ */
const estrellas = [
  { x: .08, y: .18, msg: 'Esta constelación es una pequeña referencia porque gracias a ti he podido cambiar poco a poco en la vida y lograr ser una mejor persona, y lograste que este tonto apático fuera capaz de ser meloso y logre ser una supernova. 💙', nombre: 'C',  tipo: 'inicial' },
  { x: .92, y: .18, msg: 'Esta sección es solo para recordarte que para mí siempre serás mi persona más importante y una gran estrella que vino a mi vida y a iluminarla en todo momento y por eso solo queda decir: te amo, mi pequeña nalgona, jajaja. ❤️', nombre: 'S',  tipo: 'inicial' },
  { x: .5,  y: .06, msg: '27/04/2025 — El día que empezó toda esta pequeña aventura que decidimos comenzar hace ya un año... ¿Quién diría que duraríamos tanto con tantos problemas, jajaja? Pero eso solo significa que, si logramos un año, nos queda mucho más por delante, mi vida. 🗓️', nombre: '✦', tipo: 'fecha'   },
  { x: .42, y: .52, msg: 'Este pequeño corazón es para demostrar una pequeña parte de todo el amor que siento por ti; después de todo, una estrella es pequeña comparada con todo lo que te amo. 💖', nombre: '♡', tipo: 'corazon' },
  { x: .58, y: .52, msg: 'Siempre, siempre estaré ahí para ti, no importa qué suceda y lo que deje de suceder; siempre intentaré estar presente, no importa si esto acaba; ahí estaré presente. Después de todo, tú eres mi todo, mi vida. ❤️', nombre: '♡', tipo: 'corazon' },
  { x: .38, y: .65, msg: 'Mi amor por ti es infinito; después de todo, no hay límites para lo que puedes hacer cuando sientes que alguien es capaz de darlo todo por ti también y, si no entendiste lo que dije, básicamente te amo, loquita. ∞', nombre: '♡', tipo: 'corazon' },
  { x: .62, y: .65, msg: 'Juntos somos una locura, amor, aunque a ti te cueste más aceptar que debemos hacer las cosas mucho más juntos. Mi pequeña princesa, es necesario que lo repita, pero siempre que estemos juntos, somos invencibles, mi niña.', nombre: '♡', tipo: 'corazon' },
  { x: .5,  y: .78, msg: 'Todo esto inicia y termina en ti, mi pequeña princesa; tú eres la que decide y decidirá todo lo que conlleve lo nuestro, mi pequeña princesa, te amo. 🌹', nombre: '♡', tipo: 'corazon' },
  { x: .25, y: .35, msg: 'Tus nalgas, digo, digo, tu sonrisa siempre será la razón por la que me enamoré de ti, mi pequeña princesa, siempre que sigas teniendo esa gran sonrisa que es capaz de iluminar mi vida en cualquier momento, mi princesa culona. 😊', nombre: '★', tipo: 'normal'  },
  { x: .75, y: .35, msg: 'Como verás más adelante, siempre seremos tú y yo en cada universo, mi pequeña princesa. Ojalá se mantengan esas nalgas en cada universo, aunque sea un segundo plano comparado con tu sonrisa; es importante, mi vida, jajaja, ti amo, princesa. 🌌', nombre: '★', tipo: 'normal'  },
  { x: .15, y: .75, msg: 'Gracias por elegirme a mí para acompañarte en tu vida, mi pequeña princesa, y por cambiar tanto de gustarte la arepa a gustarte mi salchicha, jajajaja, porque sé que sigues odiando a todos los hombres fuera de mí. Ti amo, culona. 🥰', nombre: '★', tipo: 'normal'  },
  { x: .85, y: .75, msg: 'Contigo el tiempo vuela, mi pequeña princesa; después de todo, cada momento contigo no es más que felicidad y diversión, y aunque a veces parezca que el universo nos odia porque cuando estamos juntos va demasiado rápido, siempre será bueno, aunque sea poco. ⏳', nombre: '★', tipo: 'normal'  },
  { x: .5,  y: .45, msg: 'Tú eres el centro de todo lo que soy como persona e individuo. No importa qué pase ni qué pienses tú misma. Sé que piensas que me has hecho mucho daño, pero tú siempre serás mi princesa. Te amo, mi amor. 💫', nombre: '★', tipo: 'centro'  },
];
const lineas = [
  [0,2],[2,1],[3,4],[4,6],[6,7],[7,5],[5,3],[8,0],[9,1],[2,12],[12,3],[12,4]
];

function dibujarConst() {
  const cv = document.getElementById('cv-const');
  if (!cv) return;
  cv.style.width = Math.min(660, window.innerWidth - 40) + 'px';
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.65);
  g.addColorStop(0,'rgba(22,0,44,.85)');
  g.addColorStop(1,'rgba(4,0,12,.96)');
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle = 'rgba(255,105,180,.22)'; ctx.lineWidth = 1;
  lineas.forEach(([a,b]) => {
    const ea = estrellas[a], eb = estrellas[b];
    ctx.beginPath(); ctx.moveTo(ea.x*W, ea.y*H); ctx.lineTo(eb.x*W, eb.y*H); ctx.stroke();
  });
  const colMap = { inicial:'#ff69b4', fecha:'#ffd700', corazon:'#ff1493', centro:'#fff', normal:'#e0e0ff' };
  const rgbMap = { '#ff69b4':'255,105,180', '#ffd700':'255,215,0', '#ff1493':'255,20,147', '#fff':'255,255,255', '#e0e0ff':'224,224,255' };
  estrellas.forEach(e => {
    const x = e.x*W, y = e.y*H;
    const r = { inicial:13, fecha:11, centro:10, corazon:9, normal:7 }[e.tipo];
    const col = colMap[e.tipo];
    const glow = ctx.createRadialGradient(x,y,0,x,y,r*3.5);
    glow.addColorStop(0, `rgba(${rgbMap[col]},.38)`);
    glow.addColorStop(1,'transparent');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x,y,r*3.5,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur = 18; ctx.shadowColor = col;
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0,0,0,.75)';
    ctx.font = `bold ${r*.9}px Cinzel`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(e.nombre, x, y);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cv-const')?.addEventListener('click', function(ev) {
    const rect = this.getBoundingClientRect();
    const sx = (ev.clientX - rect.left) / rect.width;
    const sy = (ev.clientY - rect.top)  / rect.height;
    const tip = document.getElementById('ttip');
    let tocada = null;
    estrellas.forEach(e => {
      const dx = sx - e.x, dy = sy - e.y;
      if (Math.sqrt(dx*dx + dy*dy) < .065) tocada = e;
    });
    if (tocada) {
      tip.textContent = tocada.msg;
      const tipW = 210;
      const tipH = 120;
      const leftPos = (ev.clientX + 14 + tipW > window.innerWidth)
        ? Math.max(6, ev.clientX - tipW - 14)
        : (ev.clientX + 14);
      const topPos = (ev.clientY - 18 + tipH > window.innerHeight)
        ? Math.max(6, ev.clientY - tipH - 10)
        : (ev.clientY - 18);
      tip.style.left = leftPos + 'px';
      tip.style.top  = topPos  + 'px';
      tip.classList.add('on');
      clearTimeout(tip._t);
      tip._t = setTimeout(() => tip.classList.remove('on'), 3400);
    }
  });
});

/* ═══════════════════════════════════════════════════
   UNIVERSO
═══════════════════════════════════════════════════ */
const planetas = [
  { ic:'💖', nombre:'Amor',      color:'#ff1493', desc:'Este planeta es una representación de todo lo que siento por ti. Después de todo, solo un planeta lograría captar así sea una pequeña sección de toda la obsesión que siento por ti y esas nalgotas, jajajaja.', size:50, dist:.20, vel:11 },
  { ic:'🤝', nombre:'Confianza', color:'#4fc3f7', desc:'Este planeta es una pequeña referencia de toda la confianza que has acumulado a lo largo de todo el tiempo que llevamos juntos. Después de todo lo que has hecho por este tonto, ha logrado que este planeta crezca cada día y esperemos lo haga más cada día.', size:28, dist:.31, vel:18 },
  { ic:'📸', nombre:'Recuerdos', color:'#ffd54f', desc:'Este planeta es por cada recuerdo que tenemos juntos, cada momento especial, cada ft, cada risa, cada beso, cada cosa que dejaste. La pena por un momento siempre será especial y algo que crecerá cada día y podremos ampliarlo mucho más a futuro, mi niña linda.', size:35, dist:.21, vel:26 },
  { ic:'🌅', nombre:'Futuro',    color:'#a5d6a7', desc:'Esta es una pequeña referencia: después de todo, tú eres y siempre serás esa pequeña sección de mi vida que siempre querré e intentaré que esté presente en todo lo importante; después de todo, tú eres mi estrella del mañana, pequeña princesa.', size:42, dist:.32, vel:36 },
];

function buildUniverso() {
  const wrap = document.getElementById('universo');
  wrap.querySelectorAll('.orbita').forEach(o => o.remove());
  const W = wrap.offsetWidth || 400;
  planetas.forEach((p, i) => {
    const os = W * p.dist * 2;
    const orb = document.createElement('div'); orb.className = 'orbita';
    orb.style.cssText = `width:${os}px;height:${os}px;margin-left:${-os/2}px;margin-top:${-os/2}px;animation-duration:${p.vel}s`;
    const plan = document.createElement('div'); plan.className = 'planeta';
    plan.style.cssText = `width:${p.size}px;height:${p.size}px;
      background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.28),${p.color});
      box-shadow:0 0 20px ${p.color}a0;
      top:${-p.size/2}px;left:${os/2 - p.size/2}px;
      animation-delay:${i*.4}s;font-size:${p.size*.5}px`;
    plan.textContent = p.ic;
    plan.addEventListener('click', () => abrirModal(p));
    orb.appendChild(plan); wrap.appendChild(orb);
  });
}

function abrirModal(p) {
  document.getElementById('m-ic').textContent     = p.ic;
  document.getElementById('m-nombre').textContent = p.nombre;
  document.getElementById('m-desc').textContent   = p.desc;
  document.getElementById('modal-bg').classList.remove('hidden');
}
function cerrarModal() { document.getElementById('modal-bg').classList.add('hidden'); }

/* ═══════════════════════════════════════════════════
   MÁQUINA DEL DESTINO
═══════════════════════════════════════════════════ */
const frasesDest = [
  'Viajar juntos al fin del mundo 🌍',
  'Repetir esas noches solos 🔥',
  'Tener más fts de nuestros mejores momentos 📸',
  'Terminar nuestra vida cumpliendo todo lo que soñamos ❤️',
  'Completar esa pequeña aventura a Disneyland 🗺️',
  'Estar una mañana juntos ☀️',
  'Tener una casita con jardín con Amber, el inútil y Christopher 🏠',
  'Crecer juntos y no perder esa magia que tenemos, y que dejes la pena jajaja ✨',
  'Completar las listas de ambos ❤️‍🔥',
  'Estar siempre el uno para el otro 💑',
];
let destIdx = 0;

function girarDestino() {
  const p = document.getElementById('dest-pantalla');
  p.style.opacity = '.3';
  let n = 0;
  const iv = setInterval(() => {
    p.textContent = frasesDest[Math.floor(Math.random() * frasesDest.length)];
    if (++n > 14) {
      clearInterval(iv);
      p.textContent = frasesDest[destIdx++ % frasesDest.length];
      p.style.opacity = '1';
    }
  }, 110);
  setTimeout(() => (p.style.opacity = '1'), 1700);
}

/* ═══════════════════════════════════════════════════
   ESCAPE ROOM
═══════════════════════════════════════════════════ */
const pistas = [
  { q:'¿Cuál es el ingrediente secreto de nuestra historia?',   ops:['El tiempo','Tus nalgas','La suerte','La distancia'],                         ok:1 },
  { q:'Si nuestro amor fuera un lugar, ¿cuál sería?',           ops:['Una ciudad fría','Un lugar sin nombre','Donde estemos juntos','El pasado'],   ok:2 },
  { q:'¿Qué es lo que nunca cambiará entre nosotros?',          ops:['Nada','Las peleas','La distancia','Lo que sentimos'],                         ok:3 },
  { q:'La respuesta a todo siempre es...',                      ops:['El tiempo','El azar','Tú','Cualquier cosa'],                                  ok:2 },
];
let pistaActual = 0;

function iniciarEscape() {
  pistaActual = 0;
  document.getElementById('esc-juego').classList.remove('hidden');
  document.getElementById('esc-final').classList.add('hidden');
  buildProg(); mostrarPista();
}
function buildProg() {
  const p = document.getElementById('prog-dots'); p.innerHTML = '';
  pistas.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'pdot' + (i === 0 ? ' act' : ''); d.id = 'pd' + i;
    p.appendChild(d);
  });
}
function mostrarPista() {
  const p = pistas[pistaActual];
  document.getElementById('esc-label').textContent    = `PISTA ${pistaActual+1} DE ${pistas.length}`;
  document.getElementById('esc-pregunta').textContent = p.q;
  const ops = document.getElementById('esc-opciones'); ops.innerHTML = '';
  p.ops.forEach((op, i) => {
    const b = document.createElement('button'); b.className = 'esc-btn'; b.textContent = op;
    b.onclick = () => responder(i, b, ops); ops.appendChild(b);
  });
}
function responder(idx, btn, cont) {
  const p = pistas[pistaActual];
  if (idx === p.ok) {
    btn.classList.add('ok');
    document.getElementById('pd' + pistaActual).classList.replace('act','done');
    cont.querySelectorAll('.esc-btn').forEach(b => (b.disabled = true));
    setTimeout(() => {
      if (++pistaActual >= pistas.length) {
        document.getElementById('esc-juego').classList.add('hidden');
        document.getElementById('esc-final').classList.remove('hidden');
      } else {
        document.getElementById('pd' + pistaActual).classList.add('act');
        mostrarPista();
      }
    }, 650);
  } else {
    btn.classList.add('no'); setTimeout(() => btn.classList.remove('no'), 450);
  }
}
function reiniciarEscape() { iniciarEscape(); }

/* ═══════════════════════════════════════════════════
   IMPACTO
═══════════════════════════════════════════════════ */
const impData = [
  { lbl:'💛 Felicidad',         val:'+∞%',   pct:100, color:'linear-gradient(90deg,#ffd54f,#ff9800)' },
  { lbl:'❤️ Amor',              val:'+1000%', pct:100, color:'linear-gradient(90deg,#ff1493,#c2185b)' },
  { lbl:'😔 Tristeza',          val:'10%',    pct:10,  color:'linear-gradient(90deg,#7e57c2,#512da8)' },
  { lbl:'☀️ Días buenos',       val:'+200%',  pct:95,  color:'linear-gradient(90deg,#ffcc02,#ff9800)' },
  { lbl:'🌙 Noches tranquilas', val:'+300%',  pct:88,  color:'linear-gradient(90deg,#4fc3f7,#1565c0)' },
  { lbl:'🔥 Ganas de vivir',    val:'+500%',  pct:98,  color:'linear-gradient(90deg,#ff6e40,#ff1744)' },
];
(function () {
  const g = document.getElementById('imp-grid');
  impData.forEach(it => {
    g.innerHTML += `<div class="imp-row">
      <div class="imp-head">
        <span class="imp-lbl">${it.lbl}</span>
        <span class="imp-val" data-p="${it.pct}">${it.val}</span>
      </div>
      <div class="bfondo"><div class="brelleno" data-pct="${it.pct}" style="background:${it.color}"></div></div>
    </div>`;
  });
})();

function animarImpacto() {
  document.querySelectorAll('.brelleno').forEach(b => setTimeout(() => (b.style.width = b.dataset.pct + '%'), 200));
  document.querySelectorAll('.imp-val').forEach(v => setTimeout(() => v.classList.add('vis'), 400));
}

/* ═══════════════════════════════════════════════════
   DECISIONES
═══════════════════════════════════════════════════ */
const arbol = [
  { q:'Si pudiera elegir mil veces...',  ops:[{t:'Te elegiría',n:1},           {t:'Te elegiría otra vez',n:1}]     },
  { q:'Y si el tiempo se reiniciara...', ops:[{t:'Volvería a buscarte',n:2},   {t:'Esperaría a que llegaras',n:2}] },
  { q:'Porque al final de todo...',      ops:[{t:'Eres mi persona favorita',n:3},{t:'Eres mi lugar seguro',n:3}]   },
  { res:'La respuesta siempre fuiste tú, Sharick. En cada universo, en cada versión de esta historia, en cada elección posible... siempre, siempre tú. 💕' },
];
function cargarDec(idx) {
  const c = document.getElementById('dec-juego');
  const n = arbol[idx];
  if (n.res) {
    c.innerHTML = `<div class="dec-resultado">${n.res}</div>
      <button class="btn" style="margin-top:18px" onclick="cargarDec(0)">Empezar de nuevo 🔄</button>`;
    return;
  }
  c.innerHTML = `<p class="dec-q">${n.q}</p>
    <div class="dec-ops">${n.ops.map(o => `<button class="dec-btn" onclick="cargarDec(${o.n})">${o.t}</button>`).join('')}</div>`;
}

/* ═══════════════════════════════════════════════════
   RULETA
═══════════════════════════════════════════════════ */
const mensajesRuleta = [
  'Tu sonrisa siempre iluminará mi vida 🌟',
  'Contigo cada día es mi favorito 💕',
  'Eres la razón de mis mejores momentos 🌹',
  'Mi corazón siempre te va a elegir 💖',
  'Eres la persona más especial para mí 🥰',
  'Gracias por amarme como lo haces 💝',
  'Contigo soy la versión más feliz de mí 🌸',
  'Eres mi lugar favorito del universo 🏠',
  'Tu risa es la melodía más bonita ✨',
  'Tus nalgas y tu sonrisa siempre serán mi regalo favorito 🎁',
  'Tus nalgas siempre serán lo que siempre soñé 💫',
  'Te amo más de lo que puedo llegar a explicar ❤️',
];
const emojisRuleta = ['💖','🌹','✨','💕','🥰','💝','🌸','💫','❤️','🎀','🌟','💘'];
let ruletaGirando = false;
let ruletaAngulo  = 0;

function girarRuleta() {
  if (ruletaGirando) return;
  ruletaGirando = true;
  const rueda = document.getElementById('ruleta-rueda');
  const emoji = document.getElementById('ruleta-emoji');
  const msg   = document.getElementById('ruleta-msg');
  msg.style.opacity = '0.2';
  ruletaAngulo += (3 + Math.random() * 4) * 360 + Math.random() * 360;
  rueda.style.transform = `rotate(${ruletaAngulo}deg)`;
  let t = 0;
  const iv = setInterval(() => {
    emoji.textContent = emojisRuleta[Math.floor(Math.random() * emojisRuleta.length)];
    if (++t > 22) clearInterval(iv);
  }, 155);
  setTimeout(() => {
    ruletaGirando = false;
    const idx = Math.floor(Math.random() * mensajesRuleta.length);
    emoji.textContent = emojisRuleta[idx % emojisRuleta.length];
    msg.textContent   = mensajesRuleta[idx];
    msg.style.opacity = '1';
  }, 3600);
}

/* ═══════════════════════════════════════════════════
   RAZONES
═══════════════════════════════════════════════════ */
const razonesData = [
  { ic:'😊', titulo:'Tu sonrisa',        texto:'Cuando sonríes el mundo entero tiene más brillo. No hay nada igual en este universo.' },
  { ic:'🫂', titulo:'Tu abrazo',          texto:'En tus brazos siempre encuentro el lugar más seguro y cálido que existe.' },
  { ic:'💬', titulo:'Tu forma de hablar', texto:'Puedo escucharte hablar horas y horas y siempre querer más. Eres increíble, pequeña doctora.' },
  { ic:'💪', titulo:'Tu fortaleza',       texto:'Admiro profundamente lo valiente que eres. Enfrentas la vida con una fuerza que me inspira.' },
  { ic:'🎨', titulo:'Tu creatividad',     texto:'Todo lo que tocas lo conviertes en algo hermoso. Tienes un talento único para hacer magia.' },
  { ic:'🌙', titulo:'Tu corazón',         texto:'Tienes el corazón más bonito que he conocido. Tu bondad me hace mejor persona cada día.' },
  { ic:'🤣', titulo:'Tus nalgas',         texto:'Aunque menos romántico, no puedo evitar recalcarlo: tus nalgas siempre harán que te ame y te siga amando cada día, mi vida preciosa.' },
  { ic:'🌟', titulo:'Tu luz',             texto:'Entras a un lugar y lo iluminas todo sin siquiera intentarlo. Eres luz pura, princesita culona.' },
  { ic:'🧠', titulo:'Tu inteligencia',    texto:'Eres brillante. Me sorprendes constantemente con lo que piensas y cómo ves el mundo.' },
];

function buildRazones() {
  const g = document.getElementById('razones-grid');
  if (g.children.length > 0) return;
  razonesData.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'razon-card';
    card.innerHTML = `
      <span class="razon-ic">${r.ic}</span>
      <span class="razon-num">RAZÓN #${i+1}</span>
      <span class="razon-tit">${r.titulo}</span>
      <p class="razon-txt">${r.texto}</p>`;
    g.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════
   CAJITA DEL ANILLO
═══════════════════════════════════════════════════ */
let cajitaAbierta = false;

function abrirCajita() {
  if (cajitaAbierta) return;
  cajitaAbierta = true;
  playSound('snd-ring');
  const tapa = document.getElementById('cajita-tapa');
  const anilloInside = document.getElementById('anillo-inside');
  const hint = document.getElementById('cajita-hint');
  tapa.classList.add('abierta');
  hint.style.display = 'none';
  setTimeout(() => {
    anilloInside.classList.remove('hidden');
  }, 400);
  setTimeout(() => {
    document.getElementById('anillo-pregunta').classList.remove('hidden');
  }, 900);
}

function aceptarAnillo() {
  // Ocultar panel anillo
  document.getElementById('panel-anillo').classList.add('hidden');
  // Mostrar overlay
  const overlay = document.getElementById('overlay-anillo');
  overlay.classList.remove('hidden');
  // Lluvia de corazones
  lluviaCorazones();
}

function lluviaCorazones() {
  const emojis = ['💜','💖','💕','💗','❤️','✨','💍','🌹','💝','💞'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'corazon-lluvia';
      c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const duracion = Math.random() * 3 + 2.5;
      c.style.cssText = `
        left:${Math.random() * 100}vw;
        bottom:0;
        font-size:${Math.random() * 22 + 14}px;
        animation-duration:${duracion}s;
        animation-delay:${Math.random() * 1.5}s`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), (duracion + 1.8) * 1000);
    }, i * 45);
  }
}

function irFinalAmor() {
  document.getElementById('overlay-anillo').classList.add('hidden');
  // Resetear cajita para si vuelve
  cajitaAbierta = false;
  document.getElementById('cajita-tapa').classList.remove('abierta');
  document.getElementById('anillo-inside').classList.add('hidden');
  document.getElementById('anillo-pregunta').classList.add('hidden');
  document.getElementById('cajita-hint').style.display = '';
  ir('sec-final-amor');
}

/* ═══════════════════════════════════════════════════
   CUMPLEAÑOS
═══════════════════════════════════════════════════ */
function verificarCumple() {
  const hoy = new Date();
  const cumple = new Date('2026-10-08');
  if (hoy >= cumple) {
    mostrarExtra('panel-cumple');
  }
  // Si no es la fecha, la tarjeta ya indica el aviso, no se abre
}

/* ═══════════════════════════════════════════════════
   CÓDIGOS FINALES — CON localStorage
═══════════════════════════════════════════════════ */
const CODES = ['STAR','LUNA','ALMA','ROSE','VIDA','EVER'];

// Cargar códigos guardados desde localStorage
const STORAGE_KEY = 'nuestro_rincon_codigos';
let found = new Set();

function cargarCodigosGuardados() {
  try {
    const guardados = localStorage.getItem(STORAGE_KEY);
    if (guardados) {
      const arr = JSON.parse(guardados);
      found = new Set(arr.filter(c => CODES.includes(c)));
    }
  } catch(e) {
    found = new Set();
  }
  actualizarBadges();
}

function guardarCodigos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...found]));
  } catch(e) {}
}

function agregarCod() {
  const inp = document.getElementById('cod-input');
  const err = document.getElementById('err-msg');
  const val = inp.value.trim().toUpperCase();
  err.classList.add('hidden');
  if (!CODES.includes(val) || found.has(val)) {
    err.classList.remove('hidden');
    inp.value = '';
    setTimeout(() => err.classList.add('hidden'), 2500);
    return;
  }
  found.add(val);
  guardarCodigos();
  inp.value = '';
  actualizarBadges();
}

function actualizarBadges() {
  const bg  = document.getElementById('badges');
  const ct  = document.getElementById('conteo-cod');
  const btn = document.getElementById('btn-desbloquear');
  bg.innerHTML = found.size === 0
    ? `<span style="color:rgba(255,255,255,.28);font-size:.88rem">Aún ninguno...</span>`
    : [...found].map(c => `<span class="badge">${c}</span>`).join('');
  ct.textContent = `${found.size} / 6 encontrados`;
  if (found.size >= 6) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.cursor  = 'pointer';
  }
}

function desbloquear() {
  if (found.size < 6) return;
  playSound('snd-unlock');
  document.getElementById('vista-cod').classList.add('hidden');
  document.getElementById('contenido-desbloqueado').classList.remove('hidden');
  // Lluvia de corazones al desbloquear
  for (let i = 0; i < 50; i++) setTimeout(() => {
    const c = document.createElement('div');
    c.style.cssText = `position:fixed;font-size:${Math.random()*24+14}px;
      left:${Math.random()*100}vw;top:110vh;pointer-events:none;z-index:999;
      animation:finLluvia 4.5s ease forwards`;
    c.textContent = '💖';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4700);
  }, i * 80);
  iniciarCuentaRegresiva();
}

function volverACodigos() {
  document.getElementById('contenido-desbloqueado').classList.add('hidden');
  document.getElementById('vista-cod').classList.remove('hidden');
}

/* ═══════════════════════════════════════════════════
   CUENTA REGRESIVA — 12 junio 2026
═══════════════════════════════════════════════════ */
let cuentaInterval = null;

function iniciarCuentaRegresiva() {
  if (cuentaInterval) clearInterval(cuentaInterval);
  const meta = new Date('2026-06-12T00:00:00');

  function tick() {
    const ahora = new Date();
    const diff  = meta - ahora;
    if (diff <= 0) {
      document.getElementById('cr-dias').textContent  = '0';
      document.getElementById('cr-horas').textContent = '0';
      document.getElementById('cr-min').textContent   = '0';
      document.getElementById('cr-seg').textContent   = '0';
      return;
    }
    document.getElementById('cr-dias').textContent  = Math.floor(diff / (1000*60*60*24));
    document.getElementById('cr-horas').textContent = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    document.getElementById('cr-min').textContent   = Math.floor((diff%(1000*60*60))/(1000*60));
    document.getElementById('cr-seg').textContent   = Math.floor((diff%(1000*60))/1000);
  }
  tick();
  cuentaInterval = setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════════
   EXTRAS POST-DESBLOQUEO
═══════════════════════════════════════════════════ */
function mostrarExtra(id) {
  document.querySelectorAll('.panel-extra').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById(id);
  if (panel) {
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (id === 'panel-ruleta') {
      document.getElementById('ruleta-msg').textContent = 'Presiona girar para recibir tu mensaje... ✨';
      document.getElementById('ruleta-msg').style.opacity = '1';
    }
    if (id === 'panel-razones') buildRazones();
    if (id === 'panel-anillo') {
      // resetear cajita si ya se abrió antes
      cajitaAbierta = false;
      document.getElementById('cajita-tapa').classList.remove('abierta');
      document.getElementById('anillo-inside').classList.add('hidden');
      document.getElementById('anillo-pregunta').classList.add('hidden');
      document.getElementById('cajita-hint').style.display = '';
    }
  }
}

function cerrarExtra(id) {
  document.getElementById(id).classList.add('hidden');
}

/* ═══════════════════════════════════════════════════
   ESTILOS DINÁMICOS EXTRA
═══════════════════════════════════════════════════ */
const sLluvia = document.createElement('style');
sLluvia.textContent = `
@keyframes finLluvia {
  from { transform: translateY(0) rotate(0deg); opacity: 1; }
  to   { transform: translateY(-125vh) rotate(720deg); opacity: 0; }
}`;
document.head.appendChild(sLluvia);

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  cargarCodigosGuardados();
});
