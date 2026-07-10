import '../../styles/studio.css';
import { useMemo, useState } from 'react';
import contactsJson from '../../data/contacts.json';
import conversationsJson from '../../data/conversations.json';
import erasJson from '../../data/eras.json';
import missionsJson from '../../data/missions.json';
import type {
  ContactDefinition,
  ConversationDefinition,
  ConversationLine,
  ConversationTrigger,
  EraDefinition,
  EraId
} from '../../types/codec.types';
import type { MissionDefinition } from '../../types/mission.types';
import type { StudioConversationRecord, StudioTriggerOverride, StudioTriggerPriority } from '../../types/studio.types';
import { getSpeakerLabel } from '../../systems/conversationEngine';
import { formatFrequency, normalizeFrequency } from '../../systems/frequencyEngine';
import { conversationToSrt } from '../../systems/subtitleExport';
import {
  cloneBuiltInConversation,
  createStudioConversationId,
  loadCustomConversations,
  loadTriggerOverrides,
  makeBlankConversation,
  mergeStudioConversations,
  sanitizeImportedConversation,
  saveCustomConversations,
  saveTriggerOverrides
} from '../../systems/studioStorage';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';
import { conversationToDirectorSequence, loadCustomDirectorSequences, saveCustomDirectorSequences } from '../../systems/directorStorage';

const contacts = contactsJson as ContactDefinition[];
const builtInConversations = conversationsJson as ConversationDefinition[];
const eras = erasJson as EraDefinition[];
const missions = missionsJson as MissionDefinition[];

const triggerOptions: ConversationTrigger[] = [
  'manual_call',
  'incoming_call',
  'mission_start',
  'suspicion',
  'first_alert',
  'evasion',
  'caution',
  'reinforcement',
  'camera_detected',
  'searchlight_detected',
  'low_health',
  'keycard_found',
  'boss_intro',
  'boss_midfight',
  'boss_defeated',
  'mission_complete',
  'secret_frequency',
  'save_request'
];

const emotionOptions: Array<ConversationLine['emotion']> = ['neutral', 'serious', 'warning', 'calm', 'glitch', 'humor'];
const speedOptions: Array<ConversationLine['speed']> = ['slow', 'normal', 'fast'];
const priorityOptions: StudioTriggerPriority[] = ['normal', 'urgent', 'secret'];

function getFallbackContact(era: EraId = 'mgs1'): ContactDefinition {
  return contacts.find((contact) => contact.era === era) ?? contacts[0];
}

function markCustom(conversation: StudioConversationRecord): StudioConversationRecord {
  return {
    ...conversation,
    source: 'custom',
    updatedAt: new Date().toISOString(),
    lines: conversation.lines.map((line) => ({ ...line }))
  };
}

function makeOverrideId(missionId: string, trigger: ConversationTrigger): string {
  return `${missionId}:${trigger}`;
}

export function ConversationStudio() {
  const [customConversations, setCustomConversations] = useState<StudioConversationRecord[]>(() => loadCustomConversations());
  const [triggerOverrides, setTriggerOverrides] = useState<StudioTriggerOverride[]>(() => loadTriggerOverrides());
  const [selectedEra, setSelectedEra] = useState<EraId>('mgs1');
  const [selectedConversationId, setSelectedConversationId] = useState(() => customConversations[0]?.id ?? builtInConversations[0]?.id ?? '');
  const [filter, setFilter] = useState('');
  const [draft, setDraft] = useState<StudioConversationRecord>(() => {
    const first = customConversations[0] ?? { ...builtInConversations[0], source: 'built_in' as const };
    return { ...first, lines: first.lines.map((line) => ({ ...line })) };
  });
  const [previewLineIndex, setPreviewLineIndex] = useState(0);
  const [importBuffer, setImportBuffer] = useState('');
  const [exportMode, setExportMode] = useState<'selected' | 'custom' | 'overrides'>('selected');
  const [studioMessage, setStudioMessage] = useState('STUDIO READY');
  const [selectedMissionId, setSelectedMissionId] = useState(() => missions[0]?.id ?? 'shadow_dock_001');
  const [overrideTrigger, setOverrideTrigger] = useState<ConversationTrigger>('mission_start');
  const [overridePriority, setOverridePriority] = useState<StudioTriggerPriority>('normal');
  const [overridePauseGame, setOverridePauseGame] = useState(true);
  const [overrideEnabled, setOverrideEnabled] = useState(true);

  const allConversations = useMemo(
    () => mergeStudioConversations(builtInConversations, customConversations),
    [customConversations]
  );

  const selectedContact = contacts.find((contact) => contact.id === draft.contactId) ?? getFallbackContact(draft.era);
  const eraContacts = contacts.filter((contact) => contact.era === draft.era);
  const previewLine = draft.lines[previewLineIndex] ?? draft.lines[0];
  const draftEraDefinition = eras.find((era) => era.id === draft.era) ?? eras[0];

  const filteredConversations = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    return allConversations.filter((conversation) => {
      if (conversation.era !== selectedEra) return false;
      if (!normalized) return true;
      const contactName = contacts.find((contact) => contact.id === conversation.contactId)?.name ?? conversation.contactId;
      return [conversation.title, conversation.id, conversation.trigger, contactName]
        .join(' ')
        .toLowerCase()
        .includes(normalized);
    });
  }, [allConversations, filter, selectedEra]);

  const exportPayload = useMemo(() => {
    if (exportMode === 'custom') return JSON.stringify(customConversations, null, 2);
    if (exportMode === 'overrides') return JSON.stringify(triggerOverrides, null, 2);
    return JSON.stringify(draft, null, 2);
  }, [customConversations, draft, exportMode, triggerOverrides]);

  const currentOverride = triggerOverrides.find((override) => override.id === makeOverrideId(selectedMissionId, overrideTrigger));

  function persistCustomConversations(next: StudioConversationRecord[], message: string) {
    setCustomConversations(next);
    saveCustomConversations(next);
    setStudioMessage(message);
  }

  function persistOverrides(next: StudioTriggerOverride[], message: string) {
    setTriggerOverrides(next);
    saveTriggerOverrides(next);
    setStudioMessage(message);
  }

  function selectConversation(conversationId: string) {
    const conversation = allConversations.find((item) => item.id === conversationId);
    if (!conversation) return;
    setSelectedConversationId(conversationId);
    setSelectedEra(conversation.era);
    setDraft({ ...conversation, lines: conversation.lines.map((line) => ({ ...line })) });
    setPreviewLineIndex(0);
    setStudioMessage(conversation.source === 'custom' ? 'CUSTOM CONVERSATION LOADED' : 'BUILT-IN CONVERSATION LOADED');
  }

  function createNewConversation() {
    const contact = getFallbackContact(selectedEra);
    const next = makeBlankConversation(selectedEra, contact);
    setDraft(next);
    setSelectedConversationId(next.id);
    setPreviewLineIndex(0);
    setStudioMessage('NEW CUSTOM DRAFT READY');
  }

  function duplicateConversation() {
    const cloned = draft.source === 'built_in'
      ? cloneBuiltInConversation(draft)
      : markCustom({
        ...draft,
        id: createStudioConversationId(`${draft.id}_copy`),
        title: `${draft.title} / Copy`
      });
    setDraft(cloned);
    setSelectedConversationId(cloned.id);
    setPreviewLineIndex(0);
    persistCustomConversations([cloned, ...customConversations], 'DUPLICATED AS CUSTOM CONVERSATION');
  }

  function saveDraft() {
    const contact = contacts.find((item) => item.id === draft.contactId) ?? selectedContact;
    const normalizedDraft = markCustom({
      ...draft,
      era: contact.era,
      frequency: normalizeFrequency(draft.frequency || contact.frequency),
      lines: draft.lines.length > 0 ? draft.lines : [{ speaker: 'snake', text: '...' }]
    });

    const existingIndex = customConversations.findIndex((conversation) => conversation.id === normalizedDraft.id);
    const next = existingIndex >= 0
      ? customConversations.map((conversation) => (conversation.id === normalizedDraft.id ? normalizedDraft : conversation))
      : [normalizedDraft, ...customConversations];

    setDraft(normalizedDraft);
    setSelectedConversationId(normalizedDraft.id);
    persistCustomConversations(next, 'CUSTOM CONVERSATION SAVED');
  }

  function deleteDraft() {
    if (draft.source !== 'custom') {
      setStudioMessage('BUILT-IN CONVERSATIONS CANNOT BE DELETED');
      return;
    }
    const next = customConversations.filter((conversation) => conversation.id !== draft.id);
    const nextSelection = next[0] ?? { ...builtInConversations[0], source: 'built_in' as const };
    setDraft({ ...nextSelection, lines: nextSelection.lines.map((line) => ({ ...line })) });
    setSelectedConversationId(nextSelection.id);
    setPreviewLineIndex(0);
    persistCustomConversations(next, 'CUSTOM CONVERSATION DELETED');
  }

  function importConversations() {
    try {
      const parsed = JSON.parse(importBuffer) as unknown;
      const values = Array.isArray(parsed) ? parsed : [parsed];
      const fallback = getFallbackContact(selectedEra);
      const imported = values
        .map((value) => sanitizeImportedConversation(value, fallback))
        .filter((value): value is StudioConversationRecord => Boolean(value));

      if (imported.length === 0) {
        setStudioMessage('IMPORT FAILED: NO VALID CONVERSATION FOUND');
        return;
      }

      const next = [
        ...imported,
        ...customConversations.filter((existing) => !imported.some((item) => item.id === existing.id))
      ];
      setDraft(imported[0]);
      setSelectedConversationId(imported[0].id);
      setPreviewLineIndex(0);
      setImportBuffer('');
      persistCustomConversations(next, `IMPORTED ${imported.length} CONVERSATION(S)`);
    } catch {
      setStudioMessage('IMPORT FAILED: INVALID JSON');
    }
  }

  function updateDraftField<K extends keyof StudioConversationRecord>(field: K, value: StudioConversationRecord[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateContact(contactId: string) {
    const contact = contacts.find((item) => item.id === contactId) ?? selectedContact;
    setDraft((current) => ({
      ...current,
      contactId: contact.id,
      era: contact.era,
      frequency: contact.frequency
    }));
    setSelectedEra(contact.era);
  }

  function updateLine(index: number, patch: Partial<ConversationLine>) {
    setDraft((current) => ({
      ...current,
      lines: current.lines.map((line, lineIndex) => (lineIndex === index ? { ...line, ...patch } : line))
    }));
  }

  function addLine() {
    setDraft((current) => ({
      ...current,
      lines: [
        ...current.lines,
        {
          speaker: 'snake',
          text: 'New line...',
          emotion: 'neutral',
          speed: 'normal',
          glitchLevel: 0
        }
      ]
    }));
    setPreviewLineIndex(draft.lines.length);
  }

  function removeLine(index: number) {
    setDraft((current) => {
      const nextLines = current.lines.filter((_, lineIndex) => lineIndex !== index);
      return {
        ...current,
        lines: nextLines.length > 0 ? nextLines : [{ speaker: 'snake', text: '...' }]
      };
    });
    setPreviewLineIndex((current) => Math.max(0, Math.min(current, draft.lines.length - 2)));
  }

  function moveLine(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= draft.lines.length) return;
    setDraft((current) => {
      const nextLines = current.lines.map((line) => ({ ...line }));
      const [line] = nextLines.splice(index, 1);
      nextLines.splice(targetIndex, 0, line);
      return { ...current, lines: nextLines };
    });
    setPreviewLineIndex(targetIndex);
  }

  function saveOverride() {
    const override: StudioTriggerOverride = {
      id: makeOverrideId(selectedMissionId, overrideTrigger),
      missionId: selectedMissionId,
      trigger: overrideTrigger,
      contactId: draft.contactId,
      conversationId: draft.id,
      priority: overridePriority,
      pauseGame: overridePauseGame,
      enabled: overrideEnabled,
      updatedAt: new Date().toISOString(),
      notes: `Studio route to ${draft.title}`
    };

    const next = [
      override,
      ...triggerOverrides.filter((item) => item.id !== override.id)
    ];
    persistOverrides(next, `TRIGGER OVERRIDE SAVED: ${override.trigger}`);
  }

  function deleteOverride(overrideId: string) {
    persistOverrides(triggerOverrides.filter((override) => override.id !== overrideId), 'TRIGGER OVERRIDE DELETED');
  }

  function loadOverride(override: StudioTriggerOverride) {
    setSelectedMissionId(override.missionId);
    setOverrideTrigger(override.trigger);
    setOverridePriority(override.priority);
    setOverridePauseGame(override.pauseGame);
    setOverrideEnabled(override.enabled);
    selectConversation(override.conversationId);
  }

  function copyExportToClipboard() {
    void navigator.clipboard?.writeText(exportPayload);
    setStudioMessage('EXPORT JSON COPIED');
  }

  function copySrt(locale: 'en' | 'fr') {
    void navigator.clipboard?.writeText(conversationToSrt(draft, locale));
    setStudioMessage(`SUBTITLE SRT COPIED: ${locale.toUpperCase()}`);
  }


  function sendToDirector() {
    const sequence = conversationToDirectorSequence(draft);
    const current = loadCustomDirectorSequences();
    saveCustomDirectorSequences([sequence, ...current.filter((item) => item.id !== sequence.id)]);
    setStudioMessage(`DIRECTOR SEQUENCE CREATED: ${sequence.title.toUpperCase()}`);
  }

  return (
    <section className="studio-page">
      <Panel className="studio-browser-panel">
        <div className="studio-header-block">
          <StatusBadge label={studioMessage} tone={studioMessage.includes('FAILED') ? 'danger' : 'success'} />
          <h2>Conversation Studio</h2>
          <p>
            Crée, édite, prévisualise et exporte des transmissions Codec. Les conversations custom sont
            sauvegardées localement et peuvent remplacer les triggers Side Ops via les overrides.
          </p>
        </div>

        <div className="studio-toolbar">
          <select value={selectedEra} onChange={(event) => setSelectedEra(event.target.value as EraId)}>
            {eras.map((era) => <option key={era.id} value={era.id}>{era.name}</option>)}
          </select>
          <input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Filter title, trigger, contact..."
          />
        </div>

        <div className="studio-list">
          {filteredConversations.map((conversation) => {
            const contact = contacts.find((item) => item.id === conversation.contactId);
            return (
              <button
                key={`${conversation.source}-${conversation.id}`}
                className={`studio-list-row ${selectedConversationId === conversation.id ? 'active' : ''}`}
                type="button"
                onClick={() => selectConversation(conversation.id)}
              >
                <span>{conversation.source === 'custom' ? 'CUSTOM' : 'BUILT-IN'} // {conversation.trigger}</span>
                <strong>{conversation.title}</strong>
                <small>{contact?.name ?? conversation.contactId} · {formatFrequency(conversation.frequency)}</small>
              </button>
            );
          })}
        </div>

        <div className="studio-actions-grid">
          <button className="primary-action" type="button" onClick={createNewConversation}>New</button>
          <button className="primary-action" type="button" onClick={duplicateConversation}>Duplicate</button>
          <button className="primary-action" type="button" onClick={saveDraft}>Save Custom</button>
          <button className="primary-action secondary" type="button" onClick={deleteDraft}>Delete</button>
        </div>
      </Panel>

      <Panel className="studio-editor-panel">
        <div className="studio-editor-grid">
          <label>
            <span>ID</span>
            <input value={draft.id} onChange={(event) => updateDraftField('id', event.target.value)} />
          </label>
          <label>
            <span>Title</span>
            <input value={draft.title} onChange={(event) => updateDraftField('title', event.target.value)} />
          </label>
          <label>
            <span>Era</span>
            <select value={draft.era} onChange={(event) => updateDraftField('era', event.target.value as EraId)}>
              {eras.map((era) => <option key={era.id} value={era.id}>{era.name}</option>)}
            </select>
          </label>
          <label>
            <span>Contact</span>
            <select value={draft.contactId} onChange={(event) => updateContact(event.target.value)}>
              {(eraContacts.length > 0 ? eraContacts : contacts).map((contact) => (
                <option key={contact.id} value={contact.id}>{contact.name} · {formatFrequency(contact.frequency)}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Frequency</span>
            <input
              type="number"
              step="0.01"
              value={draft.frequency}
              onChange={(event) => updateDraftField('frequency', normalizeFrequency(Number(event.target.value)))}
            />
          </label>
          <label>
            <span>Trigger</span>
            <select value={draft.trigger} onChange={(event) => updateDraftField('trigger', event.target.value as ConversationTrigger)}>
              {triggerOptions.map((trigger) => <option key={trigger} value={trigger}>{trigger}</option>)}
            </select>
          </label>
          <label className="studio-checkbox-row">
            <input
              type="checkbox"
              checked={draft.canReplay}
              onChange={(event) => updateDraftField('canReplay', event.target.checked)}
            />
            <span>Replayable</span>
          </label>
          <label className="studio-checkbox-row">
            <input type="checkbox" checked={draft.source === 'custom'} readOnly />
            <span>{draft.source === 'custom' ? 'Custom editable record' : 'Built-in template'}</span>
          </label>
        </div>

        <div className="studio-lines-header">
          <h3>Dialogue Lines</h3>
          <button className="primary-action" type="button" onClick={addLine}>Add Line</button>
        </div>

        <div className="studio-lines-list">
          {draft.lines.map((line, index) => (
            <div className="studio-line-card" key={`${draft.id}-line-${index}`}>
              <div className="studio-line-topbar">
                <strong>#{index + 1}</strong>
                <div>
                  <button type="button" onClick={() => moveLine(index, -1)}>↑</button>
                  <button type="button" onClick={() => moveLine(index, 1)}>↓</button>
                  <button type="button" onClick={() => removeLine(index)}>Remove</button>
                  <button type="button" onClick={() => setPreviewLineIndex(index)}>Preview</button>
                </div>
              </div>
              <div className="studio-line-grid">
                <label>
                  <span>Speaker</span>
                  <input value={line.speaker} onChange={(event) => updateLine(index, { speaker: event.target.value })} />
                </label>
                <label>
                  <span>Emotion</span>
                  <select value={line.emotion ?? 'neutral'} onChange={(event) => updateLine(index, { emotion: event.target.value as ConversationLine['emotion'] })}>
                    {emotionOptions.map((emotion) => <option key={emotion} value={emotion}>{emotion}</option>)}
                  </select>
                </label>
                <label>
                  <span>Speed</span>
                  <select value={line.speed ?? 'normal'} onChange={(event) => updateLine(index, { speed: event.target.value as ConversationLine['speed'] })}>
                    {speedOptions.map((speed) => <option key={speed} value={speed}>{speed}</option>)}
                  </select>
                </label>
                <label>
                  <span>Glitch</span>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={line.glitchLevel ?? 0}
                    onChange={(event) => updateLine(index, { glitchLevel: Number(event.target.value) })}
                  />
                </label>
              </div>
              <div className="narrative-timing-grid">
                <label><span>Start ms</span><input type="number" min="0" value={line.startMs ?? 0} onChange={(event) => updateLine(index, { startMs: Number(event.target.value) })} /></label>
                <label><span>End ms</span><input type="number" min="0" value={line.endMs ?? 2500} onChange={(event) => updateLine(index, { endMs: Number(event.target.value) })} /></label>
                <label><span>Portrait expression</span><input value={line.portraitExpression ?? line.emotion ?? 'neutral'} onChange={(event) => updateLine(index, { portraitExpression: event.target.value })} /></label>
                <label><span>Local audio path</span><input placeholder="/audio/custom/line.ogg" value={line.audioSource ?? ''} onChange={(event) => updateLine(index, { audioSource: event.target.value || undefined })} /></label>
              </div>
              <textarea
                value={line.text}
                onChange={(event) => updateLine(index, { text: event.target.value })}
                rows={3}
                placeholder="Legacy / English fallback text"
              />
              <div className="narrative-language-row">
                <textarea rows={2} placeholder="English subtitle" value={line.localizedText?.en ?? line.text} onChange={(event) => updateLine(index, { localizedText: { en: event.target.value, fr: line.localizedText?.fr, ja: line.localizedText?.ja } })} />
                <textarea rows={2} placeholder="Sous-titre français" value={line.localizedText?.fr ?? ''} onChange={(event) => updateLine(index, { localizedText: { en: line.localizedText?.en ?? line.text, fr: event.target.value || undefined, ja: line.localizedText?.ja } })} />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="studio-preview-panel">
        <div className={`studio-preview-frame theme-${draftEraDefinition.visualStyle}`}>
          <div className="codec-portrait compact">
            <span className="portrait-label">PLAYER</span>
            <strong>{draft.era === 'mgs2' ? 'RAIDEN' : draft.era === 'mgs3' ? 'NAKED SNAKE' : draft.era === 'mgsv' ? 'VENOM SNAKE' : 'SOLID SNAKE'}</strong>
          </div>
          <div className="studio-preview-core">
            <span className="frequency-caption">PREVIEW // {formatFrequency(draft.frequency)}</span>
            <strong>{draft.title}</strong>
            <p>{getSpeakerLabel(previewLine?.speaker ?? 'snake', selectedContact)}</p>
            <blockquote>{previewLine?.localizedText?.en ?? previewLine?.text ?? 'No line selected.'}</blockquote>
            <small>{previewLine?.startMs ?? 0}ms → {previewLine?.endMs ?? 2500}ms · {previewLine?.portraitExpression ?? previewLine?.emotion ?? 'neutral'}</small>
            <div className="dialogue-actions">
              <button type="button" onClick={() => setPreviewLineIndex((index) => Math.max(0, index - 1))}>Prev</button>
              <button type="button" onClick={() => setPreviewLineIndex((index) => Math.min(draft.lines.length - 1, index + 1))}>Next</button>
            </div>
          </div>
          <div className="codec-portrait compact">
            <span className="portrait-label">CONTACT</span>
            <strong>{selectedContact.name}</strong>
          </div>
        </div>
      </Panel>

      <Panel className="studio-trigger-panel" title="Side Ops Trigger Overrides">
        <p>
          Remplace localement une transmission de mission par la conversation sélectionnée. Side Ops lira ces overrides
          au moment où Phaser demande un appel Codec.
        </p>
        <div className="studio-editor-grid">
          <label>
            <span>Mission</span>
            <select value={selectedMissionId} onChange={(event) => setSelectedMissionId(event.target.value)}>
              {missions.map((mission) => <option key={mission.id} value={mission.id}>{mission.title}</option>)}
            </select>
          </label>
          <label>
            <span>Trigger</span>
            <select value={overrideTrigger} onChange={(event) => setOverrideTrigger(event.target.value as ConversationTrigger)}>
              {triggerOptions.map((trigger) => <option key={trigger} value={trigger}>{trigger}</option>)}
            </select>
          </label>
          <label>
            <span>Priority</span>
            <select value={overridePriority} onChange={(event) => setOverridePriority(event.target.value as StudioTriggerPriority)}>
              {priorityOptions.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
            </select>
          </label>
          <label className="studio-checkbox-row">
            <input type="checkbox" checked={overridePauseGame} onChange={(event) => setOverridePauseGame(event.target.checked)} />
            <span>Pause game during call</span>
          </label>
          <label className="studio-checkbox-row">
            <input type="checkbox" checked={overrideEnabled} onChange={(event) => setOverrideEnabled(event.target.checked)} />
            <span>Enabled</span>
          </label>
        </div>
        <div className="studio-actions-grid">
          <button className="primary-action" type="button" onClick={saveOverride}>Save Override</button>
          {currentOverride && (
            <button className="primary-action secondary" type="button" onClick={() => deleteOverride(currentOverride.id)}>Remove Current</button>
          )}
        </div>

        <div className="studio-overrides-list">
          {triggerOverrides.length === 0 ? <span>No trigger override saved.</span> : triggerOverrides.map((override) => {
            const conversation = allConversations.find((item) => item.id === override.conversationId);
            return (
              <button key={override.id} type="button" className="studio-override-row" onClick={() => loadOverride(override)}>
                <span>{override.enabled ? 'ON' : 'OFF'} // {override.missionId}</span>
                <strong>{override.trigger} → {conversation?.title ?? override.conversationId}</strong>
                <small>{override.priority} · {override.pauseGame ? 'pause' : 'overlay'} · {new Date(override.updatedAt).toLocaleString()}</small>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel className="studio-io-panel" title="Import / Export JSON">
        <div className="studio-toolbar">
          <select value={exportMode} onChange={(event) => setExportMode(event.target.value as 'selected' | 'custom' | 'overrides')}>
            <option value="selected">Selected conversation</option>
            <option value="custom">All custom conversations</option>
            <option value="overrides">Trigger overrides</option>
          </select>
          <button className="primary-action" type="button" onClick={copyExportToClipboard}>Copy Export</button>
          <button className="primary-action secondary" type="button" onClick={sendToDirector}>Send to Director</button>
          <button className="primary-action secondary" type="button" onClick={() => copySrt('en')}>Copy SRT EN</button>
          <button className="primary-action secondary" type="button" onClick={() => copySrt('fr')}>Copy SRT FR</button>
        </div>
        <textarea value={exportPayload} readOnly rows={9} />
        <textarea
          value={importBuffer}
          onChange={(event) => setImportBuffer(event.target.value)}
          rows={6}
          placeholder="Paste a conversation JSON object or array here..."
        />
        <button className="primary-action" type="button" onClick={importConversations}>Import Conversation JSON</button>
      </Panel>
    </section>
  );
}
