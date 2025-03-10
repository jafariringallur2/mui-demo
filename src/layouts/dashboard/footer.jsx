import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Typography, Box, Link } from '@mui/material';
import useShopNavigate  from 'src/hooks/use-shop-navigate';


export default function Footer({businessDetails, headerLoading}) {
  const navigate = useShopNavigate();

  return (
    <Box sx={{ backgroundColor: '#fff', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
            { !headerLoading ? (
              <img
               src={businessDetails.business_logo}
                alt="logo"
                style={{ height: '60px', marginRight: '8px' }}
              />
            ): null }
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
              onClick={() => navigate("/track-order")}
              sx={{
                cursor: 'pointer',
              }}
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
              {businessDetails.business_address_line_1}, {businessDetails.business_place}, {businessDetails.business_city}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Phone: {businessDetails.business_phone}
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
Footer.propTypes = {
  businessDetails: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),  
  headerLoading: PropTypes.bool,
};
