let qIn = [];
let qOut = [];
let qStepCount = 0;
let qPotential = 0;
let qBusy = false;
let qSyntaxCommands = [];
let qSyntaxSteps = [];
let qSyntaxIndex = 0;
let qIsSyntaxMode = false;
let qIsBestWorstMode = false;
let qBestWorstMode = null;
let qRunTimer = null;
let qSynHistory = [];
let qSynHistoryCursor = -1;
let qSynFinished = false;
let qBwCommands = [];
let qBwSteps = [];
let qBwCursor = 0;
let qBwExecutionMode = 'auto';
let qBwPaused = false;
let qBwFinished = false;
let qBwHistory = [];
let qBwHistoryCursor = -1;
let qBwFastForward = false;
let qBwInitialScenario = null;
let qSkipAnimations = false;
let qManualHistory = [];
let qManualInfoIndex = -1;
let qManualInfoOpen = false;
let qRandomMin = 1;
let qRandomMax = 99;
let qIsRandomMode = false;
let qRandomSteps = [];
let qRandomCursor = 0;

function qLang(){
  return trPage('queue');
}

function qFmt(template, params = {}){
  return String(template || '').replace(/\{(\w+)\}/g, (_, key) => {return(params[key] !== undefined) ? params[key] : `{${key}}`;});
}

function qSigned(value){
  const number = Number(value);
  if(!Number.isFinite(number))
    return '0';

  return number > 0 ? `+${number}` : String(number);
}

function qFmt2(value){
  const n = Number(value);
  if(!Number.isFinite(n))
    return '0';

  return String(Math.round(n * 100) / 100);
}

function qGetStepAmortizedCost(step){
  return (step.actualCost ?? 0) + (step.deltaPhi ?? 0);
}

function qGetOperationComplexityLabel(step, langData = qLang()){
  if(step.type === 'enqueue')
    return langData.complexityConst || 'O(1)';

  return step.usedTransfer ? (langData.complexityLinearK || 'O(k)') : (langData.complexityConst || 'O(1)');
}

function qBuildAnalysisBlock(step, langData = qLang()){
  const num = (value) => `<span class="potentialValue">${value}</span>`;
  const phiBeforeLabel = langData.infoPhiBeforeShort || 'Φ<sub>before</sub>';
  const phiAfterLabel = langData.infoPhiAfterShort || 'Φ<sub>after</sub>';

  const actualCost = qFmt2(step.actualCost ?? 0);
  const phiBefore = qFmt2(step.phiBefore ?? 0);
  const phiAfter = qFmt2(step.phiAfter ?? 0);
  const deltaPhi = qFmt2(step.deltaPhi ?? 0);
  const amortizedCost = qFmt2(step.amortizedCost ?? qGetStepAmortizedCost(step));
  const prevTotal = qFmt2(step.prevTotalAmortized ?? 0);
  const totalAmortized = qFmt2(step.totalAmortizedCost ?? amortizedCost);

  return `
    <div class="info-panel-sep"></div>

    <div><strong>${langData.infoSectionPotential}</strong></div>
    <div>${langData.infoPotentialFormulaQueue}</div>
    <div><strong>${langData.infoSymbolsMeaningTitle}</strong></div>
    <ul class="ti-ul18">
      <li>${langData.infoMeaningPhi}</li>
      <li>${langData.infoMeaningPhiBefore}</li>
      <li>${langData.infoMeaningPhiAfter}</li>
      <li>${langData.infoMeaningDeltaPhi}</li>
    </ul>
    <ul class="ti-ul18">
      <li>${phiBeforeLabel} = ${num(phiBefore)}</li>
      <li>${phiAfterLabel} = ${num(phiAfter)}</li>
      <li>ΔΦ = ${phiAfterLabel} - ${phiBeforeLabel} = ${num(phiAfter)} - ${num(phiBefore)} = ${num(deltaPhi)}</li>
    </ul>

    <div class="info-panel-sep"></div>

    <div><strong>${langData.infoSectionAmortizedCost}</strong></div>
    <div>${langData.infoAmortizedFormula}</div>
    <div><strong>${langData.infoSymbolsMeaningTitle}</strong></div>
    <ul class="ti-ul18">
      <li>${langData.infoMeaningActualCost}</li>
      <li>${langData.infoMeaningDeltaPhi}</li>
      <li>${langData.infoMeaningAmortizedCost}</li>
    </ul>
    <ul class="ti-ul18">
      <li>c = ${num(actualCost)}</li>
      <li>ΔΦ = ${num(deltaPhi)}</li>
      <li>â = c + ΔΦ = ${num(actualCost)} + ${num(deltaPhi)} = ${num(amortizedCost)}</li>
    </ul>

    <div class="info-panel-sep"></div>

    <div><strong>${langData.infoSectionTotalAmortized}</strong></div>
    <div>${langData.infoTotalAmortizedFormula}</div>
    <div><strong>${langData.infoSymbolsMeaningTitle}</strong></div>
    <ul class="ti-ul18">
      <li>${langData.infoMeaningPrevTotalAmortized}</li>
      <li>${langData.infoMeaningAmortizedCost}</li>
      <li>${langData.infoMeaningCurrentTotalAmortized}</li>
    </ul>
    <ul class="ti-ul18">
      <li>Â<sub>k-1</sub> = ${num(prevTotal)}</li>
      <li>â<sub>k</sub> = ${num(amortizedCost)}</li>
      <li>Â<sub>k</sub> = Â<sub>k-1</sub> + â<sub>k</sub> = ${num(prevTotal)} + ${num(amortizedCost)} = ${num(totalAmortized)}</li>
    </ul>

    <div class="info-panel-sep"></div>

    <div><strong>${langData.infoSectionComplexity}</strong></div>
    <ul class="ti-ul18">
      <li>${langData.infoOperationComplexityLabel}: <span class="potentialValue">${step.operationComplexity || qGetOperationComplexityLabel(step, langData)}</span></li>
      <li>${langData.infoAmortizedComplexityLabel}: <span class="potentialValue">${step.amortizedComplexity || (langData.complexityConst || 'O(1)')}</span></li>
    </ul>

    <div class="info-panel-sep"></div>
  `;
}

function qDecorateRecordedStep(step, prevTotal = 0, langData = qLang()){
  step.amortizedCost = qGetStepAmortizedCost(step);
  step.prevTotalAmortized = prevTotal;
  step.totalAmortizedCost = prevTotal + step.amortizedCost;
  step.operationComplexity = qGetOperationComplexityLabel(step, langData);
  step.amortizedComplexity = langData.complexityConst || 'O(1)';
  step.detail = qBuildStepDetail(step, langData);

  return step;
}

function qDescribeStep(step, langData = qLang()){
  if(!step)
    return '';
  if(step.type === 'enqueue')
    return `${langData.enqueueButton} ${step.value}`;
  if(step.type === 'dequeue')
    return `${langData.dequeueButton}`;

  return step.description || '';
}

function qBuildStepDetail(step, langData = qLang()){
  const analysisBlock = qBuildAnalysisBlock(step, langData);
  const num = (value) => `<span class="potentialValue">${value}</span>`;
  const push = (value) => `<span class="pushValue">${value}</span>`;
  const pop = (value) => `<span class="popValue">${value}</span>`;
  const common = {beforeIn: num(step.beforeIn ?? 0), beforeOut: num(step.beforeOut ?? 0), afterIn: num(step.afterIn ?? 0), afterOut: num(step.afterOut ?? 0), actualCost: num(step.actualCost ?? 0), phiBefore: num(step.phiBefore ?? 0), phiAfter: num(step.phiAfter ?? 0), deltaPhi: num(qSigned(step.deltaPhi ?? 0)), transferredCount: num(step.transferredCount ?? 0), analysisBlock};

  if(step.type === 'enqueue')
    return qFmt(langData.queueEnqueueDetail || langData.detailNotProvided || '', {...common, value: push(step.value)});
  if(step.wasEmpty)
    return qFmt(langData.emptyDequeueDetail || langData.detailNotProvided || '', common);
  if(step.usedTransfer)
    return qFmt(langData.queueDequeueDetailTransfer || langData.detailNotProvided || '', {...common, removedValue: pop(step.removedValue)});

  return qFmt(langData.queueDequeueDetailSimple || langData.detailNotProvided || '', {...common, removedValue: pop(step.removedValue)});
}

function qBuildStepsFromCommands(commands){
  const L = qLang();

  return commands.map(command => {
    if(command.type === 'enqueue')
      return {...command, description: qDescribeStep(command, L), detail: L.queueEnqueueDetail || L.detailNotProvided, transferredCount: 0};

    return {...command, description: qDescribeStep(command, L), detail: L.detailNotProvided, removedValue: undefined, usedTransfer: undefined, wasEmpty: false, transferredCount: 0};
  });
}

function qCloneSnapshot(snapshot){
  return {qIn: [...(snapshot?.qIn || [])], qOut: [...(snapshot?.qOut || [])]};
}

function qMakeSnapshot(){
  return qCloneSnapshot({qIn, qOut});
}

function qCreateStateSnapshot(){
  return {snapshot: qMakeSnapshot(), beforeIn: qIn.length, beforeOut: qOut.length, stepCount: qStepCount, potential: qPotential};
}

function qApplyState(snapshot, nextStepCount, nextPotential){
  const safeSnapshot = qCloneSnapshot(snapshot);
  qIn = safeSnapshot.qIn;
  qOut = safeSnapshot.qOut;

  qStepCount = nextStepCount;
  qPotential = nextPotential;
}

function qFinalizeStep(step, beforeState, afterSnapshot, actualCost, extra = {}, langData = qLang()){
  const safeAfter = qCloneSnapshot(afterSnapshot);
  Object.assign(step, extra);

  step.description = qDescribeStep(step, langData);
  step.beforeIn = beforeState.beforeIn;
  step.beforeOut = beforeState.beforeOut;
  step.afterIn = safeAfter.qIn.length;
  step.afterOut = safeAfter.qOut.length;
  step.actualCost = actualCost;
  step.transferredCount = step.transferredCount ?? 0;
  step.phiBefore = beforeState.potential;
  step.phiAfter = safeAfter.qIn.length;
  step.deltaPhi = step.phiAfter - step.phiBefore;
  step.detail = qBuildStepDetail(step, langData);

  return step;
}

function qShouldTrackManualHistory(){
  return !qIsBestWorstMode && !qIsSyntaxMode && !document.getElementById('qSynPanel');
}

function qGetOperationCount(){
  if(qIsBestWorstMode){
    if(qBwHistoryCursor >= 0)
      return qBwHistoryCursor + 1;

    return 0;
  }

  if(qSynHistoryCursor >= 0 && (qIsSyntaxMode || qSynFinished || qSynHistory.length > 0 || qSyntaxSteps.length > 0))
    return qSynHistoryCursor + 1;

  return qManualHistory.length;
}

function qBuildManualHistoryTitle(index, step, langData = qLang()){
  return `${index + 1}. ${langData.historyCommandLabel || 'Command'}: ${qDescribeStep(step, langData)}`;
}

function qAddManualHistoryEntry(step, {snapshot = null, stepCountValue = null, potentialValue = null} = {}){
  qManualHistory.push({step: JSON.parse(JSON.stringify(step)), snapshot: snapshot ? qCloneSnapshot(snapshot) : qMakeSnapshot(), stepCount: Number.isFinite(stepCountValue) ? stepCountValue : qStepCount, potential: Number.isFinite(potentialValue) ? potentialValue : qPotential});
}

function qClearRunTimer(){
  if(qRunTimer){
    clearTimeout(qRunTimer);
    qRunTimer = null;
  }
}

function qResetSyntaxRuntimeState(){
  qSyntaxCommands = [];
  qSyntaxSteps = [];
  qSyntaxIndex = 0;
  qIsSyntaxMode = false;
  qSynHistory = [];
  qSynHistoryCursor = -1;
  qSynFinished = false;
}

function qResetBestWorstRuntimeState(){
  qIsBestWorstMode = false;
  qBestWorstMode = null;
  qBwCommands = [];
  qBwSteps = [];
  qBwCursor = 0;
  qBwExecutionMode = 'auto';
  qBwPaused = false;
  qBwFinished = false;
  qBwHistory = [];
  qBwHistoryCursor = -1;
  qBwFastForward = false;
  qBwInitialScenario = null;
}

function qResetManualRuntimeState(){
  qManualHistory = [];
  qManualInfoIndex = -1;
  qManualInfoOpen = false;
}

function qResetRandomRuntimeState(){
  qIsRandomMode = false;
  qRandomSteps = [];
  qRandomCursor = 0;
}

function qResetState(){
  qClearRunTimer();

  qIn = [];
  qOut = [];
  qStepCount = 0;
  qPotential = 0;
  qBusy = false;
  qSkipAnimations = false;

  qResetSyntaxRuntimeState();
  qResetBestWorstRuntimeState();
  qResetRandomRuntimeState();
  qResetManualRuntimeState();
}