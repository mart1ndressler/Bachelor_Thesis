function sRenderInitValuesBox(){
  const box = document.getElementById('sInitValuesBox');
  if(!box)
    return;

  if(!Array.isArray(sInitValues) || sInitValues.length === 0){
    box.innerHTML = '';
    return;
  }

  const L = sLang();
  const label = (sInitSource === 'random') ? (L.splayGeneratedValuesLabel || 'Generated values:') : (L.splayInitialValuesLabel || 'Initial values:');

  const chips = sInitValues.map((value, index) => {
    let className = 'v';

    if(sInitBuildIndex >= 0 && index < sInitBuildIndex)
      className += ' done';
    if(sInitBuildIndex === index)
      className += ' cur';

    return `<span class="${className}">${value}</span>`;
  }).join('');

  box.innerHTML = `<span class="lbl">${label}</span>${chips}`;
}

function sShowBuildPanel(show){
  const valuesBox = document.getElementById('sInitValuesBox');
  const buttons = document.getElementById('splay_buttons');
  const historyBtn = document.getElementById('sManualHistoryBtn');

  if(valuesBox)
    valuesBox.classList.toggle('hidden', !show);
  if(buttons)
    buttons.classList.toggle('hidden', show);
  if(historyBtn)
    historyBtn.classList.toggle('hidden', show);
}

function sUpdateCounters(){
  const L = sLang();
  const stepCountEl = document.getElementById('sStepCountDisplay');
  const potentialEl = document.getElementById('sPotentialDisplay');

  if(stepCountEl)
    stepCountEl.innerText = `${L.stepCount}: ${sStepCount}`;
  if(potentialEl)
    potentialEl.innerHTML = `${L.potential}: <span class="potentialValue">${sFmt2(sPotential)}</span>`;
}

function sGetManualInfoEntry(){
  if(!Array.isArray(sManualHistory))
    return null;
  if(sManualInfoIndex < 0 || sManualInfoIndex >= sManualHistory.length)
    return null;

  return sManualHistory[sManualInfoIndex];
}

function sToggleManualInfoPanel(){
  if(!sGetManualInfoEntry())
    return;

  sManualInfoOpen = !sManualInfoOpen;
  sRenderManualInfoPanel();
}

function sRenderManualInfoPanel(){
  const dock = document.getElementById('sManualInfoDock');
  const titleEl = document.getElementById('sManualInfoTitle');
  const detailEl = document.getElementById('sManualInfoDetail');

  if(!dock || !titleEl || !detailEl)
    return;

  const entry = sGetManualInfoEntry();
  if(!entry){
    dock.classList.add('hidden');
    dock.classList.remove('open');
    return;
  }

  const L = sLang();
  const step = entry.step || {};
  const result = entry.result || {};

  dock.classList.remove('hidden');
  dock.classList.toggle('open', !!sManualInfoOpen);

  titleEl.textContent = sManualHistoryTitle(step, sManualInfoIndex, L);
  detailEl.innerHTML = sBuildExecutedSplayDetail(step, result, L);
}

function sSetButtonsEnabled(enabled){
  const insertBtn = document.getElementById('sInsertBtn');
  const searchBtn = document.getElementById('sSearchBtn');
  const deleteBtn = document.getElementById('sDeleteBtn');

  if(insertBtn)
    insertBtn.disabled = !enabled;
  if(searchBtn)
    searchBtn.disabled = !enabled;
  if(deleteBtn)
    deleteBtn.disabled = !enabled;
}

function sRenderManualUI(){
  const L = sLang();

  const dc = document.getElementById('dynamicContent');
  if(!dc)
    return;

  dc.innerHTML = `
    <div class="run-panel">
      <div class="run-row no-wrap" id="mainContainer">
        <div class="treeArea" id="treeArea">
          <svg class="treeSvg" id="treeSvg"></svg>
          <div class="treeNodesLayer" id="treeNodesLayer"></div>
        </div>

        <div class="stack-controls controls-bottom">
          <div class="step-count" id="sStepCountDisplay">${L.stepCount}: ${sStepCount}</div>
          <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sFmt2(sPotential)}</span></div>

          <button id="sManualHistoryBtn" class="syntax-history-btn hidden" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
            <i class="fas fa-info-circle"></i>
          </button>

          <div class="s-init-values hidden" id="sInitValuesBox"></div>

          <div id="splay_buttons" class="hidden">
            <button id="sInsertBtn" class="btn btn-primary btn-lg">${L.splayInsertButton}</button>
            <button id="sSearchBtn" class="btn btn-primary btn-lg">${L.splaySearchButton}</button>
            <button id="sDeleteBtn" class="btn btn-primary btn-lg">${L.splayDeleteButton}</button>
          </div>
        </div>
      </div>

      <div id="sManualInfoDock" class="manual-step-dock hidden">
        <div class="manual-step-shell">
          <button type="button" id="sManualInfoTab" class="manual-step-tab">
            <i class="fas fa-angle-double-left"></i>
          </button>

          <div class="manual-step-panel">
            <div class="manual-step-panel-scroll">
              <div class="info-panel-title" id="sManualInfoTitle"></div>
              <div class="info-step-detail" id="sManualInfoDetail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const insertBtn = document.getElementById('sInsertBtn');
  const searchBtn = document.getElementById('sSearchBtn');
  const deleteBtn = document.getElementById('sDeleteBtn');
  const historyBtn = document.getElementById('sManualHistoryBtn');
  const infoTab = document.getElementById('sManualInfoTab');

  if(insertBtn)
    insertBtn.onclick = sHandleInsertAction;
  if(searchBtn)
    searchBtn.onclick = sHandleSearchAction;
  if(deleteBtn)
    deleteBtn.onclick = sHandleDeleteAction;
  if(historyBtn)
    historyBtn.onclick = sManualOpenHistoryModal;
  if(infoTab)
    infoTab.onclick = sToggleManualInfoPanel;

  refreshSplayUIForLanguage();
  sShowBuildPanel(false);
  sRenderInitValuesBox();
  sRenderManualInfoPanel();
}

function sRenderBestWorstUI(executionMode = (sBwExecutionMode || 'auto')){
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
          <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sFmt2(sPotential)}</span></div>

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
  const titleEl = document.getElementById('sBwPanelTitle');
  const descEl = document.getElementById('sBwPanelDesc');
  const stepTitleEl = document.getElementById('sBwStepTitle');
  const stepDetailEl = document.getElementById('sBwStepDetail');

  if(!titleEl || !descEl || !stepTitleEl || !stepDetailEl)
    return;

  titleEl.textContent = (sBwMode === 'best') ? (L.splayBwBestTitle || L.bestCase || 'Best Case') : (L.splayBwWorstTitle || L.worstCase || 'Worst Case');

  const bwDesc = (sBwMode === 'best') ? (L.splayBwBestDesc || '') : (L.splayBwWorstDesc || '');
  const synDesc = L.splaySynPanelDesc || '';
  descEl.innerHTML = bwDesc + ((bwDesc && synDesc) ? `<div class="info-panel-sep"></div>` : ``) + synDesc;

  const total = Array.isArray(sBwSteps) ? sBwSteps.length : 0;
  if(total === 0){
    stepTitleEl.textContent = '';
    stepDetailEl.innerHTML = L.detailNotProvided || '';
    return;
  }

  let currentTitle = '';
  let html = '';

  if(sBwHistory.length === 0){
    const nextTitle = sBuildSplayHistoryTitle(sBwSteps[0], 0, total, L);
    html = `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${nextTitle}</div>`;
  }
  else{
    const cursor = (sBwHistoryCursor >= 0) ? sBwHistoryCursor : (sBwHistory.length - 1);
    const entry = sBwHistory[cursor];

    currentTitle = entry.title;
    html = entry.detailHtml;

    if(!sBwFinished && cursor === sBwHistory.length - 1 && sBwIndex < total){
      const nextTitle = sBuildSplayHistoryTitle(sBwSteps[sBwIndex], sBwIndex, total, L);
      html += `<div class="info-panel-sep"></div><div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${nextTitle}</div>`;
    }

    if(sBwFinished && cursor === sBwHistory.length - 1)
      html += `<div class="info-panel-sep"></div><div><strong>${L.bwExecutionFinished || 'Execution has finished. You can open the history below or end this mode.'}</strong></div>`;
  }

  stepTitleEl.textContent = currentTitle;
  stepDetailEl.innerHTML = html;

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
    const disabled = viewingFinal;
    playPauseBtn.title = sBwPaused ? (L.bwPlayTitle || 'Play') : (L.bwPauseTitle || 'Pause');
    playPauseBtn.innerHTML = sBwPaused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    playPauseBtn.disabled = disabled;
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

function sRenderSyntaxUI(){
  const L = sLang();

  const dc = document.getElementById('dynamicContent');
  if(!dc)
    return;

  dc.innerHTML = `
    <div class="run-panel splay-syntax-panel">
      <div class="run-row syntax-layout no-wrap splay-syntax-layout" id="mainContainer">
        <div class="treeArea splay-syntax-treeArea" id="treeArea">
          <svg class="treeSvg" id="treeSvg"></svg>
          <div class="treeNodesLayer" id="treeNodesLayer"></div>
        </div>

        <div class="run-side-controls">
          <div class="step-count" id="sStepCountDisplay">${L.stepCount}: ${sStepCount}</div>
          <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sFmt2(sPotential)}</span></div>
          <button id="sSynNextBtn" class="btn btn-primary btn-lg">${L.nextButton || 'Next'}</button>

          <div id="sSynFinishTools" class="syntax-finish-tools hidden">
            <div class="syntax-nav-row">
              <button id="sSynPrevBtn" class="syntax-nav-btn" title="${L.syntaxPrevStepTitle || 'Previous step'}">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button id="sSynForwardBtn" class="syntax-nav-btn" title="${L.syntaxNextStepTitle || 'Next step'}">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>

            <button id="sSynHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
              <i class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>

        <div class="run-side-info">
          <div class="syntax-detailed-info" id="sSynPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="sSynPanelTitle"></div>
              <div class="info-panel-desc" id="sSynPanelDesc"></div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="sSynStepTitle"></div>
              <div class="info-step-detail" id="sSynStepDetail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const nextBtn = document.getElementById('sSynNextBtn');
  const prevBtn = document.getElementById('sSynPrevBtn');
  const forwardBtn = document.getElementById('sSynForwardBtn');
  const historyBtn = document.getElementById('sSynHistoryBtn');

  if(nextBtn)
    nextBtn.onclick = sSynNextStep;
  if(prevBtn)
    prevBtn.onclick = () => sSynGoHistory(-1);
  if(forwardBtn)
    forwardBtn.onclick = () => sSynGoHistory(1);
  if(historyBtn)
    historyBtn.onclick = sSynOpenHistoryModal;

  sSynUpdateFinishUI();
  sRenderTree({activeId: null, pathIds: []});
  sUpdateCounters();
  sSynRenderInfo();
}

function sSynUpdateFinishUI(){
  const wrap = document.getElementById('sSynFinishTools');
  const prevBtn = document.getElementById('sSynPrevBtn');
  const forwardBtn = document.getElementById('sSynForwardBtn');

  if(!wrap || !prevBtn || !forwardBtn)
    return;

  if(!sSynFinished){
    wrap.classList.add('hidden');
    return;
  }

  wrap.classList.remove('hidden');
  prevBtn.disabled = sSynHistoryCursor <= 0;
  forwardBtn.disabled = sSynHistoryCursor >= sSynHistory.length - 1;
}

function sSynRenderInfo(){
  const L = sLang();
  const panelTitleEl = document.getElementById('sSynPanelTitle');
  const panelDescEl = document.getElementById('sSynPanelDesc');
  const stepTitleEl = document.getElementById('sSynStepTitle');
  const stepDetailEl = document.getElementById('sSynStepDetail');
  const nextBtn = document.getElementById('sSynNextBtn');

  if(!panelTitleEl || !panelDescEl || !stepTitleEl || !stepDetailEl || !nextBtn)
    return;

  panelTitleEl.textContent = L.splaySynPanelTitle || 'SYNTAX MODE';

  if(sSynFinished && sSynHistory.length > 0){
    const entry = sSynHistory[sSynHistoryCursor];

    panelDescEl.innerHTML = (L.splaySynPanelDesc || '') + `<div class="info-panel-sep"></div><div><strong>${L.syntaxExecutionFinished || 'Execution has finished. You can browse the executed steps below or end this mode.'}</strong></div>`;
    stepTitleEl.textContent = entry.title;
    stepDetailEl.innerHTML = entry.detailHtml;
    nextBtn.textContent = L.endButton || 'End';
    nextBtn.disabled = false;

    sSynUpdateFinishUI();
    return;
  }

  panelDescEl.innerHTML = L.splaySynPanelDesc || '';

  const total = sSynSteps.length;
  if(total === 0){
    stepTitleEl.textContent = '';
    stepDetailEl.innerHTML = L.detailNotProvided || '';
    nextBtn.textContent = L.nextButton || 'Next';
    nextBtn.disabled = false;

    return;
  }

  if(sSynCursor === 0){
    const nextStep = sSynSteps[0];
    const nextTitle = sBuildStepLabel(nextStep, L);

    stepTitleEl.textContent = '';
    stepDetailEl.innerHTML =`<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> 1/${total}: ${nextTitle}</div>` + `<div class="ti-mt8">${L.splaySyntaxStartHint || `Click <strong>${L.nextButton || 'Next'}</strong> to execute this command.`}</div>`;

    nextBtn.textContent = L.nextButton || 'Next';
    nextBtn.disabled = false;

    return;
  }

  const lastIndex = Math.min(sSynCursor, total) - 1;
  const lastStep = sSynSteps[lastIndex];
  const result = sSynResults[lastIndex] || {};

  stepTitleEl.textContent = `${lastIndex + 1}/${total}: ${sBuildStepLabel(lastStep, L)}`;

  let html = sBuildExecutedSplayDetail(lastStep, result, L);
  if(sSynCursor < total){
    const nextStep = sSynSteps[sSynCursor];
    html += `<div class="info-panel-sep"></div>`;
    html += `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${sSynCursor + 1}/${total}: ${sBuildStepLabel(nextStep, L)}</div>`;
  }

  stepDetailEl.innerHTML = html;
  nextBtn.textContent = (sSynCursor >= total) ? (L.endButton || 'End') : (L.nextButton || 'Next');
  nextBtn.disabled = false;

  sSynUpdateFinishUI();
}

function refreshSplayUIForLanguage(){
  const L = sLang();
  const insertBtn = document.getElementById('sInsertBtn');
  const searchBtn = document.getElementById('sSearchBtn');
  const deleteBtn = document.getElementById('sDeleteBtn');

  if(insertBtn)
    insertBtn.textContent = L.splayInsertButton || 'Insert';
  if(searchBtn)
    searchBtn.textContent = L.splaySearchButton || 'Search';
  if(deleteBtn)
    deleteBtn.textContent = L.splayDeleteButton || 'Delete';

  sUpdateCounters();
  sRenderInitValuesBox();

  rebuildSplayBestWorstForLanguage();
  rebuildSplaySyntaxForLanguage();

  const bwHistoryBtn = document.getElementById('sBwHistoryBtn');
  const bwStartBtn = document.getElementById('sBwStartBtn');
  const bwPrevBtn = document.getElementById('sBwPrevBtn');
  const bwPlayPauseBtn = document.getElementById('sBwPlayPauseBtn');
  const bwNextStepBtn = document.getElementById('sBwNextStepBtn');
  const bwEndJumpBtn = document.getElementById('sBwEndJumpBtn');
  const manualHistoryBtn = document.getElementById('sManualHistoryBtn');
  const synPrevBtn = document.getElementById('sSynPrevBtn');
  const synForwardBtn = document.getElementById('sSynForwardBtn');
  const synHistoryBtn = document.getElementById('sSynHistoryBtn');

  if(bwHistoryBtn)
    bwHistoryBtn.title = L.syntaxHistoryButtonTitle || 'Open history';
  if(bwStartBtn)
    bwStartBtn.title = L.bwGoStartTitle || 'Go to the first executed step';
  if(bwPrevBtn)
    bwPrevBtn.title = L.bwStepBackTitle || 'Go one step back';
  if(bwPlayPauseBtn)
    bwPlayPauseBtn.title = sBwPaused ? (L.bwPlayTitle || 'Play') : (L.bwPauseTitle || 'Pause');
  if(bwNextStepBtn)
    bwNextStepBtn.title = L.bwStepForwardTitle || 'Go one step forward';
  if(bwEndJumpBtn)
    bwEndJumpBtn.title = L.bwGoEndTitle || 'Jump to the final step';
  if(manualHistoryBtn)
    manualHistoryBtn.title = L.syntaxHistoryButtonTitle || 'Open history';
  if(synPrevBtn)
    synPrevBtn.title = L.syntaxPrevStepTitle || 'Previous step';
  if(synForwardBtn)
    synForwardBtn.title = L.syntaxNextStepTitle || 'Next step';
  if(synHistoryBtn)
    synHistoryBtn.title = L.syntaxHistoryButtonTitle || 'Open history';

  if(document.getElementById('sBwPanelTitle'))
    sBwRenderInfo();
  if(document.getElementById('sSynPanelTitle'))
    sSynRenderInfo();

  sRenderManualInfoPanel();
}

function sCollectNodes(root){
  const nodes = [];

  function dfs(node){
    if(!node)
      return;

    dfs(node.left);
    nodes.push(node);
    dfs(node.right);
  }

  dfs(root);
  return nodes;
}

function sGetTreeVisualParams(nodeCount){
  let nodeSize = 44;
  let fontSize = 18;
  let pad = 70;

  if(nodeCount >= 8){
    nodeSize = 38;
    fontSize = 16;
    pad = 56;
  }
  if(nodeCount >= 12){
    nodeSize = 34;
    fontSize = 15;
    pad = 48;
  }
  if(nodeCount >= 16){
    nodeSize = 30;
    fontSize = 13;
    pad = 40;
  }
  if(nodeCount >= 24){
    nodeSize = 25;
    fontSize = 11;
    pad = 30;
  }
  if(nodeCount >= 32){
    nodeSize = 21;
    fontSize = 10;
    pad = 24;
  }
  if(nodeCount >= 48){
    nodeSize = 17;
    fontSize = 9;
    pad = 18;
  }
  if(nodeCount >= 64){
    nodeSize = 14;
    fontSize = 8;
    pad = 12;
  }

  return {nodeSize, nodeRadius: nodeSize / 2, fontSize, pad};
}

function sAssignDepth(root, depth, yStep){
  if(!root)
    return;

  root.y = depth * yStep;
  sAssignDepth(root.left, depth + 1, yStep);
  sAssignDepth(root.right, depth + 1, yStep);
}

function sScanMaxXY(root, acc){
  if(!root)
    return;

  if(root.x > acc.maxX)
    acc.maxX = root.x;
  if(root.y > acc.maxY)
    acc.maxY = root.y;

  sScanMaxXY(root.left, acc);
  sScanMaxXY(root.right, acc);
}

function sApplyScale(root, scale){
  if(!root)
    return;

  root.x *= scale;
  root.y *= scale;

  sApplyScale(root.left, scale);
  sApplyScale(root.right, scale);
}

function sBBox(root, box){
  if(!root)
    return;

  box.minBx = Math.min(box.minBx, root.x);
  box.maxBx = Math.max(box.maxBx, root.x);
  box.minBy = Math.min(box.minBy, root.y);
  box.maxBy = Math.max(box.maxBy, root.y);

  sBBox(root.left, box);
  sBBox(root.right, box);
}

function sShift(root, dx, dy){
  if(!root)
    return;

  root.x += dx;
  root.y += dy;

  sShift(root.left, dx, dy);
  sShift(root.right, dx, dy);
}

function sAssignLayout(root, areaW, areaH, visual){
  const nodesInOrder = sCollectNodes(root);
  const xStep = 70;
  const yStep = 85;
  const pad = visual?.pad ?? 70;

  nodesInOrder.forEach((node, index) => {node.x = (index + 1) * xStep;});
  sAssignDepth(root, 0, yStep);

  const acc = {maxX: 1, maxY: 1};
  sScanMaxXY(root, acc);

  const scaleW = (areaW - pad * 2) / (acc.maxX || 1);
  const scaleH = (areaH - pad * 2) / ((acc.maxY + 1) || 1);
  const scale = Math.min(1.0, scaleW, scaleH);
  sApplyScale(root, scale);

  const OFF = 1e9;
  const box = {minBx: OFF, maxBx: -OFF, minBy: OFF, maxBy: -OFF};
  sBBox(root, box);

  const width = box.maxBx - box.minBx;
  const height = box.maxBy - box.minBy;
  const dx = (areaW - width) / 2 - box.minBx;
  const dy = (areaH - height) / 2 - box.minBy;
  sShift(root, dx, dy);
}

function sComputePotential(){
  if(!sRoot){
    sPotential = 0;
    return;
  }

  let phi = 0;
  function post(node){
    if(!node)
      return 0;

    const leftSize = post(node.left);
    const rightSize = post(node.right);
    const size = 1 + leftSize + rightSize;

    phi += Math.log2(size);
    return size;
  }

  post(sRoot);
  sPotential = phi;
}

function sBuildEdges(){
  const edges = [];

  function dfs(node){
    if(!node)
      return;

    if(node.left)
      edges.push([node.id, node.left.id]);
    if(node.right)
      edges.push([node.id, node.right.id]);

    dfs(node.left);
    dfs(node.right);
  }

  dfs(sRoot);
  return edges;
}

function sDrawEdgesFromDom(){
  const area = document.getElementById('treeArea');
  const svg = document.getElementById('treeSvg');

  if(!area || !svg)
    return;

  const width = area.clientWidth;
  const height = area.clientHeight;
  const areaRect = area.getBoundingClientRect();

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.innerHTML = '';

  const edges = sBuildEdges();
  for(const [fromId, toId] of edges){
    const fromEl = sNodeEls.get(fromId);
    const toEl = sNodeEls.get(toId);

    if(!fromEl || !toEl)
      continue;

    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const x1 = (fromRect.left + fromRect.width / 2) - areaRect.left;
    const y1 = (fromRect.top + fromRect.height / 2) - areaRect.top;
    const x2 = (toRect.left + toRect.width / 2) - areaRect.left;
    const y2 = (toRect.top + toRect.height / 2) - areaRect.top;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');

    svg.appendChild(line);
  }
}

function sStartEdgeFollow(ms = S_MOVE_MS){
  const token = ++sEdgeAnimToken;
  cancelAnimationFrame(sEdgeAnimRaf);

  const start = performance.now();
  function tick(now){
    if(token !== sEdgeAnimToken)
      return;

    sDrawEdgesFromDom();
    if(now - start < ms)
      sEdgeAnimRaf = requestAnimationFrame(tick);
  }

  sEdgeAnimRaf = requestAnimationFrame(tick);
}

function sRenderTree({activeId = null, pathIds = [], animate = true} = {}){
  const area = document.getElementById('treeArea');
  const svg = document.getElementById('treeSvg');
  const layer = document.getElementById('treeNodesLayer');

  if(!area || !svg || !layer)
    return;

  const width = area.clientWidth;
  const height = area.clientHeight;

  if(!sRoot){
    svg.innerHTML = '';
    layer.innerHTML = '';
    sNodeEls.clear();
    sPotential = 0;
    sUpdateCounters();
    
    return;
  }

  const nodes = sCollectNodes(sRoot);
  const visual = sGetTreeVisualParams(nodes.length);

  sAssignLayout(sRoot, width, height, visual);
  sComputePotential();
  sUpdateCounters();

  const aliveIds = new Set(nodes.map(node => node.id));
  for(const node of nodes){
    let el = sNodeEls.get(node.id);

    if(!el){
      el = document.createElement('div');
      el.dataset.id = String(node.id);
      el.className = 'tree-node';
      layer.appendChild(el);
      sNodeEls.set(node.id, el);
    }

    el.textContent = String(node.key);
    el.className = 'tree-node' + (node === sRoot ? ' is-root' : '') + (pathIds.includes(node.id) ? ' is-path' : '') + (node.id === activeId ? ' is-active' : '');
    
    el.style.width = visual.nodeSize + 'px';
    el.style.height = visual.nodeSize + 'px';
    el.style.fontSize = visual.fontSize + 'px';
    el.style.left = (node.x - visual.nodeRadius) + 'px';
    el.style.top = (node.y - visual.nodeRadius) + 'px';
  }

  for(const [id, el] of sNodeEls){
    if(!aliveIds.has(id)){
      el.remove();
      sNodeEls.delete(id);
    }
  }

  sDrawEdgesFromDom();
  if(animate)
    sStartEdgeFollow(S_MOVE_MS);
}