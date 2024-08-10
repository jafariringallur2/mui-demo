import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Box, Card, Grid,Button, CardMedia, Typography, CardContent } from '@mui/material';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://web.botire.in/api/categories', {
      headers: {
        'Accept': 'application/json',
        'BusinessUrl': 'botire'
      }
    })
    .then(response => {
      if (response.data.success) {
        setCategories(response.data.data.slice(0, 4)); // Limit to 4 categories
      }
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Category</Typography>
        <Button variant="text" sx={{ color: 'red' }}>See All</Button>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {categories.map(category => (
          <Grid item xs={6} sm={3} key={category.id}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              boxShadow: 1, 
              borderRadius: '50%', 
              padding: 2,
              textAlign: 'center',
              height: 125,
              width : 125
            }}>
              <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
                sx={{ width: 50, height: 50, objectFit: 'contain', marginBottom: 1 }}
              />
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="body1">{category.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
