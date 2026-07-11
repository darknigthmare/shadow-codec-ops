import type {
  CodecContactAvailabilityResult,
  CodecContactRuleDefinition,
  CodecRuntimeContext,
  ContactDefinition
} from '../types/codec.types';

export interface ContactAvailabilityOptions {
  memoryContactIds?: string[];
  contextUnlockedContactIds?: string[];
  contextBlockedContactIds?: string[];
}

function includesAll(haystack: string[], needles: string[] | undefined): boolean {
  return !needles?.length || needles.every((needle) => haystack.includes(needle));
}

function includesAny(haystack: string[], needles: string[] | undefined): boolean {
  return Boolean(needles?.some((needle) => haystack.includes(needle)));
}

export function findContactRule(
  contactId: string,
  rules: CodecContactRuleDefinition[]
): CodecContactRuleDefinition | undefined {
  return rules.find((rule) => rule.contactId === contactId);
}

export function evaluateContactAvailability(
  contact: ContactDefinition,
  context: CodecRuntimeContext,
  rules: CodecContactRuleDefinition[],
  options: ContactAvailabilityOptions = {}
): CodecContactAvailabilityResult {
  const rule = findContactRule(contact.id, rules);
  const inMemory = Boolean(contact.unlockedByDefault || options.memoryContactIds?.includes(contact.id));
  const contextUnlocked = Boolean(options.contextUnlockedContactIds?.includes(contact.id));
  const contextBlocked = Boolean(options.contextBlockedContactIds?.includes(contact.id));

  if (contact.era !== context.era) {
    return {
      access: 'locked',
      reason: 'Contact belongs to another era.',
      manualCallable: false,
      incomingCallable: false,
      visibleInMemory: false
    };
  }

  if (contextBlocked) {
    return {
      access: 'locked',
      reason: 'Channel blocked by the selected mission context.',
      manualCallable: false,
      incomingCallable: false,
      visibleInMemory: inMemory
    };
  }

  if (contact.availability === 'dead') {
    return {
      access: 'dead',
      reason: 'No living operator is available on this channel.',
      manualCallable: false,
      incomingCallable: false,
      visibleInMemory: inMemory
    };
  }

  if (contact.availability === 'jammed') {
    return {
      access: 'jammed',
      reason: 'The signal is being actively jammed.',
      manualCallable: false,
      incomingCallable: false,
      visibleInMemory: inMemory
    };
  }

  const contextAllowed = !rule?.contextIds?.length || rule.contextIds.includes(context.contextId);
  const contextExcluded = Boolean(rule?.excludedContextIds?.includes(context.contextId));
  const flagsAllowed = includesAll(context.flags, rule?.requiredFlags) && !includesAny(context.flags, rule?.forbiddenFlags);
  const unlocked = contextUnlocked || inMemory;

  if (!contextAllowed || contextExcluded || !flagsAllowed) {
    return {
      access: 'locked',
      reason: !contextAllowed || contextExcluded
        ? 'Contact is unavailable during this chapter or mission.'
        : 'Required mission conditions have not been met.',
      manualCallable: false,
      incomingCallable: false,
      visibleInMemory: inMemory
    };
  }

  let manualCallable = contact.manualCallAllowed !== false && rule?.manualCall !== 'deny';
  let incomingCallable = contact.incomingCallAllowed !== false && rule?.incomingCall !== 'deny';

  if (rule?.manualCall === 'memory') manualCallable = unlocked;
  if (contact.availability === 'locked') manualCallable = false;
  if (contact.availability === 'conditional' && !unlocked) manualCallable = false;

  if (contact.availability === 'unknown' && !inMemory) {
    return {
      access: 'incoming_only',
      reason: 'Unknown signal. It must contact you first before manual recall is possible.',
      manualCallable: false,
      incomingCallable,
      visibleInMemory: false
    };
  }

  if (!manualCallable && incomingCallable) {
    return {
      access: 'incoming_only',
      reason: 'Incoming transmissions are possible, but manual calls are restricted.',
      manualCallable: false,
      incomingCallable: true,
      visibleInMemory: inMemory
    };
  }

  if (!manualCallable && !incomingCallable) {
    return {
      access: 'locked',
      reason: 'Channel access is restricted by the current context.',
      manualCallable: false,
      incomingCallable: false,
      visibleInMemory: inMemory
    };
  }

  return {
    access: contact.availability === 'unknown' ? 'unknown' : 'available',
    reason: contextUnlocked || inMemory ? 'Channel available in the current context.' : 'Public support channel available.',
    manualCallable,
    incomingCallable,
    visibleInMemory: inMemory || contextUnlocked
  };
}

export function sortContactsForSharedFrequency(
  contacts: ContactDefinition[],
  rules: CodecContactRuleDefinition[]
): ContactDefinition[] {
  return [...contacts].sort((left, right) => {
    const leftRule = findContactRule(left.id, rules);
    const rightRule = findContactRule(right.id, rules);
    const leftPriority = left.sharedFrequencyPriority ?? leftRule?.sharedFrequencyPriority ?? 0;
    const rightPriority = right.sharedFrequencyPriority ?? rightRule?.sharedFrequencyPriority ?? 0;
    return rightPriority - leftPriority || left.name.localeCompare(right.name);
  });
}
