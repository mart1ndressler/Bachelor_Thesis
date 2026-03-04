function enqueueQueue2Stacks(){
  const L = qGetLang();

  openActionInputModal({title: L.enqueueButton, label: L.enqueuePrompt, placeholder: "1", type: "number", min: 1,
    onOk: (raw) => {
      const n = Number(raw);
      if(Number.isInteger(n) && n > 0){
        enqueueQueue2StacksManual(n);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }});
}