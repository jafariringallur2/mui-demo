import React from 'react';
import { useNavigate } from 'react-router-dom';

import Iconify from 'src/components/iconify';
import { Box,Button } from '@mui/material';
import Categories from './categoreis'
import CarouselComponent from './CarouselComponent';

import ProductList from '../products/product-list';


export default function HomeView() {
  const navigate = useNavigate();

  return (
    <div>
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
    </div>
  );
}
