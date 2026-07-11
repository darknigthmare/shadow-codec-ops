import type { EraId } from '../types/codec.types';

export type CodecVisualLayoutId =
  | 'msx_terminal'
  | 'mgs1_twin_codec'
  | 'mgs2_digital_codec'
  | 'mgs3_field_radio'
  | 'mgs4_cinematic_codec'
  | 'peace_walker_briefing'
  | 'mgsv_idroid'
  | 'vr_grid'
  | 'patriots_corrupt';

export type CodecControlStyle = 'terminal' | 'classic' | 'digital' | 'analog' | 'cinematic' | 'briefing' | 'idroid' | 'simulation' | 'corrupt';

export interface CodecVisualIdentity {
  era: EraId;
  layoutId: CodecVisualLayoutId;
  controlStyle: CodecControlStyle;
  shellLabel: string;
  frequencyLabel: string;
  callLabel: string;
  memoryLabel: string;
  historyLabel: string;
  dataLabel: string;
  dialogueLabel: string;
  portraitMode: 'text' | 'crt' | 'digital' | 'radio_lcd' | 'video' | 'dossier' | 'hologram' | 'simulation' | 'corrupt';
  supportsClassicTuning: boolean;
  visualFeatureLabels: string[];
}

const identities: Record<EraId, CodecVisualIdentity> = {
  msx: {
    era: 'msx',
    layoutId: 'msx_terminal',
    controlStyle: 'terminal',
    shellLabel: 'TRANSCEIVER / MILITARY RADIO',
    frequencyLabel: 'FREQ',
    callLabel: 'TRANSMIT',
    memoryLabel: 'MEM',
    historyLabel: 'LOG',
    dataLabel: 'SAVE',
    dialogueLabel: 'RADIO TEXT',
    portraitMode: 'text',
    supportsClassicTuning: true,
    visualFeatureLabels: ['8-BIT TERMINAL', 'TEXT PORTRAITS', 'HARD PIXELS']
  },
  mgs1: {
    era: 'mgs1',
    layoutId: 'mgs1_twin_codec',
    controlStyle: 'classic',
    shellLabel: 'CODEC / SHADOW MOSES',
    frequencyLabel: 'FREQUENCY',
    callLabel: 'CALL',
    memoryLabel: 'MEMORY',
    historyLabel: 'HISTORY',
    dataLabel: 'DATA',
    dialogueLabel: 'CODEC LINK',
    portraitMode: 'crt',
    supportsClassicTuning: true,
    visualFeatureLabels: ['TWIN PORTRAITS', 'GREEN CRT', 'MEMORY CHANNELS']
  },
  mgs2: {
    era: 'mgs2',
    layoutId: 'mgs2_digital_codec',
    controlStyle: 'digital',
    shellLabel: 'TACTICAL DIGITAL CODEC',
    frequencyLabel: 'CHANNEL ID',
    callLabel: 'LINK',
    memoryLabel: 'CONTACTS',
    historyLabel: 'RECORD',
    dataLabel: 'SAVE NODE',
    dialogueLabel: 'DIGITAL TRANSMISSION',
    portraitMode: 'digital',
    supportsClassicTuning: true,
    visualFeatureLabels: ['BLUE GLASS HUD', 'PRIORITY ROUTING', 'DIGITAL BRACKETS']
  },
  mgs3: {
    era: 'mgs3',
    layoutId: 'mgs3_field_radio',
    controlStyle: 'analog',
    shellLabel: 'FIELD RADIO / SURVIVAL UNIT',
    frequencyLabel: 'RADIO BAND',
    callLabel: 'SEND',
    memoryLabel: 'PRESETS',
    historyLabel: 'FIELD LOG',
    dataLabel: 'SAVE RADIO',
    dialogueLabel: 'FIELD TRANSMISSION',
    portraitMode: 'radio_lcd',
    supportsClassicTuning: true,
    visualFeatureLabels: ['ANALOG DIAL', 'SURVIVAL TELEMETRY', 'FIELD CASING']
  },
  mgs4: {
    era: 'mgs4',
    layoutId: 'mgs4_cinematic_codec',
    controlStyle: 'cinematic',
    shellLabel: 'NOMAD SECURE VISUAL LINK',
    frequencyLabel: 'SECURE CHANNEL',
    callLabel: 'CONNECT',
    memoryLabel: 'NETWORK',
    historyLabel: 'ARCHIVE',
    dataLabel: 'MISSION DATA',
    dialogueLabel: 'SECURE VIDEO FEED',
    portraitMode: 'video',
    supportsClassicTuning: false,
    visualFeatureLabels: ['CINEMATIC FEEDS', 'SOP STATUS', 'AMBER WARNINGS']
  },
  peace_walker: {
    era: 'peace_walker',
    layoutId: 'peace_walker_briefing',
    controlStyle: 'briefing',
    shellLabel: 'MSF OPERATIONS BRIEFING FILE',
    frequencyLabel: 'FILE CHANNEL',
    callLabel: 'OPEN FILE',
    memoryLabel: 'STAFF FILES',
    historyLabel: 'BRIEFING LOG',
    dataLabel: 'MOTHER BASE',
    dialogueLabel: 'BRIEFING TRANSCRIPT',
    portraitMode: 'dossier',
    supportsClassicTuning: false,
    visualFeatureLabels: ['MSF DOSSIER', 'BRIEFING CARDS', 'MISSION FILE INDEX']
  },
  mgsv: {
    era: 'mgsv',
    layoutId: 'mgsv_idroid',
    controlStyle: 'idroid',
    shellLabel: 'iDROID / DIAMOND DOGS COMMS',
    frequencyLabel: 'COMMS BUS',
    callLabel: 'PLAY / CONNECT',
    memoryLabel: 'CONTACTS',
    historyLabel: 'LOGS',
    dataLabel: 'MISSION DATA',
    dialogueLabel: 'INTEL TRANSCRIPT',
    portraitMode: 'hologram',
    supportsClassicTuning: false,
    visualFeatureLabels: ['HOLOGRAPHIC DECK', 'WAVEFORM', 'INTEL CARDS']
  },
  vr_simulation: {
    era: 'vr_simulation',
    layoutId: 'vr_grid',
    controlStyle: 'simulation',
    shellLabel: 'VR COMMUNICATION SUBROUTINE',
    frequencyLabel: 'SIMULATION NODE',
    callLabel: 'EXECUTE',
    memoryLabel: 'DATASETS',
    historyLabel: 'RUN LOG',
    dataLabel: 'SNAPSHOT',
    dialogueLabel: 'SYNTHETIC FEED',
    portraitMode: 'simulation',
    supportsClassicTuning: false,
    visualFeatureLabels: ['GRID SPACE', 'SYNTHETIC CELLS', 'TRAINING FEED']
  },
  patriots_ai: {
    era: 'patriots_ai',
    layoutId: 'patriots_corrupt',
    controlStyle: 'corrupt',
    shellLabel: 'GW / PATRIOTS CONTROL CHANNEL',
    frequencyLabel: 'UNSTABLE ADDRESS',
    callLabel: 'OBEY',
    memoryLabel: 'MEMORY?',
    historyLabel: 'ERASED LOG',
    dataLabel: 'SYSTEM',
    dialogueLabel: 'CORRUPTED DIRECTIVE',
    portraitMode: 'corrupt',
    supportsClassicTuning: false,
    visualFeatureLabels: ['BROKEN PANELS', 'FALSE READOUTS', 'AI CORRUPTION']
  }
};

export function getCodecVisualIdentity(era: EraId): CodecVisualIdentity {
  return identities[era] ?? identities.mgs1;
}

export function getAllCodecVisualIdentities(): CodecVisualIdentity[] {
  return Object.values(identities);
}
