let _actionInputOnOk = null;
let _historyModalRenderFn = null;
let _actionChoiceOnManual = null;
let _actionChoiceOnRandom = null;
let _messageReturnModalId = null;
let _actionInputRenderState = null;
let _actionChoiceRenderState = null;

function modalAppGetEl(id){
  return document.getElementById(id);
}

function scrollBoxToTop(target){
  const el = (typeof target === 'string') ? document.querySelector(target) : target;
  if(!el)
    return;

  el.scrollTop = 0;
}

function modalAppBindScrollTopOnShow(modalId, scrollTargetSelector){
  const $modal = $('#' + modalId);
  if(!$modal.length)
    return;

  $modal.off('shown.bs.modal.scrollTopFix').on('shown.bs.modal.scrollTopFix', () => {scrollBoxToTop(scrollTargetSelector);});
}

function _LAll(){
  return trCommon();
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
  const L = _LAll();

  if(titleEl)
    titleEl.textContent = title || (L.syntaxHistoryTitle || 'Syntax mode history');
  if(bodyEl){
    bodyEl.innerHTML = bodyHtml || '';

    modalAppBindHistoryEntryToggles(bodyEl);
    scrollBoxToTop(bodyEl);
  }
  if(okBtn)
    okBtn.textContent = L.closeBtn || 'Close';
}

function modalAppGetActionInputValue(){
  const input = modalAppGetEl('actionInput');
  return input ? (input.value || '').trim() : '';
}

function modalAppApplyActionInputConfig({title = '', label = '', infoHtml = '', placeholder = '', type = 'number', min = 1} = {}, {resetValue = false} = {}){
  const titleEl = modalAppGetEl('actionInputModalLabel');
  const labelEl = modalAppGetEl('actionInputLabel');
  const infoEl = modalAppGetEl('actionInputInfo');
  const input = modalAppGetEl('actionInput');

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
    input.placeholder = placeholder || '';

    if(resetValue)
      input.value = '';
  }
}

function modalAppApplyActionChoiceConfig({title = '', bodyHtml = '', manualLabel = '', randomLabel = ''} = {}){
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
}

function modalAppClearActionInputState(){
  _actionInputOnOk = null;
  _actionInputRenderState = null;
  _setActionInputError('');
}

function modalAppGetOpenNonMessageModals(){
  return Array.from(document.querySelectorAll('.modal.show')).filter(el => el.id !== 'messageModal');
}

function openActionInputModal({title = '', label = '', infoHtml = '', placeholder = '', type = 'number', min = 1, onOk, rerender = null}){
  _actionInputOnOk = onOk;
  _actionInputRenderState = (typeof rerender === 'function') ? rerender : null;

  const L = _LAll();
  const config = _actionInputRenderState ? _actionInputRenderState() : {title, label, infoHtml, placeholder, type, min};

  modalAppApplyActionInputConfig({title: config.title ?? title, label: config.label ?? label, infoHtml: config.infoHtml ?? infoHtml, placeholder: config.placeholder ?? placeholder, type: config.type ?? type, min: (config.min !== undefined ? config.min : min)}, {resetValue: true});
  _setActionInputError('');

  const okBtn = modalAppGetEl('actionOkBtn');
  if(okBtn)
    okBtn.textContent = L.submitBtn || 'Submit';

  $('#actionInputModal').modal('show');

  const input = modalAppGetEl('actionInput');
  if(input)
    setTimeout(() => input.focus(), 200);
}

function openActionChoiceModal({title = '', bodyHtml = '', manualLabel = '', randomLabel = '', onManual = null, onRandom = null, rerender = null}){
  _actionChoiceOnManual = onManual;
  _actionChoiceOnRandom = onRandom;
  _actionChoiceRenderState = (typeof rerender === 'function') ? rerender : null;

  const config = _actionChoiceRenderState ? _actionChoiceRenderState() : {title, bodyHtml, manualLabel, randomLabel};
  modalAppApplyActionChoiceConfig({title: config.title ?? title, bodyHtml: config.bodyHtml ?? bodyHtml, manualLabel: config.manualLabel ?? manualLabel, randomLabel: config.randomLabel ?? randomLabel});

  $('#actionChoiceModal').modal('show');
}

function openSyntaxHistoryModal(title, bodyHtml, renderFn = null){
  _historyModalRenderFn = renderFn;

  const content = modalAppResolveHistoryModalContent(title, bodyHtml, renderFn);
  modalAppApplyHistoryModalContent(content.title, content.bodyHtml);

  $('#syntaxHistoryModal').off('hidden.bs.modal.historyRender').on('hidden.bs.modal.historyRender', () => {_historyModalRenderFn = null;}).modal('show');
}

function buildEmptyHistoryWatermarkHtml(){
  const L = _LAll();
  const text = L.historyEmptyWatermark || 'EMPTY';

  return `
    <div class="history-empty-watermark-wrap">
      <div class="history-empty-watermark">
        <span>${text}</span>
      </div>
    </div>
  `;
}

function buildCollapsibleHistoryEntryHtml({title = '', metaHtml = '', detailHtml = ''} = {}){
  return `
    <div class="syntax-history-entry">
      <button type="button" class="syntax-history-toggle" aria-expanded="false">
        <i class="fas fa-chevron-down"></i>
      </button>

      <div class="info-panel-title">${title}</div>
      <div class="syntax-history-meta">${metaHtml}</div>

      <div class="syntax-history-entry-body">
        <div class="info-step-detail">${detailHtml}</div>
      </div>
    </div>
  `;
}

function modalAppBindHistoryEntryToggles(root = modalAppGetEl('syntaxHistoryModalBody')){
  if(!root)
    return;

  root.querySelectorAll('.syntax-history-toggle').forEach(btn => {
    btn.onclick = () => {
      const entry = btn.closest('.syntax-history-entry');
      if(!entry)
        return;

      const isOpen = entry.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    };
  });
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

function refreshOpenTransientModalsForLanguage(){
  const actionInputModal = modalAppGetEl('actionInputModal');
  if(actionInputModal && actionInputModal.classList.contains('show') && typeof _actionInputRenderState === 'function'){
    const cfg = _actionInputRenderState();
    modalAppApplyActionInputConfig(cfg, {resetValue: false});
  }

  const actionChoiceModal = modalAppGetEl('actionChoiceModal');
  if(actionChoiceModal && actionChoiceModal.classList.contains('show') && typeof _actionChoiceRenderState === 'function'){
    const cfg = _actionChoiceRenderState();
    modalAppApplyActionChoiceConfig(cfg);
  }
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
    _actionChoiceRenderState = null;
  });

  modalAppBindScrollTopOnShow('syntaxHistoryModal', '#syntaxHistoryModalBody');
  modalAppBindScrollTopOnShow('aboutModal', '#aboutModal .modal-body');
}

document.addEventListener('DOMContentLoaded', modalAppInit);