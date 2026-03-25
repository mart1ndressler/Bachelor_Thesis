function sBwRandInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sBwBuildSteps(mode){
  if(mode === 'best'){
    const root = sBwRandInt(25, 70);
    const left = root - sBwRandInt(5, 15);
    const right = root + sBwRandInt(5, 15);

    return [{op: 'insert', value: root}, {op: 'insert', value: left}, {op: 'insert', value: right}, {op: 'delete', value: right}];
  }

  const size = sBwRandInt(6, 10);
  const start = sBwRandInt(1, 99 - size);

  const steps = [];
  for(let i = 0; i < size; i++)
    steps.push({op: 'insert', value: start + i});

  steps.push({op: 'delete', value: start});
  return steps;
}

function sBwCloneSteps(list){
  return Array.isArray(list) ? list.map(step => ({...step})) : [];
}

function sBwClearTimer(){
  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }
}

function sBwSaveHistoryEntry(step, result){
  const L = sLang();

  sBwHistory.push({title: sBuildSplayHistoryTitle(step, sBwIndex, sBwSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
  sBwHistoryCursor = sBwHistory.length - 1;
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
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  return sBwHistory.map(entry => `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${entry.title}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount} |
        ${L.potential}: ${sFmt2(entry.potential)}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>`).join('');
}

function sBwOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = sLang();
    return {title: `${L.bestWorstHistoryTitle || 'Best / Worst case history'} – ${L.splayTreeTitle || 'Splay Tree'}`, bodyHtml: sBwBuildHistoryModalHtml()};
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
    sBwRestoreHistoryEntry(sBwHistoryCursor + 1);
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