import type {
  ContactDefinition,
  ConversationDefinition,
  ConversationTrigger,
  EraId
} from '../types/codec.types';

export function getConversationById(
  conversationId: string,
  conversations: ConversationDefinition[]
): ConversationDefinition | undefined {
  return conversations.find((conversation) => conversation.id === conversationId);
}

export function getConversationForContact(
  contact: ContactDefinition,
  conversations: ConversationDefinition[],
  trigger: ConversationTrigger = 'manual_call'
): ConversationDefinition | undefined {
  return (
    conversations.find(
      (conversation) => conversation.contactId === contact.id && conversation.trigger === trigger
    ) ??
    conversations.find((conversation) => conversation.id === contact.defaultConversation) ??
    conversations.find((conversation) => conversation.contactId === contact.id)
  );
}

export function getConversationByTrigger(
  era: EraId,
  trigger: ConversationTrigger,
  conversations: ConversationDefinition[]
): ConversationDefinition | undefined {
  return conversations.find(
    (conversation) => conversation.era === era && conversation.trigger === trigger
  );
}

function normalizeSpeaker(value?: string): string {
  return (value ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function getSpeakerLabel(speaker: string, contact?: ContactDefinition): string {
  const normalizedSpeaker = normalizeSpeaker(speaker);

  const playerLabels: Record<string, string> = {
    snake: 'Solid Snake',
    solidsnake: 'Solid Snake',
    raiden: 'Raiden',
    jack: 'Raiden',
    bigboss: 'Big Boss',
    nakedsnake: 'Naked Snake',
    venomsnake: 'Venom Snake',
    boss: 'Venom Snake',
    player: 'Player'
  };

  if (playerLabels[normalizedSpeaker]) return playerLabels[normalizedSpeaker];

  if (contact) {
    const contactAliases = [
      contact.id,
      contact.codename,
      contact.name,
      contact.name.split(' ')[0],
      contact.name.split(' ')[contact.name.split(' ').length - 1]
    ].map(normalizeSpeaker);

    if (contactAliases.some((alias) => alias && (alias === normalizedSpeaker || normalizedSpeaker.includes(alias)))) {
      return contact.name;
    }
  }

  const specialLabels: Record<string, string> = {
    campbell: 'Colonel Campbell',
    colonel: 'Colonel',
    colonelai: 'Colonel AI',
    otacon: 'Otacon',
    meiling: 'Mei Ling',
    naomi: 'Naomi Hunter',
    nastasha: 'Nastasha Romanenko',
    miller: 'Master Miller',
    majorzero: 'Major Zero',
    major: 'Major Zero',
    paramedic: 'Para-Medic',
    theboss: 'The Boss',
    drebin: 'Drebin',
    ocelot: 'Ocelot',
    vrinstructor: 'VR Instructor',
    kasler: 'George Kasler',
    holly: 'Holly White',
    jacobsen: 'Johan Jacobsen'
  };

  if (specialLabels[normalizedSpeaker]) return specialLabels[normalizedSpeaker];

  return speaker
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
