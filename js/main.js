/* ═══════════════════════════════════════════════════
   ESTRELLAS DE FONDO
═══════════════════════════════════════════════════ */
(function () {
  const bg = document.getElementById('stars-bg');
  for (let i = 0; i < 130; i++) {
    const s = document.createElement('div');
    s.className = 'star-bg';
    const sz = Math.random() * 2.5 + 0.4;
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
   MÚSICA DE FONDO
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
   NAVEGACIÓN ENTRE SECCIONES
═══════════════════════════════════════════════════ */
function ir(id) {
  document.querySelectorAll('.sec').forEach(s => {
    s.style.opacity = '0';
    setTimeout(() => s.classList.add('hidden'), 280);
  });
  setTimeout(() => {
    const d = document.getElementById(id);
    d.classList.remove('hidden');
    setTimeout(() => (d.style.opacity = '1'), 30);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'sec-impacto')      setTimeout(animarImpacto, 400);
    if (id === 'sec-constelacion') setTimeout(dibujarConst, 200);
    if (id === 'sec-universo')     buildUniverso();
    if (id === 'sec-escape')       iniciarEscape();
    if (id === 'sec-decisiones')   cargarDec(0);
  }, 300);
}

/* ═══════════════════════════════════════════════════
   CONSTELACIÓN
═══════════════════════════════════════════════════ */
const estrellas = [
  { x: .08, y: .18, msg: 'Esta constelación es una pequeña referencia porque gracias a ti he podido cambiar poco a poco en la vida y lograr ser una mejor persona, y lograste que este tonto apático fuera capaz de ser meloso y logre ser una supernova. 💙', nombre: 'C',  tipo: 'inicial' },
  { x: .92, y: .18, msg: 'S de Sharick, mi persona favorita ❤️',   nombre: 'S',  tipo: 'inicial' },
  { x: .5,  y: .06, msg: '27/04/2025 — El día que empezó todo 🗓️',  nombre: '✦', tipo: 'fecha'   },
  { x: .42, y: .52, msg: 'Este corazón late por ti 💖',              nombre: '♡', tipo: 'corazon' },
  { x: .58, y: .52, msg: 'Siempre, siempre ❤️',                     nombre: '♡', tipo: 'corazon' },
  { x: .38, y: .65, msg: 'Nuestro amor no tiene límites ∞',         nombre: '♡', tipo: 'corazon' },
  { x: .62, y: .65, msg: 'Juntos somos invencibles 🔥',             nombre: '♡', tipo: 'corazon' },
  { x: .5,  y: .78, msg: 'Todo termina y empieza en ti 🌹',         nombre: '♡', tipo: 'corazon' },
  { x: .25, y: .35, msg: 'Tu sonrisa es mi lugar seguro 😊',        nombre: '★', tipo: 'normal'  },
  { x: .75, y: .35, msg: 'Te elegiría en cada universo 🌌',         nombre: '★', tipo: 'normal'  },
  { x: .15, y: .75, msg: 'Gracias por existir en mi vida 🥰',       nombre: '★', tipo: 'normal'  },
  { x: .85, y: .75, msg: 'Contigo el tiempo vuela ⏳',               nombre: '★', tipo: 'normal'  },
  { x: .5,  y: .45, msg: 'El centro de todo lo que soy 💫',         nombre: '★', tipo: 'centro'  },
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

  ctx.strokeStyle = 'rgba(255,105,180,.2)'; ctx.lineWidth = 1;
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
    glow.addColorStop(0, `rgba(${rgbMap[col]},.35)`);
    glow.addColorStop(1,'transparent');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x,y,r*3.5,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur = 14; ctx.shadowColor = col;
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
      tip.style.left = (ev.clientX + 14) + 'px';
      tip.style.top  = (ev.clientY - 18) + 'px';
      tip.classList.add('on');
      clearTimeout(tip._t);
      tip._t = setTimeout(() => tip.classList.remove('on'), 3200);
    }
  });
});

/* ═══════════════════════════════════════════════════
   UNIVERSO — PLANETAS
═══════════════════════════════════════════════════ */
const planetas = [
  { ic:'💖', nombre:'Amor',      color:'#ff1493', desc:'Aquí vive todo el amor que siento por ti. Crece cada día sin límite, sin fin, sin condiciones.',                              size:50, dist:.30, vel:11 },
  { ic:'🤝', nombre:'Confianza', color:'#4fc3f7', desc:'En este planeta construimos todo. La confianza que me das es el aire que respiro y nunca la daré por sentada.',              size:38, dist:.41, vel:18 },
  { ic:'📸', nombre:'Recuerdos', color:'#ffd54f', desc:'Cada foto, cada risa, cada momento compartido vive aquí. Este planeta se hace más grande con el tiempo.',                    size:35, dist:.51, vel:26 },
  { ic:'🌅', nombre:'Futuro',    color:'#a5d6a7', desc:'Todo lo que quiero vivir contigo. Los viajes, los proyectos, los sueños. El futuro tiene tu nombre.',                       size:42, dist:.62, vel:36 },
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
      box-shadow:0 0 18px ${p.color}90;
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
  'Más noches llenas de risas 😂',
  'Una vida entera de recuerdos 📸',
  'Toda una vida contigo ❤️',
  'Aventuras que aún no imaginamos 🗺️',
  'Más mañanas juntos ☀️',
  'Construir nuestro propio hogar 🏠',
  'Crecer juntos sin perder la magia ✨',
  'Más besos de los que podemos contar 💋',
  'Ser el uno para el otro, siempre 💑',
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
  { q:'¿Cuál es el ingrediente secreto de nuestra historia?',   ops:['El tiempo','El amor','La suerte','La distancia'],                    ok:1 },
  { q:'Si nuestro amor fuera un lugar, ¿cuál sería?',           ops:['Una ciudad fría','Un lugar sin nombre','Donde estemos juntos','El pasado'], ok:2 },
  { q:'¿Qué es lo que nunca cambiará entre nosotros?',          ops:['Nada','Las peleas','La distancia','Lo que sentimos'],                 ok:3 },
  { q:'La respuesta a todo siempre es...',                      ops:['El tiempo','El azar','Tú','Cualquier cosa'],                          ok:2 },
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
   IMPACTO EN MI VIDA
═══════════════════════════════════════════════════ */
const impData = [
  { lbl:'💛 Felicidad',        val:'+∞%',   pct:100, color:'linear-gradient(90deg,#ffd54f,#ff9800)' },
  { lbl:'❤️ Amor',             val:'+1000%', pct:100, color:'linear-gradient(90deg,#ff1493,#c2185b)' },
  { lbl:'😔 Tristeza',         val:'-90%',   pct:10,  color:'linear-gradient(90deg,#7e57c2,#512da8)' },
  { lbl:'☀️ Días buenos',      val:'+200%',  pct:95,  color:'linear-gradient(90deg,#ffcc02,#ff9800)' },
  { lbl:'🌙 Noches tranquilas', val:'+300%', pct:88,  color:'linear-gradient(90deg,#4fc3f7,#1565c0)' },
  { lbl:'🔥 Ganas de vivir',   val:'+500%',  pct:98,  color:'linear-gradient(90deg,#ff6e40,#ff1744)' },
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
   JUEGO DE DECISIONES
═══════════════════════════════════════════════════ */
const arbol = [
  { q:'Si pudiera elegir mil veces...',    ops:[{t:'Te elegiría',n:1},          {t:'Te elegiría otra vez',n:1}]    },
  { q:'Y si el tiempo se reiniciara...',   ops:[{t:'Volvería a buscarte',n:2},  {t:'Esperaría a que llegaras',n:2}] },
  { q:'Porque al final de todo...',        ops:[{t:'Eres mi persona favorita',n:3},{t:'Eres mi lugar seguro',n:3}] },
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
   MINI RULETA
═══════════════════════════════════════════════════ */
const mensajesRuleta = [
  'Tu sonrisa ilumina mi mundo entero 🌟',
  'Contigo cada día es mi favorito 💕',
  'Eres la razón de mis mejores momentos 🌹',
  'Mi corazón siempre te va a elegir 💖',
  'Eres la persona más especial que existe 🥰',
  'Gracias por amarme como lo haces 💝',
  'Contigo soy la versión más feliz de mí 🌸',
  'Eres mi hogar favorito del universo 🏠',
  'Tu risa es la melodía más bonita ✨',
  'Cada instante junto a ti es un regalo 🎁',
  'Eres todo lo que siempre soñé 💫',
  'Te amo más de lo que las palabras pueden decir ❤️',
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
   RAZONES POR LAS QUE TE AMO
═══════════════════════════════════════════════════ */
const razonesData = [
  { ic:'😊', titulo:'Tu sonrisa',        texto:'Cuando sonríes el mundo entero tiene más sentido. No hay nada igual en este universo.' },
  { ic:'🫂', titulo:'Tu abrazo',          texto:'En tus brazos siempre encuentro el lugar más seguro y cálido que existe.' },
  { ic:'💬', titulo:'Tu forma de hablar', texto:'Puedo escucharte hablar horas y horas y siempre querer más. Eres fascinante.' },
  { ic:'💪', titulo:'Tu fortaleza',       texto:'Admiro profundamente lo valiente que eres. Enfrentas la vida con una fuerza que me inspira.' },
  { ic:'🎨', titulo:'Tu creatividad',     texto:'Todo lo que tocas lo conviertes en algo hermoso. Tienes un talento único para hacer magia.' },
  { ic:'🌙', titulo:'Tu corazón',         texto:'Tienes el corazón más bonito que he conocido. Tu bondad me hace mejor persona cada día.' },
  { ic:'🤣', titulo:'Tu humor',           texto:'Me haces reír como nadie más puede. Contigo hasta los días difíciles tienen una sonrisa.' },
  { ic:'🌟', titulo:'Tu luz',             texto:'Entras a un lugar y lo iluminas todo sin siquiera intentarlo. Eres luz pura, Sharick.' },
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
   FINAL SECRETO — CÓDIGOS
═══════════════════════════════════════════════════ */
const CODES = ['STAR','LUNA','ALMA','ROSE','VIDA','EVER'];
const found = new Set();

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
  document.getElementById('vista-cod').classList.add('hidden');
  document.getElementById('contenido-desbloqueado').classList.remove('hidden');
  for (let i = 0; i < 50; i++) setTimeout(() => {
    const c = document.createElement('div');
    c.style.cssText = `position:fixed;font-size:${Math.random()*24+14}px;
      left:${Math.random()*100}vw;top:110vh;pointer-events:none;z-index:999;
      animation:finLluvia 4.5s ease forwards`;
    c.textContent = '💖';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4700);
  }, i * 80);
}

const sLluvia = document.createElement('style');
sLluvia.textContent = `@keyframes finLluvia{
  from{transform:translateY(0) rotate(0deg);opacity:1}
  to{transform:translateY(-125vh) rotate(720deg);opacity:0}}`;
document.head.appendChild(sLluvia);

/* ═══════════════════════════════════════════════════
   NAVEGACIÓN EXTRAS POST-DESBLOQUEO
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
  }
}

function cerrarExtra(id) {
  document.getElementById(id).classList.add('hidden');
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sec-menu').style.opacity = '1';
});
