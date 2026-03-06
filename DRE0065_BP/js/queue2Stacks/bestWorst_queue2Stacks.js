function qStartBestWorst(mode){
  $('#bestWorstModal').modal('hide');
  resetQueue2StacksState();

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

    setTimeout(() => {
      dequeueQueue2Stacks(() => {
        const L = qLang();

        showAppMessage(L.queueEndBestCase, {
          onClose: () => {
            resetQueue2StacksState();
            goBack();
          }});
      });
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

  setTimeout(() => {
    dequeueQueue2Stacks(() => {
      const L = qLang();

      showAppMessage(L.queueEndWorstCase, {
        onClose: () => {
          resetQueue2StacksState();
          goBack();
        }});
    });
  }, 600);
}

function executeQueue2StacksBestCase(){
  qStartBestWorst('best');
}

function executeQueue2StacksWorstCase(){
  qStartBestWorst('worst');
}