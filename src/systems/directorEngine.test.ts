import { describe, expect, it } from 'vitest';
import directorSequencesJson from '../data/directorSequences.json';
import type { DirectorSequenceDefinition } from '../types/director.types';
import {
  advanceDirectorRuntime,
  chooseDirectorOption,
  createDirectorRuntime,
  getDirectorNode,
  validateDirectorSequence
} from './directorEngine';

const sequences = directorSequencesJson as DirectorSequenceDefinition[];
const training = sequences.find((sequence) => sequence.id === 'director_codec_training')!;

describe('Codec Director runtime', () => {
  it('validates all built-in sequence references', () => {
    for (const sequence of sequences) {
      expect(validateDirectorSequence(sequence, sequences).filter((issue) => issue.level === 'error')).toEqual([]);
    }
  });

  it('applies choice effects and emits cross-module events', () => {
    let state = createDirectorRuntime(training);
    state = advanceDirectorRuntime(state, training).state;
    expect(getDirectorNode(training, state.currentNodeId)?.kind).toBe('choice');
    const result = chooseDirectorOption(state, training, 'direct');
    expect(result.state.variables.doctrine).toBe('direct');
    expect(result.state.variables.signalIntegrity).toBe(85);
    expect(result.emittedEvents[0]?.eventName).toBe('director:doctrine-selected');
  });

  it('creates a nested interruption and preserves the parent resume node', () => {
    let state = createDirectorRuntime(training);
    state = advanceDirectorRuntime(state, training).state;
    state = chooseDirectorOption(state, training, 'ghost').state;
    state = advanceDirectorRuntime(state, training).state;
    const result = advanceDirectorRuntime(state, training);
    expect(result.interruptSequenceId).toBe('director_patriots_intrusion');
    expect(result.state.currentNodeId).toBe('training_after_interrupt');
    expect(result.state.status).toBe('interrupted');
  });

  it('finishes an explicit end node with an outcome', () => {
    const sequence = sequences.find((entry) => entry.id === 'director_sideops_briefing')!;
    let state = createDirectorRuntime(sequence);
    state = advanceDirectorRuntime(state, sequence).state;
    state = chooseDirectorOption(state, sequence, 'silent').state;
    state = advanceDirectorRuntime(state, sequence).state;
    state = advanceDirectorRuntime(state, sequence).state;
    expect(state.status).toBe('complete');
    expect(state.outcomeId).toBe('sideops_director_briefed');
  });

  it('skips a node when its runtime conditions are not satisfied', () => {
    const conditional: DirectorSequenceDefinition = {
      schemaVersion: 1,
      id: 'conditional_sequence',
      title: 'Conditional sequence',
      description: '',
      era: 'mgs1',
      entryNodeId: 'conditional_line',
      contexts: ['standalone'],
      tags: [],
      initialVariables: { unlocked: false },
      nodes: [
        {
          id: 'conditional_line',
          kind: 'line',
          speaker: 'campbell',
          text: { en: 'This line must be skipped.' },
          conditions: [{ variable: 'unlocked', operator: 'truthy' }],
          effects: [{ operation: 'set', variable: 'wasPlayed', value: true }],
          nextId: 'fallback'
        },
        { id: 'fallback', kind: 'end', outcomeId: 'skipped' }
      ]
    };
    let state = createDirectorRuntime(conditional);
    state = advanceDirectorRuntime(state, conditional).state;
    expect(state.currentNodeId).toBe('fallback');
    expect(state.variables.wasPlayed).toBeUndefined();
    state = advanceDirectorRuntime(state, conditional).state;
    expect(state.outcomeId).toBe('skipped');
  });

});
