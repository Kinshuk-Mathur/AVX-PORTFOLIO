import { useEffect, useRef, useState } from 'react';
import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '../lib/content';
import { Modal } from './Modal';

type Props = { title: string; src: string; poster?: string; onClose: () => void };

export default function VideoPlayer({ title, src, poster, onClose }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const media = video.current;
    if (media) media.volume = 0.8;
    const syncDuration = () => {
      if (media && Number.isFinite(media.duration)) setDuration(media.duration);
    };
    syncDuration();
    media?.addEventListener('durationchange', syncDuration);
    media?.addEventListener('loadedmetadata', syncDuration);
    const pauseWhenHidden = () => { if (document.hidden) media?.pause(); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      media?.pause();
      media?.removeEventListener('durationchange', syncDuration);
      media?.removeEventListener('loadedmetadata', syncDuration);
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, []);

  const toggle = async () => {
    const media = video.current;
    if (!media) return;
    if (media.paused) {
      try { await media.play(); setError(''); }
      catch { setError('This video could not be played. Try opening the video file directly.'); }
    } else media.pause();
  };

  return <Modal title={title} onClose={onClose} className="video-modal">
    <div className="video-player" ref={frame}>
      <div className="player-picture">
        <video ref={video} src={src} poster={poster} playsInline preload="metadata"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onTimeUpdate={() => setTime(video.current?.currentTime ?? 0)}
          onDurationChange={() => setDuration(video.current?.duration ?? 0)}
          onLoadedMetadata={() => setDuration(video.current?.duration ?? 0)}
          onError={() => setError('The video is unavailable right now. Please try again later.')}
          onEnded={() => setPlaying(false)} />
        {!playing && !error && <button className="player-center" onClick={toggle} aria-label="Play video"><Play fill="currentColor" size={32} /></button>}
      </div>
      <div className="player-controls">
        <button className="icon-button" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'} disabled={Boolean(error)}>{playing ? <Pause size={19} /> : <Play size={19} />}</button>
        <span className="player-time">{formatTime(time)}</span>
        <input className="player-progress" type="range" min={0} max={Number.isFinite(duration) ? duration : 0} step={0.1} value={time} aria-label="Video progress"
          aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
          onChange={event => { if (video.current) { video.current.currentTime = Number(event.target.value); setTime(Number(event.target.value)); } }} />
        <span className="player-time">{formatTime(duration)}</span>
        <button className="icon-button" aria-label={muted ? 'Unmute video' : 'Mute video'} onClick={() => { if (video.current) video.current.muted = !muted; setMuted(!muted); }}>{muted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
        <input className="player-volume" type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume} aria-label="Volume"
          onChange={event => {
            const next = Number(event.target.value);
            if (video.current) { video.current.volume = next; video.current.muted = next === 0; }
            setVolume(next); setMuted(next === 0);
          }} />
        <button className="icon-button" aria-label="Enter fullscreen" onClick={() => frame.current?.requestFullscreen?.().catch(() => setError('Fullscreen is not supported in this browser. The player remains available here.'))}><Maximize size={19} /></button>
      </div>
      {error && <p className="player-error" role="status">{error} <a href={src} target="_blank" rel="noopener noreferrer">Open video ↗</a></p>}
    </div>
    <p className="player-caption">AVX STUDIO DEMO <span>Sound starts only when you press play.</span></p>
  </Modal>;
}
