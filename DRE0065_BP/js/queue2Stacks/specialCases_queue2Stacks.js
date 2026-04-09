function qBwCloneScenario(scenario){
  if(!scenario)
    return null;

  return {initIn: [...(scenario.initIn || [])], initOut: [...(scenario.initOut || [])], commands: Array.isArray(scenario.commands) ? scenario.commands.map(command => ({...command})) : []};
}

function qBwMakeValues(count){
  return typesParamsGenerateValuesInRange(1, 99, count, {unique: true});
}

function qBwMakeEnqueueCommands(values){
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

function qBwGetScenarioDef(id = qBestWorstMode){
  const scenarios = qGetSpecialCaseOptions();
  return scenarios.find(scenario => scenario.id === id) || scenarios[0];
}

function qBwBuildScenario(scenarioId){
  switch(scenarioId){
    case 'enqueue_burst_only': {
      const values = qBwMakeValues(getRandomIntInclusive(6, 10));
      return {initIn: [], initOut: [], commands: qBwMakeEnqueueCommands(values)};
    }
    case 'ready_front_direct_dequeue': {
      const values = qBwMakeValues(getRandomIntInclusive(4, 7));
      return {initIn: [], initOut: [...values].reverse(), commands: [{type: 'dequeue'}]};
    }
    case 'full_transfer_first_dequeue': {
      const values = qBwMakeValues(getRandomIntInclusive(5, 8));
      return {initIn: [...values], initOut: [], commands: [{type: 'dequeue'}]};
    }
    case 'transfer_then_cheap_dequeues': {
      const values = qBwMakeValues(getRandomIntInclusive(5, 8));
      return {initIn: [...values], initOut: [], commands: [{type: 'dequeue'}, {type: 'dequeue'}, {type: 'dequeue'}]};
    }
    case 'alternating_ops': {
      const values = qBwMakeValues(5);
      return {initIn: [], initOut: [], commands: [{type: 'enqueue', value: values[0]}, {type: 'enqueue', value: values[1]}, {type: 'dequeue'}, {type: 'enqueue', value: values[2]}, {type: 'dequeue'}, {type: 'enqueue', value: values[3]}, {type: 'enqueue', value: values[4]}, {type: 'dequeue'}]};
    }
    case 'empty_dequeue_recovery': {
      const values = qBwMakeValues(2);
      return {initIn: [], initOut: [], commands: [{type: 'dequeue'}, {type: 'enqueue', value: values[0]}, {type: 'enqueue', value: values[1]}, {type: 'dequeue'}, {type: 'dequeue'}]};
    }
    case 'refill_while_out_ready': {
      const initIn = qBwMakeValues(4);
      const outValues = qBwMakeValues(2);
      const extra = qBwMakeValues(2);

      return {initIn, initOut: [...outValues].reverse(), commands: [{type: 'dequeue'}, {type: 'enqueue', value: extra[0]}, {type: 'enqueue', value: extra[1]}, {type: 'dequeue'}, {type: 'dequeue'}]};
    }
    case 'two_transfer_waves': {
      const values = qBwMakeValues(7);
      return {initIn: [], initOut: [], commands: [{type: 'enqueue', value: values[0]}, {type: 'enqueue', value: values[1]}, {type: 'enqueue', value: values[2]}, {type: 'enqueue', value: values[3]}, {type: 'dequeue'}, {type: 'dequeue'}, {type: 'enqueue', value: values[4]}, {type: 'enqueue', value: values[5]}, {type: 'enqueue', value: values[6]}, {type: 'dequeue'}, {type: 'dequeue'}, {type: 'dequeue'}]};
    }
    case 'burst_then_full_drain': {
      const values = qBwMakeValues(getRandomIntInclusive(5, 8));
      return {initIn: [], initOut: [], commands: [...qBwMakeEnqueueCommands(values), ...values.map(() => ({type: 'dequeue'}))]};
    }
    default: {
      const values = qBwMakeValues(5);
      return {initIn: [], initOut: [], commands: [{type: 'enqueue', value: values[0]}, {type: 'dequeue'}, {type: 'enqueue', value: values[1]}, {type: 'enqueue', value: values[2]}, {type: 'dequeue'}, {type: 'enqueue', value: values[3]}, {type: 'dequeue'}, {type: 'enqueue', value: values[4]}, {type: 'dequeue'}]};
    }
  }
}

function qBwBuildInitialSeedHistoryEntries(langData = qLang()){
  const initInValues = Array.isArray(qBwInitialScenario?.initIn) ? qBwInitialScenario.initIn : [];
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

function qBwBuildPreviewStep(step){
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

function qBwSaveHistoryEntry(step){
  const L = qLang();
  const prevTotal = qBwHistory.length ? (qBwSteps[qBwHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  qDecorateRecordedStep(step, prevTotal, L);

  const title = `${qBwCursor + 1}/${qBwSteps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  qBwHistory.push({title, description: step.description, detailHtml, snapshot: qMakeSnapshot(), stepCount: qStepCount, potential: qPotential});
  qBwHistoryCursor = qBwHistory.length - 1;
  updateQueueCounters();
}

function qBwRestoreHistoryEntry(index){
  if(index < 0 || index >= qBwHistory.length)
    return;

  qBwHistoryCursor = index;
  const entry = qBwHistory[index];
  qApplyState(entry.snapshot, entry.stepCount, entry.potential);

  renderQueueStacks();
  updateQueueCounters();
  qBwRenderInfo();
}

function qBwRestoreLatestHistoryEntry(){
  if(qBwHistory.length === 0)
    return;

  qBwRestoreHistoryEntry(qBwHistory.length - 1);
}

function qBwReplayNextFromHistory(){
  if(qBwExecutionMode !== 'auto')
    return;
  if(qBwHistory.length === 0)
    return;
  if(qBwHistoryCursor < 0 || qBwHistoryCursor >= qBwHistory.length - 1)
    return;

  qBwPaused = true;
  qBwFastForward = false;
  qSkipAnimations = false;
  qClearRunTimer();

  qBwHistory = qBwHistory.slice(0, qBwHistoryCursor + 1);
  qBwCursor = qBwHistoryCursor + 1;
  qBwFinished = false;
  qBwRunOneStep();
}

function qBwResetToStartState(){
  qSkipAnimations = false;
  qClearRunTimer();

  const scenario = qBwInitialScenario ? qBwCloneScenario(qBwInitialScenario) : qBwBuildScenario(qBestWorstMode);
  if(!qBwInitialScenario)
    qBwInitialScenario = qBwCloneScenario(scenario);

  qIn = [...scenario.initIn];
  qOut = [...scenario.initOut];
  qStepCount = 0;
  qPotential = qIn.length;
  qBusy = false;

  qBwCommands = scenario.commands.map(command => ({...command}));
  qBwSteps = qBuildStepsFromCommands(qBwCommands);

  qBwCursor = 0;
  qBwFinished = false;
  qBwPaused = true;
  qBwFastForward = false;
  qBwHistory = [];
  qBwHistoryCursor = -1;

  renderQueueStacks();
  updateQueueCounters();
  qBwRenderInfo();
}

function qBwRunOneStep(){
  if(qBusy || qBwFinished)
    return;

  if(qBwHistory.length > 0 && qBwHistoryCursor !== qBwHistory.length - 1)
    qBwRestoreLatestHistoryEntry();

  if(qBwCursor >= qBwSteps.length){
    qBwFinished = true;
    qBwPaused = false;
    qBwFastForward = false;
    qSkipAnimations = false;
    qBwRenderInfo();

    return;
  }

  const stepIndex = qBwCursor;
  const step = qBwSteps[stepIndex];

  qExecuteStep(step, () => {
    qBwSaveHistoryEntry(step);
    qBwCursor = stepIndex + 1;

    if(qBwCursor >= qBwSteps.length){
      qBwFinished = true;
      qBwPaused = false;
      qBwFastForward = false;
      qSkipAnimations = false;
    }

    qBwRenderInfo();

    if(qBwExecutionMode === 'auto' && !qBwPaused && !qBwFinished)
      qBwScheduleNext();
  });
}

function qBwScheduleNext(){
  if(qBwExecutionMode !== 'auto' || qBwPaused || qBwFinished)
    return;

  qClearRunTimer();

  qRunTimer = setTimeout(() => {
    if(qBwPaused || qBwFinished)
      return;

    qBwRunOneStep();
  }, qSkipAnimations ? 0 : (qBwFastForward ? 20 : 350));
}

function qStartBestWorst(mode, executionMode = 'auto'){
  $('#bestWorstModal').modal('hide');
  qResetState();

  qIsBestWorstMode = true;
  qBestWorstMode = mode;
  qBwExecutionMode = executionMode;
  qBwPaused = false;
  qBwFinished = false;
  qBwFastForward = false;
  qBwHistory = [];
  qBwHistoryCursor = -1;
  qBwCursor = 0;
  qBwInitialScenario = qBwCloneScenario(qBwBuildScenario(mode));
  qIn = [...qBwInitialScenario.initIn];
  qOut = [...qBwInitialScenario.initOut];
  qStepCount = 0;
  qPotential = qIn.length;
  qBusy = false;
  qBwCommands = qBwInitialScenario.commands.map(command => ({...command}));
  qBwSteps = qBuildStepsFromCommands(qBwCommands);

  qRenderBestWorstUI(executionMode);
  
  if(qBwSteps.length > 0){
    qBwRunOneStep();

    if(qBwExecutionMode === 'auto' && !qBwFinished)
      qBwScheduleNext();
  }
}

function qBwTogglePlayPause(){
  const hasHistory = qBwHistory.length > 0;
  const viewingFinal = qBwFinished && hasHistory && qBwHistoryCursor >= qBwHistory.length - 1;

  if(viewingFinal){
    qBwRenderInfo();
    return;
  }

  if(hasHistory && qBwHistoryCursor >= 0 && qBwHistoryCursor < qBwHistory.length - 1){
    qBwHistory = qBwHistory.slice(0, qBwHistoryCursor + 1);
    qBwCursor = qBwHistoryCursor + 1;
    qBwFinished = false;
  }

  qBwPaused = !qBwPaused;
  qBwFastForward = false;
  qSkipAnimations = false;

  if(qBwPaused)
    qClearRunTimer();
  else
    qBwScheduleNext();

  qBwRenderInfo();
}

function qBwGoDelta(delta){
  if(qBwExecutionMode !== 'auto')
    return;

  if(qBwHistory.length === 0){
    if(delta > 0 && !qBwFinished)
      qBwRunOneStep();

    return;
  }

  qBwPaused = true;
  qBwFastForward = false;
  qClearRunTimer();

  if(delta < 0){
    if(qBwHistoryCursor > 0){
      qBwRestoreHistoryEntry(qBwHistoryCursor - 1);
      return;
    }
    if(qBwHistoryCursor === 0){
      qBwResetToStartState();
      return;
    }

    return;
  }

  if(qBwHistoryCursor < qBwHistory.length - 1){
    qBwReplayNextFromHistory();
    return;
  }

  if(!qBwFinished)
    qBwRunOneStep();
}

function qBwJumpToStart(){
  qBwResetToStartState();
}

function qBwJumpToEnd(){
  if(qBwExecutionMode !== 'auto' || qBwHistory.length === 0)
    return;

  if(qBwFinished){
    qBwRestoreHistoryEntry(qBwHistory.length - 1);
    return;
  }

  if(qBwHistoryCursor !== qBwHistory.length - 1)
    qBwRestoreLatestHistoryEntry();

  qBwPaused = false;
  qBwFastForward = true;
  qSkipAnimations = true;
  qBwScheduleNext();
}

function qBwNextOrEnd(){
  if(qBwFinished){
    qResetState();
    returnToMainPageFromSyntax('queue2Stacks');
    
    return;
  }

  qBwRunOneStep();
}

function qBwBuildHistoryModalHtml(){
  const L = qLang();
  const seedEntries = qBwBuildInitialSeedHistoryEntries(L);
  const total = seedEntries.length + qBwHistory.length;

  if(seedEntries.length === 0 && (!Array.isArray(qBwHistory) || qBwHistory.length === 0))
    return buildEmptyHistoryWatermarkHtml();

  const seedHtml = seedEntries.map((entry, index) => buildCollapsibleHistoryEntryHtml({title: `${index + 1}/${total}: ${entry.description}`, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml: entry.detailHtml})).join('');
  const historyHtml = qBwHistory.map((entry, index) => {
    const displayIndex = seedEntries.length + index + 1;
    const description = entry.description || qBwSteps[index]?.description || entry.title;

    return buildCollapsibleHistoryEntryHtml({title: `${displayIndex}/${total}: ${description}`, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml: entry.detailHtml});
  }).join('');

  return seedHtml + historyHtml;
}

function qBwOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = qLang();
    const scenario = qBwGetScenarioDef();
    
    return {title: `${L.bestWorstHistoryTitle || 'Special case history'} – ${scenario.title} – ${L.queue2StacksTitle || 'Queue using Two Stacks'}`, bodyHtml: qBwBuildHistoryModalHtml()};
  });
}

function rebuildQueueBestWorstForLanguage(){
  if(!qIsBestWorstMode || !Array.isArray(qBwCommands) || qBwCommands.length === 0)
    return;

  const L = qLang();
  const oldSteps = qBwSteps;
  const newSteps = qBuildStepsFromCommands(qBwCommands);

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

  qBwSteps = newSteps;

  qBwHistory = qBwHistory.map((entry, index) => {
    const step = qBwSteps[index];
    if(!step)
      return entry;

    return {...entry, title: `${index + 1}/${qBwSteps.length}: ${step.description}`, description: step.description, detailHtml: (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '')};
  });

  qBwRenderInfo();
}