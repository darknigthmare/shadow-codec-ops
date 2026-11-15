# P41 — complément éditable final

Ce complément conserve 114 textes de l’inventaire final de 133 fichiers. Dix-huit fichiers identiques par chemin et empreinte sont déjà dans le paquet v4 ; le SDK compilé est conservé séparément du présent paquet. Aucune image, aucun profil ni cache ne sont inclus.

Quatre marqueurs remplacent les préfixes locaux. L’inversion exacte de chaque texte UTF8 a été vérifiée. Les gzip sont recompressés de façon déterministe ; leurs données décodées restent exactes. Les images natives sont dans l’archive Git séparée ; leurs 74 liaisons sont épinglées sans copier les PNG.

L’hydrateur inchangé vérifie les empreintes puis écrit vers un dossier neuf, sans exécuter les outils restaurés. Exemple : `python hydrate-editing-export.py . dossier-neuf --manifest-sha256 EMPREINTE`. Les options `--app-root`, `--workspace-root` et `--scratch-root` permettent de choisir les racines. Les paquets v1 à v4 restent nécessaires pour les dépendances antérieures.

Les revues historiques ne valent que pour leurs octets d’origine. La matérialisation change les chemins et peut modifier les empreintes des dépendances : inspection, réépinglage explicite et nouvelle revue sont requis avant compilation ou installation. Aucune admission ni approbation n’est héritée. Aucun outil archivé n’a été exécuté pour fabriquer ce complément.
