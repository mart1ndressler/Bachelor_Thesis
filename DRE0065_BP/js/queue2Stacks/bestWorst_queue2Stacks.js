function executeQueue2StacksBestCase(){
    $('#bestWorstModal').modal('hide');
    qIsBestWorstMode = true;
    qBestWorstMode = 'best';

    const algParameters = document.querySelector('.alg_parameters');
    if(algParameters)
        algParameters.style.display = 'none';

    const values = [1,2,3,4,5];
    qIn = [];
    qOut = [...values].reverse();
    qStepCount = 0;
    qPotential = qIn.length;
    qBusy = false;

    qShowInfoPanel = true;
    clearQInfo();

    displayQueue2Stacks();
    setQInfoKeys('queueInfoBestTitle', 'queueInfoBestDetail', 'queueInfoBest');

    setTimeout(() => {
        dequeueQueue2Stacks(() => {
            const langData = qGetLang();
            showAppMessage(langData.queueEndBestCase, {
            onClose: () => {
                resetQueue2StacksState();
                qIsBestWorstMode = false;
                goBack();
            }});
        });
    }, 600);
}

function executeQueue2StacksWorstCase(){
    $('#bestWorstModal').modal('hide');
    qIsBestWorstMode = true;
    qBestWorstMode = 'worst';

    const algParameters = document.querySelector('.alg_parameters');
    if(algParameters)
        algParameters.style.display = 'none';

    const values = [1,2,3,4,5,6,7,8];
    qIn = [...values];
    qOut = [];
    qStepCount = 0;
    qPotential = qIn.length;
    qBusy = false;

    qShowInfoPanel = true;
    clearQInfo();

    displayQueue2Stacks();
    setQInfoKeys('queueInfoWorstTitle', 'queueInfoWorstDetail', 'queueInfoWorst');

    setTimeout(() => {
        dequeueQueue2Stacks(() => {
            const langData = qGetLang();
            showAppMessage(langData.queueEndWorstCase, {
            onClose: () => {
                resetQueue2StacksState();
                qIsBestWorstMode = false;
                goBack();
            }});
        });
    }, 600);
}