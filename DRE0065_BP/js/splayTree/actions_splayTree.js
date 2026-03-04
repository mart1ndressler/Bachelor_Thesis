function openSplayManual(){
  sResetAll();
  openSplayInitModal({showUIAfterOk: true});
}

function openSplayRandom(){
  sResetAll();
  openSplayRandomParamsModal({showUIAfterOk: true});
}

function sParseCsvPositiveInts(raw){
  return (String(raw || '')).split(',').map(x => x.trim()).filter(x => x.length > 0).map(x => Number(x)).filter(n => Number.isInteger(n) && n > 0);
}

function openSplayInitModal({ showUIAfterOk = false } = {}){
  const L = sLang();

  openActionInputModal({title: L.splayInitTitle || "Initial values", label: L.splayInitLabel || "Enter initial values (comma separated):", placeholder: L.splayInitPlaceholder || "1, 2, 3, 4", type: "text", min: null,
    onOk: (raw) => {
      const values = sParseCsvPositiveInts(raw);
      if(values.length === 0){
        _setActionInputError(L.splayInitInvalid || "Invalid input.");
        return false;
      }

      if(showUIAfterOk)
        sRenderManualUI();

      sBuildInitial(values, {source: 'manual'});
      return true;
    }
  });
}

function openSplayRandomParamsModal({ showUIAfterOk = false } = {}){
  activeModalContext = 'splayRandom';
  if(typeof changeLanguage === 'function')
    changeLanguage(localStorage.getItem('language') || 'en');

  const minEl = document.getElementById('rangeMin');
  const maxEl = document.getElementById('rangeMax');
  const cntEl = document.getElementById('count');
  
  if(minEl){
    minEl.value = ''; 
    minEl.placeholder = '1'; 
  }
  if(maxEl){
    maxEl.value = ''; 
    maxEl.placeholder = '50'; 
  }
  if(cntEl){
    cntEl.value = ''; 
    cntEl.placeholder = '20'; 
  }

  const btn = document.getElementById('generateBtn');
  if(btn)
    btn.onclick = () => submitSplayRandomParams({showUIAfterOk});

  $('#randomParamsModal').modal('show');
}

function submitSplayRandomParams({showUIAfterOk = false} = {})
{
  const L = sLang();
  const min = parseInt(document.getElementById('rangeMin')?.value, 10);
  const max = parseInt(document.getElementById('rangeMax')?.value, 10);
  const count = parseInt(document.getElementById('count')?.value, 10);

  if(isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count <= 0){
    showAppMessage(L.invalidNumberAlert);
    return;
  }

  const rangeSize = (max - min + 1);
  if(count > rangeSize){
    showAppMessage(L.splayRandomTooManyAlert || L.invalidNumberAlert);
    return;
  }

  const values = [];
  const used = new Set();
  while(values.length < count){
    const v = Math.floor(Math.random() * rangeSize) + min;
    if(!used.has(v)){
      used.add(v);
      values.push(v);
    }
  }

  $('#randomParamsModal').modal('hide');
  document.getElementById('randomParamsForm')?.reset();

  if(showUIAfterOk)
    sRenderManualUI();

  sBuildInitial(values, {source: 'random'});
}

function sInsertPrompt(){
  const L = sLang();
  if(sBusy) 
    return;

  openActionInputModal({title: L.splayInsertButton, label: L.enterValuePrompt, placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const x = Number(raw);
      if(Number.isInteger(x) && x > 0){
        sInsert(x);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function sSearchPrompt(){
  const L = sLang();
  if(sBusy)
    return;
  
  openActionInputModal({title: L.splaySearchButton, label: L.splaySearchPrompt || (L.splaySearchButton + " x:"), placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const x = Number(raw);
      if(Number.isInteger(x) && x > 0){
        sSearch(x);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function sDeletePrompt(){
  const L = sLang();
  if(sBusy)
    return;

  openActionInputModal({title: L.splayDeleteButton, label: L.splayDeletePrompt || (L.splayDeleteButton + " x:"), placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const x = Number(raw);
      if(Number.isInteger(x) && x > 0){
        sDelete(x);
        return true;
      }
      
      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}