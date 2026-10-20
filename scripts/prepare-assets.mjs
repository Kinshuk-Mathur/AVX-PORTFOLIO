import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

await mkdir('public/media', { recursive: true });
const original = await readFile('public/LOGO.png');
const embedded = `data:image/png;base64,${original.toString('base64')}`;
// An SVG mask removes the black matte without redrawing/recoloring the supplied art.
// The original remains untouched. The viewBox crops only the surrounding empty area
// and the separate creative-production descriptor; the AVX/STUDIOS identity is intact.
const matteFilter = `<filter id="remove-black" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="20 20 20 0 -1 20 20 20 0 -1 20 20 20 0 -1 0 0 0 1 0"/></filter><mask id="matte" maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="1280"><image width="1280" height="1280" href="${embedded}" filter="url(#remove-black)"/></mask>`;
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="420" viewBox="90 395 1080 420"><defs>${matteFilter}</defs><image width="1280" height="1280" href="${embedded}" mask="url(#matte)"/></svg>`;
await writeFile('public/media/avx-logo-source.svg', logo);
await sharp(Buffer.from(logo)).resize({ width: 600 }).webp({ lossless: true }).toFile('public/media/avx-logo.webp');

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" rx="44" fill="#000"/><svg x="22" y="90" width="212" height="70" viewBox="90 395 1080 330"><defs>${matteFilter}</defs><image width="1280" height="1280" href="${embedded}" mask="url(#matte)"/></svg></svg>`;
await sharp(Buffer.from(icon)).resize(64, 64).png().toFile('public/media/favicon.png');
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile('public/media/apple-touch-icon.png');

execFileSync('ffmpeg', ['-hide_banner','-loglevel','error','-ss','5.4','-i','public/SHOCASE-VIDEOS/AVX SAAS V1.mp4','-frames:v','1','-vf','scale=1600:-1','/tmp/avx-demo-poster.png','-y']);
await sharp('/tmp/avx-demo-poster.png').webp({ quality: 82 }).toFile('public/media/avx-demo-poster.webp');

// Temporary project preview from the owner's visual concept, replaced with an actual
// site screenshot during QA. Re-running this script leaves the verified preview intact.
try { await readFile('public/media/avx-website.webp'); }
catch {
  await sharp('public/AVX Studios_ Make Every Frame Count.png')
    .extract({ left: 0, top: 0, width: 726, height: 530 })
    .resize({ width: 1200 }).webp({ quality: 85 }).toFile('public/media/avx-website.webp');
}
const logoB64 = (await readFile('public/media/avx-logo.webp')).toString('base64');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="red"><stop stop-color="#a60025"/><stop offset="1" stop-color="#080508"/></radialGradient></defs><rect width="1200" height="630" fill="#080508"/><ellipse cx="1050" cy="250" rx="700" ry="500" fill="url(#red)"/><image href="data:image/webp;base64,${logoB64}" x="66" y="40" width="130" height="50"/><g fill="white" font-family="Arial,sans-serif" font-weight="bold" font-size="108" letter-spacing="-6"><text x="60" y="232">ART.</text><text x="60" y="341">VISUAL.</text><text x="60" y="450">EXPERIENCE<tspan fill="#ff002c">.</tspan></text></g><text x="66" y="565" font-family="Arial,sans-serif" font-size="15" fill="#c5b8c7" letter-spacing="3">AVX STUDIOS — CREATIVE PRODUCTION</text></svg>`;
await sharp(Buffer.from(og)).png().toFile('public/media/og-avx.png');
console.log('Brand assets and optimized video poster prepared.');
