import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const CategoryProductsPage = lazy(() => import('src/pages/category-products'));
export const AllProducts = lazy(() => import('src/pages/products'));
export const CartPage = lazy(() => import('src/pages/cart'));
export const ProductDetailsPage = lazy(() => import('src/pages/ProductDetails'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

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
        { path: 'categories/:id', element: <CategoryProductsPage /> },
        { path: 'products', element: <AllProducts /> },
        { path: 'product/:id', element: <ProductDetailsPage /> },
        { path: 'cart', element: <CartPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
