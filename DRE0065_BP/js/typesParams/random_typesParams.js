function _setRandomParamsError(msg){
  const err = document.getElementById('randomParamsError');
  const ids = ['rangeMin', 'rangeMax', 'count'];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if(el)
      el.classList.toggle('is-invalid', !!msg);
  });

  if(err)
    err.textContent = msg || '';
}

function openRandomParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  activeModalContext = cfg.contexts.random;
  refreshLang();
  $('#randomParamsModal').modal('show');

  const minEl = document.getElementById('rangeMin');
  const maxEl = document.getElementById('rangeMax');
  const countEl = document.getElementById('count');

  if(minEl){
    minEl.value = '';
    minEl.removeAttribute('placeholder');
  }
  if(maxEl){
    maxEl.value = '';
    maxEl.removeAttribute('placeholder');
  }
  if(countEl){
    countEl.value = '';
    countEl.removeAttribute('placeholder');
  }

  _setRandomParamsError('');
  const generateBtn = document.getElementById('generateBtn');
  if(generateBtn)
    generateBtn.onclick = submitRandomParamsU;
}

function submitRandomParamsU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  const langData = getLangData();
  const minRaw = document.getElementById('rangeMin')?.value?.trim() || '';
  const maxRaw = document.getElementById('rangeMax')?.value?.trim() || '';
  const countRaw = document.getElementById('count')?.value?.trim() || '';

  const showRandomError = (msg) => {
    document.getElementById('randomParamsForm')?.reset();
    _setRandomParamsError('');
    showAppMessage(msg);
  };

  if(!minRaw || !maxRaw || !countRaw){
    showRandomError(langData.randomMissingParamsAlert || 'Fill in minimum, maximum and count.');
    return;
  }

  const min = Number(minRaw);
  const max = Number(maxRaw);
  const count = Number(countRaw);
  
  if(!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(count)){
    showRandomError(langData.randomInvalidIntegerParamsAlert || 'Enter whole numbers only.');
    return;
  }

  if(min <= 0 || max <= 0 || count <= 0){
    showRandomError(langData.randomPositiveParamsAlert || 'Minimum, maximum and count must be positive numbers.');
    return;
  }

  if(min >= max){
    showRandomError(langData.randomMinMaxOrderAlert || 'Minimum must be smaller than maximum.');
    return;
  }

  const alg = getActiveAlg();
  if(alg === 'multipop'){
    mpRandomMin = min;
    mpRandomMax = max;
  }
  else if(alg === 'queue2Stacks'){
    qRandomMin = min;
    qRandomMax = max;
  }
  else if(alg === 'splayTree'){
    sRandomMin = min;
    sRandomMax = max;
  }

  const rangeSize = (max - min + 1);
  let values = [];

  if(cfg.random?.unique){
    if(count > rangeSize){
      showRandomError(langData[cfg.random.tooManyKey] || 'Count cannot be greater than the number of unique values in the selected range.');
      return;
    }

    const used = new Set();
    while(values.length < count){
      const v = Math.floor(Math.random() * rangeSize) + min;
      if(!used.has(v)){
        used.add(v);
        values.push(v);
      }
    }
  }
  else
    values = Array.from({length: count}, () => Math.floor(Math.random() * rangeSize) + min);

  $('#randomParamsModal').modal('hide');
  document.getElementById('randomParamsForm')?.reset();
  _setRandomParamsError('');

  if(typeof cfg.random?.start === 'function')
    cfg.random.start(values);
}