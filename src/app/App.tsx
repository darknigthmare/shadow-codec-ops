import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { AppLayout, type AppRoute } from './AppLayout';
import { HomeScreen } from './HomeScreen';
import { AppErrorBoundary } from '../components/common/AppErrorBoundary';
import { BootScreen } from '../components/common/BootScreen';
import { PwaRuntimeBanner } from '../components/common/PwaRuntimeBanner';
import { loadJson, saveJson } from '../systems/saveEngine';
import { applyThemeClass } from '../systems/themeEngine';
import { defaultSettings, type UserSettings } from '../types/theme.types';
import { normalizeUserSettings } from '../systems/userSettings';
import type { DirectorLaunchRequest } from '../types/director.types';
import { subscribeDirectorRequests, subscribeDirectorRuntimeEvents } from '../systems/directorBus';


const loadCampaignModule = () => import('../components/campaign/CampaignOps');
const loadCampaignBuilderModule = () => import('../components/campaign-builder/CampaignBuilder');
const loadCodecModule = () => import('../components/codec/CodecScreen');
const loadDirectorModule = () => import('../components/director/CodecDirector');
const loadDirectorRuntimeModule = () => import('../components/director/DirectorRuntimeOverlay');
const loadSideOpsModule = () => import('../components/sideops/SideOpsLauncher');
const loadVrModule = () => import('../components/vr/VRMissionsScreen');
const loadTapesModule = () => import('../components/tapes/TapeArchive');
const loadStudioModule = () => import('../components/studio/ConversationStudio');
const loadMissionBuilderModule = () => import('../components/mission-builder/MissionBuilder');
const loadLoreModule = () => import('../components/lore/LoreDatabase');
const loadSettingsModule = () => import('../components/settings/SettingsScreen');

const CampaignOps = lazy(() => loadCampaignModule().then((module) => ({ default: module.CampaignOps })));
const CampaignBuilder = lazy(() => loadCampaignBuilderModule().then((module) => ({ default: module.CampaignBuilder })));
const CodecScreen = lazy(() => loadCodecModule().then((module) => ({ default: module.CodecScreen })));
const CodecDirector = lazy(() => loadDirectorModule().then((module) => ({ default: module.CodecDirector })));
const DirectorRuntimeOverlay = lazy(() => loadDirectorRuntimeModule().then((module) => ({ default: module.DirectorRuntimeOverlay })));
const SideOpsLauncher = lazy(() => loadSideOpsModule().then((module) => ({ default: module.SideOpsLauncher })));
const VRMissionsScreen = lazy(() => loadVrModule().then((module) => ({ default: module.VRMissionsScreen })));
const TapeArchive = lazy(() => loadTapesModule().then((module) => ({ default: module.TapeArchive })));
const ConversationStudio = lazy(() => loadStudioModule().then((module) => ({ default: module.ConversationStudio })));
const MissionBuilder = lazy(() => loadMissionBuilderModule().then((module) => ({ default: module.MissionBuilder })));
const LoreDatabase = lazy(() => loadLoreModule().then((module) => ({ default: module.LoreDatabase })));
const SettingsScreen = lazy(() => loadSettingsModule().then((module) => ({ default: module.SettingsScreen })));

const routeLoaders: Partial<Record<AppRoute, () => Promise<unknown>>> = {
  campaign: loadCampaignModule,
  campaignBuilder: loadCampaignBuilderModule,
  codec: loadCodecModule,
  director: loadDirectorModule,
  sideops: loadSideOpsModule,
  vr: loadVrModule,
  tapes: loadTapesModule,
  studio: loadStudioModule,
  builder: loadMissionBuilderModule,
  lore: loadLoreModule,
  settings: loadSettingsModule
};

const routeLabels: Record<AppRoute, string> = {
  home: 'COMMAND HOME',
  campaign: 'CAMPAIGN OPS',
  campaignBuilder: 'CAMPAIGN BUILDER',
  codec: 'CODEC SIMULATOR',
  director: 'CODEC DIRECTOR',
  sideops: 'SIDE OPS',
  vr: 'VR MISSIONS',
  tapes: 'TAPE ARCHIVE',
  studio: 'CONVERSATION STUDIO',
  builder: 'MISSION BUILDER',
  lore: 'LORE DATABASE',
  settings: 'SYSTEM SETTINGS'
};

function prefetchRoute(route: AppRoute): void {
  void routeLoaders[route]?.();
}

function initialRoute(): AppRoute {
  const requested = new URLSearchParams(window.location.search).get('module');
  return requested && Object.prototype.hasOwnProperty.call(routeLabels, requested) ? requested as AppRoute : 'home';
}

export function App() {
  const [route, setRoute] = useState<AppRoute>(initialRoute);
  const [settings, setSettings] = useState<UserSettings>(() => normalizeUserSettings(loadJson<Partial<UserSettings>>('settings', defaultSettings)));
  const [directorRequest, setDirectorRequest] = useState<DirectorLaunchRequest | null>(null);

  useEffect(() => {
    saveJson('settings', settings);
  }, [settings]);

  useEffect(() => subscribeDirectorRequests((request) => setDirectorRequest(request)), []);
  useEffect(() => subscribeDirectorRuntimeEvents((event) => {
    if (event.eventName.startsWith('campaign:')) void import('../systems/campaignStorage').then((module) => module.recordCampaignDirectorEvent(event));
  }), []);

  const shellClassName = useMemo(() => applyThemeClass(settings), [settings]);

  function renderRoute() {
    switch (route) {
      case 'campaign':
        return <CampaignOps onRouteChange={setRoute} />;
      case 'campaignBuilder':
        return <CampaignBuilder onPlaytest={() => setRoute('campaign')} />;
      case 'codec':
        return <CodecScreen settings={settings} onSettingsChange={setSettings} />;
      case 'director':
        return <CodecDirector />;
      case 'sideops':
        return <SideOpsLauncher settings={settings} onOpenCodec={() => setRoute('codec')} onOpenBuilder={() => setRoute('builder')} />;
      case 'vr':
        return <VRMissionsScreen settings={settings} />;
      case 'tapes':
        return <TapeArchive />;
      case 'studio':
        return <ConversationStudio />;
      case 'builder':
        return <MissionBuilder onPlaytest={() => setRoute('sideops')} />;
      case 'lore':
        return <LoreDatabase onRouteChange={setRoute} />;
      case 'settings':
        return <SettingsScreen settings={settings} onSettingsChange={setSettings} />;
      case 'home':
      default:
        return <HomeScreen onRouteChange={setRoute} settings={settings} />;
    }
  }

  return (
    <div className={shellClassName}>
      <PwaRuntimeBanner />
      <AppLayout
        route={route}
        onRouteChange={setRoute}
        onPrefetchRoute={prefetchRoute}
        settings={settings}
      >
        <AppErrorBoundary key={route} resetKey={route} onReset={() => setRoute('home')}>
          <Suspense
            fallback={(
              <BootScreen
                mode="route"
                title={routeLabels[route]}
                detail="STREAMING ONLY THE REQUESTED TACTICAL MODULE…"
              />
            )}
          >
            {renderRoute()}
          </Suspense>
        </AppErrorBoundary>
      </AppLayout>
      {directorRequest && (
        <AppErrorBoundary resetKey={directorRequest.sequenceId} onReset={() => setDirectorRequest(null)}>
          <Suspense fallback={<BootScreen mode="route" title="CODEC DIRECTOR RUNTIME" detail="LOADING BRANCHING TRANSMISSION…" />}>
            <DirectorRuntimeOverlay
              request={directorRequest}
              settings={settings}
              onClose={() => setDirectorRequest(null)}
              onComplete={() => setDirectorRequest(null)}
            />
          </Suspense>
        </AppErrorBoundary>
      )}
    </div>
  );
}
