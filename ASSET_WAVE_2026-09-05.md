# Vague personnages et méchas — 5 septembre 2026

## Contenu de cette vague

Sept acteurs remplacent leurs images fixes ou rigs dérivés par des poses OpenAI dédiées : Sahelanthropus (MGSV TPP), RAY autonome (MGS2 Plant), Metal Gear D (MG2), Shagohod (MGS3), Pupa (Peace Walker), Gekko (MGS4), Olga Gurlukovich (MGS2 Tanker).

Contrat ajouté : **14 planches runtime, 224 poses, 56 clips**, deux planches 4×4 et huit actions par acteur. Avec Ocelot, Otacon et REX déjà présents : 10 acteurs spéciaux, 20 planches, 320 poses et 80 clips. Ce total n'inclut pas les 72 planches des personnages génériques.

| Acteur | Core | Special | Cellule |
| --- | --- | --- | --- |
| Les six machines | idle, move, charge, attack | recover, hit, death, scan | 256×256 |
| Olga Tanker | idle, move, charge, attack | reload, hit, death, crouch | 128×128 |

Toutes les nouvelles sources regardent à droite. REX conserve son orientation à gauche et ses attaques spécifiques antérieures. La neutralisation d'Olga est illustrée comme une perte de connaissance, pas une mort canonique.

Quatre planches de projectiles de quatre phases chacune sont ajoutées séparément : railgun blanc/orange de Sahelanthropus, eau pressurisée de RAY, autocanon cuivré de D, impulsion électrique de Pupa. Elles remplacent le traceur générique de ces boss seulement. Leurs collisions restent balistiques : il ne s'agit pas encore de jets continus, de simulation de fluide ou de zones électriques persistantes.

## Références et fidélité

- Sahelanthropus : [Konami](https://www.konami.com/mg/mgs5/tpp/jp/goods/item_pla_sahelanthropus.html), [modèle supervisé Kotobukiya](https://www.kotobukiya.co.jp/en/product/detail/p4934054025107/).
- RAY : [modèle sous licence Kotobukiya](https://www.kotobukiya.co.jp/en/product/detail/p4934054049172/). La variante autonome MGS2 est séparée du RAY modifié de Revengeance.
- D : [illustration sous licence Konami / OKS](https://www.oksgear.com/products/metal-gear-d-shadowbox-art-1).
- Shagohod : [rétrospective officielle Konami MGS3](https://www.konami.com/mg/archive/mg25th/truth/mgs3.html), identité du véhicule à propulsion fusée, sans confusion avec un bipède.
- Olga : [entretien officiel de Yoji Shinkawa sur son maillot rayé](https://www.konami.com/mg/archive/mgs2/art/third.html), [manuel Konami](https://metalgear.konami.net/manual/mc1/mgs2/xbox/en/page24.html). Tenue Tanker sans confusion avec Plant.
- Pupa : [guide officiel Konami](https://www.konami.com/mg/archive/ssg/advice_pw/advice_mgspw_01.html).
- Gekko : [jeu MGS4 Konami](https://www.konami.com/games/eu/en/products/mgs4/), catalogue de rendu promotionnel et bitmap du projet pour la continuité de silhouette.

Les prompts, corrections et références supplémentaires de chaque acteur sont archivés dans `scripts/art_sources/special-animations/<id>-prompts.json`. Les SHA-256, découpes et calibrations sont dans chaque `public/sideops/special-animations/<id>/provenance.json`. Les projectiles ont leur propre dossier `scripts/art_sources/mecha-projectiles/`.

Il s'agit d'adaptations originales fan-made, pas d'extractions des jeux officiels. La revue de silhouette, de tenue, d'armement et d'orientation ne certifie pas une fidélité 1:1. Les variations de proportions entre deux sources sont calibrées par une seule échelle de planche ; aucune animation n'est fabriquée par déformation d'une image unique.

## Intégration technique

Le registre partagé pilote import et préchargement. `idleBounds` est mesuré sur la vraie silhouette alpha de `core[0]` ; les tests comparent ce champ aux pixels exportés. L'origine visuelle, la ligne des pieds et l'échelle sont adaptées sans changer la taille ni le centre du corps de collision hérité. Les poses d'attaque et de chute gardent cette même échelle.

Le combat consomme une préparation du tir, une attaque par salve réelle et la récupération/recharge. La ruée physique emploie le déplacement, pas une fausse animation de canon. Les réactions hit/death restent prioritaires. Le scan des machines et l'accroupissement d'Olga sont utilisés avant activation.

Les projectiles sont orientés depuis une bouche calculée sur le corps, vers la cible déjà verrouillée, en gardant vitesse et dispersion. Les objets recyclés réinitialisent texture, animation, échelle, angle, orientation et hitbox ; un ancien temporisateur ne détruit pas une nouvelle salve.

L'importeur accepte `--output-root` pour préparer les fichiers sur G: lorsque C: est saturé. La provenance des exports reste identique ; l'option ne constitue pas une intégration au runtime tant que les sorties ne sont pas copiées et vérifiées dans le projet.

## Manques restant explicites

Cette vague ne complète pas toute la franchise. Le TX-55 conserve son rig antérieur et son sabotage immobile par charges alternées ; il n'a pas reçu un faux combat mobile. REX garde ses planches déjà produites.

ZEKE, Peace Walker/Basilisk, Chrysalis, Cocoon, RAXA, Mk. II/Mk. III et GANDER ne sont pas déclarés dans le contrat actuel : leurs assets, animations, rencontres et tests restent à produire. EXCELSUS est également absent, et son époque n'est pas actuellement modélisée.

Les deux personnages VR `mgs1VrSnakeDisguise` et `mgs1VrMysterySoldier` restent des images fixes. Les autres personnages/boss nommés non couverts par cette vague gardent leurs états antérieurs, qui peuvent comprendre des rigs legacy : cette présence ne vaut pas huit actions OpenAI dédiées. La présence d'un fichier ou d'une entrée d'audit ne vaut jamais couverture jouable complète.

Côté Codec, cette vague n'ajoute pas de nouveaux portraits : le test de couverture vérifie les fichiers locaux de tous les contacts et identités jouables actuellement déclarés. Cela ne constitue pas un roster exhaustif de tous les personnages de la franchise.

## Stockage

Après autorisation explicite, 89 gros temporaires du projet (65 507 562 octets) ont été copiés vers `G:\CodexBuild\shadowcodecops\project-temp-2026-09-05`, vérifiés SHA-256, puis retirés de C:. Deux anciens profils temporaires de QA MGS inactifs (74 fichiers, 194 008 446 octets) ont été archivés de la même façon dans `G:\CodexBuild\shadowcodecops\archived-qa-temporaries`. Aucun code, asset runtime, historique Git, profil de navigation utilisateur actif ni permission Windows n'a été supprimé ou modifié par ce déplacement.

La jonction node_modules vers G: déjà créée est conservée. Les compilations et captures lourdes de cette vague utilisent G: ; l'espace libre de C: fluctue avec l'activité de la machine.

## Validation

- `npm.cmd run qa` : **593 tests / 93 fichiers**, TypeScript, compilation production et contrôle PWA passent après le correctif de placement. Le précache contient 1 098 entrées.
- Importeurs : **6 tests Python** pour les acteurs spéciaux et **4 tests Python** pour les projectiles passent ; les 14 nouvelles planches respectent les contrôles de provenance et de silhouette.
- Un défaut de spawn de Sahelanthropus a été corrigé : son grand corps pouvait traverser le haut du sol dès le premier pas physique. Seuls les supports intersectant la moitié inférieure du corps le replacent ; dix tests couvrent les grandes et anciennes dimensions, les supports désactivés/hors axe et les départs aériens.
- Le saut initial des projectiles redimensionnés a été corrigé : les positions physiques précédentes sont recalées après échelle/offset, avant de donner la vitesse. **Neuf tests de régression** vérifient le premier postUpdate gauche/droite des quatre VFX et le retour au projectile de garde.
- Recette navigateur : **7 acteurs / 56 états observés**, 18 images servies en HTTP 200 avec signature PNG, corps et orientation stables, dégâts réels sur le joueur, réactions aux impacts et neutralisations validées. Après le dernier correctif, les cinq profils concernés ont été rejoués ; les quatre VFX ont une dérive initiale mesurée de **0 px**, pour le sprite comme pour le centre de collision.
- Le test de recyclage emploie le même objet Arcade, vérifie dix points et laisse expirer les anciens/nouveaux temporisateurs réels : texture, animation, échelle, angle, hitbox 24×8, vitesse et jeton de vol reviennent correctement à l'état garde.
- Méthode : contextes Chromium isolés à 1280×720, positions d'arène/joueur contrôlées et gardes annexes désactivés ; IA, chronologie, physique et clips du boss s'exécutent normalement. Les impacts SOCOM passent par les collisions Arcade. Ce n'est pas une campagne complète jouée sans instrumentation. Aucune erreur navigateur dans les passes retenues.
- Preuves locales : [tests JSON](<G:/CodexBuild/shadowcodecops/qa/mecha-wave/tests-final.json>), [cinq profils rejoués après correction](<G:/CodexBuild/shadowcodecops/qa/mecha-wave/projectile-final/report.json>), [passe Shagohod/Gekko](<G:/CodexBuild/shadowcodecops/qa/mecha-wave/final/report.json>), [recyclage](<G:/CodexBuild/shadowcodecops/qa/mecha-wave/projectile-pool.json>). Les échecs de placement du harness dans les anciennes passes sont conservés pour traçabilité ; ils ne sont pas présentés comme des passes réussies.
- Un échec d'écriture a temporairement tronqué `SideOpsScene.ts`. Le fichier a été restauré, comparé exactement (hors fins de lignes) à la source originale restée chargée dans Chromium, sauvegardé sur G:, puis retesté intégralement. La cause de l'échec d'écriture n'est pas établie ; le contrôle direct suivant montrait plus de 1 Go libre.
- `npm.cmd run tauri:build -- --bundles nsis,msi` : **deux installateurs Windows 3.8.0 produits après le correctif**, le 5 septembre à 22:02. Ils ont été compilés et hachés, pas installés ni exécutés dans cette recette.

### Installateurs locaux

- [EXE Windows x64](<G:/CodexBuild/shadowcodecops/target/release/bundle/nsis/Shadow Codec Ops_3.8.0_x64-setup.exe>) : 43 801 461 octets ; SHA-256 `20E6EED1584028DDCD4E194F66083B694E5C7936B58C45D8E915E3F6E8FA9FCC`.
- [MSI Windows x64](<G:/CodexBuild/shadowcodecops/target/release/bundle/msi/Shadow Codec Ops_3.8.0_x64_en-US.msi>) : 44 601 344 octets ; SHA-256 `98A1EA2F33E07684C4B6E9461B7703F94FBBB50760DD361D0E20258088D785AD`.

Aucun déploiement production n'a été effectué pour cette vague ; ne pas confondre modifications locales, commit et publication Vercel.
