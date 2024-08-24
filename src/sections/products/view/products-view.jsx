import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, IconButton, InputBase, Skeleton } from '@mui/material';
import Iconify from 'src/components/iconify';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch('https://web.botire.in/api/product/X2q4gDqEzj0M', {
      headers: {
        accept: 'application/json',
        businessurl: 'boat'
      }
    })
      .then(response => response.json())
      .then(data => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleThumbnailClick(index);
    }
  };

  if (loading) {
    return (
      <Box padding={2}>
        <Skeleton variant="rectangular" height={400} />
        <Skeleton variant="text" height={40} width="60%" />
        <Skeleton variant="text" height={20} width="40%" />
        <Skeleton variant="text" height={20} width="30%" />
        <Skeleton variant="rectangular" height={40} width="50%" />
      </Box>
    );
  }

  if (!product) {
    return <Typography>Error loading product details.</Typography>;
  }

  return (
    <Box padding={2} display="flex" flexDirection={{ xs: 'column', lg: 'row' }} bgcolor="background.paper" borderRadius={2} boxShadow={3}>
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
            position: 'relative'
          }}
        />
        <IconButton
          onClick={handlePrevImage}
          onKeyDown={(e) => e.key === 'Enter' && handlePrevImage()}
          sx={{ position: 'absolute', top: '50%', left: 10, zIndex: 1 }}
          aria-label="Previous image"
        >
          <Iconify width={24} icon="mdi:chevron-left" />
        </IconButton>
        <IconButton
          onClick={handleNextImage}
          onKeyDown={(e) => e.key === 'Enter' && handleNextImage()}
          sx={{ position: 'absolute', top: '50%', right: 10, zIndex: 1 }}
          aria-label="Next image"
        >
          <Iconify width={24} icon="mdi:chevron-right" />
        </IconButton>
        <Grid container spacing={2} marginTop={1}>
          {product.images.map((image, index) => (
            <Grid item key={index} xs={3}>
              <Button
                onClick={() => handleThumbnailClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                sx={{ padding: 0, border: currentImageIndex === index ? '2px solid #000' : 'none' }}
                aria-label={`Thumbnail ${index + 1}`}
                tabIndex={0}
              >
                <Box
                  component="img"
                  alt={`Thumbnail ${index + 1}`}
                  src={image}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    objectFit: 'cover'
                  }}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box flex={1} marginTop={{ xs: 2, lg: 0 }} marginLeft={{ lg: 2 }}>
        <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
        <Typography variant="body2" color="success.main">NEW</Typography>
        <Typography variant="body2" color="textSecondary">In Stock</Typography>
        <Typography variant="h6" color="primary" marginTop={2}>${product.show_price.selling_price}</Typography>
        <Typography variant="body2" color="textSecondary" marginTop={1}>{product.product_description}</Typography>

        <Box marginTop={2}>
          <Typography variant="body2" color="textSecondary">Quantity</Typography>
          <Box display="flex" alignItems="center" marginTop={1}>
            <IconButton onClick={() => handleQuantityChange(-1)} aria-label="Decrease quantity">
              <Iconify width={24} icon="mdi:minus" />
            </IconButton>
            <InputBase
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              inputProps={{ style: { textAlign: 'center' } }}
              sx={{ width: 40, border: '1px solid #ccc', borderRadius: 1 }}
            />
            <IconButton onClick={() => handleQuantityChange(1)} aria-label="Increase quantity">
              <Iconify width={24} icon="mdi:plus" />
            </IconButton>
            <Typography variant="body2" marginLeft={2}>Available: {product.in_stock}</Typography>
          </Box>
        </Box>

        <Box marginTop={4} display="flex" gap={2}>
          <Button variant="contained" color="secondary">Add to Cart</Button>
          <Button variant="contained" color="primary">Buy Now</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
