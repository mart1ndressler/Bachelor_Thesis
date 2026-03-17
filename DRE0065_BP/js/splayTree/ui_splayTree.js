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
  const historyBtn = document.getElementById('sManualHistoryBtn');

  if(box)
    box.classList.toggle('hidden', !show);
  if(btns)
    btns.classList.toggle('hidden', show);
  if(historyBtn)
    historyBtn.classList.toggle('hidden', show);
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

  const sc = document.getElementById('sStepCountDisplay');
  const pot = document.getElementById('sPotentialDisplay');

  if(sc)
    sc.innerText = `${L.stepCount}: ${sStepCount}`;
  if(pot)
    pot.innerHTML = `${L.potential}: <span class="potentialValue">${(Math.round(sPotential * 100) / 100)}</span>`;

  sRenderInitValuesBox();

  if(typeof sBwRebuildHistoryForLanguage === 'function')
    sBwRebuildHistoryForLanguage();

  const bwHistoryBtn = document.getElementById('sBwHistoryBtn');
  const bwStartBtn = document.getElementById('sBwStartBtn');
  const bwPrevBtn = document.getElementById('sBwPrevBtn');
  const bwPlayPauseBtn = document.getElementById('sBwPlayPauseBtn');
  const bwNextStepBtn = document.getElementById('sBwNextStepBtn');
  const bwEndJumpBtn = document.getElementById('sBwEndJumpBtn');
  const manualHistoryBtn = document.getElementById('sManualHistoryBtn');

  if(bwHistoryBtn)
    bwHistoryBtn.title = L.syntaxHistoryButtonTitle || 'Open history';
  if(bwStartBtn)
    bwStartBtn.title = L.bwGoStartTitle || 'Go to the first executed step';
  if(bwPrevBtn)
    bwPrevBtn.title = L.bwStepBackTitle || 'Go one step back';
  if(bwPlayPauseBtn)
    bwPlayPauseBtn.title = sBwPaused ? (L.bwPlayTitle || 'Play') : (L.bwPauseTitle || 'Pause');
  if(bwNextStepBtn)
    bwNextStepBtn.title = L.bwStepForwardTitle || 'Go one step forward';
  if(bwEndJumpBtn)
    bwEndJumpBtn.title = L.bwGoEndTitle || 'Jump to the final step';
  if(manualHistoryBtn)
    manualHistoryBtn.title = L.syntaxHistoryButtonTitle || 'Open history';

  if(document.getElementById('sBwPanelTitle') && typeof sBwRenderInfo === 'function')
    sBwRenderInfo();

  if(typeof sSynRebuildHistoryForLanguage === 'function')
    sSynRebuildHistoryForLanguage();

  const prevBtn = document.getElementById('sSynPrevBtn');
  const forwardBtn = document.getElementById('sSynForwardBtn');
  const historyBtn = document.getElementById('sSynHistoryBtn');

  if(prevBtn)
    prevBtn.title = L.syntaxPrevStepTitle || 'Previous step';
  if(forwardBtn)
    forwardBtn.title = L.syntaxNextStepTitle || 'Next step';
  if(historyBtn)
    historyBtn.title = L.syntaxHistoryButtonTitle || 'Open history';

  if(document.getElementById('sSynPanelTitle') && typeof sSynRenderInfo === 'function')
    sSynRenderInfo();

  sRenderManualInfoPanel();
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

function sGetManualInfoEntry(){
  if(!Array.isArray(sManualHistory))
    return null;
  if(sManualInfoIndex < 0 || sManualInfoIndex >= sManualHistory.length)
    return null;

  return sManualHistory[sManualInfoIndex];
}

function sToggleManualInfoPanel(){
  if(!sGetManualInfoEntry())
    return;

  sManualInfoOpen = !sManualInfoOpen;
  sRenderManualInfoPanel();
}

function sRenderManualInfoPanel(){
  const dock = document.getElementById('sManualInfoDock');
  const titleEl = document.getElementById('sManualInfoTitle');
  const detailEl = document.getElementById('sManualInfoDetail');

  if(!dock || !titleEl || !detailEl)
    return;

  const entry = sGetManualInfoEntry();
  if(!entry){
    dock.classList.add('hidden');
    dock.classList.remove('open');
    return;
  }

  const L = sLang();
  const step = entry.step || {};
  const result = entry.result || {};

  dock.classList.remove('hidden');
  dock.classList.toggle('open', !!sManualInfoOpen);

  titleEl.textContent = sManualHistoryTitle(step, sManualInfoIndex, L);
  detailEl.innerHTML = sBuildExecutedSplayDetail(step, result, L);
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

          <button id="sManualHistoryBtn" class="syntax-history-btn hidden" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
            <i class="fas fa-info-circle"></i>
          </button>

          <div class="s-init-values hidden" id="sInitValuesBox"></div>
          <div id="splay_buttons" class="hidden">
            <button id="sInsertBtn" class="btn btn-primary btn-lg">${L.splayInsertButton}</button>
            <button id="sSearchBtn" class="btn btn-primary btn-lg">${L.splaySearchButton}</button>
            <button id="sDeleteBtn" class="btn btn-primary btn-lg">${L.splayDeleteButton}</button>
          </div>
        </div>
      </div>

      <div id="sManualInfoDock" class="manual-step-dock hidden">
        <div class="manual-step-shell">
          <button type="button" id="sManualInfoTab" class="manual-step-tab">
            <i class="fas fa-angle-double-left"></i>
          </button>

          <div class="manual-step-panel">
            <div class="manual-step-panel-scroll">
              <div class="info-panel-title" id="sManualInfoTitle"></div>
              <div class="info-step-detail" id="sManualInfoDetail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('sInsertBtn').onclick = sInsertPrompt;
  document.getElementById('sSearchBtn').onclick = sSearchPrompt;
  document.getElementById('sDeleteBtn').onclick = sDeletePrompt;

  const historyBtn = document.getElementById('sManualHistoryBtn');
  if(historyBtn)
    historyBtn.onclick = sManualOpenHistoryModal;

  const infoTab = document.getElementById('sManualInfoTab');
  if(infoTab)
    infoTab.onclick = sToggleManualInfoPanel;

  refreshSplayUIForLanguage();
  sShowBuildPanel(false);
  sRenderInitValuesBox();
  sRenderManualInfoPanel();
}

function sCollectNodes(root){
  const nodes = [];

  function dfs(n){
    if(!n) 
      return;

    dfs(n.left);
    nodes.push(n);
    dfs(n.right);
  }

  dfs(root);
  return nodes;
}

function sGetTreeVisualParams(nodeCount){
  let nodeSize = 44, fontSize = 18, pad = 70;

  if(nodeCount >= 8){
    nodeSize = 38;
    fontSize = 16;
    pad = 56;
  }
  if(nodeCount >= 12){
    nodeSize = 34;
    fontSize = 15;
    pad = 48;
  }
  if(nodeCount >= 16){
    nodeSize = 30;
    fontSize = 13;
    pad = 40;
  }
  if(nodeCount >= 24){
    nodeSize = 25;
    fontSize = 11;
    pad = 30;
  }
  if(nodeCount >= 32){
    nodeSize = 21;
    fontSize = 10;
    pad = 24;
  }
  if(nodeCount >= 48){
    nodeSize = 17;
    fontSize = 9;
    pad = 18;
  }
  if(nodeCount >= 64){
    nodeSize = 14;
    fontSize = 8;
    pad = 12;
  }

  return {nodeSize, nodeRadius: nodeSize / 2, fontSize, pad};
}

function sAssignDepth(root, depth, Y){
  if(!root)
    return;

  root.y = depth * Y;
  sAssignDepth(root.left, depth + 1, Y);
  sAssignDepth(root.right, depth + 1, Y);
}

function sScanMaxXY(root, acc){
  if(!root)
    return;

  if(root.x > acc.maxX)
    acc.maxX = root.x;
  if(root.y > acc.maxY)
    acc.maxY = root.y;

  sScanMaxXY(root.left, acc);
  sScanMaxXY(root.right, acc);
}

function sApplyScale(root, scale){
  if(!root)
    return;

  root.x *= scale;
  root.y *= scale;

  sApplyScale(root.left, scale);
  sApplyScale(root.right, scale);
}

function sBBox(root, box){
  if(!root)
    return;

  box.minBx = Math.min(box.minBx, root.x);
  box.maxBx = Math.max(box.maxBx, root.x);
  box.minBy = Math.min(box.minBy, root.y);
  box.maxBy = Math.max(box.maxBy, root.y);

  sBBox(root.left, box);
  sBBox(root.right, box);
}

function sShift(root, dx, dy){
  if(!root)
    return;

  root.x += dx;
  root.y += dy;

  sShift(root.left, dx, dy);
  sShift(root.right, dx, dy);
}

function sAssignLayout(root, areaW, areaH, visual){
  const nodesIn = sCollectNodes(root);
  const X = 70;
  const Y = 85;
  const pad = visual?.pad ?? 70;

  nodesIn.forEach((n, i) => {n.x = (i + 1) * X;});
  sAssignDepth(root, 0, Y);

  const acc = {maxX: 1, maxY: 1};
  sScanMaxXY(root, acc);

  const scaleW = (areaW - pad * 2) / (acc.maxX || 1);
  const scaleH = (areaH - pad * 2) / ((acc.maxY + 1) || 1);
  const scale = Math.min(1.0, scaleW, scaleH);
  sApplyScale(root, scale);

  const OFF = 1e9;
  const box = {minBx: OFF, maxBx: -OFF, minBy: OFF, maxBy: -OFF};
  sBBox(root, box);

  const bw = box.maxBx - box.minBx;
  const bh = box.maxBy - box.minBy;
  const dx = (areaW - bw) / 2 - box.minBx;
  const dy = (areaH - bh) / 2 - box.minBy;
  sShift(root, dx, dy);
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
  function dfs(n){
    if(!n)
      return;

    if(n.left)
      edges.push([n.id, n.left.id]);
    if(n.right)
      edges.push([n.id, n.right.id]);

    dfs(n.left);
    dfs(n.right);
  }

  dfs(sRoot);
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

    const x1 = (ar.left + ar.width / 2) - rect.left;
    const y1 = (ar.top + ar.height / 2) - rect.top;
    const x2 = (br.left + br.width / 2) - rect.left;
    const y2 = (br.top + br.height / 2) - rect.top;

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
  function tick(now){
    if(token !== sEdgeAnimToken)
      return;

    sDrawEdgesFromDom();
    if(now - start < ms)
      sEdgeAnimRaf = requestAnimationFrame(tick);
  }

  sEdgeAnimRaf = requestAnimationFrame(tick);
}

function sRenderTree({activeId = null, pathIds = [], animate = true} = {}){
  const area = document.getElementById('treeArea');
  const svg = document.getElementById('treeSvg');
  const layer = document.getElementById('treeNodesLayer');

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

  const nodes = sCollectNodes(sRoot);
  const visual = sGetTreeVisualParams(nodes.length);

  sAssignLayout(sRoot, W, H, visual);
  sComputePotential();
  sUpdateCounters();

  const alive = new Set(nodes.map(n => n.id));

  for(const n of nodes){
    let el = sNodeEls.get(n.id);

    if(!el){
      el = document.createElement('div');
      el.dataset.id = String(n.id);
      el.className = 'tree-node';

      layer.appendChild(el);
      sNodeEls.set(n.id, el);
    }

    el.textContent = String(n.key);
    el.className = 'tree-node' + (n === sRoot ? ' is-root' : '') + (pathIds.includes(n.id) ? ' is-path' : '') + (n.id === activeId ? ' is-active' : '');

    el.style.width = visual.nodeSize + 'px';
    el.style.height = visual.nodeSize + 'px';
    el.style.fontSize = visual.fontSize + 'px';

    el.style.left = (n.x - visual.nodeRadius) + 'px';
    el.style.top = (n.y - visual.nodeRadius) + 'px';
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