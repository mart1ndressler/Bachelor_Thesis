function setQueueButtonsEnabled(enabled){
    const en = document.getElementById('qEnqueueBtn');
    const de = document.getElementById('qDequeueBtn');

    if(en) 
      en.disabled = !enabled;
    if(de) 
      de.disabled = !enabled;
}

function setQInfoKey(key, params = {}){
    if(!qShowInfoPanel)
      return;

    const langData = qGetLang();
    const titleTpl  = langData[`${key}Title`]  || langData[key] || '';
    const detailTpl = langData[`${key}Detail`] || '';
    const title  = qFmt(titleTpl, params);
    const detail = qFmt(detailTpl, params);
    const titleEl  = document.getElementById('qCurrentStepInfo');
    const detailEl = document.getElementById('qDetailedStepInfo');

    if(titleEl)
      titleEl.innerHTML = title;
    if(detailEl)
      detailEl.innerHTML = detail;
    qLastInfo = {key, params};
}

function clearQInfo(){
    const a = document.getElementById('qCurrentStepInfo');
    const b = document.getElementById('qDetailedStepInfo');

    if(a)
      a.innerHTML = '';
    if(b)
      b.innerHTML = '';
    qLastInfo = null;
}

function refreshQInfo(){
    if(qLastInfo) 
      setQInfoKey(qLastInfo.key, qLastInfo.params);
}

function qTopEl(viewId){
    const view = document.getElementById(viewId);
    if(!view) 
      return null;

    const items = view.querySelectorAll('.stack-item');
    return items.length ? items[items.length - 1] : null;
}

function animatePop(viewId, onDone){
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

function animatePush(viewId){
    const el = qTopEl(viewId);
    if(el) 
      el.classList.add('new-item');
}

function displayQueue2Stacks(){
  const langData = qGetLang();

  document.getElementById('dynamicContent').innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">

        <div class="queueStacksWrap">
          <div class="queueStackBlock">
            <div class="queueStackLabel">${langData.queueStackOutLabel}</div>
            <div class="queueStackContainer">
              <div id="qOutView" class="stack-view">
                ${qOut.map(v => `<div class="stack-item">${v}</div>`).join('')}
              </div>
            </div>
          </div>

          <div class="queueStackBlock">
            <div class="queueStackLabel">${langData.queueStackInLabel}</div>
            <div class="queueStackContainer">
              <div id="qInView" class="stack-view">
                ${qIn.map(v => `<div class="stack-item">${v}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="stack-controls">
          <div class="step-count" id="qStepCountDisplay">${langData.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">${langData.potential}: <span class="potentialValue">${qPotential}</span></div>

          ${qIsBestWorstMode ? `` : `
            <div id="queue2Stacks_buttons">
              <button id="qEnqueueBtn" class="btn btn-primary btn-lg" onclick="enqueueQueue2Stacks()">${langData.enqueueButton}</button>
              <button id="qDequeueBtn" class="btn btn-primary btn-lg" onclick="dequeueQueue2Stacks()">${langData.dequeueButton}</button>
            </div>
          `}
        </div>

        ${qShowInfoPanel ? `
            <div class="syntax-detailed-info">
                ${qIsBestWorstMode ? `
                <div class="info-panel-title">${qBestWorstMode === 'best' ? langData.bestCase : langData.worstCase}</div>
                <div class="info-panel-desc">
                    ${qBestWorstMode === 'best' ? (langData.queueBestCaseDescription || langData.queueInfoBest) : (langData.queueWorstCaseDescription || langData.queueInfoWorst)}
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

  refreshQInfo();
}

function displayQueue2StacksSyntaxUI(){
  const langData = qGetLang();

  document.getElementById('dynamicContent').innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">

        <div class="queueStacksWrap">
          <div class="queueStackBlock">
            <div class="queueStackLabel">${langData.queueStackOutLabel}</div>
            <div class="queueStackContainer">
              <div id="qOutView" class="stack-view">
                ${qOut.map(v => `<div class="stack-item">${v}</div>`).join('')}
              </div>
            </div>
          </div>

          <div class="queueStackBlock">
            <div class="queueStackLabel">${langData.queueStackInLabel}</div>
            <div class="queueStackContainer">
              <div id="qInView" class="stack-view">
                ${qIn.map(v => `<div class="stack-item">${v}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="stack-controls">
          <div class="step-count" id="qStepCountDisplay">${langData.stepCount}: ${qStepCount}</div>
          <div class="potential-display" id="qPotentialDisplay">${langData.potential}: <span class="potentialValue">${qPotential}</span></div>
          <div class="syntax-info">
            <button class="btn btn-primary btn-lg" id="syntaxNextBtn">${langData.nextButton}</button>
          </div>
        </div>

        <div class="syntax-detailed-info">
          <div id="qSyntaxCurrentStepInfo"></div>
          <div id="qSyntaxDetailedStepInfo"></div>
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

function renderQueueStacks(){
    const inView = document.getElementById('qInView');
    const outView = document.getElementById('qOutView');

    if(inView)
      inView.innerHTML = qIn.map(v => `<div class="stack-item">${v}</div>`).join('');
    if(outView)
      outView.innerHTML = qOut.map(v => `<div class="stack-item">${v}</div>`).join('');
}

function updateQueueCounters(){
    const langData = qGetLang();
    const sc = document.getElementById('qStepCountDisplay');
    const pot = document.getElementById('qPotentialDisplay');

    if(sc)
      sc.innerText = `${langData.stepCount}: ${qStepCount}`;
    if(pot)
      pot.innerHTML = `${langData.potential}: <span class="potentialValue">${qPotential}</span>`;
}

function updateQueueSyntaxPanels(index){
    const langData = qGetLang();
    const step = qSyntaxSteps[index];
    const a = document.getElementById('qSyntaxCurrentStepInfo');
    const b = document.getElementById('qSyntaxDetailedStepInfo');

    if(a) 
      a.innerHTML = `${index + 1}. ${step.description}`;
    if(b) 
      b.innerHTML = step.detail || langData.detailNotProvided;
}