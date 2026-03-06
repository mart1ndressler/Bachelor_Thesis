let stackArray = [], stepCount = 0, potential = 0, syntaxCommands = [], currentCommandIndex = 0, steps = [], isBestWorstMode = false, mpBusy = false, mpBestWorstMode = null, mpBWIndex = -1, mpRunToken = 0, mpBwTimer = null;

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
  mpBWIndex = -1;
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
  mpBWIndex = -1;
  mpBusy = false;
}