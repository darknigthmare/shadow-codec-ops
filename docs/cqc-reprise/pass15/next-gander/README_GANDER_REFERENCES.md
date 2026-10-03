# Gander : préparation documentaire fermée

Cette livraison prépare le prochain chantier Gander de **Metal Gear Ghost Babel**. Elle ne modifie ni le runtime livré, ni PASS15 : aucun sprite, décor ou atlas ImageGen n’a été généré. Les originaux web sont conservés avec URL, date, statut HTTP, taille et SHA256 ; leurs conversions servent uniquement à lire les documents.

La référence officielle Konami montre une coque arrondie gris-violet, deux jambes, de longues structures latérales et une ouverture basse intégrée au corps. Les captures GBC confirment une armure violette, deux tourelles frontales, deux pods circulaires supérieurs, un ensemble arrière double et une bouche centrale pour les flammes. Leur présence visuelle ne prouve pas de nouveaux pools de PV, pivots ou morceaux détachables. Les jambes peuvent perdre leur mobilité puis le corps s’abaisse ; aucun démembrement supplémentaire n’est proposé sans source.

Le guide japonais, feuille0088, organise le combat en trois étapes : pieds avec mines/C4, armes/pods avec grenades/Nikita, puis bouche et flammes. Le commentaire LP décrit deux grandes phases et des sous-étapes internes. Le Core livré possède deux phases et cinq pools indépendants de2400PV : near, far, cannon, missiles et fire. Les WISP, la séquence tourelles invulnérables→pods ouverts, puis le backpack et la bouche sont des différences mécaniques à traiter explicitement dans un futur périmètre ; ils ne sont pas corrigés ici.

Le conflit principal à résoudre avant production est la bouche canonique basse et centrale face à la cible `fire` actuelle située à droite, en1320/190. Une mâchoire placée artificiellement hors du corps pour couvrir cette cible ne serait pas fidèle. La paire de tourelles originelles invulnérables diffère aussi du pool `cannon` actuel. Le futur rig doit soit conserver les règles présentes en qualifiant l’adaptation, soit être précédé d’une restauration mécanique clairement bornée. Ce dossier n’exécute aucune de ces options.

La salle originale visible possède un sol très sombre, des lignes vertes, une zone haute teal et une bande noire/jaune, ainsi que des caisses basses vertes/violettes et des débris gris-violet. Les grands piliers, ventilateurs et poussières du décor procédural actuel ne sont pas confirmés par les références examinées. Le passage du dessus GBC au rendu latéral2.5D impose une adaptation de projection : ce dossier ne certifie pas une fidélité1:1 de la future salle.

Le plan proposé prévoit un master de proportions puis au maximum quatre atlas natifs : corps, deux jambes, structures latérales/tourelles/pods et backpack/mâchoire. Un maximum de deux révisions ciblées et16Mio de PNG runtime borne la production future. Chaque PNG ImageGen devra rester intact ; seules les métadonnées de découpe et transformations runtime pourront assembler les pièces. Un futur décor pourra employer quatre couches documentées, sans masquer les cibles ni introduire d’animation non sourcée.

Le JSON `GANDER_REFERENCE_PLAN_V1.json` distingue les observations originales, les contrats exacts du Core, les mécaniques absentes et les propositions non exécutées. Les extraits R/S étaient identiques lors de leur lecture. Le Core complet peut évoluer pendant les autres travaux de Root ; les empreintes par section et l’extrait conservé donnent le vrai état comparé.

- Sources officielles : [Konami](https://www.konami.com/mg/archive/ghostbabel/english/metalgear.html) et [illustration originale](https://www.konami.com/mg/archive/ghostbabel/japanese/character/pic/metalgear.gif).
- Guide original numérisé : [Internet Archive](https://archive.org/details/metal-gear-solid-ghost-babel-perfect-guide), feuilles0088 et0126 seulement, sans téléchargement du livre complet.
- Captures GBC et commentaire secondaire : [LPArchive Update43](https://lparchive.org/Metal-Gear-Ghost-Babel/Update%2043/).
- Preuve de lecture physique : `research/PHYSICAL_REFERENCE_REVIEW_V1.json`,14 images vues. L’audit indépendant externe conserve8 lectures supplémentaires/recoupées et ses propres pins.
- Fermeture et inventaire intégral : `CLOSED_GANDER_REFERENCE_DELIVERY_V1.json`.
