import { describe, expect, it } from 'vitest';
import { normalizeUserSettings } from './userSettings';

describe('user settings normalization', () => {
  it('fills accessibility and control defaults for legacy saves', () => {
    const settings = normalizeUserSettings({ selectedTheme: 'mgs2_digital', scanlines: false });
    expect(settings.selectedTheme).toBe('mgs2_digital');
    expect(settings.scanlines).toBe(false);
    expect(settings.gamepadEnabled).toBe(true);
    expect(settings.keyboardBindings.fire).toBe('J');
    expect(settings.reducedMotion).toBe(false);
    expect(settings.touchControlsMode).toBe('auto');
    expect(settings.touchControlScale).toBe(1);
  });

  it('keeps custom remappings while filling missing actions', () => {
    const settings = normalizeUserSettings({ keyboardBindings: { fire: 'K' } as never });
    expect(settings.keyboardBindings.fire).toBe('K');
    expect(settings.keyboardBindings.cqc).toBe('SPACE');
  });
});
