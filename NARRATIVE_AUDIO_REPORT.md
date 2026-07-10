# Narrative Audio, Localization & Subtitle Pipeline — v2.0.0

## Livré

- `src/types/narrative.types.ts` : locales, textes localisés, cues, profils audio et expressions.
- `src/systems/localizationEngine.ts` : résolution EN/FR/JA-ready et formatage timecode.
- `src/systems/narrativeAudioEngine.ts` : profils par époque, bruit radio Web Audio, cues et audio local optionnel.
- `src/systems/subtitleExport.ts` : export SRT EN/FR.
- `src/components/common/SubtitleTrack.tsx` : sous-titres accessibles horodatés.
- Conversation Studio enrichi : EN/FR, timecodes, expression, chemin audio, export SRT.
- Codec Simulator enrichi : localisation, sous-titres, expression, audio par époque, auto-advance.
- Settings enrichi : locale, sous-titres, audio narratif, volume et portraits.

## Compatibilité

Les anciennes lignes utilisant uniquement `text` restent valides. `localizedText`, `startMs`, `endMs`, `audioSource` et `portraitExpression` sont optionnels. La migration de sauvegarde passe au schéma 8.

## Limites honnêtes

Aucun doublage protégé n’est inclus. Les chemins audio locaux doivent pointer vers des fichiers fournis par l’utilisateur dans son projet privé. Le moteur génère seulement bruit radio et cues synthétiques.
