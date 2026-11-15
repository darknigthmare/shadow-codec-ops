# Restaurer la sauvegarde publique P40

Cette sauvegarde contient les nouvelles sources et les outils de reprise du lot de 30. Le jeu public reste P39 ; aucun nouvel élément du lot n’est encore validé en jeu.

Télécharger `restore-backup.py`, puis lancer avec Python 3 :

```sh
python restore-backup.py --commit e6c0b59267b2694f7ce80035e668404c7a23fdf2 --out /chemin/vers/un-nouveau-dossier
```

Le parent du dossier doit déjà exister. Le dossier de destination doit être nouveau. Le programme télécharge les 94 fichiers du snapshot immuable, vérifie leurs tailles et SHA-256, utilise TLS et refuse les redirections. Il ne remplace aucun fichier existant et ne lance pas le jeu. Le manifeste public est épinglé dans le script.

La restitution réelle a été vérifiée dans un nouveau dossier, puis le validateur du lot y a réussi : 29 brouillons, 1 élément en attente, 0/30 terminé. Les métadonnées privées Drive, le relevé interne des anciens liens temporaires et les anciens fichiers privés ne font pas partie de cette sauvegarde publique.

Les trois PNG natifs sont conservés sans modification de pixels. Les poses de rechargement non approuvées restent en attente. Les références officielles et les contrôles de fichiers ne constituent pas une certification de fidélité absolue 1:1.
