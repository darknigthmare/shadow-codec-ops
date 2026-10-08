import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { defaultSettings } from '../../types/theme.types';
import { TouchControlOverlay, type TouchControlContext } from './TouchControlOverlay';

const touchSettings = {
  ...defaultSettings,
  touchControlsMode: 'always' as const,
  touchHaptics: false
};

function renderControls(context: TouchControlContext): Document {
  const markup = renderToStaticMarkup(
    <TouchControlOverlay settings={touchSettings} context={context} />
  );
  return new DOMParser().parseFromString(markup, 'text/html');
}

function actionText(document: Document, action: string): string | null {
  return document.querySelector(`.touch-action-cluster [data-touch-action="${action}"]`)?.textContent ?? null;
}

describe('TouchControlOverlay contexts', () => {
  it.each(['sideops', 'vr'] as const)('preserves the existing %s action layout', (context) => {
    const document = renderControls(context);

    expect(document.querySelector(`.touch-context-${context}`)).not.toBeNull();
    expect(actionText(document, 'fire')).toBe('FIRE');
    expect(actionText(document, 'cqc')).toBe('CQC');
    expect(actionText(document, 'chaff')).toBe('CHAF');
    expect(actionText(document, 'ration')).toBe('RAT');
  });

  it('maps the four Ninja techniques to their established runtime actions', () => {
    const document = renderControls('vr-ninja');

    expect(actionText(document, 'fire')).toBe('SLASH');
    expect(actionText(document, 'cqc')).toBe('CROSS');
    expect(actionText(document, 'chaff')).toBe('BODY');
    expect(actionText(document, 'ration')).toBe('STEALTH');
  });

  it('exposes the primary one-minute battle actions', () => {
    const document = renderControls('vr-minute-battle');

    expect(document.querySelector('.touch-context-vr-minute-battle')).not.toBeNull();
    expect(actionText(document, 'fire')).toBe('ATTACK');
    expect(actionText(document, 'cqc')).toBe('CQC / DET');
    expect(actionText(document, 'chaff')).toBeNull();
    expect(actionText(document, 'ration')).toBeNull();
  });

  it('maps the VS. 12 arsenal and detonation controls to their runtime actions', () => {
    const document = renderControls('vr-vs12');

    expect(document.querySelector('.touch-context-vr-vs12')).not.toBeNull();
    expect(actionText(document, 'fire')).toBe('FIRE');
    expect(actionText(document, 'cqc')).toBe('CQC / DET');
    expect(actionText(document, 'chaff')).toBe('PREV');
    expect(actionText(document, 'ration')).toBe('NEXT');
    expect(document.querySelector('.touch-system-cluster [data-touch-action="cancel"]')).not.toBeNull();
  });

  it('exposes the investigation, arrest, crawl and delivery actions for Mystery', () => {
    const document = renderControls('vr-mystery');

    expect(actionText(document, 'fire')).toBe('INSPECT');
    expect(actionText(document, 'cqc')).toBe('GRAB');
    expect(actionText(document, 'chaff')).toBe('CRAWL');
    expect(actionText(document, 'ration')).toBe('DELIVER');
  });

  it('turns movement into framing and keeps dedicated Photoshoot camera controls', () => {
    const document = renderControls('vr-photoshoot');

    expect(actionText(document, 'fire')).toBe('SHUTTER');
    expect(actionText(document, 'chaff')).toBe('ZOOM-');
    expect(actionText(document, 'ration')).toBe('ZOOM+');
    expect(actionText(document, 'cqc')).toBeNull();
    expect(document.querySelector('.touch-movement-cluster [data-touch-action="moveLeft"]')?.getAttribute('aria-label')).toBe('Frame left');
    expect(document.querySelector('.touch-movement-cluster [data-touch-action="crouch"]')?.getAttribute('aria-label')).toBe('Frame down');
    expect(document.querySelector('.touch-movement-cluster [data-touch-action="moveRight"]')?.getAttribute('aria-label')).toBe('Frame right');
    expect(document.querySelector('.touch-movement-cluster [data-touch-action="jump"]')?.getAttribute('aria-label')).toBe('Frame up');
  });
});
