# CQC: VEILBREAK — La dette des soldats

**État livré P74 :** consulter la [continuation P74](CONTINUATION_P74.md) et le [manifeste des images](../cqc-reprise/pass74/veilbreak/image-manifest.json). Cette bible conserve les fiches de conception et les tâches restant à produire; ces deux liens précisent les fichiers effectivement conservés, les absences et les preuves de vérification.

Bible de contenu original pour **CQC Versus Legacy / MGS Codec Simulator**. Version 1.0, 27 novembre 2026. Source de données : `public/cqc/data/veilbreak-content.json`. Ce dossier conçoit l’extension et ses règles; les rapports du moteur et le manifeste d’images attestent séparément ce qui a été exécuté et produit.

**VEILBREAK est une création originale du projet, non canonique.** Elle vise une cohérence narrative et visuelle avec Metal Gear. Les nouveaux noms, lieux, événements, machines et techniques ci-dessous ne sont pas présentés comme des éléments officiels ou comme des restaurations de contenu coupé.

## 1. Ce que contient cette extension

| Lot | Défini dans les données | Qualification |
| --- | --- | --- |
| Personnages jouables | 10 | Dossiers, silhouettes, 100 entrées de commandes, ressources, rivalités et textes d’histoire. |
| Stages | 20 | Lieux distincts, rôle narratif, adversaire d’approche et boss, sol compétitif stable. |
| Ennemis | 20 | Profils distincts et 200 entrées de commandes; sélection comme adversaires de campagne. |
| Boss | 20 | Profils distincts, 200 entrées de commandes et 60 contrats de phase. |
| Campagne | 40 rencontres | Un ennemi puis un boss par stage; progression propre au personnage principal. |
| Récits | 60 scènes + 10 rivalités | Trois introductions et trois épilogues différents pour chacun des dix personnages. |
| Neutralisations | 30 concepts | Trois par personnage; cinématiques et contrôleurs à produire et valider. |
| Costumes | 30 fiches | Dix tenues de service et vingt variantes originales; une fiche ne constitue pas un sprite fini. |
| Décors séparés | 100 plans prévus | Cinq couches par stage; une image composite n’équivaut pas à cinq calques. |
| Objets et projectiles | 20 + 20 | Un objet ou projectile indépendant par image; traînées, impacts et douilles séparés. |
| VFX | 10 clips, 84 images cibles | Spécifications de production; aucune animation revendiquée sur la seule base du texte. |

Les **500 entrées de commandes** correspondent à 50 profils dotés de dix slots. Elles ne désignent pas 500 animations déjà livrées. Les poses de base générées, les animations, les illustrations narratives et les pièces articulées gardent des statuts distincts.

## 2. Cadre, continuité et sources

Le choix de 2016 est une décision d’écriture : l’histoire se place dans l’intervalle qui sépare MGS4, situé en 2014 sur le portail officiel, de Rising, daté de 2018 sur son site. [Konami — MGS4](https://www.konami.com/mg/history/jp/ja/mgs4) ; [Konami — Rising](https://www.konami.com/mg/archive/mgr/jp/story/).

Le point d’appui officiel reste limité : les Patriots sont détruits, les PMC se fragmentent et les technologies cyborg prennent une place accrue. Nous en déduisons qu’un conflit local sur la maintenance des équipements peut être compatible avec cet intervalle; Konami ne décrit ni Nacre ni VEIL dans cette source. [Konami — articulation entre MGS4 et Rising](https://eu-support.konami.com/hc/en-gb/articles/9730773185303-Backstory-How-does-the-Metal-Gear-Rising-Revengeance-tie-in-with-the-rest-of-the-Metal-Gear-series).

**Lieu —** Nacre, port franc fictif et corridor industriel côtier; aucune frontière d’un pays réel n’est réécrite.

**Organisation —** Meridian Recovery Union (MRU), société originale de récupération et de maintenance militaire; sans parenté déclarée avec les organisations officielles.

**VEIL —** VEIL : Verified Equipment Indemnity Ledger, registre contractuel et réseau local de maintenance. Il vérifie des droits de service; il ne lit ni pensées, ni ADN, ni avenir.

**Conflit —** Le programme détourne des interfaces de maintenance volontairement installées dans des équipements MRU. Il peut verrouiller leurs fonctions externes sur site, mais ne contrôle ni tous les cyborgs ni les soldats du monde.

**Enjeu —** Extraire des personnes, conserver les preuves du détournement et rendre leurs équipements utilisables hors abonnement.

**Thème —** Après la commande des armes, la propriété des corps : qui décide de ce qu’un soldat doit encore à son employeur ?

**Dénouement —** Les héros cassent le monopole de maintenance de Nacre et transmettent des preuves à plusieurs destinataires. La guerre et les PMC ne disparaissent pas; aucun événement officiel ultérieur ne dépend de leur victoire.

### Règles de continuité

- Le label Original accompagne chaque entrée. Aucune entrée VEILBREAK ne devient une variante officielle d’un personnage connu.
- Les Patriots ne sont ni ressuscités ni révélés comme commanditaires secrets survivants.
- Aucune filiation, rencontre secrète ou nouvelle biographie n’est ajoutée à Snake, Raiden, Otacon, Sunny ou aux chefs des PMC officiels.
- L’histoire ne prétend expliquer ni créer les technologies, armes ou adversaires de Rising.
- VEIL est un réseau de maintenance local avec appareils compatibles identifiés; pas un nouveau SOP universel, pas une IA omnisciente.
- Les capacités nouvelles reposent sur moteurs, batteries, câbles, capteurs, munitions ou lames HF limitées. Les signaux, coûts, portées et récupérations restent lisibles.
- Les machines originales sont des UGs et engins conventionnels; CUSTODIAN K8 n’a ni charge nucléaire ni capacité de frappe stratégique.
- Les personnages sont adultes. Des civils évacués existent dans le récit, mais ne sont pas des cibles ou des décors destructibles.
- Les comptes rendus et répliques présentent les théories des personnages comme des points de vue; aucune invention ne reçoit une source canonique falsifiée.
- La cohérence visuelle se valide sur silhouettes et détails. « Original cohérent » ne constitue pas une certification de fidélité canonique 1:1.

### Ce que les références visuelles apportent

Les retours officiels de conception de Rising montrent l’intérêt d’une asymétrie fonctionnelle, d’un équipement dont les détails ont un rôle et d’une silhouette née de la mécanique de combat. Ces principes guident nos créations; ils ne constituent pas une validation de leur fidélité. [PlatinumGames — continuité visuelle](https://www.platinumgames.com/official-blog/article/4527) ; [PlatinumGames — conception des personnages](https://www.platinumgames.com/official-blog/article/4694).

Pour les stages, nous retenons le compromis entre lisibilité, richesse des lieux et performance. Le sol stable sert le duel; les mouvements de fond et les modules de campagne viennent ensuite. [PlatinumGames — graphismes et stages](https://www.platinumgames.com/official-blog/article/4761).

Les dialogues décrivent les actions réellement proposées au joueur et doivent être révisés quand ces actions changent. Le scénariste de Rising insiste lui-même sur cette relation entre récit, codec et jeu effectif. [PlatinumGames — Etsu Tamari](https://www.platinumgames.com/official-blog/article/4791).

## 3. Direction artistique et contrat de production

- Sprite de combat 2D UHD peint, volumes militaires crédibles, contours nets, matières usées; éviter le rendu vectoriel simplifié.
- Un personnage entier par PNG transparent, profil trois-quarts orienté à droite, pieds sur une ligne commune; aucune grille, aucun texte, aucune arme flottante fusionnée au corps.
- Un stage par image 16:9, ligne de sol horizontale continue, caméra latérale; les personnages restent lisibles devant le décor.
- Chaque combattant conserve une masse, une asymétrie d’équipement, une couleur d’accent et un rythme de déplacement distincts.
- Dessiner chaque articulation et sa course possible.
- Conserver les axes anatomiques gauche/droite dans toutes les poses.
- Chaque câble mobile, pince, chargeur, projectile et panneau indépendant dispose de son propre fichier.
- Employer des marquages industriels discrets; pas de logos officiels ajoutés aux inventions.

Palette commune : olive désaturé, graphite, céramique ivoire, orange de maintenance, bleu maritime froid. Les accents séparent les personnes et fonctions; ils ne remplacent pas une silhouette reconnaissable en niveaux de gris.

| Plan de décor | Facteur relatif | Rôle |
| --- | --- | --- |
| far | 0.12 | Horizon et volumes lointains |
| back | 0.35 | Architecture distante |
| mid | 0.65 | Machines et éléments situés derrière le duel |
| floor | 1.0 | Surface du duel, collision stable |
| front | 1.12 | Petits éléments aux marges, sans masquer les silhouettes |

Les PNG de combat doivent rester entiers et transparents. Le client peut utiliser les bornes alpha pour aligner les pieds, sans modifier les fichiers. Cette adaptation ne remplace pas une validation des pivots, de l’échelle ou des origines de projectiles.

## 4. Contrat de combat

Simulation cible : **60 images par seconde**, vie de référence **10 000**. Les chiffres sont des valeurs initiales propres à l’extension, à équilibrer par des combats. La notation des tableaux est **préparation / activité / récupération**, en images de simulation.

- Aucune attaque garantie sur toute l’arène.
- Aucune commande adverse future lue par un personnage.
- Aucune téléportation : déplacements physiques avec récupération.
- Chaque super paie de la jauge et peut être contré.
- Les phases boss, bonus et neutralisations cinématiques sont des contrats séparés tant qu’un test de moteur ne les démontre pas.

Les types de coups employés correspondent aux champs du moteur existant : `melee`, `projectile`, `trap`, `recallTrap`, `mobility`, `parry`, `buff`, `heal`, `mark`, `observe`, `reload`, `recover`. Les données n’ajoutent pas silencieusement de pouvoir absent du moteur : les câbles de retenue ralentissent sur contact, l’observation lit une trace déjà visible, la protection est temporaire et la réparation ne restaure que des dégâts récupérables.

Le plan de neutralisation s’exécute uniquement après une victoire confirmée. Sa fiche reste séparée du super utilisable pendant le round. Les variantes humaines et mécaniques évitent de confondre le démantèlement d’un module avec une blessure à un personnage.

## 5. Les dix combattants jouables

| Identifiant | Combattant | Spécialité | Ressource | Rivalité |
| --- | --- | --- | --- | --- |
| vb_latch | LATCH — Nora Venn | CQC de capture et désarmement | PRESSION | LOCKSTEP |
| vb_breakwater | BREAKWATER — Ivo Meran | Grappler lourd et défense limitée | ACCUMULATEUR | REDLINE |
| vb_switchback | SWITCHBACK — Leïla Sorel | Mobilité physique et rafales courtes | CHARGEUR | BLIND LEDGER |
| vb_pale_current | PALE CURRENT — Sora Tan | Parades de contact et choc électrique limité | CHARGE | MORROW-6 |
| vb_blind_ledger | BLIND LEDGER — Malik Daran | Tir méthodique et couverture finie | MAGASIN | STILLWELL |
| vb_redline | REDLINE — Petra Kovač | Pression rapprochée et gestion thermique | CHALEUR | BREAKWATER |
| vb_stillwell | STILLWELL — Amir Sayegh | Endurance plafonnée et anesthésie contrôlée | DOSES | PALE CURRENT |
| vb_rookglass | ROOKGLASS — Anaïs Rault | Leurres physiques et observation limitée | OPTIQUE | SWITCHBACK |
| vb_lockstep | LOCKSTEP — Tomas Varga | Contre-attaques sobres et garde | ASSISTANCE | LATCH |
| vb_morrow_6 | MORROW-6 — Elena Voss | Lame courte et riposte sans invincibilité | CELLULE | ROOKGLASS |

### 5.1. LATCH — Nora Venn

**Identifiant :** `vb_latch`. **Âge :** 36 ans. **Rôle :** CQC de capture et désarmement.

Ancienne mécanicienne de récupération, Nora a installé les interfaces MRU avant d’en découvrir les clauses cachées. Elle revient à Nacre avec des outils ordinaires et les numéros de série qu’on lui avait demandé d’oublier.

**Silhouette et équipement —** Cheveux noirs courts; combinaison olive et graphite; prothèse industrielle orange à l’avant-bras gauche, harnais compact, brassard ivoire de secours. Centre de gravité bas, mains lisibles, aucun bandeau.

**Ressource —** PRESSION : type `energy`, maximum 100, régénération 0.15 par image après le délai du moteur. **Passif —** Appui de maintenance : Récupère un peu plus vite sa garde hors pression; ne gagne aucune armure permanente.

- Le câble de retenue ralentit sur impact; il ne téléporte ni ne ramène automatiquement la cible.
- Aucune saisie à distance sans projectile confirmé.
- Les effets de désarmement restent temporaires et n’affectent que les attaques classées armes à feu.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Paume de verrouillage | melee | 7/3/13 | 330 | 80 | 0 / 0 |
| K — lourd | Coude de calage | melee | 16/5/26 | 650 | 112 | 0 / 0 |
| Bas + J — bas | Crochet de cheville | melee | 13/4/23 | 400 | 105 | 0 / 0 |
| U — saisie | Mise en sécurité | melee | 9/2/35 | 720 | 74 | 0 / 0 |
| I — spécial | Câble de retenue | projectile | 22/1/30 | 340 | 360 | 25 / 0 |
| Bas + I | Pince de dépôt | trap | 28/1/25 | 300 | 75 | 30 / 0 |
| Avant + I | Coupe de sûreté | melee | 18/4/30 | 530 | 120 | 20 / 0 |
| Arrière + I | Recul sous tension | mobility | 8/10/18 | 0 | 0 | 10 / 0 |
| L — utilitaire | Purge du circuit | recover | 30/1/24 | 0 | 0 | 0 / 0 |
| O — super | Rupture de bail | melee | 26/5/42 | 1450 | 135 | 35 / 75 |

#### Lecture des techniques

**Paume de verrouillage —** Court coup de paume droite, avant-bras gauche maintenu contre le torse. **Réponse :** Garder puis contester à courte distance.

**Coude de calage —** Nora cale ses hanches et engage le coude renforcé vers l’avant. **Réponse :** Reculer hors des 112 px et punir les 26 images de retour.

**Crochet de cheville —** Balayage du talon arrière, câble conservé au ceinturon. **Réponse :** Garde basse ou saut.

**Mise en sécurité —** Verrouille l’avant-bras adverse puis pivote vers une projection contrôlée. **Réponse :** Déchoper, sauter ou reculer avant le contact.

**Câble de retenue —** Lance un petit grapnel horizontal; sa bobine reste ancrée au bras. **Réponse :** Sauter, garder ou frapper le projectile; sa portée est courte.

**Pince de dépôt —** Pose une pince visible sur le sol devant ses pieds. **Réponse :** Interrompre la pose, sauter la pince ou la détruire.

**Coupe de sûreté —** Un pas, crochet du poignet et coup de manche contre l’arme. **Réponse :** Garder ou espacer; le désarmement exige un impact net.

**Recul sous tension —** Recule sur ses deux appuis sans disparaître ni traverser le corps adverse. **Réponse :** Poursuivre et punir le retour; aucune invulnérabilité.

**Purge du circuit —** Ouvre brièvement la vanne de pression du bras gauche. **Réponse :** Interrompre la récupération stationnaire.

**Rupture de bail —** Calage des pieds, double frappe de pince au torse puis rabattement au sol. **Réponse :** Garder ou reculer pendant la préparation longue.

#### Introduction — trois scènes

**vb_latch_intro_1** — La machine reconnaît Nora avant que le garde lise son badge. « Technicienne révoquée. Dette transférable. » Elle avait écrit la procédure qui affiche ces mots; elle n’avait jamais signé le droit de les appliquer à quelqu’un.

*Illustration à produire :* Nora devant une borne de douane, bras orange éclairé par un écran hors champ.

**vb_latch_intro_2** — Dans le carnet de service, vingt noms ont été remplacés par vingt numéros de châssis. Le premier est celui d’un docker qui lui avait appris à serrer une main sans briser les doigts.

*Illustration à produire :* Gros plan sur carnet et main mécanique ouverte, silhouettes de quais en arrière-plan.

**vb_latch_intro_3** — Elle appelle les autres : « J’ai les clés des machines. Il nous faut maintenant les personnes qui peuvent dire à qui elles appartiennent. »

*Illustration à produire :* Nora branchant un câble physique dans une radio portative, terminal désert au fond.

#### Rivalité — LOCKSTEP

**Nora :** « Tu protèges des gens, ou le registre qui dit qu’ils sont du matériel ? »

**Tomas :** « Si je baisse cette barrière sans ordre, des hommes armés passent aussi. »

**Nora :** « Alors regarde ceux que tu retiens, avant de regarder ton ordre. »

#### Épilogue — trois scènes distinctes

**vb_latch_ending_1** — Le dernier verrou cède sans explosion. Nora laisse les codes copiés sur un terminal que chacun peut lire, puis coupe l’antenne de maintenance. Pour la première fois, personne ne peut lui demander de désactiver un bras depuis un bureau.

*Illustration à produire :* Nora face à une baie de maintenance ouverte, câble débranché au premier plan.

**vb_latch_ending_2** — Au quai, elle apprend aux anciens clients à régler leurs propres articulations. Elle commence par rendre les dossiers, y compris les pages portant sa signature.

*Illustration à produire :* Atelier ouvert sur le port, Nora passant une clé à un adulte hors cadre; aucune pose de combat.

**vb_latch_ending_3** — « Ce n’est plus une garantie », dit-elle à celui qui lui demande combien de temps cela tiendra. « C’est réparable. Et tu n’auras pas besoin de moi pour avoir le droit d’essayer. »

*Illustration à produire :* Main mécanique de Nora posant une boîte à outils devant un établi éclairé par le soleil.

#### Trois neutralisations à produire

**Retour au sol —** Bloque le poignet, désaxe une jambe et accompagne la chute. Humain : Maintient une clé sans fracture et relâche après arrêt du combat. Machine : Coupe l’alimentation externe après immobilisation.

**Contrat résilié —** Arrache le module de verrouillage externe et l’écrase au sol. Humain : Le module est porté sur l’arme ou le gilet, jamais retiré du corps. Machine : Le corps reste entier; seule la boîte de commande est détruite.

**Scellé de quai —** Fixe un câble entre deux points d’armure puis désarme. Humain : Le câble retient l’équipement sans serrer le cou. Machine : Immobilise les articulations de service.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Cheveux noirs courts; combinaison olive et graphite; prothèse industrielle orange à l’avant-bras gauche, harnais compact, brassard ivoire de secours. Centre de gravité bas, mains lisibles, aucun bandeau. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_latch.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.2. BREAKWATER — Ivo Meran

**Identifiant :** `vb_breakwater`. **Âge :** 45 ans. **Rôle :** Grappler lourd et défense limitée.

Ivo dirigeait une équipe de renflouage payée au poids récupéré. Lorsqu’un transport de pièces médicales fut déclaré plus précieux que son équipage, il vida la cale à contre-ordre. Son scaphandre reste inscrit au bilan de la MRU.

**Silhouette et équipement —** Homme large au visage buriné; exosquelette de plongée jaune usé et anthracite, bottes nervurées, flexibles courts protégés, outil de sauvetage rectangulaire; visage découvert.

**Ressource —** ACCUMULATEUR : type `energy`, maximum 100, régénération 0.1 par image après le délai du moteur. **Passif —** Appui de quai : Garde récupérée hors attaque; les lourdes poses défensives consomment l’accumulateur.

- Aucun déplacement instantané.
- Armure temporaire limitée à un impact; saisies et électricité la contournent.
- Portée courte et récupération importante.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Poing de quai | melee | 9/4/17 | 380 | 84 | 0 / 0 |
| K — lourd | Levier d’échouage | melee | 21/6/33 | 780 | 132 | 0 / 0 |
| Bas + J — bas | Sabot d’ancrage | melee | 17/4/28 | 460 | 104 | 0 / 0 |
| U — saisie | Dépose du chargement | melee | 11/2/41 | 900 | 78 | 0 / 0 |
| I — spécial | Écran de renflouage | buff | 22/1/25 | 0 | 0 | 30 / 0 |
| Bas + I | Cale basse | parry | 7/9/32 | 600 | 90 | 20 / 0 |
| Avant + I | Poussée de ballast | melee | 23/8/35 | 720 | 115 | 25 / 0 |
| Arrière + I | Reprise d’appui | mobility | 12/8/24 | 0 | 0 | 5 / 0 |
| L — utilitaire | Remise en pression | recover | 38/1/28 | 0 | 0 | 0 / 0 |
| O — super | Brise-lame | melee | 32/7/48 | 1700 | 140 | 45 / 80 |

#### Lecture des techniques

**Poing de quai —** Jab compact du gant droit, torse lourd en appui. **Réponse :** Espacer ou garder.

**Levier d’échouage —** Grand revers du levier, outil restant tenu à deux mains. **Réponse :** Passer sous le début ou punir la récupération.

**Sabot d’ancrage —** Coup de botte bas sans glissement du corps. **Réponse :** Garde basse ou saut.

**Dépose du chargement —** Soulève depuis la ceinture et dépose latéralement. **Réponse :** Déchoper ou quitter la portée.

**Écran de renflouage —** Verrouille la plaque de poitrine et absorbe au plus un contact. **Réponse :** Saisir ou attendre; l’effet expire vite.

**Cale basse —** Levier plaqué au sol pour détourner une frappe de contact. **Réponse :** Feinter, attendre ou saisir.

**Poussée de ballast —** Avance sur deux pas, épaule devant, flexibles contenus. **Réponse :** Garder puis punir; aucune armure implicite.

**Reprise d’appui —** Recule lourdement de 40 pixels. **Réponse :** Poursuivre pendant le redressement.

**Remise en pression —** Ivo pompe un accumulateur mécanique à la hanche. **Réponse :** Approcher ou tirer pendant la longue action.

**Brise-lame —** Levier au-dessus de l’épaule, transfert de masse et impact unique. **Réponse :** S’écarter de la portée ou garder; énorme retour vulnérable.

#### Introduction — trois scènes

**vb_breakwater_intro_1** — Le manifeste classe le ferry en perte acceptable. Ivo gratte la formule au dos de son casque : les marins qui l’ont ramené au quai ont tous une écriture différente.

*Illustration à produire :* Ivo assis près du bassin, casque posé et marques manuscrites illisibles.

**vb_breakwater_intro_2** — La MRU lui propose un arrangement : rendre le scaphandre et laisser partir son équipe sans leurs prothèses. Il demande simplement où il doit signer. Pendant qu’on cherche le document, il ouvre la grille.

*Illustration à produire :* Gros plan sur gant retenant une grille soulevée, bureau éclairé derrière.

**vb_breakwater_intro_3** — « Le port a été bâti pour faire entrer des marchandises. On va lui apprendre à laisser sortir des gens. »

*Illustration à produire :* Ivo sur une rampe de ferry relevée, pluie fine et silhouettes de conteneurs.

#### Rivalité — REDLINE

**Ivo :** « Une surcharge ne répare pas une cage. »

**Petra :** « Une porte assez lourde ne cède pas avec de bonnes intentions. »

**Ivo :** « Alors frappe la porte. Laisse debout ce qu’il y a derrière. »

#### Épilogue — trois scènes distinctes

**vb_breakwater_ending_1** — Ivo maintient le pont pendant la dernière évacuation. Personne ne lui demande de battre son record de charge; ils attendent qu’il dise que le passage est sûr.

*Illustration à produire :* Ivo en soutien sous un élément de passerelle, ligne d’évacuation suggérée loin derrière.

**vb_breakwater_ending_2** — Au retour, son ancien employeur réclame le scaphandre. Ivo livre les pièces de rechange, accompagnées d’une facture pour chaque vie que le contrat avait omise.

*Illustration à produire :* Ivo déposant un dossier et une pièce mécanique sur un bureau de quai.

**vb_breakwater_ending_3** — Les enfants du port voient une vieille armure transformée en treuil. Ivo garde seulement les gants. Un bon outil, leur dit-il, ne choisit pas à votre place ce qui mérite d’être sauvé.

*Illustration à produire :* Treuil de secours jaune devant la mer, Ivo sans exosquelette à côté.

#### Trois neutralisations à produire

**Dépose contrôlée —** Soulève le vaincu puis le place à plat loin des armes. Humain : Évite la tête et le cou. Machine : Verrouille un axe de hanche.

**Sous scellés —** Plaque l’arme adverse sous la lourde botte et l’ouvre au levier. Humain : Désarme sans contact du levier sur le corps. Machine : Sépare le magasin de puissance.

**Mouillage —** Enroule un câble de chantier autour de l’équipement et l’ancre. Humain : Immobilise le gilet sans étranglement. Machine : Immobilise le châssis.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Homme large au visage buriné; exosquelette de plongée jaune usé et anthracite, bottes nervurées, flexibles courts protégés, outil de sauvetage rectangulaire; visage découvert. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_breakwater.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.3. SWITCHBACK — Leïla Sorel

**Identifiant :** `vb_switchback`. **Âge :** 29 ans. **Rôle :** Mobilité physique et rafales courtes.

Leïla livre des pièces entre les dépôts sans prendre connaissance des contrats. Le jour où son sac devient la seule copie d’un transfert illégal de personnel, tous les portiques du corridor se ferment devant elle.

**Silhouette et équipement —** Silhouette sèche; combinaison de coursière graphite, petit tour de cou bordeaux, cheveux attachés; exo-attelles visibles aux chevilles et talons, petit PDW; garde de kickboxing penchée vers l’avant.

**Ressource —** CHARGEUR : type `ammo`, maximum 8, régénération 0 par image après le délai du moteur. **Passif —** Reprise de souffle : Les déplacements spéciaux ne donnent pas d’invulnérabilité; la vitesse de marche supérieure est payée par la faible puissance.

- Les pas spéciaux se déplacent dans l’espace sans traverser une garde.
- Huit munitions, recharge interruptible.
- Aucun super ne se déclenche à chargeur vide.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Direct de passage | melee | 6/3/12 | 300 | 76 | 0 / 0 |
| K — lourd | Talon de traverse | melee | 14/4/25 | 590 | 116 | 0 / 0 |
| Bas + J — bas | Rase-quai | melee | 11/4/25 | 370 | 102 | 0 / 0 |
| U — saisie | Changement de voie | melee | 8/2/33 | 680 | 70 | 0 / 0 |
| I — spécial | Rafale de sortie | projectile | 16/1/28 | 240 | 450 | 2 / 0 |
| Bas + I | Pas sous la barrière | mobility | 7/12/18 | 0 | 0 | 0 / 0 |
| Avant + I | Genou de quai | melee | 17/6/29 | 610 | 105 | 0 / 0 |
| Arrière + I | Double recul | mobility | 7/12/18 | 0 | 0 | 0 / 0 |
| L — utilitaire | Recharge en sacoche | reload | 34/1/25 | 0 | 0 | 0 / 0 |
| O — super | Couloir de sortie | projectile | 29/1/44 | 420 | 600 | 4 / 75 |

#### Lecture des techniques

**Direct de passage —** Direct bref sans immobiliser le torse. **Réponse :** Garder et chercher la portée plus longue.

**Talon de traverse —** Pivot sur l’attelle arrière et talon horizontal. **Réponse :** Garder ou interrompre la préparation.

**Rase-quai —** Glissade courte sans invincibilité. **Réponse :** Garde basse ou saut.

**Changement de voie —** Accroche le bras et pivote en dehors de la ligne de tir. **Réponse :** Déchoper, reculer ou sauter.

**Rafale de sortie —** Petite rafale de deux coups, coudes près du buste. **Réponse :** Garder, s’accroupir sous la ligne haute ou sauter.

**Pas sous la barrière —** Abaisse le buste et avance de 48 pixels. **Réponse :** Frapper bas ou anticiper le retour; aucune invulnérabilité.

**Genou de quai —** Deux appuis assistés puis genou frontal. **Réponse :** Garder puis punir la réception.

**Double recul —** Recule de 84 pixels sur ses attelles. **Réponse :** Poursuivre après lecture du départ.

**Recharge en sacoche —** Remplace le magasin avec la main gauche puis vérifie le verrou. **Réponse :** Interrompre avant le retour en garde.

**Couloir de sortie —** Rafale contrôlée de quatre coups à hauteur du torse. **Réponse :** Se baisser sous la ligne haute ou garder toute la séquence.

#### Introduction — trois scènes

**vb_switchback_intro_1** — Le trajet devait durer sept minutes. Au premier contrôle, le contenu de sa sacoche change de catégorie : « pièces détachées » devient « preuve ». Au second, son propre badge devient une alerte.

*Illustration à produire :* Leïla au pied d’un portique ferroviaire, sacoche fermée contre la poitrine.

**vb_switchback_intro_2** — La voix du répartiteur lui offre une prime si elle dépose le colis dans une benne. Elle reconnaît le silence qui suit : le même que lorsque les équipes de récupération cessent de répondre.

*Illustration à produire :* Leïla devant une benne vide, écouteur débranché dans sa main.

**vb_switchback_intro_3** — Elle choisit une route absente du plan. « Vous aviez besoin d’une livraison. Pas d’une permission. »

*Illustration à produire :* Leïla avançant sur une passerelle extérieure, silhouettes d’antennes lointaines.

#### Rivalité — BLIND LEDGER

**Leïla :** « Ces noms ne bougent plus si je te donne le dossier. »

**Malik :** « Sans un témoin, ils diront que tu l’as fabriqué. »

**Leïla :** « Alors marche. Les témoins peuvent aussi livrer. »

#### Épilogue — trois scènes distinctes

**vb_switchback_ending_1** — Les copies partent par trois routes. Leïla garde la dernière jusqu’à ce que les destinataires récitent eux-mêmes les numéros de page. Une réception automatique ne lui suffit plus.

*Illustration à produire :* Trois radios et un carnet sur la table d’un terminal, Leïla assise à côté.

**vb_switchback_ending_2** — Les portiques ouverts ne font pas disparaître ceux qui leur faisaient confiance. Elle revient chercher les coursiers restés cachés entre les dépôts.

*Illustration à produire :* Leïla guidant un petit convoi de silhouettes adultes sur une route dégagée.

**vb_switchback_ending_3** — Sur son nouveau badge, la case employeur reste vide. Son numéro de téléphone est au dos. Un contrat peut acheter une course; il ne peut plus acheter celle qui la fait.

*Illustration à produire :* Badge vierge au premier plan, Leïla quittant le port à pied au soleil.

#### Trois neutralisations à produire

**Fin de course —** Esquive latérale, crochet de pied et arrêt du PDW. Humain : Chute contrôlée sur le dos. Machine : Le châssis tombe sur un genou et coupe son moteur.

**Colis refusé —** Attrape l’arme adverse, retire le chargeur et le lance hors arène. Humain : Aucun tir à bout portant après victoire. Machine : Retire une cartouche d’alimentation externe.

**Voie libérée —** Enchaîne trois frappes de jambe puis pousse l’adversaire assis. Humain : Termine par une poussée du gilet. Machine : Cible les protections et termine sur un arrêt moteur.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Silhouette sèche; combinaison de coursière graphite, petit tour de cou bordeaux, cheveux attachés; exo-attelles visibles aux chevilles et talons, petit PDW; garde de kickboxing penchée vers l’avant. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_switchback.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.4. PALE CURRENT — Sora Tan

**Identifiant :** `vb_pale_current`. **Âge :** 32 ans. **Rôle :** Parades de contact et choc électrique limité.

Sora conçut un diagnostic pour empêcher les batteries défaillantes de blesser leurs porteurs. La MRU en fit un certificat révocable. Iel conserve les tests qui prouvent que le verrou n’a jamais été une nécessité médicale.

**Silhouette et équipement —** Adulte mince au visage visible; cheveux courts noirs et argent; plastron de céramique pâle sur combinaison marine; gants isolants, deux matraques de contact, petites bobines cuivrées dorsales.

**Ressource —** CHARGE : type `energy`, maximum 100, régénération 0.18 par image après le délai du moteur. **Passif —** Circuit de retour : Une parade réussie fournit trois points de jauge supplémentaires; aucun effet sans attaque adverse réelle.

- Les chocs sont de contact ou portés par une sonde visible.
- Immunité temporaire après choc pour éviter les boucles de stun.
- Aucun contrôle mental ou arrêt global des implants.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Test de contact | melee | 7/3/14 | 320 | 86 | 0 / 0 |
| K — lourd | Boucle fermée | melee | 16/5/27 | 630 | 124 | 0 / 0 |
| Bas + J — bas | Terre basse | melee | 13/4/24 | 390 | 110 | 0 / 0 |
| U — saisie | Débranchement | melee | 9/2/35 | 700 | 74 | 0 / 0 |
| I — spécial | Parade isolante | parry | 6/10/29 | 500 | 100 | 20 / 0 |
| Bas + I | Sonde de sol | trap | 27/1/28 | 340 | 78 | 28 / 0 |
| Avant + I | Contact capacitif | melee | 19/4/32 | 580 | 132 | 30 / 0 |
| Arrière + I | Dérivation | mobility | 9/9/20 | 0 | 0 | 8 / 0 |
| L — utilitaire | Remise à zéro | recover | 31/1/26 | 0 | 0 | 0 / 0 |
| O — super | Continuité rompue | melee | 30/5/44 | 1450 | 140 | 45 / 75 |

#### Lecture des techniques

**Test de contact —** Matraque droite tenue court, coup sec sans arc visible permanent. **Réponse :** Garder puis répondre.

**Boucle fermée —** Croise les deux matraques puis frappe avec l’extrémité gauche. **Réponse :** Reculer ou interrompre.

**Terre basse —** Abaisse une matraque à hauteur du tibia. **Réponse :** Garde basse ou saut.

**Débranchement —** Bloque le bras et déséquilibre sans saisir les câbles internes. **Réponse :** Déchoper ou sauter.

**Parade isolante —** Forme un V avec les matraques pour détourner une frappe de contact. **Réponse :** Feinter ou saisir; une balle n’est pas parée.

**Sonde de sol —** Dépose une sonde basse entourée d’un cercle lumineux court. **Réponse :** Sauter, détruire ou interrompre la pose.

**Contact capacitif —** Allonge le bras et déclenche le condensateur au contact. **Réponse :** Garder ou s’écarter; aucune onde pleine arène.

**Dérivation —** Décroche en arrière en gardant les câbles près du corps. **Réponse :** Poursuivre la récupération.

**Remise à zéro —** Retire puis réinsère le condensateur dorsal. **Réponse :** Interrompre la séquence stationnaire.

**Continuité rompue —** Trois angles de matraque dessinés dans l’animation pour un impact de simulation unique. **Réponse :** Lire la longue préparation, garder ou sortir de portée.

#### Introduction — trois scènes

**vb_pale_current_intro_1** — Le vieux test fonctionne encore : une batterie trop chaude s’arrête, puis repart quand son porteur le décide. Dans la version commerciale, le même bouton demande l’autorisation d’un serveur.

*Illustration à produire :* Sora devant deux modules ouverts sur une table de laboratoire.

**vb_pale_current_intro_2** — Sora avait signé la ligne qui disait « protection ». Une annotation la transforme en « contrôle d’usage ». Iel emporte les deux versions, avec leurs dates.

*Illustration à produire :* Doigts gantés tenant deux circuits presque identiques, archive dans l’ombre.

**vb_pale_current_intro_3** — « Je sais comment ils ont fermé la boucle. Ne me demandez pas encore pourquoi je ne l’ai pas vue. »

*Illustration à produire :* Sora quittant un atelier vide, sac de batteries contre l’épaule.

#### Rivalité — MORROW-6

**Sora :** « Je peux retirer leur interface. »

**Elena :** « Tu me proposes encore de confier mon corps à quelqu’un. »

**Sora :** « Je te propose de tenir le tournevis. »

#### Épilogue — trois scènes distinctes

**vb_pale_current_ending_1** — La procédure tient sur une page. Sora la teste avec ceux qui devront l’utiliser, y compris ceux qui n’ont aucune formation. Les premiers retours sont moins flatteurs que ceux du laboratoire; ils sont enfin utiles.

*Illustration à produire :* Sora à un établi partagé, page schématique sans texte lisible et outils simples.

**vb_pale_current_ending_2** — Les certificats privés quittent le serveur. Les limites thermiques restent, inscrites sur les appareils. La liberté n’exige pas de mentir sur ce qu’une machine supporte.

*Illustration à produire :* Plan de batteries réparées, petites étiquettes de contrôle et mains différentes.

**vb_pale_current_ending_3** — Sora garde son ancienne signature sur les rapports publics. Iel ne veut plus que l’auteur d’une modification disparaisse derrière le nom d’une fonction.

*Illustration à produire :* Sora de profil face à une fenêtre de matin, dossiers rangés derrière.

#### Trois neutralisations à produire

**Circuit ouvert —** Détourne les mains puis débranche l’équipement externe. Humain : La matraque bloque l’arme, pas le cœur. Machine : Le voyant de combat s’éteint sans explosion.

**Test terminé —** Désarme avec deux rotations de matraque et immobilise. Humain : Le vaincu garde les mains libres après arrêt du combat. Machine : Les moteurs se placent en mode service.

**Mise à la terre —** Plaque une sonde sur l’arme et provoque une étincelle brève. Humain : L’arme tombe; aucune électrocution prolongée du corps. Machine : Le chargeur externe se vide.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Adulte mince au visage visible; cheveux courts noirs et argent; plastron de céramique pâle sur combinaison marine; gants isolants, deux matraques de contact, petites bobines cuivrées dorsales. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_pale_current.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.5. BLIND LEDGER — Malik Daran

**Identifiant :** `vb_blind_ledger`. **Âge :** 51 ans. **Rôle :** Tir méthodique et couverture finie.

Auditeur des achats militaires, Malik savait prouver que les chiffres concordaient. Il lui fallut voir une ambulance saisie pour demander à quoi ils correspondaient. Il est venu témoigner contre les contrats qu’il a lui-même certifiés.

**Silhouette et équipement —** Homme noir de 51 ans, barbe grise courte; manteau de terrain prune grisé sur gilet pare-balles, optique ambrée monoculaire, petit pistolet semi-automatique, écran balistique plié sur l’avant-bras gauche.

**Ressource —** MAGASIN : type `ammo`, maximum 8, régénération 0 par image après le délai du moteur. **Passif —** Ligne vérifiée : Après 36 images immobiles, les tirs de précision bénéficient du bonus de visée stable du moteur; bouger ou tirer annule la préparation.

- Huit cartouches réelles et recharge visible.
- L’écran arrête un seul projectile compatible; il ne couvre ni explosion ni saisie.
- La visée exige une immobilité exploitable.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Main de retenue | melee | 8/3/16 | 320 | 78 | 0 / 0 |
| K — lourd | Crosse du témoin | melee | 17/5/29 | 620 | 104 | 0 / 0 |
| Bas + J — bas | Arrêt de marche | melee | 14/4/25 | 390 | 102 | 0 / 0 |
| U — saisie | Main courante | melee | 10/2/36 | 700 | 72 | 0 / 0 |
| I — spécial | Pièce à conviction | projectile | 22/1/31 | 520 | 600 | 1 / 0 |
| Bas + I | Écran de déposition | buff | 24/1/25 | 0 | 0 | 0 / 0 |
| Avant + I | Double constat | projectile | 20/1/34 | 340 | 500 | 2 / 0 |
| Arrière + I | Distance de sûreté | mobility | 10/9/22 | 0 | 0 | 0 / 0 |
| L — utilitaire | Inventaire des cartouches | reload | 39/1/27 | 0 | 0 | 0 / 0 |
| O — super | Compte définitif | projectile | 35/1/45 | 780 | 650 | 2 / 80 |

#### Lecture des techniques

**Main de retenue —** Écarte le bras adverse de la main libre. **Réponse :** Garder ou contrer la faible portée.

**Crosse du témoin —** Coup de crosse court, doigt hors détente. **Réponse :** Reculer puis punir.

**Arrêt de marche —** Coup de chaussure à la jambe avancée. **Réponse :** Garde basse ou saut.

**Main courante —** Clé de poignet suivie d’un déséquilibre latéral. **Réponse :** Déchoper ou sortir de portée.

**Pièce à conviction —** Prend l’alignement de l’optique et tire un coup précis. **Réponse :** S’accroupir sous la trajectoire haute, garder ou le presser avant le tir.

**Écran de déposition —** Déplie un écran balistique de taille avant-bras. **Réponse :** Saisir ou employer une explosion; un seul projectile peut être arrêté.

**Double constat —** Deux tirs espacés à la même hauteur. **Réponse :** Garder les deux tirs ou se baisser.

**Distance de sûreté —** Recule de 45 pixels en gardant le pistolet abaissé. **Réponse :** Avancer pendant sa récupération.

**Inventaire des cartouches —** Éjecte, remplace et verrouille son unique magasin. **Réponse :** Interrompre le long temps de recharge.

**Compte définitif —** Deux coups de précision séparés par un retour en ligne de visée. **Réponse :** Se baisser ou garder; aucune poursuite automatique de la cible.

#### Introduction — trois scènes

**vb_blind_ledger_intro_1** — Malik trouve sa propre signature sur la saisie d’une prothèse pédiatrique. Le dossier est conforme. C’est cette conformité, plus que le montant, qui l’empêche de dormir.

*Illustration à produire :* Malik seul dans une salle d’archives, lampe sur un dossier fermé; aucun enfant représenté.

**vb_blind_ledger_intro_2** — Il a gardé un pistolet de ses années de sécurité, et toutes les habitudes qui vont avec : compter, vérifier, attendre. Les chiffres l’ont protégé jusque-là. Ils ne protégeront pas son témoin.

*Illustration à produire :* Malik vérifiant un magasin sur une table vide, manteau posé au dossier.

**vb_blind_ledger_intro_3** — « Je ne suis pas venu les accuser d’avoir mal rempli les formulaires. Je suis venu montrer ce qu’un formulaire peut faire. »

*Illustration à produire :* Malik franchissant la porte des archives, petit dossier rigide sous le bras.

#### Rivalité — STILLWELL

**Malik :** « Sans preuve, ce sera leur parole contre la nôtre. »

**Amir :** « Et sans courant dans cette salle, il n’y aura plus personne pour parler. »

**Malik :** « Donne-moi dix minutes. Pas une promesse de plus. »

#### Épilogue — trois scènes distinctes

**vb_blind_ledger_ending_1** — Malik dépose les originaux. Le greffier lui demande s’il vient comme expert ou comme suspect. Il répond : « Les deux. »

*Illustration à produire :* Malik face à une table de dépôt sobre, pistolet scellé dans une boîte séparée.

**vb_blind_ledger_ending_2** — Le dossier cite ses décisions avant celles de ses supérieurs. Pour la première fois, sa précision ne sert pas à éloigner sa responsabilité.

*Illustration à produire :* Pages de témoignage reliées, visage de Malik visible dans le reflet d’une vitre.

**vb_blind_ledger_ending_3** — À Nacre, on garde une copie de tout. Il ne demande pas que son nom soit retiré de la plaque des responsables de la saisie; il demande qu’on ajoute les noms de ceux qui ont pu revenir.

*Illustration à produire :* Malik devant un mur d’archives communautaires, manteau clair sous la lumière du jour.

#### Trois neutralisations à produire

**Arme déposée —** Frappe la main armée puis oblige l’équipement à tomber. Humain : N’utilise aucune balle après la victoire. Machine : Déclipse le magasin externe.

**Déposition close —** Bloque l’arme avec l’écran et termine par une projection. Humain : Chute amortie sur le côté. Machine : Le châssis glisse à genoux.

**Pièce sous scellés —** Ramasse l’arme hors d’atteinte et verrouille sa culasse. Humain : S’éloigne sans viser le vaincu. Machine : Désactive le module de tir.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Homme noir de 51 ans, barbe grise courte; manteau de terrain prune grisé sur gilet pare-balles, optique ambrée monoculaire, petit pistolet semi-automatique, écran balistique plié sur l’avant-bras gauche. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_blind_ledger.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.6. REDLINE — Petra Kovač

**Identifiant :** `vb_redline`. **Âge :** 38 ans. **Rôle :** Pression rapprochée et gestion thermique.

Petra a vendu des démonstrations d’exosquelettes capables de dépasser leurs limites de sécurité. Elle découvre que les modèles distribués aux agents n’ont pas les systèmes de secours de son prototype. Sa célébrité est devenue leur mode d’emploi.

**Silhouette et équipement —** Cheveux auburn courts vers l’arrière; exosquelette noir mat et orange, montants mécaniques dorsaux visibles, pistons de coude et tonfas industriels courts; aucune flamme permanente.

**Ressource —** CHALEUR : type `heat`, maximum 100, régénération 0.2 par image après le délai du moteur. **Passif —** Retour mécanique : La chaleur retombe après l’action; la pression répétée finit par interdire les techniques trop coûteuses.

- La chaleur plafonne les enchaînements.
- Les tonfas ne donnent pas de garde automatique.
- Le refroidissement expose Petra et ne soigne pas.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Impulsion courte | melee | 6/3/14 | 340 | 80 | 0 / 0 |
| K — lourd | Butée de sécurité | melee | 15/5/29 | 680 | 116 | 0 / 0 |
| Bas + J — bas | Piston bas | melee | 12/4/25 | 410 | 105 | 0 / 0 |
| U — saisie | Test de résistance | melee | 9/2/36 | 740 | 73 | 0 / 0 |
| I — spécial | Accélération rouge | melee | 14/7/31 | 600 | 115 | 22 / 0 |
| Bas + I | Contre-butée | parry | 6/8/34 | 560 | 98 | 18 / 0 |
| Avant + I | Surcharge du coude | melee | 22/5/36 | 820 | 128 | 32 / 0 |
| Arrière + I | Pas d’échappement | mobility | 8/9/20 | 0 | 0 | 10 / 0 |
| L — utilitaire | Ouverture des ailettes | recover | 33/1/27 | 0 | 0 | 0 / 0 |
| O — super | Au-delà du voyant | melee | 29/6/48 | 1650 | 145 | 55 / 80 |

#### Lecture des techniques

**Impulsion courte —** Piston de coude engagé pour un jab de tonfa. **Réponse :** Garder puis espacer.

**Butée de sécurité —** Revers puissant avec arrêt mécanique visible. **Réponse :** Reculer et punir le retour.

**Piston bas —** Frappe basse de tonfa, genou fléchi. **Réponse :** Garde basse ou saut.

**Test de résistance —** Accroche l’épaule et projette par rotation du bassin. **Réponse :** Déchoper, sauter ou reculer.

**Accélération rouge —** Courte poussée motorisée et frappe unique en simulation. **Réponse :** Garder puis répondre; n’ignore pas les coups.

**Contre-butée —** Croise ses tonfas à hauteur du torse. **Réponse :** Retarder l’attaque ou saisir.

**Surcharge du coude —** Charge le piston puis déroule le bras d’un seul arc. **Réponse :** Interrompre les 22 images ou garder.

**Pas d’échappement —** Petite poussée arrière sans flamme ni téléportation. **Réponse :** Poursuivre le retour.

**Ouverture des ailettes —** Ouvre les plaques du dos et évacue la chaleur par vapeur brève. **Réponse :** Approcher pendant la ventilation.

**Au-delà du voyant —** Double tonfa simultané, struts tendus puis lourde récupération. **Réponse :** Garder ou reculer avant l’impact.

#### Introduction — trois scènes

**vb_redline_intro_1** — Sur l’affiche, Petra sourit devant un prototype intact. Dans le dépôt, les modèles de série ont déjà perdu leurs clapets de sécurité. Quelqu’un a économisé sur la seule partie que la caméra ne montrait jamais.

*Illustration à produire :* Petra devant une rangée d’exosquelettes, reflet d’une ancienne affiche sans texte.

**vb_redline_intro_2** — Son contrat lui interdit de dénigrer le produit. Elle appelle son agent : « Très bien. Je vais faire une démonstration de ce qu’ils ont enlevé. »

*Illustration à produire :* Petra posant un contrat froissé près d’une soupape démontée.

**vb_redline_intro_3** — Elle règle la limite de chauffe en dessous de son record. Cette fois, le public doit pouvoir rentrer chez lui.

*Illustration à produire :* Petra ajustant ses ailettes dans une soufflerie vide.

#### Rivalité — BREAKWATER

**Petra :** « J’ouvre une brèche; tu fais passer les autres. »

**Ivo :** « Et toi ? »

**Petra :** « Cette fois, je passe avec eux. »

#### Épilogue — trois scènes distinctes

**vb_redline_ending_1** — Petra détruit les matrices qui falsifiaient les tests, mais garde un appareil défectueux. Il faudra montrer la différence dans une salle où personne ne pourra monter le son pour couvrir les alarmes.

*Illustration à produire :* Petra transportant une pièce noircie, salle d’essai silencieuse au fond.

**vb_redline_ending_2** — Son nouveau film commence par un échec et une évacuation réussie. Elle refuse de supprimer la minute où elle ne parvient plus à soulever le bras.

*Illustration à produire :* Petra assise devant un petit moniteur et une caméra de chantier.

**vb_redline_ending_3** — Au port, les ouvriers se moquent de sa vitesse de travail. Elle rit et ralentit encore. Les limites sont enfin les siennes.

*Illustration à produire :* Petra réparant lentement un treuil sans tonfas, lumière d’après-midi.

#### Trois neutralisations à produire

**Voyant rouge —** Frappe les protections en alternance et stoppe le dernier tonfa avant le visage. Humain : Le vaincu tombe assis, désarmé. Machine : Le contrôleur passe en sécurité.

**Essai interrompu —** Verrouille l’équipement adverse entre ses tonfas puis le tord. Humain : Brise l’arme tenue, pas un membre. Machine : Détruit une pièce externe remplaçable.

**Arrêt d’urgence —** Plaque un tonfa au torse du gilet et repousse sur un genou. Humain : Maintient la distance sans second coup. Machine : Actionne une coupure externe.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Cheveux auburn courts vers l’arrière; exosquelette noir mat et orange, montants mécaniques dorsaux visibles, pistons de coude et tonfas industriels courts; aucune flamme permanente. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_redline.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.7. STILLWELL — Amir Sayegh

**Identifiant :** `vb_stillwell`. **Âge :** 41 ans. **Rôle :** Endurance plafonnée et anesthésie contrôlée.

Médecin d’évacuation sous contrat, Amir a appris à trier les patients avec une liste de matériels disponibles. On lui demande désormais de trier selon leur solvabilité. Il emporte la liste des besoins et laisse celle des dettes.

**Silhouette et équipement —** Homme brun barbu; veste d’urgence bleu poussière sur armure graphite, coque médicale blanche au dos, prothèse visible au tibia gauche, bâton de secours pliant; pistolet tranquillisant au holster, aucun emblème de croix rouge.

**Ressource —** DOSES : type `ammo`, maximum 6, régénération 0 par image après le délai du moteur. **Passif —** Triage prudent : Les soins ne restaurent que les blessures grises récupérables et respectent un plafond global de 700 points par round.

- Les doses n’endorment pas les machines.
- La somnolence s’accumule avec une immunité après étourdissement.
- Soins limités aux dégâts récupérables; aucune résurrection ni boucle infinie.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Écarter le danger | melee | 7/3/14 | 310 | 82 | 0 / 0 |
| K — lourd | Bâton de dégagement | melee | 16/5/28 | 610 | 126 | 0 / 0 |
| Bas + J — bas | Appui coupé | melee | 13/4/25 | 380 | 109 | 0 / 0 |
| U — saisie | Position de sûreté | melee | 9/2/36 | 690 | 74 | 0 / 0 |
| I — spécial | Dose de contention | projectile | 21/1/30 | 260 | 470 | 1 / 0 |
| Bas + I | Compression rapide | heal | 41/1/30 | 0 | 0 | 0 / 0 |
| Avant + I | Dégagement de brancard | melee | 19/6/31 | 610 | 122 | 0 / 0 |
| Arrière + I | Retrait protégé | mobility | 9/10/21 | 0 | 0 | 0 / 0 |
| L — utilitaire | Remplacement du bloc-dose | reload | 38/1/28 | 0 | 0 | 0 / 0 |
| O — super | Couloir sanitaire | melee | 27/6/43 | 1420 | 140 | 0 / 75 |

#### Lecture des techniques

**Écarter le danger —** Paume ouverte suivie d’une mise en garde du bâton. **Réponse :** Garder et contester.

**Bâton de dégagement —** Revers du bâton à hauteur du gilet. **Réponse :** Reculer ou garder.

**Appui coupé —** Bâton abaissé sur la ligne des chevilles. **Réponse :** Garde basse ou saut.

**Position de sûreté —** Verrouille le bras et accompagne une chute latérale. **Réponse :** Déchoper ou sauter.

**Dose de contention —** Tire une seule fléchette physique. **Réponse :** S’accroupir sous la trajectoire haute ou garder.

**Compression rapide —** Fixe un pansement de compression sur son propre gilet. **Réponse :** Interrompre; aucun soin au-delà du plafond ou sans blessure grise.

**Dégagement de brancard —** Avance un pas en poussant le bâton horizontalement. **Réponse :** Garder ou faire échouer la portée.

**Retrait protégé —** Recule sans tourner le dos, prothèse au sol. **Réponse :** Poursuivre la récupération.

**Remplacement du bloc-dose —** Change la cartouche de doses avec un geste lisible. **Réponse :** Interrompre la recharge.

**Couloir sanitaire —** Contrôle du bâton, désarmement animé et frappe de fermeture. **Réponse :** Garder ou s’écarter; le super n’endort pas automatiquement.

#### Introduction — trois scènes

**vb_stillwell_intro_1** — Le terminal demande un numéro de contrat avant d’ouvrir le casier médical. Amir le saisit, puis photographie le message. Il sait déjà que personne ne croira qu’un refus de soin ait pris une forme si polie.

*Illustration à produire :* Amir devant une armoire médicale fermée, écran hors champ éclairant ses mains.

**vb_stillwell_intro_2** — Il remplit sa caisse avec des pièces que les chirurgiens peuvent monter sans autorisation distante. C’est plus lourd que le matériel neuf. Il accepte ce poids-là.

*Illustration à produire :* Caisse blanche ouverte, pièces mécaniques neutres et rouleaux de pansement.

**vb_stillwell_intro_3** — À la radio, il ne demande pas combien ils sont. Il demande combien peuvent encore marcher, et qui restera avec les autres.

*Illustration à produire :* Amir sur un quai couvert, radio à l’épaule et veste bleue humide.

#### Rivalité — PALE CURRENT

**Amir :** « Je dois savoir ce qui reste allumé si nous coupons le réseau. »

**Sora :** « Les fonctions vitales sont locales. Le verrou porte sur les modules externes. »

**Amir :** « Alors nous le prouvons appareil par appareil. Pas sur une promesse. »

#### Épilogue — trois scènes distinctes

**vb_stillwell_ending_1** — La coupure a lieu par secteurs. Amir compte les patients avant de compter les relais désactivés. Le dernier message est un nom prononcé à voix haute, pas un voyant vert.

*Illustration à produire :* Amir derrière une radio de campagne, lampes de secours chaudes.

**vb_stillwell_ending_2** — Le dispensaire ouvre avec des pièces hétéroclites. Les notices restent à côté des appareils. Personne ne devra découvrir une condition de service au milieu d’une panne.

*Illustration à produire :* Atelier médical clair, outils rangés et équipements réparables.

**vb_stillwell_ending_3** — Il rend la liste des dettes à ceux dont les noms y figurent. Il garde celle des rendez-vous. Celle-là peut encore servir à les attendre.

*Illustration à produire :* Amir fermant un carnet dans une salle de repos vide, mer au travers d’une fenêtre.

#### Trois neutralisations à produire

**Mise en sécurité —** Désarme puis place le vaincu en position stable. Humain : Vérifie la respiration après la chute. Machine : Coupe l’outil externe sans toucher au noyau vital.

**Accès libre —** Crochette l’arme au bâton et l’éloigne de la zone. Humain : Aucun dosage forcé après la victoire. Machine : Débranche le canon externe.

**Dernier contrôle —** Neutralise l’avant-bras par une clé courte et recule. Humain : Relâche dès que le combat s’arrête. Machine : Observe les voyants avant de relâcher.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Homme brun barbu; veste d’urgence bleu poussière sur armure graphite, coque médicale blanche au dos, prothèse visible au tibia gauche, bâton de secours pliant; pistolet tranquillisant au holster, aucun emblème de croix rouge. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_stillwell.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.8. ROOKGLASS — Anaïs Rault

**Identifiant :** `vb_rookglass`. **Âge :** 34 ans. **Rôle :** Leurres physiques et observation limitée.

Anaïs inspectait les caméras d’assurance du port. Elle a découvert que certaines images étaient exactes mais cadrées pour exclure les saisies. Ses réflecteurs ne fabriquent pas une vérité; ils forcent l’adversaire à regarder ailleurs assez longtemps pour qu’un témoin passe.

**Silhouette et équipement —** Cheveux noirs courts, visage découvert; petit poncho optique graphite avec panneaux géométriques gris pâle, réflecteurs pliables sur avant-bras et hanche; silhouette basse et nette, jamais transparente par défaut.

**Ressource —** OPTIQUE : type `energy`, maximum 100, régénération 0.13 par image après le délai du moteur. **Passif —** Trace visible : Observe uniquement une position visible passée. Une marque donne le bonus normal du moteur sur le prochain impact confirmé.

- Un seul leurre destructible.
- Aucune lecture des entrées ou de la trajectoire future.
- Pas d’invisibilité permanente ni double qui frappe à sa place.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Angle mort | melee | 6/3/13 | 300 | 78 | 0 / 0 |
| K — lourd | Revers de prisme | melee | 15/5/27 | 600 | 115 | 0 / 0 |
| Bas + J — bas | Trait de sol | melee | 12/4/24 | 380 | 108 | 0 / 0 |
| U — saisie | Sortie du cadre | melee | 8/2/34 | 680 | 71 | 0 / 0 |
| I — spécial | Reflet placé | trap | 29/1/26 | 290 | 76 | 28 / 0 |
| Bas + I | Récupération du prisme | recallTrap | 12/1/19 | 0 | 240 | 0 / 0 |
| Avant + I | Lecture oblique | melee | 18/5/30 | 570 | 128 | 18 / 0 |
| Arrière + I | Décadrage | mobility | 8/11/19 | 0 | 0 | 10 / 0 |
| L — utilitaire | Observation locale | observe | 24/1/29 | 0 | 360 | 20 / 0 |
| O — super | Dernier angle | trap | 39/1/38 | 1100 | 115 | 38 / 75 |

#### Lecture des techniques

**Angle mort —** Frappe courte du tranchant de la main. **Réponse :** Garder ou espacer.

**Revers de prisme —** Panneau replié utilisé comme protection du revers. **Réponse :** Interrompre ou punir le retour.

**Trait de sol —** Glisse un pied sur la ligne basse. **Réponse :** Garde basse ou saut.

**Sortie du cadre —** Prend le poignet et tourne derrière l’épaule visible. **Réponse :** Déchoper ou reculer.

**Reflet placé —** Place un petit leurre réfléchissant au sol. **Réponse :** Détruire, contourner ou sauter la zone armée.

**Récupération du prisme —** Ramène uniquement son leurre proche, sans détonation. **Réponse :** Profiter de la récupération; aucun remboursement de ressource.

**Lecture oblique —** Fente visible avec le panneau replié. **Réponse :** Garder ou sortir de l’axe.

**Décadrage —** Pas arrière de 66 pixels; le poncho reste visible. **Réponse :** Suivre le corps réel et punir.

**Observation locale —** Ouvre l’optique et suit un déplacement déjà visible. **Réponse :** Sortir du rayon, masquer la silhouette ou interrompre.

**Dernier angle —** Déploie un seul grand réflecteur bas, avec armement visible. **Réponse :** Sauter, sortir du rayon ou détruire le dispositif.

#### Introduction — trois scènes

**vb_rookglass_intro_1** — La caméra ne ment pas. Elle regarde le portail quand la saisie a lieu derrière. Anaïs a trente heures de preuves impeccables de ce que personne n’a voulu filmer.

*Illustration à produire :* Anaïs devant trois écrans montrant des quais vides, visage dans le reflet.

**vb_rookglass_intro_2** — Elle décroche les capteurs de son propre réseau. La MRU l’appelle une panne. Elle appelle cela choisir où commence son regard.

*Illustration à produire :* Anaïs sur une échelle de maintenance, câble de caméra débranché.

**vb_rookglass_intro_3** — Dans le port, elle ne promet pas de rendre les autres invisibles. « Je peux leur donner deux secondes. Ce que vous en faites sera à vous. »

*Illustration à produire :* Anaïs fermant un réflecteur près d’une porte entrouverte.

#### Rivalité — SWITCHBACK

**Anaïs :** « Si tu sors par là, je ne te verrai plus. »

**Leïla :** « C’est aussi le but. »

**Anaïs :** « Alors donne-moi un signe quand tu voudras qu’on te retrouve. »

#### Épilogue — trois scènes distinctes

**vb_rookglass_ending_1** — Les vidéos sortent avec des zones masquées, mais les originaux sont préservés. Anaïs refuse d’échanger la preuve d’une injustice contre l’adresse de ceux qui l’ont subie.

*Illustration à produire :* Anaïs éditant une copie sur une table de radio, disque original scellé à côté.

**vb_rookglass_ending_2** — Elle démonte les caméras inutiles et garde celles que les habitants choisissent d’installer. Le premier vote porte sur une porte, pas sur un visage.

*Illustration à produire :* Habitants adultes en silhouettes autour d’un plan de bâtiment, Anaïs écoutant.

**vb_rookglass_ending_3** — La dernière image de sa série montre le quai vide. Cette fois, il l’est parce que les gens ont pu partir.

*Illustration à produire :* Caméra posée au sol, quai réellement vide au lever du jour; Anaïs hors centre.

#### Trois neutralisations à produire

**Image arrêtée —** Leurre visible, décalage physique et clé de bras. Humain : Immobilise sans se rendre magique ou intangible. Machine : Verrouille un capteur externe.

**Hors champ —** Rabattement d’un réflecteur sur l’arme et projection courte. Humain : Termine en désarmement. Machine : Le panneau cache le voyant de visée, pas le corps.

**Négatif conservé —** Capture l’arme avec les deux panneaux puis l’ouvre. Humain : Conserve l’équipement comme preuve. Machine : Récupère la mémoire externe.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Cheveux noirs courts, visage découvert; petit poncho optique graphite avec panneaux géométriques gris pâle, réflecteurs pliables sur avant-bras et hanche; silhouette basse et nette, jamais transparente par défaut. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_rookglass.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.9. LOCKSTEP — Tomas Varga

**Identifiant :** `vb_lockstep`. **Âge :** 43 ans. **Rôle :** Contre-attaques sobres et garde.

Capitaine de sécurité de Nacre, Tomas a bâti sa réputation sur des évacuations ordonnées. Il suit la chaîne de commandement jusqu’au jour où elle lui demande d’empêcher une évacuation. Son ordre le plus difficile sera celui qu’il devra refuser.

**Silhouette et équipement —** Homme trapu, cheveux courts grisonnants; veste militaire ardoise, exosquelette asymétrique blanc et noir aux jambes, gants blindés; carabine compacte fermement sanglée dans le dos, garde de boxe carrée.

**Ressource —** ASSISTANCE : type `energy`, maximum 100, régénération 0.12 par image après le délai du moteur. **Passif —** Discipline locale : Garde solide hors pression et deux points de jauge supplémentaires sur parade réelle; aucune résistance permanente aux saisies.

- Pas de commande d’escouade qui frappe hors écran.
- Les contres échouent face aux saisies et aux attaques retardées.
- La carabine transportée reste sécurisée dans ce kit; les dix techniques privilégient le CQC et les jambières.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Ordre bref | melee | 7/3/14 | 340 | 84 | 0 / 0 |
| K — lourd | Réponse graduée | melee | 17/5/29 | 660 | 118 | 0 / 0 |
| Bas + J — bas | Barrage bas | melee | 14/4/25 | 420 | 110 | 0 / 0 |
| U — saisie | Contrôle de zone | melee | 9/2/36 | 740 | 75 | 0 / 0 |
| I — spécial | Garde d’arrêt | parry | 6/10/31 | 560 | 102 | 20 / 0 |
| Bas + I | Ancrage des jambières | buff | 25/1/28 | 0 | 0 | 28 / 0 |
| Avant + I | Franchissement | melee | 20/7/34 | 690 | 122 | 24 / 0 |
| Arrière + I | Repli de sécurité | mobility | 10/9/22 | 0 | 0 | 8 / 0 |
| L — utilitaire | Recalage des servos | recover | 34/1/27 | 0 | 0 | 0 / 0 |
| O — super | Ordre de retrait | melee | 31/6/46 | 1580 | 145 | 42 / 80 |

#### Lecture des techniques

**Ordre bref —** Direct en garde compacte. **Réponse :** Garder puis espacer.

**Réponse graduée —** Crochet lourd avec jambe arrière stabilisée. **Réponse :** Reculer ou interrompre.

**Barrage bas —** Balayage de la jambe assistée sans bond. **Réponse :** Garde basse ou saut.

**Contrôle de zone —** Saisie du haut du gilet puis pivot au sol. **Réponse :** Déchoper ou quitter la portée.

**Garde d’arrêt —** Bloque un coup avec ses avant-bras et riposte au contact. **Réponse :** Saisir, retarder ou tirer à distance.

**Ancrage des jambières —** Verrouille brièvement ses appuis. **Réponse :** Saisie ou attente; un seul contact absorbé.

**Franchissement —** Avance à pas assistés et frappe du genou. **Réponse :** Garder puis punir.

**Repli de sécurité —** Recule droit, garde haute. **Réponse :** Poursuivre le redressement.

**Recalage des servos —** Déverrouille puis recale les deux genoux. **Réponse :** Interrompre la longue séquence.

**Ordre de retrait —** Enchaînement animé de contrôle et coup de genou final, un impact de simulation. **Réponse :** Garder, reculer ou interrompre avant l’activation.

#### Introduction — trois scènes

**vb_lockstep_intro_1** — Tomas reçoit un ordre d’évacuation sans destination. Il demande où doivent aller les équipes une fois le quai vidé. La réponse est une nouvelle liste de personnes à retenir.

*Illustration à produire :* Tomas devant une carte portuaire et une radio de poste.

**vb_lockstep_intro_2** — Son supérieur lui rappelle que la discipline consiste à agir sans discuter chaque consigne. Tomas se souvient de la première leçon : savoir qui sera responsable quand elle aura été exécutée.

*Illustration à produire :* Tomas retirant son insigne de fonction et le posant près du micro.

**vb_lockstep_intro_3** — Il met son unité à l’abri puis retourne seul à la barrière. « Ce poste reste sous ma responsabilité. L’ordre, lui, s’arrête ici. »

*Illustration à produire :* Tomas seul au barrage du matin, jambes assistées et mains ouvertes.

#### Rivalité — LATCH

**Tomas :** « Tu sais ouvrir la porte. Tu sais aussi qui la franchira ? »

**Nora :** « Je sais qui tu empêches de sortir. »

**Tomas :** « Alors montre-les-moi. Et garde les armes baissées. »

#### Épilogue — trois scènes distinctes

**vb_lockstep_ending_1** — Tomas signe son refus d’ordre avant son rapport de victoire. Il demande que les soldats qui ont suivi l’évacuation puissent témoigner séparément de lui.

*Illustration à produire :* Tomas écrivant seul dans une guérite ouverte, jour calme.

**vb_lockstep_ending_2** — Le port lui propose de reprendre le poste. Il accepte de former la relève, à condition que chacun dispose d’un canal pour contester un ordre.

*Illustration à produire :* Tomas face à un petit groupe d’adultes en tenue de travail, tableau de communication.

**vb_lockstep_ending_3** — Quand la barrière se lève, il reste à côté du bouton manuel. Plus personne ne doit chercher un chef pour pouvoir l’arrêter.

*Illustration à produire :* Main de Tomas près d’un bouton mécanique, barrière relevée et mer au fond.

#### Trois neutralisations à produire

**Ordre suspendu —** Désarme, bloque les épaules puis fait reculer le vaincu. Humain : Le vaincu s’assoit sans coup supplémentaire. Machine : Le châssis s’agenouille.

**Contrôle terminé —** Projection courte et retrait immédiat des mains. Humain : Garde une distance sûre. Machine : Vérifie l’arrêt des moteurs externes.

**Ligne franchie —** Balayage d’appui puis saisie de l’arme au sol. Humain : Aucune exécution après victoire. Machine : Retire le module de tir.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Homme trapu, cheveux courts grisonnants; veste militaire ardoise, exosquelette asymétrique blanc et noir aux jambes, gants blindés; carabine compacte fermement sanglée dans le dos, garde de boxe carrée. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_lockstep.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

### 5.10. MORROW-6 — Elena Voss

**Identifiant :** `vb_morrow_6`. **Âge :** 37 ans. **Rôle :** Lame courte et riposte sans invincibilité.

Elena a choisi une conversion cyborg pour survivre à une mission. Son contrat de maintenance comporte désormais une option de reprise qu’elle n’a jamais vue. Le suffixe de son nom n’est pas un modèle militaire célèbre : c’est le numéro du sixième transfert de propriété du même dossier.

**Silhouette et équipement —** Cyborg adulte au visage humain conservé; cheveux sombres courts; blindage mat ivoire et brun sombre, articulations fonctionnelles, épaule renforcée asymétrique, bande de tissu olive à la taille; courte lame industrielle courbe HF, aucun design de Raiden.

**Ressource —** CELLULE : type `energy`, maximum 100, régénération 0.09 par image après le délai du moteur. **Passif —** Boucle d’effort : Un impact net de lame rend cinq points d’énergie; les coups gardés ne la rechargent pas. Aucun prélèvement de corps ou soin automatique.

- La lame n’annule pas automatiquement les balles.
- Aucune invulnérabilité ni démembrage requis pour le fonctionnement.
- Le profil ne possède ni Zandatsu ni Ripper Mode officiels.

| Commande | Technique | Type | P/A/R | Dégâts | Portée | Coût / jauge |
| --- | --- | --- | --- | --- | --- | --- |
| J — léger | Entaille de garde | melee | 6/3/14 | 330 | 90 | 0 / 0 |
| K — lourd | Coupe de traverse | melee | 16/5/29 | 680 | 138 | 0 / 0 |
| Bas + J — bas | Trait inférieur | melee | 13/4/25 | 420 | 122 | 0 / 0 |
| U — saisie | Droit de reprise | melee | 9/2/36 | 730 | 76 | 0 / 0 |
| I — spécial | Lame en travers | parry | 6/8/33 | 580 | 110 | 20 / 0 |
| Bas + I | Coupe de balise | melee | 20/5/33 | 580 | 130 | 24 / 0 |
| Avant + I | Fente de service | melee | 19/7/34 | 740 | 142 | 28 / 0 |
| Arrière + I | Repli articulé | mobility | 8/10/20 | 0 | 0 | 10 / 0 |
| L — utilitaire | Échange de cellule | recover | 35/1/28 | 0 | 0 | 0 / 0 |
| O — super | Corps libre | melee | 30/6/46 | 1650 | 158 | 48 / 80 |

#### Lecture des techniques

**Entaille de garde —** Court mouvement de lame devant le poignet, sans grand arc lumineux. **Réponse :** Garder ou espacer.

**Coupe de traverse —** Arc diagonal de lame avec arrêt visible. **Réponse :** Reculer ou interrompre.

**Trait inférieur —** Taille basse sur l’équipement des jambes. **Réponse :** Garde basse ou saut.

**Droit de reprise —** Range la pointe, saisit l’avant-bras et projette. **Réponse :** Déchoper ou sauter.

**Lame en travers —** Place la lame en opposition à un coup de contact. **Réponse :** Feinter, saisir ou employer un projectile.

**Coupe de balise —** Frappe basse destinée aux pièges et à l’armure, sans verrouillage automatique. **Réponse :** Sauter ou garder bas.

**Fente de service —** Avance de 21 pixels et taille d’un revers. **Réponse :** Garder puis punir le retrait.

**Repli articulé —** Deux pas arrière, pieds et épaules toujours visibles. **Réponse :** Poursuivre ou anticiper la fin.

**Échange de cellule —** Déverrouille une cellule de taille puis la remet en ligne. **Réponse :** Interrompre la séquence.

**Corps libre —** Coupe d’équipement en trois temps animés, un impact autoritaire du moteur. **Réponse :** Garder ou sortir de portée durant les 30 images.

#### Introduction — trois scènes

**vb_morrow_6_intro_1** — Elena a accepté un corps de combat, pas une seconde identité. À chaque rachat de son contrat, le nom de la propriétaire change; seul le numéro de série reste certain.

*Illustration à produire :* Elena devant un miroir d’atelier, plusieurs anciennes plaques de service sur l’établi.

**vb_morrow_6_intro_2** — Le prochain contrôle de maintenance exige qu’elle entre désarmée dans une cabine sans poignée intérieure. Elle ne franchit pas la ligne jaune.

*Illustration à produire :* Elena sur le seuil d’une cabine technique, lame encore au fourreau.

**vb_morrow_6_intro_3** — À la radio, elle donne son nom entier. « Vous pouvez effacer le numéro quand vous voulez. Moi, je ne bouge plus sans réponse. »

*Illustration à produire :* Visage humain d’Elena éclairé par la radio, port sombre derrière.

#### Rivalité — ROOKGLASS

**Anaïs :** « Ton dossier pourrait prouver ce qu’ils ont fait. »

**Elena :** « Il pourrait aussi leur dire où je serai demain. »

**Anaïs :** « Alors tu décideras ce qui sort. Et ce qui reste à toi. »

#### Épilogue — trois scènes distinctes

**vb_morrow_6_ending_1** — Elena lit elle-même la procédure de retrait du verrou. Sora reste assez près pour répondre, assez loin pour ne pas toucher sans qu’elle le demande.

*Illustration à produire :* Elena tenant l’outil de maintenance, Sora flou à distance; cadrage calme.

**vb_morrow_6_ending_2** — Les preuves publiques montrent les signatures et les transferts. Son adresse et ses données médicales n’y figurent pas. La vérité n’exige pas qu’elle se rende disponible à tous.

*Illustration à produire :* Elena fermant deux dossiers distincts, le scellé médical restant près d’elle.

**vb_morrow_6_ending_3** — Sur la route hors du port, un contrôleur lui demande un modèle. Elle répond « Elena ». Cette fois, il lui demande où elle veut aller.

*Illustration à produire :* Elena marchant sans posture de combat vers une route littorale au matin.

#### Trois neutralisations à produire

**Clause rompue —** Sectionne uniquement les attaches de l’arme et la laisse tomber. Humain : La lame évite les tissus humains. Machine : Coupe un module externe remplaçable.

**Numéro effacé —** Déclipse la balise de service, la coupe et se retourne. Humain : La balise appartient à l’équipement. Machine : Le noyau du cyborg reste protégé.

**Corps préservé —** Pare l’arme, renverse l’adversaire puis range la lame. Humain : S’arrête dès l’immobilisation. Machine : Maintient le châssis stable.

#### Costumes originaux

| Tenue | Brief | État de l’illustration |
| --- | --- | --- |
| Tenue de service | Cyborg adulte au visage humain conservé; cheveux sombres courts; blindage mat ivoire et brun sombre, articulations fonctionnelles, épaule renforcée asymétrique, bande de tissu olive à la taille; courte lame industrielle courbe HF, aucun design de Raiden. | missing |
| Extraction de Nacre | Même silhouette et équipement fonctionnel, veste de pluie gris bleu additionnelle, traces de sel et rubans de repérage orange; aucune modification anatomique. | missing |
| Après le contrat | Version civile de maintenance : équipement allégé et vêtements de travail personnels; conserver le visage, les prothèses et les protections nécessaires aux animations de combat. | missing |

Assets associés : `originals/veilbreak/assets/fighters/vb_morrow_6.png` pour la pose de base. Marches, garde, saut, impacts, dix techniques, provocations et victoires nécessitent chacun leurs animations; les six scènes narratives conservent six images propres.

## 6. Les vingt stages et leur usage

| # | Acte | Stage | Approche | Boss |
| --- | --- | --- | --- | --- |
| 1 | 1 | Nacre — chaussée des douanes | Patrouilleur de quai | GATEKEEPER VEY |
| 2 | 1 | Portique des conteneurs scellés | Agent de saisie à bouclier | STILT-04 |
| 3 | 1 | Bassin de récupération 4 | Tireur de recouvrement | DEADWEIGHT OREN |
| 4 | 1 | Terminal du dernier ferry | Grenadier de cordon | CHOIR MARSHAL |
| 5 | 1 | Prise du câble sous-marin | Sapeur de câbles | UMBRA-R1 |
| 6 | 2 | Atelier des corps sous contrat | Technicien de brouillage | DR SUTURE |
| 7 | 2 | Dessalement — salle des membranes | Briseur de porte à contact | CINDER PUMP |
| 8 | 2 | Faisceau ferroviaire des saisies | Poursuiveur à attelles | RAIL WARDEN |
| 9 | 2 | Fonderie des coques céramiques | Tailleur de maintenance | KILN SAINT |
| 10 | 2 | Soufflerie des prototypes | Observateur d’audit | AERIE-09 |
| 11 | 3 | Ascenseur de fret — puits central | Porteur assisté | COUNTERWEIGHT |
| 12 | 3 | Archive hors réseau | Récupérateur blindé | THE NOTARY |
| 13 | 3 | Soute frigorifique des implants | Trépied remorqueur | RIME CASK |
| 14 | 3 | Station sol — antennes mortes | Rampeur d’inspection | PHASE CLERK |
| 15 | 3 | Forme sèche du complexe K8 | Lentille volante | DRYDOCK GOLIATH |
| 16 | 4 | Toit de la radio libre | Chenillette de barrage | ASH RECEIVER |
| 17 | 4 | Pont des relais de maintenance | Sonde de déminage | SPANBREAKER |
| 18 | 4 | Chambre des liaisons physiques | Drone d’arrimage | SWITCH QUEEN |
| 19 | 4 | Piste d’évacuation 06 | Sentinelle de guichet | BELLWETHER VT-6 |
| 20 | 4 | Barge VEIL — pont ouvert | Convoyeur de contrôle | CUSTODIAN K8 |

### 6.1. Nacre — chaussée des douanes

**ID :** `vb_stage_customs_causeway`. **Acte :** 1.

Chaussée maritime et guérites au lever du jour; béton humide, barrières relevées en fond, marquages ambre et grues lointaines. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Le passage des individus devient celui de leurs équipements.

**Objectif —** Intercepter le responsable du barrage et préserver le registre de saisie.

**Compétitif —** Barrières et feux restent visuels en versus; la fermeture ne bloque que les événements de campagne.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_customs_causeway.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.2. Portique des conteneurs scellés

**ID :** `vb_stage_container_gantry`. **Acte :** 1.

Portique d’inspection sur quai plat, conteneurs rouille et olive, scanner en arrière, cadre de levage suspendu et brume marine. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Les codes de douane suivent les corps comme des cargaisons.

**Objectif —** Détacher le portique de sa commande avant l’arrivée de la relève.

**Compétitif —** Un spreader descend en arrière-plan; jamais de dommage aléatoire en versus.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_container_gantry.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.3. Bassin de récupération 4

**ID :** `vb_stage_salvage_basin`. **Acte :** 1.

Quai de renflouage sec au crépuscule; bassin en retrait, coques militaires démantelées, tours de treuil et lumières jaunes usées. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Les épaves de guerre gardent davantage de valeur comptable que leurs équipes.

**Objectif —** Retrouver le ferry classé comme perte totale.

**Compétitif —** Remous et balancier de chaîne restent derrière la voie de combat.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_salvage_basin.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.4. Terminal du dernier ferry

**ID :** `vb_stage_ferry_terminal`. **Acte :** 1.

Terminal de ferry évacué sous la pluie; large embarcadère couvert, sièges vides, rampe relevée et fenêtres chaudes au loin. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Le terminal a été vidé des passagers, puis fermé sur les agents qui les accompagnaient.

**Objectif —** Ouvrir un couloir d’évacuation et conserver une radio.

**Compétitif —** La pluie ne modifie ni collision ni friction compétitive.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_ferry_terminal.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.5. Prise du câble sous-marin

**ID :** `vb_stage_cable_intake`. **Acte :** 1.

Chambre côtière de câble sous-marin; passerelle grillagée plane, conduites scellées, eau sombre derrière les vitres et lampes vert pâle. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Une infrastructure banale transporte des ordres sur les corps.

**Objectif —** Identifier le câble local de maintenance sans couper les communications civiles.

**Compétitif —** Pulses des lampes et reflets seulement en versus.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_cable_intake.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.6. Atelier des corps sous contrat

**ID :** `vb_stage_prosthetic_ward`. **Acte :** 2.

Atelier de prothèses sans patients; fauteuils vides en alcôves, coques céramiques derrière vitrage, armoires olive et lumière blanche. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** L’atelier soigne et saisit avec les mêmes outils.

**Objectif —** Récupérer les procédures de retrait des verrous.

**Compétitif —** Les fauteuils restent hors du plan de combat et ne contiennent aucun patient.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_prosthetic_ward.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.7. Dessalement — salle des membranes

**ID :** `vb_stage_desalination`. **Acte :** 2.

Usine de dessalement nocturne; cylindres de filtration, tuyaux isolés, réservoirs bleu-vert, service ambre et sol sec lisible. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** La même pompe alimente les logements et les bancs d’essai militaires.

**Objectif —** Isoler le circuit du boss en laissant la desserte civile intacte.

**Compétitif —** Jets de vapeur de fond seulement; jets hostiles exclusifs au boss et télégraphiés.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_desalination.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.8. Faisceau ferroviaire des saisies

**ID :** `vb_stage_marshalling_yard`. **Acte :** 2.

Plateforme de maintenance ferroviaire; voies parallèles derrière la zone de combat, wagons blindés, signaux rouges et tunnel lointain. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Un convoi de prothèses prend la route inverse de leurs propriétaires.

**Objectif —** Arrêter le wagon de confiscation.

**Compétitif —** Trains seulement sur la voie arrière; aucun écrasement aléatoire.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_marshalling_yard.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.9. Fonderie des coques céramiques

**ID :** `vb_stage_ceramic_kiln`. **Acte :** 2.

Fonderie céramique; fours orange fermés en arrière, moules suspendus, manipulateurs arrêtés, structure graphite et sol plat sans lave. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Les nouvelles coques cachent les mêmes vieux contrats.

**Objectif —** Sauver les moules et détruire seulement les serrures propriétaires.

**Compétitif —** Éclairage des fours sans surface de sol brûlante.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_ceramic_kiln.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.10. Soufflerie des prototypes

**ID :** `vb_stage_wind_tunnel`. **Acte :** 2.

Soufflerie avec grand ventilateur au fond; plateau de maintenance plat, câbles de retenue, ailes d’essai repliées et lumière ivoire. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** La démonstration commerciale a supprimé les limites des fiches d’essai.

**Objectif —** Extraire les essais originaux et mettre le drone au repos.

**Compétitif —** Vent visuel; pas de déplacement automatique du joueur.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_wind_tunnel.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.11. Ascenseur de fret — puits central

**ID :** `vb_stage_service_lift`. **Acte :** 3.

Grand ascenseur industriel; plateforme intacte, guides en béton, contrepoids sombres et lumières rouges dans le puits. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** L’ascenseur relie le service médical à une zone que les plans ne montrent pas.

**Objectif —** Atteindre l’archive physique.

**Compétitif —** Les parois bougent en parallaxe; le plateau de simulation reste fixe.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_service_lift.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.12. Archive hors réseau

**ID :** `vb_stage_paper_archive`. **Acte :** 3.

Archive papier souterraine; étagères derrière grillage, lampes ambre, terminaux débranchés et vaste sol de linoléum. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Le papier conserve ce que les bases de données peuvent réécrire.

**Objectif —** Prendre les originaux signés et maintenir une voie de sortie.

**Compétitif —** Étagères derrière la collision; absence de destruction qui bloquerait la sortie.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_paper_archive.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.13. Soute frigorifique des implants

**ID :** `vb_stage_cold_hold`. **Acte :** 3.

Soute frigorifique; sol sec antidérapant, conteneurs de maintenance opaques, givre aux seules valves et lampes froides. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Le froid préserve des pièces, pas les conditions sous lesquelles on les confisque.

**Objectif —** Récupérer les cellules avant le départ du transport frigorifique.

**Compétitif —** Givre uniquement décoratif en versus; aucun sol glissant implicite.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_cold_hold.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.14. Station sol — antennes mortes

**ID :** `vb_stage_ground_station`. **Acte :** 3.

Terrasse technique de station satellite; paraboles derrière muret bas, chemins de câbles, armoires et ciel violet avant l’aube. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Une antenne qui se tait ne rend pas automatiquement les autres libres.

**Objectif —** Distinguer les liaisons civiles de celles du programme.

**Compétitif —** Mouvement lent des paraboles sans variation de hitbox.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_ground_station.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.15. Forme sèche du complexe K8

**ID :** `vb_stage_dry_dock`. **Acte :** 3.

Forme sèche profonde derrière la voie; plateforme marcheuse en chantier lointaine, grues, échafaudages et lumière blanche dans la brume. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** K8 est un outil de récupération conçu pour rendre toute résistance trop coûteuse.

**Objectif —** Démonter ses alimentations de quai.

**Compétitif —** Échelle géante en fond; la collision du boss est définie séparément.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_dry_dock.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.16. Toit de la radio libre

**ID :** `vb_stage_radio_roof`. **Acte :** 4.

Grand toit plat de radio; antennes pratiques, armoire d’émission protégée, parapet bas et horizon portuaire corail. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Un message ne protège que si ses destinataires peuvent le recevoir sans être repérés.

**Objectif —** Émettre des copies expurgées et garder les originaux hors ligne.

**Compétitif —** Antennes de fond; aucune émission qui révèle la position future du joueur.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_radio_roof.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.17. Pont des relais de maintenance

**ID :** `vb_stage_relay_bridge`. **Acte :** 4.

Pont utilitaire intact sur chenal brumeux; charpente acier, câbles et armoires derrière la voie, barge lointaine sous l’orage. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Le réseau possède un point de rupture physique.

**Objectif —** Tenir le pont pendant la coupure sectorielle.

**Compétitif —** Pont intact en versus; aucun événement ne retire le sol de combat.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_relay_bridge.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.18. Chambre des liaisons physiques

**ID :** `vb_stage_switchhouse`. **Acte :** 4.

Salle de commutation câblée; gros faisceaux cuivre et noir, rangées de relais, cabine vitrée distante et lampes vert discret. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Les boutons sont locaux, mais les responsabilités ont été dispersées.

**Objectif —** Couper les verrous externes avec validation appareil par appareil.

**Compétitif —** Voyants et relais animent le fond sans effets sur les contrôles du joueur.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_switchhouse.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.19. Piste d’évacuation 06

**ID :** `vb_stage_evac_runway`. **Acte :** 4.

Aire de service aéroportuaire côtière; piste derrière la zone, transport militaire lointain, balises basses et reflet ambre sur béton mouillé. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Les preuves doivent sortir avant les propriétaires du registre.

**Objectif —** Protéger le départ des témoins et du matériel médical.

**Compétitif —** Aéronefs éloignés en versus; seules les attaques annoncées du boss touchent.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_evac_runway.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

### 6.20. Barge VEIL — pont ouvert

**ID :** `vb_stage_command_barge`. **Acte :** 4.

Large pont plat de barge à l’aube; ombilicaux sécurisés, conteneurs serveurs ouverts en fond, stabilisateurs et port qui s’éloigne. Caméra latérale de jeu de combat 2D, sol continu entièrement lisible, aucun personnage, aucune interface ni texte; détails militaires crédibles.

**Fonction narrative —** Le système final garde des chiffres là où il ne voit plus de soldats.

**Objectif —** Arrêter K8 et diffuser les clés de maintenance ouvertes.

**Compétitif —** Mer et barge stables pour la simulation; oscillation visuelle légère uniquement.

**Production —** composite `originals/veilbreak/assets/stages/vb_stage_command_barge.png`; cinq couches indépendantes restent prévues. Sol de référence : x=65 à x=1215, y=568 dans un canevas 1280×720.

## 7. Les vingt types d’ennemis

Les ennemis possèdent chacun les dix slots de combat dans le JSON. Ce tableau souligne leurs différences utiles, leurs limites et les réponses à apprendre. Ils apparaissent comme adversaires; ils ne gonflent pas le nombre de dix combattants originaux jouables.

Ces vingt entrées désignent des archétypes d’unités. Elles ne reçoivent ni nom civil individuel ni âge arbitraire; les deux champs restent nuls dans les données.

| ID | Type | Mécanique | Réponse |
| --- | --- | --- | --- |
| vb_enemy_quay_patrol | Patrouilleur de quai | rifle_burst | Espacer la crosse, garder les deux tirs, approcher pendant la recharge. |
| vb_enemy_lockshield | Agent de saisie à bouclier | single_projectile_barrier | Saisir ou attendre l’écran; punir la poussée après garde. |
| vb_enemy_precision_collector | Tireur de recouvrement | stationary_precision | Briser la visée stable et avancer pendant le rechargement. |
| vb_enemy_cordon_grenadier | Grenadier de cordon | fused_arc | Se déplacer après le lancer et frapper pendant la recharge de quatre coups. |
| vb_enemy_cable_rigger | Sapeur de câbles | single_floor_snare | Sauter ou détruire la pince; approcher du côté libre du câble. |
| vb_enemy_chaff_technician | Technicien de brouillage | visible_signal_marker | Détruire le relais et éviter le palet physique; aucune lecture des commandes. |
| vb_enemy_shock_breacher | Briseur de porte à contact | contact_shock | Garder le contact puis punir; l’armure ne résiste pas aux saisies. |
| vb_enemy_sprung_runner | Poursuiveur à attelles | short_physical_dash | Garder le dash puis punir la réception; aucune invincibilité. |
| vb_enemy_cold_cutter | Tailleur de maintenance | short_blade_pressure | Attendre la lame courte puis punir; la parade ne couvre pas les tirs. |
| vb_enemy_audit_spotter | Observateur d’audit | visible_trace | Rompre la ligne visuelle et presser pendant l’observation. |
| vb_enemy_prosthetic_heavy | Porteur assisté | one_hit_armor | Saisir l’appui ou punir la lente charge; ne pas échanger un coup contre l’armure. |
| vb_enemy_field_reclaimer | Récupérateur blindé | gray_repair_budget | Garder la pince et interrompre la réparation; elle ne régénère pas la vie perdue définitivement. |
| vb_enemy_tripod_tug | Trépied remorqueur | clamp_lunge | Frapper le retour de la pince et éviter son angle avant. |
| vb_enemy_ceiling_crawler | Rampeur d’inspection | low_contact | Employer des attaques basses contre le petit châssis, puis punir le déplacement. |
| vb_enemy_hover_lens | Lentille volante | short_mark_projectile | Détruire la balise, attendre le passage bas du drone et frapper. |
| vb_enemy_tracked_shield | Chenillette de barrage | shield_push | Éviter la charge et attendre l’ouverture du capot. |
| vb_enemy_countermine_beetle | Sonde de déminage | small_fused_charge | Éviter la petite charge puis frapper pendant le remplacement. |
| vb_enemy_harpoon_drone | Drone d’arrimage | wire_slow_projectile | Sauter ou détruire le grapnel puis approcher le flanc. |
| vb_enemy_fixed_sentry | Sentinelle de guichet | short_stationary_burst | Se baisser sous les tirs et frapper pendant la recharge. |
| vb_enemy_courier_scanner | Convoyeur de contrôle | scanner_mark_and_ram | Interrompre le scan et garder la poussée; son coffre n’est pas un bouclier universel. |

### Patrouilleur de quai

Agent de quai qui confond la vérification d’un équipement et celle de son propriétaire.

**Visuel —** One original military logistics guard, full-body side three-quarter 2D fighting idle sprite facing right, transparent background. Adult human, worn olive work-combat fatigues, short navy armored vest, open-face industrial helmet, compact conventional carbine low ready, reinforced boots, amber service tag with no readable writing. Practical 2016 near-future private security, detailed painterly raster, no scene, no text, no duplicate view.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Rafale de contrôle | projectile | 22/1/30 | Garder, esquiver la ligne ou interrompre la préparation. |
| Crosse en barrage | parry | 7/9/32 | Feinter, saisir ou tirer; aucune parade automatique. |
| Avancée de crosse | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Nacre — chaussée des douanes. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Agent de saisie à bouclier

Sécurité de recouvrement entraînée à immobiliser un adulte sans endommager le matériel réclamé.

**Visuel —** One original adult riot security agent, full body facing right in a grounded 2D guard stance, transparent. Short asymmetrical rectangular dark graphite ballistic shield on left arm with narrow vision slot, reinforced grey knee armor, burgundy cloth shoulder tab, compact baton in right hand, exposed lower face. Industrial military realism, no police badge, no text, no giant sci-fi fantasy shield, no other objects floating.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Bord du bouclier | melee | 20/5/31 | Garder, espacer et punir le retour. |
| Plaque de saisie | buff | 25/1/27 | Saisir, attendre ou employer une explosion; un seul projectile compatible arrêté. |
| Poussée de cordon | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Portique des conteneurs scellés. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Tireur de recouvrement

Spécialiste de tir payé pour immobiliser les convois; sa méthode néglige ceux qui se trouvent dans les cabines.

**Visuel —** One original adult marksman, full body side-three-quarter facing right, transparent. Long slim grey-green rain cape ending above knees, faded tan chest rig, low-profile head-mounted amber monocular, ordinary long precision rifle held lowered across body, no ghillie camouflage hiding silhouette, no mask over face. Grounded near-future military logistics, painted 2D fighter sprite, no background or lettering.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Tir d’arrêt | projectile | 29/1/38 | Garder, esquiver la ligne ou interrompre la préparation. |
| Bipied de couverture | buff | 25/1/27 | Saisir, attendre ou employer une explosion; un seul projectile compatible arrêté. |
| Crosse de distance | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Bassin de récupération 4. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Grenadier de cordon

Les grenades servent à fermer une sortie, pas à prendre une position.

**Visuel —** One original adult security grenadier, full body 2D combat idle facing right, transparent. Broad navy padded vest with three clearly separate sealed smoke canister pouches, short olive trousers and reinforced boots, industrial half-face respirator, compact single-shot launcher held safely low. Orange maintenance stripe, realistic restrained equipment, no explosion, no scene, no text.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Grenade de barrage | projectile | 26/1/36 | Garder, esquiver la ligne ou interrompre la préparation. |
| Crosse de lanceur | melee | 20/5/31 | Garder, espacer et punir le retour. |
| Écartement brutal | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Terminal du dernier ferry. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Sapeur de câbles

Ancien monteur de quais détournant des pinces de travail pour bloquer les issues.

**Visuel —** One original adult military cable rigger, full-body side-three-quarter fighter sprite facing right, transparent. Rust-orange harness over charcoal coveralls, two secured cable reels at belt, thick insulated gloves, small low-profile ground clamp held in one hand, hand tool in other, protective open-face work helmet. Compact low stance, worn practical industrial materials, no loose floating cable pile, no text.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Pince d’arrimage | trap | 29/1/27 | Interrompre la pose, sauter ou détruire le dispositif avant déclenchement. |
| Outil en butée | parry | 7/9/32 | Feinter, saisir ou tirer; aucune parade automatique. |
| Crochet de câble | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Prise du câble sous-marin. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Technicien de brouillage

Interrompt les signaux d’identification de proximité; ne peut pas désactiver tous les implants.

**Visuel —** One original adult jamming technician, full body 2D facing right, transparent. Sage-grey technician suit, squared compact backpack with two folding stub antennas, off-white forearm guards, handheld small chaff canister, exposed face and headset, dark boots, cautious asymmetric stance. No magical field or hologram, detailed practical military mechanics, no background or text.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Palet de brouillage | projectile | 25/1/32 | Garder, esquiver la ligne ou interrompre la préparation. |
| Relais local | trap | 29/1/27 | Interrompre la pose, sauter ou détruire le dispositif avant déclenchement. |
| Batterie de contact | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Atelier des corps sous contrat. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Briseur de porte à contact

Une équipe d’effraction qui n’a plus de portes à ouvrir et en crée chez ceux qu’elle vient saisir.

**Visuel —** One original adult security breacher in full-body 2D side-three-quarter guard facing right, transparent. Dark charcoal bomb-resistant torso vest, pale ceramic forearm panels, short insulated contact ram held horizontally at waist, visible battery housing on back, heavy blue-grey boots, open face with simple ear protection. No constant lightning, no fantasy weapon, no scene or letters.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Ram de contact | melee | 20/5/31 | Garder, espacer et punir le retour. |
| Appui de brèche | buff | 26/1/28 | Saisies et électricité contournent la protection; attendre son expiration. |
| Poussée du ram | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Dessalement — salle des membranes. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Poursuiveur à attelles

Agent léger conçu pour rattraper les véhicules lents des quais, pas pour combattre durablement.

**Visuel —** One original adult pursuit runner, full-body 2D fighting pose facing right, transparent. Lightweight grey uniform with muted red shoulder panels, compact mechanical spring braces outside both calves, short non-bladed restraint baton, unobstructed face with close-cut hair, slim compact silhouette. Feet grounded, no rocket exhaust, no speed trail, realistic near-future military equipment, no text or background.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Genou assisté | melee | 17/6/29 | Garder, espacer et punir le retour. |
| Bâton en retour | parry | 7/9/32 | Feinter, saisir ou tirer; aucune parade automatique. |
| Talonnade de poursuite | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Faisceau ferroviaire des saisies. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Tailleur de maintenance

Une prothèse de travail et un outil de découpe suffisent à transformer un technicien armé en menace.

**Visuel —** One original adult cyborg maintenance duelist, full-body side-three-quarter 2D facing right, transparent. Partial matte off-white arm plating over navy work suit, functional fingers and elbow joints, protective collar, short industrial high-frequency cutting tool with squared curved tip, exposed human face under cropped dark hair. No Raiden likeness, no long katana, no glow aura, no text or scene.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Coupe de scellé | melee | 20/5/31 | Garder, espacer et punir le retour. |
| Lame de service | parry | 7/9/32 | Feinter, saisir ou tirer; aucune parade automatique. |
| Fente du tailleur | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Fonderie des coques céramiques. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Observateur d’audit

Observe des scènes réelles puis les résume au bénéfice du payeur; ses instruments ne prédisent pas l’avenir.

**Visuel —** One original adult field observer, full-body 2D facing right, transparent. Olive-grey waist-length observer coat, dark chest harness, paired binocular optic folded on brow, paper map pouch, compact pistol held low, distinct small backpack sensor mast folded down. Exposed weathered face, balanced guarded pose, practical 2016 military realism, no hologram, no lettering or scene.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Tir de repère | projectile | 23/1/32 | Garder, esquiver la ligne ou interrompre la préparation. |
| Relevé visuel | observe | 25/1/29 | Masquer la silhouette, sortir du rayon ou interrompre. |
| Repoussement du dossier | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Soufflerie des prototypes. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Porteur assisté

Une prothèse de transport déclassée lui donne une force temporaire au prix d’un refroidissement lent.

**Visuel —** One original heavy adult security operator, full-body 2D fighting idle facing right, transparent. Thick industrial graphite leg exoskeleton with ivory knee housings, olive ballistic vest, oversized mechanical left forearm but human right arm, blunt cargo-handling fist tool, broad torso, exposed face and close hair. No giant shoulder guns, no fantasy spikes, worn functional joints, no text or scene.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Poing de manutention | melee | 23/6/36 | Garder, espacer et punir le retour. |
| Stabilisation du porteur | buff | 26/1/28 | Saisies et électricité contournent la protection; attendre son expiration. |
| Charge de quai | melee | 25/8/38 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Ascenseur de fret — puits central. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Récupérateur blindé

Spécialiste de récupération d’équipement armé; il n’est pas un soignant civil ni une cible médicale.

**Visuel —** One original armored equipment recovery specialist, adult, full-body 2D side view facing right, transparent. Dust-blue work jacket beneath compact grey plate armor, white hard-shell equipment box on back with no medical emblem, insulated gripping tool in both hands, two external prosthetic servicing sockets, dark trousers and boots, cautious midrange guard. No civilian patient, no gore, no readable signs.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Pince de récupération | melee | 20/5/31 | Garder, espacer et punir le retour. |
| Réparation du harnais | heal | 42/1/31 | Interrompre; budget de 400 par round. |
| Écartement de caisse | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Archive hors réseau. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Trépied remorqueur

Petit UG de remorque converti à la contention des véhicules légers.

**Visuel —** One original small unmanned military cargo robot, whole single machine side-three-quarter facing right, transparent. Three squat articulated industrial legs, low trapezoid olive body, one small amber optical sensor, front blunt towing clamp, visible hydraulic hoses, compact graphite battery pack. Practical functional drone about human-waist height, no animal face or humanoid head, painted 2D sprite, no text or scene.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Pince de remorque | melee | 22/5/33 | Garder, espacer et punir le retour. |
| Verrou de patin | buff | 26/1/28 | Saisies et électricité contournent la protection; attendre son expiration. |
| Traction courte | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Soute frigorifique des implants. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Rampeur d’inspection

Robot de structure que les scripts de sécurité utilisent comme capteur mobile et obstacle.

**Visuel —** One original unmanned inspection crawler, whole machine 2D side-three-quarter facing right, transparent. Four compact angular gripping legs, thin horizontal charcoal body, pale grey protective panels, two camera lenses and a short tool probe, rubber magnetic pads on feet, restrained red status point. About knee-high, no biological insect texture, no magic, no environment or writing.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Sonde basse | melee | 15/5/27 | Garder, espacer et punir le retour. |
| Pointe d’inspection | trap | 29/1/27 | Interrompre la pose, sauter ou détruire le dispositif avant déclenchement. |
| Rampe rapide | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Station sol — antennes mortes. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Lentille volante

Un capteur volant transporte une balise adhésive, sans arme lourde ou autonomie supérieure annoncée.

**Visuel —** One original compact surveillance rotor drone, entire single unit 2D side-three-quarter facing right, transparent. Two protected ducted rotors attached to a squat ivory central camera pod, small downward antenna, amber camera glass, dark internal blades, no weapon larger than the drone, practical 2016 military design. Isolated clean silhouette, no motion blur, no light beam, no background or text.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Balise optique | projectile | 24/1/32 | Garder, esquiver la ligne ou interrompre la préparation. |
| Capot optique | buff | 25/1/27 | Saisir, attendre ou employer une explosion; un seul projectile compatible arrêté. |
| Heurt de protection | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Forme sèche du complexe K8. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Chenillette de barrage

Barricade roulante qui transforme une voie de passage en poste de contrôle.

**Visuel —** One original unmanned miniature tracked barricade robot, entire machine 2D side-three-quarter facing right, transparent. Low slate twin-track chassis, short hinged olive ballistic plate upright at front, narrow amber sensor above plate, visible rear battery housing, small concealed port at side. Human knee-to-waist height, realistic steel and rubber, no tank turret, no scene, no text.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Lame de barrage | melee | 23/6/34 | Garder, espacer et punir le retour. |
| Plaque levée | buff | 25/1/27 | Saisir, attendre ou employer une explosion; un seul projectile compatible arrêté. |
| Avancée de chenille | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Toit de la radio libre. **Contrôleur —** Déplacements limités à la géométrie du duel; saut désactivé pour le contrôleur.

### Sonde de déminage

Robot de déminage de surplus utilisant ses charges de travail pour barrer un couloir.

**Visuel —** One original unmanned counter-mine robot, entire unit 2D side-three-quarter facing right, transparent. Squat flattened yellow-grey body on four short articulated legs, front articulated probing arm folded close, small black sensor head on short mast, rear canister cradle, utilitarian scarred plates. No organic beetle anatomy, no fantasy limbs, no environment, no writing.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Charge d’ouverture | projectile | 27/1/35 | Garder, esquiver la ligne ou interrompre la préparation. |
| Carapace de service | buff | 26/1/28 | Saisies et électricité contournent la protection; attendre son expiration. |
| Pointe de test | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Pont des relais de maintenance. **Contrôleur —** Déplacements limités à la géométrie du duel; saut permis.

### Drone d’arrimage

Une machine d’amarrage; son câble ralentit, mais ne téléporte pas la cible vers elle.

**Visuel —** One original unmanned mooring-security drone, entire robot 2D side-three-quarter facing right, transparent. Compact dark olive four-wheel chassis, central single cable-grapnel launcher angled slightly down, exposed secured reel at rear, two short stabilizer feet, one amber camera. Practical docking equipment weaponized, no active projectile, no loose cable outside frame, no text or scene.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Hameçon de quai | projectile | 25/1/34 | Garder, esquiver la ligne ou interrompre la préparation. |
| Patins d’arrimage | buff | 26/1/28 | Saisies et électricité contournent la protection; attendre son expiration. |
| Pare-chocs de prise | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Chambre des liaisons physiques. **Contrôleur —** Déplacements limités à la géométrie du duel; saut désactivé pour le contrôleur.

### Sentinelle de guichet

Tourelle sur embase conçue pour garder une ligne; toute mobilité du moteur doit être neutralisée par son contrôleur dédié.

**Visuel —** One original unmanned fixed security turret, whole single machine side-three-quarter facing right, transparent. Low three-foot heavy mounting base, angular off-white armored sensor hood, small conventional gun barrel with obvious pivot mount, graphite magazine box at rear, amber recessed camera, scratched industrial surfaces. No wall or environment, no text, no laser beam, clean painted 2D sprite.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Rafale de guichet | projectile | 28/1/36 | Garder, esquiver la ligne ou interrompre la préparation. |
| Capot pare-balles | buff | 25/1/27 | Saisir, attendre ou employer une explosion; un seul projectile compatible arrêté. |
| Butée de canon | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Piste d’évacuation 06. **Contrôleur —** Embase fixe : interdire la marche, le saut et le dash; une vitesse réduite est insuffisante.

### Convoyeur de contrôle

Convoyeur de preuves transformé en petit poste d’inspection mobile.

**Visuel —** One original unmanned compact inspection carrier, entire unit 2D side-three-quarter facing right, transparent. Four medium rubber wheels, rectangular olive cargo chassis carrying an upright narrow scanner arch, short front shock bumper, amber optical lenses on arch, closed dark rear evidence box, mechanical suspension visible. Distinct from a tank, no person inside, no text or background.

| Technique distinctive | Type | P/A/R | Effet / paramètre |
| --- | --- | --- | --- |
| Balise de contrôle | projectile | 24/1/32 | Garder, esquiver la ligne ou interrompre la préparation. |
| Capot du coffre | buff | 26/1/28 | Saisies et électricité contournent la protection; attendre son expiration. |
| Poussée du portique | melee | 20/5/31 | Garder, espacer et punir le retour. |

**Stage d’introduction —** Barge VEIL — pont ouvert. **Contrôleur —** Déplacements limités à la géométrie du duel; saut désactivé pour le contrôleur.

## 8. Les vingt boss

Chaque boss possède un profil de combat et trois phases aux seuils de 100 %, 67 % et 34 % de vie. Les changements sont monotones, ne soignent pas le boss et s’appliquent aux attaques suivantes. Ils ne doivent jamais altérer la définition d’un coup déjà lancé. Les points faibles indiqués ici restent des objectifs d’articulation et de hitboxes, distincts du simple profil de combat.

### 8.1. GATEKEEPER VEY

**ID :** `vb_boss_gatekeeper_vey`. **Stage :** Nacre — chaussée des douanes. **Échelle fictionnelle :** 1.96 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Adrien Vey. **Âge :** 52 ans.

Le chef de barrage défend le règlement parce qu’il lui évite de regarder ceux qu’il retient.

**Silhouette —** One original adult port-security captain boss, full body 2D fighting idle side-three-quarter facing right, transparent. Broad navy-black tactical overcoat, severe exposed middle-aged face, short grey hair, three hinged narrow ballistic shield plates on left forearm, compact right-hand baton, heavy olive leg guards, small shoulder loudspeaker. Believable industrial near-future commander, no cape, no insignia, no text or scene.

**Mécanique —** `shield_cycle`, paramètres : `{"shieldHits": 1, "openingFrames": 28}`.

**Ouverture —** Entre les plaques. Attendre la fermeture, saisir au contact ou punir la relance de matraque.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Matraque de sommation | melee | 20/5/31 | 700 | Garder, espacer et punir le retour. |
| Volets du barrage | buff | 25/1/27 | 0 | Saisir, attendre ou employer une explosion; un seul projectile compatible arrêté. |
| Poussée du guichet | melee | 20/5/31 | 730 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 34/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — GATEKEEPER VEY | melee | 29/6/46 | 1430 | Garder ou sortir de portée; aucun effet automatique hors du contact. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 18}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 18, "recovery": 28}, "utility": {"startup": 39}} |

**Pièces mobiles —** Les volets sont dessinés en trois pièces articulées distinctes; leur animation de cycle reste à produire.

### 8.2. STILT-04

**ID :** `vb_boss_stilt_04`. **Stage :** Portique des conteneurs scellés. **Échelle fictionnelle :** 6.2 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Le portique autonome classe toute masse non autorisée comme conteneur à immobiliser.

**Silhouette —** One original unmanned two-legged container handling walker boss, entire single machine in 2D side-three-quarter facing right, transparent. Tall narrow rust-orange chassis, long reverse-articulated crane legs, horizontal spreader shoulder beam, one large mechanical gripping tool at each end, compact central armored control box with two amber lenses, believable hoses and counterweights. No human rider, no nuclear weapons, no REX or Gekko likeness, no background or writing.

**Mécanique —** `gantry_clamp`, paramètres : `{"grabTelegraphFrames": 30, "legExposureFrames": 40}`.

**Ouverture —** Les vérins de genou. Éviter la pince longue, attaquer après le pas; la hauteur n’accorde pas une invulnérabilité.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Pince de portique | melee | 28/6/40 | 800 | Garder, espacer et punir le retour. |
| Verrou de montant | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Pas d’inspection | melee | 30/7/42 | 780 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — STILT-04 | melee | 33/6/46 | 1600 | Garder ou sortir de portée; aucun effet automatique hors du contact. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 28}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 28, "recovery": 39}, "utility": {"startup": 44}} |

**Pièces mobiles —** Deux pinces, jambes et contrepoids mobiles : fichiers séparés requis; aucune appropriation d’un modèle Metal Gear canonique.

### 8.3. DEADWEIGHT OREN

**ID :** `vb_boss_deadweight_oren`. **Stage :** Bassin de récupération 4. **Échelle fictionnelle :** 2.34 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Oren Hald. **Âge :** 48 ans.

Oren a passé sa vie à rendre les épaves à leurs assureurs; il traite les soldats revenus trop tard comme une autre cargaison.

**Silhouette —** One original massive adult salvage-cyborg boss, full-body 2D side-three-quarter guard facing right, transparent. Weathered exposed male face, heavy dark olive pressure suit with large ivory shoulder rings, visibly mechanical lower legs, one compact ballast hammer on a short secured industrial chain held close, rear diving cylinders, huge grounded boots. Functional rugged silhouette, no gore, no medieval armor, no text or scene.

**Mécanique —** `returning_ballast`, paramètres : `{"returnAtFrames": 30, "maxHits": 2, "range": 350}`.

**Ouverture —** Le retour du câble. Passer au-dessus de l’aller-retour puis frapper Oren pendant le rembobinage.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Ballast sur câble | projectile | 28/1/39 | 560 | Garder, esquiver la ligne ou interrompre la préparation. |
| Bouteilles verrouillées | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Reprise de ballast | melee | 27/6/40 | 790 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Enroulement de ballast | projectile | 36/1/46 | 850 | Sauter ou garder les deux passages de cette masse unique, puis punir le rembobinage. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 25}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 25, "recovery": 37}, "utility": {"startup": 44}} |

**Pièces mobiles —** La tête de ballast, chaque maillon réutilisable, la bobine et le corps sont des assets distincts.

### 8.4. CHOIR MARSHAL

**ID :** `vb_boss_choir_marshal`. **Stage :** Terminal du dernier ferry. **Échelle fictionnelle :** 1.9 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Célian Rusk. **Âge :** 45 ans.

Sa voix amplifiée remplace les ordres qui ne parviennent plus. Il n’entend plus que ses propres confirmations.

**Silhouette —** One original adult tactical communications commander boss, full-body 2D facing right, transparent. Tall lean operator, graphite uniform with muted blue panels, two folded compact directional loudspeaker baffles mounted behind shoulders, asymmetric armored throat collar without hiding face, baton in one hand, cable-managed backpack. All sound tech visibly mechanical, no magic waves or floating drones, no text or scene.

**Mécanique —** `short_pressure_cone`, paramètres : `{"contactRange": 145, "slowFrames": 65, "coolingFrames": 180}`.

**Ouverture —** Les ouvertures des baffles. Sortir de la courte portée du cône et détruire le relais; pas de pouvoir mental.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Sommation directionnelle | melee | 27/5/38 | 650 | Garder, espacer et punir le retour. |
| Relais de cordon | trap | 29/1/27 | 330 | Interrompre la pose, sauter ou détruire le dispositif avant déclenchement. |
| Matraque de relais | melee | 20/5/31 | 710 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 34/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — CHOIR MARSHAL | melee | 29/6/46 | 1430 | Garder ou sortir de portée; aucun effet automatique hors du contact. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 18}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 18, "recovery": 28}, "utility": {"startup": 39}} |

**Pièces mobiles —** La pression est courte et matérialisée par un signal; les baffles ont ouverture et fermeture distinctes.

### 8.5. UMBRA-R1

**ID :** `vb_boss_umbra_r1`. **Stage :** Prise du câble sous-marin. **Échelle fictionnelle :** 2.0 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Robot d’inspection sous-marine armé pour garder un câble local.

**Silhouette —** One original amphibious unmanned submarine-cable inspection robot boss, whole single machine 2D side-three-quarter facing right, transparent. Low charcoal pressure hull with four folding articulated walking legs, bronze pressure seams, forward round sonar housing beside one small grapnel port, rear protected screw thruster, orange maintenance bands without text. Rugged mechanical amphibious crawler, no sea monster anatomy, no water background or bubbles.

**Mécanique —** `pressure_and_mooring`, paramètres : `{"pressureRange": 500, "grapnelSlowFrames": 75}`.

**Ouverture —** Les joints de pression. Attendre l’évacuation du réservoir avant d’attaquer le flanc.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Capsule de purge | projectile | 29/1/38 | 650 | Garder, esquiver la ligne ou interrompre la préparation. |
| Coque pressurisée | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Pince de prise | melee | 20/5/31 | 740 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — UMBRA-R1 | projectile | 36/1/46 | 760 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 18}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 18, "recovery": 28}, "utility": {"startup": 44}} |

**Pièces mobiles —** Coque, quatre jambes, hélice, sonar et buse séparés; déplacement amphibie de campagne en attente.

### 8.6. DR SUTURE

**ID :** `vb_boss_dr_suture`. **Stage :** Atelier des corps sous contrat. **Échelle fictionnelle :** 1.88 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Mirela Seton. **Âge :** 55 ans.

Suture appelle le verrou une protection contre l’autonomie mal employée. Son privilège est de ne jamais devoir le porter.

**Silhouette —** One original adult prosthetic-service director boss, full-body 2D facing right, transparent. Middle-aged person with exposed composed face, short silver hair, pale grey armored technician coat over navy outfit, two compact articulated servicing manipulators mounted to back and folded close around shoulders, small diagnostic tool in gloved hand, dark boots. Medical engineering without gore, no Mistral arms or sexualized outfit, no text or background.

**Mécanique —** `service_arm_and_dose`, paramètres : `{"drowsyPotency": 30, "repairBudget": 450}`.

**Ouverture —** Les bras en retour. Rester hors du bras allongé, interrompre le soin; une fléchette ne neutralise pas un UG.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Sonde anesthésique | projectile | 27/1/35 | 330 | Garder, esquiver la ligne ou interrompre la préparation. |
| Réparation opératoire | heal | 45/1/34 | 0 | Interrompre la maintenance; plafond total de 450. |
| Saisie du manipulateur | melee | 24/5/36 | 730 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 34/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — DR SUTURE | projectile | 36/1/46 | 480 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 22}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 22, "recovery": 33}, "utility": {"startup": 39}} |

**Pièces mobiles —** Deux manipulateurs seulement; outils et bras sont séparés du torse, aucun corps vivant comme accessoire.

### 8.7. CINDER PUMP

**ID :** `vb_boss_cinder_pump`. **Stage :** Dessalement — salle des membranes. **Échelle fictionnelle :** 3.3 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Une pompe de chantier reconvertie dont les soupapes imposent encore les limites physiques.

**Silhouette —** One original quadruped industrial pressure crawler boss, entire single machine 2D side-three-quarter facing right, transparent. Broad weathered off-white tank body on four squat hydraulic legs, two large bronze membrane cylinders on back, asymmetrical front pressure nozzle, armored grey grilles, short protected hoses and amber sensor lens. Real desalination equipment converted to combat, no flames or water jet active, no scene or text.

**Mécanique —** `pressure_cooling`, paramètres : `{"burstCount": 2, "coolingOpeningFrames": 45}`.

**Ouverture —** Les évents après purge. Garder ou sauter les capsules, puis punir l’évacuation de pression.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Double purge | projectile | 32/1/41 | 430 | Garder, esquiver la ligne ou interrompre la préparation. |
| Bâti de membrane | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Écrasement du vérin | melee | 30/6/42 | 810 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — CINDER PUMP | projectile | 36/1/46 | 580 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 28}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 28, "recovery": 39}, "utility": {"startup": 44}} |

**Pièces mobiles —** Réservoirs, quatre jambes, buse et vannes séparés; aucune eau de scène destructrice globale.

### 8.8. RAIL WARDEN

**ID :** `vb_boss_rail_warden`. **Stage :** Faisceau ferroviaire des saisies. **Échelle fictionnelle :** 2.8 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Une locomotive sans conducteur qui considère tout obstacle comme un retard facturable.

**Silhouette —** One original unmanned armored railway shunter boss, whole single vehicle 2D side-three-quarter facing right, transparent. Low elongated dark olive locomotive frame on compact flanged bogies, blunt armored coupling ram at nose, small recessed conventional gun turret set back, exposed red brake cylinders and riveted side plates, amber front cameras. Clearly industrial rail vehicle, no rails drawn underneath, no crew or lettering, no background.

**Mécanique —** `telegraphed_rail_charge`, paramètres : `{"chargeStartupFrames": 34, "chargeTravel": 3, "brakeRecoveryFrames": 48}`.

**Ouverture —** Le flanc après freinage. Garder le canon, éviter la charge annoncée et attaquer le freinage.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Canon de desserte | projectile | 33/1/42 | 620 | Garder, esquiver la ligne ou interrompre la préparation. |
| Frein de blindage | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Charge d’attelage | melee | 34/9/48 | 900 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — RAIL WARDEN | projectile | 36/1/46 | 760 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 32}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 32, "recovery": 45}, "utility": {"startup": 44}} |

**Pièces mobiles —** Bogies, attelage, frein et tourelle séparés; le rail reste un décor de fond dans le duel.

### 8.9. KILN SAINT

**ID :** `vb_boss_kiln_saint`. **Stage :** Fonderie des coques céramiques. **Échelle fictionnelle :** 2.02 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Dana Lenz. **Âge :** 42 ans.

Une cheffe d’essai qui prend les fissures de son armure pour des preuves de loyauté.

**Silhouette —** One original adult ceramic-armor test operator boss, full-body 2D combat stance facing right, transparent. Heat-scarred ivory ceramic mantle made of functional segmented plates over charcoal work suit, bald exposed stern face with protective smoked visor raised, two compact reinforced furnace-shutter panels strapped to forearms, heavy amber-brown boots. Industrial heat shielding, no religious iconography, no magical flames, no text or scene.

**Mécanique —** `ceramic_guard_heat`, paramètres : `{"armorHits": 1, "heatBudget": 100}`.

**Ouverture —** Les charnières du manteau. Saisir pendant la garde; frapper les longues récupérations sans supposer une immunité au feu.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Volet du four | melee | 25/6/38 | 770 | Garder, espacer et punir le retour. |
| Manteau céramique | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Frappe de moule | melee | 27/5/40 | 800 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — KILN SAINT | melee | 33/6/46 | 1600 | Garder ou sortir de portée; aucun effet automatique hors du contact. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 25}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 25, "recovery": 37}, "utility": {"startup": 44}} |

**Pièces mobiles —** Manteau en plaques, volets et articulations restent décomposables; pas d’aura de feu.

### 8.10. AERIE-09

**ID :** `vb_boss_aerie_09`. **Stage :** Soufflerie des prototypes. **Échelle fictionnelle :** 1.8 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Un prototype attaché à ses limites de banc d’essai; ses programmes ne savent pas renoncer à une démonstration.

**Silhouette —** One original experimental unmanned tiltrotor test drone boss, entire machine 2D side-three-quarter facing right, transparent. Narrow pale grey central fuselage, two short angular wings each ending in protected pivoting ducted rotors, visible underbody restraint-cable mounting loops, compact forward optical head and small centerline launcher, dark underside, restrained orange service panels. Plausible aeronautics, no humanoid face, no missiles firing, no background or text.

**Mécanique —** `short_air_burst`, paramètres : `{"burstCount": 2, "intervalFrames": 10, "flightHeightBounded": true}`.

**Ouverture —** La descente stabilisée. Attendre le passage bas, éviter la rafale haute et punir sa stabilisation.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Tirs d’essai | projectile | 28/1/38 | 420 | Garder, esquiver la ligne ou interrompre la préparation. |
| Capot de télémétrie | buff | 25/1/27 | 0 | Saisir, attendre ou employer une explosion; un seul projectile compatible arrêté. |
| Passage bas | melee | 26/7/39 | 710 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — AERIE-09 | projectile | 36/1/46 | 570 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 24}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 24, "recovery": 36}, "utility": {"startup": 44}} |

**Pièces mobiles —** Deux nacelles, rotors, fuselage et crochets séparés; le vol ne permet pas de quitter définitivement la portée.

### 8.11. COUNTERWEIGHT

**ID :** `vb_boss_counterweight`. **Stage :** Ascenseur de fret — puits central. **Échelle fictionnelle :** 4.1 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

L’entretien du puits lui a donné un seul impératif : empêcher toute masse de tomber, même quand elle veut sortir.

**Silhouette —** One original unmanned vertical-shaft maintenance robot boss, entire single robot 2D side-three-quarter facing right, transparent. Tall narrow graphite industrial spine, two enormous opposing mechanical gripping arms folded into an asymmetrical fighting silhouette, two compact articulated stabilizer feet, exposed counterweight block on lower rear, yellow worn grip pads, small amber camera. Functional climbing machine without wall or cables outside frame, no text or scene.

**Mécanique —** `alternating_grippers`, paramètres : `{"clampTelegraphFrames": 30, "oppositeArmOpeningFrames": 40}`.

**Ouverture —** La pince qui vient de manquer. Attendre qu’un bras s’engage, puis attaquer pendant sa rétraction.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Prise de puits | melee | 30/6/42 | 850 | Garder, espacer et punir le retour. |
| Ancrage vertical | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Revers de pince | melee | 28/6/41 | 780 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — COUNTERWEIGHT | melee | 33/6/46 | 1600 | Garder ou sortir de portée; aucun effet automatique hors du contact. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 26}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 26, "recovery": 38}, "utility": {"startup": 44}} |

**Pièces mobiles —** Deux pinces et contrepoids séparés; les prises de mur sont réservées au décor et au contrôleur boss.

### 8.12. THE NOTARY

**ID :** `vb_boss_notary`. **Stage :** Archive hors réseau. **Échelle fictionnelle :** 1.77 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Elias Wendt. **Âge :** 67 ans.

Le signataire refuse de se voir en combattant, mais a toujours su combien coûte une personne incapable de refuser.

**Silhouette —** One original elderly adult corporate security director boss, full-body 2D facing right, transparent. Thin man about 67 with grey hair and clear face, dark plum protective business coat over discreet armor, rigid folded ballistic document-case shield on left forearm, narrow cane-like shock baton in right hand, small amber body camera, sensible heavy shoes. Sinister grounded administrator, no royal costume, no symbols or lettering, no background.

**Mécanique —** `mark_and_shield`, paramètres : `{"markFrames": 120, "shieldHits": 1}`.

**Ouverture —** L’ouverture du dossier. Éviter la balise physique, saisir après le bouclier et ne pas attendre le contrôle.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Balise d’assignation | projectile | 29/1/36 | 400 | Garder, esquiver la ligne ou interrompre la préparation. |
| Dossier blindé | buff | 25/1/27 | 0 | Saisir, attendre ou employer une explosion; un seul projectile compatible arrêté. |
| Canne de saisie | melee | 24/5/36 | 680 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 34/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — THE NOTARY | projectile | 36/1/46 | 550 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 22}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 22, "recovery": 33}, "utility": {"startup": 39}} |

**Pièces mobiles —** Mallette, canne et caméra séparées; le registre ne confère aucun pouvoir surnaturel.

### 8.13. RIME CASK

**ID :** `vb_boss_rime_cask`. **Stage :** Soute frigorifique des implants. **Échelle fictionnelle :** 2.6 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Le transport frigorifique protège ses pièces par un automatisme qui traite les vivants comme une source de chaleur.

**Silhouette —** One original unmanned refrigerated military transport boss, entire single vehicle 2D side-three-quarter facing right, transparent. Low wide graphite tracked chassis, three thick sealed ivory coolant cylinders held longitudinally in protective olive frame, front short refrigeration nozzle beside camera, rear heat exchangers, frost limited to valves and pipes, orange service handles. Industrial realism, no ice creature or magical spikes, no text or scene.

**Mécanique —** `coolant_slow`, paramètres : `{"slowFrames": 90, "range": 500}`.

**Ouverture —** Les grilles de retour. Contourner la cartouche et attaquer le temps de repressurisation; aucun gel permanent.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Cartouche réfrigérante | projectile | 30/1/40 | 570 | Garder, esquiver la ligne ou interrompre la préparation. |
| Blindage de soute | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Pare-chocs froid | melee | 29/6/42 | 780 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — RIME CASK | projectile | 36/1/46 | 720 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 27}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 27, "recovery": 39}, "utility": {"startup": 44}} |

**Pièces mobiles —** Chenilles, cylindres, buses et grilles séparés; le froid ne crée pas de pics magiques.

### 8.14. PHASE CLERK

**ID :** `vb_boss_phase_clerk`. **Stage :** Station sol — antennes mortes. **Échelle fictionnelle :** 1.86 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Jan Kirov. **Âge :** 39 ans.

Un spécialiste qui mesure ce que le port montre et vend ses incertitudes comme des certitudes.

**Silhouette —** One original adult radar-security operator boss, full-body 2D fighting stance facing right, transparent. Slender operator in blue-grey armored coat with pale ceramic shoulder pieces, compact folded parabolic receiver mounted on backpack above one shoulder, exposed adult face with amber visor on brow, short baton and small signal probe, carefully contained cables. No psychic halo or hologram, no text or background.

**Mécanique —** `observed_trace_and_pulse`, paramètres : `{"observeRange": 380, "markFrames": 120}`.

**Ouverture —** La parabole pendant son recalage. Interrompre la lecture, varier le rythme et approcher après une sonde manquée.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Sonde de phase | projectile | 27/1/36 | 440 | Garder, esquiver la ligne ou interrompre la préparation. |
| Lecture du relais | observe | 27/1/31 | 0 | Sortir du rayon ou interrompre la lecture. |
| Bâton d’antenne | melee | 20/5/31 | 700 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 34/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — PHASE CLERK | projectile | 36/1/46 | 590 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 18}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 18, "recovery": 28}, "utility": {"startup": 39}} |

**Pièces mobiles —** Parabole, bras de support et sonde séparés; aucune lecture des commandes futures.

### 8.15. DRYDOCK GOLIATH

**ID :** `vb_boss_drydock_goliath`. **Stage :** Forme sèche du complexe K8. **Échelle fictionnelle :** 12.0 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Un engin monumental de levage dont le blindage protège la rentabilité du dock.

**Silhouette —** One original huge unmanned mobile dry-dock crane boss, entire machine 2D side-three-quarter facing right, transparent with full feet visible. Four thick industrial walking legs under a low wide olive gantry body, asymmetric front articulated lifting boom with compact clamp, two heavy rear counterweight blocks, yellow worn safety panels without writing, central armored operatorless control cabin with amber optics. Mechanical grounded non-nuclear machine, no REX/RAY resemblance, no environment.

**Mécanique —** `wide_lift_and_small_charge`, paramètres : `{"radius": 95, "fuseFrames": 45, "clampRange": 175}`.

**Ouverture —** Le vérin chargé. Éviter la charge, attendre le retour de pince et punir le cycle de maintenance.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Charge de découplage | projectile | 36/1/45 | 760 | Garder, esquiver la ligne ou interrompre la préparation. |
| Quatre points d’appui | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Pince de forme sèche | melee | 38/7/50 | 920 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — DRYDOCK GOLIATH | projectile | 36/1/46 | 760 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 36}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 36, "recovery": 47}, "utility": {"startup": 44}} |

**Pièces mobiles —** Quatre jambes, flèche, pince, contrepoids et cabine séparés; camera large nécessaire pour restituer son échelle hors versus normalisé.

### 8.16. ASH RECEIVER

**ID :** `vb_boss_ash_receiver`. **Stage :** Toit de la radio libre. **Échelle fictionnelle :** 1.82 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Safiya Kern. **Âge :** 50 ans.

L’ancienne analyste connaît la valeur d’une voix isolée. Elle vend désormais la possibilité de la retrouver.

**Silhouette —** One original adult former intelligence officer boss, full-body 2D facing right, transparent. Weathered dark-skinned woman around 50, cropped grey-black hair, faded charcoal field coat with pale tan inner vest, asymmetric compact mesh antenna rig folded over left shoulder, gloved hands holding two short physical signal jamming pucks, sturdy boots. Tactical grounded silhouette, no psychic powers or floating items, no text or scene.

**Mécanique —** `relay_denial`, paramètres : `{"maxTraps": 1, "markFrames": 110}`.

**Ouverture —** Le relais visible. Détruire le relais et éviter le palet, puis attaquer sa pose suivante.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Palet d’interception | projectile | 25/1/35 | 420 | Garder, esquiver la ligne ou interrompre la préparation. |
| Relais de silence | trap | 29/1/27 | 350 | Interrompre la pose, sauter ou détruire le dispositif avant déclenchement. |
| Main du récepteur | melee | 20/5/31 | 710 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 34/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — ASH RECEIVER | projectile | 36/1/46 | 570 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 18}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 18, "recovery": 28}, "utility": {"startup": 39}} |

**Pièces mobiles —** Antenne maillée, deux palets et harnais séparés; le brouillage reste local et ne désactive pas les contrôles du joueur.

### 8.17. SPANBREAKER

**ID :** `vb_boss_spanbreaker`. **Stage :** Pont des relais de maintenance. **Échelle fictionnelle :** 4.6 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Robot de pont qui peut fermer ses pinces sur tout ce qu’un capteur appelle une fissure.

**Silhouette —** One original six-legged unmanned bridge-inspection war machine boss, entire robot 2D side-three-quarter facing right, transparent. Long low slate-blue body, six articulated mechanical legs with visible broad magnetic clamp feet, compact central amber optic, forward twin wedge-shaped mechanical cutters folded closed, orange cable drum on back, realistic joints and steel plates. No insect flesh, no railgun giant, no environment or text.

**Mécanique —** `low_clamp_sweep`, paramètres : `{"lowReach": 175, "startupFrames": 32, "magneticFeetLocalOnly": true}`.

**Ouverture —** Le flanc entre les pas. Sauter le balayage bas, puis punir le transfert de poids.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Ciseaux de travée | melee | 31/6/44 | 850 | Garder, espacer et punir le retour. |
| Six points de prise | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Avancée de travée | melee | 33/8/46 | 830 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — SPANBREAKER | melee | 33/6/46 | 1600 | Garder ou sortir de portée; aucun effet automatique hors du contact. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 31}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 31, "recovery": 43}, "utility": {"startup": 44}} |

**Pièces mobiles —** Six pieds magnétiques, pinces et bobine séparés; le magnétisme est de contact, sans lévitation d’objets.

### 8.18. SWITCH QUEEN

**ID :** `vb_boss_switch_queen`. **Stage :** Chambre des liaisons physiques. **Échelle fictionnelle :** 1.85 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Identité originale :** Valérie Cern. **Âge :** 46 ans.

La directrice du réseau pense qu’un consentement enregistré une fois suffit pour toutes les décisions suivantes.

**Silhouette —** One original adult network-security executive boss, full-body 2D fighting guard facing right, transparent. Woman around 46 with short dark hair and exposed face, fitted practical off-white armored technician jacket over black trousers, two compact controlled cable reels at waist, short high-frequency cable cutters in both hands, asymmetric graphite forearm housing, low military boots. No crown, no dress, no tentacle swarm, no text or background.

**Mécanique —** `cable_duelist`, paramètres : `{"wireRange": 165, "disarmFrames": 90}`.

**Ouverture —** Les bobines après la fente. Retarder son attaque contre la parade et punir les câbles en récupération.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Coupe du lien | melee | 25/5/38 | 760 | Garder, espacer et punir le retour. |
| Croisement des coupe-câbles | parry | 7/9/32 | 590 | Feinter, saisir ou tirer; aucune parade automatique. |
| Fente de commutation | melee | 27/6/39 | 790 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 34/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — SWITCH QUEEN | melee | 29/6/46 | 1430 | Garder ou sortir de portée; aucun effet automatique hors du contact. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 25}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 25, "recovery": 36}, "utility": {"startup": 39}} |

**Pièces mobiles —** Deux coupe-câbles, bobines et segments de câble séparés; aucune tentacule infinie.

### 8.19. BELLWETHER VT-6

**ID :** `vb_boss_bellwether_vt6`. **Stage :** Piste d’évacuation 06. **Échelle fictionnelle :** 4.4 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Un appareil d’interception privé protégeant le départ des propriétaires du registre.

**Silhouette —** One original unmanned medium tiltrotor interceptor boss, entire aircraft 2D side-three-quarter facing right, transparent. Broad dark grey fuselage with faceted olive armored belly, two high pivoting rotors with compact mechanical pylons, short landing struts folded partly down, recessed amber optical nose and small conventional underwing launcher pods, weathered industrial paint. Distinct from AERIE test drone: heavier armored airframe and two visible tail fins, no crew, no firing, no text or sky.

**Mécanique —** `telegraphed_air_volley`, paramètres : `{"rounds": 3, "intervalFrames": 12, "groundedWindowFrames": 48}`.

**Ouverture —** La nacelle au palier bas. Se baisser ou garder la volée; profiter de la passe basse après le tir.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Volée d’interdiction | projectile | 34/1/45 | 450 | Garder, esquiver la ligne ou interrompre la préparation. |
| Carénage d’approche | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Balayage du train | melee | 33/7/46 | 830 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — BELLWETHER VT-6 | projectile | 36/1/46 | 600 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 31}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 31, "recovery": 43}, "utility": {"startup": 44}} |

**Pièces mobiles —** Fuselage, nacelles, rotors, pylônes, pod et train séparés; aucune poursuite hors écran sans retour attaquable.

### 8.20. CUSTODIAN K8

**ID :** `vb_boss_custodian_k8`. **Stage :** Barge VEIL — pont ouvert. **Échelle fictionnelle :** 8.0 m. Une caméra de duel normalisée ne certifie pas cette échelle à elle seule.

**Nature :** unité mécanique sans pilote. Les champs de nom civil et d’âge humain restent nuls.

Un protocole de récupération armé que ses créateurs ont chargé de préserver les contrats même après le départ des signataires. Sa défaite clôt Nacre, pas l’histoire des PMC.

**Silhouette —** One original final heavy unmanned recovery walker boss, entire single machine 2D side-three-quarter facing right, transparent, full head-to-feet visible. Massive asymmetrical industrial biped, squat horizontal olive armored torso with ivory service plates, broad reverse-jointed hydraulic legs and square stabilizer feet, left articulated recovery clamp and right compact conventional pile-driver cannon arm, central low amber three-lens sensor cluster, copper maintenance umbilicals secured on rear. No nuclear missile pod, no REX dinosaur head or RAY organic silhouette, believable 2016 military engineering, no scene or text.

**Mécanique —** `final_recovery_protocol`, paramètres : `{"phases": 3, "nuclearCapability": false, "maxTraps": 1, "coreExposureFrames": 50}`.

**Ouverture —** Le collecteur central après cycle. Éviter le percuteur annoncé, attendre la pince et frapper la maintenance; aucun arrêt global de la technologie canonique.

| Attaque | Type | P/A/R | Dégâts | Réponse |
| --- | --- | --- | --- | --- |
| Percuteur de reprise | projectile | 38/1/48 | 860 | Garder, esquiver la ligne ou interrompre la préparation. |
| Protocole de conservation | buff | 26/1/28 | 0 | Saisies et électricité contournent la protection; attendre son expiration. |
| Pince d’actif | melee | 39/7/52 | 980 | Garder, espacer et punir le retour. |
| Cycle de maintenance | recover | 39/1/29 | 0 | Approcher durant ce long temps sans attaque. |
| Procédure maximale — CUSTODIAN K8 | projectile | 36/1/46 | 760 | Garder, sortir de la ligne ou exploiter la longue récupération. |

| Phase | Seuil | Annonce | Modification future |
| --- | --- | --- | --- |
| Protocole de garde | 100 % | Le boss annonce son outil principal, puis effectue le premier cycle complet. | Définition de base |
| Procédure dégradée | 67 % | Un voyant de service change de rythme et l’équipement se reconfigure; aucune recharge gratuite de vie. | {"specialForward": {"startup": 37}} |
| Contrôle manuel | 34 % | Le mode automatique échoue; le boss alterne attaque engagée et maintenance plus risquée. | {"specialForward": {"startup": 37, "recovery": 49}, "utility": {"startup": 44}} |

**Pièces mobiles —** Buste, deux jambes, pied stabilisateur, pince, canon, collecteur, optiques et ombilicaux séparés; aucune arme nucléaire, aucune forme REX/RAY.

## 9. Les quarante rencontres de campagne

Le parcours commun traverse vingt lieux. Chacun comprend un combat d’approche puis une confrontation. Le personnage principal détermine les six scènes de son récit et sa progression sauvegardée. Les dialogues de rivalité sont du contenu narratif distinct; ils ne remplacent pas des boss et ne sont pas comptés comme des rencontres implémentées par simple présence dans les données.

| # | Acte | Lieu | Adversaire | Nature |
| --- | --- | --- | --- | --- |
| 1 | 1 | Nacre — chaussée des douanes | Patrouilleur de quai | enemy |
| 2 | 1 | Nacre — chaussée des douanes | GATEKEEPER VEY | boss |
| 3 | 1 | Portique des conteneurs scellés | Agent de saisie à bouclier | enemy |
| 4 | 1 | Portique des conteneurs scellés | STILT-04 | boss |
| 5 | 1 | Bassin de récupération 4 | Tireur de recouvrement | enemy |
| 6 | 1 | Bassin de récupération 4 | DEADWEIGHT OREN | boss |
| 7 | 1 | Terminal du dernier ferry | Grenadier de cordon | enemy |
| 8 | 1 | Terminal du dernier ferry | CHOIR MARSHAL | boss |
| 9 | 1 | Prise du câble sous-marin | Sapeur de câbles | enemy |
| 10 | 1 | Prise du câble sous-marin | UMBRA-R1 | boss |
| 11 | 2 | Atelier des corps sous contrat | Technicien de brouillage | enemy |
| 12 | 2 | Atelier des corps sous contrat | DR SUTURE | boss |
| 13 | 2 | Dessalement — salle des membranes | Briseur de porte à contact | enemy |
| 14 | 2 | Dessalement — salle des membranes | CINDER PUMP | boss |
| 15 | 2 | Faisceau ferroviaire des saisies | Poursuiveur à attelles | enemy |
| 16 | 2 | Faisceau ferroviaire des saisies | RAIL WARDEN | boss |
| 17 | 2 | Fonderie des coques céramiques | Tailleur de maintenance | enemy |
| 18 | 2 | Fonderie des coques céramiques | KILN SAINT | boss |
| 19 | 2 | Soufflerie des prototypes | Observateur d’audit | enemy |
| 20 | 2 | Soufflerie des prototypes | AERIE-09 | boss |
| 21 | 3 | Ascenseur de fret — puits central | Porteur assisté | enemy |
| 22 | 3 | Ascenseur de fret — puits central | COUNTERWEIGHT | boss |
| 23 | 3 | Archive hors réseau | Récupérateur blindé | enemy |
| 24 | 3 | Archive hors réseau | THE NOTARY | boss |
| 25 | 3 | Soute frigorifique des implants | Trépied remorqueur | enemy |
| 26 | 3 | Soute frigorifique des implants | RIME CASK | boss |
| 27 | 3 | Station sol — antennes mortes | Rampeur d’inspection | enemy |
| 28 | 3 | Station sol — antennes mortes | PHASE CLERK | boss |
| 29 | 3 | Forme sèche du complexe K8 | Lentille volante | enemy |
| 30 | 3 | Forme sèche du complexe K8 | DRYDOCK GOLIATH | boss |
| 31 | 4 | Toit de la radio libre | Chenillette de barrage | enemy |
| 32 | 4 | Toit de la radio libre | ASH RECEIVER | boss |
| 33 | 4 | Pont des relais de maintenance | Sonde de déminage | enemy |
| 34 | 4 | Pont des relais de maintenance | SPANBREAKER | boss |
| 35 | 4 | Chambre des liaisons physiques | Drone d’arrimage | enemy |
| 36 | 4 | Chambre des liaisons physiques | SWITCH QUEEN | boss |
| 37 | 4 | Piste d’évacuation 06 | Sentinelle de guichet | enemy |
| 38 | 4 | Piste d’évacuation 06 | BELLWETHER VT-6 | boss |
| 39 | 4 | Barge VEIL — pont ouvert | Convoyeur de contrôle | enemy |
| 40 | 4 | Barge VEIL — pont ouvert | CUSTODIAN K8 | boss |

- Progression indépendante par personnage; enregistrer une victoire réelle seulement à la fin du match. Défaite, sortie, entraînement et replay ne débloquent pas de rencontre.
- Trois scènes d’introduction avant le premier combat et trois scènes de fin après la quarantième victoire du personnage. La rivalité est un dialogue distinct; pas un remplaçant des vingt boss.
- Duo original facultatif, deux personnages distincts choisis parmi les dix; la progression appartient au personnage principal.
- Toutes les arènes restent géométriquement stables. Les missions et dangers spécifiques sont annoncés par le mode, jamais injectés aléatoirement en versus.

Le Boss Rush reprend les vingt boss dans leur ordre de campagne, avec leur scène propre. Le versus et l’entraînement doivent rester accessibles sans détour par la campagne; une victoire d’entraînement ne modifie jamais la progression narrative.

## 10. Objets, projectiles, effets et séparation des pièces

### Vingt objets

| ID | Objet | Fonction / silhouette | États requis |
| --- | --- | --- | --- |
| vb_prop_floor_clamp | Pince de sol | Pince de récupération à mâchoires rembourrées; objet distinct du personnage. | repliée, armée, déclenchée, brisée |
| vb_prop_ground_probe | Sonde de mise à la terre | Petite base céramique à contacts cuivre et voyant limité. | éteinte, armée, contact, hors service |
| vb_prop_reflector_lure | Leurre réflecteur | Deux panneaux physiques sur trépied; aucun double humain opaque non justifié. | plié, déployé, touché, rappelé |
| vb_prop_maintenance_terminal | Terminal de maintenance local | Armoire olive avec prises et interrupteurs mécaniques; écran sans texte généré illisible. | veille, diagnostic, déverrouillé, coupé |
| vb_prop_field_battery | Cellule de campagne | Module de puissance amovible; contacts cuivre, poignée rabattable. | pleine, faible, déconnectée |
| vb_prop_signal_relay | Relais de signal | Petit relais physique à antennes repliables, destructible. | plié, armé, actif, détruit |
| vb_prop_proof_case | Mallette de preuves | Mallette rigide scellable contenant des supports physiques. | fermée, ouverte, scellée |
| vb_prop_relay_cutoff | Sectionneur du relais | Grand sectionneur manuel de cabinet; levier et base en fichiers séparés. | connecté, déconnecté, verrouillé |
| vb_prop_brace_cassette | Cassette d’attelle | Cartouche de service d’une jambe assistée, sans membre humain. | verrouillée, retirée |
| vb_prop_cable_coupling | Coupleur sous-marin | Connecteur renforcé étanche avec deux demi-coques distinctes. | fermé, séparé, endommagé |
| vb_prop_arm_service_cradle | Berceau de bras mécanique | Support d’atelier pour prothèse vide, vis de réglage et mâchoires sans pointes. | vide, ouvert, serré |
| vb_prop_folding_shield | Écran balistique repliable | Protection à trois panneaux articulés; pivot explicite. | plié, ouvert, impact, rompu |
| vb_prop_ballast_chain_link | Maillon de ballast | Un maillon métallique réutilisable par répétition procédurale; la tête de ballast est un autre fichier. | neutre |
| vb_prop_sealed_carrier | Coffre de transport scellé | Coffre médical/technique opaque, sans personne ni organe représenté. | fermé, ouvert, scellé |
| vb_prop_copper_busbar | Barre de distribution | Jeu de contacts mécaniques robuste; aucun circuit magique flottant. | connectée, retirée |
| vb_prop_rotor_hub | Moyeu de rotor | Moyeu et une pale détachable à pivots documentés. | repos, rotation, endommagé |
| vb_prop_hydraulic_piston | Vérin hydraulique | Corps, tige et flexible individualisés pour la course de l’articulation. | rétracté, déployé, fuite |
| vb_prop_ceramic_plate | Plaque céramique | Plaque de blindage ivoire à fixation visible. | intacte, fissurée, brisée |
| vb_prop_evacuation_beacon | Balise d’évacuation | Lampe de piste portable sur socle, visible sans éblouir le combat. | éteinte, ambre, verte |
| vb_prop_manual_service_key | Clé de service manuelle | Petite clé physique industrielle, objet narratif de maintenance accessible. | rangée, insérée |

### Vingt projectiles et débris

| ID | Asset | Fonction | Propriétaires |
| --- | --- | --- | --- |
| vb_proj_grapnel | Grapnel de retenue | impact et ralentissement limités | LATCH, Drone d’arrimage |
| vb_proj_tranq_dart | Fléchette de contention | somnolence; les machines y sont immunisées | STILLWELL, DR SUTURE |
| vb_proj_pressure_capsule | Capsule de pression | impact physique, sans onde magique | UMBRA-R1, CINDER PUMP |
| vb_proj_ballast_head | Tête de ballast | un aller-retour borné, maximum deux impacts | DEADWEIGHT OREN |
| vb_proj_signal_puck | Palet de signal | marque uniquement après contact du projectile | Technicien de brouillage, PHASE CLERK, ASH RECEIVER |
| vb_proj_carbine_round | Projectile de carabine | trajectoire haute évitable | Patrouilleur de quai |
| vb_proj_service_round | Projectile de pistolet | tir unique ou paire distincte | BLIND LEDGER, Observateur d’audit |
| vb_proj_pdw_round | Projectile de PDW | chaque coup est un objet séparé | SWITCHBACK |
| vb_proj_precision_round | Projectile de précision | bonus de visée seulement après immobilité réelle | Tireur de recouvrement |
| vb_proj_cordon_grenade | Grenade de cordon | arc gravitaire, fusée visible, rayon limité | Grenadier de cordon |
| vb_proj_tracking_tag | Balise adhésive | marquage local temporaire après impact | Lentille volante, Convoyeur de contrôle, THE NOTARY |
| vb_proj_sentry_round | Projectile de sentinelle | tir frontal télégraphié | Sentinelle de guichet, RAIL WARDEN |
| vb_proj_demining_charge | Charge de déminage | petite explosion retardée bornée | Sonde de déminage |
| vb_proj_drone_round | Projectile d’aéronef | salves espacées et esquivables | AERIE-09, BELLWETHER VT-6 |
| vb_proj_coupling_charge | Charge de découplage | arc lent, aucune explosion nucléaire | DRYDOCK GOLIATH |
| vb_proj_coolant_canister | Cartouche réfrigérante | ralentissement temporaire, pas de gel perpétuel | RIME CASK |
| vb_proj_piledriver_round | Percuteur de reprise | impact conventionnel annoncé; charge non nucléaire | CUSTODIAN K8 |
| vb_proj_cutting_disc | Disque de découplage | réservé à une future variante de contrôleur; absent du kit de base | COUNTERWEIGHT |
| vb_proj_stun_bolt | Sonde d’arrêt | variante distante à implémenter; le kit de base reste au contact | Briseur de porte à contact |
| vb_proj_ceramic_shard | Éclat céramique | débris visuel; pas de dégâts en versus compétitif | KILN SAINT |

La tête de ballast est indépendante de la chaîne; le maillon se répète le long d’une courbe calculée. Le grapnel est indépendant du câble. Les munitions ne contiennent ni arme, ni main, ni douille. Les sons de tir, traînées et impacts ont leur propre cycle. Les trois entrées réservées à une variante future ou à des débris visuels ne sont pas présentées comme des attaques déjà actives.

### Dix clips VFX

| ID | Effet | Images cibles | Direction |
| --- | --- | --- | --- |
| vb_vfx_muzzle_small | Départ de coup | 4 | Flash compact blanc ambre, pas de flash permanent ni trace opaque sur le visage. |
| vb_vfx_metal_impact | Impact métallique | 8 | Gerbe courte de particules de métal et poussière, sans couvrir toute la cible. |
| vb_vfx_pressure_puff | Purge de pression | 10 | Vapeur brève blanche grise à faible opacité. |
| vb_vfx_electric_contact | Contact électrique | 6 | Arc local entre deux contacts visibles, sans foudre pleine arène. |
| vb_vfx_salt_spray | Embruns de quai | 12 | Fines gouttes derrière le plan de combat. |
| vb_vfx_reflector_flash | Reflet de prisme | 5 | Éclair optique court attaché au panneau physique, sans créer de clone. |
| vb_vfx_heat_vent | Ventilation chaude | 10 | Distorsion faible et vapeur d’échangeur; aucun incendie automatique. |
| vb_vfx_coolant_mist | Brume réfrigérante | 12 | Nuage froid transparent qui ne masque pas la préparation adverse. |
| vb_vfx_relay_cut | Relais sectionné | 8 | Une étincelle aux contacts, puis voyant éteint. |
| vb_vfx_signal_pulse | Impulsion du relais | 9 | Petit anneau d’indication autour du dispositif, jamais preuve de contrôle mental. |

Les images d’une séquence restent des fichiers individuels. L’import peut ensuite préparer un atlas technique, mais le livrable source conserve une image par élément ou par état. Un effet visuel ne décide jamais seul si un coup inflige des dégâts.

## 11. État réel, validation et reste de production

**Inventaire P74 : 99 PNG conservés, dont 29 images d’arsenal pour 40 fiches.** Onze images d’arsenal manquent : un refus connu et dix résultats indisponibles pour l’intégration, sans cause supplémentaire établie. La génération de `vb_prop_floor_clamp` a été refusée par le fournisseur sans image retournée (requête `f284877c-a01f-41aa-b23c-f4a8b9992872`). Aucune relance n’a été effectuée. La fiche de pince de sol et sa définition de gameplay restent présentes, mais son champ `asset` est nul et elle n’est pas comptée comme illustration produite. Le [manifeste d’images](../cqc-reprise/pass74/veilbreak/image-manifest.json) donne le détail des fichiers reçus, leurs empreintes et les absences. Après restauration, les six galeries du portail ont rendu les 99 images attendues et ont été examinées visuellement. Les 99 PNG décodent correctement et leurs empreintes ont été contrôlées; les 79 images hors stages comportent de la transparence. Les bases sont entières, les fonds de duel lisibles et la palette industrielle cohérente. Des silhouettes humaines proches, la lecture d’une fléchette fine à petite échelle et l’échelle normalisée des grandes machines restent des réserves documentées. L’orientation du ballast a été corrigée dans les données et le rendu. Le [rapport raster](../cqc-reprise/pass74/veilbreak/image-raster-validation.json) et la [revue visuelle](../cqc-reprise/pass74/veilbreak/visual-review.json) détaillent ces constats. Ces contrôles ne certifient ni une animation, ni une fidélité canonique 1:1.

La validation du catalogue vérifie 50 profils, 500 commandes, les types supportés, la cohérence des ressources et des références, 60 scènes distinctes, 40 rencontres et 60 phases. Rapport : `docs/cqc-bible/veilbreak-data-validation.json`. Elle ne mesure pas la fidélité d’un dessin et ne constitue pas un test navigateur.

**Validation du moteur réel : passed.** Le script `scripts/test-cqc-veilbreak-content.mjs` exécute les commandes dans `CQCCombat048Pass8`, sans combat simulé par un faux moteur : **500/500 commandes** ont produit leur effet contextuel; **50/50 paires de simulations CPU** se rejouent à l’identique; **104516 états** respectent les invariants numériques. Rapport : `docs/cqc-bible/veilbreak-engine-validation.json`.

Cette vérification a corrigé la course de la masse d’Oren et son super, qui conserve désormais une seule tête de ballast sur un aller-retour. Elle couvre les coûts, l’activation, le contact ou l’effet utile et la fin des coups. Les contraintes du contrôleur, les phases, le duo, la sauvegarde et les résultats de campagne disposent désormais de leurs [preuves d’intégration dédiées](../cqc-reprise/pass74/README.md) : 40 tests Node uniques, puis contrôles navigateur d’équipe, de combat et de portail. Le [rapport final du portail](../cqc-reprise/pass74/veilbreak/evidence/portal-report.json) contient onze contrôles réussis après restauration, avec six galeries et 99 images rendues, sans erreur JavaScript ni ressource manquante. Les premiers lancements et les fixtures de progression sont couverts; cela ne constitue pas une partie intégrale des quarante rencontres. Le rendu historique v055 reste non exhaustivement vérifié, et l’équilibrage n’est pas certifié.

- Cycles de mouvement et attaques distinctes pour les cinquante profils.
- Articulations et pièces mobiles séparées des machines et accessoires.
- Cent plans séparés de parallaxe (cinq par stage); une image composite ne les remplace pas.
- Soixante illustrations originales de scènes d’histoire, distinctes entre introduction et épilogue.
- Trente neutralisations cinématiques et leurs contrôleurs, sons et caméras.
- Vingt tenues alternatives originales en plus des dix designs de service.
- Effets, sons et musiques d’origine nouvelle, puis validation de lisibilité.
- Points faibles articulés et échelle des grands boss à vérifier séparément.
- Équilibrage des rencontres, recettes prolongées et maintien des régressions de sauvegarde, d’entrées et de progression.

**Règle d’admission —** Ne marquer complet que le livrable vérifié : image de base, profil moteur, scène texte, calque, animation ou fonction. Chaque catégorie garde son propre statut.

Les fonctions liées au duo, aux assistances, aux provocations, aux bonus, aux déblocages, aux écrans d’histoire et aux neutralisations doivent être rapprochées de la bible générale de combat et de ses deux extensions. Les interfaces de sélection, les données et le moteur ont des preuves séparées : une option affichée ou un texte de conception ne suffisent pas à déclarer un mode terminé.

## 12. Index des sources primaires

**vb_src_mgs4_history — [Metal Gear history — MGS4](https://www.konami.com/mg/history/jp/ja/mgs4)**, Konami. MGS4 est daté de 2014; guerre commercialisée, PMC et conflit final de Solid Snake. Ne décrit aucun événement VEILBREAK.

**vb_src_mgr_story — [Metal Gear Rising — Story](https://www.konami.com/mg/archive/mgr/jp/story/)**, Konami. La chronologie visuelle situe Rising en 2018; diffusion des technologies cyborg et recomposition des conflits. Ne décrit aucun événement VEILBREAK.

**vb_src_mgr_backstory — [How does Metal Gear Rising tie in with the rest of the series?](https://eu-support.konami.com/hc/en-gb/articles/9730773185303-Backstory-How-does-the-Metal-Gear-Rising-Revengeance-tie-in-with-the-rest-of-the-Metal-Gear-series)**, Konami Support. Rising a lieu quatre ans après MGS4; Patriots détruits, PMC fragmentées, déplacement vers les technologies cyborg.

**vb_src_art_continuity — [Staying True to Metal Gear](https://www.platinumgames.com/official-blog/article/4527)**, PlatinumGames. Retour de concepteur sur asymétrie fonctionnelle, détail mécanique et continuité visuelle. Source de méthode, pas approbation de nos designs.

**vb_src_character_design — [Ruminations on Character Design](https://www.platinumgames.com/official-blog/article/4694)**, PlatinumGames. Lien entre fonction de combat, silhouette et articulation détaillée de corps mécanisés; distinction des concepts écartés et du design final.

**vb_src_stage_balance — [Rising’s Graphics and Stages](https://www.platinumgames.com/official-blog/article/4761)**, PlatinumGames. Compromis explicite entre lisibilité de parcours, détails de décor, mécanique et performance à 60 fps.

**vb_src_narrative_play — [Special Guest! Scenario Writer Etsu Tamari](https://www.platinumgames.com/official-blog/article/4791)**, PlatinumGames / Kojima Productions. Récit, dialogues codec et situations de jeu doivent être révisés ensemble; une fiche écrite ne prouve pas une mécanique jouable.
