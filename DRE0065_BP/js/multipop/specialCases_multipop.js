function mpBwCloneSteps(list){
  return Array.isArray(list) ? list.map(step => ({...step})) : [];
}

function mpBwMakePushSteps(values){
  return values.map(value => ({type: 'push', value}));
}

function mpBwMakeValues(count){
  return typesParamsGenerateValuesInRange(1, 99, count);
}

function mpGetSpecialCaseOptions(){
  const L = mpLang();

  return [
    {id: 'push_growth', title: L.mpScenario01Title, description: L.mpScenario01Desc},
    {id: 'single_pop_after_build', title: L.mpScenario02Title, description: L.mpScenario02Desc},
    {id: 'partial_multipop_after_build', title: L.mpScenario03Title, description: L.mpScenario03Desc},
    {id: 'full_cleanup_multipop', title: L.mpScenario04Title, description: L.mpScenario04Desc},
    {id: 'overshoot_multipop', title: L.mpScenario05Title, description: L.mpScenario05Desc},
    {id: 'alternating_push_pop', title: L.mpScenario06Title, description: L.mpScenario06Desc},
    {id: 'empty_then_recovery', title: L.mpScenario07Title, description: L.mpScenario07Desc},
    {id: 'two_wave_cleanup', title: L.mpScenario08Title, description: L.mpScenario08Desc},
    {id: 'many_small_multipops', title: L.mpScenario09Title, description: L.mpScenario09Desc},
    {id: 'refill_after_clear', title: L.mpScenario10Title, description: L.mpScenario10Desc}
  ];
}

function mpBwGetScenarioDef(id = mpBestWorstMode){
  const scenarios = mpGetSpecialCaseOptions();
  return scenarios.find(scenario => scenario.id === id) || scenarios[0];
}

function mpBwBuildScenarioSteps(scenarioId){
  switch(scenarioId){
    case 'push_growth': {
      const size = getRandomIntInclusive(6, 10);
      return mpBwMakePushSteps(mpBwMakeValues(size));
    }
    case 'single_pop_after_build': {
      const size = getRandomIntInclusive(5, 9);
      return [...mpBwMakePushSteps(mpBwMakeValues(size)), {type: 'pop'}];
    }
    case 'partial_multipop_after_build': {
      const size = getRandomIntInclusive(7, 10);
      const removeCount = getRandomIntInclusive(2, size - 2);

      return [...mpBwMakePushSteps(mpBwMakeValues(size)), {type: 'multipop', count: removeCount}];
    }
    case 'full_cleanup_multipop': {
      const size = getRandomIntInclusive(6, 9);
      return [...mpBwMakePushSteps(mpBwMakeValues(size)), {type: 'multipop', count: size}];
    }
    case 'overshoot_multipop': {
      const size = getRandomIntInclusive(3, 5);
      return [...mpBwMakePushSteps(mpBwMakeValues(size)), {type: 'multipop', count: size + getRandomIntInclusive(2, 5)}];
    }
    case 'alternating_push_pop': {
      const rounds = getRandomIntInclusive(4, 6);
      const steps = [];
      const values = mpBwMakeValues(rounds + 2);

      for(let i = 0; i < rounds; i++){
        steps.push({type: 'push', value: values[i]});
        steps.push({type: 'pop'});
      }

      steps.push({type: 'push', value: values[rounds]});
      steps.push({type: 'push', value: values[rounds + 1]});

      return steps;
    }
    case 'empty_then_recovery': {
      const values = mpBwMakeValues(3);
      return [{type: 'pop'}, {type: 'multipop', count: getRandomIntInclusive(2, 4)}, {type: 'push', value: values[0]}, {type: 'push', value: values[1]}, {type: 'push', value: values[2]}, {type: 'pop'}];
    }
    case 'two_wave_cleanup': {
      const wave1 = mpBwMakeValues(getRandomIntInclusive(3, 5));
      const wave2 = mpBwMakeValues(getRandomIntInclusive(3, 5));

      return [...mpBwMakePushSteps(wave1), {type: 'multipop', count: getRandomIntInclusive(1, Math.max(1, wave1.length - 1))}, ...mpBwMakePushSteps(wave2), {type: 'multipop', count: wave1.length + wave2.length}];
    }
    case 'many_small_multipops': {
      const values = mpBwMakeValues(6);
      return [{type: 'push', value: values[0]}, {type: 'push', value: values[1]}, {type: 'push', value: values[2]}, {type: 'multipop', count: 1}, {type: 'push', value: values[3]}, {type: 'multipop', count: 2}, {type: 'push', value: values[4]}, {type: 'push', value: values[5]}, {type: 'multipop', count: 1}];
    }
    default: {
      const firstWave = mpBwMakeValues(getRandomIntInclusive(4, 6));
      const secondWave = mpBwMakeValues(getRandomIntInclusive(3, 5));
      
      return [...mpBwMakePushSteps(firstWave), {type: 'multipop', count: firstWave.length}, ...mpBwMakePushSteps(secondWave), {type: 'pop'}, {type: 'multipop', count: secondWave.length + 1}];
    }
  }
}

function mpBwRefreshStepLabels(){
  const L = mpLang();

  for(const step of mpBwSteps)
    step.description = mpDescribeStep(step, L);
}

function mpBwBuildPreviewStep(step){
  if(!step)
    return null;

  const beforeState = mpCreateStateSnapshot();
  const preview = {...step};

  if(preview.type === 'push')
    return mpFinalizeStep(preview, beforeState, [...beforeState.snapshot, preview.value], 1, {value: preview.value});
  if(preview.type === 'pop'){
    if(beforeState.size === 0)
      return mpFinalizeStep(preview, beforeState, beforeState.snapshot, 0);

    const removedValue = beforeState.snapshot[beforeState.size - 1];
    return mpFinalizeStep(preview, beforeState, beforeState.snapshot.slice(0, -1), 1, {removedValue});
  }

  const requestedCount = preview.count;
  const actualCount = Math.min(requestedCount, beforeState.size);
  const afterSnapshot = beforeState.snapshot.slice(0, beforeState.size - actualCount);

  return mpFinalizeStep(preview, beforeState, afterSnapshot, actualCount, {requestedCount, actualCount, ...(actualCount > 0 ? {removedValues: beforeState.snapshot.slice(-actualCount).reverse()} : {})});
}

function mpBwSaveHistoryEntry(step){
  const L = mpLang();
  const prevTotal = mpBwHistory.length ? (mpBwSteps[mpBwHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  mpDecorateRecordedStep(step, prevTotal, L);

  const title = `${mpBwCursor + 1}/${mpBwSteps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  mpBwHistory.push({title, detailHtml, snapshot: mpMakeStackSnapshot(), stepCount, potential});
  mpBwHistoryCursor = mpBwHistory.length - 1;
  updateCounters();
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

function mpBwReplayNextFromHistory(){
  if(mpBwExecutionMode !== 'auto')
    return;
  if(mpBwHistory.length === 0)
    return;
  if(mpBwHistoryCursor < 0 || mpBwHistoryCursor >= mpBwHistory.length - 1)
    return;

  mpBwPaused = true;
  mpBwFastForward = false;
  mpSkipAnimations = false;
  mpClearBestWorstTimer();

  mpBwHistory = mpBwHistory.slice(0, mpBwHistoryCursor + 1);
  mpBwCursor = mpBwHistoryCursor + 1;
  mpBwFinished = false;
  mpBwRunOneStep();
}

function mpBwResetToStartState(){
  mpClearBestWorstTimer();

  mpSkipAnimations = false;
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

  if(mpBwSteps.length > 0){
    mpBwRunOneStep();

    if(mpBwExecutionMode === 'auto' && !mpBwFinished)
      mpBwScheduleNext();
  }
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
    mpBwReplayNextFromHistory();
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
    return buildEmptyHistoryWatermarkHtml();

  return mpBwHistory.map(entry => buildCollapsibleHistoryEntryHtml({title: entry.title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml: entry.detailHtml})).join('');
}

function mpBwOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = mpLang();
    const scenario = mpBwGetScenarioDef();
    
    return {title: `${L.bestWorstHistoryTitle || 'Special case history'} – ${scenario.title} – ${L.multipopTitle || 'Multipop on Stack'}`, bodyHtml: mpBwBuildHistoryModalHtml()};
  });
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