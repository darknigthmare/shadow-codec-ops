# CQC P37 — contacts fixes et articulation Peace Walker

État : **pending**. Les corrections et vérifications déjà réalisées sont décrites ci-dessous ; la publication P37 et la vérification de la livraison publique attendent leurs preuves finales. Ces documents ne déclarent pas ces étapes réussies.

En Versus, le partage égal du chevauchement déplaçait une machine immobile quand le joueur marchait contre elle. Le contact annule maintenant le déplacement entrant de son propriétaire sans le transmettre à la machine. Le test propriétaire passe de 39 machines déplacées à zéro ; les mouvements propres, dégâts et knockbacks restent couverts. Le combat humain/humain garde le même état sur 200 frames.

Les 33 scènes Arsenal gardent le corps et le décor fixes lorsque le joueur approche, y compris les petites scènes et le décor de secours HTML. Archive capture la destination de chaque charge Bulldozer au départ du projectile. Dans le duel REX/RAY, la position de RAY au repos ne dépend plus d'une limite calculée depuis le joueur, ni d'un décalage de pose réinjecté dans sa racine. Les déplacements demandés par son IA restent actifs.

La jambe proche du Peace Walker bipède reçoit une partition corrigée entre coque, cuisse et tibia : 499 924 centres de pixels non transparents, zéro perdu et zéro possédé deux fois. Les images sources restent intactes. Le registre d'encre ajoute trois mesures et conserve les 872 valeurs et octets lexicaux antérieurs ; il contient 875 enregistrements. Les deux textures de mollet éloigné sont aussi rattachées au bon tibia. Les 512 chaînes bipèdes contrôlées gardent une distance de jonction nulle. Le quadrupède utilise les contacts natifs du genou et de la cheville, avec ses échelles et découpes intactes : 353 ticks sur deux cycles gardent les jonctions fermées et le même sol. Ces mesures proviennent du moteur et du rendu contrôlé ; le contrôle navigateur indépendant est passé sur le gel runtime exact.

Aucune fidélité absolue 1:1 n'est certifiée. Les vues opposées, intérieurs masqués, phases originales, dimensions non documentées et autres demandes historiques restent suivis dans le backlog intégral conservé.

[Détails et validations pending](NATIVE_COMPLETION.json) · [Travaux à poursuivre](NEXT_LOT.md)
