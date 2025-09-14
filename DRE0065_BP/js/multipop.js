let stackArray = [], stepCount = 0, potential = 0, syntaxCommands = [], currentCommandIndex = 0, steps = [], isBestWorstMode = false;

function updateStackView(){
    const stackView = document.getElementById('stackView');
    if(stackView) stackView.innerHTML = stackArray.map(value => `<div class="stack-item">${value}</div>`).join('');
}

function displayStack(stackArray){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const dynamicContent = document.getElementById('dynamicContent');
    const buttonsHtml = isBestWorstMode ? '' : `
        <div id="multipop_buttons">
          <button class="btn btn-primary btn-lg" onclick="pushToStack()">${langData.pushButton}</button>
          <button class="btn btn-primary btn-lg" onclick="popFromStack()">${langData.popButton}</button>
          <button class="btn btn-primary btn-lg" onclick="multipopFromStack()">${langData.multipopButton}</button>
        </div>
    `;

    if(dynamicContent) 
    {
        dynamicContent.innerHTML = `
            <div id="mainContainer">
                <div id="stackContainer">
                    <div id="stackView" class="stack-view">
                        ${stackArray.map(value => `<div class="stack-item">${value}</div>`).join('')}
                    </div>
                </div>
                <div class="stack-controls">
                    <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
                    <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>
                    ${buttonsHtml}
                </div>
            </div>
        `;
    }
}

function displaySyntaxUI(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const dynamicContent = document.getElementById('dynamicContent');

    if(dynamicContent) 
    {
      dynamicContent.innerHTML = `
        <div id="mainContainer" style="display: flex; gap: 20px;">
          <div id="stackContainer">
            <div id="stackView" class="stack-view">
                ${stackArray.map(value => `<div class="stack-item">${value}</div>`).join('')}
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
            <div id="currentStepInfo"></div>
            <div id="detailedStepInfo"></div>
          </div>
        </div>
      `;
    }

    const syntaxNextBtn = document.getElementById('syntaxNextBtn');
    if(syntaxNextBtn) syntaxNextBtn.addEventListener('click', function() {nextSyntaxStep();});
}

function updateStepCount(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const stepCountDisplay = document.getElementById('stepCountDisplay');

    if(stepCountDisplay) stepCountDisplay.innerText = `${langData.stepCount}: ${stepCount}`;
}

function updatePotential(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const potentialDisplay = document.getElementById('potentialDisplay');

    if(potentialDisplay) potentialDisplay.innerHTML = `${langData.potential}: <span class="potentialValue">${potential}</span>`;
}

function pushToStackManual(value){
    stackArray.push(value);
    stepCount++;
    potential++;

    if(!isBestWorstMode && steps.length > 0) updateStackView();
    else displayStack(stackArray);

    const stackItems = document.querySelectorAll('.stack-item');
    const newItem = stackItems[stackItems.length - 1];
    if(newItem) newItem.classList.add('new-item');
    updateStepCount();
    updatePotential();
}

function popFromStackManual(){
    if(stackArray.length > 0) 
    {
        const removedValue = stackArray[stackArray.length - 1];
        const stackItems = document.querySelectorAll('.stack-item');
        const removedItem = stackItems[stackItems.length - 1];
        if(!removedItem) return undefined;

        removedItem.classList.add('removed-item');
        removedItem.addEventListener('animationend', () => 
        {
            stackArray.pop();
            stepCount++;
            potential = Math.max(0, potential - 1);

            if(!isBestWorstMode && steps.length > 0) updateStackView();
            else displayStack(stackArray);

            updateStepCount();
            updatePotential();
        }, {once: true});
        return removedValue;
    } 
    else 
    {
        const language = localStorage.getItem('language') || 'en';
        alert(translations[language].stackEmptyAlert);
        return undefined;
    }
}

function multipopFromStackManual(count){
    if(count > 0) 
    {
        const removedVals = stackArray.slice(-count);
        stepCount++;
        potential = Math.max(0, potential - count);

        const allStackItems = document.querySelectorAll('.stack-item');
        const allStackItemsArr = Array.from(allStackItems);
        const removingItems = allStackItemsArr.slice(-count);
        let finishedCount = 0;

        removingItems.forEach((item) => 
        {
            item.classList.add('removed-item');
            item.addEventListener('animationend', () => 
            {
              finishedCount++;
              if(finishedCount === removingItems.length) 
              {
                for(let i = 0; i < count; i++) stackArray.pop();
                if(!isBestWorstMode && steps.length > 0) updateStackView();
                else displayStack(stackArray);

                updateStepCount();
                updatePotential();
              }
            }, {once: true});
        });
        return removedVals;
    } 
    else 
    {
        const language = localStorage.getItem('language') || 'en';
        alert(translations[language].invalidNumberAlert);
        return null;
    }
}

function pushToStack(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const value = prompt(langData.enterValuePrompt);

    if(value && !isNaN(value) && Number(value) > 0) pushToStackManual(parseInt(value));
    else alert(langData.invalidNumberAlert);
}
function popFromStack() {popFromStackManual();}

function multipopFromStack(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const count = parseInt(prompt(langData.multipopPrompt), 10);

    if(!isNaN(count) && count > 0) multipopFromStackManual(count);
    else alert(langData.invalidNumberAlert);
}

document.addEventListener('DOMContentLoaded', function (){
    const nextStepBtn = document.getElementById('nextStepBtn');
    if(nextStepBtn) nextStepBtn.addEventListener('click', nextSyntaxStep);
});

function openSyntaxModal(){
    $('#syntaxModal').modal('show');
    stackArray = [], stepCount = 0, potential = 0, syntaxCommands = [], steps = [], currentCommandIndex = 0;
    updateStepCount();
    updatePotential();
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];

    document.getElementById('syntaxModalLabel').textContent = langData.syntaxModalLabel;
    document.getElementById('syntaxInfo').innerHTML = langData.syntaxInfo;
    document.getElementById('syntaxInputLabel').textContent = langData.syntaxInputLabel;
    document.getElementById('syntaxInput').placeholder = langData.syntaxInputPlaceholder;
    document.getElementById('exampleInfo').textContent = langData.exampleInfo;
    document.getElementById('nextStepBtn').textContent = langData.nextButton;
    document.getElementById('startSyntaxBtn').textContent = langData.startSyntaxBtn;
    document.getElementById('syntaxInput').value = '';
    document.getElementById('syntaxExample').style.display = 'none';
    document.getElementById('currentStepInfo').innerHTML = '';
    document.getElementById('syntaxForm').style.display = 'block';
    document.getElementById('startSyntaxBtn').style.display = 'block';
}

function startSyntaxExample(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const syntaxInput = document.getElementById('syntaxInput').value.trim();

    if(!validateSyntax(syntaxInput)) {alert(langData.invalidNumberAlert); return;}
    syntaxCommands = parseCommands(syntaxInput);
    if(syntaxCommands.length === 0) {alert(langData.invalidNumberAlert); return;}
    steps = generateSteps(syntaxCommands); 
    currentCommandIndex = 0;

    document.getElementById('syntaxForm').style.display = 'none';
    document.getElementById('startSyntaxBtn').style.display = 'none';
    document.getElementById('syntaxExample').style.display = 'none';
    $('#syntaxModal').modal('hide');
    displaySyntaxUI();

    if(steps.length > 0) 
    {
        executeStep(steps[currentCommandIndex]);
        document.getElementById('currentStepInfo').innerHTML = `${currentCommandIndex + 1}. ${steps[currentCommandIndex].description}`;
        document.getElementById('detailedStepInfo').innerHTML = steps[currentCommandIndex].detail || "Detail not provided.";
    }
}

function validateSyntax(input){
    const syntaxPattern = /^((push\(\d+(?:,\d+)*\)|pop\(\)|multipop\(\d+\))\s*)+$/i;
    return syntaxPattern.test(input);
}

function parseCommands(input){
    const commandPattern = /(push\((\d+(?:,\d+)*)\)|pop\(\)|multipop\((\d+)\))/gi;
    let match;
    const commands = [];
    while((match = commandPattern.exec(input)) !== null) 
    {
        if(match[1].toLowerCase().startsWith('push')) 
        {
            const values = match[2].split(',').map(v => parseInt(v.trim()));
            values.forEach(value => { commands.push({type: 'push', value: value}); });
        }
        else if(match[1].toLowerCase().startsWith('pop')) commands.push({type: 'pop'});
        else if(match[1].toLowerCase().startsWith('multipop')) 
        {
            const count = parseInt(match[3]);
            commands.push({type: 'multipop', count: count});
        }
    }
    return commands;
}

function generateSteps(commands){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const steps = [];

    commands.forEach(command => 
    {
      if(command.type === 'push') steps.push({type: 'push', value: command.value, description: `Push ${command.value}`, detail: langData.pushDetail ? langData.pushDetail.replace('{value}', '{value}') : `Pushing {value}... (No detail found)`});
      else if(command.type === 'pop') steps.push({type: 'pop', description: `Pop`, detail: langData.popDetail ? langData.popDetail.replace('{removedValue}', '{removedValue}') : "Removing top element... (No detail found)"});
      else if(command.type === 'multipop') steps.push({type: 'multipop', count: command.count, description: `Multipop(${command.count})`, detail: langData.multipopDetail ? langData.multipopDetail.replace('{count}', command.count).replace('{removedValues}', '{removedValues}') : `Multipop of ${command.count} elements... (No detail found)`});
    });
    return steps;
}

function executeStep(step){
    if(step.type === 'push')
    {
        pushToStackManual(step.value);
        if(step.detail && step.value !== undefined) step.detail = step.detail.replace('{value}', `<span class="pushValue">${step.value}</span>`);
    }
    else if(step.type === 'pop')
    {
        const removed = popFromStackManual();
        if(removed !== undefined)
        {
            step.removedValue = removed;
            if(step.detail) step.detail = step.detail.replace('{removedValue}', `<span class="popValue">${removed}</span>`);
        } 
        else step.detail = `<span class="emptyStackMessage">Stack is empty! No pop performed.</span>`;
    }
    else if(step.type === 'multipop')
    {
        const removedVals = multipopFromStackManual(step.count);
        if(removedVals && removedVals.length > 0)
        {
            step.removedValues = removedVals;
            if(step.detail)
            {
                const joined = removedVals.map(v => `<span class="popValue">${v}</span>`).join(', ');
                step.detail = step.detail.replace('{removedValues}', joined);
                step.detail = step.detail.replace('{count}', `<span class="potentialValue">${step.count}</span>`);
            }
        } 
        else step.detail = `<span class="emptyStackMessage">Stack is empty! No multipop performed.</span>`;
    }
}

function nextSyntaxStep(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];

    if(currentCommandIndex < steps.length - 1)
    {
        currentCommandIndex++;
        executeStep(steps[currentCommandIndex]);
        document.getElementById('currentStepInfo').innerHTML = `${currentCommandIndex + 1}. ${steps[currentCommandIndex].description}`;
        document.getElementById('detailedStepInfo').innerHTML = steps[currentCommandIndex].detail || `<span class="noDetail">No detail provided.</span>`;
    } 
    else 
    {
        alert(langData.endOfExample);
        stackArray = [], steps = [], stepCount = 0, potential = 0, isBestWorstMode = false;
        $('#syntaxModal').modal('hide');
        goBack();
    }
}

function openBestWorstParamsModal(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];

    document.getElementById('bestWorstModalLabel').textContent = langData.selectCase;
    document.getElementById('bestWorstModalText').textContent = langData.bestWorstDescription;
    document.getElementById('bestCaseButtonLabel').textContent = langData.bestCase;
    document.getElementById('worstCaseButtonLabel').textContent = langData.worstCase;
    $('#bestWorstModal').modal('show');
}

function executeBestCase(){
    $('#bestWorstModal').modal('hide');
    isBestWorstMode = true, stepCount = 0, potential = 0;
    updateStepCount();
    updatePotential();

    const algParameters = document.querySelector('.alg_parameters');
    if(algParameters) algParameters.style.display = 'none';

    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const dynamicContent = document.getElementById('dynamicContent');

    if(dynamicContent) 
    {
        dynamicContent.innerHTML = `
            <div id="mainContainer">
                <div class="selected-case-info">
                    <h4>${langData.bestCase}</h4>
                    <p>${langData.bestCaseDescription}</p>
                </div>
                <div id="stackContainer">
                    <div id="stackView" class="stack-view"></div>
                </div>
                <div class="execution-info mt-3">
                    <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
                    <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>
                    <p id="currentStepInfo">${langData.executeBestCase}</p>
                </div>
            </div>
        `;
    }

    stackArray = [];
    steps = [
        {type: 'push', value: 1, description: `${langData.pushButton} 1`},
        {type: 'push', value: 2, description: `${langData.pushButton} 2`},
        {type: 'push', value: 3, description: `${langData.pushButton} 3`},
        {type: 'multipop', count: 2, description: `${langData.multipopButton}(2)`}
    ];
    currentCommandIndex = 0;
    executeStepsWithDelay();
}

function executeWorstCase(){
    $('#bestWorstModal').modal('hide');
    isBestWorstMode = true, stepCount = 0, potential = 0;
    updateStepCount();
    updatePotential();

    const algParameters = document.querySelector('.alg_parameters');
    if(algParameters) algParameters.style.display = 'none';

    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const dynamicContent = document.getElementById('dynamicContent');

    if(dynamicContent) 
    {
        dynamicContent.innerHTML = `
            <div id="mainContainer">
                <div class="selected-case-info">
                    <h4>${langData.worstCase}</h4>
                    <p>${langData.worstCaseDescription}</p>
                </div>
                <div id="stackContainer">
                    <div id="stackView" class="stack-view"></div>
                </div>
                <div class="execution-info mt-3">
                    <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
                    <div class="potential-display" id="potentialDisplay">${langData.potential}: <span class="potentialValue">${potential}</span></div>
                    <p id="currentStepInfo">${langData.executeWorstCase}</p>
                </div>
            </div>
        `;
    }

    stackArray = [];
    steps = [
        {type: 'push', value: 1, description: `${langData.pushButton} 1`},
        {type: 'push', value: 2, description: `${langData.pushButton} 2`},
        {type: 'push', value: 3, description: `${langData.pushButton} 3`},
        {type: 'multipop', count: 3, description: `${langData.multipopButton}(3)`}
    ];
    currentCommandIndex = 0;
    executeStepsWithDelay();
}

function executeStepsWithDelay(){
    let stepIndex = 0;
    function executeNextStep() 
    {
        if(stepIndex < steps.length) 
        {
            executeStep(steps[stepIndex]);
            const currentStepInfo = document.getElementById('currentStepInfo');
            if(currentStepInfo) currentStepInfo.textContent = steps[stepIndex].description;
            stepIndex++;
            setTimeout(executeNextStep, 2000);
        } 
        else 
        {
            const language = localStorage.getItem('language') || 'en';
            const langData = translations[language];
            alert(langData.endOfExample);
            stackArray = [], steps = [], stepCount = 0, potential = 0, isBestWorstMode = false;
            goBack();
        }
    }
    executeNextStep();
}

updateStepCount();
updatePotential();