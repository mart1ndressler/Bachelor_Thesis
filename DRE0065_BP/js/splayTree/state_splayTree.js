let sRoot = null;
let sNextId = 1;
let sStepCount = 0;
let sPotential = 0;
let sBusy = false;
let sInitValues = [];
let sInitSource = null;
let sInitBuildIndex = -1;
let sBwMode = null;
let sBwSteps = [];
let sBwIndex = 0;
let sBwExecutionMode = 'auto';
let sBwPaused = false;
let sBwFinished = false;
let sBwHistory = [];
let sBwResults = [];
let sBwAutoTimer = 0;
let sBwHistoryCursor = -1;
let sBwFastForward = false;
let sBwInitialSteps = [];
let sSynSteps = [];
let sSynCursor = 0;
let sSynResults = [];
let sSynCurrentTrace = [];
let sSynHistory = [];
let sSynHistoryCursor = -1;
let sSynFinished = false;
let sSynInstantFirstStep = false;
let sTraceActive = false;
let sSkipAnimations = false;
let sManualHistory = [];
let sManualInfoIndex = -1;
let sManualInfoOpen = false;
let sRandomMin = 1;
let sRandomMax = 99;
let sRunToken = 0;
let sEdgeAnimRaf = 0;
let sEdgeAnimToken = 0;

const S_MOVE_MS = 650;
const sNodeEls = new Map();

function sLang(){
  const lang = localStorage.getItem('language') || 'en';
  const t = window.translations?.[lang] || {};

  return {...(t.common || {}), ...(t.splay || {})};
}

function sFmt2(x){
  const n = Number(x);
  if(!Number.isFinite(n))
    return '0';

  return String(Math.round(n * 100) / 100);
}

function sCloneNode(node, parent = null){
  if(!node)
    return null;

  const copy = {id: node.id, key: node.key, left: null, right: null, parent, x: node.x || 0, y: node.y || 0};
  copy.left = sCloneNode(node.left, copy);
  copy.right = sCloneNode(node.right, copy);

  return copy;
}

function sCloneTree(root){
  return sCloneNode(root, null);
}

function sResetAll(){
  sRoot = null;
  sNextId = 1;
  sStepCount = 0;
  sPotential = 0;
  sBusy = false;
  sInitValues = [];
  sInitSource = null;
  sInitBuildIndex = -1;
  sBwMode = null;
  sBwSteps = [];
  sBwIndex = 0;
  sBwExecutionMode = 'auto';
  sBwPaused = false;
  sBwFinished = false;
  sBwHistory = [];
  sBwResults = [];
  sBwHistoryCursor = -1;
  sBwFastForward = false;
  sBwInitialSteps = [];
  sSynSteps = [];
  sSynCursor = 0;
  sSynResults = [];
  sSynCurrentTrace = [];
  sSynHistory = [];
  sSynHistoryCursor = -1;
  sSynFinished = false;
  sSynInstantFirstStep = false;
  sTraceActive = false;
  sSkipAnimations = false;
  sManualHistory = [];
  sManualInfoIndex = -1;
  sManualInfoOpen = false;
  sRunToken += 1;
  sEdgeAnimToken += 1;

  if(sBwAutoTimer){
    clearTimeout(sBwAutoTimer);
    sBwAutoTimer = 0;
  }
  if(sEdgeAnimRaf){
    cancelAnimationFrame(sEdgeAnimRaf);
    sEdgeAnimRaf = 0;
  }

  sNodeEls.clear();
}