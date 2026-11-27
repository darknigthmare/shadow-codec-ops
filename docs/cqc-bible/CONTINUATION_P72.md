# Continuation P72 — sources fixes documentées

**11 nouvelles sources sélectionnées, 2 sortie(s) archivée(s), 2 refus sans PNG.** Cumul : **283 sources sélectionnées**, **106 dossiers Atlas**, **22 essais archivés**.

[Galerie](../cqc-reprise/pass72/README.md) · [Associations](asset-associations-p72.json) · [Manifeste](../cqc-reprise/pass72/delivery-manifest.json) · [Prompts exacts](../cqc-reprise/pass72/prompt-index.json) · [Delta de couverture](../cqc-reprise/pass72/coverage-delta.json)

Les 95 fiches Atlas précédentes et les 9 registres antérieurs sont conservés. Le nombre de lignes historiques sans candidat passe de **75 à 73** : 2 ligne(s) reçoivent un premier candidat partiel. Les groupes restent ouverts et les statuts P61 restent inchangés.

P70 reste réservé au lot ancien non récupéré. Les fichiers absents n’entrent dans aucun compteur. Une image fixe ou un fragment documenté est livré par sujet ; les états et interactions ci-dessous restent du travail futur. Aucune animation, nouvelle admission au combat, certification 1:1 absolue ou validation UHD native ne découle de ces PNG.

Le [guide général](guide-map.json) et l’[annexe des extensions P71](EXTENSIONS_GUIDE_P71.md) restent les référentiels. Les indications de chaque dossier précisent ce qui est observé, reconstruit et encore à produire.

## Couverture historique

| WorkId | Candidats P72 | Première couverture | Statut du groupe |
|---|---|---|---|
| `character:R-MPO-GUEST` | mpop-kgb-soldier, mpop-gru-soldier, mpop-seal-soldier | Oui | Ouvert ; statut P61 conservé |
| `stage:mgr_vr_dlc` | mgr-vr-dlc-yellow-platform-course, mgr-vr-dlc-camera-room | Oui | Ouvert ; statut P61 conservé |

<a id="acid-patrol-bot"></a>

## AC!D — robot de patrouille de Lobito

Un robot de patrouille du laboratoire de Lobito, une vue oblique statique du modèle AC!D PSP avec ses trois appuis visibles ; aucun état animé.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:acid-patrol-bot` |
| Édition / couverture | PSP — captures natives publiées par KONAMI — `full_body` |
| Fichier | [acid-patrol-bot.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/acid-patrol-bot.png) |
| Sortie | 1536 × 1024  RGBA  1 328 739 octets |
| SHA-256 | `9e9811ba337190a262f2005d69a3338f4c4b5862426213176c2a2bc5989fd366` |
| WorkIds | `machine:acid_patrol_bot` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

Deux vues KONAMI montrent un robot gris angulaire, un canon unique, un bloc supérieur asymétrique et trois longs appuis terminés par des formes circulaires.

- [Contexte](https://www.konami.com/mg/archive/mga/uk/game_play_trap.html) · [Référence de l’éditeur](https://www.konami.com/mg/archive/mga/uk/pic/game_04_01.gif) · [Copie brute](../../docs/cqc-reprise/pass72/research/acid/references/game_04_01.gif) — `native_game_screenshot_primary_publisher_host`.
- [Contexte](https://www.konami.com/mg/archive/mga/uk/game_play_trap.html) · [Référence de l’éditeur](https://www.konami.com/mg/archive/mga/uk/pic/game_04_02.gif) · [Copie brute](../../docs/cqc-reprise/pass72/research/acid/references/game_04_02.gif) — `native_game_screenshot_primary_publisher_host`.

[Prompt exact](../cqc-reprise/pass72/research/acid/prompts/acid-patrol-bot.txt).

- Source primaire : deux captures officielles KONAMI de seulement 216×122 pixels. La seconde montre l’ensemble du robot et sert de cadrage ; la première confirme sa partie haute.
- La sortie conserve un sujet complet, la direction générale du canon vers le haut-gauche, le bloc supérieur à droite et les trois appuis séparés. Les silhouettes principales sont comparables ; les proportions métriques ne sont pas validées.
- Les évidements du bloc supérieur, les joints, rainures, plaques et proportions fines du canon ont été interprétés. Les surfaces cachées et la géométrie interne ne sont pas prouvées par ces vues.
- Le point bas visible atteint y1016 sur une toile 1536×1024 : marge de huit pixels, pieds visibles complets ; des pixels alpha 1–2 s’étendent jusqu’au bord gauche/bas. Ne pas confondre la frange avec une découpe de la machine.
- PNG RGBA brut conservé, alpha réel 0–254 avec dominante 253 ; 22 150 pixels de faible frange alpha 1–8. Aucun nettoyage, agrandissement ou détourage programmatique.
- Admissible comme candidat documentaire statique avec réserves. Ni animation de marche, ni attaque, ni destruction, ni collisions ou fenêtre de jeu ne sont produites.

### États et interactions à produire

Source fixe documentaire consultable dans l’Atlas ; toute utilisation jouable attend les vérifications et états décrits.

| État prévu | Travail restant |
|---|---|
| Statique de référence | Afficher la vue courante comme reconstruction candidate, avec réserves de géométrie. |
| Patrouille à documenter | Recueillir la séquence native de déplacement et les positions des appuis avant toute animation. |
| Engagement à documenter | Séparer orientation, annonce et attaque depuis des séquences natives ; aucun projectile n’est généré ici. |
| Dommages et neutralisation à documenter | Relever les états visuels et réponses du jeu avant adaptation. |

- La page officielle identifie une arme unique ; ne pas multiplier les systèmes offensifs à partir de ce PNG.
- Distances, timings, dégâts, résistance et comportement de patrouille restent à documenter ; aucun chiffre de gameplay n’est déduit de la silhouette.

### Prochaine validation

- Obtenir une capture native plus grande des trois appuis, du bloc supérieur et du canon afin de corriger les détails reconstruits.
- Mesurer les proportions sur une vue sans perspective avant validation de géométrie et produire les vues opposées uniquement depuis références.
- Documenter les états et timings de patrouille, engagement et neutralisation ; définir pivots/collisions séparément de la source Atlas.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="acid-surveillance-camera"></a>

## AC!D — caméra de surveillance de Lobito

Une caméra de surveillance murale AC!D PSP et son support, une vue oblique statique isolée. Ne vaut pas production du capteur infrarouge ni intégration de l’interaction proposée dans Ruins Upper.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:acid-surveillance-camera` |
| Édition / couverture | PSP — captures natives publiées par KONAMI — `full_object` |
| Fichier | [acid-surveillance-camera.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/acid-surveillance-camera.png) |
| Sortie | 1448 × 1086  RGBA  460 917 octets |
| SHA-256 | `ccdbb9030289ae6697ec054536d16c673156870818f599ec256df58ed24a7d91` |
| WorkIds | `prop:acid_surveillance_camera` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

La capture KONAMI montre une petite caméra grise angulaire fixée au mur au-dessus du personnage ; la page documente son rôle de détection.

- [Contexte](https://www.konami.com/mg/archive/mga/uk/game_play_trap.html) · [Référence de l’éditeur](https://www.konami.com/mg/archive/mga/uk/pic/game_05_01.gif) · [Copie brute](../../docs/cqc-reprise/pass72/research/acid/references/game_05_01.gif) — `native_game_screenshot_primary_publisher_host`.

[Prompt exact](../cqc-reprise/pass72/research/acid/prompts/acid-surveillance-camera.txt).

- La seule image de référence mesure 216×122 pixels et la caméra occupe environ trente pixels de largeur. L’identité et la forme globale sont sourcées, mais les détails restent fortement sous-déterminés.
- La sortie comporte une seule caméra grise à boîtier rectangulaire oblique et un support mural, entièrement visible sur fond transparent ; aucun décor ni personnage.
- La face optique verte, les petits carrés de fixation, le contour du support et le volume exact de la coque sont des reconstructions. La lecture avant/arrière et l’orientation gauche-droite de la très petite référence doivent être contrôlées sur une capture rapprochée avant validation 1:1.
- Ce candidat ne certifie pas la position d’une caméra dans Ruins Upper ; la référence montre seulement le type de caméra AC!D. Il ne remplace pas un capteur infrarouge ni une interaction runtime.
- PNG RGBA brut, alpha 0–255 et dominante 253 ; 6 803 pixels de faible frange alpha 1–8, aucun pixel non transparent sur le bord de toile. Aucun traitement ni rééchantillonnage.
- Admissible au dossier documentaire sous réserves de détails/angle. La caméra de jeu reste à mesurer et à animer si le périmètre CQC la retient.

### États et interactions à produire

Source fixe documentaire consultable dans l’Atlas ; toute utilisation jouable attend les vérifications et états décrits.

| État prévu | Travail restant |
|---|---|
| Statique de référence | Afficher la source candidate actuelle avec son cadrage oblique. |
| Détection à documenter | Confirmer orientation, couverture visuelle et éventuel mouvement par captures natives. |
| Alerte à documenter | Distinguer la détection documentée et ses indices visuels réels avant adaptation CQC. |
| Neutralisation à documenter | Capturer la forme détruite et la transition avant de produire l’état inutilisable. |

- La page officielle indique une alerte lors de la détection, une caméra destructible et un angle mort directement sous elle.
- Aucune valeur de portée ni durée d’alerte n’est inventée ; vérifier l’échelle et la géométrie natives avant un transfert vers CQC.
- La proposition historique proposed:cqc_interaction_acid_sensor demeure ouverte : ce PNG n’ajoute pas seul un capteur fonctionnel ni une preuve de placement.

### Prochaine validation

- Capturer la caméra en gros plan afin de confirmer la face optique, l’orientation et la forme du support ; corriger ou retirer les détails extrapolés.
- Sourcer une présence et un emplacement précis avant toute association à Ruins Upper.
- Documenter détection, angle mort et état détruit, puis définir ancrage et interactions sans assimiler la caméra au capteur infrarouge.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="survive-large-spiked-barricade"></a>

## Survive — Large Spiked Barricade, déployée intacte

Une grande barricade à pieux en bois, trois quarts de face, entièrement cadrée. Candidat statique de défense ; quelques éléments centraux cachés par l’avatar dans la référence ont été interpolés.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:survive-large-spiked-barricade` |
| Édition / couverture | Metal Gear Survive — équipement de défense, plateforme non certifiée — `full_object` |
| Fichier | [survive-large-spiked-barricade.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/survive-large-spiked-barricade.png) |
| Sortie | 1774 × 887  RGBA  2 017 540 octets |
| SHA-256 | `6871772cdc9b9bc43a7c87730c73a77f50ed3ce7ccb945e7991084ce070c8b2d` |
| WorkIds | `prop:survive_large_spiked_barricade` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

État visible : déployée intacte dans zone de test. Identification : Nom japonais lisible dans le HUD + section barrières du guide atwiki. Périmètre : Équipement fabriqué de Metal Gear Survive, distinct des installations et technologies des épisodes principaux.

- [Contexte](https://w.atwiki.jp/mgsurvive/pages/111.html) · [Référence hébergée par un tiers](https://img.atwiki.jp/mgsurvive/attach/111/102/220401_11.jpg) · [Copie brute](../../docs/cqc-reprise/pass72/research/survive/references/native-air-spike-220401_11.jpg) — `native_gameplay_screenshot_hosted_on_community_wiki`.

[Prompt exact](../cqc-reprise/pass72/research/survive/prompts/survive-large-spiked-barricade.txt).

- La capture native a été inspectée avant l’appel imagegen. Le HUD nomme explicitement Large Spiked Barricade, ce qui distingue cet objet du petit Spiked Barricade. Aucun asset équivalent sélectionné P61–P71 n’a été trouvé.
- Le candidat conserve un obstacle bas et large à deux rangées de pieux irréguliers gris-brun, avec rails transversaux en rondins et ligatures de corde. Les pointes, extrémités latérales et appuis restent dans le cadre.
- Le centre inférieur de la capture est masqué par l’avatar. La continuité des rails et quelques pieux/appuis ont été reconstruits par le générateur. Le nombre précis, l’espacement et l’inclinaison des pieux/ligatures ne sont pas validés1:1 ; l’angle et la profondeur doivent encore être comparés à une vue dégagée.
- L’image est un rendu fixe d’un objet entier, sans avatar, clôture, grille ou HUD. Elle ne livre pas pose de placement animée, empalement, dégâts, destruction, collision, hitbox ou chronométrage.
- Le gros plan généré augmente les détails de bois/cordes par rapport aux quelque600×310px utiles de la capture ; aucune provenance UHD native ni fidélité pixel-exacte ne peut en être déduite. Le dos et les surfaces cachées restent non documentés.
- PNG RGBA sans retouche. Franges à faible alpha conservées dans le brut ; CRC, finIEND, limites alpha et absence d’alpha>16 aux bords contrôlées.

### États et interactions à produire

Travail futur documenté, sans implémentation runtime par cette passe.

| État prévu | Travail restant |
|---|---|
| Installation intacte | Une source fixe candidate est livrée ; aucun état animé ou fonctionnel. |
| Aperçu de placement | Recueillir une séquence native avant production et adaptation. |
| Contact avec les pointes | Recueillir une séquence native avant production et adaptation. |
| Dégâts | Obtenir les références natives de cet état avant production. |
| Destruction | Obtenir les références natives de cet état avant production. |

- Collision ennemie : Rôle documenté, sans implémentation. Guide atwiki111 décrit les ennemis repoussés par Air Shock Cannon vers la barricade.
- Placement, réparation et retrait : Travail proposé, soumis à validation native.

### Prochaine validation

- Obtenir une vue native dégagée du centre et des appuis, puis compter et mesurer les pieux, croisements et ligatures.
- Documenter placement, contact, dégâts et destruction dans une séquence native ; traiter chaque état séparément.
- Définir pivots, volumes de collision et zones de contact CQC uniquement après validation ; aucune propriété de combat n’est tirée du PNG.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="survive-beta-medical-workbench"></a>

## Survive — établi médical, bêta janvier2018

Un établi médical complet de la bêta, identifié par sa position et l’icône croix dans la capture native. Les petites fournitures restent une interprétation de la vue basse définition ; aucune équivalence automatique avec un niveau retail.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:survive-beta-medical-workbench` |
| Édition / couverture | Metal Gear Survive — bêta janvier2018, plateforme et niveau d’amélioration non certifiés — `full_object` |
| Fichier | [survive-beta-medical-workbench.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/survive-beta-medical-workbench.png) |
| Sortie | 1672 × 941  RGBA  1 078 085 octets |
| SHA-256 | `891930686ae566ebc64a05821e8c7096698e91c271129ae6e8c380c5831b756f` |
| WorkIds | `prop:survive_beta_medical_workbench` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

État visible : poste médical posé, zone de préparation de la bêta. Identification : Icône croix au-dessus du poste, fournitures visibles et contexte bêta19janvier2018. Périmètre : Accessoire d’environnement de Survive bêta ; ne devient pas un soin universel ou une installation d’un autre épisode.

- [Contexte](https://falcongamereviews.com/2018/01/19/metal-gear-survive-beta-impressions/) · [Référence utilisée](https://falcongamereviews.com/wp-content/uploads/2018/01/metal-gear-survive-beta-crafting.png) · [Copie brute](../../docs/cqc-reprise/pass72/research/survive/references/falcon-beta-crafting-1920.png) — `native_beta_gameplay_screenshot_hosted_by_original_reviewer`.

[Prompt exact](../cqc-reprise/pass72/research/survive/prompts/survive-beta-medical-workbench.txt).

- Le fichier source original1920×1080 a été retrouvé dans le HTML public de l’article Falcon, téléchargé sans redimensionnement et inspecté. Le poste médical est à gauche et ses contours principaux sont libres d’occlusion.
- La silhouette asymétrique est conservée : table grise à tiroirs, casier haut sur la partie gauche, étagère basse à droite avec boîtes claires/bleues, flacons, petits sachets et carton sous la partie droite.
- Les dimensions utiles du poste dans la source sont seulement environ285×180px. Le générateur a interprété le nombre, les capuchons, les étiquettes, les plis des sachets, les tiroirs et les attaches ; ces détails ne sont pas une reconstitution1:1 vérifiée.
- L’origine est une capture de gameplay de bêta publiée par le joueur/reviewer, pas un rendu officiel fourni par KONAMI. Les icônes contextuelles corroborent la fonction médicale ; le niveau basique/avancé retail n’est pas revendiqué.
- Un seul poste est conservé, entier, sans avatar ni autre établi, sans grille ou marqueur. Pas de personnage soigné, de geste, d’animation, de recette active ou de comportement jouable.
- PNG RGBA brut avec véritables pixels transparents ; aucun recadrage, retrait d’arrière-plan par code, nettoyage ou upscale après génération. Les petits textes restent indéchiffrables ; aucune information médicale réelle n’est inférée.

### États et interactions à produire

Travail futur documenté, sans implémentation runtime par cette passe.

| État prévu | Travail restant |
|---|---|
| Poste fixe de la bêta | Une source fixe candidate est livrée ; aucun état animé ou fonctionnel. |
| Interaction de fabrication | Recueillir une séquence native avant production et adaptation. |
| Ouverture du menu | Documenter l’interface native et ses transitions. |
| Dégâts ou retrait | État non documenté ; aucune forme ni réaction à inventer. |

- Fabrication médicale : Rôle identifié par le contexte, sans implémentation. Poste et icône médicale visibles dans la capture de bêta ; système de craft décrit par le reviewer.
- Contact du personnage : Alignement et animation à documenter puis produire.

### Prochaine validation

- Obtenir des captures natives rapprochées avant/arrière du même poste et son nom exact dans la bêta.
- Comparer au jeu commercial avant d’associer ce candidat à un établi médical basique ou avancé retail.
- Créer séparément les interactions de craft/menus et la présence du personnage, avec poses et pivots validés ; garder cette image comme décor fixe tant que ces étapes manquent.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="survive-beta-weapons-workbench"></a>

## Survive — établi d’armes, bêta janvier2018

Un établi d’armes de la bêta, poste de droite au premier plan, séparé du poste d’équipement voisin. Vue fixe entièrement cadrée ; détails d’outils et supports nécessitent validation.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:survive-beta-weapons-workbench` |
| Édition / couverture | Metal Gear Survive — bêta janvier2018, plateforme et niveau d’amélioration non certifiés — `full_object` |
| Fichier | [survive-beta-weapons-workbench.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/survive-beta-weapons-workbench.png) |
| Sortie | 1536 × 1024  RGBA  1 817 061 octets |
| SHA-256 | `e149bda6e64284172172054e234b45b0fb728b91dd019ec89ed5b0200d9dcc58` |
| WorkIds | `prop:survive_beta_weapons_workbench` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

État visible : poste d’armes posé à droite au premier plan dans la zone bêta. Identification : Icône pistolet et emplacement sur capture native bêta ; aucun nom de niveau retail lisible. Périmètre : Accessoire de craft de Survive bêta ; distinct de l’équipement voisin et sans import arbitraire d’une armurerie d’un autre jeu.

- [Contexte](https://falcongamereviews.com/2018/01/19/metal-gear-survive-beta-impressions/) · [Référence utilisée](https://falcongamereviews.com/wp-content/uploads/2018/01/metal-gear-survive-beta-crafting.png) · [Copie brute](../../docs/cqc-reprise/pass72/research/survive/references/falcon-beta-crafting-1920.png) — `native_beta_gameplay_screenshot_hosted_by_original_reviewer`.

[Prompt exact](../cqc-reprise/pass72/research/survive/prompts/survive-beta-weapons-workbench.txt).

- Le poste de droite sous l’icône pistolet est ciblé dans le prompt, en excluant expressément le cabinet voisin derrière à gauche. Le fichier native1920×1080 a été inspecté avant l’édition.
- La sortie reprend une table longue basse en métal grisé, deux tiroirs de façade, bac allongé au fond, panneau brun quadrillé dressé sur la moitié droite, contenant cylindrique à gauche et petits composants à droite.
- Le sujet utile ne mesure qu’environ330×240px dans la référence. Les silhouettes des outils, leur nombre, les tiroirs, les pièces de surface et les supports de table sont extrapolés. La sortie semble montrer six pieds/appuis ; leur correspondance exacte à la vue native, aux jonctions et à l’éventuelle extension de table reste à vérifier.
- Source de bêta communautaire/reviewer, sans identification démontrée d’un niveau d’amélioration commercial. Le modèle ne doit pas être associé automatiquement à Advanced Weapon Workbench ou Weapon Workshop.
- L’aperçu brut montre une zone sombre autour du poste, mais les pixels du halo mesurés aux coordonnées(700,20),(100,300),(600,850),(800,900),(1450,600),(100,500) ont alpha0. Le RGB masqué est conservé, pas un fond opaque. La sortie a alpha maximal254 ; l’essentiel du corps est à252–253, ce qui implique une très légère transparence globale.
- Aucune retouche du PNG n’a été appliquée. Cette alpha légèrement inférieure à255 et les appuis non confirmés restent explicitement des points de revue externe avant toute intégration de combat.
- Un seul poste complet, sans avatar, écran, grille, marqueur de pistolet ou objet voisin. Aucun tir, rechargement, recette active, pose de main, animation ou fonctionnalité de craft livrée.

### États et interactions à produire

Travail futur documenté, sans implémentation runtime par cette passe.

| État prévu | Travail restant |
|---|---|
| Poste fixe de la bêta | Une source fixe candidate est livrée ; aucun état animé ou fonctionnel. |
| Interaction de fabrication | Recueillir une séquence native avant production et adaptation. |
| Menu de personnalisation/réparation | Documenter l’interface native et ses transitions. |
| Dégâts ou retrait | État non documenté ; aucune forme ni réaction à inventer. |

- Fabrication d’armes : Rôle identifié par le contexte, sans implémentation. Poste sous icône pistolet dans capture de préparation de bêta ; article décrit craft d’armes et munitions.
- Mains et outils du personnage : Recueillir une référence native de l’action avant production.

### Prochaine validation

- Vérifier sur vue native rapprochée le nombre exact de pieds, la jonction du long bac et la séparation avec le poste voisin.
- Documenter le nom/niveau d’amélioration et toute différence de modèle entre bêta et jeu commercial.
- Contrôler l’alpha252–254 dans le compositeur cible, sans annoncer cet objet combat-ready ; toute correction future doit garder ce brut archivé.
- Produire séparément les gestes de craft et de réparation ainsi que leurs paramètres d’interaction à partir de séquences natives.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="mgr-vr-dlc-yellow-platform-course"></a>

## Revengeance — VR Missions DLC, parcours de plateformes jaunes

Une vue fixe du fragment de parcours VR présenté dans la capture officielle DLC1 screenshot01. Le panneau D05 est reproduit comme texte visible ; aucun numéro de mission ni plan complet n’est déduit.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:mgr-vr-dlc-yellow-platform-course` |
| Édition / couverture | Metal Gear Rising: Revengeance — DLC1 VR Missions — `environment_fragment` |
| Fichier | [mgr-vr-dlc-yellow-platform-course.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/mgr-vr-dlc-yellow-platform-course.png) |
| Sortie | 1674 × 940  RGB  1 757 692 octets |
| SHA-256 | `b7ff1272e935072227a48fa6c18c8d404e1bdc4579c59e61c7f7c6e492ff8388` |
| WorkIds | `stage:mgr_vr_dlc` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

La capture officielle montre un parcours VR jaune avec plateformes suspendues et marquage D05. Le personnage et les objets bleus ont été retirés de la version documentaire.

- [Contexte](https://www.konami.com/mg/archive/mgr/jp/dlc/) · [Référence de l’éditeur](https://www.konami.com/mg/archive/mgr/jp/dlc/_img/dlc1_pic1b.jpg) · [Copie brute](../../docs/cqc-reprise/pass72/research/rising/references/konami-dlc1-vr-screenshot01.jpg) — `primary_publisher_game_screenshot`.

[Prompt exact](../cqc-reprise/pass72/research/rising/prompts/mgr-vr-dlc-yellow-platform-course.txt).

- Comparaison visuelle référence/sortie effectuée : palette jaune-orangé, grande plateforme au premier plan, suite de cubes flottants, panneau VR SYSTEM / AREA NUMBER / D05 et perspective générale conservés.
- Le Dwarf Gekko, son ombre, les petits éléments bleus flottants et la surimpression de copyright ont été retirés par génération ; la petite surface de sol masquée a donc été reconstruite.
- Vis, chanfreins, texture de panneaux, proportions exactes des cubes distants et typographie fine ne sont pas mesurés. Ces détails générés ne constituent pas une preuve 1:1.
- Fragment de parcours coupé par le cadre ; aucune connexion, longueur complète, vitesse de plateformes ou limite de collision n’est établie.
- PNG RGB opaque 1674 × 940, brut conservé. Aucun alpha nécessaire pour cette vue de décor ; aucune résolution UHD native.

### États et interactions à produire

Travail futur documenté, sans implémentation runtime par cette passe.

| État prévu | Travail restant |
|---|---|
| Vue fixe de parcours | Une seule caméra documentée ; accès et fin du parcours non couverts. |
| Plateformes et objets séparés à produire | Produire uniquement depuis des références suffisantes les éléments fixes, collectables et éventuels déplacements. |
| Navigation future | Mesurer la carte réelle, ses raccords et sa circulation avant définition d’une zone jouable CQC. |

- Aucune collecte, chute, plateforme mobile ni trajectoire ennemie n’est implémentée.
- Le Dwarf Gekko visible dans la référence reste un sujet distinct ; son retrait n’établit pas un état canonique vide de la mission.

### Prochaine validation

- Identifier la mission exacte à partir d’un parcours natif ou d’une liste officielle ; ne pas transformer le marquage D05 en numéro de mission.
- Relever les dimensions, connexions et volumes du parcours avec des captures natives complémentaires avant adaptation jouable.
- Séparer plateformes, fond virtuel, objets à collecter et Dwarf Gekko dans des assets référencés distincts ; mesurer ensuite les trajectoires et collisions.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="mgr-vr-dlc-camera-room"></a>

## Revengeance — VR Missions DLC, salle jaune aux caméras

Une vue fixe du fragment de salle VR présenté dans la capture officielle DLC1 screenshot02. Les unités fixes visibles restent intégrées à l’image ; les raccords de salle et le numéro de mission ne sont pas établis.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:mgr-vr-dlc-camera-room` |
| Édition / couverture | Metal Gear Rising: Revengeance — DLC1 VR Missions — `environment_fragment` |
| Fichier | [mgr-vr-dlc-camera-room.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/mgr-vr-dlc-camera-room.png) |
| Sortie | 1674 × 940  RGB  1 999 870 octets |
| SHA-256 | `f2939289a4b3fb7b312ee3aee111fbd1eff055c40b6c41df775fd5d9aac43db2` |
| WorkIds | `stage:mgr_vr_dlc` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

Salle VR modulaire jaune-vert visible dans la capture officielle du DLC1. Les dispositifs restent présents ; le Dwarf Gekko et les rayons de visée ont été retirés du candidat documentaire.

- [Contexte](https://www.konami.com/mg/archive/mgr/jp/dlc/) · [Référence de l’éditeur](https://www.konami.com/mg/archive/mgr/jp/dlc/_img/dlc1_pic2b.jpg) · [Copie brute](../../docs/cqc-reprise/pass72/research/rising/references/konami-dlc1-vr-screenshot02.jpg) — `primary_publisher_game_screenshot`.

[Prompt exact](../cqc-reprise/pass72/research/rising/prompts/mgr-vr-dlc-camera-room.txt).

- Comparaison visuelle effectuée : salle jaune-vert, grandes plaques murales, joints noirs, repères d’angle blancs, volumes au fond et caméra basse cohérents avec la capture officielle.
- Dwarf Gekko du premier plan, ombre portée, traits de visée rouges et surimpression de copyright retirés. La portion de sol qu’il masquait a été complétée par génération.
- Caméras ou dispositifs montés noirs et unités sphériques orangées restent incorporés au fond. Ce fichier ne constitue pas un décor nettoyé de tous les objets interactifs et ne fournit aucun objet isolé.
- Les unités du bord supérieur sont tronquées par le cadrage comme dans la référence ; aucune silhouette complète de ces objets n’est revendiquée. Détails des supports, nombre exact de petites pièces et dimensions non mesurés.
- PNG RGB opaque 1674 × 940. Vue unique, sans carte complète, sans calques, sans timings et sans validation de géométrie native.

### États et interactions à produire

Travail futur documenté, sans implémentation runtime par cette passe.

| État prévu | Travail restant |
|---|---|
| Vue fixe de salle | La source conserve les unités visibles intégrées au décor, sans comportement. |
| États des dispositifs à documenter | Séparer surveillance, ciblage, alerte et neutralisation seulement après observation native. |
| Volume de salle à relever | Capturer les zones hors cadre, portes, limites et raccords avant une navigation CQC. |

- Aucune caméra fonctionnelle, détection, attaque, collision ni neutralisation n’est implémentée.
- Les traits rouges retirés sont un choix de source documentaire ; aucun état de mission au repos n’est déduit.

### Prochaine validation

- Identifier exactement la mission et documenter portes, limites, raccords et dimensions par captures natives complémentaires.
- Distinguer les dispositifs fixes des unités actives et produire leurs sources séparées avant tout assemblage interactif.
- Documenter visée, alerte, neutralisation, trajectoires éventuelles et sécurité des lignes de tir depuis le gameplay ; aucun rayon supprimé ne prouve un état inactif canonique.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="mgr-pincer-blades-inventory"></a>

## Revengeance — Pincer Blades, icône d’inventaire du guide

Une icône 2D complète de Pincer Blades, dans la vue diagonale du guide officiel imprimé page 33. La silhouette unique ne vaut ni paire de machettes isolées, ni état ouvert, ni modèle tridimensionnel Bloodlust complet.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:mgr-pincer-blades-inventory` |
| Édition / couverture | Metal Gear Rising: Revengeance — icône du guide officiel — `inventory_icon` |
| Fichier | [mgr-pincer-blades-inventory.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/mgr-pincer-blades-inventory.png) |
| Sortie | 1293 × 1217  RGBA  314 740 octets |
| SHA-256 | `6712006730d9078b3603dc26d2525bd221103957110ef6d74aa385faebb14dfa` |
| WorkIds | `prop:mgr_pincer_blades_inventory` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

Le tableau Custom Weapons Summary du guide officiel identifie cette silhouette comme Pincer Blades. La fiche Konami décrit les machettes haute fréquence Bloodlust de Sundowner ; les deux documents ne montrent pas ici une paire 3D complète.

- [Guide officiel sous licence](https://www.piggyback.com/us/wp-content/uploads/sites/6/2020/04/MGR_U_SamplePages.pdf) · [Copie brute](../../docs/cqc-reprise/pass72/research/rising/references/piggyback-pincer-blades-icon.png) — `primary_official_licensed_guide_vector_icon_render`.

[Prompt exact](../cqc-reprise/pass72/research/rising/prompts/mgr-pincer-blades-inventory.txt).

- Comparaison visuelle avec l’icône vectorielle effectuée : silhouette diagonale entière, lame large, bande de tranchant, encoche du dos et poignée courbe sont présents ; aucun second objet ni état en ciseaux inventé.
- Bordure du tableau, trait de liaison, bande de mise en page et fond blanc retirés. Le nom Pincer Blades est établi par la page complète conservée.
- La sortie ajoute un léger dégradé de gris et adoucit certaines courbes du pommeau/encoche par rapport au dessin vectoriel. Ces écarts doivent être corrigés ou validés avant certification 1:1 ; aucun détail volumétrique supplémentaire n’est établi.
- PNG RGBA 1293 × 1217. Alpha de 0 à 255, quatre bords entièrement transparents ; boîte alpha non nulle [80,56,1163,1115]. 4912 pixels de frange alpha 1 à 8 subsistent, et le sujet comporte une semi-transparence largement répartie : contrôle sur fonds contrastés nécessaire avant admission.
- La résolution est celle de la génération. Le rendu vectoriel source à 1200 dpi n’est pas une texture de jeu UHD native ; faces cachées, textures matérielles et animation non documentées.

### États et interactions à produire

Travail futur documenté, sans implémentation runtime par cette passe.

| État prévu | Travail restant |
|---|---|
| Icône statique | Un seul symbole documentaire complet dans sa vue diagonale officielle. |
| Armes complètes à référencer | Faces opposées, deux lames séparées, mécanisme d’assemblage et états ouverts/fermés à documenter depuis le jeu. |
| Montage et animations futures | Ancrage aux mains, poses, collisions, attaques et récupération à produire après références suffisantes. |

- Cette icône ne fournit aucun comportement d’arme ni valeur de combat.
- La capacité du jeu d’origine à équiper une arme alternative ne constitue pas une implémentation CQC ; aucune portée, fenêtre ou dégâts ne sont déduits du dessin.

### Prochaine validation

- Préserver l’usage comme icône documentaire ; ne pas convertir cette silhouette en arme photoréaliste ou volume complet sans références supplémentaires.
- Comparer les courbes et aplats au tracé officiel, corriger les différences de poignée et d’encoche puis contrôler l’alpha sur fonds clairs et sombres dans une version tracée.
- Obtenir les vues natives des deux armes Bloodlust, leurs articulations et états ouverts/fermés, puis les poses portées et attaques avant tout équipement jouable.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="mpop-kgb-soldier"></a>

## Portable Ops Plus — KGB Soldier

Un soldat invité de MPO+ en corps entier, une vue statique frontale en pose en T ; couverture partielle du groupe invité historique.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:mpop-kgb-soldier` |
| Édition / couverture | PSP — Portable Ops Plus, prévisualisation attribuée au modèle natif — `full_body` |
| Fichier | [mpop-kgb-soldier.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/mpop-kgb-soldier.png) |
| Sortie | 1347 × 1168  RGBA  608 489 octets |
| SHA-256 | `5b00e2d2cb57b2e29b182032964b9ec16c6c517fb560cc07da1b20cdb633fbda` |
| WorkIds | `character:R-MPO-GUEST` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

Vue frontale en pose en T : capuche et masque olive, veste à poches, camouflage sombre, gants et bottes noirs ; les liens pendants visibles se trouvent côté gauche de l’image.

- [Copie brute](../../public/cqc/assets/p72/rejected/mpop-kgb-soldier-v1--archived-1.png) — `generated_intermediate_reference_not_primary`.
- [Contexte](https://models.spriters-resource.com/psp/metalgearsolidportableopsplus/asset/323069/) · [Référence hébergée par un tiers](https://models.spriters-resource.com/media/preview_icons/320/323069.png?updated=1755506120) · [Copie brute](../../docs/cqc-reprise/pass72/research/roster/references/mpop-kgb-preview.png) — `community_preview_of_attributed_native_PSP_model`.

[Prompt exact](../cqc-reprise/pass72/research/roster/prompts/mpop-kgb-soldier.txt).

- v1 présentait un lien pendant supplémentaire sur le bas du pantalon côté droit de l’image. La correction v2 le retire ; v1 reste archivée hors sélection.
- La silhouette complète est conservée, avec capuche, masque, poches de poitrine et de hanche. Les textures et plis fins restent une reconstruction ; le seul angle de référence ne prouve pas le dos ni les côtés.
- La référence visuelle est une prévisualisation communautaire d’un modèle PSP attribué au jeu, publiée par The Models Resource (frk_14), et non une image hébergée par KONAMI. Le billet officiel PlayStation/KONAMI confirme seulement la présence de cette classe dans le roster MPO+.
- La pose en T, l’édition, les proportions visibles et l’équipement constituent le périmètre suivi ; aucun personnage supplémentaire, incarnation MGS2/MGS3 native ou scène narrative canonique n’est déduit.
- PNG brut RGBA : alpha [0, 255], 18549 pixels de faible frange (1–8). Aucun détourage, agrandissement ou nettoyage programmatique.
- Retenu comme candidat documentaire statique à vérifier ; aucun périmètre historique fermé et aucune admission au combat.

### États et interactions à produire

Profil de soldat invité MPO+ dans l’Atlas ; adaptation de gameplay CQC future et explicitement distincte du canon.

| État prévu | Travail restant |
|---|---|
| Pose de référence | Afficher cette source provisoire et ses réserves sans la présenter comme une animation. |
| Garde et locomotion à produire | Recueillir des séquences de la même édition, pivots et silhouettes avant toute adaptation. |
| Actions et réactions à produire | Documenter équipement, attaques, défense, saisie et neutralisation autorisés par les références ; ne pas attribuer de capacités d’un autre épisode. |
| Sélection et victoire à produire | Définir des cadrages et poses CQC distincts avec leurs preuves, sans les compter comme images déjà livrées. |

- Définir un profil CQC propre à la variante et à son équipement confirmé.
- Vérifier ancrages, échelles, silhouettes opposées et collisions avant binding.
- Traiter apparition, recrutement ou sélection MPO+ séparément des campagnes et récits CQC.

### Prochaine validation

- Comparer masque, harnais, asymétrie et proportions au modèle et à des captures natives complémentaires.
- Contrôler les bords alpha sur fonds clair et sombre.
- Obtenir toutes les poses requises et tester les bindings avant admission au combat.
- Documenter les autres classes invitées du groupe R-MPO-GUEST ; ce candidat ne ferme pas leur inventaire.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="mpop-gru-soldier"></a>

## Portable Ops Plus — GRU Soldier

Un soldat invité de MPO+ en corps entier, une vue statique frontale en pose en T ; couverture partielle du groupe invité historique.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:mpop-gru-soldier` |
| Édition / couverture | PSP — Portable Ops Plus, prévisualisation attribuée au modèle natif — `full_body` |
| Fichier | [mpop-gru-soldier.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/mpop-gru-soldier.png) |
| Sortie | 1193 × 1319  RGBA  649 016 octets |
| SHA-256 | `580e248d421b6703f1e83e4fa946900e54dae5bbc126e7d4c042c491555c03ae` |
| WorkIds | `character:R-MPO-GUEST` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

Vue frontale en pose en T : coiffe et cagoule olive, treillis camouflage, harnais noir à petites boucles, ceinture, sacoche côté droit de l’image, sangles latérales, gants et bottes noirs.

- [Contexte](https://models.spriters-resource.com/psp/metalgearsolidportableopsplus/asset/323062/) · [Référence hébergée par un tiers](https://models.spriters-resource.com/media/preview_icons/320/323062.png?updated=1755506118) · [Copie brute](../../docs/cqc-reprise/pass72/research/roster/references/mpop-gru-preview.png) — `community_preview_of_attributed_native_PSP_model`.

[Prompt exact](../cqc-reprise/pass72/research/roster/prompts/mpop-gru-soldier.txt).

- La silhouette et l’asymétrie du harnais/sacoche sont conservées. Les boucles, la trame du tissu et les traits du visage sont interprétés depuis la petite prévisualisation.
- Les doigts et bottes restent dans le cadre. Cette pose de référence frontale ne fournit aucune garde, action ou animation de combat.
- La référence visuelle est une prévisualisation communautaire d’un modèle PSP attribué au jeu, publiée par The Models Resource (frk_14), et non une image hébergée par KONAMI. Le billet officiel PlayStation/KONAMI confirme seulement la présence de cette classe dans le roster MPO+.
- La pose en T, l’édition, les proportions visibles et l’équipement constituent le périmètre suivi ; aucun personnage supplémentaire, incarnation MGS2/MGS3 native ou scène narrative canonique n’est déduit.
- PNG brut RGBA : alpha [0, 255], 16968 pixels de faible frange (1–8). Aucun détourage, agrandissement ou nettoyage programmatique.
- Retenu comme candidat documentaire statique à vérifier ; aucun périmètre historique fermé et aucune admission au combat.

### États et interactions à produire

Profil de soldat invité MPO+ dans l’Atlas ; adaptation de gameplay CQC future et explicitement distincte du canon.

| État prévu | Travail restant |
|---|---|
| Pose de référence | Afficher cette source provisoire et ses réserves sans la présenter comme une animation. |
| Garde et locomotion à produire | Recueillir des séquences de la même édition, pivots et silhouettes avant toute adaptation. |
| Actions et réactions à produire | Documenter équipement, attaques, défense, saisie et neutralisation autorisés par les références ; ne pas attribuer de capacités d’un autre épisode. |
| Sélection et victoire à produire | Définir des cadrages et poses CQC distincts avec leurs preuves, sans les compter comme images déjà livrées. |

- Définir un profil CQC propre à la variante et à son équipement confirmé.
- Vérifier ancrages, échelles, silhouettes opposées et collisions avant binding.
- Traiter apparition, recrutement ou sélection MPO+ séparément des campagnes et récits CQC.

### Prochaine validation

- Comparer masque, harnais, asymétrie et proportions au modèle et à des captures natives complémentaires.
- Contrôler les bords alpha sur fonds clair et sombre.
- Obtenir toutes les poses requises et tester les bindings avant admission au combat.
- Documenter les autres classes invitées du groupe R-MPO-GUEST ; ce candidat ne ferme pas leur inventaire.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

<a id="mpop-seal-soldier"></a>

## Portable Ops Plus — SEAL

Un soldat invité de MPO+ en corps entier, une vue statique frontale en pose en T ; couverture partielle du groupe invité historique.

| Champ | Valeur |
|---|---|
| Identité | `asset:p72:mpop-seal-soldier` |
| Édition / couverture | PSP — Portable Ops Plus, prévisualisation attribuée au modèle natif — `full_body` |
| Fichier | [mpop-seal-soldier.png](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/mpop-seal-soldier.png) |
| Sortie | 1199 × 1312  RGBA  538 658 octets |
| SHA-256 | `ba61c07c2adf96e5c5ee9ef88b2532bab27eb8a1e0e2a01141c6e434e1286810` |
| WorkIds | `character:R-MPO-GUEST` |
| État | Candidat Atlas ; géométrie, fidélité et intégration à valider |

### Référence et limites

Vue frontale en pose en T : casquette et cagoule noires, tenue olive, gilet à poches, protections des bras, étui avec deux sangles sur la cuisse côté gauche de l’image, genouillères et bottes segmentées.

- [Contexte](https://models.spriters-resource.com/psp/metalgearsolidportableopsplus/asset/323911/) · [Référence hébergée par un tiers](https://models.spriters-resource.com/media/preview_icons/321/323911.png?updated=1755506371) · [Copie brute](../../docs/cqc-reprise/pass72/research/roster/references/mpop-seal-preview.png) — `community_preview_of_attributed_native_PSP_model`.

[Prompt exact](../cqc-reprise/pass72/research/roster/prompts/mpop-seal-soldier.txt).

- Le gilet, l’étui asymétrique et les protections sont présents. L’insigne de casquette et les détails fins sont trop petits dans la référence pour être certifiés.
- Corps, mains et bottes entiers. La source est qualifiée Portable Ops Plus PSP ; elle ne certifie pas une incarnation native distincte de MGS2.
- La référence visuelle est une prévisualisation communautaire d’un modèle PSP attribué au jeu, publiée par The Models Resource (frk_14), et non une image hébergée par KONAMI. Le billet officiel PlayStation/KONAMI confirme seulement la présence de cette classe dans le roster MPO+.
- La pose en T, l’édition, les proportions visibles et l’équipement constituent le périmètre suivi ; aucun personnage supplémentaire, incarnation MGS2/MGS3 native ou scène narrative canonique n’est déduit.
- PNG brut RGBA : alpha [0, 255], 16351 pixels de faible frange (1–8). Aucun détourage, agrandissement ou nettoyage programmatique.
- Retenu comme candidat documentaire statique à vérifier ; aucun périmètre historique fermé et aucune admission au combat.

### États et interactions à produire

Profil de soldat invité MPO+ dans l’Atlas ; adaptation de gameplay CQC future et explicitement distincte du canon.

| État prévu | Travail restant |
|---|---|
| Pose de référence | Afficher cette source provisoire et ses réserves sans la présenter comme une animation. |
| Garde et locomotion à produire | Recueillir des séquences de la même édition, pivots et silhouettes avant toute adaptation. |
| Actions et réactions à produire | Documenter équipement, attaques, défense, saisie et neutralisation autorisés par les références ; ne pas attribuer de capacités d’un autre épisode. |
| Sélection et victoire à produire | Définir des cadrages et poses CQC distincts avec leurs preuves, sans les compter comme images déjà livrées. |

- Définir un profil CQC propre à la variante et à son équipement confirmé.
- Vérifier ancrages, échelles, silhouettes opposées et collisions avant binding.
- Traiter apparition, recrutement ou sélection MPO+ séparément des campagnes et récits CQC.

### Prochaine validation

- Comparer masque, harnais, asymétrie et proportions au modèle et à des captures natives complémentaires.
- Contrôler les bords alpha sur fonds clair et sombre.
- Obtenir toutes les poses requises et tester les bindings avant admission au combat.
- Documenter les autres classes invitées du groupe R-MPO-GUEST ; ce candidat ne ferme pas leur inventaire.

Guide général : 02, 04, 05, 15, 16, 17, 18, 22, 25, 26, 27, 29. Extensions : 40, 44, 45, 46, 47, 54, 64, 65, 67. Ces renvois décrivent des contrôles et travaux futurs, sans déclarer les fonctions réalisées.

## Sorties écartées et refus

Les sorties écartées restent brutes et traçables. Un refus sans PNG est journalisé sans fichier inventé et sans relance sous alias.

- **mpop-kgb-soldier-v1** — Lien pendant supplémentaire côté droit de l’image, absent de la référence ; remplacé par la correction ciblée v2.. [Sortie brute](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/rejected/mpop-kgb-soldier-v1--archived-1.png).
- **acid-gun-camera** — La capture KONAMI ne montre pas le support inférieur complet : il sort du cadre gauche. Le PNG complète une plaque murale rectangulaire et ses fixations sans référence visible. Archiver cet essai hors sélection et Atlas ; obtenir une vue native complète avant une nouvelle production.. [Sortie brute](https://github.com/darknigthmare/shadow-codec-ops/blob/codex/cqc-p61-missing-static-sources-20261125/public/cqc/assets/p72/rejected/acid-gun-camera--root-excluded.png).
- **mgr-sai-inventory** — refus sans PNG. Motif et réponse exacte : [registre](../cqc-reprise/pass72/prompt-index.json).
- **mpop-tengu-soldier** — refus sans PNG. Motif et réponse exacte : [registre](../cqc-reprise/pass72/prompt-index.json).