# Raptor natif — lot39

Le corps retenu est le Raptor de Metal Gear Rising: Revengeance, avec la nacelle dorsale visible à quatre ouvertures2×2. La page et la vidéo officielles2013 de KONAMI sont corroborées par un miroir de presse contemporain. Les captures natives ont été vues, puis la lecture des quatre ouvertures a été confirmée indépendamment sur80,6s et81,12s. Les vues80–81s déterminent cette variante ; l’autre montage visible à82s ne lui est pas fusionné.

Les deux atlas V1 ont chacun16dessins physiques et une orientation native propre. Ils restent des peintures et des mouvements adaptés pour CQC2D5. La fidélité concerne l’apparence observable au plus proche des références ; les surfaces masquées, les pivots3D et l’identité bitàbit du modèle retail ne sont pas certifiés. Les muscles restent dessinés dans chaque pose, sans fausse découpe en barres rigides. Les petites surfaces musculaires partiellement couvertes par l’armure demeurent une limite de la projection choisie.

La générationV2 imposait par erreur six ouvertures à partir d’une hypothèse de perspective. Elle est conservée dans l’archive des sources et reste exclue du runtime. Seuls les deux PNG V1 sont utilisés, sans modification de pixels.

Les rectangles de plusieurs poses contiennent des voisins. Chaque pose dispose donc d’un contour exact de l’union de ses pixels significatifs. La preuve32poses donne ownLost=0 et foreignKept=0 au seuil d’analyse alpha16. Ce seuil et ces contours ne modifient aucun PNG. Les conventions sont explicites : index0..15 ; missileWindup10 ; missileFire11 (ordinal12, ligne3col4) ; recover12.

Les deux hauteurssources de l’idle sont286px à droite et274px à gauche. Les pivots de placement sont des repères2D de masse/contact dessinés, pas des sockets3D extraits. La hauteur3,2m reprend l’estimation historique, sans certification métrique.

Le profil dédié réécrit les10coups, l’énergie, le passif mécanique et le corps de simulation. Deux coups utilisent chacun un seul missile, interval0 : Tir dorsal antiaérien et Impact dorsal renforcé. Les deux coordonnées du tube peint fixent origine et vecteur, avec la vitesse du profil préservée. Il n’y a ni visée sur la cible ni homing ; l’axe montant peut survoler les personnages au sol. Les lames et le contact traitent le combat rapproché.

La sélection de la source exige le bon UID, le bon moveID, le bon facing et les file/SHA/rect/pivot actuels du dessin de tir11. Les autres UID conservent exactement leur API de visée précédente. Les kits des modes utilisent le même wrapper dédié lors de COMBAT.prepare/install. Les environnements sans combat ou sans nativeAim chargent le module sans ajout de moteur.

Aucun rig articulé/destructible n’est ajouté :64rigs et841pièces restent inchangés. Les deux PNG représentent12 580 128octets RGBA décodés, environ12Mio. Le rendu utilise les gardes existantes ; ce lot ne modifie pas les budgets globaux.
