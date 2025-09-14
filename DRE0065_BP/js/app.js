document.addEventListener('DOMContentLoaded', function (){
    const savedLanguage = localStorage.getItem('language') || 'en';
    changeLanguage(savedLanguage);

    var aboutBtn = document.getElementById('aboutAppBtn');
    var aboutModal = new bootstrap.Modal(document.getElementById('aboutModal'));
    aboutBtn.addEventListener('click', function () { aboutModal.show(); });
    document.getElementById('backArrow').style.display = 'none';
});

let currentPage = 'main';
function changeContent(algorithm){
    stackArray = [], steps = [], stepCount = 0, potential = 0, isBestWorstMode = false;
    currentPage = algorithm;
    document.getElementById('algorithmLinks').style.display = 'none';
    document.getElementById('backArrow').style.display = 'block';

    const contentDiv = document.getElementById('dynamicContent');
    const aboutBtn = document.getElementById('aboutAppBtn');
    const modalTitle = document.getElementById('aboutModalLabel');
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    switch(algorithm) 
    {
        case 'multipop':
            contentDiv.innerHTML = `
            <div class="alg_parameters">
                <h2>${langData.multipopTitle}</h2>
                <button class="btn btn-primary" onclick="openManualParamsModal()">${langData.manualButton}</button>
                <button class="btn btn-primary" onclick="openRandomParamsModal()">${langData.randomButton}</button>
                <button class="btn btn-primary" onclick="openBestWorstParamsModal()">${langData.bestWorstButton}</button>
                <button class="btn btn-primary" onclick="openSyntaxModal()">${langData.syntaxButton}</button>
            </div>
            `;
            aboutBtn.textContent = langData.multipopAbout;
            modalTitle.innerHTML = langData.multipopAbout;
            document.getElementById('aboutModalBody').innerHTML = langData.multipopDescription;
            document.title = langData.multipopTitle;
            break;
            
        case 'alg2':
        contentDiv.innerHTML = `
          <div class="alg_parameters">
            <h2>${langData.alg2Title || 'Algorithm 2'}</h2>
            <!-- jen vizuální tlačítka – záměrně BEZ onclick -->
            <button class="btn btn-primary" disabled>${langData.manualButton}</button>
            <button class="btn btn-primary" disabled>${langData.randomButton}</button>
            <button class="btn btn-primary" disabled>${langData.bestWorstButton}</button>
            <button class="btn btn-primary" disabled>${langData.syntaxButton}</button>
          </div>
        `;
        aboutBtn.textContent = langData.alg2About || 'About Algorithm 2';
        modalTitle.innerHTML  = langData.alg2About || 'About Algorithm 2';
        document.getElementById('aboutModalBody').innerHTML =
          langData.alg2Description || '<p>Placeholder description for Algorithm 2.</p>';
        document.title = langData.alg2Title || 'Algorithm 2';
        break;
    }
}

function goBack(){
    currentPage = 'main';
    document.getElementById('algorithmLinks').style.display = 'block';
    document.getElementById('backArrow').style.display = 'none';
    document.getElementById('dynamicContent').innerHTML = '';

    const language = localStorage.getItem('language') || 'en';
    changeLanguage(language);
}

function changeLanguage(language){
    localStorage.setItem('language', language);
    const langData = translations[language];

    document.getElementById('title_main').textContent = langData.title_main;
    document.getElementById('navBrand').textContent = langData.navBrand;
    document.getElementById('backBtn').innerHTML = langData.backBtn;
    document.getElementById('algorithm1').textContent = langData.algorithm1;
    document.getElementById('footerText').textContent = langData.footerText;
    document.getElementById('closeBtn').textContent = langData.closeBtn;

    if(currentPage === 'main') 
    {
        document.getElementById('aboutAppBtn').textContent = langData.aboutAppBtn;
        document.getElementById('aboutModalLabel').textContent = langData.aboutModalLabel;
        document.getElementById('aboutModalBody').innerHTML = `<p>${langData.aboutModalText}</p><p>${langData.aboutModalText2}</p>`;
    } 
    else if(currentPage === 'multipop') 
    {
        document.getElementById('aboutAppBtn').textContent = langData.multipopAbout;
        document.getElementById('aboutModalLabel').textContent = langData.multipopAbout;
        document.getElementById('aboutModalBody').innerHTML = langData.multipopDescription;
        document.querySelector('.alg_parameters h2').textContent = langData.multipopTitle;

        const buttons = document.querySelectorAll('.alg_parameters button');
        buttons[0].textContent = langData.manualButton;
        buttons[1].textContent = langData.randomButton;
        buttons[2].textContent = langData.bestWorstButton;
        buttons[3].textContent = langData.syntaxButton;
    }

    document.getElementById('manualParamsModalLabel').textContent = langData.manualParamsModalLabel;
    document.getElementById('stackValuesLabel').textContent = langData.stackValuesLabel;
    document.getElementById('submitBtn').textContent = langData.submitBtn;
    document.getElementById('randomParamsModalLabel').textContent = langData.randomParamsModalLabel;
    document.getElementById('rangeMinLabel').textContent = langData.rangeMinLabel;
    document.getElementById('rangeMaxLabel').textContent = langData.rangeMaxLabel;
    document.getElementById('countLabel').textContent = langData.countLabel;
    document.getElementById('generateBtn').textContent = langData.generateBtn;

    if(document.getElementById('syntaxModalLabel')) 
    {
        document.getElementById('syntaxModalLabel').textContent = langData.syntaxModalLabel;
        document.getElementById('syntaxInfo').innerHTML = langData.syntaxInfo;
        document.getElementById('syntaxInputLabel').textContent = langData.syntaxInputLabel;
        document.getElementById('syntaxInput').placeholder = langData.syntaxInputPlaceholder;
        document.getElementById('exampleInfo').textContent = langData.exampleInfo;
        document.getElementById('nextStepBtn').textContent = langData.nextButton;
        document.getElementById('startSyntaxBtn').textContent = langData.startSyntaxBtn;
    }

    const bestWorstModalLabel = document.getElementById('bestWorstModalLabel');
    const bestWorstModalText = document.getElementById('bestWorstModalText');
    const bestCaseButtonLabel = document.getElementById('bestCaseButtonLabel');
    const worstCaseButtonLabel = document.getElementById('worstCaseButtonLabel');

    if(bestWorstModalLabel && bestWorstModalText && bestCaseButtonLabel && worstCaseButtonLabel) 
    {
        bestWorstModalLabel.textContent = langData.selectCase;
        bestWorstModalText.textContent = langData.bestWorstDescription;
        bestCaseButtonLabel.textContent = langData.bestCase;
        worstCaseButtonLabel.textContent = langData.worstCase;
    }

    if(document.getElementById('endOfExample')) document.getElementById('endOfExample').textContent = langData.endOfExample;
    if(steps.length > 0) 
    {
        const oldIndex = currentCommandIndex;
        const newSteps = generateSteps(syntaxCommands);

        for(let i = 0; i < Math.min(newSteps.length, steps.length); i++)
        {
            if(steps[i].removedValue !== undefined)newSteps[i].removedValue = steps[i].removedValue;
            if(steps[i].removedValues !== undefined)newSteps[i].removedValues = steps[i].removedValues;
            if(steps[i].value !== undefined)newSteps[i].value = steps[i].value;
        }

        for(let i = 0; i < newSteps.length; i++)
        {
            if(newSteps[i].type === 'push') if(newSteps[i].value !== undefined && newSteps[i].detail) newSteps[i].detail = newSteps[i].detail.replace('{value}', newSteps[i].value);
            else if(newSteps[i].type === 'pop') if(newSteps[i].removedValue !== undefined && newSteps[i].detail)newSteps[i].detail = newSteps[i].detail.replace('{removedValue}', newSteps[i].removedValue);
            else if(newSteps[i].type === 'multipop')
            {
                if(newSteps[i].removedValues && newSteps[i].removedValues.length > 0 && newSteps[i].detail)
                {
                    const joined = newSteps[i].removedValues.join(', ');
                    newSteps[i].detail = newSteps[i].detail.replace('{removedValues}', joined);
                }
            }
        }

        steps = newSteps;
        currentCommandIndex = oldIndex;
        if(currentCommandIndex < steps.length)
        {
            const step = steps[currentCommandIndex];
            if(document.getElementById('currentStepInfo')) document.getElementById('currentStepInfo').innerHTML = `${currentCommandIndex + 1}. ${step.description}`;
            if(document.getElementById('detailedStepInfo')) document.getElementById('detailedStepInfo').innerHTML = step.detail || "Detail not provided.";
        }
    }
}