import { describe, expect, it } from 'vitest';
import bosses from './bosses.json';
import contacts from './contacts.json';
import conversations from './conversations.json';
import enemies from './enemies.json';
import items from './items.json';
import missions from './missions.json';
import tapes from './tapes.json';
import vrMissions from './vrMissions.json';
import campaigns from './campaigns.json';
import loreEntries from './loreEntries.json';
import type { CampaignDefinition } from '../types/campaign.types';

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
    expectUniqueIds('campaigns', campaigns);
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

});
