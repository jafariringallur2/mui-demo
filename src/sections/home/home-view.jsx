import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Iconify from 'src/components/iconify';
import { Box,Button } from '@mui/material';
import LoginDialog from 'src/layouts/dashboard/LoginDialog';
import Categories from './categoreis'
import CarouselComponent from './CarouselComponent';

import ProductList from '../products/product-list';


export default function HomeView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  useEffect(() => {
    const loginParam = searchParams.get('login');
    if (loginParam === '1') {
      setOpenLoginDialog(true);
    }
  }, [searchParams, navigate]);

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  return (
    <>
      <CarouselComponent />
      <Categories />
      <ProductList title='Latest Products' source='home' />
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="error"
          startIcon={<Iconify icon="mdi:shopping" width={20} height={20} />}
          sx={{ width: { xs: '200px', sm: '300px' } }}
          onClick={() => navigate('/products')}
        >
          Explore Products
        </Button>
      </Box>
      {/* Render the LoginDialog component */}
      <LoginDialog open={openLoginDialog} onClose={handleCloseLoginDialog} />
    </>
  );
}
