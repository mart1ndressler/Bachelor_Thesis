function pushToStackManual(value){
  if(mpBusy)
    return;

  const L = mpLang();
  const beforeSnapshot = [...stackArray];
  const beforePotential = potential;

  stackArray.push(value);
  stepCount += 1;
  potential = stackArray.length;

  updateStackView();

  const items = document.querySelectorAll('.stack-item');
  const newItem = items[items.length - 1];
  if(newItem)
    newItem.classList.add('new-item');

  updateCounters();

  if(mpCanUseManualHistory()){
    const step = {type: 'push', value, description: `${L.pushButton} ${value}`, beforeSize: beforeSnapshot.length, afterSnapshot: [...stackArray], afterSize: stackArray.length, actualCost: 1, phiBefore: beforePotential, phiAfter: potential, deltaPhi: potential - beforePotential, afterStepCount: stepCount, afterPotential: potential};
    step.detail = mpBuildStepDetail(step, L);
    mpManualSaveHistoryEntry(step);

    mpManualInfoIndex = mpManualHistory.length - 1;
    mpRenderManualInfoPanel();
  }
}

function popFromStackManual(){
  if(mpBusy)
    return undefined;

  const L = mpLang();
  const beforeSnapshot = [...stackArray];
  const beforeStepCount = stepCount;
  const beforePotential = potential;
  const removedValue = beforeSnapshot.length > 0 ? beforeSnapshot[beforeSnapshot.length - 1] : undefined;

  if(beforeSnapshot.length === 0){
    if(mpCanUseManualHistory()){
      const step = {type: 'pop', description: `${L.popButton}`, beforeSize: 0, afterSnapshot: [], afterSize: 0, actualCost: 0, phiBefore: beforePotential, phiAfter: beforePotential, deltaPhi: 0, afterStepCount: beforeStepCount, afterPotential: beforePotential};
      step.detail = mpBuildStepDetail(step, L);
      mpManualSaveHistoryEntry(step);

      mpManualInfoIndex = mpManualHistory.length - 1;
      mpRenderManualInfoPanel();
    }

    return undefined;
  }

  const items = document.querySelectorAll('.stack-item');
  const removedItem = items[items.length - 1];

  if(mpSkipAnimations){
    stackArray.pop();
    stepCount += 1;
    potential = stackArray.length;

    updateStackView();
    updateCounters();

    if(mpCanUseManualHistory()){
      const step = {type: 'pop', description: `${L.popButton}`, removedValue, beforeSize: beforeSnapshot.length, afterSnapshot: [...stackArray], afterSize: stackArray.length, actualCost: 1, phiBefore: beforePotential, phiAfter: potential, deltaPhi: potential - beforePotential, afterStepCount: stepCount, afterPotential: potential};
      step.detail = mpBuildStepDetail(step, L);
      mpManualSaveHistoryEntry(step);

      mpManualInfoIndex = mpManualHistory.length - 1;
      mpRenderManualInfoPanel();
    }

    return removedValue;
  }

  if(!removedItem)
    return undefined;

  mpBusy = true;
  setSyntaxNextEnabled(false);
  removedItem.classList.add('removed-item');

  removedItem.addEventListener('animationend', () => {
    stackArray.pop();
    stepCount += 1;
    potential = stackArray.length;

    updateStackView();
    updateCounters();

    if(mpCanUseManualHistory()){
      const step = {type: 'pop', description: `${L.popButton}`, removedValue, beforeSize: beforeSnapshot.length, afterSnapshot: [...stackArray], afterSize: stackArray.length, actualCost: 1, phiBefore: beforePotential, phiAfter: potential, deltaPhi: potential - beforePotential, afterStepCount: stepCount, afterPotential: potential};
      step.detail = mpBuildStepDetail(step, L);
      mpManualSaveHistoryEntry(step);

      mpManualInfoIndex = mpManualHistory.length - 1;
      mpRenderManualInfoPanel();
    }

    mpBusy = false;
    setSyntaxNextEnabled(true);
  }, {once: true});

  return removedValue;
}

function multipopFromStackManual(count){
  if(mpBusy)
    return null;

  const L = mpLang();
  if(!Number.isInteger(count) || count <= 0){
    alert(L.invalidNumberAlert);
    return null;
  }

  const beforeSnapshot = [...stackArray];
  const beforeStepCount = stepCount;
  const beforePotential = potential;
  const k = Math.min(count, stackArray.length);

  if(k === 0){
    if(mpCanUseManualHistory()){
      const step = {type: 'multipop', count, requestedCount: count, actualCount: 0, description: `${L.multipopButton}(${count})`, beforeSize: beforeSnapshot.length, afterSnapshot: [...beforeSnapshot], afterSize: beforeSnapshot.length, actualCost: 0, phiBefore: beforePotential, phiAfter: beforePotential, deltaPhi: 0, afterStepCount: beforeStepCount, afterPotential: beforePotential};
      step.detail = mpBuildStepDetail(step, L);
      mpManualSaveHistoryEntry(step);

      mpManualInfoIndex = mpManualHistory.length - 1;
      mpRenderManualInfoPanel();
    }

    return [];
  }

  const removedVals = stackArray.slice(-k);
  if(mpSkipAnimations){
    for(let i = 0; i < k; i++)
      stackArray.pop();

    stepCount += k;
    potential = stackArray.length;

    updateStackView();
    updateCounters();

    if(mpCanUseManualHistory()){
      const step = {type: 'multipop', count, requestedCount: count, actualCount: k, removedValues: removedVals, description: `${L.multipopButton}(${count})`, beforeSize: beforeSnapshot.length, afterSnapshot: [...stackArray], afterSize: stackArray.length, actualCost: k, phiBefore: beforePotential, phiAfter: potential, deltaPhi: potential - beforePotential, afterStepCount: stepCount, afterPotential: potential};
      step.detail = mpBuildStepDetail(step, L);
      mpManualSaveHistoryEntry(step);

      mpManualInfoIndex = mpManualHistory.length - 1;
      mpRenderManualInfoPanel();
    }

    return removedVals;
  }

  const items = Array.from(document.querySelectorAll('.stack-item'));
  const removingItems = items.slice(-k);
  if(removingItems.length === 0)
    return removedVals;

  mpBusy = true;
  setSyntaxNextEnabled(false);

  let finished = 0;
  removingItems.forEach(item => {
    item.classList.add('removed-item');
    item.addEventListener('animationend', () => {
      finished++;

      if(finished === removingItems.length){
        for(let i = 0; i < k; i++)
          stackArray.pop();

        stepCount += k;
        potential = stackArray.length;

        updateStackView();
        updateCounters();

        if(mpCanUseManualHistory()){
          const step = {type: 'multipop', count, requestedCount: count, actualCount: k, removedValues: removedVals, description: `${L.multipopButton}(${count})`, beforeSize: beforeSnapshot.length, afterSnapshot: [...stackArray], afterSize: stackArray.length, actualCost: k, phiBefore: beforePotential, phiAfter: potential, deltaPhi: potential - beforePotential, afterStepCount: stepCount, afterPotential: potential};
          step.detail = mpBuildStepDetail(step, L);
          mpManualSaveHistoryEntry(step);

          mpManualInfoIndex = mpManualHistory.length - 1;
          mpRenderManualInfoPanel();
        }

        mpBusy = false;
        setSyntaxNextEnabled(true);
      }
    }, {once: true});
  });

  return removedVals;
}