function openSyntaxModalU(){
  const alg = getActiveAlg();
  activeModalContext = (alg === 'queue2Stacks') ? 'queueSyntax' : 'multipopSyntax';

  if(alg === 'queue2Stacks'){
    if(typeof resetQueue2StacksState === 'function')
      resetQueue2StacksState();
  }
  else{
    mpBusy = false;
    isBestWorstMode = false;
    stackArray = [];
    stepCount = 0;
    potential = 0;
    syntaxCommands = [];
    steps = [];
    currentCommandIndex = 0;
  }

  refreshLang();
  $('#syntaxModal').modal('show');

  const input = document.getElementById('syntaxInput');
  if(input)
    input.value = '';

  const btn = document.getElementById('startSyntaxBtn');
  if(btn)
    btn.onclick = startSyntaxExampleUniversalU;
}

function startSyntaxExampleUniversalU(){
  const alg = getActiveAlg();
  if(alg === 'queue2Stacks')
    if(typeof startQueue2StacksSyntaxExample === 'function')
      startQueue2StacksSyntaxExample();
  else
    if(typeof startSyntaxExample === 'function')
      startSyntaxExample();
}