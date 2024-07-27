import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './main.scss';
import 'virtual:uno.css';
import 'virtual:svg-icons-register';
import App from './App';

const basename = process.env.VITE_APP_BASENAME || '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename={basename}>
      <App />
    </HashRouter>
  </StrictMode>,
);
