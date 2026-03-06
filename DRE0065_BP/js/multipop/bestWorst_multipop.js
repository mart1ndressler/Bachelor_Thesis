function mpStartBestWorst(mode){
  $('#bestWorstModal').modal('hide');

  if(typeof mpResetState === 'function')
    mpResetState();

  mpBestWorstMode = mode;
  isBestWorstMode = true;

  if(typeof mpRenderBestWorstUI === 'function')
    mpRenderBestWorstUI(mode);

  updateStackView();
  updateCounters();

  const L = mpLang();
  steps = (mode === 'best')
    ? [
        {type:'push', value:1, description:`${L.pushButton} 1`},
        {type:'push', value:2, description:`${L.pushButton} 2`},
        {type:'push', value:3, description:`${L.pushButton} 3`},
        {type:'multipop', count:2, description:`${L.multipopButton}(2)`}
      ]
    : [
        {type:'push', value:1, description:`${L.pushButton} 1`},
        {type:'push', value:2, description:`${L.pushButton} 2`},
        {type:'push', value:3, description:`${L.pushButton} 3`},
        {type:'multipop', count:3, description:`${L.multipopButton}(3)`}
      ];

  mpBWIndex = -1;

  const runToken = ++mpRunToken;
  mpBwRunStepsWithDelay(runToken);
}

function executeBestCase(){
  mpStartBestWorst('best');
}

function executeWorstCase(){
  mpStartBestWorst('worst');
}

function mpBwRunStepsWithDelay(runToken){
  let stepIndex = 0;

  const tick = () => {
    if(runToken !== mpRunToken)
      return;

    if(stepIndex < steps.length){
      mpExecuteStep(steps[stepIndex]);
      mpBWIndex = stepIndex;

      const langData = mpLang();
      const s = steps[stepIndex];
      const stepEl = document.getElementById('bwCurrentStepInfo');
      const detailEl = document.getElementById('bwDetailedStepInfo');

      if(stepEl) 
        stepEl.innerHTML = `${stepIndex + 1}. ${s.description}`;

      if(detailEl)
        detailEl.innerHTML = (s.detail && String(s.detail).trim()) ? s.detail : (langData.detailNotProvided || '');

      stepIndex++;
      mpBwTimer = setTimeout(tick, 1200);
      return;
    }

    if(runToken !== mpRunToken)
      return;

    const langData = mpLang();
    const endMsg = (mpBestWorstMode === 'best') ? (langData.multipopEndBestCase || langData.endOfExample) : (langData.multipopEndWorstCase || langData.endOfExample);

    showAppMessage(endMsg, {
      onClose: () => {mpBestWorstMode = null; isBestWorstMode = false;
        if(runToken !== mpRunToken)
          return;
        
        if(typeof mpResetState === 'function')
          mpResetState();
        goBack();
      }});
  };

  tick();
}

function rebuildMpBestWorstForLanguage(){
  if(!isBestWorstMode || !steps || steps.length === 0)
    return;

  const langData = mpLang();
  const titleEl = document.getElementById('bwCaseTitle');
  const descEl = document.getElementById('bwCaseDesc');

  if(titleEl)
    titleEl.textContent = (mpBestWorstMode === 'best') ? langData.bestCase : langData.worstCase;
  if(descEl) 
    descEl.textContent = (mpBestWorstMode === 'best') ? langData.bestCaseDescription : langData.worstCaseDescription;

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
  const detEl = document.getElementById('bwDetailedStepInfo');
  
  if(stepEl)
    stepEl.innerHTML = `${mpBWIndex + 1}. ${s.description}`;
  if(detEl)
    detEl.innerHTML = s.detail || (langData.detailNotProvided || '');
}