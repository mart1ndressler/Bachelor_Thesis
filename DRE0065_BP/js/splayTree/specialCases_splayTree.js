function sBwBuildSteps(mode){
  switch(mode){
    case 'balanced_small_build': {
      const v = sBwMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b}, {op: 'insert', value: v.d}];
    }
    case 'ascending_build': {
      return sBwMakeAscendingRun(6).map(value => ({op: 'insert', value}));
    }
    case 'descending_build': {
      return sBwMakeDescendingRun(6).map(value => ({op: 'insert', value}));
    }
    case 'repeated_hot_search': {
      const v = sBwMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b}, {op: 'insert', value: v.d}, {op: 'search', value: v.b}, {op: 'search', value: v.b},{op: 'search', value: v.b}];
    }
    case 'missing_search_restructure': {
      const v = sBwMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b},{op: 'insert', value: v.d}, {op: 'search', value: v.e + 7}];
    }
    case 'delete_existing_value': {
      const v = sBwMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b}, {op: 'insert', value: v.d}, {op: 'delete', value: v.b}];
    }
    case 'delete_missing_value': {
      const v = sBwMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b}, {op: 'insert', value: v.d}, {op: 'delete', value: v.e + 9}];
    }
    case 'insert_search_delete_mix': {
      const v = sBwMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'search', value: v.a}, {op: 'insert', value: v.b}, {op: 'delete', value: v.e}, {op: 'search', value: v.b}];
    }
    case 'skew_then_oldest_search': {
      const values = sBwMakeAscendingRun(6);
      return [...values.map(value => ({op: 'insert', value})), {op: 'search', value: values[0]}, {op: 'search', value: values[0]}];
    }
    default: {
      const v = sBwMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'search', value: v.d}, {op: 'delete', value: v.a}, {op: 'insert', value: v.b}, {op: 'search', value: v.d}];
    }
  }
}

function sBwCloneSteps(list){
  return Array.isArray(list) ? list.map(step => ({...step})) : [];
}

function sBwMakeAscendingRun(size){
  const start = getRandomIntInclusive(10, 90 - size);
  return Array.from({length: size}, (_, i) => start + i);
}

function sBwMakeDescendingRun(size){
  return sBwMakeAscendingRun(size).reverse();
}

function sBwMakeSpreadFive(){
  const center = getRandomIntInclusive(30, 60);
  return {a: center - 20, b: center - 10, c: center, d: center + 10, e: center + 20};
}

function sGetSpecialCaseOptions(){
  const L = sLang();

  return [
    {id: 'balanced_small_build', title: L.sScenario01Title, description: L.sScenario01Desc},
    {id: 'ascending_build', title: L.sScenario02Title, description: L.sScenario02Desc},
    {id: 'descending_build', title: L.sScenario03Title, description: L.sScenario03Desc},
    {id: 'repeated_hot_search', title: L.sScenario04Title, description: L.sScenario04Desc},
    {id: 'missing_search_restructure', title: L.sScenario05Title, description: L.sScenario05Desc},
    {id: 'delete_existing_value', title: L.sScenario06Title, description: L.sScenario06Desc},
    {id: 'delete_missing_value', title: L.sScenario07Title, description: L.sScenario07Desc},
    {id: 'insert_search_delete_mix', title: L.sScenario08Title, description: L.sScenario08Desc},
    {id: 'skew_then_oldest_search', title: L.sScenario09Title, description: L.sScenario09Desc},
    {id: 'mixed_updates', title: L.sScenario10Title, description: L.sScenario10Desc}];
}

function sBwGetScenarioDef(id = sBwMode){
  const scenarios = sGetSpecialCaseOptions();
  return scenarios.find(scenario => scenario.id === id) || scenarios[0];
}

function sBwClearTimer(){
  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }
}

function sBwBuildFirstPreview(){
  const L = sLang();

  const step = Array.isArray(sBwSteps) ? sBwSteps[0] : null;
  if(!step)
    return null;

  if(step.op === 'insert' && !sRoot){
    const result = {deltaSteps: 1, phiBefore: 0, phiAfter: 0, deltaPhi: 0, traceEvents: [{kind: 'rootInsert', vars: {value: step.value, rootKey: step.value}, deltaSteps: 1, phiBefore: 0, phiAfter: 0, deltaPhi: 0}], rootAfter: step.value, inserted: true, duplicate: false};
    sDecorateRecordedResult(step, result, 0, L);

    return {title: sBuildSplayHistoryTitle(step, 0, sBwSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L)};
  }

  return {title: sBuildSplayHistoryTitle(step, 0, sBwSteps.length, L), detailHtml: `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${sBuildStepLabel(step, L)}</div>`};
}

function sBwSaveHistoryEntry(step, result){
  const L = sLang();
  const prevTotal = sBwHistory.length ? (sBwResults[sBwHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  sDecorateRecordedResult(step, result, prevTotal, L);

  sBwHistory.push({title: sBuildSplayHistoryTitle(step, sBwIndex, sBwSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
  sBwHistoryCursor = sBwHistory.length - 1;
  sUpdateCounters();
}

function sBwRestoreHistoryEntry(index){
  if(index < 0 || index >= sBwHistory.length)
    return;

  sBwHistoryCursor = index;

  const entry = sBwHistory[index];
  sRoot = sCloneTree(entry.snapshot);
  sStepCount = entry.stepCount;
  sPotential = entry.potential;

  sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
  sUpdateCounters();
  sBwRenderInfo();
}

function sBwRestoreLatestExecuted(){
  if(sBwHistory.length === 0)
    return;

  sBwRestoreHistoryEntry(sBwHistory.length - 1);
}

function sBwReplayNextFromHistory(){
  if(sBwExecutionMode !== 'auto')
    return;
  if(sBwHistory.length === 0)
    return;
  if(sBwHistoryCursor < 0 || sBwHistoryCursor >= sBwHistory.length - 1)
    return;

  sBwPaused = true;
  sBwFastForward = false;
  sSkipAnimations = false;
  sBwClearTimer();

  sBwHistory = sBwHistory.slice(0, sBwHistoryCursor + 1);
  sBwResults = sBwResults.slice(0, sBwHistoryCursor + 1);
  sBwIndex = sBwHistoryCursor + 1;
  sBwFinished = false;
  sBwRunOneStep();
}

function sBwResetToStepZero(){
  sBwClearTimer();

  sSkipAnimations = false;
  sRunToken += 1;
  sRoot = null;
  sNextId = 1;
  sStepCount = 0;
  sPotential = 0;
  sBusy = false;
  sBwIndex = 0;
  sBwFinished = false;
  sBwPaused = true;
  sBwFastForward = false;
  sBwHistory = [];
  sBwHistoryCursor = -1;
  sBwResults = [];
  sTraceActive = false;
  sSynCurrentTrace = [];
  sBwSteps = (Array.isArray(sBwInitialSteps) && sBwInitialSteps.length > 0) ? sBwCloneSteps(sBwInitialSteps) : sBwBuildSteps(sBwMode);

  sRenderTree({activeId: null, pathIds: []});
  sUpdateCounters();
  sBwRenderInfo();
}

function sBwBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sBwHistory) || sBwHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return sBwHistory.map(entry => buildCollapsibleHistoryEntryHtml({title: entry.title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${sFmt2(entry.potential)}`, detailHtml: entry.detailHtml})).join('');
}

function sBwOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = sLang();
    const scenario = sBwGetScenarioDef();
    
    return {title: `${L.bestWorstHistoryTitle || 'Special case history'} – ${scenario.title} – ${L.splayTreeTitle || 'Splay Tree'}`, bodyHtml: sBwBuildHistoryModalHtml()};
  });
}

function rebuildSplayBestWorstForLanguage(){
  if(!Array.isArray(sBwHistory) || sBwHistory.length === 0)
    return;
  if(!Array.isArray(sBwSteps) || sBwSteps.length === 0)
    return;

  const L = sLang();

  sBwHistory = sBwHistory.map((entry, index) => {
    const step = sBwSteps[index];
    const result = sBwResults[index] || {};
    if(!step)
      return entry;

    return {...entry, title: sBuildSplayHistoryTitle(step, index, sBwSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L)};
  });

  if(document.getElementById('sBwPanelTitle'))
    sBwRenderInfo();
}

function sBwScheduleNext(){
  if(sBwExecutionMode !== 'auto' || sBwPaused || sBwFinished)
    return;

  sBwClearTimer();

  const myToken = sRunToken;
  sBwAutoTimer = setTimeout(() => {
    if(myToken !== sRunToken || sBwPaused || sBwFinished)
      return;

    sBwRunOneStep();
  }, sSkipAnimations ? 0 : (sBwFastForward ? 20 : 350));
}

function sBwRunOneStep(){
  if(sBusy || sBwFinished)
    return;

  if(sBwHistory.length > 0 && sBwHistoryCursor !== sBwHistory.length - 1)
    sBwRestoreLatestExecuted();

  if(sBwIndex >= sBwSteps.length){
    sBwFinished = true;
    sBwPaused = false;
    sBwFastForward = false;
    sSkipAnimations = false;
    sBwRenderInfo();

    return;
  }

  const myToken = sRunToken;
  const step = sBwSteps[sBwIndex];
  const instant = (sBwIndex === 0);

  sBusy = true;
  sSetButtonsEnabled(false);

  const beforeSteps = sStepCount;
  sComputePotential();
  const beforePhi = sPotential;

  sTraceReset();
  sTraceActive = true;

  sExecuteStep(step, (resultData = {}) => {
    if(myToken !== sRunToken)
      return;

    const result = sCaptureHistoryResult(beforeSteps, beforePhi, resultData);
    sBwResults[sBwIndex] = result;
    sBwSaveHistoryEntry(step, result);

    sBwIndex += 1;
    if(sBwIndex >= sBwSteps.length){
      sBwFinished = true;
      sBwPaused = false;
      sBwFastForward = false;
      sSkipAnimations = false;
    }

    sBusy = false;
    sSetButtonsEnabled(true);

    sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
    sBwRenderInfo();

    if(sBwExecutionMode === 'auto' && !sBwPaused && !sBwFinished)
      sBwScheduleNext();
  }, instant);
}

function sBwTogglePlayPause(){
  const hasHistory = sBwHistory.length > 0;
  const viewingFinal = sBwFinished && hasHistory && sBwHistoryCursor >= sBwHistory.length - 1;

  if(viewingFinal){
    sBwRenderInfo();
    return;
  }

  if(hasHistory && sBwHistoryCursor >= 0 && sBwHistoryCursor < sBwHistory.length - 1){
    sBwHistory = sBwHistory.slice(0, sBwHistoryCursor + 1);
    sBwResults = sBwResults.slice(0, sBwHistoryCursor + 1);
    sBwIndex = sBwHistoryCursor + 1;
    sBwFinished = false;
  }

  sBwPaused = !sBwPaused;
  sBwFastForward = false;
  sSkipAnimations = false;

  if(sBwPaused)
    sBwClearTimer();
  else
    sBwScheduleNext();

  sBwRenderInfo();
}

function sBwGoDelta(delta){
  if(sBwExecutionMode !== 'auto')
    return;

  if(sBwHistory.length === 0){
    if(delta > 0 && !sBwFinished)
      sBwRunOneStep();

    return;
  }

  sBwPaused = true;
  sBwFastForward = false;
  sBwClearTimer();

  if(delta < 0){
    if(sBwHistoryCursor > 0){
      sBwRestoreHistoryEntry(sBwHistoryCursor - 1);
      return;
    }
    if(sBwHistoryCursor === 0){
      sBwResetToStepZero();
      return;
    }

    return;
  }

  if(sBwHistoryCursor < sBwHistory.length - 1){
    sBwReplayNextFromHistory();
    return;
  }

  if(!sBwFinished)
    sBwRunOneStep();
}

function sBwJumpToStart(){
  sBwResetToStepZero();
}

function sBwJumpToEnd(){
  if(sBwExecutionMode !== 'auto' || sBwHistory.length === 0)
    return;

  if(sBwFinished){
    sBwRestoreHistoryEntry(sBwHistory.length - 1);
    return;
  }

  if(sBwHistoryCursor !== sBwHistory.length - 1)
    sBwRestoreLatestExecuted();

  sBwPaused = false;
  sBwFastForward = true;
  sSkipAnimations = true;

  sBwScheduleNext();
}

function sBwNextOrEnd(){
  if(sBwFinished){
    sResetAll();
    returnToMainPageFromSyntax('splayTree');
    
    return;
  }

  sBwRunOneStep();
}

function sStartBestWorst(mode, executionMode = 'auto'){
  $('#bestWorstModal').modal('hide');
  sResetAll();

  sBwMode = mode;
  sBwInitialSteps = sBwCloneSteps(sBwBuildSteps(mode));
  sBwSteps = sBwCloneSteps(sBwInitialSteps);
  sBwIndex = 0;
  sBwExecutionMode = executionMode;
  sBwPaused = false;
  sBwFinished = false;
  sBwFastForward = false;
  sBwHistory = [];
  sBwHistoryCursor = -1;
  sBwResults = [];

  sRenderBestWorstUI(executionMode);

  if(sBwSteps.length > 0){
    sBwRunOneStep();

    if(sBwExecutionMode === 'auto' && !sBwFinished)
      sBwScheduleNext();
  }
}