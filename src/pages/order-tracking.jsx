import { Helmet } from 'react-helmet-async';

import { OrderTrackingView } from 'src/sections/order-tracking';

// ----------------------------------------------------------------------

export default function OrderTrackingPage() {
  return (
    <>
      <Helmet>
        <title> Order Tracking </title>
      </Helmet>

      <OrderTrackingView />
    </>
  );
}
