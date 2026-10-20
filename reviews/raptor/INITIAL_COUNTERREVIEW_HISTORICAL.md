# Raptor — contre-revue indépendante initiale

Lecture seule du produit. Sources graphiques vues : atlas V1 droite/gauche et captures officielles du trailer KONAMI Unmanned Gears (miroir de presse contemporain), t073/080/081/082/085/087. Les candidats V1 et V2 restent en quarantaine tant que Root n'a pas approuvé les sources finales.

Les captures080/081 montrent le Raptor noir, ses grandes coques d'avant-bras à lame, griffes mécaniques, cuisses organiques distinctes, optiques rouges et module cylindrique dorsal. Les prises de vue et reflets rendent le nombre, l'arrangement et certains axes des tubes ambigus. La vue082 possède une autre configuration supérieure ; elle ne remplace pas automatiquement le module cylindrique de080/081. La forme « deux colonnes × trois rangées » demandée pour V2 reste une interprétation graphique à qualifier, pas une géométrie primaire certifiée.

Les points de missile doivent provenir d'une ouverture physique du **module dorsal**, dans la pose active de la face sélectionnée. Le rouge de la tête et les lumières d'avant-bras sont des optiques/détails lumineux ; ils ne sont pas des bouches de canon. Aucune arme de poing humaine n'apparaît et ne doit être inventée.

Le UID `pass19__raptor_mgr` existe au registre candidat, mais aucune disponibilité native n'en découle. Le template actuel est le GekkoMGS4. La branche générale réinitialise les dix coups en contacts physiques et ne possède aucun cas `raptor` : sans nouveau tailor, le combattant aurait dix coups génériques et aucun missile. Voir `CURRENT_CHAIN.json` et le profil préparé issu des vraies données locales.

Le renderer reconnaît les nouvelles actions par `actionMap` explicite : sa détection spécialisée `hasNativeActionSemantics` porte actuellement sur les sources pass18 ou les costumes originaux détenus. Un atlas Raptor dans un nouveau dossier ne bénéficie pas automatiquement de cette réinterprétation. Toute projection CQC, coup bas, missile, repli ou récupération doit donc pointer vers sa vraie pose/action déclarée.

La chaîne spatiale mesure la stature à220/1,82 unités par mètre ; un record estimé de3,2m donne386,813 unités avant le multiplicateur de présentation1,12. Ces unités de rendu ne doivent pas être confondues avec le rectangle PNG ni avec les200unités/1,8m de l'Arsenal. Conserver une seule application du facteur dans projectile/frame/contact, pivots au sol et stature source neutre par PNG.

Le futur Raptor sera un combattant en poses entières indépendantes, pas un65e rig articulé ni une preuve de jambes/bras séparés. Les mouvements, timings, collisions et cadence sont des adaptations CQC2D5. Aucune destruction indépendante de morceaux ne doit être annoncée pour ces seules planches.

Contrôles encore attendus sur le nouveau code et les PNG finaux : deux faces réelles/16corps chacune ; contours sans capture de voisins ; orientation effective des coups et des ports ; pivots pieds sans aimantation ; neutralisation des mécanismes Gekko hérités ; dix slots adaptés et missile tirant depuis le vrai tube ; trajet initial compatible avec l'axe dessiné ; ressource/passif machine explicites ; même forme dans menus/modes/matchs ; pas de pistolet générique ; origine mise à l'échelle une seule fois ; métadonnées/SHA/caméra exacts ; limites de taille et surfaces cachées maintenues.
