let qIn = [], qOut = [], qStepCount = 0, qPotential = 0, qBusy = false;
let qSyntaxCommands = [], qSyntaxSteps = [], qSyntaxIndex = 0, qIsSyntaxMode = false, qLastInfo = null, qShowInfoPanel = false, qIsBestWorstMode = false;
let qBestWorstMode = null;

function qGetLang(){
    const language = localStorage.getItem('language') || 'en';
    return translations[language];
}

function qFmt(template, params = {}){
    return (template || '').replace(/\{(\w+)\}/g, (_, k) => {
        return (params[k] !== undefined) ? params[k] : `{${k}}`;
    });
}

function setQueueButtonsEnabled(enabled){
    const en = document.getElementById('qEnqueueBtn');
    const de = document.getElementById('qDequeueBtn');
    if(en) en.disabled = !enabled;
    if(de) de.disabled = !enabled;
}

function setQInfoKey(key, params = {}){
    if(!qShowInfoPanel) return;

    const langData = qGetLang();

    const titleTpl  = langData[`${key}Title`]  || langData[key] || '';
    const detailTpl = langData[`${key}Detail`] || '';

    const title  = qFmt(titleTpl, params);
    const detail = qFmt(detailTpl, params);

    const titleEl  = document.getElementById('qCurrentStepInfo');
    const detailEl = document.getElementById('qDetailedStepInfo');

    if(titleEl)  titleEl.innerHTML = title;
    if(detailEl) detailEl.innerHTML = detail;

    qLastInfo = { key, params };
}

function clearQInfo(){
    const a = document.getElementById('qCurrentStepInfo');
    const b = document.getElementById('qDetailedStepInfo');
    if(a) a.innerHTML = '';
    if(b) b.innerHTML = '';
    qLastInfo = null;
}

function refreshQInfo(){
    if(qLastInfo) setQInfoKey(qLastInfo.key, qLastInfo.params);
}

function qTopEl(viewId){
    const view = document.getElementById(viewId);
    if(!view) return null;
    const items = view.querySelectorAll('.stack-item');
    return items.length ? items[items.length - 1] : null;
}

function animatePop(viewId, onDone){
    const el = qTopEl(viewId);
    if(!el){ if(onDone) onDone(); return; }
    el.classList.add('removed-item');
    el.addEventListener('animationend', () => { if(onDone) onDone(); }, { once:true });
}

function animatePush(viewId){
    const el = qTopEl(viewId);
    if(el) el.classList.add('new-item');
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
                    ${qBestWorstMode === 'best'
                    ? (langData.queueBestCaseDescription || langData.queueInfoBest)
                    : (langData.queueWorstCaseDescription || langData.queueInfoWorst)
                    }
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
  if(btn) btn.addEventListener('click', nextQueue2StacksSyntaxStep);

  if(qIsSyntaxMode && qSyntaxSteps.length > 0){
    updateQueueSyntaxPanels(qSyntaxIndex);
  }
}

function renderQueueStacks(){
    const inView = document.getElementById('qInView');
    const outView = document.getElementById('qOutView');
    if(inView) inView.innerHTML = qIn.map(v => `<div class="stack-item">${v}</div>`).join('');
    if(outView) outView.innerHTML = qOut.map(v => `<div class="stack-item">${v}</div>`).join('');
}

function updateQueueCounters(){
    const langData = qGetLang();

    const sc = document.getElementById('qStepCountDisplay');
    const pot = document.getElementById('qPotentialDisplay');

    if(sc) sc.innerText = `${langData.stepCount}: ${qStepCount}`;
    if(pot) pot.innerHTML = `${langData.potential}: <span class="potentialValue">${qPotential}</span>`;
}

function initQueue2StacksManual(values){
    qIsBestWorstMode = false;
    qIn = [...values];
    qOut = [];
    qStepCount = 0;
    qPotential = qIn.length;
    qBusy = false;
    qShowInfoPanel = false;
    clearQInfo();
    displayQueue2Stacks();
}

function enqueueQueue2Stacks()
{
  const L = qGetLang();

  openActionInputModal({title: L.enqueueButton, label: L.enqueuePrompt, placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const n = Number(raw);
      if(Number.isInteger(n) && n > 0)
      {
        enqueueQueue2StacksManual(n);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function enqueueQueue2StacksManual(value){
    if(qBusy) return;

    qIn.push(value);
    qStepCount += 1;
    qPotential = qIn.length;

    renderQueueStacks();
    animatePush('qInView');
    updateQueueCounters();
}

function dequeueQueue2Stacks(done){
    if(qBusy) return;
    qBusy = true;

    dequeueQueue2StacksSequence((removed) => {
        qBusy = false;
        if(done) done(removed);
    });
}

function dequeueQueue2StacksSequence(done){
    const langData = qGetLang();

    if(qOut.length === 0 && qIn.length === 0){
        showAppMessage(langData.queueEmptyAlert);
        clearQInfo();
        if(done) done(undefined);
        return;
    }

    if(qOut.length === 0){
        setQInfoKey('queueInfoTransfer');
        transferAllFromInToOut(() => {
            popFromOut(done);
        });
    }else{
        popFromOut(done);
    }
}

function transferAllFromInToOut(done){
    if(qIn.length === 0){
        qPotential = qIn.length;
        updateQueueCounters();
        if(done) done();
        return;
    }

    const x = qIn[qIn.length - 1];
    setQInfoKey('queueInfoMove', { value: x });

    animatePop('qInView', () => {
        qIn.pop();
        qStepCount += 1;

        qOut.push(x);
        qStepCount += 1;

        qPotential = qIn.length;

        renderQueueStacks();
        animatePush('qOutView');
        updateQueueCounters();

        setTimeout(() => transferAllFromInToOut(done), 250);
    });
}

function popFromOut(done){
    const x = qOut[qOut.length - 1];
    setQInfoKey('queueInfoDequeue', { value: x, potential: qPotential });

    animatePop('qOutView', () => {
        qOut.pop();
        qStepCount += 1;

        renderQueueStacks();
        updateQueueCounters();

        setTimeout(() => clearQInfo(), 250);
        if(done) done(x);
    });
}

function executeQueue2StacksBestCase(){
    $('#bestWorstModal').modal('hide');
    qIsBestWorstMode = true;
    qBestWorstMode = 'best';

    const algParameters = document.querySelector('.alg_parameters');
    if(algParameters) algParameters.style.display = 'none';

    const values = [1,2,3,4,5];
    qIn = [];
    qOut = [...values].reverse();
    qStepCount = 0;
    qPotential = qIn.length;
    qBusy = false;

    qShowInfoPanel = true;
    clearQInfo();

    displayQueue2Stacks();
    setQInfoKey('queueInfoBest');

    setTimeout(() => {
        dequeueQueue2Stacks(() => {
            const langData = qGetLang();
            showAppMessage(langData.queueEndBestCase, {
            onClose: () => {
                resetQueue2StacksState();
                qIsBestWorstMode = false;
                goBack();
            }});
        });
    }, 600);
}

function executeQueue2StacksWorstCase(){
    $('#bestWorstModal').modal('hide');
    qIsBestWorstMode = true;
    qBestWorstMode = 'worst';

    const algParameters = document.querySelector('.alg_parameters');
    if(algParameters) algParameters.style.display = 'none';

    const values = [1,2,3,4,5,6,7,8];
    qIn = [...values];
    qOut = [];
    qStepCount = 0;
    qPotential = qIn.length;
    qBusy = false;

    qShowInfoPanel = true;
    clearQInfo();

    displayQueue2Stacks();
    setQInfoKey('queueInfoWorst');

    setTimeout(() => {
        dequeueQueue2Stacks(() => {
            const langData = qGetLang();
            showAppMessage(langData.queueEndWorstCase, {
            onClose: () => {
                resetQueue2StacksState();
                qIsBestWorstMode = false;
                goBack();
            }});
        });
    }, 600);
}

function resetQueue2StacksState(){
    qIn = [];
    qOut = [];
    qStepCount = 0;
    qPotential = 0;
    qBusy = false;
    qBestWorstMode = null;

    qSyntaxCommands = [];
    qSyntaxSteps = [];
    qSyntaxIndex = 0;
    qIsSyntaxMode = false;

    clearQInfo();
}

function validateQueueSyntax(input){
    const syntaxPattern = /^((enqueue\(\d+(?:,\d+)*\)|dequeue\(\))\s*)+$/i;
    return syntaxPattern.test(input);
}

function parseQueueCommands(input){
    const commandPattern = /(enqueue\((\d+(?:,\d+)*)\)|dequeue\(\))/gi;
    let match;
    const commands = [];

    while((match = commandPattern.exec(input)) !== null){
        if(match[1].toLowerCase().startsWith('enqueue')){
            const values = match[2].split(',').map(v => parseInt(v.trim(), 10));
            values.forEach(v => commands.push({ type:'enqueue', value:v }));
        }else{
            commands.push({ type:'dequeue' });
        }
    }
    return commands;
}

function generateQueueSyntaxSteps(commands){
    const langData = qGetLang();
    const steps = [];

    commands.forEach(cmd => {
        if(cmd.type === 'enqueue'){
            steps.push({
                type: 'enqueue',
                value: cmd.value,
                description: `${langData.enqueueButton} ${cmd.value}`,
                detail: (langData.queueEnqueueDetail || langData.detailNotProvided).replace('{value}', '{value}')
            });
        }else{
            steps.push({
                type: 'dequeue',
                description: `${langData.dequeueButton}`,
                detail: langData.detailNotProvided,
                removedValue: undefined,
                usedTransfer: undefined,
                wasEmpty: false
            });
        }
    });

    return steps;
}

function updateQueueSyntaxPanels(index){
    const langData = qGetLang();
    const step = qSyntaxSteps[index];

    const a = document.getElementById('qSyntaxCurrentStepInfo');
    const b = document.getElementById('qSyntaxDetailedStepInfo');

    if(a) a.innerHTML = `${index + 1}. ${step.description}`;
    if(b) b.innerHTML = step.detail || langData.detailNotProvided;
}

function setQueueSyntaxNextEnabled(enabled){
    const btn = document.getElementById('syntaxNextBtn');
    if(btn) btn.disabled = !enabled;
}

function executeQueueSyntaxStep(step, done){
    const langData = qGetLang();

    if(step.type === 'enqueue'){
        enqueueQueue2StacksManual(step.value);
        step.detail = (langData.queueEnqueueDetail || langData.detailNotProvided)
            .replace('{value}', `<span class="pushValue">${step.value}</span>`);
        if(done) done();
        return;
    }

    if(step.type === 'dequeue'){
        const usedTransfer = (qOut.length === 0 && qIn.length > 0);
        step.usedTransfer = usedTransfer;

        dequeueQueue2Stacks((removed) => {
            if(removed === undefined){
                step.wasEmpty = true;
                step.detail = `<span class="emptyStackMessage">${langData.queueEmptyNoDequeue}</span>`;
                if(done) done();
                return;
            }

            step.removedValue = removed;

            const key = usedTransfer ? 'queueDequeueDetailTransfer' : 'queueDequeueDetailSimple';
            step.detail = (langData[key] || langData.detailNotProvided)
                .replace('{removedValue}', `<span class="popValue">${removed}</span>`)
                .replace('{potential}', `<span class="potentialValue">${qPotential}</span>`);

            if(done) done();
        });
    }
}

function startQueue2StacksSyntaxExample(){
    const langData = qGetLang();

    const input = document.getElementById('syntaxInput').value.trim();
    if(!validateQueueSyntax(input)){
        showAppMessage(langData.queueSyntaxInvalidAlert);
        return;
    }

    resetQueue2StacksState();

    qSyntaxCommands = parseQueueCommands(input);
    if(qSyntaxCommands.length === 0){
        showAppMessage(langData.queueSyntaxInvalidAlert);
        return;
    }

    qSyntaxSteps = generateQueueSyntaxSteps(qSyntaxCommands);
    qSyntaxIndex = 0;
    qIsSyntaxMode = true;

    $('#syntaxModal').modal('hide');
    displayQueue2StacksSyntaxUI();

    setQueueSyntaxNextEnabled(false);
    executeQueueSyntaxStep(qSyntaxSteps[qSyntaxIndex], () => {
        updateQueueSyntaxPanels(qSyntaxIndex);
        setQueueSyntaxNextEnabled(true);
    });
}

function nextQueue2StacksSyntaxStep(){
    const langData = qGetLang();

    if(!qIsSyntaxMode || qSyntaxSteps.length === 0) return;
    if(qBusy) return;

    if(qSyntaxIndex < qSyntaxSteps.length - 1){
        qSyntaxIndex++;

        setQueueSyntaxNextEnabled(false);
        executeQueueSyntaxStep(qSyntaxSteps[qSyntaxIndex], () => {
            updateQueueSyntaxPanels(qSyntaxIndex);
            setQueueSyntaxNextEnabled(true);
        });
    }else{
        showAppMessage(langData.endOfExample, {
        onClose: () => {
            resetQueue2StacksState();
            goBack();
        }});
    }
}

function rebuildQueueSyntaxStepsForLanguage(){
    if(!qIsSyntaxMode || qSyntaxCommands.length === 0) return;

    const langData = qGetLang();

    const oldSteps = qSyntaxSteps;
    const newSteps = generateQueueSyntaxSteps(qSyntaxCommands);

    for(let i = 0; i < Math.min(oldSteps.length, newSteps.length); i++){
        newSteps[i].removedValue = oldSteps[i].removedValue;
        newSteps[i].usedTransfer = oldSteps[i].usedTransfer;
        newSteps[i].wasEmpty = oldSteps[i].wasEmpty;
    }

    for(let i = 0; i < newSteps.length; i++){
        const s = newSteps[i];

        if(s.type === 'enqueue'){
            s.detail = (langData.queueEnqueueDetail || langData.detailNotProvided)
                .replace('{value}', `<span class="pushValue">${s.value}</span>`);
        }

        if(s.type === 'dequeue'){
            if(s.wasEmpty){
                s.detail = `<span class="emptyStackMessage">${langData.queueEmptyNoDequeue}</span>`;
            }else if(s.removedValue !== undefined){
                const key = s.usedTransfer ? 'queueDequeueDetailTransfer' : 'queueDequeueDetailSimple';
                s.detail = (langData[key] || langData.detailNotProvided)
                    .replace('{removedValue}', `<span class="popValue">${s.removedValue}</span>`)
                    .replace('{potential}', `<span class="potentialValue">${qPotential}</span>`);
            }else{
                s.detail = langData.detailNotProvided;
            }
        }
    }

    qSyntaxSteps = newSteps;
    if(document.getElementById('qSyntaxCurrentStepInfo')){
        updateQueueSyntaxPanels(qSyntaxIndex);
    }
}