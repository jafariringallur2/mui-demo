import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Typography, Box, Skeleton } from '@mui/material';
import { getProducts } from 'src/services/apiService';
import ProductCard from './product-card';

export default function ProductList({ limit, category, source }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const initialLoad = useRef(true);
  const loadingRef = useRef(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || false;

  const loadProducts = useCallback(async () => {
    if (loadingRef.current || !hasMore || (source === 'home' && page > 1)) return;

    setLoading(true);
    loadingRef.current = true;

    try {
      const data = await getProducts(limit, category, page, searchQuery);
      if (data.success) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...data.data.map((product) => ({
            id: product.id,
            name: product.name,
            image: product.image1,
            originalPrice: parseFloat(product.original_price),
            discountedPrice: parseFloat(product.selling_price),
            discount: product.offer,
          })),
        ]);
        setTitle(data.head);
        if (data.data.length < limit) {
          setHasMore(false);
        }
      } else {
        setError('Failed to fetch products');
        setHasMore(false);
      }
    } catch (err) {
      setError('An error occurred');
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, limit, category, page, source, searchQuery]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery, category]);

  useEffect(() => {
    if (page === 1 && hasMore) {
      loadProducts();
    }
  }, [page, hasMore, loadProducts]);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 100;

      if (scrollPosition >= threshold) {
        loadProducts();
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadProducts]);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      loadProducts();
    }
  }, [category, limit, loadProducts]);

  if (loading && page === 1) {
    return (
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
  }

  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((_, index) => (
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
      )}
    </Box>
  );
}

ProductList.propTypes = {
  limit: PropTypes.number,
  category: PropTypes.string,
  source: PropTypes.string,
};

ProductList.defaultProps = {
  limit: 8,
  category: null,
  source: 'none',
};
