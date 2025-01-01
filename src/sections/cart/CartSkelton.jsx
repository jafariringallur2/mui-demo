import React from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Skeleton,
} from '@mui/material';
import Iconify from 'src/components/iconify';

const CartSkelton = () => (
  <Grid container spacing={4} padding={2}>
    <Grid item xs={12} md={8}>
      <Typography variant="h4" gutterBottom mb={4}>
        My Cart
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

export default CartSkelton;
