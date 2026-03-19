function mpValidateSyntax(input){
  const syntaxPattern = /^((push\([1-9]\d*(?:,[1-9]\d*)*\)|pop\(\)|multipop\([1-9]\d*\))\s*)+$/i;
  return syntaxPattern.test(input);
}

function mpParseCommands(input){
  const commandPattern = /(push\((\d+(?:,\d+)*)\)|pop\(\)|multipop\((\d+)\))/gi;
  const commands = [];
  let match;

  while((match = commandPattern.exec(input)) !== null){
    const token = match[1].toLowerCase();

    if(token.startsWith('push')){
      const values = match[2].split(',').map(v => parseInt(v.trim(), 10));
      values.forEach(v => commands.push({type: 'push', value: v}));
    }
    else if(token.startsWith('pop'))
      commands.push({type: 'pop'});
    else
      commands.push({type: 'multipop', count: parseInt(match[3], 10)});
  }

  return commands;
}

function mpGenerateSteps(commands){
  const langData = mpLang();

  return commands.map(cmd => {
    if(cmd.type === 'push')
      return {type:'push', value: cmd.value, description: `${langData.pushButton} ${cmd.value}`, detail: langData.pushDetail || langData.detailNotProvided};
    
    if(cmd.type === 'pop')
      return {type:'pop', description: `${langData.popButton}`, detail: langData.popDetail || langData.detailNotProvided};

    return {type:'multipop', count: cmd.count, description: `${langData.multipopButton}(${cmd.count})`, detail: langData.multipopDetail || langData.detailNotProvided};
  });
}

function mpSigned(n){
  const x = Number(n);
  if(!Number.isFinite(x))
    return '0';

  return x > 0 ? `+${x}` : String(x);
}

function mpBuildStepDetail(step, langData = mpLang()){
  const num = (v) => `<span class="potentialValue">${v}</span>`;
  const pushVal = (v) => `<span class="pushValue">${v}</span>`;
  const popVal = (v) => `<span class="popValue">${v}</span>`;

  const common = {actualCost: num(step.actualCost ?? 0), phiBefore: num(step.phiBefore ?? 0), phiAfter: num(step.phiAfter ?? 0), deltaPhi: num(mpSigned(step.deltaPhi ?? 0)), beforeSize: num(step.beforeSize ?? 0), afterSize: num(step.afterSize ?? 0), requestedCount: num(step.requestedCount ?? step.count ?? 0), actualCount: num(step.actualCount ?? 0)};
  if(step.type === 'push')
    return mpFill(langData.pushDetail || langData.detailNotProvided || '', {...common, value: pushVal(step.value)});

  if(step.type === 'pop'){
    if(step.removedValue !== undefined)
      return mpFill(langData.popDetail || langData.detailNotProvided || '', {...common, removedValue: popVal(step.removedValue)});

    return mpFill(langData.emptyPopDetail || langData.detailNotProvided || '', common);
  }

  if(Array.isArray(step.removedValues) && step.removedValues.length > 0)
    return mpFill(langData.multipopDetail || langData.detailNotProvided || '', {...common, removedValues: step.removedValues.map(v => popVal(v)).join(', ')});

  return mpFill(langData.emptyMultipopDetail || langData.detailNotProvided || '', common);
}

function mpSynMakeSnapshot(){
  return [...stackArray];
}

function mpCanUseManualHistory(){
  return !isBestWorstMode && !document.getElementById('mpSynPanel');
}

function mpHistoryStepDescription(step, L = mpLang()){
  if(!step)
    return '';
  if(step.type === 'push')
    return `${L.pushButton} ${step.value}`;
  if(step.type === 'pop')
    return `${L.popButton}`;
  if(step.type === 'multipop')
    return `${L.multipopButton}(${step.requestedCount ?? step.count ?? 0})`;

  return step.description || '';
}

function mpManualHistoryTitle(index, step, L = mpLang()){
  return `${index + 1}. ${L.historyCommandLabel || 'Command'}: ${mpHistoryStepDescription(step, L)}`;
}

function mpManualSaveHistoryEntry(step, {snapshot = null, stepCountValue = null, potentialValue = null} = {}){
  mpManualHistory.push({step: JSON.parse(JSON.stringify(step)), snapshot: Array.isArray(snapshot) ? [...snapshot] : (Array.isArray(step.afterSnapshot) ? [...step.afterSnapshot] : mpSynMakeSnapshot()), stepCount: Number.isFinite(stepCountValue) ? stepCountValue : (Number.isFinite(step.afterStepCount) ? step.afterStepCount : stepCount), potential: Number.isFinite(potentialValue) ? potentialValue : (Number.isFinite(step.afterPotential) ? step.afterPotential : potential)});
}

function mpManualBuildHistoryModalHtml(){
  const L = mpLang();

  if(!Array.isArray(mpManualHistory) || mpManualHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return mpManualHistory.map((entry, i) => {
    const step = entry.step || {};
    const title = mpManualHistoryTitle(i, step, L);
    const detailHtml = mpBuildStepDetail(step, L);

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

function mpManualOpenHistoryModal(){
  openSyntaxHistoryModal('', '',
    () => {
      const L = mpLang();
      return {title: `${L.historyModalBaseTitle || 'History'} – ${L.multipopTitle || 'Multipop on Stack'}`, bodyHtml: mpManualBuildHistoryModalHtml()};
    }
  );
}

function mpManualSeedHistoryFromValues(values){
  mpManualHistory = [];

  if(!Array.isArray(values) || values.length === 0)
    return;

  const L = mpLang();
  const tempStack = [];
  let tempStepCount = 0;
  let tempPotential = 0;

  for(const value of values){
    const step = {type: 'push', value, description: `${L.pushButton} ${value}`, beforeSize: tempStack.length, phiBefore: tempPotential};

    tempStack.push(value);
    tempStepCount += 1;
    tempPotential = tempStack.length;

    step.afterSnapshot = [...tempStack];
    step.afterSize = tempStack.length;
    step.actualCost = 1;
    step.phiAfter = tempPotential;
    step.deltaPhi = step.phiAfter - step.phiBefore;
    step.afterStepCount = tempStepCount;
    step.afterPotential = tempPotential;

    mpManualSaveHistoryEntry(step, {snapshot: [...tempStack], stepCountValue: tempStepCount, potentialValue: tempPotential});
  }
}

function mpSynSaveHistoryEntry(step){
  const L = mpLang();
  const title = `${currentCommandIndex + 1}/${steps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  mpSynHistory.push({title, detailHtml, snapshot: Array.isArray(step.afterSnapshot) ? [...step.afterSnapshot] : mpSynMakeSnapshot(), stepCount: Number.isFinite(step.afterStepCount) ? step.afterStepCount : stepCount, potential: Number.isFinite(step.afterPotential) ? step.afterPotential : potential});
}

function mpSynRestoreHistoryEntry(index){
  if(index < 0 || index >= mpSynHistory.length)
    return;

  mpSynHistoryCursor = index;

  const entry = mpSynHistory[index];
  stackArray = [...entry.snapshot];
  stepCount = entry.stepCount;
  potential = entry.potential;
  currentCommandIndex = index;

  updateStackView();
  updateCounters();
  mpSynRenderInfo();
  mpSynUpdateFinishUI();
}

function mpSynGoHistory(delta){
  if(!mpSynFinished)
    return;

  const next = mpSynHistoryCursor + delta;
  if(next < 0 || next >= mpSynHistory.length)
    return;

  mpSynRestoreHistoryEntry(next);
}

function mpSynBuildHistoryModalHtml(){
  const L = mpLang();

  if(!Array.isArray(mpSynHistory) || mpSynHistory.length === 0)
    return `<div class="syntax-history-entry">${L.detailNotProvided || 'Detail not provided.'}</div>`;

  return mpSynHistory.map(entry => `
    <div class="syntax-history-entry">
      <div class="info-panel-title">${entry.title}</div>
      <div class="syntax-history-meta">
        ${L.stepCount}: ${entry.stepCount} |
        ${L.potential}: ${entry.potential}
      </div>
      <div class="info-step-detail">${entry.detailHtml}</div>
    </div>`).join('');
}

function mpSynOpenHistoryModal(){
  const L = mpLang();
  openSyntaxHistoryModal(`${L.syntaxHistoryTitle || 'Syntax mode history'} – ${L.multipopTitle || 'Multipop on Stack'}`, mpSynBuildHistoryModalHtml());
}

function mpExecuteStep(step){
  const langData = mpLang();

  delete step.removedValue;
  delete step.removedValues;
  delete step.actualCount;
  delete step.afterSnapshot;
  delete step.afterStepCount;
  delete step.afterPotential;

  const beforeSnapshot = [...stackArray];
  const beforeStepCount = stepCount;
  const beforePotential = potential;

  if(step.type === 'push'){
    step.beforeSize = beforeSnapshot.length;
    step.phiBefore = beforePotential;

    pushToStackManual(step.value);

    step.afterSnapshot = [...beforeSnapshot, step.value];
    step.afterSize = step.afterSnapshot.length;
    step.phiAfter = step.afterSize;
    step.actualCost = 1;
    step.deltaPhi = step.phiAfter - step.phiBefore;
    step.afterStepCount = beforeStepCount + 1;
    step.afterPotential = step.afterSize;
    step.detail = mpBuildStepDetail(step, langData);

    return;
  }

  if(step.type === 'pop'){
    step.beforeSize = beforeSnapshot.length;
    step.phiBefore = beforePotential;

    const removed = popFromStackManual();
    if(removed !== undefined){
      step.removedValue = removed;
      step.afterSnapshot = beforeSnapshot.slice(0, -1);
      step.actualCost = 1;
    }
    else{
      step.afterSnapshot = [...beforeSnapshot];
      step.actualCost = 0;
    }

    step.afterSize = step.afterSnapshot.length;
    step.phiAfter = step.afterSize;
    step.deltaPhi = step.phiAfter - step.phiBefore;
    step.afterStepCount = beforeStepCount + step.actualCost;
    step.afterPotential = step.afterSize;
    step.detail = mpBuildStepDetail(step, langData);
    
    return;
  }

  step.beforeSize = beforeSnapshot.length;
  step.phiBefore = beforePotential;
  step.requestedCount = step.count;

  const removedValsFromFn = multipopFromStackManual(step.count) || [];
  const realRemovedCount = Math.min(step.count, beforeSnapshot.length);

  let removedVals = removedValsFromFn;
  if(!Array.isArray(removedVals) || removedVals.length !== realRemovedCount)
    removedVals = beforeSnapshot.slice(beforeSnapshot.length - realRemovedCount).reverse();

  step.actualCount = realRemovedCount;
  step.actualCost = realRemovedCount;
  step.afterSnapshot = beforeSnapshot.slice(0, beforeSnapshot.length - realRemovedCount);
  step.afterSize = step.afterSnapshot.length;
  step.afterStepCount = beforeStepCount + realRemovedCount;
  step.afterPotential = step.afterSize;

  if(realRemovedCount > 0)
    step.removedValues = removedVals;

  step.phiAfter = step.afterPotential;
  step.deltaPhi = step.phiAfter - step.phiBefore;
  step.detail = mpBuildStepDetail(step, langData);

  const syncFinalMultipopState = () => {
    if(mpBusy){
      setTimeout(syncFinalMultipopState, 20);
      return;
    }

    stackArray = [...step.afterSnapshot];
    stepCount = step.afterStepCount;
    potential = step.afterPotential;

    updateStackView();
    updateCounters();
  };

  syncFinalMultipopState();
}

function startSyntaxExample(){
  const langData = mpLang();
  const inputEl = document.getElementById('syntaxInput');
  const syntaxInput = (inputEl?.value || '').trim();

  if(!mpValidateSyntax(syntaxInput)){
    if(inputEl)
      inputEl.value = '';

    showAppMessage(langData.syntaxInvalidAlert || langData.invalidNumberAlert);
    return;
  }

  syntaxCommands = mpParseCommands(syntaxInput);
  if(syntaxCommands.length === 0){
    if(inputEl)
      inputEl.value = '';

    showAppMessage(langData.syntaxInvalidAlert || langData.invalidNumberAlert);
    return;
  }

  steps = mpGenerateSteps(syntaxCommands);
  currentCommandIndex = 0;
  mpSynHistory = [];
  mpSynHistoryCursor = -1;
  mpSynFinished = false;

  $('#syntaxModal').modal('hide');
  displaySyntaxUI();

  if(steps.length > 0){
    mpExecuteStep(steps[currentCommandIndex]);
    mpSynSaveHistoryEntry(steps[currentCommandIndex]);

    mpSynHistoryCursor = 0;
    if(currentCommandIndex === steps.length - 1)
      mpSynFinished = true;

    mpSynRenderInfo();
  }
}

function nextSyntaxStep(){
  if(mpBusy)
    return;

  if(mpSynFinished){
    mpResetState();
    returnToMainPageFromSyntax('multipop');
    return;
  }

  if(currentCommandIndex < steps.length - 1){
    currentCommandIndex++;
    mpExecuteStep(steps[currentCommandIndex]);
    mpSynSaveHistoryEntry(steps[currentCommandIndex]);

    mpSynHistoryCursor = mpSynHistory.length - 1;
    if(currentCommandIndex === steps.length - 1)
      mpSynFinished = true;

    mpSynRenderInfo();
  }
}

function rebuildMpSyntaxStepsForLanguage(){
  if(!Array.isArray(steps) || steps.length === 0)
    return;
  if(!Array.isArray(syntaxCommands) || syntaxCommands.length === 0)
    return;

  const langData = mpLang();
  const executedCount = mpSynFinished ? steps.length : mpSynHistory.length;
  
  for(let i = 0; i < steps.length; i++){
    const cmd = syntaxCommands[i];
    const s = steps[i];

    if(cmd.type === 'push'){
      s.description = `${langData.pushButton} ${cmd.value}`;
      s.value = cmd.value;
    }
    else if(cmd.type === 'pop')
      s.description = `${langData.popButton}`;
    else{
      s.description = `${langData.multipopButton}(${cmd.count})`;
      s.count = cmd.count;
      s.requestedCount = cmd.count;
    }

    if(i < executedCount)
      s.detail = mpBuildStepDetail(s, langData);
  }
  
  if(Array.isArray(mpSynHistory) && mpSynHistory.length > 0){
    mpSynHistory = mpSynHistory.map((entry, i) => {
      const s = steps[i];
      if(!s)
        return entry;

      return {...entry, title: `${i + 1}/${steps.length}: ${s.description}`, detailHtml: (s.detail && String(s.detail).trim()) ? s.detail : (langData.detailNotProvided || '')};
    });
  }

  if(document.getElementById('mpSynPanel'))
    mpSynRenderInfo();
}