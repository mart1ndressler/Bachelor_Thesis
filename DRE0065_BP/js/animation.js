(() => {
  const c = document.getElementById("bgCanvas");
  if (!c) return;

  const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (rm) return;

  const x = c.getContext("2d", { alpha: false });

  const k = {
    n: 150,
    d: 150,
    r: 7.2,
    rs: 2.0,
    lw: 1.5,
    la: 0.18,
    v: 0.32,
    hr: 220,
    hs: 2.6,
    pr: 3.6,
    pa: 0.55,
    ps: 0.16,
    pn: 7,
    pm: 420,
    bs: 1.25,
    ba: 0.10
  };

  let w = 0;
  let h = 0;
  let dpr = 1;
  let a = [];
  let t0 = 0;

  const m = { x: -1e9, y: -1e9, on: false, lx: -1e9, ly: -1e9 };

  const pulses = [];
  let lastPulse = 0;

  function visible(el) {
    if (!el) return false;
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || s.opacity === "0") return false;
    return el.getClientRects().length > 0;
  }

  function shouldDraw() {
    return true;
  }

  function R(p, q) { return p + Math.random() * (q - p); }
  function C(v, p, q) { return Math.max(p, Math.min(q, v)); }

  function fit() {
    const ndpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const nw = window.innerWidth;
    const nh = window.innerHeight;

    if (nw === w && nh === h && ndpr === dpr) return;

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

    if (!a.length) {
      a = Array.from({ length: k.n }, () => ({
        x: R(0, w),
        y: R(0, h),
        vx: R(-k.v, k.v),
        vy: R(-k.v, k.v),
        ph: R(0, Math.PI * 2)
      }));
      return;
    }

    const sx = w / ow;
    const sy = h / oh;

    for (const p of a) {
      p.x *= sx;
      p.y *= sy;
      if (p.x < 0) p.x = 0;
      if (p.x > w) p.x = w;
      if (p.y < 0) p.y = 0;
      if (p.y > h) p.y = h;
    }
  }

  function pickLink() {
    const i = (Math.random() * a.length) | 0;
    const p = a[i];
    let best = -1;
    let bd = 1e9;

    for (let j = 0; j < a.length; j++) {
      if (j === i) continue;
      const q = a[j];
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < bd && d < k.d) {
        bd = d;
        best = j;
      }
    }

    if (best < 0) return null;
    return [i, best];
  }

  function spawnPulse(now) {
    if (pulses.length >= k.pn) return;
    if (now - lastPulse < k.pm) return;
    if (Math.random() > 0.55) return;

    const L = pickLink();
    if (!L) return;

    lastPulse = now;

    pulses.push({
      i: L[0],
      j: L[1],
      t: 0,
      s: R(0.10, 0.22),
      life: R(8, 18)
    });
  }

  function P(dt, now) {
    const mx = m.x;
    const my = m.y;
    const mv = m.on ? Math.hypot(mx - m.lx, my - m.ly) : 0;
    const boost = 1 + C(mv / 40, 0, 3);

    for (const p of a) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (m.on) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.hypot(dx, dy);

        if (dist > 0.001 && dist < k.hr) {
          const u = 1 - dist / k.hr;
          const push = k.hs * boost * u * u * dt * 4.0;
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }
      }

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > w) { p.x = w; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > h) { p.y = h; p.vy *= -1; }
    }

    for (let i = pulses.length - 1; i >= 0; i--) {
      const s = pulses[i];
      s.t += s.s * dt;
      s.life -= dt;
      if (s.t >= 1 || s.life <= 0) pulses.splice(i, 1);
    }

    spawnPulse(now);
  }

  function D(now) {
    x.fillStyle = "#fff";
    x.fillRect(0, 0, w, h);

    x.shadowColor = "rgba(0,0,0,0.16)";
    x.shadowBlur = 8;
    x.lineWidth = k.lw;

    for (let i = 0; i < a.length; i++) {
      for (let j = i + 1; j < a.length; j++) {
        const p = a[i];
        const q = a[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist > k.d) continue;

        const u = 1 - dist / k.d;
        const alpha = k.la * (0.25 + 0.75 * u);

        x.strokeStyle = `rgba(0,0,0,${alpha})`;
        x.beginPath();
        x.moveTo(p.x, p.y);
        x.lineTo(q.x, q.y);
        x.stroke();
      }
    }

    x.shadowBlur = 0;

    for (const s of pulses) {
      const p = a[s.i];
      const q = a[s.j];
      const px = p.x + (q.x - p.x) * s.t;
      const py = p.y + (q.y - p.y) * s.t;

      const pr = k.pr + 1.6 * Math.sin((now / 1000) * 6.0);
      x.fillStyle = `rgba(11,94,215,${k.pa})`;
      x.beginPath();
      x.arc(px, py, pr, 0, Math.PI * 2);
      x.fill();
    }

    const time = now / 1000;

    x.fillStyle = "#0b5ed7";
    x.strokeStyle = "#000";
    x.lineWidth = k.rs;

    for (const p of a) {
      const pulse = 1 + k.ba * Math.sin(time * k.bs * 2 * Math.PI + p.ph);
      const rr = k.r * pulse;

      x.beginPath();
      x.arc(p.x, p.y, rr, 0, Math.PI * 2);
      x.fill();
      x.stroke();
    }
  }

  function clearOnly() {
    x.fillStyle = "#fff";
    x.fillRect(0, 0, w, h);
  }

  function T(t) {
    fit();

    if (!shouldDraw()) {
      clearOnly();
      requestAnimationFrame(T);
      return;
    }

    if (!t0) t0 = t;
    const dt = C((t - t0) / 16.6667, 0, 2);
    t0 = t;

    P(dt, t);
    D(t);

    requestAnimationFrame(T);
  }

  window.addEventListener("mousemove", (e) => {
    m.lx = m.x;
    m.ly = m.y;
    m.x = e.clientX;
    m.y = e.clientY;
    m.on = true;
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    m.on = false;
    m.x = -1e9;
    m.y = -1e9;
    m.lx = -1e9;
    m.ly = -1e9;
  }, { passive: true });

  window.addEventListener("resize", fit);

  const vv = window.visualViewport;
  if (vv) {
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
  }

  fit();
  requestAnimationFrame(T);
})();