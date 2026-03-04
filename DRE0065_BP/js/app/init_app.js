document.addEventListener('DOMContentLoaded', function (){
    const savedLanguage = localStorage.getItem('language') || 'en';
    changeLanguage(savedLanguage);
    document.getElementById('backArrow').style.display = 'none';
});