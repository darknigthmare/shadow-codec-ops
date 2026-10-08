interface BootScreenProps {
  mode?: 'boot' | 'route' | 'error';
  title?: string;
  detail?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function BootScreen({
  mode = 'boot',
  title = 'SHADOW CODEC OPS',
  detail = 'INITIALIZING TACTICAL COMMUNICATION SYSTEM…',
  actionLabel,
  onAction
}: BootScreenProps) {
  return (
    <div className={`boot-screen boot-screen-${mode}`} role={mode === 'error' ? 'alert' : 'status'} aria-live="polite">
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-terminal panel">
        <span className="boot-kicker">TACTICAL SYSTEM // BUILD 1.3.0</span>
        <h1>{title}</h1>
        <p>{detail}</p>
        {mode !== 'error' && (
          <div className="boot-loader" aria-label="Loading">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        )}
        <div className="boot-status-row">
          <span>{mode === 'error' ? 'SYSTEM RECOVERY AVAILABLE' : mode === 'route' ? 'MODULE STREAM ACTIVE' : 'LOCAL DATA LINK'}</span>
          <strong>{mode === 'error' ? 'DEGRADED' : 'ONLINE'}</strong>
        </div>
        {actionLabel && onAction && (
          <button className="primary-action" type="button" onClick={onAction}>{actionLabel}</button>
        )}
      </div>
    </div>
  );
}
