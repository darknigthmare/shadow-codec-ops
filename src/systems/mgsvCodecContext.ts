import type { CodecContextDefinition } from '../types/codec.types';

/** MGSV shares one era key, but its 1975 and 1984 operators are not interchangeable. */
export function resolveMgsvContactContext(
  contactId: string,
  current: CodecContextDefinition,
  contexts: CodecContextDefinition[]
): CodecContextDefinition {
  if (contactId === 'miller_gz' || contactId === 'morpho_gz') {
    return contexts.find((context) => context.id === 'mgsv_ground_zeroes') ?? current;
  }
  if (current.id === 'mgsv_ground_zeroes' && current.blockedContactIds?.includes(contactId)) {
    return contexts.find((context) => context.era === 'mgsv' && context.id !== current.id && context.unlockedContactIds.includes(contactId)) ?? current;
  }
  return current;
}
