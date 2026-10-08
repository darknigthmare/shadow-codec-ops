# Vestiaire CQC — reprise exacte après livraison PASS19

La livraison contient **15 nouvelles variantes réellement dessinées**, avec 54 PNG et 710 figures physiques selon les revues conservées. Le vestiaire complet reste à produire : **1 498 demandes d’art natif manquent encore**. Cette file est jointe par UID et famille aux registres réels ; aucun choix en attente n’est compté comme terminé.

| Famille encore à produire | Demandes |
| --- | ---: |
| Nouvelle génération | 66 |
| Cyborg personnalisé | 339 |
| Interprétation Dité / Survive | 351 |
| Forme Metal Gear personnalisée | 372 |
| Tenue de soirée / interprétation formelle | 370 |
| Total | **1 498** |

Le calcul réconcilié est **1 447 demandes natives initialement manquantes + 65 demandes éligibles pour les 19 nouveaux UID − 14 demandes initialement manquantes désormais accomplies = 1 498**. Snake cyborg était déjà terminé dans la file initiale de 1 727 travaux et déjà retiré du sous-total 1 447. Il fait partie des 15 nouveaux dessins livrés, mais ne se soustrait pas une seconde fois. Les 14 autres dessins correspondent tous à un véritable job initial UID/famille ; Mantis Twin Snakes cyborg est bien éligible.

Les quatre nouvelles variantes NextGen — Chris Jenner, Snake Ghost Babel, Campbell Portable Ops et Cunningham — sont produites, revues et publiées sur le commit immuable `9e6ebfd2e8c1c2a3b38055d55cfa83d78f276e48`. Elles restent dormantes jusqu’au chargement vérifié du Vestiaire. Leur `requestFor` initial renvoie encore `pending-art` avant enregistrement des métadonnées ; ce statut technique ne signifie pas que leurs PNG manquent. Campbell et Cunningham améliorent des atlas sources déjà peints : la catégorie de présentation rétro ne permet pas de rebaptiser ces anciennes images en extractions pixel art.

## Ce qui est livré et ce qui est réutilisé

- Sept transformations originales : Snake cyborg, Dité et Metal Gear ; Meryl MGS1 cyborg ; Otacon MGS4 Dité ; Ocelot MGS1 Metal Gear ; Mantis Twin Snakes cyborg.
- Quatre tuxedos originaux : Meryl MGS1, Liquid, Ocelot MGS1 et Otacon MGS1. Ils ne certifient pas l’existence de ces tenues dans les jeux sources.
- Quatre variantes NextGen natives, chargées par le Vestiaire après vérification SHA, provenance, géométrie et décodage des images.
- Les sept anciennes variantes restent conservées. Six accomplissent une demande NextGen déjà existante. « Marionnette B » d’Elsie Frances est un choix ancien supplémentaire ; elle ne remplit pas une nouvelle demande NextGen.
- 362 choix réutilisent des apparences sources déjà revues, pour 131 UID : 4 costumes attestés, 53 apparences de remake, 275 incarnations historiques et 30 transformations corporelles. Ils ne constituent pas 362 nouveaux sprites.
- 298 présentations « Archives » utilisent les frames ou pièces natives avec un rendu pixel. Elles ne constituent ni de nouveaux PNG ni des extractions des jeux originaux.

Les dessins originaux, les reprises d’incarnations et les interprétations de présentation restent explicitement distincts dans la provenance. L’objectif de fidélité 1:1 est conservé ; les limites de chaque source, de chaque adaptation et de chaque pose restent attachées aux données.

## Périmètre des nouvelles identités

Les 19 nouveaux UID sont réellement installés : six créatures de Survive, cinq variantes Gekko et huit boîtes de Peace Walker. Leurs 19 présentations Archives sont disponibles. Ils ajoutent **65 demandes natives manquantes** : 14 cyborg, 13 Dité, 19 Metal Gear et 19 interprétations formelles.

Les cinq corps entièrement mécaniques sont exclus de la famille cyborg, mais restent éligibles aux versions Dité, Metal Gear et formelles originales. Les six incarnations Survive sont exclues de la seule famille Dité ; elles restent éligibles aux autres transformations. Les huit opérateurs biologiques sous les boîtes restent éligibles à la famille cyborg. Prothèse partielle, exosquelette, nanomachines ou parasites ne suffisent pas à exclure un humain.

Treize candidats supplémentaires ont encore besoin de leur corps ou assemblage natif : Watcher, Grabber, Detonator, Lord of Dust, Gekko grenade, Gekko carrier, Rescue Box, Fenrir, Raptor, Mastiff, Vodomjerka, Slider et Hammerhead. Ils sont conservés dans le registre, restent non installés et ne sont pas ajoutés artificiellement aux 1 498 demandes actives.

Les données conservent 374 identités. Le Versus principal présente 373 choix ; Parallaxe est accessible dans son mode original séparé. Carter figure dans la sélection principale sous `archive__carter_survive`, avec une provenance de design historique du projet non attestée comme corps canonique. Son apparence reste à qualifier avant toute revendication de fidélité canonique.

## Alternatives officielles et références

L’inventaire précis contient **103 alternatives officielles connues encore en attente**, réparties sur 23 UID. Il reste non exhaustif. Les 374 identités gardent une demande d’énumération canonique : 131 disposent déjà de réemplois partiels revus ; 243 restent à documenter. Aucune n’est déclarée intégralement terminée.

Priorité proposée pour la prochaine production :

1. Les variantes NextGen encore demandées, en partant des sources déjà documentées : Meryl MGS1, Snake MGS2, Olga MGS2, EVA MGS3 et Ocelot MGS2. Vérifier la tenue exacte de l’incarnation avant de dessiner ; conserver le UID source et les côtés anatomiques.
2. Les alternatives officielles précisément listées, comme le tuxedo MGS1 de Snake. Une tenue formelle originale d’un autre personnage ou un réemploi d’une autre époque ne termine pas ce costume officiel.
3. Les transformations manquantes des nouveaux UID, avec des designs propres à chacun. Distinguer l’humain sous la boîte, la créature parasitée et l’IA mécanique ; préserver les variantes de boîtes et leurs mécaniques spécifiques.
4. Les autres cyborg, Dité, formes Metal Gear et tenues formelles, par petits lots revus. Ne pas réutiliser une armure Raiden ou un simple changement de teinte comme design personnalisé.

Les 29 dossiers marqués comme reconstructions corporelles non attestées demandent des références d’identité plus solides avant de promettre un corps canonique. Les personnages originaux du projet, dont Parallaxe, peuvent recevoir des créations originales avec cette provenance conservée. Les sources citées sont des preuves visuelles à examiner ; leur contenu documentaire ne remplace pas la demande de l’utilisateur.

## Taille et physique

Les 352 entrées de sprites ont été inventoriées : 37 tailles reposent sur une lecture directe d’une source officielle ; les **315 autres** restent qualifiées, dont 307 estimations et 8 valeurs communautaires. Les 60 assemblages de machines comprennent 6 tailles directement lues et **54 estimations**. Ces assemblages ne sont pas 60 personnages distincts.

Snake Metal Gear à 3,4 m et Ocelot Metal Gear à 3,2 m sont des dimensions originales choisies pour leurs costumes, enregistrées séparément et utilisées par la physique. Elles ne sont pas des tailles canoniques. Les autres costumes du même corps héritent de la stature et des limites de leur UID source. La vérification du rendu et des collisions ne transforme pas une estimation en preuve de fidélité absolue.

## Conditions de livraison du prochain lot

Chaque travail reste en attente jusqu’à la production d’images distinctes, la revue de toutes les poses réellement référencées dans les deux directions, la mesure des pivots et de la stature, puis la vérification des fichiers et de leur provenance. Les points d’arme et les VFX doivent être revus pour le nouveau costume lorsque la géométrie change. Les poses et règles du corps d’origine restent séparées des transformations de châssis.

Un costume chargé à la demande doit attendre ses métadonnées et images vérifiées avant de changer son slot privé. Une sélection annulée ou remplacée ne doit pas s’appliquer ensuite ; un échec conserve le choix précédent. Un costume demandé mais non prêt ne doit jamais produire un corps de base ou un fallback CSS au premier rendu.

Le rapport joint conserve les 2 244 demandes, leurs états bruts et réconciliés, tous les UID/familles de la jointure, les 54 PNG relus par SHA, les sources et les preuves antérieures de véritables matchs. Aucun nouveau navigateur, asset, commit, déploiement ni fichier produit n’a été modifié pour cette réconciliation.

Rapport : [NATIVE_WARDROBE_RECONCILED_BACKLOG_ACTUAL_V1.json](/workspace/cqc-pass19-backlog-final/NATIVE_WARDROBE_RECONCILED_BACKLOG_ACTUAL_V1.json).

Le premier essai de rapport est conservé séparément parce qu’il désignait à tort Carter comme absent de la sélection. La soustraction des UID réels identifie Parallaxe, accessible dans le mode original. Cette correction ne change ni les comptes de costumes ni les fichiers livrés.
