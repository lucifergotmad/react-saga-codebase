import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/config/store.ts';
import routes from '@/pages/routes.tsx';
import '@/index.css';
import { ThemeProvider } from './shared/components/theme-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={routes} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
