# Quart de pluie — trois pièces séparées

Cette passe complète le costume original CQC **« Quart de pluie — passerelle »** du Scout Diamond Dogs (`completion44__diamond_dogs_scout_44`). La pose de référence avait déjà été publiée dans P53. Trois accessoires visibles ont maintenant chacun leur **PNG individuel transparent**.

| Pièce | Image | Taille |
|---|---|---:|
| Coque du casque de pont | [Casque](art/deck-helmet-shell-right.png) | 1 536 × 1 024 |
| Façade du gilet de flottaison ocre | [Gilet](art/flotation-vest-front-right.png) | 1 292 × 1 217 |
| Genouillère rembourrée proche | [Genouillère](art/padded-knee-guard-right.png) | 1 536 × 1 024 |

Ouvrir [l’aperçu autonome](index.html) avec ses dossiers voisins pour examiner les pièces et la référence. Les boutons de fond permettent de contrôler les contours sur fond sombre, clair ou quadrillé.

## Référence et production

La copie [du costume de référence](reference/dd-scout-quart-de-pluie-right.png) est identique au fichier publié au commit [`192c473`](https://github.com/darknigthmare/shadow-codec-ops/blob/192c473bf5c64f9babd0d2e3c45419ffe5fac0f4/docs/cqc-reprise/pass53/animation-studies/costume-study/dd-scout-quart-de-pluie-right.png). Son SHA-256 est `22b0dd9214e0ab6262f3dd8254df604c20b0fbed15a8ddbe80c8f2cc8cd4150f`. Cette copie ne compte pas comme une nouvelle illustration.

Les **trois générations indépendantes** ont utilisé imagegen intégré, chacune avec cette référence exacte et une demande de fond transparent. Les PNG sont conservés dans leurs octets d’origine. Les [prompts complets](prompts.json), [dimensions, empreintes et limites](manifest.json) et [contrôles PNG](verification.json) accompagnent les images.

Le casque reprend la coque visible ; la jugulaire est exclue parce que sa continuation passe derrière le visage. Le gilet est une façade reliée par les sangles présentes : aucun dos n’est inventé. La genouillère est celle de la jambe située à gauche dans l’image de référence, avec ses trois bourrelets. Les pièces conservent la perspective de la pose vers la droite.

## État de livraison

**Trois dessins sources de revue, un élément par image.** Le costume reste une création originale CQC, sans statut de tenue officielle. Les pièces sont des redessins guidés par l’image ; elles ne constituent ni une extraction pixel pour pixel ni une certification 1:1.

Les PNG possèdent un vrai canal alpha ; quelques pixels de très faible alpha subsistent hors de la silhouette principale et sont conservés avec le brut. Les bornes `silhouetteBoundsAlpha16` décrivent la partie utile sans modifier le fichier. Les attaches, les occlusions du corps, la direction opposée et les placements propres à chaque pose restent à établir avant l’usage en combat. Aucun changement de la garde de génération existante ni admission runtime n’est effectué par ce lot.
