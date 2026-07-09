import Phaser from 'phaser';
import { useEffect, useMemo, useRef, useState } from 'react';
import conversationsJson from '../../data/conversations.json';
import type { ConversationDefinition } from '../../types/codec.types';
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

const initialHud: MissionHudPayload = {
  health: 100,
  maxHealth: 100,
  ammo: 26,
  maxAmmo: 30,
  rations: 1,
  chaff: 1,
  hasKeycard: false,
  alertState: 'NORMAL',
  suspicion: 0,
  stealthScore: 1000,
  reinforcementCount: 0,
  activeEnemies: 3,
  lastAlertSource: 'none',
  alerts: 0,
  shotsFired: 0,
  kills: 0,
  neutralizations: 0,
  camerasDisabled: 0,
  objective: 'Recover Keycard Lv.1',
  objectiveStage: 'recover_keycard',
  objectivesCompleted: 1,
  secretsFound: 0,
  totalSecrets: 3,
  bossActive: false,
  bossDefeated: false,
  bossHealth: 0,
  bossMaxHealth: 10,
  chaffActive: false
};

export function SideOpsLauncher({ onOpenCodec }: SideOpsLauncherProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const [codecRequest, setCodecRequest] = useState<CodecRequestPayload | null>(null);
  const [codecLineIndex, setCodecLineIndex] = useState(0);
  const [missionResult, setMissionResult] = useState<MissionCompletePayload | null>(null);
  const [hud, setHud] = useState<MissionHudPayload>(initialHud);
  const [alertLog, setAlertLog] = useState<AlertEventPayload[]>([]);
  const [bestResult, setBestResult] = useState<MissionCompletePayload | null>(() => loadJson<MissionCompletePayload | null>('sideops-shadow-dock-best', null));
  const [customConversations] = useState(() => loadCustomConversations());
  const [triggerOverrides] = useState(() => loadTriggerOverrides());

  const conversations = useMemo(
    () => mergeStudioConversations(builtInConversations, customConversations),
    [customConversations]
  );

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(createGameConfig('sideops-phaser-root'));
    }

    const offCodec = onGameEvent<CodecRequestPayload>(GAME_EVENT.REQUEST_CODEC_CALL, (payload) => {
      const routedPayload = applyStudioTriggerOverride('shadow_dock_001', payload, triggerOverrides);
      setCodecRequest(routedPayload);
      setCodecLineIndex(0);
    });
    const offComplete = onGameEvent<MissionCompletePayload>(GAME_EVENT.MISSION_COMPLETE, (payload) => {
      setMissionResult(payload);
      if (payload.success) {
        setBestResult((current) => {
          if (!current || payload.stealthScore > current.stealthScore || (payload.stealthScore === current.stealthScore && payload.timeSeconds < current.timeSeconds)) {
            saveJson('sideops-shadow-dock-best', payload);
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
  }, []);

  const activeConversation = useMemo(() => {
    if (!codecRequest) return null;
    return conversations.find((conversation) => conversation.id === codecRequest.conversationId) ?? null;
  }, [codecRequest]);

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
    setHud(initialHud);
    setAlertLog([]);
    emitGameEvent(GAME_EVENT.MISSION_RESTART, { requested: true });
  }

  const alertTone = hud.alertState === 'ALERT' || hud.alertState === 'MISSION FAILED'
    ? 'danger'
    : hud.alertState === 'SUSPICION' || hud.alertState === 'EVASION' || hud.alertState === 'CAUTION'
      ? 'warning'
      : 'success';

  return (
    <section className="sideops-page">
      <Panel className="sideops-info-panel">
        <StatusBadge label="SIDE OPS ALERT CORE" tone="success" />
        <h2>Mission 001 — Dock Infiltration</h2>
        <p>
          Passe 6 : Mission 001 conserve la vertical slice complète et peut maintenant utiliser
          les conversations custom du Studio via des trigger overrides locaux.
        </p>
        <ul className="mission-list">
          <li>Flèches / WASD : déplacement</li>
          <li>Shift : marche lente, réduit la détection sonore</li>
          <li>Bas / S : accroupi, réduit fortement la détection visuelle</li>
          <li>J : tir SOCOM, silencieux mais pas totalement invisible</li>
          <li>Espace : CQC non létal proche</li>
          <li>F : chaff grenade contre caméra et projecteur</li>
          <li>R : ration si blessé</li>
          <li>C : demande Codec manuelle</li>
          <li>Objectif final : keycard → porte → yard → boss → extraction</li>
        </ul>
        <div className="sideops-panel-actions">
          <button className="primary-action" type="button" onClick={onOpenCodec}>Open Full Codec Simulator</button>
          <button className="primary-action secondary" type="button" onClick={restartMission}>Restart Mission</button>
        </div>
        <div className="best-run-card">
          <strong>Best Local Run</strong>
          {bestResult ? (
            <span>{bestResult.rankPreview} // {bestResult.stealthScore} pts // {bestResult.timeSeconds}s // Secrets {bestResult.secretsFound}/{bestResult.totalSecrets}</span>
          ) : (
            <span>No completed run yet.</span>
          )}
        </div>
      </Panel>

      <div className="sideops-game-shell panel">
        <div className="sideops-react-hud">
          <StatusBadge label={hud.alertState} tone={alertTone} />
          <div><span>HP</span><strong>{hud.health}/{hud.maxHealth}</strong></div>
          <div><span>SOCOM</span><strong>{hud.ammo}/{hud.maxAmmo}</strong></div>
          <div><span>Ration</span><strong>{hud.rations}</strong></div>
          <div><span>Chaff</span><strong>{hud.chaff}{hud.chaffActive ? ' ACTIVE' : ''}</strong></div>
          <div><span>Card</span><strong>{hud.hasKeycard ? 'LV.1' : 'NONE'}</strong></div>
          <div><span>Stealth</span><strong>{hud.stealthScore}</strong></div>
          <div><span>Enemies</span><strong>{hud.activeEnemies} / Reinf {hud.reinforcementCount}</strong></div>
          <div><span>Objective</span><strong>{hud.objective}</strong></div>
          <div><span>Obj</span><strong>{hud.objectivesCompleted}/5</strong></div>
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
            <span>{hud.bossDefeated ? 'Boss neutralized' : 'Armored Guard Captain'}</span>
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
                T+{event.timeSeconds}s // {event.level} // {event.source} // {event.message}
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
            <span>{missionResult.outcome}</span>
            <span>Rank: {missionResult.rankPreview}</span>
            <span>Stealth Score: {missionResult.stealthScore}</span>
            <span>Objectives: {missionResult.objectivesCompleted}/5 / Secrets: {missionResult.secretsFound}/{missionResult.totalSecrets}</span>
            <span>Boss defeated: {missionResult.bossDefeated ? 'YES' : 'NO'}</span>
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
