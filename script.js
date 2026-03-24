// ── Particle System ──
(function () {
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function rand(a, b) { return a + Math.random() * (b - a); }

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = rand(0, W);
    this.y = rand(0, H);
    this.r = rand(1, 3);
    this.vx = rand(-0.3, 0.3);
    this.vy = rand(-0.5, -0.15);
    this.alpha = rand(0.2, 0.8);
    this.color = Math.random() < 0.5 ? '#e0447a' : '#f5c842';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.002;
    if (this.alpha <= 0 || this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

for (let i = 0; i < 90; i++) particles.push(new Particle());

function loop() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(loop);
}
loop();
})();

// ── Page Navigation ──
const pages = Array.from(document.querySelectorAll('.page'));
const dots   = Array.from(document.querySelectorAll('.dot'));
let current  = 0;

function showPage(index) {
  pages.forEach((p, i) => {
    if (i === index) {
      p.classList.add('active');

      p.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
      });
    } else {
      p.classList.remove('active');
    }
  });

  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  current = index;
}

// ── Page 1 Buttons ──
document.getElementById('btn-yes').addEventListener('click', () => {
  showPage(1);
});

document.getElementById('btn-no').addEventListener('click', () => {
  const btn = document.getElementById('btn-no');
  const messages = ['Pakka?', 'Sach mein?', 'Thoda soch lo…', 'Arrey…', 'Chalo maano 🙈'];
  let i = 0;

  function rand(a,b){ return a + Math.random()*(b-a); }

  function wiggle() {
    btn.textContent = messages[i++ % messages.length];
    btn.style.transform = `translate(${rand(-80,80)}px, ${rand(-40,40)}px)`;
  }

  wiggle();
  const iv = setInterval(wiggle, 700);

  setTimeout(() => {
    clearInterval(iv);
    btn.textContent = 'Nahi 😔';
    btn.style.transform = '';
  }, 3500);
});

// ── Page 2 Next ──
document.getElementById('p2-next').addEventListener('click', () => {
  showPage(2);
  startFlip('flip3', 'fn3', 'p3-next');
});

// ── Flip Card Logic ──
function startFlip(cardId, barId, nextBtnId) {
  const card    = document.getElementById(cardId);
  const bar     = document.getElementById(barId);
  const nextBtn = document.getElementById(nextBtnId);
  const dur     = 5000;

  card.classList.remove('flipped');
  bar.style.transition = 'none';
  bar.style.width = '0%';
  if (nextBtn) nextBtn.classList.remove('show');

  void bar.offsetWidth;

  bar.style.transition = `width ${dur}ms linear`;
  bar.style.width = '100%';

  setTimeout(() => {
    card.classList.add('flipped');
    spawnRoses(6);
    if (nextBtn) {
      setTimeout(() => nextBtn.classList.add('show'), 1000);
    }
  }, dur);
}

// ── Rose rain ──
function spawnRoses(count) {
  const overlay = document.querySelector('.rose-overlay');
  const emojis  = ['🌹','🌸','💕','❤️','🌺','💖'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'rose-petal';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (2 + Math.random() * 2) + 's';
    el.style.animationDelay = (Math.random() * 0.8) + 's';
    el.style.fontSize = (1.2 + Math.random()) + 'rem';

    overlay.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ── Navigation आगे ──
document.getElementById('p3-next').addEventListener('click', () => {
  showPage(3);
  startFlip('flip4', 'fn4', 'p4-next');
});

document.getElementById('p4-next').addEventListener('click', () => {
  showPage(4);
  startFlip('flip5', 'fn5', 'p5-next');
});

document.getElementById('p5-next').addEventListener('click', () => {
  showPage(5);
  spawnRoses(20);
});

// ── Init ──
showPage(0);