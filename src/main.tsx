import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import 'lenis/dist/lenis.css';
import './styles/global.css';
import './styles/sections.css';
import './styles/responsive.css';
import './styles/pages.css';
import './styles/showcase.css';
import App from './App';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
