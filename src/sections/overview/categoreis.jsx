import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Box, Card, Grid, Button, CardMedia, Typography } from '@mui/material';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('https://web.botire.in/api/categories', {
        headers: {
          Accept: 'application/json',
          BusinessUrl: 'botire',
        },
      })
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.data.slice(0, 6)); // Limit to 4 categories
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Categories
        </Typography>
        <Button variant="text" sx={{ color: 'red' }}>
          See All
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={4} sm={2} key={category.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center content vertically
                alignItems: 'center', // Center content horizontally
                boxShadow: 1,
                borderRadius: '50%',
                height: { xs: 90, sm: 120 },
                width: { xs: 90, sm: 120 },
                textAlign: 'center',
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%', // Ensure the Box takes full height of the card
                }}
              >
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.name}
                  sx={{
                    width: { xs: 35, sm: 50 },
                    height: { xs: 35, sm: 50 },
                    objectFit: 'contain',
                    marginBottom: 1,
                  }}
                />
                <Typography variant="body1" sx={{
                  fontSize:{ xs : '0.8rem', sm: "1rem"}
                }}>{category.name}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
