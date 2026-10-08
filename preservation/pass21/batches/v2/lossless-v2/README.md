# Sources natives PASS21 — deuxième sauvegarde

Ces58 archives conservent sans perte les sources lues au gel, les tentatives rejetées, les scripts et les rapports avec leur statut littéral. Elles ne certifient pas les candidats non livrés. Les3357 anciens chemins Git restent dans la branche de sauvegarde.

Restauration des chemins et octets originaux : `python restore_native_sources.py --restore-to /tmp/cqc-restored-sources`. Le script vérifie SHA256, archives, chaque contenu et chaque nom. Les archives utilisateur restent inchangées dans le workspace.
