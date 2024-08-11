import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress,Typography,Box,Button } from '@mui/material';
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
            'BusinessUrl': 'kiswa-white-gallery',
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

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ padding: 2 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h5" fontWeight="bold">
        Latest Products
      </Typography>
      <Button variant="text" sx={{ color: 'red' }}>
        See All
      </Button>
    </Box>
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
    </Box>
  );
};

export default ProductList;
