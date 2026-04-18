function initAppStartup(){
  if(typeof initThemeStartup === 'function')
    initThemeStartup();

  changeLanguage(getLang());
}

document.addEventListener('DOMContentLoaded', initAppStartup);