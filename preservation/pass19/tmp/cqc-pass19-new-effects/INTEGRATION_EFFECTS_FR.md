# Fumée et VFX des nouveaux profils

Livraison isolée, aucune mutation de l’APP. Le plan V1 fixe cinq fragments du moteur externalisé, en conservant tous les hooks d’échelle/collisions de pass19. Précondition engine SHA `b3076a7f69eeda7af72dfb4c3d7e1548302952ae399897212d7110837a7a23d5` ; résultat `b68e4d66e2c99fbc1b26e557557c8e4a51e16de1c2b165c6e3cf33d79b96cd27`. Le candidat est `cqc-pass8-combat-engine-with-smoke-hooks.js`. Les dépendances/HTML de la première lecture sont des snapshots contextuels : seul le SHA du moteur est une précondition de mutation ; Root a ensuite importé Frostbite V4 sans changer ce moteur.

Charger `cqc-pass19-new-vfx-catalog.js` après PASS18-vfx-catalog et avant PASS18-vfx-bridge ; charger `cqc-pass19-smoke-mechanics.js` avant pass8-combat-engine ; charger `cqc-pass19-new-vfx-routes.js` après le bridge et la mécanique. Après `CQC_PASS19_ROSTER_NATIVE.install(FIGHTERS)` :

```js
window.CQC_PASS19_NEW_EFFECTS.registerFighters(FIGHTERS);
```

Cette route traite seulement les profils réellement présents dans FIGHTERS avec leur référence pass19. Le test offline prépare 32 candidats de référence pour vérifier leurs routes ; il ne les installe pas et ne prétend pas que leur art existe. Les futurs rigs natifs reçoivent les mêmes routes après leur installation réelle. La répétition de registration est idempotente. Les anciens IDs/effets gardent leurs sources.

Les quatre alias natifs utilisent des PNG et rectangles déjà revus : haze/chaff pour `smoke-cloud`, launcher-shell pour `smoke-shell` et `stun-shell`, debris pour `crystal-grenade`. Aucune nouvelle image, aucun pixel changé, aucune nouvelle apparence 1:1 de munition revendiquée. L’alias cristallin signale explicitement que la forme exacte du projectile Survive n’est pas attestée par cette famille de VFX. Les huit fichiers physiques PASS18 restent les mêmes ; les alias ajoutent des noms de présentation, pas de nouveaux cadres physiques.

Smoke Box arme un piège. Son déclenchement crée un vrai nuage de simulation dans le tableau FX existant. Le SMK Box Tank projette son obus, dont le fuse crée ce nuage. Les branches fumée quittent `damage` avant garde/chip/hitstun/status/meter et quittent `explode` avant blast/dégâts/destruction de pièges ; elles ne passent jamais par un « dommage zéro » générique. Elles ne rendent pas somnolent. Les STN restent des techniques non létales avec la vraie jauge `drowsy`, seuil d’étourdissement, immunité organique/mécanique et contrejeu existants.

Nuage : 240 frames par défaut, 90–360 frames bornées, huit nuages maximum ; rayon 55–180 px. Le camouflage appartient seulement à son propriétaire vivant, au sol, dans le rayon/volume, sans attaque/hit/mark et après 24 frames calmes. Sortie, action, saut, impact, marquage ou expiration révoquent seulement le cloak de fumée. Une autre technique de cloak conserve son comportement historique. Le renderer VS existant voit ce cloak ; le loopFX est adapté par le nouveau module de dessin, qui peint trois couches de haze native avec une enveloppe bornée. Aucun remplacement de physique/renderer VSHTML.

Ne pas déployer les nouveaux équipements fumée sans les modules et le moteur hooké : l’ancien calcul générique d’impact donnerait chip/hitstun même avec damage=0. La compilation Node et les tests ici ne remplacent pas la QA d’intégration finale de Root sur ses nouvelles imports.

Preuves : `runs/2026-10-07T23-53-34-811Z/NEW_EFFECTS_ACTUAL_ENGINE_QA_V1.json` couvre l’armement/déclenchement, projectile/fuse, zéro dégâts/chip/status, aucune destruction collatérale, sortie/attaque/air/durée, cloak indépendant, STN et état/replay byte-identique. Le moteur et les vrais profils actuels sont exécutés ; leurs valeurs restent des adaptations CQC.

`runs/2026-10-07T23-55-41-487Z/NEW_EFFECTS_ACTUAL_BROWSER_QA_V1.json` : moteur réel + Canvas réel, douze drawImage natifs à quatre âges, alpha réellement peint, huit PNG relus SHA, zéro exception/échec réseau. Screenshot voisin conservé. Cet audit vérifie une mécanique/présentation native fonctionnelle, sans certifier la fumée du jeu source 1:1.
