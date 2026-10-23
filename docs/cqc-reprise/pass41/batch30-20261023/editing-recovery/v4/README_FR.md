# P41 — sources éditables, paquet 02

Ce paquet conserve 55 fichiers éditables du compilateur v2, des modèles, des outils d’intégration et de leurs entrées de revue. Les préfixes locaux sont remplacés par quatre marqueurs portables ; l’inversion a été vérifiée sur les 55 textes décodés. Les conteneurs gzip sont recompressés de façon déterministe, leurs données décodées restent conservées.

L’hydrateur inchangé du format d’archive v1 contrôle toutes les empreintes avant écriture vers un dossier neuf. Il matérialise les fichiers sans exécuter les outils. Les images natives restent dans l’archive de sources séparée et ne sont jamais intégrées aux documents. La liste de leurs empreintes sert à une matérialisation optionnelle.

Exemple : `python hydrate-editing-export.py . dossier-neuf --manifest-sha256 EMPREINTE` ; préciser `--app-root`, `--workspace-root` et `--scratch-root` si nécessaire. Un contrôle des dépendances et une nouvelle revue sont requis avant toute compilation. Les revues historiques portent sur leurs octets d’origine ; aucune admission n’est héritée.

Aucun reçu de génération ni identifiant d’origine privé n’est publié.
