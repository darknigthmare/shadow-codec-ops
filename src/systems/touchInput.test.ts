import { beforeEach, describe, expect, it } from 'vitest';
import { getTouchActionSnapshot, isTouchActionDown, resetTouchActions, setTouchAction } from './touchInput';

describe('touch input bridge', () => {
  beforeEach(resetTouchActions);

  it('tracks simultaneous touch actions for multi-touch gameplay', () => {
    setTouchAction('moveRight', true);
    setTouchAction('fire', true);
    expect(isTouchActionDown('moveRight')).toBe(true);
    expect(isTouchActionDown('fire')).toBe(true);
    expect(isTouchActionDown('moveLeft')).toBe(false);
  });

  it('releases individual actions without clearing the rest', () => {
    setTouchAction('moveLeft', true);
    setTouchAction('jump', true);
    setTouchAction('jump', false);
    expect(isTouchActionDown('moveLeft')).toBe(true);
    expect(isTouchActionDown('jump')).toBe(false);
  });

  it('resets the complete touch state on blur or route teardown', () => {
    setTouchAction('codec', true);
    resetTouchActions();
    expect(Object.values(getTouchActionSnapshot()).every((pressed) => !pressed)).toBe(true);
  });
});
