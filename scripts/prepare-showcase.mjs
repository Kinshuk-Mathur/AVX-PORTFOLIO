import { execFileSync } from 'node:child_process';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

// Run locally when source footage changes; generated assets are committed for Netlify.
const sources = JSON.parse(await readFile('src/data/video-sources.json', 'utf8'));
const output = 'public/media/showcase';
await mkdir(output, { recursive: true });
const manifest = [];
const run = args => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });
for (const item of sources) {
  const input = join('public/SHOCASE-VIDEOS', item.source);
  const metadata = JSON.parse(execFileSync('ffprobe', ['-v', 'quiet', '-show_streams', '-show_format', '-of', 'json', input], { encoding: 'utf8' }));
  const video = metadata.streams.find(stream => stream.codec_type === 'video');
  const full = join(output, `${item.id}.mp4`);
  const preview = join(output, `${item.id}-preview.mp4`);
  const poster = join(output, `${item.id}.webp`);
  const sourceTime = (await stat(input)).mtimeMs;
  const current = async file => (await stat(file).catch(() => null))?.mtimeMs >= sourceTime;
  // H.264 + AAC, fast-start, even dimensions: Safari, Chrome and mobile compatible.
  const scale = "scale=w='min(1280,iw)':h='min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2";
  if (!await current(full)) run(['-i', input, '-map', '0:v:0', '-map', '0:a:0?', '-vf', scale, '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-y', full]);
  if (!await current(preview)) run(['-ss', '0', '-i', input, '-t', '6', '-an', '-vf', "scale=w='min(640,iw)':h='min(640,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,fps=24", '-c:v', 'libx264', '-preset', 'fast', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-y', preview]);
  if (!await current(poster)) {
    const frame = execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-ss', String(item.posterTime), '-i', input, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', 'pipe:1'], { maxBuffer: 16 * 1024 * 1024 });
    await sharp(frame).resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toFile(poster);
  }
  manifest.push({ ...item, duration: Number(metadata.format.duration), width: video.width, height: video.height,
    thumbnail: `/media/showcase/${item.id}.webp`, previewVideo: `/media/showcase/${item.id}-preview.mp4`, fullVideoUrl: `/media/showcase/${item.id}.mp4` });
  console.info(`Prepared ${item.title}`);
}
await writeFile('src/data/video-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
