import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import './index.css';
import { Privacy } from './components/Privacy.tsx';
import { I18nProvider } from './i18n.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <I18nProvider page="privacy">
      <Privacy />
    </I18nProvider>
  </StrictMode>
);
