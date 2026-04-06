function getLang(){
  return localStorage.getItem('language') || 'en';
}

function trRaw(lang = getLang()){
  return window.translations?.[lang] || {};
}

function trCommon(lang = getLang()){
  return trRaw(lang).common || {};
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

function langAppApplyCommonStaticTexts(Lall){
  _setText('navBrand', Lall.navBrand);
  _setText('bwExecutionModeLabel', Lall.bwExecutionModeLabel);
  _setText('bwExecutionModeAutoLabel', Lall.executionModeAuto);
  _setText('bwExecutionModeManualLabel', Lall.executionModeManual);
  _setText('footerText', Lall.footerText);
  _setText('closeBtn', Lall.closeBtn);
  _setText('bestWorstCloseBtn', Lall.closeBtn);
  _setText('messageOkBtn', Lall.messageOkBtn);
  _setText('syntaxHistoryModalOkBtn', Lall.closeBtn);
  _setText('actionOkBtn', Lall.submitBtn);
  _setText('actionChoiceManualBtn', Lall.actionChoiceManual);
  _setText('actionChoiceRandomBtn', Lall.actionChoiceRandom);

  const backBtn = langAppGetEl('backBtn');
  if(backBtn)
    backBtn.innerHTML = Lall.backBtn;
}

function langAppApplyAccessibilityTexts(Lall){
  const toggler = document.querySelector('.navbar-toggler');
  if(toggler)
    toggler.setAttribute('aria-label', Lall.navToggleLabel || 'Toggle navigation');

  document.querySelectorAll('.modal .close').forEach(btn => {btn.setAttribute('aria-label', Lall.closeBtn || 'Close');});
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

function langAppApplyManualModalTexts(Lall, language){
  const isMultipopManual = langAppIsContext('multipopManual');
  const isQueueManual = langAppIsContext('queueManual');
  
  if(!isMultipopManual && !isQueueManual)
    return;

  const Lmp = trPage('multipop', language);
  const Lq = trPage('queue', language);

  _setText('manualParamsModalLabel', isQueueManual ? (Lq.queueManualParamsModalLabel || '') : (Lmp.manualParamsModalLabel || ''));
  _setText('stackValuesLabel', isQueueManual ? (Lq.queueValuesLabel || '') : (Lmp.stackValuesLabel || ''));
  _setText('submitBtn', Lall.submitBtn);

  const manualExampleEl = langAppGetEl('manualParamsExample');
  if(manualExampleEl)
    manualExampleEl.innerHTML = isQueueManual ? (Lq.queueManualParamsExample || '') : (Lmp.manualParamsExample || '');
}

function langAppGetRandomSection(){
  if(langAppIsContext('multipopRandom'))
    return 'multipop';
  if(langAppIsContext('queueRandom'))
    return 'queue';
  if(langAppIsContext('splayRandom'))
    return 'splay';

  return null;
}

function langAppApplyRandomModalTexts(language, Lall){
  const randomModalLabel = langAppGetEl('randomParamsModalLabel');
  if(randomModalLabel)
    randomModalLabel.textContent = Lall.randomParamsModalLabel;

  _setText('rangeMinLabel', Lall.rangeMinLabel);
  _setText('rangeMaxLabel', Lall.rangeMaxLabel);
  _setText('countLabel', Lall.countLabel);
  _setText('generateBtn', Lall.generateBtn);

  const randomSection = langAppGetRandomSection();
  const Lrandom = randomSection ? trPage(randomSection, language) : {};

  const randomInfoEl = langAppGetEl('randomParamsInfo');
  if(randomInfoEl)
    randomInfoEl.innerHTML = Lrandom.randomParamsInfo || '';

  const rangeMinExampleEl = langAppGetEl('rangeMinExample');
  if(rangeMinExampleEl)
    rangeMinExampleEl.innerHTML = Lrandom.rangeMinExample || Lall.rangeMinExample || '';

  const rangeMaxExampleEl = langAppGetEl('rangeMaxExample');
  if(rangeMaxExampleEl)
    rangeMaxExampleEl.innerHTML = Lrandom.rangeMaxExample || Lall.rangeMaxExample || '';

  const countExampleEl = langAppGetEl('countExample');
  if(countExampleEl)
    countExampleEl.innerHTML = Lrandom.countExample || Lall.countExample || '';
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
  _setText('bestWorstModalLabel', Lall.selectCase);
  _setText('bestWorstModalText', Lall.bestWorstDescription);
}

function langAppUpdateMultipopManualTexts(){
  const Lmp = (typeof mpLang === 'function') ? mpLang() : trPage('multipop');

  const pushBtn = langAppGetEl('mpPushBtn');
  const popBtn = langAppGetEl('mpPopBtn');
  const multipopBtn = langAppGetEl('mpMultipopBtn');
  const historyBtn = langAppGetEl('mpManualHistoryBtn');
  const stackLabel = langAppGetEl('mpStackLabel');
  const randomNextBtn = langAppGetEl('mpRandomNextBtn');

  if(pushBtn)
    pushBtn.textContent = Lmp.pushButton || 'Push';
  if(popBtn)
    popBtn.textContent = Lmp.popButton || 'Pop';
  if(multipopBtn)
    multipopBtn.textContent = Lmp.multipopButton || 'Multipop';
  if(historyBtn)
    historyBtn.title = Lmp.syntaxHistoryButtonTitle || 'Open history';
  if(stackLabel)
    stackLabel.textContent = Lmp.stackLabel || 'Stack';
  if(randomNextBtn)
    randomNextBtn.textContent = Lmp.nextButton || trCommon().nextButton || 'Next';
}

function langAppRefreshMultipopView(){
  if(langAppGetEl('mpBwPanel')){
    if(typeof rebuildMpBestWorstForLanguage === 'function')
      rebuildMpBestWorstForLanguage();
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

    langAppUpdateMultipopManualTexts();

    if(typeof mpRenderManualInfoPanel === 'function')
      mpRenderManualInfoPanel();

    return;
  }

  if(langAppGetEl('mpSynPanel')){
    if(typeof rebuildMpSyntaxStepsForLanguage === 'function')
      rebuildMpSyntaxStepsForLanguage();
    if(typeof displaySyntaxUI === 'function')
      displaySyntaxUI();

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
  const randomNextBtn = langAppGetEl('qRandomNextBtn');

  if(enqueueBtn)
    enqueueBtn.textContent = Lq.enqueueButton || 'Enqueue';
  if(dequeueBtn)
    dequeueBtn.textContent = Lq.dequeueButton || 'Dequeue';
  if(historyBtn)
    historyBtn.title = Lq.syntaxHistoryButtonTitle || 'Open history';
  if(randomNextBtn)
    randomNextBtn.textContent = Lq.nextButton || trCommon().nextButton || 'Next';
}

function langAppRefreshQueueView(){
  if(langAppGetEl('qBwPanel')){
    if(typeof rebuildQueueBestWorstForLanguage === 'function')
      rebuildQueueBestWorstForLanguage();
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

    langAppUpdateQueueManualTexts();
    
    if(typeof qRenderManualInfoPanel === 'function')
      qRenderManualInfoPanel();

    return;
  }

  if(langAppGetEl('qSynPanel')){
    if(typeof rebuildQueueSyntaxStepsForLanguage === 'function')
      rebuildQueueSyntaxStepsForLanguage();
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
  document.documentElement.lang = language === 'cz' ? 'cs' : 'en';

  const Lall = trAll(language);

  langAppApplyCommonStaticTexts(Lall);
  langAppApplyAccessibilityTexts(Lall);
  langAppApplyAlgorithmSelectionTexts(Lall);
  langAppApplyPageTexts(language, Lall);
  langAppApplyParameterButtonTexts(Lall);
  langAppApplyManualModalTexts(Lall, language);
  langAppApplyRandomModalTexts(language, Lall);
  langAppApplySyntaxModalTexts(Lall);
  langAppApplyBestWorstModalTexts(Lall);

  refreshCurrentViewAfterLanguageChange();

  if(typeof refreshOpenTransientModalsForLanguage === 'function')
    refreshOpenTransientModalsForLanguage();
  if(typeof refreshOpenBestWorstModalForLanguage === 'function')
    refreshOpenBestWorstModalForLanguage();
  if(typeof refreshOpenHistoryModalForLanguage === 'function')
    refreshOpenHistoryModalForLanguage();
  if(typeof updateThemeToggleUI === 'function')
    updateThemeToggleUI();
}