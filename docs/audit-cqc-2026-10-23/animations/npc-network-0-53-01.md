# Animations — NPC NETWORK 0.53

**10 acteurs du registre courant.** Les titres d’actions et paramètres sont observés ; les descriptions sont des propositions CQC à produire et valider. Un groupe de frames existant ne certifie pas l’ensemble du mouvement ou sa fidélité originale.

[Index des fiches](README.md) · [Contrat commun](../04_ANIMATIONS_SPRITES.md)

## Sommaire

- [DR. CLARK](#npc53__dr_clark_mgs1) — MGS1
- [CARLOS ESMERALDA — PROTOTYPE](#npc53__carlos_esmeralda_mgs1) — MGS1
- [DEAD CELL MYSTIC — PROTOTYPE](#npc53__dead_cell_mystic_mgs2) — MGS2
- [OLD BOY — PROTOTYPE](#npc53__old_boy_mgs2) — MGS2
- [MAXINE « MAX » WORK — CONCEPT MGS2](#npc53__max_wark_mgs2) — MGS2
- [WILLIAM « DOC » WILSON — CONCEPT MGS2](#npc53__doc_wilson_mgs2) — MGS2
- [COLONEL DANIEL QUINN — CONCEPT MGS2](#npc53__daniel_quinn_mgs2) — MGS2
- [TATYANA](#npc53__tatyana_mgs3) — MGS3
- [ADAM](#npc53__adam_mgs3) — MGS3
- [THE END’S PARROT](#npc53__end_parrot_mgs3) — MGS3

## npc53__dr_clark_mgs1

### DR. CLARK — MGS1

**Rôle :** GÉNÉTIQUE — support soins. **Profil :** `analyst`.

**Base présente dans le code :** Identité de la médecin responsable du programme génétique avant Shadow Moses.

**Incarnation à conserver :** Older ParaMedic/DrClark identity reconstruction before death, known originalMGS3 silhouette retained as project reference; no released MGS1 body exists.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DR. CLARK : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « GÉNÉTIQUE — support soins » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** DR. CLARK : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DR. CLARK. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 », présentation de Older ParaMedic/DrClark identity reconstruction before death, known originalMGS3 silhouette retained as project reference; no released MGS1 body exists., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Stabilisation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; DR. CLARK vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1.
- **round_loss :** Proposition CQC : DR. CLARK réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Protocole vital », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Intervention rapprochée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Action engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Balayage d’urgence » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Immobilisation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Stabilisation

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Stabilisation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Stabilisation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Kit d’urgence

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Kit d’urgence » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Kit d’urgence », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Relais médical

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Relais médical » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Relais médical » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Repli assisté » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Protocole vital

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Protocole vital » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Protocole vital », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DR. CLARK, préparer « Recalibrer » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Protocole vital — Protocole final

Famille `capture`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Protocole vital / Intervention rapprochée.

Plan 1 : DR. CLARK sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Protocole vital / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Protocole vital / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Stabilisation — Neutralisation

Famille `capture`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Stabilisation / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Stabilisation / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Stabilisation / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Kit d’urgence — Extraction

Famille `capture`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Kit d’urgence / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Kit d’urgence / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Kit d’urgence / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Relais médical — Fin de réseau

Famille `capture`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Relais médical / Intervention rapprochée.

Plan 1 : après une observation ou un repli, DR. CLARK reprend l’initiative par « Relais médical / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Relais médical / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact. Appearance follows the actual source scope documented below; reconstructed bodies are original project presentations and no released canonical complete-body certification is asserted.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/outfit/equipment/anatomical sides compared to the source extent explicitly recorded in review.sources.scope and identity-specific limits; unknown occluded details and game motions are authored adaptations. Renderer checks certify internal adaptation consistency, not an entire unseen canonical body.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Official Konami chronology establishes identity and birth1936, not an aged body or later wardrobe. Reference depicts young ParaMedic original MGS3/HD, not Delta.
- Fullbody reconstruction deliberately retains known original costume silhouette while authored aging is openly speculative; no body MGS1 appearance certified and no temporal appearance alias.
- DrClark is referenced retrospectively in MGS1; this art represents a pre-death older identity simulation, not a living character newly inserted into2005 canon.
- Sixteen keyposes per facing are authored gameplay adaptation.
- Known young ParaMedic face supplies identity only. Generated age lines/hair strands are a restrained visual age interpretation, not evidence of an official older Dr Clark facial model.
- [Official original MGS3/HD ParaMedic fullbody image physically viewed, distinct from Delta. Official Konami chronology confirms DrClark aliasParaMedic born22June1936. Aging and later wardrobe continuity are openly unverified reconstruction, no MGS1 model certificate.](https://www.konami.com/mg/archive/hd/lightbox/character/image/mgs3_paramedic_hef91d.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__carlos_esmeralda_mgs1

### CARLOS ESMERALDA — PROTOTYPE — MGS1

**Rôle :** CONTACT MUSICAL — support commandement. **Profil :** `analyst`.

**Base présente dans le code :** Personnage de prototype documenté ; son duel est une simulation historique.

**Incarnation à conserver :** Cut Mexican support mercenary nicknamed Mariachi/ElMariachi; body reconstruction, no recovered primary concept image.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** CARLOS ESMERALDA — PROTOTYPE : outil de lecture ou de communication montré par le profil, attitude d’observation. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « CONTACT MUSICAL — support commandement » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder outil de lecture ou de communication montré par le profil, attitude d’observation.
- **jump_land :** CARLOS ESMERALDA — PROTOTYPE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de CARLOS ESMERALDA — PROTOTYPE. Terminer par regard vers l’outil puis retour vers l’adversaire. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS1 », présentation de Cut Mexican support mercenary nicknamed Mariachi/ElMariachi; body reconstruction, no recovered primary concept image., puis outil de lecture ou de communication montré par le profil, attitude d’observation. Geste court lié à « Ordre de mission » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, regard vers l’outil puis retour vers l’adversaire ; CARLOS ESMERALDA — PROTOTYPE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS1.
- **round_loss :** Proposition CQC : CARLOS ESMERALDA — PROTOTYPE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Commandement total », revenir par regard vers l’outil puis retour vers l’adversaire, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Intervention rapprochée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Action engagée » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Balayage d’urgence » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Immobilisation » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Ordre de mission

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Ordre de mission » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Ordre de mission » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialDown — Ralliement

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Ralliement » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Ralliement », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialForward — Directive offensive

**Existant :** `mobility` / `movement` ; 7/18/25 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Directive offensive » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Directive offensive » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : 4 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : La silhouette reste touchable ; la sortie est punissable.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Repli assisté » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Préparer l’appui qui produit le déplacement ; déplacement prudent ; protéger l’outil plutôt qu’adopter une charge militaire.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Commandement total

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Commandement total » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Commandement total », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** regard vers l’outil puis retour vers l’adversaire.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de CARLOS ESMERALDA — PROTOTYPE, préparer « Recalibrer » ; outil de lecture ou de communication montré par le profil, attitude d’observation. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** regard vers l’outil puis retour vers l’adversaire. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Commandement total — Protocole final

Famille `cqc`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Commandement total / Intervention rapprochée.

Plan 1 : CARLOS ESMERALDA — PROTOTYPE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Commandement total / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Commandement total / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : regard vers l’outil puis retour vers l’adversaire, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ordre de mission — Neutralisation

Famille `cqc`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Ordre de mission / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Ordre de mission / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Ordre de mission / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : regard vers l’outil puis retour vers l’adversaire, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Ralliement — Extraction

Famille `cqc`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Ralliement / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Ralliement / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Ralliement / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : regard vers l’outil puis retour vers l’adversaire, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Directive offensive — Fin de réseau

Famille `cqc`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → counter → throw → pose. Appuis déclarés : Directive offensive / Intervention rapprochée.

Plan 1 : après une observation ou un repli, CARLOS ESMERALDA — PROTOTYPE reprend l’initiative par « Directive offensive / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Directive offensive / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : regard vers l’outil puis retour vers l’adversaire, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact. Appearance follows the actual source scope documented below; reconstructed bodies are original project presentations and no released canonical complete-body certification is asserted.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/outfit/equipment/anatomical sides compared to the source extent explicitly recorded in review.sources.scope and identity-specific limits; unknown occluded details and game motions are authored adaptations. Renderer checks certify internal adaptation consistency, not an entire unseen canonical body.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- No primary final complete body or facial turnaround was found. This visible full-body presentation is explicitly reconstructed from documented identity/role only, not certified canon.
- Sixteen independent complete native poses per facing are authored gameplay adaptations; legacy UID, saves, lore and combat mechanics are preserved.
- Primary concept artwork and original Edge86/World of Metal Gear Solid page scans were not recovered. Exact face, hair, age, skin tone, full costume, colour, guitar make and silhouette are reconstruction choices; identity/support guitar role relies on the cited secondary source.
- [Secondary documented cut identity states Mexican male support singer using a guitar, cites original Edge86 and World of Metal Gear Solid; those primary complete body visuals were not recovered. No canonical appearance certified.](https://metalgear.fandom.com/wiki/Carlos_Esmeralda) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__dead_cell_mystic_mgs2

### DEAD CELL MYSTIC — PROTOTYPE — MGS2

**Rôle :** ILLUSIONNISTE — support leurre. **Profil :** `psychic`.

**Base présente dans le code :** Concept abandonné de Dead Cell, présenté comme prototype et non comme membre canonique final.

**Incarnation à conserver :** Project Mystic UID rendered from one original unpublished Chinaman martial/qigong concept variant; no separate released character named Mystic certified.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** DEAD CELL MYSTIC — PROTOTYPE : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « ILLUSIONNISTE — support leurre » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** DEAD CELL MYSTIC — PROTOTYPE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de DEAD CELL MYSTIC — PROTOTYPE. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Project Mystic UID rendered from one original unpublished Chinaman martial/qigong concept variant; no separate released character named Mystic certified., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Leurre » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; DEAD CELL MYSTIC — PROTOTYPE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : DEAD CELL MYSTIC — PROTOTYPE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Dédoublement réseau », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Leurre

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Leurre » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Leurre » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Fausse signature

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Fausse signature » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Fausse signature » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Écho tactique

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Écho tactique » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Écho tactique » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Dédoublement réseau

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Dédoublement réseau » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Dédoublement réseau » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de DEAD CELL MYSTIC — PROTOTYPE, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Dédoublement réseau — Protocole final

Famille `psychic`, ton `simulation` ; 210 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Dédoublement réseau / Intervention rapprochée.

Plan 1 : DEAD CELL MYSTIC — PROTOTYPE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Dédoublement réseau / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Dédoublement réseau / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Leurre — Neutralisation

Famille `psychic`, ton `simulation` ; 222 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Leurre / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Leurre / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Leurre / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Fausse signature — Extraction

Famille `psychic`, ton `simulation` ; 234 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Fausse signature / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Fausse signature / Intervention rapprochée », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Fausse signature / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Écho tactique — Fin de réseau

Famille `psychic`, ton `simulation` ; 246 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Écho tactique / Intervention rapprochée.

Plan 1 : après une observation ou un repli, DEAD CELL MYSTIC — PROTOTYPE reprend l’initiative par « Écho tactique / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Écho tactique / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact. Appearance follows the actual source scope documented below; reconstructed bodies are original project presentations and no released canonical complete-body certification is asserted.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/outfit/equipment/anatomical sides compared to the source extent explicitly recorded in review.sources.scope and identity-specific limits; unknown occluded details and game motions are authored adaptations. Renderer checks certify internal adaptation consistency, not an entire unseen canonical body.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- No independently attested named Mystic body exists in recovered primary sources. The known Shinkawa Chinaman concept supplies a declared project adaptation for the preserved Mystic UID, not proof of a distinct released canonical character.
- This original sheet has multiple concept alternatives. Chosen LEFT braided/tattooed sleeveless variant is explicit, not a composite of sunglasses alternative.
- Original partial body does not show complete feet or exact colours; simple martial shoes/lower seams and neutral palette are restrained reconstruction.
- Legacy Mystic remains a project UID/name and its authored mechanics/lore remain; no distinct released DeadCell member namedMystic has been established.
- Sixteen keyposes per facing are authored gameplay adaptation.
- [Original Shinkawa sheet literally labelled Chinaman(unpublished), physically viewed. Original1990s MGS2 Grand GamePlan page27 documents DeadCell qigong/kungfu member. Project Mystic is qualified adaptation, not independent canonical name.](https://www.metalgearsolid.be/images/personnage-abandonne-chinaman-metal-gear-solid-2.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__old_boy_mgs2

### OLD BOY — PROTOTYPE — MGS2

**Rôle :** CQC EXPÉRIMENTAL — support couverture. **Profil :** `raven`.

**Base présente dans le code :** Concept de boss abandonné, utilisé uniquement comme simulation de design.

**Incarnation à conserver :** Original unpublished Shinkawa OldBoy/Oldman concept, full original coat/trousers/boots silhouette, never a final released MGS2 body.

**État vérifié :** attested-unpublished-original-concept-presentation-adaptation. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialDown ; `shoot` = special, specialForward, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** OLD BOY — PROTOTYPE : masse de l’arme et du corps visibles, appuis larges. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** accélération lente et compensation du poids de l’armement. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « CQC EXPÉRIMENTAL — support couverture » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder masse de l’arme et du corps visibles, appuis larges.
- **jump_land :** OLD BOY — PROTOTYPE : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. accélération lente et compensation du poids de l’armement. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de OLD BOY — PROTOTYPE. Terminer par arrêt de l’arme, inertie des accessoires puis garde. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Original unpublished Shinkawa OldBoy/Oldman concept, full original coat/trousers/boots silhouette, never a final released MGS2 body., puis masse de l’arme et du corps visibles, appuis larges. Geste court lié à « Couverture » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, arrêt de l’arme, inertie des accessoires puis garde ; OLD BOY — PROTOTYPE vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : OLD BOY — PROTOTYPE réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Forteresse mobile », revenir par arrêt de l’arme, inertie des accessoires puis garde, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Intervention rapprochée » ; masse de l’arme et du corps visibles, appuis larges. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Action engagée » ; masse de l’arme et du corps visibles, appuis larges. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Balayage d’urgence » ; masse de l’arme et du corps visibles, appuis larges. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Immobilisation » ; masse de l’arme et du corps visibles, appuis larges. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Couverture

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Couverture » ; masse de l’arme et du corps visibles, appuis larges. Montrer la prise et la visée de l’arme décrite par « Couverture » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 5 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialDown — Barrage défensif

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Barrage défensif » ; masse de l’arme et du corps visibles, appuis larges. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Barrage défensif » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialForward — Écran tactique

**Existant :** `projectile` / `ballistic` ; 22/1/36 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Écran tactique » ; masse de l’arme et du corps visibles, appuis larges. Montrer la prise et la visée de l’arme décrite par « Écran tactique » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 3 émissions, espacées de 5 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 3 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### specialBack — Repli assisté

**Existant :** `buff` / `armor` ; 22/1/31 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Repli assisté » ; masse de l’arme et du corps visibles, appuis larges. Montrer la préparation corporelle ou mécanique de « Repli assisté ».

**Action.** Activer la protection, le camouflage ou la posture définie par le profil ; conserver une silhouette qui montre la zone affectée et un effet indépendant indiquant sa durée.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Une expiration et une interruption ont leur transition propre ; l’effet ne demeure pas sur le costume suivant.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Absorbe une seule frappe ; projections, EMP et attaques brise-armure la contrent.

##### super — Forteresse mobile

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Forteresse mobile » ; masse de l’arme et du corps visibles, appuis larges. Montrer la prise et la visée de l’arme décrite par « Forteresse mobile » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 8 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 8 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 45/1/25 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de OLD BOY — PROTOTYPE, préparer « Recalibrer » ; masse de l’arme et du corps visibles, appuis larges. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** arrêt de l’arme, inertie des accessoires puis garde. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Refroidissement ou pause tactique interrompable ; aucun soin gratuit.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Forteresse mobile — Protocole final

Famille `tactical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Forteresse mobile / Intervention rapprochée.

Plan 1 : OLD BOY — PROTOTYPE sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Forteresse mobile / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Forteresse mobile / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Couverture — Neutralisation

Famille `tactical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Couverture / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Couverture / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Couverture / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Barrage défensif — Extraction

Famille `tactical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Barrage défensif / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Barrage défensif / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Barrage défensif / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Écran tactique — Fin de réseau

Famille `tactical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Écran tactique / Intervention rapprochée.

Plan 1 : après une observation ou un repli, OLD BOY — PROTOTYPE reprend l’initiative par « Écran tactique / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Écran tactique / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : arrêt de l’arme, inertie des accessoires puis garde, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact. Appearance follows the actual source scope documented below; reconstructed bodies are original project presentations and no released canonical complete-body certification is asserted.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/outfit/equipment/anatomical sides compared to the source extent explicitly recorded in review.sources.scope and identity-specific limits; unknown occluded details and game motions are authored adaptations. Renderer checks certify internal adaptation consistency, not an entire unseen canonical body.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Original concept provides complete head-to-boots silhouette and visible garment shapes; it is monochrome and no released MGS2 body exists. Selected restrained greys and unseen rear seams are interpretation.
- The planned lore describes a centenarian tactical genius, but drawn facial age/silhouette is followed rather than inventing extra deformity or another historical uniform.
- Sixteen keyposes per facing are authored gameplay adaptation, not original historical animation.
- [Original whole unpublished Shinkawa fullbody art mirrored by MGS.be, physically viewed; primary official Konami artbook interview corroborates Oldman tactical genius over100. Monochrome art has no released colour/model.](https://www.metalgearsolid.be/images/personnage-old-boy-man-devil-metal-gear-solid-2.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__max_wark_mgs2

### MAXINE « MAX » WORK — CONCEPT MGS2 — MGS2

**Rôle :** IA D’INFILTRATION — support intrusion. **Profil :** `psychic`.

**Base présente dans le code :** Prototype d’assistant numérique ; capacités de duel entièrement simulées.

**Incarnation à conserver :** Unreleased Maxine Work / Max human-looking AI support concept, original Shinkawa unpublished artwork.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** MAXINE « MAX » WORK — CONCEPT MGS2 : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IA D’INFILTRATION — support intrusion » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** MAXINE « MAX » WORK — CONCEPT MGS2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de MAXINE « MAX » WORK — CONCEPT MGS2. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Unreleased Maxine Work / Max human-looking AI support concept, original Shinkawa unpublished artwork., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Intrusion » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; MAXINE « MAX » WORK — CONCEPT MGS2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : MAXINE « MAX » WORK — CONCEPT MGS2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Réseau compromis », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Intrusion

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Intrusion » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Intrusion » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Piratage local

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Piratage local » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Piratage local » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Prise de contrôle

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Prise de contrôle » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Prise de contrôle » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Réseau compromis

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Réseau compromis » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Réseau compromis » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de MAXINE « MAX » WORK — CONCEPT MGS2, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Réseau compromis — Protocole final

Famille `psychic`, ton `simulation` ; 210 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Réseau compromis / Intervention rapprochée.

Plan 1 : MAXINE « MAX » WORK — CONCEPT MGS2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Réseau compromis / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Réseau compromis / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Intrusion — Neutralisation

Famille `psychic`, ton `simulation` ; 222 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Intrusion / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Intrusion / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : montrer la source corporelle ou matérielle de « Intrusion / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Piratage local — Extraction

Famille `psychic`, ton `simulation` ; 234 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Piratage local / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Piratage local / Intervention rapprochée », arme et main libre identifiées. Plan 2 : montrer la source corporelle ou matérielle de « Piratage local / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Prise de contrôle — Fin de réseau

Famille `psychic`, ton `simulation` ; 246 ticks CQC ; phases actuelles : focus → distort → release → pose. Appuis déclarés : Prise de contrôle / Intervention rapprochée.

Plan 1 : après une observation ou un repli, MAXINE « MAX » WORK — CONCEPT MGS2 reprend l’initiative par « Prise de contrôle / Intervention rapprochée ». Plan 2 : montrer la source corporelle ou matérielle de « Prise de contrôle / Intervention rapprochée ». Plan 3 : développer l’effet psychic en couches indépendantes puis une réaction de cible adaptée, tout en conservant les poses corporelles visibles. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Unpublished abandoned concept; neither final released canon appearance nor canon colours claimed.
- Only head studies and seated partial body exist in reference; full lower legs, shoes and unseen seams are restrained authored adaptation.
- Original design plan identifies Maxine Work as AI construct appearing as female Codec support, not literal hardware. Legacy max_wark UID remains unchanged.
- Sixteen defensive support keyposes per direction are authored gameplay adaptation, no original full-body animation claim.
- Original unpublished monochrome concept shows seated partial body; full standing legs, low shoes, grey palette and authored poses are explicit restrained project interpretation, not released canonical appearance.
- [Official Shinkawa unpublishedMax head studies and seated partial-body drawing mirrored by MGS.be; physically viewed. Original Grand Game Plan describes female Codec-only AI support, not literal hardware.](https://www.metalgearsolid.be/images/personnage-abandonne-maxime-max-metal-gear-solid-2.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__doc_wilson_mgs2

### WILLIAM « DOC » WILSON — CONCEPT MGS2 — MGS2

**Rôle :** IA MÉDICALE — support soins. **Profil :** `psychic`.

**Base présente dans le code :** Prototype d’IA médicale ; aucune participation physique canonique revendiquée.

**Incarnation à conserver :** Unreleased William Doc Wilson human-looking AI mathematician support concept, glasses profile variant from original Shinkawa unpublished sheet.

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** WILLIAM « DOC » WILSON — CONCEPT MGS2 : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IA MÉDICALE — support soins » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** WILLIAM « DOC » WILSON — CONCEPT MGS2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de WILLIAM « DOC » WILSON — CONCEPT MGS2. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Unreleased William Doc Wilson human-looking AI mathematician support concept, glasses profile variant from original Shinkawa unpublished sheet., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Stabilisation » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; WILLIAM « DOC » WILSON — CONCEPT MGS2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : WILLIAM « DOC » WILSON — CONCEPT MGS2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Protocole vital », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Stabilisation

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Stabilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Stabilisation » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Kit d’urgence

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Kit d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Kit d’urgence » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Relais médical

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Relais médical » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Relais médical » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Protocole vital

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Protocole vital » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Protocole vital » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de WILLIAM « DOC » WILSON — CONCEPT MGS2, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Protocole vital — Protocole final

Famille `capture`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Protocole vital / Intervention rapprochée.

Plan 1 : WILLIAM « DOC » WILSON — CONCEPT MGS2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Protocole vital / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Protocole vital / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Stabilisation — Neutralisation

Famille `capture`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Stabilisation / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Stabilisation / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Stabilisation / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Kit d’urgence — Extraction

Famille `capture`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Kit d’urgence / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Kit d’urgence / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Kit d’urgence / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Relais médical — Fin de réseau

Famille `capture`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Relais médical / Intervention rapprochée.

Plan 1 : après une observation ou un repli, WILLIAM « DOC » WILSON — CONCEPT MGS2 reprend l’initiative par « Relais médical / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Relais médical / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Abandoned unpublished concept, glasses-profile variant explicitly selected; no final released appearance or colours certified.
- ID badge on anatomical LEFT chest is preserved; unreadable badge text not invented as official content.
- Original Grand Game Plan calls Doc an early30s mathematician and developer of Arsenal AI, actually AI construct. No literal terminal/hardware or hospital physician uniform inferred.
- Complete plain legs/shoes and32defensive keyposes are authored requested gameplay adaptation from partial concept, not original animation.
- [Official Shinkawa unpublishedDoc head/chest studies including glasses profile, mirrored by MGS.be and physically viewed. Original Grand Game Plan calls him brilliant mathematician in early30s, AI construct.](https://www.metalgearsolid.be/images/personnage-abandonne-doc-william-wilson-metal-gear-solid-2-s.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__daniel_quinn_mgs2

### COLONEL DANIEL QUINN — CONCEPT MGS2 — MGS2

**Rôle :** IA TACTIQUE — support recon. **Profil :** `psychic`.

**Base présente dans le code :** Prototype d’IA tactique ; profil conservé comme archive de conception.

**Incarnation à conserver :** Abandoned pre-release Colonel support named Daniel Quinn; human-looking AI concept described as resembling Campbell, not the released Colonel final appearance.

**État vérifié :** unattested-body-presentation-reconstruction. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `deploy` = special, specialDown, super.

**Techniques pointant sur une seule région native dans la direction principale :** special, specialDown, specialBack, super, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** COLONEL DANIEL QUINN — CONCEPT MGS2 : regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** mouvement et éventuelle sustentation distingués de l’effet psychique. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IA TACTIQUE — support recon » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile.
- **jump_land :** COLONEL DANIEL QUINN — CONCEPT MGS2 : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. mouvement et éventuelle sustentation distingués de l’effet psychique. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de COLONEL DANIEL QUINN — CONCEPT MGS2. Terminer par cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS2 », présentation de Abandoned pre-release Colonel support named Daniel Quinn; human-looking AI concept described as resembling Campbell, not the released Colonel final appearance., puis regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Geste court lié à « Scan de terrain » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, cesser le geste de concentration puis revenir à la posture propre à l’incarnation ; COLONEL DANIEL QUINN — CONCEPT MGS2 vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS2.
- **round_loss :** Proposition CQC : COLONEL DANIEL QUINN — CONCEPT MGS2 réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction renseignée », revenir par cesser le geste de concentration puis revenir à la posture propre à l’incarnation, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Intervention rapprochée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Action engagée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Balayage d’urgence » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Immobilisation » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Scan de terrain

**Existant :** `projectile` / `psychic` ; 27/1/30 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Scan de terrain » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Scan de terrain » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projectile lent et visible : sauter, bloquer ou détruire avec une attaque.

##### specialDown — Marquage prioritaire

**Existant :** `projectile` / `bind` ; 32/1/34 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Marquage prioritaire » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Marquage prioritaire » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet bind de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut ou garde basse ; ralentissement bref, aucune confiscation des commandes.

##### specialForward — Réseau de veille

**Existant :** `mobility` / `psychic` ; 23/1/28 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Réseau de veille » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Préparer l’appui qui produit le déplacement ; mouvement et éventuelle sustentation distingués de l’effet psychique.

**Action.** Exécuter « Réseau de veille » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Départ et arrivée indiqués ; pas de téléportation derrière la cible ni hors arène.

##### specialBack — Repli assisté

**Existant :** `parry` / `counter` ; 5/12/28 ticks ; groupe `parry`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Repli assisté » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Présenter la surface ou l’organe de parade et maintenir une fenêtre courte lisible.

**Action.** Recevoir puis dévier au contact réel pour « Repli assisté » ; la riposte et son effet n’apparaissent qu’après succès. Une attente sans contact garde une pose différente du contre réussi.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Séparer sortie ratée, blocage simple et riposte ; aucun effet de réussite avant collision.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Projections, attaques au corps à corps et explosifs au sol ne sont pas renvoyés.

##### super — Extraction renseignée

**Existant :** `projectile` / `psychic` ; 35/1/44 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Extraction renseignée » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Donner à la source de « Extraction renseignée » une préparation lisible : main, outil ou organe indiqué par le profil, sans arme ajoutée.

**Action.** Détacher l’effet psychic de son point d’origine, conserver un corps actif visible puis laisser l’effet suivre sa trajectoire moteur ; ne pas assimiler cette émission à un tir de pistolet. La salve contient 5 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 5 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de COLONEL DANIEL QUINN — CONCEPT MGS2, préparer « Recalibrer » ; regard, mains et source de pouvoir propres au personnage ; aucune arme induite par le type de projectile. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** cesser le geste de concentration puis revenir à la posture propre à l’incarnation. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction renseignée — Protocole final

Famille `tactical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Extraction renseignée / Intervention rapprochée.

Plan 1 : COLONEL DANIEL QUINN — CONCEPT MGS2 sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction renseignée / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Extraction renseignée / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Scan de terrain — Neutralisation

Famille `tactical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Scan de terrain / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Scan de terrain / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Scan de terrain / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Marquage prioritaire — Extraction

Famille `tactical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Marquage prioritaire / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Marquage prioritaire / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Marquage prioritaire / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Réseau de veille — Fin de réseau

Famille `tactical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Réseau de veille / Intervention rapprochée.

Plan 1 : après une observation ou un repli, COLONEL DANIEL QUINN — CONCEPT MGS2 reprend l’initiative par « Réseau de veille / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Réseau de veille / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : cesser le geste de concentration puis revenir à la posture propre à l’incarnation, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact. Appearance follows the actual source scope documented below; reconstructed bodies are original project presentations and no released canonical complete-body certification is asserted.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/outfit/equipment/anatomical sides compared to the source extent explicitly recorded in review.sources.scope and identity-specific limits; unknown occluded details and game motions are authored adaptations. Renderer checks certify internal adaptation consistency, not an entire unseen canonical body.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- DanielQuinn name and Campbell resemblance are supported by an abandoned development document; no independent canonical body, detailed uniform, exact colours or facial turnaround is attested. This complete sprite is explicitly a qualified project reconstruction.
- Known Campbell art is a resemblance aid only; no identity merge, visual alias, releasedMGS2 final-model certification, UID/save/lore or combat semantics change.
- Native16complete gameplay poses per direction are authored adaptations, not documented original animation.
- [Original development GamePlan English translation pages26-27 states Daniel Quinn resembles Campbell. Original Shinkawa MGS2 Campbell body concept is only a conservative resemblance supplement; no independent DanielQuinn full-body drawing was found.](https://www.unseen64.net/wp-content/uploads/2008/04/metal-gear-solid-2-design-document.pdf) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__tatyana_mgs3

### TATYANA — MGS3

**Rôle :** IDENTITÉ DE COUVERTURE — support furtivité. **Profil :** `soldier`.

**Base présente dans le code :** Identité de couverture d’EVA, séparée pour son apparence et son contexte.

**Incarnation à conserver :** Classic PS2 Soviet-officer disguise; independent from EVA biker/MPO/Delta incarnations

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, specialForward ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** specialDown, specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`, `appearance-core-eva-mgs3`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** TATYANA : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IDENTITÉ DE COUVERTURE — support furtivité » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** TATYANA : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de TATYANA. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 », présentation de Classic PS2 Soviet-officer disguise; independent from EVA biker/MPO/Delta incarnations, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Voile furtif » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; TATYANA vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3.
- **round_loss :** Proposition CQC : TATYANA réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction fantôme », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Intervention rapprochée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Action engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Balayage d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Immobilisation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Voile furtif

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Voile furtif » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Voile furtif » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Repli masqué

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Repli masqué » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Repli masqué », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Route invisible

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Route invisible » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Route invisible » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Repli assisté » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Extraction fantôme

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Extraction fantôme » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Extraction fantôme » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de TATYANA, préparer « Recalibrer » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction fantôme — Protocole final

Famille `capture`, ton `simulation` ; 210 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Extraction fantôme / Intervention rapprochée.

Plan 1 : TATYANA sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction fantôme / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Extraction fantôme / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Voile furtif — Neutralisation

Famille `capture`, ton `simulation` ; 222 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Voile furtif / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Voile furtif / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : contact de saisie ou neutralisation lié à « Voile furtif / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Repli masqué — Extraction

Famille `capture`, ton `simulation` ; 234 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Repli masqué / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Repli masqué / Intervention rapprochée », arme et main libre identifiées. Plan 2 : contact de saisie ou neutralisation lié à « Repli masqué / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Route invisible — Fin de réseau

Famille `capture`, ton `simulation` ; 246 ticks CQC ; phases actuelles : approach → restrain → extract → pose. Appuis déclarés : Route invisible / Intervention rapprochée.

Plan 1 : après une observation ou un repli, TATYANA reprend l’initiative par « Route invisible / Intervention rapprochée ». Plan 2 : contact de saisie ou neutralisation lié à « Route invisible / Intervention rapprochée », confirmé avant déplacement de la victime. Plan 3 : déséquilibre puis immobilisation/projection, avec poses simultanées des deux acteurs et main/pince ancrée au bon endroit. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Identity/reference scope/equipment and anatomical sides reviewed within the explicitly stated source limits; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Fan-port screenshot has GTA SA rigging limitations, not a new official pose or direct original-game frame.
- Lowerbody silhouette reconciles concept and real boot closeup; exact skirt length, tights and microtextures remain qualified reconstruction.
- Authored CQC animation, not original-game motion; actual atlas unarmed hence visualFirearmPresent:false.
- V1 originals rejected for first-row hair clipping retained; V2 selected only after fullbody geometry checks.
- [Original PS2 model head/uniform rehosted in public GTA port physically inspected with fan-port limitations. Social Ops card corroborates classic green high-collar tunic, red collar/shoulder details, blond combed-back hair, clear spectacles, skirt. Official book concept gives conservative skirt silhouette (concept not final released mesh); actual game shot establishes brown laceup calf military boots. All four source files preserved unmodified.](https://thinkinthinkin.wordpress.com/2020/10/09/cut-content-metal-gear-solid-3-snake-eater/) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__adam_mgs3

### ADAM — MGS3

**Rôle :** IDENTITÉ DE COUVERTURE — support recon. **Profil :** `soldier`.

**Base présente dans le code :** Nom de code attendu lors de l’opération Snake Eater ; profil d’identité simulé.

**Incarnation à conserver :** ADAM code identity; expressly selected original1964 young Ocelot first-SAA-duel appearance, no new disguise asserted

**État vérifié :** métadonnées natives avec limites. 72 régions source distinctes dans les deux directions ; groupes : idle, walk, guard, charge, crouch, low, punch, hit, ko, throw, shoot, deploy, reload, parry, attack.

**Réemplois à examiner :** `punch` = light, heavy ; `shoot` = special, super.

**Techniques pointant sur une seule région native dans la direction principale :** aucune dans le mapping natif observé, ou route machine. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** ADAM : appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Respiration discrète du thorax, regard stable et mouvements secondaires du tissu/cheveu. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** pas courts, crosse/équipement conservés près du torse. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « IDENTITÉ DE COUVERTURE — support recon » : garde haute des avant-bras ou de l’arme ; garde basse par flexion réelle des hanches et genoux ; recul bloqué distinct de la simple position basse. Garder appui militaire stable, arme maintenue dans l’axe et regard vers la menace.
- **jump_land :** ADAM : compression des jambes, impulsion, montée, sommet, descente puis absorption de réception. pas courts, crosse/équipement conservés près du torse. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Impacts distincts à la tête, au torse et aux jambes, perte d’appui, chute puis relevé avec main/genou d’appui de ADAM. Terminer par retour en couverture de l’arme après le coup. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 », présentation de ADAM code identity; expressly selected original1964 young Ocelot first-SAA-duel appearance, no new disguise asserted, puis appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Geste court lié à « Scan de terrain » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retour en couverture de l’arme après le coup ; ADAM vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3.
- **round_loss :** Proposition CQC : ADAM réagit au résultat, reprend son souffle, se redresse par les hanches et les jambes, contrôle son équipement puis revient en garde. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction renseignée », revenir par retour en couverture de l’arme après le coup, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Intervention rapprochée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `punch`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Action engagée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Balayage d’urgence » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `grapple` ; 8/2/34 ticks ; groupe `throw`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Immobilisation » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Avancer le point de saisie avec une main/pince libre, sans déplacer la cible avant confirmation.

**Action.** Verrouiller le contact seulement après réussite, décaler le centre de gravité adverse, faire passer la victime par le point de rotation puis relâcher. Dessiner simultanément les poses de l’attaquant et de la victime.

**Retour.** retour en couverture de l’arme après le coup. Prévoir une prise ratée avec retrait visible, une déchoppe et une alternative pour les corps non saisissables.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Reculer, sauter ou déchoper pendant la courte fenêtre de saisie.

##### special — Scan de terrain

**Existant :** `projectile` / `ballistic` ; 14/1/22 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Scan de terrain » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Scan de terrain » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Accroupissement, garde haute, parade de projectile ou saut.

##### specialDown — Marquage prioritaire

**Existant :** `projectile` / `explosive` ; 24/1/31 ticks ; groupe `deploy`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Marquage prioritaire » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Prélever l’objet correspondant à « Marquage prioritaire », armer le geste et garder visible la main ou l’organe de lancement.

**Action.** Lâcher l’objet à la frame d’activation puis continuer le geste de la main ; sa trajectoire, rotation et éventuel retour ne sont pas peints dans le corps. L’objet conserve sa mèche de 62 ticks ; préparation, vol et détonation ont des états séparés.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Éviter l’arc puis le cercle d’explosion ; grenade désamorçable par une attaque avant la détonation.

##### specialForward — Réseau de veille

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `charge`, 4/4 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Réseau de veille » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Réseau de veille » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retour en couverture de l’arme après le coup.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `parry`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Repli assisté » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Préparer l’appui qui produit le déplacement ; pas courts, crosse/équipement conservés près du torse.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -7 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retour en couverture de l’arme après le coup. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Extraction renseignée

**Existant :** `projectile` / `ballistic` ; 35/1/44 ticks ; groupe `shoot`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Extraction renseignée » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Montrer la prise et la visée de l’arme décrite par « Extraction renseignée » ; l’épaulé et l’œil de visée appartiennent à cette incarnation.

**Action.** Émettre depuis la bouche réelle de l’arme ou l’organe source, puis afficher le recul et le retour de l’axe. Le projectile est une entité séparée ; flash, fumée et éjection n’apparaissent que si le type d’arme le justifie. La salve contient 6 émissions, espacées de 6 ticks CQC : recalculer le point de bouche à chaque départ.

**Retour.** retour en couverture de l’arme après le coup. Conserver l’arme/objet restant dans sa vraie main ; raccord de récupération distinct de l’impact sur la cible.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : 6 projectiles distincts ; préparation et récupération punissables, aucune visée parfaite.

##### utility — Recalibrer

**Existant :** `reload` / `reload` ; 54/1/20 ticks ; groupe `reload`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de ADAM, préparer « Recalibrer » ; appui militaire stable, arme maintenue dans l’axe et regard vers la menace. Abaisser l’arme en sécurité puis accéder à ses munitions réelles.

**Action.** Pour « Recalibrer », montrer extraction/ouverture, prise des munitions, insertion puis fermeture ou armement selon le modèle. Ne pas utiliser le même changement de chargeur pour un revolver, une carabine et un lanceur.

**Retour.** retour en couverture de l’arme après le coup. La jauge n’est remplie qu’au moment prévu ; une interruption doit conserver la bonne pose d’arme.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Punir avant le remplissage ; une recharge interrompue ne rend aucune cartouche.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction renseignée — Protocole final

Famille `tactical`, ton `simulation` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Extraction renseignée / Intervention rapprochée.

Plan 1 : ADAM sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction renseignée / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Extraction renseignée / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retour en couverture de l’arme après le coup, pose de signature face à l’adversaire. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Scan de terrain — Neutralisation

Famille `tactical`, ton `simulation` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Scan de terrain / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Scan de terrain / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Scan de terrain / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retour en couverture de l’arme après le coup, arrêt du dispositif et retour au cadre d’ensemble. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Marquage prioritaire — Extraction

Famille `tactical`, ton `simulation` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Marquage prioritaire / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Marquage prioritaire / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Marquage prioritaire / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retour en couverture de l’arme après le coup, prise de distance et maintien final. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

##### Réseau de veille — Fin de réseau

Famille `tactical`, ton `simulation` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Réseau de veille / Intervention rapprochée.

Plan 1 : après une observation ou un repli, ADAM reprend l’initiative par « Réseau de veille / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Réseau de veille / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retour en couverture de l’arme après le coup, rangement/pose finale différente des trois autres. Respecter le ton simulation enregistré : conclusion de simulation/neutralisation, sans transformer la fiche en mort canonique.

#### Limites et preuves

- Aim 1:1, accepted closest original PS2 source adaptation. Original 3D character translated to new 2D action artwork; not the original extracted animation frames and not absolute 1:1 certification.
- Target is young Ocelot first SAA duel in 1964 in original MGS3 PS2. Initial Makarov promo harness and gun are excluded; no older MGS1/MGS2/Delta/MP0 incarnation is merged.
- PS2-era source footage was archived in 2010, before HD/Delta. Exact Snake Eater/Subsistence pressing is not separately certified; original character model/cutscenes are shared, and hardware-era source is explicit.
- Bandolier in actual frontal first-duel captures runs from anatomical RIGHT shoulder to LEFT hip. Earlier exact stored generation prompts mention initial LEFT-to-RIGHT harness direction; actual combat captures and final visual review override that exploratory assumption without rewriting history.
- Projection of small medals, engraving, ammo-loop counts and concealed far-side equipment is approximate at atlas scale. Cartridge bandolier/belt and long two SAA holsters are present on all final sheets.
- Four walk/mobility phases are authored CQC adaptations, not source-extracted PS2 animation. Original young Ocelot also spins guns in source cutscene, but shipped ten-slot moveset has no independent spin command; no new spin move is invented.
- shoot/deploy show one SAA held and the other holstered; no simultaneous dual-fire artwork is claimed. deploy is a low SAA ricochet aiming pose, not an explosive or grenade.
- reload depicts single-action loading-gate manipulation with fixed cylinder, one held gun per pose. The source has two six-round SAA cylinders/12 shots. Historical shipped resource limit6 is a balancing adaptation; a separately documented runtime overlay may correct total reserve to12.
- Baret remains worn throughout the artwork; original duel can knock it off. No detached hat effect/state is claimed.
- Normal strikes, grapple, backward step, gunbutt parry and exact timings are CQC balancing adaptations; equipment/body remains original. No original-game CQC technique certification is claimed.
- Accepted closest 2D adaptation with 1:1 source identity as target; exact source model geometry/engraving/animation is not certified. Independently generated C-right reload figures vary slightly in stature within their source; one fixed observed upright source scale is retained so low retreat, crouch and KO never stretch to standing height.
- All six final source sheets were viewed whole by the integrator; obsolete C-left 01/02 boot-edge variants remain rejected. Original PS2 first-duel frame0718 viewed and confirms young face/beret/scarf, red gloves, RIGHT-shoulder cartridge strap and two SAA, 12 shots. Agent viewed the other recorded source frames.
- Presentation expressly chooses the already approved original PS2 young Ocelot first-SAA-duel body as representation of revealed ADAM identity; no separate ADAM disguise or original ADAM-specific combat model is asserted.
- Exact independent ADAM UID/lore/moves/save retained; artwork alias only, rifle placeholder is not invented as canon equipment.
- All six original native source sheets physically viewed whole in both facings; red beret/scarf/gloves, charcoal GRU tunic, cartridge harness, two brown SAA holsters and tall black boots match chosen classic source. Not MGS1/MGSV/Delta Ocelot.
- No new physical appearance or source keyposes generated/counted; preserves all original source SHA and review limits.
- Discarded ADAMMGS4 prototype remains completely independent and is excluded from this alias.
- [Référence déclarée](https://www.konami.com/mg/archive/mgs3/english/pic/chara_ocelot_pic.gif) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/mgs3_art_g_0036.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://www.metalgearsolid.be/images/saa.jpg) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Référence déclarée](https://archive.org/download/LP_Metal_Gear_Solid_3/mgs3_12.mp4) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).


## npc53__end_parrot_mgs3

### THE END’S PARROT — MGS3

**Rôle :** RECONNAISSANCE ANIMALE — support recon. **Profil :** `dog`.

**Base présente dans le code :** Compagnon de repérage de The End, adapté comme petite unité de reconnaissance.

**Incarnation à conserver :** Original green companion bird of The End,1964

**État vérifié :** métadonnées natives avec limites. 30 régions source distinctes dans les deux directions ; groupes : idle, guard, walk, crouch, jump, attack, punch, heavy, low, throw, deploy, shoot, reload, optic, recover, blade, roll, charge, parry, hit, ko.

**Réemplois à examiner :** `punch` = light, special, specialDown, super ; `heavy` = heavy, specialForward.

**Techniques pointant sur une seule région native dans la direction principale :** specialBack, utility. Une articulation contextuelle peut encore intervenir ; ce compte ne prouve pas un rendu immobile.

**Variantes à couvrir par le même contrat :** `original`.

**États communs individualisés — propositions à produire/compléter :**

- **idle :** THE END’S PARROT : tête, harnais, pattes et accessoires du chien dans cette version. Respiration et petit mouvement de tête/oreilles/queue selon l’anatomie ; les pattes restent stables. Boucle sans translation d’appui. Stature et âge de cette incarnation conservés.
- **locomotion :** trot/courte course à quatre appuis, pivot avec patte d’appui. Produire avant/arrière, départ, freinage, demi-tour et dash ; les membres, tissus et arme conservent leur retard et leur côté.
- **guard_high_low :** Pour « RECONNAISSANCE ANIMALE — support recon » : abaissement et orientation défensive de la tête et du tronc ; ne pas ajouter une parade humaine à deux bras ; recul bloqué distinct de la simple position basse. Garder tête, harnais, pattes et accessoires du chien dans cette version.
- **jump_land :** THE END’S PARROT : regroupement des appuis arrière, bond, extension en vol puis réception par les appuis avant et arrière adaptés à l’espèce. trot/courte course à quatre appuis, pivot avec patte d’appui. Si ce mouvement n’est pas observé dans la référence, noter l’adaptation CQC et ne pas le certifier officiel.
- **hit_fall_getup :** Réactions de tête, de flanc et de patte de THE END’S PARROT, perte d’appui puis relevé par les membres réellement présents. Terminer par retrait de la tête ou de l’outil et retour quadrupède. Les accessoires et organes restent attachés à leurs emplacements.
- **intro_duel :** Proposition CQC : entrée raccordée au lieu de « MGS3 », présentation de Original green companion bird of The End,1964, puis tête, harnais, pattes et accessoires du chien dans cette version. Geste court lié à « Scan de terrain » sans déclencher ses dégâts.
- **round_win :** Proposition CQC : après l’arrêt, retrait de la tête ou de l’outil et retour quadrupède ; THE END’S PARROT vérifie l’adversaire ou son outil, puis reprend sa garde pour la manche suivante. Conserver les signes propres à MGS3.
- **round_loss :** Proposition CQC : THE END’S PARROT relève la tête, rassemble ses appuis, répartit son poids puis reprend sa position d’attente ; aucun redressement humain. Pas de décès narratif imposé par un KO de manche.
- **outro_match :** Proposition CQC : achever la signature « Extraction renseignée », revenir par retrait de la tête ou de l’outil et retour quadrupède, puis sortie/pose différente de l’intro. Épilogue multi-scène et illustration finale sont des contenus séparés à relier.

#### Dix techniques actuelles et storyboard de production

Les durées sont en **ticks de simulation CQC à 60 Hz**, dans l’ordre anticipation / actif / récupération. Un groupe indiqué est déclaratif tant que sa résolution contextuelle ou son rig spécifique n’a pas été revérifié.

##### light — Intervention rapprochée

**Existant :** `melee` / `strike` ; 6/3/12 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Intervention rapprochée » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Intervention rapprochée » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### heavy — Action engagée

**Existant :** `melee` / `strike` ; 14/5/24 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Action engagée » ; tête, harnais, pattes et accessoires du chien dans cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Action engagée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Bloquer puis punir la récupération ; les projections battent les défenses de frappe.

##### low — Balayage d’urgence

**Existant :** `melee` / `strike` ; 12/4/23 ticks ; groupe `low`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Balayage d’urgence » ; tête, harnais, pattes et accessoires du chien dans cette version. Abaisser le centre de gravité et charger l’appui arrière.

**Action.** Étendre le membre ou l’organe autorisé au niveau bas ; montrer un contact distinct de la frappe debout, sans comprimer le sprite entier.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Garde basse ou saut ; garde debout insuffisante.

##### throw — Immobilisation

**Existant :** `melee` / `strike` ; 12/4/29 ticks ; groupe `throw`, 2/2 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Immobilisation » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Immobilisation » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### special — Scan de terrain

**Existant :** `melee` / `strike` ; 18/7/32 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Scan de terrain » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Scan de terrain » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Saut, garde ou projection anticipée ; la charge ne traverse pas librement la cible.

##### specialDown — Marquage prioritaire

**Existant :** `melee` / `electric` ; 17/5/29 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Marquage prioritaire » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer un mouvement compact de la main ou de l’organe disponible.

**Action.** Déclencher « Marquage prioritaire » par un geste bref, l’extension maximale tombant dans la fenêtre active ; garder le reste du corps en défense. L’effet electric reste séparé du membre ; son apparition et sa disparition suivent les événements du profil.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Espacement ou garde ; choc bref avec résistance temporaire après application.

##### specialForward — Réseau de veille

**Existant :** `mark` / `recon` ; 26/1/30 ticks ; groupe `heavy`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Réseau de veille » ; tête, harnais, pattes et accessoires du chien dans cette version. Orienter regard, optique ou terminal vers la cible observée, sans consulter une action future.

**Action.** Pour « Réseau de veille », déclencher lecture/repérage avec un petit geste ou changement d’optique et un indicateur séparé. Le corps doit rester visible et vulnérable selon les données de combat.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède. Couper le signal ou abaisser l’outil ; retour vers l’adversaire sans nouvelle arme inventée.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Portée limitée ; le marquage ne vise ni à travers toute l’arène ni automatiquement.

##### specialBack — Repli assisté

**Existant :** `mobility` / `movement` ; 4/18/23 ticks ; groupe `guard`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Repli assisté » ; tête, harnais, pattes et accessoires du chien dans cette version. Préparer l’appui qui produit le déplacement ; trot/courte course à quatre appuis, pivot avec patte d’appui.

**Action.** Exécuter « Repli assisté » dans la direction et sur la durée du profil. Garder un point d’appui, une poussée ou un effet de déplacement identifiable ; ne pas faire passer une translation du sprite pour un cycle dessiné. Déplacement déclaré : -8 unités par tick actif avant mise à l’échelle du moteur.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède. Dessiner freinage, retour de l’arme et reprise de garde ; raccord particulier si la technique finit en l’air.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Pas d’invincibilité générale ; poursuivre ou attaquer bas à la sortie.

##### super — Extraction renseignée

**Existant :** `melee` / `strike` ; 25/7/44 ticks ; groupe `punch`, 3/3 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Extraction renseignée » ; tête, harnais, pattes et accessoires du chien dans cette version. Marquer le transfert de poids et le grand armé ; garder la signature corporelle propre au profil.

**Action.** Accélérer la frappe engagée de « Extraction renseignée », donner une silhouette de contact différente du jab, puis laisser le corps finir l’élan.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Super télégraphiée, pas de poursuite automatique ; garde puis punition.

##### utility — Recalibrer

**Existant :** `recover` / `recovery` ; 40/1/28 ticks ; groupe `recover`, 1/1 régions par direction. runtime actionName.

**Préparation.** Depuis la garde de THE END’S PARROT, préparer « Recalibrer » ; tête, harnais, pattes et accessoires du chien dans cette version. Dégager la posture et sortir l’objet/mettre en place le geste indiqué par « Recalibrer ».

**Action.** Montrer clairement la récupération : souffle, outil de soin, refroidissement ou réparation selon le profil ; sa jauge et son effet restent liés à l’activation réelle. Le geste est une adaptation lorsque la source ne montre pas ce soin.

**Retour.** retrait de la tête ou de l’outil et retour quadrupède. Ranger l’outil ou cesser l’effet ; conserver une récupération interrompue distincte de la réussite.

**À valider.** Vérifier les deux directions, le contact exact, l’arme et son côté, le sol, les sorties en interruption et la variante de costume. Contre-jeu à conserver : Interrompre la récupération ; action sans protection.

#### Quatre finishers du registre et storyboards proposés

Les fiches existent. Leur présence ne prouve pas quatre séquences natives uniques ; attaquant, victime, accessoires et transitions restent à vérifier/produire.

##### Extraction renseignée — Protocole final

Famille `tactical`, ton `stylized` ; 210 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Extraction renseignée / Intervention rapprochée.

Plan 1 : THE END’S PARROT sécurise son appui, regarde la cible et prépare l’outil ou le geste de « Extraction renseignée / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Extraction renseignée / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : retombée de l’effet et réaction finale propre au corps de la victime. Plan 5 : retrait de la tête ou de l’outil et retour quadrupède, pose de signature face à l’adversaire.

##### Scan de terrain — Neutralisation

Famille `tactical`, ton `stylized` ; 222 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Scan de terrain / Intervention rapprochée.

Plan 1 : montrer le placement et la trajectoire basse/de zone de « Scan de terrain / Intervention rapprochée » ; l’espace disponible doit être lisible. Plan 2 : matérialiser le geste tactique « Scan de terrain / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : montrer l’issue de la zone et le retrait de la main/arme. Plan 5 : retrait de la tête ou de l’outil et retour quadrupède, arrêt du dispositif et retour au cadre d’ensemble.

##### Marquage prioritaire — Extraction

Famille `tactical`, ton `stylized` ; 234 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Marquage prioritaire / Intervention rapprochée.

Plan 1 : approche jusqu’à la distance réelle de « Marquage prioritaire / Intervention rapprochée », arme et main libre identifiées. Plan 2 : matérialiser le geste tactique « Marquage prioritaire / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : libérer le contact et laisser la victime rejoindre le sol par sa propre animation. Plan 5 : retrait de la tête ou de l’outil et retour quadrupède, prise de distance et maintien final.

##### Réseau de veille — Fin de réseau

Famille `tactical`, ton `stylized` ; 246 ticks CQC ; phases actuelles : mark → advance → secure → pose. Appuis déclarés : Réseau de veille / Intervention rapprochée.

Plan 1 : après une observation ou un repli, THE END’S PARROT reprend l’initiative par « Réseau de veille / Intervention rapprochée ». Plan 2 : matérialiser le geste tactique « Réseau de veille / Intervention rapprochée » par l’outil du profil. Plan 3 : montrer son effet et la réaction de la cible avec des poses spécifiques, sans employer seulement un flash plein écran. Plan 4 : interrompre l’outil ou l’effet de façon volontaire, constater le résultat. Plan 5 : retrait de la tête ou de l’outil et retour quadrupède, rangement/pose finale différente des trois autres.

#### Limites et preuves

- Generated native pixels remain intact; source reviewed against identified canonical reference. This is a faithful 2.5D adaptation, not certified pixel-perfect 1:1 original game footage.
- Sixteen actual authored physical keyposes per direction,32 per fighter; action groups explicitly share keyposes. No 72-frame or motion-capture claim.
- Canonical identity/outfit/equipment/anatomical sides reviewed; gameplay mechanics, hitboxes and original moves remain authored game adaptations.
- Canvas source rectangles and optional vector silhouette clipping isolate native poses without rewriting PNG pixels.
- Bird body/face/feather palette come from the small classic released render; fine individual feather contours and occluded tail underside are faithful generated adaptation, not fully attested original geometry.
- Bird-only motions use wings,beak and talons; no equipped firearm and no human arms/feet invented. Gameplay remains the existing playable animal adaptation.
- Physical source pose13 is the true complete fallen KO bird and pose14 is crouched/flinch. Explicit logical13/14 permutation routes actual native fallen body to KO without redrawing/cropping/mirroring pixels.
- [Original released classic CG The End: the complete small green parrot on his anatomical LEFT shoulder is physically inspected; lower tail contour is partly occluded. No Delta/3DS bird substituted.](https://www.creativeuncut.com/gallery-07/mgs3-render-the-end.html) — référence conservée dans les métadonnées ; sa présence ne constitue pas une nouvelle inspection dans cet audit.
- [Runtime et profils au commit audité](https://github.com/darknigthmare/shadow-codec-ops/blob/ba4e30a09e9e95727b75a665e7b6ab07d9941aea/public/cqc/modules/unified-versus-v055.html).
