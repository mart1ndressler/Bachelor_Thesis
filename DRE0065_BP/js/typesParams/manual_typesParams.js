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
  const raw = document.getElementById('stackValues')?.value?.trim() || '';
  if(!raw){
    showAppMessage(langData.enterValuePrompt);
    return;
  }

  const values = parsePositiveIntList(raw);
  if(values.length === 0){
    showAppMessage(langData.invalidNumberAlert);
    return;
  }

  $('#manualParamsModal').modal('hide');
  document.getElementById('manualParamsForm')?.reset();

  if(typeof cfg.manual?.start === 'function')
    cfg.manual.start(values);
}