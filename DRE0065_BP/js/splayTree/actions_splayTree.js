function sParseCsvPositiveInts(raw){
  return (String(raw || '')).split(',').map(x => x.trim()).filter(x => x.length > 0).map(x => Number(x)).filter(n => Number.isInteger(n) && n > 0);
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