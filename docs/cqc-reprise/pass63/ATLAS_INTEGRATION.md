# Atlas P63 — intégration des sources fixes

Accès depuis **Chroniques → Atlas des opérations** ou **Extras → Atlas des opérations**, ainsi que `/cqc/?module=atlas63`.

Le catalogue attendu est `public/cqc/data/cqc-p63-source-atlas.json`, avec une liste `assets`. Chaque entrée garde `id`, `label`, `episode`, `kind`, `path`, `workIds`, `referenceURLs`, `qaNotes`, `sourceGenerated`, `combatReady: false` et `fidelityStatus`. Les champs `scope`, `width`, `height` et `bibleURL` sont facultatifs. Employer des chemins `../assets/p63/nom.png` pour que le module et le contrôleur du manifeste résolvent la même image.

L’interface propose les filtres par opération/catégorie, la recherche sans sensibilité aux accents, une sélection reliée à l’URL, les notes de portée, les références, la bible et les fronts existants. Les liens utilisent le protocole du menu CQC quand l’atlas est embarqué.

Les contrats d’arènes et de combattants restent distincts : aucune source n’est inscrite dans un registre de combat. Les PNG plats restent des sources fixes.

## Vérification

14 tests Node réussis : titres, chemins, identités, filtres, sélection, URL, chargement/retry, erreur d’image, réponse asynchrone périmée, reset et navigation embarquée. Syntaxe JavaScript et découverte des dépendances contrôlées.

La vérification Chromium est bloquée dans l’environnement de cette sous-tâche : binaire absent, téléchargement officiel HTTP 403. Les tests du DOM minimal ne constituent pas une vérification visuelle du navigateur.

## Manifeste runtime

Mettre à jour la ligne de `index.html` dans `public/cqc/runtime-manifest.json`, puis ajouter le nouveau module, ses JS/CSS, le catalogue et les PNG sélectionnés. Recalculer les références des seuls nouveaux/modifiés avec `discoverReferences` de `scripts/sync-cqc-runtime.mjs`; conserver les lignes et politiques historiques. Une mise à jour du manifeste ne recertifie pas les anciennes images.

## Préservation après la panne

Les résultats Node ci-dessus proviennent de l’exécution précédant la panne de l’exécuteur. Le JavaScript et les tests ont été reconstitués depuis leurs textes complets et les derniers correctifs. Le HTML du module et son CSS ont été reconstruits avec le même contrat DOM ; le shell reprend six modifications ciblées sur la base exacte `dd633808`. Leur identité octet à octet avec la version précédant la panne n’est pas affirmée. Les contrôles de reprise portent sur la syntaxe JavaScript, l’initialisation de l’API, quelques invariants de chemins et d’éditions, et la présence des identifiants DOM. Aucune nouvelle exécution Node ou Chromium n’a été effectuée après la panne.
