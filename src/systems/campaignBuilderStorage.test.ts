import { beforeEach, describe, expect, it } from 'vitest';
import {
  createBlankCampaignBuilderDocument,
  exportCampaignBuilderPack,
  importCampaignBuilderPack,
  validateCampaignBuilderDocument
} from './campaignBuilderStorage';

beforeEach(() => window.localStorage.clear());

describe('campaign builder content pipeline', () => {
  it('creates a valid starter campaign with exclusive routes and endings', () => {
    const document = createBlankCampaignBuilderDocument(1);
    const issues = validateCampaignBuilderDocument(document);
    expect(issues.filter((issue) => issue.severity === 'error')).toHaveLength(0);
    const nodes = document.chapters.flatMap((chapter) => chapter.nodes);
    expect(nodes.filter((node) => node.branch?.groupId === 'operational_doctrine')).toHaveLength(4);
    expect(nodes.filter((node) => node.ending)).toHaveLength(2);
    expect(document.briefing?.tone).toBe('briefing');
    expect(document.initialVariables?.['network.integrity']).toBe(100);
    expect(document.chapters[0].briefing).toBeTruthy();
    expect(nodes.filter((node) => node.branch?.choicePresentation)).toHaveLength(2);
    expect(nodes.filter((node) => node.ending?.epilogue)).toHaveLength(2);
  });

  it('detects prerequisite cycles', () => {
    const document = createBlankCampaignBuilderDocument(1);
    const nodes = document.chapters[0].nodes;
    nodes[0] = { ...nodes[0], prerequisites: [nodes[1].id] };
    nodes[1] = { ...nodes[1], prerequisites: [nodes[0].id] };
    const issues = validateCampaignBuilderDocument(document);
    expect(issues.some((issue) => issue.id === 'campaign-cycle' && issue.severity === 'error')).toBe(true);
  });

  it('exports and imports a portable campaign pack', () => {
    const document = createBlankCampaignBuilderDocument(2);
    const exported = exportCampaignBuilderPack([document], { packId: 'test_campaign_pack' });
    const imported = importCampaignBuilderPack(JSON.stringify(exported.payload));
    expect(exported.fileName).toContain('test_campaign_pack');
    expect(imported).toHaveLength(1);
    expect(imported[0].id).toBe(document.id);
    expect(imported[0].chapters[0].nodes.length).toBeGreaterThan(0);
    expect(exported.payload.schemaVersion).toBe(2);
    expect(imported[0].briefing?.title).toBe(document.briefing?.title);
  });
  it('validates narrative event IDs, targets and variable mutations', () => {
    const document = createBlankCampaignBuilderDocument(3);
    const event = {
      id: 'duplicate_event',
      trigger: 'campaign_start' as const,
      presentation: { id: 'duplicate_event_card', title: 'Event', body: 'Validation fixture.' }
    };
    document.narrativeEvents = [
      event,
      { ...event, presentation: { ...event.presentation, id: `${event.presentation.id}_copy` } },
      {
        ...event,
        id: 'missing_chapter_event',
        trigger: 'chapter_start' as const,
        targetId: 'missing_chapter',
        presentation: { ...event.presentation, id: 'missing_chapter_card' },
        variableEffects: [{ variable: '', operation: 'set' as const, value: true }]
      }
    ];
    const issues = validateCampaignBuilderDocument(document);
    expect(issues.some((issue) => issue.id.startsWith('duplicate-narrative-event-') && issue.severity === 'error')).toBe(true);
    expect(issues.some((issue) => issue.id === 'narrative-target-missing_chapter_event' && issue.severity === 'error')).toBe(true);
    expect(issues.some((issue) => issue.id === 'narrative-variable-missing_chapter_event' && issue.severity === 'error')).toBe(true);
  });

  it('includes narrative and additional-condition references in pack dependencies', () => {
    const document = createBlankCampaignBuilderDocument(4);
    document.chapters[0].nodes[0].additionalConditions = [{ type: 'tape_listened', tapeId: 'tape_side_ops_design_log_001' }];
    document.narrativeEvents = [{
      id: 'codec_event',
      trigger: 'variable_condition',
      condition: { type: 'codec_call', contactId: 'campbell_mgs1' },
      presentation: { id: 'codec_event_card', title: 'Codec Event', body: 'Dependency test.' }
    }];
    const exported = exportCampaignBuilderPack([document], { packId: 'dependency_pack' });
    expect(exported.payload.dependencies.tapes).toContain('tape_side_ops_design_log_001');
    expect(exported.payload.dependencies.contacts).toContain('campbell_mgs1');
  });

});
