function randomTypesShowError(msg){
  document.getElementById('randomParamsForm')?.reset();
  showAppMessage(msg);
}

function randomTypesPrepareModal(){
  $('#randomParamsModal').modal('show');
  typesParamsClearInputField('rangeMin');
  typesParamsClearInputField('rangeMax');
  typesParamsClearInputField('count');

  const generateBtn = document.getElementById('generateBtn');
  if(generateBtn)
    generateBtn.onclick = submitRandomParamsU;
}

function randomTypesReadParams(){
  return {minRaw: document.getElementById('rangeMin')?.value?.trim() || '', maxRaw: document.getElementById('rangeMax')?.value?.trim() || '', countRaw: document.getElementById('count')?.value?.trim() || ''};
}

function randomTypesParseParams(langData, {minRaw, maxRaw, countRaw}){
  if(!minRaw || !maxRaw || !countRaw)
    return {error: langData.randomMissingParamsAlert || 'Fill in minimum, maximum and count of operations.'};

  const min = Number(minRaw);
  const max = Number(maxRaw);
  const count = Number(countRaw);

  if(!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(count))
    return {error: langData.randomInvalidIntegerParamsAlert || 'Enter whole numbers only.'};
  if(min <= 0 || max <= 0 || count <= 0)
    return {error: langData.randomPositiveParamsAlert || 'Minimum, maximum and count of operations must be positive numbers.'};
  if(min >= max)
    return {error: langData.randomMinMaxOrderAlert || 'Minimum must be smaller than maximum.'};

  return {min, max, count};
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
  typesParamsHideModalAndResetForm('#randomParamsModal', 'randomParamsForm');

  if(typeof cfg.random?.start === 'function')
    cfg.random.start({min, max, count});
}