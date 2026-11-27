# Client de combat VEILBREAK

`public/cqc/originals/veilbreak/battle.html` charge le module d'équipe P74, le moteur existant `CQCCombat048Pass8` et `veilbreak-content.json`. Le nouveau client gère l'affichage des PNG originaux, les entrées, le contrôle de session et les phases de boss. Il ne remplace pas le moteur par une nouvelle simulation et ne charge pas les catalogues d'assets historiques de v055.

## Fonctions livrées

- Duel, équipes 2v2, versus local et entraînement utilisent les mêmes collisions, coups, ressources, garde, K.O., manches, projectiles et pièges que le moteur partagé.
- L'horloge de simulation avance à 60 Hz. Pause, perte de focus et passage de l'onglet à l'arrière-plan suspendent la simulation. La reprise remet l'accumulateur à zéro et nettoie les touches maintenues.
- Clavier, deux manettes et commandes tactiles se rejoignent dans les mêmes objets d'entrée. Les directions modifient les spéciaux selon l'orientation du personnage. Les zones tactiles ont au moins 44 pixels de hauteur.
- L'entraînement expose une cible immobile, en garde ou CPU, une ressource libre optionnelle, le soin automatique et une réinitialisation. Il n'envoie aucun résultat de campagne.
- Les PNG de combattants sont cadrés à partir de leurs pixels alpha sans modifier les fichiers. Leurs pieds suivent le sol du moteur à `y=568`. Les assistants sont rendus depuis `Engine.onField`, les projectiles depuis leur véritable propriétaire `Engine.owner`.
- Les PNG de pièges/projectiles référencés par `move.asset_id` sont utilisés lorsqu'ils sont admis dans les données avec un statut `generated`, `available` ou `verified`. Un objet sans asset livré reste une primitive de gameplay. Un asset déclaré livré mais introuvable provoque une erreur explicite, comme un combattant ou un fond manquant.
- Le panneau de commandes expose les dix techniques du profil réellement actif. Un bouton affiche les collisions et le sol de simulation.

Les poses de base sont des illustrations statiques. Les déplacements, rotations d'impact, traces de coups et effets sont procéduraux. Les nouvelles animations propres à chaque technique restent à produire ; le client le précise dans l'aide. Les fonds sont des images composites, sans prétendre représenter cinq plans de parallaxe séparés.

### Admission des images et limites de l’arsenal

Le manifeste d’admission final recense **99 images originales** : 70 poses de base et fonds (10 agents, 20 ennemis, 20 boss, 20 stages), 18 props et 11 projectiles. Ces comptes décrivent les fichiers livrés ; ils ne certifient ni des animations complètes ni une inspection navigateur exhaustive de chaque combinaison.

Dans le catalogue, **62 définitions de techniques référencent 21 ID d’arsenal distincts**. Treize de ces ID possèdent un PNG livré. Les huit autres ont `asset: null` et conservent une représentation procédurale dans le combat : `vb_prop_floor_clamp`, `vb_proj_pdw_round`, `vb_proj_precision_round`, `vb_proj_cordon_grenade`, `vb_proj_demining_charge`, `vb_proj_drone_round`, `vb_proj_coupling_charge`, `vb_proj_piledriver_round`. Aucun fichier refusé ou absent n’est présenté comme une illustration achevée. Les autres visuels d’arsenal peuvent servir au dossier, au décor ou à un assemblage futur ; la présence d’une image ne crée pas une nouvelle mécanique de combat.

Les statuts par entrée de `veilbreak-content.json` et d’`image-manifest.json` restent la source de suivi de cette admission.

## Phases et difficulté

Les vingt boss utilisent les contrats `.phases` du JSON : seuils de vie à 100 %, 67 % et 34 %, transitions monotones, choix de coups préférés et modifications des préparations/récupérations futures. La vie et les ressources ne sont pas rechargées au changement de phase. Une attaque déjà lancée conserve son objet `attack.def` ; elle ne raccourcit donc pas sa préparation au milieu du mouvement. Le round suivant rétablit le profil original et la phase initiale.

Le HUD annonce le nom de phase, le signal et la réponse attendue. Il s'agit de signaux textuels et d'un vrai changement de comportement, pas de cinématiques ou d'articulations supplémentaires. Les points faibles visuels décrits dans la bible ne deviennent pas automatiquement des hitboxes distinctes.

Les contrats `controllerRequirements` limitent les entrées de saut et de garde. Une sentinelle stationnaire conserve son ancrage de déploiement, y compris après un relais. Les grands boss utilisent les gabarits de duel `simulationBody` authored dans le JSON. Pour ceux qui exigeraient une caméra élargie à leur taille fictionnelle, l'interface affiche **« Boss : duel à échelle adaptée »**. Leur taille de fiction n'est pas une certification d'échelle dans ce client.

| Difficulté | Décision CPU | Manches gagnantes | Dégâts, vie, ressources |
| --- | --- | --- | --- |
| Recrue | Une nouvelle décision toutes les 6 images ; les actions ponctuelles ne sont pas répétées entre deux décisions | 1 | Profils identiques |
| Normal | Décisions habituelles du moteur | 2 | Profils identiques |
| Vétéran | Décisions habituelles du moteur | 3 | Profils identiques |

Le versus local utilise deux manches gagnantes. L'entraînement n'a pas de limite de temps. Aucun multiplicateur caché de dégâts, de vie ou de ressource n'est lié à la difficulté.

## Protocole du portail

Le client attend des messages de son véritable `parent` et de la même origine que la page. Un message provenant d'une autre fenêtre, de lui-même ou d'une autre origine est ignoré. Le jeton de requête est enregistré avant le chargement des images, afin que Quitter puisse fermer la bonne session même après une erreur réseau. Le jeton de résultat reste nul tant que le combat n’est pas validé ; un échec de configuration ne conserve pas celui d’un ancien combat. Le jeton est une chaîne de 1 à 160 caractères alphanumériques, points, tirets, deux-points ou underscores. Les UID d'acteurs et de stage, le mode, la difficulté, la graine et les compositions d'équipes sont validés avant le chargement.

```js
// Enfant → parent, après chargement du catalogue.
{ type: 'vb-ready' }

// Parent → enfant.
{
  type: 'vb-start',
  token: 'session-unique',
  config: {
    fighterId: 'vb_latch',
    reserveId: 'vb_switchback',
    opponentId: 'vb_breakwater',
    opponentReserveId: 'vb_pale_current',
    stageId: 'vb_stage_customs_causeway',
    mode: 'cpu',             // cpu, local ou training
    difficulty: 'normal',   // recruit, normal ou veteran
    duo: true,
    seed: 450194
  }
}

// Enfant → parent, une fois par combat terminé.
{
  type: 'vb-result',
  token: 'session-unique',
  result: { winner: 0, frames: 1234, metrics: {}, mode: 'cpu' }
}

// Enfant → parent, sortie demandée.
{ type: 'vb-exit', token: 'session-unique' }
```

Le portail reste responsable de la progression et de la déduplication du jeton. Le client possède aussi un bouton de retry local ; le parent peut fermer l'iframe dès le résultat accepté. Aucune écriture de progression n'est réalisée directement depuis ce client.

En ouverture autonome, les mêmes noms de paramètres sont acceptés en query string, avec `duo=1` pour les équipes. Sans paramètres, le client choisit deux des combattants originaux du catalogue et le premier stage. `window.VeilbreakBattle.snapshot()` expose une copie de diagnostic sans fonction de mutation du combat.

## Preuves et vérifications

```sh
node --test scripts/test-cqc-p74-tag-team.mjs scripts/test-cqc-p74-veilbreak-controller.mjs
```

**21 tests réussis :** les seize tests du moteur/équipe et cinq tests du contrôleur du client. Les fonctions de contrôle sont extraites du véritable `battle.js` et exécutées avec le moteur de production. Les vingt boss sont parcourus pour vérifier les seuils, la monotonie, l'attaque en cours, les ressources et le reset de round. Les autres tests couvrent les contraintes stationnaires, la validation des configurations, les entrées de la difficulté recrue et l'émission unique du résultat.

Le test navigateur reproductible est `scripts/test-cqc-p74-veilbreak-client.mjs`. Il accepte `CQC_PLAYWRIGHT_MODULE`, `CQC_BROWSER_PATH` et `CQC_QA_OUTPUT` comme le harness d'équipe. Il démarre le serveur et Chromium dans le même processus.

La première vérification réelle avec **Chromium 158.0.8127.0** a réussi sept contrôles : chargement des quatre combattants et du fond PNG, déplacement au clavier et projectile infligeant des dégâts, relais et assistance, pause/reprise, mise en page mobile de 390 pixels, puis handshake/configuration/sortie en iframe avec rejet d'un message provenant de l'enfant. Le septième contrôle impose volontairement un PNG404 après `vb-ready` : l’erreur apparaît, Quitter retourne le jeton attendu et aucun résultat n’est émis. **Zéro erreur de page et zéro erreur réseau inattendue** ont été relevées pendant cette séquence. L'inspection visuelle a également permis de corriger un texte de préparation qui restait visible à tort dans l'entraînement.

Cette séquence a été **relancée après la correction de l’orientation native des projectiles** (`battle.js`, blob `c94832930a60f5e8f77cc0222c4001316b572d85`) et avec le catalogue final. Les sept contrôles ont de nouveau réussi, avec zéro erreur JavaScript et zéro erreur réseau inattendue ; le PNG404 volontaire valide toujours la sortie de la bonne session.

Les captures et le rapport conservés dans `evidence/veilbreak-client/` proviennent de cette dernière exécution. Elles montrent les poses de base et le client réel. Cette séquence précise utilise les personnages et un stage ; les fichiers ennemis/boss et objets sont admis séparément, et les phases sont vérifiées par les tests de contrôleur. Elle ne doit pas être présentée comme une inspection visuelle exhaustive de toutes les combinaisons des cinquante profils et vingt stages.
