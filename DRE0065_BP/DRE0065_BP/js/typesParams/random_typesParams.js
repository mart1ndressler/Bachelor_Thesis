function openRandomParamsModalU(){
  const alg = getActiveAlg();
  activeModalContext = (alg === 'queue2Stacks') ? 'queueRandom' : 'multipopRandom';

  refreshLang();
  $('#randomParamsModal').modal('show');

  const generateBtn = document.getElementById('generateBtn');
  if(generateBtn)
    generateBtn.onclick = submitRandomParamsU;
}

function submitRandomParamsU(){
  const langData = getLangData();
  const alg = getActiveAlg();
  const min = parseInt(document.getElementById('rangeMin')?.value, 10);
  const max = parseInt(document.getElementById('rangeMax')?.value, 10);
  const count = parseInt(document.getElementById('count')?.value, 10);

  if(isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count <= 0){
    showAppMessage(langData.invalidNumberAlert);
    return;
  }

  const values = Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1)) + min);

  $('#randomParamsModal').modal('hide');
  document.getElementById('randomParamsForm')?.reset();

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