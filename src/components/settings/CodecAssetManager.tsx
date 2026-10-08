import { useState } from 'react';
import type { UserSettings } from '../../types/theme.types';
import { codecAssetPacks, playCodecUiCue, startCodecAmbience, stopCodecAmbience } from '../../systems/codecAssetEngine';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

export function CodecAssetManager({ settings, onSettingsChange }: { settings: UserSettings; onSettingsChange: (settings: UserSettings) => void }) {
  const [previewEra, setPreviewEra] = useState(codecAssetPacks[0].era);
  const active = codecAssetPacks.find((pack) => pack.era === previewEra) ?? codecAssetPacks[0];
  const patch = (partial: Partial<UserSettings>) => onSettingsChange({ ...settings, ...partial });
  return <Panel title="Codec Content & Asset Deck">
    <div className="asset-deck-status"><StatusBadge label="9 ERA PACKS ONLINE" tone="success" /><span>Built-in assets are original simulation placeholders and can be overridden by local Voice Packs.</span></div>
    <div className="asset-deck-controls">
      <label><span>Preview era</span><select value={previewEra} onChange={(event)=>setPreviewEra(event.target.value as typeof previewEra)}>{codecAssetPacks.map((pack)=><option key={pack.id} value={pack.era}>{pack.name}</option>)}</select></label>
      <button type="button" onClick={()=>playCodecUiCue(previewEra,'incoming',settings.uiBeepVolume)}>Preview CALL</button>
      <button type="button" onClick={()=>playCodecUiCue(previewEra,'connect',settings.uiBeepVolume)}>Preview LINK</button>
      <button type="button" onMouseDown={()=>startCodecAmbience(previewEra,settings.codecAmbienceVolume)} onMouseUp={stopCodecAmbience} onMouseLeave={stopCodecAmbience} onTouchStart={()=>startCodecAmbience(previewEra,settings.codecAmbienceVolume)} onTouchEnd={stopCodecAmbience}>Hold for ambience</button>
    </div>
    <div className="asset-pack-preview">
      <img src={active.builtInPortraits.player} alt="Original abstract player portrait preview" />
      <div><strong>{active.name}</strong><p>{active.description}</p><small>{active.portraitStyle} · {active.ambience.replace(/_/g, ' ')} · {active.uiProfile}</small></div>
      <img src={active.builtInPortraits.contact} alt="Original abstract contact portrait preview" />
    </div>
    <label><input type="checkbox" checked={settings.builtInPortraitsEnabled} onChange={(event)=>patch({builtInPortraitsEnabled:event.target.checked})}/> Built-in original portrait placeholders</label>
    <label><input type="checkbox" checked={settings.eraUiAudioEnabled} onChange={(event)=>patch({eraUiAudioEnabled:event.target.checked})}/> Era-specific procedural UI cues</label>
    <label><input type="checkbox" checked={settings.codecAmbienceEnabled} onChange={(event)=>patch({codecAmbienceEnabled:event.target.checked})}/> Persistent Codec ambience while connected</label>
    <label className="setting-row"><span>Codec ambience volume — {Math.round(settings.codecAmbienceVolume*100)}%</span><input type="range" min="0" max="1" step="0.05" value={settings.codecAmbienceVolume} onChange={(event)=>patch({codecAmbienceVolume:Number(event.target.value)})}/></label>
    <div className="asset-pack-grid">{codecAssetPacks.map((pack)=><article key={pack.id}><strong>{pack.name}</strong><small>{pack.includedAssets.length} built-in layers</small><span>{pack.expressionSupport.length} expressions</span><em>{pack.missingRecommendedAssets.length} optional local upgrades</em></article>)}</div>
  </Panel>;
}
