import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Button, Box, Card, CardContent, Typography, Divider, CircularProgress } from '@mui/material';
import Iconify from 'src/components/iconify';
import { getOrderDetails } from 'src/services/apiService';

const icons = {
  0: 'mdi:package-variant-closed', // Order Received
  1: 'mdi:check-circle-outline', // Order Accepted
  2: 'mdi:cancel', // Rejected
  3: 'mdi:truck', // Order Shipped
  4: 'mdi:home-outline', // Order Delivered
};
const colors = {
  0: 'green', // Order Received
  1: 'green', // Order Accepted
  2: 'red', // Rejected
  3: 'green', // Order Shipped
  4: 'green', // Order Delivered
};

const ensureStatuses = (old_statements) => {
  const requiredStatuses = {
    0: 'Order Received',
    1: 'Order Accepted',
    3: 'Order Shipped',
    4: 'Order Delivered',
  };

  const updatedStatements = [...old_statements];

  Object.keys(requiredStatuses).forEach((statement_status) => {
    if (!old_statements.some((item) => item.status === statement_status.toString())) {
      updatedStatements.push({
        status: statement_status.toString(),
        status_description: requiredStatuses[statement_status],
        time: '-',
      });
    }
  });

  // updatedStatements.sort((a, b) => parseInt(a.status, 10) - parseInt(b.status, 10));
  return updatedStatements;
};
const OrderTrackingView = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(id);
        setOrderDetails(response.data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleTrackAnother = () => {
    navigate('/track-order');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      </Box>
    );
  }


  if (error || !orderDetails) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          alt="emptyproduct"
          src="assets/no_result.png"
          sx={{
            width: '130px',
            height: '130px',
            borderRadius: 1,
            objectFit: 'cover',
          }}
        />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          No order found.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 3 }}
          onClick={handleTrackAnother}
        >
          Track another order
        </Button>
      </Box>
    );
  }

  const { items, item_total, coupon_applied_amount, total_price, statements, address, status } =
    orderDetails;

  const customerAddress = {
    name: address.customer_name,
    phone: address.customer_phone,
    address: address.customer_address,
    place: address.customer_place,
    pin: address.customer_pincode,
    city: address.customer_city,
  };

  let status_index = status;
  if (status === '2') {
    status_index = statements.length - 1;
  } else if (status === '3') {
    status_index = 2;
  } else if (status === '4') {
    status_index = 3;
  }
  const processedStatements = ensureStatuses(statements);

  return (
    <Card sx={{ maxWidth: 800, margin: '20px auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Order Details
        </Typography>

        {/* Timeline */}
        <Box
          sx={{
            display: { xs: 'block', md: 'flex' },
            alignItems: { md: 'center' },
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: 3,
          }}
        >
          {processedStatements.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: { xs: 'center', md: 'center' },
                textAlign: { xs: 'center', md: 'center' },
                position: 'relative',
                flex: { md: 1 },
                zIndex: 1,
                marginBottom: { xs: 2, md: 0 },
              }}
            >
              {/* Vertical Line for Mobile */}
              {index > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: '-40%', md: '25%' },
                    left: { xs: '7%', md: '-39%' },
                    right: { xs: '0%', md: '50%' },
                    width: { xs: '4px', md: 'auto' },
                    height: { xs: '20px', md: '4px' },
                    backgroundColor: index <= status_index ? colors[item.status] : '#ddd',
                    transform: { xs: 'translateX(-50%)', md: 'translateY(-50%)' },
                    zIndex: -10,
                  }}
                />
              )}

              {/* Icon */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: index <= status_index ? colors[item.status] : '#ddd',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: { xs: '0', md: '0 auto' },
                }}
              >
                <Iconify icon={icons[item.status]} width={24} color="#fff" />
              </Box>

              {/* Status and Time */}
              <Box sx={{ marginLeft: { xs: 2, md: 0 }, mt: { xs: 0, md: 1 } }}>
                <Typography variant="body2">{item.status_description}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ margin: '20px 0' }} />

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Shipping Address
        </Typography>
        <Box
          sx={{
            padding: 2,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {customerAddress.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Phone: {customerAddress.phone}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Address: {customerAddress.address}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Place: {customerAddress.place}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            PIN: {customerAddress.pin}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            City: {customerAddress.city}
          </Typography>
        </Box>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Products */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>
          <Box>
            {items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { sm: 'center' },
                  paddingY: 1.5,
                  borderBottom: '1px solid #ddd',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Box sx={{ width: '100px', marginRight: 2 }}>
                  <img
                    src={JSON.parse(item.product.image)[0]} // Assuming image is a JSON array
                    alt={item.product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
                <Box sx={{ flex: 2 }}>
                  <Typography>{item.product.name}</Typography>
                  <Typography>Qty: {item.qty}</Typography>
                  {item.variant_options && item.variant_options.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {item.variant_options.map((variant, index) => (
                        <Typography key={index}>
                          {variant.option}: {variant.value}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
                <Typography>₹{parseFloat(item.price).toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Total Price Details */}
        <Box
          sx={{
            padding: 2,
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            mt: 3,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Price Details
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography variant="body2">Items Total:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              ₹{item_total}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography variant="body2">Coupon Applied:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'green' }}>
              - ₹{coupon_applied_amount}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 2,
              borderTop: '1px solid #ddd',
              paddingTop: 1,
            }}
          >
            <Typography variant="body2">Grand Total:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              ₹{total_price}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderTrackingView;
