import '../../styles/vr.css';
import type { Game } from 'phaser';
import { useEffect, useMemo, useRef, useState } from 'react';
import vrMissionsJson from '../../data/vrMissions.json';
import vrExtrasJson from '../../data/vrExtras.json';
import type {
  Mgs1VrPhotoshootExtra,
  VrMissionCategory,
  VrMissionDefinition,
  VrMissionRecord,
  VrRunStats
} from '../../types/vr.types';
import {
  applyVrRuntimeOutcome,
  createEmptyVrStats,
  createVrRecord,
  evaluateVrRun,
  getBestVrRecord,
  getVrCompletionStats,
  loadVrProgress,
  recordVrRun,
  saveVrProgress
} from '../../systems/vrStorage';
import { recordCampaignVrResult } from '../../systems/campaignStorage';
import {
  deleteMgs1VrPhotoshootPhoto,
  listMgs1VrPhotoshootAlbum,
  type Mgs1VrPhotoshootRecord
} from '../../systems/mgs1VrPhotoshootStorage';
import {
  GAME_EVENT,
  onGameEvent,
  type VrPhotoCapturedPayload,
  type VrPhotoshootStatePayload,
  type VrRunGamePayload
} from '../../game/core/GameEvents';
import type { GameStartScene } from '../../game/core/GameConfig';
import { VR_ACTIVE_EXTRA_KEY, VR_ACTIVE_MISSION_KEY } from '../../game/core/vrConstants';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';
import { TouchControlOverlay } from '../common/TouchControlOverlay';
import type { UserSettings } from '../../types/theme.types';

const vrMissions = vrMissionsJson as VrMissionDefinition[];
const vrExtras = vrExtrasJson as Mgs1VrPhotoshootExtra[];
type VrLibraryFilter = VrMissionCategory | 'all' | 'extra';
type VrPlayableMode = 'mission' | 'photoshoot';

const categories: Array<{ id: VrLibraryFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'time_attack', label: 'Time Attack' },
  { id: 'no_alert', label: 'No Alert' },
  { id: 'weapon_training', label: 'Weapon' },
  { id: 'cqc', label: 'CQC' },
  { id: 'surveillance', label: 'Surveillance' },
  { id: 'boss_challenge', label: 'Boss' },
  { id: 'special_minute_battle', label: '1 Min. Battle' },
  { id: 'special_vs12_battle', label: 'VS. 12 Battle' },
  { id: 'special_ninja', label: 'Ninja' },
  { id: 'special_mystery', label: 'Mystery' },
  { id: 'extra', label: 'Extra' }
];

const categoryLabels: Record<VrMissionCategory, string> = {
  time_attack: 'Time Attack',
  no_alert: 'No Alert',
  weapon_training: 'Weapon Training',
  cqc: 'CQC',
  surveillance: 'Surveillance',
  boss_challenge: 'Boss Challenge',
  special_minute_battle: '1 Min. Battle',
  special_vs12_battle: 'VS. 12 Battle',
  special_ninja: 'Ninja',
  special_mystery: 'Mystery'
};

const categoryTone: Record<VrMissionCategory, 'success' | 'warning' | 'danger' | 'neutral'> = {
  time_attack: 'warning',
  no_alert: 'success',
  weapon_training: 'neutral',
  cqc: 'success',
  surveillance: 'warning',
  boss_challenge: 'danger',
  special_minute_battle: 'danger',
  special_vs12_battle: 'danger',
  special_ninja: 'danger',
  special_mystery: 'warning'
};

function resolvePlayableScene(mode: VrPlayableMode, mission: VrMissionDefinition): GameStartScene {
  if (mode === 'photoshoot') return 'VRPhotoshootScene';
  if (mission.category === 'special_minute_battle') return 'VRMinuteBattleScene';
  if (mission.category === 'special_vs12_battle') return 'VRVs12BattleScene';
  if (mission.category === 'special_ninja') return 'VRNinjaScene';
  if (mission.category === 'special_mystery') return 'VRMysteryScene';
  return 'VRTrainingScene';
}

function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const rest = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${rest}`;
}

function cloneStats(stats: VrRunStats): VrRunStats {
  return { ...stats };
}

function getRequirementRows(mission: VrMissionDefinition): Array<[string, string]> {
  const req = mission.requirements;
  const rows: Array<[string, string]> = [];
  if (req.targetTimeSeconds !== undefined) rows.push(['Target time', formatDuration(req.targetTimeSeconds)]);
  if (req.maxAlerts !== undefined) rows.push(['Max alerts', String(req.maxAlerts)]);
  if (req.minKills !== undefined) rows.push(['Min eliminations', String(req.minKills)]);
  if (req.maxKills !== undefined) rows.push(['Max kills', String(req.maxKills)]);
  if (req.maxDamage !== undefined) rows.push(['Max damage', String(req.maxDamage)]);
  if (req.maxRations !== undefined) rows.push(['Max rations', String(req.maxRations)]);
  if (req.minNeutralizations !== undefined) rows.push(['Min CQC', String(req.minNeutralizations)]);
  if (req.minShotsFired !== undefined) rows.push(['Min shots', String(req.minShotsFired)]);
  if (req.maxShotsFired !== undefined) rows.push(['Max shots', String(req.maxShotsFired)]);
  if (req.minCamerasDisabled !== undefined) rows.push(['Min cameras', String(req.minCamerasDisabled)]);
  if (req.minObjectivesCompleted !== undefined) rows.push(['Min objectives', String(req.minObjectivesCompleted)]);
  if (req.bossDefeated) rows.push(['Boss', 'Defeat required']);
  if (req.requiredTool) rows.push(['Doctrine', req.requiredTool.toUpperCase()]);
  return rows;
}

function makeRecordTitle(record: VrMissionRecord, mission?: VrMissionDefinition): string {
  const missionTitle = mission?.title ?? record.missionId;
  return `${missionTitle} // ${record.rank} // ${record.score} pts`;
}

interface VRMissionsScreenProps {
  settings: UserSettings;
}

export function VRMissionsScreen({ settings }: VRMissionsScreenProps) {
  const controlBindings = settings.keyboardBindings;
  const [progress, setProgress] = useState(() => loadVrProgress());
  const [selectedMissionId, setSelectedMissionId] = useState(() => progress.activeMissionId ?? vrMissions[0]?.id ?? '');
  const [selectedCategory, setSelectedCategory] = useState<VrLibraryFilter>('all');
  const [selectedExtraId, setSelectedExtraId] = useState(() => vrExtras[0]?.id ?? '');
  const [playableMode, setPlayableMode] = useState<VrPlayableMode>('mission');
  const [photoAlbum, setPhotoAlbum] = useState<Mgs1VrPhotoshootRecord[]>([]);
  const [albumBackend, setAlbumBackend] = useState<'indexeddb' | 'fallback'>('indexeddb');
  const [photoshootState, setPhotoshootState] = useState<VrPhotoshootStatePayload | null>(null);
  const [search, setSearch] = useState('');
  const [runStats, setRunStats] = useState<VrRunStats>(() => createEmptyVrStats());
  const [isRunning, setIsRunning] = useState(false);
  const [lastRecord, setLastRecord] = useState<VrMissionRecord | null>(null);
  const [systemMessage, setSystemMessage] = useState('VR MODULE READY');
  const [playableActive, setPlayableActive] = useState(false);
  const [playableStatus, setPlayableStatus] = useState<VrRunGamePayload['status']>('standby');
  const [playableRunId, setPlayableRunId] = useState(0);
  const vrGameRef = useRef<Game | null>(null);
  const [engineStatus, setEngineStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [engineError, setEngineError] = useState('');

  const selectedMission = vrMissions.find((mission) => mission.id === selectedMissionId) ?? vrMissions[0];
  const selectedExtra = vrExtras.find((extra) => extra.id === selectedExtraId) ?? vrExtras[0];
  const evaluation = useMemo(
    () => evaluateVrRun(selectedMission, runStats, progress.unlockedTapeIds, progress.unlockedBadges),
    [progress.unlockedBadges, progress.unlockedTapeIds, runStats, selectedMission]
  );
  const completionStats = useMemo(() => getVrCompletionStats(progress, vrMissions), [progress]);
  const bestRecord = useMemo(() => getBestVrRecord(progress, selectedMission.id), [progress, selectedMission.id]);
  const recentRecords = useMemo(() => progress.records.slice(0, 10), [progress.records]);

  const filteredMissions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (selectedCategory === 'extra') return [];
    return vrMissions.filter((mission) => {
      if (selectedCategory !== 'all' && mission.category !== selectedCategory) return false;
      if (!normalizedSearch) return true;
      return [mission.title, mission.subtitle, mission.objective, mission.briefing, mission.mapVariant, mission.recommendedGear.join(' '), mission.restrictions.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [search, selectedCategory]);

  const filteredExtras = useMemo(() => {
    if (selectedCategory !== 'extra') return [];
    const normalizedSearch = search.trim().toLowerCase();
    return vrExtras.filter((extra) => !normalizedSearch || [extra.title, extra.modelName, extra.objective, extra.unlockCondition]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch));
  }, [search, selectedCategory]);

  async function refreshPhotoAlbum(): Promise<void> {
    const result = await listMgs1VrPhotoshootAlbum();
    setPhotoAlbum(result.value);
    setAlbumBackend(result.backend);
    if (result.issues.length) setSystemMessage(result.issues[0].message.toUpperCase());
  }

  useEffect(() => {
    void refreshPhotoAlbum();
  }, []);

  useEffect(() => {
    if (!isRunning || playableActive) return;
    const interval = window.setInterval(() => {
      setRunStats((current) => ({ ...current, timeSeconds: current.timeSeconds + 1 }));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning, playableActive]);


  useEffect(() => {
    const offHud = onGameEvent<VrRunGamePayload>(GAME_EVENT.VR_HUD_UPDATE, (payload) => {
      if (payload.missionId !== selectedMission.id) return;
      setRunStats(payload.stats);
      setPlayableStatus(payload.status);
      setSystemMessage(payload.message.toUpperCase());
    });

    const offComplete = onGameEvent<VrRunGamePayload>(GAME_EVENT.VR_RUN_COMPLETE, (payload) => {
      if (payload.missionId !== selectedMission.id) return;
      setRunStats(payload.stats);
      setPlayableStatus(payload.status);
      setIsRunning(false);
      setPlayableActive(false);

      const statsEvaluation = evaluateVrRun(selectedMission, payload.stats, progress.unlockedTapeIds, progress.unlockedBadges);
      const finalEvaluation = applyVrRuntimeOutcome(statsEvaluation, payload.status, payload.message);
      const record = createVrRecord(selectedMission, payload.stats, finalEvaluation);
      const nextProgress = recordVrRun(progress, selectedMission, record, finalEvaluation);
      setLastRecord(record);
      recordCampaignVrResult(record);
      persistProgress(
        nextProgress,
        finalEvaluation.success
          ? `PLAYABLE VR CLEAR: ${record.rank} / ${record.score} PTS${finalEvaluation.unlockedTapeIds.length ? ' / TAPE UNLOCKED' : ''}`
          : `PLAYABLE VR FAILED: ${finalEvaluation.failures[0] ?? payload.message}`
      );
    });

    return () => {
      offHud();
      offComplete();
    };
  }, [progress, selectedMission]);

  useEffect(() => {
    const offState = onGameEvent<VrPhotoshootStatePayload>(GAME_EVENT.VR_PHOTOSHOOT_STATE, (payload) => {
      if (payload.extraId !== selectedExtra.id) return;
      setPhotoshootState(payload);
      setPlayableStatus(payload.status === 'complete' ? 'clear' : payload.status);
      setSystemMessage(payload.message.toUpperCase());
      if (payload.status !== 'running') setIsRunning(false);
    });
    const offCaptured = onGameEvent<VrPhotoCapturedPayload>(GAME_EVENT.VR_PHOTO_CAPTURED, (payload) => {
      if (payload.extraId !== selectedExtra.id) return;
      setPhotoshootState(payload);
      setSystemMessage(`${payload.subject.toUpperCase()} PHOTO SAVED // ${payload.score} PTS // ${payload.storageBackend.toUpperCase()}`);
      void refreshPhotoAlbum();
    });
    return () => {
      offState();
      offCaptured();
    };
  }, [selectedExtra.id]);

  useEffect(() => {
    let disposed = false;

    if (!playableActive) {
      vrGameRef.current?.destroy(true);
      vrGameRef.current = null;
      setEngineStatus('idle');
      setEngineError('');
      return;
    }

    if (playableMode === 'photoshoot') window.localStorage.setItem(VR_ACTIVE_EXTRA_KEY, selectedExtra.id);
    else window.localStorage.setItem(VR_ACTIVE_MISSION_KEY, selectedMission.id);
    setEngineStatus('loading');
    setEngineError('');

    async function bootEngine() {
      try {
        const [{ default: Phaser }, { createGameConfig }] = await Promise.all([
          import('phaser'),
          import('../../game/core/GameConfig')
        ]);
        if (disposed) return;
        vrGameRef.current?.destroy(true);
        const config = await createGameConfig(Phaser, 'vr-phaser-root', resolvePlayableScene(playableMode, selectedMission));
        if (disposed) return;
        vrGameRef.current = new Phaser.Game(config);
        setEngineStatus('ready');
      } catch (error) {
        if (disposed) return;
        const message = error instanceof Error ? error.message : 'Unknown Phaser boot failure.';
        setEngineError(message);
        setEngineStatus('error');
        setPlayableActive(false);
        setIsRunning(false);
        console.error('[VR] Failed to stream Phaser engine.', error);
      }
    }

    void bootEngine();

    return () => {
      disposed = true;
      vrGameRef.current?.destroy(true);
      vrGameRef.current = null;
    };
  }, [playableActive, playableRunId, playableMode, selectedExtra.id, selectedMission.id]);

  function persistProgress(nextProgress: typeof progress, message?: string) {
    setProgress(nextProgress);
    saveVrProgress(nextProgress);
    if (message) setSystemMessage(message);
  }

  function selectMission(missionId: string) {
    setPlayableMode('mission');
    setSelectedMissionId(missionId);
    setIsRunning(false);
    setPlayableActive(false);
    setPlayableStatus('standby');
    setRunStats(createEmptyVrStats());
    setLastRecord(null);
    const mission = vrMissions.find((item) => item.id === missionId);
    persistProgress({ ...progress, activeMissionId: missionId }, mission ? `LOADED: ${mission.title.toUpperCase()}` : 'MISSION LOADED');
  }

  function selectExtra(extraId: string) {
    const extra = vrExtras.find((item) => item.id === extraId);
    setSelectedExtraId(extraId);
    setPlayableMode('photoshoot');
    setPlayableActive(false);
    setIsRunning(false);
    setPlayableStatus('standby');
    setPhotoshootState(null);
    if (extra) {
      window.localStorage.setItem(VR_ACTIVE_EXTRA_KEY, extra.id);
      setSystemMessage(`EXTRA LOADED: ${extra.modelName.toUpperCase()}`);
    }
  }

  function selectLibraryCategory(category: VrLibraryFilter) {
    setSelectedCategory(category);
    setPlayableActive(false);
    setIsRunning(false);
    setPlayableStatus('standby');
    if (category === 'extra') {
      setPlayableMode('photoshoot');
      if (selectedExtra) window.localStorage.setItem(VR_ACTIVE_EXTRA_KEY, selectedExtra.id);
    } else {
      setPlayableMode('mission');
    }
  }

  function startRun() {
    setPlayableActive(false);
    setPlayableStatus('standby');
    setRunStats(createEmptyVrStats());
    setLastRecord(null);
    setIsRunning(true);
    setSystemMessage(`RUNNING: ${selectedMission.title.toUpperCase()}`);
  }

  function abortRun() {
    setIsRunning(false);
    setPlayableActive(false);
    setPlayableStatus('aborted');
    setSystemMessage('VR RUN ABORTED');
  }

  function patchStats(patch: (stats: VrRunStats) => VrRunStats, message: string) {
    setRunStats((current) => patch(cloneStats(current)));
    setSystemMessage(message);
  }

  function completeRun() {
    setIsRunning(false);
    setPlayableActive(false);
    const finalEvaluation = evaluateVrRun(selectedMission, runStats, progress.unlockedTapeIds, progress.unlockedBadges);
    const record = createVrRecord(selectedMission, runStats, finalEvaluation);
    const nextProgress = recordVrRun(progress, selectedMission, record, finalEvaluation);
    setLastRecord(record);
    recordCampaignVrResult(record);
    persistProgress(
      nextProgress,
      finalEvaluation.success
        ? `RUN CLEAR: ${record.rank} / ${record.score} PTS${finalEvaluation.unlockedTapeIds.length ? ' / TAPE UNLOCKED' : ''}`
        : `RUN FAILED: ${finalEvaluation.failures[0] ?? 'OBJECTIVE NOT MET'}`
    );
  }


  function launchPlayableRun() {
    if (playableMode === 'photoshoot') window.localStorage.setItem(VR_ACTIVE_EXTRA_KEY, selectedExtra.id);
    else window.localStorage.setItem(VR_ACTIVE_MISSION_KEY, selectedMission.id);
    setRunStats(createEmptyVrStats());
    setLastRecord(null);
    setPhotoshootState(null);
    setIsRunning(true);
    setPlayableStatus('running');
    setPlayableActive(true);
    setPlayableRunId((current) => current + 1);
    setSystemMessage(playableMode === 'photoshoot'
      ? `PHOTOSHOOT: ${selectedExtra.modelName.toUpperCase()}`
      : `PLAYABLE VR BRIDGE: ${selectedMission.title.toUpperCase()}`);
  }

  function restartPlayableRun() {
    if (playableMode === 'photoshoot') window.localStorage.setItem(VR_ACTIVE_EXTRA_KEY, selectedExtra.id);
    else window.localStorage.setItem(VR_ACTIVE_MISSION_KEY, selectedMission.id);
    setRunStats(createEmptyVrStats());
    setLastRecord(null);
    setIsRunning(true);
    setPlayableStatus('running');
    setPlayableActive(true);
    setPlayableRunId((current) => current + 1);
    setSystemMessage(playableMode === 'photoshoot'
      ? `PHOTOSHOOT RESTART: ${selectedExtra.modelName.toUpperCase()}`
      : `PLAYABLE VR RESTART: ${selectedMission.title.toUpperCase()}`);
  }

  function stopPlayableRun() {
    setPlayableActive(false);
    setIsRunning(false);
    setPlayableStatus('aborted');
    setSystemMessage(playableMode === 'photoshoot' ? 'PHOTOSHOOT STOPPED' : 'PLAYABLE VR BRIDGE STOPPED');
  }

  async function deleteAlbumPhoto(photoId: string): Promise<void> {
    const result = await deleteMgs1VrPhotoshootPhoto(photoId);
    setAlbumBackend(result.backend);
    setSystemMessage(result.value ? 'ALBUM PHOTO DELETED' : 'ALBUM PHOTO NOT FOUND');
    await refreshPhotoAlbum();
  }

  function quickPerfectRun() {
    const target = selectedMission.requirements.targetTimeSeconds ?? 180;
    const perfect: VrRunStats = {
      timeSeconds: Math.max(45, target - 22),
      alerts: 0,
      shotsFired: selectedMission.requirements.minShotsFired ?? 8,
      hits: selectedMission.requirements.minShotsFired ?? 8,
      kills: selectedMission.requirements.minKills ?? 0,
      neutralizations: selectedMission.requirements.minNeutralizations ?? 2,
      damageTaken: 0,
      rationsUsed: 0,
      camerasDisabled: selectedMission.requirements.minCamerasDisabled ?? 1,
      objectivesCompleted: selectedMission.requirements.minObjectivesCompleted ?? 4,
      secretsFound: 1,
      bossDefeated: Boolean(selectedMission.requirements.bossDefeated)
    };
    setRunStats(perfect);
    setIsRunning(false);
    setSystemMessage('PERFECT RUN TEMPLATE LOADED FOR DEBUG / BALANCE');
  }

  const selectedMissionIndex = vrMissions.findIndex((mission) => mission.id === selectedMission.id) + 1;
  const requirements = getRequirementRows(selectedMission);
  const unlockPreview = selectedMission.rewards.map((reward) => reward.tapeId ? `${reward.tapeId} @ ${reward.unlockRank}` : `${reward.badge} @ ${reward.unlockRank}`);
  const extraSelected = selectedCategory === 'extra';
  const touchContext = playableMode === 'photoshoot'
    ? 'vr-photoshoot'
    : selectedMission.category === 'special_minute_battle'
      ? 'vr-minute-battle'
      : selectedMission.category === 'special_vs12_battle'
        ? 'vr-vs12'
        : selectedMission.category === 'special_ninja'
          ? 'vr-ninja'
          : selectedMission.category === 'special_mystery'
            ? 'vr-mystery'
            : 'vr';

  return (
    <section className="vr-missions-grid">
      <Panel className="vr-library-panel" title="VR Mission Select">
        <div className="vr-status-row">
          <StatusBadge label="VR MODULE ONLINE" tone="success" />
          <StatusBadge label={systemMessage} tone={systemMessage.includes('FAILED') ? 'danger' : systemMessage.includes('CLEAR') ? 'success' : 'neutral'} />
        </div>

        <input
          className="vr-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search VR missions, gear, restrictions..."
        />

        <div className="vr-category-strip">
          {categories.map((category) => {
            const count = category.id === 'all'
              ? vrMissions.length
              : category.id === 'extra'
                ? vrExtras.length
                : vrMissions.filter((mission) => mission.category === category.id).length;
            return (
              <button
                key={category.id}
                className={`vr-chip ${selectedCategory === category.id ? 'active' : ''}`}
                type="button"
                onClick={() => selectLibraryCategory(category.id)}
              >
                {category.label} <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="vr-mission-list">
          {filteredMissions.map((mission) => {
            const best = getBestVrRecord(progress, mission.id);
            return (
              <button
                key={mission.id}
                className={`vr-mission-row ${selectedMission.id === mission.id ? 'active' : ''}`}
                type="button"
                onClick={() => selectMission(mission.id)}
              >
                <span className="vr-row-main">
                  <strong>{mission.title}</strong>
                  <small>{mission.subtitle}</small>
                </span>
                <span className="vr-row-meta">
                  <span>{categoryLabels[mission.category]}</span>
                  <span>DIFF {mission.difficulty}</span>
                  <span>{best ? `${best.rank} / ${best.score}` : 'UNBEATEN'}</span>
                </span>
              </button>
            );
          })}
          {filteredExtras.map((extra) => (
            <button
              key={extra.id}
              className={`vr-mission-row ${selectedExtra.id === extra.id ? 'active' : ''}`}
              type="button"
              onClick={() => selectExtra(extra.id)}
            >
              <span className="vr-row-main">
                <strong>{extra.title}</strong>
                <small>EXTRA / PHOTOGRAPHING</small>
              </span>
              <span className="vr-row-meta">
                <span>{extra.modelName}</span>
                <span>ALBUM</span>
                <span>{photoAlbum.filter((photo) => photo.subject === (extra.modelId === 'naomi_hunter' ? 'naomi' : 'mei_ling')).length} PHOTOS</span>
              </span>
            </button>
          ))}
        </div>
      </Panel>

      <div className="vr-main-column">
        {extraSelected ? (
          <Panel className="vr-briefing-card vr-photoshoot-briefing">
            <div className="vr-briefing-header">
              <div>
                <span className="vr-kicker">MGS1 VR MISSIONS // EXTRA // PHOTOGRAPHING</span>
                <h2>{selectedExtra.title}</h2>
                <p>{selectedExtra.objective}</p>
              </div>
              <div className="vr-badges">
                <StatusBadge label="EXTRA / NOT A STAGE" tone="neutral" />
                <StatusBadge label={albumBackend.toUpperCase()} tone={albumBackend === 'indexeddb' ? 'success' : 'warning'} />
                <StatusBadge label={isRunning ? 'RUNNING' : 'STANDBY'} tone={isRunning ? 'success' : 'neutral'} />
              </div>
            </div>
            <div className="vr-photoshoot-model-card">
              <img
                src={selectedExtra.modelId === 'naomi_hunter'
                  ? '/vr/mgs1/gameplay/characters/naomi-photoshoot-vr.png'
                  : '/vr/mgs1/gameplay/characters/mei-ling-photoshoot-vr.png'}
                alt={`${selectedExtra.modelName} VR Photoshoot sprite`}
              />
              <div>
                <strong>{selectedExtra.modelName}</strong>
                <span>Canon unlock: {selectedExtra.unlockCondition}</span>
                <span>Distance and session time increase with rank. This local preview remains launchable because campaign clear-data parity is not yet available.</span>
              </div>
            </div>
            <div className="vr-mission-matrix">
              <div><strong>Camera</strong><ul><li><span>Move viewfinder</span></li><li><span>Rank-limited zoom</span></li><li><span>Shutter score</span></li></ul></div>
              <div><strong>Album</strong><ul><li><span>IndexedDB first</span></li><li><span>WebP thumbnails</span></li><li><span>40-photo limit</span></li></ul></div>
              <div><strong>Session</strong><ul><li><span>{photoshootState?.photosTaken ?? 0} photos this run</span></li><li><span>Best {photoshootState?.bestScore ?? 0} pts</span></li><li><span>{photoAlbum.length} stored</span></li></ul></div>
            </div>
          </Panel>
        ) : (
        <Panel className={`vr-briefing-card vr-pack-${selectedMission.visualPack}`}>
          <div className="vr-briefing-header">
            <div>
              <span className="vr-kicker">VR MISSION {String(selectedMissionIndex).padStart(3, '0')} / {selectedMission.mapVariant.toUpperCase()}</span>
              <h2>{selectedMission.title}</h2>
              <p>{selectedMission.objective}</p>
            </div>
            <div className="vr-badges">
              <StatusBadge label={categoryLabels[selectedMission.category]} tone={categoryTone[selectedMission.category]} />
              <StatusBadge label={`DIFFICULTY ${selectedMission.difficulty}`} tone={selectedMission.difficulty >= 4 ? 'danger' : selectedMission.difficulty >= 3 ? 'warning' : 'neutral'} />
              <StatusBadge label={isRunning ? 'RUNNING' : 'STANDBY'} tone={isRunning ? 'success' : 'neutral'} />
            </div>
          </div>

          <div className="vr-briefing-text">
            <strong>Briefing</strong>
            <p>{selectedMission.briefing}</p>
            {selectedMission.category === 'special_minute_battle' && (
              <p><strong>1 MIN. BATTLE:</strong> score as many valid eliminations as possible before the sixty-second combat clock expires.</p>
            )}
            {selectedMission.category === 'special_vs12_battle' && (
              <p><strong>VS. 12 BATTLE:</strong> eliminate all 12 Genome Soldiers, with no more than four active at once, then reach the materialized goal before the 300-second limit.</p>
            )}
          </div>

          <div className="vr-mission-matrix">
            <div>
              <strong>Requirements</strong>
              <ul>
                {requirements.map(([label, value]) => <li key={label}><span>{label}</span><b>{value}</b></li>)}
              </ul>
            </div>
            <div>
              <strong>Restrictions</strong>
              <ul>
                {selectedMission.restrictions.map((restriction) => <li key={restriction}><span>{restriction}</span></li>)}
              </ul>
            </div>
            <div>
              <strong>Gear</strong>
              <ul>
                {selectedMission.recommendedGear.map((gear) => <li key={gear}><span>{gear}</span></li>)}
              </ul>
            </div>
          </div>
        </Panel>
        )}

        <Panel className="vr-phaser-panel" title="Playable VR Phaser Bridge">
          <div className="vr-bridge-header">
            <div>
              <strong>{extraSelected ? 'Live Photoshoot runtime' : 'Live scene bridge'}</strong>
              <span>{extraSelected
                ? 'Runs the canonical-style camera session and saves real WebP captures to the local album.'
                : selectedMission.category === 'special_minute_battle'
                  ? 'Runs the dedicated sixty-second VS Target or VS Enemy arena and reports its real combat total.'
                : selectedMission.category === 'special_vs12_battle'
                  ? 'Runs the dedicated five-minute, twelve-guard deployment with its fixed arsenal, four-enemy cap, and final checkpoint.'
                  : 'Runs the selected VR mission as a playable Phaser arena, then sends the real stats back to the VR evaluation system.'}</span>
            </div>
            <div className="vr-bridge-actions">
              <StatusBadge label={playableStatus.toUpperCase()} tone={playableStatus === 'clear' ? 'success' : playableStatus === 'failed' || playableStatus === 'aborted' ? 'danger' : playableStatus === 'running' ? 'success' : 'neutral'} />
              <button className="primary-action" type="button" onClick={launchPlayableRun}>
                {extraSelected
                  ? 'Launch Photoshoot'
                  : selectedMission.category === 'special_minute_battle'
                    ? 'Launch 1 Min. Battle'
                    : selectedMission.category === 'special_vs12_battle'
                      ? 'Launch VS. 12 Battle'
                      : 'Launch Playable VR'}
              </button>
              <button type="button" onClick={restartPlayableRun} disabled={!playableActive}>Restart Scene</button>
              <button type="button" onClick={stopPlayableRun} disabled={!playableActive}>Stop Scene</button>
            </div>
          </div>
          <div className="vr-engine-shell">
            <div id="vr-phaser-root" className={`vr-phaser-root touch-game-surface ${playableActive ? 'active' : ''}`} />
            {playableActive && <TouchControlOverlay settings={settings} context={touchContext} />}
            {!playableActive && engineStatus !== 'error' && (
              <span className="vr-engine-placeholder">{extraSelected ? 'Select Naomi or Mei Ling, then launch Photoshoot.' : 'Select a VR mission, then launch the playable bridge.'}</span>
            )}
            {(engineStatus === 'loading' || engineStatus === 'error') && (
              <div className={`game-engine-status ${engineStatus}`} role={engineStatus === 'error' ? 'alert' : 'status'}>
                <strong>{engineStatus === 'error' ? 'VR ENGINE OFFLINE' : 'STREAMING PHASER ENGINE'}</strong>
                <span>{engineStatus === 'error' ? engineError : 'Loading the playable training runtime on demand…'}</span>
              </div>
            )}
          </div>
          <p className="vr-bridge-help">
            {extraSelected ? (
              <>Controls: arrows frame, {controlBindings.fire} shutter, {controlBindings.chaff}/{controlBindings.ration} zoom -/+,
                {controlBindings.confirm} next pose, {controlBindings.cancel} exit. Standard gamepad and touch are supported.</>
            ) : selectedMission.category === 'special_minute_battle' ? (
              <>Controls: move/jump/crouch, {controlBindings.fire} attack with the assigned weapon, {controlBindings.cqc} CQC,
                or detonate planted C4, {controlBindings.cancel} abort. The combat clock stops automatically at 60 seconds.</>
            ) : selectedMission.category === 'special_vs12_battle' ? (
              <>Controls: move/jump/crouch, {controlBindings.fire} fire the selected weapon, {controlBindings.cqc} CQC or detonate C4/Nikita,
                {controlBindings.chaff} previous weapon, {controlBindings.ration} next weapon, {controlBindings.cancel} abort. Eliminate 12 guards, then reach the goal within 300 seconds.</>
            ) : selectedMission.category === 'special_ninja' ? (
              <>Controls: move/jump, {controlBindings.fire} slash, hold {controlBindings.cqc} cross-slash,
                {controlBindings.chaff} Body Disruption, hold {controlBindings.ration} stealth.</>
            ) : selectedMission.category === 'special_mystery' ? (
              <>Controls: move/crawl, {controlBindings.fire} inspect, {controlBindings.cqc} grab/release,
                {controlBindings.confirm} deliver suspect, {controlBindings.cancel} abort.</>
            ) : (
              <>Controls: arrows/{controlBindings.moveLeft}+{controlBindings.moveRight} move, {controlBindings.jump}/up jump,
                {controlBindings.crouch}/down crouch, {controlBindings.fire} shoot, {controlBindings.cqc} CQC,
                {controlBindings.chaff} chaff, {controlBindings.ration} ration, {controlBindings.confirm} evaluate,
                {controlBindings.cancel} abort. Standard gamepad is supported.</>
            )}
          </p>
        </Panel>

        {!extraSelected && <Panel title="Live VR Run / Training Board">
          <div className="vr-run-hud">
            <StatusBadge label={evaluation.success ? 'OBJECTIVES VALID' : 'OBJECTIVES INCOMPLETE'} tone={evaluation.success ? 'success' : 'warning'} />
            <div><span>Time</span><strong>{formatDuration(runStats.timeSeconds)}</strong></div>
            <div><span>Projected Rank</span><strong>{evaluation.rank}</strong></div>
            <div><span>Score</span><strong>{evaluation.score}</strong></div>
            <div><span>Accuracy</span><strong>{evaluation.accuracy}%</strong></div>
          </div>

          <div className="vr-stat-grid">
            <div><span>Alerts</span><strong>{runStats.alerts}</strong></div>
            <div><span>Shots</span><strong>{runStats.shotsFired}</strong></div>
            <div><span>Hits</span><strong>{runStats.hits}</strong></div>
            <div><span>Kills</span><strong>{runStats.kills}</strong></div>
            <div><span>CQC</span><strong>{runStats.neutralizations}</strong></div>
            <div><span>Damage</span><strong>{runStats.damageTaken}</strong></div>
            <div><span>Rations</span><strong>{runStats.rationsUsed}</strong></div>
            <div><span>Cameras</span><strong>{runStats.camerasDisabled}</strong></div>
            <div><span>Objectives</span><strong>{runStats.objectivesCompleted}</strong></div>
            <div><span>Secrets</span><strong>{runStats.secretsFound}</strong></div>
            <div><span>Boss</span><strong>{runStats.bossDefeated ? 'DOWN' : '—'}</strong></div>
          </div>

          <div className="vr-control-grid">
            <button className="primary-action" type="button" onClick={startRun}>{isRunning ? 'Restart Run' : 'Start Run'}</button>
            <button type="button" onClick={abortRun} disabled={!isRunning}>Abort</button>
            <button type="button" onClick={quickPerfectRun}>Load Perfect Template</button>
            <button className="primary-action secondary" type="button" onClick={completeRun}>Complete / Evaluate</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, timeSeconds: stats.timeSeconds + 15 }), '+15s added')}>+15s</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, objectivesCompleted: stats.objectivesCompleted + 1 }), 'Objective completed')}>Objective +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, alerts: stats.alerts + 1 }), 'Alert logged')}>Alert +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, shotsFired: stats.shotsFired + 1 }), 'Shot fired')}>Shot +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, shotsFired: stats.shotsFired + 1, hits: stats.hits + 1 }), 'Confirmed hit')}>Hit +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, neutralizations: stats.neutralizations + 1 }), 'CQC neutralization')}>CQC +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, kills: stats.kills + 1 }), 'Lethal kill logged')}>Kill +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, damageTaken: stats.damageTaken + 10 }), '+10 damage')}>Damage +10</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, rationsUsed: stats.rationsUsed + 1 }), 'Ration used')}>Ration +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, camerasDisabled: stats.camerasDisabled + 1 }), 'Camera disabled')}>Camera +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, secretsFound: stats.secretsFound + 1 }), 'Secret collected')}>Secret +1</button>
            <button type="button" onClick={() => patchStats((stats) => ({ ...stats, bossDefeated: !stats.bossDefeated }), 'Boss flag toggled')}>Toggle Boss</button>
          </div>

          <div className="vr-evaluation-panel">
            <strong>Evaluation</strong>
            {evaluation.failures.length === 0 ? (
              <span className="vr-pass">All current requirements are valid.</span>
            ) : (
              evaluation.failures.map((failure) => <span key={failure} className="vr-fail">{failure}</span>)
            )}
            {unlockPreview.length > 0 && <em>Rewards: {unlockPreview.join(' // ')}</em>}
          </div>
        </Panel>}
      </div>

      <div className="vr-side-column">
        <Panel title="VR Progress">
          <ul className="status-list compact">
            <li><span>Completed</span><strong>{completionStats.completed}/{completionStats.total}</strong></li>
            <li><span>FOX or better</span><strong>{completionStats.foxOrBetter}</strong></li>
            <li><span>BIG BOSS</span><strong>{completionStats.bigBossCount}</strong></li>
            <li><span>Unlocked tapes</span><strong>{completionStats.unlockedTapes}</strong></li>
            <li><span>Badges</span><strong>{completionStats.badges}</strong></li>
          </ul>
        </Panel>

        {!extraSelected && <>
        <Panel title="Best Selected Run">
          {bestRecord ? (
            <div className="vr-record-card success">
              <strong>{makeRecordTitle(bestRecord, selectedMission)}</strong>
              <span>{formatDuration(bestRecord.timeSeconds)} // Accuracy {bestRecord.accuracy}% // Alerts {bestRecord.alerts}</span>
              <span>Kills {bestRecord.kills} // CQC {bestRecord.neutralizations} // Damage {bestRecord.damageTaken}</span>
            </div>
          ) : (
            <p className="vr-empty">No successful clear recorded for this mission.</p>
          )}
        </Panel>

        <Panel title="Last Evaluation">
          {lastRecord ? (
            <div className={`vr-record-card ${lastRecord.success ? 'success' : 'failed'}`}>
              <strong>{makeRecordTitle(lastRecord, selectedMission)}</strong>
              <span>{lastRecord.success ? 'MISSION CLEAR' : 'MISSION FAILED'} // {formatDuration(lastRecord.timeSeconds)}</span>
              <span>Unlocked tapes: {lastRecord.unlockedTapeIds.length || 'none'}</span>
            </div>
          ) : (
            <p className="vr-empty">No run completed in this session.</p>
          )}
        </Panel>
        </>}

        {extraSelected && (
          <Panel title={`Photoshoot Album // ${photoAlbum.length}/40`}>
            <div className="vr-photo-album" data-album-backend={albumBackend}>
              {photoAlbum.length === 0 ? (
                <p className="vr-empty">No photographs saved yet. Center the model and release the shutter.</p>
              ) : photoAlbum.map((photo) => (
                <article key={photo.id} className="vr-photo-card">
                  {photo.thumbnail ? <img src={photo.thumbnail} alt={`${photo.subject} Photoshoot capture`} /> : <span className="vr-photo-missing">THUMBNAIL UNAVAILABLE</span>}
                  <div>
                    <strong>{photo.subject === 'naomi' ? 'NAOMI HUNTER' : 'MEI LING'} // {photo.score} PTS</strong>
                    <span>{new Date(photo.capturedAt).toLocaleString()} // ZOOM {photo.zoom.toFixed(2)}x</span>
                    <button type="button" onClick={() => void deleteAlbumPhoto(photo.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        )}

        <Panel title="Unlocked VR Rewards">
          <div className="vr-reward-list">
            {progress.unlockedTapeIds.length === 0 && progress.unlockedBadges.length === 0 ? (
              <span>No VR rewards unlocked yet.</span>
            ) : (
              <>
                {progress.unlockedTapeIds.map((tapeId) => <span key={tapeId}>TAPE // {tapeId}</span>)}
                {progress.unlockedBadges.map((badge) => <span key={badge}>BADGE // {badge}</span>)}
              </>
            )}
          </div>
        </Panel>

        <Panel title="Recent VR Records">
          <div className="vr-history-list">
            {recentRecords.length === 0 ? (
              <span>No local records yet.</span>
            ) : (
              recentRecords.map((record) => {
                const mission = vrMissions.find((item) => item.id === record.missionId);
                return (
                  <button key={`${record.missionId}-${record.completedAt}`} type="button" onClick={() => selectMission(record.missionId)}>
                    <strong>{makeRecordTitle(record, mission)}</strong>
                    <span>{record.success ? 'CLEAR' : 'FAILED'} // {formatDuration(record.timeSeconds)} // {new Date(record.completedAt).toLocaleString()}</span>
                  </button>
                );
              })
            )}
          </div>
        </Panel>
      </div>
    </section>
  );
}
