import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './pages/routes.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from './config/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Flowbite } from 'flowbite-react';

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
