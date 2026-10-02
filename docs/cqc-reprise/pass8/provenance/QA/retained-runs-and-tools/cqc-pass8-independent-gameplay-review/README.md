Le contrôle indépendant du moteur passe 38 cas sur 38 avec le helper `dba13030fcf73cd5d441d9a1bf5b29ef3d05af9959fb4768d163ca64fdb5de8e` et le moteur séparé `fd6c8d85333887a60056f1ab11e92abb63250c07de1664a6d832c1c679f34a8f`.

Le [rapport moteur](verified-run-03/INDEPENDENT_GAMEPLAY_REVIEW.json) teste les observations visibles, le camouflage, la portée, les récupérations immobiles et leur interruption, les collisions réelles de Sunny face aux tirs et frappes aériennes, les 52 finishers, les 341 profils hors scope et 87 mutations de preuves de bouche native rejetées. Il vérifie aussi que le moteur inline historique reste identique dans CQC et Shadows : `197acd7da230bf479a68d37ff409801c0d4390d001a98b4c1451075be55d2d51`.

Le helper conservé avant correction reproduit deux défauts réels : quatre observations échouaient faute de collecte des traces, et quatre récupérations super avançaient de 21 pixels. Les corrections sont vérifiées dans le moteur, avec leurs octets précédents conservés.

Le [contrôle des 13 scopes originaux](verified-run-03/SOURCE_SCOPE_REVIEW.json) conserve les contrats exacts et les empreintes des références vues. Il signale encore les descriptions de cheveux Paz PW/GZ à corriger et les correspondances de poses Mantis à appliquer lors de l’import. La limite de Paz PW a été précisée par son producteur après observation indépendante de l’objet noir arrondi, probablement une poêle : absence d’arme à feu visible ne signifie pas absence de tout équipement.

Les poses, attaques, distances, jauges et conclusions sont des adaptations de versus explicitement qualifiées. La cible artistique reste la fidélité 1:1, au plus proche des références disponibles ; aucune certification absolue n’est émise.

Les essais du runner sont conservés. Le premier utilise un chemin Shadows inexistant ; le deuxième expose deux problèmes d’assertions du runner, corrigés dans le troisième. Aucun de ces incidents ne modifie l’application. Le rapport réussi et tous ses sources sont figés sous `verified-run-03`.

Le reviewer n’a modifié ni CQC, ni Shadows, ni PNG natif. L’import des derniers sprites, les origines effectivement chargées, les comptes finaux et les publications restent à vérifier par l’intégrateur.
