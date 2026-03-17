let _actionInputOnOk = null, _historyModalRenderFn = null, _actionChoiceOnManual = null, _actionChoiceOnRandom = null, _messageReturnModalId = null;

function _LAll(){
  const lang = localStorage.getItem('language') || 'en';
  return(typeof trAll === 'function') ? trAll(lang) : (window.translations?.[lang]?.common || {});
}

function _setActionInputError(msg){
  const input = document.getElementById('actionInput');
  const err = document.getElementById('actionInputError');
  if(!input || !err)
    return;

  if(msg){
    input.classList.add('is-invalid');
    err.innerHTML = msg;
  }
  else{
    input.classList.remove('is-invalid');
    err.innerHTML = '';
  }
}

function openActionInputModal({title = '', label = '', infoHtml = '', placeholder = '', type = 'number', min = 1, onOk}){
  _actionInputOnOk = onOk;
  const L = _LAll();

  document.getElementById('actionInputModalLabel').textContent = title;
  document.getElementById('actionInputLabel').textContent = label;

  const info = document.getElementById('actionInputInfo');
  if(info)
    info.innerHTML = infoHtml || '';

  const input = document.getElementById('actionInput');
  input.type = type;
  if(min !== null && min !== undefined) 
    input.min = String(min);

  input.step = "1";
  input.value = '';
  input.placeholder = placeholder;

  _setActionInputError('');
  document.getElementById('actionOkBtn').textContent = L.submitBtn || 'Submit';
  
  $('#actionInputModal').modal('show');
  setTimeout(() => input.focus(), 200);
}

function openActionChoiceModal({title = '', bodyHtml = '', manualLabel = '', randomLabel = '', onManual = null, onRandom = null}){
  _actionChoiceOnManual = onManual;
  _actionChoiceOnRandom = onRandom;

  document.getElementById('actionChoiceModalLabel').textContent = title;
  document.getElementById('actionChoiceModalBody').innerHTML = bodyHtml || '';
  document.getElementById('actionChoiceManualBtn').textContent = manualLabel;
  document.getElementById('actionChoiceRandomBtn').textContent = randomLabel;

  $('#actionChoiceModal').modal('show');
}

function openSyntaxHistoryModal(title, bodyHtml, renderFn = null){
  const titleEl = document.getElementById('syntaxHistoryModalLabel');
  const bodyEl = document.getElementById('syntaxHistoryModalBody');
  const okBtn = document.getElementById('syntaxHistoryModalOkBtn');
  const lang = localStorage.getItem('language') || 'en';
  const L = window.translations?.[lang]?.common || {};

  _historyModalRenderFn = renderFn;

  let finalTitle = title || '';
  let finalBodyHtml = bodyHtml || '';

  if(typeof renderFn === 'function'){
    const data = renderFn();
    if(data){
      finalTitle = data.title || finalTitle;
      finalBodyHtml = data.bodyHtml || finalBodyHtml;
    }
  }

  if(titleEl)
    titleEl.textContent = finalTitle || (L.syntaxHistoryTitle || 'Syntax mode history');
  if(bodyEl)
    bodyEl.innerHTML = finalBodyHtml || '';
  if(okBtn)
    okBtn.textContent = L.messageOkBtn || 'OK';

  $('#syntaxHistoryModal').off('hidden.bs.modal.historyRender').on('hidden.bs.modal.historyRender', () => {_historyModalRenderFn = null;}).modal('show');
}

function buildEmptyHistoryWatermarkHtml(){
  const lang = localStorage.getItem('language') || 'en';
  const L = window.translations?.[lang]?.common || {};
  const text = L.historyEmptyWatermark || 'EMPTY';

  return `
    <div class="history-empty-watermark-wrap">
      <div class="history-empty-watermark">
        <span>${text}</span>
      </div>
    </div>
  `;
}

function refreshOpenHistoryModalForLanguage(){
  const modal = document.getElementById('syntaxHistoryModal');
  if(!modal || !modal.classList.contains('show'))
    return;

  if(typeof _historyModalRenderFn !== 'function')
    return;

  const data = _historyModalRenderFn();
  if(!data)
    return;

  const titleEl = document.getElementById('syntaxHistoryModalLabel');
  const bodyEl = document.getElementById('syntaxHistoryModalBody');
  const okBtn = document.getElementById('syntaxHistoryModalOkBtn');
  const lang = localStorage.getItem('language') || 'en';
  const L = window.translations?.[lang]?.common || {};

  if(titleEl)
    titleEl.textContent = data.title || '';
  if(bodyEl)
    bodyEl.innerHTML = data.bodyHtml || '';
  if(okBtn)
    okBtn.textContent = L.messageOkBtn || 'OK';
}

function returnToMainPageFromSyntax(fallbackAlgorithm){
  if(typeof goBack === 'function'){
    goBack();
    return;
  }

  if(typeof changeContent === 'function' && fallbackAlgorithm)
    changeContent(fallbackAlgorithm);
}

function showAppMessage(text, {title = null, onClose = null, restorePreviousModal = true} = {}){
  const L = _LAll();

  document.getElementById('messageModalLabel').textContent = (title !== null ? title : (L.messageTitle || 'Message'));
  document.getElementById('messageModalBody').innerHTML = text;
  document.getElementById('messageOkBtn').textContent = L.messageOkBtn || 'OK';

  const $message = $('#messageModal');
  $message.off('hidden.bs.modal.messageFlow');
  $message.one('hidden.bs.modal.messageFlow', () => {
    if(_messageReturnModalId){
      const modalToRestore = document.getElementById(_messageReturnModalId);
      if(modalToRestore)
        $('#' + _messageReturnModalId).modal('show');
    }

    _messageReturnModalId = null;
    if(onClose)
      onClose();
  });

  const openModals = Array.from(document.querySelectorAll('.modal.show')).filter(el => el.id !== 'messageModal');
  const lastOpenModal = openModals.length ? openModals[openModals.length - 1] : null;
  
  if(lastOpenModal){
    _messageReturnModalId = restorePreviousModal ? lastOpenModal.id : null;
    $('#' + lastOpenModal.id).off('hidden.bs.modal.showMessage').one('hidden.bs.modal.showMessage', () => {$message.modal('show');}).modal('hide');
    
    return;
  }

  _messageReturnModalId = null;
  $message.modal('show');
}

document.addEventListener('DOMContentLoaded', () => {
  function _bindFormSubmitToButton(formId, buttonId){
    const form = document.getElementById(formId);
    const btn = document.getElementById(buttonId);

    if(!form || !btn)
      return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.click();
    });
  }

  _bindFormSubmitToButton('manualParamsForm', 'submitBtn');
  _bindFormSubmitToButton('randomParamsForm', 'generateBtn');
  _bindFormSubmitToButton('syntaxForm', 'startSyntaxBtn');

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

  const choiceManualBtn = document.getElementById('actionChoiceManualBtn');
  const choiceRandomBtn = document.getElementById('actionChoiceRandomBtn');

  if(choiceManualBtn){
    choiceManualBtn.addEventListener('click', () => {
      $('#actionChoiceModal').modal('hide');
      if(typeof _actionChoiceOnManual === 'function')
        _actionChoiceOnManual();
    });
  }

  if(choiceRandomBtn){
    choiceRandomBtn.addEventListener('click', () => {
      $('#actionChoiceModal').modal('hide');
      if(typeof _actionChoiceOnRandom === 'function')
        _actionChoiceOnRandom();
    });
  }

  $('#actionChoiceModal').on('hidden.bs.modal', () => {
    _actionChoiceOnManual = null;
    _actionChoiceOnRandom = null;
  });
});