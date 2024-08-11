import React from 'react';
import PropTypes from 'prop-types';

import { Card, Typography, Button, Box, Link, Grid, Stack } from '@mui/material';

import Label from 'src/components/label';
import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify'; // Adjust path if needed

export default function ProductCard({ product }) {
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
      component="img"
      alt={product.name}
      src={product.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderDiscount}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="none" variant="body1" fontWeight="bold">
          {product.name}
        </Link>

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
              startIcon={<Iconify icon="eva:shopping-cart-outline" width={20} height={20} />}
              sx={{
                mt: { xs: 2, sm: 0 }, // Adds margin-top on mobile only
                fontSize: { xs: '0.7rem', sm: '0.9rem' }, // Smaller font size on mobile
                px: { xs: 1.2, sm: 1.5 }, // Adjusts horizontal padding (left and right)
                py: { xs: 0.4, sm: 0.6 }, // Adjusts vertical padding (top and bottom)
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    discount: PropTypes.number, // discount is optional
  }).isRequired,
};
