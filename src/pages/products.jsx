import { Helmet } from 'react-helmet-async';

import { AllProductsPage } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function AllProducts() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <AllProductsPage />
    </>
  );
}
