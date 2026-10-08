import { describe, expect, it } from 'vitest';
import type { RadioSignalDefinition } from '../types/codec.types';
import {
  createDefaultRadioIntelState,
  normalizeRadioIntelState,
  recordRadioDiscovery,
  recordRadioPuzzleAttempt,
  recordRadioScan,
  updateRadioDiscoveryNote
} from './radioIntelStorage';

const signal: RadioSignalDefinition = {
  id: 'signal', era: 'mgs1', label: 'Signal', frequency: 141.65, bandwidth: 0.04, strength: 1,
  kind: 'encrypted_packet', canonStatus: 'simulation', encrypted: true, reward: { intelPoints: 30 }
};

describe('radio intel storage', () => {
  it('normalizes missing state', () => {
    expect(normalizeRadioIntelState(null)).toEqual(createDefaultRadioIntelState());
  });

  it('records scans and the last era frequency', () => {
    const next = recordRadioScan(createDefaultRadioIntelState(), 'mgs1', 141.65);
    expect(next.scanCount).toBe(1);
    expect(next.lastFrequencyByEra.mgs1).toBe(141.65);
  });

  it('awards intel only once when a signal becomes usable', () => {
    const discovered = recordRadioDiscovery(createDefaultRadioIntelState(), signal, 'ctx', 'discovered');
    expect(discovered.intelPoints).toBe(0);
    const decoded = recordRadioDiscovery(discovered, signal, 'ctx', 'decoded');
    expect(decoded.intelPoints).toBe(30);
    expect(decoded.decodedCount).toBe(1);
    const repeated = recordRadioDiscovery(decoded, signal, 'ctx', 'decoded');
    expect(repeated.intelPoints).toBe(30);
  });

  it('tracks attempts and operator notes', () => {
    const discovered = recordRadioDiscovery(createDefaultRadioIntelState(), signal, 'ctx');
    const attempted = recordRadioPuzzleAttempt(discovered, signal.id, false);
    const noted = updateRadioDiscoveryNote(attempted, signal.id, 'Check the hangar route.');
    expect(noted.discoveries.signal.attempts).toBe(1);
    expect(noted.discoveries.signal.note).toContain('hangar');
  });
});
