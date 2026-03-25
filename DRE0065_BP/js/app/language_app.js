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

function langAppGetEl(id){
  return document.getElementById(id);
}

function _setText(id, value){
  const el = langAppGetEl(id);
  if(el)
    el.textContent = value ?? '';
}

function _setHTML(id, value){
  const el = langAppGetEl(id);
  if(el)
    el.innerHTML = value ?? '';
}

function langAppIsContext(context){
  return activeModalContext === context;
}

function langAppContextStartsWith(prefix){
  return typeof activeModalContext === 'string' && activeModalContext.startsWith(prefix);
}

function langAppApplyCommonStaticTexts(Lall){
  _setText('navBrand', Lall.navBrand);
  _setText('bwExecutionModeLabel', Lall.bwExecutionModeLabel);
  _setText('bwExecutionModeAutoLabel', Lall.executionModeAuto);
  _setText('bwExecutionModeManualLabel', Lall.executionModeManual);
  _setText('footerText', Lall.footerText);
  _setText('closeBtn', Lall.closeBtn);

  const backBtn = langAppGetEl('backBtn');
  if(backBtn)
    backBtn.innerHTML = Lall.backBtn;
}

function langAppApplyAlgorithmSelectionTexts(Lall){
  _setText('algorithm1', Lall.algorithm1);
  _setText('algorithm2', Lall.algorithm2);
  _setText('algorithm3', Lall.algorithm3);
}

function langAppApplyMainPageTexts(Lall){
  document.title = Lall.title_main;
  _setText('aboutAppBtn', Lall.aboutAppBtn);
  _setText('aboutModalLabel', Lall.aboutModalLabel);
  _setHTML('aboutModalBody', Lall.aboutModalBody);
}

function langAppApplyCurrentAlgorithmPageTexts(language){
  const cfg = getPageCfg(currentPage);
  if(!cfg)
    return;

  const Lpage = trPage(cfg.section, language);
  const title = Lpage[cfg.titleKey];
  const about = Lpage[cfg.aboutKey];
  const desc = Lpage[cfg.descKey];

  document.title = title;
  _setText('aboutAppBtn', about);
  _setText('aboutModalLabel', about);
  _setHTML('aboutModalBody', desc);

  const heading = document.querySelector(cfg.headingSelector);
  if(heading)
    heading.textContent = title;
}

function langAppApplyPageTexts(language, Lall){
  if(currentPage === 'main'){
    langAppApplyMainPageTexts(Lall);
    return;
  }

  langAppApplyCurrentAlgorithmPageTexts(language);
}

function langAppApplyParameterButtonTexts(Lall){
  const paramsWrap = document.querySelector('.alg_parameters');
  if(!paramsWrap)
    return;

  const buttons = paramsWrap.querySelectorAll('button.btn.btn-primary');
  if(buttons.length < 4)
    return;

  buttons[0].textContent = Lall.manualButton;
  buttons[1].textContent = Lall.randomButton;
  buttons[2].textContent = Lall.bestWorstButton;
  buttons[3].textContent = Lall.syntaxButton;
}

function langAppApplyManualModalTexts(Lall){
  const isQueueManual = langAppContextStartsWith('queue');

  _setText('manualParamsModalLabel', isQueueManual ? Lall.queueManualParamsModalLabel : Lall.manualParamsModalLabel);
  _setText('stackValuesLabel', isQueueManual ? Lall.queueValuesLabel : Lall.stackValuesLabel);
  _setText('submitBtn', Lall.submitBtn);

  const manualExampleEl = langAppGetEl('manualParamsExample');
  if(manualExampleEl)
    manualExampleEl.innerHTML = isQueueManual ? (Lall.queueManualParamsExample || '') : (Lall.manualParamsExample || '');
}

function langAppGetRandomSection(){
  if(langAppIsContext('queueRandom'))
    return 'queue';
  if(langAppIsContext('splayRandom'))
    return 'splay';

  return 'multipop';
}

function langAppApplyRandomModalTexts(language, Lall){
  const randomModalLabel = langAppGetEl('randomParamsModalLabel');
  if(randomModalLabel){
    const isSplayRandom = langAppIsContext('splayRandom');
    randomModalLabel.textContent = isSplayRandom ? (Lall.splayRandomParamsModalLabel || Lall.randomParamsModalLabel) : Lall.randomParamsModalLabel;
  }

  _setText('rangeMinLabel', Lall.rangeMinLabel);
  _setText('rangeMaxLabel', Lall.rangeMaxLabel);
  _setText('countLabel', Lall.countLabel);
  _setText('generateBtn', Lall.generateBtn);

  const Lrandom = trPage(langAppGetRandomSection(), language);

  const randomInfoEl = langAppGetEl('randomParamsInfo');
  if(randomInfoEl)
    randomInfoEl.innerHTML = Lrandom.randomParamsInfo || '';

  const rangeMinExampleEl = langAppGetEl('rangeMinExample');
  if(rangeMinExampleEl)
    rangeMinExampleEl.innerHTML = Lrandom.rangeMinExample || '';

  const rangeMaxExampleEl = langAppGetEl('rangeMaxExample');
  if(rangeMaxExampleEl)
    rangeMaxExampleEl.innerHTML = Lrandom.rangeMaxExample || '';

  const countExampleEl = langAppGetEl('countExample');
  if(countExampleEl)
    countExampleEl.innerHTML = Lrandom.countExample || '';
}

function langAppApplySyntaxModalTexts(Lall){
  const isQueueSyntax = langAppIsContext('queueSyntax');
  const isSplaySyntax = langAppIsContext('splaySyntax');

  _setText('syntaxModalLabel', isQueueSyntax ? Lall.queueSyntaxModalLabel : isSplaySyntax ? (Lall.splaySyntaxModalLabel || Lall.syntaxModalLabel) : Lall.syntaxModalLabel);
  _setHTML('syntaxInfo',isQueueSyntax ? Lall.queueSyntaxInfo : isSplaySyntax ? (Lall.splaySyntaxInfo || Lall.syntaxInfo) : Lall.syntaxInfo);
  _setText('syntaxInputLabel', isQueueSyntax ? Lall.queueSyntaxInputLabel : isSplaySyntax ? (Lall.splaySyntaxInputLabel || Lall.syntaxInputLabel) : Lall.syntaxInputLabel);

  const syntaxInput = langAppGetEl('syntaxInput');
  if(syntaxInput)
    syntaxInput.removeAttribute('placeholder');

  _setText('startSyntaxBtn', Lall.startSyntaxBtn);
}

function langAppApplyBestWorstModalTexts(Lall){
  const bwLabel = langAppGetEl('bestWorstModalLabel');
  const bwText = langAppGetEl('bestWorstModalText');
  const bestLbl = langAppGetEl('bestCaseButtonLabel');
  const worstLbl = langAppGetEl('worstCaseButtonLabel');

  if(!bwLabel || !bwText || !bestLbl || !worstLbl)
    return;

  const isQueueBW = langAppIsContext('queueBestWorst');
  const isSplayBW = langAppIsContext('splayBestWorst');

  bwLabel.textContent = Lall.selectCase;
  bwText.textContent = isQueueBW ? Lall.queueBestWorstModalText : isSplayBW ? (Lall.splayBestWorstDescription || Lall.bestWorstDescription) : Lall.bestWorstDescription;
  bestLbl.textContent = Lall.bestCase;
  worstLbl.textContent = Lall.worstCase;
}

function langAppRefreshMultipopView(){
  if(langAppGetEl('mpBwPanel')){
    if(typeof rebuildMpBestWorstForLanguage === 'function')
      rebuildMpBestWorstForLanguage();
    if(typeof mpBwRenderInfo === 'function')
      mpBwRenderInfo();
    if(typeof updateCounters === 'function')
      updateCounters();

    return;
  }

  if(typeof mpBusy !== 'undefined' && mpBusy){
    if(langAppGetEl('mpSynPanel')){
      if(typeof rebuildMpSyntaxStepsForLanguage === 'function')
        rebuildMpSyntaxStepsForLanguage();
      if(typeof updateCounters === 'function')
        updateCounters();
      if(typeof mpSynRenderInfo === 'function')
        mpSynRenderInfo();

      return;
    }

    if(typeof updateCounters === 'function')
      updateCounters();

    return;
  }

  if(langAppGetEl('mpSynPanel')){
    if(typeof rebuildMpSyntaxStepsForLanguage === 'function')
      rebuildMpSyntaxStepsForLanguage();
    if(typeof displaySyntaxUI === 'function')
      displaySyntaxUI();
    if(typeof updateMpSyntaxPanels === 'function')
      updateMpSyntaxPanels();

    return;
  }

  if(langAppGetEl('multipop_buttons') && typeof displayStack === 'function')
    displayStack(stackArray);
}

function langAppUpdateQueueManualTexts(){
  const Lq = (typeof qLang === 'function') ? qLang() : trPage('queue');

  const enqueueBtn = langAppGetEl('qEnqueueBtn');
  const dequeueBtn = langAppGetEl('qDequeueBtn');
  const historyBtn = langAppGetEl('qManualHistoryBtn');

  if(enqueueBtn)
    enqueueBtn.textContent = Lq.enqueueButton || 'Enqueue';
  if(dequeueBtn)
    dequeueBtn.textContent = Lq.dequeueButton || 'Dequeue';
  if(historyBtn)
    historyBtn.title = Lq.syntaxHistoryButtonTitle || 'Open history';
}

function langAppRefreshQueueView(){
  if(langAppGetEl('qBwPanel')){
    if(typeof rebuildQueueBestWorstForLanguage === 'function')
      rebuildQueueBestWorstForLanguage();
    if(typeof qBwRenderInfo === 'function')
      qBwRenderInfo();
    if(typeof updateQueueCounters === 'function')
      updateQueueCounters();

    return;
  }

  if(typeof qBusy !== 'undefined' && qBusy){
    if(langAppGetEl('qSynPanel')){
      if(typeof rebuildQueueSyntaxStepsForLanguage === 'function')
        rebuildQueueSyntaxStepsForLanguage();
      if(typeof updateQueueCounters === 'function')
        updateQueueCounters();
      if(typeof qSynRenderInfo === 'function')
        qSynRenderInfo();

      return;
    }

    if(typeof updateQueueCounters === 'function')
      updateQueueCounters();
    if(typeof refreshQInfo === 'function')
      refreshQInfo();

    langAppUpdateQueueManualTexts();
    return;
  }

  if(langAppGetEl('qSynPanel')){
    if(typeof displayQueue2StacksSyntaxUI === 'function')
      displayQueue2StacksSyntaxUI();

    return;
  }

  if((langAppGetEl('qInView') || langAppGetEl('qOutView')) && typeof displayQueue2Stacks === 'function')
    displayQueue2Stacks();
}

function langAppRefreshSplayView(){
  if(typeof refreshSplayUIForLanguage === 'function')
    refreshSplayUIForLanguage();
}

function refreshCurrentViewAfterLanguageChange(){
  if(currentPage === 'multipop'){
    langAppRefreshMultipopView();
    return;
  }
  if(currentPage === 'queue2Stacks'){
    langAppRefreshQueueView();
    return;
  }
  if(currentPage === 'splayTree')
    langAppRefreshSplayView();
}

function changeLanguage(language){
  closeNavbarMenu();
  localStorage.setItem('language', language);

  const Lall = trAll(language);

  langAppApplyCommonStaticTexts(Lall);
  langAppApplyAlgorithmSelectionTexts(Lall);
  langAppApplyPageTexts(language, Lall);
  langAppApplyParameterButtonTexts(Lall);
  langAppApplyManualModalTexts(Lall);
  langAppApplyRandomModalTexts(language, Lall);
  langAppApplySyntaxModalTexts(Lall);
  langAppApplyBestWorstModalTexts(Lall);

  if(typeof rebuildQueueSyntaxStepsForLanguage === 'function')
    rebuildQueueSyntaxStepsForLanguage();

  refreshCurrentViewAfterLanguageChange();

  if(typeof refreshOpenHistoryModalForLanguage === 'function')
    refreshOpenHistoryModalForLanguage();
}