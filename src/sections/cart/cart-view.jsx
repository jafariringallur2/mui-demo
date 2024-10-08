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
  CircularProgress,
  Skeleton,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { getCartItems } from 'src/services/apiService';
import { useCart } from 'src/context/CartContext';

const ShoppingCart = () => {
  const { removeCartItem, cartCount } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeLoadingId, setRemoveLoadingId] = useState(null);

  useEffect(() => {
    setLoading(true);
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
  }, [cartCount]);

  const totalSellingPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.selling_price) * parseInt(item.qty, 10),
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.original_price) * parseInt(item.qty, 10),
    0
  );
  const discount = totalPrice-totalSellingPrice; // Example static discount
  const grandTotal = totalSellingPrice;

  const handlerRmoveCartItem = async (id) => {
    try {
      setRemoveLoadingId(id);
      await removeCartItem(id);
    } finally {
      setRemoveLoadingId(null);
    }
  };

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
          <Typography variant="h4" gutterBottom mb={4}>
            Shopping Cart
          </Typography>
          {Array.from(new Array(3)).map((_, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderRadius={1}
              mb={3}
              sx={{
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
                boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            >
              <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={80}
                  sx={{ marginRight: 6, marginLeft: 1, marginBottom: 1 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width={150} height={24} />
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent={{
                      xs: 'flex-start',
                      md: 'space-between',
                    }}
                  >
                    <Grid item xs={12} md={6}>
                      <Skeleton variant="text" width={100} height={20} />
                      <Skeleton variant="text" width={50} height={25} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={{
                          xs: 'flex-start',
                          md: 'flex-end',
                        }}
                        width="100%"
                        borderRadius={1}
                        mb={{
                          xs: 2,
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ bgcolor: '#e9f2ff', borderRadius: 2, mr: 2 }}
                        >
                          <IconButton disabled>
                            <Iconify icon="mdi:minus" width={20} />
                          </IconButton>
                          <Skeleton variant="rectangular" width={20} height={20} sx={{ mx: 1 }} />
                          <IconButton disabled>
                            <Iconify icon="mdi:plus" width={20} />
                          </IconButton>
                        </Box>
                        <IconButton disabled>
                          <Iconify icon="mdi:trash-can-outline" width={20} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box padding={3} boxShadow={3} borderRadius={2} mt={4}>
            <Skeleton variant="text" width={120} height={30} />
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ marginTop: 2 }} />
            <Box mt={3}>
              <Skeleton variant="text" width={180} height={24} />
              <Skeleton variant="text" width={180} height={24} />
              <Skeleton variant="text" width={180} height={24} />
              <Skeleton variant="text" width={180} height={30} sx={{ marginTop: 2 }} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={56} sx={{ marginTop: 3 }} />
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={4} padding={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom mb={4}>
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
              borderRadius={1}
              mb={3}
              sx={{
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
                boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            >
              <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
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

                <Box sx={{ flex: 1 }}>
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

                  <Box
                    key={item.id}
                    mb={3}
                    sx={{
                      flexDirection: {
                        xs: 'column',
                        md: 'row',
                      },
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent={{
                        xs: 'flex-start',
                        md: 'space-between',
                      }}
                    >
                      <Grid item xs={12} md={6}>
                        <Box>
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
                      </Grid>

                      <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent={{
                            xs: 'flex-start',
                            md: 'flex-end',
                          }}
                          width="100%"
                          borderRadius={1}
                        >
                          <Box
                            display="flex"
                            borderRadius={2}
                            alignItems="center"
                            bgcolor="#e9f2ff"
                            sx={{ mr: 2 }}
                          >
                            <IconButton
                              onClick={() => handleQuantityChange(item.id, -1)}
                              aria-label="Decrease quantity"
                              sx={{ color: 'primary' }}
                            >
                              <Iconify width={20} icon="mdi:minus" />
                            </IconButton>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 'bold', color: 'black', padding: '0 10px' }}
                            >
                              {item.qty}
                            </Typography>
                            <IconButton
                              onClick={() => handleQuantityChange(item.id, 1)}
                              aria-label="Increase quantity"
                              sx={{ color: 'primary' }}
                            >
                              <Iconify width={20} icon="mdi:plus" />
                            </IconButton>
                          </Box>

                          <IconButton onClick={() => handlerRmoveCartItem(item.id)}>
                            {removeLoadingId === item.id ? (
                              <CircularProgress size={10} />
                            ) : (
                              <Iconify icon="mdi:trash-can-outline" width={20} height={20} />
                            )}
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Grid>
      <Grid item xs={12} md={4}>
        <Box padding={3} boxShadow={3} borderRadius={2} mt={4}>
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
            <Grid container spacing={2} mb={1}>
              <Grid item xs={6}>
                <Typography>Items total:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography>₹{totalPrice.toFixed(2)}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} mb={1}>
              <Grid item xs={6}>
                <Typography>Discount:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography color="green">-₹{discount.toFixed(2)}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} mb={1}>
              <Grid item xs={6}>
                <Typography>Sub Total:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography>₹{grandTotal.toFixed(2)}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Grand Total:</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="h6">₹{grandTotal.toFixed(2)}</Typography>
              </Grid>
            </Grid>
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
