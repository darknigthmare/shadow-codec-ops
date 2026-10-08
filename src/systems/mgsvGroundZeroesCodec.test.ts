import { beforeEach, describe, expect, it } from 'vitest';
import contactsJson from '../data/contacts.json';
import contextsJson from '../data/codecContexts.json';
import rulesJson from '../data/codecContactRules.json';
import conversationsJson from '../data/conversations.json';
import portraitSets from '../data/mgsvPortraitSets.json';
import radioSignals from '../data/radioSignals.json';
import coverage from '../data/codecCanonCoverage.json';
import type { CodecContactRuleDefinition, CodecContextDefinition, CodecRuntimeContext, ContactDefinition, ConversationDefinition } from '../types/codec.types';
import { evaluateContactAvailability } from './contactAvailabilityEngine';
import { getConversationForContact, getConversationTopics, resolveConversationContactRoute } from './conversationEngine';
import { getCharacterPortrait } from './codecAssetEngine';
import { findContactsByFrequency } from './frequencyEngine';
import { createCodecSaveSnapshot, getCodecSaveSlots, normalizeCodecSaveContactMemory, writeCodecSaveSlot } from './codecSaveStorage';
import { convertBuilderDocumentToSideOpsProfile, createBlankMissionBuilderDocument } from './missionBuilderStorage';
import { SIDEOPS_CAMPAIGN_CONVERSATIONS } from '../game/core/sideOpsCampaign';
import { resolveMgsvContactContext } from './mgsvCodecContext';
import { buildRadioCarriers, getRadioSignalHits } from './radioSignalEngine';
import type { RadioSignalDefinition } from '../types/codec.types';
import { getAllCodecVisualIdentities, getCodecVisualIdentity } from './codecVisualIdentity';
import { resolveCodecVisualStageIdentity } from '../components/codec/CodecVisualStage';

const contacts = contactsJson as ContactDefinition[];
const conversations = conversationsJson as ConversationDefinition[];
const rules = rulesJson as CodecContactRuleDefinition[];
const gz = (contextsJson as CodecContextDefinition[]).find((context) => context.id === 'mgsv_ground_zeroes')!;
const contact = (id: string) => contacts.find((item) => item.id === id)!;
const runtime = (context: CodecContextDefinition): CodecRuntimeContext => ({
  contextId: context.id, era: context.era, chapterId: context.chapterId,
  playerId: context.defaultPlayerId, flags: context.flags
});
const availability = (id: string, context = gz) => evaluateContactAvailability(contact(id), runtime(context), rules, {
  contextUnlockedContactIds: context.unlockedContactIds,
  contextBlockedContactIds: context.blockedContactIds
});

describe('Ground Zeroes Codec identity and routing', () => {
  beforeEach(() => window.localStorage.clear());

  it('labels the Ground Zeroes interface MSF without changing Phantom Pain or other eras', () => {
    const base = getCodecVisualIdentity('mgsv');
    const groundZeroes = resolveCodecVisualStageIdentity(base, gz.id);
    expect(groundZeroes.organizationLabel).toBe('MSF');
    expect(groundZeroes.shellLabel).toBe('iDROID / MSF COMMS');
    expect(base.shellLabel).toBe('iDROID / DIAMOND DOGS COMMS');
    for (const context of contextsJson.filter((item) => item.era === 'mgsv' && item.id !== gz.id)) {
      const tpp = resolveCodecVisualStageIdentity(base, context.id);
      expect(tpp.organizationLabel).toBe('DIAMOND DOGS');
      expect(tpp.shellLabel).toBe(base.shellLabel);
    }
    for (const identity of getAllCodecVisualIdentities().filter((item) => item.era !== 'mgsv')) {
      expect(resolveCodecVisualStageIdentity(identity, gz.id)).toBe(identity);
    }
  });

  it('keeps MSF 1975 contacts separate from Diamond Dogs 1984', () => {
    expect(gz.unlockedContactIds).toEqual(['miller_gz', 'morpho_gz']);
    for (const id of gz.unlockedContactIds) {
      expect(contact(id).timelineYear).toBe(1975);
      expect(contact(id).gameTitle).toBe('Metal Gear Solid V: Ground Zeroes');
      expect(contact(id).frequencyVariants?.every((variant) => variant.canonical === false)).toBe(true);
      expect(availability(id).manualCallable).toBe(true);
    }
    expect(contact('miller_mgsv').timelineYear).toBe(1984);
    expect(contact('pequod_mgsv').timelineYear).toBe(1984);
    expect(contact('pequod_mgsv').defaultConversation).toBe('mgsv_pequod_lz');
    expect(contact('morpho_gz').aliases).not.toContain('Pequod');
    expect(contact('morpho_gz').personId).toBeUndefined();
    expect(contacts.filter((item) => item.era === 'mgsv' && availability(item.id).manualCallable).map((item) => item.id))
      .toEqual(['miller_gz', 'morpho_gz']);
    expect(coverage.find((item) => item.era === 'mgsv')?.contactCount).toBe(contacts.filter((item) => item.era === 'mgsv').length);
  });

  it('does not leak the new contacts into any Phantom Pain chapter', () => {
    for (const context of (contextsJson as CodecContextDefinition[]).filter((item) => item.era === 'mgsv' && item.id !== gz.id)) {
      expect(availability('miller_gz', context).manualCallable).toBe(false);
      expect(availability('morpho_gz', context).manualCallable).toBe(false);
      expect(availability('miller_mgsv', context).manualCallable).toBe(true);
      expect(availability('pequod_mgsv', context).manualCallable).toBe(true);
      expect(['miller_gz', 'morpho_gz'].filter((id) => !context.blockedContactIds?.includes(id))).toEqual([]);
    }
    const beacon = radioSignals.find((signal) => signal.id === 'pequod_lz_beacon')!;
    expect(beacon.codename).toBe('PEQUOD ROUTE');
    expect(beacon.contactId).toBe('pequod_mgsv');
    expect(beacon.contextIds).not.toContain(gz.id);
  });

  it('routes the old dial values to the sole callable 1975 contact', () => {
    for (const [frequency, id] of [[144, 'miller_gz'], [147.21, 'morpho_gz']] as const) {
      expect(findContactsByFrequency('mgsv', frequency, contacts).filter((item) => availability(item.id).manualCallable).map((item) => item.id))
        .toEqual([id]);
    }
  });

  it('keeps scanner contacts and strongest locks inside the selected MGSV chapter', () => {
    const tpp = (contextsJson as CodecContextDefinition[]).find((item) => item.id === 'mgsv_afghanistan')!;
    for (const [context, commander, pilot] of [[gz, 'miller_gz', 'morpho_gz'], [tpp, 'miller_mgsv', 'pequod_mgsv']] as const) {
      const carriers = buildRadioCarriers(contacts, radioSignals as RadioSignalDefinition[], 'mgsv', context.id, context.flags);
      expect(getRadioSignalHits(144, carriers)[0]?.carrier.contactId).toBe(commander);
      expect(getRadioSignalHits(147.21, carriers)[0]?.carrier.contactId).toBe(pilot);
      const wrongEra = context === gz ? ['miller_mgsv', 'pequod_mgsv'] : ['miller_gz', 'morpho_gz'];
      expect(carriers.some((carrier) => wrongEra.includes(carrier.contactId ?? ''))).toBe(false);
    }
  });

  it('preserves independent secret signals and valid classified contacts in the scanner', () => {
    const carriers = buildRadioCarriers(contacts, radioSignals as RadioSignalDefinition[], 'mgsv', gz.id, gz.flags);
    expect(carriers.find((carrier) => carrier.signalId === 'xof_burst_cipher')?.hidden).toBe(true);
    const late = (contextsJson as CodecContextDefinition[]).find((item) => item.id === 'mgsv_skull_face')!;
    const lateCarriers = buildRadioCarriers(contacts, radioSignals as RadioSignalDefinition[], 'mgsv', late.id, late.flags);
    expect(lateCarriers.find((carrier) => carrier.kind === 'contact' && carrier.contactId === 'skull_face_mgsv')?.hidden).toBe(true);
    expect(lateCarriers.some((carrier) => carrier.signalId === 'skull_face_phantom')).toBe(true);
  });

  it('resolves six portrait states without aliasing Morpho to Pequod or Kaz to 1984', () => {
    for (const [id, directory] of [['miller_gz', 'miller_gz'], ['morpho_gz', 'morpho']]) {
      const set = portraitSets.find((item) => item.characterId === id)!;
      expect(set.expressions).toEqual(['neutral', 'serious', 'warning', 'calm', 'humor', 'glitch']);
      expect(set.aliases).not.toContain('pequod_mgsv');
      expect(set.aliases).not.toContain('miller_mgsv');
      for (const expression of set.expressions) expect(getCharacterPortrait(id, expression)).toBe(`/portraits/mgsv/${directory}/${expression}.webp`);
      expect(getCharacterPortrait(id, 'unsupported')).toBe(`/portraits/mgsv/${directory}/neutral.webp`);
    }
    expect(getCharacterPortrait('pequod_mgsv')).toBe('/portraits/mgsv/pequod/neutral.webp');
    expect(getCharacterPortrait('miller_mgsv')).toBe('/portraits/mgsv/miller/neutral.webp');
  });

  it('reuses generic scripts textually, with correct contact, speaker and frequency in each pool', () => {
    for (const id of ['miller_gz', 'morpho_gz']) {
      const topics = getConversationTopics(contact(id), conversations, gz.id);
      expect(topics.length).toBeGreaterThan(0);
      for (const topic of topics) {
        const routed = getConversationForContact(contact(id), conversations, 'manual_call', topic.id, gz.id)!;
        const original = conversations.find((item) => item.id === routed.id)!;
        expect(routed.contactId).toBe(id);
        expect(routed.frequency).toBe(contact(id).frequency);
        expect(routed.lines.map(({ speaker: _speaker, ...line }) => line)).toEqual(original.lines.map(({ speaker: _speaker, ...line }) => line));
        expect(routed.lines[0].speaker).toBe(id);
        expect(routed.lines.map((line) => line.text).join(' ')).not.toMatch(/Pequod|Venom|Diamond Dogs|1984/);
        expect(resolveConversationContactRoute(original, contact(id), gz.id)).toEqual(routed);
      }
      expect(getConversationForContact(contact(id), conversations, 'manual_call', undefined, 'mgsv_afghanistan')).toBeUndefined();
    }
    expect(getConversationTopics(contact('morpho_gz'), conversations, gz.id).map((topic) => topic.id)).toEqual(['extraction']);
    expect(getConversationForContact(contact('miller_mgsv'), conversations, 'manual_call', undefined, gz.id)).toBeUndefined();
    expect(getConversationForContact(contact('pequod_mgsv'), conversations, 'manual_call', undefined, gz.id)).toBeUndefined();
    expect(getConversationForContact(contact('pequod_mgsv'), conversations, 'manual_call', undefined, 'mgsv_afghanistan')?.id).toBe('mgsv_pequod_lz');
  });

  it('keeps authored Ground Zeroes campaign support on Kaz 1975', () => {
    const calls = SIDEOPS_CAMPAIGN_CONVERSATIONS.filter((item) => item.id.startsWith('sideops_mgsv_ground_zeroes_'));
    expect(calls.length).toBeGreaterThan(0);
    expect(calls.every((item) => item.contactId === 'miller_gz')).toBe(true);
    expect(calls.flatMap((item) => item.lines).some((line) => line.speaker === 'miller_mgsv')).toBe(false);
  });

  it('switches incoming Builder or campaign support to the right chapter before resolving a script', () => {
    const contexts = contextsJson as CodecContextDefinition[];
    const tpp = contexts.find((item) => item.id === 'mgsv_afghanistan')!;
    for (const id of ['miller_gz', 'morpho_gz']) {
      const incoming = resolveMgsvContactContext(id, tpp, contexts);
      expect(incoming).toBe(gz);
      const source = conversations.find((item) => item.id === contact(id).defaultConversation)!;
      expect(resolveConversationContactRoute(source, contact(id), incoming.id)?.contactId).toBe(id);
    }
    expect(resolveMgsvContactContext('pequod_mgsv', gz, contexts).id).toBe(tpp.id);
    expect(resolveMgsvContactContext('miller_mgsv', tpp, contexts)).toBe(tpp);
  });

  it('enriches legacy Ground Zeroes save memories without rewriting historical calls or 1984 IDs', () => {
    const snapshot = createCodecSaveSnapshot('codec_slot_1', {
      era: 'mgsv', contextId: gz.id, playerId: 'big_boss_gz', frequency: 147.21,
      selectedTheme: 'mgsv', label: 'Camp Omega', memoryContactIds: ['miller_mgsv', 'pequod_mgsv'],
      callHistory: [{ callId: 'legacy-pequod', contactId: 'pequod_mgsv', contactName: 'Pequod', frequency: 147.21, era: 'mgsv', conversationId: 'mgsv_pequod_lz', title: 'Landing Zone Support', timestamp: '1975-save', source: 'manual_call', completed: true }]
    });
    writeCodecSaveSlot(snapshot);
    const restored = getCodecSaveSlots().codec_slot_1!;
    expect(restored.memoryContactIds).toEqual(['miller_mgsv', 'pequod_mgsv', 'miller_gz', 'morpho_gz']);
    expect(restored.callHistory).toEqual(snapshot.callHistory);
    expect(restored.frequency).toBe(147.21);
    expect(restored.memoryContactIds.filter((id) => !gz.blockedContactIds?.includes(id))).toEqual(['miller_gz', 'morpho_gz']);
    expect(normalizeCodecSaveContactMemory(restored)).toEqual(restored);
    const tpp = { ...snapshot, contextId: 'mgsv_afghanistan' };
    expect(normalizeCodecSaveContactMemory(tpp)).toBe(tpp);
  });

  it('uses era-correct Builder fallback calls for MSF and preserves Phantom Pain defaults', () => {
    for (const [era, visualPackId, expectedContact, expectedConversation] of [
      ['peace_walker', 'peace_walker', 'miller_pw', 'pw_miller_briefing'],
      ['mgsv', 'mgsv_ground_zeroes', 'miller_gz', 'mgsv_assetpass_area_report'],
      ['mgsv', 'mgsv_phantom_pain', 'miller_mgsv', 'mgsv_miller_idroid']
    ] as const) {
      const profile = convertBuilderDocumentToSideOpsProfile({
        ...createBlankMissionBuilderDocument(), era, visualPackId, codecTriggers: []
      });
      expect(profile.codec.missionStart.contactId).toBe(expectedContact);
      expect(profile.codec.missionStart.conversationId).toBe(expectedConversation);
    }
  });
});
