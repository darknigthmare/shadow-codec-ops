import '../../styles/lore.css';
import { useEffect, useMemo, useState } from 'react';
import loreEntriesJson from '../../data/loreEntries.json';
import contactsJson from '../../data/contacts.json';
import erasJson from '../../data/eras.json';
import missionsJson from '../../data/missions.json';
import itemsJson from '../../data/items.json';
import enemiesJson from '../../data/enemies.json';
import bossesJson from '../../data/bosses.json';
import tapesJson from '../../data/tapes.json';
import vrMissionsJson from '../../data/vrMissions.json';
import type { AppRoute } from '../../app/AppLayout';
import type { ContactDefinition, EraDefinition, EraId } from '../../types/codec.types';
import type { MissionDefinition } from '../../types/mission.types';
import type { TapeDefinition } from '../../types/tape.types';
import type { VrMissionDefinition } from '../../types/vr.types';
import type { LoreCanonStatus, LoreCategory, LoreEntry, LoreImportance, LoreLink } from '../../types/lore.types';
import {
  exportLoreBundle,
  getLoreNote,
  loadCustomLoreEntries,
  loadLoreState,
  pushLoreHistory,
  sanitizeImportedLoreEntry,
  saveCustomLoreEntries,
  saveLoreState,
  toggleLoreFavorite,
  updateLoreNote
} from '../../systems/loreStorage';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';
import { consumeCampaignLaunchDirective, recordCampaignLoreViewed } from '../../systems/campaignStorage';

interface LoreDatabaseProps {
  onRouteChange?: (route: AppRoute) => void;
}

interface ItemRecord {
  id: string;
  name: string;
  category: string;
  era: EraId;
  description: string;
}

interface EnemyRecord {
  id: string;
  name: string;
  era: EraId;
  visionRange: number;
  hearingRange: number;
  health: number;
  canCallBackup: boolean;
  alertBehavior: string;
  notes: string;
}

interface BossRecord {
  id: string;
  name: string;
  era: EraId;
  health: number;
  phaseCount: number;
  weakness: string;
  description: string;
}

const baseLoreEntries = loreEntriesJson as LoreEntry[];
const contacts = contactsJson as ContactDefinition[];
const eras = erasJson as EraDefinition[];
const missions = missionsJson as MissionDefinition[];
const items = itemsJson as ItemRecord[];
const enemies = enemiesJson as EnemyRecord[];
const bosses = bossesJson as BossRecord[];
const tapes = tapesJson as TapeDefinition[];
const vrMissions = vrMissionsJson as VrMissionDefinition[];

const categoryLabels: Record<LoreCategory | 'all' | 'favorites' | 'history' | 'notes', string> = {
  all: 'All',
  favorites: 'Favorites',
  history: 'History',
  notes: 'Notes',
  character: 'Characters',
  organization: 'Organizations',
  location: 'Locations',
  event: 'Events',
  item: 'Items',
  boss: 'Bosses',
  enemy: 'Enemies',
  mission: 'Missions',
  frequency: 'Frequencies',
  tape: 'Tapes',
  vr: 'VR',
  system: 'Systems'
};

const canonLabels: Record<LoreCanonStatus | 'all', string> = {
  all: 'All canon layers',
  canon: 'Canon reference',
  simulation: 'Simulation layer',
  gameplay: 'Gameplay system',
  custom: 'Custom local'
};

const importanceTone: Record<LoreImportance, 'success' | 'warning' | 'danger' | 'neutral'> = {
  low: 'neutral',
  medium: 'neutral',
  high: 'warning',
  critical: 'danger'
};

const canonTone: Record<LoreCanonStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  canon: 'success',
  simulation: 'warning',
  gameplay: 'neutral',
  custom: 'danger'
};

const categoryOrder: Array<LoreCategory | 'all' | 'favorites' | 'history' | 'notes'> = [
  'all',
  'character',
  'organization',
  'location',
  'mission',
  'frequency',
  'item',
  'enemy',
  'boss',
  'tape',
  'vr',
  'system',
  'favorites',
  'history',
  'notes'
];

const routeByLinkType: Partial<Record<LoreLink['type'], AppRoute>> = {
  contact: 'codec',
  conversation: 'codec',
  frequency: 'codec',
  mission: 'sideops',
  item: 'sideops',
  enemy: 'sideops',
  boss: 'sideops',
  tape: 'tapes',
  vr: 'vr',
  system: 'settings'
};

function formatFrequency(value?: number): string {
  return typeof value === 'number' ? value.toFixed(2) : '—';
}

function humanize(value: string): string {
  return value.replace(/_/g, ' ');
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function contactToLoreEntry(contact: ContactDefinition): LoreEntry {
  return {
    id: `contact_${contact.id}`,
    title: contact.name,
    subtitle: `${humanize(contact.role)} / ${contact.era.toUpperCase()} / ${formatFrequency(contact.frequency)}`,
    category: 'character',
    era: contact.era,
    canonStatus: contact.id.includes('simulation') || contact.era === 'patriots_ai' ? 'simulation' : 'canon',
    importance: contact.unlockedByDefault ? 'high' : contact.isSecret ? 'critical' : 'medium',
    summary: contact.description,
    details: [
      `Frequency: ${formatFrequency(contact.frequency)}`,
      `Availability: ${contact.availability}`,
      `Role: ${humanize(contact.role)}`,
      `Specialties: ${contact.specialties.join(', ')}`
    ],
    tags: unique([contact.era, contact.role, ...contact.specialties, contact.isSecret ? 'secret' : 'memory']),
    aliases: contact.codename ? [contact.codename] : [],
    frequency: contact.frequency,
    related: [
      { type: 'contact', id: contact.id, label: contact.name },
      { type: 'conversation', id: contact.defaultConversation, label: 'Default conversation' },
      { type: 'frequency', id: `frequency_${contact.id}`, label: formatFrequency(contact.frequency) }
    ]
  };
}

function contactFrequencyToLoreEntry(contact: ContactDefinition): LoreEntry {
  return {
    id: `frequency_${contact.id}`,
    title: `${formatFrequency(contact.frequency)} — ${contact.name}`,
    subtitle: `${contact.era.toUpperCase()} signal / ${humanize(contact.role)}`,
    category: 'frequency',
    era: contact.era,
    canonStatus: contact.era === 'mgsv' || contact.era === 'mgs4' || contact.era === 'patriots_ai' ? 'simulation' : 'canon',
    importance: contact.unlockedByDefault ? 'high' : 'medium',
    summary: `Codec/radio frequency record for ${contact.name}.`,
    details: [
      `Frequency: ${formatFrequency(contact.frequency)}`,
      `Memory visibility: ${contact.unlockedByDefault ? 'default memory contact' : 'locked/conditional memory contact'}`,
      `Signal behavior: ${contact.availability}`,
      contact.isSecret ? 'Secret contact: hidden unless discovered by mission or manual scan.' : 'Standard contact entry.'
    ],
    tags: unique(['frequency', 'codec', contact.era, contact.role, contact.availability]),
    frequency: contact.frequency,
    related: [
      { type: 'contact', id: contact.id, label: contact.name },
      { type: 'conversation', id: contact.defaultConversation, label: 'Default call' }
    ]
  };
}

function missionToLoreEntry(mission: MissionDefinition): LoreEntry {
  return {
    id: `mission_${mission.id}`,
    title: mission.title,
    subtitle: `${mission.location} / ${humanize(mission.mode)} / difficulty ${mission.difficulty}`,
    category: 'mission',
    era: mission.era,
    canonStatus: 'simulation',
    importance: 'critical',
    summary: `Playable Side Ops mission for ${humanize(mission.mainCharacter)} at ${mission.location}.`,
    details: [
      `Map key: ${mission.mapKey}`,
      `Objectives: ${mission.objectives.map((objective) => objective.label).join(' → ')}`,
      `Available items: ${mission.availableItems.join(', ')}`,
      `Enemies: ${mission.enemies.join(', ')}`,
      `Codec triggers: ${mission.codecTriggers.map((trigger) => trigger.trigger).join(', ')}`
    ],
    tags: unique(['side ops', 'mission', mission.era, mission.mode, mission.location.toLowerCase(), mission.mainCharacter]),
    related: [
      { type: 'mission', id: mission.id, label: mission.title },
      { type: 'conversation', id: mission.briefingConversation, label: 'Briefing call' },
      { type: 'conversation', id: mission.debriefingConversation, label: 'Debriefing call' },
      ...(mission.boss ? [{ type: 'boss' as const, id: mission.boss, label: 'Mission boss' }] : [])
    ]
  };
}

function itemToLoreEntry(item: ItemRecord): LoreEntry {
  return {
    id: `item_${item.id}`,
    title: item.name,
    subtitle: `${item.category} / ${item.era.toUpperCase()}`,
    category: 'item',
    era: item.era,
    canonStatus: 'gameplay',
    importance: item.category === 'weapon' || item.category === 'gadget' ? 'high' : 'medium',
    summary: item.description,
    details: [
      `Gameplay category: ${item.category}`,
      `Era pack: ${item.era}`,
      'Tracked in Side Ops and available for future VR Mission requirement rules.'
    ],
    tags: unique([item.category, item.era, item.name.toLowerCase(), 'side ops']),
    related: [{ type: 'item', id: item.id, label: item.name }]
  };
}

function enemyToLoreEntry(enemy: EnemyRecord): LoreEntry {
  return {
    id: `enemy_${enemy.id}`,
    title: enemy.name,
    subtitle: `${humanize(enemy.alertBehavior)} / HP ${enemy.health}`,
    category: 'enemy',
    era: enemy.era,
    canonStatus: enemy.id.includes('captain') ? 'simulation' : 'gameplay',
    importance: enemy.id.includes('captain') ? 'high' : 'medium',
    summary: enemy.notes,
    details: [
      `Vision range: ${enemy.visionRange}`,
      `Hearing range: ${enemy.hearingRange}`,
      `Can call backup: ${enemy.canCallBackup ? 'yes' : 'no'}`,
      `Behavior: ${humanize(enemy.alertBehavior)}`
    ],
    tags: unique(['enemy', enemy.era, enemy.alertBehavior, enemy.canCallBackup ? 'backup' : 'no backup']),
    related: [{ type: 'enemy', id: enemy.id, label: enemy.name }]
  };
}

function bossToLoreEntry(boss: BossRecord): LoreEntry {
  return {
    id: `boss_${boss.id}`,
    title: boss.name,
    subtitle: `${boss.phaseCount} phases / HP ${boss.health}`,
    category: 'boss',
    era: boss.era,
    canonStatus: 'simulation',
    importance: 'high',
    summary: boss.description,
    details: [
      `Health: ${boss.health}`,
      `Phase count: ${boss.phaseCount}`,
      `Weakness / doctrine: ${humanize(boss.weakness)}`,
      'Designed as a local boss systems test before adding era-specific major bosses.'
    ],
    tags: unique(['boss', boss.era, boss.weakness, 'side ops']),
    related: [
      { type: 'boss', id: boss.id, label: boss.name },
      { type: 'mission', id: 'shadow_dock_001', label: 'Dock Infiltration' }
    ]
  };
}

function tapeToLoreEntry(tape: TapeDefinition): LoreEntry {
  return {
    id: `tape_${tape.id}`,
    title: tape.title,
    subtitle: `${humanize(tape.category)} / ${tape.era.toUpperCase()} / ${Math.round(tape.duration / 60)} min`,
    category: 'tape',
    era: tape.era,
    canonStatus: tape.id.startsWith('custom_') ? 'custom' : 'simulation',
    importance: tape.importance,
    summary: tape.summary,
    details: [
      `Subtitle: ${tape.subtitle}`,
      `Speakers: ${tape.speakers.join(', ')}`,
      `Location: ${tape.location}`,
      `Unlock state: ${tape.unlockState}`,
      `Transcript lines: ${tape.transcript.length}`
    ],
    tags: unique(['tape', tape.category, tape.era, tape.visualPack, ...tape.tags]),
    related: [
      { type: 'tape', id: tape.id, label: tape.title },
      ...(tape.relatedMission ? [{ type: 'mission' as const, id: tape.relatedMission, label: 'Related mission' }] : []),
      ...(tape.relatedConversation ? [{ type: 'conversation' as const, id: tape.relatedConversation, label: 'Related conversation' }] : [])
    ]
  };
}

function vrToLoreEntry(mission: VrMissionDefinition): LoreEntry {
  return {
    id: `vr_${mission.id}`,
    title: mission.title,
    subtitle: `${humanize(mission.category)} / difficulty ${mission.difficulty}`,
    category: 'vr',
    era: mission.era,
    canonStatus: 'gameplay',
    importance: mission.difficulty >= 4 ? 'high' : 'medium',
    summary: mission.objective,
    details: [
      `Briefing: ${mission.briefing}`,
      `Map variant: ${mission.mapVariant}`,
      `Restrictions: ${mission.restrictions.join(', ')}`,
      `Recommended gear: ${mission.recommendedGear.join(', ')}`,
      `Rewards: ${mission.rewards.map((reward) => reward.badge).join(', ') || 'none'}`
    ],
    tags: unique(['vr', mission.category, mission.era, mission.visualPack, ...mission.recommendedGear.map((gear) => gear.toLowerCase())]),
    related: [
      { type: 'vr', id: mission.id, label: mission.title },
      ...mission.rewards
        .filter((reward) => reward.tapeId)
        .map((reward) => ({ type: 'tape' as const, id: reward.tapeId as string, label: `${reward.unlockRank} reward tape` }))
    ]
  };
}

function buildAutoLoreEntries(): LoreEntry[] {
  return [
    ...contacts.map(contactToLoreEntry),
    ...contacts.map(contactFrequencyToLoreEntry),
    ...missions.map(missionToLoreEntry),
    ...items.map(itemToLoreEntry),
    ...enemies.map(enemyToLoreEntry),
    ...bosses.map(bossToLoreEntry),
    ...tapes.map(tapeToLoreEntry),
    ...vrMissions.map(vrToLoreEntry)
  ];
}

function getEraName(eraId: LoreEntry['era']): string {
  if (eraId === 'multi') return 'Multi-era';
  return eras.find((era) => era.id === eraId)?.name ?? eraId.toUpperCase();
}

function getLinkRoute(link: LoreLink): AppRoute | undefined {
  return routeByLinkType[link.type];
}

function entrySearchBlob(entry: LoreEntry): string {
  return [
    entry.title,
    entry.subtitle,
    entry.summary,
    entry.category,
    entry.era,
    entry.canonStatus,
    entry.importance,
    entry.timeline ?? '',
    ...(entry.details ?? []),
    ...(entry.tags ?? []),
    ...(entry.aliases ?? []),
    ...(entry.affiliations ?? []),
    ...(entry.related ?? []).flatMap((link) => [link.type, link.id, link.label ?? ''])
  ].join(' ').toLowerCase();
}

function makeEntryJson(entry: LoreEntry): string {
  return JSON.stringify(entry, null, 2);
}

export function LoreDatabase({ onRouteChange }: LoreDatabaseProps) {
  const [campaignDirective] = useState(() => consumeCampaignLaunchDirective('lore'));
  const [customEntries, setCustomEntries] = useState<LoreEntry[]>(() => loadCustomLoreEntries());
  const [state, setState] = useState(() => loadLoreState());
  const [selectedCategory, setSelectedCategory] = useState<LoreCategory | 'all' | 'favorites' | 'history' | 'notes'>('all');
  const [selectedEra, setSelectedEra] = useState<LoreEntry['era'] | 'all'>('all');
  const [selectedCanon, setSelectedCanon] = useState<LoreCanonStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedEntryId, setSelectedEntryId] = useState(campaignDirective?.targetId ?? 'lore_codec_system');
  const [importBuffer, setImportBuffer] = useState('');
  const [exportMode, setExportMode] = useState<'selected' | 'visible' | 'all' | 'state'>('selected');
  const [systemMessage, setSystemMessage] = useState('LORE DATABASE ONLINE');

  const allEntries = useMemo(() => {
    const entries = [...baseLoreEntries, ...buildAutoLoreEntries(), ...customEntries];
    const seen = new Set<string>();
    return entries.filter((entry) => {
      if (seen.has(entry.id)) return false;
      seen.add(entry.id);
      return true;
    });
  }, [customEntries]);

  const selectedEntry = allEntries.find((entry) => entry.id === selectedEntryId) ?? allEntries[0];
  const selectedNote = selectedEntry ? getLoreNote(state, selectedEntry.id) : undefined;

  const filteredEntries = useMemo(() => {
    const normalizedSearch = normalize(search);
    return allEntries.filter((entry) => {
      if (selectedCategory === 'favorites' && !state.favorites.includes(entry.id)) return false;
      if (selectedCategory === 'history' && !state.history.includes(entry.id)) return false;
      if (selectedCategory === 'notes' && !state.notes.some((note) => note.entryId === entry.id)) return false;
      if (selectedCategory !== 'all' && selectedCategory !== 'favorites' && selectedCategory !== 'history' && selectedCategory !== 'notes' && entry.category !== selectedCategory) return false;
      if (selectedEra !== 'all' && entry.era !== selectedEra) return false;
      if (selectedCanon !== 'all' && entry.canonStatus !== selectedCanon) return false;
      if (!normalizedSearch) return true;
      return entrySearchBlob(entry).includes(normalizedSearch);
    });
  }, [allEntries, search, selectedCanon, selectedCategory, selectedEra, state.favorites, state.history, state.notes]);

  const stats = useMemo(() => {
    const byCategory = categoryOrder.reduce<Record<string, number>>((acc, category) => {
      if (category === 'all') acc[category] = allEntries.length;
      else if (category === 'favorites') acc[category] = state.favorites.length;
      else if (category === 'history') acc[category] = state.history.length;
      else if (category === 'notes') acc[category] = state.notes.length;
      else acc[category] = allEntries.filter((entry) => entry.category === category).length;
      return acc;
    }, {});
    const canon = allEntries.filter((entry) => entry.canonStatus === 'canon').length;
    const simulation = allEntries.filter((entry) => entry.canonStatus === 'simulation').length;
    const gameplay = allEntries.filter((entry) => entry.canonStatus === 'gameplay').length;
    const custom = allEntries.filter((entry) => entry.canonStatus === 'custom').length;
    return { byCategory, canon, simulation, gameplay, custom, total: allEntries.length };
  }, [allEntries, state.favorites.length, state.history.length, state.notes.length]);

  const eraOptions = useMemo(() => {
    const used = unique(allEntries.map((entry) => entry.era));
    return ['all' as const, ...used].sort((a, b) => String(a).localeCompare(String(b)));
  }, [allEntries]);

  const exportPayload = useMemo(() => {
    if (exportMode === 'state') return JSON.stringify(state, null, 2);
    if (exportMode === 'visible') return JSON.stringify(filteredEntries, null, 2);
    if (exportMode === 'all') return exportLoreBundle(allEntries, state);
    return makeEntryJson(selectedEntry);
  }, [allEntries, exportMode, filteredEntries, selectedEntry, state]);

  useEffect(() => {
    saveLoreState(state);
  }, [state]);

  useEffect(() => {
    if (selectedEntryId) recordCampaignLoreViewed(selectedEntryId);
  }, [selectedEntryId]);

  useEffect(() => {
    if (!selectedEntry && allEntries[0]) setSelectedEntryId(allEntries[0].id);
  }, [allEntries, selectedEntry]);

  function persistState(nextState: typeof state, message?: string) {
    setState(nextState);
    if (message) setSystemMessage(message);
  }

  function selectEntry(entryId: string) {
    const entry = allEntries.find((item) => item.id === entryId);
    if (!entry) return;
    setSelectedEntryId(entryId);
    persistState(pushLoreHistory(state, entryId), `LOADED: ${entry.title.toUpperCase()}`);
    recordCampaignLoreViewed(entryId);
  }

  function toggleFavorite() {
    if (!selectedEntry) return;
    const next = toggleLoreFavorite(state, selectedEntry.id);
    persistState(
      next,
      next.favorites.includes(selectedEntry.id) ? 'ENTRY ADDED TO FAVORITES' : 'ENTRY REMOVED FROM FAVORITES'
    );
  }

  function updateNote(note: string) {
    if (!selectedEntry) return;
    persistState(updateLoreNote(state, selectedEntry.id, note), 'LOCAL NOTE UPDATED');
  }

  function importLoreEntries() {
    try {
      const parsed = JSON.parse(importBuffer) as unknown;
      const rawEntries = Array.isArray(parsed)
        ? parsed
        : parsed && typeof parsed === 'object' && 'entries' in parsed && Array.isArray((parsed as { entries?: unknown }).entries)
          ? (parsed as { entries: unknown[] }).entries
          : [parsed];
      const imported = rawEntries
        .map((entry) => sanitizeImportedLoreEntry(entry))
        .filter((entry): entry is LoreEntry => Boolean(entry));

      if (imported.length === 0) {
        setSystemMessage('IMPORT FAILED: NO VALID LORE ENTRY FOUND');
        return;
      }

      const next = [
        ...imported,
        ...customEntries.filter((existing) => !imported.some((entry) => entry.id === existing.id))
      ];
      setCustomEntries(next);
      saveCustomLoreEntries(next);
      setImportBuffer('');
      setSelectedEntryId(imported[0].id);
      setSystemMessage(`IMPORTED ${imported.length} CUSTOM LORE ENTR${imported.length > 1 ? 'IES' : 'Y'}`);
    } catch {
      setSystemMessage('IMPORT FAILED: INVALID JSON');
    }
  }

  function deleteCustomEntry(entryId: string) {
    const entry = customEntries.find((item) => item.id === entryId);
    if (!entry) return;
    const next = customEntries.filter((item) => item.id !== entryId);
    setCustomEntries(next);
    saveCustomLoreEntries(next);
    if (selectedEntryId === entryId) setSelectedEntryId(allEntries.find((item) => item.id !== entryId)?.id ?? '');
    setSystemMessage(`CUSTOM ENTRY DELETED: ${entry.title.toUpperCase()}`);
  }

  function copyExportPayload() {
    void navigator.clipboard?.writeText(exportPayload);
    setSystemMessage('EXPORT PAYLOAD COPIED TO CLIPBOARD');
  }

  function navigateToLink(link: LoreLink) {
    const route = getLinkRoute(link);
    if (route && onRouteChange) onRouteChange(route);
    else setSystemMessage(`LINK TARGET: ${link.type.toUpperCase()} / ${link.id}`);
  }

  const selectedIsFavorite = selectedEntry ? state.favorites.includes(selectedEntry.id) : false;
  const selectedIsCustom = selectedEntry ? customEntries.some((entry) => entry.id === selectedEntry.id) : false;
  const selectedEntryConnections = selectedEntry?.related ?? [];

  return (
    <section className="lore-grid">
      <Panel className="lore-browser-panel" title="Lore Database">
        <div className="lore-status-row">
          <StatusBadge label="LORE DB ONLINE" tone="success" />
          <StatusBadge label={systemMessage} tone={systemMessage.includes('FAILED') ? 'danger' : 'neutral'} />
        </div>

        <div className="lore-search-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search characters, frequencies, missions, tapes, tags..."
          />
          <select value={selectedEra} onChange={(event) => setSelectedEra(event.target.value as LoreEntry['era'] | 'all')}>
            {eraOptions.map((era) => (
              <option key={era} value={era}>{era === 'all' ? 'All eras' : getEraName(era)}</option>
            ))}
          </select>
          <select value={selectedCanon} onChange={(event) => setSelectedCanon(event.target.value as LoreCanonStatus | 'all')}>
            {(Object.keys(canonLabels) as Array<LoreCanonStatus | 'all'>).map((canon) => (
              <option key={canon} value={canon}>{canonLabels[canon]}</option>
            ))}
          </select>
        </div>

        <div className="lore-category-strip">
          {categoryOrder.map((category) => (
            <button
              key={category}
              className={`lore-chip ${selectedCategory === category ? 'active' : ''}`}
              type="button"
              onClick={() => setSelectedCategory(category)}
            >
              {categoryLabels[category]} <span>{stats.byCategory[category] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="lore-entry-list">
          {filteredEntries.map((entry) => {
            const isFavorite = state.favorites.includes(entry.id);
            const hasNote = state.notes.some((note) => note.entryId === entry.id);
            return (
              <button
                key={entry.id}
                className={`lore-entry-row ${selectedEntry?.id === entry.id ? 'active' : ''}`}
                type="button"
                onClick={() => selectEntry(entry.id)}
              >
                <span className="lore-row-main">
                  <strong>{entry.title}</strong>
                  <small>{entry.subtitle}</small>
                </span>
                <span className="lore-row-meta">
                  <span>{entry.category.toUpperCase()}</span>
                  <span>{entry.era.toUpperCase()}</span>
                  <span>{entry.canonStatus.toUpperCase()}</span>
                  {isFavorite && <span>★</span>}
                  {hasNote && <span>NOTE</span>}
                </span>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel className="lore-detail-panel" title="Selected Entry">
        {selectedEntry && (
          <>
            <div className="lore-detail-header">
              <div>
                <span className="lore-kicker">{categoryLabels[selectedEntry.category]} / {getEraName(selectedEntry.era)}</span>
                <h2>{selectedEntry.title}</h2>
                <p>{selectedEntry.subtitle}</p>
              </div>
              <div className="lore-detail-actions">
                <StatusBadge label={selectedEntry.canonStatus.toUpperCase()} tone={canonTone[selectedEntry.canonStatus]} />
                <StatusBadge label={selectedEntry.importance.toUpperCase()} tone={importanceTone[selectedEntry.importance]} />
                <button type="button" onClick={toggleFavorite}>{selectedIsFavorite ? 'UNFAVORITE' : 'FAVORITE'}</button>
                {selectedIsCustom && <button type="button" onClick={() => deleteCustomEntry(selectedEntry.id)}>DELETE CUSTOM</button>}
              </div>
            </div>

            <div className="lore-summary-card">
              <strong>Summary</strong>
              <p>{selectedEntry.summary}</p>
            </div>

            <div className="lore-detail-columns">
              <div>
                <h4>Details</h4>
                <ul className="lore-detail-list">
                  {selectedEntry.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
              <div>
                <h4>Metadata</h4>
                <ul className="lore-meta-list">
                  <li><span>Frequency</span><strong>{formatFrequency(selectedEntry.frequency)}</strong></li>
                  <li><span>Timeline</span><strong>{selectedEntry.timeline ?? '—'}</strong></li>
                  <li><span>Aliases</span><strong>{selectedEntry.aliases?.join(', ') || '—'}</strong></li>
                  <li><span>Affiliations</span><strong>{selectedEntry.affiliations?.join(', ') || '—'}</strong></li>
                  <li><span>Links</span><strong>{selectedEntryConnections.length}</strong></li>
                </ul>
              </div>
            </div>

            <div className="lore-tags">
              {selectedEntry.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>

            <div className="lore-links-section">
              <h4>Linked Modules</h4>
              <div className="lore-link-grid">
                {selectedEntryConnections.length === 0 && <span className="lore-empty">No explicit links yet.</span>}
                {selectedEntryConnections.map((link) => {
                  const route = getLinkRoute(link);
                  return (
                    <button key={`${link.type}-${link.id}-${link.label ?? ''}`} type="button" onClick={() => navigateToLink(link)}>
                      <strong>{link.label ?? link.id}</strong>
                      <small>{link.type.toUpperCase()} {route ? `→ ${route.toUpperCase()}` : ''}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lore-note-box">
              <label htmlFor="lore-note">Local note</label>
              <textarea
                id="lore-note"
                value={selectedNote?.note ?? ''}
                onChange={(event) => updateNote(event.target.value)}
                placeholder="Add private notes for this entry..."
              />
              {selectedNote?.updatedAt && <small>Updated {new Date(selectedNote.updatedAt).toLocaleString()}</small>}
            </div>
          </>
        )}
      </Panel>

      <Panel className="lore-stats-panel" title="Database Matrix">
        <div className="lore-stats-grid">
          <div><strong>{stats.total}</strong><span>Total entries</span></div>
          <div><strong>{stats.canon}</strong><span>Canon refs</span></div>
          <div><strong>{stats.simulation}</strong><span>Simulation</span></div>
          <div><strong>{stats.gameplay}</strong><span>Gameplay</span></div>
          <div><strong>{stats.custom}</strong><span>Custom</span></div>
          <div><strong>{filteredEntries.length}</strong><span>Visible</span></div>
        </div>
        <div className="lore-era-matrix">
          {eraOptions.filter((era) => era !== 'all').map((era) => {
            const count = allEntries.filter((entry) => entry.era === era).length;
            return <span key={era}><strong>{String(era).toUpperCase()}</strong>{count}</span>;
          })}
        </div>
      </Panel>

      <Panel className="lore-import-panel" title="Import / Export">
        <div className="lore-export-controls">
          <select value={exportMode} onChange={(event) => setExportMode(event.target.value as typeof exportMode)}>
            <option value="selected">Selected entry</option>
            <option value="visible">Visible entries</option>
            <option value="all">Full lore bundle</option>
            <option value="state">Favorites / notes / history</option>
          </select>
          <button type="button" onClick={copyExportPayload}>COPY EXPORT</button>
        </div>
        <textarea className="lore-export-box" readOnly value={exportPayload} />
        <textarea
          className="lore-import-box"
          value={importBuffer}
          onChange={(event) => setImportBuffer(event.target.value)}
          placeholder='Paste a LoreEntry JSON object, an array, or { "entries": [...] } to import as custom lore.'
        />
        <button type="button" onClick={importLoreEntries}>IMPORT CUSTOM LORE</button>
      </Panel>
    </section>
  );
}
