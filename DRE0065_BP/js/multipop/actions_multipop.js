function mpOpenPositiveIntegerInputModal({title, label, onConfirm}){
  const L = mpLang();

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

function mpPromptForPushAction(){
  const L = mpLang();
  const Lall = trAll();

  openActionChoiceModal({title: Lall.pushChoiceTitle || L.pushButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random', onManual: () => {mpOpenPositiveIntegerInputModal({title: L.pushButton, label: L.enterValuePrompt, onConfirm: (value) => pushToStackManual(value)});}, onRandom: () => {
      const value = getRandomIntInclusive(mpRandomMin, mpRandomMax);
      pushToStackManual(value);
    }
  });
}

function mpHandlePopAction(){
  popFromStackManual();
}

function mpPromptForMultipopAction(){
  const L = mpLang();
  mpOpenPositiveIntegerInputModal({title: L.multipopButton, label: L.multipopPrompt, onConfirm: (count) => multipopFromStackManual(count)});
}