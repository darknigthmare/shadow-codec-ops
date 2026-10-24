# Reprise CQC — lots de 30

La demande reste la même : compléter les costumes officiels de chaque incarnation, puis les créations CQC, les personnages et les machines manquants. Chaque lot contient **30 éléments**, avec un état distinct pour les références, le dessin, l'intégration, la vérification en combat et la publication. Un dessin, une référence ou une réparation ne compte pas comme un personnage livré.

## Lot engagé

Le manifeste `batch30/manifest.json` fixe le périmètre : 14 camouflages MGS3, 9 costumes CQC et 7 unités. Les autres demandes restent dans les listes historiques P39 ; elles ne sont pas supprimées par ce lot.

- Garder les incarnations séparées. Un costume de Meryl MGS4 ne complète pas Meryl MGS1.
- Pour le canon, viser la fidélité aux références officielles et signaler les détails non attestés. Les animations adaptées au combat CQC ne sont pas des animations extraites des jeux originaux.
- Les versions rétro sont redessinées. Elles ne sont pas des images simplement réduites ou floutées.
- Les créations cyborg suivent une conception mécanique personnelle cohérente avec Revengeance. Les créations Metal Gear sont des machines sans cheveux, peau ni visage humain.
- Vérifier la stature, les pieds et l'axe horizontal lors des changements de costume ; vérifier les sorties d'armes dans les deux sens en combat réel.
- Pour les machines, vérifier les articulations, la perspective et l'ancrage au monde ; l'approche du joueur ne doit pas déplacer le boss avec lui.
- L'option Liquid « nouvelle génération » complète une famille déjà commencée ; elle n'est pas comptée comme une nouvelle famille découverte.

## État de la reprise

Le contrôle du 22 octobre 2026 constate que 184 liens d'images du lot non publié pointent vers des fichiers temporaires absents. Ces liens ont été inventoriés sans modification. Les anciennes validations P40 ne peuvent pas servir à approuver des dessins de remplacement.

P39 reste la dernière livraison jouable vérifiée. Les PR antérieures ont été fusionnées ; aucune publication P40 n'était visible lors du contrôle GitHub/Vercel. Le dossier Drive du projet contient des éléments Pass38, sans sauvegarde P40 retrouvée par nom.

Les preuves se trouvent dans `recovery/`. Les 14 références originales KONAMI sont sauvegardées dans `references/canonical/`. Le nouveau dessin Soviet Woodland se trouve dans `art/` ; les défauts sont conservés avec leur état, sans les annoncer comme intégrés.

## Conservation des nouveaux travaux

Chaque nouveau fichier image doit être sauvegardé immédiatement comme fichier régulier dans ce dossier persistant, avec son prompt, ses références et son SHA-256. Aucun nouveau dessin ne doit avoir pour seule sauvegarde un lien vers `/tmp`. Les versions rejetées sont conservées et identifiées. La sauvegarde distante se fait sur une nouvelle branche GitHub, avec relecture des octets publiés.

Un manifeste valide décrit l'état du travail. Il ne prouve pas que les 30 éléments sont terminés. La version publique ne doit être annoncée comme mise à jour qu'après vérification du commit réellement déployé.
