import type { ContactDefinition, IncomingCallRequest } from '../../types/codec.types';

interface IncomingCallOverlayProps {
  request: IncomingCallRequest;
  contact?: ContactDefinition;
  secondsRemaining: number;
  queuedCount: number;
  onAccept: () => void;
  onIgnore: () => void;
  visualLayoutId?: string;
  callLabel?: string;
}

export function IncomingCallOverlay({
  request,
  contact,
  secondsRemaining,
  queuedCount,
  onAccept,
  onIgnore,
  visualLayoutId = 'default',
  callLabel = 'CALL'
}: IncomingCallOverlayProps) {
  return (
    <div className={`incoming-call-overlay priority-${request.priority} incoming-layout-${visualLayoutId}`} role="dialog" aria-modal="true" aria-label="Incoming Codec call">
      <div className="incoming-call-card">
        <span className="incoming-call-priority">{request.priority.toUpperCase()} TRANSMISSION</span>
        <div className="incoming-call-pulse">{callLabel}</div>
        <h2>{contact?.availability === 'unknown' ? 'UNKNOWN SIGNAL' : contact?.name ?? 'UNRESOLVED CONTACT'}</h2>
        <p>{request.sourceLabel ?? 'Incoming Codec transmission awaiting operator response.'}</p>
        <div className="incoming-call-meta">
          <span>EXPIRES IN {Math.max(0, secondsRemaining)}s</span>
          <span>{request.required ? 'RESPONSE REQUIRED' : 'OPTIONAL CALL'}</span>
          {queuedCount > 0 && <span>{queuedCount} QUEUED</span>}
        </div>
        <div className="incoming-call-actions">
          <button type="button" className="call-button" onClick={onAccept}>ACCEPT</button>
          <button type="button" disabled={request.required} onClick={onIgnore}>
            {request.required ? 'PRIORITY LOCK' : 'IGNORE'}
          </button>
        </div>
      </div>
    </div>
  );
}
