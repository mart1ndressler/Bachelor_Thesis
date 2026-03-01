let stackArray = [], stepCount = 0, potential = 0, syntaxCommands = [], currentCommandIndex = 0, steps = [], isBestWorstMode = false, mpBusy = false;
let mpBestWorstMode = null;
let mpBWIndex = -1;

function mpLang(){
  return translations[localStorage.getItem('language') || 'en'];
}

function mpFill(tpl, vars){
  let out = String(tpl || '');
  for(const [key, value] of Object.entries(vars || {})){
    out = out.split(`{${key}}`).join(String(value));
  }
  return out;
}

function updateStackView(){
  const stackView = document.getElementById('stackView');
  if(!stackView) return;
  stackView.innerHTML = stackArray.map(v => `<div class="stack-item">${v}</div>`).join('');
}

function updateCounters(){
  const langData = mpLang();

  const sc = document.getElementById('stepCountDisplay');
  if(sc) sc.innerText = `${langData.stepCount}: ${stepCount}`;

  const pot = document.getElementById('potentialDisplay');
  if(pot) pot.innerHTML = `${langData.potential}: <span class="potentialValue">${potential}</span>`;
}

function setSyntaxNextEnabled(enabled){
  const btn = document.getElementById('syntaxNextBtn');
  if(btn) btn.disabled = !enabled;
}

function displayStack(values = stackArray){
  const langData = mpLang();
  const dynamicContent = document.getElementById('dynamicContent');
  if(!dynamicContent) return;

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
  if(!dynamicContent) return;

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
  if(btn) btn.onclick = nextSyntaxStep;
  setSyntaxNextEnabled(!mpBusy);
}

function pushToStackManual(value){
  if(mpBusy) return;
  stackArray.push(value);
  stepCount += 1;
  potential = stackArray.length;

  updateStackView();

  const items = document.querySelectorAll('.stack-item');
  const newItem = items[items.length - 1];
  if(newItem) newItem.classList.add('new-item');
  updateCounters();
}

function popFromStackManual()
{
  if(mpBusy) 
    return undefined;

  const langData = mpLang();
  if(stackArray.length === 0)
  {
    showAppMessage(langData.stackEmptyAlert);
    return undefined;
  }

  const items = document.querySelectorAll('.stack-item');
  const removedItem = items[items.length - 1];
  if(!removedItem) 
    return undefined;

  mpBusy = true;
  setSyntaxNextEnabled(false);

  const removedValue = stackArray[stackArray.length - 1];
  removedItem.classList.add('removed-item');

  removedItem.addEventListener('animationend', () => {
    stackArray.pop();
    stepCount += 1;
    potential = stackArray.length;

    updateStackView();
    updateCounters();

    mpBusy = false;
    setSyntaxNextEnabled(true);
  }, {once: true});
  return removedValue;
}

function multipopFromStackManual(count){
  if(mpBusy) return null;

  const langData = mpLang();
  if(!Number.isInteger(count) || count <= 0){
    alert(langData.invalidNumberAlert);
    return null;
  }

  const k = Math.min(count, stackArray.length);
  if(k === 0)
  {
    showAppMessage(langData.stackEmptyAlert);
    return [];
  }

  const removedVals = stackArray.slice(-k);
  const items = Array.from(document.querySelectorAll('.stack-item'));
  const removingItems = items.slice(-k);
  if(removingItems.length === 0) return removedVals;

  mpBusy = true;
  setSyntaxNextEnabled(false);

  let finished = 0;
  removingItems.forEach(item => {
    item.classList.add('removed-item');
    item.addEventListener('animationend', () => {
      finished++;
      if(finished === removingItems.length){
        for(let i = 0; i < k; i++) stackArray.pop();
        stepCount += k;
        potential = stackArray.length;

        updateStackView();
        updateCounters();

        mpBusy = false;
        setSyntaxNextEnabled(true);
      }
    }, {once: true});
  });
  return removedVals;
}

function pushToStack()
{
  const L = mpLang();

  openActionInputModal({title: L.pushButton, label: L.enterValuePrompt, placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const n = Number(raw);
      if(Number.isInteger(n) && n > 0)
      {
        pushToStackManual(n);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function popFromStack(){
  popFromStackManual();
}

function multipopFromStack()
{
  const L = mpLang();

  openActionInputModal({title: L.multipopButton, label: L.multipopPrompt, placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const n = Number(raw);
      if(Number.isInteger(n) && n > 0)
      {
        multipopFromStackManual(n);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function openSyntaxModal(){
  activeModalContext = 'multipopSyntax';
  $('#syntaxModal').modal('show');
  mpBusy = false;
  isBestWorstMode = false;
  stackArray = [];
  stepCount = 0;
  potential = 0;
  syntaxCommands = [];
  steps = [];
  currentCommandIndex = 0;

  const input = document.getElementById('syntaxInput');
  if(input) input.value = '';

  const btn = document.getElementById('startSyntaxBtn');
  if(btn) btn.onclick = startSyntaxExample;

  const form = document.getElementById('syntaxForm');
  if(form) form.style.display = 'block';
  if(btn) btn.style.display = 'block';
}

function validateSyntax(input){
  const syntaxPattern = /^((push\([1-9]\d*(?:,[1-9]\d*)*\)|pop\(\)|multipop\([1-9]\d*\))\s*)+$/i;
  return syntaxPattern.test(input);
}

function parseCommands(input){
  const commandPattern = /(push\((\d+(?:,\d+)*)\)|pop\(\)|multipop\((\d+)\))/gi;
  const commands = [];
  let match;

  while((match = commandPattern.exec(input)) !== null){
    const token = match[1].toLowerCase();
    if(token.startsWith('push')){
      const values = match[2].split(',').map(v => parseInt(v.trim(), 10));
      values.forEach(v => commands.push({type: 'push', value: v}));
    } else if(token.startsWith('pop')){
      commands.push({type: 'pop'});
    } else {
      commands.push({type: 'multipop', count: parseInt(match[3], 10)});
    }
  }

  return commands;
}

function generateSteps(commands){
  const langData = mpLang();

  return commands.map(cmd => {
    if(cmd.type === 'push'){
      return {type:'push', value: cmd.value, description: `${langData.pushButton} ${cmd.value}`, detail: langData.pushDetail || langData.detailNotProvided};
    }
    if(cmd.type === 'pop'){
      return {type:'pop', description: `${langData.popButton}`, detail: langData.popDetail || langData.detailNotProvided};
    }
    return {type:'multipop', count: cmd.count, description: `${langData.multipopButton}(${cmd.count})`, detail: langData.multipopDetail || langData.detailNotProvided};
  });
}

function executeStep(step){
  const langData = mpLang();

  if(step.type === 'push'){
    pushToStackManual(step.value);
    const tpl = langData.pushDetail || langData.detailNotProvided || '';
    step.detail = mpFill(tpl, {
      value: `<span class="pushValue">${step.value}</span>`
    });
    return;
  }

  if(step.type === 'pop'){
    const removed = popFromStackManual();
    if(removed !== undefined){
      step.removedValue = removed;
      const tpl = langData.popDetail || langData.detailNotProvided || '';
      step.detail = mpFill(tpl, {
        removedValue: `<span class="popValue">${removed}</span>`
      });
    }else{
      step.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoPop || langData.stackEmptyAlert}</span>`;
    }
    return;
  }

  const removedVals = multipopFromStackManual(step.count);
  if(removedVals && removedVals.length > 0){
    step.removedValues = removedVals;
    const joined = removedVals.map(v => `<span class="popValue">${v}</span>`).join(', ');
    const k = Math.min(step.count, removedVals.length);

    const tpl = langData.multipopDetail || langData.detailNotProvided || '';
    step.detail = mpFill(tpl, {
      removedValues: joined,
      count: `<span class="potentialValue">${k}</span>`
    });
  }else{
    step.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoMultipop || langData.stackEmptyAlert}</span>`;
  }
}

function startSyntaxExample(){
  const langData = mpLang();
  const syntaxInput = document.getElementById('syntaxInput').value.trim();
  if(!validateSyntax(syntaxInput)) {alert(langData.invalidNumberAlert); return;}

  syntaxCommands = parseCommands(syntaxInput);
  if(syntaxCommands.length === 0) {alert(langData.invalidNumberAlert); return;}

  steps = generateSteps(syntaxCommands);
  currentCommandIndex = 0;

  $('#syntaxModal').modal('hide');
  displaySyntaxUI();

  if(steps.length > 0){
    executeStep(steps[currentCommandIndex]);

    const s = steps[currentCommandIndex];
    const infoEl = document.getElementById('currentStepInfo');
    const detailEl = document.getElementById('detailedStepInfo');

    if(infoEl) infoEl.innerHTML = `${currentCommandIndex + 1}. ${s.description}`;

    if(detailEl){
      detailEl.innerHTML = (s.detail && s.detail.trim())
        ? s.detail
        : (langData.detailNotProvided || `<span class="noDetail">${langData.noDetailProvided || ''}</span>`);
    }
  }
}

function nextSyntaxStep(){
  const langData = mpLang();
  if(mpBusy) return;

  if(currentCommandIndex < steps.length - 1){
    currentCommandIndex++;
    executeStep(steps[currentCommandIndex]);

    const s = steps[currentCommandIndex];
    const infoEl = document.getElementById('currentStepInfo');
    const detailEl = document.getElementById('detailedStepInfo');

    if(infoEl) infoEl.innerHTML = `${currentCommandIndex + 1}. ${s.description}`;
    if(detailEl){
      detailEl.innerHTML = (s.detail && s.detail.trim())
        ? s.detail
        : `<span class="noDetail">${langData.noDetailProvided || langData.detailNotProvided || ''}</span>`;
    }
  } else {
    showAppMessage(langData.endOfExample, {
      onClose: () => {
        stackArray = [];
        steps = [];
        stepCount = 0;
        potential = 0;
        isBestWorstMode = false;
        mpBusy = false;
        goBack();
      }
    });
  }
}

function rebuildMpSyntaxStepsForLanguage(){
  if(!Array.isArray(steps) || steps.length === 0) return;
  if(!Array.isArray(syntaxCommands) || syntaxCommands.length === 0) return;

  const langData = mpLang();

  for(let i = 0; i < steps.length; i++){
    const cmd = syntaxCommands[i];
    const s = steps[i];

    if(cmd.type === 'push'){
      s.description = `${langData.pushButton} ${cmd.value}`;
      s.value = cmd.value;
    }else if(cmd.type === 'pop'){
      s.description = `${langData.popButton}`;
    }else{
      s.description = `${langData.multipopButton}(${cmd.count})`;
      s.count = cmd.count;
    }

    if(i <= currentCommandIndex){
      if(s.type === 'push'){
        const tpl = langData.pushDetail || langData.detailNotProvided || '';
        s.detail = mpFill(tpl, {
          value: `<span class="pushValue">${s.value}</span>`
        });
      }else if(s.type === 'pop'){
        if(s.removedValue !== undefined){
          const tpl = langData.popDetail || langData.detailNotProvided || '';
          s.detail = mpFill(tpl, {
            removedValue: `<span class="popValue">${s.removedValue}</span>`
          });
        }else{
          s.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoPop || langData.stackEmptyAlert}</span>`;
        }
      }else{
        if(Array.isArray(s.removedValues) && s.removedValues.length > 0){
          const joined = s.removedValues.map(v => `<span class="popValue">${v}</span>`).join(', ');
          const k = Math.min(s.count, s.removedValues.length);
          const tpl = langData.multipopDetail || langData.detailNotProvided || '';
          s.detail = mpFill(tpl, {
            removedValues: joined,
            count: `<span class="potentialValue">${k}</span>`
          });
        }else{
          s.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoMultipop || langData.stackEmptyAlert}</span>`;
        }
      }
    }
  }
}

function openBestWorstParamsModal(){
  activeModalContext = 'multipopBestWorst';
  changeLanguage(localStorage.getItem('language') || 'en');

  const btns = document.querySelectorAll('#bestWorstModal .caseButton');
  if(btns[0]) btns[0].onclick = executeBestCase;
  if(btns[1]) btns[1].onclick = executeWorstCase;
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
  if(algParameters) algParameters.style.display = 'none';

  const dynamicContent = document.getElementById('dynamicContent');
  if(dynamicContent){
    const isBest = (mode === 'best');

    dynamicContent.innerHTML = `
      <div class="run-panel">
        <div class="run-row" id="mainContainer">
          <div id="stackContainer">
            <div id="stackView" class="stack-view"></div>
          </div>

          <div class="stack-controls">
            <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
            <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>
          </div>

          <div class="syntax-detailed-info">
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

function executeBestCase() {startBestWorstCase('best');}
function executeWorstCase() {startBestWorstCase('worst');}

function executeStepsWithDelay()
{
  let stepIndex = 0;
  const tick = () => {
    if(stepIndex < steps.length)
    {
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
    else
    {
      const langData = mpLang();
      const endMsg = (mpBestWorstMode === 'best')
        ? (langData.multipopEndBestCase || langData.endOfExample)
        : (langData.multipopEndWorstCase || langData.endOfExample);

      showAppMessage(endMsg, {
        onClose: () => {
          mpBestWorstMode = null;
          stackArray = [];
          steps = [];
          stepCount = 0;
          potential = 0;
          isBestWorstMode = false;
          mpBusy = false;
          goBack();
        }});
    }
  };
  
  tick();
}

function rebuildMpBestWorstForLanguage(){
  if(!isBestWorstMode || !steps || steps.length === 0) return;

  const langData = mpLang();
  const titleEl = document.getElementById('bwCaseTitle');
  const descEl  = document.getElementById('bwCaseDesc');

  if(titleEl) titleEl.textContent = (mpBestWorstMode === 'best') ? langData.bestCase : langData.worstCase;
  if(descEl)  descEl.textContent  = (mpBestWorstMode === 'best') ? langData.bestCaseDescription : langData.worstCaseDescription;

  if(mpBWIndex < 0 || mpBWIndex >= steps.length) return;
  const s = steps[mpBWIndex];

  if(s.type === 'push'){
    s.description = `${langData.pushButton} ${s.value}`;
    const tpl = langData.pushDetail || langData.detailNotProvided || '';
    s.detail = mpFill(tpl, { value: `<span class="pushValue">${s.value}</span>` });
  }

  if(s.type === 'pop'){
    s.description = `${langData.popButton}`;
    if(s.removedValue !== undefined){
      const tpl = langData.popDetail || langData.detailNotProvided || '';
      s.detail = mpFill(tpl, { removedValue: `<span class="popValue">${s.removedValue}</span>` });
    }else{
      s.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoPop || langData.stackEmptyAlert}</span>`;
    }
  }

  if(s.type === 'multipop'){
    s.description = `${langData.multipopButton}(${s.count})`;
    if(Array.isArray(s.removedValues) && s.removedValues.length > 0){
      const joined = s.removedValues.map(v => `<span class="popValue">${v}</span>`).join(', ');
      const k = Math.min(s.count, s.removedValues.length);
      const tpl = langData.multipopDetail || langData.detailNotProvided || '';
      s.detail = mpFill(tpl, {
        removedValues: joined,
        count: `<span class="potentialValue">${k}</span>`
      });
    }else{
      s.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoMultipop || langData.stackEmptyAlert}</span>`;
    }
  }

  const stepEl = document.getElementById('bwCurrentStepInfo');
  const detEl  = document.getElementById('bwDetailedStepInfo');
  if(stepEl) stepEl.innerHTML = `${mpBWIndex + 1}. ${s.description}`;
  if(detEl)  detEl.innerHTML  = s.detail || (langData.detailNotProvided || '');
}