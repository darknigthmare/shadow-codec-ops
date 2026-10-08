# Intégration des costumes Pass19

Tout est isolé ici. Aucun PNG ni fichier de l’application Pass18 n’a été modifié par ce chantier.

## Modules et ordre de chargement

Copier `cqc-sprite-renderer.js` et `cqc-pass17-core-costumes.js` comme remplacements des fichiers homonymes. Conserver le `cqc-pass17-costumes.js` historique : `cqc-pass19-costumes.js` remplace ses deux méthodes restrictives au chargement, en conservant ses contrôles, son stockage et ses choix indépendants par emplacement.

Dans Core et Versus, charger les deux modules suivants **avant** le renderer de sprites :

1. `cqc-pass19-costume-parts.js`
2. `cqc-pass19-pixel-style.js`

Après le renderer, tous les catalogues de sprites/costumes historiques et `cqc-pass17-costumes.js`, charger :

1. `cqc-pass19-costume-request-data.js`
2. `cqc-pass19-costumes.js`
3. Le module d’échelle `cqc-pass19-world-scale.js` du chantier échelle, une fois les API de sprites et machines présentes.
4. `cqc-pass19-machine-costume-routing.js`
5. `cqc-pass19-machine-pixel-style.js`
6. `cqc-pass19-retro-presentations.js` — inscription automatique des 262 corps peints éligibles.
7. Appel `CQC_PASS19_MACHINE_PIXEL_STYLE.registerAll()` — inscription des 17 présentations de machines.
8. L’addon des apparences canoniques, puis les variantes originales ayant leurs vrais atlas approuvés.

Le registre des demandes est un outil interne ; ne pas l’ajouter comme liste de costumes sélectionnables. Les options du catalogue jouable existent uniquement pour les alternatives inscrites.

## Corrections locales nécessaires dans les modules HTML

Dans `unified-versus-v055.html`, remplacer les appels `CQC_PASS18_MACHINES.hasComposite(f.uid)` par `hasComposite(f)` ; remplacer aussi `drawPortrait(canvas,f.uid,...)`, `ready(f.uid)` et `whenReadyComposite(f.uid,{retry})` par les formes passant **le combattant complet `f`**. Cela permet à deux emplacements contenant le même Gekko de porter des costumes différents. Les appels internes avec une véritable identité de rig restent inchangés.

Étendre le détecteur de portrait natif :

```js
function hasNativePortraitPass10(uid,costume) {
  const api=window.CQC_COMBAT_SPRITES,options={costume};
  return api?.has?api.has(uid,options):api?.status(uid,options)?.renderer==='png';
}
```

Tous ses appels portant sur un objet de combattant deviennent `hasNativePortraitPass10(f.uid,f.costume)`. Une machine transformée par un véritable atlas de costume peut ainsi utiliser ce nouveau corps dans le portrait, le match et le chargement, même si son corps original est un rig.

Dans la création des métadonnées de replay Versus, remplacer le test limité à `costume==='nextgen'` par :

```js
(state.a.f.costume && state.a.f.costume!=='original') ||
(state.b.f.costume && state.b.f.costume!=='original')
```

Dans `core-v032.html`, le validateur des replays ne doit plus accepter exclusivement `original` et `nextgen` pour six identités. Une option enregistrée doit être acceptée pour le bon UID :

```js
costume==='original' ||
window.CQC_PASS19_COSTUMES.selectable('core__'+(slot?o.opponent:o.player),costume)
```

Conserver les contrôles préexistants du type de tableau et du nombre de deux costumes. Le costume `original` reste permis pour les anciens boss/replays hors du registre de combattants.

Le portrait Core doit faire son test machine avec `{uid:'core__'+id,costume:...}` et transmettre ce même objet à `drawPortrait`, en employant exactement la même décision de costume/emplacement que l’appel immédiatement suivant à `CQC_PASS17_CORE_COSTUMES.drawPortrait`. Les portraits d’archives et de listes restent explicitement `original` ; les deux portraits de sélection portent le choix de leur propre emplacement. Ne pas utiliser un choix global par UID pour déduire l’emplacement.

Dans le helper Core `cqc-pass16-core-sprites.js`, `machineJobs(options,hooks)` peut filtrer les identités après avoir conservé leur emplacement :

```js
const ids=hooks.actorIDs?.(options)||[options.player,options.opponent];
return [...new Set(ids.map((id,slot)=>({
  id,uid:'core__'+id,costume:options.costumes?.[slot]||'original'
})).filter(f=>!imported(f.id,hooks)&&root.CQC_PASS18_MACHINES?.hasComposite(f))
  .map(f=>f.uid))];
```

Cela évite de charger le rig original lorsqu’un véritable costume de sprites le remplace. Le gate de costumes fourni ici charge seulement les alternatives de sprites ; le gate machine historique continue de charger les véritables pièces des présentations pixelisées.

## Atlas originaux, provenance et échelle

`CQC_PASS19_COSTUMES.registerBatch([{uid,option}])` inscrit un lot atomique après validation. Un costume original a `family` parmi `cyborg`, `survive`, `metalgear`, `tuxedo`, `retro`, `nextgen`, un `sprite` complet avec deux directions natives, et :

```js
sprite.costumeConcept={schema:'cqc.costume-design/1',sourceUID:uid,
  family:'cyborg',originalDesign:true,canonicalAppearanceAttested:false};
option.provenance={kind:'original-character-costume',sourceUID:uid,
  originalDesign:true,canonicalAppearanceAttested:false,sources:[{url:'https://...',scope:'...'}]};
option.assetReview={status:'verified',independentArt:true,reviewer:'...',reviewedAt:'...'};
```

Le renderer distingue `validateEntry` des corps canoniques de `validateCostumeEntry` des créations originales. Il ne change pas la qualification canonique d’un corps de base pour autoriser un concept de costume. Les 7 variantes historiques restent acceptées telles quelles.

Les autres provenances sont `canonical-game-costume`, `historical-incarnation`, `official-remake-appearance`, `body-transformation`, et `style-reinterpretation`. Les trois catégories d’apparence portant sur d’autres corps indiquent le `sourceSpriteUID` exact ; elles ne deviennent pas artificiellement des tenues officielles du jeu cible. Les apparences canoniques restent une recherche partielle : le registre n’affirme pas que toutes les tenues existantes ont été retrouvées.

Une `option.physicalExtent={metres,evidence,sources,...}` approuvée alimente `CQC_PASS19_COSTUME_HEIGHTS[uid][id]`. Les variantes corporelles ordinaires héritent de leur personnage ; les formes Metal Gear personnalisées nécessitent une estimation séparée. Le draw Core emploie `CQC_PASS19_WORLD_SCALE.displayHeightFor(uid,id,'core',entry)` et marque `worldScaleApplied:true` après l’application, afin d’éviter deux mises à l’échelle.

Les flashs, flammes et projectiles liés à l’arme doivent employer une origine revue pour **l’atlas et le cadre du costume**, ou être supprimés tant que cette revue manque. Une origine du corps original ne suffit pas par UID seul.

## Composition de pièces natives

Le contrat complet est `CQC_PASS19_COSTUME_PARTS.contract()`. `sprite.costumeParts` exige de vrais PNG transparents avec SHA-256/dimensions, un plan de corps et deux signatures propres au personnage, une palette, et un binding anatomique revu pour chaque cadre physique dans les deux sens. Le corps original peut servir de support aux pièces réellement dessinées ; aucune simple teinte ni metadata ne représente une conversion produite. Toutes les pièces sont décodées par le pool du renderer avant le lancement. Une pièce absente interdit le dessin du costume et sa disponibilité. Les cadres composés n’impliquent pas automatiquement articulation ou destruction des morceaux.

## Ajout des nouvelles identités

Après approbation et configuration du vrai corps natif, créer les demandes :

```js
const record=CQC_PASS19_COSTUMES.createRosterRecord({uid,name,game,
  basePresentation:'nextgen',nativeBody:'sprite',
  cyborgIncarnation:false,alreadyMechanical:false,surviveIncarnation:true});
CQC_PASS19_COSTUMES.addRoster([record]);
CQC_PASS19_RETRO_PRESENTATIONS.registerAll();
CQC_PASS19_MACHINE_PIXEL_STYLE.registerAll();
```

Les trois indicateurs doivent venir de l’incarnation approuvée. Les rôdeurs de Survive sont déjà natifs de Dité ; les Gekko sont déjà mécaniques ; un opérateur sous une boîte Peace Walker demeure biologique. L’API refuse une nouvelle identité dépourvue de corps natif accepté.

## Census et vérification

Baseline : 355 identités, 338 sprites et 17 rigs. 76 corps actuels utilisent le rendu ancien ; 279 utilisent un corps peint ou un rig. 262 alternatives pixelisées de sprites et 17 de machines sont des **présentations originales**, sans nouvelle PNG ni prétention d’extraction officielle. Six Next Gen historiques complètent déjà six anciens corps ; la septième variante historique est l’alternative A/B d’Elsie/Frances, dont l’ancien ID `nextgen` est conservé.

Les conversions cyborg excluent 27 corps déjà cyborg ou entièrement mécaniques. Sam, les humains Raiden VR/MPO Plus, FOX Plus, Olga en exosquelette, Skulls, Armstrong et Venom demeurent éligibles aux conversions complètes. Les variantes Survive excluent 15 incarnations déjà natives de ce jeu.

`COSTUME_ROUTING_ACTUAL_CODE_QA_V2.json` passe 11 cas de routage, stockage indépendant, annulation, absence de fallback, validation de provenance et dessin de vraies sources de pièces via doubles d’images décodées. `RETRO_REGISTRATION_ACTUAL_CODE_QA_V3.json` passe 262 inscriptions de sprites + 17 de machines et exécute effectivement la route de canvas pixelisé. Ces preuves portent sur le code, pas sur l’attestation visuelle de nouvelles PNG. La revue navigateur de pixels, poses, clipping et échelle dans l’application intégrée reste nécessaire.

L’ancien helper rétro V1 a demandé par erreur une alternative rétro pour Solid Snake déjà rétro ; l’échec et le helper restent conservés. V2/V3 corrigent ce cas de test en utilisant Sam peint. Les rapports V2 de routage et V3 rétro sont créés sans écrasement, en mode lecture seule. Les SHA finaux des modules sont dans `DELIVERY_MODULE_HASHES_V1.json`.
