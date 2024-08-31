import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Button,
  Box,
  Link as MuiLink,
  Grid,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Portal,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import Label from 'src/components/label';
import { fCurrency } from 'src/utils/format-number';
import Iconify from 'src/components/iconify'; // Adjust path if needed
import { useCart } from 'src/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(product.id);
      setSnackbarOpen(true); // Show the snackbar on successful add
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderDiscount = (
    <Label
      variant="filled"
      color="error"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {`${product.discount}% off`}
    </Label>
  );

  const renderImg = (
    <Box
      component={RouterLink}
      to={`/product/${product.id}`} 
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    >
      <Box
        component="img"
        alt={product.name}
        src={product.image}
        sx={{
          width: 1,
          height: 1,
          objectFit: 'cover',
        }}
      />
    </Box>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderDiscount}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <MuiLink
          component={RouterLink} // Use RouterLink to make the name clickable
          to={`/product/${product.id}`} // Navigate to the product details page
          color="inherit"
          underline="none"
          variant="body2"
          fontWeight="bold"
        >
          {product.name}
        </MuiLink>

        <Grid container alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              {fCurrency(product.discountedPrice)}
              &nbsp;
              {product.originalPrice && (
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  {fCurrency(product.originalPrice)}
                </Typography>
              )}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
          >
            <Button
              variant="outlined"
              color="error"
              startIcon={
                loading ? (
                  <CircularProgress size={10} />
                ) : (
                  <Iconify icon="eva:shopping-cart-outline" width={20} height={20} />
                )
              }
              sx={{
                mt: { xs: 2, sm: 0 },
              }}
              fullWidth
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </Stack>

      <Portal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Product added to cart!
          </Alert>
        </Snackbar>
      </Portal>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    discount: PropTypes.number, // discount is optional
  }).isRequired,
};
