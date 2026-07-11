import { describe, expect, it } from 'vitest';
import contactsJson from '../data/contacts.json';
import contextsJson from '../data/codecContexts.json';
import conversationsJson from '../data/conversations.json';
import type { CodecContextDefinition, ContactDefinition, ConversationDefinition } from '../types/codec.types';
import { auditMgs1Codec } from './mgs1FinalAudit';

describe('MGS1-D final audit', () => {
  const result = auditMgs1Codec(
    contactsJson as ContactDefinition[],
    conversationsJson as ConversationDefinition[],
    contextsJson as CodecContextDefinition[]
  );

  it('passes every principal contact and chapter check', () => {
    expect(result.issues).toEqual([]);
    expect(result.passed).toBe(true);
  });

  it('keeps the completed MGS1 content floor', () => {
    expect(result.metrics.contacts).toBe(8);
    expect(result.metrics.conversations).toBeGreaterThanOrEqual(130);
    expect(result.metrics.contexts).toBeGreaterThanOrEqual(10);
    expect(result.metrics.scheduledCalls).toBeGreaterThanOrEqual(10);
  });
});
