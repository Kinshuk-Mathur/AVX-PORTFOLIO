# AVX Studios

A custom React + TypeScript creative studio portfolio, built with Vite, Tailwind CSS,
GSAP/ScrollTrigger, Lenis, Motion, Lucide, and the **official React Bits Grainient**.

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
- `src/data/projects.ts`: all portfolio content and the showreel configuration.
- `src/data/site.ts`: contact configuration, navigation, and verified social links.
- `src/lib/`: URL/content validation, inquiry formatting, and media helpers.
- `src/hooks/`: responsive preferences and coordinated scroll motion.
- `src/styles/`: typography, design tokens, section layouts, responsive rules.
- `src/vendor/grainient/`: official source, attribution, and original license.
- `public/media/`: optimized logo, posters, preview video, and social image.
- `scripts/`: asset preparation, production asset selection, canonical SEO.
- `tests/`: content boundary, unsafe URLs, optional media, and inquiry validation.

## Content and ownership

`publishedProjects` starts empty. Only put actual, approved projects in that array.
The public gallery currently shows a separately labeled **studio collection**:

1. The supplied `AVX SAAS V1.mp4`, approved by the owner as a studio demo.
2. This AVX website, a self-initiated studio project, illustrated with its actual screenshot.

There are no fabricated clients, testimonials, outcomes, awards, biographies,
Kapalini Ghee, or Synapse case studies. When published projects are added, the
gallery automatically prioritizes that collection. Demo entries stay separate.

The showreel section currently plays the approved demo and explicitly says the
full studio showreel is still forthcoming. Replace the `showreel` object and
the related descriptive copy in `Showreel.tsx` when an approved reel is available.
The About visual is an original brand panel, not a purported team photograph;
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
IDs and slugs must be unique. Project detail links use `/#project/the-slug`, so
they load directly on a static host without a routing server. Unknown project
slugs get an accessible not-found dialog.

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

The supplied source video is preserved at its original path. Its optimized
preview is approximately 335 KB. Neither full videos nor preview MP4s are
downloaded on the initial page load.

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

## Contact configuration — required before launch

No AVX email, phone number, or social profile was supplied. Nothing has been
invented. Copy `.env.example` to `.env.local` for local configuration, or add
these variables to the hosting environment. Restart/rebuild after changes.
`VITE_` values are public client configuration, never secret credentials.

The form has three explicit modes:

1. **No destination configured:** validates and downloads a plain-text project
   brief. It clearly says nothing is submitted. Data is not stored or sent.
2. **Email fallback:** set `VITE_CONTACT_EMAIL` to a confirmed AVX email address.
   The form opens an encoded email draft. The visitor reviews and sends it from
   their email app. Feedback never claims the email has been delivered.
3. **Netlify Forms:** enable and verify form detection on Netlify, then set
   `VITE_NETLIFY_FORMS_ENABLED=true` and redeploy. In production the form performs
   a native POST with a honeypot, validation, and the `/thank-you/` success page.
   Development mode never pretends to submit to Netlify.

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
Only the homepage and hash-linked project details are application routes; static
`404.html` handles unknown paths. There is no broad catch-all redirect masking
missing video files or form errors.

Canonical URL, absolute Open Graph URL, sitemap, and robots sitemap reference
are generated at build time when the final HTTPS origin is known. No fictitious
domain is emitted locally. The social card and favicon are already included.
The site is **prepared for deployment, not deployed to a Netlify account**.

## Motion and performance

The Grainient shader is lazily loaded and mounted near the viewport, paused when
hidden/offscreen, and capped at 1.5 device-pixel ratio. Its integration catches
component load failures, hides unsuccessful WebGL initialization, and falls back
to a static AVX gradient. Reduced motion skips the WebGL effect, smooth scrolling,
hero animation, scroll reveals, hover playback, and magnetic movement.

GSAP owns hero/scroll transforms; Motion owns buttons, cards, and dialog content.
Lenis runs only on pointer-fine devices with normal motion preferences and uses
the GSAP ticker. Native touch scrolling is preserved. Dialogs trap keyboard focus,
restore focus, lock page scrolling, and close on Escape. Opening a dialog pauses
background hover previews. The native cursor is retained.

Fonts are bundled locally. The full player and WebGL code are separate chunks.
Animations use transforms/opacity, with scoped cleanup. No analytics or third-party
embeds are installed.

## Verification

- TypeScript and optimized Vite production build pass.
- 14 automated tests cover unsafe URLs, missing optional fields, duplicate
  identifiers, video link classification, durations, and inquiry validation.
- Browser layouts checked at 1440, 1024, 768, 390, and 320 CSS pixels. No page-width
  overflow was observed.
- Browser interactions checked: work filters, website details, video playback,
  pause/mute, Escape-to-close, and mobile navigation.
- Browser testing exposed and corrected StrictMode WebGL cleanup and media
  metadata timing issues.
- QA screenshots are in `output/qa/`.

No Lighthouse score or cross-device 60 FPS result is claimed. Netlify delivery,
real email receipt, and testing on physical devices remain launch checks.

## Credits

Official [React Bits Grainient](https://reactbits.dev/backgrounds/grainient), by
David Haz: vendored revision and MIT + Commons Clause license in
`src/vendor/grainient/`. Used as part of this website, not redistributed as a
standalone component product. The [YAAS reference](https://www.yaasmedia.com)
informed the emphasis on typography and work; AVX's layout, copy, service artwork,
and interactions are independently implemented.
