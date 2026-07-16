import { describe, expect, it } from 'vitest';
import bosses from './bosses.json';
import contacts from './contacts.json';
import conversations from './conversations.json';
import enemies from './enemies.json';
import items from './items.json';
import missions from './missions.json';
import tapes from './tapes.json';
import vrMissions from './vrMissions.json';
import vrExtras from './vrExtras.json';
import campaigns from './campaigns.json';
import loreEntries from './loreEntries.json';
import codecContexts from './codecContexts.json';
import codecContactRules from './codecContactRules.json';
import codecCanonSources from './codecCanonSources.json';
import codecCanonCoverage from './codecCanonCoverage.json';
import radioSignals from './radioSignals.json';
import type { CampaignDefinition } from '../types/campaign.types';
import type { CodecCanonCoverageEntry, CodecCanonSourceDefinition, CodecContactRuleDefinition, CodecContextDefinition, ContactDefinition, ConversationDefinition, RadioSignalDefinition } from '../types/codec.types';

interface Identified { id: string }

function expectUniqueIds(label: string, values: Identified[]): void {
  const ids = values.map((value) => value.id);
  expect(new Set(ids).size, `${label} contains duplicate IDs`).toBe(ids.length);
}

describe('local JSON data integrity', () => {
  it('uses unique IDs in every primary collection', () => {
    expectUniqueIds('contacts', contacts);
    expectUniqueIds('conversations', conversations);
    expectUniqueIds('missions', missions);
    expectUniqueIds('items', items);
    expectUniqueIds('enemies', enemies);
    expectUniqueIds('bosses', bosses);
    expectUniqueIds('tapes', tapes);
    expectUniqueIds('VR missions', vrMissions);
    expectUniqueIds('VR extras', vrExtras);
    expectUniqueIds('campaigns', campaigns);
    expectUniqueIds('Codec contexts', codecContexts);
    expectUniqueIds('Codec canon sources', codecCanonSources);
    expectUniqueIds('Radio signals', radioSignals);
  });

  it('keeps contact and conversation references valid', () => {
    const contactIds = new Set(contacts.map((contact) => contact.id));
    const conversationIds = new Set(conversations.map((conversation) => conversation.id));

    contacts.forEach((contact) => expect(conversationIds.has(contact.defaultConversation), `${contact.id} default conversation`).toBe(true));
    conversations.forEach((conversation) => expect(contactIds.has(conversation.contactId), `${conversation.id} contact`).toBe(true));
  });

  it('keeps Side Ops mission references valid', () => {
    const contactIds = new Set(contacts.map((contact) => contact.id));
    const conversationIds = new Set(conversations.map((conversation) => conversation.id));
    const itemIds = new Set(items.map((item) => item.id));
    const enemyIds = new Set(enemies.map((enemy) => enemy.id));
    const bossIds = new Set(bosses.map((boss) => boss.id));

    missions.forEach((mission) => {
      expect(conversationIds.has(mission.briefingConversation), `${mission.id} briefing`).toBe(true);
      expect(conversationIds.has(mission.debriefingConversation), `${mission.id} debriefing`).toBe(true);
      mission.availableItems.forEach((itemId) => expect(itemIds.has(itemId), `${mission.id} item ${itemId}`).toBe(true));
      mission.enemies.forEach((enemyId) => expect(enemyIds.has(enemyId) || bossIds.has(enemyId), `${mission.id} enemy ${enemyId}`).toBe(true));
      if (mission.boss) expect(bossIds.has(mission.boss), `${mission.id} boss`).toBe(true);
      mission.codecTriggers.forEach((trigger) => {
        expect(contactIds.has(trigger.contactId), `${mission.id} trigger contact ${trigger.contactId}`).toBe(true);
        expect(conversationIds.has(trigger.conversationId), `${mission.id} trigger conversation ${trigger.conversationId}`).toBe(true);
      });
    });
  });

  it('keeps tape and VR reward references valid', () => {
    const missionIds = new Set([...missions.map((mission) => mission.id), ...vrMissions.map((mission) => mission.id)]);
    const conversationIds = new Set(conversations.map((conversation) => conversation.id));
    const tapeIds = new Set(tapes.map((tape) => tape.id));

    tapes.forEach((tape) => {
      if (tape.relatedMission) expect(missionIds.has(tape.relatedMission), `${tape.id} related mission`).toBe(true);
      if (tape.relatedConversation) expect(conversationIds.has(tape.relatedConversation), `${tape.id} related conversation`).toBe(true);
      expect(tape.transcript.length, `${tape.id} transcript`).toBeGreaterThan(0);
    });

    vrMissions.forEach((mission) => mission.rewards.forEach((reward) => {
      const tapeId = 'tapeId' in reward ? String(reward.tapeId ?? '') : '';
      if (tapeId) expect(tapeIds.has(tapeId), `${mission.id} reward tape ${tapeId}`).toBe(true);
    }));
  });

  it('keeps campaign graph and unlock references valid', () => {
    const missionIds = new Set(missions.map((mission) => mission.id));
    const vrMissionIds = new Set(vrMissions.map((mission) => mission.id));
    const tapeIds = new Set(tapes.map((tape) => tape.id));
    const contactIds = new Set(contacts.map((contact) => contact.id));
    const loreIds = new Set(loreEntries.map((entry) => entry.id));

    (campaigns as CampaignDefinition[]).forEach((campaign) => {
      const nodes = campaign.chapters.flatMap((chapter) => chapter.nodes);
      const nodeIds = new Set(nodes.map((node) => node.id));
      expect(nodeIds.size, `${campaign.id} duplicate node IDs`).toBe(nodes.length);
      const endingIds = new Set<string>();
      const branchOptions = new Map<string, Set<string>>();
      nodes.forEach((node) => {
        node.prerequisites.forEach((id) => expect(nodeIds.has(id), `${node.id} prerequisite ${id}`).toBe(true));
        if (node.branch) {
          const options = branchOptions.get(node.branch.groupId) ?? new Set<string>();
          options.add(node.branch.optionId);
          branchOptions.set(node.branch.groupId, options);
        }
        if (node.ending) {
          expect(endingIds.has(node.ending.id), `${node.id} duplicate ending ${node.ending.id}`).toBe(false);
          endingIds.add(node.ending.id);
        }
        if (node.condition.type === 'sideops_clear') expect(missionIds.has(node.condition.missionId), `${node.id} Side Ops target`).toBe(true);
        if (node.condition.type === 'vr_clear') expect(vrMissionIds.has(node.condition.missionId), `${node.id} VR target`).toBe(true);
        if (node.condition.type === 'tape_listened') expect(tapeIds.has(node.condition.tapeId), `${node.id} tape target`).toBe(true);
        if (node.condition.type === 'codec_call') expect(contactIds.has(node.condition.contactId), `${node.id} contact target`).toBe(true);
        if (node.condition.type === 'lore_viewed') expect(loreIds.has(node.condition.loreId), `${node.id} lore target`).toBe(true);
        (node.reward.unlockMissionIds ?? []).forEach((id) => expect(missionIds.has(id), `${node.id} mission unlock ${id}`).toBe(true));
        (node.reward.unlockVrMissionIds ?? []).forEach((id) => expect(vrMissionIds.has(id), `${node.id} VR unlock ${id}`).toBe(true));
        (node.reward.unlockTapeIds ?? []).forEach((id) => expect(tapeIds.has(id), `${node.id} tape unlock ${id}`).toBe(true));
        (node.reward.unlockContactIds ?? []).forEach((id) => expect(contactIds.has(id), `${node.id} contact unlock ${id}`).toBe(true));
        (node.reward.unlockLoreIds ?? []).forEach((id) => expect(loreIds.has(id), `${node.id} lore unlock ${id}`).toBe(true));
      });
      branchOptions.forEach((options, groupId) => expect(options.size, `${campaign.id} branch ${groupId} needs multiple options`).toBeGreaterThan(1));
    });
  });


  it('keeps Codec contexts and contact availability rules valid', () => {
    const contactIds = new Set(contacts.map((contact) => contact.id));
    const eraIds = new Set(['msx', 'mgs1', 'mgs2', 'mgs3', 'mgs4', 'peace_walker', 'mgsv', 'vr_simulation', 'patriots_ai']);
    const typedContexts = codecContexts as CodecContextDefinition[];
    const typedRules = codecContactRules as CodecContactRuleDefinition[];
    const contextIds = new Set(typedContexts.map((context) => context.id));
    const ruleContactIds = new Set<string>();

    typedContexts.forEach((context) => {
      expect(eraIds.has(context.era), `${context.id} era`).toBe(true);
      expect(context.players.some((player) => player.id === context.defaultPlayerId), `${context.id} default player`).toBe(true);
      context.unlockedContactIds.forEach((contactId) => expect(contactIds.has(contactId), `${context.id} unlocked contact ${contactId}`).toBe(true));
      (context.blockedContactIds ?? []).forEach((contactId) => expect(contactIds.has(contactId), `${context.id} blocked contact ${contactId}`).toBe(true));
    });

    typedRules.forEach((rule) => {
      expect(contactIds.has(rule.contactId), `Codec rule contact ${rule.contactId}`).toBe(true);
      expect(ruleContactIds.has(rule.contactId), `Duplicate Codec rule ${rule.contactId}`).toBe(false);
      ruleContactIds.add(rule.contactId);
      (rule.contextIds ?? []).forEach((contextId) => expect(contextIds.has(contextId), `${rule.contactId} context ${contextId}`).toBe(true));
      (rule.excludedContextIds ?? []).forEach((contextId) => expect(contextIds.has(contextId), `${rule.contactId} excluded context ${contextId}`).toBe(true));
    });
  });


  it('keeps Canon Data metadata, sources and channel variants valid', () => {
    const typedContacts = contacts as ContactDefinition[];
    const typedConversations = conversations as ConversationDefinition[];
    const typedSources = codecCanonSources as CodecCanonSourceDefinition[];
    const sourceIds = new Set(typedSources.map((source) => source.id));
    const contextIds = new Set((codecContexts as CodecContextDefinition[]).map((context) => context.id));
    const ruleIds = new Set((codecContactRules as CodecContactRuleDefinition[]).map((rule) => rule.contactId));

    typedContacts.forEach((contact) => {
      expect(contact.gameTitle, `${contact.id} game title`).toBeTruthy();
      expect(contact.timelineYear, `${contact.id} timeline year`).toBeTypeOf('number');
      expect(contact.canonStatus, `${contact.id} canon status`).toBeTruthy();
      expect(contact.frequencyKind, `${contact.id} frequency kind`).toBeTruthy();
      expect(contact.frequencyVariants?.length, `${contact.id} channel variants`).toBeGreaterThan(0);
      expect(ruleIds.has(contact.id), `${contact.id} availability rule`).toBe(true);
      (contact.sourceIds ?? []).forEach((sourceId) => expect(sourceIds.has(sourceId), `${contact.id} source ${sourceId}`).toBe(true));
      (contact.frequencyVariants ?? []).forEach((variant) => {
        expect(Number.isFinite(variant.frequency), `${contact.id} variant frequency`).toBe(true);
        (variant.contextIds ?? []).forEach((contextId) => expect(contextIds.has(contextId), `${contact.id} variant context ${contextId}`).toBe(true));
        if (variant.sourceId) expect(sourceIds.has(variant.sourceId), `${contact.id} variant source ${variant.sourceId}`).toBe(true);
        if (['network_channel', 'briefing_channel', 'idroid_channel', 'simulation_channel', 'incoming_only'].includes(variant.kind)) {
          expect(variant.canonical, `${contact.id} modern/simulated channel must not claim a canon numeric frequency`).toBe(false);
        }
      });
    });

    typedConversations.forEach((conversation) => {
      expect(conversation.canonStatus, `${conversation.id} canon status`).toBeTruthy();
      expect(conversation.loreBasis, `${conversation.id} lore basis`).toBeTruthy();
      (conversation.sourceIds ?? []).forEach((sourceId) => expect(sourceIds.has(sourceId), `${conversation.id} source ${sourceId}`).toBe(true));
    });
  });

  it('keeps the canon coverage matrix synchronized with live data', () => {
    const typedCoverage = codecCanonCoverage as CodecCanonCoverageEntry[];
    const eraIds = new Set((contacts as ContactDefinition[]).map((contact) => contact.era));
    expect(new Set(typedCoverage.map((entry) => entry.era)).size).toBe(typedCoverage.length);
    expect(new Set(typedCoverage.map((entry) => entry.era))).toEqual(eraIds);

    typedCoverage.forEach((entry) => {
      expect(entry.contactCount, `${entry.era} contact coverage count`).toBe(contacts.filter((contact) => contact.era === entry.era).length);
      expect(entry.contextCount, `${entry.era} context coverage count`).toBe(codecContexts.filter((context) => context.era === entry.era).length);
      expect(entry.conversationCount, `${entry.era} conversation coverage count`).toBe(conversations.filter((conversation) => conversation.era === entry.era).length);
      expect(entry.channelPolicy, `${entry.era} channel policy`).toBeTruthy();
      expect(entry.coverageFocus.length, `${entry.era} coverage focus`).toBeGreaterThan(0);
      expect(entry.remainingGaps.length, `${entry.era} remaining gaps`).toBeGreaterThan(0);
    });
  });


  it('keeps radio signal intelligence references and puzzles valid', () => {
    const typedSignals = radioSignals as RadioSignalDefinition[];
    const contactIds = new Set(contacts.map((contact) => contact.id));
    const conversationIds = new Set(conversations.map((conversation) => conversation.id));
    const contextIds = new Set((codecContexts as CodecContextDefinition[]).map((context) => context.id));
    const sourceIds = new Set((codecCanonSources as CodecCanonSourceDefinition[]).map((source) => source.id));

    typedSignals.forEach((signal) => {
      expect(signal.frequency, `${signal.id} frequency`).toBeGreaterThanOrEqual(100);
      expect(signal.frequency, `${signal.id} frequency`).toBeLessThanOrEqual(200);
      expect(signal.bandwidth, `${signal.id} bandwidth`).toBeGreaterThan(0);
      expect(signal.strength, `${signal.id} strength`).toBeGreaterThan(0);
      expect(signal.strength, `${signal.id} strength`).toBeLessThanOrEqual(1);
      (signal.contextIds ?? []).forEach((contextId) => expect(contextIds.has(contextId), `${signal.id} context ${contextId}`).toBe(true));
      if (signal.contactId) expect(contactIds.has(signal.contactId), `${signal.id} contact ${signal.contactId}`).toBe(true);
      if (signal.conversationId) expect(conversationIds.has(signal.conversationId), `${signal.id} conversation ${signal.conversationId}`).toBe(true);
      if (signal.reward?.unlockContactId) expect(contactIds.has(signal.reward.unlockContactId), `${signal.id} unlock contact`).toBe(true);
      if (signal.reward?.unlockConversationId) expect(conversationIds.has(signal.reward.unlockConversationId), `${signal.id} unlock conversation`).toBe(true);
      (signal.sourceIds ?? []).forEach((sourceId) => expect(sourceIds.has(sourceId), `${signal.id} source ${sourceId}`).toBe(true));
      if (signal.encrypted) {
        expect(signal.puzzle, `${signal.id} encrypted signal puzzle`).toBeTruthy();
        expect(signal.puzzle?.answer.trim(), `${signal.id} puzzle answer`).toBeTruthy();
      }
    });
  });

});
