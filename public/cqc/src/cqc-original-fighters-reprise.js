/* Original CQC fighters are opt-in. They never change the 354-profile archive. */
(function (root) {
  'use strict';
  const uid = 'oc__parallaxe';
  const move = (slot, name, kind, startup, active, recovery, damage, reach, extra = {}) => ({
    id: uid + '::' + slot, slot, name, kind, startup, active, recovery, damage, reach,
    level: 'mid', cost: 0, meter: 0, cooldown: 0, tag: 'strike', lore: 'original',
    counterplay: 'Bloquer, sortir de portée et punir la récupération visible.', ...extra
  });
  const fighter = {
    uid, id: 'parallaxe', source: 'ORIGINAL', name: 'PARALLAXE', ep: 'STATION MÉRIDIEN · OC',
    role: 'CONTRÔLE LOCAL', archetype: 'tactical', power: 1, speed: .86, reach: 1,
    color: '#69734c', accent: '#acd28a', canonical: false,
    portrait: '../originals/parallaxe/assets/portraits/parallaxe.webp',
    visual: { kind: 'human', gender: 'm', body: 'athletic', hair: 'messy', hairColor: '#3c3025',
      skin: '#c99c79', headgear: null, outfit: 'tactical', weapon: 'rifle', primary: '#69734c',
      secondary: '#353d2b', accent: '#acd28a', pouches: 3, gloves: true, pads: true,
      monocular: { anatomicalSide: 'left', color: '#80da67', removable: true } },
    combat: {
      key: 'parallaxe_original', role: 'Leurre local et observation de déplacements visibles',
      evidence: 'original', sources: [],
      basis: 'Personnage original de Station Méridien. Les techniques appartiennent à sa fiction CQC.',
      scope: 'Mode original et entraînement libre ; aucune nouvelle entrée dans les chroniques officielles.',
      limitations: ['Un seul leurre actif, destructible et à portée courte.',
        'L’optique observe uniquement une position et un déplacement déjà visibles, jamais les commandes futures.',
        'Préparations interruptibles, autonomie finie ; aucune invulnérabilité ni attaque du rapace.'],
      resource: { kind: 'energy', label: 'AUTONOMIE', max: 100, regen: .12 },
      passive: { id: 'observed_local', name: 'Lecture locale', markMelee: true, guardRegen: .12,
        observeMovement: true, desc: 'L’optique mémorise une trace déjà visible. Le prochain contact confirmé sur la cible observée gagne 12 % pendant deux secondes.' },
      links: [['light', 'heavy']],
      moves: {
        light: move('light', 'Frappe de contrôle', 'melee', 7, 3, 13, 340, 80),
        heavy: move('heavy', 'Engagement lourd', 'melee', 16, 5, 28, 660, 118),
        low: move('low', 'Balayage de zone', 'melee', 13, 4, 24, 410, 104, { level: 'low', lowProfile: true,
          counterplay: 'Garde basse ou saut ; garde debout insuffisante.' }),
        throw: move('throw', 'Rupture au contact', 'melee', 9, 2, 35, 740, 74,
          { level: 'throw', tag: 'grapple', counterplay: 'Sauter, reculer ou déchoper avec U / R près de l’impact.' }),
        special: move('special', 'Leurre local', 'trap', 30, 1, 27, 310, 72,
          { tag: 'snare', cost: 30, arm: 35, duration: 420, hp: 220, maxTraps: 1,
            status: 'slow', cooldown: 105,
            counterplay: 'Interrompre les 30 images de préparation, éviter le rayon de 72 px, sauter ou détruire le dispositif au corps à corps.' }),
        specialDown: move('specialDown', 'Rappel du leurre', 'recallTrap', 12, 1, 18, 0, 240,
          { tag: 'recovery', cooldown: 30, counterplay: 'Le rappel ne retire que le dispositif personnel à moins de 240 px ; aucune explosion ni récupération d’autonomie.' }),
        specialForward: move('specialForward', 'Carabine conventionnelle', 'projectile', 18, 1, 29, 430, 520,
          { tag: 'ballistic', cost: 15, level: 'high', speed: 16, life: 36, height: 138,
            counterplay: 'S’accroupir, garder, sauter ou parer le projectile ; tir réel, aucune touche automatique.' }),
        specialBack: move('specialBack', 'Décrochage local', 'mobility', 8, 10, 18, 0, 0,
          { tag: 'movement', cost: 10, travel: -6, cooldown: 90,
            counterplay: 'Repli de 60 px sans invulnérabilité : avancer et punir la récupération.' }),
        utility: move('utility', 'Optique — trace visible', 'observe', 22, 1, 28, 0, 380,
          { tag: 'recon', cost: 20, duration: 120, cooldown: 210,
            counterplay: 'Sortir du rayon de 380 px, masquer la silhouette ou interrompre la préparation ; les commandes et mouvements futurs ne sont jamais lus.' }),
        super: move('super', 'Croisement de trajectoires', 'trap', 38, 1, 34, 1050, 120,
          { tag: 'snare', cost: 35, meter: 75, arm: 20, duration: 300, hp: 300,
            maxTraps: 1, status: 'slow', cooldown: 210,
            counterplay: 'Signal long de 38 images puis armement visible ; contourner, sauter ou détruire ce seul dispositif, jamais toute l’arène.' })
      }
    }
  };
  const portraits = new Map(), waitingPortraits = new Map();
  function drawPortrait(canvas, f) {
    if (f.uid !== uid || typeof root.Image !== 'function') return false;
    let img = portraits.get(uid);
    if (!img) {
      img = new root.Image(); portraits.set(uid, img); waitingPortraits.set(uid, new Map());
      img.onload = () => {
        const waiting = waitingPortraits.get(uid); for (const [target, fighter] of waiting) drawPortrait(target, fighter);
        waiting.clear();
      };
      img.src = f.portrait;
    }
    if (!img.complete || !img.naturalWidth) { waitingPortraits.get(uid).set(canvas, f); return false; }
    const c = canvas.getContext('2d'), w = canvas.width, h = canvas.height;
    const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
    c.clearRect(0, 0, w, h); c.fillStyle = '#142016'; c.fillRect(0, 0, w, h);
    c.drawImage(img, (w - img.naturalWidth * scale) / 2, (h - img.naturalHeight * scale) / 2,
      img.naturalWidth * scale, img.naturalHeight * scale); return true;
  }
  root.CQC_ORIGINAL_FIGHTERS = { schemaVersion: 1, fighters: [fighter], drawPortrait,
    clone: () => JSON.parse(JSON.stringify([fighter])) };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.CQC_ORIGINAL_FIGHTERS;
})(typeof globalThis !== 'undefined' ? globalThis : this);
