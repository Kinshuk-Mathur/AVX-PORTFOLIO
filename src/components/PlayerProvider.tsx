import { createContext, lazy, Suspense, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from './Modal';

const VideoPlayer = lazy(() => import('./VideoPlayer'));
export type Film = { title: string; src: string; poster?: string };
const PlayerContext = createContext<(film: Film) => void>(() => {});

export function PlayerProvider({ children }: PropsWithChildren) {
  const [film, setFilm] = useState<Film | null>(null);
  const { pathname } = useLocation();
  useEffect(() => { setFilm(null); }, [pathname]);
  return <PlayerContext.Provider value={setFilm}>
    {children}
    {film && <Suspense fallback={<Modal title="Loading player" onClose={() => setFilm(null)}><p className="loading-player">Preparing your film…</p></Modal>}>
      <VideoPlayer {...film} onClose={() => setFilm(null)} />
    </Suspense>}
  </PlayerContext.Provider>;
}

export const usePlayer = () => useContext(PlayerContext);
