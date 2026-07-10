import { beforeEach, describe, expect, it, vi } from 'vitest';
import conversationsJson from '../data/conversations.json';
import type { ConversationDefinition } from '../types/codec.types';
import {
  conversationToDirectorSequence,
  getDirectorSequenceLibrary,
  sanitizeDirectorSequence,
  saveCustomDirectorSequences
} from './directorStorage';
import { requestDirectorSequence } from './directorBus';

beforeEach(() => window.localStorage.clear());

describe('Codec Director storage and conversion', () => {
  it('merges custom sequences ahead of built-ins', () => {
    const custom = sanitizeDirectorSequence({
      schemaVersion: 1,
      id: 'custom_director',
      title: 'Custom Director',
      era: 'mgs1',
      entryNodeId: 'end',
      contexts: ['codec'],
      nodes: [{ id: 'end', kind: 'end', outcomeId: 'done' }]
    });
    expect(custom).not.toBeNull();
    saveCustomDirectorSequences([custom!]);
    expect(getDirectorSequenceLibrary()[0]?.id).toBe('custom_director');
  });

  it('converts a normal Codec conversation into a playable Director timeline', () => {
    const conversation = (conversationsJson as ConversationDefinition[])[0];
    const sequence = conversationToDirectorSequence(conversation);
    expect(sequence.nodes).toHaveLength(conversation.lines.length + 1);
    expect(sequence.nodes[sequence.nodes.length - 1]?.kind).toBe('end');
    expect(sequence.contexts).toContain('codec');
  });

  it('dispatches launch requests through the global Director event bus', () => {
    const listener = vi.fn();
    window.addEventListener('shadow-codec:director-launch', listener);
    requestDirectorSequence('director_codec_training', 'codec', 'test');
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener('shadow-codec:director-launch', listener);
  });

  it('preserves sanitized node and choice conditions/effects from imported JSON', () => {
    const imported = sanitizeDirectorSequence({
      id: 'conditional_import',
      title: 'Conditional import',
      era: 'mgs1',
      entryNodeId: 'choice',
      contexts: ['codec'],
      nodes: [
        {
          id: 'choice',
          kind: 'choice',
          prompt: { en: 'Choose.' },
          conditions: [{ variable: 'ready', operator: 'truthy' }],
          effects: [{ operation: 'increment', variable: 'visits', value: 1 }],
          options: [
            {
              id: 'accept',
              label: { en: 'Accept' },
              nextId: 'end',
              conditions: [{ variable: 'clearance', operator: 'gte', value: 2 }],
              effects: [{ operation: 'emit', eventName: 'director:test', payload: { accepted: true } }]
            }
          ]
        },
        { id: 'end', kind: 'end', outcomeId: 'done' }
      ]
    });
    expect(imported?.nodes[0]?.conditions).toEqual([{ variable: 'ready', operator: 'truthy' }]);
    expect(imported?.nodes[0]?.effects).toEqual([{ operation: 'increment', variable: 'visits', value: 1 }]);
    const choice = imported?.nodes[0];
    expect(choice?.kind).toBe('choice');
    if (choice?.kind !== 'choice') throw new Error('Expected choice node');
    expect(choice.options[0]?.conditions).toEqual([{ variable: 'clearance', operator: 'gte', value: 2 }]);
    expect(choice.options[0]?.effects).toEqual([{ operation: 'emit', eventName: 'director:test', payload: { accepted: true } }]);
  });

});
