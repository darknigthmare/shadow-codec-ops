Le suivi P44 couvre **60 cibles de costume et 1 938 corps mappés dans les jobs de sources**. Trente cibles disposent d’une revue et d’un assemblage Root fondés sur leur job courant. Quatre sont installées et publiées dans Git ; les 26 autres assemblages restent des sources sans admission dans un mode.

| Costume P44 | Dessins natifs | Modes admis localement et dans Git | Production actuelle |
| --- | ---: | --- | --- |
| Venom Snake MGSV — Cyborg | 32 | Versus, Core, Soutien | Disponible |
| Johnny MGS4 — Gala | 34 | Versus, Soutien | Disponible |
| Fox MG2 — Rétro | 32 | Versus | Aperçu uniquement |
| Null MPO — Cyborg | 36 | Versus | Aperçu uniquement |

Ces quatre costumes totalisent **134 dessins natifs**. Les incarnations restent distinctes. P1 regarde son adversaire vers la droite dans la sélection. Johnny Core reste en attente de la pose couchée requise. Raven et Octopus rétro disposent de sources d’architecture revues, mais leur cadrage et leurs contacts restent en attente ; aucune admission de mode n’en découle. Les deux sources Big Boss retenues en HOLD gardent ce statut.

Le runtime testé et publié dans Git est **3e7d5a4ce1bb71b22ed63d2c3697b899ccd27786**. La production canonique reste **4955b56b7193b4a88ba2d8d081c7ed0edead2f52**, avec Venom et Johnny. Vercel a refusé une nouvelle production avec HTTP402, sa limite de 100 déploiements par jour étant atteinte. La tentative de promotion directe de l’aperçu a reçu HTTP422 : un aperçu ne peut pas être pointé directement en production et nécessite une nouvelle compilation de production. Aucune facturation, protection globale ou variable d’environnement n’a été modifiée.

L’aperçu des quatre costumes est READY. Six réponses runtime brutes sont exactes ; les trois réponses HTML comportent chacune le même ajout de 163 octets du feedback Vercel. Leurs corps sources sous-jacents sont exacts, et le JavaScript ainsi que le CSS d’entrée de l’application sont identiques à ceux de 4955. Les réponses HTML brutes restent explicitement qualifiées comme différentes. Ces constats ne constituent pas une publication des quatre costumes en production.

La validation du runtime comprend les cinq contrôles réussis, dont **723 tests dans 106 fichiers**, une compilation fraîche et la vérification PWA. Les contrôles réels Fox/Null ont exercé seize actions et observé douze contacts ; la vérification installée couvre deux profils, huit équipements et huit faces. Les preuves du candidat, de l’installation et de la production des deux premiers costumes gardent leurs portées respectives.

Les 17 reçus d’archives conservent **168 PNG, soit 269 009 073 octets**. Native007 préserve deux assemblages sources avec leur libération corrigée, sans ajouter d’option active. La dernière synthèse de préservation relit les reçus réseau antérieurs ; elle ne prétend pas constituer un nouvel audit TLS des 168 images. Les 67 fichiers protégés et les miroirs installés ont aussi été contrôlés séparément.

Ce commit documentaire ajoute le classeur final, ses exports et les preuves datées. Il conserve tous les chemins existants et le runtime 3e7d. Son propre SHA sera distinct du SHA runtime. Le classeur ne présente pas les 60 cibles comme jouables et ne certifie pas une fidélité globale de tout le roster.
