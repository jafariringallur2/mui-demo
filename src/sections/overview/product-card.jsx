import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardMedia, Chip, IconButton, Typography, Button, Box } from '@mui/material';

import Iconify from 'src/components/iconify'; // Adjust path if needed

export default function ProductCard({ product }) {
  return (
    <Card elevation={1} sx={{ borderRadius: 2 }}>
      <Box sx={{ position: 'relative' }}>
        {product.discount && (
          <Chip
            label={`${product.discount}% off`}
            color="primary"
            size="small"
            sx={{ position: 'absolute', top: 8, left: 8 }}
          />
        )}
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          {/* <IconButton>
            <Iconify icon="eva:eye-fill" color="disabled" width={20} height={20} />
          </IconButton> */}
          <IconButton>
            <Iconify icon="eva:heart-outline" color="disabled" width={20} height={20} />
          </IconButton>
        </Box>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ height: 200, objectFit: 'contain', p: 2 }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="h6" color="error">
            ${product.discountedPrice}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
            ${product.originalPrice}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Iconify icon="eva:plus-fill" width={20} height={20} />}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,  // discount is optional
  }).isRequired,
};
