function qOpenPositiveIntegerInputModal({getTexts, onConfirm}){
  const initialTexts = getTexts(qLang());

  openActionInputModal({...initialTexts, type: 'number', min: 1, rerender: () => getTexts(qLang()), onOk: (raw) => {
      const L = qLang();
      const value = Number(raw);

      if(Number.isInteger(value) && value > 0){
        onConfirm(value);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function qPromptForEnqueueAction(){
  openActionChoiceModal({...(() => {
      const L = qLang();
      const Lall = trCommon();

      return {title: L.enqueueButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random'};
    })(), rerender: () => {
      const L = qLang();
      const Lall = trCommon();

      return {title: L.enqueueButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random'};
    }, onManual: () => {qOpenPositiveIntegerInputModal({getTexts: (L) => ({title: L.enqueueButton, label: L.enqueuePrompt}), onConfirm: (value) => qEnqueueManual(value)});}, onRandom: () => {
      const value = getRandomIntInclusive(qRandomMin, qRandomMax);
      qEnqueueManual(value);
    }
  });
}

function qHandleDequeueAction(){
  qRunManualDequeue();
}