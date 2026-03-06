function sBwMakeSteps(mode){
  if(mode === 'best'){
    return [
      {op: 'insert', value: 10},
      {op: 'insert', value: 5},
      {op: 'insert', value: 15},
      {op: 'delete', value: 15},
    ];
  }

  return [
    {op: 'insert', value: 1},
    {op: 'insert', value: 2},
    {op: 'insert', value: 3},
    {op: 'insert', value: 4},
    {op: 'insert', value: 5},
    {op: 'insert', value: 6},
    {op: 'insert', value: 7},
    {op: 'insert', value: 8},
    {op: 'delete', value: 1},
  ];
}

function sRenderBestWorstUI(){
  const L = sLang();
  const dc = document.getElementById('dynamicContent');
  if(!dc)
    return;

  dc.innerHTML = `
    <div class="run-panel">
      <div class="run-row no-wrap" id="mainContainer">
        <div class="treeArea" id="treeArea">
          <svg class="treeSvg" id="treeSvg"></svg>
          <div class="treeNodesLayer" id="treeNodesLayer"></div>
        </div>

        <div class="stack-controls controls-bottom">
          <div class="step-count" id="sStepCountDisplay">${L.stepCount}: ${sStepCount}</div>
          <div class="potential-display" id="sPotentialDisplay">${L.potential}: <span class="potentialValue">${sPotential}</span></div>

          <div class="syntax-detailed-info" id="sBwPanel">
            <div class="info-panel-title" id="sBwPanelTitle"></div>
            <div class="info-panel-desc" id="sBwPanelDesc"></div>
            <div class="info-panel-sep"></div>
            <div class="info-step-title" id="sBwStepTitle"></div>
            <div class="info-step-detail" id="sBwStepDetail"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  sRenderTree({activeId: null, pathIds: []});
  sUpdateCounters();
  sBwRenderInfo();
}

function sBwRenderInfo(){
  const L = sLang();
  const t0 = document.getElementById('sBwPanelTitle');
  const d0 = document.getElementById('sBwPanelDesc');
  const t1 = document.getElementById('sBwStepTitle');
  const d1 = document.getElementById('sBwStepDetail');
  if(!t0 || !d0 || !t1 || !d1)
    return;

  if(sBwMode === 'best'){
    t0.textContent = L.splayBwBestTitle || (L.bestCase || 'Best Case');
    d0.innerHTML = L.splayBwBestDesc || '';
  }
  else{
    t0.textContent = L.splayBwWorstTitle || (L.worstCase || 'Worst Case');
    d0.innerHTML = L.splayBwWorstDesc || '';
  }

  if(sBwIndex >= sBwSteps.length){
    t1.textContent = L.splayBwDoneTitle || (L.endButton || 'End');
    d1.innerHTML = L.splayBwDoneDetail || '';
    return;
  }

  const step = sBwSteps[sBwIndex];
  const total = sBwSteps.length;
  const prefix = `${sBwIndex + 1}/${total}: `;

  if(step.op === 'insert'){
    t1.textContent = prefix + (L.splayBwStepInsertTitle || 'Insert {value}').replace('{value}', String(step.value));
    d1.innerHTML = (L.splayBwStepInsertDetail || '').replace('{value}', String(step.value));
  }
  else if(step.op === 'search'){
    t1.textContent = prefix + (L.splayBwStepSearchTitle || 'Search {value}').replace('{value}', String(step.value));
    d1.innerHTML = (L.splayBwStepSearchDetail || '').replace('{value}', String(step.value));
  }
  else{
    t1.textContent = prefix + (L.splayBwStepDeleteTitle || 'Delete {value}').replace('{value}', String(step.value));
    d1.innerHTML = (L.splayBwStepDeleteDetail || '').replace('{value}', String(step.value));
  }
}

function sBwRunScenario(){
  const myToken = ++sBwRunToken;
  sBusy = true;
  sRoot = null;
  sStepCount = 0;
  sPotential = 0;

  sRenderTree({activeId: null, pathIds: []});

  let i = 0;
  function runNext(){
    if(myToken !== sBwRunToken)
      return;

    if(i >= sBwSteps.length){
      sBwIndex = sBwSteps.length;
      sBwRenderInfo();

      const L = sLang();
      const endText = L.endOfExample || 'End of commands.';

      sBusy = false;
      showAppMessage(endText, {title: L.splayBwDoneTitle || (L.endButton || 'End'),
        onClose: () => {
          sResetAll();
          changeContent('splayTree');
        }});

      return;
    }

    sBwIndex = i;
    sBwRenderInfo();

    sDelay(220, () => {
      if(myToken !== sBwRunToken)
        return;

      const step = sBwSteps[i];
      const afterOp = () => {
        sDelay(220, () => {
          i++;
          runNext();
        });
      };

      if(step.op === 'insert')
        sInsertCore(step.value, afterOp);
      else if(step.op === 'search')
        sSearchCore(step.value, afterOp);
      else
        sDeleteCore(step.value, afterOp);
    });
  }

  runNext();
}

function sStartBestWorst(mode){
  $('#bestWorstModal').modal('hide');
  sResetAll();

  sBwMode = mode;
  sBwSteps = sBwMakeSteps(mode);
  sBwIndex = 0;
  
  sRenderBestWorstUI();
  sBwRunScenario();
}