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
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [uniqueOptions, setUniqueOptions] = useState([]); // State to store unique options
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { addToCart } = useCart();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetails(id);
        setProduct(data.data);

        if (data.data.variants) {
          const options = extractUniqueOptions(data.data.variants);
          setUniqueOptions(options);

          if (data.data.variants.length > 0) {
            setSelectedVariant(data.data.variants[0]);
            const initialOptions = {};
            data.data.variants[0].options.forEach(({ option, value }) => {
              initialOptions[option] = value;
            });
            setSelectedOptions(initialOptions);
          }
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const extractUniqueOptions = (variants) => {
    const optionsMap = {};

    variants.forEach((variant) => {
      variant.options.forEach(({ option, value }) => {
        if (!optionsMap[option]) {
          optionsMap[option] = new Set();
        }
        optionsMap[option].add(value);
      });
    });

    return Object.keys(optionsMap).map((option) => ({
      option,
      values: Array.from(optionsMap[option]),
    }));
  };

  const handleOptionChange = (option, value) => {
    const newSelectedOptions = { ...selectedOptions, [option]: value };
    setSelectedOptions(newSelectedOptions);

    const matchedVariant = product.variants.find((variant) =>
      variant.options.every(({ option: opt, value: val }) => newSelectedOptions[opt] === val)
    );

    if (matchedVariant && matchedVariant.is_available === 1) {
      setSelectedVariant(matchedVariant);
    }
  };
  const renderVariantOptions = () => {
    if (!uniqueOptions || uniqueOptions.length === 0) return null;

    return uniqueOptions.map(({ option, values }) => (
      <Box key={option} mt={2}>
        <Typography variant="subtitle2" fontWeight="bold">
          {option}
        </Typography>
        <Box display="flex" gap={1} mt={1}>
          {values.map((value) => {
            const newOptions = { ...selectedOptions, [option]: value };
            const isAvailable = isCombinationAvailable(newOptions);

            return (
              <Button
                key={value}
                variant={selectedOptions[option] === value ? 'contained' : 'outlined'}
                onClick={() => handleOptionChange(option, value)}
                disabled={!isAvailable}
                size="small"
                color="secondary"
              >
                {value}
              </Button>
            );
          })}
        </Box>
      </Box>
    ));
  };

  const isCombinationAvailable = (options) =>
    product.variants.some(
      (variant) =>
        variant.options.every(({ option, value }) => options[option] === value) &&
        variant.is_available === 1
    );

  const displayPrice = selectedVariant
    ? selectedVariant.selling_price
    : product?.show_price?.selling_price;

  const displayOriginalPrice = selectedVariant
    ? selectedVariant.original_price
    : product?.show_price?.original_price;

  const displayOffer = selectedVariant ? selectedVariant.offer : product?.show_price?.offer;

  const isAvailable = selectedVariant
    ? selectedVariant.is_available === 1
    : product?.in_stock === '1';

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
      await addToCart(product.hashid, quantity,selectedVariant?.id);
      setSnackbarOpen(true); // Show the snackbar on successful add
    } finally {
      setLoadingCart(false);
    }
  };

  const handleBuyNow = async () => {
    setLoadingBuy(true);
    try {
      await addToCart(product.hashid, quantity, selectedVariant?.id);
      window.location.href = '/cart';
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    } finally {
      setLoadingBuy(false);
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
              <Grid container spacing={2} mt={1}>
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

        <Box flex={1} mt={{ xs: 2, lg: 0 }} marginLeft={{ lg: 2 }}>
          <Skeleton variant="text" width="80%" height={40} />
          <Skeleton variant="text" width="10%" mt={1} />
          <Skeleton variant="text" width="40%" mt={2} />

          <Box mt={1}>
            <Skeleton variant="text" width="10%" />
          </Box>

          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />

          <Box mt={8}>
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
            <Grid container spacing={2} mt={1}>
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
      <Box flex={1} mt={{ xs: 2, lg: 0 }} marginLeft={{ lg: 2 }}>
        <Typography variant="h3" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography variant="body2" color={isAvailable ? 'success.main' : 'error.main'}>
          {isAvailable ? 'In Stock' : 'Out of Stock'}
        </Typography>

        <Typography variant="h6" color="primary" mt={1}>
          {fCurrency(displayPrice)}
          &nbsp;
          {displayOriginalPrice && (
            <Typography
              component="span"
              variant="subtitle2"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {fCurrency(displayOriginalPrice)}
            </Typography>
          )}
        </Typography>
        <Label variant="filled" color="error" mt={1}>
          {`${displayOffer}% off`}
        </Label>

        <Typography variant="body2" color="textSecondary" mt={1}>
          {product.product_description}
        </Typography>

        {renderVariantOptions()}

        <Box mt={2}>
          <Typography variant="subtitle2" fontWeight="bold">
            Quantity
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#f5f7fa"
            borderRadius={1}
            mt={1}
            sx={{
              width: {
                xs: '30%',
                sm: '25%',
              },
              px: { xs: 0.6, sm: 1 },
              py: { xs: 0.3, sm: 0.6 },
            }}
          >
            <IconButton
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
              sx={{ color: 'primary', padding: '3px' }}
            >
              <Iconify width={14} icon="mdi:minus" />
            </IconButton>
            <Typography variant={isDesktop ? 'subtitle2' : 'subtitle1'} sx={{ color: 'black' }}>
              {quantity}
            </Typography>
            <IconButton
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
              sx={{ color: 'primary', padding: '3px' }}
            >
              <Iconify width={14} icon="mdi:plus" />
            </IconButton>
          </Box>

          <Box  mt={3} sx={{ display: 'flex', gap: 2 }}>
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
              onClick={handleAddToCart}
              disabled={loadingCart || !isAvailable}
              sx={{
                flex: 1,
                mt: 2,
                px: { xs: 1.8, sm: 2 },
                py: { xs: 0.8, sm: 1.1 },
              }}
            >
              {loadingCart ? 'Adding...' : 'Add to Cart'}
            </Button>

        
            <Button
              variant="contained"
              color="primary"
              disabled={loadingBuy}
              startIcon={<Iconify icon="eva:cart-fill" width={20} height={20} />}
              onClick={handleBuyNow}
              sx={{
                flex: 1,
                mt: 2,
                px: { xs: 1.8, sm: 2 },
                py: { xs: 0.8, sm: 1.1 },
              }}
            >
                {loadingBuy ? 'Adding...' : 'Buy Now'}
              
            </Button>
          </Box>
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
