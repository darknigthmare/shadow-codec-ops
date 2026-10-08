from pathlib import Path
import hashlib,json,re

BASE=Path('/tmp/cqc-pass18-application')
OUT=Path('/tmp/cqc-pass19-scale-menu')
files=[]

def plan(path,pairs):
    source=(BASE/path).read_text();result=source;ops=[]
    for old,new in pairs:
        count=result.count(old)
        if count:
            ops.append({'old':old,'new':new,'expectedCount':count});result=result.replace(old,new)
    if not ops:return
    files.append({'path':path,'sourceSHA256':hashlib.sha256(source.encode()).hexdigest(),'outputSHA256':hashlib.sha256(result.encode()).hexdigest(),'operations':ops})
    if path=='public/cqc/index.html':(OUT/'index-diegetic-preview-v2.html').write_text(result)

shell=[
 ('CQC VERSUS LEGACY 0.56','CQC VERSUS'),('LEGACY 0.56','COMMANDEMENT'),('LOCAL PROFILE','DOSSIER PERSONNEL'),('PLAYER PROFILE · LOCAL FRONT','DOSSIER PERSONNEL · COMMANDEMENT'),
 ('CHRONIQUES 0.56','CHRONIQUES'),('354 HISTOIRES · 354 RÉCITS INDIVIDUELS','PARCOURS ET DESTINS'),('64 PNJ · 16 OPS · 12 CLASSES','CONTACTS ET OBJECTIFS TACTIQUES'),
 ('31 OPUS · 354 PROFILS','DOSSIERS PAR OPÉRATION'),('24 LEÇONS · 354 PROGRAMMES','LEÇONS ET MAÎTRISE DU COMBAT'),('354 ROUTES · FORMAT RAPIDE','PARCOURS DE COMBAT'),
 ('PERSONNAGE ORIGINAL · DOSSIER ET 6 SCÈNES','STATION MÉRIDIEN · DOSSIER PERSONNEL'),('17 PACKS · 68 OPS','DOSSIERS ET MISSIONS'),('6 FORMATS · REPLAYS · INPUT LAB','FORMATS DE COMBAT · REPLAYS · COMMANDES'),('32 MACHINES · 15 DOSSIERS','MACHINES ET OPÉRATIONS'),('14 BOSS · 7 DOSSIERS','ADVERSAIRES ET OPÉRATIONS'),('18 BOSS · 7 DOSSIERS','ANCIENS ADVERSAIRES'),('28 BOSS · 13 DOSSIERS','ARCHIVES DES ADVERSAIRES'),('14 OPÉRATIONS · 13 CONTACTS','MISSIONS ET CONTACTS'),
 ('354 PROFILS · 1 416 FINISHERS','COMBATTANTS ET TECHNIQUES'),('63 COMBATTANTS · LEGACY ART V4','ARCHIVES HISTORIQUES'),('17 OPÉRATIONS · 17 CONTACTS','MISSIONS ET CONTACTS'),
 ('CHRONIQUES · 354 HISTOIRES','CHRONIQUES'),('SUPPORT NETWORK · 16 OPS','RÉSEAU DE SOUTIEN'),('EPISODE ARCHIVES · 68 OPS','ARCHIVES DE MISSION'),
 ('ROSTER COMMAND III · 31 OPUS','DOSSIERS DES COMBATTANTS'),('ROSTER COMMAND III','DOSSIERS DES COMBATTANTS'),('SAGA COMMAND','CHRONOLOGIE DES OPÉRATIONS'),
 ('RÉPERTOIRES · 354','DOSSIERS DE COMBAT'),('LEGACY CORE · 95','COMBAT CLASSIQUE'),('SIGNATURE ARCHIVE · 63','ARCHIVES DE COMBAT'),
 ('ARCADE CHRONICLES · 354','PARCOURS ARCADE'),('BATTLE OPERATIONS · 6 FORMATS','OPÉRATIONS DE COMBAT'),('SURVIVAL 0.49','SURVIE'),('TOURNOI 0.49','TOURNOI'),('TIME ATTACK 0.49','CONTRE LA MONTRE'),
 ('ARSENAL FILES · 32','ARSENAL'),('ARSENAL FILES 0.44','ARSENAL'),('RIVAL FILES IV · 14','ADVERSAIRES'),('RIVAL FILES IV','DOSSIERS ADVERSAIRES'),('RIVAL FILES III','ANCIENS DOSSIERS ADVERSAIRES'),('RIVAL FILES II','ARCHIVES ADVERSAIRES'),
 ('COMBAT ACADEMY · 2 832 ÉPREUVES','ACADÉMIE DE COMBAT'),('DOJO — 354 ENTRÉES','DOJO'),('MAÎTRISE PERSONNAGE · 354','MAÎTRISE DU COMBATTANT'),('AI DIRECTOR · 12 PROFILS','EXERCICES TACTIQUES'),('OPS HEBDOMADAIRES · 52','MISSIONS HEBDOMADAIRES'),('FINISHER LAB · 1 416','TECHNIQUES DE FIN'),
 ('354 histoires, 354 récits réécrits et une progression reliée aux vrais duels. Les anciens fronts restent disponibles.','Chaque dossier suit un combattant, ses duels et les conséquences de ses choix.'),
 ('Le duel libre réunit maintenant 354 profils ; Roster Command III distingue adaptations, simulations et prototypes.','Choisis ton combattant, règle le duel et prépare ton entrée sur le terrain.'),
 ('Support Network complète les objectifs tactiques ; Arcade Chronicles et Battle Operations utilisent le roster 354.','Pars en mission, traverse un parcours arcade ou défie une équipe adverse.'),
 ('Trente-deux machines Arsenal et quatorze boss supplémentaires complètent les opérations historiques.','Affronte les machines et les adversaires des opérations historiques.'),
 ('Vingt-quatre leçons universelles, 354 programmes de maîtrise, 52 opérations locales et douze personnalités CPU.','Travaille tes techniques au dojo, maîtrise ton combattant et prépare les missions.'),
 ('Episode Archives, Saga Command, Arsenal, rivaux et moteurs historiques restent séparés mais raccordés.','Consulte les archives des opérations, les contacts et les dossiers de combat.'),
 ('Affichage, accessibilité, sauvegardes et Administration.','Affichage, audio, commandes, accessibilité et dossiers personnels.'),
 ('SUPPORT NETWORK','RÉSEAU DE SOUTIEN'),('EPISODE ARCHIVES','ARCHIVES DE MISSION'),('ARSENAL FILES','ARSENAL'),('ARCADE CHRONICLES','PARCOURS ARCADE'),('BATTLE OPERATIONS','OPÉRATIONS DE COMBAT'),('COMBAT ACADEMY','ACADÉMIE DE COMBAT'),
 ('LEGACY ROUTES','PARCOURS HISTORIQUES'),('CORE CHRONICLES','CHRONIQUES CLASSIQUES'),('LEGACY OPS V2','OPÉRATIONS HISTORIQUES'),('LEGACY LAB','ENTRAÎNEMENT CLASSIQUE'),('SIGNATURE SPARRING','DUELS HISTORIQUES'),('QUICK RESUME','DERNIER FRONT'),('EPISODE OPERATIONS','MISSIONS'),
 ('PARALLAXE · COMBAT OC','PARALLAXE · DUEL'),('PARALLAXE · OC','PARALLAXE · DOSSIER PERSONNEL'),('DUEL IA · LOCAL · DOJO · CONTRÔLE DE ZONE','DUELS · EXERCICES · CONTRÔLE DE ZONE'),
 ('REPLAY THEATER · GHOSTS','THÉÂTRE DES REPLAYS'),('REPLAY THEATER','THÉÂTRE DES REPLAYS'),('WATCH · GHOST · EXPORT','ARCHIVES · REPLAYS · TRANSFERT'),('INPUT LAB · REMAPPAGE','COMMANDES'),('INPUT LAB','COMMANDES'),('REMAPPAGE · GAMEPAD MONITOR','CLAVIER · MANETTE'),
 ('FINISHER ARCHIVE','ARCHIVES DES TECHNIQUES'),('ARCHIVE FRONT','ARCHIVES HISTORIQUES'),('RECOVERY FILES','DOSSIERS DE RÉCUPÉRATION'),('MISSION FILES','DOSSIERS DE MISSION'),('ADMINISTRATION','ATELIER'),("choices:['ACCESSIBILITÉ','PLEIN ÉCRAN','ADMIN']","choices:['ACCESSIBILITÉ','PLEIN ÉCRAN','ATELIER']"),('COMMAND FRONT','COMMANDEMENT'),('SCANLINES','LIGNES D’ÉCRAN'),
]
# Rewrite descriptions before broad display-name replacements, so the exact old prose remains detectable.
descriptions=[p for p in shell if len(p[0])>80];shell=descriptions+[p for p in shell if len(p[0])<=80]
plan('public/cqc/index.html',shell)
plan('public/cqc/modules/unified-versus-v055.html',[
 ('<small>LEGACY ART V4</small>STAGE GALLERY','<small>ARCHIVES DES OPÉRATIONS</small>THÉÂTRE DES OPÉRATIONS'),
 ('<span id="galleryStageCount">38 SCÈNES</span>','<span id="galleryStageCount" hidden aria-hidden="true">38 SCÈNES</span>'),
])
plan('public/cqc/modules/core-v032.html',[
 ('CQC VERSUS — Legacy 0.32','CQC VERSUS'),('/ LEGACY 0.30','/ COMMANDEMENT'),('TACTICAL FIGHTING / LEGACY PROJECT','TACTICAL FIGHTING SYSTEM'),
 ('<div class="build-note">BUILD 0.32 / <span id="build-fighter-count"></span> COMBATTANTS + 15 RENCONTRES MÉCANIQUES + ÉPREUVE THE SORROW • DESSINS ET HUD PROVISOIRES • MATCHS CROISÉS = SIMULATIONS NON CANONIQUES</div>','<div class="build-note">DOSSIERS DE COMBAT · OPÉRATIONS SPÉCIALES<span id="build-fighter-count" hidden aria-hidden="true"></span></div>'),
 ('NOUVEAUX 0.23 / 4','DOSSIERS SPÉCIAUX'),('NOUVEAUX 0.22 / 8','OPÉRATIONS COMPLÉMENTAIRES'),('RENFORTS 0.21 / 26','ARCHIVES DES RENFORTS'),
 ('METAL GEAR / SIMULATION PRIVÉE · VISUELS DE TRAVAIL','METAL GEAR / EXERCICES DE COMBAT'),
])
plan('public/cqc/modules/chronicles-v056.html',[
 ('CQC — Chroniques 0.56','CQC — Chroniques'),('<b>354 RÉCITS</b>8 DUELS · UNE FIN PERSONNELLE','<b>CHRONIQUES</b>DUELS · UNE FIN PERSONNELLE'),
 ('<span class="version">0.56</span>','<span class="version">DOSSIERS DE MISSION</span>'),
])
plan('public/cqc/modules/roster-command-v053.html',[
 ('CQC VERSUS — Roster Command v0.53','CQC VERSUS — Dossiers des combattants'),('GAME-BY-GAME ROSTER AUDIT','ARCHIVES DES OPÉRATIONS'),('ROSTER COMMAND <span style="color:var(--gold)">0.53</span>','DOSSIERS DES COMBATTANTS'),
 ('<div class="metrics"><span class="metric">256 COMBATTANTS</span><span class="metric">62 AJOUTS</span><span class="metric">31 OPUS</span></div>','<div class="metrics" hidden aria-hidden="true"><span class="metric">256 COMBATTANTS</span><span class="metric">62 AJOUTS</span><span class="metric">31 OPUS</span></div>'),
 ('AJOUTS 0.53','RENFORTS'),('ROSTER DENSE','DOSSIERS COMPLETS'),
])
plan('src/app/AppLayout.tsx',[('CQC Versus Legacy, duels et chroniques','CQC Versus, duels et chroniques')])
plan('src/components/cqc/CqcLauncher.tsx',[('CQC Versus Legacy','CQC Versus')])
(OUT/'DIEGETIC_MENU_COMPLETE_GUARDED_PATCH_PLAN_V2.json').write_text(json.dumps({'schema':'cqc.guarded-text-patch/1','baselineRoot':str(BASE),'sourceFilesModified':False,'routingKeysAndUIDsChanged':False,'progressAndCombatNumbersPreserved':True,'files':files},ensure_ascii=False,indent=2))
print(json.dumps({'files':len(files),'operations':sum(len(f['operations']) for f in files),'sourceFilesModified':False}))
