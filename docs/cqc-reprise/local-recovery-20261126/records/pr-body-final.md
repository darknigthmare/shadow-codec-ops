## Pourquoi

Les secteurs et objets encore absents de la bible CQC doivent disposer de sources individuelles, de références vérifiables et de limites explicites avant leur admission dans le jeu. Cette continuation conserve P60–P65 et ajoute **P66 : 14 PNG sélectionnés**, reliés à l’Atlas et à 14 fiches de bible.

Le cumul passe de **211 à 225 sources sélectionnées** et de **34 à 48 entrées Atlas**. Les sources sont des candidats de production : leur consultation dans l’Atlas ne constitue pas une admission au combat.

## P66 — contenu livré

| Jeu | Ajouts retenus |
|---|---|
| **AC!D — 3 fragments** | FAR B3F : baie des conteneurs ; B4F : passerelles grillagées ; B5F : secteur de la chambre de La Clown. |
| **AC!D 2 — 4 fragments** | Hall de Control Section, passerelle de Communications Tower, quai de Terminal, vestibule de Residential Area. |
| **Survive — 4 sources** | Terrasse de Forsaken Ruins, Machine Gun Turret, Oil Trap, Flame Trap inactif. |
| **Rising — 3 objets** | Cardboard Box, Drum Can, variante Cardboard Box Mariachi. |

- **8 décors opaques et 6 objets avec alpha natif**, un sujet par PNG.
- **17 appels imagegen, 17 sorties PNG, 14 retenues et 3 archives** ; aucun refus nouveau.
- **29 110 996 octets sélectionnés** ; **7 031 850 octets archivés**.
- Boîte MGR v1 remplacée après correction d’alpha ; fût v1 remplacé après correction de proportions.
- Flame Trap v1 remplacé après la revue indépendante : la v2 représente **12 panneaux, disposés 6 × 2**, conformément à la lecture des captures natives.
- Les prompts, références locales et URL, dimensions, SHA-256, SHA Git et réserves de fidélité sont consignés individuellement.
- Les cibles refusées lors des passes antérieures n’ont pas été relancées.

**P65 est déjà présent dans le socle** et reste conservé : baie technique du Research Block d’AC!D 2 ; Normal Fence et Survival Bow de Survive ; coffres normal/verrouillé et terminal VR de Rising. Ces six sources avaient porté le total à 211 et l’Atlas à 34. La description de PR, restée à P64, est actualisée ici.

## Résultat dans CQC et dans la bible

La route **`/cqc/?module=atlas63`** conserve son module existant et affiche les 14 fiches supplémentaires. Les 34 entrées antérieures gardent leurs propriétés et leur ordre. Le point d’entrée, le shell, le contrôleur et les styles Atlas sont inchangés.

La continuation P66 relie chaque source à ses périmètres, aux rubriques du guide, aux références et au travail restant. Les documents Associations, Arènes/Boss, Combat et Fiches/Validation sont complétés. Le suivi reprend explicitement les **huit groupes ouverts P65**, avec l’avancée P66 et les absences conservées.

Le guide original, ses 30 rubriques et 90 exigences, ainsi que la photographie historique de 277 lignes dont 97 sans correspondance démontrée restent inchangés. Aucun pourcentage global d’achèvement n’est déduit de ces unités différentes.

| Catégorie | Avant P66 | Ajouts P66 | Cumul |
|---|---:|---:|---:|
| Décors | 125 | 8 | **133** |
| Personnages | 20 | 0 | **20** |
| Costumes | 9 | 0 | **9** |
| Machines | 46 | 0 | **46** |
| Objets | 8 | 6 | **14** |
| Corps de projectiles | 2 | 0 | **2** |
| VFX | 1 | 0 | **1** |
| **Sources sélectionnées** | **211** | **14** | **225** |

**18 essais PNG archivés cumulés**, exclus des sources sélectionnées et du runtime.

## Vérification exécutée

- **14 tests Node Atlas réussis**, aucun échec ni test ignoré.
- **Vérificateur P66 complet réussi** : les 17 PNG ont été contrôlés pour structure, CRC, dimensions, décompression, alpha, SHA-256 et identité de blob Git.
- Les quatre registres historiques sont identiques octet par octet : **211 identités PNG** vérifiées dans l’arbre Git réel du socle ; **34 PNG historiques locaux** rehashés.
- Bijections livraison / Atlas / bible, 14 ancres de bible, chemins, références et statuts contrôlés.
- Aucun contenu P66 identique à une source historique ; trois archives exclues du catalogue et du runtime.
- Le vrai scanner du projet reconstruit le manifeste : **3 061 fichiers, 4 997 références, 3 542 770 873 octets**.
- **3 046 anciennes lignes hors catalogue**, **4 983 références historiques**, **740 omissions** et **499 routes externes** conservées.
- Le delta runtime est **+29 149 260 octets** : les 14 PNG et 38 264 octets ajoutés au catalogue.
- Revue visuelle indépendante des 14 candidats, avec addendum de contrôle de Flame Trap v2.

Ces contrôles établissent l’intégrité et la cohérence de l’intégration statique. Ils ne constituent pas une régression du combat ou de toute l’application.

### Navigateur et déploiement

**Aucun parcours navigateur P66 n’est validé.** Le lanceur Chromium présent n’a pas son binaire. Le téléchargement officiel isolé du Headless Shell a reçu un HTTP 403 « Site Unavailable ». Le runner est préparé et sa syntaxe est valide, mais aucune capture ni navigation tactile n’est déclarée réussie.

**Déploiement P66 bloqué par Vercel** : le statut du commit est `failure`, avec le message « Deployment rate limited — retry in 24 hours. », enregistré le **26 novembre 2026 à 15:45:30 (Paris)**. [Statut du commit](https://api.github.com/repos/darknigthmare/shadow-codec-ops/commits/5d7c6c5187f3906ad1ead53706e83674750f1c34/status). Aucune exécution déployée n’est déclarée validée. La PR reste ouverte en brouillon pour la revue.

## Limites de fidélité et manquants

**0 nouvelle admission au combat, 0 certification absolue 1:1, aucun PNG natif UHD, aucun périmètre clos et aucune nouvelle image narrative.**

Les grandes formes et matériaux servent de base de travail ; les dimensions et topologies restent à valider. B4F porte une réserve renforcée sur les volumes pleins, la circulation et les turbines. Communications Tower reconstruit certains coffrets et raccords ; Terminal reconstruit la répétition des quais et l’ouverture lointaine après retrait du matériel roulant.

Forsaken Ruins reste une terrasse adaptée latéralement. Les pièges Survive sont inactifs. Le fût MGR est fondé sur une capture PS3 de preview du 26 janvier 2013 ; l’équivalence au modèle final n’est pas certifiée. Les boîtes conservent un alpha maximal natif de 254/255 et une faible translucidité. La variante Mariachi est un objet cosmétique, pas un nouveau combattant.

Restent notamment ouverts : géométrie complète des secteurs FAR et AC!D 2, Research Block complet et étages Prototype ; Wormhole Transporter, Air Shock Cannon, projectile Mortar et variantes du Captain ; MGR DL-VR005, aire EXCELSUS, canisters GRAD et soldats humains. Harold Burton, Harley Warren et Joel Marton ne reçoivent pas de silhouette inventée. Les états, animations, collisions, interactions, transitions et règles de combat restent suivis séparément.

## Documents de revue

- [Galerie P66 — 14 fichiers individuels](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass66/README.md)
- [Continuation et 14 fiches de bible](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-bible/CONTINUATION_P66.md)
- [Manifeste de livraison](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass66/delivery-manifest.json)
- [Associations P66](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-bible/asset-associations-p66.json)
- [Prompts et générations](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass66/prompt-index.json)
- [QA et commandes exécutées](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass66/INTEGRATION_QA.md)
- [Vérification locale finale](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass66/p66-local-verification.json)
- [Manquants et priorités](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass66/MANQUANTS.md)
- [Delta des périmètres et héritage P65](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-reprise/pass66/scope-delta.json)
- [Bible centrale](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/docs/cqc-bible/README.md)

## Publication

P66 part du commit P65 **`101b15617f8766353800ffc1be592ec1aef6b66c`**. Commit P66 : **`5d7c6c5187f3906ad1ead53706e83674750f1c34`**.

La branche de base reste `codex/cqc-p51-remaining-costumes-20261113` au commit `67b61f0b536b34921b3d604631409e2b9d384ce4`. Les changements de gameplay hérités ne sont pas attribués aux nouveaux PNG.


### Conservation après publication

La comparaison exhaustive des arbres Git a été exécutée après publication : **23 227 → 23 339 entrées**, soit exactement **112 nouveaux fichiers et 7 fichiers modifiés, aucune suppression**. Les **23 220 autres entrées historiques** sont identiques. Les **119 SHA publiés** correspondent aux fichiers locaux figés ; les **211 PNG historiques et les quatre registres** sont conservés. Le parent du commit et la pointe réelle de la branche ont été revérifiés.

