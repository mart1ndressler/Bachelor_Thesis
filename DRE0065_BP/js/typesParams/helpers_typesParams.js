function typesParamsGetSectionByAlgorithm(alg){
  return getPageCfg(alg)?.section || null;
}

function getLangData(){
  const section = typesParamsGetSectionByAlgorithm(getActiveAlg());
  if(!section)
    return trAll();

  return trPage(section);
}

function refreshLang(){
  changeLanguage(getLang());
}

function getActiveAlg(){
  return (typeof currentPage !== 'undefined') ? currentPage : 'main';
}

function typesParamsParsePositiveIntegerList(input){
  const tokens = String(input || '').split(',').map(v => v.trim()).filter(v => v !== '');
  const values = tokens.map(v => Number(v)).filter(n => Number.isInteger(n) && n > 0);

  return {tokens, values, isValid: values.length === tokens.length};
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
  if(typeof mpInitManual === 'function')
    mpInitManual(values);
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

function typesParamsGetMultipopSpecialScenarios(){
  return (typeof mpGetSpecialCaseOptions === 'function') ? mpGetSpecialCaseOptions() : [];
}

function typesParamsRunMultipopSpecialScenario(scenarioId, executionMode = 'auto'){
  if(typeof mpStartBestWorst === 'function')
    mpStartBestWorst(scenarioId, executionMode);
}

function typesParamsGetQueueSpecialScenarios(){
  return (typeof qGetSpecialCaseOptions === 'function') ? qGetSpecialCaseOptions() : [];
}

function typesParamsRunQueueSpecialScenario(scenarioId, executionMode = 'auto'){
  if(typeof qStartBestWorst === 'function')
    qStartBestWorst(scenarioId, executionMode);
}

function typesParamsGetSplaySpecialScenarios(){
  return (typeof sGetSpecialCaseOptions === 'function') ? sGetSpecialCaseOptions() : [];
}

function typesParamsRunSplaySpecialScenario(scenarioId, executionMode = 'auto'){
  if(typeof sStartBestWorst === 'function')
    sStartBestWorst(scenarioId, executionMode);
}

function typesParamsResetMultipopSyntaxState(){
  if(typeof mpResetState === 'function')
    mpResetState();
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

function typesParamsStartMultipopRandomMode(params){
  if(typeof mpStartRandomMode === 'function')
    mpStartRandomMode(params);
}

function typesParamsStartQueueRandomMode(params){
  if(typeof qStartRandomMode === 'function')
    qStartRandomMode(params);
}

function typesParamsStartSplayRandomMode(params){
  if(typeof sStartRandomMode === 'function')
    sStartRandomMode(params);
}

const ALG_REGISTRY = Object.freeze({
  multipop: {
    contexts: {manual: 'multipopManual', random: 'multipopRandom', bestWorst: 'multipopBestWorst', syntax: 'multipopSyntax'},
    manual: {type: 'stackModal', start: typesParamsStartMultipopWithValues},
    random: {type: 'randomModal', start: typesParamsStartMultipopRandomMode},
    bestWorst: {getScenarios: typesParamsGetMultipopSpecialScenarios, start: typesParamsRunMultipopSpecialScenario},
    syntax: {resetBeforeOpen: typesParamsResetMultipopSyntaxState, start: typesParamsStartMultipopSyntax}
  },
  queue2Stacks: {
    contexts: {manual: 'queueManual', random: 'queueRandom', bestWorst: 'queueBestWorst', syntax: 'queueSyntax'},
    manual: {type: 'stackModal', start: typesParamsStartQueueWithValues},
    random: {type: 'randomModal', start: typesParamsStartQueueRandomMode},
    bestWorst: {getScenarios: typesParamsGetQueueSpecialScenarios, start: typesParamsRunQueueSpecialScenario},
    syntax: {resetBeforeOpen: typesParamsResetQueueSyntaxState, start: typesParamsStartQueueSyntax}
  },
  splayTree: {
    contexts: {manual: 'splayManual', random: 'splayRandom', bestWorst: 'splayBestWorst', syntax: 'splaySyntax'},
    manual: {type: 'actionInput', titleKey: 'splayInitTitle', labelKey: 'splayInitLabel', infoKey: 'splayInitInfo', invalidKey: 'splayInitInvalid', start: typesParamsStartSplayManualWithValues},
    random: {type: 'randomModal', start: typesParamsStartSplayRandomMode},
    bestWorst: {getScenarios: typesParamsGetSplaySpecialScenarios, start: typesParamsRunSplaySpecialScenario},
    syntax: {start: typesParamsStartSplaySyntax}
  }
});