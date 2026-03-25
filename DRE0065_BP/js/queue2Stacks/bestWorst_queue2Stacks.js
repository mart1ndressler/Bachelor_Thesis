function qBwGenerateUniqueRandomValues(count, min = 1, max = 99){
  const used = new Set();
  const values = [];

  while(values.length < count){
    const value = getRandomIntInclusive(min, max);

    if(!used.has(value)){
      used.add(value);
      values.push(value);
    }
  }

  return values;
}

function qBwBuildScenario(mode){
  const size = getRandomIntInclusive(4, 10);
  const values = qBwGenerateUniqueRandomValues(size);

  if(mode === 'best')
    return {initIn: [], initOut: [...values].reverse(), commands: [{type: 'dequeue'}]};

  return {initIn: [...values], initOut: [], commands: [{type: 'dequeue'}]};
}

function qBwCloneScenario(scenario){
  if(!scenario)
    return null;

  return {initIn: [...(scenario.initIn || [])], initOut: [...(scenario.initOut || [])], commands: Array.isArray(scenario.commands) ? scenario.commands.map(command => ({...command})) : []};
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

function qBwSaveHistoryEntry(step){
  const L = qLang();
  const title = `${qBwCursor + 1}/${qBwSteps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  qBwHistory.push({title, description: step.description, detailHtml, snapshot: qMakeSnapshot(), stepCount: qStepCount, potential: qPotential});
  qBwHistoryCursor = qBwHistory.length - 1;
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

function qBwResetToStartState(){
  qSkipAnimations = false;
  qClearRunTimer();
  qRunToken++;

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

function qBwReplayHistoryForward(){
  if(!qBwFinished || qBwHistory.length === 0){
    qBwScheduleNext();
    return;
  }

  if(qBwHistoryCursor >= qBwHistory.length - 1){
    qBwPaused = false;
    qBwRenderInfo();

    return;
  }

  qClearRunTimer();

  qRunTimer = setTimeout(() => {
    if(qBwPaused)
      return;

    if(qBwHistoryCursor < qBwHistory.length - 1)
      qBwRestoreHistoryEntry(qBwHistoryCursor + 1);
    if(qBwHistoryCursor >= qBwHistory.length - 1){
      qBwPaused = false;
      qBwRenderInfo();

      return;
    }

    qBwReplayHistoryForward();
  }, qBwFastForward ? 20 : 350);
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
  renderQueueStacks();
  updateQueueCounters();
  qBwRenderInfo();

  if(qBwSteps.length > 0){
    qBwRunOneStep();

    if(qBwExecutionMode === 'auto' && !qBwFinished)
      qBwScheduleNext();
  }
}

function qBwTogglePlayPause(){
  const hasHistory = qBwHistory.length > 0;

  if(qBwFinished){
    const viewingFinal = hasHistory && qBwHistoryCursor >= qBwHistory.length - 1;
    if(viewingFinal){
      qBwRenderInfo();
      return;
    }

    qBwPaused = !qBwPaused;
    if(qBwPaused)
      qClearRunTimer();
    else
      qBwReplayHistoryForward();

    qBwRenderInfo();
    return;
  }

  if(hasHistory && qBwHistoryCursor !== qBwHistory.length - 1)
    qBwRestoreLatestHistoryEntry();

  qBwPaused = !qBwPaused;
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
    qBwRestoreHistoryEntry(qBwHistoryCursor + 1);
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
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  const seedHtml = seedEntries.map((entry, index) => `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${index + 1}/${total}: ${entry.description}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount} |
        ${L.potential}: ${entry.potential}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>
  `).join('');

  const historyHtml = qBwHistory.map((entry, index) => {
  const displayIndex = seedEntries.length + index + 1;
  const description = entry.description || qBwSteps[index]?.description || entry.title;

  return `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${displayIndex}/${total}: ${description}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount + seedEntries.length} |
        ${L.potential}: ${entry.potential}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>`;
  }).join('');

  return seedHtml + historyHtml;
}

function qBwOpenHistoryModal(){
  const L = qLang();
  openSyntaxHistoryModal(`${L.bestWorstHistoryTitle || 'Best / Worst case history'} – ${L.queue2StacksTitle || 'Queue using Two Stacks'}`, qBwBuildHistoryModalHtml());
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