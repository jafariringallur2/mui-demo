import React from 'react';
import { Container, Grid, Typography, Box, Link } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ backgroundColor: '#fff', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <img
                src="https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_small_3067da8c-a83b-46dd-b28b-6ef1e16ccd17_small.svg"
                alt="logo"
                style={{ height: '40px', marginRight: '8px' }}
              />
              {/* <Typography variant="h6" fontWeight="bold">
                Bazaar
              </Typography> */}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
            </Typography>
          </Grid>

          {/* About Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block" gutterBottom>
              Careers
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block" gutterBottom>
              Our Stores
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block" gutterBottom>
              Our Cares
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block">
              Terms & Conditions
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block">
              Privacy Policy
            </Link>
          </Grid>

          {/* Customer Care */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Care
            </Typography>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block" gutterBottom>
              Help Center
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block" gutterBottom>
              Track Your Order
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block" gutterBottom>
              Corporate & Bulk Purchasing
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block">
              Returns & Refunds
            </Link>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} md={3} sx={{pb : {xs : 4,sm:0}}}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              70 Washington Square South, New York, NY 10012, United States
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: uilib.help@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 1123 456 780
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
