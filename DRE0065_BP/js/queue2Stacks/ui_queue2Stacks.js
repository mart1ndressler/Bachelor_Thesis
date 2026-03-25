function qUpdateInfoPanel(titleKey, detailKey, fallbackKey, params = {}){
  if(!qShowInfoPanel)
    return;

  const L = qLang();
  const titleTpl = L[titleKey] ?? (fallbackKey ? L[fallbackKey] : '') ?? '';
  const detailTpl = L[detailKey] ?? '';

  const titleEl = document.getElementById('qCurrentStepInfo');
  const detailEl = document.getElementById('qDetailedStepInfo');

  if(titleEl)
    titleEl.innerHTML = qFmt(titleTpl, params);
  if(detailEl)
    detailEl.innerHTML = qFmt(detailTpl, params);

  qLastInfo = {titleKey, detailKey, fallbackKey, params};
}

function clearQInfo(){
  const titleEl = document.getElementById('qCurrentStepInfo');
  const detailEl = document.getElementById('qDetailedStepInfo');

  if(titleEl)
    titleEl.innerHTML = '';
  if(detailEl)
    detailEl.innerHTML = '';

  qLastInfo = null;
}

function refreshQInfo(){
  if(!qLastInfo)
    return;

  qUpdateInfoPanel(qLastInfo.titleKey, qLastInfo.detailKey, qLastInfo.fallbackKey, qLastInfo.params);
}

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

function qAnimateAddTopItem(viewId){
  if(qSkipAnimations)
    return;

  const element = qGetTopItemElement(viewId);
  if(element)
    element.classList.add('new-item');
}

function qBuildStackItemsHtml(values){
  return values.map(value => `<div class="stack-item">${value}</div>`).join('');
}

function qBindClick(id, handler){
  const element = document.getElementById(id);
  if(element)
    element.onclick = handler;
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

  const stepCountDisplay = document.getElementById('qStepCountDisplay');
  const potentialDisplay = document.getElementById('qPotentialDisplay');

  if(stepCountDisplay)
    stepCountDisplay.innerText = `${L.stepCount}: ${qStepCount}`;
  if(potentialDisplay)
    potentialDisplay.innerHTML = `${L.potential}: <span class="potentialValue">${qPotential}</span>`;

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
  qBindClick('qEnqueueBtn', qPromptForEnqueueAction);
  qBindClick('qDequeueBtn', qHandleDequeueAction);
  qBindClick('qManualHistoryBtn', qManualOpenHistoryModal);
  qBindClick('qManualInfoTab', qToggleManualInfoPanel);
}

function qBindBestWorstAutoControls(){
  qBindClick('qBwStartBtn', qBwJumpToStart);
  qBindClick('qBwPrevBtn', () => qBwGoDelta(-1));
  qBindClick('qBwPlayPauseBtn', qBwTogglePlayPause);
  qBindClick('qBwNextStepBtn', () => qBwGoDelta(1));
  qBindClick('qBwEndJumpBtn', qBwJumpToEnd);
  qBindClick('qBwEndBtn', () => {
    qResetState();
    returnToMainPageFromSyntax('queue2Stacks');
  });
}

function qBindBestWorstManualControls(){
  qBindClick('qBwNextBtn', qBwNextOrEnd);
  qBindClick('qBwEndBtn', () => {
    qResetState();
    returnToMainPageFromSyntax('queue2Stacks');
  });
}

function qBindBestWorstControls(executionMode){
  if(executionMode === 'auto')
    qBindBestWorstAutoControls();
  else
    qBindBestWorstManualControls();

  qBindClick('qBwHistoryBtn', qBwOpenHistoryModal);
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
          <div class="step-count" id="qStepCountDisplay">${L.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">${L.potential}: <span class="potentialValue">${qPotential}</span></div>

          <button id="qManualHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
            <i class="fas fa-info-circle"></i>
          </button>

          ${qIsBestWorstMode ? '' : `
            <div id="queue2Stacks_buttons">
              <button id="qEnqueueBtn" class="btn btn-primary btn-lg">${L.enqueueButton}</button>
              <button id="qDequeueBtn" class="btn btn-primary btn-lg">${L.dequeueButton}</button>
            </div>
          `}
        </div>

        ${qShowInfoPanel ? `
          <div class="syntax-detailed-info ${qIsBestWorstMode ? 'align-bottom' : ''}">
            <div class="syntax-detailed-scroll">
              ${qIsBestWorstMode ? `
                <div class="info-panel-title">${qBestWorstMode === 'best' ? L.bestCase : L.worstCase}</div>
                <div class="info-panel-desc">
                  ${qBestWorstMode === 'best' ? (L.queueBestCaseDescription || L.queueInfoBest) : (L.queueWorstCaseDescription || L.queueInfoWorst)}
                </div>
                <div class="info-panel-sep"></div>
              ` : ''}

              <div class="info-step-title" id="qCurrentStepInfo"></div>
              <div class="info-step-detail" id="qDetailedStepInfo"></div>
            </div>
          </div>
        ` : ''}

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
  qRenderManualInfoPanel();
  refreshQInfo();
}

function qRenderBestWorstUI(executionMode = (qBwExecutionMode || 'auto')){
  const L = qLang();

  document.getElementById('dynamicContent').innerHTML = `
    <div class="run-panel">
      <div class="run-row syntax-layout q2s-bw-layout" id="mainContainer">
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
          <div class="step-count" id="qStepCountDisplay">${L.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">${L.potential}: <span class="potentialValue">${qPotential}</span></div>

          ${executionMode === 'auto' ? `
            <div class="bw-player-row">
              <button id="qBwStartBtn" class="syntax-nav-btn" title="${L.bwGoStartTitle || 'Go to the first executed step'}">
                <i class="fas fa-step-backward"></i>
              </button>

              <button id="qBwPrevBtn" class="bw-step-btn" title="${L.bwStepBackTitle || 'Go one step back'}">-1</button>

              <button id="qBwPlayPauseBtn" class="syntax-nav-btn" title="${L.bwPauseTitle || 'Pause'}">
                <i class="fas fa-pause"></i>
              </button>

              <button id="qBwNextStepBtn" class="bw-step-btn" title="${L.bwStepForwardTitle || 'Go one step forward'}">+1</button>

              <button id="qBwEndJumpBtn" class="syntax-nav-btn" title="${L.bwGoEndTitle || 'Jump to the final step'}">
                <i class="fas fa-step-forward"></i>
              </button>
            </div>

            <div class="bw-history-tools hidden" id="qBwFinishTools">
              <button id="qBwEndBtn" class="btn btn-primary btn-lg">${L.endButton || 'End'}</button>
              <button id="qBwHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          ` : `
            <button id="qBwNextBtn" class="btn btn-primary btn-lg">${L.nextButton}</button>

            <div class="bw-history-tools hidden" id="qBwFinishTools">
              <button id="qBwHistoryBtn" class="syntax-history-btn" title="${L.syntaxHistoryButtonTitle || 'Open history'}">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          `}
        </div>

        <div class="run-side-info">
          <div class="syntax-detailed-info" id="qBwPanel">
            <div class="syntax-detailed-scroll">
              <div class="info-panel-title" id="qBwPanelTitle"></div>
              <div class="info-panel-desc" id="qBwPanelDesc"></div>
              <div class="info-panel-sep"></div>
              <div class="info-step-title" id="qBwCurrentStepInfo"></div>
              <div class="info-step-detail" id="qBwDetailedStepInfo"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  qBindBestWorstControls(executionMode);
  refreshQInfo();
  qBwRenderInfo();
}

function qBwRenderInfo(){
  const L = qLang();
  const titleEl = document.getElementById('qBwPanelTitle');
  const descEl = document.getElementById('qBwPanelDesc');
  const stepEl = document.getElementById('qBwCurrentStepInfo');
  const detailEl = document.getElementById('qBwDetailedStepInfo');

  if(!titleEl || !descEl || !stepEl || !detailEl)
    return;

  titleEl.textContent = (qBestWorstMode === 'best') ? L.bestCase : L.worstCase;

  const bwDesc = (qBestWorstMode === 'best') ? (L.queueBestCaseDescription || '') : (L.queueWorstCaseDescription || '');
  const syntaxDesc = L.queueSynPanelDesc || '';
  descEl.innerHTML = bwDesc + ((bwDesc && syntaxDesc) ? `<div class="info-panel-sep"></div>` : '') + syntaxDesc;

  const total = Array.isArray(qBwSteps) ? qBwSteps.length : 0;
  if(total === 0){
    stepEl.textContent = '';
    detailEl.innerHTML = L.detailNotProvided || '';

    return;
  }

  let stepTitle = '';
  let detailHtml = '';

  if(qBwHistory.length === 0){
    const nextStep = qBwSteps[0];
    detailHtml = `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> 1/${total}: ${nextStep.description}</div>`;
  }
  else{
    const cursor = (qBwHistoryCursor >= 0) ? qBwHistoryCursor : (qBwHistory.length - 1);
    const entry = qBwHistory[cursor];

    stepTitle = entry.title;
    detailHtml = entry.detailHtml;

    if(!qBwFinished && cursor === qBwHistory.length - 1 && qBwCursor < total){
      const nextStep = qBwSteps[qBwCursor];
      detailHtml += `<div class="info-panel-sep"></div><div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${qBwCursor + 1}/${total}: ${nextStep.description}</div>`;
    }

    if(qBwFinished && cursor === qBwHistory.length - 1)
      detailHtml += `<div class="info-panel-sep"></div><div><strong>${L.bwExecutionFinished || 'Execution has finished. You can open the history below or end this mode.'}</strong></div>`;
  }

  stepEl.textContent = stepTitle;
  detailEl.innerHTML = detailHtml;

  const viewingFinal = qBwFinished && qBwHistoryCursor === qBwHistory.length - 1;
  const finishTools = document.getElementById('qBwFinishTools');
  if(finishTools)
    finishTools.classList.toggle('hidden', !viewingFinal);

  const nextBtn = document.getElementById('qBwNextBtn');
  if(nextBtn)
    nextBtn.textContent = qBwFinished ? (L.endButton || 'End') : (L.nextButton || 'Next');

  const endBtn = document.getElementById('qBwEndBtn');
  if(endBtn)
    endBtn.textContent = L.endButton || 'End';

  const startBtn = document.getElementById('qBwStartBtn');
  const prevBtn = document.getElementById('qBwPrevBtn');
  const playPauseBtn = document.getElementById('qBwPlayPauseBtn');
  const nextStepBtn = document.getElementById('qBwNextStepBtn');
  const endJumpBtn = document.getElementById('qBwEndJumpBtn');
  const historyBtn = document.getElementById('qBwHistoryBtn');

  if(startBtn)
    startBtn.title = L.bwGoStartTitle || 'Go to the first executed step';
  if(prevBtn){
    prevBtn.title = L.bwStepBackTitle || 'Go one step back';
    prevBtn.disabled = qBwHistory.length === 0 || qBwHistoryCursor < 0;
  }
  if(playPauseBtn){
    playPauseBtn.title = qBwPaused ? (L.bwPlayTitle || 'Play') : (L.bwPauseTitle || 'Pause');
    playPauseBtn.innerHTML = qBwPaused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    playPauseBtn.disabled = viewingFinal;
  }
  if(nextStepBtn){
    nextStepBtn.title = L.bwStepForwardTitle || 'Go one step forward';
    nextStepBtn.disabled = qBwFinished && qBwHistoryCursor >= qBwHistory.length - 1;
  }
  if(endJumpBtn)
    endJumpBtn.title = L.bwGoEndTitle || 'Jump to the final step';
  if(historyBtn)
    historyBtn.title = L.syntaxHistoryButtonTitle || 'Open history';
}

function displayQueue2Stacks(){
  if(qIsBestWorstMode)
    qRenderBestWorstUI();
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
          <div class="step-count" id="qStepCountDisplay">${L.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">
            ${L.potential}: <span class="potentialValue">${qPotential}</span>
          </div>

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

  if(qIsSyntaxMode && qSyntaxSteps.length > 0)
    updateQueueSyntaxPanels();

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
  prevBtn.disabled = qSynHistoryCursor <= 0;
  forwardBtn.disabled = qSynHistoryCursor >= qSynHistory.length - 1;
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
    nextButton.textContent = L.endButton || 'End';
    nextButton.disabled = false;

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

  if(qBusy && qSyntaxIndex > 0 && (!step.detail || step.actualCost === undefined)){
    const previousStep = qSyntaxSteps[qSyntaxIndex - 1];

    currentStepInfo.innerHTML = `${qSyntaxIndex}/${total}: ${previousStep.description}`;
    detailInfo.innerHTML = previousStep.detail || L.detailNotProvided;
    nextButton.textContent = L.nextButton || 'Next';
    nextButton.disabled = true;

    qSynUpdateFinishUI();
    return;
  }

  currentStepInfo.innerHTML = `${qSyntaxIndex + 1}/${total}: ${step.description}`;

  let detailHtml = step.detail || L.detailNotProvided;
  if(qSyntaxIndex < total - 1){
    const nextStep = qSyntaxSteps[qSyntaxIndex + 1];
    detailHtml += `<div class="info-panel-sep"></div><div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${qSyntaxIndex + 2}/${total}: ${nextStep.description}</div>`;
  }

  detailInfo.innerHTML = detailHtml;
  nextButton.textContent = L.nextButton || 'Next';
  nextButton.disabled = !!qBusy;

  qSynUpdateFinishUI();
}

function updateQueueSyntaxPanels(){
  qSynRenderInfo();
}