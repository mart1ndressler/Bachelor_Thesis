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

function mpExecuteStep(step){
  const langData = mpLang();

  if(step.type === 'push'){
    pushToStackManual(step.value);
    const tpl = langData.pushDetail || langData.detailNotProvided || '';

    step.detail = mpFill(tpl, {value: `<span class="pushValue">${step.value}</span>`});
    return;
  }

  if(step.type === 'pop'){
    const removed = popFromStackManual(true);

    if(removed !== undefined){
      step.removedValue = removed;
      const tpl = langData.popDetail || langData.detailNotProvided || '';

      step.detail = mpFill(tpl, {removedValue: `<span class="popValue">${removed}</span>`});
    }
    else{
      const tpl = langData.emptyPopDetail || `<span class="emptyStackMessage">${langData.stackEmptyNoPop || langData.stackEmptyAlert}</span>`;
      step.detail = mpFill(tpl, {});
    }

    return;
  }

  const removedVals = multipopFromStackManual(step.count, true);
  if(removedVals && removedVals.length > 0){
    step.removedValues = removedVals;

    const joined = removedVals.map(v => `<span class="popValue">${v}</span>`).join(', ');
    const k = Math.min(step.count, removedVals.length);
    const tpl = langData.multipopDetail || langData.detailNotProvided || '';

    step.detail = mpFill(tpl, {removedValues: joined, count: `<span class="potentialValue">${k}</span>`});
  }
  else{
    const tpl = langData.emptyMultipopDetail || `<span class="emptyStackMessage">${langData.stackEmptyNoMultipop || langData.stackEmptyAlert}</span>`;
    step.detail = mpFill(tpl, {count: `<span class="potentialValue">${step.count}</span>`});
  }
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

  $('#syntaxModal').modal('hide');
  displaySyntaxUI();

  if(steps.length > 0){
    mpExecuteStep(steps[currentCommandIndex]);
    if(typeof updateMpSyntaxPanels === 'function')
      updateMpSyntaxPanels(currentCommandIndex);

  }
}

function nextSyntaxStep(){
  if(mpBusy)
    return;

  if(currentCommandIndex < steps.length - 1){
    currentCommandIndex++;
    mpExecuteStep(steps[currentCommandIndex]);

    if(typeof updateMpSyntaxPanels === 'function')
      updateMpSyntaxPanels(currentCommandIndex);
  }
  else{
    const langData = mpLang();
    showAppMessage(langData.endOfExample, {
      onClose: () => {
        mpResetState();
        goBack();
      }});
  }
}

function rebuildMpSyntaxStepsForLanguage(){
  if(!Array.isArray(steps) || steps.length === 0)
    return;
  if(!Array.isArray(syntaxCommands) || syntaxCommands.length === 0)
    return;

  const langData = mpLang();
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
    }

    if(i <= currentCommandIndex){
      if(s.type === 'push'){
        const tpl = langData.pushDetail || langData.detailNotProvided || '';
        s.detail = mpFill(tpl, {value: `<span class="pushValue">${s.value}</span>`});
      }
      else if(s.type === 'pop'){
        if(s.removedValue !== undefined){
          const tpl = langData.popDetail || langData.detailNotProvided || '';
          s.detail = mpFill(tpl, {removedValue: `<span class="popValue">${s.removedValue}</span>`});
        }
        else{
          const tpl = langData.emptyPopDetail || `<span class="emptyStackMessage">${langData.stackEmptyNoPop || langData.stackEmptyAlert}</span>`;
          s.detail = mpFill(tpl, {});
        }
      }
      else{
        if(Array.isArray(s.removedValues) && s.removedValues.length > 0){
          const joined = s.removedValues.map(v => `<span class="popValue">${v}</span>`).join(', ');
          const k = Math.min(s.count, s.removedValues.length);
          const tpl = langData.multipopDetail || langData.detailNotProvided || '';
          
          s.detail = mpFill(tpl, {removedValues: joined, count: `<span class="potentialValue">${k}</span>`});
        }
        else{
          const tpl = langData.emptyMultipopDetail || `<span class="emptyStackMessage">${langData.stackEmptyNoMultipop || langData.stackEmptyAlert}</span>`;
          s.detail = mpFill(tpl, {count: `<span class="potentialValue">${s.count}</span>`});
        }
      }
    }
  }
}