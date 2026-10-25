La sauvegarde proposée utilise uniquement les fichiers réguliers nommés dans une configuration finale relue. Le script `prepare-backup-plan.py` ne publie rien. Le plan ne transforme ni ne réencode les PNG.

Branche nouvelle : `codex/cqc-p40-batch30-recovery`. Parent observé : `42279c1c884769873e66bbda0b6fe849bcd2f1a2`, branche de base `codex/cqc-p38-archive-projectile-range`, arbre `b72f755d3fb97343f9dd8bc049ee7478754ae525`.

Séquence à exécuter seulement après gel de la liste finale :

1. Relire la branche de base et vérifier son SHA. Lire la nouvelle référence et les PR correspondantes ; si elle existe déjà, arrêter et examiner son contenu. Aucun écrasement de référence n'est prévu.
2. Vérifier de nouveau taille, SHA-256, mode régulier et absence de lien symbolique de chaque fichier gelé. `github_create_blob` reçoit ses octets encodés en base64. Comparer chaque SHA Git renvoyé au `gitBlobOID` du plan. Dédupliquer les octets identiques par SHA Git sans perdre leurs chemins distincts.
3. `github_create_tree` utilise `base_tree_sha` égal à l'arbre P39, et uniquement les éléments du plan : `{path, mode:"100644", type:"blob", sha:<SHA Git vérifié>}`. Aucun élément à SHA nul, suppression ou chemin runtime.
4. `github_create_commit` utilise cet arbre, le parent exact ci-dessus, aucun parent supplémentaire et le message relu. Puis `github_create_branch` crée la nouvelle branche directement au SHA de ce nouveau commit. Aucune mise à jour d'ancienne branche.
5. Faire des GET indépendants de la nouvelle référence, du commit et de son arbre. Vérifier les parents, l'arbre, la liste exacte des ajouts et l'absence de modification/suppression hors liste. Lire chaque nouveau blob séparément par SHA, décoder ses octets, vérifier taille, SHA-256 et SHA Git. La relecture de PNG peut utiliser l'URL raw immuable au commit si le connecteur retourne une réponse binaire trop grande ; garder TLS et vérifier les mêmes empreintes. Une réponse manquante ou tronquée est un échec de vérification, jamais une preuve de conservation.
6. Après cette relecture, `github_create_pull_request` reçoit `repository_full_name`, `base`, `head`, `title`, `body`, `draft:true`. Relire la PR et confirmer `draft`, les deux branches et le SHA de tête.
7. Conserver localement les reçus de blobs, arbre, commit, nouvelle référence, relecture et PR. Aucun déploiement Vercel n'est demandé pour cette seule sauvegarde documentaire.

Le connecteur permet `create_blob`, `create_tree`, `create_commit`, `create_branch`, `create_pull_request`, ainsi que les lectures de références/arbre/commit/blob. Il suffit pour cette opération. Pour des contenus volumineux, lire les octets en petits morceaux dans `functions.exec`, les concaténer dans l'isolat puis passer la chaîne base64 au connecteur ; ne pas afficher les contenus complets dans la conversation.

Le texte de la PR doit dire que le lot de 30 est en cours et que cette reprise reconstruit des sources après indisponibilité des fichiers temporaires. Il doit distinguer les fichiers récupérés, les références récupérées de nouveau et les nouveaux dessins générés ; aucune ancienne approbation P40 n'est réutilisée. Les résultats de jeu et Vercel ne peuvent être annoncés qu'avec leurs preuves actuelles.
