function qInitManual(values){
  qIsBestWorstMode = false;
  qBestWorstMode = null;
  qIn = [...values];
  qOut = [];
  qStepCount = 0;
  qPotential = qIn.length;
  qBusy = false;
  qShowInfoPanel = false;

  clearQInfo();
  displayQueue2Stacks();
}

function initQueue2StacksManual(values){
  qInitManual(values);
}

function qEnqueueManual(value){
  if(qBusy)
    return;

  qIn.push(value);
  qStepCount += 1;
  qPotential = qIn.length;

  renderQueueStacks();
  animatePush('qInView');
  updateQueueCounters();
}

function enqueueQueue2StacksManual(value){
  qEnqueueManual(value);
}

function qDequeue(done, suppressEmptyMessage = false){
  if(qBusy)
    return;

  qBusy = true;
  qDequeueSequence((removed) => {qBusy = false;
    if(done)
      done(removed);
  }, suppressEmptyMessage);
}

function dequeueQueue2Stacks(done, suppressEmptyMessage = false){
  qDequeue(done, suppressEmptyMessage);
}

function qDequeueSequence(done, suppressEmptyMessage = false){
  const L = qLang();

  if(qOut.length === 0 && qIn.length === 0){
    if(!suppressEmptyMessage)
      showAppMessage(L.queueEmptyAlert);

    clearQInfo();
    if(done)
      done(undefined);

    return;
  }

  if(qOut.length === 0){
    setQInfoKeys('queueInfoTransferTitle', 'queueInfoTransferDetail', 'queueInfoTransfer');
    qTransferAllFromInToOut(() => {qPopFromOut(done);});
    return;
  }

  qPopFromOut(done);
}

function qTransferAllFromInToOut(done){
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

    setTimeout(() => qTransferAllFromInToOut(done), 250);
  });
}

function qPopFromOut(done){
  const x = qOut[qOut.length - 1];
  setQInfoKeys('queueInfoDequeueTitle', 'queueInfoDequeueDetail', 'queueInfoDequeue', {value: x, potential: qPotential});

  animatePop('qOutView', () => {
    qOut.pop();
    qStepCount += 1;

    renderQueueStacks();
    updateQueueCounters();

    setTimeout(() => clearQInfo(), 250);
    if(done)
        done(x);
  });
}