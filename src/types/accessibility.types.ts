export const CONTROL_ACTIONS = [
  'moveLeft',
  'moveRight',
  'crouch',
  'jump',
  'fire',
  'cqc',
  'chaff',
  'ration',
  'codec',
  'sprint',
  'confirm',
  'cancel'
] as const;

export type ControlAction = (typeof CONTROL_ACTIONS)[number];

export type KeyboardBindings = Record<ControlAction, string>;

export interface AccessibilityOptions {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  reduceFlashes: boolean;
  screenReaderAnnouncements: boolean;
  gamepadEnabled: boolean;
  gamepadVibration: boolean;
}

export const defaultKeyboardBindings: KeyboardBindings = {
  moveLeft: 'A',
  moveRight: 'D',
  crouch: 'S',
  jump: 'W',
  fire: 'J',
  cqc: 'SPACE',
  chaff: 'F',
  ration: 'R',
  codec: 'C',
  sprint: 'SHIFT',
  confirm: 'ENTER',
  cancel: 'ESC'
};

export const controlActionLabels: Record<ControlAction, string> = {
  moveLeft: 'Move left',
  moveRight: 'Move right',
  crouch: 'Crouch / descend',
  jump: 'Jump / climb',
  fire: 'Fire weapon',
  cqc: 'CQC action',
  chaff: 'Deploy chaff',
  ration: 'Use ration',
  codec: 'Open Codec',
  sprint: 'Slow / tactical walk',
  confirm: 'Confirm / exit marker',
  cancel: 'Cancel / abort'
};

export const standardGamepadLabels: Partial<Record<ControlAction, string>> = {
  moveLeft: 'Left stick / D-pad left',
  moveRight: 'Left stick / D-pad right',
  crouch: 'Left stick / D-pad down',
  jump: 'A / Cross',
  fire: 'X / Square',
  cqc: 'B / Circle',
  chaff: 'Y / Triangle',
  ration: 'LB / L1',
  codec: 'RB / R1',
  sprint: 'LT / L2',
  confirm: 'Start / Options',
  cancel: 'Back / Share'
};
