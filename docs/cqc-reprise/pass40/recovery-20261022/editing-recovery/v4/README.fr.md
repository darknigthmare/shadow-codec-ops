Cette archive additive conserve les 13 fichiers d’édition Skull Support inventoriés après les exports v1/v2/v3 : job, sélection des sources, générateur de routeur, adaptateur de débris, pont du journal, fixtures et revues Root historiques. Elle ne contient aucune image, métadonnée de costume, grand index généré ni profil de navigateur. Les anciennes propositions restent dans leurs archives et ne sont pas promues.

Les textes UTF-8 utilisent uniquement quatre préfixes : `@PROJECT_ROOT@`, `@APP_ROOT@`, `@WORKSPACE_ROOT@`, `@SCRATCH_ROOT@`. Leur inverse restitue les octets d’origine, donc tous les nombres et les paramètres de source. Les fonctions de jeu restaurées ne sont jamais exécutées par l’hydrateur.

Avec Python 3.9 ou supérieur :

```sh
python hydrate-editing-export.py . NOUVEAU_DOSSIER --manifest-sha256 9e0b31b937d33c539e9c26b191598ddf83cb249f79bfa19a3f077d09d6b5b7d3
```

Les options `--app-root`, `--workspace-root` et `--scratch-root` règlent les autres racines. L’hydrateur vérifie les SHA avant la première écriture et refuse une destination existante. Une restauration fraîche des 13 textes et les contrôles syntaxiques ont été réalisés.

Les PNG et métadonnées Core/Support doivent être récupérés dans les sources immuables séparées. Les dépendances absentes ou les SHA déplacés sont signalés. Les revues Root historiques restent liées à leurs octets d’origine ; après changement de chemins ou de pins, obtenir une nouvelle revue avant compilation ou installation. Cette sauvegarde n’active aucun costume et ne certifie pas une fidélité visuelle parfaite.
