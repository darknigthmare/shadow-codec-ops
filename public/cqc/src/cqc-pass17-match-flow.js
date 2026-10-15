/* Match setup and stage selection. Existing engine controls keep their IDs and listeners. */
(function (root, factory) {
  'use strict';
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root.document) root.CQC_MATCH_FLOW_PASS17 = api;
})(typeof globalThis === 'object' ? globalThis : this, function (root) {
  'use strict';
  const STORAGE_KEY = 'cqc-pass17-match-settings';
  const MODES = ['cpu', 'local', 'training'];
  const FINISHERS = ['off', 'stylized', 'cinematic'];
  const LEVELS = ['recruit', 'normal', 'veteran', 'extreme'];
  const PROFILES = ['balanced', 'rushdown', 'zoner', 'grappler', 'turtle', 'whiff', 'sniper', 'trapper', 'parry', 'resource', 'evasive', 'boss'];
  const DEFAULTS = Object.freeze({ mode: 'cpu', rounds: 2, seconds: 99, finishers: 'stylized', difficulty: 'normal', aiProfile: 'balanced', captions: true, noFlash: false });
  function normaliseSettings(value = {}, fallback = DEFAULTS) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) value = {};
    const pick = (key, valid) => valid.includes(value[key]) ? value[key] : fallback[key];
    return {
      mode: pick('mode', MODES), rounds: pick('rounds', [1, 2, 3]), seconds: pick('seconds', [0, 60, 99]),
      finishers: pick('finishers', FINISHERS), difficulty: pick('difficulty', LEVELS), aiProfile: pick('aiProfile', PROFILES),
      captions: typeof value.captions === 'boolean' ? value.captions : fallback.captions,
      noFlash: typeof value.noFlash === 'boolean' ? value.noFlash : fallback.noFlash
    };
  }
  function filterStages(stages, episode = '', query = '') {
    const needle = String(query).trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    return stages.map((stage, index) => ({ stage, index })).filter(({ stage }) =>
      (!episode || String(stage.ep || stage.episode || '') === episode) &&
      (!needle || `${stage.name} ${stage.ep || stage.episode || ''}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(needle)));
  }
  function createStateMachine() {
    let phase = 'characters';
    return Object.freeze({
      get phase() { return phase; },
      transition(event) {
        const next = {
          characters: { settings: 'settings', stages: 'stages' },
          settings: { close: 'characters' },
          stages: { back: 'characters', confirm: 'loading' },
          loading: { started: 'fighting', cancelled: 'stages' },
          fighting: { selection: 'characters' }
        }[phase]?.[event];
        if (!next) return false;
        phase = next; return true;
      }
    });
  }
  function mount(hooks) {
    const doc = hooks.document || root.document, selectScreen = doc.getElementById('selectScreen');
    if (!selectScreen || !hooks.stages?.length || doc.getElementById('matchSettingsPass17')) return null;
    const launch = doc.getElementById('launch'), setup = launch.closest('.setup'), machine = createStateMachine();
    let saved = normaliseSettings(hooks.getSettings()), pendingStage = 0, previousFocus = null, frame = 0, attempt = 0;
    try { saved = normaliseSettings(JSON.parse(root.localStorage.getItem(STORAGE_KEY) || 'null') || {}, saved); } catch (_) { /* Session settings remain usable. */ }
    hooks.commitSettings(saved);
    const dialog = doc.createElement('dialog'); dialog.id = 'matchSettingsPass17'; dialog.className = 'match-settings-pass17';
    dialog.setAttribute('aria-labelledby', 'matchSettingsTitlePass17');
    dialog.innerHTML = '<header><div><small>CONDITIONS DU DUEL</small><h2 id="matchSettingsTitlePass17">RÉGLAGES DU MATCH</h2></div><button type="button" class="flow-close-pass17" aria-label="Fermer les réglages">✕</button></header><form method="dialog"><div class="match-settings-grid-pass17"></div><div class="match-settings-actions-pass17"><button type="button" data-action="cancel">ANNULER</button><button type="submit" class="primary">APPLIQUER</button></div></form>';
    const fields = dialog.querySelector('.match-settings-grid-pass17');
    for (const id of ['mode', 'rounds', 'timer', 'finishMode46']) fields.append(doc.getElementById(id).closest('label'));
    function selectField(id, label, entries) {
      const wrap = doc.createElement('label'); wrap.textContent = label;
      const select = doc.createElement('select'); select.id = id;
      for (const [value, name] of entries) { const option = doc.createElement('option'); option.value = value; option.textContent = name; select.append(option); }
      wrap.append(select); fields.append(wrap); return select;
    }
    const difficulty = selectField('matchDifficultyPass17', 'NIVEAU IA', [['recruit', 'RECRUE'], ['normal', 'NORMAL'], ['veteran', 'VÉTÉRAN'], ['extreme', 'EXTRÊME']]);
    const profile = selectField('matchAIProfilePass17', 'TACTIQUE IA', [['balanced', 'ÉQUILIBRÉE'], ['rushdown', 'ASSAUT'], ['zoner', 'CONTRÔLE À DISTANCE'], ['grappler', 'CORPS À CORPS'], ['turtle', 'DÉFENSE'], ['whiff', 'CONTRE-ATTAQUE'], ['sniper', 'TIREUR'], ['trapper', 'PIÈGES'], ['parry', 'PARADE'], ['resource', 'GESTION DES RESSOURCES'], ['evasive', 'ÉVASION'], ['boss', 'PRESSION MAXIMALE']]);
    function checkField(id, label) {
      const wrap = doc.createElement('label'); wrap.className = 'match-check-pass17';
      const check = doc.createElement('input'); check.id = id; check.type = 'checkbox'; wrap.append(check, doc.createTextNode(label)); fields.append(wrap); return check;
    }
    const captions = checkField('matchCaptionsPass17', 'LÉGENDES DES FINISHERS'), noFlash = checkField('matchNoFlashPass17', 'ATTÉNUER LES FLASHES');
    doc.body.append(dialog);
    const gear = doc.createElement('button'); gear.id = 'matchSettingsButtonPass17'; gear.type = 'button'; gear.className = 'match-gear-pass17';
    gear.setAttribute('aria-label', 'Réglages du match'); gear.setAttribute('aria-haspopup', 'dialog'); gear.setAttribute('aria-controls', dialog.id); gear.title = 'Réglages du match';
    gear.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 2-.6 2.4-1.6.9-2.4-.7-2 3.5 1.8 1.8v1.8L2.4 13.5l2 3.5 2.4-.7 1.6.9L9 20h4l.6-2.8 1.6-.9 2.4.7 2-3.5-1.8-1.8V9.9l1.8-1.8-2-3.5-2.4.7-1.6-.9L13 2Z"/><circle cx="11" cy="11" r="3.2"/></svg>';
    const summary = doc.createElement('p'); summary.id = 'matchSummaryPass17'; summary.className = 'match-summary-pass17'; summary.setAttribute('aria-live', 'polite');
    const actions = doc.createElement('div'); actions.className = 'match-launch-actions-pass17'; actions.append(gear, launch); setup.append(summary, actions); setup.classList.add('match-launch-pass17');
    for (const id of ['stageMini', 'stageName', 'nextStage', 'mobileStage']) { const element = doc.getElementById(id); if (element) element.hidden = true; }
    doc.querySelector('#selectScreen .stage-mini')?.setAttribute('hidden', '');
    const stageScreen = doc.createElement('section'); stageScreen.id = 'stageSelectPass17'; stageScreen.className = 'screen hidden stage-selection-pass17'; stageScreen.setAttribute('aria-labelledby', 'stageTitlePass17');
    stageScreen.innerHTML = '<header class="topbar"><div class="brand"><small>02 / THÉÂTRE D’OPÉRATIONS</small><span id="stageTitlePass17">CHOIX DE L’ARÈNE</span></div><button type="button" id="stageBackPass17">← PERSONNAGES</button></header><main class="stage-selection-body-pass17"><section class="stage-selected-pass17"><canvas id="matchStagePreviewPass17" width="1280" height="720" aria-label="Aperçu animé de l’arène sélectionnée"></canvas><div class="stage-selected-copy-pass17"><small id="stageEpisodePass17"></small><h2 id="stageNamePass17"></h2><p id="stageFightersPass17"></p></div></section><section class="stage-browser-pass17" aria-label="Arènes disponibles"><div class="stage-filters-pass17"><label>OPÉRATION<select id="stageEpisodeFilterPass17"><option value="">TOUS LES SITES</option></select></label><label>RECHERCHE<input id="stageSearchPass17" type="search" placeholder="NOM OU ÉPOQUE" autocomplete="off"></label></div><p id="stageCountPass17" aria-live="polite"></p><div id="stageGridPass17" class="stage-grid-pass17"></div><p id="stageEmptyPass17" hidden>Aucune arène ne correspond à cette recherche.</p></section></main><footer class="stage-selection-footer-pass17"><p id="stageConditionsPass17"></p><button type="button" id="stageConfirmPass17" class="launch">ENTRER DANS L’ARÈNE →</button></footer>';
    doc.body.append(stageScreen);
    const episodeFilter = doc.getElementById('stageEpisodeFilterPass17'), search = doc.getElementById('stageSearchPass17'), grid = doc.getElementById('stageGridPass17'), confirm = doc.getElementById('stageConfirmPass17');
    for (const episode of [...new Set(hooks.stages.map(s => String(s.ep || s.episode || '')))].filter(Boolean)) { const option = doc.createElement('option'); option.value = episode; option.textContent = episode; episodeFilter.append(option); }
    function conditionText() {
      const value = normaliseSettings(hooks.getSettings(), saved), modes = { cpu: 'DUEL CONTRE IA', local: 'VERSUS LOCAL', training: 'ENTRAÎNEMENT' };
      return value.mode === 'training' ? 'ENTRAÎNEMENT · TEMPS LIBRE' : `${modes[value.mode]} · ${value.rounds} MANCHE${value.rounds > 1 ? 'S' : ''} GAGNANTE${value.rounds > 1 ? 'S' : ''} · ${value.seconds ? value.seconds + ' S' : 'TEMPS LIBRE'}`;
    }
    function updateSummary() { summary.textContent = conditionText(); doc.getElementById('stageConditionsPass17').textContent = conditionText(); }
    function writeFields(value) {
      for (const [id, key] of [['mode', 'mode'], ['rounds', 'rounds'], ['timer', 'seconds'], ['finishMode46', 'finishers']]) doc.getElementById(id).value = String(value[key]);
      difficulty.value = value.difficulty; profile.value = value.aiProfile; captions.checked = value.captions; noFlash.checked = value.noFlash;
      const cpu = value.mode === 'cpu'; difficulty.disabled = !cpu; profile.disabled = !cpu;
    }
    function readFields() { return normaliseSettings({ mode: doc.getElementById('mode').value, rounds: Number(doc.getElementById('rounds').value), seconds: Number(doc.getElementById('timer').value), finishers: doc.getElementById('finishMode46').value, difficulty: difficulty.value, aiProfile: profile.value, captions: captions.checked, noFlash: noFlash.checked }, saved); }
    function restoreFocus(element = previousFocus) { if (element?.isConnected) element.focus(); }
    function stopPreview() { root.cancelAnimationFrame(frame); frame = 0; }
    function drawPreview() {
      if (machine.phase !== 'stages' || stageScreen.classList.contains('hidden')) { stopPreview(); return; }
      hooks.renderStage(doc.getElementById('matchStagePreviewPass17'), hooks.stages[pendingStage]);
      frame = root.requestAnimationFrame(drawPreview);
    }
    function chooseStage(index) {
      if (machine.phase !== 'stages' || !hooks.stages[index]) return;
      pendingStage = index; const stage = hooks.stages[index];
      doc.getElementById('stageNamePass17').textContent = stage.name;
      doc.getElementById('stageEpisodePass17').textContent = String(stage.ep || stage.episode || '');
      for (const button of grid.querySelectorAll('[data-stage-index]')) { const selected = Number(button.dataset.stageIndex) === index; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected)); }
      hooks.preloadStage?.(stage);
    }
    function buildStages() {
      const entries = filterStages(hooks.stages, episodeFilter.value, search.value); grid.replaceChildren();
      for (const { stage, index } of entries) {
        const button = doc.createElement('button'); button.type = 'button'; button.className = 'stage-card-pass17'; button.dataset.stageIndex = String(index);
        const number = doc.createElement('span'); number.className = 'stage-card-number-pass17'; number.textContent = String(index + 1).padStart(3, '0');
        const name = doc.createElement('strong'); name.textContent = stage.name;
        const episode = doc.createElement('small'); episode.textContent = String(stage.ep || stage.episode || '');
        button.append(number, name, episode); button.onclick = () => chooseStage(index); grid.append(button);
      }
      doc.getElementById('stageCountPass17').textContent = `${entries.length} / ${hooks.stages.length} ARÈNES`;
      doc.getElementById('stageEmptyPass17').hidden = entries.length !== 0; chooseStage(pendingStage);
    }
    function openSettings() {
      if (!selectScreen.classList.contains('hidden') && machine.phase === 'fighting') machine.transition('selection');
      if (!machine.transition('settings')) return false;
      saved = normaliseSettings(hooks.getSettings(), saved); previousFocus = doc.activeElement; writeFields(saved); dialog.showModal(); doc.getElementById('mode').focus(); return true;
    }
    function closeSettings(apply) {
      if (machine.phase !== 'settings') return;
      const value = apply ? readFields() : saved; hooks.commitSettings(value); saved = value;
      if (apply) try { root.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch (_) { /* Current match still receives settings. */ }
      writeFields(saved); machine.transition('close'); dialog.close(); updateSummary(); restoreFocus();
    }
    gear.onclick = openSettings;
    dialog.querySelector('.flow-close-pass17').onclick = () => closeSettings(false);
    dialog.querySelector('[data-action="cancel"]').onclick = () => closeSettings(false);
    dialog.querySelector('form').onsubmit = event => { event.preventDefault(); closeSettings(true); };
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeSettings(false); });
    doc.getElementById('mode').addEventListener('change', () => { const cpu = doc.getElementById('mode').value === 'cpu'; difficulty.disabled = !cpu; profile.disabled = !cpu; });
    function beginStageSelection() {
      if (selectScreen.classList.contains('hidden')) return false;
      if (machine.phase === 'fighting') machine.transition('selection');
      if (!machine.transition('stages')) return false;
      previousFocus = doc.activeElement; saved = normaliseSettings(hooks.getSettings(), saved); const selected = hooks.getSelection(); pendingStage = Math.max(0, Math.min(hooks.stages.length - 1, Number(selected.stageIndex) || 0));
      episodeFilter.value = ''; search.value = ''; doc.getElementById('stageFightersPass17').textContent = `${selected.p1Name}  VS  ${selected.p2Name}`;
      selectScreen.classList.add('hidden'); stageScreen.classList.remove('hidden'); confirm.disabled = false; updateSummary(); buildStages(); stopPreview(); drawPreview();
      (grid.querySelector('.selected') || doc.getElementById('stageBackPass17')).focus(); return true;
    }
    function backToCharacters() {
      if (!machine.transition('back')) return false;
      stopPreview(); stageScreen.classList.add('hidden'); selectScreen.classList.remove('hidden'); restoreFocus(launch); return true;
    }
    async function confirmStage() {
      if (!machine.transition('confirm')) return false;
      const ticket = ++attempt; confirm.disabled = true; stopPreview(); hooks.setStage(pendingStage);
      try {
        const started = await hooks.start(saved, () => { stageScreen.classList.add('hidden'); });
        if (ticket !== attempt) return false;
        machine.transition(started ? 'started' : 'cancelled'); confirm.disabled = false;
        if (!started) { stageScreen.classList.remove('hidden'); drawPreview(); confirm.focus(); }
        return Boolean(started);
      } catch (error) {
        machine.transition('cancelled'); confirm.disabled = false; stageScreen.classList.remove('hidden'); drawPreview(); confirm.focus(); throw error;
      }
    }
    launch.onclick = beginStageSelection; doc.getElementById('stageBackPass17').onclick = backToCharacters; confirm.onclick = confirmStage;
    episodeFilter.onchange = buildStages; search.oninput = buildStages;
    grid.addEventListener('keydown', event => {
      const buttons = [...grid.querySelectorAll('button')], index = buttons.indexOf(doc.activeElement); if (index < 0) return;
      let next = index;
      if (event.key === 'ArrowRight') next = Math.min(buttons.length - 1, index + 1);
      else if (event.key === 'ArrowDown') next = Math.min(buttons.length - 1, index + 2);
      else if (event.key === 'ArrowLeft') next = Math.max(0, index - 1);
      else if (event.key === 'ArrowUp') next = Math.max(0, index - 2);
      else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = buttons.length - 1; else return;
      event.preventDefault(); buttons[next].focus(); chooseStage(Number(buttons[next].dataset.stageIndex));
    });
    doc.addEventListener('keydown', event => {
      if (['settings', 'stages'].includes(machine.phase) && ['F1', 'F2'].includes(event.key)) { event.preventDefault(); event.stopImmediatePropagation(); return; }
      if (machine.phase !== 'stages' || event.key !== 'Escape') return;
      event.preventDefault(); event.stopImmediatePropagation(); backToCharacters();
    }, true);
    const observer = new root.MutationObserver(() => {
      if (machine.phase === 'fighting' && !selectScreen.classList.contains('hidden')) { machine.transition('selection'); updateSummary(); }
    });
    observer.observe(selectScreen, { attributes: true, attributeFilter: ['class'] });
    writeFields(saved); updateSummary();
    return Object.freeze({ beginStageSelection, openSettings, backToCharacters, getSnapshot: () => ({ phase: machine.phase, stageIndex: pendingStage, stageId: hooks.stages[pendingStage]?.id || null, settings: { ...saved } }) });
  }
  return Object.freeze({ DEFAULTS, STORAGE_KEY, normaliseSettings, filterStages, createStateMachine, mount });
});
