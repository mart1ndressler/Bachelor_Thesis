function qStartBestWorst(mode){
  $('#bestWorstModal').modal('hide');
  resetQueue2StacksState();
  const runToken = ++qRunToken;

  qIsBestWorstMode = true;
  qBestWorstMode = mode;

  const algParameters = document.querySelector('.alg_parameters');
  if(algParameters)
    algParameters.style.display = 'none';

  qShowInfoPanel = true;
  clearQInfo();

  if(mode === 'best'){
    const values = [1,2,3,4,5];
    qIn = [];
    qOut = [...values].reverse();
    qStepCount = 0;
    qPotential = qIn.length;
    qBusy = false;

    displayQueue2Stacks();
    setQInfoKeys('queueInfoBestTitle', 'queueInfoBestDetail', 'queueInfoBest');

    qRunTimer = setTimeout(() => {
      if(runToken !== qRunToken)
        return;

      dequeueQueue2Stacks(() => {
        if(runToken !== qRunToken)
          return;

        const L = qLang();
        showAppMessage(L.queueEndBestCase, {
          onClose: () => {
            if(runToken !== qRunToken)
              return;

            resetQueue2StacksState();
            goBack();
          }});
      }, false, runToken);
    }, 600);

    return;
  }

  const values = [1,2,3,4,5,6,7,8];
  qIn = [...values];
  qOut = [];
  qStepCount = 0;
  qPotential = qIn.length;
  qBusy = false;

  displayQueue2Stacks();
  setQInfoKeys('queueInfoWorstTitle', 'queueInfoWorstDetail', 'queueInfoWorst');

  qRunTimer = setTimeout(() => {
    if(runToken !== qRunToken)
      return;

    dequeueQueue2Stacks(() => {
      if(runToken !== qRunToken)
        return;

      const L = qLang();
      showAppMessage(L.queueEndWorstCase, {
        onClose: () => {
          if(runToken !== qRunToken)
            return;

          resetQueue2StacksState();
          goBack();
        }});
    }, false, runToken);
  }, 600);
}

function executeQueue2StacksBestCase(){
  qStartBestWorst('best');
}

function executeQueue2StacksWorstCase(){
  qStartBestWorst('worst');
}