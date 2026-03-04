function pushToStackManual(value){
  if(mpBusy)
    return;

  stackArray.push(value);
  stepCount += 1;
  potential = stackArray.length;

  updateStackView();

  const items = document.querySelectorAll('.stack-item');
  const newItem = items[items.length - 1];
  if(newItem) 
    newItem.classList.add('new-item');

  updateCounters();
}

function popFromStackManual(){
  if(mpBusy) 
    return undefined;

  const langData = mpLang();
  if(stackArray.length === 0){
    showAppMessage(langData.stackEmptyAlert);
    return undefined;
  }

  const items = document.querySelectorAll('.stack-item');
  const removedItem = items[items.length - 1];
  if(!removedItem) 
    return undefined;

  mpBusy = true;
  setSyntaxNextEnabled(false);

  const removedValue = stackArray[stackArray.length - 1];
  removedItem.classList.add('removed-item');

  removedItem.addEventListener('animationend', () => {
    stackArray.pop();
    stepCount += 1;
    potential = stackArray.length;

    updateStackView();
    updateCounters();

    mpBusy = false;
    setSyntaxNextEnabled(true);
  }, {once: true});

  return removedValue;
}

function multipopFromStackManual(count){
  if(mpBusy)
    return null;

  const langData = mpLang();
  if(!Number.isInteger(count) || count <= 0){
    alert(langData.invalidNumberAlert);
    return null;
  }

  const k = Math.min(count, stackArray.length);
  if(k === 0){
    showAppMessage(langData.stackEmptyAlert);
    return [];
  }

  const removedVals = stackArray.slice(-k);
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

        mpBusy = false;
        setSyntaxNextEnabled(true);
      }
    }, {once: true});
  });
  return removedVals;
}