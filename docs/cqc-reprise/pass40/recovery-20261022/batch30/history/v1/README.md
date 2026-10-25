# Lot de 30 — reprise du 22 octobre 2026

Le manifeste conserve les 30 emplacements engagés : 14 camouflages de Naked Snake MGS3, 9 costumes créés pour CQC, 4 combattants et 3 machines. Les incarnations restent séparées. « Rétro » est le libellé public ; `retro-msx` reste un identifiant interne. Liquid « Nouvelle génération » améliore une famille déjà couverte et ne compte pas comme nouvelle famille manquante.

Les nouveaux identifiants descriptifs des camouflages sont un contrat de cette reprise. Les anciens fichiers temporaires P40 sont indisponibles ; aucune identité historique ambiguë n’est présentée comme retrouvée. Le lot commence à **0/30 terminé**. Les validations et images mentionnées dans les anciens résumés ne constituent pas des fichiers récupérés. Le costume Gala de Fatman reste hors lot, en attente, sans nouvelle tentative de la modification rejetée.

```sh
python /workspace/cqc-pass40-resume-20261022/batch30/validate-batch30.py
python /workspace/cqc-pass40-resume-20261022/batch30/test_validate_batch30.py
```

Un brouillon peut être valide avec des emplacements incomplets. La sortie sépare `validation`, `completedCount`, `deliveredBatch30` et `publishedBatch30`. Un résultat `PASS` ne signifie donc jamais à lui seul que les 30 éléments sont livrés.

Pour avancer un emplacement, enregistrer les PNG originaux comme fichiers ordinaires sous ce dossier durable, puis ajouter leurs chemins relatifs, tailles, SHA256, dimensions et faces. Les fichiers temporaires, liens symboliques, chemins sortant du dossier, sources absentes ou corrompues et images identiques utilisées pour les deux faces sont refusés, même dans un brouillon qui déclare des sources. Un dessin conservé dans `/tmp` doit d’abord être copié et vérifié dans le dossier durable.

Les états `ready`, `complete` et `published` exigent les deux faces, les fichiers de l’implémentation et des références avec leur portée. La nouvelle preuve QA doit être approuvée après l’incident, liée à `input_digest(entry)` et aux mêmes fichiers, puis contenir les contrôles de géométrie, actions, absence de remplacement et intégration aux deux jeux. Pour les machines, ajouter articulations, visée, destructions et racine fixe. Les preuves physiques sont elles aussi conservées et vérifiées par taille et SHA256. Toute modification des sources, du code ou des références rend la QA antérieure périmée.

Un élément `published` exige en plus les deux commits immuables, l’URL du déploiement et une relecture publique liée aux mêmes entrées. Le validateur contrôle ces liens et leur intégrité ; il ne remplace ni l’inspection visuelle des dessins, ni l’exécution des combats, ni la vérification effective des services distants. Il ne certifie pas une fidélité absolue 1:1.

Les tests utilisent uniquement de minuscules PNG synthétiques de 1×1 pixel dans un dossier temporaire isolé. Leur mode interne de fixture n’est pas une option de la commande de validation et ne fournit aucune illustration jouable.
