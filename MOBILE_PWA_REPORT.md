# Shadow Codec Ops — Mobile/PWA Report v1.6.0

Validation effectuée le **2026-07-10**.

## PWA build

- stratégie `vite-plugin-pwa` : `generateSW` ;
- mise à jour contrôlée par prompt ;
- mode standalone ;
- orientation paysage recommandée ;
- raccourcis : Codec, Side Ops, VR Missions et Mission Builder ;
- service worker : `dist/sw.js` ;
- Workbox généré correctement ;
- `56` ressources précachées ;
- cache initial : environ `2205.30 KiB`.

## Mission Builder sur mobile

- le module reste installable et accessible hors ligne ;
- le stage utilise un conteneur scrollable horizontalement ;
- les événements Pointer permettent la sélection et le drag sur souris/stylet/tactile ;
- le Builder est destiné en priorité au desktop ou à une tablette en paysage ;
- les petits écrans portrait conservent l’accès aux données mais ne sont pas la cible ergonomique principale de l’éditeur.

## Gameplay tactile

Le HUD tactile partagé Side Ops/VR reste compatible avec les missions créées dans le Builder :

- mouvement gauche/droite ;
- accroupissement ;
- saut ;
- tir ;
- CQC ;
- chaff ;
- ration ;
- Codec ;
- marche tactique ;
- confirmation/annulation.

## Validation automatique

```text
npm run lint       PASS
npm run test       PASS — 7 fichiers, 23 tests
npm run build      PASS
npm run pwa:check  PASS
npm run qa         PASS
```

## Tests matériels recommandés

- drag d’entités sur tablette tactile paysage ;
- import d’un pack depuis le sélecteur de fichiers Android/iOS ;
- playtest d’une mission custom au gamepad Bluetooth ;
- mise hors ligne après une première ouverture du Builder ;
- safe areas et navigation sur appareils à encoche.
