import { useEffect, useMemo, useState } from 'react';
import tapesJson from '../../data/tapes.json';
import type { TapeArchiveState, TapeCategory, TapeDefinition, TapeTranscriptLine } from '../../types/tape.types';
import {
  formatTapeTime,
  getTapeProgress,
  getTapeWaveform,
  loadCustomTapes,
  loadTapeArchiveState,
  pushTapeHistory,
  sanitizeImportedTape,
  saveCustomTapes,
  saveTapeArchiveState,
  toggleTapeFavorite,
  updateTapeProgress
} from '../../systems/tapeStorage';
import { loadVrTapeUnlocks } from '../../systems/vrStorage';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

const builtInTapes = tapesJson as TapeDefinition[];
const categories: Array<{ id: TapeCategory | 'all' | 'favorites' | 'history'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'mission', label: 'Mission' },
  { id: 'intel', label: 'Intel' },
  { id: 'character', label: 'Character' },
  { id: 'mother_base', label: 'Mother Base' },
  { id: 'weapon', label: 'Weapon' },
  { id: 'anomaly', label: 'Anomaly' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'history', label: 'History' }
];

const categoryLabels: Record<TapeCategory, string> = {
  mission: 'Mission',
  intel: 'Intel',
  character: 'Character',
  mother_base: 'Mother Base',
  weapon: 'Weapon',
  anomaly: 'Anomaly'
};

const categoryTone: Record<TapeCategory, 'success' | 'warning' | 'danger' | 'neutral'> = {
  mission: 'success',
  intel: 'neutral',
  character: 'neutral',
  mother_base: 'warning',
  weapon: 'warning',
  anomaly: 'danger'
};

function clampTime(value: number, duration: number): number {
  return Math.max(0, Math.min(value, duration));
}

function getActiveTranscriptLine(lines: TapeTranscriptLine[], currentTime: number): TapeTranscriptLine | undefined {
  return [...lines].reverse().find((line) => currentTime >= line.time) ?? lines[0];
}

function getCompletionPercent(currentTime: number, duration: number): number {
  if (duration <= 0) return 0;
  return Math.round((clampTime(currentTime, duration) / duration) * 100);
}

function makeTapeLabel(tape: TapeDefinition): string {
  return `${tape.title} / ${categoryLabels[tape.category]} / ${tape.era.toUpperCase()}`;
}


function isTapeUnlocked(tape: TapeDefinition, vrUnlockedTapeIds: string[]): boolean {
  return tape.unlockState === 'unlocked' || tape.id.startsWith('custom_') || vrUnlockedTapeIds.includes(tape.id);
}

export function TapeArchive() {
  const [customTapes, setCustomTapes] = useState<TapeDefinition[]>(() => loadCustomTapes());
  const allTapes = useMemo(() => [...builtInTapes, ...customTapes], [customTapes]);
  const [archiveState, setArchiveState] = useState<TapeArchiveState>(() => loadTapeArchiveState());
  const [vrUnlockedTapeIds] = useState(() => loadVrTapeUnlocks());
  const [selectedTapeId, setSelectedTapeId] = useState(() => allTapes[0]?.id ?? '');
  const [selectedCategory, setSelectedCategory] = useState<TapeCategory | 'all' | 'favorites' | 'history'>('all');
  const [search, setSearch] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [importBuffer, setImportBuffer] = useState('');
  const [exportMode, setExportMode] = useState<'selected' | 'visible' | 'progress'>('selected');
  const [deckMessage, setDeckMessage] = useState('IDROID TAPE DECK READY');

  const selectedTape = allTapes.find((tape) => tape.id === selectedTapeId) ?? allTapes[0];
  const selectedTapeUnlocked = selectedTape ? isTapeUnlocked(selectedTape, vrUnlockedTapeIds) : false;
  const selectedProgress = selectedTape ? getTapeProgress(archiveState, selectedTape.id) : undefined;
  const waveform = useMemo(() => (selectedTape ? getTapeWaveform(selectedTape.id) : []), [selectedTape]);
  const activeLine = selectedTape && selectedProgress
    ? getActiveTranscriptLine(selectedTape.transcript, selectedProgress.currentTime)
    : undefined;

  const filteredTapes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return allTapes.filter((tape) => {
      if (selectedCategory === 'favorites' && !archiveState.favorites.includes(tape.id)) return false;
      if (selectedCategory === 'history' && !archiveState.history.includes(tape.id)) return false;
      if (selectedCategory !== 'all' && selectedCategory !== 'favorites' && selectedCategory !== 'history' && tape.category !== selectedCategory) return false;
      if (!normalizedSearch) return true;
      return [tape.title, tape.subtitle, tape.summary, tape.era, tape.category, tape.tags.join(' '), tape.speakers.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [allTapes, archiveState.favorites, archiveState.history, search, selectedCategory]);

  const stats = useMemo(() => {
    const listened = allTapes.filter((tape) => isTapeUnlocked(tape, vrUnlockedTapeIds) && getTapeProgress(archiveState, tape.id).listened).length;
    const favoriteCount = archiveState.favorites.length;
    const totalDuration = allTapes.reduce((sum, tape) => sum + tape.duration, 0);
    const locked = allTapes.filter((tape) => !isTapeUnlocked(tape, vrUnlockedTapeIds)).length;
    return { listened, favoriteCount, totalDuration, locked };
  }, [allTapes, archiveState, vrUnlockedTapeIds]);

  const exportPayload = useMemo(() => {
    if (exportMode === 'progress') return JSON.stringify(archiveState, null, 2);
    if (exportMode === 'visible') return JSON.stringify(filteredTapes, null, 2);
    return JSON.stringify(selectedTape ?? null, null, 2);
  }, [archiveState, exportMode, filteredTapes, selectedTape]);

  useEffect(() => {
    saveTapeArchiveState(archiveState);
  }, [archiveState]);

  useEffect(() => {
    if (!selectedTape || !isPlaying) return;
    const interval = window.setInterval(() => {
      setArchiveState((current) => {
        const progress = getTapeProgress(current, selectedTape.id);
        const nextTime = clampTime(progress.currentTime + 0.75, selectedTape.duration);
        const completed = nextTime >= selectedTape.duration;
        if (completed) setIsPlaying(false);
        return updateTapeProgress(current, selectedTape, {
          currentTime: nextTime,
          listened: completed || progress.listened,
          listenCount: progress.listenCount,
          lastPlayedAt: new Date().toISOString()
        });
      });
    }, 750);
    return () => window.clearInterval(interval);
  }, [isPlaying, selectedTape]);

  function persistArchive(next: TapeArchiveState, message?: string) {
    setArchiveState(next);
    if (message) setDeckMessage(message);
  }

  function selectTape(tapeId: string) {
    const tape = allTapes.find((item) => item.id === tapeId);
    if (!tape) return;
    setSelectedTapeId(tape.id);
    setIsPlaying(false);
    if (!isTapeUnlocked(tape, vrUnlockedTapeIds)) {
      setDeckMessage(`LOCKED VR REWARD: ${tape.title.toUpperCase()}`);
      return;
    }
    persistArchive(pushTapeHistory(archiveState, tape.id), `LOADED: ${tape.title.toUpperCase()}`);
  }

  function togglePlayback() {
    if (!selectedTape || !selectedProgress || !selectedTapeUnlocked) {
      setDeckMessage('TAPE LOCKED: CLEAR THE REQUIRED VR MISSION');
      return;
    }
    if (selectedProgress.currentTime >= selectedTape.duration) {
      persistArchive(updateTapeProgress(archiveState, selectedTape, { currentTime: 0 }), 'TAPE REWOUND FOR REPLAY');
    }
    setIsPlaying((current) => !current);
    persistArchive(pushTapeHistory(archiveState, selectedTape.id), isPlaying ? 'PLAYBACK PAUSED' : 'PLAYBACK STARTED');
  }

  function seekTape(value: number) {
    if (!selectedTape || !selectedTapeUnlocked) return;
    persistArchive(updateTapeProgress(archiveState, selectedTape, { currentTime: value }), 'TIMECODE ADJUSTED');
  }

  function markListened() {
    if (!selectedTape || !selectedTapeUnlocked) {
      setDeckMessage('TAPE LOCKED: CANNOT MARK AS LISTENED');
      return;
    }
    const progress = getTapeProgress(archiveState, selectedTape.id);
    persistArchive(updateTapeProgress(archiveState, selectedTape, {
      currentTime: selectedTape.duration,
      listened: true,
      listenCount: progress.listenCount + 1,
      lastPlayedAt: new Date().toISOString()
    }), 'TAPE MARKED AS LISTENED');
    setIsPlaying(false);
  }

  function resetTape() {
    if (!selectedTape || !selectedTapeUnlocked) return;
    persistArchive(updateTapeProgress(archiveState, selectedTape, { currentTime: 0, listened: false }), 'TAPE RESET');
    setIsPlaying(false);
  }

  function toggleFavorite() {
    if (!selectedTape || !selectedTapeUnlocked) {
      setDeckMessage('TAPE LOCKED: FAVORITE DISABLED');
      return;
    }
    const next = toggleTapeFavorite(archiveState, selectedTape.id);
    const isNowFavorite = next.favorites.includes(selectedTape.id);
    persistArchive(next, isNowFavorite ? 'ADDED TO FAVORITES' : 'REMOVED FROM FAVORITES');
  }

  function updateNote(note: string) {
    if (!selectedTape || !selectedTapeUnlocked) return;
    persistArchive(updateTapeProgress(archiveState, selectedTape, { note }), 'NOTE UPDATED');
  }

  function importTapes() {
    try {
      const parsed = JSON.parse(importBuffer) as unknown;
      const values = Array.isArray(parsed) ? parsed : [parsed];
      const imported = values
        .map((value) => sanitizeImportedTape(value))
        .filter((tape): tape is TapeDefinition => Boolean(tape));

      if (imported.length === 0) {
        setDeckMessage('IMPORT FAILED: NO VALID TAPE FOUND');
        return;
      }

      const next = [
        ...imported,
        ...customTapes.filter((existing) => !imported.some((item) => item.id === existing.id))
      ];
      setCustomTapes(next);
      saveCustomTapes(next);
      setSelectedTapeId(imported[0].id);
      setImportBuffer('');
      setDeckMessage(`IMPORTED ${imported.length} CUSTOM TAPE(S)`);
    } catch {
      setDeckMessage('IMPORT FAILED: INVALID JSON');
    }
  }

  function deleteCustomTape() {
    if (!selectedTape || !selectedTape.id.startsWith('custom_')) {
      setDeckMessage('ONLY CUSTOM TAPES CAN BE DELETED');
      return;
    }
    const next = customTapes.filter((tape) => tape.id !== selectedTape.id);
    setCustomTapes(next);
    saveCustomTapes(next);
    setSelectedTapeId(builtInTapes[0]?.id ?? next[0]?.id ?? '');
    setDeckMessage('CUSTOM TAPE DELETED');
  }

  if (!selectedTape || !selectedProgress) {
    return (
      <Panel title="Tape Archive">
        <p>No tape data loaded.</p>
      </Panel>
    );
  }

  const currentPercent = getCompletionPercent(selectedProgress.currentTime, selectedTape.duration);
  const isFavorite = archiveState.favorites.includes(selectedTape.id);
  const deckClassName = `tape-deck tape-pack-${selectedTape.visualPack}`;

  return (
    <section className="tape-archive-grid">
      <Panel className="tape-library-panel" title="Tape Library">
        <div className="tape-status-row">
          <StatusBadge label="TAPE ARCHIVE ONLINE" tone="success" />
          <StatusBadge label={deckMessage} tone={deckMessage.includes('FAILED') ? 'danger' : 'neutral'} />
        </div>

        <input
          className="tape-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tapes, tags, speakers..."
        />

        <div className="tape-category-strip">
          {categories.map((category) => {
            const count = category.id === 'favorites'
              ? archiveState.favorites.length
              : category.id === 'history'
                ? archiveState.history.length
                : category.id === 'all'
                  ? allTapes.length
                  : allTapes.filter((tape) => tape.category === category.id).length;
            return (
              <button
                key={category.id}
                className={`tape-chip ${selectedCategory === category.id ? 'active' : ''}`}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label} <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="tape-list" aria-label="Tape list">
          {filteredTapes.map((tape) => {
            const progress = getTapeProgress(archiveState, tape.id);
            const percent = getCompletionPercent(progress.currentTime, tape.duration);
            const unlocked = isTapeUnlocked(tape, vrUnlockedTapeIds);
            return (
              <button
                key={tape.id}
                className={`tape-row ${selectedTape.id === tape.id ? 'active' : ''} ${!unlocked ? 'locked' : ''}`}
                type="button"
                onClick={() => selectTape(tape.id)}
                title={makeTapeLabel(tape)}
              >
                <span className="tape-row-main">
                  <strong>{tape.title}</strong>
                  <small>{tape.subtitle}</small>
                </span>
                <span className="tape-row-meta">
                  <span>{tape.era.toUpperCase()}</span>
                  <span>{formatTapeTime(tape.duration)}</span>
                  <span>{!unlocked ? 'VR LOCKED' : progress.listened ? 'LISTENED' : `${percent}%`}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Panel>

      <div className="tape-main-column">
        <Panel className={deckClassName}>
          <div className="tape-deck-header">
            <div>
              <span className="tape-kicker">{selectedTape.visualPack.replace(/_/g, ' ').toUpperCase()}</span>
              <h2>{selectedTape.title}</h2>
              <p>{selectedTape.subtitle}</p>
            </div>
            <div className="tape-deck-badges">
              <StatusBadge label={categoryLabels[selectedTape.category]} tone={categoryTone[selectedTape.category]} />
              <StatusBadge label={selectedTape.importance.toUpperCase()} tone={selectedTape.importance === 'critical' ? 'danger' : 'neutral'} />
              <StatusBadge label={!selectedTapeUnlocked ? 'VR LOCKED' : isPlaying ? 'PLAYING' : 'STANDBY'} tone={!selectedTapeUnlocked ? 'danger' : isPlaying ? 'success' : 'neutral'} />
            </div>
          </div>

          <div className="cassette-window">
            <div className="cassette-reel left" />
            <div className="cassette-label">
              <span>{selectedTape.era.toUpperCase()}</span>
              <strong>{formatTapeTime(selectedProgress.currentTime)} / {formatTapeTime(selectedTape.duration)}</strong>
              <em>{currentPercent}% COMPLETE</em>
            </div>
            <div className="cassette-reel right" />
          </div>

          <div className="waveform" aria-label="Tape waveform">
            {waveform.map((height, index) => {
              const barProgress = index / Math.max(1, waveform.length - 1);
              const isActive = barProgress <= currentPercent / 100;
              return (
                <span
                  key={`${selectedTape.id}-${index}`}
                  className={isActive ? 'played' : ''}
                  style={{ height: `${Math.round(height * 100)}%` }}
                />
              );
            })}
          </div>

          <input
            className="tape-scrubber"
            type="range"
            min={0}
            max={selectedTape.duration}
            step={1}
            value={Math.round(selectedProgress.currentTime)}
            onChange={(event) => seekTape(Number(event.target.value))}
          />

          <div className="tape-controls">
            <button type="button" onClick={() => seekTape(selectedProgress.currentTime - 10)} disabled={!selectedTapeUnlocked}>-10s</button>
            <button className="primary-action" type="button" onClick={togglePlayback} disabled={!selectedTapeUnlocked}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button type="button" onClick={() => seekTape(selectedProgress.currentTime + 10)} disabled={!selectedTapeUnlocked}>+10s</button>
            <button type="button" onClick={markListened} disabled={!selectedTapeUnlocked}>Mark listened</button>
            <button type="button" onClick={resetTape} disabled={!selectedTapeUnlocked}>Reset</button>
            <button type="button" onClick={toggleFavorite} disabled={!selectedTapeUnlocked}>{isFavorite ? 'Unfavorite' : 'Favorite'}</button>
          </div>
        </Panel>

        <Panel title="Transcript / Intel Readout">
          <div className="tape-summary">
            <p>{selectedTape.summary}</p>
            <div className="tape-tags">
              {selectedTape.tags.map((tag) => <span key={tag}>#{tag}</span>)}
            </div>
          </div>

          <div className="transcript-list">
            {selectedTape.transcript.map((line, index) => {
              const nextLine = selectedTape.transcript[index + 1];
              const isActive = activeLine === line;
              const isPast = selectedProgress.currentTime >= line.time && (!nextLine || selectedProgress.currentTime >= nextLine.time);
              return (
                <button
                  key={`${line.time}-${line.speaker}-${index}`}
                  className={`transcript-row ${isActive ? 'active' : ''} ${isPast ? 'past' : ''} ${line.tag ?? ''}`}
                  type="button"
                  onClick={() => seekTape(line.time)}
                >
                  <span>{formatTapeTime(line.time)}</span>
                  <strong>{line.speaker}</strong>
                  <p>{line.text}</p>
                </button>
              );
            })}
          </div>
        </Panel>
      </div>

      <div className="tape-side-column">
        <Panel title="Archive Stats">
          <ul className="status-list">
            <li><span>Total tapes</span><strong>{allTapes.length}</strong></li>
            <li><span>Listened</span><strong>{stats.listened}</strong></li>
            <li><span>Favorites</span><strong>{stats.favoriteCount}</strong></li>
            <li><span>Total runtime</span><strong>{formatTapeTime(stats.totalDuration)}</strong></li>
            <li><span>Custom tapes</span><strong>{customTapes.length}</strong></li>
            <li><span>VR locked</span><strong>{stats.locked}</strong></li>
          </ul>
        </Panel>

        <Panel title="Tape Metadata">
          <ul className="status-list compact">
            <li><span>Speakers</span><strong>{selectedTape.speakers.join(', ')}</strong></li>
            <li><span>Location</span><strong>{selectedTape.location}</strong></li>
            <li><span>Mission</span><strong>{selectedTape.relatedMission ?? '—'}</strong></li>
            <li><span>Codec link</span><strong>{selectedTape.relatedConversation ?? '—'}</strong></li>
            <li><span>Unlock</span><strong>{selectedTapeUnlocked ? 'UNLOCKED' : selectedTape.unlockState.toUpperCase()}</strong></li>
          </ul>
        </Panel>

        <Panel title="Field Note">
          <textarea
            className="tape-note"
            value={selectedProgress.note ?? ''}
            disabled={!selectedTapeUnlocked}
            onChange={(event) => updateNote(event.target.value)}
            placeholder="Add a local note for this tape..."
          />
        </Panel>

        <Panel title="Import / Export">
          <div className="tape-import-actions">
            <select value={exportMode} onChange={(event) => setExportMode(event.target.value as typeof exportMode)}>
              <option value="selected">Selected tape</option>
              <option value="visible">Visible tapes</option>
              <option value="progress">Progress/favorites</option>
            </select>
            <button type="button" onClick={deleteCustomTape}>Delete custom</button>
          </div>
          <textarea className="tape-export" readOnly value={exportPayload} />
          <textarea
            className="tape-import"
            value={importBuffer}
            onChange={(event) => setImportBuffer(event.target.value)}
            placeholder="Paste a tape JSON or an array of tapes, then import..."
          />
          <button className="primary-action" type="button" onClick={importTapes}>Import custom tape JSON</button>
        </Panel>
      </div>
    </section>
  );
}
