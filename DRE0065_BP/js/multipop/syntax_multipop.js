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
  if(input)
    input.value = '';

  const btn = document.getElementById('startSyntaxBtn');
  if(btn)
    btn.onclick = startSyntaxExample;

  const form = document.getElementById('syntaxForm');
  if(form)
    form.style.display = 'block';
  if(btn)
    btn.style.display = 'block';
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
    }
    else if(token.startsWith('pop'))
      commands.push({type: 'pop'});
    else
      commands.push({type: 'multipop', count: parseInt(match[3], 10)});
  }

  return commands;
}

function generateSteps(commands){
  const langData = mpLang();

  return commands.map(cmd => {
    if(cmd.type === 'push')
      return {type:'push', value: cmd.value, description: `${langData.pushButton} ${cmd.value}`, detail: langData.pushDetail || langData.detailNotProvided};
    
    if(cmd.type === 'pop')
      return {type:'pop', description: `${langData.popButton}`, detail: langData.popDetail || langData.detailNotProvided};

    return {type:'multipop', count: cmd.count, description: `${langData.multipopButton}(${cmd.count})`, detail: langData.multipopDetail || langData.detailNotProvided};
  });
}

function executeStep(step){
  const langData = mpLang();

  if(step.type === 'push'){
    pushToStackManual(step.value);
    const tpl = langData.pushDetail || langData.detailNotProvided || '';
    step.detail = mpFill(tpl, {value: `<span class="pushValue">${step.value}</span>`});
    return;
  }

  if(step.type === 'pop'){
    const removed = popFromStackManual();
    if(removed !== undefined){
      step.removedValue = removed;
      const tpl = langData.popDetail || langData.detailNotProvided || '';
      step.detail = mpFill(tpl, {removedValue: `<span class="popValue">${removed}</span>`});
    }
    else
      step.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoPop || langData.stackEmptyAlert}</span>`;

    return;
  }

  const removedVals = multipopFromStackManual(step.count);
  if(removedVals && removedVals.length > 0){
    step.removedValues = removedVals;
    const joined = removedVals.map(v => `<span class="popValue">${v}</span>`).join(', ');
    const k = Math.min(step.count, removedVals.length);

    const tpl = langData.multipopDetail || langData.detailNotProvided || '';
    step.detail = mpFill(tpl, {removedValues: joined, count: `<span class="potentialValue">${k}</span>`});
  }
  else
    step.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoMultipop || langData.stackEmptyAlert}</span>`;
}

function startSyntaxExample(){
  const langData = mpLang();
  const syntaxInput = document.getElementById('syntaxInput').value.trim();
  if(!validateSyntax(syntaxInput)){
    alert(langData.invalidNumberAlert);
    return;
  }

  syntaxCommands = parseCommands(syntaxInput);
  if(syntaxCommands.length === 0){
    alert(langData.invalidNumberAlert);
    return;
  }

  steps = generateSteps(syntaxCommands);
  currentCommandIndex = 0;

  $('#syntaxModal').modal('hide');
  displaySyntaxUI();

  if(steps.length > 0){
    executeStep(steps[currentCommandIndex]);

    const s = steps[currentCommandIndex];
    const infoEl = document.getElementById('currentStepInfo');
    const detailEl = document.getElementById('detailedStepInfo');

    if(typeof updateMpSyntaxPanels === 'function')
      updateMpSyntaxPanels(currentCommandIndex);
  }
}

function nextSyntaxStep(){
  const langData = mpLang();
  if(mpBusy)
    return;

  if(currentCommandIndex < steps.length - 1){
    currentCommandIndex++;
    executeStep(steps[currentCommandIndex]);

    const s = steps[currentCommandIndex];
    const infoEl = document.getElementById('currentStepInfo');
    const detailEl = document.getElementById('detailedStepInfo');

    if(typeof updateMpSyntaxPanels === 'function')
      updateMpSyntaxPanels(currentCommandIndex);
  }
  else{
    showAppMessage(langData.endOfExample, {
      onClose: () => {stackArray = []; steps = []; stepCount = 0; potential = 0; isBestWorstMode = false; mpBusy = false;
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
        else 
          s.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoPop || langData.stackEmptyAlert}</span>`;
      }
      else{
        if(Array.isArray(s.removedValues) && s.removedValues.length > 0){
          const joined = s.removedValues.map(v => `<span class="popValue">${v}</span>`).join(', ');
          const k = Math.min(s.count, s.removedValues.length);
          const tpl = langData.multipopDetail || langData.detailNotProvided || '';
          s.detail = mpFill(tpl, {removedValues: joined, count: `<span class="potentialValue">${k}</span>`});
        }
        else
          s.detail = `<span class="emptyStackMessage">${langData.stackEmptyNoMultipop || langData.stackEmptyAlert}</span>`;
      }
    }
  }
}