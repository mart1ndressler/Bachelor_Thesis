function qFormatRandomStep(step){
  return step ? qDescribeStep(step, qLang()) : '';
}

function qGetRandomPreviewState(){
  return {prev: qFormatRandomStep(qRandomSteps[qRandomCursor - 2]), current: qFormatRandomStep(qRandomSteps[qRandomCursor - 1]), next: qFormatRandomStep(qRandomSteps[qRandomCursor])};
}

function qRenderRandomPreview(animate = false){
  typesParamsUpdateOperationPreview('q', qGetRandomPreviewState(), animate);
}

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
  qRenderRandomPreview(false);
}

function qRandomFinishIntoManualMode(){
  qIsRandomMode = false;
  qRandomSteps = [];
  qRandomCursor = 0;

  displayQueue2Stacks();
}

function qRandomAdvanceAfterExecutedStep(){
  qRandomCursor++;
  qRenderRandomPreview(true);

  if(qRandomCursor >= qRandomSteps.length){
    qClearSyntaxPreviewHideTimer();
    qSynPreviewHideTimer = setTimeout(() => {
      if(!qIsRandomMode)
        return;

      qRandomFinishIntoManualMode();
    }, 1200);
    
    return;
  }
  
  updateQueueCounters();
  qRenderRandomPreview(true);
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