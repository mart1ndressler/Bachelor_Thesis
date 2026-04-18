function qValidateSyntax(input){
  const syntaxPattern = /^((enqueue\(\d+(?:,\d+)*\)|dequeue\(\))\s*)+$/i;
  return syntaxPattern.test(input);
}

function qParseSyntaxCommands(input){
  const commandPattern = /(enqueue\((\d+(?:,\d+)*)\)|dequeue\(\))/gi;
  const commands = [];

  let match;
  while((match = commandPattern.exec(input)) !== null){
    if(match[1].toLowerCase().startsWith('enqueue')){
      const values = match[2].split(',').map(value => parseInt(value.trim(), 10));
      values.forEach(value => commands.push({type: 'enqueue', value}));

      continue;
    }

    commands.push({type: 'dequeue'});
  }

  return commands;
}

function qSynFormatPreviewStep(step){
  return step ? qDescribeStep(step, qLang()) : '';
}

function qSynGetPreviewState(){
  if(!Array.isArray(qSyntaxSteps) || qSyntaxSteps.length === 0)
    return {prev: '', current: '', next: ''};

  if(qSynHistory.length === 0)
    return {prev: '', current: '', next: qSynFormatPreviewStep(qSyntaxSteps[0])};

  const index = qSynFinished && qSynHistoryCursor >= 0 ? qSynHistoryCursor : qSyntaxIndex;
  return {prev: qSynFormatPreviewStep(qSyntaxSteps[index - 1]), current: qSynFormatPreviewStep(qSyntaxSteps[index]), next: qSynFormatPreviewStep(qSyntaxSteps[index + 1])};
}

function qSynRenderPreview(animate = false){
  typesParamsSetOperationPreviewVisible('q', qSynPreviewVisible);
  if(!qSynPreviewVisible)
    return;

  typesParamsUpdateOperationPreview('q', qSynGetPreviewState(), animate);
}

function qSynSchedulePreviewHide(){
  qClearSyntaxPreviewHideTimer();
}

function qCloneStateForSyntaxPreview(beforeState){
  return {snapshot: qCloneSnapshot(beforeState?.snapshot), beforeIn: beforeState?.beforeIn ?? 0, beforeOut: beforeState?.beforeOut ?? 0, stepCount: beforeState?.stepCount ?? 0, potential: beforeState?.potential ?? 0};
}

function qBuildSyntaxPreviewStep(step, beforeState, langData = qLang()){
  const previewStep = {...step};
  const safeBefore = qCloneStateForSyntaxPreview(beforeState);

  if(previewStep.type === 'enqueue')
    return qFinalizeStep(previewStep, safeBefore, {qIn: [...safeBefore.snapshot.qIn, previewStep.value], qOut: [...safeBefore.snapshot.qOut]}, 1, {value: previewStep.value, transferredCount: 0}, langData);
  if(safeBefore.beforeOut > 0){
    const removedValue = safeBefore.snapshot.qOut[safeBefore.snapshot.qOut.length - 1];
    return qFinalizeStep(previewStep, safeBefore, {qIn: [...safeBefore.snapshot.qIn], qOut: safeBefore.snapshot.qOut.slice(0, -1)}, 1, {removedValue, wasEmpty: false, usedTransfer: false, transferredCount: 0}, langData);
  }
  if(safeBefore.beforeIn === 0)
    return qFinalizeStep(previewStep, safeBefore, safeBefore.snapshot, 0, {wasEmpty: true, usedTransfer: false, transferredCount: 0}, langData);

  const transferredCount = safeBefore.beforeIn;
  const transferredValues = [...safeBefore.snapshot.qIn].reverse();
  const removedValue = transferredValues[transferredValues.length - 1];

  return qFinalizeStep(previewStep, safeBefore, {qIn: [], qOut: transferredValues.slice(0, -1)}, 2 * transferredCount + 1, {removedValue, wasEmpty: false, usedTransfer: true, transferredCount}, langData);
}

function qSetSyntaxPendingPreview(stepIndex, step, beforeState){
  qSynPendingPreview = {stepIndex, step: step ? {type: step.type, value: step.value} : null, beforeState: qCloneStateForSyntaxPreview(beforeState)};
}

function qClearSyntaxPendingPreview(){
  qSynPendingPreview = null;
}

function qGetSyntaxPendingPreview(langData = qLang()){
  if(!qSynPendingPreview?.step || !qSynPendingPreview.beforeState)
    return null;

  const previewStep = qBuildSyntaxPreviewStep(qSynPendingPreview.step, qSynPendingPreview.beforeState, langData);
  return {title: `${qSynPendingPreview.stepIndex + 1}/${qSyntaxSteps.length}: ${previewStep.description}`, detailHtml: previewStep.detail};
}

function qSynSaveHistoryEntry(step){
  const L = qLang();
  const prevTotal = qSynHistory.length ? (qSyntaxSteps[qSynHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  qDecorateRecordedStep(step, prevTotal, L);

  const title = `${qSyntaxIndex + 1}/${qSyntaxSteps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  qSynHistory.push({title, detailHtml, snapshot: qMakeSnapshot(), stepCount: qStepCount, potential: qPotential});
  updateQueueCounters();
}

function qSynRestoreHistoryEntry(index){
  if(index < 0 || index >= qSynHistory.length)
    return;

  qSynHistoryCursor = index;

  const entry = qSynHistory[index];
  qApplyState(entry.snapshot, entry.stepCount, entry.potential);
  qSyntaxIndex = index;

  renderQueueStacks();
  updateQueueCounters();
  qSynRenderInfo();
  qSynUpdateFinishUI();
}

function qSynReplayNextFromHistory(){
  if(!qSynFinished || qBusy)
    return;
  if(qSynHistoryCursor < 0 || qSynHistoryCursor >= qSyntaxSteps.length - 1)
    return;

  const nextIndex = qSynHistoryCursor + 1;

  qSkipAnimations = false;
  qSyntaxIndex = nextIndex;
  qSynHistoryCursor = nextIndex;

  qSetSyntaxNextEnabled(false);
  const currentStep = qSyntaxSteps[qSyntaxIndex];

  qExecuteStep(currentStep, () => {
    qSetSyntaxNextEnabled(true);
    qSynRenderInfo();
  });

  qSynRenderInfo();
}

function qSynGoHistory(delta){
  if(!qSynFinished)
    return;

  if(delta < 0){
    const nextIndex = qSynHistoryCursor - 1;
    if(nextIndex < 0)
      return;

    qSynRestoreHistoryEntry(nextIndex);
    return;
  }

  qSynReplayNextFromHistory();
}

function qSynBuildHistoryModalHtml(){
  const L = qLang();

  if(!Array.isArray(qSynHistory) || qSynHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return qSynHistory.map(entry => buildCollapsibleHistoryEntryHtml({title: entry.title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml: entry.detailHtml})).join('');
}

function qSynOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = qLang();
    return {title: `${L.syntaxHistoryTitle || 'Syntax mode history'} – ${L.queue2StacksTitle || 'Queue using Two Stacks'}`, bodyHtml: qSynBuildHistoryModalHtml()};
  });
}

function startQueue2StacksSyntaxExample(){
  const L = qLang();
  const inputEl = document.getElementById('syntaxInput');
  const input = (inputEl?.value || '').trim();

  if(!qValidateSyntax(input)){
    if(inputEl)
      inputEl.value = '';

    showAppMessage(L.queueSyntaxInvalidAlert);
    return;
  }

  qResetState();

  qSyntaxCommands = qParseSyntaxCommands(input);
  if(qSyntaxCommands.length === 0){
    if(inputEl)
      inputEl.value = '';

    showAppMessage(L.queueSyntaxInvalidAlert);
    return;
  }

  qSyntaxSteps = qBuildStepsFromCommands(qSyntaxCommands);
  qSyntaxIndex = 0;
  qIsSyntaxMode = true;
  qSynHistory = [];
  qSynHistoryCursor = -1;
  qSynFinished = false;
  qSynPreviewVisible = true;

  $('#syntaxModal').modal('hide');
  displayQueue2StacksSyntaxUI();

  qSetSyntaxNextEnabled(false);
  const firstStep = qSyntaxSteps[qSyntaxIndex];

  qExecuteStep(firstStep, () => {
    qSynSaveHistoryEntry(firstStep);
    qSynHistoryCursor = 0;
    updateQueueCounters();

    if(qSyntaxIndex === qSyntaxSteps.length - 1)
      qSynFinished = true;

    qSetSyntaxNextEnabled(true);
    qSynRenderInfo();

    if(qSynFinished){
      qSynRenderPreview(true);
      qSynSchedulePreviewHide();
    }
  });
}

function nextQueue2StacksSyntaxStep(){
  if(!qIsSyntaxMode || qSyntaxSteps.length === 0)
    return;

  if(qBusy)
    return;

  if(qSynFinished){
    qResetState();
    returnToMainPageFromSyntax('queue2Stacks');
    
    return;
  }

  if(qSyntaxIndex >= qSyntaxSteps.length - 1)
    return;

  qSyntaxIndex++;

  qSetSyntaxNextEnabled(false);
  const currentStep = qSyntaxSteps[qSyntaxIndex];

  qExecuteStep(currentStep, () => {
    qSynSaveHistoryEntry(currentStep);
    qSynHistoryCursor = qSynHistory.length - 1;
    updateQueueCounters();

    if(qSyntaxIndex === qSyntaxSteps.length - 1)
      qSynFinished = true;

    qSetSyntaxNextEnabled(true);
    qSynRenderInfo();

    if(qSynFinished){
      qSynRenderPreview(true);
      qSynSchedulePreviewHide();
    }
    else if(qSynPreviewVisible)
      qSynRenderPreview(true);
  });
}

function rebuildQueueSyntaxStepsForLanguage(){
  if(!qIsSyntaxMode || qSyntaxCommands.length === 0)
    return;

  const L = qLang();
  const oldSteps = qSyntaxSteps;
  const newSteps = qBuildStepsFromCommands(qSyntaxCommands);

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

  qSyntaxSteps = newSteps;

  if(Array.isArray(qSynHistory) && qSynHistory.length > 0){
    qSynHistory = qSynHistory.map((entry, index) => {
      const step = qSyntaxSteps[index];
      if(!step)
        return entry;

      return {...entry, title: `${index + 1}/${qSyntaxSteps.length}: ${step.description}`, detailHtml: (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '')};
    });
  }

  if(document.getElementById('qSynPanel'))
    qSynRenderInfo();
}