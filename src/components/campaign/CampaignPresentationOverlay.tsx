import { useEffect, useMemo, useState } from 'react';
import type {
  CampaignEndingDefinition,
  CampaignNodeDefinition,
  CampaignPresentationQueueItem,
  CampaignProgress
} from '../../types/campaign.types';

interface CampaignPresentationOverlayProps {
  item: CampaignPresentationQueueItem;
  onAcknowledge: () => void;
}

export function CampaignPresentationOverlay({ item, onAcknowledge }: CampaignPresentationOverlayProps) {
  const presentation = item.presentation;
  const beats = useMemo(() => presentation.beats ?? [], [presentation.beats]);
  const [beatIndex, setBeatIndex] = useState(0);
  const activeBeat = beats[beatIndex];
  const isFinalBeat = !beats.length || beatIndex >= beats.length - 1;

  useEffect(() => {
    setBeatIndex(0);
  }, [item.queueId]);

  function advance() {
    if (!isFinalBeat) {
      setBeatIndex((value) => value + 1);
      return;
    }
    onAcknowledge();
  }

  return (
    <div className={`campaign-presentation-overlay tone-${presentation.tone ?? 'neutral'}`} role="dialog" aria-modal="true" aria-labelledby="campaign-presentation-title">
      <div className="campaign-presentation-noise" />
      <article className="campaign-presentation-card">
        <header>
          <span>{presentation.eyebrow ?? `${item.sourceType.toUpperCase()} TRANSMISSION`}</span>
          <small>{item.campaignId} // {item.sourceId}</small>
        </header>
        <div className="campaign-presentation-signal"><i /></div>
        <section>
          <p className="campaign-presentation-speaker">{activeBeat?.speaker ?? presentation.speaker ?? 'TACTICAL NETWORK'}</p>
          <h2 id="campaign-presentation-title">{presentation.title}</h2>
          {presentation.subtitle && <h3>{presentation.subtitle}</h3>}
          {activeBeat ? (
            <p className={`campaign-presentation-beat emphasis-${activeBeat.emphasis ?? 'normal'}`}>{activeBeat.text}</p>
          ) : (
            <p className="campaign-presentation-beat">{presentation.body}</p>
          )}
        </section>
        <footer>
          <div className="campaign-presentation-progress" aria-label="Narrative progress">
            {(beats.length ? beats : [{ text: presentation.body ?? '' }]).map((_, index) => (
              <i key={index} className={index <= beatIndex ? 'active' : ''} />
            ))}
          </div>
          <div className="campaign-presentation-actions">
            {presentation.skippable !== false && beats.length > 1 && !isFinalBeat && (
              <button type="button" onClick={onAcknowledge}>SKIP TRANSMISSION</button>
            )}
            <button type="button" className="primary-action" onClick={advance} autoFocus>
              {isFinalBeat ? (presentation.confirmLabel ?? 'ACKNOWLEDGE') : 'NEXT SIGNAL'}
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}

interface BranchDecisionOverlayProps {
  groupId: string;
  options: CampaignNodeDefinition[];
  onSelect: (node: CampaignNodeDefinition) => void;
  onCancel: () => void;
}

export function BranchDecisionOverlay({ groupId, options, onSelect, onCancel }: BranchDecisionOverlayProps) {
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? '');
  const selected = options.find((node) => node.id === selectedId) ?? options[0];

  return (
    <div className="campaign-branch-overlay" role="dialog" aria-modal="true" aria-labelledby="campaign-branch-title">
      <div className="campaign-branch-decision-shell">
        <header>
          <span>EXCLUSIVE OPERATIONAL DECISION</span>
          <h2 id="campaign-branch-title">{selected?.branch?.choicePresentation?.title ?? 'Choose an operational doctrine'}</h2>
          <p>{selected?.branch?.choicePresentation?.body ?? 'This selection is persistent for the current campaign slot until reset or New Game+.'}</p>
          <small>BRANCH GROUP // {groupId}</small>
        </header>
        <div className="campaign-branch-choice-grid">
          {options.map((node) => {
            const active = node.id === selected?.id;
            return (
              <button key={node.id} type="button" className={`campaign-branch-choice-card ${active ? 'active' : ''}`} onClick={() => setSelectedId(node.id)}>
                <span>{node.branch?.choicePresentation?.eyebrow ?? 'DOCTRINE'}</span>
                <strong>{node.branch?.label ?? node.title}</strong>
                <p>{node.branch?.description ?? node.description}</p>
                {node.branch?.consequenceText && <small>CONSEQUENCE // {node.branch.consequenceText}</small>}
                <i>{active ? 'SELECTED FOR REVIEW' : 'SELECT ROUTE'}</i>
              </button>
            );
          })}
        </div>
        <footer>
          <button type="button" onClick={onCancel}>RETURN TO OPERATIONS</button>
          <button type="button" className="primary-action" disabled={!selected} onClick={() => selected && onSelect(selected)}>
            CONFIRM {selected?.branch?.label?.toUpperCase() ?? 'BRANCH'}
          </button>
        </footer>
      </div>
    </div>
  );
}

interface EndingGalleryOverlayProps {
  endings: Array<{ campaignTitle: string; nodeTitle: string; ending: CampaignEndingDefinition }>;
  progress: CampaignProgress;
  onClose: () => void;
}

export function EndingGalleryOverlay({ endings, progress, onClose }: EndingGalleryOverlayProps) {
  const firstUnlocked = endings.find((entry) => progress.achievedEndingIds.includes(entry.ending.id));
  const [selectedId, setSelectedId] = useState(firstUnlocked?.ending.id ?? endings[0]?.ending.id ?? '');
  const selected = endings.find((entry) => entry.ending.id === selectedId);
  const unlocked = selected ? progress.achievedEndingIds.includes(selected.ending.id) : false;

  return (
    <div className="campaign-ending-gallery-overlay" role="dialog" aria-modal="true" aria-labelledby="ending-gallery-title">
      <div className="campaign-ending-gallery-shell">
        <header>
          <div>
            <span>CAMPAIGN CONCLUSION ARCHIVE</span>
            <h2 id="ending-gallery-title">Ending Gallery</h2>
          </div>
          <button type="button" onClick={onClose}>CLOSE ARCHIVE</button>
        </header>
        <div className="campaign-ending-gallery-grid">
          <nav aria-label="Campaign endings">
            {endings.map((entry) => {
              const isUnlocked = progress.achievedEndingIds.includes(entry.ending.id);
              return (
                <button
                  key={entry.ending.id}
                  type="button"
                  className={`${selectedId === entry.ending.id ? 'active' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`}
                  onClick={() => setSelectedId(entry.ending.id)}
                >
                  <span>{isUnlocked ? entry.ending.tone.toUpperCase() : 'ENCRYPTED'}</span>
                  <strong>{isUnlocked ? entry.ending.title : 'UNKNOWN ENDING'}</strong>
                  <small>{entry.campaignTitle}</small>
                </button>
              );
            })}
          </nav>
          <article className={`campaign-ending-feature tone-${selected?.ending.tone ?? 'neutral'} ${unlocked ? '' : 'locked'}`}>
            <span>{unlocked ? selected?.ending.tone.toUpperCase() : 'DATA LOCKED'}</span>
            <h3>{unlocked ? selected?.ending.title : 'CLASSIFIED CONCLUSION'}</h3>
            <p>{unlocked ? selected?.ending.summary : 'Complete the corresponding campaign route to decrypt this ending.'}</p>
            {unlocked && selected?.ending.epilogue && (
              <blockquote>
                <strong>{selected.ending.epilogue.speaker ?? 'ARCHIVE'}</strong>
                {selected.ending.epilogue.body ?? selected.ending.epilogue.beats?.map((beat) => beat.text).join(' ')}
              </blockquote>
            )}
            <footer>{unlocked ? `SOURCE // ${selected?.nodeTitle}` : 'NO ACCESS KEY DETECTED'}</footer>
          </article>
        </div>
      </div>
    </div>
  );
}
