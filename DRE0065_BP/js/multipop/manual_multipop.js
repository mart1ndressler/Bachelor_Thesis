function mpApplyManualStateAndRefresh(snapshot, nextStepCount, nextPotential){
  mpApplyState(snapshot, nextStepCount, nextPotential);
  updateStackView();
  updateCounters();
}

function mpCommitManualStep(step){
  if(!mpShouldTrackManualHistory())
    return;

  mpAddManualHistoryEntry(step);
  mpManualInfoIndex = mpManualHistory.length - 1;
  mpRenderManualInfoPanel();
}

function mpRunRemovalAnimation(items, onComplete){
  mpBusy = true;
  setSyntaxNextEnabled(false);

  let finishedCount = 0;

  items.forEach(item => {
    item.classList.add('removed-item');
    item.addEventListener('animationend', () => {
      finishedCount++;

      if(finishedCount === items.length){
        onComplete();
        mpBusy = false;
        setSyntaxNextEnabled(true);
      }
    }, {once: true});
  });
}

function pushToStackManual(value){
  if(mpBusy)
    return;

  const beforeState = mpCreateStateSnapshot();

  stackArray.push(value);
  stepCount += 1;
  potential = stackArray.length;

  updateStackView();

  const items = document.querySelectorAll('.stack-item');
  const newItem = items[items.length - 1];
  if(newItem)
    newItem.classList.add('new-item');

  updateCounters();

  const step = mpFinalizeStep({type: 'push', value}, beforeState, stackArray, 1);
  mpCommitManualStep(step);
}

function popFromStackManual(){
  if(mpBusy)
    return undefined;

  const beforeState = mpCreateStateSnapshot();
  if(beforeState.size === 0){
    const step = mpFinalizeStep({type: 'pop'}, beforeState, beforeState.snapshot, 0);
    mpCommitManualStep(step);

    return undefined;
  }

  const removedValue = beforeState.snapshot[beforeState.size - 1];
  if(mpSkipAnimations){
    const afterSnapshot = beforeState.snapshot.slice(0, -1);
    mpApplyManualStateAndRefresh(afterSnapshot, beforeState.stepCount + 1, afterSnapshot.length);

    const step = mpFinalizeStep({type: 'pop'}, beforeState, afterSnapshot, 1, {removedValue});
    mpCommitManualStep(step);

    return removedValue;
  }

  const items = document.querySelectorAll('.stack-item');
  const removedItem = items[items.length - 1];
  if(!removedItem)
    return undefined;

  mpRunRemovalAnimation([removedItem], () => {
    const afterSnapshot = beforeState.snapshot.slice(0, -1);
    mpApplyManualStateAndRefresh(afterSnapshot, beforeState.stepCount + 1, afterSnapshot.length);

    const step = mpFinalizeStep({type: 'pop'}, beforeState, afterSnapshot, 1, {removedValue});
    mpCommitManualStep(step);
  });

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

  const beforeState = mpCreateStateSnapshot();
  const actualCount = Math.min(count, beforeState.size);
  if(actualCount === 0){
    const step = mpFinalizeStep({type: 'multipop', count}, beforeState, beforeState.snapshot, 0, {requestedCount: count, actualCount: 0});
    mpCommitManualStep(step);

    return [];
  }

  const removedValues = beforeState.snapshot.slice(-actualCount);
  if(mpSkipAnimations){
    const afterSnapshot = beforeState.snapshot.slice(0, beforeState.size - actualCount);
    mpApplyManualStateAndRefresh(afterSnapshot, beforeState.stepCount + actualCount, afterSnapshot.length);

    const step = mpFinalizeStep({type: 'multipop', count}, beforeState, afterSnapshot, actualCount, {requestedCount: count, actualCount, removedValues});
    mpCommitManualStep(step);

    return removedValues;
  }

  const items = Array.from(document.querySelectorAll('.stack-item'));
  const removingItems = items.slice(-actualCount);
  if(removingItems.length === 0)
    return removedValues;

  mpRunRemovalAnimation(removingItems, () => {
    const afterSnapshot = beforeState.snapshot.slice(0, beforeState.size - actualCount);
    mpApplyManualStateAndRefresh(afterSnapshot, beforeState.stepCount + actualCount, afterSnapshot.length);

    const step = mpFinalizeStep({type: 'multipop', count}, beforeState, afterSnapshot, actualCount, {requestedCount: count, actualCount, removedValues});
    mpCommitManualStep(step);
  });

  return removedValues;
}

function mpResetExecutedStepArtifacts(step){
  delete step.removedValue;
  delete step.removedValues;
  delete step.actualCount;
  delete step.afterSnapshot;
  delete step.afterStepCount;
  delete step.afterPotential;
}

function mpExecuteStep(step){
  const beforeState = mpCreateStateSnapshot();
  mpResetExecutedStepArtifacts(step);

  if(step.type === 'push'){
    pushToStackManual(step.value);
    mpFinalizeStep(step, beforeState, [...beforeState.snapshot, step.value], 1, {value: step.value});

    return;
  }

  if(step.type === 'pop'){
    const removedValue = popFromStackManual();
    const actualCost = removedValue === undefined ? 0 : 1;
    const afterSnapshot = removedValue === undefined? [...beforeState.snapshot] : beforeState.snapshot.slice(0, -1);

    mpFinalizeStep(step, beforeState, afterSnapshot, actualCost, removedValue === undefined ? {} : {removedValue});
    return;
  }

  const requestedCount = step.count;
  const removedValuesFromManual = multipopFromStackManual(requestedCount) || [];
  const actualCount = Math.min(requestedCount, beforeState.size);

  let removedValues = removedValuesFromManual;
  if(!Array.isArray(removedValues) || removedValues.length !== actualCount)
    removedValues = beforeState.snapshot.slice(beforeState.size - actualCount).reverse();

  const afterSnapshot = beforeState.snapshot.slice(0, beforeState.size - actualCount);
  mpFinalizeStep(step, beforeState, afterSnapshot, actualCount, {count: requestedCount, requestedCount, actualCount, ...(actualCount > 0 ? {removedValues} : {})});

  if(!mpSkipAnimations){
    const syncFinalMultipopState = () => {
      if(mpBusy){
        setTimeout(syncFinalMultipopState, 20);
        return;
      }

      mpApplyManualStateAndRefresh(afterSnapshot, step.afterStepCount, step.afterPotential);
    };

    syncFinalMultipopState();
  }
}

function mpManualBuildHistoryModalHtml(){
  const L = mpLang();

  if(!Array.isArray(mpManualHistory) || mpManualHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return mpManualHistory.map((entry, index) => {
    const step = entry.step || {};
    const title = mpBuildManualHistoryTitle(index, step, L);
    const detailHtml = mpBuildStepDetail(step, L);

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

function mpManualOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = mpLang();

    return {title: `${L.historyModalBaseTitle || 'History'} – ${L.multipopTitle || 'Multipop on Stack'}`, bodyHtml: mpManualBuildHistoryModalHtml()};
  });
}

function mpManualSeedHistoryFromValues(values){
  mpManualHistory = [];

  if(!Array.isArray(values) || values.length === 0)
    return;

  const tempStack = [];
  let tempStepCount = 0;
  let tempPotential = 0;

  for(const value of values){
    const beforeState = {snapshot: [...tempStack], size: tempStack.length, stepCount: tempStepCount, potential: tempPotential};

    tempStack.push(value);
    tempStepCount += 1;
    tempPotential = tempStack.length;

    const step = mpFinalizeStep({type: 'push', value}, beforeState, tempStack, 1);
    mpAddManualHistoryEntry(step, {snapshot: [...tempStack], stepCountValue: tempStepCount, potentialValue: tempPotential});
  }
}