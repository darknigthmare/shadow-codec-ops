# P68 — Survive : Balloon Trap

Deux appels imagegen, deux sorties brutes : **V1 retenue**, V2 de correction alpha archivée. Le [PNG individuel retenu](../../../../../public/cqc/assets/p68/survive-balloon-trap.png) mesure 1536 × 1024 et occupe 1 703 307 octets. Aucun pixel généré n’a été retouché par script.

## Référence

La capture native [220401_12](https://img.atwiki.jp/mgsurvive/attach/111/98/220401_12.jpg), liée depuis la [page communautaire source](https://w.atwiki.jp/mgsurvive/pages/111.html), montre le gadget à droite de l’avatar avec le libellé `バルーントラップ`. La [fiche des gadgets](https://w.atwiki.jp/mgsurvive/pages/81.html) confirme le nom. Ce sont des sources communautaires, sans revendication d’image officielle Konami.

La [copie locale](references/native-balloon-trap-220401_12.jpg) a été récupérée octet pour octet depuis le commit P66 après la perte temporaire du dossier `/mnt/data`. Son SHA Git reste `2622177ae31c7c46e7c30693d6276033b6345560`. Le chemin original utilisé par imagegen était valide lors de la première génération ; le handoff conserve ce fait et les chemins historiques.

## Revue du halo et décision

Un large halo gris/olive a été signalé dans l’aperçu de l’outil. Une seule retouche ciblée a été réalisée. La lecture quantitative a ensuite établi que les plages larges échantillonnées contenaient déjà un **alpha nul** dans V1 : leur couleur RGB est invisible avec une composition alpha correcte. Cela ne valide pas un parcours navigateur.

Une faible frange persiste : dans V1, 1 521 pixels situés à plus de 8 px du masque alpha >128 ont un alpha de 1, dont 498 à plus de 32 px. V2 réduit cette frange, mais change des microtextures sans résoudre un large halo effectivement établi dans l’alpha. La revue conserve donc V1 et archive [V2](archive/survive-balloon-trap-v2-alpha-attempt.png). Les deux versions gardent un alpha maximal natif de 254/255 et aucun pixel alpha >16 sur les bords.

## Portée

Le corps olive facetté, les détails frontaux, le creux ovale, la collerette et les supports noirs bas suivent la capture. Une portion du support gauche, masquée par l’avatar, est reconstruite par continuité. Les proportions, l’implantation complète des supports, les rivets et la plaque supérieure restent à confronter à une seconde vue. Aucun certificat absolu 1:1, animation, collision ou admission au combat n’est attribué au PNG.

Les états de déploiement, gonflage, câble, capture, élévation, retour et disparition restent ouverts. La grande barricade de bois présente dans une autre capture n’a pas été produite, car sa structure est occultée. Aucun ancien refus n’a été relancé.

## Preuves

- [Handoff : sources, prompts exacts, hashes, décisions et récupération](handoff.json)
- [Mesures alpha, échantillons RGBA et frange](pixel-qa.json)
- [Prompt V1](prompt-balloon-trap.txt)
- [Prompt de retouche V2](prompt-balloon-trap-v2-alpha.txt)

Les deux blobs PNG ont été envoyés au dépôt sans création d’arbre, de commit ni déplacement de branche par cet agent. L’intégration des registres centraux est confiée au root.
