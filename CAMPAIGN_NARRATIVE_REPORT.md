# Campaign Presentation & Narrative Events — v1.9.0

## Objectif

La Passe 20 ajoute une couche de présentation narrative au-dessus du graphe Campaign Ops sans détacher l’histoire de la progression réelle. Chaque carte affichée provient de l’état du slot actif : campagne lancée, chapitre accessible, opération terminée, branche choisie, variable atteinte ou fin découverte.

## Présentations

`CampaignPresentationOverlay.tsx` prend en charge :

- cartes plein écran ;
- titres, sous-titres, speaker et tons visuels ;
- texte principal ou séquences multi-beat ;
- emphases normal, quiet, urgent et classified ;
- progression manuelle ;
- archivage après confirmation ;
- choix de branches sous forme de cartes dédiées ;
- galerie des fins avec épilogues rejouables.

## Déclencheurs narratifs

Les événements peuvent réagir à :

```text
campaign_start
campaign_complete
chapter_start
chapter_complete
node_complete
branch_choice
ending_achieved
variable_condition
```

Ils peuvent aussi vérifier n’importe quelle condition Campaign Ops existante et appliquer des mutations persistantes.

## Variables persistantes

Types pris en charge :

```text
string
number
boolean
```

Opérations :

```text
set
increment
decrement
toggle
```

Les conditions `variable_compare` acceptent `eq`, `neq`, `gt`, `gte`, `lt` et `lte`.

## Sauvegarde

Campaign Progress schema 3 ajoute :

```text
variables
seenPresentationIds
presentationHistory
```

L’historique est isolé dans chacun des trois slots. New Game+ réinitialise les scènes du nouveau cycle tout en conservant l’archive des présentations et les fins déjà découvertes.

## Statistiques

Le dossier de campagne agrège :

- nœuds et objectifs optionnels terminés ;
- branches choisies et fins obtenues ;
- récompenses et améliorations ;
- appels Codec ;
- missions Side Ops et VR, ranks, scores et temps ;
- cassettes écoutées ;
- dossiers Lore consultés ;
- cycles New Game+.

## Campaign Builder

Le Builder schema 2 peut créer et exporter :

- briefing/debriefing de campagne ;
- briefing/debriefing de chapitre ;
- carte de fin d’opération ;
- carte de décision de branche ;
- épilogue de fin ;
- variables initiales ;
- événements narratifs conditionnels ;
- mutations de variables.

La validation détecte les IDs d’événements dupliqués, cibles absentes, conditions invalides, mutations sans variable et dépendances externes utilisées par les événements ou conditions additionnelles.

## Correctif d’intégrité

Les mutations liées à une opération sont appliquées lors de la validation de sa récompense. La présentation de fin d’opération ne les exécute pas une seconde fois.
