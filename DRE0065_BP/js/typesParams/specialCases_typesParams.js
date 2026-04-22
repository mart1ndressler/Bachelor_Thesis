function specialCasesTypesGetCasesContainer(){
  return document.getElementById('specialCasesCasesContainer');
}

function specialCasesTypesRenderScenarioButtons(cfg){
  const container = specialCasesTypesGetCasesContainer();
  if(!container)
    return;

  const scenarios = (typeof cfg.specialCases?.getScenarios === 'function') ? cfg.specialCases.getScenarios() : [];
  if(!Array.isArray(scenarios) || scenarios.length === 0){
    container.innerHTML = '';
    return;
  }

  container.innerHTML = scenarios.map(scenario => `
    <button type="button" class="special-case-btn" data-scenario-id="${scenario.id}">
      <span class="special-case-btn-title">${scenario.title}</span>
      <span class="special-case-btn-desc">${scenario.description}</span>
    </button>`).join('');

  container.querySelectorAll('[data-scenario-id]').forEach(button => {
    button.onclick = () => {
      const executionMode = getSpecialCasesExecutionMode();
      if(typeof cfg.specialCases?.start === 'function')
        cfg.specialCases.start(button.dataset.scenarioId, executionMode);
    };
  });
}

function openSpecialCasesParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  typesParamsSetActiveContext(cfg.contexts.specialCases);
  specialCasesTypesRenderScenarioButtons(cfg);

  $('#specialCasesModal').modal('show');
}

function refreshOpenSpecialCasesModalForLanguage(){
  const modal = document.getElementById('specialCasesModal');
  if(!modal || !modal.classList.contains('show'))
    return;

  const cfg = getAlgConfig();
  if(!cfg)
    return;

  specialCasesTypesRenderScenarioButtons(cfg);
}