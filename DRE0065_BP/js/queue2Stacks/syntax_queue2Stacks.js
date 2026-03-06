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

function qSetSyntaxNextEnabled(enabled){
  const btn = document.getElementById('syntaxNextBtn');
  if(btn)
    btn.disabled = !enabled;
}

function qExecuteSyntaxStep(step, done){
  const L = qLang();

  if(step.type === 'enqueue'){
    enqueueQueue2StacksManual(step.value);
    step.detail = (L.queueEnqueueDetail || L.detailNotProvided).replace('{value}', `<span class="pushValue">${step.value}</span>`);
    if(done)
        done();

    return;
  }

  const usedTransfer = (qOut.length === 0 && qIn.length > 0);
  step.usedTransfer = usedTransfer;

  dequeueQueue2Stacks((removed) => {
    if(removed === undefined){
      step.wasEmpty = true;
      step.detail = `<span class="emptyStackMessage">${L.queueEmptyNoDequeue}</span>`;
      if(done)
        done();

      return;
    }

    step.removedValue = removed;
    const key = usedTransfer ? 'queueDequeueDetailTransfer' : 'queueDequeueDetailSimple';
    step.detail = (L[key] || L.detailNotProvided).replace('{removedValue}', `<span class="popValue">${removed}</span>`).replace('{potential}', `<span class="potentialValue">${qPotential}</span>`);

    if(done)
      done();
  }, true);
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

  $('#syntaxModal').modal('hide');
  displayQueue2StacksSyntaxUI();

  qSetSyntaxNextEnabled(false);
  qExecuteSyntaxStep(qSyntaxSteps[qSyntaxIndex], () => {
    updateQueueSyntaxPanels(qSyntaxIndex);
    qSetSyntaxNextEnabled(true);
  });
}

function nextQueue2StacksSyntaxStep(){
  const L = qLang();

  if(!qIsSyntaxMode || qSyntaxSteps.length === 0)
    return;
  if(qBusy)
    return;

  if(qSyntaxIndex < qSyntaxSteps.length - 1){
    qSyntaxIndex++;

    qSetSyntaxNextEnabled(false);
    qExecuteSyntaxStep(qSyntaxSteps[qSyntaxIndex], () => {
      updateQueueSyntaxPanels(qSyntaxIndex);
      qSetSyntaxNextEnabled(true);
    });
  }
  else{
    showAppMessage(L.endOfExample, {
      onClose: () => {
        resetQueue2StacksState();
        goBack();
      }});
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
  }

  for(const s of newSteps){
    if(s.type === 'enqueue')
        s.detail = (L.queueEnqueueDetail || L.detailNotProvided).replace('{value}', `<span class="pushValue">${s.value}</span>`);

    if(s.type === 'dequeue'){
      if(s.wasEmpty)
        s.detail = `<span class="emptyStackMessage">${L.queueEmptyNoDequeue}</span>`;
      else if(s.removedValue !== undefined){
        const key = s.usedTransfer ? 'queueDequeueDetailTransfer' : 'queueDequeueDetailSimple';
        s.detail = (L[key] || L.detailNotProvided).replace('{removedValue}', `<span class="popValue">${s.removedValue}</span>`).replace('{potential}', `<span class="potentialValue">${qPotential}</span>`);
      }
      else
        s.detail = L.detailNotProvided;
    }
  }

  qSyntaxSteps = newSteps;
  if(document.getElementById('qSyntaxCurrentStepInfo'))
    updateQueueSyntaxPanels(qSyntaxIndex);
}