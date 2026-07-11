import '../../styles/codec.css';
import '../../styles/codec-visual-layouts.css';
import '../../styles/codec-radio-intel.css';
import '../../styles/codec-assets.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import contactsJson from '../../data/contacts.json';
import conversationsJson from '../../data/conversations.json';
import contextsJson from '../../data/codecContexts.json';
import contactRulesJson from '../../data/codecContactRules.json';
import canonSourcesJson from '../../data/codecCanonSources.json';
import canonCoverageJson from '../../data/codecCanonCoverage.json';
import erasJson from '../../data/eras.json';
import themesJson from '../../data/themes.json';
import radioSignalsJson from '../../data/radioSignals.json';
import type {
  CallHistoryEntry,
  CodecCallPriority,
  CodecCallTopic,
  CodecCanonCoverageEntry,
  CodecCanonSourceDefinition,
  CodecContactAvailabilityResult,
  CodecContactRuleDefinition,
  CodecContextDefinition,
  CodecRuntimeContext,
  CodecState,
  ContactDefinition,
  ConversationDefinition,
  ConversationTrigger,
  EraDefinition,
  EraId,
  IncomingCallRequest,
  RadioSignalDefinition
} from '../../types/codec.types';
import type { ThemePackDefinition, UserSettings } from '../../types/theme.types';
import { getConversationForContact, getConversationTopics, getSpeakerLabel } from '../../systems/conversationEngine';
import { formatFrequency, getPreferredContactFrequency, normalizeFrequency, scanFrequency } from '../../systems/frequencyEngine';
import { loadJson, saveJson } from '../../systems/saveEngine';
import { loadCustomConversations, mergeStudioConversations } from '../../systems/studioStorage';
import { playBeep } from '../../systems/audioEngine';
import { getBuiltInPortrait, playCodecUiCue, startCodecAmbience, stopCodecAmbience } from '../../systems/codecAssetEngine';
import { getAudioProfileForEra, playNarrativeAudioSource, playNarrativeVoiceCue, startNarrativeNoise, stopNarrativeNoise } from '../../systems/narrativeAudioEngine';
import { resolveLocalizedText } from '../../systems/localizationEngine';
import { consumeCampaignLaunchDirective, recordCampaignCodecCall } from '../../systems/campaignStorage';
import { evaluateContactAvailability, sortContactsForSharedFrequency } from '../../systems/contactAvailabilityEngine';
import {
  CODEC_INCOMING_EVENT,
  consumeCodecIncomingInbox,
  queueCodecIncomingCall,
  removeIncomingCallFromInbox
} from '../../systems/codecCallBus';
import {
  createCodecSaveSnapshot,
  deleteCodecSaveSlot,
  getCodecSaveSlots,
  writeCodecSaveSlot,
  type CodecSaveSlotId,
  type CodecSaveSnapshot
} from '../../systems/codecSaveStorage';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';
import { SubtitleTrack } from '../common/SubtitleTrack';
import { AnimatedCodecPortrait } from '../common/AnimatedCodecPortrait';
import { loadVoicePackState, resolvePortraitAsset, resolveVoiceAsset } from '../../systems/voicePackStorage';
import { getDirectorSequenceLibrary } from '../../systems/directorStorage';
import { requestDirectorSequence } from '../../systems/directorBus';
import { IncomingCallOverlay } from './IncomingCallOverlay';
import { CodecSavePanel } from './CodecSavePanel';
import { CodecVisualStage } from './CodecVisualStage';
import { RadioScanPanel } from './RadioScanPanel';
import { Mgs1ContactDossier } from './Mgs1ContactDossier';
import { getMgs1ConversationCoverage, getMgs1Profile, getMgs1ScheduledIncomingForContext } from '../../systems/mgs1ContentEngine';
import { Mgs2ContactDossier } from './Mgs2ContactDossier';
import { getMgs2Coverage, getMgs2Profile, getMgs2ScheduledIncomingForContext } from '../../systems/mgs2ContentEngine';
import { Mgs3ContactDossier } from './Mgs3ContactDossier';
import { getMgs3Coverage, getMgs3Profile, getMgs3ScheduledIncomingForContext } from '../../systems/mgs3ContentEngine';
import { getCodecVisualIdentity } from '../../systems/codecVisualIdentity';
import { getCanonStatusLabel, getContactChannelDisplay, getContactChannelVariants, getContactSources } from '../../systems/codecCanonRegistry';
import type { CodecReplayRecord } from '../../types/codecReplay.types';
import { appendCodecReplay, clearCodecReplays, deleteCodecReplay, loadCodecReplayLibrary, saveCodecReplayLibrary, setReplayAutoArchive } from '../../systems/codecReplayStorage';
import { downloadCodecWebm, exportCodecJson, exportCodecPng, startDomWebmRecording, type DomWebmRecorder } from '../../systems/codecCaptureEngine';

const contacts = contactsJson as ContactDefinition[];
const builtInConversations = conversationsJson as ConversationDefinition[];
const contexts = contextsJson as CodecContextDefinition[];
const contactRules = contactRulesJson as CodecContactRuleDefinition[];
const canonSources = canonSourcesJson as CodecCanonSourceDefinition[];
const canonCoverage = canonCoverageJson as CodecCanonCoverageEntry[];
const eras = erasJson as EraDefinition[];
const themePacks = themesJson as ThemePackDefinition[];
const radioSignals = radioSignalsJson as RadioSignalDefinition[];

type SidePanel = 'memory' | 'history' | 'router' | 'save' | 'scan' | 'replay' | 'mgs1_dossier' | 'mgs2_dossier' | 'mgs3_dossier' | null;

interface StoredCodecContextState {
  contextId: string;
  playerId: string;
}

interface ActiveCall {
  contact: ContactDefinition;
  conversation: ConversationDefinition;
  source: ConversationTrigger;
  subjectId?: string;
  priority?: CodecCallPriority;
  incomingRequestId?: string;
}

interface CodecScreenProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

function getToneForState(state: CodecState, scanStatus: string): 'success' | 'warning' | 'danger' | 'neutral' {
  if (state === 'no_response' || state === 'signal_jammed') return 'danger';
  if (state === 'incoming_call' || scanStatus === 'weak' || scanStatus === 'patriots_corrupt') return 'warning';
  if (scanStatus === 'stable') return 'success';
  return 'neutral';
}

function getSignalStrength(status: string): number {
  if (status === 'stable') return 100;
  if (status === 'unknown') return 78;
  if (status === 'patriots_corrupt') return 66;
  if (status === 'weak') return 42;
  if (status === 'jammed') return 18;
  return 6;
}

function getFirstContextForEra(era: EraId): CodecContextDefinition {
  return contexts.find((context) => context.era === era) ?? contexts[0];
}

function getDispositionLabel(entry: CallHistoryEntry): string {
  const disposition = entry.disposition ?? (entry.completed ? 'completed' : 'aborted');
  return disposition.replace('_', ' ').toUpperCase();
}

export function CodecScreen({ settings, onSettingsChange }: CodecScreenProps) {
  const [campaignDirective] = useState(() => consumeCampaignLaunchDirective('codec'));
  const campaignContact = contacts.find((contact) => contact.id === campaignDirective?.targetId);
  const storedContext = loadJson<StoredCodecContextState | null>('codec-context-state', null);
  const initialEra = (campaignContact?.era ?? settings.selectedEra) as EraId;
  const campaignContext = campaignContact ? contexts.find((context) => context.era === campaignContact.era && context.unlockedContactIds.includes(campaignContact.id)) : undefined;
  const initialContext = campaignContext ?? contexts.find((context) => context.id === storedContext?.contextId && context.era === initialEra) ?? getFirstContextForEra(initialEra);

  const [selectedEra, setSelectedEra] = useState<EraId>(initialEra);
  const [selectedContextId, setSelectedContextId] = useState(initialContext.id);
  const [selectedPlayerId, setSelectedPlayerId] = useState(
    initialContext.players.some((player) => player.id === storedContext?.playerId) ? storedContext!.playerId : initialContext.defaultPlayerId
  );
  const currentEra = eras.find((era) => era.id === selectedEra) ?? eras[0];
  const eraContexts = useMemo(() => contexts.filter((context) => context.era === selectedEra), [selectedEra]);
  const currentContext = contexts.find((context) => context.id === selectedContextId && context.era === selectedEra) ?? eraContexts[0] ?? getFirstContextForEra(selectedEra);
  const selectedPlayer = currentContext.players.find((player) => player.id === selectedPlayerId) ?? currentContext.players[0];
  const runtimeContext: CodecRuntimeContext = useMemo(() => ({
    contextId: currentContext.id,
    era: currentContext.era,
    chapterId: currentContext.chapterId,
    missionId: currentContext.missionId,
    playerId: selectedPlayer?.id ?? currentContext.defaultPlayerId,
    flags: currentContext.flags
  }), [currentContext, selectedPlayer]);

  const currentTheme = themePacks.find((theme) => theme.id === settings.selectedTheme)
    ?? themePacks.find((theme) => theme.id === currentEra.visualStyle)
    ?? themePacks[0];
  const [frequency, setFrequency] = useState<number>(() => campaignContact?.frequency ?? loadJson('last-frequency', currentEra.defaultFrequency));
  const [codecState, setCodecState] = useState<CodecState>('idle');
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [sidePanel, setSidePanel] = useState<SidePanel>(null);
  const [message, setMessage] = useState(campaignContact ? `CAMPAIGN TARGET: ${campaignContact.name.toUpperCase()}` : 'SYSTEM READY');
  const [memoryContactIds, setMemoryContactIds] = useState<string[]>(() =>
    loadJson(
      'codec-memory',
      contacts.filter((contact) => contact.unlockedByDefault).map((contact) => contact.id)
    )
  );
  const [callHistory, setCallHistory] = useState<CallHistoryEntry[]>(() => loadJson('call-history', []));
  const [mgs1ScheduledCallIds, setMgs1ScheduledCallIds] = useState<string[]>(() => loadJson('mgs1-scheduled-call-ids', []));
  const [mgs2ScheduledCallIds, setMgs2ScheduledCallIds] = useState<string[]>(() => loadJson('mgs2-scheduled-call-ids', []));
  const [mgs3ScheduledCallIds, setMgs3ScheduledCallIds] = useState<string[]>(() => loadJson('mgs3-scheduled-call-ids', []));
  const [customConversations] = useState(() => loadCustomConversations());
  const [voicePackState, setVoicePackState] = useState(() => loadVoicePackState());
  const [preferredContactId, setPreferredContactId] = useState<string | null>(campaignContact?.id ?? null);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [pendingIncoming, setPendingIncoming] = useState<IncomingCallRequest | null>(null);
  const [incomingQueue, setIncomingQueue] = useState<IncomingCallRequest[]>([]);
  const [incomingSecondsRemaining, setIncomingSecondsRemaining] = useState(0);
  const [saveSlots, setSaveSlots] = useState(() => getCodecSaveSlots());
  const directorSequences = useMemo(() => getDirectorSequenceLibrary().filter((sequence) => sequence.contexts.includes('codec')), []);
  const [selectedDirectorSequenceId, setSelectedDirectorSequenceId] = useState(() => directorSequences[0]?.id ?? '');
  const [replayLibrary, setReplayLibrary] = useState(() => loadCodecReplayLibrary());
  const [streamOverlay, setStreamOverlay] = useState(() => new URLSearchParams(window.location.search).get('overlay') === '1' || loadJson('codec-stream-overlay', false));
  const [captureMessage, setCaptureMessage] = useState('');
  const [recording, setRecording] = useState(false);
  const codecCaptureRef = useRef<HTMLDivElement | null>(null);
  const callStartedAtRef = useRef<number | null>(null);
  const recorderRef = useRef<DomWebmRecorder | null>(null);
  const replayImportRef = useRef<HTMLInputElement | null>(null);

  const conversations = useMemo(
    () => mergeStudioConversations(builtInConversations, customConversations),
    [customConversations]
  );

  useEffect(() => saveJson('last-frequency', frequency), [frequency]);
  useEffect(() => saveJson('codec-memory', memoryContactIds), [memoryContactIds]);
  useEffect(() => saveJson('call-history', callHistory), [callHistory]);
  useEffect(() => saveJson('mgs1-scheduled-call-ids', mgs1ScheduledCallIds), [mgs1ScheduledCallIds]);
  useEffect(() => saveJson('mgs2-scheduled-call-ids', mgs2ScheduledCallIds), [mgs2ScheduledCallIds]);
  useEffect(() => saveJson('mgs3-scheduled-call-ids', mgs3ScheduledCallIds), [mgs3ScheduledCallIds]);
  useEffect(() => saveJson('codec-stream-overlay', streamOverlay), [streamOverlay]);
  useEffect(() => {
    document.body.classList.toggle('codec-overlay-body', streamOverlay);
    return () => document.body.classList.remove('codec-overlay-body');
  }, [streamOverlay]);
  useEffect(() => saveJson('codec-context-state', { contextId: currentContext.id, playerId: selectedPlayer?.id ?? currentContext.defaultPlayerId }), [currentContext, selectedPlayer]);

  useEffect(() => {
    if (!currentContext.players.some((player) => player.id === selectedPlayerId)) {
      setSelectedPlayerId(currentContext.defaultPlayerId);
    }
  }, [currentContext, selectedPlayerId]);

  useEffect(() => {
    if (selectedEra !== 'mgs1') return;
    const scheduled = getMgs1ScheduledIncomingForContext(currentContext.id, mgs1ScheduledCallIds);
    if (!scheduled.length) return;
    const timers = scheduled.map((entry) => window.setTimeout(() => {
      queueCodecIncomingCall(entry.contactId, {
        conversationId: entry.conversationId,
        priority: entry.priority,
        required: entry.required,
        expiresInMs: entry.required ? 15_000 : 22_000,
        sourceLabel: entry.sourceLabel
      });
      if (entry.once) setMgs1ScheduledCallIds((ids) => ids.includes(entry.id) ? ids : [...ids, entry.id]);
    }, entry.delayMs));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [selectedEra, currentContext.id]);

  useEffect(() => {
    if (selectedEra !== 'mgs3') return;
    const scheduled = getMgs3ScheduledIncomingForContext(currentContext.id, mgs3ScheduledCallIds);
    if (!scheduled.length) return;
    const timers = scheduled.map((entry) => window.setTimeout(() => {
      queueCodecIncomingCall(entry.contactId, {conversationId:entry.conversationId,priority:entry.priority,required:entry.required,expiresInMs:entry.required?15_000:22_000,sourceLabel:entry.sourceLabel});
      if(entry.once)setMgs3ScheduledCallIds(ids=>ids.includes(entry.id)?ids:[...ids,entry.id]);
    },entry.delayMs));
    return()=>timers.forEach(timer=>window.clearTimeout(timer));
  },[selectedEra,currentContext.id]);

  useEffect(() => {
    if (selectedEra !== 'mgs2') return;
    const scheduled = getMgs2ScheduledIncomingForContext(currentContext.id, mgs2ScheduledCallIds);
    if (!scheduled.length) return;
    const timers = scheduled.map((entry) => window.setTimeout(() => {
      queueCodecIncomingCall(entry.contactId, {
        conversationId: entry.conversationId,
        priority: entry.priority,
        required: entry.required,
        expiresInMs: entry.required ? 15_000 : 22_000,
        sourceLabel: entry.sourceLabel
      });
      if (entry.once) setMgs2ScheduledCallIds((ids) => ids.includes(entry.id) ? ids : [...ids, entry.id]);
    }, entry.delayMs));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [selectedEra, currentContext.id]);

  useEffect(() => {
    const refresh = () => setVoicePackState(loadVoicePackState());
    window.addEventListener('shadow-codec:voice-packs-changed', refresh);
    return () => window.removeEventListener('shadow-codec:voice-packs-changed', refresh);
  }, []);

  useEffect(() => {
    const queued = consumeCodecIncomingInbox();
    if (queued.length > 0) {
      setPendingIncoming(queued[0]);
      setIncomingQueue(queued.slice(1));
    }
    const listener = (event: Event) => {
      const request = (event as CustomEvent<IncomingCallRequest>).detail;
      if (!request) return;
      removeIncomingCallFromInbox(request.id);
      if (!activeCall && !pendingIncoming) setPendingIncoming(request);
      else setIncomingQueue((queue) => [...queue, request].slice(-10));
    };
    window.addEventListener(CODEC_INCOMING_EVENT, listener);
    return () => window.removeEventListener(CODEC_INCOMING_EVENT, listener);
  }, [activeCall, pendingIncoming]);

  useEffect(() => {
    if (!pendingIncoming) return;
    setCodecState('incoming_call');
    const updateRemaining = () => {
      const remaining = Math.max(0, Math.ceil((new Date(pendingIncoming.expiresAt).getTime() - Date.now()) / 1000));
      setIncomingSecondsRemaining(remaining);
      if (remaining <= 0) {
        if (pendingIncoming.required) acceptIncomingCall();
        else missIncomingCall();
      }
    };
    if (settings.eraUiAudioEnabled) playCodecUiCue(selectedEra, 'incoming', settings.uiBeepVolume);
    updateRemaining();
    const timer = window.setInterval(updateRemaining, 250);
    const ringTimer = window.setInterval(() => { if (settings.eraUiAudioEnabled) playCodecUiCue(selectedEra, 'incoming', settings.uiBeepVolume); }, 1800);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(ringTimer);
    };
  }, [pendingIncoming?.id]);

  const eraContacts = useMemo(() => contacts.filter((contact) => contact.era === selectedEra), [selectedEra]);

  function availabilityFor(contact: ContactDefinition): CodecContactAvailabilityResult {
    return evaluateContactAvailability(contact, runtimeContext, contactRules, {
      memoryContactIds,
      contextUnlockedContactIds: currentContext.unlockedContactIds,
      contextBlockedContactIds: currentContext.blockedContactIds
    });
  }

  const memoryContacts = useMemo(
    () => eraContacts.filter((contact) => availabilityFor(contact).visibleInMemory),
    [eraContacts, memoryContactIds, currentContext, runtimeContext]
  );

  const scan = useMemo(() => scanFrequency(selectedEra, frequency, contacts), [selectedEra, frequency]);
  const exactCandidates = useMemo(
    () => sortContactsForSharedFrequency(scan.contacts ?? (scan.contact ? [scan.contact] : []), contactRules),
    [scan]
  );
  const preferredContact = preferredContactId ? exactCandidates.find((contact) => contact.id === preferredContactId) : undefined;
  const selectedContact = preferredContact ?? (exactCandidates.length === 1 ? exactCandidates[0] : undefined);
  const selectedAvailability = selectedContact ? availabilityFor(selectedContact) : undefined;
  const topics = useMemo(
    () => selectedContact ? getConversationTopics(selectedContact, conversations, currentContext.id) : [],
    [selectedContact, conversations, currentContext.id]
  );
  const selectedTopic = topics.find((topic) => topic.id === selectedSubjectId) ?? topics[0];

  useEffect(() => {
    if (!topics.some((topic) => topic.id === selectedSubjectId)) setSelectedSubjectId(topics[0]?.id ?? '');
  }, [selectedContact?.id, topics, selectedSubjectId]);

  useEffect(() => {
    if (preferredContactId && !exactCandidates.some((contact) => contact.id === preferredContactId)) {
      setPreferredContactId(null);
    }
  }, [frequency, selectedEra, exactCandidates, preferredContactId]);

  const currentLine = activeCall?.conversation.lines[lineIndex];
  const signalStrength = getSignalStrength(scan.status);
  const localizedLineText = resolveLocalizedText(currentLine?.localizedText ?? currentLine?.text, settings.locale);
  const portraitExpression = settings.portraitExpressions ? (currentLine?.portraitExpression ?? currentLine?.emotion ?? 'neutral') : 'neutral';
  const playerSpeakerIds = ['snake', 'solid_snake', 'raiden', 'naked_snake', 'venom_snake', 'old_snake', 'player'];
  const playerSpeaking = Boolean(currentLine && playerSpeakerIds.includes(currentLine.speaker));
  const contactSpeaking = Boolean(currentLine && !playerSpeaking);
  const resolvedVoiceAsset = activeCall && settings.voicePackEnabled
    ? resolveVoiceAsset(activeCall.conversation.id, lineIndex, activeCall.contact.era, voicePackState)
    : undefined;
  const contactPortraitImage = (activeCall && settings.voicePackEnabled
    ? resolvePortraitAsset(activeCall.contact.id, portraitExpression, activeCall.contact.era, voicePackState)
    : undefined) ?? (settings.builtInPortraitsEnabled ? getBuiltInPortrait(selectedEra, 'contact') : undefined);
  const playerPortraitImage = settings.builtInPortraitsEnabled ? getBuiltInPortrait(selectedEra, 'player') : undefined;
  const displayContact = activeCall?.contact ?? selectedContact ?? (!scan.ambiguous ? scan.contact : undefined);
  const displayContactSources = getContactSources(displayContact, canonSources);
  const currentCanonCoverage = canonCoverage.find((entry) => entry.era === selectedEra);
  const displayChannelVariants = displayContact ? getContactChannelVariants(displayContact, currentContext.id) : [];
  const mgs1Profile = selectedEra === 'mgs1' ? getMgs1Profile(displayContact?.id) : undefined;
  const mgs1Coverage = useMemo(() => selectedEra === 'mgs1' ? getMgs1ConversationCoverage(conversations) : null, [selectedEra, conversations]);
  const mgs2Profile = selectedEra === 'mgs2' ? getMgs2Profile(displayContact?.id) : undefined;
  const mgs2Coverage = useMemo(() => selectedEra === 'mgs2' ? getMgs2Coverage(conversations) : null, [selectedEra, conversations]);
  const mgs3Profile = selectedEra === 'mgs3' ? getMgs3Profile(displayContact?.id) : undefined;
  const mgs3Coverage = useMemo(() => selectedEra === 'mgs3' ? getMgs3Coverage(conversations) : null, [selectedEra, conversations]);
  const missedCallCount = callHistory.filter((entry) => entry.disposition === 'missed' || entry.disposition === 'ignored').length;

  useEffect(() => {
    if (!activeCall || !currentLine || !settings.narrativeAudioEnabled) {
      stopNarrativeNoise();
      return;
    }
    const profile = getAudioProfileForEra(activeCall.contact.era);
    startNarrativeNoise(profile, settings.radioNoiseVolume * settings.narrativeAudioVolume);
    playNarrativeVoiceCue(profile, currentLine.emotion ?? 'neutral', settings.narrativeAudioVolume);
    let localAudio: HTMLAudioElement | null = null;
    void playNarrativeAudioSource(resolvedVoiceAsset?.source ?? currentLine.audioSource, settings.narrativeAudioVolume).then((audio) => { localAudio = audio; });
    return () => {
      stopNarrativeNoise();
      localAudio?.pause();
    };
  }, [activeCall, currentLine, resolvedVoiceAsset?.source, settings.narrativeAudioEnabled, settings.narrativeAudioVolume, settings.radioNoiseVolume]);

  useEffect(() => () => stopNarrativeNoise(), []);

  useEffect(() => {
    if (!settings.codecAmbienceEnabled || !activeCall) { stopCodecAmbience(); return; }
    startCodecAmbience(selectedEra, settings.codecAmbienceVolume);
    return () => stopCodecAmbience();
  }, [activeCall?.conversation.id, selectedEra, settings.codecAmbienceEnabled, settings.codecAmbienceVolume]);

  useEffect(() => () => stopCodecAmbience(), []);

  useEffect(() => {
    if (!settings.autoAdvance || !activeCall || !currentLine) return;
    const duration = Math.max(600, (currentLine.endMs ?? 2500) - (currentLine.startMs ?? 0));
    const timer = window.setTimeout(() => nextLine(), duration);
    return () => window.clearTimeout(timer);
  }, [activeCall, currentLine, settings.autoAdvance]);

  function changeEra(eraId: EraId) {
    const era = eras.find((entry) => entry.id === eraId);
    const context = getFirstContextForEra(eraId);
    setSelectedEra(eraId);
    setSelectedContextId(context.id);
    setSelectedPlayerId(context.defaultPlayerId);
    onSettingsChange({ ...settings, selectedEra: eraId, selectedTheme: era?.visualStyle ?? settings.selectedTheme });
    if (era) setFrequency(era.defaultFrequency);
    endCall(false, false);
    setSidePanel(null);
    setPreferredContactId(null);
    setMessage(`ERA SWITCHED: ${era?.name ?? eraId}`);
  }

  function changeContext(contextId: string) {
    const context = contexts.find((entry) => entry.id === contextId && entry.era === selectedEra);
    if (!context) return;
    setSelectedContextId(context.id);
    setSelectedPlayerId(context.defaultPlayerId);
    setPreferredContactId(null);
    setSidePanel(null);
    setMessage(`MISSION CONTEXT: ${context.name.toUpperCase()}`);
  }

  function changeTheme(themeId: string) {
    onSettingsChange({ ...settings, selectedTheme: themeId });
    setMessage(`VISUAL PACK LOADED: ${themePacks.find((theme) => theme.id === themeId)?.name ?? themeId}`);
  }

  function selectTopic(subjectId: string) {
    setSelectedSubjectId(subjectId);
    const topic = topics.find((candidate) => candidate.id === subjectId);
    if (!selectedContact || !topic?.frequencyOverride) return;
    setPreferredContactId(selectedContact.id);
    setFrequency(topic.frequencyOverride);
    setMessage(`CHANNEL PRESET: ${(topic.frequencyLabel ?? topic.label).toUpperCase()}`);
  }

  function tune(delta: number) {
    if (settings.eraUiAudioEnabled) playCodecUiCue(selectedEra, 'tune', settings.uiBeepVolume); else playBeep(640, 35, settings.uiBeepVolume * 0.08);
    setCodecState('tuning');
    setFrequency((value) => normalizeFrequency(value + delta));
    setPreferredContactId(null);
    window.setTimeout(() => setCodecState((state) => (state === 'tuning' ? 'idle' : state)), 90);
  }

  function setFrequencyFromInput(value: string) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    setFrequency(normalizeFrequency(parsed));
    setPreferredContactId(null);
  }

  function addHistoryEntry(entry: CallHistoryEntry) {
    setCallHistory((entries) => [entry, ...entries].slice(0, 50));
  }

  function startCall(
    contact: ContactDefinition,
    source: ConversationTrigger = 'manual_call',
    conversationId?: string,
    subjectId?: string,
    priority?: CodecCallPriority,
    incomingRequestId?: string
  ) {
    const conversation =
      (conversationId ? conversations.find((item) => item.id === conversationId) : undefined)
      ?? getConversationForContact(contact, conversations, source, subjectId, currentContext.id, callHistory);

    if (!conversation) {
      setCodecState('no_response');
      setMessage('NO CONVERSATION DATA');
      if (settings.eraUiAudioEnabled) playCodecUiCue(selectedEra, 'no_response', settings.uiBeepVolume);
      addHistoryEntry({
        callId: `call_${Date.now()}`,
        contactId: contact.id,
        contactName: contact.name,
        frequency: contact.frequency,
        era: contact.era,
        title: 'No conversation data',
        timestamp: new Date().toLocaleString(),
        source,
        completed: false,
        disposition: 'failed',
        subjectId,
        priority
      });
      return;
    }

    if (settings.eraUiAudioEnabled) playCodecUiCue(contact.era, 'connect', settings.uiBeepVolume);
    setActiveCall({ contact, conversation, source, subjectId: subjectId ?? conversation.subjectId, priority, incomingRequestId });
    setLineIndex(0);
    setCodecState('dialogue_playing');
    setMemoryContactIds((ids) => (ids.includes(contact.id) ? ids : [...ids, contact.id]));
    setMessage(`CONNECTED: ${contact.name}`);
    setPreferredContactId(contact.id);
    const routedVariant = getPreferredContactFrequency(contact, currentContext.id, subjectId ?? conversation.subjectId);
    setFrequency(routedVariant.frequency);
  }

  function callFrequency() {
    setSidePanel(null);
    if (!exactCandidates.length || scan.status === 'none' || scan.status === 'weak') {
      setCodecState('no_response');
      setMessage(scan.status === 'weak' ? 'WEAK SIGNAL - NO LOCK' : 'NO RESPONSE');
      if (settings.eraUiAudioEnabled) playCodecUiCue(selectedEra, 'no_response', settings.uiBeepVolume);
      window.setTimeout(() => setCodecState('idle'), 700);
      return;
    }

    const callable = exactCandidates.filter((contact) => availabilityFor(contact).manualCallable);
    if (preferredContact) {
      const availability = availabilityFor(preferredContact);
      if (!availability.manualCallable) {
        setCodecState(availability.access === 'jammed' ? 'signal_jammed' : 'no_response');
        setMessage(availability.reason.toUpperCase());
        if (settings.eraUiAudioEnabled) playCodecUiCue(selectedEra, 'no_response', settings.uiBeepVolume);
        return;
      }
      const topic = selectedTopic ?? getConversationTopics(preferredContact, conversations, currentContext.id)[0];
      startCall(preferredContact, topic?.trigger ?? 'manual_call', undefined, topic?.id);
      return;
    }

    if (callable.length === 1) {
      const contact = callable[0];
      const topic = getConversationTopics(contact, conversations, currentContext.id)[0];
      setPreferredContactId(contact.id);
      startCall(contact, topic?.trigger ?? 'manual_call', undefined, topic?.id);
      return;
    }

    if (callable.length > 1) {
      setSidePanel('router');
      setMessage('SHARED FREQUENCY — SELECT A CONTACT ROUTE');
      return;
    }

    const first = exactCandidates[0];
    const availability = availabilityFor(first);
    setCodecState(availability.access === 'jammed' ? 'signal_jammed' : 'no_response');
    setMessage(availability.reason.toUpperCase());
    if (settings.eraUiAudioEnabled) playCodecUiCue(selectedEra, 'no_response', settings.uiBeepVolume);
  }

  function simulateIncomingCall() {
    const preferred = selectedContact && availabilityFor(selectedContact).incomingCallable ? selectedContact : undefined;
    const contact = preferred
      ?? eraContacts.find((candidate) => availabilityFor(candidate).incomingCallable && candidate.role === 'mission_commander')
      ?? eraContacts.find((candidate) => availabilityFor(candidate).incomingCallable);
    if (!contact) {
      setMessage('NO INCOMING-CAPABLE CONTACT IN THIS CONTEXT');
      return;
    }
    const incomingConversation = getConversationForContact(contact, conversations, 'incoming_call', undefined, currentContext.id, callHistory);
    queueCodecIncomingCall(contact.id, {
      conversationId: incomingConversation?.id,
      priority: contact.isSecret ? 'urgent' : 'priority',
      required: false,
      expiresInMs: 10_000,
      sourceLabel: `Context transmission: ${currentContext.name}`
    });
  }

  function promoteNextIncoming() {
    setIncomingQueue((queue) => {
      const [next, ...remaining] = queue;
      if (next) window.setTimeout(() => setPendingIncoming(next), 220);
      return remaining;
    });
  }

  function acceptIncomingCall() {
    if (!pendingIncoming) return;
    const request = pendingIncoming;
    const contact = contacts.find((item) => item.id === request.contactId);
    setPendingIncoming(null);
    if (!contact) {
      addHistoryEntry({
        callId: `call_${Date.now()}`,
        contactName: 'Unknown',
        frequency,
        era: selectedEra,
        title: 'Unresolved incoming contact',
        timestamp: new Date().toLocaleString(),
        source: 'incoming_call',
        completed: false,
        disposition: 'failed',
        priority: request.priority
      });
      promoteNextIncoming();
      return;
    }

    if (contact.era !== selectedEra) {
      const context = contexts.find((entry) => entry.era === contact.era && entry.unlockedContactIds.includes(contact.id)) ?? getFirstContextForEra(contact.era);
      const era = eras.find((entry) => entry.id === contact.era);
      setSelectedEra(contact.era);
      setSelectedContextId(context.id);
      setSelectedPlayerId(context.defaultPlayerId);
      setFrequency(contact.frequency);
      onSettingsChange({ ...settings, selectedEra: contact.era, selectedTheme: era?.visualStyle ?? settings.selectedTheme });
    }

    startCall(contact, 'incoming_call', request.conversationId, undefined, request.priority, request.id);
  }

  function ignoreIncomingCall() {
    if (!pendingIncoming || pendingIncoming.required) return;
    const request = pendingIncoming;
    const contact = contacts.find((item) => item.id === request.contactId);
    setPendingIncoming(null);
    addHistoryEntry({
      callId: `call_${Date.now()}`,
      contactId: contact?.id,
      contactName: contact?.availability === 'unknown' ? 'Unknown Signal' : contact?.name ?? 'Unknown',
      frequency: contact?.frequency ?? frequency,
      era: contact?.era ?? selectedEra,
      conversationId: request.conversationId,
      title: 'Incoming call ignored',
      timestamp: new Date().toLocaleString(),
      source: 'incoming_call',
      completed: false,
      disposition: 'ignored',
      priority: request.priority
    });
    setMessage('INCOMING CALL IGNORED');
    setCodecState('idle');
    promoteNextIncoming();
  }

  function missIncomingCall() {
    if (!pendingIncoming) return;
    const request = pendingIncoming;
    const contact = contacts.find((item) => item.id === request.contactId);
    setPendingIncoming(null);
    addHistoryEntry({
      callId: `call_${Date.now()}`,
      contactId: contact?.id,
      contactName: contact?.availability === 'unknown' ? 'Unknown Signal' : contact?.name ?? 'Unknown',
      frequency: contact?.frequency ?? frequency,
      era: contact?.era ?? selectedEra,
      conversationId: request.conversationId,
      title: 'Missed incoming call',
      timestamp: new Date().toLocaleString(),
      source: 'incoming_call',
      completed: false,
      disposition: 'missed',
      priority: request.priority
    });
    setMessage('MISSED CALL RECORDED');
    setCodecState('idle');
    promoteNextIncoming();
  }

  function nextLine() {
    playBeep(760, 40, settings.uiBeepVolume * 0.08);
    if (!activeCall) return;
    if (lineIndex < activeCall.conversation.lines.length - 1) {
      setLineIndex((index) => index + 1);
      return;
    }
    const shouldOpenSavePanel = activeCall.contact.role === 'save_contact' || activeCall.subjectId === 'save';
    endCall(true, true);
    if (shouldOpenSavePanel) setSidePanel('save');
  }

  function archiveReplay(call: ActiveCall, completed: boolean) {
    if (!replayLibrary.autoArchive) return;
    const endedAt = Date.now();
    const startedAt = callStartedAtRef.current ?? endedAt;
    const record: CodecReplayRecord = {
      id: `replay_${endedAt}_${call.conversation.id}`,
      createdAt: new Date(startedAt).toISOString(),
      completedAt: new Date(endedAt).toISOString(),
      era: call.contact.era,
      themeId: settings.selectedTheme,
      frequency,
      context: runtimeContext,
      contact: {
        id: call.contact.id,
        name: call.contact.name,
        codename: call.contact.codename,
        role: call.contact.role,
        portrait: call.contact.portrait,
        era: call.contact.era
      },
      conversation: JSON.parse(JSON.stringify(call.conversation)) as ConversationDefinition,
      subjectId: call.subjectId,
      durationMs: Math.max(0, endedAt - startedAt),
      completed,
      tags: [call.source, currentContext.chapterId, completed ? 'complete' : 'aborted']
    };
    setReplayLibrary(appendCodecReplay(record));
  }

  function playReplay(record: CodecReplayRecord) {
    const contact = contacts.find((candidate) => candidate.id === record.contact.id) ?? {
      ...record.contact,
      frequency: record.frequency,
      availability: 'available' as const,
      defaultConversation: record.conversation.id,
      specialties: [],
      unlockedByDefault: true,
      isSecret: false,
      description: 'Archived replay contact.'
    };
    const context = contexts.find((candidate) => candidate.id === record.context.contextId) ?? getFirstContextForEra(record.era);
    const era = eras.find((candidate) => candidate.id === record.era);
    setSelectedEra(record.era);
    setSelectedContextId(context.id);
    setSelectedPlayerId(context.players.some((player) => player.id === record.context.playerId) ? record.context.playerId : context.defaultPlayerId);
    setFrequency(record.frequency);
    setPreferredContactId(contact.id);
    onSettingsChange({ ...settings, selectedEra: record.era, selectedTheme: record.themeId || era?.visualStyle || settings.selectedTheme });
    callStartedAtRef.current = Date.now();
    setActiveCall({ contact, conversation: record.conversation, source: 'manual_call', subjectId: record.subjectId });
    setLineIndex(0);
    setCodecState('dialogue_playing');
    setSidePanel(null);
    setMessage(`REPLAY: ${record.conversation.title.toUpperCase()}`);
  }

  async function capturePng() {
    if (!codecCaptureRef.current) return;
    try {
      await exportCodecPng(codecCaptureRef.current, `shadow-codec-${selectedEra}-${Date.now()}.png`);
      setCaptureMessage('PNG CAPTURE EXPORTED');
    } catch (error) {
      setCaptureMessage(error instanceof Error ? error.message.toUpperCase() : 'PNG CAPTURE FAILED');
    }
  }

  async function toggleWebmRecording() {
    if (recording && recorderRef.current) {
      const blob = await recorderRef.current.stop();
      downloadCodecWebm(blob, `shadow-codec-${selectedEra}-${Date.now()}.webm`);
      recorderRef.current = null;
      setRecording(false);
      setCaptureMessage('WEBM RECORDING EXPORTED');
      return;
    }
    if (!codecCaptureRef.current) return;
    try {
      recorderRef.current = await startDomWebmRecording(codecCaptureRef.current);
      setRecording(true);
      setCaptureMessage('WEBM RECORDING ACTIVE');
    } catch (error) {
      setCaptureMessage(error instanceof Error ? error.message.toUpperCase() : 'WEBM RECORDING UNAVAILABLE');
    }
  }

  async function importReplayLibrary(file: File) {
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const imported = parsed && typeof parsed === 'object' && 'records' in parsed
        ? parsed as { records?: CodecReplayRecord[]; autoArchive?: boolean }
        : { records: [parsed as CodecReplayRecord] };
      const validRecords = (imported.records ?? []).filter((record) => record && typeof record.id === 'string' && record.conversation?.lines?.length > 0);
      if (validRecords.length === 0) throw new Error('No valid Codec replay found in this file.');
      const merged = {
        schemaVersion: 1 as const,
        autoArchive: imported.autoArchive ?? replayLibrary.autoArchive,
        records: [...validRecords, ...replayLibrary.records.filter((record) => !validRecords.some((candidate) => candidate.id === record.id))].slice(0, 100)
      };
      setReplayLibrary(saveCodecReplayLibrary(merged));
      setCaptureMessage(`${validRecords.length} REPLAY(S) IMPORTED`);
    } catch (error) {
      setCaptureMessage(error instanceof Error ? error.message.toUpperCase() : 'REPLAY IMPORT FAILED');
    } finally {
      if (replayImportRef.current) replayImportRef.current.value = '';
    }
  }

  function exportArchiveBundle() {
    exportCodecJson({
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      app: 'Shadow Codec Ops',
      era: selectedEra,
      context: runtimeContext,
      memoryContactIds,
      callHistory,
      replayLibrary
    }, `shadow-codec-archive-${Date.now()}.json`);
    setCaptureMessage('CODEC ARCHIVE EXPORTED');
  }

  function endCall(completed: boolean, promoteQueue = true) {
    if (activeCall) {
      archiveReplay(activeCall, completed);
      const entry: CallHistoryEntry = {
        callId: `call_${Date.now()}`,
        contactId: activeCall.contact.id,
        contactName: activeCall.contact.name,
        frequency: activeCall.contact.frequency,
        era: activeCall.contact.era,
        conversationId: activeCall.conversation.id,
        title: activeCall.conversation.title,
        timestamp: new Date().toLocaleString(),
        source: activeCall.source,
        completed,
        disposition: completed ? 'completed' : 'aborted',
        subjectId: activeCall.subjectId,
        priority: activeCall.priority
      };
      addHistoryEntry(entry);
      if (completed) recordCampaignCodecCall(activeCall.contact.id, activeCall.conversation.id);
    }
    stopNarrativeNoise();
    callStartedAtRef.current = null;
    setActiveCall(null);
    setLineIndex(0);
    setCodecState('idle');
    setMessage(completed ? 'CALL ENDED' : 'SYSTEM READY');
    if (promoteQueue) promoteNextIncoming();
  }

  function selectMemoryContact(contact: ContactDefinition) {
    const preferredVariant = getPreferredContactFrequency(contact, currentContext.id);
    setFrequency(preferredVariant.frequency);
    setPreferredContactId(contact.id);
    setSidePanel(null);
    const availability = availabilityFor(contact);
    setMessage(availability.manualCallable ? `MEMORY SELECTED: ${contact.name}` : availability.reason.toUpperCase());
  }

  function selectRouteContact(contact: ContactDefinition) {
    setPreferredContactId(contact.id);
    setSidePanel(null);
    setMessage(`CHANNEL ROUTED: ${contact.name.toUpperCase()}`);
  }

  function recallHistoryEntry(entry: CallHistoryEntry) {
    const contact = contacts.find((candidate) => candidate.id === entry.contactId);
    if (!contact) return;
    if (contact.era !== selectedEra) {
      const context = contexts.find((candidate) => candidate.era === contact.era && candidate.unlockedContactIds.includes(contact.id)) ?? getFirstContextForEra(contact.era);
      const era = eras.find((candidate) => candidate.id === contact.era);
      setSelectedEra(contact.era);
      setSelectedContextId(context.id);
      setSelectedPlayerId(context.defaultPlayerId);
      onSettingsChange({ ...settings, selectedEra: contact.era, selectedTheme: era?.visualStyle ?? settings.selectedTheme });
    }
    setFrequency(contact.frequency);
    setPreferredContactId(contact.id);
    setSidePanel(null);
    setMessage(`RECALL READY: ${contact.name.toUpperCase()}`);
  }

  function saveCodecSlot(slotId: CodecSaveSlotId) {
    const snapshot = createCodecSaveSnapshot(slotId, {
      label: `${currentEra.name} — ${currentContext.name}`,
      era: selectedEra,
      contextId: currentContext.id,
      playerId: selectedPlayer?.id ?? currentContext.defaultPlayerId,
      frequency,
      selectedTheme: settings.selectedTheme,
      memoryContactIds,
      callHistory
    });
    setSaveSlots(writeCodecSaveSlot(snapshot));
    setMessage(`CODEC DATA SAVED: ${slotId.toUpperCase()}`);
  }

  function loadCodecSlot(snapshot: CodecSaveSnapshot) {
    const context = contexts.find((entry) => entry.id === snapshot.contextId && entry.era === snapshot.era) ?? getFirstContextForEra(snapshot.era);
    setSelectedEra(snapshot.era);
    setSelectedContextId(context.id);
    setSelectedPlayerId(context.players.some((player) => player.id === snapshot.playerId) ? snapshot.playerId : context.defaultPlayerId);
    setFrequency(snapshot.frequency);
    setMemoryContactIds(snapshot.memoryContactIds);
    setCallHistory(snapshot.callHistory);
    setPreferredContactId(null);
    onSettingsChange({ ...settings, selectedEra: snapshot.era, selectedTheme: snapshot.selectedTheme });
    setMessage(`CODEC DATA LOADED: ${snapshot.label.toUpperCase()}`);
  }

  function removeCodecSlot(slotId: CodecSaveSlotId) {
    setSaveSlots(deleteCodecSaveSlot(slotId));
    setMessage(`CODEC SAVE DELETED: ${slotId.toUpperCase()}`);
  }

  function routeRadioContact(contactId: string, routedFrequency: number) {
    const contact = contacts.find((candidate) => candidate.id === contactId);
    if (!contact) {
      setMessage('RADIO ROUTE CONTACT NOT FOUND');
      return;
    }
    setFrequency(normalizeFrequency(routedFrequency));
    setPreferredContactId(contact.id);
    setSidePanel(null);
    setMessage(`SIGNAL ROUTED: ${contact.name.toUpperCase()}`);
  }

  function unlockRadioContact(contactId: string) {
    setMemoryContactIds((ids) => ids.includes(contactId) ? ids : [...ids, contactId]);
  }

  function startRadioTransmission(signal: RadioSignalDefinition) {
    if (!signal.contactId || !signal.conversationId) {
      setMessage('INTERCEPT HAS NO CODEC VOICE ROUTE');
      return;
    }
    const contact = contacts.find((candidate) => candidate.id === signal.contactId);
    if (!contact) {
      setMessage('INTERCEPT CONTACT NOT FOUND');
      return;
    }
    setFrequency(signal.frequency);
    setPreferredContactId(contact.id);
    setSidePanel(null);
    startCall(contact, 'secret_frequency', signal.conversationId, 'signal_intelligence', 'priority');
  }

  const scanLabel = exactCandidates.length > 1
    ? `SHARED FREQUENCY: ${exactCandidates.length} ROUTES`
    : selectedContact && selectedAvailability && !selectedAvailability.manualCallable
      ? selectedAvailability.reason.toUpperCase()
      : scan.label;

  const visualIdentity = getCodecVisualIdentity(selectedEra);
  const visualContactName = displayContact
    ? (displayContact.availability === 'unknown' && !memoryContactIds.includes(displayContact.id) ? 'UNKNOWN SIGNAL' : displayContact.name)
    : exactCandidates.length > 1 ? 'ROUTE REQUIRED' : 'NO SIGNAL';

  const leftPortrait = (
    <AnimatedCodecPortrait
      side="left"
      label="PLAYER"
      initials={selectedPlayer?.initials ?? 'P'}
      name={selectedPlayer?.name.toUpperCase() ?? 'PLAYER'}
      expression={playerSpeaking ? portraitExpression : 'neutral'}
      emotion={currentLine?.emotion}
      speaking={playerSpeaking}
      image={playerPortraitImage}
      enabled={settings.portraitAnimationEnabled}
    />
  );

  const rightPortrait = (
    <AnimatedCodecPortrait
      side="right"
      label="CONTACT"
      initials={displayContact ? displayContact.codename?.slice(0, 2).toUpperCase() ?? displayContact.name.slice(0, 2).toUpperCase() : '??'}
      name={visualContactName}
      expression={portraitExpression}
      emotion={currentLine?.emotion}
      image={contactPortraitImage}
      speaking={contactSpeaking}
      enabled={settings.portraitAnimationEnabled}
    />
  );

  const topicSelectorPanel = selectedContact && !activeCall ? (
    <div className="codec-topic-selector visual-topic-selector">
      <div>
        <span>ROUTED CONTACT</span>
        <strong>{selectedContact.name}</strong>
        <small className={`contact-access access-${selectedAvailability?.access}`}>{selectedAvailability?.access.replace('_', ' ').toUpperCase()}</small>
      </div>
      {topics.length > 0 && (
        <>
          <label htmlFor="codec-topic">CALL SUBJECT</label>
          <select id="codec-topic" value={selectedTopic?.id ?? ''} onChange={(event) => selectTopic(event.target.value)}>
            {topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.label}</option>)}
          </select>
          <p>{selectedTopic?.description}</p>
          {selectedTopic?.frequencyLabel && <small className="topic-frequency-label">{selectedTopic.frequencyLabel} · {formatFrequency(selectedTopic.frequencyOverride ?? selectedContact.frequency)}</small>}
        </>
      )}
    </div>
  ) : undefined;

  const utilityActions = (
    <div className="codec-subcontrols visual-utility-actions">
      <button type="button" onClick={() => setSidePanel(sidePanel === 'memory' ? null : 'memory')}>{visualIdentity.memoryLabel}</button>
      <button type="button" onClick={() => setSidePanel(sidePanel === 'history' ? null : 'history')}>{visualIdentity.historyLabel}</button>
      <button type="button" onClick={() => setSidePanel(sidePanel === 'scan' ? null : 'scan')}>SIGNAL INTEL</button>
      <button type="button" onClick={() => setSidePanel(sidePanel === 'replay' ? null : 'replay')}>REPLAYS</button>
      {selectedEra === 'mgs1' && mgs1Profile && <button type="button" onClick={() => setSidePanel(sidePanel === 'mgs1_dossier' ? null : 'mgs1_dossier')}>PERSONNEL FILE</button>}
      {selectedEra === 'mgs1' && mgs1Coverage && <span className="codec-mgs1-library-count" title="MGS1 conversation library coverage">LIBRARY {mgs1Coverage.total} · PROVERBS {mgs1Coverage.proverbCount} · BOSS {mgs1Coverage.bossIntelCount}</span>}
      {selectedEra === 'mgs2' && mgs2Profile && <button type="button" onClick={() => setSidePanel(sidePanel === 'mgs2_dossier' ? null : 'mgs2_dossier')}>MGS2 DOSSIER</button>}
      {selectedEra === 'mgs2' && mgs2Coverage && <span className="codec-mgs1-library-count" title="MGS2 Codec coverage">CONTACTS {mgs2Coverage.contacts} · LIBRARY {mgs2Coverage.conversations} · OPS {mgs2Coverage.contexts}</span>}
      {selectedEra === 'mgs3' && mgs3Profile && <button type="button" onClick={() => setSidePanel(sidePanel === 'mgs3_dossier' ? null : 'mgs3_dossier')}>MGS3 FIELD FILE</button>}
      {selectedEra === 'mgs3' && mgs3Coverage && <span className="codec-mgs1-library-count">CONTACTS {mgs3Coverage.contacts} · LIBRARY {mgs3Coverage.conversations} · FIELD {mgs3Coverage.items}</span>}
      <button type="button" onClick={capturePng}>CAPTURE PNG</button>
      <button type="button" className={recording ? 'recording-active' : ''} onClick={() => void toggleWebmRecording()}>{recording ? 'STOP WEBM' : 'RECORD WEBM'}</button>
      <button type="button" onClick={() => setStreamOverlay((enabled) => !enabled)}>{streamOverlay ? 'EXIT OVERLAY' : 'STREAM OVERLAY'}</button>
      <button type="button" onClick={exportArchiveBundle}>EXPORT ARCHIVE</button>
      <button type="button" onClick={simulateIncomingCall}>INCOMING TEST</button>
      <button type="button" onClick={() => setSidePanel(sidePanel === 'save' ? null : 'save')}>{visualIdentity.dataLabel}</button>
      <select aria-label="Director sequence" value={selectedDirectorSequenceId} onChange={(event) => setSelectedDirectorSequenceId(event.target.value)}>
        {directorSequences.map((sequence) => <option key={sequence.id} value={sequence.id}>{sequence.title}</option>)}
      </select>
      <button type="button" disabled={!selectedDirectorSequenceId} onClick={() => requestDirectorSequence(selectedDirectorSequenceId, 'codec', 'Codec Simulator')}>DIRECTOR</button>
    </div>
  );

  const dialoguePanel = (
    <div className="codec-dialogue-box visual-dialogue-box">
      {activeCall && currentLine ? (
        <>
          <div className="dialogue-speaker">
            {getSpeakerLabel(currentLine.speaker, activeCall.contact)}
            {activeCall.subjectId && <span className="call-subject-label"> {activeCall.subjectId.replace('_', ' ')}</span>}
            {typeof currentLine.glitchLevel === 'number' && currentLine.glitchLevel > 0 && <span className="glitch-level"> GLITCH {currentLine.glitchLevel}</span>}
          </div>
          <p>{localizedLineText}</p>
          <span className="portrait-expression">EXPRESSION: {portraitExpression.toUpperCase()}</span>
          <SubtitleTrack
            speaker={getSpeakerLabel(currentLine.speaker, activeCall.contact)}
            text={currentLine.localizedText ?? currentLine.text}
            locale={settings.locale}
            startMs={currentLine.startMs}
            endMs={currentLine.endMs}
            emotion={currentLine.emotion}
            enabled={settings.subtitlesEnabled}
          />
          <div className="dialogue-actions">
            <button type="button" onClick={nextLine}>{lineIndex < activeCall.conversation.lines.length - 1 ? 'NEXT' : 'END CALL'}</button>
            <button type="button" onClick={() => endCall(false)}>ABORT</button>
          </div>
        </>
      ) : (
        <p className="idle-copy">
          {visualIdentity.dialogueLabel}: select a context and route a contact. Current state: <strong>{codecState.toUpperCase()}</strong>
        </p>
      )}
    </div>
  );

  return (
    <div ref={codecCaptureRef} className={`codec-capture-root ${streamOverlay ? 'codec-stream-overlay' : ''} ${recording ? 'codec-is-recording' : ''}`}>
    {streamOverlay && <button type="button" data-capture-exclude="true" className="codec-overlay-exit" onClick={() => setStreamOverlay(false)}>EXIT STREAM OVERLAY</button>}
    <section className={`codec-page codec-skin-${settings.selectedTheme}`}>
      <Panel className="codec-main-panel">
        <div className="codec-topbar">
          <StatusBadge label={message} tone={getToneForState(codecState, scan.status)} />
          <StatusBadge label={scanLabel} tone={scan.status === 'stable' ? 'success' : scan.status === 'weak' ? 'warning' : scan.status === 'patriots_corrupt' ? 'warning' : 'neutral'} />
          {missedCallCount > 0 && <StatusBadge label={`${missedCallCount} MISSED/IGNORED`} tone="warning" />}
          <select aria-label="Codec era" value={selectedEra} onChange={(event) => changeEra(event.target.value as EraId)}>
            {eras.map((era) => <option value={era.id} key={era.id}>{era.name}</option>)}
          </select>
          <select aria-label="Mission context" value={currentContext.id} onChange={(event) => changeContext(event.target.value)}>
            {eraContexts.map((context) => <option value={context.id} key={context.id}>{context.name}</option>)}
          </select>
          <select aria-label="Player profile" value={selectedPlayer?.id ?? ''} onChange={(event) => setSelectedPlayerId(event.target.value)}>
            {currentContext.players.map((player) => <option value={player.id} key={player.id}>{player.name}</option>)}
          </select>
          <select aria-label="Visual pack" value={settings.selectedTheme} onChange={(event) => changeTheme(event.target.value)}>
            {themePacks.map((theme) => <option value={theme.id} key={theme.id}>{theme.name}</option>)}
          </select>
        </div>

        {captureMessage && <div className="codec-capture-status">{captureMessage}</div>}
        <div className="codec-era-meta">
          <span>{currentEra.codecType.replace('_', ' ').toUpperCase()}</span>
          <strong>{currentTheme.name} · {currentContext.chapterId.replace(/_/g, ' ')}</strong>
          <p>{currentContext.description}</p>
          <div className="codec-context-flags">
            {currentContext.flags.map((flag) => <span key={flag}>{flag.replace(/_/g, ' ')}</span>)}
          </div>
        </div>

        <CodecVisualStage
          era={selectedEra}
          identity={visualIdentity}
          contextName={currentContext.name}
          chapterLabel={currentContext.chapterId.replace(/_/g, ' ')}
          playerName={selectedPlayer?.name ?? 'Unknown'}
          contactName={visualContactName}
          contactRole={displayContact?.role}
          contactAccess={selectedAvailability?.access}
          frequency={frequency}
          signalStrength={signalStrength}
          codecState={codecState}
          leftPortrait={leftPortrait}
          rightPortrait={rightPortrait}
          topicSelector={topicSelectorPanel}
          dialogue={dialoguePanel}
          utilityActions={utilityActions}
          onTune={tune}
          onFrequencyInput={setFrequencyFromInput}
          onCall={callFrequency}
        />
      </Panel>

      {sidePanel === 'memory' && (
        <Panel title={`${visualIdentity.memoryLabel} · ${currentEra.name}`} className={`side-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          {memoryContacts.length === 0 && <p>No known contacts in this context yet.</p>}
          {memoryContacts.map((contact) => {
            const availability = availabilityFor(contact);
            return (
              <button key={contact.id} className="memory-row" type="button" onClick={() => selectMemoryContact(contact)}>
                <span>{getContactChannelDisplay(contact, currentContext.id)}</span>
                <strong>{contact.availability === 'unknown' && !memoryContactIds.includes(contact.id) ? 'Unknown Signal' : contact.name}</strong>
                <small>{contact.role} · {availability.access.replace('_', ' ')}</small>
              </button>
            );
          })}
        </Panel>
      )}

      {sidePanel === 'history' && (
        <Panel title={`${visualIdentity.historyLabel} · MISSED CALLS`} className={`side-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          {callHistory.length === 0 && <p>No call logged yet.</p>}
          {callHistory.map((entry) => (
            <div className={`history-row disposition-${entry.disposition ?? (entry.completed ? 'completed' : 'aborted')}`} key={entry.callId}>
              <div className="history-row-heading">
                <strong>{entry.contactName ?? 'Unknown'}</strong>
                <span>{getDispositionLabel(entry)}</span>
              </div>
              <span>{formatFrequency(entry.frequency)} — {entry.title}</span>
              <small>{entry.subjectId ? `${entry.subjectId.replace('_', ' ')} · ` : ''}{entry.timestamp}</small>
              {entry.contactId && <button type="button" onClick={() => recallHistoryEntry(entry)}>PREPARE RECALL</button>}
            </div>
          ))}
        </Panel>
      )}

      {sidePanel === 'replay' && (
        <Panel title="CODEC REPLAY LIBRARY" className={`side-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          <div className="replay-library-tools">
            <label><input type="checkbox" checked={replayLibrary.autoArchive} onChange={(event) => setReplayLibrary(setReplayAutoArchive(event.target.checked))} /> AUTO-ARCHIVE COMPLETED CALLS</label>
            <button type="button" onClick={() => exportCodecJson(replayLibrary, `codec-replays-${Date.now()}.json`)}>EXPORT JSON</button>
            <button type="button" onClick={() => replayImportRef.current?.click()}>IMPORT JSON</button>
            <input ref={replayImportRef} hidden type="file" accept="application/json,.json" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importReplayLibrary(file); }} />
            <button type="button" disabled={replayLibrary.records.length === 0} onClick={() => setReplayLibrary(clearCodecReplays())}>CLEAR LIBRARY</button>
          </div>
          {replayLibrary.records.length === 0 && <p>No replay archived yet. Complete or abort a call while auto-archive is enabled.</p>}
          {replayLibrary.records.map((record) => (
            <article className="codec-replay-card" key={record.id}>
              <div><strong>{record.contact.name}</strong><span>{record.conversation.title}</span></div>
              <small>{record.era.toUpperCase()} · {formatFrequency(record.frequency)} · {(record.durationMs / 1000).toFixed(1)}s · {record.completed ? 'COMPLETE' : 'ABORTED'}</small>
              <p>{record.conversation.lines.length} subtitle lines · {new Date(record.completedAt).toLocaleString()}</p>
              <div className="replay-card-actions">
                <button type="button" onClick={() => playReplay(record)}>PLAY REPLAY</button>
                <button type="button" onClick={() => exportCodecJson(record, `${record.id}.json`)}>EXPORT</button>
                <button type="button" onClick={() => setReplayLibrary(deleteCodecReplay(record.id))}>DELETE</button>
              </div>
            </article>
          ))}
        </Panel>
      )}

      {sidePanel === 'router' && (
        <Panel title={`${visualIdentity.frequencyLabel} ROUTER`} className={`side-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          <p>Multiple contacts share {formatFrequency(frequency)}. Select the intended operator before calling.</p>
          {exactCandidates.map((contact) => {
            const availability = availabilityFor(contact);
            return (
              <article className={`route-card access-${availability.access}`} key={contact.id}>
                <div><strong>{contact.availability === 'unknown' && !memoryContactIds.includes(contact.id) ? 'Unknown Signal' : contact.name}</strong><span>{contact.role.replace(/_/g, ' ')}</span></div>
                <p>{availability.reason}</p>
                <button type="button" disabled={!availability.manualCallable} onClick={() => selectRouteContact(contact)}>
                  {availability.manualCallable ? 'ROUTE CHANNEL' : availability.access.replace('_', ' ').toUpperCase()}
                </button>
              </article>
            );
          })}
        </Panel>
      )}

      {sidePanel === 'scan' && (
        <Panel title={`${visualIdentity.frequencyLabel} · RADIO SCAN`} className={`side-panel radio-scan-side-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          <RadioScanPanel
            era={selectedEra}
            context={currentContext}
            frequency={frequency}
            contacts={contacts}
            signals={radioSignals}
            memoryContactIds={memoryContactIds}
            locale={settings.locale}
            onFrequencyChange={(nextFrequency) => {
              setFrequency(normalizeFrequency(nextFrequency));
              setPreferredContactId(null);
            }}
            onRouteContact={routeRadioContact}
            onStartTransmission={startRadioTransmission}
            onUnlockContact={unlockRadioContact}
            onMessage={setMessage}
          />
        </Panel>
      )}

      {sidePanel === 'save' && (
        <Panel title={`${visualIdentity.dataLabel} · LOCAL SLOTS`} className={`side-panel save-data-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          <p>Three local slots preserve the current Codec context, memory, frequency and call history.</p>
          <CodecSavePanel slots={saveSlots} onSave={saveCodecSlot} onLoad={loadCodecSlot} onDelete={removeCodecSlot} />
        </Panel>
      )}

      {sidePanel === 'mgs1_dossier' && mgs1Profile && displayContact && (
        <Panel title="MGS1 PERSONNEL DOSSIER" className={`side-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          <Mgs1ContactDossier
            profile={mgs1Profile}
            contact={displayContact}
            context={currentContext}
            conversations={conversations}
            history={callHistory}
            memoryContactIds={memoryContactIds}
            locale={settings.locale}
            onSelectTopic={(topicId) => {
              const preferred = getPreferredContactFrequency(displayContact, currentContext.id, topicId);
              setFrequency(preferred.frequency);
              setPreferredContactId(displayContact.id);
              setSelectedSubjectId(topicId);
              setSidePanel(null);
              setMessage(`TOPIC READY: ${topicId.replace(/_/g, ' ').toUpperCase()}`);
            }}
          />
        </Panel>
      )}

      {sidePanel === 'mgs2_dossier' && mgs2Profile && displayContact && (
        <Panel title="MGS2 PERSONNEL & SYSTEM DOSSIER" className={`side-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          <Mgs2ContactDossier
            profile={mgs2Profile}
            contact={displayContact}
            context={currentContext}
            conversations={conversations}
            history={callHistory}
            locale={settings.locale}
            onSelectTopic={(topicId) => {
              const preferred = getPreferredContactFrequency(displayContact, currentContext.id, topicId);
              setFrequency(preferred.frequency);
              setPreferredContactId(displayContact.id);
              setSelectedSubjectId(topicId);
              setSidePanel(null);
              setMessage(`MGS2 TOPIC READY: ${topicId.replace(/_/g, ' ').toUpperCase()}`);
            }}
          />
        </Panel>
      )}
      {sidePanel === 'mgs3_dossier' && mgs3Profile && displayContact && (
        <Panel title="MGS3 SURVIVAL RADIO DOSSIER" className={`side-panel visual-side-panel visual-side-${visualIdentity.layoutId}`}>
          <Mgs3ContactDossier profile={mgs3Profile} contact={displayContact} context={currentContext} conversations={conversations} history={callHistory} locale={settings.locale} onSelectTopic={(topicId)=>{const preferred=getPreferredContactFrequency(displayContact,currentContext.id,topicId);setFrequency(preferred.frequency);setPreferredContactId(displayContact.id);setSelectedSubjectId(topicId);setSidePanel(null);setMessage(`MGS3 TOPIC READY: ${topicId.replace(/_/g,' ').toUpperCase()}`);}} />
        </Panel>
      )}

      {!sidePanel && (
        <Panel title="Context & Channel Status" className="side-panel visual-pack-panel">
          <StatusBadge label={currentTheme.mood} tone="success" />
          <h3>{currentTheme.name}</h3>
          <p>{currentEra.description}</p>
          <div className="visual-pack-specs">
            <div><span>Era</span><strong>{currentEra.name}</strong></div>
            <div><span>Mission Context</span><strong>{currentContext.name}</strong></div>
            <div><span>Player</span><strong>{selectedPlayer?.name ?? 'Unknown'}</strong></div>
            <div><span>Visual Layout</span><strong>{visualIdentity.layoutId.replace(/_/g, ' ')}</strong></div>
            <div><span>Portrait Mode</span><strong>{visualIdentity.portraitMode.replace(/_/g, ' ')}</strong></div>
            <div><span>Known Contacts</span><strong>{memoryContacts.length}/{eraContacts.length}</strong></div>
            <div><span>Incoming Queue</span><strong>{incomingQueue.length + (pendingIncoming ? 1 : 0)}</strong></div>
          </div>
          <div className="theme-chip-row">
            {visualIdentity.visualFeatureLabels.map((feature) => <span key={feature}>{feature}</span>)}
            {currentContext.flags.map((flag) => <span key={flag}>{flag}</span>)}
          </div>
          <div className="visual-pack-actions">
            {memoryContacts.slice(0, 6).map((contact) => (
              <button key={contact.id} type="button" onClick={() => selectMemoryContact(contact)}>
                {getContactChannelDisplay(contact, currentContext.id)} · {contact.availability === 'unknown' ? contact.codename ?? 'Unknown' : contact.codename ?? contact.name}
              </button>
            ))}
          </div>
          {currentCanonCoverage && (
            <article className={`codec-coverage-matrix coverage-${currentCanonCoverage.status}`}>
              <div className="coverage-matrix-heading">
                <div>
                  <span>CANON COVERAGE MATRIX</span>
                  <h4>{currentEra.name}</h4>
                </div>
                <StatusBadge label={currentCanonCoverage.status.toUpperCase()} tone={currentCanonCoverage.status === 'simulation' || currentCanonCoverage.status === 'foundation' ? 'warning' : 'success'} />
              </div>
              <div className="coverage-matrix-counts">
                <div><span>Contacts</span><strong>{currentCanonCoverage.contactCount}</strong></div>
                <div><span>Contexts</span><strong>{currentCanonCoverage.contextCount}</strong></div>
                <div><span>Conversations</span><strong>{currentCanonCoverage.conversationCount}</strong></div>
              </div>
              <p>{currentCanonCoverage.channelPolicy}</p>
              <div className="coverage-matrix-columns">
                <div><span>COVERED NOW</span>{currentCanonCoverage.coverageFocus.map((item) => <small key={item}>{item}</small>)}</div>
                <div><span>REMAINING GAPS</span>{currentCanonCoverage.remainingGaps.map((item) => <small key={item}>{item}</small>)}</div>
              </div>
            </article>
          )}
          {displayContact && (
            <article className={`codec-canon-dossier canon-${displayContact.canonStatus ?? 'canon'}`}>
              <div className="canon-dossier-heading">
                <div>
                  <span>CANON DATA DOSSIER</span>
                  <h4>{displayContact.name}</h4>
                </div>
                <StatusBadge label={getCanonStatusLabel(displayContact)} tone={displayContact.canonStatus === 'simulation' ? 'warning' : 'success'} />
              </div>
              <p>{displayContact.description}</p>
              <div className="canon-dossier-grid">
                <div><span>Game</span><strong>{displayContact.gameTitle ?? currentEra.name}</strong></div>
                <div><span>Timeline</span><strong>{displayContact.timelineYear ?? 'N/A'}</strong></div>
                <div><span>Role</span><strong>{displayContact.role.replace(/_/g, ' ')}</strong></div>
                <div><span>Channel Type</span><strong>{(displayContact.frequencyKind ?? 'canonical_frequency').replace(/_/g, ' ')}</strong></div>
                <div><span>Aliases</span><strong>{displayContact.aliases?.length ? displayContact.aliases.join(' / ') : 'None listed'}</strong></div>
                <div><span>Specialties</span><strong>{displayContact.specialties.slice(0, 4).join(' / ')}</strong></div>
              </div>
              {(displayContact.availabilityNotes || displayContact.channelNotes) && (
                <div className="canon-notes">
                  {displayContact.availabilityNotes && <p><strong>Availability:</strong> {displayContact.availabilityNotes}</p>}
                  {displayContact.channelNotes && <p><strong>Channel:</strong> {displayContact.channelNotes}</p>}
                </div>
              )}
              <div className="canon-channel-list">
                {displayChannelVariants.map((variant) => (
                  <button
                    type="button"
                    key={`${displayContact.id}-${variant.frequency}-${variant.subjectId ?? 'default'}`}
                    onClick={() => {
                      setFrequency(variant.frequency);
                      setPreferredContactId(displayContact.id);
                      if (variant.subjectId) setSelectedSubjectId(variant.subjectId);
                      setMessage(`CHANNEL SELECTED: ${variant.label.toUpperCase()}`);
                    }}
                  >
                    <span>{variant.canonical ? formatFrequency(variant.frequency) : 'SIM ROUTE'}</span>
                    <strong>{variant.label}</strong>
                    <small>{variant.kind.replace(/_/g, ' ')}</small>
                  </button>
                ))}
              </div>
              <div className="canon-source-list">
                {displayContactSources.map((source) => source.url ? (
                  <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
                    <span>{source.quality.replace(/_/g, ' ')}</span>
                    <strong>{source.title}</strong>
                  </a>
                ) : (
                  <div key={source.id}>
                    <span>{source.quality.replace(/_/g, ' ')}</span>
                    <strong>{source.title}</strong>
                  </div>
                ))}
              </div>
            </article>
          )}
        </Panel>
      )}

      {pendingIncoming && (
        <IncomingCallOverlay
          request={pendingIncoming}
          contact={contacts.find((contact) => contact.id === pendingIncoming.contactId)}
          secondsRemaining={incomingSecondsRemaining}
          queuedCount={incomingQueue.length}
          onAccept={acceptIncomingCall}
          onIgnore={ignoreIncomingCall}
          visualLayoutId={visualIdentity.layoutId}
          callLabel={visualIdentity.callLabel}
        />
      )}
    </section>
    </div>
  );
}
