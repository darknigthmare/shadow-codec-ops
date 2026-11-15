/* Existing original-character dossier, separate from the 354 official chronicle routes. */
(function (root) {
  'use strict';
  const originals = root.CQC_ORIGINAL_FIGHTERS?.clone?.() || [];
  const fighter = originals.find(item => item.uid === 'oc__parallaxe' && item.canonical === false);
  if (!fighter || root.CQC_PASS17_CODEX_ORIGINALS) return;
  const copy = value => JSON.parse(JSON.stringify(value));
  const originalTitleId = 'cqc_original_characters';

  function applyRoster(fighters, audit) {
    if (!Array.isArray(fighters) || !audit?.titles) return false;
    const added = !fighters.some(item => item.uid === fighter.uid);
    if (added) fighters.push(copy(fighter));
    if (!audit.titles.some(item => item.id === originalTitleId)) {
      audit.titles.push({ id: originalTitleId, name: fighter.ep, year: 'Original', platform: 'CQC',
        module: 'original', catalogCompletion: 100,
        cast: [{ name: fighter.name, fighterUid: fighter.uid, covered: true }],
        bosses: [], machines: [], roster: [fighter.uid], fighterCount: 1,
        newFighters: [], newCount: 0, principalCovered: 1, principalTotal: 1,
        status: 'PERSONNAGE ORIGINAL', note: fighter.combat.basis });
    }
    if (added) audit.fighterCount = fighters.length;
    audit.titleCount = audit.titles.length;
    return true;
  }

  function registerDossier(data) {
    if (!data) return false;
    // Official story arrays, save-selected UIDs and the 354 routes remain untouched.
    const stored = Array.isArray(data.originalFighters) ? data.originalFighters : [];
    if (!stored.some(item => item.uid === fighter.uid)) stored.push(copy(fighter));
    data.originalFighters = stored;
    data.counts.originalDossiers = stored.length;
    return true;
  }

  function mountChronicles(data, dialog) {
    if (!registerDossier(data) || typeof dialog !== 'function') return false;
    const gallery = document.getElementById('galleryBtn');
    if (!gallery?.parentElement || document.getElementById('originalCodexBtn')) return false;
    const button = document.createElement('button');
    button.id = 'originalCodexBtn';
    button.dataset.uid = fighter.uid;
    button.textContent = fighter.name;
    button.setAttribute('aria-label', fighter.ep + ' · dossier de ' + fighter.name);
    button.onclick = () => dialog(fighter.name, box => {
      const group = document.createElement('p');
      group.textContent = fighter.ep + ' · PERSONNAGE ORIGINAL';
      const art = document.createElement('canvas');
      art.width = 280; art.height = 400;
      art.style.cssText = 'display:block;max-width:100%;height:auto;margin:0 auto 16px';
      const basis = document.createElement('p'); basis.textContent = fighter.combat.basis;
      const role = document.createElement('p'); role.textContent = fighter.combat.role;
      const scope = document.createElement('p'); scope.textContent = fighter.combat.scope;
      const heading = document.createElement('h3'); heading.textContent = 'Techniques';
      const techniques = document.createElement('ul');
      for (const move of Object.values(fighter.combat.moves)) {
        const line = document.createElement('li');
        line.textContent = move.name + ' — ' + move.counterplay;
        techniques.append(line);
      }
      box.append(group, art, basis, role, scope, heading, techniques);
      root.CQC_PASS17_CODEX_ART.drawPortrait(art, fighter);
    }, [{ text: 'Fermer', primary: true }]);
    gallery.insertAdjacentElement('afterend', button);
    return true;
  }

  root.CQC_PASS17_CODEX_ORIGINALS = { applyRoster, registerDossier, mountChronicles,
    diagnostics: () => ({ uid: fighter.uid, titleId: originalTitleId,
      source: 'CQC_ORIGINAL_FIGHTERS.clone', canonical: false, addsOfficialStory: false }) };
  if (root.CQC55_DATA) registerDossier(root.CQC55_DATA);
})(globalThis);
