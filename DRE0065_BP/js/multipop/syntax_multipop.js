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

function mpSynSchedulePreviewHide(){
  mpClearSyntaxPreviewHideTimer();
}

function mpSynFormatPreviewStep(step){
  return step ? mpDescribeStep(step, mpLang()) : '';
}

function mpSynGetPreviewState(){
  if(!Array.isArray(steps) || steps.length === 0)
    return {prev: '', current: '', next: ''};

  if(mpSynHistory.length === 0)
    return {prev: '', current: '', next: mpSynFormatPreviewStep(steps[0])};

  const index = mpSynFinished && mpSynHistoryCursor >= 0 ? mpSynHistoryCursor : currentCommandIndex;
  return {prev: mpSynFormatPreviewStep(steps[index - 1]), current: mpSynFormatPreviewStep(steps[index]), next: mpSynFormatPreviewStep(steps[index + 1])};
}

function mpSynRenderPreview(animate = false){
  typesParamsSetOperationPreviewVisible('mp', mpSynPreviewVisible);
  if(!mpSynPreviewVisible)
    return;

  typesParamsUpdateOperationPreview('mp', mpSynGetPreviewState(), animate);
}

function mpSynSaveHistoryEntry(step){
  const L = mpLang();
  const prevTotal = mpSynHistory.length ? (steps[mpSynHistory.length - 1]?.totalAmortizedCost ?? 0) : 0;

  mpDecorateRecordedStep(step, prevTotal, L);

  const title = `${currentCommandIndex + 1}/${steps.length}: ${step.description}`;
  const detailHtml = (step.detail && String(step.detail).trim()) ? step.detail : (L.detailNotProvided || '');

  mpSynHistory.push({title, detailHtml, snapshot: Array.isArray(step.afterSnapshot) ? [...step.afterSnapshot] : mpMakeStackSnapshot(), stepCount: Number.isFinite(step.afterStepCount) ? step.afterStepCount : stepCount, potential: Number.isFinite(step.afterPotential) ? step.afterPotential : potential});
  updateCounters();
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

function mpSynReplayNextFromHistory(){
  if(!mpSynFinished || mpBusy)
    return;
  if(mpSynHistoryCursor < 0 || mpSynHistoryCursor >= steps.length - 1)
    return;

  const nextIndex = mpSynHistoryCursor + 1;

  mpSkipAnimations = false;
  currentCommandIndex = nextIndex;
  mpSynHistoryCursor = nextIndex;

  mpExecuteStep(steps[currentCommandIndex]);
  mpSynRenderInfo();
}

function mpSynGoHistory(delta){
  if(!mpSynFinished)
    return;

  if(delta < 0){
    const nextIndex = mpSynHistoryCursor - 1;
    if(nextIndex < 0)
      return;

    mpSynRestoreHistoryEntry(nextIndex);
    return;
  }

  mpSynReplayNextFromHistory();
}

function mpSynBuildHistoryModalHtml(){
  const L = mpLang();

  if(!Array.isArray(mpSynHistory) || mpSynHistory.length === 0)
    return buildEmptyHistoryWatermarkHtml();

  return mpSynHistory.map(entry => buildCollapsibleHistoryEntryHtml({title: entry.title, metaHtml: `${L.stepCount}: ${entry.stepCount} | ${L.potential}: ${entry.potential}`, detailHtml: entry.detailHtml})).join('');
}

function mpSynOpenHistoryModal(){
  openSyntaxHistoryModal('', '', () => {
    const L = mpLang();
    return {title: `${L.syntaxHistoryTitle || 'Syntax mode history'} – ${L.multipopTitle || 'Multipop on Stack'}`, bodyHtml: mpSynBuildHistoryModalHtml()};
  });
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
  mpSynPreviewVisible = true;

  $('#syntaxModal').modal('hide');
  displaySyntaxUI();

  if(steps.length > 0){
    mpExecuteStep(steps[currentCommandIndex]);
    mpSynSaveHistoryEntry(steps[currentCommandIndex]);

    mpSynHistoryCursor = 0;
    updateCounters();

    if(currentCommandIndex === steps.length - 1)
      mpSynFinished = true;

    mpSynRenderInfo();

    if(mpSynFinished){
      mpSynRenderPreview(true);
      mpSynSchedulePreviewHide();
    }
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
  updateCounters();

  if(currentCommandIndex === steps.length - 1)
    mpSynFinished = true;

  mpSynRenderInfo();

  if(mpSynFinished){
    mpSynRenderPreview(true);
    mpSynSchedulePreviewHide();
  }
  else if(mpSynPreviewVisible)
    mpSynRenderPreview(true);
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