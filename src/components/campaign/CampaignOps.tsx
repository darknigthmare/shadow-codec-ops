import '../../styles/campaign.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { AppRoute } from '../../app/AppLayout';
import type {
  CampaignDefinition,
  CampaignModule,
  CampaignNodeDefinition,
  CampaignPresentationQueueItem,
  CampaignResourceWallet,
  CampaignSlotId
} from '../../types/campaign.types';
import {
  acknowledgeCampaignPresentationItem,
  campaignUpgrades,
  chooseCampaignBranch,
  exportCampaignSlot,
  getCampaignCompletion,
  getCampaignDefinitions,
  getCampaignLevelProgress,
  getCampaignNodeStatus,
  getCampaignSlotSummaries,
  importCampaignSlot,
  loadActiveCampaignSlot,
  loadCampaignProgress,
  purchaseCampaignUpgrade,
  registerCampaignOpen,
  resetCampaignProgress,
  saveCampaignProgress,
  setActiveCampaignSlot,
  setCampaignLaunchDirective,
  startCampaignNewGamePlus,
  synchronizeCampaignProgress
} from '../../systems/campaignStorage';
import { calculateCampaignStatistics, collectPendingCampaignPresentations } from '../../systems/campaignNarrative';
import { loadVrProgress, saveVrProgress } from '../../systems/vrStorage';
import { saveJson } from '../../systems/saveEngine';
import { consumeCampaignBuilderPreviewId } from '../../systems/campaignBuilderStorage';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';
import { BranchDecisionOverlay, CampaignPresentationOverlay, EndingGalleryOverlay } from './CampaignPresentationOverlay';
import { requestDirectorSequence } from '../../systems/directorBus';

interface CampaignOpsProps {
  onRouteChange: (route: AppRoute) => void;
}

const moduleRoute: Partial<Record<CampaignModule, AppRoute>> = {
  codec: 'codec',
  sideops: 'sideops',
  vr: 'vr',
  tapes: 'tapes',
  lore: 'lore'
};

function rewardSummary(node: CampaignNodeDefinition): string[] {
  const reward = node.reward;
  return [
    reward.xp ? `${reward.xp} XP` : '',
    reward.resources?.commandPoints ? `${reward.resources.commandPoints} CP` : '',
    reward.resources?.intel ? `${reward.resources.intel} INTEL` : '',
    reward.resources?.supplies ? `${reward.resources.supplies} SUPPLY` : '',
    reward.resources?.credits ? `${reward.resources.credits} CR` : '',
    ...(reward.badges ?? []).map((badge) => `BADGE: ${badge}`),
    ...(reward.unlockMissionIds ?? []).map(() => 'SIDE OPS UNLOCK'),
    ...(reward.unlockVrMissionIds ?? []).map(() => 'VR UNLOCK'),
    ...(reward.unlockTapeIds ?? []).map(() => 'TAPE UNLOCK'),
    ...(reward.unlockContactIds ?? []).map(() => 'CONTACT UNLOCK'),
    ...(reward.unlockLoreIds ?? []).map(() => 'DOSSIER UNLOCK')
  ].filter(Boolean);
}

function conditionLabel(node: CampaignNodeDefinition): string {
  const condition = node.condition;
  if (condition.type === 'codec_call') return `Complete Codec call: ${condition.contactId}`;
  if (condition.type === 'sideops_clear') return `Clear ${condition.missionId}${condition.minimumRank ? ` at ${condition.minimumRank}+` : ''}`;
  if (condition.type === 'vr_clear') return `Clear ${condition.missionId}${condition.minimumRank ? ` at ${condition.minimumRank}+` : ''}`;
  if (condition.type === 'tape_listened') return `Listen to ${condition.tapeId}`;
  if (condition.type === 'lore_viewed') return `Review ${condition.loreId}`;
  if (condition.type === 'resource_minimum') return `Hold ${condition.amount} ${condition.resource}`;
  if (condition.type === 'badge_owned') return `Own badge: ${condition.badge}`;
  if (condition.type === 'variable_compare') return `${condition.variable} ${condition.operator.toUpperCase()} ${String(condition.value)}`;
  return 'Complete all prerequisite branches';
}

function costSummary(costs: Partial<CampaignResourceWallet>): string {
  return Object.entries(costs)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${value} ${key === 'commandPoints' ? 'CP' : key.toUpperCase()}`)
    .join(' / ');
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return hours > 0
    ? `${hours}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
    : `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

function manualQueueItem(
  campaign: CampaignDefinition,
  sourceType: CampaignPresentationQueueItem['sourceType'],
  sourceId: string,
  presentation: CampaignPresentationQueueItem['presentation']
): CampaignPresentationQueueItem {
  return {
    queueId: `manual:${campaign.id}:${sourceType}:${sourceId}:${presentation.id}`,
    campaignId: campaign.id,
    sourceType,
    sourceId,
    presentation
  };
}

export function CampaignOps({ onRouteChange }: CampaignOpsProps) {
  const definitions = useMemo(() => getCampaignDefinitions(), []);
  const previewCampaignId = useMemo(() => consumeCampaignBuilderPreviewId(), []);
  const [activeSlot, setActiveSlot] = useState<CampaignSlotId>(() => loadActiveCampaignSlot());
  const [progress, setProgress] = useState(() => {
    const loaded = loadCampaignProgress(activeSlot);
    return previewCampaignId && definitions.some((campaign) => campaign.id === previewCampaignId)
      ? saveCampaignProgress({ ...loaded, activeCampaignId: previewCampaignId }, activeSlot)
      : loaded;
  });
  const [slotSummaries, setSlotSummaries] = useState(() => getCampaignSlotSummaries());
  const [activeCampaignId, setActiveCampaignId] = useState((previewCampaignId && definitions.some((campaign) => campaign.id === previewCampaignId) ? previewCampaignId : progress.activeCampaignId) || definitions[0]?.id || '');
  const [systemMessage, setSystemMessage] = useState('CAMPAIGN NETWORK SYNCHRONIZED');
  const [transferBuffer, setTransferBuffer] = useState('');
  const [branchGroupId, setBranchGroupId] = useState<string | null>(null);
  const [manualPresentation, setManualPresentation] = useState<CampaignPresentationQueueItem | null>(null);
  const [endingGalleryOpen, setEndingGalleryOpen] = useState(false);
  const openedSlotRef = useRef<CampaignSlotId | null>(null);

  const activeCampaign = definitions.find((campaign) => campaign.id === activeCampaignId) ?? definitions[0];
  const completion = activeCampaign ? getCampaignCompletion(progress, activeCampaign) : { completed: 0, total: 0, percent: 0 };
  const levelProgress = getCampaignLevelProgress(progress.xp);
  const statistics = activeCampaign ? calculateCampaignStatistics(activeCampaign, progress) : null;
  const pendingPresentations = activeCampaign ? collectPendingCampaignPresentations(activeCampaign, progress) : [];
  const activePresentation = manualPresentation ?? pendingPresentations[0] ?? null;
  const endingEntries = useMemo(() => definitions.flatMap((campaign) => campaign.chapters.flatMap((chapter) => chapter.nodes.flatMap((node) => node.ending ? [{ campaignTitle: campaign.title, nodeTitle: node.title, ending: node.ending }] : []))), [definitions]);
  const branchOptions = useMemo(() => {
    if (!activeCampaign || !branchGroupId) return [];
    return activeCampaign.chapters.flatMap((chapter) => chapter.nodes).filter((node) => node.branch?.groupId === branchGroupId);
  }, [activeCampaign, branchGroupId]);

  useEffect(() => {
    if (openedSlotRef.current === activeSlot) return;
    openedSlotRef.current = activeSlot;
    const next = registerCampaignOpen(activeSlot);
    setProgress(next);
    setSlotSummaries(getCampaignSlotSummaries());
  }, [activeSlot]);

  function refreshProgress(message = 'CROSS-MODULE PROGRESS SYNCHRONIZED') {
    const next = synchronizeCampaignProgress(activeSlot);
    setProgress(next);
    setSlotSummaries(getCampaignSlotSummaries());
    setSystemMessage(message);
  }

  function changeCampaign(campaign: CampaignDefinition) {
    setActiveCampaignId(campaign.id);
    const next = saveCampaignProgress({ ...progress, activeCampaignId: campaign.id }, activeSlot);
    setProgress(next);
    setManualPresentation(null);
    setSystemMessage(`CAMPAIGN SELECTED: ${campaign.title.toUpperCase()}`);
  }

  function routeNode(node: CampaignNodeDefinition) {
    if (node.module === 'campaign') {
      refreshProgress('CAMPAIGN MILESTONE RECONCILED');
      return;
    }
    const route = moduleRoute[node.module];
    if (!route) return;
    if (node.module === 'sideops' && node.targetId) saveJson('sideops-active-mission-id', node.targetId);
    if (node.module === 'vr' && node.targetId) {
      const vrProgress = loadVrProgress();
      saveVrProgress({ ...vrProgress, activeMissionId: node.targetId });
    }
    setCampaignLaunchDirective({ module: node.module, targetId: node.targetId, era: node.era, nodeId: node.id });
    setSystemMessage(`ROUTING TO ${node.module.toUpperCase()}: ${node.title.toUpperCase()}`);
    onRouteChange(route);
  }

  function launchNode(node: CampaignNodeDefinition) {
    const status = getCampaignNodeStatus(node, progress);
    if (status === 'locked' || status === 'blocked') {
      setSystemMessage(status === 'blocked' ? 'BRANCH BLOCKED BY A PREVIOUS DOCTRINE CHOICE' : 'NODE LOCKED: COMPLETE THE PREREQUISITES FIRST');
      return;
    }
    if (status === 'choice' && node.branch) {
      setBranchGroupId(node.branch.groupId);
      setSystemMessage(`DECISION REQUIRED: ${node.branch.groupId.toUpperCase()}`);
      return;
    }
    routeNode(node);
  }

  function confirmBranch(node: CampaignNodeDefinition) {
    const result = chooseCampaignBranch(node, activeSlot);
    setProgress(result.progress);
    setSlotSummaries(getCampaignSlotSummaries());
    setSystemMessage(result.message.toUpperCase());
    setBranchGroupId(null);
    if (result.success && node.module !== 'campaign') routeNode(node);
  }

  function acknowledgePresentation() {
    if (!activePresentation) return;
    if (manualPresentation) {
      setManualPresentation(null);
      return;
    }
    const next = acknowledgeCampaignPresentationItem(activePresentation, activeSlot);
    setProgress(next);
    setSlotSummaries(getCampaignSlotSummaries());
    setSystemMessage(`NARRATIVE ARCHIVED: ${activePresentation.presentation.title.toUpperCase()}`);
  }

  function reviewPresentation(item: CampaignPresentationQueueItem) {
    setManualPresentation(item);
  }

  function purchase(upgradeId: string) {
    const result = purchaseCampaignUpgrade(upgradeId);
    setProgress(result.progress);
    setSlotSummaries(getCampaignSlotSummaries());
    setSystemMessage(result.message.toUpperCase());
  }

  function startNewGamePlus() {
    const result = startCampaignNewGamePlus(activeSlot);
    setProgress(result.progress);
    setActiveCampaignId(result.progress.activeCampaignId);
    setSlotSummaries(getCampaignSlotSummaries());
    setSystemMessage(result.message.toUpperCase());
  }

  function resetCampaign() {
    const next = resetCampaignProgress(activeSlot);
    setProgress(next);
    setActiveCampaignId(next.activeCampaignId);
    setSlotSummaries(getCampaignSlotSummaries());
    setSystemMessage('CAMPAIGN RESET — EXISTING MODULE RECORDS CAN BE RESYNCHRONIZED');
  }

  function switchSlot(slotId: CampaignSlotId) {
    setActiveCampaignSlot(slotId);
    const next = loadCampaignProgress(slotId);
    setActiveSlot(slotId);
    setProgress(next);
    setActiveCampaignId(next.activeCampaignId || definitions[0]?.id || '');
    setSlotSummaries(getCampaignSlotSummaries());
    setManualPresentation(null);
    setSystemMessage(`CAMPAIGN SLOT ${slotId.replace('slot_', '')} ONLINE`);
  }

  function exportSlot() {
    const payload = exportCampaignSlot(activeSlot);
    setTransferBuffer(payload);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `shadow-codec-ops-${activeSlot}-campaign-save.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setSystemMessage(`SLOT ${activeSlot.replace('slot_', '')} EXPORTED`);
  }

  function importSlot() {
    try {
      const next = importCampaignSlot(transferBuffer, activeSlot);
      setProgress(next);
      setActiveCampaignId(next.activeCampaignId || definitions[0]?.id || '');
      setSlotSummaries(getCampaignSlotSummaries());
      setSystemMessage(`SLOT ${activeSlot.replace('slot_', '')} IMPORTED`);
    } catch (error) {
      setSystemMessage(error instanceof Error ? `IMPORT FAILED: ${error.message.toUpperCase()}` : 'IMPORT FAILED');
    }
  }

  if (!activeCampaign) return <Panel title="Campaign Ops"><p>No campaign definitions loaded.</p></Panel>;

  return (
    <section className="campaign-page">
      {activePresentation && !branchGroupId && !endingGalleryOpen && <CampaignPresentationOverlay item={activePresentation} onAcknowledge={acknowledgePresentation} />}
      {branchGroupId && <BranchDecisionOverlay groupId={branchGroupId} options={branchOptions} onSelect={confirmBranch} onCancel={() => setBranchGroupId(null)} />}
      {endingGalleryOpen && <EndingGalleryOverlay endings={endingEntries} progress={progress} onClose={() => setEndingGalleryOpen(false)} />}

      <Panel className="campaign-command-panel">
        <div className="campaign-header">
          <div>
            <StatusBadge label={systemMessage} tone={systemMessage.includes('LOCKED') || systemMessage.includes('INSUFFICIENT') || systemMessage.includes('FAILED') ? 'danger' : 'success'} />
            <span className="campaign-kicker">CONNECTED OPERATIONS LAYER</span>
            <h2>{activeCampaign.title}</h2>
            <p>{activeCampaign.subtitle}</p>
            <small className="campaign-source-label">{activeCampaign.source === 'builder' ? `CUSTOM CAMPAIGN · ${activeCampaign.author ?? 'UNKNOWN AUTHOR'} · v${activeCampaign.version ?? '1.0.0'}` : 'BUILT-IN CAMPAIGN'}</small>
          </div>
          <div className="campaign-header-actions">
            {activeCampaign.briefing && <button type="button" className="primary-action secondary" onClick={() => reviewPresentation(manualQueueItem(activeCampaign, 'campaign', activeCampaign.id, activeCampaign.briefing!))}>REPLAY BRIEFING</button>}
            <button type="button" className="primary-action secondary" onClick={() => setEndingGalleryOpen(true)}>ENDING GALLERY</button>
            <button type="button" className="primary-action" onClick={() => refreshProgress()}>SYNC ALL MODULES</button>
            <button type="button" className="primary-action secondary" onClick={() => requestDirectorSequence('director_campaign_briefing', 'campaign', activeCampaign.title, { campaignLevel: progress.level, campaignXp: progress.xp })}>DIRECTOR BRIEFING</button>
            <button type="button" className="primary-action secondary" onClick={() => onRouteChange('campaignBuilder')}>OPEN BUILDER</button>
            {progress.achievedEndingIds.length > 0 && <button type="button" className="primary-action secondary" onClick={startNewGamePlus}>START NEW GAME+ {progress.newGamePlusCycle + 1}</button>}
            <button type="button" className="primary-action secondary" onClick={resetCampaign}>RESET CAMPAIGN</button>
          </div>
        </div>

        <div className="campaign-slot-deck" aria-label="Campaign save slots">
          {slotSummaries.map((slot) => (
            <button key={slot.slotId} type="button" className={slot.slotId === activeSlot ? 'active' : ''} onClick={() => switchSlot(slot.slotId)}>
              <span>SLOT {slot.slotId.replace('slot_', '')}</span>
              <strong>{slot.empty ? 'NEW GAME' : `LEVEL ${slot.level}`}</strong>
              <small>{slot.empty ? 'EMPTY' : `${slot.completedNodes} nodes / ${slot.xp} XP / ${slot.endings} endings / NG+${slot.newGamePlusCycle}`}</small>
            </button>
          ))}
        </div>

        {definitions.length > 1 && (
          <div className="campaign-selector">
            {definitions.map((campaign) => (
              <button key={campaign.id} type="button" className={campaign.id === activeCampaign.id ? 'active' : ''} onClick={() => changeCampaign(campaign)}>{campaign.title}</button>
            ))}
          </div>
        )}

        <div className="campaign-overview-grid">
          <div className="campaign-level-card">
            <span>OPERATIVE LEVEL</span><strong>{levelProgress.level}</strong>
            <div className="campaign-progress-bar"><i style={{ width: `${levelProgress.percent}%` }} /></div>
            <small>{levelProgress.current}/{levelProgress.required} XP TO NEXT LEVEL</small>
          </div>
          <div className="campaign-completion-card">
            <span>CAMPAIGN COMPLETION</span><strong>{completion.percent}%</strong>
            <div className="campaign-progress-bar"><i style={{ width: `${completion.percent}%` }} /></div>
            <small>{completion.completed}/{completion.total} REQUIRED NODES</small>
          </div>
          <div className="campaign-wallet-card">
            <div><span>COMMAND</span><strong>{progress.resources.commandPoints}</strong></div>
            <div><span>INTEL</span><strong>{progress.resources.intel}</strong></div>
            <div><span>SUPPLY</span><strong>{progress.resources.supplies}</strong></div>
            <div><span>CREDITS</span><strong>{progress.resources.credits}</strong></div>
          </div>
        </div>
        <p className="campaign-description">{activeCampaign.description}</p>
        <p className="campaign-freeplay-note">Campaign locks only control this connected progression route. Side Ops and VR Free Play remain available from their normal modules.</p>
      </Panel>

      <div className="campaign-content-grid">
        <div className="campaign-chapters-column">
          {activeCampaign.chapters.map((chapter, chapterIndex) => {
            const availableChapterNodes = chapter.nodes.filter((node) => !node.optional && getCampaignNodeStatus(node, progress) !== 'blocked');
            const chapterCompleted = availableChapterNodes.filter((node) => progress.completedNodeIds.includes(node.id)).length;
            const chapterTotal = availableChapterNodes.length;
            return (
              <Panel key={chapter.id} className="campaign-chapter-panel">
                <div className="campaign-chapter-heading">
                  <div>
                    <span>CHAPTER {String(chapterIndex + 1).padStart(2, '0')}</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.subtitle}</p>
                  </div>
                  <div className="campaign-chapter-actions">
                    <StatusBadge label={`${chapterCompleted}/${chapterTotal} COMPLETE`} tone={chapterCompleted === chapterTotal ? 'success' : 'warning'} />
                    {chapter.briefing && <button type="button" onClick={() => reviewPresentation(manualQueueItem(activeCampaign, 'chapter', `${chapter.id}:briefing`, chapter.briefing!))}>BRIEFING</button>}
                    {chapter.debriefing && chapterCompleted === chapterTotal && <button type="button" onClick={() => reviewPresentation(manualQueueItem(activeCampaign, 'chapter', `${chapter.id}:debriefing`, chapter.debriefing!))}>DEBRIEF</button>}
                  </div>
                </div>
                <p>{chapter.description}</p>
                <div className="campaign-node-list">
                  {chapter.nodes.map((node, nodeIndex) => {
                    const status = getCampaignNodeStatus(node, progress);
                    const rewards = rewardSummary(node);
                    return (
                      <article key={node.id} className={`campaign-node ${status}`}>
                        <div className="campaign-node-index">{String(nodeIndex + 1).padStart(2, '0')}</div>
                        <div className="campaign-node-body">
                          <div className="campaign-node-title-row">
                            <div><span>{node.module.toUpperCase()} {node.optional ? '// OPTIONAL' : ''}</span><h4>{node.title}</h4></div>
                            <StatusBadge label={status.toUpperCase()} tone={status === 'complete' ? 'success' : status === 'active' || status === 'choice' ? 'warning' : status === 'blocked' ? 'danger' : 'neutral'} />
                          </div>
                          <p>{node.description}</p>
                          <small className="campaign-condition">OBJECTIVE // {conditionLabel(node)}</small>
                          {(node.additionalConditions?.length ?? 0) > 0 && <small className="campaign-condition-logic">{node.conditionLogic === 'any' ? 'OR' : 'AND'} // {node.additionalConditions!.length + 1} CONDITIONS</small>}
                          {node.branch && <small className="campaign-branch-label">BRANCH // {node.branch.groupId} → {node.branch.label}</small>}
                          {node.ending && <small className={`campaign-ending-label ${node.ending.tone}`}>ENDING // {node.ending.title}</small>}
                          {node.variableEffects?.length ? <small className="campaign-variable-label">VARIABLES // {node.variableEffects.map((effect) => `${effect.variable}:${effect.operation}`).join(' · ')}</small> : null}
                          <div className="campaign-reward-strip">{rewards.map((reward) => <span key={reward}>{reward}</span>)}</div>
                          {status === 'complete' && node.completionPresentation && (
                            <button type="button" className="campaign-inline-review" onClick={() => reviewPresentation(manualQueueItem(activeCampaign, 'node', node.id, node.completionPresentation!))}>REVIEW NARRATIVE</button>
                          )}
                        </div>
                        <button type="button" className="campaign-node-action" disabled={status === 'locked' || status === 'blocked'} onClick={() => launchNode(node)}>
                          {status === 'complete' ? 'REPLAY / REVIEW' : status === 'choice' ? 'REVIEW DECISION' : node.module === 'campaign' ? 'RECONCILE' : `OPEN ${node.module.toUpperCase()}`}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </Panel>
            );
          })}
        </div>

        <aside className="campaign-sidebar">
          {statistics && (
            <Panel title="Campaign Statistics">
              <div className="campaign-stat-grid">
                <div><span>NODES</span><strong>{statistics.nodesCompleted}</strong></div>
                <div><span>BRANCHES</span><strong>{statistics.branchesCommitted}</strong></div>
                <div><span>ENDINGS</span><strong>{statistics.endingsUnlocked}</strong></div>
                <div><span>OPENED</span><strong>{statistics.campaignOpenCount}</strong></div>
                <div><span>SIDE OPS</span><strong>{statistics.sideOpsClears}</strong><small>{statistics.bestSideOpsRank}</small></div>
                <div><span>VR CLEARS</span><strong>{statistics.vrClears}</strong><small>{statistics.bestVrRank}</small></div>
                <div><span>CODEC</span><strong>{statistics.codecCalls}</strong></div>
                <div><span>ARCHIVES</span><strong>{statistics.tapesListened + statistics.loreViewed}</strong></div>
              </div>
              <div className="campaign-stat-lines">
                <span>Side Ops score <strong>{statistics.sideOpsScoreTotal.toLocaleString()}</strong></span>
                <span>VR score <strong>{statistics.vrScoreTotal.toLocaleString()}</strong></span>
                <span>Recorded field time <strong>{formatDuration(statistics.sideOpsTimeSeconds + statistics.vrTimeSeconds)}</strong></span>
                <span>Narrative scenes <strong>{progress.presentationHistory.length}</strong></span>
              </div>
            </Panel>
          )}

          <Panel title="Persistent Variables">
            <div className="campaign-variable-list">
              {Object.keys(progress.variables).length ? Object.entries(progress.variables).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => (
                <div key={key}><span>{key}</span><strong>{String(value)}</strong></div>
              )) : <p>No persistent narrative variables set.</p>}
            </div>
          </Panel>

          <Panel title="Field Requisitions">
            <p>Permanent loadout upgrades purchased with campaign resources.</p>
            <div className="campaign-upgrade-list">
              {campaignUpgrades.map((upgrade) => {
                const purchased = progress.purchasedUpgradeIds.includes(upgrade.id);
                return (
                  <div key={upgrade.id} className={`campaign-upgrade ${purchased ? 'purchased' : ''}`}>
                    <strong>{upgrade.title}</strong><p>{upgrade.description}</p><span>{costSummary(upgrade.costs)}</span>
                    <button type="button" disabled={purchased} onClick={() => purchase(upgrade.id)}>{purchased ? 'ACQUIRED' : 'REQUISITION'}</button>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Unlocked Network">
            <ul className="campaign-unlock-list">
              <li><span>Side Ops</span><strong>{progress.unlockedMissionIds.length}</strong></li>
              <li><span>VR Missions</span><strong>{progress.unlockedVrMissionIds.length}</strong></li>
              <li><span>Tapes</span><strong>{progress.unlockedTapeIds.length}</strong></li>
              <li><span>Contacts</span><strong>{progress.unlockedContactIds.length}</strong></li>
              <li><span>Lore Dossiers</span><strong>{progress.unlockedLoreIds.length}</strong></li>
              <li><span>Badges</span><strong>{progress.badges.length}</strong></li>
            </ul>
            <div className="campaign-badge-cloud">{progress.badges.length ? progress.badges.map((badge) => <span key={badge}>{badge}</span>) : <em>No campaign badges yet.</em>}</div>
          </Panel>

          <Panel title="Narrative Archive">
            <div className="campaign-narrative-history">
              {progress.presentationHistory.length ? progress.presentationHistory.slice(0, 12).map((record) => (
                <div key={record.id}><span>{record.sourceType.toUpperCase()} // {record.tone.toUpperCase()}</span><strong>{record.title}</strong><small>{new Date(record.viewedAt).toLocaleString()}</small></div>
              )) : <p>No narrative transmissions archived.</p>}
            </div>
          </Panel>

          <Panel title="Campaign Save Transfer">
            <p>Export or import only the active campaign slot. Module free-play records remain independent.</p>
            <textarea className="campaign-transfer-buffer" value={transferBuffer} onChange={(event) => setTransferBuffer(event.target.value)} placeholder="Campaign save JSON…" />
            <div className="campaign-transfer-actions"><button type="button" onClick={exportSlot}>EXPORT SLOT</button><button type="button" onClick={importSlot} disabled={!transferBuffer.trim()}>IMPORT INTO SLOT</button></div>
          </Panel>

          <Panel title="Branch & Ending Archive">
            <div className="campaign-branch-archive">
              <div><strong>New Game+ cycle</strong><span>Cycle {progress.newGamePlusCycle}</span></div>
              <div><strong>Committed doctrines</strong>{Object.keys(progress.branchChoices).length ? Object.entries(progress.branchChoices).map(([group, option]) => <span key={group}>{group} → {option}</span>) : <em>No exclusive branch selected.</em>}</div>
              <div><strong>Achieved endings</strong>{progress.achievedEndingIds.length ? progress.achievedEndingIds.map((endingId) => {
                const ending = endingEntries.find((entry) => entry.ending.id === endingId)?.ending;
                return <button type="button" key={endingId} className="campaign-ending-archive-button" onClick={() => setEndingGalleryOpen(true)}>{ending?.title ?? endingId}</button>;
              }) : <em>No campaign ending achieved.</em>}</div>
            </div>
          </Panel>

          <Panel title="Operations Log">
            <div className="campaign-event-log">{progress.events.length ? progress.events.slice(0, 12).map((event) => (
              <div key={event.id}><strong>{event.label}</strong><span>{event.detail}</span><small>{new Date(event.timestamp).toLocaleString()}</small></div>
            )) : <p>No campaign events recorded.</p>}</div>
          </Panel>
        </aside>
      </div>
    </section>
  );
}
