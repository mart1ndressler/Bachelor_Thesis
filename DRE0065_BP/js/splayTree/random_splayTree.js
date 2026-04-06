function sRandomPickExistingValue(present){
  const values = Array.from(present);
  if(values.length === 0)
    return null;

  return values[getRandomIntInclusive(0, values.length - 1)];
}

function sRandomPickMissingValue(min, max, present){
  const rangeSize = max - min + 1;
  if(rangeSize <= present.size)
    return null;

  for(let i = 0; i < 40; i++){
    const candidate = getRandomIntInclusive(min, max);
    if(!present.has(candidate))
      return candidate;
  }

  for(let candidate = min; candidate <= max; candidate++){
    if(!present.has(candidate))
      return candidate;
  }

  return null;
}

function sRandomBuildSteps(min, max, operationCount){
  const steps = [];
  const present = new Set();
  const rangeSize = max - min + 1;

  for(let i = 0; i < operationCount; i++){
    const canInsert = present.size < rangeSize;
    let op = null;

    if(present.size === 0 && canInsert)
      op = 'insert';
    else{
      const roll = Math.random();

      if(canInsert){
        if(roll < 0.72)
          op = 'insert';
        else if(roll < 0.89)
          op = 'search';
        else
          op = 'delete';
      }
      else
        op = roll < 0.60 ? 'search' : 'delete';
    }

    if(op === 'insert'){
      const value = sRandomPickMissingValue(min, max, present);
      if(value !== null){
        present.add(value);
        steps.push({op: 'insert', value});

        continue;
      }

      op = present.size > 0 && Math.random() < 0.55 ? 'search' : 'delete';
    }

    if(op === 'search'){
      const preferExisting = present.size > 0 && Math.random() < 0.75;
      let value = preferExisting ? sRandomPickExistingValue(present) : sRandomPickMissingValue(min, max, present);
      if(value === null)
        value = sRandomPickExistingValue(present) ?? getRandomIntInclusive(min, max);

      steps.push({op: 'search', value});
      continue;
    }

    const preferExisting = present.size > 0 && Math.random() < 0.85;
    let value = preferExisting ? sRandomPickExistingValue(present) : sRandomPickMissingValue(min, max, present);
    if(value === null)
      value = sRandomPickExistingValue(present) ?? getRandomIntInclusive(min, max);
    
    if(present.has(value))
      present.delete(value);

    steps.push({op: 'delete', value});
  }

  return steps;
}

function sRandomBuildResultPayload(step, resultData = {}){
  if(step.op === 'insert')
    return {inserted: !!resultData.inserted, duplicate: !!resultData.duplicate};
  if(step.op === 'search')
    return {found: !!resultData.found};

  return {deleted: !!resultData.deleted};
}

function sStartRandomMode({min, max, count}){
  sResetAll();

  sIsRandomMode = true;
  sRandomSteps = sRandomBuildSteps(min, max, count);
  sRandomCursor = 0;
  sManualInfoOpen = false;

  sRenderManualUI();
  sRenderTree({activeId: null, pathIds: []});
  sUpdateCounters();
}

function sRandomFinishIntoManualMode(){
  sIsRandomMode = false;
  sRandomSteps = [];
  sRandomCursor = 0;

  sRenderManualUI();

  const redrawAfterLayout = () => {
    sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
    sUpdateCounters();
    sRenderManualInfoPanel();
  };

  requestAnimationFrame(() => {
    redrawAfterLayout();
    requestAnimationFrame(() => {redrawAfterLayout();});
  });
}

function sRandomAdvanceAfterExecutedStep(){
  sRandomCursor++;

  if(sRandomCursor >= sRandomSteps.length){
    sRandomFinishIntoManualMode();
    return;
  }

  sUpdateCounters();
  sRenderManualInfoPanel();
}

function sRandomNextStep(){
  if(!sIsRandomMode || sBusy)
    return;

  if(sRandomCursor >= sRandomSteps.length){
    sRandomFinishIntoManualMode();
    return;
  }

  const step = sRandomSteps[sRandomCursor];
  const traceContext = sPrepareManualStep();

  sExecuteStep(step, (resultData = {}) => {
    sFinishManualStep(step, traceContext, sRandomBuildResultPayload(step, resultData));
    sRandomAdvanceAfterExecutedStep();
  });
}