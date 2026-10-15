import type { AppLocale, LocalizedText } from '../../types/narrative.types';
import { formatSubtitleTime, resolveLocalizedText } from '../../systems/localizationEngine';

interface SubtitleTrackProps {
  speaker: string;
  text: string | LocalizedText;
  locale: AppLocale;
  startMs?: number;
  endMs?: number;
  emotion?: string;
  enabled?: boolean;
}

export function SubtitleTrack({ speaker, text, locale, startMs = 0, endMs = 0, emotion = 'neutral', enabled = true }: SubtitleTrackProps) {
  if (!enabled) return null;
  return (
    <div className={`subtitle-track subtitle-emotion-${emotion}`} role="status" aria-live="polite">
      <div className="subtitle-meta">
        <strong>{speaker}</strong>
        <span>{formatSubtitleTime(startMs)} → {formatSubtitleTime(endMs)}</span>
      </div>
      <p>{resolveLocalizedText(text, locale)}</p>
    </div>
  );
}
