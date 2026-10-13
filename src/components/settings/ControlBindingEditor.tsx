import { useEffect, useMemo, useState } from 'react';
import {
  CONTROL_ACTIONS,
  controlActionLabels,
  standardGamepadLabels,
  type ControlAction,
  type KeyboardBindings
} from '../../types/accessibility.types';
import {
  bindingFromKeyboardEvent,
  findBindingConflict,
  getConnectedGamepads,
  resetKeyboardBindings
} from '../../systems/inputSettings';
import { StatusBadge } from '../common/StatusBadge';

interface ControlBindingEditorProps {
  bindings: KeyboardBindings;
  gamepadEnabled: boolean;
  onBindingsChange: (bindings: KeyboardBindings) => void;
}

export function ControlBindingEditor({ bindings, gamepadEnabled, onBindingsChange }: ControlBindingEditorProps) {
  const [listeningAction, setListeningAction] = useState<ControlAction | null>(null);
  const [message, setMessage] = useState('Select a binding, then press a keyboard key. Conflicts are swapped automatically.');
  const [gamepadNames, setGamepadNames] = useState<string[]>(() => getConnectedGamepads().map((gamepad) => gamepad.id));

  useEffect(() => {
    const refresh = () => setGamepadNames(getConnectedGamepads().map((gamepad) => gamepad.id));
    window.addEventListener('gamepadconnected', refresh);
    window.addEventListener('gamepaddisconnected', refresh);
    const interval = window.setInterval(refresh, 1500);
    return () => {
      window.removeEventListener('gamepadconnected', refresh);
      window.removeEventListener('gamepaddisconnected', refresh);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!listeningAction) return;

    const listener = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const nextBinding = bindingFromKeyboardEvent(event);
      if (!nextBinding) {
        setMessage('That modifier key cannot be used by itself. Choose another key.');
        return;
      }

      const conflict = findBindingConflict(bindings, listeningAction, nextBinding);
      const nextBindings = { ...bindings };
      const previousBinding = nextBindings[listeningAction];
      nextBindings[listeningAction] = nextBinding;
      if (conflict) nextBindings[conflict] = previousBinding;
      onBindingsChange(nextBindings);
      setMessage(conflict
        ? `${controlActionLabels[listeningAction]} mapped to ${nextBinding}; ${controlActionLabels[conflict]} moved to ${previousBinding}.`
        : `${controlActionLabels[listeningAction]} mapped to ${nextBinding}.`);
      setListeningAction(null);
    };

    window.addEventListener('keydown', listener, { capture: true });
    return () => window.removeEventListener('keydown', listener, { capture: true });
  }, [bindings, listeningAction, onBindingsChange]);

  const gamepadStatus = useMemo(() => {
    if (!gamepadEnabled) return { label: 'GAMEPAD DISABLED', tone: 'warning' as const };
    if (gamepadNames.length) return { label: `${gamepadNames.length} GAMEPAD CONNECTED`, tone: 'success' as const };
    return { label: 'WAITING FOR GAMEPAD', tone: 'neutral' as const };
  }, [gamepadEnabled, gamepadNames.length]);

  return (
    <div className="control-editor">
      <div className="control-editor-toolbar">
        <StatusBadge label={gamepadStatus.label} tone={gamepadStatus.tone} />
        <button
          type="button"
          onClick={() => {
            onBindingsChange(resetKeyboardBindings());
            setListeningAction(null);
            setMessage('Default keyboard bindings restored.');
          }}
        >
          Restore defaults
        </button>
      </div>

      <div className="control-binding-list" role="list" aria-label="Keyboard control bindings">
        {CONTROL_ACTIONS.map((action) => (
          <div className="control-binding-row" role="listitem" key={action}>
            <span className="control-action-label">{controlActionLabels[action]}</span>
            <button
              className={listeningAction === action ? 'listening' : ''}
              type="button"
              aria-pressed={listeningAction === action}
              onClick={() => {
                setListeningAction(action);
                setMessage(`Listening for a new key for ${controlActionLabels[action]}…`);
              }}
            >
              {listeningAction === action ? 'PRESS KEY…' : bindings[action]}
            </button>
            <span className="gamepad-binding">{standardGamepadLabels[action] ?? '—'}</span>
          </div>
        ))}
      </div>

      <p className="control-editor-message" role="status" aria-live="polite">{message}</p>
      {gamepadNames.length > 0 && (
        <ul className="gamepad-device-list">
          {gamepadNames.map((name) => <li key={name}>{name}</li>)}
        </ul>
      )}
    </div>
  );
}
