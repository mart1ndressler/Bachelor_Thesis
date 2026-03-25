function syntaxTypesPrepareModal(cfg){
  if(typeof cfg.syntax?.resetBeforeOpen === 'function')
    cfg.syntax.resetBeforeOpen();

  refreshLang();
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

  activeModalContext = cfg.contexts.syntax;
  syntaxTypesPrepareModal(cfg);
}