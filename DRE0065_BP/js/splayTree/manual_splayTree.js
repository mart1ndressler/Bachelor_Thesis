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

function sPathText(keys){
  return keys.length ? keys.join(' → ') : '—';
}

function sResetAll(){
  sRoot = null;
  sNextId = 1;
  sStepCount = 0;
  sPotential = 0;
  sBusy = false;
  sInitValues = [];
  sInitSource = null;
  sInitBuildIndex = -1;
  sBwMode = null;
  sBwSteps = [];
  sBwIndex = 0;
  sBwRunToken += 1;
  sSynSteps = [];
  sSynCursor = 0;
  sSynResults = [];
  sSynCurrentTrace = [];
  sTraceActive = false;
  sSynHistory = [];
  sSynHistoryCursor = -1;
  sSynFinished = false;
  sSynInstantFirstStep = false;
  sBwExecutionMode = 'auto';
  sBwPaused = false;
  sBwFinished = false;
  sBwHistory = [];
  sBwResults = [];
  sBwHistoryCursor = -1;
  sBwFastForward = false;
  sManualHistory = [];
  sManualInfoIndex = -1;
  sManualInfoOpen = false;
  sBwInitialSteps = [];
  sSkipAnimations = false;
  sEdgeAnimToken += 1;

  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }

  if(sEdgeAnimRaf){
    cancelAnimationFrame(sEdgeAnimRaf);
    sEdgeAnimRaf = 0;
  }
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
  let i = 0;
  function tick(){
    if(i >= pathIds.length){
      if(done)
        done();

      return;
    }

    sRenderTree({activeId: pathIds[i], pathIds: pathIds.slice(0, i + 1), animate: false});
    i++;
    sDelay(stepMs, tick);
  }

  tick();
}

function sBuildInitial(values, {source = 'manual'} = {}){
  if(sBusy)
    return;

  const myToken = ++sBwRunToken;

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

  let i = 0;
  function next(){
    if(myToken !== sBwRunToken)
      return;

    if(i >= values.length){
      sInitBuildIndex = values.length;
      sRenderInitValuesBox();

      sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
      sShowBuildPanel(false);

      sBusy = false;
      sSetButtonsEnabled(true);
      return;
    }

    sInitBuildIndex = i;
    sRenderInitValuesBox();

    const step = {op: 'insert', value: values[i]};
    const beforeSteps = sStepCount;
    sComputePotential();
    const beforePhi = sPotential;

    sTraceReset();
    sTraceActive = true;

    sInsertCore(values[i], (r = {}) => {
      if(myToken !== sBwRunToken)
        return;

      const result = sCaptureHistoryResult(beforeSteps, beforePhi, {
        inserted: !!r.inserted,
        duplicate: !!r.duplicate
      });

      sManualSaveHistoryEntry(step, result);

      sDelay(120, () => {
        if(myToken !== sBwRunToken)
          return;

        i++;
        next();
      });
    });
  }

  next();
}

function sRotateLeft(x){
  const y = x.right;
  if(!y)
    return;

  sStepCount += 1;

  x.right = y.left;
  if(y.left)
    y.left.parent = x;

  y.parent = x.parent;
  if(!x.parent)
    sRoot = y;
  else if(x === x.parent.left)
    x.parent.left = y;
  else
    x.parent.right = y;

  y.left = x;
  x.parent = y;
}

function sRotateRight(x){
  const y = x.left;
  if(!y)
    return;

  sStepCount += 1;

  x.left = y.right;
  if(y.right)
    y.right.parent = x;

  y.parent = x.parent;
  if(!x.parent)
    sRoot = y;
  else if(x === x.parent.left)
    x.parent.left = y;
  else
    x.parent.right = y;

  y.right = x;
  x.parent = y;
}

function sSplayAnimated(x, done){
  function step(){
    if(!x || !x.parent){
      if(done)
        done();

      return;
    }

    const p = x.parent;
    const g = p.parent;

    if(!g){
      if(x === p.left){
        const tr = sTraceStart('rotateRight', {pivotKey: p.key, promotedKey: x.key, caseType: 'zig'});
        sRotateRight(p);
        sTraceFinish(tr, {rootAfter: sRoot ? sRoot.key : null});
      }
      else{
        const tr = sTraceStart('rotateLeft', {pivotKey: p.key, promotedKey: x.key, caseType: 'zig'});
        sRotateLeft(p);
        sTraceFinish(tr, {rootAfter: sRoot ? sRoot.key : null});
      }

      sRenderTree({activeId: x.id});
      sDelay(S_MOVE_MS, step);
      return;
    }

    if(x === p.left && p === g.left){
      const tr1 = sTraceStart('rotateRight', {pivotKey: g.key, promotedKey: p.key, caseType: 'zig-zig'});
      sRotateRight(g);
      sTraceFinish(tr1, {rootAfter: sRoot ? sRoot.key : null});

      sRenderTree({activeId: x.id});
      sDelay(S_MOVE_MS, () => {
        const pivot2 = x.parent ? x.parent.key : null;
        const tr2 = sTraceStart('rotateRight', {pivotKey: pivot2, promotedKey: x.key, caseType: 'zig-zig'});

        sRotateRight(x.parent);
        sTraceFinish(tr2, {rootAfter: sRoot ? sRoot.key : null});

        sRenderTree({activeId: x.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    if(x === p.right && p === g.right){
      const tr1 = sTraceStart('rotateLeft', {pivotKey: g.key, promotedKey: p.key, caseType: 'zig-zig'});
      sRotateLeft(g);
      sTraceFinish(tr1, {rootAfter: sRoot ? sRoot.key : null});

      sRenderTree({activeId: x.id});

      sDelay(S_MOVE_MS, () => {
        const pivot2 = x.parent ? x.parent.key : null;
        const tr2 = sTraceStart('rotateLeft', {pivotKey: pivot2, promotedKey: x.key, caseType: 'zig-zig'});

        sRotateLeft(x.parent);
        sTraceFinish(tr2, {rootAfter: sRoot ? sRoot.key : null});

        sRenderTree({activeId: x.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    if(x === p.right && p === g.left){
      const tr1 = sTraceStart('rotateLeft', {pivotKey: p.key, promotedKey: x.key, caseType: 'zig-zag'});
      sRotateLeft(p);
      sTraceFinish(tr1, {rootAfter: sRoot ? sRoot.key : null});

      sRenderTree({activeId: x.id});

      sDelay(S_MOVE_MS, () => {
        const pivot2 = x.parent ? x.parent.key : null;
        const tr2 = sTraceStart('rotateRight', {pivotKey: pivot2, promotedKey: x.key, caseType: 'zig-zag'});

        sRotateRight(x.parent);
        sTraceFinish(tr2, {rootAfter: sRoot ? sRoot.key : null});

        sRenderTree({activeId: x.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    const tr1 = sTraceStart('rotateRight', {pivotKey: p.key, promotedKey: x.key, caseType: 'zig-zag'});
    sRotateRight(p);
    sTraceFinish(tr1, {rootAfter: sRoot ? sRoot.key : null});

    sRenderTree({activeId: x.id});
    sDelay(S_MOVE_MS, () => {
      const pivot2 = x.parent ? x.parent.key : null;
      const tr2 = sTraceStart('rotateLeft', {pivotKey: pivot2, promotedKey: x.key, caseType: 'zig-zag'});
      
      sRotateLeft(x.parent);
      sTraceFinish(tr2, {rootAfter: sRoot ? sRoot.key : null});

      sRenderTree({activeId: x.id});
      sDelay(S_MOVE_MS, step);
    });
  }

  step();
}

function sContainsKey(node, key){
  let cur = node;

  while(cur){
    if(key === cur.key)
      return true;

    if(key < cur.key)
      cur = cur.left;
    else
      cur = cur.right;
  }

  return false;
}

function sInsertCore(key, done, instant = false){
  if(!sRoot){
    const rootTrace = sTraceStart('rootInsert', {value: key});

    sStepCount += 1;
    const n = sNewNode(key);
    sRoot = n;

    sRenderTree({activeId: n.id});
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

  let z = sRoot, p = null;
  const path = [];
  const pathKeys = [];
  const pathTrace = sTraceStart('path', {operation: 'insert', target: key});

  while(z){
    p = z;
    path.push(z.id);
    pathKeys.push(z.key);

    sStepCount += 1;

    if(key < z.key)
      z = z.left;
    else if(key > z.key)
      z = z.right;
    else{
      sTraceFinish(pathTrace, {pathText: sPathText(pathKeys), compareCount: pathKeys.length,outcome: 'duplicate'});

      sAnimatePath(path, 260, () => {
        sSplayAnimated(p, () => {
          if(done)
            done({inserted: false, duplicate: true});
        });
      });

      return;
    }
  }

  const side = key < p.key ? 'left' : 'right';
  sTraceFinish(pathTrace, {pathText: sPathText(pathKeys), compareCount: pathKeys.length, outcome: 'position', parentKey: p.key,side});

  sAnimatePath(path, 260, () => {
    const attachTrace = sTraceStart('insertAttach', {value: key, parentKey: p.key, side});
    const n = sNewNode(key);
    n.parent = p;

    sStepCount += 1;
    if(side === 'left')
      p.left = n;
    else
      p.right = n;

    sRenderTree({activeId: n.id, pathIds: path});
    sTraceFinish(attachTrace, {rootAfter: sRoot ? sRoot.key : null});

    sDelay(S_MOVE_MS, () => {
      sSplayAnimated(n, () => {
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
        done({found:false});

      return;
    }

    sDelay(220, () => {
      if(done)
        done({found:false});
    });

    return;
  }

  let z = sRoot, last = null;
  const path = [];
  const pathKeys = [];
  const pathTrace = sTraceStart('path', {operation: 'search', target: key});

  while(z){
    last = z;
    path.push(z.id);
    pathKeys.push(z.key);

    sStepCount += 1;
    if(key === z.key)
      break;

    if(key < z.key)
      z = z.left;
    else
      z = z.right;
  }

  sTraceFinish(pathTrace, {pathText: sPathText(pathKeys), compareCount: pathKeys.length, outcome: z ? 'found' : 'notFound'});
  sAnimatePath(path, 260, () => {
    const target = z ? z : last;
    if(!target){
      if(done)
        done({found:false});

      return;
    }

    sSplayAnimated(target, () => {
      if(done)
        done({found: !!z});
    });
  });
}

function sDeleteCore(key, done, instant = false){
  if(!sRoot){
    sRenderTree();

    if(instant){
      if(done)
        done({deleted:false});
      
      return;
    }

    sDelay(220, () => {
      if(done)
        done({deleted:false});
    });

    return;
  }

  let z = sRoot, last = null;
  const path = [];
  const pathKeys = [];
  const pathTrace = sTraceStart('path', {operation: 'delete', target: key});

  while(z){
    last = z;
    path.push(z.id);
    pathKeys.push(z.key);

    sStepCount += 1;
    if(key === z.key)
      break;

    if(key < z.key)
      z = z.left;
    else
      z = z.right;
  }

  sTraceFinish(pathTrace, {pathText: sPathText(pathKeys), compareCount: pathKeys.length, outcome: z ? 'found' : 'notFound'});
  sAnimatePath(path, 260, () => {
    const target = z ? z : last;
    if(!target){
      if(done)
        done({deleted:false});

      return;
    }

    sSplayAnimated(target, () => {
      if(!sRoot || sRoot.key !== key){
        if(done)
          done({deleted:false});

        return;
      }

      const old = sRoot;
      const Lsub = old.left;
      const Rsub = old.right;
      const splitTrace = sTraceStart('deleteSplit', {deletedKey: key});

      old.left = old.right = old.parent = null;
      if(Lsub)
        Lsub.parent = null;
      if(Rsub)
        Rsub.parent = null;

      sTraceFinish(splitTrace, {leftRootKey: Lsub ? Lsub.key : null, rightRootKey: Rsub ? Rsub.key : null});
      if(!Lsub){
        sRoot = Rsub;
        if(sRoot)
          sRoot.parent = null;

        const attachTrace = sTraceStart('deleteAttachRight', {rootKey: sRoot ? sRoot.key : null, attachedRightKey: null});
        sTraceFinish(attachTrace, {rootAfter: sRoot ? sRoot.key : null});

        sRenderTree({activeId: sRoot ? sRoot.id : null});
        sDelay(S_MOVE_MS, () => {
          if(done)
            done({deleted:true});
        });

        return;
      }

      sRoot = Lsub;
      let m = sRoot;
      const joinKeys = [m.key];
      const joinTrace = sTraceStart('deleteJoinPath', {});

      while(m.right){
        sStepCount += 1;
        m = m.right;
        joinKeys.push(m.key);
      }

      sTraceFinish(joinTrace, {pathText: sPathText(joinKeys), compareCount: Math.max(0, joinKeys.length - 1), maxKey: m.key});

      sSplayAnimated(m, () => {
        const attachTrace = sTraceStart('deleteAttachRight', {rootKey: sRoot ? sRoot.key : null, attachedRightKey: Rsub ? Rsub.key : null});

        sRoot.right = Rsub;
        if(Rsub)
          Rsub.parent = sRoot;

        sTraceFinish(attachTrace, {rootAfter: sRoot ? sRoot.key : null});

        sRenderTree({activeId: sRoot.id});
        sDelay(S_MOVE_MS, () => {
          if(done)
            done({deleted:true});
        });
      });
    });
  });
}

function sInsert(key){
  if(sBusy)
    return;

  const step = {op: 'insert', value: key};
  const beforeSteps = sStepCount;

  sComputePotential();
  const beforePhi = sPotential;

  sBusy = true;
  sSetButtonsEnabled(false);
  sTraceReset();
  sTraceActive = true;

  sInsertCore(key, (r = {}) => {
    const result = sCaptureHistoryResult(beforeSteps, beforePhi, {inserted: !!r.inserted, duplicate: !!r.duplicate});
    sManualSaveHistoryEntry(step, result);
    sManualInfoIndex = sManualHistory.length - 1;
    sRenderManualInfoPanel();

    sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
    sBusy = false;
    sSetButtonsEnabled(true);
  });
}

function sSearch(key){
  if(sBusy)
    return;

  const step = {op: 'search', value: key};
  const beforeSteps = sStepCount;

  sComputePotential();
  const beforePhi = sPotential;

  sBusy = true;
  sSetButtonsEnabled(false);
  sTraceReset();
  sTraceActive = true;

  if(!sRoot){
    sStepCount += 1;

    const result = sCaptureHistoryResult(beforeSteps, beforePhi, {found: false});
    sManualSaveHistoryEntry(step, result);
    sManualInfoIndex = sManualHistory.length - 1;
    sRenderManualInfoPanel();

    sRenderTree();

    sDelay(220, () => {
      sBusy = false;
      sSetButtonsEnabled(true);
    });

    return;
  }

  sSearchCore(key, (res = {}) => {
    const result = sCaptureHistoryResult(beforeSteps, beforePhi, {
      found: !!res.found
    });

    sManualSaveHistoryEntry(step, result);
    sManualInfoIndex = sManualHistory.length - 1;
    sRenderManualInfoPanel();

    sRenderTree({activeId: sRoot ? sRoot.id : null});
    sBusy = false;
    sSetButtonsEnabled(true);
  });
}

function sDelete(key){
  if(sBusy)
    return;

  const step = {op: 'delete', value: key};
  const beforeSteps = sStepCount;

  sComputePotential();
  const beforePhi = sPotential;

  sBusy = true;
  sSetButtonsEnabled(false);
  sTraceReset();
  sTraceActive = true;

  if(!sRoot){
    sStepCount += 1;

    const result = sCaptureHistoryResult(beforeSteps, beforePhi, {deleted: false});
    sManualSaveHistoryEntry(step, result);
    sManualInfoIndex = sManualHistory.length - 1;
    sRenderManualInfoPanel();

    sRenderTree();

    sDelay(220, () => {
      sBusy = false;
      sSetButtonsEnabled(true);
    });

    return;
  }

  sDeleteCore(key, (res = {}) => {
    const result = sCaptureHistoryResult(beforeSteps, beforePhi, {deleted: !!res.deleted});
    sManualSaveHistoryEntry(step, result);

    sManualInfoIndex = sManualHistory.length - 1;
    sRenderManualInfoPanel();

    sRenderTree({activeId: sRoot ? sRoot.id : null});
    sBusy = false;
    sSetButtonsEnabled(true);
  });
}