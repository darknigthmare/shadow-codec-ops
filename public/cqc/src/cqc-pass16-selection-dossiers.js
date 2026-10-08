/* Selection dossiers are presentation metadata. Runtime identities and combat remain unchanged. */
(function (root) {
  'use strict';
  const dossiers = Object.freeze([
    { id: 'TOUS', title: 'TOUS LES DOSSIERS', short: 'TOUS', episode: '' },
    { id: 'dossier-snake-eater', title: 'OPÉRATION SNAKE EATER', short: 'SNAKE EATER', episode: 'MGS3 · DELTA' },
    { id: 'dossier-san-hieronymo', title: 'SAN HIERONYMO', short: 'SAN HIERONYMO', episode: 'PORTABLE OPS' },
    { id: 'dossier-peace-walker', title: 'PEACE WALKER', short: 'PEACE WALKER', episode: 'COSTA RICA · NICARAGUA' },
    { id: 'dossier-camp-omega', title: 'CAMP OMEGA', short: 'CAMP OMEGA', episode: 'GROUND ZEROES' },
    { id: 'dossier-phantom-pain', title: 'THE PHANTOM PAIN', short: 'PHANTOM PAIN', episode: 'AFGHANISTAN · AFRIQUE' },
    { id: 'dossier-outer-heaven', title: 'OUTER HEAVEN', short: 'OUTER HEAVEN', episode: 'METAL GEAR' },
    { id: 'dossier-zanzibar', title: 'ZANZIBAR LAND', short: 'ZANZIBAR LAND', episode: 'METAL GEAR 2' },
    { id: 'dossier-shadow-moses', title: 'SHADOW MOSES', short: 'SHADOW MOSES', episode: 'MGS1 · THE TWIN SNAKES' },
    { id: 'dossier-big-shell', title: 'BIG SHELL', short: 'BIG SHELL', episode: 'SONS OF LIBERTY' },
    { id: 'dossier-guns-patriots', title: 'GUNS OF THE PATRIOTS', short: 'GUNS OF THE PATRIOTS', episode: 'MGS4' },
    { id: 'dossier-revengeance', title: 'REVENGEANCE', short: 'REVENGEANCE', episode: 'RAIDEN · DESPERADO' },
    { id: 'dossier-galuade', title: 'GALUADE', short: 'GALUADE', episode: 'GHOST BABEL' },
    { id: 'dossier-acid', title: 'DOSSIER AC!D', short: 'AC!D', episode: 'METAL GEAR AC!D' },
    { id: 'dossier-acid2', title: 'SAINTLOGIC', short: 'SAINTLOGIC', episode: 'METAL GEAR AC!D 2' },
    { id: 'dossier-revenge', title: 'OPÉRATION 747', short: 'OPÉRATION 747', episode: 'SNAKE’S REVENGE' },
    { id: 'dossier-survive', title: 'DITE', short: 'DITE', episode: 'SURVIVE' },
    { id: 'dossier-special', title: 'MISSIONS SPÉCIALES', short: 'MISSIONS SPÉCIALES', episode: 'VR · MOBILE · ONLINE' },
    { id: 'ORIGINAL', title: 'STATION MÉRIDIEN', short: 'MÉRIDIEN', episode: 'PARALLAXE' }
  ]);
  const byId = Object.freeze(Object.fromEntries(dossiers.map(d => [d.id, Object.freeze(d)])));
  const eras = Object.freeze({ mgs3: 'dossier-snake-eater', mpo: 'dossier-san-hieronymo', pw: 'dossier-peace-walker', mgsv: 'dossier-phantom-pain', msx: 'dossier-outer-heaven', mg1: 'dossier-outer-heaven', mg2: 'dossier-zanzibar', mgs1: 'dossier-shadow-moses', mgs2: 'dossier-big-shell', mgs4: 'dossier-guns-patriots', mgr: 'dossier-revengeance', ghost: 'dossier-galuade', acid: 'dossier-acid', acid2: 'dossier-acid2', revenge: 'dossier-revenge', original: 'ORIGINAL' });
  function idFor(f = {}) {
    if (f.source === 'ORIGINAL' || f.uid === 'oc__parallaxe') return 'ORIGINAL';
    const ep = String(f.ep || f.subtitle || '').toUpperCase().replace(/[’‘]/g, "'");
    if (/SURVIVE/.test(ep)) return 'dossier-survive';
    if (/SNAKE'S REVENGE/.test(ep)) return 'dossier-revenge';
    if (/GROUND ZEROES/.test(ep)) return 'dossier-camp-omega';
    if (/AC!D 2/.test(ep)) return 'dossier-acid2';
    if (/AC!D/.test(ep)) return 'dossier-acid';
    if (/REVENGEANCE|\bMGR\b/.test(ep)) return 'dossier-revengeance';
    if (/GHOST/.test(ep)) return 'dossier-galuade';
    if (/PORTABLE OPS|\bMPO\b/.test(ep)) return 'dossier-san-hieronymo';
    if (/PEACE WALKER|\bPW\b/.test(ep)) return 'dossier-peace-walker';
    if (/PHANTOM PAIN|\bTPP\b|\bMGSV\b/.test(ep)) return 'dossier-phantom-pain';
    if (/MGS3|MGS DELTA|SNAKE EATER|THE JOY|GRU \/ THUNDERBOLT/.test(ep)) return 'dossier-snake-eater';
    if (/MGS4|MGS TOUCH/.test(ep)) return 'dossier-guns-patriots';
    if (/MGS2|SONS OF LIBERTY/.test(ep)) return 'dossier-big-shell';
    if (/MGS1|THE TWIN SNAKES|^VR MISSIONS$/.test(ep)) return 'dossier-shadow-moses';
    if (/METAL GEAR 2|\bMG2\b/.test(ep)) return 'dossier-zanzibar';
    if (/^METAL GEAR(?: \/|$| NES$)|^MG1(?: \/|$)/.test(ep)) return 'dossier-outer-heaven';
    return eras[f.era] || 'dossier-special';
  }
  function dossier(f) { return byId[idFor(f)]; }
  function label(f) {
    const d = dossier(f), ep = String(f.ep || f.subtitle || '').toUpperCase();
    const unit = ep.match(/(?:\/\s*)(FOXHOUND|COBRA UNIT|BLACK CHAMBER|DEAD CELL|RAT PATROL TEAM 01|DESPERADO)(?:\s|$)/);
    return d.title + (unit ? ' · ' + unit[1] : '');
  }
  function matches(f, key) { return key === 'TOUS' || idFor(f) === key; }
  root.CQC_SELECTION_DOSSIERS = Object.freeze({ dossiers, byId, idFor, dossier, label, matches });
})(typeof window === 'undefined' ? globalThis : window);
