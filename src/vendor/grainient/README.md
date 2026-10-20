# React Bits Grainient

Vendored from the official TypeScript/CSS component:
https://github.com/DavidHDev/react-bits/blob/496968c4117e21278f13917201b7d615bc5e7450/src/ts-default/Backgrounds/Grainient/Grainient.tsx

Retrieved 20 October 2026. MIT + Commons Clause, copyright David Haz; see LICENSE.md.

Integration changes: hide the canvas and release partially initialized programs if
WebGL/context or shader initialization fails, allowing the application CSS fallback
to remain visible. Cleanup deletes owned GPU resources without forcibly losing
the context, so React StrictMode can replay the effect on the same canvas.
The original shader and interaction implementation are intact.

The application wrapper handles lazy loading, viewport mounting, reduced motion,
context loss, and a capped device pixel ratio. This is the official component,
not an imitation CSS gradient.
