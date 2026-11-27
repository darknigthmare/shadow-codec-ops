# P74 — mise à jour incrémentale du manifeste runtime

## État de cette préparation

Le script Node avec le décompte final de **99 PNG originaux** a passé **18 tests isolés, sans échec**, après restauration de l’exécuteur. L’adaptateur pur a également passé ses **20 tests dans V8**. La reconstruction initiale depuis les blobs Git a ensuite été comparée à une reconstruction Node depuis les fichiers physiques : les octets des deux manifestes sont identiques et les **116 fichiers sélectionnés concordent**. Une dernière mise à jour atomique a ensuite actualisé uniquement le catalogue de données et le client de combat, après correction du sens natif de la tête de ballast et actualisation des preuves de production. Aucun commit ou ref n’a été publié par cet agent.

Cette voie prépare un manifeste cohérent pour les fichiers P74 présents dans un checkout partiel. **Elle ne valide pas l’ensemble du runtime**, ne relit pas les milliers de binaires historiques absents et ne réévalue pas l’autorisation des routes externes historiques.

- Script : [update-cqc-p74-runtime-manifest.mjs](../../../scripts/update-cqc-p74-runtime-manifest.mjs)
- Tests : [update-cqc-p74-runtime-manifest.test.mjs](../../../scripts/update-cqc-p74-runtime-manifest.test.mjs)
- Découverte réutilisée : [sync-cqc-runtime.mjs](../../../scripts/sync-cqc-runtime.mjs), exports `discoverReferences` et `isRuntimePath`.
- Rapport de préparation : [runtime-manifest-preparation.json](runtime-manifest-preparation.json).

## Périmètre sélectionné

| Famille | Fichiers |
|---|---|
| Points d’entrée et intégration existants | `index.html`, `modules/unified-versus-v055.html`, `src/cqc-pass8-combat-engine.js`, `data/cqc-p63-source-atlas.json` |
| Gameplay et contenu P74 requis | `src/cqc-p74-tag-team.js`, `src/cqc-p74-team-controls.js`, `data/veilbreak-content.json`, `originals/veilbreak/index.html` |
| Entrée facultative, si disponible dans le checkout | `modules/arcade-chronicles-v055.html` |
| Nouveaux arbres limités | Fichiers runtime sous `originals/veilbreak/` et `assets/canon-pass74/` |

Le parcours ne scanne pas tout le dépôt. Les documents Markdown de production ne sont pas ajoutés au runtime. Par défaut, le lot Veilbreak doit contenir **99 PNG disponibles** ; un nombre différent interrompt la préparation avant toute écriture. Le décompte confirmé est de 70 images principales, 18 objets et 11 projectiles. Les 11 illustrations absentes doivent rester à `asset: null` dans le contenu, sans URL runtime fictive ni substitution des champs image. Leurs dossiers textuels restent conservés.

Les chemins hors de ce périmètre sont refusés. La sélection ne peut pas réécrire le manifeste lui-même comme une ressource, suivre un lien symbolique interne ou parcourir un chemin `../`. Le lien du répertoire racine du checkout est résolu avant le contrôle de ses descendants.

## Ce qui est recalculé

Chaque fichier sélectionné doit être un fichier régulier présent, non vide. Le script recalcule sa taille et son SHA-256 à partir des octets réellement lus. Les JSON sont parsés. Pour les PNG, signature, en-tête IHDR, dimensions non nulles et terminaison IEND sont contrôlés ; ce contrôle **n’est pas un décodage des pixels ni une revue graphique**.

Les lectures utilisent les mêmes drapeaux Linux `O_NOATIME | O_NOFOLLOW` que le synchroniseur existant, sans repli silencieux. Les fichiers historiques non sélectionnés ne sont pas ouverts. Leurs tailles, empreintes, métadonnées, positions et déclarations restent inchangées.

Pour les propriétaires texte sélectionnés, les références sont recalculées par la fonction `discoverReferences` existante. Son inventaire disponible combine les anciennes déclarations du manifeste avec les nouveaux fichiers P74 sélectionnés. Ainsi, une dépendance historique absente du checkout reste résolue **par sa déclaration conservée**, sans être présentée comme vérifiée sur disque.

Le script remplace seulement les listes de références et d’omissions des propriétaires texte sélectionnés. Les références des autres propriétaires, les champs de stockage et les autres métadonnées historiques sont conservés. Le chemin de provenance `docs/cqc-bible/veilbreak-engine-validation.json` est une omission documentaire autorisée par `isRuntimePath`, vérifiée dans un test dédié ; les chemins de tests sont traités de la même manière, sans extension du registre externe. `totalBytes` est recalculé à partir de toutes les lignes du manifeste, anciennes et nouvelles.

Les nouvelles ressources doivent être atteignables depuis `index.html` dans ce graphe combiné. Toute ancienne ressource auparavant atteignable doit le rester. Le script n’invente aucune arête pour rendre un fichier orphelin atteignable.

## Protection du registre externe

Le registre `externalReferences` est conservé à l’identique, avec son ordre et ses données. Un chemin sélectionné qui est propriétaire ou alias cible d’une route externe provoque un refus de préparation.

Cette protection empêche la procédure incrémentale de modifier les octets d’un propriétaire associé à des empreintes approuvées ou de remplacer une route externe par un fichier local. Le script ne lance pas `validateExternalReferences` sur un checkout incomplet et ne prétend pas avoir revérifié le registre : le rapport contient simultanément :

```json
{
  "fullRuntimeValidated": false,
  "fullRuntimeFileAuditPerformed": false,
  "gameplayValidationPerformed": false,
  "externalPolicyRevalidated": false,
  "externalPolicyPreserved": true
}
```

Les fichiers historiques transformés portant `sourceSha256` ou `transformation` ne peuvent pas être modifiés par cette voie. Leur flux de transformation d’origine est requis pour éviter une métadonnée périmée.

## Écriture et concurrence

La préparation seule ne modifie pas le manifeste. L’application explicite :

1. vérifie que le candidat n’a pas été changé après sa préparation ;
2. acquiert un verrou local temporaire ;
3. vérifie que le manifeste de départ n’a pas changé ;
4. relit les fichiers sélectionnés et compare leurs empreintes aux instantanés préparés ;
5. écrit un fichier temporaire, contrôle ses octets, puis remplace atomiquement le manifeste.

Un fichier sélectionné ou un manifeste modifié entre préparation et écriture interrompt l’opération. Les anciens fichiers du runtime ne sont ni supprimés ni réécrits. Le verrou et le temporaire propres à l’opération sont nettoyés.

Le chemin du rapport doit se trouver hors du répertoire runtime, y compris après résolution des alias symboliques. Cela empêche un `--report` mal dirigé d’écraser le manifeste ou une ressource.

## Commandes après stabilisation

Tests isolés réexécutés après restauration avec le défaut 99 : 18 cas réussis, sans échec :

```bash
node --test scripts/update-cqc-p74-runtime-manifest.test.mjs
```

Préparation sans modification du manifeste :

```bash
node scripts/update-cqc-p74-runtime-manifest.mjs --report docs/cqc-reprise/pass74/runtime-manifest-plan.json
```

Application, après signal de stabilisation du lot :

```bash
node scripts/update-cqc-p74-runtime-manifest.mjs --write --report docs/cqc-reprise/pass74/runtime-manifest-update.json
```

Le script ne lance ni le synchroniseur historique complet, ni `verifyRuntime`, ni un téléchargement de blobs manquants.

## Vérifications couvertes par les tests

Les 18 tests couvrent la conservation des fichiers historiques absents et des métadonnées inconnues, l’immutabilité du registre externe, la découverte des liens d’un nouveau catalogue JSON vers une image, le calcul du total, les références nouvelles non résolues, les ressources orphelines, la conservation de l’atteignabilité historique, les refus de chemins hors périmètre ou symboliques, les fichiers vides, JSON invalides et PNG tronqués, les ressources transformées, l’application atomique, l’idempotence, les changements concurrents et les sorties de rapport mal dirigées.

Les applications testées opèrent uniquement dans des répertoires de test temporaires. Le rapport de production doit conserver le nombre de fichiers historiques non relus et la liste des cibles historiques résolues uniquement par déclaration.

## Limite de la preuve

Le résultat décrit l’intégrité des fichiers sélectionnés et de leur graphe de références statiques. Il ne mesure pas le comportement du gameplay, les chemins construits uniquement à l’exécution, la fidélité visuelle, l’ensemble des ressources historiques ou le bon fonctionnement du runtime complet dans un navigateur. Ces vérifications restent distinctes.

## Reconstruction pendant l’indisponibilité de l’exécuteur

Un adaptateur pur complémentaire, `scripts/rebuild-cqc-p74-runtime-manifest-from-blobs.mjs`, reçoit le manifeste historique exact, le synchroniseur exact et les octets texte des fichiers sélectionnés avec leurs empreintes. Il conserve les mêmes exclusions et ne modifie aucun fichier, branche ou ref. Ses 20 tests ont passé dans un isolat V8 avec le décompte final de 99 PNG originaux et trois PNG canoniques. Les fonctions de découverte sont extraites sans modification du synchroniseur épinglé ; un adaptateur POSIX est utilisé et testé séparément.

Les empreintes des fichiers texte sont recalculées à partir du contenu des blobs, y compris le SHA Git. Pour les PNG dont seules les métadonnées et le blob sont transmis à l’adaptateur, le rapport liste explicitement les attestations de calcul par l’agent producteur. Ce mécanisme ne démontre ni la présence des fichiers dans le checkout devenu inaccessible, ni le rendu navigateur final. Le rapport de reconstruction doit demeurer distinct des 18 tests Node antérieurs et de toute validation du runtime complet.

## Résultat de la reconstruction finale

Le manifeste produit est le blob Git `ac65f6019e86e2f40d8736f676f849f7f89e315c`, de 1 723 982 octets, avec le SHA256 `2963fd40f0d5a409d1cc86ad9f72277f154500b00f46fde4defd6b58fb73808e`. Le [rapport de mise à jour](runtime-manifest-update.json) contient les empreintes de tous les fichiers sélectionnés, les attestations binaires et les cibles historiques conservées.

| Contrôle | Résultat |
| --- | ---: |
| Déclarations historiques conservées | 3 124 |
| Déclarations nouvelles | 112 |
| Déclarations finales | 3 236 |
| Textes sélectionnés et rehashés depuis leur blob | 14 |
| PNG originaux / canoniques sélectionnés | 99 / 3 |
| Routes externes conservées à l’identique | 499 |
| Références finales | 5 187 |
| Déclarations atteignables depuis l’entrée | 3 236 sur 3 236 |
| Octets déclarés par le manifeste final | 3 781 621 097 |
| Fichiers historiques dont les octets n’ont pas été relus | 3 120 |

Les quatre déclarations historiques actualisées sont l’entrée CQC, v055, le moteur partagé et l’atlas des sources. Les 112 autres ajouts sont dix textes nouveaux et 102 PNG. Les 99 illustrations originales représentent 173 349 324 octets. Les onze concepts d’arsenal sans image n’ont pas de chemin actif ; les dix modèles de noms de fichiers VFX futurs ont été retirés du JSON runtime et conservés dans le plan documentaire.

Les 746 omissions finales comprennent six nouveaux liens documentaires normaux, dont le rapport de validation du moteur. Aucune nouvelle référence runtime non résolue n’est tolérée. Le registre externe garde son ordre et son SHA256 `e9db83c672685a37e66a07dc53637bf6d8b0c05877e01ed420c8853f0438e4ef`.

Le rapport distingue les quatorze textes directement recalculés des 102 attestations d’images produites par les agents à partir de leurs octets conservés. Les contrôles de structure et de pixels des images gardent leur propre preuve. La reconstruction V8 initiale n’avait effectué aucune lecture du checkout devenu inaccessible. Le contrôle physique effectué après restauration est consigné séparément ci-dessous. Aucun de ces deux contrôles n’exécute le navigateur ou le gameplay.

## Contrôle physique après restauration

Le [rapport de vérification physique](runtime-manifest-physical-verification.json) confirme que les **116 fichiers sélectionnés sur disque** correspondent aux empreintes du manifeste : quatorze textes, 99 illustrations originales et trois candidats canoniques. Les lectures utilisent `O_NOATIME` et `O_NOFOLLOW`, vérifient les fichiers réguliers et refusent les ancêtres symboliques. Les 102 PNG passent le contrôle de signature, IHDR, dimensions non nulles et fin IEND ; aucun décodage de pixels n’est effectué par cet updater.

Le manifeste préparé par Node garde exactement le SHA256 `2963fd40f0d5a409d1cc86ad9f72277f154500b00f46fde4defd6b58fb73808e` du blob reconstruit dans V8. Le contrôle après la dernière écriture ne détecte aucune divergence entre les 116 fichiers physiques sélectionnés et leurs déclarations. Les 18 tests Node de l’updater et les 112 assertions de l’atlas ont été réexécutés avec succès après restauration.

Le contrôle conserve explicitement `fullRuntimeValidated: false` : les 3 120 fichiers historiques hors sélection ne sont pas relus, les 499 routes externes ne sont pas réautorisées et les validations navigateur/gameplay relèvent de rapports distincts.

### Ajustement final après revue des objets

La dernière application atomique a actualisé seulement `data/veilbreak-content.json` et `originals/veilbreak/battle.js`, pour une différence totale de 408 octets déclarés. Les images restent identiques. La tête de ballast possède désormais `orientation: left`, et le client applique le facteur d’orientation natif au sens du projectile. La [revue des objets](veilbreak/objects-visual-review.json) consigne cette résolution et conserve ouverte la vérification de lisibilité de la fléchette à la taille réelle du combat.
