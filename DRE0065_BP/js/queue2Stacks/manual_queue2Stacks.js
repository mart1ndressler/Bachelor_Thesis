function qInitManual(values){
  qIsBestWorstMode = false;
  qBestWorstMode = null;
  qManualHistory = [];
  qManualInfoIndex = -1;
  qManualInfoOpen = false;
  qIn = [...values];
  qOut = [];
  qStepCount = qIn.length;
  qPotential = qIn.length;
  qBusy = false;
  qShowInfoPanel = false;

  if(typeof qManualSeedHistoryFromValues === 'function')
    qManualSeedHistoryFromValues(values);

  clearQInfo();
  displayQueue2Stacks();
}

function initQueue2StacksManual(values){
  qInitManual(values);
}

function qEnqueueManual(value){
  if(qBusy)
    return;

  const L = qLang();
  const beforeIn = qIn.length;
  const beforeOut = qOut.length;
  const phiBefore = qPotential;

  qIn.push(value);
  qStepCount += 1;
  qPotential = qIn.length;

  renderQueueStacks();
  animatePush('qInView');
  updateQueueCounters();

  if(qCanUseManualHistory()){
    const step = {type: 'enqueue', value, description: `${L.enqueueButton} ${value}`, beforeIn, beforeOut, afterIn: qIn.length, afterOut: qOut.length, actualCost: 1, transferredCount: 0, phiBefore, phiAfter: qPotential, deltaPhi: qPotential - phiBefore};
    step.detail = qBuildSyntaxDetail(step, L);
    qManualSaveHistoryEntry(step);

    qManualInfoIndex = qManualHistory.length - 1;
    qRenderManualInfoPanel();
  }
}

function enqueueQueue2StacksManual(value){
  qEnqueueManual(value);
}

function qDequeue(done, runToken = null){
  if(qBusy)
    return;

  qBusy = true;
  qDequeueSequence((removed) => {
    qBusy = false;

    if(done)
      done(removed);
  }, runToken);
}

function dequeueQueue2Stacks(done, runToken = null){
  qDequeue(done, runToken);
}

function qDequeueManualWithHistory(){
  if(qBusy)
    return;

  const L = qLang();
  const beforeIn = qIn.length;
  const beforeOut = qOut.length;
  const phiBefore = qPotential;

  dequeueQueue2Stacks((removed) => {
    const step = {type: 'dequeue', description: `${L.dequeueButton}`, beforeIn, beforeOut, afterIn: qIn.length, afterOut: qOut.length, phiBefore, phiAfter: qPotential, deltaPhi: qPotential - phiBefore};
    
    if(removed === undefined){
      step.wasEmpty = true;
      step.usedTransfer = false;
      step.transferredCount = 0;
      step.actualCost = 0;
    }
    else{
      step.removedValue = removed;
      step.wasEmpty = false;
      step.usedTransfer = (beforeOut === 0 && beforeIn > 0);
      step.transferredCount = step.usedTransfer ? beforeIn : 0;
      step.actualCost = step.usedTransfer ? (2 * step.transferredCount + 1) : 1;
    }

    step.detail = qBuildSyntaxDetail(step, L);
    if(qCanUseManualHistory()){
      qManualSaveHistoryEntry(step);
      
      qManualInfoIndex = qManualHistory.length - 1;
      qRenderManualInfoPanel();
    }
  });
}

function qDequeueSequence(done, runToken = null){
  if(runToken !== null && runToken !== qRunToken)
    return;

  const langData = qLang();
  if(qOut.length === 0 && qIn.length === 0){
    clearQInfo();
    if(done)
      done(undefined);

    return;
  }

  if(qOut.length === 0){
    setQInfoKeys('queueInfoTransferTitle', 'queueInfoTransferDetail', 'queueInfoTransfer');

    qTransferAllFromInToOut(() => {
      if(runToken !== null && runToken !== qRunToken)
        return;

      qPopFromOut(done, runToken);
    }, runToken);

    return;
  }

  qPopFromOut(done, runToken);
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

  const x = qIn[qIn.length - 1];
  setQInfoKeys('queueInfoMoveTitle', 'queueInfoMoveDetail', 'queueInfoMove', {value: x});

  animatePop('qInView', () => {
    qIn.pop();
    qStepCount += 1;

    qOut.push(x);
    qStepCount += 1;
    qPotential = qIn.length;

    renderQueueStacks();
    animatePush('qOutView');
    updateQueueCounters();

    qRunTimer = setTimeout(() => {
      if(runToken !== null && runToken !== qRunToken)
        return;

      qTransferAllFromInToOut(done, runToken);
    }, qSkipAnimations ? 0 : 250);
  });
}

function qPopFromOut(done, runToken = null){
  if(runToken !== null && runToken !== qRunToken)
    return;

  const x = qOut[qOut.length - 1];
  setQInfoKeys('queueInfoDequeueTitle', 'queueInfoDequeueDetail', 'queueInfoDequeue', {value: x, potential: qPotential});

  animatePop('qOutView', () => {
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
        done(x);
  });
}