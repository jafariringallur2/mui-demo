import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Skeleton,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
  Portal,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { fCurrency } from 'src/utils/format-number';
import { useCart } from 'src/context/CartContext';
import { getProductDetails } from 'src/services/apiService';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { addToCart } = useCart();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setLoading(false)
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleThumbnailClick(index);
    }
  };

  const handleAddToCart = async () => {
    setLoadingCart(true);
    try {
      await addToCart(product.hashid, quantity);
      setSnackbarOpen(true); // Show the snackbar on successful add
    } finally {
      setLoadingCart(false);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box
        padding={2}
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        bgcolor="background.paper"
        borderRadius={2}
        boxShadow={3}
      >
        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} flex={1}>
          {isDesktop && (
            <Grid container direction="column" spacing={2} marginRight={2} width="20%">
              <Grid item>
                <Skeleton variant="rectangular" width="100%" height={80} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" width="100%" height={80} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" width="100%" height={80} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" width="100%" height={80} />
              </Grid>
            </Grid>
          )}

          <Box flex={1} position="relative">
            <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2 }} />

            {!isDesktop && (
              <Grid container spacing={2} marginTop={1}>
                <Grid item xs={3}>
                  <Skeleton variant="rectangular" width="100%" height={80} />
                </Grid>
                <Grid item xs={3}>
                  <Skeleton variant="rectangular" width="100%" height={80} />
                </Grid>
                <Grid item xs={3}>
                  <Skeleton variant="rectangular" width="100%" height={80} />
                </Grid>
                <Grid item xs={3}>
                  <Skeleton variant="rectangular" width="100%" height={80} />
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>

        <Box flex={1} marginTop={{ xs: 2, lg: 0 }} marginLeft={{ lg: 2 }}>
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton variant="text" width="10%" marginTop={1} />
          <Skeleton variant="text" width="40%" marginTop={2} />

          <Box marginTop={1}>
            <Skeleton variant="text" width="10%" />
          </Box>

          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />

          <Box marginTop={8}>
            <Skeleton variant="text" width="80%" height={60} />
            <Skeleton variant="text" width="80%" height={60} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (!product) {
    return <Typography>Error loading product details.</Typography>;
  }

  return (
    <Box
      padding={2}
      display="flex"
      flexDirection={{ xs: 'column', lg: 'row' }}
      bgcolor="background.paper"
      borderRadius={2}
      boxShadow={3}
    >
      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} flex={1}>
        {isDesktop && (
          <Grid container direction="column" spacing={2} marginRight={2} width="20%">
            {product.images.map((image, index) => (
              <Grid item key={index}>
                <Button
                  onClick={() => handleThumbnailClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  sx={{
                    padding: 0,
                    border: currentImageIndex === index ? '2px solid #000' : 'none',
                  }}
                  aria-label={`Thumbnail ${index + 1}`}
                  tabIndex={0}
                >
                  <Box
                    component="img"
                    alt={`Thumbnail ${index + 1}`}
                    src={image}
                    sx={{
                      width: '100%',
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
        <Box flex={1} position="relative">
          <Box
            component="img"
            alt={product.name}
            src={product.images[currentImageIndex]}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              objectFit: 'cover',
              position: 'relative',
            }}
          />
          <IconButton
            onClick={handlePrevImage}
            onKeyDown={(e) => e.key === 'Enter' && handlePrevImage()}
            sx={{ position: 'absolute', top: { sm: '45%', xs: '35%' }, left: 10, zIndex: 1 }}
            aria-label="Previous image"
          >
            <Iconify width={24} icon="mdi:chevron-left" />
          </IconButton>
          <IconButton
            onClick={handleNextImage}
            onKeyDown={(e) => e.key === 'Enter' && handleNextImage()}
            sx={{ position: 'absolute', top: { sm: '45%', xs: '35%' }, right: 10, zIndex: 1 }}
            aria-label="Next image"
          >
            <Iconify width={24} icon="mdi:chevron-right" />
          </IconButton>
          {!isDesktop && (
            <Grid container spacing={2} marginTop={1}>
              {product.images.map((image, index) => (
                <Grid item key={index} xs={3}>
                  <Button
                    onClick={() => handleThumbnailClick(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    sx={{
                      padding: 0,
                      border: currentImageIndex === index ? '2px solid #000' : 'none',
                    }}
                    aria-label={`Thumbnail ${index + 1}`}
                    tabIndex={0}
                  >
                    <Box
                      component="img"
                      alt={`Thumbnail ${index + 1}`}
                      src={image}
                      sx={{
                        width: '100%',
                        borderRadius: 1,
                        objectFit: 'cover',
                      }}
                    />
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      <Box flex={1} marginTop={{ xs: 2, lg: 0 }} marginLeft={{ lg: 2 }}>
        <Typography variant="h3" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color={product.in_stock === '1' ? 'success.main' : 'error.main'}
        >
          {product.in_stock === '1' ? 'In Stock' : 'Out of Stock'}
        </Typography>

        <Typography variant="h6" color="primary" marginTop={1}>
          {fCurrency(product.show_price.selling_price)}
          &nbsp;
          {product.show_price.original_price && (
            <Typography
              component="span"
              variant="subtitle2"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {fCurrency(product.show_price.original_price)}
            </Typography>
          )}
        </Typography>
        <Label variant="filled" color="error" marginTop={1}>
          {`${product.show_price.offer}% off`}
        </Label>

        <Typography variant="body2" color="textSecondary" marginTop={1}>
          {product.product_description}
        </Typography>

        <Box marginTop={8}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            bgcolor="#f5f7fa"
            borderRadius={1}
            sx={{
              px: { xs: 1, sm: 1.5 },
              py: { xs: 0.3, sm: 0.6 },
            }}
          >
            <IconButton
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
              sx={{ color: 'primary', padding: '5px' }}
            >
              <Iconify width={24} icon="mdi:minus" />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
              {quantity}
            </Typography>
            <IconButton
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
              sx={{ color: 'primary', padding: '5px' }}
            >
              <Iconify width={24} icon="mdi:plus" />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            color="error"
            startIcon={
              loadingCart ? (
                <CircularProgress size={10} />
              ) : (
                <Iconify icon="eva:shopping-cart-outline" width={20} height={20} />
              )
            }
            fullWidth
            onClick={handleAddToCart}
            disabled={loadingCart}
            sx={{
              mt: 2,
              px: { xs: 1.8, sm: 2 },
              py: { xs: 0.8, sm: 1.1 },
            }}
          >
            {loadingCart ? 'Adding...' : 'Add'}
          </Button>
        </Box>
        <Portal>
          <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
              Product added to cart!
            </Alert>
          </Snackbar>
        </Portal>
      </Box>
    </Box>
  );
};

export default ProductDetails;
