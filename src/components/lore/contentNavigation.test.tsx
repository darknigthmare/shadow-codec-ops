import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LoreDatabase } from './LoreDatabase';
import { TapeArchive } from '../tapes/TapeArchive';
import { CodecScreen } from '../codec/CodecScreen';
import { defaultSettings } from '../../types/theme.types';
import { consumeCampaignLaunchDirective, setCampaignLaunchDirective } from '../../systems/campaignStorage';
import { loadJson } from '../../systems/saveEngine';
import { BUILT_IN_CONTENT_LINK_CATALOG, BUILT_IN_SIDE_OPS_MISSIONS } from '../../systems/contentLinks';

let host: HTMLDivElement;
let root: Root;
const quietSettings = { ...defaultSettings, narrativeAudioEnabled: false, eraUiAudioEnabled: false, codecAmbienceEnabled: false, portraitAnimationEnabled: false, voicePackEnabled: false, builtInPortraitsEnabled: false };

beforeEach(() => {
  window.localStorage.clear();
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
});

afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
});

async function click(button: HTMLButtonElement | undefined | null) {
  expect(button).toBeTruthy();
  await act(async () => button!.click());
}

function buttonWithText(text: string, scope: Element = host): HTMLButtonElement | undefined {
  return Array.from(scope.querySelectorAll('button')).find(button => button.textContent?.trim() === text);
}

describe('content navigation through real module controls', () => {
  it('exposes the already playable multi-era Side Ops operations as Lore dossiers', async () => {
    await act(async () => root.render(<LoreDatabase />));
    const rows = Array.from(host.querySelectorAll('.lore-entry-row strong')).map(row => row.textContent);
    for (const mission of BUILT_IN_SIDE_OPS_MISSIONS) expect(rows).toContain(mission.title);
    const legacyDossier = Array.from(host.querySelectorAll('.lore-entry-row')).find(row => row.querySelector('strong')?.textContent === 'Narrative Audio & Localization Pipeline');
    expect(legacyDossier?.textContent).toContain('GAMEPLAY');
  });

  it('opens the exact Tanker operation from its Lore dossier', async () => {
    const onRouteChange = vi.fn();
    await act(async () => root.render(<LoreDatabase onRouteChange={onRouteChange} />));
    await click(Array.from(host.querySelectorAll<HTMLButtonElement>('.lore-entry-row')).find(button => button.querySelector('strong')?.textContent === 'Tanker Hold Sabotage'));
    const scope = host.querySelector('.lore-link-grid')!;
    await click(Array.from(scope.querySelectorAll<HTMLButtonElement>('button')).find(button => button.querySelector('strong')?.textContent === 'Tanker Hold Sabotage'));
    expect(onRouteChange).toHaveBeenCalledWith('sideops');
    expect(loadJson('sideops-active-mission-id', '')).toBe('tanker_hold_002');
  });

  it('opens the Tanker operation from the retained historical Mission 002 dossier', async () => {
    const onRouteChange = vi.fn();
    await act(async () => root.render(<LoreDatabase onRouteChange={onRouteChange} />));
    await click(Array.from(host.querySelectorAll<HTMLButtonElement>('.lore-entry-row')).find(button => button.querySelector('strong')?.textContent === 'Mission 002 — Tanker Hold Sabotage'));
    const scope = host.querySelector('.lore-link-grid')!;
    const labels = Array.from(scope.querySelectorAll('strong')).map(node => node.textContent);
    expect(labels).toEqual(['Tanker Hold Sabotage', 'Otacon', 'Olga Gurlukovich', 'Side Ops Design Log 002']);
    await click(Array.from(scope.querySelectorAll<HTMLButtonElement>('button')).find(button => button.querySelector('strong')?.textContent === 'Tanker Hold Sabotage'));
    expect(onRouteChange).toHaveBeenCalledWith('sideops');
    expect(loadJson('sideops-active-mission-id', '')).toBe('tanker_hold_002');
  });

  it('opens actual modules instead of Settings from existing Lore module links', async () => {
    const onRouteChange = vi.fn();
    await act(async () => root.render(<LoreDatabase onRouteChange={onRouteChange} />));
    const cases = [
      ['Mother Base', 'Tape Archive', 'tapes'],
      ['Codec System', 'Conversation Studio', 'studio'],
      ['Conversation Studio', 'Codec System', 'codec'],
      ['Side Ops Mission Builder', 'Conversation Studio', 'studio'],
      ['Campaign Ops Progression Layer', 'Tape Archive', 'tapes'],
      ['Campaign Builder System', 'Campaign Ops', 'campaign'],
      ['Campaign Builder System', 'Mission Builder', 'builder'],
      ['Campaign Narrative System', 'Campaign Ops', 'campaign'],
      ['Campaign Narrative System', 'Campaign Builder', 'campaignBuilder'],
      ['Codec Radio Scan & Signal Intelligence', 'Codec Simulator', 'codec']
    ];
    for (const [dossier, label, route] of cases) {
      await click(Array.from(host.querySelectorAll<HTMLButtonElement>('.lore-entry-row')).find(button => button.querySelector('strong')?.textContent === dossier));
      const scope = host.querySelector('.lore-link-grid')!;
      await click(Array.from(scope.querySelectorAll<HTMLButtonElement>('button')).find(button => button.querySelector('strong')?.textContent === label));
      expect(onRouteChange).toHaveBeenLastCalledWith(route);
    }
    expect(onRouteChange).toHaveBeenCalledTimes(cases.length);
    expect(loadJson('call-history', [])).toEqual([]);
  });

  it('turns the existing Tape conversation metadata into a targeted Codec link', async () => {
    const onRouteChange = vi.fn();
    await act(async () => root.render(<TapeArchive onRouteChange={onRouteChange} />));
    await click(Array.from(host.querySelectorAll<HTMLButtonElement>('.tape-row')).find(button => button.querySelector('strong')?.textContent === 'Shadow Moses Entry Notes'));
    await click(buttonWithText('Préparer l’appel Codec'));
    expect(onRouteChange).toHaveBeenCalledWith('codec');
    expect(consumeCampaignLaunchDirective('codec')).toMatchObject({ targetId: 'campbell_mgs1', conversationId: 'mgs1_campbell_default' });
    expect(loadJson('call-history', [])).toEqual([]);
  });

  it('keeps navigation links disabled on an unearned Tape', async () => {
    const tape = BUILT_IN_CONTENT_LINK_CATALOG.tapes.find(candidate => candidate.unlockState !== 'unlocked' && (candidate.relatedConversation || candidate.relatedMission))!;
    setCampaignLaunchDirective({ module: 'tapes', targetId: tape.id, era: tape.era });
    const onRouteChange = vi.fn();
    await act(async () => root.render(<TapeArchive onRouteChange={onRouteChange} />));
    const links = [buttonWithText('Ouvrir la mission'), buttonWithText('Ouvrir l’entraînement VR'), buttonWithText('Préparer l’appel Codec')].filter(Boolean) as HTMLButtonElement[];
    expect(links.length).toBeGreaterThan(0);
    for (const button of links) {
      expect(button.disabled).toBe(true);
      await click(button);
    }
    expect(onRouteChange).not.toHaveBeenCalled();
  });

  it('waits for the player to launch the exact prepared conversation', async () => {
    setCampaignLaunchDirective({ module: 'codec', targetId: 'campbell_mgs1', era: 'mgs1', conversationId: 'mgs1_campbell_default' });
    await act(async () => root.render(<CodecScreen settings={quietSettings} onSettingsChange={() => {}} />));
    const link = host.querySelector('[data-linked-conversation-id="mgs1_campbell_default"]');
    expect(link).not.toBeNull();
    expect(host.querySelector('.dialogue-speaker')).toBeNull();
    expect(loadJson('call-history', [])).toEqual([]);
    const button = buttonWithText('Lancer cet appel', link!);
    expect(button?.disabled).toBe(false);
    await click(button);
    const conversation = BUILT_IN_CONTENT_LINK_CATALOG.conversations.find(candidate => candidate.id === 'mgs1_campbell_default')!;
    expect(host.querySelector('.dialogue-speaker')).not.toBeNull();
    expect(host.textContent).toContain(conversation.lines[0].text);
    expect(host.querySelector('[data-linked-conversation-id]')).toBeNull();
  });

  it('keeps an incoming-only Codec contact blocked even with a precise conversation link', async () => {
    setCampaignLaunchDirective({ module: 'codec', targetId: 'campbell_mgs4', era: 'mgs4', conversationId: 'mgs4_campbell_liquid' });
    await act(async () => root.render(<CodecScreen settings={quietSettings} onSettingsChange={() => {}} />));
    const link = host.querySelector('[data-linked-conversation-id="mgs4_campbell_liquid"]');
    expect(link).not.toBeNull();
    const button = buttonWithText('Lancer cet appel', link!);
    expect(button?.disabled).toBe(true);
    await click(button);
    expect(host.querySelector('.dialogue-speaker')).toBeNull();
    expect(loadJson('call-history', [])).toEqual([]);
    expect(loadJson('codec-memory', [])).not.toContain('campbell_mgs4');
  });
});
