import { useRef } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PlayerProvider } from './components/PlayerProvider';
import { RouteEffects } from './components/RouteEffects';
import { HomePage, AboutPage, ServicesPage, ContactPage, WorkPage, NotFoundPage } from './pages/StudioPages';
import { ProjectPage } from './pages/ProjectPage';
import { useScrollMotion } from './hooks/useScrollMotion';

function Layout() {
  const root = useRef<HTMLDivElement>(null);
  useScrollMotion(root);
  return <div ref={root} id="top">
    <RouteEffects />
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main" tabIndex={-1}><Outlet /></main>
    <Footer />
  </div>;
}

function HomeRedirect() {
  const { hash } = useLocation();
  return <Navigate to={`/home${hash}`} replace />;
}

export default function App() {
  return <BrowserRouter><MotionConfig reducedMotion="user"><PlayerProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomeRedirect />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </PlayerProvider></MotionConfig></BrowserRouter>;
}
