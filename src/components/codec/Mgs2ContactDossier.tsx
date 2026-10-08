import { useState } from 'react';
import type { CallHistoryEntry, CodecContextDefinition, ContactDefinition, ConversationDefinition } from '../../types/codec.types';
import type { Mgs2ContactProfile } from '../../types/mgs2Profile.types';
import { getMgs2DiscoverySummary, getMgs2ItemsForContact, getMgs2PortraitSets, getMgs2TimelineState, getMgs2ZoneForContext, resolveMgs2IdentityLabel } from '../../systems/mgs2ContentEngine';

interface Props {
  profile: Mgs2ContactProfile;
  contact: ContactDefinition;
  context: CodecContextDefinition;
  conversations: ConversationDefinition[];
  history: CallHistoryEntry[];
  locale: 'en' | 'fr';
  onSelectTopic: (topicId: string) => void;
}

type Tab = 'profile' | 'network' | 'field' | 'timeline' | 'portraits';

export function Mgs2ContactDossier({ profile, contact, context, conversations, history, locale, onSelectTopic }: Props) {
  const [tab, setTab] = useState<Tab>('profile');
  const summary = getMgs2DiscoverySummary(profile, conversations, history);
  const identity = resolveMgs2IdentityLabel(profile, context.flags);
  const items = getMgs2ItemsForContact(profile.id);
  const zone = getMgs2ZoneForContext(context.id);
  const timeline = getMgs2TimelineState(context.id, context.flags);
  const portraitSet = getMgs2PortraitSets().find((entry) => entry.contactId === profile.id);
  const text = <T extends { en: string; fr: string }>(value: T) => value[locale];

  return (
    <div className="mgs1-dossier mgs2-dossier">
      <header className="mgs1-dossier-header">
        <div><span>ACTIVE IDENTITY</span><strong>{identity}</strong><small>{profile.role}</small></div>
        <div><span>CHANNEL</span><strong>{contact.frequency.toFixed(2)}</strong><small>{context.name}</small></div>
        <div><span>DISCOVERY</span><strong>{summary.completionPercent}%</strong><small>{summary.heardConversations}/{summary.totalConversations} calls</small></div>
      </header>
      <nav className="mgs1-dossier-tabs" aria-label="MGS2 dossier sections">
        {(['profile','network','field','timeline','portraits'] as Tab[]).map((entry) => <button type="button" className={tab === entry ? 'active' : ''} onClick={() => setTab(entry)} key={entry}>{entry.toUpperCase()}</button>)}
      </nav>

      {tab === 'profile' && <section className="mgs1-dossier-section"><h3>{profile.displayName}</h3><p>{text(profile.summary)}</p><p>{text(profile.biography)}</p><div className="mgs1-topic-grid">{profile.topics.map((topic) => <button type="button" key={topic} onClick={() => onSelectTopic(topic)}>{topic.replace(/_/g, ' ')}</button>)}</div></section>}
      {tab === 'network' && <section className="mgs1-dossier-section"><h3>RELATION NETWORK</h3><div className="mgs1-relation-grid">{profile.relations.map((relation) => <article key={`${profile.id}-${relation.personId}`}><strong>{relation.label}</strong><span>{relation.personId.replace(/_/g, ' ')}</span><p>{relation.detail}</p></article>)}</div><p><strong>Affiliations:</strong> {profile.affiliations.join(' / ')}</p></section>}
      {tab === 'field' && <section className="mgs1-dossier-section"><h3>CURRENT AREA</h3>{zone ? <article className="mgs1-zone-card"><strong>{locale === 'fr' ? zone.nameFr : zone.name}</strong><p>{text(zone.summary)}</p><small>{zone.tags.join(' / ')}</small></article> : <p>No area dossier for this context.</p>}<h3>EXPERT EQUIPMENT</h3><div className="mgs1-item-list">{items.map((item) => <article key={item.id}><strong>{locale === 'fr' ? item.nameFr : item.name}</strong><small>{item.category}</small><p>{text(item.summary)}</p></article>)}</div></section>}
      {tab === 'timeline' && <section className="mgs1-dossier-section"><h3>SONS OF LIBERTY TIMELINE</h3><div className="mgs1-timeline">{timeline.map((entry) => <article key={entry.id} className={`${entry.active ? 'active' : ''} ${entry.complete ? 'complete' : ''}`}><strong>{locale === 'fr' ? entry.titleFr : entry.title}</strong><p>{text(entry.summary)}</p></article>)}</div></section>}
      {tab === 'portraits' && <section className="mgs1-dossier-section"><h3>IDENTITY STATES</h3><div className="mgs1-portrait-grid">{portraitSet?.expressions.map((expression) => <span key={expression}>{expression}</span>)}</div><h3>STORY VARIANTS</h3><ul>{portraitSet?.storyVariants.map((variant) => <li key={variant}>{variant}</li>)}</ul><h3>LORE NOTES</h3><ul>{profile.loreNotes.map((note) => <li key={note}>{note}</li>)}</ul></section>}
    </div>
  );
}
