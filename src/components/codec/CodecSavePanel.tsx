import type { CodecSaveSlotId, CodecSaveSnapshot } from '../../systems/codecSaveStorage';
import { getCodecSaveSlotIds } from '../../systems/codecSaveStorage';
import { formatFrequency } from '../../systems/frequencyEngine';

interface CodecSavePanelProps {
  slots: Record<CodecSaveSlotId, CodecSaveSnapshot | null>;
  onSave: (slotId: CodecSaveSlotId) => void;
  onLoad: (snapshot: CodecSaveSnapshot) => void;
  onDelete: (slotId: CodecSaveSlotId) => void;
}

export function CodecSavePanel({ slots, onSave, onLoad, onDelete }: CodecSavePanelProps) {
  return (
    <div className="codec-save-slots">
      {getCodecSaveSlotIds().map((slotId, index) => {
        const snapshot = slots[slotId];
        return (
          <article className="codec-save-slot" key={slotId}>
            <div className="codec-save-slot-heading">
              <strong>SLOT {index + 1}</strong>
              <span>{snapshot ? new Date(snapshot.savedAt).toLocaleString() : 'EMPTY'}</span>
            </div>
            {snapshot ? (
              <>
                <h4>{snapshot.label}</h4>
                <p>{snapshot.contextId}</p>
                <div className="codec-save-slot-stats">
                  <span>{formatFrequency(snapshot.frequency)}</span>
                  <span>{snapshot.memoryContactIds.length} CONTACTS</span>
                  <span>{snapshot.callHistory.length} CALLS</span>
                </div>
              </>
            ) : <p>No Codec simulation data recorded.</p>}
            <div className="codec-save-slot-actions">
              <button type="button" onClick={() => onSave(slotId)}>{snapshot ? 'OVERWRITE' : 'SAVE'}</button>
              <button type="button" disabled={!snapshot} onClick={() => snapshot && onLoad(snapshot)}>LOAD</button>
              <button type="button" disabled={!snapshot} onClick={() => onDelete(slotId)}>DELETE</button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
