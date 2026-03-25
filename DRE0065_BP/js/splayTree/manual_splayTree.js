function sNewNode(key){
  return {id: sNextId++, key, left: null, right: null, parent: null, x: 0, y: 0};
}

function sTraceReset(){
  sSynCurrentTrace = [];
}

function sTraceStart(kind, vars = {}){
  if(!sTraceActive)
    return null;

  sComputePotential();
  return {kind, vars, stepsBefore: sStepCount, phiBefore: sPotential};
}

function sTraceFinish(trace, extraVars = {}){
  if(!sTraceActive || !trace)
    return;

  sComputePotential();
  sSynCurrentTrace.push({kind: trace.kind, vars: {...trace.vars, ...extraVars}, deltaSteps: sStepCount - trace.stepsBefore, phiBefore: trace.phiBefore, phiAfter: sPotential, deltaPhi: sPotential - trace.phiBefore});
}

function sCaptureHistoryResult(beforeSteps, beforePhi, extra = {}){
  sComputePotential();

  const traceEvents = Array.isArray(sSynCurrentTrace) ? sSynCurrentTrace.map(ev => ({...ev, vars: {...(ev.vars || {})}})) : [];
  sTraceActive = false;

  return {deltaSteps: sStepCount - beforeSteps, phiBefore: beforePhi, phiAfter: sPotential, deltaPhi: sPotential - beforePhi, traceEvents, rootAfter: sRoot ? sRoot.key : null, ...extra};
}

function sPathText(keys){
  return keys.length ? keys.join(' → ') : '—';
}

function sDelay(ms, done){
  if(sSkipAnimations){
    if(done)
      done();

    return;
  }

  setTimeout(() => {
    if(done)
      done();
  }, ms);
}

function sAnimatePath(pathIds, stepMs, done){
  let index = 0;

  function tick(){
    if(index >= pathIds.length){
      if(done)
        done();

      return;
    }

    sRenderTree({activeId: pathIds[index], pathIds: pathIds.slice(0, index + 1), animate: false});

    index++;
    sDelay(stepMs, tick);
  }

  tick();
}

function sPrepareManualStep(){
  sComputePotential();
  const traceContext = {beforeSteps: sStepCount, beforePhi: sPotential};

  sBusy = true;
  sSetButtonsEnabled(false);
  sTraceReset();
  sTraceActive = true;

  return traceContext;
}

function sFinishManualStep(step, traceContext, extra = {}, unlockDelay = 0){
  const result = sCaptureHistoryResult(traceContext.beforeSteps, traceContext.beforePhi, extra);

  sManualSaveHistoryEntry(step, result);
  sManualInfoIndex = sManualHistory.length - 1;
  sRenderManualInfoPanel();
  sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});

  const unlock = () => {
    sBusy = false;
    sSetButtonsEnabled(true);
  };

  if(unlockDelay > 0)
    sDelay(unlockDelay, unlock);
  else
    unlock();
}

function sBuildInitial(values, {source = 'manual'} = {}){
  if(sBusy)
    return;

  const myToken = ++sRunToken;

  sBusy = true;
  sSetButtonsEnabled(false);

  sInitValues = [...values];
  sInitSource = source;
  sInitBuildIndex = -1;

  sRenderInitValuesBox();
  sShowBuildPanel(true);

  sRoot = null;
  sStepCount = 0;
  sPotential = 0;
  sRenderTree({activeId: null, pathIds: []});

  let index = 0;
  function next(){
    if(myToken !== sRunToken)
      return;

    if(index >= values.length){
      sInitBuildIndex = values.length;
      sRenderInitValuesBox();
      sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
      sShowBuildPanel(false);

      sBusy = false;
      sSetButtonsEnabled(true);

      return;
    }

    sInitBuildIndex = index;
    sRenderInitValuesBox();

    const step = {op: 'insert', value: values[index]};
    const beforeSteps = sStepCount;

    sComputePotential();
    const beforePhi = sPotential;

    sTraceReset();
    sTraceActive = true;

    sInsertCore(values[index], (resultData = {}) => {
      if(myToken !== sRunToken)
        return;

      const result = sCaptureHistoryResult(beforeSteps, beforePhi, {inserted: !!resultData.inserted, duplicate: !!resultData.duplicate});
      sManualSaveHistoryEntry(step, result);

      sDelay(120, () => {
        if(myToken !== sRunToken)
          return;

        index++;
        next();
      });
    });
  }

  next();
}

function sRotateLeft(node){
  const rightChild = node.right;
  if(!rightChild)
    return;

  sStepCount += 1;

  node.right = rightChild.left;
  if(rightChild.left)
    rightChild.left.parent = node;

  rightChild.parent = node.parent;
  if(!node.parent)
    sRoot = rightChild;
  else if(node === node.parent.left)
    node.parent.left = rightChild;
  else
    node.parent.right = rightChild;

  rightChild.left = node;
  node.parent = rightChild;
}

function sRotateRight(node){
  const leftChild = node.left;
  if(!leftChild)
    return;

  sStepCount += 1;

  node.left = leftChild.right;
  if(leftChild.right)
    leftChild.right.parent = node;

  leftChild.parent = node.parent;
  if(!node.parent)
    sRoot = leftChild;
  else if(node === node.parent.left)
    node.parent.left = leftChild;
  else
    node.parent.right = leftChild;

  leftChild.right = node;
  node.parent = leftChild;
}

function sSplayAnimated(node, done){
  function step(){
    if(!node || !node.parent){
      if(done)
        done();

      return;
    }

    const parent = node.parent;
    const grandparent = parent.parent;

    if(!grandparent){
      if(node === parent.left){
        const trace = sTraceStart('rotateRight', {pivotKey: parent.key, promotedKey: node.key, caseType: 'zig'});
        sRotateRight(parent);
        sTraceFinish(trace, {rootAfter: sRoot ? sRoot.key : null});
      }
      else{
        const trace = sTraceStart('rotateLeft', {pivotKey: parent.key, promotedKey: node.key, caseType: 'zig'});
        sRotateLeft(parent);
        sTraceFinish(trace, {rootAfter: sRoot ? sRoot.key : null});
      }

      sRenderTree({activeId: node.id});
      sDelay(S_MOVE_MS, step);

      return;
    }

    if(node === parent.left && parent === grandparent.left){
      const trace1 = sTraceStart('rotateRight', {pivotKey: grandparent.key, promotedKey: parent.key, caseType: 'zig-zig'});
      sRotateRight(grandparent);
      sTraceFinish(trace1, {rootAfter: sRoot ? sRoot.key : null});

      sRenderTree({activeId: node.id});
      sDelay(S_MOVE_MS, () => {
        const pivotKey = node.parent ? node.parent.key : null;
        const trace2 = sTraceStart('rotateRight', {pivotKey, promotedKey: node.key, caseType: 'zig-zig'});

        sRotateRight(node.parent);
        sTraceFinish(trace2, {rootAfter: sRoot ? sRoot.key : null});

        sRenderTree({activeId: node.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    if(node === parent.right && parent === grandparent.right){
      const trace1 = sTraceStart('rotateLeft', {pivotKey: grandparent.key, promotedKey: parent.key, caseType: 'zig-zig'});
      sRotateLeft(grandparent);
      sTraceFinish(trace1, {rootAfter: sRoot ? sRoot.key : null});

      sRenderTree({activeId: node.id});
      sDelay(S_MOVE_MS, () => {
        const pivotKey = node.parent ? node.parent.key : null;
        const trace2 = sTraceStart('rotateLeft', {pivotKey, promotedKey: node.key, caseType: 'zig-zig'});

        sRotateLeft(node.parent);
        sTraceFinish(trace2, {rootAfter: sRoot ? sRoot.key : null});

        sRenderTree({activeId: node.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    if(node === parent.right && parent === grandparent.left){
      const trace1 = sTraceStart('rotateLeft', {pivotKey: parent.key, promotedKey: node.key, caseType: 'zig-zag'});
      sRotateLeft(parent);
      sTraceFinish(trace1, {rootAfter: sRoot ? sRoot.key : null});

      sRenderTree({activeId: node.id});
      sDelay(S_MOVE_MS, () => {
        const pivotKey = node.parent ? node.parent.key : null;
        const trace2 = sTraceStart('rotateRight', {pivotKey, promotedKey: node.key, caseType: 'zig-zag'});

        sRotateRight(node.parent);
        sTraceFinish(trace2, {rootAfter: sRoot ? sRoot.key : null});

        sRenderTree({activeId: node.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    const trace1 = sTraceStart('rotateRight', {pivotKey: parent.key, promotedKey: node.key, caseType: 'zig-zag'});
    sRotateRight(parent);
    sTraceFinish(trace1, {rootAfter: sRoot ? sRoot.key : null});

    sRenderTree({activeId: node.id});
    sDelay(S_MOVE_MS, () => {
      const pivotKey = node.parent ? node.parent.key : null;
      const trace2 = sTraceStart('rotateLeft', {pivotKey, promotedKey: node.key, caseType: 'zig-zag'});

      sRotateLeft(node.parent);
      sTraceFinish(trace2, {rootAfter: sRoot ? sRoot.key : null});

      sRenderTree({activeId: node.id});
      sDelay(S_MOVE_MS, step);
    });
  }

  step();
}

function sContainsKey(node, key){
  let current = node;

  while(current){
    if(key === current.key)
      return true;

    current = key < current.key ? current.left : current.right;
  }

  return false;
}

function sInsertCore(key, done, instant = false){
  if(!sRoot){
    const rootTrace = sTraceStart('rootInsert', {value: key});

    sStepCount += 1;
    const node = sNewNode(key);
    sRoot = node;

    sRenderTree({activeId: node.id});
    sTraceFinish(rootTrace, {rootKey: key});

    if(instant){
      if(done)
        done({inserted: true, duplicate: false});

      return;
    }

    sDelay(S_MOVE_MS, () => {
      if(done)
        done({inserted: true, duplicate: false});
    });

    return;
  }

  let current = sRoot;
  let parent = null;

  const pathIds = [];
  const pathKeys = [];
  const pathTrace = sTraceStart('path', {operation: 'insert', target: key});

  while(current){
    parent = current;
    pathIds.push(current.id);
    pathKeys.push(current.key);

    sStepCount += 1;

    if(key < current.key)
      current = current.left;
    else if(key > current.key)
      current = current.right;
    else{
      sTraceFinish(pathTrace, {pathText: sPathText(pathKeys), compareCount: pathKeys.length, outcome: 'duplicate'});

      sAnimatePath(pathIds, 260, () => {
        sSplayAnimated(parent, () => {
          if(done)
            done({inserted: false, duplicate: true});
        });
      });

      return;
    }
  }

  const side = key < parent.key ? 'left' : 'right';
  sTraceFinish(pathTrace, {pathText: sPathText(pathKeys), compareCount: pathKeys.length, outcome: 'position', parentKey: parent.key, side});

  sAnimatePath(pathIds, 260, () => {
    const attachTrace = sTraceStart('insertAttach', {value: key, parentKey: parent.key, side});
    const node = sNewNode(key);
    node.parent = parent;

    sStepCount += 1;
    if(side === 'left')
      parent.left = node;
    else
      parent.right = node;

    sRenderTree({activeId: node.id, pathIds});
    sTraceFinish(attachTrace, {rootAfter: sRoot ? sRoot.key : null});

    sDelay(S_MOVE_MS, () => {
      sSplayAnimated(node, () => {
        if(done)
          done({inserted: true, duplicate: false});
      });
    });
  });
}

function sSearchCore(key, done, instant = false){
  if(!sRoot){
    sRenderTree();

    if(instant){
      if(done)
        done({found: false});

      return;
    }

    sDelay(220, () => {
      if(done)
        done({found: false});
    });

    return;
  }

  let current = sRoot;
  let last = null;

  const pathIds = [];
  const pathKeys = [];
  const pathTrace = sTraceStart('path', {operation: 'search', target: key});

  while(current){
    last = current;
    pathIds.push(current.id);
    pathKeys.push(current.key);

    sStepCount += 1;

    if(key === current.key)
      break;

    current = key < current.key ? current.left : current.right;
  }

  sTraceFinish(pathTrace, {pathText: sPathText(pathKeys), compareCount: pathKeys.length, outcome: current ? 'found' : 'notFound'});

  sAnimatePath(pathIds, 260, () => {
    const target = current || last;
    if(!target){
      if(done)
        done({found: false});

      return;
    }

    sSplayAnimated(target, () => {
      if(done)
        done({found: !!current});
    });
  });
}

function sDeleteCore(key, done, instant = false){
  if(!sRoot){
    sRenderTree();

    if(instant){
      if(done)
        done({deleted: false});

      return;
    }

    sDelay(220, () => {
      if(done)
        done({deleted: false});
    });

    return;
  }

  let current = sRoot;
  let last = null;

  const pathIds = [];
  const pathKeys = [];
  const pathTrace = sTraceStart('path', {operation: 'delete', target: key});

  while(current){
    last = current;
    pathIds.push(current.id);
    pathKeys.push(current.key);

    sStepCount += 1;

    if(key === current.key)
      break;

    current = key < current.key ? current.left : current.right;
  }

  sTraceFinish(pathTrace, {pathText: sPathText(pathKeys), compareCount: pathKeys.length, outcome: current ? 'found' : 'notFound'});

  sAnimatePath(pathIds, 260, () => {
    const target = current || last;
    if(!target){
      if(done)
        done({deleted: false});

      return;
    }

    sSplayAnimated(target, () => {
      if(!sRoot || sRoot.key !== key){
        if(done)
          done({deleted: false});

        return;
      }

      const oldRoot = sRoot;
      const leftSubtree = oldRoot.left;
      const rightSubtree = oldRoot.right;
      const splitTrace = sTraceStart('deleteSplit', {deletedKey: key});

      oldRoot.left = null;
      oldRoot.right = null;
      oldRoot.parent = null;

      if(leftSubtree)
        leftSubtree.parent = null;
      if(rightSubtree)
        rightSubtree.parent = null;

      sTraceFinish(splitTrace, {leftRootKey: leftSubtree ? leftSubtree.key : null, rightRootKey: rightSubtree ? rightSubtree.key : null});

      if(!leftSubtree){
        sRoot = rightSubtree;
        if(sRoot)
          sRoot.parent = null;

        const attachTrace = sTraceStart('deleteAttachRight', {rootKey: sRoot ? sRoot.key : null, attachedRightKey: null});
        sTraceFinish(attachTrace, {rootAfter: sRoot ? sRoot.key : null});
        sRenderTree({activeId: sRoot ? sRoot.id : null});

        sDelay(S_MOVE_MS, () => {
          if(done)
            done({deleted: true});
        });

        return;
      }

      sRoot = leftSubtree;
      let maxNode = sRoot;

      const joinKeys = [maxNode.key];
      const joinTrace = sTraceStart('deleteJoinPath', {});

      while(maxNode.right){
        sStepCount += 1;
        maxNode = maxNode.right;
        joinKeys.push(maxNode.key);
      }

      sTraceFinish(joinTrace, {pathText: sPathText(joinKeys), compareCount: Math.max(0, joinKeys.length - 1), maxKey: maxNode.key});

      sSplayAnimated(maxNode, () => {
        const attachTrace = sTraceStart('deleteAttachRight', {rootKey: sRoot ? sRoot.key : null, attachedRightKey: rightSubtree ? rightSubtree.key : null});

        sRoot.right = rightSubtree;
        if(rightSubtree)
          rightSubtree.parent = sRoot;

        sTraceFinish(attachTrace, {rootAfter: sRoot ? sRoot.key : null});
        sRenderTree({activeId: sRoot.id});

        sDelay(S_MOVE_MS, () => {
          if(done)
            done({deleted: true});
        });
      });
    });
  });
}

function sExecuteStep(step, done, instant = false){
  if(step.op === 'insert'){
    sInsertCore(step.value, (resultData = {}) => {
      if(done)
        done({inserted: !!resultData.inserted, duplicate: !!resultData.duplicate});}, instant);

    return;
  }

  if(step.op === 'search'){
    sSearchCore(step.value, (resultData = {}) => {
      if(done)
        done({found: !!resultData.found});}, instant);

    return;
  }

  sDeleteCore(step.value, (resultData = {}) => {
    if(done)
      done({deleted: !!resultData.deleted});}, instant);
}

function sInsert(key){
  if(sBusy)
    return;

  const step = {op: 'insert', value: key};
  const traceContext = sPrepareManualStep();

  sExecuteStep(step, (resultData = {}) => {sFinishManualStep(step, traceContext, {inserted: !!resultData.inserted, duplicate: !!resultData.duplicate});});
}

function sSearch(key){
  if(sBusy)
    return;

  const step = {op: 'search', value: key};
  const traceContext = sPrepareManualStep();

  if(!sRoot){
    sStepCount += 1;
    sFinishManualStep(step, traceContext, {found: false}, 220);

    return;
  }

  sExecuteStep(step, (resultData = {}) => {sFinishManualStep(step, traceContext, {found: !!resultData.found});});
}

function sDelete(key){
  if(sBusy)
    return;

  const step = {op: 'delete', value: key};
  const traceContext = sPrepareManualStep();

  if(!sRoot){
    sStepCount += 1;
    sFinishManualStep(step, traceContext, {deleted: false}, 220);

    return;
  }

  sExecuteStep(step, (resultData = {}) => {sFinishManualStep(step, traceContext, {deleted: !!resultData.deleted});});
}