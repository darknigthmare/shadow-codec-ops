# P48 — Zombies et châssis cybernétiques

Cinq variantes sont intégrées et committées pour le mode Versus de CQC, autonome et intégré à Shadow Ops : The End zombie et châssis, Volgin zombie et châssis, Naked Snake MGS3 châssis. Les directions gauche/droite sont dessinées séparément. Les silhouettes, hauteurs, appuis et points de départ des effets sont calibrés sur les combattants d’origine. Les mécaniques, fréquences d’animation et contrats de combat d’origine sont conservés.

Commit runtime : `37ac8168a63b807f43d68e62ef6a2800157d0fa1`.

Les vérifications portent sur les menus et combats réellement exécutés, 24 naissances d’effets avec les métadonnées actuelles, les manifestes complets des deux installations, les 22 fichiers Git relus exactement la compilation locale du frontend, puis le build standard complet Vercel en aperçu (`tsc -b && vite build`, PWA générée, état READY). Les contrôles ciblés ne certifient pas chaque frame, le plein écran DOM ou chaque détail mécanique à l’identique.

## Publication Vercel

Le déploiement de production est bloqué par le quota Vercel de 100 déploiements par jour (`402`, `api-deployments-free-per-day`, délai annoncé de 24 heures). Le site public sert encore le commit P47 `d7ed6f62aa356ecdfcd8e2632784c86c522b251a`. L’aperçu automatique du commit est READY, mais sa promotion a aussi été refusée (`422`). Aucun nouveau costume P48 n’est déclaré livré en production. Après réinitialisation du quota, déployer le commit runtime exact sur le même projet, attendre le build complet puis contrôler les octets HTTPS des PNG, gzip et manifestes.

## Travaux conservés

36 PNG bruts, versions précédentes comprises, sont conservés dans Git. Ils couvrent 11 paires de variantes dessinées ; six variantes ont été compilées au stade Source, et cinq ont été qualifiées et intégrées au runtime. Ces nombres ne s’additionnent pas. Fatman châssis attend les preuves C4 en jeu ; Fatman zombie garde un problème de séparation de poses ; Snake zombie possède un préflight géométrique prêt ; Raven attend la compilation et la qualification de ses mouvements. Le châssis Peace Walker reste en attente d’une prise correcte du fusil dans sa vue gauche. L’édition de correction a été refusée par le service d’image, sans PNG produit ni nouvelle tentative.

Le suivi comprend 675 variantes éligibles initialement manquantes, réparties en lots de 20 au maximum. Cinq sont désormais intégrées dans ce lot ; les autres étapes restent indiquées sans les assimiler à une livraison. Le classeur V9 conserve les anciennes feuilles et ajoute les étapes P48 et les 36 sources. Les variantes inventées adaptent les personnages à leur incarnation et leur équipement ; elles ne prétendent pas être des costumes officiels.

Classeur : [CQC_SUIVI_P48_NOV9_ETAPES_PUBLIC_V9.xlsx](CQC_SUIVI_P48_NOV9_ETAPES_PUBLIC_V9.xlsx). Les CSV et les reçus publics de ce dossier permettent aussi de consulter les étapes sans Excel.

Le contrôle automatique a refusé la création d’un lien public temporaire vers l’aperçu protégé, faute d’autorisation explicite pour ce partage. Aucun lien n’a été créé ; aucun contrôle HTTPS de cet aperçu n’est déclaré réussi.
