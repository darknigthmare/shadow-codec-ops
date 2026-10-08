import { describe, expect, it } from 'vitest';
import { defaultKeyboardBindings } from '../types/accessibility.types';
import {
  bindingFromKeyboardEvent,
  findBindingConflict,
  normalizeKeyboardBinding,
  resetKeyboardBindings
} from './inputSettings';

describe('input settings', () => {
  it('normalizes browser keyboard values for Phaser bindings', () => {
    expect(normalizeKeyboardBinding('ArrowLeft')).toBe('LEFT');
    expect(normalizeKeyboardBinding('Escape')).toBe('ESC');
    expect(normalizeKeyboardBinding('KeyQ')).toBe('Q');
    expect(normalizeKeyboardBinding(' ')).toBe('SPACE');
  });

  it('detects conflicts while ignoring the active action', () => {
    expect(findBindingConflict(defaultKeyboardBindings, 'fire', 'SPACE')).toBe('cqc');
    expect(findBindingConflict(defaultKeyboardBindings, 'fire', 'J')).toBeNull();
  });

  it('returns a fresh default binding object', () => {
    const first = resetKeyboardBindings();
    const second = resetKeyboardBindings();
    first.fire = 'K';
    expect(second.fire).toBe('J');
  });

  it('rejects standalone modifier keys during capture', () => {
    expect(bindingFromKeyboardEvent(new KeyboardEvent('keydown', { key: 'Control', code: 'ControlLeft' }))).toBeNull();
    expect(bindingFromKeyboardEvent(new KeyboardEvent('keydown', { key: 'q', code: 'KeyQ' }))).toBe('Q');
  });
});
