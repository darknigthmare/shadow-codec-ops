# Raiden MGR — costume officiel Cyborg Ninja : candidats V1, HOLD

Deux générations indépendantes ont été réalisées après visualisation de l'image officielle Konami et des deux atlas de base. Les prompts exacts sont conservés dans ce dossier. Aucun PNG n'a été édité par script, aucun produit ni fichier Git n'a été modifié. Les copies `/tmp` sont strictement identiques aux sorties imagegen, dont les originaux sont conservés.

## Références et qualification

- Image primaire : `https://www.konami.com/mg/archive/mgr/jp/special/_img/dlc2_pic1.jpg`, copie `/tmp/cqc-pass39-canonical/refs/cyborg-ninja-konami.jpg`, SHA256 `5654690aeeeb4aec6e44da60499379d16e7b644f1515bbf162080e1934967562`.
- Atlas sources : `/workspace/cqc-pass21-application/public/cqc/assets/combat-sprites-pass18/core__raiden/right-v1.png` et `left-v1.png`.
- C'est le déguisement DLC officiel de **Raiden**, même jeu et corps de Revengeance sorti en 2013, période diégétique post-prologue 2018. Aucun UID Gray Fox, corps MGS4 ou incarnation R00 n'est introduit.
- Le petit rendu officiel atteste les surfaces visibles ; il ne certifie pas toutes les surfaces cachées de ces deux caméras natives redessinées.

## Sorties exactes

| Face | PNG candidat | Source conservée | Octets / SHA256 |
| --- | --- | --- | --- |
| Droite | `right-v1.png` | `/workspace/generated_images/exec-09d5c17f-8e96-420d-af7e-ce88581b6b45.png` | 1 641 400 / `b6dee712606b39181b2b0c21098cd2b5c777816012aaba119ce9ad38359dd7e9` |
| Gauche | `left-v1.png` | `/workspace/generated_images/exec-6275cb7a-bea7-4f09-901a-3290aa32cc66.png` | 1 641 660 / `87dc8b1ec56f4a7961dd1afa976dbed7292eed3ac044c00f172982ca9b78213a` |

Les deux PNG sont RGBA 1254×1254, avec 16 corps physiques séparés par face et zéro pixel alpha>16 sur les quatre bords. Cela prouve 32 corps dessinés, pas une animation finale complète ni un atlas admis. La nouvelle silhouette reprend le casque gris fermé, un œil rouge central, aucun visage ou cheveu humain visible, le torse bleu-pétrole/acier et les plaques jaune-or. Les phases de saisie, grenade, chute et récupération possèdent des corps entiers. Les directions effectives des coups 6/9 sont cohérentes avec la face.

## Défauts concrets empêchant l'admission

1. **Gauche index 7** : coup de pied latéral haut recopié du geste du base, au lieu de la glissade basse avec lame demandée. Ne pas le déclarer comme low-slide. Le profil natif exact doit ensuite confirmer les actions qui exploitent cet index ; conserver cette incohérence comme HOLD tant qu'elle n'est pas résolue.
2. **Rectangles englobants contaminés par une figure voisine** : le dessin 4×4 ne dispose pas d'une séparation rectangulaire assez grande pour certains gestes. Par exemple, la composante droite de thrust index 6 occupe `[618,437,434,240]`, et la glissade index 7 `[942,521,311,159]`. Les composantes alpha sont distinctes, mais leur simple rectangle englobe des pixels d'une autre figure. Les compteurs par frame sont dans `MANUAL_POSE_REVIEW_V1.json`. Ne pas copier les rectangles de base, masquer les voisins, ou prétendre que 16 composantes séparées suffisent à rendre ces rectangles utilisables.
3. Les corps droits 3 et 7 approchent à un pixel du bord droit : aucun pixel alpha>16 n'est coupé à la bordure, mais les marges demandées de 32px n'ont pas été respectées. À reprendre avec une vraie marge, sans tasser l'anatomie.
4. De petites franges cyan/or apparaissent le long de certaines lames et contours, surtout garde haute gauche. Revoir sur fonds clair/sombre avant admission ; aucune retouche raster n'a été faite.
5. Les neutres ont des hauteurs alpha16 différentes (343px droite,317px gauche). Ce n'est pas une preuve de taille humaine différente : chaque face demande sa calibration de stature debout et son bassin/pivot, puis la comparaison réelle de preview. Les bounds physiques ne doivent pas être réutilisés comme hauteur par pose accroupie.

Les mesures détaillées d'alpha et de composantes figurent dans `RASTER_MEASUREMENTS_V1.json`. `MANUAL_POSE_REVIEW_V1.json` assigne manuellement les 16 identités de pose et mesure les rectangles ; ce n'est pas un descriptor runtime approuvé. Aucun socket, pivot ou effet n'a été certifié par cet audit.

## Reprise recommandée

Redessiner les poses touchées sur des pages séparées suffisamment espacées avec un neutre de calibration de la même caméra. Pour les grands gestes, une image indépendante par corps élimine la capture du voisin sans découpage destructif ; une nouvelle page 4×4 peut aussi fonctionner avec une stature cohérente réellement plus petite dans tous les corps, mais demande une nouvelle génération complète et une revue de tous les gestes. La glissade gauche doit être une nouvelle pose native. Garder les deux V1 HOLD comme sources archivées ; admission uniquement après une source rectangulaire pure, mesures exactes, contre-vérification officielle et preuves de contrat/UI/match.
