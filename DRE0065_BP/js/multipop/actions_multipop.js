function mpPushPrompt(){
  const L = mpLang();
  const Lall = trAll();

  openActionChoiceModal({title: Lall.pushChoiceTitle || L.pushButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random',
    onManual: () => {
      openActionInputModal({title: L.pushButton, label: L.enterValuePrompt, type: "number", min: 1,
        onOk: (raw) => {
          const n = Number(raw);
          if(Number.isInteger(n) && n > 0){
            pushToStackManual(n);
            return true;
          }

          _setActionInputError(L.invalidNumberAlert);
          return false;
        }
      });
    },
    onRandom: () => {
      const value = getRandomIntInclusive(mpRandomMin, mpRandomMax);
      pushToStackManual(value);
    }
  });
}

function mpMultipopPrompt(){
  const L = mpLang();

  openActionInputModal({title: L.multipopButton, label: L.multipopPrompt, type: "number", min: 1,
    onOk: (raw) => {
      const n = Number(raw);
      if(Number.isInteger(n) && n > 0){
        multipopFromStackManual(n);
        return true;
      }

      _setActionInputError(L.invalidNumberAlert);
      return false;
    }
  });
}

function pushToStack(){
  mpPushPrompt();
}

function popFromStack(){
  popFromStackManual();
}

function multipopFromStack(){
  mpMultipopPrompt();
}