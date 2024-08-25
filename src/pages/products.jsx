import { Helmet } from 'react-helmet-async';

import { ProductDetails } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <ProductDetails />
    </>
  );
}
