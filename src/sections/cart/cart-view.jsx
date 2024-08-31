import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Label from 'src/components/label';

import { fCurrency } from 'src/utils/format-number';
import {
  Box,
  Button,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  TextField,
  Skeleton,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { getCartItems } from 'src/services/apiService'; // Ensure this path is correct

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCartItems()
      .then((response) => {
        if (response.success) {
          setCartItems(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch cart items', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.selling_price) * parseInt(item.qty, 10),
    0
  );
  const discount = 15000; // Example static discount
  const grandTotal = itemsTotal - discount;

  const handleQuantityChange = (itemId, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const newQty = item.qty ? parseInt(item.qty, 10) + change : 1;
          return {
            ...item,
            qty: Math.max(1, newQty), // Ensure qty is at least 1
          };
        }
        return item;
      })
    );
  };
  

  if (loading) {
    return (
      <Grid container spacing={4} padding={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
          {Array.from(new Array(3)).map((_, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Box display="flex" alignItems="center">
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={80}
                  style={{ marginRight: 16 }}
                />
                <Box>
                  <Skeleton variant="text" width={150} height={24} />
                  <Skeleton variant="text" width={100} height={20} />
                  <Box display="flex" alignItems="center" mt={1}>
                    <IconButton disabled>
                      <Iconify icon="eva:minus-fill" width={20} height={20} />
                    </IconButton>
                    <Skeleton variant="rectangular" width={40} height={40} />
                    <IconButton disabled>
                      <Iconify icon="eva:plus-fill" width={20} height={20} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box textAlign="right">
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton variant="text" width={80} height={20} />
              </Box>
              <IconButton disabled>
                <Iconify icon="eva:close-outline" width={20} height={20} />
              </IconButton>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding={3} boxShadow={3} borderRadius={2}>
            <Skeleton variant="text" width={120} height={30} />
            <Skeleton variant="rectangular" width="100%" height={56} style={{ marginTop: 16 }} />
            <Box mt={3}>
              <Skeleton variant="text" width={180} height={24} />
              <Skeleton variant="text" width={180} height={24} />
              <Skeleton variant="text" width={180} height={24} />
              <Skeleton variant="text" width={180} height={30} style={{ marginTop: 16 }} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={56} style={{ marginTop: 24 }} />
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={4} padding={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {cartItems.map((item) => {
          const { selling_price, original_price } = item.product;
          const offerPercentage = original_price
            ? Math.round(((original_price - selling_price) / original_price) * 100)
            : 0;

          return (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Box display="flex" alignItems="center">
                <Box
                  component={RouterLink}
                  to={`/product/${item.product.id}`}
                  sx={{
                    marginRight: 6,
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                  }}
                >
                  <Box
                    component="img"
                    alt={item.product.name}
                    src={item.product.single_image}
                    sx={{
                      width: 1,
                      height: 1,
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                <Box>
                  <MuiLink
                    component={RouterLink}
                    to={`/product/${item.product.id}`}
                    color="inherit"
                    underline="none"
                    variant="body2"
                    fontWeight="bold"
                  >
                    {item.product.name}
                  </MuiLink>
                  <Typography variant="body1" color="primary">
                  {fCurrency(selling_price * item.qty)}
                    &nbsp;
                    {original_price && (
                      <Typography
                        component="span"
                        variant="subtitle2"
                        sx={{
                          color: 'text.disabled',
                          textDecoration: 'line-through',
                        }}
                      >
                        {fCurrency(original_price * item.qty)}
                      </Typography>
                    )}
                  </Typography>
                  {offerPercentage > 0 && (
                    <Label variant="filled" color="error">
                      {offerPercentage}% off
                    </Label>
                  )}
                </Box>
              </Box>
              <Box textAlign="right">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                  bgcolor="#e9f2ff"
                  borderRadius={1}
                >
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, -1)}
                    aria-label="Decrease quantity"
                    sx={{ color: 'primary', padding: '4px' }}
                  >
                    <Iconify width={20} icon="mdi:minus" />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black',padding:"5px" }}>
                    {item.qty}
                  </Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, 1)}
                    aria-label="Increase quantity"
                    sx={{ color: 'primary', padding: '4px' }}
                  >
                    <Iconify width={20} icon="mdi:plus" />
                  </IconButton>
                </Box>
              </Box>
              <IconButton>
                <Iconify icon="eva:close-outline" width={20} height={20} />
              </IconButton>
            </Box>
          );
        })}
      </Grid>
      <Grid item xs={12} md={4}>
        <Box padding={3} boxShadow={3} borderRadius={2}>
          <Typography variant="h6" gutterBottom>
            Payment
          </Typography>
          <TextField
            label="Coupon code"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <Button variant="contained" color="error">
                  Apply
                </Button>
              ),
            }}
          />
          <Box mt={3}>
            <Typography>Items total: ₹{itemsTotal.toFixed(2)}</Typography>
            <Typography>Discount: -₹{discount.toFixed(2)}</Typography>
            <Typography>Sub Total: ₹{grandTotal.toFixed(2)}</Typography>
            <Typography variant="h6" mt={2}>
              Grand Total: ₹{grandTotal.toFixed(2)}
            </Typography>
          </Box>
          <Button variant="contained" color="error" fullWidth sx={{ mt: 3 }}>
            Check Out
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ShoppingCart;
