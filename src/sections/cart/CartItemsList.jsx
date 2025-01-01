import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Label from 'src/components/label';
import { fCurrency } from 'src/utils/format-number';

import {
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import Iconify from 'src/components/iconify';

export default function CartItemsList ({ cartItems, onQuantityChange, onRemoveItem, removeLoadingId }) {
  return (
    <Box p={2}>
   <Typography variant="h6" gutterBottom>
        Cart Items
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
                            onClick={() => onQuantityChange(item.id, -1)}
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
                            onClick={() => onQuantityChange(item.id, 1)}
                            aria-label="Increase quantity"
                            sx={{ color: 'primary' }}
                          >
                            <Iconify width={20} icon="mdi:plus" />
                          </IconButton>
                        </Box>

                        <IconButton onClick={() => onRemoveItem(item.id)}>
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
    </Box>
  );
};

CartItemsList.propTypes = {
    cartItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        product: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          single_image: PropTypes.string.isRequired,
          selling_price: PropTypes.string.isRequired,
          original_price: PropTypes.string,
        }).isRequired,
      })
    ).isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    removeLoadingId: PropTypes.number,
  };

