import React from 'react';
import { Container, Grid, Typography, Box, Link } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ backgroundColor: '#fff', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <img
                src="https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_small_3067da8c-a83b-46dd-b28b-6ef1e16ccd17_small.svg"
                alt="logo"
                style={{ height: '60px', marginRight: '8px' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>

            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block">
              Terms & Conditions
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block">
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Care
            </Typography>

            <Link
              href="#"
              variant="body2"
              color="text.secondary"
              underline="none"
              display="block"
              gutterBottom
            >
              Track Your Order
            </Link>

            <Link href="#" variant="body2" color="text.secondary" underline="none" display="block">
              Returns & Refunds
            </Link>
          </Grid>

          <Grid item xs={12} md={3} sx={{ pb: { xs: 4, sm: 0 } }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              70 Washington Square South, New York, NY 10012, United States
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Phone: +1 1123 456 780
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Box textAlign="center" sx={{ mt: { xs: 0, sm: 1}, mb: { xs: 4, sm: 0} }}>
              <Typography variant="body2" color="text.primary">
                Made by{' '}
                <Link href="https://www.linkedin.com/in/jafar-swadhique/" color="text.primary" target="_blank" underline="hover">
                  Jafar
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
