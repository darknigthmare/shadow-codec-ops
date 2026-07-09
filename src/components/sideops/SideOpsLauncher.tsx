import Phaser from 'phaser';
import { useEffect, useMemo, useRef, useState } from 'react';
import conversationsJson from '../../data/conversations.json';
import missionsJson from '../../data/missions.json';
import type { ConversationDefinition } from '../../types/codec.types';
import type { MissionDefinition } from '../../types/mission.types';
import { createGameConfig } from '../../game/core/GameConfig';
import {
  emitGameEvent,
  GAME_EVENT,
  onGameEvent,
  type AlertEventPayload,
  type CodecRequestPayload,
  type MissionCompletePayload,
  type MissionHudPayload
} from '../../game/core/GameEvents';
import { loadJson, saveJson } from '../../systems/saveEngine';
import {
  applyStudioTriggerOverride,
  loadCustomConversations,
  loadTriggerOverrides,
  mergeStudioConversations
} from '../../systems/studioStorage';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

interface SideOpsLauncherProps {
  onOpenCodec: () => void;
}

const builtInConversations = conversationsJson as ConversationDefinition[];
const sideOpsMissions = (missionsJson as MissionDefinition[]).filter((mission) => mission.mode === 'side_scroller');
const DEFAULT_MISSION_ID = sideOpsMissions[0]?.id ?? 'shadow_dock_001';
const ACTIVE_MISSION_KEY = 'sideops-active-mission-id';

function bestRunKey(missionId: string): string {
  return `sideops-${missionId}-best`;
}

function resolveMission(missionId: string): MissionDefinition {
  return sideOpsMissions.find((mission) => mission.id === missionId) ?? sideOpsMissions[0];
}

function buildInitialHud(mission: MissionDefinition): MissionHudPayload {
  return {
    missionId: mission.id,
    missionTitle: mission.title,
    bossName: mission.boss ?? 'Mission Boss',
    health: 100,
    maxHealth: 100,
    ammo: mission.id === 'tanker_hold_002' ? 32 : 26,
    maxAmmo: 30,
    rations: 1,
    chaff: mission.id === 'tanker_hold_002' ? 2 : 1,
    hasKeycard: false,
    alertState: 'NORMAL',
    suspicion: 0,
    stealthScore: 1000,
    reinforcementCount: 0,
    activeEnemies: mission.id === 'tanker_hold_002' ? 4 : 3,
    lastAlertSource: 'none',
    alerts: 0,
    shotsFired: 0,
    kills: 0,
    neutralizations: 0,
    camerasDisabled: 0,
    objective: mission.objectives.find((objective) => !objective.completedByDefault)?.label ?? 'Advance mission',
    objectiveStage: 'recover_keycard',
    objectivesCompleted: mission.objectives.filter((objective) => objective.completedByDefault).length,
    totalObjectives: mission.objectives.length,
    secretsFound: 0,
    totalSecrets: 3,
    bossActive: false,
    bossDefeated: false,
    bossHealth: 0,
    bossMaxHealth: mission.id === 'tanker_hold_002' ? 12 : 10,
    chaffActive: false
  };
}

export function SideOpsLauncher({ onOpenCodec }: SideOpsLauncherProps) {
  const [activeMissionId, setActiveMissionId] = useState(() => loadJson(ACTIVE_MISSION_KEY, DEFAULT_MISSION_ID));
  const activeMission = useMemo(() => resolveMission(activeMissionId), [activeMissionId]);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [codecRequest, setCodecRequest] = useState<CodecRequestPayload | null>(null);
  const [codecLineIndex, setCodecLineIndex] = useState(0);
  const [missionResult, setMissionResult] = useState<MissionCompletePayload | null>(null);
  const [hud, setHud] = useState<MissionHudPayload>(() => buildInitialHud(activeMission));
  const [alertLog, setAlertLog] = useState<AlertEventPayload[]>([]);
  const [bestResult, setBestResult] = useState<MissionCompletePayload | null>(() => loadJson<MissionCompletePayload | null>(bestRunKey(activeMission.id), null));
  const [customConversations] = useState(() => loadCustomConversations());
  const [triggerOverrides] = useState(() => loadTriggerOverrides());

  const conversations = useMemo(
    () => mergeStudioConversations(builtInConversations, customConversations),
    [customConversations]
  );

  useEffect(() => {
    saveJson(ACTIVE_MISSION_KEY, activeMission.id);
    setBestResult(loadJson<MissionCompletePayload | null>(bestRunKey(activeMission.id), null));
    setMissionResult(null);
    setCodecRequest(null);
    setCodecLineIndex(0);
    setAlertLog([]);
    setHud(buildInitialHud(activeMission));
  }, [activeMission.id]);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(createGameConfig('sideops-phaser-root'));
    }

    const offCodec = onGameEvent<CodecRequestPayload>(GAME_EVENT.REQUEST_CODEC_CALL, (payload) => {
      const routedPayload = applyStudioTriggerOverride(activeMission.id, payload, triggerOverrides);
      setCodecRequest(routedPayload);
      setCodecLineIndex(0);
    });
    const offComplete = onGameEvent<MissionCompletePayload>(GAME_EVENT.MISSION_COMPLETE, (payload) => {
      setMissionResult(payload);
      if (payload.success) {
        setBestResult((current) => {
          if (!current || payload.stealthScore > current.stealthScore || (payload.stealthScore === current.stealthScore && payload.timeSeconds < current.timeSeconds)) {
            saveJson(bestRunKey(payload.missionId), payload);
            return payload;
          }
          return current;
        });
      }
    });
    const offHud = onGameEvent<MissionHudPayload>(GAME_EVENT.HUD_UPDATE, (payload) => {
      setHud(payload);
    });
    const offAlert = onGameEvent<AlertEventPayload>(GAME_EVENT.ALERT, (payload) => {
      setAlertLog((current) => [payload, ...current].slice(0, 7));
    });

    return () => {
      offCodec();
      offComplete();
      offHud();
      offAlert();
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [activeMission.id, triggerOverrides]);

  const activeConversation = useMemo(() => {
    if (!codecRequest) return null;
    return conversations.find((conversation) => conversation.id === codecRequest.conversationId) ?? null;
  }, [codecRequest, conversations]);

  const activeCodecLine = activeConversation?.lines[codecLineIndex];

  function acknowledgeCodecRequest() {
    setCodecRequest(null);
    setCodecLineIndex(0);
    emitGameEvent(GAME_EVENT.CODEC_RESUME, { acknowledged: true });
  }

  function advanceCodecRequest() {
    if (!activeConversation) {
      acknowledgeCodecRequest();
      return;
    }
    if (codecLineIndex < activeConversation.lines.length - 1) {
      setCodecLineIndex((current) => current + 1);
      return;
    }
    acknowledgeCodecRequest();
  }

  function restartMission() {
    setCodecRequest(null);
    setCodecLineIndex(0);
    setMissionResult(null);
    setHud(buildInitialHud(activeMission));
    setAlertLog([]);
    saveJson(ACTIVE_MISSION_KEY, activeMission.id);
    emitGameEvent(GAME_EVENT.MISSION_RESTART, { requested: true, missionId: activeMission.id });
  }

  function selectMission(missionId: string) {
    const mission = resolveMission(missionId);
    setActiveMissionId(mission.id);
    saveJson(ACTIVE_MISSION_KEY, mission.id);
  }

  const alertTone = hud.alertState === 'ALERT' || hud.alertState === 'MISSION FAILED'
    ? 'danger'
    : hud.alertState === 'SUSPICION' || hud.alertState === 'EVASION' || hud.alertState === 'CAUTION'
      ? 'warning'
      : 'success';

  return (
    <section className="sideops-page">
      <Panel className="sideops-info-panel">
        <StatusBadge label="SIDE OPS MISSION PACK" tone="success" />
        <h2>{activeMission.title}</h2>
        <p>
          Passe 11 : Side Ops possède maintenant plusieurs missions sélectionnables. La deuxième mission ajoute
          un environnement Tanker, plus de patrouilles, un boss dédié et des conversations Codec MGS2.
        </p>

        <div className="mission-select-grid">
          {sideOpsMissions.map((mission) => (
            <button
              key={mission.id}
              type="button"
              className={`mission-card-button ${activeMission.id === mission.id ? 'active' : ''}`}
              onClick={() => selectMission(mission.id)}
            >
              <strong>{mission.title}</strong>
              <span>{mission.location}</span>
              <small>{mission.era.toUpperCase()} // Difficulty {mission.difficulty}</small>
            </button>
          ))}
        </div>

        <ul className="mission-list">
          <li>Flèches / WASD : déplacement</li>
          <li>Shift : marche lente, réduit la détection sonore</li>
          <li>Bas / S : accroupi, réduit fortement la détection visuelle</li>
          <li>J : tir SOCOM, silencieux mais pas totalement invisible</li>
          <li>Espace : CQC non létal proche</li>
          <li>F : chaff grenade contre caméra et projecteur</li>
          <li>R : ration si blessé</li>
          <li>C : demande Codec manuelle</li>
        </ul>

        <div className="mission-objectives-card">
          <strong>Active Objectives</strong>
          {activeMission.objectives.map((objective) => (
            <span key={objective.id}>{objective.completedByDefault ? '✓' : '□'} {objective.label}</span>
          ))}
        </div>

        <div className="sideops-panel-actions">
          <button className="primary-action" type="button" onClick={onOpenCodec}>Open Full Codec Simulator</button>
          <button className="primary-action secondary" type="button" onClick={restartMission}>Restart Mission</button>
        </div>
        <div className="best-run-card">
          <strong>Best Local Run</strong>
          {bestResult ? (
            <span>{bestResult.rankPreview} // {bestResult.stealthScore} pts // {bestResult.timeSeconds}s // Secrets {bestResult.secretsFound}/{bestResult.totalSecrets}</span>
          ) : (
            <span>No completed run yet for this mission.</span>
          )}
        </div>
      </Panel>

      <div className="sideops-game-shell panel">
        <div className="sideops-react-hud">
          <StatusBadge label={hud.alertState} tone={alertTone} />
          <div><span>Mission</span><strong>{hud.missionTitle}</strong></div>
          <div><span>HP</span><strong>{hud.health}/{hud.maxHealth}</strong></div>
          <div><span>SOCOM</span><strong>{hud.ammo}/{hud.maxAmmo}</strong></div>
          <div><span>Ration</span><strong>{hud.rations}</strong></div>
          <div><span>Chaff</span><strong>{hud.chaff}{hud.chaffActive ? ' ACTIVE' : ''}</strong></div>
          <div><span>Card</span><strong>{hud.hasKeycard ? 'ACTIVE' : 'NONE'}</strong></div>
          <div><span>Stealth</span><strong>{hud.stealthScore}</strong></div>
          <div><span>Enemies</span><strong>{hud.activeEnemies} / Reinf {hud.reinforcementCount}</strong></div>
          <div><span>Objective</span><strong>{hud.objective}</strong></div>
          <div><span>Obj</span><strong>{hud.objectivesCompleted}/{hud.totalObjectives}</strong></div>
          <div><span>Secrets</span><strong>{hud.secretsFound}/{hud.totalSecrets}</strong></div>
        </div>

        <div className="suspicion-meter">
          <span>Suspicion</span>
          <div><i style={{ width: `${hud.suspicion}%` }} /></div>
          <strong>{hud.suspicion}%</strong>
          <em>{hud.lastAlertSource}</em>
        </div>

        {(hud.bossActive || hud.bossDefeated) && (
          <div className="boss-meter">
            <span>{hud.bossDefeated ? `${hud.bossName} neutralized` : hud.bossName}</span>
            <div><i style={{ width: hud.bossMaxHealth > 0 ? `${Math.round((hud.bossHealth / hud.bossMaxHealth) * 100)}%` : '0%' }} /></div>
            <strong>{hud.bossHealth}/{hud.bossMaxHealth}</strong>
          </div>
        )}

        <div id="sideops-phaser-root" />

        <div className="sideops-stats-strip">
          <span>Alerts: <strong>{hud.alerts}</strong></span>
          <span>Shots: <strong>{hud.shotsFired}</strong></span>
          <span>Kills: <strong>{hud.kills}</strong></span>
          <span>Neutralizations: <strong>{hud.neutralizations}</strong></span>
          <span>Cameras: <strong>{hud.camerasDisabled}</strong></span>
          <span>Boss: <strong>{hud.bossDefeated ? 'DOWN' : hud.bossActive ? 'ACTIVE' : 'LOCKED'}</strong></span>
          <span>Stage: <strong>{hud.objectiveStage}</strong></span>
        </div>

        <div className="alert-log-panel">
          <strong>Alert Timeline</strong>
          {alertLog.length === 0 ? (
            <span>No security event yet.</span>
          ) : (
            alertLog.map((event, index) => (
              <span key={`${event.timeSeconds}-${event.level}-${index}`}>
                T+{event.timeSeconds}s // {event.missionTitle} // {event.level} // {event.source} // {event.message}
              </span>
            ))
          )}
        </div>

        {codecRequest && (
          <div className="sideops-codec-toast">
            <StatusBadge label={codecRequest.pauseGame ? 'PAUSED CODEC' : 'CODEC'} tone="success" />
            <strong>{activeConversation?.title ?? codecRequest.message}</strong>
            <span>Trigger: {codecRequest.trigger}</span>
            <span>Contact: {codecRequest.contactId}</span>
            {activeCodecLine && (
              <p className="inline-codec-line">
                <b>{activeCodecLine.speaker.toUpperCase()}:</b> {activeCodecLine.text}
              </p>
            )}
            <div>
              <button type="button" onClick={advanceCodecRequest}>
                {activeConversation && codecLineIndex < activeConversation.lines.length - 1 ? 'NEXT' : 'ACKNOWLEDGE'}
              </button>
              <button type="button" onClick={onOpenCodec}>OPEN CODEC</button>
            </div>
          </div>
        )}

        {missionResult && (
          <div className="mission-result-toast">
            <strong>{missionResult.success ? 'MISSION RESULT' : 'MISSION FAILED'}</strong>
            <span>{missionResult.missionTitle}</span>
            <span>{missionResult.outcome}</span>
            <span>Rank: {missionResult.rankPreview}</span>
            <span>Stealth Score: {missionResult.stealthScore}</span>
            <span>Objectives: {missionResult.objectivesCompleted}/{missionResult.totalObjectives} / Secrets: {missionResult.secretsFound}/{missionResult.totalSecrets}</span>
            <span>Boss defeated: {missionResult.bossDefeated ? 'YES' : 'NO'} — {missionResult.bossName}</span>
            <span>Alerts: {missionResult.alerts} / Kills: {missionResult.kills}</span>
            <span>Reinforcements: {missionResult.reinforcementCount}</span>
            <span>Time: {missionResult.timeSeconds}s</span>
            <span>No Alert: {missionResult.noAlert ? 'YES' : 'NO'} / No Kill: {missionResult.noKill ? 'YES' : 'NO'}</span>
          </div>
        )}
      </div>
    </section>
  );
}
