# Reprise des fichiers locaux CQC — 26 novembre 2026

Cette archive conserve les fichiers de travail restés en dehors de la publication P67. Elle fait partie du chantier de reprise de la PR #25 de `darknigthmare/shadow-codec-ops`.

## Publication à laquelle se rapporte l’archive

P67 a été publié au commit `0a92d18aa7bb4068f0be0265bf01d884e3404e95`, arbre `9ba36a3f8a44c1711fc16c4f8a5546147550e230`, avec pour parent P66 `5d7c6c5187f3906ad1ead53706e83674750f1c34`.

La vérification postpublication a confirmé les **290 identités de fichiers publiés**, avec 282 ajouts, 8 modifications et aucune suppression. Les preuves enregistrées figurent dans `records/p67-post-publication-verification.json` et `records/p67-published-pr-head.json`. Ces preuves portent sur la publication P67, pas sur la publication ultérieure de la présente archive.

## Contenu conservé

| Dossier | Fichiers copiés | Rôle |
|---|---:|---|
| `snapshots/` | 11 | Versions locales exactes de fichiers écartés du commit P67 |
| `tools/` | 8 | Sept scripts de préparation antérieurs et le vérificateur de publication P67 |
| `records/` | 31 | Trente plans, journaux, rapports et descriptions de PR, plus la copie de l’audit local |
| **Total des copies exactes** | **50** | **680 433 octets** |

`README.md`, `secret-scan.json` et `manifest.json` décrivent cette archive. L’ensemble contient donc **53 fichiers**. Le manifeste recense les 52 autres fichiers avec leur taille, SHA-256, empreinte Git et provenance ; il ne s’auto-référence pas par une empreinte circulaire.

## Pourquoi les snapshots restent des archives

Les onze versions de `snapshots/` ne remplacent aucun fichier canonique du projet. Neuf documents historiques P64/P65 ne diffèrent des versions déjà publiées que par les espaces ou retours à la ligne finaux. Les deux autres fichiers sont `package.json` et `AGENTS.md` provenant du snapshot de travail. Leur présence ici préserve les octets locaux et leur provenance, sans présenter ces copies comme une mise à jour active de la configuration du projet ou des instructions des agents.

Les huit scripts de `tools/` sont conservés tels quels. Certains dépendent de chemins de session ou de caches de recherche. Leur archivage ne prétend pas qu’ils sont installés, automatiquement exécutables depuis tout environnement ou nécessaires au lancement du jeu.

Les journaux de transfert P67 ont été produits avant le commit final : leurs indicateurs `treeCreated: false`, `commitCreated: false` ou `refUpdated: false` décrivent ce stade historique. `records/local-audit.json` décrit également l’état constaté avant la fin de publication. Pour établir l’état effectivement publié, consulter les preuves postpublication citées plus haut.

## Ancien snapshot déjà publié

Le snapshot `/workspace/scratch/52317e972fd3/p64-runtime-review-9725a40` a été vérifié contre l’arbre du commit P65 `101b15617f8766353800ffc1be592ec1aef6b66c` : **165 fichiers, 87 600 054 octets, 165 identités Git égales, aucune différence**. Tous ses chemins sont déjà présents dans P66. Il ne contient donc aucun nouveau livrable à recopier dans cette archive.

## Copies et caches inventoriés sans duplication

Le manifeste énumère les exclusions et leurs empreintes lorsque pertinentes :

- `p65-integration-baseline` et `p66-integration-baseline` sont des copies de versions de référence déjà connues.
- `p66-tree-paths.txt` est l’index reproductible des chemins de l’arbre P66, d’une taille de 2 289 862 octets.
- `p67-classic-reference-cache` contient huit fichiers de recherche téléchargés ou dérivés, pour 30 945 029 octets : manuel original MGS1, pages rendues non retenues et HTML. Les URL de provenance et les extraits utiles sont déjà conservés dans la recherche P67. Ce cache ne contient aucun sprite de jeu supplémentaire généré à publier.

Aucun fichier source local n’a été supprimé. Les contenus effectivement sélectionnés ont été contrôlés avant copie pour rechercher les principaux motifs de secrets ; aucun motif n’a été détecté. Les résultats et les limites de ce contrôle sont consignés dans `secret-scan.json`.
