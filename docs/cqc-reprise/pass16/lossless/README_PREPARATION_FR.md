Le helper conserve les octets des sources PASS16, y compris les versions rejetées, les prompts et les références. Aucun fichier producteur ou runtime n’est modifié. Les archives finales attendent le GO explicite de Root et les reçus de fermeture de chaque racine.

`preserve-pass16.py` inventorie chaque fichier et répertoire : chemin historique, taille, SHA-256, mode, UID/GID et dates nanosecondes. Les contenus identiques partagent une seule entrée. Les PNG natifs déjà présents dans le runtime sont reconstruits depuis leurs chemins Git `public/cqc/…`, avec vérification de leur SHA ; les masters et rejets distincts restent dans les ZIP. Les chemins originaux ImageGen sont conservés comme alias pinnés, sans embarquer tout `/workspace/generated_images`.

Les contenus sont fragmentés sans conversion dans des ZIP `STORED` déterministes, chacun de 8 Mio maximum. Un fichier original de plus de 8 Mio reste restituable par concaténation vérifiée de ses fragments. Le manifeste décrit l’ordre, le SHA et le CRC de chaque fragment. Il conserve aussi les répertoires vides. Tout lien symbolique non explicitement identifié dans l’entrée est refusé.

Les lectures de fichiers et de répertoires utilisent `O_NOATIME`. Le helper vérifie à nouveau les membres et leurs métadonnées après packaging, et refuse une source qui a changé. Il ne charge ni n’exécute aucun code documentaire téléchargé.

Pour préparer une proposition d’entrée, fournir un tableau de racines fermées `{id, source, closed:true, receipt:{source,bytes,sha256}}`, et le manifeste runtime gelé `{root,closed:true,files:[{file,bytes,sha256}]}` :

```bash
python -B /tmp/cqc-pass16-preservation/make-input-candidate.py \
  --roots /tmp/cqc-pass16-preservation/CLOSED_ROOTS.json \
  --runtime-freeze /chemin/du/runtime-gele.json \
  --out /tmp/cqc-pass16-preservation/PACK_INPUT_CANDIDATE.json
```

Cette proposition garde volontairement `rootApproval` à « PREPARATION ONLY ». Root doit donner son GO réel, compléter les racines finales et les références externes, puis attribuer la valeur explicite `GO PASS16 FINAL LOSSLESS PACK` à l’entrée finale. Ce marqueur concerne l’orchestration entre agents ; il ne demande pas une nouvelle autorisation utilisateur.

```bash
python -B /tmp/cqc-pass16-preservation/preserve-pass16.py pack \
  --config /tmp/cqc-pass16-preservation/PACK_INPUT_FINAL.json \
  --out /tmp/cqc-pass16-preservation/final-package-v1
```

Pour restaurer, utiliser un checkout Git contenant les PNG runtime du commit publié et les éventuelles références historiques, puis un nouveau dossier de fixture. Ne pas restaurer sur les chemins historiques ni sur un répertoire existant.

```bash
mkdir -p /tmp/cqc-pass16-preservation
python -B /chemin/du/pack/preserve-pass16.py restore \
  --manifest /chemin/du/pack/LOSSLESS_MANIFEST_V1.json \
  --repository /chemin/du/checkout-git \
  --target /tmp/cqc-pass16-preservation/restauration-v1 \
  --max-bytes 536870912
```

La restauration vérifie les SHA des ZIP, leurs CRC et les SHA des fragments, puis les octets de chaque fichier reconstruit. Les alias ImageGen sont restitués sous `aliases/` dans la fixture : les chemins absolus d’origine restent documentaires. Les modes, atime et mtime sont restaurés. Les UID/GID et ctime d’origine restent inventoriés ; ctime ne peut pas être fixé par une restauration ordinaire, et le helper ne demande aucun privilège pour changer le propriétaire. Le reçu de restauration décrit les contrôles réellement réalisés.

`ACTUAL_HELPER_CONTRACTS_V1.json` prouve neuf contrôles sur une fixture synthétique : déduplication, contenu volumineux fragmenté, CRC/SHA, restauration, référence runtime, alias, déterminisme et refus de symlink, d’écrasement et d’absence de GO. Ce reçu ne constitue pas une preuve de chargement des vrais PNG, de gameplay ou de fidélité visuelle.

Les limitations documentées par les producteurs sont conservées. Le lot vise la fidélité aux références d’origine ; l’archive ne certifie pas un 1:1 absolu. Clown utilise son déguisement canonique de Teliko ; l’atlas de Cunningham contient le corps humain et nécessite les accessoires de plateforme préservés dans le runtime. Les adaptations de mouvements, les poses réutilisées et les détails non attestés restent qualifiés dans les rapports sources.
