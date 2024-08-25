import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider  } from './context/CartContext';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
    <CartProvider>
      <Suspense>
        <App />
      </Suspense>
      </CartProvider>
    </BrowserRouter>
  </HelmetProvider>
);
