function openBestWorstParamsModalU(){
  const alg = getActiveAlg();
  activeModalContext = (alg === 'queue2Stacks') ? 'queueBestWorst' : 'multipopBestWorst';
  refreshLang();

  const btns = document.querySelectorAll('#bestWorstModal .caseButton');
  if(alg === 'queue2Stacks'){
    if(btns[0])
      btns[0].onclick = executeQueue2StacksBestCase;
    if(btns[1])
      btns[1].onclick = executeQueue2StacksWorstCase;
  }
  else{
    if(btns[0])
      btns[0].onclick = executeBestCase;
    if(btns[1])
      btns[1].onclick = executeWorstCase;
  }

  $('#bestWorstModal').modal('show');
}