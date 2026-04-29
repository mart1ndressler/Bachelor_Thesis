function mpBuildStackItemsHtml(values){
  return values.map(value => `<div class="stack-item">${value}</div>`).join('');
}

function mpBindClick(id, handler){
  const el = document.getElementById(id);
  if(el)
    el.onclick = handler;
}

function mpSetMainButtonsEnabled(enabled){
  ['mpPushBtn', 'mpPopBtn', 'mpMultipopBtn', 'mpRandomNextBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn)
      btn.disabled = !enabled;
  });
}

function updateStackView(){
  const stackView = document.getElementById('stackView');
  if(!stackView)
    return;

  stackView.innerHTML = mpBuildStackItemsHtml(stackArray);
}

function updateCounters(){
  const L = mpLang();

  const operationCountDisplay = document.getElementById('mpOperationCountDisplay');
  if(operationCountDisplay)
    operationCountDisplay.innerText = `${L.operationCount}: ${mpGetOperationCount()}`;

  const stepCountDisplay = document.getElementById('stepCountDisplay');
  if(stepCountDisplay)
    stepCountDisplay.innerText = `${L.stepCount}: ${stepCount}`;

  const potentialDisplay = document.getElementById('potentialDisplay');
  if(potentialDisplay)
    potentialDisplay.innerHTML = `${L.potential}: <span class="potentialValue">${potential}</span>`;

  const stackLabel = document.getElementById('mpStackLabel');
  if(stackLabel)
    stackLabel.textContent = L.stackLabel || 'Stack';
}

function setSyntaxNextEnabled(enabled){
  const button = document.getElementById('syntaxNextBtn');
  if(button)
    button.disabled = !enabled;
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

  titleEl.textContent = mpBuildManualHistoryTitle(mpManualInfoIndex, step, L);
  detailEl.innerHTML = mpBuildStepDetail(step, L);
  scrollBoxToTop(detailEl.closest('.manual-step-panel-scroll'));
}

function mpBindManualControls(){
  if(mpIsRandomMode)
    mpBindClick('mpRandomNextBtn', mpRandomNextStep);
  else{
    mpBindClick('mpPushBtn', mpPromptForPushAction);
    mpBindClick('mpPopBtn', mpHandlePopAction);
    mpBindClick('mpMultipopBtn', mpPromptForMultipopAction);
  }

  mpBindClick('mpManualHistoryBtn', mpManualOpenHistoryModal);
  mpBindClick('mpManualInfoTab', mpToggleManualInfoPanel);
}

function mpBindSyntaxControls(){
  mpBindClick('syntaxNextBtn', nextSyntaxStep);
  mpBindClick('mpSynPrevBtn', () => mpSynGoHistory(-1));
  mpBindClick('mpSynForwardBtn', () => mpSynGoHistory(1));
  mpBindClick('mpSynHistoryBtn', mpSynOpenHistoryModal);
}

function mpBindSpecialCasesAutoControls(){
  mpBindClick('mpScStartBtn', mpScJumpToStart);
  mpBindClick('mpScPrevBtn', () => mpScGoDelta(-1));
  mpBindClick('mpScPlayPauseBtn', mpScTogglePlayPause);
  mpBindClick('mpScNextStepBtn', () => mpScGoDelta(1));
  mpBindClick('mpScEndJumpBtn', mpScJumpToEnd);
  mpBindClick('mpScEndBtn', () => {
    mpResetState();
    returnToMainPageFromSyntax('multipop');
  });
}

function mpBindSpecialCasesManualControls(){
  mpBindClick('mpScNextBtn', mpScNextOrEnd);
  mpBindClick('mpScEndBtn', () => {
    mpResetState();
    returnToMainPageFromSyntax('multipop');
  });
}

function mpBindSpecialCasesSharedControls(executionMode){
  if(executionMode === 'auto')
    mpBindSpecialCasesAutoControls();
  else
    mpBindSpecialCasesManualControls();

  mpBindClick('mpScHistoryBtn', mpScOpenHistoryModal);
}

function mpRenderSpecialCasesUI(mode, executionMode = (mpScExecutionMode || 'auto')){
  const L = mpLang();
  const scenario = mpScGetScenarioDef(mode);

  const dynamicContent = document.getElementById('dynamicContent');
  if(!dynamicContent)
    return;

  const algParameters = document.querySelector('.alg_parameters');
  if(algParameters)
    algParameters.style.display = 'none';

  dynamicContent.innerHTML = `
    <div class="run-panel">
      <div class="run-row syntax-layout mp-sc-layout" id="mainContainer">

        <div class="run-visual-block">
          <div class="queueStackLabel" id="mpStackLabel">${L.stackLabel || 'Stack'}</div>
          <div id="stackContainer">
            <div id="stackView" class="stack-view"></div>
          </div>
        </div>

        <div class="run-side-controls">
          ${typesParamsBuildOperationPreviewHtml('mp')}
          <div class="operation-count" id="mpOperationCountDisplay">${L.operationCount}: ${mpGetOperationCount()}</div>
          <div class="step-count" id="stepCountDisplay">${L.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">${L.potential}: <span class="potentialValue">${potential}</span></div>

          ${executionMode === 'auto' ? `
            <div class="sc-player-row">
              <button id="mpScStartBtn" class="syntax-nav-btn" title="${L.scGoStartTitle || 'Go to the first executed step'}">
                <i class="fas fa-step-backward"></i>
              </button>

              <button id="mpScPrevBtn" class="sc-step-btn" title="${L.scStepBackTitle || 'Go one step back'}">-1</button>

              <button id="mpScPlayPauseBtn" class="syntax-nav-btn" title="${L.scPauseTitle || 'Pause'}">
                <i class="fas fa-pause"></i>
              </button>

              <button id="mpScNextStepBtn" class="sc-step-btn" title="${L.scStepForwardTitle || 'Go one step forward'}">+1</button>

              <button id="mpScEndJumpBtn" class="syntax-nav-btn" title="${L.scGoEndTitle || 'Jump to the final step'}">
                <i class="fas fa-step-forward"></i>
              </button>
            </div>

            <div class="sc-history-tools hidden" id="mpScFinishTools">
              <button id="mpScEndBtn" class="btn btn-primary btn-lg">${L.endButton || 'End'}</button>
              <button id="mpScHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          ` : `
            <button id="mpScNextBtn" class="btn btn-primary btn-lg">${L.nextButton}</button>

            <div class="sc-history-tools hidden" id="mpScFinishTools">
              <button id="mpScHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          `}
        </div>

        <div class="run-side-info mp-side-info">
          <div class="syntax-detailed-info" id="mpScPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="mpScPanelTitle">${scenario.title}</div>
              <div class="info-panel-desc" id="mpScPanelDesc"></div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="mpScCurrentStepInfo"></div>
              <div class="info-step-detail" id="mpScDetailedStepInfo"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  mpBindSpecialCasesSharedControls(executionMode);
  updateStackView();
  updateCounters();
  mpScRenderInfo();
}

function mpScRenderInfo(){
  const L = mpLang();
  const titleEl = document.getElementById('mpScPanelTitle');
  const descEl = document.getElementById('mpScPanelDesc');
  const stepEl = document.getElementById('mpScCurrentStepInfo');
  const detailEl = document.getElementById('mpScDetailedStepInfo');

  if(!titleEl || !descEl || !stepEl || !detailEl)
    return;

  const isBusy = !!mpBusy;
  const scenario = mpScGetScenarioDef();
  titleEl.textContent = scenario.title;

  const Lall = trCommon();
  const scDesc = scenario.description || '';
  const modeDesc = (mpScExecutionMode === 'auto') ? (Lall.scAutoPanelDesc || '') : (Lall.scManualPanelDesc || '');
  descEl.innerHTML = scDesc + ((scDesc && modeDesc) ? `<div class="info-panel-sep"></div>` : '') + modeDesc;

  const total = Array.isArray(mpScSteps) ? mpScSteps.length : 0;
  if(total === 0){
    stepEl.textContent = '';
    detailEl.innerHTML = L.detailNotProvided || '';

    return;
  }

  let stepTitle = '';
  let detailHtml = '';

  if(mpScHistory.length === 0){
    const previewStep = mpScBuildPreviewStep(mpScSteps[0]);
    
    if(previewStep){
      stepTitle = `1/${total}: ${previewStep.description}`;
      detailHtml = previewStep.detail;
    }
    else
      detailHtml = L.detailNotProvided || '';
  }
  else{
    const cursor = (mpScHistoryCursor >= 0) ? mpScHistoryCursor : (mpScHistory.length - 1);
    const entry = mpScHistory[cursor];

    stepTitle = entry.title;
    detailHtml = entry.detailHtml;

    if(mpScFinished && cursor === mpScHistory.length - 1)
      detailHtml += `<div class="info-panel-sep"></div><div><strong>${L.scExecutionFinished || 'Execution has finished. You can open the history below or end this mode.'}</strong></div>`;
  }

  stepEl.textContent = stepTitle;
  detailEl.innerHTML = detailHtml;
  scrollBoxToTop(detailEl.closest('.syntax-detailed-scroll'));

  const viewingFinal = mpScFinished && mpScHistoryCursor === mpScHistory.length - 1;
  const finishTools = document.getElementById('mpScFinishTools');
  if(finishTools)
    finishTools.classList.toggle('hidden', !viewingFinal);

  const nextBtn = document.getElementById('mpScNextBtn');
  if(nextBtn)
    nextBtn.textContent = mpScFinished ? (L.endButton || 'End') : (L.nextButton || 'Next');

  const endBtn = document.getElementById('mpScEndBtn');
  if(endBtn)
    endBtn.textContent = L.endButton || 'End';

  const startBtn = document.getElementById('mpScStartBtn');
  const prevBtn = document.getElementById('mpScPrevBtn');
  const playPauseBtn = document.getElementById('mpScPlayPauseBtn');
  const nextStepBtn = document.getElementById('mpScNextStepBtn');
  const endJumpBtn = document.getElementById('mpScEndJumpBtn');
  const historyBtn = document.getElementById('mpScHistoryBtn');
  const isAutoMode = mpScExecutionMode === 'auto';

  if(startBtn)
    startBtn.disabled = false;
  if(prevBtn){
    prevBtn.title = L.scStepBackTitle || 'Go one step back';
    prevBtn.disabled = mpScHistory.length === 0 || mpScHistoryCursor < 0;
  }
  if(playPauseBtn){
    playPauseBtn.title = mpScPaused ? (L.scPlayTitle || 'Play') : (L.scPauseTitle || 'Pause');
    playPauseBtn.innerHTML = mpScPaused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    playPauseBtn.disabled = viewingFinal;
  }
  if(nextStepBtn){
    nextStepBtn.title = L.scStepForwardTitle || 'Go one step forward';
    nextStepBtn.disabled = mpScFinished && mpScHistoryCursor >= mpScHistory.length - 1;
  }
  if(endJumpBtn){
    endJumpBtn.title = L.scGoEndTitle || 'Jump to the final step';
    endJumpBtn.disabled = false;
  }
  if(historyBtn)
    historyBtn.title = L.syntaxHistoryButtonTitle || 'Open history';
  if(nextBtn)
    nextBtn.disabled = isBusy;

  mpScRenderPreview(false);
}

function displayStack(values = stackArray){
  const L = mpLang();

  const dynamicContent = document.getElementById('dynamicContent');
  if(!dynamicContent)
    return;

  const buttonsHtml = isSpecialCasesMode ? '' : `
    <div id="multipop_buttons">
      ${mpIsRandomMode ? `
        <button id="mpRandomNextBtn" class="btn btn-primary btn-lg">${L.nextButton}</button>
      ` : `
        <button id="mpPushBtn" class="btn btn-primary btn-lg">${L.pushButton}</button>
        <button id="mpPopBtn" class="btn btn-primary btn-lg">${L.popButton}</button>
        <button id="mpMultipopBtn" class="btn btn-primary btn-lg">${L.multipopButton}</button>
      `}
    </div>
  `;

  dynamicContent.innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">
        <div>
          <div class="queueStackLabel" id="mpStackLabel">${L.stackLabel || 'Stack'}</div>
          <div id="stackContainer">
            <div id="stackView" class="stack-view">
              ${mpBuildStackItemsHtml(values)}
            </div>
          </div>
        </div>

        <div class="stack-controls controls-bottom">
          ${mpIsRandomMode ? typesParamsBuildOperationPreviewHtml('mp', mpGetRandomPreviewState()) : ''}
          <div class="operation-count" id="mpOperationCountDisplay">${L.operationCount}: ${mpGetOperationCount()}</div>
          <div class="step-count" id="stepCountDisplay">${L.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">${L.potential}: <span class="potentialValue">${potential}</span></div>

          <button id="mpManualHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
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

  mpBindManualControls();
  mpSetMainButtonsEnabled(!mpBusy);
  mpRenderManualInfoPanel();
}

function displaySyntaxUI(){
  const L = mpLang();

  const dynamicContent = document.getElementById('dynamicContent');
  if(!dynamicContent)
    return;

  const title = L.mpSynPanelTitle || 'SYNTAX MODE';
  const description = L.mpSynPanelDesc || '';

  dynamicContent.innerHTML = `
    <div class="run-panel">
      <div class="run-row syntax-layout mp-syntax-layout" id="mainContainer">

        <div class="run-visual-block">
          <div class="queueStackLabel" id="mpStackLabel">${L.stackLabel || 'Stack'}</div>
          <div id="stackContainer">
            <div id="stackView" class="stack-view">
              ${mpBuildStackItemsHtml(stackArray)}
            </div>
          </div>
        </div>

        <div class="run-side-controls">
          ${typesParamsBuildOperationPreviewHtml('mp')}
          <div class="operation-count" id="mpOperationCountDisplay">${L.operationCount}: ${mpGetOperationCount()}</div>
          <div class="step-count" id="stepCountDisplay">${L.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">${L.potential}: <span class="potentialValue">${potential}</span></div>

          <button id="syntaxNextBtn" class="btn btn-primary btn-lg">${L.nextButton}</button>

          <div id="mpSynFinishTools" class="syntax-finish-tools hidden">
            <div class="syntax-nav-row">
              <button id="mpSynPrevBtn" class="syntax-nav-btn" title="${L.syntaxPrevStepTitle || 'Previous step'}">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button id="mpSynForwardBtn" class="syntax-nav-btn" title="${L.syntaxNextStepTitle || 'Next step'}">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>

            <button id="mpSynHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
              <i class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>

        <div class="run-side-info mp-side-info">
          <div class="syntax-detailed-info" id="mpSynPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="mpSynPanelTitle">${title}</div>
              <div class="info-panel-desc" id="mpSynPanelDesc">${description}</div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="currentStepInfo"></div>
              <div class="info-step-detail" id="detailedStepInfo"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  mpBindSyntaxControls();
  setSyntaxNextEnabled(!mpBusy);
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
  prevBtn.disabled = !!mpBusy || mpSynHistoryCursor <= 0;
  forwardBtn.disabled = !!mpBusy || mpSynHistoryCursor >= steps.length - 1;
}

function mpSynRenderInfo(){
  const L = mpLang();
  const panelTitle = document.getElementById('mpSynPanelTitle');
  const panelDesc = document.getElementById('mpSynPanelDesc');
  const currentStepInfo = document.getElementById('currentStepInfo');
  const detailInfo = document.getElementById('detailedStepInfo');
  const nextButton = document.getElementById('syntaxNextBtn');

  if(!panelTitle || !panelDesc || !currentStepInfo || !detailInfo || !nextButton)
    return;

  panelTitle.textContent = L.mpSynPanelTitle || 'SYNTAX MODE';
  if(mpSynFinished && mpSynHistory.length > 0){
    const entry = mpSynHistory[mpSynHistoryCursor];

    panelDesc.innerHTML = (L.mpSynPanelDesc || '') + `<div class="info-panel-sep"></div><div><strong>${L.syntaxExecutionFinished || 'Execution has finished. You can browse the executed steps below or end this mode.'}</strong></div>`;
    currentStepInfo.textContent = entry.title;
    detailInfo.innerHTML = entry.detailHtml;
    scrollBoxToTop(detailInfo.closest('.syntax-detailed-scroll'));
    nextButton.textContent = L.endButton || 'End';
    nextButton.disabled = !!mpBusy;

    if(mpSynPreviewVisible)
      mpSynRenderPreview(false);
    else
      typesParamsSetOperationPreviewVisible('mp', false);

    mpSynUpdateFinishUI();
    return;
  }

  panelDesc.innerHTML = L.mpSynPanelDesc || '';
  if(!Array.isArray(steps) || steps.length === 0){
    currentStepInfo.textContent = '';
    detailInfo.innerHTML = L.detailNotProvided || '';
    nextButton.textContent = L.nextButton || 'Next';
    
    return;
  }

  const total = steps.length;
  const step = steps[currentCommandIndex];
  currentStepInfo.innerHTML = `${currentCommandIndex + 1}/${total}: ${step.description}`;

  let detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');
  detailInfo.innerHTML = detailHtml;
  scrollBoxToTop(detailInfo.closest('.syntax-detailed-scroll'));

  nextButton.textContent = L.nextButton || 'Next';
  nextButton.disabled = !!mpBusy;
  
  mpSynUpdateFinishUI();
  mpSynRenderPreview(false);
}