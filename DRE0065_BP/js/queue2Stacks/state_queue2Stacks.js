let qIn = [], qOut = [], qStepCount = 0, qPotential = 0, qBusy = false, qSyntaxCommands = [], qSyntaxSteps = [], qSyntaxIndex = 0, qIsSyntaxMode = false, qLastInfo = null, qShowInfoPanel = false, qIsBestWorstMode = false, qBestWorstMode = null;

function qGetLang(){
    const language = localStorage.getItem('language') || 'en';
    return translations[language];
}

function qFmt(template, params = {}){
    return(template || '').replace(/\{(\w+)\}/g, (_, k) => {return (params[k] !== undefined) ? params[k] : `{${k}}`;});
}

function resetQueue2StacksState(){
    qIn = [];
    qOut = [];
    qStepCount = 0;
    qPotential = 0;
    qBusy = false;
    qBestWorstMode = null;
    qSyntaxCommands = [];
    qSyntaxSteps = [];
    qSyntaxIndex = 0;
    qIsSyntaxMode = false;
    clearQInfo();
}