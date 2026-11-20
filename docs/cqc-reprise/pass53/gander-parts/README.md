# Metal Gear Gander · pièces séparées

Les 43 PNG conservent les pixels des trois images sources du projet. Les deux dossiers correspondent à deux représentations de Gander dans *Metal Gear: Ghost Babel*. La fidélité pixel par pixel a été vérifiée par rapport aux dessins du projet.

| Source | Pièces au repos | États supplémentaires |
| --- | ---: | --- |
| [Atlas P16](pass16/) | 16 | Mâchoire ouverte et deux nacelles ouvertes, côté proche et côté éloigné |
| [Vue de trois quarts P30](pass30/) | 23 | Plaque inférieure de la mâchoire ouverte |

Dans la vue P30, certaines pièces du côté éloigné apparaissent comme de minces fragments. Elles correspondent à la surface que laisse voir la carrosserie sous cet angle. Les 23 découpes de l'état au repos couvrent exactement les 445 622 pixels de la source dont l'alpha est supérieur à zéro. Chaque pixel visible appartient à une seule découpe.

Le [manifeste des pièces](gander-parts.json) associe chaque PNG à son articulation, son état, son parent, son ordre de dessin, son échelle et sa source. Pour reconstituer l'image P30 au repos sur une toile de 1536 × 1024, utiliser les entrées dont `when` vaut `null` et poser chaque PNG au coin supérieur gauche donné par `sourceRectXYWH`. Pour animer une pièce, utiliser `pivotXY` dans le PNG recadré. Un pivot peut se trouver à l'extérieur de sa découpe. Les quatre points d'ancrage invisibles figurent séparément dans `anchors`.

Sources du projet au [commit de référence](https://github.com/darknigthmare/shadow-codec-ops/commit/3755d082d1f9c2a971795c2b33733b28a1b4535e) · [Catalogue P16](../../../../public/cqc/src/cqc-pass16-machine-catalog.js) · [Régions et articulations P30](../../../../public/cqc/src/cqc-pass30-gander-fidelity.js)
