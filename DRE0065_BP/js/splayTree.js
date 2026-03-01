let sRoot = null;
let sNextId = 1;
let sStepCount = 0;
let sPotential = 0;
let sBusy = false;
let sLastMessageKey = null;
let sLastMessageParams = null;
let sInitValues = [];
let sInitSource = null;
let sInitBuildIndex = -1;
let sBwMode = null;
let sBwSteps = [];
let sBwIndex = 0;
let sBwRunToken = 0;
let sBwResults = [];
let sSynSteps = [];
let sSynCursor = 0;
let sSynResults = [];
let sSynRunToken = 0;

const S_NODE_R = 22;
const S_MOVE_MS = 650;
const sNodeEls = new Map();
let sEdgeAnimRaf = 0;
let sEdgeAnimToken = 0;

function sLang(){
  return translations[localStorage.getItem('language') || 'en'];
}

function sRenderInitValuesBox(){
  const box = document.getElementById('sInitValuesBox');
  if(!box) return;

  if(!Array.isArray(sInitValues) || sInitValues.length === 0)
  {
    box.innerHTML = '';
    return;
  }

  const L = sLang();
  const label = (sInitSource === 'random')
    ? (L.splayGeneratedValuesLabel || 'Generated values:')
    : (L.splayInitialValuesLabel || 'Initial values:');

  const chips = sInitValues.map((v, i) => {
    let cls = 'v';
    if(sInitBuildIndex >= 0 && i < sInitBuildIndex) cls += ' done';
    if(sInitBuildIndex === i) cls += ' cur';
    return `<span class="${cls}">${v}</span>`;
  }).join('');

  box.innerHTML = `<span class="lbl">${label}</span>${chips}`;
}

function sShowBuildPanel(show){
  const box = document.getElementById('sInitValuesBox');
  const btns = document.getElementById('splay_buttons');

  if(box) box.classList.toggle('hidden', !show);
  if(btns) btns.classList.toggle('hidden', show);
}

function refreshSplayUIForLanguage(){
  const L = sLang();
  const ins = document.getElementById('sInsertBtn');
  const sea = document.getElementById('sSearchBtn');
  const del = document.getElementById('sDeleteBtn');

  if(ins) ins.textContent = L.splayInsertButton || 'Insert';
  if(sea) sea.textContent = L.splaySearchButton || 'Search';
  if(del) del.textContent = L.splayDeleteButton || 'Delete';

  const sc  = document.getElementById('sStepCountDisplay');
  const pot = document.getElementById('sPotentialDisplay');

  if(sc) sc.innerText = `${L.stepCount}: ${sStepCount}`;
  if(pot) pot.innerHTML = `${L.potential}: <span class="potentialValue">${(Math.round(sPotential * 100) / 100)}</span>`;

  sRenderInitValuesBox();

  if(document.getElementById('sBwPanelTitle'))
  sBwRenderInfo();

  if(document.getElementById('sSynPanelTitle'))
    sSynRenderInfo();
}

function openSplayManual(){
  sResetAll();
  openSplayInitModal({ showUIAfterOk: true });
}

function openSplayRandom(){
  sResetAll();
  openSplayRandomParamsModal({ showUIAfterOk: true });
}

function openSplayBestWorst(){
  activeModalContext = 'splayBestWorst';
  if(typeof changeLanguage === 'function')
    changeLanguage(localStorage.getItem('language') || 'en');

  const bestLabel = document.getElementById('bestCaseButtonLabel');
  const worstLabel = document.getElementById('worstCaseButtonLabel');
  const bestBtn = bestLabel ? bestLabel.closest('button') : null;
  const worstBtn = worstLabel ? worstLabel.closest('button') : null;

  if(bestBtn){
    bestBtn.onclick = () => {
      $('#bestWorstModal').modal('hide');
      sStartBestWorst('best');
    };
  }
  if(worstBtn){
    worstBtn.onclick = () => {
      $('#bestWorstModal').modal('hide');
      sStartBestWorst('worst');
    };
  }

  $('#bestWorstModal').modal('show');
}

function openSplaySyntax(){
  activeModalContext = 'splaySyntax';
  if(typeof changeLanguage === 'function')
    changeLanguage(localStorage.getItem('language') || 'en');

  const input = document.getElementById('syntaxInput');
  const btn = document.getElementById('startSyntaxBtn');

  if(input){
    input.value = '';
  }

  if(btn){
    btn.onclick = () => sSubmitSplaySyntax();
  }

  $('#syntaxModal').modal('show');
}

function sParseCsvPositiveInts(raw){
  return (String(raw || ''))
    .split(',')
    .map(x => x.trim())
    .filter(x => x.length > 0)
    .map(x => Number(x))
    .filter(n => Number.isInteger(n) && n > 0);
}

function sNewNode(key){
  return {
    id: sNextId++,
    key,
    left: null,
    right: null,
    parent: null,
    x: 0,
    y: 0
  };
}

function openSplayInitModal({ showUIAfterOk = false } = {}){
  const L = sLang();

  openActionInputModal({
    title: L.splayInitTitle || "Initial values",
    label: L.splayInitLabel || "Enter initial values (comma separated):",
    placeholder: L.splayInitPlaceholder || "1, 2, 3, 4",
    type: "text",
    min: null,
    onOk: (raw) => {
      const values = sParseCsvPositiveInts(raw);

      if(values.length === 0){
        _setActionInputError(L.splayInitInvalid || "Invalid input.");
        return false;
      }

      if(showUIAfterOk){
        sRenderManualUI();
      }

      sBuildInitial(values, { source: 'manual' });
      return true;
    }
  });
}

function openSplayRandomParamsModal({ showUIAfterOk = false } = {})
{
  activeModalContext = 'splayRandom';
  if(typeof changeLanguage === 'function')
    changeLanguage(localStorage.getItem('language') || 'en');

  const minEl = document.getElementById('rangeMin');
  const maxEl = document.getElementById('rangeMax');
  const cntEl = document.getElementById('count');
  
  if(minEl){ minEl.value = ''; minEl.placeholder = '1'; }
  if(maxEl){ maxEl.value = ''; maxEl.placeholder = '50'; }
  if(cntEl){ cntEl.value = ''; cntEl.placeholder = '20'; }

  const btn = document.getElementById('generateBtn');
  if(btn){
    btn.onclick = () => submitSplayRandomParams({ showUIAfterOk });
  }

  $('#randomParamsModal').modal('show');
}

function submitSplayRandomParams({ showUIAfterOk = false } = {})
{
  const L = sLang();

  const min = parseInt(document.getElementById('rangeMin')?.value, 10);
  const max = parseInt(document.getElementById('rangeMax')?.value, 10);
  const count = parseInt(document.getElementById('count')?.value, 10);

  if(isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count <= 0){
    showAppMessage(L.invalidNumberAlert);
    return;
  }

  const rangeSize = (max - min + 1);
  if(count > rangeSize){
    showAppMessage(L.splayRandomTooManyAlert || L.invalidNumberAlert);
    return;
  }

  const values = [];
  const used = new Set();
  while(values.length < count){
    const v = Math.floor(Math.random() * rangeSize) + min;
    if(!used.has(v)){
      used.add(v);
      values.push(v);
    }
  }

  $('#randomParamsModal').modal('hide');
  document.getElementById('randomParamsForm')?.reset();

  if(showUIAfterOk){
    sRenderManualUI();
  }

  sBuildInitial(values, { source: 'random' });
}

function sResetAll(){
  sRoot = null;
  sNextId = 1;
  sStepCount = 0;
  sPotential = 0;
  sBusy = false;
  sLastMessageKey = null;
  sLastMessageParams = null;
  sInitValues = [];
  sInitSource = null;
  sInitBuildIndex = -1;
  sBwMode = null;
  sBwSteps = [];
  sBwIndex = 0;
  sBwRunToken += 1;
  sBwResults = [];
  sSynSteps = [];
  sSynCursor = 0;
  sSynResults = [];
  sSynRunToken += 1;
}

function sUpdateCounters(){
  const L = sLang();
  const sc = document.getElementById('sStepCountDisplay');
  const pot = document.getElementById('sPotentialDisplay');

  if(sc) sc.innerText = `${L.stepCount}: ${sStepCount}`;
  if(pot) pot.innerHTML = `${L.potential}: <span class="potentialValue">${(Math.round(sPotential * 100) / 100)}</span>`;
}

function sSetButtonsEnabled(enabled){
  const a = document.getElementById('sInsertBtn');
  const b = document.getElementById('sSearchBtn');
  const c = document.getElementById('sDeleteBtn');
  if(a) a.disabled = !enabled;
  if(b) b.disabled = !enabled;
  if(c) c.disabled = !enabled;
}

function sDelay(ms){ return new Promise(r => setTimeout(r, ms)); }

async function sAnimatePath(pathIds, stepMs = 260){
  for(let i = 0; i < pathIds.length; i++){
    sRenderTree({ activeId: pathIds[i], pathIds: pathIds.slice(0, i+1), animate: false });
    await sDelay(stepMs);
  }
}

async function sBuildInitial(values, { source = 'manual' } = {})
{
  if(sBusy) return;

  sBusy = true;
  sSetButtonsEnabled(false);

  sInitValues = [...values];
  sInitSource = source;
  sInitBuildIndex = -1;
  sRenderInitValuesBox();
  sShowBuildPanel(true);

  try{
    sRoot = null;
    sStepCount = 0;
    sPotential = 0;
    sRenderTree({ activeId: null, pathIds: [] });

    for(let i = 0; i < values.length; i++){
      sInitBuildIndex = i;
      sRenderInitValuesBox();

      await sInsertCore(values[i]);
      await sDelay(120);
    }

    sInitBuildIndex = values.length;
    sRenderInitValuesBox();
  }
  finally{
    sRenderTree({ activeId: sRoot ? sRoot.id : null, pathIds: [] });
    sShowBuildPanel(false);
    sBusy = false;
    sSetButtonsEnabled(true);
  }
}

function sRenderManualUI(){
  const L = sLang();
  const dc = document.getElementById('dynamicContent');
  if(!dc) return;

  dc.innerHTML = `
    <div class="run-panel">
        <div class="run-row" id="mainContainer">
          <div class="treeArea" id="treeArea">
              <svg class="treeSvg" id="treeSvg"></svg>
              <div class="treeNodesLayer" id="treeNodesLayer"></div>
          </div>

          <div class="stack-controls">
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

function sBwMakeSteps(mode){
  if(mode === 'best'){
    return [
      { op: 'insert', value: 10 },
      { op: 'insert', value: 5 },
      { op: 'insert', value: 15 },
      { op: 'delete', value: 15 },
    ];
  }

  return [
    { op: 'insert', value: 1 },
    { op: 'insert', value: 2 },
    { op: 'insert', value: 3 },
    { op: 'insert', value: 4 },
    { op: 'insert', value: 5 },
    { op: 'insert', value: 6 },
    { op: 'insert', value: 7 },
    { op: 'insert', value: 8 },
    { op: 'delete', value: 1 },
  ];
}

function sRenderBestWorstUI(){
  const L = sLang();
  const dc = document.getElementById('dynamicContent');
  if(!dc) return;

  dc.innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">

        <div class="treeArea" id="treeArea">
          <svg class="treeSvg" id="treeSvg"></svg>
          <div class="treeNodesLayer" id="treeNodesLayer"></div>
        </div>

        <div class="stack-controls">
          <div class="step-count" id="sStepCountDisplay">${L.stepCount}: ${sStepCount}</div>
          <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sPotential}</span></div>

          <div class="syntax-detailed-info" id="sBwPanel">
            <div class="info-panel-title" id="sBwPanelTitle"></div>
            <div class="info-panel-desc" id="sBwPanelDesc"></div>
            <div class="info-panel-sep"></div>
            <div class="info-step-title" id="sBwStepTitle"></div>
            <div class="info-step-detail" id="sBwStepDetail"></div>
          </div>
        </div>

      </div>
    </div>
  `;

  sRenderTree({ activeId: null, pathIds: [] });
  sUpdateCounters();
  sBwRenderInfo();
}

function sBwRenderInfo(){
  const L = sLang();

  const t0 = document.getElementById('sBwPanelTitle');
  const d0 = document.getElementById('sBwPanelDesc');
  const t1 = document.getElementById('sBwStepTitle');
  const d1 = document.getElementById('sBwStepDetail');
  if(!t0 || !d0 || !t1 || !d1) return;

  if(sBwMode === 'best'){
    t0.textContent = L.splayBwBestTitle || (L.bestCase || 'Best Case');
    d0.innerHTML = L.splayBwBestDesc || '';
  }else{
    t0.textContent = L.splayBwWorstTitle || (L.worstCase || 'Worst Case');
    d0.innerHTML = L.splayBwWorstDesc || '';
  }

  if(sBwIndex >= sBwSteps.length){
    t1.textContent = L.splayBwDoneTitle || (L.endButton || 'End');
    d1.innerHTML = L.splayBwDoneDetail || '';
    return;
  }

  const step = sBwSteps[sBwIndex];
  const total = sBwSteps.length;
  const prefix = `${sBwIndex + 1}/${total}: `;

  if(step.op === 'insert'){
    t1.textContent = prefix + (L.splayBwStepInsertTitle || 'Insert {value}').replace('{value}', String(step.value));
    d1.textContent = (L.splayBwStepInsertDetail || '').replace('{value}', String(step.value));
  }else if(step.op === 'search'){
    t1.textContent = prefix + (L.splayBwStepSearchTitle || 'Search {value}').replace('{value}', String(step.value));
    d1.textContent = (L.splayBwStepSearchDetail || '').replace('{value}', String(step.value));
  }else{
    t1.textContent = prefix + (L.splayBwStepDeleteTitle || 'Delete {value}').replace('{value}', String(step.value));
    d1.textContent = (L.splayBwStepDeleteDetail || '').replace('{value}', String(step.value));
  }
}

async function sBwRunScenario(){
  const myToken = ++sBwRunToken;

  sBusy = true;

  try{
    sRoot = null;
    sStepCount = 0;
    sPotential = 0;
    sRenderTree({ activeId: null, pathIds: [] });

    for(let i = 0; i < sBwSteps.length; i++){
      if(myToken !== sBwRunToken) return;

      sBwIndex = i;
      sBwRenderInfo();

      await sDelay(220);
      if(myToken !== sBwRunToken) return;

      const step = sBwSteps[i];

      if(step.op === 'insert'){
        await sInsertCore(step.value);
      }else if(step.op === 'search'){
        await sSearchCore(step.value);
      }else{
        await sDeleteCore(step.value);
      }

      await sDelay(220);
    }

    if(myToken !== sBwRunToken) return;
    sBwIndex = sBwSteps.length;
    sBwRenderInfo();

    const L = sLang();
    const endText = L.endOfExample || 'End of commands.';

    showAppMessage(endText, {
      title: L.splayBwDoneTitle || (L.endButton || 'End'),
      onClose: () => {
        sResetAll();
        changeContent('splayTree');
      }
    });
  }
  finally{
    if(myToken === sBwRunToken){
      sBusy = false;
    }
  }
}

function sStartBestWorst(mode){
  sResetAll();

  sBwMode = mode;
  sBwSteps = sBwMakeSteps(mode);
  sBwIndex = 0;

  sRenderBestWorstUI();
  sBwRunScenario();
}

function sParseSplaySyntax(raw){
  const s = String(raw || '').trim();
  if(!s) return [];

  const steps = [];
  const parts = s.split(/\s+/).filter(Boolean);

  for(const token of parts){
    const m = token.match(/^([a-zA-Z]+)\(([^)]*)\)$/);
    if(!m) return null;

    const opRaw = m[1].toLowerCase();
    const argsRaw = m[2].trim();

    let op = null;
    if(opRaw === 'insert' || opRaw === 'ins' || opRaw === 'i') op = 'insert';
    if(opRaw === 'search' || opRaw === 'find' || opRaw === 's') op = 'search';
    if(opRaw === 'delete' || opRaw === 'del' || opRaw === 'd') op = 'delete';
    if(!op) return null;

    const nums = argsRaw
      .split(',')
      .map(x => x.trim())
      .filter(x => x.length > 0)
      .map(x => Number(x))
      .filter(n => Number.isInteger(n) && n > 0);

    if(nums.length === 0) return null;

    if(op === 'insert'){
      for(const v of nums) steps.push({ op, value: v });
    }else{
      steps.push({ op, value: nums[0] });
    }
  }

  return steps;
}

function sSubmitSplaySyntax(){
  const L = sLang();
  const raw = (document.getElementById('syntaxInput')?.value || '').trim();
  const steps = sParseSplaySyntax(raw);

  if(!steps || steps.length === 0){
    showAppMessage(L.splaySyntaxInvalidAlert || (L.queueSyntaxInvalidAlert || 'Invalid syntax.'));
    return;
  }

  $('#syntaxModal').modal('hide');

  sStartSplaySyntax(steps);
}

function sRenderSplaySyntaxUI(){
  const L = sLang();
  const dc = document.getElementById('dynamicContent');
  if(!dc) return;

  dc.innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">

        <div class="treeArea" id="treeArea">
          <svg class="treeSvg" id="treeSvg"></svg>
          <div class="treeNodesLayer" id="treeNodesLayer"></div>
        </div>

        <div class="stack-controls">
          <div class="step-count" id="sStepCountDisplay">${L.stepCount}: ${sStepCount}</div>
          <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sPotential}</span></div>

          <div class="syntax-detailed-info" id="sSynPanel">
            <div class="info-panel-title" id="sSynPanelTitle"></div>
            <div class="info-panel-desc" id="sSynPanelDesc"></div>
            <div class="info-panel-sep"></div>
            <div class="info-step-title" id="sSynStepTitle"></div>
            <div class="info-step-detail" id="sSynStepDetail"></div>
          </div>

          <button id="sSynNextBtn" class="btn btn-primary btn-lg">${L.nextButton || 'Next'}</button>
        </div>

      </div>
    </div>
  `;

  const btn = document.getElementById('sSynNextBtn');
  if(btn) btn.onclick = sSynNextStep;

  sRenderTree({ activeId: null, pathIds: [] });
  sUpdateCounters();
  sSynRenderInfo();
}

function sFmt2(x){
  const n = Number(x);
  if(!Number.isFinite(n)) return '0';
  return String(Math.round(n * 100) / 100);
}

function sFill(tpl, vars){
  let out = String(tpl || '');
  for(const [k, v] of Object.entries(vars || {})){
    out = out.split(`{${k}}`).join(String(v));
  }
  return out;
}

function sSynRenderInfo(){
  const L = sLang();

  const t0 = document.getElementById('sSynPanelTitle');
  const d0 = document.getElementById('sSynPanelDesc');
  const t1 = document.getElementById('sSynStepTitle');
  const d1 = document.getElementById('sSynStepDetail');
  const btn = document.getElementById('sSynNextBtn');
  if(!t0 || !d0 || !t1 || !d1 || !btn) return;

  t0.textContent = L.splaySynPanelTitle || 'SYNTAX MODE';
  d0.innerHTML = L.splaySynPanelDesc || '';

  const total = sSynSteps.length;

  if(sSynCursor >= total){
    t1.textContent = L.splayBwDoneTitle || (L.endButton || 'End');
    d1.innerHTML = L.splayBwDoneDetail || '';
    btn.disabled = true;
    return;
  }

  const nextStep = sSynSteps[sSynCursor];

  const nextTitle =
    (nextStep.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') :
     nextStep.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') :
                                (L.splayBwStepDeleteTitle || 'Delete {value}'))
    .replace('{value}', String(nextStep.value));

  let html = '';

  if(sSynCursor > 0){
    const lastIdx = sSynCursor - 1;
    const lastStep = sSynSteps[lastIdx];
    const r = sSynResults[lastIdx];

    const lastTitle =
      (lastStep.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') :
       lastStep.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') :
                                  (L.splayBwStepDeleteTitle || 'Delete {value}'))
      .replace('{value}', String(lastStep.value));

    const head = `<div><strong>${lastIdx + 1}/${total}:</strong> ${lastTitle}</div>`;

    const metricsTitle = `<div style="margin-top:10px;"><strong>${L.splayMetricsTitle || 'Measured metrics'}</strong></div>`;

    const mSteps = sFill(L.splayMetricsSteps || '', { deltaSteps: r.deltaSteps });
    const mPhi   = sFill(L.splayMetricsPhi || '', {
      phiBefore: sFmt2(r.phiBefore),
      phiAfter:  sFmt2(r.phiAfter),
      deltaPhi:  sFmt2(r.deltaPhi),
    });

    let extra = '';
    if(lastStep.op === 'search'){
      extra = `<div style="margin-top:6px;">${sFill(L.splayMetricsFound || 'Found: <strong>{found}</strong>', { found: r.found ? 'YES' : 'NO' })}</div>`;
    }
    if(lastStep.op === 'delete'){
      extra = `<div style="margin-top:6px;">${sFill(L.splayMetricsDeleted || 'Deleted: <strong>{deleted}</strong>', { deleted: r.deleted ? 'YES' : 'NO' })}</div>`;
    }

    const expl =
      (lastStep.op === 'insert' ? (L.splayBwStepInsertDetail || '') :
       lastStep.op === 'search' ? (L.splayBwStepSearchDetail || '') :
                                  (L.splayBwStepDeleteDetail || '')).replace('{value}', String(lastStep.value));

    html += head;
    html += `<div style="margin-top:8px;">${expl}</div>`;
    html += metricsTitle;
    html += `<div style="margin-top:6px;">${mSteps}</div>`;
    html += `<div style="margin-top:4px;">${mPhi}</div>`;
    html += extra;
    html += `<div class="info-panel-sep"></div>`;
    html += `<div><strong>Next:</strong> ${sSynCursor + 1}/${total}: ${nextTitle}</div>`;
  }else{
    html += `<div><strong>Next:</strong> 1/${total}: ${nextTitle}</div>`;
    html += `<div style="margin-top:8px;">Click <strong>${L.nextButton || 'Next'}</strong> to execute this command.</div>`;
  }

  t1.textContent = '';
  d1.innerHTML = html;

  btn.textContent = L.nextButton || 'Next';
  btn.disabled = false;
}

async function sSynNextStep(){
  const btn = document.getElementById('sSynNextBtn');
  if(!btn) return;
  if(sBusy) return;

  const total = sSynSteps.length;
  if(sSynCursor >= total){
    btn.disabled = true;
    return;
  }

  sBusy = true;
  btn.disabled = true;

  try{
    const beforeSteps = sStepCount;
    sComputePotential();
    const beforePhi = sPotential;

    const step = sSynSteps[sSynCursor];

    let found = null;
    let deleted = null;

    if(step.op === 'insert'){
      await sInsertCore(step.value);
    }else if(step.op === 'search'){
      const r = await sSearchCore(step.value);
      found = !!r.found;
    }else{
      const r = await sDeleteCore(step.value);
      deleted = !!r.deleted;
    }

    const afterSteps = sStepCount;
    const afterPhi = sPotential;

    sSynResults[sSynCursor] = {
      deltaSteps: afterSteps - beforeSteps,
      phiBefore: beforePhi,
      phiAfter: afterPhi,
      deltaPhi: afterPhi - beforePhi,
      found,
      deleted
    };

    sSynCursor += 1;
    sSynRenderInfo();

    if(sSynCursor >= total){
      const L = sLang();
      showAppMessage(L.endOfExample || 'End of commands.', {
        title: L.splayBwDoneTitle || (L.endButton || 'End'),
        onClose: () => {
          sResetAll();
          changeContent('splayTree');
        }
      });
    }
  }
  finally{
    sBusy = false;
    if(btn){
      btn.disabled = (sSynCursor >= total);
      btn.textContent = sLang().nextButton || 'Next';
    }
  }
}

function sStartSplaySyntax(steps){
  sResetAll();
  sSynSteps = steps;
  sSynCursor = 0;
  sSynResults = [];

  sRenderSplaySyntaxUI();
}

function sShowOp(title, detail){
  const t = document.getElementById('sOpTitle');
  const d = document.getElementById('sOpDetail');
  if(t) t.innerHTML = title || '';
  if(d) d.innerHTML = detail || '';
}

function sInsertPrompt(){
  const L = sLang();
  if(sBusy) return;

  openActionInputModal({
    title: L.splayInsertButton,
    label: L.enterValuePrompt,
    placeholder: "1",
    type: "number",
    min: 1,
    onOk: (raw) => {
      const x = Number(raw);
      if(Number.isInteger(x) && x > 0){
        sInsert(x);
        return true;
      }
      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function sSearchPrompt(){
  const L = sLang();
  if(sBusy) return;
  

  openActionInputModal({
    title: L.splaySearchButton,
    label: L.splaySearchPrompt || (L.splaySearchButton + " x:"),
    placeholder: "1",
    type: "number",
    min: 1,
    onOk: (raw) => {
      const x = Number(raw);
      if(Number.isInteger(x) && x > 0){
        sSearch(x);
        return true;
      }
      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function sDeletePrompt(){
  const L = sLang();
  if(sBusy) return;

  openActionInputModal({
    title: L.splayDeleteButton,
    label: L.splayDeletePrompt || (L.splayDeleteButton + " x:"),
    placeholder: "1",
    type: "number",
    min: 1,
    onOk: (raw) => {
      const x = Number(raw);
      if(Number.isInteger(x) && x > 0){
        sDelete(x);
        return true;
      }
      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

async function sInsertCore(key){
  if(!sRoot){
    const n = sNewNode(key);
    sRoot = n;
    sRenderTree({ activeId: n.id });
    await sDelay(S_MOVE_MS);
    return;
  }

  let z = sRoot;
  let p = null;
  const path = [];

  while(z){
    p = z;
    path.push(z.id);

    sStepCount += 1;
    if(key < z.key) z = z.left;
    else if(key > z.key) z = z.right;
    else{
      await sAnimatePath(path);
      await sSplayAnimated(p);

      const L = sLang();
      const msg = (L.splayAlreadyExistsText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} already exists.`, { title: L.splayAlreadyExistsTitle || 'Already exists' });

      return;
    }
  }

  await sAnimatePath(path);

  const n = sNewNode(key);
  n.parent = p;

  sStepCount += 1;
  if(key < p.key) p.left = n;
  else p.right = n;

  sRenderTree({ activeId: n.id, pathIds: path });
  await sDelay(S_MOVE_MS);

  await sSplayAnimated(n);
}

async function sSearchCore(key){
  if(!sRoot){
    sRenderTree();
    await sDelay(220);
    return { found: false };
  }

  let z = sRoot;
  let last = null;
  const path = [];

  while(z){
    last = z;
    path.push(z.id);

    sStepCount += 1;
    if(key === z.key) break;
    if(key < z.key) z = z.left;
    else z = z.right;
  }

  await sAnimatePath(path);

  const target = z ? z : last;
  if(target) await sSplayAnimated(target);

  return { found: !!z };
}

async function sDeleteCore(key){
  if(!sRoot){
    sRenderTree();
    await sDelay(220);
    return { deleted: false };
  }

  let z = sRoot;
  let last = null;
  const path = [];

  while(z){
    last = z;
    path.push(z.id);

    sStepCount += 1;
    if(key === z.key) break;
    if(key < z.key) z = z.left;
    else z = z.right;
  }

  await sAnimatePath(path);

  const target = z ? z : last;
  if(target) await sSplayAnimated(target);

  if(!sRoot || sRoot.key !== key){
    return { deleted: false };
  }

  const old = sRoot;
  const Lsub = old.left;
  const Rsub = old.right;

  old.left = old.right = old.parent = null;
  if(Lsub) Lsub.parent = null;
  if(Rsub) Rsub.parent = null;

  if(!Lsub){
    sRoot = Rsub;
    if(sRoot) sRoot.parent = null;
    sRenderTree({ activeId: sRoot ? sRoot.id : null });
    await sDelay(S_MOVE_MS);
    return { deleted: true };
  }

  sRoot = Lsub;
  let m = sRoot;
  while(m.right){
    sStepCount += 1;
    m = m.right;
  }

  await sSplayAnimated(m);
  sRoot.right = Rsub;
  if(Rsub) Rsub.parent = sRoot;

  sRenderTree({ activeId: sRoot.id });
  await sDelay(S_MOVE_MS);
  return { deleted: true };
}

async function sInsert(key){
  if(sBusy) return;
  sBusy = true;
  sSetButtonsEnabled(false);

  try{
    await sInsertCore(key);
  }
  finally{
    sRenderTree({ activeId: sRoot ? sRoot.id : null, pathIds: [] });
    sBusy = false;
    sSetButtonsEnabled(true);
  }
}

async function sSearch(key){
  if(sBusy) return;
  sBusy = true;
  sSetButtonsEnabled(false);

  try{
    if(!sRoot){
      const L = sLang();
      showAppMessage(L.splayEmptyTreeText || "Tree is empty.");
      sRenderTree();
      await sDelay(220);
      return;
    }

    const res = await sSearchCore(key);
    if(!res.found){
      const L = sLang();
      const msg = (L.splayNotFoundText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} not found.`, { title: L.splayNotFoundTitle || 'Not found' });
    }
  }
  finally{
    sRenderTree({ activeId: sRoot ? sRoot.id : null });
    sBusy = false;
    sSetButtonsEnabled(true);
  }
}

async function sDelete(key){
  if(sBusy) return;
  sBusy = true;
  sSetButtonsEnabled(false);

  try{
    if(!sRoot){
      const L = sLang();
      showAppMessage(L.splayEmptyTreeText || "Tree is empty.");
      sRenderTree();
      await sDelay(220);
      return;
    }

    const res = await sDeleteCore(key);
    if(!res.deleted){
      const L = sLang();
      const msg = (L.splayNotFoundText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} not found.`, { title: L.splayNotFoundTitle || 'Not found' });
      return;
    }
  }
  finally{
    sRenderTree({ activeId: sRoot ? sRoot.id : null });
    sBusy = false;
    sSetButtonsEnabled(true);
  }
}

function sRotateLeft(x){
  const y = x.right;
  if(!y) return;

  sStepCount += 1;

  x.right = y.left;
  if(y.left) y.left.parent = x;

  y.parent = x.parent;
  if(!x.parent) sRoot = y;
  else if(x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;

  y.left = x;
  x.parent = y;
}

function sRotateRight(x){
  const y = x.left;
  if(!y) return;

  sStepCount += 1;

  x.left = y.right;
  if(y.right) y.right.parent = x;

  y.parent = x.parent;
  if(!x.parent) sRoot = y;
  else if(x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;

  y.right = x;
  x.parent = y;
}

function sSplay(x){
  while(x.parent){
    const p = x.parent;
    const g = p.parent;

    if(!g){
      if(x === p.left) sRotateRight(p);
      else sRotateLeft(p);
    }else if(x === p.left && p === g.left){
      sRotateRight(g);
      sRotateRight(p);
    }else if(x === p.right && p === g.right){
      sRotateLeft(g);
      sRotateLeft(p);
    }else if(x === p.right && p === g.left){
      sRotateLeft(p);
      sRotateRight(g);
    }else{
      sRotateRight(p);
      sRotateLeft(g);
    }
  }
}

function sCollectNodes(root){
  const nodes = [];
  (function dfs(n){
    if(!n) return;
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

  nodesIn.forEach((n, i) => {
    n.x = (i + 1) * X;
  });

  (function setDepth(n, d){
    if(!n) return;
    n.y = d * Y;
    setDepth(n.left, d + 1);
    setDepth(n.right, d + 1);
  })(root, 0);

  let maxX = 1, maxY = 1;
  (function scan(n){
    if(!n) return;
    if(n.x > maxX) maxX = n.x;
    if(n.y > maxY) maxY = n.y;
    scan(n.left); scan(n.right);
  })(root);

  const pad = 70;
  const scaleW = (areaW - pad*2) / (maxX || 1);
  const scaleH = (areaH - pad*2) / ((maxY + 1) || 1);
  const scale = Math.min(1.0, scaleW, scaleH);

  (function applyScale(n){
    if(!n) return;
    n.x = n.x * scale;
    n.y = n.y * scale;
    applyScale(n.left);
    applyScale(n.right);
  })(root);

  let minBx = 1e9, maxBx = -1e9, minBy = 1e9, maxBy = -1e9;
  (function bbox(n){
    if(!n) return;
    minBx = Math.min(minBx, n.x);
    maxBx = Math.max(maxBx, n.x);
    minBy = Math.min(minBy, n.y);
    maxBy = Math.max(maxBy, n.y);
    bbox(n.left); bbox(n.right);
  })(root);

  const bw = maxBx - minBx;
  const bh = maxBy - minBy;

  const dx = (areaW - bw)/2 - minBx;
  const dy = (areaH - bh)/2 - minBy;

  (function shift(n){
    if(!n) return;
    n.x += dx;
    n.y += dy;
    shift(n.left);
    shift(n.right);
  })(root);
}

function sComputePotential()
{
  if(!sRoot)
  {
    sPotential = 0;
    return;
  }

  let phi = 0;
  function post(n)
  {
    if(!n) return 0;
    const ls = post(n.left);
    const rs = post(n.right);
    const sz = 1 + ls + rs;

    phi += Math.log2(sz);
    return sz;
  }
  
  post(sRoot);
  sPotential = phi;
}

function sBuildEdges()
{
  const edges = [];
  (function dfs(n){
    if(!n) return;
    if(n.left) edges.push([n.id, n.left.id]);
    if(n.right) edges.push([n.id, n.right.id]);
    dfs(n.left);
    dfs(n.right);
  })(sRoot);
  return edges;
}

function sDrawEdgesFromDom()
{
  const area = document.getElementById('treeArea');
  const svg  = document.getElementById('treeSvg');
  if(!area || !svg) return;

  const W = area.clientWidth;
  const H = area.clientHeight;
  const rect = area.getBoundingClientRect();

  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = '';

  const edges = sBuildEdges();
  for(const [aId, bId] of edges)
  {
    const aEl = sNodeEls.get(aId);
    const bEl = sNodeEls.get(bId);
    if(!aEl || !bEl) continue;

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

function sStartEdgeFollow(ms = S_MOVE_MS)
{
  const token = ++sEdgeAnimToken;
  cancelAnimationFrame(sEdgeAnimRaf);

  const start = performance.now();
  const tick = (now) => {
    if(token !== sEdgeAnimToken) return;
    sDrawEdgesFromDom();
    if(now - start < ms) sEdgeAnimRaf = requestAnimationFrame(tick);
  };

  sEdgeAnimRaf = requestAnimationFrame(tick);
}

function sRenderTree({ activeId = null, pathIds = [], animate = true } = {}){
  const area = document.getElementById('treeArea');
  const svg  = document.getElementById('treeSvg');
  const layer= document.getElementById('treeNodesLayer');
  if(!area || !svg || !layer) return;

  const W = area.clientWidth;
  const H = area.clientHeight;
  if(!sRoot)
  {
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
    if(!n) return;
    nodes.push(n);
    dfs(n.left);
    dfs(n.right);
  })(sRoot);

  const alive = new Set(nodes.map(n => n.id));
  for(const n of nodes)
  {
    let el = sNodeEls.get(n.id);
    if(!el)
    {
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

    el.className =
      'tree-node' +
      (n === sRoot ? ' is-root' : '') +
      (pathIds.includes(n.id) ? ' is-path' : '') +
      (n.id === activeId ? ' is-active' : '');

    el.style.left = (n.x - S_NODE_R) + 'px';
    el.style.top  = (n.y - S_NODE_R) + 'px';
  }

  for(const [id, el] of sNodeEls)
  {
    if(!alive.has(id))
    {
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

async function sSplayAnimated(x){
  while(x && x.parent){
    const p = x.parent;
    const g = p.parent;

    if(!g){
      if(x === p.left) sRotateRight(p);
      else sRotateLeft(p);

      sRenderTree({ activeId: x.id });
      await sDelay(S_MOVE_MS);
      continue;
    }

    if(x === p.left && p === g.left){
      sRotateRight(g);
      sRenderTree({ activeId: x.id });
      await sDelay(S_MOVE_MS);

      sRotateRight(x.parent);
      sRenderTree({ activeId: x.id });
      await sDelay(S_MOVE_MS);
      continue;
    }

    if(x === p.right && p === g.right){
      sRotateLeft(g);
      sRenderTree({ activeId: x.id });
      await sDelay(S_MOVE_MS);

      sRotateLeft(x.parent);
      sRenderTree({ activeId: x.id });
      await sDelay(S_MOVE_MS);
      continue;
    }

    if(x === p.right && p === g.left){
      sRotateLeft(p);
      sRenderTree({ activeId: x.id });
      await sDelay(S_MOVE_MS);

      sRotateRight(x.parent);
      sRenderTree({ activeId: x.id });
      await sDelay(S_MOVE_MS);
      continue;
    }

    sRotateRight(p);
    sRenderTree({ activeId: x.id });
    await sDelay(S_MOVE_MS);

    sRotateLeft(x.parent);
    sRenderTree({ activeId: x.id });
    await sDelay(S_MOVE_MS);
  }
}