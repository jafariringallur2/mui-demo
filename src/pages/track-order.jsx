import { Helmet } from 'react-helmet-async';

import { TrackOrderView } from 'src/sections/order-tracking';

// ----------------------------------------------------------------------

export default function TrackOrderPage() {
  return (
    <>
      <Helmet>
        <title> Track Order</title>
      </Helmet>

      <TrackOrderView />
    </>
  );
}
