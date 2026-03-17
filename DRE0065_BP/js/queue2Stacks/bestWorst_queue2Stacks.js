function qBwRandInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function qBwRandomValues(count, min = 1, max = 99){
  const used = new Set();
  const values = [];

  while(values.length < count){
    const value = qBwRandInt(min, max);

    if(!used.has(value)){
      used.add(value);
      values.push(value);
    }
  }

  return values;
}

function qBuildBestWorstScenario(mode){
  const size = qBwRandInt(4, 10);
  const values = qBwRandomValues(size);

  if(mode === 'best')
    return {initIn: [], initOut: [...values].reverse(), commands: [{type:'dequeue'}]};

  return {initIn: [...values], initOut: [], commands: [{type:'dequeue'}]};
}

function qBwMakeSnapshot(){
  return {qIn: [...qIn], qOut: [...qOut]};
}

function qCloneBwScenario(scenario){
  if(!scenario)
    return null;

  return {initIn: [...(scenario.initIn || [])], initOut: [...(scenario.initOut || [])], commands: Array.isArray(scenario.commands) ? scenario.commands.map(cmd => ({...cmd})) : []};
}

function qBwSaveHistoryEntry(step){
  const L = qLang();

  qBwHistory.push({title: `${qBwCursor + 1}/${qBwSteps.length}: ${step.description}`, detailHtml: (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || ''), snapshot: qBwMakeSnapshot(), stepCount: qStepCount, potential: qPotential});
  qBwHistoryCursor = qBwHistory.length - 1;
}

function qBwRestoreHistoryEntry(index){
  if(index < 0 || index >= qBwHistory.length)
    return;

  qBwHistoryCursor = index;

  const entry = qBwHistory[index];
  qIn = [...entry.snapshot.qIn];
  qOut = [...entry.snapshot.qOut];
  qStepCount = entry.stepCount;
  qPotential = entry.potential;

  renderQueueStacks();
  updateQueueCounters();
  qBwRenderInfo();
}

function qBwRestoreLatestExecuted(){
  if(qBwHistory.length === 0)
    return;

  qBwRestoreHistoryEntry(qBwHistory.length - 1);
}

function qBwResetToStepZero(){
  qSkipAnimations = false;

  if(qRunTimer){
    clearTimeout(qRunTimer);
    qRunTimer = null;
  }

  qRunToken++;

  const scenario = qBwInitialScenario ? qCloneBwScenario(qBwInitialScenario) : qBuildBestWorstScenario(qBestWorstMode);
  if(!qBwInitialScenario)
    qBwInitialScenario = qCloneBwScenario(scenario);

  qIn = [...scenario.initIn];
  qOut = [...scenario.initOut];
  qStepCount = 0;
  qPotential = qIn.length;
  qBusy = false;

  qBwCommands = scenario.commands.map(cmd => ({...cmd}));
  qBwSteps = qBuildSyntaxSteps(qBwCommands);

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

  if(qRunTimer){
    clearTimeout(qRunTimer);
    qRunTimer = null;
  }

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
    qBwRestoreLatestExecuted();

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

  qExecuteSyntaxStep(step, () => {
    const L = qLang();

    if(step.type === 'enqueue')
      step.description = `${L.enqueueButton} ${step.value}`;
    else
      step.description = `${L.dequeueButton}`;

    if(step.actualCost !== undefined)
      step.detail = qBuildSyntaxDetail(step, L);

    if(qBwSteps[stepIndex] && qBwSteps[stepIndex] !== step)
      qBwSteps[stepIndex] = {...qBwSteps[stepIndex], ...step};
    else if(qBwSteps[stepIndex])
      qBwSteps[stepIndex] = {...step};

    qBwSaveHistoryEntry(qBwSteps[stepIndex]);
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

  if(qRunTimer){
    clearTimeout(qRunTimer);
    qRunTimer = null;
  }

  qRunTimer = setTimeout(() => {
    if(qBwPaused || qBwFinished)
      return;

    qBwRunOneStep();
  }, qSkipAnimations ? 0 : (qBwFastForward ? 20 : 350));
}

function qStartBestWorst(mode, executionMode = 'auto'){
  $('#bestWorstModal').modal('hide');
  resetQueue2StacksState();

  qIsBestWorstMode = true;
  qBestWorstMode = mode;
  qBwExecutionMode = executionMode;
  qBwPaused = false;
  qBwFinished = false;
  qBwFastForward = false;
  qBwHistory = [];
  qBwHistoryCursor = -1;
  qBwCursor = 0;

  const scenario = qBuildBestWorstScenario(mode);
  qBwInitialScenario = qCloneBwScenario(scenario);

  qIn = [...qBwInitialScenario.initIn];
  qOut = [...qBwInitialScenario.initOut];
  qStepCount = 0;
  qPotential = qIn.length;
  qBusy = false;

  qBwCommands = qBwInitialScenario.commands.map(cmd => ({...cmd}));
  qBwSteps = qBuildSyntaxSteps(qBwCommands);

  qRenderBestWorstUI(executionMode);
  qBwRenderInfo();

  if(qBwSteps.length > 0){
    qBwRunOneStep();

    if(qBwExecutionMode === 'auto' && !qBwFinished)
      qBwScheduleNext();
  }
}

function executeQueue2StacksBestCase(executionMode = 'auto'){
  qStartBestWorst('best', executionMode);
}

function executeQueue2StacksWorstCase(executionMode = 'auto'){
  qStartBestWorst('worst', executionMode);
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
    if(qBwPaused){
      if(qRunTimer){
        clearTimeout(qRunTimer);
        qRunTimer = null;
      }
    }
    else
      qBwReplayHistoryForward();

    qBwRenderInfo();
    return;
  }

  if(hasHistory && qBwHistoryCursor !== qBwHistory.length - 1)
    qBwRestoreLatestExecuted();

  qBwPaused = !qBwPaused;
  if(qBwPaused){
    if(qRunTimer){
      clearTimeout(qRunTimer);
      qRunTimer = null;
    }
  }
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

  if(qRunTimer){
    clearTimeout(qRunTimer);
    qRunTimer = null;
  }

  if(delta < 0){
    if(qBwHistoryCursor > 0){
      qBwRestoreHistoryEntry(qBwHistoryCursor - 1);
      return;
    }

    if(qBwHistoryCursor === 0){
      qBwResetToStepZero();
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
  qBwResetToStepZero();
}

function qBwJumpToEnd(){
  if(qBwExecutionMode !== 'auto' || qBwHistory.length === 0)
    return;

  if(qBwFinished){
    qBwRestoreHistoryEntry(qBwHistory.length - 1);
    return;
  }

  if(qBwHistoryCursor !== qBwHistory.length - 1)
    qBwRestoreLatestExecuted();

  qBwPaused = false;
  qBwFastForward = true;
  qSkipAnimations = true;
  qBwScheduleNext();
}

function qBwNextOrEnd(){
  if(qBwFinished){
    resetQueue2StacksState();
    returnToMainPageFromSyntax('queue2Stacks');

    return;
  }

  qBwRunOneStep();
}

function qBwBuildHistoryModalHtml(){
  const L = qLang();

  if(!Array.isArray(qBwHistory) || qBwHistory.length === 0)
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  return qBwHistory.map(entry => `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${entry.title}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount} |
        ${L.potential}: ${entry.potential}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>`).join('');
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
  const newSteps = qBuildSyntaxSteps(qBwCommands);

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
      newSteps[i].detail = qBuildSyntaxDetail(newSteps[i], L);
  }

  qBwSteps = newSteps;
  qBwHistory = qBwHistory.map((entry, i) => {
    const s = qBwSteps[i];
    if(!s)
      return entry;

    return {...entry, title: `${i + 1}/${qBwSteps.length}: ${s.description}`, detailHtml: (s.detail && String(s.detail).trim()) ? s.detail : (L.detailNotProvided || '')};
  });

  qBwRenderInfo();
}