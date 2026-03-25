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
      const values = match[2].split(',').map(value => parseInt(value.trim(), 10));
      values.forEach(value => commands.push({type: 'push', value}));

      continue;
    }
    if(token.startsWith('pop')){
      commands.push({type: 'pop'});
      continue;
    }

    commands.push({type: 'multipop', count: parseInt(match[3], 10)});
  }

  return commands;
}

function mpCreateSyntaxSteps(commands){
  return commands.map(command => ({...command, description: mpDescribeStep(command), detail: mpLang().detailNotProvided}));
}

function mpSynSaveHistoryEntry(step){
  const L = mpLang();
  const title = `${currentCommandIndex + 1}/${steps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  mpSynHistory.push({title, detailHtml, snapshot: Array.isArray(step.afterSnapshot) ? [...step.afterSnapshot] : mpMakeStackSnapshot(), stepCount: Number.isFinite(step.afterStepCount) ? step.afterStepCount : stepCount, potential: Number.isFinite(step.afterPotential) ? step.afterPotential : potential});
}

function mpSynRestoreHistoryEntry(index){
  if(index < 0 || index >= mpSynHistory.length)
    return;

  mpSynHistoryCursor = index;

  const entry = mpSynHistory[index];
  mpApplyState(entry.snapshot, entry.stepCount, entry.potential);
  currentCommandIndex = index;

  updateStackView();
  updateCounters();
  mpSynRenderInfo();
  mpSynUpdateFinishUI();
}

function mpSynGoHistory(delta){
  if(!mpSynFinished)
    return;

  const nextIndex = mpSynHistoryCursor + delta;
  if(nextIndex < 0 || nextIndex >= mpSynHistory.length)
    return;

  mpSynRestoreHistoryEntry(nextIndex);
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

function startSyntaxExample(){
  const L = mpLang();
  const inputEl = document.getElementById('syntaxInput');
  const syntaxInput = (inputEl?.value || '').trim();

  if(!mpValidateSyntax(syntaxInput)){
    if(inputEl)
      inputEl.value = '';

    showAppMessage(L.syntaxInvalidAlert || L.invalidNumberAlert);
    return;
  }

  syntaxCommands = mpParseCommands(syntaxInput);
  if(syntaxCommands.length === 0){
    if(inputEl)
      inputEl.value = '';

    showAppMessage(L.syntaxInvalidAlert || L.invalidNumberAlert);
    return;
  }

  steps = mpCreateSyntaxSteps(syntaxCommands);
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
  
  if(currentCommandIndex >= steps.length - 1)
    return;

  currentCommandIndex++;
  mpExecuteStep(steps[currentCommandIndex]);
  mpSynSaveHistoryEntry(steps[currentCommandIndex]);

  mpSynHistoryCursor = mpSynHistory.length - 1;
  if(currentCommandIndex === steps.length - 1)
    mpSynFinished = true;

  mpSynRenderInfo();
}

function rebuildMpSyntaxStepsForLanguage(){
  if(!Array.isArray(steps) || steps.length === 0)
    return;
  if(!Array.isArray(syntaxCommands) || syntaxCommands.length === 0)
    return;

  const L = mpLang();
  const executedCount = mpSynFinished ? steps.length : mpSynHistory.length;

  for(let index = 0; index < steps.length; index++){
    const command = syntaxCommands[index];
    const step = steps[index];

    Object.assign(step, command);
    step.description = mpDescribeStep(command, L);

    if(index < executedCount)
      step.detail = mpBuildStepDetail(step, L);
  }

  if(Array.isArray(mpSynHistory) && mpSynHistory.length > 0){
    mpSynHistory = mpSynHistory.map((entry, index) => {
      const step = steps[index];
      if(!step)
        return entry;

      return {...entry, title: `${index + 1}/${steps.length}: ${step.description}`, detailHtml: (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '')};
    });
  }

  if(document.getElementById('mpSynPanel'))
    mpSynRenderInfo();
}