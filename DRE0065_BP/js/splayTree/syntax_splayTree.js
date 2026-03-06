function sParseSplaySyntax(raw){
  const s = String(raw || '').trim();
  if(!s)
    return [];

  const steps = [];
  const parts = s.split(/\s+/).filter(Boolean);

  for(const token of parts){
    const m = token.match(/^([a-zA-Z]+)\(([^)]*)\)$/);
    if(!m)
      return null;

    const opRaw = m[1].toLowerCase();
    const argsRaw = m[2].trim();

    let op = null;
    if(opRaw === 'insert' || opRaw === 'ins' || opRaw === 'i')
      op = 'insert';
    if(opRaw === 'search' || opRaw === 'find' || opRaw === 's')
      op = 'search';
    if(opRaw === 'delete' || opRaw === 'del' || opRaw === 'd')
      op = 'delete';
    if(!op)
      return null;

    const nums = argsRaw.split(',').map(x => x.trim()).filter(x => x.length > 0).map(x => Number(x)).filter(n => Number.isInteger(n) && n > 0);
    if(nums.length === 0)
      return null;

    if(op === 'insert'){
      for(const v of nums)
        steps.push({op, value: v});
    }
    else
      steps.push({op, value: nums[0]});
  }

  return steps;
}

function sSubmitSplaySyntax(){
  const L = sLang();
  const inputEl = document.getElementById('syntaxInput');
  const raw = (inputEl?.value || '').trim();
  const steps = sParseSplaySyntax(raw);

  if(!steps || steps.length === 0){
    if(inputEl)
      inputEl.value = '';
    showAppMessage(L.splaySyntaxInvalidAlert || L.syntaxInvalidAlert || 'Invalid syntax.');
    return;
  }

  $('#syntaxModal').modal('hide');
  sStartSplaySyntax(steps);
}

function sRenderSplaySyntaxUI(){
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
  if(btn)
    btn.onclick = sSynNextStep;

  sRenderTree({activeId: null, pathIds: []});
  sUpdateCounters();
  sSynRenderInfo();
}

function sFmt2(x){
  const n = Number(x);
  if(!Number.isFinite(n))
    return '0';

  return String(Math.round(n * 100) / 100);
}

function sFill(tpl, vars){
  let out = String(tpl || '');

  for(const [k, v] of Object.entries(vars || {}))
    out = out.split(`{${k}}`).join(String(v));

  return out;
}

function sSynRenderInfo(){
  const L = sLang();
  const t0 = document.getElementById('sSynPanelTitle');
  const d0 = document.getElementById('sSynPanelDesc');
  const t1 = document.getElementById('sSynStepTitle');
  const d1 = document.getElementById('sSynStepDetail');
  const btn = document.getElementById('sSynNextBtn');

  if(!t0 || !d0 || !t1 || !d1 || !btn)
    return;

  t0.textContent = L.splaySynPanelTitle || 'SYNTAX MODE';
  d0.innerHTML = L.splaySynPanelDesc || '';

  const total = sSynSteps.length;

  if(sSynCursor >= total){
    const lastIdx = total - 1;
    const lastStep = sSynSteps[lastIdx];
    const r = sSynResults[lastIdx];

    const lastTitle = (lastStep.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : lastStep.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}')).replace('{value}', String(lastStep.value));

    const head = `<div><strong>${lastIdx + 1}/${total}:</strong> ${lastTitle}</div>`;
    const metricsTitle = `<div class="ti-mt10"><strong>${L.splayMetricsTitle || 'Measured metrics'}</strong></div>`;
    const mSteps = sFill(L.splayMetricsSteps || '', {deltaSteps: r.deltaSteps});
    const mPhi = sFill(L.splayMetricsPhi || '', {phiBefore: sFmt2(r.phiBefore), phiAfter: sFmt2(r.phiAfter), deltaPhi: sFmt2(r.deltaPhi),});

    let extra = '';
    if(lastStep.op === 'search')
      extra = `<div class="ti-mt6">${sFill(L.splayMetricsFound || 'Found: <strong>{found}</strong>', {found: r.found ? 'YES' : 'NO'})}</div>`;
    if(lastStep.op === 'delete')
      extra = `<div class="ti-mt6">${sFill(L.splayMetricsDeleted || 'Deleted: <strong>{deleted}</strong>', {deleted: r.deleted ? 'YES' : 'NO'})}</div>`;

    const expl = (lastStep.op === 'insert' ? (L.splayBwStepInsertDetail || '') : lastStep.op === 'search' ? (L.splayBwStepSearchDetail || '') : (L.splayBwStepDeleteDetail || '')).replace('{value}', String(lastStep.value));

    t1.textContent = L.splayBwDoneTitle || (L.endButton || 'End');
    d1.innerHTML = head + `<div class="ti-mt8">${expl}</div>` + metricsTitle + `<div class="ti-mt6">${mSteps}</div>` + `<div class="ti-mt4">${mPhi}</div>` + extra;

    btn.textContent = L.endButton || 'End';
    btn.disabled = false;
    return;
  }

  const nextStep = sSynSteps[sSynCursor];
  const nextTitle = (nextStep.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : nextStep.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}')).replace('{value}', String(nextStep.value));

  let html = '';
  if(sSynCursor > 0){
    const lastIdx = sSynCursor - 1;
    const lastStep = sSynSteps[lastIdx];
    const r = sSynResults[lastIdx];

    const lastTitle = (lastStep.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : lastStep.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}')).replace('{value}', String(lastStep.value));
    const head = `<div><strong>${lastIdx + 1}/${total}:</strong> ${lastTitle}</div>`;
    const metricsTitle = `<div class="ti-mt10"><strong>${L.splayMetricsTitle || 'Measured metrics'}</strong></div>`;

    const mSteps = sFill(L.splayMetricsSteps || '', {deltaSteps: r.deltaSteps});
    const mPhi = sFill(L.splayMetricsPhi || '', {phiBefore: sFmt2(r.phiBefore), phiAfter: sFmt2(r.phiAfter), deltaPhi: sFmt2(r.deltaPhi),});

    let extra = '';
    if(lastStep.op === 'search')
      extra = `<div class="ti-mt6">${sFill(L.splayMetricsFound || 'Found: <strong>{found}</strong>', {found: r.found ? 'YES' : 'NO'})}</div>`;
    if(lastStep.op === 'delete')
      extra = `<div class="ti-mt6">${sFill(L.splayMetricsDeleted || 'Deleted: <strong>{deleted}</strong>', {deleted: r.deleted ? 'YES' : 'NO'})}</div>`;

    const expl = (lastStep.op === 'insert' ? (L.splayBwStepInsertDetail || '') : lastStep.op === 'search' ? (L.splayBwStepSearchDetail || '') : (L.splayBwStepDeleteDetail || '')).replace('{value}', String(lastStep.value));

    html += head;
    html += `<div class="ti-mt8">${expl}</div>`;
    html += metricsTitle;
    html += `<div class="ti-mt6">${mSteps}</div>`;
    html += `<div class="ti-mt4">${mPhi}</div>`;
    html += extra;
    html += `<div class="info-panel-sep"></div>`;
    html += `<div><strong>Next:</strong> ${sSynCursor + 1}/${total}: ${nextTitle}</div>`;
  }
  else{
    html += `<div><strong>Next:</strong> 1/${total}: ${nextTitle}</div>`;
    html += `<div class="ti-mt8">Click <strong>${L.nextButton || 'Next'}</strong> to execute this command.</div>`;
  }

  t1.textContent = '';
  d1.innerHTML = html;
  btn.textContent = L.nextButton || 'Next';
  btn.disabled = false;
}

function sSynNextStep(){
  const btn = document.getElementById('sSynNextBtn');
  if(!btn)
    return;
  if(sBusy)
    return;

  const total = sSynSteps.length;
  if(sSynCursor >= total){
    const L = sLang();
    showAppMessage(L.endOfExample || 'End of commands.', {title: L.splayBwDoneTitle || (L.endButton || 'End'),
      onClose: () => {
        sResetAll();
        changeContent('splayTree');
      }});

    return;
  }

  sBusy = true;
  btn.disabled = true;

  const beforeSteps = sStepCount;
  sComputePotential();
  const beforePhi = sPotential;
  const step = sSynSteps[sSynCursor];

  function finishStep(found, deleted){
    sComputePotential();
    const afterSteps = sStepCount;
    const afterPhi = sPotential;

    sSynResults[sSynCursor] = {deltaSteps: afterSteps - beforeSteps, phiBefore: beforePhi, phiAfter: afterPhi, deltaPhi: afterPhi - beforePhi, found, deleted};
    sSynCursor += 1;
    sSynRenderInfo();

    sBusy = false;
    btn.disabled = false;
    btn.textContent = (sSynCursor >= total) ? (sLang().endButton || 'End') : (sLang().nextButton || 'Next');
  }

  if(step.op === 'insert'){
    sInsertCore(step.value, () => finishStep(null, null));
    return;
  }

  if(step.op === 'search'){
    sSearchCore(step.value, (r) => finishStep(!!r.found, null));
    return;
  }

  sDeleteCore(step.value, (r) => finishStep(null, !!r.deleted));
}

function sStartSplaySyntax(steps){
  sResetAll();

  sSynSteps = steps;
  sSynCursor = 0;
  sSynResults = [];
  
  sRenderSplaySyntaxUI();
}