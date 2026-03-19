function qValidateSyntax(input){
  const syntaxPattern = /^((enqueue\(\d+(?:,\d+)*\)|dequeue\(\))\s*)+$/i;
  return syntaxPattern.test(input);
}

function qParseSyntaxCommands(input){
  const commandPattern = /(enqueue\((\d+(?:,\d+)*)\)|dequeue\(\))/gi;
  const commands = [];
  let match;

  while((match = commandPattern.exec(input)) !== null){
    if(match[1].toLowerCase().startsWith('enqueue')){
      const values = match[2].split(',').map(v => parseInt(v.trim(), 10));
      values.forEach(v => commands.push({type:'enqueue', value:v}));
    }
    else
        commands.push({type:'dequeue'});
  }

  return commands;
}

function qBuildSyntaxSteps(commands){
  const L = qLang();

  return commands.map(cmd => {
    if(cmd.type === 'enqueue')
        return {type: 'enqueue', value: cmd.value, description: `${L.enqueueButton} ${cmd.value}`, detail: (L.queueEnqueueDetail || L.detailNotProvided)};

    return {type: 'dequeue', description: `${L.dequeueButton}`, detail: L.detailNotProvided, removedValue: undefined, usedTransfer: undefined, wasEmpty: false};
  });
}

function qSigned(n){
  const x = Number(n);
  if(!Number.isFinite(x))
    return '0';

  return x > 0 ? `+${x}` : String(x);
}

function qBuildSyntaxDetail(step, L = qLang()){
  const num = (v) => `<span class="potentialValue">${v}</span>`;
  const push = (v) => `<span class="pushValue">${v}</span>`;
  const pop = (v) => `<span class="popValue">${v}</span>`;

  const common = {beforeIn: num(step.beforeIn ?? 0), beforeOut: num(step.beforeOut ?? 0), afterIn: num(step.afterIn ?? 0), afterOut: num(step.afterOut ?? 0), actualCost: num(step.actualCost ?? 0), phiBefore: num(step.phiBefore ?? 0), phiAfter: num(step.phiAfter ?? 0), deltaPhi: num(qSigned(step.deltaPhi ?? 0)), transferredCount: num(step.transferredCount ?? 0)};
  if(step.type === 'enqueue')
    return qFmt(L.queueEnqueueDetail || L.detailNotProvided || '', {...common, value: push(step.value)});
  if(step.wasEmpty)
    return qFmt(L.emptyDequeueDetail || L.detailNotProvided || '', common);
  if(step.usedTransfer)
    return qFmt(L.queueDequeueDetailTransfer || L.detailNotProvided || '', {...common, removedValue: pop(step.removedValue)});

  return qFmt(L.queueDequeueDetailSimple || L.detailNotProvided || '', {...common, removedValue: pop(step.removedValue)});
}

function qSynMakeSnapshot(){
  return {qIn: [...qIn], qOut: [...qOut]};
}

function qCanUseManualHistory(){
  return !qIsBestWorstMode && !document.getElementById('qSynPanel');
}

function qHistoryStepDescription(step, L = qLang()){
  if(!step)
    return '';
  if(step.type === 'enqueue')
    return `${L.enqueueButton} ${step.value}`;
  if(step.type === 'dequeue')
    return `${L.dequeueButton}`;

  return step.description || '';
}

function qManualHistoryTitle(index, step, L = qLang()){
  return `${index + 1}. ${L.historyCommandLabel || 'Command'}: ${qHistoryStepDescription(step, L)}`;
}

function qManualSaveHistoryEntry(step, {snapshot = null, stepCountValue = null, potentialValue = null} = {}){
  qManualHistory.push({step: JSON.parse(JSON.stringify(step)), snapshot: snapshot ? {qIn: [...snapshot.qIn], qOut: [...snapshot.qOut]} : qSynMakeSnapshot(), stepCount: Number.isFinite(stepCountValue) ? stepCountValue : qStepCount, potential: Number.isFinite(potentialValue) ? potentialValue : qPotential});
}

function qManualBuildHistoryModalHtml(){
  const L = qLang();

  if(!Array.isArray(qManualHistory) || qManualHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return qManualHistory.map((entry, i) => {
    const step = entry.step || {};
    const title = qManualHistoryTitle(i, step, L);
    const detailHtml = qBuildSyntaxDetail(step, L);

    return `
      <div class="syntax-history-entry">
        <div class="info-panel-title">${title}</div>
        <div class="syntax-history-meta">
          ${L.stepCount}: ${entry.stepCount} |
          ${L.potential}: ${entry.potential}
        </div>
        <div class="info-step-detail">${detailHtml}</div>
      </div>
    `;}).join('');
}

function qManualOpenHistoryModal(){
  openSyntaxHistoryModal('', '',
    () => {
      const L = qLang();
      return {title: `${L.historyModalBaseTitle || 'History'} – ${L.queue2StacksTitle || 'Queue using Two Stacks'}`, bodyHtml: qManualBuildHistoryModalHtml()};
    }
  );
}

function qManualSeedHistoryFromValues(values){
  qManualHistory = [];

  if(!Array.isArray(values) || values.length === 0)
    return;

  const L = qLang();
  const tempIn = [];
  const tempOut = [];
  let tempStepCount = 0;
  let tempPotential = 0;

  for(const value of values){
    const step = {type: 'enqueue', value, description: `${L.enqueueButton} ${value}`, beforeIn: tempIn.length, beforeOut: tempOut.length, phiBefore: tempPotential};

    tempIn.push(value);
    tempStepCount += 1;
    tempPotential = tempIn.length;

    step.afterIn = tempIn.length;
    step.afterOut = tempOut.length;
    step.actualCost = 1;
    step.transferredCount = 0;
    step.phiAfter = tempPotential;
    step.deltaPhi = step.phiAfter - step.phiBefore;

    qManualSaveHistoryEntry(step, {snapshot: {qIn: [...tempIn], qOut: [...tempOut]}, stepCountValue: tempStepCount, potentialValue: tempPotential});
  }
}

function qSynSaveHistoryEntry(step){
  const L = qLang();
  const title = `${qSyntaxIndex + 1}/${qSyntaxSteps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');
  qSynHistory.push({title, detailHtml, snapshot: qSynMakeSnapshot(), stepCount: qStepCount, potential: qPotential});
}

function qSynRestoreHistoryEntry(index){
  if(index < 0 || index >= qSynHistory.length)
    return;

  qSynHistoryCursor = index;
  const entry = qSynHistory[index];
  qIn = [...entry.snapshot.qIn];
  qOut = [...entry.snapshot.qOut];
  qStepCount = entry.stepCount;
  qPotential = entry.potential;
  qSyntaxIndex = index;

  renderQueueStacks();
  updateQueueCounters();
  qSynRenderInfo();
  qSynUpdateFinishUI();
}

function qSynGoHistory(delta){
  if(!qSynFinished)
    return;

  const next = qSynHistoryCursor + delta;
  if(next < 0 || next >= qSynHistory.length)
    return;

  qSynRestoreHistoryEntry(next);
}

function qSynBuildHistoryModalHtml(){
  const L = qLang();

  if(!Array.isArray(qSynHistory) || qSynHistory.length === 0)
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  return qSynHistory.map(entry => `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${entry.title}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount} |
        ${L.potential}: ${entry.potential}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>`).join('');
}

function qSynOpenHistoryModal(){
  const L = qLang();
  openSyntaxHistoryModal(`${L.syntaxHistoryTitle || 'Syntax mode history'} – ${L.queue2StacksTitle || 'Queue using Two Stacks'}`, qSynBuildHistoryModalHtml());
}

function qSetSyntaxNextEnabled(enabled){
  const btn = document.getElementById('syntaxNextBtn');
  if(btn)
    btn.disabled = !enabled;
}

function qExecuteSyntaxStep(step, done){
  const L = qLang();

  step.beforeIn = qIn.length;
  step.beforeOut = qOut.length;
  step.phiBefore = step.beforeIn;

  if(step.type === 'enqueue'){
    enqueueQueue2StacksManual(step.value);

    step.afterIn = qIn.length;
    step.afterOut = qOut.length;
    step.actualCost = 1;
    step.transferredCount = 0;
    step.phiAfter = step.afterIn;
    step.deltaPhi = step.phiAfter - step.phiBefore;
    step.detail = qBuildSyntaxDetail(step, L);

    if(done)
      done();

    return;
  }

  step.usedTransfer = (qOut.length === 0 && qIn.length > 0);
  step.transferredCount = step.usedTransfer ? qIn.length : 0;

  dequeueQueue2Stacks((removed) => {
    step.afterIn = qIn.length;
    step.afterOut = qOut.length;
    step.phiAfter = step.afterIn;
    step.deltaPhi = step.phiAfter - step.phiBefore;

    if(removed === undefined){
      step.wasEmpty = true;
      step.usedTransfer = false;
      step.transferredCount = 0;
      step.actualCost = 0;
      step.detail = qBuildSyntaxDetail(step, L);

      if(done)
        done();

      return;
    }

    step.removedValue = removed;
    step.wasEmpty = false;
    step.actualCost = step.usedTransfer ? (2 * step.transferredCount + 1) : 1;
    step.detail = qBuildSyntaxDetail(step, L);

    if(done)
      done();
  });
}

function startQueue2StacksSyntaxExample(){
  const L = qLang();
  const inputEl = document.getElementById('syntaxInput');
  const input = (inputEl?.value || '').trim();

  if(!qValidateSyntax(input)){
    if(inputEl)
      inputEl.value = '';
    showAppMessage(L.queueSyntaxInvalidAlert);
    return;
  }

  resetQueue2StacksState();

  qSyntaxCommands = qParseSyntaxCommands(input);
  if(qSyntaxCommands.length === 0){
    if(inputEl)
      inputEl.value = '';
    showAppMessage(L.queueSyntaxInvalidAlert);
    return;
  }

  qSyntaxSteps = qBuildSyntaxSteps(qSyntaxCommands);
  qSyntaxIndex = 0;
  qIsSyntaxMode = true;
  qSynHistory = [];
  qSynHistoryCursor = -1;
  qSynFinished = false;

  $('#syntaxModal').modal('hide');
  displayQueue2StacksSyntaxUI();

  qSetSyntaxNextEnabled(false);
  qExecuteSyntaxStep(qSyntaxSteps[qSyntaxIndex], () => {
    qSynSaveHistoryEntry(qSyntaxSteps[qSyntaxIndex]);
    qSynHistoryCursor = 0;

    if(qSyntaxIndex === qSyntaxSteps.length - 1)
      qSynFinished = true;

    qSetSyntaxNextEnabled(true);
    qSynRenderInfo();
  });
}

function nextQueue2StacksSyntaxStep(){
  if(!qIsSyntaxMode || qSyntaxSteps.length === 0)
    return;
  if(qBusy)
    return;

  if(qSynFinished){
    resetQueue2StacksState();
    returnToMainPageFromSyntax('queue2Stacks');
    return;
  }

  if(qSyntaxIndex < qSyntaxSteps.length - 1){
    qSyntaxIndex++;

    qSetSyntaxNextEnabled(false);
    qExecuteSyntaxStep(qSyntaxSteps[qSyntaxIndex], () => {
      qSynSaveHistoryEntry(qSyntaxSteps[qSyntaxIndex]);
      qSynHistoryCursor = qSynHistory.length - 1;

      if(qSyntaxIndex === qSyntaxSteps.length - 1)
        qSynFinished = true;

      qSetSyntaxNextEnabled(true);
      qSynRenderInfo();
    });
  }
}

function rebuildQueueSyntaxStepsForLanguage(){
  if(!qIsSyntaxMode || qSyntaxCommands.length === 0)
    return;

  const L = qLang();
  const oldSteps = qSyntaxSteps;
  const newSteps = qBuildSyntaxSteps(qSyntaxCommands);

  for(let i = 0; i < Math.min(oldSteps.length, newSteps.length); i++){
    newSteps[i].removedValue = oldSteps[i].removedValue;
    newSteps[i].usedTransfer = oldSteps[i].usedTransfer;
    newSteps[i].wasEmpty = oldSteps[i].wasEmpty;
    newSteps[i].beforeIn = oldSteps[i].beforeIn;
    newSteps[i].beforeOut = oldSteps[i].beforeOut;
    newSteps[i].afterIn = oldSteps[i].afterIn;
    newSteps[i].afterOut = oldSteps[i].afterOut;
    newSteps[i].actualCost = oldSteps[i].actualCost;
    newSteps[i].phiBefore = oldSteps[i].phiBefore;
    newSteps[i].phiAfter = oldSteps[i].phiAfter;
    newSteps[i].deltaPhi = oldSteps[i].deltaPhi;
    newSteps[i].transferredCount = oldSteps[i].transferredCount;
  }

  for(let i = 0; i < newSteps.length; i++){
    if(i <= qSyntaxIndex)
      newSteps[i].detail = qBuildSyntaxDetail(newSteps[i], L);
  }

  qSyntaxSteps = newSteps;
  if(document.getElementById('qSyntaxCurrentStepInfo'))
    updateQueueSyntaxPanels();

  if(Array.isArray(qSynHistory) && qSynHistory.length > 0){
    qSynHistory = qSynHistory.map((entry, i) => {
      const s = qSyntaxSteps[i];
      if(!s)
        return entry;

      return {...entry, title: `${i + 1}/${qSyntaxSteps.length}: ${s.description}`, detailHtml: (s.detail && String(s.detail).trim()) ? s.detail : (L.detailNotProvided || '')};
    });
  }

  if(document.getElementById('qSynPanel'))
    qSynRenderInfo();
}