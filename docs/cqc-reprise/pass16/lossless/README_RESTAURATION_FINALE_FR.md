La conservation PASS16 est complète pour les 18 racines explicitement fermées par Root : producteurs, candidats et corrections, intégration, sélection, audit et preuves navigateur, y compris les essais rejetés. Elle contient 1 264 fichiers et 61 répertoires, ainsi que l’artbook MPO intégral et sa provenance. Aucun pixel natif ou fichier source n’a été transformé.

Le payload unique conservé dans les 19 ZIP représente **128 507 462 octets**. Les ZIP totalisent **128 772 774 octets**, chacun sous 8 Mio. Les contenus déjà présents dans `public/cqc/` sont reconstruits depuis leurs chemins Git avec vérification SHA-256 : **79 255 315 octets** ne sont pas dupliqués dans les ZIP. Les 84 chemins originaux ImageGen sont également pinnés et reconstructibles.

`LOSSLESS_MANIFEST_V1.json` décrit les fichiers, les métadonnées, les fragments et les références Git. Les ZIP sont déterministes, sans compression (`STORED`) ; un original de plus de 8 Mio est fragmenté puis reconstruit sans perte. La restauration doit utiliser un checkout du commit qui contient ce pack et les PNG runtime correspondants. Les chemins Git sont pinnés par leur SHA, donc une version différente est refusée.

Placer les 19 ZIP et le manifeste dans un même dossier. Utiliser un nouveau dossier de restauration, sans écrire sur les chemins historiques ni sur un dossier existant :

```bash
mkdir -p /tmp/cqc-pass16-preservation
python -B /chemin/du/pack/preserve-pass16.py restore \
  --manifest /chemin/du/pack/LOSSLESS_MANIFEST_V1.json \
  --repository /chemin/du/checkout-git \
  --target /tmp/cqc-pass16-preservation/restauration-v1 \
  --max-bytes 536870912
```

Chaque racine est reconstruite sous son identifiant dans la fixture. Les deux fichiers externes, dont le ZIP complet de l’artbook, se trouvent sous `external/`. Les chemins originaux ImageGen sont conservés comme alias sous `aliases/`, avec les octets d’origine ; les chemins absolus historiques ne sont jamais remplacés.

Les preuves réelles sont `final-restore-fixture-v1-RESTORE_PROOF_V1.json` et `ACTUAL_FINAL_SOURCE_RESTORE_EQUALITY_V1.json`. La restauration a contrôlé les 19 CRC d’archives, les SHA et les octets de 1 266 fichiers, puis 84 alias. Une comparaison exhaustive avec les sources réelles a confirmé tous les octets ainsi que les modes, atime et mtime des fichiers, des 61 répertoires et des 18 racines. Le ZIP MPO restauré conserve ses 72 membres avec leurs CRC internes valides. Les références runtime ont été lues depuis Shadow `public/cqc/`, sans écriture runtime.

Les UID/GID et ctime d’origine restent inventoriés. Ctime ne peut pas être fixé par une restauration ordinaire et aucun privilège n’est demandé pour changer le propriétaire. Les helpers utilisent `O_NOATIME` pour lire les sources sans actualiser leur date d’accès. Ils ne chargent ni n’exécutent de code téléchargé.

Le pack conserve les qualifications de fidélité des producteurs et de l’audit. Clown correspond à son déguisement canonique de Teliko. L’atlas natif de Cunningham contient le corps humain ; Core conserve sa plateforme et son échappement existants, sans fusil inventé. Les keyposes réutilisées, les adaptations de mouvements et les détails non attestés restent documentés. Cette conservation ne certifie pas un 1:1 absolu ni une campagne originale complète.

Les fixtures synthétiques historiques du helper restent conservées localement. Leurs reçus et leurs scripts sont distincts des preuves de restauration réelle ; ils ne constituent pas des preuves de gameplay. Les preuves de gameplay réellement obtenues, y compris les échecs et corrections, sont préservées dans les racines navigateur du pack.
