# P67 — contrôles de livraison et d’intégration

**26 novembre 2026. Socle immuable : `5d7c6c5187f3906ad1ead53706e83674750f1c34` (P66).** Les contrôles ci-dessous portent sur les 29 nouvelles sélections, une archive, un refus sans sortie et l’extension de leur consultation dans l’Atlas.

## Résultat

| Contrôle | Résultat |
|---|---|
| Générations | 31 requêtes : 30 sorties PNG, 1 refus sans fichier |
| Sélection | 29 PNG : 22 corps de personnages, 6 portraits, 1 machine complète |
| Archives nouvelles | 1, portrait Scout v1, exclu de l’Atlas et du runtime |
| Éditions effectives des ajouts | 17 clés distinctes |
| Sources cumulées | 225 → **254** |
| Atlas | 48 → **77** dossiers |
| Archives cumulées | 18 → **19** |
| Tests Node | **22 réussis**, aucun échec ni test ignoré |
| Gate P67 | **PASS**, fichier par fichier et graphe statique |
| Navigateur | **Bloqué au lancement**, binaire Chromium absent |
| Admission combat / certification absolue 1:1 | **0 / 0** |

Preuves : [gate complet](p67-local-verification.json), [sortie des tests](p67-node-tests.tap), [contrôle brut des PNG](p67-preintegration-png-verification.json), [revue visuelle](independent-visual-review.json), [tentative navigateur](browser/verification.json).

## PNG et traçabilité

Les **30 PNG** (29 retenus et une archive) sont décodés et vérifiés : signature, IHDR, type RGBA, profondeur 8 bits, structure des chunks, CRC, décompression IDAT, dimensions, absence d’octets supplémentaires, SHA-256 et SHA Git. Les valeurs du canal alpha et les pixels significatifs sur le cadre sont mesurés sans modifier l’image.

Les sources sélectionnées représentent **31 957 432 octets** ; l’archive **1 399 176 octets**. Toutes sont des sorties brutes de `image_gen.imagegen`. Aucun agrandissement, découpage, nettoyage d’alpha, repeinture ou changement de pixels n’est effectué après la génération. Les images auxiliaires de recherche/QA ne sont pas des sprites sélectionnés.

La correction du Scout a été réalisée par l’outil image : la v1 dont le casque touchait le cadre est conservée, la v2 possède une marge haute de **70 px au seuil alpha >128**. Le [registre des prompts](prompt-index.json) conserve l’image d’entrée v1 sous son chemin d’archive et son hash ; il ne présente pas la v2 comme sa propre référence initiale.

Les limites inférieures de certains portraits atteignent volontairement le bord. Le rebelle MGS4 en tunique claire conserve ses deux chaussures malgré une marge basse de **1 px au seuil >16**. Le portrait Enforcer officiel garde 8 px au-dessus du casque. La revue visuelle accepte ces cadrages comme candidats bornés, sans les convertir en preuves de géométrie exacte.

## Conservation du socle

Les cinq registres antérieurs sont identiques octet pour octet aux blobs du commit P66. Les **225 identités PNG sélectionnées** et les **18 archives** sont vérifiées contre le véritable arbre Git de ce commit. Dans le checkout partiel, **48 PNG sélectionnés historiques** et **3 archives historiques** également présents localement sont rehashés. Les autres images historiques ne sont pas téléchargées ni présentées comme redécodées.

Les **48 objets Atlas historiques**, leur ordre et leur normalisation sont inchangés. Le digest des anciens dossiers normalisés reste `af6948b68f48576e4f67f8ad77df1f6282dd131c1b63e9655090fcd05f0649ad`. Le shell `index.html` et les styles Atlas conservent leurs octets. Les 277 lignes de l’inventaire P61, les 30 rubriques et les 90 exigences du guide ne sont pas réécrites.

L’audit avant génération documente séparément les 354 profils et les lignes historiques. Le suivi après P67 doit être lu avec l’édition effective : un workId partagé entre plusieurs opus n’apporte pas automatiquement une source à chaque jeu. Six portraits sont signalés comme tels ; aucun groupe n’est déclaré clos.

## Atlas, filtres et cohérence des registres

Les 29 ajouts sont en bijection entre [livraison](delivery-manifest.json), [associations de bible](../../cqc-bible/asset-associations-p67.json) et catalogue Atlas. Pour chaque dossier, les identifiants, chemins, dimensions, hashes, type, édition, workIds, références, réserves et lien de bible concordent. Les 29 ancres de la [continuation](../../cqc-bible/CONTINUATION_P67.md) existent.

Le contrôleur et le module de filtres prennent en charge **32 clés d’édition explicites**. La recherche combinée nom/édition/type retrouve chacun des 29 nouveaux dossiers. Les alias historiques AC!D et Rising sont conservés ; un titre ambigu ou une édition inconnue ne reçoit pas une autre édition par simple recherche partielle dans son nom. Les nouveaux cas de test couvrent notamment Mobile/AC!D Mobile, le projet initial Rising, les clés explicites et la préservation des dossiers précédents.

La catégorie d’une source n’est pas une autorisation de gameplay. Les flags `runtimeIntegrated`, `combatRuntimeIntegrated`, `combatReady`, `absolute1to1Certified`, `referenceGeometryValidated` et `scopeClosed` restent faux. `atlasIntegrated:true` signifie uniquement que le fichier figure dans le catalogue consultable.

## Graphe runtime réel

Le véritable scanner du projet reconstruit le manifeste à partir des fichiers et du catalogue. Trois propriétaires existants du graphe changent : le catalogue, le contrôleur Atlas et le module HTML. Les PNG nouveaux ajoutent exactement une entrée et une référence par source.

| Mesure | P66 | P67 | Écart |
|---|---:|---:|---:|
| Fichiers runtime | 3 061 | **3 090** | +29 |
| Références | 4 997 | **5 026** | +29 |
| Octets | 3 542 770 873 | **3 574 818 671** | +32 047 798 |
| Références omises suivies | 740 | **740** | 0 |
| Routes externes suivies | 499 | **499** | 0 |

Les **3 058 lignes historiques hors des trois propriétaires modifiés** sont conservées ; les **4 997 références historiques** restent présentes. Le delta de taille comprend 31 957 432 octets de PNG et 90 366 octets nets pour le catalogue, le contrôleur et le module. La politique externe est inchangée (`e9db83c672685a37e66a07dc53637bf6d8b0c05877e01ed420c8853f0438e4ef`). Aucune archive ni requête refusée n’est admise dans le graphe.

Ce contrôle prouve la cohérence du graphe statique. Il n’établit ni le comportement du navigateur, ni les animations, ni une régression complète du combat.

## Revue visuelle et limites 1:1

Les 29 sélections sont comparées aux références. Le root relit le lot classique ; un autre agent que celui de génération relit les lots modernes, V/Online/Mobile et Touch. Les 29 verdicts sont `accept-as-bounded-candidate`. Ils acceptent une base statique identifiable avec réserves, pas une reproduction exacte.

Réserves principales : reconstructions pixel art MSX/NES/MG2 ; illustrations de manuel pour les Genome MGS1 ; otage MGS2 HD ; T poses de previews PSP ; édition preview/retail non établie pour MGS4 ; visages, armes, mains, insignes et petites poches interpolés ; pose du médecin TPP recomposée ; poncho GZ partiellement occulté ; petits éléments du Gekko Touch trop peu définis. Les six portraits ne couvrent aucun bas du corps.

## Navigateur et déploiement

Une tentative réelle du runner P67 a échoué avant toute navigation : le binaire Chromium Headless Shell attendu est absent. Le rapport consigne `browserLaunched:false`, `successfulBrowserValidation:false` et **0 requête de page**. Aucun rendu desktop/mobile, geste tactile, décodage navigateur ou capture d’interface n’est présenté comme réussi. L’échec de téléchargement officiel constaté précédemment n’est pas contourné.

La publication vise la PR #25 déjà ouverte en brouillon, sans fusion. Le dernier déploiement P66 était refusé par la limite Vercel ; P67 ne lance aucune demande de déploiement manuel pour contourner cette limite. Le statut attaché au commit publié doit être consulté sur la PR et ne se déduit pas des tests locaux.

## Reproduction

Depuis un checkout complet du dépôt contenant le commit P66 :

```bash
node --test scripts/test-cqc-p63-source-atlas.mjs scripts/test-cqc-p67-source-atlas.mjs
node scripts/check-cqc-p67.mjs .
node scripts/qa-cqc-p67-browser.mjs .
```

Pour un checkout partiel, le vérificateur accepte `--git-repository /chemin/du/clone-reel` et un snapshot texte `--baseline-dir` dont les SHA Git sont comparés aux identités P66 épinglées. Le contrôle navigateur nécessite un exécutable Chromium fonctionnel et Playwright ; sa présence ne doit pas être inférée de celle du lanceur.

Le script `audit-cqc-p67-coverage.py` reproduit l’audit avant P67 sur les textes P66 exacts. Le résultat historique demeure distinct du rapport après ajout ; il ne doit pas être régénéré à partir de registres déjà modifiés.
