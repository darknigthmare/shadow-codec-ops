# P71 — Archives classifiées et accès aux récompenses locales

Vérification du 27 novembre 2026. Tranche des sections 50–64 de l’Extension 02.

## Comportement intégré

L’[Atelier](../../../public/cqc/modules/atelier-v056.html) et l’[Atlas](../../../public/cqc/modules/source-atlas-v063.html) proposent un accès aux **Archives classifiées**. La page comporte trois nouveaux rapports textuels originaux de CQC. Ils s’obtiennent à partir de la progression locale existante ; aucun ancien personnage, costume, stage ou mode ne reçoit de nouvelle restriction.

| Dossier | Condition vérifiée | Source de progression |
| --- | --- | --- |
| Mémoire d’une opération | Prologue ouvert **ET** huit duels d’un récit terminés | `cqc.chronicles055.a/b`, enveloppe contrôlée, `introSeen`, `unlocked`, `records` cohérents |
| Tenir la ligne | Meilleure série d’au moins trois victoires en Survie | `cqc-v048-operations-profile.records.survivalBest` |
| Passage de témoin | Relais 3v3 remporté **OU** relais 5v5 remporté | `relay3Wins` ou `relay5Wins` du même profil Operations |

Les textes portent le statut **CQC / simulation originale**. Le troisième dossier décrit correctement le relais existant : succession de combattants entre les duels, sans revendiquer un changement instantané ni une super d’équipe.

La découverte, le droit d’accès, la disponibilité du rapport et le contexte de consultation sont calculés séparément. Un rapport acquis dont le fichier ne se charge pas reste acquis et propose une nouvelle lecture. Un nom secret n’apparaît ni dans le texte de sa carte, ni dans son libellé accessible, ni dans le lecteur. Les dossiers utilisent un emblème neutre de document classifié.

Le joueur réclame le rapport lorsqu’il devient disponible. L’écriture locale et sa relecture sont confirmées **avant** la révélation de l’accès. L’attribution est permanente dans ce profil et possède un identifiant d’événement stable. Un second appel ne crée pas de doublon et ne renouvelle pas sa date. Une progression effacée ou devenue illisible ne retire pas une récompense déjà acquise.

Les deux copies du registre utilisent le préfixe `cqc.p71.access` et sont sauvegardées automatiquement dans ce navigateur. L’API d’export/import CQC existante reconnaît ce préfixe, mais aucun parcours utilisateur visible d’export/import n’a été établi dans le menu actuel. La page ne recommande donc aucune restauration depuis ce menu. Si les deux copies sont illisibles, l’interface conserve les données présentes et empêche une nouvelle attribution afin de ne pas écraser silencieusement le registre. Web Locks sérialise les récupérations de plusieurs onglets lorsque disponible ; les navigateurs sans cette API utilisent une relecture puis une écriture synchrone vérifiée. La concurrence entre onglets n’a pas été validée dans un vrai navigateur durant cette passe.

Les sommes de contrôle détectent les écritures endommagées. Elles ne constituent pas une preuve d’identité, un mécanisme anti-triche ou une vérification d’abonnement. Aucune connexion Patreon ni attribution payante n’est installée. La lecture des sauvegardes Chroniques valide l’enveloppe et la cohérence des champs nécessaires aux récompenses ; elle ne remplace pas le validateur complet du parcours et du roster.

## Vérification exécutée

**30 tests réussis : 20 tests de logique et de liaison + 10 parcours DOM.**

- La suite logique exécute le **vrai cœur Chroniques** pour produire les sauvegardes de sept puis huit victoires : seul le second cas ouvre la condition du rapport.
- La suite exécute les **vrais callbacks `onResult` et `completeRun` d’Operations** avec un contexte de test borné, puis relit leurs compteurs. Elle ne simule pas un combat graphique complet.
- Cas couverts : conditions ET/OU, source inconnue, compteur invalide, sauvegarde endommagée, repli sur copie valide, attribution unique, reprise après perte du record d’origine, échec d’écriture, relecture non confirmée, fichier absent et contexte incompatible.
- Les parcours DOM exécutent les scripts de la page contre son HTML réel : secrets et textes accessibles, sélection d’un slot verrouillé, récupération puis lecture, refus d’une sauvegarde échouée puis reprise, panne de chargement, conservation des droits, registre entièrement endommagé et préférence de masquage.
- La revue indépendante a reproduit une perte de focus lors du chargement asynchrone des textes. La correction restaure l’action équivalente ; deux cas DOM vérifient le chargement retardé et les événements de stockage avec les actions récupérer, consulter et ouvrir une activité.
- Les dix parcours utilisent **jsdom 29.1.1**, avec la sémantique d’ouverture du dialogue remplacée dans le banc de test. Ils ne mesurent pas la mise en page, les animations, la géométrie du focus, la manette physique ou le rendu d’un navigateur.
- Syntaxe JavaScript contrôlée pour les deux nouveaux scripts runtime ; `git diff --check` ne signale pas d’erreur sur les deux liens modifiés.

Commandes reproductibles depuis la racine du dépôt, avec la dépendance `jsdom` du projet installée :

```sh
node --test scripts/test-cqc-p71-access.mjs scripts/test-cqc-p71-archives-dom.mjs
node scripts/test-cqc-p71-archives-browser.mjs /tmp/cqc-p71-browser-qa
```

Un environnement de test séparé peut fournir `CQC_P71_DOM_MODULES`. Le scénario navigateur accepte `CHROMIUM_PATH` et la dépendance Playwright. Les dépendances d’outillage de cette passe sont restées hors du dépôt.

## Rendu navigateur : non exécuté

`/usr/bin/chromium` existe uniquement comme lanceur ; le binaire `/usr/lib/chromium/chromium` manque. Le lancement Playwright a donc échoué avant le premier scénario. L’installation officielle de Chrome Headless Shell par Playwright a été refusée par le réseau avec HTTP 403 « Site Unavailable ». Aucune capture visuelle n’a été produite et aucun scénario desktop/mobile n’est déclaré réussi.

Le [scénario Chromium](../../../scripts/test-cqc-p71-archives-browser.mjs) est prêt pour les contrôles d’affichage à 1440 px et 390 px, de mouvement réduit, de navigation clavier/tactile, de concurrence entre onglets et de communication avec le menu principal. Il reste à l’exécuter avec un navigateur disponible. La [preuve de blocage](access-browser-attempt.json) conserve le résultat réel : zéro scénario exécuté.

## Fichiers runtime à ajouter au manifeste

- `public/cqc/modules/classified-archives-p71.html`
- `public/cqc/src/cqc-p71-access.js`
- `public/cqc/src/cqc-p71-archives.js`
- `public/cqc/src/cqc-p71-archives.css`
- `public/cqc/data/cqc-p71-access-dossiers.json`

Les deux liens ajoutés se trouvent dans `public/cqc/modules/atelier-v056.html` et `public/cqc/modules/source-atlas-v063.html`. Le manifeste global est mis à jour par la passe d’intégration P71.

## Limites de cette tranche

Les slots de personnages, costumes, stages et modes, l’adaptateur d’abonnement, les droits temporaires, les replays partagés et les règles compétitives restent des exigences de la bible. Les quatre axes sont exercés ici sur trois **rapports consultables**, pas sur un roster annoncé terminé. Les nouvelles animations de taunt/sélection, le tag temps réel, les supers d’équipe et les bonus de combat de l’Extension 01 ne sont pas implémentés par cette page.
