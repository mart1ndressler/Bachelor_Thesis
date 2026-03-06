function sNewNode(key){
  return {id: sNextId++, key, left: null, right: null, parent: null, x: 0, y: 0};
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
}

function sDelay(ms, done){
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

    sInsertCore(values[i], () => {
      if(myToken !== sBwRunToken)
        return;

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
      if(x === p.left)
        sRotateRight(p);
      else
        sRotateLeft(p);

      sRenderTree({activeId: x.id});
      sDelay(S_MOVE_MS, step);
      return;
    }

    if(x === p.left && p === g.left){
      sRotateRight(g);
      sRenderTree({activeId: x.id});

      sDelay(S_MOVE_MS, () => {
        sRotateRight(x.parent);
        sRenderTree({activeId: x.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    if(x === p.right && p === g.right){
      sRotateLeft(g);
      sRenderTree({activeId: x.id});

      sDelay(S_MOVE_MS, () => {
        sRotateLeft(x.parent);
        sRenderTree({activeId: x.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    if(x === p.right && p === g.left){
      sRotateLeft(p);
      sRenderTree({activeId: x.id});

      sDelay(S_MOVE_MS, () => {
        sRotateRight(x.parent);
        sRenderTree({activeId: x.id});
        sDelay(S_MOVE_MS, step);
      });

      return;
    }

    sRotateRight(p);
    sRenderTree({activeId: x.id});

    sDelay(S_MOVE_MS, () => {
      sRotateLeft(x.parent);
      sRenderTree({activeId: x.id});
      sDelay(S_MOVE_MS, step);
    });
  }

  step();
}

function sInsertCore(key, done){
  if(!sRoot){
    const n = sNewNode(key);
    sRoot = n;

    sRenderTree({activeId: n.id});
    sDelay(S_MOVE_MS, done);
    return;
  }

  let z = sRoot, p = null;
  const path = [];

  while(z){
    p = z;
    path.push(z.id);

    sStepCount += 1;

    if(key < z.key)
      z = z.left;
    else if(key > z.key)
      z = z.right;
    else{
      sAnimatePath(path, 260, () => {
        sSplayAnimated(p, () => {
          const L = sLang();
          const msg = (L.splayAlreadyExistsText || '').replace('{value}', String(key));
          showAppMessage(msg || `Value ${key} already exists.`, {title: L.splayAlreadyExistsTitle || 'Already exists'});

          if(done)
            done();
        });
      });

      return;
    }
  }

  sAnimatePath(path, 260, () => {
    const n = sNewNode(key);
    n.parent = p;

    sStepCount += 1;

    if(key < p.key)
      p.left = n;
    else
      p.right = n;

    sRenderTree({activeId: n.id, pathIds: path});
    sDelay(S_MOVE_MS, () => {sSplayAnimated(n, done);});
  });
}

function sSearchCore(key, done){
  if(!sRoot){
    sRenderTree();
    sDelay(220, () => {
      if(done)
        done({found:false}); 
    });

    return;
  }

  let z = sRoot, last = null;
  const path = [];

  while(z){
    last = z;
    path.push(z.id);

    sStepCount += 1;

    if(key === z.key)
      break;

    if(key < z.key)
      z = z.left;
    else
      z = z.right;
  }

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

function sDeleteCore(key, done){
  if(!sRoot){
    sRenderTree();
    sDelay(220, () => {
      if(done)
        done({deleted:false});
      });

    return;
  }

  let z = sRoot, last = null;
  const path = [];

  while(z){
    last = z;
    path.push(z.id);

    sStepCount += 1;

    if(key === z.key)
      break;

    if(key < z.key)
      z = z.left;
    else
      z = z.right;
  }

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

      old.left = old.right = old.parent = null;
      if(Lsub)
        Lsub.parent = null;
      if(Rsub)
        Rsub.parent = null;

      if(!Lsub){
        sRoot = Rsub;
        if(sRoot)
          sRoot.parent = null;

        sRenderTree({activeId: sRoot ? sRoot.id : null});
        sDelay(S_MOVE_MS, () => {
          if(done)
            done({deleted:true});
          });

        return;
      }

      sRoot = Lsub;
      let m = sRoot;

      while(m.right){
        sStepCount += 1;
        m = m.right;
      }

      sSplayAnimated(m, () => {
        sRoot.right = Rsub;
        if(Rsub)
          Rsub.parent = sRoot;

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

  sBusy = true;
  sSetButtonsEnabled(false);

  sInsertCore(key, () => {
    sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
    sBusy = false;
    sSetButtonsEnabled(true);
  });
}

function sSearch(key){
  if(sBusy)
    return;

  sBusy = true;
  sSetButtonsEnabled(false);

  if(!sRoot){
    const L = sLang();
    showAppMessage(L.splayEmptyTreeText || "Tree is empty.");
    sRenderTree();

    sDelay(220, () => {
      sBusy = false;
      sSetButtonsEnabled(true);
    });

    return;
  }

  sSearchCore(key, (res) => {
    if(!res.found){
      const L = sLang();
      const msg = (L.splayNotFoundText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} not found.`, {title: L.splayNotFoundTitle || 'Not found'});
    }
    else{
      const L = sLang();
      const msg = (L.splayFoundText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} was found.`, {title: L.splayFoundTitle || 'Found'});
    }

    sRenderTree({activeId: sRoot ? sRoot.id : null});
    sBusy = false;
    sSetButtonsEnabled(true);
  });
}

function sDelete(key){
  if(sBusy)
    return;

  sBusy = true;
  sSetButtonsEnabled(false);

  if(!sRoot){
    const L = sLang();
    showAppMessage(L.splayEmptyTreeText || "Tree is empty.");
    sRenderTree();

    sDelay(220, () => {
      sBusy = false;
      sSetButtonsEnabled(true);
    });

    return;
  }

  sDeleteCore(key, (res) => {
    if(!res.deleted){
      const L = sLang();
      const msg = (L.splayNotFoundText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} not found.`, {title: L.splayNotFoundTitle || 'Not found'});
    }
    else{
      const L = sLang();
      const msg = (L.splayDeletedText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} was successfully deleted.`, {title: L.splayDeletedTitle || 'Deleted'});
    }

    sRenderTree({activeId: sRoot ? sRoot.id : null});
    sBusy = false;
    sSetButtonsEnabled(true);
  });
}