function openManualParamsModalU(){
  const alg = getActiveAlg();
  activeModalContext = (alg === 'queue2Stacks') ? 'queueManual' : 'multipopManual';

  refreshLang();
  $('#manualParamsModal').modal('show');

  const input = document.getElementById('stackValues');
  if(input){
    input.value = '';
    input.placeholder = "1, 2, 3, 4";
  }

  const submitBtn = document.getElementById('submitBtn');
  if(submitBtn)
    submitBtn.onclick = submitManualParamsU;
}

function submitManualParamsU(){
  const langData = getLangData();
  const alg = getActiveAlg();

  const raw = document.getElementById('stackValues')?.value?.trim() || '';
  if(!raw){
    showAppMessage(langData.enterValuePrompt); 
    return;
  }

  const values = parsePositiveIntList(raw);
  if(values.length === 0){
    showAppMessage(langData.invalidNumberAlert);
    return;
  }

  $('#manualParamsModal').modal('hide');
  document.getElementById('manualParamsForm')?.reset();

  if(alg === 'queue2Stacks'){
    if(typeof initQueue2StacksManual === 'function') 
      initQueue2StacksManual(values);
  }
  else{
    stackArray = [...values];
    stepCount = 0;
    potential = stackArray.length;

    if(typeof displayStack === 'function') 
      displayStack(stackArray);
    if(typeof updateCounters === 'function') 
      updateCounters();
  }
}