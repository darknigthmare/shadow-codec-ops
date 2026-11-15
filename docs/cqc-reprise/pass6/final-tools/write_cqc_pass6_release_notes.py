"""Record the reviewed PASS6 state without replacing an earlier release document."""
from pathlib import Path
import json,hashlib
W=Path('/workspace');R=W/'cqc-game-working/cqc-versus-v056';S=W/'shadow-codec-recovered'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
core=json.loads((W/'cqc-pass6-core-qa.json').read_text());npm=json.loads((W/'shadow-cqc-pass6-final-npm-qa.json').read_text())
assert core['passedAllChecks'] and npm['status']=='passed'
text="""# Reprise PASS6 · MGS / CQC · 2026-10-02

CQC autonome et CQC dans l’onglet de Shadow Codec Ops utilisent le même runtime vérifié.
Branche GitHub : `reprise/2026-10-02`, dépôt `darknigthmare/shadow-codec-ops`.
Le commit PASS5 `a5e33a020cd3b45378d33488e3753ed83281c6a0` reste le parent conservé.

- Quatre nouveaux jeux de sprites : The Pain, The Fear, The End et The Fury de MGS3 PS2 original. 24 PNG natifs, 288 poses, deux orientations indépendantes. Total : 22 jeux de sprites, 132 PNG, 1 584 poses, dont PARALLAXE opt-in.
- Frelons, carreaux et jets de flammes natifs ; écran de frelons et nappe de feu. Les origines des tirs suivent les mains et les armes observées sur les PNG, avec vérification de la source.
- Mosin tranquillisant avec munitions réelles pour le super ; deux arbalètes distinctes pour The Fear ; phase masquée de The Pain sans Bullet Bee oral. Finishers de Pain sans télékinésie et de Red Blaster avec grenades et fils, sans C4 télécommandé.
- Douze tableaux MG2 MSX2 : Running Man et Red Blaster. Total : 486 peintures, 81 récits entièrement peints, 273 récits restant à peindre. Les textes et parcours des 354 récits sont conservés.
- Trois extensions de plafond pour Lobito, SaintLogic et sa voie de sécurité ; aucun des 123 anciens calques n’est remplacé. Les 30 stages conservent leurs plans et animations. Total : 126 chemins PNG, 122 contenus distincts.

## Vérifications

CQC : 1 227 contrôles réussis dans 16 suites, dont les 1 195 contrôles historiques réexécutés. Les sept anciens rapports sont restaurés à l’octet près. Outils sprites : 39 tests. Shadow : 705 tests dans 104 fichiers, TypeScript, build et PWA réussis.

Les rapports de navigateur vérifient les vrais projectiles, contacts, ressources, finishers et les deux montages. Les rapports détaillés et leurs empreintes accompagnent la livraison. Le premier essai npm bloqué par EPERM et les essais de revue rejetés sont conservés séparément ; ils ne sont pas comptés comme réussites finales.

## Fidélité et préservation

Les costumes et équipements suivent les références du jeu original associé. Le rendu et les mouvements de combat latéral restent des adaptations `closest_supported`, sans certificat absolu 1:1. La forme précise du lance-grenades de Red Blaster et la géométrie des plafonds non visibles dans les captures PSP ne sont pas inventées comme faits canoniques. Le raccord des nouveaux panneaux reste perceptible au zoom 0,78.

Le fil de Red Blaster ne cause aucun dégât direct hors garde et aucune explosion. La garde accroupie conserve le minimum historique de 1 PV de chip du moteur, vérifié comme limite du versus.

Les six inventaires historiques, les 46 archives et documents figés, les anciens sprites et les sources/rejets restent conservés. Les 498 PNG natifs générés dans cet espace possèdent un inventaire de préservation ; les rejets restent des rejets. PARALLAXE demeure le seul OC dérivé du design refusé de Viper.

Les 333 personnages canoniques encore procéduraux, les 273 récits non peints et les sources historiques signalées absentes restent identifiés dans le backlog. Aucun ancien PNG absent n’est déclaré retrouvé.

## Accès

- Shadow et onglet CQC : `/?module=cqc`.
- CQC autonome : `/cqc/index.html`.
- Le runtime et son manifeste sont dans `public/cqc/` du dépôt Shadow.

Cette passe ne remplace ni ne modifie les ZIP complets PASS5 et précédents.
"""
for p in [W/'REPRISE_PASS6_MGS_CQC_2026-10-02.md',R/'docs/REPRISE_PASS6_MGS_CQC_2026-10-02.md',S/'docs/REPRISE_PASS6_MGS_CQC_2026-10-02.md']:
 p.parent.mkdir(parents=True,exist_ok=True)
 if p.exists():assert p.read_text()==text
 else:p.write_text(text)
facts={'schema':'cqc.pass6.delivery-facts/1','games':{'shadowRepository':'darknigthmare/shadow-codec-ops','branch':'reprise/2026-10-02','standalone':'/cqc/index.html','integrated':'/?module=cqc'},'sprites':{'sets':22,'canonicalSets':21,'nativePNGs':132,'poses':1584,'newSets':4,'newPoses':288,'remainingCanonicalProcedural':333},'narratives':{'paintings':486,'fullyPaintedStories':81,'remainingStories':273,'newPaintings':12},'stages':{'count':30,'nativePNGPaths':126,'distinctPNGContents':122,'newCeilings':3,'historicalLayerPathsUnchanged':123},'nativeGenerationsPreserved':498,'qa':{'coreCases':core['totals']['tests'],'coreSuites':16,'spriteToolCases':39,'shadowCases':npm['testCounts']['passedTests'],'shadowTestFiles':104},'runtime':npm['runtime'],'fidelityStatus':'closest_supported','absolute1to1Certified':False,'previousGitHubCommit':'a5e33a020cd3b45378d33488e3753ed83281c6a0','previousCompleteArchivesPreserved':True,'releaseNotesSHA256':sha(W/'REPRISE_PASS6_MGS_CQC_2026-10-02.md')}
p=W/'MGS_CQC_PASS6_DELIVERY_2026-10-02.json'
if p.exists():assert json.loads(p.read_text())==facts
else:p.write_text(json.dumps(facts,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(facts,ensure_ascii=False))
