/* ═══════════════════════════════════════════
   SONUU BIRTHDAY — PREMIUM JS
   ═══════════════════════════════════════════ */

'use strict';

// ── LOADER ──────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initAll();
  }, 2800);
});

function initAll() {
  initCursor();
  initGalaxy();
  initParticles();
  initFloatingHearts();
  initScrollReveal();
  initTiltCards();
  initGallery();
  initReasons();
  initCountdown();
  initFireworks();
  initMusic();
}

// ── CURSOR ──────────────────────────────────
function initCursor() {
  const glow = document.getElementById('cursor-glow');
  const dot  = document.getElementById('cursor-dot');
  let mx = 0, my = 0, gx = 0, gy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function animateCursor() {
    gx += (mx - gx) * 0.12; gy += (my - gy) * 0.12;
    glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .reason-card, .gallery-slide').forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width = '80px'; glow.style.height = '80px';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width = '40px'; glow.style.height = '40px';
    });
  });
}

// ── GALAXY CANVAS ───────────────────────────
function initGalaxy() {
  const canvas = document.getElementById('galaxy-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [], nebulas = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildStars(); buildNebulas();
  }

  function buildStars() {
    stars = [];
    for (let i = 0; i < 350; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        a: Math.random(), da: (Math.random() - 0.5) * 0.004,
        color: ['#e91e8c','#f472b6','#c0556a','#fce7f3','#d4aab5'][Math.floor(Math.random() * 5)],
        vx: (Math.random() - 0.5) * 0.06, vy: (Math.random() - 0.5) * 0.06,
      });
    }
  }

  function buildNebulas() {
    nebulas = [];
    const cols = [
      'rgba(233,30,140,', 'rgba(244,114,182,', 'rgba(255,182,213,', 'rgba(192,85,106,'
    ];
    for (let i = 0; i < 6; i++) {
      nebulas.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 250 + 100,
        color: cols[Math.floor(Math.random() * cols.length)],
        a: Math.random() * 0.12 + 0.03,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fff0f5';
    ctx.fillRect(0, 0, W, H);

    // soft pink nebulas
    nebulas.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color + n.a + ')');
      g.addColorStop(1, n.color + '0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    });

    // glitter stars
    stars.forEach(s => {
      s.x += s.vx; s.y += s.vy; s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, s.a));
      ctx.shadowBlur = 8; ctx.shadowColor = s.color;
      ctx.fillStyle = s.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize(); draw();
}

// ── FLOATING PARTICLES ──────────────────────
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      a: Math.random(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      color: ['#a855f7','#f472b6','#d4af7a','#ff2d78'][Math.floor(Math.random() * 4)],
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.a -= 0.002;
      if (p.y < 0 || p.a <= 0) {
        p.x = Math.random() * W; p.y = H + 10;
        p.a = Math.random() * 0.6 + 0.2;
      }
      ctx.save(); ctx.globalAlpha = p.a;
      ctx.shadowBlur = 6; ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize(); draw();
}

// ── FLOATING HEARTS ─────────────────────────
function initFloatingHearts() {
  const container = document.getElementById('float-hearts');
  const hearts = ['❤', '💕', '💖', '💗', '🌸', '✨', '💫'];

  function spawnHeart() {
    const el = document.createElement('div');
    el.className = 'float-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${Math.random() * 1.5 + 0.8}rem;
      animation-duration: ${Math.random() * 8 + 8}s;
      animation-delay: ${Math.random() * 4}s;
      opacity: 0;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), 16000);
  }

  setInterval(spawnHeart, 800);
  for (let i = 0; i < 6; i++) spawnHeart();
}

// ── SCROLL REVEAL ───────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseFloat(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('revealed'), delay * 1000);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => obs.observe(el));
}

// ── TILT CARDS ──────────────────────────────
function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    });
  });
}

// ── GALLERY ─────────────────────────────────
function initGallery() {
  const carousel = document.getElementById('gallery-carousel');
  const slides   = carousel.querySelectorAll('.gallery-slide');
  const dotsWrap = document.getElementById('gallery-dots');
  let current = 0;

  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    const slideWidth = slides[0].offsetWidth + 24; // width + gap
    carousel.style.transform = `translateX(-${current * slideWidth}px)`;
    dotsWrap.querySelectorAll('.gallery-dot').forEach((d, j) =>
      d.classList.toggle('active', j === current)
    );
  }

  document.getElementById('gallery-prev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('gallery-next').addEventListener('click', () => goTo(current + 1));

  // Auto-advance
  setInterval(() => goTo(current + 1), 4000);
}

// ── 23 REASONS ──────────────────────────────
function initReasons() {
  const reasons = [
    "Your laugh that fills the room with warmth",
    "The way your eyes light up when you're excited",
    "How you make ordinary moments feel magical",
    "Your incredible kindness to everyone around you",
    "The way you understand me without a word",
    "Your strength when life gets hard",
    "Those late-night conversations that last forever",
    "How you love so deeply and fearlessly",
    "Your beautiful, caring heart",
    "The way you smell — like home",
    "Your goofy sense of humour that I adore",
    "How you always know what to say",
    "Your passion for the things you love",
    "The way you hold my hand so gently",
    "Your smile that ruins every other smile",
    "How you make the world softer just by being in it",
    "Your honesty — even when it's hard",
    "The way you care about the little things",
    "Your wildly creative mind",
    "How you see beauty in everything",
    "The way you make me a better person",
    "Your capacity to love — endlessly, purely",
    "Simply that you exist, and you chose me ❤️",
  ];

  const grid = document.getElementById('reasons-grid');
  reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card reveal-up';
    card.dataset.delay = (i * 0.05).toFixed(2);
    card.innerHTML = `<span class="reason-num">${String(i + 1).padStart(2, '0')}</span><p class="reason-text">${r}</p>`;
    grid.appendChild(card);
  });

  // Re-observe newly added elements
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseFloat(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('revealed'), delay * 1000);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  grid.querySelectorAll('.reason-card').forEach(el => obs.observe(el));
}

// ── COUNTDOWN ───────────────────────────────
function initCountdown() {
  const target = new Date('2026-05-23T00:00:00');

  function update() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('countdown-msg').textContent = "🎉 It's May 23 — Happy Birthday Sonuu! 🎉";
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id =>
        document.getElementById(id).textContent = '00'
      );
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ── FIREWORKS (auto on surprise section) ────
function initFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, fworks = [], running = false;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor(x, y, color) {
      this.x = x; this.y = y; this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1; this.decay = Math.random() * 0.02 + 0.015;
      this.r = Math.random() * 3 + 1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vy += 0.08; this.alpha -= this.decay;
    }
    draw() {
      ctx.save(); ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color; ctx.shadowBlur = 6; ctx.shadowColor = this.color;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }

  function launch() {
    const x = Math.random() * W;
    const y = Math.random() * H * 0.5;
    const colors = ['#ff2d78','#a855f7','#d4af7a','#f472b6','#ffffff','#ffcc00'];
    const color  = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 80; i++) fworks.push(new Particle(x, y, color));
  }

  function loop() {
    if (!running) return;
    ctx.fillStyle = 'rgba(5,5,8,0.15)';
    ctx.fillRect(0, 0, W, H);
    fworks = fworks.filter(p => p.alpha > 0);
    fworks.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  // Observe surprise section
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !running) {
        running = true;
        const interval = setInterval(launch, 600);
        setTimeout(() => { clearInterval(interval); running = false; }, 6000);
        loop();
      }
    });
  }, { threshold: 0.3 });
  obs.observe(document.getElementById('surprise'));
}

// ── CONFETTI ─────────────────────────────────
let confettiRunning = false;
function triggerCelebration() {
  if (confettiRunning) return;
  confettiRunning = true;

  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#ff2d78','#a855f7','#f472b6','#d4af7a','#ffffff','#ffcc00','#6b21a8'];

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10,
      w: Math.random() * 12 + 4, h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4, vy: Math.random() * 4 + 2,
      rot: Math.random() * 360, vrot: (Math.random() - 0.5) * 8,
      alpha: 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vrot;
      if (p.y > canvas.height * 0.6) p.alpha -= 0.02;
      if (p.alpha > 0) {
        alive = true;
        ctx.save(); ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y); ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });
    if (alive) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); confettiRunning = false; }
  }

  draw();
}

// ── MUSIC ────────────────────────────────────
function initMusic() {
  const btn   = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  const icon  = document.getElementById('music-icon');
  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause(); playing = false;
      icon.style.animation = 'none';
      btn.style.borderColor = '';
    } else {
      audio.volume = 0.35;
      audio.play().catch(() => {});
      playing = true;
      icon.style.animation = 'spin-slow 2s linear infinite';
      btn.style.borderColor = 'rgba(168,85,247,.6)';
    }
  });
}

// ── PARALLAX on Scroll ───────────────────────
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${sy * 0.3}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - sy / 600);
  }
});
