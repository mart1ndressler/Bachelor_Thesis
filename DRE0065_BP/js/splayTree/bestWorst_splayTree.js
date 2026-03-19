function sBwRandInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sBwMakeSteps(mode){
  if(mode === 'best'){
    const root = sBwRandInt(25, 70);
    const left = root - sBwRandInt(5, 15);
    const right = root + sBwRandInt(5, 15);

    return [{op: 'insert', value: root}, {op: 'insert', value: left}, {op: 'insert', value: right}, {op: 'delete', value: right},];
  }

  const size = sBwRandInt(6, 10);
  const start = sBwRandInt(1, 99 - size);

  const steps = [];
  for(let i = 0; i < size; i++)
    steps.push({op: 'insert', value: start + i});

  steps.push({op: 'delete', value: start});
  return steps;
}

function sCloneBwSteps(list){
  return Array.isArray(list) ? list.map(step => ({...step})) : [];
}

function sBwSaveHistoryEntry(step, result){
  const L = sLang();

  sBwHistory.push({title: sBuildSplayHistoryTitle(step, sBwIndex, sBwSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L), stepCount: sStepCount, potential: sPotential, snapshot: sCloneTree(sRoot)});
  sBwHistoryCursor = sBwHistory.length - 1;
}

function sBwRestoreHistoryEntry(index){
  if(index < 0 || index >= sBwHistory.length)
    return;

  sBwHistoryCursor = index;

  const entry = sBwHistory[index];
  sRoot = sCloneTree(entry.snapshot);
  sStepCount = entry.stepCount;
  sPotential = entry.potential;

  sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
  sUpdateCounters();
  sBwRenderInfo();
}

function sBwRestoreLatestExecuted(){
  if(sBwHistory.length === 0)
    return;

  sBwRestoreHistoryEntry(sBwHistory.length - 1);
}

function sBwResetToStepZero(){
  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }

  sSkipAnimations = false;
  sBwRunToken += 1;
  sRoot = null;
  sNextId = 1;
  sStepCount = 0;
  sPotential = 0;
  sBusy = false;
  sBwIndex = 0;
  sBwFinished = false;
  sBwPaused = true;
  sBwFastForward = false;
  sBwHistory = [];
  sBwHistoryCursor = -1;
  sBwResults = [];
  sTraceActive = false;
  sSynCurrentTrace = [];

  sBwSteps = (Array.isArray(sBwInitialSteps) && sBwInitialSteps.length > 0) ? sCloneBwSteps(sBwInitialSteps) : sBwMakeSteps(sBwMode);

  sRenderTree({activeId: null, pathIds: []});
  sUpdateCounters();
  sBwRenderInfo();
}

function sBwReplayHistoryForward(){
  if(!sBwFinished || sBwHistory.length === 0){
    sBwScheduleNext();
    return;
  }

  if(sBwHistoryCursor >= sBwHistory.length - 1){
    sBwPaused = false;
    sBwRenderInfo();
    return;
  }

  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }

  sBwAutoTimer = setTimeout(() => {
    if(sBwPaused)
      return;

    if(sBwHistoryCursor < sBwHistory.length - 1)
      sBwRestoreHistoryEntry(sBwHistoryCursor + 1);

    if(sBwHistoryCursor >= sBwHistory.length - 1){
      sBwPaused = false;
      sBwRenderInfo();
      return;
    }

    sBwReplayHistoryForward();
  }, sBwFastForward ? 20 : 350);
}

function sBwBuildHistoryModalHtml(){
  const L = sLang();

  if(!Array.isArray(sBwHistory) || sBwHistory.length === 0)
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  return sBwHistory.map(entry => `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${entry.title}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount} |
        ${L.potential}: ${sFmt2(entry.potential)}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>`).join('');
}

function sBwOpenHistoryModal(){
  const L = sLang();
  openSyntaxHistoryModal(`${L.bestWorstHistoryTitle || 'Best / Worst case history'} – ${L.splayTreeTitle || 'Splay Tree'}`, sBwBuildHistoryModalHtml());
}

function sBwRebuildHistoryForLanguage(){
  if(!Array.isArray(sBwHistory) || sBwHistory.length === 0)
    return;

  const L = sLang();

  sBwHistory = sBwHistory.map((entry, i) => {
    const step = sBwSteps[i];
    const result = sBwResults[i] || {};
    if(!step)
      return entry;

    return {...entry, title: sBuildSplayHistoryTitle(step, i, sBwSteps.length, L), detailHtml: sBuildExecutedSplayDetail(step, result, L)};
  });
}

function sBwRenderBestWorstUI(executionMode = (sBwExecutionMode || 'auto')){
  const L = sLang();
  const dc = document.getElementById('dynamicContent');
  if(!dc)
    return;

  dc.innerHTML = `
    <div class="run-panel splay-bw-panel">
      <div class="run-row syntax-layout no-wrap splay-bw-layout" id="mainContainer">
        <div class="treeArea" id="treeArea">
          <svg class="treeSvg" id="treeSvg"></svg>
          <div class="treeNodesLayer" id="treeNodesLayer"></div>
        </div>

        <div class="run-side-controls">
          <div class="step-count" id="sStepCountDisplay">${L.stepCount}: ${sStepCount}</div>
          <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sPotential}</span></div>

          ${executionMode === 'auto' ? `
            <div class="bw-player-row">
              <button id="sBwStartBtn" class="syntax-nav-btn" title="${L.bwGoStartTitle || 'Go to the first executed step'}">
                <i class="fas fa-step-backward"></i>
              </button>

              <button id="sBwPrevBtn" class="bw-step-btn" title="${L.bwStepBackTitle || 'Go one step back'}">-1</button>

              <button id="sBwPlayPauseBtn" class="syntax-nav-btn" title="${L.bwPauseTitle || 'Pause'}">
                <i class="fas fa-pause"></i>
              </button>

              <button id="sBwNextStepBtn" class="bw-step-btn" title="${L.bwStepForwardTitle || 'Go one step forward'}">+1</button>

              <button id="sBwEndJumpBtn" class="syntax-nav-btn" title="${L.bwGoEndTitle || 'Jump to the final step'}">
                <i class="fas fa-step-forward"></i>
              </button>
            </div>

            <div class="bw-history-tools hidden" id="sBwFinishTools">
              <button id="sBwEndBtn" class="btn btn-primary btn-lg">${L.endButton || 'End'}</button>
              <button id="sBwHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          ` : `
            <button id="sBwNextBtn" class="btn btn-primary btn-lg">${L.nextButton || 'Next'}</button>

            <div class="bw-history-tools hidden" id="sBwFinishTools">
              <button id="sBwHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          `}
        </div>

        <div class="run-side-info">
          <div class="syntax-detailed-info" id="sBwPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="sBwPanelTitle"></div>
              <div class="info-panel-desc" id="sBwPanelDesc"></div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="sBwStepTitle"></div>
              <div class="info-step-detail" id="sBwStepDetail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const startBtn = document.getElementById('sBwStartBtn');
  const prevBtn = document.getElementById('sBwPrevBtn');
  const playPauseBtn = document.getElementById('sBwPlayPauseBtn');
  const nextStepBtn = document.getElementById('sBwNextStepBtn');
  const endJumpBtn = document.getElementById('sBwEndJumpBtn');
  const nextBtn = document.getElementById('sBwNextBtn');
  const endBtn = document.getElementById('sBwEndBtn');
  const historyBtn = document.getElementById('sBwHistoryBtn');

  if(startBtn)
    startBtn.onclick = sBwJumpToStart;
  if(prevBtn)
    prevBtn.onclick = () => sBwGoDelta(-1);
  if(playPauseBtn)
    playPauseBtn.onclick = sBwTogglePlayPause;
  if(nextStepBtn)
    nextStepBtn.onclick = () => sBwGoDelta(1);
  if(endJumpBtn)
    endJumpBtn.onclick = sBwJumpToEnd;
  if(nextBtn)
    nextBtn.onclick = sBwNextOrEnd;
  if(endBtn)
    endBtn.onclick = () => {
      sResetAll();
      returnToMainPageFromSyntax('splayTree');
    };
  if(historyBtn)
    historyBtn.onclick = sBwOpenHistoryModal;

  sRenderTree({activeId: null, pathIds: []});
  sUpdateCounters();
  sBwRenderInfo();
}

function sBwRenderInfo(){
  const L = sLang();
  const t0 = document.getElementById('sBwPanelTitle');
  const d0 = document.getElementById('sBwPanelDesc');
  const t1 = document.getElementById('sBwStepTitle');
  const d1 = document.getElementById('sBwStepDetail');

  if(!t0 || !d0 || !t1 || !d1)
    return;

  t0.textContent = (sBwMode === 'best') ? (L.splayBwBestTitle || L.bestCase || 'Best Case') : (L.splayBwWorstTitle || L.worstCase || 'Worst Case');
  const bwDesc = (sBwMode === 'best') ? (L.splayBwBestDesc || '') : (L.splayBwWorstDesc || '');
  const synDesc = L.splaySynPanelDesc || '';
  d0.innerHTML = bwDesc + ((bwDesc && synDesc) ? `<div class="info-panel-sep"></div>` : ``) + synDesc;

  const total = Array.isArray(sBwSteps) ? sBwSteps.length : 0;
  if(total === 0){
    t1.textContent = '';
    d1.innerHTML = L.detailNotProvided || '';
    return;
  }

  let title = '';
  let html = '';

  if(sBwHistory.length === 0){
    const next = sBuildSplayHistoryTitle(sBwSteps[0], 0, total, L);
    html = `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${next}</div>`;
  }
  else{
    const cursor = (sBwHistoryCursor >= 0) ? sBwHistoryCursor : (sBwHistory.length - 1);
    const entry = sBwHistory[cursor];
    title = entry.title;
    html = entry.detailHtml;

    if(!sBwFinished && cursor === sBwHistory.length - 1 && sBwIndex < total){
      const next = sBuildSplayHistoryTitle(sBwSteps[sBwIndex], sBwIndex, total, L);
      html += `<div class="info-panel-sep"></div><div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${next}</div>`;
    }

    if(sBwFinished && cursor === sBwHistory.length - 1)
      html += `<div class="info-panel-sep"></div><div><strong>${L.bwExecutionFinished || 'Execution has finished. You can open the history below or end this mode.'}</strong></div>`;
  }

  t1.textContent = title;
  d1.innerHTML = html;

  const viewingFinal = sBwFinished && sBwHistoryCursor === sBwHistory.length - 1;
  const finishTools = document.getElementById('sBwFinishTools');
  if(finishTools)
    finishTools.classList.toggle('hidden', !viewingFinal);

  const nextBtn = document.getElementById('sBwNextBtn');
  if(nextBtn)
    nextBtn.textContent = sBwFinished ? (L.endButton || 'End') : (L.nextButton || 'Next');

  const endBtn = document.getElementById('sBwEndBtn');
  if(endBtn)
    endBtn.textContent = L.endButton || 'End';

  const startBtn = document.getElementById('sBwStartBtn');
  const prevBtn = document.getElementById('sBwPrevBtn');
  const playPauseBtn = document.getElementById('sBwPlayPauseBtn');
  const nextStepBtn = document.getElementById('sBwNextStepBtn');
  const endJumpBtn = document.getElementById('sBwEndJumpBtn');
  const historyBtn = document.getElementById('sBwHistoryBtn');

  if(startBtn)
    startBtn.title = L.bwGoStartTitle || 'Go to the first executed step';
  if(prevBtn){
    prevBtn.title = L.bwStepBackTitle || 'Go one step back';
    prevBtn.disabled = sBwHistory.length === 0 || sBwHistoryCursor < 0;
  }
  if(playPauseBtn){
    const playPauseDisabled = viewingFinal;

    playPauseBtn.title = sBwPaused ? (L.bwPlayTitle || 'Play') : (L.bwPauseTitle || 'Pause');
    playPauseBtn.innerHTML = sBwPaused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    playPauseBtn.disabled = playPauseDisabled;
  }
  if(nextStepBtn){
    nextStepBtn.title = L.bwStepForwardTitle || 'Go one step forward';
    nextStepBtn.disabled = sBwFinished && sBwHistoryCursor >= sBwHistory.length - 1;
  }
  if(endJumpBtn)
    endJumpBtn.title = L.bwGoEndTitle || 'Jump to the final step';
  if(historyBtn)
    historyBtn.title = L.syntaxHistoryButtonTitle || 'Open history';
}

function sBwScheduleNext(){
  if(sBwExecutionMode !== 'auto' || sBwPaused || sBwFinished)
    return;

  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }

  const myToken = sBwRunToken;
  sBwAutoTimer = setTimeout(() => {
    if(myToken !== sBwRunToken || sBwPaused || sBwFinished)
      return;

    sBwRunOneStep();
  }, sSkipAnimations ? 0 : (sBwFastForward ? 20 : 350));
}

function sBwRunOneStep(){
  if(sBusy || sBwFinished)
    return;

  if(sBwHistory.length > 0 && sBwHistoryCursor !== sBwHistory.length - 1)
    sBwRestoreLatestExecuted();

  if(sBwIndex >= sBwSteps.length){
    sBwFinished = true;
    sBwPaused = false;
    sBwFastForward = false;
    sSkipAnimations = false;
    sBwRenderInfo();

    return;
  }

  const myToken = sBwRunToken;
  const step = sBwSteps[sBwIndex];
  const instant = (sBwIndex === 0);

  sBusy = true;
  sSetButtonsEnabled(false);

  const beforeSteps = sStepCount;
  sComputePotential();
  const beforePhi = sPotential;

  sTraceReset();
  sTraceActive = true;

  function finish(extra = {}){
    if(myToken !== sBwRunToken)
      return;

    sComputePotential();

    const result = {deltaSteps: sStepCount - beforeSteps, phiBefore: beforePhi, phiAfter: sPotential, deltaPhi: sPotential - beforePhi, traceEvents: Array.isArray(sSynCurrentTrace) ? sSynCurrentTrace.map(ev => ({...ev, vars: {...(ev.vars || {})}})) : [], rootAfter: sRoot ? sRoot.key : null, ...extra};
    sTraceActive = false;
    sBwResults[sBwIndex] = result;
    sBwSaveHistoryEntry(step, result);

    sBwIndex++;
    if(sBwIndex >= sBwSteps.length){
      sBwFinished = true;
      sBwPaused = false;
      sBwFastForward = false;
      sSkipAnimations = false;
    }

    sBusy = false;
    sSetButtonsEnabled(true);

    sRenderTree({activeId: sRoot ? sRoot.id : null, pathIds: []});
    sBwRenderInfo();

    if(sBwExecutionMode === 'auto' && !sBwPaused && !sBwFinished)
      sBwScheduleNext();
  }

  if(step.op === 'insert'){
    sInsertCore(step.value, (r = {}) => {finish({inserted: !!r.inserted, duplicate: !!r.duplicate});}, instant);
    return;
  }

  if(step.op === 'search'){
    sSearchCore(step.value, (r = {}) => {finish({found: !!r.found});}, instant);
    return;
  }

  sDeleteCore(step.value, (r = {}) => {finish({deleted: !!r.deleted});}, instant);
}

function sBwTogglePlayPause(){
  const hasHistory = sBwHistory.length > 0;

  if(sBwFinished){
    const viewingFinal = hasHistory && sBwHistoryCursor >= sBwHistory.length - 1;
    if(viewingFinal){
      sBwRenderInfo();
      return;
    }

    sBwPaused = !sBwPaused;
    if(sBwPaused){
      if(sBwAutoTimer){
        clearTimeout(sBwAutoTimer);
        sBwAutoTimer = 0;
      }
    }
    else
      sBwReplayHistoryForward();

    sBwRenderInfo();
    return;
  }

  if(hasHistory && sBwHistoryCursor !== sBwHistory.length - 1)
    sBwRestoreLatestExecuted();

  sBwPaused = !sBwPaused;

  if(sBwPaused){
    if(sBwAutoTimer){
      clearTimeout(sBwAutoTimer);
      sBwAutoTimer = 0;
    }
  }
  else
    sBwScheduleNext();

  sBwRenderInfo();
}

function sBwGoDelta(delta){
  if(sBwExecutionMode !== 'auto')
    return;

  if(sBwHistory.length === 0){
    if(delta > 0 && !sBwFinished)
      sBwRunOneStep();
    return;
  }

  sBwPaused = true;
  sBwFastForward = false;

  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }

  if(delta < 0){
    if(sBwHistoryCursor > 0){
      sBwRestoreHistoryEntry(sBwHistoryCursor - 1);
      return;
    }

    if(sBwHistoryCursor === 0){
      sBwResetToStepZero();
      return;
    }

    return;
  }

  if(sBwHistoryCursor < sBwHistory.length - 1){
    sBwRestoreHistoryEntry(sBwHistoryCursor + 1);
    return;
  }

  if(!sBwFinished)
    sBwRunOneStep();
}

function sBwJumpToStart(){
  sBwResetToStepZero();
}

function sBwJumpToEnd(){
  if(sBwExecutionMode !== 'auto' || sBwHistory.length === 0)
    return;

  if(sBwFinished){
    sBwRestoreHistoryEntry(sBwHistory.length - 1);
    return;
  }

  if(sBwHistoryCursor !== sBwHistory.length - 1)
    sBwRestoreLatestExecuted();

  sBwPaused = false;
  sBwFastForward = true;
  sSkipAnimations = true;
  sBwScheduleNext();
}

function sBwNextOrEnd(){
  if(sBwFinished){
    sResetAll();
    returnToMainPageFromSyntax('splayTree');
    return;
  }

  sBwRunOneStep();
}

function sStartBestWorst(mode, executionMode = 'auto'){
  $('#bestWorstModal').modal('hide');
  sResetAll();

  sBwMode = mode;
  sBwInitialSteps = sCloneBwSteps(sBwMakeSteps(mode));
  sBwSteps = sCloneBwSteps(sBwInitialSteps);
  sBwIndex = 0;
  sBwExecutionMode = executionMode;
  sBwPaused = false;
  sBwFinished = false;
  sBwFastForward = false;
  sBwHistory = [];
  sBwHistoryCursor = -1;
  sBwResults = [];

  sBwRenderBestWorstUI(executionMode);

  if(sBwSteps.length > 0){
    sBwRunOneStep();

    if(sBwExecutionMode === 'auto' && !sBwFinished)
      sBwScheduleNext();
  }
}