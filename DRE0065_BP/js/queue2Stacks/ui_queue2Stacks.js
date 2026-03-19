function qSetInfoKeys(titleKey, detailKey, fallbackKey, params = {}){
  if(!qShowInfoPanel)
    return;

  const L = qLang();

  const titleTpl = L[titleKey] ?? (fallbackKey ? L[fallbackKey] : '') ?? '';
  const detailTpl = L[detailKey] ?? '';
  const title = qFmt(titleTpl, params);
  const detail = qFmt(detailTpl, params);
  const titleEl = document.getElementById('qCurrentStepInfo');
  const detailEl = document.getElementById('qDetailedStepInfo');

  if(titleEl)
    titleEl.innerHTML = title;
  if(detailEl)
    detailEl.innerHTML = detail;

  qLastInfo = {titleKey, detailKey, fallbackKey, params};
}

function setQInfoKeys(titleKey, detailKey, fallbackKey, params = {}){
  qSetInfoKeys(titleKey, detailKey, fallbackKey, params);
}

function qClearInfo(){
  const a = document.getElementById('qCurrentStepInfo');
  const b = document.getElementById('qDetailedStepInfo');

  if(a)
    a.innerHTML = '';
  if(b)
    b.innerHTML = '';

  qLastInfo = null;
}

function clearQInfo(){
  qClearInfo();
}

function qRefreshInfo(){
  if(qLastInfo)
    qSetInfoKeys(qLastInfo.titleKey, qLastInfo.detailKey, qLastInfo.fallbackKey, qLastInfo.params);
}

function refreshQInfo(){
  qRefreshInfo();
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

  titleEl.textContent = qManualHistoryTitle(qManualInfoIndex, step, L);
  detailEl.innerHTML = qBuildSyntaxDetail(step, L);
}

function qTopEl(viewId){
  const view = document.getElementById(viewId);
  if(!view)
    return null;

  const items = view.querySelectorAll('.stack-item');
  return items.length ? items[items.length - 1] : null;
}

function qAnimatePop(viewId, onDone){
  if(qSkipAnimations){
    if(onDone)
      onDone();

    return;
  }

  const el = qTopEl(viewId);
  if(!el){
    if(onDone)
      onDone();

    return;
  }

  el.classList.add('removed-item');
  el.addEventListener('animationend', () => {
    if(onDone) 
      onDone();
  }, {once:true});
}

function animatePop(viewId, onDone){
  qAnimatePop(viewId, onDone);
}

function qAnimatePush(viewId){
  if(qSkipAnimations)
    return;

  const el = qTopEl(viewId);
  if(el) 
    el.classList.add('new-item');
}

function animatePush(viewId){
  qAnimatePush(viewId);
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
                ${qOut.map(v => `<div class="stack-item">${v}</div>`).join('')}
              </div>
            </div>
          </div>

          <div class="queueStackBlock">
            <div class="queueStackLabel" id="qInLabel">${L.queueStackInLabel}</div>
            <div class="queueStackContainer">
              <div id="qInView" class="stack-view">
                ${qIn.map(v => `<div class="stack-item">${v}</div>`).join('')}
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

          ${qIsBestWorstMode ? `` : `
            <div id="queue2Stacks_buttons">
              <button id="qEnqueueBtn" class="btn btn-primary btn-lg" onclick="enqueueQueue2Stacks()">${L.enqueueButton}</button>
              <button id="qDequeueBtn" class="btn btn-primary btn-lg" onclick="qDequeueManualWithHistory()">${L.dequeueButton}</button>
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
              ` : ``}

              <div class="info-step-title" id="qCurrentStepInfo"></div>
              <div class="info-step-detail" id="qDetailedStepInfo"></div>
            </div>
          </div>
        ` : ``}

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

  const historyBtn = document.getElementById('qManualHistoryBtn');
  if(historyBtn)
    historyBtn.onclick = qManualOpenHistoryModal;

  const infoTab = document.getElementById('qManualInfoTab');
  if(infoTab)
    infoTab.onclick = qToggleManualInfoPanel;

  qRenderManualInfoPanel();
  qRefreshInfo();
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
                  ${qOut.map(v => `<div class="stack-item">${v}</div>`).join('')}
                </div>
              </div>
            </div>

            <div class="queueStackBlock">
              <div class="queueStackLabel" id="qInLabel">${L.queueStackInLabel}</div>
              <div class="queueStackContainer">
                <div id="qInView" class="stack-view">
                  ${qIn.map(v => `<div class="stack-item">${v}</div>`).join('')}
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

  if(executionMode === 'auto'){
    const startBtn = document.getElementById('qBwStartBtn');
    const prevBtn = document.getElementById('qBwPrevBtn');
    const playPauseBtn = document.getElementById('qBwPlayPauseBtn');
    const nextStepBtn = document.getElementById('qBwNextStepBtn');
    const endJumpBtn = document.getElementById('qBwEndJumpBtn');
    const endBtn = document.getElementById('qBwEndBtn');

    if(startBtn)
      startBtn.onclick = qBwJumpToStart;
    if(prevBtn)
      prevBtn.onclick = () => qBwGoDelta(-1);
    if(playPauseBtn)
      playPauseBtn.onclick = qBwTogglePlayPause;
    if(nextStepBtn)
      nextStepBtn.onclick = () => qBwGoDelta(1);
    if(endJumpBtn)
      endJumpBtn.onclick = qBwJumpToEnd;
    if(endBtn)
      endBtn.onclick = () => {
        resetQueue2StacksState();
        returnToMainPageFromSyntax('queue2Stacks');
      };
  }
  else{
    const nextBtn = document.getElementById('qBwNextBtn');
    const endBtn = document.getElementById('qBwEndBtn');

    if(nextBtn)
      nextBtn.onclick = qBwNextOrEnd;
    if(endBtn)
      endBtn.onclick = () => {
        resetQueue2StacksState();
        returnToMainPageFromSyntax('queue2Stacks');
      };
  }

  const historyBtn = document.getElementById('qBwHistoryBtn');
  if(historyBtn)
    historyBtn.onclick = qBwOpenHistoryModal;

  qRefreshInfo();
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
  const synDesc = L.queueSynPanelDesc || '';
  descEl.innerHTML = bwDesc + ((bwDesc && synDesc) ? `<div class="info-panel-sep"></div>` : ``) + synDesc;

  const total = Array.isArray(qBwSteps) ? qBwSteps.length : 0;
  if(total === 0){
    stepEl.textContent = '';
    detailEl.innerHTML = L.detailNotProvided || '';
    return;
  }

  let stepTitle = '';
  let html = '';

  if(qBwHistory.length === 0){
    const next = qBwSteps[0];
    html = `<div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> 1/${total}: ${next.description}</div>`;
  }
  else{
    const cursor = (qBwHistoryCursor >= 0) ? qBwHistoryCursor : (qBwHistory.length - 1);
    const entry = qBwHistory[cursor];
    stepTitle = entry.title;
    html = entry.detailHtml;

    if(!qBwFinished && cursor === qBwHistory.length - 1 && qBwCursor < total){
      const next = qBwSteps[qBwCursor];
      html += `<div class="info-panel-sep"></div><div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${qBwCursor + 1}/${total}: ${next.description}</div>`;
    }

    if(qBwFinished && cursor === qBwHistory.length - 1)
      html += `<div class="info-panel-sep"></div><div><strong>${L.bwExecutionFinished || 'Execution has finished. You can open the history below or end this mode.'}</strong></div>`;
  }

  stepEl.textContent = stepTitle;
  detailEl.innerHTML = html;

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
    const playPauseDisabled = viewingFinal;

    playPauseBtn.title = qBwPaused ? (L.bwPlayTitle || 'Play') : (L.bwPauseTitle || 'Pause');
    playPauseBtn.innerHTML = qBwPaused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    playPauseBtn.disabled = playPauseDisabled;
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

function qRenderSyntaxUI(){
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
                  ${qOut.map(v => `<div class="stack-item">${v}</div>`).join('')}
                </div>
              </div>
            </div>

            <div class="queueStackBlock">
              <div class="queueStackLabel" id="qInLabel">${L.queueStackInLabel}</div>
              <div class="queueStackContainer">
                <div id="qInView" class="stack-view">
                  ${qIn.map(v => `<div class="stack-item">${v}</div>`).join('')}
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

  const btn = document.getElementById('syntaxNextBtn');
  if(btn)
    btn.addEventListener('click', nextQueue2StacksSyntaxStep);

  if(qIsSyntaxMode && qSyntaxSteps.length > 0)
    updateQueueSyntaxPanels();

  const prevBtn = document.getElementById('qSynPrevBtn');
  const forwardBtn = document.getElementById('qSynForwardBtn');
  const historyBtn = document.getElementById('qSynHistoryBtn');

  if(prevBtn)
    prevBtn.onclick = () => qSynGoHistory(-1);
  if(forwardBtn)
    forwardBtn.onclick = () => qSynGoHistory(1);
  if(historyBtn)
    historyBtn.onclick = qSynOpenHistoryModal;

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
  const t0 = document.querySelector('#qSynPanel .info-panel-title');
  const d0 = document.querySelector('#qSynPanel .info-panel-desc');
  const t1 = document.getElementById('qSyntaxCurrentStepInfo');
  const d1 = document.getElementById('qSyntaxDetailedStepInfo');
  const btn = document.getElementById('syntaxNextBtn');

  if(!t0 || !d0 || !t1 || !d1 || !btn)
    return;

  t0.textContent = L.queueSynPanelTitle || 'SYNTAX MODE';
  if(qSynFinished && qSynHistory.length > 0){
    const entry = qSynHistory[qSynHistoryCursor];

    d0.innerHTML = (L.queueSynPanelDesc || '') + `<div class="info-panel-sep"></div><div><strong>${L.syntaxExecutionFinished || 'Execution has finished. You can browse the executed steps below or end this mode.'}</strong></div>`;
    t1.textContent = entry.title;
    d1.innerHTML = entry.detailHtml;
    btn.textContent = L.endButton || 'End';
    btn.disabled = false;

    qSynUpdateFinishUI();
    return;
  }

  d0.innerHTML = L.queueSynPanelDesc || '';
  if(!Array.isArray(qSyntaxSteps) || qSyntaxSteps.length === 0){
    t1.textContent = '';
    d1.innerHTML = L.detailNotProvided || '';
    btn.textContent = L.nextButton || 'Next';
    return;
  }

  const total = qSyntaxSteps.length;
  const step = qSyntaxSteps[qSyntaxIndex];

  if(qBusy && qSyntaxIndex > 0 && (!step.detail || step.actualCost === undefined)){
    const prev = qSyntaxSteps[qSyntaxIndex - 1];

    t1.innerHTML = `${qSyntaxIndex}/${total}: ${prev.description}`;
    d1.innerHTML = prev.detail || L.detailNotProvided;
    btn.textContent = L.nextButton || 'Next';
    btn.disabled = true;

    qSynUpdateFinishUI();
    return;
  }

  t1.innerHTML = `${qSyntaxIndex + 1}/${total}: ${step.description}`;
  let html = step.detail || L.detailNotProvided;

  if(qSyntaxIndex < total - 1){
    const next = qSyntaxSteps[qSyntaxIndex + 1];
    html += `<div class="info-panel-sep"></div><div><strong>${L.nextLabel || L.nextButton || 'Next'}:</strong> ${qSyntaxIndex + 2}/${total}: ${next.description}</div>`;
  }

  d1.innerHTML = html;
  btn.textContent = L.nextButton || 'Next';
  btn.disabled = !!qBusy;

  qSynUpdateFinishUI();
}

function displayQueue2StacksSyntaxUI(){
  qRenderSyntaxUI();
}

function qRenderStacks(){
  const inView = document.getElementById('qInView');
  const outView = document.getElementById('qOutView');

  if(inView)
    inView.innerHTML = qIn.map(v => `<div class="stack-item">${v}</div>`).join('');
  if(outView)
    outView.innerHTML = qOut.map(v => `<div class="stack-item">${v}</div>`).join('');
}

function renderQueueStacks(){
  qRenderStacks();
}

function qUpdateCounters(){
  const L = qLang();
  const sc = document.getElementById('qStepCountDisplay');
  const pot = document.getElementById('qPotentialDisplay');

  if(sc)
    sc.innerText = `${L.stepCount}: ${qStepCount}`;
  if(pot)
    pot.innerHTML = `${L.potential}: <span class="potentialValue">${qPotential}</span>`;

  const outLbl = document.getElementById('qOutLabel');
  const inLbl = document.getElementById('qInLabel');

  if(outLbl)
    outLbl.textContent = L.queueStackOutLabel;
  if(inLbl)
    inLbl.textContent = L.queueStackInLabel;
}

function updateQueueCounters(){
  qUpdateCounters();
}

function qUpdateSyntaxPanels(){
  qSynRenderInfo();
}

function updateQueueSyntaxPanels(){
  qUpdateSyntaxPanels();
}