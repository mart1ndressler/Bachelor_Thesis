function sParseSplaySyntax(raw){
  const input = String(raw || '').trim();
  if(!input)
    return [];

  const steps = [];
  const parts = input.split(/\s+/).filter(Boolean);

  for(const token of parts){
    const match = token.match(/^([a-zA-Z]+)\(([^)]*)\)$/);
    if(!match)
      return null;

    const opRaw = match[1].toLowerCase();
    const argsRaw = match[2].trim();

    let op = null;
    if(opRaw === 'insert' || opRaw === 'ins' || opRaw === 'i')
      op = 'insert';
    if(opRaw === 'search' || opRaw === 'find' || opRaw === 's')
      op = 'search';
    if(opRaw === 'delete' || opRaw === 'del' || opRaw === 'd')
      op = 'delete';
    if(!op)
      return null;

    const values = argsRaw.split(',').map(v => v.trim()).filter(v => v.length > 0).map(v => Number(v)).filter(v => Number.isInteger(v) && v > 0);
    if(values.length === 0)
      return null;

    if(op === 'insert'){
      for(const value of values)
        steps.push({op, value});
    }
    else
      steps.push({op, value: values[0]});
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

function sFill(tpl, vars){
  let out = String(tpl || '');
  for(const [key, value] of Object.entries(vars || {}))
    out = out.split(`{${key}}`).join(String(value));

  return out;
}

function sFmtSigned2(x){
  const n = Number(x);
  if(!Number.isFinite(n))
    return '0';

  const rounded = Math.round(n * 100) / 100;
  return rounded > 0 ? `+${rounded}` : String(rounded);
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

function sOperationLabel(op, L){
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

function sBuildTraceBody(event, L){
  if(event.kind === 'rootInsert')
    return {title: L.splayTraceRootInsertTitle || 'Create the root', detail: sFill(L.splayTraceRootInsertDetail || '', {value: sSpanNode(event.vars.value), rootKey: sSpanNode(event.vars.rootKey)})};
  if(event.kind === 'path'){
    const positionText = (event.vars.parentKey !== undefined && event.vars.parentKey !== null) ? ` ${sFill(L.splayTracePathPositionText || '', {parentKey: sSpanNode(event.vars.parentKey), sideText: event.vars.side === 'left' ? (L.splaySideLeft || 'left') : (L.splaySideRight || 'right')})}` : '';
    return {title: L.splayTracePathTitle || 'BST path traversal', detail: sFill(L.splayTracePathDetail || '', {operationText: sOperationLabel(event.vars.operation, L), target: sSpanNode(event.vars.target), pathText: event.vars.pathText || '—', compareCount: sSpanInt(event.vars.compareCount ?? 0), outcomeText: sOutcomeLabel(event.vars.outcome, L), positionText})};
  }
  if(event.kind === 'insertAttach')
    return {title: L.splayTraceInsertAttachTitle || 'Insert the new leaf', detail: sFill(L.splayTraceInsertAttachDetail || '', {value: sSpanNode(event.vars.value), parentKey: sSpanNode(event.vars.parentKey), sideText: event.vars.side === 'left' ? (L.splaySideLeft || 'left') : (L.splaySideRight || 'right')})};
  if(event.kind === 'rotateLeft')
    return {title: L.splayTraceRotateLeftTitle || 'Left rotation', detail: sFill(L.splayTraceRotateLeftDetail || '', {pivotKey: sSpanNode(event.vars.pivotKey), promotedKey: sSpanNode(event.vars.promotedKey), caseLabel: sCaseLabel(event.vars.caseType, L), rootAfter: sSpanNode(event.vars.rootAfter)})};
  if(event.kind === 'rotateRight')
    return {title: L.splayTraceRotateRightTitle || 'Right rotation', detail: sFill(L.splayTraceRotateRightDetail || '', {pivotKey: sSpanNode(event.vars.pivotKey), promotedKey: sSpanNode(event.vars.promotedKey), caseLabel: sCaseLabel(event.vars.caseType, L), rootAfter: sSpanNode(event.vars.rootAfter)})};
  if(event.kind === 'deleteSplit')
    return {title: L.splayTraceDeleteSplitTitle || 'Split the tree around the deleted root', detail: sFill(L.splayTraceDeleteSplitDetail || '', {deletedKey: sSpanNode(event.vars.deletedKey), leftRootKey: sSpanNode(event.vars.leftRootKey), rightRootKey: sSpanNode(event.vars.rightRootKey)})};
  if(event.kind === 'deleteJoinPath')
    return {title: L.splayTraceDeleteJoinPathTitle || 'Find the maximum in the left subtree', detail: sFill(L.splayTraceDeleteJoinPathDetail || '', {pathText: event.vars.pathText || '—', compareCount: sSpanInt(event.vars.compareCount ?? 0), maxKey: sSpanNode(event.vars.maxKey)})};

  return {title: L.splayTraceDeleteAttachRightTitle || 'Attach the right subtree', detail: sFill(L.splayTraceDeleteAttachRightDetail || '', {rootKey: sSpanNode(event.vars.rootKey), attachedRightKey: sSpanNode(event.vars.attachedRightKey), rootAfter: sSpanNode(event.vars.rootAfter)})};
}

function sRenderTraceEvents(events, L){
  let html = `<div class="info-panel-sep"></div><div><strong>${L.splayTraceSectionTitle || 'Internal breakdown of this command'}</strong></div>`;

  if(!Array.isArray(events) || events.length === 0){
    html += `<div class="ti-mt8">${L.splayTraceEmpty || 'No internal phases were recorded for this command.'}</div>`;
    return html;
  }

  for(let i = 0; i < events.length; i++){
    const event = events[i];
    const body = sBuildTraceBody(event, L);

    html += `<div class="info-panel-sep"></div>`;
    html += `<div><strong>${i + 1}. ${body.title}</strong></div>`;
    html += `<div class="ti-mt8">${body.detail}</div>`;
    html += `<div class="ti-mt8">${sFill(L.splayTraceMetrics || '', {deltaSteps: sSpanInt(event.deltaSteps), phiBefore: sSpanNum(event.phiBefore), phiAfter: sSpanNum(event.phiAfter), deltaPhi: sSpanNum(sFmtSigned2(event.deltaPhi))})}</div>`;
  }

  return html;
}

function sBuildExecutedSplayDetail(step, result, L){
  const common = {value: sSpanNode(step.value), actualCost: sSpanInt(result.deltaSteps), phiBefore: sSpanNum(result.phiBefore), phiAfter: sSpanNum(result.phiAfter), deltaPhi: sSpanNum(sFmtSigned2(result.deltaPhi)), rootAfter: sSpanNode(result.rootAfter), traceBreakdown: sRenderTraceEvents(result.traceEvents, L)};

  if(step.op === 'insert')
    return sFill(L.splaySyntaxInsertDetail || L.detailNotProvided || '', {...common, statusText: result.inserted ? (L.splaySyntaxStatusInserted || 'A new node was inserted and then splayed toward the root.') : (L.splaySyntaxStatusDuplicate || 'The value already existed, so no new node was created.')});
  if(step.op === 'search')
    return sFill(L.splaySyntaxSearchDetail || L.detailNotProvided || '', {...common, statusText: result.found ? (L.splaySyntaxStatusFound || 'The value was found and the accessed node was splayed to the root.') : (L.splaySyntaxStatusNotFound || 'The value was not found, so the last visited node was splayed to the root.')});

  return sFill(L.splaySyntaxDeleteDetail || L.detailNotProvided || '', {...common, statusText: result.deleted ? (L.splaySyntaxStatusDeleted || 'The value was found, splayed to the root, and then removed.') : (L.splaySyntaxStatusNotDeleted || 'The value was not found, so the tree was only restructured around the last visited node.')});
}

function sBuildStepLabel(step, L = sLang()){
  const template = step.op === 'insert' ? (L.splayBwStepInsertTitle || 'Insert {value}') : step.op === 'search' ? (L.splayBwStepSearchTitle || 'Search {value}') : (L.splayBwStepDeleteTitle || 'Delete {value}');
  return template.replace('{value}', String(step.value));
}

function sBuildSplayHistoryTitle(step, index, total, L = sLang()){
  return `${index + 1}/${total}: ${sBuildStepLabel(step, L)}`;
}

function sManualHistoryTitle(step, index, L = sLang()){
  return `${index + 1}. ${L.historyCommandLabel || 'Command'}: ${sBuildStepLabel(step, L)}`;
}

function sManualSaveHistoryEntry(step, result){
  sManualHistory.push({step: JSON.parse(JSON.stringify(step)), result: JSON.parse(JSON.stringify(result || {})), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
}

function sManualBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sManualHistory) || sManualHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return sManualHistory.map((entry, index) => {
    const step = entry.step || {};
    const result = entry.result || {};
    const title = sManualHistoryTitle(step, index, L);
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
    `;
  }).join('');
}

function sManualOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = sLang();
    return {title: `${L.historyModalBaseTitle || 'History'} – ${L.splayTreeTitle || 'Splay Tree'}`, bodyHtml: sManualBuildHistoryModalHtml()};
  });
}

function sSynSaveHistoryEntry(step, result){
  const L = sLang();
  sSynHistory.push({title: sBuildSplayHistoryTitle(step, sSynCursor, sSynSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
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

  const nextIndex = sSynHistoryCursor + delta;
  if(nextIndex < 0 || nextIndex >= sSynHistory.length)
    return;

  sSynRestoreHistoryEntry(nextIndex);
}

function sSynBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sSynHistory) || sSynHistory.length === 0)
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  return sSynHistory.map(entry => `
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
  openSyntaxHistoryModal('', '', () => {
    const L = sLang();
    return {title: `${L.syntaxHistoryTitle || 'Syntax mode history'} – ${L.splayTreeTitle || 'Splay Tree'}`, bodyHtml: sSynBuildHistoryModalHtml()};
  });
}

function rebuildSplaySyntaxForLanguage(){
  if(!Array.isArray(sSynHistory) || sSynHistory.length === 0)
    return;
  if(!Array.isArray(sSynSteps) || sSynSteps.length === 0)
    return;

  const L = sLang();

  sSynHistory = sSynHistory.map((entry, index) => {
    const step = sSynSteps[index];
    const result = sSynResults[index] || {};
    if(!step)
      return entry;

    return {...entry, title: sBuildSplayHistoryTitle(step, index, sSynSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L)};
  });

  if(document.getElementById('sSynPanelTitle'))
    sSynRenderInfo();
}

function sSynNextStep(){
  const nextBtn = document.getElementById('sSynNextBtn');

  if(!nextBtn)
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
  nextBtn.disabled = true;

  const beforeSteps = sStepCount;
  sComputePotential();
  const beforePhi = sPotential;

  sTraceReset();
  sTraceActive = true;

  const step = sSynSteps[sSynCursor];
  const instant = (sSynCursor === 0 && sSynInstantFirstStep);

  sExecuteStep(step, (resultData = {}) => {
    sSynInstantFirstStep = false;

    const result = sCaptureHistoryResult(beforeSteps, beforePhi, resultData);
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
    nextBtn.disabled = false;
    nextBtn.textContent = (sSynCursor >= total) ? (sLang().endButton || 'End') : (sLang().nextButton || 'Next');
  }, instant);
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

  sRenderSyntaxUI();
  sSynNextStep();
}