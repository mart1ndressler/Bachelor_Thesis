function sNewNode(key){
  return {id: sNextId++, key, left: null, right: null, parent: null, x: 0, y: 0};
}

function sResetAll(){
  sRoot = null;
  sNextId = 1;
  sStepCount = 0;
  sPotential = 0;
  sBusy = false;
  sLastMessageKey = null;
  sLastMessageParams = null;
  sInitValues = [];
  sInitSource = null;
  sInitBuildIndex = -1;
  sBwMode = null;
  sBwSteps = [];
  sBwIndex = 0;
  sBwRunToken += 1;
  sBwResults = [];
  sSynSteps = [];
  sSynCursor = 0;
  sSynResults = [];
  sSynRunToken += 1;
}

function sDelay(ms){
  return new Promise(r => setTimeout(r, ms));
}

async function sAnimatePath(pathIds, stepMs = 260){
  for(let i = 0; i < pathIds.length; i++){
    sRenderTree({activeId: pathIds[i], pathIds: pathIds.slice(0, i+1), animate: false});
    await sDelay(stepMs);
  }
}

async function sBuildInitial(values, {source = 'manual'} = {})
{
  if(sBusy)
    return;

  sBusy = true;
  sSetButtonsEnabled(false);

  sInitValues = [...values];
  sInitSource = source;
  sInitBuildIndex = -1;
  sRenderInitValuesBox();
  sShowBuildPanel(true);

  try{
    sRoot = null;
    sStepCount = 0;
    sPotential = 0;
    sRenderTree({activeId: null, pathIds: []});

    for(let i = 0; i < values.length; i++){
      sInitBuildIndex = i;
      sRenderInitValuesBox();

      await sInsertCore(values[i]);
      await sDelay(120);
    }

    sInitBuildIndex = values.length;
    sRenderInitValuesBox();
  }
  finally{
    sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
    sShowBuildPanel(false);
    sBusy = false;
    sSetButtonsEnabled(true);
  }
}

async function sInsertCore(key){
  if(!sRoot){
    const n = sNewNode(key);
    sRoot = n;
    sRenderTree({activeId: n.id});
    await sDelay(S_MOVE_MS);
    return;
  }

  let z = sRoot;
  let p = null;
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
      await sAnimatePath(path);
      await sSplayAnimated(p);

      const L = sLang();
      const msg = (L.splayAlreadyExistsText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} already exists.`, {title: L.splayAlreadyExistsTitle || 'Already exists'});
      return;
    }
  }

  await sAnimatePath(path);
  const n = sNewNode(key);
  n.parent = p;

  sStepCount += 1;
  if(key < p.key)
    p.left = n;
  else
    p.right = n;

  sRenderTree({activeId: n.id, pathIds: path});
  await sDelay(S_MOVE_MS);

  await sSplayAnimated(n);
}

async function sSearchCore(key){
  if(!sRoot){
    sRenderTree();
    await sDelay(220);
    return {found: false};
  }

  let z = sRoot;
  let last = null;
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

  await sAnimatePath(path);

  const target = z ? z : last;
  if(target)
    await sSplayAnimated(target);

  return {found: !!z};
}

async function sDeleteCore(key){
  if(!sRoot){
    sRenderTree();
    await sDelay(220);
    return {deleted: false};
  }

  let z = sRoot;
  let last = null;
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

  await sAnimatePath(path);

  const target = z ? z : last;
  if(target)
    await sSplayAnimated(target);

  if(!sRoot || sRoot.key !== key)
    return {deleted: false};

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
    await sDelay(S_MOVE_MS);
    return {deleted: true};
  }

  sRoot = Lsub;
  let m = sRoot;
  while(m.right){
    sStepCount += 1;
    m = m.right;
  }

  await sSplayAnimated(m);
  sRoot.right = Rsub;
  if(Rsub)
    Rsub.parent = sRoot;

  sRenderTree({activeId: sRoot.id});
  await sDelay(S_MOVE_MS);
  return {deleted: true};
}

async function sInsert(key){
  if(sBusy)
    return;
  sBusy = true;
  sSetButtonsEnabled(false);

  try{
    await sInsertCore(key);
  }
  finally{
    sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
    sBusy = false;
    sSetButtonsEnabled(true);
  }
}

async function sSearch(key){
  if(sBusy)
    return;
  sBusy = true;
  sSetButtonsEnabled(false);

  try{
    if(!sRoot){
      const L = sLang();
      showAppMessage(L.splayEmptyTreeText || "Tree is empty.");
      sRenderTree();

      await sDelay(220);
      return;
    }

    const res = await sSearchCore(key);
    if(!res.found){
      const L = sLang();
      const msg = (L.splayNotFoundText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} not found.`, { title: L.splayNotFoundTitle || 'Not found' });
    }
  }
  finally{
    sRenderTree({activeId: sRoot ? sRoot.id : null});
    sBusy = false;
    sSetButtonsEnabled(true);
  }
}

async function sDelete(key){
  if(sBusy)
    return;

  sBusy = true;
  sSetButtonsEnabled(false);

  try{
    if(!sRoot){
      const L = sLang();
      showAppMessage(L.splayEmptyTreeText || "Tree is empty.");
      sRenderTree();

      await sDelay(220);
      return;
    }

    const res = await sDeleteCore(key);
    if(!res.deleted){
      const L = sLang();
      const msg = (L.splayNotFoundText || '').replace('{value}', String(key));
      showAppMessage(msg || `Value ${key} not found.`, { title: L.splayNotFoundTitle || 'Not found' });
      return;
    }
  }
  finally{
    sRenderTree({ activeId: sRoot ? sRoot.id : null });
    sBusy = false;
    sSetButtonsEnabled(true);
  }
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

function sSplay(x){
  while(x.parent){
    const p = x.parent;
    const g = p.parent;

    if(!g){
      if(x === p.left) sRotateRight(p);
      else sRotateLeft(p);
    }
    else if(x === p.left && p === g.left){
      sRotateRight(g);
      sRotateRight(p);
    }
    else if(x === p.right && p === g.right){
      sRotateLeft(g);
      sRotateLeft(p);
    }
    else if(x === p.right && p === g.left){
      sRotateLeft(p);
      sRotateRight(g);
    }
    else{
      sRotateRight(p);
      sRotateLeft(g);
    }
  }
}

async function sSplayAnimated(x){
  while(x && x.parent){
    const p = x.parent;
    const g = p.parent;

    if(!g){
      if(x === p.left) 
        sRotateRight(p);
      else 
        sRotateLeft(p);

      sRenderTree({activeId: x.id});
      await sDelay(S_MOVE_MS);
      continue;
    }

    if(x === p.left && p === g.left){
      sRotateRight(g);
      sRenderTree({activeId: x.id});
      await sDelay(S_MOVE_MS);

      sRotateRight(x.parent);
      sRenderTree({activeId: x.id});
      await sDelay(S_MOVE_MS);
      continue;
    }

    if(x === p.right && p === g.right){
      sRotateLeft(g);
      sRenderTree({activeId: x.id});
      await sDelay(S_MOVE_MS);

      sRotateLeft(x.parent);
      sRenderTree({activeId: x.id});
      await sDelay(S_MOVE_MS);
      continue;
    }

    if(x === p.right && p === g.left){
      sRotateLeft(p);
      sRenderTree({activeId: x.id});
      await sDelay(S_MOVE_MS);

      sRotateRight(x.parent);
      sRenderTree({activeId: x.id});
      await sDelay(S_MOVE_MS);
      continue;
    }

    sRotateRight(p);
    sRenderTree({activeId: x.id});
    await sDelay(S_MOVE_MS);

    sRotateLeft(x.parent);
    sRenderTree({activeId: x.id});
    await sDelay(S_MOVE_MS);
  }
}