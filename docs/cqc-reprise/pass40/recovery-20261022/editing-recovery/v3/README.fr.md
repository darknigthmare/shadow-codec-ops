Cette petite archive additive conserve 16 fichiers récents absents de l’export v2 : compilateur b1996c97, job Quiet V7 original, critères MGR, réglages Core, correction de cible Support et revues Root historiques. Elle ne contient aucune image, métadonnée de costume ni grand index généré. Les anciennes versions restent dans les archives v1 et v2.

Les fichiers sont en texte UTF-8. Seuls quatre préfixes sont remplacés par `@PROJECT_ROOT@`, `@APP_ROOT@`, `@WORKSPACE_ROOT@` et `@SCRATCH_ROOT@`. Leur inverse restitue exactement les octets des textes d’origine, sans changer les nombres, coordonnées, clips, hauteurs ou SHA.

Avec Python 3.9 ou supérieur, depuis cette archive :

```sh
python hydrate-editing-export.py . NOUVEAU_DOSSIER --manifest-sha256 5cf97ac2471f3195dbcad8035892457326388b6088a0a864a3eba34c283d33c6
```

Les options `--app-root`, `--workspace-root` et `--scratch-root` permettent de choisir les autres racines. L’hydrateur vérifie tout avant écriture, refuse une destination existante et n’exécute aucun fichier restauré. Une matérialisation réelle a vérifié les 16 textes, avec 6 contrôles syntaxiques.

Les sources PNG, métadonnées source09/source10/source11, anciens hôtes et autres dépendances doivent être récupérés séparément. L’export v2 contient déjà les références natives. Le rapport local distingue les dépendances présentes, absentes et les pins qui changent. Aucune dépendance n’est devinée.

Les revues Root portent sur leurs fichiers d’origine. Après déplacement ou modification, les SHA doivent être actualisés et le nouveau job revu avant compilation ou installation. Les accords historiques ne sont pas hérités. Ce checkpoint ne vaut ni activation produit, ni validation de tous les modes, ni certificat de fidélité visuelle parfaite.
