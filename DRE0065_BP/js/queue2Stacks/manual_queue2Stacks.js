function qFinishManualStep(step){
  if(!qShouldTrackManualHistory())
    return;

  qAddManualHistoryEntry(step);
  qManualInfoIndex = qManualHistory.length - 1;
  qRenderManualInfoPanel();
}

function qInitManual(values){
  qResetState();

  qIn = [...values];
  qOut = [];
  qStepCount = qIn.length;
  qPotential = qIn.length;
  qBusy = false;
  qShowInfoPanel = false;

  qManualSeedHistoryFromValues(values);
  clearQInfo();
  displayQueue2Stacks();
}

function qEnqueueManual(value){
  if(qBusy)
    return;

  const beforeState = qCreateStateSnapshot();

  qIn.push(value);
  qStepCount += 1;
  qPotential = qIn.length;

  renderQueueStacks();
  qAnimateAddTopItem('qInView');
  updateQueueCounters();

  const step = qFinalizeStep({type: 'enqueue', value}, beforeState, qMakeSnapshot(), 1, {transferredCount: 0});
  qFinishManualStep(step);
}

function qRunDequeue(done, runToken = null){
  if(qBusy)
    return;

  qBusy = true;

  qRunDequeueSequence((removedValue) => {
    qBusy = false;

    if(done)
      done(removedValue);
  }, runToken);
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

function qRunDequeueSequence(done, runToken = null){
  if(runToken !== null && runToken !== qRunToken)
    return;

  if(qOut.length === 0 && qIn.length === 0){
    clearQInfo();

    if(done)
      done(undefined);

    return;
  }

  if(qOut.length === 0){
    qUpdateInfoPanel('queueInfoTransferTitle', 'queueInfoTransferDetail', 'queueInfoTransfer');

    qTransferAllFromInToOut(() => {
      if(runToken !== null && runToken !== qRunToken)
        return;

      qRemoveFromOut(done, runToken);
    }, runToken);

    return;
  }

  qRemoveFromOut(done, runToken);
}

function qTransferAllFromInToOut(done, runToken = null){
  if(runToken !== null && runToken !== qRunToken)
    return;

  if(qIn.length === 0){
    qPotential = qIn.length;
    updateQueueCounters();

    if(done)
      done();

    return;
  }

  const value = qIn[qIn.length - 1];
  qUpdateInfoPanel('queueInfoMoveTitle', 'queueInfoMoveDetail', 'queueInfoMove', {value});

  qAnimateRemoveTopItem('qInView', () => {
    qIn.pop();
    qStepCount += 1;
    qOut.push(value);
    qStepCount += 1;
    qPotential = qIn.length;

    renderQueueStacks();
    qAnimateAddTopItem('qOutView');
    updateQueueCounters();

    qRunTimer = setTimeout(() => {
      if(runToken !== null && runToken !== qRunToken)
        return;

      qTransferAllFromInToOut(done, runToken);
    }, qSkipAnimations ? 0 : 250);
  });
}

function qRemoveFromOut(done, runToken = null){
  if(runToken !== null && runToken !== qRunToken)
    return;

  const removedValue = qOut[qOut.length - 1];
  qUpdateInfoPanel('queueInfoDequeueTitle', 'queueInfoDequeueDetail', 'queueInfoDequeue', {value: removedValue, potential: qPotential});

  qAnimateRemoveTopItem('qOutView', () => {
    qOut.pop();
    qStepCount += 1;

    renderQueueStacks();
    updateQueueCounters();

    qRunTimer = setTimeout(() => {
      if(runToken !== null && runToken !== qRunToken)
        return;

      clearQInfo();
    }, qSkipAnimations ? 0 : 250);

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

  if(qIsBestWorstMode && Array.isArray(qBwSteps) && qBwSteps[qBwCursor])
    qBwSteps[qBwCursor] = {...qBwSteps[qBwCursor], ...step};
}

function qExecuteStep(step, done){
  const beforeState = qCreateStateSnapshot();
  qResetExecutedStepArtifacts(step);

  if(step.type === 'enqueue'){
    qEnqueueManual(step.value);
    qFinalizeStep(step, beforeState, qMakeSnapshot(), 1, {value: step.value, transferredCount: 0});
    qSyncExecutedStepIntoRuntimeCollections(step);

    if(done)
      done();

    return;
  }

  const usedTransfer = (beforeState.beforeOut === 0 && beforeState.beforeIn > 0);
  const transferredCount = usedTransfer ? beforeState.beforeIn : 0;

  qRunDequeue((removedValue) => {
    const afterSnapshot = qMakeSnapshot();

    if(removedValue === undefined){
      qFinalizeStep(step, beforeState, afterSnapshot, 0, {wasEmpty: true, usedTransfer: false, transferredCount: 0});
      qSyncExecutedStepIntoRuntimeCollections(step);

      if(done)
        done();

      return;
    }

    const actualCost = usedTransfer ? (2 * transferredCount + 1) : 1;
    qFinalizeStep(step, beforeState, afterSnapshot, actualCost, {removedValue, wasEmpty: false, usedTransfer, transferredCount});
    qSyncExecutedStepIntoRuntimeCollections(step);

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

    return `
      <div class="syntax-history-entry">
        <div class="info-panel-title">${title}</div>
        <div class="syntax-history-meta">
          ${L.stepCount}: ${entry.stepCount} |
          ${L.potential}: ${entry.potential}
        </div>
        <div class="info-step-detail">${detailHtml}</div>
      </div>
    `;
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
    qAddManualHistoryEntry(step, {snapshot: {qIn: [...tempIn], qOut: [...tempOut]}, stepCountValue: tempStepCount, potentialValue: tempPotential});
  }
}