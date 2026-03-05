let _actionInputOnOk = null;

function _LAll(){
  const lang = localStorage.getItem('language') || 'en';
  return(typeof trAll === 'function') ? trAll(lang) : (window.translations?.[lang]?.common || {});
}

function _setActionInputError(msg){
  const input = document.getElementById('actionInput');
  const err = document.getElementById('actionInputError');
  if(!input || !err) return;

  if(msg){
    input.classList.add('is-invalid');
    err.innerHTML = msg;
  }
  else{
    input.classList.remove('is-invalid');
    err.innerHTML = '';
  }
}

function openActionInputModal({title = '', label = '', placeholder = '', type = 'number', min = 1, onOk}){
  _actionInputOnOk = onOk;
  const L = _LAll();

  document.getElementById('actionInputModalLabel').textContent = title;
  document.getElementById('actionInputLabel').textContent = label;

  const input = document.getElementById('actionInput');
  input.type = type;
  if(min !== null && min !== undefined) 
    input.min = String(min);

  input.step = "1";
  input.value = '';
  input.placeholder = placeholder;

  _setActionInputError('');
  document.getElementById('actionOkBtn').textContent = L.okBtn || 'OK';
  
  $('#actionInputModal').modal('show');
  setTimeout(() => input.focus(), 200);
}

function showAppMessage(text, {title = null, onClose = null} = {}){
  const L = _LAll();

  document.getElementById('messageModalLabel').textContent = (title !== null ? title : (L.messageTitle || 'Message'));
  document.getElementById('messageModalBody').innerHTML = text;
  document.getElementById('messageOkBtn').textContent = L.okBtn || 'OK';

  const $m = $('#messageModal');
  if(onClose) 
    $m.one('hidden.bs.modal', onClose);

  $m.modal('show');
}

document.addEventListener('DOMContentLoaded', () => {
  const okBtn = document.getElementById('actionOkBtn');
  const input = document.getElementById('actionInput');

  if(okBtn){
    okBtn.addEventListener('click', () => {
      if(typeof _actionInputOnOk === 'function'){
        const val = (document.getElementById('actionInput').value || '').trim();
        const shouldClose = _actionInputOnOk(val);

        if(shouldClose !== false) 
            $('#actionInputModal').modal('hide');
      }
      else 
        $('#actionInputModal').modal('hide');
    });
  }

  if(input){
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){ 
        e.preventDefault();
        if(okBtn)
          okBtn.click();
      }
    });
  }

  $('#actionInputModal').on('hidden.bs.modal', () => {
    _actionInputOnOk = null;
    _setActionInputError('');
  });
});