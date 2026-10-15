import { afterAll, describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => ({ default: { Scene: class {}, Scenes: { Events: { SHUTDOWN: 'shutdown', DESTROY: 'destroy' } } } }));
vi.mock('../core/RuntimeInput', () => ({ RuntimeInputController: class {
  update() {}
  justDown(action: string) { return action === 'confirm'; }
  vibrate() {}
} }));

import { MissionCompleteScene } from './MissionCompleteScene';
import { GAME_EVENT, onGameEvent } from '../core/GameEvents';

function harness() {
  const scene = new MissionCompleteScene() as unknown as {
    create: MissionCompleteScene['create']; update: MissionCompleteScene['update'];
    add: { rectangle: ReturnType<typeof vi.fn>; text: ReturnType<typeof vi.fn> };
    events: { once: ReturnType<typeof vi.fn> };
    scene: { start: ReturnType<typeof vi.fn> };
  };
  const cleanup: Array<() => void> = [];
  scene.add = { rectangle: vi.fn(() => ({ setStrokeStyle: vi.fn() })), text: vi.fn() };
  scene.events = { once: vi.fn((_name: string, callback: () => void) => cleanup.push(callback)) };
  scene.scene = { start: vi.fn() };
  return { scene, cleanup: () => cleanup.forEach((callback) => callback()) };
}

afterAll(() => { vi.doUnmock('phaser'); vi.doUnmock('../core/RuntimeInput'); vi.resetModules(); });

describe('mission result navigation', () => {
  it('broadcasts keyboard/gamepad replay so the React result overlay is cleared too', () => {
    const { scene, cleanup } = harness();
    const replay = vi.fn();
    const off = onGameEvent(GAME_EVENT.MISSION_RESTART, replay);
    scene.create({ missionId: 'sideops_mgs1_recon', success: true, bossRequired: false });
    scene.update();
    scene.update();
    expect(replay).toHaveBeenCalledOnce();
    expect(replay).toHaveBeenCalledWith(expect.objectContaining({ missionId: 'sideops_mgs1_recon' }));
    expect(scene.scene.start).toHaveBeenCalledOnce();
    expect(scene.scene.start).toHaveBeenCalledWith('SideOpsScene');
    off(); cleanup();
  });

  it('does not describe a successful reconnaissance as a boss failure', () => {
    const { scene, cleanup } = harness();
    scene.create({ missionId: 'sideops_mgs1_recon', success: true, bossRequired: false });
    const rows = scene.add.text.mock.calls.map((call) => String(call[2]));
    expect(rows.some((row) => row.startsWith('BOSS DEFEATED'))).toBe(false);
    expect(rows).toContain('RECONNAISSANCE: COMPLETE');
    cleanup();
  });
});
