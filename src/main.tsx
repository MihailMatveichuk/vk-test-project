import { createRoot } from 'react-dom/client';

import App from './app/App.tsx';

import '@/styles/normalize.css';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(<App />);
