import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, IconButton, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider, Box } from '@mui/material';
import Iconify from 'src/components/iconify';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

export default function ShoppingCartDrawer({ open, onClose }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '80%', sm: '400px' }, p: 2 },
      }}
    >
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="div">
            Shopping Cart
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <Iconify width={24} icon="mdi:close" />
          </IconButton>
        </Box>

        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    variant="rounded"
                    sx={{ width: 64, height: 64 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      <a href={product.href}>{product.name}</a>
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {product.color}
                      </Typography>{' '}
                      —{' '}
                      <Typography component="span" variant="body2" color="text.primary">
                        {product.price}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.secondary">
                        Qty {product.quantity}
                      </Typography>
                    </>
                  }
                />
                <Button variant="text" color="error">
                  Remove
                </Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ pt: 2 }}>
          <Button fullWidth variant="contained" color="primary">
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

ShoppingCartDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
