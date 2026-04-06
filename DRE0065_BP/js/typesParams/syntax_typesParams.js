function syntaxTypesPrepareModal(cfg){
  if(typeof cfg.syntax?.resetBeforeOpen === 'function')
    cfg.syntax.resetBeforeOpen();

  $('#syntaxModal').modal('show');
  typesParamsClearInputField('syntaxInput');

  const startBtn = document.getElementById('startSyntaxBtn');
  if(startBtn)
    startBtn.onclick = cfg.syntax?.start || null;
}

function openSyntaxModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  typesParamsSetActiveContext(cfg.contexts.syntax);
  syntaxTypesPrepareModal(cfg);
}