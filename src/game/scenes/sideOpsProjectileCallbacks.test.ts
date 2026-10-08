import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';

const files = ['SideOpsScene.ts', 'Mg1OuterHeavenScene.ts', 'Mgs1ShadowMosesScene.ts'];
const projectileGroups = new Set(['this.bullets', 'this.enemyBullets', 'this.playerProjectiles', 'this.enemyProjectiles']);

function registrations(filename: string) {
  const source = readFileSync(resolve('src/game/scenes', filename), 'utf8');
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const calls: ts.CallExpression[] = [];
  function visit(node: ts.Node) {
    if (ts.isCallExpression(node) && /this\.physics\.add\.(overlap|collider)$/.test(node.expression.getText(ast))) calls.push(node);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return { ast, calls };
}

describe('Phaser sprite-versus-projectile-group callback order', () => {
  // World.collideHandler normalizes both input orders to
  // collideSpriteVsGroup(sprite, group), whose callback is (sprite, member).
  for (const filename of files) {
    const { ast, calls } = registrations(filename);
    const spriteGroup = calls.filter(call => projectileGroups.has(call.arguments[1]?.getText(ast)));

    it(`${filename} never registers a projectile-first callback against a single sprite`, () => {
      const reversed = calls.filter(call => projectileGroups.has(call.arguments[0]?.getText(ast))
        && call.arguments[1]?.getText(ast) !== 'this.platforms');
      expect(reversed.map(call => call.getText(ast))).toEqual([]);
      expect(spriteGroup.length).toBe(filename === 'SideOpsScene.ts' ? 6 : filename === 'Mg1OuterHeavenScene.ts' ? 4 : 3);
    });

    for (const [index, call] of spriteGroup.entries()) {
      it(`${filename} callback ${index + 1} consumes the projectile, not the target sprite`, () => {
        const callbackNode = call.arguments[2];
        expect(ts.isArrowFunction(callbackNode)).toBe(true);
        const script = ts.transpileModule(`const callback = ${callbackNode.getText(ast)};`, {
          compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
        }).outputText;
        const target = { active: true, x: 320, y: 480 };
        const projectile = { active: true, x: 340, y: 470, getData: vi.fn((key: string) => key === 'damage' ? 11 : 'rifle') };
        const unit = {};
        const guard = {};
        const protectedHostage = {};
        const subject = {
          activeBoss: unit,
          spawnPlayerImpactVfx: vi.fn(), spawnEnemyImpactVfx: vi.fn(), destroyPhysicsObject: vi.fn(),
          hitCamera: vi.fn(), damagePlayer: vi.fn(), hitGuard: vi.fn(), hitBoss: vi.fn(),
          hitPlayerWithProjectile: vi.fn(), hitHazard: vi.fn(), hitEncounterUnit: vi.fn(), harmProtectedHostage: vi.fn(),
        };
        // Invoke the real compiled callback with the actual Phaser ordering.
        const callback = new Function('unit', 'guard', 'protectedHostage', `${script}; return callback;`)
          .call(subject, unit, guard, protectedHostage) as (target: object, projectile: object) => void;
        callback(target, projectile);
        const consumed = [subject.destroyPhysicsObject, subject.hitPlayerWithProjectile,
          subject.hitHazard, subject.hitEncounterUnit, subject.harmProtectedHostage, subject.hitBoss]
          .flatMap(spy => spy.mock.calls.flat());
        expect(consumed).toContain(projectile);
        expect(consumed).not.toContain(target);
      });
    }
  }
});
