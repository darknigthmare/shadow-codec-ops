import definitions from '../../data/sideopsCommonProps.json';

/** Original shared side-view adaptations, not episode-specific canonical replicas.
 * Keep existing texture keys and pixel dimensions so collisions and pickups do
 * not change when procedural emergency fallbacks are replaced with authored art.
 */
export const SIDEOPS_DEFERRED_PROP_ASSETS = definitions.filter((definition) => definition.runtimeStatus === 'deferred');
export const SIDEOPS_COMMON_PROP_ASSETS = definitions
  .filter((definition) => definition.runtimeStatus !== 'deferred')
  .map((definition) => Object.freeze({ ...definition }));
