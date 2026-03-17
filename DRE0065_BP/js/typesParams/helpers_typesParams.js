function getLangData(){
  const lang = localStorage.getItem('language') || 'en';
  const root = (window.translations && window.translations[lang]) ? window.translations[lang] : window.translations.en || {};
  const alg = getActiveAlg();

  if(alg === 'multipop')
    return {...(root.common || {}), ...(root.multipop || {})};
  if(alg === 'queue2Stacks')
    return {...(root.common || {}), ...(root.queue || {})};
  if(alg === 'splayTree')
    return {...(root.common || {}), ...(root.splay || {})};

  return {...(root.common || {})};
}

function refreshLang(){
  changeLanguage(localStorage.getItem('language') || 'en');
}

function getActiveAlg(){
  return(typeof currentPage !== 'undefined') ? currentPage : 'main';
}

function parsePositiveIntList(input){
  return(input || '').split(',').map(v => v.trim()).filter(v => v !== '').map(v => Number(v)).filter(n => Number.isInteger(n) && n > 0);
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

const ALG_REGISTRY = {
  multipop:{
    contexts: {manual: 'multipopManual', random: 'multipopRandom', bestWorst: 'multipopBestWorst', syntax: 'multipopSyntax'},
    manual: {type: 'stackModal',
      start(values){
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
    },
    random: {type: 'randomModal', unique: false,
      start(values){
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
    },
    bestWorst: {
      best(executionMode = 'auto'){ 
        if(typeof executeBestCase === 'function')
          executeBestCase(executionMode);
      },
      worst(executionMode = 'auto'){
        if(typeof executeWorstCase === 'function')
          executeWorstCase(executionMode);
      }
    },
    syntax: {
      resetBeforeOpen(){
        mpBusy = false;
        isBestWorstMode = false;
        stackArray = [];
        stepCount = 0;
        potential = 0;
        syntaxCommands = [];
        steps = [];
        currentCommandIndex = 0;
      },
      start(){
        if(typeof startSyntaxExample === 'function')
          startSyntaxExample();
      }
    }
  },
  queue2Stacks: {
    contexts: {manual: 'queueManual', random: 'queueRandom', bestWorst: 'queueBestWorst', syntax: 'queueSyntax'},
    manual: {type: 'stackModal',
      start(values){
        if(typeof initQueue2StacksManual === 'function')
          initQueue2StacksManual(values);
      }
    },
    random: {type: 'randomModal', unique: false,
      start(values){
        if(typeof initQueue2StacksManual === 'function')
          initQueue2StacksManual(values);
      }
    },
    bestWorst: {
      best(executionMode = 'auto'){
        if(typeof executeQueue2StacksBestCase === 'function')
          executeQueue2StacksBestCase(executionMode);
      },
      worst(executionMode = 'auto'){
        if(typeof executeQueue2StacksWorstCase === 'function')
          executeQueue2StacksWorstCase(executionMode);
      }
    },
    syntax: {
      resetBeforeOpen(){
        if(typeof resetQueue2StacksState === 'function')
          resetQueue2StacksState();
      },
      start(){
        if(typeof startQueue2StacksSyntaxExample === 'function')
          startQueue2StacksSyntaxExample();
      }
    }
  },
  splayTree: {
    contexts: {manual: 'splayManual', random: 'splayRandom', bestWorst: 'splayBestWorst', syntax: 'splaySyntax'},
    manual: {type: 'actionInput', titleKey: 'splayInitTitle', labelKey: 'splayInitLabel', infoKey: 'splayInitInfo', placeholderKey: 'splayInitPlaceholder', invalidKey: 'splayInitInvalid',
      start(values){
        if(typeof sResetAll === 'function')
          sResetAll();
        if(typeof sRenderManualUI === 'function')
          sRenderManualUI();
        if(typeof sBuildInitial === 'function')
          sBuildInitial(values, {source:'manual'});
      }
    },
    random: {type: 'randomModal', unique: true, tooManyKey: 'splayRandomTooManyAlert',
      start(values){
        if(typeof sResetAll === 'function')
          sResetAll();
        if(typeof sRenderManualUI === 'function')
          sRenderManualUI();
        if(typeof sBuildInitial === 'function')
          sBuildInitial(values, {source:'random'});
      }
    },
    bestWorst: {
      best(executionMode = 'auto'){
        if(typeof sStartBestWorst === 'function')
          sStartBestWorst('best', executionMode);
      },
      worst(executionMode = 'auto'){
        if(typeof sStartBestWorst === 'function')
          sStartBestWorst('worst', executionMode);
      }
    },
    syntax: {
      start(){
        if(typeof sSubmitSplaySyntax === 'function')
          sSubmitSplaySyntax();
      }
    }
  }
};