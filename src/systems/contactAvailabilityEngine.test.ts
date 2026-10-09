import { describe, expect, it } from 'vitest';
import type { CodecContactRuleDefinition, CodecRuntimeContext, ContactDefinition } from '../types/codec.types';
import { evaluateContactAvailability, sortContactsForSharedFrequency } from './contactAvailabilityEngine';

const context: CodecRuntimeContext = {
  contextId: 'mgs1_insertion',
  era: 'mgs1',
  chapterId: 'insertion',
  playerId: 'solid_snake_mgs1',
  flags: ['shadow_moses']
};

function contact(overrides: Partial<ContactDefinition> = {}): ContactDefinition {
  return {
    id: 'test',
    name: 'Test Contact',
    era: 'mgs1',
    frequency: 140.85,
    role: 'mission_commander',
    availability: 'available',
    portrait: 'placeholder',
    defaultConversation: 'test_conversation',
    specialties: [],
    unlockedByDefault: false,
    isSecret: false,
    description: 'Test',
    ...overrides
  };
}

describe('contact availability engine', () => {
  it('locks context-specific contacts outside their chapter', () => {
    const rules: CodecContactRuleDefinition[] = [{ contactId: 'test', contextIds: ['mgs1_tank_hangar'] }];
    const result = evaluateContactAvailability(contact(), context, rules);
    expect(result.manualCallable).toBe(false);
    expect(result.access).toBe('locked');
  });

  it('treats unknown contacts as incoming-only until remembered', () => {
    const unknown = contact({ availability: 'unknown' });
    const hidden = evaluateContactAvailability(unknown, context, [], { contextUnlockedContactIds: ['test'] });
    expect(hidden.access).toBe('incoming_only');
    expect(hidden.incomingCallable).toBe(true);
    expect(hidden.manualCallable).toBe(false);

    const remembered = evaluateContactAvailability(unknown, context, [], { memoryContactIds: ['test'] });
    expect(remembered.manualCallable).toBe(true);
  });

  it('respects memory-gated manual calls', () => {
    const rules: CodecContactRuleDefinition[] = [{ contactId: 'test', manualCall: 'memory' }];
    expect(evaluateContactAvailability(contact(), context, rules).manualCallable).toBe(false);
    expect(evaluateContactAvailability(contact(), context, rules, { memoryContactIds: ['test'] }).manualCallable).toBe(true);
  });

  it('sorts shared-frequency contacts by configured priority', () => {
    const rules: CodecContactRuleDefinition[] = [
      { contactId: 'a', sharedFrequencyPriority: 10 },
      { contactId: 'b', sharedFrequencyPriority: 30 }
    ];
    const ordered = sortContactsForSharedFrequency([contact({ id: 'a', name: 'A' }), contact({ id: 'b', name: 'B' })], rules);
    expect(ordered.map((item) => item.id)).toEqual(['b', 'a']);
  });
});
