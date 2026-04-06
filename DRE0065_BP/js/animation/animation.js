(() => {
  const c = document.getElementById("bgCanvas");
  if(!c)
    return;

  const x = c.getContext("2d", {alpha: false});
  if(!x)
    return;

  const k = {n:150, d:150, r:7.2, rs:2.0, lw:1.5, la:0.18, v:0.32, hr:220, hs:2.6, pr:3.6, pa:0.55, pn:7, pm:420, bs:1.25, ba:0.10};
  const OFF = -1e9, TAU = Math.PI * 2, FRAME = 16.6667;

  let w = 0, h = 0, dpr = 1, a = [], t0 = 0;
  const m = {x: OFF, y: OFF, on: false, lx: OFF, ly: OFF};

  const pulses = [];
  let lastPulse = 0;

  const R = (p, q) => p + Math.random() * (q - p);
  const C = (v, p, q) => Math.max(p, Math.min(q, v));
  const isDarkTheme = () => document.body.classList.contains('dark-mode');

  function getPalette(){
    if(isDarkTheme())
      return {bg: '#121212', line: (alpha) => `rgba(255,255,255,${alpha})`, pulse: `rgba(110,168,255,${k.pa})`, shadow: 'rgba(255,255,255,0.10)', pointFill: '#6ea8ff', pointStroke: '#f2f2f2'};

    return {bg: 'white', line: (alpha) => `rgba(0,0,0,${alpha})`, pulse: `rgba(11,94,215,${k.pa})`, shadow: 'rgba(0,0,0,0.16)', pointFill: '#0b5ed7', pointStroke: 'black'};
  }

  function initPoints(){
    a = Array.from({length: k.n}, () => ({x: R(0, w), y: R(0, h), vx: R(-k.v, k.v), vy: R(-k.v, k.v), ph: R(0, TAU)}));
  }

  function fit(){
    const ndpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const nw = window.innerWidth;
    const nh = window.innerHeight;

    if(nw === w && nh === h && ndpr === dpr)
      return;

    const ow = w || nw;
    const oh = h || nh;

    dpr = ndpr;
    w = nw;
    h = nh;

    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);
    
    c.style.width = w + "px";
    c.style.height = h + "px";
    x.setTransform(dpr, 0, 0, dpr, 0, 0);

    if(!a.length){
      initPoints();
      return;
    }

    const sx = w / ow, sy = h / oh;
    for(const p of a){
      p.x = C(p.x * sx, 0, w);
      p.y = C(p.y * sy, 0, h);
    }
  }

  function pickLink(){
    const i = (Math.random() * a.length) | 0;
    const p = a[i];

    let best = -1, bd = 1e9;
    for(let j = 0; j < a.length; j++){
      if(j === i)
        continue;

      const q = a[j];
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if(d < bd && d < k.d){
        bd = d;
        best = j;
      }
    }
    return best < 0 ? null : [i, best];
  }

  function spawnPulse(now){
    if(pulses.length >= k.pn)
      return;
    if(now - lastPulse < k.pm)
      return;
    if(Math.random() > 0.55)
      return;

    const L = pickLink();
    if(!L)
      return;

    lastPulse = now;
    pulses.push({i: L[0], j: L[1], t: 0, s: R(0.10, 0.22), life: R(8, 18)});
  }

  function P(dt, now){
    const mx = m.x, my = m.y;
    const mv = m.on ? Math.hypot(mx - m.lx, my - m.ly) : 0;
    const boost = 1 + C(mv / 40, 0, 3);

    for(const p of a){
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if(m.on){
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.hypot(dx, dy);

        if(dist > 0.001 && dist < k.hr){
          const u = 1 - dist / k.hr;
          const push = k.hs * boost * u * u * dt * 4.0;
          
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }
      }

      if(p.x < 0){
        p.x = 0;
        p.vx *= -1;
      }
      else if(p.x > w){
        p.x = w;
        p.vx *= -1;
      }

      if(p.y < 0){
        p.y = 0;
        p.vy *= -1;
      }
      else if(p.y > h){
        p.y = h;
        p.vy *= -1;
      }
    }

    for(let i = pulses.length - 1; i >= 0; i--){
      const s = pulses[i];
      s.t += s.s * dt;
      s.life -= dt;

      if(s.t >= 1 || s.life <= 0)
        pulses.splice(i, 1);
    }
    spawnPulse(now);
  }

  function D(now){
    const palette = getPalette();

    x.fillStyle = palette.bg;
    x.fillRect(0, 0, w, h);
    x.lineWidth = k.lw;
    x.shadowBlur = 0;

    for(let i = 0; i < a.length; i++){
      for(let j = i + 1; j < a.length; j++){
        const p = a[i], q = a[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);

        if(dist > k.d)
          continue;

        const u = 1 - dist / k.d;
        const alpha = k.la * (0.25 + 0.75 * u);
        
        x.strokeStyle = palette.line(alpha);
        x.beginPath();
        x.moveTo(p.x, p.y);
        x.lineTo(q.x, q.y);
        x.stroke();
      }
    }

    for(const s of pulses){
      const p = a[s.i], q = a[s.j];
      const px = p.x + (q.x - p.x) * s.t;
      const py = p.y + (q.y - p.y) * s.t;
      const pr = k.pr + 1.6 * Math.sin((now / 1000) * 6.0);

      x.fillStyle = palette.pulse;
      x.beginPath();
      x.arc(px, py, pr, 0, TAU);
      x.fill();
    }

    const time = now / 1000;
    x.shadowColor = palette.shadow;
    x.shadowBlur = 8;
    x.fillStyle = palette.pointFill;
    x.strokeStyle = palette.pointStroke;
    x.lineWidth = k.rs;

    for(const p of a){
      const pulse = 1 + k.ba * Math.sin(time * k.bs * TAU + p.ph);
      const rr = k.r * pulse;

      x.beginPath();
      x.arc(p.x, p.y, rr, 0, TAU);
      x.fill();
      x.stroke();
    }
  }

  function T(t){
    fit();
    if(!t0)
      t0 = t;

    const dt = C((t - t0) / FRAME, 0, 2);
    t0 = t;

    P(dt, t);
    D(t);
    requestAnimationFrame(T);
  }

  window.addEventListener("mousemove", (e) => {m.lx = m.x; m.ly = m.y; m.x = e.clientX; m.y = e.clientY; m.on = true;}, {passive: true});
  window.addEventListener("mouseleave", () => {m.on = false; m.x = m.y = m.lx = m.ly = OFF;}, {passive: true});
  window.addEventListener("resize", fit);

  const vv = window.visualViewport;
  if(vv){
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
  }

  fit();
  requestAnimationFrame(T);
})();