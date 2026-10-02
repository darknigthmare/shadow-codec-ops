Préparation de conservation PASS8, revue en lecture seule le 2 octobre 2026.

Les 641 images originales présentes dans `/workspace/generated_images` sont couvertes : les 536 lignes P7 gelées, puis 105 nouvelles images PASS8 associées à 13 UID. Les 105 nouvelles images comprennent 78 feuilles retenues par leurs producteurs, 19 candidats rejetés conservés et 8 intermédiaires conservés. Leur statut de conservation n’est pas une certification de fidélité canonique ni une approbation finale du rendu Canvas.

Les six feuilles Sunny MGR remplacées pour les cheveux, la feuille EVA `C_LEFT_03` rejetée pour le second holster et la requête Crying Beauty bloquée sans PNG sont explicitement consignées. La requête bloquée n’ajoute aucune image fictive. Douze propositions d’arguments sans exécution attestée sont conservées séparément.

| UID | PNG originaux | Retenus | Rejetés | Intermédiaires |
| --- | ---: | ---: | ---: | ---: |
| archive__crying_beauty | 7 | 6 | 1 | 0 |
| archive__laughing_beauty | 8 | 6 | 2 | 0 |
| archive__paz | 6 | 6 | 0 | 0 |
| archive__raging_beauty | 6 | 6 | 0 | 0 |
| archive__screaming_beauty | 8 | 6 | 2 | 0 |
| core__crying_wolf | 7 | 6 | 1 | 0 |
| core__eva_mgs3 | 11 | 6 | 3 | 2 |
| core__laughing_octopus | 8 | 6 | 2 | 0 |
| core__raging_raven | 8 | 6 | 2 | 0 |
| core__screaming_mantis | 8 | 6 | 2 | 0 |
| npc53__paz_gz | 7 | 6 | 1 | 0 |
| roster50__sunny_mgr | 14 | 6 | 2 | 6 |
| roster50__sunny_mgs4 | 7 | 6 | 1 | 0 |

`PASS8_ADDITIVE_PRESERVATION_PLAN.json` lie chaque nouveau PNG à son UID, son essai, son statut, son argument de génération et ses manifestes. SHA256, taille, device/inode d’origine et 352 chemins PNG équivalents sont enregistrés. Le relevé couvre les fichiers PNG ordinaires sous `/workspace`, hors `.git`, `node_modules`, environnements Python, `__pycache__` et caches. Les chemins ajoutés par des imports ultérieurs ne figurent pas dans ce relevé daté.

`ALL_PRODUCER_ARTIFACTS_SNAPSHOT.json` relève 1 552 fichiers producteurs, y compris recherches écartées, anciens manifestes, captures, arguments et échecs. Il associe également les 76 chemins d’image effectivement utilisés comme entrées des requêtes. Les références qui représentent des feuilles générées précédentes restent des références d’édition, sans devenir des preuves de costume original.

`P7_INVENTORY_PREIMAGE.json` est une copie byte-exacte de l’inventaire existant, SHA256 `9e57801f5bbb324419cdcedcf6df80d3a4e1613b92c4a4e0f1c5a667629ab27b`. `P7_BASELINE_BYTE_VERIFICATION.json` vérifie les 536 originaux et leurs 536 copies référencées. `COVERAGE_PROOF.json` prouve la couverture des nouveaux originaux et des arguments d’essais sans attribution restante.

`merge_additive_inventory.py` est prêt, mais sa fusion n’a pas été exécutée. Son mode par défaut valide exclusivement en lecture :

```sh
python /workspace/cqc-pass8-preservation-prep/merge_additive_inventory.py
```

Après demande explicite de root, l’option `--apply` crée seulement les liens physiques des 105 nouveaux PNG dans `preparation/reprise-pass8-provenance/all-native-originals`, conserve une copie exacte de l’ancien inventaire, puis insère les nouvelles lignes par ajout de texte JSON. Chaque octet préexistant de l’inventaire reste dans son ordre original ; les 536 objets et tous les autres champs demeurent inchangés. L’outil refuse une dérive de l’inventaire, des sources, des sélections, des manifestes critiques ou des destinations. Un inventaire déjà fusionné ne peut pas être fusionné une seconde fois avec ce plan.

```sh
python /workspace/cqc-pass8-preservation-prep/merge_additive_inventory.py --apply
```

`READ_ONLY_MERGE_VALIDATION.json` valide la proposition de 641 lignes sans écriture R/S. SHA256 proposé après ajout : `68e10281e8316705192866506401e3f3cf06d6c8d841c0f51a39173ac058c087`. `MERGE_GUARD_FIXTURE_PROOF.json` contient 11 vérifications des gardes et de la conservation littérale, sur des fixtures de bytes locales ; la fonction d’application n’a pas été exécutée, même pour ces fixtures.

Si de nouvelles images ou corrections producteur arrivent avant la fusion, conserver ce dossier et reconstruire un nouveau relevé dans un sous-dossier neuf :

```sh
python /workspace/cqc-pass8-preservation-prep/build_preparation.py --output-directory /workspace/cqc-pass8-preservation-prep/revision-suivante
python /workspace/cqc-pass8-preservation-prep/merge_additive_inventory.py --plan /workspace/cqc-pass8-preservation-prep/revision-suivante/PASS8_ADDITIVE_PRESERVATION_PLAN.json
```

Aucun déplacement, effacement, changement de pixels, import R/S ou ajout à l’inventaire existant n’a été réalisé par cette préparation. Les artefacts restent à leurs chemins d’origine ; le relevé est une preuve de leur présence et de leur intégrité, sans les recopier dans les applications.
