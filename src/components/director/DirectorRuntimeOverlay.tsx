import '../../styles/director.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import contactsJson from '../../data/contacts.json';
import type { ContactDefinition } from '../../types/codec.types';
import type {
  DirectorContext,
  DirectorLaunchRequest,
  DirectorNode,
  DirectorRuntimeState,
  DirectorSequenceDefinition
} from '../../types/director.types';
import type { UserSettings } from '../../types/theme.types';
import {
  advanceDirectorRuntime,
  chooseDirectorOption,
  createDirectorRuntime,
  evaluateDirectorConditions,
  getDirectorNode,
  makeDirectorRuntimeEvent
} from '../../systems/directorEngine';
import {
  getDirectorSequence,
  getDirectorSequenceLibrary,
  recordDirectorOutcome,
  recordDirectorRuntimeEvent
} from '../../systems/directorStorage';
import { resolveLocalizedText } from '../../systems/localizationEngine';
import {
  getAudioProfileForEra,
  playNarrativeAudioSource,
  playNarrativeVoiceCue,
  startNarrativeNoise,
  stopNarrativeNoise
} from '../../systems/narrativeAudioEngine';
import { getSpeakerLabel } from '../../systems/conversationEngine';
import { loadVoicePackState, resolvePortraitAsset, resolveVoiceAsset } from '../../systems/voicePackStorage';
import { AnimatedCodecPortrait } from '../common/AnimatedCodecPortrait';
import { StatusBadge } from '../common/StatusBadge';

const contacts = contactsJson as ContactDefinition[];

interface DirectorFrame {
  sequence: DirectorSequenceDefinition;
  state: DirectorRuntimeState;
  context: DirectorContext;
  sourceLabel?: string;
}

interface DirectorRuntimeOverlayProps {
  request: DirectorLaunchRequest;
  settings: UserSettings;
  onClose: () => void;
  onComplete?: (state: DirectorRuntimeState) => void;
}

function playerSpeaker(speaker: string): boolean {
  return ['snake', 'solid_snake', 'raiden', 'naked_snake', 'venom_snake', 'player'].includes(speaker.toLowerCase());
}

function findContact(node: DirectorNode | undefined, sequence: DirectorSequenceDefinition): ContactDefinition | undefined {
  if (!node || node.kind !== 'line') return undefined;
  return contacts.find((contact) => contact.id === node.speakerId)
    ?? contacts.find((contact) => contact.era === sequence.era && node.speaker.toLowerCase().includes(contact.name.split(' ')[0].toLowerCase()));
}

export function DirectorRuntimeOverlay({ request, settings, onClose, onComplete }: DirectorRuntimeOverlayProps) {
  const library = useMemo(() => getDirectorSequenceLibrary(), []);
  const initialSequence = getDirectorSequence(request.sequenceId) ?? library[0];
  const [frames, setFrames] = useState<DirectorFrame[]>(() => initialSequence ? [{
    sequence: initialSequence,
    state: createDirectorRuntime(initialSequence, request.inheritedVariables),
    context: request.context,
    sourceLabel: request.sourceLabel
  }] : []);
  const [runtimeMessage, setRuntimeMessage] = useState(initialSequence ? 'DIRECTOR SEQUENCE ONLINE' : 'SEQUENCE NOT FOUND');
  const [voicePackState] = useState(() => loadVoicePackState());

  const frame = frames[frames.length - 1];
  const node = frame ? getDirectorNode(frame.sequence, frame.state.currentNodeId) : undefined;
  const contact = findContact(node, frame?.sequence ?? initialSequence);
  const lineNode = node?.kind === 'line' ? node : undefined;
  const speakerIsPlayer = Boolean(lineNode && playerSpeaker(lineNode.speaker));
  const localizedText = lineNode ? resolveLocalizedText(lineNode.text, settings.locale) : '';
  const expression = lineNode?.portraitExpression ?? lineNode?.emotion ?? 'neutral';
  const portraitAsset = lineNode?.speakerId && settings.voicePackEnabled
    ? resolvePortraitAsset(lineNode.speakerId, expression, frame.sequence.era, voicePackState)
    : undefined;
  const voiceAsset = lineNode && settings.voicePackEnabled
    ? resolveVoiceAsset(frame.sequence.id, frame.sequence.nodes.indexOf(lineNode), frame.sequence.era, voicePackState)
    : undefined;

  const emitEvents = useCallback((events: Array<{ eventName: string; payload?: Record<string, string | number | boolean> }>, currentFrame: DirectorFrame, currentNodeId: string) => {
    for (const emitted of events) {
      recordDirectorRuntimeEvent(makeDirectorRuntimeEvent(
        emitted.eventName,
        currentFrame.sequence.id,
        currentNodeId,
        currentFrame.context,
        emitted.payload
      ));
    }
  }, []);

  const completeFrame = useCallback((completedFrame: DirectorFrame) => {
    const completedAt = completedFrame.state.completedAt ?? new Date().toISOString();
    recordDirectorOutcome({
      id: `${completedFrame.sequence.id}:${completedAt}`,
      sequenceId: completedFrame.sequence.id,
      context: completedFrame.context,
      outcomeId: completedFrame.state.outcomeId,
      choiceHistory: completedFrame.state.choiceHistory,
      variables: completedFrame.state.variables,
      startedAt: completedFrame.state.startedAt,
      completedAt
    });

    setFrames((current) => {
      if (current.length <= 1) {
        onComplete?.(completedFrame.state);
        return current;
      }
      const parent = current[current.length - 2];
      const resumedParent: DirectorFrame = {
        ...parent,
        state: {
          ...parent.state,
          status: 'running',
          variables: { ...parent.state.variables, ...completedFrame.state.variables }
        }
      };
      setRuntimeMessage(`RESUMING: ${resumedParent.sequence.title.toUpperCase()}`);
      return [...current.slice(0, -2), resumedParent];
    });
  }, [onComplete]);

  const applyAdvance = useCallback((mode: 'advance' | 'choice', optionId?: string) => {
    setFrames((current) => {
      if (!current.length) return current;
      const active = current[current.length - 1];
      const activeNode = getDirectorNode(active.sequence, active.state.currentNodeId);
      if (!activeNode) return current;
      const result = mode === 'choice' && optionId
        ? chooseDirectorOption(active.state, active.sequence, optionId)
        : advanceDirectorRuntime(active.state, active.sequence);
      emitEvents(result.emittedEvents, active, activeNode.id);
      const updated: DirectorFrame = { ...active, state: result.state };

      if (result.interruptSequenceId) {
        const interruptSequence = library.find((sequence) => sequence.id === result.interruptSequenceId);
        if (!interruptSequence) {
          setRuntimeMessage(`INTERRUPTION FAILED: ${result.interruptSequenceId}`);
          return [...current.slice(0, -1), { ...updated, state: { ...updated.state, status: 'running' } }];
        }
        setRuntimeMessage(`PRIORITY INTERRUPTION: ${interruptSequence.title.toUpperCase()}`);
        const child: DirectorFrame = {
          sequence: interruptSequence,
          state: createDirectorRuntime(interruptSequence, result.state.variables),
          context: active.context,
          sourceLabel: active.sequence.title
        };
        return result.interruptResumeMode === 'replace'
          ? [...current.slice(0, -1), child]
          : [...current.slice(0, -1), updated, child];
      }

      if (result.state.status === 'complete' || result.state.status === 'aborted') {
        window.setTimeout(() => completeFrame(updated), 0);
      }
      return [...current.slice(0, -1), updated];
    });
  }, [completeFrame, emitEvents, library]);

  useEffect(() => {
    if (!lineNode || !frame || !settings.narrativeAudioEnabled) {
      stopNarrativeNoise();
      return;
    }
    const profile = getAudioProfileForEra(frame.sequence.era);
    startNarrativeNoise(profile, settings.radioNoiseVolume * settings.narrativeAudioVolume);
    playNarrativeVoiceCue(profile, lineNode.emotion ?? 'neutral', settings.narrativeAudioVolume);
    let audio: HTMLAudioElement | null = null;
    void playNarrativeAudioSource(voiceAsset?.source ?? lineNode.audioSource, settings.narrativeAudioVolume).then((value) => { audio = value; });
    return () => {
      stopNarrativeNoise();
      audio?.pause();
    };
  }, [frame, lineNode, settings.narrativeAudioEnabled, settings.narrativeAudioVolume, settings.radioNoiseVolume, voiceAsset?.source]);

  useEffect(() => {
    if (!frame || !node) return;
    if (node.kind === 'event' || node.kind === 'jump' || node.kind === 'interrupt') {
      const timer = window.setTimeout(() => applyAdvance('advance'), node.kind === 'interrupt' ? 500 : 120);
      return () => window.clearTimeout(timer);
    }
    if (node.kind === 'delay') {
      const timer = window.setTimeout(() => applyAdvance('advance'), Math.max(0, node.durationMs));
      return () => window.clearTimeout(timer);
    }
  }, [applyAdvance, frame, node]);

  useEffect(() => {
    if (!settings.autoAdvance || !lineNode) return;
    const timer = window.setTimeout(() => applyAdvance('advance'), Math.max(600, lineNode.durationMs ?? 2500));
    return () => window.clearTimeout(timer);
  }, [applyAdvance, lineNode, settings.autoAdvance]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Enter' && node?.kind !== 'choice') applyAdvance('advance');
      if (node?.kind === 'choice') {
        const index = Number(event.key) - 1;
        const option = node.options[index];
        if (option && evaluateDirectorConditions(option.conditions, frame.state.variables)) applyAdvance('choice', option.id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [applyAdvance, frame?.state.variables, node, onClose]);

  useEffect(() => () => stopNarrativeNoise(), []);

  if (!frame || !node) {
    return (
      <div className="director-overlay" role="dialog" aria-modal="true">
        <div className="director-runtime-shell"><strong>DIRECTOR SEQUENCE OFFLINE</strong><button type="button" onClick={onClose}>CLOSE</button></div>
      </div>
    );
  }

  const rightName = contact?.name ?? (lineNode && !speakerIsPlayer ? getSpeakerLabel(lineNode.speaker) : 'DIRECTOR NETWORK');
  const rightInitials = rightName.split(' ').map((part) => part[0]).join('').slice(0, 3).toUpperCase();
  const leftName = frame.sequence.era === 'mgs2' ? 'RAIDEN' : frame.sequence.era === 'mgs3' ? 'NAKED SNAKE' : frame.sequence.era === 'mgsv' ? 'VENOM SNAKE' : 'SOLID SNAKE';

  return (
    <div className={`director-overlay director-era-${frame.sequence.era}`} role="dialog" aria-modal="true" aria-label="Codec Director runtime">
      <div className="director-runtime-shell">
        <header className="director-runtime-header">
          <div>
            <span>CODEC DIRECTOR // {frame.context.toUpperCase()}</span>
            <h2>{frame.sequence.title}</h2>
            <p>{runtimeMessage}</p>
          </div>
          <div className="director-header-actions">
            <StatusBadge label={`STACK ${frames.length}`} tone={frames.length > 1 ? 'danger' : 'success'} />
            <StatusBadge label={node.kind.toUpperCase()} tone={node.kind === 'choice' ? 'warning' : node.kind === 'end' ? 'success' : 'neutral'} />
            <button type="button" onClick={onClose}>ABORT / CLOSE</button>
          </div>
        </header>

        <div className="director-runtime-grid">
          <aside className="director-timeline-rail">
            <strong>RUNTIME TIMELINE</strong>
            {frame.sequence.nodes.map((item, index) => (
              <div key={item.id} className={`${item.id === node.id ? 'active' : ''} ${frame.state.history.some((entry) => entry.nodeId === item.id) ? 'visited' : ''}`}>
                <span>{String(index + 1).padStart(2, '0')}</span><b>{item.kind}</b><small>{item.label ?? item.id}</small>
              </div>
            ))}
          </aside>

          <main className="director-stage">
            {(node.kind === 'line' || node.kind === 'choice' || node.kind === 'end' || node.kind === 'delay') && (
              <div className={`director-codec-frame director-camera-${lineNode?.cameraCue ?? 'static'}`}>
                <AnimatedCodecPortrait
                  side="left"
                  label="PLAYER"
                  initials={leftName.split(' ').map((part) => part[0]).join('').slice(0, 3)}
                  name={leftName}
                  expression={speakerIsPlayer ? expression : 'neutral'}
                  emotion={lineNode?.emotion}
                  speaking={speakerIsPlayer}
                  enabled={settings.portraitAnimationEnabled}
                />

                <div className="director-dialogue-core">
                  <span className="director-node-id">{frame.sequence.id} // {node.id}</span>
                  {node.kind === 'line' && (
                    <>
                      <strong>{getSpeakerLabel(node.speaker, contact)}</strong>
                      <blockquote>{localizedText}</blockquote>
                      <small>{node.emotion ?? 'neutral'} · {node.durationMs ?? 2500}ms · CAMERA {node.cameraCue ?? 'static'}</small>
                      <button type="button" className="primary-action" onClick={() => applyAdvance('advance')}>CONTINUE</button>
                    </>
                  )}
                  {node.kind === 'choice' && (
                    <>
                      <strong>DECISION REQUIRED</strong>
                      <blockquote>{resolveLocalizedText(node.prompt, settings.locale)}</blockquote>
                      <div className="director-choice-list">
                        {node.options.map((option, index) => {
                          const available = evaluateDirectorConditions(option.conditions, frame.state.variables);
                          return (
                            <button key={option.id} type="button" disabled={!available} onClick={() => applyAdvance('choice', option.id)}>
                              <span>{index + 1}</span>
                              <div><strong>{resolveLocalizedText(option.label, settings.locale)}</strong>{option.description && <small>{resolveLocalizedText(option.description, settings.locale)}</small>}</div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                  {node.kind === 'delay' && (
                    <><strong>TRANSMISSION BUFFER</strong><blockquote>{resolveLocalizedText(node.message, settings.locale) || 'Signal processing…'}</blockquote><small>{node.durationMs}ms</small></>
                  )}
                  {node.kind === 'end' && (
                    <>
                      <strong>{resolveLocalizedText(node.title, settings.locale) || 'SEQUENCE COMPLETE'}</strong>
                      <blockquote>{resolveLocalizedText(node.summary, settings.locale) || node.outcomeId || 'Director runtime completed.'}</blockquote>
                      <button type="button" className="primary-action" onClick={() => applyAdvance('advance')}>{frames.length > 1 ? 'RETURN TO INTERRUPTED SEQUENCE' : 'ARCHIVE OUTCOME'}</button>
                    </>
                  )}
                </div>

                <AnimatedCodecPortrait
                  side="right"
                  label="CONTACT"
                  initials={rightInitials || 'DIR'}
                  name={rightName}
                  expression={!speakerIsPlayer ? expression : 'neutral'}
                  emotion={lineNode?.emotion}
                  speaking={Boolean(lineNode && !speakerIsPlayer)}
                  image={portraitAsset}
                  enabled={settings.portraitAnimationEnabled}
                />
              </div>
            )}
          </main>

          <aside className="director-state-rail">
            <strong>VARIABLE WATCH</strong>
            {Object.keys(frame.state.variables).length ? Object.entries(frame.state.variables).map(([key, value]) => <div key={key}><span>{key}</span><b>{String(value)}</b></div>) : <p>No runtime variables.</p>}
            <strong>CHOICE HISTORY</strong>
            {Object.keys(frame.state.choiceHistory).length ? Object.entries(frame.state.choiceHistory).map(([key, value]) => <div key={key}><span>{key}</span><b>{value}</b></div>) : <p>No choice committed.</p>}
            <strong>INTERRUPTION STACK</strong>
            {frames.map((entry, index) => <div key={`${entry.sequence.id}-${index}`}><span>{index + 1}</span><b>{entry.sequence.title}</b></div>)}
          </aside>
        </div>
      </div>
    </div>
  );
}
