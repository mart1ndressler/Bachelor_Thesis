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

function randomTypesShowError(msg){
  document.getElementById('randomParamsForm')?.reset();
  _setRandomParamsError('');
  showAppMessage(msg);
}

function randomTypesPrepareModal(){
  $('#randomParamsModal').modal('show');
  typesParamsClearInputField('rangeMin');
  typesParamsClearInputField('rangeMax');
  typesParamsClearInputField('count');
  _setRandomParamsError('');

  const form = document.getElementById('randomParamsForm');
  if(form){
    form.onsubmit = (e) => {
      e.preventDefault();
      submitRandomParamsU();
    };
  }
}

function randomTypesReadParams(){
  return {minRaw: document.getElementById('rangeMin')?.value?.trim() || '', maxRaw: document.getElementById('rangeMax')?.value?.trim() || '', countRaw: document.getElementById('count')?.value?.trim() || ''};
}

function randomTypesParseParams(langData, {minRaw, maxRaw, countRaw}){
  if(!minRaw || !maxRaw || !countRaw)
    return {error: langData.randomMissingParamsAlert || 'Fill in minimum, maximum and count.'};

  const min = Number(minRaw);
  const max = Number(maxRaw);
  const count = Number(countRaw);

  if(!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(count))
    return {error: langData.randomInvalidIntegerParamsAlert || 'Enter whole numbers only.'};
  if(min <= 0 || max <= 0 || count <= 0)
    return {error: langData.randomPositiveParamsAlert || 'Minimum, maximum and count must be positive numbers.'};
  if(min >= max)
    return {error: langData.randomMinMaxOrderAlert || 'Minimum must be smaller than maximum.'};

  return {min, max, count};
}

function randomTypesBuildValues(cfg, langData, min, max, count){
  const rangeSize = max - min + 1;
  if(cfg.random?.unique && count > rangeSize)
    return {error: langData[cfg.random.tooManyKey] || 'Count cannot be greater than the number of unique values in the selected range.'};

  return {values: typesParamsGenerateValuesInRange(min, max, count, {unique: !!cfg.random?.unique})};
}

function openRandomParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  typesParamsSetActiveContext(cfg.contexts.random);
  randomTypesPrepareModal();
}

function submitRandomParamsU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  const langData = getLangData();
  const parsedParams = randomTypesParseParams(langData, randomTypesReadParams());
  if(parsedParams.error){
    randomTypesShowError(parsedParams.error);
    return;
  }

  const {min, max, count} = parsedParams;
  typesParamsStoreRandomRangeForActiveAlgorithm(min, max);

  const valuesResult = randomTypesBuildValues(cfg, langData, min, max, count);
  if(valuesResult.error){
    randomTypesShowError(valuesResult.error);
    return;
  }

  typesParamsHideModalAndResetForm('#randomParamsModal', 'randomParamsForm');
  _setRandomParamsError('');

  if(typeof cfg.random?.start === 'function')
    cfg.random.start(valuesResult.values);
}