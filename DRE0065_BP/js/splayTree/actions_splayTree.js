function sInsertPrompt(){
  const L = sLang();
  const Lall = trAll();

  if(sBusy)
    return;

  openActionChoiceModal({title: Lall.insertChoiceTitle || L.splayInsertButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random',
    onManual: () => {
      openActionInputModal({title: L.splayInsertButton, label: L.splayInsertPrompt || (L.splayInsertButton + " x:"), type: "number", min: 1,
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
        }
      });
    },
    onRandom: () => {
      let value = null;
      const maxAttempts = 300;

      for(let i = 0; i < maxAttempts; i++){
        const candidate = getRandomIntInclusive(sRandomMin, sRandomMax);
        if(!sContainsKey(sRoot, candidate)){
          value = candidate;
          break;
        }
      }

      if(value === null)
        return;
      
      sInsert(value);
    }
  });
}

function sSearchPrompt(){
  const L = sLang();
  if(sBusy)
    return;

  openActionInputModal({title: L.splaySearchButton, label: L.splaySearchPrompt || (L.splaySearchButton + " x:"), type: "number", min: 1,
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

  openActionInputModal({title: L.splayDeleteButton, label: L.splayDeletePrompt || (L.splayDeleteButton + " x:"), type: "number", min: 1,
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