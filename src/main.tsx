import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Flowbite } from 'flowbite-react';

import { persistor, store } from '@/config/store.ts';
import routes from '@/pages/routes.tsx';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Flowbite>
          <RouterProvider router={routes} />
        </Flowbite>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
