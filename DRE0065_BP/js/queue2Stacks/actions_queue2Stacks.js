function qEnqueuePrompt(){
  const L = qLang();
  const Lall = trAll();

  openActionChoiceModal({title: Lall.enqueueChoiceTitle || L.enqueueButton, bodyHtml: Lall.actionChoiceBody || '', manualLabel: Lall.actionChoiceManual || 'Manual', randomLabel: Lall.actionChoiceRandom || 'Random',
    onManual: () => {
      openActionInputModal({title: L.enqueueButton, label: L.enqueuePrompt, type: "number", min: 1,
        onOk: (raw) => {
          const n = Number(raw);
          if(Number.isInteger(n) && n > 0){
            enqueueQueue2StacksManual(n);
            return true;
          }

          _setActionInputError(L.invalidNumberAlert);
          return false;
        }
      });
    },
    onRandom: () => {
      const value = getRandomIntInclusive(qRandomMin, qRandomMax);
      enqueueQueue2StacksManual(value);
    }
  });
}

function enqueueQueue2Stacks(){
  qEnqueuePrompt();
}