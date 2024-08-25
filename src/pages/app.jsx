import { Helmet } from 'react-helmet-async';

import { HomeView } from 'src/sections/home';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <HomeView />
    </>
  );
}
