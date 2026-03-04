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
        <div id="stackContainer">
          <div id="stackView" class="stack-view">
            ${values.map(v => `<div class="stack-item">${v}</div>`).join('')}
          </div>
        </div>

        <div class="stack-controls">
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
  const dynamicContent = document.getElementById('dynamicContent');
  if(!dynamicContent) 
    return;

  dynamicContent.innerHTML = `
    <div class="run-panel">
      <div class="run-row" id="mainContainer">
        <div id="stackContainer">
          <div id="stackView" class="stack-view">
            ${stackArray.map(v => `<div class="stack-item">${v}</div>`).join('')}
          </div>
        </div>

        <div class="stack-controls">
          <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
          <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>

          <div class="syntax-info">
            <button class="btn btn-primary btn-lg" id="syntaxNextBtn">${langData.nextButton}</button>
          </div>
        </div>

        <div class="syntax-detailed-info">
          <div class="info-step-title" id="currentStepInfo"></div>
          <div class="info-step-detail" id="detailedStepInfo"></div>
        </div>
      </div>
    </div>
  `;

  const btn = document.getElementById('syntaxNextBtn');
  if(btn) 
    btn.onclick = nextSyntaxStep;
  
  setSyntaxNextEnabled(!mpBusy);
}