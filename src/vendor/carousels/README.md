# React Bits carousels

Official TypeScript + CSS sources retrieved from David Haz's React Bits repository on 2026-10-20:

- https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/FlexCarousel
- https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/DepthCarousel
- https://reactbits.dev/components/flex-carousel
- https://reactbits.dev/components/depth-carousel

License: accompanying `LICENSE.md` (MIT + Commons Clause). Components are used as part of AVX Studios, not sold as standalone components.

AVX changes to upstream:
- Removed stock-photo default items.
- Flex: DPR capped at 1.5; initialization/context-loss fallback callback; external selection prop for accessible previous/next controls; meaningful carousel label.
- Depth: TypeScript type-only imports; vertical wheel events pass through; indicator buttons use pressed states rather than incomplete tab semantics; lazy screenshot loading.
- Presentation, data, reduced-motion fallback and video playback live outside the vendor components in `src/components/showcase/`.

Keep those small integration changes when updating upstream. Full videos never become WebGL textures; only lightweight posters are sent to the GPU.
