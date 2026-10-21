# React Bits Letter Glitch

Official TypeScript + CSS source retrieved 21 October 2026:
https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Backgrounds/LetterGlitch

Component reference: https://reactbits.dev/backgrounds/letter-glitch
Copyright David Haz; MIT + Commons Clause, included in LICENSE.md.

The original shader, letter atlas, pointer interaction, offscreen/visibility
pausing, and cleanup are retained. AVX adds cleanup for partially failed GPU
initialization. No additional dependencies are required.

`LetterGlitchSurface` mounts it only in the Websites page’s upper section using
white/red (#ffffff, #ff0000), a DPR cap of 1.5, and a subtle readability overlay.
Reduced motion skips the canvas. A static letter field remains underneath for
loading and unsupported WebGL; context loss unmounts the renderer. Grainient
remains exclusive to the other pages.
