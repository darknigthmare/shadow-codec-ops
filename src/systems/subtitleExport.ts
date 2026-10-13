import type { ConversationDefinition } from '../types/codec.types';
import type { AppLocale } from '../types/narrative.types';
import { resolveLocalizedText } from './localizationEngine';

function toSrtTime(milliseconds: number): string {
  const value = Math.max(0, Math.floor(milliseconds));
  const hours = Math.floor(value / 3600000);
  const minutes = Math.floor((value % 3600000) / 60000);
  const seconds = Math.floor((value % 60000) / 1000);
  const ms = value % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

export function conversationToSrt(conversation: ConversationDefinition, locale: AppLocale): string {
  let cursor = 0;
  return conversation.lines.map((line, index) => {
    const start = line.startMs ?? cursor;
    const end = Math.max(start + 250, line.endMs ?? start + 2500);
    cursor = end;
    const text = resolveLocalizedText(line.localizedText ?? line.text, locale);
    return `${index + 1}\n${toSrtTime(start)} --> ${toSrtTime(end)}\n${line.speaker}: ${text}\n`;
  }).join('\n');
}
