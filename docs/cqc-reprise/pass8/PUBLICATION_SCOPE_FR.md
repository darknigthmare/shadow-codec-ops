Les treize versions demandées sont intégrées au jeu CQC autonome et au même jeu dans l’onglet Shadows Ops : quatre Beauty & Beast avec et sans armure, Sunny MGS4 et Revengeance, Paz Peace Walker et Ground Zeroes, EVA MGS3.

Cette livraison contient 39 personnages avec sprites natifs, 234 PNG et 2 808 poses. Les 26 entrées natives précédentes sont préservées. Les 105 originaux de génération de cette passe, dont 27 essais non retenus, et les références sélectionnées ou rejetées sont conservés dans le dépôt.

Les captures de contrôle Canvas détaillées et répétitives restent intactes à leurs chemins locaux. Leurs SHA et chemins sont consignés dans LOCALLY_RETAINED_RENDER_CAPTURE_PINS.json ; les outils permettent de refaire ces contrôles. Les six captures finales de Shadows Ops/CQC sur ordinateur et mobile figurent dans les preuves. Ce dépôt ne constitue donc pas une sauvegarde distante complète des seules captures de contrôle répétitives.

Le contrôle de fidélité vise le plus proche appuyé par les sources ; les adaptations de combat et détails non confirmés restent explicitement qualifiés. Aucun résultat n’est certifié absolument 1:1.

La restauration historique reste incomplète : 45 profils, 436 anciens pointeurs PNG, les segments .z01/.z02 et le projet ChatGPT privé n’ont pas tous été retrouvés. Les nouvelles générations MG2 de la passe suivante ne sont pas encore annoncées jouables dans cette livraison.

Validation : 1 406 cas de régression CQC distincts dans leur périmètre documenté, 705 tests Shadows Ops, compilation et contrôle PWA, ainsi que les contrôles réels navigateur des treize versions et des deux accès au jeu. Les rapports précédents rejetés et leurs corrections sont gardés.

GitHub a refusé trois blobs JSON trop volumineux. Le catalogue source et deux rapports complets sont sauvegardés sous forme de fragments gzip sans perte, décrits par LARGE_SNAPSHOT_CHUNKS.json. Pour vérifier tous leurs octets : `python3 restore_large_snapshots.py --verify-only`. Pour reconstituer leurs chemins d’origine : `python3 restore_large_snapshots.py`. Les SHA256 et identifiants de blobs Git doivent tous être identiques aux fichiers complets ; aucun sprite ni fichier du jeu publié n’est fragmenté. Les fichiers locaux complets sont aussi conservés.
