import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { UserSettings } from '../types/theme.types';
import { APP_VERSION } from './version';

export type AppRoute = 'home' | 'campaign' | 'campaignBuilder' | 'codec' | 'director' | 'sideops' | 'vr' | 'tapes' | 'studio' | 'builder' | 'lore' | 'settings';

const navItems: Array<{ route: AppRoute; label: string; description: string }> = [
  { route: 'home', label: 'HOME', description: 'Command overview' },
  { route: 'campaign', label: 'CAMPAIGN OPS', description: 'Connected campaign and progression layer' },
  { route: 'campaignBuilder', label: 'CAMPAIGN BUILDER', description: 'Branching campaign and ending editor' },
  { route: 'codec', label: 'CODEC', description: 'Codec simulator' },
  { route: 'director', label: 'DIRECTOR', description: 'Branching Codec sequence editor and runtime' },
  { route: 'sideops', label: 'SIDE OPS', description: 'Side-scrolling missions' },
  { route: 'vr', label: 'VR MISSIONS', description: 'Virtual training missions' },
  { route: 'tapes', label: 'TAPES', description: 'Tape and briefing archive' },
  { route: 'studio', label: 'STUDIO', description: 'Conversation editor' },
  { route: 'builder', label: 'MISSION BUILDER', description: 'Side Ops mission editor' },
  { route: 'lore', label: 'LORE DB', description: 'Lore database' },
  { route: 'settings', label: 'SETTINGS', description: 'Controls and system settings' }
];

interface AppLayoutProps {
  route: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  onPrefetchRoute?: (route: AppRoute) => void;
  settings: UserSettings;
  children: ReactNode;
}

export function AppLayout({ route, onRouteChange, onPrefetchRoute, settings, children }: AppLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);
  const [navigationOpen, setNavigationOpen] = useState(route === 'home');
  const activeItem = navItems.find((item) => item.route === route) ?? navItems[0];

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [route]);

  useEffect(() => {
    if (!navigationOpen) return;
    const closeDrawer = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavigationOpen(false);
    };
    window.addEventListener('keydown', closeDrawer);
    return () => window.removeEventListener('keydown', closeDrawer);
  }, [navigationOpen]);

  const selectRoute = (nextRoute: AppRoute) => {
    onRouteChange(nextRoute);
    setNavigationOpen(false);
  };

  return (
    <div className={`layout-shell ${navigationOpen ? 'navigation-open' : ''}`} data-route={route}>
      <a className="skip-link" href="#main-content">Skip to active module</a>
      {settings.screenReaderAnnouncements && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {activeItem.description} loaded.
        </div>
      )}
      <button
        className="main-drawer-handle"
        type="button"
        aria-label={navigationOpen ? 'Close main menu' : 'Open main menu'}
        aria-expanded={navigationOpen}
        aria-controls="main-navigation-drawer"
        onClick={() => setNavigationOpen((open) => !open)}
      >
        <span aria-hidden="true"><i /><i /><i /></span>
      </button>
      {navigationOpen && <button className="drawer-backdrop" type="button" aria-label="Close main menu" onClick={() => setNavigationOpen(false)} />}
      <aside id="main-navigation-drawer" className="side-nav panel" aria-label="Application navigation" aria-hidden={!navigationOpen}>
        <div className="brand-block">
          <span className="brand-kicker">TACTICAL COMMUNICATION</span>
          <h1>SHADOW CODEC OPS</h1>
          <span className="brand-subtitle">PRIVATE SIMULATION BUILD</span>
        </div>
        <nav aria-label="Primary modules">
          {navItems.map((item) => (
            <button
              key={item.route}
              className={`nav-button ${route === item.route ? 'active' : ''}`}
              onClick={() => selectRoute(item.route)}
              onMouseEnter={() => onPrefetchRoute?.(item.route)}
              onFocus={() => onPrefetchRoute?.(item.route)}
              type="button"
              aria-current={route === item.route ? 'page' : undefined}
              aria-label={`${item.label}: ${item.description}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="system-card" aria-label="Current system status">
          <p>SIGNAL: STABLE</p>
          <p>ERA: {settings.selectedEra.toUpperCase()}</p>
          <p>THEME: {settings.selectedTheme.toUpperCase()}</p>
          <p>BUILD: {APP_VERSION}</p>
          <p>INPUT: {settings.gamepadEnabled ? 'KEYBOARD + GAMEPAD' : 'KEYBOARD'}{settings.touchControlsMode !== 'off' ? ' + TOUCH' : ''}</p>
          <p>STREAMING: LAZY MODULES</p>
        </div>
      </aside>
      <main
        id="main-content"
        ref={mainRef}
        className="main-content"
        tabIndex={-1}
        aria-label={activeItem.description}
      >
        {children}
      </main>
    </div>
  );
}
