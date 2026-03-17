let stackArray = [], stepCount = 0, potential = 0, syntaxCommands = [], currentCommandIndex = 0, steps = [], isBestWorstMode = false, mpBusy = false, mpBestWorstMode = null, mpRunToken = 0, mpBwTimer = null, mpSynHistory = [], mpSynHistoryCursor = -1, mpSynFinished = false, mpBwSteps = [], mpBwCursor = 0, mpBwExecutionMode = 'auto', mpBwPaused = false, mpBwFinished = false, mpBwHistory = [], mpBwHistoryCursor = -1, mpBwFastForward = false, mpSkipAnimations = false, mpManualHistory = [], mpManualInfoIndex = -1, mpManualInfoOpen = false, mpRandomMin = 1, mpRandomMax = 99, mpBwInitialSteps = [];

function mpLang(){
  return trPage('multipop');
}

function mpFill(tpl, vars){
  let out = String(tpl || '');
  for(const [key, value] of Object.entries(vars || {})){
    out = out.split(`{${key}}`).join(String(value));
  }
  return out;
}

function mpCancelRunning(){
  mpRunToken++;

  if(mpBwTimer){
    clearTimeout(mpBwTimer);
    mpBwTimer = null;
  }

  mpBusy = false;
  isBestWorstMode = false;
  mpBestWorstMode = null;
  mpSynHistory = [];
  mpSynHistoryCursor = -1;
  mpSynFinished = false;
  mpBwSteps = [];
  mpBwCursor = 0;
  mpBwExecutionMode = 'auto';
  mpBwPaused = false;
  mpBwFinished = false;
  mpBwHistory = [];
  mpBwHistoryCursor = -1;
  mpBwFastForward = false;
  mpManualHistory = [];
  mpManualInfoIndex = -1;
  mpManualInfoOpen = false;
  mpBwInitialSteps = [];
  mpSkipAnimations = false;
}

function mpResetState(){
  stackArray = [];
  stepCount = 0;
  potential = 0;
  syntaxCommands = [];
  currentCommandIndex = 0;
  steps = [];
  isBestWorstMode = false;
  mpBestWorstMode = null;
  mpBusy = false;
  mpSynHistory = [];
  mpSynHistoryCursor = -1;
  mpSynFinished = false;
  mpBwSteps = [];
  mpBwCursor = 0;
  mpBwExecutionMode = 'auto';
  mpBwPaused = false;
  mpBwFinished = false;
  mpBwHistory = [];
  mpBwHistoryCursor = -1;
  mpBwFastForward = false;
  mpManualHistory = [];
  mpManualInfoIndex = -1;
  mpManualInfoOpen = false;
  mpBwInitialSteps = [];
  mpSkipAnimations = false;
}