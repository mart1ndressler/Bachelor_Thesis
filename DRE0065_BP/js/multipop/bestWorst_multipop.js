function mpBwRandInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mpBwRandomValues(count, min = 1, max = 99){
  return Array.from({length: count}, () => mpBwRandInt(min, max));
}

function mpCloneBwSteps(list){
  return Array.isArray(list) ? list.map(step => ({...step})) : [];
}

function mpBuildBestWorstSteps(mode){
  const size = mpBwRandInt(4, 10);
  const values = mpBwRandomValues(size);
  const removeCount = (mode === 'best') ? mpBwRandInt(1, Math.max(1, size - 1)) : size;

  return [...values.map(value => ({type:'push', value})), {type:'multipop', count: removeCount}];
}

function mpBwMakeSnapshot(){
  return [...stackArray];
}

function mpBwApplyLocalizedStepLabels(){
  const L = mpLang();

  for(const s of mpBwSteps){
    if(s.type === 'push')
      s.description = `${L.pushButton} ${s.value}`;
    else if(s.type === 'pop')
      s.description = `${L.popButton}`;
    else
      s.description = `${L.multipopButton}(${s.count})`;
  }
}

function mpBwSaveHistoryEntry(step){
  const L = mpLang();

  mpBwHistory.push({title: `${mpBwCursor + 1}/${mpBwSteps.length}: ${step.description}`, detailHtml: (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || ''), snapshot: mpBwMakeSnapshot(), stepCount, potential});
  mpBwHistoryCursor = mpBwHistory.length - 1;
}

function mpBwRestoreHistoryEntry(index){
  if(index < 0 || index >= mpBwHistory.length)
    return;

  mpBwHistoryCursor = index;

  const entry = mpBwHistory[index];
  stackArray = [...entry.snapshot];
  stepCount = entry.stepCount;
  potential = entry.potential;

  updateStackView();
  updateCounters();
  mpBwRenderInfo();
}

function mpBwRestoreLatestExecuted(){
  if(mpBwHistory.length === 0)
    return;

  mpBwRestoreHistoryEntry(mpBwHistory.length - 1);
}

function mpBwResetToStepZero(){
  if(mpBwTimer){
    clearTimeout(mpBwTimer);
    mpBwTimer = null;
  }

  mpSkipAnimations = false;
  mpRunToken++;
  stackArray = [];
  stepCount = 0;
  potential = 0;
  mpBwCursor = 0;
  mpBwFinished = false;
  mpBwPaused = true;
  mpBwFastForward = false;
  mpBwHistory = [];
  mpBwHistoryCursor = -1;

  mpBwSteps = (Array.isArray(mpBwInitialSteps) && mpBwInitialSteps.length > 0) ? mpCloneBwSteps(mpBwInitialSteps) : mpBuildBestWorstSteps(mpBestWorstMode);
  mpBwApplyLocalizedStepLabels();

  updateStackView();
  updateCounters();
  mpBwRenderInfo();
}

function mpBwReplayHistoryForward(){
  if(!mpBwFinished || mpBwHistory.length === 0){
    mpBwScheduleNext();
    return;
  }

  if(mpBwHistoryCursor >= mpBwHistory.length - 1){
    mpBwPaused = false;
    mpBwRenderInfo();
    return;
  }

  if(mpBwTimer){
    clearTimeout(mpBwTimer);
    mpBwTimer = null;
  }

  mpBwTimer = setTimeout(() => {
    if(mpBwPaused)
      return;

    if(mpBwHistoryCursor < mpBwHistory.length - 1)
      mpBwRestoreHistoryEntry(mpBwHistoryCursor + 1);

    if(mpBwHistoryCursor >= mpBwHistory.length - 1){
      mpBwPaused = false;
      mpBwRenderInfo();
      return;
    }

    mpBwReplayHistoryForward();
  }, mpBwFastForward ? 20 : 1200);
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
    mpBwRestoreLatestExecuted();

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

  if(mpBwTimer){
    clearTimeout(mpBwTimer);
    mpBwTimer = null;
  }

  mpBwTimer = setTimeout(() => {
    if(mpBwPaused || mpBwFinished)
      return;

    mpBwRunOneStep();
  }, mpSkipAnimations ? 0 : (mpBwFastForward ? 20 : 1200));
}

function mpStartBestWorst(mode, executionMode = 'auto'){
  $('#bestWorstModal').modal('hide');

  if(mpBwTimer){
    clearTimeout(mpBwTimer);
    mpBwTimer = null;
  }

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

  mpBwInitialSteps = mpCloneBwSteps(mpBuildBestWorstSteps(mode));
  mpBwSteps = mpCloneBwSteps(mpBwInitialSteps);
  mpBwApplyLocalizedStepLabels();

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

  if(mpBwFinished){
    const viewingFinal = hasHistory && mpBwHistoryCursor >= mpBwHistory.length - 1;
    if(viewingFinal){
      mpBwRenderInfo();
      return;
    }

    mpBwPaused = !mpBwPaused;
    if(mpBwPaused){
      if(mpBwTimer){
        clearTimeout(mpBwTimer);
        mpBwTimer = null;
      }
    }
    else
      mpBwReplayHistoryForward();

    mpBwRenderInfo();
    return;
  }

  if(hasHistory && mpBwHistoryCursor !== mpBwHistory.length - 1)
    mpBwRestoreLatestExecuted();

  mpBwPaused = !mpBwPaused;
  if(mpBwPaused){
    if(mpBwTimer){
      clearTimeout(mpBwTimer);
      mpBwTimer = null;
    }
  }
  else
    mpBwScheduleNext();

  mpBwRenderInfo();
}

function mpBwRestart(){
  if(!mpBestWorstMode)
    return;

  mpStartBestWorst(mpBestWorstMode, mpBwExecutionMode);
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

  if(mpBwTimer){
    clearTimeout(mpBwTimer);
    mpBwTimer = null;
  }

  if(delta < 0){
    if(mpBwHistoryCursor > 0){
      mpBwRestoreHistoryEntry(mpBwHistoryCursor - 1);
      return;
    }

    if(mpBwHistoryCursor === 0){
      mpBwResetToStepZero();
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
  mpBwResetToStepZero();
}

function mpBwJumpToEnd(){
  if(mpBwExecutionMode !== 'auto' || mpBwHistory.length === 0)
    return;

  if(mpBwFinished){
    mpBwRestoreHistoryEntry(mpBwHistory.length - 1);
    return;
  }

  if(mpBwHistoryCursor !== mpBwHistory.length - 1)
    mpBwRestoreLatestExecuted();

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

  mpBwApplyLocalizedStepLabels();

  for(const s of mpBwSteps){
    if(s.actualCost !== undefined)
      s.detail = mpBuildStepDetail(s, L);
  }

  mpBwHistory = mpBwHistory.map((entry, i) => {
    const s = mpBwSteps[i];
    if(!s)
      return entry;

    return {...entry, title: `${i + 1}/${mpBwSteps.length}: ${s.description}`, detailHtml: (s.detail && String(s.detail).trim()) ? s.detail : (L.detailNotProvided || '')};
  });

  mpBwRenderInfo();
}