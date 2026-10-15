import '../../styles/director.css';
import { useMemo, useState } from 'react';
import erasJson from '../../data/eras.json';
import type { EraDefinition, EraId } from '../../types/codec.types';
import type {
  DirectorChoiceNode,
  DirectorContext,
  DirectorDelayNode,
  DirectorEndNode,
  DirectorEventNode,
  DirectorInterruptNode,
  DirectorJumpNode,
  DirectorLineNode,
  DirectorNode,
  DirectorNodeKind,
  DirectorSequenceDefinition,
  DirectorValue
} from '../../types/director.types';
import {
  cloneDirectorSequence,
  createBlankDirectorSequence,
  getDirectorSequenceLibrary,
  loadCustomDirectorSequences,
  loadDirectorEventLog,
  loadDirectorOutcomes,
  sanitizeDirectorSequence,
  saveCustomDirectorSequences
} from '../../systems/directorStorage';
import { requestDirectorSequence } from '../../systems/directorBus';
import { validateDirectorSequence } from '../../systems/directorEngine';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

const eras = erasJson as EraDefinition[];
const nodeKinds: DirectorNodeKind[] = ['line', 'choice', 'interrupt', 'event', 'delay', 'jump', 'end'];
const contexts: DirectorContext[] = ['standalone', 'codec', 'campaign', 'sideops', 'vr'];

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function makeNode(kind: DirectorNodeKind, sequence: DirectorSequenceDefinition): DirectorNode {
  const id = `${kind}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`;
  const common = { id, kind, label: `${kind} node` };
  if (kind === 'line') return { ...common, kind, speaker: 'snake', text: { en: 'New Director line.', fr: 'Nouvelle ligne Director.' }, emotion: 'neutral', durationMs: 2500 };
  if (kind === 'choice') return { ...common, kind, prompt: { en: 'Select an option.', fr: 'Sélectionne une option.' }, options: [{ id: 'option_1', label: { en: 'Option 1', fr: 'Option 1' }, nextId: sequence.nodes[0]?.id ?? '' }] };
  if (kind === 'interrupt') return { ...common, kind, sequenceId: getDirectorSequenceLibrary().find((item) => item.id !== sequence.id)?.id ?? '', resumeMode: 'resume' };
  if (kind === 'event') return { ...common, kind, eventName: 'director:custom-event', payload: {} };
  if (kind === 'delay') return { ...common, kind, durationMs: 1000, message: { en: 'Signal processing…', fr: 'Traitement du signal…' } };
  if (kind === 'jump') return { ...common, kind, targetId: sequence.entryNodeId };
  return { ...common, kind: 'end', outcomeId: 'custom_outcome', title: { en: 'Sequence complete', fr: 'Séquence terminée' } };
}

function replaceNode(sequence: DirectorSequenceDefinition, nodeId: string, updater: (node: DirectorNode) => DirectorNode): DirectorSequenceDefinition {
  return { ...sequence, nodes: sequence.nodes.map((node) => node.id === nodeId ? updater(node) : node), updatedAt: new Date().toISOString() };
}

export function CodecDirector() {
  const [customSequences, setCustomSequences] = useState(() => loadCustomDirectorSequences());
  const library = useMemo(() => getDirectorSequenceLibrary(), [customSequences]);
  const [selectedId, setSelectedId] = useState(() => library[0]?.id ?? '');
  const selected = library.find((sequence) => sequence.id === selectedId) ?? library[0];
  const [draft, setDraft] = useState<DirectorSequenceDefinition>(() => deepClone(selected ?? createBlankDirectorSequence()));
  const [selectedNodeId, setSelectedNodeId] = useState(() => draft.entryNodeId);
  const [message, setMessage] = useState('DIRECTOR WORKSTATION ONLINE');
  const [importBuffer, setImportBuffer] = useState('');
  const [newNodeKind, setNewNodeKind] = useState<DirectorNodeKind>('line');
  const [variablesBuffer, setVariablesBuffer] = useState(() => JSON.stringify(draft.initialVariables ?? {}, null, 2));
  const [eventLog, setEventLog] = useState(() => loadDirectorEventLog());
  const [outcomes, setOutcomes] = useState(() => loadDirectorOutcomes());

  const activeNode = draft.nodes.find((node) => node.id === selectedNodeId) ?? draft.nodes[0];
  const issues = useMemo(() => validateDirectorSequence(draft, library), [draft, library]);
  const errorCount = issues.filter((issue) => issue.level === 'error').length;

  function selectSequence(id: string) {
    const sequence = library.find((entry) => entry.id === id);
    if (!sequence) return;
    setSelectedId(id);
    setDraft(deepClone(sequence));
    setSelectedNodeId(sequence.entryNodeId);
    setVariablesBuffer(JSON.stringify(sequence.initialVariables ?? {}, null, 2));
    setMessage(sequence.source === 'custom' ? 'CUSTOM SEQUENCE LOADED' : 'BUILT-IN SEQUENCE LOADED');
  }

  function persist(next: DirectorSequenceDefinition[], label: string) {
    setCustomSequences(next);
    saveCustomDirectorSequences(next);
    setMessage(label);
  }

  function createSequence() {
    const next = createBlankDirectorSequence(draft.era);
    setDraft(next);
    setSelectedId(next.id);
    setSelectedNodeId(next.entryNodeId);
    setVariablesBuffer('{}');
    setMessage('NEW DIRECTOR DRAFT READY');
  }

  function duplicateSequence() {
    const next = cloneDirectorSequence(draft);
    persist([next, ...customSequences], 'SEQUENCE DUPLICATED');
    setDraft(next);
    setSelectedId(next.id);
    setSelectedNodeId(next.entryNodeId);
    setVariablesBuffer(JSON.stringify(next.initialVariables ?? {}, null, 2));
  }

  function saveSequence() {
    if (errorCount > 0) {
      setMessage(`SAVE BLOCKED: ${errorCount} VALIDATION ERROR(S)`);
      return;
    }
    let variables: Record<string, DirectorValue> = draft.initialVariables ?? {};
    try {
      const parsed = JSON.parse(variablesBuffer) as Record<string, unknown>;
      variables = Object.fromEntries(Object.entries(parsed).filter((entry): entry is [string, DirectorValue] => ['string', 'number', 'boolean'].includes(typeof entry[1])));
    } catch {
      setMessage('SAVE BLOCKED: INITIAL VARIABLES JSON INVALID');
      return;
    }
    const normalized: DirectorSequenceDefinition = {
      ...draft,
      schemaVersion: 1,
      source: 'custom',
      initialVariables: variables,
      updatedAt: new Date().toISOString()
    };
    const next = [normalized, ...customSequences.filter((sequence) => sequence.id !== normalized.id)];
    persist(next, 'DIRECTOR SEQUENCE SAVED');
    setDraft(normalized);
    setSelectedId(normalized.id);
  }

  function deleteSequence() {
    if (draft.source !== 'custom' && !customSequences.some((sequence) => sequence.id === draft.id)) {
      setMessage('BUILT-IN SEQUENCES CANNOT BE DELETED');
      return;
    }
    const next = customSequences.filter((sequence) => sequence.id !== draft.id);
    persist(next, 'CUSTOM SEQUENCE DELETED');
    const fallback = getDirectorSequenceLibrary()[0] ?? createBlankDirectorSequence();
    setDraft(deepClone(fallback));
    setSelectedId(fallback.id);
    setSelectedNodeId(fallback.entryNodeId);
  }

  function updateSequence<K extends keyof DirectorSequenceDefinition>(key: K, value: DirectorSequenceDefinition[K]) {
    setDraft((current) => ({ ...current, [key]: value, updatedAt: new Date().toISOString() }));
  }

  function updateNode(nodeId: string, updater: (node: DirectorNode) => DirectorNode) {
    setDraft((current) => replaceNode(current, nodeId, updater));
  }

  function addNode() {
    const node = makeNode(newNodeKind, draft);
    setDraft((current) => {
      const previous = current.nodes[current.nodes.length - 1];
      const nodes = current.nodes.map((entry) => entry.id === previous?.id && entry.kind !== 'end' && !entry.nextId ? { ...entry, nextId: node.id } as DirectorNode : entry);
      return { ...current, nodes: [...nodes, node], updatedAt: new Date().toISOString() };
    });
    setSelectedNodeId(node.id);
    setMessage(`${newNodeKind.toUpperCase()} NODE ADDED`);
  }

  function removeNode(nodeId: string) {
    if (draft.nodes.length <= 1) return;
    const remaining = draft.nodes.filter((node) => node.id !== nodeId);
    setDraft((current) => ({
      ...current,
      entryNodeId: current.entryNodeId === nodeId ? remaining[0].id : current.entryNodeId,
      nodes: remaining.map((node) => ({ ...node, nextId: node.nextId === nodeId ? undefined : node.nextId })) as DirectorNode[],
      updatedAt: new Date().toISOString()
    }));
    setSelectedNodeId(remaining[0].id);
  }

  function moveNode(nodeId: string, direction: -1 | 1) {
    const index = draft.nodes.findIndex((node) => node.id === nodeId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= draft.nodes.length) return;
    setDraft((current) => {
      const nodes = [...current.nodes];
      const [node] = nodes.splice(index, 1);
      nodes.splice(target, 0, node);
      return { ...current, nodes };
    });
  }

  function addChoiceOption(node: DirectorChoiceNode) {
    const id = `option_${node.options.length + 1}`;
    updateNode(node.id, () => ({ ...node, options: [...node.options, { id, label: { en: `Option ${node.options.length + 1}`, fr: `Option ${node.options.length + 1}` }, nextId: draft.entryNodeId }] }));
  }

  function importSequence() {
    try {
      const parsed = JSON.parse(importBuffer) as unknown;
      const sequence = sanitizeDirectorSequence(parsed);
      if (!sequence) throw new Error('No valid Director sequence found.');
      const nextId = library.some((entry) => entry.id === sequence.id) ? `${sequence.id}_import_${Date.now().toString(36)}` : sequence.id;
      const normalized = { ...sequence, id: nextId, source: 'custom' as const, updatedAt: new Date().toISOString() };
      persist([normalized, ...customSequences.filter((entry) => entry.id !== normalized.id)], 'DIRECTOR SEQUENCE IMPORTED');
      setDraft(normalized);
      setSelectedId(normalized.id);
      setSelectedNodeId(normalized.entryNodeId);
      setVariablesBuffer(JSON.stringify(normalized.initialVariables ?? {}, null, 2));
      setImportBuffer('');
    } catch (error) {
      setMessage(error instanceof Error ? `IMPORT FAILED: ${error.message}` : 'IMPORT FAILED');
    }
  }

  function playtest(context: DirectorContext = 'standalone') {
    if (errorCount) {
      setMessage('PLAYTEST BLOCKED BY VALIDATION ERRORS');
      return;
    }
    if (draft.source === 'custom' || customSequences.some((sequence) => sequence.id === draft.id)) saveSequence();
    window.setTimeout(() => requestDirectorSequence(draft.id, context, 'Codec Director Workstation'), 0);
  }

  function refreshLogs() {
    setEventLog(loadDirectorEventLog());
    setOutcomes(loadDirectorOutcomes());
    setMessage('DIRECTOR LOGS REFRESHED');
  }

  return (
    <section className="director-page">
      <Panel className="director-library-panel">
        <div className="director-title-block">
          <StatusBadge label={message} tone={message.includes('FAILED') || message.includes('BLOCKED') ? 'danger' : 'success'} />
          <h2>Codec Director Mode</h2>
          <p>Build reusable branching transmissions with dialogue, choices, interruptions, timed nodes and cross-module events.</p>
        </div>
        <div className="director-library-toolbar">
          <button type="button" className="primary-action" onClick={createSequence}>NEW</button>
          <button type="button" onClick={duplicateSequence}>DUPLICATE</button>
          <button type="button" onClick={saveSequence}>SAVE</button>
          <button type="button" onClick={deleteSequence}>DELETE</button>
        </div>
        <div className="director-sequence-list">
          {library.map((sequence) => (
            <button type="button" key={sequence.id} className={sequence.id === selectedId ? 'active' : ''} onClick={() => selectSequence(sequence.id)}>
              <span>{sequence.source === 'custom' ? 'CUSTOM' : 'BUILT-IN'} // {sequence.era.toUpperCase()}</span>
              <strong>{sequence.title}</strong>
              <small>{sequence.nodes.length} nodes · {sequence.contexts.join(', ')}</small>
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="director-editor-panel">
        <div className="director-meta-grid">
          <label><span>ID</span><input value={draft.id} onChange={(event) => updateSequence('id', event.target.value)} disabled={draft.source === 'built_in'} /></label>
          <label><span>Title</span><input value={draft.title} onChange={(event) => updateSequence('title', event.target.value)} /></label>
          <label><span>Era</span><select value={draft.era} onChange={(event) => updateSequence('era', event.target.value as EraId)}>{eras.map((era) => <option key={era.id} value={era.id}>{era.name}</option>)}</select></label>
          <label><span>Entry node</span><select value={draft.entryNodeId} onChange={(event) => updateSequence('entryNodeId', event.target.value)}>{draft.nodes.map((node) => <option key={node.id} value={node.id}>{node.id}</option>)}</select></label>
          <label className="director-description-field"><span>Description</span><textarea value={draft.description} onChange={(event) => updateSequence('description', event.target.value)} rows={2} /></label>
          <label><span>Tags</span><input value={draft.tags.join(', ')} onChange={(event) => updateSequence('tags', event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean))} /></label>
        </div>
        <div className="director-context-row">
          {contexts.map((context) => <label key={context}><input type="checkbox" checked={draft.contexts.includes(context)} onChange={(event) => updateSequence('contexts', event.target.checked ? [...draft.contexts, context] : draft.contexts.filter((entry) => entry !== context))} />{context}</label>)}
          <label><input type="checkbox" checked={Boolean(draft.published)} onChange={(event) => updateSequence('published', event.target.checked)} />published</label>
        </div>
        <label className="director-variables-editor"><span>Initial variables JSON</span><textarea value={variablesBuffer} onChange={(event) => setVariablesBuffer(event.target.value)} rows={5} /></label>

        <div className="director-workspace-grid">
          <div className="director-node-timeline">
            <div className="director-node-add"><select value={newNodeKind} onChange={(event) => setNewNodeKind(event.target.value as DirectorNodeKind)}>{nodeKinds.map((kind) => <option key={kind}>{kind}</option>)}</select><button type="button" onClick={addNode}>ADD NODE</button></div>
            {draft.nodes.map((node, index) => (
              <article key={node.id} className={`${node.id === selectedNodeId ? 'active' : ''} ${node.kind}`} onClick={() => setSelectedNodeId(node.id)}>
                <div><span>{String(index + 1).padStart(2, '0')}</span><b>{node.kind}</b></div>
                <strong>{node.label ?? node.id}</strong>
                <small>{node.id}{node.nextId ? ` → ${node.nextId}` : ''}</small>
                <div><button type="button" onClick={(event) => { event.stopPropagation(); moveNode(node.id, -1); }}>↑</button><button type="button" onClick={(event) => { event.stopPropagation(); moveNode(node.id, 1); }}>↓</button><button type="button" onClick={(event) => { event.stopPropagation(); removeNode(node.id); }}>×</button></div>
              </article>
            ))}
          </div>

          <div className="director-node-inspector">
            {activeNode ? (
              <>
                <div className="director-inspector-heading"><span>{activeNode.kind.toUpperCase()} NODE</span><strong>{activeNode.id}</strong></div>
                <label><span>Node ID</span><input value={activeNode.id} onChange={(event) => { const nextId = event.target.value; updateNode(activeNode.id, (node) => ({ ...node, id: nextId })); setSelectedNodeId(nextId); if (draft.entryNodeId === activeNode.id) updateSequence('entryNodeId', nextId); }} /></label>
                <label><span>Label</span><input value={activeNode.label ?? ''} onChange={(event) => updateNode(activeNode.id, (node) => ({ ...node, label: event.target.value }))} /></label>
                {'nextId' in activeNode && activeNode.kind !== 'jump' && activeNode.kind !== 'end' && activeNode.kind !== 'choice' && <label><span>Next node</span><select value={activeNode.nextId ?? ''} onChange={(event) => updateNode(activeNode.id, (node) => ({ ...node, nextId: event.target.value || undefined }))}><option value="">COMPLETE IF EMPTY</option>{draft.nodes.filter((node) => node.id !== activeNode.id).map((node) => <option key={node.id} value={node.id}>{node.id}</option>)}</select></label>}

                <label className="director-json-field"><span>Node conditions JSON</span><textarea key={`conditions-${activeNode.id}-${JSON.stringify(activeNode.conditions ?? [])}`} rows={4} defaultValue={JSON.stringify(activeNode.conditions ?? [], null, 2)} onBlur={(event) => { try { const parsed = JSON.parse(event.target.value) as DirectorNode['conditions']; if (!Array.isArray(parsed)) throw new Error('Conditions must be an array'); updateNode(activeNode.id, (node) => ({ ...node, conditions: parsed.length ? parsed : undefined })); setMessage('NODE CONDITIONS UPDATED'); } catch { setMessage('INVALID NODE CONDITIONS JSON'); } }} /></label>
                <label className="director-json-field"><span>Node effects JSON</span><textarea key={`effects-${activeNode.id}-${JSON.stringify(activeNode.effects ?? [])}`} rows={4} defaultValue={JSON.stringify(activeNode.effects ?? [], null, 2)} onBlur={(event) => { try { const parsed = JSON.parse(event.target.value) as DirectorNode['effects']; if (!Array.isArray(parsed)) throw new Error('Effects must be an array'); updateNode(activeNode.id, (node) => ({ ...node, effects: parsed.length ? parsed : undefined })); setMessage('NODE EFFECTS UPDATED'); } catch { setMessage('INVALID NODE EFFECTS JSON'); } }} /></label>

                {activeNode.kind === 'line' && (() => { const node = activeNode as DirectorLineNode; return <>
                  <label><span>Speaker</span><input value={node.speaker} onChange={(event) => updateNode(node.id, () => ({ ...node, speaker: event.target.value }))} /></label>
                  <label><span>Speaker/contact ID</span><input value={node.speakerId ?? ''} onChange={(event) => updateNode(node.id, () => ({ ...node, speakerId: event.target.value || undefined }))} /></label>
                  <label><span>Text EN</span><textarea rows={3} value={node.text.en} onChange={(event) => updateNode(node.id, () => ({ ...node, text: { ...node.text, en: event.target.value } }))} /></label>
                  <label><span>Texte FR</span><textarea rows={3} value={node.text.fr ?? ''} onChange={(event) => updateNode(node.id, () => ({ ...node, text: { ...node.text, fr: event.target.value || undefined } }))} /></label>
                  <label><span>Emotion</span><select value={node.emotion ?? 'neutral'} onChange={(event) => updateNode(node.id, () => ({ ...node, emotion: event.target.value as DirectorLineNode['emotion'] }))}>{['neutral', 'serious', 'warning', 'calm', 'glitch', 'humor'].map((emotion) => <option key={emotion}>{emotion}</option>)}</select></label>
                  <label><span>Portrait expression</span><input value={node.portraitExpression ?? ''} onChange={(event) => updateNode(node.id, () => ({ ...node, portraitExpression: event.target.value || undefined }))} /></label>
                  <label><span>Duration ms</span><input type="number" min="300" value={node.durationMs ?? 2500} onChange={(event) => updateNode(node.id, () => ({ ...node, durationMs: Number(event.target.value) }))} /></label>
                  <label><span>Audio source</span><input value={node.audioSource ?? ''} onChange={(event) => updateNode(node.id, () => ({ ...node, audioSource: event.target.value || undefined }))} /></label>
                  <label><span>Camera cue</span><select value={node.cameraCue ?? 'static'} onChange={(event) => updateNode(node.id, () => ({ ...node, cameraCue: event.target.value as DirectorLineNode['cameraCue'] }))}>{['static', 'push_in', 'pull_back', 'shake', 'focus_left', 'focus_right', 'glitch_cut'].map((cue) => <option key={cue}>{cue}</option>)}</select></label>
                </>; })()}

                {activeNode.kind === 'choice' && (() => { const node = activeNode as DirectorChoiceNode; return <>
                  <label><span>Prompt EN</span><textarea value={node.prompt.en} onChange={(event) => updateNode(node.id, () => ({ ...node, prompt: { ...node.prompt, en: event.target.value } }))} /></label>
                  <label><span>Prompt FR</span><textarea value={node.prompt.fr ?? ''} onChange={(event) => updateNode(node.id, () => ({ ...node, prompt: { ...node.prompt, fr: event.target.value || undefined } }))} /></label>
                  <div className="director-option-editor">{node.options.map((option, index) => <div className="director-option-card" key={option.id}>
                    <div className="director-option-main"><input value={option.id} onChange={(event) => updateNode(node.id, () => ({ ...node, options: node.options.map((entry, optionIndex) => optionIndex === index ? { ...entry, id: event.target.value } : entry) }))} /><input value={option.label.en} onChange={(event) => updateNode(node.id, () => ({ ...node, options: node.options.map((entry, optionIndex) => optionIndex === index ? { ...entry, label: { ...entry.label, en: event.target.value } } : entry) }))} /><select value={option.nextId} onChange={(event) => updateNode(node.id, () => ({ ...node, options: node.options.map((entry, optionIndex) => optionIndex === index ? { ...entry, nextId: event.target.value } : entry) }))}>{draft.nodes.filter((entry) => entry.id !== node.id).map((entry) => <option key={entry.id}>{entry.id}</option>)}</select><button type="button" onClick={() => updateNode(node.id, () => ({ ...node, options: node.options.filter((_, optionIndex) => optionIndex !== index) }))}>×</button></div>
                    <details><summary>OPTION CONDITIONS / EFFECTS</summary><label><span>Conditions JSON</span><textarea key={`option-conditions-${option.id}-${JSON.stringify(option.conditions ?? [])}`} rows={3} defaultValue={JSON.stringify(option.conditions ?? [], null, 2)} onBlur={(event) => { try { const parsed = JSON.parse(event.target.value) as typeof option.conditions; if (!Array.isArray(parsed)) throw new Error('Conditions must be an array'); updateNode(node.id, () => ({ ...node, options: node.options.map((entry, optionIndex) => optionIndex === index ? { ...entry, conditions: parsed.length ? parsed : undefined } : entry) })); setMessage('OPTION CONDITIONS UPDATED'); } catch { setMessage('INVALID OPTION CONDITIONS JSON'); } }} /></label><label><span>Effects JSON</span><textarea key={`option-effects-${option.id}-${JSON.stringify(option.effects ?? [])}`} rows={3} defaultValue={JSON.stringify(option.effects ?? [], null, 2)} onBlur={(event) => { try { const parsed = JSON.parse(event.target.value) as typeof option.effects; if (!Array.isArray(parsed)) throw new Error('Effects must be an array'); updateNode(node.id, () => ({ ...node, options: node.options.map((entry, optionIndex) => optionIndex === index ? { ...entry, effects: parsed.length ? parsed : undefined } : entry) })); setMessage('OPTION EFFECTS UPDATED'); } catch { setMessage('INVALID OPTION EFFECTS JSON'); } }} /></label></details>
                  </div>)}</div>
                  <button type="button" onClick={() => addChoiceOption(node)}>ADD OPTION</button>
                </>; })()}

                {activeNode.kind === 'interrupt' && (() => { const node = activeNode as DirectorInterruptNode; return <><label><span>Interrupt sequence</span><select value={node.sequenceId} onChange={(event) => updateNode(node.id, () => ({ ...node, sequenceId: event.target.value }))}>{library.filter((sequence) => sequence.id !== draft.id).map((sequence) => <option key={sequence.id} value={sequence.id}>{sequence.title}</option>)}</select></label><label><span>Resume mode</span><select value={node.resumeMode ?? 'resume'} onChange={(event) => updateNode(node.id, () => ({ ...node, resumeMode: event.target.value as 'resume' | 'replace' }))}><option value="resume">resume parent</option><option value="replace">replace parent</option></select></label></>; })()}
                {activeNode.kind === 'event' && (() => { const node = activeNode as DirectorEventNode; return <><label><span>Event name</span><input value={node.eventName} onChange={(event) => updateNode(node.id, () => ({ ...node, eventName: event.target.value }))} /></label><label><span>Payload JSON</span><textarea value={JSON.stringify(node.payload ?? {}, null, 2)} onChange={(event) => { try { const payload = JSON.parse(event.target.value) as Record<string, DirectorValue>; updateNode(node.id, () => ({ ...node, payload })); } catch { /* preserve last valid payload */ } }} /></label></>; })()}
                {activeNode.kind === 'delay' && (() => { const node = activeNode as DirectorDelayNode; return <><label><span>Duration ms</span><input type="number" value={node.durationMs} onChange={(event) => updateNode(node.id, () => ({ ...node, durationMs: Number(event.target.value) }))} /></label><label><span>Message EN</span><input value={node.message?.en ?? ''} onChange={(event) => updateNode(node.id, () => ({ ...node, message: { en: event.target.value, fr: node.message?.fr } }))} /></label></>; })()}
                {activeNode.kind === 'jump' && (() => { const node = activeNode as DirectorJumpNode; return <label><span>Jump target</span><select value={node.targetId} onChange={(event) => updateNode(node.id, () => ({ ...node, targetId: event.target.value }))}>{draft.nodes.filter((entry) => entry.id !== node.id).map((entry) => <option key={entry.id}>{entry.id}</option>)}</select></label>; })()}
                {activeNode.kind === 'end' && (() => { const node = activeNode as DirectorEndNode; return <><label><span>Outcome ID</span><input value={node.outcomeId ?? ''} onChange={(event) => updateNode(node.id, () => ({ ...node, outcomeId: event.target.value }))} /></label><label><span>Title EN</span><input value={node.title?.en ?? ''} onChange={(event) => updateNode(node.id, () => ({ ...node, title: { en: event.target.value, fr: node.title?.fr } }))} /></label></>; })()}
              </>
            ) : <p>No node selected.</p>}
          </div>
        </div>
      </Panel>

      <Panel className="director-validation-panel" title="Validation & Playtest">
        <div className="director-playtest-row"><button className="primary-action" type="button" onClick={() => playtest('standalone')}>PLAYTEST</button>{draft.contexts.map((context) => context !== 'standalone' && <button key={context} type="button" onClick={() => playtest(context)}>TEST {context.toUpperCase()}</button>)}</div>
        <div className="director-issue-list">{issues.length ? issues.map((issue, index) => <div key={`${issue.code}-${issue.nodeId}-${index}`} className={issue.level}><strong>{issue.level.toUpperCase()} // {issue.code}</strong><span>{issue.message}</span></div>) : <StatusBadge label="SEQUENCE VALID" tone="success" />}</div>
      </Panel>

      <Panel className="director-transfer-panel" title="Import / Export">
        <textarea readOnly value={JSON.stringify(draft, null, 2)} rows={10} />
        <button type="button" onClick={() => void navigator.clipboard?.writeText(JSON.stringify(draft, null, 2))}>COPY SEQUENCE JSON</button>
        <textarea value={importBuffer} onChange={(event) => setImportBuffer(event.target.value)} placeholder="Paste Director sequence JSON…" rows={8} />
        <button type="button" onClick={importSequence}>IMPORT SEQUENCE</button>
      </Panel>

      <Panel className="director-monitor-panel" title="Director Event Monitor">
        <button type="button" onClick={refreshLogs}>REFRESH LOGS</button>
        <div className="director-monitor-grid">
          <div><strong>EVENTS</strong>{eventLog.slice(0, 12).map((event) => <article key={event.id}><span>{event.context.toUpperCase()} // {event.eventName}</span><b>{event.sequenceId}</b><small>{new Date(event.timestamp).toLocaleString()}</small></article>)}</div>
          <div><strong>OUTCOMES</strong>{outcomes.slice(0, 12).map((outcome) => <article key={outcome.id}><span>{outcome.context.toUpperCase()} // {outcome.outcomeId ?? 'complete'}</span><b>{outcome.sequenceId}</b><small>{new Date(outcome.completedAt).toLocaleString()}</small></article>)}</div>
        </div>
      </Panel>
    </section>
  );
}
