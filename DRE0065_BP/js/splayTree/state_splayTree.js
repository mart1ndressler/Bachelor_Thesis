let sRoot = null, sNextId = 1, sStepCount = 0, sPotential = 0, sBusy = false, sLastMessageKey = null, sLastMessageParams = null, sInitValues = [], sInitSource = null, sInitBuildIndex = -1, sBwMode = null, sBwSteps = [], sBwIndex = 0, sBwRunToken = 0, sBwResults = [], sSynSteps = [], sSynCursor = 0, sSynResults = [], sSynRunToken = 0, sEdgeAnimRaf = 0, sEdgeAnimToken = 0;

const S_NODE_R = 22;
const S_MOVE_MS = 650;
const sNodeEls = new Map();

function sLang(){
  const lang = localStorage.getItem('language') || 'en';
  const t = window.translations?.[lang] || {};
  return {...(t.common || {}), ...(t.splay || {})};
}

function qLang(){
  return trPage('queue');
}