import { useEffect, useMemo, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import type { ControlAction } from '../../types/accessibility.types';
import type { UserSettings } from '../../types/theme.types';
import { resetTouchActions, setTouchAction } from '../../systems/touchInput';

interface TouchControlOverlayProps {
  settings: UserSettings;
  context?: TouchControlContext;
}

export type TouchControlContext = 'sideops' | 'vr' | 'vr-ninja' | 'vr-mystery' | 'vr-photoshoot';

interface TouchButtonDefinition {
  action: ControlAction;
  label: string;
  short: string;
  className?: string;
}

const movementButtons: TouchButtonDefinition[] = [
  { action: 'moveLeft', label: 'Move left', short: '◀' },
  { action: 'crouch', label: 'Crouch', short: '▼' },
  { action: 'moveRight', label: 'Move right', short: '▶' },
  { action: 'jump', label: 'Jump', short: '▲', className: 'touch-jump' }
];

const actionButtons: TouchButtonDefinition[] = [
  { action: 'fire', label: 'Fire weapon', short: 'FIRE', className: 'touch-fire' },
  { action: 'cqc', label: 'CQC action', short: 'CQC' },
  { action: 'chaff', label: 'Deploy chaff', short: 'CHAF' },
  { action: 'ration', label: 'Use ration', short: 'RAT' }
];

const ninjaActionButtons: TouchButtonDefinition[] = [
  { action: 'fire', label: 'Slash with the high-frequency blade', short: 'SLASH', className: 'touch-fire' },
  { action: 'cqc', label: 'Hold cross-slash guard', short: 'CROSS' },
  { action: 'chaff', label: 'Body disruption', short: 'BODY' },
  { action: 'ration', label: 'Hold stealth camouflage', short: 'STEALTH' }
];

const mysteryActionButtons: TouchButtonDefinition[] = [
  { action: 'fire', label: 'Inspect evidence or suspect', short: 'INSPECT', className: 'touch-fire' },
  { action: 'cqc', label: 'Grab or release suspect', short: 'GRAB' },
  { action: 'chaff', label: 'Crawl without leaving footprints', short: 'CRAWL' },
  { action: 'ration', label: 'Deliver suspect to goal', short: 'DELIVER' }
];

const photoshootMovementButtons: TouchButtonDefinition[] = [
  { action: 'moveLeft', label: 'Frame left', short: '◀' },
  { action: 'crouch', label: 'Frame down', short: '▼' },
  { action: 'moveRight', label: 'Frame right', short: '▶' },
  { action: 'jump', label: 'Frame up', short: '▲', className: 'touch-jump' }
];

const photoshootActionButtons: TouchButtonDefinition[] = [
  { action: 'fire', label: 'Release camera shutter', short: 'SHUTTER', className: 'touch-fire' },
  { action: 'chaff', label: 'Zoom out', short: 'ZOOM-' },
  { action: 'ration', label: 'Zoom in', short: 'ZOOM+' }
];

function controlsForContext(context: TouchControlContext): {
  movement: readonly TouchButtonDefinition[];
  actions: readonly TouchButtonDefinition[];
} {
  switch (context) {
    case 'vr-ninja':
      return { movement: movementButtons, actions: ninjaActionButtons };
    case 'vr-mystery':
      return { movement: movementButtons, actions: mysteryActionButtons };
    case 'vr-photoshoot':
      return { movement: photoshootMovementButtons, actions: photoshootActionButtons };
    default:
      return { movement: movementButtons, actions: actionButtons };
  }
}

function hasTouchCapability(): boolean {
  if (typeof window === 'undefined') return false;
  return navigator.maxTouchPoints > 0
    || (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches);
}

export function TouchControlOverlay({ settings, context = 'sideops' }: TouchControlOverlayProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [touchCapable, setTouchCapable] = useState(hasTouchCapability);
  const [portrait, setPortrait] = useState(() => typeof window !== 'undefined' && window.innerHeight > window.innerWidth);

  useEffect(() => {
    const pointerQuery = typeof window.matchMedia === 'function'
      ? window.matchMedia('(pointer: coarse)')
      : null;
    const update = () => {
      setTouchCapable(hasTouchCapability());
      setPortrait(window.innerHeight > window.innerWidth);
    };
    update();
    pointerQuery?.addEventListener('change', update);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    window.addEventListener('blur', resetTouchActions);
    document.addEventListener('visibilitychange', resetTouchActions);
    return () => {
      pointerQuery?.removeEventListener('change', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      window.removeEventListener('blur', resetTouchActions);
      document.removeEventListener('visibilitychange', resetTouchActions);
      resetTouchActions();
    };
  }, []);

  const visible = settings.touchControlsMode === 'always'
    || (settings.touchControlsMode === 'auto' && touchCapable);

  const overlayStyle = useMemo(() => ({
    '--touch-scale': String(settings.touchControlScale),
    '--touch-opacity': String(settings.touchControlOpacity)
  }) as CSSProperties, [settings.touchControlOpacity, settings.touchControlScale]);
  const controls = controlsForContext(context);

  if (!visible) return null;

  function pulse(): void {
    if (!settings.touchHaptics || !('vibrate' in navigator)) return;
    navigator.vibrate(18);
  }

  function press(action: ControlAction, event: ReactPointerEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setTouchAction(action, true);
    pulse();
  }

  function release(action: ControlAction, event?: ReactPointerEvent<HTMLButtonElement>): void {
    event?.preventDefault();
    setTouchAction(action, false);
  }

  function renderButton(button: TouchButtonDefinition) {
    return (
      <button
        key={button.action}
        type="button"
        className={`touch-control-button ${button.className ?? ''}`}
        aria-label={button.label}
        data-touch-action={button.action}
        onPointerDown={(event) => press(button.action, event)}
        onPointerUp={(event) => release(button.action, event)}
        onPointerCancel={(event) => release(button.action, event)}
        onLostPointerCapture={(event) => release(button.action, event)}
        onContextMenu={(event) => event.preventDefault()}
      >
        {button.short}
      </button>
    );
  }

  return (
    <div
      className={`touch-control-overlay ${collapsed ? 'collapsed' : ''} touch-context-${context}`}
      style={overlayStyle}
      data-testid="touch-control-overlay"
    >
      {portrait && (
        <div className="touch-orientation-hint" role="status">
          ROTATE DEVICE // LANDSCAPE TACTICAL VIEW RECOMMENDED
        </div>
      )}
      <button
        type="button"
        className="touch-collapse-toggle"
        onClick={() => {
          resetTouchActions();
          setCollapsed((current) => !current);
        }}
        aria-expanded={!collapsed}
        aria-label={collapsed ? 'Show touch controls' : 'Hide touch controls'}
      >
        {collapsed ? 'CONTROLS' : 'HIDE'}
      </button>
      {!collapsed && (
        <>
          <div className="touch-utility-cluster">
            {renderButton({ action: 'sprint', label: 'Tactical walk', short: 'TACT' })}
            {renderButton({ action: 'codec', label: 'Open Codec', short: 'CODEC' })}
          </div>
          <div className="touch-movement-cluster">{controls.movement.map(renderButton)}</div>
          <div className="touch-action-cluster">{controls.actions.map(renderButton)}</div>
          <div className="touch-system-cluster">
            {renderButton({ action: 'cancel', label: 'Cancel or abort', short: 'BACK' })}
            {renderButton({ action: 'confirm', label: 'Confirm or restart', short: 'OK' })}
          </div>
        </>
      )}
    </div>
  );
}
