function manualTypesRunStart(cfg, values){
  if(typeof cfg.manual?.start === 'function')
    cfg.manual.start(values);
}

function manualTypesGetValidatedValues(raw){
  const parsed = typesParamsParsePositiveIntegerList(raw);
  return parsed.isValid ? parsed.values : null;
}

function manualTypesHandleActionInputSubmit(cfg, L, raw){
  const text = String(raw || '').trim();
  if(text === ''){
    manualTypesRunStart(cfg, []);
    return true;
  }

  const values = manualTypesGetValidatedValues(text);
  if(!values){
    const input = document.getElementById('actionInput');
    if(input)
      input.value = '';

    _setActionInputError('');
    showAppMessage(L[cfg.manual.invalidKey] || L.invalidNumberAlert || 'Invalid input.');

    return false;
  }

  manualTypesRunStart(cfg, values);
  return true;
}

function manualTypesOpenActionInput(cfg){
  function buildTexts(){
    const L = getLangData();
    return {title: L[cfg.manual.titleKey] || 'Set Tree Parameters', label: L[cfg.manual.labelKey] || 'Enter values:', infoHtml: L[cfg.manual.infoKey] || ''};
  }

  openActionInputModal({...buildTexts(), type: 'text', min: null, rerender: buildTexts, onOk: (raw) => manualTypesHandleActionInputSubmit(cfg, getLangData(), raw)});
}

function manualTypesPrepareStackModal(){
  $('#manualParamsModal').modal('show');
  typesParamsClearInputField('stackValues');

  const submitBtn = document.getElementById('submitBtn');
  if(submitBtn)
    submitBtn.onclick = submitManualParamsU;
}

function openManualParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  typesParamsSetActiveContext(cfg.contexts.manual);

  if(cfg.manual?.type === 'actionInput'){
    manualTypesOpenActionInput(cfg);
    return;
  }

  manualTypesPrepareStackModal();
}

function submitManualParamsU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  const L = getLangData();
  const input = document.getElementById('stackValues');
  const raw = input?.value?.trim() || '';

  if(raw === ''){
    typesParamsHideModalAndResetForm('#manualParamsModal', 'manualParamsForm');
    manualTypesRunStart(cfg, []);
    
    return;
  }

  const values = manualTypesGetValidatedValues(raw);
  if(!values){
    if(input)
      input.value = '';

    showAppMessage(L.manualValuesInvalidAlert || 'Invalid input.');
    return;
  }

  typesParamsHideModalAndResetForm('#manualParamsModal', 'manualParamsForm');
  manualTypesRunStart(cfg, values);
}