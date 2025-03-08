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
import { Link as RouterLink } from 'react-router-dom';
import Label from 'src/components/label';
import { fCurrency } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';
import { useCart } from 'src/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(product.id);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
    <Card sx={{ backgroundColor: 'background.paper' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color="info"
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
        {renderImg}
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: { xs: 2, sm: 0 },
            borderRadius: '50%',
            minWidth: 'auto',
            bottom: -110,
            right: { xs : 12, sm : 16},
            position: 'absolute',
            width: { xs : 35, sm : 40},
            height: { xs : 35, sm : 40},
            p: 0,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={18} />
          ) : (
            <Iconify icon="eva:shopping-cart-outline" width={18} height={18} />
          )}
        </Button>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <MuiLink
          component={RouterLink}
          to={`/product/${product.id}`}
          color="inherit"
          underline="none"
          variant="body2"
          fontSize={16}
          fontWeight="bold"
        >
          {product.name}
        </MuiLink>

        <Grid container alignItems="center">
          <Box>
            <Typography variant="body1" color="text.primary" fontSize={15} fontWeight="bold">
              {fCurrency(product.discountedPrice)}
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="subtitle2"
                fontSize={13}
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {fCurrency(product.originalPrice)}
              </Typography>
            )}
          </Box>
        </Grid>
      </Stack>

      <Portal>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
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
    discount: PropTypes.number,
  }).isRequired,
};
