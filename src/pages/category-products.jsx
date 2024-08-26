import { Helmet } from 'react-helmet-async';

import { CategoryProducts } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function CategoryProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <CategoryProducts />
    </>
  );
}
