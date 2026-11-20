# Null — extension des poses défensives

Trois nouvelles poses individuelles de **Null, Portable Ops**, produites le 19 novembre 2026 à partir de deux références déjà présentes dans le projet. Un personnage entier par PNG, orienté vers la droite, avec canal alpha.

| Fichier | Pose | Dimensions |
| --- | --- | --- |
| `null-high-guard-right.png` | Garde haute neutre | 1024 × 1536 |
| `null-low-guard-entry-right.png` | Entrée en garde basse | 1062 × 1482 |
| `null-low-guard-release-right.png` | Relâchement de la garde basse | 1060 × 1484 |

La [galerie](index.html) permet de contrôler les silhouettes sur plusieurs fonds. Les deux poses antérieures restent dans [`../null-defense/`](../null-defense/), sans modification.

## Provenance et vérification

- Générateur intégré `image_gen` : trois appels distincts, un sprite par appel. Prompts complets dans [`generation-prompts.json`](generation-prompts.json).
- Référence d’identité : [`null-p53-source.png`](../null-defense/reference/null-p53-source.png). Référence de rendu et de costume : [`null-backstep-recovery-right.png`](../null-defense/null-backstep-recovery-right.png).
- PNG bruts copiés à l’identique. Aucune retouche, recoloration, découpe, interpolation, symétrie ou reconstruction par code.
- [`manifest.json`](manifest.json) contient les dimensions, tailles, SHA-256, mesures alpha, repères visuels et limites de chaque image ; [`verification.json`](verification.json) consigne les contrôles.
- Contrôles effectués : lecture des trois PNG, RGBA, transparence réelle, silhouette non vide, fichiers distincts, identité octet par octet avec la sortie brute, inspection visuelle du personnage entier et de l’orientation.

## Statut de production

**Sources de revue, non admises au combat.** Ces trois dessins complètent les études défensives ; ils ne constituent pas une animation fluide. Ils ne remplacent aucun sprite du moteur.

Les raccords entre poses, ancrages, dimensions rendues, durées, hitboxes et vue gauche restent à calibrer avant utilisation. Les détails reconstruits doivent encore être comparés au modèle officiel de Portable Ops : la fidélité 1:1 n’est pas certifiée.

L’aperçu brut de la garde haute peut montrer des couleurs hors silhouette si un lecteur ignore l’alpha. Les échantillons de ce halo ont un alpha nul ; la galerie respecte le canal alpha. De faibles pixels d’alpha périphériques restent conservés dans les trois sources. Les bornes utiles du manifeste emploient le seuil alpha ≥ 32, sans modifier les images.

Les repères `lowestSoleSamplePixels` sont des mesures visuelles des dernières rangées de silhouette ; ce ne sont ni des pivots validés dans le moteur, ni des coordonnées de collision.
