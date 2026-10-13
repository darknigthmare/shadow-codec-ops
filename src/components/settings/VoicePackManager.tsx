import { useMemo, useState } from 'react';
import { loadVoicePackState, sanitizeVoicePack, saveVoicePackState, type VoicePackManifest } from '../../systems/voicePackStorage';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

export function VoicePackManager() {
  const [state, setState] = useState(loadVoicePackState);
  const [buffer, setBuffer] = useState('');
  const [message, setMessage] = useState('VOICE PACK MANAGER READY');
  const assetCount = useMemo(() => state.packs.reduce((total, pack) => total + pack.assets.length, 0), [state.packs]);

  function persist(next: typeof state, status: string) {
    setState(next);
    saveVoicePackState(next);
    setMessage(status);
  }

  function importPack() {
    try {
      const parsed = JSON.parse(buffer) as unknown;
      const pack = sanitizeVoicePack(parsed);
      if (!pack) return setMessage('IMPORT REJECTED: INVALID MANIFEST');
      const packs = [pack, ...state.packs.filter((entry) => entry.id !== pack.id)];
      persist({ packs, enabledPackIds: Array.from(new Set([pack.id, ...state.enabledPackIds])) }, `PACK IMPORTED: ${pack.name}`);
      setBuffer('');
    } catch {
      setMessage('IMPORT REJECTED: INVALID JSON');
    }
  }

  function togglePack(id: string) {
    const enabled = state.enabledPackIds.includes(id);
    persist({ ...state, enabledPackIds: enabled ? state.enabledPackIds.filter((entry) => entry !== id) : [...state.enabledPackIds, id] }, enabled ? 'VOICE PACK DISABLED' : 'VOICE PACK ENABLED');
  }

  function removePack(id: string) {
    persist({ packs: state.packs.filter((pack) => pack.id !== id), enabledPackIds: state.enabledPackIds.filter((entry) => entry !== id) }, 'VOICE PACK REMOVED');
  }

  const example: VoicePackManifest = {
    schemaVersion: 1,
    id: 'my_local_voice_pack',
    name: 'My Local Voice Pack',
    version: '1.0.0',
    locale: 'fr',
    era: 'mgs1',
    assets: [{ id: 'intro-0', conversationId: 'mgs1_campbell_default', lineIndex: 0, source: '/audio/custom/campbell_intro.ogg' }],
    portraits: [{ characterId: 'campbell_mgs1', expression: 'serious', image: '/portraits/custom/campbell_serious.png' }]
  };

  return (
    <Panel title="Voice & Portrait Pack Manager">
      <div className="voice-pack-summary">
        <StatusBadge label={message} tone={message.includes('REJECTED') ? 'danger' : 'success'} />
        <span>{state.packs.length} pack(s)</span><span>{assetCount} voice asset(s)</span>
      </div>
      <div className="voice-pack-list">
        {state.packs.length === 0 && <p>No local voice pack installed. Generated Codec cues remain available.</p>}
        {state.packs.map((pack) => (
          <article className="voice-pack-card" key={pack.id}>
            <div><strong>{pack.name}</strong><small>{pack.id} · v{pack.version} · {pack.era ?? 'all eras'}</small></div>
            <span>{pack.assets.length} lines / {pack.portraits?.length ?? 0} portraits</span>
            <button type="button" onClick={() => togglePack(pack.id)}>{state.enabledPackIds.includes(pack.id) ? 'DISABLE' : 'ENABLE'}</button>
            <button type="button" onClick={() => removePack(pack.id)}>REMOVE</button>
          </article>
        ))}
      </div>
      <label>Import voice pack manifest JSON<textarea rows={8} value={buffer} onChange={(event) => setBuffer(event.target.value)} placeholder={JSON.stringify(example, null, 2)} /></label>
      <div className="desktop-actions"><button type="button" onClick={importPack}>IMPORT PACK</button><button type="button" onClick={() => setBuffer(JSON.stringify(example, null, 2))}>LOAD EXAMPLE</button></div>
      <p className="desktop-note">Only local <code>/audio/</code> and <code>/portraits/</code> paths are accepted. Add the corresponding files under <code>public/</code>.</p>
    </Panel>
  );
}
