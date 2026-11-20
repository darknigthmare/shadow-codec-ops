# Big Shell · Strut F · Entrepôt

Trois images sources ont été récupérées et conservées dans leurs octets d’origine : un décor continu, une caisse de stockage individuelle et une section de garde-corps individuelle. Le module local enregistre l’arène **BIG SHELL · STRUT F · ENTREPÔT** sous `p53_big_shell_strut_f_warehouse` et place séparément les deux accessoires.

| Élément | PNG source | Dimensions | Canal |
| --- | --- | ---: | --- |
| Entrepôt à deux niveaux | [Décor](../../../../public/cqc/assets/p53-service-yard/strut-f-warehouse.png) | 1 672 × 941 | RGB |
| Caisse de stockage | [Caisse](../../../../public/cqc/assets/p53-service-yard/strut-f-storage-crate.png) | 1 774 × 887 | RGBA |
| Garde-corps | [Garde-corps](../../../../public/cqc/assets/p53-service-yard/strut-f-railing.png) | 2 170 × 725 | RGBA |

## Provenance

Les [prompts](generation-prompts.json) et [métadonnées d’origine](image-metadata.json) ont été copiés sans modification depuis le dossier de production. Le [manifeste](manifest.json) fournit les chemins du dépôt, les SHA-256, les blobs Git, les dimensions et les rectangles utiles au rendu.

Le chemin `reference/strut-c-style.png` inscrit dans le prompt d’origine désigne les mêmes octets que le [décor Strut C déjà présent dans Git](../../../../public/cqc/assets/p53-service-yard/strut-c-mess.png). Le blob `b99596f5a66afcc16a4af2641de42bdd72bb17db` et le SHA-256 `2dd3b050d5e58b6d288a12bf113405a07ea0020154b00df0ab80e2a92e322d07` vérifient cette identité. Le manifeste résout ce chemin historique vers l’actif existant ; aucune copie de référence supplémentaire n’a été créée.

Cette image représente **Strut C** et a servi à harmoniser les matières, la palette et l’éclairage. Le nouvel entrepôt est une adaptation latérale de **Strut F**, avec une géométrie interprétée. La fidélité 1:1 au lieu original n’est pas certifiée.

## Contrôles de récupération

Les trois PNG ont été entièrement décodés. Dimensions, modes RGB/RGBA, tailles en octets et SHA-256 correspondent aux métadonnées de production. Leurs octets correspondent aussi aux originaux du dossier `new-assets/strut-f/art` ; aucun recadrage ou redimensionnement des fichiers n’a été effectué.

Les accessoires conservent leur alpha brut. Le module utilise des rectangles de source mesurés à alpha ≥ 16 pour éviter que les grandes marges transparentes faussent leur taille à l’écran. Cette récupération ne constitue pas, à elle seule, une validation de combat ni une preuve de publication dans la PR. Ces deux contrôles relèvent de l’intégration de la passe.

[Module de l’arène](../../../../public/cqc/src/cqc-p53-service-yard.js) · [Audit des fichiers locaux](../recovery-20261119/README.md)

## Complément du 19 novembre : deux accessoires intégrés

Un [transpalette](../../../../public/cqc/assets/p53-service-yard/strut-f-pallet-jack.png) et une [lampe mobile de service](../../../../public/cqc/assets/p53-service-yard/strut-f-service-lamp.png) complètent les accessoires séparés de l’entrepôt. Chaque PNG contient un seul objet sur alpha transparent. Les [prompts](additional-props-prompts.json) et [métadonnées](additional-props-manifest.json) précisent leur provenance.

Le transpalette occupe l’arrière gauche ; la lampe reste à l’extrémité droite, derrière la caisse. Les rambardes forment l’avant-plan. Le centre de la piste est dégagé. Les fichiers bruts ne sont pas modifiés : leurs marges transparentes sont compensées uniquement au rendu.

L’[aperçu interactif](index.html) utilise le module du jeu. Deux rendus de contrôle montrent la [caméra centrée](../verification-20261119/strut-f-default.png) et le [déplacement et zoom maximaux](../verification-20261119/strut-f-extreme-pan.png).

Le rendu Canvas des cinq arènes P53 a été contrôlé dans **45 configurations**. Toutes chargent leurs PNG, couvrent le cadre sans pixels transparents et respectent l’option de parallaxe désactivée. Ce contrôle raster utilise le module inchangé et les images réelles ; il ne constitue pas un test de combat dans un navigateur. Le [rapport détaillé](../verification-20261119/canvas-verification.json) consigne cette portée.
