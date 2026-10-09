import type {
  EraId,
  RadioDiscoveryStatus,
  RadioIntelDiscovery,
  RadioIntelState,
  RadioSignalDefinition
} from '../types/codec.types';
import { loadJson, saveJson } from './saveEngine';

export const RADIO_INTEL_STORAGE_KEY = 'radio-intelligence-state';

export function createDefaultRadioIntelState(): RadioIntelState {
  return {
    schemaVersion: 1,
    discoveries: {},
    intelPoints: 0,
    scanCount: 0,
    interceptedCount: 0,
    decodedCount: 0,
    lastFrequencyByEra: {}
  };
}

export function normalizeRadioIntelState(value: Partial<RadioIntelState> | null | undefined): RadioIntelState {
  const fallback = createDefaultRadioIntelState();
  if (!value || typeof value !== 'object') return fallback;
  const discoveries = value.discoveries && typeof value.discoveries === 'object' && !Array.isArray(value.discoveries)
    ? Object.fromEntries(Object.entries(value.discoveries).filter(([, discovery]) => Boolean(discovery && typeof discovery === 'object')))
    : {};
  return {
    schemaVersion: 1,
    discoveries: discoveries as Record<string, RadioIntelDiscovery>,
    intelPoints: Math.max(0, Number(value.intelPoints ?? 0) || 0),
    scanCount: Math.max(0, Number(value.scanCount ?? 0) || 0),
    interceptedCount: Math.max(0, Number(value.interceptedCount ?? 0) || 0),
    decodedCount: Math.max(0, Number(value.decodedCount ?? 0) || 0),
    lastFrequencyByEra: value.lastFrequencyByEra && typeof value.lastFrequencyByEra === 'object'
      ? value.lastFrequencyByEra
      : {}
  };
}

export function loadRadioIntelState(): RadioIntelState {
  return normalizeRadioIntelState(loadJson<Partial<RadioIntelState> | null>(RADIO_INTEL_STORAGE_KEY, null));
}

export function saveRadioIntelState(state: RadioIntelState): RadioIntelState {
  const normalized = normalizeRadioIntelState(state);
  saveJson(RADIO_INTEL_STORAGE_KEY, normalized);
  return normalized;
}

function statusRank(status: RadioDiscoveryStatus): number {
  if (status === 'decoded') return 3;
  if (status === 'intercepted') return 2;
  return 1;
}

export function recordRadioScan(state: RadioIntelState, era: EraId, frequency: number): RadioIntelState {
  return {
    ...state,
    scanCount: state.scanCount + 1,
    lastFrequencyByEra: { ...state.lastFrequencyByEra, [era]: frequency }
  };
}

export function recordRadioDiscovery(
  state: RadioIntelState,
  signal: RadioSignalDefinition,
  contextId: string,
  status: RadioDiscoveryStatus = 'discovered'
): RadioIntelState {
  const now = new Date().toISOString();
  const previous = state.discoveries[signal.id];
  const previousStatus = previous?.status ?? 'discovered';
  const nextStatus = statusRank(status) > statusRank(previousStatus) ? status : previousStatus;
  const firstFinal = (!previous || statusRank(previous.status) < 2) && statusRank(nextStatus) >= 2;
  const firstDecoded = (!previous || previous.status !== 'decoded') && nextStatus === 'decoded';
  const intelReward = firstFinal ? Math.max(0, signal.reward?.intelPoints ?? 10) : 0;
  const nextDiscovery: RadioIntelDiscovery = {
    signalId: signal.id,
    status: nextStatus,
    discoveredAt: previous?.discoveredAt ?? now,
    updatedAt: now,
    contextId,
    frequency: signal.frequency,
    attempts: previous?.attempts ?? 0,
    note: previous?.note
  };
  return {
    ...state,
    discoveries: { ...state.discoveries, [signal.id]: nextDiscovery },
    intelPoints: state.intelPoints + intelReward,
    interceptedCount: state.interceptedCount + (firstFinal ? 1 : 0),
    decodedCount: state.decodedCount + (firstDecoded ? 1 : 0)
  };
}

export function recordRadioPuzzleAttempt(
  state: RadioIntelState,
  signalId: string,
  solved: boolean
): RadioIntelState {
  const discovery = state.discoveries[signalId];
  if (!discovery) return state;
  return {
    ...state,
    discoveries: {
      ...state.discoveries,
      [signalId]: {
        ...discovery,
        attempts: discovery.attempts + 1,
        status: discovery.status,
        updatedAt: new Date().toISOString()
      }
    }
  };
}

export function updateRadioDiscoveryNote(state: RadioIntelState, signalId: string, note: string): RadioIntelState {
  const discovery = state.discoveries[signalId];
  if (!discovery) return state;
  return {
    ...state,
    discoveries: {
      ...state.discoveries,
      [signalId]: { ...discovery, note: note.slice(0, 600), updatedAt: new Date().toISOString() }
    }
  };
}

export function exportRadioIntelBundle(state: RadioIntelState, signals: RadioSignalDefinition[]): string {
  const payload = {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    state,
    signals: signals
      .filter((signal) => state.discoveries[signal.id])
      .map((signal) => ({
        id: signal.id,
        era: signal.era,
        label: signal.label,
        frequency: signal.frequency,
        kind: signal.kind,
        status: state.discoveries[signal.id].status,
        note: state.discoveries[signal.id].note
      }))
  };
  return JSON.stringify(payload, null, 2);
}
