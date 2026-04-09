function mpRandomPickStepType(stackSize){
  if(stackSize === 0)
    return 'push';

  const roll = Math.random();
  if(stackSize <= 2){
    if(roll < 0.72)
      return 'push';
    if(roll < 0.88)
      return 'pop';

    return 'multipop';
  }

  if(roll < 0.62)
    return 'push';
  if(roll < 0.82)
    return 'pop';

  return 'multipop';
}

function mpRandomBuildSteps(min, max, operationCount){
  const steps = [];
  const virtualStack = [];

  for(let i = 0; i < operationCount; i++){
    const type = mpRandomPickStepType(virtualStack.length);

    if(type === 'push'){
      const value = getRandomIntInclusive(min, max);
      virtualStack.push(value);
      steps.push({type: 'push', value});

      continue;
    }
    if(type === 'pop'){
      virtualStack.pop();
      steps.push({type: 'pop'});

      continue;
    }

    const allowOvershoot = Math.random() < 0.25;
    const maxCount = Math.max(1, virtualStack.length + (allowOvershoot ? 2 : 0));
    const count = getRandomIntInclusive(1, maxCount);
    const actualCount = Math.min(count, virtualStack.length);

    virtualStack.length = virtualStack.length - actualCount;
    steps.push({type: 'multipop', count});
  }

  return steps;
}

function mpStartRandomMode({min, max, count}){
  mpResetState();

  mpIsRandomMode = true;
  mpRandomSteps = mpRandomBuildSteps(min, max, count);
  mpRandomCursor = 0;
  mpManualInfoOpen = false;

  displayStack([]);
}

function mpRandomFinishIntoManualMode(){
  mpIsRandomMode = false;
  mpRandomSteps = [];
  mpRandomCursor = 0;

  displayStack(stackArray);
}

function mpRandomAfterStepSettles(executedStep){
  if(mpBusy){
    setTimeout(() => mpRandomAfterStepSettles(executedStep), 25);
    return;
  }

  mpRandomCursor++;

  if(mpRandomCursor >= mpRandomSteps.length){
    if(executedStep?.type === 'push' && !mpSkipAnimations){
      const items = document.querySelectorAll('.stack-item');
      const lastItem = items[items.length - 1];

      if(lastItem){
        mpBusy = true;

        lastItem.addEventListener('animationend', () => {
          mpBusy = false;
          mpRandomFinishIntoManualMode();
        }, {once: true});

        return;
      }
    }

    mpRandomFinishIntoManualMode();
    return;
  }

  updateCounters();
  mpRenderManualInfoPanel();
}

function mpRandomNextStep(){
  if(!mpIsRandomMode || mpBusy)
    return;

  if(mpRandomCursor >= mpRandomSteps.length){
    mpRandomFinishIntoManualMode();
    return;
  }

  const step = mpRandomSteps[mpRandomCursor];
  mpExecuteStep(step);
  mpRandomAfterStepSettles(step);
}