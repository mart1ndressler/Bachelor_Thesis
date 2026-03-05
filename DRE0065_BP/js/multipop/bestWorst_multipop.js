function openBestWorstParamsModal(){
  activeModalContext = 'multipopBestWorst';
  changeLanguage(localStorage.getItem('language') || 'en');

  const btns = document.querySelectorAll('#bestWorstModal .caseButton');

  if(btns[0]) 
    btns[0].onclick = executeBestCase;
  if(btns[1]) 
    btns[1].onclick = executeWorstCase;

  $('#bestWorstModal').modal('show');
}

function startBestWorstCase(mode){
  $('#bestWorstModal').modal('hide');

  mpBestWorstMode = mode;
  isBestWorstMode = true;
  mpBusy = false;
  stackArray = [];
  stepCount = 0;
  potential = 0;

  const langData = mpLang();
  const algParameters = document.querySelector('.alg_parameters');
  if(algParameters)
    algParameters.style.display = 'none';

  const dynamicContent = document.getElementById('dynamicContent');
  if(dynamicContent){
    const isBest = (mode === 'best');

    dynamicContent.innerHTML = `
      <div class="run-panel">
        <div class="run-row" id="mainContainer">
          <div>
            <div class="queueStackLabel">${langData.stackLabel || 'Stack'}</div>

            <div id="stackContainer">
              <div id="stackView" class="stack-view"></div>
            </div>
          </div>

          <div class="stack-controls controls-bottom">
            <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
            <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>
          </div>

          <div class="syntax-detailed-info align-bottom">
            <div class="info-panel-title" id="bwCaseTitle">${isBest ? langData.bestCase : langData.worstCase}</div>
            <div class="info-panel-desc" id="bwCaseDesc">${isBest ? langData.bestCaseDescription : langData.worstCaseDescription}</div>
            <div class="info-panel-sep"></div>

            <div class="info-step-title" id="bwCurrentStepInfo"></div>
            <div class="info-step-detail" id="bwDetailedStepInfo"></div>
          </div>
        </div>
      </div>
    `;
  }

  steps = (mode === 'best') 
  ? [
      {type:'push', value:1, description:`${langData.pushButton} 1`},
      {type:'push', value:2, description:`${langData.pushButton} 2`},
      {type:'push', value:3, description:`${langData.pushButton} 3`},
      {type:'multipop', count:2, description:`${langData.multipopButton}(2)`}
    ]
  : [
      {type:'push', value:1, description:`${langData.pushButton} 1`},
      {type:'push', value:2, description:`${langData.pushButton} 2`},
      {type:'push', value:3, description:`${langData.pushButton} 3`},
      {type:'multipop', count:3, description:`${langData.multipopButton}(3)`}
    ];

  mpBWIndex = -1;
  updateStackView();
  updateCounters();
  executeStepsWithDelay();
}

function executeBestCase(){
  startBestWorstCase('best');
}

function executeWorstCase(){
  startBestWorstCase('worst');
}

function executeStepsWithDelay(){
  let stepIndex = 0;
  const tick = () => {
    if(stepIndex < steps.length){
      executeStep(steps[stepIndex]);
      mpBWIndex = stepIndex;

      const langData = mpLang();
      const s = steps[stepIndex];
      const stepEl = document.getElementById('bwCurrentStepInfo');
      const detailEl = document.getElementById('bwDetailedStepInfo');

      if(stepEl) 
        stepEl.innerHTML = `${stepIndex + 1}. ${s.description}`;
      if(detailEl)
        detailEl.innerHTML = (s.detail && s.detail.trim()) ? s.detail : (langData.detailNotProvided || '');

      stepIndex++;
      setTimeout(tick, 1200);
    }
    else{
      const langData = mpLang();
      const endMsg = (mpBestWorstMode === 'best') ? (langData.multipopEndBestCase || langData.endOfExample) : (langData.multipopEndWorstCase || langData.endOfExample);

      showAppMessage(endMsg, {
        onClose: () => {mpBestWorstMode = null; stackArray = []; steps = []; stepCount = 0; potential = 0; isBestWorstMode = false; mpBusy = false;
          goBack();
      }});
    }
  };

  tick();
}

function rebuildMpBestWorstForLanguage(){
  if(!isBestWorstMode || !steps || steps.length === 0)
    return;

  const langData = mpLang();
  const titleEl = document.getElementById('bwCaseTitle');
  const descEl  = document.getElementById('bwCaseDesc');

  if(titleEl)
    titleEl.textContent = (mpBestWorstMode === 'best') ? langData.bestCase : langData.worstCase;
  if(descEl) 
    descEl.textContent  = (mpBestWorstMode === 'best') ? langData.bestCaseDescription : langData.worstCaseDescription;

  if(mpBWIndex < 0 || mpBWIndex >= steps.length)
    return;
  const s = steps[mpBWIndex];

  if(s.type === 'push'){
    s.description = `${langData.pushButton} ${s.value}`;
    const tpl = langData.pushDetail || langData.detailNotProvided || '';
    s.detail = mpFill(tpl, {value: `<span class="pushValue">${s.value}</span>`});
  }

  if(s.type === 'pop'){
    s.description = `${langData.popButton}`;
    if(s.removedValue !== undefined){
      const tpl = langData.popDetail || langData.detailNotProvided || '';
      s.detail = mpFill(tpl, {removedValue: `<span class="popValue">${s.removedValue}</span>`});
    }
    else
      s.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoPop || langData.stackEmptyAlert}</span>`;
  }

  if(s.type === 'multipop'){
    s.description = `${langData.multipopButton}(${s.count})`;
    if(Array.isArray(s.removedValues) && s.removedValues.length > 0){
      const joined = s.removedValues.map(v => `<span class="popValue">${v}</span>`).join(', ');
      const k = Math.min(s.count, s.removedValues.length);
      const tpl = langData.multipopDetail || langData.detailNotProvided || '';
      s.detail = mpFill(tpl, {removedValues: joined, count: `<span class="potentialValue">${k}</span>`});
    }
    else
      s.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoMultipop || langData.stackEmptyAlert}</span>`;
  }

  const stepEl = document.getElementById('bwCurrentStepInfo');
  const detEl  = document.getElementById('bwDetailedStepInfo');
  
  if(stepEl)
    stepEl.innerHTML = `${mpBWIndex + 1}. ${s.description}`;
  if(detEl)
    detEl.innerHTML  = s.detail || (langData.detailNotProvided || '');
}