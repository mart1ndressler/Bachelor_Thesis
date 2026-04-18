function sOpenPositiveNumberActionModal({getTexts, onSubmit}){
  const initialTexts = getTexts(sLang());

  openActionInputModal({...initialTexts, type: 'number', min: 1, rerender: () => getTexts(sLang()), onOk: (raw) => {
      const L = sLang();
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

  openActionChoiceModal({...(() => {
      const L = sLang();
      const Lall = trCommon();

      return {title: L.splayInsertButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random'};
    })(), rerender: () => {
      const L = sLang();
      const Lall = trCommon();

      return {title: L.splayInsertButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random'};
    }, onManual: () => {sOpenPositiveNumberActionModal({getTexts: (L) => ({title: L.splayInsertButton, label: L.splayInsertPrompt || `${L.splayInsertButton} x:`}), onSubmit: sInsert});}, onRandom: () => {
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

  sOpenPositiveNumberActionModal({getTexts: (L) => ({title: L.splaySearchButton, label: L.splaySearchPrompt || `${L.splaySearchButton} x:`}), onSubmit: sSearch});
}

function sHandleDeleteAction(){
  if(sBusy)
    return;

  sOpenPositiveNumberActionModal({getTexts: (L) => ({title: L.splayDeleteButton, label: L.splayDeletePrompt || `${L.splayDeleteButton} x:`}), onSubmit: sDelete});
}