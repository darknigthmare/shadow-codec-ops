import { describe, expect, it } from 'vitest';
import contacts from './contacts.json';
import contexts from './codecContexts.json';
import conversations from './conversations.json';
import eras from './eras.json';
import radioSignals from './radioSignals.json';
import themes from './themes.json';
import { getCodecVisualIdentity } from '../systems/codecVisualIdentity';
import { getCodecAssetPack } from '../systems/codecAssetEngine';

const eraIds = eras.map((era) => era.id);

describe('final Codec QA matrix', () => {
  it('covers every era with a context, contact, conversation and visual identity', () => {
    for (const eraId of eraIds) {
      expect(contexts.some((context) => context.era === eraId), `${eraId} context`).toBe(true);
      expect(contacts.some((contact) => contact.era === eraId), `${eraId} contact`).toBe(true);
      expect(conversations.some((conversation) => conversation.era === eraId), `${eraId} conversation`).toBe(true);
      expect(getCodecVisualIdentity(eraId as Parameters<typeof getCodecVisualIdentity>[0]).layoutId).toBeTruthy();
    }
  });

  it('covers every era with an asset profile and theme route', () => {
    for (const eraId of eraIds) {
      expect(getCodecAssetPack(eraId as Parameters<typeof getCodecAssetPack>[0])).toBeTruthy();
      expect(themes.some((theme) => theme.id === eras.find((era) => era.id === eraId)?.visualStyle), `${eraId} theme`).toBe(true);
    }
  });

  it('keeps radio intelligence available across the supported era matrix', () => {
    for (const eraId of eraIds) expect(radioSignals.some((signal) => signal.era === eraId), `${eraId} radio signal`).toBe(true);
  });

  it('keeps conversation contact references valid', () => {
    const contactIds = new Set(contacts.map((contact) => contact.id));
    for (const conversation of conversations) expect(contactIds.has(conversation.contactId), conversation.id).toBe(true);
  });
});
