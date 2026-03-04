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
        }
        else
            commands.push({ type:'dequeue' });
    }
    return commands;
}

function generateQueueSyntaxSteps(commands){
    const langData = qGetLang();
    const steps = [];

    commands.forEach(cmd => {
        if(cmd.type === 'enqueue')
            steps.push({type: 'enqueue', value: cmd.value, description: `${langData.enqueueButton} ${cmd.value}`, detail: (langData.queueEnqueueDetail || langData.detailNotProvided).replace('{value}', '{value}')});
        else
            steps.push({type: 'dequeue', description: `${langData.dequeueButton}`, detail: langData.detailNotProvided, removedValue: undefined, usedTransfer: undefined, wasEmpty: false});
    });

    return steps;
}

function setQueueSyntaxNextEnabled(enabled){
    const btn = document.getElementById('syntaxNextBtn');
    if(btn)
        btn.disabled = !enabled;
}

function executeQueueSyntaxStep(step, done){
    const langData = qGetLang();

    if(step.type === 'enqueue'){
        enqueueQueue2StacksManual(step.value);
        step.detail = (langData.queueEnqueueDetail || langData.detailNotProvided).replace('{value}', `<span class="pushValue">${step.value}</span>`);
        if(done) 
            done();

        return;
    }

    if(step.type === 'dequeue'){
        const usedTransfer = (qOut.length === 0 && qIn.length > 0);
        step.usedTransfer = usedTransfer;

        dequeueQueue2Stacks((removed) => {
            if(removed === undefined){
                step.wasEmpty = true;
                step.detail = `<span class="emptyStackMessage">${langData.queueEmptyNoDequeue}</span>`;
                if(done) 
                    done();

                return;
            }

            step.removedValue = removed;

            const key = usedTransfer ? 'queueDequeueDetailTransfer' : 'queueDequeueDetailSimple';
            step.detail = (langData[key] || langData.detailNotProvided).replace('{removedValue}', `<span class="popValue">${removed}</span>`).replace('{potential}', `<span class="potentialValue">${qPotential}</span>`);
            if(done) 
                done();
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

    if(!qIsSyntaxMode || qSyntaxSteps.length === 0) 
        return;
    if(qBusy) 
        return;

    if(qSyntaxIndex < qSyntaxSteps.length - 1){
        qSyntaxIndex++;

        setQueueSyntaxNextEnabled(false);
        executeQueueSyntaxStep(qSyntaxSteps[qSyntaxIndex], () => {
            updateQueueSyntaxPanels(qSyntaxIndex);
            setQueueSyntaxNextEnabled(true);
        });
    }
    else{
        showAppMessage(langData.endOfExample, {
        onClose: () => {
            resetQueue2StacksState();
            goBack();
        }});
    }
}

function rebuildQueueSyntaxStepsForLanguage(){
    if(!qIsSyntaxMode || qSyntaxCommands.length === 0)
        return;

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

        if(s.type === 'enqueue')
            s.detail = (langData.queueEnqueueDetail || langData.detailNotProvided).replace('{value}', `<span class="pushValue">${s.value}</span>`);

        if(s.type === 'dequeue'){
            if(s.wasEmpty)
                s.detail = `<span class="emptyStackMessage">${langData.queueEmptyNoDequeue}</span>`;
            else if(s.removedValue !== undefined){
                const key = s.usedTransfer ? 'queueDequeueDetailTransfer' : 'queueDequeueDetailSimple';
                s.detail = (langData[key] || langData.detailNotProvided).replace('{removedValue}', `<span class="popValue">${s.removedValue}</span>`).replace('{potential}', `<span class="potentialValue">${qPotential}</span>`);
            }
            else
                s.detail = langData.detailNotProvided;
        }
    }

    qSyntaxSteps = newSteps;
    if(document.getElementById('qSyntaxCurrentStepInfo'))
        updateQueueSyntaxPanels(qSyntaxIndex);
}