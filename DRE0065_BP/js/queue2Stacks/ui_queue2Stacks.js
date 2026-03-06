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

function qTopEl(viewId){
  const view = document.getElementById(viewId);
  if(!view)
    return null;

  const items = view.querySelectorAll('.stack-item');
  return items.length ? items[items.length - 1] : null;
}

function qAnimatePop(viewId, onDone){
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
            <div class="queueStackLabel">${L.queueStackOutLabel}</div>
            <div class="queueStackContainer">
              <div id="qOutView" class="stack-view">
                ${qOut.map(v => `<div class="stack-item">${v}</div>`).join('')}
              </div>
            </div>
          </div>

          <div class="queueStackBlock">
            <div class="queueStackLabel">${L.queueStackInLabel}</div>
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

          ${qIsBestWorstMode ? `` : `
            <div id="queue2Stacks_buttons">
              <button id="qEnqueueBtn" class="btn btn-primary btn-lg" onclick="enqueueQueue2Stacks()">${L.enqueueButton}</button>
              <button id="qDequeueBtn" class="btn btn-primary btn-lg" onclick="qDequeueAction()">${L.dequeueButton}</button>
            </div>
          `}
        </div>

        ${qShowInfoPanel ? `
          <div class="syntax-detailed-info ${qIsBestWorstMode ? 'align-bottom' : ''}">
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
        ` : ``}

      </div>
    </div>
  `;

  qRefreshInfo();
}

function displayQueue2Stacks(){
  qRenderMainUI();
}

function qRenderSyntaxUI(){
  const L = qLang();
  const title = L.queueSynPanelTitle || 'SYNTAX MODE';
  const desc = L.queueSynPanelDesc || '';

  document.getElementById('dynamicContent').innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">

        <div class="queueStacksWrap">
          <div class="queueStackBlock">
            <div class="queueStackLabel">${L.queueStackOutLabel}</div>
            <div class="queueStackContainer">
              <div id="qOutView" class="stack-view">
                ${qOut.map(v => `<div class="stack-item">${v}</div>`).join('')}
              </div>
            </div>
          </div>

          <div class="queueStackBlock">
            <div class="queueStackLabel">${L.queueStackInLabel}</div>
            <div class="queueStackContainer">
              <div id="qInView" class="stack-view">
                ${qIn.map(v => `<div class="stack-item">${v}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="stack-controls controls-bottom">
          <div class="step-count" id="qStepCountDisplay">${L.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">
            ${L.potential}: <span class="potentialValue">${qPotential}</span>
          </div>

          <div class="syntax-detailed-info" id="qSynPanel">
            <div class="info-panel-title">${title}</div>
            <div class="info-panel-desc">${desc}</div>
            <div class="info-panel-sep"></div>
            <div class="info-step-title" id="qSyntaxCurrentStepInfo"></div>
            <div class="info-step-detail" id="qSyntaxDetailedStepInfo"></div>
          </div>

          <button class="btn btn-primary btn-lg" id="syntaxNextBtn">${L.nextButton}</button>
        </div>
      </div>
    </div>
  `;

  const btn = document.getElementById('syntaxNextBtn');
  if(btn)
    btn.addEventListener('click', nextQueue2StacksSyntaxStep);

  if(qIsSyntaxMode && qSyntaxSteps.length > 0)
    updateQueueSyntaxPanels(qSyntaxIndex);
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
}

function updateQueueCounters(){
  qUpdateCounters();
}

function qUpdateSyntaxPanels(index){
  const L = qLang();
  const step = qSyntaxSteps[index];
  const total = qSyntaxSteps.length;

  const a = document.getElementById('qSyntaxCurrentStepInfo');
  const b = document.getElementById('qSyntaxDetailedStepInfo');

  if(a)
    a.innerHTML = `${index + 1}/${total}: ${step.description}`;

  if(b){
    let html = step.detail || L.detailNotProvided;

    if(index < total - 1){
      const next = qSyntaxSteps[index + 1];
      html += `<div class="info-panel-sep"></div>
               <div><strong>Next:</strong> ${index + 2}/${total}: ${next.description}</div>`;
    }

    b.innerHTML = html;
  }
}

function updateQueueSyntaxPanels(index){
  qUpdateSyntaxPanels(index);
}