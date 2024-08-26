import React from 'react';

import Iconify from 'src/components/iconify';
import { Box,Button } from '@mui/material';
import Categories from './categoreis'
import CarouselComponent from './CarouselComponent';

import ProductList from '../products/product-list';


export default function HomeView() {
  return (
    <div>
      <CarouselComponent />
      <Categories />
      <ProductList title='Latest Products' />
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="error"
          href="/products"
          startIcon={<Iconify icon="mdi:shopping" width={20} height={20} />}
          sx={{ width: {xs:'200px',sm:'300px'} }}
        >
          Explore Products
        </Button>
      </Box>
    </div>
  );
}
