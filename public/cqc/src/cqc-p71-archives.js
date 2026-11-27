(function (host) {
  'use strict';
  const api = host.CQC_P71_ACCESS, doc = host.document;
  if (!api || !doc.getElementById('classified-archives')) return;
  const byId = id => doc.getElementById(id);
  const grid = byId('archives-grid'), detail = byId('archives-detail'), reader = byId('archives-reader');
  let storage;
  try { storage = host.localStorage; } catch (_) { storage = { getItem() { throw Error('Sauvegarde locale indisponible.'); }, setItem() { throw Error('Sauvegarde locale indisponible.'); } }; }
  let ledgerResult = api.loadLedger(storage), evidence = api.readEvidence(storage);
  let documents = new Map(), documentState = 'loading', selected = api.DEFINITIONS[0].id, hideSecrets = true, busy = false, request = 0, controller;
  try { hideSecrets = storage.getItem(api.KEY + '.hide-secrets') !== 'false'; } catch (_) { /* Secrets stay hidden. */ }
  byId('archives-hide-secrets').checked = hideSecrets;
  try {
    const settings = JSON.parse(storage.getItem('cqc-v044-profile') || '{}').settings;
    if (settings?.reducedMotion || settings?.motion === false) doc.documentElement.dataset.reducedMotion = 'true';
  } catch (_) { /* OS reduced-motion preference remains active through CSS. */ }
  const create = (tag, className, text) => {
    const node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const status = (text, error = false) => {
    byId('archives-status').textContent = text;
    byId('archives-status').classList.toggle('error', error);
  };
  const rightLabel = { none: 'À débloquer', claimable: 'Récompense disponible', permanent: 'Acquis · permanent', pending: 'Vérification indisponible' };
  const discoveryLabel = { secret: 'Non révélé', hint: 'Indice disponible', identified: 'Identifié' };
  function stateFor(definition) {
    return api.accessFor(definition, ledgerResult.payload, evidence, {
      hideSecrets, technical: documents.has(definition.id) ? 'ready' : documentState === 'error' ? 'error' : 'missing', mode: 'archives'
    });
  }
  function renderRule(rule) {
    const list = create('ul', 'rule-group');
    if (rule.children) {
      for (const [index, child] of rule.children.entries()) {
        if (index > 0) list.append(create('li', 'rule-join', rule.operator === 'all' ? 'ET' : 'OU'));
        if (child.children) { const wrapper = create('li'); wrapper.append(renderRule(child)); list.append(wrapper); }
        else list.append(ruleLine(child));
      }
    } else list.append(ruleLine(rule));
    return list;
  }
  function ruleLine(rule) {
    const row = create('li', 'rule-item'); row.dataset.state = rule.state;
    row.append(create('span', '', rule.label), create('span', 'rule-count', rule.value === null ? 'Lecture indisponible' : Math.min(rule.value, rule.target) + ' / ' + rule.target));
    return row;
  }
  function activityLink(definition) {
    const link = create('a', '', definition.activityLabel + ' ↗'); link.href = definition.activity;
    link.dataset.archiveAction = 'activity';
    return link;
  }
  function renderDetails() {
    const focusedAction = detail.contains(doc.activeElement) ? doc.activeElement.dataset.archiveAction : null;
    const definition = api.DEFINITIONS.find(item => item.id === selected), state = stateFor(definition);
    detail.classList.remove('revealed');
    detail.replaceChildren();
    detail.append(create('span', 'seal', state.right === 'permanent' ? 'Autorisation conservée' : state.right === 'claimable' ? 'Dossier prêt à récupérer' : 'Accès classifié'));
    const title = create('h2', '', state.visibleName); title.id = 'selected-dossier-title';
    detail.setAttribute('aria-labelledby', title.id);
    detail.append(title, create('p', 'detail-intro', definition.hint));
    const axes = create('dl', 'axes');
    for (const [label, value] of [
      ['Découverte', discoveryLabel[state.discovery]], ['Droit d’accès', rightLabel[state.right]],
      ['Fichier', state.technical === 'ready' ? 'Rapport disponible' : documentState === 'loading' ? 'Chargement en cours' : documentState === 'error' ? 'Chargement à réessayer' : 'Mise à jour nécessaire'],
      ['Contexte', state.compatibility === 'allowed' ? 'Consultable dans ces archives' : 'Indisponible dans ce contexte']
    ]) {
      const pair = create('div'); pair.append(create('dt', '', label), create('dd', '', value)); axes.append(pair);
    }
    detail.append(axes, create('h3', '', state.right === 'permanent' ? 'Conditions d’origine' : 'Conditions d’accès'), renderRule(state.rule));
    const actions = create('div', 'detail-actions');
    if (state.canClaim) {
      const button = create('button', 'primary', busy ? 'Enregistrement…' : 'Récupérer le dossier'); button.type = 'button'; button.id = 'archives-claim';
      button.dataset.archiveAction = 'claim';
      button.disabled = busy || !ledgerResult.reliable;
      button.addEventListener('click', () => recoverDossier(definition)); actions.append(button);
    } else if (state.canSelect) {
      const button = create('button', 'primary', 'Consulter le dossier'); button.type = 'button'; button.id = 'archives-open';
      button.dataset.archiveAction = 'open';
      button.addEventListener('click', () => openDossier(definition)); actions.append(button);
    } else if (state.right === 'permanent' || state.right === 'pending') {
      const button = create('button', '', 'Réessayer la lecture'); button.type = 'button';
      button.dataset.archiveAction = 'retry';
      button.addEventListener('click', refresh); actions.append(button);
    }
    actions.append(activityLink(definition)); detail.append(actions);
    const explanation = state.right === 'permanent'
      ? 'Ce rapport est acquis dans ce profil. Une nouvelle tentative ou la disparition de l’ancien record ne retire pas cette acquisition.'
      : state.right === 'claimable' ? 'La récupération enregistre une attribution permanente dans ce profil avant d’ouvrir le rapport.'
        : state.right === 'pending' ? 'La progression ne peut pas être lue pour le moment. Les récompenses déjà acquises restent conservées.'
          : 'Ce dossier de simulation s’obtient en jouant. Sélectionner sa fiche permet de lire les conditions sans modifier ta progression.';
    detail.append(create('p', 'access-explanation', explanation));
    if (!ledgerResult.reliable) detail.append(create('p', 'notice', 'Le registre local ne peut pas être relu. Les données présentes sont conservées ; aucune nouvelle attribution ne sera écrite tant qu’une copie valide ne peut pas être retrouvée.'));
    // Async file loads and storage events rebuild this panel. Restore the
    // equivalent action rather than dropping keyboard focus to the document.
    if (focusedAction) {
      const equivalent = actions.querySelector('[data-archive-action="' + focusedAction + '"]');
      const target = equivalent && !equivalent.disabled ? equivalent : actions.querySelector('button:not(:disabled),a[href]');
      target?.focus();
    }
  }
  function render() {
    const focusedDossier = doc.activeElement?.dataset?.dossierId;
    grid.replaceChildren();
    let acquired = 0, claimable = 0;
    api.DEFINITIONS.forEach((definition, index) => {
      const state = stateFor(definition);
      acquired += Number(state.right === 'permanent'); claimable += Number(state.canClaim);
      const card = create('button', 'dossier-card'); card.type = 'button';
      card.dataset.dossierId = definition.id; card.dataset.discovery = state.discovery; card.dataset.right = state.right;
      card.setAttribute('aria-pressed', String(selected === definition.id));
      card.setAttribute('aria-label', 'Dossier ' + (index + 1) + ' · ' + state.visibleName + ' · ' + rightLabel[state.right]);
      const mark = create('span', 'folder-mark'); mark.setAttribute('aria-hidden', 'true');
      const copy = create('span');
      copy.append(create('span', 'card-code', 'ARCHIVE / ' + String(index + 1).padStart(2, '0')), create('span', 'card-name', state.visibleName), create('span', 'card-status', rightLabel[state.right]));
      card.append(mark, copy); card.addEventListener('click', () => {
        selected = definition.id;
        for (const item of grid.querySelectorAll('[data-dossier-id]')) item.setAttribute('aria-pressed', String(item.dataset.dossierId === selected));
        renderDetails();
      });
      grid.append(card);
    });
    byId('archives-count').textContent = acquired + ' / ' + api.DEFINITIONS.length + ' dossiers acquis' + (claimable ? ' · ' + claimable + ' à récupérer' : '');
    const warnings = [];
    if (!ledgerResult.reliable) warnings.push('Lecture du registre des récompenses indisponible. Aucune nouvelle attribution ne sera écrite sur cette sauvegarde.');
    else if (ledgerResult.recovered) warnings.push('La copie valide du registre des récompenses a été retrouvée.');
    if (!evidence.sources.chronicles.reliable || !evidence.sources.operations.reliable) warnings.push('Une partie de la progression ne peut pas être lue. Les droits déjà acquis restent valables.');
    if (evidence.sources.chronicles.recovered) warnings.push('La progression des Chroniques utilise sa dernière copie valide.');
    if (documentState === 'error') warnings.push('Les rapports n’ont pas pu être chargés. Actualise la lecture ; leur attribution reste conservée.');
    byId('archives-warning').hidden = !warnings.length; byId('archives-warning').textContent = warnings.join(' ');
    renderDetails();
    if (focusedDossier) grid.querySelector('[data-dossier-id="' + focusedDossier + '"]')?.focus();
  }
  async function loadDocuments() {
    const token = ++request;
    controller?.abort(); controller = typeof host.AbortController === 'function' ? new host.AbortController() : null;
    documentState = 'loading';
    try {
      const response = await host.fetch('../data/cqc-p71-access-dossiers.json', { credentials: 'same-origin', cache: 'no-cache', signal: controller?.signal });
      if (!response.ok) throw Error('Chargement des rapports indisponible.');
      const next = api.validateDocuments(await response.json());
      if (token !== request) return;
      documents = next; documentState = 'ready'; render();
    } catch (error) {
      if (token !== request || error?.name === 'AbortError') return;
      documents = new Map(); documentState = 'error'; render();
    }
  }
  function refresh() {
    ledgerResult = api.loadLedger(storage); evidence = api.readEvidence(storage); render();
    status('Progression locale relue.'); loadDocuments();
  }
  async function recoverDossier(definition) {
    if (busy) return;
    busy = true; renderDetails(); status('Enregistrement de la récompense…');
    const write = () => {
      // A second tab may have claimed another report. Web Locks serialize the
      // read/merge/write operation when available; the saved bytes are checked.
      const latest = api.loadLedger(storage);
      if (!latest.reliable) throw Error('Le registre des récompenses est illisible. Aucune attribution n’a été remplacée.');
      const currentEvidence = api.readEvidence(storage);
      const result = api.claim(latest.payload, definition, currentEvidence);
      const saved = result.changed ? api.saveLedger(storage, result.ledger, latest.revision) : { payload: latest.payload, revision: latest.revision };
      ledgerResult = { ...latest, ...saved, reliable: true, recovered: false, errors: [] }; evidence = currentEvidence;
      return result.changed;
    };
    try {
      const changed = host.navigator?.locks?.request ? await host.navigator.locks.request('cqc-p71-local-rewards', write) : write();
      busy = false; render();
      status(changed ? 'Dossier acquis et sauvegardé. Tu peux le consulter.' : 'Ce dossier était déjà acquis. Son attribution est conservée.');
      if (changed) detail.classList.add('revealed');
      byId('archives-open')?.focus();
    } catch (error) {
      busy = false; renderDetails();
      status('Enregistrement non confirmé. Le dossier n’a pas été ouvert. Réessayer après avoir vérifié la sauvegarde locale.', true);
    }
  }
  function openDossier(definition) {
    const state = stateFor(definition), item = documents.get(definition.id);
    if (!state.canSelect || !item) { renderDetails(); return; }
    byId('reader-origin').textContent = item.continuity;
    byId('reader-title').textContent = item.title;
    const body = byId('reader-body'); body.replaceChildren();
    for (const text of item.paragraphs) body.append(create('p', '', text));
    if (!reader.open) reader.showModal();
  }
  byId('archives-hide-secrets').addEventListener('change', event => {
    hideSecrets = event.target.checked;
    try { storage.setItem(api.KEY + '.hide-secrets', String(hideSecrets)); } catch (_) { status('Ce réglage restera actif pour cette visite.'); }
    render();
  });
  byId('archives-refresh').addEventListener('click', refresh);
  detail.addEventListener('animationend', () => detail.classList.remove('revealed'));
  host.addEventListener('storage', event => {
    if (!event.key || event.key.startsWith(api.KEY) || event.key.startsWith(api.CHRONICLES_KEY) || event.key === api.OPERATIONS_KEY) {
      ledgerResult = api.loadLedger(storage); evidence = api.readEvidence(storage); render();
    }
  });
  doc.addEventListener('click', event => {
    const anchor = event.target?.closest?.('a[href]');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || host.parent === host || host.location.origin === 'null') return;
    const target = new URL(anchor.href, host.location.href), command = new URL('../index.html', host.location.href);
    if (target.origin !== command.origin || target.pathname !== command.pathname) return;
    const module = target.searchParams.get('module');
    if (module && !['chronicles56', 'survival48', 'relay48'].includes(module)) return;
    event.preventDefault(); host.parent.postMessage(module ? { type: 'cqc-open-module', module } : { type: 'cqc-admin-close' }, host.location.origin);
  });
  // The gamepad uses the same visible focus targets as keyboard and touch.
  let padBefore = new Set(), lastPadStep = 0;
  function pollPad(time) {
    let pad;
    try { pad = host.navigator?.getGamepads?.()?.find?.(item => item?.connected); } catch (_) { /* An embedding policy may disallow gamepads. */ }
    if (pad && time - lastPadStep >= 140) {
      const down = new Set(); pad.buttons.forEach((button, index) => { if (button.pressed) down.add(index); });
      const newly = index => down.has(index) && !padBefore.has(index);
      if (newly(1) && reader.open) reader.close();
      const scope = reader.open ? reader : doc.getElementById('classified-archives');
      const controls = [...scope.querySelectorAll('button:not(:disabled),a[href],input')].filter(item => !item.closest('[hidden]') && item.getClientRects().length);
      const delta = newly(13) || newly(15) ? 1 : newly(12) || newly(14) ? -1 : 0;
      if (delta && controls.length) {
        const index = controls.indexOf(doc.activeElement), next = index < 0 ? (delta > 0 ? 0 : controls.length - 1) : (index + delta + controls.length) % controls.length;
        controls[next].focus(); controls[next].scrollIntoView({ block: 'nearest' });
      }
      if (newly(0) && controls.includes(doc.activeElement)) doc.activeElement.click();
      padBefore = down; lastPadStep = time;
    } else if (!pad) padBefore = new Set();
    host.requestAnimationFrame(pollPad);
  }
  render(); loadDocuments(); host.requestAnimationFrame(pollPad);
})(globalThis);
