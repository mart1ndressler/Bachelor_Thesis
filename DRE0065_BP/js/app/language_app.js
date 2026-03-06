function getLang(){
  return localStorage.getItem('language') || 'en';
}

function trRaw(lang = getLang()){
  return window.translations?.[lang] || {};
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
  return getPageCfg(page)?.section || page;
}

function _setText(id, value){
  const el = document.getElementById(id);
  if(el)
    el.textContent = value ?? '';
}

function _setHTML(id, value){
  const el = document.getElementById(id);
  if(el)
    el.innerHTML = value ?? '';
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
        if(typeof updateMpSyntaxPanels === 'function')
            updateMpSyntaxPanels(currentCommandIndex);

        const s = steps[currentCommandIndex] || steps[0];
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
  const Lall = trAll(language);
  _setText('navBrand', Lall.navBrand);

  const backBtn = document.getElementById('backBtn');
  if(backBtn)
    backBtn.innerHTML = Lall.backBtn;

  _setText('algorithm1', Lall.algorithm1);
  _setText('algorithm2', Lall.algorithm2);

  const a3 = document.getElementById('algorithm3');
  if(a3)
    a3.textContent = Lall.algorithm3;

  _setText('footerText', Lall.footerText);
  _setText('closeBtn', Lall.closeBtn);

  if(currentPage === 'main'){
    document.title = Lall.title_main;
    _setText('aboutAppBtn', Lall.aboutAppBtn);
    _setText('aboutModalLabel', Lall.aboutModalLabel);
    _setHTML('aboutModalBody', Lall.aboutModalBody);
  }
  else{
    const cfg = getPageCfg(currentPage);

    if(cfg){
      const Lpage = trPage(cfg.section, language);
      const title = Lpage[cfg.titleKey];
      const about = Lpage[cfg.aboutKey];
      const desc  = Lpage[cfg.descKey];

      document.title = title;
      _setText('aboutAppBtn', about);
      _setText('aboutModalLabel', about);
      _setHTML('aboutModalBody', desc);

      const h2 = document.querySelector(cfg.headingSelector);
      if(h2)
        h2.textContent = title;
    }
  }

  const paramsWrap = document.querySelector('.alg_parameters');
  if(paramsWrap){
    const btns = paramsWrap.querySelectorAll('button.btn.btn-primary');
    if(btns.length >= 4){
      btns[0].textContent = Lall.manualButton;
      btns[1].textContent = Lall.randomButton;
      btns[2].textContent = Lall.bestWorstButton;
      btns[3].textContent = Lall.syntaxButton;
    }
  }

  _setText('manualParamsModalLabel', (activeModalContext && activeModalContext.startsWith('queue')) ? Lall.queueManualParamsModalLabel : Lall.manualParamsModalLabel);
  _setText('stackValuesLabel', (activeModalContext && activeModalContext.startsWith('queue')) ? Lall.queueValuesLabel : Lall.stackValuesLabel);
  _setText('submitBtn', Lall.submitBtn);

  const rml = document.getElementById('randomParamsModalLabel');
  if(rml){
    const isSplayRandom = (activeModalContext === 'splayRandom');
    rml.textContent = isSplayRandom ? (Lall.splayRandomParamsModalLabel || Lall.randomParamsModalLabel) : Lall.randomParamsModalLabel;
  }

  _setText('rangeMinLabel', Lall.rangeMinLabel);
  _setText('rangeMaxLabel', Lall.rangeMaxLabel);
  _setText('countLabel', Lall.countLabel);
  _setText('generateBtn', Lall.generateBtn);

  if(document.getElementById('syntaxModalLabel')){
    const isQueueSyntax = (activeModalContext === 'queueSyntax');
    const isSplaySyntax = (activeModalContext === 'splaySyntax');

    _setText('syntaxModalLabel', isQueueSyntax ? Lall.queueSyntaxModalLabel : isSplaySyntax ? (Lall.splaySyntaxModalLabel || Lall.syntaxModalLabel) : Lall.syntaxModalLabel);
    _setHTML('syntaxInfo', isQueueSyntax ? Lall.queueSyntaxInfo : isSplaySyntax ? (Lall.splaySyntaxInfo || Lall.syntaxInfo) : Lall.syntaxInfo);
    _setText('syntaxInputLabel', isQueueSyntax ? Lall.queueSyntaxInputLabel : isSplaySyntax ? (Lall.splaySyntaxInputLabel || Lall.syntaxInputLabel) : Lall.syntaxInputLabel);

    const synInput = document.getElementById('syntaxInput');
    if(synInput)
        synInput.placeholder = isQueueSyntax ? Lall.queueSyntaxInputPlaceholder : isSplaySyntax ? (Lall.splaySyntaxInputPlaceholder || Lall.syntaxInputPlaceholder) : Lall.syntaxInputPlaceholder;
    
    _setText('startSyntaxBtn', Lall.startSyntaxBtn);
  }

  const bwLabel = document.getElementById('bestWorstModalLabel');
  const bwText = document.getElementById('bestWorstModalText');
  const bestLbl = document.getElementById('bestCaseButtonLabel');
  const worstLbl = document.getElementById('worstCaseButtonLabel');

  if(bwLabel && bwText && bestLbl && worstLbl){
    bwLabel.textContent = Lall.selectCase;
    
    const isQueueBW = (activeModalContext === 'queueBestWorst');
    const isSplayBW = (activeModalContext === 'splayBestWorst');

    bwText.textContent = isQueueBW ? Lall.queueBestWorstModalText : isSplayBW ? (Lall.splayBestWorstDescription || Lall.bestWorstDescription) : Lall.bestWorstDescription;
    bestLbl.textContent = Lall.bestCase;
    worstLbl.textContent = Lall.worstCase;
  }

  if(typeof rebuildQueueSyntaxStepsForLanguage === 'function')
    rebuildQueueSyntaxStepsForLanguage();

  refreshCurrentViewAfterLanguageChange();
}