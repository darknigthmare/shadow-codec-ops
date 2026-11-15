# REX PS1 et RAY MGS2 : sprites par pièce

REX et le RAY produit en série d’Arsenal Gear utilisent maintenant des PNG natifs assemblés sur des pivots, dans CQC autonome et dans le même jeu intégré à Shadow Ops. Les références originales de MGS1 et MGS2 restent distinctes de Twin Snakes et de Revengeance.

- REX : 12 éléments visibles séparés, six segments de jambes, trappe et mâchoire mobiles, cockpit avec pilote, railgun et radôme. La rupture réelle du radôme remplace sa coque et projette trois fragments temporaires. Un joint logique transparent complète la hiérarchie ; les supports de coque restent intégrés au corps.
- RAY : 14 éléments séparés, deux épaules et deux bras-canons, tête, mâchoire, émetteur intérieur, six segments de jambes. Un impact au genou fait fléchir la jambe et expose la mâchoire. Une neutralisation fait s’affaisser l’unité ; un simple stagger n’arrache aucune jambe.
- Les PNG originaux restent inchangés. Les rectangles de l’atlas, pivots, échelles uniformes et ordres de dessin sont explicites. Les poses et débris suivent l’état du combat, donc la pause les fige.
- Les images sont vérifiées par SHA-256 et décodées avant le lancement. Une attente unique remplace le flash de l’ancien dessin. Les chargements annulés ne relancent pas une ancienne sélection.

Le moteur, les points faibles, dégâts, sauvegardes et replays conservent leurs données existantes. Le graphe officiel vérifie 1 141 fichiers ; aucun chemin historique n’est supprimé.

Validation locale réelle : 705 tests Shadow Ops, 27 contrats du renderer/bridge, lint, 18 observations desktop et 22 observations mobile dans l’onglet Shadow. Les six tirs naturels détruisent le radôme de REX et ouvrent son cockpit ; RAY passe par le genou, la mâchoire et la neutralisation de la première unité. Pause, mouvements réduits et rechargement ont été observés. Ces parcours ne revendiquent pas une victoire complète contre les deux boss.

La fidélité suit les références originales et reste à affiner ; le 1:1 absolu n’est pas certifié. Ce lot couvre ces deux rencontres Core, ainsi que leur dessin dans les Chroniques. Les autres machines et les moteurs AC!D/Revengeance attendent leur propre rig.

Les rapports ci-joints gardent leurs statuts et dates réels : les reçus préparatoires antérieurs indiquent encore leurs étapes alors en attente. Le rapport `ROOT_FINAL_ACTUAL_LOCAL_QA_V1.json` consigne la vérification locale finale. Le build complet Vercel et les observations publiques font l’objet de reçus séparés après publication.

`lossless/` conserve les originaux, références, prompts, essais rejetés, calibrations et captures avec leurs identités de chemin. Les index permettent la reconstruction byte pour byte des objets archivés ; les aperçus synthétiques restent identifiés séparément des combats réels.
