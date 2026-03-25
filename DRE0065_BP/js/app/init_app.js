function initAppStartup(){
  const savedLanguage = (typeof getLang === 'function') ? getLang() : (localStorage.getItem('language') || 'en');
  changeLanguage(savedLanguage);
}

document.addEventListener('DOMContentLoaded', initAppStartup);