# Ground Zeroes — portraits 1975

Deux planches OpenAI ajoutent douze portraits WebP 512 × 512, dans l’ordre neutral, serious, warning, calm, humor, glitch. Elles corrigent les slots du contexte Ground Zeroes qui réutilisaient Miller et Pequod de The Phantom Pain. Les anciens assets 1984 sont conservés.

- `mgsv-miller-gz-openai-sheet.png` → `public/portraits/mgsv/miller_gz/` : cheveux blonds rejetés en arrière, lunettes aviateur, veste olive et haut sombre. Pas de béret, trench ni cravate de la tenue 1984.
- `mgsv-morpho-openai-sheet.png` → `public/portraits/mgsv/morpho/` : casque clair, visière sombre, micro, vêtement de vol olive. Morpho reste distinct de Pequod.

Génération via l’outil OpenAI intégré. Les prompts exacts et les références sont dans `ground-zeroes-prompts.json` ; les SHA-256 des deux sources et douze exports sont dans `ground-zeroes-provenance.json`. Import mécanique avec `scripts/splitCodecPortraitSheet.py`, sans dessin de remplacement programmatique.

## Références et limite de fidélité

La [chronologie Konami](https://eu-support.konami.com/hc/en-gb/articles/9822379926423-Backstory-What-is-the-timeline-of-the-events-that-precede-Metal-Gear-Solid-V-Ground-Zeroes-and-Metal-Gear-Solid-V-The-Phantom-Pain) distingue les périodes MSF et Diamond Dogs. Le costume GZ de Miller est contrôlé à partir de ses représentations de cette période.

La [capture cockpit de Morpho](https://vignette3.wikia.nocookie.net/metalgear/images/3/37/Morpho.jpg/revision/latest?cb=20150417151104) a été affichée dans Chromium, sans téléchargement. Le [concept de l’équipage 1975](https://i.pinimg.com/originals/90/8a/0a/908a0a20cb925fac622d20d3b4a0a3a3.jpg) montre le pilote à droite, de dos, avec casque clair et blouson vert ; le personnage MED à gauche est le médecin. Ces références ne permettent pas de certifier un visage frontal précis. Le visage sombre du portrait est donc une adaptation prudente, non une ressemblance faciale officielle certifiée.

Les six états de Morpho varient principalement par la posture et la transmission, sans dévoiler de visage inventé. Les deux sujets ont été inspectés visuellement pour l’identité d’époque, le cadrage et les six cases. Ces œuvres fan-made ne sont ni des extractions du jeu ni une promesse de reproduction 1:1.
