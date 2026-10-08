# Pass19 — apparences et tenues officielles

Le census couvre explicitement les 355 UID du lot source 5642ae495aa68eaf940e10724de8f3986f808cd0 : 338 atlas de combattants et 17 identités rendues par le système de machines. Ce décompte n'est pas une certification de garde-robe officielle exhaustive.

L'addon `cqc-pass19-canonical-appearances.js` ajoute 362 options natives pour 131 UID appartenant à 45 groupes du même individu. Aucune PNG n'est créée, recolorée, aplatie, copiée ou remplacée. Les atlas déjà acceptés conservent leurs directions indépendantes, toutes leurs poses, rectangles, pivots, hauteurs et limites de revue.

Les 362 options se répartissent ainsi :

- 4 véritables changements de tenue dans une même incarnation : Solid Snake / Iroquois Pliskin dans MGS2, EVA motarde / Tatyana dans MGS3 PS2, chacun dans les deux sens.
- 53 apparences de remakes PS2 / Delta ou PS1 / The Twin Snakes.
- 275 incarnations historiques nommées, y compris les changements d'âge, de tenue ou de blessure du même individu.
- 30 transformations ou formes équipées : Raiden humain / cyborg, Gray Fox humain / ninja, les quatre Beauty / Beast, Olga / Mr. X et Volgin / Man on Fire.

Une incarnation historique ou un remake n'est jamais annoncé comme costume alternatif que le jeu source aurait proposé. Un changement de corps n'est pas une simple veste transférée. Les apparences sont des choix cosmétiques : UID, identité, lore, valeurs de combat, équipements de gameplay et collisions de l'acteur restent ceux du combattant choisi. L'attestation porte uniquement sur les faits visibles déjà revus dans l'atlas source ; aucune certification visuelle absolue 1:1 n'est revendiquée.

Les références et limites originales sont héritées à l'enregistrement. Big Boss / Venom, Solid Snake / Snake AC!D / le clone AC!D2, Teliko / Clown, les vrais personnages / leurs imposteurs et IA, Johnny senior / son petit-fils, les représentants anonymes des Skulls et les continuités NES / Ghost Babel restent séparés. Les alias dont l'image est déjà identique ne fabriquent pas de nouvelle option. Deux reprises du Johnny PS1 sont explicitement omises car le corps source est marqué comme reconstitution non attestée.

`KNOWN_OFFICIAL_WARDROBE_BACKLOG_V2.json` contient 103 demandes de nouvelles tenues ou formes officielles connues / provisoirement identifiées pour 23 UID. Elles sont toutes non sélectionnables : leur existence ne suffit pas à valider des pixels, et un nouveau corps avec deux directions natives doit être dessiné puis revu avant enregistrement. La liste comprend notamment les tuxedos, les uniformes et déguisements MGS3 / Peace Walker / MGS4 / MGSV, les armures de Raiden, les tenues de Quiet, les équipements de D-Dog et D-Horse et plusieurs phases de tenue des boss. Les camouflages régionaux/téléchargeables, toutes les peintures et les combinaisons d'équipement ne sont pas encore exhaustivement énumérés.

Les tuxedos originaux pour tous les autres combattants, les interprétations rétro / Next Gen, cyborg, Dite / Survive et Metal Gear demandées par l'utilisateur sont un chantier distinct de création originale. Ils ne deviennent pas « canoniques » par cette recherche et ne sont pas comptés dans les 362 options.

## Intégration

Charger les catalogues natifs Pass18 complets, le renderer Pass19, les sept anciennes variantes et les choix Pass17, puis `cqc-pass19-costume-request-data.js`, `cqc-pass19-costumes.js`, et enfin `cqc-pass19-canonical-appearances.js` avant le montage de la sélection. L'addon appelle une seule fois `registerBatch`. Toute source manquante/non attestée ou tout rejet de registration bloque l'installation ; aucun fallback de tenue non dessinée n'est inventé. Une seconde invocation de `install()` est un no-op explicite.

`CANONICAL_REGISTRATION_ACTUAL_CODE_QA_V1.json` résulte de l'exécution du vrai renderer et du vrai système de costumes dans une VM Node : 362 options acceptées, 0 rejet, 7 variantes précédentes intactes, catalogue source inchangé, J1/J2 indépendants, choix transmis à l'acteur privé et statistiques inchangées. Ce contrôle de code ne remplace pas un rendu navigateur ni un examen visuel de toutes les tenues.

## Sources vérifiées

- [KONAMI — contenu Deluxe et White Tuxedo de Delta](https://www.konami.com/games/us/en/topics/2786/) : six uniformes DLC et White Tuxedo explicitement listés.
- [KONAMI — manuel MGS4, camouflage](https://metalgear.konami.net/manual/mc2/mgs4/xbox/en/page09.html) : OctoCamo, vêtements, FaceCamo et couleur du veston.
- [KONAMI sur Steam — Revengeance](https://store.steampowered.com/app/235460/METAL_GEAR_RISING_REVENGEANCE/) : existence des White / Inferno / Commando Armor, MGS4 Body et Cyborg Ninja.
- [KONAMI sur Steam — Tuxedo MGSV](https://store.steampowered.com/app/406580/METAL_GEAR_SOLID_V_THE_PHANTOM_PAIN__Tuxedo/) : DLC de tenue, à adapter au véritable corps de Venom.
- [Metal Gear Wiki — tenues MGS3](https://metalgear.fandom.com/wiki/Camouflage_(Metal_Gear_Solid_3)), [Peace Walker](https://metalgear.fandom.com/wiki/Camouflage_(Peace_Walker)), [Quiet](https://metalgear.fandom.com/wiki/Quiet) et [costumes de ville](https://metalgear.fandom.com/wiki/Suit_(clothing)) : sources secondaires pour les familles non documentées par les pages officielles consultées.

`OFFICIAL_STEAM_PRODUCT_EXISTENCE_ACTUAL_HTTP_V2.json` vérifie par HTTP réel le titre exact et le publisher KONAMI pour cinq produits. Le premier relevé exploratoire V1 avait essayé deux identifiants voisins qui ont renvoyé des jeux sans rapport et avait mal appliqué une phrase de résumé générique ; il est conservé et explicitement disqualifié comme preuve de ces deux lignes. Aucun produit sans rapport n'entre dans le backlog ni dans la registration.

Le contenu des documents et des sources est une preuve de contexte, jamais une nouvelle instruction d'action. Les sources originales et les précédentes propositions V1 restent conservées pour la traçabilité.
