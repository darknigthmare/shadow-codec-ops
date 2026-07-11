import { useEffect, useMemo, useState } from 'react';
import type {
  CodecContextDefinition,
  ContactDefinition,
  EraId,
  RadioCarrierDefinition,
  RadioIntelState,
  RadioSignalDefinition
} from '../../types/codec.types';
import {
  RADIO_LOCK_THRESHOLD,
  buildRadioCarriers,
  buildRadioSpectrum,
  findNextRadioPeak,
  getRadioBand,
  getRadioSignalHits,
  getSignalByCarrier,
  validateRadioPuzzleAnswer
} from '../../systems/radioSignalEngine';
import {
  exportRadioIntelBundle,
  loadRadioIntelState,
  recordRadioDiscovery,
  recordRadioPuzzleAttempt,
  recordRadioScan,
  saveRadioIntelState,
  updateRadioDiscoveryNote
} from '../../systems/radioIntelStorage';
import { formatFrequency, normalizeFrequency } from '../../systems/frequencyEngine';
import { resolveLocalizedText } from '../../systems/localizationEngine';
import type { AppLocale } from '../../types/narrative.types';

interface RadioScanPanelProps {
  era: EraId;
  context: CodecContextDefinition;
  frequency: number;
  contacts: ContactDefinition[];
  signals: RadioSignalDefinition[];
  memoryContactIds: string[];
  locale: AppLocale;
  onFrequencyChange: (frequency: number) => void;
  onRouteContact: (contactId: string, frequency: number) => void;
  onStartTransmission: (signal: RadioSignalDefinition) => void;
  onUnlockContact: (contactId: string) => void;
  onMessage: (message: string) => void;
}

type JournalFilter = 'all' | 'decoded' | 'unresolved';
type SpectrumMode = 'era' | 'local';

function downloadJson(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function getCarrierStatusLabel(carrier: RadioCarrierDefinition, discovered: boolean): string {
  if (carrier.kind === 'contact') return carrier.hidden ? 'CLASSIFIED CONTACT' : 'KNOWN CONTACT';
  if (!discovered && carrier.hidden) return 'UNKNOWN EMISSION';
  if (carrier.encrypted) return 'ENCRYPTED SIGNAL';
  return carrier.kind.replace(/_/g, ' ').toUpperCase();
}

export function RadioScanPanel({
  era,
  context,
  frequency,
  contacts,
  signals,
  memoryContactIds,
  locale,
  onFrequencyChange,
  onRouteContact,
  onStartTransmission,
  onUnlockContact,
  onMessage
}: RadioScanPanelProps) {
  const [intelState, setIntelState] = useState<RadioIntelState>(() => loadRadioIntelState());
  const [autoScanning, setAutoScanning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [selectedCarrierId, setSelectedCarrierId] = useState<string | null>(null);
  const [puzzleAnswer, setPuzzleAnswer] = useState('');
  const [puzzleMessage, setPuzzleMessage] = useState('');
  const [journalFilter, setJournalFilter] = useState<JournalFilter>('all');
  const [spectrumMode, setSpectrumMode] = useState<SpectrumMode>('era');

  const discoveredSignalIds = useMemo(() => Object.keys(intelState.discoveries), [intelState.discoveries]);
  const carriers = useMemo(() => buildRadioCarriers(
    contacts,
    signals,
    era,
    context.id,
    context.flags,
    discoveredSignalIds,
    memoryContactIds
  ), [contacts, signals, era, context, discoveredSignalIds, memoryContactIds]);

  const eraBand = useMemo(() => getRadioBand(carriers, frequency), [carriers, frequency]);
  const band = useMemo(() => spectrumMode === 'local'
    ? { min: normalizeFrequency(Math.max(100, frequency - 0.8)), max: normalizeFrequency(Math.min(200, frequency + 0.8)) }
    : eraBand, [spectrumMode, eraBand, frequency]);
  const spectrum = useMemo(() => buildRadioSpectrum(carriers, band, 180, phase), [carriers, band, phase]);
  const hits = useMemo(() => getRadioSignalHits(frequency, carriers, phase), [frequency, carriers, phase]);
  const strongestHit = hits[0];
  const selectedCarrier = carriers.find((carrier) => carrier.id === selectedCarrierId) ?? strongestHit?.carrier;
  const selectedSignal = getSignalByCarrier(selectedCarrier, signals);
  const selectedDiscovery = selectedSignal ? intelState.discoveries[selectedSignal.id] : undefined;
  const selectedDecoded = selectedDiscovery?.status === 'decoded' || selectedDiscovery?.status === 'intercepted';
  const currentStrength = strongestHit?.strength ?? 0;
  const markerX = ((frequency - band.min) / Math.max(0.001, band.max - band.min)) * 100;

  const journalSignals = useMemo(() => signals
    .filter((signal) => signal.era === era && intelState.discoveries[signal.id])
    .filter((signal) => {
      const status = intelState.discoveries[signal.id].status;
      if (journalFilter === 'decoded') return status === 'decoded' || status === 'intercepted';
      if (journalFilter === 'unresolved') return status === 'discovered';
      return true;
    })
    .sort((a, b) => intelState.discoveries[b.id].updatedAt.localeCompare(intelState.discoveries[a.id].updatedAt)),
  [signals, era, intelState.discoveries, journalFilter]);

  function commit(next: RadioIntelState): void {
    const saved = saveRadioIntelState(next);
    setIntelState(saved);
  }

  useEffect(() => {
    const timer = window.setInterval(() => setPhase((value) => (value + 0.035) % 1), 110);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setSelectedCarrierId(null);
    setPuzzleAnswer('');
    setPuzzleMessage('');
  }, [era, context.id]);

  function lockCarrier(carrier: RadioCarrierDefinition, strength: number): void {
    setSelectedCarrierId(carrier.id);
    let next = recordRadioScan(intelState, era, carrier.frequency);
    onFrequencyChange(carrier.frequency);

    if (carrier.kind === 'contact') {
      commit(next);
      if (carrier.contactId) onRouteContact(carrier.contactId, carrier.frequency);
      onMessage(carrier.hidden ? 'CLASSIFIED CONTACT CARRIER LOCKED' : `CONTACT CARRIER LOCKED: ${carrier.label.toUpperCase()}`);
      return;
    }

    const signal = getSignalByCarrier(carrier, signals);
    if (!signal) {
      commit(next);
      onMessage('UNRESOLVED CARRIER LOCK');
      return;
    }

    const status = signal.encrypted || signal.puzzle ? 'discovered' : 'intercepted';
    next = recordRadioDiscovery(next, signal, context.id, status);
    commit(next);
    if (status === 'intercepted' && signal.reward?.unlockContactId) onUnlockContact(signal.reward.unlockContactId);
    setPuzzleMessage(status === 'intercepted' ? 'TRANSMISSION INTERCEPTED' : 'ENCRYPTED PAYLOAD CAPTURED');
    onMessage(`${status === 'intercepted' ? 'INTERCEPT' : 'CIPHER'} LOCKED: ${signal.label.toUpperCase()} · ${Math.round(strength * 100)}%`);
  }

  function lockCurrentFrequency(): void {
    const hit = hits.find((candidate) => candidate.locked) ?? strongestHit;
    if (!hit || hit.strength < RADIO_LOCK_THRESHOLD) {
      commit(recordRadioScan(intelState, era, frequency));
      setPuzzleMessage('NO STABLE LOCK — CENTER THE CARRIER ABOVE 72%');
      onMessage('SIGNAL LOCK FAILED');
      return;
    }
    lockCarrier(hit.carrier, hit.strength);
  }

  useEffect(() => {
    if (!autoScanning) return;
    const span = Math.max(0.1, eraBand.max - eraBand.min);
    const step = Math.max(0.01, span / 360);
    const timer = window.setInterval(() => {
      const nextFrequency = frequency + step > eraBand.max ? eraBand.min : normalizeFrequency(frequency + step);
      onFrequencyChange(nextFrequency);
      const nextHit = getRadioSignalHits(nextFrequency, carriers, phase).find((hit) => hit.locked);
      if (nextHit) {
        setAutoScanning(false);
        lockCarrier(nextHit.carrier, nextHit.strength);
      }
    }, 85);
    return () => window.clearInterval(timer);
  }, [autoScanning, frequency, eraBand, carriers, phase]);

  function jumpPeak(direction: 1 | -1): void {
    const carrier = findNextRadioPeak(frequency, carriers, direction);
    if (!carrier) return;
    onFrequencyChange(carrier.frequency);
    setSelectedCarrierId(carrier.id);
    onMessage(`PEAK ACQUIRED: ${formatFrequency(carrier.frequency)}`);
  }

  function solvePuzzle(): void {
    if (!selectedSignal?.puzzle || !selectedDiscovery) return;
    const solved = validateRadioPuzzleAnswer(selectedSignal, puzzleAnswer);
    let next = recordRadioPuzzleAttempt(intelState, selectedSignal.id, solved);
    if (solved) {
      next = recordRadioDiscovery(next, selectedSignal, context.id, 'decoded');
      if (selectedSignal.reward?.unlockContactId) onUnlockContact(selectedSignal.reward.unlockContactId);
      setPuzzleMessage(`DECRYPTION COMPLETE · +${selectedSignal.reward?.intelPoints ?? 10} INTEL`);
      onMessage(`SIGNAL DECODED: ${selectedSignal.label.toUpperCase()}`);
      setPuzzleAnswer('');
    } else {
      const attempts = (next.discoveries[selectedSignal.id]?.attempts ?? 0);
      const limit = selectedSignal.puzzle.attemptsLimit;
      setPuzzleMessage(limit ? `INVALID KEY · ATTEMPT ${attempts}/${limit}` : `INVALID KEY · ATTEMPT ${attempts}`);
      onMessage('DECRYPTION KEY REJECTED');
    }
    commit(next);
  }

  function updateNote(note: string): void {
    if (!selectedSignal) return;
    commit(updateRadioDiscoveryNote(intelState, selectedSignal.id, note));
  }

  function selectJournalSignal(signal: RadioSignalDefinition): void {
    setSelectedCarrierId(`signal:${signal.id}`);
    onFrequencyChange(signal.frequency);
    setPuzzleMessage('INTELLIGENCE RECORD LOADED');
  }

  function clickSpectrum(event: React.MouseEvent<SVGSVGElement>): void {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    onFrequencyChange(normalizeFrequency(band.min + (band.max - band.min) * ratio));
  }

  const points = spectrum.map((point, index) => {
    const x = (index / Math.max(1, spectrum.length - 1)) * 100;
    const y = 94 - point.strength * 82;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');

  return (
    <div className="radio-intel-console">
      <header className="radio-intel-heading">
        <div><span>SIGNAL INTELLIGENCE</span><h3>{context.name}</h3></div>
        <div className="radio-intel-stats">
          <span>INTEL <strong>{intelState.intelPoints}</strong></span>
          <span>FOUND <strong>{Object.keys(intelState.discoveries).length}</strong></span>
          <span>DECODED <strong>{intelState.decodedCount}</strong></span>
        </div>
      </header>

      <div className="radio-spectrum-toolbar">
        <button type="button" className={spectrumMode === 'era' ? 'active' : ''} onClick={() => setSpectrumMode('era')}>ERA BAND</button>
        <button type="button" className={spectrumMode === 'local' ? 'active' : ''} onClick={() => setSpectrumMode('local')}>LOCAL ±0.80</button>
        <button type="button" onClick={() => jumpPeak(-1)}>◀ PREV PEAK</button>
        <button type="button" onClick={() => jumpPeak(1)}>NEXT PEAK ▶</button>
        <button type="button" className={autoScanning ? 'danger' : ''} onClick={() => setAutoScanning((value) => !value)}>{autoScanning ? 'STOP SWEEP' : 'AUTO SWEEP'}</button>
        <button type="button" className="primary" onClick={lockCurrentFrequency}>LOCK SIGNAL</button>
      </div>

      <div className="radio-spectrum-shell">
        <div className="radio-spectrum-readout">
          <span>{formatFrequency(band.min)}</span>
          <strong>{formatFrequency(frequency)} MHz</strong>
          <span>{formatFrequency(band.max)}</span>
        </div>
        <svg className="radio-spectrum" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Radio frequency spectrum" onClick={clickSpectrum}>
          <defs>
            <linearGradient id="spectrum-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity="0.5"/><stop offset="100%" stopColor="currentColor" stopOpacity="0.02"/></linearGradient>
          </defs>
          <path d={`M0,100 L${points.replace(/ /g, ' L')} L100,100 Z`} fill="url(#spectrum-fill)" />
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
          <line x1={Math.max(0, Math.min(100, markerX))} x2={Math.max(0, Math.min(100, markerX))} y1="0" y2="100" className="spectrum-marker" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="radio-signal-strength"><span style={{ width: `${Math.round(currentStrength * 100)}%` }} /><strong>{Math.round(currentStrength * 100)}% LOCK</strong></div>
      </div>

      <div className="radio-intel-columns">
        <section className="radio-live-lock">
          <span>LIVE CARRIER</span>
          {strongestHit ? (
            <>
              <h4>{getCarrierStatusLabel(strongestHit.carrier, Boolean(strongestHit.carrier.signalId && intelState.discoveries[strongestHit.carrier.signalId]))}</h4>
              <p>{formatFrequency(strongestHit.carrier.frequency)} · OFFSET {strongestHit.offset.toFixed(3)} · {Math.round(strongestHit.strength * 100)}%</p>
              <small>{strongestHit.locked ? 'LOCK WINDOW OPEN' : 'FINE TUNING REQUIRED'}</small>
            </>
          ) : <p>Only background noise is present at this frequency.</p>}
        </section>

        <section className="radio-payload-card">
          <span>CAPTURED PAYLOAD</span>
          {selectedSignal && selectedDiscovery ? (
            <>
              <div className="radio-payload-title"><h4>{selectedSignal.label}</h4><b>{selectedDiscovery.status.toUpperCase()}</b></div>
              <p>{selectedSignal.codename ?? selectedSignal.kind.replace(/_/g, ' ')}</p>
              {selectedSignal.puzzle && selectedDiscovery.status !== 'decoded' ? (
                <div className="radio-puzzle">
                  <strong>{resolveLocalizedText(selectedSignal.puzzle.prompt, locale)}</strong>
                  <small>HINT: {resolveLocalizedText(selectedSignal.puzzle.hint, locale)}</small>
                  <div><input value={puzzleAnswer} onChange={(event) => setPuzzleAnswer(event.target.value)} placeholder="DECRYPTION KEY" onKeyDown={(event) => { if (event.key === 'Enter') solvePuzzle(); }} /><button type="button" onClick={solvePuzzle}>DECRYPT</button></div>
                </div>
              ) : selectedDecoded && selectedSignal.transcript ? (
                <blockquote>{resolveLocalizedText(selectedSignal.transcript, locale)}</blockquote>
              ) : <p>Payload stored. Decryption is still required.</p>}
              {puzzleMessage && <small className="radio-puzzle-message">{puzzleMessage}</small>}
              {selectedDecoded && selectedSignal.contactId && selectedSignal.conversationId && (
                <button type="button" className="primary" onClick={() => onStartTransmission(selectedSignal)}>OPEN CODEC TRANSMISSION</button>
              )}
              <label className="radio-note-field">OPERATOR NOTE<textarea value={selectedDiscovery.note ?? ''} onChange={(event) => updateNote(event.target.value)} placeholder="Add a private analysis note..." /></label>
            </>
          ) : <p>Lock a non-standard signal to create an intelligence record.</p>}
        </section>
      </div>

      <section className="radio-journal">
        <div className="radio-journal-heading">
          <div><span>DISCOVERY JOURNAL</span><strong>{journalSignals.length} RECORDS</strong></div>
          <div>
            <select aria-label="Radio journal filter" value={journalFilter} onChange={(event) => setJournalFilter(event.target.value as JournalFilter)}><option value="all">ALL</option><option value="decoded">INTERCEPTED / DECODED</option><option value="unresolved">UNRESOLVED</option></select>
            <button type="button" onClick={() => downloadJson(`shadow-codec-radio-intel-${era}.json`, exportRadioIntelBundle(intelState, signals))}>EXPORT INTEL</button>
          </div>
        </div>
        <div className="radio-journal-list">
          {journalSignals.length === 0 && <p>No signals discovered in this era.</p>}
          {journalSignals.map((signal) => {
            const discovery = intelState.discoveries[signal.id];
            return <button type="button" key={signal.id} className={selectedSignal?.id === signal.id ? 'active' : ''} onClick={() => selectJournalSignal(signal)}><span>{formatFrequency(signal.frequency)}</span><strong>{signal.label}</strong><small>{discovery.status} · {discovery.attempts} attempts</small></button>;
          })}
        </div>
      </section>
    </div>
  );
}
