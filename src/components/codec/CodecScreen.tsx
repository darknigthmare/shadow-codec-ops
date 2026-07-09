import { useEffect, useMemo, useState } from 'react';
import contactsJson from '../../data/contacts.json';
import conversationsJson from '../../data/conversations.json';
import erasJson from '../../data/eras.json';
import themesJson from '../../data/themes.json';
import type {
  CallHistoryEntry,
  CodecState,
  ContactDefinition,
  ConversationDefinition,
  ConversationTrigger,
  EraDefinition,
  EraId
} from '../../types/codec.types';
import type { ThemePackDefinition, UserSettings } from '../../types/theme.types';
import { getConversationForContact, getSpeakerLabel } from '../../systems/conversationEngine';
import { formatFrequency, normalizeFrequency, scanFrequency } from '../../systems/frequencyEngine';
import { loadJson, saveJson } from '../../systems/saveEngine';
import { loadCustomConversations, mergeStudioConversations } from '../../systems/studioStorage';
import { playBeep, playCodecConnect, playIncomingRing, playNoResponse } from '../../systems/audioEngine';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

const contacts = contactsJson as ContactDefinition[];
const builtInConversations = conversationsJson as ConversationDefinition[];
const eras = erasJson as EraDefinition[];
const themePacks = themesJson as ThemePackDefinition[];

interface ActiveCall {
  contact: ContactDefinition;
  conversation: ConversationDefinition;
  source: ConversationTrigger;
}

interface CodecScreenProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

function getToneForState(state: CodecState, scanStatus: string): 'success' | 'warning' | 'danger' | 'neutral' {
  if (state === 'no_response' || state === 'signal_jammed') return 'danger';
  if (scanStatus === 'weak' || scanStatus === 'patriots_corrupt') return 'warning';
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

export function CodecScreen({ settings, onSettingsChange }: CodecScreenProps) {
  const [selectedEra, setSelectedEra] = useState<EraId>(settings.selectedEra as EraId);
  const currentEra = eras.find((era) => era.id === selectedEra) ?? eras[0];
  const currentTheme = themePacks.find((theme) => theme.id === settings.selectedTheme) ?? themePacks.find((theme) => theme.id === currentEra.visualStyle) ?? themePacks[0];
  const [frequency, setFrequency] = useState<number>(() => loadJson('last-frequency', currentEra.defaultFrequency));
  const [codecState, setCodecState] = useState<CodecState>('idle');
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [message, setMessage] = useState('SYSTEM READY');
  const [memoryContactIds, setMemoryContactIds] = useState<string[]>(() =>
    loadJson(
      'codec-memory',
      contacts.filter((contact) => contact.unlockedByDefault).map((contact) => contact.id)
    )
  );
  const [callHistory, setCallHistory] = useState<CallHistoryEntry[]>(() => loadJson('call-history', []));
  const [customConversations] = useState(() => loadCustomConversations());

  const conversations = useMemo(
    () => mergeStudioConversations(builtInConversations, customConversations),
    [customConversations]
  );

  useEffect(() => {
    saveJson('last-frequency', frequency);
  }, [frequency]);

  useEffect(() => {
    saveJson('codec-memory', memoryContactIds);
  }, [memoryContactIds]);

  useEffect(() => {
    saveJson('call-history', callHistory);
  }, [callHistory]);

  const eraContacts = useMemo(
    () => contacts.filter((contact) => contact.era === selectedEra),
    [selectedEra]
  );

  const memoryContacts = useMemo(
    () => eraContacts.filter((contact) => contact.unlockedByDefault || memoryContactIds.includes(contact.id)),
    [eraContacts, memoryContactIds]
  );

  const scan = useMemo(() => scanFrequency(selectedEra, frequency, contacts), [selectedEra, frequency]);
  const currentLine = activeCall?.conversation.lines[lineIndex];
  const signalStrength = getSignalStrength(scan.status);

  function changeEra(eraId: EraId) {
    const era = eras.find((entry) => entry.id === eraId);
    setSelectedEra(eraId);
    onSettingsChange({ ...settings, selectedEra: eraId, selectedTheme: era?.visualStyle ?? settings.selectedTheme });
    if (era) setFrequency(era.defaultFrequency);
    endCall(false);
    setMemoryOpen(false);
    setHistoryOpen(false);
    setMessage(`ERA SWITCHED: ${era?.name ?? eraId}`);
  }

  function changeTheme(themeId: string) {
    onSettingsChange({ ...settings, selectedTheme: themeId });
    setMessage(`VISUAL PACK LOADED: ${themePacks.find((theme) => theme.id === themeId)?.name ?? themeId}`);
  }

  function tune(delta: number) {
    playBeep(640, 35, settings.uiBeepVolume * 0.08);
    setCodecState('tuning');
    setFrequency((value) => normalizeFrequency(value + delta));
    window.setTimeout(() => setCodecState((state) => (state === 'tuning' ? 'idle' : state)), 90);
  }

  function setFrequencyFromInput(value: string) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    setFrequency(normalizeFrequency(parsed));
  }

  function startCall(contact: ContactDefinition, source: ConversationTrigger = 'manual_call', conversationId?: string) {
    const conversation =
      (conversationId ? conversations.find((item) => item.id === conversationId) : undefined) ??
      getConversationForContact(contact, conversations, source);

    if (!conversation) {
      setCodecState('no_response');
      setMessage('NO CONVERSATION DATA');
      playNoResponse();
      return;
    }

    playCodecConnect();
    setActiveCall({ contact, conversation, source });
    setLineIndex(0);
    setCodecState('dialogue_playing');
    setMemoryContactIds((ids) => (ids.includes(contact.id) ? ids : [...ids, contact.id]));
    setMessage(`CONNECTED: ${contact.name}`);
  }

  function callFrequency() {
    setMemoryOpen(false);
    setHistoryOpen(false);
    const result = scanFrequency(selectedEra, frequency, contacts);

    if (!result.contact || result.status === 'none' || result.status === 'weak') {
      setCodecState('no_response');
      setMessage(result.status === 'weak' ? 'WEAK SIGNAL - NO LOCK' : 'NO RESPONSE');
      playNoResponse();
      window.setTimeout(() => setCodecState('idle'), 700);
      return;
    }

    if (result.status === 'jammed') {
      setCodecState('signal_jammed');
      setMessage('SIGNAL JAMMED');
      playNoResponse();
      return;
    }

    startCall(result.contact, 'manual_call');
  }

  function incomingCall(contactId = selectedEra === 'patriots_ai' ? 'patriots_colonel_ai' : 'campbell_mgs1', conversationId?: string) {
    const fallbackContact = eraContacts.find((contact) => contact.unlockedByDefault) ?? contacts.find((item) => item.id === contactId);
    const contact = contacts.find((item) => item.id === contactId) ?? fallbackContact;
    if (!contact) return;
    setCodecState('incoming_call');
    setMessage(`INCOMING CALL: ${contact.name}`);
    playIncomingRing();
    window.setTimeout(() => startCall(contact, 'incoming_call', conversationId), 450);
  }

  function nextLine() {
    playBeep(760, 40, settings.uiBeepVolume * 0.08);
    if (!activeCall) return;
    if (lineIndex < activeCall.conversation.lines.length - 1) {
      setLineIndex((index) => index + 1);
      return;
    }
    endCall(true);
  }

  function endCall(completed: boolean) {
    if (activeCall) {
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
        completed
      };
      setCallHistory((entries) => [entry, ...entries].slice(0, 30));
    }
    setActiveCall(null);
    setLineIndex(0);
    setCodecState('idle');
    setMessage(completed ? 'CALL ENDED' : 'SYSTEM READY');
  }

  function selectMemoryContact(contact: ContactDefinition) {
    setFrequency(contact.frequency);
    setMemoryOpen(false);
    setMessage(`MEMORY SELECTED: ${contact.name}`);
  }

  return (
    <section className={`codec-page codec-skin-${settings.selectedTheme}`}>
      <Panel className="codec-main-panel">
        <div className="codec-topbar">
          <StatusBadge label={message} tone={getToneForState(codecState, scan.status)} />
          <StatusBadge label={scan.label} tone={scan.status === 'stable' ? 'success' : scan.status === 'weak' ? 'warning' : scan.status === 'patriots_corrupt' ? 'warning' : 'neutral'} />
          <select value={selectedEra} onChange={(event) => changeEra(event.target.value as EraId)}>
            {eras.map((era) => (
              <option value={era.id} key={era.id}>{era.name}</option>
            ))}
          </select>
          <select value={settings.selectedTheme} onChange={(event) => changeTheme(event.target.value)}>
            {themePacks.map((theme) => (
              <option value={theme.id} key={theme.id}>{theme.name}</option>
            ))}
          </select>
        </div>

        <div className="codec-era-meta">
          <span>{currentEra.codecType.replace('_', ' ').toUpperCase()}</span>
          <strong>{currentTheme.name}</strong>
          <p>{currentEra.description}</p>
        </div>

        <div className="codec-frame">
          <div className="codec-portrait left">
            <span className="portrait-label">PLAYER</span>
            <span className="codec-portrait-avatar">{selectedEra === 'mgs2' ? 'R' : selectedEra === 'mgs3' ? 'BB' : selectedEra === 'mgsv' ? 'VS' : 'S'}</span>
            <strong>{selectedEra === 'mgs2' ? 'RAIDEN' : selectedEra === 'mgs3' ? 'NAKED\nSNAKE' : selectedEra === 'mgsv' ? 'VENOM\nSNAKE' : 'SOLID\nSNAKE'}</strong>
          </div>

          <div className="codec-frequency-core">
            <span className="frequency-caption">FREQUENCY / CHANNEL</span>
            <input
              className="frequency-display"
              value={formatFrequency(frequency)}
              onChange={(event) => setFrequencyFromInput(event.target.value)}
              inputMode="decimal"
            />
            <div className="signal-meter" aria-label="Signal strength">
              <span style={{ width: `${signalStrength}%` }} />
            </div>
            <div className="frequency-controls">
              <button type="button" onClick={() => tune(-0.1)}>◄◄</button>
              <button type="button" onClick={() => tune(-0.01)}>◄</button>
              <button type="button" className="call-button" onClick={callFrequency}>CALL</button>
              <button type="button" onClick={() => tune(0.01)}>►</button>
              <button type="button" onClick={() => tune(0.1)}>►►</button>
            </div>
            <div className="codec-subcontrols">
              <button type="button" onClick={() => setMemoryOpen((open) => !open)}>MEMORY</button>
              <button type="button" onClick={() => setHistoryOpen((open) => !open)}>HISTORY</button>
              <button type="button" onClick={() => incomingCall()}>SIMULATE CALL</button>
            </div>
          </div>

          <div className="codec-portrait right">
            <span className="portrait-label">CONTACT</span>
            <span className="codec-portrait-avatar contact-avatar">{activeCall ? activeCall.contact.codename?.slice(0, 2).toUpperCase() ?? 'C' : scan.contact?.codename?.slice(0, 2).toUpperCase() ?? '??'}</span>
            <strong>{activeCall ? activeCall.contact.name : scan.contact?.name ?? 'NO SIGNAL'}</strong>
          </div>
        </div>

        <div className="codec-dialogue-box">
          {activeCall && currentLine ? (
            <>
              <div className="dialogue-speaker">
                {getSpeakerLabel(currentLine.speaker, activeCall.contact)}
                {typeof currentLine.glitchLevel === 'number' && currentLine.glitchLevel > 0 && (
                  <span className="glitch-level"> GLITCH {currentLine.glitchLevel}</span>
                )}
              </div>
              <p>{currentLine.text}</p>
              <div className="dialogue-actions">
                <button type="button" onClick={nextLine}>
                  {lineIndex < activeCall.conversation.lines.length - 1 ? 'NEXT' : 'END CALL'}
                </button>
                <button type="button" onClick={() => endCall(false)}>ABORT</button>
              </div>
            </>
          ) : (
            <p className="idle-copy">
              Tune a frequency, open MEMORY, or simulate an incoming CALL. Current Codec state:{' '}
              <strong>{codecState.toUpperCase()}</strong>
            </p>
          )}
        </div>
      </Panel>

      {memoryOpen && (
        <Panel title="Codec Memory" className="side-panel">
          {memoryContacts.length === 0 && <p>No known contacts in this era yet.</p>}
          {memoryContacts.map((contact) => (
            <button key={contact.id} className="memory-row" type="button" onClick={() => selectMemoryContact(contact)}>
              <span>{formatFrequency(contact.frequency)}</span>
              <strong>{contact.name}</strong>
              <small>{contact.role}</small>
            </button>
          ))}
        </Panel>
      )}

      {historyOpen && (
        <Panel title="Call History" className="side-panel">
          {callHistory.length === 0 && <p>No call logged yet.</p>}
          {callHistory.map((entry) => (
            <div className="history-row" key={entry.callId}>
              <strong>{entry.contactName ?? 'Unknown'}</strong>
              <span>{formatFrequency(entry.frequency)} — {entry.title}</span>
              <small>{entry.timestamp}</small>
            </div>
          ))}
        </Panel>
      )}

      {!memoryOpen && !historyOpen && (
        <Panel title="Visual Pack Status" className="side-panel visual-pack-panel">
          <StatusBadge label={currentTheme.mood} tone="success" />
          <h3>{currentTheme.name}</h3>
          <p>{currentTheme.description}</p>
          <div className="visual-pack-specs">
            <div><span>Era</span><strong>{currentEra.name}</strong></div>
            <div><span>Layout</span><strong>{currentTheme.layout}</strong></div>
            <div><span>Known Contacts</span><strong>{eraContacts.length}</strong></div>
            <div><span>Memory Contacts</span><strong>{memoryContacts.length}</strong></div>
          </div>
          <div className="theme-chip-row">
            {currentTheme.effects.map((effect) => <span key={effect}>{effect}</span>)}
          </div>
          <div className="visual-pack-actions">
            {eraContacts.slice(0, 5).map((contact) => (
              <button key={contact.id} type="button" onClick={() => selectMemoryContact(contact)}>
                {formatFrequency(contact.frequency)} · {contact.codename ?? contact.name}
              </button>
            ))}
          </div>
        </Panel>
      )}
    </section>
  );
}
