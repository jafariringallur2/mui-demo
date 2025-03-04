import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom"; 

const EmptyCart = () => {
  
  const navigate = useNavigate();

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
      {/* <EmptyCartIcon width={150} height={150} /> */}
     
      <Box
        component="img"
        alt='emptycart'
        src='assets/empty_cart.png'
        sx={{
          width: '130px',
          height: '130px',
          borderRadius: 1,
          objectFit: 'cover',
        }}
      />
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Your cart is empty
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        Looks like you havent made your choice yet..
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Box>
  );
};

export default EmptyCart;
