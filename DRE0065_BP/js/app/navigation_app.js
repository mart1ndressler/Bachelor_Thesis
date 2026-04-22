function navAppGetEl(id){
  return document.getElementById(id);
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

function _renderAlgParams(){
  return `
    <div class="alg_parameters">
      <h2></h2>
      <button class="btn btn-primary" onclick="openManualParamsModalU()"></button>
      <button class="btn btn-primary" onclick="openRandomParamsModalU()"></button>
      <button class="btn btn-primary" onclick="openSpecialCasesParamsModalU()"></button>
      <button class="btn btn-primary" onclick="openSyntaxModalU()"></button>
    </div>
  `;
}

function closeNavbarMenu(){
  const nav = navAppGetEl('navbarNav');
  if(nav && nav.classList.contains('show'))
    $('#navbarNav').collapse('hide');
}

function cancelAllRunningSimulations(){
  if(typeof mpResetState === 'function')
    mpResetState();
  if(typeof qResetState === 'function')
    qResetState();
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

function changeContent(page){
  closeNavbarMenu();

  const cfg = getPageCfg(page);
  if(!cfg)
    return;

  cancelAllRunningSimulations();

  currentPage = page;
  navAppApplyAlgorithmShell();
  navAppSetDynamicContent(_renderAlgParams());

  changeLanguage(getLang());
}

function goBack(){
  closeNavbarMenu();
  cancelAllRunningSimulations();

  currentPage = 'main';
  navAppApplyMainShell();

  changeLanguage(getLang());
}

function returnToMainPageFromSyntax(fallbackAlgorithm){
  if(typeof goBack === 'function'){
    goBack();
    return;
  }

  if(typeof changeContent === 'function' && fallbackAlgorithm)
    changeContent(fallbackAlgorithm);
}