function qFinishManualStep(step){
  if(!qShouldTrackManualHistory())
    return;

  const prevTotal = qManualHistory.length ? (qManualHistory[qManualHistory.length - 1].step?.totalAmortizedCost ?? 0) : 0;
  qDecorateRecordedStep(step, prevTotal);
  qAddManualHistoryEntry(step);

  qManualInfoIndex = qManualHistory.length - 1;
  updateQueueCounters();
  qRenderManualInfoPanel();
}

function qInitManual(values){
  qResetState();

  qIn = [...values];
  qOut = [];
  qStepCount = qIn.length;
  qPotential = qIn.length;
  qBusy = false;

  qManualSeedHistoryFromValues(values);
  displayQueue2Stacks();
}

function qRunEnqueueVisual(value, done){
  qBusy = true;

  qSetMainButtonsEnabled(false);
  qSetSyntaxNextEnabled(false);

  qIn.push(value);
  qStepCount += 1;
  qPotential = qIn.length;

  renderQueueStacks();
  updateQueueCounters();

  qAnimateAddTopItem('qInView', () => {
    qBusy = false;

    qSetMainButtonsEnabled(true);
    qSetSyntaxNextEnabled(true);

    if(done)
      done();
  });
}

function qEnqueueManual(value){
  if(qBusy)
    return;

  const beforeState = qCreateStateSnapshot();
  qRunEnqueueVisual(value, () => {
    const step = qFinalizeStep({type: 'enqueue', value}, beforeState, qMakeSnapshot(), 1, {transferredCount: 0});
    qFinishManualStep(step);
  });
}

function qRunDequeue(done){
  if(qBusy)
    return;

  qBusy = true;
  qSetMainButtonsEnabled(false);
  qSetSyntaxNextEnabled(false);

  qRunDequeueSequence((removedValue) => {
    qBusy = false;

    qSetMainButtonsEnabled(true);
    qSetSyntaxNextEnabled(true);

    if(done)
      done(removedValue);
  });
}

function qRunManualDequeue(){
  if(qBusy)
    return;

  const beforeState = qCreateStateSnapshot();
  const usedTransfer = (beforeState.beforeOut === 0 && beforeState.beforeIn > 0);
  const transferredCount = usedTransfer ? beforeState.beforeIn : 0;

  qRunDequeue((removedValue) => {
    const afterSnapshot = qMakeSnapshot();

    if(removedValue === undefined){
      const step = qFinalizeStep({type: 'dequeue'}, beforeState, afterSnapshot, 0, {wasEmpty: true, usedTransfer: false, transferredCount: 0});
      qFinishManualStep(step);

      return;
    }

    const actualCost = usedTransfer ? (2 * transferredCount + 1) : 1;
    const step = qFinalizeStep({type: 'dequeue'}, beforeState, afterSnapshot, actualCost, {removedValue, wasEmpty: false, usedTransfer, transferredCount});
    qFinishManualStep(step);
  });
}

function qRunDequeueSequence(done){
  if(qOut.length === 0 && qIn.length === 0){
    if(done)
      done(undefined);

    return;
  }

  if(qOut.length === 0){
    qTransferAllFromInToOut(() => {qRemoveFromOut(done);});
    return;
  }

  qRemoveFromOut(done);
}

function qTransferAllFromInToOut(done){
  if(qIn.length === 0){
    qPotential = qIn.length;
    updateQueueCounters();

    if(done)
      done();

    return;
  }

  const value = qIn[qIn.length - 1];
  qAnimateRemoveTopItem('qInView', () => {
    qIn.pop();
    qStepCount += 1;
    qOut.push(value);
    qStepCount += 1;
    qPotential = qIn.length;

    renderQueueStacks();
    qAnimateAddTopItem('qOutView');
    updateQueueCounters();

    qRunTimer = setTimeout(() => {qTransferAllFromInToOut(done);}, qSkipAnimations ? 0 : 250);
  });
}

function qRemoveFromOut(done){
  const removedValue = qOut[qOut.length - 1];
  
  qAnimateRemoveTopItem('qOutView', () => {
    qOut.pop();
    qStepCount += 1;

    renderQueueStacks();
    updateQueueCounters();

    if(done)
      done(removedValue);
  });
}

function qResetExecutedStepArtifacts(step){
  delete step.removedValue;
  delete step.usedTransfer;
  delete step.wasEmpty;
  delete step.beforeIn;
  delete step.beforeOut;
  delete step.afterIn;
  delete step.afterOut;
  delete step.actualCost;
  delete step.phiBefore;
  delete step.phiAfter;
  delete step.deltaPhi;
  delete step.transferredCount;
  delete step.detail;
}

function qSyncExecutedStepIntoRuntimeCollections(step){
  if(qIsSyntaxMode && Array.isArray(qSyntaxSteps) && qSyntaxSteps[qSyntaxIndex])
    qSyntaxSteps[qSyntaxIndex] = {...qSyntaxSteps[qSyntaxIndex], ...step};

  if(qIsSpecialCasesMode && Array.isArray(qScSteps) && qScSteps[qScCursor])
    qScSteps[qScCursor] = {...qScSteps[qScCursor], ...step};
}

function qExecuteStep(step, done){
  const token = qRunToken;
  const beforeState = qCreateStateSnapshot();

  if(qIsSyntaxMode)
    qSetSyntaxPendingPreview(qSyntaxIndex, step, beforeState);

  qResetExecutedStepArtifacts(step);
  if(step.type === 'enqueue'){
    qRunEnqueueVisual(step.value, () => {
      if(token !== qRunToken)
        return;

      qFinalizeStep(step, beforeState, qMakeSnapshot(), 1, {value: step.value, transferredCount: 0});
      qFinishManualStep(step);
      qSyncExecutedStepIntoRuntimeCollections(step);
      qClearSyntaxPendingPreview();

      if(done)
        done();
    });

    return;
  }

  const usedTransfer = (beforeState.beforeOut === 0 && beforeState.beforeIn > 0);
  const transferredCount = usedTransfer ? beforeState.beforeIn : 0;

  qRunDequeue((removedValue) => {
    if(token !== qRunToken)
      return;

    const afterSnapshot = qMakeSnapshot();
    if(removedValue === undefined){
      qFinalizeStep(step, beforeState, afterSnapshot, 0, {wasEmpty: true, usedTransfer: false, transferredCount: 0});
      qFinishManualStep(step);
      qSyncExecutedStepIntoRuntimeCollections(step);
      qClearSyntaxPendingPreview();

      if(done)
        done();

      return;
    }

    const actualCost = usedTransfer ? (2 * transferredCount + 1) : 1;
    qFinalizeStep(step, beforeState, afterSnapshot, actualCost, {removedValue, wasEmpty: false, usedTransfer, transferredCount});
    qFinishManualStep(step);
    qSyncExecutedStepIntoRuntimeCollections(step);
    qClearSyntaxPendingPreview();
    
    if(done)
      done();
  });
}

function qManualBuildHistoryModalHtml(){
  const L = qLang();

  if(!Array.isArray(qManualHistory) || qManualHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return qManualHistory.map((entry, index) => {
    const step = entry.step || {};
    const title = qBuildManualHistoryTitle(index, step, L);
    const detailHtml = qBuildStepDetail(step, L);

    return buildCollapsibleHistoryEntryHtml({title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml});
  }).join('');
}

function qManualOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = qLang();
    return {title: `${L.historyModalBaseTitle || 'History'} – ${L.queue2StacksTitle || 'Queue using Two Stacks'}`, bodyHtml: qManualBuildHistoryModalHtml()};
  });
}

function qManualSeedHistoryFromValues(values){
  qManualHistory = [];

  if(!Array.isArray(values) || values.length === 0)
    return;

  const tempIn = [];
  const tempOut = [];
  
  let tempStepCount = 0;
  let tempPotential = 0;
  
  for(const value of values){
    const beforeState = {snapshot: {qIn: [...tempIn], qOut: [...tempOut]}, beforeIn: tempIn.length, beforeOut: tempOut.length, stepCount: tempStepCount, potential: tempPotential};

    tempIn.push(value);
    tempStepCount += 1;
    tempPotential = tempIn.length;

    const step = qFinalizeStep({type: 'enqueue', value}, beforeState, {qIn: [...tempIn], qOut: [...tempOut]}, 1, {transferredCount: 0});
    const prevTotal = qManualHistory.length ? (qManualHistory[qManualHistory.length - 1].step?.totalAmortizedCost ?? 0) : 0;

    qDecorateRecordedStep(step, prevTotal);
    qAddManualHistoryEntry(step, {snapshot: {qIn: [...tempIn], qOut: [...tempOut]}, stepCountValue: tempStepCount, potentialValue: tempPotential});
  }
}