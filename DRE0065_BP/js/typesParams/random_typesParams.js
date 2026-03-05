function openRandomParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  activeModalContext = cfg.contexts.random;
  refreshLang();
  $('#randomParamsModal').modal('show');

  const generateBtn = document.getElementById('generateBtn');
  if(generateBtn)
    generateBtn.onclick = submitRandomParamsU;
}

function submitRandomParamsU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  const langData = getLangData();
  const min = parseInt(document.getElementById('rangeMin')?.value, 10);
  const max = parseInt(document.getElementById('rangeMax')?.value, 10);
  const count = parseInt(document.getElementById('count')?.value, 10);

  if(isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count <= 0){
    showAppMessage(langData.invalidNumberAlert);
    return;
  }

  const rangeSize = (max - min + 1);
  let values = [];

  if(cfg.random?.unique){
    if(count > rangeSize){
      showAppMessage(langData[cfg.random.tooManyKey] || langData.invalidNumberAlert);
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

  if(typeof cfg.random?.start === 'function')
    cfg.random.start(values);
}