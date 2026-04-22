function qGetManualInfoEntry(){
  if(!Array.isArray(qManualHistory))
    return null;

  if(qManualInfoIndex < 0 || qManualInfoIndex >= qManualHistory.length)
    return null;

  return qManualHistory[qManualInfoIndex];
}

function qToggleManualInfoPanel(){
  if(!qGetManualInfoEntry())
    return;

  qManualInfoOpen = !qManualInfoOpen;
  qRenderManualInfoPanel();
}

function qRenderManualInfoPanel(){
  const dock = document.getElementById('qManualInfoDock');
  const titleEl = document.getElementById('qManualInfoTitle');
  const detailEl = document.getElementById('qManualInfoDetail');

  if(!dock || !titleEl || !detailEl)
    return;

  const entry = qGetManualInfoEntry();
  if(!entry){
    dock.classList.add('hidden');
    dock.classList.remove('open');

    return;
  }

  const L = qLang();
  const step = entry.step || {};

  dock.classList.remove('hidden');
  dock.classList.toggle('open', !!qManualInfoOpen);

  titleEl.textContent = qBuildManualHistoryTitle(qManualInfoIndex, step, L);
  detailEl.innerHTML = qBuildStepDetail(step, L);
  scrollBoxToTop(detailEl.closest('.manual-step-panel-scroll'));
}

function qGetTopItemElement(viewId){
  const view = document.getElementById(viewId);
  if(!view)
    return null;

  const items = view.querySelectorAll('.stack-item');
  return items.length ? items[items.length - 1] : null;
}

function qAnimateRemoveTopItem(viewId, onDone){
  if(qSkipAnimations){
    if(onDone)
      onDone();

    return;
  }

  const element = qGetTopItemElement(viewId);
  if(!element){
    if(onDone)
      onDone();

    return;
  }

  element.classList.add('removed-item');
  element.addEventListener('animationend', () => {
    if(onDone)
      onDone();
  }, {once: true});
}

function qAnimateAddTopItem(viewId, onDone = null){
  if(qSkipAnimations){
    if(onDone)
      onDone();

    return;
  }

  const element = qGetTopItemElement(viewId);
  if(!element){
    if(onDone)
      onDone();

    return;
  }

  element.classList.add('new-item');
  element.addEventListener('animationend', () => {
    if(onDone)
      onDone();
  }, {once: true});
}

function qBuildStackItemsHtml(values){
  return values.map(value => `<div class="stack-item">${value}</div>`).join('');
}

function qBindClick(id, handler){
  const element = document.getElementById(id);
  if(element)
    element.onclick = handler;
}

function qSetMainButtonsEnabled(enabled){
  ['qEnqueueBtn', 'qDequeueBtn', 'qRandomNextBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn)
      btn.disabled = !enabled;
  });
}

function renderQueueStacks(){
  const inView = document.getElementById('qInView');
  const outView = document.getElementById('qOutView');

  if(inView)
    inView.innerHTML = qBuildStackItemsHtml(qIn);
  if(outView)
    outView.innerHTML = qBuildStackItemsHtml(qOut);
}

function updateQueueCounters(){
  const L = qLang();

  const operationCountDisplay = document.getElementById('qOperationCountDisplay');
  const stepCountDisplay = document.getElementById('qStepCountDisplay');
  const potentialDisplay = document.getElementById('qPotentialDisplay');

  if(stepCountDisplay)
    stepCountDisplay.innerText = `${L.stepCount}: ${qStepCount}`;
  if(potentialDisplay)
    potentialDisplay.innerHTML = `${L.potential}: <span class="potentialValue">${qPotential}</span>`;
  if(operationCountDisplay)
    operationCountDisplay.innerText = `${L.operationCount}: ${qGetOperationCount()}`;

  const outLabel = document.getElementById('qOutLabel');
  const inLabel = document.getElementById('qInLabel');

  if(outLabel)
    outLabel.textContent = L.queueStackOutLabel;
  if(inLabel)
    inLabel.textContent = L.queueStackInLabel;
}

function qSetSyntaxNextEnabled(enabled){
  const button = document.getElementById('syntaxNextBtn');
  if(button)
    button.disabled = !enabled;
}

function qBindMainControls(){
  if(qIsRandomMode)
    qBindClick('qRandomNextBtn', qRandomNextStep);
  else{
    qBindClick('qEnqueueBtn', qPromptForEnqueueAction);
    qBindClick('qDequeueBtn', qHandleDequeueAction);
  }

  qBindClick('qManualHistoryBtn', qManualOpenHistoryModal);
  qBindClick('qManualInfoTab', qToggleManualInfoPanel);
}

function qBindSpecialCasesAutoControls(){
  qBindClick('qScStartBtn', qScJumpToStart);
  qBindClick('qScPrevBtn', () => qScGoDelta(-1));
  qBindClick('qScPlayPauseBtn', qScTogglePlayPause);
  qBindClick('qScNextStepBtn', () => qScGoDelta(1));
  qBindClick('qScEndJumpBtn', qScJumpToEnd);
  qBindClick('qScEndBtn', () => {
    qResetState();
    returnToMainPageFromSyntax('queue2Stacks');
  });
}

function qBindSpecialCasesManualControls(){
  qBindClick('qScNextBtn', qScNextOrEnd);
  qBindClick('qScEndBtn', () => {
    qResetState();
    returnToMainPageFromSyntax('queue2Stacks');
  });
}

function qBindSpecialCasesControls(executionMode){
  if(executionMode === 'auto')
    qBindSpecialCasesAutoControls();
  else
    qBindSpecialCasesManualControls();

  qBindClick('qScHistoryBtn', qScOpenHistoryModal);
}

function qBindSyntaxControls(){
  qBindClick('syntaxNextBtn', nextQueue2StacksSyntaxStep);
  qBindClick('qSynPrevBtn', () => qSynGoHistory(-1));
  qBindClick('qSynForwardBtn', () => qSynGoHistory(1));
  qBindClick('qSynHistoryBtn', qSynOpenHistoryModal);
}

function qRenderMainUI(){
  const L = qLang();

  document.getElementById('dynamicContent').innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">

        <div class="queueStacksWrap">
          <div class="queueStackBlock">
            <div class="queueStackLabel" id="qOutLabel">${L.queueStackOutLabel}</div>
            <div class="queueStackContainer">
              <div id="qOutView" class="stack-view">
                ${qBuildStackItemsHtml(qOut)}
              </div>
            </div>
          </div>

          <div class="queueStackBlock">
            <div class="queueStackLabel" id="qInLabel">${L.queueStackInLabel}</div>
            <div class="queueStackContainer">
              <div id="qInView" class="stack-view">
                ${qBuildStackItemsHtml(qIn)}
              </div>
            </div>
          </div>
        </div>

        <div class="stack-controls controls-bottom">
          ${qIsRandomMode ? typesParamsBuildOperationPreviewHtml('q', qGetRandomPreviewState()) : ''}
          <div class="operation-count" id="qOperationCountDisplay">${L.operationCount}: ${qGetOperationCount()}</div>
          <div class="step-count" id="qStepCountDisplay">${L.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">${L.potential}: <span class="potentialValue">${qPotential}</span></div>

          <button id="qManualHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
            <i class="fas fa-info-circle"></i>
          </button>

          ${qIsSpecialCasesMode ? '' : `
            <div id="queue2Stacks_buttons">
              ${qIsRandomMode ? `
                <button id="qRandomNextBtn" class="btn btn-primary btn-lg">${L.nextButton}</button>
              ` : `
                <button id="qEnqueueBtn" class="btn btn-primary btn-lg">${L.enqueueButton}</button>
                <button id="qDequeueBtn" class="btn btn-primary btn-lg">${L.dequeueButton}</button>
              `}
            </div>
          `}
        </div>
      </div>

      <div id="qManualInfoDock" class="manual-step-dock hidden">
        <div class="manual-step-shell">
          <button type="button" id="qManualInfoTab" class="manual-step-tab">
            <i class="fas fa-angle-double-left"></i>
          </button>

          <div class="manual-step-panel">
            <div class="manual-step-panel-scroll">
              <div class="info-panel-title" id="qManualInfoTitle"></div>
              <div class="info-step-detail" id="qManualInfoDetail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  qBindMainControls();
  qSetMainButtonsEnabled(!qBusy);
  qRenderManualInfoPanel();
}

function qRenderSpecialCasesUI(executionMode = (qScExecutionMode || 'auto')){
  const L = qLang();
  const scenario = qScGetScenarioDef();

  document.getElementById('dynamicContent').innerHTML = `
    <div class="run-panel">
      <div class="run-row syntax-layout q2s-sc-layout" id="mainContainer">
        <div class="run-visual-block">
          <div class="queueStacksWrap">
            <div class="queueStackBlock">
              <div class="queueStackLabel" id="qOutLabel">${L.queueStackOutLabel}</div>
              <div class="queueStackContainer">
                <div id="qOutView" class="stack-view">
                  ${qBuildStackItemsHtml(qOut)}
                </div>
              </div>
            </div>

            <div class="queueStackBlock">
              <div class="queueStackLabel" id="qInLabel">${L.queueStackInLabel}</div>
              <div class="queueStackContainer">
                <div id="qInView" class="stack-view">
                  ${qBuildStackItemsHtml(qIn)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="run-side-controls">
          ${typesParamsBuildOperationPreviewHtml('q')}
          <div class="operation-count" id="qOperationCountDisplay">${L.operationCount}: ${qGetOperationCount()}</div>
          <div class="step-count" id="qStepCountDisplay">${L.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">${L.potential}: <span class="potentialValue">${qPotential}</span></div>

          ${executionMode === 'auto' ? `
            <div class="sc-player-row">
              <button id="qScStartBtn" class="syntax-nav-btn" title="${L.scGoStartTitle || 'Go to the first executed step'}">
                <i class="fas fa-step-backward"></i>
              </button>

              <button id="qScPrevBtn" class="sc-step-btn" title="${L.scStepBackTitle || 'Go one step back'}">-1</button>

              <button id="qScPlayPauseBtn" class="syntax-nav-btn" title="${L.scPauseTitle || 'Pause'}">
                <i class="fas fa-pause"></i>
              </button>

              <button id="qScNextStepBtn" class="sc-step-btn" title="${L.scStepForwardTitle || 'Go one step forward'}">+1</button>

              <button id="qScEndJumpBtn" class="syntax-nav-btn" title="${L.scGoEndTitle || 'Jump to the final step'}">
                <i class="fas fa-step-forward"></i>
              </button>
            </div>

            <div class="sc-history-tools hidden" id="qScFinishTools">
              <button id="qScEndBtn" class="btn btn-primary btn-lg">${L.endButton || 'End'}</button>
              <button id="qScHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          ` : `
            <button id="qScNextBtn" class="btn btn-primary btn-lg">${L.nextButton}</button>

            <div class="sc-history-tools hidden" id="qScFinishTools">
              <button id="qScHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          `}
        </div>

        <div class="run-side-info">
          <div class="syntax-detailed-info" id="qScPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="qScPanelTitle">${scenario.title}</div>
              <div class="info-panel-desc" id="qScPanelDesc"></div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="qScCurrentStepInfo"></div>
              <div class="info-step-detail" id="qScDetailedStepInfo"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  qBindSpecialCasesControls(executionMode);
  qScRenderInfo();
}

function qScRenderInfo(){
  const L = qLang();
  const titleEl = document.getElementById('qScPanelTitle');
  const descEl = document.getElementById('qScPanelDesc');
  const stepEl = document.getElementById('qScCurrentStepInfo');
  const detailEl = document.getElementById('qScDetailedStepInfo');

  if(!titleEl || !descEl || !stepEl || !detailEl)
    return;

  const isBusy = !!qBusy;
  const scenario = qScGetScenarioDef();
  titleEl.textContent = scenario.title;

  const Lall = trCommon();
  const scDesc = scenario.description || '';
  const modeDesc = (qScExecutionMode === 'auto') ? (Lall.scAutoPanelDesc || '') : (Lall.scManualPanelDesc || '');
  descEl.innerHTML = scDesc + ((scDesc && modeDesc) ? `<div class="info-panel-sep"></div>` : '') + modeDesc;

  const total = Array.isArray(qScSteps) ? qScSteps.length : 0;
  if(total === 0){
    stepEl.textContent = '';
    detailEl.innerHTML = L.detailNotProvided || '';

    return;
  }

  let stepTitle = '';
  let detailHtml = '';

  if(qScHistory.length === 0){
    const previewStep = qScBuildPreviewStep(qScSteps[0]);

    if(previewStep){
      stepTitle = `1/${total}: ${previewStep.description}`;
      detailHtml = previewStep.detail;
    }
    else
      detailHtml = L.detailNotProvided || '';
  }
  else{
    const cursor = (qScHistoryCursor >= 0) ? qScHistoryCursor : (qScHistory.length - 1);
    const entry = qScHistory[cursor];

    stepTitle = entry.title;
    detailHtml = entry.detailHtml;

    if(qScFinished && cursor === qScHistory.length - 1)
      detailHtml += `<div class="info-panel-sep"></div><div><strong>${L.scExecutionFinished || 'Execution has finished. You can open the history below or end this mode.'}</strong></div>`;
  }

  stepEl.textContent = stepTitle;
  detailEl.innerHTML = detailHtml;
  scrollBoxToTop(detailEl.closest('.syntax-detailed-scroll'));

  const viewingFinal = qScFinished && qScHistoryCursor === qScHistory.length - 1;
  const finishTools = document.getElementById('qScFinishTools');
  if(finishTools)
    finishTools.classList.toggle('hidden', !viewingFinal);

  const nextBtn = document.getElementById('qScNextBtn');
  if(nextBtn)
    nextBtn.textContent = qScFinished ? (L.endButton || 'End') : (L.nextButton || 'Next');

  const endBtn = document.getElementById('qScEndBtn');
  if(endBtn)
    endBtn.textContent = L.endButton || 'End';

  const startBtn = document.getElementById('qScStartBtn');
  const prevBtn = document.getElementById('qScPrevBtn');
  const playPauseBtn = document.getElementById('qScPlayPauseBtn');
  const nextStepBtn = document.getElementById('qScNextStepBtn');
  const endJumpBtn = document.getElementById('qScEndJumpBtn');
  const historyBtn = document.getElementById('qScHistoryBtn');
  const isAutoMode = qScExecutionMode === 'auto';

  if(startBtn)
    startBtn.disabled = false;
  if(prevBtn){
    prevBtn.title = L.scStepBackTitle || 'Go one step back';
    prevBtn.disabled = qScHistory.length === 0 || qScHistoryCursor < 0;
  }
  if(playPauseBtn){
    playPauseBtn.title = qScPaused ? (L.scPlayTitle || 'Play') : (L.scPauseTitle || 'Pause');
    playPauseBtn.innerHTML = qScPaused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    playPauseBtn.disabled = viewingFinal;
  }
  if(nextStepBtn){
    nextStepBtn.title = L.scStepForwardTitle || 'Go one step forward';
    nextStepBtn.disabled = qScFinished && qScHistoryCursor >= qScHistory.length - 1;
  }
  if(endJumpBtn){
    endJumpBtn.title = L.scGoEndTitle || 'Jump to the final step';
    endJumpBtn.disabled = false;
  }
  if(historyBtn)
    historyBtn.title = L.syntaxHistoryButtonTitle || 'Open history';
  if(nextBtn)
    nextBtn.disabled = isBusy;

  qScRenderPreview(false);
}

function displayQueue2Stacks(){
  if(qIsSpecialCasesMode)
    qRenderSpecialCasesUI();
  else
    qRenderMainUI();
}

function displayQueue2StacksSyntaxUI(){
  const L = qLang();
  const title = L.queueSynPanelTitle || 'SYNTAX MODE';
  const desc = L.queueSynPanelDesc || '';

  document.getElementById('dynamicContent').innerHTML = `
    <div class="run-panel">
      <div class="run-row syntax-layout q2s-syntax-layout" id="mainContainer">

        <div class="run-visual-block">
          <div class="queueStacksWrap">
            <div class="queueStackBlock">
              <div class="queueStackLabel" id="qOutLabel">${L.queueStackOutLabel}</div>
              <div class="queueStackContainer">
                <div id="qOutView" class="stack-view">
                  ${qBuildStackItemsHtml(qOut)}
                </div>
              </div>
            </div>

            <div class="queueStackBlock">
              <div class="queueStackLabel" id="qInLabel">${L.queueStackInLabel}</div>
              <div class="queueStackContainer">
                <div id="qInView" class="stack-view">
                  ${qBuildStackItemsHtml(qIn)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="run-side-controls">
          ${typesParamsBuildOperationPreviewHtml('q')}
          <div class="operation-count" id="qOperationCountDisplay">${L.operationCount}: ${qGetOperationCount()}</div>
          <div class="step-count" id="qStepCountDisplay">${L.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">${L.potential}: <span class="potentialValue">${qPotential}</span></div>

          <button class="btn btn-primary btn-lg" id="syntaxNextBtn">${L.nextButton}</button>

          <div id="qSynFinishTools" class="syntax-finish-tools hidden">
            <div class="syntax-nav-row">
              <button id="qSynPrevBtn" class="syntax-nav-btn" title="${L.syntaxPrevStepTitle || 'Previous step'}">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button id="qSynForwardBtn" class="syntax-nav-btn" title="${L.syntaxNextStepTitle || 'Next step'}">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>

            <button id="qSynHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
              <i class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>

        <div class="run-side-info">
          <div class="syntax-detailed-info" id="qSynPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title">${title}</div>
              <div class="info-panel-desc">${desc}</div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="qSyntaxCurrentStepInfo"></div>
              <div class="info-step-detail" id="qSyntaxDetailedStepInfo"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  qBindSyntaxControls();
  qSynUpdateFinishUI();

  if(qIsSyntaxMode && qSyntaxSteps.length > 0)
    qSynRenderInfo();
}

function qSynUpdateFinishUI(){
  const wrap = document.getElementById('qSynFinishTools');
  const prevBtn = document.getElementById('qSynPrevBtn');
  const forwardBtn = document.getElementById('qSynForwardBtn');

  if(!wrap || !prevBtn || !forwardBtn)
    return;

  if(!qSynFinished){
    wrap.classList.add('hidden');
    return;
  }

  wrap.classList.remove('hidden');
  prevBtn.disabled = !!qBusy || qSynHistoryCursor <= 0;
  forwardBtn.disabled = !!qBusy || qSynHistoryCursor >= qSyntaxSteps.length - 1;
}

function qSynRenderInfo(){
  const L = qLang();
  const panelTitle = document.querySelector('#qSynPanel .info-panel-title');
  const panelDesc = document.querySelector('#qSynPanel .info-panel-desc');
  const currentStepInfo = document.getElementById('qSyntaxCurrentStepInfo');
  const detailInfo = document.getElementById('qSyntaxDetailedStepInfo');
  const nextButton = document.getElementById('syntaxNextBtn');

  if(!panelTitle || !panelDesc || !currentStepInfo || !detailInfo || !nextButton)
    return;

  panelTitle.textContent = L.queueSynPanelTitle || 'SYNTAX MODE';
  if(qSynFinished && qSynHistory.length > 0){
    const entry = qSynHistory[qSynHistoryCursor];

    panelDesc.innerHTML = (L.queueSynPanelDesc || '') + `<div class="info-panel-sep"></div><div><strong>${L.syntaxExecutionFinished || 'Execution has finished. You can browse the executed steps below or end this mode.'}</strong></div>`;
    currentStepInfo.textContent = entry.title;
    detailInfo.innerHTML = entry.detailHtml;
    scrollBoxToTop(detailInfo.closest('.syntax-detailed-scroll'));
    nextButton.textContent = L.endButton || 'End';
    nextButton.disabled = !!qBusy;

    if(qSynPreviewVisible)
      qSynRenderPreview(false);
    else
      typesParamsSetOperationPreviewVisible('q', false);

    qSynUpdateFinishUI();
    return;
  }

  panelDesc.innerHTML = L.queueSynPanelDesc || '';
  
  if(!Array.isArray(qSyntaxSteps) || qSyntaxSteps.length === 0){
    currentStepInfo.textContent = '';
    detailInfo.innerHTML = L.detailNotProvided || '';
    nextButton.textContent = L.nextButton || 'Next';
    
    return;
  }

  const total = qSyntaxSteps.length;
  const step = qSyntaxSteps[qSyntaxIndex];

  if(qBusy){
    const pending = qGetSyntaxPendingPreview(L);

    if(pending){
      currentStepInfo.textContent = pending.title;
      detailInfo.innerHTML = pending.detailHtml;
    }
    else{
      currentStepInfo.textContent = '';
      detailInfo.innerHTML = L.detailNotProvided || '';
    }

    scrollBoxToTop(detailInfo.closest('.syntax-detailed-scroll'));
    nextButton.textContent = L.nextButton || 'Next';
    nextButton.disabled = true;

    qSynUpdateFinishUI();
    qSynRenderPreview(false);
    
    return;
  }

  currentStepInfo.innerHTML = `${qSyntaxIndex + 1}/${total}: ${step.description}`;

  let detailHtml = step.detail || L.detailNotProvided;
  detailInfo.innerHTML = detailHtml;
  scrollBoxToTop(detailInfo.closest('.syntax-detailed-scroll'));

  nextButton.textContent = L.nextButton || 'Next';
  nextButton.disabled = !!qBusy;
  
  qSynUpdateFinishUI();
  qSynRenderPreview(false);
}