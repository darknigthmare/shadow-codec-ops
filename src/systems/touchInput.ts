import { CONTROL_ACTIONS, type ControlAction } from '../types/accessibility.types';

type TouchState = Record<ControlAction, boolean>;

function createEmptyState(): TouchState {
  return Object.fromEntries(CONTROL_ACTIONS.map((action) => [action, false])) as TouchState;
}

const touchState: TouchState = createEmptyState();

export function setTouchAction(action: ControlAction, pressed: boolean): void {
  touchState[action] = pressed;
}

export function isTouchActionDown(action: ControlAction): boolean {
  return touchState[action];
}

export function getTouchActionSnapshot(): TouchState {
  return { ...touchState };
}

export function resetTouchActions(): void {
  for (const action of CONTROL_ACTIONS) touchState[action] = false;
}
