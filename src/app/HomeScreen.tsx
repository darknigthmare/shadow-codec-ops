import themesJson from '../data/themes.json';
import type { AppRoute } from './AppLayout';
import { Panel } from '../components/common/Panel';
import { StatusBadge } from '../components/common/StatusBadge';
import type { ThemePackDefinition, UserSettings } from '../types/theme.types';

const themePacks = themesJson as ThemePackDefinition[];

interface HomeScreenProps {
  onRouteChange: (route: AppRoute) => void;
  settings: UserSettings;
}

export function HomeScreen({ onRouteChange, settings }: HomeScreenProps) {
  const activeTheme = themePacks.find((theme) => theme.id === settings.selectedTheme) ?? themePacks[0];

  return (
    <section className="screen-grid home-grid">
      <Panel className="hero-panel">
        <StatusBadge label="SYSTEM READY" tone="success" />
        <h2>Shadow Codec Ops</h2>
        <p>
          Simulateur Codec tactique + prototype Side Ops 2D. La base actuelle pose le terminal,
          les fréquences, les contacts, les appels, une mission side-scroller jouable, un Studio de conversations
          plusieurs packs visuels Codec, un vrai Tape Archive / iDroid Deck et des VR Missions locales.
        </p>
        <div className="hero-actions">
          <button className="primary-action" type="button" onClick={() => onRouteChange('codec')}>
            START CODEC
          </button>
          <button className="primary-action secondary" type="button" onClick={() => onRouteChange('sideops')}>
            LAUNCH SIDE OPS
          </button>
        </div>
      </Panel>

      <Panel title="Active Profile">
        <ul className="status-list">
          <li><span>Current Era</span><strong>{settings.selectedEra.toUpperCase()}</strong></li>
          <li><span>Theme</span><strong>{activeTheme.name}</strong></li>
          <li><span>Visual Mood</span><strong>{activeTheme.mood}</strong></li>
          <li><span>Codec Mode</span><strong>{settings.classicCodecPausesGame ? 'CLASSIC PAUSE' : 'TACTICAL OVERLAY'}</strong></li>
          <li><span>Pixel Perfect</span><strong>{settings.pixelPerfect ? 'ON' : 'OFF'}</strong></li>
        </ul>
      </Panel>

      <Panel title="Module Status">
        <div className="module-list">
          <StatusBadge label="CODEC SIMULATOR ONLINE" tone="success" />
          <StatusBadge label="SIDE OPS ALERT CORE READY" tone="warning" />
          <StatusBadge label="VISUAL PACKS ONLINE" tone="success" />
          <StatusBadge label="VR MISSIONS ONLINE" tone="success" />
          <StatusBadge label="CONVERSATION STUDIO ONLINE" tone="success" />
          <StatusBadge label="TAPE ARCHIVE ONLINE" tone="success" />
        </div>
      </Panel>
    </section>
  );
}
