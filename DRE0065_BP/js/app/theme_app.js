function getThemeMode(){
  return localStorage.getItem('themeMode') || 'light';
}

function isDarkMode(){
  return getThemeMode() === 'dark';
}

function updateThemeToggleUI(){
  const btn = document.getElementById('themeToggle');
  if(!btn)
    return;

  const L = (typeof trCommon === 'function') ? trCommon() : {};
  const dark = isDarkMode();
  const title = dark ? (L.themeToggleToLight || 'Switch to light mode') : (L.themeToggleToDark || 'Switch to dark mode');

  btn.classList.toggle('is-dark', dark);
  btn.setAttribute('aria-checked', String(dark));
  btn.setAttribute('aria-label', title);
  btn.setAttribute('title', title);
}

function applyThemeMode(mode){
  const safeMode = mode === 'dark' ? 'dark' : 'light';

  document.body.classList.toggle('dark-mode', safeMode === 'dark');
  document.documentElement.classList.toggle('dark-mode', safeMode === 'dark');

  localStorage.setItem('themeMode', safeMode);
  updateThemeToggleUI();
}

function toggleThemeMode(){
  applyThemeMode(isDarkMode() ? 'light' : 'dark');
}

function initThemeStartup(){
  applyThemeMode(getThemeMode());

  const btn = document.getElementById('themeToggle');
  if(btn)
    btn.addEventListener('click', toggleThemeMode);

  updateThemeToggleUI();
}