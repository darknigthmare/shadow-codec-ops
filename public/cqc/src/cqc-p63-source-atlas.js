/* Fixed sources for the CQC visual dossiers. No stage, fighter or combat admission. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CQC_P63_SOURCE_ATLAS = api;
  if (root.document?.getElementById('source-atlas')) api.mount(root);
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const DATA_URL = '../data/cqc-p63-source-atlas.json';
  const EPISODES = Object.freeze({survive:'Survive', acid:'AC!D', acid2:'AC!D 2', mgr:'Revengeance'});
  const KINDS = Object.freeze({stage:'Décors', character:'Personnages', costume:'Costumes', machine:'Machines et créatures', projectile:'Projectiles', vfx:'Effets', prop:'Accessoires'});
  const FRONTS = Object.freeze({survive:{module:'episodes52', label:'Archives de mission'}, acid:{module:'acid', label:'Dossiers AC!D'}, acid2:{module:'acid', label:'Dossiers AC!D'}, mgr:{module:'mgr', label:'Dossiers Revengeance'}});
  const BIBLE_URL = 'https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-bible/README.md';
  const plain = value => typeof value === 'string' ? value.trim() : '';
  const fold = value => plain(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
  const idPattern = /^[a-z0-9][a-z0-9_-]{0,119}$/;
  const values = (input, limit = 20) => Array.isArray(input) ? input.filter(value => typeof value === 'string' && value.trim()).slice(0, limit).map(value => value.trim()) : [];

  function episodeKey(value) {
    if (Object.hasOwn(EPISODES, value)) return value;
    const name = fold(value).replace(/!/g, 'i');
    if (/survive/.test(name)) return 'survive';
    if (/acid[\s_-]*2/.test(name)) return 'acid2';
    if (/acid/.test(name)) return 'acid';
    if (/rising|revengeance|^mgr$/.test(name)) return 'mgr';
    return null;
  }
  function assetPath(value) {
    let path = plain(value).replace(/^public\/cqc\//, '').replace(/^\.\.\//, '');
    if (!/^assets\/[a-zA-Z0-9_./-]+\.png$/.test(path) || path.split('/').some(part => !part || part === '.' || part === '..')) return null;
    return '../' + path;
  }
  function referenceURL(value) {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null;
    } catch (_) { return null; }
  }
  function normalizeCatalog(catalog) {
    if (!catalog || !Array.isArray(catalog.assets)) throw new Error('Le catalogue de sources est incomplet.');
    const seen = new Set();
    return catalog.assets.filter(asset => asset?.selected !== false && asset?.sourceGenerated !== false).map(asset => {
      const id = plain(asset.id), label = plain(asset.label), episode = episodeKey(asset.episodeKey || asset.game || asset.episode);
      const path = assetPath(asset.path), kind = plain(asset.kind);
      if (!idPattern.test(id) || seen.has(id) || !label || !episode || !path || !Object.hasOwn(KINDS, kind)) throw new Error('Un dossier du catalogue possède une identité ou une image invalide.');
      if (asset.combatReady === true) throw new Error('Le catalogue de sources fixes contient une admission au combat inattendue.');
      seen.add(id);
      const refs = values(asset.referenceURLs || asset.sourceURLs).map(referenceURL).filter(Boolean);
      return Object.freeze({id,label,episode,edition:plain(asset.episode) || EPISODES[episode],kind,path,
        width:Number.isSafeInteger(asset.width) && asset.width > 0 ? asset.width : null,
        height:Number.isSafeInteger(asset.height) && asset.height > 0 ? asset.height : null,
        workIds:values(asset.workIds),referenceURLs:Object.freeze([...new Set(refs)]),
        scope:plain(asset.scope || asset.description),qaNotes:Object.freeze(values(asset.qaNotes || asset.notes)),
        bibleURL:referenceURL(asset.bibleURL) || BIBLE_URL,
        fidelityStatus:plain(asset.fidelityStatus),sourceGenerated:true,atlasIntegrated:true,combatReady:false});
    });
  }
  function readState(search) {
    const params = new URLSearchParams(search || '');
    return {episode:Object.hasOwn(EPISODES, params.get('episode')) ? params.get('episode') : 'all',
      kind:Object.hasOwn(KINDS, params.get('kind')) ? params.get('kind') : 'all',
      query:plain(params.get('q')).slice(0,140), asset:idPattern.test(params.get('asset') || '') ? params.get('asset') : null};
  }
  function filterAssets(assets, state) {
    const needle = fold(state.query);
    return assets.filter(asset => (state.episode === 'all' || asset.episode === state.episode) &&
      (state.kind === 'all' || asset.kind === state.kind) && (!needle ||
        fold([asset.label, asset.edition, asset.scope, ...asset.workIds].join(' ')).includes(needle)));
  }
  function selectedAsset(visible, requested) { return visible.find(asset => asset.id === requested) || visible[0] || null; }
  function stateURL(state, current) {
    const url = new URL(current);
    for (const [key,value] of Object.entries({episode:state.episode,kind:state.kind,q:state.query,asset:state.asset})) {
      if (!value || value === 'all') url.searchParams.delete(key); else url.searchParams.set(key,value);
    }
    return url.href;
  }
  function frontURL(episode) { return '../index.html?module=' + FRONTS[episode].module; }

  function mount(host) {
    const doc = host.document, byID = id => doc.getElementById(id);
    const grid = byID('atlas-grid'), detail = byID('atlas-detail'), status = byID('atlas-status');
    if (!grid || !detail || !status) return null;
    const episodeSelect = byID('atlas-episode'), kindSelect = byID('atlas-kind'), search = byID('atlas-search');
    const form = byID('atlas-filters'), retry = byID('atlas-retry'), empty = byID('atlas-empty');
    let assets = [], state = readState(host.location.search), request = 0, controller = null;
    const create = (tag, className, text) => {
      const node = doc.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    };
    const link = (href, text, external = false) => {
      const node = create('a', '', text); node.href = href;
      if (external) { node.target = '_blank'; node.rel = 'noopener noreferrer'; }
      return node;
    };
    function updateURL() {
      try { host.history.replaceState(null, '', stateURL(state, host.location.href)); } catch (_) { /* File previews can still filter. */ }
    }
    function imageFrame(asset, className, lazy) {
      const frame = create('div', className), image = create('img');
      image.alt = asset.label; image.decoding = 'async'; image.loading = lazy ? 'lazy' : 'eager';
      if (asset.width && asset.height) { image.width = asset.width; image.height = asset.height; }
      const progress = create('span', 'image-loading', 'Chargement de l’image…');
      image.addEventListener('load', () => { image.classList.add('loaded'); progress.remove(); });
      image.addEventListener('error', () => {
        progress.remove(); image.hidden = true;
        frame.append(create('span', 'image-error', 'Cette image n’a pas pu être chargée. Réessayer le chargement du catalogue.'));
        if (frame.isConnected !== false) retry.hidden = false;
      }, {once:true});
      frame.append(image, progress); image.src = asset.path; return frame;
    }
    function showDetails(asset) {
      detail.replaceChildren(); detail.hidden = !asset;
      if (!asset) return;
      detail.append(imageFrame(asset, 'detail-image', false));
      const body = create('div', 'detail-body');
      body.append(create('p', 'detail-eyebrow', EPISODES[asset.episode] + ' / ' + KINDS[asset.kind]),create('h2', '', asset.label),create('span', 'classification', 'Source fixe · atlas'));
      if (asset.scope) body.append(create('p', 'scope', asset.scope));
      if (asset.qaNotes.length) {
        body.append(create('h3', '', 'Repères et adaptation'));
        const notes = create('ul'); for (const text of asset.qaNotes) notes.append(create('li', '', text)); body.append(notes);
      }
      const actions = create('div', 'detail-links');
      actions.append(link(asset.path, 'Ouvrir l’image ↗', true),link(asset.bibleURL,'Fiche et bible ↗',true));
      body.append(actions);
      body.append(create('p', 'format', (asset.width && asset.height ? asset.width + ' × ' + asset.height + ' px · ' : '') + 'PNG individuel'));
      if (asset.referenceURLs.length) {
        body.append(create('h3', '', 'Références'));
        const refs = create('ul', 'reference-links');
        asset.referenceURLs.forEach((href,index) => { const item = create('li'); item.append(link(href,(index+1) + '. ' + new URL(href).hostname + ' ↗',true)); refs.append(item); });
        body.append(refs);
      }
      body.append(create('h3', '', 'Continuer dans CQC'));
      const front = FRONTS[asset.episode];
      body.append(link(frontURL(asset.episode),front.label));
      body.append(create('p', '', 'Retrouver les machines, missions et dossiers déjà disponibles dans ce front.'));
      detail.append(body);
    }
    function render() {
      const visible = filterAssets(assets,state), selected = selectedAsset(visible,state.asset);
      state.asset = selected?.id || null; grid.replaceChildren(); empty.hidden = visible.length > 0;
      status.classList.remove('error'); status.textContent = visible.length + ' / ' + assets.length + ' sources · ' + (state.episode === 'all' ? 'toutes les opérations' : EPISODES[state.episode]);
      for (const asset of visible) {
        const card = create('button', 'asset-card'); card.type = 'button'; card.dataset.assetId = asset.id;
        card.setAttribute('aria-pressed',String(asset.id === state.asset)); card.setAttribute('aria-label','Consulter ' + asset.label);
        card.append(imageFrame(asset,'card-image',true));
        const info = create('div','card-info'); info.append(create('span','meta',EPISODES[asset.episode] + ' / ' + KINDS[asset.kind]),create('strong','',asset.label),create('span','caption','Image fixe · dossier visuel')); card.append(info);
        card.addEventListener('click',() => {
          state.asset = asset.id;
          for (const other of grid.querySelectorAll('[data-asset-id]')) other.setAttribute('aria-pressed',String(other.dataset.assetId === asset.id));
          showDetails(asset); updateURL();
          if (host.matchMedia?.('(max-width: 950px)').matches) detail.scrollIntoView?.({block:'start',behavior:'auto'});
        }); grid.append(card);
      }
      showDetails(selected); updateURL();
    }
    function readControls() { state.episode = episodeSelect.value; state.kind = kindSelect.value; state.query = search.value.slice(0,140); render(); }
    function applyControls() { episodeSelect.value = state.episode; kindSelect.value = state.kind; search.value = state.query; }
    async function load() {
      const token = ++request; controller?.abort(); controller = typeof host.AbortController === 'function' ? new host.AbortController() : null;
      status.textContent = 'Chargement des dossiers…'; status.classList.remove('error'); retry.hidden = true;
      try {
        const response = await host.fetch(DATA_URL,{credentials:'same-origin',signal:controller?.signal});
        if (!response.ok) throw new Error('Le catalogue est temporairement indisponible.');
        const next = normalizeCatalog(await response.json());
        if (token !== request) return;
        assets = next; render();
      } catch (error) {
        if (token !== request || error?.name === 'AbortError') return;
        assets = []; grid.replaceChildren(); detail.hidden = true; empty.hidden = true;
        status.classList.add('error'); status.textContent = error instanceof Error ? error.message : 'Le catalogue n’a pas pu être chargé.';
        retry.hidden = false;
      }
    }
    for (const [value,text] of Object.entries(KINDS)) { const option = create('option','',text); option.value = value; kindSelect.append(option); }
    episodeSelect.addEventListener('change',readControls); kindSelect.addEventListener('change',readControls); search.addEventListener('input',readControls);
    form.addEventListener('submit',event => event.preventDefault());
    form.addEventListener('reset',event => { event.preventDefault(); state = readState(''); applyControls(); render(); });
    retry.addEventListener('click',load);
    doc.addEventListener('click',event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || host.parent === host || host.location.origin === 'null') return;
      const anchor = event.target?.closest?.('a[href]');
      if (!anchor || anchor.target === '_blank') return;
      try {
        const target = new URL(anchor.href,host.location.href), command = new URL('../index.html',host.location.href);
        if (target.origin !== command.origin || target.pathname !== command.pathname) return;
        const module = target.searchParams.get('module');
        if (module && !['chronicles56','acid','mgr','episodes52'].includes(module)) return;
        event.preventDefault();
        host.parent.postMessage(module ? {type:'cqc-open-module',module} : {type:'cqc-admin-close'},host.location.origin);
      } catch (_) { /* Standalone navigation remains available. */ }
    });
    host.addEventListener('popstate',() => { state = readState(host.location.search); applyControls(); render(); });
    applyControls(); load();
    return Object.freeze({reload:load,state:() => ({...state}),counts:() => ({total:assets.length,visible:filterAssets(assets,state).length})});
  }
  return Object.freeze({version:'cqc-source-atlas/1',EPISODES,KINDS,episodeKey,assetPath,referenceURL,normalizeCatalog,readState,filterAssets,selectedAsset,stateURL,frontURL,mount});
});
