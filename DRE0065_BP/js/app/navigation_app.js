function navAppGetEl(id){
  return document.getElementById(id);
}

function navAppGetLanguage(){
  return (typeof getLang === 'function') ? getLang() : (localStorage.getItem('language') || 'en');
}

function navAppSetDisplay(id, value){
  const el = navAppGetEl(id);
  if(el)
    el.style.display = value;
}

function navAppSetDynamicContent(html){
  const content = navAppGetEl('dynamicContent');
  if(content)
    content.innerHTML = html;
}

function _resetOnPageEnter(){
  if(typeof stackArray !== 'undefined')
    stackArray = [];
  if(typeof steps !== 'undefined')
    steps = [];
  if(typeof stepCount !== 'undefined')
    stepCount = 0;
  if(typeof potential !== 'undefined')
    potential = 0;
  if(typeof isBestWorstMode !== 'undefined')
    isBestWorstMode = false;
}

function _renderAlgParams(title, L){
  return `
    <div class="alg_parameters">
      <h2>${title}</h2>
      <button class="btn btn-primary" onclick="openManualParamsModalU()">${L.manualButton}</button>
      <button class="btn btn-primary" onclick="openRandomParamsModalU()">${L.randomButton}</button>
      <button class="btn btn-primary" onclick="openBestWorstParamsModalU()">${L.bestWorstButton}</button>
      <button class="btn btn-primary" onclick="openSyntaxModalU()">${L.syntaxButton}</button>
    </div>
  `;
}

function closeNavbarMenu(){
  const nav = navAppGetEl('navbarNav');
  if(nav && nav.classList.contains('show'))
    $('#navbarNav').collapse('hide');
}

function cancelAllRunningSimulations(){
  if(typeof mpCancelRunning === 'function')
    mpCancelRunning();
  if(typeof qCancelRunning === 'function')
    qCancelRunning();
  if(typeof sResetAll === 'function')
    sResetAll();

  $('.modal').modal('hide');
}

function navAppApplyAlgorithmShell(){
  navAppSetDisplay('algorithmLinks', 'none');
  navAppSetDisplay('backArrow', 'block');
}

function navAppApplyMainShell(){
  navAppSetDisplay('algorithmLinks', 'block');
  navAppSetDisplay('backArrow', 'none');
  navAppSetDynamicContent('');
}

function navAppApplyPageMeta(title, about, desc){
  const aboutBtn = navAppGetEl('aboutAppBtn');
  const modalTitle = navAppGetEl('aboutModalLabel');
  const modalBody = navAppGetEl('aboutModalBody');

  if(aboutBtn)
    aboutBtn.textContent = about;
  if(modalTitle)
    modalTitle.textContent = about;
  if(modalBody)
    modalBody.innerHTML = desc;

  document.title = title;
}

function changeContent(page){
  closeNavbarMenu();

  const cfg = getPageCfg(page);
  if(!cfg)
    return;

  cancelAllRunningSimulations();
  _resetOnPageEnter();

  currentPage = page;
  navAppApplyAlgorithmShell();

  const language = navAppGetLanguage();
  const L = trPage(cfg.section, language);

  const title = L[cfg.titleKey];
  const about = L[cfg.aboutKey];
  const desc = L[cfg.descKey];

  navAppSetDynamicContent(_renderAlgParams(title, L));
  navAppApplyPageMeta(title, about, desc);
}

function goBack(){
  closeNavbarMenu();
  cancelAllRunningSimulations();

  currentPage = 'main';
  navAppApplyMainShell();

  changeLanguage(navAppGetLanguage());
}