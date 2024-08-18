import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Skeleton,Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import ProductCard from './product-card'; // Adjust path if needed

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://web.botire.in/api/products?limit=8', {
          headers: {
            'Accept': 'application/json',
            'BusinessUrl': 'boat',
          },
        });
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.map(product => ({
            id: product.id,
            name: product.name,
            image: product.image1, // You can choose image1 or image2
            originalPrice: parseFloat(product.original_price),
            discountedPrice: parseFloat(product.selling_price),
            discount: product.offer,
          })));
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Latest Products
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
            <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
              <Box sx={{ padding: 2 }}>
                <Skeleton variant="text" sx={{ mb: 1, fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ mb: 1, fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 2, mt: 2 }} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Latest Products
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="error"
          href="/products"
          startIcon={<Iconify icon="mdi:shopping" width={20} height={20} />}
          sx={{ width: {xs:'200px',sm:'300px'} }} // Adjust width as needed
        >
          Explore Products
        </Button>
      </Box>
    </Box>
  );
};

export default ProductList;
