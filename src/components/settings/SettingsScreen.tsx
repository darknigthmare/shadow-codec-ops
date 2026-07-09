import type { CSSProperties } from 'react';
import themesJson from '../../data/themes.json';
import type { ThemePackDefinition, UserSettings } from '../../types/theme.types';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';

const themePacks = themesJson as ThemePackDefinition[];

interface SettingsScreenProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

export function SettingsScreen({ settings, onSettingsChange }: SettingsScreenProps) {
  const activeTheme = themePacks.find((theme) => theme.id === settings.selectedTheme) ?? themePacks[0];

  function patch(partial: Partial<UserSettings>) {
    onSettingsChange({ ...settings, ...partial });
  }

  return (
    <section className="settings-grid">
      <Panel title="Visual Settings">
        <label className="setting-row">
          <span>Theme Pack</span>
          <select value={settings.selectedTheme} onChange={(event) => patch({ selectedTheme: event.target.value })}>
            {themePacks.map((theme) => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>
        </label>
        <div className="theme-active-card">
          <StatusBadge label={activeTheme.codecType.replace('_', ' ')} tone="success" />
          <h3>{activeTheme.name}</h3>
          <p>{activeTheme.description}</p>
          <div className="theme-chip-row">
            {activeTheme.effects.map((effect) => <span key={effect}>{effect}</span>)}
          </div>
        </div>
        <label><input type="checkbox" checked={settings.scanlines} onChange={(event) => patch({ scanlines: event.target.checked })} /> Scanlines</label>
        <label><input type="checkbox" checked={settings.crtGlow} onChange={(event) => patch({ crtGlow: event.target.checked })} /> CRT glow</label>
        <label><input type="checkbox" checked={settings.noise} onChange={(event) => patch({ noise: event.target.checked })} /> Visual noise</label>
        <label><input type="checkbox" checked={settings.pixelPerfect} onChange={(event) => patch({ pixelPerfect: event.target.checked })} /> Pixel perfect</label>
      </Panel>

      <Panel title="Theme Pack Gallery">
        <div className="theme-gallery">
          {themePacks.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className={`theme-pack-card ${settings.selectedTheme === theme.id ? 'active' : ''}`}
              onClick={() => patch({ selectedTheme: theme.id })}
            >
              <span className="theme-color-strip" style={{ '--strip-primary': theme.primary, '--strip-accent': theme.accent } as CSSProperties} />
              <strong>{theme.name}</strong>
              <small>{theme.layout}</small>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Codec Settings">
        <label><input type="checkbox" checked={settings.fastText} onChange={(event) => patch({ fastText: event.target.checked })} /> Fast text</label>
        <label><input type="checkbox" checked={settings.autoAdvance} onChange={(event) => patch({ autoAdvance: event.target.checked })} /> Auto advance</label>
        <label><input type="checkbox" checked={settings.classicCodecPausesGame} onChange={(event) => patch({ classicCodecPausesGame: event.target.checked })} /> Classic Codec pauses game</label>
        <label className="setting-row">
          <span>UI Beep Volume</span>
          <input type="range" min="0" max="1" step="0.05" value={settings.uiBeepVolume} onChange={(event) => patch({ uiBeepVolume: Number(event.target.value) })} />
        </label>
        <label className="setting-row">
          <span>Radio Noise Volume</span>
          <input type="range" min="0" max="1" step="0.05" value={settings.radioNoiseVolume} onChange={(event) => patch({ radioNoiseVolume: Number(event.target.value) })} />
        </label>
      </Panel>
    </section>
  );
}
