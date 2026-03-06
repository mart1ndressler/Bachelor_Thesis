function sInsertPrompt(){
  const L = sLang();
  if(sBusy)
    return;

  openActionInputModal({title: L.splayInsertButton, label: L.splayInsertPrompt || (L.splayInsertButton + " x:"), placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const x = Number(raw);
      if(Number.isInteger(x) && x > 0){
        sInsert(x);
        return true;
      }

      const input = document.getElementById('actionInput');
      if(input)
        input.value = '';

      _setActionInputError(L.invalidNumberAlert || 'Enter a valid positive number!');
      return false;
    }});
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

      const input = document.getElementById('actionInput');
      if(input)
        input.value = '';

      _setActionInputError(L.invalidNumberAlert || 'Enter a valid positive number!');
      return false;
    }});
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

      const input = document.getElementById('actionInput');
      if(input)
        input.value = '';

      _setActionInputError(L.invalidNumberAlert || 'Enter a valid positive number!');
      return false;
    }});
}