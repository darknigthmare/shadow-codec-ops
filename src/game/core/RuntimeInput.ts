import Phaser from 'phaser';
import { CONTROL_ACTIONS, type ControlAction } from '../../types/accessibility.types';
import { getTouchActionSnapshot } from '../../systems/touchInput';
import {
  getRuntimeInputProfile,
  pulseGamepad,
  STANDARD_GAMEPAD_BUTTONS,
  type RuntimeInputProfile
} from '../../systems/inputSettings';

type ActionKeyMap = Record<ControlAction, Phaser.Input.Keyboard.Key>;
type ActionStateMap = Record<ControlAction, boolean>;

function emptyActionState(): ActionStateMap {
  return Object.fromEntries(CONTROL_ACTIONS.map((action) => [action, false])) as ActionStateMap;
}

export class RuntimeInputController {
  readonly profile: RuntimeInputProfile;
  private readonly keys: ActionKeyMap;
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private currentGamepadState: ActionStateMap = emptyActionState();
  private previousGamepadState: ActionStateMap = emptyActionState();
  private currentTouchState: ActionStateMap = emptyActionState();
  private previousTouchState: ActionStateMap = emptyActionState();
  private gamepad: Phaser.Input.Gamepad.Gamepad | null = null;

  constructor(private readonly scene: Phaser.Scene) {
    this.profile = getRuntimeInputProfile();
    const keyboard = scene.input.keyboard;
    if (!keyboard) throw new Error('Keyboard input plugin unavailable.');
    this.cursors = keyboard.createCursorKeys();
    this.keys = Object.fromEntries(
      CONTROL_ACTIONS.map((action) => [action, keyboard.addKey(this.profile.keyboard[action])])
    ) as ActionKeyMap;
  }

  update(): void {
    this.previousTouchState = this.currentTouchState;
    this.currentTouchState = getTouchActionSnapshot();
    this.previousGamepadState = this.currentGamepadState;
    this.currentGamepadState = emptyActionState();
    this.gamepad = this.profile.gamepadEnabled ? this.scene.input.gamepad?.getPad(0) ?? null : null;
    if (!this.gamepad) return;

    const horizontal = this.gamepad.axes[0]?.getValue() ?? 0;
    const vertical = this.gamepad.axes[1]?.getValue() ?? 0;
    const button = (index: number) => Boolean(this.gamepad?.buttons[index]?.pressed);

    this.currentGamepadState.moveLeft = horizontal < -0.35 || button(STANDARD_GAMEPAD_BUTTONS.dpadLeft);
    this.currentGamepadState.moveRight = horizontal > 0.35 || button(STANDARD_GAMEPAD_BUTTONS.dpadRight);
    this.currentGamepadState.crouch = vertical > 0.35 || button(STANDARD_GAMEPAD_BUTTONS.dpadDown);
    this.currentGamepadState.jump = button(STANDARD_GAMEPAD_BUTTONS.jump) || button(STANDARD_GAMEPAD_BUTTONS.dpadUp);
    this.currentGamepadState.fire = button(STANDARD_GAMEPAD_BUTTONS.fire);
    this.currentGamepadState.cqc = button(STANDARD_GAMEPAD_BUTTONS.cqc);
    this.currentGamepadState.chaff = button(STANDARD_GAMEPAD_BUTTONS.chaff);
    this.currentGamepadState.ration = button(STANDARD_GAMEPAD_BUTTONS.ration);
    this.currentGamepadState.codec = button(STANDARD_GAMEPAD_BUTTONS.codec);
    this.currentGamepadState.sprint = button(STANDARD_GAMEPAD_BUTTONS.sprint);
    this.currentGamepadState.confirm = button(STANDARD_GAMEPAD_BUTTONS.confirm);
    this.currentGamepadState.cancel = button(STANDARD_GAMEPAD_BUTTONS.cancel);
  }

  isDown(action: ControlAction): boolean {
    return this.keys[action].isDown || this.cursorFallback(action) || this.currentGamepadState[action] || this.currentTouchState[action];
  }

  justDown(action: ControlAction): boolean {
    return Phaser.Input.Keyboard.JustDown(this.keys[action])
      || this.cursorJustDown(action)
      || (this.currentGamepadState[action] && !this.previousGamepadState[action])
      || (this.currentTouchState[action] && !this.previousTouchState[action]);
  }

  hasGamepad(): boolean {
    return Boolean(this.gamepad);
  }

  vibrate(duration = 90, strongMagnitude = 0.35, weakMagnitude = 0.25): void {
    if (!this.profile.gamepadEnabled || !this.profile.gamepadVibration || !this.gamepad) return;
    pulseGamepad(duration, strongMagnitude, weakMagnitude);
  }

  private cursorFallback(action: ControlAction): boolean {
    if (action === 'moveLeft') return this.cursors.left.isDown;
    if (action === 'moveRight') return this.cursors.right.isDown;
    if (action === 'crouch') return this.cursors.down.isDown;
    return false;
  }

  private cursorJustDown(action: ControlAction): boolean {
    if (action === 'jump') return Phaser.Input.Keyboard.JustDown(this.cursors.up);
    return false;
  }
}
