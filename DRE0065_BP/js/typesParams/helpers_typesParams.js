function typesParamsGetLang(){
  return (typeof getLang === 'function') ? getLang() : (localStorage.getItem('language') || 'en');
}

function typesParamsGetTranslationsRoot(lang = typesParamsGetLang()){
  if(window.translations && window.translations[lang])
    return window.translations[lang];

  return window.translations?.en || {};
}

function typesParamsGetSectionByAlgorithm(alg){
  if(alg === 'multipop')
    return 'multipop';
  if(alg === 'queue2Stacks')
    return 'queue';
  if(alg === 'splayTree')
    return 'splay';

  return null;
}

function getLangData(){
  const root = typesParamsGetTranslationsRoot();
  const section = typesParamsGetSectionByAlgorithm(getActiveAlg());

  if(!section)
    return {...(root.common || {})};

  return {...(root.common || {}), ...(root[section] || {})};
}

function refreshLang(){
  changeLanguage(typesParamsGetLang());
}

function getActiveAlg(){
  return (typeof currentPage !== 'undefined') ? currentPage : 'main';
}

function typesParamsParsePositiveIntegerList(input){
  const tokens = String(input || '').split(',').map(v => v.trim()).filter(v => v !== '');
  const values = tokens.map(v => Number(v)).filter(n => Number.isInteger(n) && n > 0);

  return {tokens, values, isValid: values.length === tokens.length};
}

function parsePositiveIntList(input){
  return typesParamsParsePositiveIntegerList(input).values;
}

function getAlgConfig(){
  const alg = getActiveAlg();
  return ALG_REGISTRY[alg] || null;
}

function getBestWorstExecutionMode(){
  const el = document.querySelector('input[name="bwExecutionMode"]:checked');
  return el ? el.value : 'auto';
}

function getRandomIntInclusive(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function typesParamsSetActiveContext(context){
  activeModalContext = context;
  refreshLang();
}

function typesParamsClearInputField(id){
  const input = document.getElementById(id);
  if(!input)
    return;

  input.value = '';
  input.removeAttribute('placeholder');
}

function typesParamsHideModalAndResetForm(modalSelector, formId){
  $(modalSelector).modal('hide');
  document.getElementById(formId)?.reset();
}

function typesParamsGenerateValuesInRange(min, max, count, {unique = false} = {}){
  const rangeSize = max - min + 1;
  let values = [];

  if(unique){
    const used = new Set();

    while(values.length < count){
      const value = getRandomIntInclusive(min, max);

      if(!used.has(value)){
        used.add(value);
        values.push(value);
      }
    }

    return values;
  }

  values = Array.from({length: count}, () => getRandomIntInclusive(min, max));
  return values;
}

function typesParamsStoreRandomRangeForActiveAlgorithm(min, max){
  const alg = getActiveAlg();

  if(alg === 'multipop'){
    mpRandomMin = min;
    mpRandomMax = max;
    return;
  }
  if(alg === 'queue2Stacks'){
    qRandomMin = min;
    qRandomMax = max;
    return;
  }
  if(alg === 'splayTree'){
    sRandomMin = min;
    sRandomMax = max;
  }
}

function typesParamsStartMultipopWithValues(values){
  mpManualInfoIndex = -1;
  mpManualInfoOpen = false;
  mpManualHistory = [];
  stackArray = [...values];
  stepCount = stackArray.length;
  potential = stackArray.length;

  if(typeof mpManualSeedHistoryFromValues === 'function')
    mpManualSeedHistoryFromValues(values);
  if(typeof displayStack === 'function')
    displayStack(stackArray);
  if(typeof updateCounters === 'function')
    updateCounters();
}

function typesParamsStartQueueWithValues(values){
  if(typeof qInitManual === 'function')
    qInitManual(values);
}

function typesParamsStartSplayWithValues(values, source){
  if(typeof sResetAll === 'function')
    sResetAll();
  if(typeof sRenderManualUI === 'function')
    sRenderManualUI();
  if(typeof sBuildInitial === 'function')
    sBuildInitial(values, {source});
}

function typesParamsStartSplayManualWithValues(values){
  typesParamsStartSplayWithValues(values, 'manual');
}

function typesParamsStartSplayRandomWithValues(values){
  typesParamsStartSplayWithValues(values, 'random');
}

function typesParamsRunMultipopBestCase(executionMode = 'auto'){
  if(typeof executeBestCase === 'function')
    executeBestCase(executionMode);
}

function typesParamsRunMultipopWorstCase(executionMode = 'auto'){
  if(typeof executeWorstCase === 'function')
    executeWorstCase(executionMode);
}

function typesParamsRunQueueBestCase(executionMode = 'auto'){
  if(typeof qStartBestWorst === 'function')
    qStartBestWorst('best', executionMode);
}

function typesParamsRunQueueWorstCase(executionMode = 'auto'){
  if(typeof qStartBestWorst === 'function')
    qStartBestWorst('worst', executionMode);
}

function typesParamsRunSplayBestCase(executionMode = 'auto'){
  if(typeof sStartBestWorst === 'function')
    sStartBestWorst('best', executionMode);
}

function typesParamsRunSplayWorstCase(executionMode = 'auto'){
  if(typeof sStartBestWorst === 'function')
    sStartBestWorst('worst', executionMode);
}

function typesParamsResetMultipopSyntaxState(){
  mpBusy = false;
  isBestWorstMode = false;
  stackArray = [];
  stepCount = 0;
  potential = 0;
  syntaxCommands = [];
  steps = [];
  currentCommandIndex = 0;
}

function typesParamsResetQueueSyntaxState(){
  if(typeof qResetState === 'function')
    qResetState();
}

function typesParamsStartMultipopSyntax(){
  if(typeof startSyntaxExample === 'function')
    startSyntaxExample();
}

function typesParamsStartQueueSyntax(){
  if(typeof startQueue2StacksSyntaxExample === 'function')
    startQueue2StacksSyntaxExample();
}

function typesParamsStartSplaySyntax(){
  if(typeof sSubmitSplaySyntax === 'function')
    sSubmitSplaySyntax();
}

const ALG_REGISTRY = Object.freeze({
  multipop: {
    contexts: {manual: 'multipopManual', random: 'multipopRandom', bestWorst: 'multipopBestWorst', syntax: 'multipopSyntax'},
    manual: {type: 'stackModal', start: typesParamsStartMultipopWithValues},
    random: {type: 'randomModal', unique: false, start: typesParamsStartMultipopWithValues},
    bestWorst: {best: typesParamsRunMultipopBestCase, worst: typesParamsRunMultipopWorstCase},
    syntax: {resetBeforeOpen: typesParamsResetMultipopSyntaxState, start: typesParamsStartMultipopSyntax}
  },
  queue2Stacks: {
    contexts: {manual: 'queueManual', random: 'queueRandom', bestWorst: 'queueBestWorst', syntax: 'queueSyntax'},
    manual: {type: 'stackModal', start: typesParamsStartQueueWithValues},
    random: {type: 'randomModal', unique: false, start: typesParamsStartQueueWithValues},
    bestWorst: {best: typesParamsRunQueueBestCase, worst: typesParamsRunQueueWorstCase},
    syntax: {resetBeforeOpen: typesParamsResetQueueSyntaxState, start: typesParamsStartQueueSyntax}
  },
  splayTree: {
    contexts: {manual: 'splayManual', random: 'splayRandom', bestWorst: 'splayBestWorst', syntax: 'splaySyntax'},
    manual: {type: 'actionInput', titleKey: 'splayInitTitle', labelKey: 'splayInitLabel', infoKey: 'splayInitInfo', invalidKey: 'splayInitInvalid', start: typesParamsStartSplayManualWithValues},
    random: {type: 'randomModal', unique: true, tooManyKey: 'splayRandomTooManyAlert', start: typesParamsStartSplayRandomWithValues},
    bestWorst: {best: typesParamsRunSplayBestCase, worst: typesParamsRunSplayWorstCase},
    syntax: {start: typesParamsStartSplaySyntax}
  }
});