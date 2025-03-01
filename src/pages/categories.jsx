import { Helmet } from 'react-helmet-async';

import { CategoriesView } from 'src/sections/categories';

// ----------------------------------------------------------------------

export default function CategoriesPage() {
  return (
    <>
      <Helmet>
        <title> Categories | Minimal UI </title>
      </Helmet>

      <CategoriesView />
    </>
  );
}
