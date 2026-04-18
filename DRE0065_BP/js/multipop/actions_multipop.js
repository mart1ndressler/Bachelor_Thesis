function mpOpenPositiveIntegerInputModal({getTexts, onConfirm}){
  const initialTexts = getTexts(mpLang());

  openActionInputModal({...initialTexts, type: 'number', min: 1, rerender: () => getTexts(mpLang()), onOk: (raw) => {
      const L = mpLang();
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
  openActionChoiceModal({...(() => {
      const L = mpLang();
      const Lall = trCommon();

      return {title: L.pushButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random'};
    })(), rerender: () => {
      const L = mpLang();
      const Lall = trCommon();

      return {title: L.pushButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random'};
    }, onManual: () => {mpOpenPositiveIntegerInputModal({getTexts: (L) => ({title: L.pushButton, label: L.enterValuePrompt}),onConfirm: (value) => pushToStackManual(value)});}, onRandom: () => {
      const value = getRandomIntInclusive(mpRandomMin, mpRandomMax);
      pushToStackManual(value);
    }
  });
}

function mpHandlePopAction(){
  popFromStackManual();
}

function mpPromptForMultipopAction(){
  mpOpenPositiveIntegerInputModal({getTexts: (L) => ({title: L.multipopButton, label: L.multipopPrompt}), onConfirm: (count) => multipopFromStackManual(count)});
}