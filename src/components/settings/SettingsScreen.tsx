import { useEffect, useRef, useState, type CSSProperties } from 'react';
import themesJson from '../../data/themes.json';
import type { ThemePackDefinition, UserSettings } from '../../types/theme.types';
import {
  downloadApplicationBackup,
  getDesktopStatus,
  importApplicationData,
  resetDesktopWindow,
  toggleFullscreen,
  toggleMaximized,
  type DesktopStatus
} from '../../systems/desktopEngine';
import {
  collectRuntimeDiagnostics,
  downloadDiagnostics,
  type RuntimeDiagnosticSnapshot
} from '../../systems/diagnostics';
import { Panel } from '../common/Panel';
import { StatusBadge } from '../common/StatusBadge';
import { ControlBindingEditor } from './ControlBindingEditor';
import { PwaSettingsPanel } from './PwaSettingsPanel';
import { VoicePackManager } from './VoicePackManager';

const themePacks = themesJson as ThemePackDefinition[];

interface SettingsScreenProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

const fallbackDesktopStatus: DesktopStatus = {
  isDesktop: false,
  backend: 'browser-localstorage',
  fullscreen: false,
  maximized: false
};

export function SettingsScreen({ settings, onSettingsChange }: SettingsScreenProps) {
  const activeTheme = themePacks.find((theme) => theme.id === settings.selectedTheme) ?? themePacks[0];
  const [desktopStatus, setDesktopStatus] = useState<DesktopStatus>(fallbackDesktopStatus);
  const [desktopMessage, setDesktopMessage] = useState('Desktop systems ready.');
  const [diagnostics, setDiagnostics] = useState<RuntimeDiagnosticSnapshot | null>(null);
  const [diagnosticMessage, setDiagnosticMessage] = useState('Runtime diagnostics not refreshed yet.');
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void refreshDesktopStatus();
    void refreshDiagnostics();
  }, []);

  function patch(partial: Partial<UserSettings>) {
    onSettingsChange({ ...settings, ...partial });
  }

  async function refreshDesktopStatus() {
    try {
      setDesktopStatus(await getDesktopStatus());
    } catch (error) {
      setDesktopMessage(`Desktop status unavailable: ${String(error)}`);
    }
  }

  async function refreshDiagnostics() {
    try {
      const snapshot = await collectRuntimeDiagnostics();
      setDiagnostics(snapshot);
      setDiagnosticMessage(`Diagnostics refreshed at ${new Date(snapshot.generatedAt).toLocaleTimeString()}.`);
    } catch (error) {
      setDiagnosticMessage(`Diagnostics failed: ${String(error)}`);
    }
  }

  async function handleFullscreen() {
    try {
      await toggleFullscreen();
      setDesktopMessage('Fullscreen state updated.');
      await refreshDesktopStatus();
    } catch (error) {
      setDesktopMessage(`Fullscreen failed: ${String(error)}`);
    }
  }

  async function handleMaximize() {
    try {
      await toggleMaximized();
      setDesktopMessage('Window state updated.');
      await refreshDesktopStatus();
    } catch (error) {
      setDesktopMessage(`Window command failed: ${String(error)}`);
    }
  }

  async function handleResetWindow() {
    try {
      await resetDesktopWindow();
      setDesktopMessage('Window restored to 1280 × 720.');
      await refreshDesktopStatus();
    } catch (error) {
      setDesktopMessage(`Window reset failed: ${String(error)}`);
    }
  }

  async function handleImport(file: File | undefined) {
    if (!file) return;
    try {
      const imported = await importApplicationData(await file.text());
      setDesktopMessage(`${imported} save entries imported. Reloading interface…`);
      window.setTimeout(() => window.location.reload(), 350);
    } catch (error) {
      setDesktopMessage(`Backup import failed: ${String(error)}`);
    } finally {
      if (importRef.current) importRef.current.value = '';
    }
  }

  return (
    <section className="settings-grid" aria-label="System settings">
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
              aria-pressed={settings.selectedTheme === theme.id}
            >
              <span className="theme-color-strip" style={{ '--strip-primary': theme.primary, '--strip-accent': theme.accent } as CSSProperties} />
              <strong>{theme.name}</strong>
              <small>{theme.layout}</small>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Accessibility">
        <div className="accessibility-status-row">
          <StatusBadge label={settings.reducedMotion ? 'REDUCED MOTION' : 'STANDARD MOTION'} tone={settings.reducedMotion ? 'success' : 'neutral'} />
          <StatusBadge label={settings.highContrast ? 'HIGH CONTRAST' : 'STANDARD CONTRAST'} tone={settings.highContrast ? 'success' : 'neutral'} />
        </div>
        <label><input type="checkbox" checked={settings.reducedMotion} onChange={(event) => patch({ reducedMotion: event.target.checked })} /> Reduce interface and camera motion</label>
        <label><input type="checkbox" checked={settings.reduceFlashes} onChange={(event) => patch({ reduceFlashes: event.target.checked })} /> Reduce flashing, pulses and rapid glitch effects</label>
        <label><input type="checkbox" checked={settings.highContrast} onChange={(event) => patch({ highContrast: event.target.checked })} /> High-contrast tactical interface</label>
        <label><input type="checkbox" checked={settings.largeText} onChange={(event) => patch({ largeText: event.target.checked })} /> Larger interface text</label>
        <label><input type="checkbox" checked={settings.screenReaderAnnouncements} onChange={(event) => patch({ screenReaderAnnouncements: event.target.checked })} /> Screen-reader route announcements</label>
        <p className="desktop-note">The app also follows the operating system’s <code>prefers-reduced-motion</code> preference.</p>
      </Panel>

      <Panel title="Controls & Gamepad">
        <label><input type="checkbox" checked={settings.gamepadEnabled} onChange={(event) => patch({ gamepadEnabled: event.target.checked })} /> Enable standard gamepad input</label>
        <label><input type="checkbox" checked={settings.gamepadVibration} disabled={!settings.gamepadEnabled} onChange={(event) => patch({ gamepadVibration: event.target.checked })} /> Enable compatible gamepad vibration</label>
        <ControlBindingEditor
          bindings={settings.keyboardBindings}
          gamepadEnabled={settings.gamepadEnabled}
          onBindingsChange={(keyboardBindings) => patch({ keyboardBindings })}
        />
      </Panel>

      <Panel title="Mobile Touch Controls">
        <label className="setting-row">
          <span>Touch HUD mode</span>
          <select value={settings.touchControlsMode} onChange={(event) => patch({ touchControlsMode: event.target.value as UserSettings['touchControlsMode'] })}>
            <option value="auto">Auto-detect touch screen</option>
            <option value="always">Always visible</option>
            <option value="off">Disabled</option>
          </select>
        </label>
        <label className="setting-row">
          <span>Control size — {Math.round(settings.touchControlScale * 100)}%</span>
          <input aria-label="Touch control size" type="range" min="0.75" max="1.35" step="0.05" value={settings.touchControlScale} onChange={(event) => patch({ touchControlScale: Number(event.target.value) })} />
        </label>
        <label className="setting-row">
          <span>Control opacity — {Math.round(settings.touchControlOpacity * 100)}%</span>
          <input aria-label="Touch control opacity" type="range" min="0.35" max="1" step="0.05" value={settings.touchControlOpacity} onChange={(event) => patch({ touchControlOpacity: Number(event.target.value) })} />
        </label>
        <label><input type="checkbox" checked={settings.touchHaptics} onChange={(event) => patch({ touchHaptics: event.target.checked })} /> Short vibration on compatible mobile devices</label>
        <p className="desktop-note">Use “Always visible” to test the tactical touch HUD on desktop. The HUD can be collapsed during gameplay.</p>
      </Panel>

      <PwaSettingsPanel />

      <Panel title="Narrative Audio & Localization">
        <label className="setting-row">
          <span>Interface / subtitle language</span>
          <select value={settings.locale} onChange={(event) => patch({ locale: event.target.value as UserSettings['locale'] })}>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </label>
        <label><input type="checkbox" checked={settings.subtitlesEnabled} onChange={(event) => patch({ subtitlesEnabled: event.target.checked })} /> Timed subtitles</label>
        <label><input type="checkbox" checked={settings.narrativeAudioEnabled} onChange={(event) => patch({ narrativeAudioEnabled: event.target.checked })} /> Narrative Codec audio filters</label>
        <label><input type="checkbox" checked={settings.portraitExpressions} onChange={(event) => patch({ portraitExpressions: event.target.checked })} /> Emotional portrait states</label>
        <label><input type="checkbox" checked={settings.portraitAnimationEnabled} onChange={(event) => patch({ portraitAnimationEnabled: event.target.checked })} /> Animated portrait scan, blink and voice pulse</label>
        <label><input type="checkbox" checked={settings.voicePackEnabled} onChange={(event) => patch({ voicePackEnabled: event.target.checked })} /> Use installed local voice and portrait packs</label>
        <label className="setting-row">
          <span>Narrative audio volume — {Math.round(settings.narrativeAudioVolume * 100)}%</span>
          <input aria-label="Narrative audio volume" type="range" min="0" max="1" step="0.05" value={settings.narrativeAudioVolume} onChange={(event) => patch({ narrativeAudioVolume: Number(event.target.value) })} />
        </label>
        <p className="desktop-note">Conversation files accept localized EN/FR/JA text, timecodes, optional local audio sources and portrait expressions.</p>
      </Panel>

      <VoicePackManager />

      <Panel title="Codec Settings">
        <label><input type="checkbox" checked={settings.fastText} onChange={(event) => patch({ fastText: event.target.checked })} /> Fast text</label>
        <label><input type="checkbox" checked={settings.autoAdvance} onChange={(event) => patch({ autoAdvance: event.target.checked })} /> Auto advance</label>
        <label><input type="checkbox" checked={settings.classicCodecPausesGame} onChange={(event) => patch({ classicCodecPausesGame: event.target.checked })} /> Classic Codec pauses game</label>
        <label className="setting-row">
          <span>UI Beep Volume</span>
          <input aria-label="UI beep volume" type="range" min="0" max="1" step="0.05" value={settings.uiBeepVolume} onChange={(event) => patch({ uiBeepVolume: Number(event.target.value) })} />
        </label>
        <label className="setting-row">
          <span>Radio Noise Volume</span>
          <input aria-label="Radio noise volume" type="range" min="0" max="1" step="0.05" value={settings.radioNoiseVolume} onChange={(event) => patch({ radioNoiseVolume: Number(event.target.value) })} />
        </label>
      </Panel>

      <Panel title="Desktop Command Deck">
        <div className="desktop-status-grid">
          <StatusBadge label={desktopStatus.isDesktop ? 'TAURI DESKTOP' : 'WEB MODE'} tone={desktopStatus.isDesktop ? 'success' : 'warning'} />
          <span>Storage: <strong>{desktopStatus.backend}</strong></span>
          <span>Fullscreen: <strong>{desktopStatus.fullscreen ? 'ON' : 'OFF'}</strong></span>
          <span>Maximized: <strong>{desktopStatus.maximized ? 'YES' : 'NO'}</strong></span>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={() => void handleFullscreen()}>{desktopStatus.fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</button>
          <button type="button" onClick={() => void handleMaximize()} disabled={!desktopStatus.isDesktop}>{desktopStatus.maximized ? 'Restore Window' : 'Maximize Window'}</button>
          <button type="button" onClick={() => void handleResetWindow()} disabled={!desktopStatus.isDesktop}>Reset 1280 × 720</button>
        </div>
        <p className="desktop-note">Window position and size are restored automatically by the Tauri window-state plugin.</p>
      </Panel>

      <Panel title="Runtime Diagnostics">
        <div className="desktop-status-grid diagnostics-grid">
          <StatusBadge label={diagnostics?.online === false ? 'OFFLINE' : 'ONLINE'} tone={diagnostics?.online === false ? 'warning' : 'success'} />
          <span>App: <strong>{diagnostics?.appVersion ?? '—'}</strong></span>
          <span>Viewport: <strong>{diagnostics?.viewport ?? '—'}</strong></span>
          <span>Storage: <strong>{diagnostics?.storageApproximation ?? '—'}</strong></span>
          <span>Save entries: <strong>{diagnostics?.localStorageEntries ?? '—'}</strong></span>
          <span>Gamepads: <strong>{diagnostics?.gamepads.length ?? 0}</strong></span>
          <span>Crash reports: <strong>{diagnostics?.recentCrashReports.length ?? 0}</strong></span>
        </div>
        {diagnostics?.gamepads.length ? (
          <ul className="diagnostic-device-list">{diagnostics.gamepads.map((gamepad) => <li key={gamepad}>{gamepad}</li>)}</ul>
        ) : null}
        <div className="desktop-actions">
          <button type="button" onClick={() => void refreshDiagnostics()}>Refresh diagnostics</button>
          <button type="button" onClick={() => diagnostics && downloadDiagnostics(diagnostics)} disabled={!diagnostics}>Export diagnostics</button>
        </div>
        <div className="desktop-message" role="status" aria-live="polite">{diagnosticMessage}</div>
      </Panel>

      <Panel title="Save Data & Recovery">
        <p className="desktop-note">Desktop builds mirror every local save entry to an on-disk Tauri store. JSON backups remain portable between web and desktop.</p>
        <div className="desktop-actions">
          <button type="button" onClick={downloadApplicationBackup}>Export Full Backup</button>
          <button type="button" onClick={() => importRef.current?.click()}>Import Backup</button>
          <input ref={importRef} hidden type="file" accept="application/json,.json" onChange={(event) => void handleImport(event.target.files?.[0])} />
        </div>
        <div className="desktop-message" role="status" aria-live="polite">{desktopMessage}</div>
      </Panel>
    </section>
  );
}
