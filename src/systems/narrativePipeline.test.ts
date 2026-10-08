import { describe, expect, it } from 'vitest';
import { formatSubtitleTime, normalizeLocalizedText, resolveLocalizedText } from './localizationEngine';
import { getAudioProfileForEra } from './narrativeAudioEngine';

describe('narrative pipeline', () => {
  it('resolves translated text with english fallback', () => {
    expect(resolveLocalizedText({ en: 'Snake', fr: 'Serpent' }, 'fr')).toBe('Serpent');
    expect(resolveLocalizedText({ en: 'Snake' }, 'fr')).toBe('Snake');
  });
  it('normalizes legacy string dialogue', () => {
    expect(normalizeLocalizedText('Legacy line')).toEqual({ en: 'Legacy line' });
  });
  it('formats subtitle timecodes', () => {
    expect(formatSubtitleTime(61234)).toBe('01:01.234');
  });
  it('maps eras to audio profiles', () => {
    expect(getAudioProfileForEra('mgs3')).toBe('mgs3');
    expect(getAudioProfileForEra('patriots_ai')).toBe('patriots');
  });
});
