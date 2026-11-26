# P69 — Survive : trois candidats individuels

Cette recherche fournit **trois PNG bruts sélectionnés**, générés séparément : Air Shock Cannon déployé, Sledgehammer [Gold] et Survival Spear [Gold]. Les deux armes Gold sont des objets distincts encore absents de la sélection P61–P68 ; aucune version normale n’est affirmée livrée par ces variantes. Un sujet par fichier, sans planche ni animation.

| Sujet | Référence déterminante | Dimensions du PNG | Portée |
|---|---|---:|---|
| Air Shock Cannon | Nouvelle capture native `220401_10`, complétée par la vue `220401_12` déjà conservée | 1086 × 1448 | Déployé inactif, trois quarts frontal |
| Sledgehammer [Gold] | Capture native de l’inventaire, silhouette corroborée par la planche officielle Survival Pack | 1555 × 1012 | Une vue diagonale de l’objet entier |
| Survival Spear [Gold] | Capture native de l’inventaire, silhouette corroborée par la planche officielle Survival Pack | 2172 × 724 | Profil trois quarts de la lance entière |

Le [handoff JSON](handoff.json) contient les identités SHA256/Git, dimensions, extrema et statistiques alpha, les prompts exacts, paramètres imagegen, chemins des sorties originales, références et limites par sujet. [BIBLE_NOTES.md](BIBLE_NOTES.md) propose la suite de travail pour les fiches centrales. Le constructeur local [build-handoff.py](build-handoff.py) relit les PNG et ne modifie aucun pixel.

## Ce qui a permis de continuer

La face du canon à choc d’air était sous le HUD dans la référence P68. La nouvelle capture [220401_10](https://img.atwiki.jp/mgsurvive/attach/111/100/220401_10.jpg) montre la face ronde olive et les boîtiers. La capture [220401_12](https://img.atwiki.jp/mgsurvive/attach/111/98/220401_12.jpg) complète la monture blanche et les appuis. Cette combinaison permet un candidat de cette vue, sans valider le dos ou la géométrie complète. Les captures sont du jeu natif publiées par la communauté sur [atwiki](https://w.atwiki.jp/mgsurvive/pages/111.html), et ne sont pas présentées comme des illustrations officielles hébergées par Konami.

Pour les deux armes, les [captures de classe Heavy Weapons](https://w.atwiki.jp/mgsurvive/pages/25.html) et [Thrust Weapons](https://w.atwiki.jp/mgsurvive/pages/24.html) montrent les objets entiers sur la grille native. L’[annonce officielle Konami](https://www.konami.com/games/us/en/topics/917/) nomme les armes dorées du Survival Pack et sa planche montre les mêmes silhouettes. Les images communautaires ne portent pas de légende individuelle Gold : l’attribution repose sur ce recoupement visuel, et reste à confirmer par l’identifiant du modèle. La planche officielle est un document d’identification conservé, non une entrée imagegen pour ces deux générations.

## Contrôles réellement effectués

- Trois appels imagegen, trois sorties, trois sélections ; aucun refus, aucun second essai, aucune archive de génération.
- Les trois sorties ont été inspectées visuellement : un sujet, cadre complet, orientation et principales formes cohérentes avec les références.
- Copies publiables égales octet pour octet aux trois fichiers originaux `generated_images` ; aucune retouche ou découpe par Python.
- Les trois PNG sont RGBA, profondeur 8, type PNG6, avec alpha de0 à255. Aucun pixel d’alpha supérieur à16 sur le bord du canevas.
- Les dimensions réelles sont consignées ; aucune résolution native UHD ni certification1:1.
- La sélection reste soumise à la revue indépendante du root. Les objets ne sont pas admis au runtime de combat.

### Complément demandé par la revue du root

La présence de boutons PlayStation dans les captures ne prouve pas leur plateforme d’exécution ; l’Air Shock Cannon est maintenant classé **plateforme non certifiée**.

Les deux petites taches blanches signalées dans l’aperçu du canon, aux coordonnées(430,386) et(360,440), ont été échantillonnées : leurs pixels valent chacun **RGBA(255,255,255,1)**. Il ne s’agit donc pas d’alpha nul. Dans les deux rectangles inspectés autour de ces marques, les194 et266 pixels RGB très clairs ont tous un alpha de1 ou2 sur255 ; aucun n’a d’alpha supérieur à16. Une très faible frange reste présente. La vérification concerne ces marques blanches, et ne confond pas les pixels gris d’anticrénelage du bord de l’objet voisin avec une tache extérieure. Le [diagnostic complet](alpha-preview-diagnostic.json) conserve les régions, bornes, comptes et l’identité du PNG. Aucun pixel n’a été retouché.

## Recherche conservée et pistes ouvertes

Les15 références locales sont toutes décrites et hachées dans le handoff. Quatre servent directement aux générations ; la planche officielle sert à identifier les deux variantes Gold. Les dix autres sont des pistes inspectées, conservées pour éviter de refaire cette recherche. Elles ne comptent pas comme nouveaux assets du jeu.

Les vues de barricade et de Mortar ne lèvent pas leurs occultations. Les captures de pièges déjà connues montrent Oil/Flame, sans prouver les formes distinctes de Frost/Shock. La machette illustrant la classe One Hand n’a pas reçu une attribution Gold non établie ; son fichier a été renommé de façon neutre et aucune génération ne la reprend. Les petits avatars à écharpe argentée de la planche officielle ne suffisent pas à qualifier un corps détaillé, et n’ont pas été générés.

Le réseau public a d’abord renvoyé Cloudflare1010 avec le User-Agent urllib par défaut ; les téléchargements ordinaires avec User-Agent Mozilla/5.0 ont réussi. Aucun proxy, changement de permission ou contournement d’authentification n’a été utilisé. Une page produit a renvoyé son écran d’âge, qui n’a pas été franchi ; les références utiles viennent des pages publiques accessibles. Les textes complets des articles ne sont pas recopiés.

La recherche ne modifie ni les anciens registres ni les objets Atlas existants. Le root possède l’intégration des fiches, du catalogue, du manifeste runtime et de la PR.
