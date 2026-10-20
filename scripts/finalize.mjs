import { cp } from 'node:fs/promises';
import { basename } from 'node:path';

// Exclude reference artwork, editable logo source, and macOS AppleDouble metadata.
for (const path of ['media', 'projects', 'SHOCASE-VIDEOS', 'netlify-forms.html', 'thank-you', '404.html']) {
  await cp(`public/${path}`, `dist/${path}`, {
    recursive: true,
    filter: source => !basename(source).startsWith('.') && !source.endsWith('avx-logo-source.svg'),
  });
}
