function sRenderInitValuesBox(){
  const box = document.getElementById('sInitValuesBox');
  if(!box)
    return;

  if(!Array.isArray(sInitValues) || sInitValues.length === 0){
    box.innerHTML = '';
    return;
  }

  const L = sLang();
  const label = (sInitSource === 'random') ? (L.splayGeneratedValuesLabel || 'Generated values:') : (L.splayInitialValuesLabel || 'Initial values:');

  const chips = sInitValues.map((v, i) => {
    let cls = 'v';

    if(sInitBuildIndex >= 0 && i < sInitBuildIndex)
      cls += ' done';
    if(sInitBuildIndex === i)
      cls += ' cur';

    return `<span class="${cls}">${v}</span>`;
  }).join('');

  box.innerHTML = `<span class="lbl">${label}</span>${chips}`;
}

function sShowBuildPanel(show){
  const box = document.getElementById('sInitValuesBox');
  const btns = document.getElementById('splay_buttons');

  if(box)
    box.classList.toggle('hidden', !show);
  if(btns)
    btns.classList.toggle('hidden', show);
}

function refreshSplayUIForLanguage(){
  const L = sLang();
  const ins = document.getElementById('sInsertBtn');
  const sea = document.getElementById('sSearchBtn');
  const del = document.getElementById('sDeleteBtn');

  if(ins)
    ins.textContent = L.splayInsertButton || 'Insert';
  if(sea)
    sea.textContent = L.splaySearchButton || 'Search';
  if(del)
    del.textContent = L.splayDeleteButton || 'Delete';

  const sc  = document.getElementById('sStepCountDisplay');
  const pot = document.getElementById('sPotentialDisplay');

  if(sc)
    sc.innerText = `${L.stepCount}: ${sStepCount}`;
  if(pot)
    pot.innerHTML = `${L.potential}: <span class="potentialValue">${(Math.round(sPotential * 100) / 100)}</span>`;

  sRenderInitValuesBox();

  if(document.getElementById('sBwPanelTitle'))
    sBwRenderInfo();
  if(document.getElementById('sSynPanelTitle'))
    sSynRenderInfo();
}

function sUpdateCounters(){
  const L = sLang();
  const sc = document.getElementById('sStepCountDisplay');
  const pot = document.getElementById('sPotentialDisplay');

  if(sc)
    sc.innerText = `${L.stepCount}: ${sStepCount}`;
  if(pot)
    pot.innerHTML = `${L.potential}: <span class="potentialValue">${(Math.round(sPotential * 100) / 100)}</span>`;
}

function sSetButtonsEnabled(enabled){
  const a = document.getElementById('sInsertBtn');
  const b = document.getElementById('sSearchBtn');
  const c = document.getElementById('sDeleteBtn');

  if(a)
    a.disabled = !enabled;
  if(b)
    b.disabled = !enabled;
  if(c)
    c.disabled = !enabled;
}

function sRenderManualUI(){
  const L = sLang();
  const dc = document.getElementById('dynamicContent');
  if(!dc)
    return;

  dc.innerHTML = `
    <div class="run-panel">
        <div class="run-row no-wrap" id="mainContainer">
          <div class="treeArea" id="treeArea">
              <svg class="treeSvg" id="treeSvg"></svg>
              <div class="treeNodesLayer" id="treeNodesLayer"></div>
          </div>

          <div class="stack-controls controls-bottom">
              <div class="step-count" id="sStepCountDisplay">${L.stepCount}: ${sStepCount}</div>
              <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sPotential}</span></div>

              <div class="s-init-values hidden" id="sInitValuesBox"></div>

              <div id="splay_buttons" class="hidden">
                <button id="sInsertBtn" class="btn btn-primary btn-lg">${L.splayInsertButton}</button>
                <button id="sSearchBtn" class="btn btn-primary btn-lg">${L.splaySearchButton}</button>
                <button id="sDeleteBtn" class="btn btn-primary btn-lg">${L.splayDeleteButton}</button>
              </div>
          </div>
        </div>
    </div>
    `;

  document.getElementById('sInsertBtn').onclick = sInsertPrompt;
  document.getElementById('sSearchBtn').onclick = sSearchPrompt;
  document.getElementById('sDeleteBtn').onclick = sDeletePrompt;

  refreshSplayUIForLanguage();
  sShowBuildPanel(false);
  sRenderInitValuesBox();
}

function sCollectNodes(root){
  const nodes = [];
  (function dfs(n){
    if(!n)
      return;

    dfs(n.left);
    nodes.push(n);
    dfs(n.right);
  })(root);

  return nodes;
}

function sAssignLayout(root, areaW, areaH){
  const nodesIn = sCollectNodes(root);
  const X = 70;
  const Y = 85;

  nodesIn.forEach((n, i) => {n.x = (i + 1) * X;});
  (function setDepth(n, d){
    if(!n)
      return;

    n.y = d * Y;
    setDepth(n.left, d + 1);
    setDepth(n.right, d + 1);
  })(root, 0);

  let maxX = 1, maxY = 1;
  (function scan(n){
    if(!n)
      return;

    if(n.x > maxX)
      maxX = n.x;
    if(n.y > maxY)
      maxY = n.y;

    scan(n.left);
    scan(n.right);
  })(root);

  const pad = 70;
  const scaleW = (areaW - pad*2) / (maxX || 1);
  const scaleH = (areaH - pad*2) / ((maxY + 1) || 1);
  const scale = Math.min(1.0, scaleW, scaleH);

  (function applyScale(n){
    if(!n)
      return;

    n.x = n.x * scale;
    n.y = n.y * scale;

    applyScale(n.left);
    applyScale(n.right);
  })(root);

  let minBx = 1e9, maxBx = -1e9, minBy = 1e9, maxBy = -1e9;
  (function bbox(n){
    if(!n)
      return;

    minBx = Math.min(minBx, n.x);
    maxBx = Math.max(maxBx, n.x);
    minBy = Math.min(minBy, n.y);
    maxBy = Math.max(maxBy, n.y);

    bbox(n.left);
    bbox(n.right);
  })(root);

  const bw = maxBx - minBx;
  const bh = maxBy - minBy;
  const dx = (areaW - bw)/2 - minBx;
  const dy = (areaH - bh)/2 - minBy;

  (function shift(n){
    if(!n)
      return;

    n.x += dx;
    n.y += dy;

    shift(n.left);
    shift(n.right);
  })(root);
}

function sComputePotential(){
  if(!sRoot){
    sPotential = 0;
    return;
  }

  let phi = 0;
  function post(n){
    if(!n)
      return 0;

    const ls = post(n.left);
    const rs = post(n.right);
    const sz = 1 + ls + rs;

    phi += Math.log2(sz);
    return sz;
  }
  
  post(sRoot);
  sPotential = phi;
}

function sBuildEdges(){
  const edges = [];
  (function dfs(n){
    if(!n)
      return;

    if(n.left)
      edges.push([n.id, n.left.id]);
    if(n.right)
      edges.push([n.id, n.right.id]);

    dfs(n.left);
    dfs(n.right);
  })(sRoot);
  return edges;
}

function sDrawEdgesFromDom(){
  const area = document.getElementById('treeArea');
  const svg = document.getElementById('treeSvg');
  if(!area || !svg)
    return;

  const W = area.clientWidth;
  const H = area.clientHeight;
  const rect = area.getBoundingClientRect();

  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = '';

  const edges = sBuildEdges();
  for(const [aId, bId] of edges){
    const aEl = sNodeEls.get(aId);
    const bEl = sNodeEls.get(bId);

    if(!aEl || !bEl)
      continue;

    const ar = aEl.getBoundingClientRect();
    const br = bEl.getBoundingClientRect();

    const x1 = (ar.left + ar.width/2) - rect.left;
    const y1 = (ar.top  + ar.height/2) - rect.top;
    const x2 = (br.left + br.width/2) - rect.left;
    const y2 = (br.top  + br.height/2) - rect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  }
}

function sStartEdgeFollow(ms = S_MOVE_MS){
  const token = ++sEdgeAnimToken;
  cancelAnimationFrame(sEdgeAnimRaf);

  const start = performance.now();
  const tick = (now) => {
    if(token !== sEdgeAnimToken)
      return;

    sDrawEdgesFromDom();
    if(now - start < ms)
      sEdgeAnimRaf = requestAnimationFrame(tick);
  };

  sEdgeAnimRaf = requestAnimationFrame(tick);
}

function sRenderTree({activeId = null, pathIds = [], animate = true } = {}){
  const area = document.getElementById('treeArea');
  const svg = document.getElementById('treeSvg');
  const layer= document.getElementById('treeNodesLayer');

  if(!area || !svg || !layer)
    return;

  const W = area.clientWidth;
  const H = area.clientHeight;

  if(!sRoot){
    svg.innerHTML = '';
    layer.innerHTML = '';
    sNodeEls.clear();
    sPotential = 0;
    sUpdateCounters();
    return;
  }

  sAssignLayout(sRoot, W, H);
  sComputePotential();
  sUpdateCounters();

  const nodes = [];
  (function dfs(n){
    if(!n)
      return;

    nodes.push(n);
    dfs(n.left);
    dfs(n.right);
  })(sRoot);

  const alive = new Set(nodes.map(n => n.id));
  for(const n of nodes){
    let el = sNodeEls.get(n.id);
    if(!el){
      el = document.createElement('div');

      el.dataset.id = String(n.id);
      el.className = 'tree-node';
      el.textContent = String(n.key);

      el.style.left = (n.x - S_NODE_R) + 'px';
      el.style.top  = (n.y - S_NODE_R) + 'px';

      layer.appendChild(el);
      sNodeEls.set(n.id, el);
    }
    else
      el.textContent = String(n.key);

    el.className = 'tree-node' + (n === sRoot ? ' is-root' : '') + (pathIds.includes(n.id) ? ' is-path' : '') + (n.id === activeId ? ' is-active' : '');
    el.style.left = (n.x - S_NODE_R) + 'px';
    el.style.top = (n.y - S_NODE_R) + 'px';
  }

  for(const [id, el] of sNodeEls){
    if(!alive.has(id)){
      el.remove();
      sNodeEls.delete(id);
    }
  }

  sDrawEdgesFromDom();
  if(animate) 
    sStartEdgeFollow(S_MOVE_MS);
}

function sAfterOperation(activeId){
  sRenderTree({ activeId });
  setTimeout(() => {
    sBusy = false;
    sSetButtonsEnabled(true);
  }, 380);
}