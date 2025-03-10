import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import useShopNavigate  from 'src/hooks/use-shop-navigate';

const EmptyProduct = () => {
  
  const navigate = useShopNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

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
        alt='emptyproduct'
        src='/assets/no_result.png'
        sx={{
          width: '130px',
          height: '130px',
          borderRadius: 1,
          objectFit: 'cover',
        }}
      />
      <Typography variant="h5" sx={{ marginTop: 2 }}>
      No products found.
      </Typography>
     
      <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Box>
  );
};

export default EmptyProduct;
