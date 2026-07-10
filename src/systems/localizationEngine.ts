import type { AppLocale, LocalizedText } from '../types/narrative.types';

export function resolveLocalizedText(value: string | LocalizedText | undefined, locale: AppLocale): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.en || value.fr || value.ja || '';
}

export function normalizeLocalizedText(value: unknown, fallback = ''): LocalizedText {
  if (typeof value === 'string') return { en: value };
  if (!value || typeof value !== 'object') return { en: fallback };
  const source = value as Record<string, unknown>;
  return {
    en: typeof source.en === 'string' ? source.en : fallback,
    fr: typeof source.fr === 'string' ? source.fr : undefined,
    ja: typeof source.ja === 'string' ? source.ja : undefined
  };
}

export function formatSubtitleTime(milliseconds: number): string {
  const total = Math.max(0, Math.floor(milliseconds));
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const ms = total % 1000;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}
