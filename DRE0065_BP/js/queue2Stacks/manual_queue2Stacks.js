function initQueue2StacksManual(values){
    qIsBestWorstMode = false;
    qIn = [...values];
    qOut = [];
    qStepCount = 0;
    qPotential = qIn.length;
    qBusy = false;
    qShowInfoPanel = false;
    clearQInfo();
    displayQueue2Stacks();
}

function enqueueQueue2StacksManual(value){
    if(qBusy)
        return;

    qIn.push(value);
    qStepCount += 1;
    qPotential = qIn.length;

    renderQueueStacks();
    animatePush('qInView');
    updateQueueCounters();
}

function dequeueQueue2Stacks(done){
    if(qBusy)
        return;
    qBusy = true;

    dequeueQueue2StacksSequence((removed) => {
        qBusy = false;
        if(done)
            done(removed);
    });
}

function dequeueQueue2StacksSequence(done){
    const langData = qGetLang();

    if(qOut.length === 0 && qIn.length === 0){
        showAppMessage(langData.queueEmptyAlert);
        clearQInfo();
        if(done) 
            done(undefined);

        return;
    }

    if(qOut.length === 0){
        setQInfoKey('queueInfoTransfer');
        transferAllFromInToOut(() => {popFromOut(done);});
    }
    else
        popFromOut(done);
}

function transferAllFromInToOut(done){
    if(qIn.length === 0){
        qPotential = qIn.length;
        updateQueueCounters();
        if(done)
            done();

        return;
    }

    const x = qIn[qIn.length - 1];
    setQInfoKey('queueInfoMove', {value: x});

    animatePop('qInView', () => {
        qIn.pop();
        qStepCount += 1;

        qOut.push(x);
        qStepCount += 1;
        qPotential = qIn.length;

        renderQueueStacks();
        animatePush('qOutView');
        updateQueueCounters();
        setTimeout(() => transferAllFromInToOut(done), 250);
    });
}

function popFromOut(done){
    const x = qOut[qOut.length - 1];
    setQInfoKey('queueInfoDequeue', {value: x, potential: qPotential});

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