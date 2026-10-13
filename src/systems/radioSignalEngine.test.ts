import { describe, expect, it } from 'vitest';
import type { ContactDefinition, RadioSignalDefinition } from '../types/codec.types';
import {
  buildRadioCarriers,
  buildRadioSpectrum,
  findNextRadioPeak,
  getRadioBand,
  getRadioSignalHits,
  getEffectiveCarrierFrequency,
  validateRadioPuzzleAnswer
} from './radioSignalEngine';

const contact: ContactDefinition = {
  id: 'secret', name: 'Secret', era: 'mgs1', frequency: 140.48, role: 'secret_contact', availability: 'available',
  portrait: 'x', defaultConversation: 'x', specialties: [], unlockedByDefault: false, isSecret: true, description: 'x'
};
const signal: RadioSignalDefinition = {
  id: 'cipher', era: 'mgs1', label: 'Cipher', frequency: 141.65, bandwidth: 0.04, strength: 0.9,
  kind: 'encrypted_packet', canonStatus: 'simulation', contextIds: ['ctx'], hiddenUntilDiscovered: true, encrypted: true,
  puzzle: { type: 'frequency_sequence', prompt: { en: 'Frequency?' }, hint: { en: 'Tune.' }, answer: '141.65' }
};

describe('radio signal engine', () => {
  it('builds classified carriers until they are discovered', () => {
    const hidden = buildRadioCarriers([contact], [signal], 'mgs1', 'ctx', [], [], []);
    expect(hidden.find((entry) => entry.signalId === 'cipher')?.hidden).toBe(true);
    expect(hidden.find((entry) => entry.contactId === 'secret')?.label).toBe('CLASSIFIED CONTACT');
    const revealed = buildRadioCarriers([contact], [signal], 'mgs1', 'ctx', [], ['cipher'], ['secret']);
    expect(revealed.find((entry) => entry.signalId === 'cipher')?.label).toBe('Cipher');
  });

  it('locks a carrier near its exact frequency', () => {
    const carriers = buildRadioCarriers([], [signal], 'mgs1', 'ctx');
    expect(getRadioSignalHits(141.65, carriers)[0].locked).toBe(true);
    expect(getRadioSignalHits(141.75, carriers)).toHaveLength(0);
  });

  it('builds a spectrum inside the derived band', () => {
    const carriers = buildRadioCarriers([], [signal], 'mgs1', 'ctx');
    const band = getRadioBand(carriers, 141.65);
    const spectrum = buildRadioSpectrum(carriers, band, 64);
    expect(spectrum).toHaveLength(64);
    expect(Math.max(...spectrum.map((point) => point.strength))).toBeGreaterThan(0.7);
  });

  it('cycles to the next peak and wraps', () => {
    const carriers = buildRadioCarriers([contact], [signal], 'mgs1', 'ctx');
    expect(findNextRadioPeak(140.5, carriers, 1)?.frequency).toBe(141.65);
    expect(findNextRadioPeak(141.9, carriers, 1)?.frequency).toBe(140.48);
  });


  it('supports time-based frequency drift for moving carriers', () => {
    const carrier = { ...buildRadioCarriers([], [{ ...signal, frequencyDrift: 0.05 }], 'mgs1', 'ctx')[0] };
    expect(getEffectiveCarrierFrequency(carrier, 0)).not.toBe(getEffectiveCarrierFrequency(carrier, 0.25));
  });

  it('normalizes puzzle answers', () => {
    expect(validateRadioPuzzleAnswer(signal, ' 141.65 ')).toBe(true);
    expect(validateRadioPuzzleAnswer({ ...signal, puzzle: { ...signal.puzzle!, answer: 'LA LI LU LE LO' } }, 'la-li-lu-le-lo')).toBe(true);
  });
});
