function mpBwCloneSteps(list){
  return Array.isArray(list) ? list.map(step => ({...step})) : [];
}

function mpBwGenerateRandomValues(count, min = 1, max = 99){
  return Array.from({length: count}, () => getRandomIntInclusive(min, max));
}

function mpBwBuildScenarioSteps(mode){
  const size = getRandomIntInclusive(4, 10);
  const values = mpBwGenerateRandomValues(size);
  const removeCount = (mode === 'best') ? getRandomIntInclusive(1, Math.max(1, size - 1)) : size;

  return [...values.map(value => ({type: 'push', value})), {type: 'multipop', count: removeCount}];
}

function mpBwRefreshStepLabels(){
  const L = mpLang();

  for(const step of mpBwSteps)
    step.description = mpDescribeStep(step, L);
}

function mpBwSaveHistoryEntry(step){
  const L = mpLang();
  const title = `${mpBwCursor + 1}/${mpBwSteps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  mpBwHistory.push({title, detailHtml, snapshot: mpMakeStackSnapshot(), stepCount, potential});
  mpBwHistoryCursor = mpBwHistory.length - 1;
}

function mpBwRestoreHistoryEntry(index){
  if(index < 0 || index >= mpBwHistory.length)
    return;

  mpBwHistoryCursor = index;

  const entry = mpBwHistory[index];
  mpApplyState(entry.snapshot, entry.stepCount, entry.potential);

  updateStackView();
  updateCounters();
  mpBwRenderInfo();
}

function mpBwRestoreLatestHistoryEntry(){
  if(mpBwHistory.length === 0)
    return;

  mpBwRestoreHistoryEntry(mpBwHistory.length - 1);
}

function mpBwResetToStartState(){
  mpClearBestWorstTimer();

  mpSkipAnimations = false;
  mpRunToken++;
  mpApplyState([], 0, 0);

  mpBwCursor = 0;
  mpBwFinished = false;
  mpBwPaused = true;
  mpBwFastForward = false;
  mpBwHistory = [];
  mpBwHistoryCursor = -1;

  mpBwSteps = (Array.isArray(mpBwInitialSteps) && mpBwInitialSteps.length > 0) ? mpBwCloneSteps(mpBwInitialSteps) : mpBwBuildScenarioSteps(mpBestWorstMode);
  mpBwRefreshStepLabels();

  updateStackView();
  updateCounters();
  mpBwRenderInfo();
}

function mpBwAfterStepSettles(step){
  if(mpBusy){
    setTimeout(() => mpBwAfterStepSettles(step), 30);
    return;
  }

  mpBwSaveHistoryEntry(step);
  mpBwCursor++;

  if(mpBwCursor >= mpBwSteps.length){
    mpBwFinished = true;
    mpBwPaused = false;
    mpBwFastForward = false;
    mpSkipAnimations = false;
  }

  mpBwRenderInfo();

  if(mpBwExecutionMode === 'auto' && !mpBwPaused && !mpBwFinished)
    mpBwScheduleNext();
}

function mpBwRunOneStep(){
  if(mpBusy || mpBwFinished)
    return;

  if(mpBwHistory.length > 0 && mpBwHistoryCursor !== mpBwHistory.length - 1)
    mpBwRestoreLatestHistoryEntry();
  if(mpBwCursor >= mpBwSteps.length){
    mpBwFinished = true;
    mpBwPaused = false;
    mpBwFastForward = false;
    mpBwRenderInfo();

    return;
  }

  const step = mpBwSteps[mpBwCursor];
  mpExecuteStep(step);
  mpBwAfterStepSettles(step);
}

function mpBwScheduleNext(){
  if(mpBwExecutionMode !== 'auto' || mpBwPaused || mpBwFinished)
    return;

  mpClearBestWorstTimer();

  mpBwTimer = setTimeout(() => {
    if(mpBwPaused || mpBwFinished)
      return;

    mpBwRunOneStep();
  }, mpSkipAnimations ? 0 : (mpBwFastForward ? 20 : 1200));
}

function mpStartBestWorst(mode, executionMode = 'auto'){
  $('#bestWorstModal').modal('hide');
  mpClearBestWorstTimer();

  if(typeof mpResetState === 'function')
    mpResetState();

  mpBestWorstMode = mode;
  isBestWorstMode = true;
  mpBwExecutionMode = executionMode;
  mpBwPaused = false;
  mpBwFinished = false;
  mpBwFastForward = false;
  mpBwHistory = [];
  mpBwHistoryCursor = -1;
  mpBwCursor = 0;

  mpBwInitialSteps = mpBwCloneSteps(mpBwBuildScenarioSteps(mode));
  mpBwSteps = mpBwCloneSteps(mpBwInitialSteps);
  mpBwRefreshStepLabels();

  if(typeof mpRenderBestWorstUI === 'function')
    mpRenderBestWorstUI(mode, executionMode);

  updateStackView();
  updateCounters();
  mpBwRenderInfo();

  if(mpBwSteps.length > 0){
    mpBwRunOneStep();

    if(mpBwExecutionMode === 'auto' && !mpBwFinished)
      mpBwScheduleNext();
  }
}

function executeBestCase(executionMode = 'auto'){
  mpStartBestWorst('best', executionMode);
}

function executeWorstCase(executionMode = 'auto'){
  mpStartBestWorst('worst', executionMode);
}

function mpBwTogglePlayPause(){
  const hasHistory = mpBwHistory.length > 0;
  const viewingFinal = mpBwFinished && hasHistory && mpBwHistoryCursor >= mpBwHistory.length - 1;

  if(viewingFinal){
    mpBwRenderInfo();
    return;
  }

  if(hasHistory && mpBwHistoryCursor >= 0 && mpBwHistoryCursor < mpBwHistory.length - 1){
    mpBwHistory = mpBwHistory.slice(0, mpBwHistoryCursor + 1);
    mpBwCursor = mpBwHistoryCursor + 1;
    mpBwFinished = false;
  }

  mpBwPaused = !mpBwPaused;
  mpBwFastForward = false;
  mpSkipAnimations = false;

  if(mpBwPaused)
    mpClearBestWorstTimer();
  else
    mpBwScheduleNext();

  mpBwRenderInfo();
}

function mpBwGoDelta(delta){
  if(mpBwExecutionMode !== 'auto')
    return;

  if(mpBwHistory.length === 0){
    if(delta > 0 && !mpBwFinished)
      mpBwRunOneStep();
    return;
  }

  mpBwPaused = true;
  mpBwFastForward = false;
  mpClearBestWorstTimer();

  if(delta < 0){
    if(mpBwHistoryCursor > 0){
      mpBwRestoreHistoryEntry(mpBwHistoryCursor - 1);
      return;
    }
    if(mpBwHistoryCursor === 0){
      mpBwResetToStartState();
      return;
    }

    return;
  }

  if(mpBwHistoryCursor < mpBwHistory.length - 1){
    mpBwRestoreHistoryEntry(mpBwHistoryCursor + 1);
    return;
  }

  if(!mpBwFinished)
    mpBwRunOneStep();
}

function mpBwJumpToStart(){
  mpBwResetToStartState();
}

function mpBwJumpToEnd(){
  if(mpBwExecutionMode !== 'auto' || mpBwHistory.length === 0)
    return;

  if(mpBwFinished){
    mpBwRestoreHistoryEntry(mpBwHistory.length - 1);
    return;
  }

  if(mpBwHistoryCursor !== mpBwHistory.length - 1)
    mpBwRestoreLatestHistoryEntry();

  mpBwPaused = false;
  mpBwFastForward = true;
  mpSkipAnimations = true;
  mpBwScheduleNext();
}

function mpBwNextOrEnd(){
  if(mpBwFinished){
    mpResetState();
    returnToMainPageFromSyntax('multipop');
    
    return;
  }

  mpBwRunOneStep();
}

function mpBwBuildHistoryModalHtml(){
  const L = mpLang();

  if(!Array.isArray(mpBwHistory) || mpBwHistory.length === 0)
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  return mpBwHistory.map(entry => `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${entry.title}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount} |
        ${L.potential}: ${entry.potential}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>`).join('');
}

function mpBwOpenHistoryModal(){
  const L = mpLang();
  openSyntaxHistoryModal(`${L.bestWorstHistoryTitle || 'Best / Worst case history'} – ${L.multipopTitle || 'Multipop on Stack'}`, mpBwBuildHistoryModalHtml());
}

function rebuildMpBestWorstForLanguage(){
  if(!isBestWorstMode || !Array.isArray(mpBwSteps) || mpBwSteps.length === 0)
    return;

  const L = mpLang();
  mpBwRefreshStepLabels();

  for(const step of mpBwSteps){
    if(step.actualCost !== undefined)
      step.detail = mpBuildStepDetail(step, L);
  }

  mpBwHistory = mpBwHistory.map((entry, index) => {
    const step = mpBwSteps[index];
    if(!step)
      return entry;

    return {...entry, title: `${index + 1}/${mpBwSteps.length}: ${step.description}`, detailHtml: (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '')};
  });

  mpBwRenderInfo();
}