function _resetOnPageEnter(){
  stackArray = [];
  steps = [];
  stepCount = 0;
  potential = 0;
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

function changeContent(page){
  _resetOnPageEnter();
  currentPage = page;

  document.getElementById('algorithmLinks').style.display = 'none';
  document.getElementById('backArrow').style.display = 'block';

  const cfg = getPageCfg(page);
  if(!cfg)
    return;

  const language = localStorage.getItem('language') || 'en';
  const L = trPage(cfg.section, language);
  const title = L[cfg.titleKey];
  const about = L[cfg.aboutKey];
  const desc = L[cfg.descKey];

  const contentDiv = document.getElementById('dynamicContent');
  contentDiv.innerHTML = _renderAlgParams(title, L);

  const aboutBtn = document.getElementById('aboutAppBtn');
  const modalTitle = document.getElementById('aboutModalLabel');
  aboutBtn.textContent = about;
  modalTitle.textContent = about;

  document.getElementById('aboutModalBody').innerHTML = desc;
  document.title = title;
}

function goBack(){
  currentPage = 'main';
  document.getElementById('algorithmLinks').style.display = 'block';
  document.getElementById('backArrow').style.display = 'none';
  document.getElementById('dynamicContent').innerHTML = '';

  const language = localStorage.getItem('language') || 'en';
  changeLanguage(language);
}