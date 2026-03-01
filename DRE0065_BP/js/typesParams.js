function getLangData(){
  const lang = localStorage.getItem('language') || 'en';
  return (window.translations && window.translations[lang]) ? window.translations[lang] : window.translations.en;
}

function refreshLang(){
  changeLanguage(localStorage.getItem('language') || 'en');
}

function getActiveAlg(){
  return (typeof currentPage !== 'undefined') ? currentPage : 'main';
}

function parsePositiveIntList(input){
  return (input || '')
    .split(',')
    .map(v => v.trim())
    .filter(v => v !== '')
    .map(v => Number(v))
    .filter(n => Number.isInteger(n) && n > 0);
}

function openManualParamsModalU(){
  const alg = getActiveAlg();
  activeModalContext = (alg === 'queue2Stacks') ? 'queueManual' : 'multipopManual';
  refreshLang();

  $('#manualParamsModal').modal('show');

  const input = document.getElementById('stackValues');
  if(input){ input.value = ''; input.placeholder = "1, 2, 3, 4"; }

  const submitBtn = document.getElementById('submitBtn');
  if(submitBtn) submitBtn.onclick = submitManualParamsU;
}

function openRandomParamsModalU(){
  const alg = getActiveAlg();
  activeModalContext = (alg === 'queue2Stacks') ? 'queueRandom' : 'multipopRandom';
  refreshLang();

  $('#randomParamsModal').modal('show');

  const generateBtn = document.getElementById('generateBtn');
  if(generateBtn) generateBtn.onclick = submitRandomParamsU;
}

function openBestWorstParamsModalU(){
  const alg = getActiveAlg();
  activeModalContext = (alg === 'queue2Stacks') ? 'queueBestWorst' : 'multipopBestWorst';
  refreshLang();

  const btns = document.querySelectorAll('#bestWorstModal .caseButton');

  if(alg === 'queue2Stacks'){
    if(btns[0]) btns[0].onclick = executeQueue2StacksBestCase;
    if(btns[1]) btns[1].onclick = executeQueue2StacksWorstCase;
  }else{
    if(btns[0]) btns[0].onclick = executeBestCase;
    if(btns[1]) btns[1].onclick = executeWorstCase;
  }

  $('#bestWorstModal').modal('show');
}

function openSyntaxModalU(){
  const alg = getActiveAlg();
  activeModalContext = (alg === 'queue2Stacks') ? 'queueSyntax' : 'multipopSyntax';

  if(alg === 'queue2Stacks'){
    if(typeof resetQueue2StacksState === 'function') resetQueue2StacksState();
  }else{
    mpBusy = false;
    isBestWorstMode = false;
    stackArray = [];
    stepCount = 0;
    potential = 0;
    syntaxCommands = [];
    steps = [];
    currentCommandIndex = 0;
  }

  refreshLang();

  $('#syntaxModal').modal('show');

  const input = document.getElementById('syntaxInput');
  if(input) input.value = '';

  const btn = document.getElementById('startSyntaxBtn');
  if(btn) btn.onclick = startSyntaxExampleUniversalU;
}

function submitManualParamsU()
{
  const langData = getLangData();
  const alg = getActiveAlg();

  const raw = document.getElementById('stackValues')?.value?.trim() || '';
  if(!raw)
  {
    showAppMessage(langData.enterValuePrompt); 
    return;
  }

  const values = parsePositiveIntList(raw);
  if(values.length === 0)
  {
    showAppMessage(langData.invalidNumberAlert);
    return;
  }

  $('#manualParamsModal').modal('hide');
  document.getElementById('manualParamsForm')?.reset();

  if(alg === 'queue2Stacks')
  {
    if(typeof initQueue2StacksManual === 'function') 
      initQueue2StacksManual(values);
  }
  else
  {
    stackArray = [...values];
    stepCount = 0;
    potential = stackArray.length;

    if(typeof displayStack === 'function') 
      displayStack(stackArray);
    if(typeof updateCounters === 'function') 
      updateCounters();
  }
}

function submitRandomParamsU()
{
  const langData = getLangData();
  const alg = getActiveAlg();
  const min = parseInt(document.getElementById('rangeMin')?.value, 10);
  const max = parseInt(document.getElementById('rangeMax')?.value, 10);
  const count = parseInt(document.getElementById('count')?.value, 10);

  if(isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count <= 0)
  {
    showAppMessage(langData.invalidNumberAlert);
    return;
  }

  const values = Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1)) + min);

  $('#randomParamsModal').modal('hide');
  document.getElementById('randomParamsForm')?.reset();

  if(alg === 'queue2Stacks')
  {
    if(typeof initQueue2StacksManual === 'function')
      initQueue2StacksManual(values);
  }
  else
  {
    stackArray = [...values];
    stepCount = 0;
    potential = stackArray.length;

    if(typeof displayStack === 'function')
      displayStack(stackArray);
    if(typeof updateCounters === 'function')
      updateCounters();
  }
}

function startSyntaxExampleUniversalU(){
  const alg = getActiveAlg();
  if(alg === 'queue2Stacks'){
    if(typeof startQueue2StacksSyntaxExample === 'function') startQueue2StacksSyntaxExample();
  }else{
    if(typeof startSyntaxExample === 'function') startSyntaxExample();
  }
}

function openAlg2ManualParamsModal(){ openManualParamsModalU(); }
function openAlg2RandomParamsModal(){ openRandomParamsModalU(); }
function openAlg2BestWorstParamsModal(){ openBestWorstParamsModalU(); }
function openAlg2SyntaxModal(){ openSyntaxModalU(); }