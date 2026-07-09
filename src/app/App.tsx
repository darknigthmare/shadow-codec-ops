import { useEffect, useMemo, useState } from 'react';
import { AppLayout, type AppRoute } from './AppLayout';
import { HomeScreen } from './HomeScreen';
import { CodecScreen } from '../components/codec/CodecScreen';
import { SideOpsLauncher } from '../components/sideops/SideOpsLauncher';
import { PlaceholderScreen } from '../components/common/PlaceholderScreen';
import { VRMissionsScreen } from '../components/vr/VRMissionsScreen';
import { TapeArchive } from '../components/tapes/TapeArchive';
import { ConversationStudio } from '../components/studio/ConversationStudio';
import { SettingsScreen } from '../components/settings/SettingsScreen';
import { loadJson, saveJson } from '../systems/saveEngine';
import { applyThemeClass } from '../systems/themeEngine';
import { defaultSettings, type UserSettings } from '../types/theme.types';

export function App() {
  const [route, setRoute] = useState<AppRoute>('home');
  const [settings, setSettings] = useState<UserSettings>(() => loadJson('settings', defaultSettings));

  useEffect(() => {
    saveJson('settings', settings);
  }, [settings]);

  const shellClassName = useMemo(() => applyThemeClass(settings), [settings]);

  return (
    <div className={shellClassName}>
      <AppLayout route={route} onRouteChange={setRoute} settings={settings}>
        {route === 'home' && <HomeScreen onRouteChange={setRoute} settings={settings} />}
        {route === 'codec' && <CodecScreen settings={settings} onSettingsChange={setSettings} />}
        {route === 'sideops' && <SideOpsLauncher onOpenCodec={() => setRoute('codec')} />}
        {route === 'vr' && <VRMissionsScreen />}
        {route === 'tapes' && <TapeArchive />}
        {route === 'studio' && <ConversationStudio />}
        {route === 'lore' && (
          <PlaceholderScreen
            title="LORE DATABASE"
            subtitle="Base locale personnages, fréquences, organisations, missions, boss, items."
          />
        )}
        {route === 'settings' && <SettingsScreen settings={settings} onSettingsChange={setSettings} />}
      </AppLayout>
    </div>
  );
}
