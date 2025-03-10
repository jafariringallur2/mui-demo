import React, { useState } from 'react';
import useShopNavigate  from 'src/hooks/use-shop-navigate';
import { Card, TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import useHeaderData from 'src/hooks/useHeaderData';




const TrackOrderView = () => {
  const [orderId, setOrderId] = useState('');
  const { headerData, headerLoading } = useHeaderData();
  const navigate = useShopNavigate();

  const { businessInfo } = headerData || {};

  const handleTrackOrder = () => {
    if (orderId.trim()) {
      navigate(`/order/${orderId}`);
    }
  };

  if (headerLoading) {
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

  return (
    <>
      <Helmet>
        <title> Track Order | {businessInfo.business_name} </title>
      </Helmet>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: 2,
        }}
      >
  
        {
          businessInfo?.business_logo && (
            <Box sx={{ mb: 4 }}  onClick={() => navigate('/')}>
              <img
                src={businessInfo.business_logo}
                alt="Company Logo"
                style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
              />
          </Box>
          )
          }

        <Card
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Track Your Order
          </Typography>
          <TextField
            fullWidth
            label="Order Number"
            variant="outlined"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleTrackOrder}
            disabled={!orderId.trim()}
          >
            Track
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default TrackOrderView;