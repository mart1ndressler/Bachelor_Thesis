function bestWorstTypesGetCasesContainer(){
  return document.getElementById('bestWorstCasesContainer');
}

function bestWorstTypesRenderScenarioButtons(cfg){
  const container = bestWorstTypesGetCasesContainer();
  if(!container)
    return;

  const scenarios = (typeof cfg.bestWorst?.getScenarios === 'function') ? cfg.bestWorst.getScenarios() : [];
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
      const executionMode = getBestWorstExecutionMode();
      if(typeof cfg.bestWorst?.start === 'function')
        cfg.bestWorst.start(button.dataset.scenarioId, executionMode);
    };
  });
}

function openBestWorstParamsModalU(){
  const cfg = getAlgConfig();
  if(!cfg)
    return;

  typesParamsSetActiveContext(cfg.contexts.bestWorst);
  bestWorstTypesRenderScenarioButtons(cfg);

  $('#bestWorstModal').modal('show');
}

function refreshOpenBestWorstModalForLanguage(){
  const modal = document.getElementById('bestWorstModal');
  if(!modal || !modal.classList.contains('show'))
    return;

  const cfg = getAlgConfig();
  if(!cfg)
    return;

  bestWorstTypesRenderScenarioButtons(cfg);
}