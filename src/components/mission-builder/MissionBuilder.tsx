import '../../styles/mission-builder.css';
import { useMemo, useRef, useState } from 'react';
import contactsJson from '../../data/contacts.json';
import conversationsJson from '../../data/conversations.json';
import erasJson from '../../data/eras.json';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';
import type { ContactDefinition, ConversationDefinition, ConversationTrigger, EraDefinition } from '../../types/codec.types';
import type {
  BuilderEnvironment,
  MissionBuilderDocument,
  MissionBuilderEntity,
  MissionBuilderEntity as BuilderEntity,
  MissionBuilderIssueSeverity,
  MissionBuilderLibrary
} from '../../types/missionBuilder.types';
import { loadCustomConversations } from '../../systems/studioStorage';
import {
  cloneMissionBuilderDocument,
  createBlankMissionBuilderDocument,
  createMissionBuilderExport,
  createMissionContentPack,
  downloadMissionBuilderJson,
  loadMissionBuilderLibrary,
  parseMissionBuilderImport,
  prepareMissionBuilderPreview,
  removeMissionBuilderDocument,
  saveMissionBuilderLibrary,
  validateMissionBuilderDocument
} from '../../systems/missionBuilderStorage';

interface MissionBuilderProps {
  onPlaytest: (missionId: string) => void;
}

interface DragState {
  entityId: string;
  offsetX: number;
  offsetY: number;
}

const contacts = contactsJson as ContactDefinition[];
const conversations = conversationsJson as ConversationDefinition[];
const eras = erasJson as EraDefinition[];

const TRIGGERS: ConversationTrigger[] = [
  'mission_start', 'manual_call', 'first_alert', 'low_health', 'keycard_found', 'suspicion',
  'evasion', 'caution', 'reinforcement', 'camera_detected', 'searchlight_detected',
  'boss_intro', 'boss_midfight', 'boss_defeated', 'secret_frequency', 'mission_complete'
];

const ENVIRONMENTS: BuilderEnvironment[] = ['dock', 'tanker', 'jungle', 'facility', 'vr'];

const PALETTE_GROUPS: Array<{ title: string; entities: Array<{ kind: BuilderEntity['kind']; label: string; icon: string }> }> = [
  {
    title: 'Mission Flow',
    entities: [
      { kind: 'player_start', label: 'Player Start', icon: 'S' },
      { kind: 'keycard', label: 'Keycard', icon: 'K' },
      { kind: 'door', label: 'Door', icon: 'D' },
      { kind: 'elevator', label: 'Extraction', icon: 'E' },
      { kind: 'boss', label: 'Boss', icon: 'B' }
    ]
  },
  {
    title: 'Geometry',
    entities: [
      { kind: 'platform', label: 'Platform', icon: '═' },
      { kind: 'crate', label: 'Crate', icon: '□' }
    ]
  },
  {
    title: 'Security',
    entities: [
      { kind: 'guard', label: 'Guard', icon: 'G' },
      { kind: 'reinforcement', label: 'Reinforcement', icon: 'R' },
      { kind: 'camera', label: 'Camera', icon: 'C' },
      { kind: 'searchlight', label: 'Searchlight', icon: 'L' }
    ]
  },
  {
    title: 'Resources',
    entities: [
      { kind: 'pickup_ration', label: 'Ration', icon: '+' },
      { kind: 'pickup_chaff', label: 'Chaff', icon: '⚡' },
      { kind: 'pickup_ammo', label: 'Ammo', icon: 'A' },
      { kind: 'secret', label: 'Secret', icon: '?' }
    ]
  }
];

const ENTITY_LABELS = Object.fromEntries(PALETTE_GROUPS.flatMap((group) => group.entities.map((entity) => [entity.kind, entity.label]))) as Record<BuilderEntity['kind'], string>;
const ENTITY_ICONS = Object.fromEntries(PALETTE_GROUPS.flatMap((group) => group.entities.map((entity) => [entity.kind, entity.icon]))) as Record<BuilderEntity['kind'], string>;

function entityId(kind: BuilderEntity['kind']): string {
  return `${kind}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function createPlacedEntity(kind: BuilderEntity['kind'], x: number, y: number, worldWidth: number): BuilderEntity {
  const base: BuilderEntity = {
    id: entityId(kind),
    kind,
    x: clamp(Math.round(x), 0, worldWidth),
    y: clamp(Math.round(y), 0, 540),
    label: ENTITY_LABELS[kind]
  };
  if (kind === 'platform') base.scaleX = 4;
  if (kind === 'searchlight') base.scaleX = 350;
  if (kind === 'guard' || kind === 'reinforcement') {
    base.patrolMin = clamp(base.x - 150, 0, worldWidth);
    base.patrolMax = clamp(base.x + 150, 0, worldWidth);
    base.hp = 1;
  }
  if (kind === 'boss') base.hp = 10;
  return base;
}

function severityTone(severity: MissionBuilderIssueSeverity): 'success' | 'warning' | 'danger' {
  return severity === 'error' ? 'danger' : severity === 'warning' ? 'warning' : 'success';
}

function stageEntityStyle(entity: MissionBuilderEntity, scaleX: number, scaleY: number): React.CSSProperties {
  const width = entity.kind === 'platform'
    ? Math.max(30, 64 * (entity.scaleX ?? 4) * scaleX)
    : entity.kind === 'searchlight'
      ? Math.max(42, (entity.scaleX ?? 350) * scaleX * 0.36)
      : entity.kind === 'door' || entity.kind === 'elevator'
        ? 26
        : entity.kind === 'boss'
          ? 30
          : 22;
  return {
    left: entity.x * scaleX,
    top: entity.y * scaleY,
    width,
    transform: 'translate(-50%, -50%)'
  };
}

export function MissionBuilder({ onPlaytest }: MissionBuilderProps) {
  const [library, setLibrary] = useState<MissionBuilderLibrary>(() => loadMissionBuilderLibrary());
  const activeDocument = library.documents.find((document) => document.id === library.activeDocumentId) ?? library.documents[0];
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(activeDocument.entities[0]?.id ?? null);
  const [placementKind, setPlacementKind] = useState<BuilderEntity['kind'] | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [statusMessage, setStatusMessage] = useState('MISSION BUILDER READY');
  const [customConversations] = useState(() => loadCustomConversations());
  const importInputRef = useRef<HTMLInputElement>(null);

  const stageWidth = Math.max(1050, activeDocument.worldWidth * 0.32);
  const stageHeight = 420;
  const stageScaleX = stageWidth / activeDocument.worldWidth;
  const stageScaleY = stageHeight / 540;
  const selectedEntity = activeDocument.entities.find((entity) => entity.id === selectedEntityId) ?? null;
  const issues = useMemo(() => validateMissionBuilderDocument(activeDocument), [activeDocument]);
  const errorCount = issues.filter((issue) => issue.severity === 'error').length;
  const warningCount = issues.filter((issue) => issue.severity === 'warning').length;
  const eraContacts = contacts.filter((contact) => contact.era === activeDocument.era);
  const allConversations = useMemo(() => [...customConversations, ...conversations], [customConversations]);

  function persist(next: MissionBuilderLibrary): MissionBuilderLibrary {
    saveMissionBuilderLibrary(next);
    return next;
  }

  function replaceActive(updater: (document: MissionBuilderDocument) => MissionBuilderDocument): void {
    setLibrary((current) => {
      const currentDocument = current.documents.find((document) => document.id === current.activeDocumentId) ?? current.documents[0];
      const nextDocument = { ...updater(currentDocument), updatedAt: new Date().toISOString() };
      const next: MissionBuilderLibrary = {
        schemaVersion: 1,
        activeDocumentId: nextDocument.id,
        documents: current.documents.map((document) => document.id === currentDocument.id ? nextDocument : document)
      };
      return persist(next);
    });
  }

  function updateField<K extends keyof MissionBuilderDocument>(key: K, value: MissionBuilderDocument[K]): void {
    replaceActive((document) => ({ ...document, [key]: value }));
  }

  function updateMissionId(value: string): void {
    const nextId = value.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    if (library.documents.some((document) => document.id === nextId && document.id !== activeDocument.id)) {
      setStatusMessage(`MISSION ID CONFLICT // ${nextId}`);
      return;
    }
    updateField('id', nextId);
  }

  function selectDocument(documentId: string): void {
    setLibrary((current) => persist({ ...current, activeDocumentId: documentId }));
    const document = library.documents.find((entry) => entry.id === documentId);
    setSelectedEntityId(document?.entities[0]?.id ?? null);
    setPlacementKind(null);
    setStatusMessage(`LOADED ${document?.title ?? documentId}`);
  }

  function createDocument(): void {
    const document = createBlankMissionBuilderDocument(library.documents.length + 1);
    const next = persist({ schemaVersion: 1, activeDocumentId: document.id, documents: [document, ...library.documents] });
    setLibrary(next);
    setSelectedEntityId(document.entities[0]?.id ?? null);
    setPlacementKind(null);
    setStatusMessage('NEW MISSION DOCUMENT CREATED');
  }

  function duplicateDocument(): void {
    const duplicate = cloneMissionBuilderDocument(activeDocument);
    const next = persist({ schemaVersion: 1, activeDocumentId: duplicate.id, documents: [duplicate, ...library.documents] });
    setLibrary(next);
    setSelectedEntityId(duplicate.entities[0]?.id ?? null);
    setStatusMessage('MISSION DOCUMENT DUPLICATED');
  }

  function deleteDocument(): void {
    if (!window.confirm(`Delete ${activeDocument.title}? This cannot be undone.`)) return;
    const next = removeMissionBuilderDocument(activeDocument.id);
    setLibrary(next);
    setSelectedEntityId(next.documents[0]?.entities[0]?.id ?? null);
    setStatusMessage('MISSION DOCUMENT DELETED');
  }

  function publishDocument(): void {
    if (errorCount > 0) {
      setStatusMessage(`PUBLISH BLOCKED // ${errorCount} VALIDATION ERROR(S)`);
      return;
    }
    updateField('published', !activeDocument.published);
    setStatusMessage(activeDocument.published ? 'MISSION RETURNED TO DRAFT' : 'MISSION PUBLISHED TO SIDE OPS');
  }

  function playtestDocument(): void {
    if (errorCount > 0) {
      setStatusMessage(`PLAYTEST BLOCKED // FIX ${errorCount} ERROR(S)`);
      return;
    }
    prepareMissionBuilderPreview(activeDocument);
    setStatusMessage('PLAYTEST PROFILE ARMED');
    onPlaytest(activeDocument.id);
  }

  function exportCurrent(): void {
    const result = createMissionBuilderExport(activeDocument);
    downloadMissionBuilderJson(result.fileName, result.payload);
    setStatusMessage('CURRENT MISSION PACK EXPORTED');
  }

  function exportLibrary(): void {
    const pack = createMissionContentPack(library.documents, {
      packId: 'shadow_codec_ops_local_builder_pack',
      name: 'Shadow Codec Ops Local Mission Library',
      author: activeDocument.author
    });
    downloadMissionBuilderJson('shadow-codec-ops-mission-library.json', pack);
    setStatusMessage(`${library.documents.length} MISSION(S) EXPORTED`);
  }

  async function importJson(file: File): Promise<void> {
    try {
      const imported = parseMissionBuilderImport(JSON.parse(await file.text()));
      if (imported.length === 0) throw new Error('No valid mission document was found.');
      const ids = new Set(imported.map((document) => document.id));
      const documents = [...imported, ...library.documents.filter((document) => !ids.has(document.id))];
      const next = persist({ schemaVersion: 1, activeDocumentId: imported[0].id, documents });
      setLibrary(next);
      setSelectedEntityId(imported[0].entities[0]?.id ?? null);
      setStatusMessage(`${imported.length} MISSION(S) IMPORTED`);
    } catch (error) {
      setStatusMessage(`IMPORT FAILED // ${error instanceof Error ? error.message : 'INVALID JSON'}`);
    }
  }

  function updateEntity(entityIdToUpdate: string, patch: Partial<BuilderEntity>): void {
    replaceActive((document) => ({
      ...document,
      entities: document.entities.map((entity) => entity.id === entityIdToUpdate ? { ...entity, ...patch } : entity)
    }));
  }

  function removeEntity(entityIdToRemove: string): void {
    replaceActive((document) => ({ ...document, entities: document.entities.filter((entity) => entity.id !== entityIdToRemove) }));
    setSelectedEntityId(null);
  }

  function duplicateEntity(entity: BuilderEntity): void {
    const duplicate: BuilderEntity = {
      ...entity,
      id: entityId(entity.kind),
      x: clamp(entity.x + 48, 0, activeDocument.worldWidth),
      y: clamp(entity.y - 12, 0, 540),
      label: `${entity.label ?? ENTITY_LABELS[entity.kind]} Copy`
    };
    replaceActive((document) => ({ ...document, entities: [...document.entities, duplicate] }));
    setSelectedEntityId(duplicate.id);
  }

  function onStagePointerDown(event: React.PointerEvent<HTMLDivElement>): void {
    if (!placementKind || event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const entity = createPlacedEntity(
      placementKind,
      (event.clientX - rect.left) / stageScaleX,
      (event.clientY - rect.top) / stageScaleY,
      activeDocument.worldWidth
    );
    replaceActive((document) => ({ ...document, entities: [...document.entities, entity] }));
    setSelectedEntityId(entity.id);
    setStatusMessage(`${ENTITY_LABELS[placementKind].toUpperCase()} PLACED`);
    if (!event.shiftKey) setPlacementKind(null);
  }

  function onEntityPointerDown(event: React.PointerEvent<HTMLButtonElement>, entity: BuilderEntity): void {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    const track = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!track) return;
    setSelectedEntityId(entity.id);
    setPlacementKind(null);
    setDragState({
      entityId: entity.id,
      offsetX: event.clientX - track.left - entity.x * stageScaleX,
      offsetY: event.clientY - track.top - entity.y * stageScaleY
    });
  }

  function onStagePointerMove(event: React.PointerEvent<HTMLDivElement>): void {
    if (!dragState) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left - dragState.offsetX) / stageScaleX, 0, activeDocument.worldWidth);
    const y = clamp((event.clientY - rect.top - dragState.offsetY) / stageScaleY, 0, 540);
    updateEntity(dragState.entityId, { x: Math.round(x), y: Math.round(y) });
  }

  function stopDragging(): void {
    setDragState(null);
  }

  function addObjective(): void {
    replaceActive((document) => ({
      ...document,
      objectives: [...document.objectives, { id: `objective_${document.objectives.length + 1}`, label: 'New mission objective', completedByDefault: false }]
    }));
  }

  function updateObjective(index: number, patch: Partial<MissionBuilderDocument['objectives'][number]>): void {
    replaceActive((document) => ({
      ...document,
      objectives: document.objectives.map((objective, objectiveIndex) => objectiveIndex === index ? { ...objective, ...patch } : objective)
    }));
  }

  function removeObjective(index: number): void {
    replaceActive((document) => ({ ...document, objectives: document.objectives.filter((_, objectiveIndex) => objectiveIndex !== index) }));
  }

  function addCodecTrigger(): void {
    const contact = eraContacts[0] ?? contacts[0];
    const conversation = allConversations.find((entry) => entry.contactId === contact.id) ?? allConversations[0];
    replaceActive((document) => ({
      ...document,
      codecTriggers: [...document.codecTriggers, {
        trigger: 'manual_call',
        contactId: contact.id,
        conversationId: conversation.id,
        priority: 'normal',
        pauseGame: false
      }]
    }));
  }

  function updateCodecTrigger(index: number, patch: Partial<MissionBuilderDocument['codecTriggers'][number]>): void {
    replaceActive((document) => ({
      ...document,
      codecTriggers: document.codecTriggers.map((trigger, triggerIndex) => triggerIndex === index ? { ...trigger, ...patch } : trigger)
    }));
  }

  function changeTriggerContact(index: number, contactId: string): void {
    const firstConversation = allConversations.find((conversation) => conversation.contactId === contactId);
    updateCodecTrigger(index, { contactId, conversationId: firstConversation?.id ?? activeDocument.codecTriggers[index].conversationId });
  }

  function removeCodecTrigger(index: number): void {
    replaceActive((document) => ({ ...document, codecTriggers: document.codecTriggers.filter((_, triggerIndex) => triggerIndex !== index) }));
  }

  return (
    <section className="mission-builder-page">
      <Panel className="builder-command-panel">
        <div className="builder-title-row">
          <div>
            <StatusBadge label="SIDE OPS CONTENT PIPELINE" tone="success" />
            <h2>Mission Builder</h2>
            <p>Create, validate, playtest and export side-scrolling mission packs without editing source files.</p>
          </div>
          <div className="builder-validation-summary">
            <StatusBadge label={`${errorCount} ERRORS`} tone={errorCount > 0 ? 'danger' : 'success'} />
            <StatusBadge label={`${warningCount} WARNINGS`} tone={warningCount > 0 ? 'warning' : 'success'} />
            <StatusBadge label={activeDocument.published ? 'PUBLISHED' : 'DRAFT'} tone={activeDocument.published ? 'success' : 'warning'} />
          </div>
        </div>

        <div className="builder-toolbar">
          <label>
            <span>Mission Document</span>
            <select value={activeDocument.id} onChange={(event) => selectDocument(event.target.value)}>
              {library.documents.map((document) => <option key={document.id} value={document.id}>{document.title}</option>)}
            </select>
          </label>
          <button type="button" onClick={createDocument}>NEW</button>
          <button type="button" onClick={duplicateDocument}>DUPLICATE</button>
          <button type="button" onClick={deleteDocument}>DELETE</button>
          <button type="button" onClick={publishDocument}>{activeDocument.published ? 'UNPUBLISH' : 'PUBLISH'}</button>
          <button className="builder-playtest" type="button" onClick={playtestDocument}>PLAYTEST</button>
          <button type="button" onClick={exportCurrent}>EXPORT MISSION</button>
          <button type="button" onClick={exportLibrary}>EXPORT LIBRARY</button>
          <button type="button" onClick={() => importInputRef.current?.click()}>IMPORT JSON</button>
          <input
            ref={importInputRef}
            hidden
            type="file"
            accept="application/json,.json"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importJson(file);
              event.currentTarget.value = '';
            }}
          />
        </div>
        <div className="builder-status-line" role="status">{statusMessage}</div>
      </Panel>

      <div className="builder-workspace">
        <Panel className="builder-palette-panel" title="Entity Palette">
          <p className="builder-help">Choose an entity, then click the stage. Hold Shift to place several copies.</p>
          {PALETTE_GROUPS.map((group) => (
            <div className="palette-group" key={group.title}>
              <strong>{group.title}</strong>
              <div>
                {group.entities.map((entity) => (
                  <button
                    key={entity.kind}
                    type="button"
                    className={placementKind === entity.kind ? 'active' : ''}
                    onClick={() => setPlacementKind((current) => current === entity.kind ? null : entity.kind)}
                  >
                    <i>{entity.icon}</i>
                    <span>{entity.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="builder-metadata-compact">
            <label><span>Title</span><input value={activeDocument.title} onChange={(event) => updateField('title', event.target.value)} /></label>
            <label><span>Mission ID</span><input value={activeDocument.id} onChange={(event) => updateMissionId(event.target.value)} /></label>
            <label><span>Era</span><select value={activeDocument.era} onChange={(event) => updateField('era', event.target.value as MissionBuilderDocument['era'])}>{eras.map((era) => <option key={era.id} value={era.id}>{era.name}</option>)}</select></label>
            <label><span>Environment</span><select value={activeDocument.environment} onChange={(event) => updateField('environment', event.target.value as BuilderEnvironment)}>{ENVIRONMENTS.map((environment) => <option key={environment} value={environment}>{environment.toUpperCase()}</option>)}</select></label>
            <label><span>Location</span><input value={activeDocument.location} onChange={(event) => updateField('location', event.target.value)} /></label>
            <label><span>Main Character</span><input value={activeDocument.mainCharacter} onChange={(event) => updateField('mainCharacter', event.target.value)} /></label>
            <label><span>Author</span><input value={activeDocument.author} onChange={(event) => updateField('author', event.target.value)} /></label>
            <label><span>Difficulty</span><input type="number" min={1} max={5} value={activeDocument.difficulty} onChange={(event) => updateField('difficulty', clamp(Number(event.target.value), 1, 5))} /></label>
            <label><span>World Width</span><input type="number" min={1600} max={12000} step={100} value={activeDocument.worldWidth} onChange={(event) => updateField('worldWidth', clamp(Number(event.target.value), 1600, 12000))} /></label>
            <label><span>Start Ammo</span><input type="number" min={0} value={activeDocument.startAmmo} onChange={(event) => updateField('startAmmo', Math.max(0, Number(event.target.value)))} /></label>
            <label><span>Rations</span><input type="number" min={0} max={9} value={activeDocument.startRations} onChange={(event) => updateField('startRations', clamp(Number(event.target.value), 0, 9))} /></label>
            <label><span>Chaff</span><input type="number" min={0} max={9} value={activeDocument.startChaff} onChange={(event) => updateField('startChaff', clamp(Number(event.target.value), 0, 9))} /></label>
            <label className="builder-description-field"><span>Description</span><textarea value={activeDocument.description} onChange={(event) => updateField('description', event.target.value)} /></label>
          </div>
        </Panel>

        <Panel className="builder-stage-panel">
          <div className="builder-stage-header">
            <div>
              <strong>{activeDocument.title}</strong>
              <span>{activeDocument.worldWidth} × 540 tactical pixels // {activeDocument.entities.length} entities</span>
            </div>
            <StatusBadge label={placementKind ? `PLACE ${ENTITY_LABELS[placementKind]}` : 'SELECT / DRAG'} tone={placementKind ? 'warning' : 'success'} />
          </div>
          <div className={`builder-stage-scroll environment-${activeDocument.environment}`}>
            <div
              className={`builder-stage-track ${placementKind ? 'placement-active' : ''}`}
              style={{ width: stageWidth, height: stageHeight }}
              onPointerDown={onStagePointerDown}
              onPointerMove={onStagePointerMove}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
            >
              <div className="builder-ground-line" style={{ top: 515 * stageScaleY }} />
              {Array.from({ length: Math.floor(activeDocument.worldWidth / 500) + 1 }, (_, index) => (
                <span className="builder-distance-marker" key={index} style={{ left: index * 500 * stageScaleX }}>{index * 500}m</span>
              ))}
              {activeDocument.entities.map((entity) => (
                <button
                  key={entity.id}
                  type="button"
                  className={`builder-stage-entity kind-${entity.kind} ${selectedEntityId === entity.id ? 'selected' : ''}`}
                  style={stageEntityStyle(entity, stageScaleX, stageScaleY)}
                  title={`${entity.label ?? ENTITY_LABELS[entity.kind]} @ ${entity.x}, ${entity.y}`}
                  onPointerDown={(event) => onEntityPointerDown(event, entity)}
                  onDoubleClick={() => duplicateEntity(entity)}
                >
                  <i>{ENTITY_ICONS[entity.kind]}</i>
                  <span>{entity.label ?? ENTITY_LABELS[entity.kind]}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="builder-stage-help">Drag entities to reposition them. Double-click an entity to duplicate it. The runtime uses the first Start, Keycard, Door, Boss and Extraction entities.</p>
        </Panel>

        <Panel className="builder-inspector-panel" title="Inspector">
          {selectedEntity ? (
            <div className="builder-inspector-form">
              <StatusBadge label={ENTITY_LABELS[selectedEntity.kind]} tone="success" />
              <label><span>Entity ID</span><input value={selectedEntity.id} onChange={(event) => { const nextId = event.target.value.replace(/[^a-zA-Z0-9_-]/g, '_'); updateEntity(selectedEntity.id, { id: nextId }); setSelectedEntityId(nextId); }} /></label>
              <label><span>Label</span><input value={selectedEntity.label ?? ''} onChange={(event) => updateEntity(selectedEntity.id, { label: event.target.value })} /></label>
              <div className="builder-coordinate-row">
                <label><span>X</span><input type="number" value={Math.round(selectedEntity.x)} onChange={(event) => updateEntity(selectedEntity.id, { x: clamp(Number(event.target.value), 0, activeDocument.worldWidth) })} /></label>
                <label><span>Y</span><input type="number" value={Math.round(selectedEntity.y)} onChange={(event) => updateEntity(selectedEntity.id, { y: clamp(Number(event.target.value), 0, 540) })} /></label>
              </div>
              {(selectedEntity.kind === 'platform' || selectedEntity.kind === 'searchlight') && (
                <label><span>{selectedEntity.kind === 'platform' ? 'Horizontal Scale' : 'Sweep Width'}</span><input type="number" value={selectedEntity.scaleX ?? (selectedEntity.kind === 'platform' ? 4 : 350)} onChange={(event) => updateEntity(selectedEntity.id, { scaleX: Math.max(0.5, Number(event.target.value)) })} /></label>
              )}
              {(selectedEntity.kind === 'guard' || selectedEntity.kind === 'reinforcement') && (
                <>
                  <label><span>Patrol Min</span><input type="number" value={selectedEntity.patrolMin ?? selectedEntity.x - 150} onChange={(event) => updateEntity(selectedEntity.id, { patrolMin: clamp(Number(event.target.value), 0, activeDocument.worldWidth) })} /></label>
                  <label><span>Patrol Max</span><input type="number" value={selectedEntity.patrolMax ?? selectedEntity.x + 150} onChange={(event) => updateEntity(selectedEntity.id, { patrolMax: clamp(Number(event.target.value), 0, activeDocument.worldWidth) })} /></label>
                  <label><span>HP</span><input type="number" min={1} max={100} value={selectedEntity.hp ?? 1} onChange={(event) => updateEntity(selectedEntity.id, { hp: clamp(Number(event.target.value), 1, 100) })} /></label>
                </>
              )}
              {selectedEntity.kind === 'boss' && (
                <label><span>Boss HP</span><input type="number" min={1} max={100} value={selectedEntity.hp ?? 10} onChange={(event) => updateEntity(selectedEntity.id, { hp: clamp(Number(event.target.value), 1, 100) })} /></label>
              )}
              <div className="builder-inspector-actions">
                <button type="button" onClick={() => duplicateEntity(selectedEntity)}>DUPLICATE</button>
                <button type="button" className="danger" onClick={() => removeEntity(selectedEntity.id)}>DELETE ENTITY</button>
              </div>
            </div>
          ) : (
            <p className="builder-help">Select an entity on the stage to edit its placement and runtime properties.</p>
          )}

          <div className="builder-layer-list">
            <strong>Scene Entities</strong>
            {activeDocument.entities.map((entity) => (
              <button key={entity.id} type="button" className={selectedEntityId === entity.id ? 'active' : ''} onClick={() => setSelectedEntityId(entity.id)}>
                <i>{ENTITY_ICONS[entity.kind]}</i><span>{entity.label ?? ENTITY_LABELS[entity.kind]}</span><small>{entity.x}, {entity.y}</small>
              </button>
            ))}
          </div>
        </Panel>
      </div>

      <div className="builder-data-grid">
        <Panel title="Mission Objectives">
          <div className="builder-objective-list">
            {activeDocument.objectives.map((objective, index) => (
              <div key={`${objective.id}-${index}`}>
                <input value={objective.id} aria-label={`Objective ${index + 1} ID`} onChange={(event) => updateObjective(index, { id: event.target.value.replace(/[^a-zA-Z0-9_-]/g, '_') })} />
                <input value={objective.label} aria-label={`Objective ${index + 1} label`} onChange={(event) => updateObjective(index, { label: event.target.value })} />
                <label className="builder-inline-check"><input type="checkbox" checked={objective.completedByDefault} onChange={(event) => updateObjective(index, { completedByDefault: event.target.checked })} /><span>Initial</span></label>
                <button type="button" onClick={() => removeObjective(index)}>REMOVE</button>
              </div>
            ))}
            <button type="button" onClick={addObjective}>ADD OBJECTIVE</button>
          </div>
        </Panel>

        <Panel title="Codec Trigger Router">
          <div className="builder-trigger-list">
            {activeDocument.codecTriggers.map((trigger, index) => {
              const triggerContacts = contacts.filter((contact) => contact.era === activeDocument.era || contact.id === trigger.contactId);
              const contactConversations = allConversations.filter((conversation) => conversation.contactId === trigger.contactId);
              return (
                <div key={`${trigger.trigger}-${index}`}>
                  <select value={trigger.trigger} aria-label={`Codec trigger ${index + 1}`} onChange={(event) => updateCodecTrigger(index, { trigger: event.target.value as ConversationTrigger })}>{TRIGGERS.map((entry) => <option key={entry} value={entry}>{entry}</option>)}</select>
                  <select value={trigger.contactId} aria-label={`Codec contact ${index + 1}`} onChange={(event) => changeTriggerContact(index, event.target.value)}>{triggerContacts.map((contact) => <option key={contact.id} value={contact.id}>{contact.name}</option>)}</select>
                  <select value={trigger.conversationId} aria-label={`Codec conversation ${index + 1}`} onChange={(event) => updateCodecTrigger(index, { conversationId: event.target.value })}>{contactConversations.map((conversation) => <option key={conversation.id} value={conversation.id}>{conversation.title}</option>)}</select>
                  <select value={trigger.priority} aria-label={`Codec priority ${index + 1}`} onChange={(event) => updateCodecTrigger(index, { priority: event.target.value as typeof trigger.priority })}><option value="normal">NORMAL</option><option value="urgent">URGENT</option><option value="secret">SECRET</option></select>
                  <label className="builder-inline-check"><input type="checkbox" checked={trigger.pauseGame} onChange={(event) => updateCodecTrigger(index, { pauseGame: event.target.checked })} /><span>Pause</span></label>
                  <button type="button" onClick={() => removeCodecTrigger(index)}>REMOVE</button>
                </div>
              );
            })}
            <button type="button" onClick={addCodecTrigger}>ADD CODEC TRIGGER</button>
          </div>
        </Panel>

        <Panel title="Validation Report">
          <div className="builder-validation-list">
            {issues.length === 0 ? <StatusBadge label="MISSION VALID" tone="success" /> : issues.map((issue) => (
              <button
                type="button"
                key={issue.id}
                className={`severity-${issue.severity}`}
                onClick={() => issue.entityId && setSelectedEntityId(issue.entityId)}
              >
                <StatusBadge label={issue.severity} tone={severityTone(issue.severity)} />
                <span>{issue.message}</span>
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}
