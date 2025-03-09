import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

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

export default function Router() {
  const routes = useRoutes([
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
  ]);

  return routes;
}
