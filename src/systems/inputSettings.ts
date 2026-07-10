import type { ControlAction, KeyboardBindings } from '../types/accessibility.types';
import { CONTROL_ACTIONS, defaultKeyboardBindings } from '../types/accessibility.types';
import { loadRuntimeSettings } from './userSettings';

export const STANDARD_GAMEPAD_BUTTONS = {
  jump: 0,
  confirm: 9,
  cqc: 1,
  cancel: 8,
  fire: 2,
  chaff: 3,
  ration: 4,
  codec: 5,
  sprint: 6,
  dpadUp: 12,
  dpadDown: 13,
  dpadLeft: 14,
  dpadRight: 15
} as const;

export interface RuntimeInputProfile {
  keyboard: KeyboardBindings;
  gamepadEnabled: boolean;
  gamepadVibration: boolean;
  reducedMotion: boolean;
  reduceFlashes: boolean;
}

export function getRuntimeInputProfile(): RuntimeInputProfile {
  const settings = loadRuntimeSettings();
  return {
    keyboard: settings.keyboardBindings,
    gamepadEnabled: settings.gamepadEnabled,
    gamepadVibration: settings.gamepadVibration,
    reducedMotion: settings.reducedMotion,
    reduceFlashes: settings.reduceFlashes
  };
}

export function normalizeKeyboardBinding(value: string): string {
  const raw = value.toUpperCase();
  if (raw === ' ' || raw === 'SPACEBAR' || raw === 'SPACE') return 'SPACE';
  const normalized = raw.trim();
  if (normalized === 'ESCAPE') return 'ESC';
  if (normalized === 'ARROWLEFT') return 'LEFT';
  if (normalized === 'ARROWRIGHT') return 'RIGHT';
  if (normalized === 'ARROWUP') return 'UP';
  if (normalized === 'ARROWDOWN') return 'DOWN';
  if (normalized === 'SHIFTLEFT' || normalized === 'SHIFTRIGHT') return 'SHIFT';
  if (normalized === 'CONTROLLEFT' || normalized === 'CONTROLRIGHT') return 'CONTROL';
  if (normalized === 'ALTLEFT' || normalized === 'ALTRIGHT') return 'ALT';
  if (normalized === 'METALEFT' || normalized === 'METARIGHT') return 'META';
  return normalized.replace(/^KEY/, '').replace(/^DIGIT/, '');
}

export function bindingFromKeyboardEvent(event: KeyboardEvent): string | null {
  const blocked = ['META', 'CONTROL', 'ALT', 'CAPSLOCK', 'TAB'];
  const normalized = normalizeKeyboardBinding(event.key.length === 1 ? event.key : event.code || event.key);
  if (!normalized || blocked.includes(normalized)) return null;
  return normalized;
}

export function resetKeyboardBindings(): KeyboardBindings {
  return { ...defaultKeyboardBindings };
}

export function findBindingConflict(bindings: KeyboardBindings, action: ControlAction, value: string): ControlAction | null {
  const normalized = normalizeKeyboardBinding(value);
  return CONTROL_ACTIONS.find((candidate) => candidate !== action && normalizeKeyboardBinding(bindings[candidate]) === normalized) ?? null;
}

export function getConnectedGamepads(): Gamepad[] {
  if (typeof navigator === 'undefined' || typeof navigator.getGamepads !== 'function') return [];
  return Array.from(navigator.getGamepads()).filter((gamepad): gamepad is Gamepad => Boolean(gamepad?.connected));
}

export function pulseGamepad(duration = 90, strongMagnitude = 0.35, weakMagnitude = 0.25): void {
  const gamepad = getConnectedGamepads()[0];
  const actuator = gamepad?.vibrationActuator as GamepadHapticActuator | undefined;
  if (!actuator || typeof actuator.playEffect !== 'function') return;
  void actuator.playEffect('dual-rumble', {
    duration,
    strongMagnitude,
    weakMagnitude,
    startDelay: 0
  }).catch(() => undefined);
}
