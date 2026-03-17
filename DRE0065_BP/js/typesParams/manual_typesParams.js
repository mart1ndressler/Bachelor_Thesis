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
    const infoHtml = L[cfg.manual.infoKey] || '';
    const placeholder = L[cfg.manual.placeholderKey] || '';

    openActionInputModal({title, label, infoHtml, placeholder, type: 'text', min: null,
      onOk: (raw) => {
        const text = String(raw || '').trim();
        
        if(text === ''){
          if(typeof cfg.manual.start === 'function')
            cfg.manual.start([]);

          return true;
        }

        const values = parsePositiveIntList(text);
        const normalizedCount = text.split(',').map(v => v.trim()).filter(v => v !== '').length;

        if(values.length === 0 || values.length !== normalizedCount){
          const input = document.getElementById('actionInput');
          if(input)
            input.value = '';

          _setActionInputError('');
          showAppMessage(L[cfg.manual.invalidKey] || L.invalidNumberAlert || 'Invalid input.');
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
    input.removeAttribute('placeholder');
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

  if(raw === ''){
    $('#manualParamsModal').modal('hide');
    document.getElementById('manualParamsForm')?.reset();

    if(typeof cfg.manual?.start === 'function')
      cfg.manual.start([]);

    return;
  }

  const values = parsePositiveIntList(raw);
  const normalizedCount = raw.split(',').map(v => v.trim()).filter(v => v !== '').length;

  if(values.length === 0 || values.length !== normalizedCount){
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