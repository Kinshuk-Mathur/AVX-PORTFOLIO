# AVX Studios

A custom React + TypeScript creative studio portfolio, built with Vite, Tailwind CSS,
GSAP/ScrollTrigger, Lenis, Motion, Lucide, React Router, and the **official React Bits
Grainient, ShapeWaves, FlexCarousel, and DepthCarousel**.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. Other commands:

```sh
npm run check       # TypeScript and meaningful content/security validation tests
npm run build       # Optimized static site in dist/
npm run preview     # Serve the production build
```

Dependencies are locked in `package-lock.json`. There was no existing application
or Git repository in the supplied workspace; the original assets are preserved.

## Project structure

- `src/components/`: navigation, individual sections, project cards, accessible
  native dialogs, and custom video player.
- `src/pages/`: dedicated Home, Video Editing, Websites, About, Contact and project pages.
- `src/components/showcase/`: video and website carousel integrations with fallbacks.
- `src/data/projects.ts`: portfolio collections, website screens and showreel configuration.
- `src/data/video-sources.json`: source filenames, sample titles and poster timings.
- `src/data/video-manifest.json`: generated browser-ready video metadata.
- `src/data/routes.json`: page titles/descriptions shared by runtime and Netlify build.
- `src/data/services.ts`: the five Home service cards and inquiry links.
- `src/data/site.ts`: contact configuration, navigation, and verified social links.
- `src/lib/`: URL/content validation, inquiry formatting, and media helpers.
- `src/hooks/`: responsive preferences and coordinated scroll motion.
- `src/styles/`: typography, design tokens, section layouts, responsive rules.
- `src/vendor/grainient/`, `src/vendor/shape-waves/`, and `src/vendor/carousels/`: official source and licenses.
- `public/media/`: optimized logo, posters, preview video, and social image.
- `scripts/`: asset preparation, production asset selection, canonical SEO.
- `tests/`: content boundary, unsafe URLs, optional media, and inquiry validation.

## Content and ownership

`publishedProjects` contains the owner-approved Kapalini (https://kapalini.com)
and BrewEase (https://brewease.in) websites. Their WebP previews are screenshots
captured from the live sites. Descriptions cover visible features, with no
invented results, project dates, or testimonials.

The separate demonstration collection contains eight supplied videos, labeled
studio demos/editing samples, and AVX’s own website. The Synapse promo is a video
sample, not a commissioned website case study. Website projects and video samples
appear on separate routes; Home contains services and the labeled studio showreel.

The showreel section currently plays the approved demo and explicitly says the
full studio showreel is still forthcoming. Replace the `showreel` object and
the related descriptive copy in `Showreel.tsx` when an approved reel is available.
The About visual is the original AVX logo on pure black, with a border and shadow;
replace `.about-identity` in `Studio.tsx` with a real studio image when available.

## Add or remove projects

Copy this shape into `publishedProjects` in `src/data/projects.ts`. This is a
schema example, not published sample content:

```ts
{
  id: 'unique-id',
  slug: 'unique-readable-slug',
  title: 'Approved project title',
  category: 'Video Editing', // or 'Websites'
  description: 'An accurate overview of the work.',
  thumbnail: '/projects/project-id/poster.webp', // optional
  previewVideo: '/projects/project-id/preview.mp4', // optional, muted short clip
  fullVideoUrl: 'https://your-approved-host.example/film.mp4', // optional
  websiteUrl: 'https://your-approved-project.example/', // optional
  client: 'Confirmed client', // optional; omit if private
  year: 2026, // optional
  services: ['Video editing', 'Motion design'],
  featured: true,
  gallery: [{ src: '/projects/project-id/detail.webp', alt: 'Describe this image' }],
  highlights: ['A factual design or production detail'], // optional
  status: 'published',
}
```

Remove the entry to unpublish it. No layout components need editing.
IDs and slugs must be unique. Project detail links use `/work/the-slug`.
Netlify supports direct page loads and refreshes. Unknown slugs show a 404 view.
Older `/#project/the-slug` and section links are forwarded to the new routes.

Use first-party absolute paths (`/projects/...`) or HTTPS URLs. Unsafe protocols
are discarded. Percent-encode spaces in URLs. Direct MP4/WebM/Ogg URLs use the
custom player; external watch pages open in a safe new tab. Missing posters
render a branded fallback. Missing clients/years/media are simply omitted.

### Uploading media

Create `public/projects/project-id/` for local project files. Prefer 1200–1600px
WebP posters and short, silent 720p/960px previews. Full videos are requested only
when a user opens the player, and preview sources are assigned only on hover.
For large collections, use an approved video CDN rather than checking large files
into the site. Provide direct playable HTTPS files, correct MIME types, and byte
range support; authenticated watch-page links should use external navigation.

All original videos remain untouched in `public/SHOCASE-VIDEOS/`. Newly supplied
editing originals are ignored by Git; the generated MP4s, WebP posters and previews
in `public/media/showcase/` are the production assets. The current collection is
about 25 MB instead of shipping approximately 106 MB of originals. The full files
are loaded only on a request to play, and previews only on hover intent.

To add or replace a supplied sample:

1. Put its original in `public/SHOCASE-VIDEOS/`.
2. Add a unique entry to `src/data/video-sources.json` with truthful title,
   description, services and a `posterTime` in seconds.
3. Run `npm run prepare:showcase` locally (requires `ffmpeg` and `ffprobe` on PATH).
4. Commit the generated manifest and files under `public/media/showcase/`.
   Netlify does **not** need FFmpeg or the original footage.
5. To remove a sample, remove its source entry, regenerate the manifest, and remove
   the corresponding generated assets when no other page references them.

The preparation script produces H.264/AAC MP4 with fast-start, short silent previews,
and WebP stills, preserving portrait versus landscape composition.

**Build asset whitelist:** `scripts/finalize.mjs` copies only approved asset
directories into `dist/`. Add a newly introduced public asset directory there.
Original reference mockups, editable logo sources, and macOS metadata are excluded.

## Logo

`public/LOGO.png` is untouched. `scripts/prepare-assets.mjs` wraps that same artwork
in a cropped SVG with a luminance mask to remove the black matte, then exports
the transparent, optimized `public/media/avx-logo.webp`. The white AVX artwork,
red accent, STUDIOS wordmark, and their original proportions remain intact.
The separate bottom-left descriptor is excluded from the compact mark.

To replace the logo, put an approved transparent asset at
`public/media/avx-logo.webp` and adjust dimensions in `src/components/UI.tsx`.
For a new source with different bounds, update the crop in the preparation script.
The favicon and Apple icon use the original AVX symbol.

Optional asset regeneration (requires `ffmpeg` on your PATH):

```sh
node scripts/prepare-assets.mjs
```

The script retains an existing website screenshot. Replace
`public/media/avx-website.webp` with a current, optimized website screenshot
whenever the visual design materially changes.

## Contact configuration

The confirmed contact is **avxstudios27@gmail.com**, visible on Contact and in the
footer. This is the default even when no environment variables are set.
`VITE_CONTACT_EMAIL` can override it with another valid public address. The five
service cards open an accessible dialog; their inquiry links preselect the service.

Copy `.env.example` to `.env.local` for overrides, or configure hosting variables.
Restart/rebuild after changes. `VITE_` values are public, never secret credentials.

- **Default email mode:** validates the form and opens a prefilled email draft.
  The visitor sends it through their email app. Feedback does not claim delivery.
- **Optional Netlify Forms:** enable and verify form detection on Netlify, set
  `VITE_NETLIFY_FORMS_ENABLED=true`, and redeploy. In production, the form uses
  a native POST, honeypot, validation, and `/thank-you/` success page.
  Development mode keeps the honest email fallback.

The static registration form lives in `public/netlify-forms.html`. In Netlify,
verify `avx-inquiry` is detected and configure notification recipients. Submit a
real test on the deployed domain and verify receipt before advertising inquiries
as live. A successful frontend build cannot verify account-side form setup.
Use email mode if deploying anywhere without Netlify Forms. Spam protection
includes Netlify filtering and a honeypot; configure additional host protection
if actual traffic warrants it. This site contains no API keys or trackers.

Add supplied, verified social links to `site.socials` in `src/data/site.ts`.

## Deploy to Netlify

1. Connect a repository containing this project, or upload the built `dist/`.
2. Build command: `npm run build`. Publish directory: `dist`. Node: 22.
3. Configure your final domain and contact variables.
4. Set `SITE_URL` to the final HTTPS origin if needed. On Netlify, the built-in
   `URL` environment variable is used automatically when `SITE_URL` is absent.
5. Deploy, check image/video URLs, verify the inquiry route, and test submission.

`netlify.toml` supplies security headers and immutable caching for hashed assets.
The site has `/home`, `/video-editing`, `/websites`, `/about`, `/contact`, and
`/work/:slug`. `/` redirects to `/home`; `/work` defaults to `/video-editing`.
`/services` redirects to `/home#services`; there is no separate Services page.
Older `/work/websites` and `/work/video-editing` URLs forward to the category pages. `scripts/seo.mjs` generates `_redirects` and individual
HTML entry documents with page metadata. Exact page rewrites and the `/work/*`
project route support direct loads. Unknown paths use `404.html`; there is no
site-wide catch-all that hides missing assets or form errors.
When hosting elsewhere, configure equivalent history rewrites for these routes.

Canonical URL, absolute Open Graph URL, sitemap, and robots sitemap reference
are generated at build time when the final HTTPS origin is known. No fictitious
domain is emitted locally. The social card and favicon are already included.
The site is **prepared for deployment, not deployed to a Netlify account**.

## Motion and performance

`RouteBackground` supplies one shared atmosphere confined to each page’s upper
section. Its height follows the `data-atmosphere-end` marker as the layout changes;
the remaining page surfaces are solid black. All
routes use the official Grainient with the AVX five-color palette, except
`/websites`, which mounts official Shape Waves in AVX red and unmounts Grainient.
Both are lazy-loaded with DPR capped at 1.5. Their render loops pause when hidden.
Reduced motion and GPU failures use readable static fallbacks, without preventing
navigation or access to projects. Shape Waves uses WebGPU; Grainient uses WebGL.

VGPU is pinned to the React Bits-compatible 0.3.x series. The transitive MCP SDK
is overridden to patched 2.3.1+; it is not included in the browser runtime. Avoid
upgrading VGPU to 0.6 without adapting the upstream renderer’s breaking APIs.

Reduced motion also skips smooth scrolling, hero/scroll reveals, hover playback,
and magnetic movement. The Home services use solid black cards with bold type.
Hover or keyboard focus expands an AVX-red circle from the top-right control and
reveals capabilities. Touch devices show capabilities without requiring hover;
reduced motion makes the state change immediate. All five services
are accessible through keyboard- and touch-operable dialogs.

GSAP owns hero/scroll transforms; Motion owns buttons, cards, and dialog content.
Lenis runs only on pointer-fine devices with normal motion preferences and uses
the GSAP ticker. Native touch scrolling is preserved. Dialogs trap keyboard focus,
restore focus, lock page scrolling, and close on Escape. Opening a dialog pauses
background hover previews. The native cursor is retained.

Body text uses bundled Inter. Display text prefers locally installed Coolvetica,
then Arial Black, then Inter. No desktop Coolvetica font is redistributed. To
deliver Coolvetica consistently across devices, supply a licensed WOFF2 and
update its `@font-face` source in `src/styles/fonts.css`.
The full player and WebGL code are separate chunks.
Animations use transforms/opacity, with scoped cleanup. No analytics or third-party
embeds are installed.

## Verification

- TypeScript and optimized Vite production build pass.
- 28 automated tests cover unsafe URLs, missing optional fields, duplicate
  identifiers, video link classification, inquiry validation, asset packaging,
  generated media availability, route metadata, and Netlify rewrite generation.
- Before the latest black-card/font/header-background revision, browser layouts
  were checked at 1440, 1024, 768, 390, and 320 CSS pixels. No page-width
  overflow was observed.
- Browser interactions checked: category routes, service dialogs and inquiry selection, website details, video playback,
  pause/mute, Escape-to-close, and mobile navigation.
- Official Shape Waves verified rendering in the production build (WebGPU ready),
  with Grainient unmounted on `/websites`.
- The latest visual revision passes TypeScript, tests, and the production build;
  a fresh visual browser check remains outstanding because local browser access
  is disabled in the app settings.
- Earlier QA screenshots are in `output/qa/`; website carousel screenshots are in `public/media/website-*.webp`.

No Lighthouse score or cross-device 60 FPS result is claimed. Netlify delivery,
real email receipt, and testing on physical devices remain launch checks.

## Credits

Official [React Bits Grainient](https://reactbits.dev/backgrounds/grainient), by
David Haz: vendored revision and MIT + Commons Clause license in
`src/vendor/grainient/`. Used as part of this website, not redistributed as a
standalone component product. The [YAAS reference](https://www.yaasmedia.com)
informed the emphasis on typography and work; AVX's layout, copy, service artwork,
and interactions are independently implemented.

## Carousel behavior and configuration

`VideoShowcase` lazily loads the official OGL FlexCarousel near the viewport.
Actual video posters are its textures. Dragging, arrow keys, previous/next buttons
and Enter select/play films; the native video player supplies pause, progress,
volume, fullscreen, and Escape-to-close. “Browse all films” exposes every sample
with short muted hover previews and a dedicated project link. Reduced motion or
WebGL failure uses an accessible horizontal poster list. No stock sample images
from the vendor component are included.

`WebsiteShowcase` uses the official GSAP DepthCarousel with real screenshot cards.
Its controls and indicators select a project. “Visit Website” opens a live site
safely in a new tab; “View project” opens `/work/:slug`. Each project receives one
card. Add approved projects and screenshots in `publishedProjects`; the AVX Home
and About gallery screens stay in `websiteScreens`. Replace screenshots after
redesigns. No retired Services screenshot is shown.

Neither carousel captures vertical wheel scrolling or auto-advances. All full
videos remain unloaded until selected. FlexCarousel caps DPR at 1.5 and pauses
when offscreen. Scoped vendor adaptations and upstream URLs are documented in
`src/vendor/carousels/README.md`.

Shape Waves source and integration notes are in `src/vendor/shape-waves/README.md`.
The official component is from https://reactbits.dev/backgrounds/shape-waves.
