/* Three incarnation-specific portraits. Dossiers do not register playable bodies. */
(function (root) {
  'use strict';
  if (root.CQC_PASS41_HIDEO_CODEX) return;
  const document = root.document;
  const command = document?.getElementById('command');
  const anchor = document?.getElementById('overviewBtn');
  if (!command || !anchor || !root.__CQC053Roster) return;
  const base = new URL('../', document.currentScript?.src || document.baseURI);
  const entries = Object.freeze([
    Object.freeze({ uid: 'pass41__hideo_pw', label: 'PEACE WALKER', operation: 'COSTA RICA · 1974', description: 'Hideo rejoint le personnel de Mother Base après son extraction de la base du cratère.', file: 'assets/codex-pass41/pass41__hideo_pw/portrait-v1.png' }),
    Object.freeze({ uid: 'pass41__hideo_gz', label: 'GROUND ZEROES', operation: 'CAMP OMEGA · EXTRACTION', description: 'L’agent de renseignement attend son extraction au cours de la mission de secours de Camp Omega.', file: 'assets/codex-pass41/pass41__hideo_gz/portrait-v1.png' }),
    Object.freeze({ uid: 'pass41__hideo_tpp', label: 'THE PHANTOM PAIN', operation: 'AFGHANISTAN · 1984', description: 'Hideo peut rejoindre l’équipe de renseignement de Mother Base après son extraction.', file: 'assets/codex-pass41/pass41__hideo_tpp/portrait-v1.png' })
  ]);
  const create = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const style = create('style');
  style.textContent = '.p41-hideo-dialog{box-sizing:border-box;width:min(900px,calc(100vw - 28px));max-height:calc(100dvh - 28px);overflow:auto;padding:24px;border:1px solid var(--line,#3d5043);background:var(--panel,#0d1713);color:var(--ink,#edf0df);font:inherit}.p41-hideo-dialog::backdrop{background:#030604df}.p41-hideo-head{display:flex;align-items:center;justify-content:space-between;gap:18px}.p41-hideo-head h2{margin:0;color:var(--gold,#d8c37a);font-size:24px;letter-spacing:.08em}.p41-hideo-head button,.p41-hideo-tabs button{background:var(--bg,#050907);border:1px solid var(--line,#3d5043);padding:10px 12px;min-height:44px;color:inherit;font:inherit}.p41-hideo-dialog button:focus-visible{outline:2px solid var(--cyan,#69cfc8);outline-offset:3px}.p41-hideo-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 16px}.p41-hideo-tabs button[aria-pressed="true"]{color:var(--gold,#d8c37a);border-color:var(--gold,#d8c37a)}.p41-hideo-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(220px,.65fr);gap:26px;align-items:center}.p41-hideo-art{display:grid;place-items:center;min-height:220px;aspect-ratio:1;background:radial-gradient(ellipse at center,#25382b 0%,#09120e 75%);border:1px solid var(--line,#3d5043);overflow:hidden}.p41-hideo-art img{display:block;width:100%;height:100%;max-height:calc(100dvh - 220px);object-fit:contain}.p41-hideo-art img[hidden]{display:none}.p41-hideo-art [role="status"]{padding:22px;color:var(--muted,#94a394);text-align:center}.p41-hideo-copy h3{font-size:24px;line-height:1.2;margin:12px 0}.p41-hideo-copy p{color:var(--muted,#94a394);line-height:1.7}.p41-hideo-operation{color:var(--gold,#d8c37a);font:700 11px ui-monospace,monospace;letter-spacing:.08em}.side-foot .p41-hideo-open{grid-column:1/-1;width:100%;min-height:44px;margin-top:8px;background:var(--bg,#050907);border:1px solid var(--line,#3d5043);padding:12px;color:var(--gold,#d8c37a);font:inherit;cursor:pointer}@media(max-width:600px){.p41-hideo-dialog{padding:16px}.p41-hideo-layout{grid-template-columns:minmax(0,1fr);gap:16px}.p41-hideo-art{width:min(100%,340px);justify-self:center}.p41-hideo-tabs button{flex:1;min-width:145px}.p41-hideo-copy h3{font-size:21px}.p41-hideo-art img{max-height:none}}';
  document.head.appendChild(style);

  const openButton = create('button', 'DOSSIER HIDEO', 'p41-hideo-open');
  openButton.type = 'button';
  openButton.id = 'p41-hideo-open';
  openButton.setAttribute('aria-haspopup', 'dialog');
  anchor.parentElement.appendChild(openButton);
  const dialog = create('dialog', undefined, 'p41-hideo-dialog');
  dialog.id = 'p41-hideo-dialog';
  dialog.setAttribute('aria-labelledby', 'p41-hideo-title');
  const header = create('header', undefined, 'p41-hideo-head');
  const title = create('h2', 'HIDEO');
  title.id = 'p41-hideo-title';
  const closeButton = create('button', 'FERMER');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Fermer le dossier Hideo');
  header.append(title, closeButton);
  const tabs = create('nav', undefined, 'p41-hideo-tabs');
  tabs.setAttribute('aria-label', 'Incarnation de Hideo');
  const layout = create('div', undefined, 'p41-hideo-layout');
  const art = create('div', undefined, 'p41-hideo-art');
  const image = create('img');
  image.hidden = true;
  image.decoding = 'async';
  image.width = image.height = 1024;
  const status = create('span', 'OUVERTURE DU DOSSIER…');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  art.append(image, status);
  const copy = create('div', undefined, 'p41-hideo-copy');
  const operation = create('small', undefined, 'p41-hideo-operation');
  const heading = create('h3');
  const description = create('p');
  copy.append(operation, heading, description);
  layout.append(art, copy);
  dialog.append(header, tabs, layout);
  document.body.appendChild(dialog);
  const cached = new Map();
  let ticket = 0;
  let selected = entries[0];
  let lastFocus = null;

  function prepare(entry) {
    if (cached.has(entry.uid)) return cached.get(entry.uid);
    const value = { state: 'loading', image: new root.Image() };
    value.image.decoding = 'async';
    value.ready = new Promise(resolve => {
      let settled = false;
      const finish = ok => {
        if (settled) return;
        settled = true;
        value.state = ok && value.image.naturalWidth > 0 ? 'ready' : 'failed';
        resolve(value);
      };
      value.image.onerror = () => finish(false);
      value.image.onload = () => {
        if (typeof value.image.decode !== 'function') return finish(true);
        Promise.resolve().then(() => value.image.decode()).then(() => finish(true), () => finish(false));
      };
      value.image.src = new URL(entry.file, base).href;
    });
    cached.set(entry.uid, value);
    return value;
  }

  async function select(uid) {
    const entry = entries.find(item => item.uid === uid);
    if (!entry) return false;
    selected = entry;
    const current = ++ticket;
    dialog.dataset.hideoUid = entry.uid;
    image.hidden = true;
    image.removeAttribute('src');
    image.removeAttribute('data-hideo-uid');
    status.hidden = false;
    status.textContent = 'OUVERTURE DU DOSSIER…';
    art.setAttribute('aria-busy', 'true');
    for (const button of tabs.children) button.setAttribute('aria-pressed', String(button.dataset.hideoUid === entry.uid));
    operation.textContent = entry.operation;
    heading.textContent = entry.label;
    description.textContent = entry.description;
    image.alt = 'Portrait de Hideo — ' + entry.label;
    const value = await prepare(entry).ready;
    if (current !== ticket || !dialog.open) return false;
    if (value.state !== 'ready') {
      status.textContent = 'TRANSMISSION DU PORTRAIT INDISPONIBLE';
      art.setAttribute('aria-busy', 'false');
      return false;
    }
    image.src = value.image.src;
    try {
      if (typeof image.decode === 'function') await image.decode();
    } catch (_) {
      if (current === ticket && dialog.open) {
        status.textContent = 'TRANSMISSION DU PORTRAIT INDISPONIBLE';
        art.setAttribute('aria-busy', 'false');
      }
      return false;
    }
    if (current !== ticket || !dialog.open) return false;
    image.dataset.hideoUid = entry.uid;
    image.hidden = false;
    status.hidden = true;
    art.setAttribute('aria-busy', 'false');
    return true;
  }
  for (const entry of entries) {
    const button = create('button', entry.label);
    button.type = 'button';
    button.dataset.hideoUid = entry.uid;
    button.setAttribute('aria-pressed', 'false');
    button.onclick = () => { select(entry.uid); };
    tabs.appendChild(button);
  }
  function open(uid = selected.uid) {
    if (!entries.some(entry => entry.uid === uid)) return false;
    lastFocus = document.activeElement;
    if (!dialog.open) dialog.showModal();
    select(uid);
    return true;
  }
  function close() {
    if (dialog.open) dialog.close();
  }
  dialog.addEventListener('close', () => {
    ticket++;
    image.hidden = true;
    image.removeAttribute('src');
    image.removeAttribute('data-hideo-uid');
    if (lastFocus?.isConnected && typeof lastFocus.focus === 'function') lastFocus.focus();
  });
  openButton.onclick = () => { open(); };
  closeButton.onclick = close;
  root.CQC_PASS41_HIDEO_CODEX = Object.freeze({
    version: 'pass41-hideo-codex/1', entries, open, close,
    bodyAdmission: 'held-no-complete-body-reference', playableRegistration: false
  });
})(globalThis);
