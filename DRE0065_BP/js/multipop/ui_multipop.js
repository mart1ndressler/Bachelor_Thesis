function updateStackView(){
  const stackView = document.getElementById('stackView');
  if(!stackView)
    return;

  stackView.innerHTML = stackArray.map(v => `<div class="stack-item">${v}</div>`).join('');
}

function updateCounters(){
  const langData = mpLang();
  const sc = document.getElementById('stepCountDisplay');
  if(sc)
    sc.innerText = `${langData.stepCount}: ${stepCount}`;

  const pot = document.getElementById('potentialDisplay');
  if(pot)
    pot.innerHTML = `${langData.potential}: <span class="potentialValue">${potential}</span>`;

  const stackLbl = document.getElementById('mpStackLabel');
  if(stackLbl)
    stackLbl.textContent = langData.stackLabel || 'Stack';
}

function setSyntaxNextEnabled(enabled){
  const btn = document.getElementById('syntaxNextBtn');
  if(btn) 
    btn.disabled = !enabled;
}

function mpGetManualInfoEntry(){
  if(!Array.isArray(mpManualHistory))
    return null;
  if(mpManualInfoIndex < 0 || mpManualInfoIndex >= mpManualHistory.length)
    return null;

  return mpManualHistory[mpManualInfoIndex];
}

function mpToggleManualInfoPanel(){
  if(!mpGetManualInfoEntry())
    return;

  mpManualInfoOpen = !mpManualInfoOpen;
  mpRenderManualInfoPanel();
}

function mpRenderManualInfoPanel(){
  const dock = document.getElementById('mpManualInfoDock');
  const titleEl = document.getElementById('mpManualInfoTitle');
  const detailEl = document.getElementById('mpManualInfoDetail');

  if(!dock || !titleEl || !detailEl)
    return;

  const entry = mpGetManualInfoEntry();
  if(!entry){
    dock.classList.add('hidden');
    dock.classList.remove('open');
    return;
  }

  const L = mpLang();
  const step = entry.step || {};

  dock.classList.remove('hidden');
  dock.classList.toggle('open', !!mpManualInfoOpen);

  titleEl.textContent = mpManualHistoryTitle(mpManualInfoIndex, step, L);
  detailEl.innerHTML = mpBuildStepDetail(step, L);
}

function mpRenderBestWorstUI(mode, executionMode = (mpBwExecutionMode || 'auto')){
  const langData = mpLang();
  const dynamicContent = document.getElementById('dynamicContent');
  if(!dynamicContent)
    return;

  const isBest = (mode === 'best');
  const algParameters = document.querySelector('.alg_parameters');
  if(algParameters)
    algParameters.style.display = 'none';

  dynamicContent.innerHTML = `
    <div class="run-panel">
      <div class="run-row syntax-layout mp-bw-layout" id="mainContainer">

        <div class="run-visual-block">
          <div class="queueStackLabel" id="mpStackLabel">${langData.stackLabel || 'Stack'}</div>
          <div id="stackContainer">
            <div id="stackView" class="stack-view"></div>
          </div>
        </div>

        <div class="run-side-controls">
          <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>

          ${executionMode === 'auto' ? `
            <div class="bw-player-row">
              <button id="mpBwStartBtn" class="syntax-nav-btn" title="${langData.bwGoStartTitle || 'Go to the first executed step'}">
                <i class="fas fa-step-backward"></i>
              </button>

              <button id="mpBwPrevBtn" class="bw-step-btn" title="${langData.bwStepBackTitle || 'Go one step back'}">-1</button>

              <button id="mpBwPlayPauseBtn" class="syntax-nav-btn" title="${langData.bwPauseTitle || 'Pause'}">
                <i class="fas fa-pause"></i>
              </button>

              <button id="mpBwNextStepBtn" class="bw-step-btn" title="${langData.bwStepForwardTitle || 'Go one step forward'}">+1</button>

              <button id="mpBwEndJumpBtn" class="syntax-nav-btn" title="${langData.bwGoEndTitle || 'Jump to the final step'}">
                <i class="fas fa-step-forward"></i>
              </button>
            </div>

            <div class="bw-history-tools hidden" id="mpBwFinishTools">
              <button id="mpBwEndBtn" class="btn btn-primary btn-lg">${langData.endButton || 'End'}</button>
              <button id="mpBwHistoryBtn" class="syntax-history-btn" title="${langData.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          ` : `
            <button id="mpBwNextBtn" class="btn btn-primary btn-lg">${langData.nextButton}</button>

            <div class="bw-history-tools hidden" id="mpBwFinishTools">
              <button id="mpBwHistoryBtn" class="syntax-history-btn" title="${langData.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          `}
        </div>

        <div class="run-side-info mp-side-info">
          <div class="syntax-detailed-info" id="mpBwPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="mpBwPanelTitle">${isBest ? langData.bestCase : langData.worstCase}</div>
              <div class="info-panel-desc" id="mpBwPanelDesc"></div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="mpBwCurrentStepInfo"></div>
              <div class="info-step-detail" id="mpBwDetailedStepInfo"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  if(executionMode === 'auto'){
    const startBtn = document.getElementById('mpBwStartBtn');
    const prevBtn = document.getElementById('mpBwPrevBtn');
    const playPauseBtn = document.getElementById('mpBwPlayPauseBtn');
    const nextStepBtn = document.getElementById('mpBwNextStepBtn');
    const endJumpBtn = document.getElementById('mpBwEndJumpBtn');
    const endBtn = document.getElementById('mpBwEndBtn');

    if(startBtn)
      startBtn.onclick = mpBwJumpToStart;
    if(prevBtn)
      prevBtn.onclick = () => mpBwGoDelta(-1);
    if(playPauseBtn)
      playPauseBtn.onclick = mpBwTogglePlayPause;
    if(nextStepBtn)
      nextStepBtn.onclick = () => mpBwGoDelta(1);
    if(endJumpBtn)
      endJumpBtn.onclick = mpBwJumpToEnd;
    if(endBtn)
      endBtn.onclick = () => {
        mpResetState();
        returnToMainPageFromSyntax('multipop');
      };
  }
  else{
    const nextBtn = document.getElementById('mpBwNextBtn');
    const endBtn = document.getElementById('mpBwEndBtn');

    if(nextBtn)
      nextBtn.onclick = mpBwNextOrEnd;
    if(endBtn)
      endBtn.onclick = () => {
        mpResetState();
        returnToMainPageFromSyntax('multipop');
      };
  }

  const historyBtn = document.getElementById('mpBwHistoryBtn');
  if(historyBtn)
    historyBtn.onclick = mpBwOpenHistoryModal;

  updateStackView();
  updateCounters();
  mpBwRenderInfo();
}

function mpBwRenderInfo(){
  const L = mpLang();
  const titleEl = document.getElementById('mpBwPanelTitle');
  const descEl = document.getElementById('mpBwPanelDesc');
  const stepEl = document.getElementById('mpBwCurrentStepInfo');
  const detailEl = document.getElementById('mpBwDetailedStepInfo');

  if(!titleEl || !descEl || !stepEl || !detailEl)
    return;

  titleEl.textContent = (mpBestWorstMode === 'best') ? L.bestCase : L.worstCase;
  const bwDesc = (mpBestWorstMode === 'best') ? (L.bestCaseDescription || '') : (L.worstCaseDescription || '');
  const synDesc = L.mpSynPanelDesc || '';
  descEl.innerHTML = bwDesc + ((bwDesc && synDesc) ? `<div class="info-panel-sep"></div>` : ``) + synDesc;

  const total = Array.isArray(mpBwSteps) ? mpBwSteps.length : 0;
  if(total === 0){
    stepEl.textContent = '';
    detailEl.innerHTML = L.detailNotProvided || '';
    return;
  }

  let stepTitle = '';
  let html = '';

  if(mpBwHistory.length === 0){
    const next = mpBwSteps[0];
    html = `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> 1/${total}: ${next.description}</div>`;
  }
  else{
    const cursor = (mpBwHistoryCursor >= 0) ? mpBwHistoryCursor : (mpBwHistory.length - 1);
    const entry = mpBwHistory[cursor];
    stepTitle = entry.title;
    html = entry.detailHtml;

    if(!mpBwFinished && cursor === mpBwHistory.length - 1 && mpBwCursor < total){
      const next = mpBwSteps[mpBwCursor];
      html += `<div class="info-panel-sep"></div><div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${mpBwCursor + 1}/${total}: ${next.description}</div>`;
    }

    if(mpBwFinished && cursor === mpBwHistory.length - 1)
      html += `<div class="info-panel-sep"></div><div><strong>${L.bwExecutionFinished || 'Execution has finished. You can open the history below or end this mode.'}</strong></div>`;
  }

  stepEl.textContent = stepTitle;
  detailEl.innerHTML = html;

  const viewingFinal = mpBwFinished && mpBwHistoryCursor === mpBwHistory.length - 1;
  const finishTools = document.getElementById('mpBwFinishTools');
  if(finishTools)
    finishTools.classList.toggle('hidden', !viewingFinal);

  const nextBtn = document.getElementById('mpBwNextBtn');
  if(nextBtn)
    nextBtn.textContent = mpBwFinished ? (L.endButton || 'End') : (L.nextButton || 'Next');

  const endBtn = document.getElementById('mpBwEndBtn');
  if(endBtn)
    endBtn.textContent = L.endButton || 'End';

  const startBtn = document.getElementById('mpBwStartBtn');
  const prevBtn = document.getElementById('mpBwPrevBtn');
  const playPauseBtn = document.getElementById('mpBwPlayPauseBtn');
  const nextStepBtn = document.getElementById('mpBwNextStepBtn');
  const endJumpBtn = document.getElementById('mpBwEndJumpBtn');
  const historyBtn = document.getElementById('mpBwHistoryBtn');

  if(startBtn)
    startBtn.title = L.bwGoStartTitle || 'Go to the first executed step';
  if(prevBtn){
    prevBtn.title = L.bwStepBackTitle || 'Go one step back';
    prevBtn.disabled = mpBwHistory.length === 0 || mpBwHistoryCursor < 0;
  }
  if(playPauseBtn){
    const playPauseDisabled = viewingFinal;

    playPauseBtn.title = mpBwPaused ? (L.bwPlayTitle || 'Play') : (L.bwPauseTitle || 'Pause');
    playPauseBtn.innerHTML = mpBwPaused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    playPauseBtn.disabled = playPauseDisabled;
  }
  if(nextStepBtn){
    nextStepBtn.title = L.bwStepForwardTitle || 'Go one step forward';
    nextStepBtn.disabled = mpBwFinished && mpBwHistoryCursor >= mpBwHistory.length - 1;
  }
  if(endJumpBtn)
    endJumpBtn.title = L.bwGoEndTitle || 'Jump to the final step';
  if(historyBtn)
    historyBtn.title = L.syntaxHistoryButtonTitle || 'Open history';
}

function displayStack(values = stackArray){
  const langData = mpLang();
  const dynamicContent = document.getElementById('dynamicContent');
  if(!dynamicContent) 
    return;

  const buttonsHtml = isBestWorstMode ? '' : `
    <div id="multipop_buttons">
      <button class="btn btn-primary btn-lg" onclick="pushToStack()">${langData.pushButton}</button>
      <button class="btn btn-primary btn-lg" onclick="popFromStack()">${langData.popButton}</button>
      <button class="btn btn-primary btn-lg" onclick="multipopFromStack()">${langData.multipopButton}</button>
    </div>
  `;

  dynamicContent.innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">
        <div>
          <div class="queueStackLabel" id="mpStackLabel">${langData.stackLabel || 'Stack'}</div>
          <div id="stackContainer">
            <div id="stackView" class="stack-view">
              ${values.map(v => `<div class="stack-item">${v}</div>`).join('')}
            </div>
          </div>
        </div>

        <div class="stack-controls controls-bottom">
          <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>

          <button id="mpManualHistoryBtn" class="syntax-history-btn" title="${langData.syntaxHistoryButtonTitle || 'Open history'}">
            <i class="fas fa-info-circle"></i>
          </button>

          ${buttonsHtml}
        </div>
      </div>

      <div id="mpManualInfoDock" class="manual-step-dock hidden">
        <div class="manual-step-shell">
          <button type="button" id="mpManualInfoTab" class="manual-step-tab">
            <i class="fas fa-angle-double-left"></i>
          </button>

          <div class="manual-step-panel">
            <div class="manual-step-panel-scroll">
              <div class="info-panel-title" id="mpManualInfoTitle"></div>
              <div class="info-step-detail" id="mpManualInfoDetail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const historyBtn = document.getElementById('mpManualHistoryBtn');
  if(historyBtn)
    historyBtn.onclick = mpManualOpenHistoryModal;

  const infoTab = document.getElementById('mpManualInfoTab');
  if(infoTab)
    infoTab.onclick = mpToggleManualInfoPanel;

  mpRenderManualInfoPanel();
}

function displaySyntaxUI(){
  const langData = mpLang();
  const dc = document.getElementById('dynamicContent');
  if(!dc)
    return;

  const title = langData.mpSynPanelTitle || 'SYNTAX MODE';
  const desc = langData.mpSynPanelDesc || '';

  dc.innerHTML = `
    <div class="run-panel">
      <div class="run-row syntax-layout mp-syntax-layout" id="mainContainer">

        <div class="run-visual-block">
          <div class="queueStackLabel" id="mpStackLabel">${langData.stackLabel || 'Stack'}</div>
          <div id="stackContainer">
            <div id="stackView" class="stack-view">
              ${stackArray.map(v => `<div class="stack-item">${v}</div>`).join('')}
            </div>
          </div>
        </div>

        <div class="run-side-controls">
          <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">
            ${langData.potential}: <span class="potentialValue">${potential}</span>
          </div>

          <button id="syntaxNextBtn" class="btn btn-primary btn-lg">${langData.nextButton}</button>

          <div id="mpSynFinishTools" class="syntax-finish-tools hidden">
            <div class="syntax-nav-row">
              <button id="mpSynPrevBtn" class="syntax-nav-btn" title="${langData.syntaxPrevStepTitle || 'Previous step'}">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button id="mpSynForwardBtn" class="syntax-nav-btn" title="${langData.syntaxNextStepTitle || 'Next step'}">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>

            <button id="mpSynHistoryBtn" class="syntax-history-btn" title="${langData.syntaxHistoryButtonTitle || 'Open history'}">
              <i class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>

        <div class="run-side-info mp-side-info">
          <div class="syntax-detailed-info" id="mpSynPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="mpSynPanelTitle">${title}</div>
              <div class="info-panel-desc" id="mpSynPanelDesc">${desc}</div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="currentStepInfo"></div>
              <div class="info-step-detail" id="detailedStepInfo"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  const btn = document.getElementById('syntaxNextBtn');
  if(btn)
    btn.onclick = nextSyntaxStep;

  setSyntaxNextEnabled(!mpBusy);

  const prevBtn = document.getElementById('mpSynPrevBtn');
  const forwardBtn = document.getElementById('mpSynForwardBtn');
  const historyBtn = document.getElementById('mpSynHistoryBtn');

  if(prevBtn)
    prevBtn.onclick = () => mpSynGoHistory(-1);
  if(forwardBtn)
    forwardBtn.onclick = () => mpSynGoHistory(1);
  if(historyBtn)
    historyBtn.onclick = mpSynOpenHistoryModal;

  mpSynUpdateFinishUI();
  mpSynRenderInfo();
}

function mpSynUpdateFinishUI(){
  const wrap = document.getElementById('mpSynFinishTools');
  const prevBtn = document.getElementById('mpSynPrevBtn');
  const forwardBtn = document.getElementById('mpSynForwardBtn');

  if(!wrap || !prevBtn || !forwardBtn)
    return;

  if(!mpSynFinished){
    wrap.classList.add('hidden');
    return;
  }

  wrap.classList.remove('hidden');
  prevBtn.disabled = mpSynHistoryCursor <= 0;
  forwardBtn.disabled = mpSynHistoryCursor >= mpSynHistory.length - 1;
}

function mpSynRenderInfo(){
  const L = mpLang();
  const t0 = document.getElementById('mpSynPanelTitle');
  const d0 = document.getElementById('mpSynPanelDesc');
  const t1 = document.getElementById('currentStepInfo');
  const d1 = document.getElementById('detailedStepInfo');
  const btn = document.getElementById('syntaxNextBtn');

  if(!t0 || !d0 || !t1 || !d1 || !btn)
    return;

  t0.textContent = L.mpSynPanelTitle || 'SYNTAX MODE';
  if(mpSynFinished && mpSynHistory.length > 0){
    const entry = mpSynHistory[mpSynHistoryCursor];

    d0.innerHTML = (L.mpSynPanelDesc || '') + `<div class="info-panel-sep"></div><div><strong>${L.syntaxExecutionFinished || 'Execution has finished. You can browse the executed steps below or end this mode.'}</strong></div>`;
    t1.textContent = entry.title;
    d1.innerHTML = entry.detailHtml;
    btn.textContent = L.endButton || 'End';
    btn.disabled = false;

    mpSynUpdateFinishUI();
    return;
  }

  d0.innerHTML = L.mpSynPanelDesc || '';
  if(!Array.isArray(steps) || steps.length === 0){
    t1.textContent = '';
    d1.innerHTML = L.detailNotProvided || '';
    btn.textContent = L.nextButton || 'Next';

    return;
  }

  const total = steps.length;
  const s = steps[currentCommandIndex];

  t1.innerHTML = `${currentCommandIndex + 1}/${total}: ${s.description}`;
  let html = (s.detail && String(s.detail).trim()) ? s.detail : (L.detailNotProvided || '');

  if(currentCommandIndex < total - 1){
    const next = steps[currentCommandIndex + 1];
    html += `<div class="info-panel-sep"></div><div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${currentCommandIndex + 2}/${total}: ${next.description}</div>`;
  }

  d1.innerHTML = html;
  btn.textContent = L.nextButton || 'Next';
  btn.disabled = !!mpBusy;

  mpSynUpdateFinishUI();
}

function updateMpSyntaxPanels(){
  mpSynRenderInfo();
}