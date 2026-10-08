import { describe, expect, it } from 'vitest';
import { resolveSideOpsBossHoverContract } from './sideOpsBossLocomotion';

describe('strict Chrysalis hover contract', () => {
  it('locks only Chrysalis to the explicit mission altitude without gravity or vertical velocity', () => {
    expect(resolveSideOpsBossHoverContract('peaceWalkerChrysalis', 374)).toEqual({ altitude: 374, allowGravity: false, velocityY: 0 });
    expect(resolveSideOpsBossHoverContract('peaceWalkerChrysalis', 260)?.altitude).toBe(260);
  });

  it.each(['peaceWalkerCocoon', 'peaceWalkerPupa', 'peaceWalkerBasilisk', 'peaceWalkerZeke', 'mgs3Shagohod', 'mg1HindD', 'sideops-special:peace-walker-chrysalis:core', 'chrysalis', 'constructor', '__proto__', ''])('leaves %s on its existing physics path', key => {
    expect(resolveSideOpsBossHoverContract(key, 374)).toBeUndefined();
  });

  it.each([NaN, Infinity, -Infinity, -1])('rejects invalid mission altitude %s', altitude => {
    expect(resolveSideOpsBossHoverContract('peaceWalkerChrysalis', altitude)).toBeUndefined();
  });
});
