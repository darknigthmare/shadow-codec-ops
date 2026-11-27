# P74 — Relais 2v2 et assistance dans le moteur existant

## Statut de cette livraison

Le mode 2v2 optionnel utilise le moteur déterministe existant `CQCCombat048Pass8`. Il ajoute de véritables réserves, des changements de combattant pendant le round, une assistance touchable, les ressources propres à chaque membre et une condition de victoire par équipe. Le duel reste la configuration par défaut.

Ces règles sont un équilibrage original CQC. Elles ne constituent pas des données de frames officielles de Metal Gear et ne certifient aucune nouvelle animation, planche de sprites ou fidélité visuelle 1:1.

### Règles exécutées

| Action | Comportement à 60 images/s |
| --- | --- |
| Relais volontaire | Autorisé au sol, au neutre, sans attaque, hitstun, blockstun ou récupération. Préparation vulnérable de 30 frames (0,5 s), puis récupération de 18 frames (0,3 s) du partenaire entrant. |
| Interruption | Une touche pendant la préparation annule le relais et impose 120 frames (2 s) avant une nouvelle tentative. |
| Recharge du relais | 360 frames (6 s) après un changement réussi. |
| Assistance | Dépense 20 de jauge tactique du titulaire. La réserve entre pendant 18 frames, exécute une attaque compatible de son propre profil, puis sort pendant 18 frames. |
| Ressource de l'assistance | Les munitions/ressources de la réserve sont payées au démarrage effectif de son attaque. Une touche avant ce démarrage annule l'attaque. Le coût tactique de l'appel n'est pas remboursé. |
| Recharge de l'assistance | 600 frames (10 s). Une seule assistance ou transition par équipe à la fois. |
| Vulnérabilité | La réserve dispose de sa vraie collision et peut subir des dégâts ou un K.O. pendant l'entrée, l'attaque et la sortie. |
| Ressources persistantes | Vie, munitions et jauge appartiennent au membre. Aucun soin, recharge ou gain de jauge automatique sur le banc. Les durées de statuts et récupérations continuent de s'écouler. |
| K.O. du titulaire | Relève forcée après 45 frames (0,75 s) si la réserve est vivante. Le corps K.O. ne bloque plus les projectiles. |
| Fin du round | L'équipe perd lorsque ses deux membres sont K.O. À la fin du temps, comparaison de la moyenne des fractions de vie restantes des deux membres. Le double K.O. intégral fait match nul. |
| Round suivant | Les deux membres récupèrent leurs ressources initiales, le titulaire original revient et les victoires restent attachées à l'équipe. |

Un ordre de relais ou d'assistance consomme l'entrée du joueur pour ce tick. Il ne permet donc pas de lancer simultanément un super ou une autre attaque. Le relais n'accorde pas d'invulnérabilité générale au membre entrant.

Les projectiles et pièges conservent l'identité du membre qui les a créés après un changement. La puissance, les statistiques et les gains restent attribués au bon combattant. Une réflexion transfère cette propriété au membre qui renvoie le projectile. Les collisions prennent en compte les assistants présents sur le terrain.

## Utilisation dans v055

La configuration de combat comporte un volet **ÉQUIPE 2v2 · relais et assistance**, une case d'activation et une réserve par joueur. Les personnages identiques dans la même équipe sont refusés. Les équipes opposées peuvent choisir un miroir.

| Entrée | Joueur 1 | Joueur 2 |
| --- | --- | --- |
| Relais clavier | B | C |
| Assistance clavier | V | X |
| Relais manette | L3 | L3 |
| Assistance manette | R3 | R3 |
| Commande tactile/souris | Boutons du HUD d'équipe | Boutons du HUD d'équipe |

Les pressions manette sont traitées au front montant. Maintenir L3 ou R3 ne répète pas un appel. Une pression simultanée privilégie le relais. Les commandes sont désactivées pendant une pause, une transition, un K.O., un état incompatible ou une récupération. Le HUD indique la réserve, sa vie, sa ressource, son état et les deux délais de disponibilité.

Le chargement des sprites et le rendu de v055 prennent en compte les quatre membres. L'assistant est dessiné avec les animations existantes de son attaque. Cette intégration n'ajoute pas de nouvelles poses de saut d'entrée, de retrait ou de relais propres à chaque personnage.

Les replays conservent le format d'entrée existant et ajoutent les bits 128 (relais) et 256 (assistance). Leurs métadonnées contiennent les UID des équipes et la version des règles. Les replays de duel gardent leurs bits historiques. Le rematch conserve les équipes sélectionnées.

## API pour un client ou une extension

Charger `cqc-p74-tag-team.js` avant `cqc-pass8-combat-engine.js`. `cqc-p74-team-controls.js` est le contrôleur d'interface optionnel de v055.

```js
const match = CQCCombat048Pass8.create(leadA, leadB, {
  seed: 123,
  rounds: 2,
  seconds: 99,
  teams: [[leadA, reserveA], [leadB, reserveB]]
});

CQCCombat048Pass8.step(match, [
  { ...CQCCombat048Pass8.empty(), teamAction: 'tag' },
  CQCCombat048Pass8.empty()
]);

// Les titulaires actuels restent disponibles à ces emplacements.
const currentA = match.a;
const currentB = match.b;

// Inclut les assistants lorsqu'ils sont présents : utiliser pour le rendu.
const visibleActors = CQCCombat048Pass8.onField(match);

// Utiliser pour les projectiles/pièges après un relais ou une réflexion.
const originalOwner = CQCCombat048Pass8.owner(match, projectile);
```

Les quatre objets sont de vrais profils de combattants, avec `uid` et `combat.moves`. Aucune liste d'UID canoniques n'est codée dans le module : des personnages originaux peuvent utiliser la même API. `combat.assistSlot` peut sélectionner une attaque d'assistance. À défaut, le module cherche une attaque `special`, `heavy` puis `light` compatible. Les projections, actions à jauge, déplacements de type téléportation et mouvements exigeant un état préalable spécifique ne deviennent pas arbitrairement des assists.

`CQC_P74_TEAM_UI.resolve(roster, leads, ids)` transforme deux listes de deux UID en équipes validées. Le costume déjà sélectionné sur le titulaire est préservé. Une réserve inconnue ou un doublon dans une équipe provoque une erreur explicite. `CQC_P74_TEAM_UI.expand` donne la liste à précharger.

La structure `match.teams[side]` expose `members`, `activeIndex`, `pending`, `assist`, `tagCooldown` et `assistCooldown`. Chaque membre a un `actorId` stable (`0:0`, `0:1`, `1:0`, `1:1`). Le client conserve le pas fixe à 60 Hz et enregistre `teamAction` avec les autres commandes.

L'IA du moteur peut demander un relais lorsqu'elle est au neutre avec un titulaire affaibli et une réserve plus saine. Elle appelle une assistance à portée lorsqu'elle dispose de la jauge nécessaire. Ces décisions reposent sur l'état visible et des échéances déterministes ; elles ne lisent pas de futures entrées du joueur.

## Vérifications réalisées

### Simulation et compatibilité

```sh
node --test scripts/test-cqc-p74-tag-team.mjs
```

**16 tests réussis, 0 échec.** Ils vérifient les refus de composition invalide, la préparation/interruption du relais, les collisions réelles d'assistance, les dépenses uniques, la persistance des ressources, la propriété des projectiles après relais/réflexion, la relève après K.O., le double K.O., le résultat au temps, le round suivant, les entrées de manette et la sérialisation réelle de v055.

Un test simule 1 200 frames de duel CPU avec la même graine sur le moteur avant et après modification. Les entrées et l'intégralité de l'état sérialisé sont identiques à chaque frame. Un second test rejoue 720 frames d'entrées fixes en équipe et compare l'état et les événements à chaque tick.

Le témoin `scripts/fixtures/cqc-p72-duel-engine.js` est une copie inchangée du moteur à la base `06d5de112e40faa2d551b77e1961f11a6af14bb4`. Son objet Git est `332acb3034433f5bbecc9a9126156f0b7da2e4a4`. Ce témoin n'utilise pas `git show HEAD`, afin que le test reste une comparaison avec le code d'avant livraison après les commits suivants.

Les modules modifiés passent `node --check`. Les sept blocs de script inline non vides de v055 passent également la vérification de syntaxe.

### Navigateur : périmètre vérifié

`scripts/test-cqc-p74-team-ui.mjs` sert et ouvre un petit harness comprenant les **vrais modules équipe et moteur**, sans charger les catalogues historiques de v055. Chromium **158.0.8127.0** a validé cinq contrôles avec zéro erreur de page :

- les deux sélecteurs natifs démarrent les quatre profils demandés ;
- un clic de relais provoque la préparation, bloque les actions incompatibles et change le titulaire à la frame 30 ;
- un clic d'assistance dépense la jauge du titulaire et les munitions de la réserve, puis respecte la récupération ;
- la pause bloque les boutons et l'API publique de mise en attente ;
- les commandes restent dans la largeur du viewport sur ordinateur et à 390 pixels de large, avec au moins 44 pixels de hauteur tactile.

La page de contrôle est `scripts/fixtures/cqc-p74-team-ui.html`. Elle est explicitement étiquetée comme harness et ne représente pas le rendu du jeu. Le rapport machine et les captures correspondantes sont dans `evidence/`.

Pour relancer avec Playwright et un Chromium disponibles :

```sh
CQC_BROWSER_PATH=/chemin/vers/chromium node scripts/test-cqc-p74-team-ui.mjs
```

Le paquet Playwright peut être installé dans l'environnement de test, ou son module ESM indiqué avec `CQC_PLAYWRIGHT_MODULE`. `CQC_QA_OUTPUT` choisit le dossier de rapport/captures. Le test démarre son serveur HTTP et Chromium dans le même processus. Les options de lancement actuelles conviennent au conteneur de QA ; elles ne changent aucun réglage de sécurité du navigateur des joueurs.

**Limite de vérification :** le chargement complet de v055 a fait échouer Chromium dans l'environnement de travail, avant qu'une validation visuelle complète puisse être obtenue. Cette page historique charge un corpus beaucoup plus volumineux que le harness. La cause précise du crash n'a pas été isolée. Les captures du harness ne prouvent donc pas la disposition complète de v055 ni le rendu de chaque sprite canonique. L'intégration v055 est vérifiée par lecture, syntaxe, tests du moteur et sérialisation ; sa validation navigateur exhaustive reste à faire dans un environnement capable de charger le corpus.

## Travail encore ouvert

Ce lot ne termine pas toute la bible. Les animations de relais et d'entrée/sortie propres à chaque personnage, les supers combinés, les finales collectives, les poses de victoire en duo, les interactions scénarisées de partenaires et les clashes spécifiques restent des travaux distincts. Le rendu des réserves repose sur les sprites déjà disponibles. Aucune de ces fonctions ni aucun asset manquant ne sont déclarés « complets 1:1 » par ce lot.

Les instantanés historiques dans `docs/cqc-reprise/pass6` à `pass9` restent intacts. Les scripts runtime et v055 sont modifiés directement ; les manifestes runtime doivent être mis à jour avec les octets livrés lors de la publication.
