import '../../styles/campaign-builder.css';
import { useMemo, useState } from 'react';
import contactsJson from '../../data/contacts.json';
import loreJson from '../../data/loreEntries.json';
import missionsJson from '../../data/missions.json';
import tapesJson from '../../data/tapes.json';
import vrMissionsJson from '../../data/vrMissions.json';
import type { CampaignBuilderDocument, CampaignBuilderLibrary, CampaignBuilderValidationIssue } from '../../types/campaignBuilder.types';
import type {
  CampaignChapterDefinition,
  CampaignCondition,
  CampaignModule,
  CampaignNodeDefinition,
  CampaignRank,
  CampaignResourceId,
  CampaignNarrativeEventDefinition,
  CampaignNarrativeTrigger,
  CampaignPresentationDefinition,
  CampaignPresentationTone,
  CampaignVariableMutation,
  CampaignVariableValue
} from '../../types/campaign.types';
import type { EraId } from '../../types/codec.types';
import {
  CAMPAIGN_BUILDER_PREVIEW_KEY,
  createBlankCampaignBuilderDocument,
  createCampaignBuilderChapter,
  createCampaignBuilderNode,
  exportCampaignBuilderPack,
  importCampaignBuilderPack,
  loadCampaignBuilderLibrary,
  saveCampaignBuilderLibrary,
  validateCampaignBuilderDocument
} from '../../systems/campaignBuilderStorage';
import { saveJson } from '../../systems/saveEngine';
import { loadPlayableBuilderDocuments } from '../../systems/missionBuilderStorage';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

interface CampaignBuilderProps {
  onPlaytest: () => void;
}

const ERAS: Array<EraId | 'multi'> = ['multi', 'msx', 'mgs1', 'mgs2', 'mgs3', 'mgs4', 'peace_walker', 'mgsv', 'vr_simulation', 'patriots_ai'];
const MODULES: CampaignModule[] = ['campaign', 'codec', 'sideops', 'vr', 'tapes', 'lore'];
const CONDITION_TYPES: CampaignCondition['type'][] = ['all_prerequisites', 'codec_call', 'sideops_clear', 'vr_clear', 'tape_listened', 'lore_viewed', 'resource_minimum', 'badge_owned', 'variable_compare'];
const PRESENTATION_TONES: CampaignPresentationTone[] = ['briefing', 'debriefing', 'warning', 'choice', 'heroic', 'neutral', 'dark', 'secret', 'system'];
const NARRATIVE_TRIGGERS: CampaignNarrativeTrigger[] = ['campaign_start', 'campaign_complete', 'chapter_start', 'chapter_complete', 'node_complete', 'branch_choice', 'ending_achieved', 'variable_condition'];
const RANKS: CampaignRank[] = ['ROOKIE', 'RAT', 'DOBERMAN', 'HOUND', 'FOX', 'FOXHOUND', 'BIG BOSS'];
const RESOURCES: CampaignResourceId[] = ['commandPoints', 'intel', 'supplies', 'credits'];
const contacts = contactsJson as Array<{ id: string; name: string }>;
const missions = [...(missionsJson as Array<{ id: string; title: string }>), ...loadPlayableBuilderDocuments().map((document) => ({ id: document.id, title: `${document.title} [CUSTOM]` }))];
const vrMissions = vrMissionsJson as Array<{ id: string; title: string }>;
const tapes = tapesJson as Array<{ id: string; title: string }>;
const loreEntries = loreJson as Array<{ id: string; title: string }>;

function listToText(values: string[] | undefined): string {
  return (values ?? []).join(', ');
}

function textToList(value: string): string[] {
  return Array.from(new Set(value.split(',').map((entry) => entry.trim()).filter(Boolean)));
}


function variablesToText(values: Record<string, CampaignVariableValue> | undefined): string {
  return Object.entries(values ?? {}).map(([key, value]) => `${key}=${String(value)}`).join('\n');
}

function parseVariableValue(value: string): CampaignVariableValue {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed !== '' && Number.isFinite(Number(trimmed))) return Number(trimmed);
  return trimmed;
}

function textToVariables(value: string): Record<string, CampaignVariableValue> {
  return Object.fromEntries(value.split(/\r?\n/).flatMap((line) => {
    const separator = line.indexOf('=');
    if (separator <= 0) return [];
    const key = line.slice(0, separator).trim();
    if (!key) return [];
    return [[key, parseVariableValue(line.slice(separator + 1))]];
  }));
}

function createPresentation(id: string, title: string, tone: CampaignPresentationTone = 'neutral'): CampaignPresentationDefinition {
  return { id, title, tone, speaker: 'CAMPAIGN CONTROL', body: 'Narrative presentation text.', skippable: true };
}

function createNarrativeEvent(sequence: number): CampaignNarrativeEventDefinition {
  return {
    id: `narrative_event_${String(sequence).padStart(3, '0')}`,
    trigger: 'campaign_start',
    once: true,
    presentation: createPresentation(`narrative_card_${String(sequence).padStart(3, '0')}`, `Narrative Event ${String(sequence).padStart(3, '0')}`, 'system'),
    variableEffects: []
  };
}

function conditionFor(type: CampaignCondition['type']): CampaignCondition {
  if (type === 'codec_call') return { type, contactId: contacts[0]?.id ?? '' };
  if (type === 'sideops_clear') return { type, missionId: missions[0]?.id ?? '', minimumRank: 'HOUND' };
  if (type === 'vr_clear') return { type, missionId: vrMissions[0]?.id ?? '', minimumRank: 'HOUND' };
  if (type === 'tape_listened') return { type, tapeId: tapes[0]?.id ?? '' };
  if (type === 'lore_viewed') return { type, loreId: loreEntries[0]?.id ?? '' };
  if (type === 'resource_minimum') return { type, resource: 'intel', amount: 50 };
  if (type === 'badge_owned') return { type, badge: 'CUSTOM BADGE' };
  if (type === 'variable_compare') return { type, variable: 'story.flag', operator: 'eq', value: true };
  return { type: 'all_prerequisites' };
}

function targetOptions(module: CampaignModule): Array<{ id: string; label: string }> {
  if (module === 'codec') return contacts.map((entry) => ({ id: entry.id, label: entry.name }));
  if (module === 'sideops') return missions.map((entry) => ({ id: entry.id, label: entry.title }));
  if (module === 'vr') return vrMissions.map((entry) => ({ id: entry.id, label: entry.title }));
  if (module === 'tapes') return tapes.map((entry) => ({ id: entry.id, label: entry.title }));
  if (module === 'lore') return loreEntries.map((entry) => ({ id: entry.id, label: entry.title }));
  return [];
}

function downloadJson(fileName: string, payload: unknown): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

function severityTone(severity: CampaignBuilderValidationIssue['severity']): 'danger' | 'warning' | 'neutral' {
  if (severity === 'error') return 'danger';
  if (severity === 'warning') return 'warning';
  return 'neutral';
}

export function CampaignBuilder({ onPlaytest }: CampaignBuilderProps) {
  const [library, setLibrary] = useState<CampaignBuilderLibrary>(() => loadCampaignBuilderLibrary());
  const activeDocument = library.documents.find((document) => document.id === library.activeDocumentId) ?? library.documents[0];
  const [activeChapterId, setActiveChapterId] = useState(activeDocument?.chapters[0]?.id ?? '');
  const [selectedNodeId, setSelectedNodeId] = useState(activeDocument?.chapters[0]?.nodes[0]?.id ?? '');
  const [transferBuffer, setTransferBuffer] = useState('');
  const [systemMessage, setSystemMessage] = useState('CAMPAIGN BUILDER READY');
  const [dragState, setDragState] = useState<{ nodeId: string; startX: number; startY: number; originX: number; originY: number } | null>(null);

  const activeChapter = activeDocument?.chapters.find((chapter) => chapter.id === activeChapterId) ?? activeDocument?.chapters[0];
  const allNodes = useMemo(() => activeDocument?.chapters.flatMap((chapter) => chapter.nodes) ?? [], [activeDocument]);
  const selectedNode = allNodes.find((node) => node.id === selectedNodeId);
  const issues = useMemo(() => activeDocument ? validateCampaignBuilderDocument(activeDocument) : [], [activeDocument]);
  const errorCount = issues.filter((issue) => issue.severity === 'error').length;

  function commit(nextLibrary: CampaignBuilderLibrary, message?: string) {
    const saved = saveCampaignBuilderLibrary(nextLibrary);
    setLibrary(saved);
    if (message) setSystemMessage(message);
  }

  function updateDocument(updater: (document: CampaignBuilderDocument) => CampaignBuilderDocument, message?: string) {
    if (!activeDocument) return;
    const nextDocument = { ...updater(activeDocument), updatedAt: new Date().toISOString() };
    commit({
      ...library,
      activeDocumentId: nextDocument.id,
      documents: library.documents.map((document) => document.id === activeDocument.id ? nextDocument : document)
    }, message);
  }

  function updateChapter(updater: (chapter: CampaignChapterDefinition) => CampaignChapterDefinition) {
    if (!activeChapter) return;
    updateDocument((document) => ({
      ...document,
      chapters: document.chapters.map((chapter) => chapter.id === activeChapter.id ? updater(chapter) : chapter)
    }));
  }

  function updateNode(patch: Partial<CampaignNodeDefinition>) {
    if (!selectedNode) return;
    updateDocument((document) => ({
      ...document,
      chapters: document.chapters.map((chapter) => ({
        ...chapter,
        nodes: chapter.nodes.map((node) => node.id === selectedNode.id ? { ...node, ...patch } : node)
      }))
    }));
  }


  function updateAdditionalCondition(index: number, condition: CampaignCondition) {
    if (!selectedNode) return;
    const next = [...(selectedNode.additionalConditions ?? [])];
    next[index] = condition;
    updateNode({ additionalConditions: next });
  }

  function addAdditionalCondition() {
    if (!selectedNode) return;
    updateNode({ additionalConditions: [...(selectedNode.additionalConditions ?? []), { type: 'all_prerequisites' }] });
  }

  function removeAdditionalCondition(index: number) {
    if (!selectedNode) return;
    updateNode({ additionalConditions: (selectedNode.additionalConditions ?? []).filter((_, conditionIndex) => conditionIndex !== index) });
  }


  function updateNarrativeEvent(index: number, patch: Partial<CampaignNarrativeEventDefinition>) {
    updateDocument((document) => ({
      ...document,
      narrativeEvents: (document.narrativeEvents ?? []).map((event, eventIndex) => eventIndex === index ? { ...event, ...patch } : event)
    }));
  }

  function addNarrativeEvent() {
    updateDocument((document) => ({ ...document, narrativeEvents: [...(document.narrativeEvents ?? []), createNarrativeEvent((document.narrativeEvents?.length ?? 0) + 1)] }), 'NARRATIVE EVENT ADDED');
  }

  function removeNarrativeEvent(index: number) {
    updateDocument((document) => ({ ...document, narrativeEvents: (document.narrativeEvents ?? []).filter((_, eventIndex) => eventIndex !== index) }), 'NARRATIVE EVENT REMOVED');
  }

  function updateNodeVariableEffect(index: number, patch: Partial<CampaignVariableMutation>) {
    if (!selectedNode) return;
    const effects = [...(selectedNode.variableEffects ?? [])];
    effects[index] = { ...effects[index], ...patch } as CampaignVariableMutation;
    updateNode({ variableEffects: effects });
  }

  function addNodeVariableEffect() {
    if (!selectedNode) return;
    updateNode({ variableEffects: [...(selectedNode.variableEffects ?? []), { variable: 'story.flag', operation: 'set', value: true }] });
  }

  function removeNodeVariableEffect(index: number) {
    if (!selectedNode) return;
    updateNode({ variableEffects: (selectedNode.variableEffects ?? []).filter((_, effectIndex) => effectIndex !== index) });
  }

  function switchDocument(id: string) {
    const document = library.documents.find((entry) => entry.id === id);
    if (!document) return;
    commit({ ...library, activeDocumentId: id });
    setActiveChapterId(document.chapters[0]?.id ?? '');
    setSelectedNodeId(document.chapters[0]?.nodes[0]?.id ?? '');
    setSystemMessage(`CAMPAIGN LOADED: ${document.title.toUpperCase()}`);
  }

  function createDocument() {
    const document = createBlankCampaignBuilderDocument(library.documents.length + 1);
    commit({ ...library, activeDocumentId: document.id, documents: [...library.documents, document] }, 'NEW CAMPAIGN CREATED');
    setActiveChapterId(document.chapters[0]?.id ?? '');
    setSelectedNodeId(document.chapters[0]?.nodes[0]?.id ?? '');
  }

  function duplicateDocument() {
    if (!activeDocument) return;
    const duplicated: CampaignBuilderDocument = {
      ...activeDocument,
      id: `${activeDocument.id}_copy_${Date.now().toString(36)}`,
      title: `${activeDocument.title} Copy`,
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      chapters: activeDocument.chapters.map((chapter) => ({
        ...chapter,
        nodes: chapter.nodes.map((node) => ({ ...node, prerequisites: [...node.prerequisites], reward: { ...node.reward } }))
      }))
    };
    commit({ ...library, activeDocumentId: duplicated.id, documents: [...library.documents, duplicated] }, 'CAMPAIGN DUPLICATED');
    setActiveChapterId(duplicated.chapters[0]?.id ?? '');
    setSelectedNodeId(duplicated.chapters[0]?.nodes[0]?.id ?? '');
  }

  function deleteDocument() {
    if (!activeDocument) return;
    const remaining = library.documents.filter((document) => document.id !== activeDocument.id);
    const documents = remaining.length ? remaining : [createBlankCampaignBuilderDocument(1)];
    commit({ schemaVersion: 2, activeDocumentId: documents[0].id, documents }, 'CAMPAIGN DELETED');
    setActiveChapterId(documents[0].chapters[0]?.id ?? '');
    setSelectedNodeId(documents[0].chapters[0]?.nodes[0]?.id ?? '');
  }

  function togglePublish() {
    if (!activeDocument) return;
    if (!activeDocument.published && errorCount) {
      setSystemMessage(`PUBLISH BLOCKED: ${errorCount} VALIDATION ERROR(S)`);
      return;
    }
    updateDocument((document) => ({ ...document, published: !document.published }), activeDocument.published ? 'CAMPAIGN RETURNED TO DRAFT' : 'CAMPAIGN PUBLISHED TO CAMPAIGN OPS');
  }

  function playtest() {
    if (!activeDocument) return;
    if (errorCount) {
      setSystemMessage(`PLAYTEST BLOCKED: ${errorCount} VALIDATION ERROR(S)`);
      return;
    }
    saveJson(CAMPAIGN_BUILDER_PREVIEW_KEY, activeDocument.id);
    setSystemMessage('PLAYTEST ROUTED TO CAMPAIGN OPS');
    onPlaytest();
  }

  function addChapter() {
    if (!activeDocument) return;
    const chapter = createCampaignBuilderChapter(activeDocument.chapters.length + 1);
    updateDocument((document) => ({ ...document, chapters: [...document.chapters, chapter] }), 'CHAPTER ADDED');
    setActiveChapterId(chapter.id);
    setSelectedNodeId('');
  }

  function removeChapter() {
    if (!activeDocument || !activeChapter || activeDocument.chapters.length <= 1) return;
    const remaining = activeDocument.chapters.filter((chapter) => chapter.id !== activeChapter.id);
    const removedIds = new Set(activeChapter.nodes.map((node) => node.id));
    updateDocument((document) => ({
      ...document,
      chapters: remaining.map((chapter) => ({
        ...chapter,
        nodes: chapter.nodes.map((node) => ({ ...node, prerequisites: node.prerequisites.filter((id) => !removedIds.has(id)) }))
      }))
    }), 'CHAPTER REMOVED');
    setActiveChapterId(remaining[0]?.id ?? '');
    setSelectedNodeId(remaining[0]?.nodes[0]?.id ?? '');
  }

  function addNode() {
    if (!activeChapter) return;
    const node = createCampaignBuilderNode(allNodes.length + 1, 80 + (activeChapter.nodes.length % 4) * 250, 80 + Math.floor(activeChapter.nodes.length / 4) * 180);
    updateChapter((chapter) => ({ ...chapter, nodes: [...chapter.nodes, node] }));
    setSelectedNodeId(node.id);
    setSystemMessage('OPERATION NODE ADDED');
  }

  function removeNode() {
    if (!selectedNode) return;
    updateDocument((document) => ({
      ...document,
      chapters: document.chapters.map((chapter) => ({
        ...chapter,
        nodes: chapter.nodes
          .filter((node) => node.id !== selectedNode.id)
          .map((node) => ({ ...node, prerequisites: node.prerequisites.filter((id) => id !== selectedNode.id) }))
      }))
    }), 'OPERATION NODE REMOVED');
    setSelectedNodeId('');
  }

  function togglePrerequisite(id: string) {
    if (!selectedNode || id === selectedNode.id) return;
    const next = selectedNode.prerequisites.includes(id)
      ? selectedNode.prerequisites.filter((entry) => entry !== id)
      : [...selectedNode.prerequisites, id];
    updateNode({ prerequisites: next });
  }

  function startDrag(event: React.PointerEvent, node: CampaignNodeDefinition) {
    if (event.button !== 0) return;
    const layout = node.layout ?? { x: 0, y: 0 };
    setSelectedNodeId(node.id);
    setDragState({ nodeId: node.id, startX: event.clientX, startY: event.clientY, originX: layout.x, originY: layout.y });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: React.PointerEvent) {
    if (!dragState) return;
    const x = Math.max(0, Math.round(dragState.originX + event.clientX - dragState.startX));
    const y = Math.max(0, Math.round(dragState.originY + event.clientY - dragState.startY));
    const node = allNodes.find((entry) => entry.id === dragState.nodeId);
    if (!node) return;
    updateDocument((document) => ({
      ...document,
      chapters: document.chapters.map((chapter) => ({
        ...chapter,
        nodes: chapter.nodes.map((entry) => entry.id === node.id ? { ...entry, layout: { x, y } } : entry)
      }))
    }));
  }

  function stopDrag() {
    setDragState(null);
  }

  function exportActive() {
    if (!activeDocument) return;
    const result = exportCampaignBuilderPack([activeDocument]);
    setTransferBuffer(JSON.stringify(result.payload, null, 2));
    downloadJson(result.fileName, result.payload);
    setSystemMessage('CAMPAIGN PACK EXPORTED');
  }

  function exportLibrary() {
    const result = exportCampaignBuilderPack(library.documents, { name: 'Shadow Codec Ops Campaign Library' });
    setTransferBuffer(JSON.stringify(result.payload, null, 2));
    downloadJson(result.fileName, result.payload);
    setSystemMessage('CAMPAIGN LIBRARY EXPORTED');
  }

  function importBuffer() {
    try {
      const imported = importCampaignBuilderPack(transferBuffer);
      const existingIds = new Set(library.documents.map((document) => document.id));
      const remapped = imported.map((document) => existingIds.has(document.id)
        ? { ...document, id: `${document.id}_import_${Date.now().toString(36)}`, published: false }
        : document);
      const next = [...library.documents, ...remapped];
      commit({ ...library, activeDocumentId: remapped[0]?.id ?? library.activeDocumentId, documents: next }, `${remapped.length} CAMPAIGN(S) IMPORTED`);
      if (remapped[0]) {
        setActiveChapterId(remapped[0].chapters[0]?.id ?? '');
        setSelectedNodeId(remapped[0].chapters[0]?.nodes[0]?.id ?? '');
      }
    } catch (error) {
      setSystemMessage(error instanceof Error ? `IMPORT FAILED: ${error.message.toUpperCase()}` : 'IMPORT FAILED');
    }
  }

  if (!activeDocument || !activeChapter) return <Panel title="Campaign Builder"><p>No campaign document available.</p></Panel>;

  const chapterNodeMap = new Map(activeChapter.nodes.map((node) => [node.id, node]));
  const branchGroups = Array.from(new Set(allNodes.flatMap((node) => node.branch ? [node.branch.groupId] : [])));

  return (
    <section className="campaign-builder-page">
      <Panel className="campaign-builder-command">
        <div className="campaign-builder-heading">
          <div>
            <StatusBadge label={systemMessage} tone={systemMessage.includes('FAILED') || systemMessage.includes('BLOCKED') ? 'danger' : 'success'} />
            <span>BRANCHING OPERATIONS AUTHORING SYSTEM</span>
            <h2>Campaign Builder</h2>
            <p>Create interconnected operations, cinematic briefings, persistent variables, doctrine choices and multiple campaign endings.</p>
          </div>
          <div className="campaign-builder-actions">
            <button type="button" onClick={createDocument}>NEW</button>
            <button type="button" onClick={duplicateDocument}>DUPLICATE</button>
            <button type="button" onClick={togglePublish}>{activeDocument.published ? 'UNPUBLISH' : 'PUBLISH'}</button>
            <button type="button" className="primary-action" onClick={playtest}>PLAYTEST</button>
            <button type="button" className="danger-action" onClick={deleteDocument}>DELETE</button>
          </div>
        </div>
        <div className="campaign-builder-status-strip">
          <span>{activeDocument.published ? 'PUBLISHED' : 'DRAFT'}</span>
          <span>{activeDocument.chapters.length} CHAPTERS</span>
          <span>{allNodes.length} NODES</span>
          <span>{branchGroups.length} BRANCH GROUPS</span>
          <span>{allNodes.filter((node) => node.ending).length} ENDINGS</span>
          <span>{activeDocument.narrativeEvents?.length ?? 0} NARRATIVE EVENTS</span>
          <span className={errorCount ? 'error' : 'valid'}>{errorCount ? `${errorCount} ERRORS` : 'VALID'}</span>
        </div>
      </Panel>

      <div className="campaign-builder-grid">
        <aside className="campaign-builder-library-column">
          <Panel title="Campaign Library">
            <div className="campaign-builder-library">
              {library.documents.map((document) => (
                <button key={document.id} type="button" className={document.id === activeDocument.id ? 'active' : ''} onClick={() => switchDocument(document.id)}>
                  <strong>{document.title}</strong>
                  <span>{document.published ? 'PUBLISHED' : 'DRAFT'} · {document.chapters.length} chapters</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Campaign Metadata">
            <div className="campaign-builder-form compact">
              <label>ID<input value={activeDocument.id} onChange={(event) => updateDocument((document) => ({ ...document, id: event.target.value }))} /></label>
              <label>Title<input value={activeDocument.title} onChange={(event) => updateDocument((document) => ({ ...document, title: event.target.value }))} /></label>
              <label>Subtitle<input value={activeDocument.subtitle} onChange={(event) => updateDocument((document) => ({ ...document, subtitle: event.target.value }))} /></label>
              <label>Description<textarea value={activeDocument.description} onChange={(event) => updateDocument((document) => ({ ...document, description: event.target.value }))} /></label>
              <label>Author<input value={activeDocument.author} onChange={(event) => updateDocument((document) => ({ ...document, author: event.target.value }))} /></label>
              <label>Version<input value={activeDocument.version} onChange={(event) => updateDocument((document) => ({ ...document, version: event.target.value }))} /></label>
              <label>Era<select value={activeDocument.era} onChange={(event) => updateDocument((document) => ({ ...document, era: event.target.value as EraId | 'multi' }))}>{ERAS.map((era) => <option key={era} value={era}>{era}</option>)}</select></label>
              <fieldset>
                <legend>Campaign Presentation</legend>
                <label className="inline-check"><input type="checkbox" checked={Boolean(activeDocument.briefing)} onChange={(event) => updateDocument((document) => ({ ...document, briefing: event.target.checked ? createPresentation(`${document.id}_briefing`, `${document.title} Briefing`, 'briefing') : undefined }))} /><span>Opening briefing</span></label>
                {activeDocument.briefing && <>
                  <label>Briefing title<input value={activeDocument.briefing.title} onChange={(event) => updateDocument((document) => ({ ...document, briefing: { ...document.briefing!, title: event.target.value } }))} /></label>
                  <label>Speaker<input value={activeDocument.briefing.speaker ?? ''} onChange={(event) => updateDocument((document) => ({ ...document, briefing: { ...document.briefing!, speaker: event.target.value } }))} /></label>
                  <label>Body<textarea value={activeDocument.briefing.body ?? ''} onChange={(event) => updateDocument((document) => ({ ...document, briefing: { ...document.briefing!, body: event.target.value } }))} /></label>
                </>}
                <label className="inline-check"><input type="checkbox" checked={Boolean(activeDocument.debriefing)} onChange={(event) => updateDocument((document) => ({ ...document, debriefing: event.target.checked ? createPresentation(`${document.id}_debriefing`, `${document.title} Debriefing`, 'debriefing') : undefined }))} /><span>Campaign debriefing</span></label>
                {activeDocument.debriefing && <>
                  <label>Debrief title<input value={activeDocument.debriefing.title} onChange={(event) => updateDocument((document) => ({ ...document, debriefing: { ...document.debriefing!, title: event.target.value } }))} /></label>
                  <label>Debrief body<textarea value={activeDocument.debriefing.body ?? ''} onChange={(event) => updateDocument((document) => ({ ...document, debriefing: { ...document.debriefing!, body: event.target.value } }))} /></label>
                </>}
                <label>Initial variables <small>one key=value per line</small><textarea value={variablesToText(activeDocument.initialVariables)} onChange={(event) => updateDocument((document) => ({ ...document, initialVariables: textToVariables(event.target.value) }))} /></label>
              </fieldset>
              <fieldset>
                <legend>Narrative Events</legend>
                <div className="campaign-builder-narrative-events">
                  {(activeDocument.narrativeEvents ?? []).map((narrativeEvent, eventIndex) => (
                    <div key={`${narrativeEvent.id}-${eventIndex}`} className="campaign-builder-narrative-event">
                      <label>Event ID<input value={narrativeEvent.id} onChange={(event) => updateNarrativeEvent(eventIndex, { id: event.target.value })} /></label>
                      <div className="two-column">
                        <label>Trigger<select value={narrativeEvent.trigger} onChange={(event) => updateNarrativeEvent(eventIndex, { trigger: event.target.value as CampaignNarrativeTrigger })}>{NARRATIVE_TRIGGERS.map((trigger) => <option key={trigger} value={trigger}>{trigger}</option>)}</select></label>
                        <label>Target ID<input value={narrativeEvent.targetId ?? ''} onChange={(event) => updateNarrativeEvent(eventIndex, { targetId: event.target.value || undefined })} /></label>
                      </div>
                      <label>Card title<input value={narrativeEvent.presentation.title} onChange={(event) => updateNarrativeEvent(eventIndex, { presentation: { ...narrativeEvent.presentation, title: event.target.value } })} /></label>
                      <label>Speaker<input value={narrativeEvent.presentation.speaker ?? ''} onChange={(event) => updateNarrativeEvent(eventIndex, { presentation: { ...narrativeEvent.presentation, speaker: event.target.value } })} /></label>
                      <label>Tone<select value={narrativeEvent.presentation.tone ?? 'neutral'} onChange={(event) => updateNarrativeEvent(eventIndex, { presentation: { ...narrativeEvent.presentation, tone: event.target.value as CampaignPresentationTone } })}>{PRESENTATION_TONES.map((tone) => <option key={tone} value={tone}>{tone}</option>)}</select></label>
                      <label>Body<textarea value={narrativeEvent.presentation.body ?? ''} onChange={(event) => updateNarrativeEvent(eventIndex, { presentation: { ...narrativeEvent.presentation, body: event.target.value } })} /></label>
                      {narrativeEvent.trigger === 'variable_condition' && <div className="two-column"><label>Variable<input value={narrativeEvent.condition?.type === 'variable_compare' ? narrativeEvent.condition.variable : ''} onChange={(event) => updateNarrativeEvent(eventIndex, { condition: { type: 'variable_compare', variable: event.target.value, operator: narrativeEvent.condition?.type === 'variable_compare' ? narrativeEvent.condition.operator : 'eq', value: narrativeEvent.condition?.type === 'variable_compare' ? narrativeEvent.condition.value : true } })} /></label><label>Expected<input value={narrativeEvent.condition?.type === 'variable_compare' ? String(narrativeEvent.condition.value) : 'true'} onChange={(event) => updateNarrativeEvent(eventIndex, { condition: { type: 'variable_compare', variable: narrativeEvent.condition?.type === 'variable_compare' ? narrativeEvent.condition.variable : 'story.flag', operator: narrativeEvent.condition?.type === 'variable_compare' ? narrativeEvent.condition.operator : 'eq', value: parseVariableValue(event.target.value) } })} /></label></div>}
                      <button type="button" className="danger-action" onClick={() => removeNarrativeEvent(eventIndex)}>REMOVE EVENT</button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addNarrativeEvent}>ADD NARRATIVE EVENT</button>
              </fieldset>
              <fieldset>
                <legend>Initial Unlocks</legend>
                <label>Side Ops IDs<input value={listToText(activeDocument.initialUnlocks.missionIds)} onChange={(event) => updateDocument((document) => ({ ...document, initialUnlocks: { ...document.initialUnlocks, missionIds: textToList(event.target.value) } }))} /></label>
                <label>VR IDs<input value={listToText(activeDocument.initialUnlocks.vrMissionIds)} onChange={(event) => updateDocument((document) => ({ ...document, initialUnlocks: { ...document.initialUnlocks, vrMissionIds: textToList(event.target.value) } }))} /></label>
                <label>Tape IDs<input value={listToText(activeDocument.initialUnlocks.tapeIds)} onChange={(event) => updateDocument((document) => ({ ...document, initialUnlocks: { ...document.initialUnlocks, tapeIds: textToList(event.target.value) } }))} /></label>
                <label>Contact IDs<input value={listToText(activeDocument.initialUnlocks.contactIds)} onChange={(event) => updateDocument((document) => ({ ...document, initialUnlocks: { ...document.initialUnlocks, contactIds: textToList(event.target.value) } }))} /></label>
                <label>Lore IDs<input value={listToText(activeDocument.initialUnlocks.loreIds)} onChange={(event) => updateDocument((document) => ({ ...document, initialUnlocks: { ...document.initialUnlocks, loreIds: textToList(event.target.value) } }))} /></label>
              </fieldset>
            </div>
          </Panel>

          <Panel title="Pack Transfer">
            <div className="campaign-builder-transfer-actions">
              <button type="button" onClick={exportActive}>EXPORT ACTIVE</button>
              <button type="button" onClick={exportLibrary}>EXPORT ALL</button>
              <button type="button" onClick={importBuffer} disabled={!transferBuffer.trim()}>IMPORT</button>
            </div>
            <textarea className="campaign-builder-transfer" value={transferBuffer} onChange={(event) => setTransferBuffer(event.target.value)} placeholder="Paste campaign or campaign pack JSON…" />
          </Panel>
        </aside>

        <main className="campaign-builder-workspace">
          <Panel className="campaign-builder-chapter-panel">
            <div className="campaign-builder-chapter-tabs">
              {activeDocument.chapters.map((chapter) => (
                <button key={chapter.id} type="button" className={chapter.id === activeChapter.id ? 'active' : ''} onClick={() => { setActiveChapterId(chapter.id); setSelectedNodeId(chapter.nodes[0]?.id ?? ''); }}>
                  {chapter.title}
                </button>
              ))}
              <button type="button" onClick={addChapter}>+ CHAPTER</button>
            </div>
            <div className="campaign-builder-chapter-meta">
              <input value={activeChapter.title} onChange={(event) => updateChapter((chapter) => ({ ...chapter, title: event.target.value }))} />
              <input value={activeChapter.subtitle} onChange={(event) => updateChapter((chapter) => ({ ...chapter, subtitle: event.target.value }))} />
              <textarea value={activeChapter.description} onChange={(event) => updateChapter((chapter) => ({ ...chapter, description: event.target.value }))} />
              <div className="campaign-builder-chapter-presentation">
                <label><input type="checkbox" checked={Boolean(activeChapter.briefing)} onChange={(event) => updateChapter((chapter) => ({ ...chapter, briefing: event.target.checked ? createPresentation(`${chapter.id}_briefing`, `${chapter.title} Briefing`, 'briefing') : undefined }))} /> Chapter briefing</label>
                {activeChapter.briefing && <><input placeholder="Briefing title" value={activeChapter.briefing.title} onChange={(event) => updateChapter((chapter) => ({ ...chapter, briefing: { ...chapter.briefing!, title: event.target.value } }))} /><textarea placeholder="Briefing body" value={activeChapter.briefing.body ?? ''} onChange={(event) => updateChapter((chapter) => ({ ...chapter, briefing: { ...chapter.briefing!, body: event.target.value } }))} /></>}
                <label><input type="checkbox" checked={Boolean(activeChapter.debriefing)} onChange={(event) => updateChapter((chapter) => ({ ...chapter, debriefing: event.target.checked ? createPresentation(`${chapter.id}_debriefing`, `${chapter.title} Debriefing`, 'debriefing') : undefined }))} /> Chapter debriefing</label>
                {activeChapter.debriefing && <><input placeholder="Debrief title" value={activeChapter.debriefing.title} onChange={(event) => updateChapter((chapter) => ({ ...chapter, debriefing: { ...chapter.debriefing!, title: event.target.value } }))} /><textarea placeholder="Debrief body" value={activeChapter.debriefing.body ?? ''} onChange={(event) => updateChapter((chapter) => ({ ...chapter, debriefing: { ...chapter.debriefing!, body: event.target.value } }))} /></>}
              </div>
              <button type="button" onClick={removeChapter} disabled={activeDocument.chapters.length <= 1}>REMOVE CHAPTER</button>
            </div>
          </Panel>

          <Panel className="campaign-builder-graph-panel">
            <div className="campaign-builder-graph-toolbar">
              <div><strong>OPERATION GRAPH</strong><span>Drag nodes. Connections represent prerequisites.</span></div>
              <button type="button" onClick={addNode}>ADD NODE</button>
            </div>
            <div className="campaign-builder-canvas" onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
              <svg className="campaign-builder-links" width="1400" height="900" aria-hidden="true">
                {activeChapter.nodes.flatMap((node) => node.prerequisites.flatMap((prerequisiteId) => {
                  const source = chapterNodeMap.get(prerequisiteId);
                  if (!source) return [];
                  const sourceLayout = source.layout ?? { x: 0, y: 0 };
                  const targetLayout = node.layout ?? { x: 0, y: 0 };
                  return [<line key={`${source.id}-${node.id}`} x1={sourceLayout.x + 205} y1={sourceLayout.y + 54} x2={targetLayout.x} y2={targetLayout.y + 54} />];
                }))}
              </svg>
              {activeChapter.nodes.map((node) => {
                const layout = node.layout ?? { x: 0, y: 0 };
                return (
                  <article
                    key={node.id}
                    className={`campaign-builder-node ${selectedNodeId === node.id ? 'selected' : ''} ${node.branch ? 'branch-node' : ''} ${node.ending ? `ending-node ${node.ending.tone}` : ''}`}
                    style={{ left: layout.x, top: layout.y }}
                    onPointerDown={(event) => startDrag(event, node)}
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    <span>{node.module.toUpperCase()}</span>
                    <strong>{node.title}</strong>
                    <small>{node.condition.type}</small>
                    {node.branch && <em>{node.branch.label}</em>}
                    {node.ending && <b>ENDING: {node.ending.title}</b>}
                  </article>
                );
              })}
            </div>
          </Panel>

          <Panel title="Validation Report">
            <div className="campaign-builder-validation">
              {issues.length === 0 ? <StatusBadge label="CAMPAIGN VALID" tone="success" /> : issues.map((issue) => (
                <button type="button" key={issue.id} onClick={() => {
                  if (issue.chapterId) setActiveChapterId(issue.chapterId);
                  if (issue.nodeId) {
                    const owner = activeDocument.chapters.find((chapter) => chapter.nodes.some((node) => node.id === issue.nodeId));
                    if (owner) setActiveChapterId(owner.id);
                    setSelectedNodeId(issue.nodeId);
                  }
                }}>
                  <StatusBadge label={issue.severity} tone={severityTone(issue.severity)} />
                  <span>{issue.message}</span>
                </button>
              ))}
            </div>
          </Panel>
        </main>

        <aside className="campaign-builder-inspector-column">
          <Panel title="Node Inspector">
            {!selectedNode ? <p>Select an operation node.</p> : (
              <div className="campaign-builder-form">
                <label>ID<input value={selectedNode.id} onChange={(event) => updateNode({ id: event.target.value })} /></label>
                <label>Title<input value={selectedNode.title} onChange={(event) => updateNode({ title: event.target.value })} /></label>
                <label>Description<textarea value={selectedNode.description} onChange={(event) => updateNode({ description: event.target.value })} /></label>
                <div className="two-column">
                  <label>Module<select value={selectedNode.module} onChange={(event) => {
                    const module = event.target.value as CampaignModule;
                    updateNode({ module, targetId: targetOptions(module)[0]?.id });
                  }}>{MODULES.map((module) => <option key={module} value={module}>{module}</option>)}</select></label>
                  <label>Era<select value={selectedNode.era ?? 'multi'} onChange={(event) => updateNode({ era: event.target.value as EraId | 'multi' })}>{ERAS.map((era) => <option key={era} value={era}>{era}</option>)}</select></label>
                </div>
                {selectedNode.module !== 'campaign' && <label>Target<select value={selectedNode.targetId ?? ''} onChange={(event) => updateNode({ targetId: event.target.value })}><option value="">Select target…</option>{targetOptions(selectedNode.module).map((entry) => <option key={entry.id} value={entry.id}>{entry.label}</option>)}</select></label>}
                <label className="inline-check"><input type="checkbox" checked={Boolean(selectedNode.optional)} onChange={(event) => updateNode({ optional: event.target.checked })} /><span>Optional node</span></label>

                <fieldset>
                  <legend>Completion Condition</legend>
                  <label>Type<select value={selectedNode.condition.type} onChange={(event) => updateNode({ condition: conditionFor(event.target.value as CampaignCondition['type']) })}>{CONDITION_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
                  {selectedNode.condition.type === 'codec_call' && <label>Contact<select value={selectedNode.condition.contactId} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, contactId: event.target.value } as CampaignCondition })}>{contacts.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>}
                  {selectedNode.condition.type === 'sideops_clear' && <><label>Mission<select value={selectedNode.condition.missionId} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, missionId: event.target.value } as CampaignCondition })}>{missions.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select></label><label>Minimum rank<select value={selectedNode.condition.minimumRank ?? ''} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, minimumRank: event.target.value as CampaignRank } as CampaignCondition })}>{RANKS.map((rank) => <option key={rank} value={rank}>{rank}</option>)}</select></label></>}
                  {selectedNode.condition.type === 'vr_clear' && <><label>VR Mission<select value={selectedNode.condition.missionId} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, missionId: event.target.value } as CampaignCondition })}>{vrMissions.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select></label><label>Minimum rank<select value={selectedNode.condition.minimumRank ?? ''} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, minimumRank: event.target.value as CampaignRank } as CampaignCondition })}>{RANKS.map((rank) => <option key={rank} value={rank}>{rank}</option>)}</select></label></>}
                  {selectedNode.condition.type === 'tape_listened' && <label>Tape<select value={selectedNode.condition.tapeId} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, tapeId: event.target.value } as CampaignCondition })}>{tapes.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select></label>}
                  {selectedNode.condition.type === 'lore_viewed' && <label>Lore<select value={selectedNode.condition.loreId} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, loreId: event.target.value } as CampaignCondition })}>{loreEntries.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select></label>}
                  {selectedNode.condition.type === 'resource_minimum' && <div className="two-column"><label>Resource<select value={selectedNode.condition.resource} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, resource: event.target.value as CampaignResourceId } as CampaignCondition })}>{RESOURCES.map((resource) => <option key={resource} value={resource}>{resource}</option>)}</select></label><label>Amount<input type="number" min="1" value={selectedNode.condition.amount} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, amount: Number(event.target.value) } as CampaignCondition })} /></label></div>}
                  {selectedNode.condition.type === 'badge_owned' && <label>Badge<input value={selectedNode.condition.badge} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, badge: event.target.value } as CampaignCondition })} /></label>}
                  {selectedNode.condition.type === 'variable_compare' && <><label>Variable<input value={selectedNode.condition.variable} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, variable: event.target.value } as CampaignCondition })} /></label><div className="two-column"><label>Operator<select value={selectedNode.condition.operator} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, operator: event.target.value as 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' } as CampaignCondition })}><option value="eq">equals</option><option value="neq">not equal</option><option value="gt">greater than</option><option value="gte">greater/equal</option><option value="lt">less than</option><option value="lte">less/equal</option></select></label><label>Value<input value={String(selectedNode.condition.value)} onChange={(event) => updateNode({ condition: { ...selectedNode.condition, value: parseVariableValue(event.target.value) } as CampaignCondition })} /></label></div></>}
                </fieldset>

                <fieldset>
                  <legend>Multiple Conditions</legend>
                  <label>Logic<select value={selectedNode.conditionLogic ?? 'all'} onChange={(event) => updateNode({ conditionLogic: event.target.value as 'all' | 'any' })}><option value="all">ALL CONDITIONS (AND)</option><option value="any">ANY CONDITION (OR)</option></select></label>
                  <div className="campaign-builder-additional-conditions">
                    {(selectedNode.additionalConditions ?? []).map((condition, conditionIndex) => (
                      <div key={`${condition.type}-${conditionIndex}`} className="campaign-builder-additional-condition">
                        <select value={condition.type} aria-label={`Additional condition ${conditionIndex + 1}`} onChange={(event) => updateAdditionalCondition(conditionIndex, conditionFor(event.target.value as CampaignCondition['type']))}>{CONDITION_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}</select>
                        {condition.type === 'codec_call' && <select value={condition.contactId} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, contactId: event.target.value })}>{contacts.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select>}
                        {condition.type === 'sideops_clear' && <><select value={condition.missionId} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, missionId: event.target.value })}>{missions.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select><select value={condition.minimumRank ?? 'HOUND'} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, minimumRank: event.target.value as CampaignRank })}>{RANKS.map((rank) => <option key={rank} value={rank}>{rank}</option>)}</select></>}
                        {condition.type === 'vr_clear' && <><select value={condition.missionId} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, missionId: event.target.value })}>{vrMissions.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select><select value={condition.minimumRank ?? 'HOUND'} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, minimumRank: event.target.value as CampaignRank })}>{RANKS.map((rank) => <option key={rank} value={rank}>{rank}</option>)}</select></>}
                        {condition.type === 'tape_listened' && <select value={condition.tapeId} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, tapeId: event.target.value })}>{tapes.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select>}
                        {condition.type === 'lore_viewed' && <select value={condition.loreId} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, loreId: event.target.value })}>{loreEntries.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select>}
                        {condition.type === 'resource_minimum' && <><select value={condition.resource} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, resource: event.target.value as CampaignResourceId })}>{RESOURCES.map((resource) => <option key={resource} value={resource}>{resource}</option>)}</select><input type="number" min="1" value={condition.amount} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, amount: Number(event.target.value) })} /></>}
                        {condition.type === 'badge_owned' && <input value={condition.badge} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, badge: event.target.value })} />}
                        {condition.type === 'variable_compare' && <><input placeholder="variable" value={condition.variable} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, variable: event.target.value })} /><select value={condition.operator} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, operator: event.target.value as 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' })}><option value="eq">eq</option><option value="neq">neq</option><option value="gt">gt</option><option value="gte">gte</option><option value="lt">lt</option><option value="lte">lte</option></select><input placeholder="value" value={String(condition.value)} onChange={(event) => updateAdditionalCondition(conditionIndex, { ...condition, value: parseVariableValue(event.target.value) })} /></>}
                        <button type="button" className="danger-action" onClick={() => removeAdditionalCondition(conditionIndex)}>REMOVE</button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addAdditionalCondition}>ADD CONDITION</button>
                </fieldset>

                <fieldset>
                  <legend>Prerequisites</legend>
                  <div className="campaign-builder-prerequisites">
                    {allNodes.filter((node) => node.id !== selectedNode.id).map((node) => <label key={node.id}><input type="checkbox" checked={selectedNode.prerequisites.includes(node.id)} onChange={() => togglePrerequisite(node.id)} /><span>{node.title}</span></label>)}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Exclusive Branch</legend>
                  <label className="inline-check"><input type="checkbox" checked={Boolean(selectedNode.branch)} onChange={(event) => updateNode({ branch: event.target.checked ? { groupId: 'doctrine_choice', optionId: 'option_a', label: 'Option A' } : undefined })} /><span>Node belongs to a branch</span></label>
                  {selectedNode.branch && <>
                    <label>Group ID<input value={selectedNode.branch.groupId} onChange={(event) => updateNode({ branch: { ...selectedNode.branch!, groupId: event.target.value } })} /></label>
                    <label>Option ID<input value={selectedNode.branch.optionId} onChange={(event) => updateNode({ branch: { ...selectedNode.branch!, optionId: event.target.value } })} /></label>
                    <label>Choice label<input value={selectedNode.branch.label} onChange={(event) => updateNode({ branch: { ...selectedNode.branch!, label: event.target.value } })} /></label>
                    <label>Choice description<textarea value={selectedNode.branch.description ?? ''} onChange={(event) => updateNode({ branch: { ...selectedNode.branch!, description: event.target.value } })} /></label>
                    <label>Consequence<textarea value={selectedNode.branch.consequenceText ?? ''} onChange={(event) => updateNode({ branch: { ...selectedNode.branch!, consequenceText: event.target.value } })} /></label>
                    <label className="inline-check"><input type="checkbox" checked={Boolean(selectedNode.branch.choicePresentation)} onChange={(event) => updateNode({ branch: { ...selectedNode.branch!, choicePresentation: event.target.checked ? createPresentation(`${selectedNode.id}_choice`, selectedNode.branch!.label, 'choice') : undefined } })} /><span>Fullscreen choice card</span></label>
                    {selectedNode.branch.choicePresentation && <><label>Choice card title<input value={selectedNode.branch.choicePresentation.title} onChange={(event) => updateNode({ branch: { ...selectedNode.branch!, choicePresentation: { ...selectedNode.branch!.choicePresentation!, title: event.target.value } } })} /></label><label>Choice card body<textarea value={selectedNode.branch.choicePresentation.body ?? ''} onChange={(event) => updateNode({ branch: { ...selectedNode.branch!, choicePresentation: { ...selectedNode.branch!.choicePresentation!, body: event.target.value } } })} /></label></>}
                  </>}
                </fieldset>

                <fieldset>
                  <legend>Alternative Ending</legend>
                  <label className="inline-check"><input type="checkbox" checked={Boolean(selectedNode.ending)} onChange={(event) => updateNode({ ending: event.target.checked ? { id: 'custom_ending', title: 'Custom Ending', summary: 'Campaign ending summary.', tone: 'neutral' } : undefined })} /><span>This node awards an ending</span></label>
                  {selectedNode.ending && <>
                    <label>Ending ID<input value={selectedNode.ending.id} onChange={(event) => updateNode({ ending: { ...selectedNode.ending!, id: event.target.value } })} /></label>
                    <label>Ending title<input value={selectedNode.ending.title} onChange={(event) => updateNode({ ending: { ...selectedNode.ending!, title: event.target.value } })} /></label>
                    <label>Summary<textarea value={selectedNode.ending.summary} onChange={(event) => updateNode({ ending: { ...selectedNode.ending!, summary: event.target.value } })} /></label>
                    <label>Tone<select value={selectedNode.ending.tone} onChange={(event) => updateNode({ ending: { ...selectedNode.ending!, tone: event.target.value as 'heroic' | 'neutral' | 'dark' | 'secret' } })}><option value="heroic">heroic</option><option value="neutral">neutral</option><option value="dark">dark</option><option value="secret">secret</option></select></label>
                    <label className="inline-check"><input type="checkbox" checked={Boolean(selectedNode.ending.epilogue)} onChange={(event) => updateNode({ ending: { ...selectedNode.ending!, epilogue: event.target.checked ? createPresentation(`${selectedNode.ending!.id}_epilogue`, selectedNode.ending!.title, selectedNode.ending!.tone) : undefined } })} /><span>Fullscreen epilogue</span></label>
                    {selectedNode.ending.epilogue && <><label>Epilogue title<input value={selectedNode.ending.epilogue.title} onChange={(event) => updateNode({ ending: { ...selectedNode.ending!, epilogue: { ...selectedNode.ending!.epilogue!, title: event.target.value } } })} /></label><label>Epilogue body<textarea value={selectedNode.ending.epilogue.body ?? ''} onChange={(event) => updateNode({ ending: { ...selectedNode.ending!, epilogue: { ...selectedNode.ending!.epilogue!, body: event.target.value } } })} /></label></>}
                  </>}
                </fieldset>

                <fieldset>
                  <legend>Node Narrative & Variables</legend>
                  <label className="inline-check"><input type="checkbox" checked={Boolean(selectedNode.completionPresentation)} onChange={(event) => updateNode({ completionPresentation: event.target.checked ? createPresentation(`${selectedNode.id}_completion`, `${selectedNode.title} Complete`, 'debriefing') : undefined })} /><span>Completion presentation</span></label>
                  {selectedNode.completionPresentation && <><label>Presentation title<input value={selectedNode.completionPresentation.title} onChange={(event) => updateNode({ completionPresentation: { ...selectedNode.completionPresentation!, title: event.target.value } })} /></label><label>Speaker<input value={selectedNode.completionPresentation.speaker ?? ''} onChange={(event) => updateNode({ completionPresentation: { ...selectedNode.completionPresentation!, speaker: event.target.value } })} /></label><label>Body<textarea value={selectedNode.completionPresentation.body ?? ''} onChange={(event) => updateNode({ completionPresentation: { ...selectedNode.completionPresentation!, body: event.target.value } })} /></label></>}
                  <div className="campaign-builder-variable-effects">
                    {(selectedNode.variableEffects ?? []).map((effect, effectIndex) => <div key={`${effect.variable}-${effectIndex}`} className="campaign-builder-variable-effect"><input placeholder="variable" value={effect.variable} onChange={(event) => updateNodeVariableEffect(effectIndex, { variable: event.target.value })} /><select value={effect.operation} onChange={(event) => updateNodeVariableEffect(effectIndex, { operation: event.target.value as CampaignVariableMutation['operation'] })}><option value="set">set</option><option value="increment">increment</option><option value="decrement">decrement</option><option value="toggle">toggle</option></select><input placeholder="value" value={effect.value === undefined ? '' : String(effect.value)} onChange={(event) => updateNodeVariableEffect(effectIndex, { value: parseVariableValue(event.target.value) })} /><button type="button" className="danger-action" onClick={() => removeNodeVariableEffect(effectIndex)}>REMOVE</button></div>)}
                  </div>
                  <button type="button" onClick={addNodeVariableEffect}>ADD VARIABLE EFFECT</button>
                </fieldset>

                <fieldset>
                  <legend>Rewards</legend>
                  <div className="two-column"><label>XP<input type="number" min="0" value={selectedNode.reward.xp ?? 0} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, xp: Number(event.target.value) } })} /></label><label>Command Points<input type="number" min="0" value={selectedNode.reward.resources?.commandPoints ?? 0} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, resources: { ...selectedNode.reward.resources, commandPoints: Number(event.target.value) } } })} /></label></div>
                  <div className="two-column"><label>Intel<input type="number" min="0" value={selectedNode.reward.resources?.intel ?? 0} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, resources: { ...selectedNode.reward.resources, intel: Number(event.target.value) } } })} /></label><label>Supplies<input type="number" min="0" value={selectedNode.reward.resources?.supplies ?? 0} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, resources: { ...selectedNode.reward.resources, supplies: Number(event.target.value) } } })} /></label></div>
                  <label>Credits<input type="number" min="0" value={selectedNode.reward.resources?.credits ?? 0} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, resources: { ...selectedNode.reward.resources, credits: Number(event.target.value) } } })} /></label>
                  <label>Badges<input value={listToText(selectedNode.reward.badges)} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, badges: textToList(event.target.value) } })} /></label>
                  <label>Unlock Side Ops IDs<input value={listToText(selectedNode.reward.unlockMissionIds)} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, unlockMissionIds: textToList(event.target.value) } })} /></label>
                  <label>Unlock VR IDs<input value={listToText(selectedNode.reward.unlockVrMissionIds)} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, unlockVrMissionIds: textToList(event.target.value) } })} /></label>
                  <label>Unlock Tape IDs<input value={listToText(selectedNode.reward.unlockTapeIds)} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, unlockTapeIds: textToList(event.target.value) } })} /></label>
                  <label>Unlock Contact IDs<input value={listToText(selectedNode.reward.unlockContactIds)} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, unlockContactIds: textToList(event.target.value) } })} /></label>
                  <label>Unlock Lore IDs<input value={listToText(selectedNode.reward.unlockLoreIds)} onChange={(event) => updateNode({ reward: { ...selectedNode.reward, unlockLoreIds: textToList(event.target.value) } })} /></label>
                </fieldset>
                <button type="button" className="danger-action" onClick={removeNode}>REMOVE NODE</button>
              </div>
            )}
          </Panel>
        </aside>
      </div>
    </section>
  );
}
