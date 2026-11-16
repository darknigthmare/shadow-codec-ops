# CQC — une pose par costume — 13 novembre 2026

Cette passe prépare les dessins des costumes, avant leurs futures animations. Elle conserve les **381 incarnations** séparées et les huit familles prévues : Rétro, nouvelle génération, châssis cybernétique, Dité, Metal Gear, tenue de soirée, zombie et furry. Les Originals sont également présents.

**2478 poses nouvelles indexées**, soit 2471 dessins distincts après déduction des alias documentés, dont 167 tenues officielles et 2 Originals corrigés. 733 poses existantes sont réutilisées. Plusieurs tenues distinctes peuvent partager une planche PNG ; chacune a un seul cadre, son point d’appui et, si nécessaire, son masque vectoriel. Ce ne sont pas des séquences d’animation.

## Consulter

- [Catalogue autonome](catalogue/) : ouvrir son `LIRE_MOI.txt`, puis servir ce dossier avec Python. Le lecteur fonctionne sans les fichiers du jeu.
- [Excel complet](CQC_SUIVI_P49_POSES_UNIQUES_20261113_PUBLIC_V1.xlsx) : les 55 anciennes feuilles sont conservées ; trois feuilles P49 ajoutent les poses, les tenues officielles et les qualifications. Les CSV équivalents sont à côté.
- [Résultat chiffré](P49_LIVRAISON_POSES_UNIQUES_PUBLIC_V1.json) et [vérification finale](P49_FINAL_VERIFICATION_PUBLIC_V1.json).
- [Métadonnées complètes](P49_SOURCES_METADATA_COMPLETES_20261113_PRIVATE_V1.tar.gz) : inventaires, contrats, cadrages, versions, revues, références et code du lecteur. Les PNG exacts restent dans `artists/`, `catalogue/assets/`, `existing-composites/` et `reference-images/`.

Pour récupérer uniquement le catalogue depuis GitHub sans télécharger les autres ressources du jeu :

```sh
git clone --filter=blob:none --sparse --branch codex/cqc-p49-static-costumes-20261113 https://github.com/darknigthmare/shadow-codec-ops.git cqc-poses
cd cqc-poses
git sparse-checkout set docs/cqc-reprise/pass49/static-poses/catalogue
cd docs/cqc-reprise/pass49/static-poses/catalogue
python -m http.server 8160 --bind 127.0.0.1
```

Puis ouvrir http://127.0.0.1:8160/ . Le dossier autonome représente environ2Go, avec les dessins existants et nouveaux nécessaires au lecteur.

## Couverture et réserves

Les **3429 lignes prévues** sont rapprochées : poses disponibles, 387 familles déjà couvertes par leur Original, 58 cas non applicables et gardes explicites. Aucun costume prévu encore productible n’est silencieusement absent.

Sept lignes restent en réserve après refus de l’outil : châssis cybernétiques de The Fear et d’EVA (cinq UID/alias), et version Metal Gear de The End (deux UID/alias). Une de ces sept lignes conserve un ancien concept ; les six autres n’ont pas de PNG. Aucune relance par un alias n’a été utilisée.

Sur les 416 lignes historiques de tenues officielles, 177 nécessitent encore une référence visuelle complète et fiable de la même incarnation ; 0 changement de forme reste à cadrer. Elles apparaissent dans le catalogue et dans l’Excel, sans image de remplacement. Les archives officielles réutilisées, les nouveaux dessins et les équivalences strictes avec un Original sont distingués.

Les états «À vérifier» conservent les limites visuelles. Les références effectivement vues, les éditeurs/hébergeurs et leurs empreintes sont conservés ; cela ne certifie pas une identité pixel pour pixel avec les jeux d’origine. Les tenues créées sont identifiées comme créations.

## Contrôles et conservation

1209 PNG sélectionnés ont été relus, décodés et vérifiés par empreinte et CRC. 500 références historiques de métadonnées sont résolues à l’octet près, dont49 anciennement périmées ; leurs receipts restent intacts. Les nouvelles métadonnées sont adressées par leur hash et ne sont plus écrasées. Les32 cadres signalés ont été contrôlés dans un rendu navigateur ; les nouvelles retouches remplacent uniquement leur costume concerné.

Les sources brutes, y compris les versions remplacées, restent préservées sur GitHub avec leurs SHA et commits immuables. Les pixels des PNG ne sont pas recadrés, recolorés ou réduits par un script. Les polygones de sélection servent seulement à afficher le bon sprite.

**Aucune nouvelle animation, modification des combats, des stages, des menus du jeu dans cette passe. Aucun déploiement Vercel manuel.**
