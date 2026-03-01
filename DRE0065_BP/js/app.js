document.addEventListener('DOMContentLoaded', function (){
    const savedLanguage = localStorage.getItem('language') || 'en';
    changeLanguage(savedLanguage);
    document.getElementById('backArrow').style.display = 'none';
});

let currentPage = 'main', activeModalContext = null;

function changeContent(algorithm) {
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
            contentDiv.innerHTML = 
            `<div class="alg_parameters">
                <h2>${langData.multipopTitle}</h2>
                <button class="btn btn-primary" onclick="openManualParamsModalU()">${langData.manualButton}</button>
                <button class="btn btn-primary" onclick="openRandomParamsModalU()">${langData.randomButton}</button>
                <button class="btn btn-primary" onclick="openBestWorstParamsModalU()">${langData.bestWorstButton}</button>
                <button class="btn btn-primary" onclick="openSyntaxModalU()">${langData.syntaxButton}</button>
            </div>`;

            aboutBtn.textContent = langData.multipopAbout;
            modalTitle.textContent = langData.multipopAbout;
            document.getElementById('aboutModalBody').innerHTML = langData.multipopDescription;
            document.title = langData.multipopTitle;
            break;

        case 'queue2Stacks':
            contentDiv.innerHTML = 
            `<div class="alg_parameters">
                <h2>${langData.queue2StacksTitle}</h2>
                <button class="btn btn-primary" onclick="openManualParamsModalU()">${langData.manualButton}</button>
                <button class="btn btn-primary" onclick="openRandomParamsModalU()">${langData.randomButton}</button>
                <button class="btn btn-primary" onclick="openBestWorstParamsModalU()">${langData.bestWorstButton}</button>
                <button class="btn btn-primary" onclick="openSyntaxModalU()">${langData.syntaxButton}</button>
            </div>`;

            aboutBtn.textContent = langData.queue2StacksAbout;
            modalTitle.textContent = langData.queue2StacksAbout;
            document.getElementById('aboutModalBody').innerHTML = langData.queue2StacksDescription;
            document.title = langData.queue2StacksTitle;
            break;

        case 'splayTree':
            contentDiv.innerHTML = 
            `<div class="alg_parameters">
                <h2>${langData.splayTreeTitle}</h2>
                <button class="btn btn-primary" onclick="openSplayManual()">${langData.manualButton}</button>
                <button class="btn btn-primary" onclick="openSplayRandom()">${langData.randomButton}</button>
                <button class="btn btn-primary" onclick="openSplayBestWorst()">${langData.bestWorstButton}</button>
                <button class="btn btn-primary" onclick="openSplaySyntax()">${langData.syntaxButton}</button>
            </div>`;

            aboutBtn.textContent = langData.splayTreeAbout;
            modalTitle.textContent = langData.splayTreeAbout;
            document.getElementById('aboutModalBody').innerHTML = langData.splayTreeDescription;
            document.title = langData.splayTreeTitle;
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

function refreshCurrentViewAfterLanguageChange()
{
    if(currentPage === 'multipop' && typeof mpBusy !== 'undefined' && mpBusy)
    {
        if(typeof updateCounters === 'function') 
            updateCounters();
        return;
    }
    if(currentPage === 'queue2Stacks' && typeof qBusy !== 'undefined' && qBusy)
    {
        if(typeof updateQueueCounters === 'function') 
            updateQueueCounters();
        if(typeof refreshQInfo === 'function') 
            refreshQInfo();
        return;
    }

    if(currentPage === 'multipop')
    {
        if(document.getElementById('bwDetailedStepInfo'))
        {
            if(typeof rebuildMpBestWorstForLanguage === 'function') 
                rebuildMpBestWorstForLanguage();
            if(typeof updateCounters === 'function') 
                updateCounters();
            return;
        }

        if(document.getElementById('syntaxNextBtn'))
        {
            if(typeof rebuildMpSyntaxStepsForLanguage === 'function') 
                rebuildMpSyntaxStepsForLanguage();

            if(typeof displaySyntaxUI === 'function') 
                displaySyntaxUI();

            if(typeof steps !== 'undefined' && steps.length > 0 && document.getElementById('currentStepInfo'))
            {
                const s = steps[currentCommandIndex] || steps[0];
                document.getElementById('currentStepInfo').innerHTML = `${currentCommandIndex + 1}. ${s.description}`;
                document.getElementById('detailedStepInfo').innerHTML = s.detail || mpLang().detailNotProvided;
            }
        } 
        else if(document.getElementById('multipop_buttons'))
        {
            if(typeof displayStack === 'function') 
                displayStack(stackArray);
        }
    }

    if(currentPage === 'queue2Stacks')
    {
        if(document.getElementById('qSyntaxCurrentStepInfo'))
        {
            if(typeof displayQueue2StacksSyntaxUI === 'function')
                displayQueue2StacksSyntaxUI();
        } 
        else if(document.getElementById('qInView') || document.getElementById('qOutView'))
        {
            if(typeof displayQueue2Stacks === 'function') 
                displayQueue2Stacks();
        }
    }

    if(currentPage === 'splayTree')
    {
        if(typeof refreshSplayUIForLanguage === 'function')
            refreshSplayUIForLanguage();
    }
}

function changeLanguage(language) {
    localStorage.setItem('language', language);
    const langData = translations[language];

    document.getElementById('navBrand').textContent = langData.navBrand;
    document.getElementById('backBtn').innerHTML = langData.backBtn;
    document.getElementById('algorithm1').textContent = langData.algorithm1;
    document.getElementById('algorithm2').textContent = langData.algorithm2;

    const a3 = document.getElementById('algorithm3');
    if(a3) a3.textContent = langData.algorithm3;

    document.getElementById('footerText').textContent = langData.footerText;
    document.getElementById('closeBtn').textContent = langData.closeBtn;

    if(currentPage === 'main')
    {
        document.title = langData.title_main;
        document.getElementById('aboutAppBtn').textContent = langData.aboutAppBtn;
        document.getElementById('aboutModalLabel').textContent = langData.aboutModalLabel;
        document.getElementById('aboutModalBody').innerHTML = langData.aboutModalBody;
    } 
    else if(currentPage === 'multipop')
    {
        document.title = langData.multipopTitle;
        document.getElementById('aboutAppBtn').textContent = langData.multipopAbout;
        document.getElementById('aboutModalLabel').textContent = langData.multipopAbout;
        document.getElementById('aboutModalBody').innerHTML = langData.multipopDescription;

        const h2 = document.querySelector('.alg_parameters h2');
        if(h2) h2.textContent = langData.multipopTitle;
    } 
    else if(currentPage === 'queue2Stacks')
    {
        document.title = langData.queue2StacksTitle;
        document.getElementById('aboutAppBtn').textContent = langData.queue2StacksAbout;
        document.getElementById('aboutModalLabel').textContent = langData.queue2StacksAbout;
        document.getElementById('aboutModalBody').innerHTML = langData.queue2StacksDescription;

        const h2 = document.querySelector('.alg_parameters h2');
        if(h2) h2.textContent = langData.queue2StacksTitle;
    } 
    else if(currentPage === 'splayTree')
    {
        document.title = langData.splayTreeTitle;
        document.getElementById('aboutAppBtn').textContent = langData.splayTreeAbout;
        document.getElementById('aboutModalLabel').textContent = langData.splayTreeAbout;
        document.getElementById('aboutModalBody').innerHTML = langData.splayTreeDescription;

        const h2 = document.querySelector('.alg_parameters h2');
        if(h2) h2.textContent = langData.splayTreeTitle;
    }

    const paramsWrap = document.querySelector('.alg_parameters');
    if(paramsWrap)
    {
        const btns = paramsWrap.querySelectorAll('button.btn.btn-primary');
        if(btns.length >= 4)
        {
            btns[0].textContent = langData.manualButton;
            btns[1].textContent = langData.randomButton;
            btns[2].textContent = langData.bestWorstButton;
            btns[3].textContent = langData.syntaxButton;
        }
    }

    document.getElementById('manualParamsModalLabel').textContent =
        (activeModalContext && activeModalContext.startsWith('queue')) ? langData.queueManualParamsModalLabel : langData.manualParamsModalLabel;

    document.getElementById('stackValuesLabel').textContent =
        (activeModalContext && activeModalContext.startsWith('queue')) ? langData.queueValuesLabel : langData.stackValuesLabel;

    document.getElementById('submitBtn').textContent = langData.submitBtn;

    const rml = document.getElementById('randomParamsModalLabel');
    if(rml){
        const isSplayRandom = (activeModalContext === 'splayRandom');
        rml.textContent = isSplayRandom
            ? (langData.splayRandomParamsModalLabel || langData.randomParamsModalLabel)
            : langData.randomParamsModalLabel;
    }

    document.getElementById('rangeMinLabel').textContent = langData.rangeMinLabel;
    document.getElementById('rangeMaxLabel').textContent = langData.rangeMaxLabel;
    document.getElementById('countLabel').textContent = langData.countLabel;
    document.getElementById('generateBtn').textContent = langData.generateBtn;

    if(document.getElementById('syntaxModalLabel'))
    {
        const isQueueSyntax = (activeModalContext === 'queueSyntax');
        const isSplaySyntax = (activeModalContext === 'splaySyntax');

        document.getElementById('syntaxModalLabel').textContent =
            isQueueSyntax ? langData.queueSyntaxModalLabel :
            isSplaySyntax ? (langData.splaySyntaxModalLabel || langData.syntaxModalLabel) : langData.syntaxModalLabel;

        document.getElementById('syntaxInfo').innerHTML =
            isQueueSyntax ? langData.queueSyntaxInfo :
            isSplaySyntax ? (langData.splaySyntaxInfo || langData.syntaxInfo) : langData.syntaxInfo;

        document.getElementById('syntaxInputLabel').textContent =
            isQueueSyntax ? langData.queueSyntaxInputLabel :
            isSplaySyntax ? (langData.splaySyntaxInputLabel || langData.syntaxInputLabel) : langData.syntaxInputLabel;

        document.getElementById('syntaxInput').placeholder =
            isQueueSyntax ? langData.queueSyntaxInputPlaceholder :
            isSplaySyntax ? (langData.splaySyntaxInputPlaceholder || langData.syntaxInputPlaceholder) : langData.syntaxInputPlaceholder;

        document.getElementById('startSyntaxBtn').textContent = langData.startSyntaxBtn;
    }

    const bestWorstModalLabel = document.getElementById('bestWorstModalLabel');
    const bestWorstModalText  = document.getElementById('bestWorstModalText');
    const bestCaseButtonLabel = document.getElementById('bestCaseButtonLabel');
    const worstCaseButtonLabel = document.getElementById('worstCaseButtonLabel');

    if(bestWorstModalLabel && bestWorstModalText && bestCaseButtonLabel && worstCaseButtonLabel)
    {
        bestWorstModalLabel.textContent = langData.selectCase;

        const isQueueBW = (activeModalContext === 'queueBestWorst');
        const isSplayBW = (activeModalContext === 'splayBestWorst');

        bestWorstModalText.textContent =
            isQueueBW ? langData.queueBestWorstModalText :
            isSplayBW ? (langData.splayBestWorstDescription || langData.bestWorstDescription) : langData.bestWorstDescription;

        bestCaseButtonLabel.textContent = langData.bestCase;
        worstCaseButtonLabel.textContent = langData.worstCase;
    }

    if(typeof rebuildQueueSyntaxStepsForLanguage === 'function') 
        rebuildQueueSyntaxStepsForLanguage();
    
    refreshCurrentViewAfterLanguageChange();
}

let _actionInputOnOk = null;
function _setActionInputError(msg)
{
  const input = document.getElementById('actionInput');
  const err = document.getElementById('actionInputError');
  if(!input || !err) return;

  if(msg)
  {
    input.classList.add('is-invalid');
    err.innerHTML = msg;
  }
  else
  {
    input.classList.remove('is-invalid');
    err.innerHTML = '';
  }
}

function openActionInputModal({title = '', label = '', placeholder = '', type = 'number', min = 1, onOk})
{
  _actionInputOnOk = onOk;
  const lang = localStorage.getItem('language') || 'en';
  const L = translations[lang];

  document.getElementById('actionInputModalLabel').textContent = title;
  document.getElementById('actionInputLabel').textContent = label;

  const input = document.getElementById('actionInput');
  input.type = type;
  if(min !== null && min !== undefined) 
    input.min = String(min);

  input.step = "1";
  input.value = '';
  input.placeholder = placeholder;

  _setActionInputError('');
  document.getElementById('actionOkBtn').textContent = L.okBtn || 'OK';
  
  $('#actionInputModal').modal('show');
  setTimeout(() => input.focus(), 200);
}

function showAppMessage(text, {title = null, onClose = null} = {})
{
  const lang = localStorage.getItem('language') || 'en';
  const L = translations[lang];

  document.getElementById('messageModalLabel').textContent = (title !== null ? title : (L.messageTitle || 'Message'));
  document.getElementById('messageModalBody').innerHTML = text;
  document.getElementById('messageOkBtn').textContent = L.okBtn || 'OK';

  const $m = $('#messageModal');
  if(onClose) 
    $m.one('hidden.bs.modal', onClose);

  $m.modal('show');
}

document.addEventListener('DOMContentLoaded', () => {
  const okBtn = document.getElementById('actionOkBtn');
  const input = document.getElementById('actionInput');

  if(okBtn)
  {
    okBtn.addEventListener('click', () => {
      if(typeof _actionInputOnOk === 'function')
      {
        const val = (document.getElementById('actionInput').value || '').trim();
        const shouldClose = _actionInputOnOk(val);
        if(shouldClose !== false) 
            $('#actionInputModal').modal('hide');
      }
      else $('#actionInputModal').modal('hide');
    });
  }

  if(input)
  {
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter')
      { 
        e.preventDefault();
        if(okBtn) okBtn.click();
      }
    });
  }

  $('#actionInputModal').on('hidden.bs.modal', () => {
    _actionInputOnOk = null;
    _setActionInputError('');
  });
});