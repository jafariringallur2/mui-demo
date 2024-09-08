import { Helmet } from 'react-helmet-async';

import { AccountView } from 'src/sections/account';

// ----------------------------------------------------------------------

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title> Account | Minimal UI </title>
      </Helmet>

      <AccountView />
    </>
  );
}
