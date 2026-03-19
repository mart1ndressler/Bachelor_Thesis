let sRoot = null, sNextId = 1, sStepCount = 0, sPotential = 0, sBusy = false, sInitValues = [], sInitSource = null, sInitBuildIndex = -1, sBwMode = null,sBwSteps = [], sBwIndex = 0, sBwRunToken = 0, sSynSteps = [], sSynCursor = 0, sSynResults = [], sEdgeAnimRaf = 0, sEdgeAnimToken = 0, sSynCurrentTrace = [], sTraceActive = false, sSynHistory = [], sSynHistoryCursor = -1, sSynFinished = false, sSynInstantFirstStep = false, sBwExecutionMode = 'auto', sBwPaused = false, sBwFinished = false, sBwHistory = [], sBwResults = [], sBwAutoTimer = 0, sBwHistoryCursor = -1, sBwFastForward = false, sSkipAnimations = false, sManualHistory = [], sManualInfoIndex = -1, sManualInfoOpen = false, sRandomMin = 1, sRandomMax = 99, sBwInitialSteps = [];

const S_MOVE_MS = 650;
const sNodeEls = new Map();

function sLang(){
  const lang = localStorage.getItem('language') || 'en';
  const t = window.translations?.[lang] || {};
  return {...(t.common || {}), ...(t.splay || {})};
}