function openBestWorstParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  activeModalContext = cfg.contexts.bestWorst;
  refreshLang();

  const L = getLangData();
  const btns = document.querySelectorAll('#bestWorstModal .caseButton');
  const noHandler = () => showAppMessage(L.splayNotImplemented || L.messageTitle || "Not implemented.");

  if(btns[0])
    btns[0].onclick = cfg.bestWorst?.best || noHandler;
  if(btns[1])
    btns[1].onclick = cfg.bestWorst?.worst || noHandler;

  $('#bestWorstModal').modal('show');
}