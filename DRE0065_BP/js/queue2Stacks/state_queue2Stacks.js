let qIn = [], qOut = [], qStepCount = 0, qPotential = 0, qBusy = false, qSyntaxCommands = [], qSyntaxSteps = [], qSyntaxIndex = 0, qIsSyntaxMode = false, qLastInfo = null, qShowInfoPanel = false, qIsBestWorstMode = false, qBestWorstMode = null;

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

function qResetState(){
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

  if(typeof clearQInfo === 'function')
    clearQInfo();
}

function resetQueue2StacksState(){
  qResetState();
}