# Reprise P53 · audit et récupération des fichiers

État observé le **2026-11-19T05:36:05+00:00**, comparé au commit `192c473bf5c64f9babd0d2e3c45419ffe5fac0f4` du dépôt `darknigthmare/shadow-codec-ops`. Le [JSON de cet audit](current-local-audit.json) détaille les chemins, tailles, SHA-256, blobs Git et disponibilités locales. La comparaison porte sur ce commit précis ; elle ne remplace pas le contrôle de publication de la PR.

## Récupération supplémentaire depuis GitHub

**Cinq blobs texte historiques ont été retrouvés et restaurés, sans génération ni reconstruction de leur contenu.** Trois reviennent à leur chemin d’origine ; deux variantes antérieures sont archivées sous un nom comprenant leur empreinte. Les sept SHA Git connus de ces documents ont été vérifiés par lecture : cinq existent et deux variantes du registre de visuels retournent GitHub 404.

| Document récupéré | Destination | Classe |
| --- | --- | --- |
| Catalogue de 20 costumes originaux | `original-costumes/costumes.json` | Chemin historique restauré |
| Galerie des costumes | `original-costumes/index.html` | Chemin historique restauré |
| Registre de huit visuels | `visuels-recuperes/sources.json` | Chemin historique restauré |
| Ancien catalogue de costumes | `recovered-variants/original-costumes/costumes.eed2d221c8cae09fb538e1d05b84150b868cf3e2.json` | Variante conservée |
| Ancienne galerie de costumes | `recovered-variants/original-costumes/index.153e752bee35fa77abdad8f342b1d29e2e4cb77a.html` | Variante conservée |

Les [preuves de récupération](orphan-blob-recovery.json) consignent chaque SHA Git demandé, l’empreinte recalculée, le SHA-256 et la taille des octets restaurés. **Aucune image n’a été récupérée par cette opération sur les blobs texte.** Les libellés historiques du catalogue ne prouvent donc pas la disponibilité actuelle des PNG. Les [costumes](../original-costumes/README.md) et le [registre de visuels](../visuels-recuperes/README.md) possèdent chacun une notice d’archive explicite ; leurs galeries restent hors du menu jouable.

## Ce que signifient 143 / 94

Le [relevé historique](local-recovery-observations.json) conserve **143 chemins P53** observés avant le remplacement d’un environnement. Il contient des métadonnées et des noms de fichiers, sans les octets des images perdues. Dans le commit de comparaison, **49 de ces chemins sont présents et 94 absents**.

Le premier état local de cette reprise retrouvait 50 chemins : les 49 fichiers du commit, dont les octets correspondent à leur blob enregistré, plus `animation-studies/generation-guard.json`, restauré depuis son texte intégral et son empreinte conservés. Ce dernier fichier est une note de génération, pas une illustration.

La récupération des trois documents historiques porte maintenant le total à **53 chemins P53 présents sur disque et 90 encore absents**. Les deux variantes archivées sont des fichiers supplémentaires ; elles ne réduisent pas deux fois le nombre de chemins historiques manquants.

| Catégorie historique | Chemins observés | Présents dans le commit | Présents sur disque | Absents sur disque |
| --- | ---: | ---: | ---: | ---: |
| acid2-defense | 5 | 5 | 5 | 0 |
| animation-studies | 32 | 31 | 32 | 0 |
| arena-studies | 9 | 1 | 1 | 8 |
| null-substation | 1 | 1 | 1 | 0 |
| original-costumes | 41 | 0 | 2 | 39 |
| props | 11 | 11 | 11 | 0 |
| raptor-parts | 19 | 0 | 0 | 19 |
| shadow-moses | 16 | 0 | 0 | 16 |
| visuels-recuperes | 9 | 0 | 1 | 8 |

Les **quatre chemins publics supplémentaires** du relevé sont comptés à part. Le module `public/cqc/src/cqc-p53-service-yard.js` existe et a évolué pour Strut F. Les trois fichiers historiques de `p53-oil-fence` — `signal-buoy.webp`, `oil-fence-pontoon.webp` et `big-shell-sunset.webp` — restent absents. Aucun fichier de remplacement portant leur nom n’a été inventé.

Les dix anciens dossiers de production et les neuf chemins locaux d’archives du relevé restent absents de l’environnement actuel.

## Créations locales réellement conservées

Le checkout de départ contenait **23 fichiers non suivis et un module modifié**. Les références copiées pour la revue ne comptent pas comme nouvelles illustrations. Huit dessins sources de ce lot ont été retrouvés dans le dossier de génération, le dossier de production et le checkout, avec identité SHA-256 entre les copies :

| Lot récupéré localement | Dessins sources | Contenu | État |
| --- | ---: | --- | --- |
| Null · Portable Ops | 2 | Garde basse et reprise d’appui arrière | Poses individuelles ; admission runtime distincte |
| Quart de pluie · Scout Diamond Dogs | 3 | Coque du casque, façade du gilet, genouillère | Pièces séparées du costume original |
| Big Shell · Strut F | 3 | Entrepôt, caisse, garde-corps | Décor et accessoires référencés dans le module local |

La [provenance Strut F](../big-shell-strut-f/README.md) comprend les prompts et métadonnées d’origine. Sa référence de style correspond au blob déjà présent de `public/cqc/assets/p53-service-yard/strut-c-mess.png` ; le manifeste réutilise ce chemin et évite une copie de 2,48 Mo.

Les créations réalisées en parallèle de cette reprise sont inventoriées séparément par leur chemin et leur empreinte. À l’heure de ce snapshot, le périmètre contient **207 fichiers**, dont **145 chemins d’images** correspondant à **134 contenus distincts**. **16 images distinctes** ne figurent pas dans le commit de comparaison. Ces chiffres concernent le contenu présent ; ils ne sont pas une validation d’animation, de fidélité ou de disponibilité en combat.

## Recherche des images historiques restantes

Les documents récupérés fournissent des SHA-256 d’images, mais aucun SHA-1 Git de blob pour les PNG manquants. Un SHA-256 seul ne permet pas d’adresser le contenu via l’API GitHub des blobs. Les 17 empreintes des poses originales ne correspondent à aucun nom de fichier de l’arbre Git comparé ni à d’autres mentions dans les registres CQC locaux.

Pour les huit images du registre `visuels-recuperes`, la [recherche locale documentée](visuels-local-scan.json) a inventorié **7 955 PNG**, puis comparé par SHA-256 les **3 753 fichiers aux dimensions compatibles**. Elle n’a trouvé aucune correspondance et n’a rencontré aucune erreur de lecture. Aucun dessin, modèle ou cycle d’animation n’est déclaré récupéré sur cette base.

## Recherche ciblée de sauvegardes P53

Les recherches par titres P53 et noms précis du relevé, ainsi que les 200 métadonnées les plus récentes du dossier sauvegardé **MGS Codec Simulator**, n’ont identifié aucun candidat directement lié aux sources P53 manquantes. L’élément le plus récent renvoyé dans ce dossier est daté du 22 septembre 2026. Les anciennes archives de septembre n’ont été ni téléchargées ni retraitées ; aucun téléchargement n’a été effectué pendant cette recherche.

Ce résultat ciblé ne prouve pas l’absence de toute copie renommée, non indexée ou conservée ailleurs. Il reste distinct de la récupération réussie des cinq blobs texte GitHub.

## Méthode et conservation

Les fichiers originaux récupérés ont été conservés dans leurs octets exacts. Une égalité de SHA-256 prouve l’identité de fichiers disponibles ; une égalité de blob Git compare des octets à un objet Git précis. Ces contrôles ne certifient ni une fidélité 1:1, ni une animation fluide, ni une intégration jouable ou une publication distante.

Le périmètre couvre les fichiers P53 sur disque, les actifs publics `p53*`, le module d’arène, les chemins historiques et les sources survivantes du dossier de production. Ce README et le JSON principal sont exclus de leur propre inventaire. Le résumé du premier snapshot est conservé dans `firstSnapshotBeforeOrphanLookup`.

La garde de génération de la correction de marche Snake AC!D 2 Color B est conservée à l’identique. Les poses 3 et 4 restent des études archivées, sans affirmation de cycle complet validé.
