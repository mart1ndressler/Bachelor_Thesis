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
    <div class="run-panel splay-syntax-panel">
      <div class="run-row syntax-layout no-wrap splay-syntax-layout" id="mainContainer">
        <div class="treeArea splay-syntax-treeArea" id="treeArea">
          <svg class="treeSvg" id="treeSvg"></svg>
          <div class="treeNodesLayer" id="treeNodesLayer"></div>
        </div>

        <div class="run-side-controls">
          <div class="step-count" id="sStepCountDisplay">${L.stepCount}: ${sStepCount}</div>
          <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sPotential}</span></div>
          <button id="sSynNextBtn" class="btn btn-primary btn-lg">${L.nextButton || 'Next'}</button>

          <div id="sSynFinishTools" class="syntax-finish-tools hidden">
            <div class="syntax-nav-row">
              <button id="sSynPrevBtn" class="syntax-nav-btn" title="${L.syntaxPrevStepTitle || 'Previous step'}"><i class="fas fa-arrow-left"></i></button>
              <button id="sSynForwardBtn" class="syntax-nav-btn" title="${L.syntaxNextStepTitle || 'Next step'}"><i class="fas fa-arrow-right"></i></button>
            </div>
            <button id="sSynHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
              <i class="fas fa-info-circle">
            </i></button>
          </div>
        </div>

        <div class="run-side-info">
          <div class="syntax-detailed-info" id="sSynPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="sSynPanelTitle"></div>
              <div class="info-panel-desc" id="sSynPanelDesc"></div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="sSynStepTitle"></div>
              <div class="info-step-detail" id="sSynStepDetail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const btn = document.getElementById('sSynNextBtn');
  if(btn)
    btn.onclick = sSynNextStep;

  const prevBtn = document.getElementById('sSynPrevBtn');
  const forwardBtn = document.getElementById('sSynForwardBtn');
  const historyBtn = document.getElementById('sSynHistoryBtn');

  if(prevBtn)
    prevBtn.onclick = () => sSynGoHistory(-1);
  if(forwardBtn)
    forwardBtn.onclick = () => sSynGoHistory(1);
  if(historyBtn)
    historyBtn.onclick = sSynOpenHistoryModal;

  sSynUpdateFinishUI();

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

function sFmtSigned2(x){
  const n = Number(x);
  if(!Number.isFinite(n))
    return '0';

  const r = Math.round(n * 100) / 100;
  return r > 0 ? `+${r}` : String(r);
}

function sSpanNum(x){
  return `<span class="potentialValue">${typeof x === 'string' ? x : sFmt2(x)}</span>`;
}

function sSpanInt(x){
  return `<span class="potentialValue">${x}</span>`;
}

function sSpanNode(x){
  const L = sLang();
  if(x === null || x === undefined)
    return `<span class="emptyStackMessage">${L.splayEmptyTreeShort || 'empty tree'}</span>`;

  return `<span class="pushValue">${x}</span>`;
}

function sCaseLabel(caseType, L){
  if(caseType === 'zig')
    return L.splayCaseZig || 'Zig';
  if(caseType === 'zig-zig')
    return L.splayCaseZigZig || 'Zig-Zig';

  return L.splayCaseZigZag || 'Zig-Zag';
}

function sOpLabel(op, L){
  if(op === 'insert')
    return L.splayOperationInsertText || 'Insert';
  if(op === 'search')
    return L.splayOperationSearchText || 'Search';

  return L.splayOperationDeleteText || 'Delete';
}

function sOutcomeLabel(outcome, L){
  if(outcome === 'duplicate')
    return L.splayOutcomeDuplicate || 'the value already exists';
  if(outcome === 'position')
    return L.splayOutcomePositionFound || 'the insertion position was found';
  if(outcome === 'found')
    return L.splayOutcomeFound || 'the value was found';

  return L.splayOutcomeNotFound || 'the value was not found';
}

function sRenderSplayTraceEvents(events, L){
  let html = `<div class="info-panel-sep"></div><div><strong>${L.splayTraceSectionTitle || 'Internal breakdown of this command'}</strong></div>`;

  if(!Array.isArray(events) || events.length === 0){
    html += `<div class="ti-mt8">${L.splayTraceEmpty || 'No internal phases were recorded for this command.'}</div>`;
    return html;
  }

  for(let i = 0; i < events.length; i++){
    const ev = events[i];
    const body = sBuildSplayTraceBody(ev, L);

    html += `<div class="info-panel-sep"></div>`;
    html += `<div><strong>${i + 1}. ${body.title}</strong></div>`;
    html += `<div class="ti-mt8">${body.detail}</div>`;
    html += `<div class="ti-mt8">${sFill(L.splayTraceMetrics || '', {deltaSteps: sSpanInt(ev.deltaSteps), phiBefore: sSpanNum(ev.phiBefore), phiAfter: sSpanNum(ev.phiAfter), deltaPhi: sSpanNum(sFmtSigned2(ev.deltaPhi))})}</div>`;
  }

  return html;
}

function sBuildSplayTraceBody(ev, L){
  if(ev.kind === 'rootInsert')
    return {title: L.splayTraceRootInsertTitle || 'Create the root', detail: sFill(L.splayTraceRootInsertDetail || '', {value: sSpanNode(ev.vars.value), rootKey: sSpanNode(ev.vars.rootKey)})};
  if(ev.kind === 'path'){
    const positionText = (ev.vars.parentKey !== undefined && ev.vars.parentKey !== null) ? ` ${sFill(L.splayTracePathPositionText || '', {parentKey: sSpanNode(ev.vars.parentKey), sideText: ev.vars.side === 'left' ? (L.splaySideLeft || 'left') : (L.splaySideRight || 'right')})}` : '';
    return {title: L.splayTracePathTitle || 'BST path traversal', detail: sFill(L.splayTracePathDetail || '', {operationText: sOpLabel(ev.vars.operation, L), target: sSpanNode(ev.vars.target), pathText: ev.vars.pathText || '—', compareCount: sSpanInt(ev.vars.compareCount ?? 0), outcomeText: sOutcomeLabel(ev.vars.outcome, L), positionText})};
  }
  if(ev.kind === 'insertAttach')
    return {title: L.splayTraceInsertAttachTitle || 'Insert the new leaf', detail: sFill(L.splayTraceInsertAttachDetail || '', {value: sSpanNode(ev.vars.value), parentKey: sSpanNode(ev.vars.parentKey), sideText: ev.vars.side === 'left' ? (L.splaySideLeft || 'left') : (L.splaySideRight || 'right')})};
  if(ev.kind === 'rotateLeft')
    return {title: L.splayTraceRotateLeftTitle || 'Left rotation', detail: sFill(L.splayTraceRotateLeftDetail || '', {pivotKey: sSpanNode(ev.vars.pivotKey), promotedKey: sSpanNode(ev.vars.promotedKey), caseLabel: sCaseLabel(ev.vars.caseType, L), rootAfter: sSpanNode(ev.vars.rootAfter)})};
  if(ev.kind === 'rotateRight')
    return {title: L.splayTraceRotateRightTitle || 'Right rotation', detail: sFill(L.splayTraceRotateRightDetail || '', {pivotKey: sSpanNode(ev.vars.pivotKey), promotedKey: sSpanNode(ev.vars.promotedKey), caseLabel: sCaseLabel(ev.vars.caseType, L), rootAfter: sSpanNode(ev.vars.rootAfter)})};
  if(ev.kind === 'deleteSplit')
    return {title: L.splayTraceDeleteSplitTitle || 'Split the tree around the deleted root', detail: sFill(L.splayTraceDeleteSplitDetail || '', {deletedKey: sSpanNode(ev.vars.deletedKey), leftRootKey: sSpanNode(ev.vars.leftRootKey), rightRootKey: sSpanNode(ev.vars.rightRootKey)})};
  if(ev.kind === 'deleteJoinPath')
    return {title: L.splayTraceDeleteJoinPathTitle || 'Find the maximum in the left subtree', detail: sFill(L.splayTraceDeleteJoinPathDetail || '', {pathText: ev.vars.pathText || '—', compareCount: sSpanInt(ev.vars.compareCount ?? 0), maxKey: sSpanNode(ev.vars.maxKey)})};

  return {title: L.splayTraceDeleteAttachRightTitle || 'Attach the right subtree', detail: sFill(L.splayTraceDeleteAttachRightDetail || '', {rootKey: sSpanNode(ev.vars.rootKey), attachedRightKey: sSpanNode(ev.vars.attachedRightKey), rootAfter: sSpanNode(ev.vars.rootAfter)})};
}

function sBuildExecutedSplayDetail(step, r, L){
  const common = {value: sSpanNode(step.value), actualCost: sSpanInt(r.deltaSteps), phiBefore: sSpanNum(r.phiBefore), phiAfter: sSpanNum(r.phiAfter), deltaPhi: sSpanNum(sFmtSigned2(r.deltaPhi)), rootAfter: sSpanNode(r.rootAfter), traceBreakdown: sRenderSplayTraceEvents(r.traceEvents, L)};

  if(step.op === 'insert')
    return sFill(L.splaySyntaxInsertDetail || L.detailNotProvided || '', {...common, statusText: r.inserted ? (L.splaySyntaxStatusInserted || 'A new node was inserted and then splayed toward the root.') : (L.splaySyntaxStatusDuplicate || 'The value already existed, so no new node was created.')});
  if(step.op === 'search')
    return sFill(L.splaySyntaxSearchDetail || L.detailNotProvided || '', {...common, statusText: r.found ? (L.splaySyntaxStatusFound || 'The value was found and the accessed node was splayed to the root.') : (L.splaySyntaxStatusNotFound || 'The value was not found, so the last visited node was splayed to the root.')});

  return sFill(L.splaySyntaxDeleteDetail || L.detailNotProvided || '', {...common, statusText: r.deleted ? (L.splaySyntaxStatusDeleted || 'The value was found, splayed to the root, and then removed.') : (L.splaySyntaxStatusNotDeleted || 'The value was not found, so the tree was only restructured around the last visited node.')});
}

function sCaptureHistoryResult(beforeSteps, beforePhi, extra = {}){
  sComputePotential();

  const traceEvents = Array.isArray(sSynCurrentTrace) ? sSynCurrentTrace.map(ev => ({...ev, vars: {...(ev.vars || {})}})) : [];
  sTraceActive = false;

  return {deltaSteps: sStepCount - beforeSteps, phiBefore: beforePhi, phiAfter: sPotential, deltaPhi: sPotential - beforePhi, traceEvents, rootAfter: sRoot ? sRoot.key : null, ...extra};
}

function sManualHistoryTitle(step, index, L = sLang()){
  const tpl = step.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : step.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}');
  const label = tpl.replace('{value}', String(step.value));
  return `${index + 1}. ${L.historyCommandLabel || 'Command'}: ${label}`;
}

function sManualSaveHistoryEntry(step, result){
  sManualHistory.push({step: JSON.parse(JSON.stringify(step)), result: JSON.parse(JSON.stringify(result || {})), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
}

function sManualBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sManualHistory) || sManualHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return sManualHistory.map((entry, i) => {
    const step = entry.step || {};
    const result = entry.result || {};
    const title = sManualHistoryTitle(step, i, L);
    const detailHtml = sBuildExecutedSplayDetail(step, result, L);

    return `
      <div class="syntax-history-entry">
        <div class="info-panel-title">${title}</div>
        <div class="syntax-history-meta">
          ${L.stepCount}: ${entry.stepCount} |
          ${L.potential}: ${sFmt2(entry.potential)}
        </div>
        <div class="info-step-detail">${detailHtml}</div>
      </div>
    `;}).join('');
}

function sManualOpenHistoryModal(){
  openSyntaxHistoryModal('', '',
    () => {
      const L = sLang();
      return {title: `${L.historyModalBaseTitle || 'History'} – ${L.splayTreeTitle || 'Splay Tree'}`, bodyHtml: sManualBuildHistoryModalHtml()};
    }
  );
}

function sCloneNode(node, parent = null){
  if(!node)
    return null;

  const copy = {id: node.id, key: node.key, left: null, right: null, parent, x: node.x || 0, y: node.y || 0};
  copy.left = sCloneNode(node.left, copy);
  copy.right = sCloneNode(node.right, copy);
  return copy;
}

function sCloneTree(root){
  return sCloneNode(root, null);
}

function sBuildSplayHistoryTitle(step, index, total, L){
  const tpl = step.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : step.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}');
  return `${index + 1}/${total}: ${tpl.replace('{value}', String(step.value))}`;
}

function sSynSaveHistoryEntry(step, result){
  const L = sLang();
  const title = sBuildSplayHistoryTitle(step, sSynCursor, sSynSteps.length, L);
  const detailHtml = sBuildExecutedSplayDetail(step, result, L);

  sSynHistory.push({title, detailHtml, stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
}

function sSynRebuildHistoryForLanguage(){
  if(!Array.isArray(sSynHistory) || sSynHistory.length === 0)
    return;
  if(!Array.isArray(sSynSteps) || sSynSteps.length === 0)
    return;

  const L = sLang();

  sSynHistory = sSynHistory.map((entry, i) => {
    const step = sSynSteps[i];
    const result = sSynResults[i] || {};

    if(!step)
      return entry;

    return {...entry, title: sBuildSplayHistoryTitle(step, i, sSynSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L)};
  });
}

function sSynRestoreHistoryEntry(index){
  if(index < 0 || index >= sSynHistory.length)
    return;

  sSynHistoryCursor = index;
  const entry = sSynHistory[index];
  sRoot = sCloneTree(entry.snapshot);
  sStepCount = entry.stepCount;
  sPotential = entry.potential;

  sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
  sUpdateCounters();
  sSynRenderInfo();
  sSynUpdateFinishUI();
}

function sSynGoHistory(delta){
  if(!sSynFinished)
    return;

  const next = sSynHistoryCursor + delta;
  if(next < 0 || next >= sSynHistory.length)
    return;

  sSynRestoreHistoryEntry(next);
}

function sSynUpdateFinishUI(){
  const wrap = document.getElementById('sSynFinishTools');
  const prevBtn = document.getElementById('sSynPrevBtn');
  const forwardBtn = document.getElementById('sSynForwardBtn');

  if(!wrap || !prevBtn || !forwardBtn)
    return;

  if(!sSynFinished){
    wrap.classList.add('hidden');
    return;
  }

  wrap.classList.remove('hidden');
  prevBtn.disabled = sSynHistoryCursor <= 0;
  forwardBtn.disabled = sSynHistoryCursor >= sSynHistory.length - 1;
}

function sSynBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sSynHistory) || sSynHistory.length === 0)
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  return sSynHistory.map((entry, i) => `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${entry.title}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount} |
        ${L.potential}: ${sFmt2(entry.potential)}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>`).join('');
}

function sSynOpenHistoryModal(){
  const L = sLang();
  openSyntaxHistoryModal(`${L.syntaxHistoryTitle || 'Syntax mode history'} – ${L.splayTreeTitle || 'Splay Tree'}`, sSynBuildHistoryModalHtml());
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

  if(sSynFinished && sSynHistory.length > 0){
    const entry = sSynHistory[sSynHistoryCursor];

    t0.textContent = L.splaySynPanelTitle || 'SYNTAX MODE';
    d0.innerHTML = (L.splaySynPanelDesc || '') + `<div class="info-panel-sep"></div><div><strong>${L.syntaxExecutionFinished || 'Execution has finished. You can browse the executed steps below or end this mode.'}</strong></div>`;
    t1.textContent = entry.title;
    d1.innerHTML = entry.detailHtml;
    btn.textContent = L.endButton || 'End';

    btn.disabled = false;
    sSynUpdateFinishUI();
    return;
  }

  t0.textContent = L.splaySynPanelTitle || 'SYNTAX MODE';
  d0.innerHTML = L.splaySynPanelDesc || '';

  const total = sSynSteps.length;
  if(total === 0){
    t1.textContent = '';
    d1.innerHTML = L.detailNotProvided || '';
    return;
  }

  if(sSynCursor === 0){
    const nextStep = sSynSteps[0];
    const nextTitle = (nextStep.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : nextStep.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}')).replace('{value}', String(nextStep.value));

    t1.textContent = '';
    d1.innerHTML = `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> 1/${total}: ${nextTitle}</div>` + `<div class="ti-mt8">${L.splaySyntaxStartHint || `Click <strong>${L.nextButton || 'Next'}</strong> to execute this command.`}</div>`;
    btn.textContent = L.nextButton || 'Next';
    btn.disabled = false;
    return;
  }

  const lastIdx = Math.min(sSynCursor, total) - 1;
  const lastStep = sSynSteps[lastIdx];
  const r = sSynResults[lastIdx] || {};
  const lastTitle = (lastStep.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : lastStep.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}')).replace('{value}', String(lastStep.value));

  t1.textContent = `${lastIdx + 1}/${total}: ${lastTitle}`;
  let html = sBuildExecutedSplayDetail(lastStep, r, L);

  if(sSynCursor < total){
    const nextStep = sSynSteps[sSynCursor];
    const nextTitle = (nextStep.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : nextStep.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}')).replace('{value}', String(nextStep.value));

    html += `<div class="info-panel-sep"></div>`;
    html += `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${sSynCursor + 1}/${total}: ${nextTitle}</div>`;
  }

  d1.innerHTML = html;
  btn.textContent = (sSynCursor >= total) ? (L.endButton || 'End') : (L.nextButton || 'Next');
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
    sResetAll();
    returnToMainPageFromSyntax('splayTree');
    return;
  }

  sBusy = true;
  btn.disabled = true;

  const beforeSteps = sStepCount;
  sComputePotential();
  const beforePhi = sPotential;

  sTraceReset();
  sTraceActive = true;

  const step = sSynSteps[sSynCursor];
  const instant = (sSynCursor === 0 && sSynInstantFirstStep);

  function finishStep(extra = {}){
    sSynInstantFirstStep = false;
    sComputePotential();

    const afterSteps = sStepCount;
    const afterPhi = sPotential;
    const traceEvents = Array.isArray(sSynCurrentTrace) ? sSynCurrentTrace.map(ev => ({...ev, vars: {...(ev.vars || {})}})) : [];

    sTraceActive = false;
    const result = {deltaSteps: afterSteps - beforeSteps, phiBefore: beforePhi, phiAfter: afterPhi, deltaPhi: afterPhi - beforePhi, traceEvents, rootAfter: sRoot ? sRoot.key : null, ...extra};

    sSynResults[sSynCursor] = result;
    sSynSaveHistoryEntry(step, result);

    sSynCursor += 1;
    if(sSynCursor >= total){
      sSynFinished = true;
      sSynHistoryCursor = sSynHistory.length - 1;
    }

    sSynRenderInfo();
    sSynUpdateFinishUI();

    sBusy = false;
    btn.disabled = false;
    btn.textContent = (sSynCursor >= total) ? (sLang().endButton || 'End') : (sLang().nextButton || 'Next');
  }

  if(step.op === 'insert'){
    sInsertCore(step.value, (r = {}) => {finishStep({inserted: !!r.inserted, duplicate: !!r.duplicate});}, instant);
    return;
  }

  if(step.op === 'search'){
    sSearchCore(step.value, (r) => {finishStep({found: !!r.found});}, instant);
    return;
  }

  sDeleteCore(step.value, (r) => {finishStep({deleted: !!r.deleted});}, instant);
}

function sStartSplaySyntax(steps){
  sResetAll();

  sSynSteps = steps;
  sSynCursor = 0;
  sSynResults = [];
  sSynHistory = [];
  sSynHistoryCursor = -1;
  sSynFinished = false;
  sSynInstantFirstStep = true;

  sRenderSplaySyntaxUI();
  sSynNextStep();
}