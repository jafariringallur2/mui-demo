import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/label';
import { fCurrency } from 'src/utils/format-number';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Link as MuiLink,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive'; 
import useShopNavigate  from 'src/hooks/use-shop-navigate';

export default function CartItemsList({
  cartItems,
  onQuantityChange,
  onRemoveItem,
  onVariantChange,
  removeLoadingId,
}) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const isDesktop = useResponsive('up', 'sm');
  const navigate = useShopNavigate();

  // Initialize selected options based on variant_id
  useState(() => {
    const initialSelectedOptions = {};
    cartItems.forEach((item) => {
      if (item.variant_id) {
        const selectedVariant = item.product.variants.find(
          (variant) => variant.id === item.variant_id
        );
        if (selectedVariant) {
          selectedVariant.options.forEach(({ option, value }) => {
            if (!initialSelectedOptions[item.id]) {
              initialSelectedOptions[item.id] = {};
            }
            initialSelectedOptions[item.id][option] = value;
          });
        }
      }
    });
    setSelectedOptions(initialSelectedOptions);
  }, [cartItems]);

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

  const isCombinationAvailable = (itemId, options) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (!item) return false;

    return item.product.variants.some(
      (variant) =>
        variant.options.every(({ option, value }) => options[option] === value) &&
        variant.is_available === 1
    );
  };

  const handleOptionChange = (itemId, option, value) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [itemId]: {
        ...selectedOptions[itemId],
        [option]: value,
      },
    };

    // Check if the new combination is available
    if (isCombinationAvailable(itemId, newSelectedOptions[itemId])) {
      setSelectedOptions(newSelectedOptions);

      // Find the matching variant
      const matchedVariant = cartItems
        .find((item) => item.id === itemId)
        ?.product.variants.find((variant) =>
          variant.options.every(
            ({ option: opt, value: val }) => newSelectedOptions[itemId][opt] === val
          )
        );

      if (matchedVariant) {
        onVariantChange(itemId, matchedVariant.id);
      }
    }
  };

  const navigateProductView = (id) => {
    navigate(`/product/${id}`);
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom p={2}>
        Cart Items
      </Typography>
      {cartItems.map((item) => {
        const { selling_price, original_price } = item.product;
        const offerPercentage = original_price
          ? Math.round(((original_price - selling_price) / original_price) * 100)
          : 0;

        const uniqueOptions = extractUniqueOptions(item.product.variants);
        const selectedVariant = item.product.variants.find(
          (variant) => variant.id === item.variant_id
        );

        return (
          <Box
          key={item.id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={1}
          mb={1}
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)',
            position: 'relative',
            paddingTop: '20px',
          }}
        >
        
        <Box
          sx={{
            position: 'absolute',
            top: isDesktop ? 1 : 'auto',
            bottom: isDesktop ? 'auto' : 2,
            right: isDesktop ? 3 : 1,
            color: 'red',
            borderRadius: '50%',
            padding: '4px',
            cursor: 'pointer',
          }}
        >
            <IconButton onClick={() => onRemoveItem(item.id)} sx={{ color: 'red' }}>
              {removeLoadingId === item.id ? (
                <CircularProgress size={10} />
              ) : (
                <Iconify icon="mdi:trash-can-outline" width={20} height={20} />
              )}
            </IconButton>
          </Box>
            <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
              <Box
                onClick={() => navigateProductView(item.product.id)}
                sx={{
                  margin:{'sm' : 2,'xs' : 0},
                  marginRight: {'sm' : 2,'xs' : 3},
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              >
                <Box
                  component="img"
                  alt={item.product.name}
                  src={selectedVariant?.image || item.product.single_image}
                  sx={{
                    width: 1,
                    height: 1,
                    objectFit: 'cover',
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <MuiLink
                   onClick={() => navigateProductView(item.product.id)}
                   sx={{
                     cursor: 'pointer',
                   }}
                  color="inherit"
                  underline="none"
                  variant="body2"
                  fontWeight="bold"
                >
                  {item.product.name}
                </MuiLink>

                <Box>
                  <Typography variant="body1" color="primary">
                    {fCurrency(
                      (selectedVariant ? selectedVariant.selling_price : selling_price) * item.qty
                    )}
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
                        {fCurrency(
                          (selectedVariant ? selectedVariant.original_price : original_price) *
                            item.qty
                        )}
                      </Typography>
                    )}
                  </Typography>
                  {offerPercentage > 0 && (
                    <Label variant="filled" color="info">
                      {offerPercentage}% off
                    </Label>
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  width="100%"
                  mt={2}
                  borderRadius={1}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '60px' }}>
                    Qty:
                  </Typography>
                  <Box
                    display="flex"
                    borderRadius={1}
                    alignItems="center"
                    bgcolor="#e9f2ff"
                    sx={{
                      mr: 2,
                      width: {
                        xs: '48%',
                        sm: '14%',
                      },
                    }}
                  >
                    <IconButton
                      onClick={() => onQuantityChange(item.id, -1)}
                      aria-label="Decrease quantity"
                      sx={{ color: 'primary' }}
                    >
                      <Iconify width={16} icon="mdi:minus" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'bold', color: 'black', padding: '0 8px' }}
                    >
                      {item.qty}
                    </Typography>
                    <IconButton
                      onClick={() => onQuantityChange(item.id, 1)}
                      aria-label="Increase quantity"
                      sx={{ color: 'primary' }}
                    >
                      <Iconify width={16} icon="mdi:plus" />
                    </IconButton>
                  </Box>
                </Box>

               
                <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                  {uniqueOptions.map(({ option, values }) => (
                    <Grid item xs={12} sm={4} key={option}>
                      {' '}
                      <Box display="flex" alignItems="center" gap={0}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: '60px' }}>
                          {option}:
                        </Typography>
                        <FormControl sx={{ minWidth: 120 }} size="small">
                          <Select
                            value={selectedOptions[item.id]?.[option] || ''}
                            onChange={(e) => handleOptionChange(item.id, option, e.target.value)}
                            displayEmpty
                            size="small"
                            sx={{
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
                              height: { xs: '28px', sm: '32px' },
                              maxWidth: { xs: '90px', sm: '140px' },
                            }}
                          >
                            <MenuItem value="" disabled>
                              Select {option}
                            </MenuItem>
                            {values.map((value) => {
                              const newOptions = {
                                ...selectedOptions[item.id],
                                [option]: value,
                              };
                              const isAvailable = isCombinationAvailable(item.id, newOptions);

                              return (
                                <MenuItem
                                  key={value}
                                  value={value}
                                  disabled={!isAvailable}
                                  sx={{
                                    opacity: isAvailable ? 1 : 0.5,
                                    fontSize: '0.875rem',
                                  }}
                                >
                                  {value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

CartItemsList.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      variant_id: PropTypes.number,
      product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        single_image: PropTypes.string.isRequired,
        selling_price: PropTypes.string.isRequired,
        original_price: PropTypes.string,
        variants: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            options: PropTypes.arrayOf(
              PropTypes.shape({
                option: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
              })
            ).isRequired,
            selling_price: PropTypes.string.isRequired,
            original_price: PropTypes.string,
            is_available: PropTypes.number.isRequired,
          })
        ),
      }).isRequired,
    })
  ).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onVariantChange: PropTypes.func.isRequired,
  removeLoadingId: PropTypes.number,
};
