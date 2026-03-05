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
}

function setSyntaxNextEnabled(enabled){
  const btn = document.getElementById('syntaxNextBtn');
  if(btn) 
    btn.disabled = !enabled;
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
          <div class="queueStackLabel">${langData.stackLabel || 'Stack'}</div>
          <div id="stackContainer">
            <div id="stackView" class="stack-view">
              ${values.map(v => `<div class="stack-item">${v}</div>`).join('')}
            </div>
          </div>
        </div>

        <div class="stack-controls controls-bottom">
          <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>
          ${buttonsHtml}
        </div>
      </div>
    </div>
  `;
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
      <div class="run-row" id="mainContainer">

        <div>
          <div class="queueStackLabel">${langData.stackLabel || 'Stack'}</div>
          <div id="stackContainer">
            <div id="stackView" class="stack-view">
              ${stackArray.map(v => `<div class="stack-item">${v}</div>`).join('')}
            </div>
          </div>
        </div>

        <div class="stack-controls controls-bottom">
          <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">
            ${langData.potential}: <span class="potentialValue">${potential}</span>
          </div>

          <div class="syntax-detailed-info" id="mpSynPanel">
            <div class="info-panel-title" id="mpSynPanelTitle">${title}</div>
            <div class="info-panel-desc" id="mpSynPanelDesc">${desc}</div>
            <div class="info-panel-sep"></div>
            <div class="info-step-title" id="currentStepInfo"></div>
            <div class="info-step-detail" id="detailedStepInfo"></div>
          </div>

          <button id="syntaxNextBtn" class="btn btn-primary btn-lg">${langData.nextButton}</button>
        </div>
      </div>
    </div>
  `;

  const btn = document.getElementById('syntaxNextBtn');
  if(btn)
    btn.onclick = nextSyntaxStep;

  setSyntaxNextEnabled(!mpBusy);
}

function updateMpSyntaxPanels(index){
  const L = mpLang();
  const total = Array.isArray(steps) ? steps.length : 0;
  if(total === 0)
    return;

  const s = steps[index];
  const a = document.getElementById('currentStepInfo');
  const b = document.getElementById('detailedStepInfo');

  if(a)
    a.innerHTML = `${index + 1}/${total}: ${s.description}`;

  if(b){
    let html = (s.detail && String(s.detail).trim()) ? s.detail : (L.detailNotProvided || '');

    if(index < total - 1){
      const next = steps[index + 1];
      html += `<div class="info-panel-sep"></div>
               <div><strong>Next:</strong> ${index + 2}/${total}: ${next.description}</div>`;
    }

    b.innerHTML = html;
  }
}