function bestWorstTypesGetCaseButtons(){
  return document.querySelectorAll('#bestWorstModal .caseButton');
}

function bestWorstTypesBuildMissingHandler(L){
  return () => showAppMessage(L.messageTitle || 'Not implemented.');
}

function bestWorstTypesBindCaseButton(button, handler){
  if(!button)
    return;

  button.onclick = () => {
    const executionMode = getBestWorstExecutionMode();
    handler(executionMode);
  };
}

function openBestWorstParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  typesParamsSetActiveContext(cfg.contexts.bestWorst);

  const L = getLangData();
  const buttons = bestWorstTypesGetCaseButtons();
  const bestHandler = cfg.bestWorst?.best || bestWorstTypesBuildMissingHandler(L);
  const worstHandler = cfg.bestWorst?.worst || bestWorstTypesBuildMissingHandler(L);

  bestWorstTypesBindCaseButton(buttons[0], bestHandler);
  bestWorstTypesBindCaseButton(buttons[1], worstHandler);

  $('#bestWorstModal').modal('show');
}