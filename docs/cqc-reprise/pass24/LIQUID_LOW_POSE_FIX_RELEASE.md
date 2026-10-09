# Liquid — native downward strike

Liquid's native `specialDown` strike now selects its authored `low` animation when that action exists. The Rétro costume previously displayed a punch for this move. Missing native low actions retain the existing fallback.

Only the renderer and its runtime manifest change; move profiles, physics, hitboxes, costumes and every asset remain byte-identical to the previous release.

Local validation: six Rétro phase/direction draws; Original/Gala and missing-low fallbacks; 35,046 unchanged Original action-routing cases; original TypeScript build, Vite/PWA build and PWA checker; both source runtimes verified. Browser and public-deployment validation are recorded separately and are not claimed here.
