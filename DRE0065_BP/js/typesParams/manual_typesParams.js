function openManualParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  activeModalContext = cfg.contexts.manual;
  refreshLang();

  if(cfg.manual?.type === 'actionInput'){
    const L = getLangData();
    const title = L[cfg.manual.titleKey] || 'Set Tree Parameters';
    const label = L[cfg.manual.labelKey] || 'Enter values:';
    const placeholder = L[cfg.manual.placeholderKey] || '1, 2, 3, 4';

    openActionInputModal({title, label, placeholder, type: 'text', min: null,
      onOk: (raw) => {
        const values = parsePositiveIntList(String(raw || '').trim());
        if(values.length === 0){
          const input = document.getElementById('actionInput');
          if(input)
            input.value = '';

          _setActionInputError(L[cfg.manual.invalidKey] || L.invalidNumberAlert || 'Invalid input.');
          return false;
        }
        if(typeof cfg.manual.start === 'function')
          cfg.manual.start(values);
        return true;
      }});
    return;
  }

  $('#manualParamsModal').modal('show');
  const input = document.getElementById('stackValues');
  if(input){
    input.value = '';
    input.placeholder = "1, 2, 3, 4";
  }

  const submitBtn = document.getElementById('submitBtn');
  if(submitBtn)
    submitBtn.onclick = submitManualParamsU;
}

function submitManualParamsU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  const langData = getLangData();
  const input = document.getElementById('stackValues');
  const raw = input?.value?.trim() || '';

  if(!raw){
    if(input)
      input.value = '';
    showAppMessage(langData.manualValuesRequiredAlert || langData.manualValuesInvalidAlert || 'Invalid input.');
    return;
  }

  const values = parsePositiveIntList(raw);
  if(values.length === 0){
    if(input)
      input.value = '';
    showAppMessage(langData.manualValuesInvalidAlert || 'Invalid input.');
    return;
  }

  $('#manualParamsModal').modal('hide');
  document.getElementById('manualParamsForm')?.reset();

  if(typeof cfg.manual?.start === 'function')
    cfg.manual.start(values);
}