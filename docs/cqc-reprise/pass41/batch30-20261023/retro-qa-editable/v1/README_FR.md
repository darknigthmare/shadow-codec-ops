# P41 — preuves et outils Rétro portables

Ce paquet conserve 39 fichiers de textes, outils exécutés, configurations, tableaux et rapports de QA Rétro. Les préfixes locaux sont remplacés par quatre marqueurs portables ; l’inversion a été vérifiée sur les 39 textes décodés. Les conteneurs gzip sont recompressés de façon déterministe, leurs données décodées restent conservées.

L’hydrateur inchangé du format d’archive v1 contrôle toutes les empreintes avant écriture vers un dossier neuf. Il matérialise les fichiers sans exécuter les outils. Les images natives restent dans l’archive de sources séparée et ne sont jamais intégrées aux documents. La liste de leurs empreintes sert à une matérialisation optionnelle.

Exemple : `python hydrate-editing-export.py . dossier-neuf --manifest-sha256 EMPREINTE` ; préciser `--app-root`, `--workspace-root` et `--scratch-root` si nécessaire. Un contrôle des dépendances et une nouvelle revue sont requis avant toute compilation. Les revues historiques portent sur leurs octets d’origine ; aucune admission n’est héritée.

Aucun reçu de génération ni identifiant d’origine privé n’est publié. Les images et profils navigateur sont exclus. Les anciennes preuves restent qualifiées : l’essai supplémentaire de traversée V2 a échoué ; les passes V4 et V5 finales ont réussi pour les directions initiales P1 droite et P2 gauche. Les revues et rapports conservent leurs limites de portée ; aucune certification de navigation HTTPS de production n’est héritée.
