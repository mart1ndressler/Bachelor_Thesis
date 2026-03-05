function getLang(){
  return localStorage.getItem('language') || 'en';
}

function trRaw(lang = getLang()){
  return window.translations[lang];
}

function trAll(lang = getLang()){
  const t = trRaw(lang);
  return {...(t.common || {}), ...(t.multipop || {}), ...(t.queue || {}), ...(t.splay || {})};
}

function trPage(section, lang = getLang()){
  const t = trRaw(lang);
  return {...(t.common || {}), ...(t[section] || {})};
}

function pageToSection(page){
  if(page === 'multipop')
    return 'multipop';
  if(page === 'queue2Stacks')
    return 'queue';
  if(page === 'splayTree')
    return 'splay';
  return page;
}

function refreshCurrentViewAfterLanguageChange(){
    if(currentPage === 'multipop' && typeof mpBusy !== 'undefined' && mpBusy){
        if(typeof updateCounters === 'function') 
            updateCounters();

        return;
    }

    if(currentPage === 'queue2Stacks' && typeof qBusy !== 'undefined' && qBusy){
        if(typeof updateQueueCounters === 'function') 
            updateQueueCounters();

        if(typeof refreshQInfo === 'function') 
            refreshQInfo();

        return;
    }

    if(currentPage === 'multipop'){
        if(document.getElementById('bwDetailedStepInfo')){
            if(typeof rebuildMpBestWorstForLanguage === 'function') 
                rebuildMpBestWorstForLanguage();

            if(typeof updateCounters === 'function') 
                updateCounters();

            return;
        }

        if(document.getElementById('syntaxNextBtn')){
            if(typeof rebuildMpSyntaxStepsForLanguage === 'function') 
                rebuildMpSyntaxStepsForLanguage();

            if(typeof displaySyntaxUI === 'function') 
                displaySyntaxUI();

            if(typeof steps !== 'undefined' && steps.length > 0 && document.getElementById('currentStepInfo')){
                const s = steps[currentCommandIndex] || steps[0];
                if(typeof updateMpSyntaxPanels === 'function')
                    updateMpSyntaxPanels(currentCommandIndex);

                document.getElementById('detailedStepInfo').innerHTML = s.detail || mpLang().detailNotProvided;
            }
        } 
        else if(document.getElementById('multipop_buttons')){
            if(typeof displayStack === 'function') 
                displayStack(stackArray);
        }
    }

    if(currentPage === 'queue2Stacks'){
        if(document.getElementById('qSyntaxCurrentStepInfo')){
            if(typeof displayQueue2StacksSyntaxUI === 'function')
                displayQueue2StacksSyntaxUI();
        } 
        else if(document.getElementById('qInView') || document.getElementById('qOutView')){
            if(typeof displayQueue2Stacks === 'function') 
                displayQueue2Stacks();
        }
    }

    if(currentPage === 'splayTree'){
        if(typeof refreshSplayUIForLanguage === 'function')
            refreshSplayUIForLanguage();
    }
}

function changeLanguage(language){
    localStorage.setItem('language', language);
    const langData = trAll(language);

    document.getElementById('navBrand').textContent = langData.navBrand;
    document.getElementById('backBtn').innerHTML = langData.backBtn;
    document.getElementById('algorithm1').textContent = langData.algorithm1;
    document.getElementById('algorithm2').textContent = langData.algorithm2;

    const a3 = document.getElementById('algorithm3');
    if(a3)
        a3.textContent = langData.algorithm3;

    document.getElementById('footerText').textContent = langData.footerText;
    document.getElementById('closeBtn').textContent = langData.closeBtn;

    if(currentPage === 'main'){
        document.title = langData.title_main;
        document.getElementById('aboutAppBtn').textContent = langData.aboutAppBtn;
        document.getElementById('aboutModalLabel').textContent = langData.aboutModalLabel;
        document.getElementById('aboutModalBody').innerHTML = langData.aboutModalBody;
    } 
    else if(currentPage === 'multipop'){
        document.title = langData.multipopTitle;
        document.getElementById('aboutAppBtn').textContent = langData.multipopAbout;
        document.getElementById('aboutModalLabel').textContent = langData.multipopAbout;
        document.getElementById('aboutModalBody').innerHTML = langData.multipopDescription;

        const h2 = document.querySelector('.alg_parameters h2');
        if(h2)
            h2.textContent = langData.multipopTitle;
    } 
    else if(currentPage === 'queue2Stacks'){
        document.title = langData.queue2StacksTitle;
        document.getElementById('aboutAppBtn').textContent = langData.queue2StacksAbout;
        document.getElementById('aboutModalLabel').textContent = langData.queue2StacksAbout;
        document.getElementById('aboutModalBody').innerHTML = langData.queue2StacksDescription;

        const h2 = document.querySelector('.alg_parameters h2');
        if(h2)
            h2.textContent = langData.queue2StacksTitle;
    } 
    else if(currentPage === 'splayTree'){
        document.title = langData.splayTreeTitle;
        document.getElementById('aboutAppBtn').textContent = langData.splayTreeAbout;
        document.getElementById('aboutModalLabel').textContent = langData.splayTreeAbout;
        document.getElementById('aboutModalBody').innerHTML = langData.splayTreeDescription;

        const h2 = document.querySelector('.alg_parameters h2');
        if(h2)
            h2.textContent = langData.splayTreeTitle;
    }

    const paramsWrap = document.querySelector('.alg_parameters');
    if(paramsWrap){
        const btns = paramsWrap.querySelectorAll('button.btn.btn-primary');
        if(btns.length >= 4){
            btns[0].textContent = langData.manualButton;
            btns[1].textContent = langData.randomButton;
            btns[2].textContent = langData.bestWorstButton;
            btns[3].textContent = langData.syntaxButton;
        }
    }

    document.getElementById('manualParamsModalLabel').textContent = (activeModalContext && activeModalContext.startsWith('queue')) ? langData.queueManualParamsModalLabel : langData.manualParamsModalLabel;
    document.getElementById('stackValuesLabel').textContent = (activeModalContext && activeModalContext.startsWith('queue')) ? langData.queueValuesLabel : langData.stackValuesLabel;
    document.getElementById('submitBtn').textContent = langData.submitBtn;

    const rml = document.getElementById('randomParamsModalLabel');
    if(rml){
        const isSplayRandom = (activeModalContext === 'splayRandom');
        rml.textContent = isSplayRandom ? (langData.splayRandomParamsModalLabel || langData.randomParamsModalLabel) : langData.randomParamsModalLabel;
    }

    document.getElementById('rangeMinLabel').textContent = langData.rangeMinLabel;
    document.getElementById('rangeMaxLabel').textContent = langData.rangeMaxLabel;
    document.getElementById('countLabel').textContent = langData.countLabel;
    document.getElementById('generateBtn').textContent = langData.generateBtn;

    if(document.getElementById('syntaxModalLabel')){
        const isQueueSyntax = (activeModalContext === 'queueSyntax');
        const isSplaySyntax = (activeModalContext === 'splaySyntax');

        document.getElementById('syntaxModalLabel').textContent = isQueueSyntax ? langData.queueSyntaxModalLabel : isSplaySyntax ? (langData.splaySyntaxModalLabel || langData.syntaxModalLabel) : langData.syntaxModalLabel;
        document.getElementById('syntaxInfo').innerHTML = isQueueSyntax ? langData.queueSyntaxInfo : isSplaySyntax ? (langData.splaySyntaxInfo || langData.syntaxInfo) : langData.syntaxInfo;
        document.getElementById('syntaxInputLabel').textContent = isQueueSyntax ? langData.queueSyntaxInputLabel : isSplaySyntax ? (langData.splaySyntaxInputLabel || langData.syntaxInputLabel) : langData.syntaxInputLabel;
        document.getElementById('syntaxInput').placeholder = isQueueSyntax ? langData.queueSyntaxInputPlaceholder : isSplaySyntax ? (langData.splaySyntaxInputPlaceholder || langData.syntaxInputPlaceholder) : langData.syntaxInputPlaceholder;
        document.getElementById('startSyntaxBtn').textContent = langData.startSyntaxBtn;
    }

    const bestWorstModalLabel = document.getElementById('bestWorstModalLabel');
    const bestWorstModalText  = document.getElementById('bestWorstModalText');
    const bestCaseButtonLabel = document.getElementById('bestCaseButtonLabel');
    const worstCaseButtonLabel = document.getElementById('worstCaseButtonLabel');

    if(bestWorstModalLabel && bestWorstModalText && bestCaseButtonLabel && worstCaseButtonLabel){
        bestWorstModalLabel.textContent = langData.selectCase;

        const isQueueBW = (activeModalContext === 'queueBestWorst');
        const isSplayBW = (activeModalContext === 'splayBestWorst');

        bestWorstModalText.textContent = isQueueBW ? langData.queueBestWorstModalText : isSplayBW ? (langData.splayBestWorstDescription || langData.bestWorstDescription) : langData.bestWorstDescription;
        bestCaseButtonLabel.textContent = langData.bestCase;
        worstCaseButtonLabel.textContent = langData.worstCase;
    }

    if(typeof rebuildQueueSyntaxStepsForLanguage === 'function') 
        rebuildQueueSyntaxStepsForLanguage();
    
    refreshCurrentViewAfterLanguageChange();
}