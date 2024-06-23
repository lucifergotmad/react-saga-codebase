import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/app/store.ts';
import { ThemeProvider } from '@/shared';
import { Toaster } from '@/shared/components/design/toaster';
import routes from '@/app/routes.tsx';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={routes} />
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
