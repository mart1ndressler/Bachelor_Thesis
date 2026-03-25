function sOpenPositiveNumberActionModal({title, label, onSubmit}){
  const L = sLang();

  openActionInputModal({title, label, type: 'number', min: 1, onOk: (raw) => {
      const value = Number(raw);
      if(Number.isInteger(value) && value > 0){
        onSubmit(value);
        return true;
      }

      const input = document.getElementById('actionInput');
      if(input)
        input.value = '';

      _setActionInputError(L.invalidNumberAlert || 'Enter a valid positive number!');
      return false;
    }
  });
}

function sFindRandomMissingInsertValue(){
  const maxAttempts = 300;

  for(let i = 0; i < maxAttempts; i++){
    const candidate = getRandomIntInclusive(sRandomMin, sRandomMax);
    if(!sContainsKey(sRoot, candidate))
      return candidate;
  }

  return null;
}

function sHandleInsertAction(){
  if(sBusy)
    return;

  const L = sLang();
  const Lall = trAll();

  openActionChoiceModal({title: Lall.insertChoiceTitle || L.splayInsertButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random', onManual: () => {sOpenPositiveNumberActionModal({title: L.splayInsertButton, label: L.splayInsertPrompt || `${L.splayInsertButton} x:`, onSubmit: sInsert});}, onRandom: () => {
      const value = sFindRandomMissingInsertValue();
      if(value === null)
        return;

      sInsert(value);
    }
  });
}

function sHandleSearchAction(){
  if(sBusy)
    return;

  const L = sLang();
  sOpenPositiveNumberActionModal({title: L.splaySearchButton, label: L.splaySearchPrompt || `${L.splaySearchButton} x:`, onSubmit: sSearch});
}

function sHandleDeleteAction(){
  if(sBusy)
    return;

  const L = sLang();
  sOpenPositiveNumberActionModal({title: L.splayDeleteButton, label: L.splayDeletePrompt || `${L.splayDeleteButton} x:`, onSubmit: sDelete});
}