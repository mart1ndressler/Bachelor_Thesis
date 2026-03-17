let qIn = [], qOut = [], qStepCount = 0, qPotential = 0, qBusy = false, qSyntaxCommands = [], qSyntaxSteps = [], qSyntaxIndex = 0, qIsSyntaxMode = false, qLastInfo = null, qShowInfoPanel = false, qIsBestWorstMode = false, qBestWorstMode = null, qRunToken = 0, qRunTimer = null, qSynHistory = [], qSynHistoryCursor = -1, qSynFinished = false, qBwCommands = [], qBwSteps = [], qBwCursor = 0, qBwExecutionMode = 'auto', qBwPaused = false, qBwFinished = false, qBwHistory = [], qBwHistoryCursor = -1, qBwFastForward = false, qSkipAnimations = false, qManualHistory = [], qManualInfoIndex = -1, qManualInfoOpen = false, qRandomMin = 1, qRandomMax = 99, qBwInitialScenario = null;

function qLang(){
  const lang = localStorage.getItem('language') || 'en';
  const t = window.translations?.[lang] || {};
  return {...(t.common || {}), ...(t.queue || {})};
}

function qFmt(template, params = {}){
  return(template || '').replace(/\{(\w+)\}/g, (_, k) => {
    return(params[k] !== undefined) ? params[k] : `{${k}}`;
  });
}

function qCancelRunning(){
  qRunToken++;

  if(qRunTimer){
    clearTimeout(qRunTimer);
    qRunTimer = null;
  }

  qBusy = false;
  qIsBestWorstMode = false;
  qBestWorstMode = null;
  qShowInfoPanel = false;
  qSynHistory = [];
  qSynHistoryCursor = -1;
  qSynFinished = false;
  qBwCommands = [];
  qBwSteps = [];
  qBwCursor = 0;
  qBwExecutionMode = 'auto';
  qBwPaused = false;
  qBwFinished = false;
  qBwHistory = [];
  qBwHistoryCursor = -1;
  qBwFastForward = false;
  qManualHistory = []
  qManualInfoIndex = -1;
  qManualInfoOpen = false;
  qBwInitialScenario = null;
  qSkipAnimations = false;

  if(typeof clearQInfo === 'function')
    clearQInfo();
}

function qResetState(){
  if(qRunTimer){
    clearTimeout(qRunTimer);
    qRunTimer = null;
  }

  qIn = [];
  qOut = [];
  qStepCount = 0;
  qPotential = 0;
  qBusy = false;
  qSyntaxCommands = [];
  qSyntaxSteps = [];
  qSyntaxIndex = 0;
  qIsSyntaxMode = false;
  qIsBestWorstMode = false;
  qBestWorstMode = null;
  qShowInfoPanel = false;
  qSynHistory = [];
  qSynHistoryCursor = -1;
  qSynFinished = false;
  qBwCommands = [];
  qBwSteps = [];
  qBwCursor = 0;
  qBwExecutionMode = 'auto';
  qBwPaused = false;
  qBwFinished = false;
  qBwHistory = [];
  qBwHistoryCursor = -1;
  qBwFastForward = false;
  qManualHistory = []
  qManualInfoIndex = -1;
  qManualInfoOpen = false;
  qBwInitialScenario = null;
  qSkipAnimations = false;
  
  if(typeof clearQInfo === 'function')
    clearQInfo();
}

function resetQueue2StacksState(){
  qResetState();
}