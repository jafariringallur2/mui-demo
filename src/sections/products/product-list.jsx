import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Box, Skeleton } from '@mui/material';
import { getProducts } from 'src/services/apiService';
import ProductCard from './product-card';

export default function ProductList({limit, category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(limit, category);
        if (data.success) {
          setProducts(data.data.map(product => ({
            id: product.id,
            name: product.name,
            image: product.image1,
            originalPrice: parseFloat(product.original_price),
            discountedPrice: parseFloat(product.selling_price),
            discount: product.offer,
          })));
          setTitle(`Exclusive ${data.head} Collection`);
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
  }, [limit, category]);

  if (loading) return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          {title}
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
          {title}
        </Typography>
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

ProductList.propTypes = {
  limit: PropTypes.number,
  category: PropTypes.string,
};

ProductList.defaultProps = {
  limit: 8,
  category: null,
};
