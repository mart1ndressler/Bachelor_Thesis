function openBestWorstParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  activeModalContext = cfg.contexts.bestWorst;
  refreshLang();

  const L = getLangData();
  const btns = document.querySelectorAll('#bestWorstModal .caseButton');
  const noHandler = () => showAppMessage(L.messageTitle || "Not implemented.");

  if(btns[0]){
    btns[0].onclick = () => {
      const executionMode = getBestWorstExecutionMode();
      (cfg.bestWorst?.best || noHandler)(executionMode);
    };
  }

  if(btns[1]){
    btns[1].onclick = () => {
      const executionMode = getBestWorstExecutionMode();
      (cfg.bestWorst?.worst || noHandler)(executionMode);
    };
  }

  $('#bestWorstModal').modal('show');
}