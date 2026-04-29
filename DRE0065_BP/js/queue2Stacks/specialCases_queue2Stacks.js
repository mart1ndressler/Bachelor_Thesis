function qScCloneScenario(scenario){
  if(!scenario)
    return null;

  return {initIn: [...(scenario.initIn || [])], initOut: [...(scenario.initOut || [])], commands: Array.isArray(scenario.commands) ? scenario.commands.map(command => ({...command})) : []};
}

function qScMakeValues(count){
  return typesParamsGenerateValuesInRange(1, 99, count, {unique: true});
}

function qScMakeEnqueueCommands(values){
  return values.map(value => ({type: 'enqueue', value}));
}

function qGetSpecialCaseOptions(){
  const L = qLang();

  return [
    {id: 'enqueue_burst_only', title: L.qScenario01Title, description: L.qScenario01Desc},
    {id: 'ready_front_direct_dequeue', title: L.qScenario02Title, description: L.qScenario02Desc},
    {id: 'full_transfer_first_dequeue', title: L.qScenario03Title, description: L.qScenario03Desc},
    {id: 'transfer_then_cheap_dequeues', title: L.qScenario04Title, description: L.qScenario04Desc},
    {id: 'alternating_ops', title: L.qScenario05Title, description: L.qScenario05Desc},
    {id: 'empty_dequeue_recovery', title: L.qScenario06Title, description: L.qScenario06Desc},
    {id: 'refill_while_out_ready', title: L.qScenario07Title, description: L.qScenario07Desc},
    {id: 'two_transfer_waves', title: L.qScenario08Title, description: L.qScenario08Desc},
    {id: 'burst_then_full_drain', title: L.qScenario09Title, description: L.qScenario09Desc},
    {id: 'small_queue_oscillation', title: L.qScenario10Title, description: L.qScenario10Desc}];
}

function qScGetScenarioDef(id = qSpecialCasesMode){
  const scenarios = qGetSpecialCaseOptions();
  return scenarios.find(scenario => scenario.id === id) || scenarios[0];
}

function qScBuildScenario(scenarioId){
  switch(scenarioId){
    case 'enqueue_burst_only': {
      const values = qScMakeValues(getRandomIntInclusive(6, 10));
      return {initIn: [], initOut: [], commands: qScMakeEnqueueCommands(values)};
    }
    case 'ready_front_direct_dequeue': {
      const values = qScMakeValues(getRandomIntInclusive(4, 7));
      return {initIn: [], initOut: [...values].reverse(), commands: [{type: 'dequeue'}]};
    }
    case 'full_transfer_first_dequeue': {
      const values = qScMakeValues(getRandomIntInclusive(5, 8));
      return {initIn: [...values], initOut: [], commands: [{type: 'dequeue'}]};
    }
    case 'transfer_then_cheap_dequeues': {
      const values = qScMakeValues(getRandomIntInclusive(5, 8));
      return {initIn: [...values], initOut: [], commands: [{type: 'dequeue'}, {type: 'dequeue'}, {type: 'dequeue'}]};
    }
    case 'alternating_ops': {
      const values = qScMakeValues(5);
      return {initIn: [], initOut: [], commands: [{type: 'enqueue', value: values[0]}, {type: 'enqueue', value: values[1]}, {type: 'dequeue'}, {type: 'enqueue', value: values[2]}, {type: 'dequeue'}, {type: 'enqueue', value: values[3]}, {type: 'enqueue', value: values[4]}, {type: 'dequeue'}]};
    }
    case 'empty_dequeue_recovery': {
      const values = qScMakeValues(2);
      return {initIn: [], initOut: [], commands: [{type: 'dequeue'}, {type: 'enqueue', value: values[0]}, {type: 'enqueue', value: values[1]}, {type: 'dequeue'}, {type: 'dequeue'}]};
    }
    case 'refill_while_out_ready': {
      const initIn = qScMakeValues(4);
      const outValues = qScMakeValues(2);
      const extra = qScMakeValues(2);

      return {initIn, initOut: [...outValues].reverse(), commands: [{type: 'dequeue'}, {type: 'enqueue', value: extra[0]}, {type: 'enqueue', value: extra[1]}, {type: 'dequeue'}, {type: 'dequeue'}]};
    }
    case 'two_transfer_waves': {
      const values = qScMakeValues(7);
      return {initIn: [], initOut: [], commands: [{type: 'enqueue', value: values[0]}, {type: 'enqueue', value: values[1]}, {type: 'enqueue', value: values[2]}, {type: 'enqueue', value: values[3]}, {type: 'dequeue'}, {type: 'dequeue'}, {type: 'enqueue', value: values[4]}, {type: 'enqueue', value: values[5]}, {type: 'enqueue', value: values[6]}, {type: 'dequeue'}, {type: 'dequeue'}, {type: 'dequeue'}]};
    }
    case 'burst_then_full_drain': {
      const values = qScMakeValues(getRandomIntInclusive(5, 8));
      return {initIn: [], initOut: [], commands: [...qScMakeEnqueueCommands(values), ...values.map(() => ({type: 'dequeue'}))]};
    }
    default: {
      const values = qScMakeValues(5);
      return {initIn: [], initOut: [], commands: [{type: 'enqueue', value: values[0]}, {type: 'dequeue'}, {type: 'enqueue', value: values[1]}, {type: 'enqueue', value: values[2]}, {type: 'dequeue'}, {type: 'enqueue', value: values[3]}, {type: 'dequeue'}, {type: 'enqueue', value: values[4]}, {type: 'dequeue'}]};
    }
  }
}

function qScBuildInitialSeedHistoryEntries(langData = qLang()){
  const initInValues = Array.isArray(qScInitialScenario?.initIn) ? qScInitialScenario.initIn : [];
  if(initInValues.length === 0)
    return [];

  const entries = [];
  const tempIn = [];
  const tempOut = [];

  let tempStepCount = 0;
  let tempPotential = 0;

  for(const value of initInValues){
    const beforeState = {snapshot: {qIn: [...tempIn], qOut: [...tempOut]}, beforeIn: tempIn.length, beforeOut: tempOut.length, stepCount: tempStepCount, potential: tempPotential};

    tempIn.push(value);
    tempStepCount += 1;
    tempPotential = tempIn.length;

    const step = qFinalizeStep({type: 'enqueue', value}, beforeState, {qIn: [...tempIn], qOut: [...tempOut]}, 1, {transferredCount: 0}, langData);
    entries.push({description: step.description, detailHtml: step.detail, stepCount: tempStepCount, potential: tempPotential});
  }

  return entries;
}

function qScBuildPreviewStep(step){
  if(!step)
    return null;

  const beforeState = qCreateStateSnapshot();
  const preview = {...step};
  if(preview.type === 'enqueue')
    return qFinalizeStep(preview, beforeState, {qIn: [...beforeState.snapshot.qIn, preview.value], qOut: [...beforeState.snapshot.qOut]}, 1, {value: preview.value, transferredCount: 0});

  if(beforeState.beforeOut > 0){
    const removedValue = beforeState.snapshot.qOut[beforeState.snapshot.qOut.length - 1];
    return qFinalizeStep(preview, beforeState, {qIn: [...beforeState.snapshot.qIn], qOut: beforeState.snapshot.qOut.slice(0, -1)}, 1, {removedValue, wasEmpty: false, usedTransfer: false, transferredCount: 0});
  }
  if(beforeState.beforeIn === 0)
    return qFinalizeStep(preview, beforeState, beforeState.snapshot, 0, {wasEmpty: true, usedTransfer: false, transferredCount: 0});

  const transferredValues = [...beforeState.snapshot.qIn].reverse();
  const removedValue = transferredValues[transferredValues.length - 1];

  return qFinalizeStep(preview, beforeState, {qIn: [], qOut: transferredValues.slice(0, -1)}, 2 * beforeState.beforeIn + 1, {removedValue, wasEmpty: false, usedTransfer: true, transferredCount: beforeState.beforeIn});
}

function qScFormatPreviewStep(step){
  return step ? qDescribeStep(step, qLang()) : '';
}

function qScGetPreviewState(){
  if(!Array.isArray(qScSteps) || qScSteps.length === 0)
    return {prev: '', current: '', next: ''};

  if(qScHistory.length === 0)
    return {prev: '', current: '', next: qScFormatPreviewStep(qScSteps[0])};

  const index = qScHistoryCursor >= 0 ? qScHistoryCursor : (qScHistory.length - 1);
  return {prev: qScFormatPreviewStep(qScSteps[index - 1]), current: qScFormatPreviewStep(qScSteps[index]), next: qScFormatPreviewStep(qScSteps[index + 1])};
}

function qScRenderPreview(animate = false){
  typesParamsSetOperationPreviewVisible('q', qScPreviewVisible);
  if(!qScPreviewVisible)
    return;

  typesParamsUpdateOperationPreview('q', qScGetPreviewState(), animate);
}

function qScSaveHistoryEntry(step){
  const L = qLang();
  const prevTotal = qScHistory.length ? (qScSteps[qScHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  qDecorateRecordedStep(step, prevTotal, L);

  const title = `${qScCursor + 1}/${qScSteps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  qScHistory.push({title, description: step.description, detailHtml, snapshot: qMakeSnapshot(), stepCount: qStepCount, potential: qPotential});
  qScHistoryCursor = qScHistory.length - 1;
  updateQueueCounters();
}

function qScRestoreHistoryEntry(index){
  if(index < 0 || index >= qScHistory.length)
    return;

  qScHistoryCursor = index;
  const entry = qScHistory[index];
  qApplyState(entry.snapshot, entry.stepCount, entry.potential);

  renderQueueStacks();
  updateQueueCounters();
  qScRenderInfo();
}

function qScRestoreLatestHistoryEntry(){
  if(qScHistory.length === 0)
    return;

  qScRestoreHistoryEntry(qScHistory.length - 1);
}

function qScReplayNextFromHistory(){
  if(qScExecutionMode !== 'auto')
    return;
  if(qScHistory.length === 0)
    return;
  if(qScHistoryCursor < 0 || qScHistoryCursor >= qScHistory.length - 1)
    return;

  qScPaused = true;
  qScFastForward = false;
  qSkipAnimations = false;
  qClearRunTimer();

  qScHistory = qScHistory.slice(0, qScHistoryCursor + 1);
  qScCursor = qScHistoryCursor + 1;
  qScFinished = false;
  qScRunOneStep();
}

function qScResetToStartState(){
  qSkipAnimations = false;
  qClearRunTimer();

  const scenario = qScInitialScenario ? qScCloneScenario(qScInitialScenario) : qScBuildScenario(qSpecialCasesMode);
  if(!qScInitialScenario)
    qScInitialScenario = qScCloneScenario(scenario);

  qIn = [...scenario.initIn];
  qOut = [...scenario.initOut];
  qStepCount = 0;
  qPotential = qIn.length;
  qBusy = false;

  qScCommands = scenario.commands.map(command => ({...command}));
  qScSteps = qBuildStepsFromCommands(qScCommands);

  qScCursor = 0;
  qScFinished = false;
  qScPaused = true;
  qScFastForward = false;
  qScHistory = [];
  qScHistoryCursor = -1;

  renderQueueStacks();
  updateQueueCounters();
  qScRenderInfo();
}

function qScRunOneStep(){
  if(qBusy || qScFinished)
    return;

  if(qScHistory.length > 0 && qScHistoryCursor !== qScHistory.length - 1)
    qScRestoreLatestHistoryEntry();

  if(qScCursor >= qScSteps.length){
    qScFinished = true;
    qScPaused = false;
    qScFastForward = false;
    qSkipAnimations = false;
    qScRenderInfo();

    return;
  }

  const stepIndex = qScCursor;
  const step = qScSteps[stepIndex];

  qExecuteStep(step, () => {
    qScSaveHistoryEntry(step);
    qScCursor = stepIndex + 1;

    if(qScCursor >= qScSteps.length){
      qScFinished = true;
      qScPaused = false;
      qScFastForward = false;
      qSkipAnimations = false;
    }

    qScRenderInfo();

    if(qScPreviewVisible)
      qScRenderPreview(true);

    if(qScExecutionMode === 'auto' && !qScPaused && !qScFinished)
      qScScheduleNext();
  });

  qScRenderInfo();
}

function qScScheduleNext(){
  if(qScExecutionMode !== 'auto' || qScPaused || qScFinished)
    return;

  qClearRunTimer();

  qRunTimer = setTimeout(() => {
    if(qScPaused || qScFinished)
      return;

    qScRunOneStep();
  }, qSkipAnimations ? 0 : (qScFastForward ? 20 : 350));
}

function qStartSpecialCases(mode, executionMode = 'auto'){
  $('#specialCasesModal').modal('hide');
  qResetState();

  qIsSpecialCasesMode = true;
  qSpecialCasesMode = mode;
  qScExecutionMode = executionMode;
  qScPaused = false;
  qScFinished = false;
  qScFastForward = false;
  qScHistory = [];
  qScHistoryCursor = -1;
  qScCursor = 0;
  qScInitialScenario = qScCloneScenario(qScBuildScenario(mode));
  qIn = [...qScInitialScenario.initIn];
  qOut = [...qScInitialScenario.initOut];
  qStepCount = 0;
  qPotential = qIn.length;
  qBusy = false;
  qScPreviewVisible = true;
  qScCommands = qScInitialScenario.commands.map(command => ({...command}));
  qScSteps = qBuildStepsFromCommands(qScCommands);

  qRenderSpecialCasesUI(executionMode);
  
  if(qScSteps.length > 0){
    qScRunOneStep();

    if(qScExecutionMode === 'auto' && !qScFinished)
      qScScheduleNext();
  }
}

function qScTogglePlayPause(){
  const hasHistory = qScHistory.length > 0;
  const viewingFinal = qScFinished && hasHistory && qScHistoryCursor >= qScHistory.length - 1;

  if(viewingFinal){
    qScRenderInfo();
    return;
  }

  if(hasHistory && qScHistoryCursor >= 0 && qScHistoryCursor < qScHistory.length - 1){
    qScHistory = qScHistory.slice(0, qScHistoryCursor + 1);
    qScCursor = qScHistoryCursor + 1;
    qScFinished = false;
  }

  qScPaused = !qScPaused;
  qScFastForward = false;
  qSkipAnimations = false;

  if(qScPaused)
    qClearRunTimer();
  else
    qScScheduleNext();

  qScRenderInfo();
}

function qScGoDelta(delta){
  if(qScExecutionMode !== 'auto')
    return;

  if(qScHistory.length === 0){
    if(delta > 0 && !qScFinished)
      qScRunOneStep();

    return;
  }

  qScPaused = true;
  qScFastForward = false;
  qClearRunTimer();

  if(delta < 0){
    if(qScHistoryCursor > 0){
      qScRestoreHistoryEntry(qScHistoryCursor - 1);
      return;
    }
    if(qScHistoryCursor === 0){
      qScResetToStartState();
      return;
    }

    return;
  }

  if(qScHistoryCursor < qScHistory.length - 1){
    qScReplayNextFromHistory();
    return;
  }

  if(!qScFinished)
    qScRunOneStep();
}

function qScJumpToStart(){
  qScResetToStartState();
}

function qScJumpToEnd(){
  if(qScExecutionMode !== 'auto' || qScHistory.length === 0)
    return;

  if(qScFinished){
    qScRestoreHistoryEntry(qScHistory.length - 1);
    return;
  }

  if(qScHistoryCursor !== qScHistory.length - 1)
    qScRestoreLatestHistoryEntry();

  qScPaused = false;
  qScFastForward = true;
  qSkipAnimations = true;
  qScScheduleNext();
}

function qScNextOrEnd(){
  if(qScFinished){
    qResetState();
    returnToMainPageFromSyntax('queue2Stacks');
    
    return;
  }

  qScRunOneStep();
}

function qScBuildHistoryModalHtml(){
  const L = qLang();
  const seedEntries = qScBuildInitialSeedHistoryEntries(L);
  const total = seedEntries.length + qScHistory.length;

  if(seedEntries.length === 0 && (!Array.isArray(qScHistory) || qScHistory.length === 0))
    return buildEmptyHistoryWatermarkHtml();

  const seedHtml = seedEntries.map((entry, index) => buildCollapsibleHistoryEntryHtml({title: `${index + 1}/${total}: ${entry.description}`, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml: entry.detailHtml})).join('');
  const historyHtml = qScHistory.map((entry, index) => {
    const displayIndex = seedEntries.length + index + 1;
    const description = entry.description || qScSteps[index]?.description || entry.title;

    return buildCollapsibleHistoryEntryHtml({title: `${displayIndex}/${total}: ${description}`, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml: entry.detailHtml});
  }).join('');

  return seedHtml + historyHtml;
}

function qScOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = qLang();
    const scenario = qScGetScenarioDef();
    
    return {title: `${L.specialCasesHistoryTitle || 'Special case history'} – ${scenario.title} – ${L.queue2StacksTitle || 'Queue using Two Stacks'}`, bodyHtml: qScBuildHistoryModalHtml()};
  });
}

function rebuildQueueSpecialCasesForLanguage(){
  if(!qIsSpecialCasesMode || !Array.isArray(qScCommands) || qScCommands.length === 0)
    return;

  const L = qLang();
  const oldSteps = qScSteps;
  const newSteps = qBuildStepsFromCommands(qScCommands);

  for(let i = 0; i < Math.min(oldSteps.length, newSteps.length); i++){
    newSteps[i].removedValue = oldSteps[i].removedValue;
    newSteps[i].usedTransfer = oldSteps[i].usedTransfer;
    newSteps[i].wasEmpty = oldSteps[i].wasEmpty;
    newSteps[i].beforeIn = oldSteps[i].beforeIn;
    newSteps[i].beforeOut = oldSteps[i].beforeOut;
    newSteps[i].afterIn = oldSteps[i].afterIn;
    newSteps[i].afterOut = oldSteps[i].afterOut;
    newSteps[i].actualCost = oldSteps[i].actualCost;
    newSteps[i].phiBefore = oldSteps[i].phiBefore;
    newSteps[i].phiAfter = oldSteps[i].phiAfter;
    newSteps[i].deltaPhi = oldSteps[i].deltaPhi;
    newSteps[i].transferredCount = oldSteps[i].transferredCount;

    if(newSteps[i].actualCost !== undefined)
      newSteps[i].detail = qBuildStepDetail(newSteps[i], L);
  }

  qScSteps = newSteps;

  qScHistory = qScHistory.map((entry, index) => {
    const step = qScSteps[index];
    if(!step)
      return entry;

    return {...entry, title: `${index + 1}/${qScSteps.length}: ${step.description}`, description: step.description, detailHtml: (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '')};
  });

  qScRenderInfo();
}