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
  const useInlineError = (getActiveAlg() === 'splayTree');
  const min = parseInt(document.getElementById('rangeMin')?.value, 10);
  const max = parseInt(document.getElementById('rangeMax')?.value, 10);
  const count = parseInt(document.getElementById('count')?.value, 10);

  if(!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(count) || min <= 0 || max <= 0 || count <= 0 || min >= max){
    document.getElementById('randomParamsForm')?.reset();
    if(useInlineError){
      _setRandomParamsError(langData.randomInvalidParamsAlert || 'Invalid random parameters.');
      return;
    }

    showAppMessage(langData.randomInvalidParamsAlert || 'Invalid random parameters.');
    return;
  }

  const rangeSize = (max - min + 1);
  let values = [];

  if(cfg.random?.unique){
    if(count > rangeSize){
      document.getElementById('randomParamsForm')?.reset();
      if(useInlineError){
        _setRandomParamsError(langData[cfg.random.tooManyKey] || langData.randomInvalidParamsAlert || 'Invalid random parameters.');
        return;
      }

      showAppMessage(langData[cfg.random.tooManyKey] || langData.randomInvalidParamsAlert || 'Invalid random parameters.');
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