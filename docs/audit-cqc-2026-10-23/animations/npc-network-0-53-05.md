# Animations — NPC NETWORK 0.53

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [TELIKO — PORTABLE OPS](#npc53__teliko_mpo) — PORTABLE OPS
- [VENUS — PORTABLE OPS](#npc53__venus_mpo) — PORTABLE OPS
- [OLD SNAKE — PORTABLE OPS+](#npc53__old_snake_mpo_plus) — PORTABLE OPS+
- [RAIDEN — PORTABLE OPS+](#npc53__raiden_mpo_plus) — PORTABLE OPS+
- [VIGGO HACH](#npc53__viggo_hach_acid) — AC!D
- [LENA ARROW](#npc53__lena_arrow_acid) — AC!D
- [MINETTE DONNELL / CONSTANCE FLEMMING](#npc53__minette_acid) — AC!D
- [CHARLES SCHMEISER](#npc53__schmeiser_acid) — AC!D
- [ELSIE & FRANCES](#npc53__elsie_frances_acid) — AC!D
- [HANS DAVIS](#npc53__hans_davis_acid) — AC!D

## npc53__teliko_mpo

### TELIKO — PORTABLE OPS — PORTABLE OPS

**Rôle :** AGENT INVITÉ — support frappe. **Profil :** `soldier`.

**Base présente dans le code :** Apparition invitée adaptée au moteur de Portable Ops.

**Incarnation à conserver :** Independent PSP playable AC!D guest, not alias of original AC!D story identity mechanics

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** TELIKO — PORTABLE OPS : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « AGENT INVITÉ — support frappe » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** TELIKO — PORTABLE OPS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de TELIKO — PORTABLE OPS. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS », présentation de Independent PSP playable AC!D guest, not alias of original AC!D story identity mechanics, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Frappe coordonnée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; TELIKO — PORTABLE OPS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS.
- **round_loss :** Proposition CQC : TELIKO — PORTABLE OPS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Appui total », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Intervention rapprochée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Action engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Balayage d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Immobilisation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Frappe coordonnée

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Frappe coordonnée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Frappe coordonnée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Désignation laser

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Désignation laser » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Désignation laser », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Passe d’appui

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Passe d’appui » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Passe d’appui » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Repli assisté » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Appui total

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Appui total » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Appui total » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TELIKO — PORTABLE OPS, préparer « Recalibrer » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Appui total — Protocole final

Famille `ballistic`, ton `stylized` ; 210 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Appui total / Intervention rapprochée.

Plan 1 : TELIKO — PORTABLE OPS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Appui total / Intervention rapprochée ». Plan 2 : présenter l’arme effectivement associée à « Appui total / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Frappe coordonnée — Neutralisation

Famille `ballistic`, ton `stylized` ; 222 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Frappe coordonnée / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Frappe coordonnée / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Frappe coordonnée / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Désignation laser — Extraction

Famille `ballistic`, ton `stylized` ; 234 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Désignation laser / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Désignation laser / Intervention rapprochée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Désignation laser / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Passe d’appui — Fin de réseau

Famille `ballistic`, ton `stylized` ; 246 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Passe d’appui / Intervention rapprochée.

Plan 1 : après une observation ou un repli, TELIKO — PORTABLE OPS reprend l’initiative par « Passe d’appui / Intervention rapprochée ». Plan 2 : présenter l’arme effectivement associée à « Passe d’appui / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original AC!D fullbody art complements actual PSP upperbody crop, not proof of every PSP guest-model texture/mesh.
- Occluded boots and rear attachment details reconstructed conservatively; source does not establish every concealed detail.
- Actual source pose11 shows independently held dual conventional black pistols aimed horizontally; visualFirearmPresent:true follows PNGs. No new dual-fire game mechanic is introduced.
- Right-v1 rejected for cropped bottom-row feet and preserved; selected right-v2 wholebody with true native raster unchanged.
- Native motion authored CQC adaptation.
- [Actual PSP portrait physically viewed defines short platinumblond layered bob, pale face, beige camouflage puff sleeves and exposed fingers. Full official original AC!D Masao Tsubasa art physically viewed complements enormous gathered camo sleeves, structured light armored bodice, matching camo long trousers with outer-side crosslacing, web harness and brown/burgundy thigh holsters, black twin pistols. Original boot is partly occluded by fallen soldier in illustration; conservative dark boots are qualified. The fallen man/butterflies/background are excluded from fighter atlas.](https://www.creativeuncut.com/gallery-17/mga-teliko-friedman.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__venus_mpo

### VENUS — PORTABLE OPS — PORTABLE OPS

**Rôle :** AGENT INVITÉ — support furtivité. **Profil :** `soldier`.

**Base présente dans le code :** Apparition invitée adaptée au moteur de Portable Ops.

**Incarnation à conserver :** Independent PSP playable AC!D2 guest, not another series costume alias

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VENUS — PORTABLE OPS : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « AGENT INVITÉ — support furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** VENUS — PORTABLE OPS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VENUS — PORTABLE OPS. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS », présentation de Independent PSP playable AC!D2 guest, not another series costume alias, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Voile furtif » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; VENUS — PORTABLE OPS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS.
- **round_loss :** Proposition CQC : VENUS — PORTABLE OPS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction fantôme », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Intervention rapprochée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Action engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Balayage d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Immobilisation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Voile furtif

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Voile furtif » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Voile furtif » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Repli masqué

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Repli masqué » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Repli masqué », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Route invisible

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Route invisible » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Route invisible » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Repli assisté » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Extraction fantôme

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Extraction fantôme » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Extraction fantôme » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VENUS — PORTABLE OPS, préparer « Recalibrer » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction fantôme — Protocole final

Famille `capture`, ton `stylized` ; 210 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Extraction fantôme / Intervention rapprochée.

Plan 1 : VENUS — PORTABLE OPS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction fantôme / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Extraction fantôme / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Voile furtif — Neutralisation

Famille `capture`, ton `stylized` ; 222 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Voile furtif / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Voile furtif / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Voile furtif / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Repli masqué — Extraction

Famille `capture`, ton `stylized` ; 234 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Repli masqué / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Repli masqué / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Repli masqué / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Route invisible — Fin de réseau

Famille `capture`, ton `stylized` ; 246 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Route invisible / Intervention rapprochée.

Plan 1 : après une observation ou un repli, VENUS — PORTABLE OPS reprend l’initiative par « Route invisible / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Route invisible / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original AC!D2 fullbody art is complementary, not proof of every released PSP guest-model mesh/texture.
- Rifle model number and unseen rear attachment topology are not asserted; source image defines only observed silhouette.
- Actual selected native pose11 aims one pistol horizontally; other native frames lower or tuck it, visualFirearmPresent:true follows actual PNG.
- Native CQC animation authored; no muzzle flash or effect baked into body.
- [Actual PSP playable portrait physically viewed establishes long blond hair, red-black segmented tunic and circular shoulder detail. Original AC!D2 fullbody character illustration physically viewed establishes short tunic, thigh gaps above red thigh-high armored boots, black gloves/hip harness, conventional black pistol and brown-stock long firearm strapped behind back. Public image rehost used for whole silhouette; previous canonical official-art source receipt corroborates design.](https://www.creativeuncut.com/gallery-11/mga2-venus.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__old_snake_mpo_plus

### OLD SNAKE — PORTABLE OPS+ — PORTABLE OPS+

**Rôle :** INVITÉ PLUS — support recon. **Profil :** `soldier`.

**Base présente dans le code :** Variante invitée du mode Plus, séparée de MGS4.

**Incarnation à conserver :** Independent PSP2007 playable guest, distinct UID from original PS3MGS4 counterpart

**État vérifié :** métadonnées natives avec limites. 28 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OLD SNAKE — PORTABLE OPS+ : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « INVITÉ PLUS — support recon » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** OLD SNAKE — PORTABLE OPS+ : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OLD SNAKE — PORTABLE OPS+. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS+ », présentation de Independent PSP2007 playable guest, distinct UID from original PS3MGS4 counterpart, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Scan de terrain » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; OLD SNAKE — PORTABLE OPS+ vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS+.
- **round_loss :** Proposition CQC : OLD SNAKE — PORTABLE OPS+ réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction renseignée », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Intervention rapprochée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Action engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Balayage d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Immobilisation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Scan de terrain

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Scan de terrain » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Scan de terrain » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Marquage prioritaire

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Marquage prioritaire » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Marquage prioritaire », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Réseau de veille

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Réseau de veille » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Réseau de veille » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Repli assisté » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Extraction renseignée

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Extraction renseignée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Extraction renseignée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD SNAKE — PORTABLE OPS+, préparer « Recalibrer » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction renseignée — Protocole final

Famille `tactical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Extraction renseignée / Intervention rapprochée.

Plan 1 : OLD SNAKE — PORTABLE OPS+ sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction renseignée / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Extraction renseignée / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Scan de terrain — Neutralisation

Famille `tactical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Scan de terrain / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Scan de terrain / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Scan de terrain / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Marquage prioritaire — Extraction

Famille `tactical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Marquage prioritaire / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Marquage prioritaire / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Marquage prioritaire / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Réseau de veille — Fin de réseau

Famille `tactical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Réseau de veille / Intervention rapprochée.

Plan 1 : après une observation ou un repli, OLD SNAKE — PORTABLE OPS+ reprend l’initiative par « Réseau de veille / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Réseau de veille / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original PS3 fullbody capture complements PSP upperbody sources, exact PSP lowerbody mesh/texture not attested.
- Source rifle in PSP shot is cropped/model unverified: no held firearm is invented in CQC atlas, visualFirearmPresent:false.
- Left-v1 retained as source projection needing review; V2 attempted to reveal near anatomicalRIGHT eye and hide far LEFT device. Tiny face/optic projection and eye visibility remain approximate at atlas scale, not absolute side-detail certification.
- Native CQC animation authored; no supernatural transparency or source OctoCamo technology change claimed.
- Small duplicate neutral sourcepose12 is routed conservatively for gameplay animation.
- Physical pose12 is visibly a smaller neutral interpretation, retained in the unmodified original but not selected for reload; actual full-scale neutral pose0 supplies this presentation action. No physics or source pixels changed.
- [Actual original PSP portrait and period2007 PSP shot physically viewed establish elderly gray-white hair, deep face lines, gray moustache, dark bandana and anatomicalLEFT SolidEye, darkgray sneaking body and tan harness. Native original PS3 completebody capture complements fitted gray opaque OctoCamo suit, segmented pads, tan/orangebrown webbing/pouches and black gloves/boots. Newly authored independent facings with no runtime flip.](https://www.metalgearweb.it/mpo/plus) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__raiden_mpo_plus

### RAIDEN — PORTABLE OPS+ — PORTABLE OPS+

**Rôle :** INVITÉ PLUS — support frappe. **Profil :** `soldier`.

**Base présente dans le code :** Variante invitée du mode Plus, séparée des incarnations MGS2/MGS4/MGR.

**Incarnation à conserver :** Exact independent playable PSP human MGS2 SOL uniform incarnation; never MGR cyborg

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** RAIDEN — PORTABLE OPS+ : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « INVITÉ PLUS — support frappe » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** RAIDEN — PORTABLE OPS+ : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de RAIDEN — PORTABLE OPS+. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « PORTABLE OPS+ », présentation de Exact independent playable PSP human MGS2 SOL uniform incarnation; never MGR cyborg, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Frappe coordonnée » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; RAIDEN — PORTABLE OPS+ vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à PORTABLE OPS+.
- **round_loss :** Proposition CQC : RAIDEN — PORTABLE OPS+ réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Appui total », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Intervention rapprochée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Action engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Balayage d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Immobilisation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Frappe coordonnée

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Frappe coordonnée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Frappe coordonnée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Désignation laser

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Désignation laser » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Désignation laser », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Passe d’appui

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Passe d’appui » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Passe d’appui » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Repli assisté » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Appui total

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Appui total » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Appui total » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de RAIDEN — PORTABLE OPS+, préparer « Recalibrer » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Appui total — Protocole final

Famille `ballistic`, ton `simulation` ; 210 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Appui total / Intervention rapprochée.

Plan 1 : RAIDEN — PORTABLE OPS+ sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Appui total / Intervention rapprochée ». Plan 2 : présenter l’arme effectivement associée à « Appui total / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Frappe coordonnée — Neutralisation

Famille `ballistic`, ton `simulation` ; 222 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Frappe coordonnée / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Frappe coordonnée / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : présenter l’arme effectivement associée à « Frappe coordonnée / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Désignation laser — Extraction

Famille `ballistic`, ton `simulation` ; 234 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Désignation laser / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Désignation laser / Intervention rapprochée », arme et main libre identifiées. Plan 2 : présenter l’arme effectivement associée à « Désignation laser / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Passe d’appui — Fin de réseau

Famille `ballistic`, ton `simulation` ; 246 ticks CQC ; phases actuelles : aim → volley → impact → pose. Appuis déclarés : Passe d’appui / Intervention rapprochée.

Plan 1 : après une observation ou un repli, RAIDEN — PORTABLE OPS+ reprend l’initiative par « Passe d’appui / Intervention rapprochée ». Plan 2 : présenter l’arme effectivement associée à « Passe d’appui / Intervention rapprochée », viser sans changer sa main ni son modèle. Plan 3 : chaque départ correspond au canon visible ; reculs, munitions et réactions de cible sont synchronisés, sans projectile créé derrière le corps. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Fullbody original2001 art complements actual PSP upperbody capture; fine mesh/textures and motion are qualified source-informed CQC adaptation, not absolute1:1 original PSP model.
- Human MGS2 armour, no cyborg face or MGR robot limbs.
- Only physical HF blade is drawn, no ballistic firearm; visualFirearmPresent:false.
- V1 rejected clipping and baked slash arcs preserved; selected V2 no baked VFX, all feet and tips contained.
- [Physically viewed real original PSP presskit shot establishes blond human Raiden, MGS2 SOL tactical suit and HF blade. Physically viewed official original2001 fullbody art supplies complementary same base uniform silhouette and straight katana; art is not final PSP mesh. New authored native two facings retain separate Plus UID.](https://www.mobygames.com/game/31753/metal-gear-solid-portable-ops-plus/promo/group-77663/image-622637/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__viggo_hach_acid

### VIGGO HACH — AC!D

**Rôle :** ADMINISTRATEUR LOBITO — support intrusion. **Profil :** `pistol`.

**Base présente dans le code :** Figure de commandement d’Ac!d ; duel à cartes simulé.

**Incarnation à conserver :** Viggo Hach in the archived official first PSP Ac!d Konami portrait.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** VIGGO HACH : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « ADMINISTRATEUR LOBITO — support intrusion » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** VIGGO HACH : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de VIGGO HACH. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D », présentation de Viggo Hach in the archived official first PSP Ac!d Konami portrait., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Intrusion » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; VIGGO HACH vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D.
- **round_loss :** Proposition CQC : VIGGO HACH réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Réseau compromis », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Intervention rapprochée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Action engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Balayage d’urgence » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Immobilisation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Intrusion

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Intrusion » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Intrusion » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Piratage local

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Piratage local » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Piratage local », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Prise de contrôle

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Prise de contrôle » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Prise de contrôle » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Repli assisté » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Réseau compromis

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Réseau compromis » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Réseau compromis » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de VIGGO HACH, préparer « Recalibrer » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Réseau compromis — Protocole final

Famille `psychic`, ton `simulation` ; 210 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Réseau compromis / Intervention rapprochée.

Plan 1 : VIGGO HACH sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Réseau compromis / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Réseau compromis / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Intrusion — Neutralisation

Famille `psychic`, ton `simulation` ; 222 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Intrusion / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Intrusion / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Intrusion / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Piratage local — Extraction

Famille `psychic`, ton `simulation` ; 234 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Piratage local / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Piratage local / Intervention rapprochée », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Piratage local / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Prise de contrôle — Fin de réseau

Famille `psychic`, ton `simulation` ; 246 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Prise de contrôle / Intervention rapprochée.

Plan 1 : après une observation ou un repli, VIGGO HACH reprend l’initiative par « Prise de contrôle / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Prise de contrôle / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Only the head and upper torso are visible. Legs, shoes, back surfaces and hidden equipment cannot be established from this image.
- The native official website caption identifies the visible character; all unseen full-body parts require game/reference evidence or explicit adapted treatment.
- Official source shows only portrait/upper torso. Unseen trousers, footwear, hands, back, body height and action positions are explicitly adapted.
- [Native original official Konami website character illustration as displayed on the archived Ac!d page; visible extent only.](https://www.konami.com/mg/archive/mga/uk/characters_01.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__lena_arrow_acid

### LENA ARROW — AC!D

**Rôle :** AGENT BEAGLE — support recon. **Profil :** `soldier`.

**Base présente dans le code :** Agent liée à l’opération Ac!d, adaptée comme soutien de terrain.

**Incarnation à conserver :** Lena Arrow as illustrated on original Konami first Ac!d character page.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** LENA ARROW : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « AGENT BEAGLE — support recon » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** LENA ARROW : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de LENA ARROW. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D », présentation de Lena Arrow as illustrated on original Konami first Ac!d character page., puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Scan de terrain » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; LENA ARROW vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D.
- **round_loss :** Proposition CQC : LENA ARROW réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction renseignée », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Intervention rapprochée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Action engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Balayage d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Immobilisation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Scan de terrain

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Scan de terrain » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Scan de terrain » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Marquage prioritaire

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Marquage prioritaire » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Marquage prioritaire », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Réseau de veille

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Réseau de veille » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Réseau de veille » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Repli assisté » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Extraction renseignée

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Extraction renseignée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Extraction renseignée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de LENA ARROW, préparer « Recalibrer » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction renseignée — Protocole final

Famille `tactical`, ton `stylized` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Extraction renseignée / Intervention rapprochée.

Plan 1 : LENA ARROW sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction renseignée / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Extraction renseignée / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire.

##### Scan de terrain — Neutralisation

Famille `tactical`, ton `stylized` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Scan de terrain / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Scan de terrain / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Scan de terrain / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble.

##### Marquage prioritaire — Extraction

Famille `tactical`, ton `stylized` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Marquage prioritaire / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Marquage prioritaire / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Marquage prioritaire / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final.

##### Réseau de veille — Fin de réseau

Famille `tactical`, ton `stylized` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Réseau de veille / Intervention rapprochée.

Plan 1 : après une observation ou un repli, LENA ARROW reprend l’initiative par « Réseau de veille / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Réseau de veille / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Only the head and upper torso are visible. Legs, shoes, back surfaces and hidden equipment cannot be established from this image.
- The native official website caption identifies the visible character; all unseen full-body parts require game/reference evidence or explicit adapted treatment.
- Only visible original source details are attested; standing lower body and action anatomy are authored reconstruction, not full-body canon.
- Official archived Lena prose accidentally duplicates the marionette text; portrait label establishes Lena identity, not that erroneous paragraph.
- [Native original official Konami website character illustration as displayed on the archived Ac!d page; visible extent only.](https://www.konami.com/mg/archive/mga/uk/characters_02.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__minette_acid

### MINETTE DONNELL / CONSTANCE FLEMMING — AC!D

**Rôle :** HÉRITIÈRE / IDENTITÉ — support leurre. **Profil :** `analyst`.

**Base présente dans le code :** Double identité narrative, présentée comme simulation.

**Incarnation à conserver :** Minette Donnel original official Ac!d illustrated portrait, exact age not established.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MINETTE DONNELL / CONSTANCE FLEMMING : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Conserver la taille et la gestuelle de l’enfant ; gestes de simulation/assistance, pas un corps adulte redimensionné.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « HÉRITIÈRE / IDENTITÉ — support leurre » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** MINETTE DONNELL / CONSTANCE FLEMMING : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MINETTE DONNELL / CONSTANCE FLEMMING. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D », présentation de Minette Donnel original official Ac!d illustrated portrait, exact age not established., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Leurre » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; MINETTE DONNELL / CONSTANCE FLEMMING vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D.
- **round_loss :** Proposition CQC : MINETTE DONNELL / CONSTANCE FLEMMING réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dédoublement réseau », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Intervention rapprochée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Action engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Balayage d’urgence » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Immobilisation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Leurre

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Leurre » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Leurre » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Fausse signature

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Fausse signature » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Fausse signature », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Écho tactique

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Écho tactique » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Écho tactique » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Repli assisté » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Dédoublement réseau

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Dédoublement réseau » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Dédoublement réseau », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MINETTE DONNELL / CONSTANCE FLEMMING, préparer « Recalibrer » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Dédoublement réseau — Protocole final

Famille `psychic`, ton `simulation` ; 210 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Dédoublement réseau / Intervention rapprochée.

Plan 1 : MINETTE DONNELL / CONSTANCE FLEMMING sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dédoublement réseau / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Dédoublement réseau / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Leurre — Neutralisation

Famille `psychic`, ton `simulation` ; 222 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Leurre / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Leurre / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Leurre / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Fausse signature — Extraction

Famille `psychic`, ton `simulation` ; 234 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Fausse signature / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Fausse signature / Intervention rapprochée », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Fausse signature / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Écho tactique — Fin de réseau

Famille `psychic`, ton `simulation` ; 246 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Écho tactique / Intervention rapprochée.

Plan 1 : après une observation ou un repli, MINETTE DONNELL / CONSTANCE FLEMMING reprend l’initiative par « Écho tactique / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Écho tactique / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Only the head and upper torso are visible. Legs, shoes, back surfaces and hidden equipment cannot be established from this image.
- The native official website caption identifies the visible character; all unseen full-body parts require game/reference evidence or explicit adapted treatment.
- Only visible original source details are attested; standing lower body and action anatomy are authored reconstruction, not full-body canon.
- The portrait does not establish exact age, skirt length, sleeves, legs, shoes or back. Fully clothed lower garment is explicitly adapted.
- [Native original official Konami website character illustration as displayed on the archived Ac!d page; visible extent only.](https://www.konami.com/mg/archive/mga/uk/characters_02.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__schmeiser_acid

### CHARLES SCHMEISER — AC!D

**Rôle :** SCIENTIFIQUE — support réparation. **Profil :** `analyst`.

**Base présente dans le code :** Scientifique d’Ac!d ; profil de laboratoire simulé.

**Incarnation à conserver :** Charles Schmeiser in the archived official first PSP Ac!d Konami character portrait.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CHARLES SCHMEISER : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « SCIENTIFIQUE — support réparation » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** CHARLES SCHMEISER : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de CHARLES SCHMEISER. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D », présentation de Charles Schmeiser in the archived official first PSP Ac!d Konami character portrait., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Réparation terrain » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; CHARLES SCHMEISER vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D.
- **round_loss :** Proposition CQC : CHARLES SCHMEISER réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Remise en ligne », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Intervention rapprochée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Action engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Balayage d’urgence » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Immobilisation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Réparation terrain

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Réparation terrain » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Réparation terrain » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Diagnostic

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Diagnostic » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Diagnostic », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Restauration système

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Restauration système » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Restauration système » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Repli assisté » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Remise en ligne

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Remise en ligne » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Remise en ligne », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CHARLES SCHMEISER, préparer « Recalibrer » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Remise en ligne — Protocole final

Famille `mechanical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : scan → repair → lock → pose. Appuis déclarés : Remise en ligne / Intervention rapprochée.

Plan 1 : CHARLES SCHMEISER sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Remise en ligne / Intervention rapprochée ». Plan 2 : déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire ; montrer l’organe de « Remise en ligne / Intervention rapprochée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Réparation terrain — Neutralisation

Famille `mechanical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : scan → repair → lock → pose. Appuis déclarés : Réparation terrain / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Réparation terrain / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire ; montrer l’organe de « Réparation terrain / Intervention rapprochée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Diagnostic — Extraction

Famille `mechanical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : scan → repair → lock → pose. Appuis déclarés : Diagnostic / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Diagnostic / Intervention rapprochée », arme et main libre identifiées. Plan 2 : déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire ; montrer l’organe de « Diagnostic / Intervention rapprochée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Restauration système — Fin de réseau

Famille `mechanical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : scan → repair → lock → pose. Appuis déclarés : Restauration système / Intervention rapprochée.

Plan 1 : après une observation ou un repli, CHARLES SCHMEISER reprend l’initiative par « Restauration système / Intervention rapprochée ». Plan 2 : déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire ; montrer l’organe de « Restauration système / Intervention rapprochée ». Plan 3 : action mécanique/animale avec appuis et articulations propres au corps, réponse de cible compatible avec sa taille et sa masse. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Only the head and upper torso are visible. Legs, shoes, back surfaces and hidden equipment cannot be established from this image.
- The native official website caption identifies the visible character; all unseen full-body parts require game/reference evidence or explicit adapted treatment.
- Portrait establishes face and upper formal clothing only. Lower clothing, hands, footwear and hidden surfaces are explicitly reconstructed.
- Dark facial marks are read as beard/shadow, not certified permanent tattoos.
- This UID is Charles Schmeiser; Hans Davis remains a distinct UID and will not be silently merged.
- Direct repeat review of original Konami portrait confirms DARK shirt, correcting earlier prepared descriptive pale-shirt wording; archived actual generation requests remain intact and final generated costume follows the dark visible original.
- [Native original official Konami website character illustration as displayed on the archived Ac!d page; visible extent only.](https://www.konami.com/mg/archive/mga/uk/characters_03.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__elsie_frances_acid

### ELSIE & FRANCES — AC!D

**Rôle :** DUO DE SOUTIEN — support commandement. **Profil :** `analyst`.

**Base présente dans le code :** Duo narratif condensé en un profil de soutien.

**Incarnation à conserver :** One of the two original canonical Elsie/Frances marionettes; variantA based on LEFT figure in full original painting. No individual name-to-body assignment certified.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `nextgen`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ELSIE & FRANCES : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « DUO DE SOUTIEN — support commandement » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** ELSIE & FRANCES : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ELSIE & FRANCES. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D », présentation de One of the two original canonical Elsie/Frances marionettes; variantA based on LEFT figure in full original painting. No individual name-to-body assignment certified., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Ordre de mission » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; ELSIE & FRANCES vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D.
- **round_loss :** Proposition CQC : ELSIE & FRANCES réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Commandement total », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Intervention rapprochée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Action engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Balayage d’urgence » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Immobilisation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Ordre de mission

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Ordre de mission » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ordre de mission » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Ralliement

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Ralliement » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Ralliement », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Directive offensive

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Directive offensive » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Directive offensive » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Repli assisté » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Commandement total

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Commandement total » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Commandement total », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ELSIE & FRANCES, préparer « Recalibrer » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Commandement total — Protocole final

Famille `cqc`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Commandement total / Intervention rapprochée.

Plan 1 : ELSIE & FRANCES sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Commandement total / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Commandement total / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ordre de mission — Neutralisation

Famille `cqc`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Ordre de mission / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ordre de mission / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Ordre de mission / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ralliement — Extraction

Famille `cqc`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Ralliement / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Ralliement / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ralliement / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Directive offensive — Fin de réseau

Famille `cqc`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Directive offensive / Intervention rapprochée.

Plan 1 : après une observation ou un repli, ELSIE & FRANCES reprend l’initiative par « Directive offensive / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Directive offensive / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed original reference establishes only visible identity/costume/accessories; it is not certified whole-body final-game 3D geometry or texture.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- Original official fullbody painting establishes two identical-looking marionettes. Individual assignment of names Elsie versus Frances to painted figures is not proven; variants only A/B.
- This default variantA follows left painted figure; separately authored variantB follows right figure. Both stay one shared fighter UID, no character deletion.
- Top hanging string length/controller beyond original painting is unseen; short attached visible string segments inside each cell are adapted. Native head-tofeet source stature must exclude strings, not use whole atlas/cell height.
- [Native official character illustration/concept reproduced by Creative Uncut; not a final-game 3D model.](https://www.creativeuncut.com/gallery-17/mga-elsie-and-frances-marionettes.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__hans_davis_acid

### HANS DAVIS — AC!D

**Rôle :** DIRECTEUR — support couverture. **Profil :** `pistol`.

**Base présente dans le code :** Profil de direction et sécurité simulé.

**Incarnation à conserver :** Explicit CQC presentation reconstruction for this existing named UID, preserving its historical authored project portrait. Original game body/face/clothing appearance is NOT canonically attested here.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** HANS DAVIS : main forte et main de soutien identifiées sur le pistolet, coudes contenus. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas prudents sans inverser l’étui ni la main forte. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « DIRECTEUR — support couverture » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder main forte et main de soutien identifiées sur le pistolet, coudes contenus.
- **jump_land :** HANS DAVIS : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas prudents sans inverser l’étui ni la main forte. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de HANS DAVIS. Terminer par recul du poignet puis stabilisation du canon. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « AC!D », présentation de Explicit CQC presentation reconstruction for this existing named UID, preserving its historical authored project portrait. Original game body/face/clothing appearance is NOT canonically attested here., puis main forte et main de soutien identifiées sur le pistolet, coudes contenus. Geste court lié à « Couverture » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, recul du poignet puis stabilisation du canon ; HANS DAVIS vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à AC!D.
- **round_loss :** Proposition CQC : HANS DAVIS réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Forteresse mobile », revenir par recul du poignet puis stabilisation du canon, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Intervention rapprochée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Action engagée » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Balayage d’urgence » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Immobilisation » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** recul du poignet puis stabilisation du canon. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Couverture

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Couverture » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Couverture » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Barrage défensif

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Barrage défensif » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Prélever l’objet correspondant à « Barrage défensif », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Écran tactique

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Écran tactique » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Écran tactique » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** recul du poignet puis stabilisation du canon.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Repli assisté » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Préparer l’appui qui produit le déplacement ; pas prudents sans inverser l’étui ni la main forte.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** recul du poignet puis stabilisation du canon. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Forteresse mobile

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Forteresse mobile » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Montrer la prise et la visée de l’arme décrite par « Forteresse mobile » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** recul du poignet puis stabilisation du canon. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de HANS DAVIS, préparer « Recalibrer » ; main forte et main de soutien identifiées sur le pistolet, coudes contenus. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** recul du poignet puis stabilisation du canon. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Forteresse mobile — Protocole final

Famille `tactical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Forteresse mobile / Intervention rapprochée.

Plan 1 : HANS DAVIS sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Forteresse mobile / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Forteresse mobile / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : recul du poignet puis stabilisation du canon, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Couverture — Neutralisation

Famille `tactical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Couverture / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Couverture / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Couverture / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : recul du poignet puis stabilisation du canon, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Barrage défensif — Extraction

Famille `tactical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Barrage défensif / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Barrage défensif / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Barrage défensif / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : recul du poignet puis stabilisation du canon, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Écran tactique — Fin de réseau

Famille `tactical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Écran tactique / Intervention rapprochée.

Plan 1 : après une observation ou un repli, HANS DAVIS reprend l’initiative par « Écran tactique / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Écran tactique / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : recul du poignet puis stabilisation du canon, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against its identified reference and only its visible extent. This is a 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity, costume, equipment and anatomical-side checks establish consistency with the source-backed visible facts and the explicitly qualified reconstructed parts; they do not certify unseen anatomy or clothing as canonical. Gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Physically viewed historical project portrait establishes only continuity of that authored design; it establishes NO canonical game body appearance.
- Back surfaces and unseen pose angles are adapted from visible source design, without a pixel-perfect claim.
- Sixteen action poses per direction are authored gameplay adaptation; no canonical technique or motion-capture claim.
- This authored legacy project portrait is not a Konami character model, official painting or original game capture.
- Character identity/biography may have canonical text evidence; this particular face/body/clothing is NOT canonically attested.
- Global GitHub tree URL proves project context, not a direct tracked portrait permalink; exact local path/bytes/SHA preserve the historical design.
- Full-body fighter below the portrait is an explicit presentation reconstruction; no1:1face/modelclaim.
- SOURCE STATUS: unattested-body-presentation-reconstruction; presentationReconstruction=true and canonicalBodyAppearanceAttested=false.
- This face/attire is an authored historical CQC design, not a primary-game portrait, official Konami painting or final3Dmodel.
- Character name/biography are retained from the existing project; those facts do NOT establish a physical appearance. No1:1canonicalface/bodycertification.
- Only visible legacy portrait details are restored; legs, shoes, hidden back surfaces, hands and all CQC action motions are explicitly authored reconstruction.
- [Historical authored project portrait; NO canonical body appearance attested](https://github.com/darknigthmare/shadow-codec-ops/tree/d652251fdf85bfae69ec48d393564487cd3809ec/docs/cqc-reprise) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
