import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useParams  } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import { setBusinessUrl } from 'src/singletons/businessUrlSingleton';

export const IndexPage = lazy(() => import('src/pages/app'));
export const CategoriesPage = lazy(() => import('src/pages/categories'));
export const CategoryProductsPage = lazy(() => import('src/pages/category-products'));
export const AllProducts = lazy(() => import('src/pages/products'));
export const CartPage = lazy(() => import('src/pages/cart'));
export const AccountPage = lazy(() => import('src/pages/account'));
export const ProductDetailsPage = lazy(() => import('src/pages/ProductDetails'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const OrderTrackingPage = lazy(() => import('src/pages/order-tracking'));
export const TrackOrderPage = lazy(() => import('src/pages/track-order'));

// ----------------------------------------------------------------------

const isCustomDomain = import.meta.env.VITE_IS_CUSTOM_DOMAIN === 'true';
const RESERVED_WORDS = ['products', 'cart', 'account', 'categories', 'order', 'track-order', '404'];

function ShopUsernameValidator() {
  const { shopUsername } = useParams();


  if (RESERVED_WORDS.includes(shopUsername)) {
    return <Navigate to="/404" replace />;
  }
 
  return (
    <DashboardLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  );
}

function BusinessUrlUpdater(){
  const { shopUsername } = useParams();
  if (!isCustomDomain) {
    setBusinessUrl(shopUsername);
  } else {
    setBusinessUrl(import.meta.env.VITE_BUSINESS_URL);
  }
}



export default function Router() {

  const routes = useRoutes(
    isCustomDomain
      ? [
          // Routes for custom domain
          {
            element: (
              <DashboardLayout>
                <Suspense>
                  <Outlet />
                </Suspense>
              </DashboardLayout>
            ),
            children: [
              { element: <IndexPage />, index: true },
              { path: 'categories', element: <CategoriesPage /> },
              { path: 'categories/:id', element: <CategoryProductsPage /> },
              { path: 'products', element: <AllProducts /> },
              { path: 'product/:id', element: <ProductDetailsPage /> },
              { path: 'cart', element: <CartPage /> },
              { path: 'account', element: <AccountPage /> },
            ],
          },
          {
            path: '404',
            element: <Page404 />,
          },
          {
            path: 'order/:id',
            element: <OrderTrackingPage />,
          },
          {
            path: 'track-order',
            element: <TrackOrderPage />,
          },
          {
            path: '*',
            element: <Navigate to="/404" replace />,
          },
        ]
      : [
          {
            path: ':shopUsername',
            element: (
              <>
              <ShopUsernameValidator />
              <BusinessUrlUpdater />
              </>
            ),
            children: [
              { element: <IndexPage />, index: true },
              { path: 'categories', element: <CategoriesPage /> },
              { path: 'categories/:id', element: <CategoryProductsPage /> },
              { path: 'products', element: <AllProducts /> },
              { path: 'product/:id', element: <ProductDetailsPage /> },
              { path: 'cart', element: <CartPage /> },
              { path: 'account', element: <AccountPage /> },
            ],
          },
          {
            path: ':shopUsername/order/:id',
            element: (
              <>
              <BusinessUrlUpdater />
              <OrderTrackingPage />
              </>
            ),
          },
          {
            path: ':shopUsername/track-order',
            element: <TrackOrderPage />,
          },
          {
            path: '404',
            element: <Page404 />,
          },
          {
            path: '*',
            element: <Navigate to="/404" replace />,
          },
        ]
  );

  return routes;
}
