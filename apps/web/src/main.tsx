import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { ApolloProvider } from '@soulBase/network/src/config/apollo';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
);
