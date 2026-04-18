function sScBuildSteps(mode){
  switch(mode){
    case 'balanced_small_build': {
      const v = sScMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b}, {op: 'insert', value: v.d}];
    }
    case 'ascending_build': {
      return sScMakeAscendingRun(6).map(value => ({op: 'insert', value}));
    }
    case 'descending_build': {
      return sScMakeDescendingRun(6).map(value => ({op: 'insert', value}));
    }
    case 'repeated_hot_search': {
      const v = sScMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b}, {op: 'insert', value: v.d}, {op: 'search', value: v.b}, {op: 'search', value: v.b},{op: 'search', value: v.b}];
    }
    case 'missing_search_restructure': {
      const v = sScMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b},{op: 'insert', value: v.d}, {op: 'search', value: v.e + 7}];
    }
    case 'delete_existing_value': {
      const v = sScMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b}, {op: 'insert', value: v.d}, {op: 'delete', value: v.b}];
    }
    case 'delete_missing_value': {
      const v = sScMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'insert', value: v.b}, {op: 'insert', value: v.d}, {op: 'delete', value: v.e + 9}];
    }
    case 'insert_search_delete_mix': {
      const v = sScMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'search', value: v.a}, {op: 'insert', value: v.b}, {op: 'delete', value: v.e}, {op: 'search', value: v.b}];
    }
    case 'skew_then_oldest_search': {
      const values = sScMakeAscendingRun(6);
      return [...values.map(value => ({op: 'insert', value})), {op: 'search', value: values[0]}, {op: 'search', value: values[0]}];
    }
    default: {
      const v = sScMakeSpreadFive();
      return [{op: 'insert', value: v.c}, {op: 'insert', value: v.a}, {op: 'insert', value: v.e}, {op: 'search', value: v.d}, {op: 'delete', value: v.a}, {op: 'insert', value: v.b}, {op: 'search', value: v.d}];
    }
  }
}

function sScCloneSteps(list){
  return Array.isArray(list) ? list.map(step => ({...step})) : [];
}

function sScMakeAscendingRun(size){
  const start = getRandomIntInclusive(10, 90 - size);
  return Array.from({length: size}, (_, i) => start + i);
}

function sScMakeDescendingRun(size){
  return sScMakeAscendingRun(size).reverse();
}

function sScMakeSpreadFive(){
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

function sScGetScenarioDef(id = sScMode){
  const scenarios = sGetSpecialCaseOptions();
  return scenarios.find(scenario => scenario.id === id) || scenarios[0];
}

function sScClearTimer(){
  if(sScAutoTimer){
    clearTimeout(sScAutoTimer);
    sScAutoTimer = 0;
  }
}

function sScBuildFirstPreview(){
  const L = sLang();

  const step = Array.isArray(sScSteps) ? sScSteps[0] : null;
  if(!step)
    return null;

  if(step.op === 'insert' && !sRoot){
    const result = {deltaSteps: 1, phiBefore: 0, phiAfter: 0, deltaPhi: 0, traceEvents: [{kind: 'rootInsert', vars: {value: step.value, rootKey: step.value}, deltaSteps: 1, phiBefore: 0, phiAfter: 0, deltaPhi: 0}], rootAfter: step.value, inserted: true, duplicate: false};
    sDecorateRecordedResult(step, result, 0, L);

    return {title: sBuildSplayHistoryTitle(step, 0, sScSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L)};
  }

  return {title: sBuildSplayHistoryTitle(step, 0, sScSteps.length, L), detailHtml: `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${sBuildStepLabel(step, L)}</div>`};
}

function sScFormatPreviewStep(step){
  return step ? sBuildStepLabel(step, sLang()) : '';
}

function sScGetPreviewState(){
  if(!Array.isArray(sScSteps) || sScSteps.length === 0)
    return {prev: '', current: '', next: ''};

  if(sScHistory.length === 0)
    return {prev: '', current: '', next: sScFormatPreviewStep(sScSteps[0])};

  const index = sScHistoryCursor >= 0 ? sScHistoryCursor : (sScHistory.length - 1);
  return {prev: sScFormatPreviewStep(sScSteps[index - 1]), current: sScFormatPreviewStep(sScSteps[index]), next: sScFormatPreviewStep(sScSteps[index + 1])};
}

function sScRenderPreview(animate = false){
  typesParamsSetOperationPreviewVisible('s', sScPreviewVisible);
  if(!sScPreviewVisible)
    return;

  typesParamsUpdateOperationPreview('s', sScGetPreviewState(), animate);
}

function sScSaveHistoryEntry(step, result){
  const L = sLang();
  const prevTotal = sScHistory.length ? (sScResults[sScHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  sDecorateRecordedResult(step, result, prevTotal, L);

  sScHistory.push({title: sBuildSplayHistoryTitle(step, sScIndex, sScSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
  sScHistoryCursor = sScHistory.length - 1;
  sUpdateCounters();
}

function sScRestoreHistoryEntry(index){
  if(index < 0 || index >= sScHistory.length)
    return;

  sScHistoryCursor = index;

  const entry = sScHistory[index];
  sRoot = sCloneTree(entry.snapshot);
  sStepCount = entry.stepCount;
  sPotential = entry.potential;

  sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
  sUpdateCounters();
  sScRenderInfo();
}

function sScRestoreLatestExecuted(){
  if(sScHistory.length === 0)
    return;

  sScRestoreHistoryEntry(sScHistory.length - 1);
}

function sScReplayNextFromHistory(){
  if(sScExecutionMode !== 'auto')
    return;
  if(sScHistory.length === 0)
    return;
  if(sScHistoryCursor < 0 || sScHistoryCursor >= sScHistory.length - 1)
    return;

  sScPaused = true;
  sScFastForward = false;
  sSkipAnimations = false;
  sScClearTimer();

  sScHistory = sScHistory.slice(0, sScHistoryCursor + 1);
  sScResults = sScResults.slice(0, sScHistoryCursor + 1);
  sScIndex = sScHistoryCursor + 1;
  sScFinished = false;
  sScRunOneStep();
}

function sScResetToStepZero(){
  sScClearTimer();

  sSkipAnimations = false;
  sRunToken += 1;
  sRoot = null;
  sNextId = 1;
  sStepCount = 0;
  sPotential = 0;
  sBusy = false;
  sScIndex = 0;
  sScFinished = false;
  sScPaused = true;
  sScFastForward = false;
  sScHistory = [];
  sScHistoryCursor = -1;
  sScResults = [];
  sTraceActive = false;
  sSynCurrentTrace = [];
  sScSteps = (Array.isArray(sScInitialSteps) && sScInitialSteps.length > 0) ? sScCloneSteps(sScInitialSteps) : sScBuildSteps(sScMode);

  sRenderTree({activeId: null, pathIds: []});
  sUpdateCounters();
  sScRenderInfo();
}

function sScBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sScHistory) || sScHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return sScHistory.map(entry => buildCollapsibleHistoryEntryHtml({title: entry.title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${sFmt2(entry.potential)}`, detailHtml: entry.detailHtml})).join('');
}

function sScOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = sLang();
    const scenario = sScGetScenarioDef();
    
    return {title: `${L.specialCasesHistoryTitle || 'Special case history'} – ${scenario.title} – ${L.splayTreeTitle || 'Splay Tree'}`, bodyHtml: sScBuildHistoryModalHtml()};
  });
}

function rebuildSplaySpecialCasesForLanguage(){
  if(!Array.isArray(sScHistory) || sScHistory.length === 0)
    return;
  if(!Array.isArray(sScSteps) || sScSteps.length === 0)
    return;

  const L = sLang();

  sScHistory = sScHistory.map((entry, index) => {
    const step = sScSteps[index];
    const result = sScResults[index] || {};
    if(!step)
      return entry;

    return {...entry, title: sBuildSplayHistoryTitle(step, index, sScSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L)};
  });

  if(document.getElementById('sScPanelTitle'))
    sScRenderInfo();
}

function sScScheduleNext(){
  if(sScExecutionMode !== 'auto' || sScPaused || sScFinished)
    return;

  sScClearTimer();

  const myToken = sRunToken;
  sScAutoTimer = setTimeout(() => {
    if(myToken !== sRunToken || sScPaused || sScFinished)
      return;

    sScRunOneStep();
  }, sSkipAnimations ? 0 : (sScFastForward ? 20 : 350));
}

function sScRunOneStep(){
  if(sBusy || sScFinished)
    return;

  if(sScHistory.length > 0 && sScHistoryCursor !== sScHistory.length - 1)
    sScRestoreLatestExecuted();

  if(sScIndex >= sScSteps.length){
    sScFinished = true;
    sScPaused = false;
    sScFastForward = false;
    sSkipAnimations = false;
    sScRenderInfo();

    return;
  }

  const myToken = sRunToken;
  const step = sScSteps[sScIndex];
  const instant = (sScIndex === 0);

  sBusy = true;
  sSetButtonsEnabled(false);
  sScRenderInfo();

  const beforeSteps = sStepCount;
  sComputePotential();
  const beforePhi = sPotential;

  sTraceReset();
  sTraceActive = true;

  sExecuteStep(step, (resultData = {}) => {
    if(myToken !== sRunToken)
      return;

    const result = sCaptureHistoryResult(beforeSteps, beforePhi, resultData);
    sScResults[sScIndex] = result;
    sScSaveHistoryEntry(step, result);

    sScIndex += 1;
    if(sScIndex >= sScSteps.length){
      sScFinished = true;
      sScPaused = false;
      sScFastForward = false;
      sSkipAnimations = false;
    }

    sBusy = false;
    sSetButtonsEnabled(true);

    sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
    sScRenderInfo();

    if(sScPreviewVisible)
      sScRenderPreview(true);

    if(sScExecutionMode === 'auto' && !sScPaused && !sScFinished)
      sScScheduleNext();
  }, instant);
}

function sScTogglePlayPause(){
  const hasHistory = sScHistory.length > 0;
  const viewingFinal = sScFinished && hasHistory && sScHistoryCursor >= sScHistory.length - 1;

  if(viewingFinal){
    sScRenderInfo();
    return;
  }

  if(hasHistory && sScHistoryCursor >= 0 && sScHistoryCursor < sScHistory.length - 1){
    sScHistory = sScHistory.slice(0, sScHistoryCursor + 1);
    sScResults = sScResults.slice(0, sScHistoryCursor + 1);
    sScIndex = sScHistoryCursor + 1;
    sScFinished = false;
  }

  sScPaused = !sScPaused;
  sScFastForward = false;
  sSkipAnimations = false;

  if(sScPaused)
    sScClearTimer();
  else
    sScScheduleNext();

  sScRenderInfo();
}

function sScGoDelta(delta){
  if(sScExecutionMode !== 'auto')
    return;

  if(sScHistory.length === 0){
    if(delta > 0 && !sScFinished)
      sScRunOneStep();

    return;
  }

  sScPaused = true;
  sScFastForward = false;
  sScClearTimer();

  if(delta < 0){
    if(sScHistoryCursor > 0){
      sScRestoreHistoryEntry(sScHistoryCursor - 1);
      return;
    }
    if(sScHistoryCursor === 0){
      sScResetToStepZero();
      return;
    }

    return;
  }

  if(sScHistoryCursor < sScHistory.length - 1){
    sScReplayNextFromHistory();
    return;
  }

  if(!sScFinished)
    sScRunOneStep();
}

function sScJumpToStart(){
  sScResetToStepZero();
}

function sScJumpToEnd(){
  if(sScExecutionMode !== 'auto' || sScHistory.length === 0)
    return;

  if(sScFinished){
    sScRestoreHistoryEntry(sScHistory.length - 1);
    return;
  }

  if(sScHistoryCursor !== sScHistory.length - 1)
    sScRestoreLatestExecuted();

  sScPaused = false;
  sScFastForward = true;
  sSkipAnimations = true;

  sScScheduleNext();
}

function sScNextOrEnd(){
  if(sScFinished){
    sResetAll();
    returnToMainPageFromSyntax('splayTree');
    
    return;
  }

  sScRunOneStep();
}

function sStartSpecialCases(mode, executionMode = 'auto'){
  $('#specialCasesModal').modal('hide');
  sResetAll();

  sScMode = mode;
  sScInitialSteps = sScCloneSteps(sScBuildSteps(mode));
  sScSteps = sScCloneSteps(sScInitialSteps);
  sScIndex = 0;
  sScExecutionMode = executionMode;
  sScPaused = false;
  sScFinished = false;
  sScFastForward = false;
  sScHistory = [];
  sScHistoryCursor = -1;
  sScResults = [];
  sScPreviewVisible = true;

  sRenderSpecialCasesUI(executionMode);

  if(sScSteps.length > 0){
    sScRunOneStep();

    if(sScExecutionMode === 'auto' && !sScFinished)
      sScScheduleNext();
  }
}