function qRandomPickStepType(queueSize){
  if(queueSize === 0)
    return 'enqueue';

  const roll = Math.random();
  if(queueSize === 1)
    return roll < 0.78 ? 'enqueue' : 'dequeue';

  return roll < 0.68 ? 'enqueue' : 'dequeue';
}

function qRandomBuildSteps(min, max, operationCount){
  const steps = [];
  let virtualQueueSize = 0;

  for(let i = 0; i < operationCount; i++){
    const type = qRandomPickStepType(virtualQueueSize);

    if(type === 'enqueue'){
      const value = getRandomIntInclusive(min, max);
      virtualQueueSize++;
      steps.push({type: 'enqueue', value});
      
      continue;
    }

    virtualQueueSize--;
    steps.push({type: 'dequeue'});
  }

  return steps;
}

function qStartRandomMode({min, max, count}){
  qResetState();

  qIsRandomMode = true;
  qRandomSteps = qRandomBuildSteps(min, max, count);
  qRandomCursor = 0;
  qManualInfoOpen = false;

  displayQueue2Stacks();
}

function qRandomFinishIntoManualMode(){
  qIsRandomMode = false;
  qRandomSteps = [];
  qRandomCursor = 0;

  displayQueue2Stacks();
}

function qRandomAdvanceAfterExecutedStep(){
  qRandomCursor++;

  if(qRandomCursor >= qRandomSteps.length){
    qRandomFinishIntoManualMode();
    return;
  }

  updateQueueCounters();
  qRenderManualInfoPanel();
}

function qRandomNextStep(){
  if(!qIsRandomMode || qBusy)
    return;

  if(qRandomCursor >= qRandomSteps.length){
    qRandomFinishIntoManualMode();
    return;
  }

  qExecuteStep(qRandomSteps[qRandomCursor], qRandomAdvanceAfterExecutedStep);
}