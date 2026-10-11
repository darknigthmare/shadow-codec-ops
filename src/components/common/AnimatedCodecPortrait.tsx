import type { NarrativeEmotion } from '../../types/narrative.types';

interface AnimatedCodecPortraitProps {
  label: string;
  initials: string;
  name: string;
  expression?: string;
  emotion?: NarrativeEmotion;
  image?: string;
  speaking?: boolean;
  enabled?: boolean;
  side: 'left' | 'right';
}

export function AnimatedCodecPortrait({ label, initials, name, expression = 'neutral', emotion = 'neutral', image, speaking = false, enabled = true, side }: AnimatedCodecPortraitProps) {
  const isLocalPortrait = Boolean(image?.includes('/portraits/'));
  const isSystemPortrait = Boolean(image?.includes('/portraits/system/'));
  const isCharacterPortrait = isLocalPortrait && !isSystemPortrait;

  return (
    <div className={`codec-portrait ${side} portrait-emotion-${emotion} ${enabled && speaking ? 'is-speaking' : ''}`}>
      <span className="portrait-label">{label}</span>
      <span className={`codec-portrait-avatar expression-${expression}`}>
        {image ? <img src={image} alt="" data-system-portrait={isSystemPortrait ? 'true' : undefined} data-character-portrait={isCharacterPortrait ? 'true' : undefined} /> : initials}
        {enabled && <span className="portrait-scan" aria-hidden="true" />}
      </span>
      <strong>{name}</strong>
      {enabled && <span className="portrait-runtime-state">{speaking ? 'VOICE ACTIVE' : expression.toUpperCase()}</span>}
    </div>
  );
}
