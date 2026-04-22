function mpScCloneSteps(list){
  return Array.isArray(list) ? list.map(step => ({...step})) : [];
}

function mpScMakePushSteps(values){
  return values.map(value => ({type: 'push', value}));
}

function mpScMakeValues(count){
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

function mpScGetScenarioDef(id = mpSpecialCasesMode){
  const scenarios = mpGetSpecialCaseOptions();
  return scenarios.find(scenario => scenario.id === id) || scenarios[0];
}

function mpScBuildScenarioSteps(scenarioId){
  switch(scenarioId){
    case 'push_growth': {
      const size = getRandomIntInclusive(6, 10);
      return mpScMakePushSteps(mpScMakeValues(size));
    }
    case 'single_pop_after_build': {
      const size = getRandomIntInclusive(5, 9);
      return [...mpScMakePushSteps(mpScMakeValues(size)), {type: 'pop'}];
    }
    case 'partial_multipop_after_build': {
      const size = getRandomIntInclusive(7, 10);
      const removeCount = getRandomIntInclusive(2, size - 2);

      return [...mpScMakePushSteps(mpScMakeValues(size)), {type: 'multipop', count: removeCount}];
    }
    case 'full_cleanup_multipop': {
      const size = getRandomIntInclusive(6, 9);
      return [...mpScMakePushSteps(mpScMakeValues(size)), {type: 'multipop', count: size}];
    }
    case 'overshoot_multipop': {
      const size = getRandomIntInclusive(3, 5);
      return [...mpScMakePushSteps(mpScMakeValues(size)), {type: 'multipop', count: size + getRandomIntInclusive(2, 5)}];
    }
    case 'alternating_push_pop': {
      const rounds = getRandomIntInclusive(4, 6);
      const steps = [];
      const values = mpScMakeValues(rounds + 2);

      for(let i = 0; i < rounds; i++){
        steps.push({type: 'push', value: values[i]});
        steps.push({type: 'pop'});
      }

      steps.push({type: 'push', value: values[rounds]});
      steps.push({type: 'push', value: values[rounds + 1]});

      return steps;
    }
    case 'empty_then_recovery': {
      const values = mpScMakeValues(3);
      return [{type: 'pop'}, {type: 'multipop', count: getRandomIntInclusive(2, 4)}, {type: 'push', value: values[0]}, {type: 'push', value: values[1]}, {type: 'push', value: values[2]}, {type: 'pop'}];
    }
    case 'two_wave_cleanup': {
      const wave1 = mpScMakeValues(getRandomIntInclusive(3, 5));
      const wave2 = mpScMakeValues(getRandomIntInclusive(3, 5));

      return [...mpScMakePushSteps(wave1), {type: 'multipop', count: getRandomIntInclusive(1, Math.max(1, wave1.length - 1))}, ...mpScMakePushSteps(wave2), {type: 'multipop', count: wave1.length + wave2.length}];
    }
    case 'many_small_multipops': {
      const values = mpScMakeValues(6);
      return [{type: 'push', value: values[0]}, {type: 'push', value: values[1]}, {type: 'push', value: values[2]}, {type: 'multipop', count: 1}, {type: 'push', value: values[3]}, {type: 'multipop', count: 2}, {type: 'push', value: values[4]}, {type: 'push', value: values[5]}, {type: 'multipop', count: 1}];
    }
    default: {
      const firstWave = mpScMakeValues(getRandomIntInclusive(4, 6));
      const secondWave = mpScMakeValues(getRandomIntInclusive(3, 5));
      
      return [...mpScMakePushSteps(firstWave), {type: 'multipop', count: firstWave.length}, ...mpScMakePushSteps(secondWave), {type: 'pop'}, {type: 'multipop', count: secondWave.length + 1}];
    }
  }
}

function mpScRefreshStepLabels(){
  const L = mpLang();

  for(const step of mpScSteps)
    step.description = mpDescribeStep(step, L);
}

function mpScFormatPreviewStep(step){
  return step ? mpDescribeStep(step, mpLang()) : '';
}

function mpScGetPreviewState(){
  if(!Array.isArray(mpScSteps) || mpScSteps.length === 0)
    return {prev: '', current: '', next: ''};

  if(mpScHistory.length === 0)
    return {prev: '', current: '', next: mpScFormatPreviewStep(mpScSteps[0])};

  const index = mpScHistoryCursor >= 0 ? mpScHistoryCursor : (mpScHistory.length - 1);
  return {prev: mpScFormatPreviewStep(mpScSteps[index - 1]), current: mpScFormatPreviewStep(mpScSteps[index]), next: mpScFormatPreviewStep(mpScSteps[index + 1])};
}

function mpScRenderPreview(animate = false){
  typesParamsSetOperationPreviewVisible('mp', mpScPreviewVisible);
  if(!mpScPreviewVisible)
    return;

  typesParamsUpdateOperationPreview('mp', mpScGetPreviewState(), animate);
}

function mpScBuildPreviewStep(step){
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

function mpScSaveHistoryEntry(step){
  const L = mpLang();
  const prevTotal = mpScHistory.length ? (mpScSteps[mpScHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  mpDecorateRecordedStep(step, prevTotal, L);

  const title = `${mpScCursor + 1}/${mpScSteps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  mpScHistory.push({title, detailHtml, snapshot: mpMakeStackSnapshot(), stepCount, potential});
  mpScHistoryCursor = mpScHistory.length - 1;
  updateCounters();
}

function mpScRestoreHistoryEntry(index){
  if(index < 0 || index >= mpScHistory.length)
    return;

  mpScHistoryCursor = index;

  const entry = mpScHistory[index];
  mpApplyState(entry.snapshot, entry.stepCount, entry.potential);

  updateStackView();
  updateCounters();
  mpScRenderInfo();
}

function mpScRestoreLatestHistoryEntry(){
  if(mpScHistory.length === 0)
    return;

  mpScRestoreHistoryEntry(mpScHistory.length - 1);
}

function mpScReplayNextFromHistory(){
  if(mpScExecutionMode !== 'auto')
    return;
  if(mpScHistory.length === 0)
    return;
  if(mpScHistoryCursor < 0 || mpScHistoryCursor >= mpScHistory.length - 1)
    return;

  mpScPaused = true;
  mpScFastForward = false;
  mpSkipAnimations = false;
  mpClearSpecialCasesTimer();

  mpScHistory = mpScHistory.slice(0, mpScHistoryCursor + 1);
  mpScCursor = mpScHistoryCursor + 1;
  mpScFinished = false;
  mpScRunOneStep();
}

function mpScResetToStartState(){
  mpClearSpecialCasesTimer();

  mpSkipAnimations = false;
  mpApplyState([], 0, 0);

  mpScCursor = 0;
  mpScFinished = false;
  mpScPaused = true;
  mpScFastForward = false;
  mpScHistory = [];
  mpScHistoryCursor = -1;

  mpScSteps = (Array.isArray(mpScInitialSteps) && mpScInitialSteps.length > 0) ? mpScCloneSteps(mpScInitialSteps) : mpScBuildScenarioSteps(mpSpecialCasesMode);
  mpScRefreshStepLabels();

  updateStackView();
  updateCounters();
  mpScRenderInfo();
}

function mpScAfterStepSettles(step, token = mpRunToken){
  if(token !== mpRunToken)
    return;

  if(mpBusy){
    setTimeout(() => mpScAfterStepSettles(step, token), 30);
    return;
  }

  mpScSaveHistoryEntry(step);
  mpScCursor++;

  if(mpScCursor >= mpScSteps.length){
    mpScFinished = true;
    mpScPaused = false;
    mpScFastForward = false;
    mpSkipAnimations = false;
  }

  mpScRenderInfo();

  if(mpScPreviewVisible)
    mpScRenderPreview(true);
  
  if(mpScExecutionMode === 'auto' && !mpScPaused && !mpScFinished)
    mpScScheduleNext();
}

function mpScRunOneStep(){
  if(mpBusy || mpScFinished)
    return;

  if(mpScHistory.length > 0 && mpScHistoryCursor !== mpScHistory.length - 1)
    mpScRestoreLatestHistoryEntry();

  if(mpScCursor >= mpScSteps.length){
    mpScFinished = true;
    mpScPaused = false;
    mpScFastForward = false;
    mpScRenderInfo();

    return;
  }

  const token = mpRunToken;
  const step = mpScSteps[mpScCursor];

  mpExecuteStep(step);
  mpScRenderInfo();
  mpScAfterStepSettles(step, token);
}

function mpScScheduleNext(){
  if(mpScExecutionMode !== 'auto' || mpScPaused || mpScFinished)
    return;

  mpClearSpecialCasesTimer();

  mpScTimer = setTimeout(() => {
    if(mpScPaused || mpScFinished)
      return;

    mpScRunOneStep();
  }, mpSkipAnimations ? 0 : (mpScFastForward ? 20 : 1200));
}

function mpStartSpecialCases(mode, executionMode = 'auto'){
  $('#specialCasesModal').modal('hide');
  mpClearSpecialCasesTimer();

  if(typeof mpResetState === 'function')
    mpResetState();

  mpSpecialCasesMode = mode;
  isSpecialCasesMode = true;
  mpScExecutionMode = executionMode;
  mpScPaused = false;
  mpScFinished = false;
  mpScFastForward = false;
  mpScHistory = [];
  mpScHistoryCursor = -1;
  mpScCursor = 0;
  mpScPreviewVisible = true;

  mpScInitialSteps = mpScCloneSteps(mpScBuildScenarioSteps(mode));
  mpScSteps = mpScCloneSteps(mpScInitialSteps);
  mpScRefreshStepLabels();

  if(typeof mpRenderSpecialCasesUI === 'function')
    mpRenderSpecialCasesUI(mode, executionMode);

  if(mpScSteps.length > 0){
    mpScRunOneStep();

    if(mpScExecutionMode === 'auto' && !mpScFinished)
      mpScScheduleNext();
  }
}

function mpScTogglePlayPause(){
  const hasHistory = mpScHistory.length > 0;
  const viewingFinal = mpScFinished && hasHistory && mpScHistoryCursor >= mpScHistory.length - 1;

  if(viewingFinal){
    mpScRenderInfo();
    return;
  }

  if(hasHistory && mpScHistoryCursor >= 0 && mpScHistoryCursor < mpScHistory.length - 1){
    mpScHistory = mpScHistory.slice(0, mpScHistoryCursor + 1);
    mpScCursor = mpScHistoryCursor + 1;
    mpScFinished = false;
  }

  mpScPaused = !mpScPaused;
  mpScFastForward = false;
  mpSkipAnimations = false;

  if(mpScPaused)
    mpClearSpecialCasesTimer();
  else
    mpScScheduleNext();

  mpScRenderInfo();
}

function mpScGoDelta(delta){
  if(mpScExecutionMode !== 'auto')
    return;

  if(mpScHistory.length === 0){
    if(delta > 0 && !mpScFinished)
      mpScRunOneStep();
    return;
  }

  mpScPaused = true;
  mpScFastForward = false;
  mpClearSpecialCasesTimer();

  if(delta < 0){
    if(mpScHistoryCursor > 0){
      mpScRestoreHistoryEntry(mpScHistoryCursor - 1);
      return;
    }
    if(mpScHistoryCursor === 0){
      mpScResetToStartState();
      return;
    }

    return;
  }

  if(mpScHistoryCursor < mpScHistory.length - 1){
    mpScReplayNextFromHistory();
    return;
  }

  if(!mpScFinished)
    mpScRunOneStep();
}

function mpScJumpToStart(){
  mpScResetToStartState();
}

function mpScJumpToEnd(){
  if(mpScExecutionMode !== 'auto' || mpScHistory.length === 0)
    return;

  if(mpScFinished){
    mpScRestoreHistoryEntry(mpScHistory.length - 1);
    return;
  }

  if(mpScHistoryCursor !== mpScHistory.length - 1)
    mpScRestoreLatestHistoryEntry();

  mpScPaused = false;
  mpScFastForward = true;
  mpSkipAnimations = true;
  mpScScheduleNext();
}

function mpScNextOrEnd(){
  if(mpScFinished){
    mpResetState();
    returnToMainPageFromSyntax('multipop');
    
    return;
  }

  mpScRunOneStep();
}

function mpScBuildHistoryModalHtml(){
  const L = mpLang();
  
  if(!Array.isArray(mpScHistory) || mpScHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return mpScHistory.map(entry => buildCollapsibleHistoryEntryHtml({title: entry.title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml: entry.detailHtml})).join('');
}

function mpScOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = mpLang();
    const scenario = mpScGetScenarioDef();
    
    return {title: `${L.specialCasesHistoryTitle || 'Special case history'} – ${scenario.title} – ${L.multipopTitle || 'Multipop on Stack'}`, bodyHtml: mpScBuildHistoryModalHtml()};
  });
}

function rebuildMpSpecialCasesForLanguage(){
  if(!isSpecialCasesMode || !Array.isArray(mpScSteps) || mpScSteps.length === 0)
    return;

  const L = mpLang();
  mpScRefreshStepLabels();

  for(const step of mpScSteps){
    if(step.actualCost !== undefined)
      step.detail = mpBuildStepDetail(step, L);
  }

  mpScHistory = mpScHistory.map((entry, index) => {
    const step = mpScSteps[index];
    if(!step)
      return entry;

    return {...entry, title: `${index + 1}/${mpScSteps.length}: ${step.description}`, detailHtml: (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '')};
  });

  mpScRenderInfo();
}