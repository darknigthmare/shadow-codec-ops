import { useMemo, useState, type CSSProperties } from 'react';
import type { CallHistoryEntry, CodecContextDefinition, ContactDefinition, ConversationDefinition } from '../../types/codec.types';
import type { Mgs1ContactProfile } from '../../types/mgs1Profile.types';
import {
  getMgs1ContactStatusLabel,
  getMgs1DiscoverySummary,
  getMgs1VisibleStoryVariants,
  resolveMgs1IdentityLabel,
  resolveMgs1StoryVariant
} from '../../systems/mgs1ContentEngine';
import {
  getMgs1ItemsForContact,
  getMgs1PortraitSet,
  getMgs1TimelineState,
  getMgs1ZoneForContext
} from '../../systems/mgs1Encyclopedia';
import { getCharacterPortrait } from '../../systems/codecAssetEngine';

interface Props {
  profile: Mgs1ContactProfile;
  contact: ContactDefinition;
  context: CodecContextDefinition;
  conversations: ConversationDefinition[];
  history: CallHistoryEntry[];
  memoryContactIds: string[];
  locale: 'en' | 'fr' | 'ja';
  onSelectTopic: (topicId: string) => void;
}

type Tab = 'profile' | 'network' | 'field' | 'timeline' | 'portraits';

export function Mgs1ContactDossier({
  profile,
  contact,
  context,
  conversations,
  history,
  memoryContactIds,
  locale,
  onSelectTopic
}: Props) {
  const [tab, setTab] = useState<Tab>('profile');
  const summary = getMgs1DiscoverySummary(profile, conversations, history, context.id);
  const identity = resolveMgs1IdentityLabel(profile, context.flags);
  const status = getMgs1ContactStatusLabel(contact, profile, context, memoryContactIds);
  const localized = <T extends { en: string; fr: string }>(value: T) => locale === 'fr' ? value.fr : value.en;
  const zones = useMemo(() => getMgs1ZoneForContext(context.id), [context.id]);
  const items = useMemo(() => getMgs1ItemsForContact(profile.id), [profile.id]);
  const timeline = useMemo(() => getMgs1TimelineState(context.id, context.flags), [context.id, context.flags]);
  const portraits = getMgs1PortraitSet(profile.id);
  const visibleRelations = profile.relations.filter((relation) => (
    !relation.requiredFlags?.length || relation.requiredFlags.every((flag) => context.flags.includes(flag))
  ));
  const visibleStoryVariants = getMgs1VisibleStoryVariants(profile, context.id, context.flags);
  const activeStoryVariant = resolveMgs1StoryVariant(profile.id, context.id, context.flags);
  const hideDeepthroatIdentity = profile.id === 'deepthroat_mgs1' && !context.flags.includes('gray_fox_identity_revealed');
  const profileSummary = hideDeepthroatIdentity
    ? (locale === 'fr' ? "Source anonyme d'avertissements et d'indices entrants." : 'Anonymous source of incoming warnings and hints.')
    : localized(profile.summary);
  const profileBiography = hideDeepthroatIdentity
    ? (locale === 'fr'
      ? "Le canal commence comme un signal inconnu et ne devient rappelable qu'apres sa premiere transmission."
      : 'The channel begins as an unknown signal and becomes recallable only after its first transmission.')
    : localized(profile.biography);

  return (
    <div className="mgs1-dossier">
      <header className="mgs1-dossier-header">
        <div>
          <span>FOXHOUND CODEC PERSONNEL FILE</span>
          <h2>{identity}</h2>
          <p>{profile.role}</p>
        </div>
        <div className="mgs1-dossier-status">
          <strong>{status}</strong>
          <small>{contact.frequencyLabel ?? contact.frequency.toFixed(2)}</small>
        </div>
      </header>

      <nav className="mgs1-dossier-tabs" aria-label="Personnel file sections">
        {(['profile', 'network', 'field', 'timeline', 'portraits'] as Tab[]).map((entry) => (
          <button type="button" key={entry} className={tab === entry ? 'active' : ''} onClick={() => setTab(entry)}>
            {entry}
          </button>
        ))}
      </nav>

      {tab === 'profile' && (
        <>
          <div className="mgs1-dossier-grid">
            <section>
              <h3>PROFILE</h3>
              <p>{profileSummary}</p>
              <p>{profileBiography}</p>
              <dl>
                <div><dt>Affiliations</dt><dd>{profile.affiliations.join(' / ')}</dd></div>
                <div><dt>Reveal state</dt><dd>{profile.revealState.replace(/_/g, ' ')}</dd></div>
                <div><dt>Available chapters</dt><dd>{summary.availableChapters}</dd></div>
              </dl>
            </section>
            <section>
              <h3>DISCOVERY</h3>
              <div className="mgs1-completion-ring" style={{ '--completion': `${summary.completionPercent}%` } as CSSProperties}>
                <strong>{summary.completionPercent}%</strong>
                <span>CALL FILE</span>
              </div>
              <div className="mgs1-dossier-metrics">
                <span>{summary.heardConversations}/{summary.totalConversations} calls</span>
                <span>{summary.discoveredTopics}/{summary.totalTopics} topics</span>
              </div>
            </section>
          </div>
          <section>
            <h3>TOPIC DIRECTORY</h3>
            <div className="mgs1-topic-directory">
              {profile.topics.map((topic) => (
                <button type="button" key={topic} onClick={() => onSelectTopic(topic)}>{topic.replace(/_/g, ' ')}</button>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === 'network' && (
        <section>
          <h3>RELATIONSHIP NETWORK</h3>
          <div className="mgs1-relation-graph">
            <div className="mgs1-relation-core">{identity}</div>
            {visibleRelations.map((relation) => (
              <article key={`${relation.personId}-${relation.label}`}>
                <strong>{relation.label}</strong>
                <span>{relation.personId.replace(/_/g, ' ')}</span>
                <p>{relation.detail}</p>
              </article>
            ))}
          </div>
          <h3>LORE NOTES</h3>
          <ul>{profile.loreNotes.map((note) => <li key={note}>{note}</li>)}</ul>
        </section>
      )}

      {tab === 'field' && (
        <div className="mgs1-dossier-grid">
          <section>
            <h3>CURRENT AREA FILE</h3>
            {zones.length ? zones.map((zone) => (
              <article className="mgs1-encyclopedia-card" key={zone.id}>
                <strong>{locale === 'fr' ? zone.nameFr : zone.name}</strong>
                <p>{localized(zone.summary)}</p>
                <small>{zone.tags.join(' / ')}</small>
              </article>
            )) : <p>No dedicated area file for this chapter.</p>}
          </section>
          <section>
            <h3>EXPERT EQUIPMENT FILES</h3>
            <div className="mgs1-encyclopedia-list">
              {items.map((item) => (
                <article className="mgs1-encyclopedia-card" key={item.id}>
                  <strong>{locale === 'fr' ? item.nameFr : item.name}</strong>
                  <span>{item.category}</span>
                  <p>{localized(item.summary)}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === 'timeline' && (
        <section>
          <h3>SHADOW MOSES TIMELINE</h3>
          <div className="mgs1-timeline">
            {timeline.map((entry) => (
              <article key={entry.id} className={`${entry.complete ? 'complete' : ''} ${entry.active ? 'active' : ''}`}>
                <span className="mgs1-timeline-node" />
                <div>
                  <strong>{locale === 'fr' ? entry.titleFr : entry.title}</strong>
                  <small>{entry.contextId.replace('mgs1_', '').replace(/_/g, ' ')}</small>
                  <p>{localized(entry.summary)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === 'portraits' && (
        <section>
          <h3>PORTRAIT & EXPRESSION CATALOGUE</h3>
          {portraits && (
            <>
              <div className="mgs1-expression-grid">
                {portraits.expressions.map((expression) => {
                  const image = getCharacterPortrait(contact.id, expression, { contextId: context.id, flags: context.flags });
                  return (
                    <div key={expression} className={`mgs1-expression-card expression-${expression}`}>
                      <div className="mgs1-expression-face">
                        {image ? <img src={image} alt={`${identity} - ${expression}`} loading="lazy" /> : identity.slice(0, 2).toUpperCase()}
                      </div>
                      <strong>{expression}</strong>
                    </div>
                  );
                })}
              </div>
              <h3>STORY VARIANTS</h3>
              <div className="mgs1-topic-directory">
                {visibleStoryVariants.map((variant) => (
                  <span key={variant} className={variant === activeStoryVariant ? 'active-story-variant' : ''}>
                    {variant.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
