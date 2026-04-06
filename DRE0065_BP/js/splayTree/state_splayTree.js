let sRoot = null;
let sNextId = 1;
let sStepCount = 0;
let sPotential = 0;
let sBusy = false;
let sInitValues = [];
let sInitSource = null;
let sInitBuildIndex = -1;
let sBwMode = null;
let sBwSteps = [];
let sBwIndex = 0;
let sBwExecutionMode = 'auto';
let sBwPaused = false;
let sBwFinished = false;
let sBwHistory = [];
let sBwResults = [];
let sBwAutoTimer = 0;
let sBwHistoryCursor = -1;
let sBwFastForward = false;
let sBwInitialSteps = [];
let sSynSteps = [];
let sSynCursor = 0;
let sSynResults = [];
let sSynCurrentTrace = [];
let sSynHistory = [];
let sSynHistoryCursor = -1;
let sSynFinished = false;
let sSynInstantFirstStep = false;
let sTraceActive = false;
let sSkipAnimations = false;
let sManualHistory = [];
let sManualInfoIndex = -1;
let sManualInfoOpen = false;
let sRandomMin = 1;
let sRandomMax = 99;
let sIsRandomMode = false;
let sRandomSteps = [];
let sRandomCursor = 0;
let sRunToken = 0;
let sEdgeAnimRaf = 0;
let sEdgeAnimToken = 0;
let sTreeAreaResizeObserver = null;
let sTreeAreaResizeRaf = 0;

const S_MOVE_MS = 650;
const sNodeEls = new Map();

function sLang(){
  return trPage('splay');
}

function sGetOperationCount(){
  if(sBwMode !== null){
    if(sBwHistoryCursor >= 0)
      return sBwHistoryCursor + 1;

    return 0;
  }

  if(sSynHistoryCursor >= 0 && (sSynFinished || sSynHistory.length > 0 || sSynSteps.length > 0))
    return sSynHistoryCursor + 1;

  return sManualHistory.length;
}

function sFmt2(x){
  const n = Number(x);
  if(!Number.isFinite(n))
    return '0';

  return String(Math.round(n * 100) / 100);
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

function sGetStepAmortizedCost(result){
  return (result.deltaSteps ?? 0) + (result.deltaPhi ?? 0);
}

function sDecorateRecordedResult(step, result, prevTotal = 0, L = sLang()){
  result.amortizedCost = sGetStepAmortizedCost(result);
  result.prevTotalAmortized = prevTotal;
  result.totalAmortizedCost = prevTotal + result.amortizedCost;
  result.operationComplexity = L.complexityLinearN || 'O(n)';
  result.amortizedComplexity = L.complexityLogN || 'O(log n)';

  return result;
}

function sBuildAnalysisBlock(step, result, L = sLang()){
  const num = (value) => `<span class="potentialValue">${typeof value === 'string' ? value : sFmt2(value)}</span>`;
  const phiBeforeLabel = L.infoPhiBeforeShort || 'Φ<sub>before</sub>';
  const phiAfterLabel = L.infoPhiAfterShort || 'Φ<sub>after</sub>';

  const actualCost = sFmt2(result.deltaSteps ?? 0);
  const phiBefore = sFmt2(result.phiBefore ?? 0);
  const phiAfter = sFmt2(result.phiAfter ?? 0);
  const deltaPhi = sFmt2(result.deltaPhi ?? 0);
  const amortizedCost = sFmt2(result.amortizedCost ?? sGetStepAmortizedCost(result));
  const prevTotal = sFmt2(result.prevTotalAmortized ?? 0);
  const totalAmortized = sFmt2(result.totalAmortizedCost ?? amortizedCost);

  return `
    <div class="info-panel-sep"></div>

    <div><strong>${L.infoSectionPotential}</strong></div>
    <div>${L.infoPotentialFormulaSplay}</div>
    <div><strong>${L.infoSymbolsMeaningTitle || 'Meaning of used symbols'}</strong></div>
    <ul class="ti-ul18">
      <li>${L.infoMeaningPhi || 'Φ is the value of the potential function.'}</li>
      <li>${L.infoMeaningPhiBefore || 'Φ<sub>before</sub> is the potential before this operation.'}</li>
      <li>${L.infoMeaningPhiAfter || 'Φ<sub>after</sub> is the potential after this operation.'}</li>
      <li>${L.infoMeaningDeltaPhi || 'ΔΦ is the change of potential during this operation.'}</li>
    </ul>
    <ul class="ti-ul18">
      <li>${phiBeforeLabel} = ${num(phiBefore)}</li>
      <li>${phiAfterLabel} = ${num(phiAfter)}</li>
      <li>ΔΦ = ${phiAfterLabel} - ${phiBeforeLabel} = ${num(phiAfter)} - ${num(phiBefore)} = ${num(deltaPhi)}</li>
    </ul>

    <div class="info-panel-sep"></div>

    <div><strong>${L.infoSectionAmortizedCost}</strong></div>
    <div>${L.infoAmortizedFormula}</div>
    <div><strong>${L.infoSymbolsMeaningTitle || 'Meaning of used symbols'}</strong></div>
    <ul class="ti-ul18">
      <li>${L.infoMeaningActualCost || 'c is the actual cost of this operation.'}</li>
      <li>${L.infoMeaningDeltaPhi || 'ΔΦ is the change of potential during this operation.'}</li>
      <li>${L.infoMeaningAmortizedCost || 'â is the amortized cost of this operation.'}</li>
    </ul>
    <ul class="ti-ul18">
      <li>c = ${num(actualCost)}</li>
      <li>ΔΦ = ${num(deltaPhi)}</li>
      <li>â = c + ΔΦ = ${num(actualCost)} + ${num(deltaPhi)} = ${num(amortizedCost)}</li>
    </ul>

    <div class="info-panel-sep"></div>

    <div><strong>${L.infoSectionTotalAmortized}</strong></div>
    <div>${L.infoTotalAmortizedFormula}</div>
    <div><strong>${L.infoSymbolsMeaningTitle || 'Meaning of used symbols'}</strong></div>
    <ul class="ti-ul18">
      <li>${L.infoMeaningPrevTotalAmortized || 'Â<sub>k-1</sub> is the total amortized cost before this operation.'}</li>
      <li>${L.infoMeaningAmortizedCost || 'â is the amortized cost of this operation.'}</li>
      <li>${L.infoMeaningCurrentTotalAmortized || 'Â<sub>k</sub> is the total amortized cost after this operation.'}</li>
    </ul>
    <ul class="ti-ul18">
      <li>Â<sub>k-1</sub> = ${num(prevTotal)}</li>
      <li>â<sub>k</sub> = ${num(amortizedCost)}</li>
      <li>Â<sub>k</sub> = Â<sub>k-1</sub> + â<sub>k</sub> = ${num(prevTotal)} + ${num(amortizedCost)} = ${num(totalAmortized)}</li>
    </ul>

    <div class="info-panel-sep"></div>

    <div><strong>${L.infoSectionComplexity}</strong></div>
    <ul class="ti-ul18">
      <li>${L.infoOperationComplexityLabel}: <span class="potentialValue">${result.operationComplexity || (L.complexityLinearN || 'O(n)')}</span></li>
      <li>${L.infoAmortizedComplexityLabel}: <span class="potentialValue">${result.amortizedComplexity || (L.complexityLogN || 'O(log n)')}</span></li>
    </ul>

    <div class="info-panel-sep"></div>
  `;
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
  const analysisBlock = sBuildAnalysisBlock(step, result, L);
  const common = {value: sSpanNode(step.value), actualCost: sSpanInt(result.deltaSteps), phiBefore: sSpanNum(result.phiBefore), phiAfter: sSpanNum(result.phiAfter), deltaPhi: sSpanNum(sFmtSigned2(result.deltaPhi)), rootAfter: sSpanNode(result.rootAfter), traceBreakdown: sRenderTraceEvents(result.traceEvents, L), analysisBlock};

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

function sResetAll(){
  sRoot = null;
  sNextId = 1;
  sStepCount = 0;
  sPotential = 0;
  sBusy = false;
  sInitValues = [];
  sInitSource = null;
  sInitBuildIndex = -1;
  sBwMode = null;
  sBwSteps = [];
  sBwIndex = 0;
  sBwExecutionMode = 'auto';
  sBwPaused = false;
  sBwFinished = false;
  sBwHistory = [];
  sBwResults = [];
  sBwHistoryCursor = -1;
  sBwFastForward = false;
  sBwInitialSteps = [];
  sSynSteps = [];
  sSynCursor = 0;
  sSynResults = [];
  sSynCurrentTrace = [];
  sSynHistory = [];
  sSynHistoryCursor = -1;
  sSynFinished = false;
  sSynInstantFirstStep = false;
  sTraceActive = false;
  sSkipAnimations = false;
  sIsRandomMode = false;
  sRandomSteps = [];
  sRandomCursor = 0;
  sManualHistory = [];
  sManualInfoIndex = -1;
  sManualInfoOpen = false;
  sRunToken += 1;
  sEdgeAnimToken += 1;

  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }
  if(sEdgeAnimRaf){
    cancelAnimationFrame(sEdgeAnimRaf);
    sEdgeAnimRaf = 0;
  }
  if(sTreeAreaResizeRaf){
    cancelAnimationFrame(sTreeAreaResizeRaf);
    sTreeAreaResizeRaf = 0;
  }
  if(sTreeAreaResizeObserver){
    sTreeAreaResizeObserver.disconnect();
    sTreeAreaResizeObserver = null;
  }

  sNodeEls.clear();
}