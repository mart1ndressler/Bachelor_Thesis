function getLangData(){
  const lang = localStorage.getItem('language') || 'en';
  return (window.translations && window.translations[lang]) ? window.translations[lang] : window.translations.en;
}

function refreshLang(){
  changeLanguage(localStorage.getItem('language') || 'en');
}

function getActiveAlg(){
  return (typeof currentPage !== 'undefined') ? currentPage : 'main';
}

function parsePositiveIntList(input){
  return (input || '').split(',').map(v => v.trim()).filter(v => v !== '').map(v => Number(v)).filter(n => Number.isInteger(n) && n > 0);
}