# React Bits Shape Waves

Official TypeScript + CSS component retrieved 21 October 2026 from:
https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Backgrounds/ShapeWaves

Source matches the component supplied by AVX. MIT + Commons Clause, copyright
David Haz; see LICENSE.md. Dependency: `vgpu`.

Integration change: cap DPR at 1.5 for a full-viewport background. Original shader,
pointer interaction, visibility handling, GPU failure handling, and cleanup remain.
`RouteBackground` mounts this only on `/websites`. It uses AVX red (#ff002c),
restrained bloom, and a dark readability layer. Unsupported WebGPU, component
errors, and reduced motion use a static red geometric fallback. Grainient is
unmounted on this route. Neither renderer runs multiple times in the layout.
