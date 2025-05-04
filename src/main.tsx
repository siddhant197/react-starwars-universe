import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
