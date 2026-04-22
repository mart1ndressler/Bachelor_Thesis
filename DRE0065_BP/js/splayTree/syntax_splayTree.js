function sParseSplaySyntax(raw){
  const input = String(raw || '').trim();
  if(!input)
    return [];

  const steps = [];
  const parts = input.split(/\s+/).filter(Boolean);

  for(const token of parts){
    const match = token.match(/^([a-zA-Z]+)\(([^)]*)\)$/);
    if(!match)
      return null;

    const opRaw = match[1].toLowerCase();
    const argsRaw = match[2].trim();

    let op = null;
    if(opRaw === 'insert' || opRaw === 'ins' || opRaw === 'i')
      op = 'insert';
    if(opRaw === 'search' || opRaw === 'find' || opRaw === 's')
      op = 'search';
    if(opRaw === 'delete' || opRaw === 'del' || opRaw === 'd')
      op = 'delete';
    if(!op)
      return null;

    const values = argsRaw.split(',').map(v => v.trim()).filter(v => v.length > 0).map(v => Number(v)).filter(v => Number.isInteger(v) && v > 0);
    if(values.length === 0)
      return null;

    if(op === 'insert'){
      for(const value of values)
        steps.push({op, value});
    }
    else
      steps.push({op, value: values[0]});
  }

  return steps;
}

function sSubmitSplaySyntax(){
  const L = sLang();
  const inputEl = document.getElementById('syntaxInput');
  const raw = (inputEl?.value || '').trim();
  const steps = sParseSplaySyntax(raw);

  if(!steps || steps.length === 0){
    if(inputEl)
      inputEl.value = '';

    showAppMessage(L.splaySyntaxInvalidAlert || L.syntaxInvalidAlert || 'Invalid syntax.');
    return;
  }

  $('#syntaxModal').modal('hide');
  sStartSplaySyntax(steps);
}

function sManualSaveHistoryEntry(step, result){
  const prevTotal = sManualHistory.length ? (sManualHistory[sManualHistory.length - 1].result?.totalAmortizedCost ?? 0) : 0;

  sDecorateRecordedResult(step, result, prevTotal);
  sManualHistory.push({step: JSON.parse(JSON.stringify(step)), result: JSON.parse(JSON.stringify(result || {})), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
}

function sManualBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sManualHistory) || sManualHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return sManualHistory.map((entry, index) => {
    const step = entry.step || {};
    const result = entry.result || {};
    const title = sManualHistoryTitle(step, index, L);
    const detailHtml = sBuildExecutedSplayDetail(step, result, L);

    return buildCollapsibleHistoryEntryHtml({title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${sFmt2(entry.potential)}`, detailHtml});
  }).join('');
}

function sManualOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = sLang();
    return {title: `${L.historyModalBaseTitle || 'History'} – ${L.splayTreeTitle || 'Splay Tree'}`, bodyHtml: sManualBuildHistoryModalHtml()};
  });
}

function sSynFormatPreviewStep(step){
  return step ? sBuildStepLabel(step, sLang()) : '';
}

function sSynGetPreviewState(){
  if(!Array.isArray(sSynSteps) || sSynSteps.length === 0)
    return {prev: '', current: '', next: ''};

  if(sSynHistory.length === 0)
    return {prev: '', current: '', next: sSynFormatPreviewStep(sSynSteps[0])};

  const index = sSynFinished && sSynHistoryCursor >= 0 ? sSynHistoryCursor : Math.max(0, sSynCursor - 1);
  return {prev: sSynFormatPreviewStep(sSynSteps[index - 1]), current: sSynFormatPreviewStep(sSynSteps[index]), next: sSynFormatPreviewStep(sSynSteps[index + 1])};
}

function sSynRenderPreview(animate = false){
  typesParamsSetOperationPreviewVisible('s', sSynPreviewVisible);
  if(!sSynPreviewVisible)
    return;

  typesParamsUpdateOperationPreview('s', sSynGetPreviewState(), animate);
}

function sSynSchedulePreviewHide(){
  if(sSynPreviewHideTimer){
    clearTimeout(sSynPreviewHideTimer);
    sSynPreviewHideTimer = 0;
  }
}

function sSynSaveHistoryEntry(step, result){
  const L = sLang();
  const prevTotal = sSynHistory.length ? (sSynResults[sSynHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  sDecorateRecordedResult(step, result, prevTotal, L);
  sSynHistory.push({title: sBuildSplayHistoryTitle(step, sSynCursor, sSynSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
  sUpdateCounters();
}

function sSynRestoreHistoryEntry(index){
  if(index < 0 || index >= sSynHistory.length)
    return;

  sSynHistoryCursor = index;

  const entry = sSynHistory[index];
  sRoot = sCloneTree(entry.snapshot);
  sStepCount = entry.stepCount;
  sPotential = entry.potential;

  sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
  sUpdateCounters();
  sSynRenderInfo();
  sSynUpdateFinishUI();
}

function sSynGoHistory(delta){
  if(!sSynFinished)
    return;

  if(delta < 0){
    const nextIndex = sSynHistoryCursor - 1;
    if(nextIndex < 0)
      return;

    sSynRestoreHistoryEntry(nextIndex);
    return;
  }

  sSynReplayNextFromHistory();
}

function sSynBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sSynHistory) || sSynHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return sSynHistory.map(entry => buildCollapsibleHistoryEntryHtml({title: entry.title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${sFmt2(entry.potential)}`, detailHtml: entry.detailHtml})).join('');
}

function sSynOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = sLang();
    return {title: `${L.syntaxHistoryTitle || 'Syntax mode history'} – ${L.splayTreeTitle || 'Splay Tree'}`, bodyHtml: sSynBuildHistoryModalHtml()};
  });
}

function sSynRunCurrentStep(instant = false, {recordHistory = true} = {}){
  const nextBtn = document.getElementById('sSynNextBtn');
  if(sBusy)
    return;
  if(sSynCursor < 0 || sSynCursor >= sSynSteps.length)
    return;

  sBusy = true;
  if(nextBtn)
    nextBtn.disabled = true;

  sSynUpdateFinishUI();

  const beforeSteps = sStepCount;
  sComputePotential();
  const beforePhi = sPotential;

  sTraceReset();
  sTraceActive = true;

  const step = sSynSteps[sSynCursor];
  sExecuteStep(step, (resultData = {}) => {
    const result = sCaptureHistoryResult(beforeSteps, beforePhi, resultData);

    if(recordHistory){
      sSynResults[sSynCursor] = result;
      sSynSaveHistoryEntry(step, result);
      sSynHistoryCursor = sSynHistory.length - 1;
    }

    sSynCursor += 1;
    if(recordHistory === false)
      sSynHistoryCursor = sSynCursor - 1;

    sUpdateCounters();
    if(sSynCursor >= sSynSteps.length)
      sSynFinished = true;

    sBusy = false;

    sSynRenderInfo();
    sSynUpdateFinishUI();

    if(sSynFinished){
      sSynRenderPreview(true);
      sSynSchedulePreviewHide();
    }
    else if(sSynPreviewVisible)
      sSynRenderPreview(true);

    if(nextBtn){
      nextBtn.disabled = false;
      nextBtn.textContent = (sSynCursor >= sSynSteps.length) ? (sLang().endButton || 'End') : (sLang().nextButton || 'Next');
    }
  }, instant);
}

function sSynReplayNextFromHistory(){
  if(!sSynFinished || sBusy)
    return;
  if(sSynHistoryCursor < 0 || sSynHistoryCursor >= sSynSteps.length - 1)
    return;

  const nextIndex = sSynHistoryCursor + 1;

  sSkipAnimations = false;
  sSynCursor = nextIndex;
  sSynHistoryCursor = nextIndex;

  sSynRunCurrentStep(false, {recordHistory: false});
}

function rebuildSplaySyntaxForLanguage(){
  if(!Array.isArray(sSynHistory) || sSynHistory.length === 0)
    return;
  if(!Array.isArray(sSynSteps) || sSynSteps.length === 0)
    return;

  const L = sLang();

  sSynHistory = sSynHistory.map((entry, index) => {
    const step = sSynSteps[index];
    const result = sSynResults[index] || {};
    if(!step)
      return entry;

    return {...entry, title: sBuildSplayHistoryTitle(step, index, sSynSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L)};
  });

  if(document.getElementById('sSynPanelTitle'))
    sSynRenderInfo();
}

function sSynNextStep(){
  const nextBtn = document.getElementById('sSynNextBtn');

  if(!nextBtn)
    return;
  if(sBusy)
    return;

  const total = sSynSteps.length;
  if(sSynCursor >= total){
    sResetAll();
    returnToMainPageFromSyntax('splayTree');

    return;
  }

  const instant = (sSynCursor === 0 && sSynInstantFirstStep);
  sSynInstantFirstStep = false;
  sSynRunCurrentStep(instant);
}

function sStartSplaySyntax(steps){
  sResetAll();

  sSynSteps = steps;
  sSynCursor = 0;
  sSynResults = [];
  sSynHistory = [];
  sSynHistoryCursor = -1;
  sSynFinished = false;
  sSynInstantFirstStep = true;
  sSynPreviewVisible = true;

  sRenderSyntaxUI();
  sSynNextStep();
}