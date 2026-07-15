import type {
  CallHistoryEntry,
  CodecCallTopic,
  ContactDefinition,
  ConversationDefinition,
  ConversationTrigger,
  EraId
} from '../types/codec.types';
import { getPreferredContactFrequency } from './frequencyEngine';

const SUBJECT_LABELS: Record<string, { label: string; description: string }> = {
  mission: { label: 'Mission', description: 'Current orders, priorities and mission status.' },
  objective: { label: 'Objective', description: 'Review the active objective and route.' },
  alert: { label: 'Alert Protocol', description: 'Advice for suspicion, alerts and reinforcements.' },
  save: { label: 'Save Data', description: 'Record or restore Codec simulation data.' },
  memory: { label: 'Codec Memory', description: 'Review stored contacts and call records.' },
  medical: { label: 'Medical', description: 'Health, wounds and combat readiness.' },
  condition: { label: 'Condition', description: 'Status evaluation and recovery advice.' },
  genetics: { label: 'Genetics', description: 'Biology, genetics and nanomachine support.' },
  technology: { label: 'Technology', description: 'Technical systems and electronic equipment.' },
  security: { label: 'Security', description: 'Cameras, locks and facility systems.' },
  electronics: { label: 'Electronics', description: 'Electronic disruption and countermeasures.' },
  weapons: { label: 'Weapons', description: 'Weapon handling and tactical use.' },
  nuclear: { label: 'Nuclear Intel', description: 'Nuclear systems and military hardware.' },
  survival: { label: 'Survival', description: 'Fieldcraft, discipline and endurance.' },
  stealth: { label: 'Stealth', description: 'Movement, observation and concealment.' },
  field: { label: 'Field Contact', description: 'Local information from an operative in the field.' },
  local_intel: { label: 'Local Intel', description: 'Routes, patrols and nearby objectives.' },
  warning: { label: 'Warning', description: 'Unknown or classified warning transmission.' },
  boss_hint: { label: 'Threat Analysis', description: 'Analysis of a dangerous target.' },
  food: { label: 'Food', description: 'Food and stamina information.' },
  wildlife: { label: 'Wildlife', description: 'Animals, plants and survival environment.' },
  personal: { label: 'Personal', description: 'Personal conversation and relationship support.' },
  facility: { label: 'Facility', description: 'Building layout, service routes and structural intelligence.' },
  enemy: { label: 'Enemy Intel', description: 'Mercenary, unit and hostile-force analysis.' },
  inside_intel: { label: 'Inside Intel', description: 'Information from an operative embedded inside the target site.' },
  rescue: { label: 'Rescue', description: 'Hostages, prisoners and extraction information.' },
  bombs: { label: 'Bomb Disposal', description: 'Explosive-device identification and disposal procedure.' },
  gw: { label: 'GW System', description: 'GW artificial intelligence and network security.' },
  virus: { label: 'Virus Upload', description: 'Computer-virus delivery and system quarantine behavior.' },
  foxdie: { label: 'FOXDIE', description: 'FOXDIE status and biological risk assessment.' },
  nanomachines: { label: 'Nanomachines', description: 'SOP, nanomachine and battlefield-control systems.' },
  sop: { label: 'SOP Network', description: 'Sons of the Patriots network and squad synchronization.' },
  ai: { label: 'AI Memory', description: 'Artificial intelligence, memory models and personality constructs.' },
  parasites: { label: 'Parasites', description: 'Vocal cord parasites and biological containment.' },
  buddy: { label: 'Buddy Support', description: 'Buddy positioning, overwatch and field support.' },
  extraction: { label: 'Extraction', description: 'Landing zones, helicopter support and exfiltration.' },
  support: { label: 'Support', description: 'Operational support channel.' },
  patriots: { label: 'Patriots', description: 'Classified Patriots and simulation intelligence.' },
  general: { label: 'General Support', description: 'General support conversation.' }
};

export function getConversationById(
  conversationId: string,
  conversations: ConversationDefinition[]
): ConversationDefinition | undefined {
  return conversations.find((conversation) => conversation.id === conversationId);
}

function conversationAllowedInContext(conversation: ConversationDefinition, contextId?: string): boolean {
  return !conversation.contextIds?.length || Boolean(contextId && conversation.contextIds.includes(contextId));
}

function getHistoryCount(conversationId: string, history: CallHistoryEntry[]): number {
  return history.filter((entry) => entry.conversationId === conversationId && entry.disposition === 'completed').length;
}

export function getConversationForContact(
  contact: ContactDefinition,
  conversations: ConversationDefinition[],
  trigger: ConversationTrigger = 'manual_call',
  subjectId?: string,
  contextId?: string,
  history: CallHistoryEntry[] = []
): ConversationDefinition | undefined {
  const candidates = conversations.filter(
    (conversation) => conversation.contactId === contact.id && conversationAllowedInContext(conversation, contextId)
  );

  const subjectMatches = subjectId
    ? candidates.filter((conversation) => conversation.subjectId === subjectId)
    : [];
  const triggerMatches = candidates.filter((conversation) => conversation.trigger === trigger);
  const defaultConversation = candidates.find((conversation) => conversation.id === contact.defaultConversation);
  const pool = subjectMatches.length > 0
    ? subjectMatches
    : triggerMatches.length > 0
      ? triggerMatches
      : defaultConversation
        ? [defaultConversation]
        : candidates;

  return [...pool].sort((left, right) => {
    const historyDifference = getHistoryCount(left.id, history) - getHistoryCount(right.id, history);
    if (historyDifference !== 0) return historyDifference;
    return (right.priority ?? 0) - (left.priority ?? 0);
  })[0];
}

export function getConversationTopics(
  contact: ContactDefinition,
  conversations: ConversationDefinition[],
  contextId?: string
): CodecCallTopic[] {
  const manualConversations = conversations.filter(
    (conversation) =>
      conversation.contactId === contact.id &&
      (conversation.trigger === 'manual_call' || conversation.trigger === 'save_request' || conversation.trigger === 'secret_frequency') &&
      conversationAllowedInContext(conversation, contextId)
  );

  const topics = new Map<string, CodecCallTopic>();
  for (const conversation of manualConversations) {
    const id = conversation.subjectId ?? (conversation.trigger === 'save_request' ? 'save' : 'general');
    const fallback = SUBJECT_LABELS[id] ?? SUBJECT_LABELS.general;
    if (!topics.has(id)) {
      const frequencyVariant = getPreferredContactFrequency(contact, contextId, id);
      topics.set(id, {
        id,
        label: conversation.topicLabel ?? fallback.label,
        description: conversation.topicDescription ?? fallback.description,
        trigger: conversation.trigger,
        conversationId: conversation.id,
        saveAction: id === 'save' || contact.role === 'save_contact',
        frequencyOverride: frequencyVariant.frequency,
        frequencyLabel: frequencyVariant.label
      });
    }
  }

  if (topics.size === 0) {
    const fallback = SUBJECT_LABELS.general;
    topics.set('general', {
      id: 'general',
      label: fallback.label,
      description: fallback.description,
      trigger: 'manual_call',
      conversationId: contact.defaultConversation,
      saveAction: contact.role === 'save_contact',
      frequencyOverride: getPreferredContactFrequency(contact, contextId).frequency,
      frequencyLabel: getPreferredContactFrequency(contact, contextId).label
    });
  }

  const subjectOrder = ['save', 'mission', 'objective', 'facility', 'inside_intel', 'rescue', 'medical', 'condition', 'technology', 'security', 'electronics', 'gw', 'virus', 'weapons', 'bombs', 'enemy', 'nuclear', 'foxdie', 'nanomachines', 'sop', 'survival', 'stealth', 'field', 'local_intel', 'wildlife', 'food', 'ai', 'parasites', 'buddy', 'extraction', 'support', 'warning', 'patriots', 'boss_hint', 'personal', 'general'];
  return [...topics.values()].sort((left, right) => {
    if (left.saveAction && !right.saveAction) return -1;
    if (!left.saveAction && right.saveAction) return 1;
    const leftIndex = subjectOrder.indexOf(left.id);
    const rightIndex = subjectOrder.indexOf(right.id);
    if (leftIndex !== rightIndex) return (leftIndex < 0 ? 999 : leftIndex) - (rightIndex < 0 ? 999 : rightIndex);
    return left.label.localeCompare(right.label);
  });
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
    oldsnake: 'Old Snake',
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
    jacobsen: 'Johan Jacobsen',
    bigbossmg1: 'Big Boss',
    schneider: 'Schneider',
    diane: 'Diane',
    jennifer: 'Jennifer',
    pliskin: 'Iroquois Pliskin',
    stillman: 'Peter Stillman',
    mrx: 'Mr. X',
    emma: 'Emma Emmerich',
    sigint: 'SIGINT',
    eva: 'EVA',
    rosemary: 'Rosemary',
    paz: 'Paz Ortega Andrade',
    huey: 'Huey Emmerich',
    amanda: 'Amanda Valenciano Libre',
    chico: 'Chico Valenciano Libre',
    cecile: 'Cécile Cosima Caminades',
    strangelove: 'Dr. Strangelove',
    galvez: 'Ramón Gálvez Mena',
    mammalpod: 'Mammal Pod AI',
    codetalker: 'Code Talker',
    quiet: 'Quiet',
    pequod: 'Pequod',
    skullface: 'Skull Face'
  };

  if (specialLabels[normalizedSpeaker]) return specialLabels[normalizedSpeaker];

  return speaker
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
