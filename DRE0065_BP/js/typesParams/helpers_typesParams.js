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

function getSpecialCasesExecutionMode(){
  const el = document.querySelector('input[name="scExecutionMode"]:checked');
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

function typesParamsSetOperationPreviewVisible(prefix, visible){
  const root = document.getElementById(`${prefix}RandomOpSwitcher`);
  if(root)
    root.classList.toggle('hidden', !visible);
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
  if(typeof mpStartSpecialCases === 'function')
    mpStartSpecialCases(scenarioId, executionMode);
}

function typesParamsGetQueueSpecialScenarios(){
  return (typeof qGetSpecialCaseOptions === 'function') ? qGetSpecialCaseOptions() : [];
}

function typesParamsRunQueueSpecialScenario(scenarioId, executionMode = 'auto'){
  if(typeof qStartSpecialCases === 'function')
    qStartSpecialCases(scenarioId, executionMode);
}

function typesParamsGetSplaySpecialScenarios(){
  return (typeof sGetSpecialCaseOptions === 'function') ? sGetSpecialCaseOptions() : [];
}

function typesParamsRunSplaySpecialScenario(scenarioId, executionMode = 'auto'){
  if(typeof sStartSpecialCases === 'function')
    sStartSpecialCases(scenarioId, executionMode);
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

function typesParamsGetOperationPreviewLabels(){
  const L = trCommon();
  return {prev: L.operationPrevLabel || 'Previous', current: L.operationCurrentLabel || 'Current', next: L.operationNextLabel || 'Next', empty: L.operationPreviewEmpty || '—'};
}

function typesParamsBuildOperationPreviewHtml(prefix, state = {}){
  const labels = typesParamsGetOperationPreviewLabels();

  function cell(slot, labelText, value, extraClass = ''){
    const isEmpty = !value;

    return `
      <div id="${prefix}Random${slot}Cell" class="random-op-switcher-card${extraClass}${isEmpty ? ' is-empty' : ''}">
        <div id="${prefix}Random${slot}Label" class="random-op-switcher-label">${labelText}</div>
        <div id="${prefix}Random${slot}Value" class="random-op-switcher-value">${value || labels.empty}</div>
      </div>`;
  }

  return `
    <div id="${prefix}RandomOpSwitcher" class="random-op-switcher">
      <div class="random-op-switcher-track">
        ${cell('Prev', labels.prev, state.prev || '')}
        ${cell('Current', labels.current, state.current || '', ' is-current')}
        ${cell('Next', labels.next, state.next || '')}
      </div>
    </div>`;
}

function typesParamsUpdateOperationPreview(prefix, state = {}, animate = false){
  const root = document.getElementById(`${prefix}RandomOpSwitcher`);
  if(!root)
    return;

  const labels = typesParamsGetOperationPreviewLabels();
  function setText(id, value){
    const el = document.getElementById(id);
    if(el)
      el.textContent = value;
  }

  function apply(slot, value){
    const valueEl = document.getElementById(`${prefix}Random${slot}Value`);
    const cellEl = document.getElementById(`${prefix}Random${slot}Cell`);
    const safeValue = value || '';

    if(valueEl)
      valueEl.textContent = safeValue || labels.empty;
    if(cellEl)
      cellEl.classList.toggle('is-empty', !safeValue);
  }

  setText(`${prefix}RandomPrevLabel`, labels.prev);
  setText(`${prefix}RandomCurrentLabel`, labels.current);
  setText(`${prefix}RandomNextLabel`, labels.next);

  apply('Prev', state.prev || '');
  apply('Current', state.current || '');
  apply('Next', state.next || '');

  if(!animate)
    return;

  root.classList.remove('is-animating');
  void root.offsetWidth;
  root.classList.add('is-animating');

  clearTimeout(root._opPreviewTimer);
  root._opPreviewTimer = setTimeout(() => {root.classList.remove('is-animating');}, 340);
}

const ALG_REGISTRY = Object.freeze({
  multipop: {
    contexts: {manual: 'multipopManual', random: 'multipopRandom', specialCases: 'multipopSpecialCases', syntax: 'multipopSyntax'},
    manual: {type: 'stackModal', start: typesParamsStartMultipopWithValues},
    random: {type: 'randomModal', start: typesParamsStartMultipopRandomMode},
    specialCases: {getScenarios: typesParamsGetMultipopSpecialScenarios, start: typesParamsRunMultipopSpecialScenario},
    syntax: {resetBeforeOpen: typesParamsResetMultipopSyntaxState, start: typesParamsStartMultipopSyntax}
  },
  queue2Stacks: {
    contexts: {manual: 'queueManual', random: 'queueRandom', specialCases: 'queueSpecialCases', syntax: 'queueSyntax'},
    manual: {type: 'stackModal', start: typesParamsStartQueueWithValues},
    random: {type: 'randomModal', start: typesParamsStartQueueRandomMode},
    specialCases: {getScenarios: typesParamsGetQueueSpecialScenarios, start: typesParamsRunQueueSpecialScenario},
    syntax: {resetBeforeOpen: typesParamsResetQueueSyntaxState, start: typesParamsStartQueueSyntax}
  },
  splayTree: {
    contexts: {manual: 'splayManual', random: 'splayRandom', specialCases: 'splaySpecialCases', syntax: 'splaySyntax'},
    manual: {type: 'actionInput', titleKey: 'splayInitTitle', labelKey: 'splayInitLabel', infoKey: 'splayInitInfo', invalidKey: 'splayInitInvalid', start: typesParamsStartSplayManualWithValues},
    random: {type: 'randomModal', start: typesParamsStartSplayRandomMode},
    specialCases: {getScenarios: typesParamsGetSplaySpecialScenarios, start: typesParamsRunSplaySpecialScenario},
    syntax: {start: typesParamsStartSplaySyntax}
  }
});