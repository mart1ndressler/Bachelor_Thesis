function openSyntaxModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  activeModalContext = cfg.contexts.syntax;
  if(typeof cfg.syntax?.resetBeforeOpen === 'function')
    cfg.syntax.resetBeforeOpen();

  refreshLang();
  $('#syntaxModal').modal('show');

  const input = document.getElementById('syntaxInput');
  if(input)
    input.value = '';

  const btn = document.getElementById('startSyntaxBtn');
  if(btn)
    btn.onclick = cfg.syntax?.start || null;
}