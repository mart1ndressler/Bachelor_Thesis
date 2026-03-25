let stackArray = [];
let stepCount = 0;
let potential = 0;
let syntaxCommands = [];
let currentCommandIndex = 0;
let steps = [];
let isBestWorstMode = false;
let mpBusy = false;
let mpBestWorstMode = null;
let mpRunToken = 0;
let mpBwTimer = null;
let mpSynHistory = [];
let mpSynHistoryCursor = -1;
let mpSynFinished = false;
let mpBwSteps = [];
let mpBwCursor = 0;
let mpBwExecutionMode = 'auto';
let mpBwPaused = false;
let mpBwFinished = false;
let mpBwHistory = [];
let mpBwHistoryCursor = -1;
let mpBwFastForward = false;
let mpBwInitialSteps = [];
let mpSkipAnimations = false;
let mpManualHistory = [];
let mpManualInfoIndex = -1;
let mpManualInfoOpen = false;
let mpRandomMin = 1;
let mpRandomMax = 99;

function mpLang(){
  return trPage('multipop');
}

function mpFill(template, variables){
  let output = String(template || '');

  for(const [key, value] of Object.entries(variables || {}))
    output = output.split(`{${key}}`).join(String(value));

  return output;
}

function mpSigned(value){
  const number = Number(value);
  if(!Number.isFinite(number))
    return '0';

  return number > 0 ? `+${number}` : String(number);
}

function mpDescribeStep(step, langData = mpLang()){
  if(!step)
    return '';
  if(step.type === 'push')
    return `${langData.pushButton} ${step.value}`;
  if(step.type === 'pop')
    return `${langData.popButton}`;
  if(step.type === 'multipop')
    return `${langData.multipopButton}(${step.requestedCount ?? step.count ?? 0})`;

  return step.description || '';
}

function mpBuildStepDetail(step, langData = mpLang()){
  const num = (value) => `<span class="potentialValue">${value}</span>`;
  const pushVal = (value) => `<span class="pushValue">${value}</span>`;
  const popVal = (value) => `<span class="popValue">${value}</span>`;
  const common = {actualCost: num(step.actualCost ?? 0), phiBefore: num(step.phiBefore ?? 0), phiAfter: num(step.phiAfter ?? 0), deltaPhi: num(mpSigned(step.deltaPhi ?? 0)), beforeSize: num(step.beforeSize ?? 0), afterSize: num(step.afterSize ?? 0), requestedCount: num(step.requestedCount ?? step.count ?? 0), actualCount: num(step.actualCount ?? 0)};

  if(step.type === 'push')
    return mpFill(langData.pushDetail || langData.detailNotProvided || '', {...common, value: pushVal(step.value)});
  if(step.type === 'pop'){
    if(step.removedValue !== undefined)
      return mpFill(langData.popDetail || langData.detailNotProvided || '', {...common, removedValue: popVal(step.removedValue)});

    return mpFill(langData.emptyPopDetail || langData.detailNotProvided || '', common);
  }
  if(Array.isArray(step.removedValues) && step.removedValues.length > 0)
    return mpFill(langData.multipopDetail || langData.detailNotProvided || '', {...common, removedValues: step.removedValues.map(value => popVal(value)).join(', ')});

  return mpFill(langData.emptyMultipopDetail || langData.detailNotProvided || '', common);
}

function mpMakeStackSnapshot(){
  return [...stackArray];
}

function mpCreateStateSnapshot(){
  return {snapshot: mpMakeStackSnapshot(), size: stackArray.length, stepCount, potential};
}

function mpApplyState(snapshot, nextStepCount, nextPotential){
  stackArray = Array.isArray(snapshot) ? [...snapshot] : [];
  stepCount = nextStepCount;
  potential = nextPotential;
}

function mpFinalizeStep(step, beforeState, afterSnapshot, actualCost, extra = {}, langData = mpLang()){
  Object.assign(step, extra);

  step.description = mpDescribeStep(step, langData);
  step.beforeSize = beforeState.size;
  step.phiBefore = beforeState.potential;
  step.afterSnapshot = Array.isArray(afterSnapshot) ? [...afterSnapshot] : [];
  step.afterSize = step.afterSnapshot.length;
  step.actualCost = actualCost;
  step.phiAfter = step.afterSize;
  step.deltaPhi = step.phiAfter - step.phiBefore;
  step.afterStepCount = beforeState.stepCount + actualCost;
  step.afterPotential = step.afterSize;
  step.detail = mpBuildStepDetail(step, langData);

  return step;
}

function mpShouldTrackManualHistory(){
  return !isBestWorstMode && !document.getElementById('mpSynPanel');
}

function mpBuildManualHistoryTitle(index, step, langData = mpLang()){
  return `${index + 1}. ${langData.historyCommandLabel || 'Command'}: ${mpDescribeStep(step, langData)}`;
}

function mpAddManualHistoryEntry(step, {snapshot = null, stepCountValue = null, potentialValue = null} = {}){
  mpManualHistory.push({step: JSON.parse(JSON.stringify(step)), snapshot: Array.isArray(snapshot) ? [...snapshot] : (Array.isArray(step.afterSnapshot) ? [...step.afterSnapshot] : mpMakeStackSnapshot()), stepCount: Number.isFinite(stepCountValue) ? stepCountValue : (Number.isFinite(step.afterStepCount) ? step.afterStepCount : stepCount), potential: Number.isFinite(potentialValue) ? potentialValue : (Number.isFinite(step.afterPotential) ? step.afterPotential : potential)});
}

function mpClearBestWorstTimer(){
  if(mpBwTimer){
    clearTimeout(mpBwTimer);
    mpBwTimer = null;
  }
}

function mpResetSyntaxRuntimeState(){
  syntaxCommands = [];
  currentCommandIndex = 0;
  steps = [];
  mpSynHistory = [];
  mpSynHistoryCursor = -1;
  mpSynFinished = false;
}

function mpResetBestWorstRuntimeState(){
  mpBestWorstMode = null;
  mpBwSteps = [];
  mpBwCursor = 0;
  mpBwExecutionMode = 'auto';
  mpBwPaused = false;
  mpBwFinished = false;
  mpBwHistory = [];
  mpBwHistoryCursor = -1;
  mpBwFastForward = false;
  mpBwInitialSteps = [];
}

function mpResetManualRuntimeState(){
  mpManualHistory = [];
  mpManualInfoIndex = -1;
  mpManualInfoOpen = false;
}

function mpCancelRunning(){
  mpRunToken++;
  mpClearBestWorstTimer();

  mpBusy = false;
  isBestWorstMode = false;
  mpSkipAnimations = false;

  mpResetSyntaxRuntimeState();
  mpResetBestWorstRuntimeState();
  mpResetManualRuntimeState();
}

function mpResetState(){
  mpClearBestWorstTimer();

  stackArray = [];
  stepCount = 0;
  potential = 0;
  isBestWorstMode = false;
  mpBusy = false;
  mpSkipAnimations = false;

  mpResetSyntaxRuntimeState();
  mpResetBestWorstRuntimeState();
  mpResetManualRuntimeState();
}