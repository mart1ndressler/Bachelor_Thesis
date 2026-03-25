function qOpenPositiveIntegerInputModal({title, label, onConfirm}){
  const L = qLang();

  openActionInputModal({title, label, type: 'number', min: 1, onOk: (raw) => {
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
  const L = qLang();
  const Lall = trAll();

  openActionChoiceModal({title: Lall.enqueueChoiceTitle || L.enqueueButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random', onManual: () => {qOpenPositiveIntegerInputModal({title: L.enqueueButton, label: L.enqueuePrompt, onConfirm: (value) => qEnqueueManual(value)});}, onRandom: () => {
      const value = getRandomIntInclusive(qRandomMin, qRandomMax);
      qEnqueueManual(value);
    }
  });
}

function qHandleDequeueAction(){
  qRunManualDequeue();
}