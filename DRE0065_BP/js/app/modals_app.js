let _actionInputOnOk = null;
let _historyModalRenderFn = null;
let _actionChoiceOnManual = null;
let _actionChoiceOnRandom = null;
let _messageReturnModalId = null;

function modalAppGetEl(id){
  return document.getElementById(id);
}

function modalAppGetLang(){
  return (typeof getLang === 'function') ? getLang() : (localStorage.getItem('language') || 'en');
}

function _LAll(){
  const lang = modalAppGetLang();
  return (typeof trAll === 'function') ? trAll(lang) : (window.translations?.[lang]?.common || {});
}

function _setActionInputError(msg){
  const input = modalAppGetEl('actionInput');
  const err = modalAppGetEl('actionInputError');

  if(!input || !err)
    return;

  if(msg){
    input.classList.add('is-invalid');
    err.innerHTML = msg;
    
    return;
  }

  input.classList.remove('is-invalid');
  err.innerHTML = '';
}

function modalAppGetCommonTranslations(){
  const lang = modalAppGetLang();
  return window.translations?.[lang]?.common || {};
}

function modalAppResolveHistoryModalContent(title, bodyHtml, renderFn){
  let finalTitle = title || '';
  let finalBodyHtml = bodyHtml || '';

  if(typeof renderFn === 'function'){
    const renderedData = renderFn();
    if(renderedData){
      finalTitle = renderedData.title || finalTitle;
      finalBodyHtml = renderedData.bodyHtml || finalBodyHtml;
    }
  }

  return {title: finalTitle, bodyHtml: finalBodyHtml};
}

function modalAppApplyHistoryModalContent(title, bodyHtml){
  const titleEl = modalAppGetEl('syntaxHistoryModalLabel');
  const bodyEl = modalAppGetEl('syntaxHistoryModalBody');
  const okBtn = modalAppGetEl('syntaxHistoryModalOkBtn');
  const L = modalAppGetCommonTranslations();

  if(titleEl)
    titleEl.textContent = title || (L.syntaxHistoryTitle || 'Syntax mode history');
  if(bodyEl)
    bodyEl.innerHTML = bodyHtml || '';
  if(okBtn)
    okBtn.textContent = L.messageOkBtn || 'OK';
}

function modalAppGetActionInputValue(){
  const input = modalAppGetEl('actionInput');
  return input ? (input.value || '').trim() : '';
}

function modalAppClearActionInputState(){
  _actionInputOnOk = null;
  _setActionInputError('');
}

function modalAppGetOpenNonMessageModals(){
  return Array.from(document.querySelectorAll('.modal.show')).filter(el => el.id !== 'messageModal');
}

function openActionInputModal({title = '', label = '', infoHtml = '', placeholder = '', type = 'number', min = 1, onOk}){
  _actionInputOnOk = onOk;
  const L = _LAll();

  const titleEl = modalAppGetEl('actionInputModalLabel');
  const labelEl = modalAppGetEl('actionInputLabel');
  const infoEl = modalAppGetEl('actionInputInfo');
  const input = modalAppGetEl('actionInput');
  const okBtn = modalAppGetEl('actionOkBtn');

  if(titleEl)
    titleEl.textContent = title;
  if(labelEl)
    labelEl.textContent = label;
  if(infoEl)
    infoEl.innerHTML = infoHtml || '';

  if(input){
    input.type = type;

    if(min !== null && min !== undefined)
      input.min = String(min);
    else
      input.removeAttribute('min');

    input.step = '1';
    input.value = '';
    input.placeholder = placeholder;
  }

  _setActionInputError('');

  if(okBtn)
    okBtn.textContent = L.submitBtn || 'Submit';

  $('#actionInputModal').modal('show');

  if(input)
    setTimeout(() => input.focus(), 200);
}

function openActionChoiceModal({title = '', bodyHtml = '', manualLabel = '', randomLabel = '', onManual = null, onRandom = null}){
  _actionChoiceOnManual = onManual;
  _actionChoiceOnRandom = onRandom;

  const titleEl = modalAppGetEl('actionChoiceModalLabel');
  const bodyEl = modalAppGetEl('actionChoiceModalBody');
  const manualBtn = modalAppGetEl('actionChoiceManualBtn');
  const randomBtn = modalAppGetEl('actionChoiceRandomBtn');

  if(titleEl)
    titleEl.textContent = title;
  if(bodyEl)
    bodyEl.innerHTML = bodyHtml || '';
  if(manualBtn)
    manualBtn.textContent = manualLabel;
  if(randomBtn)
    randomBtn.textContent = randomLabel;

  $('#actionChoiceModal').modal('show');
}

function openSyntaxHistoryModal(title, bodyHtml, renderFn = null){
  _historyModalRenderFn = renderFn;

  const content = modalAppResolveHistoryModalContent(title, bodyHtml, renderFn);
  modalAppApplyHistoryModalContent(content.title, content.bodyHtml);

  $('#syntaxHistoryModal').off('hidden.bs.modal.historyRender').on('hidden.bs.modal.historyRender', () => {_historyModalRenderFn = null;}).modal('show');
}

function buildEmptyHistoryWatermarkHtml(){
  const L = modalAppGetCommonTranslations();
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
  const modal = modalAppGetEl('syntaxHistoryModal');
  if(!modal || !modal.classList.contains('show'))
    return;

  if(typeof _historyModalRenderFn !== 'function')
    return;

  const data = _historyModalRenderFn();
  if(!data)
    return;

  modalAppApplyHistoryModalContent(data.title || '', data.bodyHtml || '');
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

  const labelEl = modalAppGetEl('messageModalLabel');
  const bodyEl = modalAppGetEl('messageModalBody');
  const okBtn = modalAppGetEl('messageOkBtn');

  if(labelEl)
    labelEl.textContent = (title !== null ? title : (L.messageTitle || 'Message'));
  if(bodyEl)
    bodyEl.innerHTML = text;
  if(okBtn)
    okBtn.textContent = L.messageOkBtn || 'OK';

  const $message = $('#messageModal');

  $message.off('hidden.bs.modal.messageFlow');
  $message.one('hidden.bs.modal.messageFlow', () => {
    if(_messageReturnModalId){
      const modalToRestore = modalAppGetEl(_messageReturnModalId);
      if(modalToRestore)
        $('#' + _messageReturnModalId).modal('show');
    }

    _messageReturnModalId = null;

    if(onClose)
      onClose();
  });

  const openModals = modalAppGetOpenNonMessageModals();
  const lastOpenModal = openModals.length ? openModals[openModals.length - 1] : null;

  if(lastOpenModal){
    _messageReturnModalId = restorePreviousModal ? lastOpenModal.id : null;
    $('#' + lastOpenModal.id).off('hidden.bs.modal.showMessage').one('hidden.bs.modal.showMessage', () => {$message.modal('show');}).modal('hide');

    return;
  }

  _messageReturnModalId = null;
  $message.modal('show');
}

function modalAppBindFormSubmitToButton(formId, buttonId){
  const form = modalAppGetEl(formId);
  const button = modalAppGetEl(buttonId);

  if(!form || !button)
    return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    button.click();
  });
}

function modalAppHandleActionInputConfirm(){
  if(typeof _actionInputOnOk === 'function'){
    const shouldClose = _actionInputOnOk(modalAppGetActionInputValue());

    if(shouldClose !== false)
      $('#actionInputModal').modal('hide');

    return;
  }

  $('#actionInputModal').modal('hide');
}

function modalAppHandleActionChoice(handler){
  $('#actionChoiceModal').modal('hide');

  if(typeof handler === 'function')
    handler();
}

function modalAppInit(){
  modalAppBindFormSubmitToButton('manualParamsForm', 'submitBtn');
  modalAppBindFormSubmitToButton('randomParamsForm', 'generateBtn');
  modalAppBindFormSubmitToButton('syntaxForm', 'startSyntaxBtn');

  const okBtn = modalAppGetEl('actionOkBtn');
  const input = modalAppGetEl('actionInput');
  const choiceManualBtn = modalAppGetEl('actionChoiceManualBtn');
  const choiceRandomBtn = modalAppGetEl('actionChoiceRandomBtn');

  if(okBtn)
    okBtn.addEventListener('click', modalAppHandleActionInputConfirm);
  if(input){
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        e.preventDefault();

        if(okBtn)
          okBtn.click();
      }
    });
  }

  $('#actionInputModal').on('hidden.bs.modal', () => {modalAppClearActionInputState();});

  if(choiceManualBtn)
    choiceManualBtn.addEventListener('click', () => {modalAppHandleActionChoice(_actionChoiceOnManual);});
  if(choiceRandomBtn)
    choiceRandomBtn.addEventListener('click', () => {modalAppHandleActionChoice(_actionChoiceOnRandom);});
  
  $('#actionChoiceModal').on('hidden.bs.modal', () => {
    _actionChoiceOnManual = null;
    _actionChoiceOnRandom = null;
  });
}

document.addEventListener('DOMContentLoaded', modalAppInit);