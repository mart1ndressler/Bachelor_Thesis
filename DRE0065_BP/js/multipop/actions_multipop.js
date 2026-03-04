function pushToStack(){
  const L = mpLang();

  openActionInputModal({title: L.pushButton, label: L.enterValuePrompt, placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const n = Number(raw);
      if(Number.isInteger(n) && n > 0){
        pushToStackManual(n);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }});
}

function popFromStack(){
  popFromStackManual();
}

function multipopFromStack(){
  const L = mpLang();

  openActionInputModal({title: L.multipopButton, label: L.multipopPrompt, placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const n = Number(raw);
      if(Number.isInteger(n) && n > 0){
        multipopFromStackManual(n);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }});
}