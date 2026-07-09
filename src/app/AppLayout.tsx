import type { ReactNode } from 'react';
import type { UserSettings } from '../types/theme.types';

export type AppRoute = 'home' | 'codec' | 'sideops' | 'vr' | 'tapes' | 'studio' | 'lore' | 'settings';

const navItems: Array<{ route: AppRoute; label: string }> = [
  { route: 'home', label: 'HOME' },
  { route: 'codec', label: 'CODEC' },
  { route: 'sideops', label: 'SIDE OPS' },
  { route: 'vr', label: 'VR MISSIONS' },
  { route: 'tapes', label: 'TAPES' },
  { route: 'studio', label: 'STUDIO' },
  { route: 'lore', label: 'LORE DB' },
  { route: 'settings', label: 'SETTINGS' }
];

interface AppLayoutProps {
  route: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  settings: UserSettings;
  children: ReactNode;
}

export function AppLayout({ route, onRouteChange, settings, children }: AppLayoutProps) {
  return (
    <div className="layout-shell">
      <aside className="side-nav panel">
        <div className="brand-block">
          <span className="brand-kicker">TACTICAL COMMUNICATION</span>
          <h1>SHADOW CODEC OPS</h1>
          <span className="brand-subtitle">PRIVATE SIMULATION BUILD</span>
        </div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.route}
              className={`nav-button ${route === item.route ? 'active' : ''}`}
              onClick={() => onRouteChange(item.route)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="system-card">
          <p>SIGNAL: STABLE</p>
          <p>ERA: {settings.selectedEra.toUpperCase()}</p>
          <p>THEME: {settings.selectedTheme.toUpperCase()}</p>
          <p>BUILD: 0.8.0</p>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
