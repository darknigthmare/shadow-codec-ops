Reprise du suivi P47 au 9 novembre 2026

build_p47_nov9.py --config CONFIG_PRIVE.json --output NOUVEAU_DOSSIER

Le fichier de configuration désigne les preuves exactes à lire. Le générateur
vérifie les SHA256, les blobs Git et les jointures UID/famille avant export.
Il ne lance aucun outil réseau, image, navigateur, produit, Git ou déploiement.
Le dossier de sortie doit être nouveau ; les exports précédents restent intacts.

La V7 ajoute trois feuilles à la V6 : les cinquante feuilles historiques et
109 des 112 enregistrements ZIP locaux V6 restent strictement identiques.
Les trois métadonnées de structure nécessaires aux nouvelles feuilles changent.
La V6 originale reste intégralement intacte. Ne jamais sauvegarder ce classeur
avec openpyxl : son utilisation par le générateur est uniquement en lecture.

Source approuvée, compilation, QA locale, installation, Git runtime et publication
canonique sont des étapes séparées. Le reste au critère publication ne diminue
que pour les UID/familles prouvés publiés. Les feuilles historiques conservent
leurs libellés et dates propres ; les trois feuilles P47 portent l'état actuel.
La synthèse indépendante, avec les SHA256 des fichiers effectivement contrôlés,
doit accompagner toute livraison finale. Les auto-contrôles du générateur ne
constituent pas cet audit indépendant.
