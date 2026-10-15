/* Core adapter: free duels choose a stage; authored operations retain their own route. */
(function (root) {
  'use strict';
  const FREE_MODES = new Set(['cpu', 'local', 'training']);
  const STORAGE_KEY = 'cqc-pass17-core-match-rules';
  function mount(hooks) {
    const doc = hooks.document || root.document, menu = doc.getElementById('menu'), start = doc.getElementById('start');
    if (!menu || !start || doc.getElementById('coreMatchSettingsPass17')) return null;
    const stages = hooks.stages, common = root.CQC_MATCH_FLOW_PASS17;
    if (!common || !stages?.length) throw Error('Core match flow requires its shared presentation component and playable stages.');
    let phase = 'characters', rounds = 2, pending = 0, frame = 0;
    try { const saved = JSON.parse(root.localStorage.getItem(STORAGE_KEY) || '{}'); if ([1, 2].includes(saved.rounds)) rounds = saved.rounds; } catch (_) { /* Session remains playable. */ }
    doc.body.classList.add('core-match-flow-pass17');
    const gear = doc.createElement('button'); gear.id = 'coreMatchSettingsButtonPass17'; gear.type = 'button'; gear.className = 'match-gear-pass17'; gear.title = 'Réglages du match'; gear.setAttribute('aria-label', 'Réglages du match'); gear.setAttribute('aria-haspopup', 'dialog'); gear.setAttribute('aria-controls', 'coreMatchSettingsPass17');
    gear.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 2-.6 2.4-1.6.9-2.4-.7-2 3.5 1.8 1.8v1.8L2.4 13.5l2 3.5 2.4-.7 1.6.9L9 20h4l.6-2.8 1.6-.9 2.4.7 2-3.5-1.8-1.8V9.9l1.8-1.8-2-3.5-2.4.7-1.6-.9L13 2Z"/><circle cx="11" cy="11" r="3.2"/></svg>';
    const actions = doc.createElement('div'); actions.className = 'core-launch-actions-pass17'; start.before(actions); actions.append(gear, start);
    const settings = doc.createElement('dialog'); settings.id = 'coreMatchSettingsPass17'; settings.className = 'match-settings-pass17'; settings.setAttribute('aria-labelledby', 'coreMatchSettingsTitlePass17');
    settings.innerHTML = '<header><div><small>CONDITIONS DE L’OPÉRATION</small><h2 id="coreMatchSettingsTitlePass17">RÉGLAGES DU MATCH</h2></div><button type="button" class="flow-close-pass17" aria-label="Fermer les réglages">✕</button></header><div class="match-settings-grid-pass17"><section class="core-mode-section-pass17"><h3>MODE DE JEU</h3></section><label>VICTOIRES<select id="coreMatchRoundsPass17"><option value="1">1 MANCHE GAGNANTE</option><option value="2">2 MANCHES GAGNANTES</option></select></label><div class="core-match-fixed-pass17"><strong>CHRONO</strong><span id="coreMatchTimerPass17"></span></div></div><div class="match-settings-actions-pass17"><button type="button" class="primary" data-core-close>FERMER</button></div>';
    const fields = settings.querySelector('.match-settings-grid-pass17');
    // Local competition preparation keeps its existing launch and modal lifecycle.
    for (const id of ['open-relay', 'open-tournament']) menu.querySelector('.meta-menu').append(doc.getElementById(id));
    settings.querySelector('.core-mode-section-pass17').append(menu.querySelector('.mode-row'));
    fields.append(doc.getElementById('difficulty-label'), doc.getElementById('hud-select').closest('label'));
    doc.body.append(settings);
    const stageScreen = doc.createElement('dialog'); stageScreen.id = 'coreStageSelectPass17'; stageScreen.className = 'stage-selection-pass17 core-stage-screen-pass17'; stageScreen.setAttribute('aria-labelledby', 'coreStageTitlePass17');
    stageScreen.innerHTML = '<header class="topbar"><div class="brand"><small>02 / THÉÂTRE D’OPÉRATIONS</small><span id="coreStageTitlePass17">CHOIX DE L’ARÈNE</span></div><button type="button" id="coreStageBackPass17">← PERSONNAGES</button></header><main class="stage-selection-body-pass17"><section class="stage-selected-pass17"><canvas id="coreMatchStagePreviewPass17" width="1280" height="720" aria-label="Aperçu de l’arène et des combattants"></canvas><div class="stage-selected-copy-pass17"><small id="coreStageEpisodePass17"></small><h2 id="coreStageNamePass17"></h2><p id="coreStageFightersPass17"></p></div></section><section class="stage-browser-pass17" aria-label="Arènes disponibles"><div class="stage-filters-pass17"><label>OPÉRATION<select id="coreStageEpisodeFilterPass17"><option value="">TOUS LES SITES</option></select></label><label>RECHERCHE<input id="coreStageSearchPass17" type="search" placeholder="NOM OU ÉPOQUE" autocomplete="off"></label></div><p id="coreStageCountPass17" aria-live="polite"></p><div id="coreStageGridPass17" class="stage-grid-pass17"></div><p id="coreStageEmptyPass17" hidden>Aucune arène ne correspond à cette recherche.</p></section></main><footer class="stage-selection-footer-pass17"><p id="coreStageConditionsPass17"></p><button type="button" id="coreStageConfirmPass17" class="primary">ENTRER DANS L’ARÈNE →</button></footer>';
    doc.body.append(stageScreen);
    const grid = doc.getElementById('coreStageGridPass17'), filter = doc.getElementById('coreStageEpisodeFilterPass17'), search = doc.getElementById('coreStageSearchPass17'), roundSelect = doc.getElementById('coreMatchRoundsPass17');
    for (const episode of [...new Set(stages.map(stage => stage.ep))].filter(Boolean)) { const option = doc.createElement('option'); option.value = episode; option.textContent = episode; filter.append(option); }
    function updateLaunchSummary() {
      const selected = hooks.getSelection(), label = doc.getElementById('mode-detail');
      if (!['cpu', 'local'].includes(selected.mode) || !label) return;
      const text = `${rounds} manche${rounds > 1 ? 's' : ''} gagnante${rounds > 1 ? 's' : ''} / 99 secondes${selected.mode === 'local' ? ' / 2 joueurs locaux' : ''}`;
      if (label.textContent !== text) label.textContent = text;
    }
    function syncSettings() {
      const selected = hooks.getSelection(), freeDuel = ['cpu', 'local'].includes(selected.mode);
      roundSelect.value = String(rounds); roundSelect.disabled = !freeDuel;
      doc.getElementById('coreMatchTimerPass17').textContent = selected.mode === 'training' ? 'TEMPS LIBRE' : freeDuel ? '99 SECONDES' : 'CONDITIONS FIXÉES PAR L’OPÉRATION';
      updateLaunchSummary();
    }
    function closeSettings() {
      if (phase !== 'settings') return;
      rounds = Number(roundSelect.value) === 1 ? 1 : 2;
      try { root.localStorage.setItem(STORAGE_KEY, JSON.stringify({ rounds })); } catch (_) { /* In-memory rule still applies. */ }
      phase = 'characters'; settings.close(); updateLaunchSummary(); gear.focus();
    }
    gear.onclick = () => { if (phase !== 'characters' || menu.hidden) return; phase = 'settings'; syncSettings(); settings.showModal(); (settings.querySelector('[data-mode][aria-pressed="true"]') || settings.querySelector('[data-mode]')).focus(); };
    settings.querySelector('.flow-close-pass17').onclick = closeSettings; settings.querySelector('[data-core-close]').onclick = closeSettings;
    settings.addEventListener('cancel', event => { event.preventDefault(); closeSettings(); });
    settings.addEventListener('click', event => { if (event.target.closest('[data-mode]')) syncSettings(); });
    function stopPreview() { root.cancelAnimationFrame(frame); frame = 0; }
    function preview() { if (phase !== 'stages' || !stageScreen.open) { stopPreview(); return; } hooks.renderStage(doc.getElementById('coreMatchStagePreviewPass17'), stages[pending]); frame = root.requestAnimationFrame(preview); }
    function choose(index) {
      if (phase !== 'stages' || !stages[index]) return;
      pending = index; const stage = stages[index]; doc.getElementById('coreStageNamePass17').textContent = stage.name; doc.getElementById('coreStageEpisodePass17').textContent = stage.ep;
      for (const button of grid.querySelectorAll('[data-stage-index]')) { const active = Number(button.dataset.stageIndex) === pending; button.classList.toggle('selected', active); button.setAttribute('aria-pressed', String(active)); }
      hooks.preloadStage?.(stage);
    }
    function buildStages() {
      const entries = common.filterStages(stages, filter.value, search.value); grid.replaceChildren();
      for (const { stage, index } of entries) {
        const button = doc.createElement('button'); button.type = 'button'; button.className = 'stage-card-pass17'; button.dataset.stageIndex = String(index);
        const number = doc.createElement('span'); number.className = 'stage-card-number-pass17'; number.textContent = String(index + 1).padStart(3, '0');
        const name = doc.createElement('strong'); name.textContent = stage.name; const episode = doc.createElement('small'); episode.textContent = stage.ep;
        button.append(number, name, episode); button.onclick = () => choose(index); grid.append(button);
      }
      doc.getElementById('coreStageCountPass17').textContent = `${entries.length} / ${stages.length} ARÈNES`; doc.getElementById('coreStageEmptyPass17').hidden = entries.length !== 0; choose(pending);
    }
    function back() { if (phase !== 'stages') return; phase = 'characters'; stopPreview(); stageScreen.close(); start.focus(); }
    function begin() {
      if (phase !== 'characters' || menu.hidden) return false;
      const selected = hooks.getSelection();
      if (!FREE_MODES.has(selected.mode)) { hooks.start(); return true; }
      phase = 'stages'; pending = Math.max(0, stages.findIndex(stage => stage.id === selected.stage)); filter.value = ''; search.value = '';
      doc.getElementById('coreStageFightersPass17').textContent = `${selected.p1Name}  VS  ${selected.p2Name}`;
      doc.getElementById('coreStageConditionsPass17').textContent = selected.mode === 'training' ? 'ENTRAÎNEMENT · TEMPS LIBRE' : `${selected.mode === 'local' ? 'VERSUS LOCAL' : 'DUEL CONTRE IA'} · ${rounds} MANCHE${rounds > 1 ? 'S' : ''} GAGNANTE${rounds > 1 ? 'S' : ''} · 99 S`;
      stageScreen.showModal(); buildStages(); stopPreview(); preview(); (grid.querySelector('.selected') || doc.getElementById('coreStageBackPass17')).focus(); return true;
    }
    start.onclick = begin; doc.getElementById('coreStageBackPass17').onclick = back;
    doc.getElementById('coreStageConfirmPass17').onclick = () => {
      if (phase !== 'stages') return;
      // Mode changes from a host/import cannot redirect a authored operation to a free stage.
      if (!FREE_MODES.has(hooks.getSelection().mode)) { back(); return; }
      hooks.setStage(stages[pending].id); phase = 'characters'; stopPreview(); stageScreen.close(); hooks.start();
    };
    stageScreen.addEventListener('cancel', event => { event.preventDefault(); back(); });
    filter.onchange = buildStages; search.oninput = buildStages;
    grid.addEventListener('keydown', event => {
      const buttons = [...grid.querySelectorAll('button')], index = buttons.indexOf(doc.activeElement); if (index < 0) return;
      const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -2, ArrowDown: 2 }; let next;
      if (Object.hasOwn(offsets, event.key)) next = Math.max(0, Math.min(buttons.length - 1, index + offsets[event.key]));
      else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = buttons.length - 1; else return;
      event.preventDefault(); buttons[next].focus(); choose(Number(buttons[next].dataset.stageIndex));
    });
    doc.addEventListener('keydown', event => { if (phase !== 'characters' && ['F1', 'F2'].includes(event.key)) { event.preventDefault(); event.stopImmediatePropagation(); } }, true);
    const summaryObserver = new root.MutationObserver(updateLaunchSummary);
    summaryObserver.observe(doc.getElementById('mode-detail'), { childList: true });
    syncSettings();
    return Object.freeze({ begin, getDuelRules: () => FREE_MODES.has(hooks.getSelection().mode) ? { roundsToWin: rounds } : {}, getSnapshot: () => ({ phase, pendingStage: stages[pending]?.id || null, roundsToWin: rounds, stages: stages.length, mode: hooks.getSelection().mode }) });
  }
  root.CQC_CORE_MATCH_FLOW_PASS17 = Object.freeze({ mount });
})(typeof globalThis === 'object' ? globalThis : this);
