import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@soulBase/ui/src/index.css';
import { ApolloProvider } from '@soulBase/network/src/config/apollo';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
