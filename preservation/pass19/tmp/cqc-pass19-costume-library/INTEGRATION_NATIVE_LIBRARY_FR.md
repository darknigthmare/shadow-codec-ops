# Bibliothèque native chargée à la demande

Module supplémentaire ; aucun module final livré dans `/tmp/cqc-pass19-costume-system` ni fichier de l’APP n’a été modifié. Le catalogue des sept premières variantes reste statique. Les sources et rapports précédents restent conservés.

## Ordre et place des fichiers

Après le renderer final, les anciens costumes, le registre pass19 et les adaptateurs Core/machines, charger :

```html
<script src="../src/cqc-pass19-native-wardrobe-index.js"></script>
<script src="../src/cqc-pass19-native-wardrobe-library.js"></script>
<script src="../src/cqc-pass19-native-wardrobe-ui.js"></script>
```

Le premier index prêt à copier est `packaged-solid-cyborg-v1/cqc-pass19-native-wardrobe-index.js`. Il ne contient qu’une vraie variante produite et revue : Snake cyborg, six atlas indépendants et 72 poses. L’index occupe 2 422 octets de JS contre 9 503 225 octets d’images natives. Les quelque 1 447 demandes artistiques restantes ne sont jamais copiées dans l’index. Les nouvelles variantes réellement achevées doivent être ajoutées par un nouveau lot revu.

`CQC_NATIVE_WARDROBE` est créé automatiquement si `CQC_PASS19_COSTUMES`, `CQC_COSTUMES_PASS17` et `CQC_COMBAT_SPRITES` existent. Le chemin des sprites reste relatif à la racine CQC ; si le JS est déplacé hors de `/cqc/src`, créer explicitement la bibliothèque avec son `baseURL`. Une seule bibliothèque doit posséder un même renderer. Les instances QA utilisent des contextes isolés.

Ne pas charger simultanément le gros JSON complet du même costume dans le module d’options originales si le but est de le rendre paresseux. Le loader peut adopter une option statique strictement identique au contenu SHA épinglé ; il ne remplace jamais une option du même ID avec un autre contenu. Les sept anciennes variantes, toutes les autres apparences déjà enregistrées et le registre de demandes restent en place.

## Crochet « Vestiaire »

L’UI ajoute un bouton auprès de chaque choix de costume existant. Elle n’affiche que les options physiquement produites/revues de cette incarnation, sans nombres de développement ni propositions pending. Une entrée vide masque le bouton. L’aperçu ne récupère qu’un atlas source ; Équiper attend toutes les métadonnées et tous les atlas nécessaires. Annuler interrompt sa demande. La tenue actuelle reste choisie pendant le chargement.

```js
const library = CQC_NATIVE_WARDROBE;
const ui = CQC_NATIVE_WARDROBE_UI.create({library});
library.bindSlots({
  getFighters: () => [currentPlayerFighter(), currentOpponentFighter()],
  onCommit: ({slot, fighter}) => {
    // Mettre à jour l’acteur/aperçu privé existant, puis rafraîchir les commandes.
    updatePrivateFighter(slot, fighter);
    refreshSelection();
  },
  onError: ({error}) => showWardrobeError(error.message)
});
const playerWardrobe = ui.mountSlot(playerCostumeContainer, 0, currentPlayerFighter);
const opponentWardrobe = ui.mountSlot(opponentCostumeContainer, 1, currentOpponentFighter);
// Après changement de personnage :
playerWardrobe.refresh();
opponentWardrobe.refresh();
```

Les trois fonctions de mise à jour ci-dessus sont les fonctions locales du menu concerné ; l’UI n’invente pas une deuxième source d’état. `library.select(slot, uid, id, {signal,retry})` renvoie `{committed:true}` seulement après les vérifications et le décodage. Le choix privé est écrit par l’ancien `CQC_COSTUMES_PASS17.select`, préservant les deux slots et la sauvegarde historique. Ne pas appeler cet ancien `select` pour forcer une entrée dormante : le garde renvoie `false`.

Le hook `getFighters` doit renvoyer les acteurs actuels, au moins `{uid,costume}`. Il protège l’ancien corps pendant que la nouvelle tenue se prépare et empêche un retour tardif d’équiper un personnage que l’utilisateur a remplacé. `onCommit` peut actualiser les acteurs Core via les mécanismes pass17 existants, ou reconstruire les aperçus Versus. Si le menu est démonté, appeler les `remove()` des boutons puis `ui.dispose()`.

## Matchs et replays

Les choix issus du Vestiaire sont déjà décodés avant leur application : les portes de chargement existantes continuent donc de fonctionner. Pour un replay/import contenant un ID paresseux connu qui n’a pas encore été chargé, l’acceptation d’ID doit autoriser `library.known(uid,id)` sans le normaliser vers `original`, puis attendre :

```js
const ready = await library.prepareSlots(replayFighters, {
  owner: 'versus-replay', signal: replayAbort.signal, retry: true
});
if (ready.ready) startMatch(ready.fighters);
// Si un départ est remplacé ou annulé :
library.cancelPreparation('versus-replay');
```

Cette porte conserve les options de costume des deux acteurs sans écrire de nouveaux choix privés. Un résultat périmé ne peut pas démarrer. Elle réutilise ensuite `CQC_PASS19_COSTUMES.prepareSlots`. Marquer les deux corps de tout match actif avec `library.setActiveFighters([player,opponent])`, notamment après un chargement de replay ou un changement d’écran. Les chemins de portrait/machine doivent toujours recevoir le combattant entier ou `{costume}`, comme dans la première architecture livrée.

Le renderer demande explicitement une entrée paresseuse non prête : `getEntry` renvoie `null`, `draw/drawFitted` renvoient `false`, `has` reste `true` parce qu’une vraie source revue existe. Le Versus actuel utilise `hasNativePortraitPass10(uid,costume)` pour éviter le corps procédural et afficher son chargement. Les adaptateurs Core renvoient « traité » pour une entrée connue non prête, empêchant le corps historique de clignoter. Les rigs mécaniques ne court-circuitent pas le futur corps PNG d’un costume. Aucun `default` ni `original` ne remplace un costume explicitement demandé mais non prêt.

Une préférence propre au loader garde l’ID et le SHA des métadonnées dans `cqc-native-wardrobe-journal-v1`. `library.restoreSlots(fighters)` restaure explicitement une préférence revue après que le menu a ses deux UID. Il n’équipe rien automatiquement au bootstrap. Une préférence épinglée à un autre SHA est refusée ; l’ancienne sauvegarde des sept variantes demeure intacte.

## Contrat de lot

Le JSON léger est `cqc.native-wardrobe-index/1`, avec `metadataBaseURL` et `assetBaseURL`. Chaque entrée contient UID, ID stable/versionné, label, famille, provenance canonical/original, revue, SHA/bytes des métadonnées, les pins SHA/bytes/dimensions des PNG et un aperçu rect/pivot natif. L’index ne contient aucune géométrie complète ni objet `option`/`sprite`.

Les métadonnées sont `cqc.native-wardrobe-option/1` : `{uid,id,artAuditSHA256,option}`. `option` est le contrat complet de `registerBatch`, y compris `family`, deux sens natifs, provenance, `assetReview`, sources, bornes/pivots/actions et, si nécessaire, `physicalExtent`. Un corps Metal Gear original de 3,4 m doit par exemple donner `physicalExtent:{metres:3.4,evidence:'Original designed extent, estimate',sources:[...]}` : ce champ est propagé au registre d’échelle par `registerBatch`.

Le commit immuable du premier lot est `20a832c8e4c15f11cae1de408c59cbc5931e7477` dans `darknigthmare/shadow-codec-ops`. Les métadonnées ne s’auto-référencent pas au commit qui les contient ; ce commit est ajouté ensuite dans l’index externe. Les URL distantes admises sont uniquement HTTPS `raw.githubusercontent.com/<owner>/<repo>/<40-char-commit>/...` ; les chemins same-origin restent admis. Aucune URL de branche mobile, credentials, cookie, query, redirection ou secret. `fetch` utilise CORS et `credentials:'omit'`.

Le helper `build_native_wardrobe_index_v1.py` lit uniquement les métadonnées, les PNG et le rapport d’audit locaux. Il recalcule les SHA, dimensions physiques, bornes, directions, revue et pin d’audit, refuse un lot incomplet, puis écrit dans un nouveau dossier l’index et son reçu physique. Aucun pixel n’est changé ou supprimé. Le parent publie le lot, relit les blobs distants et fournit le commit épinglé. Les origines de projectile/VFX d’un ancien corps ne sont pas transférées : leurs propres gardes SHA doivent continuer d’exiger des points revus pour la tenue nouvelle.

## Mémoire et erreurs

Les chargements du même UID/ID partagent une seule requête de métadonnées et le même décodage. Deux tenues du même UID restent distinctes. Un consommateur annulé ne supprime pas les autres ; une nouvelle demande après un transport avorté repart proprement. Les PNG sont épinglés et vérifiés avant création d’un Blob/décodage : pas de premier affichage avec une source non vérifiée.

Limites par défaut : 8 entrées paresseuses possédées / 8 Mio de JSON, 64 Mio de Blobs, 3 vérifications PNG simultanées, une métadonnée ≤4 Mio et un PNG ≤32 Mio. Le LRU peut dépasser ses limites souples pour conserver les deux slots, les combattants actifs et les demandes en cours. Il ne supprime jamais les variantes non possédées, dont les sept premières. Le pool décodé du renderer conserve ses limites et protège les mêmes corps. Les PNG sources restent dans le stockage d’origine ; seule une copie mémoire dormante est évincée.

Une erreur SHA, provenance, dimensions, source ou décodage laisse l’ancien choix intact. Le Vestiaire affiche « Tenue indisponible. Réessayer. » ; le retry est explicite. `dispose` ferme les chargements et rend les méthodes qui appartiennent encore à la bibliothèque ; ne pas démonter la bibliothèque tant qu’un match l’utilise. Son index/corpus fait partie de la durée de vie du document.

## Preuves et limites

Le dernier helper code V3 exécute les catalogues et les vrais modules de production avec transport/décodage simulés : douze scénarios de concurrence, SHA, disponibilité, slots, annulation, LRU et replay. Il ne certifie pas l’apparence physique des sources synthétiques.

La preuve navigateur distante V2 utilise les six vrais atlas du commit publié dans un catalogue neuf sans cyborg enregistré : bootstrap avec les sept anciens seulement ; zéro requête RAW initiale ; SHA du JSON puis SHA/dimensions des six PNG ; décodage réel, 72 cadres physiques, quatre vrais dessins, dialogue/aperçu natif, slot0 cyborg et slot1 original ; zéro erreur réseau/exception. Le SHA du script exécuté est relu depuis la réponse CDP, puis comparé au fichier livré. Les réponses RAW présentent `Access-Control-Allow-Origin:*`.

Deux premières tentatives sous Chrome Root9231 ont échoué avant le JSON, `ERR_CERT_AUTHORITY_INVALID` du proxy d’environnement ; leurs rapports immuables restent conservés et montrent aucune mutation de choix. TLS standard du système a ensuite récupéré et vérifié les mêmes métadonnées. Le Chrome de QA isolé n’a fait confiance qu’au SPKI public du CA de proxy existant, indépendamment re-dérivé et approuvé par Root. Aucun trust store, aucun TLS global ni le code de fetch du produit n’a été altéré. Cette qualification reste dans le rapport final. La réussite de chargement/geometry ne certifie pas une fidélité canonique absolue : Snake cyborg est explicitement une création originale.
